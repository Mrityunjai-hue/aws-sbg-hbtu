"use client";

import React from "react";
import { ACTIVE_14DAY_CHALLENGE } from "@/data/challenges";

interface LeaderAnnouncementBannerProps {
  onOpenRoadmap: () => void;
  onRegisterClick: () => void;
  isRegistered: boolean;
}

export function LeaderAnnouncementBanner({
  onOpenRoadmap,
  onRegisterClick,
  isRegistered,
}: LeaderAnnouncementBannerProps) {
  const { leaderAnnouncement, officialSkillBuilderUrl } = ACTIVE_14DAY_CHALLENGE;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary-accent/40 bg-gradient-to-br from-surface-low via-surface-lowest to-surface-low p-6 sm:p-8 md:p-10 shadow-2xl">
      {/* Decorative ambient glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-secondary-accent/10 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-outline">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary-accent to-emerald-900 text-white font-mono font-black text-sm flex items-center justify-center shadow-lg shadow-primary-accent/20 border border-primary-accent/30">
            {leaderAnnouncement.avatarMonogram}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-on-background">
                {leaderAnnouncement.author}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-primary-accent/15 text-primary-accent border border-primary-accent/30">
                OFFICIAL ANNOUNCEMENT
              </span>
            </div>
            <p className="text-xs font-mono text-on-surface-variant">
              {leaderAnnouncement.authorRole} · {leaderAnnouncement.updatedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">event_repeat</span>
            <span>Starts Wed, 14 Oct</span>
          </span>
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">confirmation_number</span>
            <span>Vouchers for Top 3</span>
          </span>
        </div>
      </div>

      {/* Message content */}
      <div className="py-6 space-y-4">
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-lowest/80 border border-outline/70 font-mono text-xs sm:text-sm text-on-surface-variant leading-relaxed whitespace-pre-line select-text">
          {leaderAnnouncement.rawMessage}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-outline">
        <div className="flex flex-wrap items-center gap-3">
          {/* Button to view attached PDF roadmap */}
          <button
            onClick={onOpenRoadmap}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-3d-secondary font-mono text-xs font-bold text-on-background hover:text-primary-accent"
          >
            <span className="material-symbols-outlined text-base text-primary-accent">map</span>
            <span>Explore Certification Roadmap Guide</span>
          </button>

          {/* Direct Skill Builder Course Link */}
          <a
            href={officialSkillBuilderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-low border border-outline hover:border-secondary-accent/50 text-on-surface-variant hover:text-secondary-accent font-mono text-xs font-bold transition-colors"
          >
            <span className="material-symbols-outlined text-base text-secondary-accent">school</span>
            <span>Official AWS Skill Builder Course</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>

        {/* Register or Status */}
        <div>
          {!isRegistered ? (
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-3d-aws font-mono text-xs sm:text-sm font-extrabold text-black"
            >
              <span className="material-symbols-outlined text-base">how_to_reg</span>
              <span>Register for 14-Day Challenge</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Registration Verified · Challenge Ready</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
