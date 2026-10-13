"use client";

import React from "react";
import Link from "next/link";
import { EventsList } from "@/components/features/EventsList";
import { SectionHeader, Card, Badge } from "@/components/ui";
import { useAuth } from "@/lib/contexts/AuthContext";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

export default function EventsPage() {
  const { userProfile } = useAuth();

  const eventPillars = [
    {
      tag: "CAMPUS LABS",
      title: "AWS Student Builder Events",
      description:
        "Student-led events on campus that offer ways to explore cloud technology, build innovative projects, and grow your technical career.",
      linkText: "Join HBTU WhatsApp Community",
      href: SOCIAL_LINKS.whatsapp.url,
      external: true,
    },
    {
      tag: "COMMUNITY SESSIONS",
      title: "AWS User Group Events",
      description:
        "Technical sessions and workshops for builders to learn about AWS services and best practices from certified AWS Partners and architects.",
      linkText: "View on Meetup Group",
      href: SOCIAL_LINKS.meetup.url,
      external: true,
    },
    {
      tag: "BUILDER SHOWCASE",
      title: "Hackathons & Build Jams",
      description:
        "Collaborative coding sprints where teams build and ship full-stack prototypes powered by serverless and AI services.",
      linkText: "Submit Project or Pitch",
      href: "/join",
      external: false,
    },
  ];

  return (
    <div className="site-container py-8 sm:py-12 md:py-16 space-y-12 sm:space-y-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted">
        <Link href="/" className="hover:text-text transition-colors">
          Home
        </Link>
        <span>/</span>
        <span>Community</span>
        <span>/</span>
        <span className="text-text font-bold">Events</span>
      </nav>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-hairline">
        <SectionHeader
          tag="CAMPUS CALENDAR"
          title="Community Events & Workshops"
          description="Mark your calendars, meet fellow student cloud builders, and grow your engineering network at Harcourt Butler Technical University Kanpur."
        />

        {userProfile?.role === "admin" && (
          <div className="shrink-0">
            <Link
              href="/admin/create-event"
              className="btn-3d-aws inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold"
            >
              <span>+ Create Event</span>
            </Link>
          </div>
        )}
      </div>

      {/* Event Formats / Pillars */}
      <section className="space-y-6">
        <h2 className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
          01. Event Formats & Tracks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventPillars.map((pillar) => (
            <Card
              key={pillar.title}
              variant="interactive"
              className="p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <Badge variant="emerald" size="sm" className="mb-3 font-mono">
                  {pillar.tag}
                </Badge>
                <h3 className="font-sans font-bold text-lg text-text mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border-hairline/60">
                {pillar.external ? (
                  <a
                    href={pillar.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-text hover:text-accent transition-colors"
                  >
                    <span>{pillar.linkText}</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-text hover:text-accent transition-colors"
                  >
                    <span>{pillar.linkText}</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Live Firestore Events Feed */}
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <SectionHeader
            tag="SCHEDULE"
            title="HBTU Upcoming Events"
            description="Live feed of workshops and study jams organized by our chapter."
          />
        </div>

        <EventsList />
      </section>

      {/* RSVP Notification Banner */}
      <div className="p-8 rounded-2xl border border-border-hairline bg-surface/80 text-center max-w-2xl mx-auto space-y-3">
        <h3 className="font-sans text-lg sm:text-xl font-bold text-text">
          Never Miss a Workshop Announcement
        </h3>
        <p className="text-xs sm:text-sm text-text-muted">
          Our Meetup group and WhatsApp community send calendar invites and updates 48 hours before
          every session.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <a
            href={SOCIAL_LINKS.meetup.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-aws inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold"
          >
            <span>RSVP on Meetup</span>
          </a>
        </div>
      </div>
    </div>
  );
}
