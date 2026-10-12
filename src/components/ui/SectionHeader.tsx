import React from "react";

export interface SectionHeaderProps {
  tag?: string;
  title: string;
  highlightWord?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  tag,
  title,
  highlightWord,
  description,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 sm:mb-14 ${centered ? "text-center mx-auto max-w-3xl" : "max-w-2xl"} ${className}`}>
      {tag && (
        <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-accent mb-2 sm:mb-3">
          {tag}
        </p>
      )}

      <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-on-background leading-tight mb-3 sm:mb-4">
        {highlightWord ? (
          <>
            {title.replace(highlightWord, "")}
            <span className="relative inline-block px-2 sm:px-3 mx-1 text-white rounded-lg bg-primary-accent shadow-md">
              {highlightWord}
            </span>
          </>
        ) : (
          title
        )}
      </h2>

      {description && (
        <p className="text-sm sm:text-base text-on-surface-variant font-sans leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
