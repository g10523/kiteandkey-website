'use client';

import { BookOpen, ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function ActiveCoursesWidget() {
    const courses = [
        { id: 1, title: "Year 10 Mathematics", progress: 75, module: "Quadratic Equations" },
        { id: 2, title: "English Literature", progress: 42, module: "Essay Structure" },
        { id: 3, title: "Physics Fundamentals", progress: 15, module: "Newton's Laws" },
    ];

    return (
        <div className="dark-card p-6 rounded-3xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                        <BookOpen size={20} className="text-[#14B8A6]" />
                    </div>
                    <h3 className="font-bold text-white text-lg">Active Courses</h3>
                </div>
                <Link href="/dashboard/student/courses" className="p-2 hover:bg-[#151925] rounded-lg transition-colors text-[#64748B] hover:text-[#14B8A6]">
                    <ChevronRight size={20} />
                </Link>
            </div>

            <div className="flex-1 space-y-4">
                {courses.map((course, index) => (
                    <div key={course.id} className="group cursor-pointer p-4 rounded-xl bg-[#151925] border border-[#2A2F45] hover:border-[#14B8A6]/30 transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex-1">
                                <h4 className="font-bold text-white text-sm mb-1 group-hover:text-[#14B8A6] transition-colors">{course.title}</h4>
                                <p className="text-xs text-[#64748B] flex items-center gap-1">
                                    <PlayCircle size={10} />
                                    {course.module}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">{course.progress}%</div>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-[#0A0E27] rounded-full overflow-hidden border border-[#2A2F45]">
                            <div
                                className="h-full bg-gradient-to-r from-[#14B8A6] to-[#00D9FF] rounded-full transition-all duration-1000 ease-out shadow-lg shadow-[#14B8A6]/30"
                                style={{ width: `${course.progress}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#2A2F45]">
                <Link href="/dashboard/student/courses" className="w-full text-sm font-semibold text-[#64748B] hover:text-[#14B8A6] transition-colors text-center block">
                    View all courses →
                </Link>
            </div>
        </div>
    )
}
