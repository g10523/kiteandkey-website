"use client";

import { useState } from "react";
import { Brain, BookOpen, Users, FileText, User, X } from "lucide-react";

interface Pillar {
    id: string;
    title: string;
    subtitle: string;
    icon: any;
    color: string;
    details: string[];
    previewContent: React.ReactNode;
}

const PILLARS: Pillar[] = [
    {
        id: "mindprint",
        title: "MindPrint",
        subtitle: "Cognitive Profiling",
        icon: Brain,
        color: "#7C6B94",
        details: [
            "Learning style analysis",
            "Strength mapping",
            "Study optimisation"
        ],
        previewContent: (
            <div className="p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#3F3A52] mb-2">Your Cognitive Profile</h3>
                    <p className="text-[#6B647F]">Understanding how you learn unlocks better results</p>
                </div>
                <div className="space-y-4">
                    {["Visual Processing", "Working Memory", "Attention Control", "Processing Speed"].map((trait, i) => (
                        <div key={trait} className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-[#3F3A52]">{trait}</span>
                                <span className="text-[#7C6B94]">{85 - i * 8}%</span>
                            </div>
                            <div className="h-2 bg-[#E6E1F2] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#7C6B94] to-[#9B8BB0] rounded-full transition-all duration-500"
                                    style={{ width: `${85 - i * 8}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "garden",
        title: "Garden LMS",
        subtitle: "Learning Platform",
        icon: BookOpen,
        color: "#5E5574",
        details: [
            "Adaptive coursework",
            "Study Labs",
            "Progress tracking"
        ],
        previewContent: (
            <div className="p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#3F3A52] mb-2">Today's Focus</h3>
                    <p className="text-[#6B647F]">Your personalised learning path</p>
                </div>
                <div className="space-y-3">
                    {["Quadratic Equations - Lesson 3", "Practice Set: Factorisation", "Review: Linear Functions"].map((item, i) => (
                        <div key={item} className="flex items-center gap-3 p-4 bg-[#F7F5FB] rounded-xl border border-[#E6E1F2]">
                            <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#5E5574]' : 'bg-[#D9CFF2]'}`} />
                            <span className="text-[#3F3A52] font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "tutors",
        title: "Expert Tutors",
        subtitle: "1:1 Mentorship",
        icon: Users,
        color: "#8B7FA8",
        details: [
            "95+ ATAR average",
            "Weekly sessions",
            "Matched to you"
        ],
        previewContent: (
            <div className="p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#3F3A52] mb-2">Your Tutor</h3>
                    <p className="text-[#6B647F]">Matched to your learning needs</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[#F7F5FB] rounded-xl border border-[#E6E1F2]">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8B7FA8] to-[#A89BB8] rounded-full flex items-center justify-center text-white text-xl font-bold">
                        GH
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-[#3F3A52] mb-1">Ghashika Helvadjian</h4>
                        <p className="text-sm text-[#6B647F] mb-2">Mathematics & Physics • ATAR 95.00</p>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-white border border-[#D9CFF2] rounded-full text-xs text-[#5E5574]">Year 10 Maths</span>
                            <span className="px-3 py-1 bg-white border border-[#D9CFF2] rounded-full text-xs text-[#5E5574]">Weekly Sessions</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "resources",
        title: "Resources",
        subtitle: "Premium Materials",
        icon: FileText,
        color: "#6B647F",
        details: [
            "Syllabus aligned",
            "Practice papers",
            "Exam focused"
        ],
        previewContent: (
            <div className="p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#3F3A52] mb-2">Your Library</h3>
                    <p className="text-[#6B647F]">Premium materials at your fingertips</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {["Year 10 Maths Textbook", "Practice Papers 2024", "Revision Summaries", "Formula Sheets"].map((resource) => (
                        <div key={resource} className="p-4 bg-[#F7F5FB] rounded-xl border border-[#E6E1F2] hover:border-[#D9CFF2] transition-colors cursor-pointer">
                            <FileText size={24} className="text-[#6B647F] mb-2" />
                            <p className="text-sm font-medium text-[#3F3A52]">{resource}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
];

export default function ElevatedKeyMethodMap() {
    const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
    const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

    const selectedPillarData = PILLARS.find(p => p.id === selectedPillar);

    return (
        <div className="relative w-full min-h-[800px] bg-gradient-to-b from-[#FAFAFA] to-white py-20">
            {/* Header */}
            <div className="text-center mb-16">
                <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#8C84A8] mb-4">
                    The Framework
                </p>
                <h2 className="font-julius text-4xl md:text-5xl text-[#3F3A52] mb-4">
                    The KEY Method
                </h2>
                <p className="text-lg text-[#6B647F] max-w-2xl mx-auto">
                    An interconnected ecosystem of personalised learning
                </p>
            </div>

            {/* Mind Map Container */}
            <div className="relative max-w-6xl mx-auto px-6" style={{ height: '600px' }}>
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Curved connectors from Student to each pillar */}
                    {PILLARS.map((pillar, index) => {
                        // MindPrint (top/0°), Garden (left/-90°), Tutors (right/90°), Resources (bottom/180°)
                        const angles = [0, -90, 90, 180];
                        const angle = angles[index];
                        const isHovered = hoveredPillar === pillar.id;

                        return (
                            <path
                                key={pillar.id}
                                d={`M 600 300 Q ${600 + Math.cos(angle * Math.PI / 180) * 120} ${300 + Math.sin(angle * Math.PI / 180) * 120}, ${600 + Math.cos(angle * Math.PI / 180) * 240} ${300 + Math.sin(angle * Math.PI / 180) * 240}`}
                                stroke={isHovered ? pillar.color : "#E6E1F2"}
                                strokeWidth={isHovered ? "2" : "1.5"}
                                fill="none"
                                className="transition-all duration-300"
                                style={{ filter: isHovered ? "url(#glow)" : "none" }}
                            />
                        );
                    })}
                </svg>

                {/* Central Student Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 10 }}>
                    <div className="relative">
                        <div className="w-28 h-28 bg-white rounded-2xl border border-[#E6E1F2] shadow-md flex flex-col items-center justify-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#5E5574] to-[#7C6B94] rounded-full flex items-center justify-center mb-2">
                                <User size={24} className="text-white" />
                            </div>
                            <span className="text-sm font-bold text-[#3F3A52]">Student</span>
                        </div>
                    </div>
                </div>

                {/* Pillar Nodes */}
                {PILLARS.map((pillar, index) => {
                    // MindPrint (top/0°), Garden (left/-90°), Tutors (right/90°), Resources (bottom/180°)
                    const angles = [0, -90, 90, 180];
                    const angle = angles[index];
                    const x = 600 + Math.cos(angle * Math.PI / 180) * 240;
                    const y = 300 + Math.sin(angle * Math.PI / 180) * 240;
                    const isHovered = hoveredPillar === pillar.id;

                    return (
                        <div
                            key={pillar.id}
                            className="absolute"
                            style={{
                                left: `${x}px`,
                                top: `${y}px`,
                                transform: 'translate(-50%, -50%)',
                                zIndex: 5
                            }}
                        >
                            {/* Main Pillar Card */}
                            <div
                                className={`relative cursor-pointer transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'
                                    }`}
                                onMouseEnter={() => setHoveredPillar(pillar.id)}
                                onMouseLeave={() => setHoveredPillar(null)}
                                onClick={() => setSelectedPillar(pillar.id)}
                            >
                                <div
                                    className="w-56 bg-white rounded-2xl border p-6 shadow-md hover:shadow-lg transition-all"
                                    style={{
                                        borderColor: isHovered ? pillar.color : '#E6E1F2'
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                                        style={{ backgroundColor: `${pillar.color}15` }}
                                    >
                                        <pillar.icon size={24} style={{ color: pillar.color }} />
                                    </div>
                                    <h3 className="font-bold text-[#3F3A52] mb-1">{pillar.title}</h3>
                                    <p className="text-xs text-[#8C84A8] mb-3">{pillar.subtitle}</p>
                                    <div className="space-y-1">
                                        {pillar.details.map((detail, i) => (
                                            <p key={i} className="text-xs text-[#6B647F]">• {detail}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Preview Panel */}
            {selectedPillar && selectedPillarData && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                        <div
                            className="p-6 border-b border-[#E6E1F2] flex items-center justify-between"
                            style={{ backgroundColor: `${selectedPillarData.color}08` }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${selectedPillarData.color}15` }}
                                >
                                    <selectedPillarData.icon size={24} style={{ color: selectedPillarData.color }} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#3F3A52]">{selectedPillarData.title}</h3>
                                    <p className="text-sm text-[#6B647F]">{selectedPillarData.subtitle}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedPillar(null)}
                                className="w-10 h-10 rounded-full hover:bg-[#F7F5FB] flex items-center justify-center transition-colors"
                            >
                                <X size={20} className="text-[#6B647F]" />
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-[calc(80vh-100px)]">
                            {selectedPillarData.previewContent}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
