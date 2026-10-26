import InlineSvg from '@/components/site/InlineSvg';
import { agentsPeopleAndAppsOnSvg } from './illustrations';

export default function Routing() {
  return (
    <>
      <section className="bg-white text-brand-aubergine" id="routing">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Every call goes where you decide.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">The gateway maps each model name to a model and provider, holds the cost against the caller&#39;s budget, checks the request, and moves the call to the next provider when one fails.</p>
          </div>
          <figure className="m-0">
            <InlineSvg className="contents" markup={agentsPeopleAndAppsOnSvg} />
          </figure>
        </div>
      </section>
    </>
  );
}
