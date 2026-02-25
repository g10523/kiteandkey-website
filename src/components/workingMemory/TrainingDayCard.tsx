import { CheckCircle2, Circle } from 'lucide-react';

interface TrainingDayCardProps {
  day: {
    day: number;
    date: string;
    type: string;
    durationMinutes: number;
    warmup: string;
    drills: string[];
    reflectionPrompt: string;
    masteryRule: string;
    completed: boolean;
  };
  onToggle: (day: number) => void;
}

export function TrainingDayCard({ day, onToggle }: TrainingDayCardProps) {
  return (
    <div className="wm-training-card">
      <button className="wm-training-toggle" onClick={() => onToggle(day.day)}>
        {day.completed ? <CheckCircle2 size={18} color="#10B981" /> : <Circle size={18} color="#8C8C98" />}
      </button>

      <div className="wm-training-content">
        <div className="wm-training-top">
          <h5>Day {day.day} · {day.type}</h5>
          <span>{day.durationMinutes} min</span>
        </div>

        <p><strong>Warm-up:</strong> {day.warmup}</p>
        <p><strong>Drills:</strong> {day.drills.join(' + ')}</p>
        <p><strong>Reflection:</strong> {day.reflectionPrompt}</p>
        <p className="wm-training-rule">What to do next: {day.masteryRule}</p>
      </div>
    </div>
  );
}
