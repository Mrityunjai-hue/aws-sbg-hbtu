import React from "react";

export interface SkeletonCardProps {
  id?: string;
  slotId?: string;
  label?: string;
  aspectRatio?: "16/9" | "16:9" | "4/3" | "4:3" | "1/1" | "1:1";
  lines?: number;
  className?: string;
}

/**
 * Standard Skeleton Card labelled PLACEHOLDER-01, -02 per prompt rules.
 */
export function SkeletonCard({
  id,
  slotId,
  label,
  aspectRatio = "16/9",
  lines = 2,
  className = "",
}: SkeletonCardProps) {
  const displayId = id || slotId || "PLACEHOLDER-01";
  const normalizedAspect = (aspectRatio.replace(":", "/") as "16/9" | "4/3" | "1/1");
  const aspectClass = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
  }[normalizedAspect] || "aspect-[16/9]";

  return (
    <div
      className={`rounded-2xl border border-outline bg-surface-low p-4 flex flex-col gap-3 relative overflow-hidden select-none ${className}`}
    >
      {/* Media Skeleton Area */}
      <div
        className={`w-full rounded-xl bg-surface-container/60 border border-outline/50 flex items-center justify-center relative overflow-hidden ${aspectClass}`}
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 z-10">
          {displayId}{label ? ` · ${label}` : ""}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
      </div>

      {/* Text Line Skeletons */}
      <div className="space-y-2 py-1">
        <div className="h-4 w-3/4 bg-surface-container rounded-md" />
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-3 bg-surface-container/60 rounded-md ${
              i === lines - 1 ? "w-1/2" : "w-full"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
