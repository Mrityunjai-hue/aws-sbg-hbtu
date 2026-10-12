"use client";

import React, { useEffect, useState } from "react";
import { fetchEvents, EventRecord } from "@/lib/services/events";
import { useAuth } from "@/lib/contexts/AuthContext";
import { EventCard } from "@/components/features/EventCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { EmptyStatePanel } from "@/components/ui/EmptyStatePanel";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

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

  if (events.length === 0) {
    return (
      <EmptyStatePanel
        title="No Upcoming Events Scheduled"
        description="Our team is planning the next series of cloud workshops and builder sessions. Join our WhatsApp community for instant announcements."
        badge="CAMPUS CALENDAR"
        actionLabel="Join WhatsApp for Alerts"
        actionHref={SOCIAL_LINKS.whatsapp.url}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isAdmin={userProfile?.role === "admin"}
        />
      ))}
    </div>
  );
}
