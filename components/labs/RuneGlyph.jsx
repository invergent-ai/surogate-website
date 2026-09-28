/* Rune's mark: the runic letter raidho (ᚱ, "R") in three strokes, with a ring that pulses when Rune
   decides. The strokes and ring are addressed by class so the pages can animate them. */
export default function RuneGlyph({ className = '', label }) {
  return (
    <svg
      className={`rune-glyph ${className}`}
      viewBox="0 0 120 160"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      <circle className="rg-ring" cx="60" cy="80" r="58" />
      <g className="rg-strokes">
        <path className="rg-s" pathLength="1" strokeDasharray="1" d="M42 20 V140" />
        <path className="rg-s" pathLength="1" strokeDasharray="1" d="M42 20 L86 48 L42 78" />
        <path className="rg-s" pathLength="1" strokeDasharray="1" d="M42 78 L90 140" />
      </g>
    </svg>
  );
}
