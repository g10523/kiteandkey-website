"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TextbookPreview from "../../../../components/TextbookPreview";
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
        title: "Algebra Foundations & Integers",
        subtitle: "Symbolic fluency, algebraic manipulation, integer mastery",
        lessons: [
            {
                topic: "Integer Operations (Advanced)",
                outcomes: [
                    "Perform all four operations with integers",
                    "Solve multi-step integer problems",
                    "Apply integers in real-world contexts"
                ]
            },
            {
                topic: "Index Laws",
                outcomes: [
                    "Calculate powers, squares, and cubes",
                    "Apply index rules to simplify expressions",
                    "Recognize patterns in index notation"
                ]
            },
            {
                topic: "Order of Operations",
                outcomes: [
                    "Evaluate complex numerical expressions",
                    "Apply order of operations in algebraic substitution",
                    "Solve problems with nested brackets"
                ]
            },
            {
                topic: "Algebraic Expressions",
                outcomes: [
                    "Identify terms, coefficients, and constants",
                    "Write expressions from word descriptions",
                    "Translate real-world situations into algebra"
                ]
            },
            {
                topic: "Simplifying Algebraic Expressions",
                outcomes: [
                    "Collect like terms efficiently",
                    "Simplify expressions with multiple variables",
                    "Apply simplification in problem solving"
                ]
            },
            {
                topic: "Substitution & Evaluation",
                outcomes: [
                    "Substitute positive and negative values",
                    "Evaluate algebraic expressions accurately",
                    "Apply substitution in formulas"
                ]
            },
            {
                topic: "Linear Equations (One-Step)",
                outcomes: [
                    "Solve one-step linear equations",
                    "Check solutions by substitution",
                    "Apply equation solving to word problems"
                ]
            },
            {
                topic: "Algebraic Problem Solving",
                outcomes: [
                    "Translate word problems into equations",
                    "Justify solution methods",
                    "Solve multi-step algebraic problems"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Algebra fluency drills", "Common misconceptions"]
            },
            {
                topic: "Term 1 Exam",
                outcomes: ["Assessment of integers & algebra", "Reasoning-based questions"]
            }
        ]
    },
    "Term 2": {
        title: "Fractions, Ratios & Percentages",
        subtitle: "Proportional reasoning and financial-style problems",
        lessons: [
            {
                topic: "Operations with Fractions",
                outcomes: [
                    "Add, subtract, multiply, and divide fractions",
                    "Work with mixed numbers and improper fractions",
                    "Solve complex fraction problems"
                ]
            },
            {
                topic: "Fractions & Algebra",
                outcomes: [
                    "Simplify expressions with fractional coefficients",
                    "Solve equations involving fractions",
                    "Apply algebraic skills to fraction problems"
                ]
            },
            {
                topic: "Ratios",
                outcomes: [
                    "Simplify ratios to lowest terms",
                    "Divide quantities in given ratios",
                    "Solve ratio word problems"
                ]
            },
            {
                topic: "Rates",
                outcomes: [
                    "Calculate speed and unit rates",
                    "Apply rates in real-world contexts",
                    "Solve rate problems involving distance, time, and speed"
                ]
            },
            {
                topic: "Percentages",
                outcomes: [
                    "Calculate percentage of a quantity",
                    "Find the whole given a percentage",
                    "Apply percentages in various contexts"
                ]
            },
            {
                topic: "Percentage Increase & Decrease",
                outcomes: [
                    "Calculate percentage increase and decrease",
                    "Apply to financial contexts",
                    "Solve multi-step percentage problems"
                ]
            },
            {
                topic: "Profit, Loss & Discounts",
                outcomes: [
                    "Calculate profit, loss, and discount",
                    "Solve exam-style word problems",
                    "Apply financial mathematics concepts"
                ]
            },
            {
                topic: "Proportional Reasoning Problems",
                outcomes: [
                    "Solve multi-step applications",
                    "Apply proportional reasoning across contexts",
                    "Justify solution strategies"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Ratio & percentage problem sets", "Strategy refinement"]
            },
            {
                topic: "Term 2 Exam",
                outcomes: ["Assessment of fractions, ratios & percentages"]
            }
        ]
    },
    "Term 3": {
        title: "Geometry & Measurement",
        subtitle: "Spatial reasoning, formulas, geometric logic",
        lessons: [
            {
                topic: "Angle Relationships",
                outcomes: [
                    "Identify vertically opposite, corresponding, and alternate angles",
                    "Apply angle relationships to solve problems",
                    "Justify angle calculations"
                ]
            },
            {
                topic: "Parallel Lines & Transversals",
                outcomes: [
                    "Identify angles formed by parallel lines and transversals",
                    "Solve angle problems using geometric properties",
                    "Apply reasoning to complex diagrams"
                ]
            },
            {
                topic: "Triangles",
                outcomes: [
                    "Apply angle sum property of triangles",
                    "Use properties of isosceles and equilateral triangles",
                    "Solve triangle problems"
                ]
            },
            {
                topic: "Quadrilaterals",
                outcomes: [
                    "Identify properties of parallelograms, rectangles, and rhombi",
                    "Apply quadrilateral properties to solve problems",
                    "Classify quadrilaterals by their properties"
                ]
            },
            {
                topic: "Perimeter & Area",
                outcomes: [
                    "Calculate area of triangles and parallelograms",
                    "Find area of composite shapes",
                    "Apply area formulas in real contexts"
                ]
            },
            {
                topic: "Volume",
                outcomes: [
                    "Calculate volume of prisms",
                    "Apply volume formulas",
                    "Solve volume word problems"
                ]
            },
            {
                topic: "Pythagoras' Theorem (Introduction)",
                outcomes: [
                    "Understand Pythagoras' theorem",
                    "Apply to right-angled triangles",
                    "Solve problems using Pythagoras' theorem"
                ]
            },
            {
                topic: "Geometry Problem Solving",
                outcomes: [
                    "Solve multi-concept diagram problems",
                    "Apply geometric reasoning",
                    "Justify solutions using properties"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Geometry reasoning", "Diagram interpretation"]
            },
            {
                topic: "Term 3 Exam",
                outcomes: ["Assessment of geometry & measurement"]
            }
        ]
    },
    "Term 4": {
        title: "Linear Relationships, Data & Consolidation",
        subtitle: "Graphing, interpretation, full-year mastery",
        lessons: [
            {
                topic: "Coordinate Plane",
                outcomes: [
                    "Plot points in all four quadrants",
                    "Identify coordinates accurately",
                    "Apply coordinate geometry concepts"
                ]
            },
            {
                topic: "Linear Relationships",
                outcomes: [
                    "Create tables of values for linear relationships",
                    "Graph straight lines from equations",
                    "Identify linear patterns"
                ]
            },
            {
                topic: "Gradient (Introduction)",
                outcomes: [
                    "Calculate gradient as rate of change",
                    "Understand real-life meaning of gradient",
                    "Apply gradient in context"
                ]
            },
            {
                topic: "Interpreting Graphs",
                outcomes: [
                    "Identify trends and relationships in graphs",
                    "Interpret real-world graphs",
                    "Draw conclusions from graphical data"
                ]
            },
            {
                topic: "Data Representation",
                outcomes: [
                    "Create histograms and line graphs",
                    "Choose appropriate data displays",
                    "Interpret various data representations"
                ]
            },
            {
                topic: "Statistics",
                outcomes: [
                    "Calculate mean, median, mode, and range",
                    "Interpret measures of center and spread",
                    "Apply statistics to real data sets"
                ]
            },
            {
                topic: "Probability",
                outcomes: [
                    "Calculate theoretical probability",
                    "Conduct simple probability experiments",
                    "Compare theoretical and experimental results"
                ]
            },
            {
                topic: "Full Year Revision",
                outcomes: ["Review algebra, geometry, proportional reasoning, graphs & data"]
            },
            {
                topic: "Yearly Exam Preparation",
                outcomes: ["Full exam simulation", "Time management strategies"]
            },
            {
                topic: "Yearly Exam",
                outcomes: ["Comprehensive Stage 4 assessment", "Strong reasoning emphasis"]
            }
        ]
    }
};

const KEY_METHOD_BENEFITS = [
    {
        icon: BookOpen,
        title: "Advanced Algebraic Fluency",
        description: "Master symbolic manipulation, equation solving, and algebraic reasoning — essential skills for Year 9 and senior mathematics.",
    },
    {
        icon: Users,
        title: "Geometric Reasoning",
        description: "Develop spatial thinking through angle relationships, Pythagoras' theorem, and multi-step geometric problem solving.",
    },
    {
        icon: Zap,
        title: "Linear Relationships",
        description: "Introduction to graphing and gradient builds foundation for functions and coordinate geometry in senior years.",
    },
    {
        icon: TrendingUp,
        title: "Year 9 Readiness",
        description: "Strategic preparation for advanced Stage 4/5 mathematics with focus on reasoning, justification, and exam technique.",
    },
];

const APPROACH_FEATURES = [
    {
        icon: Calculator,
        title: "Algebraic thinking",
        description: "Build confidence with symbolic manipulation and equation solving through scaffolded practice.",
    },
    {
        icon: Brain,
        title: "Logical reasoning",
        description: "Develop mathematical proof and justification skills through geometric and algebraic problems.",
    },
    {
        icon: Target,
        title: "Stage 4 mastery",
        description: "Complete coverage of NSW Mathematics K–10 Stage 4 outcomes for Year 8.",
    },
    {
        icon: CheckCircle,
        title: "Exam excellence",
        description: "Regular assessments and exam practice build confidence and exam technique.",
    },
];

/* =========================
   Page Component
========================= */

export default function Year8MathsPage() {
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
                            <li className="text-[#5E5574]">Year 8 Mathematics</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Syllabus Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 8 Mathematics
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        Advanced Stage 4 mathematics — mastering{" "}
                        <span className="text-[#5E5574] font-medium">algebraic manipulation</span>,{" "}
                        <span className="text-[#5E5574] font-medium">geometric reasoning</span>, and{" "}
                        <span className="text-[#5E5574] font-medium">linear relationships</span>.
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
                            Each term builds advanced Stage 4 skills in algebra, geometry, and data analysis.
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
            <TextbookPreview />

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
                            Designed for Year 9 readiness
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
                            for Stage 4, covering all outcomes for Year 8 students. Content is
                            sequenced to build advanced algebraic and geometric skills for Year 9 and beyond.
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
