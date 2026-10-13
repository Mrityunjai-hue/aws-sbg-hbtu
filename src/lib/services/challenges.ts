import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, limit, serverTimestamp } from "firebase/firestore";
import { ACTIVE_14DAY_CHALLENGE, INITIAL_LEADERBOARD_DATA, LeaderboardStudent } from "@/data/challenges";

export interface StudentRegistrationInput {
  name: string;
  email: string;
  rollNo: string;
  branch: string;
  year: string;
  targetCert: string;
}

export interface StudentProgressState {
  isRegistered: boolean;
  student: StudentRegistrationInput | null;
  completedDays: number[];
  quizAnswers: Record<number, number>;
  notesByDay: Record<number, string>;
  triesByDay: Record<number, number>; // Attempts count per day module
  completedTimestamps: Record<number, number>; // Completion timestamp per day module
  lastCompletedAt: number | null; // Epoch timestamp of latest completed module (for tie-breaking)
  totalPoints: number;
  currentStreak: number;
}

export interface VerificationResult {
  success: boolean;
  pointsAwarded: number;
  attemptNumber?: number;
  percentage?: number;
  explanation: string;
  alreadyCompleted?: boolean;
}

const STORAGE_KEY_STUDENT = "aws_sbg_14day_student";
const STORAGE_KEY_PROGRESS = "aws_sbg_14day_progress";

/**
 * Dynamic Scoring Calculator
 * 1st try: 100% full points
 * 2nd try: 75% points (-25% penalty)
 * 3rd try: 50% points (-50% penalty)
 * 4th+ try: 25% minimum floor points
 */
export function calculateAttemptPoints(
  maxPoints: number,
  attemptNumber: number
): {
  awardedPoints: number;
  percentage: number;
  penaltyExplanation: string;
} {
  if (attemptNumber <= 1) {
    return {
      awardedPoints: maxPoints,
      percentage: 100,
      penaltyExplanation: "First-attempt perfection: 100% full points awarded!",
    };
  } else if (attemptNumber === 2) {
    const awarded = Math.round(maxPoints * 0.75);
    return {
      awardedPoints: awarded,
      percentage: 75,
      penaltyExplanation: "Second attempt: 75% points awarded (-25% retry penalty).",
    };
  } else if (attemptNumber === 3) {
    const awarded = Math.round(maxPoints * 0.50);
    return {
      awardedPoints: awarded,
      percentage: 50,
      penaltyExplanation: "Third attempt: 50% points awarded (-50% retry penalty).",
    };
  } else {
    const awarded = Math.round(maxPoints * 0.25);
    return {
      awardedPoints: Math.max(awarded, 10),
      percentage: 25,
      penaltyExplanation: `Attempt #${attemptNumber}: 25% minimum floor points awarded.`,
    };
  }
}

export const ChallengeService = {
  /**
   * Reset local challenge progress and test registration state
   */
  resetLocalState(): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY_STUDENT);
        localStorage.removeItem(STORAGE_KEY_PROGRESS);
      } catch (err) {
        console.error("Failed to clear local challenge state:", err);
      }
    }
  },

  /**
   * Get student's local challenge progress and registration state
   */
  getLocalState(): StudentProgressState {
    if (typeof window === "undefined") {
      return {
        isRegistered: false,
        student: null,
        completedDays: [],
        quizAnswers: {},
        notesByDay: {},
        triesByDay: {},
        completedTimestamps: {},
        lastCompletedAt: null,
        totalPoints: 0,
        currentStreak: 0,
      };
    }

    try {
      const storedStudent = localStorage.getItem(STORAGE_KEY_STUDENT);
      const storedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);

      const student: StudentRegistrationInput | null = storedStudent ? JSON.parse(storedStudent) : null;
      const progress = storedProgress
        ? JSON.parse(storedProgress)
        : {
            completedDays: [],
            quizAnswers: {},
            notesByDay: {},
            triesByDay: {},
            completedTimestamps: {},
            lastCompletedAt: null,
            totalPoints: 0,
            currentStreak: 0,
          };

      return {
        isRegistered: !!student,
        student,
        completedDays: progress.completedDays || [],
        quizAnswers: progress.quizAnswers || {},
        notesByDay: progress.notesByDay || {},
        triesByDay: progress.triesByDay || {},
        completedTimestamps: progress.completedTimestamps || {},
        lastCompletedAt: progress.lastCompletedAt || null,
        totalPoints: progress.totalPoints || 0,
        currentStreak: progress.currentStreak || 0,
      };
    } catch {
      return {
        isRegistered: false,
        student: null,
        completedDays: [],
        quizAnswers: {},
        notesByDay: {},
        triesByDay: {},
        completedTimestamps: {},
        lastCompletedAt: null,
        totalPoints: 0,
        currentStreak: 0,
      };
    }
  },

  /**
   * Register student for the 14-day challenge
   */
  async registerStudent(input: StudentRegistrationInput): Promise<boolean> {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(input));
    }

    if (db) {
      try {
        await Promise.race([
          addDoc(collection(db, "challengeRegistrations"), {
            ...input,
            registeredAt: serverTimestamp(),
            challengeId: ACTIVE_14DAY_CHALLENGE.id,
            totalPoints: 0,
            completedDays: [],
            streakDays: 0,
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error("firestore_timeout")), 1500)),
        ]);
      } catch (err) {
        console.warn("Firestore registration write fallback:", err);
      }
    }

    return true;
  },

  /**
   * Verify and complete a daily module
   * Dynamic scoring: 1st attempt full points, subsequent attempts penalized proportionally
   */
  async submitModuleVerification(
    dayNumber: number,
    selectedOptionIndex: number,
    notes: string
  ): Promise<VerificationResult> {
    const targetModule = ACTIVE_14DAY_CHALLENGE.modules.find((m) => m.day === dayNumber);
    if (!targetModule) {
      return { success: false, pointsAwarded: 0, explanation: "Invalid module day." };
    }

    const currentState = this.getLocalState();
    if (currentState.completedDays.includes(dayNumber)) {
      return {
        success: true,
        pointsAwarded: 0,
        alreadyCompleted: true,
        explanation: targetModule.verificationQuestion.explanation,
      };
    }

    const previousTries = currentState.triesByDay[dayNumber] || 0;
    const currentAttempt = previousTries + 1;

    const isCorrect = selectedOptionIndex === targetModule.verificationQuestion.correctIndex;
    if (!isCorrect) {
      // Record failed attempt in local state
      const updatedTriesState = {
        ...currentState,
        triesByDay: {
          ...currentState.triesByDay,
          [dayNumber]: currentAttempt,
        },
      };

      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updatedTriesState));
      }

      return {
        success: false,
        pointsAwarded: 0,
        attemptNumber: currentAttempt,
        explanation: `Incorrect answer (Attempt #${currentAttempt}). Each retry reduces available points (1st: 100%, 2nd: 75%, 3rd: 50%, 4th+: 25%). Review AWS Skill Builder and try again to verify genuine mastery!`,
      };
    }

    // Correct Answer: Calculate dynamic points based on attempt number
    const maxModulePoints = targetModule.basePoints + targetModule.quizPoints;
    const { awardedPoints, percentage, penaltyExplanation } = calculateAttemptPoints(
      maxModulePoints,
      currentAttempt
    );

    const completionEpoch = Date.now();
    const newCompletedDays = [...currentState.completedDays, dayNumber].sort((a, b) => a - b);
    const newQuizAnswers = { ...currentState.quizAnswers, [dayNumber]: selectedOptionIndex };
    const newNotes = { ...currentState.notesByDay, [dayNumber]: notes };
    const newTriesByDay = { ...currentState.triesByDay, [dayNumber]: currentAttempt };
    const newCompletedTimestamps = { ...currentState.completedTimestamps, [dayNumber]: completionEpoch };
    const newTotalPoints = currentState.totalPoints + awardedPoints;
    const newStreak = currentState.currentStreak + 1;

    const updatedState: StudentProgressState = {
      isRegistered: currentState.isRegistered,
      student: currentState.student,
      completedDays: newCompletedDays,
      quizAnswers: newQuizAnswers,
      notesByDay: newNotes,
      triesByDay: newTriesByDay,
      completedTimestamps: newCompletedTimestamps,
      lastCompletedAt: completionEpoch,
      totalPoints: newTotalPoints,
      currentStreak: newStreak,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updatedState));
    }

    // Save completion to Firestore if available
    if (db && currentState.student) {
      try {
        await Promise.race([
          addDoc(collection(db, "challengeCompletions"), {
            challengeId: ACTIVE_14DAY_CHALLENGE.id,
            dayNumber,
            studentEmail: currentState.student.email,
            studentName: currentState.student.name,
            rollNo: currentState.student.rollNo,
            notes,
            pointsEarned: awardedPoints,
            attemptNumber: currentAttempt,
            completedAt: serverTimestamp(),
            epochCompletedAt: completionEpoch,
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error("firestore_timeout")), 1500)),
        ]);
      } catch (err) {
        console.warn("Firestore completion write fallback:", err);
      }
    }

    return {
      success: true,
      pointsAwarded: awardedPoints,
      attemptNumber: currentAttempt,
      percentage,
      explanation: `${penaltyExplanation} ${targetModule.verificationQuestion.explanation}`,
    };
  },

  /**
   * Get merged live leaderboard
   * Sort hierarchy:
   * 1. Total Points DESC
   * 2. Earliest completion timestamp ASC (first to finish wins ties)
   * 3. Streak Days DESC
   */
  async getLeaderboard(): Promise<LeaderboardStudent[]> {
    const currentState = this.getLocalState();
    const roster = [...INITIAL_LEADERBOARD_DATA];

    // If local user is registered, inject them into the roster
    if (currentState.isRegistered && currentState.student) {
      const student = currentState.student;
      const monogram = student.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const existingIndex = roster.findIndex(
        (s) => s.id === "local-user" || s.rollOrHandle.includes(student.rollNo)
      );

      const finishTimeStr = currentState.lastCompletedAt
        ? `Finished · ${new Date(currentState.lastCompletedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} IST`
        : "In Progress";

      const totalAttempts = Object.values(currentState.triesByDay).reduce((a, b) => a + b, 0);

      const localEntry: LeaderboardStudent = {
        id: "local-user",
        name: `${student.name} (You)`,
        rollOrHandle: `${student.rollNo} (${student.branch})`,
        branch: student.branch,
        year: student.year,
        targetCert: student.targetCert,
        points: currentState.totalPoints,
        streakDays: currentState.currentStreak,
        completedDays: currentState.completedDays,
        badge: "Priority Member",
        avatarMonogram: monogram || "ME",
        completedAt: currentState.lastCompletedAt || undefined,
        finishTimeStr,
        attemptsCount: totalAttempts,
      };

      if (existingIndex >= 0) {
        roster[existingIndex] = localEntry;
      } else {
        roster.push(localEntry);
      }
    }

    // Try fetching external registrations from Firestore
    if (db) {
      try {
        const q = query(collection(db, "challengeRegistrations"), limit(20));
        const snapshot = await Promise.race([
          getDocs(q),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error("firestore_timeout")), 1500)),
        ]);
        snapshot.forEach((doc) => {
          const d = doc.data();
          if (d.name && d.email && !roster.some((r) => r.rollOrHandle.includes(d.rollNo || d.email))) {
            const monogram = d.name
              .split(" ")
              .map((p: string) => p[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            roster.push({
              id: doc.id,
              name: d.name,
              rollOrHandle: `${d.rollNo || "HBTU"} (${d.branch || "Engg"})`,
              branch: d.branch || "Engineering",
              year: d.year || "Student",
              targetCert: d.targetCert || "AWS Cloud Practitioner",
              points: d.totalPoints || 0,
              streakDays: d.streakDays || 0,
              completedDays: d.completedDays || [],
              badge: "Priority Member",
              avatarMonogram: monogram,
              completedAt: d.completedAt ? d.completedAt.toMillis() : undefined,
              finishTimeStr: d.completedAt ? "Verified Entry" : undefined,
            });
          }
        });
      } catch {
        // Fallback to in-memory roster
      }
    }

    // Strict Tie-Breaking Order:
    // 1. Highest Points First (DESC)
    // 2. Earliest Completion Timestamp (ASC - first to finish wins ties at any rank)
    // 3. Longest Streak (DESC)
    roster.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      const timeA = a.completedAt || Number.MAX_SAFE_INTEGER;
      const timeB = b.completedAt || Number.MAX_SAFE_INTEGER;
      if (timeA !== timeB) {
        return timeA - timeB;
      }
      return b.streakDays - a.streakDays;
    });

    // Re-assign badges based on new ranking
    return roster.map((student, idx) => {
      let badge: LeaderboardStudent["badge"] = "Priority Member";
      if (idx === 0) badge = "Rank 1 · LinkedIn Spotlight";
      else if (idx === 1) badge = "Rank 2 · Goodies & Swag";
      else if (idx === 2) badge = "Rank 3 · Team Recognition";
      else if (idx < 5) badge = "Merit Finalist";

      return {
        ...student,
        badge,
      };
    });
  },
};
