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
        <div className="min-h-screen bg-[#FBFAFF]">
            {/* Global Background */}
            <div className="kk-global-bg" />

            {/* Sidebar */}
            <StudentSidebar
                userName={session.user?.name}
                userRole={session.user?.role}
            />

            {/* Main Content Area */}
            <div className="lg:pl-64">
                {/* Top Header */}
                <header className="sticky top-0 z-30 border-b border-[#E6E0F2] bg-white/80 backdrop-blur-md">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between gap-4">
                            {/* Search Bar */}
                            <div className="flex-1 max-w-xl">
                                <div className="relative">
                                    <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8C84A8]" />
                                    <input
                                        type="text"
                                        placeholder="Search lessons, sessions, or resources..."
                                        className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-[#E6E0F2] text-[#3F3A52] placeholder-[#8C84A8] focus:outline-none focus:ring-2 focus:ring-[#5E5574] transition-all bg-white"
                                    />
                                </div>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-3">
                                {/* Notifications */}
                                <button className="relative p-2.5 rounded-xl hover:bg-[#F7F5FB] transition-colors">
                                    <Bell size={20} className="text-[#6B647F]" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>

                                {/* Quick Action Button */}
                                <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] text-white font-bold hover:shadow-lg transition-all hover:scale-105">
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
