// What the home page's results section compares: models named by the exact version the leaderboard lists,
// so they stay out of lib/labs.js, whose test keeps competitor names out of the Labs copy.

/* WildClawBench, the OpenClaw-harness leaderboard (github.com/internlm/WildClawBench, read 2026-10-29): 60 agent
   tasks, scores in percent, 34 models listed, names as the leaderboard writes them. `rows` are the listed models
   Surogate 3.7 Flash is level with or ahead of; `above` is every listed model that scores higher. `runs` is where
   the model can be run: open weights, or its maker's cloud. Surogate 3.7 Flash's own score is our run. */
export const WILDCLAW = {
  href: 'https://github.com/internlm/WildClawBench',
  checked: 'Oct 29, 2026',
  tasks: 60,
  listed: 34,
  surogate: 54.6,
  rows: [
    { name: 'Kimi K3', maker: 'Moonshot AI', n: 54.5, runs: 'Open weights' },
    { name: 'GLM 5.2', maker: 'Zhipu AI', n: 54.2, runs: 'Open weights' },
    { name: 'Claude Opus 4.6', maker: 'Anthropic', n: 51.6, runs: 'Cloud only' },
    { name: 'GPT-5.4', maker: 'OpenAI', n: 50.3, runs: 'Cloud only' },
    { name: 'DeepSeek V4 Pro', maker: 'DeepSeek', n: 43.7, runs: 'Open weights' },
    { name: 'Gemini 3.1 Pro', maker: 'Google DeepMind', n: 40.8, runs: 'Cloud only' },
  ],
  above: [
    { name: 'GPT-5.6 Sol', n: 67.2 },
    { name: 'Claude Opus 4.8', n: 64.7 },
    { name: 'Claude Opus 4.7', n: 62.2 },
    { name: 'Claude Fable 5', n: 62.0 },
    { name: 'GPT-5.5', n: 58.2 },
    { name: 'Grok 4.5', n: 57.5 },
    { name: 'Qwen3.8-Max', n: 56.2 },
    { name: 'Muse Spark 1.1', n: 54.8 },
  ],
};
