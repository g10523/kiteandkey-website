'use client';

import { Brain, TrendingUp, Lightbulb, Target, BookOpen, Zap, ChevronRight, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MindPrintPage() {
    // Mock MindPrint data - will be replaced with real API data
    const mindPrintData = {
        archetype: "Visual Synthesizer",
        profileCompleteness: 85,
        lastAssessed: "December 15, 2025",
        cognitiveScores: {
            workingMemory: 78,
            processingSpeed: 65,
            verbalReasoning: 82,
            abstractReasoning: 91,
            attention: 74,
        },
        learningModalities: {
            visual: 85,
            auditory: 40,
            kinesthetic: 60,
        },
        strengths: [
            "Pattern recognition and spatial reasoning",
            "Abstract problem-solving",
            "Visual information processing",
            "Long-term memory retention",
        ],
        weaknesses: [
            "Processing speed under time pressure",
            "Auditory information retention",
            "Multi-step verbal instructions",
        ],
        strategies: [
            "Use visual aids and diagrams for complex concepts",
            "Break down multi-step problems into visual flowcharts",
            "Allow 10-15% extra time for processing",
            "Provide written summaries of verbal instructions",
            "Leverage color-coding for organization",
        ],
        frictionPoints: [
            "Long verbal lectures without visual support",
            "Timed tests with complex multi-step problems",
            "Rapid-fire question sessions",
        ],
    };

    const getCognitiveColor = (score: number) => {
        if (score >= 80) return "from-[#10B981] to-[#14B8A6]";
        if (score >= 60) return "from-[#F59E0B] to-[#FF6B35]";
        return "from-[#EF4444] to-[#FF6B35]";
    };

    const getCognitiveLabel = (score: number) => {
        if (score >= 80) return "Strong";
        if (score >= 60) return "Moderate";
        return "Developing";
    };

    const getLabelColor = (score: number) => {
        if (score >= 80) return "bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981]";
        if (score >= 60) return "bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]";
        return "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]";
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                    <Link href="/dashboard/student" className="text-sm text-[#64748B] hover:text-[#14B8A6] mb-2 inline-flex items-center gap-1 transition-colors">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-white font-serif mt-2">Your MindPrint™ Profile</h1>
                    <p className="text-[#94A3B8] mt-2 text-lg">
                        A personalized cognitive learning profile designed just for you
                    </p>
                </div>
                <div className="dark-card p-5 min-w-[220px]">
                    <div className="text-sm text-[#64748B] mb-1">Last Updated</div>
                    <div className="text-lg font-bold text-white">{mindPrintData.lastAssessed}</div>
                    <button className="mt-3 w-full py-2.5 rounded-xl bg-[#14B8A6] text-white text-sm font-bold hover:bg-[#0F9B8E] transition-colors shadow-lg shadow-[#14B8A6]/20">
                        Retake Assessment
                    </button>
                </div>
            </div>

            {/* Learning Archetype Card */}
            <div className="dark-card-strong p-8 relative overflow-hidden border-l-4 border-[#14B8A6]">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Brain size={120} className="text-[#14B8A6]" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#00D9FF] flex items-center justify-center shadow-lg shadow-[#14B8A6]/30">
                            <Brain size={32} className="text-white" />
                        </div>
                        <div>
                            <div className="text-sm text-[#14B8A6] font-bold uppercase tracking-wide">Your Learning Archetype</div>
                            <div className="text-3xl font-bold text-white font-serif">{mindPrintData.archetype}</div>
                        </div>
                    </div>
                    <p className="text-[#94A3B8] max-w-3xl leading-relaxed">
                        As a <span className="font-bold text-[#14B8A6]">Visual Synthesizer</span>, you excel at processing and
                        connecting visual information. You naturally see patterns and relationships that others might miss.
                        Your lessons are optimized to leverage diagrams, charts, and spatial representations to maximize your learning potential.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#00D9FF] text-white font-bold hover:shadow-lg hover:shadow-[#14B8A6]/30 transition-all flex items-center gap-2">
                            <BookOpen size={18} />
                            View Optimized Lessons
                        </button>
                        <button className="px-6 py-3 rounded-xl bg-[#151925] border border-[#2A2F45] text-white font-bold hover:border-[#14B8A6]/30 transition-all flex items-center gap-2">
                            <Info size={18} />
                            Learn About Archetypes
                        </button>
                    </div>
                </div>
            </div>

            {/* Cognitive Scores */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 font-serif flex items-center gap-2">
                    <TrendingUp size={24} className="text-[#14B8A6]" />
                    Cognitive Abilities
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(mindPrintData.cognitiveScores).map(([key, value]) => {
                        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        return (
                            <div key={key} className="dark-card p-6 hover:border-[#14B8A6]/30 transition-all group">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-white">{label}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getLabelColor(value)}`}>
                                        {getCognitiveLabel(value)}
                                    </span>
                                </div>
                                <div className="mb-3">
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-4xl font-bold text-white">{value}</span>
                                        <span className="text-[#64748B] mb-1">/100</span>
                                    </div>
                                    <div className="w-full bg-[#0A0E27] rounded-full h-3 border border-[#2A2F45]">
                                        <div
                                            className={`bg-gradient-to-r ${getCognitiveColor(value)} h-3 rounded-full transition-all duration-700 shadow-lg`}
                                            style={{ width: `${value}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <p className="text-xs text-[#64748B] leading-relaxed">
                                    {key === 'workingMemory' && 'Ability to hold and manipulate information in mind'}
                                    {key === 'processingSpeed' && 'Speed of taking in and responding to information'}
                                    {key === 'verbalReasoning' && 'Understanding and reasoning with words and language'}
                                    {key === 'abstractReasoning' && 'Solving problems using logic and patterns'}
                                    {key === 'attention' && 'Ability to focus and sustain concentration'}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Learning Modalities */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 font-serif flex items-center gap-2">
                    <Zap size={24} className="text-[#14B8A6]" />
                    Learning Modalities
                </h2>
                <div className="dark-card p-8">
                    <p className="text-[#94A3B8] mb-6">
                        Understanding how you best absorb information helps us tailor your learning experience.
                    </p>
                    <div className="space-y-6">
                        {Object.entries(mindPrintData.learningModalities).map(([modality, score]) => (
                            <div key={modality}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${modality === 'visual' ? 'bg-[#8B5CF6]/10 border border-[#8B5CF6]/20' :
                                                modality === 'auditory' ? 'bg-[#00D9FF]/10 border border-[#00D9FF]/20' :
                                                    'bg-[#10B981]/10 border border-[#10B981]/20'
                                            }`}>
                                            {modality === 'visual' && '👁️'}
                                            {modality === 'auditory' && '👂'}
                                            {modality === 'kinesthetic' && '✋'}
                                        </div>
                                        <span className="font-bold text-white capitalize">{modality}</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">{score}%</span>
                                </div>
                                <div className="w-full bg-[#0A0E27] rounded-full h-4 border border-[#2A2F45]">
                                    <div
                                        className={`h-4 rounded-full transition-all duration-700 shadow-lg ${modality === 'visual' ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]' :
                                                modality === 'auditory' ? 'bg-gradient-to-r from-[#00D9FF] to-[#14B8A6]' :
                                                    'bg-gradient-to-r from-[#10B981] to-[#14B8A6]'
                                            }`}
                                        style={{ width: `${score}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <section className="dark-card p-6">
                    <h2 className="text-xl font-bold text-white mb-5 font-serif flex items-center gap-2">
                        <Target size={20} className="text-[#10B981]" />
                        Your Strengths
                    </h2>
                    <ul className="space-y-3">
                        {mindPrintData.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#151925] transition-colors">
                                <div className="w-6 h-6 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[#10B981] text-sm">✓</span>
                                </div>
                                <span className="text-[#94A3B8]">{strength}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Areas for Growth */}
                <section className="dark-card p-6">
                    <h2 className="text-xl font-bold text-white mb-5 font-serif flex items-center gap-2">
                        <TrendingUp size={20} className="text-[#FF6B35]" />
                        Areas for Growth
                    </h2>
                    <ul className="space-y-3">
                        {mindPrintData.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#151925] transition-colors">
                                <div className="w-6 h-6 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[#FF6B35] text-sm">→</span>
                                </div>
                                <span className="text-[#94A3B8]">{weakness}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Personalized Strategies */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 font-serif flex items-center gap-2">
                    <Lightbulb size={24} className="text-[#14B8A6]" />
                    Personalized Learning Strategies
                </h2>
                <div className="dark-card-strong p-8">
                    <p className="text-[#94A3B8] mb-6">
                        Based on your MindPrint profile, these strategies are specifically designed to optimize your learning experience:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {mindPrintData.strategies.map((strategy, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-[#151925] border border-[#2A2F45] hover:border-[#14B8A6]/30 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14B8A6] to-[#00D9FF] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#14B8A6]/20">
                                    <span className="text-white font-bold text-sm">{index + 1}</span>
                                </div>
                                <span className="text-[#94A3B8] leading-relaxed">{strategy}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Friction Points */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 font-serif">Potential Challenges</h2>
                <div className="dark-card p-6 border-l-4 border-[#FF6B35]">
                    <p className="text-[#94A3B8] mb-4">
                        Being aware of these situations helps you and your tutors create the best learning environment:
                    </p>
                    <ul className="space-y-3">
                        {mindPrintData.frictionPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[#FF6B35] text-sm">!</span>
                                </div>
                                <span className="text-[#94A3B8]">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA Section */}
            <div className="dark-card p-8 bg-gradient-to-br from-[#1E2139] to-[#151925] border-2 border-[#14B8A6]/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-serif">Ready to Apply Your Profile?</h3>
                        <p className="text-[#94A3B8]">
                            Explore lessons and resources tailored to your unique learning style.
                        </p>
                    </div>
                    <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#00D9FF] text-white font-bold hover:shadow-xl hover:shadow-[#14B8A6]/30 transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap">
                        Browse Optimized Lessons
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
