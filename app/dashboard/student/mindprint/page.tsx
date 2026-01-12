'use client';

import { Brain, TrendingUp, Lightbulb, Target, BookOpen, Zap, ChevronRight, Info } from "lucide-react";
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
        if (score >= 80) return "bg-green-500";
        if (score >= 60) return "bg-yellow-500";
        return "bg-orange-500";
    };

    const getCognitiveLabel = (score: number) => {
        if (score >= 80) return "Strong";
        if (score >= 60) return "Moderate";
        return "Developing";
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                    <Link href="/dashboard/student" className="text-sm text-[#8C84A8] hover:text-[#5E5574] mb-2 inline-flex items-center gap-1">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-[#3F3A52] font-serif mt-2">Your MindPrint™ Profile</h1>
                    <p className="text-[#6B647F] mt-2 text-lg">
                        A personalized cognitive learning profile designed just for you
                    </p>
                </div>
                <div className="kk-card p-4 min-w-[200px]">
                    <div className="text-sm text-[#8C84A8] mb-1">Last Updated</div>
                    <div className="text-lg font-bold text-[#3F3A52]">{mindPrintData.lastAssessed}</div>
                    <button className="mt-3 w-full py-2 rounded-lg bg-[#F7F5FB] text-sm font-bold text-[#5E5574] hover:bg-[#E6E0F2] transition-colors">
                        Retake Assessment
                    </button>
                </div>
            </div>

            {/* Learning Archetype Card */}
            <div className="kk-card-strong p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Brain size={120} className="text-[#D9CFF2]" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5E5574] to-[#8B7FA8] flex items-center justify-center">
                            <Brain size={32} className="text-white" />
                        </div>
                        <div>
                            <div className="text-sm text-[#8C84A8] font-bold uppercase tracking-wide">Your Learning Archetype</div>
                            <div className="text-3xl font-bold text-[#3F3A52] font-serif">{mindPrintData.archetype}</div>
                        </div>
                    </div>
                    <p className="text-[#6B647F] max-w-3xl leading-relaxed">
                        As a <span className="font-bold text-[#5E5574]">Visual Synthesizer</span>, you excel at processing and
                        connecting visual information. You naturally see patterns and relationships that others might miss.
                        Your lessons are optimized to leverage diagrams, charts, and spatial representations to maximize your learning potential.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <button className="px-6 py-3 rounded-xl bg-[#5E5574] text-white font-bold hover:bg-[#4F4865] transition-all hover:shadow-lg">
                            <BookOpen className="inline mr-2" size={18} />
                            View Optimized Lessons
                        </button>
                        <button className="px-6 py-3 rounded-xl bg-white border border-[#E6E0F2] text-[#5E5574] font-bold hover:bg-[#F7F5FB] transition-all">
                            <Info className="inline mr-2" size={18} />
                            Learn About Archetypes
                        </button>
                    </div>
                </div>
            </div>

            {/* Cognitive Scores */}
            <section>
                <h2 className="text-2xl font-bold text-[#3F3A52] mb-6 font-serif flex items-center gap-2">
                    <TrendingUp size={24} className="text-[#5E5574]" />
                    Cognitive Abilities
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(mindPrintData.cognitiveScores).map(([key, value]) => {
                        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        return (
                            <div key={key} className="kk-card p-6 hover:shadow-lg transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-[#3F3A52]">{label}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${value >= 80 ? 'bg-green-100 text-green-700' :
                                            value >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-orange-100 text-orange-700'
                                        }`}>
                                        {getCognitiveLabel(value)}
                                    </span>
                                </div>
                                <div className="mb-3">
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-4xl font-bold text-[#3F3A52]">{value}</span>
                                        <span className="text-[#8C84A8] mb-1">/100</span>
                                    </div>
                                    <div className="w-full bg-[#E6E0F2] rounded-full h-3">
                                        <div
                                            className={`${getCognitiveColor(value)} h-3 rounded-full transition-all duration-700`}
                                            style={{ width: `${value}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <p className="text-xs text-[#8C84A8] leading-relaxed">
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
                <h2 className="text-2xl font-bold text-[#3F3A52] mb-6 font-serif flex items-center gap-2">
                    <Zap size={24} className="text-[#5E5574]" />
                    Learning Modalities
                </h2>
                <div className="kk-card p-8">
                    <p className="text-[#6B647F] mb-6">
                        Understanding how you best absorb information helps us tailor your learning experience.
                    </p>
                    <div className="space-y-6">
                        {Object.entries(mindPrintData.learningModalities).map(([modality, score]) => (
                            <div key={modality}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${modality === 'visual' ? 'bg-purple-100' :
                                                modality === 'auditory' ? 'bg-blue-100' :
                                                    'bg-green-100'
                                            }`}>
                                            {modality === 'visual' && '👁️'}
                                            {modality === 'auditory' && '👂'}
                                            {modality === 'kinesthetic' && '✋'}
                                        </div>
                                        <span className="font-bold text-[#3F3A52] capitalize">{modality}</span>
                                    </div>
                                    <span className="text-2xl font-bold text-[#3F3A52]">{score}%</span>
                                </div>
                                <div className="w-full bg-[#E6E0F2] rounded-full h-4">
                                    <div
                                        className={`h-4 rounded-full transition-all duration-700 ${modality === 'visual' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                                                modality === 'auditory' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                                    'bg-gradient-to-r from-green-500 to-green-600'
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
                <section className="kk-card p-6">
                    <h2 className="text-xl font-bold text-[#3F3A52] mb-5 font-serif flex items-center gap-2">
                        <Target size={20} className="text-green-600" />
                        Your Strengths
                    </h2>
                    <ul className="space-y-3">
                        {mindPrintData.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F7F5FB] transition-colors">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-green-600 text-sm">✓</span>
                                </div>
                                <span className="text-[#3F3A52]">{strength}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Areas for Growth */}
                <section className="kk-card p-6">
                    <h2 className="text-xl font-bold text-[#3F3A52] mb-5 font-serif flex items-center gap-2">
                        <TrendingUp size={20} className="text-orange-600" />
                        Areas for Growth
                    </h2>
                    <ul className="space-y-3">
                        {mindPrintData.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F7F5FB] transition-colors">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-orange-600 text-sm">→</span>
                                </div>
                                <span className="text-[#3F3A52]">{weakness}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Personalized Strategies */}
            <section>
                <h2 className="text-2xl font-bold text-[#3F3A52] mb-6 font-serif flex items-center gap-2">
                    <Lightbulb size={24} className="text-[#5E5574]" />
                    Personalized Learning Strategies
                </h2>
                <div className="kk-card-strong p-8">
                    <p className="text-[#6B647F] mb-6">
                        Based on your MindPrint profile, these strategies are specifically designed to optimize your learning experience:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {mindPrintData.strategies.map((strategy, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/60 border border-[#E6E0F2] hover:shadow-md transition-all">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5E5574] to-[#8B7FA8] flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-sm">{index + 1}</span>
                                </div>
                                <span className="text-[#3F3A52] leading-relaxed">{strategy}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Friction Points */}
            <section>
                <h2 className="text-2xl font-bold text-[#3F3A52] mb-6 font-serif">Potential Challenges</h2>
                <div className="kk-card p-6 border-l-4 border-orange-500">
                    <p className="text-[#6B647F] mb-4">
                        Being aware of these situations helps you and your tutors create the best learning environment:
                    </p>
                    <ul className="space-y-3">
                        {mindPrintData.frictionPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-orange-600 text-sm">!</span>
                                </div>
                                <span className="text-[#3F3A52]">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA Section */}
            <div className="kk-card p-8 bg-gradient-to-br from-[#F7F5FB] to-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold text-[#3F3A52] mb-2 font-serif">Ready to Apply Your Profile?</h3>
                        <p className="text-[#6B647F]">
                            Explore lessons and resources tailored to your unique learning style.
                        </p>
                    </div>
                    <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] text-white font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap">
                        Browse Optimized Lessons
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
