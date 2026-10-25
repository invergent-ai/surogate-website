# Surogate site redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the retail-era surogate.ai with the partner site designed on the claude.ai canvas: a new home page, plus `/agents`, `/keel`, `/partners` and `/pricing`, with the old pages retired.

**Architecture:** Each canvas artboard becomes one App Router page. Each page composes section components under `components/<page>/`, styled with Tailwind using the brand tokens already in `tailwind.config.js`. A new shared shell (nav, footer, buttons, section heading, closing card) lives in `components/site/`. One module, `lib/site.js`, holds the routes, the nav, the footer, the redirects and the contact links. Retired URLs become static redirect pages, because GitHub Pages cannot redirect on the server.

**Tech Stack:** Next.js 15 App Router with `output: 'export'` and `trailingSlash: true`, React 19, Tailwind 3, `node --test`, and headless Google Chrome for layout checks.

**Spec:** `docs/design/site-redesign/`. It holds the seven artboards exactly as they stand on the canvas (`Main`, `Agents`, `Agents-2`, `Keel`, `Partners`, `Pricing`, `Sitemap`, all `.dc.html`) and `canvas.json`. `Sitemap.dc.html` is the route plan. The other artboards are the pages, pixel for pixel. `illustrations/` holds the scripts that drew the SVG illustrations, kept as their source.

## Global Constraints

- The artboards are the spec. Port their markup, copy, sizes and colours exactly. `{{accent}}` is `#ffaf10` (`brand-orange`).
- Copy is verbatim from the artboards. There is one exception: on the home page, "we'll introduce you to a certified partner" becomes "we'll introduce you to a partner". There is no certification; tiers count sales only.
- Never mention how or when partners are paid.
- Contact is `surogate@invergent.ai` (mailto) and Discord `https://discord.gg/eVTq93BrQ4`. There are no forms.
- Fonts: Inter for all text on the new pages, including headings. `globals.css` sets `h1–h4` to Fraunces, so new headings carry `font-sans`. JetBrains Mono appears only where the artboard uses it.
- Square corners everywhere. No `rounded-*` on new components.
- No new npm dependencies.
- SVG illustrations are inlined from the artboards verbatim. Their `aria-label`s stay. Their own `@media (prefers-reduced-motion)` rules stay.
- Every internal link ends with `/`, because `trailingSlash: true` is set.
- Delete retired pages and components outright, with no legacy fallbacks.
- No commits until Flavius has seen the screenshots and approved them. Never push to `main`: a push to `main` deploys to production through `.github/workflows/deploy.yml`.

### Link map (artboard href → site href)

| artboard | site |
|---|---|
| logo `#top` | `/` |
| `#agents`, `Agents.dc.html` | `/agents/` |
| `#keel` (nav and footer), `Keel.dc.html` | `/keel/` |
| `#partners`: nav "Partners", nav and section "Become a partner" | `/partners/` |
| footer "Partner directory" | `/partners/#directory` |
| "Find a partner", "Tell us what you need" | `mailto:surogate@invergent.ai?subject=Find%20a%20Surogate%20partner` |
| `#pricing` | `/pricing/` |
| Keel `#contact`: "Book a demo", "Draft your process" | `mailto:surogate@invergent.ai?subject=Keel%20demo` |
| Partners `#models` "See the models" | `/labs/` |
| footer "Labs" | `/labs/` |
| footer "Contact" | `mailto:surogate@invergent.ai` |
| footer "Legal" | removed: there is no legal page. The footer keeps "© 2026 SIMPLEMINDS S.R.L" from today's `components/Footer.jsx` |
| Pricing "Start a pilot", "Go to production", "Choose Scale" | `https://ops.surogate.ai` |
| Pricing "Compare personal plans →" | `/pricing/personal/` |
| Pricing "Become a partner" | `/partners/` |
| same-page anchors (`#pillars`, `#directory`, `#top`) | unchanged |

### Routes

| route | from | notes |
|---|---|---|
| `/` | `Main.dc.html` | |
| `/agents/` | `Agents.dc.html` then `Agents-2.dc.html` | one page. The hero placeholder is replaced by `FilmPlayer variant="full"` |
| `/keel/` | `Keel.dc.html` | |
| `/partners/` | `Partners.dc.html` | |
| `/pricing/` | `Pricing.dc.html` | the artboard has no nav or footer; the page adds the shell |
| `/pricing/personal/` | today's `/pricing/` | `PricingClient` moves here unchanged |
| `/labs/…` | unchanged | the new nav and footer reach it through the shared components |
| retired: `/agencies/`, `/launch/` | redirect to `/partners/` | |
| retired: `/for/{accountants,creators,doctors,influencers,lawyers,teachers}/` | redirect to `/` | |

## Review Focus

1. **Phone width (390 px).** The artboards rely on `flex-wrap`, `clamp()` and `min-width: 0`. One fixed width or one missing `min-w-0` scrolls the page sideways. Each page task runs `scripts/check-layout.mjs`, which fails when `scrollWidth` exceeds the viewport.
2. **Retired URLs.** Old links and search results point at `/agencies/`, `/launch/` and `/for/*/`. They must land on the new page, never on a 404 or a blank page. Task 7's check asserts that each exported redirect page refreshes to a live route.
3. **Broken internal links and anchors.** The artboards link to sections that don't exist on the site. `scripts/check-links.mjs` fails on any internal href or `#anchor` that doesn't resolve in `out/`.
4. **Duplicate SVG ids on one page.** Inlined SVGs share the document's id namespace, so a second `id="soft"` silently breaks a glow, and a second badge gradient breaks a badge. `check-links.mjs` also fails on duplicate ids within a page.
5. **Reduced motion.** The two animated illustrations (Keel and Partners) must show their finished frame when reduced motion is on. Each task checks a screenshot with `--force-prefers-reduced-motion`.

---

### Task 1: Site shell and site data

**Files:**
- Create: `lib/site.js`, `lib/site.test.mjs`
- Create: `components/site/Button.jsx`, `components/site/Container.jsx`, `components/site/SectionHead.jsx`, `components/site/ClosingCard.jsx`, `components/site/InlineSvg.jsx`
- Create: `components/site/illustrations/partnerBadges.js` (the three badge SVGs from `Main.dc.html`)
- Replace: `components/Nav.jsx`, `components/Footer.jsx` (from the artboards' NAV and FOOTER)
- Create: `scripts/check-layout.mjs`
- Modify: `package.json` (add `"check:layout": "node scripts/check-layout.mjs"`)

**Interfaces:**
- Produces `lib/site.js`:
  - `CONTACT = { email: 'surogate@invergent.ai', discord: 'https://discord.gg/eVTq93BrQ4' }`
  - `mailto(subject?: string): string`, which URL-encodes the subject.
  - `ROUTES: { path: string, title: string, description: string }[]`, covering live routes only.
  - `REDIRECTS: Record<string, string>`, mapping a retired path to a live path.
  - `NAV: { label: string, href: string, external?: boolean }[]`: Agents, Keel, Partners, Docs, Pricing.
  - `FOOTER: { title: string, links: { label: string, href: string }[] }[]`
- Produces `Button({ href, children, variant = 'primary' | 'secondary', tone = 'dark' | 'light', event?: string })`. It renders a `TrackedLink` when `event` is set, and copies the artboard's 52 px buttons: primary is orange on aubergine text; secondary is a 1 px outline.
- Produces `Container({ children, className })`, the artboards' `max-width: 1200px; margin: 0 auto; padding: 0 24px`.
- Produces `SectionHead({ title, sub, tone = 'light' | 'dark', as = 'h2' })`, the artboards' h2 at `clamp(32px, 3.8vw, 48px)` and 19 px sub.
- Produces `ClosingCard({ title, body, actions })`, the dark card from each artboard's CLOSING.
- Produces `InlineSvg({ markup, className })`, which renders trusted markup through `dangerouslySetInnerHTML`.
- Produces `partnerBadges = { silver, gold, diamond }` as markup strings.
- `Nav` takes no props and marks the current route from `usePathname()`. At 768 px and wider it is the artboard nav. Below that it collapses to today's menu button and panel behaviour (open state, Escape, body scroll lock), restyled dark.

- [ ] **Step 1:** Create a git worktree on branch `feat/site-redesign` (superpowers:using-git-worktrees) and run `npm ci`.
- [ ] **Step 2: Write the failing tests** in `lib/site.test.mjs`:
  - `test('every redirect lands on a live route', …)`: every value of `REDIRECTS` is a `path` in `ROUTES`.
  - `test('no live route is also retired', …)`: no key of `REDIRECTS` is a `ROUTES` path.
  - `test('retired paths match the site map', …)`: the keys equal exactly `/agencies/`, `/launch/` and the six `/for/<x>/` paths.
  - `test('mailto encodes the subject', …)`: `mailto('Keel demo') === 'mailto:surogate@invergent.ai?subject=Keel%20demo'` and `mailto() === 'mailto:surogate@invergent.ai'`.
- [ ] **Step 3:** Run `npm test`. Expected: FAIL, because `lib/site.js` does not exist.
- [ ] **Step 4:** Implement `lib/site.js` from the Routes table and the Link map.
- [ ] **Step 5:** Run `npm test`. Expected: PASS.
- [ ] **Step 6:** Build the shell components and replace `Nav` and `Footer`. Social links are not in the artboard footer; keep YouTube, LinkedIn and Instagram from today's footer as plain links in the Company column. Labs pages pick up the new shell without changes.
- [ ] **Step 7:** Write `scripts/check-layout.mjs <route> [<route>…]`. For each route and for widths 390 and 1440, it copies `out/<route>/index.html` to a temporary file, injects `<script>document.title = 'W' + document.documentElement.scrollWidth</script>`, runs `google-chrome --headless=new --window-size=<w>,900 --dump-dom`, and fails when the reported width is greater than `<w>`. It also writes `--screenshot` PNGs to `/tmp/site-shots/<route>-<w>.png`, plus a `-reduced.png` taken with `--force-prefers-reduced-motion`.
- [ ] **Step 8:** Run `npm run build && npm run check:layout /labs/ /labs/speech/`. Expected: both pass. The screenshots show the dark nav and footer over the unchanged Labs content.

### Task 2: Home page

**Files:**
- Replace: `app/page.jsx`
- Create: `components/home/{HomeHero,Platform,CodeSample,KeelTeaser,Delivery,Deployment,PartnerProgram}.jsx`, one per artboard section, named after the `<!-- … -->` comments in `Main.dc.html`
- Create: `components/home/illustrations/*.js`, one markup module per SVG that `Main.dc.html` draws
- Delete: `components/home/ShowTell.jsx`, `app/home.css` (once nothing else imports it; check with `grep`)
- Keep: `components/home/FilmPlayer.tsx`, which Task 3 uses

**Interfaces:** consumes everything Task 1 produces. `PartnerProgram` uses `partnerBadges`.

- [ ] **Step 1:** Port `Main.dc.html` from HERO through PARTNERS. Keep the DEPLOYMENT section: the page lost its nav link, but the section stays. Apply the "certified partner" copy change.
- [ ] **Step 2:** Set the page `metadata` from the `ROUTES` entry for `/`. The title is "Surogate - Your workforce, multiplied." and the description is the hero sub.
- [ ] **Step 3:** Run `npm run build && npm run check:layout /`. Expected: PASS at both widths. Compare `/tmp/site-shots/-1440.png` with the artboard rendered at 1440: sections, spacing and copy match.

### Task 3: Surogate Agents page

**Files:**
- Create: `app/agents/page.jsx`
- Create: `components/agents/*.jsx`, one per section in `Agents.dc.html` (HERO, PATH, SOVEREIGN, SETUP, RUNTIME) then `Agents-2.dc.html` (LONG RUNNING, CHANNELS, IMPROVE, COMPARE, SELL, CLOSING)

**Interfaces:** consumes Task 1. The hero mounts `FilmPlayer` from `components/home/FilmPlayer.tsx` with `variant="full"` in place of the placeholder `div[aria-label="Placeholder for the platform tour video"]`. Read `FilmPlayer`'s props before mounting it.

- [ ] **Step 1:** Port both artboards into one page, Agents first, then Agents-2 from LONG RUNNING on. Drop Agents-2's own footer in favour of the shared `Footer`.
- [ ] **Step 2:** Set `metadata` from the `ROUTES` entry for `/agents/`.
- [ ] **Step 3:** Run `npm run build && npm run check:layout /agents/`. Expected: PASS. The hero shows the film player at 16:9.

### Task 4: Keel page

**Files:**
- Create: `app/keel/page.jsx`
- Create: `components/keel/{KeelHero,Problem,Promises,Pillars,BoardFlow,KeelClosing}.jsx`
- Create: `components/keel/illustrations/{improvise,boardFlow,promise1,promise2}.js`

**Interfaces:** consumes Task 1.

- [ ] **Step 1:** Port `Keel.dc.html`. The features section's animated SVG (`.kf-*` classes, 12 s loop) and the three-part card under it go into `BoardFlow.jsx`. The pillars are four static panels; the artboard no longer has tabs.
- [ ] **Step 2:** Set `metadata` from the `ROUTES` entry for `/keel/`.
- [ ] **Step 3:** Run `npm run build && npm run check:layout /keel/`. Expected: PASS. In `keel-1440-reduced.png` the flow panel is open, the agent's lines are written and three votes are filled.

### Task 5: Partners page

**Files:**
- Create: `app/partners/page.jsx`
- Create: `components/partners/{PartnersHero,Earn,Deliver,HowItWorks,Tiers,Directory}.jsx`
- Create: `components/partners/illustrations/{earn,agentToClients}.js`

**Interfaces:** consumes Task 1. `Tiers` uses `partnerBadges`, the same markup as the home page's partner program. Every mailto comes from `mailto()`.

- [ ] **Step 1:** Port `Partners.dc.html`, including the `#directory` anchor that the footer links to.
- [ ] **Step 2:** Set `metadata` from the `ROUTES` entry for `/partners/`.
- [ ] **Step 3:** Run `npm run build && npm run check:layout /partners/`. Expected: PASS. In `partners-1440-reduced.png` all four clients are live and all eight bars are drawn.

### Task 6: Pricing

**Files:**
- Replace: `app/pricing/page.jsx` (the new client pricing from `Pricing.dc.html`)
- Create: `components/pricing/ClientPricing.jsx`, holding the sections of `Pricing.dc.html` in order
- Move: `app/pricing/PricingClient.jsx` → `app/pricing/personal/PricingClient.jsx`, with a new `app/pricing/personal/page.jsx` that carries today's `/pricing/` metadata and canonical `https://surogate.ai/pricing/personal/`

**Interfaces:** consumes Task 1.

- [ ] **Step 1:** Port `Pricing.dc.html` inside the shared `Nav` and `Footer`, with the Link map's targets for its buttons.
- [ ] **Step 2:** Move personal pricing to `/pricing/personal/` and point "Compare personal plans →" there.
- [ ] **Step 3:** Run `npm run build && npm run check:layout /pricing/ /pricing/personal/`. Expected: PASS on both.

### Task 7: Retire old routes; site-wide metadata, sitemap and link check

**Files:**
- Create: `components/site/Redirect.jsx`
- Replace: `app/agencies/page.jsx`, `app/launch/page.jsx`, `app/for/*/page.jsx` (each renders `<Redirect to={REDIRECTS[path]} />`)
- Delete: `app/launch/LaunchClient.jsx`, `app/agencies.css`, `app/for.css`, `components/agencies/`, `components/for/`, `components/launch/`, and any `components/*.jsx` that nothing imports afterwards (check each with `grep -r`)
- Modify: `app/sitemap.js` (emit `ROUTES`), `app/layout.jsx` (default `metadata` for the new positioning; OG image alt text), `app/structured-data.js` (site description), `public/llms.txt` (describe the new pages)
- Create: `scripts/check-links.mjs`
- Modify: `package.json` (`"check:links": "node scripts/check-links.mjs"`), `.github/workflows/deploy.yml` (run `npm run check:links` after Build)

**Interfaces:** consumes `ROUTES` and `REDIRECTS` from Task 1.
- `Redirect({ to })` renders `<meta httpEquiv="refresh" content={`0; url=${to}`} />`, `<link rel="canonical" href={`https://surogate.ai${to}`} />` and a visible link to `to`. Its page `metadata` sets `robots: 'noindex'`.

- [ ] **Step 1:** Write `scripts/check-links.mjs`. It walks `out/**/*.html` and fails, listing every offender, on:
  - an internal `href` or `src` with no file in `out/`;
  - an `#anchor` with no element of that `id` on the target page;
  - a duplicate `id` within one page;
  - a redirect page (one carrying `http-equiv="refresh"`) whose target is not a live route.
- [ ] **Step 2:** Run it on today's build: `npm run build && npm run check:links`. Expected: it reports what the earlier tasks left broken, if anything, and the redirect pages don't exist yet.
- [ ] **Step 3:** Replace the retired pages with `Redirect`, delete the dead code, and update the sitemap, layout metadata, structured data and `llms.txt`.
- [ ] **Step 4:** Run `npm test && npm run build && npm run check:links`. Expected: all pass. Also, `grep -l 'url=/partners/' out/agencies/index.html out/launch/index.html` lists both files.

### Task 8: Review, approval, commits and PR

- [ ] **Step 1:** Run `npm run check:layout / /agents/ /keel/ /partners/ /pricing/ /pricing/personal/ /labs/`. Put the 1440 and 390 screenshots of each page next to the matching artboard render, and send them to Flavius.
- [ ] **Step 2:** Wait for his approval. Fix what he asks, then re-run Task 7 Step 4 and this task's Step 1.
- [ ] **Step 3:** After approval, commit per task with Conventional Commits, for example `feat(site): shell, nav and footer for the partner site`. Use no co-author trailer and no plan or task numbers in messages.
- [ ] **Step 4:** Push the branch and open a PR against `main`. Never push to `main` itself.

## Out of scope (for Flavius to decide later)

- `functions/` holds the launch signup Cloud Functions, which are deployed separately. Retiring `/launch/` leaves them unused but still deployed.
- A new OG image for the partner positioning. The current one shows the old "Multiply yourself" artwork.
- The home page DEPLOYMENT section stays as designed, even though its nav link is gone.
- The site map's "docs.surogate.ai gains a Keel section and the API reference" belongs to the docs repo, not this one.
