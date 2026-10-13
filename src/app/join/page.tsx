"use client";

import React, { useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants/socials";
import { MeetupIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { Badge, Card, Button } from "@/components/ui";

export default function JoinPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !year) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      if (!db) throw new Error("Database not initialized");

      await addDoc(collection(db, "joinRequests"), {
        name,
        email,
        year,
        createdAt: Timestamp.now(),
      });

      toast.success("Application submitted successfully!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-container py-8 sm:py-12 md:py-16 min-h-[calc(100vh-120px)] flex flex-col justify-center">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted mb-8">
        <Link href="/" className="hover:text-text transition-colors">
          Home
        </Link>
        <span>/</span>
        <span>Community</span>
        <span>/</span>
        <span className="text-text font-bold">Join Group</span>
      </nav>

      <div className="max-w-xl mx-auto w-full">
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <Badge variant="aws" size="sm" className="font-mono">
                CAMPUS APPLICATION
              </Badge>
              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-text tracking-tight">
                Join the Community
              </h1>
              <p className="text-sm sm:text-base text-text-muted max-w-md mx-auto leading-relaxed">
                Take the first step towards building the future on AWS with fellow student builders
                at HBTU Kanpur.
              </p>
            </div>

            <Card variant="default" className="p-6 sm:p-8 md:p-10 border-border-hairline bg-surface/90 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-border-hairline">
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                  MEMBERSHIP_FORM
                </span>
                <span className="font-mono text-xs text-text-muted">
                  HBTU KANPUR
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text font-mono uppercase tracking-wider" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-border-hairline bg-surface-elevated/70 px-4 py-3 text-sm text-text placeholder-text-muted/60 focus:border-accent focus:bg-surface-elevated focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="e.g. Aditi Sharma"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text font-mono uppercase tracking-wider" htmlFor="email">
                    University / Personal Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border-hairline bg-surface-elevated/70 px-4 py-3 text-sm text-text placeholder-text-muted/60 focus:border-accent focus:bg-surface-elevated focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="student@hbtu.ac.in"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text font-mono uppercase tracking-wider" htmlFor="year">
                    Year of Study
                  </label>
                  <div className="relative">
                    <select
                      id="year"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full rounded-xl border border-border-hairline bg-surface-elevated/70 px-4 py-3 text-sm text-text focus:border-accent focus:bg-surface-elevated focus:outline-none focus:ring-1 focus:ring-accent transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select Year of Study</option>
                      <option value="1">First Year (1st Year)</option>
                      <option value="2">Second Year (2nd Year)</option>
                      <option value="3">Third Year (3rd Year)</option>
                      <option value="4">Final Year (4th Year)</option>
                      <option value="alumni">Post-Graduate / Alumni</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-muted">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="aws"
                    size="lg"
                    className="w-full font-bold text-sm tracking-wide"
                    isLoading={loading}
                  >
                    Submit Application
                  </Button>
                </div>

                <p className="text-[11px] font-mono text-center text-text-muted/80 pt-2">
                  By applying, you agree to uphold the AWS SBG Code of Conduct.
                </p>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="text-center space-y-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <div className="space-y-2">
              <Badge variant="emerald" size="sm">
                APPLICATION RECEIVED
              </Badge>
              <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-text">
                Welcome to the Community!
              </h1>
              <p className="text-sm sm:text-base text-text-muted max-w-md mx-auto leading-relaxed">
                Your application has been logged. To complete your onboarding and receive calendar
                invites to our next workshop, connect with us:
              </p>
            </div>

            <div className="space-y-4 text-left">
              <a
                href={SOCIAL_LINKS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-text">WhatsApp Community</h3>
                    <p className="text-xs text-text-muted">Chat with members & get instant session links</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#25D366] group-hover:translate-x-1 transition-transform">
                  Join Chat →
                </span>
              </a>

              <a
                href={SOCIAL_LINKS.meetup.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-[#ED1C40]/40 bg-[#ED1C40]/10 hover:bg-[#ED1C40]/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#ED1C40]/20 flex items-center justify-center text-[#ED1C40]">
                    <MeetupIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-text">Meetup Group</h3>
                    <p className="text-xs text-text-muted">RSVP for upcoming technical workshops</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#ED1C40] group-hover:translate-x-1 transition-transform">
                  Join Meetup →
                </span>
              </a>

              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-[#0A66C2]/40 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2]">
                    <LinkedInIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-text">LinkedIn Page</h3>
                    <p className="text-xs text-text-muted">Connect professionally with alumni & peers</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#0A66C2] group-hover:translate-x-1 transition-transform">
                  Follow LinkedIn →
                </span>
              </a>
            </div>

            <div>
              <Link
                href="/"
                className="text-xs font-mono text-text-muted hover:text-accent transition-colors underline underline-offset-4"
              >
                ← Return to Home Page
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
