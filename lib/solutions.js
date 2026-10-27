// The solution pages: who each is for, the problems it answers and the products it uses.
// Every claim is copied from a product page (components/{agents,keel}/*, the llm.buzz facts in the v2 learnings), lib/labs.js
// or lib/pricing.js; customers are anonymized (lib/customers.js).

import { PRODUCTS } from './products.js';
import { ENGINE, SPEECH_MODELS } from './labs.js';

// For lib/site.js ROUTES: titles and descriptions of the pages built here.
export const SOLUTION_ROUTES = [
  { path: '/solutions/', title: 'Solutions - Every use case, by industry',
    description: 'What banks, insurers, public institutions, companies and professionals run on Surogate, with films of the product at work.' },
  { path: '/solutions/enterprise/', title: 'Surogate for Enterprise - AI on your infrastructure',
    description: 'Agents, processes and models for every team, with single sign-on, audit logs and spend limits per key, in your cloud or on your hardware.' },
  { path: '/solutions/government/', title: 'Surogate for Government - Air-gapped AI for public institutions',
    description: 'Air-gapped installs, EU hosting, open-source code your auditors can read, and Romanian speech models.' },
  { path: '/solutions/banking-insurance/', title: 'Surogate for Banking and Insurance - Regulated AI, on premises',
    description: 'Call-center voice in Romanian, case handling with approval limits and four-eyes checks, and models that stay in your data centre.' },
  { path: '/solutions/professionals/', title: 'Surogate for Professionals - An agent for your practice',
    description: 'For lawyers, doctors, accountants and teachers: an agent that answers clients from the file, chases documents, and that you can sell.' },
  { path: '/solutions/custom-models/', title: 'Custom Models - We train your model',
    description: 'Your data, trained and evaluated on our open-source engine, and served where your data lives.' },
  { path: '/security/', title: 'Security and Trust - Where your data lives',
    description: 'EU hosting, your cloud, your hardware or air-gapped; keys agents never see; open source you can audit.' },
  { path: '/customers/', title: 'Customers - Who runs Surogate',
    description: 'A top-5 Romanian bank, an insurer, an energy company and a national regulator, and films of the product on demo businesses.' },
];

export const product = (key) => {
  const p = PRODUCTS.find((x) => x.key === key);
  if (!p) throw new Error(`No product ${key}`);
  return p;
};

// The same four answers as the home page's "Where should it run?" switch.
export const DEPLOYMENTS = [
  { name: 'Our EU cloud', line: 'Hosted in the EU. Start in minutes.' },
  { name: 'Your cloud', line: 'Your account, your region, your keys.' },
  { name: 'Your hardware', line: 'On your servers, managed by your team.' },
  { name: 'Air-gapped', line: 'No connection out. Models included.' },
];

const AMAMI = SPEECH_MODELS.find((m) => m.name === 'Amami TTS');
const JACKRABBIT = SPEECH_MODELS.find((m) => m.name === 'Jackrabbit ASR');

export const SOLUTIONS = {
  enterprise: {
    path: '/solutions/enterprise/',
    label: 'Enterprise',
    h1: 'AI for every team, on your infrastructure.',
    sub: 'Agents, processes and models, with single sign-on, audit logs and a spend limit on every key.',
    trust: ['Our EU cloud or yours', 'Single sign-on and roles', 'Audit logs', 'Open-source runtime'],
    problems: [
      { p: 'Every team buys its own AI.', a: 'One key for every model, on a market where providers compete on price. A key per project, each with a spend limit.' },
      { p: 'Data that may not leave.', a: 'The whole platform runs on your Kubernetes with your models. No data has to leave your network.' },
      { p: 'Agents improvise in costly work.', a: 'In Keel every case follows the path you designed. Approval limits apply to agents as they do to staff.' },
    ],
    products: ['agents', 'keel', 'gateway', 'train'],
    story: 'energy',
  },
  government: {
    path: '/solutions/government/',
    label: 'Government',
    h1: 'AI for public institutions, inside your network.',
    sub: 'Air-gapped installs, EU hosting, and code your auditors can read.',
    trust: ['Air-gapped', 'EU data residency', `Engine under ${ENGINE.facts[2].n}`, 'Romanian speech models'],
    problems: [
      { p: 'Citizen data stays in the building.', a: 'Air-gapped, with no connection out. Surogate 3.7, Jackrabbit and Amami run on your GPUs.' },
      { p: 'Software nobody can inspect.', a: 'The agent runtime and the training engine are on GitHub. Your security team can read every line.' },
      { p: 'Citizens who write and call in Romanian.', a: 'Jackrabbit listens and Amami speaks. We train both, and both run on a CPU.' },
    ],
    products: ['agents', 'voice', 'keel', 'train'],
    story: 'regulator',
  },
  banking: {
    path: '/solutions/banking-insurance/',
    label: 'Banking & Insurance',
    h1: 'AI for banks and insurers, on premises.',
    sub: 'Call-center voice, cases with approval limits, and models in your data centre.',
    trust: ['On premises or air-gapped', 'Four-eyes checks', 'A record of every case', 'Romanian voice'],
    problems: [
      { p: 'A call center that reads codes right.', a: 'Amami reads amounts and dates in words, and dictates IBANs and codes one character at a time.' },
      { p: 'KYC and loan files need a sign-off.', a: 'Approval limits and four-eyes checks apply to agents as to staff. An unsure agent stops and asks a person.' },
      { p: 'Risk rules your analysts must own.', a: 'Approvals, risk scores and routing run on versioned rules your analysts read and change.' },
    ],
    products: ['voice', 'keel', 'agents', 'train'],
    stories: ['bank', 'insurer'],
  },
  customModels: {
    path: '/solutions/custom-models/',
    label: 'Custom Models',
    h1: 'We train your model.',
    sub: 'On your data and our open-source engine, served where your data lives.',
    trust: [`${ENGINE.facts[0].n} ${ENGINE.facts[0].l}`, `${ENGINE.facts[1].n} ${ENGINE.facts[1].l}`, `${ENGINE.facts[2].n} engine`],
    products: ['train', 'gateway'],
  },
};

// The real sequence of a custom model, from ENGINE.engines and the pricing FAQ.
export const MODEL_STEPS = [
  { name: 'Data', line: 'Your documents, chats and records, versioned in the hub with every checkpoint.' },
  { name: 'Train', line: 'Full fine-tuning, LoRA or QLoRA, then GRPO, DPO or distillation.' },
  { name: 'Evaluate', line: 'HumanEval, MBPP, terminal-bench, SWE-bench or your own suite, before anything ships.' },
  { name: 'Serve', line: 'On the same engine, on your GPUs or ours. List it on llm.buzz at your own price.' },
];

// Our own models as proof, each with its measured number and condition.
export const OUR_MODELS = [
  { name: 'Jackrabbit ASR', n: JACKRABBIT.stat.n, l: 'FLEURS Romanian test', href: '/labs/speech/' },
  { name: 'Amami TTS', n: AMAMI.stat.n, l: 'ordinary Romanian sentences, read back by our recognizer', href: '/labs/speech/' },
  { name: 'Engine', n: ENGINE.facts[0].n, l: 'training throughput vs. Unsloth, 1× H100, BF16 on both', href: '/labs/engine/' },
];

// The four professions that replace the old /for/* pages. Each film is a demo business.
export const PROFESSIONS = [
  { id: 'lawyers', name: 'Lawyers', h2: 'For lawyers.',
    line: 'Clients ask where their matter stands and get an answer from the file, at the hour they asked.',
    jobs: ['Answers status questions from the file and the notes you approved', 'Chases documents, signatures and IDs at the interval you set', 'Warns you of deadlines and filing windows while there is time to act'],
    film: 'pop-glossary-conflict' },
  { id: 'doctors', name: 'Doctors', h2: 'For doctors.',
    line: 'Someone asks the questions you would ask, at the rhythm you set, and the answers reach you.',
    jobs: ['Checks in on patients between visits', 'Sends a value that drifts to you the same day', 'Shows stable patients in a report instead of a slot'],
    film: 'clarke-knee-photo' },
  { id: 'accountants', name: 'Accountants', h2: 'For accountants.',
    line: 'The paperwork every client forgets arrives before the filing date, not on it.',
    jobs: ['Asks for statements and invoices, and reminds until they arrive', 'Answers routine questions from the client file', 'Waits for your approval before anything is paid or filed'],
    film: 'vandijk-approval' },
  { id: 'teachers', name: 'Teachers', h2: 'For teachers.',
    line: 'Your students get help between lessons, in the way you teach.',
    jobs: ['Works through exercises with a student, step by step', 'Follows the rules and material you set', 'Runs on your own page, at your own price'],
    film: 'ursu-whiteboard' },
];

// The /solutions/ index: industry by product, each row linking to its page or film.
export const USE_CASES = [
  { industry: 'Banking', job: 'Check each loan file and flag what is missing', product: 'agents', href: '/solutions/banking-insurance/' },
  { industry: 'Banking', job: 'A mortgage application with four-eyes approval', product: 'keel', href: '/keel/' },
  { industry: 'Insurance', job: 'A call center that answers in Romanian', product: 'voice', href: '/solutions/banking-insurance/' },
  { industry: 'Public sector', job: "Answer citizens' permit questions in Romanian", product: 'agents', href: '/solutions/government/' },
  { industry: 'Public sector', job: 'An air-gapped install with our own models', product: 'train', href: '/solutions/government/' },
  { industry: 'Logistics', job: 'Match carrier invoices to POs and ask before paying', product: 'agents', film: 'vandijk-approval' },
  { industry: 'Enterprise', job: 'Every model on one key, routed in the EU only', product: 'gateway', href: '/gateway/' },
  { industry: 'Enterprise', job: 'A model trained on your own chats', product: 'train', film: 'vandijk-ml-scoreboard' },
  { industry: 'Legal', job: 'Two glossaries that disagree', product: 'agents', film: 'pop-glossary-conflict' },
  { industry: 'Health', job: 'A check-in after knee surgery', product: 'agents', film: 'clarke-knee-photo' },
  { industry: 'Education', job: 'A maths tutor at the whiteboard', product: 'agents', film: 'ursu-whiteboard' },
  { industry: 'Real estate', job: 'The Monday leads, sorted', product: 'agents', film: 'ortega-monday-leads' },
  { industry: 'Small business', job: 'Selling an agent to its first buyer', product: 'agents', film: 'mette-first-buyer' },
];
