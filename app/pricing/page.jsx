import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Pricing() {
  const features = [
    'Pretraining; full fine-tuning; LoRA / QLoRA',
    'BF16, FP8, NVFP4, BnB; mixed-precision training',
    'Multi-GPU; Multi-node (Ray-based)',
    'Smart CPU offloading',
    'Native C++/CUDA engine; kernel fusions; multi-threaded scheduler',
    'Deterministic configs + predefined recipes',
    'DDP efficiency (comm/compute overlap)',
    'Optimizer options (e.g., 8-bit AdamW)',
    'Dense + MoE model support',
    'Broad NVIDIA SM coverage',
    'GUI workflows; no-code pretraining & fine-tuning; predefined recipes',
    'Reinforcement fine-tuning; alignment: DPO / PPO / GRPO / GDP',
    'Chinchilla scaling rules for pretraining',
    'Model distillation',
    'Data Hub with Git-like versioning',
    'Team collaboration',
    'Live training monitoring',
    'GPU & node monitoring',
    'Quantization recipes',
    'Advanced model serving (KV-aware cache routing, GPU sharding, replicas, disaggregated serving)',
    'Model gateway (usage tracking & security)',
    'Evaluation suite + red-teaming(bias/toxicity/leakage, etc.)',
    'Synthetic data generation; embeddings training; reward function tooling',
    'Alerts/logging',
    'Workload/container isolation',
  ];

  // Find the index where column 2 changes from ✔ to ✖
  const guiWorkflowsIndex = features.findIndex(f => f.includes('GUI workflows'));

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
              Pricing
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
                          {index < guiWorkflowsIndex ? '✔' : '✖'}
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
