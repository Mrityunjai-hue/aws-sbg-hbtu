"use client";

import React from "react";
import Link from "next/link";
import { TeamMember } from "@/lib/services/team";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

interface TeamMemberCardProps {
  member: TeamMember;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  className?: string;
  imageSlotId?: string;
}

export function TeamMemberCard({
  member,
  isAdmin = false,
  onDelete,
  className = "",
  imageSlotId,
}: TeamMemberCardProps) {
  const slotId = imageSlotId || `TEAM-MEMBER-${member.id.slice(0, 6).toUpperCase()}`;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border border-border-hairline bg-surface/80 dark:bg-surface-elevated/50 p-6 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      {/* Top section: Avatar / Placeholder */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border border-border-subtle bg-surface-elevated shrink-0 shadow-sm">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={member.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-mono font-bold text-xl text-accent bg-accent/10">
              {member.initial || member.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-sans font-bold text-lg sm:text-xl text-text truncate group-hover:text-accent transition-colors">
            {member.name}
          </h3>
          <p className="font-mono text-xs text-accent-aws font-semibold tracking-wide uppercase mt-0.5 truncate">
            {member.role}
          </p>
          <div className="mt-2">
            <Badge variant="mono" size="sm">
              Core Team
            </Badge>
          </div>
        </div>
      </div>

      {/* Description / Placeholder note if needed */}
      <div className="flex-1 text-xs text-text-muted leading-relaxed mb-4">
        <span>Active AWS student builder and peer mentor at HBTU Kanpur.</span>
      </div>

      {/* Footer Contact & Admin actions */}
      <div className="pt-4 border-t border-border-hairline/60 flex items-center justify-between gap-3">
        {member.email ? (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text hover:text-accent transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <span>Contact Member</span>
          </a>
        ) : (
          <span className="text-xs font-mono text-text-muted">HBTU Kanpur</span>
        )}

        {isAdmin && (
          <div className="flex items-center gap-1.5">
            <Link
              href={`/admin/edit-team-member/${member.id}`}
              className="p-1.5 rounded-lg border border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              title="Edit member"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
              </svg>
            </Link>
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(member.id)}
                className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                title="Delete member"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
