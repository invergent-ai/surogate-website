# Surogate site v2: design

Date: 2026-10-27 · Branch: `feat/site-v2` · Status: draft for review

## 0. Decisions after the first review (2026-10-27)

These override anything below that conflicts.

- **x.ai is the benchmark for clarity, not a template.** Every page needs one element that only we
  could ship: the deployment switch in the home hero, real product footage, partner tiers, our own
  research.
- **The rabbit lives only on the Agents and Surogate pages,** as the character there (like the mascot
  on x.ai/bot). It does not appear in the menu, on home tiles, in the footer or in general mocks.
- **The menu has no icons:** product name and one line only. The preview panel has a fixed size.
- **The hero has no cycling word.** The headline is static: "Your AI, on your terms." Under the buttons
  sits a "Where should it run?" switch (Our EU cloud, Your cloud, Your hardware, Air-gapped) with a
  one-line answer.
- **No gradient frames around code windows.**
- **No layout shift.** Nothing changes size when it is hovered, clicked or switched.
- **Videos are new short silent loops:** 4 to 6 seconds, one frame size (16:10), the same window
  frame, cropped tight on one action, filmed fresh on the local stack. Loops cut from the old shorts
  are temporary.

## 1. Why

The current site is written for one reader, "a partner's engineers", and sells four things. We now sell
to enterprises, regulators, professionals, developers and partners, and we ship more than four products:
an agent platform, a desktop agent, voice, process automation, a training and serving engine, our own
inference market (llm.buzz) and our own models. Visitors cannot see that today.

v2 gives every audience a front door, with x.ai's clarity as the benchmark for structure and calm. The
content stays ours: sovereign, on-prem, European, open source, built by a lab that trains its own models
and sells through partners.

**Borrowed from x.ai:** a five-menu nav with a live-preview product menu; pill buttons; a calm light base
where colour is used on purpose (ours: aubergine bands and orange accents, §4); a product icon that
becomes a character (ours: the rabbit, §4.1); the product shown working instead of illustrated; repeated page templates;
developer proof up front (install line, SDK snippet, real prices, status link).

**Ours, with no x.ai equivalent:** sovereignty and on-prem as a headline, not a footnote; the partner
program (Silver / Gold / Diamond, revenue share); per-client pricing plus Keel priced per case; our own
models and engine (open source); real use-case films on fictional businesses; Romanian and European focus.

## 2. Information architecture

### 2.1 Nav

`[logo]  Products▾  Solutions▾  Developer▾  Company▾  Pricing  News        (Contact Sales) (Try for free ▾)`

The nav is white and sticky, with a translucent blurred background. External links show ↗ and open in a
new tab. On mobile everything collapses into one sheet with accordions.

**Products▾** is a mega-menu: a list on the left and a live preview on the right that changes on hover or
focus. The order runs from the widest audience to the most technical.

| Item | One-liner (menu copy) | Route | Preview loop |
|---|---|---|---|
| Agents | AI colleagues for every team, on your own infrastructure. | `/agents/` | An agent answering in a team chat and citing a policy (cut from the Van Dijk approval short) |
| Surogate | Your AI with its own computer. Works on your files and browser. | `/surogate/` | "month-end is Friday, close out the card": the agent opens files and runs a command |
| Voice | Voice agents that listen and answer in real time. | `/voice/` | Live waveform, with the transcript appearing word by word and then the spoken reply |
| Keel | Business processes that run agents, with approvals and audit. | `/keel/` | A case card moving Intake → Review → Approve (the existing BoardFlow drawing) |
| Train | Train and serve your own model on one engine. | `/train/` | A terminal running `surogate sft config.yaml` while the loss curve falls |
| API | Every frontier model, one API, 0% markup. | `/api/` | A model price ticker, and a curl call that streams a reply |

The desktop product is named **Surogate** ("Download Surogate"). This also strengthens the brand against
the "surrogate" misspelling (GEO audit).

Our own models do not appear in Products. They live under Company → Research and are announced in News.
Product pages say "runs on our own models" where that is true.

**Solutions▾** is a plain list:

| Item | Route | What it sells |
|---|---|---|
| Customer Stories | `/customers/` | Stories with customer names hidden ("a top-5 Romanian bank", "a national regulator") |
| Enterprise | `/solutions/enterprise/` | Sovereign deployment, SSO and audit, your cloud or your hardware |
| Government | `/solutions/government/` | Regulators and public sector; air-gapped installs |
| Banking & Insurance | `/solutions/banking-insurance/` | Regulated, on-prem, voice for call centers, Keel for cases |
| Professionals | `/solutions/professionals/` | Lawyers, doctors, accountants, teachers; sections replace the old `/for/*` pages |
| Custom Models | `/solutions/custom-models/` | "We train your model": Train plus Research, ending in Contact Sales |
| Security & Trust | `/security/` | EU hosting, on-prem, data residency, open source you can audit |
| Explore all use cases ↗ | `/solutions/` | An index of every use case and film |

**Developer▾:** API Overview (`/api/`) · Documentation ↗ (docs.surogate.ai) · Console ↗ (llm.buzz console)
· Open Source ↗ (github.com/invergent-ai) · Status ↗ (llm.buzz status).

**Company▾:** About (`/company/`) · Research (`/labs/`, labelled "Research") · Partners (`/partners/`) ·
Careers (`/careers/`) · Contact (`/contact/`).

**Contact Sales** links to `/contact/`.

**Try for free▾** is a split pill. The main part goes to ops.surogate.ai. The chevron opens three groups:
- *Use it:* Agents ↗ (ops.surogate.ai) · Surogate desktop
- *Build:* API key ↗ (llm.buzz) · Train (install command) · Jackalope ↗ (releases)
- *Business:* Contact Sales · Become a partner

### 2.2 Footer

The footer has hairline dividers and 13px links. Columns: Products · Solutions · Developers · Research ·
Partners · Company · Legal · Social. The © INVERGENT S.A. line stays.

The hardcoded "ALL SYSTEMS NORMAL" text is replaced by a "Status ↗" link, because we cannot back a claim
we do not measure.

### 2.3 URLs and redirects

| Old | New |
|---|---|
| `/gateway/` | redirects to `/api/#self-hosted` |
| `/for/{lawyers,doctors,accountants,teachers}/` | redirect to `/solutions/professionals/#<slug>` (they currently go to `/`) |
| `/for/{creators,influencers}/` | redirect to `/` (unchanged) |
| `/agencies/`, `/launch/` | redirect to `/partners/` (unchanged) |
| `/agents/`, `/keel/`, `/partners/`, `/pricing/`, `/labs/*` | kept |

All routes stay in `lib/site.js` (`ROUTES`, `REDIRECTS`, `NAV`), which also feeds the sitemap, metadata
and `llms.txt`. Every internal link ends in `/`.

## 3. Page map

Every product page uses one **product template**:
1. Announcement pill (optional)
2. Hero: H1, a sub-line, CTA pair, and a hero visual (film or live mock)
3. Proof strip: 3 real facts
4. **Sticky feature scroller.** A list on the left (the inactive items fade); on the right a sticky panel
   plays that feature's clip or diagram.
5. A "How it fits" diagram, using existing illustrations
6. Use cases: film cards
7. FAQ (as FAQPage JSON-LD)
8. The "Choose how to get started" pair

Every solution page uses one **solution template**:
1. Hero, aligned left: eyebrow, H1, CTA pair, and a row of trust badges
2. Three problem → answer cards
3. Which products it uses (links to product pages)
4. One anonymized story
5. Deployment options (cloud / your cloud / on-prem / air-gapped)
6. Contact Sales band

### 3.1 Home `/`

1. Announcement pill: `New · Surogate 3.7 Flash, free this week on llm.buzz ↗`. The text lives in
   `lib/site.js`, so swapping it is a one-line change.
2. Hero: "Your AI, on your terms, / for everything you **run**." The last word cycles
   *run → automate → hear → train → own*. Sub-line: "Agents, voice and your own models, on your hardware or
   ours. Built in Europe." Buttons: Try for free › and Contact Sales.
3. Bento of six products, in two rows of three:
   - Row 1: Agents (ivory), Surogate (ivory), Voice (dark)
   - Row 2: Keel (ivory), Train (dark terminal), API (ivory ticker)
   - Each tile is a muted, looping clip or live mock, with "Explore →".
4. **"One API. Every model."** A tabbed snippet (Python / TypeScript / cURL) against `api.llm.buzz/api/v1`,
   in an orange gradient frame, with a Copy button. Buttons: Get API key ↗ and Read docs ↗. This reuses the
   existing CodeSample content.
5. Stat strip, with every number sourced and dated in `lib/`: models on llm.buzz · 0% token markup ·
   Jackrabbit 2,531× realtime · Apache-2.0 engine.
6. **Sovereign by design.** A four-step deployment ladder (our cloud → your cloud → your hardware →
   air-gapped), reusing the HomeHero stack drawing, re-inked. Trust line: "Running at a top-5 Romanian
   bank, an insurer and national regulators."
7. **Watch it work.** A film strip of the 7 use-case shorts (Ursu, Clarke, Van Dijk, Pop, Mette, Ortega,
   Van Dijk ML). Clicking one opens the full film in a lightbox.
8. Research strip: Surogate 3.x, Jackrabbit, Amami, Rune, with links to `/labs/`.
9. Partners band: "Build a practice on Surogate". Silver / Gold / Diamond badges (existing
   `partnerBadges`), linking to `/partners/`.
10. Latest news: 4 cards.
11. "Choose how to get started": *Build on your own* (Try for free) or *Work with us* (Contact Sales, or
    find a partner).

### 3.2 Products

Every product page follows the product template above. The patterns come from x.ai's product pages
(`/bot`, `/voice`, `/build`, `/api/imagine`). The content, mocks and character are ours.

**Shared devices:**
- **The product plays itself.** The hero is a scripted mock of our real UI, built in React from
  `components/film/ui`, or a cut from our films. It is never a static screenshot.
- **The rabbit is in the headline.** The pose glyph sits inline at 1em ("Meet [rabbit] Surogate").
- **System chips inside threads** carry the claims that would otherwise need a paragraph:
  "Updated memory · Ursu Tutor", "Handed to · Finance agent", "Held for your OK", "Created routine ·
  Month-end close".
- **The primary button changes per page:**
  - Surogate: "Download ▾", or "Request early access" until a public build exists (§8)
  - Agents: "Start building"
  - Train: a copy box for the install command
  - API: "Get API key"
- **Every number shown is a fact from `lib/stats.js`,** with its source.

#### `/agents/` · Agents

1. **Hero.** "Meet [rabbit] Agents: AI colleagues for every team." Sub: "Design, test, govern and run agents
   for whole teams, without code, in your cloud or on your own hardware." Visual: a Studio mock playing
   itself. On the left, an agent list with coloured rabbit avatars (Support Desk, Approvals, Research,
   Onboarding). On the right, a thread where an agent works through an approval and ends in "Held for your
   OK".
2. **Statement card.** "Brief it like a colleague." An ivory card, with a large rabbit breaking out of its
   corner.
3. **Give each agent a job.** A chip picker that re-skins a phone or chat mock with that agent's real
   output. The jobs come from our seven demo businesses: Tutor (Ursu), Physio check-ins (Clarke), Lead
   desk (Ortega), Knowledge shop (Mette), Translator (Pop), Approvals (Van Dijk), Model trainer (Van Dijk
   ML).
4. **Sticky scroller.** Each step shows a tutorial cut (t01–t15) or a short:
   - Setup without code
   - Knowledge and skills
   - Channels: web, Slack, Teams, Telegram, WhatsApp
   - Long-running missions and loops
   - Governance and approvals
   - The improvement loop
5. **Works where your team works.** A channel grid. The existing Channels and Runtime sections are
   restyled.
6. **Sovereign.** An aubergine band with `everythingInsideYourNetworkStudio`, redrawn in the new style.
7. **Compare.** The existing table, restyled.
8. **Watch the stories.** The 7 full films in a lightbox.
9. **Pricing.** Pilot / Production / Scale cards. Each card leads with its signature capability.
10. **FAQ.** Sticky title on the left, accordion on the right.
11. **Closing.** "Meet your first agent." An outlined rabbit peeks up from the footer rule.

#### `/surogate/` · Surogate (desktop)

1. **Hero.** "Meet [rabbit] Surogate: your AI with its own computer." Sub: "It works on your files, runs
   commands in a sandbox and uses your browser, then hands back finished work." Visual: a desktop-app mock
   that plays itself, in three steps:
   - You write "month-end is Friday, close out the card for me."
   - The timestamp jumps overnight.
   - A run report appears ("✓ Read 14 files ✓ Matched 212 lines ✓ 3 need you"), ending in "Held for your
     OK".
2. **Its own computer.** A sandbox pane with a "You're in control / Surogate is driving" badge that flips
   as control passes. This is the clearest way to show "its own computer".
3. **2×2 cards:**
   - Works on your files: a file tree with diffs.
   - Uses your browser: it signs in with your permission.
   - Hands off to your team's agents: "Looping in · Approvals agent".
   - Remembers: "Updated memory".
4. **Private by default.** An aubergine band: your files stay on your machine, sandboxed commands, the
   models you choose (via the API or on-prem).
5. **Download.** OS-detected rows. Until a public release URL exists, the rows become "Request early
   access" (mailto).
6. **FAQ, then a closing CTA** with the footer rabbit peek.

#### `/voice/` · Voice

1. **Hero.** "Voice agents that sound local." Sub: "Speech recognition and voices we train ourselves. Runs
   on our cloud or inside your call center." Buttons: Contact Sales, and "Listen to the voices" (anchors to
   the samples).
2. **Voice avatar.** Voice's own being is the rabbit with sound rings. Its rings pulse with the audio level.
3. **Sticky scroller.** The panel is a call transcript and waveform, with scenario tabs: Support,
   Appointments, Collections, Reception. Steps:
   - Understands Romanian and English (Jackrabbit)
   - Speaks in local voices (Amami: Doina, Tudor, Radu)
   - Fast enough for a phone call
   - Uses your tools mid-call
   - On-prem for regulated teams
4. **Bento of mini-UIs:**
   - A voice picker with real audio samples (from `lib/speech-demos.json`)
   - A call scrubber with a tool-call marker on the waveform
   - A playbook editor
   - A guardrail turn ("I can't read that back, let me verify you another way")
   - One large real stat: Jackrabbit 5.69% WER on FLEURS-ro
5. **Benchmark table.** Jackrabbit against Whisper large-v3, with the source cited. The data comes from
   `/labs/speech/`.
6. **Closing CTA,** then FAQ.
7. **Rule for the "under 200 ms" claim.** The menu copy becomes "Voice agents that listen and answer in real
   time". The 200 ms figure appears only after an end-to-end measurement is in `lib/stats.js`.

#### `/keel/` · Keel

1. **Hero.** "Processes that run agents. Not the other way around." The existing copy stays. Visual: the
   BoardFlow drawing, restyled into the new palette.
2. **Teach it once.** A recording bar: "Keel is watching · Supplier onboarding". The steps become stages on
   a board.
3. **Sticky scroller.** The panel moves one case card through its stages, with system chips: "Approval
   limit €10k · routed to Finance", "Audit entry #4812", "Replayed from stage 2". Steps:
   - Stages
   - Approval limits
   - People in the loop
   - Audit and replay
   - Runs your agents
4. **Problem → Promises → Pillars.** The existing content, condensed and restyled.
5. **Priced per case.** $0.20 / $0.10 / $0.05, shown with bar glyphs.
6. **The Van Dijk approval film,** then FAQ, then the closing CTA.

#### `/train/` · Train

1. **Hero.** "Train and serve your own model." The hero is the product: a copy box with
   the install line from `ENGINE.install` in `lib/labs.js`, and chips for Docs ↗, GitHub ↗ and Apache-2.0. A
   spec row below shows real numbers from `/labs/engine`.
2. **Sticky scroller.** The panel is one dark aubergine terminal replaying each step: `surogate sft
   config.yaml`, the loss curve, the eval scoreboard, `surogate serve`. Steps:
   - Your data in
   - SFT, distillation, RL (GRPO)
   - FP8 / NVFP4 / GGUF
   - Evaluate
   - Serve on the same engine
3. **Prefer clicking?** Jackalope, the desktop GUI: pick a model, a dataset and GPUs, then Launch. Release
   downloads ↗.
4. **Benchmarks.** A table with source chips, from `/labs/engine` (EngineCores).
5. **The Van Dijk ML scoreboard film:** "Two engineers trained on their own chats."
6. **We'll train it for you.** An aubergine band linking to `/solutions/custom-models/` and Contact Sales,
   using the hat-rabbit pose.

#### `/api/` · API

1. **Hero.** "Every frontier model. One API." On the left: sub, Get API key ↗ and Read docs ↗. On the
   right: a code window in a sun-gradient frame, with Python, TypeScript and cURL tabs and a Copy button.
2. **A request in motion.** A mock where one request goes in, the router picks a provider, and the price
   and latency show (rabbit pose: leaping along the request lines).
3. **Sticky "On this page" bar,** then a 3-step quickstart (key → base URL → call).
4. **Models and prices.** A short table with real rows, linking to llm.buzz for all of them. 0% token
   markup and the 5.5% top-up fee are stated plainly.
5. **Works with Claude Code, Codex and OpenCode,** with a short setup for each.
6. **EU providers,** including Surogate Spark EU.
7. **`#self-hosted` (aubergine band).** "Or run the same router inside your network." All Gateway content:
   Routing, Controls, Compatible, Deploy, with Contact Sales.
8. **FAQ,** then the "Choose how to get started" pair.

### 3.3 Solutions

| Page | Content |
|---|---|
| `/solutions/` | A grid of every use case: industry × product, each linking to a film or page |
| `/solutions/enterprise/` | Sovereign deployment, SSO/SCIM, audit, budgets per team (via the gateway), Keel for regulated processes |
| `/solutions/government/` | Air-gapped installs, EU data residency, open source you can audit, procurement-friendly (Bid as proof that we know public tenders, without naming it) |
| `/solutions/banking-insurance/` | Call-center voice, KYC/AML case handling in Keel, on-prem, a bank and an insurer story (anonymized) |
| `/solutions/professionals/` | Sections `#lawyers`, `#doctors`, `#accountants`, `#teachers`. Each has a persona film (Pop the translator, Clarke the physio, Ursu the tutor), the personal plans, and "sell your agent" |
| `/solutions/custom-models/` | The process (data → train → evaluate → serve), our models as proof, the Train engine, ending in Contact Sales |
| `/security/` | Where data lives; deployment options; encryption; open-source repositories; responsible disclosure email |
| `/customers/` | 3–5 anonymized stories: bank, insurer, energy company, regulator, plus the fictional film businesses, clearly labelled as demos |

### 3.4 Developer, Pricing, Company, News

- **`/api/`** covers the developer overview too. It adds a 3-step quickstart (get a key → set the base URL
  → call), a model and price table that links to llm.buzz, and an FAQ.
- **`/pricing/`** has a segmented switch with four tabs:
  - *Individual:* Free / Standard $19 / Pro $96 / Max $190
  - *Teams:* Pilot $0 for 60 days / Production $990 / Scale $2,990, with Keel per case at $0.20 / $0.10 / $0.05
  - *Enterprise:* on-prem and air-gapped, priced by quote, ending in Contact Sales
  - *API:* 0% markup and the 5.5% top-up fee, linking to llm.buzz

  Each tab gets its own FAQ. Building for clients links to `/partners/`. The client plan prices move out of
  `ClientPricing.jsx` into `lib/pricing.js`.
- **`/company/`**: the mission ("Your AI, on your terms"), Invergent S.A. and Surogate, values 01–03, team
  photos (already in `public/`), a timeline of releases, offices, and the Person JSON-LD that the GEO audit
  asked for.
- **`/labs/*`** (the menu label is "Research") is restyled into the new system with its URLs kept. The
  Surogate 3.x language models are added to the index.
- **`/partners/`** keeps its content and all partner rules (no "certified", no payout mechanics), restyled.
  Tiers: Silver (sign up, no fee) · Gold (1 client live, directory listing and leads) · Diamond (3 clients
  live, 40% share, early access, a direct line to our engineers) · founding partners get Diamond terms for
  12 months.
- **`/careers/`**: a short page with open roles, or "write to us" by mailto.
- **`/contact/`**: Sales, Partners, Support and Press, each with a mailto, plus Discord. There is no form
  yet (§8).
- **`/news/`** and **`/news/<slug>/`**: dated posts written as Markdown-in-JS in `lib/news.js`, rendered
  statically, with Article JSON-LD and a "last updated" date. Launch posts: Surogate 3.7 Flash on llm.buzz,
  Jackrabbit and Amami, Engine release, Keel launch.

## 4. Visual system

Tokens are defined once, in `tailwind.config.js`, and mirrored as CSS variables in `globals.css`.
`.st-home` and the film tokens read from those variables instead of keeping their own copies.

| Token | Value | Use |
|---|---|---|
| `ink` | `#0a0a0a` | Text, primary pill |
| `ink-60` / `ink-30` | ink at 60% / 30% | Secondary and tertiary text |
| `paper` | `#ffffff` | Page background |
| `ivory` | `#f9f8f6` | Cards and tiles (no border, no shadow) |
| `stone` | `#f2f1ef` | Secondary pill, hovered menu row |
| `hairline` | `#e4e4e7` | Section dividers |
| `aubergine` | `#2a102d` | Brand bands: developer split, sovereign, partners, closing CTA, footer |
| `night` | `#1a0a1c` (aubergine-2) | Terminals and dark tiles. They are aubergine-black, not neutral grey, so even code reads as ours |
| `cream` | `#f3ead8` | Ink on aubergine: text and rabbit illustrations |
| `sun` | `#ffaf10` | The accent: the "New" tag, highlights, gradient frames, focus rings, the "live" thing in a drawing |
| `grad-sun` | the existing sun gradient | The code-window frame and one hero glow |

The rhythm is light first and aubergine second. Pages open white and ivory for clarity, and roughly every
third section is a full-bleed aubergine band. That makes aubergine the brand's signature colour instead of
a wall of dark. Wine is retired.

### 4.1 The rabbit as a character

The star-rabbit (`public/brand/*`, `surogate-mascot.svg`) is used the way x.ai uses the Grok bot icon:
less a logo pasted in a corner, more a character living in the product.

- **Mark:** the full logo with the rabbit in the nav; the rabbit in its circle (white, aubergine or orange)
  as the favicon, avatar and app icon.
- **Agent avatar:** in every UI mock and menu preview, the agent's chat bubble carries the rabbit avatar.
- **Thinking indicator:** a small CSS animation of the rabbit's ears or tail replaces three dots. Under
  reduced motion it is static.
- **One pose per product.** Each pose is the official silhouette (from `public/brand/rabbit.svg`) plus one
  attribute, drawn as a line glyph used on menu items, tiles, page heroes and the favicon of that page:

  | Product | Pose |
  |---|---|
  | Agents | Rabbit and a small crowd (three rabbits in a row): a team |
  | Surogate | Rabbit inside a window frame with a cursor: "its own computer" |
  | Voice | Rabbit with sound rings from its ears |
  | Keel | Rabbit on a track with three stage ticks |
  | Train | The hat-rabbit (`hat-rabbit.svg`): "pull your own model out of the hat" |
  | API | Rabbit leaping along a stream of request lines: one endpoint, many models |

- **Our own illustration style.** llm.buzz is only the precedent for the idea (a site that made the mark
  its own); nothing is taken from its art or code.
  - On surogate.ai the rabbit lives in this site's language: clean single-weight strokes and flat fills.
    It is cream on aubergine bands and ink or orange on light, sitting on the 16px-radius cards and pills
    the rest of the site uses.
  - Big illustrations (the sovereign deployment ladder, the Research index, product heroes) are drawn
    fresh in that style, in `components/site/rabbit/`.
- **One component, many sizes.**
  - `<Rabbit pose mood size color>` is a single inline SVG. The only parts that move are the eye
    (blink, glance) and the ear tip (twitch). Colour comes from `--rabbit-fg` and `--rabbit-bg`.
  - Sizes, from small to large:
    1. A 1em glyph inline in the H1
    2. 20–24px agent avatars, one colour per agent from a fixed set of six drawn from the brand palette
    3. A thinking spinner (an ear twitch on a loop)
    4. A statement character of about 480px breaking out of a card
    5. An outline rabbit peeking up from the footer rule on product pages
  - Agents in a team cluster together as a group of avatars.
- **Limits:** never more than one rabbit pose per viewport, apart from the menu. The rabbit is never
  redrawn freehand: every pose starts from the official silhouette path.

- **Type:**
  - Inter for everything. Display at weights 450–500, letter-spacing -1%, line-height 1.0. Body at 400,
    UI at 500. Fraunces is removed from the `h1–h4` defaults.
  - Size scale: 60 / 48 / 36 / 30 / 24 / 20 / 16 / 14 / 13 / 12. JetBrains Mono for code.
- **Shape:** pills (9999px) for every button; 16px card radius; 12px bento gap. This reverses the
  square-corner rule.
- **Spacing:** a 1200px container, about 128px between sections, hairline rules between major sections.
- **Motion:** opacity and transform only. Self-playing loops, the cycling hero word, numbers that count up,
  and the sticky scroller. Everything respects `prefers-reduced-motion`: it shows the final frame, the
  word stops cycling, and video shows its poster image.
- **Dark mode:** not in v2. The site is light with aubergine bands; the dark tiles are designed to be dark.

## 5. Media plan

**Rule change.** VIDEOS.md currently says "no screen recordings". v2 allows real UI captures when they are
filmed on the local stack (`videos/LOCAL-STACK.md`) using the fictional tenants (Ursu, Clarke, Ortega,
Mette, Pop, Van Dijk, Van Dijk ML), then polished through the Capture pipeline (no cursor in the capture;
camera, cursor and captions added in Remotion). Production (ops.surogate.ai) and real client tenants are
never filmed. Hand-built Remotion replicas stay in use where they already exist.

1. **Reuse first.** Use `videos/renders/` (7 full stories, 14 shorts in 1:1 and 9:16, the guide chapters).
   - Cut 4–8 second muted loops for tiles and scroller panels with ffmpeg, exported as H.264 and WebM plus a
     poster, each under 1.5 MB, stored in `public/media/`.
   - The full films are linked or lightboxed, not autoplayed.
   - `dr-pretorian-guide` was filmed on a real client's tenant, so it is **excluded** unless the client
     approves.
2. **New captures on the local stack** for the products that have no footage yet:
   - Surogate desktop: a file task, plus a browser task
   - Voice: Jackrabbit and Amami through `surogate serve --tts`, combined with an agent
   - Keel: a case moving through stages
   - Train: an `sft` run and its loss curve
   These follow the product-videos playbook: seed, rehearse, capture, track.json, Remotion.
3. **Live mocks in React** where a loop would be cheaper as code: the price ticker, the code tabs, the
   chat bubbles in the menu preview. They use the existing film UI kit (`components/film/ui`).
4. Every on-screen number must exist in `lib/` with its source. No passwords, keys, IPs or real people on
   screen. The engine's internal research name and the toolkit vendor are never shown (existing rule).

## 6. Architecture

- The build stays a static export to GitHub Pages behind Cloudflare. **No new npm dependencies.** ffmpeg is
  a dev-time tool, not a dependency.
- Shared components in `components/site/`:
  - `Button` (pill, three variants), `SplitButton`, `Container`, `Section`, `SectionHead`, `Card`
  - `Pill` (announcement), `Bento`/`Tile`, `LoopVideo` (muted, playsinline, lazy, poster, reduced-motion)
  - `StickyScroller`, `CodeTabs`, `StatStrip`, `GetStarted`, `Faq`, `MegaMenu`, `Lightbox`
- Page sections stay in `components/<page>/`, as today.
- Content lives in data files: `lib/site.js` (routes, nav, announcement), `lib/products.js` (the six
  products: menu copy, preview media, tile media), `lib/pricing.js` (all four tabs), `lib/news.js`,
  `lib/solutions.js`, `lib/stats.js` (sourced numbers).
- Analytics: every CTA keeps its PostHog event (check-links enforces this). New events: `nav_menu_open`,
  `try_free_option`, `contact_sales`.
- SEO and GEO:
  - One H1 per page, question-style H2s where they read naturally.
  - JSON-LD per page type: Product, FAQPage, Article, Person, BreadcrumbList.
  - Sitemap and `llms.txt` regenerated from `ROUTES`.
  - A "Surogate is…" definition sentence on Home and Company.

## 7. Phases

Each phase ends with `npm test`, `npm run build`, `check:links`, `check:layout` (360 / 390 / 1440, with
reduced motion), and a screenshot review before the next phase starts.

1. **Foundation.** Tokens, shared components, nav with the mega-menu and Try-for-free dropdown, footer,
   home page, media cutting for the home tiles.
2. **Products.** The product template, then the six pages, then the redirects (`/gateway/`). New captures
   for Surogate, Voice, Keel and Train run alongside this phase.
3. **Solutions, API and Pricing.** The solution template, the 7 solution pages (including the `/solutions/` index and `/security/`), `/customers/`, `/api/`, and
   Pricing with tabs. Redirects for `/for/*`.
4. **Company and News.** `/company/`, the restyled Research (`/labs/*`), `/partners/`, `/careers/`,
   `/contact/`, `/news/` with the launch posts, and the new OG image.

## 8. Open items

Each of these has a default; changing one does not block a phase.

| Item | Default |
|---|---|
| Surogate desktop has no public download URL | The CTA is "Request early access" (mailto) until a release URL exists |
| Contact Sales form | Mailto per team on `/contact/`; a Firestore-backed form later (`functions/` exists) |
| Privacy and Terms pages (GEO audit) | Not written by us; linked when legal provides the text |
| Customer names | Anonymized; real names are swapped in as approvals arrive |
| Jackalope in the Try menu | Shown, because it has public releases |
| Router is "open source" in copy but the repo is private | The copy says "self-hosted", not "open source", until the repo is public |
| Rune SDK provenance (MIT upstream) | Rune is presented as our model and API; the SDK is not claimed as original work |
| Approvals | Flavius reviews screenshots per phase; nothing is pushed to `main` without them |
