import React from "react";
import Link from "next/link";
import { SectionHeader, Card, Badge } from "@/components/ui";
import { SOCIAL_LINKS } from "@/lib/constants/socials";
import { PlatformCard } from "@/components/features";

export default function ContactPage() {
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
        <span className="text-text font-bold">Contact Us</span>
      </nav>

      <div className="border-b border-border-hairline pb-6">
        <SectionHeader
          tag="GET IN TOUCH"
          title="Contact AWS SBG HBTU Kanpur"
          description="Have questions about student memberships, workshops, or partnership opportunities? Reach out to the student organizing team."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Email & Inboxes */}
        <Card variant="interactive" className="p-6 sm:p-8 space-y-4">
          <Badge variant="purple" size="sm">
            DIRECT INBOX
          </Badge>
          <h2 className="font-sans font-bold text-xl text-text">Official Email</h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            For general inquiries, campus speaker invitations, or event partnerships:
          </p>
          <div className="pt-2">
            <a
              href="mailto:aws.sbghbtu@gmail.com"
              className="inline-flex items-center gap-2 font-mono text-base font-bold text-accent hover:underline"
            >
              <span>aws.sbghbtu@gmail.com</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </Card>

        {/* Physical Campus Location */}
        <Card variant="interactive" className="p-6 sm:p-8 space-y-4">
          <Badge variant="aws" size="sm">
            CAMPUS CHAPTER
          </Badge>
          <h2 className="font-sans font-bold text-xl text-text">Campus Location</h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            Harcourt Butler Technical University (HBTU)
            <br />
            Nawabganj, Kanpur, Uttar Pradesh 208002, India
          </p>
          <div className="pt-2 font-mono text-xs text-text-muted">
            Department of Computer Science & Engineering Hub
          </div>
        </Card>
      </div>

      {/* Social Platforms */}
      <section className="space-y-6">
        <h2 className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
          Connect Across Our Channels
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PlatformCard platform="meetup" />
          <PlatformCard platform="linkedin" />
          <PlatformCard platform="whatsapp" />
          <PlatformCard platform="instagram" />
        </div>
      </section>
    </div>
  );
}
