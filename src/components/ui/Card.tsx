"use client";

import React, { useRef } from "react";

export type CardVariant = "default" | "interactive" | "terminal" | "elevated" | "floating" | "glass";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Enable 3D perspective tilt on mouse move */
  tilt3d?: boolean;
}

export function Card({
  className = "",
  variant = "default",
  tilt3d = false,
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tilt3d && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      cardRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.015)`;
    }
    onMouseMove?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tilt3d && cardRef.current) {
      cardRef.current.style.transform = "";
    }
    onMouseLeave?.(e);
  };

  const variantStyles: Record<CardVariant, string> = {
    default:
      "bg-surface-low border border-outline rounded-2xl card-pad shadow-sm text-on-background",
    interactive:
      "card-3d card-3d-default rounded-2xl card-pad text-on-background group cursor-pointer",
    terminal:
      "bg-surface-lowest border border-outline rounded-2xl card-pad font-mono text-on-background shadow-inner",
    elevated:
      "card-floating rounded-2xl card-pad text-on-background backdrop-blur-md",
    floating:
      "card-floating rounded-3xl card-pad text-on-background",
    glass:
      "glass-card-emerald rounded-2xl card-pad text-on-background",
  };

  return (
    <div
      ref={cardRef}
      className={`${variantStyles[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.35s ease" }}
      {...props}
    >
      {children}
    </div>
  );
}

