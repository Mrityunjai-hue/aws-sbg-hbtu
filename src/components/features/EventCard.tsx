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
    if (!date) return { month: "TBD", day: "--", year: "", jsDate: null };
    const jsDate = date instanceof Timestamp ? date.toDate() : new Date(date);
    if (isNaN(jsDate.getTime())) return { month: "TBD", day: "--", year: "", jsDate: null };

    const month = jsDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = String(jsDate.getDate()).padStart(2, "0");
    const year = String(jsDate.getFullYear());
    return { month, day, year, jsDate };
  };

  const { month, day, year, jsDate } = formatDate(event.date);

  // Dynamic Event Status Calculation
  const now = Date.now();
  const eventTime = jsDate ? jsDate.getTime() : 0;
  const isPast = eventTime > 0 && eventTime < now;
  const isToday =
    jsDate !== null && jsDate.toDateString() === new Date().toDateString();

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

  const defaultButtonText = isPast
    ? "Session Archive"
    : isToday
    ? "Join Live / Details"
    : "RSVP & Details";

  const buttonText = event.linkText || defaultButtonText;
  const slotId = imageSlotId || `EVENT-IMG-${event.id.slice(0, 6).toUpperCase()}`;

  return (
    <article
      className={`group flex flex-col rounded-3xl border ${
        isPast
          ? "border-emerald-500/15 bg-surface-low/60 opacity-85 hover:opacity-100"
          : isToday
          ? "border-emerald-400 bg-surface-low shadow-[0_0_25px_rgba(16,185,129,0.15)] ring-1 ring-emerald-400/40"
          : "border-emerald-500/25 bg-surface-low shadow-lg hover:border-emerald-400/50"
      } overflow-hidden transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      {/* Event Header Banner */}
      <div className="relative w-full overflow-hidden border-b border-emerald-500/20">
        <ImagePlaceholder
          id={slotId}
          label="EVENT COVER BANNER"
          aspectRatio="16:9"
          sublabel={event.title}
          className="border-none rounded-none"
        />

        {/* Date floating badge */}
        <div className="absolute top-3 left-3 flex flex-col items-center justify-center min-w-[54px] px-2.5 py-1.5 rounded-2xl bg-surface-lowest/90 backdrop-blur-md border border-outline shadow-md">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
            {month}
          </span>
          <span className="font-mono text-lg font-black leading-none text-on-background">
            {day}
          </span>
        </div>

        {/* Status & Category Pills */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {isPast ? (
            <span className="px-2.5 py-0.5 rounded-full bg-surface-low/90 text-on-surface-variant border border-outline font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
              COMPLETED SESSION
            </span>
          ) : isToday ? (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-400 border border-emerald-400 font-mono text-[10px] font-black uppercase tracking-wider animate-pulse backdrop-blur-md">
              LIVE TODAY
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
              UPCOMING
            </span>
          )}

          <Badge variant="emerald" size="sm">
            {event.type || "Workshop"}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 justify-between gap-4">
        <div>
          {/* Time & Venue Info */}
          {event.time && (
            <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mb-2.5">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isToday
                    ? "bg-emerald-400 animate-ping"
                    : isPast
                    ? "bg-on-surface-variant/40"
                    : "bg-amber-400 animate-pulse"
                }`}
              />
              <span className="font-semibold text-on-background">{event.time}</span>
              {year && <span className="text-on-surface-variant">• {year}</span>}
            </div>
          )}

          {/* Event Title */}
          <h3 className="font-sans font-bold text-lg sm:text-xl text-on-background leading-snug group-hover:text-primary-accent transition-colors mb-2.5">
            {event.title}
          </h3>

          {/* Event Description */}
          {event.description && (
            <div className="text-sm text-on-surface-variant leading-relaxed">
              <p className="whitespace-pre-line">{displayText}</p>
              {isLongDescription && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-xs font-semibold text-primary-accent hover:underline focus:outline-none"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between gap-3">
          {targetUrl ? (
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isPast
                  ? "px-4 py-2 rounded-xl bg-surface-lowest border border-outline text-on-surface-variant hover:text-on-background hover:border-emerald-500/40 font-mono text-xs font-bold transition-colors inline-flex items-center gap-2"
                  : "btn-3d-aws inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl"
              }`}
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
            <span className="text-xs font-mono text-on-surface-variant">
              {isPast ? "Archived Campus Workshop" : "Details announced soon"}
            </span>
          )}

          {isAdmin && (
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/edit-event/${event.id}`}
                className="px-2.5 py-1.5 rounded-lg border border-primary-accent/40 bg-primary-accent/10 text-xs font-semibold text-primary-accent hover:bg-primary-accent/20 transition-colors"
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
