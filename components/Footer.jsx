import { ArrowUp, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 bg-[var(--accent-purple)] dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <a href="#" className="flex min-w-0 items-center gap-2">
              <span className="flex h-10 items-center">
                <img src="/surogateWhite.svg" className="h-full w-auto object-contain" alt="Surogate" />
              </span>
              <span className="hidden text-sm text-zinc-300 sm:inline">Insanely fast LLM training</span>
              <span className="hidden text-sm text-zinc-400 sm:inline">Apache 2.0 License</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl bg-[var(--accent-orange)] dark:bg-[var(--accent-orange)] px-3 py-2 text-black hover:opacity-90 dark:hover:opacity-90"
            >
              <ArrowUp className="h-4 w-4" />
              Back to top
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
        </div>
      </div>
    </footer>
  );
}
