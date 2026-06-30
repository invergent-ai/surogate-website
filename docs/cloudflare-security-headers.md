# Cloudflare Security Headers — surogate.ai Runbook

**Why Cloudflare and not the repo:** the origin is GitHub Pages, which cannot set
custom response headers. Cloudflare proxies the `surogate.ai` zone, so all
response-header work is dashboard config — not a code change. (A `public/_headers`
file would be **ignored**, since that only works on Cloudflare Pages' own hosting,
not when Cloudflare proxies an external origin.)

## Current state (2026-06-30)

Verify live at any time:

```bash
curl -sI https://surogate.ai/ | grep -iE \
  'strict-transport|content-security|x-content-type|x-frame|referrer-policy|permissions-policy'
```

| Header | Value | Status |
|---|---|---|
| `Strict-Transport-Security` | `max-age=15552000; includeSubDomains` | ✅ Live |
| `X-Content-Type-Options` | `nosniff` | ✅ Live |
| `X-Frame-Options` | `SAMEORIGIN` | ✅ Live |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ Live |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=(), browsing-topics=()` | ✅ Live |
| `Content-Security-Policy` | (see Pass C) | 🔄 Pending |

---

## Pass A — HSTS (dedicated UI)

Set via **SSL/TLS → Edge Certificates → HTTP Strict Transport Security (HSTS)**,
not a Transform Rule (the dedicated screen has safety warnings).

- Enable HSTS: On
- Max-Age: 6 months for first rollout (`15552000`), raise to 12 months later
- Apply to subdomains (`includeSubDomains`): On — safe here, all `*.surogate.ai`
  hosts (`docs.`, `ops.`) are HTTPS
- **Preload: Off** until this has run clean for several weeks

⚠️ Once a browser sees HSTS it refuses plain HTTP for the whole max-age — you
cannot undo it client-side. Do not enable `preload` early (it is effectively
permanent once submitted to the browser-baked list).

---

## Pass B — Four static headers (one Transform Rule)

**Rules → Transform Rules → Modify Response Header → Create rule.**

- Name: `Security headers — static`
- Match: All incoming requests (or `Hostname equals surogate.ai`)
- Then → Modify response header → **Set static** (one per header):

| Header name | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=(), browsing-topics=()` |

These never break a normal site. Deploy.

---

## Pass C — Content-Security-Policy (deploy carefully)

CSP is the only header that can break the site, by silently blocking GA, PostHog,
or Next.js chunks. **Always deploy as `Content-Security-Policy-Report-Only` first**,
verify no violations, then rename to the enforcing header.

### Step 1 — Deploy Report-Only

Add a Transform Rule (or a Set-static op) with header
**`Content-Security-Policy-Report-Only`** and this value:

```
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://eu.i.posthog.com https://eu-assets.i.posthog.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com; font-src 'self'; media-src 'self'; worker-src 'self' blob:; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://eu.i.posthog.com https://eu-assets.i.posthog.com; upgrade-insecure-requests
```

**Why each non-obvious directive exists (mapped to this codebase):**

| Directive entry | Reason | Source |
|---|---|---|
| `script-src … googletagmanager.com` | GA4 loader `gtag/js?id=G-QDJWS8ZM50` | `app/layout.jsx` |
| `script-src 'unsafe-inline'` | inline `gtag('config', …)` block | `app/layout.jsx` |
| `script-src/connect-src … eu.i.posthog.com` + `eu-assets.i.posthog.com` | PostHog api + assets hosts | `lib/analytics.js` |
| `connect-src … *.google-analytics.com *.analytics.google.com` | GA4 event beacons | GA4 |
| `font-src 'self'` | fonts self-hosted by `next/font/google` (`/_next/static/media/*.woff2`) | `app/layout.jsx` |
| `media-src 'self'` | `public/surogate-app.mp4` | homepage video |
| `worker-src blob:` + `img-src blob:` | PostHog session-recording blob workers | PostHog |
| `style-src 'unsafe-inline'` | Next.js + Tailwind inline styles | framework |

> If `NEXT_PUBLIC_POSTHOG_HOST` is set to a custom host, swap `eu.i.posthog.com`
> for that host in `script-src` and `connect-src`.

### Step 2 — Watch for breakage

Open the live site, hard-refresh, check **DevTools → Console** for
`[Report Only] Refused to … violates … "<directive>"`. Click through real flows:
theme toggle, `/pricing/`, scroll to the mp4. Add any new origin it flags to the
matching directive.

### Step 3 — Enforce

Once the console is clean on `/` and `/pricing/`, rename the header from
`Content-Security-Policy-Report-Only` to `Content-Security-Policy` (same value).

---

## Verify

```bash
curl -sI https://surogate.ai/ | grep -iE \
  'strict-transport|content-security|x-content-type|x-frame|referrer-policy|permissions-policy'
```

External grade: run the domain through **securityheaders.com** — this config
targets an **A**.

## Rollback & gotchas

- Transform Rules toggle Off instantly (no deploy, no cache purge). HSTS is the
  exception — browsers honor it until max-age expires, which is why preload stays
  off and max-age moderate.
- `X-Frame-Options: SAMEORIGIN` and CSP `frame-ancestors 'self'` agree — keep both.

## Going stricter later (optional)

The only weak point is `script-src 'unsafe-inline'`. Removing it needs per-request
**nonces**, which a static GitHub Pages export can't generate — that requires
moving CSP into a **Cloudflare Worker** that rewrites HTML and injects a fresh
nonce per response. Overkill for a marketing site; the policy above is already an A.

## Related

- Audit: [`../GEO-TECHNICAL-AUDIT.md`](../GEO-TECHNICAL-AUDIT.md)
- Still open: `www.surogate.ai` → apex 301 (Cloudflare **Redirect Rule**, not a header)
