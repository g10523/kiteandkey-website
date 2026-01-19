"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

export default function HeroWithImage() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7F5FB] via-white to-[#FAFBFF]" />

            {/* Floating orbs */}
            <div className="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-[#E6E1F2]/40 blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-1/4 h-80 w-80 rounded-full bg-[#DDD4F2]/30 blur-3xl animate-pulse delay-1000" />

            {/* Content */}
            <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                >
                    {/* Left: Text Content */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col"
                    >
                        <motion.div variants={fadeInUp} className="mb-8">
                            <span className="inline-block py-1.5 px-4 rounded-full border border-[#D9CFF2] bg-white/40 backdrop-blur-md text-xs tracking-[0.2em] font-medium uppercase text-[#8B7FA8] shadow-sm">
                                NSW Tutoring
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1 variants={fadeInUp} className="font-julius text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] text-[#3F3A52] tracking-tight">
                            Clarity precedes <br />
                            <span className="italic relative z-10">
                                confidence.
                                <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-4 text-[#D9CFF2]/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="mt-8 max-w-2xl text-lg md:text-xl text-[#6B647F] font-light leading-relaxed">
                            We replace academic anxiety with calm, predictable progress.
                            Structured mentorship for Years 5–10 that builds systems, not just results.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap items-center gap-4">
                            <Link
                                href="/enrol"
                                className="group relative px-8 py-4 bg-[#5E5574] text-white rounded-full font-medium transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/20 hover:-translate-y-0.5"
                            >
                                Start Your Journey
                                <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/key-method"
                                className="group relative px-8 py-4 bg-transparent text-[#5E5574] rounded-full font-medium border border-[#D9CFF2] transition-all hover:bg-white/60 hover:shadow-md hover:-translate-y-0.5"
                            >
                                The Philosophy
                            </Link>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            variants={fadeInUp}
                            className="mt-12 flex flex-wrap items-center gap-6"
                        >
                            <div className="inline-flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5E5574] text-xs font-semibold text-white ring-2 ring-white">
                                        PP
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B5F85] text-xs font-semibold text-white ring-2 ring-white">
                                        IL
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C6B94] text-xs font-semibold text-white ring-2 ring-white">
                                        AJ
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-xs font-medium text-[#6B647F]">Trusted by families</span>
                                </div>
                            </div>

                            <div className="hidden md:block w-[1px] h-8 bg-[#E6E0F2]" />

                            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#6B647F]">
                                <svg className="w-3.5 h-3.5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                NSW Syllabus Aligned
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Right: Hero Image */}
                    <motion.div
                        variants={fadeInUp}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#5E5574]/10 border border-[#E6E0F2]">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                                    alt="Students collaborating and learning together in a bright, supportive environment"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#5E5574]/5 to-transparent" />
                            </div>
                        </div>

                        {/* Floating achievement badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl border border-[#E6E0F2] p-5 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#5E5574] to-[#7C6B94]">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#3F3A52]">95%</div>
                                    <div className="text-xs text-[#6B647F]">Student success</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
