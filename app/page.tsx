"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../components/Container";
import ButtonLink from "../components/ButtonLink";
import KeishaReviews from "../components/KeishaReviews";
import MindPrintSection from "../components/MindPrintSection";

/* ---------- Animation Hook ---------- */

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ---------- UI Components ---------- */

function FeatureCard({
  title,
  body,
  icon,
  strong,
  index = 0,
  isVisible = true,
}: {
  title: string;
  body: string;
  icon?: string;
  strong?: boolean;
  index?: number;
  isVisible?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-2xl border px-6 py-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
        strong
          ? "border-[#D9CFF2] bg-white/80 shadow-md backdrop-blur-sm"
          : "border-[#E6E0F2] bg-white/60 hover:border-[#D9CFF2] hover:bg-white/80"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F1FB] text-lg transition-transform group-hover:scale-110">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-semibold text-[#3F3A52]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#6B647F]">{body}</p>
      
      {/* Hover accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
  index = 0,
  isVisible = true,
}: {
  label: string;
  value: string;
  icon: string;
  index?: number;
  isVisible?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-[#E6E0F2] bg-white/60 p-6 text-center backdrop-blur-sm transition-all duration-500 hover:border-[#D9CFF2] hover:bg-white/80 hover:shadow-md ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F1FB] text-xl transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="text-xs uppercase tracking-wider text-[#8C84A8]">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tracking-tight text-[#3F3A52]">
        {value}
      </div>
    </div>
  );
}

function ProblemCard({
  title,
  body,
  icon,
  index = 0,
  isVisible = true,
}: {
  title: string;
  body: string;
  icon: string;
  index?: number;
  isVisible?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-2xl border border-[#E6E0F2] bg-white/60 p-6 transition-all duration-500 hover:border-[#D9CFF2] hover:bg-white/80 hover:shadow-md ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEF3F2] text-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#3F3A52]">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#6B647F]">{body}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const whySection = useScrollAnimation();
  const problemSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();
  
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  return (
    <main className="kk-page">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background layers */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2400&auto=format&fit=crop"
            alt="Modern study environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_35%] scale-105"
          />
          <div className="absolute inset-0 bg-[#F7F5FB]/88" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F1ECFA]/95 via-[#F7F5FB]/90 to-[#F7F5FB]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-[#D9CFF2]/30 blur-3xl animate-float-slow" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-[#E6E0F5]/40 blur-3xl animate-float-delayed" />
        </div>

        <Container>
          <div ref={heroRef} className="relative py-20 md:py-28">
            <div className="grid gap-14 lg:grid-cols-12 items-center">
              {/* Left content */}
              <div className="lg:col-span-7">
                <div
                  className={`transition-all duration-700 ${
                    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white/80 px-4 py-1.5 text-xs font-medium text-[#5E5574] backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5E5574] opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5E5574]"></span>
                    </span>
                    Now enrolling for 2026
                  </span>
                </div>

                <h1
                  className={`mt-6 max-w-3xl text-[2.6rem] md:text-[3.6rem] font-semibold leading-[1.08] tracking-tight text-[#3F3A52] transition-all duration-700 delay-100 ${
                    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  Calm, intelligent tutoring —
                  <span className="relative">
                    <br />
                    built for{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-[#5E5574] to-[#7C6B94] bg-clip-text text-transparent">
                        long-term capability
                      </span>
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#D9CFF2]"
                        viewBox="0 0 200 12"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,8 Q50,0 100,8 T200,8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    .
                  </span>
                </h1>

                <p
                  className={`mt-6 max-w-2xl text-base md:text-lg text-[#6B647F] leading-relaxed transition-all duration-700 delay-200 ${
                    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  Personalised 1:1 tutoring for Years 5–10 in Maths, English and
                  Science — guided by psychology-informed systems that build
                  confidence, clarity, and independence.
                </p>

                <div
                  className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
                    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <Link
                    href="/consultation"
                    className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5E5574]/20 transition-all hover:bg-[#4F4865] hover:shadow-xl hover:shadow-[#5E5574]/25 hover:-translate-y-0.5"
                  >
                    Book a free consultation
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
                  </Link>
                  <Link
                    href="/key-method"
                    className="group inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#5E5574] backdrop-blur-sm transition-all hover:bg-white hover:border-[#5E5574]/30 hover:-translate-y-0.5"
                  >
                    Explore the KEY Method
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
                  </Link>
                </div>

                {/* Social proof mini */}
                <div
                  className={`mt-10 flex items-center gap-4 transition-all duration-700 delay-400 ${
                    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="flex -space-x-2">
                    {["PP", "IL", "AJ", "TE"].map((initials, i) => (
                      <div
                        key={initials}
                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#5E5574] text-xs font-semibold text-white shadow-sm"
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[#F2B705]">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                    <div className="text-xs text-[#6B647F]">
                      Trusted by families across Australia
                    </div>
                  </div>
                </div>
              </div>

              {/* Right content - Feature cards */}
              <div className="lg:col-span-5 grid gap-4">
                {[
                  {
                    icon: "🏛️",
                    title: "Private-school level structure",
                    body: "Clear learning pathways, deliberate pacing, and consistent academic oversight.",
                    strong: true,
                  },
                  {
                    icon: "🧠",
                    title: "MindPrint-informed learning",
                    body: "We tailor study strategies to how each student thinks — not just what they study.",
                  },
                  {
                    icon: "📈",
                    title: "Confidence that compounds",
                    body: "Calm coaching that replaces anxiety with clarity and momentum.",
                  },
                ].map((feature, index) => (
                  <FeatureCard
                    key={feature.title}
                    {...feature}
                    index={index}
                    isVisible={heroVisible}
                  />
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div
              className={`mt-16 grid gap-4 md:grid-cols-3 transition-all duration-700 delay-500 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Stat
                icon="💻"
                label="Delivery"
                value="1:1 Online Tutoring"
                index={0}
                isVisible={heroVisible}
              />
              <Stat
                icon="📚"
                label="Focus"
                value="Years 5–10 Mastery"
                index={1}
                isVisible={heroVisible}
              />
              <Stat
                icon="🎓"
                label="Standard"
                value="95+ ATAR Tutors"
                index={2}
                isVisible={heroVisible}
              />
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8C84A8]">
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <div className="h-10 w-6 rounded-full border-2 border-[#D9CFF2] p-1">
            <div className="h-2 w-1.5 mx-auto rounded-full bg-[#5E5574] animate-bounce" />
          </div>
        </div>
      </section>

      {/* ================= WHY SECTION ================= */}
      <section ref={whySection.ref} className="relative border-t border-[#E6E8F0] py-28 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAFBFF] to-white" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F7F5FB]/50 to-transparent" />

        <Container>
          <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left content */}
            <div className="max-w-xl">
              <p
                className={`text-xs tracking-[0.20em] uppercase text-[#8C84A8] transition-all duration-700 ${
                  whySection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Why Kite & Key
              </p>

              <h2
                className={`mt-3 text-[2.1rem] md:text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-[#3F3A52] transition-all duration-700 delay-100 ${
                  whySection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Most students don't need more pressure — they need a{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#5E5574]">better system</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-3 bg-[#E6E0F5]/60 -rotate-1" />
                </span>
                .
              </h2>

              <p
                className={`mt-5 text-base text-[#6B647F] leading-relaxed transition-all duration-700 delay-200 ${
                  whySection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Many capable students struggle not because of ability, but
                because the method doesn't match how they learn. We bridge that gap
                with structured, psychology-informed tutoring.
              </p>

              <div
                className={`mt-8 flex items-center gap-6 transition-all duration-700 delay-300 ${
                  whySection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#5E5574]">73%</div>
                  <div className="text-xs text-[#8C84A8]">of students<br />learn differently</div>
                </div>
                <div className="h-12 w-px bg-[#E6E0F2]" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#5E5574]">2x</div>
                  <div className="text-xs text-[#8C84A8]">faster progress<br />with matched method</div>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div
              className={`relative transition-all duration-700 delay-200 ${
                whySection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-[#E6E1F2] shadow-[0_20px_60px_rgba(94,85,116,0.15)]">
                <Image
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2400&auto=format&fit=crop"
                  alt="Focused student studying"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3F3A52]/20 via-transparent to-transparent" />
                
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-white/90 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4F1FB]">
                      🎯
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#3F3A52]">
                        Personalised approach
                      </div>
                      <div className="text-xs text-[#6B647F]">
                        Every student gets a custom learning pathway
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-2xl border border-[#D9CFF2]/50 bg-[#F7F5FB]/50" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-xl border border-[#D9CFF2]/50 bg-[#F7F5FB]/50" />
            </div>
          </div>

          {/* Problem cards */}
          <div ref={problemSection.ref} className="mt-20">
            <h3
              className={`text-center text-sm font-semibold uppercase tracking-wider text-[#8C84A8] mb-8 transition-all duration-700 ${
                problemSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Common challenges we solve
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: "🏫",
                  title: "One-size-fits-all classrooms",
                  body: "Fixed pacing and generic instruction leave many students quietly falling behind.",
                },
                {
                  icon: "😔",
                  title: "Confidence erodes early",
                  body: "Repeated confusion often gets misread as lack of ability.",
                },
                {
                  icon: "📖",
                  title: "Ineffective study habits",
                  body: "Students are told what to study, not how to learn in a way that suits them.",
                },
                {
                  icon: "❓",
                  title: "Parents left guessing",
                  body: "Without clarity, it's hard to know the right next step.",
                },
              ].map((problem, index) => (
                <ProblemCard
                  key={problem.title}
                  {...problem}
                  index={index}
                  isVisible={problemSection.isVisible}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= SOLUTION BRIDGE ================= */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5E5574] to-[#4A4463]" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <Container>
          <div className="relative text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white max-w-2xl mx-auto">
              That's why we built the{" "}
              <span className="underline decoration-[#D9CFF2]/50 underline-offset-4">
                KEY Method
              </span>{" "}
              — a structured, psychology-informed system for lasting learning.
            </h2>

            <div className="mt-10 flex flex-wrap justify-center gap-8">
              {[
                { letter: "K", word: "Knowledge", desc: "Building foundations" },
                { letter: "E", word: "Engagement", desc: "Active learning" },
                { letter: "Y", word: "Yield", desc: "Measurable results" },
              ].map((item) => (
                <div key={item.letter} className="text-center group">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl font-bold text-white backdrop-blur-sm border border-white/20 transition-transform group-hover:scale-110">
                    {item.letter}
                  </div>
                  <div className="font-semibold text-white">{item.word}</div>
                  <div className="text-sm text-white/60">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/key-method"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#5E5574] transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Discover the KEY Method
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= MINDPRINT ================= */}
      <MindPrintSection />

      {/* ================= REVIEWS ================= */}
      <KeishaReviews />

      {/* ================= FINAL CTA ================= */}
      <section ref={ctaSection.ref} className="border-t border-[#E6E8F0] py-28">
        <Container>
          <div
            className={`relative overflow-hidden rounded-[2.25rem] transition-all duration-700 ${
              ctaSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7F5FB] via-[#EEEAF8] to-[#E6E0F5]" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_20%,rgba(217,207,242,0.6),transparent_60%)]" />
            
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#D9CFF2]/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#5E5574]/10 blur-3xl" />

            <div className="relative p-10 md:p-16">
              <div className="grid gap-10 lg:grid-cols-2 items-center">
                {/* Left content */}
                <div className="max-w-lg">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white/60 px-4 py-1.5 text-xs font-medium text-[#5E5574] mb-6">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Spots available for Term 2
                  </div>

                  <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#3F3A52]">
                    Start with a calm, no-pressure conversation.
                  </h2>

                  <p className="mt-4 text-base text-[#6B647F] leading-relaxed">
                    A free consultation helps us understand your child's needs and
                    whether Kite & Key is the right fit — no obligation, no pressure.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/consultation"
                      className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5E5574]/20 transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Book a free consultation
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#5E5574] transition-all hover:bg-white hover:-translate-y-0.5"
                    >
                      View pricing
                    </Link>
                  </div>
                </div>

                {/* Right - What to expect */}
                <div className="rounded-2xl border border-[#D9CFF2] bg-white/70 p-6 backdrop-blur-sm">
                  <h3 className="text-sm font-semibold text-[#3F3A52] mb-4">
                    What to expect in your consultation:
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: "👋",
                        title: "15-minute chat",
                        body: "A relaxed conversation about your child's needs",
                      },
                      {
                        icon: "🎯",
                        title: "Personalised recommendations",
                        body: "We'll suggest the right approach for your situation",
                      },
                      {
                        icon: "📋",
                        title: "Clear next steps",
                        body: "No pressure — just clarity on how we can help",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F1FB] text-lg">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#3F3A52]">
                            {item.title}
                          </div>
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