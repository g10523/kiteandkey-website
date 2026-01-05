'use client'

import Link from 'next/link'
import Image from 'next/image'
import { handleSignOut } from '@/app/admin/actions'
import { KeyRound } from 'lucide-react'

interface AdminNavbarProps {
    userName?: string | null
    userEmail?: string | null
}

export default function AdminNavbar({ userName, userEmail }: AdminNavbarProps) {
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-[#B8A5D8] via-[#C8B5E8] to-[#B8A5D8] shadow-md">
            <div className="mx-auto px-6 py-4">
                <div className="flex items-center justify-center gap-3">
                    {/* Logo Icon */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F4D03F] shadow-sm">
                        <KeyRound className="w-5 h-5 text-[#5E5574]" />
                    </div>

                    {/* Title */}
                    <h1 className="text-xl font-bold text-[#3F3A52]">
                        Kite & Key Academy
                    </h1>
                </div>
            </div>
        </header>
    )
}
