import Transit from '@/components/site/Rings';

// The brand rings as a quiet hero background, faded out before they reach the copy (.hero-rings in app/v2.css).
// Each page family places them its own way through `at`. Phones have no room beside the headline.
export default function HeroRings({ at }) {
  return (
    <div aria-hidden="true" className="hero-rings pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
      <Transit className={`absolute w-auto ${at}`} />
    </div>
  );
}

