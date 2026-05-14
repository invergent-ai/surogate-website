const INCLUDED = [
  'Full agent runtime with tool use, file I/O, and code execution',
  'Sandboxed shell environments for agent tasks',
  'Real Chromium browser for agents that need the web',
  'Persistent agent workspace storage',
  'Hub access (read public, private storage per tier)',
  'API access',
  'Usage dashboard with real-time metering',
];

const OVERAGES = [
  { resource: 'Tokens', rate: '$2', unit: 'per 1M additional tokens' },
  { resource: 'Browser-agent time', rate: '$0.04', unit: '/ min · Standard, Pro  ·  $0.03 / min · Max' },
  { resource: 'Agent workspace storage', rate: '$0.05', unit: 'per GB / month above your plan' },
  { resource: 'Hub storage', rate: '$0.05', unit: 'per GB / month above your plan' },
  { resource: 'Extra concurrent agent', rate: '$12', unit: '/ month per slot' },
  { resource: 'Extra parallel training job', rate: '$10', unit: '/ month per slot' },
];

const ADDONS = [
  {
    name: 'Compute tier upgrade',
    price: '+$15/mo',
    body: 'Bump your plan&apos;s compute one tier up (e.g., Pro with Premium compute).',
  },
  {
    name: 'Reserved browser',
    price: '+$10/mo',
    body: 'Skip cold starts. A warm Chromium instance pinned to your account, ready in under a second.',
  },
];

const COMPUTE_TIERS = [
  { tier: 'Starter', spec: '2 vCPU / 4 GB / 40 GB', use: 'Single agent tasks, light research, scripting' },
  { tier: 'Standard', spec: '4 vCPU / 8 GB / 60 GB', use: 'Daily workflows, code agents, document work' },
  { tier: 'Premium', spec: '8 vCPU / 16 GB / 80 GB', use: 'Multi-agent coordination, heavy data work' },
  { tier: 'Ultra', spec: '12 vCPU / 32 GB / 120 GB', use: 'Small teams, enterprise workloads, parallel agents' },
];

const TOKEN_RANGES = [
  { label: 'Quick question + answer', range: '1–5K tokens' },
  { label: 'Research task with browsing', range: '20–100K tokens' },
  { label: 'Multi-step coding task', range: '50–500K tokens' },
  { label: 'Synthetic dataset run', range: '200K–2M tokens' },
  { label: 'Full day of heavy agent use', range: '300K–1M+ tokens' },
];

function SectionHeader({ idx, eyebrow, headline, sub, dark }) {
  const eyebrowCls = dark ? 'text-white/55' : 'text-brand-graphite';
  const numCls = dark ? 'text-brand-yellow' : 'text-brand-orange';
  const titleCls = dark ? 'text-white' : 'text-brand-aubergine';
  const subCls = dark ? 'text-white/72' : 'text-brand-graphite';
  return (
    <div className="mb-10 max-w-[760px]">
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
    <section data-screen-label="03 Included" className="bg-brand-fog py-20 sm:py-24 lg:py-28">
      <div className="max-w-container mx-auto px-8">
        <SectionHeader
          idx="03"
          eyebrow="Included in every plan"
          headline="Same engine in every seat."
          sub="The runtime, the browser, the workspace, the hub, the API — none of it is gated behind a higher tier. You pay for scale, not access."
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
          {INCLUDED.map((f) => (
            <li
              key={f}
              className="reveal flex gap-3 text-[14.5px] leading-[1.55] text-brand-aubergine py-2 border-t border-brand-border first:border-t-0 sm:first:border-t lg:first:border-t-0"
            >
              <span aria-hidden="true" className="shrink-0 mt-[3px] text-brand-orange">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 8.5 6.5 12 13 4.5" />
                </svg>
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
    <section data-screen-label="04 Overages" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-container mx-auto px-8">
        <SectionHeader
          idx="04"
          eyebrow="Need more? Pay as you go."
          headline="No auto-upgrades. No surprise tier changes."
          sub="Plans cover what most users need. When you go over, your agents keep running on overage rates by default — or flip a toggle for a hard cap."
        />

        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-px bg-brand-border border border-brand-border">
          {OVERAGES.map((o) => (
            <div key={o.resource} className="bg-white p-6 lg:px-7 lg:py-6 flex flex-col gap-1">
              <div className="font-mono text-[10px] uppercase tracking-wider-2 text-brand-steel">
                {o.resource}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-[32px] font-semibold leading-none tracking-[-0.018em] text-brand-aubergine">
                  {o.rate}
                </span>
                <span className="text-[13px] text-brand-graphite leading-[1.4]">{o.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="font-mono text-[10px] uppercase tracking-wider-2 text-brand-steel md:col-span-2">
            Optional add-ons
          </div>
          {ADDONS.map((a) => (
            <div
              key={a.name}
              className="bg-brand-fog border border-brand-border p-6 lg:p-7 flex flex-col gap-2"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="m-0 font-serif text-[20px] font-semibold tracking-[-0.014em] text-brand-aubergine">
                  {a.name}
                </h4>
                <span className="font-mono text-[12px] font-semibold text-brand-orange">
                  {a.price}
                </span>
              </div>
              <p className="m-0 text-[14px] leading-[1.55] text-brand-graphite">
                {a.body.replace('&apos;', '’')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComputeAndTokensBlock() {
  return (
    <section data-screen-label="05 Compute & tokens" className="bg-brand-aubergine text-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-container mx-auto px-8">
        <div className="grid gap-12 lg:gap-16 grid-cols-1 lg:grid-cols-2">
          <div>
            <SectionHeader
              idx="05"
              dark
              eyebrow="Compute tiers, in plain English"
              headline={
                <>
                  Burst ceilings, <em className="italic font-medium text-brand-orange">not reservations.</em>
                </>
              }
              sub="You get what you need when you need it. You're not paying for idle capacity."
            />
            <div className="reveal divide-y divide-white/10 border-y border-white/10">
              {COMPUTE_TIERS.map((t) => (
                <div key={t.tier} className="grid grid-cols-12 gap-4 py-4 items-baseline">
                  <div className="col-span-3 font-serif text-[18px] font-semibold tracking-[-0.012em] text-white">
                    {t.tier}
                  </div>
                  <div className="col-span-5 font-mono text-[12px] text-brand-yellow">{t.spec}</div>
                  <div className="col-span-12 sm:col-span-4 text-[13.5px] leading-[1.5] text-white/72">
                    {t.use}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              idx="06"
              dark
              eyebrow="How tokens work"
              headline={
                <>
                  Roughly <em className="italic font-medium text-brand-orange">¾ of a word</em> each.
                </>
              }
              sub="The dashboard breaks usage down by agent and task in real time, so you always know where you stand."
            />
            <div className="reveal divide-y divide-white/10 border-y border-white/10">
              {TOKEN_RANGES.map((r) => (
                <div key={r.label} className="flex flex-wrap items-baseline justify-between gap-4 py-4">
                  <span className="text-[14.5px] leading-[1.5] text-white/82">{r.label}</span>
                  <span className="font-mono text-[12px] font-semibold text-brand-yellow">{r.range}</span>
                </div>
              ))}
            </div>
          </div>
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
      <ComputeAndTokensBlock />
    </>
  );
}
