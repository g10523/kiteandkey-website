'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Users,
    Calendar,
    Megaphone,
    LogOut,
    KeyRound
} from 'lucide-react'
import { handleSignOut } from '@/app/admin/actions'

export default function AdminSidebar() {
    const pathname = usePathname()

    const navItems = [
        {
            href: '/admin',
            label: 'Dashboard',
            icon: LayoutDashboard
        },
        {
            href: '/admin/leads',
            label: 'Leads',
            icon: Users
        },
        {
            href: '/admin/calendar',
            label: 'Calendar',
            icon: Calendar
        },
        {
            href: '/admin/marketing',
            label: 'Marketing',
            icon: Megaphone
        },
        {
            href: '/admin/finance',
            label: 'Finance',
            icon: KeyRound
        },
    ]

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-72 p-6">
            <div className="kk-glass-strong flex h-full flex-col justify-between overflow-hidden rounded-3xl !border-[#E6E0F2] !bg-white/80 !p-6 shadow-2xl backdrop-blur-xl">
                <div>
                    {/* Brand */}
                    <div className="mb-10 flex items-center gap-3 px-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-sm">
                            <Image
                                src="/logo.jpg"
                                alt="Kite & Key Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="font-serif text-lg font-bold leading-tight text-[#3F3A52]">
                                Kite & Key
                            </h1>
                            <p className="text-[10px] uppercase tracking-wider text-[#6B647F] font-semibold">
                                Admin Portal
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            const Icon = item.icon

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'bg-[#5E5574] text-white shadow-lg shadow-[#5E5574]/20'
                                        : 'text-[#6B647F] hover:bg-[#F7F5FB] hover:text-[#5E5574]'
                                        }`}
                                >
                                    <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-[#E6E0F2] pt-6">
                    <form action={handleSignOut}>
                        <button
                            type="submit"
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#6B647F] transition-all hover:bg-red-50 hover:text-red-600"
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    )
}
