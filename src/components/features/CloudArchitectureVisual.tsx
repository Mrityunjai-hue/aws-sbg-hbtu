"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ArchitectureNode {
  id: string;
  name: string;
  category: string;
  iconName: string;
  metric: string;
  description: string;
}

const NODES: ArchitectureNode[] = [
  {
    id: "route53",
    name: "Amazon Route 53",
    category: "Edge DNS & Routing",
    iconName: "dns",
    metric: "100% SLA",
    description: "Global low-latency DNS routing directing university campus traffic to edge PoPs.",
  },
  {
    id: "cloudfront",
    name: "CloudFront CDN",
    category: "Global Content Edge",
    iconName: "public",
    metric: "410+ PoPs",
    description: "Edge caching distributing high-performance static assets and dynamic APIs with SSL termination.",
  },
  {
    id: "lambda",
    name: "AWS Lambda",
    category: "Serverless Compute",
    iconName: "bolt",
    metric: "12ms Cold",
    description: "Event-driven microservices processing challenge verifications, streak updates, and auth logic.",
  },
  {
    id: "dynamodb",
    name: "Amazon DynamoDB",
    category: "NoSQL Persistence",
    iconName: "database",
    metric: "Single-digit ms",
    description: "Zero-latency student registration store and leaderboard points indexing partitioned by academic year.",
  },
  {
    id: "s3",
    name: "Amazon S3",
    category: "Durable Object Store",
    iconName: "folder_zip",
    metric: "99.999999999%",
    description: "Immutable storage for learning resources, syllabus media, workshop slides, and certifications.",
  },
  {
    id: "bedrock",
    name: "Amazon Bedrock",
    category: "Generative AI Core",
    iconName: "psychology",
    metric: "Claude 3.5 Ready",
    description: "Serverless LLM orchestrator generating interactive architecture explanations and quiz scenarios.",
  },
];

export function CloudArchitectureVisual() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(NODES[2]); // Default Lambda
  const [activeTab, setActiveTab] = useState<"topology" | "telemetry">("topology");

  return (
    <div className="relative group/canvas w-full rounded-2xl overflow-hidden border border-outline bg-surface-low shadow-xl">
      {/* Top Ambient Glow & Green Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-accent/20 via-primary-accent to-secondary-accent/40" />

      {/* Header Bar */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-outline bg-surface-lowest flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-accent" />
          </span>
          <span className="font-bold text-on-background">
            AWS LIVE ARCHITECTURE <span className="text-primary-accent">· ap-south-1</span>
          </span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-surface-low p-1 rounded-lg border border-outline">
          <button
            onClick={() => setActiveTab("topology")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              activeTab === "topology"
                ? "bg-primary-accent/20 text-primary-accent border border-primary-accent/40 shadow-sm"
                : "text-on-surface-variant hover:text-on-background"
            }`}
          >
            Live Mesh
          </button>
          <button
            onClick={() => setActiveTab("telemetry")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              activeTab === "telemetry"
                ? "bg-primary-accent/20 text-primary-accent border border-primary-accent/40 shadow-sm"
                : "text-on-surface-variant hover:text-on-background"
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
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Radial Center Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary-accent/10 blur-[80px] pointer-events-none" />

        {activeTab === "topology" ? (
          <div className="relative z-10 space-y-6">
            {/* Top Pipeline Flow Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-primary-accent pb-2 border-b border-outline">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-[14px]">sensors</span>
                <span>INGRESS TRAFFIC</span>
              </span>
              <span className="text-on-surface-variant">HIGH-AVAILABILITY CLOUD RUNTIME</span>
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
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
                        ? "bg-primary-accent/15 border-primary-accent shadow-md ring-1 ring-primary-accent"
                        : "bg-surface-lowest border-outline hover:border-primary-accent/50 hover:bg-surface-low"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="material-symbols-outlined text-[20px] text-primary-accent">
                        {node.iconName}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary-accent/15 text-primary-accent font-semibold">
                        {node.metric}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-on-background leading-tight">
                        {node.name}
                      </h4>
                      <p className="text-[10px] font-mono text-on-surface-variant mt-0.5">
                        {node.category}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-primary-accent/30 flex items-center justify-between text-[10px] font-mono text-primary-accent">
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
              className="p-4 rounded-xl bg-surface-lowest border border-outline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-accent/15 border border-primary-accent/30 flex items-center justify-center text-primary-accent shrink-0">
                  <span className="material-symbols-outlined text-[24px]">
                    {selectedNode.iconName}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-on-background">{selectedNode.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      HEALTHY
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-sans mt-0.5 leading-snug">
                    {selectedNode.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-outline">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block">Production Metric</span>
                <span className="text-sm font-extrabold text-primary-accent">{selectedNode.metric}</span>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Telemetry HUD View */
          <div className="relative z-10 space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-surface-lowest border border-outline">
                <span className="text-[10px] text-on-surface-variant uppercase">Requests / Sec</span>
                <div className="text-xl font-black text-primary-accent mt-1">4,820</div>
                <div className="text-[10px] text-primary-accent mt-0.5">▲ +14% vs avg</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-lowest border border-outline">
                <span className="text-[10px] text-on-surface-variant uppercase">P99 Latency</span>
                <div className="text-xl font-black text-on-background mt-1">21.4 ms</div>
                <div className="text-[10px] text-primary-accent mt-0.5">Optimal Edge Route</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-lowest border border-outline">
                <span className="text-[10px] text-on-surface-variant uppercase">Availability</span>
                <div className="text-xl font-black text-primary-accent mt-1">99.99%</div>
                <div className="text-[10px] text-on-surface-variant mt-0.5">Multi-AZ Redundant</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-lowest border border-outline">
                <span className="text-[10px] text-on-surface-variant uppercase">Campus Builders</span>
                <div className="text-xl font-black text-amber-400 mt-1">350+</div>
                <div className="text-[10px] text-on-surface-variant mt-0.5">HBTU Students</div>
              </div>
            </div>

            {/* Terminal Live Stream Feed */}
            <div className="p-4 rounded-xl bg-surface-lowest border border-outline text-on-surface-variant font-mono text-[11px] space-y-1.5 leading-relaxed shadow-inner">
              <div className="text-primary-accent font-bold flex items-center justify-between pb-1 border-b border-outline">
                <span>[SYSTEM EVENT STREAM]</span>
                <span className="animate-pulse text-[10px]">REALTIME</span>
              </div>
              <div className="text-on-surface-variant">
                <span className="text-primary-accent font-semibold">21:30:14.201</span> [CloudFront] HIT 200 GET /api/workshops · 3.2ms
              </div>
              <div className="text-on-surface-variant">
                <span className="text-primary-accent font-semibold">21:30:14.482</span> [Lambda] Invoke `calculateLeaderboardRankingsAndHonors` · runtime: 12ms
              </div>
              <div className="text-on-surface-variant">
                <span className="text-primary-accent font-semibold">21:30:14.890</span> [Bedrock] Stream completion generated with model `anthropic.claude-3-5-sonnet`
              </div>
              <div className="text-on-surface-variant">
                <span className="text-primary-accent font-semibold">21:30:15.112</span> [DynamoDB] PutItem verified for student registry in partition `AP-SOUTH-1-HBTU`
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-surface-lowest border-t border-outline flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-on-surface-variant">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-primary-accent font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-accent" />
            <span>Architecture Verified</span>
          </span>
          <span>·</span>
          <span>Serverless First</span>
        </div>
        <span className="text-on-background font-semibold">AWS Student Builder Group · HBTU Chapter</span>
      </div>
    </div>
  );
}
