"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
      <path d="M24 8V12M24 36V40M8 24H12M36 24H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  heart: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 40C24 40 8 30 8 18C8 12 12 8 16 8C20 8 24 12 24 12C24 12 28 8 32 8C36 8 40 12 40 18C40 30 24 40 24 40Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.05)" />
    </svg>
  ),

  clock: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" fill="rgba(94, 85, 116, 0.05)" />
      <path d="M24 12V24L32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  const [countdown, setCountdown] = useState(7); // Scarcity: Limited spots

  useEffect(() => {
    setHeroVisible(true);
    // Simulate dynamic scarcity
    const timer = setInterval(() => {
      setCountdown(prev => Math.max(3, prev - Math.random() > 0.7 ? 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="kk-page">
      {/* ==========================================
          1. HERO — INSTANT VALUE PROPOSITION
          ========================================== */}
      <section className="relative overflow-hidden min-h-[94vh] flex items-center">
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
          <div className="absolute top-[15%] left-[8%] w-12 h-12 text-[#5E5574] opacity-10 animate-float-slow">{Icons.kite}</div>
          <div className="absolute top-[25%] right-[12%] w-10 h-10 text-[#5E5574] opacity-15 animate-float-delayed">{Icons.key}</div>
          <div className="absolute bottom-[30%] left-[5%] w-8 h-8 text-[#5E5574] opacity-12 animate-float-slow" style={{ animationDelay: '2s' }}>{Icons.mind}</div>
        </div>

        {/* Content */}
        <Container>
          <div ref={heroRef} className="relative py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center">
              {/* Scarcity + Urgency Badge */}
              <div className={`transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <motion.div
                  className="inline-flex items-center gap-3 rounded-full border-2 border-red-200 bg-red-50/90 px-5 py-2 text-sm font-bold text-red-700 backdrop-blur-sm shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600"></span>
                  </span>
                  Only {countdown} spots remaining for Term 1
                </motion.div>
              </div>

              {/* Main headline - Problem-Solution-Outcome */}
              <h1 className={`mt-8 text-[2.8rem] md:text-[4.2rem] font-semibold leading-[1.05] tracking-tight text-[#3F3A52] transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                Your child <span className="italic">can</span> understand.<br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 bg-gradient-to-r from-[#5E5574] to-[#7C6B94] bg-clip-text text-transparent">
                    They just need the right method.
                  </span>
                  <svg className="absolute -bottom-3 left-0 w-full h-4 text-[#D9CFF2]" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              {/* Benefit-focused subheading with specificity */}
              <p className={`mt-8 max-w-2xl mx-auto text-lg md:text-xl text-[#6B647F] leading-relaxed transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <strong className="text-[#3F3A52]">Psychology-informed 1:1 tutoring</strong> for Years 5–10 that builds confidence, understanding, and results — without the overwhelm.
              </p>

              {/* CTA buttons with friction reduction */}
              <div className={`mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <Link
                  href="/enrol"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#5E5574] px-9 py-5 text-base font-bold text-white shadow-2xl shadow-[#5E5574]/30 transition-all hover:bg-[#4F4865] hover:shadow-[#5E5574]/40 hover:-translate-y-1 hover:scale-105"
                >
                  <span className="absolute -top-2 -right-2 bg-[#F4D03F] text-[#3F3A52] text-[10px] font-black px-2 py-0.5 rounded-full rotate-12">POPULAR</span>
                  Enrol Now (2 min application)
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/consultation"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#D9CFF2] bg-white/90 px-9 py-5 text-base font-bold text-[#5E5574] backdrop-blur-sm transition-all hover:bg-white hover:border-[#5E5574]/50 hover:-translate-y-1 hover:shadow-lg"
                >
                  Book Free Consultation (No Pressure)
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Social proof + Authority */}
              <div className={`mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 transition-all duration-700 delay-400 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {["PP", "IL", "AJ", "TE", "MK"].map((initials) => (
                      <div key={initials} className="flex h-11 w-11 items-center justify-center rounded-full border-3 border-white bg-[#5E5574] text-sm font-semibold text-white shadow-md">
                        {initials}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 text-[#F2B705]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-5 h-5">{Icons.star}</div>
                      ))}
                    </div>
                    <div className="text-sm font-bold text-[#3F3A52]">150+ NSW families trust us</div>
                  </div>
                </div>

                <div className="hidden sm:block h-12 w-px bg-[#E6E0F2]" />

                <div className="text-center bg-white/60 backdrop-blur px-4 py-2 rounded-xl border border-[#E6E0F2]">
                  <div className="text-base font-bold text-[#3F3A52]">100% NSW Syllabus Aligned</div>
                  <div className="text-sm text-[#6B647F]">Years 5–10 | English, Maths, Science</div>
                </div>
              </div>

              {/* Risk reversal statement */}
              <p className={`mt-8 text-sm text-[#8C84A8] transition-all duration-700 delay-500 ${heroVisible ? "opacity-100" : "opacity-0"}`}>
                ✓ No lock-in contracts  ✓ First session satisfaction guarantee  ✓ Cancel anytime
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          2. THE PROBLEM (AGITATE PAIN POINTS)
          ========================================== */}
      <section ref={problemSection.ref} className="relative border-t border-[#E6E8F0] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAFBFF] to-white" />

        <Container>
          <div className="relative max-w-4xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-700 ${problemSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8] font-bold">
                Does this sound familiar?
              </p>
              <h2 className="mt-4 text-[2.4rem] md:text-[3.2rem] font-semibold leading-[1.12] tracking-tight text-[#3F3A52]">
                Smart kids, <span className="relative inline-block">
                  <span className="relative z-10 text-[#5E5574]">struggling students</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-3 bg-[#E6E0F5]/60 -rotate-1" />
                </span>
              </h2>
              <p className="mt-7 text-lg text-[#6B647F] leading-relaxed max-w-2xl mx-auto">
                It's not about ability. When the teaching method doesn't match how your child thinks, confusion and anxiety become the norm.
              </p>
            </div>

            {/* Pain point cards with emotional resonance */}
            <div className={`grid gap-6 md:grid-cols-2 transition-all duration-700 delay-200 ${problemSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {[
                {
                  title: "\"I just don't get it\"",
                  body: "When explanations don't land, students start believing the problem is them—not the teaching method.",
                  icon: Icons.heart,
                  bgClass: "bg-red-50",
                  textClass: "text-red-600"
                },
                {
                  title: "Falling behind, quietly",
                  body: "Classroom pacing moves on before true understanding sets in. Gaps accumulate, confidence drops.",
                  icon: Icons.clock,
                  bgClass: "bg-amber-50",
                  textClass: "text-amber-600"
                },
                {
                  title: "Study harder ≠ Study smarter",
                  body: "More hours don't help if the strategy doesn't match how your child's brain processes information.",
                  icon: Icons.compass,
                  bgClass: "bg-blue-50",
                  textClass: "text-blue-600"
                },
                {
                  title: "You want to help, but...",
                  body: "Without knowing what's actually happening cognitively, it's hard to know the right next step.",
                  icon: Icons.checkCircle,
                  bgClass: "bg-purple-50",
                  textClass: "text-purple-600"
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemSection.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl border-2 border-[#E6E0F2] bg-white p-7 transition-all duration-500 hover:border-[#D9CFF2] hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-start gap-5">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${item.bgClass} ${item.textClass} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                      <div className="w-7 h-7">{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#3F3A52]">{item.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-[#6B647F]">{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Transition to solution */}
            <div className={`mt-12 text-center transition-all duration-700 delay-600 ${problemSection.isVisible ? "opacity-100" : "opacity-0"}`}>
              <p className="text-lg font-semibold text-[#5E5574]">
                There's a better way →
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          3. THE SOLUTION — VALUE PROPOSITION
          ========================================== */}
      <section ref={keyMethodSection.ref} className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5E5574] via-[#6B5F85] to-[#5E5574]" />
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
        </div>

        <Container>
          <div className="relative">
            <div className={`text-center mb-16 transition-all duration-700 ${keyMethodSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-sm tracking-[0.20em] uppercase text-white/80 font-bold">
                Introducing
              </p>
              <h2 className="mt-3 text-[2.6rem] md:text-[3.6rem] font-semibold leading-[1.12] tracking-tight text-white max-w-4xl mx-auto">
                The <span className="italic">KEY Method:</span> Teaching that matches how your child learns
              </h2>
              <p className="mt-7 text-lg text-white/90 leading-relaxed max-w-2xl mx-auto font-medium">
                A psychology-informed system that builds understanding before speed, confidence before results.
              </p>
            </div>

            {/* Method cards with unique value props */}
            <div className={`grid gap-6 md:grid-cols-4 max-w-6xl mx-auto transition-all duration-700 delay-200 ${keyMethodSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {[
                {
                  icon: Icons.structure,
                  title: "Structure",
                  body: "Clear frameworks reduce overwhelm and build confidence through predictability.",
                  badge: "Clarity"
                },
                {
                  icon: Icons.sequence,
                  title: "Sequencing",
                  body: "Concepts introduced in the right order—matched to how the brain naturally learns.",
                  badge: "Flow"
                },
                {
                  icon: Icons.pace,
                  title: "Cognitive Pacing",
                  body: "We adjust based on real-time understanding, not arbitrary timelines.",
                  badge: "Adaptive"
                },
                {
                  icon: Icons.mastery,
                  title: "Mastery Focus",
                  body: "Deep understanding over surface coverage. Quality, not just quantity.",
                  badge: "Results"
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={keyMethodSection.isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl border-2 border-white/30 bg-white/15 backdrop-blur-md p-6 text-center transition-all hover:bg-white/25 hover:border-white/50 hover:scale-105"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F4D03F] text-[#3F3A52] text-xs font-black px-3 py-1 rounded-full">
                    {item.badge}
                  </div>
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-white/30 text-white transition-transform group-hover:scale-110 group-hover:rotate-12">
                    <div className="w-8 h-8">{item.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA with curiosity gap */}
            <div className={`mt-14 text-center transition-all duration-700 delay-500 ${keyMethodSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <Link
                href="/enrol"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-bold text-[#5E5574] transition-all hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
              >
                See How It Works For Your Child
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="mt-4 text-sm text-white/70">
                Free consultation • No pressure • Clear next steps
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          4. MINDPRINT™ — UNIQUE MECHANISM
          ========================================== */}
      <MindPrintSection />

      {/* ==========================================
          5. SUBJECTS (SPECIFICITY BUILDS TRUST)
          ========================================== */}
      <section ref={subjectsSection.ref} className="relative border-t border-[#E6E8F0] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAFBFF] to-white" />

        <Container>
          <div className="relative max-w-4xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-700 ${subjectsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8] font-bold">
                What we teach
              </p>
              <h2 className="mt-4 text-[2.4rem] md:text-[3.2rem] font-semibold leading-[1.15] tracking-tight text-[#3F3A52]">
                Curriculum-aligned, cognitive-focused
              </h2>
              <p className="mt-7 text-base text-[#6B647F] leading-relaxed max-w-2xl mx-auto">
                NSW Syllabus content taught through the KEY Method—building transferable understanding across core subjects.
              </p>
            </div>

            <div className={`grid gap-6 md:grid-cols-3 transition-all duration-700 delay-200 ${subjectsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {[
                {
                  icon: Icons.book,
                  subject: "English",
                  years: "Years 5–10",
                  description: "Critical reading, analytical writing, textual interpretation.",
                  color: "#5E5574",
                },
                {
                  icon: Icons.structure,
                  subject: "Mathematics",
                  years: "Years 5–10",
                  description: "Conceptual understanding, problem-solving, mathematical reasoning.",
                  color: "#6B5F85",
                },
                {
                  icon: Icons.beaker,
                  subject: "Science",
                  years: "Years 7–10",
                  description: "Scientific inquiry, experimental design, evidence-based thinking.",
                  color: "#7C6B94",
                },
              ].map((item, index) => (
                <div
                  key={item.subject}
                  className="group relative rounded-2xl border-2 border-[#E6E0F2] bg-white backdrop-blur-sm p-8 text-center transition-all hover:border-[#D9CFF2] hover:shadow-xl hover:-translate-y-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    <div className="w-9 h-9">{item.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#3F3A52]">{item.subject}</h3>
                  <p className="mt-2 text-sm font-bold text-[#8C84A8]">{item.years}</p>
                  <p className="mt-4 text-sm text-[#6B647F] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className={`mt-10 text-center transition-all duration-700 delay-400 ${subjectsSection.isVisible ? "opacity-100" : "opacity-0"}`}>
              <p className="text-sm font-semibold text-[#5E5574]">
                All sessions are 1:1 online • Fully personalized to your child's MindPrint™
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          6. SOCIAL PROOF — TESTIMONIALS
          ========================================== */}
      <KeishaReviews />

      {/* ==========================================
          7. DIFFERENTIATION — WHY US
          ========================================== */}
      <section ref={differenceSection.ref} className="relative border-t border-[#E6E8F0] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F7F5FB]" />

        <Container>
          <div className="relative max-w-5xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-700 ${differenceSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8] font-bold">
                Why choose us
              </p>
              <h2 className="mt-4 text-[2.4rem] md:text-[3.2rem] font-semibold leading-[1.15] tracking-tight text-[#3F3A52]">
                Not just tutoring. <span className="italic">Mentorship.</span>
              </h2>
            </div>

            <div className={`space-y-6 transition-all duration-700 delay-200 ${differenceSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {[
                {
                  statement: "We are mentors, not tutors",
                  explanation: "Long-term relationships focused on sustainable growth, not short-term grade fixes.",
                  benefit: "Your child develops independence"
                },
                {
                  statement: "We teach systems, not shortcuts",
                  explanation: "Methods designed to be internalized and applied far beyond our sessions.",
                  benefit: "Skills that transfer across subjects"
                },
                {
                  statement: "We measure confidence, not just marks",
                  explanation: "Academic outcomes follow naturally when students feel capable, calm, and clear.",
                  benefit: "Reduced anxiety, better performance"
                },
                {
                  statement: "We adapt to cognition, not curriculum alone",
                  explanation: "The syllabus is the destination. MindPrint™ is the map. The KEY Method is how we navigate.",
                  benefit: "Teaching that actually fits"
                },
              ].map((item, index) => (
                <motion.div
                  key={item.statement}
                  initial={{ opacity: 0, x: -20 }}
                  animate={differenceSection.isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl border-2 border-[#E6E0F2] bg-white/80 backdrop-blur-sm p-7 transition-all hover:border-[#5E5574]/30 hover:bg-white hover:shadow-lg hover:-translate-x-2"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5E5574] text-white text-lg font-bold group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#3F3A52]">{item.statement}</h3>
                      <p className="mt-2 text-base text-[#6B647F] leading-relaxed">{item.explanation}</p>
                      <div className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#5E5574]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item.benefit}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          8. FINAL CTA — CONVERSION FOCUS
          ========================================== */}
      <section ref={ctaSection.ref} className="border-t border-[#E6E8F0] py-24 md:py-32">
        <Container>
          <div className={`relative overflow-hidden rounded-[2.5rem] transition-all duration-700 ${ctaSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7F5FB] via-[#EEEAF8] to-[#E6E0F5]" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_20%,rgba(217,207,242,0.6),transparent_60%)]" />

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#D9CFF2]/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#5E5574]/10 blur-3xl" />
            <div className="absolute top-12 right-24 w-14 h-14 text-[#D9CFF2]/40">{Icons.kite}</div>
            <div className="absolute bottom-12 left-24 w-12 h-12 text-[#D9CFF2]/30">{Icons.key}</div>

            {/* Content */}
            <div className="relative p-10 md:p-16">
              <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
                {/* Left column */}
                <div className="max-w-xl">
                  {/* Scarcity reminder */}
                  <motion.div
                    className="inline-flex items-center gap-3 rounded-full border-2 border-red-200 bg-red-50/80 px-5 py-2 text-sm font-bold text-red-700 mb-6"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                    Only {countdown} spots left this term
                  </motion.div>

                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#3F3A52] leading-[1.1]">
                    Ready to see your child confident and capable?
                  </h2>

                  <p className="mt-6 text-lg text-[#6B647F] leading-relaxed">
                    Start with a <strong className="text-[#3F3A52]">free, no-pressure consultation</strong>—or enroll directly if you're ready to secure your spot.
                  </p>

                  {/* Dual CTA */}
                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/enrol"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5E5574] px-8 py-4 text-base font-bold text-white shadow-2xl shadow-[#5E5574]/30 transition-all hover:bg-[#4F4865] hover:shadow-[#5E5574]/40 hover:-translate-y-1 hover:scale-105"
                    >
                      Enrol Now
                      <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link
                      href="/consultation"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#D9CFF2] bg-white/90 px-8 py-4 text-base font-bold text-[#5E5574] transition-all hover:bg-white hover:-translate-y-1 hover:shadow-lg"
                    >
                      Book Free Call
                    </Link>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[#6B647F]">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">No lock-in contract</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Satisfaction guarantee</span>
                    </div>
                  </div>
                </div>

                {/* Right column - What to expect */}
                <div className="rounded-2xl border-2 border-[#D9CFF2] bg-white/80 p-7 backdrop-blur-sm shadow-xl">
                  <h3 className="text-base font-bold text-[#3F3A52] mb-5 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    What happens next:
                  </h3>
                  <div className="space-y-5">
                    {[
                      {
                        icon: Icons.compass,
                        title: "15-min consultation",
                        body: "Relaxed chat about your child's needs and goals"
                      },
                      {
                        icon: Icons.mind,
                        title: "Personalized plan",
                        body: "We recommend the right approach for your situation"
                      },
                      {
                        icon: Icons.checkCircle,
                        title: "Clear next steps",
                        body: "No pressure—just clarity on how we can help"
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4 group">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4F1FB] text-[#5E5574] transition-transform group-hover:scale-110">
                          <div className="w-6 h-6">{item.icon}</div>
                        </div>
                        <div>
                          <div className="text-base font-bold text-[#3F3A52]">{item.title}</div>
                          <div className="text-sm text-[#6B647F] mt-1">{item.body}</div>
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