"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ==================== Types & Data ==================== */

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  readTime: string;
  headerImage: string;
  publishedAt: string;
  author: string;
}

const TOPICS = [
  "All",
  "Learning Science",
  "Cognition",
  "Study Systems",
  "Academic Strategy",
  "Parent Guidance",
] as const;

type Topic = (typeof TOPICS)[number];

const articles: Article[] = [
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
  {
    slug: "understanding-cognitive-load",
    title: "Understanding Cognitive Load: Why Less Is Often More",
    excerpt:
      "The brain can only process so much at once. Learn how managing cognitive load leads to deeper understanding and better academic outcomes.",
    topic: "Cognition",
    readTime: "6 min read",
    headerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    publishedAt: "2024-12-10",
    author: "Kite & Key Academy",
  },
  {
    slug: "spaced-repetition-science",
    title: "The Science of Spaced Repetition: Building Lasting Knowledge",
    excerpt:
      "Discover why spacing out study sessions dramatically improves long-term retention compared to cramming.",
    topic: "Study Systems",
    readTime: "7 min read",
    headerImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
    publishedAt: "2024-12-05",
    author: "Kite & Key Academy",
  },
  {
    slug: "helping-your-child-study",
    title: "A Parent's Guide to Supporting Study Without Taking Over",
    excerpt:
      "How to create the right environment and mindset for your child's academic success without becoming the homework police.",
    topic: "Parent Guidance",
    readTime: "5 min read",
    headerImage: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=1200&q=80",
    publishedAt: "2024-11-28",
    author: "Kite & Key Academy",
  },
  {
    slug: "exam-preparation-strategies",
    title: "Strategic Exam Preparation: A Framework for Success",
    excerpt:
      "Move beyond last-minute cramming with evidence-based strategies that build confidence and deliver results.",
    topic: "Academic Strategy",
    readTime: "9 min read",
    headerImage: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&q=80",
    publishedAt: "2024-11-20",
    author: "Kite & Key Academy",
  },
  {
    slug: "working-memory-learning",
    title: "Working Memory and Learning: What Every Student Should Know",
    excerpt:
      "Understanding the limitations and strengths of working memory can unlock more effective learning strategies.",
    topic: "Cognition",
    readTime: "6 min read",
    headerImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80",
    publishedAt: "2024-11-15",
    author: "Kite & Key Academy",
  },
];

const ARTICLES_PER_PAGE = 6;

/* ==================== Main Page Component ==================== */

export default function ArticlesPage() {
  const [selectedTopic, setSelectedTopic] = useState<Topic>("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter articles by topic
  const filteredArticles =
    selectedTopic === "All"
      ? articles
      : articles.filter((article) => article.topic === selectedTopic);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handleTopicChange = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FDFCFE] to-[#F7F5FA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#E8E4F0]/40 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-[#DDD8E8]/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#E8E4F0]/20 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D9CFF2]/50 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#7A7189] mb-8">
            <Link href="/" className="hover:text-[#5E5574] transition-colors">
              Home
            </Link>
            <span className="text-[#B8B0C9]">/</span>
            <span className="text-[#5E5574]">Articles</span>
          </div>

          {/* Hero Content */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-cormorant text-5xl md:text-6xl font-medium text-[#2D2640] mb-6">
              Articles
            </h1>
            <p className="text-lg text-[#6B647F] leading-relaxed">
              Research-backed insights on learning, cognition, and study systems.
              <br className="hidden md:block" />
              Evidence-based guidance for students and parents.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D9CFF2]" />
            <div className="w-2 h-2 rounded-full bg-[#D9CFF2]" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D9CFF2]" />
          </div>
        </div>
      </section>

      {/* Topic Filter Bar */}
      <section className="sticky top-0 z-40 bg-[#FDFCFE]/80 backdrop-blur-xl border-y border-[#E8E4F0]/60">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicChange(topic)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${
                    selectedTopic === topic
                      ? "bg-[#5E5574] text-white shadow-md shadow-[#5E5574]/20"
                      : "bg-white/70 text-[#6B647F] border border-[#E8E4F0] hover:border-[#D9CFF2] hover:bg-white"
                  }
                `}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Results Count */}
          <p className="text-sm text-[#7A7189] mb-8">
            Showing {paginatedArticles.length} of {filteredArticles.length} articles
            {selectedTopic !== "All" && ` in ${selectedTopic}`}
          </p>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* Empty State */}
          {paginatedArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F7F5FA] flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#B8B0C9]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="font-cormorant text-xl text-[#4A4358] mb-2">
                No articles found
              </h3>
              <p className="text-[#7A7189]">
                Try selecting a different topic or check back soon.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                  ${
                    currentPage === 1
                      ? "bg-[#F7F5FA] text-[#B8B0C9] cursor-not-allowed"
                      : "bg-white text-[#6B647F] border border-[#E8E4F0] hover:border-[#D9CFF2]"
                  }
                `}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    w-10 h-10 rounded-full text-sm font-medium transition-all duration-200
                    ${
                      currentPage === page
                        ? "bg-[#5E5574] text-white shadow-md shadow-[#5E5574]/20"
                        : "bg-white text-[#6B647F] border border-[#E8E4F0] hover:border-[#D9CFF2]"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                  ${
                    currentPage === totalPages
                      ? "bg-[#F7F5FA] text-[#B8B0C9] cursor-not-allowed"
                      : "bg-white text-[#6B647F] border border-[#E8E4F0] hover:border-[#D9CFF2]"
                  }
                `}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-b from-transparent to-[#F3F1F6]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8E4F0]/60 p-10">
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E8E4F0] to-[#D9CFF2] flex items-center justify-center">
              <svg className="w-7 h-7 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="font-cormorant text-2xl text-[#2D2640] mb-3">
              Stay Informed
            </h2>
            <p className="text-[#6B647F] mb-8">
              Receive thoughtful insights on learning and academic development, delivered monthly.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-xl border border-[#E8E4F0] bg-white text-[#4A4358] placeholder-[#A9A1B8] focus:outline-none focus:border-[#D9CFF2] focus:ring-2 focus:ring-[#D9CFF2]/20 transition-all"
              />
              <button 
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#5E5574] text-white font-medium hover:bg-[#4F4865] transition-all hover:shadow-lg hover:shadow-[#5E5574]/20"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-[#A9A1B8] mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ==================== Article Card Component ==================== */

interface ArticleCardProps {
  article: Article;
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <article className="h-full bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8E4F0]/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#5E5574]/5 hover:border-[#D9CFF2]/80 hover:-translate-y-1 flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.headerImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2640]/30 to-transparent" />
          
          {/* Topic Tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-[#5E5574] border border-white/50 shadow-sm">
              {article.topic}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-cormorant text-xl font-semibold text-[#2D2640] mb-3 leading-tight group-hover:text-[#5E5574] transition-colors">
            {article.title}
          </h3>
          
          <p className="text-sm text-[#6B647F] leading-relaxed mb-4 flex-1" style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-[#E8E4F0]/60">
            <span className="text-xs text-[#A9A1B8]">{article.readTime}</span>
            <span className="text-sm font-medium text-[#5E5574] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Read article
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}