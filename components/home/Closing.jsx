import { CONTAINER } from '@/components/site/Section';
import Button from '@/components/site/Button';
import GoldPhoto from '@/components/site/GoldPhoto';
import { CONTACT_SALES } from '@/lib/site';

// The last band: a full-bleed photo in the aubergine duotone, and the ask on a pane of frosted glass over it.
export default function Closing() {
  return (
    <section data-tone="aubergine" className="relative overflow-hidden bg-aubergine text-white">
      <GoldPhoto slug="hero-window-city-dusk" tone="plum" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,10,28,.7)_0%,rgba(26,10,28,.35)_55%,rgba(26,10,28,.15)_100%)]" />
      <div className={`relative ${CONTAINER} flex min-h-[560px] items-center py-20 md:min-h-[640px]`}>
        <div className="max-w-[560px] rounded-[16px] border border-white/20 bg-white/10 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-xl md:p-10">
          <h2 className="m-0 text-[34px] font-[300] leading-[1.05] tracking-[-0.03em] md:text-[52px]">Bring one process. We&rsquo;ll show you the numbers.</h2>
          <div className="mt-8">
            <Button href={CONTACT_SALES} variant="sun" size="lg" arrow event="contact_sales_clicked" eventProps={{ location: 'home_closing' }}>Book a comparison</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
