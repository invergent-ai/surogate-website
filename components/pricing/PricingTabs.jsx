'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Segmented from './Segmented';
import PlanCard from './PlanCard';
import Button from '@/components/site/Button';
import { CONTAINER } from '@/components/site/Section';
import { FaqList } from '@/components/solutions/Faq';
import { PERSONAL_PLANS, TEAM_PLANS, KEEL_PER_CASE, RATES, API_TERMS, PRICING_TABS, usd } from '@/lib/pricing';
import { MARKET } from '@/lib/llmbuzz';
import { CONTACT_SALES, LINKS } from '@/lib/site';
import { track } from '@/lib/analytics';

const BILLING = [{ id: 'monthly', label: 'Monthly' }, { id: 'annual', label: 'Yearly' }];
const ROW = 'flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:overflow-visible md:pb-0';
const NOTE = 'm-0 text-[13px] leading-[1.6] text-ink/55';

function Billing({ billing, setBilling }) {
  return <Segmented options={BILLING} value={billing} onChange={setBilling} label="Billing period" size="sm" role="radiogroup" />;
}

function Individual({ billing, setBilling }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className={NOTE}>One person. Usage included.</p>
        <Billing billing={billing} setBilling={setBilling} />
      </div>
      <div className={`${ROW} md:grid-cols-4`}>
        {PERSONAL_PLANS.map((p) => <PlanCard key={p.id} plan={p} billing={billing} tab="individual" />)}
      </div>
      <p className={`${NOTE} mt-5`}>Prices include VAT. EU businesses with a VAT ID and customers outside the EU pay the net price.</p>
    </>
  );
}

function Teams({ billing, setBilling }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className={NOTE}>Per organisation. Unlimited users and agents.</p>
        <Billing billing={billing} setBilling={setBilling} />
      </div>
      <div className={`${ROW} md:grid-cols-4`}>
        {TEAM_PLANS.map((p) => <PlanCard key={p.id} plan={p} billing={billing} tab="teams" />)}
        <article className="flex w-[84%] shrink-0 snap-start flex-col rounded-2xl bg-white p-6 sm:w-[46%] md:w-auto">
          <h3 className="m-0 text-[16px] font-[500]">Keel, per case</h3>
          <p className="m-0 mt-2 text-[13px] leading-[1.4] text-ink/55">Per completed case, on any cloud plan.</p>
          <dl className="m-0 mt-5 border-t border-hairline">
            {KEEL_PER_CASE.map((t) => (
              <div key={t.upTo} className="flex items-baseline justify-between gap-3 border-b border-hairline py-3">
                <dt className="text-[13px] text-ink/70">{t.upTo}</dt>
                <dd className="m-0 text-[18px] font-[450] [font-variant-numeric:tabular-nums]">{usd(t.price)}</dd>
              </div>
            ))}
          </dl>
          <p className="m-0 mt-4 text-[13px] leading-[1.5] text-ink/55">Model calls inside a case are billed at cost, like any other session.</p>
          <Button href="/keel/" variant="secondary" size="lg" className="mt-auto w-full">See how Keel works</Button>
        </article>
      </div>
      <div className="mt-5">
        <p className={NOTE}>Models: bring your own provider, or use ours at the provider’s price. More at the usual rates: {RATES.map((r) => `${r.what.toLowerCase()} ${r.price} ${r.per}`).join(', ')}.</p>
      </div>
    </>
  );
}

const ENTERPRISE = [
  'The whole platform on your Kubernetes',
  'Air-gapped, with the models included',
  'Single sign-on, roles and audit logs',
  'Surogate 3.7, Jackrabbit and Amami on your GPUs',
  'Keel for processes with approvals',
  'A partner near you, or our own engineers',
];

function Enterprise() {
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-6 md:grid-cols-[5fr_7fr] md:gap-12 md:p-10">
      <div className="flex flex-col">
        <h3 className="m-0 text-[16px] font-[500]">On your infrastructure</h3>
        <p className="m-0 mt-4 text-[40px] font-[450] leading-none tracking-[-0.02em]">By quote</p>
        <p className="m-0 mt-3 max-w-[34ch] text-[14px] leading-[1.5] text-ink/65">A yearly licence for your cloud, your servers or an air-gapped network, priced after a call about your setup.</p>
        <Button href={CONTACT_SALES} size="lg" arrow event="contact_sales_clicked" eventProps={{ location: 'pricing_enterprise' }} className="mt-8 w-full md:w-fit">Contact Sales</Button>
      </div>
      <ul className="m-0 mt-6 list-none border-t border-hairline p-0 md:mt-0">
        {ENTERPRISE.map((x) => (
          <li key={x} className="flex gap-2.5 border-b border-hairline py-3.5 text-[14px] text-ink/75"><Check size={15} className="mt-[3px] shrink-0 text-ink/60" />{x}</li>
        ))}
      </ul>
    </div>
  );
}

function Api() {
  const terms = [
    { n: API_TERMS.markup, l: 'markup on tokens. You pay the price each provider posts.' },
    { n: API_TERMS.topUpFee, l: 'fee on each credit top-up.' },
    { n: 'EU', l: 'providers only, on every plan, when you turn it on.' },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-[5fr_7fr]">
      <div className="flex flex-col rounded-2xl bg-white p-6 md:p-8">
        <h3 className="m-0 text-[16px] font-[500]">Pay as you go, on llm.buzz</h3>
        <dl className="m-0 mt-5">
          {terms.map((t) => (
            <div key={t.l} className="flex items-baseline gap-4 border-b border-hairline py-3.5 first:border-t">
              <dt className="w-[72px] shrink-0 text-[24px] font-[450] [font-variant-numeric:tabular-nums]">{t.n}</dt>
              <dd className="m-0 text-[14px] leading-[1.45] text-ink/65">{t.l}</dd>
            </div>
          ))}
        </dl>
        <Button href={LINKS.apiKey} external size="lg" arrow event="cta_api_key_clicked" eventProps={{ location: 'pricing_api' }} className="mt-8 w-full md:w-fit">Get API key</Button>
      </div>
      <div className="rounded-2xl bg-white p-6 md:p-8">
        <h3 className="m-0 text-[16px] font-[500]">One model, {MARKET.providers.length} providers, their own prices</h3>
        <p className="m-0 mt-1.5 text-[13px] text-ink/55"><span className="font-mono">{MARKET.model}</span>, input price per million tokens. The router compares them on every request.</p>
        <table className="mt-5 w-full border-collapse text-left text-[14px] [font-variant-numeric:tabular-nums]">
          <thead><tr className="border-b border-hairline text-[12px] text-ink/50"><th className="py-2 font-normal">Provider</th><th className="py-2 text-right font-normal">Input</th><th className="py-2 text-right font-normal">First token</th></tr></thead>
          <tbody>
            {MARKET.providers.map((p) => (
              <tr key={p.name} className="border-b border-hairline">
                <td className="py-2.5">{p.name}</td><td className="py-2.5 text-right">{p.input}</td><td className="py-2.5 text-right">{p.firstToken.toFixed(2)} s</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="m-0 mt-4 text-[12px] text-ink/45">First token is the 24-hour median. From <a href={MARKET.source} target="_blank" rel="noopener noreferrer" className="!text-ink/60 underline underline-offset-2">llm.buzz</a>, {MARKET.taken}.</p>
        <a href="https://llm.buzz/providers/join" target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center text-[14px] font-medium !text-ink no-underline">Serve models? Sell your inference<span aria-hidden="true" className="nudge ml-1">›</span></a>
      </div>
    </div>
  );
}

const PANELS = { individual: Individual, teams: Teams, enterprise: Enterprise, api: Api };
const valid = (h) => PRICING_TABS.some((t) => t.id === h);

export default function PricingTabs() {
  const [tab, setTab] = useState('individual');
  const [billing, setBilling] = useState('monthly');
  useEffect(() => {
    const fromHash = () => { const h = location.hash.slice(1); if (valid(h)) setTab(h); };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);
  const choose = (id) => {
    setTab(id);
    history.replaceState(null, '', `#${id}`);
    track('pricing_tab_selected', { tab: id });
  };
  const current = PRICING_TABS.find((t) => t.id === tab);
  return (
    <>
      <section className="bg-white">
        <div className={`${CONTAINER} pt-14 pb-10 text-center md:pt-20 md:pb-12`}>
          <h1 className="load-up m-0 text-[36px] font-[450] leading-[1.08] tracking-[-0.01em] md:text-[56px] md:leading-[1.04]">Pricing</h1>
          <p className="load-up mx-auto mt-4 mb-0 max-w-[520px] text-[16px] leading-[1.6] text-ink/65 md:text-[18px]" style={{ '--t': '100ms' }}>
            One price per person or per organisation. Models at the provider’s price.
          </p>
          <div className="load-up mt-8 max-w-full overflow-x-auto" style={{ '--t': '200ms' }}>
            <Segmented options={PRICING_TABS} value={tab} onChange={choose} label="Plans for" controls={(id) => id} />
          </div>
        </div>
      </section>
      <section className="bg-ivory">
        {/* Every panel sits in the same grid cell, so the area is always the tallest one's height and nothing below moves. */}
        <div className={`${CONTAINER} grid py-10 md:py-14`}>
          {PRICING_TABS.map((t) => {
            const Panel = PANELS[t.id];
            const on = t.id === tab;
            return (
              <div key={t.id} id={t.id} role="tabpanel" aria-label={t.label} inert={!on}
                className={`min-w-0 [grid-area:1/1] transition-opacity duration-300 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none ${on ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                <Panel billing={billing} setBilling={setBilling} />
              </div>
            );
          })}
        </div>
      </section>
      <section className="bg-white">
        <div className={`${CONTAINER} grid items-start gap-8 py-16 md:py-24 lg:grid-cols-[4fr_8fr] lg:gap-16`}>
          <h2 className="m-0 text-[28px] font-[500] leading-[1.15] tracking-[-0.01em] md:text-[30px] md:leading-[36px]">Questions about {current.id === 'api' ? 'the AI Gateway' : `${current.label} plans`}.</h2>
          <FaqList key={tab} items={current.faq} />
        </div>
      </section>
    </>
  );
}
