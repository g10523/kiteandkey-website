"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, GraduationCap, Sparkles } from "lucide-react";

/* ---------- Types ---------- */

type Member = {
  name: string;
  role: string;
  image: string;
  atar?: string;
  university: string;
  degree: string;
  subjects: string[];
  standoutFeature: string;
  highlights: string[];
  interests: string[];
  bio: string;
};

/* ---------- Data ---------- */

const leadership: Member[] = [
  {
    name: "Keisha Kewalram",
    role: "Founder",
    image: "/team/keisha.jpg",
    atar: "97.4",
    university: "University of Sydney",
    degree: "Diagnostic Radiography",
    subjects: ["Maths", "Science", "English"],
    standoutFeature: "Creator of The KEY Method",
    highlights: [
      "2+ years tutoring experience",
      "Psychology-informed teaching",
      "Personalised learning pathways",
    ],
    interests: ["Travel", "Gym", "Family & Friends"],
    bio: `Hey! I'm Keisha, a second-year Diagnostic Radiography student at the University of Sydney. I graduated with a 97.4 ATAR, and over the past two years I've been tutoring students across all year groups.

In that time, I've learned something powerful: every child learns differently, and the right guidance can transform not just grades, but confidence, curiosity, and independence.

Through my tutoring experience, I developed 'The KEY Method', which combines structured teaching with insights from cognitive psychology. It's designed to help students understand how they think and learn, not just what to study. Our approach is calm, consistent, and personalised, helping each child build lasting skills and genuine confidence in Maths, Science, and English.

I do also believe that learning is about balance. Outside of school, I love to spend time with my family and friends, travel and go to the gym.`,
  },
  {
    name: "Giovanni Thomas",
    role: "Strategist & Director",
    image: "/team/giovanni.jpg",
    university: "Macquarie University",
    degree: "Actuarial & Finance",
    subjects: [],
    standoutFeature: "Strategy & Systems Architecture",
    highlights: [
      "Research & Data Analysis",
      "Methodology Development",
      "Student Psychology Focus",
    ],
    interests: ["Guitar", "Debate", "Random Facts"],
    bio: `Hey there, so glad you made it this far!

I'm Gio, an Actuarial and Finance Student at Macquarie University. But that's besides the point — my role here is to glide Kite & Key Academy to greater heights through strategic methods.

Here at Kite & Key, methodology, research, data — and key word 'strategy' — are the foundations of what we are about. I'm here to develop world class methods to help our next generations push the boundaries of their capabilities.

Keisha, the Team and I work hard behind the scenes to understand the psyche of what drives your child forward. Sure, I could talk about The KEY Method, I could even bring up the rigorous training and hard work your tutors undergo to teach, however, beneath all the presentation, our ethos is simple: most kids are working far below their potential. With the right guidance, they can achieve so much more.

That is what I am here for — to shine a light on tailored strategies to unlock this potential.

Anyways, I do enjoy playing the guitar, having a structured debate and going down a rabbit hole of useless but interesting topics. Did you know octopuses have three hearts? At Kite & Key, we only need one — and we put it fully into teaching.`,
  },
];

const tutors: Member[] = [
  {
    name: "Lucia Han",
    role: "Tutor · Years 5–10",
    image: "/team/lucia.jpg",
    atar: "97.15",
    university: "Australian National University",
    degree: "PPE & Psychology",
    subjects: ["Maths", "English", "Science"],
    standoutFeature: "Balance-focused learning approach",
    highlights: [
      "Understanding human psychology",
      "Visual Arts background",
      "Social & engaging teaching",
    ],
    interests: ["Visual Arts", "Social activities", "Family time"],
    bio: `Hi!

My name is Lucia, a second year uni student studying at ANU. I'm completing a double degree with a Bachelor of Politics, Philosophy & Economics with a Bachelor of Psychology.

I have always been very dedicated to learning about the inner workings of people and societies and thoroughly enjoyed the subject Society & Culture in high school.

In 2023 I received an ATAR of 97.15, which reflects the consistent effort I put into my studies throughout school.

In saying that, I am a social butterfly and my last few years at school were filled with many things separate from study, spending time with my friends/family. I was inspired to work hard through doing subjects I thoroughly enjoyed, such as Visual Arts and surrounding myself with like-minded peers who wanted to excel.`,
  },
  {
    name: "Philo Daoud",
    role: "Tutor · Years 5–10",
    image: "/team/philo.jpg",
    atar: "99+",
    university: "James Cook University",
    degree: "Medicine",
    subjects: ["Maths"],
    standoutFeature: "1st in NSW for Maths Extension 1",
    highlights: [
      "8th in NSW for Maths Extension 2",
      "Makes maths fun & approachable",
      "Focus on the 'why' behind concepts",
    ],
    interests: ["Football", "Gym", "Church Community"],
    bio: `Hi, I'm Philo!

I'm currently a medical student at James Cook University with a passion for learning, teaching, and helping others succeed.

I graduated high school with a 99+ ATAR, achieving 1st in the state for Mathematics Extension 1 and 8th in the state for Mathematics Extension 2. I love making maths approachable and showing students that it can actually be fun when you understand the "why" behind it.

Outside of study and tutoring, you'll usually find me playing football (it's not called soccer), at the gym, spending time with friends, or at church. I enjoy staying active, challenging myself, and being part of a community — values I also bring to my tutoring.

My goal as a tutor is not only to help students reach their academic goals, but also to build their confidence and problem-solving skills so they can thrive in every challenge they face.`,
  },
  {
    name: "Gihan Wijemanne",
    role: "Tutor · Years 5–10",
    image: "/team/gihan.jpg",
    atar: "99.00",
    university: "University of NSW",
    degree: "Advanced Maths & Computer Science",
    subjects: ["Maths", "Science"],
    standoutFeature: "HSC All-Rounder (90+ every subject)",
    highlights: [
      "Fresh 2024 HSC perspective",
      "STEM transformation story",
      "Companion-style tutoring",
    ],
    interests: ["Basketball", "K-dramas", "Movies"],
    bio: `Hello!

I am Gihan and I am currently a first year student studying Advanced Mathematics and Computer Science at the University of New South Wales. After just recently graduating in 2024 I am very familiar with the tumultuous high school journey and would love to share my tips and tricks to not only excel through high school but also set the basis for any of your future studies.

I graduated high school with a 99.00 ATAR as a HSC All-Rounder (90+ mark in every subject). While many of my HSC subjects were very STEM heavy, I wasn't the biggest fan of math or science in my junior years. It was actually after I dived deeper and a little out of my comfort zone that I was able to truly engage with these subjects and what I was learning.

Being someone who underwent this transformation, it is my passion to also guide upcoming students towards this same discovery since I believe that students perform their best when they enjoy what they do.

Beyond just academics I am a huge fan of playing and watching sports, my personal favourite being basketball. I also love streaming TV shows and movies from k-dramas to horror movies. You name it, I have probably watched it.

I believe being a tutor goes beyond just teaching but rather being a companion as well, since sometimes learning can be scary so it's comforting to know that you are not alone in this journey.`,
  },
  {
    name: "Rachel Iie",
    role: "Tutor · Years 5–10",
    image: "/team/rachel.jpg",
    atar: "97.95",
    university: "University of NSW",
    degree: "Exercise Science & Physiotherapy",
    subjects: ["Maths"],
    standoutFeature: "Personalised lesson formatting",
    highlights: [
      "Extensive tutoring experience",
      "Adapts to individual learning styles",
      "Music teaching background",
    ],
    interests: ["Basketball", "Piano", "Violin"],
    bio: `Hello!

My name is Rachel, and I am a second year studying my Bachelors of Exercise Science and Masters of Physiotherapy and Exercise Physiology at UNSW.

I graduated with an ATAR of 97.95 in 2023, and from then onward I have had extensive tutoring experience with a wide range of students. I am keen on helping students out with anything that they need, and am particularly passionate about tailoring lessons into a format that is specific to each student, as everyone learns best in different ways!

Outside of work, I love to play basketball — I play in a team at uni and it has been really fun! I also play the piano and violin too, and have experience teaching instruments as well.`,
  },
  {
    name: "Flynn Gowing",
    role: "Tutor · Years 5–10",
    image: "/team/flynn.jpg",
    atar: "95.05",
    university: "University of NSW",
    degree: "Mining Engineering (Honours)",
    subjects: ["Maths", "English", "Science"],
    standoutFeature: "Deep understanding focus",
    highlights: [
      "HSC tutoring experience",
      "Patient & thorough explanations",
      "Goal-oriented approach",
    ],
    interests: ["Tennis", "Music", "Friends & Family"],
    bio: `Hi!

I'm Flynn, a second year uni student currently studying an honours degree of Mining Engineering at UNSW.

I received a 95.05 ATAR as a 2023 graduate and have had plenty of experience tutoring HSC students in a range of different subjects. I love to tutor and help younger students achieve their goals and passions and will always take the time to make sure you understand the content in full!

I enjoy playing tennis, spending time with friends and family, and blasting my music at full volume (annoying I know).`,
  },
  {
    name: "Duvindu Liyanage",
    role: "Tutor · Years 5–10",
    image: "/team/duvindu.jpg",
    atar: "95.85",
    university: "Macquarie University",
    degree: "Law & Commerce (Finance)",
    subjects: ["Maths", "English", "Science"],
    standoutFeature: "Confidence-building focus",
    highlights: [
      "Supportive teaching style",
      "Challenge-based learning",
      "Independence development",
    ],
    interests: ["Gym", "Basketball", "Family & Friends"],
    bio: `Hi!

I'm Duvindu, a first-year student at Macquarie University studying a double degree in Law and Commerce, majoring in Finance.

I graduated in 2024 with a 95.85 ATAR and have experience tutoring. I enjoy helping students work through challenges and feel supported as they build confidence and skills to achieve academic success.

Outside of uni, I'm at the gym, playing basketball or spending time with family & friends.`,
  },
  {
    name: "Ghashika Ramesh",
    role: "Tutor · Years 7–10",
    image: "/team/ghashika.jpg",
    atar: "95+",
    university: "University of Sydney",
    degree: "Science (Anatomy & Immunology)",
    subjects: ["Science"],
    standoutFeature: "Creative & balanced approach",
    highlights: [
      "Performing Arts diploma",
      "Time management expertise",
      "Passion for sparking curiosity",
    ],
    interests: ["Dance", "Music Production", "Fantasy Books"],
    bio: `Hey!

I'm Ghashika, a current first year at USYD completing a Bachelor of Science majoring in Anatomy/Histology and Immunology/Pathology.

I'm a 2024 HSC graduate, receiving a 95+ ATAR, and I am excited to share my knowledge with students. I have always had a deep appreciation for science, and I'm keen on continuing that spark in both myself and others.

I'm strongly interested in dance and music, even pursuing an Advanced Diploma of Performing Arts at Brent Street! I'm an avid reader (fantasy on top!), and love creating music on the side!

Over the years, I have learned that managing your time effectively is essential for a balanced lifestyle, and I'm excited to share as much as I can!`,
  },
];

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

/* ---------- Page ---------- */

export default function MeetTheTeamPage() {
  const headerAnim = useScrollAnimation();
  const leadershipAnim = useScrollAnimation();
  const tutorsAnim = useScrollAnimation();

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5FB] to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E6E0F5]/30 rounded-full blur-3xl" />

        <div
          ref={headerAnim.ref}
          className={`relative mx-auto max-w-7xl px-6 text-center transition-all duration-700 ${
            headerAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8C84A8]">
            Our Team
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[#3F3A52]">
            Meet the people behind Kite & Key
          </h1>
          <p className="mt-5 text-lg text-[#6B647F] max-w-2xl mx-auto">
            Calm, capable educators guided by structure, care, and long-term thinking.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section ref={leadershipAnim.ref} className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionDivider label="Leadership" isVisible={leadershipAnim.isVisible} />

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {leadership.map((member, i) => (
              <LeaderCard
                key={member.name}
                member={member}
                index={i}
                isVisible={leadershipAnim.isVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tutors Section */}
      <section ref={tutorsAnim.ref} className="py-16 bg-[#FAFBFF]">
        <div className="mx-auto max-w-7xl px-6">
          <SectionDivider label="Tutors" isVisible={tutorsAnim.isVisible} />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {tutors.map((member, i) => (
              <TutorCard
                key={member.name}
                member={member}
                index={i}
                isVisible={tutorsAnim.isVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#3F3A52]">
            Ready to find the right tutor?
          </h2>
          <p className="mt-3 text-[#6B647F]">
            Book a free consultation and we'll match your child with the perfect fit.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation"
              className="inline-flex items-center rounded-xl bg-[#5E5574] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#4F4865] hover:shadow-lg"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-xl border border-[#D9CFF2] bg-white px-6 py-3 text-sm font-semibold text-[#5E5574] transition-all hover:bg-[#F7F5FB]"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Section Divider ---------- */

function SectionDivider({ label, isVisible }: { label: string; isVisible: boolean }) {
  return (
    <div
      className={`flex items-center gap-4 transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-px flex-1 bg-[#E6E0F2]" />
      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#8C84A8]">
        {label}
      </span>
      <div className="h-px flex-1 bg-[#E6E0F2]" />
    </div>
  );
}

/* ---------- Leader Card ---------- */

function LeaderCard({
  member,
  index,
  isVisible,
}: {
  member: Member;
  index: number;
  isVisible: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl border border-[#E6E0F2] bg-white p-8 transition-all duration-500 hover:border-[#D9CFF2] hover:shadow-lg hover:shadow-[#5E5574]/5 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-6">
        <div className="relative shrink-0">
          <div className="h-24 w-24 overflow-hidden rounded-2xl border border-[#E6E0F2]">
            <Image
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          {member.atar && (
            <div className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-lg bg-[#5E5574] px-2.5 py-1 text-xs font-bold text-white shadow-md">
              <GraduationCap size={12} />
              {member.atar}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-[#3F3A52]">{member.name}</h3>
          <p className="text-sm font-medium text-[#5E5574]">{member.role}</p>
          <p className="text-sm text-[#8C84A8] mt-1">
            {member.degree} · {member.university}
          </p>

          {member.subjects.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {member.subjects.map((subject) => (
                <span
                  key={subject}
                  className="rounded-md bg-[#F4F1FB] px-2.5 py-1 text-xs font-medium text-[#5E5574]"
                >
                  {subject}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Standout Feature */}
      <div className="mt-6 flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#F7F5FB] to-[#EEEAF8] px-5 py-4">
        <Sparkles size={18} className="text-[#5E5574] shrink-0" />
        <span className="text-sm font-semibold text-[#3F3A52]">
          {member.standoutFeature}
        </span>
      </div>

      {/* Highlights */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {member.highlights.map((highlight, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm text-[#6B647F] bg-[#FAFBFF] rounded-lg px-3 py-2"
          >
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9CFF2]" />
            <span className="truncate">{highlight}</span>
          </div>
        ))}
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E6E0F2] py-3 text-sm font-medium text-[#5E5574] transition-colors hover:bg-[#F7F5FB]"
      >
        {expanded ? "Show less" : "Read full bio"}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expanded Bio */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          expanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-6 border-t border-[#E6E0F2] pt-6">
          <p className="text-sm text-[#5E5574] leading-[1.8] whitespace-pre-line">
            {member.bio}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs font-semibold text-[#8C84A8] uppercase tracking-wider">
              Interests:
            </span>
            <div className="flex flex-wrap gap-2">
              {member.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-[#E6E0F2] bg-white px-3 py-1 text-xs text-[#6B647F]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Tutor Card ---------- */

function TutorCard({
  member,
  index,
  isVisible,
}: {
  member: Member;
  index: number;
  isVisible: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const isTopPerformer =
    member.atar &&
    (member.atar.includes("99") || member.standoutFeature.includes("1st"));

  return (
    <div
      className={`relative rounded-2xl border bg-white p-6 lg:p-8 transition-all duration-500 hover:shadow-lg hover:shadow-[#5E5574]/5 ${
        isTopPerformer
          ? "border-[#D9CFF2]"
          : "border-[#E6E0F2] hover:border-[#D9CFF2]"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      {/* Top performer badge */}
      {isTopPerformer && (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5E5574] px-3 py-1.5 text-xs font-semibold text-white shadow-md">
            <Sparkles size={12} />
            Top Performer
          </span>
        </div>
      )}

      {/* Header */}
      <div className={`flex items-start gap-5 ${isTopPerformer ? "mt-3" : ""}`}>
        <div className="relative shrink-0">
          <div className="h-20 w-20 overflow-hidden rounded-xl border border-[#E6E0F2]">
            <Image
              src={member.image}
              alt={member.name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-[#3F3A52]">{member.name}</h3>
              <p className="text-sm text-[#8C84A8]">
                {member.degree} · {member.university}
              </p>
            </div>
            {member.atar && (
              <div className="shrink-0 flex items-center gap-1.5 rounded-lg bg-[#F4F1FB] border border-[#E6E0F2] px-3 py-1.5 text-sm font-bold text-[#5E5574]">
                <GraduationCap size={14} />
                {member.atar}
              </div>
            )}
          </div>

          {/* Subjects */}
          <div className="mt-3 flex flex-wrap gap-2">
            {member.subjects.map((subject) => (
              <span
                key={subject}
                className="rounded-md bg-[#F4F1FB] px-2.5 py-1 text-xs font-medium text-[#5E5574]"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Standout Feature */}
      <div className="mt-5 rounded-xl bg-[#F7F5FB] px-5 py-4">
        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-[#5E5574] shrink-0" />
          <span className="text-sm font-semibold text-[#3F3A52]">
            {member.standoutFeature}
          </span>
        </div>
      </div>

      {/* Highlights row */}
      <div className="mt-4 flex flex-wrap gap-2">
        {member.highlights.map((highlight, i) => (
          <span
            key={i}
            className="text-xs text-[#6B647F] bg-white border border-[#E6E0F2] px-3 py-1.5 rounded-lg"
          >
            {highlight}
          </span>
        ))}
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E6E0F2] py-3 text-sm font-medium text-[#5E5574] transition-colors hover:bg-[#F7F5FB]"
      >
        {expanded ? "Show less" : "Read more"}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expanded Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-5 border-t border-[#E6E0F2] pt-5">
          {/* Bio - displayed in a more readable format */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main bio */}
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold text-[#8C84A8] uppercase tracking-wider mb-3">
                About {member.name.split(" ")[0]}
              </p>
              <p className="text-sm text-[#5E5574] leading-[1.8] whitespace-pre-line">
                {member.bio}
              </p>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Key Strengths */}
              <div>
                <p className="text-xs font-semibold text-[#8C84A8] uppercase tracking-wider mb-3">
                  Key Strengths
                </p>
                <div className="space-y-2">
                  {member.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-[#5E5574]"
                    >
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#5E5574]" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <p className="text-xs font-semibold text-[#8C84A8] uppercase tracking-wider mb-3">
                  Outside of Tutoring
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-[#E6E0F2] bg-[#FAFBFF] px-3 py-1 text-xs text-[#6B647F]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}