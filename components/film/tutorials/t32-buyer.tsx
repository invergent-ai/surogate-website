import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans, serif } from "../font";
import { Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Stage } from "../ui/Stage";
import { c } from "../ui/tokens";

/**
 * Tutorial 32 — What a buyer sees.
 *
 * Every shot is a buyer's screen, so every shot is drawn in the agent's own
 * theme rather than the studio's white panels. Midnight, to match the theme
 * picked in video 31.
 *
 * Screens from `features/public-agent/`: `buy-page.tsx`, `buyer-sign-in.tsx`,
 * `public-agent-paywall.tsx`, `buyer-chat.tsx`. Copy is those files' own.
 */

const PAGE = "#150f1c";
const SURFACE = "#1e1628";
const ACCENT = "#e8b64c";
const INK = "#f3ecf7";
const MUTED = "rgba(243,236,247,0.62)";
const LINE = "rgba(243,236,247,0.12)";
const GREEN = "#1d9e75";

const AGENT = "Interview Coach";

/** The themed sheet every buyer screen sits on. */
const Sheet: React.FC<{ width?: number; children: React.ReactNode }> = ({
  width = 1060,
  children,
}) => (
  <div
    style={{
      width,
      background: PAGE,
      borderRadius: 20,
      padding: "30px 34px 34px",
      boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
    }}
  >
    {children}
  </div>
);

const Header: React.FC<{ right?: React.ReactNode }> = ({ right }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 600, color: INK }}>
        {AGENT}
      </div>
      <div style={{ fontFamily: sans, fontSize: 16, color: MUTED, marginTop: 7, lineHeight: 1.55 }}>
        Practise real interview questions out loud, and hear exactly what to fix
        before the day.
      </div>
    </div>
    {right}
  </div>
);

/* ── step 1 · the page they land on ─────────────────────────────── */

/**
 * The buy page for a signed-out visitor: header with a Sign in button, the
 * platform's free-trial note, and the offer.
 */
export const SceneBuyerLand: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const trial = useEnterAt(t(24), 12);
  const offer = useEnterAt(t(46), 12);
  const cta = useEnterAt(t(72), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.4 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Sheet>
          <div style={{ opacity: head }}>
            <Header
              right={
                <span
                  style={{
                    border: `1px solid ${LINE}`,
                    borderRadius: 999,
                    padding: "7px 17px",
                    fontFamily: sans,
                    fontSize: 15,
                    color: INK,
                    flex: "0 0 auto",
                  }}
                >
                  Sign in
                </span>
              }
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: `1px solid ${LINE}`,
              borderRadius: 14,
              padding: "13px 16px",
              marginTop: 20,
              opacity: trial,
            }}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}>
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            </svg>
            <span style={{ fontFamily: sans, fontSize: 15, color: MUTED, lineHeight: 1.5 }}>
              Try it free first: every new user gets{" "}
              <span style={{ color: INK, fontWeight: 500 }}>~50 messages</span> of
              one-time trial usage. Sign in to start.
            </span>
          </div>

          <div
            style={{
              background: SURFACE,
              borderRadius: 14,
              padding: "18px 20px",
              marginTop: 13,
              opacity: offer,
            }}
          >
            <div style={{ fontFamily: sans, fontSize: 18, fontWeight: 600, color: INK }}>
              Daily practice
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 6 }}>
              <span style={{ fontFamily: sans, fontSize: 32, fontWeight: 700, color: INK }}>
                €19
              </span>
              <span style={{ fontFamily: sans, fontSize: 17, color: MUTED }}>/ month</span>
            </div>
            <div style={{ fontFamily: sans, fontSize: 15, color: MUTED, marginTop: 8 }}>
              ~1,000 messages every period
            </div>
            <div
              style={{
                background: ACCENT,
                color: PAGE,
                borderRadius: 9,
                padding: "11px 0",
                marginTop: 14,
                textAlign: "center",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 600,
                opacity: cta,
              }}
            >
              Subscribe
            </div>
          </div>
        </Sheet>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · sign in ───────────────────────────────────────────── */

/** `buyer-sign-in.tsx` — email, password, and the switch to Create account. */
export const SceneBuyerSignIn: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 12);
  const fields = [useEnterAt(t(20), 12), useEnterAt(t(32), 12)];
  const button = useEnterAt(t(48), 12);
  const swap = useEnterAt(t(64), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.4 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Sheet width={620}>
          <div style={{ fontFamily: sans, fontSize: 20, fontWeight: 600, color: INK, opacity: head }}>
            Sign in to continue
          </div>

          {["Email", "Password"].map((label, i) => (
            <div
              key={label}
              style={{
                border: `1px solid ${LINE}`,
                borderRadius: 9,
                padding: "12px 15px",
                marginTop: i === 0 ? 18 : 11,
                fontFamily: sans,
                fontSize: 16,
                color: MUTED,
                opacity: fields[i],
              }}
            >
              {label}
            </div>
          ))}

          <div
            style={{
              background: ACCENT,
              color: PAGE,
              borderRadius: 9,
              padding: "11px 0",
              marginTop: 16,
              textAlign: "center",
              fontFamily: sans,
              fontSize: 16,
              fontWeight: 600,
              opacity: button,
            }}
          >
            Sign in
          </div>

          <div
            style={{
              fontFamily: sans,
              fontSize: 15,
              color: MUTED,
              marginTop: 14,
              textAlign: "center",
              opacity: swap,
            }}
          >
            New here? Create an account
          </div>
        </Sheet>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · pay ───────────────────────────────────────────────── */

/**
 * Subscribe leaves the page: `createPublicAgentCheckout` sends the buyer to
 * Stripe Checkout, and the button reads "Redirecting…" while it does.
 */
export const SceneBuyerCheckout: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const offer = useEnterAt(t(3), 12);
  const going = useEnterAt(t(34), 12);
  const stripe = useEnterAt(t(62), 14);
  const onStripe = frame >= t(62);

  return (
    <Stage glow={{ x: 0.5, y: 0.4 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        {onStripe ? (
          <div
            style={{
              width: 620,
              background: "#ffffff",
              borderRadius: 16,
              padding: "26px 30px 30px",
              boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
              opacity: stripe,
            }}
          >
            <div style={{ fontFamily: sans, fontSize: 15, color: c.mutedFg }}>
              Subscribe to Daily practice
            </div>
            <div style={{ fontFamily: sans, fontSize: 32, fontWeight: 700, marginTop: 5 }}>
              €19.00
              <span style={{ fontSize: 17, fontWeight: 400, color: c.mutedFg }}>
                {" "}
                per month
              </span>
            </div>
            {["Email", "Card number", "MM / YY   CVC"].map((label, i) => (
              <div
                key={label}
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: 8,
                  padding: "11px 14px",
                  marginTop: i === 0 ? 18 : 10,
                  fontFamily: sans,
                  fontSize: 16,
                  color: c.mutedFg,
                }}
              >
                {label}
              </div>
            ))}
            <div
              style={{
                background: "#635bff",
                color: "#fff",
                borderRadius: 8,
                padding: "11px 0",
                marginTop: 16,
                textAlign: "center",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Subscribe
            </div>
            <div style={{ fontFamily: sans, fontSize: 13, color: c.mutedFg, marginTop: 12, textAlign: "center" }}>
              Powered by Stripe
            </div>
          </div>
        ) : (
          <Sheet width={620}>
            <div
              style={{
                background: SURFACE,
                borderRadius: 14,
                padding: "18px 20px",
                opacity: offer,
              }}
            >
              <div style={{ fontFamily: sans, fontSize: 18, fontWeight: 600, color: INK }}>
                Daily practice
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 6 }}>
                <span style={{ fontFamily: sans, fontSize: 32, fontWeight: 700, color: INK }}>
                  €19
                </span>
                <span style={{ fontFamily: sans, fontSize: 17, color: MUTED }}>/ month</span>
              </div>
              <div
                style={{
                  background: ACCENT,
                  color: PAGE,
                  borderRadius: 9,
                  padding: "11px 0",
                  marginTop: 14,
                  textAlign: "center",
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 600,
                  opacity: Math.max(offer, going),
                }}
              >
                {frame >= t(34) ? "Redirecting…" : "Subscribe"}
              </div>
            </div>
          </Sheet>
        )}
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · come back ─────────────────────────────────────────── */

/**
 * The return from checkout. `buy-page.tsx` shows the activation banner and
 * polls the entitlement until the webhook lands.
 */
export const SceneBuyerActivating: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const banner = useEnterAt(t(3), 12);
  const done = useEnterAt(t(54), 14);
  const isDone = frame >= t(54);

  return (
    <Stage glow={{ x: 0.5, y: 0.4 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Sheet>
          <Header
            right={
              <span style={{ fontFamily: sans, fontSize: 15, color: MUTED, flex: "0 0 auto" }}>
                ana@harborlight.example
              </span>
            }
          />

          {isDone ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: SURFACE,
                borderRadius: 12,
                padding: "15px 18px",
                marginTop: 20,
                opacity: done,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: sans, fontSize: 17, fontWeight: 600, color: INK }}>
                  Daily practice · active
                </div>
                <div style={{ fontFamily: sans, fontSize: 15, color: MUTED, marginTop: 3 }}>
                  ~1,000 messages this period
                </div>
              </div>
              <span
                style={{
                  border: `1px solid ${LINE}`,
                  borderRadius: 9,
                  padding: "9px 17px",
                  fontFamily: sans,
                  fontSize: 15,
                  color: INK,
                }}
              >
                Manage subscription
              </span>
            </div>
          ) : (
            <div
              style={{
                border: `1px solid ${GREEN}66`,
                background: `${GREEN}1a`,
                borderRadius: 10,
                padding: "15px 18px",
                marginTop: 20,
                opacity: banner,
              }}
            >
              <span style={{ fontFamily: sans, fontSize: 16, color: GREEN }}>
                Payment received — your access is being activated…
              </span>
            </div>
          )}
        </Sheet>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 5 · use it ────────────────────────────────────────────── */

/**
 * `buyer-chat.tsx`. The header is "Chat with {agentName}" and the balance
 * beside it, and the balance drops as the buyer sends.
 */
export const SceneBuyerChat: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 12);
  const ask = useEnterAt(t(20), 12);
  const reply = useEnterAt(t(52), 12);
  const spent = frame >= t(46);
  const box = useEnterAt(t(110), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.4 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Sheet width={1100}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 13,
              borderBottom: `1px solid ${LINE}`,
              opacity: head,
            }}
          >
            <span style={{ fontFamily: sans, fontSize: 17, fontWeight: 500, color: INK }}>
              Chat with {AGENT}
            </span>
            <span style={{ fontFamily: sans, fontSize: 15, color: MUTED }}>
              {spent ? "~997 messages" : "~1,000 messages"}
            </span>
          </div>

          <div style={{ marginTop: 18, opacity: ask }}>
            <div style={{ fontFamily: sans, fontSize: 13, color: MUTED, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              You
            </div>
            <div style={{ fontFamily: sans, fontSize: 18, color: INK, marginTop: 6, lineHeight: 1.55 }}>
              I&apos;m interviewing for a support lead role on Thursday. Start
              with a hard one.
            </div>
          </div>

          <div style={{ marginTop: 18, opacity: reply }}>
            <div style={{ fontFamily: sans, fontSize: 13, color: ACCENT, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {AGENT}
            </div>
            <div style={{ fontFamily: sans, fontSize: 18, color: INK, marginTop: 6, lineHeight: 1.6 }}>
              Tell me about a time you had to tell a customer something they
              didn&apos;t want to hear. Say it out loud, as if I were the panel.
            </div>
          </div>

          <div
            style={{
              border: `1px solid ${LINE}`,
              borderRadius: 12,
              padding: "13px 16px",
              marginTop: 20,
              fontFamily: sans,
              fontSize: 16,
              color: MUTED,
              opacity: box,
            }}
          >
            Message the agent…
          </div>
        </Sheet>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 6 · when it runs out ──────────────────────────────────── */

/**
 * The paywall on a return visit with an active subscription: offers are
 * replaced by the portal button, and buying again returns
 * "You already have an active subscription. Use Manage subscription to change
 * plans."
 */
export const SceneBuyerRenew: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const bal = useEnterAt(t(24), 12);
  const packs = useEnterAt(t(50), 12);
  const note = useEnterAt(t(82), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.4 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Sheet>
          <div style={{ opacity: head }}>
            <Header />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: SURFACE,
              borderRadius: 12,
              padding: "15px 18px",
              marginTop: 18,
              opacity: bal,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: sans, fontSize: 17, fontWeight: 600, color: INK }}>
                Daily practice · active
              </div>
              <div style={{ fontFamily: sans, fontSize: 15, color: MUTED, marginTop: 3 }}>
                ~12 messages left this period
              </div>
            </div>
            <span
              style={{
                border: `1px solid ${LINE}`,
                borderRadius: 9,
                padding: "9px 17px",
                fontFamily: sans,
                fontSize: 15,
                color: INK,
              }}
            >
              Manage subscription
            </span>
          </div>

          <div
            style={{
              background: SURFACE,
              borderRadius: 14,
              padding: "16px 20px",
              marginTop: 12,
              opacity: packs,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontFamily: sans, fontSize: 17, fontWeight: 600, color: INK }}>
                Top-up pack
              </span>
              <span style={{ fontFamily: sans, fontSize: 15, color: MUTED }}>
                ~500 messages of extra usage · one-time
              </span>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: sans, fontSize: 20, fontWeight: 700, color: INK }}>
                €9
              </span>
              <span
                style={{
                  background: ACCENT,
                  color: PAGE,
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontFamily: sans,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Buy
              </span>
            </div>
          </div>

          <div style={{ fontFamily: sans, fontSize: 15, color: MUTED, marginTop: 16, lineHeight: 1.55, opacity: note }}>
            Packs never expire. Subscribing again returns &ldquo;You already have
            an active subscription. Use Manage subscription to change plans.&rdquo;
          </div>
        </Sheet>
      </AbsoluteFill>
    </Stage>
  );
};
