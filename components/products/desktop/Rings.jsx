import RingField from '../RingField';

// Where the agent thinks and where it works: the cloud's ring overlaps your computer's, and the sandbox sits
// inside your computer, touching its edge. A sun arc runs the sandbox; another walks your computer.
const CLOUD = [640, 470, 520];
const COMPUTER = [980, 540, 520];
const SANDBOX = [1330, 650, 153];

export default function DesktopRings({ className, dark }) {
  return <RingField className={className} dark={dark} rings={[CLOUD, COMPUTER, SANDBOX]} arcs={[[...SANDBOX, 24, 1, 0], [...COMPUTER, 84, -1, 30]]} />;
}
