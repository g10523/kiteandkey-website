import React, { useState, useEffect } from 'react';
import { mindprintApiService } from '../../services/mindprintApiService';
import { DigitSpan } from './stimuli/DigitSpan';
import { Loader2, Timer, CheckCircle2 } from 'lucide-react';
import type { TestItem } from '../../types/mindprint';

interface WorkingMemoryAssessmentProps {
    studentId: string;
    onComplete: (results: any) => void;
    onCancel?: () => void;
}

export const WorkingMemoryAssessment: React.FC<WorkingMemoryAssessmentProps> = ({
    studentId,
    onComplete,
    onCancel
}) => {
    const [loading, setLoading] = useState(true);
    const [assessmentId, setAssessmentId] = useState('');
    const [currentTrialIndex, setCurrentTrialIndex] = useState(0);
    const [trials, setTrials] = useState<TestItem[]>([]);
    const [responses, setResponses] = useState<any[]>([]);
    const [behavioralNotes, setBehavioralNotes] = useState('');
    const [startTime] = useState(Date.now());
    const [error, setError] = useState<string | null>(null);

    // Initialize assessment
    useEffect(() => {
        const init = async () => {
            try {
                setLoading(true);
                setError(null);

                const { assessmentId: id, battery } = await mindprintApiService.startAssessment(
                    studentId,
                    'working_memory',
                    'standard'
                );

                setAssessmentId(id);
                setTrials(battery.items);
                setLoading(false);
            } catch (err: any) {
                console.error('Failed to start assessment:', err);
                setError(err.response?.data?.message || 'Failed to initialize assessment');
                setLoading(false);
            }
        };

        init();
    }, [studentId]);

    const handleTrialComplete = async (response: number[], rt: number) => {
        const trial = trials[currentTrialIndex];

        try {
            // Submit response to backend
            await mindprintApiService.submitResponse(
                assessmentId,
                trial.id,
                response,
                rt
            );

            // Store locally
            const newResponse = {
                trialId: trial.id,
                itemId: trial.id,
                span: trial.span,
                type: trial.type,
                response,
                expectedResponse: trial.correctResponse,
                correct: JSON.stringify(response) === JSON.stringify(trial.correctResponse),
                responseTime: rt,
                timestamp: Date.now()
            };

            setResponses(prev => [...prev, newResponse]);

            // Move to next trial or complete
            if (currentTrialIndex < trials.length - 1) {
                // Brief pause between trials
                setTimeout(() => {
                    setCurrentTrialIndex(prev => prev + 1);
                }, 800);
            } else {
                // Assessment complete - calculate results
                await completeAssessment();
            }
        } catch (err: any) {
            console.error('Failed to submit response:', err);
            // Continue anyway for now (offline capability)
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

    // Loading state
    if (loading && trials.length === 0) {
        return (
            <div className="glassmorphism rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 animate-spin text-[#5E5574] mb-4" />
                <p className="text-[#5E5574]/70">Preparing your assessment...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="glassmorphism rounded-3xl p-8 text-center">
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

    // Completing state
    if (loading && trials.length > 0) {
        return (
            <div className="glassmorphism rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                <CheckCircle2 className="w-16 h-16 text-[#10B981] mb-4" />
                <h3 className="text-2xl font-light text-[#5E5574] mb-2">Assessment Complete!</h3>
                <p className="text-[#5E5574]/70 mb-4">Calculating your results...</p>
                <Loader2 className="w-8 h-8 animate-spin text-[#5E5574]" />
            </div>
        );
    }

    const currentTrial = trials[currentTrialIndex];
    const progress = ((currentTrialIndex + 1) / trials.length) * 100;
    const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000);
    const elapsedSeconds = Math.floor(((Date.now() - startTime) % 60000) / 1000);

    return (
        <div className="glassmorphism rounded-3xl p-8 max-w-3xl mx-auto">
            {/* Header with progress */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-light text-[#5E5574]">Working Memory</h2>
                        <p className="text-sm text-[#5E5574]/60">
                            {currentTrial?.type === 'digit_span_forward' ? 'Forward Recall' : 'Backward Recall'}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Timer */}
                        <div className="flex items-center gap-2 text-[#5E5574]/70">
                            <Timer className="w-4 h-4" />
                            <span className="text-sm font-mono">
                                {elapsedMinutes}:{elapsedSeconds.toString().padStart(2, '0')}
                            </span>
                        </div>

                        {/* Trial counter */}
                        <div className="text-sm text-[#5E5574]/60">
                            Trial {currentTrialIndex + 1} of {trials.length}
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[#D9CFF2]/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#5E5574] to-[#10B981] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Test content */}
            <div className="bg-white/30 rounded-2xl p-6 mb-6 min-h-[400px]">
                {currentTrial && (
                    <DigitSpan
                        mode={currentTrial.type === 'digit_span_forward' ? 'forward' : 'backward'}
                        sequence={currentTrial.sequence || []}
                        onComplete={handleTrialComplete}
                        onCancel={onCancel || (() => { })}
                    />
                )}
            </div>

            {/* Behavioral notes (collapsible for tutors) */}
            <details className="text-sm text-[#5E5574]/60 border-t border-[#5E5574]/10 pt-4">
                <summary className="cursor-pointer hover:text-[#5E5574] mb-2 font-medium">
                    📝 Session Notes (Optional)
                </summary>
                <textarea
                    value={behavioralNotes}
                    onChange={(e) => setBehavioralNotes(e.target.value)}
                    placeholder="Note any observations: distractions, strategies used, engagement level, etc."
                    className="w-full p-3 rounded-lg border border-[#D9CFF2] bg-white/50 text-[#5E5574] text-sm focus:border-[#5E5574] focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20 transition-all"
                    rows={3}
                />
            </details>

            {/* Debug info (development only) */}
            {import.meta.env.DEV && (
                <div className="mt-4 p-3 bg-[#5E5574]/5 rounded-lg text-xs text-[#5E5574]/50 font-mono">
                    <div>Assessment ID: {assessmentId}</div>
                    <div>Responses: {responses.length}</div>
                    <div>
                        Correct: {responses.filter(r => r.correct).length} / {responses.length}
                    </div>
                </div>
            )}
        </div>
    );
};
