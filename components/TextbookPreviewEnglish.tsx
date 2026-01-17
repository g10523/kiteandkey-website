// components/TextbookPreviewEnglish.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, Eye, FileText, CheckCircle, Layout } from "lucide-react";

export default function TextbookPreviewEnglish() {
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
        <section className="py-28 bg-gradient-to-b from-white via-[#FAFBFF] to-[#F7F5FB] border-t border-[#E6E1F2]">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/90 px-5 py-2.5 text-sm font-medium text-[#5E5574] backdrop-blur-sm mb-6 shadow-sm">
                        <BookOpen size={18} />
                        Course Materials
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#3F3A52] tracking-tight">
                        Structured learning materials
                    </h2>
                    <p className="mt-4 text-lg text-[#6B647F] max-w-2xl mx-auto leading-relaxed">
                        Every page is carefully selected and organized with clarity and understanding in mind —
                        materials designed to support the KEY Method approach.
                    </p>
                </div>

                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    {/* Left: Book Preview */}
                    <div className="flex justify-center lg:justify-start">
                        <div className="relative">
                            {/* Enhanced ambient glow */}
                            <div className="absolute -inset-12 rounded-3xl bg-gradient-to-br from-[#E6E1F2]/70 via-[#DDD4F2]/50 to-[#D9CFF2]/60 blur-3xl opacity-60" />

                            {/* Book container */}
                            <div className="relative" style={{ perspective: "1400px" }}>
                                <div className="relative w-[320px] h-[420px] md:w-[380px] md:h-[500px]">
                                    {/* Book spine */}
                                    <div className="absolute left-0 top-0 h-full w-4 rounded-l-md bg-gradient-to-r from-[#5E5574] via-[#6B647F] to-[#5E5574] shadow-lg">
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                                    </div>

                                    {/* Page stack effect */}
                                    <div className="absolute left-4 top-1 right-1 bottom-1 rounded-r-md bg-[#F0EDF5] shadow-sm" />
                                    <div className="absolute left-4 top-2 right-2 bottom-2 rounded-r-md bg-[#F5F3F9] shadow-sm" />
                                    <div className="absolute left-4 top-3 right-3 bottom-3 rounded-r-md bg-[#FAFAFA] shadow-sm" />

                                    {/* Current page */}
                                    <div
                                        className={`absolute left-4 top-0 right-0 bottom-0 rounded-r-2xl bg-white overflow-hidden shadow-2xl border-2 border-[#E6E1F2] transition-transform duration-500 origin-left ${isFlipping && flipDirection === "next"
                                            ? "animate-flip-next"
                                            : ""
                                            } ${isFlipping && flipDirection === "prev"
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
                                            className="object-contain p-2"
                                            priority={currentPage <= 3}
                                        />

                                        {/* Page number indicator */}
                                        <div className="absolute bottom-5 right-5 rounded-full border-2 border-[#D9CFF2] bg-white/95 px-4 py-2 text-xs font-bold text-[#5E5574] backdrop-blur-md shadow-lg">
                                            {currentPage} of {maxPages}
                                        </div>
                                    </div>

                                    {/* Navigation: Previous */}
                                    <button
                                        onClick={() => flipPage("prev")}
                                        disabled={currentPage === 1 || isFlipping}
                                        className="absolute left-4 top-0 h-full w-1/3 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200 disabled:cursor-default disabled:opacity-0 z-10"
                                        aria-label="Previous page"
                                    >
                                        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#5E5574]/10 to-transparent flex items-center justify-start pl-4">
                                            <div className="rounded-full border-2 border-[#E6E1F2] bg-white p-2.5 shadow-lg hover:bg-[#F7F5FB] transition-colors">
                                                <svg
                                                    className="h-5 w-5 text-[#5E5574]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2.5}
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
                                        <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-[#5E5574]/10 to-transparent flex items-center justify-end pr-4">
                                            <div className="rounded-full border-2 border-[#E6E1F2] bg-white p-2.5 shadow-lg hover:bg-[#F7F5FB] transition-colors">
                                                <svg
                                                    className="h-5 w-5 text-[#5E5574]"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2.5}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                </div>

                                {/* Page indicators */}
                                <div className="mt-8 flex items-center justify-center gap-2">
                                    {Array.from({ length: maxPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => goToPage(i + 1)}
                                            aria-label={`Go to page ${i + 1}`}
                                            className={`rounded-full transition-all duration-300 ${currentPage === i + 1
                                                ? "h-2.5 w-8 bg-[#5E5574] shadow-md"
                                                : "h-2.5 w-2.5 bg-[#D9CFF2] hover:bg-[#C4B5FD] hover:scale-125"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Keyboard hint */}
                                <p className="mt-5 text-center text-sm text-[#8C84A8] font-medium">
                                    Click left or right to turn pages
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content - English-specific */}
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#3F3A52] tracking-tight mb-6">
                            Designed for literary mastery
                        </h3>

                        <p className="text-lg text-[#6B647F] leading-relaxed mb-8">
                            Our English materials build analytical skills through carefully
                            sequenced texts, examples, and exercises that develop critical literacy.
                        </p>

                        {/* Features grid - English-specific */}
                        <div className="space-y-4 mb-10">
                            {[
                                {
                                    icon: Eye,
                                    label: "Annotated texts",
                                    description: "Model analyses showing how to identify techniques, themes, and evidence in literary texts"
                                },
                                {
                                    icon: FileText,
                                    label: "Structured responses",
                                    description: "TEEL/PEEL paragraph frameworks with exemplars demonstrating analytical writing"
                                },
                                {
                                    icon: CheckCircle,
                                    label: "Progressive tasks",
                                    description: "From comprehension to analysis to creative response, building sophistication gradually"
                                },
                                {
                                    icon: Layout,
                                    label: "Clear metalanguage",
                                    description: "Literary terminology introduced systematically with examples and application exercises"
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="group flex items-start gap-4 rounded-xl border border-[#E6E1F2] bg-white/90 p-5 backdrop-blur-sm transition-all hover:border-[#D9CFF2] hover:shadow-md"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4F1FB] text-[#5E5574] transition-transform group-hover:scale-110">
                                        <item.icon size={20} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#3F3A52] text-base mb-1">
                                            {item.label}
                                        </div>
                                        <div className="text-sm text-[#6B647F] leading-relaxed">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
