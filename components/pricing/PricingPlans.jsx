const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, annual: 0, first: 0 },
    blurb: 'Try it without a card.',
    cta: { label: 'Start free', href: '/#signup' },
    best: 'Kicking the tires, building a quick demo, browsing the model hub.',
    features: [
      '500K tokens per month',
      'Starter compute (burst), 1 concurrent agent',
      '10 GB agent workspace',
      '30 minutes of browser-agent time',
      'Community support',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: { monthly: 29, annual: 24, first: 14 },
    blurb: 'Personal projects, entry-level automations, experimenters.',
    cta: { label: 'Choose Standard', href: '/#signup' },
    best: 'Personal projects, entry-level automations, developers experimenting with custom models.',
    features: [
      '10M tokens per month',
      'Starter compute: 2 vCPU / 4 GB RAM (burst)',
      '50 GB agent workspace',
      '5 hours of browser-agent time',
      { strong: '2 concurrent agents' },
      { strong: '5 GB hub storage for private models, datasets, checkpoints' },
      'Fine-tuning, dataset generation, eval (1 parallel training job)',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    featured: true,
    badge: 'Most popular',
    price: { monthly: 55, annual: 46, first: 27 },
    blurb: 'Daily workflows, integrations, model builders.',
    cta: { label: 'Choose Pro', href: '/#signup' },
    best: 'Daily workflows, integrating agents into your work, builders shipping custom models.',
    features: [
      '20M tokens per month',
      'Standard compute: 4 vCPU / 8 GB RAM (burst)',
      '100 GB agent workspace',
      '15 hours of browser-agent time',
      { strong: '5 concurrent agents' },
      { strong: '25 GB hub storage for private models, datasets, checkpoints' },
      'Fine-tuning, dataset generation, eval (3 parallel training jobs)',
      'Private model serving via your own cloud',
      'Priority email support',
    ],
  },
  {
    id: 'max',
    name: 'Max',
    price: { monthly: 119, annual: 99, first: 59 },
    blurb: 'One-person companies, multi-agent setups, always-on agents.',
    cta: { label: 'Choose Max', href: '/#signup' },
    best: 'One-person companies, multi-agent setups, serious ML builders, always-on agents.',
    features: [
      '40M tokens per month',
      'Premium compute: 8 vCPU / 16 GB RAM (burst)',
      '200 GB agent workspace',
      '40 hours of browser-agent time',
      { strong: '12 concurrent agents' },
      { strong: '100 GB hub storage for private models, datasets, checkpoints' },
      'Fine-tuning, dataset generation, eval (10 parallel training jobs)',
      'Private model serving via your own cloud',
      'Priority orchestration queue',
      'Priority support + faster cold starts',
    ],
  },
];

function fmtPrice(n) {
  return `$${n}`;
}

function PlanCard({ plan, billing }) {
  const isFree = plan.id === 'free';
  const featured = plan.featured;

  const tone = featured
    ? {
        wrap: 'bg-brand-aubergine text-white border-brand-aubergine',
        label: 'text-brand-yellow',
        price: 'text-white',
        muted: 'text-white/60',
        body: 'text-white/72',
        check: 'text-brand-yellow',
        divider: 'border-white/12',
        cta:
          'bg-grad-sun text-brand-aubergine border-brand-orange hover:brightness-105',
      }
    : {
        wrap: 'bg-white text-brand-aubergine border-brand-border',
        label: 'text-brand-graphite',
        price: 'text-brand-aubergine',
        muted: 'text-brand-steel',
        body: 'text-brand-graphite',
        check: 'text-brand-orange',
        divider: 'border-brand-border',
        cta:
          'bg-brand-aubergine text-white border-brand-aubergine hover:bg-brand-aubergine-hover',
      };

  const monthly = plan.price.monthly;
  const annual = plan.price.annual;
  const shownPrice = billing === 'annual' ? annual : monthly;

  return (
    <article
      className={`reveal relative flex flex-col border ${tone.wrap} ${
        featured ? 'shadow-sun-glow lg:-translate-y-3' : ''
      }`}
    >
      {featured && plan.badge && (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-2 px-3 h-6 bg-brand-orange text-brand-aubergine font-mono text-[10px] font-bold uppercase tracking-wider-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-aubergine" />
          {plan.badge}
        </span>
      )}

      <div className="px-7 pt-8 pb-6">
        <div className={`font-mono text-[10px] font-semibold uppercase tracking-wider-2 ${tone.label}`}>
          {plan.name}
        </div>

        <div className="mt-4 flex items-baseline gap-1.5">
          <span className={`font-serif font-semibold leading-none tracking-display text-[52px] ${tone.price}`}>
            {fmtPrice(shownPrice)}
          </span>
          {!isFree && (
            <span className={`font-mono text-[12px] ${tone.muted}`}>
              /mo
            </span>
          )}
        </div>

        <div className={`mt-2 min-h-[36px] text-[12.5px] leading-[1.5] ${tone.muted}`}>
          {isFree ? (
            <span>Free forever — no credit card.</span>
          ) : billing === 'annual' ? (
            <span>
              Billed annually as {fmtPrice(annual * 12)}/yr ·{' '}
              <span className={tone.body}>{fmtPrice(plan.price.first)} first month on monthly</span>
            </span>
          ) : (
            <span>
              <span className={tone.body}>{fmtPrice(plan.price.first)} first month</span>, then {fmtPrice(monthly)}
              /mo
            </span>
          )}
        </div>

        <p className={`mt-4 text-[13.5px] leading-[1.55] ${tone.body}`}>{plan.blurb}</p>

        <a
          href={plan.cta.href}
          className={`mt-6 inline-flex items-center justify-center gap-2 h-11 w-full px-5 border font-sans text-[11px] font-semibold uppercase tracking-wider-2 transition-colors ${tone.cta}`}
        >
          {plan.cta.label}{' '}
          <span className="font-serif font-normal text-base leading-none translate-y-px">→</span>
        </a>
      </div>

      <div className={`px-7 py-6 border-t ${tone.divider}`}>
        <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
          {plan.features.map((f, i) => {
            const text = typeof f === 'string' ? f : f.strong;
            const strong = typeof f === 'object';
            return (
              <li key={i} className={`flex gap-2.5 text-[13.5px] leading-[1.5] ${tone.body}`}>
                <span aria-hidden="true" className={`shrink-0 mt-[3px] ${tone.check}`}>
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 8.5 6.5 12 13 4.5" />
                  </svg>
                </span>
                <span className={strong ? 'font-semibold ' + (featured ? 'text-white' : 'text-brand-aubergine') : ''}>
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

function EnterpriseCard() {
  return (
    <article className="reveal relative flex flex-col lg:flex-row gap-8 lg:items-stretch bg-brand-fog border border-brand-border p-9 lg:p-10">
      <div className="lg:max-w-[48%]">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-wider-2 text-brand-graphite">
          Enterprise
        </div>
        <h3 className="mt-3.5 font-serif text-[36px] sm:text-[44px] font-semibold leading-[1.02] tracking-hl-tight text-brand-aubergine">
          Let&apos;s talk.
        </h3>
        <p className="mt-4 text-[14.5px] leading-[1.6] text-brand-graphite max-w-[40ch]">
          Teams of 5+, regulated industries, and ML teams shipping production models. We&apos;ll size it
          to your usage, your compliance, and your buying preferences.
        </p>
        <a
          href="mailto:sales@surogate.ai"
          className="mt-6 inline-flex items-center justify-center gap-2 h-11 px-6 bg-brand-aubergine text-white font-sans text-[11px] font-semibold uppercase tracking-wider-2 border border-brand-aubergine hover:bg-brand-aubergine-hover transition-colors"
        >
          Contact sales{' '}
          <span className="font-serif font-normal text-base leading-none translate-y-px">→</span>
        </a>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 lg:flex-1 lg:border-l lg:border-brand-border lg:pl-10 self-center">
        {[
          'Custom token volume',
          'Ultra compute (12 vCPU / 32 GB RAM) or dedicated nodes',
          'Custom storage (agent workspace + hub)',
          'Unlimited or custom browser-agent time',
          'Unlimited parallel training jobs',
          'SSO, audit logs, role-based access',
          'SLA, dedicated support, custom contracts',
          'Volume discounts',
        ].map((f) => (
          <li
            key={f}
            className="flex gap-2.5 text-[13.5px] leading-[1.5] text-brand-graphite"
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
    </article>
  );
}

export default function PricingPlans({ billing }) {
  return (
    <section
      id="plans"
      data-screen-label="01 Plans"
      className="relative bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-container mx-auto px-8">
        <div className="mb-12 max-w-[720px]">
          <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-graphite">
            <span className="font-mono text-brand-orange mr-2 font-bold">01</span>
            Plans
          </div>
          <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[60px] text-brand-aubergine">
            Pick a plan. Keep the{' '}
            <span className="has-sun-mark">whole platform</span>.
          </h2>
          <p className="reveal mt-5 text-[15.5px] leading-[1.6] text-brand-graphite max-w-[64ch]">
            Every tier — Free included — comes with the full agent runtime, the hub, and an API. You scale
            tokens, compute, and concurrency. You never lose features.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} billing={billing} />
          ))}
        </div>

        <div className="mt-10">
          <EnterpriseCard />
        </div>

        <aside className="reveal mt-14 bg-brand-aubergine text-white border-l-2 border-brand-orange px-7 py-7 lg:px-9 lg:py-8">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider-2 text-brand-orange">
            Why running more than one agent costs you nothing extra
          </div>
          <p className="mt-3 font-serif text-[22px] sm:text-[26px] font-semibold leading-[1.25] tracking-[-0.014em] text-white max-w-[44ch]">
            Most platforms charge per agent. We don&apos;t. Max alone runs{' '}
            <span className="italic font-medium text-brand-orange">12 agents for $119/month</span> —
            roughly what others charge for two.
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-white/72 max-w-[68ch]">
            Once you have a useful agent, you want more of them — one watching your inbox, one writing the
            report, one monitoring a competitor&apos;s site. Every plan above bundles multiple concurrent
            agents at no extra cost.
          </p>
        </aside>
      </div>
    </section>
  );
}
