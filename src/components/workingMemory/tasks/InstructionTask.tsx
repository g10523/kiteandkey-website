import { useState } from 'react';
import type { WmItem } from '../../../types/workingMemory';

interface InstructionTaskProps {
  item: WmItem;
  onSubmit: (response: string[]) => void;
}

export function InstructionTask({ item, onSubmit }: InstructionTaskProps) {
  const [values, setValues] = useState<string[]>(Array((item.prompt.steps || []).length).fill(''));

  const update = (index: number, val: string) => {
    const next = [...values];
    next[index] = val;
    setValues(next);
  };

  return (
    <div className="wm-task-card">
      <p>Follow all steps carefully. Ignore unrelated popups or sounds.</p>
      <ol className="wm-step-list">
        {(item.prompt.steps || []).map((step: string, index: number) => (
          <li key={step}>
            <span>{step}</span>
            <input value={values[index]} onChange={(e) => update(index, e.target.value)} placeholder="Your response" />
          </li>
        ))}
      </ol>
      <button onClick={() => onSubmit(values)}>Submit</button>
    </div>
  );
}
