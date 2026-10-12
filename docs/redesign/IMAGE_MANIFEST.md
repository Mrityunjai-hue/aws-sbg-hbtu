# AWS SBG HBTU Kanpur — Image Manifest & Asset Guide

This manifest catalogues every image slot across the redesigned AWS Student Builder Group HBTU Kanpur website. In accordance with **Rule 6 (Official Logos Only)** and **Rule 7 & 9 (Zero AI / Stock Hallucinations; Labelled Placeholders)**, all missing or non-supplied assets render clean, labelled SVG/canvas placeholders with stable slot IDs.

When real photographs, campus media, or official branding assets are ready, drop the files into `/public/brand/` or `/public/images/` and follow the drop-in replacement syntax below.

---

## 1. Brand & Identity Assets

| Slot ID | Placement | Dimensions | Format | Target Path | Fallback State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `BRAND-LOGO-PRIMARY` | Desktop Topnav & Mobile Drawer header | 180×44 px | SVG / Transparent PNG | `/public/brand/aws-sbg-hbtu-logo.svg` | `<BrandLogo />` labelled pill placeholder |
| `BRAND-LOGO-FOOTER` | Main Site Footer Brand column | 180×44 px | SVG / Transparent PNG | `/public/brand/aws-sbg-hbtu-logo.svg` | `<BrandLogo />` labelled pill placeholder |
| `BRAND-AWS-OFFICIAL` | AWS Badge / Powered By identifier | 60×36 px | SVG | `/public/brand/aws-smile.svg` | Labelled AWS monospace pill tag |

### Replacement Syntax
```tsx
// Before (Current state in Topnav.tsx, Footer.tsx):
<BrandLogo />

// After (When /public/brand/aws-sbg-hbtu-logo.svg is provided):
<Image
  src="/brand/aws-sbg-hbtu-logo.svg"
  alt="AWS Student Builder Group HBTU Kanpur"
  width={180}
  height={44}
  priority
  className="h-8 w-auto object-contain"
/>
```

---

## 2. Hero & Editorial Banners

| Slot ID | Page & Section | Aspect Ratio | Min Dimensions | Target Path | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `HERO-IMG-01` | Home Page (`/`) Hero section right | 4:3 | 800×600 px | `/public/images/home-hero.webp` | Real photo of HBTU builders in workshop or computer lab |
| `ABOUT-CAMPUS-01` | About Page (`/about`) Campus feature | 16:9 | 1200×675 px | `/public/images/hbtu-campus.webp` | Real photograph of Harcourt Butler Technical University Kanpur campus |
| `ABOUT-COMMUNITY-01` | About Page (`/about`) Community culture | 4:3 | 800×600 px | `/public/images/about-community.webp` | HBTU students collaborating around laptops |

### Replacement Syntax
```tsx
// Before:
<ImagePlaceholder
  id="HERO-IMG-01"
  label="AWS SBG HBTU HERO MEDIA"
  aspectRatio="4:3"
  sublabel="HBTU Kanpur Campus Workshop"
/>

// After:
<div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border-hairline shadow-xl">
  <Image
    src="/images/home-hero.webp"
    alt="AWS Student Builder Group HBTU members in workshop"
    fill
    className="object-cover"
    priority
  />
</div>
```

---

## 3. Technical Tracks

| Slot ID | Track Domain | Aspect Ratio | Dimensions | Target Path | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TRACK-CLOUD-01` | Cloud Foundations & Architecture | 16:9 | 640×360 px | `/public/images/tracks/cloud.webp` | Cloud computing diagrams, AWS console labs |
| `TRACK-DEVOPS-01` | DevOps, CI/CD & Automation | 16:9 | 640×360 px | `/public/images/tracks/devops.webp` | Containers, Docker, GitHub Actions, AWS CDK |
| `TRACK-AIML-01` | AI/ML & Generative AI on AWS | 16:9 | 640×360 px | `/public/images/tracks/aiml.webp` | Amazon Bedrock, SageMaker, PyTorch hands-on |
| `TRACK-SECURITY-01` | Cloud Security & Identity | 16:9 | 640×360 px | `/public/images/tracks/security.webp` | AWS IAM, KMS, Security Hub architectural labs |

### Replacement Syntax
```tsx
// Before:
<ImagePlaceholder
  id="TRACK-CLOUD-01"
  label="CLOUD ARCHITECTURE TRACK"
  aspectRatio="16:9"
/>

// After:
<Image
  src="/images/tracks/cloud.webp"
  alt="Cloud Foundations & Architecture track cover"
  width={640}
  height={360}
  className="w-full h-auto object-cover rounded-xl"
/>
```

---

## 4. Events & Workbooks

| Slot ID Pattern | Page & Section | Aspect Ratio | Dimensions | Target Path | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `EVENT-IMG-[ID]` | Events Page (`/events`) & EventCard | 16:9 | 640×360 px | `/public/images/events/[event-id].webp` | Official event poster / announcement banner |

### Dynamic Replacement in `EventCard.tsx`
`EventCard` automatically uses `event.imageUrl` if available in the Firebase `events` document. When not present, it renders `<ImagePlaceholder id={slotId} />`.

---

## 5. Team & Contributor Avatars

| Slot ID Pattern | Page & Section | Aspect Ratio | Dimensions | Target Path | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TEAM-MEMBER-[ID]` | Team Page (`/team`) & TeamMemberCard | 1:1 | 400×400 px | `/public/images/team/[member-id].webp` | Real member headshot / portrait |

### Dynamic Replacement in `TeamMemberCard.tsx`
`TeamMemberCard` automatically uses `member.photoUrl` from Firebase if provided. When null or empty, it renders the member's official initial monogram badge inside an obsidian styled container.

---

## 6. Community Showcase & Gallery (Future Slots)

| Slot ID | Page & Section | Aspect Ratio | Dimensions | Target Path | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GALLERY-SLOT-01` | Gallery (`/gallery`) | 4:3 | 800×600 px | `/public/images/gallery/01.webp` | Real meetup group photo at HBTU Kanpur |
| `GALLERY-SLOT-02` | Gallery (`/gallery`) | 4:3 | 800×600 px | `/public/images/gallery/02.webp` | Real speaker keynote / interactive presentation |
| `GALLERY-SLOT-03` | Gallery (`/gallery`) | 4:3 | 800×600 px | `/public/images/gallery/03.webp` | Hackathon hacking session late night |
| `GALLERY-SLOT-04` | Gallery (`/gallery`) | 4:3 | 800×600 px | `/public/images/gallery/04.webp` | Certificate & swag distribution |

---

## 7. Quality & File Guidelines

1. **Format:** WebP or optimized SVG preferred. JPEG acceptable for complex photos.
2. **Compression:** Max file size 250 KB per image for fast page loads on 4G/mobile.
3. **Accessibility:** Always include meaningful, descriptive `alt` text mentioning HBTU context.
4. **Licensing:** Only use photos taken by HBTU SBG members or supplied by HBTU students. Never use uncredited stock photography.
