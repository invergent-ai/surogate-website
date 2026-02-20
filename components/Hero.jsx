import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--accent-orange)]">
      <img
        src="/heroBg.svg"
        alt=""
        width={1609}
        height={2527}
        className="pointer-events-none select-none absolute bottom-0 left-0 w-64 md:w-80 h-auto"
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:py-14 md:grid-cols-2 md:py-20 items-center">
        <div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-black sm:text-5xl">
            <span className="block text-4xl sm:text-6xl font-extrabold">TRAIN AND</span>
            <span className="block text-4xl sm:text-6xl font-extrabold">FINE-TUNE LLMS</span>
            <span className="block text-3xl sm:text-5xl font-normal">at practical</span>
            <span className="block text-2xl sm:text-4xl pl-10">hardware limits</span>
          </h1>
          <div className="mt-16 flex flex-col gap-2 sm:flex-row">
            <a
              href="#quickstart"
              className="inline-flex items-center justify-start rounded-3xl bg-white pl-1 pr-5 py-1 text-xs font-semibold text-zinc-950 hover:bg-zinc-100 dark:bg-black dark:text-white dark:hover:bg-zinc-900 transition-colors"
            >
              <span className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFBB33]">
                <Play className="h-4 w-4 text-white" />
              </span>
              Run a first training
            </a>
            <a
              href="#studio"
              className="inline-flex items-center justify-start rounded-3xl bg-[#FFBB33] px-4 py-2 sm:py-1 text-xs font-semibold text-zinc-950 border border-zinc-950 hover:bg-[#ffb000] transition-colors"
            >
              Run with Surogate Studio
            </a>
          </div>


        </div>

        {/* Hero Card */}
        <div className="relative">
          <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-b from-sky-400/15 via-sky-400/5 to-transparent blur-2xl dark:via-white/5"></div>
          <div className="rounded-3xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[2rem] font-bold text-black">What Surogate optimizes for</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="flex items-start gap-3 rounded-[10px] bg-[#FFBB33] p-4">
                <img src="/dashboard.svg" alt="" className="mt-0.5 h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold text-black">Speed‑of‑Light utilization</p>
                  <p className="mt-1 text-sm text-black">A native engine and scheduler designed to push NVIDIA GPUs hard.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[10px] bg-[#FFBB33] p-4">
                <img src="/optimized.svg" alt="" className="mt-0.5 h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold text-black">Optimized multi‑GPU/multi-Node scaling</p>
                  <p className="mt-1 text-sm text-black">Threading+Ray for super-efficient parallelism.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[10px] bg-[#FFBB33] p-4">
                <img src="/native.svg" alt="" className="mt-0.5 h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold text-black">Native mixed-precision</p>
                  <p className="mt-1 text-sm text-black">Native training/fine-tuning with FP8 and NVFP4</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[10px] bg-[#FFBB33] p-4">
                <img src="/experimentation.svg" alt="" className="mt-0.5 h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold text-black">Experimentation by design</p>
                  <p className="mt-1 text-sm text-black">Mix dtypes across GEMMs, model, gradients, and LoRA.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[10px] bg-[#FFBB33] p-4">
                <img src="/recipes-2.svg" alt="" className="mt-0.5 h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold text-black">Surogate Studio</p>
                  <p className="mt-1 text-sm text-black">Complete model development environment, from training to production.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
