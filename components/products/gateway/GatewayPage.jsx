import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import CodeTabs from '@/components/site/CodeTabs';
import { LINKS } from '@/lib/site';
import { BASE_URL, CONTROLS, EU_PROVIDERS, FLASH_MARKET, JOIN, MARKET, SOURCES } from '@/lib/gateway';
import Page, { Hero, Lead, Facts, UseCases, Closing } from '../Page';
import Faq from '../Faq';
import Market from './Market';

const MODEL = FLASH_MARKET.model;
const TABS = [
  { label: 'Python', code: `import os\nfrom openai import OpenAI\n\nclient = OpenAI(\n    base_url="${BASE_URL}",\n    api_key=os.environ["LLM_BUZZ_KEY"],\n)\n\nreply = client.chat.completions.create(\n    model="${MODEL}",\n    messages=[{"role": "user", "content": "Hello"}],\n)` },
  { label: 'TypeScript', code: `import OpenAI from "openai";\n\nconst client = new OpenAI({\n  baseURL: "${BASE_URL}",\n  apiKey: process.env.LLM_BUZZ_KEY,\n});\n\nconst reply = await client.chat.completions.create({\n  model: "${MODEL}",\n  messages: [{ role: "user", content: "Hello" }],\n});` },
  { label: 'cURL', code: `curl ${BASE_URL}/chat/completions \\\n  -H "Authorization: Bearer $LLM_BUZZ_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model": "${MODEL}",\n       "messages": [{"role": "user", "content": "Hello"}]}'` },
];

const FACTS = [
  { n: String(MARKET.models), l: 'models on llm.buzz, from 11 providers' },
  { n: MARKET.markup, l: 'markup on provider prices. A 5.5% fee applies only when you buy credit' },
  { n: 'Every plan', l: 'can keep requests on EU providers, or send them nowhere' },
];

const START = [
  ['Get a key', 'Sign up on llm.buzz and add credit, from $5. Free models need no credit.', null],
  ['Set the base URL', 'The OpenAI and Anthropic SDKs work as they are.', BASE_URL],
  ['Call a model', 'Any model on the market, by its name.', MODEL],
];

const AGENTS = [
  ['Claude Code', 'Set ANTHROPIC_BASE_URL and keep working.'],
  ['Codex', 'Through the Responses API.'],
  ['OpenCode', 'Through the OpenAI API.'],
];

const USES = [
  { market: 'Enterprise', job: 'Every team on one key', line: 'A key per project, each with a spend limit, and requests kept on EU providers.', href: '/solutions/enterprise/' },
  { market: 'Developers', job: 'Your coding agent, on any model', line: 'Claude Code, Codex and OpenCode connect with a base URL and nothing else.' },
  { market: 'Products', job: 'The cheapest provider, per request', line: 'The same open model from several providers. The router takes the price or the speed you ask for.' },
  { market: 'Model providers', job: 'Callers for your endpoint', line: 'List your model at your own price, and the router sends you the requests it wins.', href: '#sell' },
];

const FAQ = [
  ['How is llm.buzz different from a gateway?', 'A gateway gives you one key and one bill, and usually hides who runs the model. On llm.buzz a model name is a slot several providers fill, each with its own public price, and the router compares them on every request. You can see who served each call.'],
  ['What does it cost?', 'Each model at the provider\'s own price, with no markup. Credit is prepaid, from $5 to $25,000, and a 5.5% fee (at least $0.80) applies when you buy it. There is no fee per request or on tokens, and failed attempts are never charged.'],
  ['Can requests stay in the EU?', 'Yes, on every plan. Name EU providers in a request and it stays with them. If none of them can answer, the request is refused and sent nowhere else. Website, sign-in and payments run on Cloudflare, Google Firebase and Stripe, which may process data outside the EU.'],
  ['Do providers keep my prompts?', 'Each provider declares whether it trains on prompts and how long it keeps them. Ask for zero retention per request, or set no training and no retention for the whole account.'],
  ['What happens when a provider fails?', 'The next provider for the same model answers. With EU routing, failover stays inside the providers you named.'],
  ['Can we get invoices and volume pricing?', 'The Business plan has invoicing, custom terms and volume pricing. Write to sales.'],
  ['How do I sell my own inference?', 'Apply with your company details and endpoints, list models at your price and pass a check with real requests. llm.buzz takes no cut of your price.'],
];

export default function GatewayPage() {
  return (
    <Page>
      <Hero name="AI Gateway" title="Every model, one key."
        sub="llm.buzz is our open market for inference. Providers post their own price for the same model, and the router compares them on every request."
        actions={<>
          <Button href={LINKS.apiKey} external size="lg" arrow event="cta_api_key_clicked" eventProps={{ location: 'gateway_hero' }}>Get API key</Button>
          <Button href="#sell" size="lg" variant="secondary">Sell your inference</Button>
        </>}>
        <div className="mx-auto max-w-[1040px] text-left"><Market /></div>
      </Hero>

      <Section id="uses">
        <Lead title="Buy inference, or sell it." sub="Open-weights models are the same wherever they run, so providers compete on price, speed, uptime, region and data handling, in the open." />
        <UseCases items={USES} />
      </Section>

      <Section id="quickstart" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.list}>From key to first token.</h2>
          <ol className="m-0 mt-8 list-none border-b border-hairline p-0">
            {START.map(([t, d, code], i) => (
              <li key={t} className="grid grid-cols-[32px_1fr] gap-x-3 border-t border-hairline py-5">
                <span className="text-[13px] tabular-nums text-ink/45">{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="m-0 text-[15px] font-[500]">{t}</h3>
                  <p className="m-0 mt-1 text-[14px] leading-[1.55] text-ink/60">{d}</p>
                  {code && <code className="mt-3 block overflow-x-auto whitespace-nowrap rounded-lg bg-ivory px-3 py-2 font-mono text-[12px]">{code}</code>}
                </div>
              </li>
            ))}
          </ol>
          <p className="m-0 mt-6 text-[14px] text-ink/55">Works with your coding agent: {AGENTS.map(([t]) => t).join(', ')}.</p>
        </div>
        <div className="min-w-0 rounded-2xl bg-aubergine px-4 pt-8 pb-5 md:px-10 md:pt-10 md:pb-6">
          <CodeTabs tabs={TABS} />
        </div>
      </Section>

      <Section tone="aubergine" id="eu" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.feature}>In the EU, on every plan.</h2>
          <p className="mt-4 mb-0 max-w-[44ch] text-[16px] leading-[1.6] text-cream/70">
            Name EU providers in a request and it stays with them. If none of them can answer, the request is refused and sent nowhere else.
          </p>
          <p className="mt-6 mb-0 text-[13px] text-cream/50">From <a href={SOURCES.eu} target="_blank" rel="noopener noreferrer" className="!text-cream/70 underline decoration-cream/30 underline-offset-4">llm.buzz/eu</a>, 27 Oct 2026.</p>
        </div>
        <div className="min-w-0">
          <ul className="m-0 list-none border-b border-cream/15 p-0">
            {EU_PROVIDERS.map((p) => (
              <li key={p.name} className="grid gap-1 border-t border-cream/15 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                <span className="text-[15px] font-medium">{p.name}</span>
                <span className="text-[14px] leading-[1.5] text-cream/60">{p.policy}</span>
              </li>
            ))}
          </ul>
          <pre className="m-0 mt-6 overflow-x-auto rounded-xl !bg-night p-4 font-mono text-[12px] leading-[1.7] text-cream/85 md:text-[13px]">{`extra_body={"provider": {"only": [
  "scaleway/eu", "simpleminds-eu/eu", "surogate-spark/eu"]}}`}</pre>
        </div>
      </Section>

      <Section id="controls">
        <Lead title="Built for a whole company." sub="Keys, limits, data policy and logs, from the console or the API." />
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {CONTROLS.map(([t, d]) => (
            <li key={t} className="rounded-2xl bg-ivory p-6">
              <h3 className="m-0 text-[15px] font-[500]">{t}</h3>
              <p className="m-0 mt-2 text-[14px] leading-[1.55] text-ink/60">{d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="pricing" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.list}>The provider's price. Nothing on top.</h2>
          <p className="mt-3 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-ink/65">Prepaid credit from {MARKET.topUp[0]}. No fee per request or on tokens, and failed attempts are never charged. Invoicing and volume pricing on the Business plan.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/pricing/#api" size="lg" arrow event="pricing_opened" eventProps={{ location: 'gateway_pricing' }}>See AI Gateway pricing</Button>
          </div>
        </div>
        <div className="min-w-0 self-end"><Facts items={FACTS} /></div>
      </Section>

      <Section tone="ivory" id="sell" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.feature}>Sell your inference.</h2>
          <p className="mt-4 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-ink/65">{JOIN.line} llm.buzz takes {JOIN.cut} of your price.</p>
          <div className="mt-8"><Button href={JOIN.href} external size="lg" arrow event="llm_buzz_clicked" eventProps={{ location: 'gateway_sell' }}>Apply to list</Button></div>
          <p className="m-0 mt-8 max-w-[44ch] text-[14px] leading-[1.6] text-ink/55">
            Trained your own model? <a href="/train/" className="!text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Train and serve it</a> on our open-source engine, then list it here.
          </p>
        </div>
        <ol className="m-0 list-none border-b border-hairline p-0">
          {JOIN.steps.map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[32px_1fr] gap-x-3 border-t border-hairline py-5">
              <span className="text-[13px] tabular-nums text-ink/45">{i + 1}</span>
              <div><p className="m-0 text-[15px] font-medium">{t}</p><p className="m-0 mt-1 text-[14px] leading-[1.55] text-ink/60">{d}</p></div>
            </li>
          ))}
        </ol>
      </Section>

      <Faq items={FAQ} />

      <Closing title="Call every model with one key." line="Add credit from $5, or start on the free models."
        action={<Button href={LINKS.apiKey} external size="lg" arrow event="cta_api_key_clicked" eventProps={{ location: 'gateway_closing' }}>Get API key</Button>} />
    </Page>
  );
}
