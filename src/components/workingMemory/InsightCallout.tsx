import { Lightbulb } from 'lucide-react';

interface InsightCalloutProps {
  title: string;
  points: string[];
}

export function InsightCallout({ title, points }: InsightCalloutProps) {
  return (
    <div className="wm-callout">
      <div className="wm-callout-head">
        <Lightbulb size={16} />
        <h5>{title}</h5>
      </div>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
