"use client";

import React, { useState, useCallback } from "react";

// Subtle, realistic mechanical switch click sound (Cherry MX Brown / tactile switch)
function playTactileClick() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;
    // Fast tactile click actuation
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.018);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.022);
  } catch {
    // Non-blocking fallback
  }
}

interface KeycapProps {
  char: string;
  variant: "amber" | "emerald";
}

function Keycap({ char, variant }: KeycapProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = useCallback(() => {
    setIsPressed(true);
    playTactileClick();
    setTimeout(() => setIsPressed(false), 120);
  }, []);

  const isAmber = variant === "amber";

  return (
    <button
      type="button"
      aria-label={`Key ${char}`}
      onClick={handlePress}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handlePress();
        }
      }}
      className={`
        relative select-none flex flex-col items-center justify-center
        /* Straight, perfectly proportioned mechanical keycap geometry */
        w-[1.95rem] h-[2.5rem]
        xs:w-[2.2rem] xs:h-[2.8rem]
        sm:w-[2.65rem] sm:h-[3.35rem]
        md:w-[3.1rem] md:h-[3.85rem]
        rounded-md sm:rounded-lg
        font-mono font-bold
        cursor-pointer focus:outline-none
        transition-all duration-75 ease-out

        /* 3D Mechanical switch press state */
        ${isPressed ? "translate-y-[3px]" : "translate-y-0 hover:-translate-y-0.5 active:translate-y-[3px]"}

        /* Theme-aware luxury mechanical keycap styling */
        ${
          isAmber
            ? `
              /* Dark mode: Obsidian + Amber accent */
              bg-gradient-to-b from-[#241d12] to-[#120e07]
              border border-amber-500/40
              text-amber-300
              shadow-[0_4px_0_0_#0a0804,0_6px_14px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(251,191,36,0.35)]
              hover:border-amber-400
              hover:shadow-[0_5px_0_0_#0a0804,0_8px_18px_rgba(245,158,11,0.25),inset_0_1px_0_0_rgba(251,191,36,0.5)]
              active:shadow-[0_1px_0_0_#0a0804,0_2px_4px_rgba(0,0,0,0.4)]

              /* Light mode: Clean slate/chalk + Amber */
              [html.light_&]:bg-gradient-to-b [html.light_&]:from-[#fffbeb] [html.light_&]:to-[#fef3c7]
              [html.light_&]:border-amber-400/60
              [html.light_&]:text-amber-800
              [html.light_&]:shadow-[0_4px_0_0_#d97706,0_6px_12px_rgba(217,119,6,0.2),inset_0_1px_0_0_rgba(255,255,255,0.9)]
              [html.light_&]:hover:shadow-[0_5px_0_0_#b45309,0_8px_16px_rgba(217,119,6,0.3),inset_0_1px_0_0_rgba(255,255,255,1)]
              [html.light_&]:active:shadow-[0_1px_0_0_#d97706]
            `
            : `
              /* Dark mode: Forest obsidian + Emerald accent */
              bg-gradient-to-b from-[#15261c] to-[#0c1610]
              border border-emerald-500/40
              text-emerald-300
              shadow-[0_4px_0_0_#050e08,0_6px_14px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(52,211,153,0.35)]
              hover:border-emerald-400
              hover:shadow-[0_5px_0_0_#050e08,0_8px_18px_rgba(16,185,129,0.25),inset_0_1px_0_0_rgba(52,211,153,0.5)]
              active:shadow-[0_1px_0_0_#050e08,0_2px_4px_rgba(0,0,0,0.4)]

              /* Light mode: Clean slate/chalk + Emerald */
              [html.light_&]:bg-gradient-to-b [html.light_&]:from-[#ecfdf5] [html.light_&]:to-[#d1fae5]
              [html.light_&]:border-emerald-400/60
              [html.light_&]:text-emerald-800
              [html.light_&]:shadow-[0_4px_0_0_#059669,0_6px_12px_rgba(5,150,105,0.2),inset_0_1px_0_0_rgba(255,255,255,0.9)]
              [html.light_&]:hover:shadow-[0_5px_0_0_#047857,0_8px_16px_rgba(5,150,105,0.3),inset_0_1px_0_0_rgba(255,255,255,1)]
              [html.light_&]:active:shadow-[0_1px_0_0_#059669]
            `
        }
      `}
    >
      {/* Keycap curved dish reflection (cylindrical keycap scoop) */}
      <span
        className="pointer-events-none absolute inset-x-1.5 top-1 h-[2px] rounded-full bg-white/30 blur-[0.3px]"
        aria-hidden="true"
      />

      {/* Main Legend: crisp, centered, straight */}
      <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-black tracking-normal leading-none">
        {char}
      </span>
    </button>
  );
}

const YOUR_LETTERS = ["Y", "O", "U", "R"];
const COMMUNITY_LETTERS = ["C", "O", "M", "M", "U", "N", "I", "T", "Y"];

export function MechanicalKeycapHero({ className = "" }: { className?: string }) {
  return (
    <div
      role="group"
      aria-label="YOUR COMMUNITY"
      className={`flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 py-1 max-w-full ${className}`}
    >
      {/* Word 1: YOUR (Amber/Gold Keycaps) - Straight aligned */}
      <div
        className="inline-flex items-center gap-1 sm:gap-1.5 flex-nowrap shrink-0"
        aria-label="YOUR"
      >
        {YOUR_LETTERS.map((char, idx) => (
          <Keycap key={`your-${char}-${idx}`} char={char} variant="amber" />
        ))}
      </div>

      {/* Word 2: COMMUNITY (Emerald Green Keycaps) - Straight aligned */}
      <div
        className="inline-flex items-center gap-0.5 xs:gap-1 sm:gap-1.5 flex-nowrap shrink-0 max-w-full"
        aria-label="COMMUNITY"
      >
        {COMMUNITY_LETTERS.map((char, idx) => (
          <Keycap key={`comm-${char}-${idx}`} char={char} variant="emerald" />
        ))}
      </div>
    </div>
  );
}

export default MechanicalKeycapHero;
