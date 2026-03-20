import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Agents() {
  const agentPrimitives = [
    {
      title: 'Skills',
      description:
        'Versioned capabilities that define what an agent knows how to do. Defined in YAML or via the Studio IDE. Each skill has a clear input schema, output schema, and test suite.',
    },
    {
      title: 'Tools',
      description:
        'Functions that connect agents to the outside world — API calls, database queries, file I/O, shell commands, or any custom integration. Registered once, reused across agents.',
    },
    {
      title: 'MCP Servers',
      description:
        'Plug in entire tool ecosystems via the Model Context Protocol. Any MCP-compatible server exposes its tools directly to your agents.',
    },
    {
      title: 'Sub-agents',
      description:
        'Agents can delegate to other agents. Hierarchical architectures allow a reasoning model to orchestrate specialized sub-agents — each with its own tools, memory, and model.',
    },
    {
      title: 'Models',
      description:
        'Agents can use any model served through Surogate — models imported from HuggingFace, custom fine-tuned SLMs, or models from external APIs.',
    },
    {
      title: 'Memory',
      description:
        'Agents maintain context across steps. Memory operations are captured in execution traces and visible in the trace viewer.',
    },
  ];

  return (
    <div className="bg-white text-zinc-950 antialiased overflow-x-hidden dark:bg-zinc-950 dark:text-zinc-100">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[var(--accent-purple)]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:py-14 md:grid-cols-2 md:py-20 items-center">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Agents
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                Surogate agents are composed from four primitives: skills, tools, models, and sub-agents.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1 text-white ring-1 ring-white/20">
                  Skills + Tools
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-white ring-1 ring-white/20">
                  MCP Integration
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-white ring-1 ring-white/20">
                  Execution Traces
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-white ring-1 ring-white/20">
                  Continuous Improvement
                </span>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <div className="absolute -inset-8 -z-10 rounded-full bg-white/10 blur-3xl opacity-40" />
              <img
                src="/surogate-mascot.svg"
                alt="Surogate mascot"
                width={917}
                height={917}
                className="h-auto max-w-xs w-full"
              />
            </div>
          </div>
        </section>

        <section
          className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-950/70"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
            <div className="mt-0 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agentPrimitives.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-zinc-200/70 bg-white/70 p-5 dark:border-white/10 dark:bg-zinc-900/30"
                >
                  <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white/95 dark:bg-zinc-950/70 border-t border-zinc-200 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:pt-18 sm:pb-30">
            <div className="mb-3 text-xs leading-relaxed text-zinc-950 dark:text-zinc-100">
              <div className="font-bold">AGENT YAML EXAMPLE</div>
            </div>

            <pre className="whitespace-pre-wrap break-words rounded-2xl border border-zinc-200/70 bg-[var(--accent-purple)] p-5 text-xs leading-relaxed text-zinc-100 dark:border-white/10 dark:bg-[var(--accent-purple)] dark:text-zinc-100">
{String.raw`# agent.yaml
name: contract-analyzer
model: models/legal-slm-v2

skills:
  - extract-obligations
  - classify-clauses
  - generate-summary

tools:
  - name: search-documents
    type: api
    endpoint: https://your-api/search

memory: enabled
max_steps: 20`}
            </pre>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[var(--accent-orange)] border-t border-black/10">
          <img
            src="/heroBg.svg"
            alt=""
            width={1609}
            height={2527}
            className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 left-0 w-96 md:w-[500px] lg:w-[600px] h-auto"
          />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-start">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-black">
                  OBSERVABILITY — every run is a trace
                </h2>
                <p className="mt-4 text-sm sm:text-base text-black/80 leading-relaxed">
                  Every agent execution generates a structured trace. Inspect it in the visual viewer, replay it step by step, or export it for analysis.
                </p>

                <ul className="mt-6 space-y-2 text-sm sm:text-base text-black/80">
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-black/70">→</span>
                    <span>LLM calls and responses — input prompt, output, latency, token count</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-black/70">→</span>
                    <span>Tool invocations — which tool, what arguments, what was returned</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-black/70">→</span>
                    <span>Sub-agent execution — full nested trace for every delegated task</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-black/70">→</span>
                    <span>Skill execution steps — each stage of skill processing</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-black/70">→</span>
                    <span>Memory operations — reads and writes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-black/70">→</span>
                    <span>Errors and runtime events — full stack with context</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-black">
                  THE IMPROVEMENT LOOP
                </h2>
                <p className="mt-4 text-sm sm:text-base text-black/80 leading-relaxed">
                  Agents in Surogate don't stay static. Every execution leaves a trace. Traces become training data. Training data produces Specialized Language Models (SLMs) — compact, fast models tuned to your specific agent workflows.
                </p>

                <ol className="mt-6 space-y-3 text-sm sm:text-base text-black/80 list-decimal list-inside">
                  <li>Collect execution traces from production</li>
                  <li>Convert successful traces into training datasets</li>
                  <li>Fine-tune an SLM on agent trajectories</li>
                  <li>Evaluate the new model against benchmarks</li>
                  <li>Promote to production — automatically or with approval gates</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

