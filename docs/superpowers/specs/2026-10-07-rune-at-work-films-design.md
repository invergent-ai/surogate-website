# Rune at work: recorded films instead of live demos

2026-10-07. Approved in conversation.

## Why
The Rune endpoint (`rune.surogate.ai`) is off and stays off: no GPU kept up for demos. The
`/labs/rune-examples` page embeds live HF Spaces that call it, so every demo is broken.

## What
Each demo becomes a film of the real Space doing real work, in the Cap / Screen Studio style:
wallpaper, a floating rounded window, auto-zoom onto clicks and answers, a smoothed drawn cursor.
Hugging Face links stay as showcase links (code and model card); they need not run.

## Rules
- Rune is never called. Every answer on screen is one Rune gave on 2026-09-28/29, replayed.
- Only recorded inputs are filmed. A request the replay has not seen fails; it is never guessed.
- Chart Check (nothing recorded), Runecaster and Ask Your Camera (camera) get no film: screenshot + HF link.

## Pipeline (labs repo, branch `feat/films`)
1. **Harvest**: run each `record_<space>.py` with `recording.ask` swapped for a lookup into the
   saved `recorded_film.json`; every request body the script builds is paired with its saved answer
   and latency -> `spaces/replay/<space>.json` = {sha256(body): {answers, ms}}.
2. **Replay stub** (`spaces/replay/serve.py`): `POST /v1/decisions` answers from those files after the
   recorded latency; unknown body -> 404. `RUNE_URL` points at it.
3. **Spaces run locally**, unchanged (`local.sh`).
4. **Shoot** (`spaces/film/shoot_<demo>`): Playwright at 2x, no cursor, drives only recorded examples,
   writes `raw.webm` + `track.json` (cursor path, clicks, zoom targets, captions, with times).
   Watchtower, SO-101 and the Duck already replay their own recordings and need no stub.

## Composition (website repo, Remotion)
`remotion` composition `capture` takes `raw` + `track.json`: brand wallpaper, window with padding,
radius and shadow, spring zoom to each target, drawn cursor on a smoothed path with click ripple,
caption chips. Renders `public/labs/films/<slug>.mp4` (full, 1920x1080), `<slug>-loop.mp4` (4 s, card)
and `<slug>.jpg` (poster).

## Page
`/labs/rune-examples` (URL kept): "Rune at work". Cards play their silent loop while in view; click
opens a theater (full film with controls, HF Space + model card links). Caption: "Recorded on Rune v3,
28 Sep 2026. Real answers, replayed." Sector/input filter kept. The iframe embed path is removed.

## Order
Harvest + stub -> Inbox end to end (proves the pipeline) -> composition tuned on Inbox -> the rest -> page.
