// Every price on the site. Personal and client plans come from the old /pricing/ components
// (PersonalPlans.jsx, ClientPricing.jsx); the API terms from the v2 spec §3.4. Prices include VAT;
// EU businesses with a VAT ID and customers outside the EU pay the net price.

const BILLING = 'https://ops.surogate.ai/studio/settings/billing';

export const PERSONAL_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    eyebrow: 'No card required',
    best: 'Try it on your own work.',
    cta: { label: 'Start free', href: BILLING },
    features: [
      { text: 'Up to 5 agents' },
      { text: 'Light usage, to try things out' },
      { text: 'Bring your own model, free for good', strong: true },
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
    best: 'Personal projects and occasional automation.',
    cta: { label: 'Choose Standard', href: BILLING },
    features: [
      { text: 'Up to 100 agents', strong: true },
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
    best: 'Daily workflows, and agents you sell.',
    cta: { label: 'Choose Pro', href: BILLING },
    features: [
      { text: 'Up to 500 agents', strong: true },
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
    best: 'Power users, small firms and multi-agent setups.',
    cta: { label: 'Choose Max', href: BILLING },
    features: [
      { text: 'Up to 1,000 agents', strong: true },
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

// The cheapest personal plan that lets you sell an agent, for the professionals page.
export const SELLING_PLAN = PERSONAL_PLANS.find((p) => p.features.some((f) => f.text === 'Agent monetization'));

// One organisation per client, unlimited users and agents.
export const TEAM_PLANS = [
  {
    id: 'pilot',
    name: 'Pilot',
    price: { monthly: 0, annual: 0 },
    eyebrow: 'For the first 60 days of every new client',
    best: 'Prove it on real work first.',
    cta: { label: 'Start a pilot', href: 'https://ops.surogate.ai' },
    features: [
      { text: 'Unlimited users and agents' },
      { text: 'Up to 1,000 agents working at once' },
      { text: '40 hours web browsing' },
      { text: '50 GB workspace, 200 GB hub storage' },
      { text: '40 GPU-hours for fine-tuning and evals' },
    ],
  },
  {
    id: 'production',
    name: 'Production',
    featured: true,
    price: { monthly: 990, annual: 940 },
    best: 'One organisation, live.',
    cta: { label: 'Go to production', href: 'https://ops.surogate.ai' },
    features: [
      { text: 'Unlimited users and agents' },
      { text: 'Up to 1,000 agents working at once' },
      { text: '200 hours web browsing' },
      { text: '250 GB workspace, 1 TB hub storage' },
      { text: '40 GPU-hours for fine-tuning and evals' },
      { text: 'Priority email support' },
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: { monthly: 2990, annual: 2840 },
    best: 'Many teams, with single sign-on.',
    cta: { label: 'Choose Scale', href: 'https://ops.surogate.ai' },
    features: [
      { text: 'Unlimited users and agents' },
      { text: 'Up to 5,000 agents working at once' },
      { text: '600 hours web browsing' },
      { text: '750 GB workspace, 3 TB hub storage' },
      { text: '200 GPU-hours for fine-tuning and evals' },
      { text: 'Single sign-on, roles and audit logs' },
      { text: 'Priority support' },
    ],
  },
];

// Keel on Surogate cloud, per completed case, on any cloud plan.
export const KEEL_PER_CASE = [
  { upTo: 'First 10,000 cases a month', price: 0.2 },
  { upTo: 'Up to 100,000', price: 0.1 },
  { upTo: 'Beyond 100,000', price: 0.05 },
];

export const RATES = [
  { what: 'Web browsing', price: '$0.08', per: 'an hour' },
  { what: 'GPU', price: '$2.00', per: 'a GPU-hour' },
  { what: 'Storage', price: '$0.0605', per: 'per GB a month' },
];

// The hosted API on llm.buzz (spec §3.4).
export const API_TERMS = { markup: '0%', topUpFee: '5.5%' };

// The partner programme's share of each client plan (the old /pricing/ and /partners/ pages).
export const PARTNER_SHARE = { base: 0.3, diamond: 0.4, founding: 10, foundingMonths: 12 };
export const partnerShare = (amount, share = PARTNER_SHARE.base) => Math.round(amount * share);

export const usd = (n) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: n % 1 ? 2 : 0 })}`;

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
    a: 'Every paid plan includes a monthly usage allowance: Standard is the baseline, Pro gives you 8x that and Max 20x, all on frontier-grade models. There are no overage bills. When the allowance runs out, agents pause until you top up your wallet (from $2, and the cash rolls over) or the next cycle starts.',
  },
  {
    q: 'What happens if my usage runs out mid-task?',
    a: 'The operation stops. No auto-upgrade, no overdraft, no end-of-month invoice. Top up the wallet with any amount (top-up balances never expire) and the task resumes. You can also bring your own model provider and pay it directly, which bypasses the allowance entirely.',
  },
  {
    q: 'How do top-ups work?',
    a: 'Each consumable resource (usage, web browsing time, compute credits) works like a prepaid wallet. Your plan grants a monthly balance that resets each cycle. Top-ups add more on demand, and that cash rolls over as long as your account is active. When the wallet hits zero, the operation stops.',
  },
  {
    q: 'Can I bring my own model and skip paying for usage?',
    a: 'Yes. Connect any OpenAI-compatible provider: OpenRouter, OpenAI, Anthropic, Together, Groq, vLLM, TGI, Ollama or your own fine-tuned deployment. You pay them directly. In settings, cancel the bundled usage portion of your plan to save the cost.',
  },
  {
    q: 'Can I share my plan with my team?',
    a: 'Standard, Pro and Max are single-user. For a team, use a Teams plan: one organisation with unlimited users and agents. Scale adds single sign-on, roles and audit logs.',
  },
  {
    q: 'Which models are included?',
    a: 'Two frontier model levels on every plan: Surogate (Sonnet class) and Surogate Pro (Opus class). Pro is stronger and draws about 2.5x faster from the allowance.',
  },
  {
    q: 'What about data privacy?',
    a: 'Your workspace is private and yours, and hub artifacts are private by default. We do not train on your data. You can export everything anytime, with no egress fees on hub content.',
  },
  {
    q: 'Do you charge for failed agent runs?',
    a: 'Tokens the model consumed are billed whether the agent succeeded or not, as with every model-based service. We do not charge browser time or extra compute for failures on our end.',
  },
  {
    q: 'Is there a free trial of paid plans?',
    a: 'The Free plan is open-ended, with a starter usage allowance or your own model from day one. If a paid plan does not work for you in the first 14 days, we refund it on request.',
  },
  {
    q: 'Can I run an agent 24/7?',
    a: 'Yes. Agents run continuously within your plan’s limit on agents working at once. Usage and web browsing hours are the wallets to watch on long tasks, and the dashboard shows live consumption.',
  },
  {
    q: 'How does fine-tuning work? Do I pay for GPUs?',
    a: 'Train on your own data on our managed GPU cloud: pick a GPU, start, and the run draws from your compute credits. Or connect your own cloud (AWS, GCP, Lambda, RunPod or your own Modal account) through dstack or skypilot and train there: your GPUs, your bill, no credits used and no GPU markup from us. Either way we orchestrate the run, capture logs and metrics, and track lineage in the hub.',
  },
  {
    q: 'How are compute credits different from agent usage?',
    a: 'Compute credits meter GPU time for fine-tuning, synthetic datasets and eval runs (HumanEval, MBPP, terminal-bench, SWE-bench, your own suites). The usage allowance covers your agents’ model calls. One credit is one minute on the baseline GPU tier, so faster GPUs draw more (an H100 minute is about 6.7 credits). Standard includes 180 credits a month (3 GPU-hours), Pro 900 (15), Max 2,400 (40). Top-ups are $2.00 per GPU-hour and roll over.',
  },
  {
    q: 'Why bring my own cloud instead of using yours?',
    a: 'You may already have credits, a preferred region, compliance needs or a GPU provider. Our GPU cloud is the default so you can start without an account, but your provider can bill you directly instead, with no GPU markup from us and no credits used.',
  },
  {
    q: 'Can I serve my fine-tuned models?',
    a: 'Yes. Deploy on your own cloud (dstack or skypilot) and we orchestrate the endpoint. Your agents call your models directly, with no usage charges from us.',
  },
  {
    q: 'What is the hub for?',
    a: 'A git-backed registry for your models, datasets and checkpoints, like a private Hugging Face Hub, backed by Cloudflare R2 with no egress fees. Private storage is 1 GB on Free, 10 GB on Standard, 50 GB on Pro and 200 GB on Max. Extra hub storage is $0.0605 per GB a month on any plan.',
  },
  {
    q: 'What if I need more than Max?',
    a: 'Add storage ($0.0605 per GB a month for workspace or hub) and top up the wallet, or move to a Teams plan for unlimited users. Write to us if you are not sure.',
  },
];

export const TEAMS_FAQ = [
  {
    q: 'What is a client organisation?',
    a: 'One organisation per client or company, with unlimited users and agents. Each plan is priced per organisation, not per seat.',
  },
  {
    q: 'What does the pilot include?',
    a: 'The first 60 days of every new client are free, with Production-size limits on agents working at once and 40 hours of web browsing.',
  },
  {
    q: 'How are models billed?',
    a: 'Bring your own provider and pay it directly, or use ours at the provider’s price with no markup.',
  },
  {
    q: 'How is Keel billed?',
    a: 'Per completed case on any cloud plan: $0.20 for the first 10,000 cases a month, $0.10 up to 100,000 and $0.05 beyond. Model calls inside a case are billed at cost, like any other session.',
  },
  {
    q: 'What if we use more than the plan includes?',
    a: 'More at the usual rates: web browsing $0.08 an hour, GPU $2.00 a GPU-hour, storage $0.0605 per GB a month.',
  },
  {
    q: 'Is there a yearly price?',
    a: 'Yes. Production is $940 a month billed yearly, and Scale $2,840.',
  },
];

export const ENTERPRISE_FAQ = [
  {
    q: 'Why is there no price on this tab?',
    a: 'An installation on your own infrastructure is a yearly licence, and its price is not public. We quote it after a call about your size and setup.',
  },
  {
    q: 'What runs inside our network?',
    a: 'The whole platform: agents, Keel and the models, on your Kubernetes. No data has to leave your network.',
  },
  {
    q: 'Can we use our own models?',
    a: 'Yes. Surogate 3.7, Jackrabbit and Amami run on your GPUs, next to your fine-tunes, or connect any provider you already use.',
  },
  {
    q: 'Can a partner run it for us?',
    a: 'Yes. Our partners deliver and run Surogate for their clients. Ask us and we introduce you to one.',
  },
];

export const API_FAQ = [
  {
    q: 'What does 0% markup mean?',
    a: 'You pay the token price each provider posts on llm.buzz. We add nothing per token.',
  },
  {
    q: 'Where does the 5.5% come from?',
    a: 'It is the fee on each credit top-up on llm.buzz.',
  },
  {
    q: 'Is it compatible with my code?',
    a: 'Yes. The AI Gateway is OpenAI and Anthropic compatible: change the base URL and keep your code.',
  },
  {
    q: 'Can routing stay in the EU?',
    a: 'Yes. EU-only routing is on every plan, and zero-retention routing keeps prompts with providers that do not store them.',
  },
  {
    q: 'Can I limit what a project spends?',
    a: 'Yes. Each project gets its own keys, each with a spend limit.',
  },
  {
    q: 'Can I sell my own model there?',
    a: 'Yes. List your endpoint at your own price and llm.buzz sends you the callers. That includes a model you fine-tuned with us.',
  },
];

export const PRICING_TABS = [
  { id: 'individual', label: 'Individual', faq: PRICING_FAQ },
  { id: 'teams', label: 'Teams', faq: TEAMS_FAQ },
  { id: 'enterprise', label: 'Enterprise', faq: ENTERPRISE_FAQ },
  { id: 'api', label: 'AI Gateway', faq: API_FAQ },
];
