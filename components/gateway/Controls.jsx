import InlineSvg from '@/components/site/InlineSvg';
import { figure2Svg, figure3Svg, figure4Svg } from './illustrations';

export default function Controls() {
  return (
    <>
      <section className="bg-brand-aubergine text-white" id="controls">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Control every call.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-[rgba(255,255,255,0.78)]">Who can call which model, what they can spend, where prompts may go, and what happens when a provider fails.</p>
          </div>
          <div className="flex flex-wrap gap-[24px]">
            <div className="flex-[1_1_460px] min-w-0 bg-brand-aubergine-2 border border-[rgba(189,204,212,0.3)] p-[40px] flex flex-col gap-[14px]">
              <p className="m-0 text-[15px] font-bold text-brand-yellow">Access</p>
              <p className="m-0 text-[28px] leading-[1.15] tracking-[-0.02em] font-extrabold">Every caller gets its own key.</p>
              <p className="m-0 text-[17px] leading-[1.6] text-[rgba(255,255,255,0.78)]">Issue a key per person, team or agent, and grant each one only the models it should use.</p>
              <div className="mt-auto pt-[22px]" aria-hidden="true">
                <div className="flex flex-col">
                  <div className="flex items-center gap-[16px] py-[10px] px-0 border-t border-t-[rgba(255,255,255,0.12)]">
                    <span className="w-[28px] flex justify-center">
                      <span className="block w-[24px] h-[24px] bg-brand-orange">
                      </span>
                    </span>
                    <span className="flex items-center py-0 px-[8px] h-[18px] bg-[rgba(255,255,255,0.12)]">
                      <span className="block w-[44px] h-[4px] bg-[rgba(255,255,255,0.75)]">
                      </span>
                    </span>
                    <span className="flex gap-[6px] ml-auto">
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                      <span className="block w-[14px] h-[14px] border border-[rgba(255,255,255,0.3)]">
                      </span>
                      <span className="block w-[14px] h-[14px] border border-[rgba(255,255,255,0.3)]">
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-[16px] py-[10px] px-0 border-t border-t-[rgba(255,255,255,0.12)]">
                    <span className="w-[28px] flex justify-center">
                      <span className="block w-[18px] h-[18px] rounded-[50%] border-2 border-[rgba(255,255,255,0.7)]">
                      </span>
                    </span>
                    <span className="flex items-center py-0 px-[8px] h-[18px] bg-[rgba(255,255,255,0.12)]">
                      <span className="block w-[44px] h-[4px] bg-[rgba(255,255,255,0.75)]">
                      </span>
                    </span>
                    <span className="flex gap-[6px] ml-auto">
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                      <span className="block w-[14px] h-[14px] border border-[rgba(255,255,255,0.3)]">
                      </span>
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                      <span className="block w-[14px] h-[14px] border border-[rgba(255,255,255,0.3)]">
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-[16px] py-[10px] px-0 border-t border-t-[rgba(255,255,255,0.12)]">
                    <span className="w-[28px] flex justify-center">
                      <span className="block w-[20px] h-[13px] border-2 border-[rgba(255,255,255,0.7)] [border-top-width:6px]">
                      </span>
                    </span>
                    <span className="flex items-center py-0 px-[8px] h-[18px] bg-[rgba(255,255,255,0.12)]">
                      <span className="block w-[44px] h-[4px] bg-[rgba(255,255,255,0.75)]">
                      </span>
                    </span>
                    <span className="flex gap-[6px] ml-auto">
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[1_1_460px] min-w-0 bg-brand-aubergine-2 border border-[rgba(189,204,212,0.3)] p-[40px] flex flex-col gap-[14px]">
              <p className="m-0 text-[15px] font-bold text-brand-yellow">Spend</p>
              <p className="m-0 text-[28px] leading-[1.15] tracking-[-0.02em] font-extrabold">Spending stops at the limit.</p>
              <p className="m-0 text-[17px] leading-[1.6] text-[rgba(255,255,255,0.78)]">Monthly limits per key, a reservation on every request, and exact accounting for every call.</p>
              <div className="mt-auto pt-[22px]" aria-hidden="true">
                <div className="flex flex-col gap-[14px]">
                  <div className="relative h-[18px] bg-[rgba(255,255,255,0.12)]">
                    <span className="absolute left-0 top-0 h-[18px] w-[58%] bg-[rgba(255,255,255,0.8)]">
                    </span>
                    <span className="absolute left-[58%] top-0 h-[18px] w-[9%] bg-brand-orange">
                    </span>
                    <span className="absolute left-[86%] -top-[6px] h-[30px] w-[2px] bg-brand-wine">
                    </span>
                  </div>
                  <div className="flex items-center gap-[12px] py-[8px] px-0 border-t border-t-[rgba(255,255,255,0.12)]">
                    <span className="block w-[120px] h-[6px] bg-[rgba(255,255,255,0.6)]">
                    </span>
                    <span className="ml-auto">
                      <span className="block w-[34px] h-[6px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-[12px] py-[8px] px-0 border-t border-t-[rgba(255,255,255,0.12)]">
                    <span className="block w-[96px] h-[6px] bg-[rgba(255,255,255,0.6)]">
                    </span>
                    <span className="ml-auto">
                      <span className="block w-[34px] h-[6px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-[12px] py-[8px] px-0 border-t border-t-[rgba(255,255,255,0.12)]">
                    <span className="block w-[140px] h-[6px] bg-[rgba(255,255,255,0.6)]">
                    </span>
                    <span className="ml-auto">
                      <span className="block w-[34px] h-[6px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[1_1_460px] min-w-0 bg-brand-aubergine-2 border border-[rgba(189,204,212,0.3)] p-[40px] flex flex-col gap-[14px]">
              <p className="m-0 text-[15px] font-bold text-brand-yellow">Safety</p>
              <p className="m-0 text-[28px] leading-[1.15] tracking-[-0.02em] font-extrabold">Guardrails read the answer first.</p>
              <p className="m-0 text-[17px] leading-[1.6] text-[rgba(255,255,255,0.78)]">Redact emails, card numbers, API keys and your own patterns, and run your injection and safety classifiers. Answers are checked too, and a blocked one never reaches the caller.</p>
              <div className="mt-auto pt-[22px]" aria-hidden="true">
                <div className="flex items-center gap-[20px]">
                  <InlineSvg className="contents" markup={figure2Svg} />
                  <div className="flex-[1_1_auto] min-w-0 flex flex-col gap-[10px]">
                    <div className="flex items-center gap-[10px]">
                      <span className="block w-[180px] h-[6px] bg-[rgba(255,255,255,0.7)]">
                      </span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <span className="block w-[150px] h-[6px] bg-[rgba(255,255,255,0.7)]">
                      </span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <span className="block w-[90px] h-[6px] bg-[rgba(255,255,255,0.2)]">
                      </span>
                      <span className="block w-[60px] h-[6px] bg-brand-wine">
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[1_1_460px] min-w-0 bg-brand-aubergine-2 border border-[rgba(189,204,212,0.3)] p-[40px] flex flex-col gap-[14px]">
              <p className="m-0 text-[15px] font-bold text-brand-yellow">Data</p>
              <p className="m-0 text-[28px] leading-[1.15] tracking-[-0.02em] font-extrabold">Prompts go only where you allow.</p>
              <p className="m-0 text-[17px] leading-[1.6] text-[rgba(255,255,255,0.78)]">Keep an organisation on providers that neither train on prompts nor keep them, or on EU-hosted ones, and decide whether prompts are logged at all.</p>
              <div className="mt-auto pt-[22px]" aria-hidden="true">
                <div className="flex flex-col">
                  <div className="flex items-center gap-[14px] py-[10px] px-0 border-t border-t-[rgba(255,255,255,0.12)]">
                    <span className="block w-[110px] h-[6px] bg-[rgba(255,255,255,0.7)]">
                    </span>
                    <span className="flex gap-[8px] ml-auto">
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                    </span>
                    <span className="block w-[18px]">
                    </span>
                  </div>
                  <div className="flex items-center gap-[14px] py-[10px] px-0 border-t border-t-[rgba(255,255,255,0.12)]">
                    <span className="block w-[90px] h-[6px] bg-[rgba(255,255,255,0.7)]">
                    </span>
                    <span className="flex gap-[8px] ml-auto">
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                      <span className="block w-[14px] h-[14px] border border-[rgba(255,255,255,0.3)]">
                      </span>
                    </span>
                    <span className="block w-[18px]">
                    </span>
                  </div>
                  <div className="flex items-center gap-[14px] py-[10px] px-0 border-t border-t-[rgba(255,255,255,0.12)] opacity-[0.45]">
                    <span className="block w-[70px] h-[6px] bg-[rgba(255,255,255,0.7)]">
                    </span>
                    <span className="flex gap-[8px] ml-auto">
                      <span className="block w-[14px] h-[14px] border border-[rgba(255,255,255,0.3)]">
                      </span>
                      <span className="block w-[14px] h-[14px] bg-[rgba(255,255,255,0.8)]">
                      </span>
                    </span>
                    <span className="block w-[18px] h-[2px] bg-brand-wine">
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[1_1_460px] min-w-0 bg-brand-aubergine-2 border border-[rgba(189,204,212,0.3)] p-[40px] flex flex-col gap-[14px]">
              <p className="m-0 text-[15px] font-bold text-brand-yellow">Reliability</p>
              <p className="m-0 text-[28px] leading-[1.15] tracking-[-0.02em] font-extrabold">When a provider fails, the call moves on.</p>
              <p className="m-0 text-[17px] leading-[1.6] text-[rgba(255,255,255,0.78)]">Route by health, price, speed or a fixed order. Slow or failing providers drop back, and a failed call moves on to the next one.</p>
              <div className="mt-auto pt-[22px]" aria-hidden="true">
                <div className="flex items-center">
                  <span className="flex-[1_1_0] min-w-0 h-[64px] flex items-center justify-center border-2 border-brand-wine">
                    <InlineSvg className="contents" markup={figure3Svg} />
                  </span>
                  <span className="block w-[24px] h-[2px] bg-[rgba(255,255,255,0.6)]">
                  </span>
                  <span className="flex-[1_1_0] min-w-0 h-[64px] flex items-center justify-center border-2 border-white">
                    <InlineSvg className="contents" markup={figure4Svg} />
                  </span>
                  <span className="block w-[24px] h-[2px] bg-[rgba(255,255,255,0.25)]">
                  </span>
                  <span className="flex-[1_1_0] min-w-0 h-[64px] flex items-center justify-center border border-[rgba(255,255,255,0.25)]">
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-[1_1_460px] min-w-0 bg-brand-aubergine-2 border border-[rgba(189,204,212,0.3)] p-[40px] flex flex-col gap-[14px]">
              <p className="m-0 text-[15px] font-bold text-brand-yellow">Visibility</p>
              <p className="m-0 text-[28px] leading-[1.15] tracking-[-0.02em] font-extrabold">See every call and what it cost.</p>
              <p className="m-0 text-[17px] leading-[1.6] text-[rgba(255,255,255,0.78)]">Spend, tokens, latency and errors by model, provider and app, and each request&#39;s route from the first attempt to the answer.</p>
              <div className="mt-auto pt-[22px]" aria-hidden="true">
                <div>
                  <div className="flex items-end gap-[8px] h-[64px] pb-[10px] border-b border-b-[rgba(255,255,255,0.2)]">
                    <span className="block flex-[1_1_0] h-[48px] bg-[rgba(255,255,255,0.45)]">
                    </span>
                    <span className="block flex-[1_1_0] h-[30px] bg-[rgba(255,255,255,0.45)]">
                    </span>
                    <span className="block flex-[1_1_0] h-[62px] bg-[rgba(255,255,255,0.8)]">
                    </span>
                    <span className="block flex-[1_1_0] h-[22px] bg-[rgba(255,255,255,0.45)]">
                    </span>
                    <span className="block flex-[1_1_0] h-[40px] bg-[rgba(255,255,255,0.45)]">
                    </span>
                    <span className="block flex-[1_1_0] h-[54px] bg-[rgba(255,255,255,0.45)]">
                    </span>
                    <span className="block flex-[1_1_0] h-[34px] bg-[rgba(255,255,255,0.45)]">
                    </span>
                  </div>
                  <div className="flex items-center gap-[8px] pt-[12px]">
                    <span className="block w-[70px] h-[10px] bg-brand-wine">
                    </span>
                    <span className="block w-[14px] h-[2px] bg-[rgba(255,255,255,0.5)]">
                    </span>
                    <span className="block w-[120px] h-[10px] bg-[rgba(255,255,255,0.8)]">
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
