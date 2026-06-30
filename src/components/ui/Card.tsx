import React from "react";

export function Card({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-bg-card border-hairline-subtle rounded-soft p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
