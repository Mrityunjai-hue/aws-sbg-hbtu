"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
  const [showSections, setShowSections] = useState(false);

  const handleVerifyClick = () => {
    if (!isRegistered) {
      onPromptRegister();
    } else {
      onOpenQuiz(module);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border ${
        isCompleted
          ? "bg-gradient-to-br from-primary-accent/15 via-surface-low to-surface-lowest border-primary-accent/40 shadow-lg shadow-primary-accent/5"
          : "liquid-glass bg-surface-low/90 hover:bg-surface-low border-outline hover:border-primary-accent/50 shadow-md hover:shadow-xl"
      }`}
    >
      <div>
        {/* Top Tag Row */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-outline">
          <div className="flex items-center gap-2.5">
            <span
              className={`h-9 w-9 rounded-xl font-mono font-black text-xs flex items-center justify-center border transition-colors ${
                isCompleted
                  ? "bg-primary-accent text-white border-primary-accent"
                  : "bg-surface-lowest text-primary-accent border-primary-accent/30 group-hover:border-primary-accent group-hover:bg-primary-accent/10"
              }`}
            >
              M{module.moduleNumber}
            </span>
            <div>
              <span className="text-xs font-mono font-bold text-on-background">
                {module.dateStr}
              </span>
              <span className="block text-[10px] font-mono text-on-surface-variant">
                Est. {module.estimatedMinutes} mins
              </span>
            </div>
          </div>

          <div>
            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
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
          <h3 className="font-extrabold text-base text-on-background leading-snug group-hover:text-primary-accent transition-colors">
            {module.title}
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
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

        {/* Collapsible Detailed Syllabus Breakdown */}
        {module.sections && module.sections.length > 0 && (
          <div className="mt-4 pt-3 border-t border-outline">
            <button
              type="button"
              onClick={() => setShowSections(!showSections)}
              className="w-full flex items-center justify-between text-[11px] font-mono text-on-surface-variant hover:text-on-background transition-colors py-1"
            >
              <span className="flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-sm text-primary-accent">menu_book</span>
                <span>Syllabus Breakdown ({module.sections.length} Lessons)</span>
              </span>
              <span className="material-symbols-outlined text-sm">
                {showSections ? "expand_less" : "expand_more"}
              </span>
            </button>

            {showSections && (
              <ul className="mt-2 space-y-1 pl-2 border-l border-outline text-[11px] font-mono text-on-surface-variant">
                {module.sections.map((sec, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5 py-0.5">
                    <span className="text-primary-accent font-bold shrink-0">{sIdx + 1}.</span>
                    <span className="leading-snug">{sec}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-outline flex flex-wrap items-center justify-between gap-3">
        <a
          href={module.skillBuilderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono text-on-surface-variant hover:text-secondary-accent transition-colors"
        >
          <span className="material-symbols-outlined text-sm">school</span>
          <span>Study on Skill Builder</span>
          <span className="material-symbols-outlined text-[10px]">open_in_new</span>
        </a>

        {isCompleted ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenQuiz(module)}
            className="px-4 py-2 rounded-xl bg-surface-lowest border border-outline hover:border-emerald-500/50 text-emerald-400 font-mono text-xs font-bold transition-colors"
          >
            Review Question
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleVerifyClick}
            className="btn-3d-aws px-4 py-2 rounded-xl font-mono text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>Verify Assessment</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
