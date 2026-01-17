// components/MindPrintSection.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
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
  TrendingUp,
  Users,
  CheckCircle2,
} from "lucide-react";

/* =========================
   Animation Variants
========================= */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

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
    color: "#7C3AED",
    score: 72,
  },
  {
    id: "ps",
    name: "Processing Speed",
    shortName: "Speed",
    description: "How quickly information is processed",
    icon: Zap,
    color: "#3B82F6",
    score: 65,
  },
  {
    id: "ef",
    name: "Executive Function",
    shortName: "Executive",
    description: "Planning & self-regulation",
    icon: Target,
    color: "#10B981",
    score: 81,
  },
  {
    id: "vr",
    name: "Verbal Reasoning",
    shortName: "Verbal",
    description: "Language-based understanding",
    icon: BookOpen,
    color: "#F59E0B",
    score: 78,
  },
  {
    id: "sr",
    name: "Spatial Reasoning",
    shortName: "Spatial",
    description: "Visual-spatial thinking",
    icon: Eye,
    color: "#EC4899",
    score: 85,
  },
  {
    id: "pr",
    name: "Pattern Recognition",
    shortName: "Patterns",
    description: "Identifying structures & relationships",
    icon: Layers,
    color: "#8B5CF6",
    score: 89,
  },
  {
    id: "fa",
    name: "Focus & Attention",
    shortName: "Focus",
    description: "Sustained & selective attention",
    icon: Compass,
    color: "#06B6D4",
    score: 58,
  },
  {
    id: "ce",
    name: "Cognitive Endurance",
    shortName: "Endurance",
    description: "Mental stamina over time",
    icon: Clock,
    color: "#EF4444",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(STATS.map(() => 0));
  const [hoveredDimension, setHoveredDimension] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax for orbs
  const y1 = useTransform(scrollY, [0, 2000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 300]);

  // Animate stats on mount
  useEffect(() => {
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
  }, []);

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
      className="relative border-t border-[#E6E8F0] py-24 md:py-32 overflow-hidden"
    >
      {/* Enhanced background matching /mindprint page */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3F9] via-[#FAFAFA] to-white" />

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

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header with Framer Motion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-medium text-[#5E5574] backdrop-blur-sm mb-6 shadow-sm">
              <Brain size={16} className="text-[#5E5574]" />
              Cognitive Intelligence System
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-julius text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#3F3A52] leading-[1.1]"
          >
            MindPrint<span className="text-[#5E5574] italic">™</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg md:text-xl text-[#6B647F] leading-relaxed font-light"
          >
            A proprietary framework that maps <em className="text-[#5E5574] not-italic font-medium">how</em> your child learns —
            transforming cognition into an actionable blueprint.
          </motion.p>
        </motion.div>

        {/* Animated Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="rounded-3xl border border-[#D9CFF2]/80 bg-white/80 backdrop-blur-md p-8 md:p-10 shadow-lg shadow-[#5E5574]/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="font-julius text-5xl md:text-6xl text-[#5E5574] tabular-nums">
                    {animatedStats[index]}
                    <span className="text-[#8B7FA8] text-4xl">{stat.suffix}</span>
                  </div>
                  <div className="mt-3 text-sm font-medium text-[#6B647F] uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Cognitive Wheel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl border border-[#D9CFF2]/80 bg-white/90 backdrop-blur-sm p-10 h-full shadow-lg shadow-[#5E5574]/5">
              <div className="text-center mb-8">
                <h3 className="font-julius text-2xl md:text-3xl font-light text-[#3F3A52]">
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
                    <motion.div
                      className="absolute inset-0 rounded-full blur-xl"
                      animate={{
                        backgroundColor: activeDimension.color,
                        scale: [1.2, 1.3, 1.2],
                        opacity: [0.2, 0.3, 0.2]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#D9CFF2] bg-white shadow-lg">
                      <div className="text-center">
                        <motion.div
                          key={activeIndex}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="font-julius text-4xl font-medium"
                          style={{ color: activeDimension.color }}
                        >
                          {activeDimension.score}
                        </motion.div>
                        <div className="text-[10px] text-[#8C84A8] uppercase tracking-wider font-semibold">
                          Score
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orbiting nodes */}
                {COGNITIVE_DIMENSIONS.map((dim, index) => {
                  const Icon = dim.icon;
                  const angle = (index / COGNITIVE_DIMENSIONS.length) * 2 * Math.PI - Math.PI / 2;
                  const radius = 130;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const isActive = index === activeIndex;
                  const isHovered = hoveredDimension === index;

                  return (
                    <motion.div
                      key={dim.id}
                      className="absolute"
                      style={{
                        top: `calc(50% + ${y}px)`,
                        left: `calc(50% + ${x}px)`,
                      }}
                      animate={{
                        scale: isActive || isHovered ? 1.15 : 1,
                        zIndex: isActive || isHovered ? 20 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={() => setActiveIndex(index)}
                        onMouseEnter={() => setHoveredDimension(index)}
                        onMouseLeave={() => setHoveredDimension(null)}
                        className={`group relative flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white shadow-sm transition-all duration-300 ${isActive
                          ? "border-[#5E5574] ring-2 ring-[#5E5574]/20"
                          : "border-[#E6E0F2] hover:border-[#D9CFF2]"
                          }`}
                        style={{
                          color: isActive ? dim.color : "#8B7FA8",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <Icon size={20} strokeWidth={1.5} />
                      </button>
                    </motion.div>
                  );
                })}

                {/* SVG connections and ring */}
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
                        strokeWidth="1"
                        className="transition-all duration-700"
                        opacity={index === activeIndex ? 0.3 : 0.15}
                      />
                    );
                  })}
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
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 text-center"
              >
                <div className="font-julius text-xl text-[#3F3A52] font-medium mb-1">
                  {activeDimension.name}
                </div>
                <p className="text-sm text-[#6B647F] font-light">
                  {activeDimension.description}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Info Panels */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-7 space-y-6"
          >
            {/* How It Works */}
            <motion.div variants={fadeInUp} className="rounded-3xl border border-[#D9CFF2]/80 bg-white/90 backdrop-blur-sm p-8 shadow-lg shadow-[#5E5574]/5">
              <h3 className="font-julius text-2xl text-[#3F3A52] mb-6 flex items-center gap-3">
                <Brain size={24} className="text-[#5E5574] opacity-80" strokeWidth={1} />
                The Assessment Process
              </h3>

              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  {
                    step: "01",
                    title: "Assess",
                    description: "5 online modules measuring core cognitive systems.",
                  },
                  {
                    step: "02",
                    title: "Profile",
                    description: "We map strengths and friction points.",
                  },
                  {
                    step: "03",
                    title: "Refine",
                    description: "Bi-weekly updates based on progress.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl border border-[#E6E0F2] bg-[#FAFAFA] p-6 hover:border-[#D9CFF2] hover:bg-white hover:shadow-md transition-all"
                  >
                    <div className="absolute top-4 right-4 text-xs font-bold text-[#E6E0F2]">
                      {item.step}
                    </div>
                    <div className="mt-2">
                      <div className="font-julius text-xl text-[#3F3A52] mb-2 font-medium">
                        {item.title}
                      </div>
                      <p className="text-sm text-[#6B647F] leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Learning Archetypes */}
            <motion.div variants={fadeInUp} className="rounded-3xl border border-[#D9CFF2]/80 bg-white/90 backdrop-blur-sm p-8 shadow-lg shadow-[#5E5574]/5">
              <h3 className="font-julius text-2xl text-[#3F3A52] mb-4 flex items-center gap-3">
                <Users size={24} className="text-[#5E5574] opacity-80" strokeWidth={1} />
                Cognitive Archetypes
              </h3>

              <p className="text-sm text-[#6B647F] mb-6 leading-relaxed font-light">
                We identify your child's primary learning style from over 15 unique profiles, moving beyond simple labels.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {ARCHETYPES_PREVIEW.map((archetype) => (
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
            </motion.div>

            {/* Sample Profile */}
            <motion.div variants={fadeInUp} className="rounded-3xl border border-[#E6E0F2] bg-white p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-julius text-2xl text-[#3F3A52]">
                  Sample Insight
                </h3>
                <span className="text-xs font-medium text-[#8B7FA8] bg-[#F7F5FB] px-3 py-1.5 rounded-full">
                  Year 8 Student
                </span>
              </div>

              <div className="space-y-5 mb-8">
                {COGNITIVE_DIMENSIONS.slice(0, 3).map((dim, index) => (
                  <div key={dim.id}>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[#5E5574] font-medium tracking-wide">
                        {dim.name}
                      </span>
                      <span className="text-[#3F3A52] font-mono">{dim.score}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#F1ECFA] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${dim.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: dim.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/mindprint"
                className="group flex items-center justify-center gap-2 w-full rounded-xl bg-[#F7F5FB] border border-[#E6E0F2] py-4 text-sm font-medium text-[#5E5574] transition-all hover:bg-[#5E5574] hover:text-white hover:border-transparent hover:-translate-y-0.5"
              >
                View Full Sample Report
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}