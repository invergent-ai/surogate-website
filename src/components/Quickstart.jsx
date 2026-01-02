import { Download, PlayCircle, FileText } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function Quickstart() {
  return (
    <section id="quickstart" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Quickstart: install + run a simple SFT</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Below is a minimal flow: install the package, create a small YAML config, and start a supervised fine‑tune.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {/* Install */}
          <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6">
            <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
              <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                <Download className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold ">1) Install</h3>
            </div>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">Recommended script install:</p>
            <pre className="codeblock mt-3 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10 p-3 sm:p-4 text-xs sm:text-sm text-zinc-950 dark:text-zinc-100">
              <SyntaxHighlighter language='bash' style={a11yDark}>curl -LsSf https://surogate.ai/install.sh | sh</SyntaxHighlighter>
            </pre>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">This installs the CLI so you can run training with simple commands.</p>
          </div>

          {/* Run */}
          <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6">
            <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
              <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
                <PlayCircle className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold">2) Run</h3>
            </div>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">Start the SFT job using your config:</p>
            <pre className="codeblock mt-3 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10 p-3 sm:p-4 text-xs sm:text-sm text-zinc-950 dark:text-zinc-100">
              <SyntaxHighlighter language="bash" style={a11yDark}>surogate sft --config path/to/config.yaml</SyntaxHighlighter>
            </pre>
            <div className="mt-4 rounded-2xl bg-zinc-100 dark:bg-zinc-950/40 p-4 ring-1 ring-zinc-200 dark:ring-white/10 text-zinc-700 dark:text-zinc-300">
              <p className="text-sm font-semibold">Output</p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">Checkpoints, logs, and artifacts are written under <span className="font-mono text-zinc-900 dark:text-zinc-200">output_dir</span>.</p>
            </div>
          </div>
        </div>

        {/* Config example */}
        <div className="mt-4 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6">
          <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
            <span className="rounded-2xl bg-zinc-100 dark:bg-white/5 p-2 ring-1 ring-zinc-200 dark:ring-white/10">
              <FileText className="h-5 w-5" />
            </span>
            <h3 className="font-semibold ">Config example (YAML)</h3>
            <span className="ml-2 rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-200 dark:ring-white/10">LoRA enabled</span>
          </div>

          <pre className="codeblock mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10 p-3 sm:p-4 text-xs sm:text-sm text-zinc-950 dark:text-zinc-100">
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

          <div className="mt-4 grid gap-3 md:grid-cols-3 text-zinc-700 dark:text-zinc-300">
            <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-950/40 p-4 ring-1 ring-zinc-200 dark:ring-white/10">
              <p className="text-sm font-semibold">Swap the model</p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">Use any supported base model you want to fine‑tune.</p>
            </div>
            <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-950/40 p-4 ring-1 ring-zinc-200 dark:ring-white/10">
              <p className="text-sm font-semibold">Tune sequence length</p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">Set <span className="font-mono text-zinc-900 dark:text-zinc-200">sequence_len</span> to fit your GPU memory + target task.</p>
            </div>
            <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-950/40 p-4 ring-1 ring-zinc-200 dark:ring-white/10">
              <p className="text-sm font-semibold">Enable QLoRA</p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">Flip <span className="font-mono text-zinc-900 dark:text-zinc-200">qlora_fp8</span> or <span className="font-mono text-zinc-900 dark:text-zinc-200">qlora_fp4</span> when your hardware supports it.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
