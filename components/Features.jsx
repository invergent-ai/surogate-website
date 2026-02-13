import { Code, Zap, Network, Aperture, Sliders, CheckCircle } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Built to move fast — and stay stable</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Surogate combines a low‑overhead Python frontend with a native C++/CUDA execution engine and an optimized
              multi‑threaded/MPI scheduler.
            </p>
          </div>
          <div className="hidden md:flex">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-zinc-100 dark:bg-white/5 px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-200 dark:ring-white/10">
              <Code className="h-4 w-4" /> Python API
            </span>
          </div>
          <div className="hidden md:flex">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-zinc-100 dark:bg-white/5 px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-200 dark:ring-white/10">
              <Code className="h-4 w-4" /> C++/CUDA core
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6 text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                <Zap className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold ">Near‑SOL throughput</h3>
            </div>
            <p className="mt-3 text-sm">A native engine engineered for practical hardware limits and low overhead.</p>
          </div>

          <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6 text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                <Network className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold">Native multi‑GPU/multi-Node</h3>
            </div>
            <p className="mt-3 text-sm">Multi multi-threaded + Ray GPU schedulers designed for high-performance distributed training.</p>
          </div>

          <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6 text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                <Network className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold">Smart RAM offloading</h3>
            </div>
            <p className="mt-3 text-sm">Offload weights, gradients, activations and granular checkpointing to stretch memory</p>
          </div>

          <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6 text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                <Aperture className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold">Mixed‑precision modes</h3>
            </div>
            <p className="mt-3 text-sm">BF16 for accuracy, FP8 for performance, NF4 for aggressive memory optimization and NVFP4 for extreme Blackwell efficiency.</p>
          </div>

          <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6 text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                <Sliders className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold">Training choices</h3>
            </div>
            <p className="mt-3 text-sm">Pre-training, Full fine‑tuning, LoRA/QLoRA, and recipe‑guided setups for repeatability.</p>
          </div>

          <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6 text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10 ">
                <CheckCircle className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold">Experimentation by design</h3>
            </div>
            <p className="mt-3 text-sm">Mix different dtypes for GEMMs, model, gradients and LoRA recipes to create your own flavor.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
