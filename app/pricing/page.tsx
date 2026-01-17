"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Check, HelpCircle, ChevronDown, Tag, Star, Info, Clock, Calculator } from "lucide-react";

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

/* ---------- Data ---------- */

const packages = [
  {
    name: "Elevate",
    tagline: "Build foundations",
    hoursPerWeek: 1,
    pricePerHour: 75,
    icon: "🌱",
    popular: false,
    example: "1 hour of Maths per week",
    color: "from-emerald-500/10 to-teal-500/10",
  },
  {
    name: "Glide",
    tagline: "Accelerate progress",
    hoursPerWeek: 2,
    pricePerHour: 70,
    icon: "🚀",
    popular: true,
    example: "1 hour Maths + 1 hour English per week",
    color: "from-violet-500/10 to-purple-500/10",
  },
  {
    name: "Soar",
    tagline: "Maximise potential",
    hoursPerWeek: 3,
    pricePerHour: 65,
    icon: "⭐",
    popular: false,
    example: "2 hours Maths + 1 hour Science per week",
    color: "from-amber-500/10 to-orange-500/10",
  },
];

const TERM_WEEKS = 10;

const allFeatures = [
  "1:1 online tutoring with qualified tutors",
  "MindPrint cognitive profiling",
  "The KEY Method structured approach",
  "Session summaries & progress tracking",
  "Flexible subject allocation",
  "Curriculum-aligned content (Years 5–10)",
  "Parent communication & updates",
  "No hidden fees",
];

const flexibilityExamples = [
  {
    hours: 1,
    options: [
      "1 hour of Maths",
      "1 hour of English",
      "1 hour of Science",
    ],
  },
  {
    hours: 2,
    options: [
      "2 hours of one subject (deeper focus)",
      "1 hour Maths + 1 hour English",
      "1 hour English + 1 hour Science",
      "1 hour Maths + 1 hour Science",
    ],
  },
  {
    hours: 3,
    options: [
      "3 hours of one subject (intensive)",
      "2 hours Maths + 1 hour English",
      "1 hour each of Maths, English & Science",
      "Any combination that suits your child",
    ],
  },
];

const faqs = [
  {
    question: "What does 'locked in for the term' mean?",
    answer: "When you enrol, you commit to a 10-week term at your chosen package level. This ensures consistency for your child's learning and allows our tutors to plan structured, progressive sessions. You can change packages between terms.",
  },
  {
    question: "Can I split my hours across different subjects?",
    answer: "Absolutely! You have complete flexibility in how you use your hours. For example, with the Glide package (2 hours/week), you could do 1 hour of Maths and 1 hour of English, or 2 hours focused on a single subject — whatever works best for your child.",
  },
  {
    question: "What if I want more than 3 hours per week?",
    answer: "The Soar package is 3+ hours, meaning you can add additional hours at the $65/hour rate. Contact us to discuss a custom arrangement that suits your child's needs.",
  },
  {
    question: "Can I change my package during the term?",
    answer: "We encourage consistency for the best results, but we understand circumstances change. If you need to adjust mid-term, contact us and we'll work out a fair solution.",
  },
  {
    question: "What subjects do you cover?",
    answer: "We offer tutoring in Mathematics, English, and Science for Years 5–10. All our tutors are trained in the Australian curriculum and experienced with students at all levels.",
  },
  {
    question: "Is there a discount for siblings?",
    answer: "Yes! We offer a 10% discount for siblings enrolled in the same term. Contact us during your consultation to arrange this.",
  },
  {
    question: "What payment options are available?",
    answer: "You can pay for the full term upfront, or we offer a split payment option (50% at enrolment, 50% at week 5). No interest or fees for split payments.",
  },
  {
    question: "What happens if my child is sick or unavailable?",
    answer: "We offer session rescheduling with 24 hours notice. Missed sessions without notice cannot be rescheduled, but we're understanding of genuine emergencies.",
  },
];

/* ---------- Page ---------- */

export default function PricingPage() {
  const heroAnim = useScrollAnimation();
  const packagesAnim = useScrollAnimation();
  const flexibilityAnim = useScrollAnimation();
  const featuresAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState(1); // Glide by default

  return (
    <main className="bg-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5FB] via-[#EEEAF8] to-white" />

        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#E6E0F5]/30 rounded-full blur-3xl" />

        <div
          ref={heroAnim.ref}
          className={`relative mx-auto max-w-4xl px-6 text-center transition-all duration-700 ${heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CFF2] bg-white/80 px-4 py-1.5 text-xs font-medium text-[#5E5574] backdrop-blur-sm mb-6">
            <Tag size={14} />
            Simple, term-based pricing
          </div>

          <h1 className="font-julius text-4xl md:text-5xl text-[#3F3A52]">
            Transparent pricing.{" "}
            <span className="text-[#5E5574]">Flexible hours.</span>
          </h1>

          <p className="mt-6 text-lg text-[#6B647F] max-w-2xl mx-auto leading-relaxed">
            Choose how many hours per week works for your child. All packages include
            the same high-quality tutoring — the only difference is the time commitment.
          </p>

          {/* Term info badge */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[#D9CFF2] bg-white/80 px-6 py-3 backdrop-blur-sm">
            <Clock size={18} className="text-[#5E5574]" />
            <div className="text-left">
              <div className="text-sm font-semibold text-[#3F3A52]">10-week term commitment</div>
              <div className="text-xs text-[#8C84A8]">Consistent structure for lasting results</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PACKAGES ================= */}
      <section ref={packagesAnim.ref} className="py-8 md:py-16">
        <div className="mx-auto max-w-5xl px-2 sm:px-4 md:px-6">
          {/* Grid - always 3 columns, shrinks on mobile */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-6">
            {packages.map((pkg, index) => {
              const termTotal = pkg.pricePerHour * pkg.hoursPerWeek * TERM_WEEKS;
              const weeklyTotal = pkg.pricePerHour * pkg.hoursPerWeek;

              return (
                <div
                  key={pkg.name}
                  className={`relative rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-500 ${packagesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Popular badge */}
                  {pkg.popular && (
                    <div className="absolute -top-2 sm:-top-3 md:-top-4 left-0 right-0 flex justify-center z-10">
                      <span className="inline-flex items-center gap-0.5 sm:gap-1 md:gap-1.5 rounded-full bg-[#5E5574] px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-1.5 text-[8px] sm:text-[10px] md:text-xs font-semibold text-white shadow-lg">
                        <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                        <span className="hidden sm:inline">Most Popular</span>
                        <span className="sm:hidden">Popular</span>
                      </span>
                    </div>
                  )}

                  <div
                    className={`h-full rounded-lg sm:rounded-xl md:rounded-2xl border bg-white p-2 sm:p-4 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#5E5574]/10 ${pkg.popular
                      ? "border-[#5E5574] shadow-lg shadow-[#5E5574]/10"
                      : "border-[#E6E0F2] hover:border-[#D9CFF2]"
                      }`}
                  >
                    {/* Header */}
                    <div className="text-center pb-2 sm:pb-4 md:pb-6 border-b border-[#E6E0F2]">
                      <div className={`inline-flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br ${pkg.color} text-sm sm:text-lg md:text-2xl mb-1 sm:mb-2 md:mb-4`}>
                        {pkg.icon}
                      </div>

                      <h3 className="text-xs sm:text-sm md:text-xl font-semibold text-[#3F3A52]">{pkg.name}</h3>
                      <p className="text-[8px] sm:text-[10px] md:text-sm text-[#5E5574] font-medium hidden sm:block">{pkg.tagline}</p>

                      {/* Hours */}
                      <div className="mt-1 sm:mt-2 md:mt-4 inline-flex items-center gap-0.5 sm:gap-1 md:gap-2 rounded-full bg-[#F7F5FB] px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2">
                        <Clock className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#5E5574]" />
                        <span className="text-[8px] sm:text-[10px] md:text-sm font-semibold text-[#3F3A52]">
                          {pkg.hoursPerWeek}hr{pkg.hoursPerWeek > 1 ? "s" : ""}<span className="hidden sm:inline"> / week</span>
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="py-2 sm:py-4 md:py-6 text-center">
                      <div className="flex items-baseline justify-center gap-0.5">
                        <span className="text-base sm:text-2xl md:text-4xl font-bold text-[#3F3A52]">${pkg.pricePerHour}</span>
                        <span className="text-[8px] sm:text-xs md:text-base text-[#8C84A8]">/hr</span>
                      </div>

                      <div className="mt-1 sm:mt-2 md:mt-3 space-y-0.5 sm:space-y-1">
                        <div className="text-[8px] sm:text-xs md:text-sm text-[#6B647F]">
                          <span className="font-medium text-[#3F3A52]">${weeklyTotal}</span><span className="hidden sm:inline"> per week</span><span className="sm:hidden">/wk</span>
                        </div>
                        <div className="text-[8px] sm:text-xs md:text-sm text-[#6B647F]">
                          <span className="font-semibold text-[#5E5574]">${termTotal.toLocaleString()}</span><span className="hidden sm:inline"> per term</span><span className="sm:hidden">/term</span>
                        </div>
                      </div>

                      {/* Savings indicator for Soar */}
                      {pkg.name === "Soar" && (
                        <div className="mt-1 sm:mt-2 md:mt-3 hidden sm:inline-flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-medium text-green-700">
                          Save $300/term
                        </div>
                      )}
                    </div>

                    {/* Example usage - hidden on mobile */}
                    <div className="hidden md:block rounded-xl bg-[#F7F5FB] p-4 mb-6">
                      <p className="text-xs font-semibold text-[#8C84A8] uppercase tracking-wider mb-2">
                        Example
                      </p>
                      <p className="text-sm text-[#5E5574]">{pkg.example}</p>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/enrol"
                      className={`flex w-full items-center justify-center rounded-md sm:rounded-lg md:rounded-xl py-1.5 sm:py-2 md:py-3.5 text-[8px] sm:text-xs md:text-sm font-semibold transition-all ${pkg.popular
                        ? "bg-[#5E5574] text-white hover:bg-[#4F4865]"
                        : "bg-[#F4F1FB] text-[#5E5574] hover:bg-[#E6E0F5]"
                        }`}
                    >
                      Enrol
                    </Link>

                    <p className="mt-1 sm:mt-2 md:mt-4 text-center text-[6px] sm:text-[8px] md:text-xs text-[#8C84A8] hidden sm:block">
                      or{" "}
                      <Link href="/consultation" className="text-[#5E5574] underline underline-offset-2">
                        book a consultation
                      </Link>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price comparison note */}
          <div
            className={`mt-4 sm:mt-6 md:mt-8 text-center transition-all duration-700 delay-300 ${packagesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <p className="text-[10px] sm:text-xs md:text-sm text-[#8C84A8]">
              <Calculator size={14} className="inline mr-1" />
              More hours = lower hourly rate. All packages include the same services.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FLEXIBILITY SECTION ================= */}
      <section ref={flexibilityAnim.ref} className="py-16 bg-[#FAFBFF]">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className={`text-center mb-10 transition-all duration-700 ${flexibilityAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="font-julius text-3xl text-[#3F3A52]">
              Flexible subject allocation
            </h2>
            <p className="mt-3 text-[#6B647F] max-w-xl mx-auto">
              Use your hours however works best. Focus on one subject or spread across multiple — it&apos;s your choice.
            </p>
          </div>

          {/* Flexibility selector */}
          <div
            className={`transition-all duration-700 delay-100 ${flexibilityAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* Package tabs */}
            <div className="flex justify-center gap-2 mb-8">
              {packages.map((pkg, index) => (
                <button
                  key={pkg.name}
                  onClick={() => setSelectedPackage(index)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${selectedPackage === index
                    ? "bg-[#5E5574] text-white shadow-md"
                    : "bg-white text-[#6B647F] border border-[#E6E0F2] hover:border-[#D9CFF2]"
                    }`}
                >
                  {pkg.name} ({pkg.hoursPerWeek}hr{pkg.hoursPerWeek > 1 ? "s" : ""})
                </button>
              ))}
            </div>

            {/* Options display */}
            <div className="rounded-2xl border border-[#E6E0F2] bg-white p-8">
              <h3 className="text-lg font-semibold text-[#3F3A52] mb-2">
                With {packages[selectedPackage].hoursPerWeek} hour{packages[selectedPackage].hoursPerWeek > 1 ? "s" : ""} per week, you could:
              </h3>
              <p className="text-sm text-[#8C84A8] mb-6">
                Choose one of these options, or create your own combination
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {flexibilityExamples[selectedPackage].options.map((option, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-[#E6E0F2] bg-[#FAFBFF] px-4 py-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F4F1FB] text-xs font-medium text-[#5E5574]">
                      {i + 1}
                    </div>
                    <span className="text-sm text-[#5E5574]">{option}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-[#8C84A8]">
                <Info size={14} />
                <span>Subject mix can be adjusted each week based on your child&apos;s needs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ALL FEATURES ================= */}
      <section ref={featuresAnim.ref} className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div
            className={`text-center mb-10 transition-all duration-700 ${featuresAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="font-julius text-3xl text-[#3F3A52]">
              Everything included in every package
            </h2>
            <p className="mt-3 text-[#6B647F]">
              No feature tiers. No upsells. Just great tutoring.
            </p>
          </div>

          <div
            className={`grid gap-4 sm:grid-cols-2 transition-all duration-700 delay-100 ${featuresAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {allFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-[#E6E0F2] bg-white px-5 py-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F1FB]">
                  <Check size={16} className="text-[#5E5574]" />
                </div>
                <span className="text-sm text-[#5E5574]">{feature}</span>
              </div>
            ))}
          </div>

          {/* Tutor quality note */}
          <div
            className={`mt-8 rounded-2xl border border-[#D9CFF2] bg-gradient-to-r from-[#F7F5FB] to-[#EEEAF8] p-6 transition-all duration-700 delay-200 ${featuresAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5E5574] text-xl">
                🎓
              </div>
              <div>
                <h3 className="font-semibold text-[#3F3A52]">95+ ATAR tutors only</h3>
                <p className="mt-1 text-sm text-[#6B647F]">
                  Every tutor at Kite &amp; Key achieved a 95+ ATAR and is trained in The KEY Method.
                  Your child gets the same quality tutoring regardless of which package you choose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section ref={faqAnim.ref} className="py-16 bg-[#FAFBFF]">
        <div className="mx-auto max-w-3xl px-6">
          <div
            className={`text-center mb-10 transition-all duration-700 ${faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="font-julius text-3xl text-[#3F3A52]">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-[#6B647F]">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl border border-[#E6E0F2] bg-white overflow-hidden transition-all duration-500 ${faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-[#3F3A52] pr-4 text-sm">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[#8C84A8] transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-[300px]" : "max-h-0"
                    }`}
                >
                  <div className="px-6 pb-4 text-sm text-[#6B647F] leading-relaxed border-t border-[#E6E0F2] pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section ref={ctaAnim.ref} className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div
            className={`relative overflow-hidden rounded-3xl transition-all duration-700 ${ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#5E5574] to-[#4A4463]" />
            <div className="absolute inset-0 opacity-10">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative px-8 py-14 md:px-14 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 mb-6">
                <HelpCircle size={14} />
                Not sure which to choose?
              </div>

              <h2 className="font-julius text-3xl md:text-4xl text-white">
                Let&apos;s find the right fit together
              </h2>

              <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
                A free consultation helps us understand your child&apos;s needs and
                recommend the right hours per week — no pressure, no obligation.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-[#5E5574] shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  Book a Free Consultation
                </Link>
                <Link
                  href="/meet-the-team"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Meet Our Tutors
                </Link>
              </div>

              <p className="mt-8 text-sm text-white/50">
                15-minute call · No credit card required · Personalised recommendations
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}