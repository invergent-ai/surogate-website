import { FileText, BookOpenText } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import SyntaxHighlightedContent from './SyntaxHighlightedContent';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Studio() {
  return (
     <section id="studio" className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Surogate Studio</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            The open-source, enterprise-grade LLMOps platform built to accelerate the development and deployment of generative AI applications. Read more on the <a href="https://github.com/invergent-ai/surogate-studio" className="underline">Github page</a>
          </p>
        </div>

        <div className="mt-10 grid gap-y-10 gap-x-4 lg:grid-cols-2 lg:gap-y-4">
          {/* Studio Image */}
          <div className="">
             <img
              src="/studio.png"
              alt="Surogate Studio"
              className="pointer-events-none w-full z-10"
            />
          </div>

          {/* Studio Features */}
          <div className="relative rounded-3xl border border-transparent text-white">
              <div className="grid gap-3">
                <div className="flex items-start gap-3 rounded-[10px] bg-[var(--accent-purple)] p-4">
                    <img src="/dashboard.svg" alt="" className="mt-0.5 h-10 w-10" />
                    <div>
                    <p className="text-sm font-semibold">Cloud & On-Prem Infrastructure</p>
                    <p className="mt-1 text-xs">Run tasks on cloud or your on-prem GPU infrastructure</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 rounded-[10px] bg-[var(--accent-purple)] p-4">
                    <img src="/optimized.svg" alt="" className="mt-0.5 h-10 w-10" />
                    <div>
                    <p className="text-sm font-semibold">Training, Fine-Tuning and Alignment</p>
                    <p className="mt-1 text-xs">Train, fine-tune, and align LLMs</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 rounded-[10px] bg-[var(--accent-purple)] p-4">
                    <img src="/native.svg" alt="" className="mt-0.5 h-10 w-10" />
                    <div>
                    <p className="text-sm font-semibold">Evaluation</p>
                    <p className="mt-1 text-xs">Run comprehensive evaluations of LLMs for performance, accuracy, security and alignment</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 rounded-[10px] bg-[var(--accent-purple)] p-4">
                    <img src="/experimentation.svg" alt="" className="mt-0.5 h-10 w-10" />
                    <div>
                    <p className="text-sm font-semibold">Deployment & Inference</p>
                    <p className="mt-1 text-xs">Deploy and run LLMs on multiple GPUs using KV-aware routing, GPU sharding, replicas, and disaggregated serving for production-grade performance</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 rounded-[10px] bg-[var(--accent-purple)] p-4">
                    <img src="/datahub.svg" alt="" className="mt-0.5 h-10 w-10" />
                    <div>
                    <p className="text-sm font-semibold">Data Hub</p>
                    <p className="mt-1 text-xs">Your own, personal HuggingFace Hub for managing and sharing datasets and models</p>
                    </div>
                </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
