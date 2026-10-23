import { NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const CHALLENGE_SYSTEM_DOC_ID = "hr58wQLvxJTh2SP6P8vmcYP5Fqx1";
const SYSTEM_EMAIL = "challenges-system@aws-sbg-hbtu.internal";
const SYSTEM_PASS = "AwsSbg2026ChallengeKey!";

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

export async function GET() {
  try {
    const docRef = doc(db, "users", CHALLENGE_SYSTEM_DOC_ID);
    const snap = await getDoc(docRef);
    const participants = snap.exists() ? snap.data()?.participants || {} : {};
    return NextResponse.json({ success: true, participants });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch leaderboard";
    return NextResponse.json({ success: false, error: msg, participants: {} }, { status: 500 });
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
    const currentParticipants = snap.exists() ? snap.data()?.participants || {} : {};

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
        points: existing?.points || 0,
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

      const completedDays = Array.from(new Set([...(existing?.completedDays || []), Number(dayNumber)])).sort(
        (a, b) => a - b
      );

      const updated = {
        id: key,
        name: studentName?.trim() || existing?.name || "Participant",
        email: existing?.email || "",
        rollNo: rollNo.trim(),
        branch: branch?.trim() || existing?.branch || "Engineering",
        year: year?.trim() || existing?.year || "Student",
        targetCert: targetCert?.trim() || existing?.targetCert || "AWS Cloud Practitioner (CLF-C02)",
        points: (existing?.points || 0) + (Number(pointsEarned) || 0),
        streakDays: (existing?.streakDays || 0) + 1,
        completedDays,
        lastCompletedAt: Date.now(),
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

      const updated = {
        id: key,
        name: student.name.trim(),
        email: (student.email || existing?.email || "").trim(),
        rollNo: student.rollNo.trim(),
        branch: student.branch?.trim() || existing?.branch || "Engineering",
        year: student.year?.trim() || existing?.year || "Student",
        targetCert: student.targetCert?.trim() || existing?.targetCert || "AWS Cloud Practitioner (CLF-C02)",
        points: Math.max(existing?.points || 0, Number(points) || 0),
        streakDays: Math.max(existing?.streakDays || 0, Number(streakDays) || 0),
        completedDays: mergedCompletedDays,
        lastCompletedAt: lastCompletedAt || existing?.lastCompletedAt || null,
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
