import React, { useState } from 'react';
import { Target, Zap, Play, Brain, X, Info, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import type { AssignedIntervention, StudentReflection } from '../../interventions/interventionEngine';

const StudentSessionReflection: React.FC<{
    intervention: AssignedIntervention;
    onSubmit: (reflection: StudentReflection) => void;
    onClose: () => void;
}> = ({ onSubmit, onClose }) => {
    const [mentalLoad, setMentalLoad] = useState(2);
    const [strategyUse, setStrategyUse] = useState('prompted');
    const [confidenceShift, setConfidenceShift] = useState(3);

    return (
        <div className="fixed inset-0 bg-[#5E5574]/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="glass-card w-full max-w-lg overflow-hidden shadow-2xl border-white/50 animate-in zoom-in-95 duration-300">
                <header className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white relative">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                            <Brain size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Session Log</span>
                            <h3 className="text-2xl font-bold tracking-tight">Practice Reflection</h3>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-10">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-bold text-[#5E5574] uppercase tracking-wider">Cognitive Load</label>
                            <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-bold">Intensity Scale</span>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {['Flow', 'Focus', 'Challenge', 'Limit'].map((label, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMentalLoad(i + 1)}
                                    className={`py-4 rounded-2xl border-2 font-bold text-[11px] transition-all uppercase tracking-tight ${mentalLoad === i + 1
                                        ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md translate-y-[-2px]'
                                        : 'border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-200'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#5E5574] mb-4 uppercase tracking-wider">Strategy Integration</label>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { val: 'independent', label: 'Autonomous', sub: 'I used it without prompting' },
                                { val: 'conscious', label: 'Conscious', sub: 'I had to actively apply it' },
                                { val: 'prompted', label: 'Prompted', sub: 'I needed the mentor\'s guide' },
                                { val: 'no', label: 'Unused', sub: 'I focused on mechanics only' }
                            ].map((opt) => (
                                <button
                                    key={opt.val}
                                    onClick={() => setStrategyUse(opt.val)}
                                    className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all flex items-center justify-between ${strategyUse === opt.val
                                        ? 'border-indigo-500 bg-indigo-50 shadow-md translate-x-1'
                                        : 'border-gray-50 bg-gray-50/20 hover:border-gray-200'
                                        }`}
                                >
                                    <div>
                                        <div className={`font-bold text-sm ${strategyUse === opt.val ? 'text-indigo-900' : 'text-gray-700'}`}>{opt.label}</div>
                                        <div className="text-[11px] text-gray-400 font-medium">{opt.sub}</div>
                                    </div>
                                    {strategyUse === opt.val && <Star size={16} className="text-indigo-500 fill-indigo-500" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-bold text-[#5E5574] uppercase tracking-wider">Confidence Shift</label>
                            <span className="font-bold text-purple-600 text-sm">+{confidenceShift * 20}%</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={confidenceShift}
                            onChange={(e) => setConfidenceShift(parseInt(e.target.value))}
                            className="w-full accent-purple-600 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                            <span>Static</span>
                            <span>Mastery</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-gray-50/50 flex gap-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors uppercase tracking-widest text-xs"
                    >
                        Dismiss
                    </button>
                    <button
                        onClick={() => onSubmit({
                            mentalLoad,
                            strategyUse,
                            confidenceShift,
                            timestamp: new Date()
                        })}
                        className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-extrabold shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
                    >
                        Sync Progress
                    </button>
                </div>
            </div>
        </div>
    );
}

const TrainingCard: React.FC<{
    intervention: AssignedIntervention;
    onLogSession: () => void;
}> = ({ intervention, onLogSession }) => {
    const [progress] = useState(
        intervention.progressLog ? Math.min((intervention.progressLog.length / 8) * 100, 100) : 0
    );

    const completedSessions = intervention.progressLog?.length || 0;
    const totalSessions = 8;

    return (
        <div className="glass-card p-8 group hover:translate-y-[-4px] transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-125 transition-transform duration-700">
                <Target size={150} />
            </div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-purple-100">
                            {intervention.targetDimension.split('_').join(' ')}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${intervention.priority === 'critical'
                            ? 'bg-rose-50 text-rose-600 border-rose-100'
                            : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                            {intervention.priority}
                        </span>
                    </div>
                    <h4 className="font-bold text-[#5E5574] text-xl leading-tight group-hover:text-purple-700 transition-colors">{intervention.title}</h4>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-200">
                    <Zap size={20} className={intervention.priority === 'critical' ? 'fill-rose-100/50' : ''} />
                </div>
            </div>

            <p className="text-sm text-[#5E5574]/70 mb-8 leading-relaxed font-medium line-clamp-2 h-10 relative z-10">
                {intervention.description}
            </p>

            <div className="space-y-3 mb-8 relative z-10">
                <div className="flex justify-between items-end text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    <span>Calibration</span>
                    <span className="text-purple-600">{completedSessions}/{totalSessions} Units</span>
                </div>
                <div className="h-3 w-full bg-[#D9CFF2]/20 rounded-full overflow-hidden p-[2px] border border-[#D9CFF2]/10">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="bg-gray-50/50 backdrop-blur-sm rounded-[2rem] p-6 mb-8 border border-white/50 relative z-10">
                <h5 className="text-[10px] font-bold text-[#5E5574]/50 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                    <Info size={12} className="text-purple-400" /> Focus Protocols
                </h5>
                <ul className="space-y-3">
                    {intervention.implementation.sessionStructure.slice(0, 2).map((step: string, i: number) => (
                        <li key={i} className="text-xs text-[#5E5574]/80 flex gap-3 font-medium">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                            <span className="line-clamp-2 leading-relaxed">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={onLogSession}
                className="w-full py-4 rounded-2xl bg-white border border-[#D9CFF2]/30 text-[#5E5574] font-bold text-xs uppercase tracking-widest hover:bg-[#5E5574] hover:text-white hover:shadow-xl hover:shadow-purple-200 hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center gap-2 relative z-10"
            >
                Start Training Sequence <Play size={14} className="fill-current" />
            </button>
        </div>
    );
};

export default function CognitiveGym() {
    const { user } = useAuth();
    const { getInterventions } = useData();
    const [selectedIntervention, setSelectedIntervention] = useState<AssignedIntervention | null>(null);

    if (!user) return null;

    const interventions = getInterventions(user.id);

    // Calculate Streak (Simulated)
    const streak = interventions.length > 0 ? 3 : 0;

    return (
        <div className="cognitive-gym animate-fadeIn space-y-12 mb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 text-purple-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-3 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
                        <Brain size={14} /> Neuro-Optimization Center
                    </div>
                    <h1 className="text-4xl font-light text-[#2D2838] leading-tight">Your <span className="font-bold">Growth Engine</span></h1>
                    <p className="text-[#5E5574]/60 mt-2 font-medium">Personalized neuro-plasticity protocols tuned to your MindPrint.</p>
                </div>
                <div className="glass-card pl-8 pr-12 py-5 flex items-center gap-6 border-none shadow-xl shadow-purple-100/50">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-[#5E5574]/40 uppercase tracking-[0.2em] mb-1">Consistency Streak</div>
                        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">{streak} Days</div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-200">
                        <Zap size={28} fill="white" />
                    </div>
                </div>
            </header>

            {interventions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {interventions.map(intervention => (
                        <TrainingCard
                            key={intervention.id}
                            intervention={intervention}
                            onLogSession={() => setSelectedIntervention(intervention)}
                        />
                    ))}
                </div>
            ) : (
                <div className="glass-card p-20 text-center border-2 border-dashed border-[#D9CFF2]/40 bg-white/20">
                    <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-purple-100">
                        <Target size={40} className="text-purple-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#5E5574] mb-4 tracking-tight">Protocols Pending Calibration</h3>
                    <p className="text-[#5E5574]/60 max-w-sm mx-auto mb-10 font-medium leading-relaxed">
                        Our intelligence engine is analyzing your latest MindPrint data. Your daily training sequence will be ready shortly.
                    </p>
                    <button className="btn btn-primary px-8 py-4 uppercase tracking-[0.2em] text-xs shadow-2xl">
                        Calibration Status: 65%
                    </button>
                </div>
            )}

            <div className="glass-card p-10 relative overflow-hidden bg-white/40">
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                    <Brain size={300} />
                </div>

                <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100">
                        <Target size={20} className="text-purple-600" />
                    </div>
                    <h3 className="section-header !mb-0 font-bold tracking-widest">Cognitive Roadmap</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                    {['Working Memory', 'Processing Speed', 'Executive Function', 'Fluid Reasoning'].map((skill, i) => (
                        <div key={i} className={`p-6 rounded-3xl border transition-all duration-300 ${i === 0 ? 'bg-purple-50/50 border-purple-200 shadow-lg shadow-purple-100' : 'bg-gray-50/30 border-gray-100 opacity-60 grayscale-[50%]'}`}>
                            <div className="text-[9px] font-bold uppercase mb-3 text-purple-400 tracking-[0.2em]">Dimension 0{i + 1}</div>
                            <div className="font-bold text-[#5E5574] text-sm tracking-tight mb-4">{skill}</div>
                            {i === 0 ? (
                                <div className="text-[10px] text-purple-600 font-extrabold flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                    ACTIVE PROTOCOL
                                </div>
                            ) : (
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider italic">Unlocked at Lvl 5</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {selectedIntervention && (
                <StudentSessionReflection
                    intervention={selectedIntervention}
                    onClose={() => setSelectedIntervention(null)}
                    onSubmit={(reflection) => {
                        console.log("Logged student reflection:", reflection);
                        setSelectedIntervention(null);
                    }}
                />
            )}
        </div>
    );
};
