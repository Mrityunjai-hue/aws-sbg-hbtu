"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SectionHeader,
  Badge,
  Card,
  ImagePlaceholder,
} from "@/components/ui";
import { Tabs } from "@/components/features";

export default function TracksPage() {
  const [activeTab, setActiveTab] = useState("all");

  const tracks = [
    {
      id: "cloud-foundations",
      category: "foundations",
      index: "01",
      slotId: "TRACK-CLOUD-01",
      title: "Cloud Foundations & Architecture",
      level: "BEGINNER",
      badgeVariant: "emerald" as const,
      description:
        "Master the core building blocks of AWS infrastructure, security, and networking. Perfect for beginners looking to prepare for the AWS Certified Cloud Practitioner and Solutions Architect Associate examinations.",
      services: ["Amazon EC2", "Amazon S3", "Amazon VPC", "AWS IAM", "CloudWatch"],
      outcomes: [
        "Deploy resilient multi-AZ web servers on AWS",
        "Configure custom VPCs, subnets, and security groups",
        "Implement least-privilege IAM roles and access policies",
      ],
    },
    {
      id: "serverless",
      category: "serverless",
      index: "02",
      slotId: "TRACK-DEVOPS-01",
      title: "Serverless Applications & Event-Driven Systems",
      level: "INTERMEDIATE",
      badgeVariant: "aws" as const,
      description:
        "Build and scale modern web applications without managing servers or provisioning virtual machines. Focus on writing code that scales automatically to millions of requests with zero idle costs.",
      services: ["AWS Lambda", "Amazon DynamoDB", "Amazon API Gateway", "Amazon EventBridge", "AWS Step Functions"],
      outcomes: [
        "Architect RESTful & GraphQL microservices with AWS Lambda",
        "Design high-performance single-table DynamoDB schemas",
        "Orchestrate asynchronous workflows with EventBridge",
      ],
    },
    {
      id: "devops-cicd",
      category: "devops",
      index: "03",
      slotId: "TRACK-SECURITY-01",
      title: "DevOps, Containers & Cloud Automation",
      level: "INTERMEDIATE",
      badgeVariant: "emerald" as const,
      description:
        "Automate code shipping and infrastructure lifecycle. Learn infrastructure-as-code using AWS Cloud Development Kit (CDK) and deploy containerized services with Docker and Amazon ECS.",
      services: ["AWS CDK", "Docker", "Amazon ECS", "AWS Fargate", "GitHub Actions"],
      outcomes: [
        "Define type-safe cloud infrastructure in TypeScript via AWS CDK",
        "Containerize full-stack apps and deploy to serverless Fargate",
        "Build automated CI/CD deployment pipelines",
      ],
    },
    {
      id: "aiml-bedrock",
      category: "aiml",
      index: "04",
      slotId: "TRACK-AIML-01",
      title: "AI/ML & Generative AI on AWS",
      level: "ADVANCED",
      badgeVariant: "emerald" as const,
      description:
        "Unlock predictive and generative artificial intelligence with Amazon Bedrock and SageMaker. Build production RAG (Retrieval Augmented Generation) applications and fine-tune foundation models.",
      services: ["Amazon Bedrock", "Amazon SageMaker", "Amazon Rekognition", "LangChain", "Amazon OpenSearch"],
      outcomes: [
        "Integrate foundation LLMs via Amazon Bedrock API",
        "Implement semantic vector search pipelines with OpenSearch",
        "Train and deploy custom machine learning models on SageMaker",
      ],
    },
  ];

  const filteredTracks =
    activeTab === "all"
      ? tracks
      : tracks.filter(
          (t) =>
            t.category === activeTab ||
            (activeTab === "foundations" && t.category === "foundations") ||
            (activeTab === "serverless" && t.category === "serverless") ||
            (activeTab === "devops" && t.category === "devops") ||
            (activeTab === "aiml" && t.category === "aiml")
        );

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
        <span className="text-text font-bold">Learning Tracks</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-hairline">
        <SectionHeader
          tag="CURRICULUM & DOMAINS"
          title="Architected Learning Tracks"
          description="Structured paths designed for student builders at HBTU Kanpur — from foundational infrastructure to serverless microservices, DevOps automation, and Generative AI."
        />

        <div className="shrink-0">
          <Link
            href="/join"
            className="btn-3d-aws inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold"
          >
            <span>Join a Study Jam</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Segmented Filter Tabs */}
      <div>
        <Tabs
          tabs={[
            { id: "all", label: "All Tracks", count: tracks.length },
            { id: "foundations", label: "Cloud Foundations", count: 1 },
            { id: "serverless", label: "Serverless", count: 1 },
            { id: "devops", label: "DevOps & Containers", count: 1 },
            { id: "aiml", label: "AI/ML & Bedrock", count: 1 },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Tracks Grid */}
      <div className="space-y-8">
        {filteredTracks.map((track) => (
          <Card
            key={track.id}
            variant="default"
            className="group p-6 sm:p-8 md:p-10 border-border-hairline hover:border-accent/40 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Image Slot / Media */}
              <div className="lg:col-span-4 overflow-hidden rounded-2xl border border-border-hairline bg-surface-elevated/50">
                <ImagePlaceholder
                  id={track.slotId}
                  label={track.title.toUpperCase()}
                  aspectRatio="16:9"
                  sublabel="AWS SBG HBTU Curriculum"
                  className="border-none rounded-none"
                />
              </div>

              {/* Center Column: Title, Description, Services & Outcomes */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-accent">
                      TRACK {track.index}
                    </span>
                    <Badge variant={track.badgeVariant} size="sm">
                      {track.level}
                    </Badge>
                  </div>
                  <span className="text-xs font-mono text-text-muted">
                    HBTU Kanpur Chapter
                  </span>
                </div>

                <h2 className="font-sans text-2xl sm:text-3xl font-bold text-text group-hover:text-accent transition-colors">
                  {track.title}
                </h2>

                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {track.description}
                </p>

                {/* Services Tags */}
                <div>
                  <p className="font-mono text-xs text-text-muted font-bold uppercase mb-2">
                    Core AWS Services Covered:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {track.services.map((svc) => (
                      <Badge key={svc} variant="default" size="sm">
                        {svc}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div className="pt-2">
                  <p className="font-mono text-xs text-text-muted font-bold uppercase mb-2">
                    Key Practical Outcomes:
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-text-muted">
                    {track.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">•</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-border-hairline/60 flex items-center justify-between gap-4">
                  <span className="text-xs font-mono text-text-muted">
                    Study jam sessions scheduled bi-weekly
                  </span>
                  <Link
                    href="/join"
                    className="btn-3d-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold"
                  >
                    <span>Start Track</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl border border-border-hairline bg-surface/80 text-center max-w-3xl mx-auto space-y-4">
        <h3 className="font-sans text-xl sm:text-2xl font-bold text-text">
          Want to Propose a New Technical Track?
        </h3>
        <p className="text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
          We welcome peer mentors and senior student builders at HBTU Kanpur who want to lead
          sessions on specialized cloud architectures, security, or generative AI.
        </p>
        <div className="pt-2">
          <Link
            href="/team"
            className="btn-3d-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold"
          >
            <span>Connect with Core Team</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
