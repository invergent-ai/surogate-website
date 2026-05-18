const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, annual: 0, first: 0 },
    eyebrow: 'No card required',
    best: 'Try it out. See if it fits your work.',
    cta: { label: 'Start free', href: '/#signup' },
    features: [
      '1 concurrent agent',
      '500K starter tokens',
      '1 GB workspace',
      '1 GB hub storage',
      '30 min web browsing',
      'Community support',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: { monthly: 45, annual: 40, first: 33 },
    eyebrow: '$33 first month',
    best: 'For personal projects and occasional automation.',
    cta: { label: 'Choose Standard', href: '/#signup' },
    features: [
      { strong: '2 concurrent agents' },
      { strong: '10M tokens / month' },
      '5 GB workspace',
      '10 GB hub storage',
      '5 hours web browsing',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    featured: true,
    badge: 'Most popular',
    price: { monthly: 98, annual: 90, first: 74 },
    eyebrow: '$74 first month',
    best: 'For daily workflows and serious automation.',
    cta: { label: 'Choose Pro', href: '/#signup' },
    features: [
      { strong: '5 concurrent agents' },
      { strong: '25M tokens / month' },
      '20 GB workspace',
      '50 GB hub storage',
      '15 hours web browsing',
      'Priority email support',
    ],
  },
  {
    id: 'max',
    name: 'Max',
    price: { monthly: 192, annual: 175, first: 144 },
    eyebrow: '$144 first month',
    best: 'For power users, small businesses, and multi-agent setups.',
    cta: { label: 'Choose Max', href: '/#signup' },
    features: [
      { strong: '12 concurrent agents' },
      { strong: '50M tokens / month' },
      '50 GB workspace',
      '200 GB hub storage',
      '40 hours web browsing',
      'Priority support',
    ],
  },
];

function fmt(n) {
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
        muted: 'text-white/55',
        body: 'text-white/72',
        check: 'text-brand-yellow',
        divider: 'border-white/12',
        dashed: 'border-white/15',
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
        dashed: 'border-brand-border',
        cta:
          'bg-brand-aubergine text-white border-brand-aubergine hover:bg-brand-aubergine-hover',
      };

  const monthly = plan.price.monthly;
  const annual = plan.price.annual;
  const annualSavingsPct = monthly > 0 ? Math.round((1 - annual / monthly) * 100) : 0;

  const big = isFree ? 0 : billing === 'annual' ? annual : monthly;
  const eyebrow = isFree
    ? plan.eyebrow
    : billing === 'annual'
      ? `Save ~${annualSavingsPct}% billed yearly`
      : plan.eyebrow;
  const subline = isFree
    ? <>&nbsp;</>
    : billing === 'annual'
      ? <>Billed as <span className={tone.body}>{fmt(annual * 12)}/yr</span> — save {fmt((monthly - annual) * 12)}.</>
      : <><span className={tone.body}>{fmt(monthly)}/mo</span>, or {fmt(annual)}/mo billed annually.</>;

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

      <div className="px-7 pt-8 pb-2 flex flex-col gap-3.5">
        <div className={`font-mono text-[10px] font-semibold uppercase tracking-wider-2 ${tone.label}`}>
          {plan.name}
        </div>

        <div className={`font-mono text-[10.5px] uppercase tracking-wider-2 ${tone.muted}`}>
          {eyebrow}
        </div>

        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className={`font-serif text-[22px] font-semibold leading-none ${tone.price} -translate-y-3.5`}>$</span>
          <span className={`font-serif font-semibold leading-none tracking-display text-[56px] ${tone.price}`}>
            {big}
          </span>
          {!isFree && (
            <span className={`font-mono text-[12px] ${tone.muted}`}>
              /month
            </span>
          )}
        </div>

        <div className={`min-h-[18px] font-mono text-[11px] ${tone.muted}`}>
          {subline}
        </div>

        <p className={`mt-1 italic text-[13px] leading-[1.45] py-3.5 border-y border-dashed ${tone.dashed} ${tone.body}`}>
          {plan.best}
        </p>
      </div>

      <div className="px-7 py-3">
        <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
          {plan.features.map((f) => {
            const text = typeof f === 'string' ? f : f.strong;
            const strong = typeof f === 'object';
            const strongTone = featured ? 'text-white' : 'text-brand-aubergine';
            return (
              <li key={text} className={`flex gap-2.5 text-[13.5px] leading-[1.5] ${tone.body}`}>
                <span aria-hidden="true" className={`shrink-0 mt-[2px] font-mono ${tone.check}`}>
                  →
                </span>
                <span className={strong ? `font-semibold ${strongTone}` : ''}>
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-7 pb-7 mt-auto pt-4">
        <a
          href={plan.cta.href}
          className={`inline-flex items-center justify-center gap-2 h-11 w-full px-5 border font-sans text-[11px] font-semibold uppercase tracking-wider-2 transition-colors ${tone.cta}`}
        >
          {plan.cta.label}{' '}
          <span className="font-serif font-normal text-base leading-none translate-y-px">→</span>
        </a>
      </div>
    </article>
  );
}

function EnterpriseCard() {
  return (
    <article className="reveal relative flex flex-col lg:flex-row gap-8 lg:items-center bg-brand-fog border border-brand-border p-9 lg:p-10">
      <div className="lg:max-w-[36%]">
        <h3 className="font-serif text-[34px] sm:text-[40px] font-semibold leading-[1.02] tracking-hl-tight text-brand-aubergine">
          Enterprise
        </h3>
        <div className="mt-2 font-mono text-[11px] font-medium uppercase tracking-wider-2 text-brand-steel">
          Let&apos;s talk.
        </div>
      </div>

      <p className="lg:flex-1 text-[14.5px] leading-[1.6] text-brand-graphite max-w-[64ch]">
        Custom token volume. Dedicated compute. SSO, audit logs, RBAC. SLA, dedicated support,
        custom contracts. For teams of 5+, regulated industries, and ML teams shipping production
        models.
      </p>

      <a
        href="mailto:sales@surogate.ai"
        className="self-start lg:self-center inline-flex items-center justify-center gap-2 h-11 px-6 bg-brand-aubergine text-white font-sans text-[11px] font-semibold uppercase tracking-wider-2 border border-brand-aubergine hover:bg-brand-aubergine-hover transition-colors whitespace-nowrap"
      >
        Contact sales{' '}
        <span className="font-serif font-normal text-base leading-none translate-y-px">→</span>
      </a>
    </article>
  );
}

function BillingToggle({ billing, setBilling }) {
  return (
    <div
      role="tablist"
      aria-label="Billing cycle"
      className="inline-flex items-center bg-brand-aubergine p-1 border border-brand-aubergine"
    >
      {[
        { id: 'monthly', label: 'Monthly' },
        { id: 'annual', label: 'Annual' },
      ].map((opt) => {
        const on = billing === opt.id;
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={on}
            type="button"
            onClick={() => setBilling(opt.id)}
            className={`relative h-9 px-4 font-sans text-[11px] font-semibold uppercase tracking-wider-2 transition-colors ${
              on
                ? 'bg-brand-orange text-brand-aubergine'
                : 'bg-transparent text-white/70 hover:text-white'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function PricingPlans({ billing, setBilling }) {
  return (
    <section
      id="plans"
      data-screen-label="01 Plans"
      className="relative bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-container mx-auto px-8">
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[60px] text-brand-aubergine">
              Pick a plan.{' '}
              <span className="italic font-medium text-brand-orange">Tokens included</span>.
            </h2>
            <p className="reveal mt-5 text-[15.5px] leading-[1.6] text-brand-graphite max-w-[64ch]">
              Every plan ships the whole platform — runtime, hub, dev toolkit — with a generous
              monthly token allowance baked in. Advanced users can bring their own LLM provider
              and pay them directly.
            </p>
            <p className="reveal mt-3 text-[12.5px] leading-[1.6] text-brand-steel max-w-[64ch] font-mono">
              All prices VAT-inclusive (gross). EU B2B with valid VAT ID and non-EU customers see
              the net price.
            </p>
          </div>

          <div className="reveal flex flex-col items-start gap-2.5 lg:items-end lg:pb-1">
            <BillingToggle billing={billing} setBilling={setBilling} />
            <span className="font-mono text-[11px] uppercase tracking-wider-2 text-brand-steel">
              {billing === 'annual'
                ? 'Save ~10% with annual billing'
                : 'First month discounted on every paid plan'}
            </span>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} billing={billing} />
          ))}
        </div>

        <div className="mt-10">
          <EnterpriseCard />
        </div>

        <p className="reveal mt-10 text-center font-mono text-[12px] text-brand-graphite tracking-[0.03em]">
          Need more tokens or browser time?{' '}
          <a
            href="#wallets"
            className="text-brand-orange underline underline-offset-2 decoration-dashed decoration-brand-orange/60 hover:decoration-brand-orange"
          >
            Top up your wallet ↓
          </a>
        </p>
      </div>
    </section>
  );
}
