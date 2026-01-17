"use client";

import { useState } from "react";
import Link from "next/link";
import TextbookPreview from "../../../../components/TextbookPreview";
import { Brain, Target, TrendingUp, Users, BookOpen, Zap, CheckCircle, Clock, Microscope, Beaker, Atom } from "lucide-react";

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
        title: "Solutions and Mixtures",
        subtitle: "Understanding the building blocks of our world",
        lessons: [
            {
                topic: "States of Matter and Particle Movement",
                outcomes: [
                    "Identify the 3 main states of matter and how they are represented in the movement of water on earth",
                    "Represent changes in the state of matter in terms of particle arrangement and movement",
                    "Compare the properties of matter in different states, including the relative strength of attractive forces"
                ]
            },
            {
                topic: "Properties of Water",
                outcomes: [
                    "Investigate the other physical properties of water, such as density, buoyancy and surface tension",
                    "Determine the volume and mass of regular-shaped and irregular-shaped objects to calculate their density",
                    "Conduct a practical investigation to measure the density of water and other substances"
                ]
            },
            {
                topic: "Investigating Solubility",
                outcomes: [
                    "Investigate what substances dissolve in water using key terms: soluble, insoluble, solubility, solute, solvent and solution",
                    "Conduct and document a practical investigation to measure solubility of different solutes in water",
                    "Qualitatively investigate the effect of temperature on solubility"
                ]
            },
            {
                topic: "Solubility and Solutions",
                outcomes: [
                    "Qualitatively investigate the effect of temperature on solubility",
                    "Describe how solutions can be modelled using particle theory",
                    "Compare the properties of dilute, concentrated, saturated and supersaturated solutions"
                ]
            },
            {
                topic: "Classifying and Separating Matter",
                outcomes: [
                    "Distinguish between atoms, mixtures and compounds and explain their properties using particle theory",
                    "Classify matter as pure substances and impure substances based on their particle composition",
                    "Explain how the physical properties of substances are used to separate mixtures"
                ]
            },
            {
                topic: "Heating Water and Changes of States",
                outcomes: [
                    "Conduct an investigation to measure and graph the temperature of water to identify the changes of state as heated over time"
                ]
            },
            {
                topic: "Separating Mixtures - Aboriginal and Torres Strait Islander Peoples & Industry",
                outcomes: [
                    "Investigate techniques used by Aboriginal and/or Torres Strait Islander Peoples to separate mixtures",
                    "Investigate an industrial separation technique"
                ]
            },
            {
                topic: "Water Pollution and Removing Pollutants",
                outcomes: [
                    "Model how a body of water can become polluted, and plan and conduct a practical investigation that attempts to remove the pollutants"
                ]
            },
            {
                topic: "Topic Test",
                outcomes: ["Assessment of all Term 1 content"]
            },
            {
                topic: "Review",
                outcomes: ["Consolidation and feedback on Term 1 learning"]
            }
        ]
    },
    "Term 2": {
        title: "Cells and Classifications",
        subtitle: "Exploring the diversity of life",
        lessons: [
            {
                topic: "What is Living?",
                outcomes: [
                    "Describe the characteristics of living things",
                    "Introduction to scientific observation and recording"
                ]
            },
            {
                topic: "Why and How We Classify Living Things?",
                outcomes: [
                    "Discuss the role and importance of classification in ordering and organising the diversity of life on Earth",
                    "Classify species using scientific conventions from the binomial system of classification"
                ]
            },
            {
                topic: "Using Structural Features to Classify Living Things",
                outcomes: [
                    "Conduct an investigation to observe and identify the similarities and differences of structural features within and between groups of organisms",
                    "Interpret dichotomous keys to identify organisms surveyed in an Australian habitat"
                ]
            },
            {
                topic: "Classifications in Context",
                outcomes: [
                    "Investigate how organisms in an Australian habitat are adapted to their environment and document findings in a written scientific report",
                    "Explain how plants and animals are classified in Aboriginal and Torres Strait Islander Cultures based on their uses, forms and functions"
                ]
            },
            {
                topic: "Introduction to Cells and Cell Theory",
                outcomes: [
                    "Outline cell theory",
                    "Identify which cell structures and organelles are common in plant and animal cells"
                ]
            },
            {
                topic: "Plant and Animal Cells: Structure and Function",
                outcomes: [
                    "Describe the functions of the cell membrane, cytoplasm, nucleus containing DNA, mitochondria and chloroplasts",
                    "Compare the structure of plant and animal cells to identify similarities and differences",
                    "Identify cellular respiration via mitochondria, and photosynthesis via chloroplasts"
                ]
            },
            {
                topic: "Investigating Cells Using Microscopes",
                outcomes: [
                    "Conduct an investigation to observe and record the similarities and differences between different cells",
                    "Draw single-celled organisms observed under a microscope"
                ]
            },
            {
                topic: "Specialised Cells, Tissues and Organs",
                outcomes: [
                    "Describe the role of specialised cells in multicellular organisms and explain why they are needed",
                    "Represent the arrangement of specialised cells in tissues and in organs",
                    "Examine the relationship between structure and function for a range of specialised cells"
                ]
            },
            {
                topic: "Unit Test",
                outcomes: ["Assessment of all Term 2 content"]
            },
            {
                topic: "Review",
                outcomes: ["Consolidation and feedback on Term 2 learning"]
            }
        ]
    },
    "Term 3": {
        title: "Forces",
        subtitle: "Understanding motion and energy",
        lessons: [
            {
                topic: "What are Forces?",
                outcomes: [
                    "Explain forces as either direct (contact) or indirect (non-contact)",
                    "Describe the electrostatic and gravitational forces exerted between objects"
                ]
            },
            {
                topic: "Investigating Forces in Action",
                outcomes: [
                    "Conduct a practical investigation on the effects of a range of direct and indirect forces",
                    "Use force diagrams to model balanced and unbalanced forces",
                    "Analyse force diagrams to make predictions"
                ]
            },
            {
                topic: "Balanced and Unbalanced Forces and Motion",
                outcomes: [
                    "Examine the relationship between force and energy",
                    "Use the concept of forces to describe the motion of objects in orbit"
                ]
            },
            {
                topic: "Gravity and Weight",
                outcomes: [
                    "Define weight force as the mass × the acceleration due to gravity (W = mg)",
                    "Perform calculations using the equation W = mg to solve for unknowns"
                ]
            },
            {
                topic: "Magnets and Magnetic Fields",
                outcomes: [
                    "Describe how magnets attract or repel each other based on their polarity",
                    "Conduct a practical investigation to test the effect of distance on the action of a magnet",
                    "Observe and map the magnetic fields of magnets"
                ]
            },
            {
                topic: "Electromagnets and their Uses",
                outcomes: [
                    "Conduct a practical investigation to construct electromagnets and compare their strength",
                    "Investigate examples of forces and magnetism in familiar contexts"
                ]
            },
            {
                topic: "Simple Machines and Forces",
                outcomes: [
                    "Explore the role of simple machines, from now and in the past, as used in everyday life",
                    "Conduct a series of practical investigations using simple machines to investigate the action of forces",
                    "Investigate how simple machines, such as levers and pulleys, are used to change the magnitude of force"
                ]
            },
            {
                topic: "Forces in Context and Problem Solving",
                outcomes: [
                    "Identify examples of Aboriginal and Torres Strait Islander Peoples' application of Knowledge about forces",
                    "Investigate how simple machines can solve everyday issues",
                    "Investigate examples of forces and magnetism in familiar contexts"
                ]
            },
            {
                topic: "Test",
                outcomes: ["Assessment of all Term 3 content"]
            },
            {
                topic: "Review",
                outcomes: ["Consolidation and feedback on Term 3 learning"]
            }
        ]
    },
    "Term 4": {
        title: "Observing the Universe",
        subtitle: "Building scientific thinking and exploring the cosmos",
        lessons: [
            {
                topic: "Introduction to Science and Observation",
                outcomes: [
                    "Discuss that the purpose of science is to build knowledge and understanding of the world and the Universe",
                    "Recognise how scientific knowledge can be represented in branches of biology, chemistry, physics and geology",
                    "Explore why scientific research is usually collaborative and builds on the work of others"
                ]
            },
            {
                topic: "Scientific Theories and Laws",
                outcomes: [
                    "Identify that scientific theories and laws are based on repeated experiments and observations that describe or predict a range of natural phenomena"
                ]
            },
            {
                topic: "Practice of Science",
                outcomes: [
                    "Identify that the practice of science involves using the Working scientifically processes",
                    "Use a variety of analog and digital measuring devices in scientific investigations",
                    "Compare and contrast the accuracy and reliability of observations made using the senses with those obtained using measuring equipment"
                ]
            },
            {
                topic: "Observing and Investigating",
                outcomes: [
                    "Explain how observations of natural phenomena can be used to make inferences and testable predictions",
                    "Explore the different approaches scientists use in scientific research",
                    "Follow a sequence of instructions to safely conduct an investigation",
                    "Tabulate and graph data from an investigation to identify trends, patterns and relationships"
                ]
            },
            {
                topic: "Space Science: Solar System Models",
                outcomes: [
                    "Compare historical and current solar system models to show how models are modified or rejected due to new scientific evidence",
                    "Explain that predictable and observable phenomena on the Earth are caused by the relative positions of the Sun, the Earth and the Moon"
                ]
            },
            {
                topic: "Lunar Phases and Eclipses",
                outcomes: [
                    "Use physical models or virtual simulations to explain the cyclic patterns of lunar phases and eclipses of the Sun and Moon"
                ]
            },
            {
                topic: "Aboriginal and Torres Strait Islander Astronomy 1",
                outcomes: [
                    "Investigate the similarities between Aboriginal and Torres Strait Islander accounts and mainstream scientific explanations about the phases of the Moon",
                    "Explain how Aboriginal and Torres Strait Islander Peoples use stars to identify specific weather phenomena"
                ]
            },
            {
                topic: "Aboriginal and Torres Strait Islander Astronomy 2",
                outcomes: [
                    "Describe how Aboriginal and/or Torres Strait Islander Peoples predicted seasonal phenomena based on their observations of the stars and phases of the Moon"
                ]
            },
            {
                topic: "Test",
                outcomes: ["Assessment of all Term 4 content"]
            },
            {
                topic: "Review",
                outcomes: ["Consolidation and feedback on Term 4 learning"]
            }
        ]
    }
};

const KEY_METHOD_BENEFITS = [
    {
        icon: BookOpen,
        title: "Hands-On Learning",
        description: "Science comes alive through practical investigations and experiments that build genuine understanding, not just memorization.",
    },
    {
        icon: Users,
        title: "Inquiry-Based Approach",
        description: "Students learn to ask questions, design experiments, and think like scientists — developing critical thinking skills for life.",
    },
    {
        icon: Zap,
        title: "Real-World Connections",
        description: "Every concept is linked to everyday phenomena and Aboriginal and Torres Strait Islander knowledge systems, making science relevant and engaging.",
    },
    {
        icon: TrendingUp,
        title: "Progressive Mastery",
        description: "Skills and knowledge build systematically across terms, creating a strong foundation for senior science subjects.",
    },
];

const APPROACH_FEATURES = [
    {
        icon: Microscope,
        title: "Practical focus",
        description: "Regular hands-on experiments develop scientific skills and deepen conceptual understanding.",
    },
    {
        icon: Brain,
        title: "Conceptual clarity",
        description: "Complex ideas broken down into clear, logical steps that make sense to young minds.",
    },
    {
        icon: Target,
        title: "Syllabus aligned",
        description: "Full coverage of NSW Science syllabus outcomes with strategic sequencing.",
    },
    {
        icon: CheckCircle,
        title: "Continuous feedback",
        description: "Regular checkpoints and reviews ensure understanding before moving forward.",
    },
];

const STUDENT_OUTCOMES = [
    {
        metric: "95%",
        label: "Students enjoy science more",
        description: "After one term of tutoring",
    },
    {
        metric: "2.5x",
        label: "Improved practical skills",
        description: "In experimental design and analysis",
    },
    {
        metric: "18+",
        label: "Average grade improvement",
        description: "Within one academic year",
    },
];

/* =========================
   Page Component
========================= */

export default function Year7SciencePage() {
    const [activeTerm, setActiveTerm] = useState<TermKey>("Term 1");
    const active = TERMS[activeTerm];

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
                            <li className="text-[#5E5574]">Year 7 Science</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Syllabus Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 7 Science
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        A hands-on journey through the NSW Science syllabus — building scientific thinking through{" "}
                        <span className="text-[#5E5574] font-medium">inquiry-based learning</span> and{" "}
                        <span className="text-[#5E5574] font-medium">practical investigation</span>.
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

            {/* Green accent line for Science */}
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

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
                            Each term explores a different domain of science, building skills and knowledge progressively.
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
                            The KEY Method in Science
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
                            <strong className="text-[#3F3A52]">NSW Science Syllabus</strong>{" "}
                            for Stage 4, covering all outcomes for Year 7 students. Content is
                            sequenced to build scientific skills and conceptual understanding progressively.
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
