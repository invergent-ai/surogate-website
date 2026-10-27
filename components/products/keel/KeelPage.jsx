import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import InlineSvg from '@/components/site/InlineSvg';
import { withOnlyInstructionsAnAgentSvg } from '@/components/keel/illustrations';
import { CONTACT_SALES } from '@/lib/site';
import { KEEL_PER_CASE } from '@/lib/pricing';
import Page, { Hero, Lead, UseCases, Closing } from '../Page';
import Scroller from '../Scroller';
import Faq from '../Faq';
import { reink } from '../ink';
import { ProcessPanel, RulesPanel, PersonPanel, AuditPanel, InfraPanel } from './Panels';
import CaseFlow from './CaseFlow';

const STEPS = [
  { title: 'The process decides what happens next.', line: 'A process is a row of stages. Agents, people, systems and rules each do their own step, and no agent can skip ahead or close a case early.', panel: <ProcessPanel /> },
  { title: 'Decisions come from rules your team owns.', line: 'Whether an invoice is paid or waits for a person is a versioned rule your team reads and changes, not something the agent decides.', panel: <RulesPanel /> },
  { title: 'People keep the final say.', line: 'Approval limits and four-eyes checks apply to agents as they do to staff. Over the approval limit, the case waits for a person.', panel: <PersonPanel /> },
  { title: 'It runs where your data lives.', line: 'Use any AI model and connect the systems you already run, in our cloud or in your own data centre.', panel: <InfraPanel /> },
];

const PARTS = [
  ['Stages', 'Every process is a row of stages. A case moves only along the paths you set.'],
  ['Agents', 'An agent works inside a stage, on the step it has been given.'],
  ['Approval limits', 'Over the limit, the case waits for a person to decide.'],
  ['Audit trail', 'Every step is recorded: who did it, under which rule.'],
];

// In the words of the solution pages (lib/solutions.js) and the Keel panels below.
const USES = [
  { market: 'Banking', job: 'Mortgage applications', line: 'An agent reads the payslip and the statement, the scorecard decides, and a loan officer signs within a limit.', href: '/solutions/banking-insurance/' },
  { market: 'Insurance', job: 'KYC files that need a sign-off', line: 'Four-eyes checks apply to agents as they do to staff. An unsure agent stops and asks a person.', href: '/solutions/banking-insurance/' },
  { market: 'Logistics', job: 'Supplier payments', line: 'An agent matches carrier invoices to POs and deliveries. Over the approval limit, the payment waits for a person.' },
  { market: 'Enterprise', job: 'Work where mistakes are costly', line: 'Every case follows the path you designed, under versioned rules your analysts own.', href: '/solutions/enterprise/' },
];

const PROMISES = [
  ['Run work end to end.', 'Agents, people and your systems share one process, from the first form to the final decision.'],
  ['Change it without surprises.', 'Test every change on real scenarios before it goes live, without touching cases already running.'],
];

const TIERS = KEEL_PER_CASE.map((t) => [t.upTo, t.price]);

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
      <Hero name="Keel" title={<>Processes that run agents.<br className="hidden md:inline" /> Not the other way around.</>}
        sub="Keel runs agents in well-defined business processes. Agents, people and your systems each do their step, under rules your team owns."
        actions={<>
          <Button href={CONTACT_SALES} size="lg" arrow event="contact_sales_clicked" eventProps={{ location: 'keel_hero' }}>Book a demo</Button>
          <Button href="#how" size="lg" variant="secondary" event="cta_how_it_works_clicked" eventProps={{ location: 'keel_hero' }}>How it works</Button>
        </>}>
        <figure className="m-0 mx-auto max-w-[1100px]">
          <CaseFlow />
          <figcaption className="mx-auto mt-8 grid max-w-[1100px] gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
            {PARTS.map(([t, d]) => (
              <div key={t}><p className="m-0 text-[15px] font-medium">{t}</p><p className="m-0 mt-1.5 text-[14px] leading-[1.55] text-ink/60">{d}</p></div>
            ))}
          </figcaption>
        </figure>
      </Hero>

      <Section id="uses">
        <Lead title="For work where a mistake costs money." sub="Banks, insurers and operations teams, one process at a time." />
        <UseCases items={USES} />
      </Section>

      <Section tone="aubergine" inner="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="mx-auto w-full max-w-[460px] [&_svg]:h-auto [&_svg]:w-full">
          <InlineSvg markup={reink(withOnlyInstructionsAnAgentSvg)} />
        </div>
        <div>
          <h2 className={H2.feature}>An agent with instructions still improvises.</h2>
          <p className="mt-4 mb-0 max-w-[44ch] text-[16px] leading-[1.6] text-cream/70">In Keel every case follows the path you designed, and the agent only works on the step it has been given.</p>
        </div>
      </Section>

      <Section id="how">
        <Lead title="Agents do the work, not the process." sub="Four guarantees let agents take on work where mistakes are costly." />
        <Scroller steps={STEPS} />
      </Section>

      <Section tone="ivory">
        <Lead title="Run agentic processes safely." sub="Agents, employees and systems together, from the first form to the final decision." />
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {PROMISES.map(([t, d]) => (
            <li key={t} className="rounded-2xl bg-white p-6 md:p-8">
              <h3 className="m-0 text-[15px] font-[500]">{t}</h3>
              <p className="m-0 mt-2 text-[14px] leading-[1.55] text-ink/60">{d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="proof" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.list}>Every case leaves an audit trail.</h2>
          <p className="mt-3 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-ink/65">Who did each step, under which rule, so any case can be audited and replayed.</p>
        </div>
        <AuditPanel />
      </Section>

      <Section id="pricing" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.list}>Priced per completed case.</h2>
          <p className="mt-3 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-ink/65">On Surogate Cloud, on any cloud plan. Model calls inside a case are billed at cost, like any other session.</p>
          <p className="mt-6 mb-0 text-[14px]"><a href="/pricing/#teams" className="!text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">See the cloud plans</a></p>
        </div>
        <ul className="m-0 list-none border-b border-hairline p-0">
          {TIERS.map(([t, p]) => (
            <li key={t} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-t border-hairline py-5 sm:grid-cols-[1fr_160px_auto]">
              <span className="text-[15px]">{t}</span>
              <span aria-hidden="true" className="order-last col-span-2 h-1.5 rounded-full bg-stone sm:order-none sm:col-span-1">
                <span className="block h-full rounded-full bg-ink" style={{ width: `${(p / TIERS[0][1]) * 100}%` }} />
              </span>
              <span className="text-right text-[20px] font-[450] tabular-nums">${p.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Faq items={FAQ} />

      <Closing title="Start with one process." line="Describe how the work runs today, or share the documents you already have. Keel drafts the process, and your team reviews it."
        action={<Button href={CONTACT_SALES} size="lg" arrow event="contact_sales_clicked" eventProps={{ location: 'keel_closing' }}>Book a demo</Button>} />
    </Page>
  );
}
