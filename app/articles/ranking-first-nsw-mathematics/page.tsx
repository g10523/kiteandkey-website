'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';

export default function PhiloArticlePage() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="min-h-screen bg-white">
            {/* Back Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E6E0F5]">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <Link href="/articles" className="inline-flex items-center gap-2 text-[#5E5574] hover:text-[#3F3A52] transition-colors">
                        <ArrowLeft size={18} />
                        <span className="text-sm font-medium">Back to Articles</span>
                    </Link>
                </div>
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
                                Ranking 1st in NSW for Mathematics
                            </h1>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100px" }}
                                transition={{ delay: 0.8, duration: 1.2 }}
                                className="h-px bg-white/60 mb-6"
                            />

                            <h2 className="text-xl md:text-2xl text-white/90 font-light tracking-wide mb-8">
                                What actually made the difference
                            </h2>

                            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm tracking-wide font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} /> 7 min read
                                </div>
                                <span className="text-white/40">•</span>
                                <span>Academic Excellence</span>
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
                                            src="/articles/ranking-first-nsw-mathematics/hero.jpg"
                                            alt="Philo Daoud, 1st in NSW for Mathematics Extension 1"
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
                                                    src="/articles/ranking-first-nsw-mathematics/hero.jpg"
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                    alt="Philo Daoud"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-sm">Philo Daoud</p>
                                                <p className="text-white/80 text-xs">1st in NSW for Maths Ext 1 (2021)</p>
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
                        In 2021, I achieved 1st place in NSW for Mathematics Extension 1 (3 Unit) and 8th place for Mathematics Extension 2 (4 Unit).
                    </p>
                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        On paper, these results look clean and impressive. Most people think I had some natural talent or discovered some hidden trick. In reality, this came as a product of a long, sometimes frustrating and constantly fluctuating process that involved a lot of self-doubt, adjustment, and learning how to study mathematics properly.
                    </p>
                    <p className="text-[#6B647F] leading-relaxed font-medium">
                        What mattered most was the way I approached maths day after day, especially when progress wasn't obvious. Looking back now, everything that worked for me fits into three broad principles.
                    </p>
                </Section>

                <Divider />

                {/* Principle 1 */}
                <Section>
                    <span className="text-xs font-bold text-[#8C84A8] uppercase tracking-widest mb-2 block">Principle 1</span>
                    <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-8">Understanding the Maths — Not Just Doing the Maths</h2>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        One of the biggest mistakes I see students always make that honestly drives me crazy is equating success in maths with getting the right answer as quickly as possible. Yes, in hindsight this seems like a logical thought process. However, at Extension level, speed alone doesn't get you far. What matters is understanding, justification, and the ability to adapt when a question doesn't look familiar.
                    </p>

                    <div className="bg-[#FAF9FC] border border-[#E6E0F5] p-8 rounded-2xl my-8">
                        <p className="text-[#5E5574] leading-relaxed italic mb-4">
                            "I established a rule that I didn't truly understand something if I couldn't explain why it worked."
                        </p>
                        <p className="text-[#6B647F] leading-relaxed text-sm">
                            This required me to slow down, revise definitions again, and occasionally sit in perplexity for longer than I wanted to while others made "advances" on me. Although it wasn't always effective right away, it fundamentally altered my attitude to problem-solving.
                        </p>
                    </div>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        Math becomes versatile after you grasp the fundamental concepts. When a question is phrased differently or incorporates topics in novel ways, you cease freaking out. You reason your way through rather than looking for a method that you have committed to memory.
                    </p>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        Additionally, depth was significantly more important than quantity. I purposefully looked for challenging problems—those that make you consider, defend, and occasionally fail before achieving. Those questions trained my ability to stay calm under pressure and taught me how to break complex problems into manageable parts.
                    </p>

                    <p className="text-[#6B647F] leading-relaxed font-medium">
                        Over time, this approach made maths feel less like memorisation and more like logical problem-solving, which is exactly what Extension exams are designed to reward.
                    </p>
                </Section>

                <Divider />

                {/* Principle 2 */}
                <Section>
                    <span className="text-xs font-bold text-[#8C84A8] uppercase tracking-widest mb-2 block">Principle 2</span>
                    <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-8">Consistency and Discipline Beat Talent Every Time</h2>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        Nearly everyone in the room is competent at the Extension level. If most students weren't already proficient in maths, they wouldn't be enrolled in 3U or 4U. It's not intelligence that sets pupils apart; rather, it's what they do when the job becomes difficult. Those quiet moments no one notices.
                    </p>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        Early on, I deliberately chose to approach math as a subject that required constant focus rather than spurts of inspiration. On certain days, this meant concentrated, productive sessions where everything came together. On other days, it meant feeling as though nothing was happening while staring at an issue for an excessive amount of time. I discovered that I shouldn't overreact to either. I came to understand that mathematics progression is rarely linear.
                    </p>

                    <div className="bg-[#FAF9FC] border border-[#E6E0F5] p-8 rounded-2xl my-8">
                        <p className="text-[#5E5574] leading-relaxed italic">
                            "There was a quiet assurance that came with always showing up, no matter how I felt. Difficult subjects eventually ceased to be so daunting just by virtue of their familiarity. Even 'math anxiety' is frequently caused by unfamiliarity rather than difficulty."
                        </p>
                    </div>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        Exams were coming up, and I wasn't attempting to "get serious" all of a sudden. I was already accustomed to math. Because of this constancy, there were fewer surprises, less stress, and far greater confidence when taking tests.
                    </p>
                </Section>

                <Divider />

                {/* Principle 3 */}
                <Section>
                    <span className="text-xs font-bold text-[#8C84A8] uppercase tracking-widest mb-2 block">Principle 3</span>
                    <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-8">Training Like It Was an Exam, Not Just Studying for One</h2>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        Understanding and perfecting your knowledge of the content is obviously crucial. However, most people miss that it's just one aspect of doing well on an exam. Exams need to be approached as though they were their own skill set.
                    </p>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        My preparation was greatly aided by past papers, but not in a passive manner. I rigorously graded them while I seated them under time constraints. More significantly, I took the time to analyze errors. Not only did I want to know what went wrong, but also why.
                    </p>

                    <h3 className="font-julius text-xl text-[#3F3A52] mt-12 mb-6">Key Questions I Asked After Every Practice Exam</h3>
                    <ul className="space-y-4">
                        {[
                            { title: "Time management", text: "Did I spend too long on certain questions?" },
                            { title: "Careless algebra", text: "Were there simple calculation errors I could have avoided?" },
                            { title: "Misreading", text: "Did I misinterpret what the question was actually asking?" },
                            { title: "Understanding gaps", text: "Was there a fundamental concept I didn't fully grasp?" }
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 items-start">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E6E0F5] text-[#5E5574] flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                                <p className="text-[#6B647F] text-sm leading-relaxed">
                                    <strong className="text-[#3F3A52]">{item.title}</strong> – {item.text}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <p className="text-[#6B647F] leading-relaxed mb-6 mt-8">
                        Patterns began to appear, and if you recognize them, you can correct them. That procedure was significantly more beneficial than continuously posing fresh queries.
                    </p>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        I also focused heavily on how I communicated solutions. Clear structure, logical sequencing, and neat working matter much more than most students realize. Even when I wasn't completely confident in an answer, good communication often secured method marks. Those marks add up quickly at the top end.
                    </p>

                    <p className="text-[#6B647F] leading-relaxed font-medium">
                        By repeatedly simulating exam conditions, the real exams felt familiar rather than intimidating. I wasn't just prepared academically — I was comfortable with the process, the pressure, and the pacing.
                    </p>
                </Section>

                <Divider />

                {/* Final Thoughts */}
                <Section>
                    <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-8">Final Thoughts</h2>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        Ranking first wasn't the result of a single moment or a clever trick. It was the outcome of consistent effort, deep understanding, and deliberate preparation over time.
                    </p>

                    <div className="bg-gradient-to-br from-[#5E5574] to-[#4A4358] text-white p-8 rounded-2xl my-8">
                        <p className="text-lg leading-relaxed italic mb-4">
                            "If there's one thing I'd tell students aiming high in maths, it's to stop searching for shortcuts."
                        </p>
                        <p className="text-white/90 leading-relaxed text-sm">
                            Focus on building strong habits, invest in understanding rather than memorisation, and treat exams as a skill that can be trained. Progress might feel slow at times, but it compounds.
                        </p>
                    </div>

                    <p className="text-[#6B647F] leading-relaxed mb-6">
                        High-level maths is challenging, but it's also one of the most rewarding subjects when approached properly. With the right mindset and approach, exceptional results are far more achievable than they might initially seem.
                    </p>
                </Section>

            </article>

            {/* Author Bio */}
            <section className="border-t border-[#E6E0F5] bg-[#FAF9FC] py-16">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#E6E0F5]">
                                <Image
                                    src="/articles/ranking-first-nsw-mathematics/hero.jpg"
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full"
                                    alt="Philo Daoud"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#3F3A52] mb-2">Philo Daoud</h3>
                            <p className="text-sm text-[#6B647F] leading-relaxed">
                                Philo achieved 1st place in NSW for Mathematics Extension 1 and 8th place for Mathematics Extension 2 in 2021. He now tutors high-achieving students at Kite & Key Academy, helping them develop the deep understanding and exam strategies that lead to exceptional results.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Helper Components
function Section({ children }: { children: React.ReactNode }) {
    return <section className="mb-16">{children}</section>;
}

function Divider() {
    return <div className="my-16 h-px bg-gradient-to-r from-transparent via-[#E6E0F5] to-transparent" />;
}
