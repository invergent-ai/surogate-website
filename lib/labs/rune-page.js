/*
 * Content for surogate.ai/labs/rune, below the hero. Every example, number and claim comes from the
 * Rune launch post (invergent.ai/blog/rune) or the model card (huggingface.co/surogate/rune-26b-a4b-GGUF).
 * rune-page.test.mjs guards the shape and the no-competitor rule.
 */

/* The three kinds of question, each with the launch post's own example and answer. */
export const KINDS = [
  {
    type: 'choice',
    title: 'Pick one',
    short: 'Pick one',
    line: 'Route a complaint, a ticket or a referral to the team that should handle it.',
    input: 'I was charged twice for the same purchase on 14 March and the second charge has still not been reversed.',
    question: 'Which team should handle this complaint?',
    options: [
      { label: 'Cards', p: 0.93 },
      { label: 'Lending', p: 0.01 },
      { label: 'Accounts', p: 0.06 },
    ],
    answer: 'Cards',
    sub: 'One of your three teams, with every probability',
  },
  {
    type: 'noul',
    title: 'True or false',
    short: 'True / false',
    line: 'Check a fact: does the invoice match the purchase order, does the reply answer the question.',
    input: 'Purchase order: Nordkraft AS, 3 lines, €12,400. Invoice: Nordkraft AS, 3 lines, €12,400.',
    question: 'Does the invoice match the purchase order?',
    p: 0.97,
    answer: 'True: it matches',
    sub: 'One probability: how likely the statement is true',
  },
  {
    type: 'score',
    title: 'Place on your scale',
    short: 'Scale',
    line: 'Severity, risk or urgency, on levels you define, read back as a position on them.',
    input: 'Payments have been failing for all customers in the Nordics since 09:12. Retries are not succeeding.',
    question: 'How severe is this incident?',
    options: [
      { label: 'Cosmetic', p: 0 },
      { label: 'Degraded for some', p: 0.06 },
      { label: 'Down for everyone', p: 0.94 },
    ],
    answer: 'Down for everyone',
    sub: '1.94 on a 0–2 scale',
  },
];

/* What comes back, from the launch post's "Key capabilities". */
export const CAPABILITIES = [
  { icon: 'set', title: 'Only your options', line: 'A choice returns one of the keys you supplied, a score a position on your list. Nothing to parse, nothing invented.' },
  { icon: 'dist', title: 'Every probability', line: 'Each answer carries the probability of every option you offered, so a close call and a clear one look different.' },
  { icon: 'cal', title: 'Confidence you can threshold', line: 'Higher confidence means higher accuracy, so apply the sure answers automatically and send the rest for review.' },
  { icon: 'many', title: 'Many questions, one request', line: 'Ask about category, priority and completeness together; each answer stands on its own.' },
  { icon: 'input', title: 'Your data as it is', line: 'The input can be a string, a record, a list or an image. Send what you already have.' },
  { icon: 'think', title: 'Thinks only when unsure', line: 'With thinking on, a question Rune is less than 70% sure of reasons briefly first. The rest stay one pass.' },
];

/* Where it fits, from the launch post's use cases and "Other applications". */
export const USES = [
  { icon: 'Route', title: 'Routing', line: 'Send each complaint, ticket or referral to the team that should handle it.' },
  { icon: 'CircleCheck', title: 'Validation', line: 'Does the invoice match the order? Does the reply answer the question? Is the document still valid?' },
  { icon: 'Gauge', title: 'Prioritising', line: 'Incident severity, transaction risk and ticket urgency on a scale you define.' },
  { icon: 'Bot', title: 'Inside an agent loop', line: 'Choose the next tool, step or sub-agent fast enough to sit in the loop itself.' },
  { icon: 'Layers', title: 'Batch classification', line: 'Tag a whole archive with several attributes per document, paying for GPU time and nothing else.' },
  { icon: 'ShieldAlert', title: 'Screening and fraud', line: 'Is this claim consistent with the policy? Is this message phishing? Borderline cases go to a person.' },
  { icon: 'ClipboardCheck', title: 'Grading other models', line: 'Score a generated reply for accuracy, tone or policy before it reaches a customer.' },
  { icon: 'TextSearch', title: 'Extraction from a fixed list', line: 'Pull the supplier, product line or department when the allowed values are known.' },
];

/* What it can look at, from the launch post ("Documents and images") and the model card's image section. */
export const SEES = [
  { kind: 'form', title: 'Scanned forms' },
  { kind: 'meter', title: 'Meter photos' },
  { kind: 'screen', title: 'Screenshots' },
  { kind: 'chart', title: 'Charts and tables' },
];

export const DEPLOY = {
  hosted: 'Send decisions to our endpoint and start without setting up a GPU.',
  own: 'Run it on your own cards and the data never leaves your environment. It works fully offline.',
  terms: ['Apache 2.0 weights: keep, inspect, fine-tune, deploy', 'No per-token fees', 'No rate limits', 'No dependency on a hosted provider'],
  speed: { n: '90–180 ms', l: 'per decision on one NVIDIA RTX PRO 6000, served by Surogate' },
  hardware: 'Fastest on NVIDIA Blackwell (RTX 50 and RTX PRO). Also runs on Hopper, Ada Lovelace and Ampere.',
  command: `hf download surogate/rune-26b-a4b-GGUF --local-dir rune
surogate serve ./rune --host 0.0.0.0 --port 8000 \\
  --max-model-len 32768 --max-num-seqs 8 --kv-capacity auto --decision-temperature 2`,
  note: 'The weights take 51.6 GB in bf16. --decision-temperature 2 makes confidence match accuracy; it never changes which option Rune picks.',
};
