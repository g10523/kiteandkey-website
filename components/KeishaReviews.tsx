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
    <section className="relative border-t border-[#F1ECFA] bg-white py-24">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-[#8B7FA8] font-medium">
          Trusted by Families
        </p>
        <h2 className="mt-4 text-4xl font-cormorant text-[#3F3A52]">
          Kind words from our community
        </h2>
      </div>

      {/* Carousel */}
      <div
        className="relative mx-auto mt-16 max-w-[100vw] overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Edge fades - Enhanced for seamless look */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-6 px-12"
          style={{ width: "max-content" }}
        >
          {/* Duplicate reviews for seamless infinite loop */}
          {[...reviews, ...reviews, ...reviews].map((r, i) => (
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
    <div className="min-w-[340px] max-w-[340px] flex-shrink-0 rounded-2xl border border-[#E6E0F2] bg-[#F7F5FB]/50 px-8 py-8 transition-transform duration-500 hover:border-[#D9CFF2] hover:bg-white hover:shadow-glass">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6E0F5] text-xs font-semibold text-[#5E5574]">
          {initials}
        </div>
        <div>
          <div className="font-cormorant text-lg text-[#3F3A52] leading-none">{name}</div>
          <div className="text-[11px] font-medium text-[#8B7FA8] uppercase tracking-wide mt-1">Verify Student</div>
        </div>
      </div>

      <div className="mt-5 mb-4 h-px w-full bg-[#E6E0F2]/60" />

      <p className="text-[15px] leading-relaxed text-[#6B647F] italic font-light">"{body}"</p>

      <div className="mt-4 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-[#D9CFF2]" />
        <span className="text-xs font-medium text-[#5E5574]">{highlight}</span>
      </div>
    </div>
  );
}