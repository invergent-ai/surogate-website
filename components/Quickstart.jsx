'use client';

import { FileText, BookOpenText } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import SyntaxHighlightedContent from './SyntaxHighlightedContent';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Quickstart() {
  const installScript = `curl -sSL https://surogate.ai/install.sh | bash`;
  const runScript = `surogate sft examples/sft/qwen3-lora-qbnb.yaml`;

  return (
    <section id="quickstart" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Quickstart</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Below is a minimal flow: install the package, create a small YAML config, and start a supervised fine‑tune.
          </p>
        </div>

        <div className="mt-10 grid gap-y-10 gap-x-4 lg:grid-cols-2 lg:gap-y-4">
          {/* Install */}
          <div className="relative overflow-visible rounded-3xl border border-transparent bg-[var(--accent-orange)] p-5 sm:p-6 text-zinc-950">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-950 dark:bg-[var(--accent-purple)] dark:text-white">
                1
              </span>
              <h3 className="text-base font-semibold">Install</h3>
            </div>
            <img
              src="/install.svg"
              alt="Install"
              className="pointer-events-none absolute -top-6 right-5 h-24 w-auto z-10"
            />
            <p className="mt-3 text-sm text-zinc-950">Run the following command:</p>
            <pre className="mt-3 overflow-x-auto rounded-2xl bg-[var(--accent-purple)] p-3 sm:p-4 text-xs sm:text-sm text-zinc-950 dark:text-zinc-100">
              <SyntaxHighlightedContent language='bash' style={a11yDark} content={installScript}></SyntaxHighlightedContent>
            </pre>
            <p className="mt-3 text-sm text-zinc-950">This installs the CLI so you can run training with simple commands.</p>
            <p className="mt-3 text-xs text-zinc-950 font-semibold">*Requires Ubuntu 24.04 x64 with CUDA 12.8/12.9/13.0</p>
          </div>

          {/* Run */}
          <div className="relative overflow-visible rounded-3xl border border-transparent bg-[var(--accent-orange)] p-5 sm:p-6 text-zinc-950">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-950 dark:bg-[var(--accent-purple)] dark:text-white">
                2
              </span>
              <h3 className="text-base font-semibold">Run</h3>
            </div>
            <img
              src="/run.svg"
              alt="Run"
              className="pointer-events-none absolute -top-6 right-5 h-24 w-auto z-10"
            />
            <p className="mt-3 text-sm text-zinc-950">Start the SFT job using your config:</p>
            <pre className="mt-3 overflow-x-auto rounded-2xl bg-[var(--accent-purple)] p-3 sm:p-4 text-xs sm:text-sm text-zinc-950 dark:text-zinc-100">
              <SyntaxHighlightedContent language="bash" style={a11yDark} content={runScript}></SyntaxHighlightedContent>
            </pre>
            <div className="mt-4 rounded-2xl p-4 text-zinc-950 dark:text-zinc-950">
              <p className="text-sm font-bold">Output</p>
              <p className="mt-1 text-sm font-semibold text-zinc-950 dark:text-zinc-950">
                Checkpoints, logs, and artifacts are written under{" "}
                <span className="font-mono text-zinc-950 dark:text-zinc-950">output_dir</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Config example */}
        <div className="relative mt-20 overflow-visible rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6">
          <span className="pointer-events-none absolute -top-8 left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--accent-orange)] text-zinc-950">
            <FileText className="h-7 w-7" />
          </span>

          <div className="flex justify-between">
            <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
              <h3 className="font-semibold">Config example (YAML)</h3>
              <span className="ml-2 rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-200 dark:ring-white/10">
                LoRA enabled
              </span>
            </div>

            <a
              href="https://docs.surogate.ai/reference/config"
              className="mt-3 inline-flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-950 dark:text-white ring-1 ring-zinc-200 dark:ring-white/10 hover:bg-zinc-200 dark:hover:bg-white/10 md:mt-0"
            >
              <BookOpenText className="mr-2 h-4 w-4" />
              Config reference
            </a>
          </div>

          <pre className="mt-4 overflow-x-auto rounded-2xl bg-[var(--accent-purple)] p-3 sm:p-4 text-xs sm:text-sm text-zinc-950 dark:text-zinc-100">
            <SyntaxHighlighter language="yaml" style={a11yDark}>{
              `model: Qwen/Qwen3-0.6B
output_dir: ./output

# training
per_device_train_batch_size: 2
gradient_accumulation_steps: 4
sequence_len: 2048
learning_rate: 2e-4

# LoRA / QLoRA
lora: true
lora_rank: 16
# qlora_fp8: true  # optional, hardware-dependent
# qlora_fp4: true  # Blackwell+

datasets:
  - path: "mlabonne/FineTome-100k"
    type: auto`
            }</SyntaxHighlighter>
          </pre>

          <div className="mt-4 grid gap-3 md:grid-cols-3 text-zinc-950">
            <div className="rounded-2xl bg-[var(--accent-orange)] p-4">
              <p className="text-sm font-semibold text-zinc-950">Swap the model</p>
              <p className="mt-1 text-sm text-zinc-950">Use any supported base model you want to fine‑tune.</p>
            </div>
            <div className="rounded-2xl bg-[var(--accent-orange)] p-4">
              <p className="text-sm font-semibold text-zinc-950">Tune sequence length</p>
              <p className="mt-1 text-sm text-zinc-950">
                Set <span className="font-mono text-zinc-950">sequence_len</span> to fit your GPU memory + target task.
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--accent-orange)] p-4">
              <p className="text-sm font-semibold text-zinc-950">Enable QLoRA</p>
              <p className="mt-1 text-sm text-zinc-950">
                Flip <span className="font-mono text-zinc-950">qlora_fp8</span> or{" "}
                <span className="font-mono text-zinc-950">qlora_fp4</span> when your hardware supports it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
