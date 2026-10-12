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
import { CertificationRoadmapGuide } from "@/components/challenges/CertificationRoadmapGuide";

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<"modules" | "leaderboard" | "roadmap" | "rules">("modules");
  const [curriculumFilter, setCurriculumFilter] = useState<"all" | "core" | "data" | "security" | "arch">("all");

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
    if (curriculumFilter === "core") return m.moduleNumber <= 5;
    if (curriculumFilter === "data") return m.moduleNumber >= 6 && m.moduleNumber <= 8;
    if (curriculumFilter === "security") return m.moduleNumber >= 9 && m.moduleNumber <= 11;
    if (curriculumFilter === "arch") return m.moduleNumber >= 12;
    return true;
  });

  const currentRank = leaderboard.findIndex((s) => s.id === "local-user") + 1;
  const progressPercent = Math.round((studentState.completedDays.length / 15) * 100);

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
        <span className="text-on-background font-bold">AWS Learning Challenge Sprint</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-outline">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-accent/15 border border-primary-accent/30 text-primary-accent font-mono text-xs font-bold">
            <span className="material-symbols-outlined text-sm">school</span>
            <span>AWS CLOUD PRACTITIONER ESSENTIALS · 15-MODULE SPRINT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-on-background tracking-tight">
            AWS Cloud Practitioner Challenge
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant font-mono max-w-3xl">
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
              <span>Register for Challenge</span>
            </button>
          ) : (
            <div className="p-3 px-4 rounded-2xl bg-surface-low border border-primary-accent/40 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-xs">
                {studentState.currentStreak}d
              </div>
              <div className="font-mono text-xs">
                <span className="text-on-surface-variant block">Active Streak</span>
                <span className="text-on-background font-bold">{studentState.totalPoints} PTS</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Leader Announcement Banner (Executive Leadership Dispatch, No Emojis) */}
      <LeaderAnnouncementBanner
        onOpenRoadmap={() => setIsRoadmapModalOpen(true)}
        onRegisterClick={() => setIsRegisterModalOpen(true)}
        isRegistered={studentState.isRegistered}
      />

      {/* Student Personal Dashboard HUD (When Registered) */}
      {studentState.isRegistered && studentState.student && (
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-primary-accent/15 via-surface-low to-secondary-accent/10 border border-primary-accent/40 shadow-xl space-y-4">
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
                    VERIFIED CANDIDATE
                  </span>
                </div>
                <p className="text-xs font-mono text-on-surface-variant">
                  {studentState.student.rollNo} · {studentState.student.branch} ({studentState.student.year})
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 font-mono">
              <div className="text-center">
                <div className="text-[10px] text-on-surface-variant uppercase">Active Streak</div>
                <div className="text-lg font-black text-amber-400">
                  {studentState.currentStreak} Days
                </div>
              </div>

              <div className="text-center">
                <div className="text-[10px] text-on-surface-variant uppercase">Modules Verified</div>
                <div className="text-lg font-black text-secondary-accent">
                  {studentState.completedDays.length} / 15
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
                  <div className="text-[10px] text-on-surface-variant uppercase">Current Standing</div>
                  <div className="text-lg font-black text-emerald-400">
                    Rank #{currentRank}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="space-y-1.5 pt-2 border-t border-outline/60">
            <div className="flex justify-between text-xs font-mono text-on-surface-variant">
              <span>Overall Curriculum Completion</span>
              <span className="font-bold text-on-background">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-lowest overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
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
          <span className="material-symbols-outlined text-base">menu_book</span>
          <span>15-Module Curriculum & Assessments</span>
        </button>

        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs font-bold transition-all ${
            activeTab === "leaderboard"
              ? "bg-primary-accent text-white shadow-lg shadow-primary-accent/25"
              : "bg-surface-low text-on-surface-variant hover:text-on-background hover:bg-surface-lowest"
          }`}
        >
          <span className="material-symbols-outlined text-base">leaderboard</span>
          <span>Official Leaderboard Standings</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-black">
            TOP 3 ALLOCATION
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
          <span className="material-symbols-outlined text-base">verified_user</span>
          <span>Curriculum Criteria & Rules</span>
        </button>
      </div>

      {/* TAB 1: 15-MODULE CURRICULUM */}
      {activeTab === "modules" && (
        <div className="space-y-6">
          {/* Detailed Domain Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCurriculumFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                  curriculumFilter === "all"
                    ? "bg-secondary-accent text-black"
                    : "bg-surface-low text-on-surface-variant hover:text-on-background"
                }`}
              >
                All 15 Modules
              </button>
              <button
                onClick={() => setCurriculumFilter("core")}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                  curriculumFilter === "core"
                    ? "bg-secondary-accent text-black"
                    : "bg-surface-low text-on-surface-variant hover:text-on-background"
                }`}
              >
                Core Cloud & Compute (M1–M5)
              </button>
              <button
                onClick={() => setCurriculumFilter("data")}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                  curriculumFilter === "data"
                    ? "bg-secondary-accent text-black"
                    : "bg-surface-low text-on-surface-variant hover:text-on-background"
                }`}
              >
                Storage, DB & AI/ML (M6–M8)
              </button>
              <button
                onClick={() => setCurriculumFilter("security")}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                  curriculumFilter === "security"
                    ? "bg-secondary-accent text-black"
                    : "bg-surface-low text-on-surface-variant hover:text-on-background"
                }`}
              >
                Security & Governance (M9–M11)
              </button>
              <button
                onClick={() => setCurriculumFilter("arch")}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                  curriculumFilter === "arch"
                    ? "bg-secondary-accent text-black"
                    : "bg-surface-low text-on-surface-variant hover:text-on-background"
                }`}
              >
                Migration & Capstone (M12–M15)
              </button>
            </div>

            <div className="text-xs font-mono text-on-surface-variant flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>
                {studentState.completedDays.length} of 15 Modules Verified
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
          <CertificationRoadmapGuide
            onSelectCert={(_code) => {
              if (!studentState.isRegistered) {
                setIsRegisterModalOpen(true);
              } else {
                setActiveTab("modules");
              }
            }}
          />
        </div>
      )}

      {/* TAB 4: RULES & SCORING */}
      {activeTab === "rules" && (
        <div className="space-y-6 max-w-4xl">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-low border border-outline space-y-6">
            <div>
              <h2 className="text-xl font-black text-on-background">
                Assessment Standards, Point Distribution & Voucher Allocation
              </h2>
              <p className="text-xs font-mono text-on-surface-variant mt-1">
                Engineering criteria governing the HBTU AWS Learning Challenge Sprint.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                <div className="flex items-center gap-2 text-primary-accent font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">verified_user</span>
                  <span>Anti-Cheat Assessment Protocol</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Every module completion requires solving an authentic scenario assessment testing genuine technical comprehension. Mindless button clicks without concept validation are prevented.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">trending_up</span>
                  <span>Consecutive Streak Retention</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Consistent daily participation maintains learning momentum. Streak consistency serves as the primary tie-breaking criterion for top voucher candidate positions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                <div className="flex items-center gap-2 text-secondary-accent font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">calculate</span>
                  <span>Point Distribution Structure</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Modules 1 through 13 award 100 Base Points + 50 Verification Quiz Points. Module 14 awards 150 Base + 75 Quiz Points. The Module 15 Capstone awards 200 Base + 100 Quiz Points.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">confirmation_number</span>
                  <span>Voucher Grant Protocol</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  The top 3 validated candidates upon sprint completion receive 100% sponsored official AWS Certified Cloud Practitioner examination vouchers.
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
