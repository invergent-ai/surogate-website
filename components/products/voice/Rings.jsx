import RingField from '../RingField';

// A voice carrying: still rings around the call, and sun ripples that leave it and fade (products.css, .rf-ripple).
const C = [800, 500];
const STILL = [480, 620, 760].map((r) => [...C, r]);

export default function VoiceRings({ className, dark }) {
  return (
    <RingField className={className} dark={dark} rings={STILL}>
      {[0, 1, 2].map((k) => <circle key={k} className="rf-sun rf-ripple" cx={C[0]} cy={C[1]} r={760} style={{ '--k': k }} />)}
    </RingField>
  );
}
