import { Check } from 'lucide-react';
import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import Rabbit from '@/components/site/Rabbit';
import { VideoFrame } from '@/components/site/ProductMedia';
import { CONTACT_SALES, SIGN_IN } from '@/lib/site';
import { TEAM_PLANS, usd } from '@/lib/pricing';
import { TASK_ATTEMPTS } from '@/lib/products';
import Page, { Hero, Lead, Facts, UseCases, Closing } from '../Page';
import Scroller from '../Scroller';
import Faq from '../Faq';
import { HERO_RINGS, BAND_CLIP, BAND_RINGS } from '../rings';
import AgentRings from './Rings';
import JobPicker from './JobPicker';
import { SetupPanel, KnowledgePanel, ChannelsPanel, LongPanel, GovernPanel, ImprovePanel } from './Panels';

const RUNTIME = 'https://github.com/invergent-ai/surogates';

const FACTS = [
  { n: 'No code', l: 'every part of an agent is a screen in the studio, from setup to approvals' },
  { n: '9 channels', l: 'for one agent: web, Slack, Teams, WhatsApp, the phone and more' },
  { n: 'Open source', l: 'runtime on GitHub, so your security team can read every line' },
];

// One per market, in the words of the solution pages (lib/solutions.js).
const MARKETS = [
  { market: 'Banking and insurance', job: 'Loan and KYC files, checked', line: 'Flags what is missing in each file. Anything that needs a sign-off waits for a person.', href: '/solutions/banking-insurance/' },
  { market: 'Public sector', job: 'Permit questions, in Romanian', line: 'Answers citizens from your own documents, air-gapped, with our models on your GPUs.', href: '/solutions/government/' },
  { market: 'Enterprise', job: 'One platform for every team', line: 'Single sign-on, roles, audit logs and a spend limit on every key.', href: '/solutions/enterprise/' },
  { market: 'Professionals', job: 'Clients answered from the file', line: 'Status questions, document chases and deadlines, at the hour the client asked.', href: '/solutions/professionals/' },
];

const STEPS = [
  { title: 'Set it up without code', line: 'Every part of an agent is a screen in the studio. Change one and the next session uses it, with no rollout.',
    points: ['Start from a template or a blank agent, and talk to it straight away', 'The Copilot can take any step, and builds only what you approve'], panel: <SetupPanel /> },
  { title: 'Teach it your work', line: 'Attach skills and knowledge bases. Your documents become a searchable wiki, with the source passage behind every answer.',
    points: ['Every skill version is kept, and each session records the one it used', 'MCP servers and Composio toolkits, scanned before the agent sees them'], panel: <KnowledgePanel /> },
  { title: 'Put it where your team works', line: 'A person who moves from the web to Slack or WhatsApp keeps the same conversations, memory and allowance.', panel: <ChannelsPanel /> },
  { title: 'Let it run for days', line: 'Goals, missions, loops and deep research run for hours, days or months. Programs follow up with people on the days you choose.',
    points: ['Sub-agents share a board of checked notes, so a dead end is not repeated', `A task is stored and gets up to ${TASK_ATTEMPTS} attempts, each reading what went wrong before`], panel: <LongPanel /> },
  { title: 'Keep it inside the rules', line: 'Sensitive calls wait in the approvals inbox. Rules are fixed for each turn, so text injected mid-turn cannot loosen them.',
    points: ['Keys the agent never sees: the proxy adds credentials on the way out', 'Sessions survive crashes, and failed steps are undone in reverse order'], panel: <GovernPanel /> },
  { title: 'Make it better from its own sessions', line: 'Mark sessions as good or bad, and the studio turns them into training data, fine-tunes, scores and experts.',
    points: ['Skill optimisation keeps the best version, and nothing changes until you apply it', 'Train on AWS, Azure, GCP, Nebius, RunPod, Modal, Oracle, Vast.ai or your own servers'], panel: <ImprovePanel /> },
];

const NETWORK = [
  ['Studio and runtime', 'Agents, sessions and schedules, on your Kubernetes'],
  ['Sandboxes', 'Shell, browser and office files, a network policy per session'],
  ['Models', 'Surogate 3.7, Jackrabbit and Amami on your GPUs, next to your fine-tunes'],
  ['Vault', 'API keys and passwords, added by a proxy, never shown'],
  ['Storage', 'Sessions, files and logs; skills, datasets and models'],
  ['Your servers', 'Train and serve over SSH, or on your own cloud account'],
];

const COMPARE = [
  ['Agent frameworks', 'LangChain, LangGraph', 'You write the agent in code, then build sessions, sandboxes, channels and governance around it.', 'Those come with the platform, and agents are built in the studio.'],
  ['Coding agents', 'Claude Code, Codex', 'One person, on one machine, in one terminal.', 'Whole teams on nine channels, with governance and a record of every step. Claude Code and Codex can run inside a session.'],
  ['Managed agent platforms', '', 'The vendor builds and runs the agents on its own cloud.', 'Your team builds them, in your cloud or air-gapped, with any model.'],
];

const PLANS = TEAM_PLANS.map((p) => ({
  name: p.name, price: usd(p.price.monthly), per: p.id === 'pilot' ? 'for the first 60 days' : 'a month',
  points: p.features.filter((f) => f.text !== 'Unlimited users and agents').slice(0, 4).map((f) => f.text),
}));

const SELL = [
  ['Your Stripe account', 'Subscriptions, usage packs or both, in seven currencies. You are the merchant of record.'],
  ['Pages made for you', 'A buy page at your agent\'s address, and a landing page you assemble from blocks.'],
  ['Packages', 'Each offer opens the channels, tools, knowledge and model tier you choose.'],
];

const FAQ = [
  ['Do I need to write code?', 'No. Every part of an agent is a screen in the studio: identity, skills, knowledge, tools, model, capabilities and governance. The Copilot can build any step for you, and builds only what you approve.'],
  ['Which models can an agent use?', 'Ours (Surogate 3.7, Jackrabbit and Amami), your own fine-tunes, OpenRouter or any OpenAI-compatible endpoint.'],
  ['Can it run on our own hardware?', 'Yes. The whole platform runs on your Kubernetes, on-premise or air-gapped, with your models, and no data has to leave your network.'],
  ['How do approvals work?', 'You choose the calls that need approval. They wait in the approvals inbox, and a grant covers one call, for one hour. Anything that reaches people or money needs its own yes.'],
  ['Is it open source?', 'The runtime is, on GitHub, so your security team can read every line.'],
  ['Can I sell an agent I built?', 'Yes. Put a price on it and share a link. Buyers pay on your own Stripe account and do not need a Surogate account.'],
  ['What does it cost?', 'Each client organisation starts with a 60-day pilot at $0, then Production at $990 a month or Scale at $2,990 a month, with unlimited users and agents. Personal plans start free.'],
];

export default function AgentsPage() {
  return (
    <Page>
      <Hero title="Meet" pose="team" rest="Surogate."
        sub="AI colleagues for every team. Design, test, govern and run them without code, in your cloud or on your own hardware."
        actions={<>
          <Button href={SIGN_IN} size="lg" arrow event="cta_signup_clicked" eventProps={{ location: 'agents_hero' }}>Start building</Button>
          <Button href={CONTACT_SALES} size="lg" variant="secondary" event="contact_sales_clicked" eventProps={{ location: 'agents_hero' }}>Contact Sales</Button>
        </>}
        rings={<AgentRings className={HERO_RINGS} />}>
        <div className="mx-auto max-w-[880px]">
          <VideoFrame src="/media/loops/agents.mp4" poster="/media/loops/agents.jpg" />
          <p className="m-0 mt-3 text-left text-[13px] text-ink/50 md:mt-4">An agent asks before it pays a supplier. Filmed on a demo business.</p>
        </div>
      </Hero>

      <Section id="jobs">
        <Lead title="Give each agent a job." sub="Six markets, six agents, each filmed at work on a demo business." />
        <JobPicker />
        <h3 className="m-0 mt-16 mb-5 text-[15px] font-[500] md:mt-20">By market</h3>
        <UseCases items={MARKETS} />
      </Section>

      <Section divider={false} inner="!py-6 md:!py-10">
        <div className="relative overflow-hidden rounded-2xl bg-white px-6 py-14 md:px-16 md:py-24">
          <div className="relative z-10 max-w-[520px]">
            <h2 className={H2.feature}>Brief it like a colleague.</h2>
            <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-ink/65 md:text-[18px]">
              Say what the agent is for. The Copilot shows a plan, builds only what you approve, and anything that reaches people or money needs its own yes.
            </p>
          </div>
          <span aria-hidden="true" className="absolute -right-10 -bottom-16 hidden text-ink/90 md:block" style={{ '--rabbit-bg': '#fafafa' }}>
            <Rabbit size={440} />
          </span>
        </div>
      </Section>

      <Section id="how">
        <Lead title="From a blank page to a live agent." sub="Six steps, each one a screen in the studio." />
        <Scroller steps={STEPS} />
      </Section>

      <Section id="sell">
        <Lead title="Sell an agent you built." sub="Put a price on it and share a link. Buyers do not need a Surogate account." />
        <ul className="m-0 grid list-none gap-8 p-0 md:grid-cols-3">
          {SELL.map(([t, d]) => (
            <li key={t} className="border-t border-hairline pt-5">
              <h3 className="m-0 text-[15px] font-[500]">{t}</h3>
              <p className="m-0 mt-2 text-[14px] leading-[1.55] text-ink/60">{d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="aubergine" id="sovereign" className="relative isolate overflow-hidden">
        <div className={BAND_CLIP}><AgentRings dark className={BAND_RINGS} /></div>
        <Lead title="Run all of it inside your own network." sub="On-premise or air-gapped, the whole platform runs on your Kubernetes with your models, and no data has to leave your network." />
        <div className="rounded-2xl border border-dashed border-white/25 p-3 md:p-5">
          <p className="m-0 mb-3 px-1 text-[13px] text-white/60">Your network</p>
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {NETWORK.map(([t, d]) => (
              <li key={t} className="rounded-xl bg-[#371f3a] p-5">
                <p className="m-0 text-[15px] font-medium">{t}</p>
                <p className="m-0 mt-1.5 text-[14px] leading-[1.5] text-white/60">{d}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="m-0 mt-6 text-[14px] text-white/60">The runtime is open source: <a href={RUNTIME} target="_blank" rel="noopener noreferrer" className="!text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">github.com/invergent-ai/surogates</a></p>
      </Section>

      <Section id="proof">
        <Lead title="Why teams pick it." sub="Live in minutes, on every channel your people use, and open for your security team to read." />
        <Facts items={FACTS} />
        <h3 className="m-0 mt-16 text-[15px] font-[500] md:mt-20">How it compares</h3>
        <div className="mt-5 hidden grid-cols-[1fr_1.4fr_1.4fr] gap-8 border-b border-hairline pb-3 text-[13px] text-ink/50 md:grid">
          <span /><span>Elsewhere</span><span>In Surogate</span>
        </div>
        {COMPARE.map(([k, eg, them, us]) => (
          <div key={k} className="grid gap-2 border-b border-hairline py-6 md:grid-cols-[1fr_1.4fr_1.4fr] md:gap-8">
            <div><p className="m-0 text-[16px] font-medium">{k}</p>{eg && <p className="m-0 mt-1 text-[13px] text-ink/50">{eg}</p>}</div>
            <p className="m-0 text-[15px] leading-[1.55] text-ink/55"><span className="md:hidden">Elsewhere: </span>{them}</p>
            <p className="m-0 text-[15px] leading-[1.55] text-ink"><span className="text-ink/50 md:hidden">In Surogate: </span>{us}</p>
          </div>
        ))}
      </Section>

      <Section tone="grey" id="pricing">
        <Lead title="One plan per client organisation." sub="Unlimited users and agents on every plan. Models at the provider's price, or bring your own." />
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
          {PLANS.map((p) => (
            <li key={p.name} className="flex flex-col rounded-2xl bg-white p-6 md:p-7">
              <h3 className="m-0 text-[15px] font-[500]">{p.name}</h3>
              <p className="m-0 mt-4 text-[30px] font-[450] leading-none tabular-nums">{p.price}<span className="ml-1.5 text-[14px] font-normal text-ink/50">{p.per}</span></p>
              <ul className="m-0 mt-6 flex list-none flex-col gap-2 p-0 text-[14px] text-ink/65">
                {p.points.map((x) => <li key={x} className="flex gap-2.5"><Check size={15} className="mt-[3px] shrink-0" />{x}</li>)}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="m-0 text-[14px] text-ink/55">Personal plans start free with five agents and no card.</p>
          <Button href="/pricing/#teams" size="lg" arrow event="pricing_opened" eventProps={{ location: 'agents_pricing' }}>See all plans</Button>
        </div>
      </Section>

      <Faq items={FAQ} />

      <Closing title="Meet your first agent." peek="team"
        line="Start free with five agents and no card, or install the platform on your own Kubernetes."
        action={<Button href={SIGN_IN} size="lg" arrow event="cta_signup_clicked" eventProps={{ location: 'agents_closing' }}>Start building</Button>} />
    </Page>
  );
}

