"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Timestamp } from "firebase/firestore";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { EventRecord } from "@/lib/services/events";

interface EventCardProps {
  event: EventRecord;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  className?: string;
  imageSlotId?: string;
}

export function EventCard({
  event,
  isAdmin = false,
  onDelete,
  className = "",
  imageSlotId,
}: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: Date | Timestamp | null) => {
    if (!date) return { month: "TBD", day: "--", year: "" };
    const jsDate = date instanceof Timestamp ? date.toDate() : new Date(date);
    if (isNaN(jsDate.getTime())) return { month: "TBD", day: "--", year: "" };

    const month = jsDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = String(jsDate.getDate()).padStart(2, "0");
    const year = String(jsDate.getFullYear());
    return { month, day, year };
  };

  const { month, day, year } = formatDate(event.date);

  const targetUrl = event.linkUrl
    ? event.linkUrl.startsWith("http://") || event.linkUrl.startsWith("https://")
      ? event.linkUrl
      : `https://${event.linkUrl}`
    : null;

  const isLongDescription = (event.description?.length || 0) > 140;
  const displayText =
    isLongDescription && !isExpanded
      ? `${event.description?.slice(0, 140)}...`
      : event.description;

  const buttonText = event.linkText || "RSVP & Details";
  const slotId = imageSlotId || `EVENT-IMG-${event.id.slice(0, 6).toUpperCase()}`;

  return (
    <article
      className={`group flex flex-col rounded-2xl border border-border-hairline bg-surface/80 dark:bg-surface-elevated/50 overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
    >
      {/* Event Header Banner / Placeholder */}
      <div className="relative w-full overflow-hidden border-b border-border-hairline/60">
        <ImagePlaceholder
          id={slotId}
          label="EVENT COVER BANNER"
          aspectRatio="16:9"
          sublabel={event.title}
          className="border-none rounded-none"
        />

        {/* Date floating badge */}
        <div className="absolute top-3 left-3 flex flex-col items-center justify-center min-w-[52px] px-2.5 py-1.5 rounded-xl bg-surface/95 dark:bg-surface-elevated/95 backdrop-blur-md border border-border-subtle shadow-md">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent-aws">
            {month}
          </span>
          <span className="font-mono text-lg font-extrabold leading-none text-text">
            {day}
          </span>
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 right-3">
          <Badge variant="emerald" size="sm">
            {event.type || "Event"}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 justify-between gap-4">
        <div>
          {/* Time & Venue Info */}
          {event.time && (
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-2.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-aws animate-pulse" />
              <span>{event.time}</span>
              {year && <span>• {year}</span>}
            </div>
          )}

          {/* Event Title */}
          <h3 className="font-sans font-bold text-lg sm:text-xl text-text leading-snug group-hover:text-accent transition-colors mb-2.5">
            {event.title}
          </h3>

          {/* Event Description */}
          {event.description && (
            <div className="text-sm text-text-muted leading-relaxed">
              <p className="whitespace-pre-line">{displayText}</p>
              {isLongDescription && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-xs font-semibold text-accent hover:underline focus:outline-none"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-border-hairline/60 flex items-center justify-between gap-3">
          {targetUrl ? (
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-aws inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg"
            >
              <span>{buttonText}</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          ) : (
            <span className="text-xs font-mono text-text-muted">Details announced soon</span>
          )}

          {isAdmin && (
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/edit-event/${event.id}`}
                className="px-2.5 py-1.5 rounded-lg border border-accent/40 bg-accent/10 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors"
                title="Edit event"
              >
                Edit
              </Link>
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(event.id)}
                  className="px-2.5 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
                  title="Delete event"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
