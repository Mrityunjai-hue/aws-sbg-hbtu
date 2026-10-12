export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  content?: string;
}

/**
 * Technical Articles & Blog Data.
 * Per Rule 7 (Zero Fake Hallucinations), initialized as an empty array [].
 * When real student builder tutorials are authored, add items here.
 */
export const BLOG_POSTS_DATA: BlogPost[] = [];
