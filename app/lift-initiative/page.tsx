"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Brain,
  Users,
  Target,
  ChevronDown,

  Clock,
  Shield,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Compass,
  Lightbulb,
  HandHeart,
  GraduationCap,
  MessageCircle,
  Star,
  Zap,
  RefreshCw,
  Home,
} from "lucide-react";


/* ---------- Scroll Animation Hook ---------- */

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ---------- Lift Color Palette ---------- */
/*
  Primary:    #5B9AAD (soft teal)
  Secondary:  #7AB4C4 (lighter teal)
  Accent:     #3D8494 (darker teal)
  Background: #EEF6F8, #E0EFF3, #D1E8ED
  Text Dark:  #2C5F6B
  Text Light: #6A9AA8
*/

/* ---------- Data ---------- */

const supportedChallenges = [
  {
    title: "ADHD & Attention Difficulties",
    description: "Focus challenges, impulsivity, hyperactivity, and executive function support.",
    icon: <Zap size={22} />,
  },
  {
    title: "Dyslexia & Reading Challenges",
    description: "Reading fluency, comprehension, spelling, and written expression.",
    icon: <BookOpen size={22} />,
  },
  {
    title: "Dyscalculia & Maths Difficulties",
    description: "Number sense, mathematical reasoning, and calculation strategies.",
    icon: <Target size={22} />,
  },
  {
    title: "Processing & Memory",
    description: "Slow processing speed, working memory, and information retention.",
    icon: <Brain size={22} />,
  },
  {
    title: "Autism Spectrum Support",
    description: "Tailored approaches for students with specific learning preferences.",
    icon: <Compass size={22} />,
  },
  {
    title: "Anxiety & School Avoidance",
    description: "Support for students whose anxiety affects learning and engagement.",
    icon: <Shield size={22} />,
  },
];

const approachSteps = [
  {
    number: "01",
    title: "Listen First",
    description: "We begin by understanding your child completely — their history, strengths, challenges, and what's been tried before.",
    icon: <Heart size={20} />,
  },
  {
    number: "02",
    title: "Build Connection",
    description: "Trust comes before teaching. Students who've struggled need to feel safe and understood before any academic work.",
    icon: <Users size={20} />,
  },
  {
    number: "03",
    title: "Adapt Everything",
    description: "Sessions are designed around your child — shorter focus blocks, movement breaks, visual aids, whatever actually works.",
    icon: <RefreshCw size={20} />,
  },
  {
    number: "04",
    title: "Celebrate Progress",
    description: "We measure success differently. Confidence rebuilds through small wins and genuine recognition of effort.",
    icon: <Star size={20} />,
  },
];

const faqs = [
  {
    question: "How is Lift Initiative different from regular tutoring?",
    answer: "Lift Initiative is designed specifically for students with ADHD, dyslexia, and learning difficulties. Adam has specialised experience working with neurodiverse students. Every aspect — pace, methods, environment, communication — is adapted to each student's needs. Standard tutoring often makes things worse for these students; we're built to help them thrive.",
  },
  {
    question: "What experience does Adam have?",
    answer: "Adam is a qualified high school teacher with over 10 years of experience, including extensive work in special education and learning support units. He's worked with hundreds of students with ADHD, dyslexia, autism, and other learning differences in both mainstream and specialist settings.",
  },
  {
    question: "My child has had bad experiences with tutors before.",
    answer: "This is incredibly common with the students we work with. Many have developed anxiety or resistance due to past experiences. Adam prioritises building trust and safety before any academic work. There's no pressure, no judgment — sessions are designed to feel different from day one.",
  },
  {
    question: "Does my child need a formal diagnosis?",
    answer: "No diagnosis is required. If your child struggles with attention, learning, or engagement in ways that traditional approaches haven't helped, Lift Initiative can help. We work with students whether or not they have official diagnoses.",
  },
  {
    question: "What subjects are covered?",
    answer: "We support Maths, English, and Science for Years 5–10. However, the focus often extends beyond subjects — helping students develop learning strategies, organisational skills, and confidence that transfers across all areas of school.",
  },
  {
    question: "How long are sessions?",
    answer: "Sessions are typically 45–60 minutes, but this is adjusted based on your child's attention span and needs. Some students do better with shorter, more frequent sessions. We'll figure out what works best during the initial consultation.",
  },
  {
    question: "Can parents be involved?",
    answer: "This depends on your child. Some students prefer privacy, others benefit from parent involvement. We also provide regular updates and strategies you can reinforce at home. We'll find the right balance together.",
  },
  {
    question: "What if it's not working?",
    answer: "We continuously adapt our approach. If something isn't working, we change it — that's the whole point. There's no locked-in commitment. We want what's genuinely best for your child.",
  },
];

/* ---------- Lift Navbar ---------- */

function LiftNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300`}>
      {/* Progress bar */}
      <div className="h-[3px] w-full bg-[#D1E8ED]" />

      {/* Background */}
      <div
        className={`absolute inset-0 border-b transition-all duration-300 ${scrolled
            ? "bg-gradient-to-r from-[#EEF6F8]/98 via-[#E0EFF3]/98 to-[#EEF6F8]/98 border-[#C5DEE4] shadow-lg shadow-[#5B9AAD]/5"
            : "bg-gradient-to-r from-[#EEF6F8]/90 via-[#E0EFF3]/85 to-[#EEF6F8]/90 border-[#D1E8ED]"
          } backdrop-blur-xl`}
      />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/lift-initiative" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B9AAD] to-[#3D8494] shadow-md shadow-[#5B9AAD]/20 transition-transform group-hover:scale-105">
            <HandHeart size={22} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="font-semibold text-[#2C5F6B] tracking-tight text-lg">
              Lift Initiative
            </div>
            <div className="text-[10px] text-[#7AB4C4] font-medium tracking-wide">
              by Kite & Key Academy
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { label: "About", href: "#about" },
            { label: "Our Approach", href: "#approach" },
            { label: "Meet Adam", href: "#adam" },
            { label: "FAQ", href: "#faq" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#5B9AAD] hover:text-[#2C5F6B] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-[#7AB4C4] hover:text-[#5B9AAD] transition-colors"
          >
            <Home size={14} />
            Kite & Key
          </Link>
          <Link
            href="/consultation"
            className="rounded-xl bg-[#5B9AAD] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#5B9AAD]/25 transition-all hover:bg-[#3D8494] hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Support
          </Link>
        </div>
      </nav>
    </header>
  );
}

/* ---------- Page ---------- */

export default function LiftInitiativePage() {
  const heroAnim = useScrollAnimation();
  const problemAnim = useScrollAnimation();
  const challengesAnim = useScrollAnimation();
  const approachAnim = useScrollAnimation();
  const adamAnim = useScrollAnimation();
  const differenceAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <LiftNavbar />

      <main className="bg-white">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden pt-32 pb-24">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#EEF6F8] via-[#E0EFF3]/60 to-white" />

          {/* Decorative blobs */}
          <div className="absolute top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D1E8ED]/40 blur-3xl" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7AB4C4]/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#5B9AAD]/10 blur-3xl" />

          <div
            ref={heroAnim.ref}
            className={`relative mx-auto max-w-5xl px-6 text-center transition-all duration-700 ${heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5DEE4] bg-white/80 px-4 py-2 text-sm font-medium text-[#5B9AAD] shadow-sm backdrop-blur-sm mb-8">
              <Heart size={16} className="text-[#5B9AAD]" />
              Specialist Learning Support
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#2C5F6B]">
              Lift Initiative
            </h1>

            <p className="mt-4 text-xl md:text-2xl text-[#5B9AAD] font-medium">
              For students who learn differently
            </p>

            <p className="mt-6 text-lg text-[#6A9AA8] max-w-2xl mx-auto leading-relaxed">
              Specialist 1:1 tutoring for students with ADHD, dyslexia, and learning
              difficulties — delivered by someone who truly understands.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/consultation"
                className="group inline-flex items-center gap-2 rounded-2xl bg-[#5B9AAD] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#5B9AAD]/30 transition-all hover:bg-[#3D8494] hover:shadow-2xl hover:-translate-y-1"
              >
                Book a Free Consultation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#adam"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#C5DEE4] bg-white/60 px-8 py-4 text-base font-semibold text-[#5B9AAD] backdrop-blur-sm transition-all hover:border-[#5B9AAD] hover:bg-white hover:-translate-y-1"
              >
                Meet Adam Walker
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-14 flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { icon: <GraduationCap size={22} />, text: "Qualified Teacher" },
                { icon: <Brain size={22} />, text: "ADHD Specialist" },
                { icon: <Heart size={22} />, text: "Patient & Understanding" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-full border border-[#D1E8ED] bg-white/70 px-5 py-2.5 backdrop-blur-sm"
                >
                  <span className="text-[#5B9AAD]">{badge.icon}</span>
                  <span className="text-sm font-medium text-[#2C5F6B]">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= THE PROBLEM ================= */}
        <section id="about" ref={problemAnim.ref} className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              {/* Left content */}
              <div
                className={`transition-all duration-700 ${problemAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
              >
                <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#7AB4C4] mb-4">
                  The Challenge
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F6B] leading-tight">
                  Traditional tutoring often{" "}
                  <span className="text-[#5B9AAD]">fails students</span> who learn differently
                </h2>
                <p className="mt-6 text-lg text-[#6A9AA8] leading-relaxed">
                  Students with ADHD, dyslexia, and learning difficulties don't need
                  <em> more</em> of the same — they need something <strong>completely different</strong>.
                </p>
                <p className="mt-4 text-[#6A9AA8] leading-relaxed">
                  Standard methods can actually make things worse: increasing frustration,
                  damaging confidence, and reinforcing the belief that they're "not smart enough."
                </p>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-2 gap-6">
                  {[
                    { stat: "1 in 5", label: "Students have learning differences" },
                    { stat: "70%", label: "Feel misunderstood at school" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-2xl border border-[#D1E8ED] bg-[#F5FAFB] p-5">
                      <div className="text-3xl font-bold text-[#5B9AAD]">{item.stat}</div>
                      <div className="text-sm text-[#6A9AA8] mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Signs */}
              <div
                className={`transition-all duration-700 delay-200 ${problemAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                  }`}
              >
                <div className="rounded-3xl border border-[#C5DEE4] bg-gradient-to-br from-[#EEF6F8] to-white p-8 md:p-10">
                  <h3 className="text-lg font-bold text-[#2C5F6B] mb-6">
                    Signs Lift Initiative might help your child:
                  </h3>
                  <div className="space-y-4">
                    {[
                      "They're bright but their grades don't show it",
                      "Homework is a daily battle",
                      "They've lost confidence in their ability to learn",
                      "Previous tutoring hasn't worked",
                      "They get frustrated easily or shut down",
                      "Teachers say they need to 'try harder' or 'focus more'",
                      "They're anxious about school",
                    ].map((sign, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl bg-white/80 border border-[#E0EFF3] px-4 py-3"
                      >
                        <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-[#5B9AAD]" />
                        <span className="text-sm text-[#4A7A88]">{sign}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CHALLENGES WE SUPPORT ================= */}
        <section ref={challengesAnim.ref} className="py-24 bg-[#F5FAFB]">
          <div className="mx-auto max-w-6xl px-6">
            <div
              className={`text-center mb-14 transition-all duration-700 ${challengesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#7AB4C4] mb-4">
                Specialist Support
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F6B]">
                Challenges we specialise in
              </h2>
              <p className="mt-4 text-lg text-[#6A9AA8] max-w-2xl mx-auto">
                Adam has years of experience helping students with a range of
                learning differences and neurodevelopmental conditions.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {supportedChallenges.map((challenge, index) => (
                <div
                  key={challenge.title}
                  className={`group rounded-2xl border border-[#D1E8ED] bg-white p-7 transition-all duration-500 hover:border-[#7AB4C4] hover:shadow-xl hover:shadow-[#5B9AAD]/10 hover:-translate-y-1 ${challengesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF6F8] to-[#D1E8ED] text-[#5B9AAD] mb-5 transition-transform group-hover:scale-110">
                    {challenge.icon}
                  </div>
                  <h3 className="font-bold text-[#2C5F6B] text-lg">{challenge.title}</h3>
                  <p className="mt-2 text-[#6A9AA8] leading-relaxed">{challenge.description}</p>
                </div>
              ))}
            </div>

            {/* Note */}
            <div
              className={`mt-12 rounded-2xl border border-[#C5DEE4] bg-white px-8 py-6 text-center transition-all duration-700 delay-500 ${challengesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <p className="text-[#5B9AAD] font-medium">
                <CheckCircle2 size={16} className="inline mr-2" />
                <strong>No formal diagnosis required.</strong> If your child is struggling, we can help.
              </p>
            </div>
          </div>
        </section>

        {/* ================= OUR APPROACH ================= */}
        <section id="approach" ref={approachAnim.ref} className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div
              className={`text-center mb-14 transition-all duration-700 ${approachAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#7AB4C4] mb-4">
                The Lift Approach
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F6B]">
                How we work differently
              </h2>
              <p className="mt-4 text-lg text-[#6A9AA8] max-w-2xl mx-auto">
                Connection and understanding come first. Students who've struggled
                need to feel safe before they can learn.
              </p>
            </div>

            {/* Approach steps */}
            <div className="grid gap-6 md:grid-cols-2">
              {approachSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative rounded-2xl border border-[#D1E8ED] bg-white p-8 transition-all duration-500 hover:border-[#7AB4C4] hover:shadow-lg ${approachAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Number badge */}
                  <div className="absolute -top-4 -left-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B9AAD] to-[#3D8494] text-white font-bold shadow-lg shadow-[#5B9AAD]/30">
                    {step.number}
                  </div>

                  <div className="ml-8 mt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[#5B9AAD]">{step.icon}</span>
                      <h3 className="text-xl font-bold text-[#2C5F6B]">{step.title}</h3>
                    </div>
                    <p className="text-[#6A9AA8] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Session example */}
            <div
              className={`mt-14 rounded-3xl border border-[#C5DEE4] bg-gradient-to-r from-[#EEF6F8] to-[#E0EFF3] p-8 md:p-10 transition-all duration-700 delay-400 ${approachAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <h3 className="text-lg font-bold text-[#2C5F6B] mb-6 text-center">
                A typical session might look like:
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { time: "First 5 min", activity: "Check-in & connect", emoji: "👋" },
                  { time: "15–20 min", activity: "Focused learning", emoji: "📚" },
                  { time: "5 min", activity: "Movement break", emoji: "⚡" },
                  { time: "15–20 min", activity: "Practice & wrap-up", emoji: "✨" },
                ].map((block, i) => (
                  <div
                    key={i}
                    className="text-center rounded-2xl bg-white border border-[#D1E8ED] p-5 shadow-sm"
                  >
                    <div className="text-3xl mb-3">{block.emoji}</div>
                    <div className="text-xs font-bold text-[#5B9AAD] uppercase tracking-wide">
                      {block.time}
                    </div>
                    <div className="text-sm text-[#4A7A88] mt-1 font-medium">{block.activity}</div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-[#7AB4C4]">
                Every session adapts to your child's energy and focus on that day.
              </p>
            </div>
          </div>
        </section>

        {/* ================= MEET ADAM ================= */}
        <section id="adam" ref={adamAnim.ref} className="py-24 bg-[#F5FAFB]">
          <div className="mx-auto max-w-5xl px-6">
            <div
              className={`rounded-3xl border border-[#C5DEE4] bg-white overflow-hidden shadow-xl shadow-[#5B9AAD]/5 transition-all duration-700 ${adamAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <div className="grid lg:grid-cols-5">
                {/* Image placeholder */}
                <div className="lg:col-span-2 relative min-h-[350px] bg-gradient-to-br from-[#5B9AAD] to-[#3D8494]">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90 p-8">
                    <div className="h-36 w-36 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 border-4 border-white/30">
                      <Users size={56} className="text-white/80" />
                    </div>
                    <p className="text-sm text-white/70">Adam Walker</p>
                    {/* Replace with actual image:
                    <Image
                      src="/team/adam.jpg"
                      alt="Adam Walker"
                      fill
                      className="object-cover"
                    />
                    */}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 p-8 lg:p-12">
                  <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#7AB4C4] mb-2">
                    Meet Your Tutor
                  </p>
                  <h2 className="text-3xl font-bold text-[#2C5F6B]">Adam Walker</h2>
                  <p className="text-[#5B9AAD] font-semibold mt-1">
                    Specialist Learning Support Educator
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Qualified High School Teacher",
                      "10+ Years Experience",
                      "ADHD & Dyslexia Specialist",
                      "Special Education Background",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#D1E8ED] bg-[#EEF6F8] px-3 py-1.5 text-xs font-semibold text-[#5B9AAD]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <div className="mt-6 space-y-4 text-[#6A9AA8] leading-relaxed">
                    <p>
                      "I became a teacher because I wanted to help students. But I
                      quickly realised the students who needed help most were being
                      left behind by a system that wasn't built for them."
                    </p>
                    <p>
                      After years working in mainstream education and special education
                      settings, I've seen hundreds of bright kids lose confidence
                      because they learned differently.
                    </p>
                    <p>
                      <strong className="text-[#2C5F6B]">Lift Initiative</strong> is my way of providing the kind of
                      support I wish every struggling student could access — patient,
                      adapted, and genuinely understanding.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {[
                      { value: "10+", label: "Years Teaching" },
                      { value: "500+", label: "Students Helped" },
                      { value: "100%", label: "Commitment" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-2xl font-bold text-[#5B9AAD]">{stat.value}</div>
                        <div className="text-xs text-[#7AB4C4] font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= THE DIFFERENCE ================= */}
        <section ref={differenceAnim.ref} className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div
              className={`text-center mb-14 transition-all duration-700 ${differenceAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F6B]">
                What makes Lift different
              </h2>
            </div>

            <div
              className={`rounded-3xl border border-[#C5DEE4] overflow-hidden transition-all duration-700 delay-100 ${differenceAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              {/* Comparison table */}
              <div className="grid md:grid-cols-2">
                {/* Traditional */}
                <div className="bg-[#F5F5F5] p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500 mb-3">
                      ✕
                    </div>
                    <h3 className="font-bold text-gray-600">Traditional Tutoring</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      "One-pace-fits-all approach",
                      "Focus on content coverage",
                      "Academic results only measure of success",
                      "Standard session length",
                      "Limited understanding of learning differences",
                      "Pressure to perform",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-gray-500">
                        <span className="text-gray-400">—</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lift Initiative */}
                <div className="bg-gradient-to-br from-[#EEF6F8] to-white p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#5B9AAD] text-white mb-3">
                      <Heart size={20} />
                    </div>
                    <h3 className="font-bold text-[#2C5F6B]">Lift Initiative</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Completely adapted to each student",
                      "Focus on how they learn best",
                      "Confidence & engagement matter too",
                      "Flexible — based on attention span",
                      "Specialist ADHD & LD experience",
                      "Safe, supportive environment",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-[#4A7A88]">
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-[#5B9AAD]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIAL ================= */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-3xl border border-[#C5DEE4] bg-gradient-to-r from-[#EEF6F8] to-white p-10 md:p-14 text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={24} className="text-[#5B9AAD] fill-[#5B9AAD]" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-[#2C5F6B] font-medium italic max-w-2xl mx-auto leading-relaxed">
                "For the first time in years, my son doesn't dread learning. Adam
                understands him in a way no other tutor ever has. The change in
                his confidence has been incredible."
              </blockquote>
              <p className="mt-8 text-[#7AB4C4] font-medium">
                — Parent of Year 8 student with ADHD
              </p>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq" ref={faqAnim.ref} className="py-24 bg-[#F5FAFB]">
          <div className="mx-auto max-w-3xl px-6">
            <div
              className={`text-center mb-12 transition-all duration-700 ${faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <h2 className="text-3xl font-bold text-[#2C5F6B]">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-[#6A9AA8]">
                Common questions from parents considering Lift Initiative
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border border-[#D1E8ED] bg-white overflow-hidden transition-all duration-500 ${faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-[#2C5F6B] pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-[#7AB4C4] transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-[500px]" : "max-h-0"
                      }`}
                  >
                    <div className="px-6 pb-5 text-[#6A9AA8] leading-relaxed border-t border-[#EEF6F8] pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section ref={ctaAnim.ref} className="py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div
              className={`relative overflow-hidden rounded-3xl transition-all duration-700 ${ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B9AAD] to-[#3D8494]" />
              <div className="absolute inset-0 opacity-10">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>

              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 blur-3xl" />

              <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm mb-8">
                  <Heart size={16} />
                  Every child deserves support that understands them
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Ready to give your child<br />the support they deserve?
                </h2>

                <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
                  Book a free consultation to talk about your child's needs and
                  see if Lift Initiative is the right fit.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/consultation"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-[#3D8494] shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1"
                  >
                    Book a Free Consultation
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-1"
                  >
                    <Home size={18} />
                    Back to Kite & Key
                  </Link>
                </div>

                <p className="mt-10 text-sm text-white/60">
                  Free 15-minute call · No obligation · Completely confidential
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER NOTE ================= */}
        <section className="py-10 border-t border-[#E0EFF3]">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="text-sm text-[#7AB4C4]">
              <strong className="text-[#5B9AAD]">Lift Initiative</strong> is a specialist program
              within <Link href="/" className="underline hover:text-[#5B9AAD]">Kite & Key Academy</Link>,
              dedicated to students who need adapted learning support.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}