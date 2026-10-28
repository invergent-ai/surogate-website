import RingField from '../RingField';
import { at } from '../rings';

// A model is a slot several providers fill: every provider's ring passes through the one request, just under the
// market, and fans out past it. For each request the router's sun mark leaves the request along one provider's
// ring, a different one each time (products.css, .rf-pick).
const Q = [800, 715];
const PROVIDERS = [[300, -90], [460, -120], [460, -60], [640, -105], [640, -75]].map(([r, deg]) => [...at(...Q, r, deg), r, deg]);

export default function GatewayRings({ className, dark }) {
  return (
    <RingField className={className} dark={dark} rings={PROVIDERS.map(([x, y, r]) => [x, y, r])}>
      {PROVIDERS.map(([x, y, r, deg], k) => (
        <circle key={k} className={`rf-sun rf-pick ${k ? '' : 'rf-first'}`} cx={x} cy={y} r={r} pathLength="100"
          style={{ '--k': k, '--a': `${deg + 180 - 2}deg`, '--sweep': `${deg < -90 ? 1 : deg > -90 ? -1 : 1} * ${Math.round(16000 / r)}deg` }} />
      ))}
    </RingField>
  );
}
