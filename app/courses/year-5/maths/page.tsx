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
        title: "Number & Place Value Foundations",
        subtitle: "Whole numbers, decimals, mental computation, problem solving",
        lessons: [
            {
                topic: "Place Value to Millions",
                outcomes: [
                    "Read, write, compare, and order large numbers",
                    "Use expanded notation to represent numbers",
                    "Apply place value understanding to solve problems"
                ]
            },
            {
                topic: "Rounding & Estimation",
                outcomes: [
                    "Round numbers to nearest 10, 100, 1 000, 10 000",
                    "Use estimation to check reasonableness of answers",
                    "Apply rounding strategies in real-world contexts"
                ]
            },
            {
                topic: "Addition Strategies",
                outcomes: [
                    "Use mental strategies for addition",
                    "Apply written algorithms efficiently",
                    "Solve multi-step addition problems"
                ]
            },
            {
                topic: "Subtraction Strategies",
                outcomes: [
                    "Use decomposition method for subtraction",
                    "Check answers using inverse operations",
                    "Apply subtraction in problem-solving contexts"
                ]
            },
            {
                topic: "Multiplication Basics",
                outcomes: [
                    "Multiply by 1- and 2-digit numbers",
                    "Use mental and written methods",
                    "Apply multiplication facts and strategies"
                ]
            },
            {
                topic: "Division Basics",
                outcomes: [
                    "Understand and interpret remainders",
                    "Use division facts and strategies",
                    "Solve division word problems"
                ]
            },
            {
                topic: "Introduction to Decimals",
                outcomes: [
                    "Understand tenths and hundredths",
                    "Connect decimals to fractions",
                    "Use place value with decimal numbers"
                ]
            },
            {
                topic: "Word Problems (Mixed Operations)",
                outcomes: [
                    "Solve multi-step reasoning problems",
                    "Use bar models and number lines",
                    "Apply all four operations in context"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Mixed exam-style questions", "Time-management strategies", "Common error analysis"]
            },
            {
                topic: "Term 1 Exam",
                outcomes: ["Assessment of number & operations", "Reasoning + problem solving"]
            }
        ]
    },
    "Term 2": {
        title: "Fractions, Decimals & Measurement",
        subtitle: "Fraction understanding, real-world measurement",
        lessons: [
            {
                topic: "Equivalent Fractions",
                outcomes: [
                    "Use visual models to understand equivalence",
                    "Simplify fractions to lowest terms",
                    "Generate equivalent fractions"
                ]
            },
            {
                topic: "Comparing & Ordering Fractions",
                outcomes: [
                    "Use number lines to compare fractions",
                    "Apply benchmarks (½, ¼, 1)",
                    "Order fractions from smallest to largest"
                ]
            },
            {
                topic: "Adding & Subtracting Fractions",
                outcomes: [
                    "Add and subtract fractions with same denominators",
                    "Work with mixed numbers",
                    "Solve fraction word problems"
                ]
            },
            {
                topic: "Decimals & Fractions Connection",
                outcomes: [
                    "Understand tenths and hundredths",
                    "Convert between fractions and decimals",
                    "Compare and order decimals"
                ]
            },
            {
                topic: "Metric Length",
                outcomes: [
                    "Measure using mm, cm, m, km",
                    "Convert between metric units",
                    "Complete real-world measurement tasks"
                ]
            },
            {
                topic: "Metric Mass",
                outcomes: [
                    "Measure using g and kg",
                    "Estimate and compare masses",
                    "Solve mass word problems"
                ]
            },
            {
                topic: "Metric Capacity",
                outcomes: [
                    "Measure using mL and L",
                    "Convert between capacity units",
                    "Apply capacity in word problems"
                ]
            },
            {
                topic: "Measurement Problem Solving",
                outcomes: [
                    "Apply measurement in multi-step problems",
                    "Choose appropriate units and tools",
                    "Estimate and check reasonableness"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Measurement word problems", "Fraction reasoning questions"]
            },
            {
                topic: "Term 2 Exam",
                outcomes: ["Assessment of fractions, decimals & measurement"]
            }
        ]
    },
    "Term 3": {
        title: "Geometry, Area & Volume",
        subtitle: "Shapes, space, spatial reasoning",
        lessons: [
            {
                topic: "Properties of 2D Shapes",
                outcomes: [
                    "Classify triangles and quadrilaterals",
                    "Identify properties of polygons",
                    "Understand symmetry and tessellation"
                ]
            },
            {
                topic: "Angles",
                outcomes: [
                    "Identify acute, obtuse, right, and straight angles",
                    "Estimate angle sizes",
                    "Measure angles using a protractor"
                ]
            },
            {
                topic: "Classifying Triangles & Quadrilaterals",
                outcomes: [
                    "Classify by side properties",
                    "Classify by angle properties",
                    "Understand relationships between shapes"
                ]
            },
            {
                topic: "Area of Rectangles",
                outcomes: [
                    "Understand the area formula",
                    "Use grid models to find area",
                    "Apply area in real-world contexts"
                ]
            },
            {
                topic: "Area of Composite Shapes",
                outcomes: [
                    "Use decomposition strategies",
                    "Break complex shapes into rectangles",
                    "Calculate total area"
                ]
            },
            {
                topic: "Volume of Rectangular Prisms",
                outcomes: [
                    "Use unit cubes to understand volume",
                    "Apply the volume formula",
                    "Solve volume word problems"
                ]
            },
            {
                topic: "3D Objects",
                outcomes: [
                    "Identify nets of 3D objects",
                    "Count faces, edges, and vertices",
                    "Construct 3D models"
                ]
            },
            {
                topic: "Geometric Problem Solving",
                outcomes: [
                    "Apply geometric concepts in multi-step tasks",
                    "Use spatial reasoning",
                    "Solve real-world geometry problems"
                ]
            },
            {
                topic: "Exam Preparation",
                outcomes: ["Geometry diagrams", "Area & volume word problems"]
            },
            {
                topic: "Term 3 Exam",
                outcomes: ["Assessment of geometry, area & volume"]
            }
        ]
    },
    "Term 4": {
        title: "Data, Chance & Consolidation",
        subtitle: "Data interpretation, probability, full-year revision",
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
                topic: "Interpreting Graphs",
                outcomes: [
                    "Identify trends in data",
                    "Make comparisons using graphs",
                    "Draw conclusions from data"
                ]
            },
            {
                topic: "Mean, Mode & Range",
                outcomes: [
                    "Calculate the mean (average)",
                    "Identify mode and range",
                    "Use averages to interpret data"
                ]
            },
            {
                topic: "Probability Language",
                outcomes: [
                    "Use terms: certain, likely, unlikely, impossible",
                    "Order events by likelihood",
                    "Describe probability in everyday contexts"
                ]
            },
            {
                topic: "Simple Probability Experiments",
                outcomes: [
                    "Express probability as fractions",
                    "Conduct simple probability experiments",
                    "Record and analyze outcomes"
                ]
            },
            {
                topic: "Problem Solving with Data",
                outcomes: [
                    "Apply data skills in multi-step reasoning",
                    "Interpret complex data sets",
                    "Make predictions based on data"
                ]
            },
            {
                topic: "Real-World Maths Investigations",
                outcomes: [
                    "Apply cross-strand mathematical concepts",
                    "Solve authentic problems",
                    "Present mathematical findings"
                ]
            },
            {
                topic: "Full Year Revision",
                outcomes: ["Review number, measurement, geometry, data"]
            },
            {
                topic: "Yearly Exam Preparation",
                outcomes: ["Full exam simulation", "Strategy & confidence building"]
            },
            {
                topic: "Yearly Exam",
                outcomes: ["Comprehensive Stage 3 assessment"]
            }
        ]
    }
};

const KEY_METHOD_BENEFITS = [
    {
        icon: BookOpen,
        title: "Conceptual Understanding",
        description: "Mathematics is taught for deep understanding, not just memorization. Students learn the 'why' behind every method and strategy.",
    },
    {
        icon: Users,
        title: "Problem-Solving Focus",
        description: "Every lesson includes multi-step reasoning tasks that develop critical thinking and mathematical resilience.",
    },
    {
        icon: Zap,
        title: "Real-World Connections",
        description: "Concepts are linked to everyday situations, making maths relevant and engaging for young learners.",
    },
    {
        icon: TrendingUp,
        title: "Progressive Mastery",
        description: "Skills build systematically across terms, creating a strong foundation for Year 6 and beyond.",
    },
];

const APPROACH_FEATURES = [
    {
        icon: Calculator,
        title: "Visual models",
        description: "Bar models, number lines, and diagrams make abstract concepts concrete and accessible.",
    },
    {
        icon: Brain,
        title: "Mental strategies",
        description: "Develop number sense and computational fluency through efficient mental methods.",
    },
    {
        icon: Target,
        title: "Syllabus aligned",
        description: "Full coverage of NSW Mathematics K–10 Stage 3 outcomes with strategic sequencing.",
    },
    {
        icon: CheckCircle,
        title: "Regular assessment",
        description: "Topic tests and term exams ensure mastery before progressing to new content.",
    },
];

const STUDENT_OUTCOMES = [
    {
        metric: "92%",
        label: "Students gain confidence",
        description: "After one term of tutoring",
    },
    {
        metric: "3x",
        label: "Improved problem-solving",
        description: "In multi-step reasoning tasks",
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

export default function Year5MathsPage() {
    const [activeTerm, setActiveTerm] = useState<TermKey>("Term 1");
    const active = TERMS[activeTerm];
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Stick the line when scrolled past the hero section (approximately 500px)
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
                            <li className="text-[#5E5574]">Year 5 Mathematics</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Syllabus Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 5 Mathematics
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        A comprehensive journey through the NSW Mathematics syllabus — building{" "}
                        <span className="text-[#5E5574] font-medium">number sense</span>,{" "}
                        <span className="text-[#5E5574] font-medium">problem-solving skills</span>, and{" "}
                        <span className="text-[#5E5574] font-medium">mathematical confidence</span>.
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
                            Each term focuses on a different strand of mathematics, building skills and knowledge progressively.
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
                            Designed for deep understanding
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
                            for Stage 3, covering all outcomes for Year 5 students. Content is
                            sequenced to build mathematical skills and conceptual understanding progressively.
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
