'use client';

import { useEffect, useRef } from 'react';
import { createIcons, icons as lucideIcons } from 'lucide';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { START_FREE, walkthrough } from './links';

/*
 * surogate.ai/for/lawyers — status updates and document chasing, which is
 * the unbillable work a client assumes is free.
 *
 * Same construction as the other profession pages: app/home.css supplies the
 * sections and type, app/for.css the shapes these pages share.
 */

const CLIENT = [
  {
    icon: 'file-text',
    t: 'They know where their matter stands',
    d: 'They ask at ten at night and get an accurate answer from the file, instead of a promise that someone will call them back.',
  },
  {
    icon: 'message-square',
    t: 'They are told what you need from them',
    d: 'In plain language, with the reason attached, and again a few days later if it has not arrived.',
  },
  {
    icon: 'clock',
    t: 'Nothing waits for office hours',
    d: 'A question on a Sunday is answered on a Sunday, or the client is told plainly that it is with you and when to expect you.',
  },
  {
    icon: 'circle-check',
    t: 'They stop paying for updates',
    d: 'Time that went on status calls goes on the work that moves the matter forward.',
  },
];

const YOU = [
  {
    icon: 'mail-check',
    t: 'The chasing is no longer your job',
    d: 'Documents, signatures, identification, statements. The agent asks, reminds at the interval you set, and tells you when it has everything or when a client has stopped replying.',
  },
  {
    icon: 'scale',
    t: 'What reaches you needed a lawyer',
    d: 'Everything routine is answered from the file. What arrives on your list is the part that required your judgement, with the context already gathered.',
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
    t: 'What each kind of matter needs',
    d: 'The documents, the stages, the dates and the questions clients always ask - per area of work, in your own words.',
  },
  {
    t: 'Where each answer comes from',
    d: 'The matter file and the client-facing notes you have approved. Change a note once and every client hears the new version.',
  },
  {
    t: 'What comes straight to you',
    d: 'The questions you want in your own hands. Each one arrives with the file and the history already gathered, so you pick it up ready to decide.',
  },
];

const MATTERS = [
  {
    t: 'Property and conveyancing',
    d: 'Long timelines, many documents, and a client who wants to know every week whether anything has moved.',
  },
  {
    t: 'Family and probate',
    d: 'Clients who need answering often and gently, and paperwork that arrives in pieces over months.',
  },
  {
    t: 'Employment and immigration',
    d: 'Fixed deadlines, forms, and evidence the client has to gather themselves before you can file anything.',
  },
];

const AREAS = [
  {
    t: 'Corporate and commercial',
    d: 'Filing dates, contract renewals and the annual paperwork every client forgets is due.',
  },
  {
    t: 'Litigation',
    d: 'Disclosure deadlines and a client who needs telling what has happened after every hearing.',
  },
];

const DOES = [
  {
    t: 'It answers',
    d: 'A client asks where their matter stands and gets an accurate answer from the file, at the hour they asked it. Every answer is drawn from the record and the notes you approved.',
  },
  {
    t: 'It chases',
    d: 'The documents, signatures and identification you are waiting on. A reminder at the interval you set, and a note to you when it arrives - or when it has stopped arriving.',
  },
  {
    t: 'It watches',
    d: 'Deadlines, limitation dates, filing windows and renewals. You hear about them while there is still time to act, not on the morning they fall due.',
  },
  {
    t: 'It escalates',
    d: 'Anything you said you wanted to see. It arrives as an item on your list with everything the agent already knows attached, so you start from a full picture instead of a blank one.',
  },
];

const ZONES = [
  {
    tone: 'green',
    t: 'Green',
    d: 'The matter is moving, the client has been told, and nothing is outstanding. You see it in the report and do nothing.',
  },
  {
    tone: 'amber',
    t: 'Amber',
    d: 'A document is late, or a client has asked something you wanted to see yourself. It reaches you as an open item, with the history attached, and you decide without opening the file from scratch.',
  },
  {
    tone: 'red',
    t: 'Red',
    d: 'A date is at risk. You hear about it immediately, and you decide what the client is told and when.',
  },
];

const PRACTICE = [
  {
    t: 'Every client has their own account',
    d: 'One account per client, holding their matter, its stage, what is outstanding and every exchange so far. You see the file and the report. They see a conversation.',
  },
  {
    t: 'It runs where your clients already are',
    d: 'WhatsApp for the clients who prefer it, and a chat window on your own site for the ones who do not. Nothing to install, and nothing for an anxious client to learn at the worst moment of their year.',
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

export default function LawyersClient() {
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
        onClick={() => track('cta_start_free_clicked', { page: 'lawyers', location })}
      >
        <i data-lucide="arrow-right" />
        Start free
      </a>
      <a
        className="btn btn-ghost"
        href={walkthrough('lawyers')}
        onClick={() => track('cta_walkthrough_clicked', { page: 'lawyers', location })}
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
            <p className="hero-kicker reveal">For lawyers</p>
            <h1 className="hero-title reveal d1">
              Your clients stop asking <span className="amber">what is happening.</span>
            </h1>
            <p className="hero-sub reveal d2">
              Build a system of agents that keeps every client informed, chases the documents they
              owe you, and watches the dates that matter - so the only thing reaching your desk is
              the work that needed a lawyer.
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
                You describe, in plain language, what each kind of matter needs, where the answers
                come from, and which questions you want in your own hands. That description becomes
                the agent, and you can change any of it later in the same way you wrote it.
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
              configuration for your practice areas, and you correct it line by line. Nothing runs
              until you have signed it off.
            </div>
          </div>
        </section>

        {/* ══════════════ WHERE TO START ══════════════ */}
        <section className="sec dark" id="matters">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Where to start</p>
              <h2 className="h-section">Start with the matters that repeat.</h2>
            </div>
            <div className="fgrid three reveal d1">
              {MATTERS.map((c) => (
                <div className="fcard stack" key={c.t}>
                  <div>
                    <div className="fc-t">{c.t}</div>
                    <p className="fc-d">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="note reveal d2">
              Each has its own documents, its own dates and its own questions. A conveyance and a
              probate are not chased the same way.
            </p>

            <div className="rule reveal d2">
              <h3 className="sub-h">The same system, other practice areas.</h3>
              <p className="sub-p">
                What changes is the list of documents and the dates. The mechanism is identical.
              </p>
              <div className="fgrid" style={{ maxWidth: 900, marginTop: 30 }}>
                {AREAS.map((s) => (
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
              <h2 className="h-section">It answers, it chases, it watches, and it escalates.</h2>
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
                  Two or three working sessions to correct the configuration we generate for your
                  practice areas, then a pilot of four to six weeks on matters you are already
                  running.
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
              Start with <span className="amber">one practice area.</span>
            </h2>
            <p className="close-sub reveal d2">
              Tell us what one kind of matter needs and what your clients always ask. You will read
              the first message they would receive before anyone receives it.
            </p>
            {cta('closing')}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
