import TourFilm from './TourFilm';

export default function AgentsHero() {
  return (
    <>
      <section className="bg-brand-aubergine text-white">
        <div className="max-w-[1200px] my-0 mx-auto pt-[88px] px-[24px] pb-0 flex flex-col gap-[56px]">
          <div className="flex flex-col gap-[26px] max-w-[900px]">
            <h1 className="font-sans m-0 text-[clamp(44px,6vw,72px)] leading-[1.0] tracking-[-0.035em] font-extrabold">The Factory for Professional agents</h1>
            <p className="m-0 text-[21px] leading-[1.5] text-[rgba(255,255,255,0.8)] max-w-[720px]">Design, test, govern and run agents for whole teams without writing code, in your cloud or on your own hardware.</p>
            <div className="flex flex-wrap gap-[12px]">
              <a className="inline-flex items-center min-h-[52px] py-0 px-[24px] bg-brand-orange text-brand-aubergine no-underline font-bold text-[16px]" href="https://ops.surogate.ai">Start building</a>
              <a className="inline-flex items-center min-h-[52px] py-0 px-[24px] border border-[rgba(255,255,255,0.4)] text-white no-underline font-semibold text-[16px]" href="https://docs.surogate.ai">Read the docs</a>
            </div>
          </div>
          <div className="-mb-[96px] relative">
            {/* The platform tour film, drawn live; its player takes its styles from .st-home in home.css. */}
            <div className="st-home bg-brand-aubergine-2 border border-[rgba(255,255,255,0.25)] shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
              <TourFilm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
