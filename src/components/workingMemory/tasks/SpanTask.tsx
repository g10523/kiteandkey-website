import { useMemo, useState } from 'react';
import type { WmItem } from '../../../types/workingMemory';

interface SpanTaskProps {
  item: WmItem;
  onSubmit: (response: number[]) => void;
}

export function SpanTask({ item, onSubmit }: SpanTaskProps) {
  const [value, setValue] = useState('');
  const sequence = useMemo(() => (item.prompt.sequence || []).join('  '), [item.prompt.sequence]);

  return (
    <div className="wm-task-card">
      <p>{item.prompt.instruction}</p>
      <div className="wm-sequence">{sequence}</div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type digits separated by spaces"
      />
      <button onClick={() => onSubmit(value.trim().split(/\s+/).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))}>
        Submit
      </button>
    </div>
  );
}
