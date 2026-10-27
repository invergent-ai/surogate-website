// The AI Gateway is llm.buzz. What its own pages say, copied as published on 2026-10-27; refresh from the sources
// before changing a number. Prices are USD per million tokens, set by each provider; first token is the
// site's 24-hour median.

export const TAKEN = '2026-10-27';

export const SOURCES = {
  home: 'https://llm.buzz',
  pricing: 'https://llm.buzz/pricing',
  eu: 'https://llm.buzz/eu',
  enterprise: 'https://llm.buzz/enterprise',
  providers: 'https://llm.buzz/providers',
  join: 'https://llm.buzz/providers/join',
  routing: 'https://llm.buzz/docs/models-and-routing',
  market: 'https://llm.buzz/blog/a-market-not-a-gateway',
  flash: 'https://llm.buzz/models/surogate/surogate3.7-flash',
};

export const BASE_URL = 'https://api.llm.buzz/api/v1';

// llm.buzz home, /providers and /pricing.
export const MARKET = { models: 86, providers: 11, euProviders: 3, markup: '0%', topUpFee: '5.5%', topUpMin: '$0.80', topUp: ['$5', '$25,000'] };

// /docs/models-and-routing: one preset per model; provider.sort or a :floor / :nitro suffix overrides one request.
export const PRESETS = [
  { key: 'smart', label: 'Smart', line: 'By price and time to first token together.' },
  { key: 'cheapest', label: 'Cheapest', line: 'By the estimated cost of the request at each provider\'s price.' },
  { key: 'fastest', label: 'Fastest', line: 'By recent time to first token.' },
];

// /models/surogate/surogate3.7-flash: the two providers, in the order the router put them.
export const FLASH_MARKET = {
  model: 'surogate/surogate3.7-flash',
  name: 'Surogate 3.7 Flash',
  providers: [
    { name: 'Surogate Spark', region: 'EU', input: 0.15, output: 1, firstToken: 0.04 },
    { name: 'Simpleminds EU', region: 'EU, FP4', input: 0.1, output: 0.75, firstToken: 0.07 },
  ],
};

// Which provider each preset puts first. Smart is the router's own published order, so it is the first row.
export const pickFor = (preset, providers = FLASH_MARKET.providers) => {
  if (preset === 'cheapest') return providers.reduce((m, p, i, a) => (p.input < a[m].input ? i : m), 0);
  if (preset === 'fastest') return providers.reduce((m, p, i, a) => (p.firstToken < a[m].firstToken ? i : m), 0);
  return 0;
};

// /eu and /providers: the providers that serve from the EU and what each declares.
export const EU_PROVIDERS = [
  { name: 'Surogate Spark', policy: 'Does not train on prompts and keeps nothing.' },
  { name: 'Simpleminds EU', policy: 'Does not train on prompts and keeps nothing.' },
  { name: 'Scaleway', policy: 'Has not declared whether it trains on prompts or how long it keeps them.' },
];

// /enterprise and /pricing.
export const CONTROLS = [
  ['A key for each project', 'Each with its own expiry. Create, limit and revoke keys through the API.'],
  ['Spend limits', 'A dollar cap per key, daily to lifetime, and one monthly cap for the account.'],
  ['EU routing', 'Keep a request on EU providers, or send nothing. On every plan.'],
  ['Zero retention', 'Only providers that keep prompts for 0 days, and no training, account-wide.'],
  ['Failover', 'The next provider answers when one fails. Failed attempts are never charged.'],
  ['Request logs', 'Every attempt with its latency, tokens and cost. Activity for up to 90 days.'],
];

// /providers/join.
export const JOIN = {
  href: 'https://llm.buzz/providers/join',
  line: 'List your endpoint at your own price. We send you the callers.',
  cut: '0%',
  steps: [
    ['Apply', 'Company details and up to ten endpoints. A person reviews every application.'],
    ['List models', 'Pick models from the catalog and set your price.'],
    ['Pass the check', 'Real test requests go to your endpoint before you go live.'],
    ['Get paid', 'A statement each month. You invoice it, and llm.buzz pays it.'],
  ],
};

export const price = (n) => `$${n.toFixed(2)}`;
