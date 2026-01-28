'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Mail } from 'lucide-react'
import { ExplorationFunnelDiagram, LearningFlywheelDiagram, BalancedLifeWheelDiagram, MedicineTimeline } from '@/components/articles/starting-early-for-medicine/Diagrams'

export default function ArticlePage() {
    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [0, 50])

    return (
        <main className="min-h-screen bg-[#FDFBF9] selection:bg-[#E6E0F5] selection:text-[#3F3A52]">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300">
                <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-medium text-[#5E5574]/80 hover:text-[#3F3A52] transition-colors backdrop-blur-md bg-white/30 px-4 py-2 rounded-full border border-white/40 shadow-sm">
                    <ArrowLeft size={16} /> Back to Articles
                </Link>
            </nav>

            {/* Hero Section */}
            <header className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-[#3F3A52] via-[#5E5574] to-[#4A4358]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="order-2 md:order-1"
                        >
                            <h1 className="font-julius text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                                Starting Early<br />for Medicine
                            </h1>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100px" }}
                                transition={{ delay: 0.8, duration: 1.2 }}
                                className="h-px bg-white/60 mb-6"
                            />

                            <h2 className="text-xl md:text-2xl text-white/90 font-light tracking-wide mb-8">
                                What actually matters in Years 5–10
                            </h2>

                            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm tracking-wide font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} /> 8 min read
                                </div>
                                <span className="text-white/40">•</span>
                                <span>Academic Strategy</span>
                            </div>
                        </motion.div>

                        {/* Right Column - Photo Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="order-1 md:order-2"
                        >
                            <div className="relative group">
                                {/* Glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

                                {/* Card */}
                                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                                    {/* Image */}
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <Image
                                            src="/articles/starting-early-for-medicine/hero.jpg"
                                            alt="Mia Ooi, Doctor of Medicine Student"
                                            fill
                                            className="object-cover object-center"
                                            priority
                                            quality={95}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    </div>

                                    {/* Author Info Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden bg-white/10">
                                                <Image
                                                    src="/articles/starting-early-for-medicine/hero.jpg"
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                    alt="Mia Ooi"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-sm">Mia Ooi</p>
                                                <p className="text-white/80 text-xs">Doctor of Medicine, USYD</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">

                {/* Intro */}
                <Section>
                    <p className="text-xl md:text-2xl leading-relaxed text-[#3F3A52]/90 font-light mb-8 first-letter:text-5xl first-letter:font-julius first-letter:mr-2 first-letter:float-left">
                        Hi! My name is Mia Ooi and I’m currently studying a Doctor of Medicine at the University of Sydney.
                    </p>
                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        Originally a Melbourne girl, I absolutely love athletics and running, playing my violin, camping and hiking, and organising all sorts of social events with friends and uni mates. Through my tutoring, I also love teaching high school students how to thrive not just academically, but also how to enjoy their time in school and make the most of it.
                    </p>
                    <p className="text-[#6B647F] leading-relaxed font-medium">
                        If you’re currently in school, wondering how to maximise your time, and possibly interested in a career in medicine, here is some VIP insider advice – so read on!
                    </p>
                </Section>

                <Divider />

                {/* Section 1 */}
                <Section>
                    <span className="text-xs font-bold text-[#8C84A8] uppercase tracking-widest mb-2 block">The Diagnosis</span>
                    <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-8">Do You Actually Want Medicine — or Do You Just Like Grey’s Anatomy?</h2>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        Deciding whether you want to pursue medicine whilst in school can be a big dilemma, considering how young you are to be locking yourself into a career that demands such devotion and commitment.
                    </p>
                    <p className="text-[#6B647F] leading-relaxed mb-8">
                        As a student looking to contribute positively to the world, the best thing you can do for yourself is expose yourself to as many opportunities as possible. <strong>Instead of questioning <em>why</em> you want to do medicine, spend more time exploring everything else the world has to offer.</strong> Use that exploration to confirm your drive and passion for medicine – or you may even find something else you would love to pursue. At that point, it becomes about the lifestyle and what you envision your daily life to be.
                    </p>

                    <div className="bg-[#FAF9FC] border border-[#E6E0F5] p-8 rounded-2xl my-8">
                        <p className="text-[#5E5574] leading-relaxed italic mb-4">
                            "This is where you can reach out to any healthcare practitioners you know (not just doctors). Ask nurses, physios, occupational therapists, paramedics, and doctors what their lives look like."
                        </p>
                        <p className="text-[#6B647F] leading-relaxed text-sm">
                            If possible, ask if you can observe their work and shadow them for the day. Most people will be more than happy to facilitate these opportunities for someone who shows a genuine and keen interest – just don’t be afraid to ask!
                        </p>
                    </div>

                    <h3 className="font-julius text-xl text-[#3F3A52] mt-12 mb-6">How do you actually do this?</h3>
                    <ul className="space-y-4">
                        {[
                            { title: "Take a variety of subjects", text: "Don't just stick to STEM subjects geared towards medicine. Explore humanities, arts, and languages." },
                            { title: "Say YES to co-curriculars", text: "Music, sport, drama, debating, social justice! Make use of what your time at school has to offer." },
                            { title: "Talk to your family", text: "Ask aunts, uncles, cousins, and parents about their work. Be genuinely interested in what their day-to-day looks like." },
                            { title: "Cold email practitioners", text: "Don't be afraid to reach out to doctors and healthcare professionals from hospitals or local clinics." }
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 items-start">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E6E0F5] text-[#5E5574] flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                                <p className="text-[#6B647F] text-sm leading-relaxed">
                                    <strong className="text-[#3F3A52]">{item.title}</strong> – {item.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Section>

                <Divider />

                {/* Section 2 */}
                <Section>
                    <span className="text-xs font-bold text-[#8C84A8] uppercase tracking-widest mb-2 block">The Heart</span>
                    <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-8">Learning How to Learn (Not What to Learn)</h2>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        The academics! The part everyone stresses out about most. The biggest takeaway here is that it’s not about <em>how much</em> you learn or how much detail you learn. It’s about knowing <strong>how</strong> to learn and <strong>what</strong> the most important things are to learn.
                    </p>

                    <LearningFlywheelDiagram />

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        In Years 5-10, you aren't memorising the Krebs cycle for the HSC yet. This is your training ground. This is where you build the <em>systems</em> that will carry you through the high-pressure years later.
                    </p>

                    <blockquote className="border-l-2 border-[#5E5574] pl-6 my-8 py-2">
                        <p className="font-julius text-xl text-[#3F3A52] mb-2">"Aesthetic notes don’t create understanding — systems do."</p>
                    </blockquote>

                    <p className="text-[#6B647F] leading-relaxed">
                        Experiment with active recall. Try explaining a concept to your parents at dinner. If you can't explain it simply, you don't understand it well enough. Focus on understanding the core principles rather than rote memorisation.
                    </p>
                </Section>

                <Divider />

                {/* Section 3 */}
                <Section>
                    <span className="text-xs font-bold text-[#8C84A8] uppercase tracking-widest mb-2 block">The Balancing Act</span>
                    <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-8">Why Busy People Get More Done</h2>

                    <p className="text-[#6B647F] leading-relaxed mb-8">
                        There's a myth that the perfect medical student spends 24/7 in the library. In reality, the most successful students are often the ones juggling sports, music, and a social life. Why? Because they've learned the art of efficiency and resilience.
                    </p>

                    <BalancedLifeWheelDiagram />

                    <p className="text-[#6B647F] leading-relaxed mb-6 mt-8">
                        Your hobbies aren't distractions; they are your recharge stations. They teach you empathy, teamwork, and how to handle failure—skills that a textbook can never teach you but are essential for a doctor.
                    </p>
                </Section>

                <Divider />

                {/* Section 4 */}
                <Section>
                    <span className="text-xs font-bold text-[#8C84A8] uppercase tracking-widest mb-2 block">Pre-Op Time</span>
                    <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-8">Facing the UCAT, GAMSAT & Interviews</h2>

                    <p className="text-[#6B647F] leading-relaxed mb-8">
                        It’s easy to get overwhelmed by the alphabet soup of medical entry acronyms. But in the early years, preparation should be strategic, not reactive. You don't need to start doing practice questions in Year 7.
                    </p>

                    <MedicineTimeline />

                    <p className="text-[#6B647F] leading-relaxed">
                        Focus on building a wide vocabulary through reading. stay up to date with current affairs to help with interviews later. Enjoy the journey of learning, rather than fixating on the destination.
                    </p>
                </Section>

                <Divider />

                {/* Final Words */}
                <Section>
                    <div className="bg-[#FAF9FC] p-8 md:p-12 rounded-3xl text-center">
                        <h3 className="font-julius text-2xl text-[#3F3A52] mb-4">Final Words</h3>
                        <p className="text-[#6B647F] leading-relaxed mb-8 max-w-lg mx-auto">
                            There are multiple valid paths into medicine. Whether you get in straight from school or take a postgraduate route, what matters is your drive, your compassion, and your willingness to learn. Take a deep breath. You have time.
                        </p>

                        <div className="inline-flex flex-col items-center">
                            <span className="text-xs font-bold text-[#8C84A8] uppercase tracking-wider mb-2">Questions? Reach out to Mia</span>
                            <a href="mailto:mia.ooi.kl@gmail.com" className="inline-flex items-center gap-2 text-[#5E5574] font-medium hover:underline">
                                <Mail size={16} /> mia.ooi.kl@gmail.com
                            </a>
                        </div>
                    </div>
                </Section>

            </article>

            {/* Footer / More Articles */}
            <footer className="border-t border-[#E6E0F5] bg-white py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="font-julius text-2xl text-[#3F3A52] mb-12 text-center">More from Kite & Key</h3>
                    <div className="text-center text-[#8C84A8] text-sm">
                        No other articles yet.
                    </div>
                </div>
            </footer>
        </main>
    )
}

// Helpers
const Section = ({ children }: { children: React.ReactNode }) => (
    <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
    >
        {children}
    </motion.section>
)

const Divider = () => (
    <div className="flex items-center justify-center py-16 opacity-30">
        <div className="h-px w-24 bg-[#5E5574]" />
        <div className="mx-4 text-[#5E5574]">✦</div>
        <div className="h-px w-24 bg-[#5E5574]" />
    </div>
)
