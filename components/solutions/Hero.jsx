import Button, { Arrow } from '@/components/site/Button';
import { CONTAINER } from '@/components/site/Section';
import { CONTACT_SALES } from '@/lib/site';

export const H1 = 'm-0 max-w-[16ch] text-balance text-[36px] font-[450] leading-[1.08] tracking-[-0.01em] md:text-[56px] md:leading-[1.04]';

// Left-aligned: who it is for, the headline, one primary action, and the facts a buyer checks first.
export default function Hero({ label, h1, sub, trust = [], primary, secondary, location, visual }) {
  const main = primary || { label: 'Contact Sales', href: CONTACT_SALES, event: 'contact_sales_clicked' };
  return (
    <section className="bg-white">
      <div className={`${CONTAINER} grid items-center gap-12 pt-14 pb-16 md:pt-24 md:pb-24 ${visual ? 'lg:grid-cols-[1fr_1fr] lg:gap-16' : ''}`}>
        <div>
        {label && <p className="load-up m-0 text-[14px] font-medium text-ink/55">{label}</p>}
        <h1 className={`${H1} load-up mt-3`} style={{ '--t': '60ms', '--d': '650ms' }}>{h1}</h1>
        <p className="load-up mt-5 mb-0 max-w-[560px] text-balance text-[17px] leading-[1.6] text-ink/65 md:text-[18px]" style={{ '--t': '160ms', '--d': '650ms' }}>{sub}</p>
        <div className="load-up mt-8 flex flex-wrap gap-3" style={{ '--t': '260ms', '--d': '650ms' }}>
          <Button href={main.href} size="lg" arrow event={main.event} external={main.external} eventProps={{ location }}>{main.label}</Button>
          {secondary && <Button href={secondary.href} size="lg" variant="secondary" event={secondary.event} external={secondary.external} eventProps={{ location }}>{secondary.label}</Button>}
        </div>
        {trust.length > 0 && (
          <ul className="load-fade m-0 mt-12 grid max-w-[560px] list-none grid-cols-2 gap-x-6 gap-y-2.5 border-t border-hairline p-0 pt-5 text-[14px] text-ink/60" style={{ '--t': '400ms' }}>
            {trust.map((t) => (t.href
              ? <li key={t.label}><a href={t.href} className="group inline-flex min-h-6 items-center gap-1 font-medium !text-ink no-underline">{t.label}<Arrow /></a></li>
              : <li key={t}>{t}</li>))}
          </ul>
        )}
        </div>
        {visual && <div className="load-fade min-w-0" style={{ '--t': '300ms' }}>{visual}</div>}
      </div>
    </section>
  );
}
