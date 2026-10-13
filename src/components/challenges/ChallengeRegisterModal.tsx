"use client";

import React, { useState } from "react";
import { ChallengeService, StudentRegistrationInput } from "@/lib/services/challenges";

interface ChallengeRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: () => void;
}

const HBTU_BRANCHES = [
  "Computer Science & Engineering (CSE)",
  "Information Technology (IT)",
  "BS-MS Mathematics and Data Science (MDS)",
  "Electronics & Communication Engineering (ECE)",
  "Electrical Engineering (EE)",
  "Mechanical Engineering (ME)",
  "Chemical Engineering (CHE)",
  "Civil Engineering (CE)",
  "Biochemical Engineering (BE)",
  "Food Technology (FT)",
  "Leather Technology (LT)",
  "Oil Technology (OT)",
  "Paint Technology (PT)",
  "Plastic Technology (PLT)",
  "MCA / Masters Program",
  "Other / Open Elective",
];

const TARGET_CERTS = [
  "AWS Certified Cloud Practitioner (CLF-C02)",
  "AWS Certified Solutions Architect - Associate (SAA-C03)",
  "AWS Certified Developer - Associate (DVA-C02)",
  "AWS Certified Data Engineer - Associate (DEA-C01)",
  "AWS Certified SysOps Administrator - Associate (SOA-C02)",
  "AWS Certified Machine Learning - Associate / Specialty",
  "AWS Certified Solutions Architect - Professional (SAP-C02)",
  "AWS Certified DevOps Engineer - Professional (DOP-C02)",
];

export function ChallengeRegisterModal({
  isOpen,
  onClose,
  onRegistered,
}: ChallengeRegisterModalProps) {
  const [formData, setFormData] = useState<StudentRegistrationInput>({
    name: "",
    email: "",
    rollNo: "",
    branch: HBTU_BRANCHES[0],
    year: "3rd Year",
    targetCert: TARGET_CERTS[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.rollNo.trim()) {
      setErrorMsg("Please fill in your name, email, and roll number.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg("");
      await ChallengeService.registerStudent(formData);
      onRegistered();
      onClose();
    } catch {
      setErrorMsg("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Register for 14-Day AWS Challenge"
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-lowest border border-outline shadow-2xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-outline">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary-accent/15 border border-primary-accent/30 text-primary-accent flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">how_to_reg</span>
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-on-background">
                Register for 14-Day Challenge
              </h2>
              <p className="text-xs font-mono text-on-surface-variant">
                HBTU Kanpur Student Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close registration modal"
            className="h-8 w-8 rounded-xl border border-outline bg-surface-low text-on-surface-variant hover:text-on-background flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-mono text-on-surface-variant mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Priya Sharma"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-low border border-outline focus:border-primary-accent text-on-background text-sm font-mono outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1.5">
                HBTU / Personal Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@hbtu.ac.in"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-low border border-outline focus:border-primary-accent text-on-background text-sm font-mono outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1.5">
                University Roll No *
              </label>
              <input
                type="text"
                required
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                placeholder="e.g. 220101045"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-low border border-outline focus:border-primary-accent text-on-background text-sm font-mono outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1.5">
                Branch / Department
              </label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-low border border-outline focus:border-primary-accent text-on-background text-xs font-mono outline-none transition-colors"
              >
                {HBTU_BRANCHES.map((b) => (
                  <option key={b} value={b} className="bg-surface-lowest text-on-background">
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-on-surface-variant mb-1.5">
                Academic Year
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-low border border-outline focus:border-primary-accent text-on-background text-xs font-mono outline-none transition-colors"
              >
                <option value="1st Year" className="bg-surface-lowest">1st Year (Freshman)</option>
                <option value="2nd Year" className="bg-surface-lowest">2nd Year (Sophomore)</option>
                <option value="3rd Year" className="bg-surface-lowest">3rd Year (Junior)</option>
                <option value="4th Year" className="bg-surface-lowest">4th Year (Senior)</option>
                <option value="5th Year (Integrated BS-MS)" className="bg-surface-lowest">5th Year (Integrated BS-MS)</option>
                <option value="Postgraduate / MCA" className="bg-surface-lowest">Postgraduate / MCA</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-on-surface-variant mb-1.5">
              Target AWS Certification Goal
            </label>
            <select
              value={formData.targetCert}
              onChange={(e) => setFormData({ ...formData, targetCert: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-low border border-outline focus:border-primary-accent text-on-background text-xs font-mono outline-none transition-colors"
            >
              {TARGET_CERTS.map((c) => (
                <option key={c} value={c} className="bg-surface-lowest text-on-background">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-surface-low border border-outline text-xs font-mono text-on-surface-variant space-y-2">
            <div className="flex items-center gap-2 text-primary-accent font-bold">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Participant Pledge</span>
            </div>
            <p>
              By registering, you commit to studying the AWS Cloud Practitioner Essentials modules on AWS Skill Builder, taking daily verification quizzes, and maintaining genuine builder ethics.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-outline">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-outline text-on-surface-variant hover:text-on-background font-mono text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-3d-aws px-6 py-2.5 rounded-xl font-mono text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Confirm Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
