const TOKEN_PACKS = [
  { name: 'Starter', tokens: '10M', price: '+$18 / mo' },
  { name: 'Standard', tokens: '25M', price: '+$42 / mo' },
  { name: 'Heavy', tokens: '50M', price: '+$80 / mo' },
];

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, annual: 0, first: 0 },
    eyebrow: 'No card required',
    best: 'For kicking the tires, demos, and trying out your own LLM.',
    cta: { label: 'Start free', href: '/#signup' },
    features: [
      '1 concurrent agent',
      'Starter compute (burst)',
      '10 GB agent workspace',
      '30 min browser-agent time',
      '1 GB hub storage',
      'Community support',
    ],
    tokens: {
      label: 'Model access',
      included: { pack: '500K trial tokens', price: 'included' },
      byo: { pack: 'Bring your own LLM', price: 'free' },
    },
  },
  {
    id: 'standard',
    name: 'Standard',
    price: { monthly: 19, annual: 15, first: 9 },
    eyebrow: '$9 first month',
    best: 'For personal projects and developers experimenting with custom models.',
    cta: { label: 'Choose Standard', href: '/#signup' },
    features: [
      { strong: '2 concurrent agents' },
      'Starter compute (2 vCPU / 4 GB)',
      '50 GB agent workspace',
      '5 hours browser-agent time',
      { strong: '5 GB hub storage' },
      'Fine-tuning, datasets, eval',
      '1 parallel training job',
      'Email support',
    ],
    tokens: {
      label: '+ Tokens (optional)',
      packs: TOKEN_PACKS,
      byo: { pack: 'Or bring your own LLM', price: 'free' },
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    featured: true,
    badge: 'Most popular',
    price: { monthly: 39, annual: 32, first: 19 },
    eyebrow: '$19 first month',
    best: 'For daily workflows, integrating agents into your work, and builders shipping custom models.',
    cta: { label: 'Choose Pro', href: '/#signup' },
    features: [
      { strong: '5 concurrent agents' },
      'Standard compute (4 vCPU / 8 GB)',
      '100 GB agent workspace',
      '15 hours browser-agent time',
      { strong: '25 GB hub storage' },
      'Fine-tuning, datasets, eval',
      '3 parallel training jobs',
      'Private model serving',
      'Priority email support',
    ],
    tokens: {
      label: '+ Tokens (optional)',
      packs: TOKEN_PACKS,
      byo: { pack: 'Or bring your own LLM', price: 'free' },
    },
  },
  {
    id: 'max',
    name: 'Max',
    price: { monthly: 79, annual: 65, first: 39 },
    eyebrow: '$39 first month',
    best: 'For OPCs, multi-agent setups, serious ML builders, and always-on agents.',
    cta: { label: 'Choose Max', href: '/#signup' },
    features: [
      { strong: '12 concurrent agents' },
      'Premium compute (8 vCPU / 16 GB)',
      '200 GB agent workspace',
      '40 hours browser-agent time',
      { strong: '100 GB hub storage' },
      'Fine-tuning, datasets, eval',
      '10 parallel training jobs',
      'Private model serving',
      'Priority orchestration queue',
      'Priority support',
    ],
    tokens: {
      label: '+ Tokens (optional)',
      packs: TOKEN_PACKS,
      byo: { pack: 'Or bring your own LLM', price: 'free' },
    },
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
        packPrice: 'text-brand-yellow',
        byoPrice: 'text-white/45',
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
        packPrice: 'text-brand-orange',
        byoPrice: 'text-brand-steel',
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

      <div className="px-7 py-2">
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

      <div className="px-7 py-4">
        <div className={`py-4 border-y border-dashed ${tone.dashed} flex flex-col gap-1.5`}>
          <div className={`font-mono text-[10px] uppercase tracking-wider-2 ${tone.muted} mb-1`}>
            {plan.tokens.label}
          </div>
          {plan.tokens.included && (
            <TokenLine
              pack={plan.tokens.included.pack}
              price={plan.tokens.included.price}
              priceClass={tone.byoPrice}
              packClass={tone.body}
            />
          )}
          {plan.tokens.packs?.map((p) => (
            <TokenLine
              key={p.name}
              pack={`${p.name} · ${p.tokens}`}
              price={p.price}
              priceClass={tone.packPrice}
              packClass={tone.body}
            />
          ))}
          <div className={`mt-1 pt-2 border-t border-dashed ${tone.dashed}`}>
            <TokenLine
              pack={plan.tokens.byo.pack}
              price={plan.tokens.byo.price}
              priceClass={tone.byoPrice}
              packClass={`italic ${tone.body}`}
            />
          </div>
        </div>
      </div>

      <div className="px-7 pb-7 mt-auto">
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

function TokenLine({ pack, price, priceClass, packClass }) {
  return (
    <div className="flex items-baseline justify-between gap-2.5">
      <span className={`text-[12.5px] leading-[1.4] ${packClass}`}>{pack}</span>
      <span className={`font-mono text-[11.5px] font-semibold whitespace-nowrap ${priceClass}`}>{price}</span>
    </div>
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
        Ultra compute or dedicated nodes. Unlimited parallel training. Custom token rates or
        pass-through billing. SSO, audit logs, RBAC. SLA, dedicated support, custom contracts. For
        teams of 5+, regulated industries, and ML teams shipping production models.
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
            <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-graphite">
              <span className="font-mono text-brand-orange mr-2 font-bold">01</span>
              Plans
            </div>
            <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[60px] text-brand-aubergine">
              Pick a plan. Add tokens{' '}
              <span className="italic font-medium text-brand-orange">only if you need them</span>.
            </h2>
            <p className="reveal mt-5 text-[15.5px] leading-[1.6] text-brand-graphite max-w-[64ch]">
              Every paid plan ships the whole platform — runtime, hub, dev toolkit. Tokens are sold
              separately as packs, or bring your own LLM provider and pay them directly.
            </p>
          </div>

          <div className="reveal flex flex-col items-start gap-2.5 lg:items-end lg:pb-1">
            <BillingToggle billing={billing} setBilling={setBilling} />
            <span className="font-mono text-[11px] uppercase tracking-wider-2 text-brand-steel">
              {billing === 'annual'
                ? 'Save up to ~17% with annual billing'
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
          Tokens are optional.{' '}
          <a
            href="#models"
            className="text-brand-orange underline underline-offset-2 decoration-dashed decoration-brand-orange/60 hover:decoration-brand-orange"
          >
            Learn more about model options ↓
          </a>
        </p>
      </div>
    </section>
  );
}
