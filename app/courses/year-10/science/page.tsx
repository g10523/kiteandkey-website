"use client";

import { useState } from "react";
import Link from "next/link";
import TextbookPreview from "../../../../components/TextbookPreview";
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
        title: "Reactions",
        subtitle: "Understanding chemical and nuclear reactions",
        lessons: [
            {
                topic: "The Law of Conservation of Mass",
                outcomes: [
                    "Explain the meaning of the law of conservation of mass",
                    "Conduct a practical investigation to demonstrate the law of conservation of mass in a chemical reaction",
                    "Investigate and explain how mass is conserved in closed systems"
                ]
            },
            {
                topic: "Writing Chemical Formulas",
                outcomes: [
                    "Use IUPAC naming conventions to construct the chemical formula for common ionic and covalent compounds",
                    "Represent chemical reactions, by predicting products and writing word and balanced chemical equations with states",
                    "Model simple chemical reactions to show that atoms are rearranged and mass is conserved during a reaction"
                ]
            },
            {
                topic: "Features of a Reaction",
                outcomes: [
                    "Determine the features of reactions by conducting synthesis, decomposition, displacement and neutralisation reactions",
                    "Identify pH as the measure of acidity and compare the pH of a range of common substances to the pH of pure water",
                    "Use pH indicators or meters to measure the pH change of neutralisation reactions"
                ]
            },
            {
                topic: "Rates of Chemical Reactions",
                outcomes: [
                    "Investigate and explain how concentration, surface area, temperature and catalysts affect the rate of reactions",
                    "Conduct a practical investigation to test a measurable hypothesis with a cause-and-effect relationship",
                    "Graph data that communicates the investigation findings in a scientific report"
                ]
            },
            {
                topic: "Nuclear Reactions Part 1",
                outcomes: [
                    "Describe the conditions that cause a nucleus to be unstable"
                ]
            },
            {
                topic: "Nuclear Reactions Part 2",
                outcomes: [
                    "Represent alpha and beta reactions as nuclear reactions",
                    "Describe nuclear fission and nuclear fusion"
                ]
            },
            {
                topic: "Applications of Radioisotopes",
                outcomes: [
                    "Evaluate the societal benefits and considerations of using radioisotopes in medicine, industry and environmental monitoring"
                ]
            },
            {
                topic: "Reactions in Context",
                outcomes: [
                    "Investigate a chemical or nuclear reaction used in industry to produce an important product",
                    "Outline the impacts on the environment of nuclear reactions, including raw materials, production stages and nuclear waste"
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
        title: "Personal Genetics and Evolutionary Change",
        subtitle: "Exploring DNA, inheritance, and evolution",
        lessons: [
            {
                topic: "Genetic Information in Living Things",
                outcomes: [
                    "Identify that all organisms have information coded in genetic material",
                    "Observe and model the arrangement of genetic information to define and compare DNA, gene, chromosome and genome"
                ]
            },
            {
                topic: "DNA structure, function and discovery",
                outcomes: [
                    "Relate the structure of the DNA double helix to its functions",
                    "Discuss the nature of scientific discovery by comparing the contributions of scientists involved in the discovery of DNA structure"
                ]
            },
            {
                topic: "Inheritance and Source of Variation",
                outcomes: [
                    "Outline how genetic information is passed on to offspring by sexual and asexual reproduction",
                    "Identify that multiple genes and multiple environmental factors interact in the development of most traits",
                    "Explain how DNA mutation can result in genetic variation with beneficial, harmful or minimal effects"
                ]
            },
            {
                topic: "Predicting Inheritance Patterns",
                outcomes: [
                    "Outline the connection between genotypes and phenotypes, using Mendelian inheritance for both plants and animals",
                    "Use pedigrees and Punnett squares to model monogenic gene-trait relationships and make predictions about inheritance patterns"
                ]
            },
            {
                topic: "Genetic Technologies and their Applications",
                outcomes: [
                    "Identify examples of current and emerging genetic technologies",
                    "Discuss applications of genetic technologies in conservation, agriculture, industry and medicine"
                ]
            },
            {
                topic: "Genetic Testing and Ethical Implications",
                outcomes: [
                    "Discuss the applications of genetic testing and its associated social, economic and ethical implications",
                    "Use an ethical framework to construct evidence-based written arguments about the implications of genetic technology"
                ]
            },
            {
                topic: "Evolution by Natural Selection",
                outcomes: [
                    "Explain how the processes of natural selection and isolation can lead to changes within and between species",
                    "Investigate, using evidence, how the complexity and diversity of organisms have changed over geological timescales"
                ]
            },
            {
                topic: "Developing the Theory of Evolution in Context",
                outcomes: [
                    "Identify and discuss Aboriginal and/or Torres Strait Islander Peoples' artwork that indicate changes in plants and animals",
                    "Discuss how scientists developed and refined the theory of evolution"
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
        title: "Waves and Motion",
        subtitle: "Understanding wave properties and the physics of motion",
        lessons: [
            {
                topic: "Introduction to Waves",
                outcomes: [
                    "Demonstrate that a mechanical wave requires a medium to travel through, while an electromagnetic wave does not",
                    "Use the wave model to explain how energy is transferred without the net transfer of particles"
                ]
            },
            {
                topic: "Wave Properties and Electromagnetic Spectrum",
                outcomes: [
                    "Use models to compare and describe the features of transverse and longitudinal waves",
                    "Compare the different wave regions of the electromagnetic spectrum",
                    "Investigate the features of waves, including amplitude, frequency, speed and wavelength",
                    "Use the formula v = fλ to explain the relationship between a wave's frequency, speed and wavelength",
                    "Analyse data from secondary sources to compare the uses of different EM waves based on their properties"
                ]
            },
            {
                topic: "Sound Waves",
                outcomes: [
                    "Model the transfer of sound energy as compressions and rarefactions in waves",
                    "Investigate and describe how amplitude and frequency affect the pitch and volume of sound",
                    "Investigate the Doppler effect of waves",
                    "Describe how the ear responds to sound waves",
                    "Investigate the impact of material selection on sound transfer in Aboriginal and Torres Strait Islander musical instruments",
                    "Describe how sound waves are used in medical diagnosis"
                ]
            },
            {
                topic: "Light Waves",
                outcomes: [
                    "Describe how the eye responds to light",
                    "Investigate the properties of light, including absorption, reflection, refraction and scattering",
                    "Investigate applications of absorption, reflection and refraction in everyday life",
                    "Explain how the electromagnetic spectrum is used to learn about stars"
                ]
            },
            {
                topic: "Motion: Speed and Velocity",
                outcomes: [
                    "Conduct an investigation to analyse the relationships between distance, time, speed, displacement and velocity",
                    "Investigate the motion of objects and represent them using motion diagrams",
                    "Draw and analyse a line graph of investigation results"
                ]
            },
            {
                topic: "Motion: Force and Acceleration",
                outcomes: [
                    "Conduct an investigation to analyse the relationships between force, mass and acceleration",
                    "Investigate applications of Newton's laws of motion",
                    "Determine, using vector analysis, the net force on an object in one dimension"
                ]
            },
            {
                topic: "Mathematical Representations in Motion",
                outcomes: [
                    "Use mathematical representations, including graphs and algebraic formulas, to quantitatively relate force, distance, time, speed, displacement, acceleration, velocity and mass"
                ]
            },
            {
                topic: "Waves and Motion in Context",
                outcomes: [
                    "Structure an argument to analyse how waves and motion have changed society"
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
        title: "Data Science",
        subtitle: "Developing scientific literacy and data analysis skills",
        lessons: [
            {
                topic: "Investigable Claims and Scientific Claims",
                outcomes: [
                    "Discuss the features of investigable and non-investigable questions, including considerations of available resources",
                    "Identify a claim that can be scientifically tested with an investigation to test the claim"
                ]
            },
            {
                topic: "Verifying Scientific Knowledge",
                outcomes: [
                    "Investigate how scientific knowledge is verified and refined by scientists through hypothesis testing and peer review",
                    "Explain the evidence and reasoning used to support conclusions about claims, using data from investigations"
                ]
            },
            {
                topic: "Evaluating Online Information",
                outcomes: [
                    "Develop criteria and use them to evaluate whether online content is valid and reliable"
                ]
            },
            {
                topic: "Pseudoscience and Media Claims",
                outcomes: [
                    "Explain the distinction between science and pseudoscience using examples",
                    "Identify examples of pseudoscientific claims",
                    "Investigate incidences of pseudoscience in popular media"
                ]
            },
            {
                topic: "Manipulation of Data",
                outcomes: [
                    "Investigate how data, or its analysis and interpretation, can be distorted to manipulate findings",
                    "Determine if an assertion of a claim or theory is pseudoscientific"
                ]
            },
            {
                topic: "Introduction to Large Datasets",
                outcomes: [
                    "Outline the features, collection, uses and applications of large datasets",
                    "Recognise the difference between causal and correlational relationships"
                ]
            },
            {
                topic: "Analysing Large Datasets",
                outcomes: [
                    "Use available large datasets to develop and test a question",
                    "Conduct a descriptive analysis of a large dataset",
                    "Identify and outline the benefits of using descriptive statistical analysis techniques"
                ]
            },
            {
                topic: "Scientific Argumentation using data",
                outcomes: [
                    "Conduct a univariate analysis and a bivariate analysis using large datasets",
                    "Explore the role of large datasets and statistical analysis in validating scientific findings",
                    "Conduct a written scientific argument showing how a range of evidence supports a claim",
                    "Use data to make evidence-based decisions about a familiar issue and assess the implications"
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

export default function Year10SciencePage() {
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
                            <li className="text-[#5E5574]">Year 10 Science</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7FA8]" />
                        NSW Syllabus Aligned
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Year 10 Science
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
                            for Stage 5, covering all outcomes for Year 10 students. Content is
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
