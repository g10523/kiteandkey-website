import { useState } from 'react';
import type { WmItem } from '../../../types/workingMemory';

interface NBackTaskProps {
  item: WmItem;
  onSubmit: (response: boolean[]) => void;
}

export function NBackTask({ item, onSubmit }: NBackTaskProps) {
  const [value, setValue] = useState('');
  const stream = (item.prompt.stream || []).join(' ');

  return (
    <div className="wm-task-card">
      <p>{item.prompt.instruction}</p>
      <div className="wm-sequence">{stream}</div>
      <p className="wm-hint">Enter Y for match and N for no-match separated by spaces.</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Y N N Y" />
      <button onClick={() => onSubmit(value.trim().split(/\s+/).map((v) => v.toLowerCase() === 'y'))}>Submit</button>
    </div>
  );
}
