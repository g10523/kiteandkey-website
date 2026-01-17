import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react'

// Placeholder for future Stripe integration
export default async function FinancePage() {
    const session = await auth()

    if (!session) {
        redirect('/admin/login')
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">Finance & Revenue</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#5E5574] text-white rounded-xl text-sm font-bold shadow hover:bg-[#4F4865] transition-colors">
                        Connect Stripe
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="kk-glass-strong p-6 rounded-3xl flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#8C84A8] uppercase tracking-wider">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-[#3F3A52]">$1,023,544</h3>
                        <p className="text-xs text-green-600 font-medium">+12.5% this month</p>
                    </div>
                </div>

                <div className="kk-glass-strong p-6 rounded-3xl flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#8C84A8] uppercase tracking-wider">Active Subscriptions</p>
                        <h3 className="text-2xl font-bold text-[#3F3A52]">0</h3>
                        <p className="text-xs text-blue-600 font-medium">New signups</p>
                    </div>
                </div>

                <div className="kk-glass-strong p-6 rounded-3xl flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#8C84A8] uppercase tracking-wider">Pending Payments</p>
                        <h3 className="text-2xl font-bold text-[#3F3A52]">$0.00</h3>
                        <p className="text-xs text-purple-600 font-medium">Action required</p>
                    </div>
                </div>
            </div>

            {/* Placeholder Table */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-6 w-1 bg-[#5E5574] rounded-full" />
                    <h2 className="text-lg font-bold text-[#3F3A52]">Recent Transactions</h2>
                </div>

                <div className="kk-glass-strong rounded-3xl overflow-hidden shadow-sm p-12 text-center">
                    <div className="mx-auto h-20 w-20 bg-[#F7F5FB] rounded-full flex items-center justify-center mb-4">
                        <DollarSign size={32} className="text-[#8C84A8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#3F3A52] mb-2">No Transactions Yet</h3>
                    <p className="text-[#6B647F] max-w-md mx-auto mb-6">
                        Once you connect your Stripe account, transaction history and revenue data will appear here automatically.
                    </p>
                    <button className="px-6 py-3 border-2 border-[#E6E0F2] rounded-xl text-[#5E5574] font-bold hover:bg-[#F7F5FB] transition-colors">
                        Configure Payment Settings
                    </button>
                </div>
            </section>
        </div>
    )
}
