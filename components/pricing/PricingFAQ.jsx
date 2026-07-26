export const FAQS = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. Upgrades take effect immediately and we prorate the difference. Downgrades take effect at the next billing cycle. No fees either way.',
  },
  {
    q: 'Are tokens really included? What about overages?',
    a: 'Every paid plan ships with a monthly token allowance baked into the price - 10M on Standard, 80M on Pro, 200M on Max, all served on Claude Opus 4.8. There are no surprise overage bills: when your monthly grant runs out, agents pause until you top up your wallet (rolling-over cash at $2 per 1M tokens) or wait for the next cycle. You stay in control.',
  },
  {
    q: 'What happens if my token wallet hits zero mid-task?',
    a: 'The operation stops. No auto-upgrade, no overdraft, no end-of-month invoice. Top up the wallet with as little or as much as you want - top-up balances never expire until you use them - and the task resumes. You can also bring your own LLM provider and pay them directly, which bypasses our tokens entirely.',
  },
  {
    q: 'How do top-ups work?',
    a: 'Each consumable resource - tokens, web browsing time, compute credits - works like a prepaid wallet. Your plan grants a monthly balance (resets each cycle, lose-it-or-use-it). Top-ups add more on demand, and that cash rolls over as long as your account is active. When the wallet hits zero, the operation stops.',
  },
  {
    q: 'Can I bring my own LLM and skip paying for tokens?',
    a: 'Yes. Connect any OpenAI-compatible provider - OpenRouter, OpenAI, Anthropic, Together, Groq, vLLM, TGI, Ollama, or your own fine-tuned deployment. You pay them directly. In settings, cancel the bundled token portion of your plan to save the cost.',
  },
  {
    q: 'Can I share my plan with my team?',
    a: 'The Standard, Pro, and Max plans are single-user. For team use, the Enterprise plan supports multiple seats, shared resources, role-based access, SSO, and audit logs. Custom team pricing is available - talk to sales.',
  },
  {
    q: 'What about VAT?',
    a: 'All prices on this page are VAT-inclusive (gross). EU B2B customers with a valid VAT ID and non-EU customers see the net price - we don’t charge VAT in those cases.',
  },
  {
    q: 'What about data privacy?',
    a: 'Your workspace is private and yours. Your hub artifacts are private by default. We don’t train on your data. You can export everything anytime, with no egress fees on hub content.',
  },
  {
    q: 'Do you charge for failed agent runs?',
    a: 'Tokens consumed by the model are billed whether the agent succeeded or not - same as every other LLM-based service. We don’t charge browser time or extra compute for failures on our end.',
  },
  {
    q: 'Is there a free trial of paid plans?',
    a: 'The Free plan is open-ended - use it as long as you like, with 1M starter tokens or BYO LLM from day one. If a paid plan doesn’t work for you in the first 14 days, we’ll refund it on request, no questions asked.',
  },
  {
    q: 'Can I run an agent 24/7?',
    a: 'Yes. Agents run continuously within your plan’s concurrent-agent limit - tokens and web browsing hours are the wallets to watch for long-running tasks. The dashboard shows live consumption so you can tune behavior or top up as needed.',
  },
  {
    q: 'How does fine-tuning work? Do I pay for GPUs?',
    a: 'Train on your own data out of the box on our managed GPU cloud - pick a GPU, hit start, and the run draws from your compute credits. No cloud account needed. Prefer your own infrastructure? Connect your cloud (AWS, GCP, Lambda, RunPod, or your own Modal account) via dstack or skypilot and train there instead: your GPUs, your bill, zero credit usage and no GPU markup from us. Either way we orchestrate the run, capture logs and metrics, and track lineage in the hub.',
  },
  {
    q: 'How are compute credits different from agent tokens?',
    a: 'Compute credits meter GPU time - fine-tuning, synthetic dataset generation, and eval runs (HumanEval, MBPP, terminal-bench, SWE-bench, custom suites) - while tokens meter the LLM calls your agents make. One credit is one minute on the baseline GPU tier, so faster GPUs draw proportionally more (an H100 minute is about 6.7 credits) and you pay for exactly the hardware you picked. Standard includes 180 credits/month (3 GPU-hours), Pro 900 (15 GPU-hours), Max 2,400 (40 GPU-hours). Top-up rate is $2.00 per GPU-hour and rolls over. Training on your own connected cloud never touches the wallet.',
  },
  {
    q: 'Why bring my own cloud instead of using yours?',
    a: 'You probably already have credits, a preferred region, specific compliance needs, or a GPU provider relationship. Our managed GPU cloud is the default so you can start without a cloud account, but we won’t lock you into it - connect your own and your provider bills you directly, with no GPU markup from us and no credits consumed. We’d rather make money on the platform than on reselling compute.',
  },
  {
    q: 'Can I serve my fine-tuned models?',
    a: 'Yes. Deploy via your own cloud (dstack/skypilot), and we orchestrate the endpoint. Your agents can call your custom models directly - no token charges from us when you use them.',
  },
  {
    q: 'What’s the hub for?',
    a: 'A git-backed registry for your models, datasets, and checkpoints - like a private Hugging Face Hub. Public read for community sharing, private read/write for your work. Backed by Cloudflare R2 with no egress fees. Private storage scales with your plan: 1 GB on Free, 10 GB on Standard, 50 GB on Pro, 200 GB on Max. Need more on any plan? Extra hub storage is a recurring add-on at +$0.0605/GB/month.',
  },
  {
    q: 'What if I need more than Max but Enterprise is overkill?',
    a: 'Stack add-ons. A Max plan with extra workspace storage (+$0.0605/GB/mo), extra hub storage (+$0.0605/GB/mo), and ongoing wallet top-ups covers a lot of ground before you hit Enterprise territory. Talk to us if you’re not sure.',
  },
];

export default function PricingFAQ() {
  return (
    <section
      id="faq"
      data-screen-label="07 FAQ"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-container mx-auto px-8 grid gap-12 lg:gap-16 grid-cols-1 lg:[grid-template-columns:minmax(0,360px)_1fr]">
        <div>
          <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-graphite">
            <span className="font-mono text-brand-orange mr-2 font-bold">07</span>
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
