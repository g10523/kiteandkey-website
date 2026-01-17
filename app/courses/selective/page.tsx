"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Brain, Clock, ArrowRight } from "lucide-react";

export default function SelectivePage() {
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
                            <li className="text-[#5E5574]">Selective Preparation</li>
                        </ol>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD4F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B647F] backdrop-blur-sm mb-6">
                        <Clock className="w-4 h-4 text-[#8B7FA8]" />
                        Coming Soon
                    </div>

                    <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3F3A52]">
                        Selective School Preparation
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#6B647F] leading-relaxed">
                        Comprehensive preparation for{" "}
                        <span className="text-[#5E5574] font-medium">Selective High School</span> entrance exams —
                        building the skills and confidence needed for success.
                    </p>

                    {/* Coming Soon Message */}
                    <div className="mt-12 rounded-2xl border-2 border-[#D9CFF2] bg-gradient-to-br from-[#F7F5FB] to-white p-8">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5E5574] to-[#7C6B94] text-white">
                                <Brain size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-[#3F3A52] mb-2">
                                    Launching Soon
                                </h3>
                                <p className="text-[#6B647F] leading-relaxed mb-4">
                                    We're developing a comprehensive Selective School preparation program for Years 5 and 6 students.
                                    Our curriculum will cover all aspects of the entrance exam including:
                                </p>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-start gap-2 text-[#6B647F]">
                                        <span className="text-[#5E5574] mt-1">•</span>
                                        <span>Mathematical reasoning and problem-solving</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-[#6B647F]">
                                        <span className="text-[#5E5574] mt-1">•</span>
                                        <span>Reading comprehension and critical thinking</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-[#6B647F]">
                                        <span className="text-[#5E5574] mt-1">•</span>
                                        <span>Writing skills and creative composition</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-[#6B647F]">
                                        <span className="text-[#5E5574] mt-1">•</span>
                                        <span>Thinking skills and general ability</span>
                                    </li>
                                </ul>
                                <p className="text-[#6B647F] leading-relaxed mb-6">
                                    Interested in being notified when this program launches? Get in touch with us.
                                </p>
                                <Link
                                    href="/consultation"
                                    className="inline-flex items-center gap-2 text-[#5E5574] font-semibold hover:text-[#4F4865] transition-colors group"
                                >
                                    Book a Consultation
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Orange sticky line for Selective */}
            <div
                className={`h-1 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 ${isSticky ? 'fixed top-[72px] left-0 right-0 z-40' : 'relative'
                    }`}
            />

            {/* ================= WHAT TO EXPECT ================= */}
            <section className="py-24 bg-white border-t border-[#E6E1F2]">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-16">
                        <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
                            What to Expect
                        </p>
                        <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52]">
                            Designed for selective success
                        </h2>
                        <p className="mt-4 text-[#6B647F] max-w-2xl mx-auto">
                            Our program will be tailored to the specific requirements of NSW Selective High School entrance exams.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {[
                            {
                                title: "Exam-Focused Curriculum",
                                description: "Structured preparation aligned with the format and content of selective school entrance exams."
                            },
                            {
                                title: "Practice Under Conditions",
                                description: "Regular timed practice tests to build familiarity and confidence with exam conditions."
                            },
                            {
                                title: "Personalized Learning",
                                description: "MindPrint cognitive profiling to identify strengths and areas for targeted improvement."
                            },
                            {
                                title: "Expert Guidance",
                                description: "Experienced educators who understand the selective school system and exam requirements."
                            }
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-2xl border border-[#E6E1F2] bg-gradient-to-br from-white to-[#FAFAFA] p-6"
                            >
                                <h3 className="text-lg font-bold text-[#3F3A52] mb-2">
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

            {/* ================= CTA ================= */}
            <section className="py-24 border-t border-[#E6E1F2]">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="rounded-3xl border-2 border-[#D9CFF2] bg-gradient-to-br from-[#F7F5FB] via-white to-[#FAFAFA] p-10 md:p-14 text-center shadow-xl">
                        <h3 className="font-julius text-3xl md:text-4xl text-[#3F3A52]">
                            Interested in selective preparation?
                        </h3>

                        <p className="mt-4 text-lg text-[#6B647F] max-w-lg mx-auto">
                            Book a free consultation to discuss your child's goals and how we can help them prepare for selective school success.
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/consultation"
                                className="group inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/20 hover:-translate-y-0.5"
                            >
                                Book Free Consultation
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/courses"
                                className="rounded-xl border border-[#D9CFF2] bg-white px-8 py-4 text-base font-semibold text-[#5E5574] transition-all hover:border-[#5E5574]/30 hover:bg-[#F7F5FB] hover:-translate-y-0.5"
                            >
                                View Other Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
