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
      <div className="flex animate-pulse flex-col gap-4">
        {[...Array(maxItems || 2)].map((_, i) => (
          <div key={i} className="h-24 w-full rounded-lg bg-bg-card" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-lg border border-border-hairline bg-bg p-8 text-center text-text-muted">
        No upcoming events at the moment.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => {
        const { month, day } = formatDate(event.date);

        return (
          <div
            key={event.id}
            className="flex cursor-pointer flex-col items-start justify-between rounded-lg border border-border-hairline bg-bg p-6 transition-colors hover:bg-bg-card md:flex-row md:items-center"
          >
            <div className="flex items-center gap-6">
              <div className="flex min-w-[80px] flex-col items-center rounded border border-border-hairline bg-bg-card px-4 py-2">
                <span className="text-xs font-medium uppercase tracking-widest text-accent">{month}</span>
                <span className="font-heading text-3xl font-bold text-text">{day}</span>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-3">
                  <Badge variant="accent">{event.type || "Event"}</Badge>
                  <span className="flex items-center gap-1 text-sm text-text-muted">
                    <span className="material-symbols-outlined text-sm">schedule</span> {event.time}
                  </span>
                </div>
                <h4 className="font-heading text-xl font-semibold text-text">{event.title}</h4>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-end gap-2 md:mt-0">
              {userProfile?.role === "admin" && (
                <a
                  href={`/admin/edit-event/${event.id}`}
                  className="rounded px-3 py-1 text-xs font-semibold text-accent border border-accent/50 hover:bg-accent/10 transition-colors"
                >
                  Edit
                </a>
              )}
              <span className="material-symbols-outlined text-text-muted">chevron_right</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
