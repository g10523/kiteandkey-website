import Container from "./Container";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Lavender glass backdrop */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-[#E7E0F6]/90
          via-[#DDD4F2]/85
          to-[#F2EEFA]/90
          backdrop-blur-xl
        "
      />

      {/* Soft top divider */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#CFC6EA] to-transparent" />

      <Container>
        <div className="relative grid gap-12 py-16 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6E0F5] border border-[#CFC6EA] text-xs font-semibold text-[#5E5574]">
                K&K
              </div>
              <div>
                <div className="text-sm font-semibold text-[#3F3A52]">
                  Kite & Key Academy
                </div>
                <div className="text-xs text-[#8F87A8]">
                  Calm, consistent learning mentorship
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#6F6790]">
              Psychology-informed tutoring for Years 5–10 in Maths, English and
              Science — building confidence, clarity, and long-term capability.
            </p>
          </div>

          {/* Pages */}
          <div>
            <div className="text-sm font-semibold text-[#3F3A52]">
              Pages
            </div>
            <ul className="mt-4 space-y-3 text-sm text-[#6F6790]">
              <li>
                <a href="/key-method" className="hover:text-[#5E5574] transition">
                  The KEY Method
                </a>
              </li>
              <li>
                <a href="/courses/maths" className="hover:text-[#5E5574] transition">
                  Courses
                </a>
              </li>
              <li>
                <a href="/meet-the-team" className="hover:text-[#5E5574] transition">
                  Meet the Team
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-[#5E5574] transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/consultation" className="hover:text-[#5E5574] transition">
                  Consultation
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-[#5E5574] transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-semibold text-[#3F3A52]">
              Contact
            </div>

            <div className="mt-4 space-y-3 text-sm text-[#6F6790]">
              <a
                href="mailto:hello@kiteandkey.com.au"
                className="block hover:text-[#5E5574] transition"
              >
                hello@kiteandkey.com.au
              </a>

              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#5E5574] transition"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#5E5574] transition"
                >
                  Facebook
                </a>
              </div>

              <div className="pt-4 text-xs text-[#9A95AF]">
                © 2025 Kite & Key Academy
                <br />
                ABN 65 689 890 515
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
