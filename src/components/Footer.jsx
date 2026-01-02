import { ArrowUp, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <a href="#" className="flex min-w-0 items-center gap-2">
              <span>
                <img src="/images/logo-white.svg" className="block dark:hidden h-8 w-8" alt="Surogate" />
                <img src="/images/logo-black.svg" className="hidden dark:block h-8 w-8" alt="Surogate" />
              </span>
              <span className="font-semibold tracking-wide text-white dark:text-zinc-700">Surogate</span>
              <span className="hidden text-sm text-zinc-300 dark:text-zinc-700 sm:inline">Insanely fast LLM training</span>
              <span className="hidden text-sm text-zinc-400 dark:text-zinc-700 sm:inline">Apache 2.0 License</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-white/5 px-3 py-2 text-zinc-900 dark:text-zinc-200 ring-1 ring-zinc-200 dark:ring-white/10 hover:bg-zinc-200 dark:hover:bg-white/10"
            >
              <ArrowUp className="h-4 w-4" />
              Back to top
            </a>
            <a
              href="https://github.com/invergent-ai/surogate"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-white/5 px-3 py-2 text-zinc-900 dark:text-zinc-200 ring-1 ring-zinc-200 dark:ring-white/10 hover:bg-zinc-200 dark:hover:bg-white/10"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
