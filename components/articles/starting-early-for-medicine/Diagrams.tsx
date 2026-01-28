'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const ExplorationFunnelDiagram = () => {
    return (
        <div className="relative w-full max-w-lg mx-auto h-[450px] flex items-center justify-center my-16 px-4">
            <svg viewBox="0 0 400 450" className="w-full h-full overflow-visible drop-shadow-lg">
                <defs>
                    {/* Enhanced gradient with multiple stops */}
                    <linearGradient id="funnelGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#F5F2FF" stopOpacity="0.95" />
                        <stop offset="30%" stopColor="#E6E0F5" stopOpacity="0.85" />
                        <stop offset="70%" stopColor="#8C84A8" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#5E5574" stopOpacity="0.95" />
                    </linearGradient>

                    {/* Glow filter for particles */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Funnel Shape with enhanced styling */}
                <motion.path
                    d="M 50 50 L 350 50 L 240 400 L 160 400 Z"
                    fill="url(#funnelGradient)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    stroke="#5E5574"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Floating Particles (Interests) - Enhanced with varied sizes and colors */}
                {[...Array(8)].map((_, i) => {
                    const colors = ['#A594D1', '#8C84A8', '#9B8FB8', '#B5A8CC']
                    const sizes = [3, 4, 5, 3.5, 4.5, 3, 4, 5]
                    return (
                        <motion.circle
                            key={i}
                            r={sizes[i]}
                            fill={colors[i % colors.length]}
                            filter="url(#glow)"
                            initial={{ y: 60, x: 80 + i * 35, opacity: 0 }}
                            whileInView={{
                                y: [60, 120, 200, 300, 400],
                                x: [80 + i * 35, 120 + (i % 3) * 25, 160 + (i % 2) * 20, 180 + (i % 4) * 10, 200],
                                opacity: [0, 0.8, 1, 0.8, 0],
                                scale: [0.5, 1, 1.2, 1, 0.5]
                            }}
                            transition={{
                                duration: 4 + i * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.4
                            }}
                        />
                    )
                })}

                {/* Top Label */}
                <motion.text
                    x="200"
                    y="25"
                    textAnchor="middle"
                    className="text-xs font-julius tracking-[0.2em] fill-[#5E5574] font-bold"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 25 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    BROAD EXPOSURE
                </motion.text>

                {/* Bottom Label */}
                <motion.text
                    x="200"
                    y="435"
                    textAnchor="middle"
                    className="text-xs font-julius tracking-[0.2em] fill-[#5E5574] font-bold"
                    initial={{ opacity: 0, y: 425 }}
                    whileInView={{ opacity: 1, y: 435 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    INFORMED CHOICE
                </motion.text>
            </svg>

            {/* Side Annotations with improved positioning */}
            <motion.div
                className="absolute left-[-10px] top-[35%] max-w-[120px] text-xs text-[#8C84A8] text-right font-medium hidden md:block"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#E6E0F5] shadow-sm">
                    Explore Lifestyle
                </div>
            </motion.div>
            <motion.div
                className="absolute right-[-10px] top-[45%] max-w-[120px] text-xs text-[#8C84A8] text-left font-medium hidden md:block"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#E6E0F5] shadow-sm">
                    Assess Values
                </div>
            </motion.div>
        </div>
    )
}

export const LearningFlywheelDiagram = () => {
    const nodes = [
        { label: 'Active Recall', position: 'top' },
        { label: 'Test', position: 'right' },
        { label: 'Review', position: 'bottom' },
        { label: 'Refine', position: 'left' }
    ]

    return (
        <div className="relative w-full max-w-md mx-auto h-[380px] flex items-center justify-center my-16">
            {/* Outer glow ring */}
            <div className="absolute inset-0 m-auto w-72 h-72 rounded-full bg-gradient-to-br from-[#E6E0F5]/20 via-transparent to-[#5E5574]/10 blur-xl" />

            {/* Spinning Ring (The Flywheel) - Multiple layers for depth */}
            <motion.div
                className="absolute inset-0 m-auto w-64 h-64 rounded-full"
                style={{
                    background: 'conic-gradient(from 0deg, #5E5574 0deg, #8C84A8 90deg, #D9CFF2 180deg, #E6E0F5 270deg, #5E5574 360deg)'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Secondary counter-rotating ring for visual interest */}
            <motion.div
                className="absolute inset-0 m-auto w-60 h-60 rounded-full border-2 border-dashed border-[#D9CFF2]/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner Circle with glassmorphism */}
            <div className="absolute inset-0 m-auto w-48 h-48 rounded-full border-2 border-white/60 bg-white/70 backdrop-blur-md shadow-xl z-0" />

            {/* Nodes with enhanced styling and hover effects */}
            {nodes.map((node, i) => {
                const positions = {
                    top: 'top-[35px] left-1/2 -translate-x-1/2',
                    right: 'top-1/2 right-[35px] translate-x-1/2 -translate-y-1/2',
                    bottom: 'bottom-[35px] left-1/2 -translate-x-1/2',
                    left: 'top-1/2 left-[35px] -translate-x-1/2 -translate-y-1/2'
                }

                return (
                    <motion.div
                        key={node.label}
                        className={`absolute ${positions[node.position as keyof typeof positions]} z-10`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                    >
                        <div className="bg-gradient-to-br from-white to-[#FAF9FC] px-4 py-2.5 rounded-full shadow-lg border-2 border-[#E6E0F5] hover:border-[#8C84A8] transition-all duration-300">
                            <span className="text-xs font-bold text-[#5E5574] whitespace-nowrap">{node.label}</span>
                        </div>
                    </motion.div>
                )
            })}

            {/* Center Text with animation */}
            <motion.div
                className="relative z-0 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                <p className="font-julius text-base text-[#5E5574] tracking-[0.2em] font-bold mb-1">COMPOUNDING</p>
                <p className="text-[11px] text-[#8C84A8] uppercase tracking-wider font-medium">Growth</p>
            </motion.div>
        </div>
    )
}

export const BalancedLifeWheelDiagram = () => {
    const segments = [
        { name: 'Academics', color: '#8C84A8' },
        { name: 'Sport', color: '#A594D1' },
        { name: 'Arts', color: '#9B8FB8' },
        { name: 'Social', color: '#B5A8CC' },
        { name: 'Rest', color: '#8C84A8' }
    ]

    return (
        <div className="relative w-full max-w-md mx-auto my-16 flex flex-col items-center">
            <div className="relative w-72 h-72">
                {/* Background glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E6E0F5]/30 to-transparent blur-2xl" />

                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 relative z-10">
                    <defs>
                        {segments.map((seg, i) => (
                            <linearGradient key={`grad-${i}`} id={`segGrad-${i}`} x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor={seg.color} stopOpacity="0.3" />
                                <stop offset="100%" stopColor={seg.color} stopOpacity="0.1" />
                            </linearGradient>
                        ))}
                    </defs>

                    {/* Outer circle */}
                    <circle cx="50" cy="50" r="48" stroke="#E6E0F5" strokeWidth="1.5" fill="none" />

                    {/* Inner circles for depth */}
                    <circle cx="50" cy="50" r="36" stroke="#F0EDF6" strokeWidth="0.5" fill="none" opacity="0.5" />
                    <circle cx="50" cy="50" r="24" stroke="#F5F2FF" strokeWidth="0.5" fill="none" opacity="0.3" />

                    {/* Segment lines with enhanced styling */}
                    {segments.map((seg, i) => {
                        const angle = (360 / segments.length) * i
                        const rad = angle * (Math.PI / 180)
                        const x1 = 50 + 48 * Math.cos(rad)
                        const y1 = 50 + 48 * Math.sin(rad)

                        // Create segment arc path
                        const nextAngle = (360 / segments.length) * (i + 1)
                        const nextRad = nextAngle * (Math.PI / 180)
                        const x2 = 50 + 48 * Math.cos(nextRad)
                        const y2 = 50 + 48 * Math.sin(nextRad)

                        return (
                            <g key={i}>
                                {/* Radial line */}
                                <motion.line
                                    x1="50"
                                    y1="50"
                                    x2={x1}
                                    y2={y1}
                                    stroke={seg.color}
                                    strokeWidth="1"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.15 }}
                                />

                                {/* Segment fill */}
                                <motion.path
                                    d={`M 50 50 L ${x1} ${y1} A 48 48 0 0 1 ${x2} ${y2} Z`}
                                    fill={`url(#segGrad-${i})`}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.15 }}
                                    whileHover={{ opacity: 0.8 }}
                                />
                            </g>
                        )
                    })}
                </svg>

                {/* Labels positioned inside the wheel segments */}
                {segments.map((seg, i) => {
                    const angle = (i * (360 / segments.length) + (360 / segments.length) / 2) - 90
                    const rad = angle * (Math.PI / 180)
                    const radius = 28 // Optimally positioned within segments
                    const x = 50 + radius * Math.cos(rad)
                    const y = 50 + radius * Math.sin(rad)

                    return (
                        <motion.div
                            key={seg.name}
                            className="absolute text-sm font-bold text-[#5E5574] text-center"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: 'translate(-50%, -50%)',
                                textShadow: '0 1px 2px rgba(255,255,255,0.8)'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                        >
                            {seg.name}
                        </motion.div>
                    )
                })}
            </div>

            <motion.p
                className="mt-6 text-sm text-[#8C84A8] italic font-medium"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
            >
                A stable wheel turns smoothly.
            </motion.p>
        </div>
    )
}

export const MedicineTimeline = () => {
    const steps = [
        { year: 'Years 5-8', title: 'Foundations', desc: 'Curiosity, Habits, Reading', icon: '🌱' },
        { year: 'Years 9-10', title: 'Exploration', desc: 'Work Experience, Broad Subjects', icon: '🔍' },
        { year: 'Year 11', title: 'Focus', desc: 'Preliminary Content, Early UCAT Prep', icon: '🎯' },
        { year: 'Year 12', title: 'Execution', desc: 'HSC/VCE, UCAT, Interviews', icon: '🚀' },
    ]

    return (
        <div className="relative w-full max-w-2xl mx-auto my-16 pl-8 md:pl-0">
            {/* Timeline line with gradient */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E6E0F5] via-[#8C84A8] to-[#E6E0F5] shadow-sm" />

            {steps.map((step, i) => (
                <motion.div
                    key={i}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 mb-16 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                >
                    {/* Enhanced Dot with pulse animation */}
                    <motion.div
                        className="absolute left-[-2px] md:left-1/2 md:-translate-x-1/2 z-10"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                    >
                        <div className="relative">
                            {/* Pulse rings */}
                            <motion.div
                                className="absolute inset-0 w-4 h-4 rounded-full bg-[#8C84A8]/30"
                                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            />
                            <div className="relative w-4 h-4 rounded-full bg-gradient-to-br from-[#8C84A8] to-[#5E5574] ring-4 ring-white shadow-lg" />
                        </div>
                    </motion.div>

                    {/* Content Card with enhanced styling */}
                    <motion.div
                        className={`ml-8 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-16 text-left' : 'md:pr-16 md:text-right'}`}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                        <div className="bg-gradient-to-br from-white to-[#FAF9FC] p-6 rounded-2xl border-2 border-[#E6E0F5] shadow-lg hover:shadow-xl hover:border-[#8C84A8] transition-all duration-300">
                            <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'flex-row' : 'md:flex-row-reverse'}`}>
                                <span className="text-2xl">{step.icon}</span>
                                <span className="text-xs font-bold text-[#8C84A8] uppercase tracking-[0.15em]">{step.year}</span>
                            </div>
                            <h4 className="text-xl font-julius text-[#3F3A52] font-bold mb-2">{step.title}</h4>
                            <p className="text-sm text-[#6B647F] leading-relaxed">{step.desc}</p>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}
