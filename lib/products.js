// The six products, in menu order: from what the widest audience uses to what builders use.
// The nav's Products menu, the home hero and bento, and the footer all read this list.
// `action` is what sits under the hero headline for the product. Agents has a box with a typed brief,
// [market, text], and Voice one with a line Amami speaks, each the next one each time the slide comes round.
// The others are plain calls to action.
export const PRODUCTS = [
  { key: 'agents', name: 'Surogate', href: '/surogate/', pose: 'team', tone: 'grey',
    line: 'AI colleagues for every team, on your own infrastructure.',
    headline: 'AI colleagues for every team.',
    sub: 'Design, test and run agents for whole teams, on your own infrastructure.',
    action: { kind: 'brief', briefs: [['Banking', 'Check each loan file and flag what is missing'], ['Public sector', 'Answer citizens\' permit questions in Romanian'], ['Logistics', 'Match carrier invoices to POs and ask before paying']],
      primary: { label: 'Build this agent', href: 'https://ops.surogate.ai', event: 'cta_signup_clicked' } } },
  { key: 'surogate', name: 'Surogate Desktop', href: '/surogate-desktop/', pose: 'computer', tone: 'grey',
    line: 'Your Surogate agent, working on the files on your computer.',
    headline: 'Your agent, on your own computer.',
    sub: 'It works on files in folders you choose, runs commands in a sandbox and uses your own browser.',
    action: { kind: 'ctas', primary: { label: 'Download Surogate Desktop', href: '/surogate-desktop/#install' }, secondary: { label: 'See what it can do', href: '/surogate-desktop/' } } },
  { key: 'voice', name: 'Voice', href: '/voice/', pose: 'voice', tone: 'grey',
    line: 'Voice agents that listen and answer in real time.',
    headline: 'Voice agents that sound local.',
    sub: 'Speech we train ourselves, in Romanian and English, on our cloud or in your call center.',
    // `lines` are what a voice agent says on a call in Agents' three markets; `sample` is the Voice tile's greeting.
    action: { kind: 'audio', voice: 'female', sample: 'assistant-hello', label: 'Hear Amami speak Romanian',
      lines: [
        { market: 'Banking', slug: 'hero-bank', ro: 'Am blocat cardul care se termină în 4821. Cei 1.249,90 lei vă revin în cont până pe 4 noiembrie.',
          en: 'Card ending 4821 blocked. Your 1,249.90 lei are back by 4 November.' },
        { market: 'Public sector', slug: 'hero-public', ro: 'Dosarul cu numărul 48213 e aprobat. Autorizația o ridicați joi, de la ghișeul 3, între 9 și 16.',
          en: 'File 48213 is approved. Collect the permit Thursday, counter 3, 9:00 to 16:00.' },
        { market: 'Logistics', slug: 'hero-logistics', ro: 'Camionul B 47 TRM intră la rampa 6 la 14:30. Aveți de descărcat 18 paleți.',
          en: 'Truck B 47 TRM takes dock 6 at 14:30. You have 18 pallets to unload.' },
      ] } },
  { key: 'keel', name: 'Keel', href: '/keel/', pose: 'track', tone: 'grey',
    line: 'Business processes that run agents, with approvals and audit.',
    headline: 'Processes that run agents.',
    sub: 'Stages, approval limits and an audit trail your team owns.',
    action: { kind: 'ctas', primary: { label: 'See how Keel works', href: '/keel/' }, secondary: { label: 'Book a demo', href: '/contact/', event: 'contact_sales_clicked' } } },
  { key: 'train', name: 'Train', href: '/train/', pose: 'hat', tone: 'night',
    line: 'Train and serve your own model on one engine.',
    headline: 'Your own model, trained and served.',
    sub: 'One open-source engine for fine-tuning, RL and serving.',
    action: { kind: 'ctas', primary: { label: 'Get the engine', href: 'https://github.com/invergent-ai/surogate/releases', external: true },
      link: { label: 'Read the benchmarks', href: '/labs/engine/' } } },
  { key: 'gateway', name: 'AI Gateway', href: '/gateway/', pose: 'stream', tone: 'silver',
    line: 'The open market for production inference, on one key.',
    headline: 'Providers compete for every request.',
    sub: 'Every model on llm.buzz with one key, 0% markup and EU-only routing on every plan.',
    action: { kind: 'ctas', primary: { label: 'Get API key', href: 'https://llm.buzz', external: true },
      secondary: { label: 'Sell your inference', href: 'https://llm.buzz/providers/join', external: true } } },
];

// Source: surogates/surogates/tasks/tools.py (spawn_task: max_attempts defaults to 3) and
// surogates/surogates/tasks/__init__.py ("Retry with history").
export const TASK_ATTEMPTS = 3;
