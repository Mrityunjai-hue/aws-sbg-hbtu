import React from "react";
import Link from "next/link";
import { BLOG_POSTS_DATA } from "@/data/blog";
import { SectionHeader, EmptyStatePanel, Card, Badge } from "@/components/ui";

export default function BlogPage() {
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
        <span className="text-text font-bold">Tech Blog</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-hairline">
        <SectionHeader
          tag="TECHNICAL ARTICLES"
          title="Builder Blog & Tutorials"
          description="Architecture breakdowns, AWS certifications study tips, and engineering deep-dives authored by students at HBTU Kanpur."
        />

        <div className="shrink-0">
          <Link
            href="/join"
            className="btn-3d-aws inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold"
          >
            <span>Write for the Blog</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {BLOG_POSTS_DATA.length === 0 ? (
        <EmptyStatePanel
          title="Articles & Tutorials in Editorial Review"
          description="Technical write-ups authored by our student speakers and track leads are being edited. Check back soon for cloud architecture guides and study jam recaps."
          badge="KNOWLEDGE HUB"
          actionLabel="Explore Learning Tracks"
          actionHref="/tracks"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS_DATA.map((post) => (
            <Card key={post.id} variant="interactive" className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                <span>{post.publishedAt}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-bold text-lg text-text">{post.title}</h3>
              <p className="text-xs text-text-muted">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border-hairline text-xs">
                <span className="font-semibold text-text">{post.author}</span>
                <span className="text-accent font-bold">Read Article →</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
