import { ArrowRight } from 'lucide-react';
import Section, { SectionHead } from '@/components/site/Section';

// The AI Gateway is llm.buzz: one key, the providers' own prices. It is never pitched as self-hosted.
const STACK = [
  { name: 'Surogate', line: "AI colleagues for every team, designed, tested and governed without code, working with the client's skills, knowledge and channels.", href: '/agents/' },
  { name: 'Surogate Desktop', line: 'The agent on each person\'s own computer: it works on the files in folders they choose, runs commands in a sandbox and uses their browser.', href: '/surogate-desktop/' },
  { name: 'Keel', line: 'Processes where agents, people and systems each do their step, under rules and approval limits the client owns.', href: '/keel/' },
  { name: 'AI Gateway', line: 'Every model on one key, at the price each provider posts, with a spend limit per project.', href: '/gateway/' },
  { name: 'Custom models', line: "Models trained on the client's data, from fine-tuning and evaluation to serving, speech included.", href: '/solutions/custom-models/' },
];

export default function Deliver() {
  return (
    <Section tone="ivory" id="deliver">
      <SectionHead title="Deliver the whole stack."
        sub="Run it on our cloud or on the client's own Kubernetes. Surogate, Keel and the models also run air-gapped." />
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-5">
        {STACK.map((x) => (
          <li key={x.name}>
            <a href={x.href} className="group flex h-full flex-col rounded-2xl bg-white p-6 !text-ink no-underline">
              <span className="flex items-center justify-between text-[16px] font-medium">{x.name}<ArrowRight size={16} className="nudge text-ink/40 group-hover:text-ink" /></span>
              <span className="mt-2 block text-[14px] leading-[1.55] text-ink/60">{x.line}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
