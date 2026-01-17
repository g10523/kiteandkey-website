"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Brain,
  BookOpen,
  Users,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Target,
  Zap,
  TrendingUp,
  CheckCircle,
  Layers,
  GitBranch,
  Compass,
  Clock,
  FileText,
  Settings,
  Eye,
  Lightbulb,
  Activity,
  RefreshCw,
} from "lucide-react";

/* ==========================================
   SCROLL ANIMATION HOOK
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
   MAIN PAGE
   ========================================== */
export default function KeyMethodPage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <ProblemSection />
      <IntroducingKEYSection />
      <MindPrintSection />
      <MindPrintDrivesClassesSection />
      <MindPrintTutorsSection />
      <MindPrintLMSSection />
      <MindPrintResourcesSection />
      <EcosystemSection />
      <LongTermSection />
      <CTASection />
    </main>
  );
}

/* ==========================================
   1. HERO SECTION
   ========================================== */
function HeroSection() {
  const section = useScrollAnimation();

  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5FB] via-[#FAFBFF] to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#E6E0F5]/40 rounded-full blur-3xl" />
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-[#D9CFF2]/30 rounded-full blur-3xl" />

      <div
        ref={section.ref}
        className={`relative mx-auto max-w-7xl px-6 text-center transition-all duration-700 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/90 px-5 py-2.5 text-sm font-medium text-[#5E5574] backdrop-blur-sm mb-6 shadow-sm">
          <Brain size={18} />
          The KEY Method
        </div>

        {/* Title */}
        <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#3F3A52]">
          Learning that adapts
          <br />
          to the learner
        </h1>

        {/* KEY Acronym with Stained Glass Squares */}
        <div className="mt-12 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* K - Knowledge */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C6B94] to-[#5E5574] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#E6E1F2] via-[#D9CFF2] to-[#C4B5DA] backdrop-blur-sm border-2 border-white/40 shadow-2xl flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-[#5E5574]">K</span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-lg md:text-xl font-semibold text-[#3F3A52]">Knowledge</div>
                <div className="text-sm text-[#8C84A8]">Foundation first</div>
              </div>
            </div>

            {/* Connector */}
            <div className="hidden md:block w-8 h-[2px] bg-gradient-to-r from-[#D9CFF2] to-[#E6E1F2]" />

            {/* E - Engage */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B7FA8] to-[#6B5F85] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#E6E1F2] via-[#D9CFF2] to-[#C4B5DA] backdrop-blur-sm border-2 border-white/40 shadow-2xl flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-[#5E5574]">E</span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-lg md:text-xl font-semibold text-[#3F3A52]">Engage</div>
                <div className="text-sm text-[#8C84A8]">Active learning</div>
              </div>
            </div>

            {/* Connector */}
            <div className="hidden md:block w-8 h-[2px] bg-gradient-to-r from-[#D9CFF2] to-[#E6E1F2]" />

            {/* Y - Yield */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9B8FB5] to-[#7C6B94] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#E6E1F2] via-[#D9CFF2] to-[#C4B5DA] backdrop-blur-sm border-2 border-white/40 shadow-2xl flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-[#5E5574]">Y</span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-lg md:text-xl font-semibold text-[#3F3A52]">Yield</div>
                <div className="text-sm text-[#8C84A8]">Results emerge</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-6 text-lg md:text-xl text-[#6B647F] max-w-3xl mx-auto leading-relaxed">
          A structured, adaptive learning system that aligns how a student learns
          with what they are taught and how they are guided.
        </p>
      </div>
    </section>
  );
}


/* ==========================================
   2. THE PROBLEM SECTION
   ========================================== */
function ProblemSection() {
  const section = useScrollAnimation();

  return (
    <section ref={section.ref} className="py-24 md:py-32 border-t border-[#E6E8F0]">
      <div className="mx-auto max-w-4xl px-6">
        <div className={`transition-all duration-700 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8] mb-4 text-center">
            The Hidden Pattern
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3F3A52] tracking-tight text-center mb-6">
            Why effort often fails to match outcomes
          </h2>
          <p className="text-lg text-[#6B647F] leading-relaxed text-center max-w-2xl mx-auto mb-16">
            Students are told to study harder. But more hours rarely produce better results.
            The issue isn't effort — it's alignment.
          </p>
        </div>

        {/* Effort vs Outcome Visual */}
        <div className={`mb-16 transition-all duration-700 delay-100 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative rounded-2xl border border-[#E6E0F2] bg-gradient-to-br from-[#FAFBFF] to-white p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              {/* Effort side */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-[#5E5574]/10 flex items-center justify-center mx-auto mb-4">
                  <Clock size={40} className="text-[#5E5574]" />
                </div>
                <h3 className="text-lg font-semibold text-[#3F3A52] mb-2">More Hours</h3>
                <p className="text-sm text-[#6B647F]">Studying harder</p>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-[2px] bg-[#E6E0F2] relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-[#E6E0F2]" />
                </div>
                <span className="text-xs text-[#8C84A8]">≠</span>
              </div>

              {/* Outcome side */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-[#F7F5FB] flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-[#D9CFF2]">
                  <TrendingUp size={40} className="text-[#8C84A8]" />
                </div>
                <h3 className="text-lg font-semibold text-[#3F3A52] mb-2">Better Results</h3>
                <p className="text-sm text-[#6B647F]">Expected outcome</p>
              </div>
            </div>

            <p className="text-center text-sm text-[#6B647F] mt-8 max-w-lg mx-auto">
              When teaching methods don't align with how a student processes information,
              the disconnect shows up as frustration, not progress.
            </p>
          </div>
        </div>

        {/* Problem cards */}
        <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {[
            {
              title: "Generic instruction ignores cognitive diversity",
              body: "Every student processes information differently. Teaching the same way to everyone means most students are being taught in ways that don't match how they think.",
            },
            {
              title: "Tutoring often reacts instead of anticipates",
              body: "Most tutoring waits for problems to appear. By then, confidence is already damaged. The pattern should be: understand first, then teach accordingly.",
            },
            {
              title: "Volume is mistaken for learning",
              body: "More practice papers, more hours, more content. But without the right delivery method, repetition just reinforces confusion.",
            },
            {
              title: "Parents are left without clarity",
              body: "Without understanding what's actually happening cognitively, it's difficult to know if the approach is working — until it's too late.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-[#E6E0F2] bg-white/60 transition-all hover:border-[#D9CFF2] hover:bg-white"
            >
              <h3 className="text-base font-semibold text-[#3F3A52] mb-3">{item.title}</h3>
              <p className="text-sm text-[#6B647F] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   3. INTRODUCING THE KEY METHOD
   ========================================== */
function IntroducingKEYSection() {
  const section = useScrollAnimation();

  return (
    <section ref={section.ref} className="py-24 md:py-32 bg-gradient-to-b from-[#F7F5FB] to-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8] mb-4">
            A Different Approach
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3F3A52] tracking-tight mb-6">
            The KEY Method: An interconnected system
          </h2>
          <p className="text-lg text-[#6B647F] leading-relaxed max-w-2xl mx-auto">
            Learning should adjust to the student — not the other way around.
            The KEY Method is built around a single principle: understand first, then teach.
          </p>
        </div>

        {/* System diagram */}
        <div className={`transition-all duration-700 delay-200 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative rounded-3xl border border-[#E6E0F2] bg-white p-8 md:p-12">
            {/* Central student node */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 w-28 h-28 rounded-full bg-[#5E5574]/10 animate-pulse" style={{ animationDuration: "3s" }} />
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#5E5574] to-[#7C6B94] flex flex-col items-center justify-center text-white shadow-xl">
                  <Brain size={36} strokeWidth={1.5} />
                  <span className="text-xs font-medium mt-1">Student</span>
                </div>
              </div>
            </div>

            {/* Surrounding pillars */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: <BarChart3 size={24} />, title: "MindPrint", subtitle: "Cognitive profiling", color: "#5E5574" },
                { icon: <Users size={24} />, title: "Tutors", subtitle: "Guided mentorship", color: "#6B5F85" },
                { icon: <BookOpen size={24} />, title: "Garden LMS", subtitle: "Adaptive platform", color: "#7C6B94" },
                { icon: <FileText size={24} />, title: "Resources", subtitle: "Strategic materials", color: "#8B7FA8" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-[#3F3A52]">{item.title}</h3>
                  <p className="text-xs text-[#8C84A8]">{item.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Connection lines (decorative) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5E5574" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#D9CFF2" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>

            <p className="text-center text-sm text-[#6B647F] mt-10 max-w-xl mx-auto">
              Every component reinforces the others. Nothing operates in isolation.
              The result is a system that adapts continuously to each student.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   4. MINDPRINT SECTION (CENTER OF GRAVITY)
   ========================================== */
function MindPrintSection() {
  const section = useScrollAnimation();

  return (
    <section ref={section.ref} className="py-24 md:py-32 border-t border-[#E6E8F0]">
      <div className="mx-auto max-w-5xl px-6">
        <div className={`transition-all duration-700 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#5E5574] flex items-center justify-center text-white">
              <BarChart3 size={24} />
            </div>
          </div>
          <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8] mb-4 text-center">
            The Intelligence Layer
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3F3A52] tracking-tight text-center mb-6">
            MindPrint: Understanding before instruction
          </h2>
          <p className="text-lg text-[#6B647F] leading-relaxed text-center max-w-2xl mx-auto mb-16">
            MindPrint is a cognitive profiling system. It doesn't label students —
            it reveals how they process, retain, and apply information.
          </p>
        </div>

        {/* What MindPrint measures */}
        <div className={`mb-16 transition-all duration-700 delay-100 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-xl font-semibold text-[#3F3A52] text-center mb-8">What MindPrint reveals</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Eye size={24} />,
                title: "Processing Style",
                body: "How information is initially received — visual, verbal, sequential, or spatial preferences that affect comprehension.",
              },
              {
                icon: <Layers size={24} />,
                title: "Cognitive Strengths",
                body: "Natural aptitudes in reasoning, pattern recognition, working memory, and processing speed.",
              },
              {
                icon: <GitBranch size={24} />,
                title: "Learning Patterns",
                body: "How understanding is constructed — whether through concepts first or procedures, depth or breadth, examples or rules.",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[#E6E0F2] bg-white text-center">
                <div className="w-12 h-12 rounded-xl bg-[#F7F5FB] flex items-center justify-center text-[#5E5574] mx-auto mb-4">
                  {item.icon}
                </div>
                <h4 className="text-base font-semibold text-[#3F3A52] mb-2">{item.title}</h4>
                <p className="text-sm text-[#6B647F] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why this matters */}
        <div className={`transition-all duration-700 delay-200 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="rounded-2xl border border-[#E6E0F2] bg-gradient-to-br from-[#FAFBFF] to-white p-8 md:p-10">
            <h3 className="text-xl font-semibold text-[#3F3A52] mb-6">
              Why two students studying the same content may need different approaches
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Student A */}
              <div className="p-6 rounded-xl bg-white border border-[#E6E0F2]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#5E5574] flex items-center justify-center text-white text-sm font-bold">A</div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#3F3A52]">Conceptual Learner</h4>
                    <p className="text-xs text-[#8C84A8]">Needs the "why" before the "how"</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-[#6B647F]">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-[#5E5574] mt-0.5 shrink-0" />
                    Prefers understanding principles first
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-[#5E5574] mt-0.5 shrink-0" />
                    Transfers knowledge to new problems easily
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-[#5E5574] mt-0.5 shrink-0" />
                    May resist rote practice without context
                  </li>
                </ul>
              </div>

              {/* Student B */}
              <div className="p-6 rounded-xl bg-white border border-[#E6E0F2]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#6B5F85] flex items-center justify-center text-white text-sm font-bold">B</div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#3F3A52]">Procedural Learner</h4>
                    <p className="text-xs text-[#8C84A8]">Needs the "how" to understand the "why"</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-[#6B647F]">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-[#6B5F85] mt-0.5 shrink-0" />
                    Prefers step-by-step examples first
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-[#6B5F85] mt-0.5 shrink-0" />
                    Builds understanding through practice
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-[#6B5F85] mt-0.5 shrink-0" />
                    May feel lost with abstract explanations
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center text-sm text-[#6B647F] mt-8 max-w-xl mx-auto">
              Same topic. Same goal. Different pathways to understanding.
              MindPrint ensures the right approach is used from the start.
            </p>
          </div>
        </div>

        {/* Dynamic profile note */}
        <div className={`mt-12 transition-all duration-700 delay-300 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 p-6 rounded-xl bg-[#F7F5FB] border border-[#E6E0F2]">
            <div className="w-12 h-12 rounded-xl bg-[#5E5574] flex items-center justify-center text-white shrink-0">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="text-base font-semibold text-[#3F3A52] mb-1">A dynamic profile, not a static label</h4>
              <p className="text-sm text-[#6B647F]">
                MindPrint evolves as the student develops. Profiles are updated continuously,
                reflecting growth and changing cognitive patterns over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   5. HOW MINDPRINT SHAPES EVERY SESSION
   ========================================== */
function MindPrintDrivesClassesSection() {
  const section = useScrollAnimation();

  return (
    <section ref={section.ref} className="py-24 md:py-32 bg-gradient-to-b from-white to-[#F7F5FB]">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8] mb-4">
            Same Curriculum, Adapted Delivery
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3F3A52] tracking-tight mb-6">
            How MindPrint shapes every session
          </h2>
          <p className="text-lg text-[#6B647F] leading-relaxed max-w-2xl mx-auto">
            The textbooks remain consistent. The tutor's delivery method adapts.
          </p>
        </div>

        {/* Main Visual Flow */}
        <div className={`transition-all duration-700 delay-100 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="rounded-3xl border border-[#E6E0F2] bg-white p-6 md:p-10 overflow-hidden">

            {/* Horizontal Flow - Desktop */}
            <div className="hidden lg:flex items-stretch gap-5">

              {/* STAGE 1: Fixed Textbook */}
              <div className="flex-shrink-0 w-44">
                <div className="h-full flex flex-col">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#8C84A8] mb-3 text-center">Fixed Curriculum</p>
                  <div className="flex-1 rounded-2xl border-2 border-[#E6E0F2] bg-gradient-to-b from-[#FAFBFF] to-white p-5 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-[#F7F5FB] border border-[#E6E0F2] flex items-center justify-center mb-4">
                      <BookOpen size={28} className="text-[#5E5574]" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#3F3A52] text-center mb-2">Textbooks</h4>
                    <p className="text-xs text-[#8C84A8] text-center">NSW Syllabus</p>
                    <p className="text-[10px] text-[#8C84A8] text-center mt-1 italic">Same for all students</p>
                  </div>
                </div>
              </div>

              {/* Connector Arrow 1 */}
              <div className="flex-shrink-0 flex items-center">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-[2px] bg-gradient-to-r from-[#E6E0F2] to-[#D9CFF2]" />
                  <ChevronRight size={16} className="text-[#D9CFF2]" />
                </div>
              </div>

              {/* STAGE 2: Tutor informed by MindPrint */}
              <div className="flex-shrink-0 w-48">
                <div className="h-full flex flex-col">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#8C84A8] mb-3 text-center">Tutor Informed by MindPrint</p>
                  <div className="flex-1 rounded-2xl bg-gradient-to-b from-[#5E5574] to-[#4F4865] p-5 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Subtle effect */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-white" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                      {/* Tutor + MindPrint combo */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-11 h-11 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Users size={22} className="text-white" />
                        </div>
                        <div className="text-white/60 text-lg">+</div>
                        <div className="w-11 h-11 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <BarChart3 size={22} className="text-white" />
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white text-center mb-1">Tutor</h4>
                      <p className="text-[10px] text-white/70 text-center">Guided by profile</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector Arrow 2 - Splits into two */}
              <div className="flex-shrink-0 flex items-center">
                <div className="relative h-full flex items-center">
                  <svg width="40" height="120" viewBox="0 0 40 120" fill="none" className="text-[#D9CFF2]">
                    <path d="M0 60 L15 60 L15 25 L40 25" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M0 60 L15 60 L15 95 L40 95" stroke="currentColor" strokeWidth="2" fill="none" />
                    <polygon points="38,22 38,28 42,25" fill="currentColor" />
                    <polygon points="38,92 38,98 42,95" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* STAGE 3: Divergent Delivery */}
              <div className="flex-1 flex flex-col gap-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#8C84A8] text-center">Delivery Method Adapts</p>

                {/* Student A - Conceptual Explorer */}
                <div className="flex-1 rounded-2xl border border-[#E6E0F2] bg-white p-5 hover:border-[#D9CFF2] hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#5E5574] flex items-center justify-center text-white text-sm font-bold">A</div>
                      <p className="text-[9px] text-[#8C84A8] text-center mt-1">Conceptual</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Same Question from textbook */}
                      <div className="mb-3 p-2.5 rounded-lg bg-[#F7F5FB] border border-[#E6E0F2]">
                        <p className="text-[10px] text-[#8C84A8] mb-1">From Textbook</p>
                        <p className="text-xs text-[#3F3A52] font-medium">Solve: 2x + 5 = 13</p>
                      </div>
                      {/* Different Explanation - Visual/Conceptual */}
                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#FAFBFF] to-white border border-[#E6E0F2]">
                        <p className="text-[10px] text-[#5E5574] font-medium mb-2">Tutor explains: Why it works</p>
                        <div className="flex items-center gap-3">
                          {/* Balance Scale Visual */}
                          <div className="flex-shrink-0 w-16 h-12 relative">
                            <svg viewBox="0 0 64 48" className="w-full h-full text-[#5E5574]">
                              {/* Balance beam */}
                              <line x1="8" y1="20" x2="56" y2="20" stroke="currentColor" strokeWidth="2" />
                              {/* Center pivot */}
                              <circle cx="32" cy="20" r="3" fill="currentColor" />
                              <line x1="32" y1="23" x2="32" y2="44" stroke="currentColor" strokeWidth="2" />
                              {/* Left pan */}
                              <path d="M8 20 L4 28 L16 28 L12 20" stroke="currentColor" strokeWidth="1.5" fill="#F7F5FB" />
                              <text x="10" y="26" fontSize="6" fill="currentColor" textAnchor="middle">2x+5</text>
                              {/* Right pan */}
                              <path d="M52 20 L48 28 L60 28 L56 20" stroke="currentColor" strokeWidth="1.5" fill="#F7F5FB" />
                              <text x="54" y="26" fontSize="6" fill="currentColor" textAnchor="middle">13</text>
                              {/* Equals sign */}
                              <text x="32" y="12" fontSize="8" fill="currentColor" textAnchor="middle">=</text>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] text-[#6B647F] leading-relaxed">
                              "Think of an equation like a balanced scale. Whatever is on the left side must equal what's on the right. If we have 2x + 5 on one side and 13 on the other, they're perfectly balanced. To find x, we need to isolate it while keeping both sides equal. Subtract 5 from both sides—the scale stays balanced. Now we have 2x = 8. Divide both sides by 2, and we discover x = 4. The balance never tips because we do the same thing to both sides."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student B - Procedural Builder */}
                <div className="flex-1 rounded-2xl border border-[#E6E0F2] bg-white p-5 hover:border-[#D9CFF2] hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#6B5F85] flex items-center justify-center text-white text-sm font-bold">B</div>
                      <p className="text-[9px] text-[#8C84A8] text-center mt-1">Procedural</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Same Question from textbook */}
                      <div className="mb-3 p-2.5 rounded-lg bg-[#F7F5FB] border border-[#E6E0F2]">
                        <p className="text-[10px] text-[#8C84A8] mb-1">From Textbook</p>
                        <p className="text-xs text-[#3F3A52] font-medium">Solve: 2x + 5 = 13</p>
                      </div>
                      {/* Different Explanation - Step-by-Step */}
                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#FAFBFF] to-white border border-[#E6E0F2]">
                        <p className="text-[10px] text-[#6B5F85] font-medium mb-2">Tutor explains: How to do it</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#6B5F85] flex items-center justify-center text-white text-[8px] font-bold">1</div>
                            <p className="text-[10px] text-[#6B647F]">Start: 2x + 5 = 13</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#6B5F85] flex items-center justify-center text-white text-[8px] font-bold">2</div>
                            <p className="text-[10px] text-[#6B647F]">Subtract 5: 2x = 8</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#6B5F85] flex items-center justify-center text-white text-[8px] font-bold">3</div>
                            <p className="text-[10px] text-[#6B647F]">Divide by 2: x = <span className="font-semibold text-[#3F3A52]">4</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Layout - Vertical */}
            <div className="lg:hidden space-y-6">

              {/* STAGE 1: Fixed Textbook */}
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#8C84A8] mb-3 text-center">Fixed Curriculum</p>
                <div className="rounded-2xl border-2 border-[#E6E0F2] bg-gradient-to-b from-[#FAFBFF] to-white p-5 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-[#F7F5FB] border border-[#E6E0F2] flex items-center justify-center mb-3">
                    <BookOpen size={28} className="text-[#5E5574]" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#3F3A52] text-center mb-1">Textbooks</h4>
                  <p className="text-xs text-[#8C84A8] text-center">NSW Syllabus · Same for all students</p>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="w-[2px] h-6 bg-gradient-to-b from-[#E6E0F2] to-[#D9CFF2]" />
              </div>

              {/* STAGE 2: Tutor + MindPrint */}
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#8C84A8] mb-3 text-center">Tutor Informed by MindPrint</p>
                <div className="rounded-2xl bg-gradient-to-b from-[#5E5574] to-[#4F4865] p-5 flex flex-col items-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-white" />
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Users size={20} className="text-white" />
                      </div>
                      <div className="text-white/60">+</div>
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <BarChart3 size={20} className="text-white" />
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-white text-center mb-1">Tutor</h4>
                    <p className="text-[10px] text-white/70 text-center">Guided by MindPrint profile</p>
                  </div>
                </div>
              </div>

              {/* Split Connector */}
              <div className="flex justify-center">
                <svg width="80" height="24" viewBox="0 0 80 24" className="text-[#D9CFF2]">
                  <path d="M40 0 L40 8 L10 20" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M40 0 L40 8 L70 20" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>

              {/* STAGE 3: Divergent Delivery */}
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#8C84A8] mb-3 text-center">Delivery Method Adapts</p>
                <div className="space-y-4">

                  {/* Student A */}
                  <div className="rounded-2xl border border-[#E6E0F2] bg-white p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#5E5574] flex items-center justify-center text-white text-sm font-bold">A</div>
                      <div>
                        <p className="text-xs font-semibold text-[#3F3A52]">Conceptual Learner</p>
                        <p className="text-[10px] text-[#8C84A8]">Needs the "why" first</p>
                      </div>
                    </div>
                    <div className="mb-3 p-2.5 rounded-lg bg-[#F7F5FB]">
                      <p className="text-[10px] text-[#8C84A8] mb-1">From Textbook</p>
                      <p className="text-xs text-[#3F3A52] font-medium">Solve: 2x + 5 = 13</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#FAFBFF] to-white border border-[#E6E0F2]">
                      <p className="text-[10px] text-[#5E5574] font-medium mb-2">Tutor explains: Why it works</p>
                      <p className="text-[10px] text-[#6B647F] leading-relaxed">
                        "Think of an equation like a balanced scale. Whatever is on the left side must equal what's on the right. If we have 2x + 5 on one side and 13 on the other, they're perfectly balanced. To find x, we need to isolate it while keeping both sides equal. Subtract 5 from both sides—the scale stays balanced. Now we have 2x = 8. Divide both sides by 2, and we discover x = 4. The balance never tips because we do the same thing to both sides."
                      </p>
                    </div>
                  </div>

                  {/* Student B */}
                  <div className="rounded-2xl border border-[#E6E0F2] bg-white p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#6B5F85] flex items-center justify-center text-white text-sm font-bold">B</div>
                      <div>
                        <p className="text-xs font-semibold text-[#3F3A52]">Procedural Learner</p>
                        <p className="text-[10px] text-[#8C84A8]">Needs the "how" first</p>
                      </div>
                    </div>
                    <div className="mb-3 p-2.5 rounded-lg bg-[#F7F5FB]">
                      <p className="text-[10px] text-[#8C84A8] mb-1">From Textbook</p>
                      <p className="text-xs text-[#3F3A52] font-medium">Solve: 2x + 5 = 13</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#FAFBFF] to-white border border-[#E6E0F2]">
                      <p className="text-[10px] text-[#6B5F85] font-medium mb-2">Tutor explains: How to do it</p>
                      <div className="space-y-1">
                        <p className="text-[10px] text-[#6B647F]"><span className="font-medium">1.</span> Start: 2x + 5 = 13</p>
                        <p className="text-[10px] text-[#6B647F]"><span className="font-medium">2.</span> Subtract 5: 2x = 8</p>
                        <p className="text-[10px] text-[#6B647F]"><span className="font-medium">3.</span> Divide by 2: x = <span className="font-semibold text-[#3F3A52]">4</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <p className={`text-center text-sm text-[#6B647F] mt-10 max-w-xl mx-auto transition-all duration-700 delay-300 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Same textbook. Same question. Different teaching approach.
        </p>
      </div>
    </section>
  );
}

/* ==========================================
   6. MINDPRINT + TUTORS
   ========================================== */
function MindPrintTutorsSection() {
  const section = useScrollAnimation();

  return (
    <section ref={section.ref} className="py-24 md:py-32 border-t border-[#E6E8F0]">
      <div className="mx-auto max-w-5xl px-6">
        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#6B5F85] flex items-center justify-center text-white">
                <Users size={20} />
              </div>
              <span className="text-xs tracking-[0.15em] uppercase text-[#8C84A8]">Human Layer</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#3F3A52] tracking-tight mb-6">
              Tutors guided by insight, not guesswork
            </h2>
            <p className="text-base text-[#6B647F] leading-relaxed mb-6">
              Tutors are selected and briefed using MindPrint insights.
              They don't arrive cold — they understand how the student thinks before the first session begins.
            </p>
            <ul className="space-y-4">
              {[
                "Matched based on teaching style compatibility",
                "Briefed on cognitive strengths and growth areas",
                "Focus on leverage, not just content coverage",
                "Adjust approach based on real-time feedback",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#5E5574] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#3F3A52]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="rounded-2xl border border-[#E6E0F2] bg-gradient-to-br from-[#FAFBFF] to-white p-8">
              {/* Triangle concept */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#5E5574] flex items-center justify-center text-white mb-6">
                  <BarChart3 size={28} />
                </div>
                <div className="w-full flex justify-between px-8">
                  <div className="w-14 h-14 rounded-xl bg-[#6B5F85] flex items-center justify-center text-white">
                    <Users size={24} />
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-[#7C6B94] flex items-center justify-center text-white">
                    <Brain size={24} />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-xs text-[#8C84A8] uppercase tracking-wider mb-2">The Triangle</p>
                  <p className="text-sm text-[#6B647F]">MindPrint · Tutor · Student</p>
                </div>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="50%" y1="30%" x2="25%" y2="60%" stroke="#D9CFF2" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="30%" x2="75%" y2="60%" stroke="#D9CFF2" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="25%" y1="60%" x2="75%" y2="60%" stroke="#D9CFF2" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   7. MINDPRINT + LMS
   ========================================== */
function MindPrintLMSSection() {
  const section = useScrollAnimation();

  return (
    <section ref={section.ref} className="py-24 md:py-32 bg-gradient-to-b from-[#F7F5FB] to-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Visual */}
          <div className="order-2 md:order-1 flex justify-center w-full">
            <div className="w-full h-[340px] rounded-2xl border-[4px] border-white bg-[#F7F5FB] shadow-2xl overflow-hidden ring-1 ring-[#E6E0F2]">
              <iframe
                src="/garden-lms-preview/index.html"
                className="border-0"
                style={{ width: '153.8%', height: '153.8%', transform: 'scale(0.65)', transformOrigin: '0 0' }}
                title="Garden LMS Preview"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#7C6B94] flex items-center justify-center text-white">
                <BookOpen size={20} />
              </div>
              <span className="text-xs tracking-[0.15em] uppercase text-[#8C84A8]">System Layer</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#3F3A52] tracking-tight mb-6">
              Garden LMS: Pathways that adapt
            </h2>
            <p className="text-base text-[#6B647F] leading-relaxed mb-6">
              The learning platform doesn't just deliver content — it responds to the student's MindPrint profile
              to adjust difficulty, sequence, and focus dynamically.
            </p>
            <ul className="space-y-4">
              {[
                "Lesson pathways adapt based on mastery",
                "Practice difficulty adjusts automatically",
                "Progress tracking shows improvement, not pressure",
                "Content delivery matches cognitive preferences",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#5E5574] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#3F3A52]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   8. MINDPRINT + RESOURCES
   ========================================== */
function MindPrintResourcesSection() {
  const section = useScrollAnimation();

  return (
    <section ref={section.ref} className="py-24 md:py-32 border-t border-[#E6E8F0]">
      <div className="mx-auto max-w-5xl px-6">
        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#8B7FA8] flex items-center justify-center text-white">
                <FileText size={20} />
              </div>
              <span className="text-xs tracking-[0.15em] uppercase text-[#8C84A8]">Content Layer</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#3F3A52] tracking-tight mb-6">
              Resources delivered strategically
            </h2>
            <p className="text-base text-[#6B647F] leading-relaxed mb-6">
              Materials are not dumped. Textbooks and practice are delivered based on what the student needs,
              when they need it — filtered through their MindPrint profile.
            </p>
            <ul className="space-y-4">
              {[
                "NSW Syllabus-aligned content",
                "Sequenced to match learning progression",
                "Quality over volume",
                "Exam-focused when appropriate",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#5E5574] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#3F3A52]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div>
            <div className="rounded-2xl border border-[#E6E0F2] bg-gradient-to-br from-[#FAFBFF] to-white p-8">
              <div className="flex flex-col items-center">
                {/* Filter concept */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#E6E0F2] flex items-center justify-center">
                    <FileText size={24} className="text-[#8C84A8]" />
                  </div>
                  <ChevronRight size={20} className="text-[#D9CFF2]" />
                  <div className="w-12 h-12 rounded-lg bg-[#5E5574] flex items-center justify-center text-white">
                    <Settings size={24} />
                  </div>
                  <ChevronRight size={20} className="text-[#D9CFF2]" />
                  <div className="w-12 h-12 rounded-lg bg-[#7C6B94] flex items-center justify-center text-white">
                    <Brain size={24} />
                  </div>
                </div>
                <p className="text-xs text-[#8C84A8] text-center">
                  All Resources → MindPrint Filter → Student
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   9. COMPLETE ECOSYSTEM
   ========================================== */
function EcosystemSection() {
  const section = useScrollAnimation();

  return (
    <section ref={section.ref} className="py-24 md:py-32 bg-gradient-to-br from-[#5E5574] via-[#6B5F85] to-[#5E5574] text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs tracking-[0.20em] uppercase text-white/70 mb-4">
            The Complete System
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            Everything connected. Nothing isolated.
          </h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            The KEY Method isn't a collection of parts — it's an integrated ecosystem
            where every component reinforces the others.
          </p>
        </div>

        {/* System map */}
        <div className={`transition-all duration-700 delay-200 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
              {[
                { icon: <BarChart3 size={24} />, title: "MindPrint", desc: "Intelligence" },
                { icon: <Users size={24} />, title: "Tutors", desc: "Guidance" },
                { icon: <Zap size={24} />, title: "Sessions", desc: "Delivery" },
                { icon: <BookOpen size={24} />, title: "LMS", desc: "Platform" },
                { icon: <FileText size={24} />, title: "Resources", desc: "Content" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-white/70 max-w-lg mx-auto">
                Updates flow continuously. As the student evolves, the system adapts.
                This is what sustainable, long-term improvement looks like.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   10. LONG-TERM SECTION (Redesigned)
   ========================================== */
function LongTermSection() {
  const section = useScrollAnimation();

  return (
    <section ref={section.ref} className="py-24 md:py-32 border-t border-[#E6E8F0] overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F5FB] border border-[#E6E0F2] text-[#8C84A8] text-xs font-bold uppercase tracking-widest mb-6">
            <TrendingUp size={14} />
            Scalable Success
          </div>
          <h2 className="font-julius text-3xl md:text-5xl text-[#3F3A52] mb-6">
            Why this works long-term
          </h2>
          <p className="text-xl text-[#5E5574] max-w-2xl mx-auto font-medium">
            Different minds require different keys to unlock higher-order learning.
          </p>
        </div>

        {/* Central Visual: The Learning Pyramid */}
        <div className={`relative w-full max-w-6xl mx-auto mb-20 transition-all duration-1000 delay-200 ${section.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>

          {/* Main Container */}
          <div className="relative aspect-[16/10] md:aspect-[2/1] lg:aspect-[2.2/1] bg-[#FAFBFF] rounded-[3rem] border border-[#E6E0F2] overflow-hidden shadow-2xl shadow-[#5E5574]/5">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,207,242,0.15),transparent_70%)]" />

            {/* Pyramid Structure (Central Spine) */}
            <div className="absolute left-1/2 top-[10%] bottom-[15%] w-64 md:w-80 -translate-x-1/2 flex flex-col justify-between z-10 pointer-events-none">
              {[
                { label: "Independent Mastery", opacity: "bg-opacity-100", text: "text-white", bg: "bg-[#5E5574]" },
                { label: "Synthesis", opacity: "bg-opacity-80", text: "text-[#5E5574]", bg: "bg-[#D9CFF2]" },
                { label: "Application", opacity: "bg-opacity-60", text: "text-[#5E5574]", bg: "bg-[#D9CFF2]" },
                { label: "Understanding", opacity: "bg-opacity-40", text: "text-[#5E5574]", bg: "bg-[#D9CFF2]" },
                { label: "Foundation Knowledge", opacity: "bg-opacity-20", text: "text-[#5E5574]", bg: "bg-[#D9CFF2]" },
              ].map((level, i, arr) => (
                <div
                  key={i}
                  className={`relative mx-auto flex items-center justify-center rounded-xl backdrop-blur-sm transition-all duration-500 hover:scale-105 ${level.bg} ${level.opacity}`}
                  style={{
                    width: `${100 - (i * 15)}%`,
                    height: "15%",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                  }}
                >
                  <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${level.text}`}>
                    {level.label}
                  </span>
                </div>
              ))}
            </div>

            {/* SVG Visual Layer for Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fade-left" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#C4B5DA" stopOpacity="1" />
                  <stop offset="100%" stopColor="#C4B5DA" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="flow-right" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#7C6B94" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5E5574" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* LEFT SIDE: Rigid, Failing Paths */}
              {/* Path 1: Success (Straight up) */}
              <path d="M 25% 85% L 48% 15%" stroke="#C4B5DA" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.4" />
              {/* Path 2: Fail at L2 */}
              <path d="M 20% 85% L 45% 65%" stroke="url(#fade-left)" strokeWidth="2" fill="none" />
              <circle cx="45%" cy="65%" r="2" fill="#C4B5DA" opacity="0.5" />
              {/* Path 3: Fail at L1 */}
              <path d="M 15% 85% L 42% 78%" stroke="url(#fade-left)" strokeWidth="2" fill="none" />

              {/* RIGHT SIDE: Adaptive, Converging Paths */}
              {/* Organic Beziers converging to top */}
              <path d="M 75% 85% C 75% 60%, 52% 50%, 52% 15%" stroke="url(#flow-right)" strokeWidth="2" fill="none" />
              <path d="M 80% 85% C 80% 55%, 53% 45%, 52% 15%" stroke="url(#flow-right)" strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M 85% 85% C 85% 50%, 54% 40%, 52% 15%" stroke="url(#flow-right)" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M 70% 85% C 70% 65%, 51% 55%, 52% 15%" stroke="url(#flow-right)" strokeWidth="2" fill="none" opacity="0.9" />

            </svg>

            {/* Labels for Left/Right Context */}
            <div className="absolute top-8 left-8 md:left-12 max-w-[200px]">
              <span className="inline-block px-3 py-1 rounded-lg bg-[#F7F5FB] border border-[#E6E0F2] text-[10px] font-bold uppercase tracking-wider text-[#8C84A8] mb-3">
                Traditional
              </span>
              <p className="text-sm font-semibold text-[#5E5574] leading-tight">
                One rigid path.<br />Fits few.
              </p>
            </div>

            <div className="absolute top-8 right-8 md:right-12 max-w-[200px] text-right">
              <span className="inline-block px-3 py-1 rounded-lg bg-[#7C6B94] text-[10px] font-bold uppercase tracking-wider text-white mb-3">
                The KEY Method
              </span>
              <p className="text-sm font-semibold text-[#5E5574] leading-tight">
                Adaptive pathways.<br />Converging success.
              </p>
            </div>

            {/* Personalities (Nodes) at Base */}
            <div className="absolute bottom-[8%] left-[10%] right-[10%] flex justify-between items-center px-4">

              {/* Left Group (Rigid) */}
              <div className="flex gap-2 md:gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={`l-${i}`} className={`w-3 h-3 md:w-4 md:h-4 rounded-full border border-[#D9CFF2] ${i === 2 ? 'bg-[#5E5574]' : 'bg-white'}`} />
                ))}
              </div>

              {/* Right Group (Adaptive) */}
              <div className="relative">
                {/* MindPrint Subtle Overlay/Glow */}
                <div className="absolute -inset-4 bg-[#7C6B94]/5 rounded-full blur-xl" />
                <div className="relative flex gap-2 md:gap-4">
                  {[...Array(7)].map((_, i) => (
                    <div key={`r-${i}`} className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#7C6B94] shadow-lg shadow-[#7C6B94]/20 ring-2 ring-white" />
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Narrative Grid */}
        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          <div className="p-8 rounded-3xl bg-[#F7F5FB] border border-[#E6E0F2]">
            <h3 className="font-julius text-lg text-[#3F3A52] mb-3">System Mismatch</h3>
            <p className="text-sm text-[#6B647F] leading-relaxed">
              In a standard classroom, if the teaching style doesn't match the student's mind, the student assumes <em>they</em> are the problem. Usually, it's just a system error.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#7C6B94] to-[#5E5574] text-white shadow-xl shadow-[#5E5574]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="font-julius text-lg mb-3 relative z-10">MindPrint Logic</h3>
            <p className="text-sm text-white/90 leading-relaxed relative z-10">
              We identify the learner's cognitive profile first. MindPrint acts as the invisible intelligence, selecting the specific "key" that unlocks understanding for that unique mind.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F7F5FB] border border-[#E6E0F2]">
            <h3 className="font-julius text-lg text-[#3F3A52] mb-3">Compound Confidence</h3>
            <p className="text-sm text-[#6B647F] leading-relaxed">
              When a student realises they <em>can</em> learn complex topics, their self-image shifts. They move from "I'm not smart enough" to "I just needed the right approach."
            </p>
          </div>

        </div>

        {/* Final Statement */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${section.isVisible ? "opacity-100" : "opacity-0"}`}>
          <p className="font-julius text-2xl text-[#3F3A52]">
            "One system. Many minds."
          </p>
        </div>

      </div>
    </section>
  );
}

/* ==========================================
   11. CTA SECTION
   ========================================== */
function CTASection() {
  const section = useScrollAnimation();

  return (
    <section ref={section.ref} className="py-24 md:py-32 bg-gradient-to-b from-[#F7F5FB] to-white">
      <div className="mx-auto max-w-3xl px-6">
        <div className={`text-center transition-all duration-700 ${section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#3F3A52] tracking-tight mb-6">
            The next step is understanding
          </h2>
          <p className="text-base text-[#6B647F] leading-relaxed mb-10 max-w-xl mx-auto">
            A free consultation helps us understand whether the KEY Method is the right fit.
            No pressure, no obligation — just clarity on how we can help.
          </p>

          <Link
            href="/consultation"
            className="group inline-flex items-center gap-2 rounded-full bg-[#5E5574] px-8 py-4 text-base font-medium text-white transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/20 hover:-translate-y-0.5"
          >
            Begin with MindPrint
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <p className="text-xs text-[#8C84A8] mt-6">
            15-minute conversation · No commitment required
          </p>
        </div>
      </div>
    </section>
  );
}
