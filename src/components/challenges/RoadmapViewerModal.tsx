import React from "react";
import { CertificationRoadmapGuide } from "./CertificationRoadmapGuide";

interface RoadmapViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoadmapViewerModal({ isOpen, onClose }: RoadmapViewerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
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
        className="relative z-10 w-full max-w-6xl h-[94vh] flex flex-col rounded-3xl bg-surface-lowest border border-outline shadow-2xl overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-outline shrink-0 bg-surface-lowest">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-secondary-accent/15 border border-secondary-accent/30 text-secondary-accent flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">map</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary-accent/15 text-secondary-accent border border-secondary-accent/30 font-bold">
                  OFFICIAL ROADMAP GUIDE
                </span>
                <span className="text-xs font-mono text-on-surface-variant hidden sm:inline">
                  Interactive Vector Edition
                </span>
              </div>
              <h2 className="font-extrabold text-base sm:text-xl text-on-background">
                AWS Certification Career Progression Roadmap
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close roadmap modal"
              className="h-9 w-9 rounded-xl border border-outline bg-surface-low text-on-surface-variant hover:text-on-background flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Body: High-Definition Vector Guide */}
        <div className="flex-1 overflow-y-auto bg-surface-lowest">
          <CertificationRoadmapGuide isModalView={true} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline shrink-0 flex items-center justify-between bg-surface-lowest">
          <div className="text-xs font-mono text-on-surface-variant">
            AWS Training & Certification Guidance · AWS Student Builder Group HBTU Kanpur
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
