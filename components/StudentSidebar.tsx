'use client';

import { Home, Brain, Calendar, BookOpen, Award, Settings, LogOut, Menu, X, Bell, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface StudentSidebarProps {
    userName?: string;
    userRole?: string;
}

export default function StudentSidebar({ userName = "Alex", userRole = "STUDENT" }: StudentSidebarProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navigation = [
        { name: "Dashboard", href: "/dashboard/student", icon: Home },
        { name: "MindPrint™", href: "/dashboard/student/mindprint", icon: Brain },
        { name: "Schedule", href: "/dashboard/student/schedule", icon: Calendar },
        { name: "Lessons", href: "/dashboard/student/lessons", icon: BookOpen },
        { name: "Achievements", href: "/dashboard/student/achievements", icon: Award },
        { name: "Settings", href: "/dashboard/student/settings", icon: Settings },
    ];

    const isActive = (href: string) => {
        if (href === "/dashboard/student") {
            return pathname === href;
        }
        return pathname?.startsWith(href);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white border border-[#E6E0F2] shadow-lg"
            >
                {isMobileMenuOpen ? (
                    <X size={24} className="text-[#5E5574]" />
                ) : (
                    <Menu size={24} className="text-[#5E5574]" />
                )}
            </button>

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-64 bg-white border-r border-[#E6E0F2] z-40
                    transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-[#E6E0F2]">
                        <Link href="/dashboard/student" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5E5574] to-[#8B7FA8] flex items-center justify-center">
                                <span className="text-white font-bold text-xl">K</span>
                            </div>
                            <span className="text-xl font-bold font-serif text-[#3F3A52]">Kite & Key</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                                        ${active
                                            ? 'bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] text-white shadow-md'
                                            : 'text-[#6B647F] hover:bg-[#F7F5FB] hover:text-[#5E5574]'
                                        }
                                    `}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-[#E6E0F2]">
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F7F5FB] transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D9CFF2] to-[#B8ADD8] flex items-center justify-center">
                                    <User size={20} className="text-[#5E5574]" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-sm font-bold text-[#3F3A52]">{userName}</div>
                                    <div className="text-xs text-[#8C84A8]">{userRole}</div>
                                </div>
                                <ChevronDown size={16} className={`text-[#8C84A8] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-[#E6E0F2] rounded-xl shadow-lg overflow-hidden">
                                    <Link
                                        href="/dashboard/student/settings"
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#F7F5FB] transition-colors text-[#6B647F]"
                                    >
                                        <Settings size={18} />
                                        <span className="text-sm font-medium">Settings</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            // Add logout logic here
                                            console.log('Logout clicked');
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                                    >
                                        <LogOut size={18} />
                                        <span className="text-sm font-medium">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
