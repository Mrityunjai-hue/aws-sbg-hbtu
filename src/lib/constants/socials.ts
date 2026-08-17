export interface SocialLink {
  name: string;
  url: string;
  description: string;
  iconName: string; // Material symbol or custom SVG identifier
  color: string; // Tailwind color or hex for badges
  hoverColor: string;
}

export const SOCIAL_LINKS = {
  meetup: {
    name: "Meetup",
    url: "https://www.meetup.com/aws-student-builder-group-hbtu/",
    description: "Join our official Meetup group for upcoming events, workshops & tech talks.",
    handle: "@aws-sbg-hbtu",
    color: "#ED1C40",
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/awssbghbtu/",
    description: "Follow our professional network for community updates, achievements & news.",
    handle: "aws-sbg-hbtu",
    color: "#0A66C2",
  },
  whatsapp: {
    name: "WhatsApp Community",
    url: "https://chat.whatsapp.com/Ks9kB05Odpt8nE2TpjLE4l?s=sw&p=a&mlu=0&amv=1",
    description: "Connect directly with fellow builders in our active WhatsApp group.",
    handle: "AWS SBG HBTU Chat",
    color: "#25D366",
  },
  instagram: {
    name: "Instagram",
    url: "https://www.instagram.com/aws_sbg_hbtu/",
    description: "See event highlights, behind-the-scenes, student spotlights & stories.",
    handle: "@aws_sbg_hbtu",
    color: "#E4405F",
  },
  github: {
    name: "GitHub",
    url: "https://github.com/aws-sbg-hbtu",
    description: "Explore open-source cloud projects and repositories built by HBTU students.",
    handle: "aws-sbg-hbtu",
    color: "#181717",
  },
  twitter: {
    name: "X (Twitter)",
    url: "https://x.com/aws_sbg_hbtu",
    description: "Get real-time announcements, event reminders, and tech highlights.",
    handle: "@aws_sbg_hbtu",
    color: "#1DA1F2",
  },
  email: {
    name: "Email Us",
    url: "mailto:aws.sbghbtu@gmail.com",
    description: "Reach out to the core team for queries, collaborations or sponsorships.",
    handle: "aws.sbghbtu@gmail.com",
    color: "#FF9900",
  },
} as const;

export const SOCIAL_LINKS_ARRAY = [
  SOCIAL_LINKS.meetup,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.whatsapp,
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.twitter,
  SOCIAL_LINKS.email,
];
