"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../components/Container";
import KeishaReviews from "../components/KeishaReviews";
import MindPrintSection from "../components/MindPrintSection";

/* ==========================================
   BRAND ICONS
   ========================================== */

const Icons = {
  kite: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 6L34 18L24 30L14 18L24 6Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.1)" />
      <line x1="24" y1="6" x2="24" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="14" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M24 30 Q26 34 24 38 Q22 42 24 44" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),

  key: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.1)" />
      <circle cx="24" cy="14" r="4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <line x1="24" y1="22" x2="24" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 32 L28 32 L28 34 L24 34" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M24 36 L30 36 L30 38 L24 38" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),

  mind: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 8C18 8 14 12 14 18C14 22 16 24 16 28V32H32V28C32 24 34 22 34 18C34 12 30 8 24 8Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.1)" />
      <path d="M18 18C18 18 20 20 24 20C28 20 30 18 30 18" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="32" x2="20" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="32" x2="24" y2="38" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="32" x2="28" y2="36" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),

  structure: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="8" y="8" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.05)" />
      <line x1="8" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="24" y1="20" x2="24" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="16" cy="30" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="32" cy="30" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  ),

  sequence: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="12" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.1)" />
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.1)" />
      <circle cx="36" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.1)" />
      <path d="M16 24 L20 24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M28 24 L32 24" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),

  pace: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M8 36L18 26L26 32L40 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="26" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="26" cy="32" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  ),

  mastery: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 8L4 18L24 28L44 18L24 8Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.1)" />
      <path d="M12 22V34C12 34 16 38 24 38C32 38 36 34 36 34V22" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),

  book: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M8 12C8 12 12 10 24 10C36 10 40 12 40 12V38C40 38 36 36 24 36C12 36 8 38 8 38V12Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.1)" />
      <line x1="24" y1="10" x2="24" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  ),

  beaker: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M16 8H32V20L40 38C40 40 38 42 36 42H12C10 42 8 40 8 38L16 20V8Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.05)" />
      <line x1="16" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 36C12 36 16 32 24 32C32 32 36 36 36 36" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  ),

  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  ),

  checkCircle: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.05)" />
      <path d="M16 24L22 30L32 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  compass: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M24 8V12M24 36V40M8 24H12M36 24H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  heart: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 40C24 40 8 30 8 18C8 12 12 8 16 8C20 8 24 12 24 12C24 12 28 8 32 8C36 8 40 12 40 18C40 30 24 40 24 40Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.05)" />
    </svg>
  ),
};

/* ==========================================
   ANIMATION HOOK
   ========================================== */

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ==========================================
   HOMEPAGE
   ========================================== */

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const problemSection = useScrollAnimation();
  const keyMethodSection = useScrollAnimation();
  const subjectsSection = useScrollAnimation();
  const differenceSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  return (
    <main className="kk-page">
      {/* ==========================================
          1. HERO — THE PHILOSOPHY
          ========================================== */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Background layers */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2400&auto=format&fit=crop"
            alt="Calm study environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-[#F7F5FB]/92" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F1ECFA]/95 via-[#F7F5FB]/90 to-[#F7F5FB]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D9CFF2]/25 blur-3xl animate-float-slow" />
          <div className="absolute bottom-20 left-1/4 w-96 h-96 rounded-full bg-[#E6E0F5]/35 blur-3xl animate-float-delayed" />

          {/* Floating icons */}
          <div className="absolute top-[15%] left-[8%] w-12 h-12 text-[#5E5574] opacity-10 animate-float-slow">{Icons.kite}</div>
          <div className="absolute top-[25%] right-[12%] w-10 h-10 text-[#5E5574] opacity-15 animate-float-delayed">{Icons.key}</div>
          <div className="absolute bottom-[30%] left-[5%] w-8 h-8 text-[#5E5574] opacity-12 animate-float-slow" style={{ animationDelay: '2s' }}>{Icons.mind}</div>
        </div>

        {/* Content */}
        <Container>
          <div ref={heroRef} className="relative py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className={`transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white/80 px-4 py-1.5 text-xs font-medium text-[#5E5574] backdrop-blur-sm shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5E5574] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5E5574]"></span>
                  </span>
                  Now enrolling for 2026
                </span>
              </div>

              {/* Main headline */}
              <h1 className={`mt-8 text-[2.6rem] md:text-[3.8rem] font-semibold leading-[1.08] tracking-tight text-[#3F3A52] transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                Understanding comes before confidence.
                <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 bg-gradient-to-r from-[#5E5574] to-[#7C6B94] bg-clip-text text-transparent">
                    Confidence comes before results.
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#D9CFF2]" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              {/* Subheadline */}
              <p className={`mt-7 max-w-2xl mx-auto text-base md:text-lg text-[#6B647F] leading-relaxed transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                Premium 1:1 tutoring for Years 5–10 in English, Mathematics, and Science — built on psychology-informed systems, not quick fixes.
              </p>

              {/* CTA buttons */}
              <div className={`mt-10 flex flex-wrap justify-center gap-4 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <Link
                  href="/consultation"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#5E5574]/20 transition-all hover:bg-[#4F4865] hover:shadow-xl hover:shadow-[#5E5574]/25 hover:-translate-y-0.5"
                >
                  Book a free consultation
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/mindprint"
                  className="group inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white/70 px-8 py-4 text-sm font-semibold text-[#5E5574] backdrop-blur-sm transition-all hover:bg-white hover:border-[#5E5574]/30 hover:-translate-y-0.5"
                >
                  Discover MindPrint
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 transition-all duration-700 delay-400 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["PP", "IL", "AJ", "TE"].map((initials) => (
                      <div key={initials} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#5E5574] text-xs font-semibold text-white shadow-sm">
                        {initials}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 text-[#F2B705]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-4 h-4">{Icons.star}</div>
                      ))}
                    </div>
                    <div className="text-xs text-[#6B647F]">Trusted by NSW families</div>
                  </div>
                </div>

                <div className="hidden sm:block h-10 w-px bg-[#E6E0F2]" />

                <div className="text-center">
                  <div className="text-sm font-semibold text-[#3F3A52]">NSW Syllabus Aligned</div>
                  <div className="text-xs text-[#6B647F]">Years 5–10</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          2. THE PROBLEM — THE MISMATCH
          ========================================== */}
      <section ref={problemSection.ref} className="relative border-t border-[#E6E8F0] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAFBFF] to-white" />

        <Container>
          <div className="relative max-w-4xl mx-auto">
            {/* Section header */}
            <div className={`text-center mb-16 transition-all duration-700 ${problemSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8]">
                The real issue
              </p>
              <h2 className="mt-3 text-[2.1rem] md:text-[2.8rem] font-semibold leading-[1.15] tracking-tight text-[#3F3A52]">
                Most students don't fail due to ability.
                <br />
                They fail due to a <span className="relative inline-block">
                  <span className="relative z-10 text-[#5E5574]">mismatch</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-3 bg-[#E6E0F5]/60 -rotate-1" />
                </span>.
              </h2>
              <p className="mt-6 text-base md:text-lg text-[#6B647F] leading-relaxed max-w-2xl mx-auto">
                When teaching methods don't align with how a student processes information, anxiety and confusion become symptoms — not causes.
              </p>
            </div>

            {/* Problem cards */}
            <div className={`grid gap-6 md:grid-cols-2 transition-all duration-700 delay-200 ${problemSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {[
                {
                  title: "Generic classroom pacing",
                  body: "One-size-fits-all instruction leaves many students quietly falling behind, while others wait for the class to catch up.",
                  icon: Icons.sequence,
                },
                {
                  title: "Confidence erodes early",
                  body: "Repeated confusion gets misread as lack of ability, creating a cycle where students disengage before they've had a real chance.",
                  icon: Icons.heart,
                },
                {
                  title: "Study habits, not study skills",
                  body: "Students are told what to study, but rarely shown how to learn in a way that matches their cognitive strengths.",
                  icon: Icons.compass,
                },
                {
                  title: "Parents left guessing",
                  body: "Without clarity on what's actually happening cognitively, it's difficult to know the right next step.",
                  icon: Icons.checkCircle,
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="group relative rounded-2xl border border-[#E6E0F2] bg-white/60 p-6 transition-all duration-500 hover:border-[#D9CFF2] hover:bg-white/80 hover:shadow-md"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F7F5FB] text-[#5E5574] transition-transform group-hover:scale-110">
                      <div className="w-6 h-6">{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#3F3A52]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B647F]">{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          3. THE SOLUTION — THE KEY METHOD
          ========================================== */}
      <section ref={keyMethodSection.ref} className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5E5574] via-[#6B5F85] to-[#5E5574]" />
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
        </div>

        <Container>
          <div className="relative">
            {/* Header */}
            <div className={`text-center mb-16 transition-all duration-700 ${keyMethodSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-xs tracking-[0.20em] uppercase text-white/70">
                Our approach
              </p>
              <h2 className="mt-3 text-[2.1rem] md:text-[2.8rem] font-semibold leading-[1.15] tracking-tight text-white max-w-3xl mx-auto">
                The KEY Method: Structure, sequencing, and cognitive pacing
              </h2>
              <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                A psychology-informed system that prioritises mastery over speed, understanding over memorisation.
              </p>
            </div>

            {/* Method cards */}
            <div className={`grid gap-6 md:grid-cols-4 max-w-5xl mx-auto transition-all duration-700 delay-200 ${keyMethodSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {[
                {
                  icon: Icons.structure,
                  title: "Structure",
                  body: "Clear frameworks that reduce cognitive load and build confidence through predictability.",
                },
                {
                  icon: Icons.sequence,
                  title: "Sequencing",
                  body: "Concepts introduced in the right order, matched to how the brain naturally builds understanding.",
                },
                {
                  icon: Icons.pace,
                  title: "Cognitive Pacing",
                  body: "Adjusting speed and complexity based on real-time cognitive feedback, not arbitrary timelines.",
                },
                {
                  icon: Icons.mastery,
                  title: "Mastery Focus",
                  body: "Deep understanding over surface coverage. Quality of learning, not quantity of content.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 text-center transition-all hover:bg-white/15 hover:border-white/30"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-white transition-transform group-hover:scale-110">
                    <div className="w-7 h-7">{item.icon}</div>
                  </div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`mt-12 text-center transition-all duration-700 delay-400 ${keyMethodSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <Link
                href="/key-method"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#5E5574] transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Explore the KEY Method
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          4. MINDPRINT™ PREVIEW
          ========================================== */}
      <MindPrintSection />

      {/* ==========================================
          5. SUBJECTS & YEAR LEVELS
          ========================================== */}
      <section ref={subjectsSection.ref} className="relative border-t border-[#E6E8F0] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAFBFF] to-white" />

        <Container>
          <div className="relative max-w-4xl mx-auto">
            {/* Header */}
            <div className={`text-center mb-16 transition-all duration-700 ${subjectsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8]">
                What we teach
              </p>
              <h2 className="mt-3 text-[2.1rem] md:text-[2.8rem] font-semibold leading-[1.15] tracking-tight text-[#3F3A52]">
                Subjects designed for progression, not cramming
              </h2>
              <p className="mt-6 text-base text-[#6B647F] leading-relaxed max-w-2xl mx-auto">
                We focus on building deep, transferable understanding across core subjects — aligned to the NSW Syllabus.
              </p>
            </div>

            {/* Subject cards */}
            <div className={`grid gap-6 md:grid-cols-3 transition-all duration-700 delay-200 ${subjectsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {[
                {
                  icon: Icons.book,
                  subject: "English",
                  years: "Years 5–10",
                  description: "Critical reading, analytical writing, and textual interpretation.",
                  color: "#5E5574",
                },
                {
                  icon: Icons.structure,
                  subject: "Mathematics",
                  years: "Years 5–10",
                  description: "Conceptual understanding, problem-solving, and mathematical reasoning.",
                  color: "#6B5F85",
                },
                {
                  icon: Icons.beaker,
                  subject: "Science",
                  years: "Years 7–10",
                  description: "Scientific inquiry, experimental design, and evidence-based thinking.",
                  color: "#7C6B94",
                },
              ].map((item, index) => (
                <div
                  key={item.subject}
                  className="group relative rounded-2xl border border-[#E6E0F2] bg-white/80 backdrop-blur-sm p-8 text-center transition-all hover:border-[#D9CFF2] hover:shadow-lg"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <div className="w-8 h-8">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#3F3A52]">{item.subject}</h3>
                  <p className="mt-1 text-sm font-medium text-[#8C84A8]">{item.years}</p>
                  <p className="mt-4 text-sm text-[#6B647F] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className={`mt-12 text-center transition-all duration-700 delay-400 ${subjectsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-sm text-[#8C84A8]">
                All sessions are 1:1 online, tailored to individual learning profiles
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          6. REVIEWS / TESTIMONIALS
          ========================================== */}
      <KeishaReviews />

      {/* ==========================================
          7. THE KITE & KEY DIFFERENCE
          ========================================== */}
      <section ref={differenceSection.ref} className="relative border-t border-[#E6E8F0] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F7F5FB]" />

        <Container>
          <div className="relative max-w-5xl mx-auto">
            {/* Header */}
            <div className={`text-center mb-16 transition-all duration-700 ${differenceSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8]">
                Our philosophy
              </p>
              <h2 className="mt-3 text-[2.1rem] md:text-[2.8rem] font-semibold leading-[1.15] tracking-tight text-[#3F3A52]">
                The Kite & Key difference
              </h2>
            </div>

            {/* Manifesto statements */}
            <div className={`space-y-8 transition-all duration-700 delay-200 ${differenceSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {[
                {
                  statement: "We are mentors, not tutors",
                  explanation: "We build long-term relationships focused on sustainable growth, not short-term grade fixes.",
                },
                {
                  statement: "We teach systems, not shortcuts",
                  explanation: "Our methods are designed to be internalised and applied independently, far beyond our sessions.",
                },
                {
                  statement: "We measure confidence, not just marks",
                  explanation: "Academic outcomes follow naturally when students feel capable, calm, and clear about their learning.",
                },
                {
                  statement: "We adapt to cognition, not curriculum alone",
                  explanation: "The syllabus is the destination. MindPrint™ is the map. The KEY Method is how we navigate.",
                },
              ].map((item, index) => (
                <div
                  key={item.statement}
                  className="group relative rounded-2xl border border-[#E6E0F2] bg-white/60 backdrop-blur-sm p-8 transition-all hover:border-[#D9CFF2] hover:bg-white/80 hover:shadow-md"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5E5574] text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#3F3A52]">{item.statement}</h3>
                      <p className="mt-2 text-sm text-[#6B647F] leading-relaxed">{item.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          8. FINAL CTA — CALM CONVERSION
          ========================================== */}
      <section ref={ctaSection.ref} className="border-t border-[#E6E8F0] py-24 md:py-32">
        <Container>
          <div className={`relative overflow-hidden rounded-[2.25rem] transition-all duration-700 ${ctaSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7F5FB] via-[#EEEAF8] to-[#E6E0F5]" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_20%,rgba(217,207,242,0.6),transparent_60%)]" />

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#D9CFF2]/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#5E5574]/10 blur-3xl" />
            <div className="absolute top-10 right-20 w-12 h-12 text-[#D9CFF2]/40">{Icons.kite}</div>
            <div className="absolute bottom-10 left-20 w-10 h-10 text-[#D9CFF2]/30">{Icons.key}</div>

            {/* Content */}
            <div className="relative p-10 md:p-16">
              <div className="grid gap-10 lg:grid-cols-2 items-center">
                {/* Left column */}
                <div className="max-w-lg">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white/60 px-4 py-1.5 text-xs font-medium text-[#5E5574] mb-6">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Spots available for Term 2
                  </div>

                  <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#3F3A52]">
                    Start with a calm, no-pressure conversation
                  </h2>

                  <p className="mt-4 text-base text-[#6B647F] leading-relaxed">
                    A free consultation helps us understand your child's needs and whether Kite & Key is the right fit — no obligation, no pressure.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/consultation"
                      className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5E5574]/20 transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Book a free consultation
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#5E5574] transition-all hover:bg-white hover:-translate-y-0.5"
                    >
                      View pricing
                    </Link>
                  </div>
                </div>

                {/* Right column */}
                <div className="rounded-2xl border border-[#D9CFF2] bg-white/70 p-6 backdrop-blur-sm">
                  <h3 className="text-sm font-semibold text-[#3F3A52] mb-4">What to expect in your consultation:</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Icons.compass,
                        title: "15-minute chat",
                        body: "A relaxed conversation about your child's needs and learning goals",
                      },
                      {
                        icon: Icons.checkCircle,
                        title: "Personalised recommendations",
                        body: "We'll suggest the right approach based on your situation",
                      },
                      {
                        icon: Icons.heart,
                        title: "Clear next steps",
                        body: "No pressure — just clarity on how we can help",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4 group">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F1FB] text-[#5E5574] transition-transform group-hover:scale-110">
                          <div className="w-5 h-5">{item.icon}</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#3F3A52]">{item.title}</div>
                          <div className="text-sm text-[#6B647F]">{item.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}