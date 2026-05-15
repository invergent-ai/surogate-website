const INCLUDED = [
  'Full agent runtime',
  'Tool use & code execution',
  'Sandboxed shell environments',
  'Real Chromium browser',
  'Persistent agent workspace',
  'Hub access (read public)',
  'API access',
  'Real-time usage dashboard',
];

const OVERAGES = [
  { resource: 'Tokens beyond your pack', rate: '$2', unit: 'per 1M tokens' },
  { resource: 'Browser-agent time (Standard, Pro)', rate: '$0.04', unit: '/ minute' },
  { resource: 'Browser-agent time (Max)', rate: '$0.03', unit: '/ minute' },
  { resource: 'Agent workspace storage', rate: '$0.05', unit: '/ GB / month' },
  { resource: 'Hub storage', rate: '$0.05', unit: '/ GB / month' },
  { resource: 'Extra concurrent agent', rate: '$12', unit: '/ month / slot' },
  { resource: 'Extra parallel training job', rate: '$10', unit: '/ month / slot' },
];

const ADDONS = [
  {
    name: 'Compute tier upgrade',
    price: '+$15 / mo',
    body: 'Bump your plan’s compute one tier up — e.g., Pro with Premium compute.',
  },
  {
    name: 'Reserved browser',
    price: '+$10 / mo',
    body: 'Skip cold starts. A warm Chromium instance pinned to your account, ready in under a second.',
  },
];

const COMPUTE_TIERS = [
  { tier: 'Starter', spec: '2 vCPU · 4 GB RAM · 40 GB', use: 'Single agent tasks, light research, scripting' },
  { tier: 'Standard', spec: '4 vCPU · 8 GB RAM · 60 GB', use: 'Daily workflows, code agents, document work' },
  { tier: 'Premium', spec: '8 vCPU · 16 GB RAM · 80 GB', use: 'Multi-agent coordination, heavy data work' },
  { tier: 'Ultra', spec: '12 vCPU · 32 GB RAM · 120 GB', use: 'Small teams, enterprise workloads, parallel agents' },
];

const TOKEN_RANGES = [
  { label: 'A quick question + answer', range: '1–5K' },
  { label: 'Research task with browsing', range: '20–100K' },
  { label: 'Multi-step coding task', range: '50–500K' },
  { label: 'Synthetic dataset generation', range: '200K–2M' },
  { label: 'Full day of heavy agent use', range: '300K–1M+' },
  { label: 'Standard token pack covers', range: '25M' },
];

function SectionHeader({ idx, eyebrow, headline, sub, dark }) {
  const eyebrowCls = dark ? 'text-white/55' : 'text-brand-graphite';
  const numCls = dark ? 'text-brand-yellow' : 'text-brand-orange';
  const titleCls = dark ? 'text-white' : 'text-brand-aubergine';
  const subCls = dark ? 'text-white/72' : 'text-brand-graphite';
  return (
    <div className="mb-10 max-w-[820px]">
      <div className={`font-serif text-[11px] font-semibold uppercase tracking-wider-2 ${eyebrowCls}`}>
        <span className={`font-mono mr-2 font-bold ${numCls}`}>{idx}</span>
        {eyebrow}
      </div>
      <h2 className={`reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[32px] sm:text-[40px] lg:text-[48px] ${titleCls}`}>
        {headline}
      </h2>
      {sub && <p className={`reveal mt-4 text-[15px] leading-[1.6] max-w-[64ch] ${subCls}`}>{sub}</p>}
    </div>
  );
}

function IncludedBlock() {
  return (
    <section data-screen-label="05 Included" className="bg-brand-fog py-20 sm:py-24 lg:py-28">
      <div className="max-w-container mx-auto px-8">
        <SectionHeader
          idx="05"
          eyebrow="Included with every plan"
          headline={
            <>
              The basics,{' '}
              <em className="italic font-medium text-brand-orange">fully baked in</em>.
            </>
          }
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
          {INCLUDED.map((f, i) => (
            <li
              key={f}
              className={`reveal flex gap-3 font-mono text-[13px] leading-[1.55] text-brand-aubergine py-3 border-t border-brand-border ${
                i === 0 ? 'sm:[&:nth-child(2)]:border-t lg:[&:nth-child(2)]:border-t lg:[&:nth-child(3)]:border-t' : ''
              }`}
            >
              <span aria-hidden="true" className="shrink-0 text-brand-orange font-semibold">
                +
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OveragesBlock() {
  return (
    <section data-screen-label="06 Overages" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-container mx-auto px-8">
        <SectionHeader
          idx="06"
          eyebrow="Pay as you go"
          headline={
            <>
              Need more?{' '}
              <em className="italic font-medium text-brand-orange">No tier upgrades</em>.
            </>
          }
          sub="Plans cover what most users need. When you go over, you stay in control — no auto-upgrades, no surprise tier changes. Prefer a hard cap? Flip a toggle in settings."
        />

        <div className="reveal max-w-[860px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-brand-aubergine/20">
                <th className="text-left py-4 font-mono text-[11px] uppercase tracking-wider-2 text-brand-steel font-medium">
                  Resource
                </th>
                <th className="text-right py-4 font-mono text-[11px] uppercase tracking-wider-2 text-brand-steel font-medium">
                  Overage rate
                </th>
              </tr>
            </thead>
            <tbody>
              {OVERAGES.map((o) => (
                <tr key={o.resource} className="border-b border-brand-line">
                  <td className="py-4 text-[14px] text-brand-aubergine">{o.resource}</td>
                  <td className="py-4 text-right font-mono text-[13.5px] text-brand-graphite whitespace-nowrap">
                    <span className="font-semibold text-brand-orange">{o.rate}</span>{' '}
                    <span>{o.unit}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="reveal mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {ADDONS.map((a) => (
            <div
              key={a.name}
              className="bg-brand-fog border border-brand-border p-7 lg:p-8 flex flex-col gap-2"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="m-0 font-serif text-[22px] font-semibold tracking-[-0.014em] text-brand-aubergine">
                  {a.name}
                </h4>
                <span className="font-mono text-[13px] font-semibold text-brand-orange whitespace-nowrap">
                  {a.price}
                </span>
              </div>
              <p className="m-0 text-[14px] leading-[1.55] text-brand-graphite">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComputeBlock() {
  return (
    <section
      data-screen-label="07 Compute"
      className="relative overflow-hidden bg-brand-aubergine text-white py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 bg-evening-glow pointer-events-none" />
      <div className="relative max-w-container mx-auto px-8">
        <SectionHeader
          idx="07"
          dark
          eyebrow="Compute tiers"
          headline={
            <>
              Burst,{' '}
              <em className="italic font-medium text-brand-orange">not reservations</em>.
            </>
          }
          sub="Specs are ceilings you can burst into when you need them, not capacity you pay for whether you use it or not."
        />
        <div className="reveal divide-y divide-white/10 border-y border-white/15">
          {COMPUTE_TIERS.map((t) => (
            <div
              key={t.tier}
              className="grid grid-cols-1 lg:grid-cols-[200px_1fr_2fr] gap-2 lg:gap-8 py-6 items-baseline"
            >
              <div className="font-serif text-[22px] font-semibold tracking-[-0.014em] text-white">
                {t.tier}
              </div>
              <div className="font-mono text-[13px] text-brand-yellow">{t.spec}</div>
              <div className="text-[14px] leading-[1.55] text-white/72">{t.use}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TokensBlock() {
  return (
    <section data-screen-label="08 Tokens" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-container mx-auto px-8">
        <SectionHeader
          idx="08"
          eyebrow="How tokens work"
          headline={
            <>
              A token is roughly{' '}
              <em className="italic font-medium text-brand-orange">¾ of a word</em>.
            </>
          }
          sub="Token volumes apply to the model we include with each plan. When you bring your own LLM provider, you pay them directly — no markup from us, no double-billing. Your dashboard shows live consumption either way, broken down by agent and task."
        />
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-x-14">
          {TOKEN_RANGES.map((r) => (
            <div
              key={r.label}
              className="flex flex-wrap items-baseline justify-between gap-4 py-4 border-b border-dashed border-brand-border"
            >
              <span className="text-[14px] leading-[1.5] text-brand-graphite">{r.label}</span>
              <span className="font-mono text-[13.5px] font-semibold text-brand-aubergine whitespace-nowrap">
                {r.range}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingDetails() {
  return (
    <>
      <IncludedBlock />
      <OveragesBlock />
      <ComputeBlock />
      <TokensBlock />
    </>
  );
}
