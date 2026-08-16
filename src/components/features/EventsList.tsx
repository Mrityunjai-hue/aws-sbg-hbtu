"use client";

import React, { useEffect, useState } from "react";
import { fetchEvents, EventRecord } from "@/lib/services/events";
import { Badge } from "@/components/ui/Badge";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "@/lib/contexts/AuthContext";

export function EventsList({ maxItems }: { maxItems?: number }) {
  const { userProfile } = useAuth();
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      const data = await fetchEvents(maxItems);
      setEvents(data);
      setLoading(false);
    }
    loadEvents();
  }, [maxItems]);

  const formatDate = (date: Date | Timestamp | null) => {
    if (!date) return { month: "TBD", day: "--" };
    
    // Handle Firestore Timestamp
    const jsDate = date instanceof Timestamp ? date.toDate() : new Date(date);
    
    if (isNaN(jsDate.getTime())) return { month: "TBD", day: "--" };

    const month = jsDate.toLocaleString("en-US", { month: "short" });
    const day = jsDate.getDate();
    return { month, day };
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[...Array(maxItems || 3)].map((_, i) => (
          <div key={i} className="h-64 w-full rounded-lg bg-[#141d2f] border border-border-hairline" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-lg border border-border-hairline bg-[#141d2f] p-8 text-center text-text-muted">
        No upcoming events at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map((event) => {
        const { month, day } = formatDate(event.date);

        const targetUrl = event.linkUrl
          ? event.linkUrl.startsWith("http://") || event.linkUrl.startsWith("https://")
            ? event.linkUrl
            : `https://${event.linkUrl}`
          : null;

        const isExpanded = !!expandedIds[event.id];
        const isLongDescription = (event.description?.length || 0) > 150;
        const displayText = isLongDescription && !isExpanded
          ? `${event.description?.slice(0, 150)}...`
          : event.description;

        const buttonText = event.linkText || "Learn more";

        return (
          <div
            key={event.id}
            className="bg-[#141d2f] border border-border-hairline p-6 hover:border-accent/50 transition-colors flex flex-col justify-between rounded-none"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 rounded bg-accent/10 px-2.5 py-0.5 border border-accent/20 text-xs font-semibold text-accent">
                    <span>{month} {day}</span>
                  </div>
                  <Badge variant="accent">{event.type || "Event"}</Badge>
                  {event.time && (
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <span className="material-symbols-outlined text-xs">schedule</span> {event.time}
                    </span>
                  )}
                </div>
                {userProfile?.role === "admin" && (
                  <a
                    href={`/admin/edit-event/${event.id}`}
                    className="rounded px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/50 hover:bg-accent/10 transition-colors shrink-0"
                  >
                    Edit
                  </a>
                )}
              </div>

              <h3 className="font-heading font-bold text-lg mb-3 text-text">
                {event.title}
              </h3>

              {event.description && (
                <div className="mb-6">
                  <p className="text-sm text-text-muted whitespace-pre-line">
                    {displayText}
                  </p>
                  {isLongDescription && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(event.id)}
                      className="mt-2 text-xs font-semibold text-accent hover:underline focus:outline-none"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div>
              {targetUrl ? (
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-text hover:text-accent hover:underline flex items-center gap-1 inline-flex"
                >
                  {buttonText} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              ) : (
                <span className="text-sm font-semibold text-text-muted flex items-center gap-1">
                  {buttonText} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
