'use client';

import { useEffect, useRef } from 'react';
import { createIcons, icons as lucideIcons } from 'lucide';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { START_FREE, walkthrough } from './links';

/*
 * surogate.ai/for/doctors — one profession, one promise.
 *
 * Built on the Show & Tell design system (app/home.css, scoped .st-home);
 * only the shapes this page and /for/teachers introduce live in
 * app/for.css under .st-for.
 */

const PATIENT = [
  {
    icon: 'heart-pulse',
    t: 'Their heart stays under closer control',
    d: 'Someone asks the questions you would ask, at the rhythm you set, and the answers reach you.',
  },
  {
    icon: 'message-circle',
    t: 'They have help whenever they have a question',
    d: 'Not only during office hours, and not only at a consultation. If they are worried about something at nine in the evening, there is somewhere to put it.',
  },
  {
    icon: 'siren',
    t: 'If something develops, it is escalated',
    d: 'A value that drifts or a symptom that appears reaches you the same day, rather than at the next appointment.',
  },
  {
    icon: 'banknote',
    t: 'They stop paying for visits they do not need',
    d: 'When everything is in range, they are told so and they stay home instead of paying for a visit that changes nothing.',
  },
  {
    icon: 'circle-check',
    t: 'Manageable things are handled immediately',
    d: 'A lab test that needs booking, a dose that needs checking, a bad day that needs an answer. These are dealt with when they happen, not in three weeks.',
    wide: true,
  },
];

const YOU = [
  {
    icon: 'calendar',
    t: 'Your calendar stops filling with visits that were not needed',
    d: 'Stable patients are visible in a report instead of taking a slot. The people in front of you are the ones who needed to be there.',
  },
  {
    icon: 'activity',
    t: 'You know at any moment when there is something to do',
    d: 'You see who has drifted, and you call them in for a test or a consultation with a documented reason.',
  },
  {
    icon: 'dollar-sign',
    t: 'It is a second income stream',
    d: 'The system is built so that patients subscribe monthly, through the app, directly to you. You set the packages and the prices.',
    hot: true,
  },
];

const SETUP = [
  {
    t: 'The parameters you follow, per patient category',
    d: 'Blood pressure, resting heart rate, weight, LDL, adherence, the sentinel symptoms - whichever ones matter for that category, with the target you decide.',
  },
  {
    t: 'Where each parameter comes from',
    d: 'A set of lab tests, a measurement the patient takes at home, or something they feel and report in conversation.',
  },
  {
    t: 'How you intervene when a parameter moves the wrong way',
    d: 'For each deviation you say what the agent does and what comes to you for a decision.',
  },
];

const CATEGORIES = [
  {
    t: 'Cardiovascular risk factors, without established disease',
    d: 'Hypertension, high cholesterol, prediabetes, obesity, smoking, family history.',
  },
  {
    t: 'After coronary angioplasty',
    d: 'The phased programme after a stent, where adherence to dual antiplatelet therapy is the parameter that matters most.',
  },
  {
    t: 'After TAVI',
    d: 'Conduction, infection and prosthesis function, in a patient who is usually elderly and rarely alone with a single condition.',
  },
];

const SPECIALTIES = [
  {
    t: 'A diabetologist',
    d: 'Following patients with diabetes between appointments: glucose, adherence, weight, symptoms.',
  },
  {
    t: 'A nutritionist or a bariatric surgeon',
    d: 'Following and guiding bariatric patients through the months when the result is actually decided.',
  },
];

const DOES = [
  {
    t: 'It asks',
    d: "A short message at the patient's own hour, with the questions from your protocol. Every answer feeds a parameter you chose to follow.",
  },
  {
    t: 'It reminds',
    d: 'Medication at the hour you set, a lab test at its due date, a check-up, a prescription that is running out. A confirmation comes back, and a repeated non-confirmation becomes a signal in its own right.',
  },
  {
    t: 'It advises',
    d: 'Practical recommendations from a library you approved, on how to measure correctly, how to move, how to eat, what never to stop on their own. Rotated, so nothing repeats, and never on a heavy day.',
  },
  {
    t: 'It alerts',
    d: 'When an answer crosses a threshold you set, or a patient goes quiet, it reaches you. A silent patient is a signal, not an absence.',
  },
];

const ZONES = [
  {
    tone: 'green',
    t: 'Green',
    d: 'Everything in range. The patient gets a confirmation, the cadence continues, and you see it in the report.',
  },
  {
    tone: 'amber',
    t: 'Amber',
    d: 'A deviation that is not urgent but needs a decision. The agent asks more often, asks for a re-measurement, and puts the case in front of you as an open item. You decide without a visit.',
  },
  {
    tone: 'red',
    t: 'Red',
    d: 'A signal that could be dangerous now. You are alerted immediately and, in the situations you listed, the patient is directed to emergency services in the same message.',
  },
];

const PRACTICE = [
  {
    t: 'Every patient has their own account',
    d: 'The app opens an account for each patient, with their category, their treatment, their baseline and the devices they have at home. From there, everything they report flows into one place: values, symptoms, confirmations, photographs of lab reports. You see the file and the report. They see a conversation.',
  },
  {
    t: 'It runs on WhatsApp',
    d: 'Through the WhatsApp Business integration, so your patients install nothing and learn nothing. They answer a message the way they answer their grandchildren. For an elderly patient this is the difference between a programme that runs and one that stops in week two.',
  },
  {
    t: 'You set the packages and the prices',
    d: 'Payment is part of the flow rather than bolted onto it. You decide what packages exist, what each one includes and what it costs, and patients subscribe from inside the app. It takes minutes to set up and you can change it whenever you want.',
  },
  {
    t: 'Your programme gets its own page',
    d: 'You build a landing page for your programme inside the app, in your name: what it does, who it is for, what it costs, and how to start. You do not need a website or a developer, and it is the link you give your patients.',
  },
];

export default function DoctorsClient() {
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
        onClick={() => track('cta_start_free_clicked', { page: 'doctors', location })}
      >
        <i data-lucide="arrow-right" />
        Start free
      </a>
      <a
        className="btn btn-ghost"
        href={walkthrough('doctors')}
        onClick={() => track('cta_walkthrough_clicked', { page: 'doctors', location })}
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
            <p className="hero-kicker reveal">For doctors</p>
            <h1 className="hero-title reveal d1">
              Between visits, <span className="amber">you know what is happening.</span>
            </h1>
            <p className="hero-sub reveal d2">
              Build a system of agents that follows the patients you already have. They still come
              in at the intervals you set. The difference is that in the weeks in between, nothing
              goes unnoticed.
            </p>
            {cta('hero')}
          </div>
        </header>

        {/* ══════════════ THE PATIENT ══════════════ */}
        <section className="sec" id="patient">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">The patient</p>
              <h2 className="h-section">What it changes for your patient.</h2>
            </div>
            <div className="fgrid reveal d1">
              {PATIENT.map((c) => (
                <div className={`fcard${c.wide ? ' wide' : ''}`} key={c.t}>
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
                You describe, in plain language, what you want followed, where each value comes
                from, and what should happen when it moves the wrong way. That description becomes
                the agent. You can change any of it later, in the same way you wrote it.
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
              configuration for your specialty and your patient categories, and you correct it line
              by line. Nothing runs until you have signed it off.
            </div>
          </div>
        </section>

        {/* ══════════════ WHO IT IS FOR ══════════════ */}
        <section className="sec dark" id="who">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Who it is for</p>
              <h2 className="h-section">Start with the categories that are ready.</h2>
            </div>
            <div className="fgrid three reveal d1">
              {CATEGORIES.map((c) => (
                <div className="fcard stack" key={c.t}>
                  <div>
                    <div className="fc-t">{c.t}</div>
                    <p className="fc-d">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="note reveal d2">
              Each of the three has its own questions, its own cadence and its own thresholds. A
              patient after a stent and a patient with high cholesterol are not asked the same
              things.
            </p>

            <div className="rule reveal d2">
              <h3 className="sub-h">The same system, other specialties.</h3>
              <p className="sub-p">
                What changes between specialties is the list of parameters and the thresholds. The
                mechanism is identical.
              </p>
              <div className="fgrid" style={{ maxWidth: 900, marginTop: 30 }}>
                {SPECIALTIES.map((s) => (
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
              <h2 className="h-section">It asks, it reminds, it advises, and it alerts.</h2>
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
                  categories, then a pilot of four to six weeks with patients you know well.
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
                  A Surogate plan from <b>$96 a month</b> at the level that includes patient
                  subscriptions and payments.
                </p>
              </div>
              <div className="cost hot">
                <div className="cost-t">What you charge</div>
                <p className="cost-d">
                  Patients pay you monthly through the app, at the price you set.
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
              Start with <span className="amber">one patient category.</span>
            </h2>
            <p className="close-sub reveal d2">
              Tell us which patients you follow and how you follow them. You will see the first
              message they would receive before anyone receives it.
            </p>
            {cta('closing')}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
