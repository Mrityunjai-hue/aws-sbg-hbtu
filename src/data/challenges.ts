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

/**
 * Monthly Builder Challenges Data.
 * Per Rule 7 (Zero Fake Hallucinations), initialized as an empty array [].
 * When sprint challenges are announced, add items here.
 */
export const CHALLENGES_DATA: ChallengeItem[] = [];
