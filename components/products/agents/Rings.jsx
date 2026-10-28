import RingField from '../RingField';
import { at } from '../rings';

// One agent, nine channels: a ring for the agent with a small ring for each channel standing on it. One sun arc
// travels the agent's ring through every channel; two more turn inside a channel each.
const C = [800, 500, 560];
const CHANNELS = Array.from({ length: 9 }, (_, k) => [...at(...C, -90 + k * 40), 92]);

export default function AgentRings({ className, dark }) {
  return (
    <RingField className={className} dark={dark} rings={[C, ...CHANNELS]}
      arcs={[[...C, 96, 1, 0], [...CHANNELS[2], 22, -1, 6], [...CHANNELS[7], 30, 1, 17]]} />
  );
}
