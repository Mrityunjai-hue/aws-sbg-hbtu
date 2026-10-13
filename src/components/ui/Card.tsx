import React from "react";

export type CardVariant = "default" | "interactive" | "terminal" | "elevated";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({
  className = "",
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantStyles: Record<CardVariant, string> = {
    default: "bg-surface-low border border-outline rounded-2xl p-5 shadow-sm text-on-background",
    interactive:
      "bg-surface-low border border-outline hover:border-primary-accent/50 hover:bg-surface-container/60 rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5 text-on-background group",
    terminal:
      "bg-surface-lowest border border-outline rounded-2xl p-6 font-mono text-on-background shadow-inner",
    elevated:
      "bg-surface-low border border-outline rounded-2xl p-6 shadow-xl text-on-background backdrop-blur-md",
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
