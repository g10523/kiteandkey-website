import React from 'react';
import { Brain, Zap, Target, Eye, ChevronRight } from 'lucide-react';
import type { MindPrintProfile } from '../../types/mindprint';

interface ArchetypeCardProps {
    profile: MindPrintProfile;
}

export const ArchetypeCard: React.FC<ArchetypeCardProps> = ({ profile }) => {
    const { archetype, strengths, developmentEdges } = profile;
    const confidence = archetype.confidence || 0.87;

    return (
        <div className="mp-glass mp-archetype" style={{ padding: 'var(--spacing-xl)' }}>
            {/* Eyebrow + Name */}
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <span className="mp-archetype-eyebrow">Your Cognitive Architecture</span>
                <h2 className="mp-archetype-name">
                    The {archetype?.name || 'Pattern-First Strategist'}
                </h2>

                {/* Archetype fit bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
                        Archetype Fit
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--mp-emerald)' }}>
                        {Math.round(confidence * 100)}% match
                    </span>
                </div>
                <div className="mp-archetype-fit-track">
                    <div className="mp-archetype-fit-fill" style={{ width: `${confidence * 100}%` }} />
                </div>
            </div>

            {/* Visual metaphor */}
            <div className="mp-metaphor-visual">
                <div className="mp-dot-pattern" />
                <div className="mp-brain-circle">
                    <Brain size={36} style={{ color: 'var(--color-primary)', opacity: 0.4 }} />
                </div>
            </div>

            {/* Description */}
            <p style={{
                fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.7,
                marginBottom: 'var(--spacing-xl)', maxWidth: '38ch'
            }}>
                {archetype.description}
            </p>

            {/* Capability Grid */}
            <div className="mp-capabilities">
                <div className="mp-capability-box strengths">
                    <div className="mp-capability-label" style={{ color: 'var(--mp-emerald)' }}>
                        <Zap size={13} />
                        Thrive With
                    </div>
                    <ul className="mp-capability-list">
                        {strengths.slice(0, 3).map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="mp-capability-box edges">
                    <div className="mp-capability-label" style={{ color: 'var(--mp-rose)' }}>
                        <Target size={13} />
                        Grow In
                    </div>
                    <ul className="mp-capability-list">
                        {developmentEdges.slice(0, 3).map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Calibration footer */}
            <div className="mp-calibration-footer">
                <div>
                    <div className="mp-cal-label">Current Calibration</div>
                    <div className="mp-cal-value">
                        <Eye size={14} /> Working Memory
                    </div>
                </div>
                <ChevronRight size={18} className="mp-cal-arrow" />
            </div>
        </div>
    );
};
