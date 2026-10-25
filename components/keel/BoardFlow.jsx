import InlineSvg from '@/components/site/InlineSvg';
import { partOfTheKeelBoardSvg } from './illustrations';

export default function BoardFlow() {
  return (
    <>
      <section className="bg-white text-brand-aubergine" id="features">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Built to run real processes.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">Design them, run them, connect agents and systems, and keep control of every decision.</p>
          </div>
          <figure className="m-0 flex flex-col gap-[20px]">
            <InlineSvg className="contents" markup={partOfTheKeelBoardSvg} />
            <div className="flex flex-wrap gap-y-[24px] gap-x-[48px] py-[32px] px-[36px] bg-brand-paper border border-brand-border">
              <div className="flex-[1_1_260px] min-w-0 flex flex-col gap-[8px]">
                <p className="m-0 text-[17px] font-extrabold">The board</p>
                <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Every process is a row of stages, and each stage holds its steps.</p>
              </div>
              <div className="flex-[1_1_260px] min-w-0 flex flex-col gap-[8px]">
                <p className="m-0 text-[17px] font-extrabold">The flow</p>
                <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Open a stage to set how its steps connect: who does each one, and where each decision sends the case.</p>
              </div>
              <div className="flex-[1_1_260px] min-w-0 flex flex-col gap-[8px]">
                <p className="m-0 text-[17px] font-extrabold">The work</p>
                <p className="m-0 text-[16px] leading-[1.6] text-brand-graphite">Agents and people take the steps in turn. Keel moves each case only along the paths you set.</p>
              </div>
            </div>
          </figure>
        </div>
      </section>
    </>
  );
}
