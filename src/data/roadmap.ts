export interface CertificationSpec {
  id: string;
  code: string;
  name: string;
  level: "Foundational" | "Associate" | "Professional" | "Specialty";
  levelBadgeColor: string; // Tailwind color classes
  accentHex: string;
  durationMins: number;
  questionCount: number;
  passingScore: number;
  costUsd: number;
  prerequisites: string;
  targetRole: string;
  description: string;
  domains: { name: string; weight: number }[];
  skillBuilderUrl: string;
}

export interface CareerPathStep {
  certId: string;
  code: string;
  name: string;
  level: "Foundational" | "Associate" | "Professional" | "Specialty";
  isPrimary?: boolean;
}

export interface CareerRolePath {
  id: string;
  title: string;
  category: "Architecture" | "Data & Analytics" | "Development" | "Operations" | "DevOps" | "Security" | "Networking" | "AI & ML";
  responsibilities: string;
  recommendedTimeline: string;
  path: CareerPathStep[];
}

export interface PersonaRecommendation {
  id: "new" | "business" | "it";
  title: string;
  subtitle: string;
  targetProfile: string;
  recommendedCertId: string;
  recommendedCertName: string;
  reasoning: string;
  nextSteps: string;
}

export const AWS_CERTIFICATIONS: CertificationSpec[] = [
  {
    id: "clf-c02",
    code: "CLF-C02",
    name: "AWS Certified Cloud Practitioner",
    level: "Foundational",
    levelBadgeColor: "bg-teal-500/15 text-teal-400 border-teal-500/30",
    accentHex: "#00A4A6",
    durationMins: 90,
    questionCount: 65,
    passingScore: 700,
    costUsd: 100,
    prerequisites: "General IT literacy; no prior cloud administration experience required.",
    targetRole: "Cloud Newcomers, Technical Sales, Product Managers, University Students",
    description: "Validates foundational, high-level understanding of AWS Cloud services, architectural value propositions, billing models, and the Shared Responsibility Model.",
    domains: [
      { name: "Cloud Technology & Services", weight: 34 },
      { name: "Security and Compliance", weight: 30 },
      { name: "Cloud Concepts & Value Proposition", weight: 24 },
      { name: "Billing, Pricing, and Support", weight: 12 },
    ],
    skillBuilderUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials",
  },
  {
    id: "saa-c03",
    code: "SAA-C03",
    name: "AWS Certified Solutions Architect - Associate",
    level: "Associate",
    levelBadgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    accentHex: "#0073BB",
    durationMins: 130,
    questionCount: 65,
    passingScore: 720,
    costUsd: 150,
    prerequisites: "Hands-on experience designing resilient, high-performing distributed systems.",
    targetRole: "Cloud Solutions Architects, Systems Engineers, Solutions Engineers",
    description: "Validates proficiency designing secure, resilient, high-performing, and cost-optimized distributed architectures on AWS across compute, networking, and storage.",
    domains: [
      { name: "Design Secure Architectures", weight: 30 },
      { name: "Design Resilient Architectures", weight: 26 },
      { name: "Design High-Performing Architectures", weight: 24 },
      { name: "Design Cost-Optimized Architectures", weight: 20 },
    ],
    skillBuilderUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/14050/exam-prep-standard-course-aws-certified-solutions-architect-associate-saa-c03",
  },
  {
    id: "dva-c02",
    code: "DVA-C02",
    name: "AWS Certified Developer - Associate",
    level: "Associate",
    levelBadgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    accentHex: "#0073BB",
    durationMins: 130,
    questionCount: 65,
    passingScore: 720,
    costUsd: 150,
    prerequisites: "1+ year hands-on developing and maintaining applications on AWS using SDKs.",
    targetRole: "Software Engineers, Backend Developers, Cloud Native Application Engineers",
    description: "Validates core competence in developing, optimizing, deploying, and debugging cloud-native serverless applications, containers, and microservices.",
    domains: [
      { name: "Development with AWS Services", weight: 32 },
      { name: "Security & Secret Management", weight: 26 },
      { name: "Deployment & CI/CD Pipelines", weight: 24 },
      { name: "Refactoring & Troubleshooting", weight: 18 },
    ],
    skillBuilderUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/14051/exam-prep-standard-course-aws-certified-developer-associate-dva-c02",
  },
  {
    id: "dea-c01",
    code: "DEA-C01",
    name: "AWS Certified Data Engineer - Associate",
    level: "Associate",
    levelBadgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    accentHex: "#0073BB",
    durationMins: 130,
    questionCount: 65,
    passingScore: 720,
    costUsd: 150,
    prerequisites: "Familiarity with SQL, data pipelines, lakehouse architectures, and ETL design.",
    targetRole: "Data Engineers, Analytics Engineers, Big Data Specialists",
    description: "Validates expertise in designing and monitoring resilient data pipelines, extracting, transforming, loading (ETL) data, and securing analytical stores.",
    domains: [
      { name: "Data Ingestion and Transformation", weight: 34 },
      { name: "Data Store Management", weight: 26 },
      { name: "Data Security and Governance", weight: 22 },
      { name: "Data Monitoring and Troubleshooting", weight: 18 },
    ],
    skillBuilderUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/18546/exam-prep-standard-course-aws-certified-data-engineer-associate-dea-c01",
  },
  {
    id: "soa-c02",
    code: "SOA-C02",
    name: "AWS Certified SysOps Administrator - Associate",
    level: "Associate",
    levelBadgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    accentHex: "#0073BB",
    durationMins: 130,
    questionCount: 65,
    passingScore: 720,
    costUsd: 150,
    prerequisites: "1+ year experience in systems operations, Linux/Windows administration, and monitoring.",
    targetRole: "Systems Administrators, Cloud Operations Engineers, SREs",
    description: "Validates experience deploying, managing, and operating scalable systems, automated backups, compliance baselines, and disaster recovery.",
    domains: [
      { name: "Monitoring, Logging, and Remediation", weight: 20 },
      { name: "Reliability and Business Continuity", weight: 16 },
      { name: "Deployment, Provisioning, and Automation", weight: 18 },
      { name: "Security and Compliance", weight: 16 },
      { name: "Networking and Content Delivery", weight: 18 },
      { name: "Cost and Performance Optimization", weight: 12 },
    ],
    skillBuilderUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/14052/exam-prep-standard-course-aws-certified-sysops-administrator-associate-soa-c02",
  },
  {
    id: "sap-c02",
    code: "SAP-C02",
    name: "AWS Certified Solutions Architect - Professional",
    level: "Professional",
    levelBadgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    accentHex: "#8C4FFF",
    durationMins: 180,
    questionCount: 75,
    passingScore: 750,
    costUsd: 300,
    prerequisites: "2+ years of hands-on experience designing and deploying cloud architecture on AWS.",
    targetRole: "Principal Enterprise Architects, Lead Cloud Architects, Cloud Directors",
    description: "Evaluates comprehensive ability to design enterprise-scale complex multi-tier applications, hybrid cloud migrations, multi-account governance, and cost optimization.",
    domains: [
      { name: "Design Solutions for Organizational Complexity", weight: 26 },
      { name: "Design for New Solutions & Rapid Scale", weight: 29 },
      { name: "Continuous Improvement for Existing Solutions", weight: 25 },
      { name: "Accelerate Workload Migration & Modernization", weight: 20 },
    ],
    skillBuilderUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/14053/exam-prep-standard-course-aws-certified-solutions-architect-professional-sap-c02",
  },
  {
    id: "dop-c02",
    code: "DOP-C02",
    name: "AWS Certified DevOps Engineer - Professional",
    level: "Professional",
    levelBadgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    accentHex: "#8C4FFF",
    durationMins: 180,
    questionCount: 75,
    passingScore: 750,
    costUsd: 300,
    prerequisites: "2+ years provisioning, operating, and managing AWS environments using IaC and automation.",
    targetRole: "Lead DevOps Engineers, Site Reliability Engineering (SRE) Leads, Platform Engineers",
    description: "Validates technical proficiency in provisioning, operating, and managing distributed application systems on AWS via continuous delivery and automated governance.",
    domains: [
      { name: "SDLC Automation & Pipeline Engineering", weight: 22 },
      { name: "Configuration Management & Infrastructure as Code", weight: 19 },
      { name: "Resilient Cloud Architecture & Disaster Recovery", weight: 15 },
      { name: "Monitoring and Event-Driven Logging", weight: 15 },
      { name: "Incident and Event Response Automation", weight: 14 },
      { name: "Security and Compliance Auditing", weight: 15 },
    ],
    skillBuilderUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/14054/exam-prep-standard-course-aws-certified-devops-engineer-professional-dop-c02",
  },
  {
    id: "scs-c02",
    code: "SCS-C02",
    name: "AWS Certified Security - Specialty",
    level: "Specialty",
    levelBadgeColor: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    accentHex: "#E7157B",
    durationMins: 170,
    questionCount: 65,
    passingScore: 750,
    costUsd: 300,
    prerequisites: "5+ years IT security experience with 2+ years hands-on securing AWS workloads.",
    targetRole: "Cloud Security Engineers, Information Security Officers, DevSecOps Specialists",
    description: "Demonstrates deep domain knowledge securing the AWS platform through KMS envelope encryption, IAM least privilege, perimeter defense (WAF/Shield), and automated forensics.",
    domains: [
      { name: "Threat Detection and Incident Response", weight: 14 },
      { name: "Security Logging and Monitoring", weight: 18 },
      { name: "Infrastructure Security", weight: 20 },
      { name: "Identity and Access Management", weight: 16 },
      { name: "Data Protection and Cryptography", weight: 18 },
      { name: "Management and Security Governance", weight: 14 },
    ],
    skillBuilderUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/14055/exam-prep-standard-course-aws-certified-security-specialty-scs-c02",
  },
  {
    id: "ans-c01",
    code: "ANS-C01",
    name: "AWS Certified Advanced Networking - Specialty",
    level: "Specialty",
    levelBadgeColor: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    accentHex: "#E7157B",
    durationMins: 170,
    questionCount: 65,
    passingScore: 750,
    costUsd: 300,
    prerequisites: "5+ years hands-on architecting complex enterprise networks and hybrid routing topologies.",
    targetRole: "Network Architects, Cloud Telecom Specialists, Hybrid Infrastructure Engineers",
    description: "Validates deep expertise designing complex network architectures: Direct Connect interconnects, Transit Gateway routing fabrics, VPN topologies, and VPC endpoints.",
    domains: [
      { name: "Network Design & Hybrid Topologies", weight: 30 },
      { name: "Network Implementation & Automation", weight: 26 },
      { name: "Network Management and Operations", weight: 20 },
      { name: "Network Security, Compliance, and Governance", weight: 24 },
    ],
    skillBuilderUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/14056/exam-prep-standard-course-aws-certified-advanced-networking-specialty-ans-c01",
  },
  {
    id: "mls-c01",
    code: "MLS-C01",
    name: "AWS Certified Machine Learning - Specialty",
    level: "Specialty",
    levelBadgeColor: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    accentHex: "#E7157B",
    durationMins: 180,
    questionCount: 65,
    passingScore: 750,
    costUsd: 300,
    prerequisites: "2+ years developing, architecting, or running ML/deep learning workloads on AWS.",
    targetRole: "MLOps Engineers, Machine Learning Scientists, AI Solutions Architects",
    description: "Validates proficiency designing, implementing, deploying, and maintaining machine learning solutions for given business problems using Amazon SageMaker and AI primitives.",
    domains: [
      { name: "Data Engineering for Machine Learning", weight: 20 },
      { name: "Exploratory Data Analysis", weight: 24 },
      { name: "Modeling Algorithms & Hyperparameter Tuning", weight: 36 },
      { name: "Machine Learning Implementation and Operations", weight: 20 },
    ],
    skillBuilderUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/14057/exam-prep-standard-course-aws-certified-machine-learning-specialty-mls-c01",
  },
];

export const CAREER_ROLE_PATHS: CareerRolePath[] = [
  // 1. Architecture
  {
    id: "solutions-architect",
    title: "Solutions Architect",
    category: "Architecture",
    responsibilities: "Design, develop, and manage cloud infrastructure and closely collaborate with DevOps to architect resilient, scalable applications in the cloud.",
    recommendedTimeline: "6 - 12 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "saa-c03", code: "SAA-C03", name: "Solutions Architect Associate", level: "Associate", isPrimary: true },
      { certId: "sap-c02", code: "SAP-C02", name: "Solutions Architect Professional", level: "Professional", isPrimary: true },
      { certId: "scs-c02", code: "SCS-C02", name: "Security Specialty", level: "Specialty" },
    ],
  },
  {
    id: "applications-architect",
    title: "Applications Architect",
    category: "Architecture",
    responsibilities: "Design significant aspects of application architecture including user interfaces, middleware, microservices, and infrastructure; ensure enterprise systems are scalable, reliable, and manageable.",
    recommendedTimeline: "9 - 18 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "dva-c02", code: "DVA-C02", name: "Developer Associate", level: "Associate" },
      { certId: "saa-c03", code: "SAA-C03", name: "Solutions Architect Associate", level: "Associate", isPrimary: true },
      { certId: "dop-c02", code: "DOP-C02", name: "DevOps Engineer Professional", level: "Professional" },
      { certId: "sap-c02", code: "SAP-C02", name: "Solutions Architect Professional", level: "Professional", isPrimary: true },
    ],
  },

  // 2. Data & Analytics
  {
    id: "cloud-data-engineer",
    title: "Cloud Data Engineer",
    category: "Data & Analytics",
    responsibilities: "Automate ingestion and processing of structured/unstructured datasets; architect lakehouse data pipelines and monitor analytical pipeline performance.",
    recommendedTimeline: "6 - 12 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "dea-c01", code: "DEA-C01", name: "Data Engineer Associate", level: "Associate", isPrimary: true },
      { certId: "mls-c01", code: "MLS-C01", name: "Machine Learning Specialty", level: "Specialty", isPrimary: true },
      { certId: "sap-c02", code: "SAP-C02", name: "Solutions Architect Professional", level: "Professional" },
    ],
  },

  // 3. Development
  {
    id: "software-development-engineer",
    title: "Software Development Engineer (Cloud Developer)",
    category: "Development",
    responsibilities: "Develop, construct, and maintain cloud-native software and serverless APIs across enterprise platforms, devices, and runtime services.",
    recommendedTimeline: "4 - 9 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "dva-c02", code: "DVA-C02", name: "Developer Associate", level: "Associate", isPrimary: true },
      { certId: "dop-c02", code: "DOP-C02", name: "DevOps Engineer Professional", level: "Professional", isPrimary: true },
    ],
  },

  // 4. Operations
  {
    id: "systems-administrator",
    title: "Systems Administrator",
    category: "Operations",
    responsibilities: "Install, upgrade, and maintain compute components and operating systems; integrate automation scripts and infrastructure backup processes.",
    recommendedTimeline: "4 - 8 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "soa-c02", code: "SOA-C02", name: "SysOps Administrator Associate", level: "Associate", isPrimary: true },
      { certId: "dop-c02", code: "DOP-C02", name: "DevOps Engineer Professional", level: "Professional", isPrimary: true },
    ],
  },
  {
    id: "cloud-engineer",
    title: "Cloud Operations Engineer",
    category: "Operations",
    responsibilities: "Implement and operate enterprise networking and computing infrastructure; enforce compliance baselines and operational security agreements to guarantee zero data loss.",
    recommendedTimeline: "8 - 14 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "soa-c02", code: "SOA-C02", name: "SysOps Administrator Associate", level: "Associate" },
      { certId: "saa-c03", code: "SAA-C03", name: "Solutions Architect Associate", level: "Associate", isPrimary: true },
      { certId: "dop-c02", code: "DOP-C02", name: "DevOps Engineer Professional", level: "Professional", isPrimary: true },
      { certId: "ans-c01", code: "ANS-C01", name: "Advanced Networking Specialty", level: "Specialty" },
    ],
  },

  // 5. DevOps
  {
    id: "test-engineer",
    title: "Quality & Test Engineer",
    category: "DevOps",
    responsibilities: "Build automated quality testing frameworks and synthetic monitors for cloud software delivery from commit to release across the product lifecycle.",
    recommendedTimeline: "4 - 8 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "dva-c02", code: "DVA-C02", name: "Developer Associate", level: "Associate", isPrimary: true },
      { certId: "dop-c02", code: "DOP-C02", name: "DevOps Engineer Professional", level: "Professional", isPrimary: true },
    ],
  },
  {
    id: "cloud-devops-engineer",
    title: "Cloud DevOps Engineer",
    category: "DevOps",
    responsibilities: "Design, deploy, and operate large-scale globally distributed computing environments; advocate for and implement automated CI/CD pipelines.",
    recommendedTimeline: "6 - 12 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "dva-c02", code: "DVA-C02", name: "Developer Associate", level: "Associate" },
      { certId: "soa-c02", code: "SOA-C02", name: "SysOps Administrator Associate", level: "Associate" },
      { certId: "dop-c02", code: "DOP-C02", name: "DevOps Engineer Professional", level: "Professional", isPrimary: true },
    ],
  },
  {
    id: "enterprise-devops-engineer",
    title: "Enterprise DevOps Engineer",
    category: "DevOps",
    responsibilities: "Accelerate enterprise cloud adoption while enabling rapid and reliable delivery of operations using DevOps principles, methodologies, and technologies.",
    recommendedTimeline: "6 - 12 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "dva-c02", code: "DVA-C02", name: "Developer Associate", level: "Associate" },
      { certId: "soa-c02", code: "SOA-C02", name: "SysOps Administrator Associate", level: "Associate" },
      { certId: "dop-c02", code: "DOP-C02", name: "DevOps Engineer Professional", level: "Professional", isPrimary: true },
    ],
  },

  // 6. Security
  {
    id: "cloud-security-engineer",
    title: "Cloud Security Engineer",
    category: "Security",
    responsibilities: "Design cloud security architecture and develop detailed cybersecurity controls; monitor, execute, and track performance of security measures to protect confidential data.",
    recommendedTimeline: "8 - 14 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "saa-c03", code: "SAA-C03", name: "Solutions Architect Associate", level: "Associate" },
      { certId: "scs-c02", code: "SCS-C02", name: "Security Specialty", level: "Specialty", isPrimary: true },
      { certId: "sap-c02", code: "SAP-C02", name: "Solutions Architect Professional", level: "Professional" },
      { certId: "ans-c01", code: "ANS-C01", name: "Advanced Networking Specialty", level: "Specialty" },
    ],
  },
  {
    id: "cloud-security-architect",
    title: "Cloud Security Architect",
    category: "Security",
    responsibilities: "Design and implement enterprise cloud security systems; apply governance controls to identify, communicate, and minimize business and technical risks.",
    recommendedTimeline: "8 - 14 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "saa-c03", code: "SAA-C03", name: "Solutions Architect Associate", level: "Associate" },
      { certId: "scs-c02", code: "SCS-C02", name: "Security Specialty", level: "Specialty", isPrimary: true },
      { certId: "sap-c02", code: "SAP-C02", name: "Solutions Architect Professional", level: "Professional", isPrimary: true },
    ],
  },

  // 7. Networking
  {
    id: "network-engineer",
    title: "Network Engineer",
    category: "Networking",
    responsibilities: "Design and implement hybrid cloud networks, enterprise Direct Connect circuits, Transit Gateway architectures, local area networks (LAN), and wide area networks (WAN).",
    recommendedTimeline: "6 - 12 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "saa-c03", code: "SAA-C03", name: "Solutions Architect Associate", level: "Associate" },
      { certId: "ans-c01", code: "ANS-C01", name: "Advanced Networking Specialty", level: "Specialty", isPrimary: true },
      { certId: "sap-c02", code: "SAP-C02", name: "Solutions Architect Professional", level: "Professional" },
    ],
  },

  // 8. AI & Machine Learning
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "AI & ML",
    responsibilities: "Research, build, and deploy machine learning and generative artificial intelligence systems; automate predictive algorithms and serve LLM models at enterprise scale.",
    recommendedTimeline: "6 - 12 Months",
    path: [
      { certId: "clf-c02", code: "CLF-C02", name: "Cloud Practitioner", level: "Foundational" },
      { certId: "dea-c01", code: "DEA-C01", name: "Data Engineer Associate", level: "Associate" },
      { certId: "mls-c01", code: "MLS-C01", name: "Machine Learning Specialty", level: "Specialty", isPrimary: true },
      { certId: "sap-c02", code: "SAP-C02", name: "Solutions Architect Professional", level: "Professional" },
    ],
  },
];

export const PERSONA_RECOMMENDATIONS: PersonaRecommendation[] = [
  {
    id: "new",
    title: "New to Cloud / Tech",
    subtitle: "Non-IT background or 1st/2nd year undergraduate switching into cloud engineering",
    targetProfile: "Have no prior production IT experience and want to understand how modern cloud computing functions.",
    recommendedCertId: "clf-c02",
    recommendedCertName: "AWS Certified Cloud Practitioner (CLF-C02)",
    reasoning: "Validates fundamental knowledge of AWS Cloud terminology, core services (EC2, S3, RDS, IAM), billing structures, and security responsibilities.",
    nextSteps: "Enrolls you in our 14-day challenge sprint; prepares you for entry-level internships and qualifies you for advanced Associate exam voucher sponsorships.",
  },
  {
    id: "business",
    title: "Related Business & Analytics Roles",
    subtitle: "Management, technical consulting, finance, business analytics, or product strategy",
    targetProfile: "Engage with enterprise technical teams, vendor contracts, IT procurement, or digital transformations.",
    recommendedCertId: "clf-c02",
    recommendedCertName: "AWS Certified Cloud Practitioner (CLF-C02)",
    reasoning: "Builds high-confidence fluency in cloud economics, TCO savings, compliance frameworks, and executive stakeholder communication.",
    nextSteps: "Allows business analysts and project managers to credibly interface with cloud architects and evaluate vendor cloud infrastructure propositions.",
  },
  {
    id: "it",
    title: "Engineering & STEM Students",
    subtitle: "B.Tech (CSE/IT/ECE), BS-MS Math & Data Science, MCA, or developers with coding foundations",
    targetProfile: "Possess 1+ years of programming, systems administration, database, or algorithmic experience.",
    recommendedCertId: "saa-c03",
    recommendedCertName: "AWS Certified Solutions Architect - Associate (SAA-C03)",
    reasoning: "Directly proves ability to architect resilient, scalable, fault-tolerant distributed cloud infrastructure on AWS. Heavily prioritized by campus placement recruiters.",
    nextSteps: "Complete the 14-Day Cloud Practitioner sprint first to build rapid breadth, then transition immediately into the SAA-C03 or DEA-C01 curriculum.",
  },
];

export const FOUR_STEP_READINESS_BLUEPRINT = [
  {
    stepNumber: "01",
    title: "Examine the Official Exam Guide",
    summary: "Download the official AWS exam guide PDF. Study the domain weight distribution, question patterns (multiple-choice vs. multiple-response), and score cutoffs.",
    icon: "search_insights",
  },
  {
    stepNumber: "02",
    title: "Master Coursework on AWS Skill Builder",
    summary: "Complete free self-paced interactive modules, architectural deep-dives, and documentation on AWS Skill Builder (including our 15-module curriculum).",
    icon: "menu_book",
  },
  {
    stepNumber: "03",
    title: "Perform Hands-On Architecture Labs",
    summary: "Build real infrastructure in the AWS Free Tier console or sandbox environments to convert theoretical knowledge into tactile muscle memory.",
    icon: "terminal",
  },
  {
    stepNumber: "04",
    title: "Benchmark with Official Practice Sets",
    summary: "Take timed 20-question official practice diagnostic exams and full-length practice tests on AWS Skill Builder before test day.",
    icon: "task_alt",
  },
];
