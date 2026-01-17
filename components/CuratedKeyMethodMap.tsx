'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Brain, BookOpen, Users, FileText, TrendingUp,
    Target, Zap, Award, Calendar, CheckCircle,
    BarChart3, Lightbulb, Clock, GraduationCap, X
} from 'lucide-react'

interface SubNode {
    id: string
    label: string
    icon: any
}

interface Pillar {
    id: string
    title: string
    subtitle: string
    icon: any
    color: string
    gradient: string
    position: { x: number; y: number }
    subNodes: SubNode[]
    connections: string[]
}

export default function CuratedKeyMethodMap() {
    const [selectedPillar, setSelectedPillar] = useState<string | null>(null)
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)

    const pillars: Pillar[] = [
        {
            id: 'mindprint',
            title: 'MindPrint',
            subtitle: 'Cognitive Profiling',
            icon: Brain,
            color: '#8B7FA8',
            gradient: 'from-[#8B7FA8] to-[#A89BBF]',
            position: { x: 50, y: 15 },
            connections: ['lms', 'tutors'],
            subNodes: [
                { id: 'cognitive', label: 'Cognitive Profile', icon: Brain },
                { id: 'learning-style', label: 'Learning Style', icon: Target },
                { id: 'strength', label: 'Strength Mapping', icon: Award },
                { id: 'optimization', label: 'Study Optimisation', icon: Zap }
            ]
        },
        {
            id: 'lms',
            title: 'Garden LMS',
            subtitle: 'Learning Platform',
            icon: BookOpen,
            color: '#7C6B94',
            gradient: 'from-[#7C6B94] to-[#9D8FBF]',
            position: { x: 15, y: 50 },
            connections: ['mindprint'],
            subNodes: [
                { id: 'adaptive', label: 'Adaptive Lessons', icon: BookOpen },
                { id: 'labs', label: 'Study Labs', icon: Lightbulb },
                { id: 'checkpoints', label: 'Checkpoints', icon: CheckCircle },
                { id: 'progress', label: 'Progress Tracking', icon: BarChart3 }
            ]
        },
        {
            id: 'tutors',
            title: 'Expert Tutors',
            subtitle: '1:1 Mentorship',
            icon: Users,
            color: '#5E5574',
            gradient: 'from-[#5E5574] to-[#7C6B94]',
            position: { x: 85, y: 50 },
            connections: ['mindprint'],
            subNodes: [
                { id: 'mentorship', label: '1:1 Mentorship', icon: Users },
                { id: 'weekly', label: 'Weekly Sessions', icon: Calendar },
                { id: 'matching', label: 'Tutor Matching', icon: Target },
                { id: 'strategic', label: 'Strategic Guidance', icon: Lightbulb }
            ]
        },
        {
            id: 'resources',
            title: 'Resources',
            subtitle: 'Premium Materials',
            icon: FileText,
            color: '#9D8FBF',
            gradient: 'from-[#9D8FBF] to-[#B8ADD8]',
            position: { x: 30, y: 85 },
            connections: [],
            subNodes: [
                { id: 'textbooks', label: 'Textbook Resources', icon: BookOpen },
                { id: 'practice', label: 'Practice Papers', icon: FileText },
                { id: 'exam', label: 'Exam Focused', icon: Target },
                { id: 'syllabus', label: 'Syllabus Aligned', icon: CheckCircle }
            ]
        },
        {
            id: 'plans',
            title: 'Plans & Pathways',
            subtitle: 'Flexible Options',
            icon: TrendingUp,
            color: '#B8ADD8',
            gradient: 'from-[#B8ADD8] to-[#D9CFF2]',
            position: { x: 70, y: 85 },
            connections: ['tutors'],
            subNodes: [
                { id: 'glide', label: 'Glide', icon: Clock },
                { id: 'elevate', label: 'Elevate', icon: TrendingUp },
                { id: 'soar', label: 'Soar', icon: GraduationCap },
                { id: 'flexible', label: 'Flexible Hours', icon: Calendar },
                { id: 'subject', label: 'Subject Mix', icon: Target }
            ]
        }
    ]

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-b from-[#F7F5FB] via-[#FAFBFF] to-white overflow-hidden py-20">
            {/* Subtle background ambiance */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#E6E0F5] rounded-full filter blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-[#D9CFF2] rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '3s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-semibold text-[#8B7FA8] uppercase tracking-wider mb-3"
                    >
                        The Framework
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-julius text-[#3F3A52] mb-4"
                    >
                        The KEY Method
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-[#6B647F]"
                    >
                        An interconnected ecosystem of personalized learning
                    </motion.p>
                </div>

                {/* Mind Map Canvas */}
                <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto">
                    {/* SVG Connection Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                        <defs>
                            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8B7FA8" stopOpacity="0.2" />
                                <stop offset="50%" stopColor="#7C6B94" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#8B7FA8" stopOpacity="0.2" />
                            </linearGradient>
                            <filter id="softGlow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Primary connections from center to pillars */}
                        {pillars.map((pillar) => {
                            const cx = 50, cy = 50
                            const px = pillar.position.x, py = pillar.position.y
                            const mx = (cx + px) / 2
                            const my = (cy + py) / 2
                            const ctrlX = mx + (cy - py) * 0.25
                            const ctrlY = my + (px - cx) * 0.25

                            const isActive = hoveredNode === pillar.id || selectedPillar === pillar.id

                            return (
                                <motion.path
                                    key={pillar.id}
                                    d={`M ${cx}% ${cy}% Q ${ctrlX}% ${ctrlY}% ${px}% ${py}%`}
                                    stroke="url(#connectionGradient)"
                                    strokeWidth={isActive ? "2.5" : "1.5"}
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: 1,
                                        opacity: isActive ? 0.7 : 0.3
                                    }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    filter={isActive ? "url(#softGlow)" : "none"}
                                />
                            )
                        })}

                        {/* Cross-connections (appear on hover only) */}
                        {pillars.map((pillar) =>
                            pillar.connections.map((connId) => {
                                const target = pillars.find(p => p.id === connId)
                                if (!target) return null

                                const show = hoveredNode === pillar.id || hoveredNode === connId

                                return (
                                    <motion.path
                                        key={`${pillar.id}-${connId}`}
                                        d={`M ${pillar.position.x}% ${pillar.position.y}% L ${target.position.x}% ${target.position.y}%`}
                                        stroke={pillar.color}
                                        strokeWidth="1"
                                        strokeDasharray="4,4"
                                        fill="none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: show ? 0.25 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )
                            })
                        )}
                    </svg>

                    {/* Center Student Node */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ zIndex: 10 }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.03, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                        >
                            {/* Soft glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#5E5574]/15 to-[#8B7FA8]/15 rounded-full blur-xl" />

                            {/* Core node */}
                            <div className="relative bg-white rounded-full p-6 shadow-xl border-2 border-[#E6E0F5]">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5E5574] to-[#8B7FA8] flex items-center justify-center">
                                    <GraduationCap size={24} className="text-white" />
                                </div>
                            </div>

                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                                <p className="font-semibold text-[#3F3A52]">Student</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Pillar Nodes */}
                    {pillars.map((pillar, idx) => (
                        <motion.div
                            key={pillar.id}
                            className="absolute"
                            style={{
                                left: `${pillar.position.x}%`,
                                top: `${pillar.position.y}%`,
                                transform: 'translate(-50%, -50%)',
                                zIndex: selectedPillar === pillar.id ? 15 : 5
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: [0, -4, 0]
                            }}
                            transition={{
                                delay: 0.6 + idx * 0.08,
                                y: {
                                    duration: 2.5 + idx * 0.3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            onMouseEnter={() => setHoveredNode(pillar.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            <motion.button
                                onClick={() => setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
                                className={`relative bg-white rounded-2xl p-5 shadow-lg border-2 transition-all ${selectedPillar === pillar.id || hoveredNode === pillar.id
                                        ? 'border-[#5E5574] shadow-xl'
                                        : 'border-[#E6E0F5]'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <div className="flex flex-col items-center gap-2 min-w-[140px]">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shadow-md`}>
                                        <pillar.icon size={24} className="text-white" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-semibold text-[#3F3A52] text-sm">{pillar.title}</h3>
                                        <p className="text-xs text-[#8B7FA8] mt-0.5">{pillar.subtitle}</p>
                                    </div>
                                </div>
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {/* Expanded Detail Panel */}
                <AnimatePresence>
                    {selectedPillar && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.3 }}
                            className="mt-16"
                        >
                            {(() => {
                                const pillar = pillars.find(p => p.id === selectedPillar)
                                if (!pillar) return null

                                return (
                                    <div className="bg-white rounded-3xl border-2 border-[#E6E0F5] shadow-2xl overflow-hidden">
                                        {/* Header */}
                                        <div className={`bg-gradient-to-r ${pillar.gradient} p-6 text-white relative`}>
                                            <button
                                                onClick={() => setSelectedPillar(null)}
                                                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                                            >
                                                <X size={18} />
                                            </button>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                    <pillar.icon size={24} />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold">{pillar.title}</h2>
                                                    <p className="text-white/90 text-sm mt-0.5">{pillar.subtitle}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sub-nodes */}
                                        <div className="p-6">
                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                                {pillar.subNodes.map((node, i) => (
                                                    <motion.div
                                                        key={node.id}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className="bg-gradient-to-br from-[#F7F5FB] to-white rounded-xl p-4 border border-[#E6E0F5] hover:border-[#D9CFF2] hover:shadow-md transition-all"
                                                    >
                                                        <div className="flex flex-col items-center text-center gap-2">
                                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.gradient} flex items-center justify-center`}>
                                                                <node.icon size={18} className="text-white" />
                                                            </div>
                                                            <p className="text-xs font-medium text-[#3F3A52] leading-tight">{node.label}</p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
