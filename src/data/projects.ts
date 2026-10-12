export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageSlotId?: string;
  imageUrl?: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  authors: string[];
  createdAt: string;
}

/**
 * Projects Showcase Data.
 * Per Rule 7 (Zero Fake Hallucinations), initialized as an empty array [].
 * When real student projects are submitted and approved, add objects to this array.
 */
export const PROJECTS_DATA: ProjectItem[] = [];
