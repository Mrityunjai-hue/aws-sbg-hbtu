import React from "react";
import Link from "next/link";
import { PROJECTS_DATA } from "@/data/projects";
import { SectionHeader, EmptyStatePanel, Card, Badge, ImagePlaceholder } from "@/components/ui";

export default function ProjectsPage() {
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
        <span className="text-text font-bold">Projects Showcase</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-hairline">
        <SectionHeader
          tag="COMMUNITY SHOWCASE"
          title="Student Projects & Cloud Demos"
          description="Open-source applications, cloud architectures, and machine learning prototypes built by student builders at HBTU Kanpur."
        />

        <div className="shrink-0">
          <a
            href="https://github.com/aws-sbg-hbtu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-aws inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold"
          >
            <span>Submit a Project on GitHub</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {PROJECTS_DATA.length === 0 ? (
        <EmptyStatePanel
          title="Projects Showcase Initializing"
          description="Student builder project submissions for the current cohort are currently in review. Follow our GitHub organization or submit your project repository to be featured."
          badge="PROJECTS INCUBATOR"
          actionLabel="View Organization on GitHub"
          actionHref="https://github.com/aws-sbg-hbtu"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project) => (
            <Card key={project.id} variant="default" className="p-6 space-y-4">
              <ImagePlaceholder
                id={project.imageSlotId || `PROJECT-${project.id}`}
                label={project.title.toUpperCase()}
                aspectRatio="16:9"
              />
              <h3 className="font-bold text-lg text-text">{project.title}</h3>
              <p className="text-xs text-text-muted">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <Badge key={t} size="sm">
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
