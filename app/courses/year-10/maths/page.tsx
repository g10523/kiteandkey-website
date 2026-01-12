"use client";

import { useState } from "react";
import Link from "next/link";
import TextbookPreview from "../../../../components/TextbookPreview";
import { Brain, Target, TrendingUp, Users, BookOpen, Zap, CheckCircle, Clock } from "lucide-react";

/* =========================
   Data
========================= */

type TermKey = "Term 1" | "Term 2" | "Term 3" | "Term 4";

const TERMS: Record<
  TermKey,
  { title: string; subtitle: string; lessons: string[] }
> = {
  "Term 1": {
    title: "Foundations & Fluency",
    subtitle: "Build the base so everything later feels lighter.",
    lessons: [
      "Algebra refresh: simplifying & factorising",
      "Linear equations & rearranging formulas",
      "Inequalities & number line reasoning",
      "Linear graphs: gradient, intercepts, and meaning",
      "Simultaneous equations (graphical + algebraic)",
      "Indices & surds (skills + patterns)",
      "Expanding & factorising (advanced)",
      "Quadratic intro: structure and interpretation",
      "Problem solving: translating words to algebra",
      "Term checkpoint: mixed exam-style set",
    ],
  },
  "Term 2": {
    title: "Quadratics & Trigonometry",
    subtitle: "More structure, more control — learn the 'why'.",
    lessons: [
      "Quadratic graphs: features & transformations",
      "Solving quadratics by factorising",
      "Completing the square",
      "Quadratic formula",
      "Applications of quadratics",
      "Trigonometry foundations",
      "Sine & cosine rule (introduction)",
      "Bearings & angles of elevation",
      "Algebra + trigonometry integration",
      "Checkpoint & error review",
    ],
  },
  "Term 3": {
    title: "Measurement & Statistics",
    subtitle: "Accuracy, interpretation, confidence.",
    lessons: [
      "Pythagoras & distance",
      "Coordinate geometry connections",
      "Area & composite shapes",
      "Surface area & scaling",
      "Rates & ratio problems",
      "Mean, median, interquartile range",
      "Box plots & data displays",
      "Scatterplots & correlation",
      "Probability foundations",
      "Data interpretation checkpoint",
    ],
  },
  "Term 4": {
    title: "Exam Readiness & Mastery",
    subtitle: "Refine method. Reduce mistakes.",
    lessons: [
      "Exam layout & clarity strategies",
      "Top 10 common errors",
      "Timed paper 1 + debrief",
      "Targeted reteaching session",
      "Timed paper 2 + review",
      "Multi-step reasoning practice",
      "Written response technique",
      "Spaced retrieval consolidation",
      "Final mock examination",
      "Personalised revision roadmap",
    ],
  },
};

const APPROACH_FEATURES = [
  {
    icon: Target,
    title: "Calm structure",
    description: "Predictable lesson flow reduces cognitive load and builds confidence.",
  },
  {
    icon: Brain,
    title: "MindPrint-informed",
    description: "Teaching adapts to how each student thinks and processes information.",
  },
  {
    icon: TrendingUp,
    title: "Tutor diagnostics",
    description: "Small checkpoints reveal misunderstandings before they compound.",
  },
  {
    icon: CheckCircle,
    title: "Visible progress",
    description: "Micro-wins tracked beyond grades — effort and understanding matter.",
  },
];

const KEY_METHOD_BENEFITS = [
  {
    icon: BookOpen,
    title: "Structured Knowledge Building",
    description: "Each concept is introduced in a deliberate sequence that mirrors how the brain naturally builds mathematical understanding.",
  },
  {
    icon: Users,
    title: "Cognitive Pacing",
    description: "Lesson speed adjusts based on real-time feedback, ensuring mastery before moving forward — no student left behind or held back.",
  },
  {
    icon: Zap,
    title: "Active Engagement",
    description: "Students don't just watch — they solve, explain, and apply. This builds confidence and reveals gaps early.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Yield",
    description: "Progress is tracked through micro-assessments, not just end-of-term exams. Students see their growth in real-time.",
  },
];

const STUDENT_OUTCOMES = [
  {
    metric: "92%",
    label: "Students report increased confidence",
    description: "After 12 weeks of tutoring",
  },
  {
    metric: "2.3x",
    label: "Faster concept retention",
    description: "Compared to traditional methods",
  },
  {
    metric: "15+",
    label: "Average grade improvement",
    description: "Within one academic year",
  },
];

/* =========================
   Page Component
========================= */

export default function Year10MathsPage() {
  const [activeTerm, setActiveTerm] = useState<TermKey>("Term 1");
  const active = TERMS[activeTerm];

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3F9] via-[#FAFAFA] to-[#FAFAFA]" />

        {/* Subtle decorative elements */}
        <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-[#E6E1F2]/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#DDD4F2]/30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#8C84A8]">
              <li>
                <Link href="/" className="hover:text-[#5E5574] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#CFC6EA]">/</li>
              <li>
                <Link href="/courses" className="hover:text-[#5E5574] transition-colors">
                  Courses
                </Link>
              </li>
              <li className="text-[#CFC6EA]">/</li>
              <li className="text-[#5E5574]">Year 10 Mathematics</li>
            </ol>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
            NSW Syllabus Aligned
          </div>

          <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
            Year 10 Mathematics
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
            A calm, structured pathway through the NSW Mathematics syllabus — built
            on the{" "}
            <span className="text-[#5E5574] font-medium">KEY Method</span> and
            refined through{" "}
            <span className="text-[#5E5574] font-medium">MindPrint</span> cognitive
            profiling.
          </p>

          {/* Course overview stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: "40", label: "Lessons", icon: BookOpen },
              { value: "4", label: "Terms", icon: Clock },
              { value: "1:1", label: "Tutoring", icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F1FB] text-[#5E5574]">
                  <stat.icon size={22} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#5E5574]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#8C84A8]">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/enrol"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/20 hover:-translate-y-0.5"
            >
              Enrol Now
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/consultation"
              className="rounded-xl border border-[#D9CFF2] bg-white px-8 py-4 text-base font-semibold text-[#5E5574] transition-all hover:border-[#5E5574]/30 hover:bg-[#F7F5FB] hover:-translate-y-0.5"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ================= THE KEY METHOD IN ACTION ================= */}
      <section className="py-24 border-t border-[#E6E1F2] bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              Our Approach
            </p>
            <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52]">
              The KEY Method in Mathematics
            </h2>
            <p className="mt-4 text-[#6B647F] max-w-2xl mx-auto leading-relaxed">
              Every lesson is designed around three principles: structured Knowledge,
              active Engagement, and measurable Yield.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {KEY_METHOD_BENEFITS.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-[#E6E1F2] bg-gradient-to-br from-white to-[#FAFAFA] p-8 transition-all hover:border-[#D9CFF2] hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F4F1FB] text-[#5E5574] transition-transform group-hover:scale-110">
                    <benefit.icon size={26} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#3F3A52] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-[#6B647F] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STUDENT OUTCOMES ================= */}
      <section className="py-20 border-t border-[#E6E1F2] bg-gradient-to-b from-[#F7F5FB] to-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              Proven Results
            </p>
            <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52]">
              Real outcomes from our students
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {STUDENT_OUTCOMES.map((outcome) => (
              <div
                key={outcome.label}
                className="rounded-2xl border border-[#E6E1F2] bg-white/90 backdrop-blur-sm p-8 text-center transition-all hover:border-[#D9CFF2] hover:shadow-md"
              >
                <div className="text-5xl font-bold bg-gradient-to-br from-[#5E5574] to-[#7C6B94] bg-clip-text text-transparent mb-3">
                  {outcome.metric}
                </div>
                <div className="font-semibold text-[#3F3A52] mb-2">
                  {outcome.label}
                </div>
                <div className="text-sm text-[#8C84A8]">
                  {outcome.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= APPROACH FEATURES ================= */}
      <section className="py-20 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              How We Teach
            </p>
            <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52]">
              Designed for sustainable learning
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-[#E6E1F2] bg-white/80 p-6 backdrop-blur-sm transition-all hover:border-[#D9CFF2] hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F1FB] text-[#5E5574] mb-4 transition-transform group-hover:scale-110">
                  <feature.icon size={22} />
                </div>
                <h3 className="font-bold text-[#3F3A52] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6B647F] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TERM STRUCTURE ================= */}
      <section className="py-24 bg-white border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
              Course Structure
            </p>
            <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52]">
              Forty lessons across four terms
            </h2>
            <p className="mt-4 text-[#6B647F] max-w-2xl mx-auto">
              Each term builds on the last, creating a seamless progression from
              foundations to exam readiness.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            {/* Term selector */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-3">
                {(Object.keys(TERMS) as TermKey[]).map((term, index) => (
                  <button
                    key={term}
                    onClick={() => setActiveTerm(term)}
                    className={`group relative w-full rounded-2xl border p-5 text-left transition-all duration-200 ${term === activeTerm
                      ? "border-[#5E5574]/30 bg-[#F7F5FB] shadow-md"
                      : "border-[#E6E1F2] bg-white hover:border-[#D9CFF2] hover:bg-[#FAFAFA]"
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-colors ${term === activeTerm
                          ? "bg-[#5E5574] text-white"
                          : "bg-[#F4F1FB] text-[#6B647F]"
                          }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div
                          className={`text-xs font-medium mb-1 ${term === activeTerm ? "text-[#5E5574]" : "text-[#8C84A8]"
                            }`}
                        >
                          {term}
                        </div>
                        <div className="font-semibold text-[#3F3A52]">
                          {TERMS[term].title}
                        </div>
                        <div className="text-sm text-[#8C84A8] mt-1">
                          {TERMS[term].subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Active indicator */}
                    {term === activeTerm && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-[#5E5574]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Lesson list */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-[#E6E1F2] bg-gradient-to-br from-[#FAFAFA]/50 to-white p-8 backdrop-blur-sm shadow-lg">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#3F3A52]">
                    {active.title}
                  </h3>
                  <p className="text-[#6B647F] mt-1">{active.subtitle}</p>
                </div>

                <div className="space-y-3">
                  {active.lessons.map((lesson, i) => (
                    <div
                      key={lesson}
                      className="group flex items-center gap-4 rounded-xl border border-[#E6E1F2] bg-white p-4 transition-all hover:border-[#D9CFF2] hover:shadow-sm"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4F1FB] text-sm font-semibold text-[#6B647F] group-hover:bg-[#E6E0F5] group-hover:text-[#5E5574] transition-colors">
                        {i + 1}
                      </div>
                      <span className="text-sm text-[#4A4458] group-hover:text-[#3F3A52] transition-colors">
                        {lesson}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress indicator */}
                <div className="mt-8 pt-6 border-t border-[#E6E1F2]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8C84A8]">Course progress</span>
                    <span className="text-[#5E5574] font-medium">
                      Term {Object.keys(TERMS).indexOf(activeTerm) + 1} of 4
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-[#E6E1F2] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#5E5574] to-[#7C6B94] transition-all duration-500"
                      style={{
                        width: `${((Object.keys(TERMS).indexOf(activeTerm) + 1) / 4) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEXTBOOK PREVIEW ================= */}
      <TextbookPreview />

      {/* ================= SYLLABUS NOTE ================= */}
      <section className="py-16 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="rounded-2xl border border-[#E6E1F2] bg-white/80 p-8 backdrop-blur-sm">
            <p className="text-sm font-medium tracking-[0.1em] uppercase text-[#8C84A8] mb-3">
              Curriculum Alignment
            </p>
            <p className="text-[#4A4458] leading-relaxed">
              This course follows the{" "}
              <strong className="text-[#3F3A52]">NSW Mathematics Syllabus</strong>{" "}
              for Stage 5, covering all outcomes for Year 10 students. Content is
              sequenced for optimal understanding and long-term retention.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 border-t border-[#E6E1F2]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl border-2 border-[#D9CFF2] bg-gradient-to-br from-[#F7F5FB] via-white to-[#FAFAFA] p-10 md:p-14 text-center shadow-xl">
            <h3 className="font-julius text-3xl md:text-4xl text-[#3F3A52]">
              Ready to begin?
            </h3>

            <p className="mt-4 text-lg text-[#6B647F] max-w-lg mx-auto">
              We'll recommend the right structure for your child — no pressure,
              just a conversation about what works best.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/enrol"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/20 hover:-translate-y-0.5"
              >
                Enrol Now
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/consultation"
                className="rounded-xl border border-[#D9CFF2] bg-white px-8 py-4 text-base font-semibold text-[#5E5574] transition-all hover:border-[#5E5574]/30 hover:bg-[#F7F5FB] hover:-translate-y-0.5"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}