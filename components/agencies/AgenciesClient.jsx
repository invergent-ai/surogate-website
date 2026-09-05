'use client';

import { useEffect, useRef } from 'react';
import { createIcons, icons as lucideIcons } from 'lucide';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';
import { track } from '@/lib/analytics';

/*
 * surogate.ai/agencies — one page, one audience, one use case.
 *
 * Built on the Show & Tell design system (app/home.css, scoped .st-home) so
 * the sections, buttons, cards and type ramp are the ones the home page
 * already uses. Only what this page adds — the stack grid, the money flow,
 * the example economics and the founding offer — lives in app/agencies.css.
 */

/* The stack an agency rebuilds on every engagement. The length is the
   argument, so these stay short: a name, nothing more. */
const STACK = [
  'Model integration',
  'Agent orchestration',
  'Tools',
  'Browser automation',
  'Knowledge',
  'Authentication',
  'Deployment',
  'Monitoring',
  'Billing',
  'Usage management',
  'Ongoing maintenance',
];

/* Build once, then charge for it — the path from a delivered project to a
   line of recurring revenue. */
const FLOW = [
  'Build the agent',
  'Publish it',
  'Give the client access',
  'Choose your pricing',
  'Connect Stripe',
  'Get paid, monthly',
];

/* Four agents that produce something, rather than four that answer questions.
   Each one has an output a client can see, and a reason to renew next month —
   which is what makes it a product instead of a project. */
const USE_CASES = [
  {
    icon: 'megaphone',
    t: 'The social media manager',
    d: "Writes the week's posts in your client's own voice - from their launches, their photos, their back catalogue - schedules them, then comes back on Monday and does it again.",
  },
  {
    icon: 'graduation-cap',
    t: 'The course tutor',
    d: "Teaches your client's material one student at a time: sets the exercise, marks the answer, adapts the next lesson to what they got wrong. Sell it by the seat.",
  },
  {
    icon: 'receipt',
    t: 'The invoice chaser',
    d: 'Reads the ledger, works out who is late, and chases them over email and WhatsApp until they pay - raising a hand before anything awkward goes out.',
  },
  {
    icon: 'messages-square',
    t: 'The support agent',
    d: "Answers out of your client's own material, then does the thing it was asked for - changes the booking, refunds the order, updates the account - and hands to a human the moment it should.",
  },
];

const GETS = [
  {
    t: '30 days of assisted onboarding',
    d: 'Working sessions with us until the agent is live in front of your client.',
  },
  {
    t: 'Your normal subscription',
    d: 'Pro at $96/month. No lifetime deal - this only works if the product is worth paying for.',
  },
  {
    t: 'A direct line, afterwards',
    d: 'You shape what gets built next. Founding agencies are how the roadmap gets decided.',
  },
];

const EMAIL = 'sales@surogate.ai';
const X_HANDLE = 'surogate_ai';

/* Empty hides the card rather than shipping a dead invite; the row is laid
   out with auto-fit, so it reads as deliberate either way. */
const DISCORD_INVITE = 'https://discord.gg/CGfTnCm8m';

const CONTACT =
  `mailto:${EMAIL}?subject=Founding%20Agency%20Program&body=Tell%20us%20about%20the%20workflow%20you%27d%20like%20to%20turn%20into%20a%20client-facing%20agent.`;

/* Brand marks, drawn rather than fetched — lucide carries no logos. */
const XMark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.1-9.3L1 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20Z" />
  </svg>
);

const DiscordMark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a18.3 18.3 0 0 1 4.4 1.4 15.6 15.6 0 0 0-13.2 0A18.3 18.3 0 0 1 10.8 3.4L10.6 3a19.8 19.8 0 0 0-4.9 1.4C2.6 9 1.8 13.5 2.2 17.9a19.9 19.9 0 0 0 6 3 14.3 14.3 0 0 0 1.3-2.1 12.9 12.9 0 0 1-2-1l.5-.3a14.2 14.2 0 0 0 12.1 0l.5.3a12.9 12.9 0 0 1-2 1 14.3 14.3 0 0 0 1.3 2.1 19.9 19.9 0 0 0 6-3c.5-5.1-.8-9.6-3.6-13.5ZM8.7 15.2c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm6.6 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z" />
  </svg>
);

const REACH = [
  {
    key: 'email',
    href: `mailto:${EMAIL}`,
    mark: <i data-lucide="mail" />,
    t: 'Email',
    handle: EMAIL,
    d: 'Best for the founding program, pricing, or anything with detail attached.',
  },
  {
    key: 'x',
    href: `https://x.com/${X_HANDLE}`,
    mark: <XMark />,
    t: 'X',
    handle: `@${X_HANDLE}`,
    d: 'DMs are open. The quickest way to ask something short.',
  },
  ...(DISCORD_INVITE
    ? [
        {
          key: 'discord',
          href: DISCORD_INVITE,
          mark: <DiscordMark />,
          t: 'Discord',
          handle: 'Join the server',
          d: 'Talk to us, and to the other agencies building on Surogate.',
        },
      ]
    : []),
];

export default function AgenciesClient() {
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

  return (
    <div className="st-home st-agencies bg-white text-brand-aubergine antialiased overflow-x-hidden">
      <Nav />

      <main id="top">
        {/* ══════════════ HERO ══════════════ */}
        <header className="hero">
          <div className="hero-glow" />
          <div className="hero-rabbit" aria-hidden="true" />
          <div className="wrap">
            <p className="hero-kicker reveal">For agencies &amp; consultants</p>
            <h1 className="hero-title reveal d1">
              Ship AI agents <span className="amber">your clients pay for.</span>
            </h1>
            <p className="hero-sub reveal d2">
              Build them on one platform - tools, knowledge, guardrails, deployment and
              monitoring - then charge for access, into your own Stripe account.
            </p>
            <div className="hero-actions reveal d3">
              <a
                className="btn btn-primary"
                href={CONTACT}
                onClick={() => track('cta_agency_clicked', { location: 'hero' })}
              >
                <i data-lucide="arrow-right" />
                Build your first client agent with us
              </a>
              <a
                className="btn btn-ghost"
                href="/#factory"
                onClick={() => track('cta_how_it_works_clicked', { location: 'agencies_hero' })}
              >
                <i data-lucide="play" />
                See how it works
              </a>
            </div>

            <div className="hero-meta reveal d3">
              <div className="hm">
                <div className="hm-n">
                  Your <em>Stripe</em>
                </div>
                <div className="hm-l">Client payments land in your account</div>
              </div>
              <div className="hm">
                <div className="hm-n">
                  <em>5%</em>
                </div>
                <div className="hm-l">Platform fee on what you sell</div>
              </div>
              <div className="hm">
                <div className="hm-n">
                  <em>0</em>
                </div>
                <div className="hm-l">Infrastructure you maintain</div>
              </div>
            </div>
          </div>
        </header>

        {/* ══════════════ THE AGENCY TAX ══════════════ */}
        <section className="sec" id="stack">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">The agency tax</p>
              <h2 className="h-section">Stop rebuilding the same AI stack for every client</h2>
              <p className="lead">
                Every AI project needs some combination of the same eleven things. Build them
                yourself and you build them again on the next engagement - and you own the
                maintenance on all of it, forever.
              </p>
            </div>

            <div className="stack-grid reveal d1">
              {STACK.map((name, i) => (
                <div className="stack" key={name}>
                  <div className="stack-n">{String(i + 1).padStart(2, '0')}</div>
                  <div className="stack-t">{name}</div>
                </div>
              ))}
              <div className="stack is-answer">
                <div className="stack-t">All of it, already built</div>
                <p className="stack-d">You bring the client&apos;s workflow.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ MONETIZATION ══════════════ */}
        <section className="sec dark" id="monetize">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Recurring revenue</p>
              <h2 className="h-section">Turn client projects into recurring products</h2>
              <p className="lead">
                A project ends. A product renews. Publish the agent you built, set your own price,
                and charge your client for access - as a subscription or a usage pack.
              </p>
            </div>

            <div className="flow reveal d1">
              {FLOW.map((step, i) => (
                <div className={`flow-step${i === FLOW.length - 1 ? ' is-paid' : ''}`} key={step}>
                  <div className="flow-n">{String(i + 1).padStart(2, '0')}</div>
                  <div className="flow-t">{step}</div>
                </div>
              ))}
            </div>

            <div className="math reveal d2">
              <div>
                <div className="math-k">The economics</div>
                <p className="math-h">
                  You keep <span className="amber">95%</span> of what you charge. Work out what one
                  client agent is worth to them - the platform cost is the smallest number in that
                  conversation.
                </p>
              </div>
              <div className="math-rule" aria-hidden="true" />
              <div className="math-rows">
                <div className="math-row">
                  <span className="math-l">Surogate Pro</span>
                  <span className="math-v">
                    $96<small>/mo</small>
                  </span>
                </div>
                <div className="math-row">
                  <span className="math-l">Billed annually</span>
                  <span className="math-v">
                    $90<small>/mo</small>
                  </span>
                </div>
                <div className="math-row">
                  <span className="math-l">You keep</span>
                  <span className="math-v amber">95%</span>
                </div>
                <p className="math-note">
                  Agent monetization is included on Pro and Max. Surogate takes a 5% fee on sales;
                  the rest settles into your own Stripe account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ USE CASES ══════════════ */}
        <section className="sec" id="use-cases">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">What agencies sell</p>
              <h2 className="h-section">Four agents you could sell this quarter</h2>
              <p className="lead">
                Not chatbots that answer questions - workers that produce something. Each of these
                has an output your client can see, and a reason to renew next month.
              </p>
            </div>

            <div className="mcard-grid reveal d1">
              {USE_CASES.map((u) => (
                <div className="mcard" key={u.t}>
                  <div className="mc-ic">
                    <i data-lucide={u.icon} />
                  </div>
                  <div className="mc-body">
                    <div className="mc-t">{u.t}</div>
                    <p className="mc-d">{u.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FOUNDING AGENCY PROGRAM ══════════════ */}
        <section className="sec dark" id="founding">
          <div className="offer-glow" aria-hidden="true" />
          <div className="wrap">
            <div className="offer">
              <div className="reveal">
                <p className="eyebrow">Founding agency program</p>
                <h2 className="offer-h">
                  Let&apos;s build your first client agent <span className="amber">together.</span>
                </h2>
                <p className="offer-sub">
                  Take one workflow you are already delivering - or one you want to sell - and we
                  will turn it into a working agent, with us alongside you. You give your client
                  access, and where it fits, you charge for it.
                </p>
                <div className="hero-actions">
                  <a
                    className="btn btn-primary"
                    href={CONTACT}
                    onClick={() => track('cta_agency_clicked', { location: 'founding' })}
                  >
                    <i data-lucide="arrow-right" />
                    Claim a founding place
                  </a>
                  <span className="offer-note">We take on a few at a time</span>
                </div>
              </div>

              <div className="gets reveal d1">
                <div className="math-k">What you get</div>
                {GETS.map((g) => (
                  <div className="get" key={g.t}>
                    <i data-lucide="check" />
                    <div>
                      <div className="get-t">{g.t}</div>
                      <p className="get-d">{g.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* ══════════════ REACH OUT ══════════════ */}
        <section className="sec tight" id="reach">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Reach out</p>
              <h2 className="h-section">Come and talk to us</h2>
              <p className="lead">
                No form, no drip sequence. Whichever one you pick, you get a person.
              </p>
            </div>

            <div className="reach-grid reveal d1">
              {REACH.map((r) => (
                <a
                  className="reach"
                  key={r.key}
                  href={r.href}
                  {...(r.key === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  onClick={() => track('reach_out_clicked', { channel: r.key })}
                >
                  <span className="reach-ic">{r.mark}</span>
                  <span className="reach-t">{r.t}</span>
                  <span className="reach-h">{r.handle}</span>
                  <span className="reach-d">{r.d}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
