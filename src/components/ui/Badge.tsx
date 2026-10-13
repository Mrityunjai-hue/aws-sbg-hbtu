import React from "react";

export type BadgeVariant = "default" | "accent" | "purple" | "aws" | "emerald" | "outline" | "mono";

export type BadgeSize = "sm" | "md" | "lg";

export function Badge({
  className = "",
  variant = "default",
  size = "md",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
}) {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-surface-low text-on-surface-variant border border-outline",
    accent: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    purple: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    aws: "bg-[#FF9900]/15 text-[#FF9900] border border-[#FF9900]/30",
    emerald: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    outline: "bg-transparent text-on-surface-variant border border-outline",
    mono: "font-mono uppercase font-bold tracking-wider bg-surface-low text-on-surface-variant border border-outline",
  };

  const sizes: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg font-semibold select-none leading-none ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
