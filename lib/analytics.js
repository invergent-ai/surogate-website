import posthog from 'posthog-js';

// Write-only project token — safe to ship in the client bundle. Same project as
// the surogate-ops app so anonymous marketing visitors stitch to their later
// signup/login into one cross-domain funnel. Override per environment with
// NEXT_PUBLIC_POSTHOG_KEY / NEXT_PUBLIC_POSTHOG_HOST (inlined at build time).
const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  'phc_zPSN2DHPchukhvPSY4iVSiYxuSaBZ67K6AxKYaTLoGJw';

const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

let initialized = false;

// Only the live site reports. localhost, previews and forks stay silent, so dev
// clicks and session recordings never land in the production project.
export const isProdHost = (host) => host === 'surogate.ai' || host === 'www.surogate.ai';

export function initPostHog() {
  if (typeof window === 'undefined') return posthog;
  if (initialized || !isProdHost(window.location.hostname)) return posthog;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // This dated preset resolves capture_pageview to 'history_change', so App
    // Router client navigations (pushState, no full reload) still emit $pageview.
    defaults: '2026-05-30',
    person_profiles: 'identified_only',
    disable_session_recording: false,
    autocapture: true,
    capture_exceptions: true,
  });
  initialized = true;
  return posthog;
}

export function track(event, properties) {
  // No-op until init has run — server render, or a click before hydration.
  if (!initialized) return;
  posthog.capture(event, properties);
}
