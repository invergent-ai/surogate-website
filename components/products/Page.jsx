import { ArrowRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Button from '@/components/site/Button';
import Rabbit from '@/components/site/Rabbit';
import { CONTAINER, H2 } from '@/components/site/Section';

export default function Page({ children }) {
  return (
    <div className="v2 pg-v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export const H1 = 'm-0 text-balance text-[36px] font-[450] leading-[1.08] tracking-[-0.01em] text-ink md:text-[48px] md:leading-[1.05] lg:text-[58px]';
export const SUB = 'mt-5 mb-0 max-w-[620px] text-balance text-[16px] leading-[1.6] text-ink/65 md:text-[18px]';

// The product hero: headline, one line, the actions, then the product itself.
// A rabbit pose sits inline at 1em in the headline on the two pages that have the character.
export function Hero({ name, title, pose, rest, sub, actions, note, children, id }) {
  return (
    <section id={id} className="bg-white">
      <div className={`${CONTAINER} pt-14 pb-16 text-center md:pt-20 md:pb-24`}>
        {name && <p className="load-up m-0 mb-4 text-[15px] font-medium text-ink/60" style={{ '--y': '8px', '--d': '600ms' }}>{name}</p>}
        <h1 className={`${H1} load-up`} style={{ '--y': '10px', '--d': '600ms' }}>
          {pose ? (
            <>
              <span className="whitespace-nowrap">{title}{' '}
                <span className="inline-block h-[0.9em] w-[0.9em] translate-y-[0.1em] text-ink" style={{ '--rabbit-bg': '#fff' }}>
                  <Rabbit pose={pose} size="100%" title="" />
                </span>
              </span>{' '}{rest}
            </>
          ) : title}
        </h1>
        <p className={`${SUB} mx-auto load-up`} style={{ '--y': '12px', '--t': '150ms', '--d': '600ms' }}>{sub}</p>
        <div className="load-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ '--y': '12px', '--t': '250ms', '--d': '600ms' }}>{actions}</div>
        {note && <p className="m-0 mt-4 text-[13px] text-ink/50">{note}</p>}
        {children && <div className="load-fade mt-12 md:mt-16" style={{ '--t': '400ms' }}>{children}</div>}
      </div>
    </section>
  );
}

// A headline over the product and a single line; the visual comes after.
export function Lead({ title, sub, center = false, size = 'list', className = '' }) {
  return (
    <div className={`mb-10 md:mb-12 ${center ? 'mx-auto text-center' : ''} max-w-[680px] ${className}`}>
      <h2 className={H2[size]}>{title}</h2>
      {sub && <p className={`mt-3 mb-0 text-balance text-[16px] leading-[1.6] opacity-65 ${center ? 'mx-auto' : ''}`}>{sub}</p>}
    </div>
  );
}

const COLS = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

// Facts in a row under a hairline, small: the numbers a buyer asks for, each with its condition.
export function Facts({ items, dark = false }) {
  return (
    <dl className={`m-0 grid gap-6 border-t pt-6 sm:grid-cols-2 ${COLS[items.length]} ${dark ? 'border-cream/15' : 'border-hairline'}`}>
      {items.map((f) => (
        <div key={f.l}>
          <dt className="sr-only">{f.l}</dt>
          <dd className="m-0 text-[28px] font-[450] leading-none tracking-[-0.01em] tabular-nums md:text-[32px]">{f.n}</dd>
          <dd className={`m-0 mt-2 text-[14px] leading-[1.5] ${dark ? 'text-cream/60' : 'text-ink/55'}`}>{f.l}</dd>
        </div>
      ))}
    </dl>
  );
}

const UCOLS = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

// Who runs it and for what: one tile per market, small type, the whole tile a link when a page tells more.
export function UseCases({ items }) {
  return (
    <ul className={`m-0 grid list-none gap-3 p-0 sm:grid-cols-2 ${UCOLS[items.length] || 'lg:grid-cols-4'}`}>
      {items.map(({ market, job, line, href }) => {
        const body = (
          <>
            <p className="m-0 text-[13px] text-ink/50">{market}</p>
            <h3 className="m-0 mt-2 text-[15px] font-[500] leading-[1.4]">{job}</h3>
            <p className="m-0 mt-2 text-[14px] leading-[1.55] text-ink/60">{line}</p>
            {href && <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[13px] font-medium text-ink">Read more <ArrowRight size={13} className="nudge" /></span>}
          </>
        );
        return (
          <li key={job} className="flex">
            {href
              ? <a href={href} className="group flex w-full flex-col rounded-2xl bg-ivory p-6 !text-ink no-underline transition-colors duration-150 ease-in-out hover:bg-stone">{body}</a>
              : <div className="flex w-full flex-col rounded-2xl bg-ivory p-6">{body}</div>}
          </li>
        );
      })}
    </ul>
  );
}

// The page's last word: one line, one primary. On the character pages the rabbit's outline peeks over the rule.
export function Closing({ title, line, action, peek }) {
  return (
    <section className="bg-white">
      <div className={`${CONTAINER} pb-16 md:pb-24`}>
        <div className="relative mt-10 rounded-2xl bg-ivory px-6 pt-14 pb-12 text-center md:px-12 md:pt-20 md:pb-16">
          {peek && (
            <span aria-hidden="true" className="peek absolute left-1/2 top-0 h-[64px] w-[64px] -translate-x-1/2 -translate-y-[58%] text-ink" style={{ '--rabbit-bg': '#f9f8f6' }}>
              <Rabbit pose={peek} size={64} />
            </span>
          )}
          <h2 className={`${H2.feature} mx-auto max-w-[18ch]`}>{title}</h2>
          {line && <p className="mx-auto mt-4 mb-0 max-w-[52ch] text-[16px] leading-[1.6] text-ink/65">{line}</p>}
          <div className="mt-8 flex justify-center">{action}</div>
        </div>
      </div>
    </section>
  );
}

export { Button };
