"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TextbookPreviewEnglish from "../../../../components/TextbookPreviewEnglish";
import { Brain, Target, TrendingUp, Users, BookOpen, Zap, CheckCircle, Clock, Feather, MessageCircle, Book, Award } from "lucide-react";

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
        title: "Novel Study & Advanced Analytical Writing",
        subtitle: "Authorial intent, theme, structure, essay mastery",
        lessons: [
            {
                topic: "Context, Themes, and Authorial Purpose",
                outcomes: [
                    "Analyse historical and social context deeply",
                    "Identify complex themes and ideas",
                    "Examine authorial intent and purpose"
                ]
            },
            {
                topic: "Character Analysis and Relationships",
                outcomes: [
                    "Analyse sophisticated character development",
                    "Examine complex relationships and dynamics",
                    "Use precise, embedded textual evidence"
                ]
            },
            {
                topic: "Narrative Structure and Perspective",
                outcomes: [
                    "Analyse complex narrative structures",
                    "Examine how structure creates meaning",
                    "Evaluate authorial choices and effects"
                ]
            },
            {
                topic: "Analytical Paragraph Mastery (Advanced TEEL/PEEL)",
                outcomes: [
                    "Master sophisticated analytical paragraphs",
                    "Develop depth and insight in analysis",
                    "Create cohesive, logical arguments"
                ]
            },
            {
                topic: "Embedding and Analysing Quotations",
                outcomes: [
                    "Embed quotations fluently and precisely",
                    "Select highly relevant textual evidence",
                    "Analyse significance with sophistication"
                ]
            },
            {
                topic: "Developing Sophisticated Arguments",
                outcomes: [
                    "Develop complex thesis statements",
                    "Create sustained, logical arguments",
                    "Synthesise ideas across the text"
                ]
            },
            {
                topic: "Essay Planning and Drafting",
                outcomes: [
                    "Plan extended analytical essays",
                    "Structure sophisticated arguments",
                    "Develop coherent, insightful progression"
                ]
            },
            {
                topic: "Editing for Precision and Cohesion",
                outcomes: [
                    "Revise for precision and clarity",
                    "Refine analytical language and tone",
                    "Polish formal academic register"
                ]
            },
            {
                topic: "Analytical Essay Assessment",
                outcomes: ["Write extended analytical essay", "Apply sophisticated analysis", "Demonstrate critical insight"]
            },
            {
                topic: "Reflection and Feedback",
                outcomes: ["Reflect on analytical writing mastery", "Respond to detailed feedback", "Set Year 11 goals"]
            }
        ]
    },
    "Term 2": {
        title: "Persuasion, Argument & Critical Literacy",
        subtitle: "Argument, ideology, representation, voice",
        lessons: [
            {
                topic: "Argument, Ideology, and Audience",
                outcomes: [
                    "Understand complex ideological positioning",
                    "Analyse sophisticated audience manipulation",
                    "Evaluate assumptions and values"
                ]
            },
            {
                topic: "Analysing Bias and Representation",
                outcomes: [
                    "Identify subtle bias and representation",
                    "Examine ideology and power structures",
                    "Evaluate credibility and authority"
                ]
            },
            {
                topic: "Rhetorical and Persuasive Techniques",
                outcomes: [
                    "Analyse sophisticated rhetorical devices",
                    "Examine logical reasoning and fallacies",
                    "Identify advanced persuasive strategies"
                ]
            },
            {
                topic: "Structuring Sustained Arguments",
                outcomes: [
                    "Develop clear, sustained contention",
                    "Sequence complex arguments logically",
                    "Create evidence-based reasoning"
                ]
            },
            {
                topic: "Counterarguments and Rebuttal",
                outcomes: [
                    "Address counterarguments effectively",
                    "Develop sophisticated rebuttals",
                    "Strengthen argument through opposition"
                ]
            },
            {
                topic: "Language for Authority and Stance",
                outcomes: [
                    "Use modality and evaluative language",
                    "Apply nominalisation for formality",
                    "Employ advanced cohesive devices"
                ]
            },
            {
                topic: "Speech Writing Techniques",
                outcomes: [
                    "Write sophisticated persuasive speeches",
                    "Structure oral arguments effectively",
                    "Use rhetorical devices for impact"
                ]
            },
            {
                topic: "Speech Delivery and Engagement",
                outcomes: [
                    "Deliver speeches with authority",
                    "Use advanced vocal and non-verbal techniques",
                    "Engage and persuade sophisticated audiences"
                ]
            },
            {
                topic: "Argumentative Writing Assessment",
                outcomes: ["Write argumentative essay", "Apply sustained logical reasoning", "Demonstrate persuasive mastery"]
            },
            {
                topic: "Persuasive Speech",
                outcomes: ["Deliver formal persuasive speech", "Respond to critical opposition", "Demonstrate oral authority"]
            }
        ]
    },
    "Term 3": {
        title: "Poetry, Short Texts & Comparative Analysis",
        subtitle: "Interpretation, comparison, language for effect",
        lessons: [
            {
                topic: "Literary Techniques and Metalanguage",
                outcomes: [
                    "Study complex poetry and literary texts",
                    "Apply sophisticated metalanguage",
                    "Understand advanced literary devices"
                ]
            },
            {
                topic: "Analysing Imagery and Symbolism",
                outcomes: [
                    "Interpret complex imagery and symbolism",
                    "Analyse metaphor and extended metaphor",
                    "Examine connotation and nuance"
                ]
            },
            {
                topic: "Tone, Mood, and Voice",
                outcomes: [
                    "Identify and analyse complex tone",
                    "Examine mood and atmosphere creation",
                    "Understand authorial voice"
                ]
            },
            {
                topic: "Comparative Frameworks",
                outcomes: [
                    "Compare texts systematically",
                    "Analyse similarities and differences",
                    "Synthesise comparative insights"
                ]
            },
            {
                topic: "Creative Transformation Techniques",
                outcomes: [
                    "Re-write and re-imagine texts",
                    "Transform perspective, form, or context",
                    "Reflect on creative and analytical choices"
                ]
            },
            {
                topic: "Drafting Creative Responses",
                outcomes: [
                    "Compose sophisticated creative transformations",
                    "Apply literary techniques deliberately",
                    "Develop distinctive creative voice"
                ]
            },
            {
                topic: "Editing and Refinement",
                outcomes: [
                    "Revise creative work for sophistication",
                    "Refine language and structural choices",
                    "Polish final creative pieces"
                ]
            },
            {
                topic: "Unseen Comparative Analysis",
                outcomes: [
                    "Analyse unfamiliar texts comparatively",
                    "Identify techniques under exam conditions",
                    "Respond with sophisticated insight"
                ]
            },
            {
                topic: "Comparative Assessment",
                outcomes: ["Write comparative analytical response", "Apply sophisticated comparison", "Demonstrate literary insight"]
            },
            {
                topic: "Reflection and Discussion",
                outcomes: ["Perform and discuss creative work", "Explain analytical and creative choices", "Provide sophisticated feedback"]
            }
        ]
    },
    "Term 4": {
        title: "Film Study, Multimodal Texts & Exam Preparation",
        subtitle: "Visual literacy, synthesis, senior readiness",
        lessons: [
            {
                topic: "Introduction to Film as Text",
                outcomes: [
                    "Understand film as sophisticated text",
                    "Identify complex cinematic techniques",
                    "Analyse context, audience, and purpose"
                ]
            },
            {
                topic: "Cinematic Techniques and Meaning",
                outcomes: [
                    "Analyse camera, lighting, sound, and editing",
                    "Examine mise-en-scène and symbolism",
                    "Understand how techniques create meaning"
                ]
            },
            {
                topic: "Representation and Ideology in Film",
                outcomes: [
                    "Analyse representation and stereotypes",
                    "Examine ideology and values in film",
                    "Evaluate media messages critically"
                ]
            },
            {
                topic: "Planning Analytical Responses",
                outcomes: [
                    "Plan sophisticated film analyses",
                    "Structure multimodal responses",
                    "Integrate visual and written elements"
                ]
            },
            {
                topic: "Writing Film Analysis",
                outcomes: [
                    "Write sophisticated film analyses",
                    "Synthesise ideas across multiple texts",
                    "Support judgments with precise evidence"
                ]
            },
            {
                topic: "Editing and Refinement",
                outcomes: [
                    "Revise extended responses for sophistication",
                    "Check cohesion and accuracy",
                    "Polish multimodal presentations"
                ]
            },
            {
                topic: "Presentation Skills",
                outcomes: [
                    "Deliver sophisticated multimodal presentations",
                    "Integrate visual and oral elements effectively",
                    "Engage audience professionally"
                ]
            },
            {
                topic: "Full-Year Revision",
                outcomes: [
                    "Review all Stage 5 skills comprehensively",
                    "Consolidate analytical, persuasive, and creative writing",
                    "Practice exam-style responses"
                ]
            },
            {
                topic: "Yearly Examination",
                outcomes: ["Demonstrate comprehensive Stage 5 mastery", "Apply skills across text types", "Show sophisticated insight"]
            },
            {
                topic: "Reflection and Transition to Year 11",
                outcomes: ["Reflect on Year 10 achievements", "Identify pathway readiness", "Prepare for senior English"]
            }
        ]
    }
};

const KEY_METHOD_BENEFITS = [
    {
        icon: BookOpen,
        title: "Advanced Critical Analysis",
        description: "Develop sophisticated analytical skills through close reading of challenging texts with precise evidence and advanced metalanguage.",
    },
    {
        icon: Feather,
        title: "Extended Essay Mastery",
        description: "Master extended analytical and argumentative essay writing with sophisticated thesis development and sustained reasoning.",
    },
    {
        icon: MessageCircle,
        title: "Authoritative Communication",
        description: "Build confidence in seminar-style discussions, formal debates, and sophisticated presentations with critical reasoning.",
    },
    {
        icon: Award,
        title: "Year 11 Pathway Preparation",
        description: "Comprehensive preparation for senior English pathways including Standard, Advanced, and Extension with strong foundations.",
    },
];

const APPROACH_FEATURES = [
    {
        icon: Book,
        title: "Sophisticated analysis",
        description: "Develop advanced textual analysis with focus on authorial intent, ideology, and comparative study.",
    },
    {
        icon: Brain,
        title: "Critical mastery",
        description: "Build sophisticated critical thinking through analysis of complex texts, ideology, and representation.",
    },
    {
        icon: Target,
        title: "Stage 5 completion",
        description: "Complete coverage of NSW English K–10 Stage 5 outcomes for Year 10 students.",
    },
    {
        icon: CheckCircle,
        title: "Senior readiness",
        description: "Structured preparation for Year 11 English pathways with formal essay writing and exam mastery.",
    },
];

/* =========================
   Page Component
========================= */

export default function Year10EnglishPage() {
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
                            <li className="text-[#5E5574]">Year 10 English</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Stage 5 Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 10 English
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        Completing Stage 5 — mastering{" "}
                        <span className="text-[#5E5574] font-medium">extended analysis</span>,{" "}
                        <span className="text-[#5E5574] font-medium">sophisticated argument</span>, and{" "}
                        <span className="text-[#5E5574] font-medium">senior English readiness</span>.
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
                            Each term focuses on different text types and analytical skills, completing Stage 5 and preparing for Year 11 pathways.
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
                            Designed for Year 11 readiness
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
                            for Stage 5, covering all outcomes for Year 10 students. Content is
                            sequenced to complete Stage 5 and prepare for Year 11 English pathways including Standard, Advanced, and Extension.
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
