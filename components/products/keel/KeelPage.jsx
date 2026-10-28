import { DEPLOYMENTS } from '@/lib/solutions';
import Section, { H2, CONTAINER } from '@/components/site/Section';
import Button, { Arrow } from '@/components/site/Button';
import InlineSvg from '@/components/site/InlineSvg';
import { withOnlyInstructionsAnAgentSvg } from '@/components/keel/illustrations';
import BoardFlow from '@/components/keel/BoardFlow';
import { CONTACT_SALES } from '@/lib/site';
import Page, { H1, SUB, Lead } from '../Page';
import Faq from '../Faq';

// The Keel page as it was on main (hero, problem, promises, pillars, board, closing), in its words and its
// order, set in the v2 system. The pillars' mortgage figures are the old page's own example case.

function Hero() {
  return (
    <section id="top" className="bg-white">
      <div className={`${CONTAINER} pt-14 pb-16 text-center md:pt-20 md:pb-24`}>
        <p className="load-up m-0 mb-4 text-[15px] font-medium text-ink/60" style={{ '--y': '8px', '--d': '600ms' }}>Keel</p>
        <h1 className={`${H1} load-up`} style={{ '--y': '10px', '--d': '600ms' }}>Processes that run agents.<br className="hidden md:inline" /> Not the other way around.</h1>
        <p className={`${SUB} mx-auto load-up`} style={{ '--y': '12px', '--t': '150ms', '--d': '600ms' }}>Keel runs agents in well-defined business processes.</p>
        <div className="load-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ '--y': '12px', '--t': '250ms', '--d': '600ms' }}>
          <Button href={CONTACT_SALES} size="lg" arrow event="contact_sales_clicked" eventProps={{ location: 'keel_hero' }}>Book a demo</Button>
          <Button href="#pillars" size="lg" variant="secondary" event="cta_how_it_works_clicked" eventProps={{ location: 'keel_hero' }}>How it works</Button>
        </div>
      </div>
    </section>
  );
}

// The old promise figures, redrawn in the palette: a run of agent and person steps, and a tested version going live.
const Steps = () => (
  <svg viewBox="0 0 230 80" className="block h-auto w-[230px] max-w-full" aria-hidden="true">
    {['#ffaf10', '#e4e7eb', '#ffaf10', '#0a0a0a'].map((c, i) => {
      const x = i * 52;
      return <polygon key={i} points={`${x},20 ${x + 46},20 ${x + 58},34 ${x + 46},48 ${x},48 ${x + 12},34`} fill={c} />;
    })}
    <text x="10" y="68" fontSize="11" fill="#0a0a0a" fillOpacity=".55">Agent</text>
    <text x="62" y="68" fontSize="11" fill="#0a0a0a" fillOpacity=".55">Person</text>
  </svg>
);
const Versions = () => (
  <svg viewBox="0 0 230 80" className="block h-auto w-[230px] max-w-full" aria-hidden="true">
    <rect x="10.5" y="12.5" width="96" height="56" rx="8" fill="#f4f4f5" />
    <text x="22" y="36" fontSize="15" fontWeight="600" fill="#0a0a0a">v3</text>
    <text x="22" y="56" fontSize="11" fill="#0a0a0a" fillOpacity=".55">running cases</text>
    <rect x="122" y="12" width="96" height="56" rx="8" fill="#fff" stroke="#0a0a0a" strokeWidth="1.5" />
    <text x="134" y="36" fontSize="15" fontWeight="600" fill="#0a0a0a">v4</text>
    <text x="134" y="56" fontSize="11" fill="#0a0a0a" fillOpacity=".55">live, tested</text>
    <path d="M108 40H120" stroke="#0a0a0a" strokeWidth="1.5" />
    <path d="M188 22l5 5 11-11" fill="none" stroke="#ffaf10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PROMISES = [
  { figure: <Steps />, eyebrow: 'Run work end to end', title: 'Whole processes. Fully automated.', line: 'Agents, people and your systems share one process, from the first form to the final decision.', link: 'See how a case is recorded' },
  { figure: <Versions />, eyebrow: 'Change confidently', title: 'Fast changes. No surprises.', line: 'Test every change on real scenarios before it goes live without impacting ongoing cases.', link: 'See how decisions are made' },
];

const Label = ({ children }) => <p className="m-0 mb-2.5 font-mono text-[12px] text-white/55">{children}</p>;
const Row = ({ className = '', children }) => <div className={`flex items-baseline gap-3 border-t border-white/10 py-2 text-[14px] ${className}`}>{children}</div>;

const CHAIN = [['System', 'Intake'], ['Agent', 'Checks'], ['Rule', 'Score'], ['Person', 'Approve']];
const HANDED = [['Net income', '€4,210', 'payslip, page 1'], ['Monthly debt', '€980', 'bank statement, line 14'], ['Employer', 'Arcadia Ltd', 'contract, page 2']];
const SCORECARD = [['Under 35%', '700 or more', 'Approve'], ['Under 35%', 'Under 700', 'Review'], ['35% or more', 'Any', 'Decline']];
const RECORD = [['09:41', 'Agent', "Payslip and bank statement don't match"], ['10:17', 'Person', 'Loan officer picks the figure'], ['10:19', 'Rule', 'Credit score 721, scorecard v12'], ['14:05', 'Person', 'Approved within a €250,000 limit']];

const PILLARS = [
  {
    eyebrow: 'Process', title: 'The process decides what happens next.',
    line: 'Agents, people, systems and rules each do their own step. No agent can skip ahead or close a case early.',
    ui: (
      <>
        <div className="flex items-stretch">
          {CHAIN.map(([who, step], i) => (
            <div key={step} className="flex min-w-0 flex-1 items-center">
              {i > 0 && <span aria-hidden="true" className="h-[1.5px] w-1.5 shrink-0 bg-sun sm:w-3.5" />}
              <div className={`flex min-w-0 flex-1 flex-col gap-1 rounded-lg px-1.5 py-2 sm:px-2.5 ${who === 'Agent' ? 'border-[1.5px] border-sun' : 'border border-white/20'}`}>
                <span className="text-[11px] text-white/55">{who}</span>
                <span className="text-[12px] font-medium sm:text-[13px]">{step}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Label>What the Checks agent handed back</Label>
          {HANDED.map(([k, v, src]) => (
            <Row key={k} className="flex-wrap gap-y-0.5">
              <span className="w-[104px] shrink-0 text-white/70">{k}</span>
              <span className="w-[92px] shrink-0 font-medium">{v}</span>
              <span className="min-w-0 font-mono text-[12px] text-white/50">{src}</span>
            </Row>
          ))}
        </div>
      </>
    ),
  },
  {
    eyebrow: 'Decisions', title: 'Decisions come from rules your team owns.',
    line: 'Approvals, risk scores and routing run on versioned rules that your analysts read and change.',
    ui: (
      <>
        <Label>Mortgage scorecard, version 12, live from 1 November</Label>
        <div className="grid grid-cols-3 gap-3 py-2 text-[12px] font-medium text-white/55"><span>Debt to income</span><span>Credit score</span><span>Outcome</span></div>
        {SCORECARD.map((r) => (
          <div key={r.join()} className="grid grid-cols-3 gap-3 border-t border-white/10 py-2 text-[14px]">
            {r.map((c, i) => <span key={i} className={i === 2 ? 'font-medium' : ''}>{c}</span>)}
          </div>
        ))}
      </>
    ),
  },
  {
    eyebrow: 'Oversight', title: 'People keep the final say.',
    line: 'Approval limits and four-eyes checks apply to agents as they do to staff. An unsure agent stops and asks a person.',
    ui: (
      <>
        <Label>A mortgage application, as Keel recorded it</Label>
        {RECORD.map(([t, who, what]) => (
          <Row key={t}>
            <span className="w-[42px] shrink-0 font-mono text-[12px] text-white/55">{t}</span>
            <span className={`w-[52px] shrink-0 text-[12px] ${who === 'Agent' ? 'text-sun' : 'text-white/55'}`}>{who}</span>
            <span className="min-w-0 leading-[1.45]">{what}</span>
          </Row>
        ))}
      </>
    ),
  },
  {
    eyebrow: 'Infrastructure', title: 'It runs where your data lives.',
    line: 'Use any AI model and connect the systems you already run, in our cloud or in your own data centre.',
    ui: (
      <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
        {DEPLOYMENTS.map((d) => (
          <li key={d.name} className="rounded-lg border border-white/15 px-3.5 py-3">
            <p className="m-0 text-[14px] font-medium">{d.name}</p>
            <p className="m-0 mt-1 text-[12.5px] leading-[1.45] text-white/60">{d.line}</p>
          </li>
        ))}
      </ul>
    ),
  },
];

const FAQ = [
  ['How is Keel different from an agent with instructions?', 'An agent with only instructions still improvises: it can approve early, skip a check or stop halfway. In Keel every case follows the path you designed, and the agent only works on the step it has been given.'],
  ['Who decides, the agent or the rules?', 'The rules. Approvals, risk scores and routing run on versioned rules your analysts read and change. Agents do the work inside a step.'],
  ['Can a person overrule an agent?', 'Yes. Approval limits and four-eyes checks apply to agents as they do to staff, and an unsure agent stops and asks a person.'],
  ['Where does it run?', 'In our cloud or in your own data centre, with any AI model and the systems you already run.'],
  ['How is it priced?', 'On Surogate Cloud, per completed case, on any cloud plan: $0.20 for the first 10,000 cases a month, $0.10 up to 100,000 and $0.05 beyond. Model calls inside a case are billed at cost.'],
  ['How do we start?', 'Describe how the work runs today, or share the documents you already have. Keel\'s designer agent drafts the process, and your team reviews it before anything goes live.'],
];

export default function KeelPage() {
  return (
    <Page>
      <Hero />

      <Section tone="aubergine" inner="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="mx-auto w-full max-w-[520px] [&_svg]:h-auto [&_svg]:w-full">
          <InlineSvg markup={withOnlyInstructionsAnAgentSvg} />
        </div>
        <div>
          <h2 className={H2.feature}>An agent with instructions still improvises.</h2>
          <p className="mt-4 mb-0 max-w-[44ch] text-[16px] leading-[1.6] text-white/70">In Keel every case follows the path you designed, and the agent only works on the step it's been given.</p>
        </div>
      </Section>

      <Section tone="grey" divider={false}>
        <Lead title="Run agentic processes safely" sub="Agents, employees and systems together, from the first form to the final decision." />
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {PROMISES.map((p) => (
            <li key={p.title} className="flex flex-col rounded-2xl bg-white p-6 md:p-8">
              {p.figure}
              <p className="m-0 mt-6 text-[13px] font-medium text-ink/55">{p.eyebrow}</p>
              <h3 className="m-0 mt-2 text-[20px] font-[500] leading-[1.25]">{p.title}</h3>
              <p className="m-0 mt-2 text-[15px] leading-[1.55] text-ink/65">{p.line}</p>
              <a href="#pillars" className="group mt-auto inline-flex items-center gap-1 pt-6 text-[14px] font-medium !text-ink no-underline">{p.link}<Arrow /></a>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="aubergine" id="pillars">
        <Lead title="Agents do the work, not the process." sub="Four guarantees let agents take on work where mistakes are costly." />
        <ul className="m-0 grid list-none gap-3 p-0 lg:grid-cols-2">
          {PILLARS.map((p) => (
            <li key={p.eyebrow} className="flex flex-col rounded-2xl bg-night p-6 md:p-8">
              <p className="m-0 text-[13px] font-medium text-sun">{p.eyebrow}</p>
              <h3 className="m-0 mt-2 text-[20px] font-[500] leading-[1.25]">{p.title}</h3>
              <p className="m-0 mt-2 text-[15px] leading-[1.55] text-white/70">{p.line}</p>
              <div className="mt-auto pt-7">{p.ui}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="features" divider={false}>
        <Lead title="Built to run real processes." sub="Design them, run them, connect agents and systems, and keep control of every decision." />
        <BoardFlow />
      </Section>

      <Faq items={FAQ} />

      <Section tone="aubergine" id="contact" rings>
        <div className="max-w-[640px]">
          <h2 className={H2.feature}>Start with one process.</h2>
          <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-white/70">Describe how the work runs today, or share the documents you already have. Keel's designer agent drafts the process, and your team reviews it before anything goes live.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={CONTACT_SALES} size="lg" variant="sun" arrow event="contact_sales_clicked" eventProps={{ location: 'keel_closing_draft' }}>Draft your process</Button>
            <Button href={CONTACT_SALES} size="lg" variant="glass" event="contact_sales_clicked" eventProps={{ location: 'keel_closing' }}>Book a demo</Button>
          </div>
        </div>
      </Section>
    </Page>
  );
}
