"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants/socials";
import { MeetupIcon } from "@/components/ui/SocialIcons";
import {
  SectionHeader,
  Badge,
  MechanicalKeycapHero,
} from "@/components/ui";
import {
  PlatformCard,
  FaqAccordion,
  StatBand,
  EventsList,
  CloudArchitectureVisual,
} from "@/components/features";

export default function HomePage() {
  const homeFaqs = [
    {
      id: "faq-1",
      question: "Who can join the AWS SBG at HBTU?",
      answer:
        "Any student currently enrolled at HBTU with an interest in cloud computing can join, regardless of their branch or year.",
    },
    {
      id: "faq-2",
      question: "Why should I join the community?",
      answer:
        "You'll get hands-on experience with AWS, networking opportunities with industry professionals, access to exclusive workshops, and a chance to work on real-world projects.",
    },
    {
      id: "faq-3",
      question: "How do I become a core team member?",
      answer:
        "We hold an annual recruitment drive for core team positions. Active community members who demonstrate leadership and technical skills are highly encouraged to apply!",
    },
  ];

  const EASE_CURVE: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.08, ease: EASE_CURVE },
    }),
  };

  return (
    <div className="site-container py-8 sm:py-12 md:py-16 space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16 pt-2 sm:pt-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4 flex items-center gap-2 flex-wrap">
              <Badge variant="emerald" size="sm">HBTU KANPUR CHAPTER</Badge>
              <Badge variant="aws" size="sm">POWERED BY AWS</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white [html.light_&]:text-slate-900 leading-[1.12] mb-6"
            >
              <span className="block text-white [html.light_&]:text-slate-900">Your ideas.</span>
              <div className="my-2.5 sm:my-3.5">
                <MechanicalKeycapHero />
              </div>
              <span className="block text-white [html.light_&]:text-slate-900">Your AWS SBG.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base sm:text-lg text-on-surface-variant leading-relaxed mb-8 max-w-xl font-medium"
            >
              Connect with builders who understand your journey. Explore cloud architecture, deploy
              scalable serverless systems, and accelerate your engineering career. Your cloud journey starts here
              at HBTU Kanpur.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/join"
                className="btn-3d-aws inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-extrabold text-sm sm:text-base text-center shadow-lg"
              >
                <span>Join the community</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <a
                href={SOCIAL_LINKS.meetup.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-center"
              >
                <MeetupIcon className="w-5 h-5 text-[#ED1C40]" />
                <span>Meetup Group</span>
              </a>
            </motion.div>

            {/* Micro trust row */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-8 pt-6 border-t border-outline flex items-center gap-4 sm:gap-6 text-xs text-on-surface-variant font-mono flex-wrap"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-primary-accent font-semibold">Free Membership</span>
              </div>
              <span aria-hidden>•</span>
              <div className="text-on-background font-semibold">100% Student-Led</div>
              <span aria-hidden>•</span>
              <div className="text-on-background font-semibold">Campus Community</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Cloud Architecture Visual */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-lg lg:max-w-none"
        >
          <div className="relative group">
            <div
              className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/30 via-emerald-400/20 to-amber-500/20 blur-2xl opacity-60 group-hover:opacity-85 transition duration-500 animate-gradient-flow"
              aria-hidden="true"
            />
            <CloudArchitectureVisual />
          </div>
        </motion.div>
      </section>

      {/* 2. Metric Stat Band */}
      <motion.section
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <StatBand />
      </motion.section>

      {/* 3. Connect Across Our Platforms */}
      <motion.section
        initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        <SectionHeader
          tag="CONNECT WITH BUILDERS"
          title="Connect Across Our Platforms"
          description="Stay plugged in with our latest meetups, professional LinkedIn updates, and active student builder discussions."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {["meetup", "linkedin", "whatsapp"].map((platform, i) => (
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE_CURVE }}
            >
              <PlatformCard platform={platform as "meetup" | "linkedin" | "whatsapp"} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 4. Upcoming Events Preview */}
      <motion.section
        initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            tag="COMMUNITY SESSIONS"
            title="Upcoming Workshops & Events"
            description="Hands-on cloud workshops, speaker sessions, and hackathons hosted on campus."
          />
          <Link
            href="/events"
            className="inline-flex items-center gap-1 text-sm font-bold text-accent hover:underline shrink-0"
          >
            <span>View all events</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        <EventsList maxItems={3} />
      </motion.section>

      {/* 5. About The Program & FAQs */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4 border-t border-border-hairline">
        {/* Left Column: About */}
        <div className="lg:col-span-7 space-y-6">
          <SectionHeader
            tag="ABOUT THE PROGRAM"
            title="Empowering Student Builders"
          />

          <div className="space-y-4 text-text-muted text-base leading-relaxed">
            <p>
              The AWS Student Builder Group at HBTU is a vibrant, student-led community on campus.
              Students come together to explore cloud technology, build innovative projects, and
              grow their technical skills. Membership is open to any student actively enrolled at
              HBTU who&apos;s ready to build their future in the cloud.
            </p>
            <p>
              Our group is led by dedicated Core Team members who are passionate about bringing our
              community to life. With support from AWS, we are responsible for growing the group,
              organizing inspiring events like hackathons and workshops, and championing local
              initiatives that matter to our peers.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-accent/30 bg-accent/5 space-y-3">
            <p className="text-sm text-text font-medium">
              Ready to start your cloud journey? Apply now to join the community. Check out our FAQs
              for more information on the program and leadership.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/join"
                className="btn-3d-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold"
              >
                <span>Apply Now</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/about"
                className="btn-3d-secondary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold"
              >
                <span>Read More About Us</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: FAQs */}
        <div className="lg:col-span-5 space-y-6">
          <SectionHeader
            tag="QUESTIONS & ANSWERS"
            title="FAQs"
            description="Common questions about membership, workshops, and joining the team."
          />

          <FaqAccordion
            items={homeFaqs}
            allowMultiple={true}
            defaultExpandedIds={["faq-1"]}
          />
        </div>
      </section>

      {/* 6. Call To Action Footer Strip */}
      <motion.section
        initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl overflow-hidden border border-border-hairline bg-surface/80 dark:bg-surface-elevated/60 p-8 sm:p-12 text-center backdrop-blur-md animate-border-glow"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-20 site-dot-pattern"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <Badge variant="aws" size="md">
            BUILD. SHIP. REPEAT.
          </Badge>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
            Ready to Build Your Future in the Cloud?
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Join hundreds of HBTU students mastering cloud architecture, serverless systems, and
            open-source builder tools.
          </p>
          <div className="pt-2">
            <Link
              href="/join"
              className="btn-3d-aws inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-lg"
            >
              <span>Join the Community Today</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
