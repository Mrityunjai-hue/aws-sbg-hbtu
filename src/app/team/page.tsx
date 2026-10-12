"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchTeamMembers, deleteTeamMember, TeamMember } from "@/lib/services/team";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  SectionHeader,
  SkeletonCard,
  EmptyStatePanel,
  Badge,
} from "@/components/ui";
import {
  TeamMemberCard,
  FaqAccordion,
} from "@/components/features";

export default function TeamPage() {
  const { userProfile } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMembers = async () => {
    setLoading(true);
    const members = await fetchTeamMembers();
    setTeamMembers(members);
    setLoading(false);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      const success = await deleteTeamMember(id);
      if (success) {
        setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete team member.");
      }
    }
  };

  const teamFaqs = [
    {
      id: "team-faq-1",
      question: "Who can become a Core Team Member?",
      answer:
        "Any active learner enrolled at Harcourt Butler Technical University Kanpur can apply during our annual recruitment drive. Look out for announcements on our events page and WhatsApp group!",
    },
    {
      id: "team-faq-2",
      question: "What are the roles available in the group?",
      answer:
        "We recruit student leaders for technical leads (Cloud/DevOps/AI), event coordinators, content creators, and community moderators.",
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
        <span className="text-text font-bold">Core Team</span>
      </nav>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-hairline">
        <SectionHeader
          tag="CAMPUS LEADERSHIP"
          title="Meet the Core Team"
          description="Dedicated student volunteers leading the AWS Student Builder Group at HBTU Kanpur — organizing hackathons, mentoring peers, and championing cloud initiatives."
        />

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/join"
            className="btn-3d-aws inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold"
          >
            <span>Join the Team</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          {userProfile?.role === "admin" && (
            <Link
              href="/admin/add-team-member"
              className="btn-3d-secondary inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold"
            >
              <span>+ Add Member</span>
            </Link>
          )}
        </div>
      </div>

      {/* Team Roster Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
            01. Active Core Team Members ({teamMembers.length})
          </h2>
          <Badge variant="mono" size="sm">
            HBTU CHAPTER
          </Badge>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <SkeletonCard
                key={n}
                slotId={`TEAM-SKELETON-0${n}`}
                label="LOADING MEMBER"
                aspectRatio="1:1"
              />
            ))}
          </div>
        ) : teamMembers.length === 0 ? (
          <EmptyStatePanel
            title="Core Team Roster Initializing"
            description="Our leadership directory is being updated for the current academic session. Apply below to join our student organizing team."
            badge="LEADERSHIP ROSTER"
            actionLabel="Apply to Join the Team"
            actionHref="/join"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                isAdmin={userProfile?.role === "admin"}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      {/* Leadership FAQs & About Team */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-6 border-t border-border-hairline">
        <div className="lg:col-span-7 space-y-4">
          <SectionHeader
            tag="STUDENT VOLUNTEERS"
            title="About the Core Team at HBTU"
          />
          <div className="space-y-4 text-sm sm:text-base text-text-muted leading-relaxed">
            <p>
              The AWS Student Builder Group Core Team is responsible for growing the community,
              organizing inspiring events, and championing local initiatives that matter to our
              peers at HBTU Kanpur.
            </p>
            <p>
              Every group is led by dedicated student volunteers who are passionate about bringing
              their ideas to life with support from AWS. Core team members gain hands-on event
              management experience, technical mentorship, and direct collaboration with AWS
              community programs.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <SectionHeader
            tag="RECRUITMENT FAQ"
            title="Leadership FAQs"
          />
          <FaqAccordion
            items={teamFaqs}
            allowMultiple={true}
            defaultExpandedIds={["team-faq-1"]}
          />
        </div>
      </section>
    </div>
  );
}
