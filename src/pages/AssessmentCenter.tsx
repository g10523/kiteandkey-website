import {
    Zap, Brain, Grid, Box, MessageSquare, Target, Eye, TrendingUp,
    Clock, Play
} from 'lucide-react';
import type { PageType } from '../types';

interface AssessmentCenterProps {
    onNavigate: (page: PageType, subjectId?: string, lessonId?: string, dimensionId?: string) => void;
}

const dimensions = [
    {
        id: 'working_memory',
        name: 'Working Memory',
        description: 'Mental workspace to hold and process information.',
        icon: Brain,
        color: '#10B981',
        duration: '8 min',
        page: 'assessment-wm' as PageType
    },
    {
        id: 'processing_speed',
        name: 'Processing Speed',
        description: 'Efficiency of automatic mental operations.',
        icon: Zap,
        color: '#F59E0B',
        duration: '5 min',
        page: 'assessment-wm' as PageType // Using universal orchestrator later
    },
    {
        id: 'pattern_recognition',
        name: 'Pattern Recognition',
        description: 'Identifying logical relationships in visual data.',
        icon: Grid,
        color: '#8B5CF6',
        duration: '12 min',
        page: 'assessment-wm' as PageType
    },
    {
        id: 'spatial_reasoning',
        name: 'Spatial Reasoning',
        description: 'Mental rotation and 3D visualization skills.',
        icon: Box,
        color: '#06B6D4',
        duration: '10 min',
        page: 'assessment-wm' as PageType
    },
    {
        id: 'verbal_reasoning',
        name: 'Verbal Reasoning',
        description: 'Language comprehension and verbal logic.',
        icon: MessageSquare,
        color: '#EF4444',
        duration: '10 min',
        page: 'assessment-wm' as PageType
    },
    {
        id: 'executive_function',
        name: 'Executive Function',
        description: 'Inhibition, task switching, and planning.',
        icon: Target,
        color: '#EC4899',
        duration: '12 min',
        page: 'assessment-wm' as PageType
    },
    {
        id: 'focus_attention',
        name: 'Focus & Attention',
        description: 'Sustained concentration and vigilance.',
        icon: Eye,
        color: '#14B8A6',
        duration: '8 min',
        page: 'assessment-wm' as PageType
    },
    {
        id: 'cognitive_endurance',
        name: 'Cognitive Endurance',
        description: 'Mental stamina and resistance to fatigue.',
        icon: TrendingUp,
        color: '#6366F1',
        duration: '15 min',
        page: 'assessment-wm' as PageType
    }
];

export default function AssessmentCenter({ onNavigate }: AssessmentCenterProps) {
    return (
        <div className="assessment-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="page-header mb-12">
                <h1 className="page-title text-4xl font-light text-[#5E5574]">Assessment Center</h1>
                <p className="page-subtitle text-[#5E5574]/60 max-w-2xl mt-2">
                    Measure your cognitive strengths across 8 key dimensions. Your results will personalize
                    your learning experience and unlock targeted interventions.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dimensions.map((dim) => (
                    <div
                        key={dim.id}
                        className="glassmorphism group relative overflow-hidden rounded-3xl p-8 transition-all hover:translate-y-[-4px] hover:shadow-2xl"
                        style={{ border: `1px solid ${dim.color}20` }}
                    >
                        {/* Background Glow */}
                        <div
                            className="absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl transition-opacity opacity-20 group-hover:opacity-40"
                            style={{ backgroundColor: dim.color }}
                        />

                        <div className="relative z-10">
                            <div
                                className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                                style={{ backgroundColor: `${dim.color}15`, color: dim.color }}
                            >
                                <dim.icon size={28} />
                            </div>

                            <h3 className="mb-2 text-xl font-medium text-[#5E5574]">{dim.name}</h3>
                            <p className="mb-6 text-sm leading-relaxed text-[#5E5574]/60">
                                {dim.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-xs font-medium text-[#5E5574]/40">
                                    <Clock size={14} />
                                    {dim.duration}
                                </span>

                                <button
                                    onClick={() => onNavigate(dim.page, undefined, undefined, dim.id)}
                                    className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95"
                                    style={{ backgroundColor: dim.color }}
                                >
                                    Start
                                    <Play size={14} fill="white" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Stats / Legend */}
            <div className="mt-12 glassmorphism rounded-3xl p-8 bg-gradient-to-r from-[#5E5574]/05 to-transparent border border-[#5E5574]/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h4 className="text-lg font-medium text-[#5E5574] mb-2">Why assess?</h4>
                        <p className="text-sm text-[#5E5574]/60">
                            Current kite & key profiles show that personalized learning paths based on these
                            dimensions improve retention by up to 40%.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-light text-[#5E5574]">1.2k</div>
                            <div className="text-[10px] uppercase tracking-wider text-[#5E5574]/40">Tests Taken</div>
                        </div>
                        <div className="h-10 w-[1px] bg-[#5E5574]/10" />
                        <div className="text-center">
                            <div className="text-2xl font-light text-[#5E5574]">8</div>
                            <div className="text-[10px] uppercase tracking-wider text-[#5E5574]/40">Dimensions</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
