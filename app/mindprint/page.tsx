// app/mindprint/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Brain,
  Zap,
  Target,
  Eye,
  Layers,
  Clock,
  Sparkles,
  TrendingUp,
  Shield,
  BookOpen,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  RefreshCw,
  Users,
  Compass,
  FileText,
  Calendar,
  Activity,
  Award,
  AlertTriangle,
  ThumbsUp,
} from "lucide-react";

/* =========================
   Scroll Animation Hook
========================= */

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

/* =========================
   Data
========================= */

const COGNITIVE_DIMENSIONS = [
  {
    id: "working-memory",
    name: "Working Memory",
    description: "Holding and manipulating information in mind",
    icon: <Brain size={24} />,
    color: "#7C3AED",
    example: "Following multi-step instructions, mental math",
  },
  {
    id: "processing-speed",
    name: "Processing Speed",
    description: "How quickly information is processed and responded to",
    icon: <Zap size={24} />,
    color: "#3B82F6",
    example: "Timed tasks, quick decision making",
  },
  {
    id: "executive-function",
    name: "Executive Function",
    description: "Planning, organisation, and self-regulation",
    icon: <Target size={24} />,
    color: "#10B981",
    example: "Project planning, time management, impulse control",
  },
  {
    id: "verbal-reasoning",
    name: "Verbal Reasoning",
    description: "Language-based understanding and expression",
    icon: <BookOpen size={24} />,
    color: "#F59E0B",
    example: "Reading comprehension, written arguments",
  },
  {
    id: "spatial-reasoning",
    name: "Spatial Reasoning",
    description: "Visual-spatial thinking and mental mapping",
    icon: <Eye size={24} />,
    color: "#EC4899",
    example: "Geometry, diagrams, visualising concepts",
  },
  {
    id: "pattern-recognition",
    name: "Pattern Recognition",
    description: "Identifying structures and relationships",
    icon: <Layers size={24} />,
    color: "#8B5CF6",
    example: "Mathematical sequences, grammar rules",
  },
  {
    id: "focus-attention",
    name: "Focus & Attention",
    description: "Sustained and selective attention",
    icon: <Compass size={24} />,
    color: "#06B6D4",
    example: "Staying on task, filtering distractions",
  },
  {
    id: "cognitive-endurance",
    name: "Cognitive Endurance",
    description: "Mental stamina over extended periods",
    icon: <Clock size={24} />,
    color: "#EF4444",
    example: "Long study sessions, exam stamina",
  },
];

const MINDPRINT_TESTS = [
  {
    number: 1,
    title: "Cognitive Processing & Reasoning",
    description: "Measures working memory, processing speed, and reasoning under low pressure.",
    duration: "8–10 min",
    icon: <Brain size={20} />,
  },
  {
    number: 2,
    title: "Attention & Endurance",
    description: "Assesses focus sustainability, mental fatigue, and attentional drift over time.",
    duration: "6–8 min",
    icon: <Activity size={20} />,
  },
  {
    number: 3,
    title: "Executive Function & Organisation",
    description: "Examines planning behaviour, task sequencing, and self-regulation tendencies.",
    duration: "7–9 min",
    icon: <Target size={20} />,
  },
  {
    number: 4,
    title: "Learning Modality Integration",
    description: "Explores how students process information across visual, verbal, and symbolic formats.",
    duration: "8–10 min",
    icon: <Layers size={20} />,
  },
  {
    number: 5,
    title: "Metacognition & Reflection",
    description: "Assesses self-awareness, error recognition, and adaptive thinking patterns.",
    duration: "5–7 min",
    icon: <Lightbulb size={20} />,
  },
];

const LEARNING_ARCHETYPES = [
  { name: "Conceptual Explorer", traits: "Curious, theory-driven, needs the 'why'" },
  { name: "Structured Analyst", traits: "Methodical, detail-oriented, step-by-step" },
  { name: "Visual Synthesizer", traits: "Diagram-based, sees big picture, spatial" },
  { name: "Verbal Integrator", traits: "Language-strong, discussion-based learner" },
  { name: "Strategic Planner", traits: "Goal-oriented, efficient, self-directed" },
  { name: "Pattern-Driven Thinker", traits: "Spots connections, rule-based, logical" },
  { name: "Reflective Deep Learner", traits: "Slow processor, high retention, thoughtful" },
  { name: "Rapid Processor", traits: "Quick thinker, needs challenge, impatient with repetition" },
  { name: "Methodical Builder", traits: "Builds understanding brick by brick, patient" },
  { name: "Creative Connector", traits: "Links ideas across domains, innovative" },
  { name: "Kinesthetic Engager", traits: "Learns by doing, hands-on, active" },
  { name: "Auditory Absorber", traits: "Learns through listening, verbal processing" },
  { name: "Systematic Organiser", traits: "Needs structure, lists, clear frameworks" },
  { name: "Intuitive Leaper", traits: "Makes cognitive jumps, needs validation" },
  { name: "Collaborative Processor", traits: "Thinks through discussion, social learner" },
];

// Sample cognitive profile data for the report
const SAMPLE_PROFILE = {
  name: "Sarah",
  archetype: "Reflective Deep Learner",
  secondaryArchetype: "Visual Synthesizer",
  dimensions: [
    { name: "Working Memory", score: 72, benchmark: 65 },
    { name: "Processing Speed", score: 58, benchmark: 65 },
    { name: "Executive Function", score: 81, benchmark: 65 },
    { name: "Verbal Reasoning", score: 85, benchmark: 65 },
    { name: "Spatial Reasoning", score: 78, benchmark: 65 },
    { name: "Pattern Recognition", score: 89, benchmark: 65 },
    { name: "Focus & Attention", score: 64, benchmark: 65 },
    { name: "Cognitive Endurance", score: 55, benchmark: 65 },
  ],
  strengths: [
    "Exceptional pattern recognition allows quick grasp of mathematical concepts",
    "Strong verbal reasoning supports written expression and comprehension",
    "High executive function enables effective self-regulation and planning",
  ],
  challenges: [
    "Lower processing speed may cause stress in timed assessments",
    "Cognitive endurance dips after 35–40 minutes of focused work",
    "Attention can drift when material lacks conceptual depth",
  ],
  recommendations: [
    "Break study sessions into 30-minute focused blocks with 10-minute breaks",
    "Use visual mind maps to leverage spatial reasoning strengths",
    "Practice timed drills gradually to build processing speed confidence",
    "Connect new concepts to underlying patterns and 'why' explanations",
  ],
  studyRoutine: {
    optimal: "Late afternoon (3–5pm)",
    sessionLength: "30 min focused + 10 min break",
    environment: "Quiet, minimal distractions, visual aids available",
    revision: "Spaced repetition with concept maps",
  },
};

/* =========================
   Page Component
========================= */

export default function MindPrintPage() {
  const heroAnim = useScrollAnimation();
  const problemAnim = useScrollAnimation();
  const dimensionsAnim = useScrollAnimation();
  const testsAnim = useScrollAnimation();
  const archetypesAnim = useScrollAnimation();
  const reportAnim = useScrollAnimation();
  const trackingAnim = useScrollAnimation();
  const experienceAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  const [activeDimension, setActiveDimension] = useState(0);
  const [showFullReport, setShowFullReport] = useState(false);

  // Auto-rotate dimensions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDimension((prev) => (prev + 1) % COGNITIVE_DIMENSIONS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFA] overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3F9] via-[#FAFAFA] to-[#FAFAFA]" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-[#E6E1F2]/50 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#DDD4F2]/40 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-40 left-1/3 h-64 w-64 rounded-full bg-[#D9CFF2]/30 blur-3xl animate-pulse delay-500" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(94, 85, 116, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(94, 85, 116, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div
          ref={heroAnim.ref}
          className={`relative mx-auto max-w-6xl px-6 transition-all duration-1000 ${
            heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#5E5574] backdrop-blur-sm mb-6">
                <Brain size={16} className="text-[#5E5574]" />
                Cognitive Intelligence System
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#3F3A52]">
                MindPrint
                <span className="text-[#5E5574]">™</span>
              </h1>

              <p className="mt-2 text-xl md:text-2xl text-[#6B647F] font-medium">
                Understanding how your child learns
              </p>

              <p className="mt-6 text-lg text-[#6B647F] leading-relaxed max-w-xl">
                A proprietary cognitive intelligence framework that transforms 
                how students think into an actionable learning blueprint — 
                guiding every tutoring session, study strategy, and academic decision.
              </p>

              {/* Key stats */}
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { value: "8", label: "Cognitive Dimensions" },
                  { value: "15", label: "Learning Archetypes" },
                  { value: "5", label: "Initial Assessments" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-[#5E5574]">{stat.value}</div>
                    <div className="text-sm text-[#8C84A8] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/consultation"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#5E5574]/20 transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-0.5"
                >
                  Get Your Child's MindPrint
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white px-8 py-4 text-base font-semibold text-[#5E5574] transition-all hover:border-[#5E5574]/30 hover:bg-[#F7F5FB]"
                >
                  See How It Works
                  <ChevronDown size={18} />
                </a>
              </div>
            </div>

            {/* Right: Animated cognitive visualization */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-[400px] h-[400px]">
                {/* Central brain */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#5E5574]/20 blur-xl animate-pulse" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#D9CFF2] bg-white shadow-xl">
                      <Brain size={40} className="text-[#5E5574]" />
                    </div>
                  </div>
                </div>

                {/* Orbiting dimensions */}
                {COGNITIVE_DIMENSIONS.map((dim, index) => {
                  const angle = (index / COGNITIVE_DIMENSIONS.length) * 2 * Math.PI - Math.PI / 2;
                  const radius = 150;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <div
                      key={dim.id}
                      className={`absolute transition-all duration-500 ${
                        activeDimension === index ? "scale-125 z-20" : "scale-100 z-0"
                      }`}
                      style={{
                        top: `calc(50% + ${y}px)`,
                        left: `calc(50% + ${x}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 bg-white shadow-lg transition-all duration-300 cursor-pointer ${
                          activeDimension === index
                            ? "border-[#5E5574] shadow-xl"
                            : "border-[#E6E1F2] hover:border-[#D9CFF2]"
                        }`}
                        onClick={() => setActiveDimension(index)}
                        style={{
                          color: activeDimension === index ? dim.color : "#8C84A8",
                        }}
                      >
                        {dim.icon}
                      </div>
                    </div>
                  );
                })}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {COGNITIVE_DIMENSIONS.map((_, index) => {
                    const angle = (index / COGNITIVE_DIMENSIONS.length) * 2 * Math.PI - Math.PI / 2;
                    const radius = 150;
                    const x = Math.cos(angle) * radius + 200;
                    const y = Math.sin(angle) * radius + 200;

                    return (
                      <line
                        key={index}
                        x1="200"
                        y1="200"
                        x2={x}
                        y2={y}
                        stroke={activeDimension === index ? "#5E5574" : "#E6E1F2"}
                        strokeWidth={activeDimension === index ? "2" : "1"}
                        strokeDasharray={activeDimension === index ? "0" : "4 4"}
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </svg>

                {/* Active dimension label */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                  <div
                    className="text-lg font-semibold transition-colors duration-300"
                    style={{ color: COGNITIVE_DIMENSIONS[activeDimension].color }}
                  >
                    {COGNITIVE_DIMENSIONS[activeDimension].name}
                  </div>
                  <div className="text-sm text-[#8C84A8] mt-1 max-w-[250px]">
                    {COGNITIVE_DIMENSIONS[activeDimension].description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE PROBLEM ================= */}
      <section id="how-it-works" ref={problemAnim.ref} className="py-24 bg-white border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Left: Problem visualization */}
            <div
              className={`transition-all duration-700 ${
                problemAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative">
                {/* Traditional approach card */}
                <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                      <AlertTriangle size={20} className="text-red-500" />
                    </div>
                    <span className="font-semibold text-red-700">Traditional Approach</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      "One-size-fits-all teaching",
                      "Measures outcomes, not process",
                      "Student adapts to method",
                      "Anxiety misread as inability",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-red-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6E1F2]">
                    <ArrowRight size={20} className="text-[#5E5574] rotate-90" />
                  </div>
                </div>

                {/* MindPrint approach card */}
                <div className="rounded-2xl border border-[#D9CFF2] bg-[#F7F5FB] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5E5574]">
                      <Brain size={20} className="text-white" />
                    </div>
                    <span className="font-semibold text-[#3F3A52]">MindPrint Approach</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Diagnoses how cognition works",
                      "Method adapts to student",
                      "Transforms understanding into action",
                      "Confidence compounds over time",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#5E5574]">
                        <CheckCircle2 size={16} className="text-[#5E5574]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div
              className={`transition-all duration-700 delay-200 ${
                problemAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
                The Problem We Solve
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52] leading-tight">
                Most students who struggle aren't incapable.
                <span className="text-[#5E5574]"> They're mismatched to the method.</span>
              </h2>
              <p className="mt-6 text-lg text-[#6B647F] leading-relaxed">
                Traditional education assumes one optimal pace, one teaching style, 
                and one definition of intelligence. This creates capable students 
                who lose confidence, effort that doesn't translate to results, and 
                families left confused and pressured.
              </p>
              <p className="mt-4 text-[#6B647F] leading-relaxed">
                MindPrint addresses this mismatch by{" "}
                <strong className="text-[#3F3A52]">diagnosing cognition itself</strong>, 
                allowing teaching to adapt to the student — not the other way around.
              </p>

              <div className="mt-8 p-6 rounded-2xl border border-[#E6E1F2] bg-[#FAFAFA]">
                <p className="text-[#5E5574] font-medium italic">
                  "What is the most effective way for <u>this specific student</u> to learn?"
                </p>
                <p className="text-sm text-[#8C84A8] mt-2">
                  — The fundamental question MindPrint answers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COGNITIVE DIMENSIONS ================= */}
      <section ref={dimensionsAnim.ref} className="py-24 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-6xl px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              dimensionsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              The Cognitive Model
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
              Eight dimensions of cognitive intelligence
            </h2>
            <p className="mt-4 text-lg text-[#6B647F] max-w-2xl mx-auto">
              Rather than reducing learners to a single "learning style," MindPrint 
              recognises that cognition is composite and dynamic.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COGNITIVE_DIMENSIONS.map((dim, index) => (
              <div
                key={dim.id}
                className={`group rounded-2xl border border-[#E6E1F2] bg-white p-6 transition-all duration-500 hover:border-[#D9CFF2] hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                  dimensionsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
                onClick={() => setActiveDimension(index)}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-colors"
                  style={{ backgroundColor: `${dim.color}15`, color: dim.color }}
                >
                  {dim.icon}
                </div>
                <h3 className="font-semibold text-[#3F3A52] mb-2">{dim.name}</h3>
                <p className="text-sm text-[#6B647F] leading-relaxed">{dim.description}</p>
                <p className="text-xs text-[#8C84A8] mt-3 italic">e.g. {dim.example}</p>

                {/* Score indicator */}
                <div className="mt-4 pt-4 border-t border-[#E6E1F2]">
                  <div className="flex items-center justify-between text-xs text-[#8C84A8] mb-2">
                    <span>0</span>
                    <span>Measured 0–100</span>
                    <span>100</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E6E1F2] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: dimensionsAnim.isVisible ? "70%" : "0%",
                        backgroundColor: dim.color,
                        transitionDelay: `${index * 100 + 500}ms`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE FIVE TESTS ================= */}
      <section ref={testsAnim.ref} className="py-24 bg-white border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              testsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              Initial Assessment
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
              Five assessments, one complete profile
            </h2>
            <p className="mt-4 text-lg text-[#6B647F] max-w-2xl mx-auto">
              No single test determines the result. The full profile emerges from 
              synthesis across five distinct assessments, each targeting different neural systems.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5E5574] via-[#8B7FA8] to-[#D9CFF2] hidden md:block" />

            <div className="space-y-6">
              {MINDPRINT_TESTS.map((test, index) => (
                <div
                  key={test.number}
                  className={`relative transition-all duration-500 ${
                    testsAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="md:ml-20 rounded-2xl border border-[#E6E1F2] bg-white p-6 hover:border-[#D9CFF2] hover:shadow-md transition-all">
                    {/* Number badge - desktop */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-[#5E5574] text-white font-bold shadow-lg">
                      {test.number}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Mobile number */}
                      <div className="flex md:hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5E5574] text-white font-bold">
                        {test.number}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#5E5574]">{test.icon}</span>
                          <h3 className="font-semibold text-[#3F3A52]">{test.title}</h3>
                        </div>
                        <p className="text-sm text-[#6B647F]">{test.description}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#8C84A8] shrink-0">
                        <Clock size={16} />
                        {test.duration}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Test characteristics */}
            <div
              className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-500 ${
                testsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {[
                { icon: <Clock size={20} />, label: "Short", desc: "35–45 min total" },
                { icon: <Users size={20} />, label: "Age-neutral", desc: "Years 5–10" },
                { icon: <Shield size={20} />, label: "Non-threatening", desc: "No pressure" },
                { icon: <Compass size={20} />, label: "Exploratory", desc: "Not evaluative" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#E6E1F2] bg-[#FAFAFA] p-4 text-center"
                >
                  <div className="flex justify-center text-[#5E5574] mb-2">{item.icon}</div>
                  <div className="font-semibold text-[#3F3A52] text-sm">{item.label}</div>
                  <div className="text-xs text-[#8C84A8]">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= LEARNING ARCHETYPES ================= */}
      <section ref={archetypesAnim.ref} className="py-24 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-6xl px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              archetypesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              Learning Archetypes
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
              Fifteen ways of learning
            </h2>
            <p className="mt-4 text-lg text-[#6B647F] max-w-2xl mx-auto">
              Students receive a primary archetype with secondary influences, 
              reflecting real cognitive complexity — not rigid labels.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNING_ARCHETYPES.map((archetype, index) => (
              <div
                key={archetype.name}
                className={`group rounded-xl border border-[#E6E1F2] bg-white p-4 transition-all duration-300 hover:border-[#5E5574]/30 hover:bg-[#F7F5FB] ${
                  archetypesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F1FB] text-[#5E5574] font-semibold text-sm group-hover:bg-[#5E5574] group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-[#3F3A52] text-sm">{archetype.name}</div>
                    <div className="text-xs text-[#8C84A8] mt-1">{archetype.traits}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Archetype detail */}
          <div
            className={`mt-12 rounded-2xl border border-[#D9CFF2] bg-[#F7F5FB] p-8 transition-all duration-700 delay-500 ${
              archetypesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-[#3F3A52] mb-4">Each archetype includes:</h3>
                <ul className="space-y-3">
                  {[
                    "Core cognitive strengths",
                    "Potential vulnerabilities",
                    "Optimal session length",
                    "Best revision methods",
                    "Preferred task structure",
                    "Warning signs for burnout",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#6B647F]">
                      <CheckCircle2 size={16} className="text-[#5E5574] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[250px] aspect-square">
                  {/* Radar chart placeholder */}
                  <div className="absolute inset-0 rounded-full border border-[#E6E1F2] bg-white/50" />
                  <div className="absolute inset-4 rounded-full border border-[#E6E1F2] bg-white/50" />
                  <div className="absolute inset-8 rounded-full border border-[#E6E1F2] bg-white/50" />
                  <div className="absolute inset-12 rounded-full border border-[#E6E1F2] bg-white/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles size={32} className="text-[#5E5574] mx-auto mb-2" />
                      <p className="text-xs text-[#8C84A8]">Cognitive Profile</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SAMPLE REPORT ================= */}
      <section ref={reportAnim.ref} className="py-24 bg-white border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-6xl px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              reportAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              Sample Cognitive Report
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
              From assessment to actionable insight
            </h2>
            <p className="mt-4 text-lg text-[#6B647F] max-w-2xl mx-auto">
              See how MindPrint transforms cognitive data into a personalised 
              learning blueprint. This is a sample report for a Year 8 student.
            </p>
          </div>

          {/* Report Card */}
          <div
            className={`rounded-3xl border border-[#E6E1F2] bg-white shadow-xl overflow-hidden transition-all duration-700 delay-100 ${
              reportAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Report Header */}
            <div className="bg-gradient-to-r from-[#5E5574] to-[#7B6F96] p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Brain size={24} />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">MindPrint™ Cognitive Report</p>
                      <h3 className="text-2xl font-bold">{SAMPLE_PROFILE.name}'s Profile</h3>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-sm">Primary Archetype</div>
                  <div className="text-xl font-semibold">{SAMPLE_PROFILE.archetype}</div>
                  <div className="text-white/60 text-sm">
                    Secondary: {SAMPLE_PROFILE.secondaryArchetype}
                  </div>
                </div>
              </div>
            </div>

            {/* Report Body */}
            <div className="p-8">
              {/* Cognitive Dimensions Chart */}
              <div className="mb-10">
                <h4 className="font-semibold text-[#3F3A52] mb-6 flex items-center gap-2">
                  <BarChart3 size={20} className="text-[#5E5574]" />
                  Cognitive Dimension Scores
                </h4>
                <div className="space-y-4">
                  {SAMPLE_PROFILE.dimensions.map((dim, index) => (
                    <div key={dim.name} className="group">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-[#3F3A52] font-medium">{dim.name}</span>
                        <span
                          className={`font-semibold ${
                            dim.score >= dim.benchmark ? "text-green-600" : "text-amber-600"
                          }`}
                        >
                          {dim.score}/100
                        </span>
                      </div>
                      <div className="relative h-3 rounded-full bg-[#E6E1F2] overflow-hidden">
                        {/* Benchmark line */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-[#3F3A52]/40 z-10"
                          style={{ left: `${dim.benchmark}%` }}
                        />
                        {/* Score bar */}
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            dim.score >= dim.benchmark
                              ? "bg-gradient-to-r from-[#5E5574] to-[#7B6F96]"
                              : "bg-gradient-to-r from-amber-400 to-amber-500"
                          }`}
                          style={{
                            width: reportAnim.isVisible ? `${dim.score}%` : "0%",
                            transitionDelay: `${index * 100 + 300}ms`,
                          }}
                        />
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-[#8C84A8]">
                          Benchmark: {dim.benchmark}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths, Challenges, Recommendations */}
              <div className="grid gap-6 md:grid-cols-3 mb-10">
                {/* Strengths */}
                <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ThumbsUp size={20} className="text-green-600" />
                    <h4 className="font-semibold text-green-800">Strengths</h4>
                  </div>
                  <ul className="space-y-3">
                    {SAMPLE_PROFILE.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                        <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges */}
                <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={20} className="text-amber-600" />
                    <h4 className="font-semibold text-amber-800">Watch Points</h4>
                  </div>
                  <ul className="space-y-3">
                    {SAMPLE_PROFILE.challenges.map((challenge, i) => (
                      <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="rounded-2xl border border-[#D9CFF2] bg-[#F7F5FB] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb size={20} className="text-[#5E5574]" />
                    <h4 className="font-semibold text-[#3F3A52]">Recommendations</h4>
                  </div>
                  <ul className="space-y-3">
                    {SAMPLE_PROFILE.recommendations.map((rec, i) => (
                      <li key={i} className="text-sm text-[#6B647F] flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5E5574] text-white text-xs">
                          {i + 1}
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Optimal Study Routine */}
              <div className="rounded-2xl border border-[#E6E1F2] bg-[#FAFAFA] p-6">
                <h4 className="font-semibold text-[#3F3A52] mb-6 flex items-center gap-2">
                  <Calendar size={20} className="text-[#5E5574]" />
                  Optimal Study Routine
                </h4>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Best Time", value: SAMPLE_PROFILE.studyRoutine.optimal, icon: <Clock size={18} /> },
                    { label: "Session Length", value: SAMPLE_PROFILE.studyRoutine.sessionLength, icon: <Activity size={18} /> },
                    { label: "Environment", value: SAMPLE_PROFILE.studyRoutine.environment, icon: <Shield size={18} /> },
                    { label: "Revision Style", value: SAMPLE_PROFILE.studyRoutine.revision, icon: <RefreshCw size={18} /> },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="flex justify-center text-[#5E5574] mb-2">{item.icon}</div>
                      <div className="text-xs text-[#8C84A8] uppercase tracking-wide mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm text-[#3F3A52] font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Higher Order Thinking Section */}
              {showFullReport && (
                <div className="mt-8 space-y-8 animate-fadeIn">
                  {/* Psychological Profile */}
                  <div className="rounded-2xl border border-[#E6E1F2] bg-white p-6">
                    <h4 className="font-semibold text-[#3F3A52] mb-4 flex items-center gap-2">
                      <Brain size={20} className="text-[#5E5574]" />
                      Psychological Learning Profile
                    </h4>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h5 className="text-sm font-medium text-[#5E5574] mb-3">
                          Cognitive Preferences
                        </h5>
                        <ul className="space-y-2 text-sm text-[#6B647F]">
                          <li>• Prefers depth over breadth — wants to understand why</li>
                          <li>• Processes information visually before verbalising</li>
                          <li>• Benefits from concrete examples before abstract concepts</li>
                          <li>• Needs time to reflect; uncomfortable with rushed responses</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-[#5E5574] mb-3">
                          Emotional & Motivational Factors
                        </h5>
                        <ul className="space-y-2 text-sm text-[#6B647F]">
                          <li>• Intrinsically motivated by mastery and understanding</li>
                          <li>• Can experience anxiety in timed/pressured situations</li>
                          <li>• Responds well to calm, patient guidance</li>
                          <li>• Needs explicit recognition of effort, not just results</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Higher Order Thinking */}
                  <div className="rounded-2xl border border-[#E6E1F2] bg-white p-6">
                    <h4 className="font-semibold text-[#3F3A52] mb-4 flex items-center gap-2">
                      <TrendingUp size={20} className="text-[#5E5574]" />
                      Pathway to Higher Order Thinking
                    </h4>
                    <p className="text-sm text-[#6B647F] mb-6">
                      Based on {SAMPLE_PROFILE.name}'s cognitive profile, here's how to develop 
                      analytical, evaluative, and creative thinking skills:
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        {
                          level: "Analysis",
                          color: "#3B82F6",
                          strategies: [
                            "Break problems into component parts",
                            "Use comparison tables and Venn diagrams",
                            "Ask 'what patterns do you notice?'",
                          ],
                        },
                        {
                          level: "Evaluation",
                          color: "#8B5CF6",
                          strategies: [
                            "Practice judging arguments with criteria",
                            "Discuss pros/cons with structured frameworks",
                            "Review own work against rubrics",
                          ],
                        },
                        {
                          level: "Creation",
                          color: "#EC4899",
                          strategies: [
                            "Encourage 'what if' scenarios",
                            "Allow multiple solution pathways",
                            "Connect concepts across subjects",
                          ],
                        },
                      ].map((item) => (
                        <div
                          key={item.level}
                          className="rounded-xl border border-[#E6E1F2] p-4"
                        >
                          <div
                            className="text-sm font-semibold mb-3"
                            style={{ color: item.color }}
                          >
                            {item.level}
                          </div>
                          <ul className="space-y-2">
                            {item.strategies.map((strategy, i) => (
                              <li key={i} className="text-xs text-[#6B647F] flex items-start gap-2">
                                <span
                                  className="h-1.5 w-1.5 rounded-full shrink-0 mt-1"
                                  style={{ backgroundColor: item.color }}
                                />
                                {strategy}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Classroom Strategies */}
                  <div className="rounded-2xl border border-[#E6E1F2] bg-white p-6">
                    <h4 className="font-semibold text-[#3F3A52] mb-4 flex items-center gap-2">
                      <BookOpen size={20} className="text-[#5E5574]" />
                      Classroom Success Strategies
                    </h4>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h5 className="text-sm font-medium text-green-600 mb-3">
                          ✓ What Works
                        </h5>
                        <ul className="space-y-2 text-sm text-[#6B647F]">
                          <li>• Sitting near the front to minimise distractions</li>
                          <li>• Having questions written down before asking</li>
                          <li>• Using visual note-taking (mind maps, diagrams)</li>
                          <li>• Breaking assignments into smaller milestones</li>
                          <li>• Requesting extended time for tests when available</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-red-500 mb-3">
                          ✗ What to Avoid
                        </h5>
                        <ul className="space-y-2 text-sm text-[#6B647F]">
                          <li>• Last-minute cramming (conflicts with processing style)</li>
                          <li>• Multi-tasking during study (drains cognitive endurance)</li>
                          <li>• Purely auditory instruction without visual support</li>
                          <li>• Comparing pace to faster-processing peers</li>
                          <li>• Skipping breaks during long study sessions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Toggle full report */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowFullReport(!showFullReport)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white px-6 py-3 text-sm font-semibold text-[#5E5574] transition-all hover:bg-[#F7F5FB]"
                >
                  {showFullReport ? "Show Less" : "View Full Report"}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${showFullReport ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ONGOING TRACKING ================= */}
      <section ref={trackingAnim.ref} className="py-24 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Left: Content */}
            <div
              className={`transition-all duration-700 ${
                trackingAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
                Longitudinal Intelligence
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52] leading-tight">
                Cognition isn't static.
                <span className="text-[#5E5574]"> Neither is MindPrint.</span>
              </h2>
              <p className="mt-6 text-lg text-[#6B647F] leading-relaxed">
                After the initial assessment, students complete short bi-weekly quizzes 
                that continuously refine their cognitive profile over time.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { value: "~300", label: "Micro-assessments across Years 5–10" },
                  { value: "~5", label: "Quick checks per term" },
                  { value: "∞", label: "Continuous profile refinement" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4 rounded-xl border border-[#E6E1F2] bg-white p-4"
                  >
                    <div className="text-2xl font-bold text-[#5E5574] w-16">{stat.value}</div>
                    <div className="text-sm text-[#6B647F]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Tracking visualization */}
            <div
              className={`transition-all duration-700 delay-200 ${
                trackingAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="rounded-2xl border border-[#E6E1F2] bg-white p-6">
                <h4 className="font-semibold text-[#3F3A52] mb-6">MindPrint Detects:</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: <TrendingUp size={20} />, label: "Growth trends", desc: "Cognitive development over time" },
                    { icon: <AlertTriangle size={20} />, label: "Burnout risk", desc: "Early warning signs" },
                    { icon: <RefreshCw size={20} />, label: "Strategy shifts", desc: "When to change approach" },
                    { icon: <Activity size={20} />, label: "Learning patterns", desc: "Evolving preferences" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-[#E6E1F2] bg-[#FAFAFA] p-4"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#5E5574]">{item.icon}</span>
                        <span className="font-medium text-[#3F3A52] text-sm">{item.label}</span>
                      </div>
                      <p className="text-xs text-[#8C84A8]">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Timeline visualization */}
                <div className="mt-8 pt-6 border-t border-[#E6E1F2]">
                  <div className="flex items-center justify-between text-xs text-[#8C84A8] mb-4">
                    <span>Year 5</span>
                    <span>Year 6</span>
                    <span>Year 7</span>
                    <span>Year 8</span>
                    <span>Year 9</span>
                    <span>Year 10</span>
                  </div>
                  <div className="relative h-8">
                    <div className="absolute inset-0 rounded-full bg-[#E6E1F2]" />
                    <div
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] transition-all duration-1000"
                      style={{ width: trackingAnim.isVisible ? "60%" : "0%" }}
                    />
                    {/* Data points */}
                    {[0, 16, 33, 50, 66, 83, 100].map((pos, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white border-2 border-[#5E5574]"
                        style={{ left: `${pos}%`, transform: "translate(-50%, -50%)" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* ================= THE EXPERIENCE ================= */}
      <section ref={experienceAnim.ref} className="py-24 bg-white border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              experienceAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              The Student Experience
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
              Designed as an experience, not a test
            </h2>
            <p className="mt-4 text-lg text-[#6B647F] max-w-2xl mx-auto">
              MindPrint is calm, glass-like, and non-judgemental. Students begin to see 
              learning as something that can be designed — not endured.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Users size={24} />,
                title: "Personal Welcome",
                description: "Students are welcomed by name with clear explanations and reassurance.",
              },
              {
                icon: <Shield size={24} />,
                title: "Calm Interface",
                description: "Glass-like design reduces anxiety. Progress revealed gradually.",
              },
              {
                icon: <Eye size={24} />,
                title: "Visual Feedback",
                description: "Radar charts, cognitive mind maps, and emerging archetype indicators.",
              },
              {
                icon: <Sparkles size={24} />,
                title: "No Pressure",
                description: "Exploratory feel, not evaluative. Understanding reduces anxiety.",
              },
              {
                icon: <TrendingUp size={24} />,
                title: "Gradual Reveal",
                description: "Results unfold naturally, building curiosity not stress.",
              },
              {
                icon: <Lightbulb size={24} />,
                title: "Insight Focus",
                description: "Students learn about themselves, not just their scores.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`rounded-2xl border border-[#E6E1F2] bg-[#FAFAFA] p-6 transition-all duration-500 hover:border-[#D9CFF2] hover:shadow-md hover:-translate-y-1 ${
                  experienceAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F1FB] text-[#5E5574] mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-[#3F3A52] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B647F] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Key principle */}
          <div
            className={`mt-12 rounded-2xl border border-[#D9CFF2] bg-[#F7F5FB] p-8 text-center transition-all duration-700 delay-500 ${
              experienceAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-xl text-[#5E5574] font-medium italic">
              "Understanding reduces anxiety."
            </p>
            <p className="text-sm text-[#8C84A8] mt-3">
              A core psychological principle embedded in every aspect of MindPrint
            </p>
          </div>
        </div>
      </section>

      {/* ================= FROM DATA TO ACTION ================= */}
      <section className="py-24 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              Operationalised Intelligence
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
              From data to daily action
            </h2>
            <p className="mt-4 text-lg text-[#6B647F] max-w-2xl mx-auto">
              MindPrint doesn't stop at scores. Each profile feeds directly into 
              how we teach, what we assign, and when we adapt.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <FileText size={24} />, title: "Session Structure", desc: "Lesson length, pacing, and break timing" },
              { icon: <BookOpen size={24} />, title: "Homework Design", desc: "Task type, complexity, and format" },
              { icon: <Calendar size={24} />, title: "Study Planning", desc: "When, how long, and what to prioritise" },
              { icon: <RefreshCw size={24} />, title: "Revision Strategy", desc: "Spaced repetition tailored to memory" },
              { icon: <Target size={24} />, title: "Exam Preparation", desc: "Pacing, practice style, and timing" },
              { icon: <Award size={24} />, title: "Progress Tracking", desc: "Metrics that matter for this learner" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#E6E1F2] bg-white p-5 hover:border-[#D9CFF2] hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#5E5574]">{item.icon}</span>
                  <h3 className="font-semibold text-[#3F3A52]">{item.title}</h3>
                </div>
                <p className="text-sm text-[#6B647F]">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Example applications */}
          <div className="mt-12 rounded-2xl border border-[#E6E1F2] bg-white p-8">
            <h4 className="font-semibold text-[#3F3A52] mb-6">How MindPrint shapes tutoring:</h4>
            <div className="space-y-4">
              {[
                {
                  profile: "Low endurance, high reasoning",
                  approach: "Shorter, deeper sessions with conceptual focus",
                },
                {
                  profile: "Fast processor, weak executive function",
                  approach: "Structured task scaffolding with clear milestones",
                },
                {
                  profile: "Visual-spatial learner",
                  approach: "Diagram-heavy explanations, away from rote methods",
                },
                {
                  profile: "Reflective deep learner",
                  approach: "Extra processing time, no rushed responses",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl bg-[#FAFAFA] p-4"
                >
                  <div className="text-sm font-medium text-[#5E5574] sm:w-64 shrink-0">
                    {item.profile}
                  </div>
                  <div className="hidden sm:block text-[#D9CFF2]">→</div>
                  <div className="text-sm text-[#6B647F]">{item.approach}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY MINDPRINT MATTERS ================= */}
      <section className="py-24 bg-white border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
            The Kite & Key Difference
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
            MindPrint is not a feature.
            <br />
            <span className="text-[#5E5574]">It's the intellectual backbone.</span>
          </h2>
          <p className="mt-6 text-lg text-[#6B647F] max-w-2xl mx-auto">
            In a market full of louder, faster, more pressured education products, 
            MindPrint positions Kite & Key as something different.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { label: "Quietly intelligent", icon: <Brain size={28} /> },
              { label: "Deliberately precise", icon: <Target size={28} /> },
              { label: "Human-centred", icon: <Users size={28} /> },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#E6E1F2] bg-[#FAFAFA] p-8"
              >
                <div className="flex justify-center text-[#5E5574] mb-4">{item.icon}</div>
                <div className="font-semibold text-[#3F3A52]">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#D9CFF2] bg-[#F7F5FB] p-8">
            <h4 className="font-semibold text-[#3F3A52] mb-4">MindPrint explains:</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Why tutoring feels different",
                "Why students feel calmer",
                "Why confidence compounds",
                "Why outcomes are sustainable",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#D9CFF2] bg-white px-4 py-2 text-sm text-[#5E5574]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section ref={ctaAnim.ref} className="py-24 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-4xl px-6">
          <div
            className={`rounded-3xl border border-[#E6E1F2] bg-gradient-to-b from-[#F7F5FB] to-white p-10 md:p-16 text-center transition-all duration-700 ${
              ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5E5574] text-white">
                <Brain size={32} />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#3F3A52]">
              Discover your child's MindPrint
            </h2>

            <p className="mt-4 text-lg text-[#6B647F] max-w-xl mx-auto">
              Start with a free consultation to learn how MindPrint can transform 
              your child's learning experience.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/consultation"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#5E5574]/20 transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Free Consultation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white px-8 py-4 text-base font-semibold text-[#5E5574] transition-all hover:border-[#5E5574]/30 hover:bg-[#F7F5FB]"
              >
                Explore Courses
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-[#8C84A8]">
              {[
                "Free 15-minute consultation",
                "No obligation",
                "Personalised recommendations",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#5E5574]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER NOTE ================= */}
      <section className="py-10 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm text-[#8C84A8]">
            <strong className="text-[#5E5574]">MindPrint™</strong> is a proprietary 
            cognitive intelligence system developed by{" "}
            <Link href="/" className="underline hover:text-[#5E5574]">
              Kite & Key Academy
            </Link>
            . All assessments and profiles are confidential and used solely to 
            enhance your child's learning experience.
          </p>
        </div>
      </section>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
}