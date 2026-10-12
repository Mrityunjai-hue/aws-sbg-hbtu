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
  const remaining = students.slice(5);

  const filteredRoster = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollOrHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.branch.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch =
      selectedBranch === "ALL" ||
      s.branch.toUpperCase().includes(selectedBranch);

    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-10">
      {/* Voucher Winner Perks Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-surface-low to-surface-low border border-amber-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-1">
            <span className="material-symbols-outlined text-lg">workspace_premium</span>
            <span>RANKS 1 – 3</span>
          </div>
          <h3 className="font-extrabold text-sm sm:text-base text-on-background">
            Official AWS Exam Vouchers
          </h3>
          <p className="mt-1 text-xs text-on-surface-variant font-mono">
            100% sponsored exam voucher to sit for the AWS Certified Cloud Practitioner certification exam!
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-accent/15 via-surface-low to-surface-low border border-primary-accent/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-2 text-primary-accent font-mono text-xs font-bold mb-1">
            <span className="material-symbols-outlined text-lg">military_tech</span>
            <span>RANKS 4 – 5</span>
          </div>
          <h3 className="font-extrabold text-sm sm:text-base text-on-background">
            Merit Cloud Swags & Awards
          </h3>
          <p className="mt-1 text-xs text-on-surface-variant font-mono">
            Official AWS SBG Chapter Recognition Certificates, builder swags, and hackathon fast-track.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-surface-low to-surface-low border border-emerald-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-1">
            <span className="material-symbols-outlined text-lg">verified</span>
            <span>ALL COMPLETERS</span>
          </div>
          <h3 className="font-extrabold text-sm sm:text-base text-on-background">
            Priority Community Member
          </h3>
          <p className="mt-1 text-xs text-on-surface-variant font-mono">
            Direct mentor pairing, priority entry to cloud build projects, and exclusive AWS credit grants.
          </p>
        </div>
      </div>

      {/* TOP 3 PODIUM DISPLAY */}
      <div>
        <div className="text-center space-y-1 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
            <span className="material-symbols-outlined text-sm">emoji_events</span>
            <span>OFFICIAL VOUCHER QUALIFICATION PODIUM</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-on-background tracking-tight">
            Top 3 Leaderboard Standouts
          </h2>
          <p className="text-xs font-mono text-on-surface-variant max-w-lg mx-auto">
            Ranked by total verified module quiz points and continuous learning streaks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4">
          {/* RANK 2: SILVER (Left) */}
          {top2 && (
            <div className="order-2 md:order-1 relative rounded-3xl p-6 bg-gradient-to-b from-slate-300/15 via-surface-low to-surface-lowest border-2 border-slate-300/40 shadow-xl flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <div className="absolute -top-4 px-3 py-1 rounded-full bg-slate-300 text-slate-900 font-mono font-black text-xs shadow-md">
                🥈 RANK #2
              </div>
              <div className="h-16 w-16 rounded-full bg-slate-400/20 border-2 border-slate-300 flex items-center justify-center font-mono font-black text-lg text-slate-200 mt-2 mb-3 shadow-inner">
                {top2.avatarMonogram}
              </div>
              <h3 className="font-black text-base text-on-background">{top2.name}</h3>
              <p className="text-[11px] font-mono text-on-surface-variant mt-0.5">{top2.rollOrHandle}</p>
              <div className="mt-3 px-3 py-1 rounded-full bg-slate-400/15 border border-slate-400/30 text-slate-200 text-xs font-mono font-bold">
                🎟️ Voucher Contender
              </div>
              <div className="mt-4 pt-4 border-t border-outline/70 w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-on-surface-variant">POINTS</div>
                  <div className="text-base font-black text-secondary-accent">{top2.points}</div>
                </div>
                <div className="h-6 w-px bg-outline" />
                <div>
                  <div className="text-[10px] text-on-surface-variant">STREAK</div>
                  <div className="text-base font-black text-amber-400 flex items-center justify-center gap-0.5">
                    <span>{top2.streakDays}</span>
                    <span className="text-xs">🔥</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RANK 1: GOLD CHAMPION (Center, Elevated) */}
          {top1 && (
            <div className="order-1 md:order-2 relative rounded-3xl p-7 bg-gradient-to-b from-amber-500/25 via-surface-low to-surface-lowest border-2 border-amber-400/70 shadow-2xl shadow-amber-500/10 flex flex-col items-center text-center md:-translate-y-4 transition-transform hover:-translate-y-5">
              {/* Crown Animation */}
              <div className="absolute -top-5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black font-mono font-black text-xs shadow-xl flex items-center gap-1.5 animate-bounce">
                <span>👑</span>
                <span>CHAMPION · RANK #1</span>
              </div>
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 border-4 border-amber-300 text-black flex items-center justify-center font-mono font-black text-2xl mt-3 mb-3 shadow-2xl shadow-amber-500/30">
                {top1.avatarMonogram}
              </div>
              <h3 className="font-black text-lg text-on-background">{top1.name}</h3>
              <p className="text-xs font-mono text-on-surface-variant mt-0.5">{top1.rollOrHandle}</p>
              <div className="mt-3 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-mono font-extrabold shadow-sm">
                🎟️ 100% Exam Voucher Guaranteed
              </div>
              <div className="mt-5 pt-4 border-t border-outline/70 w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-on-surface-variant">POINTS</div>
                  <div className="text-lg font-black text-secondary-accent">{top1.points}</div>
                </div>
                <div className="h-8 w-px bg-outline" />
                <div>
                  <div className="text-[10px] text-on-surface-variant">STREAK</div>
                  <div className="text-lg font-black text-amber-400 flex items-center justify-center gap-1">
                    <span>{top1.streakDays}</span>
                    <span className="text-sm">🔥</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RANK 3: BRONZE (Right) */}
          {top3 && (
            <div className="order-3 relative rounded-3xl p-6 bg-gradient-to-b from-amber-700/20 via-surface-low to-surface-lowest border-2 border-amber-700/50 shadow-xl flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <div className="absolute -top-4 px-3 py-1 rounded-full bg-amber-700 text-amber-100 font-mono font-black text-xs shadow-md">
                🥉 RANK #3
              </div>
              <div className="h-16 w-16 rounded-full bg-amber-700/25 border-2 border-amber-600 flex items-center justify-center font-mono font-black text-lg text-amber-200 mt-2 mb-3 shadow-inner">
                {top3.avatarMonogram}
              </div>
              <h3 className="font-black text-base text-on-background">{top3.name}</h3>
              <p className="text-[11px] font-mono text-on-surface-variant mt-0.5">{top3.rollOrHandle}</p>
              <div className="mt-3 px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/40 text-amber-300 text-xs font-mono font-bold">
                🎟️ Voucher Contender
              </div>
              <div className="mt-4 pt-4 border-t border-outline/70 w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-on-surface-variant">POINTS</div>
                  <div className="text-base font-black text-secondary-accent">{top3.points}</div>
                </div>
                <div className="h-6 w-px bg-outline" />
                <div>
                  <div className="text-[10px] text-on-surface-variant">STREAK</div>
                  <div className="text-base font-black text-amber-400 flex items-center justify-center gap-0.5">
                    <span>{top3.streakDays}</span>
                    <span className="text-xs">🔥</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TOP 4 & 5 FINALISTS SPOTLIGHT */}
      {top4and5.length > 0 && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-primary-accent/10 via-surface-low to-primary-accent/10 border border-primary-accent/30 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-outline">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-accent">star</span>
              <h3 className="font-extrabold text-sm sm:text-base text-on-background">
                Top 5 Merit Finalists (Positions #4 & #5)
              </h3>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-primary-accent/15 text-primary-accent border border-primary-accent/30 font-bold">
              Eligible for Cloud Merch & Certificates
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {top4and5.map((s, idx) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-surface-lowest border border-outline/80 flex items-center justify-between gap-3 hover:border-primary-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-surface-low border border-outline flex items-center justify-center font-mono font-black text-xs text-primary-accent">
                    #{idx + 4}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-background">{s.name}</h4>
                    <p className="text-[11px] font-mono text-on-surface-variant">{s.rollOrHandle}</p>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-sm font-black text-secondary-accent">{s.points} PTS</div>
                  <div className="text-[11px] text-amber-400 font-bold">{s.streakDays} Days 🔥</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL LEADERBOARD ROSTER WITH SEARCH & FILTER */}
      <div className="rounded-3xl bg-surface-low border border-outline shadow-xl overflow-hidden">
        {/* Roster Controls */}
        <div className="p-5 sm:p-6 border-b border-outline flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-base text-on-background">
              Complete Challenge Standings
            </h3>
            <p className="text-xs font-mono text-on-surface-variant">
              Showing {filteredRoster.length} of {students.length} participating builders
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, roll no, or branch..."
                className="pl-9 pr-4 py-2 rounded-xl bg-surface-lowest border border-outline text-xs font-mono text-on-background outline-none focus:border-primary-accent w-64"
              />
              <span className="material-symbols-outlined text-sm text-on-surface-variant absolute left-3 top-2.5">
                search
              </span>
            </div>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface-lowest border border-outline text-xs font-mono text-on-background outline-none focus:border-primary-accent"
            >
              <option value="ALL">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EE">EE</option>
              <option value="CHE">Chemical</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-surface-lowest text-on-surface-variant border-b border-outline">
                <th className="py-3 px-4 font-bold">RANK</th>
                <th className="py-3 px-4 font-bold">STUDENT BUILDER</th>
                <th className="py-3 px-4 font-bold">BRANCH & YEAR</th>
                <th className="py-3 px-4 font-bold">TARGET CERT</th>
                <th className="py-3 px-4 font-bold text-center">STREAK</th>
                <th className="py-3 px-4 font-bold text-right">TOTAL POINTS</th>
                <th className="py-3 px-4 font-bold text-center">PERK TIER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/50">
              {filteredRoster.map((student, idx) => {
                const actualRank = students.findIndex((s) => s.id === student.id) + 1;
                const isLocal = student.id === "local-user";
                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isLocal
                        ? "bg-primary-accent/10 border-l-4 border-l-primary-accent"
                        : idx % 2 === 0
                        ? "bg-surface-low/50"
                        : "bg-surface-low/20"
                    } hover:bg-surface-lowest`}
                  >
                    <td className="py-3.5 px-4 font-extrabold text-center w-14">
                      {actualRank === 1 ? (
                        <span className="text-amber-400 font-black text-sm">🥇 #1</span>
                      ) : actualRank === 2 ? (
                        <span className="text-slate-300 font-black text-sm">🥈 #2</span>
                      ) : actualRank === 3 ? (
                        <span className="text-amber-600 font-black text-sm">🥉 #3</span>
                      ) : (
                        <span className="text-on-surface-variant">#{actualRank}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-7 w-7 rounded-lg flex items-center justify-center font-black text-[10px] ${
                            actualRank <= 3
                              ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
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
                      <div>{student.branch}</div>
                      <div className="text-[10px] text-on-surface-variant/70">{student.year}</div>
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant">
                      <span className="truncate block max-w-xs">{student.targetCert}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-amber-400">
                        <span>{student.streakDays}d</span>
                        <span className="text-xs">🔥</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-extrabold text-sm text-secondary-accent">
                        {student.points}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          actualRank <= 3
                            ? "bg-amber-400/15 text-amber-300 border border-amber-400/30"
                            : actualRank <= 5
                            ? "bg-primary-accent/15 text-primary-accent border border-primary-accent/30"
                            : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
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
