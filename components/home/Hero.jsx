import Pill from '@/components/site/Pill';
import Button from '@/components/site/Button';
import DeploySwitch from './DeploySwitch';
import { ANNOUNCEMENT, CONTACT_SALES, SIGN_IN } from '@/lib/site';

export default function Hero() {
  return (
    <section className="bg-white px-6 pt-20 pb-16 text-center md:pt-28">
      <Pill {...ANNOUNCEMENT} />
      <h1 className="mx-auto mt-8 mb-0 text-[clamp(44px,6.2vw,80px)] font-[460] leading-[1.02] tracking-[-0.025em] text-ink md:whitespace-nowrap">
        Your AI, on your terms.
      </h1>
      <p className="mx-auto mt-6 mb-0 max-w-[56ch] text-[18px] leading-[1.6] text-ink/70">
        Agents, voice and your own models, on your hardware or ours. Built in Europe.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href={SIGN_IN} size="lg" event="cta_signup_clicked" eventProps={{ location: 'home_hero' }}>Try for free ›</Button>
        <Button href={CONTACT_SALES} size="lg" variant="secondary" event="contact_sales_clicked" eventProps={{ location: 'home_hero' }}>Contact Sales</Button>
      </div>
      <DeploySwitch />
    </section>
  );
}
