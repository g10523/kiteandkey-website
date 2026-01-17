"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import LiftNavbar from "./LiftNavbar";

export default function Navbar() {
  const pathname = usePathname();

  const isLiftPage = pathname?.startsWith("/lift-initiative");
  if (isLiftPage) {
    return <LiftNavbar />;
  }

  const [openKey, setOpenKey] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [mobileYearAccordion, setMobileYearAccordion] = useState<string | null>(null);

  // Refs for timeout handling
  const keyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const coursesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ---------- Scroll handling ---------- */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- Close mobile menu on route change ---------- */
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileAccordion(null);
    setMobileYearAccordion(null);
  }, [pathname]);

  /* ---------- Prevent body scroll when mobile menu is open ---------- */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* ---------- Dropdown handlers with delay ---------- */
  const handleKeyEnter = () => {
    if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);
    setOpenKey(true);
  };

  const handleKeyLeave = () => {
    keyTimeoutRef.current = setTimeout(() => {
      setOpenKey(false);
    }, 150);
  };

  const handleCoursesEnter = () => {
    if (coursesTimeoutRef.current) clearTimeout(coursesTimeoutRef.current);
    setOpenCourses(true);
  };

  const handleCoursesLeave = () => {
    coursesTimeoutRef.current = setTimeout(() => {
      setOpenCourses(false);
      setActiveYear(null);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "py-0" : "py-0"
          }`}
      >
        {/* Scroll progress bar */}
        <div className="fixed left-0 top-0 z-[60] w-full">
          <div className="h-[3px] w-full bg-[#E6E1F2]" />
          <div
            className="absolute left-0 top-0 h-[3px] bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Stained glass backdrop */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${isScrolled
            ? "bg-gradient-to-br from-[#E7E0F6]/95 via-[#F2EEFA]/90 to-[#DDD4F2]/95 shadow-[0_8px_32px_rgba(126,110,170,0.15)]"
            : "bg-gradient-to-br from-[#E7E0F6]/95 via-[#F2EEFA]/90 to-[#DDD4F2]/95"
            } backdrop-blur-xl border-b border-[#CFC6EA]/80`}
        />

        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative h-11 w-11 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="Kite & Key Academy logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-julius text-lg font-bold tracking-[0.16em] uppercase text-[#3F3A52] transition-colors group-hover:text-[#5E5574]">
              Kite & Key Academy
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden lg:flex items-center gap-8">
            {/* ---------- KEY METHOD ---------- */}
            <div
              className="relative"
              onMouseEnter={handleKeyEnter}
              onMouseLeave={handleKeyLeave}
            >
              <button
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${openKey ? "text-[#3F3A52]" : "text-[#6B647F] hover:text-[#3F3A52]"
                  }`}
              >
                The KEY Method
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${openKey ? "rotate-180" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Hover bridge */}
              <div className="absolute left-1/2 top-full h-4 w-full -translate-x-1/2" />

              {/* Dropdown */}
              <div
                className={`absolute left-1/2 top-[calc(100%+12px)] w-[400px] -translate-x-1/2 transition-all duration-200 ${openKey
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
              >
                <div className="rounded-2xl border border-[#D9CFF2]/80 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(94,85,116,0.18)] overflow-hidden">
                  <div className="p-4 space-y-1">
                    <DropdownBlock
                      href="/key-method"
                      icon={<KeyIcon />}
                      title="The KEY Method"
                      description="Structured teaching systems for long-term mastery."
                    />
                    <DropdownBlock
                      href="/mindprint"
                      icon={<BrainIcon />}
                      title="MindPrint"
                      description="Cognitive learning profiles refined through diagnostics."
                    />
                    <DropdownBlock
                      href="/kite-and-key-in-the-community"
                      icon={<CommunityIcon />}
                      title="Kite & Key in the Community"
                      description="Our initiatives and outreach in the local community."
                    />
                    <DropdownBlock
                      href="/articles"
                      icon={<ArticleIcon />}
                      title="Articles"
                      description="Insights, tips, and educational resources."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- COURSES (YEAR → SUBJECT) ---------- */}
            <div
              className="relative"
              onMouseEnter={handleCoursesEnter}
              onMouseLeave={handleCoursesLeave}
            >
              <button
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${openCourses ? "text-[#3F3A52]" : "text-[#6B647F] hover:text-[#3F3A52]"
                  }`}
              >
                Courses
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${openCourses ? "rotate-180" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Hover bridge */}
              <div className="absolute left-1/2 top-full h-4 w-full -translate-x-1/2" />

              {/* Dropdown */}
              <div
                className={`absolute left-1/2 top-[calc(100%+12px)] w-[520px] -translate-x-1/2 transition-all duration-200 ${openCourses
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
              >
                <div className="rounded-2xl border border-[#D9CFF2]/80 bg-white/95 backdrop-blur-xl shadow-[0_24px_70px_rgba(94,85,116,0.22)] overflow-hidden">
                  <div className="grid grid-cols-5">
                    {/* LEFT: YEARS */}
                    <div className="col-span-2 p-4 bg-[#FAFAFA]/50 border-r border-[#E6E1F2]">
                      <div className="mb-3 px-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8C84A8]">
                        Year Level
                      </div>

                      <div className="space-y-1">
                        {YEAR_GROUPS.map((year) => (
                          <div
                            key={year}
                            onMouseEnter={() => setActiveYear(year)}
                            className={`cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 flex items-center justify-between ${activeYear === year
                              ? "bg-[#5E5574] text-white shadow-md"
                              : "text-[#6B647F] hover:bg-[#F4F1FB] hover:text-[#3F3A52]"
                              }`}
                          >
                            {year}
                            <svg
                              className={`h-4 w-4 transition-opacity ${activeYear === year ? "opacity-100" : "opacity-0"
                                }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT: SUBJECTS */}
                    <div className="col-span-3 p-4">
                      <div className="mb-3 px-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8C84A8]">
                        Subjects
                      </div>

                      {activeYear ? (
                        <div className="space-y-1">
                          {YEAR_TO_SUBJECTS[activeYear].map((subject) => (
                            <Link
                              key={subject}
                              href={
                                subject === "Selective"
                                  ? "/courses/selective"
                                  : `/courses/${activeYear
                                    .toLowerCase()
                                    .replace(" ", "-")}/${subject.toLowerCase()}`
                              }
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#6B647F] transition-all hover:bg-[#F4F1FB] hover:text-[#3F3A52] group"
                            >
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4F1FB] group-hover:bg-[#E6E0F5]">
                                {SUBJECT_ICONS[subject]}
                              </span>
                              <div>
                                <div className="font-medium">{subject}</div>
                                <div className="text-xs text-[#9A95AF]">
                                  {subject === "Selective" ? "Coming Soon" : `${activeYear} curriculum`}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center py-8">
                          <div className="text-center">
                            <svg
                              className="h-8 w-8 mx-auto mb-2 text-[#9A95AF]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                              />
                            </svg>
                            <div className="text-sm text-[#9A95AF]">
                              Select a year level
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-[#E6E1F2] bg-[#FAFAFA]/50 px-4 py-3">
                    <Link
                      href="/courses"
                      className="flex items-center justify-between text-sm text-[#5E5574] hover:text-[#3F3A52] font-medium"
                    >
                      View all courses
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <NavLink href="/meet-the-team" label="Meet the Team" pathname={pathname} />
            <NavLink href="/pricing" label="Pricing" pathname={pathname} />
            <NavLink href="/consultation" label="Consultation" pathname={pathname} />
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/enrol"
              className="rounded-xl bg-[#5E5574] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/25"
            >
              Enrol Now
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-[#D9CFF2] bg-white/70 px-5 py-2.5 text-sm font-medium text-[#5E5574] transition-all hover:bg-white hover:border-[#5E5574]/30"
            >
              Log in
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9CFF2] bg-white/70"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`h-0.5 w-5 bg-[#5E5574] transition-all duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-5 bg-[#5E5574] transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-5 bg-[#5E5574] transition-all duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#3F3A52]/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-gradient-to-b from-[#F7F5FB] to-[#EEEAF8] shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex h-full flex-col overflow-y-auto pt-24 pb-8 px-6">
            {/* Mobile nav links */}
            <div className="space-y-2">
              {/* KEY Method Accordion */}
              <MobileAccordion
                title="The KEY Method"
                isOpen={mobileAccordion === "key"}
                onToggle={() =>
                  setMobileAccordion(mobileAccordion === "key" ? null : "key")
                }
              >
                <MobileDropdownLink href="/key-method" label="The KEY Method" />
                <MobileDropdownLink href="/mindprint" label="MindPrint" />
                <MobileDropdownLink href="/kite-and-key-in-the-community" label="Kite & Key in the Community" />
                <MobileDropdownLink href="/articles" label="Articles" />
              </MobileAccordion>

              {/* Courses Accordion */}
              <MobileAccordion
                title="Courses"
                isOpen={mobileAccordion === "courses"}
                onToggle={() =>
                  setMobileAccordion(mobileAccordion === "courses" ? null : "courses")
                }
              >
                {YEAR_GROUPS.map((year) => (
                  <MobileNestedAccordion
                    key={year}
                    title={year}
                    isOpen={mobileYearAccordion === year}
                    onToggle={() =>
                      setMobileYearAccordion(mobileYearAccordion === year ? null : year)
                    }
                  >
                    {YEAR_TO_SUBJECTS[year].map((subject) => (
                      <MobileDropdownLink
                        key={`${year}-${subject}`}
                        href={
                          subject === "Selective"
                            ? "/courses/selective"
                            : `/courses/${year.toLowerCase().replace(" ", "-")}/${subject.toLowerCase()}`
                        }
                        label={subject}
                      />
                    ))}
                  </MobileNestedAccordion>
                ))}
              </MobileAccordion>

              <MobileNavLink href="/meet-the-team" label="Meet the Team" />
              <MobileNavLink href="/pricing" label="Pricing" />
              <MobileNavLink href="/consultation" label="Consultation" />
            </div>

            {/* Mobile actions */}
            <div className="mt-auto space-y-3 pt-8 border-t border-[#D9CFF2]/50">
              <Link
                href="/enrol"
                className="flex items-center justify-center rounded-xl bg-[#5E5574] px-5 py-3 text-sm font-medium text-white"
              >
                Enrol Now
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center rounded-xl border border-[#D9CFF2] bg-white/70 px-5 py-3 text-sm font-medium text-[#5E5574]"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ==================== Icon Components ==================== */

function KeyIcon() {
  return (
    <svg className="h-5 w-5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg className="h-5 w-5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg className="h-5 w-5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg className="h-5 w-5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function ArticleIcon() {
  return (
    <svg className="h-5 w-5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function EnglishIcon() {
  return (
    <svg className="h-5 w-5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function MathsIcon() {
  return (
    <svg className="h-5 w-5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function ScienceIcon() {
  return (
    <svg className="h-5 w-5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}

function SelectiveIcon() {
  return (
    <svg className="h-5 w-5 text-[#5E5574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

/* ==================== Helper Components ==================== */

function NavLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string | null;
}) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative text-sm font-medium transition-colors ${isActive ? "text-[#3F3A52]" : "text-[#6B647F] hover:text-[#3F3A52]"
        }`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#5E5574]" />
      )}
    </Link>
  );
}

function DropdownBlock({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-4 rounded-xl p-3 transition-all hover:bg-[#F7F5FB] group"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F1FB] group-hover:bg-[#E6E0F5] transition-colors">
        {icon}
      </span>
      <div>
        <div className="text-sm font-semibold text-[#3F3A52] group-hover:text-[#5E5574]">
          {title}
        </div>
        <div className="mt-0.5 text-sm text-[#6B647F]">{description}</div>
      </div>
    </Link>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-[#3F3A52] hover:bg-white/50"
    >
      {label}
      <svg
        className="h-4 w-4 text-[#9A95AF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  );
}

function MobileAccordion({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-4 py-3 text-base font-medium transition-colors ${isOpen ? "bg-white/70 text-[#3F3A52]" : "text-[#3F3A52] hover:bg-white/50"
          }`}
      >
        {title}
        <svg
          className={`h-4 w-4 text-[#9A95AF] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="bg-white/50 px-2 py-2 max-h-[700px] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function MobileNestedAccordion({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isOpen ? "bg-[#F4F1FB] text-[#3F3A52]" : "text-[#6B647F] hover:bg-[#F4F1FB]/50 hover:text-[#3F3A52]"
          }`}
      >
        {title}
        <svg
          className={`h-3.5 w-3.5 text-[#9A95AF] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="pl-3 py-1 space-y-0.5">{children}</div>
      </div>
    </div>
  );
}

function MobileDropdownLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center rounded-lg px-3 py-2 text-sm text-[#6B647F] hover:bg-[#F4F1FB] hover:text-[#3F3A52]"
    >
      {label}
    </Link>
  );
}

/* ==================== Data ==================== */

const YEAR_GROUPS = ["Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"];

const YEAR_TO_SUBJECTS: Record<string, string[]> = {
  "Year 5": ["English", "Maths", "Selective"],
  "Year 6": ["English", "Maths", "Selective"],
  "Year 7": ["English", "Maths", "Science"],
  "Year 8": ["English", "Maths", "Science"],
  "Year 9": ["English", "Maths", "Science"],
  "Year 10": ["English", "Maths", "Science"],
};

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  English: <EnglishIcon />,
  Maths: <MathsIcon />,
  Science: <ScienceIcon />,
  Selective: <SelectiveIcon />,
};