"use client";

import { useRef, useEffect, useState } from "react";

const reviews = [
  {
    name: "Parmiss Parsi",
    initials: "PP",
    highlight: "Clear, structured explanations",
    body: "She explains things in a way that actually makes sense and always makes me feel comfortable asking questions.",
  },
  {
    name: "Isaac Lee",
    initials: "IL",
    highlight: "Learns at my exact pace",
    body: "Keisha helped me iron out gaps in my understanding and always knew when to slow down or push forward.",
  },
  {
    name: "Ashley Johnson",
    initials: "AJ",
    highlight: "Confidence growth",
    body: "She has made such a difference in my learning. I feel far more confident approaching difficult topics.",
  },
  {
    name: "Trent & Emily",
    initials: "T&E",
    highlight: "High standards exceeded",
    body: "Our standards were high when choosing a tutor and Keisha exceeded them in every way.",
  },
];

const CARD_WIDTH = 320;
const GAP = 24;
const SCROLL_SPEED = 0.5; // pixels per frame

export default function KeishaReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);
  const [showArrows, setShowArrows] = useState(false);

  const singleSetWidth = reviews.length * (CARD_WIDTH + GAP);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (trackRef.current) {
        if (!isPausedRef.current) {
          positionRef.current += SCROLL_SPEED;

          // Reset for seamless infinite loop
          if (positionRef.current >= singleSetWidth) {
            positionRef.current = 0;
          }

          trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [singleSetWidth]);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
    setShowArrows(true);
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    setShowArrows(false);
  };

  const nudge = (direction: "left" | "right") => {
    if (!trackRef.current) return;

    const delta = CARD_WIDTH + GAP;

    if (direction === "right") {
      positionRef.current += delta;
      if (positionRef.current >= singleSetWidth) {
        positionRef.current -= singleSetWidth;
      }
    } else {
      positionRef.current -= delta;
      if (positionRef.current < 0) {
        positionRef.current += singleSetWidth;
      }
    }

    // Apply smooth transition for manual navigation
    trackRef.current.style.transition = "transform 0.4s ease-out";
    trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;

    // Remove transition after animation completes
    setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
      }
    }, 400);
  };

  return (
    <section className="relative border-t border-[#E6E8F0] bg-[#F7F5FB] py-24">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-wider text-[#9A95AF]">
          Social proof
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[#3F3A52]">
          Keisha&apos;s Reviews
        </h2>
        <p className="mt-1 text-sm text-[#6B647F]">
          Founder · Kite &amp; Key Academy
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative mx-auto mt-12 max-w-6xl overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#F7F5FB] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#F7F5FB] to-transparent" />

        {/* Arrows - appear on hover */}
        <button
          onClick={() => nudge("left")}
          aria-label="Previous review"
          className={`absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#5E5574] shadow-lg backdrop-blur transition-all duration-300 hover:bg-[#EDE9F7] hover:scale-110 ${
            showArrows ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={() => nudge("right")}
          aria-label="Next review"
          className={`absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#5E5574] shadow-lg backdrop-blur transition-all duration-300 hover:bg-[#EDE9F7] hover:scale-110 ${
            showArrows ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-6 px-24"
          style={{ width: "max-content" }}
        >
          {/* Duplicate reviews for seamless infinite loop */}
          {[...reviews, ...reviews].map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Review Card ---------- */
function ReviewCard({
  name,
  initials,
  highlight,
  body,
}: {
  name: string;
  initials: string;
  highlight: string;
  body: string;
}) {
  return (
    <div className="min-w-[320px] max-w-[320px] flex-shrink-0 rounded-2xl border border-[#D9CFF2] bg-white/75 px-6 py-5 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5E5574] text-xs font-semibold text-white">
          {initials}
        </div>
        <div>
          <div className="text-sm font-medium text-[#3F3A52]">{name}</div>
          <div className="text-[11px] text-[#F2B705]">★★★★★</div>
        </div>
      </div>

      <div className="mt-3 inline-block rounded-full bg-[#E6E0F5] px-3 py-1 text-xs font-medium text-[#4B445F]">
        {highlight}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[#6B647F]">{body}</p>
    </div>
  );
}