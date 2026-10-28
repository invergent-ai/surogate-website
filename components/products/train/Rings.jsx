import RingField from '../RingField';

// A run converging: each ring smaller than the last, all touching at one point, the way a loss settles.
const AT = [800, 860];
const RUN = [800, 580, 400, 260, 150].map((r) => [AT[0], AT[1] - r, r]);

export default function TrainRings({ className, dark }) {
  return <RingField className={className} dark={dark} rings={RUN} arcs={[[...RUN[0], 110, 1, 0], [...RUN[1], 72, -1, 20], [...RUN[4], 18, 1, 4]]} />;
}
