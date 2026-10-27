import { ArrowUpRight } from 'lucide-react';
import Shell from '@/components/solutions/Shell';
import Hero from '@/components/solutions/Hero';
import Problems from '@/components/solutions/Problems';
import Deployments from '@/components/solutions/Deployments';
import ContactBand from '@/components/solutions/ContactBand';
import Section, { H2, SectionHead } from '@/components/site/Section';
import TrackedLink from '@/components/TrackedLink';
import metaFor from '@/components/solutions/meta';
import { ENGINE } from '@/lib/labs';
import { CONTACT, LINKS, mailto } from '@/lib/site';

const location = 'security';

export const metadata = metaFor('/security/');

// From the Agents page (runtime and sovereign sections).
const RULES = [
  { p: 'Keys the agent never sees.', a: 'The proxy adds credentials on the way out. They stay in your vault.' },
  { p: 'Rules fixed for each turn.', a: 'Text injected mid-turn cannot loosen the tool policy.' },
  { p: 'Sensitive calls wait for a person.', a: 'They wait in the inbox. A grant covers one call, for one hour.' },
  { p: 'Definitions checked for changes.', a: 'Agent definitions are scanned for hidden instructions and fingerprinted against changes.' },
  { p: 'Records in your storage.', a: 'Sessions, files and logs stay where you run the platform.' },
];

// From the pricing FAQ and the llm.buzz facts in the v2 learnings.
const CLOUD = [
  'We do not train on your data.',
  'Your workspace is private, and hub artifacts are private by default.',
  'You can export everything at any time, with no egress fees on hub content.',
  'Model calls through llm.buzz can be routed to EU providers only, on every plan.',
];

const REPOS = [
  { name: 'Surogate engine', line: `Training and serving, ${ENGINE.facts[2].n}`, href: ENGINE.repo },
  { name: 'Surogate Speech', line: 'The toolkit behind Jackrabbit and Amami', href: 'https://github.com/invergent-ai/surogate-speech' },
  { name: 'Jackalope', line: 'Public releases', href: LINKS.jackalope },
  { name: 'Everything else', line: 'The agent runtime and our other repositories', href: LINKS.github },
];

export default function SecurityPage() {
  return (
    <Shell>
      <Hero label="Security & Trust" h1="Where your data lives." location={location}
        sub="Run Surogate in our EU cloud, your cloud, your hardware or an air-gapped network. Keys, files and logs stay where you run it."
        secondary={{ label: 'Report an issue', href: '#disclosure' }}
        trust={['EU hosting', 'Air-gapped installs', 'Open source you can read', 'No training on your data']} />
      <Deployments sub="The same platform in each. The taller the bar, the less leaves your walls." />
      <Problems title="Agents stay inside the rules." items={RULES} />
      <Section tone="aubergine" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.feature}>On our cloud.</h2>
          <p className="mt-4 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-cream/70">Hosted in the EU. What we do, and do not do, with what you put there.</p>
        </div>
        <ul className="m-0 list-none border-t border-cream/15 p-0">
          {CLOUD.map((x) => <li key={x} className="border-b border-cream/15 py-5 text-[16px] leading-[1.55] text-cream/85">{x}</li>)}
        </ul>
      </Section>
      <Section>
        <SectionHead title="Read the code." sub="Your security team can check what runs, line by line." />
        <ul className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline p-0 sm:grid-cols-2 lg:grid-cols-4">
          {REPOS.map((r) => (
            <li key={r.name} className="bg-white">
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-6 !text-ink no-underline transition-colors duration-150 ease-in-out hover:bg-ivory">
                <span className="flex items-center justify-between text-[16px] font-medium">{r.name}<ArrowUpRight size={16} className="text-ink/40 group-hover:text-ink" /></span>
                <span className="mt-1.5 text-[14px] leading-[1.55] text-ink/60">{r.line}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="disclosure" inner="grid items-start gap-8 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <h2 className={H2.list}>Found a vulnerability?</h2>
        <div>
          <p className="m-0 max-w-[56ch] text-[16px] leading-[1.6] text-ink/70">
            Write to us with the steps to reproduce it. Please give us time to fix it before you publish.
          </p>
          <TrackedLink href={mailto('Security report')} event="security_report_clicked" eventProps={{ location }}
            className="mt-5 inline-flex min-h-11 items-center text-[16px] font-medium !text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
            {CONTACT.email}
          </TrackedLink>
        </div>
      </Section>
      <ContactBand title="Bring your security questions." note="We walk your team through the deployment you need." location={location} />
    </Shell>
  );
}
