import React, { useState, useMemo } from 'react';
import { Brain, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { MindPrintProfile, CognitiveDimension } from '../../types/mindprint';

interface CognitiveRadarProps {
    studentId?: string;
    profile: MindPrintProfile;
}

export const CognitiveRadar: React.FC<CognitiveRadarProps> = ({ profile }) => {
    const [hoveredDim, setHoveredDim] = useState<CognitiveDimension | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const dimensions = useMemo(() => profile.dimensions || [], [profile.dimensions]);

    const size = 500;
    const center = size / 2;
    const radius = 190;
    const labelRadius = radius + 36;

    const angleStep = (Math.PI * 2) / dimensions.length;

    const points = useMemo(() => {
        return dimensions.map((dim, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = (dim.percentile / 100) * radius;
            return {
                x: center + r * Math.cos(angle),
                y: center + r * Math.sin(angle),
                angle,
                dim
            };
        });
    }, [dimensions, angleStep, center, radius]);

    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    const handleMouseMove = (e: React.MouseEvent, dim: CognitiveDimension) => {
        const rect = (e.currentTarget as SVGElement).closest('.mp-radar-svg-wrap')?.getBoundingClientRect();
        if (!rect) return;
        setTooltipPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setHoveredDim(dim);
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'improving': return <TrendingUp size={13} style={{ color: 'var(--mp-emerald)' }} />;
            case 'declining': return <TrendingDown size={13} style={{ color: 'var(--mp-rose)' }} />;
            default: return <Minus size={13} style={{ color: 'var(--mp-slate)' }} />;
        }
    };

    const getTrendLabel = (trend: string) => {
        switch (trend) {
            case 'improving': return 'Improving';
            case 'declining': return 'Declining';
            default: return 'Stable';
        }
    };

    const getScoreColor = (p: number) => {
        if (p >= 75) return 'var(--mp-emerald)';
        if (p >= 25) return 'var(--mp-amber)';
        return 'var(--mp-rose)';
    };

    /* ── Empty state ── */
    if (dimensions.length === 0) {
        return (
            <div className="mp-glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', textAlign: 'center', minHeight: 400 }}>
                <div style={{ width: 72, height: 72, background: 'var(--color-bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <Brain size={36} style={{ color: 'var(--color-primary)', opacity: 0.4 }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-text-primary)', marginBottom: 12 }}>
                    Complete your first assessment
                </h3>
                <p style={{ color: 'var(--color-text-tertiary)', maxWidth: 260, marginBottom: 24 }}>
                    Reveal your cognitive signature by completing the baseline evaluation.
                </p>
                <button style={{
                    padding: '12px 32px',
                    background: 'linear-gradient(135deg, var(--color-purple-gradient-start), var(--color-purple-gradient-end))',
                    color: '#fff', border: 'none', borderRadius: 'var(--radius-full)',
                    fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                    cursor: 'pointer', boxShadow: 'var(--shadow-md)'
                }}>
                    Start Assessment
                </button>
            </div>
        );
    }

    /* ── Main radar ── */
    return (
        <div className="mp-glass mp-radar-card">
            {/* Background dot pattern */}
            <div className="mp-radar-bg" />

            {/* Label */}
            <div className="mp-radar-label">
                <h3>Live Signature</h3>
                <p>Cognitive Architecture</p>
            </div>

            {/* SVG radar */}
            <div className="mp-radar-svg-wrap" style={{ position: 'relative', width: '100%', maxWidth: 500, aspectRatio: '1/1', zIndex: 1 }}>
                <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                        <radialGradient id="cognitiveGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--mp-rose)" stopOpacity="0.35" />
                            <stop offset="50%" stopColor="var(--mp-amber)" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="var(--mp-emerald)" stopOpacity="0.08" />
                        </radialGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Performance zones */}
                    <circle cx={center} cy={center} r={0.25 * radius} fill="var(--mp-rose-bg)" opacity="0.25" />
                    <path
                        d={`M ${center} ${center - radius} A ${radius} ${radius} 0 1 0 ${center} ${center + radius} A ${radius} ${radius} 0 1 0 ${center} ${center - radius} M ${center} ${center - 0.75 * radius} A ${0.75 * radius} ${0.75 * radius} 0 1 1 ${center} ${center + 0.75 * radius} A ${0.75 * radius} ${0.75 * radius} 0 1 1 ${center} ${center - 0.75 * radius}`}
                        fill="var(--mp-emerald-bg)"
                        opacity="0.25"
                        fillRule="evenodd"
                    />

                    {/* Reference circles */}
                    {[25, 50, 75, 100].map(p => (
                        <circle
                            key={p}
                            cx={center}
                            cy={center}
                            r={(p / 100) * radius}
                            fill="none"
                            stroke="var(--color-border)"
                            strokeWidth="1"
                            strokeDasharray="3,5"
                            opacity="0.5"
                        />
                    ))}

                    {/* Axis lines + labels */}
                    {dimensions.map((dim, i) => {
                        const angle = i * angleStep - Math.PI / 2;
                        const x2 = center + radius * Math.cos(angle);
                        const y2 = center + radius * Math.sin(angle);
                        const lx = center + labelRadius * Math.cos(angle);
                        const ly = center + labelRadius * Math.sin(angle);

                        return (
                            <g key={i}>
                                <line
                                    x1={center} y1={center}
                                    x2={x2} y2={y2}
                                    stroke="var(--color-border)"
                                    strokeWidth="1"
                                    opacity="0.4"
                                />
                                <text
                                    x={lx} y={ly}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="var(--color-text-tertiary)"
                                    fontSize="10"
                                    fontWeight="500"
                                    style={{ fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                                >
                                    {dim.name.split(' ').map((word, j) => (
                                        <tspan x={lx} dy={j === 0 ? (dim.name.split(' ').length > 1 ? '-0.5em' : '0.3em') : '1.15em'} key={j}>
                                            {word}
                                        </tspan>
                                    ))}
                                </text>
                            </g>
                        );
                    })}

                    {/* Data polygon */}
                    <polygon
                        points={polygonPoints}
                        fill="url(#cognitiveGradient)"
                        stroke="var(--color-primary)"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 3px 6px rgba(94, 85, 116, 0.15))', transition: 'all 1s ease-out' }}
                    >
                        {mounted && (
                            <animate
                                attributeName="stroke-dasharray"
                                from="0, 10000"
                                to="10000, 0"
                                dur="2s"
                                fill="freeze"
                            />
                        )}
                    </polygon>

                    {/* Interactive data points */}
                    {points.map((p, i) => {
                        const scoreColor = getScoreColor(p.dim.percentile);
                        const isHovered = hoveredDim?.dimension === p.dim.dimension;

                        return (
                            <g key={i}
                                onMouseEnter={(e) => handleMouseMove(e, p.dim)}
                                onMouseLeave={() => setHoveredDim(null)}
                                style={{ cursor: 'pointer' }}
                            >
                                <circle
                                    cx={p.x}
                                    cy={p.y}
                                    r={isHovered ? 7 : 5}
                                    fill={scoreColor}
                                    stroke="white"
                                    strokeWidth="2"
                                    style={{ transition: 'all 0.2s ease', filter: p.dim.percentile >= 75 ? 'url(#glow)' : 'none' }}
                                />
                                {p.dim.percentile < 25 && (
                                    <circle cx={p.x} cy={p.y} r="10" fill={scoreColor} opacity="0.3">
                                        <animate attributeName="r" values="5;14;5" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Rich tooltip */}
                {hoveredDim && (
                    <div
                        style={{
                            position: 'absolute',
                            left: tooltipPos.x + 16,
                            top: tooltipPos.y - 16,
                            zIndex: 50,
                            pointerEvents: 'none'
                        }}
                    >
                        <div className="mp-glass" style={{
                            padding: '16px 20px', minWidth: 220,
                            background: 'rgba(255,255,255,0.92)',
                            boxShadow: 'var(--shadow-lg)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
                                {hoveredDim.name}
                            </h4>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 10 }}>
                                <span style={{ fontSize: 28, fontWeight: 300, fontFamily: 'var(--font-display)', color: getScoreColor(hoveredDim.percentile) }}>
                                    {hoveredDim.percentile}
                                </span>
                                <sup style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>th</sup>
                            </div>

                            <div style={{ borderTop: '1px solid var(--color-divider)', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Range</span>
                                    <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                                        {hoveredDim.confidenceInterval?.[0] ?? hoveredDim.percentile - 5}–
                                        {hoveredDim.confidenceInterval?.[1] ?? hoveredDim.percentile + 5}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, alignItems: 'center' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Trend</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                                        {getTrendIcon(hoveredDim.trend)}
                                        {getTrendLabel(hoveredDim.trend)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
