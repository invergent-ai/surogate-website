/* Line illustrations of what Rune can look at, with a scan line the page sweeps across each. */
const ART = {
  form: (
    <>
      <rect x="18" y="10" width="84" height="100" rx="6" />
      <path d="M30 28h40M30 40h60M30 52h52M30 64h60M30 76h36" />
      <path d="M30 94c8-8 14 6 22-2s12 4 18-2" className="sa-accent" />
    </>
  ),
  meter: (
    <>
      <circle cx="60" cy="62" r="42" />
      <path d="M32 62a28 28 0 0 1 56 0" />
      <path d="M60 62l18-20" className="sa-accent" />
      <rect x="42" y="78" width="36" height="14" rx="3" />
    </>
  ),
  screen: (
    <>
      <rect x="10" y="18" width="100" height="72" rx="6" />
      <path d="M10 32h100" />
      <path d="M22 46h30M22 58h40M22 70h24" />
      <rect x="74" y="54" width="24" height="12" rx="6" className="sa-accent" />
      <path d="M44 100h32" />
    </>
  ),
  chart: (
    <>
      <path d="M16 100V16M16 100h92" />
      <rect x="28" y="66" width="14" height="34" />
      <rect x="50" y="48" width="14" height="52" />
      <rect x="72" y="30" width="14" height="70" className="sa-accent" />
      <path d="M26 58l24-16 22-14 20-8" />
    </>
  ),
};

export default function SeesArt({ kind }) {
  return (
    <svg className="sa" viewBox="0 0 120 120" aria-hidden="true">
      <g className="sa-lines">{ART[kind]}</g>
      <rect className="sa-scan" x="4" y="0" width="112" height="3" rx="1.5" />
    </svg>
  );
}
