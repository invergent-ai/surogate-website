const KIT = [
  {
    num: '01',
    title: 'Fine-tuning',
    body: 'Train models on your own data using dstack or skypilot. Bring GPUs from AWS, GCP, Lambda, RunPod — anywhere. Your cloud provider bills you directly. We orchestrate the run, manage checkpoints, and track lineage in the hub.',
  },
  {
    num: '02',
    title: 'Synthetic datasets',
    body: 'Use any model on the platform to generate training and eval data. Token usage counts against your plan’s allowance — no separate pricing, no surprise meters.',
  },
  {
    num: '03',
    title: 'Model evaluation',
    body: 'Run standardized or custom eval suites against any model you’ve trained or pulled from the hub. Track metrics across versions. Compare apples to apples.',
  },
  {
    num: '04',
    title: 'Private model serving',
    badge: 'Pro / Max',
    body: 'Deploy fine-tuned models via your own cloud account. We orchestrate, you control the infrastructure. Your agents call your custom models directly.',
  },
  {
    num: '05',
    title: 'Internal hub',
    body: 'A git-backed registry for your models, datasets, and checkpoints — like a private Hugging Face Hub. Public read for community sharing, private read/write for your work. Backed by Cloudflare R2 — no egress fees when pulling your own artifacts.',
  },
];

export default function PricingDeveloperKit() {
  return (
    <section
      id="developer-kit"
      data-screen-label="03 Developer kit"
      className="bg-brand-aubergine text-white py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-container mx-auto px-8">
        <div className="mb-12 max-w-[820px]">
          <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-yellow/85">
            <span className="font-mono text-brand-yellow mr-2 font-bold">03</span>
            For builders · Standard and up
          </div>
          <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[60px] text-white">
            A full developer toolkit,{' '}
            <em className="italic font-medium text-brand-orange">included</em>.
          </h2>
          <p className="reveal mt-5 text-[15.5px] leading-[1.6] text-white/72 max-w-[64ch]">
            Every paid plan ships with the tools to shape your own agents from the model up. You
            bring your own cloud GPUs. We handle orchestration, lineage, and storage. No GPU
            markup, no double-dipping.
          </p>
        </div>

        <div className="grid grid-cols-1">
          {KIT.map((k, i) => (
            <div
              key={k.num}
              className={`reveal grid gap-4 lg:gap-8 py-8 grid-cols-1 lg:[grid-template-columns:80px_1fr_1.2fr] items-start border-t border-white/10 ${
                i === KIT.length - 1 ? 'border-b border-white/10' : ''
              }`}
            >
              <div className="font-mono text-xs font-semibold tracking-wider-2 text-brand-yellow pt-1.5">
                {k.num}
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="m-0 font-serif text-2xl font-semibold tracking-[-0.014em] leading-[1.18] text-white">
                  {k.title}
                </h4>
                {k.badge && (
                  <span className="self-start inline-flex items-center px-2 h-5 bg-brand-orange/15 border border-brand-orange/40 text-brand-orange font-mono text-[10px] uppercase tracking-wider-2">
                    {k.badge}
                  </span>
                )}
              </div>
              <p className="m-0 text-[15.5px] leading-[1.6] text-white/72 max-w-[60ch]">{k.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
