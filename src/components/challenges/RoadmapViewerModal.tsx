"use client";

import React, { useState } from "react";
import Image from "next/image";

interface RoadmapViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoadmapViewerModal({ isOpen, onClose }: RoadmapViewerModalProps) {
  const [selectedPersona, setSelectedPersona] = useState<"new" | "business" | "it">("new");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AWS Certification Journey Roadmap"
        className="relative z-10 w-full max-w-5xl h-[92vh] flex flex-col rounded-3xl bg-surface-lowest border border-outline shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-outline shrink-0 bg-surface-lowest">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-secondary-accent/15 border border-secondary-accent/30 text-secondary-accent flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">map</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary-accent/15 text-secondary-accent border border-secondary-accent/30">
                  OFFICIAL ROADMAP GUIDE
                </span>
                <span className="text-xs font-mono text-on-surface-variant hidden sm:inline">
                  Shared by Chapter Leadership
                </span>
              </div>
              <h2 className="font-extrabold text-base sm:text-xl text-on-background">
                Start Your AWS Certification Journey
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/images/challenges/aws-certification-paths-roadmap.png"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline text-on-surface-variant hover:text-on-background font-mono text-xs font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-sm">fullscreen</span>
              <span>Open Full Size</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close roadmap modal"
              className="h-8 w-8 rounded-xl border border-outline bg-surface-low text-on-surface-variant hover:text-on-background flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Persona quick selector helper */}
        <div className="p-4 sm:px-6 bg-surface-low/60 border-b border-outline shrink-0 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono font-bold text-on-background flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-accent text-sm">psychology</span>
            <span>Which AWS Certification Should I Start With?</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedPersona("new")}
              className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors ${
                selectedPersona === "new"
                  ? "bg-primary-accent text-white font-bold"
                  : "bg-surface-lowest text-on-surface-variant hover:text-on-background border border-outline"
              }`}
            >
              New to Tech
            </button>
            <button
              onClick={() => setSelectedPersona("business")}
              className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors ${
                selectedPersona === "business"
                  ? "bg-primary-accent text-white font-bold"
                  : "bg-surface-lowest text-on-surface-variant hover:text-on-background border border-outline"
              }`}
            >
              Business / Non-Tech
            </button>
            <button
              onClick={() => setSelectedPersona("it")}
              className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors ${
                selectedPersona === "it"
                  ? "bg-primary-accent text-white font-bold"
                  : "bg-surface-lowest text-on-surface-variant hover:text-on-background border border-outline"
              }`}
            >
              IT / Dev / DevOps
            </button>
          </div>
        </div>

        {/* Persona Advice Card */}
        <div className="px-4 sm:px-6 py-2.5 bg-primary-accent/10 border-b border-primary-accent/20 text-xs font-mono shrink-0 flex items-center gap-2 text-primary-accent">
          <span className="material-symbols-outlined text-sm shrink-0">recommend</span>
          {selectedPersona === "new" && (
            <span>
              <strong>New to Tech:</strong> Start with <strong>AWS Certified Cloud Practitioner</strong>. Validates foundational knowledge of cloud concepts, services, and security. Perfect for the 14-day sprint!
            </span>
          )}
          {selectedPersona === "business" && (
            <span>
              <strong>Related Business Roles:</strong> Start with <strong>AWS Certified Cloud Practitioner</strong>. Builds confidence communicating cloud value with technical teams and clients.
            </span>
          )}
          {selectedPersona === "it" && (
            <span>
              <strong>IT & Software Engineers:</strong> Start with <strong>AWS Certified Solutions Architect - Associate</strong> or <strong>Developer - Associate</strong> after mastering Cloud Practitioner basics.
            </span>
          )}
        </div>

        {/* Infographic Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-surface-lowest flex justify-center">
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="relative w-full rounded-2xl overflow-hidden border border-outline shadow-xl bg-black">
              <img
                src="/images/challenges/aws-certification-paths-roadmap.png"
                alt="AWS Training and Certification - Start Your AWS Certification Journey Roadmap"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="mt-4 text-center text-xs font-mono text-on-surface-variant">
              Scroll down to explore all 13 certification tracks (Solutions Architect, Data Engineer, DevOps, Security, AI/ML, and more).
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline shrink-0 flex items-center justify-between bg-surface-lowest">
          <div className="text-xs font-mono text-on-surface-variant">
            AWS Training & Certification Guidance · AWS Student Builder Group HBTU
          </div>
          <button
            onClick={onClose}
            className="btn-3d-secondary px-5 py-2 rounded-xl font-mono text-xs font-bold text-on-background"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
