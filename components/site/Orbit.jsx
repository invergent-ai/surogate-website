// deslop-ignore-file 24: the approved Orbit set, cut from the brand rings in public/surogate_circles.svg, not stock icons
// Orbit: two overlapping hairline rings cut from the brand constellation. Only one ring in any glyph is sun;
// the other takes the text colour, so each piece works on light and dark.
const SUN = '#ffaf10';

export function OrbitMarker({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" strokeWidth="1" aria-hidden="true" className={`shrink-0 ${className}`}>
      <circle cx="8" cy="11.5" r="6" stroke="currentColor" />
      <circle cx="12.5" cy="8" r="6" stroke={SUN} />
    </svg>
  );
}

export function OrbitBullet({ size = 10, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true" className={`shrink-0 ${className}`}>
      <circle cx="5" cy="5" r="3" fill="none" stroke={SUN} strokeWidth="1.3" />
    </svg>
  );
}

export function OrbitDivider({ className = '' }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-2 ${className}`}>
      <i className="h-px flex-1 bg-hairline" />
      <svg width="26" height="16" viewBox="0 0 26 16" fill="none" strokeWidth="1" className="shrink-0">
        <circle cx="9" cy="8" r="6.5" stroke="currentColor" strokeOpacity=".35" />
        <circle cx="17" cy="8" r="6.5" stroke={SUN} />
      </svg>
      <i className="h-px flex-1 bg-hairline" />
    </div>
  );
}

export function OrbitProgress({ size = 18, label = 'Loading', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="2" role="img" aria-label={label} className={`shrink-0 ${className}`}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".14" />
      <circle className="orbit-turn" cx="12" cy="12" r="9" stroke={SUN} strokeLinecap="round" pathLength="100" strokeDasharray="22 78" />
    </svg>
  );
}

// Sits in a card's top-right corner; the card needs `relative overflow-hidden`.
export function OrbitCorner({ size = 96, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" strokeWidth="1" aria-hidden="true" className={`pointer-events-none absolute right-0 top-0 ${className}`}>
      <circle cx="96" cy="0" r="30" stroke={SUN} />
      <circle cx="96" cy="0" r="46" stroke="currentColor" strokeOpacity=".16" />
      <circle cx="104" cy="-6" r="66" stroke="currentColor" strokeOpacity=".1" />
    </svg>
  );
}
