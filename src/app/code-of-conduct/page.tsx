import React from "react";
import Link from "next/link";
import { SectionHeader, Card, Badge } from "@/components/ui";

export default function CodeOfConductPage() {
  const guidelines = [
    {
      index: "01",
      title: "Be Inclusive & Respectful",
      text: "We are committed to providing a friendly, safe, and welcoming environment for all students at Harcourt Butler Technical University, regardless of branch, gender, background, or prior technical experience.",
    },
    {
      index: "02",
      title: "Encourage Peer Learning",
      text: "Every builder was once a beginner. Foster a supportive atmosphere where questions are answered constructively, and curiosity is celebrated.",
    },
    {
      index: "03",
      title: "Collaborate in Good Faith",
      text: "Respect open-source licenses, intellectual property, and community guidelines. Give credit where credit is due and help teammates grow.",
    },
    {
      index: "04",
      title: "Zero Tolerance for Harassment",
      text: "Harassment, discriminatory language, and unwelcome behavior are strictly prohibited across all physical workshops, hackathons, and virtual discussion channels.",
    },
  ];

  return (
    <div className="site-container py-8 sm:py-12 md:py-16 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted">
        <Link href="/" className="hover:text-text transition-colors">
          Home
        </Link>
        <span>/</span>
        <span>Community</span>
        <span>/</span>
        <span className="text-text font-bold">Code of Conduct</span>
      </nav>

      <div className="border-b border-border-hairline pb-6">
        <SectionHeader
          tag="COMMUNITY STANDARDS"
          title="Code of Conduct"
          description="Guidelines to ensure a safe, collaborative, and productive environment for all members of the AWS Student Builder Group at HBTU Kanpur."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guidelines.map((item) => (
          <Card key={item.index} variant="interactive" className="p-6 sm:p-8 space-y-3">
            <span className="font-mono text-xs font-bold text-accent">
              RULE {item.index}
            </span>
            <h3 className="font-sans font-bold text-lg text-text">{item.title}</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{item.text}</p>
          </Card>
        ))}
      </div>

      <Card variant="terminal" className="p-6 sm:p-8 space-y-4">
        <Badge variant="mono" size="sm">
          INCIDENT REPORTING
        </Badge>
        <h3 className="font-sans font-bold text-lg text-text">Reporting Guidelines</h3>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          If you witness or experience unacceptable behavior, please notify the Core Team leads
          immediately at{" "}
          <a href="mailto:aws.sbghbtu@gmail.com" className="text-accent underline">
            aws.sbghbtu@gmail.com
          </a>
          . All reports will be handled confidentially and investigated promptly.
        </p>
      </Card>
    </div>
  );
}
