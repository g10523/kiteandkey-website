'use client';

import { BookOpen, Clock, Star, TrendingUp, Search, Filter, Play, CheckCircle, Lock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LessonsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSubject, setFilterSubject] = useState<string>('all');
    const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
    const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');

    // Mock data - will be replaced with real API data
    const lessons = [
        {
            id: 1,
            title: "Introduction to Quadratic Equations",
            subject: "Mathematics",
            difficulty: "Intermediate",
            duration: 45,
            progress: 100,
            status: "completed",
            thumbnail: "📐",
            description: "Master the fundamentals of quadratic equations and their applications.",
            rating: 4.8,
            totalRatings: 124,
            optimizedForYou: true,
        },
        {
            id: 2,
            title: "Advanced Geometry: Circles and Angles",
            subject: "Mathematics",
            difficulty: "Advanced",
            duration: 60,
            progress: 65,
            status: "in-progress",
            thumbnail: "⭕",
            description: "Deep dive into circle theorems and angle relationships.",
            rating: 4.9,
            totalRatings: 98,
            optimizedForYou: true,
        },
        {
            id: 3,
            title: "Creative Writing Workshop",
            subject: "English",
            difficulty: "Intermediate",
            duration: 50,
            progress: 0,
            status: "not-started",
            thumbnail: "✍️",
            description: "Develop your creative writing skills with practical exercises.",
            rating: 4.7,
            totalRatings: 156,
            optimizedForYou: false,
        },
        {
            id: 4,
            title: "Newton's Laws of Motion",
            subject: "Physics",
            difficulty: "Intermediate",
            duration: 55,
            progress: 30,
            status: "in-progress",
            thumbnail: "🚀",
            description: "Understand the fundamental laws governing motion and forces.",
            rating: 4.8,
            totalRatings: 142,
            optimizedForYou: true,
        },
        {
            id: 5,
            title: "Chemical Reactions and Equations",
            subject: "Chemistry",
            difficulty: "Beginner",
            duration: 40,
            progress: 0,
            status: "not-started",
            thumbnail: "🧪",
            description: "Learn how to balance chemical equations and predict reactions.",
            rating: 4.6,
            totalRatings: 89,
            optimizedForYou: false,
        },
        {
            id: 6,
            title: "Essay Writing: Persuasive Techniques",
            subject: "English",
            difficulty: "Advanced",
            duration: 65,
            progress: 100,
            status: "completed",
            thumbnail: "📝",
            description: "Master persuasive writing techniques for compelling essays.",
            rating: 4.9,
            totalRatings: 201,
            optimizedForYou: false,
        },
        {
            id: 7,
            title: "Trigonometry Fundamentals",
            subject: "Mathematics",
            difficulty: "Intermediate",
            duration: 50,
            progress: 0,
            status: "locked",
            thumbnail: "📊",
            description: "Complete 'Advanced Geometry' to unlock this lesson.",
            rating: 4.7,
            totalRatings: 112,
            optimizedForYou: true,
        },
    ];

    const subjects = Array.from(new Set(lessons.map(l => l.subject)));

    const filteredLessons = lessons.filter(lesson => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = filterSubject === 'all' || lesson.subject === filterSubject;
        const matchesDifficulty = filterDifficulty === 'all' || lesson.difficulty === filterDifficulty;
        const matchesTab = activeTab === 'all' || lesson.status === activeTab;

        return matchesSearch && matchesSubject && matchesDifficulty && matchesTab;
    });

    const getDifficultyColor = (difficulty: string) => {
        if (difficulty === 'Beginner') return 'bg-green-100 text-green-700';
        if (difficulty === 'Intermediate') return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    };

    const getSubjectColor = (subject: string) => {
        const colors: { [key: string]: string } = {
            'Mathematics': 'bg-purple-100 text-purple-700',
            'English': 'bg-blue-100 text-blue-700',
            'Physics': 'bg-green-100 text-green-700',
            'Chemistry': 'bg-orange-100 text-orange-700',
        };
        return colors[subject] || 'bg-gray-100 text-gray-700';
    };

    const stats = {
        total: lessons.length,
        completed: lessons.filter(l => l.status === 'completed').length,
        inProgress: lessons.filter(l => l.status === 'in-progress').length,
        optimized: lessons.filter(l => l.optimizedForYou).length,
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                    <Link href="/dashboard/student" className="text-sm text-[#8C84A8] hover:text-[#5E5574] mb-2 inline-flex items-center gap-1">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-[#3F3A52] font-serif mt-2">Learning Library</h1>
                    <p className="text-[#6B647F] mt-2 text-lg">
                        Explore lessons tailored to your MindPrint profile
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="kk-card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <BookOpen size={24} className="text-[#5E5574]" />
                        <span className="text-3xl font-bold text-[#3F3A52]">{stats.total}</span>
                    </div>
                    <div className="text-sm text-[#8C84A8]">Total Lessons</div>
                </div>
                <div className="kk-card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle size={24} className="text-green-600" />
                        <span className="text-3xl font-bold text-green-600">{stats.completed}</span>
                    </div>
                    <div className="text-sm text-[#8C84A8]">Completed</div>
                </div>
                <div className="kk-card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Play size={24} className="text-blue-600" />
                        <span className="text-3xl font-bold text-blue-600">{stats.inProgress}</span>
                    </div>
                    <div className="text-sm text-[#8C84A8]">In Progress</div>
                </div>
                <div className="kk-card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp size={24} className="text-purple-600" />
                        <span className="text-3xl font-bold text-purple-600">{stats.optimized}</span>
                    </div>
                    <div className="text-sm text-[#8C84A8]">Optimized for You</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="kk-card p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8C84A8]" />
                        <input
                            type="text"
                            placeholder="Search lessons..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E6E0F2] text-[#3F3A52] placeholder-[#8C84A8] focus:outline-none focus:ring-2 focus:ring-[#5E5574] transition-all"
                        />
                    </div>

                    {/* Subject Filter */}
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-[#8C84A8]" />
                        <select
                            value={filterSubject}
                            onChange={(e) => setFilterSubject(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-[#E6E0F2] text-[#5E5574] font-bold bg-white hover:bg-[#F7F5FB] transition-colors cursor-pointer"
                        >
                            <option value="all">All Subjects</option>
                            {subjects.map(subject => (
                                <option key={subject} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty Filter */}
                    <select
                        value={filterDifficulty}
                        onChange={(e) => setFilterDifficulty(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-[#E6E0F2] text-[#5E5574] font-bold bg-white hover:bg-[#F7F5FB] transition-colors cursor-pointer"
                    >
                        <option value="all">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#E6E0F2]">
                <div className="flex gap-6">
                    {[
                        { key: 'all', label: 'All Lessons' },
                        { key: 'in-progress', label: 'In Progress' },
                        { key: 'completed', label: 'Completed' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`pb-3 px-1 font-bold transition-all relative ${activeTab === tab.key
                                    ? 'text-[#5E5574]'
                                    : 'text-[#8C84A8] hover:text-[#6B647F]'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.key && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5E5574]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lessons Grid */}
            {filteredLessons.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className={`kk-card p-6 hover:shadow-lg transition-all cursor-pointer group relative ${lesson.status === 'locked' ? 'opacity-60' : ''
                                }`}
                        >
                            {/* Optimized Badge */}
                            {lesson.optimizedForYou && lesson.status !== 'locked' && (
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] text-white text-xs font-bold flex items-center gap-1">
                                        <Star size={12} className="fill-white" />
                                        For You
                                    </div>
                                </div>
                            )}

                            {/* Locked Overlay */}
                            {lesson.status === 'locked' && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80 backdrop-blur-sm rounded-2xl">
                                    <div className="text-center">
                                        <Lock size={32} className="text-[#8C84A8] mx-auto mb-2" />
                                        <div className="text-sm font-bold text-[#3F3A52]">Locked</div>
                                    </div>
                                </div>
                            )}

                            {/* Thumbnail */}
                            <div className="h-32 rounded-xl bg-gradient-to-br from-[#F7F5FB] to-[#E6E0F2] mb-4 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                                {lesson.thumbnail}
                            </div>

                            {/* Subject & Difficulty Tags */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getSubjectColor(lesson.subject)}`}>
                                    {lesson.subject}
                                </span>
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getDifficultyColor(lesson.difficulty)}`}>
                                    {lesson.difficulty}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-[#3F3A52] mb-2 group-hover:text-[#5E5574] transition-colors">
                                {lesson.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-[#6B647F] mb-4 line-clamp-2">
                                {lesson.description}
                            </p>

                            {/* Meta Info */}
                            <div className="flex items-center justify-between text-xs text-[#8C84A8] mb-4">
                                <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{lesson.duration} min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star size={12} className="fill-yellow-500 text-yellow-500" />
                                    <span className="font-bold text-[#3F3A52]">{lesson.rating}</span>
                                    <span>({lesson.totalRatings})</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            {lesson.status !== 'locked' && lesson.progress > 0 && (
                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-xs text-[#8C84A8] mb-1">
                                        <span>Progress</span>
                                        <span className="font-bold">{lesson.progress}%</span>
                                    </div>
                                    <div className="w-full bg-[#E6E0F2] rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${lesson.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Action Button */}
                            {lesson.status !== 'locked' && (
                                <button className={`w-full py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${lesson.status === 'completed'
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                        : lesson.status === 'in-progress'
                                            ? 'bg-[#5E5574] text-white hover:bg-[#4F4865]'
                                            : 'bg-[#F7F5FB] text-[#5E5574] hover:bg-[#E6E0F2]'
                                    }`}>
                                    {lesson.status === 'completed' && (
                                        <>
                                            <CheckCircle size={18} />
                                            Review Lesson
                                        </>
                                    )}
                                    {lesson.status === 'in-progress' && (
                                        <>
                                            <Play size={18} />
                                            Continue Learning
                                        </>
                                    )}
                                    {lesson.status === 'not-started' && (
                                        <>
                                            <Play size={18} />
                                            Start Lesson
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="kk-card p-12 text-center">
                    <BookOpen size={48} className="text-[#D9CFF2] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[#3F3A52] mb-2">No lessons found</h3>
                    <p className="text-[#8C84A8]">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                </div>
            )}

            {/* CTA Section */}
            <div className="kk-card-strong p-8 bg-gradient-to-br from-[#F7F5FB] to-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold text-[#3F3A52] mb-2 font-serif">Need help choosing?</h3>
                        <p className="text-[#6B647F]">
                            Our AI-powered recommendations are based on your MindPrint profile and learning goals.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/student/mindprint"
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] text-white font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap"
                    >
                        View Recommendations
                        <ChevronRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
