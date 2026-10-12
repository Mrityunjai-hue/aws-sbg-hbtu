"use client";

import React, { useState } from "react";

export interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  allowMultiple?: boolean;
  defaultExpandedIds?: string[];
  className?: string;
}

export function FaqAccordion({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  className = "",
}: FaqAccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {items.map((item, index) => {
        const isExpanded = expandedIds.includes(item.id);
        const headerId = `faq-header-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`group rounded-xl border transition-all duration-200 overflow-hidden ${
              isExpanded
                ? "border-accent/40 bg-surface/90 dark:bg-surface-elevated/70 shadow-sm"
                : "border-border-hairline bg-surface/60 dark:bg-surface/40 hover:border-border-subtle hover:bg-surface/80"
            }`}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full text-left font-sans font-semibold text-base sm:text-lg text-text flex items-center justify-between py-4.5 px-5 sm:px-6 gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-accent/70 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.question}</span>
                </span>
                <span
                  className={`h-7 w-7 rounded-lg flex items-center justify-center border text-xs shrink-0 transition-transform duration-300 ${
                    isExpanded
                      ? "border-accent/40 bg-accent/15 text-accent rotate-45"
                      : "border-border-hairline bg-surface-elevated/60 text-text-muted group-hover:text-text rotate-0"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isExpanded}
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? "block" : "hidden"
              }`}
            >
              <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-text-muted leading-relaxed border-t border-border-hairline/50 mt-1">
                {typeof item.answer === "string" ? (
                  <p className="whitespace-pre-line">{item.answer}</p>
                ) : (
                  item.answer
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
