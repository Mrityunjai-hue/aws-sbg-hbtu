import React from "react";

export interface StatItem {
  value: string;
  label: string;
  subtext?: string;
  tag?: string;
}

interface StatBandProps {
  stats?: StatItem[];
  className?: string;
}

const DEFAULT_STATS: StatItem[] = [
  {
    value: "500+",
    label: "Student Builders",
    subtext: "Across engineering disciplines at HBTU",
    tag: "COMMUNITY",
  },
  {
    value: "15+",
    label: "Hands-on Workshops",
    subtext: "Cloud computing & serverless labs",
    tag: "EVENTS",
  },
  {
    value: "4",
    label: "Technical Tracks",
    subtext: "Cloud, DevOps, AI/ML, Security",
    tag: "DOMAINS",
  },
  {
    value: "100%",
    label: "Student-Led",
    subtext: "Peer learning & open source builder group",
    tag: "CAMPUS HUB",
  },
];

export function StatBand({ stats = DEFAULT_STATS, className = "" }: StatBandProps) {
  return (
    <div
      className={`relative rounded-2xl border border-border-hairline bg-surface/80 dark:bg-surface-elevated/40 p-6 sm:p-8 backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Subtle top glowing line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border-hairline/60">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`flex flex-col justify-between ${
              idx > 0 ? "pt-6 sm:pt-0 sm:pl-6 lg:pl-8" : ""
            }`}
          >
            <div>
              {stat.tag && (
                <span className="inline-block font-mono text-[10px] font-bold text-accent tracking-wider uppercase mb-1.5 px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                  {stat.tag}
                </span>
              )}
              <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-text via-text to-accent">
                  {stat.value}
                </span>
              </div>
              <h3 className="font-sans font-bold text-sm sm:text-base text-text mt-1">
                {stat.label}
              </h3>
            </div>
            {stat.subtext && (
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                {stat.subtext}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
