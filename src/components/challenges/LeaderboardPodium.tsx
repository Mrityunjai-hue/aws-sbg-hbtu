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
        ? (s.branch.toUpperCase().includes("MATH") || s.branch.toUpperCase().includes("DATA SCIENCE") || s.branch.toUpperCase().includes("MDS"))
        : s.branch.toUpperCase().includes(selectedBranch));

    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-12">
      {/* Executive Voucher Allocation Criteria Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative p-6 rounded-3xl bg-surface-low border border-amber-400/30 overflow-hidden transition-all duration-300 hover:border-amber-400/60 shadow-xl group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/15 transition-all" />
          <div className="flex items-center justify-between pb-3 border-b border-outline">
            <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">workspace_premium</span>
              <span>Ranks 01 to 03</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 font-mono text-[10px] font-bold">
              3 Vouchers Total
            </span>
          </div>
          <h3 className="mt-3 font-extrabold text-base text-on-background">
            Official AWS Exam Voucher Allocation
          </h3>
          <p className="mt-1.5 text-xs text-on-surface-variant font-mono leading-relaxed">
            100% sponsored AWS Certified Cloud Practitioner examination vouchers awarded directly to the top 3 verified builders upon sprint completion.
          </p>
        </div>

        <div className="relative p-6 rounded-3xl bg-surface-low border border-primary-accent/30 overflow-hidden transition-all duration-300 hover:border-primary-accent/60 shadow-xl group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-accent/10 rounded-full blur-2xl pointer-events-none group-hover:bg-primary-accent/15 transition-all" />
          <div className="flex items-center justify-between pb-3 border-b border-outline">
            <span className="text-[11px] font-mono font-bold text-primary-accent uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">military_tech</span>
              <span>Ranks 04 & 05</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary-accent/15 text-primary-accent font-mono text-[10px] font-bold">
              Merit Finalists
            </span>
          </div>
          <h3 className="mt-3 font-extrabold text-base text-on-background">
            Merit Cloud Commendations
          </h3>
          <p className="mt-1.5 text-xs text-on-surface-variant font-mono leading-relaxed">
            AWS Student Builder Group Chapter Recognition Certificates, builder swags, and fast-track invitations to upcoming regional hackathons.
          </p>
        </div>

        <div className="relative p-6 rounded-3xl bg-surface-low border border-emerald-500/30 overflow-hidden transition-all duration-300 hover:border-emerald-500/60 shadow-xl group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/15 transition-all" />
          <div className="flex items-center justify-between pb-3 border-b border-outline">
            <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>All 15-Day Completers</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold">
              Priority Tier
            </span>
          </div>
          <h3 className="mt-3 font-extrabold text-base text-on-background">
            Priority Community Membership
          </h3>
          <p className="mt-1.5 text-xs text-on-surface-variant font-mono leading-relaxed">
            Direct mentor pairing with certified AWS builders, priority cloud project admission, and exclusive AWS promotional credit allocations.
          </p>
        </div>
      </div>

      {/* TOP 3 PODIUM (CYBERNETIC ARCHITECTURAL PEDESTAL) */}
      <div className="space-y-6">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold">
            <span className="material-symbols-outlined text-sm">leaderboard</span>
            <span>OFFICIAL QUALIFICATION STANDINGS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-on-background tracking-tight">
            Top 3 Voucher Contenders
          </h2>
          <p className="text-xs font-mono text-on-surface-variant max-w-lg mx-auto">
            Ranked strictly by verified assessment scores and unbroken daily learning streaks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto pt-6">
          {/* RANK 2: SILVER PEDESTAL (Left) */}
          {top2 && (
            <div className="order-2 md:order-1 relative rounded-3xl p-6 bg-gradient-to-b from-slate-200/10 via-surface-low to-surface-lowest border-2 border-slate-300/40 shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-slate-300/70">
              <div className="absolute -top-4 px-4 py-1 rounded-full bg-slate-300 text-slate-900 font-mono font-black text-xs shadow-md tracking-wider">
                RANK 02 · SILVER
              </div>
              <div className="h-16 w-16 rounded-2xl bg-slate-400/20 border-2 border-slate-300/60 flex items-center justify-center font-mono font-black text-xl text-slate-200 mt-3 mb-3 shadow-inner">
                {top2.avatarMonogram}
              </div>
              <h3 className="font-black text-base text-on-background">{top2.name}</h3>
              <p className="text-[11px] font-mono text-on-surface-variant mt-0.5">{top2.rollOrHandle}</p>
              
              <div className="mt-3 px-3 py-1 rounded-full bg-slate-400/15 border border-slate-400/30 text-slate-200 text-[11px] font-mono font-bold">
                Voucher Candidate
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-4 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>Syllabus Coverage</span>
                  <span>{Math.round((top2.completedDays.length / 15) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-lowest overflow-hidden">
                  <div
                    className="h-full bg-slate-300 rounded-full transition-all duration-500"
                    style={{ width: `${(top2.completedDays.length / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-outline/70 w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Points</div>
                  <div className="text-base font-black text-secondary-accent">{top2.points}</div>
                </div>
                <div className="h-6 w-px bg-outline" />
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Streak</div>
                  <div className="text-base font-black text-amber-400">
                    {top2.streakDays} Days
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RANK 1: GOLD CHAMPION PEDESTAL (Center, Elevated) */}
          {top1 && (
            <div className="order-1 md:order-2 relative rounded-3xl p-7 bg-gradient-to-b from-amber-500/20 via-surface-low to-surface-lowest border-2 border-amber-400/80 shadow-2xl animate-gold-glow flex flex-col items-center text-center md:-translate-y-5 transition-all duration-300 hover:-translate-y-6">
              <div className="absolute -top-5 px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-mono font-black text-xs shadow-xl tracking-wider">
                RANK 01 · CHAMPION
              </div>
              <div className="relative mt-2 mb-3">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 border-4 border-amber-300 text-black flex items-center justify-center font-mono font-black text-2xl shadow-xl">
                  {top1.avatarMonogram}
                </div>
              </div>
              <h3 className="font-black text-lg text-on-background">{top1.name}</h3>
              <p className="text-xs font-mono text-on-surface-variant mt-0.5">{top1.rollOrHandle}</p>
              
              <div className="mt-3 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/60 text-amber-300 text-xs font-mono font-black tracking-wide">
                Voucher Allocation Secured
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-4 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>Syllabus Coverage</span>
                  <span>{Math.round((top1.completedDays.length / 15) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-lowest overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${(top1.completedDays.length / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-outline/70 w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Points</div>
                  <div className="text-lg font-black text-secondary-accent">{top1.points}</div>
                </div>
                <div className="h-8 w-px bg-outline" />
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Streak</div>
                  <div className="text-lg font-black text-amber-400">
                    {top1.streakDays} Days
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RANK 3: BRONZE PEDESTAL (Right) */}
          {top3 && (
            <div className="order-3 relative rounded-3xl p-6 bg-gradient-to-b from-amber-700/15 via-surface-low to-surface-lowest border-2 border-amber-600/50 shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-amber-600/80">
              <div className="absolute -top-4 px-4 py-1 rounded-full bg-amber-700 text-amber-100 font-mono font-black text-xs shadow-md tracking-wider">
                RANK 03 · BRONZE
              </div>
              <div className="h-16 w-16 rounded-2xl bg-amber-700/25 border-2 border-amber-600/60 flex items-center justify-center font-mono font-black text-xl text-amber-200 mt-3 mb-3 shadow-inner">
                {top3.avatarMonogram}
              </div>
              <h3 className="font-black text-base text-on-background">{top3.name}</h3>
              <p className="text-[11px] font-mono text-on-surface-variant mt-0.5">{top3.rollOrHandle}</p>
              
              <div className="mt-3 px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/40 text-amber-300 text-[11px] font-mono font-bold">
                Voucher Candidate
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-4 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>Syllabus Coverage</span>
                  <span>{Math.round((top3.completedDays.length / 15) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-lowest overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full transition-all duration-500"
                    style={{ width: `${(top3.completedDays.length / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-outline/70 w-full flex items-center justify-around font-mono">
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Points</div>
                  <div className="text-base font-black text-secondary-accent">{top3.points}</div>
                </div>
                <div className="h-6 w-px bg-outline" />
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase">Streak</div>
                  <div className="text-base font-black text-amber-400">
                    {top3.streakDays} Days
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TOP 4 & 5 MERIT FINALISTS SPOTLIGHT */}
      {top4and5.length > 0 && (
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-primary-accent/10 via-surface-low to-primary-accent/10 border border-primary-accent/30 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-outline">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-accent">star</span>
              <h3 className="font-extrabold text-sm sm:text-base text-on-background">
                Top 5 Merit Finalists (Positions 04 & 05)
              </h3>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-primary-accent/15 text-primary-accent border border-primary-accent/30 font-bold">
              Eligible for Cloud Commendations
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
                    0{idx + 4}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-background">{s.name}</h4>
                    <p className="text-[11px] font-mono text-on-surface-variant">{s.rollOrHandle}</p>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-sm font-black text-secondary-accent">{s.points} PTS</div>
                  <div className="text-[11px] text-amber-400 font-bold">{s.streakDays} Days Active</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPLETE PARTICIPANT ROSTER DATA TABLE */}
      <div className="rounded-3xl bg-surface-low border border-outline shadow-xl overflow-hidden">
        {/* Controls Bar */}
        <div className="p-5 sm:p-6 border-b border-outline flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-base text-on-background">
              Complete Verified Standings
            </h3>
            <p className="text-xs font-mono text-on-surface-variant">
              Displaying {filteredRoster.length} of {students.length} active university builders
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search builder, roll, or branch..."
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
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-surface-lowest text-on-surface-variant border-b border-outline">
                <th className="py-3 px-4 font-bold text-center w-16">RANK</th>
                <th className="py-3 px-4 font-bold">STUDENT BUILDER</th>
                <th className="py-3 px-4 font-bold">DEPARTMENT & YEAR</th>
                <th className="py-3 px-4 font-bold">TARGET CERTIFICATION</th>
                <th className="py-3 px-4 font-bold text-center">STREAK</th>
                <th className="py-3 px-4 font-bold text-right">TOTAL POINTS</th>
                <th className="py-3 px-4 font-bold text-center">STATUS</th>
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
                    <td className="py-3.5 px-4 font-extrabold text-center">
                      {actualRank === 1 ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black font-black text-[11px]">01</span>
                      ) : actualRank === 2 ? (
                        <span className="px-2 py-0.5 rounded-md bg-slate-300 text-slate-900 font-black text-[11px]">02</span>
                      ) : actualRank === 3 ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-700 text-amber-100 font-black text-[11px]">03</span>
                      ) : (
                        <span className="text-on-surface-variant">0{actualRank}</span>
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
                      <span className="font-bold text-amber-400">
                        {student.streakDays} Days
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
