"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import MindPrintDiagram from "../components/mindprint/MindPrintDiagram";

type NodeKey = "cp" | "af" | "wm" | "lp" | "er" | "sa";

const NODE_COPY: Record<
  NodeKey,
  {
    title: string;
    summary: string;
    keyMethodUse: string;
    icon: string;
  }
> = {
  cp: {
    title: "Cognitive Processing Style",
    summary:
      "How a student naturally interprets information — whether they lean toward patterns, structure, or conceptual framing.",
    keyMethodUse:
      "We align explanation style to the student's thinking before increasing difficulty or abstraction.",
    icon: "🧩",
  },
  af: {
    title: "Attention & Focus Regulation",
    summary:
      "How focus behaves under real learning conditions, including sustained attention and task switching.",
    keyMethodUse:
      "Sessions are paced with intentional rhythm to prevent drift and cognitive fatigue.",
    icon: "🎯",
  },
  wm: {
    title: "Working Memory Load",
    summary:
      "How much information a student can hold and manipulate at once without overload.",
    keyMethodUse:
      "We reduce load through scaffolding, then rebuild capacity through repetition and structure.",
    icon: "💭",
  },
  lp: {
    title: "Learning Pace Calibration",
    summary:
      "The pace at which accuracy and confidence remain stable over time.",
    keyMethodUse:
      "We slow foundations, stabilise understanding, then layer speed only when clarity holds.",
    icon: "⚡",
  },
  er: {
    title: "Error Response Behaviour",
    summary:
      "How a student reacts when something goes wrong — emotionally and strategically.",
    keyMethodUse:
      "We train a calm error routine so mistakes become progress, not hesitation.",
    icon: "🔄",
  },
  sa: {
    title: "Strategy Adaptability",
    summary:
      "How effectively a student selects and switches strategies as problem demands change.",
    keyMethodUse:
      "We teach reliable frameworks and train recognition cues for automatic tool selection.",
    icon: "🎛️",
  },
};

const NODE_ORDER: NodeKey[] = ["cp", "af", "wm", "lp", "er", "sa"];

export default function MindPrintSection() {
  const [active, setActive] = useState<NodeKey>("cp");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMini, setHoveredMini] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const c = NODE_COPY[active];

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle node change with transition
  const handleNodeChange = (key: NodeKey) => {
    if (key === active) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(key);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-white via-[#F7F5FB] to-white"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#E6E0F5]/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#D9CFF2]/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          className={`max-w-3xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs tracking-[0.20em] uppercase text-[#8C84A8]">
            MindPrint™ System
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#3F3A52]">
            A cognitive map of how your child learns.
          </h2>
          <p className="mt-4 text-base text-[#6B647F]">
            MindPrint informs{" "}
            <span className="font-semibold text-[#5E5574]">The KEY Method</span>{" "}
            — so teaching becomes structured, personal, and repeatable.
          </p>
        </div>

        {/* Node selector pills */}
        <div
          className={`mt-10 flex flex-wrap gap-2 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {NODE_ORDER.map((key, index) => (
            <button
              key={key}
              onClick={() => handleNodeChange(key)}
              className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                active === key
                  ? "bg-[#5E5574] text-white shadow-md shadow-[#5E5574]/20"
                  : "bg-white/80 text-[#6B647F] hover:bg-white hover:text-[#3F3A52] border border-[#E6E0F2] hover:border-[#D9CFF2]"
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 50}ms` : "0ms" 
              }}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{NODE_COPY[key].icon}</span>
                <span className="hidden sm:inline">
                  {NODE_COPY[key].title.split(" ").slice(0, 2).join(" ")}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Main content area */}
        <div
          className={`mt-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="rounded-3xl border border-[#D9CFF2]/80 bg-white/60 backdrop-blur-sm p-8 md:p-10 shadow-soft">
            <div className="grid gap-14 lg:grid-cols-12 items-start">
              {/* Diagram */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative">
                  <MindPrintDiagram active={active} onSelect={handleNodeChange} />
                </div>
              </div>

              {/* Explanation panel */}
              <div className="lg:col-span-5 space-y-6">
                {/* Main explanation card */}
                <div
                  className={`rounded-2xl border border-[#E6E0F2] bg-white/75 p-6 transition-all duration-300 ${
                    isTransitioning
                      ? "opacity-0 translate-x-4"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4F1FB] text-xl">
                        {c.icon}
                      </div>
                      <div>
                        <div className="text-xs tracking-[0.18em] uppercase text-[#8C84A8]">
                          Framework node
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-[#3F3A52]">
                          {c.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#6B647F]">
                    {c.summary}
                  </p>

                  {/* KEY Method integration */}
                  <div className="mt-5 rounded-xl border border-[#E6E0F2] bg-[#F7F5FB] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs">🔑</span>
                      <div className="text-sm font-semibold text-[#3F3A52]">
                        How The KEY Method uses this
                      </div>
                    </div>
                    <p className="text-sm text-[#6B647F]">{c.keyMethodUse}</p>
                  </div>

                  {/* Progress dots */}
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {NODE_ORDER.map((key) => (
                      <button
                        key={key}
                        onClick={() => handleNodeChange(key)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          key === active
                            ? "w-6 bg-[#5E5574]"
                            : "w-2 bg-[#D9CFF2] hover:bg-[#B8AED4]"
                        }`}
                        aria-label={`Select ${NODE_COPY[key].title}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Testing & refinement card */}
                <div
                  className={`rounded-2xl border border-[#E6E0F2] bg-white/75 p-6 transition-all duration-300 delay-75 ${
                    isTransitioning
                      ? "opacity-0 translate-x-4"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  <h4 className="text-sm font-semibold text-[#3F3A52]">
                    How we run tests (and keep refining)
                  </h4>
                  <p className="mt-2 text-sm text-[#6B647F]">
                    MindPrint is built from short diagnostics, topic checkpoints,
                    and structured tutor observation. It isn't a fixed label — it
                    evolves as the student grows.
                  </p>

                  <div className="mt-4 grid gap-3">
                    {[
                      {
                        title: "Micro-diagnostics",
                        body: "Short tasks that reveal processing style and friction points.",
                        icon: "🔬",
                      },
                      {
                        title: "Retrieval checks",
                        body: "Spaced review to track stability and transfer.",
                        icon: "📊",
                      },
                      {
                        title: "Tutor observation",
                        body: "Habits and behaviours logged to improve pacing and structure.",
                        icon: "👁️",
                      },
                    ].map((item, index) => (
                      <MiniRow
                        key={item.title}
                        {...item}
                        isHovered={hoveredMini === index}
                        onHover={() => setHoveredMini(index)}
                        onLeave={() => setHoveredMini(null)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learn More CTA Section */}
        <div
          className={`mt-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="rounded-3xl border border-[#D9CFF2]/80 bg-gradient-to-br from-[#5E5574] to-[#4A4463] p-10 md:p-14 shadow-soft overflow-hidden relative">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            {/* Decorative blurs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-2 items-center">
              {/* Left content */}
              <div>
                <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 mb-6">
                  Deep Dive
                </span>

                <h3 className="text-3xl md:text-4xl font-semibold text-white">
                  Discover the complete MindPrint System
                </h3>

                <p className="mt-4 text-base text-white/70 leading-relaxed max-w-lg">
                  Learn how we build, refine, and apply cognitive profiles to
                  create truly personalised learning experiences that adapt and
                  grow with your child.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/mindprint"
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#3F3A52] transition-all hover:shadow-lg hover:shadow-white/20"
                  >
                    Learn More About MindPrint
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
                    href="/consultation"
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
                  >
                    Book Assessment
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right: Feature highlights */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: "🧬",
                    title: "6 Core Dimensions",
                    description: "Comprehensive cognitive mapping",
                  },
                  {
                    icon: "📈",
                    title: "Continuous Updates",
                    description: "Profile evolves with progress",
                  },
                  {
                    icon: "🔗",
                    title: "KEY Integration",
                    description: "Directly informs teaching style",
                  },
                  {
                    icon: "🎓",
                    title: "Expert Analysis",
                    description: "Tutor-verified observations",
                  },
                ].map((feature, index) => (
                  <div
                    key={feature.title}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl mb-3 transition-transform group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <div className="font-semibold text-white">{feature.title}</div>
                    <div className="mt-1 text-sm text-white/60">
                      {feature.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div
          className={`mt-14 flex flex-wrap justify-center gap-12 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { value: "6", label: "Cognitive Dimensions" },
            { value: "100%", label: "Personalised" },
            { value: "Ongoing", label: "Refinement" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-semibold text-[#3F3A52]">
                {stat.value}
              </div>
              <div className="text-sm text-[#6B647F]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Mini Row Component ---------- */

function MiniRow({
  title,
  body,
  icon,
  isHovered,
  onHover,
  onLeave,
}: {
  title: string;
  body: string;
  icon: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`rounded-xl border p-4 transition-all duration-200 cursor-default ${
        isHovered
          ? "border-[#D9CFF2] bg-white shadow-sm -translate-y-0.5"
          : "border-[#E6E0F2] bg-[#F7F5FB]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all duration-200 ${
            isHovered ? "bg-[#5E5574] text-white scale-105" : "bg-[#E6E0F5]"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-[#3F3A52]">{title}</div>
          <div className="mt-1 text-sm text-[#6B647F]">{body}</div>
        </div>
      </div>
    </div>
  );
}