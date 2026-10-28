import { H1 } from '@/components/solutions/Hero';
import { CONTAINER } from '@/components/site/Section';

// A <button> that looks like the site's Button, for actions that play audio rather than navigate.
export const BTN = {
  primary: 'group inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border-0 bg-ink px-5 text-[14px] font-medium !text-white transition duration-150 ease-in-out hover:brightness-90',
};

// The labs heroes: the template's H1 and copy on the left, the model's own mark on the right, facts below.
export default function LabsHero({ title, sub, actions, visual, children }) {
  return (
    <section className="bg-white">
      <div className={`${CONTAINER} pt-14 pb-16 md:pt-24 md:pb-24`}>
        <div className={`grid items-center gap-12 ${visual ? 'lg:grid-cols-[1.35fr_1fr] lg:gap-16' : ''}`}>
          <div className="load-up" style={{ '--d': '650ms' }}>
            <h1 className={H1}>{title}</h1>
            <p className="m-0 mt-5 max-w-[56ch] text-balance text-[17px] leading-[1.6] text-ink/65 md:text-[18px]">{sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          </div>
          {visual && <div className="load-fade min-w-0" style={{ '--t': '200ms' }}>{visual}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

// Hero facts as one hairline strip: the figure, then what it measures.
export function HeroFacts({ items }) {
  return (
    <dl className="load-fade m-0 mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:mt-16 lg:grid-cols-4" style={{ '--t': '350ms' }}>
      {items.map((f) => (
        <div key={f.l} className="flex flex-col bg-white p-5 md:p-6">
          <dt className="order-2 mt-2 text-[13px] leading-[1.45] text-ink/60">{f.l}</dt>
          <dd className="order-1 m-0 text-[24px] font-[450] leading-none tracking-[-0.01em] tabular-nums md:text-[30px]">{f.n}</dd>
        </div>
      ))}
    </dl>
  );
}
