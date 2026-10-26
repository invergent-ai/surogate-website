const pre0 = `<span class="text-[#ffd27a]">from</span> openai <span class="text-[#ffd27a]">import</span> OpenAI

client = OpenAI(
    base_url=<span class="text-brand-powder">"https://gateway.example.com/api/v1"</span>,
    api_key=<span class="text-brand-powder">"sk-..."</span>,
)
client.chat.completions.create(model=<span class="text-brand-powder">"opus-5"</span>, messages=[...])`;

export default function Compatible() {
  return (
    <>
      <section className="bg-brand-paper text-brand-aubergine border-t border-t-brand-border" id="compatible">
        <div className="max-w-[1200px] my-0 mx-auto py-[104px] px-[24px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px] max-w-[820px]">
            <h2 className="font-sans m-0 text-[clamp(32px,3.8vw,48px)] leading-[1.08] tracking-[-0.028em] font-extrabold">Change the base URL. Keep your code.</h2>
            <p className="m-0 text-[19px] leading-[1.6] text-brand-graphite">The OpenAI and Anthropic SDKs, Codex, opencode and any OpenAI-compatible client work as they are.</p>
          </div>
          <div className="flex flex-wrap gap-[32px] items-start">
            <div className="flex-[1_1_520px] min-w-0 bg-brand-aubergine-2 border border-[rgba(255,255,255,0.14)] p-[28px]">
              <pre className="m-0 text-[13.5px] leading-[1.7] text-[#f3eaf3]" dangerouslySetInnerHTML={{ __html: pre0 }} />
            </div>
            <div className="flex-[1_1_440px] min-w-0 flex flex-wrap gap-[32px]">
              <div className="flex-[1_1_200px] min-w-0">
                <p className="mt-0 mx-0 mb-[8px] text-[14px] font-bold text-brand-wine">APIs</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">Chat Completions</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">Responses, with the WebSocket Codex uses</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">Anthropic Messages, with token counting</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">Embeddings and images</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">The OpenRouter API</p>
              </div>
              <div className="flex-[1_1_200px] min-w-0">
                <p className="mt-0 mx-0 mb-[8px] text-[14px] font-bold text-brand-wine">Providers</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">OpenAI, Anthropic and Gemini</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">Azure OpenAI and Foundry</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">Amazon Bedrock and Vertex AI</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">OpenRouter</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">vLLM, Ollama and any OpenAI-compatible host</p>
                <p className="m-0 py-[10px] px-0 border-t border-t-brand-border text-[16px] leading-[1.4]">Your ChatGPT and Claude plans</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
