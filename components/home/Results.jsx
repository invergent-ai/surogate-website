import Section, { SectionHead } from '@/components/site/Section';
import { WILDCLAW as W } from '@/lib/results';

const US = 'Surogate 3.7 Flash';
const verdict = (n) => (Math.abs(n - W.surogate) <= 0.5 ? 'Tie' : `Ahead by ${(W.surogate - n).toFixed(1)}`);

// One bar per side, both on the same 0 to 100 scale. The card's title names the two models, so a screen reader
// gets each score with its model name.
function Bar({ name, n, tone }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="block h-2 flex-1 bg-white"><span className={`block h-full ${tone}`} style={{ width: `${n}%` }} /></span>
      <span className="w-10 text-right text-[15px] tabular-nums"><span className="sr-only">{name} </span>{n}</span>
    </div>
  );
}

export default function Results() {
  return (
    <Section id="results">
      <SectionHead wide title="Head to head with frontier models." sub="Our model runs on your own servers and scores level with or ahead of each of these on real agent tasks." />
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {W.rows.map((r) => (
          <li key={r.name} className="rounded-xl bg-stone p-5">
            <h3 className="m-0 text-[15px] font-medium leading-[1.4]">{US} vs {r.name}</h3>
            <div className="mt-4 flex flex-col gap-2.5">
              <Bar name={US} n={W.surogate} tone="bg-sun" />
              <Bar name={r.name} n={r.n} tone="bg-ink/70" />
            </div>
            <p className="m-0 mt-4 flex justify-between gap-3 text-[13px] text-ink/55">
              <span>{r.maker}, {r.runs.toLowerCase()}</span>
              <span className="shrink-0 font-medium text-ink">{verdict(r.n)}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
