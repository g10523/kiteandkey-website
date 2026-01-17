"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TextbookPreviewMaths from "../../../../components/TextbookPreviewMaths";
import { Brain, Target, TrendingUp, Users, BookOpen, Zap, CheckCircle, Clock, Calculator, PieChart, Ruler } from "lucide-react";

/* =========================
   Data
========================= */

type TermKey = "Term 1" | "Term 2" | "Term 3" | "Term 4";

interface Lesson {
    topic: string;
    outcomes: string[];
}

const TERMS: Record<TermKey, { title: string; subtitle: string; lessons: Lesson[] }> = {
    "Term 1": {
        title: "Number, Integers & Foundations",
        subtitle: "Fluency, integer reasoning, algebra readiness",
        lessons: [
            {
                topic: "Place Value & Number Properties",
                outcomes: [
                    "Understand integers, factors, and multiples",
                    "Identify prime and composite numbers",
                    "Apply number properties in problem solving"
                ]
            },
            {
                topic: "Index Laws (Introduction)",
                outcomes: [
                    "Calculate squares and cubes",
                    "Use index notation",
                    "Recognize patterns in powers"
                ]
            },
            {
                topic: "Order of Operations",
                outcomes: [
                    "Apply order of operations with brackets",
                    "Solve problems with multiple operations",
                    "Use BODMAS/BIDMAS correctly"
                ]
            },
            {
                topic: "Integers on the Number Line",
                outcomes: [
                    "Represent positive and negative numbers",
                    "Apply integers in real-life contexts (temperature, money)",
                    "Compare and order integers"
                ]
            },
            {
                topic: "Operations with Integers",
                outcomes: [
                    "Add and subtract integers",
                    "Use visual models for understanding",
                    "Solve integer word problems"
                ]
            },
            {
                topic: "Multiplying & Dividing Integers",
                outcomes: [
                    "Apply sign rules for multiplication and division",
                    "Recognize patterns in integer operations",
                    "Solve problems involving integer operations"
                ]
            },
            {
                topic: "Problem Solving with Integers",
                outcomes: [
                    "Solve multi-step reasoning problems",
                    "Apply integers in word problems",
                    "Justify solution strategies"
                ]
            },
            {
                topic: "Numerical Investigations",
                outcomes: [
                    "Identify and extend patterns",
                    "Provide logical justification",
                    "Explore number relationships"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Timed questions", "Common error analysis", "Strategy refinement"]
            },
            {
                topic: "Term 1 Exam",
                outcomes: ["Assessment of number & integer operations", "Reasoning-based questions"]
            }
        ]
    },
    "Term 2": {
        title: "Fractions, Decimals, Percentages & Ratios",
        subtitle: "Proportional reasoning & real-world maths",
        lessons: [
            {
                topic: "Review of Fractions",
                outcomes: [
                    "Simplify fractions to lowest terms",
                    "Find equivalent fractions",
                    "Compare and order fractions"
                ]
            },
            {
                topic: "Operations with Fractions",
                outcomes: [
                    "Add and subtract fractions",
                    "Multiply and divide fractions",
                    "Solve fraction word problems"
                ]
            },
            {
                topic: "Decimals",
                outcomes: [
                    "Perform operations with decimals",
                    "Round decimals appropriately",
                    "Use estimation with decimals"
                ]
            },
            {
                topic: "Percentages",
                outcomes: [
                    "Calculate percentage of a quantity",
                    "Find percentage increase and decrease",
                    "Apply percentages in real contexts"
                ]
            },
            {
                topic: "Fractions–Decimals–Percentages",
                outcomes: [
                    "Convert between fractions, decimals, and percentages",
                    "Solve exam-style reasoning problems",
                    "Apply conversions in context"
                ]
            },
            {
                topic: "Ratios",
                outcomes: [
                    "Write and simplify ratios",
                    "Divide quantities in given ratios",
                    "Solve ratio problems"
                ]
            },
            {
                topic: "Rates",
                outcomes: [
                    "Calculate speed and unit rates",
                    "Apply rates in real-life applications",
                    "Solve rate word problems"
                ]
            },
            {
                topic: "Proportional Reasoning Problems",
                outcomes: [
                    "Solve multi-step word problems",
                    "Apply proportional reasoning",
                    "Justify solution methods"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Ratio & percentage word problems", "Mixed proportional reasoning"]
            },
            {
                topic: "Term 2 Exam",
                outcomes: ["Assessment of fractions, decimals, percentages & ratios"]
            }
        ]
    },
    "Term 3": {
        title: "Algebra & Geometry",
        subtitle: "Symbolic thinking and spatial reasoning",
        lessons: [
            {
                topic: "Algebraic Expressions",
                outcomes: [
                    "Understand variables and constants",
                    "Write algebraic expressions",
                    "Translate word problems into algebra"
                ]
            },
            {
                topic: "Simplifying Algebraic Expressions",
                outcomes: [
                    "Collect like terms",
                    "Simplify expressions efficiently",
                    "Apply simplification in problem solving"
                ]
            },
            {
                topic: "Substitution",
                outcomes: [
                    "Evaluate expressions by substitution",
                    "Use correct order of operations",
                    "Apply substitution in formulas"
                ]
            },
            {
                topic: "Linear Equations (Introduction)",
                outcomes: [
                    "Solve one-step equations",
                    "Understand inverse operations",
                    "Check solutions"
                ]
            },
            {
                topic: "Angles",
                outcomes: [
                    "Identify adjacent and vertically opposite angles",
                    "Calculate angles on a line and around a point",
                    "Apply angle relationships"
                ]
            },
            {
                topic: "Triangles & Quadrilaterals",
                outcomes: [
                    "Apply angle sum properties",
                    "Classify triangles and quadrilaterals",
                    "Solve problems using properties"
                ]
            },
            {
                topic: "Perimeter & Area",
                outcomes: [
                    "Calculate perimeter and area of rectangles and triangles",
                    "Find area of composite shapes",
                    "Apply formulas in real contexts"
                ]
            },
            {
                topic: "Algebra & Geometry Problem Solving",
                outcomes: [
                    "Solve mixed reasoning tasks",
                    "Apply algebraic and geometric thinking",
                    "Justify solutions mathematically"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Algebra & geometry exam questions", "Diagram interpretation"]
            },
            {
                topic: "Term 3 Exam",
                outcomes: ["Assessment of algebra & geometry"]
            }
        ]
    },
    "Term 4": {
        title: "Measurement, Data & Consolidation",
        subtitle: "Application, interpretation, exam readiness",
        lessons: [
            {
                topic: "Metric Measurement",
                outcomes: [
                    "Convert between units of length, mass, capacity",
                    "Apply metric conversions",
                    "Solve measurement problems"
                ]
            },
            {
                topic: "Area & Volume",
                outcomes: [
                    "Calculate volume of rectangular prisms",
                    "Apply area and volume formulas",
                    "Solve real-world measurement problems"
                ]
            },
            {
                topic: "Time & Timetables",
                outcomes: [
                    "Calculate elapsed time",
                    "Interpret timetables",
                    "Solve time-based problems"
                ]
            },
            {
                topic: "Data Representation",
                outcomes: [
                    "Create tables, column graphs, and line graphs",
                    "Choose appropriate data displays",
                    "Interpret data representations"
                ]
            },
            {
                topic: "Data Interpretation",
                outcomes: [
                    "Calculate mean, median, mode, and range",
                    "Interpret measures of center and spread",
                    "Draw conclusions from data"
                ]
            },
            {
                topic: "Probability",
                outcomes: [
                    "Calculate theoretical probability",
                    "Conduct simple probability experiments",
                    "Express probability as fractions and decimals"
                ]
            },
            {
                topic: "Mathematical Investigations",
                outcomes: [
                    "Solve open-ended problems",
                    "Apply cross-strand concepts",
                    "Present mathematical findings"
                ]
            },
            {
                topic: "Full Year Revision",
                outcomes: ["Review number, algebra, geometry, data"]
            },
            {
                topic: "Yearly Exam Preparation",
                outcomes: ["Full practice exam", "Time management strategies"]
            },
            {
                topic: "Yearly Exam",
                outcomes: ["Comprehensive Stage 4 assessment", "Reasoning + problem solving focus"]
            }
        ]
    }
};

const KEY_METHOD_BENEFITS = [
    {
        icon: BookOpen,
        title: "Strong Algebraic Foundations",
        description: "Introduction to algebraic thinking builds confidence with variables, expressions, and equations — essential skills for all senior mathematics.",
    },
    {
        icon: Users,
        title: "Integer Mastery",
        description: "Deep understanding of positive and negative numbers through visual models and real-world contexts, preparing students for advanced mathematics.",
    },
    {
        icon: Zap,
        title: "Proportional Reasoning",
        description: "Comprehensive coverage of fractions, decimals, percentages, ratios, and rates — the foundation for Year 8 and beyond.",
    },
    {
        icon: TrendingUp,
        title: "High School Success",
        description: "Strategic preparation for Stage 4 assessments and smooth transition to Year 8 mathematics with exam-focused practice.",
    },
];

const APPROACH_FEATURES = [
    {
        icon: Calculator,
        title: "Concrete to abstract",
        description: "Visual models and real-world contexts make abstract concepts accessible and meaningful.",
    },
    {
        icon: Brain,
        title: "Mathematical reasoning",
        description: "Every lesson develops logical thinking through multi-step problems and written explanations.",
    },
    {
        icon: Target,
        title: "Stage 4 aligned",
        description: "Full coverage of NSW Mathematics K–10 Stage 4 outcomes with strategic sequencing.",
    },
    {
        icon: CheckCircle,
        title: "Regular assessment",
        description: "Frequent testing and exam practice build confidence and identify areas for improvement.",
    },
];

/* =========================
   Page Component
========================= */

export default function Year7MathsPage() {
    const [activeTerm, setActiveTerm] = useState<TermKey>("Term 1");
    const active = TERMS[activeTerm];
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                            <li className="text-[#5E5574]">Year 7 Mathematics</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Syllabus Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 7 Mathematics
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        Building strong foundations for high school mathematics — mastering{" "}
                        <span className="text-[#5E5574] font-medium">integers</span>,{" "}
                        <span className="text-[#5E5574] font-medium">algebra</span>, and{" "}
                        <span className="text-[#5E5574] font-medium">proportional reasoning</span>.
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

            {/* Blue sticky line for Mathematics */}
            <div
                className={`h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ${isSticky ? 'fixed top-[72px] left-0 right-0 z-40' : 'relative'
                    }`}
            />

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
                            Each term focuses on a different strand of mathematics, building Stage 4 skills systematically.
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

                                <div className="space-y-4">
                                    {active.lessons.map((lesson, i) => (
                                        <div
                                            key={i}
                                            className="group rounded-xl border border-[#E6E1F2] bg-white p-5 transition-all hover:border-[#D9CFF2] hover:shadow-sm"
                                        >
                                            <div className="flex items-start gap-4 mb-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F1FB] text-sm font-semibold text-[#6B647F] group-hover:bg-[#E6E0F5] group-hover:text-[#5E5574] transition-colors">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-[#3F3A52] mb-2">
                                                        {lesson.topic}
                                                    </h4>
                                                    <ul className="space-y-1.5">
                                                        {lesson.outcomes.map((outcome, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-[#6B647F]">
                                                                <CheckCircle size={14} className="text-[#8B7FA8] shrink-0 mt-0.5" />
                                                                <span>{outcome}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
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
            <TextbookPreviewMaths />


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
                            Every lesson is designed around three principles: structured <span className="text-[#5E5574] font-medium">Knowledge</span>,
                            active <span className="text-[#5E5574] font-medium">Engagement</span>, and measurable <span className="text-[#5E5574] font-medium">Yield</span> — all informed by your child's{" "}
                            <span className="text-[#5E5574] font-medium">MindPrint</span> cognitive profile.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {KEY_METHOD_BENEFITS.map((benefit) => (
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

                    {/* MindPrint Integration Callout */}
                    <div className="mt-12 rounded-2xl border-2 border-[#D9CFF2] bg-gradient-to-br from-[#F7F5FB] to-white p-8">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5E5574] to-[#7C6B94] text-white">
                                <Brain size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-[#3F3A52] mb-2">Powered by MindPrint™</h3>
                                <p className="text-[#6B647F] leading-relaxed mb-4">
                                    Every lesson is tailored to your child's unique cognitive profile. MindPrint assessment reveals how your child processes information, allowing us to adapt pacing, structure, and task design to their specific strengths and challenges.
                                </p>
                                <Link
                                    href="/mindprint"
                                    className="inline-flex items-center gap-2 text-[#5E5574] font-semibold hover:text-[#4F4865] transition-colors group"
                                >
                                    Learn About MindPrint
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
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
                            Designed for Stage 4 success
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

            {/* ================= SYLLABUS NOTE ================= */}
            <section className="py-16 border-t border-[#E6E1F2]">
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <div className="rounded-2xl border border-[#E6E1F2] bg-white/80 p-8 backdrop-blur-sm">
                        <p className="text-sm font-medium tracking-[0.1em] uppercase text-[#8C84A8] mb-3">
                            Curriculum Alignment
                        </p>
                        <p className="text-[#4A4458] leading-relaxed">
                            This course follows the{" "}
                            <strong className="text-[#3F3A52]">NSW Mathematics K–10 Syllabus</strong>{" "}
                            for Stage 4, covering all outcomes for Year 7 students. Content is
                            sequenced to build strong foundations in integers, algebra, and proportional reasoning.
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
