"use client";

import { useEffect, useState } from "react";

export default function EnrolmentCapacity() {
  const TARGET = 85;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= TARGET) {
        current = TARGET;
        clearInterval(interval);
      }
      setProgress(current);
    }, 22); // smooth, calm speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-xl text-center">
      {/* Label */}
      <div className="mb-2 text-xs tracking-[0.18em] uppercase text-[#8C84A8]">
        2026 Term 1 Intake
      </div>

      {/* Glass bar */}
      <div className="relative h-3 overflow-hidden rounded-full border border-[#D9CFF2]/80 bg-white/60 backdrop-blur">
        {/* Fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#B8ADD8] via-[#5E5574] to-[#4F4865] transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />

        {/* Soft glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_30px_at_20%_50%,rgba(255,255,255,0.35),transparent_70%)]" />
      </div>

      {/* Percentage */}
      <div className="mt-2 text-sm font-medium text-[#5E5574]">
        {progress}% filled
      </div>

      {/* Disclaimer */}
      <div className="mt-1 text-xs text-[#9A95AF]">
        Student capacity: <span className="text-[#5E5574] font-medium">almost full</span>
      </div>
    </div>
  );
}
