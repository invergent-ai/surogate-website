# Site v2: what the owner sent back, and the rules it made

Binding for every page. Read this before §3 of `2026-10-27-site-v2-design.md`, and before the skills in
`../real-design-no-stupidass-slop/` (`marketing-page`, `copy-voice`, `design-system`, `technical-figure`,
`slop-audit`). Where this file and the spec disagree, this file wins.

## Benchmark, not template

- x.ai is the bar for calm, scale, structure and motion. Study the matching x.ai page before building a
  page, then build ours: our copy, our sections, our assets. Never their wording or section order verbatim.
- The page must work for every visitor: enterprise, government, banks and insurers, professionals,
  developers, partners.

## Look

- Container 1280 + 24px gutters (16 on mobile). Sections 96px vertical (64 mobile).
- Type is smaller and calmer than you think. H1 ≤ 60px desktop, 36 mobile. H2 30–48. Body 16–18.
  Inside cards and tiles: 12–15px. Nothing at hero scale inside a tile.
- Palette: ivory/stone surfaces, ink text, aubergine bands (about every third section) and the aubergine
  footer, sun orange as the accent only. Radii: 16 tiles, 12 cards, full pills. Hairline `#e4e4e7`.
- Divider lines live inside the container, never edge to edge.
- Hero: no cycling single word, no "where should it run" switch (both rejected). The headline and its
  CTAs rotate per product together.
- No icons in menus. No gradient frames around code. No status dots or glowing pills. No coloured tag
  chips. No "early access" (the desktop app is released: `surogate.ai/desktop/install.sh`).
- The product formerly called "API" is **AI Gateway**, at `/gateway/` (hosted on llm.buzz, self-hosted
  with Surogate Router). There is no `/api/` page. "Get API key" still links to llm.buzz.
- The rabbit is a character only on `/agents/` and `/surogate/` (and the Voice tile, as Amami). The simple rabbit mark is also the Surogate model's mark
  (the Surogate 3.7 Flash cover, owner's request). Nowhere else.
- Never name a voice or a person in UI copy (no "Doina"). Name the model and the language.

## Media

- Video boxes are exactly 16:10, framed like a small window inside the card (contain, never cropped into
  another ratio). Labels sit below footage, never over text-heavy footage.
- Films and loops come from the LOCAL stack demo tenants only (`public/media/loops/`, `public/media/films/`).
  Never production, never a real client.
- Reuse our own illustrations before drawing new ones: `components/{agents,keel,gateway,partners,home}/
  illustrations.js`, `components/keel/BoardFlow.jsx`, the rings in `public/surogate_ring_*.svg`, the model
  marks in `public/labs/speech/*.svg`, `components/labs/RuneGlyph.jsx`. Adapt them to fit; don't paste.
- Visuals show what the product IS (llm.buzz is a market where providers compete on price and speed on one
  key, not a model list). If a visual could belong to any AI startup, it is wrong.

## Motion

- One ease, `cubic-bezier(.16,1,.3,1)`; hovers 150ms `cubic-bezier(.4,0,.2,1)`.
- No layout shift ever: fixed footprints for anything that changes, stacked layers that crossfade.
- Progress and fills are pure CSS keyframes on transform, one continuous run, never stepped by JS ticks.
- Nothing pauses on hover. Only a playing audio sample pauses a rotation.
- Reduced motion shows the final state.

## Copy

- Concrete, real use cases (banking, public sector, logistics, professionals). No nonsense examples
  ("close out the card for month-end" was rejected).
- Every number has a source in the repo (`lib/labs.js` ENGINE.facts, llm.buzz snapshots with URL and
  date, `lib/products.js`). No invented stats, prices, dates or logos.
- One primary action per section. CTAs fit their context; not every CTA is a chat box.

## Process

- No `next build` while the dev server runs on :3000. Run `node --test` for the touched tests.
- Pages that ship leave `PENDING` in `lib/site.js`; check-links must pass when v2 is done.
- No Claude attribution in commits; Conventional Commits; never commit to main.
