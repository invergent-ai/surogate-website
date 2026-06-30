'use client';

import { useEffect, useRef } from 'react';
import { createIcons, icons as lucideIcons } from 'lucide';

/*
 * Faithful port of the "Surogate Show & Tell" design.
 * Structure, content and animations come from the source artifact; colours,
 * fonts and branding are the surogate-website theme (see app/home.css, scoped
 * under .st-home). The interactive logic below is a port of the design's
 * site.js, adapted to run once on mount and clean up after itself.
 */
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

    /* 2 · AGENT DEMO ─────────────────────────────────────────── */
    (function agent() {
      const feed = $('#agentFeed'); if (!feed) return;
      const replayBtn = $('#agentReplay');
      const steps = [
        { d: 600, html: `<div class="fi-step"><div class="ic"><i data-lucide="brain"></i></div><div class="bd"><div class="lbl"><b>Planning.</b> Review Emma's recent vitals and visit notes, ask a couple of triage questions, then decide what needs Dr. Pretorian.</div></div></div>` },
        { d: 900, html: `<div class="fi-step done"><div class="ic"><i data-lucide="book-open"></i></div><div class="bd"><div class="lbl">Reading Dr. Pretorian's monitoring protocol.</div><div class="fi-tool"><i data-lucide="book-open"></i> knowledge_base.query("post-consult chest pain")</div></div></div>` },
        { d: 950, html: `<div class="fi-step done"><div class="ic"><i data-lucide="file-heart"></i></div><div class="bd"><div class="lbl">Pulling Emma's chart from the last visit.</div><div class="fi-tool"><i data-lucide="folder-search"></i> chart.fetch(patient="emma")</div><div class="fi-sub">&rarr; stent follow-up 3 days ago &middot; on dual antiplatelet therapy</div></div></div>` },
        { d: 1000, html: `<div class="fi-step done"><div class="ic"><i data-lucide="message-circle"></i></div><div class="bd"><div class="lbl"><b>Asked</b> Emma two triage questions; she reports tightness <b>at rest</b>, no relief after 20 minutes.</div></div></div>` },
        { d: 850, html: `<div class="fi-approve" id="apCard"><div class="ap-h"><i data-lucide="hand"></i> Escalation needed</div><div class="ap-d">Chest tightness at rest with Emma's cardiac history meets Dr. Pretorian's &ldquo;flag immediately&rdquo; rule. Notify him now?</div><div class="ap-btns"><button class="ap-btn yes" id="apYes">Notify doctor</button><button class="ap-btn no">Hold</button></div></div>` },
        { d: 1100, html: `<div class="fi-step done"><div class="ic"><i data-lucide="bell-ring"></i></div><div class="bd"><div class="lbl">Paged <b>Dr. Pretorian</b> and told Emma to stay seated and keep the line open.</div><div class="fi-tool"><i data-lucide="check"></i> notify("dr.pretorian", priority="urgent")</div></div></div>` },
        { d: 700, html: `<div class="fi-result"><div class="rs-h"><i data-lucide="circle-check-big"></i> Flagged for Dr. Pretorian</div><div class="rs-grid"><div class="rs-c"><div class="n">&lt;1 min</div><div class="l">To escalate</div></div><div class="rs-c"><div class="n">24/7</div><div class="l">Always on</div></div><div class="rs-c"><div class="n">&euro;15&ndash;30</div><div class="l">/mo per patient</div></div></div></div>` },
      ];
      let tickets = [];
      const clearTickets = () => { tickets.forEach((t) => clearTimeout(t)); tickets = []; };
      const typing = () => {
        const w = document.createElement('div');
        w.className = 'fi show'; w.dataset.typing = '1';
        w.innerHTML = `<div class="fi-step"><div class="ic"><i data-lucide="loader"></i></div><div class="bd"><div class="lbl" style="color:var(--txt-d3)"><span class="typing"><span></span><span></span><span></span></span></div></div></div>`;
        return w;
      };
      function play() {
        clearTickets();
        feed.innerHTML = '';
        let t = 0;
        feed.appendChild(typing()); icons();
        steps.forEach((step, idx) => {
          t += step.d;
          tickets.push(setTimeout(() => {
            const ex = feed.querySelector('[data-typing]'); if (ex) ex.remove();
            const el = document.createElement('div');
            el.className = 'fi'; el.innerHTML = step.html;
            feed.appendChild(el);
            tickets.push(setTimeout(() => el.classList.add('show'), 20));
            icons();
            feed.scrollTop = feed.scrollHeight;
            if (idx === 4) {
              tickets.push(setTimeout(() => {
                const yes = $('#apYes'); const card = $('#apCard');
                if (yes) yes.textContent = 'Approved ✓';
                if (card) card.classList.add('granted');
              }, 650));
            }
            if (idx < steps.length - 1) {
              feed.appendChild(typing()); icons(); feed.scrollTop = feed.scrollHeight;
            }
          }, t));
        });
      }
      if (replayBtn) replayBtn.addEventListener('click', play);
      watch(feed, play, 0.3);
    })();

    /* 3 · FLYWHEEL ───────────────────────────────────────────── */
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

    /* 4 · CAPABILITIES EXPLORER ──────────────────────────────── */
    (function capabilities() {
      const list = $('#capList'); const panel = $('#capPanel'); if (!list || !panel) return;
      const caps = [
        { eye: 'Acts end to end', t: 'Works, not just talks',
          d: 'An agent follows a multi-step process to completion — making decisions, using your systems, and delivering a finished result rather than a suggestion.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="workflow"></i> task: process refund request #4821</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t"><b>Verify</b> order &amp; eligibility</div><div class="dr-tag">done</div></div>
              <div class="demo-row" data-i="1"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t"><b>Issue</b> refund via payments API</div><div class="dr-tag">done</div></div>
              <div class="demo-row" data-i="2"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t"><b>Update</b> ticket &amp; notify customer</div><div class="dr-tag">done</div></div>
              <div class="demo-row" data-i="3"><div class="dr-ic"><i data-lucide="circle-check-big"></i></div><div class="dr-t">Refund of <b>$129.00</b> completed</div><div class="dr-tag">2.1s</div></div>
            </div></div>` },
        { eye: 'Grounded in your knowledge', t: 'Knows your business',
          d: 'Answers come from your own documentation, policies, and institutional knowledge — specific and cited, not a generic guess.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="book-open"></i> knowledge base &middot; 1,240 docs</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="demo-bubble user">What's our SLA for enterprise incidents?</div></div>
              <div class="demo-row" data-i="1"><div class="demo-bubble agent">Enterprise P1 incidents have a <b>15-minute</b> response SLA and a 4-hour resolution target.<span class="src"><span class="chip">SLA-policy.pdf</span><span class="chip">support-tiers.md</span></span></div></div>
            </div></div>` },
        { eye: 'Connected to your stack', t: 'Uses your tools',
          d: 'Agents act inside the platforms you already run, with credentials held in a secure vault — used, never exposed.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="plug"></i> connected tools &middot; secure vault</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t"><b>Salesforce</b> — read &amp; write</div><div class="dr-tag">vaulted</div></div>
              <div class="demo-row" data-i="1"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t"><b>Jira</b> — create issues</div><div class="dr-tag">vaulted</div></div>
              <div class="demo-row" data-i="2"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t"><b>Postgres</b> — query</div><div class="dr-tag">vaulted</div></div>
              <div class="demo-row" data-i="3"><div class="dr-ic"><i data-lucide="shield"></i></div><div class="dr-t">Credentials never seen by the model</div><div class="dr-tag">secure</div></div>
            </div></div>` },
        { eye: 'Live research', t: 'Browses &amp; researches',
          d: 'Gather and synthesize live sources into well-organized, cited results — hours of research delivered in minutes.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="globe"></i> research: competitor pricing</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t">Scanned <b>14 sources</b></div><div class="dr-tag">browsing</div></div>
              <div class="demo-row" data-i="1"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t">Extracted <b>6 pricing tiers</b></div><div class="dr-tag">parsing</div></div>
              <div class="demo-row" data-i="2"><div class="dr-ic"><i data-lucide="file-text"></i></div><div class="dr-t">Sourced summary with citations ready</div><div class="dr-tag">3 min</div></div>
            </div></div>` },
        { eye: 'Hours-long autonomy', t: 'Handles long jobs',
          d: 'Pursue a goal over hours or days, coordinating with sub-agents and tracking its own progress against a plan.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="list-checks"></i> migration job &middot; 3h 42m elapsed</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t">Phase 1 — schema mapping</div><div class="dr-tag">done</div></div>
              <div class="demo-row" data-i="1"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t">Phase 2 — migrate 1.2M rows</div><div class="dr-tag">done</div></div>
              <div class="demo-row" data-i="2"><div class="dr-ic"><i data-lucide="loader"></i></div><div class="dr-t">Phase 3 — validation <b>&middot; 71%</b></div><div class="dr-tag">running</div></div>
            </div></div>` },
        { eye: 'Human in the loop', t: 'Knows when to ask',
          d: 'Pauses for human approval on irreversible or low-confidence actions, then resumes — with a full audit trail of every decision.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="hand"></i> approval gate &middot; writes</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="demo-bubble agent">About to <b>delete 320 stale records</b>. This is irreversible — approve?</div></div>
              <div class="demo-row" data-i="1"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t"><b>Approved</b> by Dana &middot; Finance Ops</div><div class="dr-tag">logged</div></div>
              <div class="demo-row" data-i="2"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t">Action completed &amp; audit entry written</div><div class="dr-tag">14:22</div></div>
            </div></div>` },
      ];
      let demoTickets = [];
      function render(n) {
        demoTickets.forEach((t) => clearTimeout(t)); demoTickets = [];
        const c = caps[n];
        panel.innerHTML =
          `<div class="cp-eye">${c.eye}</div>` +
          `<div class="cp-t">${c.t}</div>` +
          `<p class="cp-d">${c.d}</p>` +
          `<div class="cap-demo">${c.demo}</div>`;
        icons();
        $$('.demo-row', panel).forEach((r, idx) => {
          demoTickets.push(setTimeout(() => r.classList.add('show'), 220 + idx * 520));
        });
      }
      $$('.cap-item', list).forEach((item) => {
        item.addEventListener('click', () => {
          $$('.cap-item', list).forEach((x) => x.classList.remove('active'));
          item.classList.add('active');
          render(+item.dataset.cap);
        });
      });
      render(0);
    })();

    /* 5 · THE SECOND SHIFT — night timeline ──────────────────── */
    (function secondShift() {
      const line = $('#shiftLine'); if (!line) return;
      const stops = $$('.shift-stop', line);
      const rail = $('#shiftRail');
      const dawn = $('#shiftDawn');
      let i = -1, started = false;
      function set(n) {
        i = n;
        stops.forEach((s, idx) => s.classList.toggle('on', idx <= n));
        if (rail) rail.style.cssText = `width:${(n / (stops.length - 1)) * 100}%; transition:width .8s cubic-bezier(.4,0,.2,1);`;
        if (dawn) dawn.classList.toggle('lit', n >= stops.length - 1);
      }
      const advance = () => set((i + 1) % stops.length);
      function start() {
        if (started) return; started = true; set(0);
        if (reduceMotion) { set(stops.length - 1); return; }
        reg(setInterval(advance, 1800));
      }
      stops.forEach((s, idx) => s.addEventListener('click', () => set(idx)));
      watch(line, start, 0.4);
    })();

    /* 6 · FLEET AT SCALE — spawn + live counter ──────────────── */
    (function fleet() {
      const grid = $('#fleetGrid'); const countEl = $('#fleetCount'); if (!grid) return;
      const agents = [
        ['Emma M.', 'Checking in after a stent follow-up'],
        ['James P.', "Logging this morning's blood pressure"],
        ['Sophie R.', 'Confirming she refilled her medication'],
        ['Mark D.', 'Reporting mild ankle swelling'],
        ['Olivia V.', 'Answering a question about her dose'],
        ['Thomas N.', 'Recording a steady resting heart rate'],
        ['Anna C.', "Reminded about Thursday's follow-up"],
        ['William S.', 'Sharing symptoms after a long walk'],
        ['Grace L.', 'Submitting her weekly check-in'],
        ['Robert B.', 'Flagging shortness of breath at night'],
        ['Diana F.', 'Asking whether to skip a dose'],
        ['Michael T.', 'Logging weight for fluid tracking'],
        ['Ella G.', 'Reviewing her medication schedule'],
        ['Paul A.', 'Reporting no symptoms this week'],
        ['Rachel I.', 'Sending a photo of swelling'],
        ['George M.', 'Confirming his pharmacy pickup'],
        ['Bianca O.', 'Asking about post-op activity'],
        ['Steven K.', 'Recording chest discomfort earlier'],
        ['Laura E.', 'Completing her daily symptom log'],
        ['Colin V.', 'Reminded to book a blood test'],
        ['Irene P.', 'Checking in after a med change'],
        ['Dan R.', 'Reporting improved energy levels'],
        ['Maria H.', 'Asking when to resume exercise'],
        ['Frank T.', 'Logging an irregular pulse reading'],
        ['Alice S.', 'Following up on dizziness'],
        ['Christine B.', 'Confirming her appointment time'],
        ['Brandon L.', 'Reporting stable readings all week'],
        ['Theodora M.', 'Sharing a new question for the doctor'],
      ];
      const pickStatus = () => { const w = ['run', 'run', 'run', 'run', 'run', 'run', 'srv', 'srv', 'dep']; return w[Math.floor(Math.random() * w.length)]; };
      const tiles = [];
      agents.forEach((a, idx) => {
        const st = idx < 2 ? 'run' : pickStatus();
        const pct = 18 + Math.floor(Math.random() * 70);
        const el = document.createElement('div');
        el.className = 'ftile';
        el.innerHTML = `<div class="ft-top"><span class="ft-dot ${st}"></span><span class="ft-nm">${a[0]}</span></div>` +
          `<div class="ft-tk">${a[1]}</div>` +
          `<div class="ft-bar"><span style="width:${pct}%"></span></div>`;
        grid.appendChild(el);
        tiles.push({ el, dot: el.querySelector('.ft-dot'), bar: el.querySelector('.ft-bar span'), pct });
      });
      let started = false;
      function rampCounter() {
        const target = 70 + Math.floor(Math.random() * 50);
        const dur = 1400; const t0 = performance.now();
        function step(now) {
          const k = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          countEl.textContent = Math.round(eased * target).toLocaleString();
          if (k < 1) requestAnimationFrame(step);
          else { countEl.textContent = target.toLocaleString(); fluctuate(target); }
        }
        requestAnimationFrame(step);
      }
      function fluctuate(base) {
        if (reduceMotion) return;
        reg(setInterval(() => {
          const n = base + Math.floor((Math.random() - 0.4) * 14);
          countEl.textContent = n.toLocaleString();
        }, 2600));
      }
      function liveTiles() {
        if (reduceMotion) return;
        reg(setInterval(() => {
          const t = tiles[Math.floor(Math.random() * tiles.length)];
          if (!t) return;
          t.pct += 6 + Math.floor(Math.random() * 16);
          if (t.pct >= 100) {
            t.bar.style.width = '100%';
            t.dot.className = 'ft-dot srv';
            setTimeout(() => {
              const a = agents[Math.floor(Math.random() * agents.length)];
              t.el.querySelector('.ft-nm').textContent = a[0];
              t.el.querySelector('.ft-tk').textContent = a[1];
              t.pct = 8 + Math.floor(Math.random() * 20);
              t.dot.className = 'ft-dot run';
              t.bar.style.width = t.pct + '%';
            }, 900);
          } else {
            t.bar.style.width = t.pct + '%';
          }
        }, 700));
      }
      function start() {
        if (started) return; started = true;
        if (reduceMotion) { tiles.forEach((t) => t.el.classList.add('in')); countEl.textContent = '240'; return; }
        tiles.forEach((t, i) => setTimeout(() => t.el.classList.add('in'), 40 + i * 45));
        setTimeout(rampCounter, 200);
        setTimeout(liveTiles, agents.length * 45 + 400);
      }
      watch(grid, start, 0.18);
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
        <div className="wrap">
          <p className="hero-kicker reveal">AUTONOMOUS AI AGENTS</p>
          <h1 className="hero-title reveal d1">Multiply<br /><span className="amber">yourself.</span></h1>
          <p className="hero-sub reveal d2">Train a Surogate agent on the way you already work, then offer it to your existing patients, clients, or students as a monthly subscription. You earn from every one of them — without adding a single hour to your day.</p>
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

      {/* ══════════════ WHO IT'S FOR ══════════════ */}
      <section className="sec persona" id="personas">
        <div className="wrap">
          <div className="persona-head reveal">
            <p className="eyebrow">Who it's for</p>
            <h2 className="persona-title">Professionals already doing this</h2>
            <p className="persona-sub">Not generic use cases — real people, already running a Surogate agent for their own clients. Here's exactly what they built, and what it pays.</p>
          </div>
          <div className="pilot-grid reveal d1">
            <div className="aud-card show pilot-card">
              <div className="ac-ic"><i data-lucide="heart-pulse" /></div>
              <div className="ac-cat">Cardiologist</div>
              <div className="ac-t">Dr. Radu Pretorian</div>
              <p className="ac-d">Checks in with his patients after every consultation, tracks symptoms and medication compliance, and flags anything unusual.</p>
              <div className="ac-pay"><span className="ap-l">What it pays</span><span className="ap-v">&euro;15&ndash;30<span>per patient / month</span></span></div>
              <p className="ac-bound">The agent follows Dr. Pretorian's own monitoring protocol. It doesn't diagnose, and it doesn't replace a consultation.</p>
            </div>
            <div className="aud-card show pilot-card">
              <div className="ac-ic"><i data-lucide="scale" /></div>
              <div className="ac-cat">Law firm</div>
              <div className="ac-t">Laza Lawyers</div>
              <p className="ac-d">Handles the first conversation with every new client, answers common procedural questions, and routes anything complex straight to an attorney.</p>
              <div className="ac-pay"><span className="ap-l">What it pays</span><span className="ap-v">&euro;25&ndash;50<span>per client / month</span></span></div>
              <p className="ac-bound">The agent follows the firm's own intake protocol. It doesn't give legal advice in its own name.</p>
            </div>
            <div className="aud-card show pilot-card">
              <div className="ac-ic"><i data-lucide="calculator" /></div>
              <div className="ac-cat">Accountant</div>
              <div className="ac-t">Rares</div>
              <p className="ac-d">Tracks his clients' financial situation year-round and alerts them before small issues become expensive ones.</p>
              <div className="ac-pay"><span className="ap-l">What it pays</span><span className="ap-v">&euro;30&ndash;60<span>per client / month</span></span></div>
              <p className="ac-bound">The agent follows Rares' own review process. Financial decisions and sign-off stay with him.</p>
            </div>
            <div className="aud-card show pilot-card">
              <div className="ac-ic"><i data-lucide="graduation-cap" /></div>
              <div className="ac-cat">Teacher</div>
              <div className="ac-t">John Riley</div>
              <p className="ac-d">Drills students for exams, tracks their progress, and sends parents a weekly update — using John's own method.</p>
              <div className="ac-pay"><span className="ap-l">What it pays</span><span className="ap-v">&euro;20&ndash;40<span>per student / month</span></span></div>
              <p className="ac-bound">The agent practices with students on John's curriculum. It doesn't replace his teaching or grading.</p>
            </div>
          </div>
          <p className="pilot-bridge reveal">Each of them built <span className="amber">one agent.</span> Here's exactly how.</p>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="sec" id="intro">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">How it works</p>
            <h2 className="h-section">You describe the work. It does it for you.</h2>
          </div>
          <div className="intro-grid">
            <div className="reveal">
              <p className="lead" style={{ marginTop: 0 }}>Tell Surogate what you want done, in plain words. It builds an agent that handles it, runs it in the cloud around the clock, and gets sharper the longer it works — no code, no servers to manage.</p>
              <div className="intro-points">
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="wand-2" /></div>
                  <div><div className="ip-t">Built from your workflow, no code</div><p className="ip-d">Define what your agent does in plain language — its goals, its tools, its rules. If you understand your work, you can build it.</p></div>
                </div>
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="cloud" /></div>
                  <div><div className="ip-t">Runs in the cloud, 24/7</div><p className="ip-d">Your agent lives in the cloud, not on your laptop. It works when you don't — no tab open, no machine running.</p></div>
                </div>
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="trending-up" /></div>
                  <div><div className="ip-t">Gets better the more it runs</div><p className="ip-d">Turn your most common tasks into owned expert models trained on your own work — smarter and cheaper over time.</p></div>
                </div>
              </div>
            </div>
            <div className="reveal d1">
              <video
                src="/surogate-app.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                tabIndex={-1}
                aria-label="Screen recording of the Surogate app in use"
                style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 14 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY SUROGATE — THREE PILLARS ══════════════ */}
      <section className="sec" id="pillars" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow center">Why Surogate</p>
            <h2 className="h-section">Three ways it pays off</h2>
            <p className="lead">A way to turn your work into recurring income, agents that run themselves, and intelligence you own.</p>
          </div>
          <div className="pillars reveal d1">
            <div className="pcard feat">
              <div className="pc-num">01</div>
              <div className="pc-ic"><i data-lucide="banknote" /></div>
              <div className="pc-t">Rent it out, not just run it.</div>
              <p className="pc-d">Build an agent once, deploy it to every client you already have, and earn a <b>recurring monthly fee</b> from each one. An agency without employees — a subscription business without code.</p>
              <a className="pc-link" href="#shift">See how it pays <i data-lucide="arrow-right" /></a>
            </div>
            <div className="pcard">
              <div className="pc-num">02</div>
              <div className="pc-ic"><i data-lucide="hexagon" /></div>
              <div className="pc-t">Agents that run themselves.</div>
              <p className="pc-d">Agents that <b>run in the cloud</b> — executing tasks, coordinating with each other, and reporting back 24/7. You set the goal; they do the work.</p>
              <a className="pc-link" href="#agent">See one work <i data-lucide="arrow-right" /></a>
            </div>
            <div className="pcard">
              <div className="pc-num">03</div>
              <div className="pc-ic"><i data-lucide="diamond" /></div>
              <div className="pc-t">Intelligence you own.</div>
              <p className="pc-d">Distill your own work into <b>small expert models you own</b> — matching or beating frontier models on your tasks, at a fraction of the cost.</p>
              <a className="pc-link" href="#flywheel">How the flywheel works <i data-lucide="arrow-right" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ BUILD ONCE, EARN ALWAYS ══════════════ */}
      <section className="sec shift" id="shift">
        <div className="shift-sky" />
        <div className="shift-dawn" id="shiftDawn" />
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow center">Build once, earn always</p>
            <h2 className="h-section" style={{ color: 'rgb(247, 245, 242)' }}>You build it once. It earns while you sleep.</h2>
            <p className="lead" style={{ color: 'rgb(147, 146, 140)' }}>The agent you ship keeps working for your patients, clients, or students around the clock — handling the routine, escalating only what matters. You're off the clock; the income isn't.</p>
          </div>
          <div className="shift-line" id="shiftLine">
            <div className="shift-rail"><span id="shiftRail" /></div>
            <div className="shift-stop" data-stop="0">
              <div className="shift-dot" />
              <div className="shift-time">Once</div>
              <div className="shift-t">You build and ship the agent.</div>
              <div className="shift-who"><i data-lucide="package-check" /> you</div>
            </div>
            <div className="shift-stop" data-stop="1">
              <div className="shift-dot" />
              <div className="shift-time">24/7</div>
              <div className="shift-t">It works with your patients, clients, or students.</div>
              <div className="shift-who"><i data-lucide="headset" /> deployed agent</div>
            </div>
            <div className="shift-stop" data-stop="2">
              <div className="shift-dot" />
              <div className="shift-time">Anytime</div>
              <div className="shift-t">It escalates only what actually needs you.</div>
              <div className="shift-who"><i data-lucide="hand" /> deployed agent</div>
            </div>
            <div className="shift-stop" data-stop="3">
              <div className="shift-dot" />
              <div className="shift-time">Monthly</div>
              <div className="shift-t">The subscription renews. You earn.</div>
              <div className="shift-who"><i data-lucide="banknote" /> recurring income</div>
            </div>
          </div>
          <p className="shift-cap reveal">You build once. <span className="amber">Clients pay every month.</span></p>
        </div>
      </section>

      {/* ══════════════ PROOF — SEE IT WORK ══════════════ */}
      <section className="sec" id="agent" style={{ background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow center">Proof — see it work</p>
            <h2 className="h-section">Watch one agent monitor one patient — then scale to all of them</h2>
            <p className="lead">Not a chat demo. This is Dr. Pretorian's own Surogate agent, checking in with a real patient after a real consultation.</p>
          </div>
          <div className="agent-stage reveal d1">
            <div className="agent-task">
              <div className="at-label">Incoming &middot; live</div>
              <div className="at-prompt">Hi doctor, I've had some chest tightness since yesterday evening — should I be worried?</div>
              <div className="at-from">
                <div className="av"><i data-lucide="user" /></div>
                <div className="meta"><b>Emma &middot; patient</b>via Dr. Pretorian's monitoring agent</div>
              </div>
              <div className="at-meta-list">
                <div className="row"><span>Agent</span><b>patient-monitoring &middot; v1.4</b></div>
                <div className="row"><span>Deployed for</span><b>Dr. Radu Pretorian, Cardiology</b></div>
                <div className="row"><span>Runs on</span><b>Surogate Cloud</b></div>
                <div className="row"><span>He earns</span><b>&euro;15&ndash;30 / patient / month</b></div>
              </div>
            </div>
            <div className="agent-feed-wrap">
              <div className="af-head">
                <div className="ttl"><span className="sd" /> Agent activity &middot; live</div>
                <button className="af-replay" id="agentReplay"><i data-lucide="rotate-ccw" /> Replay</button>
              </div>
              <div className="af-feed" id="agentFeed" />
            </div>
          </div>
          <p className="agent-compliance reveal"><i data-lucide="shield-check" /> The agent flags anything that needs Dr. Pretorian's attention immediately — it doesn't make the call itself.</p>
          <div className="fleet-divider reveal"><span className="fd-t">That was <span className="amber">one</span> patient. Here's his full patient list.</span></div>
          <div className="fleet reveal d1" id="fleet">
            <div className="fleet-head">
              <div className="fleet-count">
                <span className="fc-big" id="fleetCount">0</span>
                <span className="fc-lab"><b>patients</b> monitored right now</span>
              </div>
              <div className="fleet-legend">
                <span className="lg"><span className="d run" /> serving</span>
                <span className="lg"><span className="d dep" /> onboarding</span>
                <span className="lg"><span className="d srv" /> idle</span>
              </div>
            </div>
            <div className="fleet-grid" id="fleetGrid" />
            <p className="fleet-foot">Build an agent once, then it runs for every patient who subscribes. Each one runs on its own, around the clock — and <b>each one is recurring revenue you don't have to be there for.</b></p>
          </div>
        </div>
      </section>

      {/* ══════════════ CAPABILITIES EXPLORER ══════════════ */}
      <section className="sec" id="capabilities">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow center">Capabilities</p>
            <h2 className="h-section">Far more than a chatbot — a capable digital worker</h2>
            <p className="lead">Pick a capability to see what it actually looks like in practice.</p>
          </div>
          <div className="cap-stage reveal d1">
            <div className="cap-list" id="capList">
              <div className="cap-item active" data-cap="0"><div className="ci-ic"><i data-lucide="circle-check-big" /></div><div className="ci-t">Works, not just talks</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="1"><div className="ci-ic"><i data-lucide="book-open" /></div><div className="ci-t">Knows your business</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="2"><div className="ci-ic"><i data-lucide="plug" /></div><div className="ci-t">Uses your tools</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="3"><div className="ci-ic"><i data-lucide="globe" /></div><div className="ci-t">Browses &amp; researches</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="4"><div className="ci-ic"><i data-lucide="workflow" /></div><div className="ci-t">Handles long jobs</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="5"><div className="ci-ic"><i data-lucide="hand" /></div><div className="ci-t">Knows when to ask</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
            </div>
            <div className="cap-panel" id="capPanel" />
          </div>
        </div>
      </section>

      {/* ══════════════ LIFECYCLE LOOP ══════════════ */}
      <section className="sec dark" id="lifecycle">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow center">The lifecycle</p>
            <h2 className="h-section">Build, run, review, improve — one continuous loop</h2>
            <p className="lead">Every agent moves through the same loop. Watch it cycle, or click a stage to dig in.</p>
          </div>
          <div className="loop-stage reveal d1">
            <div className="loop-track" id="loopTrack">
              <div className="lp-card" data-step="0">
                <div className="lp-num">01</div>
                <div className="lp-ic"><i data-lucide="hammer" /></div>
                <div className="lp-t">Build</div>
                <p className="lp-d">Design an agent shaped to your business — its voice, the knowledge it draws on, the tools it uses, the limits it respects.</p>
                <div className="lp-prog"><span /></div>
                <div className="lp-arrow"><i data-lucide="chevron-right" /></div>
              </div>
              <div className="lp-card" data-step="1">
                <div className="lp-num">02</div>
                <div className="lp-ic"><i data-lucide="rocket" /></div>
                <div className="lp-t">Run</div>
                <p className="lp-d">Put the agent to work across the channels your teams and customers already use, doing real end-to-end tasks.</p>
                <div className="lp-prog"><span /></div>
                <div className="lp-arrow"><i data-lucide="chevron-right" /></div>
              </div>
              <div className="lp-card" data-step="2">
                <div className="lp-num">03</div>
                <div className="lp-ic"><i data-lucide="eye" /></div>
                <div className="lp-t">Review</div>
                <p className="lp-d">Observe how every agent performs, flag what worked and what didn't, and turn real operations into clear signal.</p>
                <div className="lp-prog"><span /></div>
                <div className="lp-arrow"><i data-lucide="chevron-right" /></div>
              </div>
              <div className="lp-card" data-step="3">
                <div className="lp-num">04</div>
                <div className="lp-ic"><i data-lucide="trending-up" /></div>
                <div className="lp-t">Improve</div>
                <p className="lp-d">Most changes apply instantly; for high-value tasks, train a specialist from your own data — a compounding advantage.</p>
                <div className="lp-prog"><span /></div>
                <div className="lp-arrow"><i data-lucide="chevron-right" /></div>
              </div>
            </div>
            <div className="loop-return"><i data-lucide="rotate-ccw" /> Every day you run it, your AI gets <span className="amber">&nbsp;better</span></div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOR DEVELOPERS ══════════════ */}
      <section className="sec persona" id="developers">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">For developers</p>
            <h2 className="h-section">Building this for someone else? Start here.</h2>
            <p className="lead">Surogate ships a ready-made kit for each professional category — medical monitoring, legal intake, accounting oversight, tutoring. Customize one for a real client instead of building agent infrastructure from zero.</p>
          </div>
          <div className="pilot-grid kit-grid reveal d1">
            <div className="aud-card show pilot-card">
              <div className="ac-ic"><i data-lucide="heart-pulse" /></div>
              <div className="ac-cat">Medical</div>
              <div className="ac-t">Monitoring kit</div>
              <p className="ac-d">Patient check-ins, symptom tracking, anomaly flags, weekly reports.</p>
            </div>
            <div className="aud-card show pilot-card">
              <div className="ac-ic"><i data-lucide="scale" /></div>
              <div className="ac-cat">Legal</div>
              <div className="ac-t">Intake kit</div>
              <p className="ac-d">Client intake, procedural Q&amp;A, contract red-flag review, escalation routing.</p>
            </div>
            <div className="aud-card show pilot-card">
              <div className="ac-ic"><i data-lucide="calculator" /></div>
              <div className="ac-cat">Accounting</div>
              <div className="ac-t">Oversight kit</div>
              <p className="ac-d">Financial monitoring, deadline tracking, proactive client alerts.</p>
            </div>
            <div className="aud-card show pilot-card">
              <div className="ac-ic"><i data-lucide="graduation-cap" /></div>
              <div className="ac-cat">Education</div>
              <div className="ac-t">Tutoring kit</div>
              <p className="ac-d">Practice drills, progress tracking, parent/guardian reporting.</p>
            </div>
          </div>
          <div className="dev-cols reveal d1">
            <div className="dev-agency">
              <div className="da-eye"><i data-lucide="repeat" /> The agency case</div>
              <p className="da-d">Build a kit once, resell it to multiple businesses — like the booking agent one developer built for <b>Bright Dental</b>, now earning <b>&euro;450/month per clinic.</b></p>
            </div>
            <div className="dev-compare">
              <div className="dc-eye"><i data-lucide="git-compare" /> Why not just wire up APIs?</div>
              <p className="dc-d">Most workflow builders connect to other people's APIs. Surogate <b>trains, fine-tunes, deploys, and observes the agent itself</b> — on infrastructure you control.</p>
            </div>
          </div>
          <div className="dev-cta reveal">
            <a className="btn btn-dark" href="#"><i data-lucide="message-square" />Join Surogate Builders</a>
            <a className="btn btn-ghost btn-ghost-dk" href="#"><i data-lucide="git-branch" />Start with the open-source tier</a>
          </div>
        </div>
      </section>

      {/* ══════════════ EXPERT MODELS — FLYWHEEL ══════════════ */}
      <section className="sec dark" id="flywheel" style={{ background: 'var(--ink-black)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Expert models</p>
            <h2 className="h-section">Your own work, distilled into experts no one else can build</h2>
            <p className="lead">Fine-tune a small open-weights model on traces only you have. On a narrow task it matches a frontier model — at a fraction of the size, latency, and cost.</p>
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
                  <div><div className="fs-t">Capture production traces</div><p className="fs-d">Every session — prompts, tool calls, approvals, outcomes — is logged with full traces, versioned per agent.</p></div>
                </div>
                <div className="fs-item" data-node="1">
                  <div className="fs-num">02</div>
                  <div><div className="fs-t">Curate the dataset</div><p className="fs-d">Traces become training data: filtered for success, deduplicated, labeled, and split — with lineage tracked in the Hub.</p></div>
                </div>
                <div className="fs-item" data-node="2">
                  <div className="fs-num">03</div>
                  <div><div className="fs-t">Distil into an expert</div><p className="fs-d">Fine-tune a small base model on your data — SFT, then GRPO or DPO to reward the outcomes you actually want. LoRA or full.</p></div>
                </div>
                <div className="fs-item" data-node="3">
                  <div className="fs-num">04</div>
                  <div><div className="fs-t">Quantize, serve, repeat</div><p className="fs-d">Quantized to 4-bit and served behind the same gateway, the expert takes the high-volume tasks — and keeps logging traces for the next round.</p></div>
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
            <p className="exp-foot">The moat isn't access to the biggest model — it's the flywheel that turns your work into experts <b>no one else can replicate</b>.</p>
          </div>
        </div>
      </section>

      {/* ══════════════ THE WHOLE FACTORY ══════════════ */}
      <section className="sec" id="platform">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">The whole factory</p>
            <h2 className="h-section">One integrated platform: operate, library, train</h2>
          </div>
          <div className="plat-groups reveal d1">
            <div className="pg">
              <div className="pg-head"><i data-lucide="square-activity" /><span className="pg-name">Operate</span></div>
              <ul>
                <li><i data-lucide="hexagon" /><b>Agents</b></li>
                <li><i data-lucide="square-stack" /><b>Sessions</b><span className="sub">— observe &amp; evaluate</span></li>
                <li><i data-lucide="cloud" /><b>Compute</b><span className="sub">— your clusters</span></li>
              </ul>
            </div>
            <div className="pg">
              <div className="pg-head"><i data-lucide="library" /><span className="pg-name">Library</span></div>
              <ul>
                <li><i data-lucide="diamond" /><b>Models</b><span className="sub">— bring your own</span></li>
                <li><i data-lucide="zap" /><b>Skills &amp; Tools</b></li>
                <li><i data-lucide="book-open" /><b>Knowledge Bases</b></li>
              </ul>
            </div>
            <div className="pg">
              <div className="pg-head"><i data-lucide="triangle" /><span className="pg-name">Train</span></div>
              <ul>
                <li><i data-lucide="database" /><b>Datasets</b><span className="sub">— versioned hub</span></li>
                <li><i data-lucide="triangle" /><b>Training</b><span className="sub">— fine-tune &amp; RL</span></li>
                <li><i data-lucide="network" /><b>Data Hub</b></li>
              </ul>
            </div>
          </div>
          <div className="foundation reveal d2">
            <div className="f"><i data-lucide="cloud" /><span><b>Runs in the cloud</b>Nothing to host or maintain</span></div>
            <div className="f"><i data-lucide="wand-2" /><span><b>No code</b>Build in plain language</span></div>
            <div className="f"><i data-lucide="boxes" /><span><b>Bring your own compute</b>Optional — scale on your GPUs</span></div>
            <div className="f"><i data-lucide="git-branch" /><span><b>Versioned hub</b>Models &amp; datasets tracked</span></div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA / FOOTER ══════════════ */}
      <section className="cta" id="cta">
        <div className="cta-glow" />
        <div className="wrap">
          <h2 className="cta-title reveal">Stop scaling yourself.<br /><span className="amber">Start multiplying.</span></h2>
          <p className="cta-sub reveal d1">Build your first agent in minutes — free, no code, no credit card. Deploy it to the cloud, put it to work, and come back to results.</p>
          <div className="cta-actions reveal d2">
            <a className="btn btn-primary" href="https://ops.surogate.ai"><i data-lucide="arrow-right" />Start free</a>
            <a className="btn btn-ghost" href="https://docs.surogate.ai"><i data-lucide="book-open" />Read the docs</a>
          </div>
        </div>
      </section>
    </div>
  );
}
