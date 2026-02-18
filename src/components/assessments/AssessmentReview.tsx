import { CheckCircle, ArrowRight, Printer, Share2, Brain, Activity, Clock } from 'lucide-react';
import type { StudentAssessment, AssessmentTest } from '../../assessments/types';

interface AssessmentReviewProps {
    assessment: StudentAssessment;
    test: AssessmentTest;
    onClose: () => void;
}

export default function AssessmentReview({ assessment, test, onClose }: AssessmentReviewProps) {
    const getPercentileColor = (p: number) => {
        if (p >= 75) return 'text-emerald-500';
        if (p <= 25) return 'text-rose-500';
        return 'text-amber-500';
    };

    return (
        <div className="assessment-review max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="glass-card overflow-hidden">
                <div className="bg-purple-600 p-10 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Brain size={120} /></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-4">
                            Assessment Complete
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight mb-2">Protocol Finalized</h2>
                        <p className="text-purple-100 font-medium">Results successfully integrated into student profile.</p>
                    </div>
                </div>

                <div className="p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Psychometric Summary */}
                        <div className="md:col-span-1 space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Core Metrics</label>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                        <div className="text-xs font-bold text-gray-400 mb-1">PERCENTILE</div>
                                        <div className={`text-4xl font-black ${getPercentileColor(assessment.calculatedResults.percentile)}`}>
                                            {assessment.calculatedResults.percentile}th
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                        <div className="text-xs font-bold text-gray-400 mb-1">STANDARD SCORE</div>
                                        <div className="text-4xl font-black text-gray-800">
                                            {assessment.calculatedResults.standardScore}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                                <div className="text-[10px] font-bold text-purple-600 mb-2 uppercase">Reliability Check</div>
                                <div className="flex items-center gap-2 font-bold text-gray-700">
                                    <CheckCircle size={16} className="text-emerald-500" /> High Confidence
                                </div>
                            </div>
                        </div>

                        {/* Qualitative Report */}
                        <div className="md:col-span-2 space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase mb-2">
                                        <Activity size={14} /> Dimension
                                    </div>
                                    <div className="font-bold text-gray-800">{test.dimensionId.split('_').join(' ').toUpperCase()}</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase mb-2">
                                        <Clock size={14} /> Timestamp
                                    </div>
                                    <div className="font-bold text-gray-800">{new Date(assessment.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-8">
                                <div className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">Behavioral Insights</div>
                                <p className="text-sm text-gray-600 leading-relaxed italic bg-gray-50 p-6 rounded-2xl border-l-4 border-purple-400">
                                    "{assessment.behavioralObservations || 'No observations recorded.'}"
                                </p>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Next Actions</div>
                                <div className="space-y-2">
                                    {['Schedule follow-up diagnostic in 12 weeks', 'Increase spatial scaffolding in Science lessons'].map((rec, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                            <ArrowRight size={14} className="text-purple-500" />
                                            {rec}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-10 border-t border-gray-100 flex gap-4 bg-gray-50/50">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 bg-gray-900 text-white rounded-[24px] font-bold hover:bg-black transition-all shadow-lg"
                    >
                        Return to Dashboard
                    </button>
                    <button className="p-4 bg-white border border-gray-200 text-gray-600 rounded-[24px] hover:bg-gray-50 transition-all">
                        <Printer size={20} />
                    </button>
                    <button className="p-4 bg-white border border-gray-200 text-gray-600 rounded-[24px] hover:bg-gray-50 transition-all">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
        }
      `}</style>
        </div>
    );
}
