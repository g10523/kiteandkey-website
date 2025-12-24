"use client";

export default function AnimatedGlassLayer({
  variant = "default",
}: {
  variant?: "default" | "hero" | "soft";
}) {
  return (
    <div
      aria-hidden
      className={`
        pointer-events-none
        fixed inset-0
        -z-10
        overflow-hidden
      `}
    >
      {/* Primary glass wash */}
      <div className={`kk-glass-wash kk-${variant}`} />

      {/* Floating highlights */}
      <div className="kk-glass-orb orb-1" />
      <div className="kk-glass-orb orb-2" />
    </div>
  );
}

