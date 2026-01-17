'use client';

import { BookOpen, PlayCircle, Clock, CheckCircle2, ChevronRight, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
    const continueCourse = {
        title: "Year 10 Mathematics",
        module: "Quadratic Equations",
        lesson: "Solving by Factoring",
        progress: 75,
        thumbnail: "📐",
        color: "bg-purple-100 text-purple-700",
        bgGradient: "from-purple-500 to-indigo-600"
    };

    const myCourses = [
        { id: 1, title: "English Literature", progress: 42, totalLessons: 24, completedLessons: 10, color: "bg-blue-100 text-blue-700", icon: "✍️", nextUp: "Essay Structure: Introductions" },
        { id: 2, title: "Physics Fundamentals", progress: 15, totalLessons: 30, completedLessons: 4, color: "bg-green-100 text-green-700", icon: "⚛️", nextUp: "Newton's Second Law" },
        { id: 3, title: "Chemistry", progress: 0, totalLessons: 28, completedLessons: 0, color: "bg-orange-100 text-orange-700", icon: "🧪", nextUp: "Course Introduction" },
        { id: 4, title: "Modern History", progress: 88, totalLessons: 20, completedLessons: 17, color: "bg-red-100 text-red-700", icon: "🏛️", nextUp: "The Cold War: Part 3" },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">My Courses</h1>
                    <p className="text-[#6B647F] mt-1">Pick up where you left off.</p>
                </div>
            </div>

            {/* Continue Learning Hero */}
            <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${continueCourse.bgGradient} text-white p-8 shadow-xl`}>
                <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-10 -translate-y-10">
                    <BookOpen size={200} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/20">
                        {continueCourse.thumbnail}
                    </div>
                    <div className="flex-1">
                        <div className="inline-block px-3 py-1 rounded-lg bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider mb-2">
                            Continue Learning
                        </div>
                        <h2 className="text-3xl font-bold mb-1">{continueCourse.title}</h2>
                        <div className="flex items-center gap-2 text-white/80 mb-4">
                            <span className="font-semibold">{continueCourse.module}</span>
                            <span>•</span>
                            <span>{continueCourse.lesson}</span>
                        </div>

                        <div className="max-w-md">
                            <div className="flex items-center justify-between text-xs font-bold mb-1 opacity-90">
                                <span>Progress</span>
                                <span>{continueCourse.progress}%</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-2">
                                <div className="bg-white h-2 rounded-full transition-all duration-1000" style={{ width: `${continueCourse.progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <button className="px-8 py-4 rounded-xl bg-white text-[#3F3A52] font-bold shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105 flex items-center gap-2 whitespace-nowrap">
                        <PlayCircle size={20} fill="#3F3A52" className="text-white" />
                        Resume Lesson
                    </button>
                </div>
            </div>

            {/* Course Grid */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#3F3A52]">All Enrolled Courses</h2>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C84A8]" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E6E0F2] text-sm focus:outline-none focus:border-[#5E5574]"
                            />
                        </div>
                        <button className="p-2 rounded-xl bg-white border border-[#E6E0F2] text-[#5E5574] hover:bg-[#F7F5FB]">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myCourses.map((course) => (
                        <div key={course.id} className="kk-card p-6 group cursor-pointer hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${course.color} flex items-center justify-center text-2xl`}>
                                    {course.icon}
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-[#3F3A52]">{course.progress}%</div>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-[#3F3A52] mb-1 group-hover:text-[#5E5574] transition-colors">{course.title}</h3>
                            <div className="text-xs text-[#8C84A8] mb-4">
                                {course.completedLessons}/{course.totalLessons} Lessons Completed
                            </div>

                            <div className="w-full bg-[#F7F5FB] rounded-full h-1.5 mb-4">
                                <div className={`h-1.5 rounded-full ${course.color.split(' ')[0].replace('bg-', 'bg-').replace('-100', '-500')} transition-all duration-1000`} style={{ width: `${course.progress}%` }}></div>
                            </div>

                            <div className="pt-4 border-t border-[#E6E0F2]">
                                <p className="text-xs font-bold text-[#8C84A8] mb-1 uppercase tracking-wide">Up Next</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-[#5E5574] truncate max-w-[180px]">{course.nextUp}</p>
                                    <div className="w-6 h-6 rounded-full bg-[#E6E0F2] flex items-center justify-center group-hover:bg-[#5E5574] group-hover:text-white transition-colors">
                                        <ChevronRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Course Card */}
                    <button className="border-2 border-dashed border-[#E6E0F2] rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-[#8B7FA8] hover:bg-[#F7F5FB] transition-all group min-h-[240px]">
                        <div className="w-12 h-12 rounded-full bg-[#F7F5FB] group-hover:bg-[#E6E0F2] flex items-center justify-center mb-3 transition-colors">
                            <Search size={24} className="text-[#8C84A8] group-hover:text-[#5E5574]" />
                        </div>
                        <h3 className="font-bold text-[#3F3A52]">Browse Catalog</h3>
                        <p className="text-sm text-[#8C84A8] mt-1 max-w-[200px]">Find new subjects and expand your learning.</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
