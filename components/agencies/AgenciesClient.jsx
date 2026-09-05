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

/* Four workflows an agency is probably already delivering by hand. Specific
   beats broad here: the reader has to picture something they could sell. */
const USE_CASES = [
  {
    icon: 'target',
    t: 'Lead qualification',
    d: 'A visitor lands on the site. The agent qualifies them, writes the result into the CRM, and books the meeting.',
  },
  {
    icon: 'messages-square',
    t: 'Customer support',
    d: "Your client's knowledge base and systems, behind one agent that answers - and hands off to a human when it should.",
  },
  {
    icon: 'clipboard-check',
    t: 'Client onboarding',
    d: 'Collects what it needs, checks the documents, updates the systems, and chases whatever is still missing.',
  },
  {
    icon: 'search',
    t: 'Research & operations',
    d: 'Browses the sources, does the reading, and files the same report every week without being asked.',
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

const CONTACT =
  'mailto:sales@surogate.ai?subject=Founding%20Agency%20Program&body=Tell%20us%20about%20the%20workflow%20you%27d%20like%20to%20turn%20into%20a%20client-facing%20agent.';

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
                Each one is a workflow you are probably already delivering by hand.
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
      </main>

      <Footer />
    </div>
  );
}
