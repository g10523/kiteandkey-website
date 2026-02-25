import { useMemo, useState } from 'react';
import type { WmItem } from '../../types/workingMemory';
import { SpanTask } from './tasks/SpanTask';
import { NBackTask } from './tasks/NBackTask';
import { InstructionTask } from './tasks/InstructionTask';
import { MentalMathHoldTask } from './tasks/MentalMathHoldTask';

interface TakeCheckInWizardProps {
  attemptId: string;
  items: WmItem[];
  onSubmit: (payload: { itemId: string; response: any; timeMs: number }) => Promise<void>;
  onComplete: () => Promise<void>;
}

export function TakeCheckInWizard({ attemptId, items, onSubmit, onComplete }: TakeCheckInWizardProps) {
  const [index, setIndex] = useState(0);
  const [startMs, setStartMs] = useState(Date.now());
  const [busy, setBusy] = useState(false);

  const current = items[index];
  const progress = useMemo(() => Math.round(((index + 1) / Math.max(1, items.length)) * 100), [index, items.length]);

  const submit = async (response: any) => {
    setBusy(true);
    const now = Date.now();
    await onSubmit({ itemId: current.id, response, timeMs: now - startMs });

    if (index >= items.length - 1) {
      await onComplete();
      setBusy(false);
      return;
    }

    setIndex((prev) => prev + 1);
    setStartMs(Date.now());
    setBusy(false);
  };

  return (
    <section className="wm-glass">
      <div className="wm-wizard-head">
        <h4>Take Check-In</h4>
        <span>{index + 1}/{items.length}</span>
      </div>

      <div className="wm-progress">
        <div style={{ width: `${progress}%` }} />
      </div>

      {!current ? (
        <p>Loading item...</p>
      ) : (
        <>
          {current.taskType === 'SPAN_FORWARD' || current.taskType === 'SPAN_BACKWARD' ? <SpanTask item={current} onSubmit={submit} /> : null}
          {current.taskType === 'N_BACK' ? <NBackTask item={current} onSubmit={submit} /> : null}
          {current.taskType === 'INSTRUCTION' ? <InstructionTask item={current} onSubmit={submit} /> : null}
          {current.taskType === 'MENTAL_MATH_HOLD' ? <MentalMathHoldTask item={current} onSubmit={submit} /> : null}
        </>
      )}

      {busy && <p className="wm-muted">Saving response...</p>}
      <p className="wm-muted">Attempt ID: {attemptId.slice(0, 8)}…</p>
    </section>
  );
}
