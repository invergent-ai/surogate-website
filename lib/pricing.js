// Single-user plans and the pricing FAQ, moved here from the old /pricing/ components.
// Prices are VAT-inclusive; EU businesses with a VAT ID and customers outside the EU
// pay the net price.

export const PERSONAL_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    eyebrow: 'No card required',
    best: 'Try it out. See if it fits your work.',
    cta: { label: 'Start free', href: 'https://ops.surogate.ai/studio/settings/billing' },
    features: [
      { text: 'up to 5 agents' },
      { text: 'Light usage - to try things out' },
      { text: 'Bring your model - FREE forever', strong: true },
      { text: '1 GB workspace', mo: true },
      { text: '1 GB hub storage', mo: true },
      { text: '30 min web browsing', mo: true },
      { text: 'Community support' },
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: { monthly: 19, annual: 18 },
    best: 'For personal projects and occasional automation.',
    cta: { label: 'Choose Standard', href: 'https://ops.surogate.ai/studio/settings/billing' },
    features: [
      { text: 'up to 100 agents', strong: true },
      { text: 'Everyday usage', strong: true },
      { text: '5 GB workspace', mo: true },
      { text: '10 GB hub storage', mo: true },
      { text: '5 hours web browsing', mo: true },
      { text: '180 compute credits (3 GPU-hours)', mo: true },
      { text: 'Agent user self-registration' },
      { text: 'Email support' },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    featured: true,
    badge: 'Most popular',
    price: { monthly: 96, annual: 90 },
    best: 'For daily workflows and serious automation.',
    cta: { label: 'Choose Pro', href: 'https://ops.surogate.ai/studio/settings/billing' },
    features: [
      { text: 'up to 500 agents', strong: true },
      { text: "8x Standard's usage", strong: true },
      { text: '20 GB workspace', mo: true },
      { text: '50 GB hub storage', mo: true },
      { text: '15 hours web browsing', mo: true },
      { text: '900 compute credits (15 GPU-hours)', mo: true },
      { text: 'Agent user self-registration' },
      { text: 'Agent monetization' },
      { text: 'Priority email support' },
    ],
  },
  {
    id: 'max',
    name: 'Max',
    price: { monthly: 190, annual: 180 },
    best: 'For power users, small businesses, and multi-agent setups.',
    cta: { label: 'Choose Max', href: 'https://ops.surogate.ai/studio/settings/billing' },
    features: [
      { text: 'up to 1,000 agents', strong: true },
      { text: "20x Standard's usage", strong: true },
      { text: '50 GB workspace', mo: true },
      { text: '200 GB hub storage', mo: true },
      { text: '40 hours web browsing', mo: true },
      { text: '2,400 compute credits (40 GPU-hours)', mo: true },
      { text: 'Agent user self-registration' },
      { text: 'Agent monetization' },
      { text: 'Priority support' },
    ],
  },
];

const usd = (n) => `$${n.toLocaleString('en-US')}`;

// What a plan card shows for the chosen billing period.
export function priceLines(plan, billing) {
  const { monthly, annual } = plan.price;
  if (monthly === 0) return { amount: 0, perMonth: false, note: plan.eyebrow };
  if (billing === 'annual') {
    return { amount: annual, perMonth: true, note: `${usd(annual * 12)} billed yearly, you save ${usd((monthly - annual) * 12)}` };
  }
  return { amount: monthly, perMonth: true, note: `or ${usd(annual)} / month billed yearly` };
}

export const PRICING_FAQ = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. Upgrades take effect immediately and we prorate the difference. Downgrades take effect at the next billing cycle. No fees either way.',
  },
  {
    q: 'Is usage really included? What about overages?',
    a: 'Every paid plan ships with a monthly usage allowance baked into the price - Standard is the baseline, Pro gives you 8x that, Max 20x - all served on frontier-grade models. There are no surprise overage bills: when your monthly allowance runs out, agents pause until you top up your wallet (rolling-over cash, from $2) or wait for the next cycle. You stay in control.',
  },
  {
    q: 'What happens if my usage runs out mid-task?',
    a: 'The operation stops. No auto-upgrade, no overdraft, no end-of-month invoice. Top up the wallet with as little or as much as you want - top-up balances never expire until you use them - and the task resumes. You can also bring your own LLM provider and pay them directly, which bypasses our usage allowance entirely.',
  },
  {
    q: 'How do top-ups work?',
    a: 'Each consumable resource - usage, web browsing time, compute credits - works like a prepaid wallet. Your plan grants a monthly balance (resets each cycle, lose-it-or-use-it). Top-ups add more on demand, and that cash rolls over as long as your account is active. When the wallet hits zero, the operation stops.',
  },
  {
    q: 'Can I bring my own LLM and skip paying for usage?',
    a: 'Yes. Connect any OpenAI-compatible provider - OpenRouter, OpenAI, Anthropic, Together, Groq, vLLM, TGI, Ollama, or your own fine-tuned deployment. You pay them directly. In settings, cancel the bundled usage portion of your plan to save the cost.',
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
    a: 'The Free plan is open-ended - use it as long as you like, with a starter usage allowance or BYO LLM from day one. If a paid plan doesn’t work for you in the first 14 days, we’ll refund it on request, no questions asked.',
  },
  {
    q: 'Can I run an agent 24/7?',
    a: 'Yes. Agents run continuously within your plan’s concurrent-agent limit - usage and web browsing hours are the wallets to watch for long-running tasks. The dashboard shows live consumption so you can tune behavior or top up as needed.',
  },
  {
    q: 'How does fine-tuning work? Do I pay for GPUs?',
    a: 'Train on your own data out of the box on our managed GPU cloud - pick a GPU, hit start, and the run draws from your compute credits. No cloud account needed. Prefer your own infrastructure? Connect your cloud (AWS, GCP, Lambda, RunPod, or your own Modal account) via dstack or skypilot and train there instead: your GPUs, your bill, zero credit usage and no GPU markup from us. Either way we orchestrate the run, capture logs and metrics, and track lineage in the hub.',
  },
  {
    q: 'How are compute credits different from agent usage?',
    a: 'Compute credits meter GPU time - fine-tuning, synthetic dataset generation, and eval runs (HumanEval, MBPP, terminal-bench, SWE-bench, custom suites) - while your usage allowance covers the LLM calls your agents make. One credit is one minute on the baseline GPU tier, so faster GPUs draw proportionally more (an H100 minute is about 6.7 credits) and you pay for exactly the hardware you picked. Standard includes 180 credits/month (3 GPU-hours), Pro 900 (15 GPU-hours), Max 2,400 (40 GPU-hours). Top-up rate is $2.00 per GPU-hour and rolls over. Training on your own connected cloud never touches the wallet.',
  },
  {
    q: 'Why bring my own cloud instead of using yours?',
    a: 'You probably already have credits, a preferred region, specific compliance needs, or a GPU provider relationship. Our managed GPU cloud is the default so you can start without a cloud account, but we won’t lock you into it - connect your own and your provider bills you directly, with no GPU markup from us and no credits consumed. We’d rather make money on the platform than on reselling compute.',
  },
  {
    q: 'Can I serve my fine-tuned models?',
    a: 'Yes. Deploy via your own cloud (dstack/skypilot), and we orchestrate the endpoint. Your agents can call your custom models directly - no usage charges from us when you use them.',
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
