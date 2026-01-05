// components/MindPrintSection.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Brain,
  Zap,
  Target,
  BookOpen,
  Eye,
  Layers,
  Compass,
  Clock,
  ArrowRight,
  ChevronRight,
  Activity,
  TrendingUp,
  Users,
  User,
} from "lucide-react";

/* =========================
   Data
========================= */

const COGNITIVE_DIMENSIONS = [
  {
    id: "wm",
    name: "Working Memory",
    shortName: "Memory",
    description: "Holding & manipulating information",
    icon: Brain,
    color: "#5E5574", // Primary Kite Lavender
    score: 72,
  },
  {
    id: "ps",
    name: "Processing Speed",
    shortName: "Speed",
    description: "How quickly information is processed",
    icon: Zap,
    color: "#6B7280", // Cool Grey
    score: 65,
  },
  {
    id: "ef",
    name: "Executive Function",
    shortName: "Executive",
    description: "Planning & self-regulation",
    icon: Target,
    color: "#5E5574", // Repeated Primary
    score: 81,
  },
  {
    id: "vr",
    name: "Verbal Reasoning",
    shortName: "Verbal",
    description: "Language-based understanding",
    icon: BookOpen,
    color: "#8B7FA8", // Light Lavender Slate
    score: 78,
  },
  {
    id: "sr",
    name: "Spatial Reasoning",
    shortName: "Spatial",
    description: "Visual-spatial thinking",
    icon: Eye,
    color: "#6B7280", // Cool Grey
    score: 85,
  },
  {
    id: "pr",
    name: "Pattern Recognition",
    shortName: "Patterns",
    description: "Identifying structures & relationships",
    icon: Layers,
    color: "#5E5574",
    score: 89,
  },
  {
    id: "fa",
    name: "Focus & Attention",
    shortName: "Focus",
    description: "Sustained & selective attention",
    icon: Compass,
    color: "#4F4865", // Darker Kite
    score: 58,
  },
  {
    id: "ce",
    name: "Cognitive Endurance",
    shortName: "Endurance",
    description: "Mental stamina over time",
    icon: Clock,
    color: "#8B7FA8",
    score: 62,
  },
];

const STATS = [
  { value: 8, label: "Cognitive Dimensions", suffix: "" },
  { value: 15, label: "Learning Archetypes", suffix: "" },
  { value: 5, label: "Initial Assessments", suffix: "" },
  { value: 300, label: "Micro-assessments", suffix: "+" },
];

const ARCHETYPES_PREVIEW = [
  "Reflective Deep Learner",
  "Rapid Processor",
  "Visual Synthesizer",
  "Strategic Planner",
  "Pattern-Driven Thinker",
];

/* =========================
   Component
========================= */

export default function MindPrintSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(STATS.map(() => 0));
  const [hoveredDimension, setHoveredDimension] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer
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

  // Animate stats on visibility
  useEffect(() => {
    if (!isVisible) return;

    STATS.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setAnimatedStats((prev) => {
          const newStats = [...prev];
          newStats[index] = Math.floor(current);
          return newStats;
        });
      }, duration / steps);
    });
  }, [isVisible]);

  // Auto-rotate active dimension
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % COGNITIVE_DIMENSIONS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const activeDimension = COGNITIVE_DIMENSIONS[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden bg-white"
    >
      {/* Enhanced background layers matches page.tsx */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F7F5FB] to-white" />

      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E6E1F2]/10 via-transparent to-[#EEEAF8]/20 opacity-40" />

      {/* Floating orbs - kept subtle */}
      <div className="absolute top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-[#E6E1F2]/20 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-20 left-1/4 h-96 w-96 rounded-full bg-[#E6E0F5]/20 blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header - Aesthetics: Cormorant + Inter */}
        <div
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white/60 px-5 py-2.5 text-xs tracking-widest uppercase font-medium text-[#5E5574] backdrop-blur-sm mb-6">
            <Brain size={16} className="text-[#5E5574]" />
            Cognitive Intelligence System
          </div>

          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#3F3A52]">
            MindPrint<span className="text-[#5E5574] italic">™</span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-[#6B647F] leading-relaxed font-light">
            A proprietary framework that maps <em className="text-[#5E5574] not-italic font-medium">how</em> your child learns —
            transforming cognition into an actionable blueprint.
          </p>
        </div>

        {/* Animated Stats Bar - Glassmorphism */}
        <div
          className={`mb-20 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="rounded-3xl border border-[#E6E0F2] bg-white/60 backdrop-blur-md p-8 md:p-10 shadow-glass">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {STATS.map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="font-cormorant text-5xl md:text-6xl text-[#5E5574] tabular-nums transition-transform group-hover:scale-110 duration-500">
                    {animatedStats[index]}
                    <span className="text-[#8B7FA8] text-4xl">{stat.suffix}</span>
                  </div>
                  <div className="mt-3 text-sm font-medium text-[#6B647F] uppercase tracking-wide opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Infographic Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Cognitive Wheel Visualization */}
          <div
            className={`lg:col-span-5 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            <div className="rounded-3xl border border-[#E6E0F2] bg-white/80 backdrop-blur-sm p-10 h-full shadow-glass">
              <div className="text-center mb-8">
                <h3 className="font-cormorant text-2xl font-medium text-[#3F3A52]">
                  8 Cognitive Dimensions
                </h3>
                <p className="text-sm text-[#8B7FA8] mt-2 font-light">
                  Nuanced profiling for personalized learning
                </p>
              </div>

              {/* Circular visualization */}
              <div className="relative w-full aspect-square max-w-[340px] mx-auto">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full blur-xl transition-all duration-700 opacity-20"
                      style={{
                        backgroundColor: activeDimension.color,
                        transform: 'scale(1.2)',
                      }}
                    />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#E6E0F2] bg-white shadow-soft transition-all duration-500">
                      <div className="text-center">
                        <div
                          className="font-cormorant text-4xl font-medium transition-all duration-500"
                          style={{ color: activeDimension.color }}
                        >
                          {activeDimension.score}
                        </div>
                        <div className="text-[10px] text-[#8C84A8] uppercase tracking-wider font-semibold">
                          Score
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orbiting dimension nodes */}
                {COGNITIVE_DIMENSIONS.map((dim, index) => {
                  const Icon = dim.icon;
                  const angle = (index / COGNITIVE_DIMENSIONS.length) * 2 * Math.PI - Math.PI / 2;
                  const radius = 130;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const isActive = index === activeIndex;
                  const isHovered = hoveredDimension === index;

                  return (
                    <div
                      key={dim.id}
                      className="absolute transition-all duration-500"
                      style={{
                        top: `calc(50% + ${y}px)`,
                        left: `calc(50% + ${x}px)`,
                        transform: `translate(-50%, -50%) scale(${isActive || isHovered ? 1.1 : 1})`,
                        zIndex: isActive || isHovered ? 20 : 10,
                      }}
                    >
                      <button
                        onClick={() => setActiveIndex(index)}
                        onMouseEnter={() => setHoveredDimension(index)}
                        onMouseLeave={() => setHoveredDimension(null)}
                        className={`group relative flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-500 ${isActive
                          ? "border-[#5E5574] ring-2 ring-[#5E5574]/10"
                          : "border-[#E6E0F2] hover:border-[#D9CFF2]"
                          }`}
                        style={{
                          color: isActive ? dim.color : "#8B7FA8",
                        }}
                      >
                        <Icon size={20} strokeWidth={1.5} />
                      </button>
                    </div>
                  );
                })}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {COGNITIVE_DIMENSIONS.map((_, index) => {
                    const angle = (index / COGNITIVE_DIMENSIONS.length) * 2 * Math.PI - Math.PI / 2;
                    const radius = 130;
                    const x = Math.cos(angle) * radius + 170;
                    const y = Math.sin(angle) * radius + 170;

                    return (
                      <line
                        key={index}
                        x1="170"
                        y1="170"
                        x2={x}
                        y2={y}
                        stroke={index === activeIndex ? activeDimension.color : "#E6E0F2"}
                        strokeWidth={index === activeIndex ? "1" : "1"}
                        className="transition-all duration-700"
                        opacity={index === activeIndex ? 0.3 : 0.2}
                      />
                    );
                  })}
                </svg>

                {/* Outer ring */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 340">
                  <circle
                    cx="170"
                    cy="170"
                    r="155"
                    fill="none"
                    stroke="#F1ECFA"
                    strokeWidth="1"
                  />
                  <circle
                    cx="170"
                    cy="170"
                    r="155"
                    fill="none"
                    stroke={activeDimension.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={`${(activeDimension.score / 100) * 974} 974`}
                    transform="rotate(-90 170 170)"
                    className="transition-all duration-700"
                    opacity="0.5"
                  />
                </svg>
              </div>

              {/* Active dimension detail */}
              <div className="mt-10 text-center">
                <div className="font-cormorant text-xl text-[#3F3A52] font-medium mb-1">
                  {activeDimension.name}
                </div>
                <p className="text-sm text-[#6B647F] font-light">
                  {activeDimension.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Info Panels */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            {/* How It Works */}
            <div className="rounded-3xl border border-[#E6E0F2] bg-white/80 backdrop-blur-sm p-8 shadow-glass">
              <h3 className="font-cormorant text-2xl text-[#3F3A52] mb-6 flex items-center gap-3">
                <Brain size={24} className="text-[#5E5574] opacity-80" strokeWidth={1} />
                The Assessment Process
              </h3>

              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  {
                    step: "01",
                    title: "Assess",
                    description: "5 online modules measuring core cognitive systems.",
                    icon: Brain,
                  },
                  {
                    step: "02",
                    title: "Profile",
                    description: "We map strengths and friction points.",
                    icon: Layers,
                  },
                  {
                    step: "03",
                    title: "Refine",
                    description: "Bi-weekly updates based on progress.",
                    icon: TrendingUp,
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="relative rounded-2xl border border-[#E6E0F2] bg-[#FAFAFA] p-6 hover:border-[#D9CFF2] hover:bg-white transition-all group"
                  >
                    <div className="absolute top-4 right-4 text-xs font-bold text-[#E6E0F2] group-hover:text-[#D9CFF2]">
                      {item.step}
                    </div>
                    <div className="mt-2">
                      {/* Icon replaced with step number or simple icon */}
                      <div className="font-cormorant text-xl text-[#3F3A52] mb-2 font-medium">
                        {item.title}
                      </div>
                      <p className="text-sm text-[#6B647F] leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Archetypes Preview */}
            <div className="rounded-3xl border border-[#E6E0F2] bg-white/80 backdrop-blur-sm p-8 shadow-glass">
              <h3 className="font-cormorant text-2xl text-[#3F3A52] mb-4 flex items-center gap-3">
                <Users size={24} className="text-[#5E5574] opacity-80" strokeWidth={1} />
                Cognitive Archetypes
              </h3>

              <p className="text-sm text-[#6B647F] mb-6 leading-relaxed font-light">
                We identify your child's primary learning style from over 15 unique profiles, moving beyond simple labels.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {ARCHETYPES_PREVIEW.map((archetype, index) => (
                  <span
                    key={archetype}
                    className="rounded-full border border-[#E6E0F2] bg-white px-4 py-1.5 text-xs text-[#5E5574] transition-all hover:border-[#D9CFF2] hover:bg-[#F7F5FB]"
                  >
                    {archetype}
                  </span>
                ))}
                <span className="rounded-full border border-dashed border-[#D9CFF2] px-4 py-1.5 text-xs text-[#8B7FA8]">
                  + 10 others
                </span>
              </div>
            </div>

            {/* Sample Profile Preview */}
            <div className="rounded-3xl border border-[#E6E0F2] bg-white p-8 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-cormorant text-2xl text-[#3F3A52] flex items-center gap-3">
                  Sample Insight
                </h3>
                <span className="text-xs font-medium text-[#8B7FA8] bg-[#F7F5FB] px-3 py-1.5 rounded-full">
                  Year 8 Student
                </span>
              </div>

              {/* Minimal bar chart */}
              <div className="space-y-5 mb-8">
                {COGNITIVE_DIMENSIONS.slice(0, 3).map((dim, index) => (
                  <div key={dim.id} className="group">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[#5E5574] font-medium tracking-wide">
                        {dim.name}
                      </span>
                      <span className="text-[#3F3A52] font-mono">{dim.score}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#F1ECFA] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: isVisible ? `${dim.score}%` : "0%",
                          backgroundColor: dim.color,
                          transitionDelay: `${index * 150 + 500}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/mindprint"
                className="group flex items-center justify-center gap-2 w-full rounded-xl bg-[#F7F5FB] border border-[#E6E0F2] py-4 text-sm font-medium text-[#5E5574] transition-all hover:bg-[#5E5574] hover:text-white hover:border-transparent"
              >
                View Full Sample Report
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-20 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="rounded-[2rem] bg-[#5E5574] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
            {/* Minimalist background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffffff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <h3 className="font-cormorant text-3xl md:text-5xl text-white mb-6 font-light">
                Understanding predicts success.
              </h3>
              <p className="text-white/80 max-w-2xl mx-auto leading-relaxed font-light mb-10 text-lg">
                Stop guessing. Start teaching based on real cognitive data.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/consultation"
                  className="inline-flex justify-center items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#5E5574] transition-all hover:bg-[#F1ECFA] hover:-translate-y-0.5"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="/mindprint"
                  className="inline-flex justify-center items-center gap-2 rounded-full border border-white/30 bg-transparent px-8 py-4 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}