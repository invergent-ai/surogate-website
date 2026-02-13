export default function WhatIsSurogate() {
  return (
    <section className="bg-[var(--accent-lightgrey)] dark:bg-[var(--accent-purple)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[3fr_2fr]">
          <div className="md:pr-6">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              What is Surogate?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-800 dark:text-zinc-300">
              Surogate is the fastest production-grade LLM training framework engineered for near speed-of-light
              throughput, low-latency execution, and predictable scaling on modern NVIDIA GPUs - from single-GPU rigs
              to multi-GPU nodes.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white px-3 py-1 text-zinc-900 ring-1 ring-zinc-200">
                Pre-training+SFT
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-zinc-900 ring-1 ring-zinc-200">
                LoRA / QLoRA
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-zinc-900 ring-1 ring-zinc-200">
                BF16 • FP8 • NVFP4
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-zinc-900 ring-1 ring-zinc-200">
                Python API
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-zinc-900 ring-1 ring-zinc-200">
                C++/CUDA core
              </span>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-white/60 dark:bg-white/10 shadow-lg" />
              <img
                src="/surogate-mascot.svg"
                alt="Surogate mascot"
                className="relative z-10 h-auto max-w-xs w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
