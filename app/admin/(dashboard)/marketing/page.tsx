import { Megaphone, Mail, Send, Plus } from 'lucide-react'

export default function AdminMarketingPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">Marketing & Campaigns</h1>
                <p className="text-[#6B647F] mt-2">
                    Manage email campaigns and marketing automation
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { label: 'Active Campaigns', value: '3', icon: Megaphone, color: 'text-purple-600' },
                    { label: 'Emails Sent (This Month)', value: '1,240', icon: Send, color: 'text-blue-600' },
                    { label: 'Subscribers', value: '482', icon: Mail, color: 'text-indigo-600' },
                ].map((stat) => (
                    <div key={stat.label} className="kk-glass flex items-center gap-4 p-6">
                        <div className={`p-3 rounded-xl bg-white/50 ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#3F3A52]">{stat.value}</div>
                            <div className="text-sm text-[#6B647F]">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Active Campaigns List */}
            <div className="kk-glass-strong rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#3F3A52]">Active Campaigns</h2>
                    <button className="flex items-center gap-2 rounded-xl bg-[#5E5574] text-white px-4 py-2 text-sm font-semibold hover:bg-[#4F4865] transition-all">
                        <Plus size={16} />
                        New Campaign
                    </button>
                </div>

                <div className="space-y-4">
                    {[
                        { name: 'Term 1 Enrollment Open', status: 'Running', sent: 450, openRate: '68%' },
                        { name: 'Year 12 Maths Prep', status: 'Scheduled', sent: 0, openRate: '-' },
                        { name: 'Welcome Newsletter', status: 'Running', sent: 120, openRate: '82%' },
                    ].map((campaign) => (
                        <div key={campaign.name} className="flex items-center justify-between p-4 rounded-xl bg-white/40 border border-[#E6E0F2]">
                            <div>
                                <div className="font-semibold text-[#3F3A52]">{campaign.name}</div>
                                <div className="text-sm text-[#6B647F] mt-1">
                                    Status: <span className="font-medium text-[#5E5574]">{campaign.status}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-semibold text-[#3F3A52]">{campaign.openRate}</div>
                                <div className="text-xs text-[#6B647F]">Open Rate</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
