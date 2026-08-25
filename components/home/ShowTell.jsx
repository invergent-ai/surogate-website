'use client';

import { useEffect, useRef, useState } from 'react';
import { createIcons, icons as lucideIcons } from 'lucide';
import dynamic from 'next/dynamic';

// The films are the same React scenes the renderer uses, played in the page.
const FilmPlayer = dynamic(() => import('./FilmPlayer'), { ssr: false });

/*
 * Faithful port of the "Surogate Show & Tell" design.
 * Structure, content and animations come from the source artifact; colours,
 * fonts and branding are the surogate-website theme (see app/home.css, scoped
 * under .st-home). The interactive logic below is a port of the design's
 * site.js, adapted to run once on mount and clean up after itself.
 */
/* Shared inline styles for the ported design's screenshot frames and chips —
   the design uses .st-home CSS variables, so these stay inline rather than
   growing five more one-off rules in app/home.css. */
const CAPTION = { margin: '14px 0 0', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--txt-3)' };
const CHIP = { fontFamily: 'var(--mono)', fontSize: 11, padding: '5px 9px', border: '1px solid var(--line2)', borderRadius: 999, color: 'var(--txt-3)' };

const FACTORY = [
  { t: 'The studio', d: 'Design agents from a model, your knowledge bases, your tools and skills - and the guardrails they must respect. No code.' },
  { t: 'Managed runtime', d: 'Deployed for you in the cloud, on your channels, around the clock - escalating anything that needs a human.' },
  { t: 'Observe & improve', d: 'Every session recorded and replayable. Edit a skill, tighten a rule, or train an expert model you own.' },
  { t: 'Monetize', d: 'Publish the agent, set your own price, and charge for access - paid into your own Stripe account.' },
];

export default function ShowTell() {
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const intervals = [];
    const reg = (id) => { intervals.push(id); return id; };
    const icons = () => { try { createIcons({ icons: lucideIcons, attrs: { 'stroke-width': 1.75 } }); } catch (e) { /* noop */ } };

    /* ── Visibility engine (rect-based) ───────────────────────── */
    const watchers = [];
    const watch = (el, cb, ratio) => { if (el) watchers.push({ el, ratio: ratio == null ? 0.15 : ratio, cb, done: false }); };
    function visibleRatio(el) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.bottom <= 0 || r.top >= vh) return 0;
      const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      return Math.max(0, Math.min(1, visible / Math.min(r.height || 1, vh)));
    }
    function scan() {
      for (const w of watchers) {
        if (w.done) continue;
        if (visibleRatio(w.el) >= w.ratio) { w.done = true; w.cb(); }
      }
    }
    let scanQueued = false;
    function queueScan() {
      if (scanQueued) return; scanQueued = true;
      setTimeout(() => { scanQueued = false; scan(); }, 60);
      requestAnimationFrame(() => { scanQueued = false; scan(); });
    }
    window.addEventListener('scroll', queueScan, { passive: true });
    window.addEventListener('resize', queueScan);

    /* ── Scroll reveal ────────────────────────────────────────── */
    $$('.reveal').forEach((el) => watch(el, () => el.classList.add('in'), 0.12));

    /* 1 · LIFECYCLE LOOP ─────────────────────────────────────── */
    (function loop() {
      const track = $('#loopTrack'); if (!track) return;
      const cards = $$('.lp-card', track);
      let i = 0, auto = true, running = false;
      const setActive = (n) => { i = n; cards.forEach((c, idx) => c.classList.toggle('active', idx === n)); };
      const tick = () => setActive((i + 1) % cards.length);
      const start = () => {
        if (running || reduceMotion) { setActive(0); return; }
        running = true; setActive(0);
        reg(setInterval(() => { if (auto) tick(); }, 4000));
      };
      cards.forEach((c, idx) => {
        c.addEventListener('click', () => {
          auto = false; setActive(idx);
          clearTimeout(c._resume); c._resume = setTimeout(() => { auto = true; }, 9000);
        });
      });
      watch(track, start, 0.4);
    })();

    /* 2 · FLYWHEEL ───────────────────────────────────────────── */
    (function flywheel() {
      const wheel = $('#flyWheel'); if (!wheel) return;
      const nodes = $$('.fly-node', wheel);
      const items = $$('#flySteps .fs-item');
      const arc = $('#flyArc');
      const C = 540;
      let active = 0, started = false, hold = false;
      function set(n) {
        active = n;
        nodes.forEach((nd, i) => nd.classList.toggle('active', i === n));
        items.forEach((it, i) => it.classList.toggle('active', i === n));
        if (arc) {
          const frac = (n + 1) / nodes.length;
          arc.style.transition = 'stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)';
          arc.style.strokeDashoffset = String(C * (1 - frac));
        }
      }
      function start() {
        if (started) return; started = true; set(0);
        if (reduceMotion) return;
        reg(setInterval(() => { if (!hold) set((active + 1) % nodes.length); }, 2200));
      }
      const focus = (n) => { hold = true; set(n); clearTimeout(wheel._r); wheel._r = setTimeout(() => { hold = false; }, 6000); };
      nodes.forEach((nd, i) => nd.addEventListener('click', () => focus(i)));
      items.forEach((it, i) => it.addEventListener('click', () => focus(i)));
      watch(wheel, start, 0.35);
    })();

    /* 5 · COPILOT PALETTE ────────────────────────────────────── */
    (function copilot() {
      const type = $('#cpType'); const out = $('#cpOut'); const caret = $('#cpCaret');
      if (!type || !out) return;
      const scenes = [
        { q: 'deploy the intake agent to Slack and give it the deadlines skill',
          rows: [['check', 'Attached skill <b>deadlines</b> to <b>intake-agent</b>', 'done'],
            ['message-square', 'Published to Slack &middot; <b>#client-intake</b>', 'live'],
            ['activity', 'Deployment scaled to <b>2/2</b> replicas', 'running']] },
        { q: 'which sessions got a thumbs-down this week?',
          rows: [['file-text', '<b>7 sessions</b> flagged &middot; 5 in refunds, 2 in triage', 'log'],
            ['list-checks', 'Grouped into a candidate benchmark', 'ready'],
            ['git-compare', 'Suggested skill edit for <b>refunds</b>', 'proposed']] },
        { q: "train the sql-writer expert on last month's successful runs",
          rows: [['hand', 'Confirm: training run on <b>sql-writer</b> &middot; 12k traces', 'confirm'],
            ['database', 'Dataset <b>sql-writer-v4</b> collected &amp; versioned', 'done'],
            ['triangle', 'SFT run queued on <b>attached GPUs</b>', 'queued']] },
      ];
      let si = 0; let tickets = [];
      const clear = () => { tickets.forEach((t) => clearTimeout(t)); tickets = []; };
      const at = (ms, fn) => { const id = setTimeout(fn, ms); tickets.push(id); return id; };
      const rowHtml = (r) => `<div style="display:flex;align-items:center;gap:12px;opacity:0;transform:translateY(6px);transition:opacity .35s,transform .35s">`
        + `<span style="width:26px;height:26px;flex:none;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--amber-line);border-radius:7px;color:var(--amber)"><i data-lucide="${r[0]}" style="width:14px;height:14px"></i></span>`
        + `<span style="flex:1;font-size:15px;color:var(--txt-d2)">${r[1]}</span>`
        + `<span style="font-family:var(--mono);font-size:11px;letter-spacing:.08em;color:var(--txt-d3)">${r[2]}</span></div>`;
      function play() {
        clear();
        const sc = scenes[si];
        out.innerHTML = '';
        type.textContent = '';
        if (caret) caret.style.opacity = '1';
        if (reduceMotion) {
          type.textContent = sc.q;
          out.innerHTML = sc.rows.map(rowHtml).join('');
          $$('div', out).forEach((d) => { d.style.opacity = '1'; d.style.transform = 'none'; });
          icons();
          return;
        }
        let i = 0;
        const typeTick = () => {
          type.textContent = sc.q.slice(0, i); i += 1;
          if (i <= sc.q.length) at(24, typeTick); else after();
        };
        const after = () => {
          out.innerHTML = sc.rows.map(rowHtml).join('');
          icons();
          const rows = Array.from(out.children);
          rows.forEach((r, k) => at(260 + k * 520, () => { r.style.opacity = '1'; r.style.transform = 'none'; }));
          at(260 + rows.length * 520 + 2600, () => { si = (si + 1) % scenes.length; play(); });
        };
        typeTick();
      }
      watch($('#cpPalette'), play, 0.3);
    })();

    /* ── init icons + first scan ──────────────────────────────── */
    icons();
    scan();
    requestAnimationFrame(() => requestAnimationFrame(scan));
    setTimeout(scan, 200);

    return () => {
      intervals.forEach((id) => clearInterval(id));
      window.removeEventListener('scroll', queueScan);
      window.removeEventListener('resize', queueScan);
    };
  }, []);

  return (
    <div className="st-home">
      {/* ══════════════ HERO ══════════════ */}
      <header className="hero">
        <div className="hero-glow" />
        <div className="hero-rabbit" aria-hidden="true" />
        <div className="hero-rings" aria-hidden="true">
          <span className="hr-ring" /><span className="hr-ring" /><span className="hr-ring" />
          <span className="hr-ring" /><span className="hr-ring" /><span className="hr-ring" />
          <span className="hr-ring" /><span className="hr-ring" /><span className="hr-ring" />
        </div>
        <div className="wrap">
          <p className="hero-kicker reveal">AUTONOMOUS AI AGENTS</p>
          <h1 className="hero-title reveal d1">Multiply <span className="amber">yourself</span></h1>
          <p className="hero-sub reveal d2">Build autonomous workers for any task. Give them knowledge and tools, skills and LLMs, set their rules and watch them perform 24/7. <br/><br/>Deploy them everywhere or sell them to your customers.</p>
          <div className="hero-actions reveal d3">
            <a className="btn btn-primary" href="https://ops.surogate.ai"><i data-lucide="arrow-right" />Start free</a>
            <a className="btn btn-ghost" href="https://github.com/invergent-ai/surogate" target="_blank" rel="noopener noreferrer"><i data-lucide="star" />Give us a Star</a>
          </div>
          <div className="hero-meta reveal d3">
            <div className="hm"><div className="hm-n"><em>24/7</em></div><div className="hm-l">They work while you don't</div></div>
            <div className="hm"><div className="hm-n">0</div><div className="hm-l">Lines of code to build one</div></div>
            <div className="hm"><div className="hm-n">&infin;</div><div className="hm-l">Deploy one or hundreds</div></div>
          </div>
        </div>
        <div className="scroll-cue"><span>Scroll</span><span className="dot" /></div>
      </header>

      {/* ══════════════ WHAT SUROGATE IS ══════════════ */}
      <section className="sec" id="factory">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">What Surogate is</p>
            <h2 className="h-section">The factory for <span className="amber">AI Agents</span></h2>
            <p className="lead">Design an agent, deploy it as a managed service, watch every session it runs, and tighten it as you go - guardrails, knowledge, skills, or a model trained on your own work.</p>
            <p className="lead">One platform for the whole life of an agent.</p>
          </div>
          <FilmPlayer
            variant="full"
            ground={false}
            label="A tour of the Surogate platform"
          />
          <div className="fac-grid reveal d2">
            {FACTORY.map((f, i) => (
              <div className="fac" key={f.t}>
                <div className="fac-n">{String(i + 1).padStart(2, '0')}</div>
                <div className="fac-t">{f.t}</div>
                <p className="fac-d">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════════ WORK MODE ══════════════ */}
      <section className="sec dark" id="product">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Work mode</p>
            <h2 className="h-section">Run your agents</h2>
            <p className="lead">Far more than a chatbot - a capable digital worker. That agent, and every one on this page, lives in the same two places. Work mode is for the people using deployed agents day to day: talking to them, handing them long work, and approving whatever needs a human.</p>
          </div>

          <FilmPlayer
            variant="work"
            ground={false}
            label="Work mode: running agents, sessions, missions and approvals"
            caption="Work mode · a walkthrough of a day with an agent"
          />

          <div className="mcard-grid reveal d1">
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="messages-square" /></div>
                <div className="mc-body">
                  <div className="mc-t">Works, not just talks</div>
                  <p className="mc-d">Hand an agent a task and it follows a multi-step process to completion - deciding, using your systems, delivering a finished result rather than a suggestion. If a run is interrupted it resumes where it left off.</p>
                </div>
              </div>
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="book-open" /></div>
                <div className="mc-body">
                  <div className="mc-t">Knows your business</div>
                  <p className="mc-d">Point it at your documents, sites and repositories. They are compiled into a knowledge base it searches and cites, so answers come from your material rather than the model's guesswork.</p>
                </div>
              </div>
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="plug" /></div>
                <div className="mc-body">
                  <div className="mc-t">Uses your tools, and the web</div>
                  <p className="mc-d">Attach a ready-made toolkit, a server from your library, or any MCP server by its address - over a thousand of them. It can also drive a real browser: navigate, click, type and read a page like a person would.</p>
                </div>
              </div>
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="inbox" /></div>
                <div className="mc-body">
                  <div className="mc-t">Missions, sub-agents, inbox</div>
                  <p className="mc-d">Long-running work graded against success criteria, delegated parts handled by sub-agents, and an inbox where approvals wait for a human.</p>
                </div>
              </div>
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="share-2" /></div>
                <div className="mc-body">
                  <div className="mc-t">Publish to your channels</div>
                  <p className="mc-d">The same agent on a hosted chat page, Slack, Telegram, WhatsApp, a widget on your site, or a pipeline over the API - every channel reaching the same agent, with the same skills and the same guardrails.</p>
                </div>
              </div>
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="thumbs-up" /></div>
                <div className="mc-body">
                  <div className="mc-t">Flag good and bad turns</div>
                  <p className="mc-d">Every message, tool call and result is recorded and replayable. Flagging a turn is what feeds the next round of training.</p>
                </div>
              </div>
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="shield-check" /></div>
                <div className="mc-body">
                  <div className="mc-t">Guardrails that hold</div>
                  <p className="mc-d">Tool access and network egress are locked when a session starts and cannot be weakened mid-task. Code runs sandboxed, credentials stay in a vault the agent never reads, and every action lands in a durable event log. Enterprise adds SSO, RBAC, dedicated compute and an SLA.</p>
                </div>
              </div>
          </div>

        </div>
      </section>
      {/* ══════════════ MONETIZATION ══════════════ */}
      <section className="sec" id="monetize" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Monetization</p>
            <h2 className="h-section">Sell access to the agent you built</h2>
            <p className="lead">An agent trained on how you work is worth something to the people you already serve. Publish it, set your own price, and charge for access - a monthly subscription, packs of tokens, or both.</p>
          </div>

          <FilmPlayer
            variant="monetize"
            ground={false}
            label="Monetization: pricing, the buy link and the storefront a buyer sees"
            caption="Monetize &middot; from pricing model to a page buyers can pay on"
          />

          <div className="pillars reveal d1">
            <div className="pcard">
              <div className="pc-num">01</div>
              <div className="pc-ic"><i data-lucide="banknote" /></div>
              <div className="pc-t">You are the merchant of record.</div>
              <p className="pc-d">Buyers pay into <b>your own Stripe account</b> on your normal payout schedule, and your business name appears on their card statement. Surogate takes a platform fee rather than holding the money.</p>
            </div>
            <div className="pcard">
              <div className="pc-num">02</div>
              <div className="pc-ic"><i data-lucide="user-plus" /></div>
              <div className="pc-t">Buyers need no account here.</div>
              <p className="pc-d">They sign in through your agent with self-registration, and the platform enforces the <b>token budget on every message</b> - so a heavy user cannot quietly cost you more than they pay.</p>
            </div>
            <div className="pcard">
              <div className="pc-num">03</div>
              <div className="pc-ic"><i data-lucide="sliders-horizontal" /></div>
              <div className="pc-t">You set the pricing model.</div>
              <p className="pc-d">Subscription, token packs, or both, at the price you choose. Agent commerce is available on the <b>Pro plan</b> and higher.</p>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════ THE IMPROVEMENT LOOP ══════════════ */}
      <section className="sec dark" id="lifecycle" style={{ background: 'var(--ink-black)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">The improvement loop</p>
            <h2 className="h-section">Build, observe, train, redeploy</h2>
            <p className="lead">Every agent moves through the same four phases, and each one has an honest cost: editing a skill lands in minutes, fine-tuning an expert takes hours. Watch it cycle, or click a phase to dig in.</p>
          </div>
          <div className="loop-stage reveal d1">
            <div className="loop-track" id="loopTrack">
              <div className="lp-card" data-step="0">
                <div className="lp-num">01</div>
                <div className="lp-ic"><i data-lucide="hammer" /></div>
                <div className="lp-t">Build</div>
                <p className="lp-d">Assemble the agent from configuration rather than code: a model, a persona, skills, knowledge bases, MCP tools and guardrails.</p>
                <div className="lp-prog"><span /></div>
                <div className="lp-arrow"><i data-lucide="chevron-right" /></div>
              </div>
              <div className="lp-card" data-step="1">
                <div className="lp-num">02</div>
                <div className="lp-ic"><i data-lucide="eye" /></div>
                <div className="lp-t">Observe</div>
                <p className="lp-d">Every message, tool call and result is recorded and replayable in the session log. You flag the turns that went well and the ones that did not.</p>
                <div className="lp-prog"><span /></div>
                <div className="lp-arrow"><i data-lucide="chevron-right" /></div>
              </div>
              <div className="lp-card" data-step="2">
                <div className="lp-num">03</div>
                <div className="lp-ic"><i data-lucide="triangle" /></div>
                <div className="lp-t">Train</div>
                <p className="lp-d">The cheap way: edit a skill, a persona, a knowledge base. The expensive way: fine-tune an expert on the sessions you flagged.</p>
                <div className="lp-prog"><span /></div>
                <div className="lp-arrow"><i data-lucide="chevron-right" /></div>
              </div>
              <div className="lp-card" data-step="3">
                <div className="lp-num">04</div>
                <div className="lp-ic"><i data-lucide="rocket" /></div>
                <div className="lp-t">Redeploy</div>
                <p className="lp-d">Promote the new version behind the same endpoint, with versioned rollback if the numbers get worse instead of better.</p>
                <div className="lp-prog"><span /></div>
                <div className="lp-arrow"><i data-lucide="chevron-right" /></div>
              </div>
            </div>
            <div className="loop-return"><i data-lucide="rotate-ccw" /> Every day you run it, your AI gets <span className="amber">&nbsp;better</span></div>
          </div>
        </div>
      </section>
      {/* ══════════════ DEVELOP MODE ══════════════ */}
      <section className="sec" id="develop" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Develop mode</p>
            <h2 className="h-section">Build and train them</h2>
            <p className="lead">Develop mode is where agents are designed, given a model, trained on your own work, evaluated and governed. Same platform, same project, one session log.</p>
          </div>

          <FilmPlayer
            variant="develop"
            ground={false}
            label="Develop mode: models, datasets, training and evaluation"
            caption="Develop mode · a walkthrough of the Studio"
          />

          <div className="mcard-grid reveal d1">
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="diamond" /></div>
                <div className="mc-body">
                  <div className="mc-t">Deploy any model</div>
                  <p className="mc-d">Pull one from Hugging Face by repo and revision, use a model already in your hub, point at OpenRouter, or bring any OpenAI-compatible endpoint.</p>
                </div>
              </div>
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="database" /></div>
                <div className="mc-body">
                  <div className="mc-t">Datasets from your chats, or generated</div>
                  <p className="mc-d">Filter flagged conversations into training pairs, upload your own files, import a repo - or design synthetic data column by column, with a teacher writing and a judge scoring.</p>
                </div>
              </div>
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="triangle" /></div>
                <div className="mc-body">
                  <div className="mc-t">Four ways to train it</div>
                  <p className="mc-d">Supervised fine-tuning, preference optimization, reinforcement against a reward environment you write and version yourself, or distilling a teacher&apos;s distribution into a smaller student.</p>
                </div>
              </div>
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="cpu" /></div>
                <div className="mc-body">
                  <div className="mc-t">Your models, your GPUs</div>
                  <p className="mc-d">Serve open-weights models with quantization, autoscaling and versioned rollback - or bring your own LLM per agent and pay the provider directly. Runs execute on whatever compute you attach, from nine providers to your own machines.</p>
                </div>
              </div>
              <div className="mcard">
                <div className="mc-ic"><i data-lucide="clipboard-check" /></div>
                <div className="mc-body">
                  <div className="mc-t">Prove it got better, then keep it</div>
                  <p className="mc-d">Score against 40 built-in benchmarks, or a custom suite built from your own failed sessions, and read the pass-rate drift against the base. A/B two candidates and promote the one that won. Every model, dataset and run lands in your own hub as a versioned repo.</p>
                </div>
              </div>
          </div>

        </div>
      </section>
      {/* ══════════════ EXPERT MODELS - FLYWHEEL ══════════════ */}
      <section className="sec dark" id="flywheel" style={{ background: 'var(--ink-black)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Expert models</p>
            <h2 className="h-section">Your own work, distilled into experts no one else can build</h2>
            <p className="lead">Fine-tune a small open-weights model on traces only you have. On a narrow task it matches a frontier model - at a fraction of the size, latency, and cost.</p>
          </div>
          <div className="fly-stage">
            <div className="reveal">
              <div className="fly-wheel" id="flyWheel">
                <svg viewBox="0 0 200 200">
                  <circle className="fly-ring-bg" cx="100" cy="100" r="86" />
                  <circle className="fly-ring-fg" id="flyArc" cx="100" cy="100" r="86" strokeDasharray="540" strokeDashoffset="540" />
                </svg>
                <div className="fly-center">
                  <div className="fc-k">Compounding</div>
                  <div className="fc-t">The Flywheel</div>
                  <div className="fc-s">turns every day of work into owned intelligence</div>
                </div>
                <div className="fly-node" data-node="0" style={{ left: '50%', top: '7%' }}><i data-lucide="activity" /></div>
                <div className="fly-node" data-node="1" style={{ left: '93%', top: '50%' }}><i data-lucide="database" /></div>
                <div className="fly-node" data-node="2" style={{ left: '50%', top: '93%' }}><i data-lucide="diamond" /></div>
                <div className="fly-node" data-node="3" style={{ left: '7%', top: '50%' }}><i data-lucide="rocket" /></div>
              </div>
            </div>
            <div className="reveal d1">
              <div className="fly-steps" id="flySteps">
                <div className="fs-item" data-node="0">
                  <div className="fs-num">01</div>
                  <div><div className="fs-t">Capture production traces</div><p className="fs-d">Every session - prompts, tool calls, approvals, outcomes - is logged with full traces, versioned per agent.</p></div>
                </div>
                <div className="fs-item" data-node="1">
                  <div className="fs-num">02</div>
                  <div><div className="fs-t">Curate the dataset</div><p className="fs-d">Traces become training data: filtered for success, deduplicated, labeled, and split - with lineage tracked in the Hub.</p></div>
                </div>
                <div className="fs-item" data-node="2">
                  <div className="fs-num">03</div>
                  <div><div className="fs-t">Distil into an expert</div><p className="fs-d">Fine-tune a small base model on your data - SFT, then GRPO or DPO to reward the outcomes you actually want. LoRA or full.</p></div>
                </div>
                <div className="fs-item" data-node="3">
                  <div className="fs-num">04</div>
                  <div><div className="fs-t">Quantize, serve, repeat</div><p className="fs-d">Quantized to 4-bit and served behind the same gateway, the expert takes the high-volume tasks - and keeps logging traces for the next round.</p></div>
                </div>
              </div>
            </div>
          </div>
          <div className="exp reveal">
            <div className="exp-head">
              <div className="exp-eye">Benchmarked on your task &middot; support-ticket resolution</div>
              <div className="exp-recipe"><b>Qwen3-8B</b> &rarr; SFT (12k traces) &rarr; GRPO &rarr; 4-bit AWQ</div>
            </div>
            <div className="exp-table">
              <div className="exp-rowh"><span className="m">Metric</span><span>Frontier API</span><span className="win">Your expert</span></div>
              <div className="exp-row"><span className="m">Task accuracy</span><span>94.1%</span><span className="win">95.8%</span></div>
              <div className="exp-row"><span className="m">p95 latency</span><span>2,400 ms</span><span className="win">380 ms</span></div>
              <div className="exp-row"><span className="m">Cost / 1k calls</span><span>$9.20</span><span className="win">$0.40</span></div>
              <div className="exp-row"><span className="m">Model size</span><span>100B+ params</span><span className="win">8B params</span></div>
            </div>
            <p className="exp-foot">The moat isn't access to the biggest model - it's the flywheel that turns your work into experts <b>no one else can replicate</b>.</p>
          </div>
        </div>
      </section>
      {/* ══════════════ COPILOT ══════════════ */}
      <section className="sec" id="copilot" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Copilot</p>
            <h2 className="h-section">You describe the work. It does it for you.</h2>
            <p className="lead">The Copilot drives the platform itself. It creates the agent, attaches the skill or the knowledge base, scales the deployment, starts the training run - and answers questions about what ran yesterday. Most of what this page describes clicking through, you can ask for instead.</p>
          </div>
          <div className="intro-grid" style={{ marginTop: 54 }}>
            <div className="reveal">
              <div id="cpPalette" style={{ border: '1px solid var(--amber-line)', borderRadius: 14, background: '#fff', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--line2)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.12em', padding: '5px 9px', border: '1px solid var(--amber-line)', borderRadius: 6, color: 'var(--amber)' }}>⌘ /</span>
                  <span id="cpType" style={{ fontSize: 17, color: 'var(--txt-1)', minHeight: 24 }} />
                  <span id="cpCaret" style={{ width: 2, height: 20, background: 'var(--amber)', display: 'inline-block' }} />
                </div>
                <div id="cpOut" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 11, minHeight: 150 }} />
              </div>
              <p style={{ ...CAPTION, marginTop: 16, color: 'var(--txt-3)' }}>Destructive or expensive operations show a confirmation card naming the exact resource first.</p>
            </div>
            <div className="reveal d1">
              <div className="intro-points">
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="wand-2" /></div>
                  <div><div className="ip-t" style={{ color: 'var(--txt-1)' }}>No forms, no config files</div><p className="ip-d" style={{ color: 'var(--txt-2)' }}>Ask in plain language and the Copilot calls the platform's own tools - the same ones the API exposes.</p></div>
                </div>
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="search" /></div>
                  <div><div className="ip-t" style={{ color: 'var(--txt-1)' }}>It answers questions too</div><p className="ip-d" style={{ color: 'var(--txt-2)' }}>What ran yesterday, which sessions got a thumbs-down, how the <span style={{ fontFamily: 'var(--mono)' }}>sql-writer</span> expert is performing this week.</p></div>
                </div>
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="hand" /></div>
                  <div><div className="ip-t" style={{ color: 'var(--txt-1)' }}>Bounded on purpose</div><p className="ip-d" style={{ color: 'var(--txt-2)' }}>Deleting anything or starting a training run needs a confirmation. The builder's view lists every operation it exposes - and what it deliberately will not do.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════ WHO IT'S FOR ══════════════ */}
      <section className="sec persona" id="personas">
        <div className="wrap">
          <div className="persona-head reveal">
            <p className="eyebrow">Who it's for</p>
            <h2 className="persona-title">See what they built with it.</h2>
            <p className="persona-sub">Surogate is a do-it-yourself platform. Each of these systems was built by the professional, on their own practice, without a line of code and without a technical team. Here is what they do.</p>
          </div>
          <div className="pilot-grid reveal d1">
            <div className="aud-card show pilot-card">
              <div className="pc-id">
                <div className="ac-ic"><i data-lucide="heart-pulse" /></div>
                <div className="ac-t">A cardiology practice</div>
              </div>
              <p className="ac-d">The agents talk to every patient on WhatsApp, at the cadence the doctor set. They ask the questions he would ask, collect blood pressure, pulse, weight and medication, read a photographed lab result, and put a short report in front of him every morning. When a value leaves the range he defined, he is alerted the same hour. He can then adjust at a distance, call the patient in, or escalate.</p>
              <div className="pc-eco">
                <div className="ac-pay"><span className="ap-l">What it pays</span><span className="ap-v">&euro;15&ndash;30<span>per patient / month</span></span></div>
                <p className="ac-bound">The agents run the doctor's own protocol. They do not diagnose and they do not prescribe. Every decision stays with him</p>
              </div>
            </div>
            <div className="aud-card show pilot-card">
              <div className="pc-id">
                <div className="ac-ic"><i data-lucide="scale" /></div>
                <div className="ac-t">A law firm</div>
              </div>
              <p className="ac-d">The agents take the first conversation with every new client, at whatever hour it arrives. They collect the documents, calculate the deadlines from the first message, answer procedural questions from a library the lawyers wrote and approved, and follow open cases day by day. Anything urgent reaches an attorney immediately.</p>
              <div className="pc-eco">
                <div className="ac-pay"><span className="ap-l">What it pays</span><span className="ap-v">&euro;25&ndash;50<span>per client / month</span></span></div>
                <p className="ac-bound">The agents run the firm's own protocol. They do not give legal advice in their own name, and they never decide strategy.</p>
              </div>
            </div>
            <div className="aud-card show pilot-card">
              <div className="pc-id">
                <div className="ac-ic"><i data-lucide="graduation-cap" /></div>
                <div className="ac-t">A chemistry teacher</div>
              </div>
              <p className="ac-d">The agents work with each student in short, fixed sessions, and they never hand over the answer. They find the gap underneath the lesson the student is failing, go back to it, and fill it while the class keeps moving. Parents get a weekly picture of where their child stands, and the teacher reads the same report before the next class.</p>
              <div className="pc-eco">
                <div className="ac-pay"><span className="ap-l">What it pays</span><span className="ap-v">&euro;30&ndash;60<span>per student / month</span></span></div>
                <p className="ac-bound">The agents teach on the teacher's own method. When they don't know how he would handle something, they stop and ask him.</p>
              </div>
            </div>
            <div className="aud-card show pilot-card">
              <div className="pc-id">
                <div className="ac-ic"><i data-lucide="calculator" /></div>
                <div className="ac-t">An accounting practice</div>
              </div>
              <p className="ac-d">The agents follow each client's situation year-round, watch the deadlines, and raise a flag early, while a problem is still small and still cheap to fix.</p>
              <div className="pc-eco">
                <div className="ac-pay"><span className="ap-l">What it pays</span><span className="ap-v">&euro;20&ndash;40<span>per client / month</span></span></div>
                <p className="ac-bound">The agents run the accountant's own review process. Decisions and sign-off stay with him.</p>
              </div>
            </div>
          </div>
          <p className="pilot-bridge reveal"><span className="amber">No lines of code were written</span> for any of these.</p>
        </div>
      </section>

      {/* ══════════════ CTA / FOOTER ══════════════ */}
      <section className="cta" id="cta">
        <div className="cta-glow" />
        <div className="wrap">
          <h2 className="cta-title reveal">Stop scaling yourself.<br /><span className="amber">Start multiplying.</span></h2>
          <p className="cta-sub reveal d1">Build your first agent in minutes - free, no code, no credit card. Deploy it to the cloud, put it to work, and come back to results.</p>
          <div className="cta-actions reveal d2">
            <a className="btn btn-primary" href="https://ops.surogate.ai"><i data-lucide="arrow-right" />Start free</a>
            <a className="btn btn-ghost" href="https://docs.surogate.ai"><i data-lucide="book-open" />Read the docs</a>
          </div>
        </div>
      </section>
    </div>
  );
}
