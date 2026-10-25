import InlineSvg from '@/components/site/InlineSvg';
import { figure25Svg, figure26Svg, figure27Svg, figure28Svg, figure29Svg, figure30Svg, figure31Svg, figure32Svg, figure33Svg, figure34Svg } from './illustrations';

const pre0 = `<span class="text-[#ffd27a]">import</span> { AgentChat } <span class="text-[#ffd27a]">from</span>
  <span class="text-brand-powder">"@invergent/agent-chat-react"</span>
<span class="text-[#ffd27a]">import</span> { WebsiteAgent } <span class="text-[#ffd27a]">from</span>
  <span class="text-brand-powder">"@invergent/website-widget"</span>`;

const pre1 = `client = OpenAI(base_url=<span class="text-brand-powder">".../v1/api"</span>)
client.chat.completions.create(
    model=<span class="text-brand-powder">"claims-agent"</span>, ...)`;

export default function CodeSample() {
  return (
    <>
      <section className="bg-brand-aubergine text-white">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <p className="m-0 font-mono text-[13px] tracking-[0.14em] text-brand-orange">BUILT FOR ENGINEERS</p>
            <h2 className="font-sans m-0 text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.028em] font-extrabold">What your team gets on day one.</h2>
          </div>
          <div className="flex flex-wrap gap-[12px]">
            <article className="flex-[2_1_520px] min-w-0 bg-brand-aubergine-2 border border-[rgba(255,255,255,0.14)] p-[28px] flex flex-col gap-[18px]">
              <InlineSvg className="contents" markup={figure25Svg} />
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-sans m-0 text-[20px] font-bold">Skill optimisation</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[rgba(255,255,255,0.75)]">Scores a skill against real sessions, tries better versions and keeps the one that wins.</p>
              </div>
            </article>
            <article className="flex-[1_1_300px] min-w-0 bg-brand-aubergine-2 border border-[rgba(255,255,255,0.14)] p-[28px] flex flex-col gap-[18px]">
              <div className="flex gap-[4px]" aria-hidden="true">
                <div className="flex-[1_1_0] flex flex-col items-center gap-[8px]">
                  <span className="font-mono text-[11px] text-[rgba(255,255,255,0.55)]">M</span>
                  <span className="w-full h-[64px] bg-[rgba(255,255,255,0.05)] flex items-start justify-center pt-[12px] !box-border">
                    <span className="w-[12px] h-[12px] bg-brand-orange">
                    </span>
                  </span>
                </div>
                <div className="flex-[1_1_0] flex flex-col items-center gap-[8px]">
                  <span className="font-mono text-[11px] text-[rgba(255,255,255,0.55)]">T</span>
                  <span className="w-full h-[64px] bg-[rgba(255,255,255,0.05)]">
                  </span>
                </div>
                <div className="flex-[1_1_0] flex flex-col items-center gap-[8px]">
                  <span className="font-mono text-[11px] text-[rgba(255,255,255,0.55)]">W</span>
                  <span className="w-full h-[64px] bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
                    <span className="w-[12px] h-[12px] bg-brand-yellow">
                    </span>
                  </span>
                </div>
                <div className="flex-[1_1_0] flex flex-col items-center gap-[8px]">
                  <span className="font-mono text-[11px] text-[rgba(255,255,255,0.55)]">T</span>
                  <span className="w-full h-[64px] bg-[rgba(255,255,255,0.05)]">
                  </span>
                </div>
                <div className="flex-[1_1_0] flex flex-col items-center gap-[8px]">
                  <span className="font-mono text-[11px] text-[rgba(255,255,255,0.55)]">F</span>
                  <span className="w-full h-[64px] bg-[rgba(255,255,255,0.05)] flex items-end justify-center pb-[12px] !box-border">
                    <span className="w-[12px] h-[12px] bg-brand-powder">
                    </span>
                  </span>
                </div>
                <div className="flex-[1_1_0] flex flex-col items-center gap-[8px]">
                  <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)]">S</span>
                  <span className="w-full h-[64px] [background:repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0_4px,transparent_4px_8px)]">
                  </span>
                </div>
                <div className="flex-[1_1_0] flex flex-col items-center gap-[8px]">
                  <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)]">S</span>
                  <span className="w-full h-[64px] [background:repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0_4px,transparent_4px_8px)]">
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-sans m-0 text-[20px] font-bold">Programs</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[rgba(255,255,255,0.75)]">Agents that reach out first: scheduled check-ins on each person's channel, in their time zone.</p>
              </div>
            </article>
            <article className="flex-[1_1_300px] min-w-0 bg-brand-aubergine-2 border border-[rgba(255,255,255,0.14)] p-[28px] flex flex-col gap-[18px]">
              <div className="flex gap-[6px]" aria-hidden="true">
                <div className="flex-[1_1_0] flex flex-col gap-[5px]">
                  <span className="font-mono text-[10.5px] text-brand-yellow">INTAKE</span>
                  <span className="h-[22px] border border-[rgba(255,175,16,0.7)] bg-[rgba(255,175,16,0.12)]">
                  </span>
                  <span className="h-[22px] border border-[rgba(255,255,255,0.25)]">
                  </span>
                </div>
                <div className="flex-[1_1_0] flex flex-col gap-[5px]">
                  <span className="font-mono text-[10.5px] text-brand-yellow">REVIEW</span>
                  <span className="h-[22px] border border-[rgba(255,255,255,0.25)]">
                  </span>
                  <span className="h-[22px] border border-[rgba(255,175,16,0.7)] bg-[rgba(255,175,16,0.12)]">
                  </span>
                  <span className="h-[22px] border border-[rgba(255,255,255,0.25)]">
                  </span>
                </div>
                <div className="flex-[1_1_0] flex flex-col gap-[5px]">
                  <span className="font-mono text-[10.5px] text-brand-yellow">DECISION</span>
                  <span className="h-[22px] border border-dashed border-brand-yellow">
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-sans m-0 text-[20px] font-bold">Case designer</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[rgba(255,255,255,0.75)]">Lay out a Keel case type as stages and steps, then publish it.</p>
              </div>
            </article>
            <article className="flex-[1_1_300px] min-w-0 bg-brand-aubergine-2 border border-[rgba(255,255,255,0.14)] p-[28px] flex flex-col gap-[18px]">
              <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-[6px] text-brand-orange" aria-hidden="true">
                <span className="h-[40px] border border-[rgba(255,255,255,0.16)] flex items-center justify-center">
                  <InlineSvg className="contents" markup={figure26Svg} />
                </span>
                <span className="h-[40px] border border-[rgba(255,255,255,0.16)] flex items-center justify-center">
                  <InlineSvg className="contents" markup={figure27Svg} />
                </span>
                <span className="h-[40px] border border-[rgba(255,255,255,0.16)] flex items-center justify-center">
                  <InlineSvg className="contents" markup={figure28Svg} />
                </span>
                <span className="h-[40px] border border-[rgba(255,255,255,0.16)] flex items-center justify-center">
                  <InlineSvg className="contents" markup={figure29Svg} />
                </span>
                <span className="h-[40px] border border-[rgba(255,255,255,0.16)] flex items-center justify-center">
                  <InlineSvg className="contents" markup={figure30Svg} />
                </span>
                <span className="h-[40px] border border-[rgba(255,255,255,0.16)] flex items-center justify-center">
                  <InlineSvg className="contents" markup={figure31Svg} />
                </span>
                <span className="h-[40px] border border-[rgba(255,255,255,0.16)] flex items-center justify-center">
                  <InlineSvg className="contents" markup={figure32Svg} />
                </span>
                <span className="h-[40px] border border-[rgba(255,255,255,0.16)] flex items-center justify-center">
                  <InlineSvg className="contents" markup={figure33Svg} />
                </span>
              </div>
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-sans m-0 text-[20px] font-bold">Channels</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[rgba(255,255,255,0.75)]">One agent on web, API, Slack, Teams, WhatsApp, Telegram, Discord and phone.</p>
              </div>
            </article>
            <article className="flex-[1_1_300px] min-w-0 bg-brand-aubergine-2 border border-[rgba(255,255,255,0.14)] p-[28px] flex flex-col gap-[18px]">
              <pre className="m-0 p-[14px] text-[#f3eaf3] text-[12px] leading-[1.7]" dangerouslySetInnerHTML={{ __html: pre0 }} />
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-sans m-0 text-[20px] font-bold">SDK</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[rgba(255,255,255,0.75)]">Agent chat inside your app, or a widget on the client's website.</p>
              </div>
            </article>
            <article className="flex-[1_1_300px] min-w-0 bg-brand-aubergine-2 border border-[rgba(255,255,255,0.14)] p-[28px] flex flex-col gap-[18px]">
              <pre className="m-0 p-[14px] text-[#f3eaf3] text-[12px] leading-[1.7]" dangerouslySetInnerHTML={{ __html: pre1 }} />
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-sans m-0 text-[20px] font-bold">OpenAI-compatible API</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[rgba(255,255,255,0.75)]">Every agent answers the OpenAI client the client's developers already use.</p>
              </div>
            </article>
            <article className="flex-[1_1_300px] min-w-0 bg-brand-aubergine-2 border border-[rgba(255,255,255,0.14)] p-[28px] flex flex-col gap-[18px]">
              <div className="flex gap-[12px] h-[128px]" aria-hidden="true">
                <div className="flex-[1_1_0] bg-white p-[14px] flex flex-col gap-[7px]">
                  <span className="h-[8px] w-[55%] bg-brand-aubergine">
                  </span>
                  <span className="h-[5px] w-[92%] bg-[#c9c3cf]">
                  </span>
                  <span className="h-[5px] w-[85%] bg-[#c9c3cf]">
                  </span>
                  <span className="h-[5px] w-[88%] bg-[#c9c3cf]">
                  </span>
                  <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[3px] mt-[4px]">
                    <span className="h-[10px] bg-brand-orange">
                    </span>
                    <span className="h-[10px] bg-brand-orange">
                    </span>
                    <span className="h-[10px] bg-brand-orange">
                    </span>
                    <span className="h-[10px] bg-brand-border">
                    </span>
                    <span className="h-[10px] bg-brand-border">
                    </span>
                    <span className="h-[10px] bg-brand-border">
                    </span>
                    <span className="h-[10px] bg-brand-border">
                    </span>
                    <span className="h-[10px] bg-brand-border">
                    </span>
                    <span className="h-[10px] bg-brand-border">
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-sans m-0 text-[20px] font-bold">Office files</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[rgba(255,255,255,0.75)]">Opens, edits and saves Word, Excel and PowerPoint files.</p>
              </div>
            </article>
            <article className="flex-[1_1_300px] min-w-0 bg-brand-aubergine-2 border border-[rgba(255,255,255,0.14)] p-[28px] flex flex-col gap-[18px]">
              <div className="flex gap-[12px] h-[128px]" aria-hidden="true">
                <div className="flex-[1_1_0] border border-[rgba(255,255,255,0.2)] flex flex-col">
                  <div className="flex items-center gap-[5px] py-[7px] px-[9px] border-b border-b-[rgba(255,255,255,0.14)]">
                    <span className="w-[7px] h-[7px] bg-[rgba(255,255,255,0.35)]">
                    </span>
                    <span className="w-[7px] h-[7px] bg-[rgba(255,255,255,0.35)]">
                    </span>
                    <span className="flex-[1_1_auto] h-[9px] ml-[6px] bg-[rgba(255,255,255,0.12)]">
                    </span>
                  </div>
                  <div className="flex-[1_1_auto] p-[10px] flex flex-col gap-[7px] relative">
                    <span className="h-[7px] w-[60%] bg-[rgba(255,255,255,0.3)]">
                    </span>
                    <span className="h-[18px] w-[80%] border border-[rgba(255,255,255,0.25)]">
                    </span>
                    <span className="h-[18px] w-[80%] border border-[rgba(255,255,255,0.25)]">
                    </span>
                    <span className="h-[16px] w-[36%] bg-brand-orange">
                    </span>
                    <InlineSvg className="contents" markup={figure34Svg} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-sans m-0 text-[20px] font-bold">A live browser</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[rgba(255,255,255,0.75)]">Drives a real browser and hands over to a person for logins.</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
