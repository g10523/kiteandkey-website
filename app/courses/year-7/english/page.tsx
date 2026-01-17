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
        title: "Narrative, Imagination & Close Reading",
        subtitle: "Storytelling, narrative techniques, comprehension",
        lessons: [
            {
                topic: "Narrative Conventions & Story Arcs",
                outcomes: [
                    "Identify plot structure in extended narratives",
                    "Analyse character development across texts",
                    "Understand setting and atmosphere creation"
                ]
            },
            {
                topic: "Characterisation and Point of View",
                outcomes: [
                    "Develop complex character voice through dialogue",
                    "Explore different narrative perspectives",
                    "Create believable character motivations"
                ]
            },
            {
                topic: "Setting, Mood, and Atmosphere",
                outcomes: [
                    "Use descriptive language to establish setting",
                    "Create mood through word choice and imagery",
                    "Build atmospheric tension in narratives"
                ]
            },
            {
                topic: "Sentence Variety & Paragraph Structure",
                outcomes: [
                    "Construct simple, compound, and complex sentences",
                    "Apply effective paragraphing for cohesion",
                    "Maintain verb tense consistency"
                ]
            },
            {
                topic: "Dialogue Techniques",
                outcomes: [
                    "Punctuate dialogue correctly",
                    "Use dialogue to reveal character",
                    "Create natural conversation flow"
                ]
            },
            {
                topic: "Show vs Tell (Secondary Level)",
                outcomes: [
                    "Apply 'show don't tell' techniques",
                    "Use sensory details effectively",
                    "Create vivid imagery through action"
                ]
            },
            {
                topic: "Editing and Redrafting Narratives",
                outcomes: [
                    "Revise for clarity and impact",
                    "Refine descriptive language",
                    "Polish final narrative drafts"
                ]
            },
            {
                topic: "Reading Comprehension Strategies",
                outcomes: [
                    "Infer meaning from complex texts",
                    "Justify interpretations with evidence",
                    "Analyse author's purpose and technique"
                ]
            },
            {
                topic: "Narrative Assessment",
                outcomes: ["Compose extended narrative with engaging orientation", "Apply rising action and resolution structure", "Demonstrate narrative mastery"]
            },
            {
                topic: "Reflection and Feedback",
                outcomes: ["Reflect on narrative writing process", "Provide constructive peer feedback", "Set goals for improvement"]
            }
        ]
    },
    "Term 2": {
        title: "Persuasive & Informative Texts",
        subtitle: "Argument, audience, purpose",
        lessons: [
            {
                topic: "Purpose, Audience, and Text Types",
                outcomes: [
                    "Analyse persuasive texts (articles, ads, speeches)",
                    "Identify bias and point of view",
                    "Understand audience and purpose relationship"
                ]
            },
            {
                topic: "Persuasive Language Features",
                outcomes: [
                    "Identify persuasive devices and techniques",
                    "Recognise emotive and evaluative language",
                    "Analyse modal verbs (must, should, could)"
                ]
            },
            {
                topic: "Structuring Arguments",
                outcomes: [
                    "Write clear introduction with contention",
                    "Develop body paragraphs with evidence",
                    "Create conclusions that reinforce argument"
                ]
            },
            {
                topic: "Topic Sentences & Paragraph Cohesion",
                outcomes: [
                    "Craft effective topic sentences",
                    "Use persuasive connectives",
                    "Maintain paragraph unity and flow"
                ]
            },
            {
                topic: "Language for Persuasion",
                outcomes: [
                    "Apply formal vs informal register",
                    "Use emotive language strategically",
                    "Employ rhetorical questions effectively"
                ]
            },
            {
                topic: "Editing for Clarity and Impact",
                outcomes: [
                    "Revise for logical flow",
                    "Strengthen argument coherence",
                    "Polish persuasive language"
                ]
            },
            {
                topic: "Oral Persuasion Skills",
                outcomes: [
                    "Deliver persuasive speeches confidently",
                    "Use vocal techniques (tone, pace, emphasis)",
                    "Engage audience through presentation"
                ]
            },
            {
                topic: "Comparative Text Analysis",
                outcomes: [
                    "Compare persuasive techniques across texts",
                    "Evaluate effectiveness of different arguments",
                    "Synthesise information from multiple sources"
                ]
            },
            {
                topic: "Persuasive Writing Assessment",
                outcomes: ["Write structured persuasive text", "Apply evidence-based argument", "Demonstrate persuasive mastery"]
            },
            {
                topic: "Oral Presentation",
                outcomes: ["Deliver formal persuasive speech", "Respond to audience questions", "Demonstrate oral confidence"]
            }
        ]
    },
    "Term 3": {
        title: "Poetry, Figurative Language & Analysis",
        subtitle: "Language for effect, literary interpretation",
        lessons: [
            {
                topic: "Introduction to Poetry",
                outcomes: [
                    "Study range of poems and short texts",
                    "Identify poetic structures and forms",
                    "Understand purpose of poetry"
                ]
            },
            {
                topic: "Figurative Language Techniques",
                outcomes: [
                    "Analyse metaphor, simile, personification",
                    "Identify symbolism in texts",
                    "Understand connotation and word choice"
                ]
            },
            {
                topic: "Analysing Imagery and Tone",
                outcomes: [
                    "Interpret imagery in poetry",
                    "Identify tone and mood",
                    "Explain how language shapes meaning"
                ]
            },
            {
                topic: "Writing Poetry for Meaning",
                outcomes: [
                    "Compose poems in multiple forms",
                    "Use figurative language deliberately",
                    "Create imagery for effect"
                ]
            },
            {
                topic: "Sound Devices and Rhythm",
                outcomes: [
                    "Apply alliteration, assonance, rhyme",
                    "Understand rhythm and meter",
                    "Use sound for poetic effect"
                ]
            },
            {
                topic: "Editing and Refining Poems",
                outcomes: [
                    "Revise for impact and clarity",
                    "Refine word choice and imagery",
                    "Polish poetic techniques"
                ]
            },
            {
                topic: "Analytical Response Structure",
                outcomes: [
                    "Write analytical paragraphs",
                    "Use quotations and textual evidence",
                    "Apply metalanguage appropriately"
                ]
            },
            {
                topic: "Unseen Poetry Comprehension",
                outcomes: [
                    "Analyse unfamiliar poems",
                    "Identify techniques quickly",
                    "Respond with evidence-based analysis"
                ]
            },
            {
                topic: "Poetry Portfolio Submission",
                outcomes: ["Compile comprehensive poetry portfolio", "Demonstrate range of forms and techniques", "Present polished creative work"]
            },
            {
                topic: "Performance and Reflection",
                outcomes: ["Perform poetry with expression", "Provide constructive feedback", "Reflect on creative process"]
            }
        ]
    },
    "Term 4": {
        title: "Media, Multimodal Texts & Consolidation",
        subtitle: "Critical literacy and synthesis",
        lessons: [
            {
                topic: "Media Texts and Representation",
                outcomes: [
                    "Analyse media and digital texts",
                    "Identify bias and persuasive intent",
                    "Understand representation in media"
                ]
            },
            {
                topic: "Visual Language Techniques",
                outcomes: [
                    "Analyse visual literacy techniques",
                    "Understand layout and design impact",
                    "Interpret visual persuasion"
                ]
            },
            {
                topic: "Planning Multimodal Texts",
                outcomes: [
                    "Plan integrated text and visual elements",
                    "Consider audience and purpose",
                    "Structure multimodal content effectively"
                ]
            },
            {
                topic: "Writing for Different Audiences",
                outcomes: [
                    "Adapt language for specific audiences",
                    "Apply appropriate register and tone",
                    "Balance formality and engagement"
                ]
            },
            {
                topic: "Integrating Images and Text",
                outcomes: [
                    "Create cohesive multimodal texts",
                    "Balance visual and written elements",
                    "Apply design principles"
                ]
            },
            {
                topic: "Editing and Refinement",
                outcomes: [
                    "Revise sentence structures",
                    "Check cohesion and coherence",
                    "Ensure punctuation and grammar accuracy"
                ]
            },
            {
                topic: "Presentation Skills",
                outcomes: [
                    "Deliver formal presentations confidently",
                    "Engage audience effectively",
                    "Use multimodal elements strategically"
                ]
            },
            {
                topic: "Full-Year Revision",
                outcomes: [
                    "Review narrative, persuasive, and poetry",
                    "Consolidate grammar and language skills",
                    "Practice analytical responses"
                ]
            },
            {
                topic: "Yearly Assessment",
                outcomes: ["Demonstrate comprehensive learning", "Apply skills across text types", "Show growth and mastery"]
            },
            {
                topic: "Reflection and Transition to Year 8",
                outcomes: ["Reflect on Year 7 achievements", "Identify strengths and areas for growth", "Prepare for Year 8 English"]
            }
        ]
    }
};

const KEY_METHOD_BENEFITS = [
    {
        icon: BookOpen,
        title: "Analytical Writing Skills",
        description: "Develop evidence-based analytical responses using textual evidence and metalanguage for literary interpretation.",
    },
    {
        icon: Feather,
        title: "Sustained Text Composition",
        description: "Master extended creative and persuasive writing with sophisticated structure and deliberate language choices.",
    },
    {
        icon: MessageCircle,
        title: "Confident Communication",
        description: "Build oral presentation skills through speeches, debates, and formal discussions with clear argumentation.",
    },
    {
        icon: TrendingUp,
        title: "Stage 4 Foundations",
        description: "Complete preparation for Year 8 English with strong analytical, creative, and critical literacy skills.",
    },
];

const APPROACH_FEATURES = [
    {
        icon: Book,
        title: "Secondary transition",
        description: "Structured progression from primary to high school English with increased analytical expectations.",
    },
    {
        icon: Brain,
        title: "Critical literacy",
        description: "Develop sophisticated reading skills through close textual analysis and evidence-based interpretation.",
    },
    {
        icon: Target,
        title: "Stage 4 alignment",
        description: "Complete coverage of NSW English K–10 Stage 4 outcomes for Year 7 students.",
    },
    {
        icon: CheckCircle,
        title: "Formal assessment",
        description: "Prepare for high school assessment through structured tasks and rigorous feedback.",
    },
];

/* =========================
   Page Component
========================= */

export default function Year7EnglishPage() {
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
                            <li className="text-[#5E5574]">Year 7 English</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Stage 4 Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 7 English
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        Transitioning to secondary English — mastering{" "}
                        <span className="text-[#5E5574] font-medium">analytical writing</span>,{" "}
                        <span className="text-[#5E5574] font-medium">textual evidence</span>, and{" "}
                        <span className="text-[#5E5574] font-medium">critical literacy</span>.
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
                            Each term focuses on different text types and analytical skills, building Stage 4 foundations for Year 8.
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
                            Designed for Year 8 readiness
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
                            for Stage 4, covering all outcomes for Year 7 students. Content is
                            sequenced to transition from primary to secondary English and prepare for Year 8 success.
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
