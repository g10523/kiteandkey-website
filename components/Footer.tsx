import Container from "./Container";

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Enhanced glass backdrop with subtle gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-[#E7E0F6]/95
          via-[#F2EEFA]/90
          to-[#DDD4F2]/95
          backdrop-blur-2xl
        "
      />

      {/* Decorative top border */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#CFC6EA]/60 to-transparent" />

      <Container>
        <div className="relative grid gap-16 py-20 md:grid-cols-3 lg:gap-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/60 border border-[#CFC6EA]/50 text-sm font-bold text-[#5E5574] shadow-sm">
                K&K
              </div>
              <div>
                <div className="font-cormorant text-lg font-semibold text-[#3F3A52]">
                  Kite & Key Academy
                </div>
                <div className="text-xs text-[#8F87A8] tracking-wide">
                  Calm, Consistent Learning Mentorship
                </div>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[#6F6790]">
              Psychology-informed tutoring for Years 5–10 in Maths, English and
              Science — building confidence, clarity, and long-term capability.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-cormorant text-base font-semibold text-[#3F3A52] mb-5">
              Pages
            </h3>
            <ul className="space-y-3 text-sm text-[#6F6790]">
              <li>
                <a
                  href="/key-method"
                  className="hover:text-[#5E5574] transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">The KEY Method</span>
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  className="hover:text-[#5E5574] transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Courses</span>
                </a>
              </li>
              <li>
                <a
                  href="/meet-the-team"
                  className="hover:text-[#5E5574] transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Meet the Team</span>
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="hover:text-[#5E5574] transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Pricing</span>
                </a>
              </li>
              <li>
                <a
                  href="/consultation"
                  className="hover:text-[#5E5574] transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Consultation</span>
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="hover:text-[#5E5574] transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Careers</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-cormorant text-base font-semibold text-[#3F3A52] mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-[#6F6790]">
              <a
                href="mailto:hello@kiteandkey.com.au"
                className="block hover:text-[#5E5574] transition-colors duration-200 font-medium"
              >
                hello@kiteandkey.com.au
              </a>

              <div>
                <p className="text-xs text-[#9A95AF] mb-2">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/kiteandkeyacademy/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#5E5574] transition-colors duration-200"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#5E5574] transition-colors duration-200"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="relative border-t border-[#CFC6EA]/30 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-[#9A95AF]">
            <div className="space-y-1">
              <p>© 2026 Kite & Key Academy. All rights reserved.</p>
              <p>ABN 65 689 890 515</p>
            </div>
            <a
              href="/admin/login"
              className="opacity-40 hover:opacity-100 hover:text-[#5E5574] transition-all duration-200"
            >
              Admin Login
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
