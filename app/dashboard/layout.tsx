import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import StudentSidebar from '@/components/StudentSidebar'
import { Bell, Search } from 'lucide-react'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // TEMPORARY: Bypass auth for preview
    // const session = await auth()
    // if (!session) {
    //     redirect('/login')
    // }
    const session = { user: { name: "Alex Thompson", role: "STUDENT" } }

    return (
        <div className="min-h-screen bg-[#0A0E27]">
            {/* Sidebar */}
            <StudentSidebar
                userName={session.user?.name}
                userRole={session.user?.role}
            />

            {/* Main Content Area */}
            <div className="lg:pl-64">
                {/* Top Header */}
                <header className="sticky top-0 z-30 border-b border-[#2A2F45] bg-[#0F1419]/80 backdrop-blur-md">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between gap-4">
                            {/* Search Bar */}
                            <div className="flex-1 max-w-xl">
                                <div className="relative">
                                    <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#64748B]" />
                                    <input
                                        type="text"
                                        placeholder="Search lessons, sessions, or resources..."
                                        className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-[#2A2F45] text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all bg-[#1E2139]"
                                    />
                                </div>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-3">
                                {/* Notifications */}
                                <button className="relative p-2.5 rounded-xl hover:bg-[#1E2139] transition-colors">
                                    <Bell size={20} className="text-[#94A3B8]" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#14B8A6] rounded-full"></span>
                                </button>

                                {/* Quick Action Button */}
                                <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#00D9FF] text-white font-bold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all hover:scale-105">
                                    <span>Start Learning</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                    {children}
                </main>
            </div>
        </div>
    )
}
