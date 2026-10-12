import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface EmptyStatePanelProps {
  title: string;
  description: string;
  badge?: string;
  tag?: string;
  actionLabel?: string;
  actionHref?: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

/**
 * Standard Empty State Panel for new pages.
 * Displays clean "Content coming soon" status with zero invented facts, names, or posts.
 */
export function EmptyStatePanel({
  title,
  description,
  badge,
  tag,
  actionLabel,
  actionHref,
  action,
  className = "",
}: EmptyStatePanelProps) {
  const resolvedBadge = badge || tag || "BUILDER INITIATIVE";
  const resolvedActionLabel = action?.label || actionLabel || "Back to Home";
  const resolvedActionHref = action?.href || actionHref || "/";
  return (
    <div
      className={`relative w-full rounded-2xl border border-outline bg-surface-low/80 p-8 sm:p-12 text-center flex flex-col items-center justify-center overflow-hidden my-8 ${className}`}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 site-dot-pattern"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[90px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, #AD5CFF 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
        <Badge variant="purple" className="mb-4 font-mono">
          {resolvedBadge}
        </Badge>

        <div className="w-14 h-14 rounded-2xl bg-surface-container border border-outline flex items-center justify-center text-primary-accent mb-4 shadow-inner">
          <span className="material-symbols-outlined text-[28px]">construction</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-on-background mb-2">
          {title}
        </h3>

        <p className="text-sm text-on-surface-variant font-sans leading-relaxed mb-6">
          {description}
        </p>

        {resolvedActionLabel && resolvedActionHref && (
          <Button as={Link} href={resolvedActionHref} variant="secondary" size="md">
            {resolvedActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
