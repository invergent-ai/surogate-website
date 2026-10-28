import { ArrowUpRight } from 'lucide-react';
import Section, { H2 } from '@/components/site/Section';
import Button from '@/components/site/Button';
import { CONTACT_SALES, LINKS } from '@/lib/site';
import { ENGINE } from '@/lib/labs';
import { RATES } from '@/lib/pricing';
import { filmFiles } from '@/lib/films';
import { VideoFrame } from '@/components/site/ProductMedia';
import Page, { Hero, Lead, Facts, UseCases, Closing } from '../Page';
import Scroller from '../Scroller';
import Faq from '../Faq';
import CopyLine from '../CopyLine';
import { HERO_RINGS, BAND_CLIP, BAND_RINGS } from '../rings';
import TrainRings from './Rings';

// The terminal every step replays in: aubergine-black, so even code reads as ours.
function Term({ lines, children }) {
  return (
    <div className="flex h-full w-full flex-col p-5 font-mono text-[12px] leading-[1.75] text-white/85 md:p-8 md:text-[13px]">
      <span aria-hidden="true" className="mb-4 flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-white/15" /><i className="h-2.5 w-2.5 rounded-full bg-white/15" /><i className="h-2.5 w-2.5 rounded-full bg-white/15" /></span>
      <pre className="m-0 overflow-hidden whitespace-pre-wrap !bg-transparent !p-0 font-mono !text-inherit">{lines.map((l, i) => (
        <span key={i} className={`b${Math.min(i + 1, 6)} block ${l.startsWith('$') ? 'text-white' : l.startsWith('#') ? 'text-white/45' : 'text-white/70'}`}>
          {l.startsWith('$') ? <><span className="text-sun">$</span>{l.slice(1)}</> : l || ' '}
        </span>
      ))}</pre>
      {children}
    </div>
  );
}

const TRAIN_YAML = ENGINE.run.train.split('\n\n')[0].split('\n');
const [SFT, ...MERGE] = ENGINE.run.train.split('\n\n')[1].split('\n');
const SERVE = ENGINE.run.serve.split('\n');

// The shape of a falling loss, drawn without numbers: no run's values are claimed here.
function Loss() {
  return (
    <svg viewBox="0 0 400 110" preserveAspectRatio="none" className="mt-auto h-[90px] w-full md:h-[120px]" aria-hidden="true">
      {[30, 60, 90].map((y) => <path key={y} d={`M0 ${y}H400`} stroke="rgba(243,234,216,.07)" />)}
      <path className="mock-draw" d="M0 8C50 12 80 52 130 72S220 92 280 98 360 102 400 103" fill="none" stroke="#ffaf10" strokeWidth="2.5" strokeLinecap="round" pathLength="400" strokeDasharray="400" strokeDashoffset="0" />
    </svg>
  );
}

const trainItems = ENGINE.engines[0].items;
const serveItems = ENGINE.engines[1].items;
const item = (list, name) => list.find(([t]) => t.startsWith(name))[1];

const STEPS = [
  { title: 'Your data in', line: 'One YAML file names the base model, the recipe and your datasets. Python configures it; native C++/CUDA runs it.',
    panel: <Term lines={['# train.yaml', ...TRAIN_YAML.slice(1)]} /> },
  { title: 'Fine-tune, distil or run RL', line: item(trainItems, 'GRPO'),
    points: [item(trainItems, 'LoRA'), item(trainItems, 'Multi-GPU')], panel: <Term lines={[SFT.replace('surogate', '$ surogate')]}><Loss /></Term> },
  { title: 'Train in the precision your cards have', line: item(trainItems, 'Native precision'),
    points: [item(trainItems, 'Memory control')], panel: <Term lines={['# recipe', 'recipe: bf16', 'recipe: fp8-hybrid   # FP8', 'recipe: nvfp4        # Blackwell FP4']} /> },
  { title: 'Merge, then serve on the same engine', line: item(serveItems, 'Familiar APIs'),
    points: [item(serveItems, 'Runtime LoRA'), item(serveItems, 'Native GGUF')], panel: <Term lines={MERGE.map((l) => (l.startsWith('surogate') ? `$ ${l}` : l))} /> },
  { title: 'Answer many users at once', line: item(serveItems, 'Concurrent'),
    points: [item(serveItems, 'Speculative'), item(serveItems, 'Large models')], panel: <Term lines={SERVE.map((l) => (/^(surogate|curl)/.test(l) ? `$ ${l}` : l))} /> },
];

const FACTS = ENGINE.headline.map(({ n, l }) => ({ n, l }));
const GPU = RATES.find((r) => r.what === 'GPU');

// In the words of the solution pages (lib/solutions.js) and the films.
const USES = [
  { market: 'Enterprise', job: 'A model trained on your own chats', line: 'Mark good and bad sessions, train on them, and keep the version that scores best.', href: '/solutions/custom-models/' },
  { market: 'Public sector', job: 'An air-gapped install with your own models', line: 'Train and serve on your GPUs, with no connection out.', href: '/solutions/government/' },
  { market: 'Model providers', job: 'Inference you sell', line: 'Serve your model on the engine, then list it on llm.buzz at your own price.', href: '/gateway/#sell' },
];

function Bench({ title, rows, unit }) {
  const max = Math.max(...rows.map((r) => r.us));
  return (
    <div>
      <h3 className="m-0 text-[15px] font-[500]">{title}</h3>
      <ul className="m-0 mt-5 list-none border-b border-hairline p-0">
        {rows.map((r) => (
          <li key={r.label} className="border-t border-hairline py-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[14px]">{r.label}</span>
              <span className="shrink-0 text-[15px] font-medium tabular-nums">{r.gain} <span className="font-normal text-ink/50">vs. {r.baseName}</span></span>
            </div>
            <div className="mt-3 grid grid-cols-[72px_1fr_auto] items-center gap-x-3 gap-y-1.5 text-[12px] tabular-nums text-ink/55">
              <span>Surogate</span><span className="h-1.5 rounded-full bg-stone"><span className="block h-full rounded-full bg-ink" style={{ width: `${(r.us / max) * 100}%` }} /></span><span>{r.us.toLocaleString('en-US')} {unit}</span>
              <span>{r.baseName}</span><span className="h-1.5 rounded-full bg-stone"><span className="block h-full rounded-full bg-ink/30" style={{ width: `${(r.base / max) * 100}%` }} /></span><span>{r.base.toLocaleString('en-US')} {unit}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const FAQ = [
  ['What can I train with it?', 'Pretraining and full fine-tuning, LoRA and QLoRA, GRPO, DPO and distillation, on one GPU or across nodes. Configuration is Python and YAML; execution is native C++/CUDA.'],
  ['Which GPUs and precisions?', 'BF16, hybrid FP8 and Blackwell NVFP4, with FP8, NVFP4 and NF4 quantised bases for adapters. CPU offload lets you train models larger than your cards.'],
  ['How do I serve the result?', 'With the same engine: surogate serve exposes Chat Completions, Completions, Responses and Messages endpoints, so existing clients connect unchanged. GGUF and Hugging Face checkpoints load natively.'],
  ['How were the benchmarks measured?', 'Each row names its GPU, model, precision and baseline. The full tables are in the engine\'s repository, under docs/reference/benchmarks.md and surogate/serve/BENCHMARKS.md.'],
  ['What is the licence?', 'Apache 2.0.'],
  ['Can you train a model for us?', 'Yes. We train on your data, evaluate it and serve it on your hardware or ours. Contact Sales.'],
];

export default function TrainPage() {
  return (
    <Page>
      <Hero name="Surogate Train" title="Train and serve your own model."
        sub="One open-source engine to fine-tune, run RL and serve the result over the APIs your code already uses."
        actions={<>
          <div className="w-full max-w-[780px]"><CopyLine text={ENGINE.install} event="install_copied" location="train_hero" /></div>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-6 text-[14px]">
            <a href={LINKS.docs} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center gap-1 font-medium !text-ink no-underline">Docs <ArrowUpRight size={14} className="nudge" /></a>
            <a href={ENGINE.repo} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center gap-1 font-medium !text-ink no-underline">GitHub <ArrowUpRight size={14} className="nudge" /></a>
            <span className="text-ink/55">Apache 2.0</span>
          </div>
        </>}
        rings={<TrainRings className={HERO_RINGS} />}>
        <div className="mx-auto max-w-[880px]">
          <VideoFrame src={filmFiles('vandijk-ml-scoreboard').loop} poster={filmFiles('vandijk-ml-scoreboard').poster} />
          <p className="m-0 mt-3 text-left text-[13px] text-ink/50 md:mt-4">A team scores its fine-tunes against a big model, on questions the training chats never asked. Filmed on a demo business.</p>
        </div>
      </Hero>

      <Section id="uses">
        <Lead title="Your model, for your work." sub="When a general model is not enough, or may not leave your network." />
        <UseCases items={USES} />
      </Section>

      <Section id="how">
        <Lead title="From your data to a served model." sub="Five steps, one engine, the same terminal." />
        <Scroller steps={STEPS} dark={false} panelClass="!bg-night" />
      </Section>

      <Section tone="grey" inner="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className={H2.list}>Prefer a window to a terminal?</h2>
          <p className="mt-3 mb-0 max-w-[56ch] text-[16px] leading-[1.6] text-ink/65">Jackalope is the desktop app for the engine. Pick a model, pick a dataset, click your GPUs, hit Launch, and watch the loss fall, live. Linux, macOS and Windows.</p>
        </div>
        <Button href={LINKS.jackalope} external size="lg" arrow event="jackalope_clicked" eventProps={{ location: 'train_jackalope' }}>Download Jackalope</Button>
      </Section>

      <Section id="benchmarks">
        <Lead title="Measured against the tools you would use instead." sub="Tokens a second, each row against the baseline it names." />
        <div className="mb-14 md:mb-16"><Facts items={FACTS} /></div>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Bench title="Training" rows={ENGINE.training} unit="tok/s" />
          <Bench title="Serving, on RTX 5090s" rows={ENGINE.serving} unit="tok/s" />
        </div>
        <p className="m-0 mt-6 text-[13px] text-ink/50">From the engine's README and its <a href={ENGINE.links[1].href} target="_blank" rel="noopener noreferrer" className="!text-ink/70 underline decoration-ink/25 underline-offset-4">training</a> and <a href={ENGINE.links[2].href} target="_blank" rel="noopener noreferrer" className="!text-ink/70 underline decoration-ink/25 underline-offset-4">serving</a> benchmarks.</p>
      </Section>

      <Section tone="aubergine" id="pricing" className="relative isolate overflow-hidden" inner="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className={BAND_CLIP}><TrainRings dark className={BAND_RINGS} /></div>
        <div>
          <h2 className={H2.feature}>Free to run. Or we train it for you.</h2>
          <p className="mt-4 mb-0 max-w-[52ch] text-[16px] leading-[1.6] text-white/70">The engine is Apache 2.0, free on your own GPUs. On our cloud a GPU costs {GPU.price} {GPU.per}. Or bring your data, and the team that builds the engine trains, evaluates and serves the model.</p>
          <p className="mt-5 mb-0 text-[14px] text-white/60"><a href="/pricing/#enterprise" className="!text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">See pricing</a></p>
        </div>
        <Button href={CONTACT_SALES} variant="sun" size="lg" arrow event="contact_sales_clicked" eventProps={{ location: 'train_custom' }}>Contact Sales</Button>
      </Section>

      <Faq items={FAQ} />

      <Closing title="Install the engine." line="One line installs it. Docs and examples are on GitHub."
        action={<div className="w-full max-w-[780px]"><CopyLine text={ENGINE.install} event="install_copied" location="train_closing" /></div>} />
    </Page>
  );
}
