import Section from '@/components/site/Section';
import Button from '@/components/site/Button';
import CodeTabs from '@/components/site/CodeTabs';
import { LINKS } from '@/lib/site';

const BASE = 'https://api.llm.buzz/api/v1';
const MODEL = 'deepseek/deepseek-v4.1-flash';
const TABS = [
  { label: 'Python', code: `import os\nfrom openai import OpenAI\n\nclient = OpenAI(base_url="${BASE}", api_key=os.environ["LLM_BUZZ_KEY"])\n\nreply = client.chat.completions.create(\n    model="${MODEL}",\n    messages=[{"role": "user", "content": "Hello"}],\n)` },
  { label: 'TypeScript', code: `import OpenAI from "openai";\n\nconst client = new OpenAI({ baseURL: "${BASE}", apiKey: process.env.LLM_BUZZ_KEY });\n\nconst reply = await client.chat.completions.create({\n  model: "${MODEL}",\n  messages: [{ role: "user", content: "Hello" }],\n});` },
  { label: 'cURL', code: `curl ${BASE}/chat/completions \\\n  -H "Authorization: Bearer $LLM_BUZZ_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model": "${MODEL}", "messages": [{"role": "user", "content": "Hello"}]}'` },
];

export default function DevApi() {
  return (
    <Section tone="aubergine" inner="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <h2 className="m-0 text-[clamp(36px,4.4vw,52px)] font-[500] leading-[1.03] tracking-[-0.01em]">One API.<br />Every model.</h2>
        <p className="mt-5 mb-0 max-w-[44ch] text-[18px] leading-[1.6] text-cream/70">
          OpenAI and Anthropic compatible, with no markup on tokens. Change the base URL and keep your code.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={LINKS.apiKey} external variant="sun" size="lg">Get API key</Button>
          <Button href={LINKS.docs} external variant="glass" size="lg">Read the docs</Button>
        </div>
      </div>
      <div className="rounded-[22px] bg-grad-sun p-3 md:p-5"><CodeTabs tabs={TABS} /></div>
    </Section>
  );
}
