'use client';

import { DEMO_FILTERS, demosFor } from '@/lib/labs';

/* Two groups of toggles above the demos. Each count is what that option would show, combined with the
   other group's current choice. */
export default function DemoFilter({ value, onPick }) {
  return (
    <div className="lab-filter">
      {DEMO_FILTERS.map((g) => (
        <div className="lab-filter-g" role="group" aria-label={g.label} key={g.key}>
          <span className="lab-filter-l" aria-hidden="true">{g.label}</span>
          {g.options.map((o) => {
            const on = (value[g.key] || 'all') === o.key;
            return (
              <button type="button" key={o.key} aria-pressed={on} onClick={() => onPick(g.key, o.key)}>
                {o.label}<span className="lab-filter-n">{demosFor({ ...value, [g.key]: o.key }).length}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
