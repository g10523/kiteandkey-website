import React, { useEffect, useState } from 'react';
import { Zap, Target, MessageSquare, Puzzle, TrendingUp } from 'lucide-react';

interface CompositeScoresProps {
    scores: {
        fluidIntelligence?: number;
        cognitiveEfficiency?: number;
        executiveFunction?: number;
        verbalReasoning?: number;
    };
}

const CompositeCard: React.FC<{ label: string; score: number; icon: React.ReactNode }> = ({ label, score, icon }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = score;
        const duration = 1500;
        const incrementTime = duration / (end || 1);

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [score]);

    const getStatusParams = (s: number) => {
        if (s >= 75) return { color: 'var(--mp-emerald)', bg: 'var(--mp-emerald-bg)' };
        if (s >= 25) return { color: 'var(--mp-amber)', bg: 'var(--mp-amber-bg)' };
        return { color: 'var(--mp-rose)', bg: 'var(--mp-rose-bg)' };
    };

    const { color, bg } = getStatusParams(score);

    return (
        <div className="mp-glass mp-composite-card">
            {/* Icon + Label row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <div className="mp-score-icon" style={{ backgroundColor: bg, color }}>
                    {icon}
                </div>
                <div>
                    <div className="mp-score-label">{label}</div>
                </div>
            </div>

            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
                <span className="mp-score-value">{count}</span>
                <span className="mp-score-denom">/100</span>
            </div>

            {/* Progress bar */}
            <div className="mp-progress-track" style={{ marginBottom: 12 }}>
                <div
                    className="mp-progress-fill"
                    style={{
                        width: `${count}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}44)`
                    }}
                />
            </div>

            {/* Trend */}
            <div className="mp-trend-badge">
                <TrendingUp size={14} style={{ color: 'var(--mp-emerald)' }} />
                <span>+5 this term</span>
            </div>
        </div>
    );
};

export const CompositeScores: React.FC<CompositeScoresProps> = ({ scores }) => {
    return (
        <div className="mp-composites-grid">
            <CompositeCard
                label="Fluid Intelligence"
                score={scores.fluidIntelligence || 0}
                icon={<Puzzle size={22} />}
            />
            <CompositeCard
                label="Cognitive Efficiency"
                score={scores.cognitiveEfficiency || 0}
                icon={<Zap size={22} />}
            />
            <CompositeCard
                label="Executive Function"
                score={scores.executiveFunction || 0}
                icon={<Target size={22} />}
            />
            <CompositeCard
                label="Verbal Reasoning"
                score={scores.verbalReasoning || 0}
                icon={<MessageSquare size={22} />}
            />
        </div>
    );
};
