/* Line icons for Rune's capabilities, drawn in the same stroke language as the glyph so they can
   "draw themselves" (every path uses pathLength=1 and a dash of 1). */
const PATHS = {
  // only your options: three slots, one filled
  set: ['M8 12h32', 'M8 24h32', 'M8 36h32', 'M12 20l4 4 8-8'],
  // every probability: bars of different heights
  dist: ['M10 40V26', 'M20 40V12', 'M30 40V32', 'M40 40V36', 'M6 40h38'],
  // calibrated: the diagonal and a point on it
  cal: ['M8 40L40 8', 'M8 40h34', 'M8 40V6', 'M24 24m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0'],
  // many questions, one request: three lines joining into one
  many: ['M6 10c14 0 14 14 26 14', 'M6 24h26', 'M6 38c14 0 14-14 26-14', 'M32 24h10', 'M38 20l4 4-4 4'],
  // your data as it is: a document and an image
  input: ['M10 6h16l8 8v28H10z', 'M26 6v8h8', 'M16 26h12', 'M16 32h12', 'M16 20h6'],
  // thinks when unsure: a gate line and a loop
  think: ['M24 6v36', 'M10 30c0-8 6-12 10-12', 'M20 18l-4-3', 'M20 18l-2 4', 'M30 14h10', 'M30 24h10', 'M30 34h6'],
};

export default function RuneIcon({ name }) {
  return (
    <svg className="ri" viewBox="0 0 48 48" aria-hidden="true">
      {PATHS[name].map((d) => (
        <path key={d} className="ri-path" d={d} pathLength="1" strokeDasharray="1" />
      ))}
    </svg>
  );
}
