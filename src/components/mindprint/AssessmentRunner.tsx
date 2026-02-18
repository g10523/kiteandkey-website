import React, { useState, useEffect, useCallback } from 'react';
import { Brain, ChevronRight, Clock, ArrowLeft, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { CognitiveDimensionId, TestItem } from '../../types/mindprint';
import { formatDimensionName, getDimensionDescription, getTestDuration } from '../../types/mindprint';
import { mindprintApiService } from '../../services/mindprintApiService';
import { scoreAssessment } from '../../services/clientScoring';
import { saveAssessmentResult, type StoredAssessment } from '../../services/mindprintStore';
import { DigitSpan } from '../assessments/stimuli/DigitSpan';
import { SymbolSearch } from '../assessments/stimuli/SymbolSearch';
import { MatrixReasoning } from '../assessments/stimuli/MatrixReasoning';
import { NBack } from '../assessments/stimuli/NBack';
import { Stroop } from '../assessments/stimuli/Stroop';

interface AssessmentRunnerProps {
    studentId: string;
    dimension: CognitiveDimensionId;
    onComplete: (result: StoredAssessment) => void;
    onCancel: () => void;
}

type Phase = 'instructions' | 'running' | 'completing' | 'error';

interface TrialResponse {
    itemId: string;
    type: string;
    response: any;
    correct: boolean;
    responseTime: number;
    span?: number;
    difficulty?: number;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({
    studentId,
    dimension,
    onComplete,
    onCancel
}) => {
    const [phase, setPhase] = useState<Phase>('instructions');
    const [trials, setTrials] = useState<TestItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responses, setResponses] = useState<TrialResponse[]>([]);
    const [startTime, setStartTime] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [assessmentId, setAssessmentId] = useState('');

    // Load battery
    useEffect(() => {
        const loadBattery = async () => {
            try {
                const { assessmentId: id, battery } = await mindprintApiService.startAssessment(
                    studentId, dimension, 'standard'
                );
                setAssessmentId(id);
                setTrials(battery.items);
            } catch (err: any) {
                console.error('Failed to load battery:', err);
                setError('Failed to load assessment. Please try again.');
                setPhase('error');
            }
        };
        loadBattery();
    }, [studentId, dimension]);

    const handleBegin = useCallback(() => {
        setPhase('running');
        setStartTime(Date.now());
    }, []);

    const handleTrialComplete = useCallback(async (response: any, rt: number) => {
        const trial = trials[currentIndex];
        if (!trial) return;

        // Check correctness locally
        let correct = false;
        if (trial.correctResponse !== undefined) {
            correct = JSON.stringify(response) === JSON.stringify(trial.correctResponse);
        }

        const trialResponse: TrialResponse = {
            itemId: trial.id,
            type: trial.type,
            response,
            correct,
            responseTime: rt,
            span: trial.span,
            difficulty: trial.difficulty
        };

        const newResponses = [...responses, trialResponse];
        setResponses(newResponses);

        // Try submitting to backend (non-blocking)
        try {
            await mindprintApiService.submitResponse(assessmentId, trial.id, response, rt);
        } catch {
            // Offline — scoring handled client-side
        }

        // Next trial or complete
        if (currentIndex < trials.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 700);
        } else {
            // Complete!
            setPhase('completing');
            finishAssessment(newResponses);
        }
    }, [trials, currentIndex, responses, assessmentId]);

    const finishAssessment = async (allResponses: TrialResponse[]) => {
        try {
            // Score locally
            const result = scoreAssessment(dimension, allResponses, 15);
            // Save to localStorage
            saveAssessmentResult(studentId, result);

            // Try backend completion too
            try {
                await mindprintApiService.completeAssessment(assessmentId, '');
            } catch {
                // That's fine, we have local scoring
            }

            // Short delay for UX polish
            setTimeout(() => onComplete(result), 1500);
        } catch (err) {
            console.error('Scoring failed:', err);
            setError('Failed to calculate scores. Please try again.');
            setPhase('error');
        }
    };

    // ─── INSTRUCTIONS PHASE ───
    if (phase === 'instructions') {
        return (
            <div className="mp-glass" style={{
                maxWidth: 640, margin: '0 auto', padding: 'var(--spacing-3xl)',
                textAlign: 'center'
            }}>
                <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'rgba(94,85,116,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto var(--spacing-xl)'
                }}>
                    <Brain size={32} style={{ color: 'var(--mp-deep-lavender)' }} />
                </div>

                <h2 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
                    fontWeight: 300, color: 'var(--color-text-primary)',
                    marginBottom: 8
                }}>
                    {formatDimensionName(dimension)}
                </h2>

                <p style={{
                    fontSize: 14, color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-xl)', maxWidth: 440, margin: '0 auto var(--spacing-xl)'
                }}>
                    {getDimensionDescription(dimension)}
                </p>

                {/* Duration + item count */}
                <div style={{
                    display: 'flex', justifyContent: 'center', gap: 'var(--spacing-xl)',
                    marginBottom: 'var(--spacing-2xl)'
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '8px 16px',
                        background: 'var(--color-bg-tertiary)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 13, color: 'var(--color-text-secondary)'
                    }}>
                        <Clock size={14} />
                        ~{getTestDuration(dimension)} minutes
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '8px 16px',
                        background: 'var(--color-bg-tertiary)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 13, color: 'var(--color-text-secondary)'
                    }}>
                        {trials.length > 0 ? `${trials.length} items` : 'Loading...'}
                    </div>
                </div>

                {/* Instructions box */}
                {trials.length > 0 && (
                    <div style={{
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: 'var(--radius-xl)',
                        padding: 'var(--spacing-xl)',
                        textAlign: 'left',
                        marginBottom: 'var(--spacing-2xl)',
                        border: '1px solid rgba(94,85,116,0.06)',
                        fontSize: 14, color: 'var(--color-text-secondary)',
                        lineHeight: 1.7
                    }}>
                        {getInstructions(dimension)}
                    </div>
                )}

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button
                        onClick={onCancel}
                        style={{
                            padding: '12px 24px', background: 'transparent',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-full)',
                            color: 'var(--color-text-secondary)',
                            fontFamily: 'var(--font-primary)', fontSize: 13,
                            fontWeight: 500, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 6
                        }}
                    >
                        <ArrowLeft size={14} /> Back
                    </button>
                    <button
                        onClick={handleBegin}
                        disabled={trials.length === 0}
                        style={{
                            padding: '12px 32px',
                            background: trials.length > 0 ? 'var(--mp-deep-lavender)' : '#ccc',
                            color: '#fff', border: 'none',
                            borderRadius: 'var(--radius-full)',
                            fontFamily: 'var(--font-primary)', fontSize: 14,
                            fontWeight: 600, cursor: trials.length > 0 ? 'pointer' : 'not-allowed',
                            display: 'flex', alignItems: 'center', gap: 8,
                            boxShadow: '0 6px 20px rgba(94,85,116,0.2)'
                        }}
                    >
                        Start Assessment <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        );
    }

    // ─── COMPLETING PHASE ───
    if (phase === 'completing') {
        return (
            <div className="mp-glass" style={{
                maxWidth: 480, margin: '0 auto', padding: 'var(--spacing-3xl)',
                textAlign: 'center'
            }}>
                <CheckCircle2 size={56} style={{ color: 'var(--mp-emerald)', marginBottom: 'var(--spacing-lg)' }} />
                <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
                    fontWeight: 300, color: 'var(--color-text-primary)',
                    marginBottom: 8
                }}>
                    Assessment Complete!
                </h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-tertiary)' }}>
                    Calculating your {formatDimensionName(dimension)} score…
                </p>
                <Loader2 size={24} style={{
                    marginTop: 'var(--spacing-xl)', color: 'var(--mp-deep-lavender)',
                    animation: 'spin 1s linear infinite'
                }} />
            </div>
        );
    }

    // ─── ERROR PHASE ───
    if (phase === 'error') {
        return (
            <div className="mp-glass" style={{
                maxWidth: 480, margin: '0 auto', padding: 'var(--spacing-3xl)',
                textAlign: 'center'
            }}>
                <AlertTriangle size={56} style={{ color: '#F59E0B', marginBottom: 'var(--spacing-lg)' }} />
                <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
                    fontWeight: 500, color: 'var(--color-text-primary)',
                    marginBottom: 8
                }}>
                    Something went wrong
                </h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-lg)' }}>
                    {error}
                </p>
                <button
                    onClick={onCancel}
                    style={{
                        padding: '10px 24px', background: 'var(--mp-deep-lavender)',
                        color: '#fff', border: 'none', borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-primary)', fontSize: 13, fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Go Back
                </button>
            </div>
        );
    }

    // ─── RUNNING PHASE ───
    const currentTrial = trials[currentIndex];
    const progress = ((currentIndex + 1) / trials.length) * 100;
    const elapsedMs = Date.now() - startTime;
    const elapsedMin = Math.floor(elapsedMs / 60000);
    const elapsedSec = Math.floor((elapsedMs % 60000) / 1000);

    return (
        <div className="mp-glass" style={{
            maxWidth: 720, margin: '0 auto', padding: 'var(--spacing-xl)'
        }}>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                        <h3 style={{
                            fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
                            fontWeight: 400, color: 'var(--color-text-primary)', margin: 0
                        }}>
                            {formatDimensionName(dimension)}
                        </h3>
                        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                            {currentTrial?.type?.replace(/_/g, ' ')}
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '4px 12px', borderRadius: 'var(--radius-full)',
                            background: 'var(--color-bg-tertiary)',
                            fontSize: 12, fontFamily: 'monospace', color: 'var(--color-text-secondary)'
                        }}>
                            <Clock size={12} />
                            {elapsedMin}:{String(elapsedSec).padStart(2, '0')}
                        </div>
                        <div style={{
                            padding: '4px 12px', borderRadius: 'var(--radius-full)',
                            background: 'var(--color-bg-tertiary)',
                            fontSize: 12, color: 'var(--color-text-secondary)'
                        }}>
                            {currentIndex + 1} / {trials.length}
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div style={{
                    height: 3, width: '100%',
                    background: 'var(--color-bg-tertiary)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--mp-deep-lavender), var(--mp-emerald))',
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.6s ease'
                    }} />
                </div>
            </div>

            {/* Stimulus area */}
            <div style={{
                background: 'rgba(255,255,255,0.4)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-2xl)',
                minHeight: 400,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.4)'
            }}>
                {renderStimulus(currentTrial, handleTrialComplete, onCancel)}
            </div>
        </div>
    );
};

function renderStimulus(
    trial: TestItem | undefined,
    onComplete: (response: any, rt: number) => void,
    onCancel: () => void
) {
    if (!trial) return <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />;

    switch (trial.type) {
        case 'digit_span_forward':
        case 'digit_span_backward':
            return (
                <DigitSpan
                    mode={trial.type === 'digit_span_forward' ? 'forward' : 'backward'}
                    sequence={trial.sequence || []}
                    onComplete={onComplete}
                    onCancel={onCancel}
                />
            );
        case 'symbol_search':
            return (
                <SymbolSearch
                    targets={trial.targets || []}
                    searchArray={trial.searchArray || []}
                    onComplete={onComplete}
                />
            );
        case 'matrix_reasoning':
            return (
                <MatrixReasoning
                    matrixConfig={trial.matrix_config}
                    onComplete={onComplete}
                />
            );
        case 'n_back':
            return (
                <NBack
                    n={trial.n || 2}
                    stimulus={trial.stimulus}
                    onComplete={onComplete}
                />
            );
        case 'stroop':
            return (
                <Stroop
                    text={trial.text || ''}
                    color={trial.color || ''}
                    choices={trial.choices || []}
                    onComplete={onComplete}
                />
            );
        default:
            return (
                <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    <p>Stimulus "{trial.type}" not implemented</p>
                    <button
                        onClick={() => onComplete(null, 1000)}
                        style={{ fontSize: 12, textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none' }}
                    >
                        Skip
                    </button>
                </div>
            );
    }
}

function getInstructions(dim: CognitiveDimensionId): string {
    const map: Record<CognitiveDimensionId, string> = {
        working_memory: 'You will see a series of numbers appear one at a time. Memorize them, then enter them using the number pad. For "Forward Recall" enter them in the same order. For "Backward Recall" enter them in reverse order. The sequences get longer as you go.',
        processing_speed: 'You will see two target symbols on the left. Decide as quickly as possible whether either target appears in the group of symbols on the right. Speed and accuracy both count.',
        executive_function: 'You will see color words displayed in different ink colors. Your job is to name the COLOR of the ink, not the word itself. For example, if "BLUE" is written in red ink, choose "Red". Try to respond as fast as you can without making mistakes.',
        verbal_reasoning: 'You will be asked to identify relationships between words and concepts. Think about how words relate to each other and choose the best answer.',
        spatial_reasoning: 'You will see patterns and shapes that require mental rotation and spatial thinking. Identify how pieces fit together or what a shape would look like from a different angle.',
        pattern_recognition: 'You will see a grid of shapes with one piece missing. Study the pattern in the rows and columns, then select the option that completes the pattern.',
        focus_attention: 'You will see numbers appear one at a time. Press "MATCH" if the current number is the same as the one shown 2 steps earlier. Press "NO MATCH" otherwise. Stay focused — the sequence moves quickly.',
        cognitive_endurance: 'This assessment has multiple parts and tests your ability to maintain focus and accuracy over an extended period. Do your best throughout the entire test.'
    };
    return map[dim];
}
