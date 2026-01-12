import { User, CreditCard, MessageSquare, TrendingUp } from "lucide-react";

export default function ParentDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">Parent Overview</h1>
                <p className="text-[#6B647F] mt-2">Track your child's progress and manage sessions.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Child Card */}
                <div className="kk-card-strong p-6 relative">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-16 w-16 rounded-full bg-[#5E5574] text-white flex items-center justify-center text-2xl font-serif">
                            L
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#3F3A52]">Leo Das</h2>
                            <p className="text-sm text-[#6B647F]">Year 10 • Maths & English</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl border border-[#E6E0F2]">
                            <div className="flex items-center gap-3">
                                <TrendingUp size={18} className="text-green-600" />
                                <span className="text-sm font-bold text-[#3F3A52]">Progress</span>
                            </div>
                            <span className="text-sm text-green-700 font-bold">+15% vs Last Term</span>
                        </div>

                        <button className="w-full py-3 rounded-xl bg-[#5E5574] text-white font-bold text-sm shadow-lg hover:bg-[#4F4865] transition-all">
                            View Detailed Report
                        </button>
                    </div>
                </div>

                {/* Recent Updates */}
                <div className="kk-card p-6 md:col-span-2">
                    <h3 className="text-lg font-bold text-[#3F3A52] mb-4">Latest Updates</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4 p-4 rounded-xl bg-[#F7F5FB] border border-[#E6E0F2]">
                            <div className="mt-1">
                                <MessageSquare size={18} className="text-[#8C84A8]" />
                            </div>
                            <div>
                                <p className="text-sm text-[#3F3A52] font-semibold">Tutor Feedback - Maths</p>
                                <p className="text-sm text-[#6B647F] mt-1">"Leo showed great improvement in quadratic equations today. His MindPrint profile suggested visual aids would help, and they worked wonders."</p>
                                <p className="text-xs text-[#9A95AF] mt-2">2 days ago</p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl bg-[#F7F5FB] border border-[#E6E0F2]">
                            <div className="mt-1">
                                <CreditCard size={18} className="text-[#8C84A8]" />
                            </div>
                            <div>
                                <p className="text-sm text-[#3F3A52] font-semibold">Invoice Paid</p>
                                <p className="text-sm text-[#6B647F] mt-1">Receipt #4029 for Term 1 Package has been sent to your email.</p>
                                <p className="text-xs text-[#9A95AF] mt-2">5 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
