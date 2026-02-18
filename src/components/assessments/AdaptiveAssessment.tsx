import { useState, useEffect } from 'react';
import { mindprintApiService } from '../../services/mindprintApiService';
import { Loader2, Timer, CheckCircle2, ChevronRight, Brain } from 'lucide-react';
import type { TestItem, CognitiveDimensionId } from '../../types/mindprint';
import { DigitSpan } from './stimuli/DigitSpan';
import { SymbolSearch } from './stimuli/SymbolSearch';
import { MatrixReasoning } from './stimuli/MatrixReasoning';
import { NBack } from './stimuli/NBack';
import { Stroop } from './stimuli/Stroop';

interface AdaptiveAssessmentProps {
    studentId: string;
    dimension: CognitiveDimensionId;
    onComplete: (results: any) => void;
    onCancel?: () => void;
}

export const AdaptiveAssessment: React.FC<AdaptiveAssessmentProps> = ({
    studentId,
    dimension,
    onComplete,
    onCancel
}) => {
    const [loading, setLoading] = useState(true);
    const [assessmentId, setAssessmentId] = useState('');
    const [currentTrialIndex, setCurrentTrialIndex] = useState(0);
    const [trials, setTrials] = useState<TestItem[]>([]);
    const [behavioralNotes, setBehavioralNotes] = useState('');
    const [startTime] = useState(Date.now());
    const [error, setError] = useState<string | null>(null);
    const [isInstructions, setIsInstructions] = useState(true);
    const [instructions, setInstructions] = useState('');

    // Initialize assessment
    useEffect(() => {
        const init = async () => {
            try {
                setLoading(true);
                setError(null);

                const { assessmentId: id, battery } = await mindprintApiService.startAssessment(
                    studentId,
                    dimension,
                    'standard'
                );

                setAssessmentId(id);
                setTrials(battery.items);
                setInstructions(battery.instructions);
                setLoading(false);
            } catch (err: any) {
                console.error('Failed to start assessment:', err);
                setError(err.response?.data?.message || 'Failed to initialize assessment');
                setLoading(false);
            }
        };

        init();
    }, [studentId, dimension]);

    const handleTrialComplete = async (response: any, rt: number) => {
        const trial = trials[currentTrialIndex];

        try {
            await mindprintApiService.submitResponse(
                assessmentId,
                trial.id,
                response,
                rt
            );

            /* Removed local response tracking as it's handled via API */

            if (currentTrialIndex < trials.length - 1) {
                setTimeout(() => {
                    setCurrentTrialIndex(prev => prev + 1);
                }, 800);
            } else {
                await completeAssessment();
            }
        } catch (err: any) {
            console.error('Failed to submit response:', err);
            if (currentTrialIndex < trials.length - 1) {
                setCurrentTrialIndex(prev => prev + 1);
            } else {
                await completeAssessment();
            }
        }
    };

    const completeAssessment = async () => {
        try {
            setLoading(true);
            const results = await mindprintApiService.completeAssessment(
                assessmentId,
                behavioralNotes
            );
            onComplete(results);
        } catch (err: any) {
            console.error('Failed to complete assessment:', err);
            setError('Failed to save results. Please try again.');
            setLoading(false);
        }
    };

    if (loading && trials.length === 0) {
        return (
            <div className="glassmorphism rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 animate-spin text-[#5E5574] mb-4" />
                <p className="text-[#5E5574]/70">Preparing your assessment...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glassmorphism rounded-3xl p-8 text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-[#FB7185]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-xl text-[#5E5574] mb-2">Assessment Error</h3>
                <p className="text-[#5E5574]/70 mb-6">{error}</p>
                <button
                    onClick={onCancel}
                    className="px-6 py-2 bg-[#5E5574] text-white rounded-full hover:bg-[#4A445C] transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (isInstructions) {
        return (
            <div className="glassmorphism rounded-3xl p-12 max-w-2xl mx-auto text-center border border-[#5E5574]/10">
                <div className="w-20 h-20 bg-[#5E5574]/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Brain className="w-10 h-10 text-[#5E5574]" />
                </div>
                <h2 className="text-3xl font-light text-[#5E5574] mb-4">Instructions</h2>
                <div className="bg-white/40 rounded-2xl p-6 text-left mb-8 text-[#5E5574]/80 leading-relaxed">
                    {instructions || "No specific instructions provided. Follow the on-screen prompts."}
                </div>
                <button
                    onClick={() => setIsInstructions(false)}
                    className="group px-8 py-3 bg-[#5E5574] text-white rounded-full hover:bg-[#4A445C] transition-all flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl active:scale-95"
                >
                    Start Assessment
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        );
    }

    if (loading && trials.length > 0) {
        return (
            <div className="glassmorphism rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                <CheckCircle2 className="w-16 h-16 text-[#10B981] mb-4" />
                <h3 className="text-2xl font-light text-[#5E5574] mb-2">Assessment Complete!</h3>
                <p className="text-[#5E5574]/70 mb-4">Finalizing your profile...</p>
                <Loader2 className="w-8 h-8 animate-spin text-[#5E5574]" />
            </div>
        );
    }

    const currentTrial = trials[currentTrialIndex];
    const progress = ((currentTrialIndex + 1) / trials.length) * 100;
    const elapsedMs = Date.now() - startTime;
    const elapsedMinutes = Math.floor(elapsedMs / 60000);
    const elapsedSeconds = Math.floor((elapsedMs % 60000) / 1000);

    const renderStimulus = () => {
        if (!currentTrial) return null;

        switch (currentTrial.type) {
            case 'digit_span_forward':
            case 'digit_span_backward':
                return (
                    <DigitSpan
                        mode={currentTrial.type === 'digit_span_forward' ? 'forward' : 'backward'}
                        sequence={currentTrial.sequence || []}
                        onComplete={handleTrialComplete}
                        onCancel={onCancel || (() => { })}
                    />
                );
            case 'symbol_search':
                return (
                    <SymbolSearch
                        targets={currentTrial.targets || []}
                        searchArray={currentTrial.searchArray || []}
                        onComplete={handleTrialComplete}
                    />
                );
            case 'matrix_reasoning':
                return (
                    <MatrixReasoning
                        matrixConfig={currentTrial.matrix_config}
                        onComplete={handleTrialComplete}
                    />
                );
            case 'n_back':
                return (
                    <NBack
                        n={currentTrial.n || 2}
                        stimulus={currentTrial.stimulus}
                        onComplete={handleTrialComplete}
                    />
                );
            case 'stroop':
                return (
                    <Stroop
                        text={currentTrial.text || ''}
                        color={currentTrial.color || ''}
                        choices={currentTrial.choices || []}
                        onComplete={handleTrialComplete}
                    />
                );
            // Future test types will be added here
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full text-[#5E5574]/60 italic p-12 text-center">
                        <p className="mb-4">Stimulus type "{currentTrial.type}" is not yet implemented in the frontend.</p>
                        <button
                            onClick={() => handleTrialComplete(null, 1000)}
                            className="text-sm underline"
                        >
                            Skip this item (Debug)
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="glassmorphism rounded-3xl p-8 max-w-3xl mx-auto border border-[#5E5574]/10">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-light text-[#5E5574]">{dimension.replace('_', ' ').toUpperCase()}</h2>
                        <p className="text-sm text-[#5E5574]/60">
                            {currentTrial?.type?.replace(/_/g, ' ')}
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[#5E5574]/70 bg-white/30 px-3 py-1 rounded-full">
                            <Timer className="w-4 h-4" />
                            <span className="text-sm font-mono leading-none">
                                {elapsedMinutes}:{elapsedSeconds.toString().padStart(2, '0')}
                            </span>
                        </div>

                        <div className="text-sm text-[#5E5574]/60 bg-white/30 px-3 py-1 rounded-full">
                            Trial {currentTrialIndex + 1} of {trials.length}
                        </div>
                    </div>
                </div>

                <div className="w-full h-1.5 bg-[#D9CFF2]/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#5E5574] to-[#10B981] rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="bg-white/40 rounded-2xl p-8 mb-8 min-h-[450px] flex flex-col items-center justify-center border border-white/40 shadow-inner">
                {renderStimulus()}
            </div>

            <details className="text-sm text-[#5E5574]/60 border-t border-[#5E5574]/10 pt-4">
                <summary className="cursor-pointer hover:text-[#5E5574] mb-2 font-medium flex items-center gap-2">
                    <span className="text-lg opacity-60">📝</span> Session Observations
                </summary>
                <textarea
                    value={behavioralNotes}
                    onChange={(e) => setBehavioralNotes(e.target.value)}
                    placeholder="Note any observations like: distractions, fatigue, self-correction, or strategies used..."
                    className="w-full p-4 rounded-xl border border-[#D9CFF2] bg-white/60 text-[#5E5574] text-sm focus:border-[#5E5574] focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 transition-all shadow-sm"
                    rows={4}
                />
            </details>
        </div>
    );
};
