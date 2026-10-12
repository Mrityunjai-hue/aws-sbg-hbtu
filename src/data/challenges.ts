export interface ChallengeVerificationQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChallengeDayModule {
  day: number;
  dateStr: string;
  moduleNumber: number;
  title: string;
  skillBuilderCourseName: string;
  summary: string;
  keyConcepts: string[];
  skillBuilderUrl: string;
  estimatedMinutes: number;
  basePoints: number;
  quizPoints: number;
  verificationQuestion: ChallengeVerificationQuestion;
}

export interface LeaderboardStudent {
  id: string;
  name: string;
  rollOrHandle: string;
  branch: string;
  year: string;
  targetCert: string;
  points: number;
  streakDays: number;
  completedDays: number[];
  badge: "Voucher Winner (Top 1)" | "Voucher Winner (Top 2)" | "Voucher Winner (Top 3)" | "Top 5 Finalist" | "Priority Builder";
  avatarMonogram: string;
}

export interface ChallengeSprintDetails {
  id: string;
  title: string;
  subtitle: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED";
  startDate: string;
  durationDays: number;
  officialSkillBuilderUrl: string;
  leaderAnnouncement: {
    author: string;
    authorRole: string;
    avatarMonogram: string;
    updatedDate: string;
    rawMessage: string;
  };
  prizes: {
    title: string;
    description: string;
    badge: string;
    icon: string;
  }[];
  modules: ChallengeDayModule[];
}

export const ACTIVE_14DAY_CHALLENGE: ChallengeSprintDetails = {
  id: "aws-14day-cloud-practitioner-2026",
  title: "14-Day AWS Cloud Practitioner Challenge",
  subtitle: "Master Cloud Computing Fundamentals, Build a 14-Day Learning Streak & Qualify for Official AWS Certification Vouchers",
  status: "ACTIVE",
  startDate: "Wednesday, 14 October 2026",
  durationDays: 14,
  officialSkillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
  leaderAnnouncement: {
    author: "AWS SBG Chapter Leadership",
    authorRole: "AWS Student Builder Group HBTU Kanpur",
    avatarMonogram: "SBG",
    updatedDate: "October 12, 2026",
    rawMessage: `🚀 Update on Our 14-Day AWS Learning Challenge!

Hey everyone! 👋

Due to some technical issues with the website, we’ll be starting our learning challenge this Wednesday, 14 October, instead of Monday. Thank you for your patience and understanding! 🙌

📚 Meanwhile, let's prepare!

Before diving into cloud computing and AWS fundamentals, it's important to understand which AWS certification you should aim for and what each certification offers.

📄 I'm sharing a PDF to help you explore the different AWS certifications and choose the right learning path for yourself.

Please go through the PDF before we begin so we can start our journey with clarity and the right goals! 🎯

Let's learn and grow together! ☁️🚀`,
  },
  prizes: [
    {
      title: "Top 3 Performers: 100% Sponsored AWS Exam Vouchers",
      description: "Rank 1st, 2nd, and 3rd on the final verified leaderboard receive fully sponsored official AWS Certification exam vouchers (valued at $100+ USD) to sit for the AWS Certified Cloud Practitioner examination.",
      badge: "VOUCHER SPONSORSHIP",
      icon: "confirmation_number",
    },
    {
      title: "Top 4 & 5 Finalists: Special Merit Cloud Awards",
      description: "Rank 4th and 5th receive AWS Student Builder Group Recognition Certificates, cloud swags, and priority access to AWS Community Day hackathons.",
      badge: "TOP 5 RECOGNITION",
      icon: "military_tech",
    },
    {
      title: "All Verified Completers: Priority Community Member",
      description: "Every student who maintains their learning streak and completes all modules earns official Priority Community Member status with mentor pairing and technical sprint invites.",
      badge: "PRIORITY MEMBERSHIP",
      icon: "verified_user",
    },
  ],
  modules: [
    {
      day: 1,
      dateStr: "Day 1 · Wed, Oct 14",
      moduleNumber: 1,
      title: "Introduction to Amazon Web Services & Cloud Concepts",
      skillBuilderCourseName: "Module 1: Introduction to Amazon Web Services",
      summary: "Understand what cloud computing is, client-server basics, public vs private vs hybrid clouds, and how AWS global infrastructure powers modern software.",
      keyConcepts: ["Client-Server Model", "Cloud Computing Deployment Models", "AWS Global Footprint", "Benefits of Cloud"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 45,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "Which cloud deployment model enables an organization to run latency-critical workloads on their private on-premises servers while seamlessly using AWS for burst computing and analytics?",
        options: [
          "Public Cloud",
          "Private Cloud",
          "Hybrid Cloud",
          "SaaS Multi-Tenant"
        ],
        correctIndex: 2,
        explanation: "A Hybrid cloud model seamlessly connects on-premises or legacy corporate infrastructure with AWS cloud resources, allowing data and compute to be shared dynamically."
      }
    },
    {
      day: 2,
      dateStr: "Day 2 · Thu, Oct 15",
      moduleNumber: 2,
      title: "Compute in the Cloud (Part 1: Amazon EC2 & Sizing)",
      skillBuilderCourseName: "Module 2: Compute in the Cloud (EC2 Focus)",
      summary: "Explore virtual servers in the cloud with Amazon Elastic Compute Cloud (EC2). Learn about EC2 instance types, auto scaling groups, and purchasing models.",
      keyConcepts: ["Amazon EC2 Instances", "General vs Compute vs Memory Optimized", "On-Demand vs Spot vs Reserved", "EC2 Auto Scaling"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "Which Amazon EC2 purchasing option offers up to a 90% discount compared to On-Demand pricing and is optimal for fault-tolerant workloads that can withstand unexpected interruptions?",
        options: [
          "Reserved Instances",
          "Dedicated Hosts",
          "Spot Instances",
          "Compute Savings Plans"
        ],
        correctIndex: 2,
        explanation: "Spot Instances utilize spare AWS compute capacity at deep discounts (up to 90%), but AWS can reclaim instances with a 2-minute warning if capacity is needed elsewhere."
      }
    },
    {
      day: 3,
      dateStr: "Day 3 · Fri, Oct 16",
      moduleNumber: 2,
      title: "Compute in the Cloud (Part 2: Containers & Serverless)",
      skillBuilderCourseName: "Module 2: Compute in the Cloud (Serverless & Containers)",
      summary: "Dive into modern application compute architectures using containers (Amazon ECS, Amazon EKS) and event-driven serverless computing with AWS Lambda.",
      keyConcepts: ["Amazon ECS & EKS", "AWS Fargate (Serverless Containers)", "AWS Lambda Event Driven", "AWS Elastic Beanstalk"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 45,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "A student developer wants to execute image resizing code only when a new photo is uploaded, paying exclusively for the exact milliseconds the code runs without managing any servers. Which service should they choose?",
        options: [
          "Amazon EC2",
          "AWS Lambda",
          "AWS Elastic Beanstalk",
          "Amazon Lightsail"
        ],
        correctIndex: 1,
        explanation: "AWS Lambda is a serverless compute service where you run code without provisioning or managing servers, billed strictly by execution duration in milliseconds."
      }
    },
    {
      day: 4,
      dateStr: "Day 4 · Sat, Oct 17",
      moduleNumber: 3,
      title: "Global Infrastructure & High Availability Architecture",
      skillBuilderCourseName: "Module 3: Global Infrastructure and Reliability",
      summary: "Understand how AWS structures its worldwide physical footprint into Regions, Availability Zones (AZs), and Edge Locations to achieve high availability and low latency.",
      keyConcepts: ["AWS Regions", "Availability Zones (AZs)", "Edge Locations & CloudFront", "Fault Tolerance & DR"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 45,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "An AWS Region is accurately described as which of the following physical architectures?",
        options: [
          "A single large standalone data center building in a major city",
          "A geographic location containing two or more discrete, isolated Availability Zones connected via low-latency links",
          "A global network of edge locations used solely for DNS resolution",
          "A virtual data center software stack provided by a third-party vendor"
        ],
        correctIndex: 1,
        explanation: "Each AWS Region consists of multiple isolated and physically separated Availability Zones (AZs) connected through redundant, low-latency private fiber."
      }
    },
    {
      day: 5,
      dateStr: "Day 5 · Sun, Oct 18",
      moduleNumber: 4,
      title: "Networking in the Cloud (Part 1: VPCs & Subnet Design)",
      skillBuilderCourseName: "Module 4: Networking (VPC Fundamentals)",
      summary: "Design isolated cloud networks with Amazon Virtual Private Cloud (VPC). Understand CIDR blocks, public vs private subnets, and Internet Gateways (IGW).",
      keyConcepts: ["Amazon VPC", "Public vs Private Subnets", "Internet Gateway (IGW)", "NAT Gateway"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "Which VPC networking component must be attached to a VPC to enable EC2 instances inside a public subnet to communicate directly with the public internet?",
        options: [
          "Virtual Private Gateway (VGW)",
          "Internet Gateway (IGW)",
          "Customer Gateway",
          "Network Address Translation (NAT) Instance"
        ],
        correctIndex: 1,
        explanation: "An Internet Gateway (IGW) is a horizontally scaled, redundant VPC component that enables communication between instances in public subnets and the internet."
      }
    },
    {
      day: 6,
      dateStr: "Day 6 · Mon, Oct 19",
      moduleNumber: 4,
      title: "Networking in the Cloud (Part 2: Security Groups & NACLs)",
      skillBuilderCourseName: "Module 4: Networking (Routing & Traffic Security)",
      summary: "Learn how traffic is routed and protected in AWS. Contrast stateful Security Groups at the instance layer with stateless Network Access Control Lists (NACLs) at the subnet boundary.",
      keyConcepts: ["Route Tables", "Security Groups (Stateful)", "Network ACLs (Stateless)", "AWS Direct Connect"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 45,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "What is a primary distinction between AWS Security Groups and Network Access Control Lists (NACLs)?",
        options: [
          "Security Groups are stateless; NACLs are stateful",
          "Security Groups operate at the instance level and are stateful; NACLs operate at the subnet level and are stateless",
          "Security Groups only support outbound rules; NACLs only support inbound rules",
          "NACLs only inspect traffic originating from Amazon CloudFront"
        ],
        correctIndex: 1,
        explanation: "Security Groups are stateful firewalls operating at the EC2 instance level, while Network ACLs are stateless filters operating at the subnet boundary."
      }
    },
    {
      day: 7,
      dateStr: "Day 7 · Tue, Oct 20",
      moduleNumber: 4,
      title: "Mid-Sprint Milestone & Cost Governance Sprint",
      skillBuilderCourseName: "Checkpoint Review: Architecture & Cost Monitoring",
      summary: "Celebrate your 7-day streak! Review compute and networking foundations, and explore AWS Cost Explorer and AWS Budgets to prevent unexpected billing.",
      keyConcepts: ["Mid-Sprint Review", "AWS Cost Explorer", "AWS Budgets & Alerts", "AWS Free Tier"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 40,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "Which AWS financial tool allows you to set custom spending thresholds and alerts you via email or SNS when your forecast exceeds your allocated budget?",
        options: [
          "AWS Cost Explorer",
          "AWS Budgets",
          "AWS Trusted Advisor",
          "AWS CloudWatch Synthetics"
        ],
        correctIndex: 1,
        explanation: "AWS Budgets enables you to set custom budgets that alert you when your cost or usage exceeds (or is forecasted to exceed) your budgeted amount."
      }
    },
    {
      day: 8,
      dateStr: "Day 8 · Wed, Oct 21",
      moduleNumber: 5,
      title: "Storage in the Cloud (Amazon S3, EBS, and EFS)",
      skillBuilderCourseName: "Module 5: Storage and Databases (Storage Focus)",
      summary: "Understand the three foundational storage types: block storage (EBS), object storage (S3), and shared file systems (EFS). Learn S3 storage tiers and lifecycle policies.",
      keyConcepts: ["Amazon Elastic Block Store (EBS)", "Amazon Simple Storage Service (S3)", "Amazon Elastic File System (EFS)", "S3 Standard vs Glacier"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "Which AWS storage service provides scalable object storage with 99.999999999% (11 9's) durability and supports automatic lifecycle transitions to lower-cost archival tiers?",
        options: [
          "Amazon Elastic Block Store (EBS)",
          "Amazon Elastic File System (EFS)",
          "Amazon S3",
          "AWS Snowball Edge"
        ],
        correctIndex: 2,
        explanation: "Amazon S3 stores data redundantly across multiple AZs offering 11 9's of durability and automated lifecycle tiering (e.g. S3 Standard to Glacier)."
      }
    },
    {
      day: 9,
      dateStr: "Day 9 · Thu, Oct 22",
      moduleNumber: 5,
      title: "Databases in the Cloud (RDS, Aurora, DynamoDB, Redshift)",
      skillBuilderCourseName: "Module 5: Storage and Databases (Database Focus)",
      summary: "Explore relational databases with Amazon RDS and Amazon Aurora, NoSQL key-value stores with Amazon DynamoDB, and petabyte-scale data warehousing with Amazon Redshift.",
      keyConcepts: ["Amazon RDS (SQL)", "Amazon Aurora High Performance", "Amazon DynamoDB (NoSQL)", "Amazon Redshift Data Warehouse"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "A high-traffic e-commerce cart requires single-digit millisecond latency at any scale without managing relational schemas or database servers. Which AWS service is best suited?",
        options: [
          "Amazon RDS for MySQL",
          "Amazon DynamoDB",
          "Amazon Redshift",
          "Amazon OpenSearch Service"
        ],
        correctIndex: 1,
        explanation: "Amazon DynamoDB is a fully managed, serverless NoSQL database that delivers consistent single-digit millisecond latency at any scale."
      }
    },
    {
      day: 10,
      dateStr: "Day 10 · Fri, Oct 23",
      moduleNumber: 6,
      title: "Cloud Security & The AWS Shared Responsibility Model",
      skillBuilderCourseName: "Module 6: Security in the Cloud",
      summary: "Master the AWS Shared Responsibility Model. Learn Identity and Access Management (IAM), policies, least privilege principle, MFA, AWS Shield, and AWS KMS encryption.",
      keyConcepts: ["Shared Responsibility Model", "AWS IAM Users & Roles", "Principle of Least Privilege", "AWS WAF & Shield DDoS Protection"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "According to the AWS Shared Responsibility Model, which responsibility falls exclusively on the customer?",
        options: [
          "Physical security and environmental controls in AWS data centers",
          "Hypervisor virtualization maintenance and hardware lifecycle",
          "Configuring IAM user access permissions and patching guest operating systems on EC2",
          "Disposing of decommissioned storage hard disk drives"
        ],
        correctIndex: 2,
        explanation: "AWS is responsible for 'Security OF the Cloud' (hardware, facilities, hypervisor). The customer is responsible for 'Security IN the Cloud' (IAM, OS patches, encryption, firewall rules)."
      }
    },
    {
      day: 11,
      dateStr: "Day 11 · Sat, Oct 24",
      moduleNumber: 7,
      title: "Monitoring, Auditing, and Governance (CloudWatch vs CloudTrail)",
      skillBuilderCourseName: "Module 7: Monitoring and Analytics",
      summary: "Understand observability in AWS. Contrast Amazon CloudWatch (metrics, alarms, logs) with AWS CloudTrail (API audit logs for who did what and when), plus AWS Trusted Advisor.",
      keyConcepts: ["Amazon CloudWatch Alarms", "AWS CloudTrail API Auditing", "AWS Trusted Advisor 5 Pillars", "AWS Config"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 45,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "If a cloud administrator needs to investigate which IAM identity terminated an EC2 instance yesterday and which IP address made the API call, which service provides this audit trail?",
        options: [
          "Amazon CloudWatch Metrics",
          "AWS CloudTrail",
          "AWS Trusted Advisor",
          "Amazon Inspector"
        ],
        correctIndex: 1,
        explanation: "AWS CloudTrail records user activity and API calls made across your AWS account, capturing caller identity, timestamp, source IP, and parameters."
      }
    },
    {
      day: 12,
      dateStr: "Day 12 · Sun, Oct 25",
      moduleNumber: 8,
      title: "Pricing Models, Billing, and AWS Support Plans",
      skillBuilderCourseName: "Module 8: Pricing and Support",
      summary: "Learn how AWS charges for resources (compute, storage, outbound data transfer). Compare the 4 official AWS Support Plans: Basic, Developer, Business, and Enterprise.",
      keyConcepts: ["Data Transfer In vs Out", "AWS Pricing Calculator", "4 AWS Support Plans", "Technical Account Manager (TAM)"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 45,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "Which AWS Support Plan is the lowest tier that provides 24x7 phone, chat, and email access to Cloud Support Engineers with a 1-hour response time for production down emergencies?",
        options: [
          "AWS Basic Support",
          "AWS Developer Support",
          "AWS Business Support",
          "AWS Enterprise Support only"
        ],
        correctIndex: 2,
        explanation: "AWS Business Support offers 24x7 phone, chat, and email support with a 1-hour response SLA for production systems down. (Developer only offers email support during business hours)."
      }
    },
    {
      day: 13,
      dateStr: "Day 13 · Mon, Oct 26",
      moduleNumber: 9,
      title: "Cloud Migration & The AWS Well-Architected Framework",
      skillBuilderCourseName: "Module 9 & 10: Migration, Innovation & Well-Architected Framework",
      summary: "Explore the 6 perspectives of the AWS Cloud Adoption Framework (CAF) and the 6 Pillars of the AWS Well-Architected Framework to build resilient, cost-effective architectures.",
      keyConcepts: ["AWS Cloud Adoption Framework (CAF)", "Well-Architected 6 Pillars", "Operational Excellence", "Sustainability Pillar"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "Which pillar of the AWS Well-Architected Framework focuses specifically on minimizing environmental impact and maximizing resource efficiency of cloud architectures?",
        options: [
          "Operational Excellence",
          "Cost Optimization",
          "Sustainability Pillar",
          "Reliability Pillar"
        ],
        correctIndex: 2,
        explanation: "The Sustainability Pillar emphasizes understanding your environmental impact and designing architectures that maximize energy and hardware utilization efficiency."
      }
    },
    {
      day: 14,
      dateStr: "Day 14 · Tue, Oct 27",
      moduleNumber: 11,
      title: "Exam Readiness Capstone & Voucher Qualification Sprint!",
      skillBuilderCourseName: "Module 11: AWS Certified Cloud Practitioner Exam Basics",
      summary: "The final sprint! Complete the exam readiness review, practice question walk-throughs, and finalize your verification scores for the official AWS Exam Voucher award!",
      keyConcepts: ["Exam Domains & Weightages", "Question Deconstruction", "Official Practice Exams", "Voucher Award Finalization"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 60,
      basePoints: 150,
      quizPoints: 100,
      verificationQuestion: {
        question: "Which AWS service continuously inspects your AWS infrastructure and provides automated best practice checks across Cost Optimization, Security, Fault Tolerance, Performance, and Service Quotas?",
        options: [
          "AWS Trusted Advisor",
          "AWS Systems Manager",
          "AWS Config Rules",
          "AWS Shield Advanced"
        ],
        correctIndex: 0,
        explanation: "AWS Trusted Advisor is an online tool that analyzes your AWS account and gives real-time guidance across the 5 core best-practice categories."
      }
    }
  ]
};

/**
 * Realistic seed leaderboard of registered HBTU builders from various branches.
 * Live registered users are merged on top.
 */
export const INITIAL_LEADERBOARD_DATA: LeaderboardStudent[] = [
  {
    id: "hbtu-user-01",
    name: "Aarav Sharma",
    rollOrHandle: "220101015 (CSE)",
    branch: "Computer Science & Engg",
    year: "3rd Year",
    targetCert: "AWS Certified Cloud Practitioner",
    points: 1350,
    streakDays: 9,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    badge: "Voucher Winner (Top 1)",
    avatarMonogram: "AS"
  },
  {
    id: "hbtu-user-02",
    name: "Sneha Patel",
    rollOrHandle: "220102042 (IT)",
    branch: "Information Technology",
    year: "3rd Year",
    targetCert: "AWS Certified Solutions Architect - Associate",
    points: 1200,
    streakDays: 8,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8],
    badge: "Voucher Winner (Top 2)",
    avatarMonogram: "SP"
  },
  {
    id: "hbtu-user-03",
    name: "Rohan Verma",
    rollOrHandle: "230104018 (ECE)",
    branch: "Electronics & Communication",
    year: "2nd Year",
    targetCert: "AWS Certified Cloud Practitioner",
    points: 1050,
    streakDays: 7,
    completedDays: [1, 2, 3, 4, 5, 6, 7],
    badge: "Voucher Winner (Top 3)",
    avatarMonogram: "RV"
  },
  {
    id: "hbtu-user-04",
    name: "Ananya Mishra",
    rollOrHandle: "230101033 (CSE)",
    branch: "Computer Science & Engg",
    year: "2nd Year",
    targetCert: "AWS Certified Developer - Associate",
    points: 900,
    streakDays: 6,
    completedDays: [1, 2, 3, 4, 5, 6],
    badge: "Top 5 Finalist",
    avatarMonogram: "AM"
  },
  {
    id: "hbtu-user-05",
    name: "Prakhar Srivastava",
    rollOrHandle: "220103027 (EE)",
    branch: "Electrical Engineering",
    year: "3rd Year",
    targetCert: "AWS Certified Cloud Practitioner",
    points: 750,
    streakDays: 5,
    completedDays: [1, 2, 3, 4, 5],
    badge: "Top 5 Finalist",
    avatarMonogram: "PS"
  },
  {
    id: "hbtu-user-06",
    name: "Divya Gupta",
    rollOrHandle: "230102019 (IT)",
    branch: "Information Technology",
    year: "2nd Year",
    targetCert: "AWS Certified Solutions Architect",
    points: 600,
    streakDays: 4,
    completedDays: [1, 2, 3, 4],
    badge: "Priority Builder",
    avatarMonogram: "DG"
  },
  {
    id: "hbtu-user-07",
    name: "Kartik Tiwari",
    rollOrHandle: "240101055 (CSE)",
    branch: "Computer Science & Engg",
    year: "1st Year",
    targetCert: "AWS Certified Cloud Practitioner",
    points: 450,
    streakDays: 3,
    completedDays: [1, 2, 3],
    badge: "Priority Builder",
    avatarMonogram: "KT"
  },
  {
    id: "hbtu-user-08",
    name: "Shreya Singh",
    rollOrHandle: "240108012 (CHE)",
    branch: "Chemical Engineering",
    year: "1st Year",
    targetCert: "AWS Certified Cloud Practitioner",
    points: 300,
    streakDays: 2,
    completedDays: [1, 2],
    badge: "Priority Builder",
    avatarMonogram: "SS"
  }
];

export interface ChallengeItem {
  id: string;
  title: string;
  domain: "Cloud" | "DevOps" | "AI/ML" | "Serverless";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  deadline?: string;
  reward?: string;
  submissionUrl?: string;
}

export const CHALLENGES_DATA: ChallengeItem[] = [
  {
    id: "aws-14day-cloud-practitioner-2026",
    title: "14-Day AWS Cloud Practitioner Challenge Sprint",
    domain: "Cloud",
    difficulty: "Beginner",
    description: "Official 14-day community sprint following AWS Cloud Practitioner Essentials on AWS Skill Builder. Complete daily verified module quizzes, build learning streaks, and qualify for 100% sponsored AWS certification exam vouchers.",
    deadline: "October 27, 2026",
    reward: "AWS Exam Vouchers (Top 3) & Priority Membership",
    submissionUrl: "/challenges",
  }
];
