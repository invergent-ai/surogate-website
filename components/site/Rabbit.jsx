import { POSES, RABBIT_BOX, RABBIT_EYE, RABBIT_FILL, RABBIT_OUTLINE } from './rabbit';

// Each product's attribute, drawn around the mark in the mark's own units. The viewBox leaves room
// on every side so an attribute never clips.
const ATTRIBUTES = {
  plain: null,
  team: null,
  computer: (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="-8" y="-12" width="88" height="96" rx="8" />
      <path d="M-8 0H80" />
      <path d="M62 66l10 4-5 2-2 5z" fill="currentColor" />
    </g>
  ),
  voice: (
    <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
      <path d="M74 6a14 14 0 0 1 0 22" />
      <path d="M80 -2a24 24 0 0 1 0 38" />
    </g>
  ),
  track: (
    <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
      <path d="M-6 82H78" />
      <path d="M4 76v12M36 76v12M68 76v12" />
    </g>
  ),
  hat: (
    <g fill="currentColor">
      <rect x="-4" y="44" width="64" height="44" rx="3" />
      <rect x="-10" y="40" width="80" height="8" rx="4" />
      <rect x="-4" y="50" width="64" height="7" fill="var(--rabbit-bg, #fff)" />
    </g>
  ),
  stream: (
    <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
      <path d="M-12 40h14M-16 52h12M-10 64h10" />
    </g>
  ),
};

function Mark({ x = 0, y = 0, scale = 1, think }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className={think ? 'rabbit-think' : undefined}>
      <path d={RABBIT_FILL} fill="var(--rabbit-bg, #fff)" />
      <path d={RABBIT_OUTLINE} fill="currentColor" />
      <path d={RABBIT_EYE} fill="currentColor" className="rabbit-eye" />
    </g>
  );
}

// The rabbit as a character (spec §4.1): ink is currentColor, the body is --rabbit-bg.
export default function Rabbit({ pose = 'plain', size = 24, title, think = false, className = '' }) {
  if (!POSES.includes(pose)) throw new Error(`Unknown rabbit pose "${pose}"`);
  const pad = 18;
  const label = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': 'true' };
  return (
    <svg
      viewBox={`${-pad} ${-pad} ${RABBIT_BOX.w + pad * 2} ${RABBIT_BOX.h + pad * 2}`}
      width={size}
      height={size}
      className={className}
      focusable="false"
      {...label}
    >
      {pose === 'team' ? (
        <>
          <Mark x={-14} y={22} scale={0.55} />
          <Mark x={46} y={22} scale={0.55} />
          <Mark x={10} y={-6} scale={0.7} think={think} />
        </>
      ) : (
        <Mark think={think} />
      )}
      {ATTRIBUTES[pose]}
    </svg>
  );
}

// The agent's avatar in chat mocks: the rabbit in a filled circle.
export function RabbitAvatar({ size = 22, bg = '#2a102d', ink = '#2a102d', body = '#ffffff', think = false }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: bg, color: ink, '--rabbit-bg': body }}
    >
      <Rabbit size={size * 0.9} think={think} />
    </span>
  );
}
