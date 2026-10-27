import ProductMedia from '@/components/site/ProductMedia';
import { product } from '@/lib/solutions';

const SURFACE = { ivory: 'bg-stone text-ink', night: 'bg-night text-cream', ink: 'bg-ink text-cream' };

// A product's live drawing on its own surface, at a fixed height so the hero never moves.
export default function ProductPanel({ k, caption }) {
  const p = product(k);
  return (
    <figure className="m-0">
      <div className={`relative h-[260px] overflow-hidden rounded-2xl md:h-[340px] ${SURFACE[p.tone]}`} aria-hidden="true">
        {k === 'agents'
          ? <div className="absolute inset-6 flex items-center justify-center [container-type:size]"><ProductMedia product={p} fit="w-[min(100cqw,160cqh)]" /></div>
          : <div className="absolute inset-0"><ProductMedia product={p} /></div>}
      </div>
      <figcaption className="mt-3 text-[13px] text-ink/55">{caption || `${p.name}: ${p.line}`}</figcaption>
    </figure>
  );
}
