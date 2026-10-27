import { ArrowRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';
import Button from '@/components/site/Button';
import Section, { H2 } from '@/components/site/Section';
import { CompanyFacts, H1, SUB } from '@/components/company/parts';
import { CONTAINER } from '@/components/site/Section';
import { CHANNELS, CONTACT, meta } from '@/lib/company';

export const metadata = meta('/contact/', 'Contact - Surogate',
  'Write to Sales, Partners, Support or Press at Surogate, or talk to the team on Discord.');

export default function ContactPage() {
  return (
    <div className="v2 pg-v2 w-full overflow-x-clip bg-white font-sans text-ink">
      <Nav />
      <main>
        <section className="bg-white">
          <div className={`${CONTAINER} pt-14 pb-16 md:pt-24 md:pb-24`}>
            <div className="load-up max-w-[720px]">
              <h1 className={H1}>Talk to us.</h1>
              <p className={SUB}>Pick the team you need. Every address reaches {CONTACT.email}, with its own subject.</p>
            </div>
            <ul className="m-0 mt-12 grid list-none gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline p-0 md:mt-16 sm:grid-cols-2">
              {CHANNELS.map((c) => (
                <li key={c.key} className="bg-white">
                  <TrackedLink href={c.href} event={c.event} eventProps={{ channel: 'email', team: c.key, location: 'contact' }}
                    className="group flex h-full flex-col justify-between gap-10 p-6 !text-ink no-underline transition-colors duration-150 ease-in-out hover:bg-ivory md:p-8">
                    <span>
                      <span className="block text-[20px] font-[500]">{c.title}</span>
                      <span className="mt-2 block max-w-[40ch] text-[15px] leading-[1.55] text-ink/60">{c.line}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[14px] font-medium">{c.label}<ArrowRight size={15} className="nudge" /></span>
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Section tone="aubergine" inner="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className={H2.feature}>Rather chat?</h2>
            <p className="m-0 mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-cream/70">Ask about agents, models or the engine on our Discord.</p>
          </div>
          <Button href={CONTACT.discord} variant="sun" size="lg" external arrow event="reach_out_clicked" eventProps={{ channel: 'discord', location: 'contact' }}>Join our Discord</Button>
        </Section>

        <Section inner="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 className={H2.list}>Our office.</h2>
          <CompanyFacts />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
