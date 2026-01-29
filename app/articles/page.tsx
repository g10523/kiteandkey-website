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
    slug: "ranking-first-nsw-mathematics",
    title: "How I Ranked 1st in NSW for 3 Unit Mathematics — What Actually Made the Difference",
    excerpt:
      "In 2021, I achieved 1st place in NSW for Mathematics Extension 1. Most people think I had some natural talent or discovered some hidden trick. In reality, this came as a product of consistent effort, deep understanding, and learning how to study mathematics properly.",
    topic: "Academic Excellence",
    readTime: "7 min read",
    headerImage: "/articles/ranking-first-nsw-mathematics/hero.jpg",
    publishedAt: "2026-01-20",
    author: "Philo Daoud",
  },
  {
    slug: "starting-early-for-medicine",
    title: "Starting Early for Medicine — What Actually Matters in Years 5–10",
    excerpt:
      "Deciding whether you want to pursue medicine whilst in school can be a big dilemma. Here's VIP insider advice on how to explore, learn, and prepare for a career in medicine during your early high school years.",
    topic: "Academic Strategy",
    readTime: "8 min read",
    headerImage: "/articles/starting-early-for-medicine/hero.jpg",
    publishedAt: "2026-01-15",
    author: "Mia Ooi",
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
            <h1 className="font-julius text-5xl md:text-6xl font-medium text-[#2D2640] mb-6">
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
                  ${selectedTopic === topic
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
              <h3 className="font-julius text-xl text-[#4A4358] mb-2">
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
                  ${currentPage === 1
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
                    ${currentPage === page
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
                  ${currentPage === totalPages
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
            <h2 className="font-julius text-2xl text-[#2D2640] mb-3">
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
          <h3 className="font-julius text-xl font-semibold text-[#2D2640] mb-3 leading-tight group-hover:text-[#5E5574] transition-colors">
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