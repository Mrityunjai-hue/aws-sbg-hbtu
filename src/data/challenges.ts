export interface ChallengeVerificationQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChallengeDayModule {
  day: number;
  moduleNumber: number;
  dateStr: string;
  title: string;
  skillBuilderCourseName: string;
  sections: string[];
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
  badge: "Voucher Candidate Rank 1" | "Voucher Candidate Rank 2" | "Voucher Candidate Rank 3" | "Merit Finalist" | "Priority Member";
  avatarMonogram: string;
}

export interface ChallengeSprintDetails {
  id: string;
  title: string;
  subtitle: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED";
  startDate: string;
  totalModules: number;
  officialSkillBuilderUrl: string;
  leaderAnnouncement: {
    author: string;
    authorRole: string;
    avatarMonogram: string;
    updatedDate: string;
    rawMessage: string;
  };
  prizes: {
    tier: string;
    title: string;
    description: string;
    badge: string;
  }[];
  modules: ChallengeDayModule[];
}

export const ACTIVE_14DAY_CHALLENGE: ChallengeSprintDetails = {
  id: "aws-14day-cloud-practitioner-2026",
  title: "14-Day AWS Cloud Practitioner Challenge",
  subtitle: "Master Cloud Computing Fundamentals, Build a 14-Day Learning Streak, and Qualify for Official AWS Certification Exam Vouchers",
  status: "ACTIVE",
  startDate: "Wednesday, 14 October 2026",
  totalModules: 15,
  officialSkillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
  leaderAnnouncement: {
    author: "AWS SBG Chapter Leadership",
    authorRole: "AWS Student Builder Group HBTU Kanpur",
    avatarMonogram: "SBG",
    updatedDate: "October 12, 2026",
    rawMessage: `Update on Our 14-Day AWS Learning Challenge!

Hey everyone!

Due to some technical issues with the website, we will be starting our learning challenge this Wednesday, 14 October, instead of Monday. Thank you for your patience and understanding!

Meanwhile, let's prepare!

Before diving into cloud computing and AWS fundamentals, it's important to understand which AWS certification you should aim for and what each certification offers.

I'm sharing a PDF to help you explore the different AWS certifications and choose the right learning path for yourself.

Please go through the PDF before we begin so we can start our journey with clarity and the right goals!

Let's learn and grow together!`,
  },
  prizes: [
    {
      tier: "Ranks 1 to 3",
      title: "Sponsored AWS Certification Vouchers",
      description: "Rank 1st, 2nd, and 3rd on the final verified leaderboard receive 100% sponsored official AWS Certification exam vouchers (valued at $100+ USD) to sit for the AWS Certified Cloud Practitioner examination.",
      badge: "VOUCHER SPONSORSHIP",
    },
    {
      tier: "Ranks 4 and 5",
      title: "Top 5 Merit Cloud Awards",
      description: "Rank 4th and 5th receive AWS Student Builder Group Recognition Certificates, cloud builder swags, and priority access to AWS Community Day hackathons.",
      badge: "MERIT RECOGNITION",
    },
    {
      tier: "All Completers",
      title: "Priority Community Member Status",
      description: "Every student who maintains their learning streak and completes all 15 modules earns official Priority Community Member status with direct mentor pairing and exclusive project access.",
      badge: "PRIORITY STATUS",
    },
  ],
  modules: [
    {
      day: 1,
      moduleNumber: 1,
      dateStr: "Day 1 · Wed, Oct 14",
      title: "Module 1 - Introduction to the Cloud",
      skillBuilderCourseName: "Module 1 - Introduction to the Cloud",
      sections: [
        "How to Use Each Module",
        "Welcome to AWS Cloud Practitioner Essentials",
        "What is Cloud Computing?",
        "Benefits of the AWS Cloud",
        "Introduction to AWS Global Infrastructure",
        "The AWS Shared Responsibility Model",
        "Cloud in Real Life: Applying Cloud Concepts to Real Life Use Cases",
        "Assessment & Module Summary"
      ],
      summary: "Explore the core fundamentals of cloud computing, on-demand self-service delivery, deployment models (public, private, hybrid), economies of scale, and the fundamental boundary between customer and cloud provider responsibilities.",
      keyConcepts: ["Public vs Private vs Hybrid", "Trade CapEx for OpEx", "Economies of Scale", "Shared Responsibility Model"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 45,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "An enterprise operates a legacy compliance database on-premises while deploying its user-facing analytics microservices on AWS to accommodate unpredictable traffic spikes. Which cloud deployment model does this architecture represent?",
        options: [
          "Private Cloud Deployment",
          "Hybrid Cloud Deployment",
          "Public Multi-tenant Cloud",
          "Software-as-a-Service (SaaS)"
        ],
        correctIndex: 1,
        explanation: "A Hybrid cloud deployment connects on-premises infrastructure with public cloud resources, allowing data and applications to be shared across both environments dynamically."
      }
    },
    {
      day: 2,
      moduleNumber: 2,
      dateStr: "Day 2 · Thu, Oct 15",
      title: "Module 2 - Compute in the Cloud",
      skillBuilderCourseName: "Module 2 - Compute in the Cloud",
      sections: [
        "Introduction to Amazon EC2",
        "Amazon EC2 Instance Types",
        "How to Provision AWS Resources",
        "Demo: Launching an Amazon EC2 Instance",
        "Amazon EC2 Pricing Models",
        "Scaling Amazon EC2",
        "Directing Traffic with Elastic Load Balancing",
        "Messaging and Queuing",
        "Assessment & Module Summary"
      ],
      summary: "Analyze Amazon Elastic Compute Cloud (EC2) virtual machine instances, instance families (General, Compute, Memory, Storage Optimized), horizontal Auto Scaling policies, Elastic Load Balancing, and decouple asynchronous workloads via SQS and SNS.",
      keyConcepts: ["EC2 Instance Families", "On-Demand vs Spot vs Reserved", "Auto Scaling Groups", "Elastic Load Balancing (ELB)", "Amazon SQS & SNS"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "A company processes non-time-sensitive data batch transformations every weekend. The jobs can withstand unexpected interruptions and resume from checkpoints. Which EC2 purchasing model minimizes compute costs by up to 90%?",
        options: [
          "Dedicated Hosts",
          "Standard Reserved Instances",
          "Spot Instances",
          "Compute Savings Plans"
        ],
        correctIndex: 2,
        explanation: "Spot Instances leverage spare EC2 capacity at discounts up to 90% relative to On-Demand pricing. They are ideal for fault-tolerant batch workloads that can accommodate sudden capacity interruptions."
      }
    },
    {
      day: 3,
      moduleNumber: 3,
      dateStr: "Day 3 · Fri, Oct 16",
      title: "Module 3 - Exploring Compute Services",
      skillBuilderCourseName: "Module 3 - Exploring Compute Services",
      sections: [
        "Introduction to Serverless Computing",
        "AWS Lambda",
        "Containers and Orchestration on AWS",
        "Amazon ECS and Amazon EKS",
        "AWS Fargate Serverless Compute",
        "Additional Compute Services (AWS Elastic Beanstalk)",
        "Assessment & Module Summary"
      ],
      summary: "Evaluate serverless execution models with AWS Lambda and containerized orchestration via Amazon ECS, Amazon EKS, and AWS Fargate. Understand when to eliminate server provisioning entirely versus leveraging containerized microservices.",
      keyConcepts: ["AWS Lambda Event Triggers", "Container Orchestration", "Amazon ECS vs EKS", "AWS Fargate Serverless", "Elastic Beanstalk PaaS"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 45,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "A developer needs to execute thumbnail generation code whenever an image is uploaded to an S3 bucket. The execution takes less than 3 seconds per image, and zero idle servers should be maintained or billed. Which compute service is recommended?",
        options: [
          "Amazon EC2 with Reserved Instances",
          "AWS Lambda",
          "AWS Elastic Beanstalk",
          "Amazon Lightsail"
        ],
        correctIndex: 1,
        explanation: "AWS Lambda executes code strictly in response to events (such as S3 object creation) without managing or provisioning servers, billing purely for elapsed milliseconds of execution."
      }
    },
    {
      day: 4,
      moduleNumber: 4,
      dateStr: "Day 4 · Sat, Oct 17",
      title: "Module 4 - Going Global",
      skillBuilderCourseName: "Module 4 - Going Global",
      sections: [
        "Introduction to Going Global",
        "Choosing AWS Regions",
        "Diving Deeper into AWS Global Infrastructure",
        "Availability Zones and Fault Isolation",
        "Edge Locations and Amazon CloudFront",
        "Infrastructure as Code and Automation",
        "Assessment & Module Summary"
      ],
      summary: "Deconstruct the global architecture of AWS, including physical criteria for Region selection (compliance, latency, pricing, service availability), Availability Zone isolation, Edge Locations for CloudFront CDN distribution, and AWS CloudFormation automation.",
      keyConcepts: ["Region Selection Factors", "Availability Zone Isolation", "Edge Locations & CloudFront", "AWS CloudFormation IaC"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 45,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "Which of the following statements accurately characterizes the physical relationship between AWS Regions and Availability Zones (AZs)?",
        options: [
          "An AWS Region consists of a single large data center facility shared across multiple countries.",
          "An AWS Region contains two or more physically separated and isolated Availability Zones connected through high-bandwidth, low-latency private fiber.",
          "An Availability Zone represents a cluster of edge locations dedicated exclusively to DNS caching.",
          "Availability Zones share municipal power grids and water supplies to optimize operational costs."
        ],
        correctIndex: 1,
        explanation: "Every AWS Region comprises at least two (and frequently three or more) distinct, physically separated Availability Zones with redundant power and networking to guarantee fault tolerance."
      }
    },
    {
      day: 5,
      moduleNumber: 5,
      dateStr: "Day 5 · Sun, Oct 18",
      title: "Module 5 - Networking",
      skillBuilderCourseName: "Module 5 - Networking",
      sections: [
        "Introduction to Networking",
        "Organizing AWS Cloud Resources with Amazon VPC",
        "More Ways to Connect to the AWS Cloud",
        "Subnets, Security Groups, and Network Access Control Lists",
        "Amazon VPC Demonstration",
        "Global Networking (AWS Direct Connect & Route 53)",
        "Cloud in Real Life: Global Architectures",
        "Assessment & Module Summary"
      ],
      summary: "Architect logically isolated virtual networks using Amazon Virtual Private Cloud (VPC). Master CIDR blocks, public vs private subnets, Internet Gateways, NAT Gateways, stateful Security Groups vs stateless Network ACLs, and AWS Direct Connect dedicated links.",
      keyConcepts: ["Amazon VPC CIDR Blocks", "Public vs Private Subnets", "Internet Gateway (IGW)", "Security Groups vs NACLs", "AWS Direct Connect"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "What is the key architectural difference between Amazon VPC Security Groups and Network Access Control Lists (NACLs)?",
        options: [
          "Security Groups are stateless and operate at the subnet boundary; NACLs are stateful and operate at the instance ENI.",
          "Security Groups are stateful firewalls evaluated at the instance network interface level; NACLs are stateless filters evaluated at the subnet boundary.",
          "Security Groups only permit explicit DENY rules; NACLs only permit explicit ALLOW rules.",
          "NACLs only inspect egress traffic; Security Groups only inspect ingress traffic."
        ],
        correctIndex: 1,
        explanation: "Security Groups are stateful (inbound return traffic is automatically permitted) and apply to instances. NACLs are stateless (both inbound and outbound rules must be explicitly configured) and govern the subnet perimeter."
      }
    },
    {
      day: 6,
      moduleNumber: 6,
      dateStr: "Day 6 · Mon, Oct 19",
      title: "Module 6 - Storage",
      skillBuilderCourseName: "Module 6 - Storage",
      sections: [
        "Introduction to Storage",
        "EC2 Instance Store and Amazon Elastic Block Store (Amazon EBS)",
        "Amazon Elastic Block Store (Amazon EBS) Data Lifecycle",
        "Amazon Simple Storage Service (Amazon S3)",
        "Amazon S3 Storage Classes and S3 Lifecycle",
        "Amazon S3 Demonstration",
        "Amazon Elastic File System (Amazon EFS)",
        "Amazon FSx (Windows File Server & Lustre)",
        "AWS Storage Gateway & AWS Elastic Disaster Recovery",
        "Cloud in Real Life: Comparing Storage Services",
        "Assessment & Module Summary"
      ],
      summary: "Compare block, object, and file storage paradigms. Analyze Amazon EBS volume types (gp3, io2, st1) vs ephemeral instance store, Amazon S3 storage classes (Standard, Infrequent Access, Glacier, Deep Archive), Amazon EFS POSIX file shares, Amazon FSx, and hybrid gateways.",
      keyConcepts: ["EBS Block vs S3 Object vs EFS File", "S3 Eleven 9s Durability", "S3 Lifecycle Transition Rules", "Amazon FSx Lustre for HPC", "AWS Storage Gateway"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "An organization requires high-durability object storage for compliance audits. Records are accessed multiple times per month during the first 90 days, accessed once a year thereafter, and must be retained for 7 years. Which storage strategy is most cost-effective?",
        options: [
          "Store all records on Amazon EBS gp3 volumes attached to EC2 instances continuously.",
          "Store records in Amazon S3 Standard with lifecycle policies transitioning objects to S3 Glacier Flexible Retrieval after 90 days.",
          "Store data on Amazon EFS with Provisioned Throughput enabled permanently.",
          "Maintain all records in EC2 Instance Store volumes across multiple availability zones."
        ],
        correctIndex: 1,
        explanation: "Amazon S3 Lifecycle rules automatically transition objects from active tiers (S3 Standard) to cold archive tiers (S3 Glacier) without modifying client retrieval endpoints, drastically slashing storage costs over multi-year retention cycles."
      }
    },
    {
      day: 7,
      moduleNumber: 7,
      dateStr: "Day 7 · Tue, Oct 20",
      title: "Module 7 - Databases",
      skillBuilderCourseName: "Module 7 - Databases",
      sections: [
        "Introduction to Databases",
        "Relational Database Services (Amazon RDS & Amazon Aurora)",
        "NoSQL Database Services (Amazon DynamoDB)",
        "AWS Databases Demonstration",
        "In-Memory Caching Services (Amazon ElastiCache)",
        "Additional Database Services (Amazon Redshift, DocumentDB, Neptune)",
        "Assessment & Module Summary"
      ],
      summary: "Contrast relational SQL systems (Amazon RDS, Aurora multi-AZ clusters) with purpose-built NoSQL architectures (Amazon DynamoDB single-digit millisecond key-value), sub-millisecond in-memory caching with Amazon ElastiCache (Redis/Memcached), and analytics warehousing with Redshift.",
      keyConcepts: ["Amazon RDS vs Aurora", "Amazon DynamoDB NoSQL", "ElastiCache Redis / Memcached", "Amazon Redshift Data Warehouse", "Read Replicas vs Multi-AZ"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "A high-velocity gaming platform requires real-time player leaderboard state queries that must consistently respond with sub-millisecond latency under heavy concurrent read operations. Which service should the architecture integrate in front of the database?",
        options: [
          "Amazon Redshift",
          "Amazon ElastiCache for Redis",
          "Amazon RDS Multi-AZ Standby Instance",
          "AWS Storage Gateway"
        ],
        correctIndex: 1,
        explanation: "Amazon ElastiCache is an in-memory key-value data store that delivers sub-millisecond response times, offloading read-heavy queries from relational or NoSQL persistent databases."
      }
    },
    {
      day: 8,
      moduleNumber: 8,
      dateStr: "Day 8 · Wed, Oct 21",
      title: "Module 8 - AI ML and Data Analytics",
      skillBuilderCourseName: "Module 8 - AI ML and Data Analytics",
      sections: [
        "Introduction to AI and Machine Learning",
        "AI/ML on AWS",
        "AWS AI/ML Solutions (Amazon SageMaker, Rekognition, Polly, Comprehend)",
        "Introduction to Generative AI on AWS",
        "AWS Generative AI Solutions (Amazon Bedrock, Amazon Q)",
        "Introduction to Data Analytics",
        "Data Pipelines on AWS (Amazon EMR, AWS Glue, Amazon Athena, Amazon Kinesis)",
        "Cloud in Real Life: Data Analytics and AI/ML",
        "Assessment & Module Summary"
      ],
      summary: "Examine managed artificial intelligence, machine learning, and big data pipelines. Explore Amazon SageMaker model lifecycles, Foundation Models via Amazon Bedrock, serverless interactive querying via Amazon Athena, ETL cataloging via AWS Glue, and streaming via Kinesis.",
      keyConcepts: ["Amazon SageMaker", "Amazon Bedrock Generative AI", "AWS Glue Data Catalog & ETL", "Amazon Athena Serverless SQL", "Amazon Kinesis Streaming"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 55,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "A software team wants to build a generative AI assistant using leading industry Foundation Models (FMs) via API calls, without managing GPU server clusters or underlying infrastructure. Which managed AWS service provides this unified capability?",
        options: [
          "Amazon EC2 p4de GPU Instances",
          "Amazon Bedrock",
          "Amazon Athena",
          "Amazon Elastic MapReduce (EMR)"
        ],
        correctIndex: 1,
        explanation: "Amazon Bedrock is a fully managed serverless service that provides choice of high-performing foundation models from leading AI startups and Amazon via a single unified API, alongside private data customization."
      }
    },
    {
      day: 9,
      moduleNumber: 9,
      dateStr: "Day 9 · Thu, Oct 22",
      title: "Module 9 - Security",
      skillBuilderCourseName: "Module 9 - Security",
      sections: [
        "Introduction to Security on AWS",
        "Preventing Unauthorized Access with AWS IAM & MFA",
        "Protecting Networks and Applications with AWS WAF & AWS Shield",
        "Protecting Data with Encryption at Rest (AWS KMS) & in Transit",
        "Detecting and Responding to Security Incidents with Amazon GuardDuty & AWS Inspector",
        "Additional Security Resources (AWS Artifact, Security Hub)",
        "Assessment & Module Summary"
      ],
      summary: "Master enterprise cloud defense depth: Identity & Access Management (IAM users, roles, policies, MFA, least privilege), application layer protection (AWS WAF, AWS Shield DDoS), envelope encryption (AWS KMS), intelligent threat detection (GuardDuty), and compliance compliance via AWS Artifact.",
      keyConcepts: ["Principle of Least Privilege", "AWS IAM Roles vs Users", "AWS WAF Layer 7 vs Shield DDoS", "AWS KMS Key Management", "Amazon GuardDuty Threat Intel"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "An application running on Amazon EC2 needs to read configuration secrets from an S3 bucket securely. According to AWS security best practices, how should permissions be granted to the application?",
        options: [
          "Hardcode the AWS Root account access keys into the application code configuration files.",
          "Create an IAM user, embed the secret keys in the EC2 instance user-data script, and store them on EBS.",
          "Attach an IAM Role with an Amazon S3 read-only policy directly to the EC2 instance profile.",
          "Configure the S3 bucket policy to allow unrestricted public read access across all IPs."
        ],
        correctIndex: 2,
        explanation: "IAM Roles eliminate the risk of hardcoded credentials by providing temporary security credentials that AWS automatically rotates for instances and applications."
      }
    },
    {
      day: 10,
      moduleNumber: 10,
      dateStr: "Day 10 · Fri, Oct 23",
      title: "Module 10 - Monitoring, Compliance and Governance in the AWS Cloud",
      skillBuilderCourseName: "Module 10 - Monitoring, Compliance and Governance in the AWS Cloud",
      sections: [
        "Introduction to Monitoring, Compliance, and Governance",
        "Introduction to Monitoring",
        "Amazon CloudWatch (Metrics, Dashboards, Alarms)",
        "AWS CloudTrail (API Activity & Audit Logs)",
        "Compliance & Auditing AWS Resources (AWS Config)",
        "AWS Organizations & Service Control Policies (SCPs)",
        "Governance & AWS Health Dashboard",
        "AWS Trusted Advisor (5 Core Recommendation Categories)",
        "Assessment & Module Summary"
      ],
      summary: "Establish continuous observability, auditability, and multi-account guardrails. Contrast performance metrics in Amazon CloudWatch with API audit trails in AWS CloudTrail, enforce configuration drift rules with AWS Config, and scale multi-account governance with AWS Organizations.",
      keyConcepts: ["CloudWatch Metrics & Alarms", "CloudTrail API Governance Log", "AWS Organizations & SCPs", "AWS Trusted Advisor", "AWS Config Drift Detection"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "A compliance auditor requires an exact chronological record of every API modification, identity caller, IP address, and timestamp for all actions executed in an AWS account over the preceding 90 days. Which service satisfies this requirement?",
        options: [
          "Amazon CloudWatch Metrics",
          "AWS CloudTrail",
          "AWS Systems Manager Run Command",
          "Amazon Inspector"
        ],
        correctIndex: 1,
        explanation: "AWS CloudTrail records user activity and API calls across AWS services, creating immutable event logs that capture caller identity, source IP address, timestamp, request parameters, and response elements."
      }
    },
    {
      day: 11,
      moduleNumber: 11,
      dateStr: "Day 11 · Sat, Oct 24",
      title: "Module 11 - Pricing and Support",
      skillBuilderCourseName: "Module 11 - Pricing and Support",
      sections: [
        "Introduction to Pricing and Support",
        "AWS Pricing Concepts (Pay as You Go, Volume Discounts)",
        "AWS Pricing and Billing Services (AWS Pricing Calculator, Cost Explorer, Budgets)",
        "AWS Support Plans (Basic, Developer, Business, Enterprise)",
        "AWS Marketplace and AWS Partner Network (APN)",
        "Cloud in Real Life: Cost Optimization",
        "Assessment & Module Summary"
      ],
      summary: "Analyze financial governance in the cloud: pay-as-you-go billing mechanics, data transfer egress costs, AWS Pricing Calculator pre-deployment estimation, AWS Cost Explorer forecasting, AWS Budgets alerts, and SLAs across the four official AWS Support tiers.",
      keyConcepts: ["Free Tier vs Pay-as-You-Go", "AWS Pricing Calculator", "AWS Budgets & Cost Explorer", "4 AWS Support Plans & TAM", "AWS Marketplace"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 45,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "A company requires 24x7 phone, email, and chat access to Cloud Support Engineers with a guaranteed 1-hour response target for production system downtime, as well as AWS Trusted Advisor full check access. What is the minimum support tier required?",
        options: [
          "AWS Basic Support",
          "AWS Developer Support",
          "AWS Business Support",
          "AWS Enterprise Support only"
        ],
        correctIndex: 2,
        explanation: "AWS Business Support provides 24x7 phone, chat, and email support with a 1-hour response SLA for production systems down, full Trusted Advisor checks, and third-party software support. (Developer support is restricted to business hours via email)."
      }
    },
    {
      day: 12,
      moduleNumber: 12,
      dateStr: "Day 12 · Sun, Oct 25",
      title: "Module 12 - Migrating to the AWS Cloud",
      skillBuilderCourseName: "Module 12 - Migrating to the AWS Cloud",
      sections: [
        "Introduction to Migration",
        "AWS Cloud Adoption Framework (AWS CAF - 6 Perspectives)",
        "Seven Migration Strategies (Rehost, Replatform, Refactor, Repurchase, Retain, Retire, Relocate)",
        "Migration Services and Tools (AWS Application Migration Service MGN)",
        "Migrating Databases to the AWS Cloud (AWS Database Migration Service DMS & SCT)",
        "Migrating Data to the AWS Cloud (AWS DataSync, Snowcone, Snowball, Snowmobile)",
        "Assessment & Module Summary"
      ],
      summary: "Formulate enterprise migration roadmaps using the AWS Cloud Adoption Framework (Business, People, Governance, Platform, Security, Operations). Deconstruct the 7 Rs migration strategies, AWS DMS continuous replication, and petabyte-scale offline data transfers via the AWS Snow Family.",
      keyConcepts: ["AWS CAF 6 Perspectives", "The 7 Rs of Migration", "AWS Database Migration Service (DMS)", "AWS Application Migration Service (MGN)", "AWS Snow Family"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "An organization needs to migrate an on-premises 60 TB dataset to Amazon S3. The facility has an unstable 10 Mbps internet connection where network transfer would take several months. Which solution facilitates this migration within days?",
        options: [
          "Transfer the files continuously over standard HTTPS via AWS Transfer Family.",
          "Request an AWS Snowball Edge Storage Optimized device to load data locally and ship it to an AWS facility.",
          "Configure an Amazon VPC Direct Connect 100 Gbps port for a single day.",
          "Compress the data using Amazon CloudWatch logs."
        ],
        correctIndex: 1,
        explanation: "AWS Snowball Edge is a physical, ruggedized hardware appliance used to transfer tens of terabytes of data offline when network bandwidth is limited or cost-prohibitive."
      }
    },
    {
      day: 13,
      moduleNumber: 13,
      dateStr: "Day 13 · Mon, Oct 26",
      title: "Module 13 - Well-Architected Solutions",
      skillBuilderCourseName: "Module 13 - Well-Architected Solutions",
      sections: [
        "Introduction to Well-Architected Solutions",
        "AWS Specialized Services (AWS IoT, HPC, Media Services)",
        "AWS Well-Architected Framework: The 6 Pillars",
        "Operational Excellence & Security Pillars",
        "Reliability & Performance Efficiency Pillars",
        "Cost Optimization & Sustainability Pillars",
        "Cloud in Real Life: Specialized Enterprise Use Cases",
        "Assessment & Module Summary"
      ],
      summary: "Evaluate cloud architectures against the AWS Well-Architected Framework: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability. Apply architectural trade-offs to specialized industrial architectures.",
      keyConcepts: ["Well-Architected 6 Pillars", "Failure Mode Design", "Loosely Coupled Microservices", "Right-Sizing & Cost Optimization", "Carbon Footprint Sustainability"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 50,
      basePoints: 100,
      quizPoints: 50,
      verificationQuestion: {
        question: "Designing an application to recover automatically from component failures, dynamically acquire compute capacity to mitigate disruptions, and test recovery procedures at production scale aligns directly with which Well-Architected pillar?",
        options: [
          "Operational Excellence Pillar",
          "Reliability Pillar",
          "Performance Efficiency Pillar",
          "Cost Optimization Pillar"
        ],
        correctIndex: 1,
        explanation: "The Reliability Pillar encompasses the ability of a workload to perform its intended function correctly and consistently, including automatic failure recovery, multi-AZ failovers, and horizontal self-healing scaling."
      }
    },
    {
      day: 14,
      moduleNumber: 14,
      dateStr: "Day 14 · Tue, Oct 27",
      title: "Module 14 - Cloud Practitioner Certification Exam Strategy",
      skillBuilderCourseName: "AWS Certified Cloud Practitioner (CLF-C02) Exam Readiness",
      sections: [
        "CLF-C02 Exam Blueprint and Domain Weightages",
        "Domain 1: Cloud Concepts (24%)",
        "Domain 2: Security and Compliance (30%)",
        "Domain 3: Cloud Technology and Services (34%)",
        "Domain 4: Billing, Pricing, and Support (12%)",
        "Deconstructing Multiple-Choice & Multi-Response Distractors",
        "Time Management Strategy & Official Practice Exam Review"
      ],
      summary: "Deconstruct the official CLF-C02 examination blueprint. Review domain distributions, eliminate common distractors in scenario-based questions, apply the Well-Architected mental model to rapid elimination, and benchmark timed test readiness.",
      keyConcepts: ["CLF-C02 Blueprint Analysis", "Domain Weightage Prioritization", "Keyword Isolation in Question Stems", "Distractor Elimination Technique"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 55,
      basePoints: 150,
      quizPoints: 75,
      verificationQuestion: {
        question: "Which category accounts for the single highest percentage weighting on the official AWS Certified Cloud Practitioner (CLF-C02) examination blueprint?",
        options: [
          "Cloud Technology and Services (34%)",
          "Billing, Pricing, and Support (12%)",
          "Cloud Concepts (24%)",
          "Migration Strategy (10%)"
        ],
        correctIndex: 0,
        explanation: "On the CLF-C02 blueprint, Cloud Technology and Services constitutes 34% of the exam, followed closely by Security and Compliance at 30%."
      }
    },
    {
      day: 15,
      moduleNumber: 15,
      dateStr: "Day 15 · Wed, Oct 28",
      title: "Module 15 - Capstone Review & Final Voucher Allocation Sprint",
      skillBuilderCourseName: "AWS SBG Capstone Synthesis & Voucher Qualification",
      sections: [
        "Comprehensive 15-Module Synthesis",
        "Cross-Cutting Architectural Scenarios",
        "Well-Architected End-to-End System Evaluation",
        "Final Voucher Qualification Assessment",
        "Leaderboard Standings Lock-In Protocol",
        "Voucher Distribution & Next Step Associate Certification Pathways"
      ],
      summary: "Complete the capstone synthesis covering all 15 modules. Lock in your verified points and consecutive streak on the official HBTU chapter leaderboard to claim your sponsored AWS Certification Exam Voucher.",
      keyConcepts: ["Holistic Architecture Synthesis", "End-to-End System Design", "Leaderboard Final Verification", "Voucher Award Protocol"],
      skillBuilderUrl: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
      estimatedMinutes: 60,
      basePoints: 200,
      quizPoints: 100,
      verificationQuestion: {
        question: "An architecture incorporates Amazon Route 53 latency routing, an Application Load Balancer across two AZs, auto-scaled EC2 instances, S3 Standard with lifecycle transitions to Glacier, an RDS PostgreSQL Multi-AZ primary/standby cluster, and AWS Shield Standard. Which statement is correct regarding this deployment?",
        options: [
          "The architecture is vulnerable to single AZ failure because Route 53 cannot direct traffic across multiple zones.",
          "The architecture implements defense-in-depth, high availability across multiple availability zones, automatic database failover, and cost-optimized cold archival.",
          "AWS Shield Standard does not provide any protection against Layer 3 and Layer 4 DDoS attacks.",
          "RDS Multi-AZ standby instances can serve active read-traffic concurrently with the primary database."
        ],
        correctIndex: 1,
        explanation: "This deployment exemplifies Well-Architected design: DNS routing, multi-AZ load balancing and auto-scaling, automated database failover via Multi-AZ synchronous replication, automated S3 tiering, and native perimeter DDoS defense."
      }
    }
  ]
};

export const INITIAL_LEADERBOARD_DATA: LeaderboardStudent[] = [
  {
    id: "hbtu-user-01",
    name: "Aarav Sharma",
    rollOrHandle: "220101015 (CSE)",
    branch: "Computer Science & Engineering",
    year: "3rd Year",
    targetCert: "AWS Certified Cloud Practitioner",
    points: 2150,
    streakDays: 14,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    badge: "Voucher Candidate Rank 1",
    avatarMonogram: "AS"
  },
  {
    id: "hbtu-user-02",
    name: "Sneha Patel",
    rollOrHandle: "220102042 (IT)",
    branch: "Information Technology",
    year: "3rd Year",
    targetCert: "AWS Certified Solutions Architect - Associate",
    points: 2000,
    streakDays: 13,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    badge: "Voucher Candidate Rank 2",
    avatarMonogram: "SP"
  },
  {
    id: "hbtu-user-03",
    name: "Rohan Verma",
    rollOrHandle: "230104018 (ECE)",
    branch: "Electronics & Communication",
    year: "2nd Year",
    targetCert: "AWS Certified Cloud Practitioner",
    points: 1850,
    streakDays: 12,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    badge: "Voucher Candidate Rank 3",
    avatarMonogram: "RV"
  },
  {
    id: "hbtu-user-04",
    name: "Ishaan Saxena",
    rollOrHandle: "230209012 (MDS)",
    branch: "BS-MS Mathematics and Data Science",
    year: "3rd Year",
    targetCert: "AWS Certified Data Engineer - Associate",
    points: 1650,
    streakDays: 11,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    badge: "Merit Finalist",
    avatarMonogram: "IS"
  },
  {
    id: "hbtu-user-05",
    name: "Prakhar Srivastava",
    rollOrHandle: "220103027 (EE)",
    branch: "Electrical Engineering",
    year: "3rd Year",
    targetCert: "AWS Certified Cloud Practitioner",
    points: 1500,
    streakDays: 10,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    badge: "Merit Finalist",
    avatarMonogram: "PS"
  },
  {
    id: "hbtu-user-06",
    name: "Divya Gupta",
    rollOrHandle: "230102019 (IT)",
    branch: "Information Technology",
    year: "2nd Year",
    targetCert: "AWS Certified Solutions Architect",
    points: 1350,
    streakDays: 9,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    badge: "Priority Member",
    avatarMonogram: "DG"
  },
  {
    id: "hbtu-user-07",
    name: "Kartik Tiwari",
    rollOrHandle: "240101055 (CSE)",
    branch: "Computer Science & Engineering",
    year: "1st Year",
    targetCert: "AWS Certified Cloud Practitioner",
    points: 1050,
    streakDays: 7,
    completedDays: [1, 2, 3, 4, 5, 6, 7],
    badge: "Priority Member",
    avatarMonogram: "KT"
  },
  {
    id: "hbtu-user-08",
    name: "Shreya Singh",
    rollOrHandle: "240108012 (CHE)",
    branch: "Chemical Engineering",
    year: "1st Year",
    targetCert: "AWS Certified Cloud Practitioner",
    points: 750,
    streakDays: 5,
    completedDays: [1, 2, 3, 4, 5],
    badge: "Priority Member",
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
    description: "Official 15-module community sprint based on AWS Cloud Practitioner Essentials on AWS Skill Builder. Complete verified module assessments, build learning streaks, and qualify for sponsored AWS certification exam vouchers.",
    deadline: "October 28, 2026",
    reward: "AWS Exam Vouchers (Top 3) & Priority Community Status",
    submissionUrl: "/challenges",
  }
];
