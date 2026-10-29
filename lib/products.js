// The six products, in menu order: from what the widest audience uses to what builders use.
// The nav's Products menu, the home platform tiles, and the footer all read this list.
// `speak` is the sample the Voice tile plays when pressed.
export const PRODUCTS = [
  { key: 'agents', name: 'Surogate', href: '/surogate/', pose: 'team', tone: 'grey',
    line: 'AI colleagues for every team, on your own infrastructure.' },
  { key: 'surogate', name: 'Surogate Desktop', href: '/surogate-desktop/', pose: 'computer', tone: 'grey',
    line: 'Your Surogate agent, working on the files on your computer.' },
  { key: 'voice', name: 'Voice', href: '/voice/', pose: 'voice', tone: 'grey',
    line: 'Voice agents that listen and answer in real time.',
    speak: { voice: 'female', sample: 'assistant-hello', label: 'Hear Amami speak Romanian' } },
  { key: 'keel', name: 'Keel', href: '/keel/', pose: 'track', tone: 'grey',
    line: 'Business processes that run agents, with approvals and audit.' },
  { key: 'train', name: 'Train', href: '/train/', pose: 'hat', tone: 'night',
    line: 'Train and serve your own model on one engine.' },
  { key: 'gateway', name: 'AI Gateway', href: '/gateway/', pose: 'stream', tone: 'silver',
    line: 'The open market for production inference, on one key.' },
];

// Source: surogates/surogates/tasks/tools.py (spawn_task: max_attempts defaults to 3) and
// surogates/surogates/tasks/__init__.py ("Retry with history").
export const TASK_ATTEMPTS = 3;
