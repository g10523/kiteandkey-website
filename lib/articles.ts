export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  readTime: string;
  headerImage: string;
  publishedAt: string;
  author: string;
}

export const TOPICS = [
  "All",
  "Learning Science",
  "Cognition",
  "Study Systems",
  "Academic Strategy",
  "Parent Guidance",
] as const;

export type Topic = (typeof TOPICS)[number];

export const articles: Article[] = [
  {
    slug: "why-most-study-time-is-wasted",
    title: "Why Most Study Time Is Wasted — And How Cognitive Alignment Fixes It",
    excerpt:
      "Research shows that up to 80% of traditional study time produces minimal retention. Understanding cognitive alignment can transform how students learn.",
    topic: "Learning Science",
    readTime: "8 min read",
    headerImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80",
    publishedAt: "2024-12-15",
    author: "Kite & Key Academy",
  },

];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByTopic(topic: Topic): Article[] {
  if (topic === "All") return articles;
  return articles.filter((article) => article.topic === topic);
}