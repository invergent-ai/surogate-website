const FEATURES = [
  {
    num: '01',
    title: 'Agent Builder — build from your workflow, not from scratch.',
    body: "Create Surogate agents using skills, tools, and MCP servers — no Python, no ML background required. Start from a template or define your agent's behavior in plain language.",
  },
  {
    num: '02',
    title: "Cloud Execution — your agent runs. You don't have to.",
    body: "Surogate agents execute in the cloud, independently. They don't need your machine running, your tab open, or your presence. They work when you don't.",
  },
  {
    num: '03',
    title: 'Autonomous Coordination — multiple Surogate agents, one coherent workflow.',
    body: 'Deploy multiple agents that communicate and coordinate with each other. One handles research, one handles writing, one handles outreach — all running in parallel, all reporting to you.',
  },
  {
    num: '04',
    title: 'No-Code Configuration — modify, equip, redeploy without touching code.',
    body: "Change your agent's goals, connect new tools, adjust its behavior — all through a visual interface. You own the configuration. You control what it can and cannot do.",
  },
  {
    num: '05',
    title: 'Reporting and Monitoring — you check the work, not every step.',
    body: 'Your Surogate agent sends alerts if it needs you. You see what it did, what it found, and what needs your decision — without sitting through every execution.',
  },
  {
    num: '06',
    title: 'Integrations — connected to the tools you already use.',
    body: "Gmail, Slack, calendar, databases, document stores — your Surogate agent works with your existing stack. You don't change how you work. You just stop doing it manually.",
  },
  {
    num: '07',
    title: 'Continuous Improvement — the more it runs, the better it gets.',
    body: 'Your Surogate agent improves with every execution — learning from your feedback, adapting to new data, getting smarter about how you work. It is not a static tool.',
  },
  {
    num: '08',
    title: 'Custom Models — open weights, fine-tunes, or your own.',
    body: 'Serve open-source LLMs, your fine-tuned checkpoints, or proprietary endpoints through one unified gateway. GPU scheduling, autoscaling, and inference are handled — your agents just call them.',
  },
  {
    num: '09',
    title: 'Bring Your Own Compute — the GPUs you already pay for.',
    body: 'Connect AWS, GCP, Azure, Nebius, Lambda, RunPod, Modal, or your on-prem cluster. The platform schedules training and serving across whatever capacity you have. No migration, no lock-in.',
  },
  {
    num: '10',
    title: 'SFT and RL Training — from dataset to deployed model.',
    body: 'Supervised fine-tuning and reinforcement learning — LoRA, full fine-tunes, GRPO, DPO. Launch a run, watch loss curves, register the checkpoint, serve it from the same control plane that runs your agents.',
  },
  {
    num: '11',
    title: 'Datasets and Synthetic Data — version, generate, ship.',
    body: 'Version datasets in Surogate Hub. Generate synthetic training data from teacher models, agent traces, or your own corpus — with quality filters, deduplication, and lineage tracked end-to-end.',
  },
  {
    num: '12',
    title: 'Evaluation — measure what matters, before and after every change.',
    body: 'Run evaluations against curated benchmarks or your own task suites. Compare models, prompts, and fine-tunes side by side — with full traces, pass rates, and regressions surfaced automatically.',
  },
  {
    num: '13',
    title: 'Performance — mixed-precision training, fused kernels, every cycle counted.',
    body: 'BF16 and FP8 mixed-precision, fused kernels, FlashAttention, and gradient checkpointing — tuned to extract every last token-per-second from your hardware. Same model, half the wall-clock, lower bill.',
  },
];

export default function Features() {
  return (
    <section
      id="features"
      data-screen-label="06 Features"
      className="relative overflow-hidden bg-brand-aubergine text-white py-20 sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-evening-glow-flip pointer-events-none" />
      <div className="relative max-w-container mx-auto px-8">
        <div className="mb-16 max-w-[720px]">
          <div className="text-lg font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-yellow/85">
            <span className="font-mono text-brand-yellow mr-2 font-bold">Features</span>
          </div>
          <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[60px] text-white">
            Everything you need to run agents that actually work.
          </h2>
        </div>

        <div className="grid grid-cols-1">
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              className="reveal grid gap-4 lg:gap-8 py-8 grid-cols-1 lg:[grid-template-columns:80px_1fr_1.2fr] items-start border-t border-white/10"
            >
              <div className="font-mono text-xs font-semibold tracking-wider-2 text-brand-yellow pt-1.5">
                {f.num}
              </div>
              <h4 className="m-0 font-serif text-2xl font-semibold tracking-[-0.014em] leading-[1.18] text-white">
                {f.title}
              </h4>
              <p className="m-0 text-[15.5px] leading-[1.6] text-white/72 max-w-[56ch]">{f.body}</p>
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="relative mt-16 pt-16 border-t border-white/10 before:content-[''] before:absolute before:-top-px before:left-0 before:right-0 before:h-px before:bg-timeline-rail"
        />
      </div>
    </section>
  );
}
