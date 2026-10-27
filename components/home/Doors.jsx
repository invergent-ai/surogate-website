import { ArrowRight } from 'lucide-react';
import Section, { SectionHead } from '@/components/site/Section';

export const DOORS = [
  { name: 'Enterprises', line: 'Sovereign deployment, single sign-on and a full audit trail.', href: '/solutions/enterprise/' },
  { name: 'Government and regulators', line: 'Air-gapped installs and EU data residency.', href: '/solutions/government/' },
  { name: 'Banks and insurers', line: 'Call-center voice and regulated case handling.', href: '/solutions/banking-insurance/' },
  { name: 'Professionals', line: 'For lawyers, doctors, accountants and teachers.', href: '/solutions/professionals/' },
  { name: 'Developers', line: 'One AI Gateway, an open-source engine and the docs.', href: '/gateway/' },
  { name: 'Partners', line: 'Build a practice on Surogate and earn on every client.', href: '/partners/' },
];

export default function Doors() {
  return (
    <Section>
      <SectionHead title="Where do you start?" />
      <ul className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline p-0 sm:grid-cols-2 lg:grid-cols-3">
        {DOORS.map((d) => (
          <li key={d.href} className="bg-white">
            <a href={d.href} className="group flex h-full items-start justify-between gap-6 p-6 !text-ink no-underline transition-colors duration-150 ease-in-out hover:bg-ivory">
              <span>
                <span className="block text-[16px] font-medium">{d.name}</span>
                <span className="mt-1.5 block text-[15px] leading-[1.55] text-ink/60">{d.line}</span>
              </span>
              <ArrowRight size={16} className="nudge mt-1 shrink-0 text-ink/40 group-hover:text-ink" />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
