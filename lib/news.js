// News posts, newest first. Each post is dated from a public record and names it in `source`;
// a post whose date cannot be sourced is left out. Bodies are a small Markdown subset
// (## headings, paragraphs, - lists, [links](url), `code` and ``` blocks), rendered by
// components/news/Markdown.jsx. Numbers in a post are as of its date, with their conditions.

import { ENGINE, SPEECH_ABOUT } from './labs.js';

export const POSTS = [
  {
    slug: 'keel',
    date: '2026-10-25',
    category: 'Product',
    cover: 'keel',
    title: 'Keel: processes that run agents',
    dek: 'Agents, people and your systems each do their step, under rules your team owns.',
    source: { label: 'surogate.ai/keel, published 25 Oct 2026', href: '/keel/' },
    cta: { label: 'See how Keel works', href: '/keel/' },
    body: `An agent with only instructions can approve early, skip a check or stop halfway. Keel puts the agent inside one step of a fixed process, so it does that step and nothing else.

## What Keel guarantees

- **The process decides what happens next.** Agents, people, systems and rules each do their own step. No agent can skip ahead or close a case early.
- **Decisions come from rules your team owns.** Approvals, risk scores and routing run on versioned rules that your analysts read and change.
- **People keep the final say.** Approval limits and four-eyes checks apply to agents as they do to staff. An agent that is unsure stops and asks a person.
- **It runs where your data lives.** Use any model and connect the systems you already run, in our cloud or in your own data centre.

## A mortgage application, as Keel records it

Intake takes the documents. An agent checks them and finds that the payslip and the bank statement disagree. A loan officer picks the figure. The scorecard (version 12) gives a credit score of 721, and the application is approved within a €250,000 limit. Every step, with who or what did it, stays in the case record and can be replayed.

## Price

On Surogate cloud, Keel is priced per completed case on any cloud plan: $0.20 for the first 10,000 cases a month, $0.10 up to 100,000 and $0.05 beyond. Model calls inside a case are billed at cost.`,
  },
  {
    slug: 'surogate-3-7-flash',
    date: '2026-10-20',
    category: 'Model',
    cover: 'flash',
    title: 'Surogate 3.7 Flash is on llm.buzz',
    dek: 'Open weights, text and images in, a 1M-token context, served from the EU.',
    source: { label: 'llm.buzz model page, listed 20 Oct 2026', href: 'https://llm.buzz/models/surogate/surogate3.7-flash' },
    cta: { label: 'Open on llm.buzz', href: 'https://llm.buzz/models/surogate/surogate3.7-flash', external: true },
    facts: [
      { n: '1M', l: 'tokens of context' },
      { n: '32K', l: 'tokens of output' },
      { n: '$0.15', l: 'per million input tokens, Surogate Spark EU' },
    ],
    body: `Surogate 3.7 Flash is listed on llm.buzz as \`surogate/surogate3.7-flash\`. It reads text and images and writes text, with up to 1M tokens of context and 32K tokens of output. It supports tools, prompt caching and structured outputs.

## Who serves it

Two providers in the EU serve it. Neither trains on prompts, and both keep them for zero days. Prices are per million tokens, as llm.buzz showed them on 27 October 2026:

- **Surogate Spark EU:** $0.15 input, $1.00 output. 0.04 s to the first token, the median of the last 24 hours.
- **Simpleminds EU:** $0.10 input, $0.75 output, FP4. 0.07 s to the first token.

The router sends requests to Surogate Spark EU for its faster first token. Prices and speeds move; the live numbers are on the model's llm.buzz page.

## Call it

One key works for every model on llm.buzz, through an OpenAI-compatible API:

\`\`\`
curl https://api.llm.buzz/api/v1/chat/completions \\
  -H "Authorization: Bearer $LLM_BUZZ_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "surogate/surogate3.7-flash",
       "messages": [{"role": "user", "content": "Hello"}]}'
\`\`\`

The model page does not yet publish a parameter count or a licence text. We will add both here when it does.`,
  },
  {
    slug: 'llm-buzz',
    date: '2026-10-19',
    category: 'AI Gateway',
    cover: 'gateway',
    title: 'llm.buzz, the open market for inference, is public',
    dek: 'Providers post their own prices. The router compares them on every request.',
    source: { label: 'llm.buzz/about, 19 Oct 2026', href: 'https://llm.buzz/about' },
    cta: { label: 'Get an API key', href: 'https://llm.buzz', external: true },
    body: `llm.buzz is our AI Gateway: one API key for every model, with no markup on what providers charge.

## A market, not a list

A model name is a slot that several providers can fill. Each provider posts its own price, and the router compares them on every request. You pick how it chooses, per model:

- **smart:** price and time to first token together. Every new model starts here.
- **cheapest** or **fastest**, for one model or, with \`:floor\` and \`:nitro\`, for one request.
- **order:** a fixed order of providers.

If the first provider errors or times out, the next one answers, and you pay the price of the provider that served you.

## Where your prompts go

Every endpoint declares whether it serves from the EU, whether it trains on prompts and how many days it keeps them. Routing can stay inside the EU on every plan.

## Sell your inference

Anyone who serves or fine-tunes models can list an endpoint at their own price. A listing goes live when the endpoint passes an automated check, and leaves routing when it fails one.

## How it got here

Work started on 19 August 2026. EU-only routing came on 12 October, prepaid credit on 14 October, and providers began applying and setting their prices on 18 October. On 21 October the rankings and the apps pages followed, with the post [A market, not a gateway](https://llm.buzz/blog/a-market-not-a-gateway).`,
  },
  {
    slug: 'jackrabbit-and-amami',
    date: '2026-09-25',
    category: 'Speech',
    cover: 'speech',
    title: 'Jackrabbit and Amami, open speech models for Romanian',
    dek: 'Jackrabbit writes Romanian down. Amami reads it aloud. Both are small enough for a CPU.',
    source: { label: 'Surogate Speech on Hugging Face, 25 Sep 2026', href: SPEECH_ABOUT.article },
    cta: { label: 'Listen in Labs', href: '/labs/speech/' },
    facts: [
      { n: '5.69%', l: 'word error rate, FLEURS Romanian test, 883 clips' },
      { n: '116M', l: 'parameters in Jackrabbit' },
      { n: 'CC-BY-NC-4.0', l: 'weights; commercial licences through Invergent' },
    ],
    body: `Surogate Speech is our line of small, open speech models for agents: one model family per job, Jackrabbit to listen and Amami to speak, shipped language by language. Romanian is the first.

## Jackrabbit

Jackrabbit 110M turns recordings into cased, punctuated Romanian. On the 883 clips of the FLEURS Romanian test it has a 5.69% word error rate, with CTC decoding and a 4-gram language model, scored with the Open ASR Leaderboard runner.

A streaming version shows words while you speak and writes the final sentence when you pause, over HTTP or WebSocket.

## Amami

Amami reads Romanian aloud for voice agents. It puts the stress where native speakers put it, reads numbers, dates and amounts in words, and runs on a CPU.

## Licence

The weights are under CC-BY-NC-4.0 for research and non-commercial use. Commercial licences come through Invergent.

Every clip on the Labs page was generated by the models, and the evaluation transcripts are public on Hugging Face.`,
  },
  {
    slug: 'engine-serving',
    date: '2026-09-21',
    category: 'Open source',
    cover: 'engine',
    title: 'Surogate Engine 1.5 serves what it trains',
    dek: 'surogate serve joins training in one Apache 2.0 toolkit, on native C++/CUDA.',
    source: { label: 'GitHub release v1.5.0, 21 Sep 2026', href: 'https://github.com/invergent-ai/surogate/releases/tag/v1.5.0' },
    cta: { label: 'Read the benchmarks', href: '/labs/engine/' },
    facts: [
      { n: ENGINE.facts[0].n, l: 'training throughput vs. Unsloth, 1× H100, BF16 on both' },
      { n: ENGINE.facts[1].n, l: 'serving throughput vs. llama.cpp, 8× RTX 5090, 16 users' },
      { n: 'Apache 2.0', l: 'licence' },
    ],
    body: `Surogate Engine started as a trainer: pretraining, full fine-tuning, LoRA and QLoRA, then reinforcement learning. Version 1.5.0 adds \`surogate serve\`, a native HTTP server in the same toolkit, so the model you train is the model you serve, without a second stack.

## What serving does

- Serves Hugging Face checkpoints and GGUF files directly.
- Speaks the Chat Completions, Completions, Responses and Messages APIs, so existing clients connect unchanged.
- Batches concurrent users, and loads LoRA adapters at runtime, one per request.

## The numbers

Measured on RTX 5090s, against the baseline each row names, from the engine's README:

- 802 tokens a second for one user, one GPU, Qwen3.5-0.8B GGUF.
- 7.0× the throughput of llama.cpp at 16 users on 8 GPUs.
- 2.53× the training throughput of Unsloth on one H100, BF16 on both.

## Install

\`\`\`
${ENGINE.install}
\`\`\`

Linux x86_64 and an NVIDIA GPU. The code is on GitHub under Apache 2.0.`,
  },
];

export const post = (slug) => POSTS.find((p) => p.slug === slug);

export const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
