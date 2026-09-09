'use client';

import { useEffect, useRef } from 'react';
import { createIcons, icons as lucideIcons } from 'lucide';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { START_FREE, walkthrough } from './links';

/*
 * surogate.ai/for/accountants — the monthly chase for records, which is the
 * one burden every accountant recognises and the one with a penalty attached
 * when it fails.
 */

const CLIENT = [
  {
    icon: 'clipboard-check',
    t: 'They are told exactly what to send',
    d: 'In plain language, one item at a time, with the reason and the date attached - instead of a list of terms they have to look up before they can start.',
  },
  {
    icon: 'bell',
    t: 'They stop missing deadlines',
    d: 'Reminders at the interval you set, and a clear warning while there is still time to do something about it.',
  },
  {
    icon: 'message-circle',
    t: 'They can ask at any hour',
    d: 'A question about an invoice or an expense is answered when they think of it, from the guidance you wrote, rather than saved up for the next meeting.',
  },
  {
    icon: 'trending-up',
    t: 'They see their own position sooner',
    d: 'Because the records arrive on time, what you tell them is current - not a picture of where they were three months ago.',
  },
];

const YOU = [
  {
    icon: 'list-checks',
    t: 'The month stops being a chase',
    d: 'The agent asks, reminds and escalates on its own. Your part is one list of who is ready and who is not, rather than a fortnight of writing the same message to different people.',
  },
  {
    icon: 'bell-ring',
    t: 'You find out early',
    d: 'A client who has gone quiet is a signal weeks before the deadline, not a discovery on the day. Silence is treated as information.',
  },
  {
    icon: 'dollar-sign',
    t: 'It is a second income stream',
    d: 'Clients subscribe monthly, through the app, directly to you. You set the packages and the prices.',
    hot: true,
  },
];

const SETUP = [
  {
    t: 'What you need, from whom, and when',
    d: 'The records, the frequency and the deadlines - per client type, with the dates that never move written down once.',
  },
  {
    t: 'Where each answer comes from',
    d: "The guidance notes you have written and approved, and the client's own record. Change a note once and every client hears the new version.",
  },
  {
    t: 'What comes straight to you',
    d: 'The questions you would rather take yourself. Each arrives with what the client has already told the agent, so you are not starting the conversation over.',
  },
];

const CLIENTS = [
  {
    t: 'Sole traders and freelancers',
    d: 'The same records every quarter, the same forgotten receipts, and one annual date that arrives the same way every year.',
  },
  {
    t: 'Small limited companies',
    d: 'Payroll every month and a year end that depends entirely on whether the records turned up on time.',
  },
  {
    t: 'VAT-registered businesses',
    d: 'A fixed cycle, a hard deadline and a penalty attached to missing it. The category where chasing pays for itself first.',
  },
];

const OTHERS = [
  {
    t: 'Landlords and property',
    d: 'Statements, expenses and a return that depends on twelve months of small documents nobody kept.',
  },
  {
    t: 'Online sellers',
    d: 'Several platforms, several statements, and a monthly reconciliation that only works if all of them arrive.',
  },
];

const DOES = [
  {
    t: 'It asks',
    d: 'One item at a time, at the point in the cycle you chose, in language the client understands. A photograph of a receipt is an acceptable answer.',
  },
  {
    t: 'It reminds',
    d: 'At the interval you set, and it stops the moment the thing arrives. A client who has ignored three reminders becomes a signal in its own right.',
  },
  {
    t: 'It answers',
    d: 'The questions you answer twenty times a year, from guidance you wrote and approved. Same wording every time, and you can change it once for everybody.',
  },
  {
    t: 'It escalates',
    d: "Anything outside that guidance. It becomes an item on your list with the client's history attached, so you answer it once and move on.",
  },
];

const ZONES = [
  {
    tone: 'green',
    t: 'Green',
    d: 'Everything is in, on time, and nothing is outstanding. The client is told so, and you see it in the report.',
  },
  {
    tone: 'amber',
    t: 'Amber',
    d: 'Something is missing, or a client has asked something you wanted to see yourself. It reaches you as an open item, with the history attached, and you decide without reopening the whole file.',
  },
  {
    tone: 'red',
    t: 'Red',
    d: 'A deadline is close and the records are not in. You are told immediately, while there is still time to file something rather than explain a penalty afterwards.',
  },
];

const PRACTICE = [
  {
    t: 'Every client has their own account',
    d: 'One account per client, holding their type, their cycle, what is outstanding and everything they have sent - including the photographs. You see the file and the report. They see a conversation.',
  },
  {
    t: 'It runs where your clients already are',
    d: 'WhatsApp for the clients who prefer it, and a chat window on your own site for the ones who do not. Nothing to install, which is the difference between records that arrive and a portal nobody logs into.',
  },
  {
    t: 'You set the packages and the prices',
    d: 'Payment is part of the flow rather than bolted onto it. You decide what a package includes and what it costs, clients subscribe from inside the app, and the money arrives in your own account.',
  },
  {
    t: 'Your practice gets its own page',
    d: "You build a page for the service inside the app, in your firm's name: what it covers, who it is for, what it costs and how to start. No website and no developer.",
  },
];

export default function AccountantsClient() {
  const booted = useRef(false);
  useReveal();

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    try {
      createIcons({ icons: lucideIcons, attrs: { 'stroke-width': 1.75 } });
    } catch {
      /* An icon that fails to draw must not take the page down. */
    }
  }, []);

  const cta = (location) => (
    <div className="hero-actions reveal d3">
      <a
        className="btn btn-primary"
        href={START_FREE}
        onClick={() => track('cta_start_free_clicked', { page: 'accountants', location })}
      >
        <i data-lucide="arrow-right" />
        Start free
      </a>
      <a
        className="btn btn-ghost"
        href={walkthrough('accountants')}
        onClick={() => track('cta_walkthrough_clicked', { page: 'accountants', location })}
      >
        <i data-lucide="calendar" />
        Book a walkthrough
      </a>
    </div>
  );

  return (
    <div className="st-home st-for bg-white text-brand-aubergine antialiased overflow-x-hidden">
      <Nav />

      <main id="top">
        {/* ══════════════ HERO ══════════════ */}
        <header className="hero">
          <div className="hero-glow" />
          <div className="hero-rabbit" aria-hidden="true" />
          <div className="wrap">
            <p className="hero-kicker reveal">For accountants</p>
            <h1 className="hero-title reveal d1">
              The chasing stops <span className="amber">being your job.</span>
            </h1>
            <p className="hero-sub reveal d2">
              Build a system of agents that asks each client for what you need, when you need it,
              and keeps asking until it arrives. You open one list and see who is ready and who is
              not, instead of sending a month of reminders yourself.
            </p>
            {cta('hero')}
          </div>
        </header>

        {/* ══════════════ THE CLIENT ══════════════ */}
        <section className="sec" id="client">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">The client</p>
              <h2 className="h-section">What it changes for your client.</h2>
            </div>
            <div className="fgrid reveal d1">
              {CLIENT.map((c) => (
                <div className="fcard" key={c.t}>
                  <div className="fc-ic">
                    <i data-lucide={c.icon} />
                  </div>
                  <div>
                    <div className="fc-t">{c.t}</div>
                    <p className="fc-d">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ YOU ══════════════ */}
        <section className="sec dark" id="you">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">You</p>
              <h2 className="h-section">What it changes for you.</h2>
            </div>
            <div className="fgrid three reveal d1">
              {YOU.map((c) => (
                <div className={`fcard stack${c.hot ? ' hot' : ''}`} key={c.t}>
                  <div className="fc-ic">
                    <i data-lucide={c.icon} />
                  </div>
                  <div>
                    <div className="fc-t">{c.t}</div>
                    <p className="fc-d">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ HOW IT WORKS ══════════════ */}
        <section className="sec" id="how">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">How it works</p>
              <h2 className="h-section">You set it up in writing. There is no code.</h2>
              <p className="lead">
                You describe, in plain language, what you need from each kind of client and when,
                where the answers come from, and which questions you want in your own hands. That
                description becomes the agent, and you can change any of it later in the same way
                you wrote it.
              </p>
            </div>
            <div className="steps reveal d1">
              {SETUP.map((s, i) => (
                <div className="step" key={s.t}>
                  <div className="step-n">{String(i + 1).padStart(2, '0')}</div>
                  <div className="step-t">{s.t}</div>
                  <p className="step-d">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="callout reveal d2">
              <b>You do not start from a blank page.</b> We generate a first version of this
              configuration for your client types and their filing calendar, and you correct it line
              by line. Nothing runs until you have signed it off.
            </div>
          </div>
        </section>

        {/* ══════════════ WHERE TO START ══════════════ */}
        <section className="sec dark" id="clients">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Where to start</p>
              <h2 className="h-section">Start with the clients who repeat.</h2>
            </div>
            <div className="fgrid three reveal d1">
              {CLIENTS.map((c) => (
                <div className="fcard stack" key={c.t}>
                  <div>
                    <div className="fc-t">{c.t}</div>
                    <p className="fc-d">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="note reveal d2">
              Each has its own records, its own cycle and its own dates. A freelancer and a company
              on monthly payroll are not chased the same way.
            </p>

            <div className="rule reveal d2">
              <h3 className="sub-h">The same system, other client types.</h3>
              <p className="sub-p">
                What changes is the list of records and the calendar. The mechanism is identical.
              </p>
              <div className="fgrid" style={{ maxWidth: 900, marginTop: 30 }}>
                {OTHERS.map((s) => (
                  <div className="fcard stack" key={s.t}>
                    <div>
                      <div className="fc-t">{s.t}</div>
                      <p className="fc-d">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ WHAT THE APP DOES ══════════════ */}
        <section className="sec" id="does">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">What the app does</p>
              <h2 className="h-section">It asks, it reminds, it answers, and it escalates.</h2>
            </div>
            <div className="blocks reveal d1">
              {DOES.map((b) => (
                <div className="block" key={b.t}>
                  <div className="block-t">{b.t}</div>
                  <p className="block-d">{b.d}</p>
                </div>
              ))}
            </div>
            <div className="zones reveal d2">
              {ZONES.map((z) => (
                <div className={`zone is-${z.tone}`} key={z.t}>
                  <div className="zone-t">{z.t}</div>
                  <p className="zone-d">{z.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ IN PRACTICE ══════════════ */}
        <section className="sec dark" id="practice">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">In practice</p>
              <h2 className="h-section">Where it runs, and how you get paid.</h2>
            </div>
            <div className="blocks reveal d1">
              {PRACTICE.map((b) => (
                <div className="block" key={b.t}>
                  <div className="block-t">{b.t}</div>
                  <p className="block-d">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ EFFORT AND COST ══════════════ */}
        <section className="sec" id="cost">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Effort and cost</p>
              <h2 className="h-section">What it takes, and what it costs.</h2>
            </div>
            <div className="costs reveal d1">
              <div className="cost">
                <div className="cost-t">To set up</div>
                <p className="cost-d">
                  An afternoon to describe what you need from each client type and when, then one
                  full cycle with a handful of clients you know well.
                </p>
              </div>
              <div className="cost">
                <div className="cost-t">Your time after that</div>
                <p className="cost-d">
                  A report you read in a few minutes, and the decisions on whatever it puts in front
                  of you.
                </p>
              </div>
              <div className="cost">
                <div className="cost-t">What you pay</div>
                <p className="cost-d">
                  A Surogate plan from <b>$96 a month</b> at the level that includes client
                  subscriptions and payments.
                </p>
              </div>
              <div className="cost hot">
                <div className="cost-t">What you charge</div>
                <p className="cost-d">
                  Clients pay you monthly through the app, at the price you set.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ CLOSING CALL ══════════════ */}
        <section className="close" id="start">
          <div className="close-glow" aria-hidden="true" />
          <div className="wrap">
            <p className="eyebrow reveal">Start here</p>
            <h2 className="close-h reveal d1">
              Start with <span className="amber">one client type.</span>
            </h2>
            <p className="close-sub reveal d2">
              Tell us what you need from them and when you need it. You will read the first message
              they would receive before anyone receives it.
            </p>
            {cta('closing')}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
