"use client";

import React, { useState, useEffect } from "react";
import { ChallengeDayModule } from "@/data/challenges";
import { ChallengeService, calculateAttemptPoints } from "@/lib/services/challenges";

interface ModuleQuizModalProps {
  module: ChallengeDayModule | null;
  isOpen: boolean;
  onClose: () => void;
  onVerifiedSuccess: () => void;
}

export function ModuleQuizModal({
  module,
  isOpen,
  onClose,
  onVerifiedSuccess,
}: ModuleQuizModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [currentTries, setCurrentTries] = useState(0);
  const [feedback, setFeedback] = useState<{
    status: "idle" | "correct" | "incorrect";
    message: string;
    points: number;
    attemptNumber?: number;
  }>({
    status: "idle",
    message: "",
    points: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (module) {
      const state = ChallengeService.getLocalState();
      const tries = state.triesByDay[module.day] || 0;
      setCurrentTries(tries);
      setSelectedOption(null);
      setNotes("");
      setFeedback({ status: "idle", message: "", points: 0 });
    }
  }, [module, isOpen]);

  if (!isOpen || !module) return null;

  const maxPoints = module.basePoints + module.quizPoints;
  const nextAttemptNum = currentTries + 1;
  const currentPotential = calculateAttemptPoints(maxPoints, nextAttemptNum);

  const handleVerify = async () => {
    if (selectedOption === null) {
      setFeedback({
        status: "incorrect",
        message: "Please choose an answer option to verify your understanding.",
        points: 0,
      });
      return;
    }

    setIsSubmitting(true);
    const result = await ChallengeService.submitModuleVerification(
      module.day,
      selectedOption,
      notes.trim() || "Module completed on AWS Skill Builder."
    );
    setIsSubmitting(false);

    if (result.success) {
      setFeedback({
        status: "correct",
        message: result.alreadyCompleted
          ? `Module assessment already verified. ${result.explanation}`
          : `Assessment verified successfully! +${result.pointsAwarded} points credited to your profile. ${result.explanation}`,
        points: result.pointsAwarded,
        attemptNumber: result.attemptNumber,
      });
      onVerifiedSuccess();
    } else {
      const state = ChallengeService.getLocalState();
      const updatedTries = state.triesByDay[module.day] || currentTries + 1;
      setCurrentTries(updatedTries);
      setFeedback({
        status: "incorrect",
        message: result.explanation,
        points: 0,
        attemptNumber: result.attemptNumber,
      });
    }
  };

  const handleResetAndRetry = () => {
    setSelectedOption(null);
    setFeedback({ status: "idle", message: "", points: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Verify Module Day ${module.day}`}
        className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090f0c] border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)] p-5 sm:p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm shadow-sm">
              D{module.day}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                  {module.dateStr}
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold">
                  Max: +{maxPoints} PTS
                </span>
              </div>
              <h2 className="font-extrabold text-base sm:text-lg text-slate-100 mt-0.5">
                {module.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close verification modal"
            className="h-8 w-8 rounded-xl border border-emerald-500/20 bg-emerald-950/30 text-slate-400 hover:text-slate-100 hover:border-emerald-500/40 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Dynamic Attempt & Scoring HUD Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0c1611] to-amber-950/30 border border-emerald-500/25 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-300">
                Current Attempt Status:
              </span>
              <span
                className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-black border ${
                  nextAttemptNum === 1
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : nextAttemptNum === 2
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : "bg-red-500/20 text-red-300 border-red-500/40"
                }`}
              >
                ATTEMPT #{nextAttemptNum} · {currentPotential.percentage}% REWARD
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              {currentPotential.penaltyExplanation} Correct submission earns{" "}
              <strong className="text-emerald-300 font-bold">+{currentPotential.awardedPoints} PTS</strong>.
            </p>
          </div>

          <a
            href={module.skillBuilderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold hover:bg-amber-500/25 transition-all shadow-sm shrink-0"
          >
            <span>Review on Skill Builder</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>

        {/* Verification Question Card */}
        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Authentic Scenario Verification Question · Anti-Cheat Concept Check
            </h3>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1410] border border-emerald-500/20 text-sm text-slate-200 font-medium leading-relaxed shadow-inner">
            {module.verificationQuestion.question}
          </div>

          {/* Options with Tactile Micro-Interactions */}
          <div className="space-y-2.5">
            {module.verificationQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={feedback.status === "correct"}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm font-mono transition-all flex items-start gap-3 ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)] translate-x-1"
                      : "border-emerald-500/15 bg-[#09100c] text-slate-300 hover:text-slate-100 hover:border-emerald-500/30 hover:bg-[#0c1611]"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-lg shrink-0 flex items-center justify-center font-mono text-xs font-bold border transition-colors ${
                      isSelected
                        ? "bg-emerald-500 text-black border-emerald-400"
                        : "bg-[#060a08] text-slate-400 border-emerald-500/20"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Optional learning takeaway notes */}
          {feedback.status !== "correct" && (
            <div className="pt-1">
              <label className="block text-xs font-mono text-slate-400 mb-1.5">
                Key Takeaway / Notes from Skill Builder (Optional confirmation note):
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What was the key insight you learned in this module? (e.g., Difference between EC2 Spot and Reserved instances...)"
                className="w-full px-4 py-2.5 rounded-xl bg-[#09100c] border border-emerald-500/20 focus:border-emerald-400 text-slate-200 text-xs font-mono outline-none transition-colors"
              />
            </div>
          )}

          {/* Feedback Banner */}
          {feedback.status === "correct" && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/60 text-emerald-200 text-xs font-mono leading-relaxed space-y-2 shadow-lg">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                <span className="material-symbols-outlined text-lg">verified</span>
                <span>
                  {feedback.attemptNumber === 1
                    ? "First-Attempt Perfection! Full Points Awarded"
                    : `Verified on Attempt #${feedback.attemptNumber}`}
                </span>
              </div>
              <p>{feedback.message}</p>
            </div>
          )}

          {feedback.status === "incorrect" && (
            <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs font-mono leading-relaxed space-y-2 shadow-lg">
              <div className="flex items-center gap-2 font-bold text-sm text-red-300">
                <span className="material-symbols-outlined text-lg">error</span>
                <span>Verification Not Passed · Score Decay Applied</span>
              </div>
              <p>{feedback.message}</p>
              <div className="pt-1 flex items-center justify-between">
                <span className="text-[11px] text-amber-300 font-bold">
                  Next Attempt Potential: {calculateAttemptPoints(maxPoints, nextAttemptNum + 1).percentage}% pts
                </span>
                <button
                  onClick={handleResetAndRetry}
                  className="text-xs text-amber-300 underline font-bold hover:text-amber-200"
                >
                  Retry Question Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-500/20">
          <div className="text-[11px] font-mono text-slate-400">
            {feedback.status === "correct"
              ? "Verified successfully. Standings updated."
              : "Scoring: 1st Try 100% · 2nd Try 75% · 3rd Try 50% · 4th+ 25% floor."}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-emerald-500/20 text-slate-300 hover:text-slate-100 font-mono text-xs font-bold transition-colors"
            >
              Close
            </button>
            {feedback.status !== "correct" ? (
              <button
                type="button"
                disabled={isSubmitting || selectedOption === null}
                onClick={handleVerify}
                className="btn-3d-aws px-6 py-2.5 rounded-xl font-mono text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? "Verifying..." : "Verify Assessment & Submit"}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="btn-3d-primary px-6 py-2.5 rounded-xl font-mono text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2"
              >
                Done · View Leaderboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
