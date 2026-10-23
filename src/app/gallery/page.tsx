import React from "react";
import Link from "next/link";
import { GALLERY_DATA } from "@/data/gallery";
import { SectionHeader, EmptyStatePanel, Card, ImagePlaceholder } from "@/components/ui";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

export default function GalleryPage() {
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
        <span className="text-text font-bold">Photo Gallery</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-hairline">
        <SectionHeader
          tag="CAMPUS MOMENTS"
          title="Community Gallery"
          description="Memories from our hands-on workshops, cloud bootcamps, and student hackathons at Harcourt Butler Technical University Kanpur."
        />

        <div className="shrink-0">
          <a
            href={SOCIAL_LINKS.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold"
          >
            <span>Follow on LinkedIn</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {GALLERY_DATA.length === 0 ? (
        <EmptyStatePanel
          title="Community Photos Archive Coming Soon"
          description="High-resolution event albums from our inaugural workshops and hackathons are currently being curated. Check our official LinkedIn page for behind-the-scenes stories and member spotlights."
          badge="MEDIA ARCHIVE"
          actionLabel="View LinkedIn Spotlights"
          actionHref={SOCIAL_LINKS.linkedin.url}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_DATA.map((item) => (
            <Card key={item.id} variant="default" className="p-4 space-y-3">
              <ImagePlaceholder
                id={item.imageSlotId}
                label={item.title.toUpperCase()}
                aspectRatio="4:3"
              />
              <h3 className="font-bold text-sm text-text">{item.title}</h3>
              <p className="text-xs text-text-muted">{item.caption}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
