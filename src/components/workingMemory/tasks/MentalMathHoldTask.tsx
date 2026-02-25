import { useState } from 'react';
import type { WmItem } from '../../../types/workingMemory';

interface MentalMathHoldTaskProps {
  item: WmItem;
  onSubmit: (response: number | string) => void;
}

export function MentalMathHoldTask({ item, onSubmit }: MentalMathHoldTaskProps) {
  const [answer, setAnswer] = useState('');

  return (
    <div className="wm-task-card">
      <p>{item.prompt.instruction}</p>
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Final value"
      />
      <button onClick={() => onSubmit(Number.isNaN(Number(answer)) ? answer : Number(answer))}>Submit</button>
    </div>
  );
}
