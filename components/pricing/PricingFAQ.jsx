const FAQS = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. Upgrades take effect immediately and we prorate the difference. Downgrades take effect at the next billing cycle. No fees either way.',
  },
  {
    q: 'Do I have to buy a token pack?',
    a: 'No. Token packs are optional on every paid plan. You can run the platform with no pack and bring your own LLM provider — OpenAI, Anthropic, OpenRouter, vLLM, anything OpenAI-compatible — and pay them directly. We don’t take a cut. If you do want our included model, add a pack or pay $2 per 1M tokens as you go.',
  },
  {
    q: 'What happens if I run out of tokens mid-task?',
    a: 'If you’re on a pack, your agent continues at the pay-as-you-go rate ($2/1M) so the task completes. If you’ve set a hard cap in settings, the agent pauses and notifies you. You can top up the pack, switch to a larger one, or wait until next cycle. BYO users aren’t affected — your provider meters separately.',
  },
  {
    q: 'Can I change my token pack independently of my plan?',
    a: 'Yes. Plan and pack are separate line items. Bump up to Heavy in a busy month, drop back to Starter the next, or skip packs entirely and stay on PAYG. Pack changes take effect at the next cycle by default; we can apply mid-cycle on request.',
  },
  {
    q: 'Why is the first month cheaper?',
    a: 'We want you to try the product on real work, not just a demo. The first-month discount applies to the plan only (not to token packs) and gives you meaningful runway to see if it fits. After that, the regular rate kicks in — no surprise jumps, no auto-locked contracts.',
  },
  {
    q: 'Can I share my plan with my team?',
    a: 'The Standard, Pro, and Max plans are single-user. For team use, the Enterprise plan supports multiple seats, shared resources, role-based access, SSO, and audit logs. Custom team pricing is available — talk to sales.',
  },
  {
    q: 'What about data privacy?',
    a: 'Your agent workspace is private and yours. Your hub artifacts are private by default. We don’t train on your data. You can export everything anytime, with no egress fees on hub content.',
  },
  {
    q: 'Do you charge for failed agent runs?',
    a: 'Tokens consumed by the model are billed whether the agent succeeded or not — same as every other LLM-based service. We don’t charge browser-time or extra compute for failures on our end.',
  },
  {
    q: 'Is there a free trial of paid plans?',
    a: 'The Free plan is open-ended — use it as long as you like, with 500K trial tokens on our included model or BYO from day one. The first-month discount on paid plans is effectively a try-it-out price. If a paid plan doesn’t work for you in the first 14 days, we’ll refund it on request, no questions asked.',
  },
  {
    q: 'Can I run an agent 24/7?',
    a: 'Yes. Agents run continuously within your plan’s concurrent-agent and compute limits — tokens are the thing to watch for long-running tasks. The dashboard shows live consumption so you can tune behavior or set a cap.',
  },
  {
    q: 'How does fine-tuning work? Do I pay for GPUs?',
    a: 'You bring your own cloud (AWS, GCP, Lambda, RunPod, etc.) via dstack or skypilot. Your cloud provider bills you directly for GPU time. We orchestrate the run, manage checkpoints, and track lineage in the hub. No GPU markup from us.',
  },
  {
    q: 'Why bring my own cloud instead of using yours?',
    a: 'You probably already have credits, a preferred region, specific compliance needs, or a GPU provider relationship. Forcing you onto our infrastructure would mean marking up GPUs you could buy directly. We’d rather make money on the platform than on reselling compute.',
  },
  {
    q: 'Can I serve my fine-tuned models?',
    a: 'Yes, on Pro and Max. You deploy via your own cloud (dstack/skypilot), and we orchestrate the endpoint. Your agents can call your custom models directly — no token charges from us when you use them.',
  },
  {
    q: 'What’s the hub for?',
    a: 'A git-backed registry for your models, datasets, and checkpoints — like a private Hugging Face Hub. Pull public models, push your own, version everything. Read access is free; private storage scales with your plan.',
  },
  {
    q: 'What if I need more than Max but Enterprise is overkill?',
    a: 'Stack add-ons. A Max plan with extra concurrent agents, an upgraded compute tier, extra training slots, and a reserved browser covers a lot of ground before you hit Enterprise territory. Talk to us if you’re not sure.',
  },
];

export default function PricingFAQ() {
  return (
    <section
      id="faq"
      data-screen-label="09 FAQ"
      className="bg-brand-fog py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-container mx-auto px-8 grid gap-12 lg:gap-16 grid-cols-1 lg:[grid-template-columns:minmax(0,360px)_1fr]">
        <div>
          <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-graphite">
            <span className="font-mono text-brand-orange mr-2 font-bold">09</span>
            FAQ
          </div>
          <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[44px] lg:text-[52px] text-brand-aubergine">
            Questions, answered{' '}
            <span className="italic font-medium text-brand-orange">in plain language</span>.
          </h2>
          <p className="reveal mt-5 text-[14.5px] leading-[1.6] text-brand-graphite max-w-[40ch]">
            Can&apos;t find what you&apos;re looking for?{' '}
            <a
              href="mailto:hello@surogate.ai"
              className="underline underline-offset-2 decoration-brand-border hover:decoration-brand-orange text-brand-aubergine"
            >
              Talk to a human →
            </a>
          </p>
        </div>

        <div className="border-t border-brand-border">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="reveal group border-b border-brand-border py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-baseline gap-4 cursor-pointer list-none">
                <h3 className="m-0 font-serif text-[17px] sm:text-[18px] font-semibold tracking-[-0.012em] text-brand-aubergine flex-1">
                  {item.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 w-7 h-7 inline-flex items-center justify-center border border-brand-border text-brand-graphite transition-transform group-open:rotate-45 group-open:border-brand-aubergine group-open:text-brand-aubergine"
                >
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 14 14" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="7" y1="2" x2="7" y2="12" />
                    <line x1="2" y1="7" x2="12" y2="7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 mb-1 text-[14.5px] leading-[1.65] text-brand-graphite max-w-[62ch]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
