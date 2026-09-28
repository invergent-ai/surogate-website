'use client';

import { DEMO_FILTERS, RUNE_DEMOS, demosFor } from '@/lib/labs';
import SheetSelect from './SheetSelect';

/* The filters above the demos. Desktop: two groups of chips, each with how many demos it would show combined
   with the other group's choice. Phone: one bottom-sheet select per group, the count and a Clear. Both are in
   the static HTML and CSS shows one, so the first paint is right on either. */
export default function DemoFilter({ value, onPick, onClear }) {
  const shown = demosFor(value).length;
  const active = DEMO_FILTERS.some((g) => (value[g.key] || 'all') !== 'all');
  return (
    <div className="lab-filter">
      <div className="lab-filter-desk">
        {DEMO_FILTERS.map((g) => (
          <div className="lab-filter-g" role="group" aria-label={g.label} key={g.key}>
            <span className="lab-filter-l" aria-hidden="true">{g.label}</span>
            <div className="lab-filter-row">
              {g.options.map((o) => {
                const on = (value[g.key] || 'all') === o.key;
                return (
                  <button type="button" key={o.key} aria-pressed={on} onClick={() => onPick(g.key, o.key)}>
                    {o.label}<span className="lab-filter-n">{demosFor({ ...value, [g.key]: o.key }).length}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="lab-filter-phone">
        {DEMO_FILTERS.map((g) => (
          <SheetSelect
            key={g.key}
            label={g.label}
            value={value[g.key] || 'all'}
            onPick={(key) => onPick(g.key, key)}
            options={g.options.map((o) => ({ key: o.key, label: o.label, count: demosFor({ ...value, [g.key]: o.key }).length }))}
          />
        ))}
        <p className="lab-filter-sum">
          Showing {shown} of {RUNE_DEMOS.length} demos
          {active && (
            <button type="button" onClick={onClear}>Clear</button>
          )}
        </p>
      </div>
    </div>
  );
}
