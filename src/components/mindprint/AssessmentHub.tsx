import React from 'react';
import {
    Brain, Zap, Target, MessageSquare, Box,
    Grid3X3, Eye, TrendingUp, CheckCircle2, Play, Clock
} from 'lucide-react';
import type { CognitiveDimensionId } from '../../types/mindprint';
import type { StoredAssessment } from '../../services/mindprintStore';
import { formatDimensionName, getTestDuration, getDimensionDescription } from '../../types/mindprint';

interface AssessmentHubProps {
    assessedDimensions: Map<CognitiveDimensionId, StoredAssessment>;
    pendingDimensions: CognitiveDimensionId[];
    onStartAssessment: (dimension: CognitiveDimensionId) => void;
}

const DIMENSION_ICONS: Record<CognitiveDimensionId, React.ReactNode> = {
    working_memory: <Brain size={20} />,
    processing_speed: <Zap size={20} />,
    executive_function: <Target size={20} />,
    verbal_reasoning: <MessageSquare size={20} />,
    spatial_reasoning: <Box size={20} />,
    pattern_recognition: <Grid3X3 size={20} />,
    focus_attention: <Eye size={20} />,
    cognitive_endurance: <TrendingUp size={20} />
};

const DIMENSION_COLORS: Record<CognitiveDimensionId, { accent: string; bg: string }> = {
    working_memory: { accent: '#10B981', bg: 'rgba(16,185,129,0.08)' },
    processing_speed: { accent: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
    executive_function: { accent: '#EC4899', bg: 'rgba(236,72,153,0.08)' },
    verbal_reasoning: { accent: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
    spatial_reasoning: { accent: '#06B6D4', bg: 'rgba(6,182,212,0.08)' },
    pattern_recognition: { accent: '#8B5CF6', bg: 'rgba(139,92,246,0.08)' },
    focus_attention: { accent: '#14B8A6', bg: 'rgba(20,184,166,0.08)' },
    cognitive_endurance: { accent: '#6366F1', bg: 'rgba(99,102,241,0.08)' }
};

const ALL_DIMENSIONS: CognitiveDimensionId[] = [
    'working_memory', 'processing_speed', 'executive_function',
    'verbal_reasoning', 'spatial_reasoning', 'pattern_recognition',
    'focus_attention', 'cognitive_endurance'
];

export const AssessmentHub: React.FC<AssessmentHubProps> = ({
    assessedDimensions,
    pendingDimensions,
    onStartAssessment
}) => {
    const completedCount = assessedDimensions.size;
    const totalCount = ALL_DIMENSIONS.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100);

    return (
        <div>
            {/* Progress Header */}
            <div className="mp-glass" style={{
                padding: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-xl)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xl)'
            }}>
                <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: `conic-gradient(var(--mp-deep-lavender) ${progressPercent * 3.6}deg, var(--color-bg-tertiary) 0deg)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: '50%',
                        background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
                        fontWeight: 600, color: 'var(--color-text-primary)'
                    }}>
                        {completedCount}/{totalCount}
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        marginBottom: 4
                    }}>
                        {completedCount === 0
                            ? 'Ready to Begin'
                            : completedCount === totalCount
                                ? 'Profile Complete'
                                : `${totalCount - completedCount} Assessments Remaining`
                        }
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>
                        {completedCount === 0
                            ? 'Choose any dimension below to start building your cognitive profile.'
                            : completedCount === totalCount
                                ? 'All cognitive dimensions have been assessed. Your full MindPrint profile is available.'
                                : 'Complete all 8 dimensions to unlock your full MindPrint profile and archetype.'
                        }
                    </p>
                </div>
            </div>

            {/* Dimension Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--spacing-md)'
            }}>
                {ALL_DIMENSIONS.map(dim => {
                    const assessed = assessedDimensions.get(dim);
                    const colors = DIMENSION_COLORS[dim];
                    const icon = DIMENSION_ICONS[dim];
                    const isPending = pendingDimensions.includes(dim);

                    if (assessed) {
                        return (
                            <CompletedCard
                                key={dim}
                                dimension={dim}
                                icon={icon}
                                colors={colors}
                                result={assessed}
                                onRetake={() => onStartAssessment(dim)}
                            />
                        );
                    }

                    return (
                        <PendingCard
                            key={dim}
                            dimension={dim}
                            icon={icon}
                            colors={colors}
                            onStart={() => onStartAssessment(dim)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const CompletedCard: React.FC<{
    dimension: CognitiveDimensionId;
    icon: React.ReactNode;
    colors: { accent: string; bg: string };
    result: StoredAssessment;
    onRetake: () => void;
}> = ({ dimension, icon, colors, result, onRetake }) => {
    const getLabel = (p: number) => p >= 75 ? 'Strength' : p >= 25 ? 'Developing' : 'Growth Edge';
    const label = getLabel(result.percentile);

    return (
        <div className="mp-glass" style={{
            padding: 'var(--spacing-lg)',
            position: 'relative',
            overflow: 'hidden',
            borderLeft: `3px solid ${colors.accent}`
        }}>
            {/* Completed badge */}
            <div style={{
                position: 'absolute', top: 12, right: 12,
                color: 'var(--mp-emerald)', opacity: 0.5
            }}>
                <CheckCircle2 size={16} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                    width: 40, height: 40, borderRadius: 'var(--radius-lg)',
                    background: colors.bg, color: colors.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {icon}
                </div>
                <div>
                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 14, fontWeight: 600,
                        color: 'var(--color-text-primary)'
                    }}>
                        {formatDimensionName(dimension)}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
                        Assessed {new Date(result.completedAt).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem', fontWeight: 300,
                    color: 'var(--color-text-primary)'
                }}>
                    {result.percentile}
                </span>
                <sup style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>th</sup>
                <span style={{
                    marginLeft: 8, fontSize: 10, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: colors.accent,
                    padding: '2px 8px', borderRadius: 'var(--radius-full)',
                    background: colors.bg
                }}>
                    {label}
                </span>
            </div>

            {/* Progress bar */}
            <div style={{
                height: 4, width: '100%',
                background: 'var(--color-bg-tertiary)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
                marginBottom: 12
            }}>
                <div style={{
                    width: `${result.percentile}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent}66)`,
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 1s ease'
                }} />
            </div>

            {/* Retake */}
            <button
                onClick={onRetake}
                style={{
                    background: 'transparent', border: 'none',
                    color: 'var(--color-text-tertiary)',
                    fontSize: 11, fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    cursor: 'pointer', padding: '4px 0',
                    transition: 'color 0.2s'
                }}
            >
                Retake Assessment →
            </button>
        </div>
    );
};

const PendingCard: React.FC<{
    dimension: CognitiveDimensionId;
    icon: React.ReactNode;
    colors: { accent: string; bg: string };
    onStart: () => void;
}> = ({ dimension, icon, colors, onStart }) => {
    const duration = getTestDuration(dimension);

    return (
        <div className="mp-glass" style={{
            padding: 'var(--spacing-lg)',
            opacity: 0.85,
            borderLeft: '3px solid var(--color-border)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        }}
            onClick={onStart}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
                (e.currentTarget as HTMLElement).style.borderLeftColor = colors.accent;
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.opacity = '0.85';
                (e.currentTarget as HTMLElement).style.borderLeftColor = 'var(--color-border)';
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                    width: 40, height: 40, borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {icon}
                </div>
                <div>
                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 14, fontWeight: 600,
                        color: 'var(--color-text-primary)'
                    }}>
                        {formatDimensionName(dimension)}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                        {getDimensionDescription(dimension)}
                    </div>
                </div>
            </div>

            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 500
                }}>
                    <Clock size={12} />
                    ~{duration} minutes
                </div>

                <div style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    color: colors.accent,
                    fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.06em'
                }}>
                    <Play size={12} fill="currentColor" />
                    Start
                </div>
            </div>
        </div>
    );
};
