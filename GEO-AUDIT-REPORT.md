# GEO Audit Report: Surogate

**Audit Date:** 2026-07-01
**URL:** https://surogate.ai
**Business Type:** SaaS (AI agent platform + expert-model training) — operated by INVERGENT SA
**Pages Analyzed:** 6 primary (homepage, /pricing/, llms.txt, robots.txt, sitemap.xml) + docs.surogate.ai (30+ pages via its own sitemap) + invergent.ai

---

## Executive Summary

**Overall GEO Score: 60/100 (Fair — borderline)**

Surogate is a paradox: it has a **best-in-class technical and structured-data foundation** — server-side-rendered HTML, an open AI-crawler policy, a well-formed `llms.txt`, complete Open Graph/canonical/meta tags, and a rich JSON-LD entity graph (Organization + WebSite + SoftwareApplication + FAQPage + BreadcrumbList) that even links out to a **Wikidata entity, GitHub, LinkedIn, X, Hugging Face, and Crunchbase**. AI engines can crawl it freely and parse exactly what it is. The problem is entirely **off-site and trust-facing**: the brand is functionally anonymous (no Wikipedia article, no Reddit/Hacker News/YouTube footprint, no Product Hunt/G2), its legal/trust pages 404, and no human author or team is named anywhere. The site is superbly built for machines to *read* but gives AI systems almost no third-party evidence for *when to cite it* — and no trust surface for the healthcare/legal (YMYL) use cases it actively promotes.

**Biggest strengths:** Technical GEO (92) and AI citability of the pricing FAQ + expert-model benchmark table (77).
**Most critical gaps:** Brand authority (18) and platform citation-readiness (40) — both off-site — plus missing trust/legal pages.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 77/100 | 25% | 19.25 |
| Brand Authority | 18/100 | 20% | 3.60 |
| Content E-E-A-T | 57/100 | 20% | 11.40 |
| Technical GEO | 92/100 | 15% | 13.80 |
| Schema & Structured Data | 84/100 | 10% | 8.40 |
| Platform Optimization | 40/100 | 10% | 4.00 |
| **Overall GEO Score** | | | **60/100** |

---

## Critical Issues (Fix Immediately)

**C1. Brand is functionally invisible off-site (Brand Authority 18/100).**
No Wikipedia article (`en.wikipedia.org/wiki/Surogate` → 404); zero Reddit / Hacker News discussion; no YouTube channel; no Product Hunt, G2, Capterra, or Trustpilot listing; no press. AI engines have almost no independent corroboration that the entity exists, so they will rarely cite it unprompted. This single gap caps ChatGPT, Perplexity, and Gemini.
*Nuance:* a **Wikidata entity already exists — `Q140385440`** ("Romanian AI company… autonomous AI agents and custom language-model training," inception 2025) and is correctly referenced in the site's `sameAs`. It is a thin stub with no Wikipedia sitelink. So the action is **enrich the existing Wikidata item and build notability toward a Wikipedia article — not "create Wikidata."**
*Name-collision risk:* "surrogate" (double-r) is a common English word; without strong entity anchoring, models will not reliably disambiguate the single-r product.

**C2. No legal/trust pages — `/privacy/`, `/terms/`, `/about/`, `/security/`, `/legal/` all return 404.**
Meanwhile the homepage promotes **YMYL** use cases — patient monitoring (cardiology), legal client work — with no privacy policy, HIPAA/GDPR statement, or data-handling page on `surogate.ai` itself. This is both a trust-signal failure for AI E-E-A-T and a real compliance-perception risk. (Pricing copy claims "no training on your data," but there is no linked policy backing it.)

---

## High Priority Issues

**H1. No named authorship, founder, or team anywhere on surogate.ai.** "Who is behind this?" is currently unanswerable on-site (the CTO, Flavius Burca, is discoverable only via external LinkedIn). No `Person` schema, no bios. Largest E-E-A-T weakness.

**H2. Sitemap lists only 2 URLs (`/`, `/pricing/`).** The docs at `docs.surogate.ai` — 30+ pages of the densest, most citable technical content — have their own valid sitemap but are **not referenced from the main site**, and there is no blog/resources hub. AI systems have little long-tail surface to discover and cite.

**H3. The homepage never states, in one self-contained sentence, what Surogate *is*.** The clearest definitions live only in `llms.txt` and on invergent.ai. The killer benchmark numbers (95.8% vs 94.1% accuracy, $0.40 vs $9.20 per 1k calls, 380ms vs 2,400ms) live **only inside a table** — some extraction pipelines strip tables, losing the most citable asset on the site.

**H4. No IndexNow, Bing Webmaster Tools verification unconfirmed.** The Bing index underpins both ChatGPT web search and Copilot. `/.well-known/indexnow-key.txt` → 404; no `msvalidate.01` detected.

---

## Medium Priority Issues

**M1. Homepage H2s are statements, not questions** ("Three ways it pays off," "Far more than a chatbot"). They miss the People-Also-Ask / featured-snippet pattern that Google AI Overviews extracts. (The pricing FAQ is the one section that does this well.)

**M2. Statistics and case studies lack source attribution.** Benchmark figures and the named personas (Dr. Radu Pretorian/cardiology, Laza Lawyers, Bright Dental €450/mo) read as **illustrative, not verifiable** — no logos, quotes, or links. Reduces citability for ChatGPT/Perplexity and caps the "Experience" E-E-A-T dimension.

**M3. Schema gaps (otherwise strong):** SoftwareApplication `offers` omit the **Enterprise** tier and lack `availability`/`url`; no `speakable`; no `aggregateRating` (add only with real reviews — never fabricate); Organization lacks `address`, `foundingDate`, `founder`.

**M4. `llms.txt` is good but not great (70/100):** no `llms-full.txt`, and it does not link `docs.surogate.ai` page-by-page (the ideal place to route models to deep technical content).

**M5. No visible publication / "last updated" dates or bylines** on marketing pages. `sitemap lastmod` is fresh (2026-06-30) but that freshness isn't surfaced on-page — hurts AIO freshness ranking and Perplexity (which penalizes undated content).

**M6. Wikidata entity is a stub** — few statements, no references, no Wikipedia sitelink. Enrich it (P31, official website, founder, inception, industry, references).

---

## Low Priority Issues

- **L1.** Missing `Content-Security-Policy` header (only absent security header); HSTS is 180 days with no `preload` (strengthen to 1 year + preload).
- **L2.** Pricing page lacks `og:image` / `twitter:image`; its meta description (~200 chars) should be trimmed to ~160.
- **L3.** No `SearchAction` on WebSite schema (low priority — no site search); no `Article`/`TechArticle` + `Person` author schema on docs pages.
- **L4.** No `Content-Signal:` directive in robots.txt and no RFC 8288 `Link` headers / markdown content-negotiation (forward-looking agent-discovery signals).
- **L5.** Monitor the Cloudflare "Block AI bots" toggle — **verified OFF today** (GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot all return HTTP 200), but if ever enabled it would silently negate the entire permissive robots.txt.
- **L6.** Reconcile the enterprise logos / ISO-SOC compliance shown on invergent.ai so they clearly apply to Surogate (they currently read as tied to a separate BigConnect product line).

---

## Category Deep Dives

### AI Citability (77/100)
Strong for a marketing site, carried by a few genuinely quotable, stat-dense blocks:
- **Expert-model benchmark table (~88/100)** — the single most citable asset: 8B expert model vs frontier API, 95.8% vs 94.1% accuracy, 380ms vs 2,400ms latency, $0.40 vs $9.20 per 1k calls. Proprietary, numeric, tabular.
- **Pricing tiers (~85/100)** — Free / $30 / $72 / $144 with concrete token allowances (500K / 5M / 11.5M / 22M). A direct answer to "how much does Surogate cost."
- **Pricing FAQ (~72–76/100)** — 17 self-contained Q&A pairs; the citability engine of the site (e.g., *"What happens if my token wallet hits zero mid-task? The operation stops. No auto-upgrade, no overdraft, no end-of-month invoice."*).

Weak spots: the hero and capability headers ("Multiply yourself," "Works, not just talks") are un-citable slogan fragments; the "matches or beats frontier models at a fraction of the cost" claim has no number inline (it lives in the separate table). **Fixes:** add a one-sentence "Surogate is…" definition high on the page; inline the benchmark numbers as prose beside the table; convert capability headers into 1–2 sentence answer blocks with a concrete example each.

### Brand Authority (18/100)
The dominant drag on the whole audit. Present & strong: `github.com/invergent-ai/surogate` has **802 stars** (real developer traction, heavily weighted by AI models for dev tools) and consistent entity naming across GitHub, Hugging Face, LinkedIn, Crunchbase, and Wikidata. Absent: Wikipedia (0 results), Reddit/HN, YouTube, Product Hunt, G2/Capterra, press. Every high-leverage fix here is off-site entity building.

### Content E-E-A-T (57/100)
- **Experience (15/25):** concrete workflows, live agent demo, hard benchmarks — but personas appear constructed, not verifiable customers.
- **Expertise (13/25):** genuine deep ML engineering (public FP8/FP4 training repo, correct SFT/RL/dstack vocabulary) undermined by **zero named authors**.
- **Authoritativeness (11/25):** active OSS repo is real; but no press, reviews, or third-party citations; no About page.
- **Trustworthiness (14/25):** best-in-class pricing transparency (VAT-inclusive, no surprise overages, 14-day refund, "no training on your data") — but `/privacy/` 404s, no ToS, no address, no dates, and a YMYL/HIPAA gap. Content reads **human-authored** (distinctive voice, specific numbers), not AI-boilerplate.

### Technical GEO (92/100)
Excellent and directly verified against raw HTML (not markdown):
- **SSR/SSG (Next.js static export):** ~1,500 words of body text, a real `<h1>` and 11+ real `<h2>`s render **without JS** — AI crawlers that don't execute JS get the full page.
- **Crawlability:** origin robots.txt explicitly allows all major AI bots; Cloudflare AI-block **tested OFF**; docs has its own valid 30+ URL sitemap.
- **Meta/head:** meta description, `index, follow`, self-referencing canonicals, full OG + Twitter cards on both pages; `lang="en"`; correct viewport.
- **Security:** HTTPS + HSTS + X-Frame-Options + nosniff + Referrer-Policy + Permissions-Policy. Only gaps: **no CSP**, HSTS lacks `preload`.
- **Canonicalization:** http→https, www→non-www, `/pricing`→`/pricing/` all 301. Core Web Vitals risk low (static estimate — validate with PSI/CrUX).

### Schema & Structured Data (84/100)
Genuinely strong — the markdown-based first pass produced a false "no schema" negative; raw HTML confirms rich, valid, server-rendered JSON-LD:
- **Homepage:** `@graph` → Organization (legalName "INVERGENT SA", logo, email, two contactPoints, and an 8-link `sameAs` including **Wikidata Q140385440**, GitHub, 2× LinkedIn, 2× X, Hugging Face, Crunchbase) + WebSite + SoftwareApplication (4 Offers).
- **Pricing:** the same graph **plus FAQPage (all 17 Q&As) plus BreadcrumbList.**
Best-in-class entity linking. Real gaps: Enterprise offer missing + no `availability`/`url` on offers; no `speakable`; no `aggregateRating`; Organization lacks `address`/`foundingDate`/`founder`; no `Person`/`Article` schema on docs.

### Platform Optimization (40/100)
- **Google AI Overviews (57)** — strongest: good tables/lists/FAQ + clean headings + SSR; held back by weak organic ranking, non-question headings, missing dates.
- **Bing Copilot (47)** — no IndexNow, Bing WMT unverified.
- **ChatGPT Web Search (33) / Perplexity (32)** — capped by the missing Wikipedia + zero Reddit/community footprint (Reddit ≈ 47% of Perplexity citations).
- **Google Gemini (28)** — no YouTube (Gemini's top source), no Knowledge Panel; only the schema scores here.

---

## Quick Wins (Implement This Week)

1. **Publish `/privacy/` and `/terms/`** plus a short data-handling/security page with an explicit GDPR + (given healthcare use cases) HIPAA statement, linked from the footer. Fixes the 404 trust gap and the YMYL exposure. *(High impact on E-E-A-T + user trust.)*
2. **Ship an `/about/` (Team) page** naming the founder(s) with roles, credentials, and LinkedIn links, plus `Person` schema tied to the Organization. Answers "who is behind this."
3. **Expand the sitemap** to include (or reference via a sitemap index) all `docs.surogate.ai` pages, and submit to Bing Webmaster Tools + implement **IndexNow** (`/.well-known/indexnow-key.txt`). Unlocks discovery of your deepest content across Bing/ChatGPT/Copilot.
4. **Add a one-sentence "Surogate is…" definition** near the top of the homepage and **inline the benchmark numbers as prose** beside the table (e.g., *"An 8B expert model fine-tuned on 12k traces hit 95.8% accuracy at $0.40/1k calls — 23× cheaper and 6× faster than a frontier API"*).
5. **Enrich the schema you already have:** add the **Enterprise** offer + `availability`/`url` to SoftwareApplication, add `speakable`, and add `address`/`foundingDate`/`founder` to Organization. Add `og:image`/`twitter:image` to `/pricing/`.
6. **Enrich the existing Wikidata item `Q140385440`** (add statements + references: instance-of, official website, founder, inception, industry) — it exists but is a stub. Verify the Cloudflare "Block AI bots" toggle stays OFF.

## 30-Day Action Plan

### Week 1: Trust & Crawl Foundation
- [ ] Publish privacy policy, terms of service, and a security/data-handling page (with GDPR + HIPAA statements); link from footer.
- [ ] Create an About/Team page with named founders + `Person` schema.
- [ ] Expand sitemap to cover docs (or add a sitemap index); submit to Bing Webmaster Tools.
- [ ] Implement IndexNow; verify Cloudflare "Block AI bots" is OFF.

### Week 2: On-Page Citability & Schema
- [ ] Add the self-contained "what Surogate is" definition sentence; inline benchmark stats as prose.
- [ ] Rewrite homepage H2s as questions with a 1–2 sentence direct answer beneath each ("How do you monetize an AI agent?", "How much does it cost to run an agent 24/7?").
- [ ] Add source attribution / a methodology note to every benchmark and case-study figure; label illustrative personas clearly.
- [ ] Surface visible "Last updated" dates + a company byline; complete the SoftwareApplication (Enterprise offer) + Organization (address/founder) + `speakable` schema.

### Week 3: Content Depth
- [ ] Launch a `/blog/` (or resources) hub; publish 2 dated pillar posts: "How to train an expert SLM that beats frontier models on your task" and "The economics of monetizing an AI agent."
- [ ] Add `TechArticle` + `Person` author schema to docs pages.
- [ ] Generate `llms-full.txt` and link `docs.surogate.ai` pages page-by-page from `llms.txt`.

### Week 4: Off-Site Authority
- [ ] Product Hunt launch + G2/Capterra listing.
- [ ] "Show HN" post + dev.to article tying the 802-star OSS trainer to the hosted platform; seed r/LocalLLaMA, r/MachineLearning, r/AI_Agents with the benchmark story.
- [ ] Finish enriching Wikidata; begin pursuing independent press coverage toward Wikipedia notability (then add the Wikipedia sitelink to `Q140385440`).

---

## Appendix: Pages Analyzed

| URL | Title / Role | GEO Issues |
|---|---|---|
| https://surogate.ai/ | Homepage (SSR) — "Multiply yourself." | Un-citable hero/slogans, no self-contained definition, benchmarks table-only, non-question H2s, no dates/bylines |
| https://surogate.ai/pricing/ | Pricing — 5 tiers + 17-Q FAQ | Strong (FAQPage + BreadcrumbList schema); missing og:image/twitter:image, long meta description, Enterprise not in Offer schema |
| https://surogate.ai/llms.txt | llms.txt (1.9 KB) | Present & valid; no llms-full.txt, doesn't link docs page-by-page |
| https://surogate.ai/robots.txt | robots.txt | Exemplary AI-crawler allowlist; sitemap thin; no Content-Signal directive |
| https://surogate.ai/sitemap.xml | Sitemap | Only 2 URLs; excludes docs |
| https://docs.surogate.ai/ (+30 pages) | Documentation (own sitemap) | Not referenced from main site; no Article/Person schema; strong content otherwise |
| https://invergent.ai/ | Parent company site | Enterprise logos/compliance not clearly attributed to Surogate |
| https://surogate.ai/privacy/ · /terms/ · /about/ · /security/ · /legal/ | Trust/legal pages | **404 — do not exist** |
| https://www.wikidata.org/wiki/Q140385440 | Wikidata entity | Exists but a stub — no Wikipedia sitelink, few references |

---

### Methodology & Caveats
Composite = AI Citability 25% + Brand Authority 20% + Content E-E-A-T 20% + Technical GEO 15% + Schema 10% + Platform Optimization 10%. Category scores were produced by six specialized analyses and reconciled against **direct raw-HTML/header verification** (curl), which corrected an early markdown-based false negative on schema and meta tags. AI-crawler access, the Cloudflare edge toggle, trust-page 404s, and the Wikidata entity were each verified live. Core Web Vitals are a static estimate — validate with PageSpeed Insights / CrUX field data before acting on L1.
