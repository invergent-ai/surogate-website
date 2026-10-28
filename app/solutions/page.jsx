import { ArrowRight, ChevronRight } from 'lucide-react';
import Shell from '@/components/solutions/Shell';
import Hero from '@/components/solutions/Hero';
import ContactBand from '@/components/solutions/ContactBand';
import Section, { SectionHead } from '@/components/site/Section';
import metaFor from '@/components/solutions/meta';
import { USE_CASES, product } from '@/lib/solutions';

const location = 'solutions_index';

export const metadata = metaFor('/solutions/');

const PAGES = [
  { name: 'Enterprise', line: 'Every team, on your infrastructure.', href: '/solutions/enterprise/' },
  { name: 'Government', line: 'Air-gapped, with code you can read.', href: '/solutions/government/' },
  { name: 'Banking & Insurance', line: 'Call-center voice and cases with sign-off.', href: '/solutions/banking-insurance/' },
  { name: 'Professionals', line: 'Lawyers, doctors, accountants, teachers.', href: '/solutions/professionals/' },
  { name: 'Custom Models', line: 'We train your model on your data.', href: '/solutions/custom-models/' },
  { name: 'Security & Trust', line: 'Where your data lives.', href: '/security/' },
];

export default function SolutionsPage() {
  return (
    <Shell>
      <Hero label="Solutions" h1="Every use case, by industry." location={location}
        sub="Find your sector, then open its page or watch the product do the job."
        secondary={{ label: 'Read customer stories', href: '/customers/' }}
        visual={(
        <ul className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline p-0 sm:grid-cols-2 ">
          {PAGES.map((d) => (
            <li key={d.href} className="bg-white">
              <a href={d.href} className="group flex h-full items-start justify-between gap-6 p-6 !text-ink no-underline transition-colors duration-150 ease-in-out hover:bg-white">
                <span>
                  <span className="block text-[16px] font-medium">{d.name}</span>
                  <span className="mt-1.5 block text-[15px] leading-[1.55] text-ink/60">{d.line}</span>
                </span>
                <ArrowRight size={16} className="nudge mt-1 shrink-0 text-ink/40 group-hover:text-ink" />
              </a>
            </li>
          ))}
        </ul>
        )} />
      <Section tone="grey">
        <SectionHead title="What teams hand to Surogate." sub="Some rows open a demo filmed on a made-up business." />
        <table className="w-full border-collapse text-left text-[15px]">
          <thead className="sr-only md:not-sr-only">
            <tr className="border-b border-ink/10 text-[13px] text-ink/50">
              <th className="py-3 pr-6 font-normal">Industry</th><th className="py-3 pr-6 font-normal">The job</th>
              <th className="py-3 pr-6 font-normal">Product</th><th className="py-3 font-normal"><span className="sr-only">Open</span></th>
            </tr>
          </thead>
          <tbody>
            {USE_CASES.map((u) => {
              const href = u.film ? `/customers/#${u.film}` : u.href;
              return (
                <tr key={u.job} className="grid grid-cols-[1fr_auto] border-b border-ink/10 py-4 md:table-row md:py-0">
                  <td className="text-[13px] text-ink/55 md:py-4 md:pr-6 md:text-[15px] md:text-ink/70">{u.industry}</td>
                  <td className="col-span-2 row-start-2 pt-1 font-medium md:py-4 md:pr-6">{u.job}</td>
                  <td className="col-start-2 row-start-1 text-right text-[13px] text-ink/55 md:py-4 md:pr-6 md:text-left md:text-[15px] md:text-ink/70">{product(u.product).name}</td>
                  <td className="col-span-2 row-start-3 pt-2 md:py-4 md:text-right">
                    <a href={href} className="group inline-flex min-h-6 items-center gap-0.5 whitespace-nowrap text-[14px] font-medium !text-ink no-underline">
                      {u.film ? 'Watch the film' : 'Open the page'}<ChevronRight size={15} className="nudge" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>
      <ContactBand title="Not sure where you fit?" location={location} />
    </Shell>
  );
}
