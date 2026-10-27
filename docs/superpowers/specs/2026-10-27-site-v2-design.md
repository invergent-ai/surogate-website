# Surogate site v2: design

Date: 2026-10-27 · Branch: `feat/site-v2` · Status: draft for review

## 1. Why

The current site is written for one reader, "a partner's engineers", and sells four things. We now sell
to enterprises, regulators, professionals, developers and partners, and we ship more than four products:
an agent platform, a desktop agent, voice, process automation, a training and serving engine, our own
inference market (llm.buzz) and our own models. Visitors cannot see that today.

v2 gives every audience a front door, with x.ai's clarity as the benchmark for structure and calm. The
content stays ours: sovereign, on-prem, European, open source, built by a lab that trains its own models
and sells through partners.

**Borrowed from x.ai:** a five-menu nav with a live-preview product menu; pill buttons; a near-monochrome
palette with one rare accent; the product shown working instead of illustrated; repeated page templates;
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
| Voice | Voice agents that listen and answer in under 200 ms. | `/voice/` | Live waveform, with the transcript appearing word by word and then the spoken reply |
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

| Page | Hero | Scroller features | Reused from the current site | New media |
|---|---|---|---|---|
| `/agents/` | "AI colleagues for every team." | Setup without code · Skills and knowledge · Channels (web, Slack, Teams, Telegram, WhatsApp) · Long-running missions · Governance and approvals · The improvement loop | TourFilm and its tutorial cuts (t01–t15); `howATurnRunsA`, `everythingInsideYourNetworkStudio`, `theImprovementLoop` drawings; Compare table | Shorts: Van Dijk approval, Clarke knee photo, Ortega Monday leads |
| `/surogate/` | "Your AI with its own computer." | Works on your files · Runs commands in a sandbox · Uses your browser · Hands off to your team's agents | none | New capture of the desktop app on the local stack (§5) |
| `/voice/` | "Voice agents that sound local." | Speech-to-text (Jackrabbit) · Text-to-speech (Amami: Doina, Tudor, Radu) · Sub-200 ms turn · On-prem for call centers | Speech demos and audio samples from `/labs/speech/` (`lib/speech-demos.json`) | A Remotion waveform and transcript scene |
| `/keel/` | "Processes that run agents." | Stages · Approval limits · Audit and replay · Priced per case | Every current Keel illustration; BoardFlow; Pillars | A Van Dijk approval cut |
| `/train/` | "Train and serve your own model." | `curl … install.sh` box · SFT, distillation, RL · FP8/NVFP4/GGUF · `surogate serve` · Jackalope desktop GUI | `/labs/engine` content (EngineCores); film scenes SceneTrainRun, SceneGrpoCharts, SceneDistillConfig | The Van Dijk ML scoreboard short |
| `/api/` | "Every frontier model. One API." | OpenAI- and Anthropic-compatible · Routing to the cheapest or fastest provider · 0% markup · EU providers (including Surogate Spark EU) · Works with Claude Code, Codex, OpenCode · **Self-hosted** (`#self-hosted`): the same router inside your network | All Gateway sections and illustrations (Routing, Controls, Compatible, Deploy) | A price-ticker mock |

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
| `night` | `#121212` | Terminals and dark tiles |
| `sun` | `#ffaf10` | The single accent: the "New" tag, highlights, gradient frames, focus rings |
| `grad-sun` | the existing sun gradient | The code-window frame only |

The aubergine and wine colours are retired from the page chrome. They survive only inside the films,
which keep their own look.

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
- **Dark mode:** not in v2. The site is light; the dark tiles are designed to be dark.

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
