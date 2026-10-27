import Shell from '@/components/solutions/Shell';
import Hero from '@/components/solutions/Hero';
import Stories from '@/components/solutions/Stories';
import FilmCard from '@/components/solutions/FilmCard';
import ContactBand from '@/components/solutions/ContactBand';
import Section, { SectionHead } from '@/components/site/Section';
import metaFor from '@/components/solutions/meta';
import { STORIES, DEMOS } from '@/lib/customers';
import { SIGN_IN } from '@/lib/site';

const location = 'customers';

export const metadata = metaFor('/customers/');

export default function CustomersPage() {
  return (
    <Shell>
      <Hero label="Customer Stories" h1="Who runs Surogate." location={location}
        sub="Regulated sectors first: banking, insurance, energy and the public sector."
        secondary={{ label: 'Watch the demos', href: '#demos' }} />
      <Stories keys={STORIES.map((s) => s.key)} title="Running Surogate today." location={location} />
      <Section id="demos">
        <SectionHead title="Watch it work." sub="Real product, filmed on demo businesses we made up. Each is a job a team hands to an agent." />
        <ul className="m-0 grid list-none gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((f) => <li key={f.slug}><FilmCard slug={f.slug} id={f.slug} /></li>)}
        </ul>
      </Section>
      <ContactBand title="Run it on your own work." note="Start free, or talk to us about a pilot." location={location} />
    </Shell>
  );
}
