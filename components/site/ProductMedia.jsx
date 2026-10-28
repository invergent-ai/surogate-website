import LoopVideo from './LoopVideo';
import SurogateMock from './mocks/SurogateMock';
import VoiceMock from './mocks/VoiceMock';
import KeelMock from './mocks/KeelMock';
import TrainMock from './mocks/TrainMock';
import GatewayMock from './mocks/GatewayMock';
import { filmFiles } from '@/lib/films';

const MOCKS = { surogate: SurogateMock, voice: VoiceMock, keel: KeelMock, train: TrainMock, gateway: GatewayMock };

// Footage is a UI recording, so it is never cropped: it sits whole in its own 16:10 window, framed like a
// screen, and whoever places it gives it room. still: the poster only, for a preview not being looked at.
// Agents is real footage: the new loop, falling back to the film cut. The others are live drawings of their UI.
export function VideoFrame({ src, poster, still, className = 'w-full' }) {
  const media = 'h-full w-full object-contain';
  return (
    <div className={`aspect-[16/10] max-w-full ${className} overflow-hidden rounded-[10px] bg-white shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_-12px_rgba(0,0,0,.25)] ring-1 ring-ink/[.08]`}>
      {still ? <img src={poster} alt="" loading="lazy" decoding="async" className={media} /> : <LoopVideo src={src} poster={poster} className={media} />}
    </div>
  );
}

export default function ProductMedia({ product, still = false, fit }) {
  if (product.key === 'agents') {
    const f = filmFiles('vandijk-approval');
    return <VideoFrame src={['/media/loops/agents.mp4', f.loop]} poster="/media/loops/agents.jpg" still={still} className={fit} />;
  }
  const Mock = MOCKS[product.key];
  return <Mock />;
}
