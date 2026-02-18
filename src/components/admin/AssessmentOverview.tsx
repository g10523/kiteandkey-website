import { useState, useEffect } from 'react';
import { History, Filter, Search, MoreHorizontal, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { assessmentService } from '../../assessments/assessmentService';
import type { StudentAssessment } from '../../assessments/types';

export default function AssessmentOverview() {
    const [assessments, setAssessments] = useState<StudentAssessment[]>([]);

    useEffect(() => {
        const load = async () => {
            const all = await assessmentService.getRecentAssessments(20);
            setAssessments(all);
        };
        load();
    }, []);

    const getStatusIcon = (percentile: number) => {
        if (percentile >= 75) return <CheckCircle size={14} className="text-emerald-500" />;
        if (percentile <= 25) return <AlertTriangle size={14} className="text-rose-500" />;
        return <Clock size={14} className="text-amber-500" />;
    };

    return (
        <div className="admin-assessment-overview space-y-8 animate-fadeIn">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">Assessment Audit</h2>
                    <p className="text-gray-500 mt-1">Global log of diagnostic protocols and psychometric scoring.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search assessments..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-purple-200 transition-all w-64"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500">
                        <Filter size={20} />
                    </button>
                </div>
            </header>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Protocol</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tutor</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Result</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {assessments.length > 0 ? assessments.map((asmt) => (
                                <tr key={asmt.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                                                {asmt.testId.split('-')[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-800">{asmt.testId}</div>
                                                <div className="text-[10px] text-gray-400 font-medium">{asmt.dimensionId.split('_').join(' ').toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm font-semibold text-gray-700">{asmt.studentId}</td>
                                    <td className="px-6 py-5 text-sm font-medium text-gray-500">{asmt.administeredBy}</td>
                                    <td className="px-6 py-5 text-sm font-medium text-gray-500">{new Date(asmt.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(asmt.calculatedResults.percentile)}
                                            <span className="text-sm font-black text-gray-800">{asmt.calculatedResults.percentile}th</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 text-gray-400 hover:text-gray-800 transition-colors">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <History size={40} className="mx-auto text-gray-200 mb-4" />
                                        <p className="text-sm font-medium text-gray-400">No assessment logs found in the archive.</p>
                                        <p className="text-xs text-gray-300 mt-1">Administered tests will appear here chronologically.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
