"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TextbookPreviewEnglish from "../../../../components/TextbookPreviewEnglish";
import { Brain, Target, TrendingUp, Users, BookOpen, Zap, CheckCircle, Clock, Feather, MessageCircle, Book } from "lucide-react";

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
        title: "Novel Study & Analytical Writing",
        subtitle: "Theme, character, authorial intent, essay writing",
        lessons: [
            {
                topic: "Context and Overview of the Novel",
                outcomes: [
                    "Understand historical and social context",
                    "Identify central themes and ideas",
                    "Analyse authorial purpose and intent"
                ]
            },
            {
                topic: "Character and Relationships",
                outcomes: [
                    "Analyse complex character development",
                    "Examine character relationships and dynamics",
                    "Use precise textual evidence"
                ]
            },
            {
                topic: "Themes and Ideas",
                outcomes: [
                    "Identify and analyse central themes",
                    "Explore how themes develop and interconnect",
                    "Connect themes to broader contexts"
                ]
            },
            {
                topic: "Narrative Voice and Structure",
                outcomes: [
                    "Analyse narrative perspective and structure",
                    "Understand how structure shapes meaning",
                    "Examine authorial choices and effects"
                ]
            },
            {
                topic: "Paragraph Structure (Advanced TEEL/PEEL)",
                outcomes: [
                    "Master sophisticated TEEL/PEEL structure",
                    "Develop depth in analytical paragraphs",
                    "Create cohesive arguments"
                ]
            },
            {
                topic: "Using Evidence and Quotations",
                outcomes: [
                    "Embed quotations fluently",
                    "Select precise textual evidence",
                    "Analyse significance of quotations"
                ]
            },
            {
                topic: "Essay Planning and Drafting",
                outcomes: [
                    "Plan formal analytical essays with thesis",
                    "Structure sophisticated arguments",
                    "Develop coherent, logical progression"
                ]
            },
            {
                topic: "Editing for Cohesion and Clarity",
                outcomes: [
                    "Revise for logical flow and cohesion",
                    "Refine analytical language",
                    "Polish formal register"
                ]
            },
            {
                topic: "Analytical Essay Assessment",
                outcomes: ["Write formal analytical essay", "Apply advanced TEEL/PEEL structure", "Demonstrate sophisticated analysis"]
            },
            {
                topic: "Reflection and Feedback",
                outcomes: ["Reflect on analytical writing development", "Respond to detailed feedback", "Set Stage 5 goals"]
            }
        ]
    },
    "Term 2": {
        title: "Persuasion, Argument & Critical Media",
        subtitle: "Argument, representation, bias, critical thinking",
        lessons: [
            {
                topic: "Persuasion, Purpose, and Audience",
                outcomes: [
                    "Understand complex audience positioning",
                    "Analyse persuasive intent and purpose",
                    "Evaluate audience manipulation"
                ]
            },
            {
                topic: "Analysing Bias and Representation",
                outcomes: [
                    "Identify bias and representation in media",
                    "Examine stereotypes and ideology",
                    "Evaluate credibility and reliability"
                ]
            },
            {
                topic: "Persuasive Techniques and Rhetoric",
                outcomes: [
                    "Analyse advanced rhetorical devices",
                    "Examine logical reasoning vs emotive appeal",
                    "Identify persuasive language features"
                ]
            },
            {
                topic: "Structuring Arguments and Counterarguments",
                outcomes: [
                    "Develop clear, sustained contention",
                    "Sequence arguments logically",
                    "Address counterarguments effectively"
                ]
            },
            {
                topic: "Language for Evaluation and Stance",
                outcomes: [
                    "Use modality and evaluative language",
                    "Apply formal register and tone",
                    "Employ nominalisation (introduction)"
                ]
            },
            {
                topic: "Editing for Precision and Impact",
                outcomes: [
                    "Revise for persuasive effect",
                    "Strengthen argument coherence",
                    "Refine language for authority"
                ]
            },
            {
                topic: "Speech Writing Techniques",
                outcomes: [
                    "Write persuasive speeches",
                    "Structure oral arguments",
                    "Use rhetorical devices for impact"
                ]
            },
            {
                topic: "Speech Delivery and Engagement",
                outcomes: [
                    "Deliver persuasive speeches confidently",
                    "Use vocal and non-verbal techniques",
                    "Engage and persuade audience"
                ]
            },
            {
                topic: "Persuasive Writing Assessment",
                outcomes: ["Write argumentative text", "Apply sustained logical argument", "Demonstrate persuasive mastery"]
            },
            {
                topic: "Oral Presentation",
                outcomes: ["Deliver formal persuasive speech", "Respond to critical viewpoints", "Demonstrate oral authority"]
            }
        ]
    },
    "Term 3": {
        title: "Poetry, Short Texts & Literary Analysis",
        subtitle: "Language for effect, interpretation, comparison",
        lessons: [
            {
                topic: "Literary Techniques Overview",
                outcomes: [
                    "Study poetry, short stories, and literary excerpts",
                    "Identify sophisticated literary techniques",
                    "Understand purpose of literary devices"
                ]
            },
            {
                topic: "Analysing Imagery and Symbolism",
                outcomes: [
                    "Interpret complex imagery",
                    "Analyse symbolism and metaphor",
                    "Examine connotation and nuance"
                ]
            },
            {
                topic: "Tone, Mood, and Atmosphere",
                outcomes: [
                    "Identify and analyse tone",
                    "Examine mood creation",
                    "Understand how language shapes atmosphere"
                ]
            },
            {
                topic: "Comparative Analysis Skills",
                outcomes: [
                    "Compare texts and ideas",
                    "Analyse similarities and differences",
                    "Synthesise comparative insights"
                ]
            },
            {
                topic: "Creative Transformation Techniques",
                outcomes: [
                    "Re-write and adapt texts creatively",
                    "Transform perspective or form",
                    "Reflect on creative choices"
                ]
            },
            {
                topic: "Drafting Creative Responses",
                outcomes: [
                    "Compose creative transformations",
                    "Apply literary techniques deliberately",
                    "Develop creative voice"
                ]
            },
            {
                topic: "Editing and Refining",
                outcomes: [
                    "Revise creative work for impact",
                    "Refine language and structure",
                    "Polish final creative pieces"
                ]
            },
            {
                topic: "Unseen Text Analysis",
                outcomes: [
                    "Analyse unfamiliar literary texts",
                    "Identify techniques under exam conditions",
                    "Respond with sophisticated analysis"
                ]
            },
            {
                topic: "Analytical Response Assessment",
                outcomes: ["Write analytical response using metalanguage", "Apply comparative analysis", "Demonstrate literary insight"]
            },
            {
                topic: "Reflection and Discussion",
                outcomes: ["Perform poetry or prose", "Discuss creative and analytical choices", "Provide peer feedback"]
            }
        ]
    },
    "Term 4": {
        title: "Film, Multimodal Texts & Yearly Consolidation",
        subtitle: "Visual literacy, synthesis, exam readiness",
        lessons: [
            {
                topic: "Introduction to Film and Visual Language",
                outcomes: [
                    "Understand film as complex text",
                    "Identify cinematic techniques",
                    "Analyse purpose, audience, and context"
                ]
            },
            {
                topic: "Analysing Visual Techniques",
                outcomes: [
                    "Examine camera angles, lighting, and sound",
                    "Analyse editing and mise-en-scène",
                    "Understand visual symbolism"
                ]
            },
            {
                topic: "Representation and Ideology",
                outcomes: [
                    "Analyse representation in film",
                    "Examine ideology and values",
                    "Evaluate media messages critically"
                ]
            },
            {
                topic: "Planning Multimodal Responses",
                outcomes: [
                    "Plan sophisticated multimodal texts",
                    "Integrate visual and written elements",
                    "Consider audience and purpose"
                ]
            },
            {
                topic: "Writing Film Analysis",
                outcomes: [
                    "Write analytical film reviews",
                    "Synthesise ideas across texts",
                    "Support judgments with evidence"
                ]
            },
            {
                topic: "Editing and Refinement",
                outcomes: [
                    "Revise extended responses",
                    "Check cohesion and accuracy",
                    "Polish multimodal presentations"
                ]
            },
            {
                topic: "Presentation Skills",
                outcomes: [
                    "Deliver formal multimodal presentations",
                    "Integrate visual and oral elements",
                    "Engage audience professionally"
                ]
            },
            {
                topic: "Full-Year Revision",
                outcomes: [
                    "Review analytical, persuasive, and creative writing",
                    "Consolidate Stage 5 skills",
                    "Practice exam-style responses"
                ]
            },
            {
                topic: "Yearly Assessment",
                outcomes: ["Demonstrate comprehensive Stage 5 learning", "Apply skills across text types", "Show sophisticated mastery"]
            },
            {
                topic: "Reflection and Transition to Year 10",
                outcomes: ["Reflect on Year 9 achievements", "Identify strengths and growth areas", "Prepare for Year 10 English"]
            }
        ]
    }
};

const KEY_METHOD_BENEFITS = [
    {
        icon: BookOpen,
        title: "Sophisticated Analysis",
        description: "Develop advanced analytical skills through close reading of complex texts with precise evidence and metalanguage.",
    },
    {
        icon: Feather,
        title: "Formal Essay Mastery",
        description: "Master formal analytical and argumentative essay writing with sophisticated thesis development and sustained arguments.",
    },
    {
        icon: MessageCircle,
        title: "Critical Discourse",
        description: "Build confidence in seminar-style discussions, debates, and formal presentations with evidence-based reasoning.",
    },
    {
        icon: TrendingUp,
        title: "Stage 5 Excellence",
        description: "Comprehensive preparation for Year 10 English with strong analytical, persuasive, and creative writing skills.",
    },
];

const APPROACH_FEATURES = [
    {
        icon: Book,
        title: "Advanced analysis",
        description: "Develop sophisticated textual analysis with focus on authorial intent, theme, and comparative study.",
    },
    {
        icon: Brain,
        title: "Critical literacy",
        description: "Build advanced critical thinking through analysis of ideology, representation, and persuasive techniques.",
    },
    {
        icon: Target,
        title: "Stage 5 depth",
        description: "Complete coverage of NSW English K–10 Stage 5 outcomes for Year 9 students.",
    },
    {
        icon: CheckCircle,
        title: "Senior preparation",
        description: "Structured preparation for Year 10 with formal essay writing and exam-style analytical responses.",
    },
];

/* =========================
   Page Component
========================= */

export default function Year9EnglishPage() {
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
                            <li className="text-[#5E5574]">Year 9 English</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Stage 5 Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 9 English
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        Advancing to Stage 5 — mastering{" "}
                        <span className="text-[#5E5574] font-medium">formal analysis</span>,{" "}
                        <span className="text-[#5E5574] font-medium">argumentative writing</span>, and{" "}
                        <span className="text-[#5E5574] font-medium">critical interpretation</span>.
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

            {/* Purple sticky line for English */}
            <div
                className={`h-1 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 ${isSticky ? 'fixed top-[72px] left-0 right-0 z-40' : 'relative'
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
                            Each term focuses on different text types and analytical skills, advancing Stage 5 foundations for Year 10.
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
            <TextbookPreviewEnglish />

            {/* ================= THE KEY METHOD IN ACTION ================= */}
            <section className="py-24 border-t border-[#E6E1F2] bg-white">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center mb-16">
                        <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
                            Our Approach
                        </p>
                        <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52]">
                            The KEY Method in English
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
                            Designed for Year 10 readiness
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
                            <strong className="text-[#3F3A52]">NSW English K–10 Syllabus</strong>{" "}
                            for Stage 5, covering all outcomes for Year 9 students. Content is
                            sequenced to advance Stage 5 skills and prepare for Year 10 English.
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
