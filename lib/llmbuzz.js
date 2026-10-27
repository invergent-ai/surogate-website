// What llm.buzz posts, copied as published. Refresh from the sources; never edit a number by hand.
// One model's market: its live providers in the router's order ("llm.buzz" is the site's own endpoint,
// listed there by that name), with posted input price in USD per 1M tokens and the 24-hour median first token.
export const MARKET = {
  source: 'https://llm.buzz/models/z-ai/glm-5.3',
  taken: '2026-10-27',
  model: 'z-ai/glm-5.3',
  providers: [
    { name: 'llm.buzz', input: 0.98, firstToken: 6.17 },
    { name: 'Prime Intellect', input: 0.98, firstToken: 0.58 },
    { name: 'Alibaba', input: 1.19, firstToken: 2.07 },
    { name: 'Novita', input: 1.4, firstToken: 1.72 },
    { name: 'Scaleway EU', input: 2.0743, firstToken: 0.28 },
  ],
};

// From https://llm.buzz and https://llm.buzz/eu, 2026-10-27.
export const PROMISE = '0% markup · one key · EU-only routing on every plan';

// The two presets anyone can check from the posted numbers: cheapest (ties go to the faster) and fastest.
export const RANKS = {
  cheapest: [...MARKET.providers].sort((a, b) => a.input - b.input || a.firstToken - b.firstToken),
  fastest: [...MARKET.providers].sort((a, b) => a.firstToken - b.firstToken),
};
