'use client';

import { Calendar, Clock, Video, MoreHorizontal } from "lucide-react";

export default function NextSessionWidget() {
    return (
        <div className="dark-card p-6 rounded-3xl h-full flex flex-col relative overflow-hidden border-l-4 border-[#14B8A6]">
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                        <Calendar size={20} className="text-[#14B8A6]" />
                    </div>
                    <div>
                        <div className="text-xs text-[#14B8A6] font-bold uppercase tracking-wider mb-1">Next Up</div>
                        <h3 className="font-bold text-white text-lg">Advanced Mathematics</h3>
                    </div>
                </div>
                <button className="text-[#64748B] hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                {/* Time Display */}
                <div className="mb-6">
                    <div className="text-[#94A3B8] text-sm mb-2">Tomorrow</div>
                    <div className="text-5xl font-bold text-white mb-3">4:30 PM</div>
                    <div className="flex items-center gap-2 text-[#94A3B8]">
                        <Clock size={16} />
                        <span className="text-sm">60 minutes</span>
                    </div>
                </div>

                {/* Tutor Info */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#151925] border border-[#2A2F45] mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#00D9FF] flex items-center justify-center text-white font-bold text-sm">
                        SC
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-white">Dr. Sarah Chen</div>
                        <div className="text-xs text-[#64748B]">Mathematics Specialist</div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#00D9FF] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#14B8A6]/30 transition-all flex items-center justify-center gap-2">
                    <Video size={18} />
                    Join Session
                </button>
                <button className="p-3 rounded-xl bg-[#151925] border border-[#2A2F45] hover:border-[#14B8A6] transition-colors text-[#94A3B8] hover:text-white">
                    <Calendar size={18} />
                </button>
            </div>
        </div>
    )
}
