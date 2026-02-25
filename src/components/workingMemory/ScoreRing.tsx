import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';

interface ScoreRingProps {
  score: number;
  band: string;
  trend: 'up' | 'down' | 'flat';
  delta?: number;
}

const trendIcon = {
  up: <ArrowUpRight size={14} />,
  down: <ArrowDownRight size={14} />,
  flat: <ArrowRight size={14} />
};

const trendColor = {
  up: '#10B981',
  down: '#F59E0B',
  flat: '#6B7280'
};

export function ScoreRing({ score, band, trend, delta = 0 }: ScoreRingProps) {
  const size = 154;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (Math.max(0, Math.min(100, score)) / 100) * circumference;

  return (
    <div className="wm-score-wrap">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(94,85,116,0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#wmScoreGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference - progress}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dasharray 600ms ease' }}
        />
        <defs>
          <linearGradient id="wmScoreGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#B8A7DB" />
            <stop offset="100%" stopColor="#5E5574" />
          </linearGradient>
        </defs>
      </svg>

      <div className="wm-score-center">
        <div className="wm-score-value">{score}</div>
        <div className="wm-score-label">Working Memory</div>
      </div>

      <div className="wm-score-meta">
        <span className="wm-band-chip">{band}</span>
        <span className="wm-trend-chip" style={{ color: trendColor[trend], borderColor: `${trendColor[trend]}55` }}>
          {trendIcon[trend]} {delta > 0 ? `+${delta}` : delta}
        </span>
      </div>
    </div>
  );
}
