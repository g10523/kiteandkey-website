'use client';

import { Brain, Calendar, BookOpen, Clock, TrendingUp, Award, Target, ChevronRight, Zap, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'progress'>('overview');

    // Mock data - will be replaced with real data from API
    const upcomingSessions = [
        { id: 1, subject: "Mathematics", topic: "Quadratic Equations", date: "Tomorrow", time: "4:30 PM", tutor: "Dr. Sarah Chen", color: "bg-purple-100 text-purple-700" },
        { id: 2, subject: "English", topic: "Essay Writing Techniques", date: "Wed, Jan 8", time: "3:00 PM", tutor: "Mr. James Wilson", color: "bg-blue-100 text-blue-700" },
        { id: 3, subject: "Physics", topic: "Newton's Laws", date: "Thu, Jan 9", time: "5:00 PM", tutor: "Dr. Emily Roberts", color: "bg-green-100 text-green-700" },
    ];

    const recentActivity = [
        { id: 1, type: "assignment", title: "English Essay: Persuasive Writing", status: "Submitted", time: "2 hours ago", score: null },
        { id: 2, type: "quiz", title: "Algebra Quiz: Chapter 5", status: "Completed", time: "Yesterday", score: 92 },
        { id: 3, type: "feedback", title: "Physics Lab Report", status: "Feedback Received", time: "2 days ago", score: 88 },
    ];

    const recommendedLessons = [
        { id: 1, title: "Advanced Geometry", subject: "Mathematics", duration: "45 min", difficulty: "Intermediate", thumbnail: "📐" },
        { id: 2, title: "Creative Writing Workshop", subject: "English", duration: "60 min", difficulty: "Advanced", thumbnail: "✍️" },
        { id: 3, title: "Chemical Reactions", subject: "Chemistry", duration: "50 min", difficulty: "Intermediate", thumbnail: "🧪" },
    ];

    const progressStats = [
        { label: "Lessons Completed", value: 42, total: 60, percentage: 70, color: "bg-purple-500" },
        { label: "Assignments Submitted", value: 18, total: 20, percentage: 90, color: "bg-blue-500" },
        { label: "Average Score", value: 87, total: 100, percentage: 87, color: "bg-green-500" },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-[#3F3A52] font-serif">Welcome back, Alex</h1>
                    <p className="text-[#6B647F] mt-2 text-lg">Ready to continue your learning journey?</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 rounded-xl bg-white border border-[#E6E0F2] text-[#5E5574] font-bold hover:bg-[#F7F5FB] transition-all hover:shadow-md">
                        <Calendar className="inline mr-2" size={18} />
                        View Schedule
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] text-white font-bold hover:shadow-lg transition-all hover:scale-105">
                        <BookOpen className="inline mr-2" size={18} />
                        Browse Lessons
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
                {/* MindPrint Status Card */}
                <div className="kk-card-strong p-6 col-span-2 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
                    <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-40 transition-opacity">
                        <Brain size={80} className="text-[#D9CFF2]" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold text-[#3F3A52] flex items-center gap-2">
                                <Brain size={20} className="text-[#5E5574]" />
                                MindPrint™ Profile
                            </h2>
                            <span className="px-3 py-1 rounded-full bg-[#5E5574] text-white text-xs font-bold">
                                ACTIVE
                            </span>
                        </div>
                        <p className="text-sm text-[#6B647F] mb-4 max-w-[80%]">
                            Your cognitive learning profile is optimized. Lessons are adapted for your <span className="font-bold text-[#5E5574]">Visual Processing</span> strength.
                        </p>
                        <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-xs text-[#8C84A8] font-bold">
                                <span>Profile Completeness</span>
                                <span>85%</span>
                            </div>
                            <div className="w-full bg-[#E6E0F2]/50 rounded-full h-2.5">
                                <div
                                    className="bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] h-2.5 rounded-full transition-all duration-500"
                                    style={{ width: '85%' }}
                                ></div>
                            </div>
                        </div>
                        <Link href="/dashboard/student/mindprint" className="text-sm font-bold text-[#5E5574] hover:text-[#8B7FA8] flex items-center gap-1 group/link">
                            View Full Profile
                            <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Next Session */}
                <div className="kk-card p-6 hover:shadow-xl transition-all group cursor-pointer">
                    <h2 className="text-lg font-bold text-[#3F3A52] mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-[#5E5574]" />
                        Next Session
                    </h2>
                    <div className="space-y-2">
                        <div className="text-2xl font-serif text-[#3F3A52]">Tomorrow</div>
                        <div className="text-3xl font-bold text-[#5E5574]">4:30 PM</div>
                        <div className="text-sm text-[#6B647F] font-medium">Mathematics (Year 10)</div>
                        <div className="text-xs text-[#8C84A8]">with Dr. Sarah Chen</div>
                    </div>
                    <button className="mt-4 w-full py-2.5 rounded-xl bg-[#F7F5FB] text-sm font-bold text-[#5E5574] hover:bg-[#E6E0F2] transition-all hover:shadow-md">
                        Join Session
                    </button>
                </div>

                {/* Weekly Progress */}
                <div className="kk-card p-6 hover:shadow-xl transition-all">
                    <h2 className="text-lg font-bold text-[#3F3A52] mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-[#5E5574]" />
                        This Week
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6B647F]">Sessions</span>
                            <span className="text-xl font-bold text-[#3F3A52]">5/6</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6B647F]">Study Hours</span>
                            <span className="text-xl font-bold text-[#3F3A52]">12.5</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6B647F]">Avg. Score</span>
                            <span className="text-xl font-bold text-green-600">87%</span>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E6E0F2]">
                        <div className="flex items-center gap-2 text-sm">
                            <Zap size={16} className="text-yellow-500" />
                            <span className="text-[#6B647F]">3 day streak! 🔥</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#E6E0F2]">
                <div className="flex gap-6">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`pb-3 px-1 font-bold transition-all relative ${activeTab === 'overview'
                                ? 'text-[#5E5574]'
                                : 'text-[#8C84A8] hover:text-[#6B647F]'
                            }`}
                    >
                        Overview
                        {activeTab === 'overview' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5E5574]"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('progress')}
                        className={`pb-3 px-1 font-bold transition-all relative ${activeTab === 'progress'
                                ? 'text-[#5E5574]'
                                : 'text-[#8C84A8] hover:text-[#6B647F]'
                            }`}
                    >
                        Progress & Stats
                        {activeTab === 'progress' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5E5574]"></div>
                        )}
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div className="space-y-8">
                    {/* Upcoming Sessions */}
                    <section>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-2xl font-bold text-[#3F3A52] font-serif">Upcoming Sessions</h2>
                            <Link href="/dashboard/student/schedule" className="text-sm font-bold text-[#5E5574] hover:text-[#8B7FA8] flex items-center gap-1">
                                View All
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-5">
                            {upcomingSessions.map((session) => (
                                <div key={session.id} className="kk-card p-5 hover:shadow-lg transition-all group cursor-pointer">
                                    <div className="flex items-start justify-between mb-3">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${session.color}`}>
                                            {session.subject}
                                        </span>
                                        <Calendar size={18} className="text-[#8C84A8]" />
                                    </div>
                                    <h3 className="font-bold text-[#3F3A52] mb-2 group-hover:text-[#5E5574] transition-colors">
                                        {session.topic}
                                    </h3>
                                    <div className="space-y-1 text-sm text-[#6B647F]">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            <span>{session.date} at {session.time}</span>
                                        </div>
                                        <div className="text-xs text-[#8C84A8]">
                                            Tutor: {session.tutor}
                                        </div>
                                    </div>
                                    <button className="mt-4 w-full py-2 rounded-lg bg-[#F7F5FB] text-sm font-bold text-[#5E5574] hover:bg-[#E6E0F2] transition-colors">
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recent Activity */}
                    <section>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-2xl font-bold text-[#3F3A52] font-serif">Recent Activity</h2>
                        </div>
                        <div className="kk-card p-6">
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={activity.id} className={`flex items-center justify-between p-4 rounded-xl hover:bg-[#F7F5FB] transition-colors cursor-pointer ${index !== recentActivity.length - 1 ? 'border-b border-[#E6E0F2]' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'assignment' ? 'bg-blue-100' :
                                                    activity.type === 'quiz' ? 'bg-purple-100' :
                                                        'bg-green-100'
                                                }`}>
                                                {activity.type === 'assignment' && <BookOpen size={18} className="text-blue-600" />}
                                                {activity.type === 'quiz' && <Target size={18} className="text-purple-600" />}
                                                {activity.type === 'feedback' && <Award size={18} className="text-green-600" />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#3F3A52]">{activity.title}</h4>
                                                <div className="flex items-center gap-3 text-sm text-[#8C84A8]">
                                                    <span>{activity.status}</span>
                                                    <span>•</span>
                                                    <span>{activity.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {activity.score && (
                                            <div className="flex items-center gap-2">
                                                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                                                <span className="text-xl font-bold text-[#3F3A52]">{activity.score}%</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Recommended Lessons */}
                    <section>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-2xl font-bold text-[#3F3A52] font-serif">Recommended for You</h2>
                            <button className="text-sm font-bold text-[#5E5574] hover:text-[#8B7FA8] flex items-center gap-1">
                                View All
                                <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {recommendedLessons.map((lesson) => (
                                <div key={lesson.id} className="kk-card p-5 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="h-32 rounded-xl bg-gradient-to-br from-[#F7F5FB] to-[#E6E0F2] mb-4 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                                        {lesson.thumbnail}
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-xs font-bold text-[#8C84A8] uppercase tracking-wide">{lesson.subject}</span>
                                    </div>
                                    <h3 className="font-bold text-[#3F3A52] mb-3 group-hover:text-[#5E5574] transition-colors">{lesson.title}</h3>
                                    <div className="flex items-center justify-between text-xs text-[#6B647F]">
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {lesson.duration}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full ${lesson.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            } font-bold`}>
                                            {lesson.difficulty}
                                        </span>
                                    </div>
                                    <button className="mt-4 w-full py-2 rounded-lg bg-[#5E5574] text-white text-sm font-bold hover:bg-[#4F4865] transition-colors">
                                        Start Learning
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'progress' && (
                <div className="space-y-8">
                    {/* Progress Stats */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {progressStats.map((stat, index) => (
                            <div key={index} className="kk-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-[#3F3A52]">{stat.label}</h3>
                                    <TrendingUp size={20} className="text-green-500" />
                                </div>
                                <div className="mb-3">
                                    <span className="text-3xl font-bold text-[#3F3A52]">{stat.value}</span>
                                    <span className="text-[#8C84A8]">/{stat.total}</span>
                                </div>
                                <div className="w-full bg-[#E6E0F2] rounded-full h-2 mb-2">
                                    <div
                                        className={`${stat.color} h-2 rounded-full transition-all duration-500`}
                                        style={{ width: `${stat.percentage}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-[#8C84A8]">{stat.percentage}% Complete</p>
                            </div>
                        ))}
                    </div>

                    {/* Subject Performance */}
                    <section className="kk-card p-6">
                        <h2 className="text-xl font-bold text-[#3F3A52] mb-6 font-serif">Subject Performance</h2>
                        <div className="space-y-4">
                            {[
                                { subject: "Mathematics", score: 92, trend: "+5%", color: "bg-purple-500" },
                                { subject: "English", score: 88, trend: "+3%", color: "bg-blue-500" },
                                { subject: "Physics", score: 85, trend: "+7%", color: "bg-green-500" },
                                { subject: "Chemistry", score: 81, trend: "+2%", color: "bg-yellow-500" },
                            ].map((subject, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-32 text-sm font-bold text-[#3F3A52]">{subject.subject}</div>
                                    <div className="flex-1">
                                        <div className="w-full bg-[#E6E0F2] rounded-full h-3">
                                            <div
                                                className={`${subject.color} h-3 rounded-full transition-all duration-500`}
                                                style={{ width: `${subject.score}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="w-16 text-right font-bold text-[#3F3A52]">{subject.score}%</div>
                                    <div className="w-16 text-right text-sm text-green-600 font-bold">{subject.trend}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Achievements */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#3F3A52] mb-5 font-serif">Recent Achievements</h2>
                        <div className="grid md:grid-cols-4 gap-4">
                            {[
                                { title: "Perfect Score", description: "Algebra Quiz", icon: "🏆", color: "from-yellow-400 to-orange-500" },
                                { title: "5 Day Streak", description: "Consistent Learning", icon: "🔥", color: "from-red-400 to-pink-500" },
                                { title: "Fast Learner", description: "Completed 10 Lessons", icon: "⚡", color: "from-blue-400 to-purple-500" },
                                { title: "Top Performer", description: "Class Ranking #3", icon: "⭐", color: "from-green-400 to-teal-500" },
                            ].map((achievement, index) => (
                                <div key={index} className="kk-card p-5 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform`}>
                                        {achievement.icon}
                                    </div>
                                    <h4 className="font-bold text-[#3F3A52] mb-1">{achievement.title}</h4>
                                    <p className="text-xs text-[#8C84A8]">{achievement.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
