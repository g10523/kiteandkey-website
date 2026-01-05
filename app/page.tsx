"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Container from "../components/Container";
import MindPrintSection from "../components/MindPrintSection";
import KeishaReviews from "../components/KeishaReviews";
import Footer from "../components/Footer";
import { ArrowRight, BookOpen, Compass, Layers, Zap } from "lucide-react";

/* ==========================================
   ANIMATION VARIANTS
   ========================================== */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

/* ==========================================
   HOMEPAGE
   ========================================== */

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  // Parallax for background orbs
  const y1 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 400]);

  return (
    <div className="relative font-inter text-[#5E5574] selection:bg-[#D9CFF2] selection:text-[#3F3A52] overflow-x-hidden">

      {/* ==========================================
          GLOBAL ANIMATED BACKGROUND
          ========================================== */}
      <div className="fixed inset-0 z-0 w-full h-full max-h-screen bg-[#FAFAFA] overflow-hidden pointer-events-none">
        {/* Orb 1 - Top Left - Lavender */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#E6E0F5]/50 blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
            backgroundColor: ["rgba(230, 224, 245, 0.5)", "rgba(217, 207, 242, 0.5)", "rgba(230, 224, 245, 0.5)"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ y: y1 }}
        />

        {/* Orb 2 - Bottom Right - Cool Blue/White */}
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#D9CFF2]/40 blur-[100px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ y: y2 }}
        />

        {/* Orb 3 - Center - Warm Hue */}
        <motion.div
          className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#F1ECFA]/60 blur-[90px]"
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 30, -30, 0],
            opacity: [0.6, 0.4, 0.6]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ==========================================
          1. HERO — ATMOSPHERIC
          ========================================== */}
      <section className="relative min-h-screen flex items-center justify-center z-10">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-block py-1.5 px-4 rounded-full border border-[#D9CFF2] bg-white/40 backdrop-blur-md text-xs tracking-[0.2em] font-medium uppercase text-[#8B7FA8] shadow-sm">
                Learning Mentorship
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] text-[#3F3A52] tracking-tight">
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

            <motion.div variants={fadeInUp} className="mt-12 flex flex-col sm:flex-row gap-5 items-center">
              <Link
                href="/enrol"
                className="group relative px-8 py-4 bg-[#5E5574] text-white rounded-full font-medium transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/20 hover:-translate-y-0.5"
              >
                Start Your Journey
                <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/consultation"
                className="px-8 py-4 bg-white/50 border border-[#E6E0F2] text-[#5E5574] rounded-full font-medium backdrop-blur-sm transition-all hover:bg-white hover:border-[#D9CFF2] hover:-translate-y-0.5"
              >
                The Philosophy
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#5E5574]/0 via-[#5E5574]/30 to-[#5E5574]/0" />
        </motion.div>
      </section>

      {/* ==========================================
          2. PHILOSOPHY — QUIET CONFIDENCE
          ========================================== */}
      <section className="relative py-32 bg-white/60 backdrop-blur-sm z-10">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-cormorant text-4xl md:text-5xl text-[#3F3A52] leading-tight mb-8">
                It’s not about ability. <br />
                It’s about <span className="italic text-[#8B7FA8]">architecture.</span>
              </h2>
              <div className="space-y-6 text-lg text-[#6B647F] leading-relaxed font-light">
                <p>
                  Most students do not struggle because they lack intelligence. They struggle because the teaching methods they are exposed to do not match how they process information.
                </p>
                <p>
                  At Kite & Key, we don’t just teach subjects. We build the cognitive architecture required to learn them.
                </p>
                <p>
                  When a student understands <em className="text-[#5E5574]">how</em> they learn, anxiety is replaced by agency. Urgent cramming is replaced by sustainable growth.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] md:aspect-square relative rounded-2xl overflow-hidden bg-[#F7F5FB]">
                <Image
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2400&auto=format&fit=crop"
                  alt="Student studying comfortably"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#5E5574]/10 mix-blend-overlay" />
              </div>
              <div className="absolute -bottom-8 -left-8 md:-left-12 bg-white/90 p-8 rounded-xl shadow-glass border border-[#E6E0F2] max-w-xs backdrop-blur-md">
                <p className="font-cormorant text-2xl italic text-[#5E5574] mb-2">"Structure before speed."</p>
                <p className="text-sm text-[#8C84A8]">The core principle of calm progress.</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          3. KEY METHOD — THE SYSTEM
          ========================================== */}
      <section className="py-32 bg-[#F7F5FB]/60 backdrop-blur-sm overflow-hidden z-10 relative border-t border-white/50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-cormorant text-4xl md:text-5xl text-[#3F3A52] mb-6">The KEY Method</h2>
            <p className="text-lg text-[#6B647F] font-light">
              A structured instructional framework designed to make learning predictable, repeatable, and calm.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Structure",
                desc: "Clear frameworks reduce cognitive load.",
                icon: Layers
              },
              {
                title: "Sequencing",
                desc: "Concepts built in the brain's natural order.",
                icon: Compass
              },
              {
                title: "Pacing",
                desc: "Moving at the speed of understanding.",
                icon: Zap
              },
              {
                title: "Mastery",
                desc: "Deep retention over surface coverage.",
                icon: BookOpen
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white/60 backdrop-blur-md p-8 rounded-2xl border border-white hover:border-[#D9CFF2] transition-colors shadow-sm"
              >
                <div className="w-12 h-12 bg-[#F7F5FB] rounded-xl flex items-center justify-center text-[#5E5574] mb-6">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-cormorant text-2xl text-[#3F3A52] mb-3">{item.title}</h3>
                <p className="text-sm text-[#6B647F] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ==========================================
          4. MINDPRINT — COGNITIVE PROFILING
          ========================================== */}
      <div className="bg-white/70 backdrop-blur-xl border-t border-[#F1ECFA] z-10 relative">
        <MindPrintSection />
      </div>

      {/* ==========================================
          5. SUBJECTS — ACADEMIC SCOPE
          ========================================== */}
      <section className="py-32 bg-[#F7F5FB]/70 backdrop-blur-sm z-10 relative">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-32">
              <h2 className="font-cormorant text-4xl md:text-5xl text-[#3F3A52] mb-6">
                Curriculum <br />
                <span className="italic text-[#8B7FA8]">Refined.</span>
              </h2>
              <p className="text-[#6B647F] leading-relaxed mb-8">
                We teach the NSW Syllabus, but we teach it differently. We focus on the underlying logic of each subject, not just rote memorisation.
              </p>
              <Link href="/enrol" className="text-[#5E5574] font-medium border-b border-[#5E5574]/30 hover:border-[#5E5574] transition-colors pb-0.5">
                View Learning Packages
              </Link>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              {[
                {
                  subject: "Mathematics",
                  years: "Years 5–10",
                  desc: "Moving beyond 'following the formula' to true mathematical reasoning and problem-solving confidence.",
                  color: "bg-[#E6E0F5]/50"
                },
                {
                  subject: "English",
                  years: "Years 5–10",
                  desc: "Developing critical analysis and articulate expression. Reading for meaning, writing with intent.",
                  color: "bg-[#F1ECFA]/50"
                },
                {
                  subject: "Science",
                  years: "Years 7–10",
                  desc: "Cultivating scientific literacy, inquiry skills, and an evidence-based approach to the world.",
                  color: "bg-[#FAFBFF]/50"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-[#E6E0F2] hover:border-[#D9CFF2] hover:shadow-glass hover:-translate-x-1 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="font-cormorant text-3xl text-[#3F3A52]">{item.subject}</h3>
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-[#5E5574] ${item.color}`}>
                      {item.years}
                    </span>
                  </div>
                  <p className="text-[#6B647F] leading-relaxed max-w-2xl">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================
          6. SOCIAL PROOF — KEISHA REVIEWS
          ========================================== */}
      <div className="z-10 relative bg-white/70 backdrop-blur-sm">
        <KeishaReviews />
      </div>

      {/* ==========================================
          7. MENTORSHIP & FINAL CTA
          ========================================== */}
      <section className="py-32 bg-white/80 backdrop-blur-xl border-t border-[#F1ECFA] overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-[#F7F5FB]/50" />

        <Container>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-12 inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F7F5FB] text-[#D9CFF2] mb-12"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </motion.div>

            <h2 className="font-cormorant text-5xl md:text-6xl text-[#3F3A52] mb-8 leading-tight">
              Predictability in a <br />
              <span className="italic text-[#8B7FA8]">pressure-filled world.</span>
            </h2>

            <p className="text-xl text-[#6B647F] mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              We invite you to experience a new standard of learning support.
              One that prioritises clarity, connection, and long-term gain.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/enrol"
                className="px-10 py-5 bg-[#5E5574] text-white text-lg rounded-full font-medium transition-all hover:bg-[#4F4865] hover:shadow-xl hover:-translate-y-1"
              >
                Begin Enrollment
              </Link>
              <Link
                href="/consultation"
                className="px-10 py-5 bg-white/80 border border-[#DDD4F2] text-[#5E5574] text-lg rounded-full font-medium transition-all hover:border-[#5E5574] hover:bg-[#FAF9FC] hover:-translate-y-1"
              >
                Book a Conversation
              </Link>
            </div>

            <p className="mt-8 text-sm text-[#8C84A8] tracking-wide uppercase">
              No pressure. No lock-in contracts. Just clarity.
            </p>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}