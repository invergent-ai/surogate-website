'use client';

import { useRef, useState } from 'react';

const TABS = [
  { id: 'personal', label: 'Personal Use', count: '15' },
  { id: 'passive', label: 'Sell to Others / Passive Income', count: '07' },
  { id: 'developers', label: 'Developers', count: '06' },
];

const TAB_INTRO = {
  personal:
    'Your Surogate agent works for you. It runs in the cloud, monitors your workflows, prepares your deliverables, and reports back - so you return to results, not a to-do list.',
  passive:
    "Your Surogate agent doesn't have to work just for you. Build one for a business, deploy it to twenty of them. Each agent runs their operations 24 hours a day. You collect monthly.",
  developers:
    'Bring your own models, your own compute, your own data. Train expert models (SLMs) to increase accuracy, evaluate, and serve them on the same platform that runs your agents. One stack, one factory.',
};

const PERSONAL_TILES = [
  {
    kind: 'Content & Media',
    title: 'Social Media Manager',
    bullets: [
      "Checks content calendar for missing videos - you film only what's needed",
      "Monitors post performance & trends, flags what's working this week",
      'Sorts raw files, drafts scripts from briefs, sends client PDF reports',
    ],
  },
  {
    kind: 'Content & Media',
    title: 'Copywriter / Content Writer',
    bullets: [
      'Researches briefs overnight, delivers a structured outline in the morning',
      "Monitors your client's niche: growing topics, rising questions, competitor posts",
      'Generates title variants, meta description, and social teaser from every article',
    ],
  },
  {
    kind: 'Content & Media',
    title: 'Graphic Designer',
    bullets: [
      'Consolidates feedback from email, Slack, and Figma into one clear revision brief',
      "Prioritizes your projects each morning: what's due, what's blocked, what's waiting",
      'Sorts and archives deliverables by client / project / version after every send',
    ],
  },
  {
    kind: 'Video & Audio',
    title: 'Video Creator',
    bullets: [
      'Monitors trending topics in your niche weekly, delivers 5 video ideas with rationale',
      'Generates YouTube descriptions, tags, thumbnail concepts, and Shorts/Reels plan from each video',
      'Manages your production pipeline: filming → editing → scheduled → published',
    ],
  },
  {
    kind: 'Marketing & Strategy',
    title: 'Communication & Brand Strategy',
    bullets: [
      'Monitors your brand mentions, competitor news, and industry trends',
      'Drafts insights and recommended actions - from content ideas to partnership opportunities to crisis flags',
      'Competitor analysis and SWOT',
    ],
  },
  {
    kind: 'Video & Audio',
    title: 'Journalist / Reporter',
    bullets: [
      'Monitors your beat and delivers a morning briefing of story angles with source context',
      'Researches sources before every interview - past statements and potential contradictions',
      'Structures an article draft with quotes and argument flow from your interview transcript',
    ],
  },
  {
    kind: 'Advisory',
    title: 'Consultant / Coach',
    bullets: [
      'Prepares a full briefing before every call: past notes, action items, progress since last session',
      'Monitors client homework and flags problems before the call - not during it',
      'Drafts a personalized follow-up after each session with recap and next steps',
    ],
  },
  {
    kind: 'Sales & Biz Dev',
    title: 'Sales / Business Development',
    bullets: [
      'Researches each prospect before calls - company context, recent news, what would resonate',
      'Drafts personalized cold emails per prospect with a specific reference each time - not blasts',
      "Prioritizes your CRM each morning: who to contact, what's stuck, what deal has gone cold",
    ],
  },
  {
    kind: 'Recruitment',
    title: 'Freelance Recruiter / HR',
    bullets: [
      'Filters CVs against the job description and ranks the shortlist with justification for each candidate',
      'Monitors LinkedIn for passive candidates matching your profile, alerts when someone is relevant',
      'Prepares interview guides for the interviewer and a context doc for the candidate - automatically',
    ],
  },
  {
    kind: 'Real Estate',
    title: 'Real Estate Agent',
    bullets: [
      "Monitors new listings daily and sends only the ones matching each client's criteria",
      'Prepares property comparison documents before every viewing - ready when you arrive',
      "Manages lead pipeline: who's seen what, who hasn't responded, who's ready to make an offer",
    ],
  },
  {
    kind: 'Finance',
    title: 'Financial Advisor / Planner',
    bullets: [
      "Monitors market news relevant to each client's portfolio and prepares a morning briefing",
      'Prepares agenda and context before every client meeting - what changed since last time',
      'Drafts a personalized review report per client - never the same template twice',
    ],
  },
  {
    kind: 'Creative',
    title: 'Photographer',
    bullets: [
      'Sorts and renames RAW files after every shoot - folder structure ready on import',
      'Consolidates all client feedback into one clear revision document',
      'Prepares delivery emails with gallery link, download instructions, and usage rights per client',
    ],
  },
  {
    kind: 'Development',
    title: 'Freelance Developer',
    bullets: [
      'Monitors GitHub issues and PRs, delivers a prioritized morning list with context',
      'Researches technical documentation overnight and prepares implementation notes for the next day',
      'Drafts client status updates and prepares the monthly invoicing summary from tracked time',
    ],
  },
  {
    kind: 'E-commerce',
    title: 'E-commerce Seller',
    bullets: [
      'Monitors competitor prices daily and alerts when you need to adjust',
      'Tracks stock levels and sends reorder alerts before you run out',
      'Monitors negative reviews and drafts a response for each one - ready for your approval',
    ],
  },
  {
    kind: 'Events',
    title: 'Event Planner',
    bullets: [
      'Tracks all supplier responses and flags missing confirmations with days remaining',
      'Prepares run-of-show and timeline documents from your brief',
      'Monitors budget vs. actuals and alerts when any category approaches its limit',
    ],
  },
];

const PASSIVE_AGENTS = [
  {
    num: '01',
    title: 'Booking & Reception Agent',
    replaces: 'a full-time receptionist or appointment coordinator',
    bullets: [
      'Medical & dental clinics - answers calls, books appointments, sends reminders, handles reschedules',
      "Beauty salons & spas - manages bookings, knows which staff does what and when they're free",
      'Fitness & yoga studios - manages class spots, waitlists, membership renewals, pre-class reminders',
      'Veterinary practices - triages urgency, books appropriately, sends vaccine reminder schedules',
      'Tutoring centers & individual tutors - manages student schedules, sends Zoom links and session materials',
    ],
    price: '€150 – €400',
  },
  {
    num: '02',
    title: 'Customer Support Agent',
    replaces: 'a part-time support rep or live chat operator',
    bullets: [
      'Small e-commerce stores - handles 80% of support tickets: order status, returns, shipping, product questions',
      'Restaurants & cafés - takes reservations, answers menu and allergy questions, manages WhatsApp takeaway orders',
      'Small hotels & short-term rentals - handles pre-booking questions, check-in instructions, in-stay requests',
      "Small SaaS apps - answers tier-1 support questions from the knowledge base, escalates what it can't resolve",
    ],
    price: '€200 – €450',
  },
  {
    num: '03',
    title: 'Sales Qualification Agent',
    replaces: 'an SDR, BDR, or the business owner spending hours qualifying poor-fit leads',
    bullets: [
      'Real estate agencies - qualifies all inbound leads, ranks them hot/warm/cold, books viewings for hot leads only',
      'Insurance brokers - collects the information needed for a quote before the broker speaks to the client',
      'Law firms & notaries - takes the initial case inquiry, assesses fit, collects documents, books the consultation',
      'Freelancers & creative agencies - qualifies briefs by budget/timeline/scope, books discovery calls with serious clients only',
    ],
    price: '€250 – €500',
  },
  {
    num: '04',
    title: 'HR & Recruitment Agent',
    replaces: 'the first round of screening that consumes dozens of recruiter hours per role',
    bullets: [
      'Companies hiring frequently - runs structured text or voice screening interviews, produces a ranked candidate report',
      'Staffing agencies - handles first-contact qualification and candidate ranking across multiple open roles simultaneously',
      'HR departments without dedicated staff - guides new hires through onboarding docs, policies, access setup, and FAQs',
    ],
    price: '€300 – €600',
  },
  {
    num: '05',
    title: 'Property Management Agent',
    replaces: 'a part-time property manager or building administrator',
    bullets: [
      'Rental property owners - handles all tenant requests: repairs, questions, complaints; prioritizes urgency; coordinates with contractors',
      'Building associations - collects resident complaints, manages maintenance schedules, sends required notices, tracks fee payments',
    ],
    price: '€200 – €400',
  },
  {
    num: '06',
    title: 'Research & Intelligence as a Service',
    replaces: 'a junior analyst or an expensive sector-monitoring subscription',
    bullets: [
      'Competitive monitoring - monitors prices, messaging, reviews, and news in a sector daily; you sell access to the report to multiple clients',
      'Due diligence for investors - researches a company or individual: public presence, legal history, business track record; delivers structured report in hours',
      'Online reputation monitoring - tracks what is said about a brand or person across all channels; alerts immediately when something negative appears',
    ],
    price: '€300 – €800',
  },
];

const DEVELOPER_TILES = [
  {
    kind: 'Custom Models',
    title: 'Deploy any model. Open weights, fine-tuned, or your own.',
    lateral: true,
    body: 'Serve open-source LLMs, your fine-tuned checkpoints, or proprietary models through one unified endpoint. The platform handles GPU scheduling, autoscaling, and inference - your agents just call them.',
    icon: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 2v3M12 2v3M15 2v3M9 19v3M12 19v3M15 19v3M2 9h3M2 12h3M2 15h3M19 9h3M19 12h3M19 15h3" />
      </>
    ),
  },
  {
    kind: 'Compute',
    title: 'Bring your own cloud. Use the GPUs you already pay for.',
    body: 'Connect AWS, GCP, Azure, Nebius, Lambda, RunPod, Modal, or your on-prem cluster. The platform schedules training and serving across whatever capacity you have - no migration, no lock-in.',
    icon: (
      <>
        <path d="M7 18h10a4 4 0 0 0 0-8 5 5 0 0 0-9.5-1A4 4 0 0 0 7 18z" />
        <path d="M12 12v4M10 14h4" />
      </>
    ),
  },
  {
    kind: 'Training',
    title: 'SFT and RL pipelines. From dataset to deployed model.',
    body: 'Supervised fine-tuning and reinforcement learning - LoRA, full fine-tunes, GRPO, DPO. Launch a run, watch loss curves, register the checkpoint, serve it. The same control plane as your agents.',
    icon: (
      <>
        <polyline points="3 17 8 11 12 14 21 5" />
        <polyline points="15 5 21 5 21 11" />
        <path d="M3 21h18" />
      </>
    ),
  },
  {
    kind: 'Datasets',
    title: 'Build datasets. Generate synthetic data at scale.',
    lateral: true,
    body: 'Version datasets in Surogate Hub. Generate synthetic training data from teacher models, agent traces, or your own corpus - with quality filters, deduplication, and lineage tracked end-to-end.',
    icon: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="2.5" />
        <path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
        <path d="M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
      </>
    ),
  },
  {
    kind: 'Evaluation',
    title: 'Measure what matters. Before and after every change.',
    body: 'Run evaluations against curated benchmarks or your own task suites. Compare models, prompts, and fine-tunes side by side - with full traces, pass rates, and regressions surfaced automatically.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 12l5-3" />
        <path d="M8 16l2-2M14 16l2-2" />
      </>
    ),
  },
  {
    kind: 'Performance',
    title: 'The fastest training stack on the market.',
    body: 'FP8 and FP4 mixed-precision training, fused kernels, FlashAttention, and gradient checkpointing - tuned to extract every last token-per-second from your hardware. Same model, half the wall-clock, lower bill.',
    icon: (
      <>
        <path d="M13 2 4 13h7l-1 9 9-11h-7l1-9z" />
      </>
    ),
  },
];

const INCOME_EXAMPLES = [
  {
    sector: 'Healthcare & Wellness',
    title: 'The Medical Receptionist Agent',
    problem:
      'Small clinics lose patients every day because no one answers the phone in time - or outside hours. A front desk employee costs €1,500–3,000/month, works limited hours, and still misses calls.',
    does: "The Surogate agent answers every call and WhatsApp message regardless of the time. It checks real-time availability in Google Calendar or the clinic's scheduling software, books the appointment, sends a confirmation and a 24-hour reminder, handles reschedules and cancellations, and answers FAQs about pricing, location, and insurance. It escalates to the doctor only when a situation genuinely requires a human decision.",
    model:
      'You build the template once and customize it per clinic in 2–3 hours: phone number, calendar access, services offered, pricing, tone. You deploy to 15–20 clinics at €250–300/month each. The agent runs 24/7. You monitor via dashboard.',
    math: '15 clinics × €275/month = €4,125/month.',
    tagline: 'Built once. Running without you.',
  },
  {
    sector: 'Local Services & Trades',
    title: 'The Field Services Agent',
    problem:
      "An independent plumber, electrician, or contractor loses jobs every day they're on-site - because no one picks up when a new client calls. The next person on the list gets the job. A part-time receptionist still isn't available at 9pm on a Sunday.",
    does: 'The Surogate agent answers every call and message immediately. It asks 4–5 qualification questions - what’s the problem, where, when, budget - checks calendar availability, books the site visit, and sends a confirmation. It follows up on every open quote at 48 hours if no response. Six months after a completed job, it sends a maintenance check-in message automatically.',
    model:
      'You build the template once, customize per contractor in 2–3 hours (phone number, service area, calendar, pricing range). You deploy to 20 independent tradespeople at €300/month each. They stop losing jobs. You collect monthly.',
    math: '20 clients × €300/month = €6,000/month.',
    tagline: 'Monitored in under an hour per week.',
  },
  {
    sector: 'Short-Term Rentals & Property',
    title: 'The Short-Term Rental Agent',
    problem:
      "A property owner with 3–5 apartments on Airbnb or Booking spends 2–3 hours a day answering identical messages. At scale, it's unmanageable without a property manager who takes 20–25% of revenue.",
    does: 'The Surogate agent answers all messages on any platform within seconds, 24/7. It confirms availability, books the reservation, sends check-in instructions 24 hours before arrival including door code and house rules, answers all in-stay operational questions, handles checkout instructions, requests reviews, and monitors competitor pricing to alert when rates should be adjusted.',
    model:
      'You deploy one agent per property owner with 3–10 units at €400–600/month. The owner eliminates the operational burden without paying a 25% management cut. You manage 15–20 such owners from a single dashboard.',
    math: '15 owners × €450/month = €6,750/month.',
    tagline: 'One build. Fifteen deployments.',
  },
  {
    sector: 'Online Communities & Courses',
    title: 'The Community Management Agent',
    problem:
      'Anyone running an online community knows that 80% of member questions are identical, new members feel ignored in the first 48 hours and leave, and manual moderation consumes hours every day.',
    does: 'When someone joins, the Surogate agent sends a personalized welcome with their name and a getting-started guide. It monitors posts with no replies for 4–6 hours and responds from the knowledge base. It answers FAQs without escalating to the founder. It sends a weekly digest of the most active discussions. After 30 days of inactivity, it sends a personalized re-engagement message.',
    model:
      'You sell this agent as a service to course creators, coaches, and professional associations at €250–500/month per community. Or you build it as a productized subscription - a Community Agent - and scale to hundreds of clients on the same template.',
    math: '20 communities × €350/month = €7,000/month.',
    tagline: 'Or scale further as a productized service.',
  },
];

function PersonalTile({ tile }) {
  return (
    <article className="reveal bg-brand-aubergine-2 p-7 lg:px-7 lg:py-8 flex flex-col gap-4 min-h-[260px] relative transition-colors group/tile border-l-2 border-brand-orange/0 hover:border-brand-orange">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider-2 text-brand-orange">
        {tile.kind}
      </span>
      <h3 className="m-0 font-serif text-[22px] font-semibold leading-[1.18] tracking-[-0.014em] text-white">
        {tile.title}
      </h3>
      <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
        {tile.bullets.map((b, i) => (
          <li key={i} className="text-[13.5px] leading-[1.55] text-white/72 flex gap-2">
            <span aria-hidden="true" className="text-brand-orange/80 select-none">
              →
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PassiveAgentCard({ agent }) {
  return (
    <article className="reveal bg-brand-aubergine-2 p-7 lg:px-7 lg:py-8 flex flex-col gap-4 min-h-[260px] relative transition-colors group/tile border-l-2 border-brand-orange/0 hover:border-brand-orange">
      <header className="flex items-baseline gap-3 flex-wrap">
        <span className="font-mono text-[11px] font-semibold tracking-wider-2 text-brand-orange">
          {agent.num}
        </span>
        <h3 className="m-0 font-serif text-[22px] sm:text-[24px] font-semibold leading-[1.18] tracking-[-0.014em] text-white">
          {agent.title}
        </h3>
      </header>
      <p className="m-0 italic text-[13.5px] leading-[1.55] text-white/55">
        Replaces: {agent.replaces}
      </p>
      <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
        {agent.bullets.map((b, i) => (
          <li key={i} className="text-[14px] leading-[1.55] text-white/78 flex gap-2.5">
            <span aria-hidden="true" className="text-brand-orange/80 select-none mt-[1px]">
              ·
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2 inline-flex items-baseline gap-2 self-start border-t border-white/10 pt-4">
        <span className="font-mono text-[11px] uppercase tracking-wider-2 text-white/55">
          Income per client
        </span>
        <span className="font-mono text-[14px] font-semibold text-emerald-400">
          {agent.price} / client / month
        </span>
      </div>
    </article>
  );
}

function DeveloperTile({ tile }) {
  return (
    <article className="reveal bg-brand-aubergine-2 p-7 lg:px-7 lg:py-8 flex flex-col gap-4 min-h-[260px] relative transition-colors group/tile border-l-2 border-brand-orange/0 hover:border-brand-orange">
      <header className="flex justify-between items-start gap-4">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider-2 text-brand-orange">
          {tile.kind}
        </span>
        <span className="text-white/55 group-hover/tile:text-brand-orange transition-colors">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            className="w-[22px] h-[22px]"
          >
            {tile.icon}
          </svg>
        </span>
      </header>
      <h3 className="m-0 font-serif text-[22px] sm:text-[24px] font-semibold leading-[1.18] tracking-[-0.014em] text-white">
        {tile.title}
      </h3>
      <p className="m-0 text-[14px] leading-[1.55] text-white/78">{tile.body}</p>
    </article>
  );
}

function IncomeExample({ ex, index }) {
  const hairlineClass =
    index < 2
      ? 'shadow-[inset_0.5px_0_0_0_rgba(255,175,16,0.25),inset_0_-0.5px_0_0_rgba(255,175,16,0.25)]'
      : index === 2
        ? 'shadow-[inset_0.5px_0_0_0_rgba(255,175,16,0.25),inset_0_-0.5px_0_0_rgba(255,175,16,0.25)] lg:shadow-[inset_0.5px_0_0_0_rgba(255,175,16,0.25)]'
        : 'shadow-[inset_0.5px_0_0_0_rgba(255,175,16,0.25)]';

  return (
    <article
      className={`bg-brand-aubergine text-white p-7 lg:p-9 flex flex-col gap-5 min-h-[260px] relative ${hairlineClass}`}
    >
      <div className="font-mono text-[10px] font-semibold uppercase tracking-wider-2 text-brand-orange">
        {ex.sector}
      </div>
      <h3 className="m-0 font-serif text-[26px] sm:text-[28px] font-semibold leading-[1.15] tracking-[-0.014em] text-white">
        {ex.title}
      </h3>

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider-2 text-brand-steel">
          The Problem
        </span>
        <p className="m-0 text-[14.5px] leading-[1.6] text-white">{ex.problem}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider-2 text-brand-steel">
          What The Agent Does
        </span>
        <p className="m-0 text-[14.5px] leading-[1.6] text-white">{ex.does}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider-2 text-brand-steel">
          Your Business Model
        </span>
        <p className="m-0 text-[14.5px] leading-[1.6] text-white">{ex.model}</p>
      </div>

      <div className="mt-1 pt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[14px] font-semibold text-emerald-400">{ex.math}</span>
        <span className="text-[13.5px] text-white">{ex.tagline}</span>
      </div>
    </article>
  );
}

export default function UseCases() {
  const [active, setActive] = useState('personal');
  const [examplesOpen, setExamplesOpen] = useState(false);
  const tabRefs = useRef([]);

  const onKey = (e, idx) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const delta = e.key === 'ArrowRight' ? 1 : -1;
    const next = (idx + delta + TABS.length) % TABS.length;
    tabRefs.current[next]?.focus();
    setActive(TABS[next].id);
  };

  return (
    <>
      <section
        id="usecases"
        className="relative overflow-hidden bg-brand-aubergine text-white py-20 sm:py-24 lg:py-32"
      >
        <div className="absolute inset-0 bg-evening-glow pointer-events-none" />
        <div className="relative max-w-container mx-auto px-8">
          <div className="mb-12 max-w-[820px]">
            <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[56px] text-white">
              What can Surogate <em className="italic font-medium">do for you?</em>
            </h2>
            <p className="reveal mt-5 text-[15.5px] leading-[1.6] text-white/72 max-w-[60ch]">
              Each tab contains Surogate agent use-cases.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Use cases by audience"
            className="flex items-stretch justify-start border-b border-white/10 mb-10 flex-wrap"
          >
            {TABS.map((t, i) => {
              const on = active === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  id={`tab-${t.id}`}
                  role="tab"
                  aria-selected={on}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  type="button"
                  className={`relative flex w-full sm:w-auto sm:mr-8 items-baseline justify-start gap-2 border-0 bg-transparent px-1 pt-4 pb-[18px] text-left font-serif text-[13px] font-semibold uppercase tracking-wider-2 cursor-pointer transition-colors ${
                    on ? 'text-white' : 'text-white/55 hover:text-white/80'
                  }`}
                >
                  {t.label}
                  <span
                    className={`font-mono text-[10px] font-medium tracking-[0.04em] ${
                      on ? 'text-brand-orange' : 'text-white/40'
                    }`}
                  >
                    {t.count}
                  </span>
                  {on && (
                    <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-brand-orange" />
                  )}
                </button>
              );
            })}
          </div>

          {TABS.map((t) => (
            <div
              key={t.id}
              id={`panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${t.id}`}
              hidden={active !== t.id}
            >
              <p className="reveal text-[15px] leading-[1.6] text-white/72 max-w-[72ch] mb-8">
                {TAB_INTRO[t.id]}
              </p>

              {t.id === 'personal' && (
                <div className="grid gap-px bg-white/10 border border-white/10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {PERSONAL_TILES.map((tile) => (
                    <PersonalTile key={tile.title} tile={tile} />
                  ))}
                </div>
              )}

              {t.id === 'passive' && (
                <div className="grid gap-px bg-white/10 border border-white/10 grid-cols-1 md:grid-cols-2">
                  {PASSIVE_AGENTS.map((a) => (
                    <PassiveAgentCard key={a.num} agent={a} />
                  ))}
                </div>
              )}

              {t.id === 'developers' && (
                <div className="grid gap-px bg-white/10 border border-white/10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {DEVELOPER_TILES.map((tile) => (
                    <DeveloperTile key={tile.kind} tile={tile} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section
        id="multiply-income"
        data-screen-label="04b Multiply income"
        className="relative overflow-hidden bg-grad-sun-horiz py-20 sm:py-24 lg:py-28"
      >
        <div className="relative max-w-container mx-auto px-8">
          <div className="mb-12 max-w-[820px]">
            <h2 className="reveal mt-3.5 font-serif font-semibold leading-[1.02] tracking-hl-tight text-[36px] sm:text-[48px] lg:text-[60px] text-brand-aubergine">
              Multiply your income.
              <br />
              <span className="text-brand-wine italic font-medium">Not just your output.</span>
            </h2>

            <div className="reveal mt-8 bg-brand-aubergine border-l-2 border-brand-wine px-7 py-6">
              <p className="m-0 font-serif text-[20px] sm:text-[22px] font-semibold leading-[1.25] text-brand-orange">
                Build it once. Deploy it for your clients. Earn passive income.
              </p>
              <p className="mt-3 mb-0 text-[14.5px] leading-[1.6] text-white">
                A Surogate agent you build for a client runs their business - answers their calls,
                books their appointments, qualifies their leads - 24 hours a day. They pay you a
                monthly fee. You monitor in 30 minutes a week. That&apos;s not a side project.
                That&apos;s a business.
              </p>
            </div>

            <p className="reveal mt-8 text-[15.5px] leading-[1.65] text-brand-aubergine max-w-[68ch]">
              You build a Surogate agent template for a specific niche - a medical receptionist, a
              property manager, a sales qualifier. You deploy it to 15–20 businesses in that niche.
              Each one pays you a monthly fee. The agent runs their operations around the clock.
              You check the dashboard once a week. This is an agency without employees. A SaaS
              without code. And it&apos;s achievable by anyone who understands their own domain.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setExamplesOpen((o) => !o)}
            aria-expanded={examplesOpen}
            aria-controls="income-examples-grid"
            className="mb-1 w-full flex items-center justify-between gap-6 bg-brand-aubergine border-l-2 border-brand-orange px-7 py-5 cursor-pointer hover:bg-brand-aubergine-2 transition-colors text-left group"
          >
            <span className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider-2 text-brand-orange">
                Four real examples
              </span>
              <span className="font-serif text-[18px] sm:text-[20px] font-semibold leading-[1.25] text-white">
                {examplesOpen
                  ? 'Hide the breakdowns'
                  : 'See the niches, numbers, and business models'}
              </span>
            </span>
            <span
              aria-hidden="true"
              className={`flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-orange/15 text-brand-orange text-[20px] leading-none transition-transform duration-200 group-hover:bg-brand-orange/25 ${examplesOpen ? 'rotate-180' : ''}`}
            >
              ▾
            </span>
          </button>

          {examplesOpen && (
            <div id="income-examples-grid" className="grid grid-cols-1 lg:grid-cols-2">
              {INCOME_EXAMPLES.map((ex, i) => (
                <IncomeExample key={ex.title} ex={ex} index={i} />
              ))}
            </div>
          )}

          <div className="reveal mt-16 text-center">
            <h3 className="m-0 font-serif text-[28px] sm:text-[36px] lg:text-[44px] font-semibold leading-[1.1] tracking-hl-tight text-brand-aubergine">
              One platform.{' '}
              <span className="italic font-medium text-brand-wine">Unlimited income.</span>
            </h3>
            <p className="mt-4 text-[15.5px] leading-[1.6] text-brand-aubergine max-w-[52ch] mx-auto">
              Build your first Surogate agent. Deploy it for a client. Then build the next one.
            </p>
            <a
              href="https://ops.surogate.ai"
              className="inline-flex items-center gap-2 mt-8 font-serif text-[15px] font-semibold uppercase tracking-wider-2 text-brand-wine hover:text-brand-aubergine transition-colors"
            >
              Get started free
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
