import React from "react";

export function Badge({
  className = "",
  variant = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "accent" }) {
  const variants = {
    default: "bg-bg-card text-text-muted border-hairline-subtle",
    accent: "bg-accent/10 text-accent border border-accent/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
