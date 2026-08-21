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
/* Shared inline styles for the ported design's screenshot frames and chips —
   the design uses .st-home CSS variables, so these stay inline rather than
   growing five more one-off rules in app/home.css. */
const FRAME = { border: '1px solid var(--line2)', borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: 'var(--shadow-card)' };
const CAPTION = { margin: '14px 0 0', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--txt-3)' };
const CHIP = { fontFamily: 'var(--mono)', fontSize: 11, padding: '5px 9px', border: '1px solid var(--line2)', borderRadius: 999, color: 'var(--txt-3)' };

function Shot({ src, alt, caption, className }) {
  return (
    <div className={className}>
      <div style={FRAME}><img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} /></div>
      <p style={CAPTION}>{caption}</p>
    </div>
  );
}

/* Slack and Telegram in their own brand colours. Lucide has no brand icons, so
   these are the official marks: Slack's four-colour hash, and the Telegram
   plane on its brand blue. */
function SlackMark() {
  return (
    <svg viewBox="0 0 127 127" width="24" height="24" aria-hidden="true">
      <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A" />
      <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0" />
      <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D" />
      <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E" />
    </svg>
  );
}

function TelegramMark() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#26A5E4" />
      <path d="M16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="#fff" />
    </svg>
  );
}

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="#25D366" />
    </svg>
  );
}

const MARKS = { slack: SlackMark, telegram: TelegramMark, whatsapp: WhatsAppMark };

function ChannelIcon({ brand, icon }) {
  const Mark = MARKS[brand];
  return Mark ? <Mark /> : <i data-lucide={icon} />;
}

const CHANNELS = [
  { name: 'Web chat', icon: 'globe',
    d: 'A hosted chat page behind a link. Replies stream token by token, and every tool call the agent makes is there to read.',
    id: 'signed-in user · full session history' },
  { name: 'Slack', brand: 'slack',
    d: 'It answers in the thread where the work already is. Slash commands and buttons behave the way your team expects them to.',
    id: 'DMs · @mentions · threads' },
  { name: 'Telegram', brand: 'telegram',
    d: 'A bot people already know how to talk to — one to one, in a group, or inside a single forum topic.',
    id: 'DMs · groups · forum topics' },
  { name: 'WhatsApp', brand: 'whatsapp',
    d: "Meta's official Business Cloud API on your own number. The agent answers; it never cold-messages anyone.",
    id: 'one to one · your business number' },
  { name: 'Your website', icon: 'code-2',
    d: 'One script tag puts the agent on your public site, for visitors who have no account with you at all.',
    id: 'publishable key · origin allow-list' },
  { name: 'API', icon: 'plug',
    d: 'Submit prompts from a pipeline or a batch job and read the results straight back out of the session log.',
    id: 'service-account token · no user' },
];

const GUARANTEES = [
  { icon: 'lock', t: 'Guardrails locked at session start', d: 'A running task cannot talk its way into wider permissions. What was allowed when the session opened is what stays allowed.' },
  { icon: 'key-round', t: 'Credentials in a vault', d: "MCP servers use your secrets without the agent's runtime ever seeing them. Used, never exposed." },
  { icon: 'box', t: 'Network-restricted sandbox', d: 'Code the agent writes runs sandboxed and restricted, and integrations are scanned for tampering before they load.' },
  { icon: 'file-text', t: 'Durable event log', d: 'Sessions run on a durable log, so a crashed worker resumes rather than losing work - and every action stays auditable.' },
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

    /* 2 · AGENT DEMO ─────────────────────────────────────────── */
    (function agent() {
      const feed = $('#agentFeed'); if (!feed) return;
      const replayBtn = $('#agentReplay');
      const steps = [
        { d: 700, html: `<div class="fi-step done"><div class="ic"><i data-lucide="search-check"></i></div><div class="bd"><div class="lbl">Looked at her last three attempts.</div><div class="fi-sub">&rarr; the balancing is fine - grams to moles is where it breaks</div></div></div>` },
        { d: 900, html: `<div class="fi-step done"><div class="ic"><i data-lucide="corner-left-down"></i></div><div class="bd"><div class="lbl">Went <b>back one lesson</b> and re-taught moles with two short questions - no answer given away.</div></div></div>` },
        { d: 950, html: `<div class="fi-step done"><div class="ic"><i data-lucide="circle-check"></i></div><div class="bd"><div class="lbl">She solved the original problem herself on the second try.</div></div></div>` },
        { d: 850, html: `<div class="fi-approve" id="apCard"><div class="ap-h"><i data-lucide="hand"></i> I need your input</div><div class="ap-d">She wants to skip ahead to next week&rsquo;s chapter. What a student is ready for is your call, not the agent&rsquo;s.</div><div class="ap-btns"><button class="ap-btn yes" id="apYes">Let her ahead</button><button class="ap-btn no">Hold</button></div></div>` },
        { d: 700, html: `<div class="fi-result"><div class="rs-h"><i data-lucide="circle-check-big"></i> By the time you looked</div><div class="rs-grid"><div class="rs-c"><div class="n">9 min</div><div class="l">Session, while you taught the class</div></div><div class="rs-c"><div class="n">1</div><div class="l">Gap found and closed</div></div><div class="rs-c"><div class="n">0</div><div class="l">Answers handed over</div></div></div></div>` },
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
            if (idx === steps.length - 2) {
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
          d: 'An agent follows a multi-step process to completion - making decisions, using your systems, and delivering a finished result rather than a suggestion. If anything restarts mid-run, it resumes exactly where it left off.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="workflow"></i> task: process refund request #4821</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="dr-ic run"><i data-lucide="loader"></i></div><div class="dr-t"><b>Verify</b> order &amp; eligibility</div><div class="dr-tag run">running</div></div>
              <div class="demo-row" data-i="1"><div class="dr-ic run"><i data-lucide="loader"></i></div><div class="dr-t"><b>Issue</b> refund via payments API</div><div class="dr-tag run">running</div></div>
              <div class="demo-row" data-i="2"><div class="dr-ic run"><i data-lucide="loader"></i></div><div class="dr-t"><b>Update</b> ticket &amp; notify customer</div><div class="dr-tag run">running</div></div>
              <div class="demo-row" data-i="3"><div class="dr-ic"><i data-lucide="circle-check-big"></i></div><div class="dr-t">Refund of <b>$129.00</b> completed</div><div class="dr-tag">2.1s</div></div>
            </div></div>` },
        { eye: 'Grounded in your knowledge', t: 'Knows your business',
          d: 'Answers and actions draw on your own documentation, policies, and institutional memory - extended with reusable skills and task-specialized expert models. Specific and cited, not a generic guess.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="book-open"></i> knowledge base &middot; skills &amp; experts</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="demo-bubble user">What's our SLA for enterprise incidents?</div></div>
              <div class="demo-row" data-i="1"><div class="dr-ic run"><i data-lucide="loader"></i></div><div class="dr-t">Routing your question…</div><div class="dr-tag run">…</div></div>
              <div class="demo-row" data-i="2"><div class="demo-bubble agent"><span class="tw"></span><span class="src"></span></div></div>
            </div></div>` },
        { eye: 'Connected to your stack', t: 'Uses your tools',
          d: 'Agents act inside the platforms you already run, with credentials held in a secure vault - used, never exposed.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="plug"></i> connected tools &middot; secure vault</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="dr-ic run"><i data-lucide="loader"></i></div><div class="dr-t"><b>Salesforce</b> - read &amp; write</div><div class="dr-tag run">connecting</div></div>
              <div class="demo-row" data-i="1"><div class="dr-ic run"><i data-lucide="loader"></i></div><div class="dr-t"><b>Jira</b> - create issues</div><div class="dr-tag run">connecting</div></div>
              <div class="demo-row" data-i="2"><div class="dr-ic run"><i data-lucide="loader"></i></div><div class="dr-t"><b>Postgres</b> - query</div><div class="dr-tag run">connecting</div></div>
              <div class="demo-row" data-i="3"><div class="dr-ic"><i data-lucide="shield"></i></div><div class="dr-t">Credentials never seen by the model</div><div class="dr-tag">sealing</div></div>
            </div></div>` },
        { eye: 'Live web &amp; browser', t: 'Browses &amp; operates the web',
          d: 'Research across live sources into cited results - and drive a real browser to get things done. When a step needs a human, like a login, MFA, or a CAPTCHA, it hands you the wheel, then picks back up.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="globe"></i> vendor portal &middot; live browser</div>
            <div class="brw">
              <div class="brw-bar"><span class="brw-dots"><i></i><i></i><i></i></span><span class="brw-url">portal.vendor.com/booking</span></div>
              <div class="brw-body">
                <div class="brw-field"><label>Travel dates</label><div class="brw-input" id="brwF1"></div></div>
                <div class="brw-field"><label>Sign-in</label><div class="brw-input" id="brwF2"></div></div>
                <div class="brw-cta" id="brwCta">Continue</div>
                <div class="brw-cursor" id="brwCur"><i data-lucide="mouse-pointer-2"></i></div>
                <div class="brw-handoff" id="brwHO"><div class="ho-card"><i data-lucide="hand"></i><b>Your turn</b><span>Sign in &amp; approve MFA</span></div></div>
                <div class="brw-status" id="brwSt">driving</div>
              </div>
            </div></div>` },
        { eye: 'Hours-long autonomy', t: 'Handles long jobs',
          d: 'Pursue a goal over hours or days - fanning work out to sub-agents, tracking progress against a plan, and judging its own results against a rubric until the mission is met.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="list-checks"></i> migration mission &middot; 3h 42m elapsed</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t">Phase 1 - schema mapping</div><div class="dr-tag">done</div></div>
              <div class="demo-row" data-i="1"><div class="dr-ic run"><i data-lucide="loader"></i></div><div class="dr-t"><b>3 sub-agents</b> migrating 1.2M rows<div class="subs"><span class="sub"><i></i></span><span class="sub"><i></i></span><span class="sub"><i></i></span></div></div><div class="dr-tag run">working</div></div>
              <div class="demo-row" data-i="2"><div class="dr-ic"><i data-lucide="gauge"></i></div><div class="dr-t">Validation vs. rubric<div class="pbar"><span class="pf" id="rubFill"></span></div></div><div class="dr-tag"><span id="rubPct">0%</span></div></div>
            </div></div>` },
        { eye: 'Human in the loop', t: 'Knows when to ask',
          d: 'Pauses for human approval on irreversible or low-confidence actions, then resumes - with a full audit trail of every decision.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="hand"></i> approval gate &middot; writes</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="demo-bubble agent">About to <b>delete 320 stale records</b>. This is irreversible - approve?</div></div>
              <div class="demo-row" data-i="1"><div class="gate" id="gate"><span class="gate-wait"><i data-lucide="loader"></i> awaiting approval</span><span class="gate-btns"><button type="button" class="gate-btn yes" id="gYes">Approve</button><button type="button" class="gate-btn">Hold</button></span></div></div>
              <div class="demo-row" data-i="2"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t"><b>Approved</b> by Dana &middot; Finance Ops</div><div class="dr-tag">logged</div></div>
              <div class="demo-row" data-i="3"><div class="dr-ic ok"><i data-lucide="check"></i></div><div class="dr-t">Action completed &amp; audit entry written</div><div class="dr-tag">14:22</div></div>
            </div></div>` },
        { eye: 'Meets users where they are', t: 'Works across your channels',
          d: 'The same agent shows up wherever your team already works - web chat, Slack, Telegram, or your own apps over the API - sharing one memory and history across every channel.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="messages-square"></i> one agent &middot; every channel</div>
            <div class="demo-body">
              <div class="ch-wrap"><div class="ch-rail"><span class="ch-fill" id="chFill"></span></div>
              <div class="ch-rows">
                <div class="demo-row ch-row" data-i="0"><div class="dr-ic ok"><i data-lucide="message-square"></i></div><div class="dr-t"><b>Slack</b> - @mention in #ops</div><div class="dr-tag">live</div></div>
                <div class="demo-row ch-row" data-i="1"><div class="dr-ic ok"><i data-lucide="send"></i></div><div class="dr-t"><b>Telegram</b> - DMs &amp; group threads</div><div class="dr-tag">live</div></div>
                <div class="demo-row ch-row" data-i="2"><div class="dr-ic ok"><i data-lucide="globe"></i></div><div class="dr-t"><b>Web</b> chat &amp; embedded widget</div><div class="dr-tag">live</div></div>
                <div class="demo-row ch-row" data-i="3"><div class="dr-ic"><i data-lucide="code"></i></div><div class="dr-t"><b>API</b> - same memory &amp; history</div><div class="dr-tag">shared</div></div>
              </div></div>
            </div></div>` },
        { eye: 'Secure by design', t: 'Safe to put to work',
          d: 'Every tool call clears a policy gate with fine-grained rules, credentials never reach the model\'s sandbox, and every action lands in an immutable audit log. Sessions run on a durable event log, so a crash never loses work.',
          demo: `<div class="demo-card"><div class="dc-bar"><i data-lucide="shield-check"></i> governance &amp; resilience</div>
            <div class="demo-body">
              <div class="demo-row" data-i="0"><div class="dr-ic eval"><i data-lucide="scale"></i></div><div class="dr-t"><b>refund_user</b> - checking policy</div><div class="dr-tag run">eval</div></div>
              <div class="demo-row" data-i="1"><div class="dr-ic"><i data-lucide="lock-open"></i></div><div class="dr-t">Credentials &amp; model sandbox</div><div class="dr-tag">…</div></div>
              <div class="demo-row" data-i="2"><div class="dr-ic"><i data-lucide="file-text"></i></div><div class="dr-t">Audit log<span class="mono" id="auditHash"></span></div><div class="dr-tag run">writing</div></div>
              <div class="demo-row" data-i="3"><div class="dr-ic"><i data-lucide="rotate-ccw"></i></div><div class="dr-t">Worker crashed - session resumed, <b>0 lost</b></div><div class="dr-tag">durable</div></div>
            </div></div>` },
      ];
      let demoTickets = [];
      const after = (ms, fn) => { const id = setTimeout(fn, reduceMotion ? 0 : ms); demoTickets.push(id); return id; };
      const show = (r) => r && r.classList.add('show');
      const setIc = (r, name, cls) => { const ic = r && r.querySelector('.dr-ic'); if (!ic) return; ic.className = 'dr-ic ' + (cls || ''); ic.innerHTML = `<i data-lucide="${name}"></i>`; icons(); };
      const setRowText = (r, html) => { const el = r && r.querySelector('.dr-t'); if (el) el.innerHTML = html; };
      const setTag = (r, txt, cls) => { const g = r && r.querySelector('.dr-tag'); if (!g) return; g.textContent = txt; g.className = 'dr-tag ' + (cls || ''); };
      const typeInto = (el, text, done) => {
        if (!el) { done && done(); return; }
        if (reduceMotion) { el.textContent = text; done && done(); return; }
        el.classList.add('tw-on'); let i = 0;
        const tick = () => { el.textContent = text.slice(0, i); i += 1; if (i <= text.length) after(20, tick); else { el.classList.remove('tw-on'); done && done(); } };
        tick();
      };

      const players = {
        // Works, not just talks - steps execute to completion
        0(p) {
          const r = $$('.demo-row', p); let t = 250;
          [0, 1, 2].forEach((i) => {
            const at = t;
            after(at, () => show(r[i]));
            after(at + 560, () => { setIc(r[i], 'check', 'ok'); setTag(r[i], 'done'); });
            t += 680;
          });
          after(t + 180, () => show(r[3]));
        },
        // Knows your business - route, then type a cited answer
        1(p) {
          const r = $$('.demo-row', p);
          after(250, () => show(r[0]));
          after(880, () => show(r[1]));
          after(1480, () => { setIc(r[1], 'check', 'ok'); setRowText(r[1], 'Loaded <b>Support</b> skill &middot; consulted <b>Policy</b> expert'); setTag(r[1], 'routed'); });
          after(2050, () => {
            show(r[2]);
            const tw = p.querySelector('.tw');
            typeInto(tw, 'Enterprise P1 incidents have a 15-minute response SLA and a 4-hour resolution target.', () => {
              if (tw) tw.innerHTML = 'Enterprise P1 incidents have a <b>15-minute</b> response SLA and a <b>4-hour</b> resolution target.';
              const src = p.querySelector('.src');
              if (src) ['SLA-policy.pdf', 'support-tiers.md'].forEach((c, k) => after(200 * (k + 1), () => { const s = document.createElement('span'); s.className = 'chip pop'; s.textContent = c; src.appendChild(s); }));
            });
          });
        },
        // Uses your tools - connect each tool, then seal the vault
        2(p) {
          const r = $$('.demo-row', p); let t = 250;
          [0, 1, 2].forEach((i) => {
            const at = t;
            after(at, () => show(r[i]));
            after(at + 540, () => { setIc(r[i], 'check', 'ok'); setTag(r[i], 'vaulted'); });
            t += 620;
          });
          after(t + 140, () => show(r[3]));
          after(t + 420, () => { const ic = r[3].querySelector('.dr-ic'); if (ic) ic.classList.add('seal'); setTag(r[3], 'secure'); });
        },
        // Browses & operates the web - drive a browser, hand off, resume
        3(p) {
          const cur = p.querySelector('#brwCur'); const ho = p.querySelector('#brwHO');
          const f1 = p.querySelector('#brwF1'); const f2 = p.querySelector('#brwF2');
          const cta = p.querySelector('#brwCta'); const st = p.querySelector('#brwSt');
          const setSt = (txt, cls) => { if (st) { st.textContent = txt; st.className = 'brw-status ' + (cls || ''); } };
          if (reduceMotion) {
            if (f1) f1.textContent = 'Apr 18 – 22';
            if (f2) f2.innerHTML = 'signed in <i data-lucide="check"></i>';
            if (cta) { cta.classList.add('ok'); cta.textContent = 'Booked'; }
            if (cur) cur.style.display = 'none';
            setSt('booking submitted', 'done'); icons(); return;
          }
          after(450, () => cur && cur.classList.add('p1'));
          after(1200, () => typeInto(f1, 'Apr 18 – 22'));
          after(2150, () => { cur && cur.classList.remove('p1'); cur && cur.classList.add('p2'); });
          after(2800, () => { cta && cta.classList.add('press'); setSt('needs you', 'you'); });
          after(3050, () => cta && cta.classList.remove('press'));
          after(3250, () => { ho && ho.classList.add('on'); if (cur) cur.style.opacity = '0'; });
          after(4700, () => { ho && ho.classList.remove('on'); if (f2) { f2.innerHTML = 'signed in <i data-lucide="check"></i>'; icons(); } setSt('resumed', ''); if (cur) cur.style.opacity = '1'; });
          after(5300, () => cta && cta.classList.add('press'));
          after(5550, () => cta && cta.classList.remove('press'));
          after(5750, () => { cta && cta.classList.add('ok'); if (cta) cta.textContent = 'Booked'; setSt('booking submitted', 'done'); if (cur) cur.style.opacity = '0'; });
        },
        // Handles long jobs - sub-agents fan out, rubric judges
        4(p) {
          const r = $$('.demo-row', p);
          after(300, () => show(r[0]));
          after(820, () => { show(r[1]); $$('.sub i', r[1]).forEach((b, k) => after(140 * k, () => { b.style.width = '100%'; })); });
          after(2150, () => { setIc(r[1], 'check', 'ok'); setTag(r[1], 'done'); });
          after(2550, () => {
            show(r[2]);
            const fill = p.querySelector('#rubFill'); const pct = p.querySelector('#rubPct');
            after(60, () => { if (fill) fill.style.width = '71%'; });
            let v = 0; const tickv = () => { v += 3; if (v >= 71) v = 71; if (pct) pct.textContent = `${v}%`; if (v < 71) after(34, tickv); };
            tickv();
            setTag(r[2], 'judging', 'run');
          });
        },
        // Knows when to ask - pause, approve, resume with audit
        5(p) {
          const r = $$('.demo-row', p);
          after(300, () => show(r[0]));
          after(950, () => show(r[1]));
          after(2050, () => { const y = p.querySelector('#gYes'); y && y.classList.add('press'); });
          after(2450, () => { const g = p.querySelector('#gate'); g && g.classList.add('done'); });
          after(2650, () => show(r[2]));
          after(3200, () => show(r[3]));
        },
        // Works across channels - each pings in, shared memory links them
        6(p) {
          const r = $$('.ch-row', p);
          r.forEach((row, i) => after(350 + i * 520, () => { show(row); row.classList.add('ping'); }));
          const tEnd = 350 + r.length * 520;
          after(tEnd + 200, () => { const f = p.querySelector('#chFill'); if (f) f.style.height = '100%'; });
          after(tEnd + 1000, () => setTag(r[3], 'synced'));
        },
        // Safe to put to work - gate, seal, audit, crash & resume
        7(p) {
          const r = $$('.demo-row', p); const card = p.querySelector('.demo-card');
          after(300, () => show(r[0]));
          after(1100, () => { setIc(r[0], 'check', 'ok'); setRowText(r[0], '<b>refund_user</b> allowed - verified &amp; under $1,000'); setTag(r[0], 'policy'); });
          after(1550, () => show(r[1]));
          after(2150, () => { setIc(r[1], 'lock', 'seal'); setRowText(r[1], 'Credentials sealed from the model sandbox'); setTag(r[1], 'isolated'); });
          after(2600, () => { show(r[2]); typeInto(p.querySelector('#auditHash'), ' #a91f0c committed', () => { setIc(r[2], 'check', 'ok'); setTag(r[2], 'immutable'); }); });
          after(3850, () => { if (!reduceMotion && card) { card.classList.add('crash'); after(560, () => card.classList.remove('crash')); } });
          after(4250, () => show(r[3]));
        },
        def(p) { $$('.demo-row', p).forEach((r, idx) => after(220 + idx * 520, () => show(r))); },
      };

      function render(n) {
        demoTickets.forEach((t) => clearTimeout(t)); demoTickets = [];
        const c = caps[n];
        panel.innerHTML =
          `<div class="cp-eye">${c.eye}</div>` +
          `<div class="cp-t">${c.t}</div>` +
          `<p class="cp-d">${c.d}</p>` +
          `<div class="cap-demo">${c.demo}</div>`;
        icons();
        (players[n] || players.def)(panel);
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

    /* 5 · PRODUCT TOUR TABS ──────────────────────────────────── */
    (function tour() {
      const tabs = $$('#tourTabs .aud-tab');
      const panels = $$('[data-tour-panel]');
      if (!tabs.length) return;
      tabs.forEach((t) => t.addEventListener('click', () => {
        const n = t.dataset.tour;
        tabs.forEach((x) => x.classList.toggle('on', x === t));
        panels.forEach((p) => { p.style.display = p.dataset.tourPanel === n ? '' : 'none'; });
        queueScan();
      }));
    })();

    /* 6 · COPILOT PALETTE ────────────────────────────────────── */
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

      {/* ══════════════ PROOF - SEE IT WORK ══════════════ */}
      <section className="sec" id="agent" style={{ background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">See it work</p>
            <h2 className="h-section">A student is stuck. The agent finds out why.</h2>
            <p className="lead">The chemistry teacher's tutoring agent from the cards above. One student, one short session, and it never simply hands over the answer.</p>
          </div>
          <div className="agent-stage reveal d1">
            <div className="agent-task">
              <div className="at-label">Session &middot; live</div>
              <div className="at-prompt">I keep getting this one wrong and I don&rsquo;t know why.</div>
              <div className="at-from">
                <div className="av"><i data-lucide="user" /></div>
                <div className="meta"><b>Student &middot; web chat</b>picked up by the teacher's tutoring agent</div>
              </div>
              <div className="at-meta-list">
                <div className="row"><span>Agent</span><b>tutoring &middot; v1.0</b></div>
                <div className="row"><span>Deployed for</span><b>a chemistry teacher</b></div>
                <div className="row"><span>Runs on</span><b>Surogate Cloud</b></div>
                <div className="row"><span>Works with</span><b>every student, at their own pace</b></div>
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
          <p className="agent-compliance reveal"><i data-lucide="shield-check" /> The agent teaches on the teacher's own method. When something is the teacher's call, it stops and asks.</p>
        </div>
      </section>

      {/* ══════════════ PRODUCT TOUR ══════════════ */}
      <section className="sec" id="product" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">The platform</p>
            <h2 className="h-section">Two modes: run agents, or build them</h2>
            <p className="lead">That agent - and every one on this page - lives in the same two places. Work mode is for the people using deployed agents day to day. Develop mode is where they are designed, trained, evaluated and governed. Same platform, same project, one session log.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="aud-tabs" id="tourTabs">
              <button type="button" className="aud-tab on" data-tour="0"><i data-lucide="briefcase-business" />Work mode</button>
              <button type="button" className="aud-tab" data-tour="1"><i data-lucide="code-2" />Develop mode</button>
            </div>
          </div>

          <div className="aud-panel reveal" data-tour-panel="0">
            <div className="intro-grid">
              <div>
                <div className="intro-points">
                  <div className="ipoint">
                    <div className="ip-ic"><i data-lucide="messages-square" /></div>
                    <div><div className="ip-t">Chat with deployed agents</div><p className="ip-d">Talk to an agent, hand it a task, review what it did. Attach a skill or a knowledge base in plain language - no configuration files.</p></div>
                  </div>
                  <div className="ipoint">
                    <div className="ip-ic"><i data-lucide="inbox" /></div>
                    <div><div className="ip-t">Missions, sub-agents, inbox</div><p className="ip-d">Long-running work graded against success criteria, delegated parts handled by sub-agents, and an inbox where approvals wait for a human.</p></div>
                  </div>
                  <div className="ipoint">
                    <div className="ip-ic"><i data-lucide="share-2" /></div>
                    <div><div className="ip-t">Publish to your channels</div><p className="ip-d">Put the same agent on web chat, Slack, Telegram, an embeddable widget, or your own app over the API.</p></div>
                  </div>
                  <div className="ipoint">
                    <div className="ip-ic"><i data-lucide="thumbs-up" /></div>
                    <div><div className="ip-t">Flag good and bad turns</div><p className="ip-d">Every message, tool call and result is recorded and replayable. Flagging a turn is what feeds the next round of training.</p></div>
                  </div>
                </div>
              </div>
              <div>
                <div style={FRAME}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 18px', borderBottom: '1px solid var(--line2)', background: 'var(--paper-2)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txt-3)' }}>
                    <i data-lucide="message-square" style={{ width: 14, height: 14, color: 'var(--amber)' }} />
                    <span>session &middot; support-triage</span>
                    <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />live</span>
                  </div>
                  <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ alignSelf: 'flex-end', maxWidth: '78%', background: 'var(--ink)', color: '#fff', borderRadius: '13px 13px 4px 13px', padding: '12px 15px', fontSize: 15, lineHeight: 1.45 }}>Draft the follow-up for ticket 4821 and refund it if policy allows.</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--txt-3)' }}>
                      <i data-lucide="zap" style={{ width: 13, height: 13, color: 'var(--amber)' }} /> skill: refunds &middot; expert: policy
                    </div>
                    <div style={{ alignSelf: 'flex-start', maxWidth: '82%', background: 'var(--paper-2)', border: '1px solid var(--line2)', borderRadius: '13px 13px 13px 4px', padding: '12px 15px', fontSize: 15, lineHeight: 1.45, color: 'var(--txt-1)' }}>Refund of <b>$129.00</b> issued and the ticket is updated. Draft reply is in your inbox for approval.</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 2 }}>
                      <span style={CHIP}>payments.refund</span>
                      <span style={CHIP}>tickets.update</span>
                      <span style={{ ...CHIP, border: '1px solid var(--amber-line)', color: 'var(--amber)' }}>awaiting approval</span>
                    </div>
                  </div>
                </div>
                <p style={CAPTION}>Work mode &middot; one agent, one recorded session</p>
              </div>
            </div>
          </div>

          <div className="aud-panel reveal" data-tour-panel="1" style={{ display: 'none' }}>
            <div className="intro-grid">
              <div>
                <div className="intro-points">
                  <div className="ipoint">
                    <div className="ip-ic"><i data-lucide="hexagon" /></div>
                    <div><div className="ip-t">Agents from configuration, not code</div><p className="ip-d">A model, a persona, skills, knowledge bases, MCP tools and guardrails - deployed as a service your users can talk to.</p></div>
                  </div>
                  <div className="ipoint">
                    <div className="ip-ic"><i data-lucide="database" /></div>
                    <div><div className="ip-t">Datasets built from real sessions</div><p className="ip-d">Training and evaluation sets from production traffic, uploads, or synthetic generation - profiled, scanned for PII, versioned in the Data Hub.</p></div>
                  </div>
                  <div className="ipoint">
                    <div className="ip-ic"><i data-lucide="triangle" /></div>
                    <div><div className="ip-t">Train experts and serve them</div><p className="ip-d">Supervised fine-tuning, LoRA and QLoRA, long-context and mixture-of-experts runs across several GPUs, plus RL against verifiable rewards or an LLM judge.</p></div>
                  </div>
                  <div className="ipoint">
                    <div className="ip-ic"><i data-lucide="shield-check" /></div>
                    <div><div className="ip-t">Governance and the API</div><p className="ip-d">Guardrails, the credential vault, the event log, and the full platform over the API for anything you want to automate yourself.</p></div>
                  </div>
                </div>
              </div>
              <Shot src="/Training-1.png" alt="A training run in Surogate Develop mode" caption="Develop mode · a training run in the Studio" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ COPILOT ══════════════ */}
      <section className="sec dark" id="copilot">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Copilot</p>
            <h2 className="h-section">You describe the work. It does it for you.</h2>
            <p className="lead">The Copilot drives the platform itself. It creates the agent, attaches the skill or the knowledge base, scales the deployment, starts the training run - and answers questions about what ran yesterday. Most of what this page describes clicking through, you can ask for instead.</p>
          </div>
          <div className="intro-grid" style={{ marginTop: 54 }}>
            <div className="reveal">
              <div id="cpPalette" style={{ border: '1px solid var(--amber-line)', borderRadius: 14, background: 'rgba(255,255,255,.03)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--line-dk)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.12em', padding: '5px 9px', border: '1px solid var(--amber-line)', borderRadius: 6, color: 'var(--amber)' }}>⌘ /</span>
                  <span id="cpType" style={{ fontSize: 17, color: 'var(--txt-d1)', minHeight: 24 }} />
                  <span id="cpCaret" style={{ width: 2, height: 20, background: 'var(--amber)', display: 'inline-block' }} />
                </div>
                <div id="cpOut" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 11, minHeight: 150 }} />
              </div>
              <p style={{ ...CAPTION, marginTop: 16, color: 'var(--txt-d3)' }}>Destructive or expensive operations show a confirmation card naming the exact resource first.</p>
            </div>
            <div className="reveal d1">
              <div className="intro-points">
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="wand-2" /></div>
                  <div><div className="ip-t" style={{ color: 'var(--txt-d1)' }}>No forms, no config files</div><p className="ip-d" style={{ color: 'var(--txt-d2)' }}>Ask in plain language and the Copilot calls the platform's own tools - the same ones the API exposes.</p></div>
                </div>
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="search" /></div>
                  <div><div className="ip-t" style={{ color: 'var(--txt-d1)' }}>It answers questions too</div><p className="ip-d" style={{ color: 'var(--txt-d2)' }}>What ran yesterday, which sessions got a thumbs-down, how the <span style={{ fontFamily: 'var(--mono)' }}>sql-writer</span> expert is performing this week.</p></div>
                </div>
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="hand" /></div>
                  <div><div className="ip-t" style={{ color: 'var(--txt-d1)' }}>Bounded on purpose</div><p className="ip-d" style={{ color: 'var(--txt-d2)' }}>Deleting anything or starting a training run needs a confirmation. The builder's view lists every operation it exposes - and what it deliberately will not do.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CAPABILITIES EXPLORER ══════════════ */}
      <section className="sec" id="capabilities">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Capabilities</p>
            <h2 className="h-section">Far more than a chatbot - a capable digital worker</h2>
            <p className="lead">Pick a capability to see what it actually looks like in practice.</p>
          </div>
          <div className="cap-stage reveal d1">
            <div className="cap-list" id="capList">
              <div className="cap-item active" data-cap="0"><div className="ci-ic"><i data-lucide="circle-check-big" /></div><div className="ci-t">Works, not just talks</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="1"><div className="ci-ic"><i data-lucide="book-open" /></div><div className="ci-t">Knows your business</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="2"><div className="ci-ic"><i data-lucide="plug" /></div><div className="ci-t">Uses your tools</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="3"><div className="ci-ic"><i data-lucide="globe" /></div><div className="ci-t">Browses &amp; operates the web</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="4"><div className="ci-ic"><i data-lucide="workflow" /></div><div className="ci-t">Handles long jobs</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="5"><div className="ci-ic"><i data-lucide="hand" /></div><div className="ci-t">Knows when to ask</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="6"><div className="ci-ic"><i data-lucide="messages-square" /></div><div className="ci-t">Works across your channels</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
              <div className="cap-item" data-cap="7"><div className="ci-ic"><i data-lucide="shield-check" /></div><div className="ci-t">Safe to put to work</div><div className="ci-chev"><i data-lucide="chevron-right" /></div></div>
            </div>
            <div className="cap-panel" id="capPanel" />
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

      {/* ══════════════ CHANNELS ══════════════ */}
      <section className="sec" id="channels" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Channels</p>
            <h2 className="h-section">One agent, everywhere your people already are</h2>
            <p className="lead">Publish the same agent to a hosted chat page, Slack, Telegram, WhatsApp, your own website, or a pipeline over the API. Every channel reaches the same agent, with the same skills and the same guardrails.</p>
          </div>
          <div className="chan-grid reveal d1">
            {CHANNELS.map((c) => (
              <div className="chan" key={c.name}>
                <div className="chan-ic"><ChannelIcon brand={c.brand} icon={c.icon} /></div>
                <div className="chan-n">{c.name}</div>
                <p className="chan-d">{c.d}</p>
                <div className="chan-id">{c.id}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ THE IMPROVEMENT LOOP ══════════════ */}
      <section className="sec dark" id="lifecycle">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow center">The improvement loop</p>
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

      {/* ══════════════ EVALUATIONS ══════════════ */}
      <section className="sec" id="evals" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Evaluations</p>
            <h2 className="h-section">Measure it before you promote it</h2>
            <p className="lead">Score an agent or a model against 40 built-in benchmarks, or against a custom benchmark built from your own failed sessions. Then A/B two candidates and promote the one that actually won.</p>
          </div>
          <div className="intro-grid" style={{ marginTop: 54 }}>
            <div className="reveal">
              <div className="intro-points">
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="list-checks" /></div>
                  <div><div className="ip-t">40 built-in benchmarks</div><p className="ip-d">Standard suites for reasoning, knowledge, safety and code, run against any model or agent in your project.</p></div>
                </div>
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="file-warning" /></div>
                  <div><div className="ip-t">Custom suites from your failures</div><p className="ip-d">The sessions that went wrong become the benchmark. A fix is only a fix when the cases that broke it pass.</p></div>
                </div>
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="git-compare" /></div>
                  <div><div className="ip-t">A/B before promoting</div><p className="ip-d">Two candidates, the same tasks, full traces and pass rates side by side - with regressions surfaced rather than discovered later.</p></div>
                </div>
              </div>
            </div>
            <Shot className="reveal d1" src="/Evaluation-BenchmarksResults.png" alt="Benchmark results in Surogate" caption="Benchmark results · Develop mode" />
          </div>
        </div>
      </section>

      {/* ══════════════ MODELS AND COMPUTE ══════════════ */}
      <section className="sec" id="compute">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Models and compute</p>
            <h2 className="h-section">Your models, your GPUs, your gateway</h2>
            <p className="lead">Serve open-weights models with quantization, autoscaling and versioned rollback - or bring your own LLM per agent and pay the provider directly. Runs execute on whatever compute you attach.</p>
          </div>
          <div className="intro-grid" style={{ marginTop: 54 }}>
            <Shot className="reveal" src="/Cloud.png" alt="Attached compute providers in Surogate" caption="Compute providers · attach and schedule" />
            <div className="reveal d1">
              <div className="intro-points">
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="diamond" /></div>
                  <div><div className="ip-t">Serving with rollback</div><p className="ip-d">Endpoints with quantization and autoscaling, versioned so a bad promotion is one call away from being undone.</p></div>
                </div>
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="cloud" /></div>
                  <div><div className="ip-t">Bring your own compute</div><p className="ip-d">AWS, GCP, Azure, OCI, Modal, RunPod, Nebius, vast.ai, or your own on-prem cluster. No migration, no lock-in.</p></div>
                </div>
                <div className="ipoint">
                  <div className="ip-ic"><i data-lucide="plug" /></div>
                  <div><div className="ip-t">Bring your own LLM</div><p className="ip-d">Point an agent at your own provider account per agent, and pay them directly instead of drawing on the plan allowance.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SECURITY AND GOVERNANCE ══════════════ */}
      <section className="sec dark" id="security">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Security and governance</p>
            <h2 className="h-section">Safe enough to hand real work to</h2>
            <p className="lead">Guardrails are locked when a session starts and cannot be weakened mid-task. Sandboxed code is network-restricted, integrations are scanned for tampering, and every action lands in the event log.</p>
          </div>
          <div className="pillars grid-2 reveal d1">
            {GUARANTEES.map((g) => (
              <div className="pcard" key={g.t} style={{ background: 'rgba(255,255,255,.03)', borderColor: 'var(--line-dk)', boxShadow: 'none' }}>
                <div className="pc-ic"><i data-lucide={g.icon} /></div>
                <div className="pc-t">{g.t}</div>
                <p className="pc-d" style={{ color: 'var(--txt-d2)' }}>{g.d}</p>
              </div>
            ))}
          </div>
          <p className="exp-foot">Enterprise adds SSO, RBAC, audit logs, dedicated compute and an SLA.</p>
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
