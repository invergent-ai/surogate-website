# surogate.ai

The Surogate marketing site: Next.js 15 (App Router) with `output: 'export'`, so
the build is plain static files in `out/`. Tailwind for styling, Remotion for
the films.

## Run it

```bash
npm ci
npm run dev       # http://localhost:3000
npm test          # node --test over lib/ and components/labs/
npm run build     # static export to out/
npm start         # serve out/ locally
```

Use Node 20 or newer (CI builds with 20).

## Where things are

| path | what |
|---|---|
| `app/` | routes: `/`, `/pricing`, `/launch`, `/agencies`, `/for/{accountants,creators,doctors,influencers,lawyers,teachers}`, `/labs` (`engine`, `rune`, `rune-examples`, `speech`) |
| `components/` | page sections; `components/film/` holds the Remotion scenes the site also mounts live |
| `lib/` | data and helpers (`labs.js` is the Labs catalogue, `analytics.js`, `firebase.js`) |
| `public/brand/` | canonical brand masters: marks, lockups, rabbit, burst |
| `remotion/` | film compositions; see [`VIDEOS.md`](VIDEOS.md) |
| `functions/` | Firebase Cloud Functions for launch signups; deployed separately, not part of the site build |
| `docs/` | Cloudflare security-header runbook and design notes |

## Deploy

A push to `main` runs `.github/workflows/deploy.yml`: `npm ci`, `npm run build`,
fetch `install.sh` from the surogate repo into `out/`, then publish to GitHub
Pages. Cloudflare sits in front of `surogate.ai`; response headers are set there
(see `docs/cloudflare-security-headers.md`), because Pages cannot set them.
