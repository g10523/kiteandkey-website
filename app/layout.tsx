import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Julius_Sans_One } from "next/font/google";

import { BackgroundProvider } from "../components/BackgroundContext";
import StainedGlassBackground from "../components/AnimatedGlassLayer";

export const metadata: Metadata = {
  title: "Kite & Key Academy",
  description:
    "Calm, consistent learning mentorship for Years 5–10 in Maths, English and Science.",
};

export const julius = Julius_Sans_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-julius",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${julius.variable}
          min-h-screen
          antialiased
          text-[#3F3A52]
        `}
      >
        {/* ✅ HARD GLOBAL BACKGROUND (always visible fallback) */}
        <div className="kk-global-bg" />

        {/* ================= Background System ================= */}
        <BackgroundProvider>
          {/* Toggleable stained-glass background */}
          <StainedGlassBackground />

          {/* ================= App Shell ================= */}
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </BackgroundProvider>
      </body>
    </html>
  );
}
