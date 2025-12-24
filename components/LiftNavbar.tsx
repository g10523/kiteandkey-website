// components/LiftNavbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HandHeart, Home } from "lucide-react";

export default function LiftNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setScrolled(scrollTop > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* Progress bar - Lift themed */}
      <div className="fixed left-0 top-0 z-[60] w-full">
        <div className="h-[3px] w-full bg-[#D1E8ED]" />
        <div
          className="absolute left-0 top-0 h-[3px] bg-gradient-to-r from-[#5B9AAD] to-[#3D8494] transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Background */}
      <div
        className={`absolute inset-0 border-b transition-all duration-300 ${
          scrolled
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