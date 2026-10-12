"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  Badge,
  Input,
  BrandLogo,
  ImagePlaceholder,
  EmptyStatePanel,
  SkeletonCard,
  SectionHeader,
} from "@/components/ui";
import {
  PlatformCard,
  FaqAccordion,
  EventCard,
  TeamMemberCard,
  StatBand,
  Tabs,
} from "@/components/features";
import { Timestamp } from "firebase/firestore";

export default function StyleGuidePage() {
  const [activeTab, setActiveTab] = useState("all");

  const sampleEvent = {
    id: "sample-event-01",
    title: "AWS Cloud Foundations & Serverless Architectures",
    date: Timestamp.fromDate(new Date("2026-11-15T10:00:00")),
    type: "Workshop",
    time: "10:00 AM IST",
    description:
      "Deep dive into AWS core services: IAM policies, Amazon S3 storage classes, AWS Lambda serverless handlers, and DynamoDB single-table design.",
    linkUrl: "https://www.meetup.com/aws-student-builder-group-hbtu/",
    linkText: "RSVP on Meetup",
  };

  const sampleMember = {
    id: "sample-member-01",
    name: "HBTU Student Lead",
    role: "Community Organizer",
    email: "lead@aws-sbg-hbtu.org",
    initial: "H",
    createdAt: Timestamp.now(),
  };

  const sampleFaqs = [
    {
      id: "faq-1",
      question: "Who can join the AWS Student Builder Group at HBTU?",
      answer:
        "Any enrolled student at Harcourt Butler Technical University Kanpur with an interest in cloud computing, DevOps, or building web applications can join.",
    },
    {
      id: "faq-2",
      question: "Are workshops free for all students?",
      answer:
        "Yes, all technical workshops, study jams, and cloud certifications study groups organized by the group are 100% free.",
    },
  ];

  return (
    <div className="site-container py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-border-hairline pb-8">
        <SectionHeader
          tag="DESIGN SYSTEM"
          title="AWS SBG HBTU Component Library"
          description="Tactile 3D buttons, obsidian surfaces, labelled image slots, and accessible community feature components."
        />
      </div>

      {/* Brand & Identity */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          01. Brand & Logos
        </h2>
        <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-surface/60 border border-border-hairline">
          <div>
            <p className="font-mono text-xs text-text-muted mb-2">Neutral Labelled Brand Logo</p>
            <BrandLogo />
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          02. Tactile 3D Buttons
        </h2>
        <div className="flex flex-wrap gap-4 items-center p-6 rounded-2xl bg-surface/60 border border-border-hairline">
          <Button variant="primary">Primary (Purple 3D)</Button>
          <Button variant="aws">AWS Builder (Amber 3D)</Button>
          <Button variant="secondary">Secondary Dark</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          03. Semantic Badges
        </h2>
        <div className="flex flex-wrap gap-3 items-center p-6 rounded-2xl bg-surface/60 border border-border-hairline">
          <Badge variant="purple">Electric Purple</Badge>
          <Badge variant="aws">AWS Orange</Badge>
          <Badge variant="emerald">Active / Verified</Badge>
          <Badge variant="mono">Terminal Tag</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="default">Default Surface</Badge>
          <Badge variant="purple" size="sm">Small</Badge>
          <Badge variant="purple" size="lg">Large</Badge>
        </div>
      </section>

      {/* Tabs */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          04. Segmented Tabs
        </h2>
        <div className="p-6 rounded-2xl bg-surface/60 border border-border-hairline">
          <Tabs
            tabs={[
              { id: "all", label: "All Items", count: 12 },
              { id: "cloud", label: "Cloud & Serverless", count: 5 },
              { id: "devops", label: "DevOps & CI/CD", count: 4 },
              { id: "aiml", label: "AI/ML", count: 3 },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </section>

      {/* Stat Band */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          05. Metric Stat Band
        </h2>
        <StatBand />
      </section>

      {/* Cards */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          06. Cards & Surfaces
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <h3 className="font-bold text-lg mb-2">Default Card</h3>
            <p className="text-sm text-text-muted">Standard surface with subtle hairline border.</p>
          </Card>
          <Card variant="interactive">
            <h3 className="font-bold text-lg mb-2">Interactive Card</h3>
            <p className="text-sm text-text-muted">Hover micro-interaction with accent glow.</p>
          </Card>
          <Card variant="terminal">
            <div className="font-mono text-xs text-accent mb-2">SYSTEM_STATUS: ACTIVE</div>
            <p className="text-xs text-text-muted font-mono">$ aws s3 ls sbg-hbtu-artifacts</p>
          </Card>
        </div>
      </section>

      {/* Image Placeholders */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          07. Labelled Image Slots
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ImagePlaceholder
            id="HERO-SLOT-01"
            label="HERO BANNER"
            aspectRatio="16:9"
            sublabel="HBTU Campus"
          />
          <ImagePlaceholder
            id="PHOTO-SLOT-01"
            label="WORKSHOP SCENE"
            aspectRatio="4:3"
            sublabel="Auditorium Lab"
          />
          <ImagePlaceholder
            id="AVATAR-SLOT-01"
            label="MEMBER AVATAR"
            aspectRatio="1:1"
            sublabel="Core Team"
          />
        </div>
      </section>

      {/* Platform Card */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          08. Platform Cards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PlatformCard platform="meetup" />
          <PlatformCard platform="linkedin" />
          <PlatformCard platform="whatsapp" />
          <PlatformCard platform="instagram" />
        </div>
      </section>

      {/* Event Card & Team Member Card */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          09. Feature Components (Events & Team)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-sans font-bold text-base mb-4 text-text-muted">Event Card</h3>
            <EventCard event={sampleEvent} />
          </div>
          <div>
            <h3 className="font-sans font-bold text-base mb-4 text-text-muted">Team Member Card</h3>
            <TeamMemberCard member={sampleMember} />
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          10. FAQ Accordion
        </h2>
        <FaqAccordion items={sampleFaqs} />
      </section>

      {/* Skeletons & Empty States */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent font-bold">
          11. Empty States & Skeletons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SkeletonCard slotId="EVENT-SKELETON-01" label="UPCOMING WORKSHOP" />
          <EmptyStatePanel
            title="Projects Showcase Initializing"
            description="Student builder project submissions will appear here once reviewed."
            tag="PLACEHOLDER"
            action={{
              label: "Submit Project on GitHub",
              href: "https://github.com",
            }}
          />
        </div>
      </section>
    </div>
  );
}
