import { Stethoscope, Scale, Calculator, Briefcase, Sparkles, Check } from 'lucide-react';

const ROLES = [
  { label: 'Doctors', icon: Stethoscope },
  { label: 'Lawyers', icon: Scale },
  { label: 'Accountants', icon: Calculator },
  { label: 'Consultants', icon: Briefcase },
  { label: 'Coaches', icon: Sparkles },
];

const FOUNDING_PERKS = [
  '95% revenue share, locked forever',
  'Free first agent build',
  'Compliance-ready templates',
  'WhatsApp community access',
];

const FOUNDING_TERMS = [
  'No credit card.',
  'No commitment.',
  'Confirm spot within 60 seconds.',
  'Continuous Online Building support',
];

const MUTED = '#A3A29F';

function CheckItem({ children }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full shrink-0"
        style={{
          background: 'rgba(255, 176, 15, 0.1)',
          border: '1px solid rgba(255, 176, 15, 0.3)',
        }}
      >
        <Check size={14} className="text-brand-aubergine" />
      </span>
      <span className="font-sans text-[15px] text-brand-graphite">{children}</span>
    </li>
  );
}

export default function LaunchAgentGrid() {
  return (
    <section className="bg-brand-paper pt-0 pb-6 lg:pb-8">
      <div className="w-full px-8 lg:pl-24 xl:pl-32 lg:pr-[6%] xl:pr-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div
            className="reveal rounded-[10px] p-8"
            style={{
              background: 'linear-gradient(180deg, #FFFAF2 0%, #FFFFFF 100%)',
              border: '1px solid #FFB00F',
              boxShadow: '0px 9px 10px rgba(255, 176, 15, 0.1)',
            }}
          >
            <div className="mb-7 min-h-[96px] lg:min-h-[128px]">
              <div className="font-serif font-bold text-[40px] text-brand-orange leading-none mb-2">
                100
              </div>
              <div className="font-serif leading-[1.15] text-[24px] text-brand-aubergine mb-2">
                Autonomous Agent Templates
              </div>
              <div className="font-serif leading-[1.25] text-[15px] text-brand-orange">
                Built from real high-value professional expertise
              </div>
            </div>

            <ul className="flex flex-col gap-2 mb-7">
              {ROLES.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                    style={{
                      background: 'rgba(255, 176, 15, 0.1)',
                      border: '1px solid rgba(255, 176, 15, 0.3)',
                    }}
                  >
                    <Icon size={18} className="text-brand-aubergine" />
                  </span>
                  <span className="font-sans text-[15px] text-brand-graphite">{label}</span>
                </li>
              ))}
            </ul>

            <p className="font-sans text-[14px]" style={{ color: MUTED }}>
              + dozens of more high value skills
            </p>
          </div>

          <div
            className="reveal relative overflow-hidden lg:col-span-2 rounded-[10px] py-8 px-10 lg:px-14"
            style={{ background: '#FFFFFF', border: '1px solid rgba(85, 85, 85, 0.2)' }}
          >
            <img
              src="/surogate_bg.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none select-none absolute bottom-0 right-1/2 translate-x-1/2 translate-y-[47%] w-[170%] h-auto opacity-70"
              style={{ aspectRatio: '702 / 997' }}
            />

            <div className="relative mb-7 min-h-[96px] lg:min-h-[128px]">
              <div className="font-serif font-bold text-[40px] text-brand-orange leading-none mb-2">
                500
              </div>
              <div className="font-serif leading-[1.15] text-[24px] text-brand-aubergine">
                Founding Community spots
              </div>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <ul className="flex flex-col gap-4">
                {FOUNDING_PERKS.map((perk) => (
                  <CheckItem key={perk}>{perk}</CheckItem>
                ))}
              </ul>
              <ul className="flex flex-col gap-4 rounded-[10px] p-5 bg-brand-paper">
                {FOUNDING_TERMS.map((term) => (
                  <CheckItem key={term}>{term}</CheckItem>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
