import type { WmTimelinePoint } from '../../types/workingMemory';

interface TimelineChartProps {
  points: WmTimelinePoint[];
}

export function TimelineChart({ points }: TimelineChartProps) {
  if (!points.length) {
    return <div className="wm-empty">No check-ins yet. What to do next: complete a baseline check-in.</div>;
  }

  const width = 520;
  const height = 180;
  const pad = 24;

  const toX = (idx: number) => (idx / Math.max(1, points.length - 1)) * (width - 2 * pad) + pad;
  const toY = (score: number) => height - ((score / 100) * (height - 2 * pad) + pad);

  const line = points.map((point, idx) => `${toX(idx)},${toY(point.score)}`).join(' ');

  return (
    <div className="wm-timeline-wrap">
      <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
        {[20, 40, 60, 80].map((mark) => (
          <line key={mark} x1={pad} y1={toY(mark)} x2={width - pad} y2={toY(mark)} stroke="rgba(94,85,116,0.15)" strokeDasharray="4 4" />
        ))}
        <polyline points={line} fill="none" stroke="#5E5574" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point, idx) => (
          <g key={point.attemptId}>
            <circle cx={toX(idx)} cy={toY(point.score)} r="4" fill="#A98FCC" />
            <text x={toX(idx)} y={toY(point.score) - 10} textAnchor="middle" fontSize="9" fill="#5A5A66">{point.score}</text>
          </g>
        ))}
      </svg>
      <div className="wm-timeline-labels">
        {points.map((point) => (
          <span key={point.attemptId}>{new Date(point.date).toLocaleDateString()}</span>
        ))}
      </div>
    </div>
  );
}
