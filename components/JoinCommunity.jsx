import { Github } from 'lucide-react';

export default function JoinCommunity() {
  return (
    <section
      id="join-community"
      className="scroll-mt-24 border-t border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/70"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 items-start">
          <div className="flex items-start gap-4">
            <img
              src="/surogate-orange.svg"
              alt=""
              className="pointer-events-none h-20 w-auto opacity-100 dark:opacity-60 shrink-0 sm:h-24 transform scale-x-[-1]"
            />
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Join the community
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Get help, share benchmarks, discuss training recipes, and follow the
                project. The Surogate community is where the interesting conversations
                happen.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
            <a
              href="https://discord.gg/surogate"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-start rounded-3xl bg-[#FFBB33] pl-1 pr-5 py-1 text-xs font-semibold text-zinc-950 border border-zinc-950 hover:bg-[#ffb000] transition-colors"
            >
              <span className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-black">
                <img
                  src="/discord.svg"
                  alt="Discord"
                  className="h-4 w-4 brightness-0 invert"
                />
              </span>
              Discord
            </a>

            <a
              href="https://github.com/invergent-ai/surogate"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-start rounded-3xl bg-[#FFBB33] pl-1 pr-5 py-1 text-xs font-semibold text-zinc-950 border border-zinc-950 hover:bg-[#ffb000] transition-colors"
            >
              <span className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-black">
                <Github className="h-4 w-4 text-white" />
              </span>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

