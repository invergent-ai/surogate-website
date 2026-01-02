import { Cpu as GpuIcon, Check, ArrowRight, Book, Folder } from 'lucide-react';

export default function Hardware() {
  return (
    <section id="hardware" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/70 text-zinc-700 dark:text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Hardware targets</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Runs on Linux with an NVIDIA GPU, recent drivers, CUDA (12/13), NCCL, and cuDNN.
            GPU support spans multiple architectures.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                <GpuIcon className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold">Supported NVIDIA SMs</h3>
            </div>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">From sm80 to sm121 (including Hopper & Blackwell generations).</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-700 dark:text-zinc-300">
              <span className="rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 ring-1 ring-zinc-200 dark:ring-white/10">SM80</span>
              <span className="rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 ring-1 ring-zinc-200 dark:ring-white/10">SM86</span>
              <span className="rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 ring-1 ring-zinc-200 dark:ring-white/10">SM89</span>
              <span className="rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 ring-1 ring-zinc-200 dark:ring-white/10">SM90</span>
              <span className="rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 ring-1 ring-zinc-200 dark:ring-white/10">SM100</span>
              <span className="rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 ring-1 ring-zinc-200 dark:ring-white/10">SM103</span>
              <span className="rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 ring-1 ring-zinc-200 dark:ring-white/10">SM120</span>
              <span className="rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 ring-1 ring-zinc-200 dark:ring-white/10">SM121</span>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold">Why this matters</h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-3">
                <ArrowRight className="mt-0.5 h-4 w-4" />
                <span>Same workflow from consumer RTX cards to datacenter GPUs.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="mt-0.5 h-4 w-4" />
                <span>Precision recipes let you trade stability vs throughput in a controlled way.</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="mt-0.5 h-4 w-4" />
                <span>CPU offload helps fit larger runs when VRAM is tight.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 dark:border-white/10 bg-gradient-to-b from-zinc-50 dark:from-white/5 to-transparent p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-950 dark:text-white">Want deeper examples?</p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">Browse docs and curated examples for recipes and model‑specific settings.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/invergent-ai/surogate/tree/master/examples"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-950 dark:text-white ring-1 ring-zinc-200 dark:ring-white/10 hover:bg-zinc-200 dark:hover:bg-white/10"
              >
                <Folder className="mr-2 h-4 w-4" />
                Examples
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
