"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, BookOpen, Brain, Moon, Zap, Target, CheckCircle2 } from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export default function HowToGetSmarterArticle() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F7F5FB] via-white to-[#FAFBFF]">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-[#E6E0F2] bg-white/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/articles" className="group inline-flex items-center gap-2 text-sm font-medium text-[#5E5574] transition-colors hover:text-[#3F3A52]">
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Articles
                        </Link>
                        <button className="inline-flex items-center gap-2 rounded-full border border-[#E6E0F2] bg-white px-4 py-2 text-sm font-medium text-[#5E5574] transition-all hover:border-[#D9CFF2] hover:bg-[#F7F5FB]">
                            <Share2 className="h-4 w-4" />
                            Share
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-[#E6E0F2] py-16 md:py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7F5FB] via-white to-[#FAFBFF]" />
                <div className="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-[#E6E1F2]/30 blur-3xl" />

                <div className="relative mx-auto max-w-4xl px-6">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center"
                    >
                        {/* Category Badge */}
                        <motion.div variants={fadeInUp} className="mb-6">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#5E5574]">
                                <Brain className="h-3.5 w-3.5" />
                                Learning Science
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={fadeInUp}
                            className="font-julius text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-[#3F3A52] tracking-tight mb-6"
                        >
                            How to Get Smarter
                            <span className="block mt-2 text-3xl md:text-5xl lg:text-6xl italic text-[#6B647F]">
                                (Backed by Data, Not Vibes)
                            </span>
                        </motion.h1>

                        {/* Meta Info */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#6B647F]"
                        >
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>January 19, 2026</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>8 min read</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                <span>Evidence-Based</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="relative -mt-8 mb-16">
                <div className="mx-auto max-w-5xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative overflow-hidden rounded-3xl border border-[#E6E0F2] shadow-2xl"
                    >
                        <div className="aspect-[21/9] relative">
                            <Image
                                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80"
                                alt="Student studying with focus and determination"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#3F3A52]/20 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <article className="mx-auto max-w-3xl px-6 pb-24">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="prose prose-lg max-w-none"
                >
                    {/* Introduction */}
                    <motion.div variants={fadeInUp} className="mb-12">
                        <p className="text-xl leading-relaxed text-[#3F3A52] font-light">
                            Getting smarter isn't about "IQ hacks." It's about <strong className="font-semibold text-[#5E5574]">improving the inputs that shape learning</strong>: attention, memory, understanding, and consistent practice. The good news: the highest-impact levers are surprisingly practical.
                        </p>
                    </motion.div>

                    {/* Section: The 5 Levers */}
                    <motion.div variants={fadeInUp} className="mb-16">
                        <h2 className="font-julius text-3xl md:text-4xl font-light text-[#3F3A52] mb-8 flex items-center gap-3">
                            <Zap className="h-8 w-8 text-[#5E5574]" />
                            The 5 Levers That Actually Work
                        </h2>

                        {/* Lever 1: Sleep */}
                        <div className="mb-10 rounded-2xl border border-[#E6E0F2] bg-white p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5E5574] to-[#7C6B94]">
                                    <Moon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-[#3F3A52] mb-2">1. Sleep: Fix Sleepiness First</h3>
                                    <p className="text-[#6B647F] leading-relaxed">
                                        A large meta-analysis of children and adolescents found that sleep variables are significantly but modestly related to school performance, with the strongest link coming from <strong>daytime sleepiness</strong> (more sleepiness → worse performance), followed by sleep quality, then sleep duration.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 rounded-xl bg-[#F7F5FB] p-6">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E5574] mb-3">What the Data Shows</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#6B647F]">Sleepiness vs performance</span>
                                        <span className="font-mono font-semibold text-[#3F3A52]">r = −0.133</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#6B647F]">Sleep quality vs performance</span>
                                        <span className="font-mono font-semibold text-[#3F3A52]">r = 0.096</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#6B647F]">Sleep duration vs performance</span>
                                        <span className="font-mono font-semibold text-[#3F3A52]">r = 0.069</span>
                                    </div>
                                </div>
                                <p className="mt-4 text-xs text-[#8B7FA8] italic">
                                    Translation: don't just chase "more hours" — chase better sleep that reduces daytime grogginess.
                                </p>
                            </div>
                        </div>

                        {/* Lever 2: Retrieval Practice */}
                        <div className="mb-10 rounded-2xl border border-[#E6E0F2] bg-white p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5E5574] to-[#7C6B94]">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-[#3F3A52] mb-2">2. Retrieval Practice: Test Yourself to Learn Faster</h3>
                                    <p className="text-[#6B647F] leading-relaxed">
                                        If you read notes again and again, you feel smart… until the test. The best students do the opposite: they <strong>pull information out of memory</strong> repeatedly.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5E5574]">Practical Versions</h4>
                                {[
                                    "Flashcards where you answer first, then check",
                                    "Closed-book mini quizzes after each section",
                                    "Past-paper questions with feedback"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[#5E5574] shrink-0 mt-0.5" />
                                        <span className="text-[#6B647F]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lever 3: Distributed Practice */}
                        <div className="mb-10 rounded-2xl border border-[#E6E0F2] bg-white p-8">
                            <h3 className="text-2xl font-semibold text-[#3F3A52] mb-3">3. Distributed Practice: Stop Cramming, Start Spacing</h3>
                            <p className="text-[#6B647F] leading-relaxed mb-6">
                                Spacing works because every time you return to an idea after time has passed, you're strengthening the memory trace and the ability to retrieve it under pressure.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="rounded-xl bg-[#F7F5FB] p-5">
                                    <div className="text-3xl font-bold text-[#5E5574] mb-1">20–35 min</div>
                                    <div className="text-sm text-[#6B647F]">Daily sessions instead of marathons</div>
                                </div>
                                <div className="rounded-xl bg-[#F7F5FB] p-5">
                                    <div className="text-sm font-semibold text-[#5E5574] mb-2">Weekly Loop</div>
                                    <div className="text-xs text-[#6B647F]">Learn → Quiz → Revisit → Quiz → Mixed Review</div>
                                </div>
                            </div>
                        </div>

                        {/* Lever 4 & 5 - Compact */}
                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            <div className="rounded-2xl border border-[#E6E0F2] bg-white p-6">
                                <h3 className="text-xl font-semibold text-[#3F3A52] mb-2">4. Exercise</h3>
                                <p className="text-sm text-[#6B647F] leading-relaxed">
                                    Your brain's "upgrade button." Exercise interventions show meaningful improvement in executive function (planning, inhibition, working memory).
                                </p>
                            </div>
                            <div className="rounded-2xl border border-[#E6E0F2] bg-white p-6">
                                <h3 className="text-xl font-semibold text-[#3F3A52] mb-2">5. Mindfulness</h3>
                                <p className="text-sm text-[#6B647F] leading-relaxed">
                                    Small-to-moderate gains in attention and working memory. Think of it as attention training that reduces mental noise.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* The System */}
                    <motion.div variants={fadeInUp} className="mb-16">
                        <h2 className="font-julius text-3xl md:text-4xl font-light text-[#3F3A52] mb-8">
                            The "Smarter" System: A Simple Weekly Plan
                        </h2>

                        <div className="space-y-6">
                            {/* Daily */}
                            <div className="rounded-2xl border-2 border-[#D9CFF2] bg-gradient-to-br from-white to-[#F7F5FB] p-8">
                                <h3 className="text-xl font-semibold text-[#5E5574] mb-4">Daily (Mon–Fri)</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-[#5E5574] flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-white text-xs font-bold">1</span>
                                        </div>
                                        <div>
                                            <strong className="text-[#3F3A52]">Sleep routine:</strong>
                                            <span className="text-[#6B647F]"> Consistent wake time; 60 minutes screen-off before bed</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-[#5E5574] flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-white text-xs font-bold">2</span>
                                        </div>
                                        <div>
                                            <strong className="text-[#3F3A52]">Study (30–60 min):</strong>
                                            <span className="text-[#6B647F]"> Practice testing + spacing</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-[#5E5574] flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-white text-xs font-bold">3</span>
                                        </div>
                                        <div>
                                            <strong className="text-[#3F3A52]">5–10 min mindfulness:</strong>
                                            <span className="text-[#6B647F]"> Breath focus or body scan</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* 3x per week */}
                            <div className="rounded-2xl border border-[#E6E0F2] bg-white p-6">
                                <h3 className="text-lg font-semibold text-[#5E5574] mb-3">3× per week</h3>
                                <p className="text-[#6B647F]">
                                    <strong className="text-[#3F3A52]">Exercise:</strong> 30–45 minutes (sport, intervals, circuits, or cognitively engaging games)
                                </p>
                            </div>

                            {/* Weekly */}
                            <div className="rounded-2xl border border-[#E6E0F2] bg-white p-6">
                                <h3 className="text-lg font-semibold text-[#5E5574] mb-3">Weekly (1×)</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-[#5E5574] shrink-0 mt-0.5" />
                                        <span className="text-[#6B647F]"><strong className="text-[#3F3A52]">Mixed review:</strong> Random mix of old topics</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-[#5E5574] shrink-0 mt-0.5" />
                                        <span className="text-[#6B647F]"><strong className="text-[#3F3A52]">Error log:</strong> Write mistakes + fix + retest 48 hours later</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Checklist */}
                    <motion.div variants={fadeInUp} className="mb-16">
                        <div className="rounded-3xl border-2 border-[#5E5574] bg-gradient-to-br from-[#F7F5FB] to-white p-8 md:p-10">
                            <h2 className="font-julius text-2xl md:text-3xl font-light text-[#3F3A52] mb-6">
                                The "Smart" Checklist (So You Don't Waste Time)
                            </h2>
                            <p className="text-[#6B647F] mb-6">If you want smarter results, measure these 4 things:</p>

                            <div className="space-y-4">
                                {[
                                    { num: "1", title: "Sleepiness score", desc: "Are you alert in first two periods/classes?" },
                                    { num: "2", title: "Retrieval reps", desc: "How many questions did you answer from memory this week?" },
                                    { num: "3", title: "Spacing", desc: "Did you revisit old topics on 3+ separate days?" },
                                    { num: "4", title: "Error corrections", desc: "Did you correct and re-test mistakes?" }
                                ].map((item) => (
                                    <div key={item.num} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E6E0F2]">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5E5574] text-white font-bold">
                                            {item.num}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#3F3A52]">{item.title}</div>
                                            <div className="text-sm text-[#6B647F]">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-6 text-sm text-[#6B647F] italic">
                                If you track these, you'll outpace 90% of learners who "study" without feedback loops.
                            </p>
                        </div>
                    </motion.div>

                    {/* Key Takeaway */}
                    <motion.div variants={fadeInUp} className="mb-16">
                        <div className="rounded-2xl bg-gradient-to-br from-[#5E5574] to-[#7C6B94] p-8 md:p-10 text-white">
                            <h2 className="font-julius text-2xl md:text-3xl font-light mb-4">The Bottom Line</h2>
                            <p className="text-lg leading-relaxed text-white/90">
                                Effect sizes in learning and cognition are often small-to-moderate, but they compound because they improve how often you show up, how well you focus, and how efficiently you encode/recall information.
                            </p>
                            <p className="mt-4 text-xl font-semibold">
                                Tiny upgrades, repeated daily, beat rare motivation bursts.
                            </p>
                        </div>
                    </motion.div>

                    {/* References */}
                    <motion.div variants={fadeInUp} className="border-t border-[#E6E0F2] pt-8">
                        <h3 className="text-lg font-semibold text-[#5E5574] mb-4">References</h3>
                        <ul className="space-y-2 text-sm text-[#6B647F]">
                            <li>• Dewald et al. (2010). <em>Sleep quality, sleep duration, sleepiness and school performance: meta-analysis.</em></li>
                            <li>• Dunlosky et al. (2013). <em>Improving Students' Learning with Effective Learning Techniques.</em></li>
                            <li>• Li et al. (2025). <em>Exercise and cognitive function in children/adolescents (meta-analysis).</em></li>
                            <li>• Zainal & Newman (2023). <em>Mindfulness-based interventions and cognition (meta-analysis of 111 RCTs).</em></li>
                        </ul>
                    </motion.div>
                </motion.div>
            </article>

            {/* CTA Section */}
            <section className="border-t border-[#E6E0F2] bg-gradient-to-br from-[#F7F5FB] to-white py-16">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="font-julius text-3xl md:text-4xl font-light text-[#3F3A52] mb-4">
                        Want to Apply These Strategies?
                    </h2>
                    <p className="text-lg text-[#6B647F] mb-8 max-w-2xl mx-auto">
                        At Kite & Key, we build these evidence-based learning systems into every student's personalized plan.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/consultation"
                            className="inline-flex items-center gap-2 rounded-full bg-[#5E5574] px-8 py-4 text-white font-medium shadow-lg transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Book a Free Consultation
                            <ArrowLeft className="h-4 w-4 rotate-180" />
                        </Link>
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white px-8 py-4 text-[#5E5574] font-medium transition-all hover:bg-[#F7F5FB] hover:-translate-y-0.5"
                        >
                            More Articles
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
