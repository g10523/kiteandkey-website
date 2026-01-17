"use client";

import { useState } from "react";
import Link from "next/link";
import TextbookPreviewScience from "../../../../components/TextbookPreviewScience";
import { Brain, Target, TrendingUp, Users, BookOpen, Zap, CheckCircle, Clock, Microscope } from "lucide-react";

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
        title: "Materials",
        subtitle: "Exploring chemical bonding, resources, and polymers",
        lessons: [
            {
                topic: "Australia's mineral resources and their uses",
                outcomes: [
                    "Identify the finite nature of the minerals and resources extracted in Australia",
                    "Investigate the products produced from Australian minerals and resources"
                ]
            },
            {
                topic: "Indigenous uses of resources + extraction impact",
                outcomes: [
                    "Explain how Aboriginal and Torres Strait Islander Peoples used minerals and resources for a wide range of purposes",
                    "Evaluate the environmental impact of extracting and using a named resource and document findings in a written scientific report"
                ]
            },
            {
                topic: "Chemical bonding basics",
                outcomes: [
                    "Use valency to describe the number of electrons an atom needs to gain, lose or share to achieve a stable electron configuration",
                    "Explain noble gas configuration and identify that it occurs during chemical bonding"
                ]
            },
            {
                topic: "Types of chemical bonds and molecular models",
                outcomes: [
                    "Describe types of chemical bonds, including ionic, covalent and metallic bonds",
                    "Use models to describe the formation of cations and anions",
                    "Recognise that some elements exist as diatomic molecules"
                ]
            },
            {
                topic: "Chemical formulas and molecular structures",
                outcomes: [
                    "Construct chemical formulas of some common ionic compounds and covalent molecules",
                    "Conduct an investigation to observe and compare the physical and chemical properties of ionic, covalent and metallic substances"
                ]
            },
            {
                topic: "Introduction to hydrocarbons",
                outcomes: [
                    "Distinguish between organic and inorganic compounds",
                    "Use International Union of Pure and Applied Chemistry (IUPAC) nomenclature to name simple organic compounds",
                    "Identify and reproduce the structure of simple alkanes C1–C8"
                ]
            },
            {
                topic: "Application of hydrocarbons",
                outcomes: [
                    "Describe how hydrocarbons can be separated from crude oil and identify the uses of these products",
                    "Describe the differences between complete and incomplete combustion reactions of hydrocarbons",
                    "Research the uses of hydrocarbon compounds and how this has changed over time"
                ]
            },
            {
                topic: "Polymers",
                outcomes: [
                    "Identify the raw materials used to make polymers",
                    "Investigate and describe the properties of a range of polymers",
                    "Determine the quantity and types of polymers found in the environment",
                    "Conduct an investigation to determine the biodegradability of different packaging materials",
                    "Investigate case studies to explain the effect of bioaccumulation of microplastics in the environment"
                ]
            },
            {
                topic: "Topic Test",
                outcomes: ["Assessment of all Term 1 content"]
            },
            {
                topic: "Review",
                outcomes: ["Feedback and reflection on Term 1 learning"]
            }
        ]
    },
    "Term 2": {
        title: "Disease",
        subtitle: "Understanding homeostasis, immunity, and disease control",
        lessons: [
            {
                topic: "Homeostasis and Internal Balance",
                outcomes: [
                    "Identify the importance of maintaining stable internal conditions in the body",
                    "Investigate examples of an organism's observable response to a stimuli"
                ]
            },
            {
                topic: "Feedback Loops and Control Systems",
                outcomes: [
                    "Identify the role of feedback loops in maintaining homeostasis",
                    "Compare and contrast the responses of the nervous and endocrine systems"
                ]
            },
            {
                topic: "Coordinated response in the body",
                outcomes: [
                    "Describe how the nervous and endocrine systems coordinate the body's response to stimuli"
                ]
            },
            {
                topic: "Introduction to Disease",
                outcomes: [
                    "Distinguish between infectious and non-infectious diseases",
                    "Identify causes of non-infectious and infectious diseases",
                    "Compare the features and incidences of epidemics, endemics and pandemics"
                ]
            },
            {
                topic: "Non-Infectious Disease In Australia",
                outcomes: [
                    "Investigate data relating to a common non-infectious disease affecting Australians today",
                    "Describe ways to reduce the incidence of non-infectious diseases"
                ]
            },
            {
                topic: "Infectious disease transmission and immunity",
                outcomes: [
                    "Use modelling to investigate how infectious diseases can be spread",
                    "Identify how the body prevents the entry of pathogens and describe how it responds to pathogens that enter the body",
                    "Outline how a vaccination stimulates the body to produce antibodies to fight infection"
                ]
            },
            {
                topic: "Controlling and preventing disease",
                outcomes: [
                    "Assess ways to reduce the incidence and spread of infectious diseases",
                    "Investigate Aboriginal and/or Torres Strait Islander Peoples' use of plants to prevent or control disease"
                ]
            },
            {
                topic: "Disease in Context: Technology and Data",
                outcomes: [
                    "Analyse data about immunisation programs and the occurrence of infectious diseases to identify trends, patterns and relationships",
                    "Investigate technological advances developed in Australia to address disease, disorders or physical trauma in the human body"
                ]
            },
            {
                topic: "Test",
                outcomes: ["Assessment of all Term 2 content"]
            },
            {
                topic: "Review",
                outcomes: ["Feedback and reflection on Term 2 learning"]
            }
        ]
    },
    "Term 3": {
        title: "Energy",
        subtitle: "Exploring energy conservation, circuits, and renewable sources",
        lessons: [
            {
                topic: "Law of Conservation of Energy",
                outcomes: [
                    "Use the law of conservation of energy, and calculations, to explain that total energy is maintained in energy transfers",
                    "Explain efficiency in relation to energy transfers",
                    "Explain how to improve energy efficiency in energy transfers and transformations"
                ]
            },
            {
                topic: "Types of Energy and Energy Stores",
                outcomes: [
                    "Identify different types of energy sources",
                    "Describe how electrical energy can be produced from different types of sources"
                ]
            },
            {
                topic: "Renewable and Non-renewable energy",
                outcomes: [
                    "Evaluate the advantages and disadvantages of using renewable and non-renewable sources of energy to generate electricity"
                ]
            },
            {
                topic: "Electrical Circuits",
                outcomes: [
                    "Identify the elements of a complete circuit",
                    "Construct circuits and draw circuit diagrams that contain several components to show the flow of electricity"
                ]
            },
            {
                topic: "Ohm's Law and Circuit Analysis",
                outcomes: [
                    "Measure and compare voltage and current at different points in series and parallel circuits",
                    "Conduct an investigation to determine the relationship between voltage, current, and resistance, as described by Ohm's law"
                ]
            },
            {
                topic: "Energy Stored in Electrical Systems",
                outcomes: [
                    "Conduct an investigation to compare the energy transformed over time in model circuits or appliances",
                    "Investigate the energy star ratings of a range of appliances and explain the criteria used to determine these ratings"
                ]
            },
            {
                topic: "Optimising Current Energy Use",
                outcomes: [
                    "Evaluate ways to optimise current energy use",
                    "Examine data to identify past trends in energy use, and predict possible future demands, at a state, national and global level"
                ]
            },
            {
                topic: "Alternative Energy Sources",
                outcomes: [
                    "Explain reasons for the development of alternative sources of energy",
                    "Use data, evidence and research to evaluate the development of alternative energy sources to meet and reduce global energy demand"
                ]
            },
            {
                topic: "Test",
                outcomes: ["Assessment of all Term 3 content"]
            },
            {
                topic: "Review",
                outcomes: ["Feedback and reflection on Term 3 learning"]
            }
        ]
    },
    "Term 4": {
        title: "Environmental Sustainability",
        subtitle: "Understanding climate change and sustainable practices",
        lessons: [
            {
                topic: "Principles of Sustainability",
                outcomes: [
                    "Identify the principles and goals of sustainability",
                    "Apply scientific understanding to propose valid solutions to identified problems relating to sustainability"
                ]
            },
            {
                topic: "Climate Science Basics",
                outcomes: [
                    "Distinguish between climate and weather",
                    "Investigate data to determine what trends are evident in the world's climate",
                    "Explain how the natural greenhouse effect influences global climate"
                ]
            },
            {
                topic: "Enhanced Greenhouse Effect",
                outcomes: [
                    "Analyse data on global emissions and atmospheric temperatures to explain the enhanced greenhouse effect",
                    "Identify the advantages and limitations of methods used to reduce greenhouse gas emissions",
                    "Analyse data that shows the relationship between industrialisation and the rise in global temperatures"
                ]
            },
            {
                topic: "Impacts of Present Day Climate Change",
                outcomes: [
                    "Identify the characteristics of climate change",
                    "Investigate and report on the consequences of climate change",
                    "Investigate the effects of climate change on the water cycle and ecosystems"
                ]
            },
            {
                topic: "Satellite Monitoring and Global Data",
                outcomes: [
                    "Investigate how satellites collect global data, including data on ocean temperatures, sea levels, and forest and ice cover",
                    "Examine how this data is used to evaluate the impact of climate change"
                ]
            },
            {
                topic: "Alternative Resource Use",
                outcomes: [
                    "Describe the causes of environmental pollution and discuss its implications",
                    "Discuss alternatives to the current resource use, including how to reduce, reuse and recycle",
                    "Describe current processes for recycling materials"
                ]
            },
            {
                topic: "Indigenous Sustainable Practices",
                outcomes: [
                    "Research how Aboriginal and Torres Strait Islander Peoples have developed sustainable harvesting practices and Cultural protocols based on deep ecological understandings"
                ]
            },
            {
                topic: "Innovation in Recycling and Resource Management",
                outcomes: [
                    "Investigate how scientists have developed innovative ways to recycle materials",
                    "Discuss the link between human activity and one specific environmental pollution concern"
                ]
            },
            {
                topic: "Test",
                outcomes: ["Assessment of all Term 4 content"]
            },
            {
                topic: "Review",
                outcomes: ["Feedback and reflection on Term 4 learning"]
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

/* =========================
   Page Component
========================= */

export default function Year9SciencePage() {
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
                            <li className="text-[#5E5574]">Year 9 Science</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Syllabus Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 9 Science
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
            <TextbookPreviewScience />


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
                            for Stage 5, covering all outcomes for Year 9 students. Content is
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
