"use client";

import React, { useState } from "react";
import { ChallengeDayModule } from "@/data/challenges";
import { ChallengeService } from "@/lib/services/challenges";

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
  const [feedback, setFeedback] = useState<{
    status: "idle" | "correct" | "incorrect";
    message: string;
    points: number;
  }>({
    status: "idle",
    message: "",
    points: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !module) return null;

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
          : `Assessment verified successfully. +${result.pointsAwarded} points credited to your profile. ${result.explanation}`,
        points: result.pointsAwarded,
      });
      onVerifiedSuccess();
    } else {
      setFeedback({
        status: "incorrect",
        message: result.explanation,
        points: 0,
      });
    }
  };

  const handleResetAndRetry = () => {
    setSelectedOption(null);
    setFeedback({ status: "idle", message: "", points: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-lowest border border-outline shadow-2xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-outline">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-secondary-accent/15 border border-secondary-accent/30 text-secondary-accent flex items-center justify-center font-mono font-bold text-sm">
              D{module.day}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary-accent/15 text-primary-accent border border-primary-accent/30">
                  {module.dateStr}
                </span>
                <span className="text-[10px] font-mono text-secondary-accent">
                  +{module.basePoints + module.quizPoints} PTS
                </span>
              </div>
              <h2 className="font-extrabold text-base sm:text-lg text-on-background mt-0.5">
                {module.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close verification modal"
            className="h-8 w-8 rounded-xl border border-outline bg-surface-low text-on-surface-variant hover:text-on-background flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Skill Builder Link Reminder */}
        <div className="mt-4 p-4 rounded-2xl bg-surface-low border border-outline flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary-accent text-lg">school</span>
            <span>Course: <strong className="text-on-background">{module.skillBuilderCourseName}</strong></span>
          </div>
          <a
            href={module.skillBuilderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-accent/15 border border-secondary-accent/30 text-secondary-accent text-xs font-mono font-bold hover:bg-secondary-accent/25 transition-colors"
          >
            <span>Open in Skill Builder</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>

        {/* Verification Question Card */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-accent animate-ping" />
            <h3 className="font-mono text-xs font-bold text-primary-accent uppercase tracking-wider">
              Anti-Cheat Verification Question · Prove Module Mastery
            </h3>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-surface-low/80 border border-outline/80 text-sm text-on-background font-medium leading-relaxed">
            {module.verificationQuestion.question}
          </div>

          {/* Options */}
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
                      ? "border-primary-accent bg-primary-accent/15 text-primary-accent shadow-sm"
                      : "border-outline bg-surface-low text-on-surface-variant hover:text-on-background hover:border-outline/80"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-lg shrink-0 flex items-center justify-center font-mono text-xs font-bold border ${
                      isSelected
                        ? "bg-primary-accent text-white border-primary-accent"
                        : "bg-surface-lowest text-on-surface-variant border-outline"
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
            <div className="pt-2">
              <label className="block text-xs font-mono text-on-surface-variant mb-1.5">
                Key Takeaway / Notes from Skill Builder (Optional confirmation note):
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What was the key insight you learned in this module? (e.g., Difference between EC2 Spot and Reserved instances...)"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-low border border-outline focus:border-primary-accent text-on-background text-xs font-mono outline-none transition-colors"
              />
            </div>
          )}

          {/* Feedback Banner */}
          {feedback.status === "correct" && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-mono leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span>Assessment Verified · Streak Extended</span>
              </div>
              <p>{feedback.message}</p>
            </div>
          )}

          {feedback.status === "incorrect" && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-300 text-xs font-mono leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span className="material-symbols-outlined text-lg">error</span>
                <span>Verification Not Passed</span>
              </div>
              <p>{feedback.message}</p>
              <button
                onClick={handleResetAndRetry}
                className="text-xs text-amber-300 underline font-bold"
              >
                Retry question
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 flex items-center justify-between gap-3 border-t border-outline">
          <div className="text-[11px] font-mono text-on-surface-variant">
            {feedback.status === "correct"
              ? "Verified successfully."
              : "Answering correctly earns verification points and maintains your daily streak."}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-outline text-on-surface-variant hover:text-on-background font-mono text-xs font-bold"
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
