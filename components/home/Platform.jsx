'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Section, { SectionHead } from '@/components/site/Section';
import KeelMock from '@/components/site/mocks/KeelMock';
import TrainMock from '@/components/site/mocks/TrainMock';
import SurogateMock from '@/components/site/mocks/SurogateMock';
import Rabbit from '@/components/site/Rabbit';
import GoldPhoto from '@/components/site/GoldPhoto';
import RuneGlyph from '@/components/labs/RuneGlyph';
import { AUDIT, CASE } from '@/components/products/keel/vandijk';
import { PRODUCTS } from '@/lib/products';
import { ENGINE, FLASH } from '@/lib/labs';

const P = Object.fromEntries(PRODUCTS.map((p) => [p.key, p]));

function Explore({ href, children = 'Explore', dark }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-1.5 text-[14px] font-medium no-underline ${dark ? '!text-white' : '!text-ink'}`}>
      {children} <ArrowRight size={14} className="nudge" />
    </a>
  );
}

// A product inside a layer: its name and its menu line, as the Products menu writes them.
function Item({ p, dark }) {
  return (
    <a href={p.href} className={`group block border-t py-3 no-underline ${dark ? 'border-white/10 !text-white' : 'border-ink/10 !text-ink'}`}>
      <span className="flex items-center justify-between text-[15px] font-medium">{p.name}<ArrowRight size={14} className="nudge opacity-40 group-hover:opacity-100" /></span>
      <span className={`mt-0.5 block text-[13px] leading-[1.45] ${dark ? 'text-white/60' : 'text-ink/60'}`}>{p.line}</span>
    </a>
  );
}

// The audit trail under the console: the Van Dijk case's own entries, one arriving every few seconds.
function Audit() {
  const [n, setN] = useState(AUDIT.length);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(1);
    const t = setInterval(() => setN((k) => (k % AUDIT.length) + 1), 2400);
    return () => clearInterval(t);
  }, []);
  const shown = AUDIT.slice(0, n).slice(-3);
  return (
    <ol className="m-0 flex list-none flex-col gap-1 p-0 font-mono text-[11px] leading-[1.5]">
      {shown.map(([who, what]) => (
        <li key={what} className="audit-in flex gap-3 text-ink/70">
          <span className="w-12 shrink-0 text-ink/40">{who}</span><span className="truncate">{what}</span>
        </li>
      ))}
    </ol>
  );
}

// The enterprise layer as one operations console: who is working, the process they run, and the trail it leaves.
function Console() {
  const roster = [['Supplier payments', 'keel'], ['Customer calls', 'voice'], ['Team agents', 'agents']];
  return (
    <div className="flex h-full overflow-hidden rounded-xl bg-white text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)] ring-1 ring-white/10">
      <aside className="hidden w-[180px] shrink-0 flex-col gap-1 border-r border-hairline bg-stone/60 p-3 md:flex">
        <p className="m-0 mb-2 px-2 text-[12px] font-medium">{CASE.business}</p>
        {roster.map(([name, key], i) => (
          <span key={name} className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[12px] ${i === 0 ? 'bg-white font-medium shadow-sm' : 'text-ink/60'}`}>
            {name}<span className="text-[10px] text-ink/40">{P[key].name}</span>
          </span>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5 text-[12px]">
          <span><span className="text-ink/45">Processes /</span> <span className="font-medium">Supplier payments</span></span>
          <span className="text-ink/45">{P.keel.name}</span>
        </div>
        <div className="relative min-h-[200px] flex-1 bg-stone"><KeelMock /></div>
        <div className="border-t border-hairline px-4 py-3"><Audit /></div>
      </div>
    </div>
  );
}

function Enterprise() {
  return (
    <li className="relative overflow-hidden rounded-[14px] bg-ink text-white lg:col-span-12">
      <GoldPhoto slug="banking-team-window-silhouettes" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,.82)_0%,rgba(10,10,10,.55)_45%,rgba(10,10,10,.25)_100%)]" />
      <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div className="flex flex-col">
          <h3 className="m-0 text-[28px] font-[500] leading-[1.1] tracking-[-0.01em] md:text-[36px]">{P.agents.line}</h3>
          <div className="mt-8">
            {['agents', 'keel', 'voice'].map((k) => <Item key={k} p={P[k]} dark />)}
          </div>
          <div className="mt-auto pt-8"><Explore href="/solutions/enterprise/" dark>Enterprise</Explore></div>
        </div>
        {/* The console sits on a pane of frosted glass over the photo. */}
        <div className="min-h-[380px] rounded-[16px] border border-white/20 bg-white/10 p-2 backdrop-blur-xl lg:min-h-[460px]"><Console /></div>
      </div>
    </li>
  );
}

function Build() {
  return (
    <li className="flex flex-col overflow-hidden rounded-[14px] bg-stone lg:col-span-7">
      <div className="p-6 md:p-8">
        <h3 className="m-0 max-w-[22ch] text-[24px] font-[500] leading-[1.15] tracking-[-0.01em] md:text-[28px]">{P.train.line}</h3>
        <dl className="m-0 mt-5 flex flex-wrap gap-x-8 gap-y-2">
          {ENGINE.facts.slice(0, 2).map((f) => (
            <div key={f.l}><dt className="sr-only">{f.l}</dt><dd className="m-0 text-[22px] font-[500] tabular-nums">{f.n}</dd><span className="text-[12px] text-ink/55">{f.l}</span></div>
          ))}
        </dl>
      </div>
      <div className="mx-6 h-[220px] overflow-hidden rounded-[12px] bg-ink md:mx-8"><TrainMock /></div>
      <div className="mt-auto px-6 pt-4 pb-6 md:px-8">
        {['train', 'gateway'].map((k) => <Item key={k} p={P[k]} />)}
      </div>
    </li>
  );
}

const FAMILY = [
  { name: 'Jackrabbit', what: 'Speech recognition', mark: <img src="/labs/speech/jackrabbit.svg" alt="" className="h-6 w-6" /> },
  { name: 'Amami', what: 'Text to speech', mark: <img src="/labs/speech/amami.svg" alt="" className="h-6 w-6" /> },
  { name: 'Rune', what: 'A decision model that sees', mark: <RuneGlyph className="h-6 w-6 [&_*]:fill-none [&_*]:stroke-current [&_*]:[stroke-width:10] [&_circle]:[stroke-width:6] [&_circle]:opacity-40 text-white" /> },
];

function Models() {
  return (
    <li className="relative flex flex-col overflow-hidden rounded-[14px] bg-aubergine text-white lg:col-span-5">
      <GoldPhoto slug="hero-reflection-city-night" tone="plum" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,10,28,.35)_0%,rgba(26,10,28,.75)_100%)]" />
      <div className="relative p-6 md:p-8">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-[12px] border border-white/20 bg-white/10 backdrop-blur-xl"><Rabbit size={30} className="text-sun" /></span>
          <div>
            <p className="m-0 text-[24px] font-[500] leading-tight tracking-[-0.01em] md:text-[28px]">Surogate 3.7 Flash</p>
            <p className="m-0 mt-0.5 font-mono text-[12px] text-white/50">{FLASH.model}</p>
          </div>
        </div>
        <dl className="m-0 mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-[12px] border border-white/20 bg-white/15 backdrop-blur-xl">
          {FLASH.facts.map((f) => (
            <div key={f.l} className="bg-aubergine/40 px-3 py-3">
              <dd className="m-0 text-[18px] font-[500] tabular-nums">{f.n}</dd>
              <dt className="text-[11px] text-white/55">{f.l}</dt>
            </div>
          ))}
        </dl>
      </div>
      <ul className="relative m-0 list-none p-0">
        {FAMILY.map((m) => (
          <li key={m.name} className="flex items-center gap-3 border-t border-white/10 px-6 py-3 md:px-8">
            <span className="flex h-6 w-6 items-center justify-center">{m.mark}</span>
            <span className="text-[15px] font-medium">{m.name}</span>
            <span className="ml-auto text-[13px] text-white/55">{m.what}</span>
          </li>
        ))}
      </ul>
      <div className="relative mt-auto flex flex-wrap gap-x-6 gap-y-2 px-6 pt-6 pb-6 md:px-8">
        <Explore href="/labs/" dark>Research</Explore>
        <Explore href="/solutions/custom-models/" dark>Custom Models</Explore>
      </div>
    </li>
  );
}

// Where it can run, as one rail: the further right, the closer to the customer's own walls.
const PLACES = [
  { name: 'Our EU cloud', line: 'Hosted and run by us in the EU. Your teams start working without an install project.' },
  { name: 'Your cloud', line: 'The whole platform on your Kubernetes, in your account and region, under your security policies.' },
  { name: 'Your hardware', line: 'Our models on your GPUs. Prompts and documents never leave your building.' },
  { name: 'Air-gapped', line: 'No connection out. Agents, Keel and the models run inside a closed network.' },
];

function Anywhere() {
  return (
    <li className="overflow-hidden rounded-[14px] border border-hairline bg-white lg:col-span-12">
      <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div>
          <h3 className="m-0 text-[24px] font-[500] leading-[1.15] tracking-[-0.01em] md:text-[28px]">Runs where your data is.</h3>
        </div>
        <ol className="relative m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <span aria-hidden="true" className="absolute inset-x-0 top-[7px] hidden h-px bg-hairline lg:block" />
          {PLACES.map((s, i) => (
            <li key={s.name} className="relative">
              <span aria-hidden="true" className={`relative block h-[15px] w-[15px] rounded-full border-2 ${i === 3 ? 'border-sun bg-sun' : 'border-ink bg-white'}`} />
              <p className="m-0 mt-4 text-[15px] font-medium">{s.name}</p>
              <p className="m-0 mt-1 text-[13px] leading-[1.5] text-ink/60">{s.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </li>
  );
}

// The self-serve door, kept small on purpose: the platform's own cloud and the desktop agent, for people who build
// agents for their own work and sell them to others.
function SelfServe() {
  return (
    <li className="overflow-hidden rounded-[14px] bg-stone lg:col-span-12">
      <div className="grid items-center gap-6 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:p-8">
        <div>
          <p className="m-0 text-[18px] font-[500] leading-[1.3]">{P.surogate.line}</p>
        </div>
        <div className="relative hidden h-[120px] overflow-hidden rounded-xl bg-white md:block"><SurogateMock /></div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Explore href="/surogate-desktop/">Surogate Desktop</Explore>
          <Explore href="/partners/">Partners</Explore>
        </div>
      </div>
    </li>
  );
}

export default function Platform() {
  return (
    <Section id="platform" divider={false}>
      <SectionHead title="The platform." />
      <ul className="m-0 grid list-none gap-3 p-0 lg:grid-cols-12">
        <Enterprise />
        <Build />
        <Models />
        <Anywhere />
        <SelfServe />
      </ul>
    </Section>
  );
}
