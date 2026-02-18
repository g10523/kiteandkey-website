import { Brain, Star, TrendingUp, Sparkles, Target } from 'lucide-react';
import type { MindPrintProfile, CognitiveDimensionId } from '../../assessments/types';
import { cognitiveDimensions } from '../../assessments/cognitiveDimensions';

interface MindPrintSnapshotProps {
    profile: MindPrintProfile;
}

export default function MindPrintSnapshot({ profile }: MindPrintSnapshotProps) {
    const dimensions = profile.dimensions;

    // Radar Chart Calculations
    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    const angleStep = (Math.PI * 2) / 8;

    const points = dimensions.map((d, i) => {
        const r = (d.currentPercentile / 100) * radius;
        const x = centerX + r * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + r * Math.sin(i * angleStep - Math.PI / 2);
        return `${x},${y}`;
    }).join(' ');

    const gridPoints = [0.2, 0.4, 0.6, 0.8, 1.0].map(scale => {
        return dimensions.map((_, i) => {
            const r = scale * radius;
            const x = centerX + r * Math.cos(i * angleStep - Math.PI / 2);
            const y = centerY + r * Math.sin(i * angleStep - Math.PI / 2);
            return `${x},${y}`;
        }).join(' ');
    });

    const getDimensionLabel = (id: CognitiveDimensionId) => {
        return cognitiveDimensions.find(cd => cd.id === id)?.name || id;
    };

    return (
        <div className="mindprint-snapshot animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Radar Visualization */}
                <div className="lg:col-span-6 glass-card p-10 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent"></div>
                    </div>

                    <header className="text-center mb-8 relative z-10">
                        <div className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">Cognitive Signature</div>
                        <h3 className="text-2xl font-bold text-gray-800">Visual Radar</h3>
                    </header>

                    <svg width="300" height="300" className="relative z-10 drop-shadow-2xl">
                        {/* Web Grids */}
                        {gridPoints.map((gp, i) => (
                            <polygon key={i} points={gp} fill="none" stroke="rgba(167, 139, 250, 0.15)" strokeWidth="1" />
                        ))}

                        {/* Axis Lines */}
                        {dimensions.map((_, i) => {
                            const x2 = centerX + radius * Math.cos(i * angleStep - Math.PI / 2);
                            const y2 = centerY + radius * Math.sin(i * angleStep - Math.PI / 2);
                            return <line key={i} x1={centerX} y1={centerY} x2={x2} y2={y2} stroke="rgba(167, 139, 250, 0.1)" strokeWidth="1" />;
                        })}

                        {/* Data Area */}
                        <polygon
                            points={points}
                            fill="rgba(167, 139, 250, 0.2)"
                            stroke="rgba(167, 139, 250, 0.8)"
                            strokeWidth="2"
                            className="transition-all duration-1000"
                        />

                        {/* Data Points */}
                        {dimensions.map((d, i) => {
                            const r = (d.currentPercentile / 100) * radius;
                            const x = centerX + r * Math.cos(i * angleStep - Math.PI / 2);
                            const y = centerY + r * Math.sin(i * angleStep - Math.PI / 2);
                            return (
                                <circle key={i} cx={x} cy={y} r="4" fill="#a78bfa" className="hover:scale-150 transition-transform cursor-pointer" />
                            );
                        })}
                    </svg>

                    {/* Labels */}
                    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        {dimensions.slice(0, 4).map(d => (
                            <div key={d.dimensionId} className="text-center">
                                <div className="text-[9px] font-bold text-gray-400 uppercase truncate">{getDimensionLabel(d.dimensionId)}</div>
                                <div className="text-sm font-black text-gray-700">{d.currentPercentile}%</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actionable Profile Info */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-6 border-l-4 border-l-emerald-500">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase mb-3">
                                <Star size={14} /> Cognitive Strength
                            </div>
                            <div className="text-xl font-bold text-gray-800 mb-1">{getDimensionLabel(profile.strengths[0] as CognitiveDimensionId || 'working_memory')}</div>
                            <p className="text-xs text-gray-500">Exceptional capacity for information manipulation and pattern matching.</p>
                        </div>

                        <div className="glass-card p-6 border-l-4 border-l-purple-500">
                            <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase mb-3">
                                <TrendingUp size={14} /> Efficiency Index
                            </div>
                            <div className="text-3xl font-black text-gray-800">{profile.compositeScores.cognitiveEfficiency}%</div>
                            <p className="text-xs text-gray-500">A measure of mental tempo combined with working memory span.</p>
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <header className="flex justify-between items-center mb-6">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <Sparkles size={18} className="text-amber-400" /> Current Targets
                            </h4>
                            <div className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-400 uppercase">Q1 2026</div>
                        </header>

                        <div className="space-y-4">
                            {profile.developmentTargets.slice(0, 2).map((target, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 font-black">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-sm font-bold text-gray-700">{getDimensionLabel(target as CognitiveDimensionId)}</span>
                                            <span className="text-[10px] font-bold text-amber-600 uppercase">Growth Area</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-400 rounded-full w-[40%] group-hover:w-[45%] transition-all duration-1000" />
                                        </div>
                                    </div>
                                    <Target size={16} className="text-gray-200 group-hover:text-amber-400 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] p-8 text-white">
                        <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <Brain size={20} className="text-purple-400" /> Neural Translation
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Your brain prefers taking in information visually and looking for the "Scale of Logic" before diving into mechanics. This month, we are focusing on turning your fast processing into deep retention.
                        </p>
                        <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all border border-white/10">
                            View Full Growth Plan
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
        }
      `}</style>
        </div>
    );
}
