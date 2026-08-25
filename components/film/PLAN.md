# Plan — the Surogate platform film

A 60-second showcase in which **every frame is a hand-built React replica of the
ops UI**, animated in Remotion. There are no screen recordings in this project.

## Why simulate rather than record

A capture is hostage to whatever the account happens to contain — empty training
pages, other tenants' names in the spend panel, a cursor that wanders, a spinner
that can't be cut around. Simulating the UI means:

- **Every screen is full.** The training page has runs, the KB exists, the model
  is serving. No seeding a production account to make a film.
- **Nothing leaks.** No real transcripts, no colleague names, no API keys.
- **The motion is authored.** A tool call can land exactly on the beat, a list
  can filter in exactly 12 frames. You cannot direct a real browser that finely.
- **It re-renders.** Change a label, re-render. No reshoot.

The risk is the mock drifting from the product until the film shows something
that no longer exists. Two defences: tokens are copied from the frontend rather
than eyeballed, and every scene is built from a screenshot of the real screen.

## The look: idealised, not a replica

This is **not** a simulation of using the app. There is no sidebar, no page
header, no breadcrumb — those are things a user tolerates, not things worth
sixty seconds of anyone's attention. Each shot stages the one fragment it is
about, floating on a dark warm ground, and the camera decides what you look at.

Three pieces do the work:

- **`Stage`** — near-black ground, warm amber key light that drifts, a cool fill
  from the opposite corner, a faint grid for parallax, vignette on top. The
  product is a light UI; floating it on dark is what gives the panels weight and
  makes the amber read as light rather than paint.
- **`Panel`** — one fragment of product. `hot` gives it an amber rim and bloom;
  `behind` pushes it back with blur and dimming, so a shot can have depth.
- **`Camera`** — absolute moves (`scale` + `focus`), eased in and out. This is
  the biggest single difference from a recording: a recording shows you a page,
  the camera shows you a *detail at the moment it matters*.

Type inside panels runs 1.5–2× the product's own sizes. Nobody reads 14px in a
hero video, and an idealised screen is allowed to breathe.

## Fidelity — where the look comes from

`src/ui/tokens.ts` is lifted from `surogate-ops/frontend/src/index.css`:

| | |
|---|---|
| Serif (all h1–h6, `-0.01em`) | **Fraunces** |
| Sans (everything else) | **Inter** |
| Mono | **JetBrains Mono** |
| Action colour | `#f59e0b` — Tailwind amber-500, used ~266× in the app |
| Border / input | `#e8e4e3` · Sidebar `#fbfaf9` · Muted fg `#7c6d67` |
| Radius | 10px (`--radius: 0.625rem`) |

The UI is authored at **1440×810 and scaled 1.333× to the 1920×1080 frame**.
Native 1920 would be truer to a real browser, but the product's 14px body text
is then unreadable when the film plays in a 600px-wide hero. Scaling keeps the
real proportions and buys legibility.

## Structure

```
src/
  shots.ts             the cut — duration, caption, VO, and the scene component
  ui/
    tokens.ts          colours, type, layout metrics, the design→frame scale
    kit.tsx            Heading, Text, Button, Card, Pill, Field, Input, Tabs, Toggle
    AppFrame.tsx       sidebar + header + content well; work and dev modes
    motion.tsx         Enter, Typed, Cursor, useSpringAt — the motion vocabulary
  scenes/
    S03CreateAgent.tsx     built
    S07ToolTimeline.tsx    built
    Placeholder.tsx        every unbuilt shot, inside the real chrome
  Film.tsx             assembles shots; hard cuts, one dissolve
  components/Caption.tsx, EndCard.tsx
```

**The chrome is shared.** Scenes render inside `AppFrame`, so the sidebar never
jumps between shots — the film reads as one continuous session in one app, which
is the whole illusion. Only the header and the content well change.

**Unbuilt shots still play**, inside that same chrome, labelled with what the
scene has to show. The film runs end to end today; scenes replace placeholders
one at a time and the pacing stays judgeable throughout.

## Built so far

| Shot | Scene | What it demonstrates |
|---|---|---|
| 3 | `S03CreateAgent` | Typing, a **derived** slug that writes itself from the name, camera pushing onto it and back out |
| 7 | `S07ToolTimeline` | Staged reveal — pending dot → label types → dot turns green when the tool returns, ring pulse on each. Camera pushes in as the trace builds |
| 10 | `S10Train` | Four method cards fan in, SFT lifts and glows while the others recede and blur, a loss curve draws itself with a live readout |

Those three exercise every primitive the other nine need: typing, derivation,
staged reveal, depth (hot/behind), camera moves, and progressive drawing. The
rest is assembly rather than invention.

Captions are placed per shot (`captionAt`) and have to be checked against the
camera — shot 7's push moves the panel up, so its caption sits low; shot 10
fills the top, so its caption sits under the composition.

## Remaining scenes

Each brief is in `shots.ts` under `build`.

| Shot | The one thing it has to do |
|---|---|
| 1 cold-open | Slack thread, not ops chrome. Needs its own small kit |
| 2 catalogue | Template cards stagger in, grid drifts upward |
| 4 persona | SOUL.md scrolling in a mono editor, counter ticking |
| 5 skills + tools | Toolkit catalogue filtering to a search term, logos landing |
| 6 channels | Five cards, cursor travelling the row |
| 8 mark | Rows animating **out** as a filter chip engages — the only exit animation in the film |
| 9 dataset | Checkboxes ticking, then a status flipping to Ready |
| 10 train | Four method cards, form filling, a loss curve drawing |
| 11 back-in | Dropdown opening and selecting; then the answer, in the house voice |

## Compositions

| id | |
|---|---|
| `Surogate60` | the film — 1203 frames, 40.1s |
| `Surogate30` | short cut — 678 frames, 22.6s |
| `Surogate60-Review` | shot number + timecode burned in, for notes |
| `Poster` | website poster frame |

Props are `variant: "full" \| "short"`, not a shot array — Remotion serializes
`defaultProps`, which silently strips a React component. That bug cost an hour;
don't reintroduce it by "simplifying" the film to take its shots as a prop.

## Open questions

**1. Voiceover.** `shots[].vo` holds the script. Not wired to audio yet; drop a
file in `public/audio/` and pass `voiceover` in `defaultProps`.

**2. Shot 11 still has to be honest.** Simulating the UI does not license
simulating the *result*. If the fine-tune doesn't visibly improve the answer,
the claim changes — the film shouldn't show an improvement the product didn't
make.

## Commands

```bash
npm run dev              # studio
npm run render           # out/surogate-60.mp4
npm run render:short
npm run render:review    # burned-in shot numbers
npm run still            # poster
npm run typecheck
```
