import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect('/admin/login')
    }

    return (
        <div className="min-h-screen">
            {/* Global Background */}
            <div className="kk-global-bg" />
            <div className="kk-ambient">
                <div className="kk-ambient-blob blob-a" />
                <div className="kk-ambient-blob blob-b" />
            </div>

            <div className="flex">
                {/* Fixed Sidebar */}
                <AdminSidebar />

                {/* Main Content Area */}
                <main className="flex-1 pl-80 pr-8 py-8 min-h-screen transition-all duration-300">
                    <div className="mx-auto max-w-7xl animate-fade-in">
                        {/* Top Bar for User Context (Optional, can be integrated into sidebar or pages) */}
                        <div className="mb-8 flex items-center justify-end">
                            <div className="flex items-center gap-3 rounded-full bg-white/50 px-4 py-2 backdrop-blur-sm border border-[#E6E0F2]">
                                <div className="h-8 w-8 rounded-full bg-[#5E5574] text-white flex items-center justify-center text-sm font-bold">
                                    {session.user?.name?.[0] || 'A'}
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-[#3F3A52]">{session.user?.name}</p>
                                    <p className="text-xs text-[#6B647F]">Administrator</p>
                                </div>
                            </div>
                        </div>

                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
