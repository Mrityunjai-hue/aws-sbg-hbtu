# AWS SBG HBTU Kanpur — Content & Schema Guide

This guide details the content architecture, data models, and contribution workflows for the redesigned AWS Student Builder Group HBTU Kanpur website.

All content models adhere to **Rule 7 & 9 (Zero AI / Invented Hallucinations; Labelled Placeholders)**. When new initiatives, real projects, articles, or events are ready, follow the schemas below.

---

## 1. Firebase Firestore Dynamic Collections

Dynamic content that is managed via the admin dashboard (`/admin/` routes) or stored in Firebase Firestore:

### `events` Collection
Managed dynamically at `/admin/create-event` and `/admin/edit-event/[id]`.

```typescript
export interface EventRecord {
  id: string;               // Auto-generated Firestore document ID
  title: string;            // Official event name (e.g. "Cloud Computing 101")
  date: Timestamp | Date;   // Event start date and timestamp
  type: string;             // Tag/Badge: "Workshop" | "Tech Talk" | "Hackathon" | "Meetup"
  time: string;             // Human readable time string (e.g. "10:00 AM IST")
  description?: string;     // Event abstract / syllabus
  linkUrl?: string;         // Registration link (Meetup or Google Form)
  linkText?: string;        // Button label (defaults to "RSVP & Details")
  createdAt?: Timestamp;    // Creation timestamp for sorting
}
```

### `team` Collection
Managed dynamically at `/admin/add-team-member` and `/admin/edit-team-member/[id]`.

```typescript
export interface TeamMember {
  id: string;               // Auto-generated Firestore document ID
  name: string;             // Member's full real name
  role: string;             // Role title (e.g. "Lead Organizer", "Cloud Architect")
  photoUrl?: string;        // Optional real image URL
  email?: string;           // University / contact email
  initial: string;          // Monogram fallback (auto-derived from first character of name)
  createdAt: Timestamp | null;
}
```

### `joinRequests` Collection
Populated whenever a student submits the application form on `/join`.

```typescript
export interface JoinRequest {
  name: string;             // Full name
  email: string;            // University / personal email
  year: string;             // "1" | "2" | "3" | "4" | "alumni"
  createdAt: Timestamp;     // Submission timestamp
}
```

---

## 2. Static Typed Data Schemas (`src/data/`)

Static content modules are typed and initialized with empty arrays `[]` until real student content is reviewed.

### Projects Showcase (`src/data/projects.ts`)
```typescript
import { ProjectItem } from "@/data/projects";

// Example of adding a real student project:
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "campus-cloud-portal",
    title: "HBTU Campus Cloud Portal",
    description: "Serverless student resource hub built with Next.js, AWS Lambda, and DynamoDB.",
    imageSlotId: "PROJECT-COVER-01",
    tags: ["Next.js", "AWS Lambda", "DynamoDB", "TailwindCSS"],
    githubUrl: "https://github.com/aws-sbg-hbtu/campus-cloud-portal",
    demoUrl: "https://portal.hbtu.ac.in",
    authors: ["Student Builder 1", "Student Builder 2"],
    createdAt: "2026-10-01",
  },
];
```

### Community Photo Gallery (`src/data/gallery.ts`)
```typescript
import { GalleryItem } from "@/data/gallery";

// Example of adding a real photo:
export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "inaugural-hackathon-2026",
    title: "AWS SBG HBTU Cloud Hackathon",
    category: "hackathon",
    imageSlotId: "GALLERY-SLOT-01",
    imageUrl: "/images/gallery/01.webp",
    date: "October 2026",
    caption: "Students collaborating on serverless architecture challenges in the computer lab.",
  },
];
```

### Technical Blog & Articles (`src/data/blog.ts`)
```typescript
import { BlogPost } from "@/data/blog";

// Example of adding a real student article:
export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "getting-started-with-aws-bedrock",
    slug: "getting-started-with-aws-bedrock",
    title: "Getting Started with Amazon Bedrock & Foundation Models",
    excerpt: "A practical guide to deploying generative AI models on AWS using Python and LangChain.",
    author: "Technical Track Lead",
    authorRole: "AI/ML Lead",
    readTime: "6 min read",
    publishedAt: "Oct 12, 2026",
    tags: ["Amazon Bedrock", "Generative AI", "Python"],
  },
];
```

### Monthly Challenges & Sprints (`src/data/challenges.ts`)
```typescript
import { ChallengeItem } from "@/data/challenges";

// Example of adding a monthly coding challenge:
export const CHALLENGES_DATA: ChallengeItem[] = [
  {
    id: "serverless-microservices-sprint",
    title: "Serverless URL Shortener Challenge",
    domain: "Serverless",
    difficulty: "Beginner",
    description: "Build an API Gateway + Lambda + DynamoDB URL shortener with sub-100ms response time.",
    deadline: "November 1, 2026",
    reward: "AWS SBG Certificate & Builder Swag",
    submissionUrl: "https://github.com/aws-sbg-hbtu/challenges",
  },
];
```

---

## 3. Strict Quality & Policy Rules

1. **Rule 2 (Forbidden Strings):** Never use forbidden test strings (`Graphic Era`, `GEU`, `Dehradun`, `Pawan`, `Amit`, `awssbggeu`, `SCD 2026`, `KIRO`). Every automated test and build enforces 0 hits.
2. **Rule 6 (Logos):** Only use official AWS logos and real AWS SBG HBTU logos placed in `/public/brand/`. Use `<BrandLogo />` placeholder until official SVG assets are supplied.
3. **Rule 7 (No Hallucinations):** Never invent fictional student names, events, blog posts, or stats. If data is not yet submitted, leave arrays empty (`[]`) so `<EmptyStatePanel />` renders.
