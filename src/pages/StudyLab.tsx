import { useState, useEffect } from 'react';
import {
    Zap, Brain, Target, Sparkles, ChevronRight,
    CheckCircle2, Clock, Play, GraduationCap,
    Lock, Star, Activity, ArrowRight
} from 'lucide-react';
import { mindprintApiService } from '../services/mindprintApiService';
import { useAuth } from '../context/AuthContext';
import type { AssignedIntervention } from '../types/mindprint';
import { formatDimensionName } from '../types/mindprint';

export default function StudyLab() {
    const { user } = useAuth();
    const [interventions, setInterventions] = useState<AssignedIntervention[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInterventions = async () => {
            if (user?.id) {
                try {
                    const data = await mindprintApiService.getInterventions(user.id);
                    setInterventions(data);
                } catch (error) {
                    console.error('Error fetching interventions:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchInterventions();
    }, [user?.id]);

    return (
        <div className="study-lab animate-in fade-in duration-700 pb-12">
            <header className="page-header mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 bg-[#5E5574] rounded-lg flex items-center justify-center">
                        <Star size={18} className="text-white fill-white" />
                    </div>
                    <span className="text-xs font-bold text-[#5E5574] uppercase tracking-widest">Cognitive Performance Center</span>
                </div>
                <h1 className="page-title text-4xl font-light text-[#5E5574]">Study Lab</h1>
                <p className="page-subtitle text-[#5E5574]/60 max-w-2xl mt-2">
                    Your personalized cognitive workouts and subject-specific learning adaptations.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Targeted Interventions */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-medium text-[#5E5574] flex items-center gap-2">
                                <Activity size={20} className="text-[#5E5574]/60" />
                                Growth Protocols
                                <span className="ml-2 px-2 py-0.5 bg-[#5E5574]/10 rounded-full text-[10px] font-bold text-[#5E5574]">
                                    {interventions.length} ACTIVE
                                </span>
                            </h2>
                            <button className="text-xs font-medium text-[#5E5574]/40 hover:text-[#5E5574] transition-colors">
                                View History
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-12 glassmorphism rounded-3xl border border-[#5E5574]/05">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5E5574] mb-4"></div>
                                <p className="text-[#5E5574]/40 text-sm">Calibrating your lab...</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {interventions.length > 0 ? (
                                    interventions.map((intervention) => (
                                        <div
                                            key={intervention.id}
                                            className="glassmorphism group p-6 rounded-[2rem] border border-[#5E5574]/05 flex flex-col md:flex-row gap-6 transition-all hover:shadow-xl hover:translate-y-[-2px] hover:border-[#5E5574]/10"
                                        >
                                            <div className="flex-shrink-0 flex items-center justify-center">
                                                <div className="h-20 w-20 relative">
                                                    {/* Circular Progress SVG */}
                                                    <svg className="w-full h-full transform -rotate-90">
                                                        <circle
                                                            cx="40" cy="40" r="36"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                            fill="transparent"
                                                            className="text-[#5E5574]/05"
                                                        />
                                                        <circle
                                                            cx="40" cy="40" r="36"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                            strokeDasharray={226}
                                                            strokeDashoffset={226 - (226 * intervention.sessionsCompleted) / intervention.sessionsTarget}
                                                            strokeLinecap="round"
                                                            fill="transparent"
                                                            className="text-[#5E5574]"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#5E5574]">
                                                        <span className="text-lg font-bold leading-none">{Math.round((intervention.sessionsCompleted / intervention.sessionsTarget) * 100)}%</span>
                                                        <span className="text-[8px] uppercase font-bold tracking-tighter opacity-40">Done</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-grow flex flex-col justify-center">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-0.5 bg-[#5E5574]/05 rounded-full text-[10px] font-bold text-[#5E5574]/60 uppercase tracking-widest">
                                                        {formatDimensionName(intervention.protocol.targetDimension)}
                                                    </span>
                                                    {intervention.protocol.priority === 'critical' && (
                                                        <span className="flex items-center gap-1 text-[10px] font-bold text-[#10B981]">
                                                            <Zap size={10} fill="#10B981" /> High Impact
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-medium text-[#5E5574] mb-1">{intervention.protocol.name}</h3>
                                                <p className="text-sm text-[#5E5574]/60 line-clamp-2 mb-3">
                                                    {intervention.protocol.description}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1 text-[11px] text-[#5E5574]/40 font-medium">
                                                        <CheckCircle2 size={12} />
                                                        {intervention.sessionsCompleted} of {intervention.sessionsTarget} Sessions
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[11px] text-[#5E5574]/40 font-medium">
                                                        <Clock size={12} />
                                                        15m / session
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0 flex items-center">
                                                <button className="h-12 w-12 bg-[#5E5574] text-white rounded-2xl flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 group-hover:bg-[#4A445C]">
                                                    <Play size={20} fill="white" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 glassmorphism rounded-3xl border border-dashed border-[#5E5574]/20 text-center">
                                        <div className="w-16 h-16 bg-[#5E5574]/05 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Brain size={32} className="text-[#5E5574]/20" />
                                        </div>
                                        <h3 className="text-[#5E5574] font-medium mb-1">No Protocols Assigned</h3>
                                        <p className="text-[#5E5574]/60 text-sm max-w-xs mx-auto">
                                            Complete a MindPrint assessment to get your personalized growth protocols.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                    {/* Secondary Section: Cognitive Tools */}
                    <section>
                        <h2 className="text-xl font-medium text-[#5E5574] flex items-center gap-2 mb-6">
                            <Sparkles size={20} className="text-[#5E5574]/60" />
                            Cognitive Tools
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="glassmorphism p-6 rounded-[2rem] border border-[#5E5574]/05 hover:border-[#5E5574]/10 transition-all cursor-pointer group">
                                <div className="h-12 w-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                    <Target size={24} />
                                </div>
                                <h3 className="font-medium text-[#5E5574] mb-1">Concept Sandbox</h3>
                                <p className="text-xs text-[#5E5574]/60 leading-relaxed mb-4">
                                    Break down complex topics into simpler, cognitive-aligned chunks.
                                </p>
                                <div className="flex items-center text-[10px] font-bold text-[#5E5574] uppercase tracking-widest gap-1 group-hover:gap-2 transition-all">
                                    Open Sandbox <ChevronRight size={14} />
                                </div>
                            </div>

                            <div className="glassmorphism p-6 rounded-[2rem] border border-[#5E5574]/05 bg-[#5E5574]/05 opacity-60 cursor-not-allowed">
                                <div className="h-12 w-12 bg-[#5E5574]/10 text-[#5E5574] rounded-xl flex items-center justify-center mb-4">
                                    <Lock size={20} />
                                </div>
                                <h3 className="font-medium text-[#5E5574] mb-1">Focus Flow</h3>
                                <p className="text-xs text-[#5E5574]/60 leading-relaxed">
                                    Adaptive background audio and visual cues synced to your attention cycles.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar: MindPrint Adaptations */}
                <div className="space-y-8">
                    <section className="glassmorphism p-8 rounded-[2.5rem] bg-[#5E5574] text-white overflow-hidden relative border-none">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <GraduationCap size={160} />
                        </div>

                        <div className="relative z-10">
                            <div className="bg-white/10 p-2 rounded-lg inline-flex mb-6">
                                <Brain size={24} />
                            </div>
                            <h2 className="text-2xl font-light mb-2">Today's Adaptations</h2>
                            <p className="text-xs text-white/60 leading-relaxed mb-8">
                                How we're automatically tailoring your lessons based on your <strong>Developing Profile</strong>.
                            </p>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                        Working Memory Constraint
                                    </h4>
                                    <p className="text-xs leading-relaxed">
                                        Active chunking enabled: New concepts will be presented in groups of no more than <strong>3 sub-steps</strong>.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                        Processing Optimisation
                                    </h4>
                                    <p className="text-xs leading-relaxed">
                                        Visual scaffolding added: Diagrams will appear <strong>before</strong> text descriptions to reduce cognitive load.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                        Validation Pattern
                                    </h4>
                                    <p className="text-xs leading-relaxed">
                                        Step-wise feedback: You'll receive verification after every solved sub-problem to prevent error accumulation.
                                    </p>
                                </div>
                            </div>

                            <button className="w-full mt-10 py-3 bg-white text-[#5E5574] rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-white/90 active:scale-95 shadow-xl">
                                Customize Strategy
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </section>

                    <section className="glassmorphism p-8 rounded-[2.5rem] border border-[#5E5574]/05">
                        <h3 className="text-lg font-medium text-[#5E5574] mb-4">Upcoming Benchmarks</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/40 border border-white/60">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
                                        <Zap size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-[#5E5574]">Efficiency Marker</div>
                                        <div className="text-[10px] text-[#5E5574]/40">In 3 days</div>
                                    </div>
                                </div>
                                <button className="p-1 text-[#5E5574]/20 hover:text-[#5E5574]">
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/40 border border-white/60">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center">
                                        <Brain size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-[#5E5574]">Memory Checkpoint</div>
                                        <div className="text-[10px] text-[#5E5574]/40">In 5 days</div>
                                    </div>
                                </div>
                                <button className="p-1 text-[#5E5574]/20 hover:text-[#5E5574]">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
