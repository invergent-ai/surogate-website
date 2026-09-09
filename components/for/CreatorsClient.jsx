'use client';

import { useEffect, useRef } from 'react';
import { createIcons, icons as lucideIcons } from 'lucide';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { START_FREE, walkthrough } from './links';

/*
 * surogate.ai/for/creators — aimed at someone who already has an audience
 * and is not paid by it, rather than at someone hoping to build one.
 *
 * Deliberately does not claim to publish anywhere: there is no social posting
 * integration and no Instagram, TikTok or YouTube channel. The agent makes the
 * material and has it waiting; the creator posts it. Saying otherwise would be
 * the one sentence a trial user could immediately falsify.
 */

const AUDIENCE = [
  {
    icon: 'clock',
    t: 'They get you at two in the morning',
    d: 'The hour someone actually sits down with the thing you teach is rarely the hour you are online. That is when they give up, and that is when there is now an answer.',
  },
  {
    icon: 'sparkles',
    t: 'They get your method, not generic advice',
    d: 'It works from your material and your way of doing things. They came for how you do it, and that is what they get back.',
  },
  {
    icon: 'eye',
    t: 'They get something built for them',
    d: 'A post is the same for a hundred thousand people. This is one conversation, about where they actually are and what they are actually stuck on.',
  },
  {
    icon: 'message-circle',
    t: 'They stop waiting for a reply',
    d: 'The question they would have sent you and never had answered gets answered instead, from the same source you would have used.',
  },
];

const YOU = [
  {
    icon: 'image',
    t: 'The week stops disappearing into production',
    d: 'Drafts, images and short video, made to your brief and waiting on the day you chose. You still decide what goes out - you just stop starting from nothing.',
  },
  {
    icon: 'message-square',
    t: 'You stop answering the same question two hundred times',
    d: 'The questions that arrive every week get the answer you would have given, every time, and you change that answer once for everybody.',
  },
  {
    icon: 'dollar-sign',
    t: 'Income that does not depend on a brand deal',
    d: 'Followers subscribe monthly, through the app, directly to you. You set the packages and the prices, and it keeps paying in the months nobody sponsors anything.',
    hot: true,
  },
];

const SETUP = [
  {
    t: 'What you know, and how you say it',
    d: 'Your method, your rules, the things you always tell people and the things you never do. In your own words, the way you would brief an assistant.',
  },
  {
    t: 'What it works from',
    d: 'Your videos, your posts, your notes, your course if you have one. It answers from what you have made, and nowhere else.',
  },
  {
    t: 'What you sell, and for how much',
    d: 'The packages, what each one includes and what it costs. Minutes to set up, and you can change it whenever you want.',
  },
];

const NICHES = [
  {
    t: 'Fitness and coaching',
    d: 'The programme people follow for months, where the result depends on what happens on the days you are not watching.',
  },
  {
    t: 'Money and business',
    d: 'The same twenty questions in every comment section, each one needing your answer applied to their situation rather than in general.',
  },
  {
    t: 'Teaching a skill',
    d: 'Languages, music, design, code. A learner needs someone at the moment they are stuck, and that moment is never during a video.',
  },
];

const ALREADY = [
  {
    t: 'You have a course',
    d: 'People buy it and stall in week two. The agent works through it with them, one at a time, and tells you where they are getting stuck.',
  },
  {
    t: 'You do one-to-one work',
    d: 'You are sold out and you cannot add hours. This is the tier below you, at a price that reaches the people who could never book you.',
  },
];

const DOES = [
  {
    t: 'It researches',
    d: 'It reads your corner of the internet with a real browser - what is being said this week, what people are asking, what has already been covered to death - and comes back with the angles worth making.',
  },
  {
    t: 'It makes',
    d: 'Drafts in your voice, images, and short video, from a brief you wrote once. One idea comes back as the versions each place needs, instead of you rewriting it four times.',
  },
  {
    t: 'It has it ready',
    d: "On the day and at the hour you set, the week's material is waiting for you to approve and post. It works to your calendar without being asked, and it does not touch your accounts.",
  },
  {
    t: 'It answers',
    d: 'Your subscribers reach it on WhatsApp, on Telegram, or through a link of your own. It answers from your material, and it tells you what people keep asking - which is next month’s content, written by your audience.',
  },
];

const SELL = [
  {
    t: 'A coach',
    d: 'It runs your programme with one person, at their pace, and checks in on the days that decide whether it works.',
  },
  {
    t: 'An answer to anything',
    d: 'Everything you have ever published, answerable in a sentence, applied to the person asking rather than to nobody in particular.',
  },
  {
    t: 'A course that teaches back',
    d: 'Not a folder of videos. Something that notices when they have stopped, finds what they did not understand, and goes back to it.',
    hot: true,
  },
];

const PRACTICE = [
  {
    t: 'Every subscriber has their own account',
    d: 'One account each, holding where they are, what they have asked and what they are working on. They see a conversation. You see the whole room, and what it keeps asking for.',
  },
  {
    t: 'It reaches them where they already are',
    d: 'WhatsApp, Telegram, or a chat window on a page of your own. Nothing to install and no new app to talk anyone into.',
  },
  {
    t: 'You set the packages and the prices',
    d: 'Payment is part of the flow rather than bolted onto it. You decide what a tier includes and what it costs, people subscribe from inside the app, and the money arrives in your own account.',
  },
  {
    t: 'You get a page to send people to',
    d: 'Built inside the app, in your name: what it is, who it is for, what it costs, how to start. It is the link in your bio, and you did not need a website or a developer for it.',
  },
];

export default function CreatorsClient() {
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
        onClick={() => track('cta_start_free_clicked', { page: 'creators', location })}
      >
        <i data-lucide="arrow-right" />
        Start free
      </a>
      <a
        className="btn btn-ghost"
        href={walkthrough('creators')}
        onClick={() => track('cta_walkthrough_clicked', { page: 'creators', location })}
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
            <p className="hero-kicker reveal">For creators</p>
            <h1 className="hero-title reveal d1">
              Your audience already trusts you.{' '}
              <span className="amber">Sell them something that scales.</span>
            </h1>
            <p className="hero-sub reveal d2">
              Build an agent on what you already teach, and sell your followers access to it. It
              works with one of them at a time, in your voice, for a price you set - and it makes
              next week&apos;s content while it does.
            </p>
            {cta('hero')}
          </div>
        </header>

        {/* ══════════════ YOUR AUDIENCE ══════════════ */}
        <section className="sec" id="audience">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Your audience</p>
              <h2 className="h-section">What it changes for the people following you.</h2>
            </div>
            <div className="fgrid reveal d1">
              {AUDIENCE.map((c) => (
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
                You describe what you teach, how you teach it, and what you are selling. That
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
              <b>You do not start from a blank page.</b> Point it at what you have already published
              and it writes a first version of the whole configuration from your own material. You
              correct it line by line, and nothing goes live until you have signed it off.
            </div>
          </div>
        </section>

        {/* ══════════════ WHERE TO START ══════════════ */}
        <section className="sec dark" id="niches">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Where to start</p>
              <h2 className="h-section">Start with the thing people already ask you about.</h2>
            </div>
            <div className="fgrid three reveal d1">
              {NICHES.map((c) => (
                <div className="fcard stack" key={c.t}>
                  <div>
                    <div className="fc-t">{c.t}</div>
                    <p className="fc-d">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="note reveal d2">
              The size of the audience matters less than whether it asks you things. A few thousand
              people who write to you are worth more here than a hundred thousand who scroll past.
            </p>

            <div className="rule reveal d2">
              <h3 className="sub-h">Already selling something?</h3>
              <p className="sub-p">Then this is the part of it that does not scale, handled.</p>
              <div className="fgrid" style={{ maxWidth: 900, marginTop: 30 }}>
                {ALREADY.map((s) => (
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
              <h2 className="h-section">It researches, it makes, it has it ready, and it answers.</h2>
            </div>
            <div className="blocks reveal d1">
              {DOES.map((b) => (
                <div className="block" key={b.t}>
                  <div className="block-t">{b.t}</div>
                  <p className="block-d">{b.d}</p>
                </div>
              ))}
            </div>

            <div className="rule reveal d2">
              <h3 className="sub-h">And the thing you actually sell.</h3>
              <div className="fgrid three" style={{ marginTop: 30 }}>
                {SELL.map((s) => (
                  <div className={`fcard stack${s.hot ? ' hot' : ''}`} key={s.t}>
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
                  An afternoon to describe how you teach and what you are selling, then a few weeks
                  with a small group from your audience before you open it to everyone.
                </p>
              </div>
              <div className="cost">
                <div className="cost-t">Your time after that</div>
                <p className="cost-d">
                  Approving what it made, reading what your subscribers are stuck on, and changing
                  what it says when you want it changed.
                </p>
              </div>
              <div className="cost">
                <div className="cost-t">What you pay</div>
                <p className="cost-d">
                  A Surogate plan from <b>$96 a month</b> at the level that includes subscriptions
                  and payments.
                </p>
              </div>
              <div className="cost hot">
                <div className="cost-t">What you charge</div>
                <p className="cost-d">
                  Your followers pay you monthly through the app, at the price you set. A few dozen
                  of them covers the plan.
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
              Start with <span className="amber">one thing you already teach.</span>
            </h2>
            <p className="close-sub reveal d2">
              Tell us what people ask you most and how you answer it. You will read the first
              conversation your followers would have before any of them has it.
            </p>
            {cta('closing')}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
