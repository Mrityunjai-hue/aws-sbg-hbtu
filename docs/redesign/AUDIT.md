# AWS SBG HBTU — Phase 0 Playwright Audit Report

> **Document Type:** Phase 0 Audit & Analysis Artefact  
> **Target Application:** AWS Student Builder Group (SBG) HBTU Kanpur  
> **Production Baseline:** https://aws-sbg-hbtu.vercel.app/  
> **Reference Design Source:** https://awssbggeu.com/  
> **Branch:** `redesign/ui-v2`  
> **Date:** October 12, 2026  
> **Author:** Antigravity Senior Frontend Engineer & Product Designer  

---

## 1. Executive Summary & Audit Methodology

This comprehensive audit was conducted in full adherence to the non-negotiable guidelines for the surgical re-skin of the **AWS Student Builder Group (SBG) HBTU Kanpur** website. The objective is to replicate the visual design, navigation model, grid hierarchy, panel patterns, and interaction feel of the reference site, while strictly retaining 100% of HBTU's existing content, routes, data, Firebase writes, and zero-breakage functionality.

### 1.1 Tooling & Verification
- **Playwright Test Runner:** Playwright `v1.64.0` with `Chromium (v1248)`, `WebKit (v2370)`, `Chrome Headless Shell`, and `FFmpeg (v1013)`.
- **Reference URL Connectivity:** `https://awssbggeu.com/` — Reachable (200 OK via CloudFront/S3). JS SPA client rendered via Vite/React mounted at `#root`.
- **Current Production Connectivity:** `https://aws-sbg-hbtu.vercel.app/` — Reachable (200 OK via Vercel). Built on Next.js 14 App Router.
- **Forbidden Strings Scan:** Full codebase scan for reference entity strings (`"Graphic Era"`, `"GEU"`, `"Dehradun"`, `"Pawan"`, `"Amit"`, `"awssbggeu"`, `"SCD 2026"`, `"KIRO"`) returned **0 matches** outside the audit analysis documentation folder (`/docs/redesign/reference/`).

---

## 2. Part A: Reference Design Audit (`https://awssbggeu.com/`)

### 2.1 Multi-Breakpoint & Multi-Engine Sessions
Sessions were executed through automated Playwright scripts (`scripts/audit/audit-reference.js`):
1. **Desktop Chromium (1440 × 900):** Tested in `dark` and `light` color schemes, plus `prefers-reduced-motion: reduce`. Recorded scroll-through video to `docs/redesign/reference/videos/`.
2. **Tablet Landscape (1024 × 768):** Tested for grid collapse and navigation bar responsiveness.
3. **Tablet Portrait (768 × 1024):** Tested navigation breakpoint transition (`xl:flex` vs `xl:hidden`).
4. **Mobile Chromium (390 × 844):** Configured with Playwright's `iPhone 12` device profile (touch events enabled, mobile user-agent, viewport scaling). Recorded video to `docs/redesign/reference/videos/`.
5. **WebKit Safari (1440 × 900 and 390 × 844):** Verified Safari-specific rendering (backdrop-filter blur, CSS oklab colors, box shadows).

### 2.2 Route & Link Crawl (Internal vs External)
A complete DOM crawl discovered **57 active links**:
- **Internal Routes Discovered:**
  - `/` (Home)
  - `/about` (About Us)
  - `/projects` (Projects Showcase)
  - `/events` (Events & Workshops)
  - `/challenges` (Challenges & Sprints)
  - `/team` (Our Team)
  - `/blog` (Tech Blog)
  - `/gallery` (Community Gallery)
  - `/contact` (Contact)
  - `/code-of-conduct` (Code of Conduct)
  - `/student-community-day` (Flagship Summit landing — *Org-specific, not carried over*)
  - `/recruitment` (Recruitment landing — *Org-specific, not carried over*)
  - `/brand` (Brand assets — *Org-specific, not carried over*)
  - `/verify` (Member verification — *Org-specific, not carried over*)
- **External Links Discovered:**
  - External builder portal login (`portal...`) — *Out of scope per user decision*
  - Meetup group, LinkedIn, Instagram, Discord, YouTube, WhatsApp, KonfHub pass checkout.

### 2.3 Navigation Architecture & Behavior
- **Desktop Header (`xl:flex` >= 1280px):**
  - **Layout:** Floating top header pill/island (`fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4`).
  - **Left Brand Chip:** Flex container with AWS logo chip, group title, and institution subtext (`text-xs sm:text-sm font-extrabold uppercase`).
  - **Center Floating Nav Pill:** Rounded-xl floating pill (`bg-surface/60 border border-outline/50 backdrop-blur-lg p-1 rounded-xl shadow-inner`).
  - **Nav Items:** `text-xs font-mono font-bold py-1.5 px-2.5 rounded-lg transition-colors`.
  - **Special Featured Item:** Leftmost item styled with a vibrant badge / LIVE pill indicator.
  - **Right Action Area:**
    - Theme Toggle: `h-9 w-9` rounded-xl border button with smooth icon transition.
    - Action CTA Button: 3D-styled secondary/primary button (`h-9 px-4 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider`).
- **Mobile Header (< 1280px):**
  - Brand chip on the left, theme toggle and hamburger menu button (`xl:hidden h-9 w-9 rounded-xl border border-outline/60 bg-surface-container-low`) on the right.
  - **Mobile Menu Drawer:** Full-height fixed overlay/sheet with slide-in animation from the right (`fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-surface-lowest border-l border-outline`).
  - Contains vertical links with monospaced section tags, theme toggle, and bottom CTA button.
- **Scroll & Sticky Behavior:**
  - Header maintains `position: fixed` with backdrop blur (`backdrop-blur-md` / `backdrop-blur-lg`).
  - As the user scrolls past the hero (verified at 25%, 50%, 75%, 100%), the header stays fixed at the top with a subtle elevation drop shadow (`shadow-md`).

### 2.4 Extracted Design Tokens

The tokens were extracted using `getComputedStyle()` across all element types into `docs/redesign/reference/tokens.json` and summarized in `tokens_summary.json`:

#### A. Typography
- **Primary Body & Headings Font:** `"Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
  - *Licensing:* Open Font License (OFL) via Google Fonts. Freely licensed and available in `next/font/google`.
- **Monospace Accents & Chips Font:** `"JetBrains Mono" / system monospace / font-mono`
  - *Usage:* Nav items, category badges, button labels, dates, telemetry chips, code blocks.
- **Type Scale:**
  - `Hero H1`: `4.5rem` (72px desktop) / `2.35rem` (37.6px mobile), `font-extrabold` (800/900), `letter-spacing: -1.8px`, `line-height: 1.12`.
  - `Section H2`: `3rem` (48px desktop) / `1.875rem` (30px mobile), `font-extrabold`, `letter-spacing: -1.2px`.
  - `Card / Item H3`: `1.125rem` (18px) to `1.875rem` (30px), `font-extrabold` / `font-black`.
  - `Body / Descriptions`: `1rem` (16px) desktop / `0.875rem` (14px) mobile, `line-height: 1.6`.
  - `Badges & Microcopy`: `0.6875rem` (11px) to `0.75rem` (12px), `font-mono font-bold uppercase tracking-wider`.

#### B. Color Palette
- **Primary Accent:** `#AD5CFF` (Electric Purple)
  - Glow / shadow color: `rgba(173, 92, 255, 0.22)`
  - Active 3D button border bottom: `#731ED0` (`rgb(115, 30, 208)`)
  - Grid line color: `rgba(173, 92, 255, 0.22)` (`--grid-color: #ad5cff38`)
- **Dark Mode Surfaces (Obsidian / Zinc System):**
  - `--bg-color` / Base Background: `#09090b` (`rgb(9, 9, 11)`)
  - `--surface-lowest`: `#09090b`
  - `--surface-low`: `#18181b` (`rgb(24, 24, 27)`)
  - `--surface-container`: `#27272a` (`rgb(39, 39, 42)`)
  - `--surface-high`: `#3f3f46` (`rgb(63, 63, 70)`)
  - `--surface-highest`: `#52525b` (`rgb(82, 82, 91)`)
  - `--outline-color`: `#27272a` (borders and dividers)
  - `--outline-variant-color`: `#3f3f46`
  - `--text-color` (Primary Text): `#f4f4f5` (`rgb(244, 244, 245)`)
  - `--text-muted` (Secondary Text): `#a1a1aa` (`rgb(161, 161, 170)`)
- **Light Mode Surfaces:**
  - Background: `#ffffff`
  - Text: `#0a0a0a`
  - Surface Low: `#f4f4f5`
  - Outline: `#e4e4e7`

#### C. Elevation, Borders & 3D Tactile Buttons
- **Borders & Radii:**
  - Buttons & Inputs: `rounded-xl` (`12px`)
  - Feature Cards & Modal Panels: `rounded-2xl` (`16px`)
  - Pill Badges & Nav Shell: `rounded-full` (`9999px`) or `rounded-xl`
- **3D Button Technique (`btn-3d`):**
  - Primary Button: `background: #AD5CFF`, `color: #ffffff`, `box-shadow: #731ED0 0px 2.5px 0px 0px, rgba(173, 92, 255, 0.22) 0px 3px 8px 0px`
  - Active state: `translateY(1.5px)` with reduced bottom offset shadow.
  - Secondary Button: `background: #18181b`, `border: 1px solid #27272a`, `box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 0px 0px, rgba(0, 0, 0, 0.2) 0px 2px 6px 0px`

#### D. Background Patterns & Effects
- **Radial Dot Grid:** `.site-dot-pattern` with `background-image: radial-gradient(rgba(173, 92, 255, 0.25) 1px, transparent 1px)` spaced at `24px` grid intervals.
- **Atmospheric Glow:** Subtle blurred circular gradients (`blur-[100px]`, `background: radial-gradient(circle, rgba(173, 92, 255, 0.08) 0%, transparent 70%)`).

### 2.5 Layout Structure Per Page (Reference)
1. **Home (`/`):**
   - Section 1: Hero — Centered title, floating pill badge, glowing highlight keyword box, dual 3D CTAs.
   - Section 2: 4-Pillar Grid — 4 card layout with mono numbering (`01`, `02`, `03`, `04`), title, description.
   - Section 3: Flagship Event Spotlight — 16:9 banner card, event badge, date, dual action buttons.
   - Section 4: Engineering Terminal ("Why Build With Us?") — Developer stat cards, code snippet aesthetic.
   - Section 5: Learning / Certification Track — Syllabus card, progress metrics, enroll button.
   - Section 6: Community Grants / Partnerships banner.
   - Section 7: Campus & Institution card.
   - Section 8: Lead Spotlight & Founder Quote.
2. **About (`/about`):**
   - Hero: "Engineers by day. Cloud builders by night."
   - Section 1: Identity & Story card grid.
   - Section 2: Mission pillars (4 cards).
   - Section 3: Leadership & Faculty advisors.
3. **Projects (`/projects`):**
   - Header with project count pill.
   - Filter chips (All, Cloud, AI/ML, DevOps, Web).
   - Responsive 3-column project card grid (tags, title, GitHub link, Live demo, author badge).
4. **Events (`/events`):**
   - Header with upcoming vs past filter tabs.
   - Large featured upcoming event card.
   - Event timeline list / cards with dates, speaker slots, venue, registration CTA.
5. **Challenges (`/challenges`):**
   - Active sprint hero card with timer / deadline.
   - Challenge cards with points/bounties, requirements, submit button.
   - Hall of fame / past sprint leaderboard.
6. **Team (`/team`):**
   - Faculty coordinators band.
   - Core team lead spotlight.
   - Team grid organized by domain (Cloud Architecture, AI/ML, Events, Design, Outreach) with social links.
7. **Blog (`/blog`):**
   - Featured article hero.
   - 2-column or 3-column technical article card grid with read-time, tags, publish date.
8. **Gallery (`/gallery`):**
   - Filter tabs (Workshops, Hackathons, Meetups).
   - Masonry / responsive aspect-ratio photo grid.
9. **Contact (`/contact`):**
   - Direct contact channels (Email, Meetup, WhatsApp, LinkedIn, Campus location).
10. **Code of Conduct (`/code-of-conduct`):**
    - Clean prose card layout with community values, reporting procedures, zero-tolerance policies.

### 2.6 Footer Architecture
The reference footer is structured into 3 distinct vertical zones:
1. **Top Banner (CTA Band):**
   - Left: Small chapter pill tag + large uppercase headline (`Build. Ship. Repeat.`).
   - Right: Primary 3D CTA button (`Join the Community →`).
2. **Main 5-Column Grid:**
   - Col 1: Brand logo, chapter name, one-line mission snippet, social media icon buttons.
   - Col 2 & 3: Quick links (internal pages, 2 sub-columns).
   - Col 4: Connect With Us (Community links: Meetup, WhatsApp, Discord, etc.).
   - Col 5: Official Inboxes & Physical Campus Location.
3. **Bottom Bar:**
   - Copyright line and chapter notice.
   - Secondary legal & resource links (Code of Conduct, Privacy, Terms).

---

## 3. Part B: Current Site Audit (`https://aws-sbg-hbtu.vercel.app/`)

### 3.1 Route & Content Inventory
Captured at breakpoints 1440x900, 1024x768, 768x1024, 390x844 (Desktop & Mobile, Dark & Light).
All BEFORE screenshots are archived in `/docs/redesign/current/screenshots/`.

| Route | Page Title | Current Content Baseline & Exact Data |
|---|---|---|
| `/` | AWS Student Builder Group — HBTU Kanpur | **Hero:** Headline: *"Your ideas. Your community. Your AWS SBG."*<br>Subhead: *"Connect with builders who understand your journey. Explore cloud technology, build innovative projects, and grow your technical skills. Your cloud journey starts here at HBTU."*<br>CTAs: "Join the community" (`/join`), "Meetup Group" (`https://www.meetup.com/aws-student-builder-group-hbtu/`).<br>**Platforms Section:** *"Connect Across Our Platforms"* with 4 cards:<br>1. Meetup Group (`meetup.com/aws-student-builder-group-hbtu/`)<br>2. LinkedIn Company Page (`linkedin.com/company/awssbghbtu/`)<br>3. WhatsApp Community (`chat.whatsapp.com/Ks9kB05Odpt8nE2TpjLE4l`...)<br>4. Instagram Spotlights (`instagram.com/aws_sbg_hbtu/`).<br>**Program Overview:** *"About the program"* (3 paragraphs).<br>**FAQs:** 3 expandable accordion items.<br>**Footer:** 7 social links, HBTU address, copyright. |
| `/about` | About Us | Headline: *"About Us"*, Subhead: *"We are the AWS Student Builder Group at HBTU Kanpur, empowering students to innovate on the cloud."*<br>Sections: *"Our Mission"*, *"Why Cloud?"*. |
| `/tracks` | Technical Tracks | Cloud Architecture, AI & Machine Learning, DevOps & CI/CD, Serverless & Web Development. Detailed curriculum bullet points. |
| `/events` | Events & Workshops | Upcoming & past workshops, speaker sessions, hands-on labs, Hackathons, RSVP links. |
| `/team` | Core Team | Student leads, domain coordinators, mentor advisors at HBTU Kanpur. |
| `/join` | Join the Community | Application form with fields (Full Name, Student Email `@hbtu.ac.in`, Branch/Year, Track Interest, Motivation). Writes to Firebase Firestore! |
| `/chat` | Community Assistant | Interactive AI chat helper connected to `/api/chat` / Gemini backend service. |

### 3.2 Functionality & Technical Inventory
- **Firebase Firestore Integration:** Configured in `src/lib/firebase/config.ts`. The `/join` route submits directly to Firebase Firestore. **CRITICAL: Zero changes to collection names, document schemas, or validation rules.**
- **Theme Toggle:** Supports dark and light modes. Persisted via localStorage and DOM class toggle.
- **Chat Service:** Connected via `src/lib/services/chat.ts`. Interactive chat container with message streaming/response handling.
- **Navigation Model Today:** Top navigation bar on desktop; fixed bottom navigation bar (`src/components/layout/MobileNav.tsx`) on mobile.
- **Deep Links & External Targets:** All verified and working (Meetup, LinkedIn, WhatsApp, Instagram, GitHub, X).

---

## 4. Part C: Codebase Repository Audit

- **Framework:** Next.js `14.2.35` (App Router).
- **Core Dependencies:** React 18, Tailwind CSS `3.4.1`, Framer Motion `12.42.1`, Firebase `12.15.0`, Lucide React, Sonner `2.0.7`.
- **Directory Layout:**
  - `src/app/`: File-system routes (`/`, `/about`, `/tracks`, `/events`, `/team`, `/join`, `/chat`, `/login`, `/notifications`, `/admin`).
  - `src/components/ui/`: UI primitives (`Button.tsx`, `Card.tsx`, `Badge.tsx`, `Input.tsx`).
  - `src/components/layout/`: Global layout components (`Header.tsx`, `Footer.tsx`, `Topnav.tsx`, `Sidebar.tsx`, `MobileNav.tsx`).
  - `src/lib/`: Firebase configuration and chat services.
- **Fragile Areas Identified:**
  1. **Firebase SSR vs Client Hydration:** Form submission in `/join/page.tsx` uses client-side Firestore methods. Component must maintain `'use client'` boundary without leaking credentials.
  2. **Mobile Nav Shift:** Replacing the bottom navigation bar with the reference top bar + mobile drawer must be done surgically to prevent routing breaks or layout jump on small screens.
  3. **Tailwind Config Extensions:** Custom colors and CSS variables must be added into `tailwind.config.ts` without removing existing utility mappings that current components rely on.

---

## 5. Part D: Surgical Mapping Matrix

| Reference Pattern / Section | Our Target Route / Section | Our Content Source of Truth | Implementation Component | Status / Content Need |
|---|---|---|---|---|
| Floating Island Header + Logo Chip | Global Shell Header | HBTU Chapter Title + Official Brand Logo placeholder | `<Header />` / `<Topnav />` | Direct Re-skin with HBTU content |
| Mobile Menu Drawer | Global Mobile Nav | Our 7 active routes + 5 placeholder pages | `<MobileDrawer />` | Replaces bottom bar with drawer |
| Hero: Floating Badge + Dual 3D Buttons | `/` Home Hero | Existing HBTU Hero copy & CTAs ("Join community", "Meetup") | `<HeroSection />` | Direct Re-skin (100% existing text) |
| 4-Pillar Grid | `/` Platforms Grid | Existing 4 Platform Links (Meetup, LinkedIn, WhatsApp, IG) | `<PlatformGrid />` | Direct Re-skin (100% existing text) |
| SCD Spotlight Card | `/` Featured Event Spotlight | Existing Next Event / Workshop Data from `/events` | `<EventSpotlight />` | Mapped to HBTU Event; <ImagePlaceholder /> |
| "Why Build With Us?" Terminal | `/` About The Program | Existing 3 Program Overview Paragraphs from Home | `<ProgramOverview />` | Direct Re-skin (100% existing text) |
| Certification / Sprint Track | `/` Tracks Spotlight | Existing Track Data from `/tracks` (Cloud & DevOps) | `<TrackSpotlight />` | Direct Re-skin with HBTU track data |
| Campus / Institution Section | `/` Campus & University | Harcourt Butler Technical University Kanpur Profile | `<CampusProfile />` | HBTU legacy info; <ImagePlaceholder /> |
| Lead Spotlight / Quote | `/` Leadership Spotlight | Core Team Lead Message | `<LeadSpotlight />` | Mapped to HBTU Lead; <ImagePlaceholder /> |
| FAQ Accordion | `/` FAQ Section | Existing 3 HBTU FAQs from Home | `<FaqAccordion />` | Direct Re-skin (100% existing text) |
| 5-Column Footer with CTA Band | Global Footer | Existing 7 Social Links, Email, HBTU Address, Copyright | `<Footer />` | Direct Re-skin with HBTU links |
| Projects Showcase Page | `/projects` (New Page) | `/data/projects.ts` (Empty array) | `<ProjectsPage />` | **Needs Content: Placeholder** |
| Gallery Photo Grid | `/gallery` (New Page) | `/data/gallery.ts` (Empty array) | `<GalleryPage />` | **Needs Content: Placeholder** |
| Tech Blog Page | `/blog` (New Page) | `/data/blog.ts` (Empty array) | `<BlogPage />` | **Needs Content: Placeholder** |
| Challenges & Sprints Page | `/challenges` (New Page) | `/data/challenges.ts` (Empty array) | `<ChallengesPage />` | **Needs Content: Placeholder** |
| Code of Conduct Page | `/code-of-conduct` (New Page) | Standard placeholder panel | `<CodeOfConductPage />` | **Needs Content: Placeholder** |
| Contact Section | `/contact` | Existing email (`aws.sbghbtu@gmail.com`) & platforms | `<ContactPage />` | Reuses existing contact info |

---

## 6. Audit Verification Sign-Off

- [x] All 6 Playwright sessions completed with full-page screenshots, scroll position captures, and videos.
- [x] Extracted design tokens stored in `/docs/redesign/reference/tokens.json`.
- [x] Current production baseline archived in `/docs/redesign/current/content_inventory.json` and `functionality_inventory.json`.
- [x] Repository audit completed in `/docs/redesign/repo_audit.json`.
- [x] Forbidden reference organization strings verified: **0 occurrences** across codebase.
- [x] Zero site code changes made during Phase 0.
