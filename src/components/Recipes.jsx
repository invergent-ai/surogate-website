import { Scale, Rocket, Cpu, Dot, Terminal } from 'lucide-react';

export default function Recipes() {
  return (
    <section id="recipes" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Training recipes</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Choose a precision recipe that matches your hardware and goals — from maximum numerical stability to maximum SOL.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                  <Scale className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold">BF16</h3>
              </div>
              <span className="rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-200 dark:ring-white/10">Accuracy</span>
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
          </article>

          <article className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                  <Rocket className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold">FP8</h3>
              </div>
              <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs text-sky-600 dark:text-sky-200 ring-1 ring-sky-400/25">Performance</span>
            </div>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
              Native FP8 training (E4M3 for activations/weights, E5M2 for gradients) with delayed scaling for stability.
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
          </article>

          <article className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                  <Cpu className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold">NVFP4</h3>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-700 dark:text-emerald-200 ring-1 ring-emerald-400/25">Extreme</span>
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
          </article>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 dark:border-white/10 bg-gradient-to-b from-zinc-50 dark:from-white/5 to-transparent p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-950 dark:text-white">Adaptive QLoRA</p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">BitsAndBytes, FP8 and NVFP4 live quantization to help maximize SOL on Ampere/Hopper/Blackwell hardware.</p>
            </div>
            <a href="#quickstart" className="mt-3 inline-flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-950 dark:text-white ring-1 ring-zinc-200 dark:ring-white/10 hover:bg-zinc-200 dark:hover:bg-white/10 md:mt-0">
              <Terminal className="mr-2 h-4 w-4" />
              See the quickstart
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
