'use client';

import { Brain, ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function MindprintWidget() {
    return (
        <div className="dark-card p-6 rounded-3xl h-full flex flex-col relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                        <Brain size={20} className="text-[#14B8A6]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">MindPrint™</h3>
                        <p className="text-xs text-[#64748B]">Cognitive Profile</p>
                    </div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-bold uppercase tracking-wider">
                    Active
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative z-10">
                {/* Radar Chart with Glow */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Background Circles */}
                    <div className="absolute inset-0 border border-[#2A2F45] rounded-full opacity-50" />
                    <div className="absolute inset-8 border border-[#2A2F45] rounded-full opacity-50" />
                    <div className="absolute inset-16 border border-[#2A2F45] rounded-full opacity-50" />

                    {/* Glowing Polygon */}
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <defs>
                            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.3" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <polygon
                            points="90,50 72,85 45,80 20,50 40,20 80,15"
                            fill="url(#radarGradient)"
                            stroke="#14B8A6"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            filter="url(#glow)"
                        />
                    </svg>

                    {/* Center Score */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold text-white">92</div>
                        <div className="text-xs text-[#14B8A6] font-semibold">Top 5%</div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4 z-10">
                <div className="p-3 rounded-xl bg-[#151925] border border-[#2A2F45]">
                    <div className="text-xs text-[#64748B] mb-1">Visual</div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[#2A2F45] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#14B8A6] to-[#00D9FF] rounded-full" style={{ width: '95%' }}></div>
                        </div>
                        <span className="text-xs font-bold text-white">95</span>
                    </div>
                </div>
                <div className="p-3 rounded-xl bg-[#151925] border border-[#2A2F45]">
                    <div className="text-xs text-[#64748B] mb-1">Memory</div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[#2A2F45] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#14B8A6] to-[#00D9FF] rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <span className="text-xs font-bold text-white">88</span>
                    </div>
                </div>
            </div>

            <Link href="/dashboard/student/mindprint" className="w-full py-2.5 rounded-xl bg-[#14B8A6] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#0F9B8E] transition-colors z-10 shadow-lg shadow-[#14B8A6]/20">
                View Full Profile
                <ChevronRight size={16} />
            </Link>
        </div>
    )
}
