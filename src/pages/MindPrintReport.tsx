import {
    Brain, TrendingUp,
    ArrowRight, Info, ShieldCheck, Download,
    Share2, ExternalLink, Lightbulb, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { MindPrintProfile } from '../types/mindprint';

interface MindPrintReportProps {
    profile?: MindPrintProfile;
}

// Custom SVG Radar Component
const ResponsiveRadar = ({ data }: { data: { subject: string, A: number }[] }) => {
    const centerX = 150;
    const centerY = 150;
    const radius = 100;

    const points = data.map((d, i) => {
        const angle = (i * 2 * Math.PI) / data.length - Math.PI / 2;
        const x = centerX + (d.A / 100) * radius * Math.cos(angle);
        const y = centerY + (d.A / 100) * radius * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 300 300" className="w-full h-full max-w-[400px] drop-shadow-xl">
            {/* Background regular polygons */}
            {[25, 50, 75, 100].map(r => {
                const gridPoints = data.map((_, i) => {
                    const angle = (i * 2 * Math.PI) / data.length - Math.PI / 2;
                    return `${centerX + (r / 100) * radius * Math.cos(angle)},${centerY + (r / 100) * radius * Math.sin(angle)}`;
                }).join(' ');
                return <polygon key={r} points={gridPoints} fill="none" stroke="#D9CFF2" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />;
            })}

            {/* Axis lines */}
            {data.map((_, i) => {
                const angle = (i * 2 * Math.PI) / data.length - Math.PI / 2;
                return (
                    <line
                        key={i}
                        x1={centerX} y1={centerY}
                        x2={centerX + radius * Math.cos(angle)}
                        y2={centerY + radius * Math.sin(angle)}
                        stroke="#D9CFF2" strokeWidth="1" opacity="0.2"
                    />
                );
            })}

            {/* Labels */}
            {data.map((d, i) => {
                const angle = (i * 2 * Math.PI) / data.length - Math.PI / 2;
                const lx = centerX + (radius + 35) * Math.cos(angle);
                const ly = centerY + (radius + 25) * Math.sin(angle);
                return (
                    <text
                        key={i}
                        x={lx} y={ly}
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="700"
                        fill="#5E5574"
                        opacity="0.5"
                        className="uppercase tracking-tighter"
                    >
                        {d.subject}
                    </text>
                );
            })}

            <defs>
                <radialGradient id="reportRadarGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                </radialGradient>
            </defs>

            {/* Data Polygon */}
            <polygon
                points={points}
                fill="url(#reportRadarGradient)"
                stroke="#6B5B95"
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="radar-polygon"
                style={{
                    filter: 'drop-shadow(0 4px 8px rgba(107, 91, 149, 0.2))'
                }}
            />

            {/* Data Points */}
            {data.map((d, i) => {
                const angle = (i * 2 * Math.PI) / data.length - Math.PI / 2;
                const px = centerX + (d.A / 100) * radius * Math.cos(angle);
                const py = centerY + (d.A / 100) * radius * Math.sin(angle);
                return <circle key={i} cx={px} cy={py} r="3.5" fill={d.A >= 75 ? "#10B981" : d.A >= 25 ? "#F59E0B" : "#FB7185"} stroke="white" strokeWidth="1.5" />;
            })}
        </svg>
    );
};

export default function MindPrintReport({ profile: propProfile }: MindPrintReportProps) {
    const { user } = useAuth();

    // Fallback logic for profile
    const profile = propProfile || (user as any)?.mindPrintProfile;

    if (!profile) {
        return (
            <div className="glass-card p-20 text-center max-w-2xl mx-auto my-12">
                <Brain size={64} className="text-purple-200 mx-auto mb-6" />
                <h2 className="text-2xl font-light text-[#5E5574]">No Calibration Data</h2>
                <p className="text-[#5E5574]/60 mt-4">
                    Your cognitive blueprint is waiting for more assessment data to generate a complete report.
                </p>
            </div>
        );
    }

    // Mapping logic to handle different profile structures
    const isMockFormat = !!profile.cognitiveScores;

    const radarData = isMockFormat ? [
        { subject: 'Working Memory', A: profile.cognitiveScores.conceptVsProcedural },
        { subject: 'Visual Reasoning', A: profile.cognitiveScores.visualVsVerbal },
        { subject: 'Processing Speed', A: profile.cognitiveScores.speedVsDepth },
        { subject: 'Strategic Logic', A: profile.cognitiveScores.structureTolerance },
        { subject: 'Attention', A: profile.cognitiveScores.errorSensitivity }
    ] : (profile.dimensions || []).slice(0, 5).map((dim: any) => ({
        subject: dim.name,
        A: dim.percentile
    }));

    const archetype = isMockFormat ? {
        name: profile.type,
        description: profile.description,
        category: profile.category || 'Strategic'
    } : {
        name: profile.archetype.name,
        description: profile.archetype.description,
        category: 'Adaptive'
    };

    return (
        <div className="mindprint-report animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 space-y-10">
            {/* Report Header */}
            <div className="glass-card p-10 bg-gradient-to-br from-[#6B5B95] to-[#4A445C] text-white flex flex-col md:flex-row gap-10 items-center overflow-hidden relative border-none shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-[0.07] pointer-events-none">
                    <Brain size={400} />
                </div>

                <div className="flex-shrink-0 text-center relative z-10">
                    <div className="w-36 h-36 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/20 mx-auto mb-6 shadow-inner">
                        <Brain size={70} className="text-white" />
                    </div>
                    <div className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block mb-2 backdrop-blur-md">
                        Cognitive Model
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">{archetype.name}</h1>
                </div>

                <div className="flex-grow space-y-4 relative z-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-white/50">
                        <ShieldCheck size={14} className="text-emerald-400" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Confidential Cognitive Intelligence Report</span>
                    </div>
                    <h2 className="text-4xl font-light leading-tight">
                        The <span className="font-bold">MindPrint</span> Blueprint
                    </h2>
                    <p className="text-lg text-white/80 font-light leading-relaxed max-w-xl italic">
                        "{archetype.description}"
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="px-6 py-2.5 bg-white text-purple-900 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-white/90 active:scale-95 flex items-center gap-2 shadow-lg">
                            <Download size={14} /> Export Blueprint
                        </button>
                        <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2 backdrop-blur-md border border-white/10">
                            <Share2 size={14} /> Share with Mentor
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Cognitive Architecture Chart */}
                <div className="glass-card p-10 flex flex-col items-center bg-white/40">
                    <div className="w-full mb-8">
                        <div className="section-header">Performance Metrics</div>
                        <h3 className="text-2xl font-light text-[#5E5574]">Cognitive Distribution</h3>
                    </div>

                    <div className="w-full flex justify-center items-center py-6">
                        <ResponsiveRadar data={radarData} />
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 mt-8">
                        <div className="p-5 rounded-[2rem] bg-purple-50/50 border border-purple-100 flex flex-col justify-center">
                            <div className="text-[10px] font-bold text-[#5E5574]/50 uppercase tracking-widest mb-1">Fluid Intelligence</div>
                            <div className="text-2xl font-bold text-[#5E5574]">82nd <span className="text-xs font-normal opacity-40">percentile</span></div>
                        </div>
                        <div className="p-5 rounded-[2rem] bg-indigo-50/50 border border-indigo-100 flex flex-col justify-center">
                            <div className="text-[10px] font-bold text-[#5E5574]/50 uppercase tracking-widest mb-1">Efficiency Factor</div>
                            <div className="text-2xl font-bold text-[#5E5574]">74th <span className="text-xs font-normal opacity-40">percentile</span></div>
                        </div>
                    </div>
                </div>

                {/* Adaptive Strategy Card */}
                <div className="space-y-10">
                    <section className="glass-card p-10 bg-white/40">
                        <div className="mb-6">
                            <div className="section-header">Capabilities</div>
                            <h3 className="text-2xl font-light text-[#5E5574] flex items-center gap-3">
                                <TrendingUp size={24} className="text-emerald-500" />
                                Primary Strengths
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                            {(profile.strengths || []).map((strength: string, i: number) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <div className="h-6 w-6 mt-1 flex-shrink-0 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform">
                                        <ChevronRight size={12} className="text-emerald-600" />
                                    </div>
                                    <p className="text-sm text-[#5E5574] font-medium leading-tight group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{strength}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="glass-card p-10 bg-emerald-50/20 border-emerald-100/50">
                        <div className="mb-6">
                            <div className="section-header !text-emerald-600">Optimization</div>
                            <h3 className="text-2xl font-light text-emerald-800 flex items-center gap-3">
                                <Lightbulb size={24} className="text-amber-500" />
                                Levers for Growth
                            </h3>
                        </div>
                        <p className="text-sm text-[#5E5574]/80 leading-relaxed mb-8 border-l-2 border-emerald-200 pl-6 italic font-medium">
                            The biggest performance gains come from anchoring new concepts into existing mental models.
                        </p>
                        <div className="space-y-4">
                            {(profile.recommendations || []).map((rec: string, i: number) => (
                                <div key={i} className="flex items-center gap-4 text-sm font-bold text-[#5E5574] bg-white/50 p-3 rounded-xl border border-white/50 shadow-sm transition-all hover:translate-x-1">
                                    <ArrowRight size={14} className="text-emerald-500" />
                                    {rec}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* In-Depth Breakdown Sections */}
            <div className="grid grid-cols-1 gap-10">
                <section className="glass-card p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                        <Info size={400} />
                    </div>

                    <div className="mb-12">
                        <div className="section-header">Detailed Analysis</div>
                        <h3 className="text-3xl font-light text-[#5E5574] flex items-center gap-4">
                            Deep Contextual Understanding
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                        <div>
                            <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                Cognitive Friction
                            </h4>
                            <div className="space-y-6">
                                {(profile.frictionPoints || []).map((point: string, i: number) => (
                                    <div key={i} className="text-sm text-[#5E5574]/80 font-medium leading-relaxed flex items-start gap-4 p-4 bg-rose-50/20 rounded-2xl border border-rose-100/30">
                                        <span className="text-rose-300 font-bold">0{i + 1}</span>
                                        {point}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                Success Sequence
                            </h4>
                            <p className="text-lg text-[#5E5574] font-light leading-relaxed italic mb-8">
                                "{profile.revisionStrategy?.bestSequence || 'Synthesize broad frameworks before mechanical drills.'}"
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {(profile.revisionStrategy?.recommendedTools || []).map((tool: string, i: number) => (
                                    <span key={i} className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-100 uppercase tracking-widest shadow-sm">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Long-Term Trajectory
                            </h4>
                            <p className="text-sm text-[#5E5574]/80 font-medium leading-relaxed bg-emerald-50/20 p-6 rounded-3xl border border-emerald-100/30">
                                {profile.growthView?.compoundingEffect || 'Building an interconnected web of understanding that increases learning speed exponentially.'}
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Call to Action */}
            <div className="pt-12 flex justify-center">
                <button className="btn btn-primary px-12 py-5 shadow-2xl hover:scale-105 transition-all text-xs tracking-widest uppercase">
                    Schedule Expert Consultation <ExternalLink size={16} className="ml-2" />
                </button>
            </div>
        </div>
    );
}

