import prisma from '@/lib/prisma'
import { Users, Calendar, UserPlus, TrendingUp, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    // Fetch metrics
    // Fetch metrics
    let totalLeads = 0
    let consultationsCount = 0
    let signupsCount = 0
    let recentLeads: any[] = []

    try {
        [totalLeads, consultationsCount, signupsCount, recentLeads] = await Promise.all([
            prisma.lead.count(),
            prisma.consultation.count({
                where: {
                    status: 'SCHEDULED',
                },
            }),
            prisma.signup.count({
                where: {
                    status: 'ACTIVE',
                },
            }),
            prisma.lead.findMany({
                take: 5,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    consultation: true,
                },
            }),
        ])
    } catch (error) {
        console.error('Database connection failed, using default values:', error)
        // Fallback or mock data could go here if desired for demo purposes
    }

    const stats = [
        {
            label: 'Total Leads',
            value: totalLeads,
            icon: Users,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
        },
        {
            label: 'Scheduled Consultations',
            value: consultationsCount,
            icon: Calendar,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
        },
        {
            label: 'Active Students',
            value: signupsCount,
            icon: UserPlus,
            color: 'text-pink-600',
            bg: 'bg-pink-50',
        },
        {
            label: 'Conversion Rate',
            value: totalLeads > 0 ? `${Math.round((signupsCount / totalLeads) * 100)}%` : '0%',
            icon: TrendingUp,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
        },
    ]

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">Dashboard Overview</h1>
                <p className="text-[#6B647F] mt-2">
                    Welcome back to the Kite & Key Academy admin portal.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="kk-glass flex items-center justify-between p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div>
                            <div className="text-3xl font-bold text-[#3F3A52] mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-[#6B647F]">
                                {stat.label}
                            </div>
                        </div>
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                            <stat.icon size={24} className={stat.color} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Recent Activity */}
                <div className="lg:col-span-2 kk-glass-strong rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-[#3F3A52]">Recent Leads</h2>
                        <Link href="/admin/leads" className="text-sm font-semibold text-[#5E5574] hover:text-[#3F3A52] flex items-center gap-1">
                            View All <ArrowUpRight size={14} />
                        </Link>
                    </div>

                    {recentLeads.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-[#6B647F]">No leads yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentLeads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="flex items-center justify-between rounded-xl bg-white/40 border border-[#E6E0F2] p-4 transition-all hover:bg-white/60"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-[#5E5574]/10 flex items-center justify-center text-[#5E5574] font-bold">
                                            {lead.studentName[0]}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#3F3A52]">
                                                {lead.studentName}
                                            </div>
                                            <div className="text-sm text-[#6B647F]">
                                                {lead.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${lead.status === 'SIGNED_UP'
                                                ? 'bg-green-100 text-green-700'
                                                : lead.status === 'CONSULTATION_BOOKED'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {lead.status.replace(/_/g, ' ')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="kk-glass p-6">
                        <h3 className="font-bold text-[#3F3A52] mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                href="/admin/leads"
                                className="flex items-center gap-3 w-full rounded-xl bg-white p-4 text-left transition-all hover:shadow-md hover:scale-[1.02] border border-[#E6E0F2]"
                            >
                                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                    <Users size={20} />
                                </div>
                                <span className="font-semibold text-[#3F3A52] text-sm">Manage Leads</span>
                            </Link>

                            <Link
                                href="/admin/calendar"
                                className="flex items-center gap-3 w-full rounded-xl bg-white p-4 text-left transition-all hover:shadow-md hover:scale-[1.02] border border-[#E6E0F2]"
                            >
                                <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                                    <Calendar size={20} />
                                </div>
                                <span className="font-semibold text-[#3F3A52] text-sm">Update Availability</span>
                            </Link>

                            <a
                                href="/consultation"
                                target="_blank"
                                className="flex items-center gap-3 w-full rounded-xl bg-white p-4 text-left transition-all hover:shadow-md hover:scale-[1.02] border border-[#E6E0F2]"
                            >
                                <div className="p-2 rounded-lg bg-pink-50 text-pink-600">
                                    <UserPlus size={20} />
                                </div>
                                <span className="font-semibold text-[#3F3A52] text-sm">View Booking Page</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
