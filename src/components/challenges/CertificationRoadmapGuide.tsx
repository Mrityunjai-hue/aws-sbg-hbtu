"use client";

import React, { useState } from "react";
import {
  AWS_CERTIFICATIONS,
  CAREER_ROLE_PATHS,
  PERSONA_RECOMMENDATIONS,
  FOUR_STEP_READINESS_BLUEPRINT,
} from "@/data/roadmap";

interface CertificationRoadmapGuideProps {
  initialPersona?: "new" | "business" | "it";
  onSelectCert?: (certCode: string) => void;
  isModalView?: boolean;
}

export function CertificationRoadmapGuide({
  initialPersona = "it",
  onSelectCert,
  isModalView = false,
}: CertificationRoadmapGuideProps) {
  const [selectedPersona, setSelectedPersona] = useState<"new" | "business" | "it">(initialPersona);
  const [activeView, setActiveView] = useState<"pathways" | "exams" | "blueprint">("pathways");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCertId, setExpandedCertId] = useState<string | null>("clf-c02");

  // Filter Career Roles
  const filteredRoles = CAREER_ROLE_PATHS.filter((role) => {
    const matchesCategory = selectedCategory === "ALL" || role.category === selectedCategory;
    const matchesSearch =
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.responsibilities.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.path.some(
        (p) =>
          p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Filter Certifications
  const filteredCerts = AWS_CERTIFICATIONS.filter((cert) => {
    const matchesLevel = selectedLevel === "ALL" || cert.level === selectedLevel;
    const matchesSearch =
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelBorderClass = (level: string) => {
    switch (level) {
      case "Foundational":
        return "border-teal-500/40 hover:border-teal-400 bg-teal-500/5";
      case "Associate":
        return "border-blue-500/40 hover:border-blue-400 bg-blue-500/5";
      case "Professional":
        return "border-emerald-500/40 hover:border-emerald-400 bg-emerald-500/5";
      case "Specialty":
        return "border-amber-500/40 hover:border-amber-400 bg-amber-500/5";
      default:
        return "border-outline hover:border-primary-accent bg-surface-lowest";
    }
  };

  const getLevelBadgeClasses = (level: string) => {
    switch (level) {
      case "Foundational":
        return "bg-teal-500/15 text-teal-300 border-teal-500/30";
      case "Associate":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      case "Professional":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "Specialty":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      default:
        return "bg-surface-low text-on-surface-variant border-outline";
    }
  };

  const activePersonaData = PERSONA_RECOMMENDATIONS.find((p) => p.id === selectedPersona)!;

  return (
    <div className={`w-full ${isModalView ? "p-4 sm:p-6" : "space-y-10"}`}>
      {/* 1. ARCHITECTURAL HERO BANNER */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-surface-low border border-outline overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-primary-accent/15 border border-primary-accent/30 text-primary-accent text-xs font-mono font-bold tracking-wider uppercase">
                AWS TRAINING & CERTIFICATION
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-lowest border border-outline text-on-surface-variant text-xs font-mono">
                Official Career Path Matrix
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-on-background tracking-tight">
              Start Your AWS Certification Journey
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-on-surface-variant font-mono leading-relaxed">
              Explore official role-aligned certification pathways designed for software engineers, cloud architects, data scientists, and DevOps practitioners. Select your cloud career objective to map the exact progression sequence.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
            <div className="p-3 rounded-2xl bg-surface-lowest border border-teal-500/30 text-center">
              <div className="text-base font-black text-teal-400 font-mono">1</div>
              <div className="text-[10px] font-mono text-on-surface-variant uppercase">Foundational</div>
            </div>
            <div className="p-3 rounded-2xl bg-surface-lowest border border-blue-500/30 text-center">
              <div className="text-base font-black text-blue-400 font-mono">4</div>
              <div className="text-[10px] font-mono text-on-surface-variant uppercase">Associate</div>
            </div>
            <div className="p-3 rounded-2xl bg-surface-lowest border border-emerald-500/30 text-center">
              <div className="text-base font-black text-emerald-400 font-mono">2</div>
              <div className="text-[10px] font-mono text-on-surface-variant uppercase">Professional</div>
            </div>
            <div className="p-3 rounded-2xl bg-surface-lowest border border-pink-500/30 text-center">
              <div className="text-base font-black text-pink-400 font-mono">3</div>
              <div className="text-[10px] font-mono text-on-surface-variant uppercase">Specialty</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PERSONA SELECTOR: "WHICH AWS CERTIFICATION SHOULD I START WITH?" */}
      <div className="mt-8 rounded-3xl p-6 bg-surface-low border border-outline shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-outline">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary-accent/15 border border-primary-accent/30 text-primary-accent flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">psychology_alt</span>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-on-background">
                Which AWS Certification Should You Start With?
              </h3>
              <p className="text-xs font-mono text-on-surface-variant">
                Diagnostic baseline based on your academic background and current technical experience
              </p>
            </div>
          </div>

          {/* Persona Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1 rounded-2xl bg-surface-lowest border border-outline">
            {PERSONA_RECOMMENDATIONS.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  selectedPersona === persona.id
                    ? "bg-primary-accent text-white font-bold shadow-md"
                    : "text-on-surface-variant hover:text-on-background"
                }`}
              >
                {persona.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Persona Detail Box */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-2xl bg-surface-lowest border border-outline">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block mb-1">
              TARGET BACKGROUND
            </span>
            <p className="text-xs font-mono text-on-background leading-relaxed">
              {activePersonaData.targetProfile}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-primary-accent/10 border border-primary-accent/30">
            <span className="text-[10px] font-mono text-primary-accent uppercase tracking-wider block mb-1 font-bold">
              RECOMMENDED STARTING EXAM
            </span>
            <p className="text-sm font-bold text-on-background">
              {activePersonaData.recommendedCertName}
            </p>
            <p className="mt-1.5 text-xs font-mono text-on-surface-variant">
              {activePersonaData.reasoning}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-lowest border border-outline">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block mb-1">
              RECOMMENDED NEXT MILESTONE
            </span>
            <p className="text-xs font-mono text-on-background leading-relaxed">
              {activePersonaData.nextSteps}
            </p>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION VIEW TABS & FILTERS */}
      <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Main View Mode Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-low border border-outline">
          <button
            onClick={() => setActiveView("pathways")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeView === "pathways"
                ? "bg-primary-accent text-white font-bold shadow-lg"
                : "text-on-surface-variant hover:text-on-background"
            }`}
          >
            <span className="material-symbols-outlined text-sm">route</span>
            <span>Role Career Pathways ({CAREER_ROLE_PATHS.length})</span>
          </button>

          <button
            onClick={() => setActiveView("exams")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeView === "exams"
                ? "bg-primary-accent text-white font-bold shadow-lg"
                : "text-on-surface-variant hover:text-on-background"
            }`}
          >
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            <span>Exam Specifications ({AWS_CERTIFICATIONS.length})</span>
          </button>

          <button
            onClick={() => setActiveView("blueprint")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeView === "blueprint"
                ? "bg-primary-accent text-white font-bold shadow-lg"
                : "text-on-surface-variant hover:text-on-background"
            }`}
          >
            <span className="material-symbols-outlined text-sm">fact_check</span>
            <span>4-Step Prep Blueprint</span>
          </button>
        </div>

        {/* Global Search Box */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search role, exam, or domain..."
            className="w-full md:w-72 pl-9 pr-4 py-2 rounded-xl bg-surface-low border border-outline text-xs font-mono text-on-background outline-none focus:border-primary-accent"
          />
          <span className="material-symbols-outlined text-sm text-on-surface-variant absolute left-3 top-2.5">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-on-surface-variant hover:text-on-background"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. VIEW 1: ROLE CAREER PATHWAYS (The Core Vector Graphic Replacement) */}
      {activeView === "pathways" && (
        <div className="mt-6 space-y-6">
          {/* Domain Category Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {[
              { id: "ALL", label: "All Career Roles" },
              { id: "Architecture", label: "Architecture" },
              { id: "Data & Analytics", label: "Data & Analytics" },
              { id: "Development", label: "Development" },
              { id: "DevOps", label: "DevOps" },
              { id: "Operations", label: "Operations" },
              { id: "Security", label: "Security" },
              { id: "Networking", label: "Networking" },
              { id: "AI & ML", label: "AI & Machine Learning" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-on-background text-background font-bold shadow"
                    : "bg-surface-low text-on-surface-variant hover:text-on-background border border-outline"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Roster of 13 Specialized Career Tracks */}
          <div className="grid grid-cols-1 gap-5">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="p-5 sm:p-6 rounded-3xl bg-surface-low border border-outline shadow-xl hover:border-outline-variant transition-all"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-outline">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-secondary-accent/15 text-secondary-accent border border-secondary-accent/30 font-bold uppercase">
                        {role.category}
                      </span>
                      <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">schedule</span>
                        <span>Estimated Prep: {role.recommendedTimeline}</span>
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-on-background">
                      {role.title}
                    </h4>
                  </div>
                  <p className="text-xs font-mono text-on-surface-variant max-w-xl leading-relaxed">
                    {role.responsibilities}
                  </p>
                </div>

                {/* Step Progression Pathway Visualization */}
                <div className="mt-5">
                  <div className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary-accent">linear_scale</span>
                    <span>Recommended Certification Sequence</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {role.path.map((step, idx) => (
                      <React.Fragment key={`${role.id}-${step.certId}-${idx}`}>
                        <div
                          className={`p-3 rounded-2xl border transition-all ${getLevelBorderClass(
                            step.level
                          )} ${
                            step.isPrimary
                              ? "ring-1 ring-primary-accent/40 shadow-lg"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${getLevelBadgeClasses(
                                step.level
                              )}`}
                            >
                              {step.level}
                            </span>
                            <span className="text-xs font-bold font-mono text-on-background">
                              {step.code}
                            </span>
                          </div>
                          <div className="mt-1 text-xs font-medium text-on-surface-variant max-w-[180px] truncate">
                            {step.name}
                          </div>
                        </div>

                        {idx < role.path.length - 1 && (
                          <div className="text-on-surface-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm sm:text-base text-outline">
                              arrow_forward
                            </span>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {filteredRoles.length === 0 && (
              <div className="p-8 text-center rounded-3xl bg-surface-low border border-outline">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">search_off</span>
                <p className="mt-2 text-xs font-mono text-on-surface-variant">
                  No career roles found matching &ldquo;{searchQuery}&rdquo;. Try clearing your search term.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. VIEW 2: EXAM SPECIFICATIONS (The 10 Official Exams) */}
      {activeView === "exams" && (
        <div className="mt-6 space-y-6">
          {/* Level Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {[
              { id: "ALL", label: "All Exam Tiers" },
              { id: "Foundational", label: "Foundational (1)" },
              { id: "Associate", label: "Associate (4)" },
              { id: "Professional", label: "Professional (2)" },
              { id: "Specialty", label: "Specialty (3)" },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-colors ${
                  selectedLevel === lvl.id
                    ? "bg-on-background text-background font-bold shadow"
                    : "bg-surface-low text-on-surface-variant hover:text-on-background border border-outline"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredCerts.map((cert) => {
              const isExpanded = expandedCertId === cert.id;
              return (
                <div
                  key={cert.id}
                  className={`p-6 rounded-3xl bg-surface-low border transition-all ${
                    isExpanded
                      ? "border-primary-accent/50 shadow-2xl"
                      : "border-outline hover:border-outline-variant"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-outline">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${cert.levelBadgeColor}`}
                        >
                          {cert.level}
                        </span>
                        <span className="text-xs font-mono text-on-surface-variant">
                          Exam Code: {cert.code}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-on-background">
                        {cert.name}
                      </h4>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black font-mono text-on-background">
                        ${cert.costUsd} USD
                      </div>
                      <div className="text-[10px] font-mono text-on-surface-variant">
                        Passing: {cert.passingScore}/1000
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs font-mono text-on-surface-variant leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Metadata Matrix */}
                  <div className="mt-4 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-surface-lowest border border-outline text-center">
                    <div>
                      <span className="text-[10px] font-mono text-on-surface-variant block">Duration</span>
                      <span className="text-xs font-bold font-mono text-on-background">{cert.durationMins} mins</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-on-surface-variant block">Format</span>
                      <span className="text-xs font-bold font-mono text-on-background">{cert.questionCount} Questions</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-on-surface-variant block">Target Role</span>
                      <span className="text-xs font-bold font-mono text-on-background truncate block">
                        {cert.targetRole.split(",")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Domain Distribution Progress Bars */}
                  <div className="mt-4">
                    <button
                      onClick={() => setExpandedCertId(isExpanded ? null : cert.id)}
                      className="w-full flex items-center justify-between text-xs font-mono text-primary-accent hover:underline py-1"
                    >
                      <span>Exam Domain Weight Distribution</span>
                      <span className="material-symbols-outlined text-sm">
                        {isExpanded ? "expand_less" : "expand_more"}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2.5 pt-2 border-t border-outline">
                        {cert.domains.map((dom, dIdx) => (
                          <div key={dIdx}>
                            <div className="flex justify-between text-[11px] font-mono text-on-surface-variant mb-1">
                              <span className="truncate pr-2">{dom.name}</span>
                              <span className="font-bold text-on-background">{dom.weight}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface-lowest rounded-full overflow-hidden border border-outline">
                              <div
                                className="h-full bg-primary-accent rounded-full"
                                style={{ width: `${dom.weight}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Link to AWS Skill Builder */}
                  <div className="mt-5 pt-4 border-t border-outline flex items-center justify-between">
                    <span className="text-[11px] font-mono text-on-surface-variant">
                      Prerequisites: {cert.prerequisites.slice(0, 45)}...
                    </span>
                    <a
                      href={cert.skillBuilderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-accent text-white font-mono text-xs font-bold hover:bg-primary-accent/90 transition-colors"
                    >
                      <span>Study on Skill Builder</span>
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. VIEW 3: 4-STEP EXAM READINESS BLUEPRINT (From graphic footer) */}
      {activeView === "blueprint" && (
        <div className="mt-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-low border border-outline shadow-xl">
            <h3 className="font-black text-xl text-on-background">
              The 4-Step Exam Readiness Blueprint
            </h3>
            <p className="mt-1.5 text-xs font-mono text-on-surface-variant">
              Follow this structured sequence to approach your AWS examination day with complete technical confidence.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {FOUR_STEP_READINESS_BLUEPRINT.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-5 rounded-2xl bg-surface-lowest border border-outline relative group hover:border-primary-accent/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="h-10 w-10 rounded-xl bg-primary-accent/15 border border-primary-accent/30 text-primary-accent flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">{step.icon}</span>
                    </span>
                    <span className="text-2xl font-black font-mono text-outline-variant group-hover:text-primary-accent transition-colors">
                      {step.stepNumber}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-on-background">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-xs font-mono text-on-surface-variant leading-relaxed">
                    {step.summary}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonials & Industry Impact */}
            <div className="mt-8 pt-6 border-t border-outline grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-surface-lowest border border-outline">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-teal-400">
                  <span className="material-symbols-outlined text-sm">format_quote</span>
                  <span>Solutions Architect Perspective</span>
                </div>
                <p className="text-xs font-mono text-on-surface-variant leading-relaxed italic">
                  &ldquo;Certifications validated my real-world skills and gave me the vocabulary to design enterprise systems. Starting with Cloud Practitioner provided the core foundation, and Solutions Architect Associate opened direct doors to cloud engineering roles.&rdquo;
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-lowest border border-outline">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-emerald-400">
                  <span className="material-symbols-outlined text-sm">format_quote</span>
                  <span>Lead DevOps Engineer Perspective</span>
                </div>
                <p className="text-xs font-mono text-on-surface-variant leading-relaxed italic">
                  &ldquo;Going from Developer Associate to DevOps Professional transformed how our team approaches continuous delivery, automated rollbacks, and zero-downtime infrastructure. Highly recommended for every engineering student.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. HBTU CHAPTER SPONSORSHIP FOOTER */}
      <div className="mt-8 p-6 rounded-3xl bg-surface-lowest border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">redeem</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-background">
              Win 100% Sponsored Official Exam Vouchers
            </h4>
            <p className="text-xs font-mono text-on-surface-variant">
              The Top 3 verified students on the 14-Day Sprint Leaderboard receive fully funded AWS Certification vouchers from AWS Student Builder Group HBTU.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            if (onSelectCert) onSelectCert("CLF-C02");
          }}
          className="shrink-0 px-4 py-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold hover:bg-amber-500/25 transition-colors"
        >
          Compete on Leaderboard
        </button>
      </div>
    </div>
  );
}
