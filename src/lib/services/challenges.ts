import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, getDoc, query, limit, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import { ACTIVE_14DAY_CHALLENGE, INITIAL_LEADERBOARD_DATA, LeaderboardStudent } from "@/data/challenges";

const CHALLENGE_SYSTEM_DOC_ID = "hr58wQLvxJTh2SP6P8vmcYP5Fqx1";

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

/**
 * Identify test/dummy registrations to purge from display and leaderboard
 */
export function isTestCandidate(name?: string, roll?: string, email?: string): boolean {
  const check = (val?: string) => {
    if (!val) return false;
    const lower = val.trim().toLowerCase();
    if (!lower) return false;
    return (
      lower === "test" ||
      lower === "testing" ||
      lower === "tester" ||
      lower === "test candidate" ||
      lower === "test user" ||
      lower === "test student" ||
      lower === "demo" ||
      lower === "dummy" ||
      lower === "sample" ||
      lower.startsWith("test ") ||
      lower.endsWith(" test") ||
      lower.startsWith("test_") ||
      lower.startsWith("test-") ||
      lower.startsWith("test1") ||
      lower.startsWith("test2") ||
      lower.includes("test@") ||
      lower.includes("@test.") ||
      lower.includes("example.com")
    );
  };
  return check(name) || check(roll) || check(email);
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

      // Automatically purge test registration if candidate name/roll/email is a test entry
      if (student && isTestCandidate(student.name, student.rollNo, student.email)) {
        try {
          localStorage.removeItem(STORAGE_KEY_STUDENT);
          localStorage.removeItem(STORAGE_KEY_PROGRESS);
        } catch (err) {
          console.warn("Failed to remove test candidate from local storage:", err);
        }
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
    if (isTestCandidate(input.name, input.rollNo, input.email)) {
      throw new Error("Test registration cannot be submitted. Please use genuine student details.");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(input));
    }

    // Sync to shared backend so all students see this registration
    try {
      await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", student: input }),
      });
    } catch (err) {
      console.warn("Server challenge registration sync error:", err);
    }

    return true;
  },

  /**
   * Sync local student progress to shared backend
   */
  async syncLocalStateToServer(): Promise<void> {
    const currentState = this.getLocalState();
    if (!currentState.isRegistered || !currentState.student) return;
    if (isTestCandidate(currentState.student.name, currentState.student.rollNo, currentState.student.email)) return;

    try {
      const totalAttempts = Object.values(currentState.triesByDay).reduce((a, b) => a + b, 0);
      await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sync",
          student: currentState.student,
          points: currentState.totalPoints,
          streakDays: currentState.currentStreak,
          completedDays: currentState.completedDays,
          lastCompletedAt: currentState.lastCompletedAt,
          attemptsCount: totalAttempts,
        }),
      });
    } catch (err) {
      console.warn("Background challenge sync error:", err);
    }
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

    // Sync to shared backend so all students see this module completion and updated points
    if (currentState.student) {
      try {
        await fetch("/api/challenges", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "complete",
            rollNo: currentState.student.rollNo,
            studentName: currentState.student.name,
            branch: currentState.student.branch,
            year: currentState.student.year,
            targetCert: currentState.student.targetCert,
            dayNumber,
            pointsEarned: awardedPoints,
            attemptNumber: currentAttempt,
          }),
        });
      } catch (err) {
        console.warn("Server challenge completion sync error:", err);
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
    let participantsMap: Record<string, any> = {};

    // 1. Fetch shared participants from Next.js server route (HTTP GET is fastest and avoids gRPC websocket drops)
    if (typeof window !== "undefined") {
      try {
        const res = await Promise.race([
          fetch("/api/challenges"),
          new Promise<Response>((_, reject) => setTimeout(() => reject(new Error("api_timeout")), 2500)),
        ]);
        if (res.ok) {
          const data = await res.json();
          if (data && data.participants) {
            participantsMap = data.participants;
          }
        }
      } catch (err) {
        // Fallback to Firestore direct read
      }
    }

    // 2. Direct Firestore read fallback if API route returned empty or timed out
    if (Object.keys(participantsMap).length === 0 && db) {
      try {
        const snap = await Promise.race([
          getDoc(doc(db, "users", CHALLENGE_SYSTEM_DOC_ID)),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error("firestore_timeout")), 2000)),
        ]);
        if (snap && snap.exists()) {
          participantsMap = snap.data()?.participants || {};
        }
      } catch (err) {
        // Fallback to local roster
      }
    }

    const roster: LeaderboardStudent[] = [...INITIAL_LEADERBOARD_DATA];
    const localRoll = currentState.student?.rollNo?.trim().toLowerCase();

    // Map all shared participants
    Object.values(participantsMap).forEach((p: any) => {
      if (!p || !p.name || isTestCandidate(p.name, p.rollNo, p.email)) return;
      const isCurrentLocal = Boolean(localRoll && p.rollNo && p.rollNo.trim().toLowerCase() === localRoll);
      const monogram = p.name
        .split(" ")
        .map((part: string) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const effectivePoints = isCurrentLocal
        ? Math.max(Number(p.points) || 0, currentState.totalPoints)
        : Number(p.points) || 0;
      const effectiveStreak = isCurrentLocal
        ? Math.max(Number(p.streakDays) || 0, currentState.currentStreak)
        : Number(p.streakDays) || 0;
      const effectiveCompletedDays =
        isCurrentLocal && currentState.completedDays.length > (p.completedDays?.length || 0)
          ? currentState.completedDays
          : p.completedDays || [];
      const effectiveLastCompletedAt = isCurrentLocal
        ? currentState.lastCompletedAt || p.lastCompletedAt
        : p.lastCompletedAt;

      const finishTimeStr = effectiveLastCompletedAt
        ? `Finished · ${new Date(effectiveLastCompletedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} IST`
        : effectiveCompletedDays.length > 0
        ? "In Progress"
        : "Registered";

      roster.push({
        id: isCurrentLocal ? "local-user" : p.id || `student_${p.rollNo}`,
        name: isCurrentLocal ? `${p.name} (You)` : p.name,
        rollOrHandle: `${p.rollNo} (${p.branch || "Engineering"})`,
        branch: p.branch || "Engineering",
        year: p.year || "Student",
        targetCert: p.targetCert || "AWS Cloud Practitioner (CLF-C02)",
        points: effectivePoints,
        streakDays: effectiveStreak,
        completedDays: effectiveCompletedDays,
        badge: "Priority Member",
        avatarMonogram: monogram || "SB",
        completedAt: effectiveLastCompletedAt || undefined,
        finishTimeStr,
        attemptsCount: p.attemptsCount || 0,
      });
    });

    // If local user is registered and NOT a test candidate and not yet in the mapped roster, inject them
    if (
      currentState.isRegistered &&
      currentState.student &&
      !isTestCandidate(
        currentState.student.name,
        currentState.student.rollNo,
        currentState.student.email
      ) &&
      !roster.some((r) => r.id === "local-user" || (localRoll && r.rollOrHandle.toLowerCase().includes(localRoll)))
    ) {
      const student = currentState.student;
      const monogram = student.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const finishTimeStr = currentState.lastCompletedAt
        ? `Finished · ${new Date(currentState.lastCompletedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} IST`
        : currentState.completedDays.length > 0
        ? "In Progress"
        : "Registered";

      const totalAttempts = Object.values(currentState.triesByDay).reduce((a, b) => a + b, 0);

      roster.push({
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
      });
    }

    // Strict Filter: remove any test candidates from the final roster
    const cleanRoster = roster.filter(
      (s) => !isTestCandidate(s.name, s.rollOrHandle, s.targetCert)
    );

    // Strict Tie-Breaking Order:
    // 1. Highest Points First (DESC)
    // 2. Earliest Completion Timestamp (ASC - first to finish wins ties at any rank)
    // 3. Longest Streak (DESC)
    cleanRoster.sort((a, b) => {
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

    // Re-assign badges based on new ranking:
    // Only contestants with points > 0 qualify for Rank 1, 2, 3...
    // Zero-point contestants are designated as registered awaiting first verification
    let rankCounter = 1;
    return cleanRoster.map((student) => {
      if (student.points === 0) {
        return {
          ...student,
          badge: "Registered · Awaiting M1",
        };
      }
      const rank = rankCounter++;
      let badge: LeaderboardStudent["badge"] = "Certificate & Swag";
      if (rank === 1) badge = "Rank 1 · AWS Backpack & Shoutout";
      else if (rank === 2) badge = "Rank 2 · Goodies & Shoutout";
      else if (rank === 3) badge = "Rank 3 · Goodies & Shoutout";
      else if (rank <= 5) badge = "Top 5 · Certificate & Swag";

      return {
        ...student,
        badge,
      };
    });
  },
};
