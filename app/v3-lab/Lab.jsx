'use client';

import { useEffect, useState } from 'react';

const PHOTOS = [
  { slug: 'ro-transfagarasan-night-light-trails', name: 'Logistics', line: 'Transfăgărășan' },
  { slug: 'hero-old-town-cec-dome-night', name: 'Banking', line: 'CEC Palace, Bucharest' },
  { slug: 'ro-brasov-black-church-fog', name: 'Public sector', line: 'Brașov' },
  { slug: 'insurance-buc-wet-corner-night', name: 'Insurance', line: 'Bucharest' },
  { slug: 'ro-sibiu-piata-mare-blue-hour', name: 'Legal', line: 'Sibiu' },
  { slug: 'ro-maramures-mocanita-fog', name: 'Energy', line: 'Maramureș' },
];
const src = (slug, layer, ext = 'jpg') => `/v3/lab/${slug}-${layer}.${ext}`;

const LOOKS = [
  { key: 'trace', title: 'A. Gold trace', note: 'The scene is read first: its contours draw out in gold from the centre, then the gold duotone photo rises beneath them.',
    layers: (s) => (<>
      <img src={src(s, 'duo')} alt="" className="lab-duo absolute inset-0 h-full w-full object-cover" />
      <img src={src(s, 'trace', 'png')} alt="" className="lab-trace absolute inset-0 h-full w-full object-cover" />
    </>) },
  { key: 'signal', title: 'B. Gold signal', note: 'A field of gold dots, the picture as data, resolves into the photograph.',
    layers: (s) => (<>
      <img src={src(s, 'warm')} alt="" className="lab-photo absolute inset-0 h-full w-full object-cover" />
      <img src={src(s, 'dots', 'png')} alt="" className="lab-dots absolute inset-0 h-full w-full object-cover" />
    </>) },
  { key: 'hour', title: 'C. Golden hour', note: 'The place starts in a cold blue hour; warm light floods in until its highlights glow gold.',
    layers: (s) => (<>
      <img src={src(s, 'cold')} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <img src={src(s, 'warm')} alt="" className="lab-warm absolute inset-0 h-full w-full object-cover" />
    </>) },
];

function Panel({ look }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((k) => (k + 1) % PHOTOS.length), 8000);
    return () => clearInterval(t);
  }, []);
  const p = PHOTOS[n];
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6">
      <h2 className="m-0 text-[28px] font-[450] tracking-[-0.01em]">{look.title}</h2>
      <p className="m-0 mt-2 max-w-[640px] text-[16px] text-ink/60">{look.note}</p>
      <div key={n} className={`lab lab-v-${look.key} relative mt-6 h-[560px] overflow-hidden rounded-[14px] bg-ink text-white`}>
        <div className="lab-drift absolute inset-0">{look.layers(p.slug)}</div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.1)_0%,rgba(10,10,10,.2)_55%,rgba(10,10,10,.5)_100%)]" />
        <div className="relative flex h-full flex-col items-center px-6 pb-10 text-center">
          <p className="lab-title m-0 my-auto pt-16 text-[56px] font-[300] leading-none tracking-[-0.045em] md:text-[96px]">{p.name}</p>
          <p className="lab-sub m-0 text-[17px] text-white/90">{p.line}</p>
          <span className="lab-sub mt-4 inline-flex h-9 items-center rounded-[6px] bg-white px-4 text-[13px] font-medium text-ink">Explore</span>
        </div>
      </div>
    </section>
  );
}

export default function Lab() {
  return (
    <main className="pb-24">
      <style>{CSS}</style>
      <div className="mx-auto max-w-[1280px] px-4 pt-16 md:px-6">
        <h1 className="m-0 text-[44px] font-[300] tracking-[-0.03em]">Photo looks</h1>
        <p className="m-0 mt-2 text-[16px] text-ink/60">Three directions for our own photo treatment and motion. Each panel cycles six photos from across Romania every 8 seconds; the line under each name is the place.</p>
      </div>
      {LOOKS.map((l) => <Panel key={l.key} look={l} />)}
    </main>
  );
}

const CSS = `
.lab-drift { animation: lab-drift 8s cubic-bezier(.33,0,.2,1) both; }
@keyframes lab-drift { from { transform: scale(1.12); } to { transform: scale(1.03); } }
.lab-title { animation: rise 1100ms var(--ease-out) 900ms both; --y: 22px; }
.lab-sub { animation: rise 1100ms var(--ease-out) 1300ms both; --y: 12px; }

/* A: contours reveal outward from the centre, the duotone rises under them, the lines settle to a faint etch. */
.lab-trace { -webkit-mask: radial-gradient(circle, #000 42%, transparent 58%) center / 0% 0% no-repeat; mask: radial-gradient(circle, #000 42%, transparent 58%) center / 0% 0% no-repeat;
  animation: lab-trace-in 2200ms cubic-bezier(.5,0,.2,1) 150ms both, lab-trace-settle 1600ms var(--ease-out) 2400ms both; }
@keyframes lab-trace-in { to { -webkit-mask-size: 320% 320%; mask-size: 320% 320%; } }
@keyframes lab-trace-settle { to { opacity: .28; } }
.lab-duo { animation: lab-fade 1800ms var(--ease-out) 1700ms both; }
@keyframes lab-fade { from { opacity: 0; } }

/* B: dots come up, the photo resolves through them from soft to sharp, the dots dissolve. */
.lab-dots { animation: lab-dots 3600ms var(--ease-out) both; }
@keyframes lab-dots { 0% { opacity: 0; transform: scale(1.04); } 20% { opacity: 1; } 55% { opacity: 1; transform: none; } 100% { opacity: 0; } }
.lab-photo { animation: lab-resolve 2400ms var(--ease-out) 1300ms both; }
@keyframes lab-resolve { from { opacity: 0; filter: blur(14px) saturate(.6); } to { opacity: 1; filter: none; } }

/* C: warm light floods in from the lower left over the cold picture. */
.lab-warm { -webkit-mask: linear-gradient(60deg, #000 40%, transparent 60%) 100% 0 / 300% 100% no-repeat; mask: linear-gradient(60deg, #000 40%, transparent 60%) 100% 0 / 300% 100% no-repeat;
  animation: lab-dawn 4200ms cubic-bezier(.45,0,.2,1) 500ms both; }
@keyframes lab-dawn { to { -webkit-mask-position: 0% 0; mask-position: 0% 0; } }

@media (prefers-reduced-motion: reduce) { .lab * { animation: none !important; } .lab-trace { opacity: .28; -webkit-mask: none; mask: none; } .lab-dots { opacity: 0; } .lab-warm { -webkit-mask: none; mask: none; } }
`;
