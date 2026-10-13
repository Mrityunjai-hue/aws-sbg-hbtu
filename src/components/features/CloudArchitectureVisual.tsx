"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ArchitectureNode {
  id: string;
  name: string;
  category: string;
  status: "healthy" | "active" | "streaming";
  metric: string;
  description: string;
  iconName: string;
}

const NODES: ArchitectureNode[] = [
  {
    id: "edge",
    name: "Amazon CloudFront",
    category: "Edge & CDN",
    status: "healthy",
    metric: "410+ POPs",
    description: "Sub-millisecond global caching with automated TLS encryption at HBTU edge.",
    iconName: "travel_explore",
  },
  {
    id: "api",
    name: "Amazon API Gateway",
    category: "Traffic Router",
    status: "active",
    metric: "4.8k req/s",
    description: "Fully managed REST & WebSocket endpoints with native throttling and auth validation.",
    iconName: "hub",
  },
  {
    id: "compute",
    name: "AWS Lambda",
    category: "Serverless Compute",
    status: "active",
    metric: "14ms avg execution",
    description: "Event-driven scale-to-zero execution running Node.js 20 & Python 3.12 runtimes.",
    iconName: "electric_bolt",
  },
  {
    id: "ai",
    name: "Amazon Bedrock",
    category: "Generative AI",
    status: "streaming",
    metric: "Claude 3.5 Sonnet",
    description: "Unified API accessing state-of-the-art foundation models with enterprise guardrails.",
    iconName: "psychology",
  },
  {
    id: "db",
    name: "Amazon DynamoDB",
    category: "NoSQL Database",
    status: "healthy",
    metric: "0.8ms p99 latency",
    description: "Single-digit millisecond latency at any scale with ACID transactions and point-in-time recovery.",
    iconName: "database",
  },
  {
    id: "storage",
    name: "Amazon S3",
    category: "Object Store",
    status: "healthy",
    metric: "99.999999999% SLA",
    description: "Industry-leading 11 9's durability with automated intelligent tiering and lifecycle rules.",
    iconName: "folder_zip",
  },
];

export function CloudArchitectureVisual() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(NODES[2]); // Default Lambda
  const [activeTab, setActiveTab] = useState<"topology" | "telemetry">("topology");

  return (
    <div className="relative group/canvas w-full rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#070b09]/95 shadow-[0_0_50px_rgba(16,185,129,0.12)]">
      {/* Top Ambient Glow & Green Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/10 via-emerald-400 to-amber-500/40" />

      {/* Header Bar */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-emerald-950/80 bg-[#09110d]/90 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-bold text-slate-200">
            AWS LIVE ARCHITECTURE <span className="text-emerald-400">· ap-south-1</span>
          </span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-[#050806] p-1 rounded-lg border border-emerald-900/60">
          <button
            onClick={() => setActiveTab("topology")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              activeTab === "topology"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Live Mesh
          </button>
          <button
            onClick={() => setActiveTab("telemetry")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              activeTab === "telemetry"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Telemetry HUD
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="relative p-4 sm:p-6 min-h-[360px] flex flex-col justify-between overflow-hidden">
        {/* Subtle Cyber Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Radial Center Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />

        {activeTab === "topology" ? (
          <div className="relative z-10 space-y-6">
            {/* Top Pipeline Flow Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400/90 pb-2 border-b border-emerald-950/60">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">sensors</span>
                <span>INGRESS TRAFFIC</span>
              </span>
              <span className="text-slate-400">HIGH-AVAILABILITY CLOUD RUNTIME</span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="material-symbols-outlined text-[14px]">storage</span>
                <span>PERSISTENCE</span>
              </span>
            </div>

            {/* Architecture Node Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <motion.button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? "bg-emerald-950/50 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400"
                        : "bg-[#0b140f]/70 border-emerald-900/40 hover:border-emerald-500/50 hover:bg-[#0e1a14]/80"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="material-symbols-outlined text-[20px] text-emerald-400">
                        {node.iconName}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-semibold">
                        {node.metric}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-100 leading-tight">
                        {node.name}
                      </h4>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {node.category}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-emerald-500/30 flex items-center justify-between text-[10px] font-mono text-emerald-300">
                        <span>● ACTIVE TELEMETRY</span>
                        <span className="text-amber-400">0.0ms LAG</span>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Active Inspector Panel for Selected Node */}
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-[#0b140f] border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <span className="material-symbols-outlined text-[24px]">
                    {selectedNode.iconName}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-100">{selectedNode.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      HEALTHY
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans mt-0.5 leading-snug">
                    {selectedNode.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-emerald-900/50">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Production Metric</span>
                <span className="text-sm font-extrabold text-emerald-400">{selectedNode.metric}</span>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Telemetry HUD View */
          <div className="relative z-10 space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#0b140f] border border-emerald-900/60">
                <span className="text-[10px] text-slate-400 uppercase">Requests / Sec</span>
                <div className="text-xl font-black text-emerald-400 mt-1">4,820</div>
                <div className="text-[10px] text-emerald-500/80 mt-0.5">▲ +14% vs avg</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0b140f] border border-emerald-900/60">
                <span className="text-[10px] text-slate-400 uppercase">P99 Latency</span>
                <div className="text-xl font-black text-slate-100 mt-1">21.4 ms</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Optimal Edge Route</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0b140f] border border-emerald-900/60">
                <span className="text-[10px] text-slate-400 uppercase">Availability</span>
                <div className="text-xl font-black text-emerald-400 mt-1">99.99%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Multi-AZ Redundant</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0b140f] border border-emerald-900/60">
                <span className="text-[10px] text-slate-400 uppercase">Campus Builders</span>
                <div className="text-xl font-black text-amber-400 mt-1">350+</div>
                <div className="text-[10px] text-slate-400 mt-0.5">HBTU Students</div>
              </div>
            </div>

            {/* Terminal Live Stream Feed */}
            <div className="p-4 rounded-xl bg-[#050806] border border-emerald-950 text-slate-300 font-mono text-[11px] space-y-1.5 leading-relaxed">
              <div className="text-emerald-400 font-bold flex items-center justify-between pb-1 border-b border-emerald-950">
                <span>[SYSTEM EVENT STREAM]</span>
                <span className="animate-pulse text-[10px]">REALTIME</span>
              </div>
              <div className="text-slate-400">
                <span className="text-emerald-500">21:30:14.201</span> [CloudFront] HIT 200 GET /api/workshops · 3.2ms
              </div>
              <div className="text-slate-400">
                <span className="text-emerald-500">21:30:14.482</span> [Lambda] Invoke `calculateLeaderboardRankingsAndHonors` · runtime: 12ms
              </div>
              <div className="text-slate-400">
                <span className="text-emerald-500">21:30:14.890</span> [Bedrock] Stream completion generated with model `anthropic.claude-3-5-sonnet`
              </div>
              <div className="text-slate-400">
                <span className="text-emerald-500">21:30:15.112</span> [DynamoDB] PutItem verified for student registry in partition `AP-SOUTH-1-HBTU`
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-[#050806] border-t border-emerald-950/70 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Architecture Verified</span>
          </span>
          <span>·</span>
          <span>Serverless First</span>
        </div>
        <span className="text-slate-300 font-semibold">AWS Student Builder Group · HBTU Chapter</span>
      </div>
    </div>
  );
}
