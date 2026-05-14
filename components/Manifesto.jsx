function Spark({ className }) {
  return (
    <svg
      className={`absolute ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 1.5l1.8 7.7L21.5 11l-7.7 1.8L12 20.5l-1.8-7.7L2.5 11l7.7-1.8z"
      />
    </svg>
  );
}

export default function Manifesto() {
  return (
    <section
      data-screen-label="03 Manifesto"
      className="text-center py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[880px] mx-auto px-8">
        <div className="reveal relative inline-flex flex-col items-center text-brand-orange">
          <Spark className="-top-1.5 -left-4 w-[22px] h-[22px] opacity-85 -rotate-12" />
          <Spark className="top-6 -right-6 w-4 h-4 opacity-85 rotate-[18deg]" />
          <Spark className="bottom-[18%] -left-7 w-3.5 h-3.5 opacity-65 rotate-[8deg]" />
          <img
            src="/brand/hat-rabbit.svg"
            alt=""
            aria-hidden="true"
            className="block w-24 sm:w-32 lg:w-[168px] h-auto mx-auto mb-9 opacity-90"
          />
        </div>

        <div className="font-serif text-[11px] font-semibold uppercase tracking-wider-2 text-brand-graphite">
          <span className="font-mono text-brand-orange mr-2 font-bold">01</span>
          The shift
        </div>

        <h2 className="reveal mt-4 mb-9 font-serif font-semibold leading-[0.98] tracking-[-0.03em] text-[40px] sm:text-[56px] lg:text-[76px] text-brand-aubergine">
          One of you.
          <br />
          Many workflows.
        </h2>

        <p className="reveal font-serif text-[26px] sm:text-[32px] lg:text-[38px] leading-[1.25] tracking-[-0.018em] my-8 text-brand-aubergine">
          <span className="text-brand-steel italic font-normal">
            Most AI tools make you faster.
          </span>
          <br />
          <span className="font-semibold">
            Surogate <span className="has-sun-mark">multiplies</span> you.
          </span>
        </p>

        <p className="reveal text-lg leading-[1.6] text-brand-graphite max-w-[56ch] mx-auto">
          A Surogate agent runs in the cloud, executes your workflows autonomously, whether you're at your desk or not. You set the goal. The agent does the work.
        </p>
      </div>
    </section>
  );
}
