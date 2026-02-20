import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 bg-[var(--accent-purple)] dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start gap-6">
          <div className="flex w-full items-center justify-between gap-2">
            <a href="#" className="flex min-w-0 items-center gap-2">
              <span className="flex h-10 items-center">
                <img src="/surogateWhite.svg" width={632} height={205} className="h-full w-auto object-contain" alt="Surogate" />
              </span>
              <span className="hidden text-sm text-zinc-300 sm:inline">Insanely fast LLM training</span>
              <span className="hidden text-sm text-zinc-400 sm:inline">Apache 2.0 License</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1 rounded-2xl bg-[var(--accent-orange)] dark:bg-[var(--accent-orange)] px-2 py-1 text-xs text-black hover:opacity-90 dark:hover:opacity-90 sm:hidden"
            >
              <ArrowUp className="h-3 w-3" />
              Back to top
            </a>
          </div>
          <div className="flex w-full items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/showcase/surogate"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent-orange)] dark:bg-[var(--accent-orange)] p-2 text-black hover:opacity-90 dark:hover:opacity-90 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://huggingface.co/surogate"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent-orange)] dark:bg-[var(--accent-orange)] p-2 text-black hover:opacity-90 dark:hover:opacity-90 transition-opacity"
                aria-label="Hugging Face"
              >
                <img src="/hf-logo.svg" alt="Hugging Face" className="h-4 w-4" />
              </a>
              <a
                href="https://substack.com/@surogate"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent-orange)] dark:bg-[var(--accent-orange)] p-2 text-black hover:opacity-90 dark:hover:opacity-90 transition-opacity"
                aria-label="Substack"
              >
                <img src="/substack.svg" alt="Substack" className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/surogate_ai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent-orange)] dark:bg-[var(--accent-orange)] p-2 text-black hover:opacity-90 dark:hover:opacity-90 transition-opacity"
                aria-label="X (Twitter)"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://discord.gg/zdKvJdhD"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent-orange)] dark:bg-[var(--accent-orange)] p-2 text-black hover:opacity-90 dark:hover:opacity-90 transition-opacity"
                aria-label="Discord"
              >
                <img src="/discord.svg" alt="Discord" className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/invergent-ai/surogate"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[var(--accent-orange)] dark:bg-[var(--accent-orange)] px-3 py-2 text-black hover:opacity-90 dark:hover:opacity-90"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
            <a
              href="#"
              className="hidden items-center gap-2 rounded-2xl bg-[var(--accent-orange)] dark:bg-[var(--accent-orange)] px-3 py-2 text-black hover:opacity-90 dark:hover:opacity-90 sm:inline-flex"
            >
              <ArrowUp className="h-4 w-4" />
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
