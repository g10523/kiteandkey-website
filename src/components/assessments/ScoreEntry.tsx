import { useState, useEffect } from 'react';
import { Save, AlertCircle, TrendingUp, Users, MessageSquare } from 'lucide-react';
import type { AssessmentTest } from '../../assessments/types';
import { scoringEngine } from '../../assessments/scoringEngine';

interface ScoreEntryProps {
    test: AssessmentTest;
    studentId: string;
    onSave: (data: any) => void;
}

export default function ScoreEntry({ test, studentId, onSave }: ScoreEntryProps) {
    const [rawScore, setRawScore] = useState<number>(0);
    const [observations, setObservations] = useState('');
    const [reportedState, setReportedState] = useState('Focused');
    const [percentilePreview, setPercentilePreview] = useState<number>(0);

    // Mock age for calculation (Joshua = 8)
    const studentAge = 8;

    useEffect(() => {
        const p = scoringEngine.calculatePercentile(rawScore, test.dimensionId, studentAge);
        setPercentilePreview(p);
    }, [rawScore, test.dimensionId, studentAge]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            studentId: studentId,
            rawTotal: rawScore,
            observations,
            environmental: {
                timeOfDay: new Date().toLocaleTimeString(),
                sessionNumber: 1,
                studentReportedState: reportedState
            },
            calculated: {
                percentile: percentilePreview,
                standardScore: scoringEngine.calculateStandardScore(percentilePreview),
                confidence: 90
            }
        });
    };

    const getPercentileColor = (p: number) => {
        if (p >= 75) return 'text-emerald-500 bg-emerald-50 border-emerald-100';
        if (p <= 25) return 'text-rose-500 bg-rose-50 border-rose-100';
        return 'text-amber-500 bg-amber-50 border-amber-100';
    };

    return (
        <div className="score-entry max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <header className="text-center">
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-4">
                    <Save size={14} /> Final Step: Data Entry
                </div>
                <h2 className="text-3xl font-semibold text-gray-800">Scoring & Observations</h2>
                <p className="text-gray-500 mt-2">Translate standardized performance into psychometric data.</p>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Scoring Wing */}
                <div className="glass-card p-8 space-y-8">
                    <div className="form-group">
                        <label className="block text-sm font-bold text-gray-700 mb-6 flex justify-between items-center">
                            <span>1. Total Raw Score</span>
                            <span className="text-[10px] text-gray-400 font-medium">Range: {test.scoringRubric.rawScoreRange[0]} - {test.scoringRubric.rawScoreRange[1]}</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                required
                                min={test.scoringRubric.rawScoreRange[0]}
                                max={test.scoringRubric.rawScoreRange[1]}
                                value={rawScore}
                                onChange={(e) => setRawScore(parseInt(e.target.value) || 0)}
                                className="w-full text-6xl font-light text-center py-6 bg-gray-50 rounded-3xl outline-none border-2 border-transparent focus:border-purple-200 transition-all text-gray-800"
                            />
                        </div>
                    </div>

                    <div className={`p-6 rounded-[28px] border-2 transition-all ${getPercentileColor(percentilePreview)}`}>
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2 font-bold text-xs uppercase opacity-70">
                                <TrendingUp size={14} /> Estimated Percentile
                            </div>
                            <div className="text-[10px] uppercase font-black tracking-widest opacity-60">Age-Normed: {studentAge}y</div>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-5xl font-bold tracking-tighter">{percentilePreview}</span>
                            <span className="text-lg font-bold mb-1 opacity-80">th</span>
                        </div>
                        <p className="mt-4 text-xs font-medium leading-relaxed">
                            Currently performing better than {percentilePreview}% of peers in the {test.dimensionId.split('_').join(' ')} dimension.
                        </p>
                    </div>
                </div>

                {/* Observations Wing */}
                <div className="space-y-6">
                    <div className="glass-card p-8">
                        <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <Users size={16} className="text-purple-400" /> 2. Qualitative Context
                        </label>
                        <div className="space-y-3">
                            <label className="block text-xs font-bold text-gray-400 uppercase">Student Reported State</label>
                            <select
                                value={reportedState}
                                onChange={(e) => setReportedState(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-100 bg-white text-sm outline-none focus:border-purple-300 transition-all font-medium text-gray-600"
                            >
                                <option>Focused</option>
                                <option>Tired / Low Energy</option>
                                <option>Anxious</option>
                                <option>Distracted</option>
                                <option>Highly Motivated</option>
                            </select>
                        </div>
                    </div>

                    <div className="glass-card p-8 flex-1">
                        <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <MessageSquare size={16} className="text-purple-400" /> 3. Behavioral Notes
                        </label>
                        <textarea
                            placeholder="Note any specific strategies, signs of frustration, or unique problem-solving approaches..."
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                            className="w-full h-40 p-4 rounded-2xl border border-gray-100 bg-white outline-none focus:border-purple-300 text-sm leading-relaxed transition-all resize-none text-gray-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-gray-900 text-white rounded-[28px] font-bold text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 group"
                    >
                        Save Results
                        <Save size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </form>

            <div className="flex gap-4 p-5 bg-blue-50/50 border border-blue-100 rounded-[32px]">
                <AlertCircle className="text-blue-500 shrink-0" size={20} />
                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                    Once saved, this data will immediately update the MindPrint profile and composite scores. Ensure the total raw score matches the sum of trial successes on your physical score sheet.
                </p>
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
