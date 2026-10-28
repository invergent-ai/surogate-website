import { ChevronRight } from 'lucide-react';
import Shell from '@/components/solutions/Shell';
import Hero from '@/components/solutions/Hero';
import Steps from '@/components/solutions/Steps';
import Products from '@/components/solutions/Products';
import Deployments from '@/components/solutions/Deployments';
import ContactBand from '@/components/solutions/ContactBand';
import ProductPanel from '@/components/solutions/ProductPanel';
import FilmCard from '@/components/solutions/FilmCard';
import Section, { H2 } from '@/components/site/Section';
import metaFor from '@/components/solutions/meta';
import { SOLUTIONS, MODEL_STEPS, OUR_MODELS } from '@/lib/solutions';

const s = SOLUTIONS.customModels;
const location = 'solutions_custom_models';

export const metadata = metaFor(s.path);

export default function CustomModelsPage() {
  return (
    <Shell>
      <Hero label={s.label} h1={s.h1} sub={s.sub} trust={s.trust} location={location}
        secondary={{ label: 'Read the benchmarks', href: '/labs/engine/' }} visual={<ProductPanel k="train" />} />
      <Steps title="From your data to a served model." sub="The same engine runs every step, on your GPUs or ours." steps={MODEL_STEPS} />
      <Section tone="aubergine" inner="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.feature}>We train our own first.</h2>
          <p className="mt-4 mb-0 max-w-[40ch] text-[16px] leading-[1.6] text-white/70">Our speech models and our engine are the proof: published, measured, and open to check.</p>
        </div>
        <ul className="m-0 list-none border-t border-white/15 p-0">
          {OUR_MODELS.map((m) => (
            <li key={m.name}>
              <a href={m.href} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-white/15 py-5 !text-white no-underline">
                <span className="text-[15px] font-medium">{m.name}</span>
                <span className="row-span-2 text-[28px] font-[450] tracking-[-0.01em] [font-variant-numeric:tabular-nums] md:text-[32px]">{m.n}</span>
                <span className="flex items-center gap-1 text-[13px] text-white/55">{m.l}<ChevronRight size={14} className="nudge shrink-0" /></span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <Section inner="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <h2 className={H2.list}>A model trained on a team’s own chats.</h2>
          <p className="mt-3 mb-0 max-w-[42ch] text-[16px] leading-[1.6] text-ink/65">Two fine-tunes scored against a big model on 20 questions the training chats never asked. Filmed on a demo business.</p>
        </div>
        <FilmCard slug="vandijk-ml-scoreboard" />
      </Section>
      <Products keys={s.products} />
      <Deployments sub="Your model goes where your data goes." />
      <ContactBand title="Tell us what your model should do." location={location} />
    </Shell>
  );
}
