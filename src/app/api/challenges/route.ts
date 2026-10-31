import { NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { ACTIVE_14DAY_CHALLENGE } from "@/data/challenges";

const CHALLENGE_SYSTEM_DOC_ID = "hr58wQLvxJTh2SP6P8vmcYP5Fqx1";
const SYSTEM_EMAIL = "challenges-system@aws-sbg-hbtu.internal";
const SYSTEM_PASS = "AwsSbg2026ChallengeKey!";
const MAX_CHALLENGE_POINTS = 2475;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA_pkYkK5ymlE_AhpZHA8C6B-1pxzccZ28",
  authDomain: "aws-sbg-hbtu.firebaseapp.com",
  projectId: "aws-sbg-hbtu",
  storageBucket: "aws-sbg-hbtu.firebasestorage.app",
  messagingSenderId: "789667748745",
  appId: "1:789667748745:web:c3add174468aa235351f58",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Keep server-side authenticated session cached in memory
async function ensureServerAuth() {
  if (auth.currentUser) return auth.currentUser;
  const cred = await signInWithEmailAndPassword(auth, SYSTEM_EMAIL, SYSTEM_PASS);
  return cred.user;
}

function sanitizeKey(rollNo: string): string {
  return "s_" + rollNo.trim().replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
}

function isTest(str?: string): boolean {
  if (!str) return false;
  const l = str.trim().toLowerCase();
  return (
    l === "test" ||
    l === "testing" ||
    l === "tester" ||
    l === "demo" ||
    l === "dummy" ||
    l.startsWith("test ") ||
    l.endsWith(" test") ||
    l.includes("test@") ||
    l.includes("example.com")
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await ensureServerAuth();
    const docRef = doc(db, "users", CHALLENGE_SYSTEM_DOC_ID);
    const snap = await getDoc(docRef);
    const data = snap.exists() ? snap.data() : {};
    const participants = data?.participants || {};
    const challengeLocked = data?.challengeLocked ?? (ACTIVE_14DAY_CHALLENGE.status === "COMPLETED");

    return NextResponse.json(
      { success: true, participants, challengeLocked, status: ACTIVE_14DAY_CHALLENGE.status },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch leaderboard";
    return NextResponse.json(
      { success: false, error: msg, participants: {} },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    if (!action) {
      return NextResponse.json({ error: "Missing action" }, { status: 400 });
    }

    await ensureServerAuth();
    const docRef = doc(db, "users", CHALLENGE_SYSTEM_DOC_ID);
    const snap = await getDoc(docRef);
    const docData = snap.exists() ? snap.data() : {};
    const currentParticipants = docData?.participants || {};
    const isLocked = docData?.challengeLocked === true || ACTIVE_14DAY_CHALLENGE.status === "COMPLETED";

    // When challenge is locked/closed, refuse registrations and completions
    if (isLocked) {
      if (action === "register") {
        return NextResponse.json(
          { error: "The 14-Day Challenge is closed and locked. New registrations are no longer accepted." },
          { status: 403 }
        );
      }
      if (action === "complete") {
        return NextResponse.json(
          { error: "The 14-Day Challenge is closed and locked. Submissions are no longer accepted." },
          { status: 403 }
        );
      }
      if (action === "sync") {
        // Return existing verified server data without applying modifications
        const { student } = body;
        if (student?.rollNo) {
          const key = sanitizeKey(student.rollNo);
          const existing = currentParticipants[key];
          if (existing) {
            return NextResponse.json({ success: true, participant: existing, locked: true });
          }
        }
        return NextResponse.json(
          { error: "The challenge is locked and standings are final." },
          { status: 403 }
        );
      }
    }

    if (action === "register") {
      const { student } = body;
      if (!student || !student.name || !student.rollNo) {
        return NextResponse.json({ error: "Name and Roll Number required" }, { status: 400 });
      }

      if (isTest(student.name) || isTest(student.rollNo) || isTest(student.email)) {
        return NextResponse.json({ error: "Test registrations are not allowed." }, { status: 400 });
      }

      const key = sanitizeKey(student.rollNo);
      const existing = currentParticipants[key];

      const participant = {
        id: key,
        name: student.name.trim(),
        email: (student.email || "").trim(),
        rollNo: student.rollNo.trim(),
        branch: student.branch?.trim() || "Engineering",
        year: student.year?.trim() || "Student",
        targetCert: student.targetCert?.trim() || "AWS Cloud Practitioner (CLF-C02)",
        points: Math.min(MAX_CHALLENGE_POINTS, existing?.points || 0),
        streakDays: existing?.streakDays || 0,
        completedDays: existing?.completedDays || [],
        lastCompletedAt: existing?.lastCompletedAt || null,
        attemptsCount: existing?.attemptsCount || 0,
        registeredAt: existing?.registeredAt || Date.now(),
      };

      await setDoc(docRef, { participants: { [key]: participant } }, { merge: true });
      return NextResponse.json({ success: true, participant });
    }

    if (action === "complete") {
      const { rollNo, dayNumber, pointsEarned, attemptNumber, studentName, branch, year, targetCert } = body;
      if (!rollNo || dayNumber === undefined) {
        return NextResponse.json({ error: "Roll Number and Day Number required" }, { status: 400 });
      }

      const key = sanitizeKey(rollNo);
      const existing = currentParticipants[key];
      const dayNum = Number(dayNumber);

      // Prevent duplicate points exploitation if module was already completed
      const isAlreadyCompleted = Boolean(existing?.completedDays?.includes(dayNum));
      if (isAlreadyCompleted) {
        return NextResponse.json({
          success: true,
          message: "Module was already verified. No additional points awarded.",
          participant: existing,
        });
      }

      const completedDays = Array.from(new Set([...(existing?.completedDays || []), dayNum])).sort(
        (a, b) => a - b
      );

      const calculatedPoints = Math.min(
        MAX_CHALLENGE_POINTS,
        (existing?.points || 0) + (Number(pointsEarned) || 0)
      );

      // Preserve earliest completion timestamp: only set if not previously recorded upon finishing all modules
      const previousFinish = existing?.lastCompletedAt;
      const lastCompletedAt = (existing?.completedDays?.length >= 15 && previousFinish)
        ? previousFinish
        : Date.now();

      const updated = {
        id: key,
        name: studentName?.trim() || existing?.name || "Participant",
        email: existing?.email || "",
        rollNo: rollNo.trim(),
        branch: branch?.trim() || existing?.branch || "Engineering",
        year: year?.trim() || existing?.year || "Student",
        targetCert: targetCert?.trim() || existing?.targetCert || "AWS Cloud Practitioner (CLF-C02)",
        points: calculatedPoints,
        streakDays: (existing?.streakDays || 0) + 1,
        completedDays,
        lastCompletedAt,
        attemptsCount: (existing?.attemptsCount || 0) + (Number(attemptNumber) || 1),
        registeredAt: existing?.registeredAt || Date.now(),
      };

      await setDoc(docRef, { participants: { [key]: updated } }, { merge: true });
      return NextResponse.json({ success: true, participant: updated });
    }

    if (action === "sync") {
      const { student, points, streakDays, completedDays, lastCompletedAt, attemptsCount } = body;
      if (!student || !student.name || !student.rollNo) {
        return NextResponse.json({ error: "Student details required" }, { status: 400 });
      }

      if (isTest(student.name) || isTest(student.rollNo) || isTest(student.email)) {
        return NextResponse.json({ error: "Test registrations are not allowed." }, { status: 400 });
      }

      const key = sanitizeKey(student.rollNo);
      const existing = currentParticipants[key];

      const mergedCompletedDays = Array.from(
        new Set([...(existing?.completedDays || []), ...(completedDays || [])])
      ).sort((a: number, b: number) => a - b);

      // Never allow points to exceed MAX_CHALLENGE_POINTS
      const sanitizedPoints = Math.min(
        MAX_CHALLENGE_POINTS,
        Math.max(existing?.points || 0, Number(points) || 0)
      );

      // Preserve genuine first completion timestamp: earlier timestamp takes precedence
      const existingTime = existing?.lastCompletedAt ? Number(existing.lastCompletedAt) : null;
      const incomingTime = lastCompletedAt ? Number(lastCompletedAt) : null;
      let finalCompletedAt: number | null = null;
      if (existingTime && incomingTime) {
        finalCompletedAt = Math.min(existingTime, incomingTime);
      } else {
        finalCompletedAt = existingTime || incomingTime || null;
      }

      const updated = {
        id: key,
        name: student.name.trim(),
        email: (student.email || existing?.email || "").trim(),
        rollNo: student.rollNo.trim(),
        branch: student.branch?.trim() || existing?.branch || "Engineering",
        year: student.year?.trim() || existing?.year || "Student",
        targetCert: student.targetCert?.trim() || existing?.targetCert || "AWS Cloud Practitioner (CLF-C02)",
        points: sanitizedPoints,
        streakDays: Math.min(15, Math.max(existing?.streakDays || 0, Number(streakDays) || 0)),
        completedDays: mergedCompletedDays,
        lastCompletedAt: finalCompletedAt,
        attemptsCount: Math.max(existing?.attemptsCount || 0, Number(attemptsCount) || 0),
        registeredAt: existing?.registeredAt || Date.now(),
      };

      await setDoc(docRef, { participants: { [key]: updated } }, { merge: true });
      return NextResponse.json({ success: true, participant: updated });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
