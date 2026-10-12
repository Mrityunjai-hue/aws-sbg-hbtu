"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ACTIVE_14DAY_CHALLENGE,
  ChallengeDayModule,
  LeaderboardStudent,
} from "@/data/challenges";
import { ChallengeService, StudentProgressState } from "@/lib/services/challenges";
import { LeaderAnnouncementBanner } from "@/components/challenges/LeaderAnnouncementBanner";
import { ChallengeRegisterModal } from "@/components/challenges/ChallengeRegisterModal";
import { ModuleQuizModal } from "@/components/challenges/ModuleQuizModal";
import { RoadmapViewerModal } from "@/components/challenges/RoadmapViewerModal";
import { LeaderboardPodium } from "@/components/challenges/LeaderboardPodium";
import { DayModuleCard } from "@/components/challenges/DayModuleCard";

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<"modules" | "leaderboard" | "roadmap" | "rules">("modules");
  const [weekFilter, setWeekFilter] = useState<"all" | "week1" | "week2">("all");

  const [studentState, setStudentState] = useState<StudentProgressState>({
    isRegistered: false,
    student: null,
    completedDays: [],
    quizAnswers: {},
    notesByDay: {},
    totalPoints: 0,
    currentStreak: 0,
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardStudent[]>([]);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const [activeQuizModule, setActiveQuizModule] = useState<ChallengeDayModule | null>(null);

  // Load state on mount
  const refreshState = async () => {
    const local = ChallengeService.getLocalState();
    setStudentState(local);
    const lb = await ChallengeService.getLeaderboard();
    setLeaderboard(lb);
  };

  useEffect(() => {
    refreshState();
  }, []);

  const handleOpenQuiz = (module: ChallengeDayModule) => {
    setActiveQuizModule(module);
  };

  const handleQuizSuccess = () => {
    refreshState();
  };

  const handleRegisteredSuccess = () => {
    refreshState();
    setActiveTab("modules");
  };

  const filteredModules = ACTIVE_14DAY_CHALLENGE.modules.filter((m) => {
    if (weekFilter === "week1") return m.day <= 7;
    if (weekFilter === "week2") return m.day > 7;
    return true;
  });

  const currentRank = leaderboard.findIndex((s) => s.id === "local-user") + 1;

  return (
    <div className="site-container py-8 sm:py-12 md:py-16 space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
        <Link href="/" className="hover:text-on-background transition-colors">
          Home
        </Link>
        <span>/</span>
        <span>Community</span>
        <span>/</span>
        <span className="text-on-background font-bold">14-Day AWS Challenge Sprint</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-outline">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-accent/15 border border-primary-accent/30 text-primary-accent font-mono text-xs font-bold">
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
            <span>COMMUNITY SPRINT · 14-DAY LEARNING CHALLENGE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-on-background tracking-tight">
            AWS Cloud Practitioner Challenge
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant font-mono max-w-2xl">
            {ACTIVE_14DAY_CHALLENGE.subtitle}
          </p>
        </div>

        <div className="shrink-0 flex flex-wrap items-center gap-3">
          {!studentState.isRegistered ? (
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="btn-3d-aws px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-extrabold text-black uppercase tracking-wider flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">how_to_reg</span>
              <span>Register Now · Free</span>
            </button>
          ) : (
            <div className="p-3 px-4 rounded-2xl bg-surface-low border border-primary-accent/40 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-xs">
                {studentState.currentStreak}d
              </div>
              <div className="font-mono text-xs">
                <span className="text-on-surface-variant block">Your Streak</span>
                <span className="text-on-background font-bold">{studentState.totalPoints} PTS</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Leader Announcement Banner (Exact message from the leader) */}
      <LeaderAnnouncementBanner
        onOpenRoadmap={() => setIsRoadmapModalOpen(true)}
        onRegisterClick={() => setIsRegisterModalOpen(true)}
        isRegistered={studentState.isRegistered}
      />

      {/* Student Personal Dashboard HUD (When Registered) */}
      {studentState.isRegistered && studentState.student && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-primary-accent/15 via-surface-low to-secondary-accent/10 border border-primary-accent/40 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-primary-accent text-white font-mono font-black text-base flex items-center justify-center shadow-lg shadow-primary-accent/20">
                {studentState.student.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-on-background">
                    {studentState.student.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold">
                    ACTIVE BUILDER
                  </span>
                </div>
                <p className="text-xs font-mono text-on-surface-variant">
                  {studentState.student.rollNo} · {studentState.student.branch} ({studentState.student.year})
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 font-mono">
              <div className="text-center">
                <div className="text-[10px] text-on-surface-variant uppercase">Current Streak</div>
                <div className="text-lg font-black text-amber-400 flex items-center justify-center gap-1">
                  <span>{studentState.currentStreak} Days</span>
                  <span>🔥</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-[10px] text-on-surface-variant uppercase">Modules Completed</div>
                <div className="text-lg font-black text-secondary-accent">
                  {studentState.completedDays.length} / 14
                </div>
              </div>

              <div className="text-center">
                <div className="text-[10px] text-on-surface-variant uppercase">Total Points</div>
                <div className="text-lg font-black text-primary-accent">
                  {studentState.totalPoints} PTS
                </div>
              </div>

              {currentRank > 0 && (
                <div className="text-center">
                  <div className="text-[10px] text-on-surface-variant uppercase">Standing</div>
                  <div className="text-lg font-black text-emerald-400">
                    Rank #{currentRank}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-outline pb-2">
        <button
          onClick={() => setActiveTab("modules")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs font-bold transition-all ${
            activeTab === "modules"
              ? "bg-primary-accent text-white shadow-lg shadow-primary-accent/25"
              : "bg-surface-low text-on-surface-variant hover:text-on-background hover:bg-surface-lowest"
          }`}
        >
          <span className="material-symbols-outlined text-base">calendar_view_day</span>
          <span>14-Day Modules & Quizzes</span>
        </button>

        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs font-bold transition-all ${
            activeTab === "leaderboard"
              ? "bg-primary-accent text-white shadow-lg shadow-primary-accent/25"
              : "bg-surface-low text-on-surface-variant hover:text-on-background hover:bg-surface-lowest"
          }`}
        >
          <span className="material-symbols-outlined text-base">emoji_events</span>
          <span>Live Leaderboard & Vouchers</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-black">
            TOP 3
          </span>
        </button>

        <button
          onClick={() => setActiveTab("roadmap")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs font-bold transition-all ${
            activeTab === "roadmap"
              ? "bg-primary-accent text-white shadow-lg shadow-primary-accent/25"
              : "bg-surface-low text-on-surface-variant hover:text-on-background hover:bg-surface-lowest"
          }`}
        >
          <span className="material-symbols-outlined text-base">map</span>
          <span>Certification Roadmap Guide</span>
        </button>

        <button
          onClick={() => setActiveTab("rules")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs font-bold transition-all ${
            activeTab === "rules"
              ? "bg-primary-accent text-white shadow-lg shadow-primary-accent/25"
              : "bg-surface-low text-on-surface-variant hover:text-on-background hover:bg-surface-lowest"
          }`}
        >
          <span className="material-symbols-outlined text-base">gavel</span>
          <span>Rules & Scoring</span>
        </button>
      </div>

      {/* TAB 1: 14-DAY MODULES */}
      {activeTab === "modules" && (
        <div className="space-y-6">
          {/* Week Filter Chips */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWeekFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                  weekFilter === "all"
                    ? "bg-secondary-accent text-black"
                    : "bg-surface-low text-on-surface-variant hover:text-on-background"
                }`}
              >
                All 14 Days
              </button>
              <button
                onClick={() => setWeekFilter("week1")}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                  weekFilter === "week1"
                    ? "bg-secondary-accent text-black"
                    : "bg-surface-low text-on-surface-variant hover:text-on-background"
                }`}
              >
                Week 1 (Days 1–7)
              </button>
              <button
                onClick={() => setWeekFilter("week2")}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                  weekFilter === "week2"
                    ? "bg-secondary-accent text-black"
                    : "bg-surface-low text-on-surface-variant hover:text-on-background"
                }`}
              >
                Week 2 (Days 8–14)
              </button>
            </div>

            <div className="text-xs font-mono text-on-surface-variant flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>
                {studentState.completedDays.length} of 14 Modules Verified
              </span>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <DayModuleCard
                key={module.day}
                module={module}
                isCompleted={studentState.completedDays.includes(module.day)}
                onOpenQuiz={handleOpenQuiz}
                isRegistered={studentState.isRegistered}
                onPromptRegister={() => setIsRegisterModalOpen(true)}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE LEADERBOARD */}
      {activeTab === "leaderboard" && (
        <LeaderboardPodium
          students={leaderboard}
          currentUserId={studentState.student?.rollNo}
        />
      )}

      {/* TAB 3: CERTIFICATION ROADMAP */}
      {activeTab === "roadmap" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-surface-low border border-outline flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-extrabold text-xl text-on-background">
                Official AWS Certification Paths Roadmap
              </h2>
              <p className="text-xs font-mono text-on-surface-variant mt-1">
                Explore recommended certifications across Cloud Architecture, DevOps, Security, Data, and AI/ML.
              </p>
            </div>
            <button
              onClick={() => setIsRoadmapModalOpen(true)}
              className="btn-3d-secondary px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-on-background flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base text-primary-accent">open_in_full</span>
              <span>Open Interactive Viewer</span>
            </button>
          </div>

          <div className="rounded-3xl overflow-hidden border border-outline bg-black shadow-2xl p-4 flex justify-center">
            <img
              src="/images/challenges/aws-certification-paths-roadmap.png"
              alt="AWS Certification Paths Roadmap Infographic"
              className="max-w-2xl w-full h-auto rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => setIsRoadmapModalOpen(true)}
            />
          </div>
        </div>
      )}

      {/* TAB 4: RULES & SCORING */}
      {activeTab === "rules" && (
        <div className="space-y-6 max-w-4xl">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-low border border-outline space-y-6">
            <div>
              <h2 className="text-xl font-black text-on-background">
                Challenge Rules, Points Criteria & Voucher Eligibility
              </h2>
              <p className="text-xs font-mono text-on-surface-variant mt-1">
                Transparent rules governing the HBTU 14-Day AWS Learning Challenge.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                <div className="flex items-center gap-2 text-primary-accent font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">verified_user</span>
                  <span>Anti-Cheat Verification</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  To mark a module complete, you must pass the scenario-based verification question. This ensures builders genuinely study the concepts on AWS Skill Builder rather than blindly clicking.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">local_fire_department</span>
                  <span>Streak Multiplier</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Completing modules daily extends your learning streak. Consistency is a key ranking criterion when breaking ties for the top 3 voucher positions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                <div className="flex items-center gap-2 text-secondary-accent font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">calculate</span>
                  <span>Point Distribution</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Each day awards <strong>100 Base Module Points</strong> + <strong>50 Verification Quiz Points</strong>. Day 14 Capstone awards <strong>250 Points</strong> (150 Base + 100 Quiz).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">confirmation_number</span>
                  <span>Voucher Distribution</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  The Top 3 students on the verified final leaderboard on October 27, 2026 receive 100% sponsored AWS Certified Cloud Practitioner vouchers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ChallengeRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegistered={handleRegisteredSuccess}
      />

      <ModuleQuizModal
        module={activeQuizModule}
        isOpen={!!activeQuizModule}
        onClose={() => setActiveQuizModule(null)}
        onVerifiedSuccess={handleQuizSuccess}
      />

      <RoadmapViewerModal
        isOpen={isRoadmapModalOpen}
        onClose={() => setIsRoadmapModalOpen(false)}
      />
    </div>
  );
}
