import React from "react";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

export function MeetupIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.34 10.04c-.37-.8-1.02-1.43-1.8-1.81-.36-.18-.76-.28-1.17-.3-1.63-.09-2.97.94-3.48 2.37-.22.61-.26 1.28-.12 1.91.13.58.41 1.11.82 1.54.43.44.97.74 1.57.86.36.07.73.07 1.09.01.99-.18 1.83-.81 2.29-1.7.35-.67.44-1.45.26-2.18-.08-.34-.23-.66-.46-.94zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.06 17.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z"/>
    </svg>
  );
}

export function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.55 0 8.24 3.69 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.18 8.18 0 0 1-5.83 2.42c-1.48 0-2.93-.39-4.2-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.216 8.216 0 0 1-1.26-4.38c0-4.55 3.69-8.25 8.24-8.25zm4.52 10.6c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.01 2.59.12.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function TwitterIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function EmailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function GetSocialIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  switch (name.toLowerCase()) {
    case "meetup":
      return <MeetupIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "whatsapp":
    case "whatsapp community":
      return <WhatsAppIcon className={className} />;
    case "instagram":
      return <InstagramIcon className={className} />;
    case "github":
      return <GitHubIcon className={className} />;
    case "x (twitter)":
    case "twitter":
    case "x":
      return <TwitterIcon className={className} />;
    case "email":
    case "email us":
      return <EmailIcon className={className} />;
    default:
      return <span className="material-symbols-outlined text-[20px]">public</span>;
  }
}

/**
 * Clean compact social media icon bar component
 */
export function SocialIconsBar({ className = "" }: { className?: string }) {
  const links = [
    { name: "Meetup", link: SOCIAL_LINKS.meetup, icon: <MeetupIcon className="w-5 h-5" />, hoverBg: "hover:bg-[#ED1C40]/20 hover:text-[#ED1C40]" },
    { name: "LinkedIn", link: SOCIAL_LINKS.linkedin, icon: <LinkedInIcon className="w-5 h-5" />, hoverBg: "hover:bg-[#0A66C2]/20 hover:text-[#0A66C2]" },
    { name: "WhatsApp", link: SOCIAL_LINKS.whatsapp, icon: <WhatsAppIcon className="w-5 h-5" />, hoverBg: "hover:bg-[#25D366]/20 hover:text-[#25D366]" },
    { name: "Instagram", link: SOCIAL_LINKS.instagram, icon: <InstagramIcon className="w-5 h-5" />, hoverBg: "hover:bg-[#E4405F]/20 hover:text-[#E4405F]" },
    { name: "GitHub", link: SOCIAL_LINKS.github, icon: <GitHubIcon className="w-5 h-5" />, hoverBg: "hover:bg-white/20 hover:text-white" },
    { name: "Twitter", link: SOCIAL_LINKS.twitter, icon: <TwitterIcon className="w-5 h-5" />, hoverBg: "hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2]" },
    { name: "Email", link: SOCIAL_LINKS.email, icon: <EmailIcon className="w-5 h-5" />, hoverBg: "hover:bg-amber-500/20 hover:text-amber-400" },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {links.map((item) => (
        <a
          key={item.name}
          href={item.link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${item.name}: ${item.link.description}`}
          aria-label={item.name}
          className={`flex h-10 w-10 items-center justify-center rounded-lg border border-border-hairline bg-bg-card text-text-muted transition-all duration-200 hover:scale-110 shadow-sm ${item.hoverBg}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
