import React from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Play } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { AssignedIntervention, SessionLog } from '../../interventions/interventionEngine';


interface InterventionQualityProps {
    onStartSession?: (intervention: AssignedIntervention) => void;
}

export const InterventionQuality: React.FC<InterventionQualityProps> = ({ onStartSession }) => {
    const { interventions } = useData();
    // Use interventions from context (which are persisted and include logs)
    const activeInterventions = interventions;

    const metrics = {
        totalActive: activeInterventions.length,
        criticalCount: activeInterventions.filter(i => i.priority === 'critical').length,
        avgSessionsCompleted: activeInterventions.length > 0
            ? (activeInterventions.reduce((acc, curr) => acc + (curr.sessionLogs?.length || 0), 0) / activeInterventions.length).toFixed(1)
            : 0,
        avgFidelity: activeInterventions.length > 0
            ? Math.round(activeInterventions.reduce((acc, i) => {
                const logs = i.sessionLogs || [];
                if (logs.length === 0) return acc;
                const iFidelity = logs.reduce((sum: number, l: SessionLog) => {
                    const stepScore = (l.fidelity.protocolStepsCompleted?.length || 0) / (i.implementation.sessionStructure.length || 1);
                    return sum + stepScore;
                }, 0) / logs.length;
                return acc + iFidelity;
            }, 0) / activeInterventions.length * 100)
            : 0
    };

    return (
        <div className="intervention-quality space-y-8 animate-fadeIn">
            <header className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <Target className="text-purple-600" /> Intervention Effectiveness
                </h2>
                <p className="text-gray-500">Monitoring impact of cognitive protocols on student outcomes.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Active Interventions"
                    value={metrics.totalActive}
                    subtitle="Students currently on protocols"
                    icon={<Target size={20} className="text-purple-500" />}
                    trend="stable"
                />

                <MetricCard
                    title="Fidelity Score"
                    value={`${metrics.avgFidelity}%`}
                    subtitle="Protocol adherence"
                    icon={<CheckCircle size={20} className="text-emerald-500" />}
                    trend="up"
                />

                <MetricCard
                    title="Critical Priority"
                    value={metrics.criticalCount}
                    subtitle="Interventions for <25th percentile"
                    icon={<AlertTriangle size={20} className="text-rose-500" />}
                    isWarning={metrics.criticalCount > 5}
                />
            </div>

            {/* Alert Banner */}
            {metrics.criticalCount > 0 && (
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start gap-3">
                    <div className="mt-1 bg-rose-100 p-2 rounded-full text-rose-600">
                        <AlertTriangle size={16} />
                    </div>
                    <div>
                        <h4 className="font-bold text-rose-800 text-sm">Attention Required</h4>
                        <p className="text-xs text-rose-600 mt-1">
                            {metrics.criticalCount} students are currently flagged for critical working memory support. Ensure tutors are logging session data.
                        </p>
                    </div>
                    <button className="ml-auto text-xs font-bold text-rose-700 bg-white border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-50">
                        View List
                    </button>
                </div>
            )}

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Intervention Protocol</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Active Students</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Sessions Logged</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {activeInterventions.length > 0 ? (
                            activeInterventions.map((intervention) => (
                                <tr key={intervention.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-700 text-sm">{intervention.title}</div>
                                        <div className="text-xs text-gray-400">{intervention.targetDimension}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-600 font-medium text-sm">
                                        <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold ${intervention.priority === 'critical' ? 'bg-rose-100 text-rose-700' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            {intervention.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-600 font-medium text-sm">
                                        {intervention.sessionLogs?.length || 0}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {onStartSession && (
                                            <button
                                                onClick={() => onStartSession(intervention)}
                                                className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-700 transition-all flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100"
                                            >
                                                <Play size={12} fill="currentColor" /> Start Session
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-400 text-sm">
                                    No active interventions found. Run an assessment to generate protocols.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }
      `}</style>
        </div>
    );
};

interface MetricCardProps {
    title: string;
    value: number | string;
    subtitle: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
    isWarning?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon, trend, isWarning }) => (
    <div className={`glass-card p-6 border-l-4 ${isWarning ? 'border-l-rose-500' : 'border-l-purple-500'}`}>
        <div className="flex justify-between items-start mb-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title}</div>
            {icon}
        </div>
        <div className="text-3xl font-black text-gray-800 mb-1">{value}</div>
        <div className="flex items-center gap-2">
            {trend === 'up' && <TrendingUp size={12} className="text-emerald-500" />}
            {trend === 'down' && <TrendingUp size={12} className="text-rose-500 rotate-180" />}
            <div className="text-xs font-medium text-gray-500">{subtitle}</div>
        </div>
    </div>
);
