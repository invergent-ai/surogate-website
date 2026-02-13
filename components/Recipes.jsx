import { Dot, BookOpenText } from 'lucide-react';

export default function Recipes() {
  return (
    <section id="recipes" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Precision recipes</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Choose a precision recipe that matches your hardware and goals — from maximum numerical stability to maximum SOL.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className="relative overflow-visible rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 pt-10 pb-5 px-5 sm:pt-12 sm:pb-6 sm:px-6">
            <div className="absolute inset-x-0 -top-6 flex justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-orange)] p-3">
                <img src="/recipes-1.svg" alt="" className="h-8 w-8" />
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
              <h3 className="text-base font-semibold text-zinc-950 dark:text-white">BF16</h3>
              <span className="rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-200 dark:ring-white/10">
                Accuracy
              </span>
            </div>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
              Baseline recipe using bfloat16 GEMMs for maximum numerical accuracy. No quantization.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <Dot className="mt-0.5 h-4 w-4" />
                Best when stability matters most
              </li>
              <li className="flex items-start gap-2">
                <Dot className="mt-0.5 h-4 w-4" />
                Great for validation baselines
              </li>
            </ul>
            <div className='flex justify-end'>
              <p className="text-xs mt-3"><a href="https://docs.surogate.ai/guides/precision-and-recipes#bf16">Learn more...</a></p>
            </div>
          </article>

          <article className="relative overflow-visible rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 mt-8 lg:mt-0 pt-10 pb-5 px-5 sm:pt-12 sm:pb-6 sm:px-6">
            <div className="absolute inset-x-0 -top-6 flex justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-orange)] p-3">
                <img src="/recipes-2.svg" alt="" className="h-8 w-8" />
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
              <h3 className="text-base font-semibold text-zinc-950 dark:text-white">FP8</h3>
              <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs text-sky-600 dark:text-sky-200 ring-1 ring-sky-400/25">
                Performance
              </span>
            </div>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
              Native FP8 training (E4M3 for weights & activations, E5M2 for gradients) with delayed scaling for stability.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <Dot className="mt-0.5 h-4 w-4" />
                Excellent SOL on modern GPUs
              </li>
              <li className="flex items-start gap-2">
                <Dot className="mt-0.5 h-4 w-4" />
                Works well with QLoRA
              </li>
            </ul>
            <div className='flex justify-end'>
              <p className="text-xs mt-3"><a href="https://docs.surogate.ai/guides/precision-and-recipes#fp8-hybrid">Learn more...</a></p>
            </div>
          </article>

          <article className="relative overflow-visible rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 mt-8 lg:mt-0 pt-10 pb-5 px-5 sm:pt-12 sm:pb-6 sm:px-6">
            <div className="absolute inset-x-0 -top-6 flex justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-orange)] p-3">
                <img src="/recipes-3.svg" alt="" className="h-8 w-8" />
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
              <h3 className="text-base font-semibold text-zinc-950 dark:text-white">NVFP4</h3>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-700 dark:text-emerald-200 ring-1 ring-emerald-400/25">
                Extreme
              </span>
            </div>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
              CUTLASS FP4 (E2M1) training with block scaling, stochastic rounding, and Hadamard transforms for stability.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <Dot className="mt-0.5 h-4 w-4" />
                Built for Blackwell‑class GPUs
              </li>
              <li className="flex items-start gap-2">
                <Dot className="mt-0.5 h-4 w-4" />
                Max memory efficiency + SOL
              </li>
            </ul>
            <div className='flex justify-end'>
              <p className="text-xs mt-3"><a href="https://docs.surogate.ai/guides/precision-and-recipes#fp4-nvfp4">Learn more...</a></p>
            </div>
          </article>
        </div>
      </div>

      <div className="mt-10 w-full bg-[var(--accent-grey)] dark:bg-[var(--accent-purple)]">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-950 dark:text-white mb-2">QLoRA</p>
              <p className="mt-1 text-sm text-zinc-800 dark:text-white">
                <span className="font-semibold">BitsAndBytes</span>, <span className="font-semibold">FP8</span> and <span className="font-semibold">NVFP4</span> dynamic quantization to help maximize SOL on Ampere/Hopper/Blackwell hardware.
              </p>
            </div>
            <a
              href="https://docs.surogate.ai/guides/qlora"
              className="mt-3 inline-flex items-center justify-center rounded-3xl bg-[var(--accent-purple)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-purple)]/90 dark:bg-[var(--accent-orange)] dark:text-black dark:hover:bg-[var(--accent-orange)] md:mt-0"
            >
              <BookOpenText className="mr-2 h-4 w-4" />
              Learn more on QLoRA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
