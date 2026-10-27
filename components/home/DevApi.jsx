import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import CodeTabs from '@/components/site/CodeTabs';
import { LINKS } from '@/lib/site';
import { FLASH } from '@/lib/labs';

const BASE = 'https://api.llm.buzz/api/v1';
const MODEL = FLASH.model;
const TABS = [
  { label: 'Python', code: `import os\nfrom openai import OpenAI\n\nclient = OpenAI(\n    base_url="${BASE}",\n    api_key=os.environ["LLM_BUZZ_KEY"],\n)\n\nreply = client.chat.completions.create(\n    model="${MODEL}",\n    messages=[{"role": "user", "content": "Hello"}],\n)` },
  { label: 'TypeScript', code: `import OpenAI from "openai";\n\nconst client = new OpenAI({\n  baseURL: "${BASE}",\n  apiKey: process.env.LLM_BUZZ_KEY,\n});\n\nconst reply = await client.chat.completions.create({\n  model: "${MODEL}",\n  messages: [{ role: "user", content: "Hello" }],\n});` },
  { label: 'cURL', code: `curl ${BASE}/chat/completions \\\n  -H "Authorization: Bearer $LLM_BUZZ_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model": "${MODEL}",\n       "messages": [{"role": "user", "content": "Hello"}]}'` },
];

export default function DevApi() {
  return (
    <Section inner="grid grid-cols-1 items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
      <div>
        <p className="m-0 text-[13px] font-medium text-ink/50">For developers</p>
        <h2 className={`${H2.feature} mt-3`}>One API.<br />Every model.</h2>
        <p className="mt-4 mb-0 max-w-[42ch] text-[16px] leading-[1.6] text-ink/65">
          OpenAI and Anthropic compatible, with no markup on tokens. Change the base URL and keep your code.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={LINKS.apiKey} external size="lg" arrow event="cta_api_key_clicked" eventProps={{ location: 'home_dev' }}>Get API key</Button>
          <Button href={LINKS.docs} external variant="secondary" size="lg">Read the docs</Button>
        </div>
        <dl className="m-0 mt-10 grid max-w-[420px] grid-cols-3 gap-4 border-t border-hairline pt-5">
          {FLASH.facts.map((f) => (
            <div key={f.l}>
              <dt className="sr-only">{f.l}</dt>
              <dd className="m-0 text-[18px] font-semibold">{f.n}</dd>
              <dd className="m-0 mt-0.5 text-[12px] text-ink/50">{f.l}</dd>
            </div>
          ))}
        </dl>
        <p className="m-0 mt-2 text-[12px] text-ink/40">Surogate 3.7 Flash on llm.buzz</p>
      </div>
      <div className="min-w-0 rounded-2xl bg-aubergine px-4 pt-8 pb-5 md:px-10 md:pt-10 md:pb-6">
        <CodeTabs tabs={TABS} />
      </div>
    </Section>
  );
}
