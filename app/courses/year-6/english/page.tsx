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
        title: "Narrative, Theme & Deep Comprehension",
        subtitle: "Narrative craft, inference, author's purpose",
        lessons: [
            {
                topic: "Narrative Structure & Advanced Plot",
                outcomes: [
                    "Analyse themes, character motivation, and plot development",
                    "Identify author intent and narrative point of view",
                    "Infer meaning using evidence and quotations"
                ]
            },
            {
                topic: "Characterisation & Motivation",
                outcomes: [
                    "Develop character voice and depth",
                    "Show character motivation through action",
                    "Create complex, believable characters"
                ]
            },
            {
                topic: "Theme and Author Intent",
                outcomes: [
                    "Identify and analyse themes",
                    "Understand author's purpose",
                    "Support interpretations with evidence"
                ]
            },
            {
                topic: "Sentence Variety & Cohesion",
                outcomes: [
                    "Use complex sentences effectively",
                    "Understand main and subordinate clauses",
                    "Create paragraph cohesion"
                ]
            },
            {
                topic: "Dialogue for Tension and Voice",
                outcomes: [
                    "Use dialogue for impact",
                    "Punctuate dialogue correctly",
                    "Develop distinct character voices"
                ]
            },
            {
                topic: "Show vs Tell (Advanced)",
                outcomes: [
                    "Create vivid imagery through showing",
                    "Use varied sentence structure",
                    "Engage readers through descriptive technique"
                ]
            },
            {
                topic: "Editing for Impact",
                outcomes: [
                    "Revise for clarity and effect",
                    "Use punctuation for emphasis",
                    "Refine word choice"
                ]
            },
            {
                topic: "Deep Comprehension Strategies",
                outcomes: [
                    "Apply advanced comprehension strategies",
                    "Make sophisticated inferences",
                    "Support answers with textual evidence"
                ]
            },
            {
                topic: "Narrative Assessment",
                outcomes: ["Write an extended narrative", "Apply sophisticated techniques", "Demonstrate mastery"]
            },
            {
                topic: "Reflection & Feedback",
                outcomes: ["Reflect on learning", "Provide constructive feedback", "Set improvement goals"]
            }
        ]
    },
    "Term 2": {
        title: "Persuasive, Informative & Argument Writing",
        subtitle: "Logical argument, audience awareness",
        lessons: [
            {
                topic: "Purpose, Audience & Form",
                outcomes: [
                    "Analyse arguments, bias, and point of view",
                    "Identify persuasive techniques and logical fallacies",
                    "Compare persuasive texts on the same topic"
                ]
            },
            {
                topic: "Analysing Persuasive Language",
                outcomes: [
                    "Identify high and low modality",
                    "Recognize persuasive devices",
                    "Evaluate effectiveness of arguments"
                ]
            },
            {
                topic: "Structuring Strong Arguments",
                outcomes: [
                    "Write clear thesis statements",
                    "Develop logical body paragraphs",
                    "Create reinforced conclusions"
                ]
            },
            {
                topic: "Paragraph Cohesion & Topic Sentences",
                outcomes: [
                    "Write effective topic sentences",
                    "Use connectives for reasoning",
                    "Maintain paragraph unity"
                ]
            },
            {
                topic: "Modal Verbs & Persuasive Tone",
                outcomes: [
                    "Use modality effectively (high vs low)",
                    "Distinguish formal vs informal language",
                    "Apply appropriate tone for audience"
                ]
            },
            {
                topic: "Editing for Clarity and Logic",
                outcomes: [
                    "Revise for logical flow",
                    "Check argument coherence",
                    "Improve clarity and precision"
                ]
            },
            {
                topic: "Oral Persuasion Skills",
                outcomes: [
                    "Deliver persuasive speeches",
                    "Use tone, pace, and emphasis",
                    "Engage audience effectively"
                ]
            },
            {
                topic: "Comparative Text Analysis",
                outcomes: [
                    "Compare persuasive techniques across texts",
                    "Evaluate different perspectives",
                    "Synthesize information"
                ]
            },
            {
                topic: "Persuasive Writing Assessment",
                outcomes: ["Write a formal persuasive text", "Apply logical argument structure", "Demonstrate mastery"]
            },
            {
                topic: "Oral Presentation",
                outcomes: ["Deliver structured argument", "Use persuasive techniques orally", "Respond to questions"]
            }
        ]
    },
    "Term 3": {
        title: "Poetry, Figurative Language & Literary Analysis",
        subtitle: "Language for effect, analytical responses",
        lessons: [
            {
                topic: "Reading and Responding to Poetry",
                outcomes: [
                    "Analyse poems and short literary texts",
                    "Identify figurative language, tone, mood, imagery",
                    "Explain how language shapes meaning"
                ]
            },
            {
                topic: "Figurative Language in Depth",
                outcomes: [
                    "Use metaphor, simile, and symbolism",
                    "Apply expanded noun groups",
                    "Make precise verb choices"
                ]
            },
            {
                topic: "Analysing Imagery and Tone",
                outcomes: [
                    "Interpret imagery in poetry",
                    "Identify and analyse tone",
                    "Understand mood creation"
                ]
            },
            {
                topic: "Writing Poetry for Effect",
                outcomes: [
                    "Write multiple poetic forms",
                    "Use language deliberately for effect",
                    "Create vivid imagery"
                ]
            },
            {
                topic: "Editing and Refining Poems",
                outcomes: [
                    "Revise for impact",
                    "Refine word choice and structure",
                    "Polish final drafts"
                ]
            },
            {
                topic: "Literary Response Writing",
                outcomes: [
                    "Write analytical paragraphs",
                    "Use quotations to support ideas",
                    "Apply metalanguage appropriately"
                ]
            },
            {
                topic: "Using Evidence and Quotations",
                outcomes: [
                    "Select relevant quotations",
                    "Integrate evidence smoothly",
                    "Explain significance of evidence"
                ]
            },
            {
                topic: "Comprehension of Unseen Texts",
                outcomes: [
                    "Analyse unfamiliar literary texts",
                    "Make sophisticated inferences",
                    "Support interpretations with evidence"
                ]
            },
            {
                topic: "Poetry Portfolio Submission",
                outcomes: ["Compile comprehensive portfolio", "Demonstrate range and depth", "Present polished work"]
            },
            {
                topic: "Reflection & Performance",
                outcomes: ["Perform poetry with expression", "Provide peer feedback", "Reflect on creative process"]
            }
        ]
    },
    "Term 4": {
        title: "Media, Multimodal Texts & Yearly Consolidation",
        subtitle: "Critical literacy, synthesis of skills",
        lessons: [
            {
                topic: "Media Texts & Bias",
                outcomes: [
                    "Analyse advertisements and digital texts",
                    "Identify bias and persuasive intent",
                    "Apply visual literacy techniques"
                ]
            },
            {
                topic: "Visual Language Techniques",
                outcomes: [
                    "Understand how images influence meaning",
                    "Analyse layout and design choices",
                    "Interpret visual rhetoric"
                ]
            },
            {
                topic: "Planning Multimodal Texts",
                outcomes: [
                    "Plan integrated text and visual elements",
                    "Consider audience and purpose",
                    "Structure multimodal content"
                ]
            },
            {
                topic: "Writing for Different Audiences",
                outcomes: [
                    "Adapt language for specific audiences",
                    "Apply persuasive and informative features",
                    "Choose appropriate tone and register"
                ]
            },
            {
                topic: "Integrating Visuals and Text",
                outcomes: [
                    "Create cohesive multimodal texts",
                    "Balance text and visual elements",
                    "Apply design principles"
                ]
            },
            {
                topic: "Editing and Refinement",
                outcomes: [
                    "Revise sentence structure",
                    "Check cohesion and punctuation",
                    "Edit for audience and purpose"
                ]
            },
            {
                topic: "Presentation Skills",
                outcomes: [
                    "Deliver formal presentations",
                    "Engage audience effectively",
                    "Respond to questions confidently"
                ]
            },
            {
                topic: "Full-Year Revision",
                outcomes: [
                    "Review narrative, persuasive, and informative writing",
                    "Consolidate grammar and language skills",
                    "Practice comprehension and analysis"
                ]
            },
            {
                topic: "Yearly Assessment",
                outcomes: ["Demonstrate comprehensive learning", "Apply skills across text types", "Show growth and mastery"]
            },
            {
                topic: "Reflection & High School Readiness",
                outcomes: ["Reflect on Year 6 learning", "Prepare for Year 7 transition", "Set goals for high school"]
            }
        ]
    }
};

const KEY_METHOD_BENEFITS = [
    {
        icon: BookOpen,
        title: "Advanced Comprehension",
        description: "Develop sophisticated analytical skills through deep reading of complex texts and evidence-based interpretation.",
    },
    {
        icon: Feather,
        title: "Extended Writing",
        description: "Master sustained, structured writing across narrative, persuasive, and analytical forms with advanced language control.",
    },
    {
        icon: MessageCircle,
        title: "Critical Communication",
        description: "Build confidence in formal speaking, debate, and discussion with emphasis on evidence and logical reasoning.",
    },
    {
        icon: TrendingUp,
        title: "High School Ready",
        description: "Comprehensive preparation for Year 7 English with strong foundations in analysis, argument, and creative expression.",
    },
];

const APPROACH_FEATURES = [
    {
        icon: Book,
        title: "Advanced instruction",
        description: "Sophisticated teaching of grammar, vocabulary, and text analysis with high expectations.",
    },
    {
        icon: Brain,
        title: "Analytical thinking",
        description: "Develop critical literacy through close reading, evidence-based response, and logical argument.",
    },
    {
        icon: Target,
        title: "Stage 3 mastery",
        description: "Complete coverage of NSW English K–10 Stage 3 outcomes preparing for high school.",
    },
    {
        icon: CheckCircle,
        title: "Rigorous feedback",
        description: "Detailed assessment and constructive feedback to ensure mastery and growth.",
    },
];

/* =========================
   Page Component
========================= */

export default function Year6EnglishPage() {
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
                            <li className="text-[#5E5574]">Year 6 English</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Syllabus Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 6 English
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        Completing Stage 3 with confidence — mastering{" "}
                        <span className="text-[#5E5574] font-medium">extended writing</span>,{" "}
                        <span className="text-[#5E5574] font-medium">literary analysis</span>, and{" "}
                        <span className="text-[#5E5574] font-medium">critical thinking</span>.
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
                            Each term focuses on different text types and advanced skills, completing Stage 3 and preparing for Year 7.
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
                            Designed for Year 7 readiness
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
                            for Stage 3, covering all outcomes for Year 6 students. Content is
                            sequenced to complete primary English and prepare for high school success.
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
