'use client';

import { useEffect, useRef } from 'react';
import { createIcons, icons as lucideIcons } from 'lucide';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';
import { START_FREE, walkthrough } from './links';

/*
 * surogate.ai/for/influencers — the real account, in a real browser, no API.
 *
 * The claim that "you sign in once and every run afterwards starts logged in"
 * rests on surogates/browser/profiles.py: the signed-in session is stored as an
 * encrypted, principal-scoped profile and restored when the browser starts.
 * Without that, unattended interval posting would not be deliverable and this
 * page would be fiction.
 */

const CHANNEL = [
  {
    icon: 'calendar-check',
    t: 'You post on the days you would have skipped',
    d: 'The difference between a channel that builds and one that stalls is usually a fortnight where nothing went out. Those fortnights stop happening.',
  },
  {
    icon: 'message-square',
    t: 'Every comment gets an answer',
    d: 'The replies that turn a viewer into a follower are the ones nobody has the hours for. They get written, in your voice, while the post is still warm.',
  },
  {
    icon: 'clock',
    t: 'It keeps going while you do not',
    d: 'Illness, a holiday, a week where the work took everything. The feed does not notice, because the agent kept the rhythm you set before you left.',
  },
  {
    icon: 'copy',
    t: 'One account becomes several',
    d: 'The same setup, pointed at the second account you never had time to start, and the third one after that.',
  },
];

const YOU = [
  {
    icon: 'sunset',
    t: 'Your evenings come back',
    d: 'Editing, captioning, resizing for four places, and the hour in the comments afterwards. That is the work, and it is the part that is not creative.',
  },
  {
    icon: 'eye',
    t: 'You can watch it work',
    d: 'A live view of the browser it is using, and a button to take the mouse off it mid-action. Nothing happens somewhere you cannot see.',
  },
  {
    icon: 'layers',
    t: 'You can run more accounts than you have hours',
    d: 'Each account gets its own saved login and its own voice. One person keeps a schedule that used to need a small team.',
    hot: true,
  },
];

const SETUP = [
  {
    t: 'You sign in, by hand, once',
    d: 'You take the browser, type the password, pass the two-factor step, and hand it back. That signed-in session is saved, encrypted, and every run afterwards starts already logged in.',
  },
  {
    t: 'You describe the voice and the rules',
    d: 'How you write, what you never say, which comments you answer and which you leave. It learns the voice from what you have already posted.',
  },
  {
    t: 'You set the rhythm',
    d: 'Which days, which hours, how often it sweeps the comments. It keeps to that on its own, without anything to press.',
  },
];

const SURFACES = [
  {
    t: 'Short video',
    d: 'The formats that punish a gap hardest, where posting five times a week is the whole strategy and the reason most people quit.',
  },
  {
    t: 'Photo and carousel feeds',
    d: 'Where one idea becomes ten frames, and the work is the making rather than the thinking.',
  },
  {
    t: 'Text and threads',
    d: 'Where volume and replying fast are the two things that move anything, and both are pure time.',
  },
];

const DOES = [
  {
    t: 'It makes',
    d: 'Images and short video, and the caption to go with them, from a brief you wrote once. One idea comes back in the shape each place needs, instead of you cutting it four ways yourself.',
  },
  {
    t: 'It posts',
    d: 'It opens the site in its browser, signed in as you, and puts the post up at the hour you chose. The same clicks you would have made, at an hour you would rather have been asleep.',
  },
  {
    t: 'It replies',
    d: 'It reads the comments under your own posts and answers them the way you would, from your material. Anything it should not answer alone is left for you, with the thread attached.',
  },
  {
    t: 'It watches',
    d: "What landed, what did not, and what your corner of the internet is talking about this week. Next week's ideas come back with the reason attached.",
  },
];

const CONTROL = [
  {
    t: 'Watch it live',
    d: 'The browser it is driving is on your screen while it drives it. Not a log afterwards - the actual page, as it happens.',
  },
  {
    t: 'Take the controls',
    d: 'One click and the mouse is yours, mid-action. It waits, you finish the bit you wanted to do yourself, and it carries on.',
  },
  {
    t: 'Approve before it goes out',
    d: 'Turn it on and nothing is published or replied to until you have said yes. Turn it off for the accounts you have stopped worrying about.',
    hot: true,
  },
];

const PRACTICE = [
  {
    t: 'One saved login per account',
    d: 'Each account you run gets its own encrypted profile, and each profile lists the sites it holds a login for. You can delete any of them and the agent simply asks you to sign in again next time.',
  },
  {
    t: 'The voice comes from your own posts',
    d: 'Point it at what you have already published and it writes a first version of the voice from that. You correct it line by line, and you change it once for everything afterwards.',
  },
  {
    t: 'Every action is on the record',
    d: 'Every post it made, every reply it wrote, every page it opened, kept and searchable. When something reads wrong you can find the exact moment and change the rule behind it.',
  },
  {
    t: 'And you can sell what you know',
    d: 'The same platform lets you put a paid agent in front of the audience you are building - your method, your price, into your own account. The channel is the top of it, not the whole of it.',
  },
];

export default function InfluencersClient() {
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
        onClick={() => track('cta_start_free_clicked', { page: 'influencers', location })}
      >
        <i data-lucide="arrow-right" />
        Start free
      </a>
      <a
        className="btn btn-ghost"
        href={walkthrough('influencers')}
        onClick={() => track('cta_walkthrough_clicked', { page: 'influencers', location })}
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
            <p className="hero-kicker reveal">For influencers</p>
            <h1 className="hero-title reveal d1">
              Show up every day. <span className="amber">Without being there.</span>
            </h1>
            <p className="hero-sub reveal d2">
              An agent that works your real account in a real browser - makes the post, puts it up
              on your schedule, and answers the comments in your voice. No API, no app review, no
              permissions anyone can take away.
            </p>
            {cta('hero')}
          </div>
        </header>

        {/* ══════════════ YOUR CHANNEL ══════════════ */}
        <section className="sec" id="channel">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Your channel</p>
              <h2 className="h-section">What it changes for your channel.</h2>
            </div>
            <div className="fgrid reveal d1">
              {CHANNEL.map((c) => (
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
              <h2 className="h-section">You log in once. It works from there.</h2>
              <p className="lead">
                There is no API key, no developer account and no app to get approved. The agent
                drives a real browser, signed in as you, the same way you would sign in yourself.
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
              <b>Your password is never stored.</b> What is kept is the signed-in session itself,
              encrypted, tied to your account and nobody else&apos;s. You can see which sites a
              profile holds a login for, and delete it whenever you want.
            </div>
          </div>
        </section>

        {/* ══════════════ WHERE IT WORKS ══════════════ */}
        <section className="sec dark" id="surfaces">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Where it works</p>
              <h2 className="h-section">Anywhere you can sign in.</h2>
              <p className="lead">
                Because it is a browser and not an integration, the list is not a list. If the site
                loads and you have an account, it can work there.
              </p>
            </div>
            <div className="fgrid three reveal d1">
              {SURFACES.map((c) => (
                <div className="fcard stack" key={c.t}>
                  <div>
                    <div className="fc-t">{c.t}</div>
                    <p className="fc-d">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="note reveal d2">
              Newer platforms too, and the ones with no API at all. An integration has to be built
              for each one. A browser does not.
            </p>
          </div>
        </section>

        {/* ══════════════ WHAT THE APP DOES ══════════════ */}
        <section className="sec" id="does">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">What the app does</p>
              <h2 className="h-section">It makes, it posts, it replies, and it watches.</h2>
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
              <h3 className="sub-h">And you stay in the chair.</h3>
              <div className="fgrid three" style={{ marginTop: 30 }}>
                {CONTROL.map((c) => (
                  <div className={`fcard stack${c.hot ? ' hot' : ''}`} key={c.t}>
                    <div>
                      <div className="fc-t">{c.t}</div>
                      <p className="fc-d">{c.d}</p>
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
              <h2 className="h-section">Your account, your session, your voice.</h2>
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
                  An afternoon: sign in, describe the voice, set the rhythm. Then a fortnight with
                  approval switched on, until you stop finding things to change.
                </p>
              </div>
              <div className="cost">
                <div className="cost-t">Your time after that</div>
                <p className="cost-d">
                  Deciding what to make, and reading what came back. The part you actually wanted to
                  do when you started.
                </p>
              </div>
              <div className="cost">
                <div className="cost-t">What you pay</div>
                <p className="cost-d">
                  A Surogate plan from <b>$96 a month</b> at the level that includes the browser and
                  paid subscriptions.
                </p>
              </div>
              <div className="cost hot">
                <div className="cost-t">What you keep</div>
                <p className="cost-d">
                  The accounts, the audience and the logins are yours. Nothing here sits between you
                  and them.
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
              Start with <span className="amber">one account.</span>
            </h2>
            <p className="close-sub reveal d2">
              Sign in once, tell it how you write, and watch it make the first week. Nothing goes
              out until you say so.
            </p>
            {cta('closing')}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
