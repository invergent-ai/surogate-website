import { RabbitAvatar } from '@/components/site/Rabbit';
import { VideoFrame } from '@/components/site/ProductMedia';

// The scroller's panels: the studio's own screens, drawn small. Words and numbers come from the agents copy.
const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,.05),0_0_0_1px_rgba(10,10,10,.06)] ${className}`}>{children}</div>
);
const Frame = ({ children }) => <div className="flex h-full w-full items-center justify-center p-5 md:p-10">{children}</div>;

const TABS = [
  ['Identity', 'Who the agent is, how it speaks, what it refuses.'],
  ['Skills', 'Procedures in markdown or drawn on the canvas.'],
  ['Knowledge Bases', 'Your documents as a searchable wiki.'],
  ['Tools', 'MCP servers and Composio toolkits, scanned first.'],
  ['Model', 'Ours, your fine-tunes or any OpenAI-compatible endpoint.'],
  ['Capabilities', 'Browser, Claude Code and Codex, research, schedules.'],
  ['Coding', 'Repositories it can branch and open pull requests on.'],
  ['Governance', 'Allowed tools, approvals and browsing rules.'],
];

export function SetupPanel() {
  return (
    <Frame>
      <Card className="w-full max-w-[460px] overflow-hidden text-[13px]">
        <div className="flex items-center gap-2.5 border-b border-hairline px-4 py-3">
          <RabbitAvatar size={22} />
          <span className="shrink-0 font-medium">Supplier desk</span>
          <span className="ml-auto truncate text-ink/45">Saved, next session uses it</span>
        </div>
        <ul className="m-0 list-none p-0">
          {TABS.map(([t, d], i) => (
            <li key={t} className={`flex items-baseline gap-3 border-t border-hairline px-4 py-2 first:border-t-0 ${i === 1 ? 'bg-white' : ''}`}>
              <span className={`w-[118px] shrink-0 ${i === 1 ? 'font-medium' : ''}`}>{t}</span>
              <span className="min-w-0 truncate text-ink/50">{d}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Frame>
  );
}

// Real footage from the studio, filmed on a demo business, in the same 16:10 window as the hero.
export function LoopPanel({ name, label }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 md:p-5">
      <figure className="m-0 w-full max-w-[640px]">
        <VideoFrame src={`/media/loops/surogate-${name}.mp4`} poster={`/media/loops/surogate-${name}.jpg`} />
        <figcaption className="mt-3 text-[13px] text-ink/50">{label}</figcaption>
      </figure>
    </div>
  );
}

const CHANNELS = ['Web app', 'Website widget', 'API', 'Slack', 'Microsoft Teams', 'WhatsApp', 'Telegram', 'Discord', 'Phone'];
export function ChannelsPanel() {
  return (
    <Frame>
      <div className="grid w-full max-w-[480px] grid-cols-3 gap-2 text-[13px]">
        {CHANNELS.map((c) => <Card key={c} className="flex h-14 items-center justify-center px-2 text-center">{c}</Card>)}
        <p className="col-span-3 m-0 mt-2 text-center text-[12px] text-ink/45">One agent. Same conversations, memory and allowance on each.</p>
      </div>
    </Frame>
  );
}

const MODES = [
  ['/goal', 'Works until a separate evaluator says the goal is met.'],
  ['/mission', 'Splits an objective into tasks for sub-agents.'],
  ['/loop', 'Runs a prompt every few minutes, hours or days.'],
  ['/deep-research', 'Returns a cited report.'],
];
export function LongPanel() {
  return (
    <Frame>
      <div className="w-full max-w-[460px]">
        <Card className="overflow-hidden text-[13px]">
          {MODES.map(([c, d], i) => (
            <div key={c} className={`flex items-baseline gap-3 border-t border-hairline px-4 py-2.5 first:border-t-0 ${i === 0 ? 'bg-white' : ''}`}>
              <code className="w-[112px] shrink-0 font-mono text-[12px]">{c}</code><span className="text-ink/55">{d}</span>
            </div>
          ))}
        </Card>
        <div className="mt-5 px-1 text-[12px] text-ink/55">
          <div className="relative flex justify-between">
            <span aria-hidden="true" className="absolute inset-x-1 top-[5px] h-px bg-ink/15" />
            {[['Day 0', 'Enrolled'], ['Day 1', 'Welcome'], ['Day 3', 'Check-in'], ['Day 7', 'Reminder'], ['Day 8', 'Team alerted']].map(([d, l], i) => (
              <span key={d} className="relative flex flex-col items-center gap-1.5">
                <span className={`h-[11px] w-[11px] rounded-full border-2 border-white ${i === 4 ? 'bg-sun' : 'bg-ink'}`} />
                <span className="font-medium text-ink">{d}</span><span>{l}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

const LOOP = [['Sessions', 'Marked good or bad'], ['Datasets', 'From sessions or synthetic'], ['Training', 'SFT, DPO, GRPO, distillation'], ['Evaluations', 'Benchmarks and A/B runs'], ['Experts', 'Fine-tuned specialists']];
export function ImprovePanel() {
  return (
    <Frame>
      <ol className="m-0 flex w-full max-w-[400px] list-none flex-col gap-0 p-0 text-[13px]">
        {LOOP.map(([t, d], i) => (
          <li key={t} className="flex flex-col items-stretch">
            <Card className="flex items-baseline justify-between gap-4 px-4 py-2.5">
              <span className="font-medium">{t}</span><span className="text-ink/50">{d}</span>
            </Card>
            {i < LOOP.length - 1 && <span aria-hidden="true" className="mx-auto h-3 w-px bg-ink/20" />}
          </li>
        ))}
      </ol>
    </Frame>
  );
}
