"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TextbookPreview from "../../../../components/TextbookPreview";
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
        title: "Narrative & Reading Comprehension",
        subtitle: "Understanding texts, narrative structure, grammar foundations",
        lessons: [
            {
                topic: "Elements of Narrative Texts",
                outcomes: [
                    "Identify themes, characters, settings, and plot",
                    "Infer meaning using evidence from the text",
                    "Understand literal vs inferred information"
                ]
            },
            {
                topic: "Character and Setting Development",
                outcomes: [
                    "Develop characters using description, dialogue, and action",
                    "Create vivid settings",
                    "Show vs tell techniques"
                ]
            },
            {
                topic: "Plot Structure & Story Mapping",
                outcomes: [
                    "Understand orientation, complication, resolution",
                    "Map story structure",
                    "Identify key events"
                ]
            },
            {
                topic: "Sentence Structure & Paragraphing",
                outcomes: [
                    "Use simple, compound, and complex sentences",
                    "Organize ideas into paragraphs",
                    "Apply correct punctuation"
                ]
            },
            {
                topic: "Dialogue Punctuation",
                outcomes: [
                    "Punctuate direct speech correctly",
                    "Use dialogue to develop characters",
                    "Integrate speech into narratives"
                ]
            },
            {
                topic: "Show vs Tell Techniques",
                outcomes: [
                    "Use descriptive language effectively",
                    "Create imagery through word choice",
                    "Engage readers through showing"
                ]
            },
            {
                topic: "Editing and Improving Narratives",
                outcomes: [
                    "Revise for clarity and coherence",
                    "Check grammar and spelling",
                    "Improve word choice"
                ]
            },
            {
                topic: "Reading Comprehension Strategies",
                outcomes: [
                    "Apply comprehension strategies",
                    "Make inferences from texts",
                    "Support answers with evidence"
                ]
            },
            {
                topic: "Narrative Writing Assessment",
                outcomes: ["Write a structured narrative", "Apply learned techniques", "Demonstrate understanding"]
            },
            {
                topic: "Reflection & Feedback",
                outcomes: ["Reflect on learning", "Provide peer feedback", "Set goals for improvement"]
            }
        ]
    },
    "Term 2": {
        title: "Informative & Persuasive Texts",
        subtitle: "Purpose, structure, and audience",
        lessons: [
            {
                topic: "Informative Text Features",
                outcomes: [
                    "Identify author purpose and point of view",
                    "Recognize text structures",
                    "Understand informative text features"
                ]
            },
            {
                topic: "Research and Note-Taking Skills",
                outcomes: [
                    "Gather information from sources",
                    "Take effective notes",
                    "Organize research findings"
                ]
            },
            {
                topic: "Structuring Informative Paragraphs",
                outcomes: [
                    "Write topic sentences",
                    "Develop supporting details",
                    "Use connectives effectively"
                ]
            },
            {
                topic: "Introduction to Persuasive Writing",
                outcomes: [
                    "Understand persuasive purpose",
                    "Identify persuasive techniques",
                    "Distinguish fact from opinion"
                ]
            },
            {
                topic: "Persuasive Devices",
                outcomes: [
                    "Use emotive language",
                    "Apply repetition for effect",
                    "Use modal verbs (must, should, might)"
                ]
            },
            {
                topic: "Paragraph Structure for Arguments",
                outcomes: [
                    "Structure introduction, body, conclusion",
                    "Develop logical arguments",
                    "Support opinions with reasons"
                ]
            },
            {
                topic: "Editing for Clarity and Cohesion",
                outcomes: [
                    "Revise for audience and purpose",
                    "Improve paragraph cohesion",
                    "Check grammar and punctuation"
                ]
            },
            {
                topic: "Analysing Persuasive Texts",
                outcomes: [
                    "Compare persuasive techniques across texts",
                    "Evaluate effectiveness",
                    "Identify author's perspective"
                ]
            },
            {
                topic: "Persuasive Writing Assessment",
                outcomes: ["Write a persuasive text", "Apply persuasive techniques", "Structure arguments effectively"]
            },
            {
                topic: "Oral Presentation",
                outcomes: ["Deliver a persuasive speech", "Use tone, pace, and volume effectively", "Engage audience"]
            }
        ]
    },
    "Term 3": {
        title: "Poetry, Figurative Language & Creative Response",
        subtitle: "Language choices and creative expression",
        lessons: [
            {
                topic: "Introduction to Poetry",
                outcomes: [
                    "Read and analyse poems",
                    "Identify poetic features",
                    "Understand tone and mood"
                ]
            },
            {
                topic: "Figurative Language Techniques",
                outcomes: [
                    "Identify simile, metaphor, personification",
                    "Use alliteration and onomatopoeia",
                    "Apply figurative language in writing"
                ]
            },
            {
                topic: "Analysing Poetic Language",
                outcomes: [
                    "Interpret meaning in poems",
                    "Analyse word choice for effect",
                    "Understand expanded noun groups"
                ]
            },
            {
                topic: "Writing Imagery-Rich Poems",
                outcomes: [
                    "Create vivid imagery",
                    "Use sensory language",
                    "Develop poetic voice"
                ]
            },
            {
                topic: "Sound Devices in Poetry",
                outcomes: [
                    "Use rhyme and rhythm",
                    "Apply sound patterns",
                    "Write different poetic forms"
                ]
            },
            {
                topic: "Editing and Refining Poems",
                outcomes: [
                    "Revise for impact",
                    "Improve word choice",
                    "Polish final drafts"
                ]
            },
            {
                topic: "Creative Response Writing",
                outcomes: [
                    "Respond creatively to texts",
                    "Express personal interpretations",
                    "Apply literary techniques"
                ]
            },
            {
                topic: "Reading Comprehension (Literary Texts)",
                outcomes: [
                    "Analyse short literary texts",
                    "Make inferences",
                    "Support interpretations with evidence"
                ]
            },
            {
                topic: "Poetry Portfolio Submission",
                outcomes: ["Compile poetry portfolio", "Demonstrate range of techniques", "Present polished work"]
            },
            {
                topic: "Reflection & Performance",
                outcomes: ["Perform poetry", "Respond to peer work respectfully", "Reflect on creative process"]
            }
        ]
    },
    "Term 4": {
        title: "Multimodal Texts, Media & Yearly Review",
        subtitle: "Digital texts, critical thinking, consolidation",
        lessons: [
            {
                topic: "Analysing Visual and Digital Texts",
                outcomes: [
                    "Analyse advertisements and digital texts",
                    "Understand how images influence meaning",
                    "Interpret layout and design choices"
                ]
            },
            {
                topic: "Media and Advertising Techniques",
                outcomes: [
                    "Identify persuasive techniques in media",
                    "Analyse target audience",
                    "Evaluate effectiveness"
                ]
            },
            {
                topic: "Planning a Multimodal Project",
                outcomes: [
                    "Plan text and visual elements",
                    "Consider audience and purpose",
                    "Organize content effectively"
                ]
            },
            {
                topic: "Writing for Different Audiences",
                outcomes: [
                    "Adapt language for audience",
                    "Choose appropriate tone",
                    "Apply persuasive and informative techniques"
                ]
            },
            {
                topic: "Combining Text and Visuals",
                outcomes: [
                    "Create cohesive multimodal texts",
                    "Balance text and images",
                    "Use design principles"
                ]
            },
            {
                topic: "Editing and Refining Presentations",
                outcomes: [
                    "Revise for clarity",
                    "Check cohesion across elements",
                    "Polish final product"
                ]
            },
            {
                topic: "Presentation Skills",
                outcomes: [
                    "Present multimodal projects",
                    "Speak clearly and confidently",
                    "Engage audience effectively"
                ]
            },
            {
                topic: "Full-Year Revision",
                outcomes: [
                    "Review narrative, persuasive, and informative writing",
                    "Consolidate grammar concepts",
                    "Practice comprehension skills"
                ]
            },
            {
                topic: "Yearly Assessment",
                outcomes: ["Demonstrate full-year learning", "Apply skills across text types", "Show growth and understanding"]
            },
            {
                topic: "Reflection & Transition Skills",
                outcomes: ["Reflect on Year 5 learning", "Set goals for Year 6", "Celebrate achievements"]
            }
        ]
    }
};

const KEY_METHOD_BENEFITS = [
    {
        icon: BookOpen,
        title: "Reading Comprehension",
        description: "Develop strong comprehension skills through explicit strategy instruction and regular practice with diverse text types.",
    },
    {
        icon: Feather,
        title: "Writing Fluency",
        description: "Master narrative, persuasive, and informative writing with clear structures and effective language choices.",
    },
    {
        icon: MessageCircle,
        title: "Oral Communication",
        description: "Build confidence in speaking and listening through presentations, discussions, and collaborative learning.",
    },
    {
        icon: TrendingUp,
        title: "Stage 3 Success",
        description: "Comprehensive preparation for Year 6 and NAPLAN with focus on critical thinking and creative expression.",
    },
];

const APPROACH_FEATURES = [
    {
        icon: Book,
        title: "Explicit instruction",
        description: "Clear teaching of grammar, vocabulary, and text structures with scaffolded support.",
    },
    {
        icon: Brain,
        title: "Critical thinking",
        description: "Develop analytical skills through close reading and thoughtful response to texts.",
    },
    {
        icon: Target,
        title: "Stage 3 aligned",
        description: "Full coverage of NSW English K–10 Stage 3 outcomes with strategic sequencing.",
    },
    {
        icon: CheckCircle,
        title: "Regular feedback",
        description: "Continuous assessment and constructive feedback to support growth and improvement.",
    },
];

/* =========================
   Page Component
========================= */

export default function Year5EnglishPage() {
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
                            <li className="text-[#5E5574]">Year 5 English</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Syllabus Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 5 English
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        Building strong literacy foundations — mastering{" "}
                        <span className="text-[#5E5574] font-medium">narrative writing</span>,{" "}
                        <span className="text-[#5E5574] font-medium">comprehension</span>, and{" "}
                        <span className="text-[#5E5574] font-medium">creative expression</span>.
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
                            Each term focuses on different text types and skills, building Stage 3 literacy systematically.
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
                            Designed for Stage 3 success
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
                            for Stage 3, covering all outcomes for Year 5 students. Content is
                            sequenced to build reading, writing, speaking, and listening skills systematically.
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
