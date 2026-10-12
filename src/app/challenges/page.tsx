import React from "react";
import Link from "next/link";
import { CHALLENGES_DATA } from "@/data/challenges";
import { SectionHeader, EmptyStatePanel, Card, Badge } from "@/components/ui";

export default function ChallengesPage() {
  return (
    <div className="site-container py-8 sm:py-12 md:py-16 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted">
        <Link href="/" className="hover:text-text transition-colors">
          Home
        </Link>
        <span>/</span>
        <span>Community</span>
        <span>/</span>
        <span className="text-text font-bold">Builder Challenges</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-hairline">
        <SectionHeader
          tag="MONTHLY SPRINTS"
          title="Builder Challenges & Hack Sprints"
          description="Competitive cloud coding sprints designed to sharpen your architectural, debugging, and serverless problem-solving skills."
        />

        <div className="shrink-0">
          <Link
            href="/join"
            className="btn-3d-aws inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold"
          >
            <span>Register for Next Sprint</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {CHALLENGES_DATA.length === 0 ? (
        <EmptyStatePanel
          title="Next Cloud Sprint Challenge Announcing Soon"
          description="Our technical leads are drafting the prompt for the upcoming semester cloud challenge. Sprints test hands-on deployment of Lambda, Bedrock, and DynamoDB."
          badge="SPRINT LAB"
          actionLabel="View Learning Tracks"
          actionHref="/tracks"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHALLENGES_DATA.map((challenge) => (
            <Card key={challenge.id} variant="default" className="p-6 space-y-4">
              <Badge variant="aws" size="sm">
                {challenge.domain}
              </Badge>
              <h3 className="font-bold text-lg text-text">{challenge.title}</h3>
              <p className="text-xs text-text-muted">{challenge.description}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
