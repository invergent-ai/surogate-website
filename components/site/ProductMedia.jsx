import LoopVideo from './LoopVideo';
import SurogateMock from './mocks/SurogateMock';
import VoiceMock from './mocks/VoiceMock';
import KeelMock from './mocks/KeelMock';
import TrainMock from './mocks/TrainMock';
import ApiMock from './mocks/ApiMock';
import { filmFiles } from '@/lib/films';

const MOCKS = { surogate: SurogateMock, voice: VoiceMock, keel: KeelMock, train: TrainMock, api: ApiMock };

// Agents is shown working in its real film; the products without footage yet play a mock of their UI.
export default function ProductMedia({ product }) {
  if (product.key === 'agents') {
    const f = filmFiles('vandijk-approval');
    return <LoopVideo src={f.loop} poster={f.poster} className="h-full w-full object-cover" />;
  }
  const Mock = MOCKS[product.key];
  return <Mock />;
}
