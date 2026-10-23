"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LeaderboardStudent } from "@/data/challenges";

interface LeaderboardPodiumProps {
  students: LeaderboardStudent[];
  currentUserId?: string;
  onRegisterClick?: () => void;
  isRegistered?: boolean;
}

export function LeaderboardPodium({
  students,
  currentUserId,
  onRegisterClick,
  isRegistered = false,
}: LeaderboardPodiumProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("ALL");

  const top1 = students[0];
  const top2 = students[1];
  const top3 = students[2];
  const top4and5 = students.slice(3, 5);

  const filteredRoster = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollOrHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.branch.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch =
      selectedBranch === "ALL" ||
      (selectedBranch === "MDS"
        ? s.branch.toUpperCase().includes("MATH") ||
          s.branch.toUpperCase().includes("DATA SCIENCE") ||
          s.branch.toUpperCase().includes("MDS")
        : s.branch.toUpperCase().includes(selectedBranch));

    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-12 max-w-full overflow-hidden">
      {/* ── Executive Honors & Rewards Allocation Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Tier 1: Rank 1 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -3 }}
          className="relative p-6 sm:p-7 rounded-3xl liquid-glass bg-surface-low border border-amber-400/50 overflow-hidden transition-all duration-300 shadow-xl group"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/20 transition-all" />
          <div className="flex items-center justify-between pb-3.5 border-b border-outline">
            <span className="text-[11px] font-mono font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">workspace_premium</span>
              <span>Rank 01 · Champion</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-400 font-mono text-[10px] font-bold border border-amber-400/30">
              AWS Backpack
            </span>
          </div>
          <h3 className="mt-3.5 font-black text-base text-on-background">
            AWS Backpack & Official Shoutout
          </h3>
          <p className="mt-2 text-xs text-on-surface-variant font-mono leading-relaxed">
            Exclusive AWS Backpack for the Rank 1 winner, accompanied by an official executive Shoutout feature across chapter leadership and LinkedIn channels.
          </p>
        </motion.div>

        {/* Tier 2: Ranks 2 & 3 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          whileHover={{ y: -3 }}
          className="relative p-6 sm:p-7 rounded-3xl liquid-glass bg-surface-low border border-primary-accent/40 overflow-hidden transition-all duration-300 shadow-xl group"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-primary-accent/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary-accent/20 transition-all" />
          <div className="flex items-center justify-between pb-3.5 border-b border-outline">
            <span className="text-[11px] font-mono font-black text-primary-accent uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">military_tech</span>
              <span>Ranks 02 & 03 · Podium</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-accent/15 text-primary-accent font-mono text-[10px] font-bold border border-primary-accent/30">
              AWS Goodies
            </span>
          </div>
          <h3 className="mt-3.5 font-black text-base text-on-background">
            Goodies for Rank 2 & 3 + Shoutout
          </h3>
          <p className="mt-2 text-xs text-on-surface-variant font-mono leading-relaxed">
            Official executive Shoutout feature for Rank 2 and Rank 3 winners, plus exclusive AWS & SBG Goodies packs and chapter leadership recognition.
          </p>
        </motion.div>

        {/* Tier 3: Left ranks */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          whileHover={{ y: -3 }}
          className="relative p-6 sm:p-7 rounded-3xl liquid-glass bg-surface-low border border-secondary-accent/40 overflow-hidden transition-all duration-300 shadow-xl group"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-secondary-accent/10 rounded-full blur-3xl pointer-events-none group-hover:bg-secondary-accent/20 transition-all" />
          <div className="flex items-center justify-between pb-3.5 border-b border-outline">
            <span className="text-[11px] font-mono font-black text-secondary-accent uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Left Ranks · All Participants</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-accent/15 text-secondary-accent font-mono text-[10px] font-bold border border-secondary-accent/30">
              Certificate & Swag
            </span>
          </div>
          <h3 className="mt-3.5 font-black text-base text-on-background">
            Official Certificate, Stickers & Pens
          </h3>
          <p className="mt-2 text-xs text-on-surface-variant font-mono leading-relaxed">
            Official Certificate of Participation from AWS Student Builder Group HBTU Kanpur, plus exclusive AWS stickers and pens for all verified contestants.
          </p>
        </motion.div>
      </div>

      {/* ── TOP 3 PODIUM: ARCHITECTURAL PEDESTALS ── */}
      <div className="space-y-6">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-xs font-bold">
            <span className="material-symbols-outlined text-sm">leaderboard</span>
            <span>OFFICIAL QUALIFICATION STANDINGS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-background tracking-tight">
            Top Contestant Honor Podium
          </h2>
          <p className="text-xs font-mono text-on-surface-variant max-w-xl mx-auto">
            Ranked strictly by verified assessment accuracy, unbroken streaks, and earliest completion timestamp for tie-breaking.
          </p>
        </div>

        {/* Podium Layout: Rank 2 (Left), Rank 1 (Center High), Rank 3 (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto pt-6">
          {/* ── RANK 2: SILVER PEDESTAL (Left) ── */}
          {top2 ? (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="order-2 md:order-1 relative rounded-3xl p-6 bg-gradient-to-b from-surface-low via-surface-lowest to-surface-low border-2 border-slate-400/40 shadow-xl flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="absolute -top-4 px-4 py-1 rounded-full bg-slate-300 text-slate-900 font-mono font-black text-xs shadow-md tracking-wider">
                RANK 02 · SILVER
              </div>
              <div className="h-16 w-16 rounded-2xl bg-slate-400/20 border-2 border-slate-300/60 flex items-center justify-center font-mono font-black text-xl text-on-background mt-3 mb-3 shadow-inner">
                {top2.avatarMonogram}
              </div>
              <h3 className="font-black text-base text-on-background">{top2.name}</h3>
              <p className="text-[11px] font-mono text-on-surface-variant mt-0.5">{top2.rollOrHandle}</p>

              <div className="mt-3 px-3 py-1 rounded-full bg-surface-lowest border border-outline text-on-surface-variant text-[11px] font-mono font-bold">
                {top2.badge}
              </div>

              {/* Tie-breaker timestamp tag */}
              <div className="mt-2 text-[10px] font-mono text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-amber-400">schedule</span>
                <span>{top2.finishTimeStr || "Finished 2nd"}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-4 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>Curriculum Progress</span>
                  <span>{Math.round((top2.completedDays.length / 15) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-lowest border border-outline overflow-hidden">
                  <div
                    className="h-full bg-slate-400 rounded-full transition-all duration-500"
                    style={{ width: `${(top2.completedDays.length / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-outline w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Points</div>
                  <div className="text-base font-black text-primary-accent">{top2.points}</div>
                </div>
                <div className="h-6 w-px bg-outline" />
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Streak</div>
                  <div className="text-base font-black text-amber-400">
                    {top2.streakDays} Days
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="order-2 md:order-1 relative rounded-3xl p-6 bg-surface-low border border-dashed border-outline flex flex-col items-center text-center opacity-75">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-surface-lowest border border-outline text-on-surface-variant font-mono text-[10px] font-bold">
                RANK 02 · SILVER
              </div>
              <div className="h-14 w-14 rounded-2xl bg-surface-lowest border border-dashed border-outline flex items-center justify-center font-mono text-on-surface-variant mt-3 mb-2">
                <span className="material-symbols-outlined text-xl">military_tech</span>
              </div>
              <h3 className="font-bold text-sm text-on-surface-variant">Open Podium Slot</h3>
              <p className="text-[10px] font-mono text-on-surface-variant mt-1">Awaiting 2nd verified finisher</p>
            </div>
          )}

          {/* ── RANK 1: GOLD CYBER PEDESTAL (Center, Taller, Glowing) ── */}
          {top1 ? (
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="order-1 md:order-2 relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-amber-400/20 via-surface-low to-surface-lowest border-2 border-amber-400/80 shadow-[0_0_40px_rgba(255,191,0,0.18)] flex flex-col items-center text-center transition-all duration-300 z-10"
            >
              <div className="absolute -top-5 px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-mono font-black text-xs shadow-lg flex items-center gap-1.5 tracking-wider">
                <span className="material-symbols-outlined text-base">emoji_events</span>
                <span>RANK 01 · GOLD LEADER</span>
              </div>
              <div className="h-20 w-20 rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center font-mono font-black text-2xl text-amber-400 mt-2 mb-3 shadow-[0_0_20px_rgba(255,191,0,0.3)]">
                {top1.avatarMonogram}
              </div>
              <h3 className="font-black text-lg text-on-background">{top1.name}</h3>
              <p className="text-xs font-mono text-on-surface-variant mt-0.5">{top1.rollOrHandle}</p>

              <div className="mt-3 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-400 text-xs font-mono font-black shadow-sm">
                {top1.badge}
              </div>

              {/* Earliest finish tie-breaker indicator */}
              <div className="mt-2 text-[11px] font-mono text-amber-400 flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-xs">timer</span>
                <span>{top1.finishTimeStr || "Finished 1st · Tie-Break Winner"}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-4 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>Curriculum Progress</span>
                  <span>{Math.round((top1.completedDays.length / 15) * 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-lowest border border-outline overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${(top1.completedDays.length / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-amber-400/30 w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Points</div>
                  <div className="text-lg font-black text-amber-400">{top1.points} PTS</div>
                </div>
                <div className="h-7 w-px bg-amber-400/30" />
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Streak</div>
                  <div className="text-lg font-black text-primary-accent">
                    {top1.streakDays} Days
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="order-1 md:order-2 relative rounded-3xl p-7 bg-surface-low border border-dashed border-amber-400/40 flex flex-col items-center text-center opacity-85">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-surface-lowest border border-amber-400/40 text-amber-400 font-mono text-[10px] font-bold">
                RANK 01 · GOLD LEADER
              </div>
              <div className="h-16 w-16 rounded-2xl bg-surface-lowest border border-dashed border-amber-400/30 flex items-center justify-center font-mono text-amber-400 mt-3 mb-2">
                <span className="material-symbols-outlined text-2xl">emoji_events</span>
              </div>
              <h3 className="font-bold text-sm text-on-background">Open Leader Slot</h3>
              <p className="text-[10px] font-mono text-on-surface-variant mt-1">Awaiting 1st verified finisher</p>
            </div>
          )}

          {/* ── RANK 3: BRONZE PEDESTAL (Right) ── */}
          {top3 ? (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="order-3 relative rounded-3xl p-6 bg-gradient-to-b from-surface-low via-surface-lowest to-surface-low border-2 border-amber-700/50 shadow-xl flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="absolute -top-4 px-4 py-1 rounded-full bg-amber-700 text-amber-100 font-mono font-black text-xs shadow-md tracking-wider">
                RANK 03 · BRONZE
              </div>
              <div className="h-16 w-16 rounded-2xl bg-amber-800/20 border-2 border-amber-700/60 flex items-center justify-center font-mono font-black text-xl text-amber-400 mt-3 mb-3 shadow-inner">
                {top3.avatarMonogram}
              </div>
              <h3 className="font-black text-base text-on-background">{top3.name}</h3>
              <p className="text-[11px] font-mono text-on-surface-variant mt-0.5">{top3.rollOrHandle}</p>

              <div className="mt-3 px-3 py-1 rounded-full bg-surface-lowest border border-outline text-on-surface-variant text-[11px] font-mono font-bold">
                {top3.badge}
              </div>

              {/* Tie-breaker timestamp tag */}
              <div className="mt-2 text-[10px] font-mono text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-amber-400">schedule</span>
                <span>{top3.finishTimeStr || "Finished 3rd"}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-4 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>Curriculum Progress</span>
                  <span>{Math.round((top3.completedDays.length / 15) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-lowest border border-outline overflow-hidden">
                  <div
                    className="h-full bg-amber-700 rounded-full transition-all duration-500"
                    style={{ width: `${(top3.completedDays.length / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-outline w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Points</div>
                  <div className="text-base font-black text-primary-accent">{top3.points}</div>
                </div>
                <div className="h-6 w-px bg-outline" />
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Streak</div>
                  <div className="text-base font-black text-amber-400">
                    {top3.streakDays} Days
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="order-3 relative rounded-3xl p-6 bg-surface-low border border-dashed border-outline flex flex-col items-center text-center opacity-75">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-surface-lowest border border-outline text-on-surface-variant font-mono text-[10px] font-bold">
                RANK 03 · BRONZE
              </div>
              <div className="h-14 w-14 rounded-2xl bg-surface-lowest border border-dashed border-outline flex items-center justify-center font-mono text-on-surface-variant mt-3 mb-2">
                <span className="material-symbols-outlined text-xl">workspace_premium</span>
              </div>
              <h3 className="font-bold text-sm text-on-surface-variant">Open Podium Slot</h3>
              <p className="text-[10px] font-mono text-on-surface-variant mt-1">Awaiting 3rd verified finisher</p>
            </div>
          )}
        </div>
      </div>

      {/* ── TOP 4 & 5 MERIT FINALISTS SPOTLIGHT ── */}
      {top4and5.length > 0 && (
        <div className="p-6 sm:p-7 rounded-3xl bg-surface-low border border-outline shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-outline">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-accent">star</span>
              <h3 className="font-extrabold text-sm sm:text-base text-on-background">
                Top 5 Merit Finalists (Positions 04 & 05)
              </h3>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-primary-accent/15 text-primary-accent border border-primary-accent/30 font-bold">
              Eligible for Chapter Commendations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {top4and5.map((s, idx) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-surface-lowest border border-outline flex items-center justify-between gap-3 hover:border-primary-accent/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-accent/10 border border-primary-accent/30 flex items-center justify-center font-mono font-black text-xs text-primary-accent">
                    0{idx + 4}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-background">{s.name}</h4>
                    <p className="text-[11px] font-mono text-on-surface-variant">{s.rollOrHandle}</p>
                    {s.finishTimeStr && (
                      <p className="text-[10px] font-mono text-amber-400">{s.finishTimeStr}</p>
                    )}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-sm font-black text-primary-accent">{s.points} PTS</div>
                  <div className="text-[11px] text-amber-400 font-bold">{s.streakDays}d Streak</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── COMPLETE PARTICIPANT ROSTER DATA TABLE ── */}
      <div className="rounded-3xl bg-surface-low border border-outline shadow-xl overflow-hidden">
        {/* Controls Bar */}
        <div className="p-5 sm:p-6 border-b border-outline flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-base text-on-background">
              Complete Verified Standings
            </h3>
            <p className="text-xs font-mono text-on-surface-variant">
              Displaying {filteredRoster.length} of {students.length} verified builders · Tie-breaks resolved by earliest finish timestamp
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search builder, roll, or branch..."
                className="pl-9 pr-4 py-2 rounded-xl bg-surface-lowest border border-outline text-xs font-mono text-on-background placeholder:text-on-surface-variant/60 outline-none focus:border-primary-accent w-full sm:w-64 transition-colors"
              />
              <span className="material-symbols-outlined text-sm text-on-surface-variant absolute left-3 top-2.5">
                search
              </span>
            </div>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface-lowest border border-outline text-xs font-mono text-on-background outline-none focus:border-primary-accent transition-colors"
            >
              <option value="ALL">All Departments</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Tech</option>
              <option value="MDS">BS-MS Math & Data Science</option>
              <option value="ECE">Electronics</option>
              <option value="EE">Electrical</option>
              <option value="CHE">Chemical</option>
            </select>
          </div>
        </div>

        {/* High-Performance Table */}
        <div className="overflow-x-auto no-scrollbar w-full">
          <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-lowest text-on-surface-variant border-b border-outline">
                <th className="py-3.5 px-4 font-bold text-center w-16">RANK</th>
                <th className="py-3.5 px-4 font-bold">STUDENT BUILDER</th>
                <th className="py-3.5 px-4 font-bold">DEPARTMENT & YEAR</th>
                <th className="py-3.5 px-4 font-bold">TIE-BREAK TIME</th>
                <th className="py-3.5 px-4 font-bold text-center">STREAK</th>
                <th className="py-3.5 px-4 font-bold text-right">TOTAL POINTS</th>
                <th className="py-3.5 px-4 font-bold text-center">HONORS STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/50">
              {filteredRoster.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2.5">
                      <div className="h-12 w-12 rounded-2xl bg-surface-lowest border border-outline flex items-center justify-center text-primary-accent shadow-sm">
                        <span className="material-symbols-outlined text-2xl">leaderboard</span>
                      </div>
                      <div className="font-extrabold text-sm sm:text-base text-on-background">
                        Official Standings Awaiting Submissions
                      </div>
                      <p className="text-xs font-mono text-on-surface-variant max-w-md leading-relaxed">
                        {students.length === 0
                          ? "The challenge sprint is currently in registration mode. Verify curriculum module assessments to claim the #1 spot on the leaderboard!"
                          : "No verified builders matched your query. Try adjusting your search term or department filter."}
                      </p>
                      {onRegisterClick && !isRegistered && (
                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={onRegisterClick}
                            className="btn-3d-aws px-6 py-2.5 rounded-xl font-mono text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-base">how_to_reg</span>
                            <span>Register for Challenge</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
              {filteredRoster.map((student, idx) => {
                const actualRank = students.findIndex((s) => s.id === student.id) + 1;
                const isLocal =
                  student.id === "local-user" ||
                  student.name.includes("(You)") ||
                  (Boolean(currentUserId) &&
                    (student.id === currentUserId || student.rollOrHandle.includes(currentUserId)));
                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isLocal
                        ? "bg-primary-accent/15 border-l-4 border-l-primary-accent"
                        : idx % 2 === 0
                        ? "bg-surface-low"
                        : "bg-surface-lowest"
                    } hover:bg-surface-high/50`}
                  >
                    <td className="py-3.5 px-4 font-extrabold text-center">
                      {actualRank === 1 ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black font-black text-[11px] shadow-sm">
                          01
                        </span>
                      ) : actualRank === 2 ? (
                        <span className="px-2 py-0.5 rounded-md bg-slate-300 text-slate-900 font-black text-[11px] shadow-sm">
                          02
                        </span>
                      ) : actualRank === 3 ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-700 text-amber-100 font-black text-[11px] shadow-sm">
                          03
                        </span>
                      ) : (
                        <span className="text-on-surface-variant">
                          {actualRank < 10 ? `0${actualRank}` : actualRank}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-7 w-7 rounded-lg flex items-center justify-center font-black text-[10px] ${
                            actualRank <= 3
                              ? "bg-amber-400/20 text-amber-400 border border-amber-400/40"
                              : "bg-surface-lowest text-on-surface-variant border border-outline"
                          }`}
                        >
                          {student.avatarMonogram}
                        </div>
                        <div>
                          <span className="font-bold text-on-background">{student.name}</span>
                          <span className="block text-[10px] text-on-surface-variant">{student.rollOrHandle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant">
                      <div className="text-on-background">{student.branch}</div>
                      <div className="text-[10px] text-on-surface-variant">{student.year}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px]">
                        <span className="material-symbols-outlined text-xs text-amber-400">schedule</span>
                        <span>{student.finishTimeStr || "Recorded"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-amber-400">
                        {student.streakDays} Days
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-extrabold text-sm text-primary-accent">
                        {student.points} PTS
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          actualRank === 1
                            ? "bg-amber-400/20 text-amber-400 border border-amber-400/40 shadow-sm"
                            : actualRank === 2
                            ? "bg-slate-300/20 text-on-background border border-slate-300/40"
                            : actualRank === 3
                            ? "bg-amber-700/20 text-amber-500 border border-amber-700/40"
                            : actualRank <= 5
                            ? "bg-primary-accent/15 text-primary-accent border border-primary-accent/30"
                            : "bg-surface-lowest text-on-surface-variant border border-outline"
                        }`}
                      >
                        {student.badge}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
