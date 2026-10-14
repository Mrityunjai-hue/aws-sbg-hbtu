"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

const EASE_CURVE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<"modules" | "leaderboard" | "roadmap" | "rules">("modules");
  const [curriculumFilter, setCurriculumFilter] = useState<"all" | "core" | "data" | "security" | "arch">("all");

  const [studentState, setStudentState] = useState<StudentProgressState>({
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
    // If URL has ?reset=true or ?clear=true, reset test registration immediately
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("reset") === "true" || urlParams.get("clear") === "true") {
        ChallengeService.resetLocalState();
      }
    }
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

  const handleResetRegistration = () => {
    if (confirm("Reset challenge registration and start with a fresh state? All test progress will be cleared.")) {
      ChallengeService.resetLocalState();
      refreshState();
    }
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

  const tabs = [
    {
      id: "modules" as const,
      label: "15-Module Curriculum & Assessments",
      icon: "menu_book",
    },
    {
      id: "leaderboard" as const,
      label: "Official Leaderboard Standings",
      icon: "leaderboard",
      badge: "TOP 3 HONORS",
    },
    {
      id: "roadmap" as const,
      label: "Certification Roadmap Guide",
      icon: "map",
    },
    {
      id: "rules" as const,
      label: "Attempt Scoring & Criteria",
      icon: "verified_user",
    },
  ];

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
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsRegisterModalOpen(true)}
              className="btn-3d-aws px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-extrabold text-black uppercase tracking-wider flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">how_to_reg</span>
              <span>Register for Challenge</span>
            </motion.button>
          ) : (
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="p-2.5 px-3.5 rounded-2xl bg-surface-low border border-primary-accent/40 flex items-center gap-3 shadow-md">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-xs">
                  {studentState.currentStreak}d
                </div>
                <div className="font-mono text-xs">
                  <span className="text-on-surface-variant block text-[10px]">Active Streak</span>
                  <span className="text-on-background font-bold">{studentState.totalPoints} PTS</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-surface-low border border-outline hover:border-primary-accent text-on-surface-variant hover:text-on-background font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
                title="View or update your registered student details"
              >
                <span className="material-symbols-outlined text-sm">edit_note</span>
                <span>Registration</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Leader Announcement Banner (Executive Leadership Dispatch) */}
      <LeaderAnnouncementBanner
        onOpenRoadmap={() => setIsRoadmapModalOpen(true)}
        onRegisterClick={() => setIsRegisterModalOpen(true)}
        isRegistered={studentState.isRegistered}
      />

      {/* Student Personal Dashboard HUD (When Registered) */}
      {studentState.isRegistered && studentState.student && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-7 rounded-3xl liquid-glass bg-gradient-to-r from-primary-accent/15 via-surface-low to-secondary-accent/10 border border-primary-accent/40 shadow-xl space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-primary-accent text-white font-mono font-black text-base flex items-center justify-center shadow-lg shadow-primary-accent/25">
                {studentState.student.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-on-background">
                    {studentState.student.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    VERIFIED CANDIDATE
                  </span>
                </div>
                <p className="text-xs font-mono text-on-surface-variant">
                  {studentState.student.rollNo} · {studentState.student.branch} ({studentState.student.year})
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:gap-6 font-mono">
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

              {/* Reset Registration Button for Test Cleanup */}
              <div className="text-center sm:pl-2">
                <button
                  type="button"
                  onClick={handleResetRegistration}
                  title="Remove test registration and start fresh"
                  className="px-2.5 py-1.5 rounded-xl border border-outline hover:border-red-500/50 hover:bg-red-500/10 text-on-surface-variant hover:text-red-400 text-[11px] font-mono transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">restart_alt</span>
                  <span>Reset Test</span>
                </button>
              </div>
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
        </motion.div>
      )}

      {/* Navigation Tabs Bar with Liquid Sliding Pill Indicator (Zero Browser Scrollbars) */}
      <div className="flex flex-wrap items-center gap-2.5 sm:overflow-visible no-scrollbar pb-3 border-b border-outline w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`relative shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-mono text-xs font-bold transition-colors ${
                isActive
                  ? "text-slate-950 font-black"
                  : "bg-surface-low text-on-surface-variant hover:text-on-background hover:bg-surface-lowest border border-outline"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-2xl bg-primary-accent shadow-lg shadow-primary-accent/30 ring-1 ring-primary-accent"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                />
              )}
              <span className="relative z-10 material-symbols-outlined text-base">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
              {tab.badge && (
                <span className="relative z-10 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-black">
                  {tab.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Smooth Gliding Tab Content Transitions */}
      <AnimatePresence mode="wait">
        {/* TAB 1: 15-MODULE CURRICULUM */}
        {activeTab === "modules" && (
          <motion.div
            key="tab-modules"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
            transition={{ duration: 0.28, ease: EASE_CURVE }}
            className="space-y-6"
          >
            {/* Domain Filters (Flex Wrap, Zero Horizontal Scrollbars) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 py-1 no-scrollbar w-full sm:w-auto">
                {[
                  { id: "all" as const, label: "All 15 Modules" },
                  { id: "core" as const, label: "Core Cloud & Compute (M1–M5)" },
                  { id: "data" as const, label: "Storage, DB & AI/ML (M6–M8)" },
                  { id: "security" as const, label: "Security & Governance (M9–M11)" },
                  { id: "arch" as const, label: "Architecture & Capstone (M12–M15)" },
                ].map((f) => {
                  const isSelected = curriculumFilter === f.id;
                  return (
                    <motion.button
                      key={f.id}
                      onClick={() => setCurriculumFilter(f.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`shrink-0 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-primary-accent text-slate-950 font-black shadow-md shadow-primary-accent/25"
                          : "bg-surface-low text-on-surface-variant hover:text-on-background border border-outline"
                      }`}
                    >
                      {f.label}
                    </motion.button>
                  );
                })}
              </div>

              <div className="text-xs font-mono text-on-surface-variant flex items-center gap-2 shrink-0">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>
                  {studentState.completedDays.length} of 15 Modules Verified
                </span>
              </div>
            </div>

            {/* Module Cards Grid with Scroll Reveal Stagger */}
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
          </motion.div>
        )}

        {/* TAB 2: LIVE LEADERBOARD */}
        {activeTab === "leaderboard" && (
          <motion.div
            key="tab-leaderboard"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
            transition={{ duration: 0.28, ease: EASE_CURVE }}
          >
            <LeaderboardPodium
              students={leaderboard}
              currentUserId={studentState.student?.rollNo}
              onRegisterClick={() => setIsRegisterModalOpen(true)}
              isRegistered={studentState.isRegistered}
            />
          </motion.div>
        )}

        {/* TAB 3: CERTIFICATION ROADMAP */}
        {activeTab === "roadmap" && (
          <motion.div
            key="tab-roadmap"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
            transition={{ duration: 0.28, ease: EASE_CURVE }}
            className="space-y-6"
          >
            <CertificationRoadmapGuide
              onSelectCert={() => {
                if (!studentState.isRegistered) {
                  setIsRegisterModalOpen(true);
                } else {
                  setActiveTab("modules");
                }
              }}
            />
          </motion.div>
        )}

        {/* TAB 4: RULES & SCORING */}
        {activeTab === "rules" && (
          <motion.div
            key="tab-rules"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
            transition={{ duration: 0.28, ease: EASE_CURVE }}
            className="space-y-6 max-w-4xl"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-low border border-outline space-y-6 shadow-md">
              <div>
                <h2 className="text-xl font-black text-on-background">
                  Assessment Standards, Attempt Scoring & Executive Honors Allocation
                </h2>
                <p className="text-xs font-mono text-on-surface-variant mt-1">
                  Engineering criteria governing the HBTU AWS Learning Challenge Sprint.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                  <div className="flex items-center gap-2 text-primary-accent font-mono text-xs font-bold">
                    <span className="material-symbols-outlined text-base">verified_user</span>
                    <span>Dynamic Attempt-Based Scoring</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    First-attempt mastery awards 100% full points. If an assessment is missed on the 1st try, points decrease with subsequent attempts (2nd: 75%, 3rd: 50%, 4th+: 25% floor) to reward genuine first-try preparation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                    <span className="material-symbols-outlined text-base">timer</span>
                    <span>Earliest-Finish Leaderboard Tie-Breaking</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    In case of point ties at any rank, the builder who completed the assessments earliest (timestamp of verification) is placed at the top, eliminating standings clashes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                  <div className="flex items-center gap-2 text-secondary-accent font-mono text-xs font-bold">
                    <span className="material-symbols-outlined text-base">calculate</span>
                    <span>Point Distribution Structure</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Modules 1 through 13 award up to 150 Points. Module 14 awards up to 225 Points. The Module 15 Capstone awards up to 300 Points based on attempt weighting.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-lowest border border-outline space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <span className="material-symbols-outlined text-base">workspace_premium</span>
                    <span>Prizes & Chapter Recognition Protocol</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Rank 1 winner receives an official executive Shoutout and an exclusive AWS Backpack. Ranks 2 and 3 receive executive Shoutouts and exclusive AWS/SBG Goodies packages. All remaining participating ranks receive an official Certificate of Participation from AWS Student Builder Group HBTU Kanpur, plus exclusive AWS stickers and pens.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
