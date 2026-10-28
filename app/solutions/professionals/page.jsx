import { Check } from 'lucide-react';
import Shell from '@/components/solutions/Shell';
import Hero from '@/components/solutions/Hero';
import FilmCard from '@/components/solutions/FilmCard';
import Section, { H2, SectionHead } from '@/components/site/Section';
import Button from '@/components/site/Button';
import GetStarted from '@/components/site/GetStarted';
import metaFor from '@/components/solutions/meta';
import { PROFESSIONS } from '@/lib/solutions';
import { PERSONAL_PLANS, SELLING_PLAN } from '@/lib/pricing';
import { SIGN_IN } from '@/lib/site';

const location = 'solutions_professionals';

export const metadata = metaFor('/solutions/professionals/');

// Sold from the Agents page's "sell your agent" section; the plan that allows it comes from lib/pricing.
const SELL = [
  'Put a price on it and share a link. Buyers do not need a Surogate account.',
  'Subscriptions, usage packs or both, in seven currencies. You are the merchant of record.',
  'Each offer unlocks the channels, tools, knowledge and model tier you choose.',
];

export default function ProfessionalsPage() {
  return (
    <Shell>
      <Hero label="Professionals" h1="An agent for your practice." location={location}
        sub="It answers clients from your file, chases what is missing, and brings you only what needs you."
        primary={{ label: 'Try for free', href: SIGN_IN, event: 'cta_signup_clicked' }}
        secondary={{ label: 'See personal plans', href: '/pricing/#individual' }}
        trust={PROFESSIONS.map((p) => ({ label: p.name, href: `#${p.id}` }))} />
      {PROFESSIONS.map((p, i) => (
        <Section key={p.id} id={p.id} tone={i % 2 ? 'grey' : 'light'} className="scroll-mt-16"
          inner="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={i % 2 ? 'lg:order-2' : ''}>
            <h2 className={H2.feature}>{p.h2}</h2>
            <p className="mt-4 mb-0 max-w-[44ch] text-[16px] leading-[1.6] text-ink/65 md:text-[17px]">{p.line}</p>
            <ul className="m-0 mt-7 flex list-none flex-col gap-3 p-0 text-[15px] text-ink/75">
              {p.jobs.map((j) => <li key={j} className="flex gap-2.5"><Check size={16} className="mt-[3px] shrink-0 text-ink" />{j}</li>)}
            </ul>
          </div>
          <FilmCard slug={p.film} />
        </Section>
      ))}
      <Section tone="aubergine" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.feature}>Sell your agent.</h2>
          <p className="mt-4 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-white/70">
            Clients subscribe to you, and the money goes to your account. From {SELLING_PLAN.name}, ${SELLING_PLAN.price.monthly} a month.
          </p>
          <div className="mt-7"><Button href="/pricing/#individual" variant="sun" size="lg" arrow>Compare plans</Button></div>
        </div>
        <ul className="m-0 list-none border-t border-white/15 p-0">
          {SELL.map((x) => <li key={x} className="border-b border-white/15 py-5 text-[16px] leading-[1.55] text-white/85">{x}</li>)}
        </ul>
      </Section>
      <Section>
        <SectionHead title="Plans for one person." sub="Prices include VAT. Yearly billing costs less." />
        <ul className="m-0 grid list-none grid-cols-2 border-t border-hairline p-0 lg:grid-cols-4">
          {PERSONAL_PLANS.map((p) => (
            <li key={p.id} className="border-b border-hairline py-5 pr-4 lg:border-b-0">
              <span className="block text-[15px] font-medium">{p.name}</span>
              <span className="mt-1 block text-[28px] font-[450] tracking-[-0.01em] [font-variant-numeric:tabular-nums]">${p.price.monthly}<span className="text-[14px] text-ink/50">{p.price.monthly ? ' / month' : ''}</span></span>
              <span className="mt-1 block text-[13px] leading-[1.5] text-ink/55">{p.best}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="grey">
        <SectionHead title="Choose how to get started." align="center" />
        <GetStarted location={location} />
      </Section>
    </Shell>
  );
}
