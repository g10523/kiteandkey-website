import React from 'react';
import { Brain, Sparkles, Clock, Shield, ChevronRight } from 'lucide-react';

interface OnboardingWelcomeProps {
    onStartAssessments: () => void;
}

export const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({ onStartAssessments }) => {
    return (
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', padding: 'var(--spacing-3xl) var(--spacing-xl)' }}>
            {/* Hero icon */}
            <div style={{
                width: 88, height: 88, borderRadius: '50%', margin: '0 auto var(--spacing-xl)',
                background: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(16,185,129,0.1))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(94,85,116,0.12)'
            }}>
                <Brain size={40} style={{ color: 'var(--mp-deep-lavender)' }} />
            </div>

            {/* Title */}
            <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)',
                fontWeight: 300, color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-md)', lineHeight: 1.2
            }}>
                Discover your<br />
                <span style={{ fontWeight: 500 }}>Cognitive Architecture</span>
            </h2>

            {/* Subtitle */}
            <p style={{
                fontSize: 16, color: 'var(--color-text-secondary)',
                maxWidth: 480, margin: '0 auto var(--spacing-2xl)',
                lineHeight: 1.65
            }}>
                MindPrint builds a detailed map of how your brain learns — your strengths,
                growth edges, and the teaching strategies that work best for you. It all starts
                with a series of short cognitive assessments.
            </p>

            {/* Feature cards */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-2xl)',
                textAlign: 'left'
            }}>
                <FeatureCard
                    icon={<Sparkles size={20} />}
                    title="8 Dimensions"
                    description="From working memory to pattern recognition — we measure each cognitive dimension independently."
                    color="var(--mp-deep-lavender)"
                    bg="rgba(94,85,116,0.06)"
                />
                <FeatureCard
                    icon={<Clock size={20} />}
                    title="~10 min each"
                    description="Each assessment takes about 8-15 minutes. Complete them at your own pace, one at a time."
                    color="var(--mp-amber)"
                    bg="rgba(245,158,11,0.06)"
                />
                <FeatureCard
                    icon={<Shield size={20} />}
                    title="Evidence-Based"
                    description="Built on established psychometric methods used in educational psychology worldwide."
                    color="var(--mp-emerald)"
                    bg="rgba(16,185,129,0.06)"
                />
            </div>

            {/* CTA */}
            <button
                onClick={onStartAssessments}
                style={{
                    padding: '16px 40px',
                    background: 'var(--mp-deep-lavender)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    boxShadow: '0 8px 24px rgba(94,85,116,0.25)',
                    transition: 'all 0.2s ease'
                }}
            >
                Begin First Assessment
                <ChevronRight size={18} />
            </button>

            <p style={{
                marginTop: 'var(--spacing-lg)',
                fontSize: 12, color: 'var(--color-text-muted)',
                fontStyle: 'italic'
            }}>
                You can pause and return at any time — your progress is saved.
            </p>
        </div>
    );
};

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    bg: string;
}> = ({ icon, title, description, color, bg }) => (
    <div className="mp-glass" style={{
        padding: 'var(--spacing-xl)',
        display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)'
    }}>
        <div style={{
            width: 40, height: 40, borderRadius: 'var(--radius-lg)',
            background: bg, color,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {icon}
        </div>
        <h4 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-base)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            margin: 0
        }}>
            {title}
        </h4>
        <p style={{
            fontSize: 13,
            color: 'var(--color-text-tertiary)',
            lineHeight: 1.6,
            margin: 0
        }}>
            {description}
        </p>
    </div>
);
