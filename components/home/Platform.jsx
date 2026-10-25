import InlineSvg from '@/components/site/InlineSvg';
import { figure10Svg, figure11Svg, figure12Svg, figure13Svg, figure14Svg, figure15Svg, figure16Svg, figure17Svg, figure18Svg, figure19Svg, figure20Svg, figure21Svg, figure22Svg, figure23Svg, figure24Svg, figure4Svg, figure5Svg, figure6Svg, figure7Svg, figure8Svg, figure9Svg } from './illustrations';

export default function Platform() {
  return (
    <>
      <section className="bg-brand-paper border-b border-b-brand-border" id="agents">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[860px]">
            <h2 className="font-sans m-0 text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Every client project needs the same platform. Stop rebuilding it.</h2>
            <p className="m-0 text-[18px] leading-[1.6] text-brand-graphite">Don't worry about the runtime. Just build the agents.</p>
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-wrap gap-[12px]">
              <div className="flex-[1_1_460px] min-w-0 py-[20px] px-[24px] border-2 border-brand-aubergine bg-white flex flex-col gap-[4px]">
                <p className="m-0 text-[18px] font-bold">Your agents</p>
                <p className="m-0 text-[15px] leading-[1.5] text-brand-graphite">You give them skills, tools and knowledge. Surogate Agents runs all of them.</p>
              </div>
              <div className="flex-[1_1_460px] min-w-0 py-[20px] px-[24px] border-2 border-brand-aubergine bg-white flex flex-col gap-[4px]">
                <p className="m-0 text-[18px] font-bold">Your processes</p>
                <p className="m-0 text-[15px] leading-[1.5] text-brand-graphite">You define their steps, rules and approvals. Keel runs every case.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-[12px]">
              <div className="flex-[1_1_460px] min-w-0 bg-brand-aubergine p-[20px] flex flex-col">
                <p className="mt-0 mr-0 mb-[16px] ml-[8px] font-mono text-[21px] tracking-[0.12em] text-brand-orange">AGENTS</p>
                <InlineSvg className="contents" markup={figure4Svg} />
                <div className="flex flex-wrap gap-[1px] bg-[rgba(255,255,255,0.14)]">
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure5Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Durable sessions</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">Survive restarts. Every step kept in a log.</p>
                  </div>
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure6Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Sandboxes</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">Shell, browser and office files for each session.</p>
                  </div>
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure7Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Scoped tools</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">MCP granted per agent. Secrets in a vault.</p>
                  </div>
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure8Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Channels</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">Web, API, Slack, Teams, WhatsApp, phone.</p>
                  </div>
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure9Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Knowledge</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">Answers from the client's own documents.</p>
                  </div>
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure10Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Any model</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">Hosted or the client's own, behind one proxy.</p>
                  </div>
                </div>
              </div>
              <div className="flex-[1_1_460px] min-w-0 bg-brand-aubergine p-[20px] flex flex-col">
                <p className="mt-0 mr-0 mb-[16px] ml-[8px] font-mono text-[21px] tracking-[0.12em] text-brand-yellow">KEEL</p>
                <InlineSvg className="contents" markup={figure11Svg} />
                <div className="flex flex-wrap gap-[1px] bg-[rgba(255,255,255,0.14)]">
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure12Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Stages and flows</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">The path a case takes, versioned.</p>
                  </div>
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure13Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Rules and decisions</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">Decision tables and expressions. No model decides.</p>
                  </div>
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure14Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Work queues</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">People and agents claim the next item.</p>
                  </div>
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure15Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Approval limits</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">Maker-checker for staff and agents alike.</p>
                  </div>
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure16Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Deadlines</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">Business calendars, paused while the client is away.</p>
                  </div>
                  <div className="flex-[1_1_220px] min-w-0 bg-brand-aubergine py-[20px] px-[22px] flex flex-col gap-[6px]">
                    <InlineSvg className="contents" markup={figure17Svg} />
                    <p className="m-0 text-[16px] font-bold text-white">Audit and replay</p>
                    <p className="m-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.74)]">Every transition recorded and replayable.</p>
                  </div>
                </div>
              </div>
              <div className="flex-[1_1_100%] min-w-0 bg-brand-aubergine py-[20px] px-[24px] flex flex-col gap-[14px]">
                <p className="m-0 font-mono text-[13px] tracking-[0.12em] text-brand-powder">CUSTOM MODELS</p>
                <div className="flex flex-wrap items-center gap-y-[24px] gap-x-[36px]">
                  <div className="flex-[0_1_300px] min-w-0">
                    <InlineSvg className="contents" markup={figure18Svg} />
                  </div>
                  <div className="flex-[1_1_520px] min-w-0 flex flex-wrap gap-[16px]">
                    <div className="flex-[1_1_280px] min-w-0 flex flex-col bg-[#3c2741] border border-[rgba(189,204,212,0.45)] py-[22px] px-[24px]">
                      <div className="flex items-center gap-[8px] flex-wrap mb-[8px]">
                        <span className="text-[22px] font-extrabold text-white mr-[2px]">Surogate 3.7</span>
                        <span className="inline-block py-[3px] px-[8px] bg-brand-powder text-brand-aubergine-2 text-[11.5px] font-bold leading-[1.3]">LLM</span>
                      </div>
                      <div className="flex items-center gap-[16px] py-[14px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                        <InlineSvg className="contents" markup={figure19Svg} />
                        <div className="flex flex-col gap-[2px] min-w-0">
                          <span className="text-[17px] font-extrabold text-white">35B parameters</span>
                          <span className="text-[14px] text-[rgba(255,255,255,0.78)]">3B active per token</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-[16px] py-[14px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                        <InlineSvg className="contents" markup={figure20Svg} />
                        <div className="flex flex-col gap-[2px] min-w-0">
                          <span className="text-[17px] font-extrabold text-white">Fine-tune it</span>
                          <span className="text-[14px] text-[rgba(255,255,255,0.78)]">On your own sessions</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-[16px] py-[14px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                        <InlineSvg className="contents" markup={figure21Svg} />
                        <div className="flex flex-col gap-[2px] min-w-0">
                          <span className="text-[17px] font-extrabold text-white">Run it yourself</span>
                          <span className="text-[14px] text-[rgba(255,255,255,0.78)]">On-premise or in the cloud</span>
                        </div>
                      </div>
                      <div className="pt-[14px] border-t border-t-[rgba(255,255,255,0.14)]">
                        <span className="inline-block py-[3px] px-[8px] bg-brand-orange text-brand-aubergine-2 text-[11.5px] font-bold leading-[1.3]">Our model for agentic work</span>
                      </div>
                    </div>
                    <div className="flex-[1_1_280px] min-w-0 flex flex-col bg-[#3c2741] border border-[rgba(189,204,212,0.45)] py-[22px] px-[24px]">
                      <div className="flex items-center gap-[8px] flex-wrap mb-[8px]">
                        <span className="text-[22px] font-extrabold text-white mr-[2px]">Voice</span>
                        <span className="inline-block py-[3px] px-[8px] bg-brand-powder text-brand-aubergine-2 text-[11.5px] font-bold leading-[1.3]">STT</span>
                        <span className="inline-block py-[3px] px-[8px] bg-brand-powder text-brand-aubergine-2 text-[11.5px] font-bold leading-[1.3]">TTS</span>
                      </div>
                      <div className="flex items-center gap-[16px] py-[14px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                        <InlineSvg className="contents" markup={figure22Svg} />
                        <div className="flex flex-col gap-[2px] min-w-0">
                          <span className="text-[17px] font-extrabold text-white">Jackrabbit</span>
                          <span className="text-[14px] text-[rgba(255,255,255,0.78)]">Speech to text, real time, CPU or GPU</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-[16px] py-[14px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                        <InlineSvg className="contents" markup={figure23Svg} />
                        <div className="flex flex-col gap-[2px] min-w-0">
                          <span className="text-[17px] font-extrabold text-white">Amami</span>
                          <span className="text-[14px] text-[rgba(255,255,255,0.78)]">Text to speech, two voices, CPU</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-[16px] py-[14px] px-0 border-t border-t-[rgba(255,255,255,0.14)]">
                        <InlineSvg className="contents" markup={figure24Svg} />
                        <div className="flex flex-col gap-[2px] min-w-0">
                          <span className="text-[17px] font-extrabold text-white">Voice cloning</span>
                          <span className="text-[14px] text-[rgba(255,255,255,0.78)]">From a short sample</span>
                        </div>
                      </div>
                      <div className="pt-[14px] border-t border-t-[rgba(255,255,255,0.14)]">
                        <span className="inline-block py-[3px] px-[8px] bg-brand-orange text-brand-aubergine-2 text-[11.5px] font-bold leading-[1.3]">Our speech models for voice agents</span>
                      </div>
                    </div>
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
