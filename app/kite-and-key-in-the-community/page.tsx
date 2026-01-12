"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sprout,
  Globe,
  Handshake,
  Sparkles,
  Rocket,
  Lightbulb,
  Mail,
  Building2,
  UserPlus,
  Users,
  GraduationCap,
  School,
  MapPin,
  Clock
} from "lucide-react";

export default function KiteAndKeyInTheCommunityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F7F5FB] to-[#EEEAF8]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#E6E0F5]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D9CFF2]/30 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5E5574]/10 to-[#8B7FA8]/10 px-5 py-2.5 mb-8 backdrop-blur-sm border border-[#5E5574]/20">
              <Sprout className="h-4 w-4 text-[#5E5574]" />
              <span className="text-sm font-semibold text-[#5E5574]">Coming 2026</span>
            </div>

            <h1 className="font-julius text-4xl md:text-5xl lg:text-7xl text-[#3F3A52] leading-tight mb-6">
              Kite & Key in the{" "}
              <span className="bg-gradient-to-r from-[#5E5574] via-[#8B7FA8] to-[#A89BBF] bg-clip-text text-transparent">
                Community
              </span>
            </h1>

            <p className="text-xl text-[#6B647F] leading-relaxed mb-10 max-w-3xl mx-auto">
              At Kite & Key Academy, we believe education extends beyond the classroom.
              In 2026, we're launching initiatives to make a positive impact across Australian
              communities through partnerships, volunteering, and educational outreach.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5E5574] to-[#7A6B92] px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-2xl hover:shadow-[#5E5574]/40 hover:-translate-y-0.5"
              >
                Express Your Interest
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#vision"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#5E5574] bg-white/70 backdrop-blur-sm px-8 py-4 text-base font-semibold text-[#5E5574] transition-all hover:bg-white hover:shadow-xl"
              >
                Our Vision
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-julius text-4xl md:text-5xl text-[#3F3A52] mb-6">
              Our Vision for 2026
            </h2>
            <p className="text-lg text-[#6B647F] max-w-3xl mx-auto">
              We're building a future where quality education reaches every corner of Australia,
              breaking down barriers and creating opportunities for all students to thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {VISION_PILLARS.map((pillar, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg border border-[#E6E1F2] hover:shadow-2xl hover:border-[#5E5574]/30 transition-all duration-500"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#5E5574] to-[#8B7FA8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#3F3A52] mb-4">{pillar.title}</h3>
                <p className="text-[#6B647F] leading-relaxed">{pillar.description}</p>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5E5574]/5 to-transparent rounded-bl-[100px] -z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planned Initiatives Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF4E6] px-4 py-2 mb-4">
              <Rocket className="h-4 w-4 text-[#D97706]" />
              <span className="text-sm font-semibold text-[#D97706]">Launching in 2026</span>
            </div>
            <h2 className="font-julius text-4xl md:text-5xl text-[#3F3A52] mb-6">
              Planned Initiatives
            </h2>
            <p className="text-lg text-[#6B647F] max-w-2xl mx-auto">
              These are the programs we're developing to serve communities across Australia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLANNED_INITIATIVES.map((initiative, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-md border border-[#E6E1F2] hover:shadow-2xl hover:border-[#5E5574]/40 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#5E5574]/20 to-[#8B7FA8]/20">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-[#5E5574] shadow-lg">
                      {initiative.tag}
                    </span>
                    <span className="text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      {initiative.timeline}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#3F3A52] mb-3 group-hover:text-[#5E5574] transition-colors">
                    {initiative.title}
                  </h3>
                  <p className="text-sm text-[#6B647F] leading-relaxed mb-4">{initiative.description}</p>
                  <div className="flex items-center gap-2 text-xs text-[#8B7FA8] font-medium">
                    <Clock className="h-4 w-4" />
                    Target Launch: {initiative.launchQuarter}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Goals Section */}
      <section className="py-20 bg-gradient-to-r from-[#5E5574] via-[#7A6B92] to-[#8B7FA8]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-julius text-4xl md:text-5xl text-white mb-6">
              Our 2026 Impact Goals
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Measurable targets we're working towards to ensure meaningful community impact.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {IMPACT_GOALS.map((goal, index) => (
              <div
                key={index}
                className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-center h-16 mb-4">{goal.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{goal.value}</div>
                <div className="text-sm text-white/70 font-medium">{goal.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline/Roadmap Section */}
      <section className="py-20 bg-white/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-julius text-4xl md:text-5xl text-[#3F3A52] mb-6">
              2026 Roadmap
            </h2>
            <p className="text-lg text-[#6B647F] max-w-2xl mx-auto">
              Our phased approach to launching community initiatives throughout the year.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5E5574] via-[#8B7FA8] to-[#A89BBF] -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {TIMELINE.map((phase, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E6E1F2] hover:shadow-xl transition-shadow">
                      <div className="text-sm font-bold text-[#8B7FA8] mb-2">{phase.quarter}</div>
                      <h3 className="text-xl font-bold text-[#3F3A52] mb-3">{phase.title}</h3>
                      <p className="text-sm text-[#6B647F] leading-relaxed mb-4">{phase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.milestones.map((milestone, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#5E5574] bg-[#F7F5FB] px-3 py-1 rounded-full"
                          >
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {milestone}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:block relative flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#5E5574] to-[#8B7FA8] border-4 border-white shadow-lg" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5E5574] via-[#7A6B92] to-[#8B7FA8] p-12 md:p-20">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 mb-6">
                <Lightbulb className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">Be Part of the Journey</span>
              </div>

              <h2 className="font-julius text-3xl md:text-5xl text-white mb-6 max-w-3xl mx-auto">
                Want to Get Involved in Our 2026 Initiatives?
              </h2>

              <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Whether you're an organization interested in partnering, a volunteer eager to help,
                or a community seeking educational support, we'd love to hear from you.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-[#5E5574] transition-all hover:bg-[#F7F5FB] hover:shadow-2xl hover:-translate-y-1"
                >
                  Express Interest
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#newsletter"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 backdrop-blur-sm px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/20 hover:border-white"
                >
                  Stay Updated
                </Link>
              </div>

              <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {INVOLVEMENT_OPTIONS.map((option, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all text-left"
                  >
                    <div className="flex items-center justify-start h-10 mb-3">{option.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{option.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 bg-white/60">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Mail className="h-16 w-16 text-[#5E5574]" />
          </div>
          <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-[#6B647F] mb-8 leading-relaxed">
            Subscribe to receive updates on our 2026 community initiatives, launch dates,
            and opportunities to get involved.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border-2 border-[#D9CFF2] bg-white px-5 py-4 text-base text-[#3F3A52] placeholder-[#9A95AF] focus:border-[#5E5574] focus:outline-none focus:ring-4 focus:ring-[#5E5574]/20 transition-all"
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-[#5E5574] to-[#7A6B92] px-8 py-4 text-base font-bold text-white transition-all hover:shadow-xl hover:shadow-[#5E5574]/40 hover:-translate-y-0.5"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-[#9A95AF] mt-4">
            We'll only send important updates. No spam, ever.
          </p>
        </div>
      </section>
    </main>
  );
}

/* ==================== Data ==================== */

const VISION_PILLARS = [
  {
    icon: <Globe className="h-8 w-8 text-white" />,
    title: "Accessibility",
    description: "Breaking down geographical and socioeconomic barriers to ensure every Australian student has access to quality education support.",
  },
  {
    icon: <Handshake className="h-8 w-8 text-white" />,
    title: "Partnership",
    description: "Collaborating with schools, community organizations, and local groups to create sustainable educational ecosystems.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-white" />,
    title: "Empowerment",
    description: "Equipping students, parents, and communities with the tools and confidence to achieve academic and personal success.",
  },
];

const PLANNED_INITIATIVES = [
  {
    title: "Rural Education Outreach",
    description: "Bringing quality tutoring and educational resources to students in remote and regional Australian communities through online and in-person programs.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    tag: "Outreach",
    timeline: "Q1 2026",
    launchQuarter: "Q1 2026",
  },
  {
    title: "Indigenous Learning Support",
    description: "Building culturally sensitive educational partnerships with Indigenous communities to provide respectful, tailored learning support.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tag: "Partnership",
    timeline: "Q2 2026",
    launchQuarter: "Q2 2026",
  },
  {
    title: "Free Workshop Series",
    description: "Monthly free study skills, exam preparation, and wellbeing workshops open to all students across Australia.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    tag: "Workshops",
    timeline: "Q1 2026",
    launchQuarter: "Q1 2026",
  },
  {
    title: "Scholarship Program",
    description: "Providing full and partial scholarships to academically promising students from disadvantaged backgrounds.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    tag: "Scholarships",
    timeline: "Q3 2026",
    launchQuarter: "Q3 2026",
  },
  {
    title: "Parent Education Nights",
    description: "Empowering parents with practical strategies and tools to support their children's learning journey at home.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    tag: "Events",
    timeline: "Q2 2026",
    launchQuarter: "Q2 2026",
  },
  {
    title: "School Partnership Program",
    description: "Collaborating with schools to provide supplementary tutoring, mentorship programs, and teacher professional development.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    tag: "Partnership",
    timeline: "Q3 2026",
    launchQuarter: "Q3 2026",
  },
];

const IMPACT_GOALS = [
  { icon: <GraduationCap className="h-12 w-12 text-white" />, value: "200+", label: "Students Supported" },
  { icon: <School className="h-12 w-12 text-white" />, value: "8+", label: "Partner Schools" },
  { icon: <MapPin className="h-12 w-12 text-white" />, value: "6+", label: "Communities Reached" },
  { icon: <Handshake className="h-12 w-12 text-white" />, value: "5+", label: "Active Partnerships" },
];

const TIMELINE = [
  {
    quarter: "Q1 2026 • Jan - Mar",
    title: "Foundation & Pilot Programs",
    description: "Launching our first rural outreach pilot and free workshop series to test and refine our community engagement model.",
    milestones: ["Rural outreach pilot", "First workshop series", "Community feedback"],
  },
  {
    quarter: "Q2 2026 • Apr - Jun",
    title: "Partnership Development",
    description: "Establishing formal partnerships with Indigenous communities, schools, and local organizations to expand our reach.",
    milestones: ["Indigenous partnerships", "Parent education events", "School partnerships"],
  },
  {
    quarter: "Q3 2026 • Jul - Sep",
    title: "Scholarship Launch",
    description: "Opening applications for our inaugural scholarship program and scaling successful pilot initiatives.",
    milestones: ["Scholarship applications", "Program scaling", "Impact measurement"],
  },
  {
    quarter: "Q4 2026 • Oct - Dec",
    title: "Review & 2027 Planning",
    description: "Evaluating our 2026 impact, gathering community feedback, and planning expanded initiatives for 2027.",
    milestones: ["Annual review", "Impact report", "2027 planning"],
  },
];

const INVOLVEMENT_OPTIONS = [
  {
    icon: <Building2 className="h-8 w-8 text-white" />,
    title: "Organizations",
    description: "Partner with us to bring educational opportunities to your community or network.",
  },
  {
    icon: <UserPlus className="h-8 w-8 text-white" />,
    title: "Volunteers",
    description: "Share your time and expertise to support students and community programs.",
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Communities",
    description: "Connect with us if your community could benefit from our educational initiatives.",
  },
];