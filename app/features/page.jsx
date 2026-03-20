import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Features() {
  const features = [
    'Pre-training; full fine-tuning; LoRA / QLoRA',
    'BF16, FP8, NVFP4; mixed-precision training',
    'Multi-GPU; multi-node (Ray-based)',
    'Smart CPU offloading',
    'Native C++/CUDA engine; kernel fusions',
    'Deterministic configs + predefined recipes',
    'Dense + MoE model support',
    'Broad NVIDIA SM coverage (sm80–sm121)',
    'Autonomous agent runtime (skills, tools, sub-agents)',
    'MCP server integration',
    'Agent deployment on Kubernetes',
    'Execution traces - basic viewer + export',
    'Skill development + test suites',
    'Data Hub with Git-style versioning',
    'GPU-accelerated serving (vLLM)',
    'Session replay, anomaly alerts, advanced dashboards',
    'Auto CI benchmarking; leaderboard; regression guards',
    'Skill improvement: GEPA optimization, failure analysis, A/B testing',
    'Continuous agent improvement (scheduler + auto-promotion)',
    'Full RLHF UI; preference datasets; feedback routing',
    'Reinforcement learning: DPO / PPO / GRPO',
    'Model distillation from agent trajectories (SLMs)',
    'Synthetic data generation; reward function tooling',
    'Fine-grained guardrails; content filters; compliance audit',
    'Advanced RBAC; SSO; audit logs',
    'Budget caps; per-team allocation; billing',
    'Live training monitoring; GPU & node monitoring',
    'Evaluation suite + red-teaming (bias/toxicity/PII/jailbreak)',
    'Workload/container isolation',
  ];

  // Free column (Surogate OSS) is disabled starting from this capability.
  const freeCutoffIndex = features.findIndex(
    f => f.includes('Session replay, anomaly alerts, advanced dashboards')
  );

  return (
    <div className="bg-zinc-950 text-zinc-100 antialiased overflow-x-hidden">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[var(--accent-orange)] py-12 sm:py-16 md:py-20">
          <img
            src="/heroBg.svg"
            alt=""
            width={1609}
            height={2527}
            className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 left-0 w-96 md:w-[500px] lg:w-[600px] h-auto"
          />
          <div className="mx-auto max-w-6xl px-4">
            <h1 className="mb-8 text-3xl font-semibold tracking-tight text-black sm:text-4xl md:text-5xl">
              Features
            </h1>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-black">
                <thead>
                  <tr>
                    <th className="bg-[var(--accent-orange)] pr-4 pb-8 text-left font-semibold">
                      Surogate LLMOps Enterprise
                    </th>
                    <th className="bg-[var(--accent-orange)] px-4 pb-8 text-center font-semibold">
                      Surogate OSS
                    </th>
                    <th className="bg-[var(--accent-orange)] px-4 pb-8 text-center font-semibold">
                      Surogate Enterprise
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r border-black bg-[var(--accent-orange)] pr-4 text-left font-semibold">
                      Pricing
                    </th>
                    <th className="border-l border-black bg-[var(--accent-orange)] px-4 text-center font-semibold">
                      FREE
                    </th>
                    <th className="border-l border-black bg-[var(--accent-orange)] px-4 text-center font-semibold">
                      <a
                        href="mailto:george.zaharia@invergent.ai?subject=Surogate%20Enterprise"
                        className="inline-block bg-black text-[var(--accent-orange)] px-4 py-2 rounded font-semibold hover:opacity-90 transition-opacity"
                      >
                        contact sales
                      </a>
                    </th>
                  </tr>
                  <tr>
                    <th className="bg-[var(--accent-orange)] h-5"></th>
                    <th className="bg-[var(--accent-orange)] h-5"></th>
                    <th className="bg-[var(--accent-orange)] h-5"></th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="border-r border-black bg-[var(--accent-orange)] pr-4 text-sm">
                          {feature}
                        </td>
                        <td className="border-l border-black bg-[var(--accent-orange)] px-4 text-center text-lg">
                          {freeCutoffIndex === -1 ? '✔' : index < freeCutoffIndex ? '✔' : '✖'}
                        </td>
                        <td className="border-l border-black bg-[var(--accent-orange)] px-4 text-center text-lg">
                          ✔
                        </td>
                      </tr>
                      {index < features.length - 1 && (
                        <tr>
                          <td className="bg-[var(--accent-orange)] h-5"></td>
                          <td className="bg-[var(--accent-orange)] h-5"></td>
                          <td className="bg-[var(--accent-orange)] h-5"></td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

