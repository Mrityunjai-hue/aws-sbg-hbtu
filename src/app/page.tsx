import React from "react";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants/socials";
import { MeetupIcon } from "@/components/ui/SocialIcons";
import {
  SectionHeader,
  ImagePlaceholder,
  Badge,
} from "@/components/ui";
import {
  PlatformCard,
  FaqAccordion,
  StatBand,
  EventsList,
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

  return (
    <div className="site-container py-8 sm:py-12 md:py-16 space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16 pt-2 sm:pt-6">
        {/* Left Column: Heading, Subhead, 3D CTAs */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <Badge variant="purple" size="sm">
              HBTU KANPUR CHAPTER
            </Badge>
            <Badge variant="aws" size="sm">
              POWERED BY AWS
            </Badge>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text leading-[1.08] mb-6">
            Your ideas.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-hover to-accent-aws">
              Your community.
            </span>
            <br />
            Your AWS SBG.
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-8 max-w-xl">
            Connect with builders who understand your journey. Explore cloud technology, build
            innovative projects, and grow your technical skills. Your cloud journey starts here
            at HBTU.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/join"
              className="btn-3d-aws inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-center"
            >
              <span>Join the community</span>
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

            <a
              href={SOCIAL_LINKS.meetup.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-center"
            >
              <MeetupIcon className="w-5 h-5 text-[#ED1C40]" />
              <span>Meetup Group</span>
            </a>
          </div>

          {/* Micro trust row */}
          <div className="mt-8 pt-6 border-t border-border-hairline/60 flex items-center gap-6 text-xs text-text-muted font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Free Membership</span>
            </div>
            <span>•</span>
            <div>100% Student-Led</div>
            <span>•</span>
            <div>Campus Community</div>
          </div>
        </div>

        {/* Right Column: Hero Visual Slot */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="relative group">
            {/* Ambient Purple/Orange Glow */}
            <div
              className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent/30 via-accent-aws/20 to-accent/30 blur-xl opacity-50 group-hover:opacity-75 transition duration-500"
              aria-hidden="true"
            />

            <div className="relative rounded-2xl overflow-hidden border border-border-subtle bg-surface/90 shadow-2xl">
              <ImagePlaceholder
                id="HERO-IMG-01"
                label="AWS SBG HBTU HERO MEDIA"
                aspectRatio="4:3"
                sublabel="HBTU Kanpur Campus Workshop"
                className="border-none rounded-none"
              />

              {/* Status footer bar */}
              <div className="p-3 bg-surface-elevated/90 border-t border-border-hairline flex items-center justify-between text-xs font-mono text-text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  <span>SLOT: HERO-IMG-01</span>
                </span>
                <span className="text-accent-aws font-bold">4:3 · 800x600</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Metric Stat Band */}
      <section>
        <StatBand />
      </section>

      {/* 3. Connect Across Our Platforms */}
      <section className="space-y-8">
        <SectionHeader
          tag="CONNECT WITH BUILDERS"
          title="Connect Across Our Platforms"
          description="Stay plugged in with our latest meetups, professional updates, project repositories, and student discussions."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PlatformCard platform="meetup" />
          <PlatformCard platform="linkedin" />
          <PlatformCard platform="whatsapp" />
          <PlatformCard platform="instagram" />
        </div>
      </section>

      {/* 4. Upcoming Events Preview */}
      <section className="space-y-8">
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
      </section>

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
      <section className="relative rounded-3xl overflow-hidden border border-border-hairline bg-surface/80 dark:bg-surface-elevated/60 p-8 sm:p-12 text-center backdrop-blur-md">
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
      </section>
    </div>
  );
}
