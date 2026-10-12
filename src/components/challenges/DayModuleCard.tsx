"use client";

import React from "react";
import { ChallengeDayModule } from "@/data/challenges";

interface DayModuleCardProps {
  module: ChallengeDayModule;
  isCompleted: boolean;
  onOpenQuiz: (module: ChallengeDayModule) => void;
  isRegistered: boolean;
  onPromptRegister: () => void;
}

export function DayModuleCard({
  module,
  isCompleted,
  onOpenQuiz,
  isRegistered,
  onPromptRegister,
}: DayModuleCardProps) {
  const handleVerifyClick = () => {
    if (!isRegistered) {
      onPromptRegister();
    } else {
      onOpenQuiz(module);
    }
  };

  return (
    <div
      className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border ${
        isCompleted
          ? "bg-gradient-to-br from-emerald-950/20 via-surface-low to-surface-lowest border-emerald-500/40 shadow-lg shadow-emerald-500/5"
          : "bg-surface-low/80 hover:bg-surface-low border-outline hover:border-primary-accent/40 shadow-md"
      }`}
    >
      <div>
        {/* Top Tag Row */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-outline/70">
          <div className="flex items-center gap-2">
            <span
              className={`h-8 w-8 rounded-xl font-mono font-black text-xs flex items-center justify-center border ${
                isCompleted
                  ? "bg-emerald-500 text-black border-emerald-400"
                  : "bg-surface-lowest text-primary-accent border-primary-accent/30"
              }`}
            >
              D{module.day}
            </span>
            <div>
              <span className="text-xs font-mono font-bold text-on-background">
                {module.dateStr}
              </span>
              <span className="block text-[10px] font-mono text-on-surface-variant">
                ~{module.estimatedMinutes} mins
              </span>
            </div>
          </div>

          <div>
            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Verified</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-accent/15 border border-secondary-accent/30 text-secondary-accent font-mono text-xs font-extrabold">
                <span>+{module.basePoints + module.quizPoints} PTS</span>
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-4 space-y-2">
          <h3 className="font-extrabold text-base text-on-background leading-snug">
            {module.title}
          </h3>
          <p className="text-xs font-mono text-secondary-accent">
            {module.skillBuilderCourseName}
          </p>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {module.summary}
          </p>
        </div>

        {/* Key Concepts Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {module.keyConcepts.map((concept, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-surface-lowest border border-outline text-on-surface-variant"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-outline/70 flex flex-wrap items-center justify-between gap-3">
        <a
          href={module.skillBuilderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-on-surface-variant hover:text-secondary-accent transition-colors"
        >
          <span className="material-symbols-outlined text-sm">school</span>
          <span>Study on Skill Builder</span>
          <span className="material-symbols-outlined text-[10px]">open_in_new</span>
        </a>

        {isCompleted ? (
          <button
            onClick={() => onOpenQuiz(module)}
            className="px-4 py-2 rounded-xl bg-surface-lowest border border-outline hover:border-emerald-500/50 text-emerald-400 font-mono text-xs font-bold transition-colors"
          >
            Review Question
          </button>
        ) : (
          <button
            onClick={handleVerifyClick}
            className="btn-3d-aws px-4 py-2 rounded-xl font-mono text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>Verify & Claim Pts</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
}
