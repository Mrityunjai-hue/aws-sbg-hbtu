import React from "react";
import {
  MeetupIcon,
  LinkedInIcon,
  WhatsAppIcon,
  InstagramIcon,
} from "@/components/ui/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

export interface PlatformCardProps {
  index?: string;
  platform: "meetup" | "linkedin" | "whatsapp" | "instagram";
  title?: string;
  description?: string;
  url?: string;
  actionText?: string;
  className?: string;
}

const DEFAULTS = {
  meetup: {
    index: "01",
    title: "Meetup Group",
    description: "RSVP to upcoming cloud workshops, speaker sessions, and community meetups.",
    url: SOCIAL_LINKS.meetup.url,
    actionText: "Join Meetup",
  },
  linkedin: {
    index: "02",
    title: "LinkedIn Company Page",
    description: "Follow official announcements, career opportunities, and member achievements.",
    url: SOCIAL_LINKS.linkedin.url,
    actionText: "Follow LinkedIn",
  },
  whatsapp: {
    index: "03",
    title: "WhatsApp Community",
    description: "Chat directly with members, share quick doubts, and get real-time alerts.",
    url: SOCIAL_LINKS.whatsapp.url,
    actionText: "Join Chat",
  },
  instagram: {
    index: "04",
    title: "Instagram Spotlights",
    description: "Catch behind-the-scenes moments, event reels, student features, and stories.",
    url: SOCIAL_LINKS.instagram.url,
    actionText: "Follow @aws_sbg_hbtu",
  },
};

export function PlatformCard({
  platform,
  index,
  title,
  description,
  url,
  actionText,
  className = "",
}: PlatformCardProps) {
  const meta = DEFAULTS[platform];

  const resolvedIndex = index || meta.index;
  const resolvedTitle = title || meta.title;
  const resolvedDescription = description || meta.description;
  const resolvedUrl = url || meta.url;
  const resolvedAction = actionText || meta.actionText;

  const icons = {
    meetup: <MeetupIcon className="w-5 h-5 text-[#ED1C40]" />,
    linkedin: <LinkedInIcon className="w-5 h-5 text-[#0A66C2]" />,
    whatsapp: <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />,
    instagram: <InstagramIcon className="w-5 h-5 text-[#E4405F]" />,
  };

  const accentColors = {
    meetup: "hover:border-[#ED1C40]/50 hover:shadow-[#ED1C40]/10",
    linkedin: "hover:border-[#0A66C2]/50 hover:shadow-[#0A66C2]/10",
    whatsapp: "hover:border-[#25D366]/50 hover:shadow-[#25D366]/10",
    instagram: "hover:border-[#E4405F]/50 hover:shadow-[#E4405F]/10",
  };

  return (
    <a
      href={resolvedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative rounded-2xl border border-border-hairline bg-surface/80 dark:bg-surface-elevated/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl select-none ${accentColors[platform]} ${className}`}
    >
      <div>
        {/* Top Bar with Number Index & Icon */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs font-bold text-text-muted tracking-widest uppercase">
            {resolvedIndex}
          </span>
          <div className="w-9 h-9 rounded-xl bg-surface-elevated border border-border-hairline flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
            {icons[platform]}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-sans font-bold text-base sm:text-lg text-text mb-2 group-hover:text-accent transition-colors">
          {resolvedTitle}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
          {resolvedDescription}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-border-hairline/60 flex items-center justify-between text-xs font-bold text-text group-hover:text-accent transition-colors">
        <span>{resolvedAction}</span>
        <svg
          className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
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
      </div>
    </a>
  );
}
