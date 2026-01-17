'use client';

import { ChevronLeft, ChevronRight, Clock, Video, Calendar as CalendarIcon, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function CalendarPage() {
    const [view, setView] = useState<'month' | 'week'>('month');

    // Mock Calendar Data for January 2026
    const days = Array.from({ length: 35 }, (_, i) => {
        const day = i - 3; // Offset for start of month
        return day > 0 && day <= 31 ? day : null;
    });

    const events = [
        { day: 5, title: "Maths: Algebra", time: "4:30 PM", type: "class", color: "bg-purple-100 text-purple-700 border-purple-200" },
        { day: 8, title: "English Essay", time: "Due 5 PM", type: "assignment", color: "bg-red-100 text-red-700 border-red-200" },
        { day: 12, title: "Physics Lab", time: "3:30 PM", type: "class", color: "bg-green-100 text-green-700 border-green-200" },
        { day: 15, title: "Study Group", time: "6:00 PM", type: "event", color: "bg-blue-100 text-blue-700 border-blue-200" },
        { day: 19, title: "Maths: Geometry", time: "4:30 PM", type: "class", color: "bg-purple-100 text-purple-700 border-purple-200" },
        { day: 26, title: "Chemistry Quiz", time: "All Day", type: "exam", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    ];

    const getEventsForDay = (day: number | null) => {
        if (!day) return [];
        return events.filter(e => e.day === day);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">
            {/* Main Calendar Area */}
            <div className="flex-1 flex flex-col kk-glass-strong rounded-3xl overflow-hidden p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#3F3A52] font-serif flex items-center gap-2">
                        January 2026
                        <button className="p-1 rounded-lg hover:bg-[#F7F5FB] text-[#8C84A8]">
                            <ChevronDownIcon />
                        </button>
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-[#F7F5FB] p-1 rounded-xl">
                            <button
                                onClick={() => setView('month')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${view === 'month' ? 'bg-white shadow-sm text-[#3F3A52]' : 'text-[#8C84A8] hover:text-[#5E5574]'}`}
                            >
                                Month
                            </button>
                            <button
                                onClick={() => setView('week')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${view === 'week' ? 'bg-white shadow-sm text-[#3F3A52]' : 'text-[#8C84A8] hover:text-[#5E5574]'}`}
                            >
                                Week
                            </button>
                        </div>
                        <div className="flex gap-1">
                            <button className="p-2 rounded-xl border border-[#E6E0F2] hover:bg-[#F7F5FB] text-[#5E5574]">
                                <ChevronLeft size={18} />
                            </button>
                            <button className="p-2 rounded-xl border border-[#E6E0F2] hover:bg-[#F7F5FB] text-[#5E5574]">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="flex-1 flex flex-col">
                    {/* Days Header */}
                    <div className="grid grid-cols-7 mb-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="text-center text-xs font-bold text-[#8C84A8] uppercase tracking-wider py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 flex-1 gap-px bg-[#E6E0F2] border border-[#E6E0F2] rounded-xl overflow-hidden">
                        {days.map((day, i) => {
                            const dayEvents = getEventsForDay(day);
                            return (
                                <div key={i} className={`bg-white p-2 min-h-[80px] hover:bg-[#FBFAFF] transition-colors ${!day ? 'bg-[#F7F5FB]/50' : ''}`}>
                                    {day && (
                                        <>
                                            <div className={`text-sm font-bold mb-1 ${day === 12 ? 'text-[#5E5574] bg-[#E6E0F2] w-6 h-6 rounded-full flex items-center justify-center' : 'text-[#6B647F]'}`}>
                                                {day}
                                            </div>
                                            <div className="space-y-1">
                                                {dayEvents.map((event, idx) => (
                                                    <div key={idx} className={`px-2 py-1 rounded-md border text-[10px] font-bold truncate ${event.color}`}>
                                                        {event.time !== 'All Day' && <span className="opacity-75 mr-1">{event.time.split(' ')[0]}</span>}
                                                        {event.title}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Sidebar Details Area */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
                {/* Upcoming Sessions Card */}
                <div className="kk-glass-strong p-6 rounded-3xl flex-1 flex flex-col">
                    <h3 className="font-bold text-[#3F3A52] text-lg mb-4 flex items-center gap-2">
                        <Video size={18} className="text-[#5E5574]" />
                        Upcoming Sessions
                    </h3>

                    <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                        {[
                            { title: "Advanced Mathematics", time: "Today, 4:30 PM", tutor: "Dr. Sarah Chen", status: "Starting soon", statusColor: "text-orange-600" },
                            { title: "Physics Lab Review", time: "Tomorrow, 3:30 PM", tutor: "Mr. James Wilson", status: "Confirmed", statusColor: "text-green-600" },
                            { title: "English Literature", time: "Thu Jan 15, 5:00 PM", tutor: "Ms. Emily Davis", status: "Confirmed", statusColor: "text-green-600" },
                        ].map((session, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E6E0F2] shadow-sm hover:shadow-md transition-shadow group">
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`text-xs font-bold ${session.statusColor} bg-opacity-10 bg-current px-2 py-0.5 rounded-full`}>
                                        {session.status}
                                    </div>
                                    <button className="text-[#8C84A8] hover:text-[#5E5574]">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                                <h4 className="font-bold text-[#3F3A52] mb-1">{session.title}</h4>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-[#6B647F]">
                                        <CalendarIcon size={12} />
                                        {session.time}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-[#8C84A8]">
                                        <div className="w-4 h-4 rounded-full bg-[#E6E0F2] flex items-center justify-center text-[8px] font-bold">SC</div>
                                        {session.tutor}
                                    </div>
                                </div>
                                {idx === 0 && (
                                    <button className="w-full mt-3 py-2 rounded-lg bg-[#5E5574] text-white text-xs font-bold hover:bg-[#4F4865] transition-colors flex items-center justify-center gap-2">
                                        <Video size={12} />
                                        Join Now
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChevronDownIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
    )
}
