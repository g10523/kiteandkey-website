import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-300 antialiased";

  const variants = {
    primary: [
      // Core look
      "bg-[#5E5574] text-white",
      // Depth
      "shadow-[0_10px_30px_rgba(94,85,116,0.30)]",
      // Hover polish
      "hover:bg-[#4F4766] hover:shadow-[0_16px_50px_rgba(94,85,116,0.45)]",
      // Active
      "active:translate-y-[1px]",
    ].join(" "),

    ghost: [
      // Glass surface
      "bg-white/70 text-[#3F3A52]",
      "border border-[#D9CFF2]",
      "backdrop-blur-md",
      // Depth
      "shadow-[0_6px_18px_rgba(94,85,116,0.12)]",
      // Hover polish
      "hover:bg-white hover:border-[#BFB4E3]",
      "hover:shadow-[0_12px_36px_rgba(94,85,116,0.22)]",
    ].join(" "),
  };

  const cls = `${base} ${variants[variant]}`;

  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={cls} href={href}>
      {children}
    </Link>
  );
}
