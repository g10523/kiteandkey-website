import Link from 'next/link'

export default function AdminFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="mt-auto border-t border-[#E6E0F2] bg-white">
            <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                    {/* Copyright */}
                    <div className="text-[#8C84A8] text-center sm:text-left">
                        <div>© {currentYear} Kite & Key Academy</div>
                        <div className="text-xs mt-1">ABN 65 689 890 515</div>
                    </div>

                    {/* Quick links */}
                    <div className="flex items-center gap-6 text-[#6B647F]">
                        <Link
                            href="/"
                            className="text-xs font-medium hover:text-[#5E5574] transition-colors"
                        >
                            Public Site
                        </Link>
                        <Link
                            href="/consultation"
                            className="text-xs font-medium hover:text-[#5E5574] transition-colors"
                        >
                            Booking Page
                        </Link>
                        <a
                            href="mailto:hello@kiteandkey.com.au"
                            className="text-xs font-medium hover:text-[#5E5574] transition-colors"
                        >
                            Support
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
