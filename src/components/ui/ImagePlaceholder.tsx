import React from "react";
import Image from "next/image";

export interface ImagePlaceholderProps {
  id: string;
  label: string;
  sublabel?: string;
  aspectRatio?: "16/9" | "16:9" | "4/3" | "4:3" | "1/1" | "1:1" | "21/9" | "21:9" | "3/2" | "3:2";
  width?: number;
  height?: number;
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Standardized Image Slot Component.
 * Per Image Placeholder Rules:
 * - Maintains exact reference aspect ratios and responsive dimensions.
 * - Displays a visible, neutral label (e.g. "HERO-01 · 16:9 · 1600x900").
 * - Never loads AI or stock images.
 * - Swapping to a real image is a simple prop addition: src="/path/to/image.jpg".
 */
export function ImagePlaceholder({
  id,
  label,
  sublabel,
  aspectRatio = "16/9",
  width,
  height,
  src,
  alt = "Placeholder image",
  priority = false,
  className = "",
}: ImagePlaceholderProps) {
  const normalizedAspect = (aspectRatio.replace(":", "/") as "16/9" | "4/3" | "1/1" | "21/9" | "3/2");

  const aspectClass = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "21/9": "aspect-[21/9]",
    "3/2": "aspect-[3/2]",
  }[normalizedAspect] || "aspect-[16/9]";

  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-surface-low border border-outline ${aspectClass} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      id={id}
      data-placeholder-id={id}
      className={`relative overflow-hidden rounded-2xl bg-surface-low/80 border border-outline flex flex-col items-center justify-center p-4 text-center select-none group/img ${aspectClass} ${className}`}
      title={`Image Slot: ${id} (${label})`}
    >
      {/* Subtle blueprint / technical grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 site-dot-pattern" aria-hidden="true" />
      <div className="absolute inset-0 border border-dashed border-outline/60 rounded-2xl pointer-events-none m-2" aria-hidden="true" />

      {/* Visible Slot ID Badge */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container/90 border border-outline text-on-surface-variant shadow-sm max-w-[90%]">
        <span className="material-symbols-outlined text-[20px] text-primary-accent">
          photo_camera
        </span>
        <span className="font-mono text-[11px] font-bold tracking-wider text-on-background uppercase break-all">
          {id}
        </span>
        <span className="font-mono text-[10px] text-on-surface-variant/80">
          {label}
        </span>
        {sublabel && (
          <span className="text-[10px] text-text-muted/70 truncate max-w-[200px]">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
