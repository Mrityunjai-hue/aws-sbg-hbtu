"use client";

import React, { useState, useRef } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    cardRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.015)`;
    cardRef.current.style.boxShadow = isCompleted
      ? "0 24px 72px rgba(16,185,129,0.25), 0 8px 24px rgba(0,0,0,0.5)"
      : "0 24px 72px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5), 0 0 24px rgba(16,185,129,0.15)";
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
    cardRef.current.style.boxShadow = "";
  };

  const handleVerifyClick = () => {
    if (!isRegistered) {
      onPromptRegister();
    } else {
      onOpenQuiz(module);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease",
        willChange: "transform, box-shadow",
      }}
      className={`group relative rounded-3xl flex flex-col justify-between border overflow-hidden ${
        isCompleted
          ? "bg-gradient-to-br from-primary-accent/20 via-surface-low to-surface-lowest border-primary-accent/50 shadow-[0_8px_32px_rgba(16,185,129,0.15)]"
          : "liquid-glass bg-surface-low/90 border-outline shadow-md"
      }`}
    >
      {/* Shimmer top-edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: isCompleted
            ? "linear-gradient(90deg, transparent, rgba(16,185,129,0.8), transparent)"
            : "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Ambient particle orbs */}
      <div className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary-accent/5 blur-2xl group-hover:bg-primary-accent/10 transition-colors duration-500" aria-hidden="true" />
      {isCompleted && (
        <div className="pointer-events-none absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary-accent/10 blur-xl animate-float-subtle" aria-hidden="true" />
      )}

      {/* Card Content */}
      <div className="p-4 sm:p-5 lg:p-6">
        {/* Top Tag Row */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-outline">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`h-8 w-8 shrink-0 rounded-xl font-mono font-black text-[11px] flex items-center justify-center border transition-colors ${
                isCompleted
                  ? "bg-primary-accent text-white border-primary-accent shadow-[0_2px_8px_rgba(16,185,129,0.4)]"
                  : "bg-surface-lowest text-primary-accent border-primary-accent/30 group-hover:border-primary-accent group-hover:bg-primary-accent/10"
              }`}
            >
              M{module.moduleNumber}
            </span>
            <div className="min-w-0">
              <span className="text-[11px] font-mono font-bold text-on-background truncate block">
                {module.dateStr}
              </span>
              <span className="block text-[10px] font-mono text-on-surface-variant">
                Est. {module.estimatedMinutes} mins
              </span>
            </div>
          </div>

          <div className="shrink-0">
            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className="hidden sm:inline">Verified</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-extrabold whitespace-nowrap">
                +{module.basePoints + module.quizPoints} PTS
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-3 space-y-1.5">
          <h3 className="font-extrabold text-on-background leading-snug group-hover:text-primary-accent transition-colors" style={{fontSize:"clamp(0.875rem, 2.2vw, 1.05rem)"}}>
            {module.title}
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
            {module.summary}
          </p>
        </div>

        {/* Key Concepts Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {module.keyConcepts.map((concept, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded-lg bg-surface-lowest border border-outline text-on-surface-variant"
            >
              {concept}
            </span>
          ))}
        </div>

        {/* Collapsible Syllabus */}
        {module.sections && module.sections.length > 0 && (
          <div className="mt-3 pt-3 border-t border-outline">
            <button
              type="button"
              onClick={() => setShowSections(!showSections)}
              className="w-full flex items-center justify-between text-[11px] font-mono text-on-surface-variant hover:text-on-background transition-colors py-1"
            >
              <span className="flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-sm text-primary-accent">menu_book</span>
                <span>Syllabus ({module.sections.length} Lessons)</span>
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
      <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-3 border-t border-outline flex flex-wrap items-center justify-between gap-2">
        <a
          href={module.skillBuilderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono text-on-surface-variant hover:text-primary-accent transition-colors"
        >
          <span className="material-symbols-outlined text-sm">school</span>
          <span>Study</span>
          <span className="material-symbols-outlined text-[10px]">open_in_new</span>
        </a>

        {isCompleted ? (
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97, y: 1 }}
            onClick={() => onOpenQuiz(module)}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-surface-lowest border border-outline hover:border-emerald-500/50 text-emerald-400 font-mono text-xs font-bold transition-colors"
          >
            Review
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97, y: 2 }}
            onClick={handleVerifyClick}
            className="btn-3d-aws px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1"
          >
            <span>Verify</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
