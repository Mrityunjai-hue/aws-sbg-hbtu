# AWS SBG HBTU — Redesign Implementation Plan (PLAN.md)

> **Document Type:** Phase 0 Implementation Architecture & Execution Plan  
> **Status:** Pending User Approval (STOP Gate before Phase 1)  
> **Target Branch:** `redesign/ui-v2`  
> **Production Baseline:** https://aws-sbg-hbtu.vercel.app/  
> **Reference Prototype:** https://awssbggeu.com/  
> **Date:** October 12, 2026  

---

## 1. Proposed Design Tokens & Palette System (Awaiting User Selection)

From the Playwright computed styles audit of the reference site, we extracted its exact color values, surface tiering, and typography. We now present two color token options for user review and approval before locking the system:

### 1.1 Option A: Faithful Reference Replica (Electric Purple & Obsidian)
Matches the exact extracted values of `awssbggeu.com`:
- **Primary Brand Accent:** `#AD5CFF` (Electric Purple)
- **Primary Accent Hover / Active:** `#9C47FF` / `#731ED0` (Deep Purple)
- **Glow & Atmospheric Tint:** `rgba(173, 92, 255, 0.22)`
- **Dot-Grid Pattern:** `radial-gradient(rgba(173, 92, 255, 0.25) 1px, transparent 1px)`
- **Dark Mode Background (`--bg-color`):** `#09090b` (Zinc 950 / Obsidian)
- **Dark Mode Surfaces:**
  - `--surface-lowest`: `#09090b`
  - `--surface-low`: `#18181b` (Cards, navbar island, dropdowns)
  - `--surface-container`: `#27272a` (Card hover, button secondary)
  - `--surface-high`: `#3f3f46` (Badge backgrounds, borders)
  - `--outline-color`: `#27272a` (Dividers, borders)
- **Text & Typography:**
  - `--text-color`: `#f4f4f5` (Zinc 100)
  - `--text-muted`: `#a1a1aa` (Zinc 400)
- **Light Mode:**
  - `--bg-color`: `#ffffff`
  - `--surface-low`: `#f4f4f5`
  - `--outline-color`: `#e4e4e7`
  - `--text-color`: `#09090b`

### 1.2 Option B: Recommended Hybrid (Reference Purple + Official AWS Builder Orange Accents)
Preserves the reference site's exact purple visual hierarchy, while introducing official AWS brand harmony (`#FF9900` / `#EC7211`) for key CTAs, certification badges, and builder tags:
- **Primary Accent (Structural & Glow):** `#AD5CFF` (Purple borders, hero highlight box, dot-grid, glows)
- **Secondary Accent (Action & Brand):** `#FF9900` (AWS Builder Smile Orange for primary interactive CTAs like *"Join Community"* or *"Meetup Group"*)
- **Tertiary Accent (Success / Live):** `#10B981` (Emerald Green for *"LIVE"* pills or open registrations)
- **Dark Mode Surfaces:** Identical to Option A (`#09090b`, `#18181b`, `#27272a`).

### 1.3 CSS Variable Token Dictionary (Proposed)
```css
:root {
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Light Theme Defaults */
  --bg-color: #ffffff;
  --surface-low: #f4f4f5;
  --surface-container: #e4e4e7;
  --surface-high: #d4d4d8;
  --outline-color: #e4e4e7;
  --text-color: #09090b;
  --text-muted: #71717a;
  --primary-accent: #8E35EA;
  --primary-glow: rgba(142, 53, 234, 0.15);
  --btn-3d-shadow: #6b21a8;
}

.dark {
  /* Dark Theme Tokens (Exact Reference Match) */
  --bg-color: #09090b;
  --surface-lowest: #09090b;
  --surface-low: #18181b;
  --surface-container: #27272a;
  --surface-high: #3f3f46;
  --surface-highest: #52525b;
  --outline-color: #27272a;
  --outline-variant-color: #3f3f46;
  --text-color: #f4f4f5;
  --text-muted: #a1a1aa;
  --primary-accent: #AD5CFF;
  --primary-glow: rgba(173, 92, 255, 0.22);
  --grid-color: rgba(173, 92, 255, 0.22);
  --btn-3d-shadow: #731ED0;
}
```

---

## 2. Typography Specification

- **Primary Sans / Display Font:** `Plus Jakarta Sans` via Next.js `next/font/google`:
  - Weights: `400 (regular)`, `500 (medium)`, `600 (semibold)`, `700 (bold)`, `800 (extrabold)`, `900 (black)`
  - Subsets: `latin`
  - Variable: `--font-sans`
- **Monospace Font:** `JetBrains Mono` via Next.js `next/font/google`:
  - Weights: `400`, `600`, `700`
  - Variable: `--font-mono`
- **Fallback Stack:** `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

---

## 3. Global Navigation & Shell Architecture (Phase 1)

### 3.1 Header Navigation Layout
- **Desktop (`xl:flex` >= 1280px):**
  - **Left:** AWS SBG HBTU Brand Chip (`<BrandLogo />` placeholder + "AWS Student Builder Group HBTU" subtext).
  - **Center Floating Nav Pill:**
    - Item 1: **Tracks** (`/tracks`) with active indicator or badge
    - Item 2: **About** (`/about`)
    - Item 3: **Projects** (`/projects`) *(Placeholder page)*
    - Item 4: **Events** (`/events`)
    - Item 5: **Challenges** (`/challenges`) *(Placeholder page)*
    - Item 6: **Core Team** (`/team`)
    - Item 7: **Blog** (`/blog`) *(Placeholder page)*
    - Item 8: **Gallery** (`/gallery`) *(Placeholder page)*
    - Item 9: **Contact** (`/contact`)
  - **Right Action Area:**
    - Theme Toggle button (Dark / Light switch with icon animation)
    - Action CTA Button: "JOIN GROUP" (`/join`) or "CHAT" (`/chat`) with `btn-3d-secondary` styling.
- **Mobile (`xl:hidden` < 1280px):**
  - Clean top bar with brand chip on the left, theme toggle and hamburger trigger on the right.
  - Clicking trigger opens the slide-in **Mobile Drawer**:
    - Header with close button
    - Full vertical list of routes with monospaced tag indices (`01 / TRACKS`, `02 / ABOUT`, `03 / PROJECTS`, etc.)
    - Direct CTA button: "JOIN THE COMMUNITY" (`/join`)
    - Contact email snippet at bottom

### 3.2 Deep Link & URL Integrity Guarantee
- Every existing URL continues to work identically:
  - `/` (Home)
  - `/about`
  - `/tracks`
  - `/events`
  - `/team`
  - `/join`
  - `/chat`
  - `/login`
  - `/notifications`
  - `/admin`
- New routes introduced cleanly:
  - `/projects`
  - `/gallery`
  - `/blog`
  - `/challenges`
  - `/code-of-conduct`
  - `/contact`

---

## 4. Reusable Component Library (Phase 2)

All components will be built in `src/components/ui/` and `src/components/features/` with full accessibility (ARIA, focus-visible, keyboard navigation):

1. **`Button` (`btn-3d` variants):**
   - `variant="primary"`: Purple 3D tactile button with bottom border shadow and press translation.
   - `variant="secondary"`: Obsidian surface button with subtle border and elevation.
   - `variant="outline"` / `variant="ghost"`.
2. **`SectionHeader`:**
   - Small mono badge tag (e.g. `// 01 · COMMUNITY PLATFORMS`), large uppercase display heading (`font-extrabold`), description paragraph.
3. **`PlatformCard`:**
   - 4-card grid replicating the reference pillar cards for Meetup, LinkedIn, WhatsApp, and Instagram.
4. **`EventSpotlightCard`:**
   - Featured event hero card with 16:9 banner placeholder, countdown/date badge, title, location, dual action buttons.
5. **`FaqAccordion`:**
   - Expandable animated accordion items for HBTU's 3 FAQs, featuring plus/minus icon transition and zero layout jump.
6. **`ImagePlaceholder`:**
   - Standardized component: exact aspect ratio, visible neutral badge label (`e.g. "EVENT-01 · 16:9 · 1280x720"`), neutral background, stable id.
7. **`EmptyStatePanel` & `SkeletonCard`:**
   - Standardized panel for new placeholder pages: "Content Coming Soon", builder icon, neutral action button, zero fake content.

---

## 5. Page-by-Page Rebuild Sequence (Phase 3)

We will rebuild and verify each page in strict sequential order:

1. **Home (`/`):**
   - Retains 100% of HBTU existing content:
     - Hero: Headline *"Your ideas. Your community. Your AWS SBG."*, both CTAs (*"Join the community"*, *"Meetup Group"*).
     - Platforms Grid: Meetup, LinkedIn, WhatsApp, Instagram with existing URLs.
     - About the Program: 3 paragraphs of HBTU text in the reference terminal/code aesthetic.
     - FAQs: 3 existing questions and answers in the accordion pattern.
     - Footer: All 7 social/contact links, HBTU address, copyright line.
2. **About (`/about`):**
   - Retains existing mission, "Why Cloud?" sections, HBTU student builder story.
3. **Tracks (`/tracks`):**
   - Retains all 4 existing tracks (Cloud Architecture, AI/ML, DevOps, Serverless) mapped into reference sprint/track cards.
4. **Events (`/events`):**
   - Retains all existing event data, workshops, and RSVP links.
5. **Team (`/team`):**
   - Retains existing Core Team directory, faculty coordinators, and social links.
6. **Join (`/join`):**
   - Retains existing form fields, validation, and direct Firebase Firestore writes. Zero breakage.
7. **Chat (`/chat`):**
   - Retains existing chat service integration, message history, and assistant interface.
8. **Placeholder Pages:**
   - `/projects`: Layout with filters and `<EmptyStatePanel />` backed by typed `/data/projects.ts: []`.
   - `/gallery`: Grid layout with `<EmptyStatePanel />` backed by `/data/gallery.ts: []`.
   - `/blog`: Article grid layout with `<EmptyStatePanel />` backed by `/data/blog.ts: []`.
   - `/challenges`: Sprint layout with `<EmptyStatePanel />` backed by `/data/challenges.ts: []`.
   - `/code-of-conduct`: Formal policy card layout placeholder.
9. **Contact (`/contact`):**
   - Dedicated contact hub using verified email (`aws.sbghbtu@gmail.com`) and social links.
10. **404 / Error Page:**
    - Re-skinned error page matching the new theme.

---

## 6. Image Manifest & Brand Assets

- **Brand Logos:**
  - Official AWS logo and AWS SBG HBTU logo will be placed in `/public/brand/` once supplied by user.
  - Until supplied, rendered via a neutral, labeled placeholder box (`<BrandPlaceholder label="AWS SBG HBTU LOGO" />`).
- **Image Manifest (`IMAGE_MANIFEST.md`):**
  - Generated in Phase 2/3 listing every image slot: slot ID, page, container dimensions, aspect ratio, alt text, and replacement snippet.

---

## 7. Quality Gates & Verification Protocol

Every phase must pass all quality gates with documented evidence:
1. **Rule 2 Zero-Forbidden-String Scan:** Automated check for `"Graphic Era"`, `"GEU"`, `"Dehradun"`, `"Pawan"`, `"Amit"`, `"awssbggeu"`, `"SCD 2026"`, `"KIRO"`. Must return 0 hits.
2. **Playwright Visual Regression:** Side-by-side screenshot comparisons at 1440px and 390px against BEFORE captures and reference captures.
3. **WCAG 2.1 AA Accessibility:** Playwright `axe-core` accessibility scan (contrast, ARIA, focus order, pinch-zoom enabled).
4. **Lighthouse Mobile 90+:** Target 90+ on Performance, Accessibility, Best Practices, and SEO.
5. **Regression Verification:** Forms submit to Firebase, chat responds, theme toggles, all external links intact, zero console errors.

---

## 8. Explicit Approval Request

In accordance with Phase 0 instructions, execution is halted here awaiting user review and approval:
1. Do you approve the proposed design tokens, and would you prefer **Option A (Pure Reference Purple)** or **Option B (Recommended Hybrid with AWS Orange accents)**?
2. Do you approve proceeding to **Phase 1: Foundation** on branch `redesign/ui-v2`?
