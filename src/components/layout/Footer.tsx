"use client";

import React from "react";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants/socials";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  MeetupIcon,
  LinkedInIcon,
  WhatsAppIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";

/**
 * Global Footer Component.
 * Exactly replicates the reference site's 3-zone architecture:
 * 1. Top CTA Band (Chapter tag + "Build. Ship. Repeat." + Join CTA)
 * 2. 5-Column Navigation & Connect Matrix with real HBTU URLs
 * 3. Bottom Legal & Copyright Bar
 */
export function Footer() {
  return (
    <footer className="relative z-10 font-mono overflow-hidden bg-surface-lowest border-t border-outline mt-20">
      {/* Top Gradient Highlight Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-accent/50 to-transparent" />

      {/* Atmospheric Dot-Pattern and Glow Overlay */}
      <div className="site-dot-pattern absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[280px] rounded-full pointer-events-none blur-[100px]"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 site-container">
        {/* Zone 1: Top CTA Band */}
        <div className="py-8 sm:py-12 border-b border-outline flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-accent mb-1.5 break-words">
              AWS Student Builder Group · HBTU Kanpur Chapter
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-background leading-tight uppercase tracking-tight">
              Build. Ship. Repeat.
            </h2>
          </div>
          <Link
            href="/join"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 btn-3d-aws text-black text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0"
          >
            Join the Community →
          </Link>
        </div>

        {/* Zone 2: Main 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 py-10 sm:py-12 border-b border-outline">
          {/* Column 1: Brand & Chapter Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <BrandLogo size="md" />
            </Link>
            <p className="text-on-surface-variant text-[11px] leading-relaxed max-w-xs font-sans">
              Empowering the next generation of builders at Harcourt Butler Technical University Kanpur — exploring cloud technology and shipping real production software.
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href={SOCIAL_LINKS.meetup.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Meetup"
                className="p-2 bg-surface-low border border-outline rounded-lg hover:border-primary-accent text-on-surface-variant hover:text-[#ED1C40] transition-colors"
              >
                <MeetupIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 bg-surface-low border border-outline rounded-lg hover:border-primary-accent text-on-surface-variant hover:text-[#0A66C2] transition-colors"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Community"
                className="p-2 bg-surface-low border border-outline rounded-lg hover:border-primary-accent text-on-surface-variant hover:text-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="p-2 bg-surface-low border border-outline rounded-lg hover:border-primary-accent text-on-surface-variant hover:text-[#1DA1F2] transition-colors"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Part 1) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-background">Explore</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-on-surface-variant hover:text-primary-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/tracks" className="text-on-surface-variant hover:text-primary-accent transition-colors">
                  Technical Tracks
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-on-surface-variant hover:text-primary-accent transition-colors">
                  Events & Workshops
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-on-surface-variant hover:text-primary-accent transition-colors">
                  Core Team
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-on-surface-variant hover:text-primary-accent transition-colors">
                  Join the Group
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links (Part 2 - Community) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-background">Community</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/projects" className="text-on-surface-variant hover:text-primary-accent transition-colors">
                  Projects Showcase
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="text-on-surface-variant hover:text-primary-accent transition-colors">
                  Challenges & Sprints
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-on-surface-variant hover:text-primary-accent transition-colors">
                  Tech Blog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-on-surface-variant hover:text-primary-accent transition-colors">
                  Community Gallery
                </Link>
              </li>
              <li>
                <Link href="/code-of-conduct" className="text-on-surface-variant hover:text-primary-accent transition-colors">
                  Code of Conduct
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect With Us */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-background">Connect</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={SOCIAL_LINKS.meetup.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-[#ED1C40] transition-colors flex items-center gap-1.5"
                >
                  <MeetupIcon className="w-3.5 h-3.5 text-[#ED1C40]" />
                  <span>Meetup Group</span>
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Community</span>
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-[#0A66C2] transition-colors flex items-center gap-1.5"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>LinkedIn Page</span>
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.twitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-[#1DA1F2] transition-colors flex items-center gap-1.5"
                >
                  <TwitterIcon className="w-3.5 h-3.5 text-[#1DA1F2]" />
                  <span>X (Twitter)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Official Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-background">Official Inboxes</h3>
            <div className="space-y-1">
              <a
                href={SOCIAL_LINKS.email.url}
                className="text-on-surface-variant text-[11px] hover:text-primary-accent transition-colors block break-all font-mono"
              >
                aws.sbghbtu@gmail.com
              </a>
            </div>
            <div className="pt-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-on-background mb-1">Campus Location</h4>
              <p className="text-on-surface-variant text-[11px] leading-relaxed font-sans">
                Harcourt Butler Technical University,<br />
                Nawabganj, Kanpur,<br />
                Uttar Pradesh 208002, India
              </p>
            </div>
          </div>
        </div>

        {/* Zone 3: Bottom Legal & Copyright Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-on-surface-variant">
          <div>
            © {new Date().getFullYear()} AWS Student Builder Group, HBTU Kanpur. Built for Builders.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/code-of-conduct" className="hover:text-primary-accent transition-colors">
              Code of Conduct
            </Link>
            <a
              href="https://aws.amazon.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-accent transition-colors"
            >
              Privacy
            </a>
            <a
              href="https://aws.amazon.com/events/terms/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-accent transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
