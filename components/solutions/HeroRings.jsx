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

// Closing bands: the rings rise from inside the band and end above its lower edge, so where the band meets
// the aubergine footer nothing is cut; only the top edge, against the page above, crops them.
export const CLOSING_RINGS = 'right-[-45%] bottom-[6%] h-[150%] md:right-[-8%] md:h-[200%] lg:right-[-2%]';
