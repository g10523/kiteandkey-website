'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import { BackgroundProvider } from './BackgroundContext'
import StainedGlassBackground from './AnimatedGlassLayer'

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdminRoute = pathname?.startsWith('/admin')
    const isDashboardRoute = pathname?.startsWith('/dashboard')

    if (isAdminRoute || isDashboardRoute) {
        // For admin and dashboard routes, just render children without public nav/footer
        return <>{children}</>
    }

    // For public routes, render with full navigation and background
    return (
        <>
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
        </>
    )
}
