// components/TextbookPreview.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TextbookPreview() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const maxPages = 9;

  const flipPage = (direction: "next" | "prev") => {
    if (isFlipping) return;

    const newPage =
      direction === "next"
        ? Math.min(currentPage + 1, maxPages)
        : Math.max(currentPage - 1, 1);

    if (newPage === currentPage) return;

    setFlipDirection(direction);
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentPage(newPage);
      setIsFlipping(false);
    }, 500);
  };

  const goToPage = (page: number) => {
    if (page === currentPage || isFlipping) return;
    setFlipDirection(page > currentPage ? "next" : "prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsFlipping(false);
    }, 500);
  };

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-[#E6E1F2]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Left: Book Preview */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Soft ambient glow */}
              <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-[#E6E1F2]/60 via-[#DDD4F2]/40 to-[#E6E1F2]/60 blur-2xl" />

              {/* Book container */}
              <div className="relative" style={{ perspective: "1200px" }}>
                <div className="relative w-[300px] h-[400px] md:w-[340px] md:h-[450px]">
                  {/* Book spine */}
                  <div className="absolute left-0 top-0 h-full w-3 rounded-l-sm bg-gradient-to-r from-[#5E5574] to-[#6B647F] shadow-inner" />

                  {/* Page stack effect */}
                  <div className="absolute left-3 top-1 right-1 bottom-1 rounded-r-sm bg-[#F0EDF5]" />
                  <div className="absolute left-3 top-2 right-2 bottom-2 rounded-r-sm bg-[#F5F3F9]" />

                  {/* Current page */}
                  <div
                    className={`absolute left-3 top-0 right-0 bottom-0 rounded-r-xl bg-white overflow-hidden shadow-lg border border-[#E6E1F2] transition-transform duration-500 origin-left ${
                      isFlipping && flipDirection === "next"
                        ? "animate-flip-next"
                        : ""
                    } ${
                      isFlipping && flipDirection === "prev"
                        ? "animate-flip-prev"
                        : ""
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Page Image */}
                    <Image
                      src={`/year_10_maths/Sample_year_10_maths-${currentPage}.png`}
                      alt={`Textbook page ${currentPage}`}
                      fill
                      className="object-contain"
                      priority={currentPage <= 3}
                    />

                    {/* Page number indicator */}
                    <div className="absolute bottom-4 right-4 rounded-full border border-[#E6E1F2] bg-white/90 px-3 py-1.5 text-xs font-medium text-[#5E5574] backdrop-blur-sm shadow-sm">
                      {currentPage} of {maxPages}
                    </div>
                  </div>

                  {/* Navigation: Previous */}
                  <button
                    onClick={() => flipPage("prev")}
                    disabled={currentPage === 1 || isFlipping}
                    className="absolute left-3 top-0 h-full w-1/3 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200 disabled:cursor-default disabled:opacity-0 z-10"
                    aria-label="Previous page"
                  >
                    <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#5E5574]/5 to-transparent flex items-center justify-start pl-3">
                      <div className="rounded-full border border-[#E6E1F2] bg-white p-2 shadow-sm">
                        <svg
                          className="h-4 w-4 text-[#5E5574]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Navigation: Next */}
                  <button
                    onClick={() => flipPage("next")}
                    disabled={currentPage === maxPages || isFlipping}
                    className="absolute right-0 top-0 h-full w-1/3 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200 disabled:cursor-default disabled:opacity-0 z-10"
                    aria-label="Next page"
                  >
                    <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-[#5E5574]/5 to-transparent flex items-center justify-end pr-3">
                      <div className="rounded-full border border-[#E6E1F2] bg-white p-2 shadow-sm">
                        <svg
                          className="h-4 w-4 text-[#5E5574]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Page indicators */}
                <div className="mt-6 flex items-center justify-center gap-1.5">
                  {Array.from({ length: maxPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      aria-label={`Go to page ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        currentPage === i + 1
                          ? "h-2 w-5 bg-[#5E5574]"
                          : "h-2 w-2 bg-[#D9CFF2] hover:bg-[#C4B5FD]"
                      }`}
                    />
                  ))}
                </div>

                {/* Keyboard hint */}
                <p className="mt-4 text-center text-xs text-[#8C84A8]">
                  Click left or right to turn pages
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              Course Materials
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52] tracking-tight">
              Explore our custom textbook
            </h2>

            <p className="mt-4 text-lg text-[#6B647F] leading-relaxed">
              Each lesson is crafted with clarity in mind — visual explanations, 
              worked examples, and practice sets designed to build genuine understanding.
            </p>

            {/* Features grid */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Clear layouts", description: "Easy to follow structure" },
                { label: "Worked examples", description: "Step-by-step solutions" },
                { label: "Practice sets", description: "Graduated difficulty" },
                { label: "Visual guides", description: "Diagrams that clarify" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#E6E1F2] bg-white/80 p-4 backdrop-blur-sm transition-all hover:border-[#D9CFF2] hover:shadow-sm"
                >
                  <div className="font-semibold text-[#3F3A52] text-sm">
                    {item.label}
                  </div>
                  <div className="text-xs text-[#8C84A8] mt-1">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/year_10_maths/Sample_year_10_maths.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white px-6 py-3 text-sm font-semibold text-[#5E5574] transition-all hover:border-[#5E5574]/30 hover:bg-[#F7F5FB]"
              >
                Download sample chapter
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes flip-next {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(-15deg);
          }
        }
        @keyframes flip-prev {
          0% {
            transform: rotateY(-15deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }
        .animate-flip-next {
          animation: flip-next 0.25s ease-out forwards,
            flip-next 0.25s ease-in 0.25s reverse forwards;
        }
        .animate-flip-prev {
          animation: flip-prev 0.25s ease-in forwards,
            flip-prev 0.25s ease-out 0.25s reverse forwards;
        }
      `}</style>
    </section>
  );
}