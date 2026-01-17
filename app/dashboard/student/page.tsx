'use client';

import { TrendingUp, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import MindprintWidget from "@/components/dashboard/MindprintWidget";
import NextSessionWidget from "@/components/dashboard/NextSessionWidget";
import ActiveCoursesWidget from "@/components/dashboard/ActiveCoursesWidget";
import PlannerSnapshotWidget from "@/components/dashboard/PlannerSnapshotWidget";

export default function StudentDashboard() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white font-serif">Mission Control</h1>
                    <p className="text-[#94A3B8] mt-2 text-lg flex items-center gap-2">
                        Welcome back, Alex
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35] text-sm font-semibold">
                            🔥 3-day streak
                        </span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 rounded-xl bg-[#1E2139] border border-[#2A2F45] text-white font-bold hover:bg-[#151925] hover:border-[#14B8A6]/30 transition-all flex items-center gap-2">
                        <Calendar size={18} />
                        Calendar
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#00D9FF] text-white font-bold hover:shadow-lg hover:shadow-[#14B8A6]/30 transition-all hover:scale-105 flex items-center gap-2">
                        <Plus size={18} />
                        New Task
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">

                {/* 1. Next Session (Prominent) - Spans 2 cols */}
                <div className="md:col-span-2">
                    <NextSessionWidget />
                </div>

                {/* 2. MindPrint Profile - Spans 1 col */}
                <div className="md:col-span-1">
                    <MindprintWidget />
                </div>

                {/* 3. Planner Snapshot - Spans 1 col */}
                <div className="md:col-span-1">
                    <PlannerSnapshotWidget />
                </div>

                {/* 4. Active Courses - Spans 2 cols */}
                <div className="md:col-span-2">
                    <ActiveCoursesWidget />
                </div>
            </div>

            {/* Quick Stats Row */}
            <section>
                <h2 className="text-xl font-bold text-white mb-5 font-serif flex items-center gap-2">
                    <TrendingUp size={20} className="text-[#14B8A6]" />
                    This Week's Progress
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Sessions", value: "5/6", color: "from-[#14B8A6] to-[#00D9FF]" },
                        { label: "Study Hours", value: "12.5", color: "from-[#FF6B35] to-[#F59E0B]" },
                        { label: "Avg. Score", value: "87%", color: "from-[#10B981] to-[#14B8A6]" },
                        { label: "Tasks Done", value: "18/20", color: "from-[#8B5CF6] to-[#00D9FF]" },
                    ].map((stat, index) => (
                        <div key={index} className="dark-card p-5 hover:border-[#14B8A6]/30 transition-all group">
                            <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">{stat.label}</div>
                            <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
