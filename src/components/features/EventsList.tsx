"use client";

import React, { useEffect, useState } from "react";
import { fetchEvents, EventRecord } from "@/lib/services/events";
import { useAuth } from "@/lib/contexts/AuthContext";
import { EventCard } from "@/components/features/EventCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { EmptyStatePanel } from "@/components/ui/EmptyStatePanel";
import { SOCIAL_LINKS } from "@/lib/constants/socials";
import { Timestamp } from "firebase/firestore";

interface EventsListProps {
  maxItems?: number;
  initialFilter?: "all" | "upcoming" | "past";
}

export function EventsList({ maxItems, initialFilter = "all" }: EventsListProps) {
  const { userProfile } = useAuth();
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">(initialFilter);
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

  const now = Date.now();

  const filteredEvents = events.filter((ev) => {
    const evTime =
      ev.date instanceof Timestamp
        ? ev.date.toMillis()
        : new Date(ev.date).getTime();

    if (isNaN(evTime)) return true;

    if (filter === "upcoming") {
      return evTime >= now;
    }
    if (filter === "past") {
      return evTime < now;
    }
    return true;
  });

  const upcomingCount = events.filter((ev) => {
    const t = ev.date instanceof Timestamp ? ev.date.toMillis() : new Date(ev.date).getTime();
    return !isNaN(t) && t >= now;
  }).length;

  const pastCount = events.length - upcomingCount;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(maxItems || 3)].map((_, i) => (
          <SkeletonCard
            key={i}
            slotId={`EVENT-SKELETON-0${i + 1}`}
            label="LOADING EVENT"
            aspectRatio="16:9"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Filter Pills */}
      {!maxItems && events.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-emerald-500/20 pb-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              filter === "all"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                : "bg-surface-low text-on-surface-variant hover:text-on-background border border-outline"
            }`}
          >
            All Campus Sessions ({events.length})
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              filter === "upcoming"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                : "bg-surface-low text-on-surface-variant hover:text-on-background border border-outline"
            }`}
          >
            Upcoming & Live ({upcomingCount})
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              filter === "past"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                : "bg-surface-low text-on-surface-variant hover:text-on-background border border-outline"
            }`}
          >
            Past Workshops ({pastCount})
          </button>
        </div>
      )}

      {filteredEvents.length === 0 ? (
        <EmptyStatePanel
          title={
            filter === "upcoming"
              ? "No Upcoming Events Right Now"
              : filter === "past"
              ? "No Past Sessions Recorded"
              : "No Events Scheduled"
          }
          description="Our chapter team is coordinating hands-on serverless labs and cloud workshops. Join the WhatsApp community to stay notified as soon as registrations open."
          badge="CAMPUS WORKSHOPS"
          actionLabel="Join WhatsApp for Announcements"
          actionHref={SOCIAL_LINKS.whatsapp.url}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isAdmin={userProfile?.role === "admin"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
