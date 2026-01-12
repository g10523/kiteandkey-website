'use client';

import { Calendar, Clock, Video, MapPin, ChevronLeft, ChevronRight, User, BookOpen, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SchedulePage() {
    const [currentWeek, setCurrentWeek] = useState(0);
    const [viewMode, setViewMode] = useState<'week' | 'list'>('week');
    const [filterSubject, setFilterSubject] = useState<string>('all');

    // Mock data - will be replaced with real API data
    const sessions = [
        {
            id: 1,
            subject: "Mathematics",
            topic: "Quadratic Equations",
            tutor: "Dr. Sarah Chen",
            date: "2026-01-06",
            dayOfWeek: "Monday",
            startTime: "16:30",
            endTime: "17:30",
            duration: 60,
            location: "Online",
            meetLink: "https://meet.google.com/abc-defg-hij",
            status: "upcoming",
            color: "purple",
        },
        {
            id: 2,
            subject: "English",
            topic: "Essay Writing Techniques",
            tutor: "Mr. James Wilson",
            date: "2026-01-08",
            dayOfWeek: "Wednesday",
            startTime: "15:00",
            endTime: "16:00",
            duration: 60,
            location: "Online",
            meetLink: "https://meet.google.com/xyz-abcd-efg",
            status: "upcoming",
            color: "blue",
        },
        {
            id: 3,
            subject: "Physics",
            topic: "Newton's Laws",
            tutor: "Dr. Emily Roberts",
            date: "2026-01-09",
            dayOfWeek: "Thursday",
            startTime: "17:00",
            endTime: "18:00",
            duration: 60,
            location: "Online",
            meetLink: "https://meet.google.com/pqr-stuv-wxy",
            status: "upcoming",
            color: "green",
        },
        {
            id: 4,
            subject: "Mathematics",
            topic: "Functions and Graphs",
            tutor: "Dr. Sarah Chen",
            date: "2026-01-10",
            dayOfWeek: "Friday",
            startTime: "16:30",
            endTime: "17:30",
            duration: 60,
            location: "Online",
            meetLink: "https://meet.google.com/abc-defg-hij",
            status: "upcoming",
            color: "purple",
        },
    ];

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const getColorClasses = (color: string) => {
        const colors = {
            purple: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300", hover: "hover:bg-purple-50" },
            blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300", hover: "hover:bg-blue-50" },
            green: { bg: "bg-green-100", text: "text-green-700", border: "border-green-300", hover: "hover:bg-green-50" },
            orange: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300", hover: "hover:bg-orange-50" },
        };
        return colors[color as keyof typeof colors] || colors.purple;
    };

    const filteredSessions = filterSubject === 'all'
        ? sessions
        : sessions.filter(s => s.subject.toLowerCase() === filterSubject.toLowerCase());

    const subjects = Array.from(new Set(sessions.map(s => s.subject)));

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                    <Link href="/dashboard/student" className="text-sm text-[#8C84A8] hover:text-[#5E5574] mb-2 inline-flex items-center gap-1">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-[#3F3A52] font-serif mt-2">My Schedule</h1>
                    <p className="text-[#6B647F] mt-2 text-lg">
                        View and manage your upcoming sessions
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 rounded-xl bg-white border border-[#E6E0F2] text-[#5E5574] font-bold hover:bg-[#F7F5FB] transition-all">
                        <Calendar className="inline mr-2" size={18} />
                        Export Calendar
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] text-white font-bold hover:shadow-lg transition-all hover:scale-105">
                        Request Session
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* View Mode Toggle */}
                <div className="flex gap-2 bg-[#F7F5FB] p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setViewMode('week')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${viewMode === 'week'
                                ? 'bg-white text-[#5E5574] shadow-sm'
                                : 'text-[#8C84A8] hover:text-[#5E5574]'
                            }`}
                    >
                        Week View
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${viewMode === 'list'
                                ? 'bg-white text-[#5E5574] shadow-sm'
                                : 'text-[#8C84A8] hover:text-[#5E5574]'
                            }`}
                    >
                        List View
                    </button>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-3">
                    <Filter size={18} className="text-[#8C84A8]" />
                    <select
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-[#E6E0F2] text-[#5E5574] font-bold bg-white hover:bg-[#F7F5FB] transition-colors cursor-pointer"
                    >
                        <option value="all">All Subjects</option>
                        {subjects.map(subject => (
                            <option key={subject} value={subject.toLowerCase()}>{subject}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Week Navigation */}
            {viewMode === 'week' && (
                <div className="kk-card p-4 flex items-center justify-between">
                    <button
                        onClick={() => setCurrentWeek(currentWeek - 1)}
                        className="p-2 rounded-lg hover:bg-[#F7F5FB] transition-colors"
                    >
                        <ChevronLeft size={24} className="text-[#5E5574]" />
                    </button>
                    <div className="text-center">
                        <div className="text-xl font-bold text-[#3F3A52]">
                            {currentWeek === 0 ? 'This Week' : currentWeek === 1 ? 'Next Week' : `Week of Jan ${6 + (currentWeek * 7)}`}
                        </div>
                        <div className="text-sm text-[#8C84A8]">January 6 - January 12, 2026</div>
                    </div>
                    <button
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                        className="p-2 rounded-lg hover:bg-[#F7F5FB] transition-colors"
                    >
                        <ChevronRight size={24} className="text-[#5E5574]" />
                    </button>
                </div>
            )}

            {/* Week View */}
            {viewMode === 'week' && (
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {weekDays.map((day, index) => {
                        const daySessions = filteredSessions.filter(s => s.dayOfWeek === day);
                        const isToday = index === 0; // Mock - Monday is "today"

                        return (
                            <div key={day} className={`kk-card p-4 ${isToday ? 'ring-2 ring-[#5E5574]' : ''}`}>
                                <div className="text-center mb-4">
                                    <div className={`text-sm font-bold uppercase tracking-wide ${isToday ? 'text-[#5E5574]' : 'text-[#8C84A8]'}`}>
                                        {day.substring(0, 3)}
                                    </div>
                                    <div className={`text-2xl font-bold ${isToday ? 'text-[#5E5574]' : 'text-[#3F3A52]'}`}>
                                        {6 + index}
                                    </div>
                                    {isToday && (
                                        <div className="text-xs text-[#5E5574] font-bold mt-1">Today</div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {daySessions.length > 0 ? (
                                        daySessions.map(session => {
                                            const colors = getColorClasses(session.color);
                                            return (
                                                <div
                                                    key={session.id}
                                                    className={`p-3 rounded-lg ${colors.bg} border ${colors.border} ${colors.hover} transition-all cursor-pointer group`}
                                                >
                                                    <div className={`text-xs font-bold ${colors.text} mb-1`}>
                                                        {session.startTime}
                                                    </div>
                                                    <div className="text-sm font-bold text-[#3F3A52] mb-1 group-hover:text-[#5E5574] transition-colors">
                                                        {session.subject}
                                                    </div>
                                                    <div className="text-xs text-[#6B647F]">
                                                        {session.topic}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-8 text-sm text-[#8C84A8]">
                                            No sessions
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <div className="space-y-4">
                    {filteredSessions.length > 0 ? (
                        filteredSessions.map((session) => {
                            const colors = getColorClasses(session.color);
                            return (
                                <div key={session.id} className="kk-card p-6 hover:shadow-lg transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                                        {/* Date & Time */}
                                        <div className="flex-shrink-0 text-center md:text-left md:w-32">
                                            <div className="text-sm text-[#8C84A8] font-bold uppercase tracking-wide">
                                                {session.dayOfWeek}
                                            </div>
                                            <div className="text-2xl font-bold text-[#3F3A52]">
                                                Jan {session.date.split('-')[2]}
                                            </div>
                                            <div className="text-sm text-[#6B647F] font-bold mt-1">
                                                {session.startTime} - {session.endTime}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="hidden md:block w-px h-20 bg-[#E6E0F2]"></div>

                                        {/* Session Details */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${colors.bg} ${colors.text} mb-2`}>
                                                        {session.subject}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-[#3F3A52]">
                                                        {session.topic}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-[#8C84A8]">
                                                    <Clock size={16} />
                                                    <span>{session.duration} min</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-[#6B647F]">
                                                <div className="flex items-center gap-2">
                                                    <User size={16} className="text-[#8C84A8]" />
                                                    <span>{session.tutor}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={16} className="text-[#8C84A8]" />
                                                    <span>{session.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex md:flex-col gap-2">
                                            <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-[#5E5574] text-white font-bold hover:bg-[#4F4865] transition-all flex items-center justify-center gap-2">
                                                <Video size={18} />
                                                Join
                                            </button>
                                            <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-white border border-[#E6E0F2] text-[#5E5574] font-bold hover:bg-[#F7F5FB] transition-all">
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="kk-card p-12 text-center">
                            <BookOpen size={48} className="text-[#D9CFF2] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#3F3A52] mb-2">No sessions found</h3>
                            <p className="text-[#8C84A8]">
                                {filterSubject === 'all'
                                    ? "You don't have any upcoming sessions scheduled."
                                    : `No ${filterSubject} sessions found. Try a different filter.`
                                }
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="kk-card p-6 text-center">
                    <div className="text-3xl font-bold text-[#3F3A52] mb-1">{sessions.length}</div>
                    <div className="text-sm text-[#8C84A8]">Upcoming Sessions</div>
                </div>
                <div className="kk-card p-6 text-center">
                    <div className="text-3xl font-bold text-[#3F3A52] mb-1">12.5</div>
                    <div className="text-sm text-[#8C84A8]">Hours This Week</div>
                </div>
                <div className="kk-card p-6 text-center">
                    <div className="text-3xl font-bold text-[#3F3A52] mb-1">3</div>
                    <div className="text-sm text-[#8C84A8]">Active Subjects</div>
                </div>
                <div className="kk-card p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">98%</div>
                    <div className="text-sm text-[#8C84A8]">Attendance Rate</div>
                </div>
            </div>
        </div>
    );
}
