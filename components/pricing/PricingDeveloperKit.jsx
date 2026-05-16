const PROVIDERS = {
  external: ['OpenRouter', 'OpenAI', 'Anthropic', 'Together', 'Groq'],
  selfHosted: ['vLLM', 'TGI', 'Ollama', 'Any OpenAI-compatible API'],
};

const EVAL_SUITES = ['HumanEval', 'MBPP', 'terminal-bench', 'SWE-bench', 'Custom suites'];

const ML_HOURS = [
  { plan: 'Standard', hours: '3 hours / month' },
  { plan: 'Pro', hours: '15 hours / month' },
  { plan: 'Max', hours: '40 hours / month' },
];

const HUB_STORAGE = [
  { plan: 'Free', size: '1 GB' },
  { plan: 'Standard', size: '10 GB' },
  { plan: 'Pro', size: '50 GB' },
  { plan: 'Max', size: '200 GB' },
];

function ProviderTag({ children, dark }) {
  return (
    <span
      className={`inline-flex items-center px-3 h-7 border font-mono text-[12px] font-medium ${
        dark
          ? 'bg-white/8 border-white/20 text-white'
          : 'bg-white border-brand-border text-brand-aubergine'
      }`}
    >
      {children}
    </span>
  );
}

export default function PricingDeveloperKit() {
  return (
    <section
      id="advanced"
      data-screen-label="03 Advanced"
      className="relative overflow-hidden bg-brand-aubergine text-white py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 bg-evening-glow pointer-events-none" />
      <div className="relative max-w-container mx-auto px-8">
        <div className="mb-12 max-w-[820px]">
          <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-yellow/85">
            <span className="font-mono text-brand-yellow mr-2 font-bold">03</span>
            For developers and ML teams
          </div>
          <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[60px] text-white">
            Bring your own model.{' '}
            <em className="italic font-medium text-brand-orange">Train your own model</em>.
          </h2>
          <p className="reveal mt-5 text-[15.5px] leading-[1.6] text-white/72 max-w-[64ch]">
            Available on every paid plan. Pick what you need, configure in your account
            settings. No GPU markup from us, no double-dipping.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="reveal border border-white/15 p-8 lg:p-9 flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] font-semibold tracking-wider-2 text-brand-yellow">
                01
              </span>
              <h3 className="m-0 font-serif text-[24px] font-semibold tracking-[-0.014em] text-white">
                Use your own LLM
              </h3>
            </div>
            <p className="text-[14.5px] leading-[1.6] text-white/72 max-w-[58ch]">
              Connect any OpenAI-compatible provider. You pay them directly. Cancel the
              bundled token portion of your plan in settings to save the cost.
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-wider-2 text-white/55 mb-2">
                  External providers
                </div>
                <div className="flex flex-wrap gap-2">
                  {PROVIDERS.external.map((p) => (
                    <ProviderTag key={p} dark>
                      {p}
                    </ProviderTag>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-wider-2 text-white/55 mb-2">
                  Self-hosted
                </div>
                <div className="flex flex-wrap gap-2">
                  {PROVIDERS.selfHosted.map((p) => (
                    <ProviderTag key={p} dark>
                      {p}
                    </ProviderTag>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-wider-2 text-white/55 mb-2">
                  Your fine-tuned models
                </div>
                <div className="flex flex-wrap gap-2">
                  <ProviderTag dark>Deploy via dstack or skypilot</ProviderTag>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal border border-white/15 p-8 lg:p-9 flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] font-semibold tracking-wider-2 text-brand-yellow">
                02
              </span>
              <h3 className="m-0 font-serif text-[24px] font-semibold tracking-[-0.014em] text-white">
                Fine-tune your own models
              </h3>
            </div>
            <p className="text-[14.5px] leading-[1.6] text-white/72 max-w-[58ch]">
              Train on your own data using dstack or skypilot. Your cloud, your GPUs, your
              bill — we orchestrate the run, capture logs and metrics, and track lineage in
              the hub.
            </p>
            <div className="mt-auto pt-2">
              <div className="font-mono text-[10.5px] uppercase tracking-wider-2 text-white/55 mb-2">
                Cloud GPU providers
              </div>
              <div className="flex flex-wrap gap-2">
                {['AWS', 'GCP', 'Lambda', 'RunPod', 'Anywhere'].map((p) => (
                  <ProviderTag key={p} dark>
                    {p}
                  </ProviderTag>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal border border-white/15 p-8 lg:p-9 flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] font-semibold tracking-wider-2 text-brand-yellow">
                03
              </span>
              <h3 className="m-0 font-serif text-[24px] font-semibold tracking-[-0.014em] text-white">
                Datasets &amp; evaluation
              </h3>
            </div>
            <p className="text-[14.5px] leading-[1.6] text-white/72 max-w-[58ch]">
              Generate synthetic datasets at scale. Run standardized or custom eval suites.
              ML compute hours work like the other wallet resources — plan grant resets
              monthly, top-ups roll over.
            </p>
            <div className="flex flex-wrap gap-2">
              {EVAL_SUITES.map((s) => (
                <ProviderTag key={s} dark>
                  {s}
                </ProviderTag>
              ))}
            </div>
            <div className="mt-2 divide-y divide-white/10 border-y border-white/10">
              {ML_HOURS.map((m) => (
                <div
                  key={m.plan}
                  className="grid grid-cols-[110px_1fr] gap-4 py-2.5 items-baseline"
                >
                  <span className="font-mono text-[11.5px] font-semibold tracking-wider-2 text-brand-yellow uppercase">
                    {m.plan}
                  </span>
                  <span className="font-mono text-[13px] text-white/82">{m.hours}</span>
                </div>
              ))}
              <div className="grid grid-cols-[110px_1fr] gap-4 py-2.5 items-baseline">
                <span className="font-mono text-[11.5px] font-semibold tracking-wider-2 text-white/55 uppercase">
                  Top-up
                </span>
                <span className="font-mono text-[13px] text-white/82">
                  $2.42 / hour <span className="text-white/55">— rolls over</span>
                </span>
              </div>
            </div>
          </div>

          <div className="reveal border border-white/15 p-8 lg:p-9 flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] font-semibold tracking-wider-2 text-brand-yellow">
                04
              </span>
              <h3 className="m-0 font-serif text-[24px] font-semibold tracking-[-0.014em] text-white">
                Internal hub
              </h3>
            </div>
            <p className="text-[14.5px] leading-[1.6] text-white/72 max-w-[58ch]">
              A git-backed registry for your models, datasets, and checkpoints — like a
              private Hugging Face Hub. Public read for community sharing, private read/write
              for your work. Backed by Cloudflare R2 — no egress fees.
            </p>
            <div className="mt-auto pt-2 divide-y divide-white/10 border-y border-white/10">
              {HUB_STORAGE.map((m) => (
                <div
                  key={m.plan}
                  className="grid grid-cols-[110px_1fr] gap-4 py-2.5 items-baseline"
                >
                  <span className="font-mono text-[11.5px] font-semibold tracking-wider-2 text-brand-yellow uppercase">
                    {m.plan}
                  </span>
                  <span className="font-mono text-[13px] text-white/82">
                    {m.size} hub storage
                  </span>
                </div>
              ))}
              <div className="grid grid-cols-[110px_1fr] gap-4 py-2.5 items-baseline">
                <span className="font-mono text-[11.5px] font-semibold tracking-wider-2 text-white/55 uppercase">
                  Extra
                </span>
                <span className="font-mono text-[13px] text-white/82">
                  +$0.0605 / GB / month <span className="text-white/55">— recurring</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
