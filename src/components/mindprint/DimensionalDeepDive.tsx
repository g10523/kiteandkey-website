import React, { useState } from 'react';
import { Brain, ChevronDown, ChevronUp, History, Play } from 'lucide-react';
import type { CognitiveDimension } from '../../types/mindprint';
import { useAnalytics } from '../../hooks/useAnalytics';

interface DimensionalDeepDiveProps {
    dimensions: CognitiveDimension[];
}

// ─── Charts ───

const RiverChart: React.FC<{ percentile: number; color: string; id: string }> = ({ percentile, color, id }) => {
    const points = [
        Math.max(5, percentile - 12),
        Math.max(5, percentile - 8),
        Math.max(5, percentile + 4),
        Math.max(5, percentile - 2),
        Math.min(95, percentile + 6),
        percentile
    ];

    const width = 200;
    const height = 120;
    const step = width / (points.length - 1);

    let d = `M 0 ${height - (points[0] / 100) * height}`;
    for (let i = 0; i < points.length - 1; i++) {
        const x0 = i * step;
        const y0 = height - (points[i] / 100) * height;
        const x1 = (i + 1) * step;
        const y1 = height - (points[i + 1] / 100) * height;
        const cp1x = x0 + (x1 - x0) / 2;
        const cp2x = x1 - (x1 - x0) / 2;
        d += ` C ${cp1x} ${y0}, ${cp2x} ${y1}, ${x1} ${y1}`;
    }

    const areaPath = `${d} L ${width} ${height} L 0 ${height} Z`;

    return (
        <svg width="100%" height={height} style={{ overflow: 'visible' }} preserveAspectRatio="none">
            <defs>
                <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="90%" stopColor={color} stopOpacity="0.0" />
                </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#grad-${id})`} />
            <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={width} cy={height - (percentile / 100) * height} r="4" fill={color} stroke="white" strokeWidth="2" />
        </svg>
    );
};

const TrendSparkline: React.FC<{ dimensionId: string; color: string }> = ({ dimensionId, color }) => {
    const { trends, isLoading } = useAnalytics(dimensionId);

    if (isLoading) return <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--color-text-muted)' }}>Loading trends...</div>;

    // If no history, show empty state or just the current point
    if (!trends || trends.length < 2) {
        return (
            <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--color-text-muted)' }}>
                Not enough historical data to show trend
            </div>
        );
    }

    // Sort by date just in case
    const data = [...trends].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Normalize to prevent flat lines if all scores are same
    const scores = data.map(d => d.percentile);
    const min = Math.min(0, ...scores);
    const max = Math.max(100, ...scores);
    const range = max - min || 1;

    const width = 200;
    const height = 60;
    const padding = 5;

    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
        const y = height - ((d.percentile - min) / range) * (height - 2 * padding) - padding;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{ marginTop: 'var(--spacing-md)' }}>
            <h6 style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: 4 }}>
                Last {data.length} Assessments
            </h6>
            <svg width="100%" height={height} style={{ overflow: 'visible' }}>
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    points={points}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
                    const y = height - ((d.percentile - min) / range) * (height - 2 * padding) - padding;
                    return (
                        <circle key={i} cx={x} cy={y} r="3" fill={color} stroke="white" strokeWidth="1.5" />
                    );
                })}
            </svg>
        </div>
    );
}

// ─── Detail Panel ───

const DimensionDetailPanel: React.FC<{
    dimension: CognitiveDimension;
    status: { label: string; color: string; bg: string };
    idx: number;
}> = ({ dimension, status, idx }) => {
    return (
        <div className="mp-accordion-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-xl)' }}>
                {/* Left column: description, chart, bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                    <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                        {/* Placeholder descriptions mapping since backend doesn't always send full text */}
                        The ability to hold and manipulate information in mind. This is critical for following multi-step instructions and mental synthesis.
                    </p>

                    {/* Historical Trajectory */}
                    <div>
                        <h5 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 10 }}>
                            Current Standing
                        </h5>
                        <div className="mp-river-chart-container">
                            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                <RiverChart percentile={dimension.percentile} color={status.color} id={`${dimension.dimension}-${idx}`} />
                                <div style={{ position: 'absolute', top: 0, right: 0, fontSize: 10, color: 'var(--color-text-muted)' }}>95th</div>
                                <div style={{ position: 'absolute', bottom: 0, right: 0, fontSize: 10, color: 'var(--color-text-muted)' }}>5th</div>
                            </div>
                        </div>

                        {/* Trend Sparkline (New Feature) */}
                        <TrendSparkline dimensionId={dimension.dimension} color={status.color} />
                    </div>

                    {/* Bullet points */}
                    <div>
                        <h5 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 10 }}>
                            What this means for you
                        </h5>
                        <ul className="mp-bullet-list">
                            <li>You excel when information is chunked into logical units.</li>
                            <li>Externalizing multi-step tasks reduces cognitive load.</li>
                            <li>Visual cues significantly improve recall and accuracy.</li>
                        </ul>
                    </div>
                </div>

                {/* Active Protocol */}
                <div className="mp-protocol-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-lg)' }}>
                        <div>
                            <h5 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--mp-emerald)', marginBottom: 6 }}>
                                Active Protocol
                            </h5>
                            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                                Externalization Training
                            </h4>
                        </div>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%', background: '#fff',
                            border: '1px solid rgba(16,185,129,0.15)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', color: 'var(--mp-emerald)',
                            boxShadow: 'var(--shadow-xs)', cursor: 'pointer'
                        }}>
                            <Play size={14} fill="currentColor" />
                        </div>
                    </div>

                    {/* Progress */}
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>Progress</span>
                            <span style={{ color: 'var(--mp-emerald)' }}>8 / 12 sessions</span>
                        </div>
                        <div style={{ height: 6, width: '100%', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                            <div style={{ width: '66%', height: '100%', background: 'var(--mp-emerald)', borderRadius: 'var(--radius-full)', transition: 'width 0.5s ease' }} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
                        <button style={{
                            flex: 1, padding: '10px', background: 'transparent', border: 'none',
                            color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer'
                        }}>
                            <History size={14} /> Full History
                        </button>
                        <button style={{
                            flex: 1, padding: '10px', background: 'transparent',
                            border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)',
                            color: 'var(--color-primary)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}>
                            Retake
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Component ───

export const DimensionalDeepDive: React.FC<DimensionalDeepDiveProps> = ({ dimensions }) => {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    const getStatus = (p: number) => {
        if (p >= 75) return { label: 'Strength', color: 'var(--mp-emerald)', bg: 'var(--mp-emerald-bg)' };
        if (p >= 25) return { label: 'Developing', color: 'var(--mp-amber)', bg: 'var(--mp-amber-bg)' };
        return { label: 'Growth Edge', color: 'var(--mp-rose)', bg: 'var(--mp-rose-bg)' };
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {dimensions.map((dim, i) => {
                const isOpen = openIdx === i;
                const status = getStatus(dim.percentile);

                return (
                    <div key={dim.dimension} className={`mp-glass mp-accordion-item ${isOpen ? 'mp-accordion-open' : ''}`}
                        style={isOpen ? { boxShadow: 'var(--shadow-lg)' } : {}}>
                        {/* Header */}
                        <div
                            className="mp-accordion-header"
                            onClick={() => setOpenIdx(isOpen ? null : i)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div className="mp-accordion-icon-circle" style={{ backgroundColor: status.bg }}>
                                    <Brain size={18} style={{ color: status.color }} />
                                </div>

                                <div>
                                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 4 }}>
                                        {dim.name}
                                    </h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                                            {dim.percentile}<sup style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>th</sup>
                                        </span>
                                        <span className="mp-status-pill" style={{ backgroundColor: status.bg, color: status.color }}>
                                            {status.label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}>
                                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                        </div>

                        {/* Expanded content */}
                        {isOpen && (
                            <DimensionDetailPanel dimension={dim} status={status} idx={i} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
