'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Brain, BookOpen, Users, FileText, TrendingUp,
    Target, Zap, Award, Calendar, CheckCircle,
    BarChart3, Lightbulb, Clock, Shield, X,
    ChevronRight, Sparkles, GraduationCap, Activity
} from 'lucide-react'

interface SubNode {
    id: string
    label: string
    icon: any
    description: string
    details: string[]
}

interface PillarNode {
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

export default function EnhancedKeyMethodMap() {
    const [selectedPillar, setSelectedPillar] = useState<string | null>(null)
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)
    const [expandedSubNodes, setExpandedSubNodes] = useState<string[]>([])

    const pillars: PillarNode[] = [
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
                {
                    id: 'cognitive',
                    label: 'Cognitive Profiling',
                    icon: Brain,
                    description: 'Scientific assessment of learning strengths',
                    details: ['10 cognitive capacities', 'Personalized insights', 'Research-backed']
                },
                {
                    id: 'learning-style',
                    label: 'Learning Style Analysis',
                    icon: Target,
                    description: 'Visual, auditory, kinesthetic mapping',
                    details: ['Modality preferences', 'Study recommendations', 'Adaptive strategies']
                },
                {
                    id: 'strength-mapping',
                    label: 'Strength Mapping',
                    icon: Award,
                    description: 'Identify academic advantages',
                    details: ['Natural abilities', 'Growth areas', 'Strategic focus']
                },
                {
                    id: 'study-optimization',
                    label: 'Study Optimization',
                    icon: Zap,
                    description: 'Personalized study techniques',
                    details: ['Custom methods', 'Time management', 'Retention strategies']
                },
                {
                    id: 'adaptive-recommendations',
                    label: 'Adaptive Recommendations',
                    icon: Lightbulb,
                    description: 'AI-powered learning paths',
                    details: ['Dynamic adjustments', 'Progress-based', 'Continuous refinement']
                }
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
            connections: ['mindprint', 'resources', 'plans'],
            subNodes: [
                {
                    id: 'adaptive-coursework',
                    label: 'Adaptive Coursework',
                    icon: BookOpen,
                    description: 'Personalized learning sequences',
                    details: ['MindPrint-aligned', 'Self-paced modules', 'Mastery-based progression']
                },
                {
                    id: 'study-labs',
                    label: 'Study Labs',
                    icon: Activity,
                    description: 'Interactive practice environments',
                    details: ['Hands-on exercises', 'Real-time feedback', 'Skill building']
                },
                {
                    id: 'weekly-quizzes',
                    label: 'Weekly Quizzes',
                    icon: CheckCircle,
                    description: 'Regular knowledge checks',
                    details: ['Spaced repetition', 'Concept reinforcement', 'Progress tracking']
                },
                {
                    id: 'progress-tracking',
                    label: 'Progress Tracking',
                    icon: BarChart3,
                    description: 'Comprehensive analytics dashboard',
                    details: ['Real-time metrics', 'Parent visibility', 'Goal monitoring']
                },
                {
                    id: 'practice-sets',
                    label: 'Custom Practice Sets',
                    icon: Target,
                    description: 'Targeted skill development',
                    details: ['Weakness-focused', 'Exam preparation', 'Adaptive difficulty']
                }
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
            connections: ['mindprint', 'plans'],
            subNodes: [
                {
                    id: 'mentoring',
                    label: '1:1 Mentoring',
                    icon: Users,
                    description: 'Dedicated personal guidance',
                    details: ['Individual attention', 'Relationship building', 'Ongoing support']
                },
                {
                    id: 'atar-background',
                    label: '95+ ATAR Background',
                    icon: Award,
                    description: 'Proven academic excellence',
                    details: ['Top performers', 'Subject experts', 'Recent graduates']
                },
                {
                    id: 'weekly-sessions',
                    label: 'Weekly Sessions',
                    icon: Calendar,
                    description: 'Consistent engagement',
                    details: ['Regular touchpoints', 'Flexible scheduling', 'Structured support']
                },
                {
                    id: 'matching',
                    label: 'Tutor-Student Matching',
                    icon: Target,
                    description: 'Personality & style alignment',
                    details: ['Compatibility focus', 'Learning style match', 'Subject expertise']
                },
                {
                    id: 'strategic-guidance',
                    label: 'Strategic Study Guidance',
                    icon: Lightbulb,
                    description: 'Long-term academic planning',
                    details: ['Goal setting', 'Study systems', 'Exam strategies']
                }
            ]
        },
        {
            id: 'resources',
            title: 'Resources',
            subtitle: 'Premium Materials',
            icon: FileText,
            color: '#9D8FBF',
            gradient: 'from-[#9D8FBF] to-[#B8ADD8]',
            position: { x: 50, y: 85 },
            connections: ['lms'],
            subNodes: [
                {
                    id: 'textbooks',
                    label: 'Textbook Resources',
                    icon: BookOpen,
                    description: 'Comprehensive learning materials',
                    details: ['NSW curriculum aligned', 'Year 5-10 coverage', 'Digital access']
                },
                {
                    id: 'practice-papers',
                    label: 'Practice Paper Banks',
                    icon: FileText,
                    description: 'Extensive question libraries',
                    details: ['Past papers', 'Topic-specific', 'Difficulty graded']
                },
                {
                    id: 'syllabus-aligned',
                    label: 'Syllabus-Aligned Materials',
                    icon: CheckCircle,
                    description: 'Curriculum-matched content',
                    details: ['NESA standards', 'Outcome focused', 'Updated annually']
                },
                {
                    id: 'exam-guides',
                    label: 'Exam-Focused Guides',
                    icon: Target,
                    description: 'Strategic preparation resources',
                    details: ['Marking criteria', 'Sample responses', 'Technique guides']
                },
                {
                    id: 'premium-content',
                    label: 'Premium In-House Content',
                    icon: Sparkles,
                    description: 'Exclusive Kite & Key materials',
                    details: ['Expert-created', 'Continuously updated', 'High-quality production']
                }
            ]
        },
        {
            id: 'plans',
            title: 'Plans & Pathways',
            subtitle: 'Flexible Options',
            icon: TrendingUp,
            color: '#B8ADD8',
            gradient: 'from-[#B8ADD8] to-[#D9CFF2]',
            position: { x: 50, y: 50 },
            connections: ['tutors', 'lms'],
            subNodes: [
                {
                    id: 'glide',
                    label: 'Glide',
                    icon: Clock,
                    description: '1 hour/week - Entry support',
                    details: ['Flexible tutoring', 'Full LMS access', 'All resources included']
                },
                {
                    id: 'elevate',
                    label: 'Elevate',
                    icon: TrendingUp,
                    description: '2 hours/week - Balanced support',
                    details: ['Increased frequency', 'Full LMS access', 'All resources included']
                },
                {
                    id: 'soar',
                    label: 'Soar',
                    icon: GraduationCap,
                    description: '3 hours/week - Maximum support',
                    details: ['Maximum flexibility', 'Full LMS access', 'All resources included']
                },
                {
                    id: 'subject-allocation',
                    label: 'Flexible Subject Allocation',
                    icon: Target,
                    description: 'Customize hour distribution',
                    details: ['Maths, English, Science', 'Mix and match', 'Adjust as needed']
                },
                {
                    id: 'same-tools',
                    label: 'Same Tools Across All Plans',
                    icon: Shield,
                    description: 'Equal access to resources',
                    details: ['MindPrint included', 'Full LMS features', 'Premium materials']
                }
            ]
        }
    ]

    const centerNode = {
        id: 'student',
        title: 'Your Child',
        subtitle: 'At the center of everything'
    }

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-b from-[#F7F5FB] via-[#FAFBFF] to-white overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E6E0F5] rounded-full filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D9CFF2] rounded-full filter blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-semibold text-[#8B7FA8] uppercase tracking-wider mb-3"
                    >
                        The Framework
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-julius text-[#3F3A52] mb-4"
                    >
                        The KEY Method
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#6B647F] max-w-2xl mx-auto"
                    >
                        An interconnected ecosystem of personalized learning
                    </motion.p>
                </div>

                {/* Interactive Mind Map */}
                <div className="relative w-full aspect-[16/10] max-w-6xl mx-auto">
                    {/* SVG for connection lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8B7FA8" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#7C6B94" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#8B7FA8" stopOpacity="0.3" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Animated connection paths */}
                        {pillars.map((pillar) => {
                            const centerX = 50
                            const centerY = 50
                            const pillarX = pillar.position.x
                            const pillarY = pillar.position.y

                            // Create curved path
                            const midX = (centerX + pillarX) / 2
                            const midY = (centerY + pillarY) / 2
                            const controlX = midX + (centerY - pillarY) * 0.3
                            const controlY = midY + (pillarX - centerX) * 0.3

                            return (
                                <motion.path
                                    key={pillar.id}
                                    d={`M ${centerX}% ${centerY}% Q ${controlX}% ${controlY}% ${pillarX}% ${pillarY}%`}
                                    stroke="url(#lineGradient)"
                                    strokeWidth={hoveredNode === pillar.id || selectedPillar === pillar.id ? "3" : "2"}
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: 1,
                                        opacity: hoveredNode === pillar.id || selectedPillar === pillar.id ? 0.8 : 0.4
                                    }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    filter={hoveredNode === pillar.id || selectedPillar === pillar.id ? "url(#glow)" : "none"}
                                />
                            )
                        })}

                        {/* Cross-connections */}
                        {pillars.map((pillar) =>
                            pillar.connections.map((connId) => {
                                const targetPillar = pillars.find(p => p.id === connId)
                                if (!targetPillar) return null

                                const shouldShow = hoveredNode === pillar.id || hoveredNode === connId

                                return (
                                    <motion.path
                                        key={`${pillar.id}-${connId}`}
                                        d={`M ${pillar.position.x}% ${pillar.position.y}% L ${targetPillar.position.x}% ${targetPillar.position.y}%`}
                                        stroke={pillar.color}
                                        strokeWidth="1.5"
                                        strokeDasharray="5,5"
                                        fill="none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: shouldShow ? 0.3 : 0 }}
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
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <motion.div
                            className="relative"
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#5E5574]/20 to-[#8B7FA8]/20 rounded-full blur-2xl" />

                            {/* Main node */}
                            <div className="relative bg-white rounded-full p-8 shadow-2xl border-2 border-[#E6E0F5]">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5E5574] to-[#8B7FA8] flex items-center justify-center">
                                    <GraduationCap size={32} className="text-white" />
                                </div>
                            </div>

                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                                <p className="font-bold text-[#3F3A52] text-lg">{centerNode.title}</p>
                                <p className="text-sm text-[#8B7FA8]">{centerNode.subtitle}</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Pillar Nodes */}
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.id}
                            className="absolute"
                            style={{
                                left: `${pillar.position.x}%`,
                                top: `${pillar.position.y}%`,
                                transform: 'translate(-50%, -50%)',
                                zIndex: selectedPillar === pillar.id ? 20 : 5
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: [0, -5, 0]
                            }}
                            transition={{
                                delay: 0.7 + index * 0.1,
                                y: {
                                    duration: 3 + index * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            onMouseEnter={() => setHoveredNode(pillar.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            <motion.button
                                onClick={() => setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
                                className={`relative bg-white rounded-2xl p-6 shadow-xl border-2 transition-all cursor-pointer ${selectedPillar === pillar.id || hoveredNode === pillar.id
                                        ? 'border-[#5E5574] shadow-2xl'
                                        : 'border-[#E6E0F5] hover:border-[#D9CFF2]'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex flex-col items-center gap-3 min-w-[160px]">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shadow-lg`}>
                                        <pillar.icon size={28} className="text-white" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold text-[#3F3A52] text-base">{pillar.title}</h3>
                                        <p className="text-xs text-[#8B7FA8] mt-1">{pillar.subtitle}</p>
                                    </div>
                                    {selectedPillar === pillar.id && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#5E5574] to-[#7C6B94] flex items-center justify-center"
                                        >
                                            <CheckCircle size={14} className="text-white" />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {/* Expanded Detail Panel */}
                <AnimatePresence>
                    {selectedPillar && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="mt-16 bg-white rounded-3xl border-2 border-[#E6E0F5] shadow-2xl overflow-hidden"
                        >
                            {(() => {
                                const pillar = pillars.find(p => p.id === selectedPillar)
                                if (!pillar) return null

                                return (
                                    <div>
                                        {/* Header */}
                                        <div className={`bg-gradient-to-r ${pillar.gradient} p-8 text-white relative`}>
                                            <button
                                                onClick={() => setSelectedPillar(null)}
                                                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                    <pillar.icon size={32} />
                                                </div>
                                                <div>
                                                    <h2 className="text-3xl font-bold">{pillar.title}</h2>
                                                    <p className="text-white/90 mt-1">{pillar.subtitle}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sub-nodes Grid */}
                                        <div className="p-8">
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {pillar.subNodes.map((subNode, idx) => (
                                                    <motion.div
                                                        key={subNode.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className="group bg-gradient-to-br from-[#F7F5FB] to-white rounded-2xl p-6 border border-[#E6E0F5] hover:border-[#D9CFF2] hover:shadow-lg transition-all cursor-pointer"
                                                        onClick={() => {
                                                            if (expandedSubNodes.includes(subNode.id)) {
                                                                setExpandedSubNodes(expandedSubNodes.filter(id => id !== subNode.id))
                                                            } else {
                                                                setExpandedSubNodes([...expandedSubNodes, subNode.id])
                                                            }
                                                        }}
                                                    >
                                                        <div className="flex items-start gap-3 mb-3">
                                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                                <subNode.icon size={20} className="text-white" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-[#3F3A52] text-sm mb-1">{subNode.label}</h4>
                                                                <p className="text-xs text-[#8B7FA8]">{subNode.description}</p>
                                                            </div>
                                                            <ChevronRight
                                                                size={16}
                                                                className={`text-[#8B7FA8] transition-transform ${expandedSubNodes.includes(subNode.id) ? 'rotate-90' : ''}`}
                                                            />
                                                        </div>

                                                        <AnimatePresence>
                                                            {expandedSubNodes.includes(subNode.id) && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="pt-3 mt-3 border-t border-[#E6E0F5]">
                                                                        <ul className="space-y-2">
                                                                            {subNode.details.map((detail, i) => (
                                                                                <li key={i} className="flex items-start gap-2 text-xs text-[#6B647F]">
                                                                                    <CheckCircle size={14} className="text-[#8B7FA8] flex-shrink-0 mt-0.5" />
                                                                                    <span>{detail}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
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

                {/* Interaction Hint */}
                {!selectedPillar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="text-center mt-12"
                    >
                        <p className="text-sm text-[#8B7FA8] flex items-center justify-center gap-2">
                            <Sparkles size={16} />
                            Click any pillar to explore the ecosystem
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
