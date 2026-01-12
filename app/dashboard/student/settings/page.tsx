'use client';

import { User, Bell, Lock, Palette, Globe, Mail, Phone, Calendar, Save } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'preferences'>('profile');

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-[#3F3A52] font-serif">Settings</h1>
                <p className="text-[#6B647F] mt-2 text-lg">
                    Manage your account and preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#E6E0F2]">
                <div className="flex gap-6 overflow-x-auto">
                    {[
                        { key: 'profile', label: 'Profile', icon: User },
                        { key: 'notifications', label: 'Notifications', icon: Bell },
                        { key: 'privacy', label: 'Privacy', icon: Lock },
                        { key: 'preferences', label: 'Preferences', icon: Palette },
                    ].map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as any)}
                                className={`pb-3 px-1 font-bold transition-all relative flex items-center gap-2 whitespace-nowrap ${activeTab === tab.key
                                        ? 'text-[#5E5574]'
                                        : 'text-[#8C84A8] hover:text-[#6B647F]'
                                    }`}
                            >
                                <Icon size={18} />
                                {tab.label}
                                {activeTab === tab.key && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5E5574]"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div className="space-y-6">
                    <div className="kk-card p-8">
                        <h2 className="text-xl font-bold text-[#3F3A52] mb-6 font-serif">Personal Information</h2>

                        {/* Profile Picture */}
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D9CFF2] to-[#B8ADD8] flex items-center justify-center">
                                <User size={40} className="text-[#5E5574]" />
                            </div>
                            <div>
                                <button className="px-6 py-2.5 rounded-xl bg-[#5E5574] text-white font-bold hover:bg-[#4F4865] transition-all mb-2">
                                    Upload Photo
                                </button>
                                <p className="text-sm text-[#8C84A8]">JPG, PNG or GIF. Max size 2MB.</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-[#3F3A52] mb-2">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Alex Thompson"
                                    className="w-full px-4 py-3 rounded-xl border border-[#E6E0F2] text-[#3F3A52] focus:outline-none focus:ring-2 focus:ring-[#5E5574] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#3F3A52] mb-2">Email</label>
                                <div className="relative">
                                    <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8C84A8]" />
                                    <input
                                        type="email"
                                        defaultValue="alex.thompson@email.com"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E6E0F2] text-[#3F3A52] focus:outline-none focus:ring-2 focus:ring-[#5E5574] transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#3F3A52] mb-2">Phone</label>
                                <div className="relative">
                                    <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8C84A8]" />
                                    <input
                                        type="tel"
                                        defaultValue="+61 400 123 456"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E6E0F2] text-[#3F3A52] focus:outline-none focus:ring-2 focus:ring-[#5E5574] transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#3F3A52] mb-2">Grade Level</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-[#E6E0F2] text-[#3F3A52] focus:outline-none focus:ring-2 focus:ring-[#5E5574] transition-all">
                                    <option>Year 10</option>
                                    <option>Year 9</option>
                                    <option>Year 8</option>
                                    <option>Year 7</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] text-white font-bold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2">
                                <Save size={18} />
                                Save Changes
                            </button>
                            <button className="px-8 py-3 rounded-xl bg-white border border-[#E6E0F2] text-[#5E5574] font-bold hover:bg-[#F7F5FB] transition-all">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
                <div className="kk-card p-8">
                    <h2 className="text-xl font-bold text-[#3F3A52] mb-6 font-serif">Notification Preferences</h2>
                    <div className="space-y-6">
                        {[
                            { title: "Session Reminders", description: "Get notified 30 minutes before your sessions" },
                            { title: "Assignment Due Dates", description: "Reminders for upcoming assignment deadlines" },
                            { title: "New Lesson Recommendations", description: "Notifications when new lessons match your profile" },
                            { title: "Achievement Unlocked", description: "Celebrate when you earn new achievements" },
                            { title: "Weekly Progress Report", description: "Summary of your weekly learning progress" },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-[#F7F5FB] transition-colors">
                                <div>
                                    <div className="font-bold text-[#3F3A52]">{item.title}</div>
                                    <div className="text-sm text-[#8C84A8]">{item.description}</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D9CFF2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5E5574]"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
                <div className="kk-card p-8">
                    <h2 className="text-xl font-bold text-[#3F3A52] mb-6 font-serif">Privacy Settings</h2>
                    <div className="space-y-6">
                        <div className="p-6 rounded-xl bg-[#F7F5FB] border border-[#E6E0F2]">
                            <h3 className="font-bold text-[#3F3A52] mb-2">Data Sharing</h3>
                            <p className="text-sm text-[#6B647F] mb-4">
                                Control how your learning data is shared with tutors and parents.
                            </p>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-[#E6E0F2] text-[#5E5574] focus:ring-[#5E5574]" />
                                    <span className="text-sm text-[#3F3A52]">Share progress with tutors</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-[#E6E0F2] text-[#5E5574] focus:ring-[#5E5574]" />
                                    <span className="text-sm text-[#3F3A52]">Share progress with parents</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5 rounded border-[#E6E0F2] text-[#5E5574] focus:ring-[#5E5574]" />
                                    <span className="text-sm text-[#3F3A52]">Include in class leaderboard</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
                <div className="kk-card p-8">
                    <h2 className="text-xl font-bold text-[#3F3A52] mb-6 font-serif">Learning Preferences</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-[#3F3A52] mb-2">Preferred Learning Time</label>
                            <select className="w-full px-4 py-3 rounded-xl border border-[#E6E0F2] text-[#3F3A52] focus:outline-none focus:ring-2 focus:ring-[#5E5574] transition-all">
                                <option>Afternoon (3PM - 6PM)</option>
                                <option>Morning (9AM - 12PM)</option>
                                <option>Evening (6PM - 9PM)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#3F3A52] mb-2">Language</label>
                            <div className="relative">
                                <Globe size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8C84A8]" />
                                <select className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E6E0F2] text-[#3F3A52] focus:outline-none focus:ring-2 focus:ring-[#5E5574] transition-all">
                                    <option>English</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
