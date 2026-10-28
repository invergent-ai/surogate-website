import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Button from '@/components/site/Button';
import Section, { H2, SectionHead } from '@/components/site/Section';
import { NewsGrid } from '@/components/news/NewsCard';
import { CompanyFacts, SplitHero, Team, Timeline, Values, personLd } from '@/components/company/parts';
import { COMPANY, DEFINITION, meta } from '@/lib/company';
import { POSTS } from '@/lib/news';
import { JsonLd } from '../structured-data';

export const metadata = meta('/company/', 'Company - Surogate by Invergent',
  'Invergent S.A. makes Surogate, Surogate Desktop, Voice, Keel, the AI Gateway and our own models, on your hardware or ours. Our values and every release.');

// The team section is parked until the owner says to show it; the data and photos stay in lib/company.js.
const SHOW_TEAM = false;

const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'AboutPage', url: 'https://surogate.ai/company/', name: 'About Surogate', about: { '@id': 'https://surogate.ai/#organization' } },
    ...(SHOW_TEAM ? personLd : []),
  ],
};

const LINKS = [
  { title: 'Research', line: 'Our own models, and the engine we train them on.', href: '/labs/' },
  { title: 'AI Gateway', line: 'llm.buzz, the open market for inference.', href: '/gateway/' },
  { title: 'Partners', line: 'Deliver Surogate and earn 30% of every client plan.', href: '/partners/' },
  { title: 'Careers', line: 'Write to us with what you have built.', href: '/careers/' },
];

export default function CompanyPage() {
  return (
    <div className="v2 pg-v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <JsonLd data={ld} />
      <main>
        <SplitHero
          title="Your AI, on your terms."
          sub="We build the agents, the models and the engine, so the AI you run can live where your data does."
          actions={<><Button href="/contact/" size="lg" arrow>Contact us</Button><Button href="/careers/" variant="secondary" size="lg">Join us</Button></>}
          links={LINKS}
        />

        <Section inner="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className={H2.feature}>Invergent makes Surogate.</h2>
          <div>
            <p className="m-0 text-[17px] leading-[1.65] text-ink/75">{DEFINITION}</p>
            <p className="m-0 mt-4 mb-8 text-[17px] leading-[1.65] text-ink/75">
              We sell directly and through partners, and publish the engine and the agent runtime as open source on{' '}
              <a href={COMPANY.github} target="_blank" rel="noopener noreferrer" className="!text-ink underline decoration-ink/30 underline-offset-2">GitHub</a>.
            </p>
            <CompanyFacts />
          </div>
        </Section>

        <Section>
          <SectionHead title="What we hold to." />
          <Values />
        </Section>

        {SHOW_TEAM && (
          <Section>
            <SectionHead title="The team." />
            <Team />
          </Section>
        )}

        <Section tone="aubergine" inner="flex flex-col gap-14">
          <div className="max-w-[640px]">
            <h2 className={H2.list}>Every release, dated.</h2>
            <p className="m-0 mt-3 text-[16px] leading-[1.6] text-white/65">Each line links the public record it is dated from.</p>
          </div>
          <Timeline />
        </Section>

        <Section>
          <SectionHead title="Latest news." action={<a href="/news/" className="inline-flex min-h-11 items-center text-[14px] font-medium !text-ink no-underline">All news</a>} />
          <NewsGrid posts={POSTS.slice(0, 3)} />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
