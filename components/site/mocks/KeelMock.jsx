// Adapted from the Keel page's "with only instructions" drawing, at tile size. Above, faded: an agent
// with only instructions wanders off to dead ends. Below, crisp: the same agent on a fixed path, doing
// one step and handing on to approval. Every animated part rests on its last frame for reduced motion.
const ENDS = [[124, 26, 'approves early'], [160, 50, 'skips a check'], [116, 74, 'stops halfway']];
const STOPS = [[14, 'Intake', 'start'], [96, 'Checks', 'middle'], [186, 'Agent step', 'middle'], [286, 'Approval', 'end']];

export default function KeelMock() {
  return (
    <div className="flex h-full items-center justify-center px-5 py-4">
      <svg viewBox="0 0 300 175" className="h-full max-h-[200px] w-full max-w-[380px] overflow-visible text-aubergine" fill="none" aria-hidden="true">
        <g opacity=".45" fontSize="12">
          <text x="0" y="12" fill="currentColor" fontWeight="500">Instructions only</text>
          {ENDS.map(([x, y, label]) => (
            <g key={label}>
              <path d={`M14 48C50 48 ${x - 50} ${y} ${x} ${y}`} stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
              <path d={`M${x} ${y - 4}v8`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <text x={x + 6} y={y + 4} fill="currentColor">{label}</text>
            </g>
          ))}
          <circle className="keel-wander" cx="14" cy="48" r="4" fill="currentColor" />
        </g>
        <path d="M0 92H300" stroke="currentColor" strokeOpacity=".1" />
        <text x="0" y="110" fontSize="12" fontWeight="600" fill="currentColor">With Keel</text>
        <path d="M14 140H286" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {STOPS.map(([x, label, anchor]) => (
          <g key={label}>
            <circle cx={x} cy="140" r="3.5" fill={x === 186 ? '#ffaf10' : '#f4f4f5'} stroke={x === 186 ? '#ffaf10' : 'currentColor'} strokeWidth="1.5" />
            <text x={anchor === 'start' ? 6 : anchor === 'end' ? 294 : x} y="162" textAnchor={anchor} fontSize="12" fill="currentColor" fontWeight={x === 186 ? 600 : 400}>
              {label}{anchor === 'end' && <tspan className="keel-done" dx="4" fill="#1f9d63">✓</tspan>}
            </text>
          </g>
        ))}
        <circle className="keel-glide" cx="14" cy="140" r="4.5" fill="currentColor" />
      </svg>
    </div>
  );
}
