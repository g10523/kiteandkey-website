import { Users, Calendar, CheckCircle, Brain } from "lucide-react";

export default function TutorDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#3F3A52] font-serif">Tutor Workspace</h1>
                    <p className="text-[#6B647F] mt-2">Manage your students and session notes.</p>
                </div>
                <button className="bg-[#5E5574] text-white px-6 py-2 rounded-xl font-bold hover:shadow-lg transition-all">
                    Update Availability
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Today's Schedule */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-[#3F3A52]">Today's Schedule</h2>

                    <div className="kk-card-strong p-0 overflow-hidden">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex p-6 border-b border-[#E6E0F2] last:border-0 hover:bg-[#F7F5FB] transition-colors group">
                                <div className="w-24 flex-shrink-0 text-center border-r border-[#E6E0F2] pr-6 mr-6">
                                    <span className="block text-2xl font-bold text-[#5E5574]">{4 + i}:00 PM</span>
                                    <span className="text-xs text-[#8C84A8] font-bold uppercase">60 Min</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-[#3F3A52] text-lg">Leo Das</h3>
                                            <p className="text-sm text-[#6B647F]">Maths (Year 10) • Online</p>
                                        </div>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">CONFIRMED</span>
                                    </div>

                                    <div className="mt-4 flex items-center gap-4 text-xs">
                                        <div className="flex items-center gap-1 text-[#5E5574] bg-white px-2 py-1 rounded border border-[#E6E0F2]">
                                            <Brain size={14} />
                                            <span className="font-bold">Visual Learner</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[#5E5574] bg-white px-2 py-1 rounded border border-[#E6E0F2]">
                                            <CheckCircle size={14} />
                                            <span>Topic: Quadratics</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 hidden group-hover:flex gap-2">
                                        <button className="px-4 py-2 bg-[#5E5574] text-white text-xs font-bold rounded-lg">Start Session</button>
                                        <button className="px-4 py-2 bg-white border border-[#E6E0F2] text-[#5E5574] text-xs font-bold rounded-lg">View MindPrint</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Student Roster / Alerts */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#3F3A52]">Attention Needed</h2>
                    <div className="kk-glass p-5 space-y-4">
                        <div className="flex gap-3">
                            <div className="h-2 w-2 rounded-full bg-red-400 mt-2" />
                            <div>
                                <p className="text-sm font-bold text-[#3F3A52]">Sarah Jones</p>
                                <p className="text-xs text-[#6B647F]">Missed homework 2 weeks in a row. Needs follow up.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-2 w-2 rounded-full bg-yellow-400 mt-2" />
                            <div>
                                <p className="text-sm font-bold text-[#3F3A52]">Mike Chen</p>
                                <p className="text-xs text-[#6B647F]">MindPrint update pending due to recent test scores.</p>
                            </div>
                        </div>
                    </div>

                    <div className="kk-glass p-5 text-center">
                        <Users size={32} className="mx-auto text-[#D9CFF2] mb-2" />
                        <p className="text-sm font-bold text-[#3F3A52]">12 Active Students</p>
                        <button className="text-xs text-[#5E5574] font-bold mt-2 hover:underline">View All Students</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
