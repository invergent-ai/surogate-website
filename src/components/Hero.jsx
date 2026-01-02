import { Zap, Play, Layers, Cpu, Gauge, GitMerge, ShieldCheck, Box } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white/95 dark:bg-zinc-950/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:py-14 md:grid-cols-2 md:py-20">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-900 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-white dark:ring-white/10">
              <Zap className="h-3.5 w-3.5" />
              Native C++/CUDA engine
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-900 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-white dark:ring-white/10">
              <Zap className="h-3.5 w-3.5" />
              Mixed precision
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-900 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-white dark:ring-white/10">
              <Zap className="h-3.5 w-3.5" />
              Multi‑GPU
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            Train and fine‑tune LLMs at <span className="text-blue-700 dark:text-sky-200">practical hardware limits</span>.
          </h1>

          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Surogate is <span className='font-semibold'>the fastest production‑grade LLM training framework</span> engineered for near speed‑of‑light throughput,
            low‑latency execution, and predictable scaling on modern NVIDIA GPUs — from single‑GPU rigs to multi‑GPU nodes.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#quickstart" className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100">
              <Play className="mr-2 h-4 w-4" />
              Run a first training
            </a>
            <a href="#features" className="inline-flex items-center justify-center rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-200 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:hover:bg-white/10">
              <Layers className="mr-2 h-4 w-4" />
              Explore features
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-700 dark:text-zinc-300">
            <span className="rounded-full bg-zinc-100 px-3 py-1 ring-1 ring-zinc-200 dark:bg-white/5 dark:ring-white/10">Pre‑training + SFT</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 ring-1 ring-zinc-200 dark:bg-white/5 dark:ring-white/10">LoRA / QLoRA</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 ring-1 ring-zinc-200 dark:bg-white/5 dark:ring-white/10">BF16 • FP8 • NVFP4</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 ring-1 ring-zinc-200 dark:bg-white/5 dark:ring-white/10">CPU offload</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 ring-1 ring-zinc-200 dark:bg-white/5 dark:ring-white/10">SM80 → SM121</span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative">
          <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-b from-sky-400/15 via-sky-400/5 to-transparent blur-2xl dark:via-white/5"></div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-white/5 dark:shadow-glow sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">What Surogate optimizes for</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">Throughput, reliability, and scaling — without fragile glue.</p>
              </div>
              <span className="rounded-2xl bg-sky-50 p-2 ring-1 ring-sky-200 dark:bg-sky-400/10 dark:ring-sky-400/25">
                <Cpu className="h-5 w-5 text-sky-600 dark:text-sky-200" />
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200 dark:bg-zinc-950/40 dark:ring-white/10">
                <Gauge className="mt-0.5 h-5 w-5 text-zinc-700 dark:text-zinc-200" />
                <div>
                  <p className="text-sm font-semibold text-zinc-950 dark:text-white">Speed‑of‑Light utilization</p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">A native engine and scheduler designed to push NVIDIA GPUs hard.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200 dark:bg-zinc-950/40 dark:ring-white/10">
                <GitMerge className="mt-0.5 h-5 w-5 text-zinc-700 dark:text-zinc-200" />
                <div>
                  <p className="text-sm font-semibold text-zinc-950 dark:text-white">Predictable multi‑GPU scaling</p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">Native multi‑GPU training with deterministic, explicit recipes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200 dark:bg-zinc-950/40 dark:ring-white/10">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-zinc-700 dark:text-zinc-200" />
                <div>
                  <p className="text-sm font-semibold text-zinc-950 dark:text-white">Production‑minded ergonomics</p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">Clear configs, explicit precision modes, and a stable C++ core.</p>
                </div>
              </div>
               <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200 dark:bg-zinc-950/40 dark:ring-white/10">
                <Box className="mt-0.5 h-5 w-5 text-zinc-700 dark:text-zinc-200" />
                <div>
                  <p className="text-sm font-semibold text-zinc-950 dark:text-white">Supported Models</p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">Qwen2.5, Qwen3 Dense, Llama 3.2 (and more coming).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
