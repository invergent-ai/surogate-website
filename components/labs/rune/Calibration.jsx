'use client';

import { RUNE_CALIBRATION } from '@/lib/labs';

/*
 * What calibration means, shown rather than told: ten decisions Rune was 90% sure of, of which about nine
 * are right, and ten it was 60% sure of, of which about six are. Then the measured figure from the model
 * card. The tick rows are an illustration of the rule, not a recorded run.
 */
const ROWS = [
  { sure: 90, right: 9 },
  { sure: 60, right: 6 },
];

export default function Calibration() {
  return (
    <div className="cal">
      {ROWS.map((r) => (
        <div className="cal-row" key={r.sure}>
          <p className="cal-h">Ten answers Rune gave at <b>{r.sure}%</b> sure</p>
          <div className="cal-chips">
            {Array.from({ length: 10 }, (_, k) => (
              <span key={k} className={`cal-chip ${k < r.right ? 'is-right' : 'is-wrong'}`} aria-hidden="true">
                <em>{r.sure}%</em>
                <b>{k < r.right ? '✓' : '✕'}</b>
              </span>
            ))}
          </div>
          <p className="cal-sum">About {r.right} of 10 turn out right.</p>
        </div>
      ))}
      <div className="cal-rule">
        <span className="cal-line" aria-hidden="true" />
        <p>
          So draw a line. Above it, apply Rune&apos;s answer automatically. Below it, send the case to a person. You
          know in advance how many will need a human.
        </p>
      </div>
      <p className="cal-measured">
        Measured on {RUNE_CALIBRATION.source}: at the recommended setting, Rune&apos;s
        average confidence is {RUNE_CALIBRATION.confidence}% and its accuracy {RUNE_CALIBRATION.accuracy}%.
        <span> The tick rows above illustrate the rule; they are not a recorded run.</span>
      </p>
    </div>
  );
}
