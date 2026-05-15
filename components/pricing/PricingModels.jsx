const PACKS = [
  { name: 'Starter', amount: '10M tokens', price: '$18 / mo' },
  { name: 'Standard', amount: '25M tokens', price: '$42 / mo' },
  { name: 'Heavy', amount: '50M tokens', price: '$80 / mo' },
];

const PROVIDERS = {
  external: ['OpenRouter', 'OpenAI', 'Anthropic', 'Together', 'Groq'],
  selfHosted: ['vLLM', 'TGI', 'Ollama', 'Any OpenAI-compatible API'],
  fineTuned: ['Deploy via dstack or skypilot'],
};

function ProviderTag({ children }) {
  return (
    <span className="inline-flex items-center px-3 h-7 bg-white border border-brand-border text-brand-aubergine font-mono text-[12px] font-medium">
      {children}
    </span>
  );
}

function ProviderSection({ label, items, accent }) {
  return (
    <div>
      <div className="font-mono text-[10.5px] uppercase tracking-wider-2 text-brand-steel mb-2.5">
        {label}
        {accent && (
          <span className="ml-2 font-mono text-[10.5px] text-brand-orange">{accent}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((p) => (
          <ProviderTag key={p}>{p}</ProviderTag>
        ))}
      </div>
    </div>
  );
}

export default function PricingModels() {
  return (
    <section
      id="models"
      data-screen-label="04 Models"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-container mx-auto px-8">
        <div className="mb-12 max-w-[820px]">
          <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-graphite">
            <span className="font-mono text-brand-orange mr-2 font-bold">04</span>
            Models, your way
          </div>
          <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[60px] text-brand-aubergine">
            Use our model.{' '}
            <span className="italic font-medium text-brand-orange">Or yours.</span>
          </h2>
          <p className="reveal mt-5 text-[15.5px] leading-[1.6] text-brand-graphite max-w-[68ch]">
            Two paths to model access. Buy tokens in flexible packs and use the model we include.
            Or connect any LLM provider you already have and pay them directly. Mix and match per
            agent — research with one, code with another, summarize with a third.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-brand-border p-8 lg:p-9 flex flex-col gap-4">
            <h3 className="font-serif text-[24px] font-semibold tracking-[-0.014em] text-brand-aubergine">
              Token packs
            </h3>
            <p className="text-[14px] leading-[1.55] text-brand-graphite">
              Use our included model. Add to any plan, no commitment past the month.
            </p>

            <div className="mt-2">
              {PACKS.map((p, i) => (
                <div
                  key={p.name}
                  className={`grid grid-cols-[88px_1fr_auto] items-baseline gap-4 py-3 ${
                    i === 0 ? 'border-t border-brand-border' : 'border-t border-brand-line'
                  }`}
                >
                  <span className="font-serif text-[16px] font-semibold tracking-[-0.01em] text-brand-aubergine">
                    {p.name}
                  </span>
                  <span className="font-mono text-[13px] text-brand-graphite">{p.amount}</span>
                  <span className="font-mono text-[13.5px] font-semibold text-brand-orange whitespace-nowrap">
                    {p.price}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-2 font-mono text-[11px] text-brand-steel tracking-[0.03em]">
              No pack? Pay $2 / 1M tokens, no commitment.
            </p>
          </div>

          <div className="bg-grad-payoff border border-brand-border p-8 lg:p-9 flex flex-col gap-5">
            <div>
              <h3 className="font-serif text-[24px] font-semibold tracking-[-0.014em] text-brand-aubergine">
                Bring your own LLM
              </h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-brand-graphite">
                Connect any provider. You pay them directly, we don&apos;t take a cut.
              </p>
            </div>

            <ProviderSection label="External providers" items={PROVIDERS.external} />
            <ProviderSection label="Self-hosted" items={PROVIDERS.selfHosted} />
            <ProviderSection
              label="Your fine-tuned models"
              accent="Pro / Max"
              items={PROVIDERS.fineTuned}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
