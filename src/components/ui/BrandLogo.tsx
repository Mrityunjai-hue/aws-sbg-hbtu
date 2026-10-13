"use client";

import React, { useState } from "react";
import Image from "next/image";

interface BrandLogoProps {
  variant?: "full" | "aws" | "chapter";
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Official Brand Logo Component.
 * In compliance with Rule 6:
 * - Only uses real, official logo assets placed by the user in /public/brand/.
 * - Never draws, generates, or approximates official logos.
 * - Renders a neutral, labelled placeholder box until official assets are supplied.
 */
export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const [hasLogoFile, setHasLogoFile] = useState(false);

  // Height and dimension presets
  const dims = {
    sm: { height: 28, width: 90, boxClass: "h-7 px-2 text-[10px]" },
    md: { height: 36, width: 120, boxClass: "h-9 px-3 text-xs" },
    lg: { height: 48, width: 160, boxClass: "h-12 px-4 text-sm" },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {hasLogoFile ? (
        <Image
          src="/brand/aws-sbg-hbtu-logo.svg"
          alt="AWS Student Builder Group HBTU"
          width={dims.width}
          height={dims.height}
          priority
          className="h-auto w-auto object-contain"
          onError={() => setHasLogoFile(false)}
        />
      ) : (
        <div
          className={`flex items-center justify-center font-mono font-bold tracking-wider rounded-lg border border-outline bg-surface-low text-on-surface-variant/90 uppercase ${dims.boxClass}`}
          title="Official logo pending in /public/brand/"
        >
          <span className="text-primary-accent mr-1 font-black">AWS</span> SBG HBTU
        </div>
      )}
    </div>
  );
}
