const INCLUDED = [
  'Full agent runtime',
  'Tool use & code execution',
  'Sandboxed shell environments',
  'Real Chromium browser',
  'Persistent workspace storage',
  'Hub access (read public)',
  'API access',
  'Real-time usage dashboard',
];

const WALLET_TOPUPS = [
  { resource: 'Tokens', rate: '$2.42', unit: 'per 1M' },
  { resource: 'Web browsing time', rate: '$0.0484', unit: '/ minute' },
];

const RECURRING_ADDONS = [
  { resource: 'Extra concurrent agent', rate: '+$14.52', unit: '/ month / slot' },
  { resource: 'Extra workspace storage', rate: '+$0.0605', unit: '/ GB / month' },
  { resource: 'Extra hub storage', rate: '+$0.0605', unit: '/ GB / month' },
];

const TOKEN_RANGES = [
  { label: 'A quick question + answer', range: '1–5K' },
  { label: 'Research task with web browsing', range: '20–100K' },
  { label: 'Multi-step coding task', range: '50–500K' },
  { label: 'Full day of heavy agent use', range: '300K–1M+' },
  { label: 'Standard plan covers', range: '10M / mo' },
  { label: 'Pro plan covers', range: '25M / mo' },
  { label: 'Max plan covers', range: '50M / mo' },
];

function SectionHeader({ idx, eyebrow, headline, sub, dark }) {
  const eyebrowCls = dark ? 'text-white/55' : 'text-brand-graphite';
  const numCls = dark ? 'text-brand-yellow' : 'text-brand-orange';
  const titleCls = dark ? 'text-white' : 'text-brand-aubergine';
  const subCls = dark ? 'text-white/72' : 'text-brand-graphite';
  return (
    <div className="mb-10 max-w-[820px]">
      <div className={`font-serif text-[11px] font-semibold uppercase tracking-wider-2 ${eyebrowCls}`}>
        <span className={`font-mono mr-2 font-bold ${numCls}`}>{idx}</span>
        {eyebrow}
      </div>
      <h2 className={`reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[32px] sm:text-[40px] lg:text-[48px] ${titleCls}`}>
        {headline}
      </h2>
      {sub && <p className={`reveal mt-4 text-[15px] leading-[1.6] max-w-[64ch] ${subCls}`}>{sub}</p>}
    </div>
  );
}

function IncludedBlock() {
  return (
    <section data-screen-label="04 Included" className="bg-brand-fog py-20 sm:py-24 lg:py-28">
      <div className="max-w-container mx-auto px-8">
        <SectionHeader
          idx="04"
          eyebrow="Included with every plan"
          headline={
            <>
              The basics,{' '}
              <em className="italic font-medium text-brand-orange">fully baked in</em>.
            </>
          }
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
          {INCLUDED.map((f, i) => (
            <li
              key={f}
              className={`reveal flex gap-3 font-mono text-[13px] leading-[1.55] text-brand-aubergine py-3 border-t border-brand-border ${
                i === 0 ? 'sm:[&:nth-child(2)]:border-t lg:[&:nth-child(2)]:border-t lg:[&:nth-child(3)]:border-t' : ''
              }`}
            >
              <span aria-hidden="true" className="shrink-0 text-brand-orange font-semibold">
                +
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WalletBlock() {
  return (
    <section id="wallets" data-screen-label="05 Wallets" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-container mx-auto px-8">
        <SectionHeader
          idx="05"
          eyebrow="Need more? Top up your wallet"
          headline={
            <>
              Prepaid wallets.{' '}
              <em className="italic font-medium text-brand-orange">No surprise bills</em>.
            </>
          }
          sub="Each consumable resource works like a prepaid wallet. Your plan grants a monthly balance, top-ups add more on demand, usage drains the wallet in real time. When the wallet hits zero, the operation stops — no auto-upgrades, no end-of-month invoices."
        />

        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-brand-border p-8 lg:p-9 flex flex-col gap-5">
            <div>
              <h3 className="font-serif text-[22px] font-semibold tracking-[-0.014em] text-brand-aubergine">
                Wallet top-ups
              </h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-brand-graphite">
                Pay what you want, when you want. The balance never expires until you use it.
              </p>
            </div>
            <table className="w-full border-collapse">
              <tbody>
                {WALLET_TOPUPS.map((o, i) => (
                  <tr
                    key={o.resource}
                    className={`${i === 0 ? 'border-t-2 border-brand-aubergine/20' : 'border-t border-brand-line'} ${
                      i === WALLET_TOPUPS.length - 1 ? 'border-b border-brand-line' : ''
                    }`}
                  >
                    <td className="py-3.5 text-[14px] text-brand-aubergine">{o.resource}</td>
                    <td className="py-3.5 text-right font-mono text-[13.5px] text-brand-graphite whitespace-nowrap">
                      <span className="font-semibold text-brand-orange">{o.rate}</span>{' '}
                      <span>{o.unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-brand-fog border border-brand-border p-8 lg:p-9 flex flex-col gap-5">
            <div>
              <h3 className="font-serif text-[22px] font-semibold tracking-[-0.014em] text-brand-aubergine">
                Recurring add-ons
              </h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-brand-graphite">
                Raise your monthly ceiling for things that aren&apos;t wallet-shaped — storage
                you occupy, slots you reserve.
              </p>
            </div>
            <table className="w-full border-collapse">
              <tbody>
                {RECURRING_ADDONS.map((o, i) => (
                  <tr
                    key={o.resource}
                    className={`${i === 0 ? 'border-t-2 border-brand-aubergine/20' : 'border-t border-brand-line'} ${
                      i === RECURRING_ADDONS.length - 1 ? 'border-b border-brand-line' : ''
                    }`}
                  >
                    <td className="py-3.5 text-[14px] text-brand-aubergine">{o.resource}</td>
                    <td className="py-3.5 text-right font-mono text-[13.5px] text-brand-graphite whitespace-nowrap">
                      <span className="font-semibold text-brand-orange">{o.rate}</span>{' '}
                      <span>{o.unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="reveal mt-10 max-w-[68ch] text-[14px] leading-[1.6] text-brand-graphite">
          The plan-granted portion of each wallet resets to your tier&apos;s amount on every
          billing cycle (lose-it-or-use-it). The top-up portion is cash you paid in — it rolls
          over as long as your account is active.
        </p>
      </div>
    </section>
  );
}

function TokensBlock() {
  return (
    <section data-screen-label="06 Tokens" className="bg-brand-fog py-20 sm:py-24 lg:py-28">
      <div className="max-w-container mx-auto px-8">
        <SectionHeader
          idx="06"
          eyebrow="How tokens work"
          headline={
            <>
              A token is roughly{' '}
              <em className="italic font-medium text-brand-orange">¾ of a word</em>.
            </>
          }
          sub="Each plan includes a generous monthly amount. Most users won't hit the limit on day-to-day work. Here's the rough shape of typical usage. Your dashboard shows live consumption, broken down by agent and task."
        />
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-x-14">
          {TOKEN_RANGES.map((r) => (
            <div
              key={r.label}
              className="flex flex-wrap items-baseline justify-between gap-4 py-4 border-b border-dashed border-brand-border"
            >
              <span className="text-[14px] leading-[1.5] text-brand-graphite">{r.label}</span>
              <span className="font-mono text-[13.5px] font-semibold text-brand-aubergine whitespace-nowrap">
                {r.range}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingDetails() {
  return (
    <>
      <IncludedBlock />
      <WalletBlock />
      <TokensBlock />
    </>
  );
}
