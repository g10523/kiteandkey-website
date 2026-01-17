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
        title: "Advanced Number & Operations",
        subtitle: "Fluency, efficiency, large numbers, multi-step reasoning",
        lessons: [
            {
                topic: "Whole Numbers to Billions",
                outcomes: [
                    "Read, write, and order numbers to billions",
                    "Use expanded and scientific-style notation",
                    "Apply place value understanding to large numbers"
                ]
            },
            {
                topic: "Advanced Rounding & Estimation",
                outcomes: [
                    "Round to any place value",
                    "Estimate answers for reasonableness",
                    "Apply estimation strategies in problem solving"
                ]
            },
            {
                topic: "Addition & Subtraction (Advanced)",
                outcomes: [
                    "Add and subtract large numbers efficiently",
                    "Solve multi-step word problems",
                    "Apply strategies to real-world contexts"
                ]
            },
            {
                topic: "Multiplication (2–3 Digit)",
                outcomes: [
                    "Use efficient written strategies for multiplication",
                    "Apply mental shortcuts and patterns",
                    "Solve complex multiplication problems"
                ]
            },
            {
                topic: "Division (Including Remainders)",
                outcomes: [
                    "Use long division method",
                    "Interpret remainders in context",
                    "Apply division to solve problems"
                ]
            },
            {
                topic: "Order of Operations",
                outcomes: [
                    "Apply order of operations with brackets",
                    "Solve problems with multiple operations",
                    "Understand and use BODMAS/BIDMAS"
                ]
            },
            {
                topic: "Problem Solving with Operations",
                outcomes: [
                    "Use bar models for complex problems",
                    "Apply logical reasoning strategies",
                    "Justify solution methods"
                ]
            },
            {
                topic: "Mixed Number Investigations",
                outcomes: [
                    "Apply operations in real-world applications",
                    "Justify and explain strategies",
                    "Solve multi-step investigations"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Timed practice", "High-difficulty word problems", "Strategy refinement"]
            },
            {
                topic: "Term 1 Exam",
                outcomes: ["Assessment of number & operations", "Reasoning-heavy questions"]
            }
        ]
    },
    "Term 2": {
        title: "Fractions, Decimals & Percentages",
        subtitle: "Precision, conversions, exam-style fraction reasoning",
        lessons: [
            {
                topic: "Equivalent & Simplified Fractions",
                outcomes: [
                    "Use highest common factor to simplify",
                    "Create equivalent fractions",
                    "Connect visual and abstract representations"
                ]
            },
            {
                topic: "Comparing & Ordering Fractions",
                outcomes: [
                    "Compare fractions with different denominators",
                    "Use number line reasoning",
                    "Order fractions from smallest to largest"
                ]
            },
            {
                topic: "Adding & Subtracting Fractions",
                outcomes: [
                    "Add and subtract fractions with unlike denominators",
                    "Work with mixed numbers",
                    "Solve fraction word problems"
                ]
            },
            {
                topic: "Multiplying Fractions",
                outcomes: [
                    "Multiply fractions by whole numbers",
                    "Apply multiplication in real-world contexts",
                    "Understand fraction of a quantity"
                ]
            },
            {
                topic: "Decimals to Thousandths",
                outcomes: [
                    "Understand place value to thousandths",
                    "Round decimals to specified places",
                    "Compare and order decimals"
                ]
            },
            {
                topic: "Fraction–Decimal Conversions",
                outcomes: [
                    "Convert between fractions and decimals",
                    "Work with tenths, hundredths, thousandths",
                    "Apply conversions in problem solving"
                ]
            },
            {
                topic: "Percentages",
                outcomes: [
                    "Calculate percentage of a quantity",
                    "Connect percentages to fractions and decimals",
                    "Solve percentage problems"
                ]
            },
            {
                topic: "Multi-Step Fraction Problems",
                outcomes: [
                    "Solve exam-style reasoning problems",
                    "Provide logical explanations",
                    "Apply multiple fraction concepts"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Fraction & percentage problem sets", "Common traps & misconceptions"]
            },
            {
                topic: "Term 2 Exam",
                outcomes: ["Assessment of fractions, decimals & percentages"]
            }
        ]
    },
    "Term 3": {
        title: "Measurement, Geometry & Algebra",
        subtitle: "Spatial reasoning, formulas, algebraic thinking",
        lessons: [
            {
                topic: "Metric Conversions",
                outcomes: [
                    "Convert between units of length, mass, capacity",
                    "Solve multi-step conversion problems",
                    "Apply conversions in real contexts"
                ]
            },
            {
                topic: "Perimeter & Area",
                outcomes: [
                    "Calculate perimeter and area of rectangles and triangles",
                    "Find area of composite shapes",
                    "Apply formulas to solve problems"
                ]
            },
            {
                topic: "Volume",
                outcomes: [
                    "Calculate volume of rectangular prisms",
                    "Apply volume formula",
                    "Solve volume word problems"
                ]
            },
            {
                topic: "Angles",
                outcomes: [
                    "Understand angle relationships",
                    "Estimate and calculate angles",
                    "Apply angle properties to solve problems"
                ]
            },
            {
                topic: "2D & 3D Geometry",
                outcomes: [
                    "Identify properties of 2D and 3D shapes",
                    "Construct and interpret nets",
                    "Understand cross-sections"
                ]
            },
            {
                topic: "Coordinate Plane",
                outcomes: [
                    "Plot points in all four quadrants",
                    "Interpret coordinates",
                    "Solve coordinate geometry problems"
                ]
            },
            {
                topic: "Introduction to Algebra",
                outcomes: [
                    "Simplify simple algebraic expressions",
                    "Find unknown values in equations",
                    "Use pronumerals to represent unknowns"
                ]
            },
            {
                topic: "Geometry & Algebra Problem Solving",
                outcomes: [
                    "Solve multi-concept problems",
                    "Apply geometric and algebraic thinking",
                    "Justify solutions mathematically"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Diagram interpretation", "Algebraic reasoning questions"]
            },
            {
                topic: "Term 3 Exam",
                outcomes: ["Assessment of measurement, geometry & algebra"]
            }
        ]
    },
    "Term 4": {
        title: "Data, Probability & High School Readiness",
        subtitle: "Interpretation, reasoning, full consolidation",
        lessons: [
            {
                topic: "Data Collection & Representation",
                outcomes: [
                    "Collect and organize data in tables",
                    "Create column graphs and line graphs",
                    "Choose appropriate data displays"
                ]
            },
            {
                topic: "Interpreting Data",
                outcomes: [
                    "Identify trends in data",
                    "Recognize outliers",
                    "Draw conclusions from data displays"
                ]
            },
            {
                topic: "Mean, Median, Mode & Range",
                outcomes: [
                    "Calculate mean, median, mode, and range",
                    "Interpret measures of center and spread",
                    "Apply to real-world data sets"
                ]
            },
            {
                topic: "Probability",
                outcomes: [
                    "Describe likelihood of events",
                    "Express probability as fractions",
                    "Order events by probability"
                ]
            },
            {
                topic: "Chance Experiments",
                outcomes: [
                    "Distinguish theoretical vs experimental probability",
                    "Conduct probability experiments",
                    "Compare predicted and actual outcomes"
                ]
            },
            {
                topic: "Problem Solving with Data",
                outcomes: [
                    "Solve multi-step data problems",
                    "Apply statistical reasoning",
                    "Interpret complex data scenarios"
                ]
            },
            {
                topic: "High School Transition Maths",
                outcomes: [
                    "Solve mixed problems across all strands",
                    "Tackle Year 7 exposure questions",
                    "Build confidence for high school mathematics"
                ]
            },
            {
                topic: "Full Year Revision",
                outcomes: ["Review number, fractions, geometry, data"]
            },
            {
                topic: "Yearly Exam Preparation",
                outcomes: ["Full exam simulation", "Time management & accuracy"]
            },
            {
                topic: "Yearly Exam",
                outcomes: ["Comprehensive Stage 3 assessment", "High-difficulty reasoning"]
            }
        ]
    }
};

const KEY_METHOD_BENEFITS = [
    {
        icon: BookOpen,
        title: "Deep Conceptual Understanding",
        description: "Mathematics is taught for mastery, not memorization. Students understand the reasoning behind every method and can apply concepts flexibly.",
    },
    {
        icon: Users,
        title: "Advanced Problem-Solving",
        description: "Every lesson includes high-difficulty reasoning tasks that develop the critical thinking skills needed for selective schools and high school success.",
    },
    {
        icon: Zap,
        title: "Exam-Ready Skills",
        description: "Strategic preparation for NAPLAN, selective school exams, and high school entry, with explicit focus on time management and accuracy.",
    },
    {
        icon: TrendingUp,
        title: "High School Preparation",
        description: "Seamless transition to Year 7 mathematics through exposure to algebraic thinking and advanced problem-solving techniques.",
    },
];

const APPROACH_FEATURES = [
    {
        icon: Calculator,
        title: "Efficient strategies",
        description: "Master mental and written methods that prioritize speed and accuracy for exam success.",
    },
    {
        icon: Brain,
        title: "Logical reasoning",
        description: "Develop mathematical thinking through multi-step problems and written explanations.",
    },
    {
        icon: Target,
        title: "Syllabus mastery",
        description: "Complete coverage of NSW Mathematics K–10 Stage 3 outcomes with exam-focused sequencing.",
    },
    {
        icon: CheckCircle,
        title: "Regular testing",
        description: "Frequent assessments and exam simulations build confidence and identify areas for improvement.",
    },
];

/* =========================
   Page Component
========================= */

export default function Year6MathsPage() {
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
                            <li className="text-[#5E5574]">Year 6 Mathematics</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Syllabus Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 6 Mathematics
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        Advanced mathematics for high school success — building{" "}
                        <span className="text-[#5E5574] font-medium">algebraic thinking</span>,{" "}
                        <span className="text-[#5E5574] font-medium">advanced problem-solving</span>, and{" "}
                        <span className="text-[#5E5574] font-medium">exam-ready skills</span>.
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
                            Each term focuses on a different strand of mathematics, building advanced skills and high school readiness.
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
                            Designed for high school success
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
                            for Stage 3, covering all advanced outcomes for Year 6 students preparing for high school. Content is
                            sequenced to build exam-ready skills and ensure smooth transition to Year 7.
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
