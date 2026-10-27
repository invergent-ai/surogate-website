import Rabbit from '../Rabbit';

const PROVIDERS = ['Surogate Spark EU', 'Scaleway', 'Simpleminds EU'];

export default function ApiMock() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 text-[12px]">
      <p className="m-0 rounded-lg bg-white px-3 py-2 font-mono text-ink/80 shadow-[0_0_0_1px_#e4e4e7]">
        POST /v1/chat/completions · deepseek/deepseek-v4.1-flash
      </p>
      <div className="flex items-center gap-2 text-ink/50">
        <Rabbit pose="stream" size={28} className="text-aubergine" />
        <span>routing to the provider that fits</span>
      </div>
      <ul className="m-0 list-none p-0 flex flex-col gap-1.5">
        {PROVIDERS.map((p, i) => (
          <li key={p} className={`flex items-center justify-between rounded-lg px-3 py-2 ${i === 0 ? 'seq2 bg-ink text-white' : 'bg-white text-ink/60 shadow-[0_0_0_1px_#e4e4e7]'}`}>
            {p}<span className={i === 0 ? 'text-sun' : ''}>{i === 0 ? 'chosen' : 'ready'}</span>
          </li>
        ))}
      </ul>
      <p className="seq3 m-0 mt-auto text-ink/70">Streaming the reply…</p>
    </div>
  );
}
