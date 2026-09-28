'use client';

import { DEMO_FILTERS, demosFor } from '@/lib/labs';

/* The chips above the demos: one toggle per filter, with how many demos it shows. */
export default function DemoFilter({ active, onPick }) {
  return (
    <div className="lab-filter" role="group" aria-label="Filter the demos">
      {DEMO_FILTERS.map((f) => (
        <button type="button" key={f.key} aria-pressed={f.key === active} onClick={() => onPick(f.key)}>
          {f.label}<span className="lab-filter-n">{demosFor(f.key).length}</span>
        </button>
      ))}
    </div>
  );
}
