import { Check } from 'lucide-react';
import Button from './Button';
import { CONTACT_SALES, SIGN_IN } from '@/lib/site';

const PATHS = [
  { title: 'Build on your own', points: ['Start free, no card', 'Surogate, AI Gateway and engine in one account', 'Docs and Discord when you need them'],
    cta: { label: 'Try for free', href: SIGN_IN, variant: 'primary', event: 'cta_signup_clicked' } },
  { title: 'Work with us', points: ['Deployment in your cloud or on your hardware', 'Custom models trained on your data', 'A partner near you, or our own engineers'],
    cta: { label: 'Contact Sales', href: CONTACT_SALES, variant: 'secondary', event: 'contact_sales_clicked' } },
];

export default function GetStarted({ location }) {
  return (
    <div className="mx-auto grid max-w-[880px] gap-3 md:grid-cols-2">
      {PATHS.map((p) => (
        <div key={p.title} className="flex flex-col rounded-2xl bg-white p-6 md:p-7">
          <h3 className="m-0 text-[18px] font-[500]">{p.title}</h3>
          <ul className="m-0 mt-5 mb-7 flex list-none flex-col gap-2.5 p-0 text-[15px] text-ink/70">
            {p.points.map((x) => <li key={x} className="flex gap-2.5"><Check size={16} className="mt-[3px] shrink-0 text-ink" />{x}</li>)}
          </ul>
          <Button href={p.cta.href} variant={p.cta.variant} size="lg" event={p.cta.event} eventProps={{ location }} className="mt-auto w-full">
            {p.cta.label}
          </Button>
        </div>
      ))}
    </div>
  );
}
