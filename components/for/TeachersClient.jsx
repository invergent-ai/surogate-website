'use client';

import { useEffect, useRef } from 'react';
import { createIcons, icons as lucideIcons } from 'lucide';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { START_FREE, walkthrough } from './links';

/*
 * surogate.ai/for/teachers — the sibling of /for/doctors.
 *
 * Same system, same shapes: app/home.css for the sections and type,
 * app/for.css for what these two pages add.
 */

const STUDENT = [
  {
    icon: 'clock',
    t: 'Someone is there when they actually study',
    d: 'The evening before a test, the weekend, the afternoon they got stuck. The moments a student gives up are rarely during your lesson.',
  },
  {
    icon: 'book-open',
    t: 'They go at their own pace',
    d: 'Nothing is skipped because the class had to move on, and nothing is repeated because the group needs it.',
  },
  {
    icon: 'circle-help',
    t: 'They come to you knowing what they do not know',
    d: 'They arrive at your lesson having already found out what they do not understand, instead of finding out during it.',
  },
];

const PARENT = [
  {
    icon: 'file-text',
    t: 'A report every week, in plain language',
    d: 'What their child worked on, where they got stuck and what comes next. Not a grade.',
  },
  {
    icon: 'eye',
    t: 'They can see where the child stands',
    d: 'They stop asking their child how it went and getting nothing back.',
  },
];

const YOU = [
  {
    icon: 'graduation-cap',
    t: 'You walk into the lesson already knowing',
    d: 'You do not spend the first twenty minutes finding out where each student is. You teach from where they actually got to.',
  },
  {
    icon: 'trending-up',
    t: 'You see what needs going back over',
    d: 'Which concepts need reinforcing, and for whom.',
  },
  {
    icon: 'pencil',
    t: 'The work around the teaching gets lighter',
    d: 'Correcting written work, feedback for the student and practice tests are generated for you, from your own material.',
  },
  {
    icon: 'dollar-sign',
    t: 'It is a second income stream',
    d: 'Parents or the school subscribe monthly, through the app, directly to you. You set the packages and the prices.',
    hot: true,
  },
];

const JOBS = [
  {
    t: 'Learning at home, and following it',
    d: 'The main use. Each student works with the agent between your lessons, on your material and under your rules, and everything they do comes back to you as a picture of where they are.',
  },
  {
    t: 'Support for your own work',
    d: 'Correcting written work against your criteria, writing feedback for a student, and generating practice tests and variants to the same specification.',
  },
];

const STEPS = [
  {
    t: 'You set the system up',
    d: 'Your rules, your method, how you want a student evaluated, and how you want them taught. In plain language, the way you would explain it to a colleague.',
  },
  {
    t: 'The student learns at home with it',
    d: 'Short sessions, at their own pace, in the time between your lessons. It works through the material with them rather than handing over answers.',
  },
  {
    t: 'It reports back to you, on its own',
    d: 'Where the student got to in the syllabus, which concepts need reinforcing, what went wrong and where. There is no button to press.',
  },
  {
    t: 'You adjust, and you teach from there',
    d: 'You change what the agent does for that student, and your next lesson starts from where they actually are.',
  },
  {
    t: 'The parent gets their own report',
    d: 'The same picture, written in plain language, with your approval on the wording.',
  },
];

const BRING = [
  {
    t: 'You provide your rules',
    d: 'How you open a topic, how you check whether it landed, what you do when a student is stuck, and what the agent must never do - for example, hand over the answer.',
  },
  {
    t: 'You provide your way of evaluating',
    d: 'What counts as knowing something, and how you want a student placed.',
  },
  {
    t: 'You do not provide the content',
    d: 'The syllabus and the material are found and structured for you. You review it and correct what does not match how you teach.',
    hot: true,
  },
];

const EXAMS = ['Bacalaureat', 'Evaluare Națională', 'Treapta', 'SAT', 'Cambridge'];

export default function TeachersClient() {
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
        onClick={() => track('cta_start_free_clicked', { page: 'teachers', location })}
      >
        <i data-lucide="arrow-right" />
        Start free
      </a>
      <a
        className="btn btn-ghost"
        href={walkthrough('teachers')}
        onClick={() => track('cta_walkthrough_clicked', { page: 'teachers', location })}
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
            <p className="hero-kicker reveal">For teachers</p>
            <h1 className="hero-title reveal d1">
              Your students only have you <span className="amber">for an hour.</span>
            </h1>
            <p className="hero-sub reveal d2">
              A child who goes to school or to tutoring has that one hour, and then nobody. Build a
              system of agents that works with each student in the time in between, on your material
              and your rules, and tells you exactly where each of them got to.
            </p>
            {cta('hero')}
          </div>
        </header>

        {/* ══════════════ THE STUDENT ══════════════ */}
        <section className="sec" id="student">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">The student</p>
              <h2 className="h-section">What it changes for the student.</h2>
            </div>
            <div className="fgrid three reveal d1">
              {STUDENT.map((c) => (
                <div className="fcard stack" key={c.t}>
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

        {/* ══════════════ THE PARENT ══════════════ */}
        <section className="sec dark" id="parent">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">The parent</p>
              <h2 className="h-section">What it changes for the parent.</h2>
            </div>
            <div className="fgrid reveal d1" style={{ maxWidth: 900 }}>
              {PARENT.map((c) => (
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
        <section className="sec" id="you">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">You</p>
              <h2 className="h-section">What it changes for you.</h2>
            </div>
            <div className="fgrid reveal d1">
              {YOU.map((c) => (
                <div className={`fcard${c.hot ? ' hot' : ''}`} key={c.t}>
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

        {/* ══════════════ TWO JOBS ══════════════ */}
        <section className="sec dark" id="jobs">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">What it does</p>
              <h2 className="h-section">Two jobs, and the second one is the point.</h2>
            </div>
            <div className="blocks big reveal d1">
              {JOBS.map((b) => (
                <div className="block" key={b.t}>
                  <div className="block-t">{b.t}</div>
                  <p className="block-d">{b.d}</p>
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
            </div>
            <div className="steps ordered reveal d1">
              {STEPS.map((s, i) => (
                <div className="step" key={s.t}>
                  <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="step-t">{s.t}</div>
                    <p className="step-d">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ WHAT YOU BRING ══════════════ */}
        <section className="sec dark" id="bring">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">What you bring</p>
              <h2 className="h-section">You bring the rules. It finds the material.</h2>
              <p className="lead">
                This is the part most teachers expect to be the hard one, and it is not. You do not
                need to have your curriculum written up, digitised, or turned into content.
              </p>
            </div>
            <div className="fgrid three reveal d1">
              {BRING.map((c) => (
                <div className={`fcard stack${c.hot ? ' hot' : ''}`} key={c.t}>
                  <div>
                    <div className="fc-t">{c.t}</div>
                    <p className="fc-d">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ SUBJECTS ══════════════ */}
        <section className="sec" id="subjects">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Subjects</p>
              <h2 className="h-section">Any subject, any exam.</h2>
              <p className="lead">
                The first system was built for chemistry, which is where the concrete examples on
                this page come from. Nothing about the method is specific to it. English,
                mathematics, physics and any other subject work the same way, and the whole
                programme can be pointed at a particular exam and worked backwards from its date.
              </p>
            </div>
            <div className="chips reveal d1">
              {EXAMS.map((e) => (
                <span className="chip" key={e}>
                  {e}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ YOUR PAGE ══════════════ */}
        <section className="sec dark" id="page">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Your page</p>
              <h2 className="h-section">Your own page, and your own price.</h2>
              <p className="lead">
                You build a landing page for your programme inside the app, in your name: what it
                teaches, who it is for, what it costs and how to start. Parents, students or a
                school subscribe from there and pay you monthly. You decide the packages and the
                prices, and you can change them whenever you want. No website and no developer.
              </p>
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
                  An afternoon to describe how you teach and how you evaluate, then a few weeks with
                  a handful of students you know well, adjusting as it runs.
                </p>
              </div>
              <div className="cost">
                <div className="cost-t">Your time after that</div>
                <p className="cost-d">
                  Reading the reports before your lessons, and adjusting what the agent does for a
                  student when you want it changed.
                </p>
              </div>
              <div className="cost">
                <div className="cost-t">What you pay</div>
                <p className="cost-d">
                  A Surogate plan from <b>$96 a month</b> at the level that includes student
                  subscriptions and payments.
                </p>
              </div>
              <div className="cost hot">
                <div className="cost-t">What you charge</div>
                <p className="cost-d">
                  Parents, students or the school pay you monthly through the app, at the price you
                  set.
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
              Start with <span className="amber">one subject.</span>
            </h2>
            <p className="close-sub reveal d2">
              Describe how you teach it and how you know when a student has understood. You will
              read the first conversation your students would have before any of them has it.
            </p>
            {cta('closing')}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
