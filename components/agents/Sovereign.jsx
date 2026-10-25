import InlineSvg from '@/components/site/InlineSvg';
import { everythingInsideYourNetworkStudioSvg } from './illustrations';

export default function Sovereign() {
  return (
    <>
      <section className="bg-brand-aubergine-2 text-white" id="sovereign">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Run all of it inside your own network.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-[rgba(255,255,255,0.78)]">On-premise or air-gapped, the whole platform runs on your Kubernetes with your models, and no data has to leave your network.</p>
          </div>
          <InlineSvg className="contents" markup={everythingInsideYourNetworkStudioSvg} />
          <div className="flex flex-wrap gap-y-[36px] gap-x-[40px]">
            <div className="flex-[1_1_240px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
              <p className="m-0 text-[18px] font-bold">Open-source runtime</p>
              <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">The runtime is on GitHub. Your security team can read every line.</p>
            </div>
            <div className="flex-[1_1_240px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
              <p className="m-0 text-[18px] font-bold">Your own models</p>
              <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">Surogate 3.7, Jackrabbit and Amami run on your GPUs, next to your fine-tunes.</p>
            </div>
            <div className="flex-[1_1_240px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
              <p className="m-0 text-[18px] font-bold">Your own hardware</p>
              <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">Train and serve on your servers over SSH, or on your own cloud account.</p>
            </div>
            <div className="flex-[1_1_240px] min-w-0 flex flex-col gap-[10px] pt-[18px] border-t border-t-[rgba(255,255,255,0.16)]">
              <p className="m-0 text-[18px] font-bold">Your keys and records</p>
              <p className="m-0 text-[16px] leading-[1.55] text-[rgba(255,255,255,0.78)]">Credentials stay in your vault. Sessions, files and logs stay in your storage.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
