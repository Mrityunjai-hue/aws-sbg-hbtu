import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, setDoc, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
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
  totalPoints: number;
  currentStreak: number;
}

const STORAGE_KEY_STUDENT = "aws_sbg_14day_student";
const STORAGE_KEY_PROGRESS = "aws_sbg_14day_progress";

export const ChallengeService = {
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
        : { completedDays: [], quizAnswers: {}, notesByDay: {}, totalPoints: 0, currentStreak: 0 };

      return {
        isRegistered: !!student,
        student,
        completedDays: progress.completedDays || [],
        quizAnswers: progress.quizAnswers || {},
        notesByDay: progress.notesByDay || {},
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
   */
  async submitModuleVerification(dayNumber: number, selectedOptionIndex: number, notes: string): Promise<{
    success: boolean;
    pointsAwarded: number;
    explanation: string;
    alreadyCompleted?: boolean;
  }> {
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

    const isCorrect = selectedOptionIndex === targetModule.verificationQuestion.correctIndex;
    if (!isCorrect) {
      return {
        success: false,
        pointsAwarded: 0,
        explanation: "Incorrect answer. Review the concept on AWS Skill Builder and try again to verify genuine completion!",
      };
    }

    // Calculation
    const pointsAwarded = targetModule.basePoints + targetModule.quizPoints;
    const newCompletedDays = [...currentState.completedDays, dayNumber].sort((a, b) => a - b);
    const newQuizAnswers = { ...currentState.quizAnswers, [dayNumber]: selectedOptionIndex };
    const newNotes = { ...currentState.notesByDay, [dayNumber]: notes };
    const newTotalPoints = currentState.totalPoints + pointsAwarded;
    const newStreak = currentState.currentStreak + 1;

    const updatedState = {
      completedDays: newCompletedDays,
      quizAnswers: newQuizAnswers,
      notesByDay: newNotes,
      totalPoints: newTotalPoints,
      currentStreak: newStreak,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updatedState));
    }

    // Save to Firestore if available
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
            pointsEarned: pointsAwarded,
            completedAt: serverTimestamp(),
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error("firestore_timeout")), 1500)),
        ]);
      } catch (err) {
        console.warn("Firestore completion write fallback:", err);
      }
    }

    return {
      success: true,
      pointsAwarded,
      explanation: targetModule.verificationQuestion.explanation,
    };
  },

  /**
   * Get merged live leaderboard
   */
  async getLeaderboard(): Promise<LeaderboardStudent[]> {
    const currentState = this.getLocalState();
    let roster = [...INITIAL_LEADERBOARD_DATA];

    // If local user is registered, inject them into the roster
    if (currentState.isRegistered && currentState.student) {
      const student = currentState.student;
      const monogram = student.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const existingIndex = roster.findIndex((s) => s.id === "local-user" || s.rollOrHandle.includes(student.rollNo));

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
        badge: "Priority Builder",
        avatarMonogram: monogram || "ME",
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
              badge: "Priority Builder",
              avatarMonogram: monogram,
            });
          }
        });
      } catch (e) {
        // Fallback to in-memory roster
      }
    }

    // Sort descending by points, then by streakDays
    roster.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.streakDays - a.streakDays;
    });

    // Re-assign badges based on new ranking
    return roster.map((student, idx) => {
      let badge: LeaderboardStudent["badge"] = "Priority Builder";
      if (idx === 0) badge = "Voucher Winner (Top 1)";
      else if (idx === 1) badge = "Voucher Winner (Top 2)";
      else if (idx === 2) badge = "Voucher Winner (Top 3)";
      else if (idx < 5) badge = "Top 5 Finalist";

      return {
        ...student,
        badge,
      };
    });
  },
};
