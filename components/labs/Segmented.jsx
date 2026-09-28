'use client';

/* A short set of choices (two to four) as one segmented control: on a phone it replaces a stack of long
   cards with one card at a time. */
export default function Segmented({ label, options, value, onPick }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o, n) => (
        <button type="button" key={o} aria-pressed={n === value} onClick={() => onPick(n)}>{o}</button>
      ))}
    </div>
  );
}
