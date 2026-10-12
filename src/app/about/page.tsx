import React from "react";
import Link from "next/link";
import {
  SectionHeader,
  ImagePlaceholder,
  Badge,
  Card,
} from "@/components/ui";

export default function AboutPage() {
  const pillars = [
    {
      tag: "EXPLORE",
      title: "Cloud Technologies",
      description:
        "Hands-on immersion with foundational AWS services: EC2, S3, Lambda, DynamoDB, VPC, and CloudWatch.",
    },
    {
      tag: "BUILD",
      title: "Real Projects",
      description:
        "Collaborate on open-source codebases, serverless web applications, and campus-focused software solutions.",
    },
    {
      tag: "CONNECT",
      title: "Industry Mentorship",
      description:
        "Regular speaker sessions, career guidance from AWS community builders, and alumni networking.",
    },
    {
      tag: "CERTIFY",
      title: "AWS Certifications",
      description:
        "Peer study jams for AWS Certified Cloud Practitioner and Solutions Architect Associate examinations.",
    },
  ];

  return (
    <div className="site-container py-8 sm:py-12 md:py-16 space-y-16 sm:space-y-24">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted">
        <Link href="/" className="hover:text-text transition-colors">
          Home
        </Link>
        <span>/</span>
        <span>Community</span>
        <span>/</span>
        <span className="text-text font-bold">About Us</span>
      </nav>

      {/* Hero Header */}
      <section className="space-y-6">
        <SectionHeader
          tag="COMMUNITY OVERVIEW"
          title="Empowering Student Builders at HBTU Kanpur"
          description="We are the AWS Student Builder Group at Harcourt Butler Technical University Kanpur, inspiring students to explore cloud computing, build production applications, and shape technology leadership."
        />

        {/* Media Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="relative rounded-2xl overflow-hidden border border-border-hairline shadow-lg bg-surface/80">
            <ImagePlaceholder
              id="ABOUT-CAMPUS-01"
              label="HBTU CAMPUS & LABS"
              aspectRatio="16:9"
              sublabel="Harcourt Butler Technical University Kanpur"
            />
            <div className="p-4 border-t border-border-hairline/60 bg-surface-elevated/80 flex items-center justify-between text-xs font-mono text-text-muted">
              <span>CAMPUS HUB</span>
              <span className="text-accent">Kanpur, Uttar Pradesh</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-border-hairline shadow-lg bg-surface/80">
            <ImagePlaceholder
              id="ABOUT-COMMUNITY-01"
              label="COMMUNITY WORKSHOP SCENE"
              aspectRatio="16:9"
              sublabel="AWS SBG HBTU Student Hackathon & Lab"
            />
            <div className="p-4 border-t border-border-hairline/60 bg-surface-elevated/80 flex items-center justify-between text-xs font-mono text-text-muted">
              <span>PEER LEARNING</span>
              <span className="text-accent-aws">Hands-on Builders</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Why Cloud */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Mission Column */}
        <div className="lg:col-span-7 space-y-6">
          <SectionHeader
            tag="OUR MISSION"
            title="Bridging Academia & Cloud Engineering"
          />

          <div className="space-y-4 text-base text-text-muted leading-relaxed">
            <p>
              AWS Student Builder Groups are vibrant, student-led communities on post-secondary
              school campuses. Students come together to explore cloud technology, build
              innovative projects, and grow their technical skills.
            </p>
            <p>
              We aim to bridge the gap between academia and industry by organizing hackathons,
              study groups, and hands-on workshops that leverage Amazon Web Services.
            </p>
            <p>
              Whether you are writing your first Python script, launching a virtual machine, or
              architecting distributed microservices, our group provides mentorship, peer support,
              and official AWS learning pathways.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/join"
              className="btn-3d-aws inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
            >
              <span>Join the Group</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/team"
              className="btn-3d-secondary inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
            >
              <span>Meet Core Team</span>
            </Link>
          </div>
        </div>

        {/* Why Cloud Card */}
        <div className="lg:col-span-5">
          <Card variant="terminal" className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border-hairline pb-4">
              <span className="font-mono text-xs font-bold text-accent tracking-wider uppercase">
                WHY_CLOUD_FIRST
              </span>
              <Badge variant="aws" size="sm">
                AWS ECOSYSTEM
              </Badge>
            </div>

            <p className="text-sm text-text-muted leading-relaxed">
              Cloud computing is the backbone of modern applications. By mastering AWS early, you
              position yourself at the forefront of technological innovation.
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3 text-sm text-text">
                <span className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <span>
                  <strong>High demand for cloud skills</strong> across tech startups and enterprise systems
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-text">
                <span className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <span>
                  <strong>Scalable architecture</strong> that supports millions of concurrent users
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-text">
                <span className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <span>
                  <strong>Industry-recognized certifications</strong> that stand out on resumes
                </span>
              </li>
            </ul>

            <div className="pt-4 border-t border-border-hairline/60 font-mono text-xs text-text-muted flex items-center justify-between">
              <span>STATUS: ADMISSIONS OPEN</span>
              <span className="text-accent font-bold">HBTU KANPUR</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="space-y-8">
        <SectionHeader
          tag="HOW WE OPERATE"
          title="Community Pillars"
          description="Everything we do is centered around practical execution, collaborative learning, and student mentorship."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <Card
              key={pillar.tag}
              variant="interactive"
              className="p-6 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block font-mono text-[10px] font-bold text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20 mb-3 uppercase tracking-wider">
                  {pillar.tag}
                </span>
                <h3 className="font-sans font-bold text-lg text-text mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="p-8 sm:p-10 rounded-2xl border border-border-hairline bg-surface/80 text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-text">
          Want to Learn More or Collaborate?
        </h2>
        <p className="text-sm text-text-muted max-w-xl mx-auto">
          Reach out to the core team or join our WhatsApp and Meetup groups to attend the next
          session on campus.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/join"
            className="btn-3d-aws inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold"
          >
            <span>Apply to Join</span>
          </Link>
          <Link
            href="/team"
            className="btn-3d-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold"
          >
            <span>Contact Team</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
