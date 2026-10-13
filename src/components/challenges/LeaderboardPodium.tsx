"use client";

import React, { useState } from "react";
import { LeaderboardStudent } from "@/data/challenges";

interface LeaderboardPodiumProps {
  students: LeaderboardStudent[];
  currentUserId?: string;
}

export function LeaderboardPodium({ students, currentUserId }: LeaderboardPodiumProps) {
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
        {/* Tier 1: Ranks 01-03 */}
        <div className="relative p-6 sm:p-7 rounded-3xl bg-[#09110d] border border-amber-400/40 overflow-hidden transition-all duration-300 hover:border-amber-400/80 shadow-[0_0_30px_rgba(255,191,0,0.12)] group">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/20 transition-all" />
          <div className="flex items-center justify-between pb-3.5 border-b border-emerald-500/20">
            <span className="text-[11px] font-mono font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">workspace_premium</span>
              <span>Ranks 01 to 03 · Top Podium</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/30">
              Executive Honors
            </span>
          </div>
          <h3 className="mt-3.5 font-black text-base text-slate-100">
            LinkedIn Spotlight & AWS Swag Kit
          </h3>
          <p className="mt-2 text-xs text-slate-300 font-mono leading-relaxed">
            Executive LinkedIn shoutout feature across AWS SBG chapter leadership channels, exclusive AWS & SBG Swag Goodies kits, core team recognition, and 1-on-1 industry mentorship.
          </p>
        </div>

        {/* Tier 2: Ranks 04-05 */}
        <div className="relative p-6 sm:p-7 rounded-3xl bg-[#09110d] border border-emerald-500/40 overflow-hidden transition-all duration-300 hover:border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.12)] group">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center justify-between pb-3.5 border-b border-emerald-500/20">
            <span className="text-[11px] font-mono font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">military_tech</span>
              <span>Ranks 04 & 05 · Finalists</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
              Merit Finalists
            </span>
          </div>
          <h3 className="mt-3.5 font-black text-base text-slate-100">
            Merit Cloud Commendations
          </h3>
          <p className="mt-2 text-xs text-slate-300 font-mono leading-relaxed">
            AWS Student Builder Group Chapter Recognition Certificates, builder stickers & swag packs, and fast-track invitations to regional hackathon project teams.
          </p>
        </div>

        {/* Tier 3: All Completers */}
        <div className="relative p-6 sm:p-7 rounded-3xl bg-[#09110d] border border-emerald-500/30 overflow-hidden transition-all duration-300 hover:border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.08)] group">
          <div className="absolute top-0 right-0 w-36 h-36 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/15 transition-all" />
          <div className="flex items-center justify-between pb-3.5 border-b border-emerald-500/20">
            <span className="text-[11px] font-mono font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>All 15-Day Completers</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
              Priority Tier
            </span>
          </div>
          <h3 className="mt-3.5 font-black text-base text-slate-100">
            Priority Community Membership
          </h3>
          <p className="mt-2 text-xs text-slate-300 font-mono leading-relaxed">
            Direct connection building with alumni & certified AWS architects, priority cloud workshop admission, and official chapter membership credentials.
          </p>
        </div>
      </div>

      {/* ── TOP 3 PODIUM: CYBERNETIC ARCHITECTURAL PEDESTALS ── */}
      <div className="space-y-6">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold">
            <span className="material-symbols-outlined text-sm">leaderboard</span>
            <span>OFFICIAL QUALIFICATION STANDINGS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-100 tracking-tight">
            Top Contestant Honor Podium
          </h2>
          <p className="text-xs font-mono text-slate-400 max-w-xl mx-auto">
            Ranked strictly by verified assessment accuracy, unbroken streaks, and earliest completion timestamp for tie-breaking.
          </p>
        </div>

        {/* Podium Layout: Rank 2 (Left), Rank 1 (Center High), Rank 3 (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto pt-6">
          {/* ── RANK 2: SILVER PEDESTAL (Left) ── */}
          {top2 ? (
            <div className="order-2 md:order-1 relative rounded-3xl p-6 bg-gradient-to-b from-slate-200/10 via-[#0a120e] to-[#060a08] border-2 border-slate-300/40 shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-slate-300/70">
              <div className="absolute -top-4 px-4 py-1 rounded-full bg-slate-300 text-slate-900 font-mono font-black text-xs shadow-md tracking-wider">
                RANK 02 · SILVER
              </div>
              <div className="h-16 w-16 rounded-2xl bg-slate-400/20 border-2 border-slate-300/60 flex items-center justify-center font-mono font-black text-xl text-slate-200 mt-3 mb-3 shadow-inner">
                {top2.avatarMonogram}
              </div>
              <h3 className="font-black text-base text-slate-100">{top2.name}</h3>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">{top2.rollOrHandle}</p>

              <div className="mt-3 px-3 py-1 rounded-full bg-slate-400/15 border border-slate-400/30 text-slate-200 text-[11px] font-mono font-bold">
                {top2.badge}
              </div>

              {/* Tie-breaker timestamp tag */}
              <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-amber-400">schedule</span>
                <span>{top2.finishTimeStr || "Finished 2nd"}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-4 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Curriculum Progress</span>
                  <span>{Math.round((top2.completedDays.length / 15) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#050706] overflow-hidden">
                  <div
                    className="h-full bg-slate-300 rounded-full transition-all duration-500"
                    style={{ width: `${(top2.completedDays.length / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-emerald-500/20 w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Points</div>
                  <div className="text-base font-black text-emerald-400">{top2.points}</div>
                </div>
                <div className="h-6 w-px bg-emerald-500/20" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Streak</div>
                  <div className="text-base font-black text-amber-400">
                    {top2.streakDays} Days
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="order-2 md:order-1 relative rounded-3xl p-6 bg-[#09110d] border border-dashed border-emerald-500/30 flex flex-col items-center text-center opacity-70">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-[#060a08] border border-emerald-500/30 text-slate-400 font-mono text-[10px] font-bold">
                RANK 02 · SILVER
              </div>
              <div className="h-14 w-14 rounded-2xl bg-[#060a08] border border-dashed border-emerald-500/20 flex items-center justify-center font-mono text-slate-400 mt-3 mb-2">
                <span className="material-symbols-outlined text-xl">person</span>
              </div>
              <h3 className="font-bold text-sm text-slate-400">Open Podium Slot</h3>
              <p className="text-[10px] font-mono text-slate-500 mt-1">Awaiting 2nd verified finisher</p>
            </div>
          )}

          {/* ── RANK 1: GOLD CYBER PEDESTAL (Center, Taller, Glowing) ── */}
          {top1 ? (
            <div className="order-1 md:order-2 relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-amber-400/20 via-[#0d1812] to-[#070c09] border-2 border-amber-400/70 shadow-[0_0_40px_rgba(255,191,0,0.2)] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-3 hover:border-amber-400 z-10">
              <div className="absolute -top-5 px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-mono font-black text-xs shadow-lg flex items-center gap-1.5 tracking-wider">
                <span className="material-symbols-outlined text-base">emoji_events</span>
                <span>RANK 01 · GOLD LEADER</span>
              </div>
              <div className="h-20 w-20 rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center font-mono font-black text-2xl text-amber-300 mt-2 mb-3 shadow-[0_0_20px_rgba(255,191,0,0.3)]">
                {top1.avatarMonogram}
              </div>
              <h3 className="font-black text-lg text-slate-100">{top1.name}</h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">{top1.rollOrHandle}</p>

              <div className="mt-3 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-mono font-black shadow-sm">
                {top1.badge}
              </div>

              {/* Earliest finish tie-breaker indicator */}
              <div className="mt-2 text-[11px] font-mono text-amber-300/90 flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-xs text-amber-400">timer</span>
                <span>{top1.finishTimeStr || "Finished 1st · Tie-Break Winner"}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-4 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Curriculum Progress</span>
                  <span>{Math.round((top1.completedDays.length / 15) * 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#050706] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${(top1.completedDays.length / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-amber-400/30 w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Points</div>
                  <div className="text-lg font-black text-amber-300">{top1.points} PTS</div>
                </div>
                <div className="h-7 w-px bg-amber-400/30" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Streak</div>
                  <div className="text-lg font-black text-emerald-400">
                    {top1.streakDays} Days
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="order-1 md:order-2 relative rounded-3xl p-7 bg-[#09110d] border border-dashed border-amber-400/40 flex flex-col items-center text-center opacity-70">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-[#060a08] border border-amber-400/40 text-amber-300 font-mono text-[10px] font-bold">
                RANK 01 · GOLD
              </div>
              <div className="h-16 w-16 rounded-2xl bg-[#060a08] border border-dashed border-amber-400/30 flex items-center justify-center font-mono text-amber-300 mt-3 mb-2">
                <span className="material-symbols-outlined text-2xl">emoji_events</span>
              </div>
              <h3 className="font-bold text-sm text-slate-400">Open Leader Slot</h3>
              <p className="text-[10px] font-mono text-slate-500 mt-1">Awaiting 1st verified finisher</p>
            </div>
          )}

          {/* ── RANK 3: BRONZE PEDESTAL (Right) ── */}
          {top3 ? (
            <div className="order-3 relative rounded-3xl p-6 bg-gradient-to-b from-amber-700/10 via-[#0a120e] to-[#060a08] border-2 border-amber-700/40 shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-amber-700/70">
              <div className="absolute -top-4 px-4 py-1 rounded-full bg-amber-700 text-amber-100 font-mono font-black text-xs shadow-md tracking-wider">
                RANK 03 · BRONZE
              </div>
              <div className="h-16 w-16 rounded-2xl bg-amber-800/20 border-2 border-amber-700/60 flex items-center justify-center font-mono font-black text-xl text-amber-200 mt-3 mb-3 shadow-inner">
                {top3.avatarMonogram}
              </div>
              <h3 className="font-black text-base text-slate-100">{top3.name}</h3>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">{top3.rollOrHandle}</p>

              <div className="mt-3 px-3 py-1 rounded-full bg-amber-700/15 border border-amber-700/30 text-amber-200 text-[11px] font-mono font-bold">
                {top3.badge}
              </div>

              {/* Tie-breaker timestamp tag */}
              <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-amber-400">schedule</span>
                <span>{top3.finishTimeStr || "Finished 3rd"}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-4 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Curriculum Progress</span>
                  <span>{Math.round((top3.completedDays.length / 15) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#050706] overflow-hidden">
                  <div
                    className="h-full bg-amber-700 rounded-full transition-all duration-500"
                    style={{ width: `${(top3.completedDays.length / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-emerald-500/20 w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Points</div>
                  <div className="text-base font-black text-emerald-400">{top3.points}</div>
                </div>
                <div className="h-6 w-px bg-emerald-500/20" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Streak</div>
                  <div className="text-base font-black text-amber-400">
                    {top3.streakDays} Days
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="order-3 relative rounded-3xl p-6 bg-[#09110d] border border-dashed border-emerald-500/30 flex flex-col items-center text-center opacity-70">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-[#060a08] border border-emerald-500/30 text-slate-400 font-mono text-[10px] font-bold">
                RANK 03 · BRONZE
              </div>
              <div className="h-14 w-14 rounded-2xl bg-[#060a08] border border-dashed border-emerald-500/20 flex items-center justify-center font-mono text-slate-400 mt-3 mb-2">
                <span className="material-symbols-outlined text-xl">person</span>
              </div>
              <h3 className="font-bold text-sm text-slate-400">Open Podium Slot</h3>
              <p className="text-[10px] font-mono text-slate-500 mt-1">Awaiting 3rd verified finisher</p>
            </div>
          )}
        </div>
      </div>

      {/* ── TOP 4 & 5 MERIT FINALISTS SPOTLIGHT ── */}
      {top4and5.length > 0 && (
        <div className="p-6 sm:p-7 rounded-3xl bg-[#08100c] border border-emerald-500/30 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400">star</span>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-100">
                Top 5 Merit Finalists (Positions 04 & 05)
              </h3>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
              Eligible for Chapter Commendations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {top4and5.map((s, idx) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-[#050907] border border-emerald-500/20 flex items-center justify-between gap-3 hover:border-emerald-400/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-black text-xs text-emerald-400">
                    0{idx + 4}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">{s.name}</h4>
                    <p className="text-[11px] font-mono text-slate-400">{s.rollOrHandle}</p>
                    {s.finishTimeStr && (
                      <p className="text-[10px] font-mono text-amber-400/80">{s.finishTimeStr}</p>
                    )}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-sm font-black text-emerald-300">{s.points} PTS</div>
                  <div className="text-[11px] text-amber-400 font-bold">{s.streakDays}d Streak</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── COMPLETE PARTICIPANT ROSTER DATA TABLE ── */}
      <div className="rounded-3xl bg-[#08100c] border border-emerald-500/30 shadow-xl overflow-hidden">
        {/* Controls Bar */}
        <div className="p-5 sm:p-6 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-100">
              Complete Verified Standings
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Displaying {filteredRoster.length} of {students.length} active university builders · Tie-breaks resolved by earliest finish timestamp
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search builder, roll, or branch..."
                className="pl-9 pr-4 py-2 rounded-xl bg-[#050907] border border-emerald-500/25 text-xs font-mono text-slate-100 outline-none focus:border-emerald-400 w-full sm:w-64 transition-colors"
              />
              <span className="material-symbols-outlined text-sm text-slate-400 absolute left-3 top-2.5">
                search
              </span>
            </div>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#050907] border border-emerald-500/25 text-xs font-mono text-slate-100 outline-none focus:border-emerald-400 transition-colors"
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

        {/* Mobile Swipe Notice */}
        <div className="sm:hidden px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-[10px] font-mono text-emerald-300 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">swipe</span>
            <span>Scroll horizontally to view tie-break times & status</span>
          </span>
          <span className="text-slate-400">Ranked by points & time</span>
        </div>

        {/* High-Performance Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#050907] text-slate-400 border-b border-emerald-500/20">
                <th className="py-3.5 px-4 font-bold text-center w-16">RANK</th>
                <th className="py-3.5 px-4 font-bold">STUDENT BUILDER</th>
                <th className="py-3.5 px-4 font-bold">DEPARTMENT & YEAR</th>
                <th className="py-3.5 px-4 font-bold">TIE-BREAK TIME</th>
                <th className="py-3.5 px-4 font-bold text-center">STREAK</th>
                <th className="py-3.5 px-4 font-bold text-right">TOTAL POINTS</th>
                <th className="py-3.5 px-4 font-bold text-center">HONORS STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {filteredRoster.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="h-10 w-10 rounded-2xl bg-[#050907] border border-emerald-500/20 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-xl">hourglass_empty</span>
                      </div>
                      <div className="font-bold text-sm text-slate-100">No Standings Matching Query</div>
                      <p className="text-xs font-mono text-slate-400 max-w-sm">
                        Try modifying your search or department filter.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {filteredRoster.map((student, idx) => {
                const actualRank = students.findIndex((s) => s.id === student.id) + 1;
                const isLocal =
                  student.id === "local-user" || (Boolean(currentUserId) && student.id === currentUserId);
                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isLocal
                        ? "bg-emerald-500/15 border-l-4 border-l-emerald-400"
                        : idx % 2 === 0
                        ? "bg-[#08100c]/60"
                        : "bg-[#060a08]/40"
                    } hover:bg-[#0c1611]`}
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
                        <span className="text-slate-400">0{actualRank}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-7 w-7 rounded-lg flex items-center justify-center font-black text-[10px] ${
                            actualRank <= 3
                              ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                              : "bg-[#050907] text-slate-400 border border-emerald-500/20"
                          }`}
                        >
                          {student.avatarMonogram}
                        </div>
                        <div>
                          <span className="font-bold text-slate-100">{student.name}</span>
                          <span className="block text-[10px] text-slate-400">{student.rollOrHandle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <div>{student.branch}</div>
                      <div className="text-[10px] text-slate-500">{student.year}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
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
                      <span className="font-extrabold text-sm text-emerald-300">
                        {student.points} PTS
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          actualRank === 1
                            ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm"
                            : actualRank === 2
                            ? "bg-slate-300/20 text-slate-200 border border-slate-300/40"
                            : actualRank === 3
                            ? "bg-amber-700/20 text-amber-200 border border-amber-700/40"
                            : actualRank <= 5
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : "bg-[#09110d] text-slate-400 border border-emerald-500/20"
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
