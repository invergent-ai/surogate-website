# The films

Remotion scenes for the Surogate platform films. Every frame is a hand-built
React replica of the ops UI, animated — there are no screen recordings here.

They run **in the page**, not as video: `components/home/FilmPlayer.tsx` mounts
`Film` through `@remotion/player`, so the site draws the same components the
renderer would. Nothing is fetched and there is no MP4 to keep in sync.

`Root.tsx` and `index.ts` are the render entry points. Nothing imports them
today — they are here so that rendering an actual video later is
`npm i -D @remotion/cli` and `remotion render components/film/index.ts`, rather
than re-authoring the composition list.

```bash
npm install
npm run dev
```

The film plays end to end right now. Shots whose scene isn't built yet render
inside the real chrome as a labelled placeholder, so pacing stays judgeable while
scenes land one at a time.

Read **[PLAN.md](PLAN.md)** for where the design tokens come from, what's built,
and the open questions.
