import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 30 — Connect Stripe and set your pricing.
 *
 * Standalone, and the first of Season 4. The Monetize tab already ships with a
 * checklist — `SETUP_STEPS` in `agent-commerce-panel.tsx` — so the video simply
 * walks it, which is why the opening shot is the checklist itself.
 *
 * The fifth step, sharing the buy link, belongs to video 31. This one stops at
 * the point money can reach you.
 *
 * Copy is taken from that file: the step details, `STATUS_LABEL`,
 * `MODE_OPTIONS`, and the usage explainer written for builders with no AI
 * background.
 */

const GREEN = "#22C55E";

/* ── the checklist ──────────────────────────────────────────────── */

/** `SETUP_STEPS`, quoted. The fifth is video 31's subject. */
const STEPS: [string, string][] = [
  [
    "Connect Stripe",
    "Opens in a new tab. Link an existing Stripe account or create one there — payouts go directly to you.",
  ],
  [
    "Finish onboarding and come back",
    "Complete Stripe's form (identity, bank account) in the other tab, then return here — the status updates automatically.",
  ],
  [
    "Enable buyer sign-in",
    "Buyers create an account before paying. Configure Firebase Auth once per project in Settings.",
  ],
  [
    "Pick pricing and add offers",
    "Choose subscriptions, extra usage packs, or both, then add at least one offer with a price and the usage it includes.",
  ],
  [
    "Share with buyers",
    "Copy your buy link below and send it to customers, or embed the paywall on your own site.",
  ],
];

export const SceneStripeChecklist: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const note = useEnterAt(t(84), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1360} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ opacity: head }}>
            <Heading size={24}>Monetize</Heading>
            <Text size={16} muted style={{ marginTop: 4 }}>
              Five things stand between this agent and its first paying customer.
            </Text>
          </div>

          <div style={{ marginTop: 18 }}>
            {STEPS.map(([title, detail], i) => {
              const enter = Math.max(0, Math.min(1, (frame - t(12 + i * 11)) / t(10)));
              return (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    gap: 15,
                    padding: "11px 0",
                    borderBottom: i === STEPS.length - 1 ? "none" : `1px solid ${c.border}`,
                    opacity: enter,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      width: 26,
                      height: 26,
                      flex: "0 0 auto",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 999,
                      border: `1px solid ${c.border}`,
                      fontFamily: sans,
                      fontSize: 14,
                      fontWeight: 600,
                      color: c.mutedFg,
                      marginTop: 2,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <Text size={17} weight={600}>
                      {title}
                    </Text>
                    <Text size={15} muted style={{ marginTop: 2, lineHeight: 1.5 }}>
                      {detail}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>

          <Text size={16} muted style={{ marginTop: 16, lineHeight: 1.5, opacity: note }}>
            The page keeps this list and ticks items off as you go.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 1 · connect the account ───────────────────────────────── */

/**
 * The Stripe Connect card, before and after.
 *
 * Its subtitle swaps with the status: "Connect a Stripe account to start
 * charging for this agent." becomes "Payments and payouts run through your
 * Stripe account." `STATUS_LABEL` supplies the pill.
 */
export const SceneStripeConnect: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const card = useEnterAt(t(3), 12);
  const button = useEnterAt(t(20), 12);
  const active = useEnterAt(t(80), 14);
  const isActive = frame >= t(80);
  const note = useEnterAt(t(100), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1180} hot at={0} style={{ padding: "26px 30px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13, opacity: card }}>
            <Text size={19} weight={600}>
              Stripe Connect
            </Text>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 999,
                padding: "5px 13px",
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 500,
                background: isActive ? `${GREEN}1f` : "rgba(12,10,9,0.06)",
                color: isActive ? "#15803d" : c.mutedFg,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: isActive ? GREEN : c.mutedFg,
                }}
              />
              {isActive ? "Active" : "Not connected"}
            </span>
          </div>

          <Text size={16} muted style={{ marginTop: 8, lineHeight: 1.5, opacity: card }}>
            {isActive
              ? "Payments and payouts run through your Stripe account."
              : "Connect a Stripe account to start charging for this agent."}
          </Text>

          <div style={{ marginTop: 18, opacity: button }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: isActive ? "transparent" : c.amber,
                border: isActive ? `1px solid ${c.border}` : "none",
                color: isActive ? c.foreground : "#000",
                borderRadius: 8,
                padding: "10px 20px",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: isActive ? 400 : 600,
              }}
            >
              {isActive ? "Open Stripe dashboard" : "Connect Stripe"}
              {isActive ? null : (
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              )}
            </span>
          </div>

          <Text size={16} muted style={{ marginTop: 20, lineHeight: 1.55, opacity: note }}>
            Do Stripe&apos;s identity and bank-account form in the other tab,
            then come back. The status here updates on its own.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · pick a pricing model ──────────────────────────────── */

/** `MODE_OPTIONS`, verbatim. */
const MODES: [string, string][] = [
  ["Free", "Anyone with the link chats at no charge."],
  ["Subscription", "Recurring plans with usage included each period."],
  ["One-time packs", "Usage or feature packs bought once. They never expire."],
  ["Both", "Plans for regulars, one-time packs on top."],
];

export const SceneStripePricing: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 10);
  const cards = [
    useEnterAt(t(14), 10),
    useEnterAt(t(22), 10),
    useEnterAt(t(30), 10),
    useEnterAt(t(38), 10),
  ];
  const pick = useEnterAt(t(66), 12);
  const note = useEnterAt(t(90), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1520} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <Text size={17} weight={500} style={{ opacity: head }}>
            Pricing model
          </Text>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 13,
              marginTop: 14,
            }}
          >
            {MODES.map(([label, detail], i) => {
              const on = label === "Subscription" ? pick : 0;
              return (
                <div
                  key={label}
                  style={{
                    border: `1px solid ${on ? c.amber : c.border}`,
                    boxShadow: on ? `0 0 0 1px ${c.amber}` : "none",
                    borderRadius: radius,
                    padding: "16px 18px",
                    opacity: cards[i],
                    transform: `translateY(${(1 - cards[i]) * 8}px)`,
                  }}
                >
                  <Text size={18} weight={600}>
                    {label}
                  </Text>
                  <Text size={15} muted style={{ marginTop: 6, lineHeight: 1.5 }}>
                    {detail}
                  </Text>
                </div>
              );
            })}
          </div>

          <Text size={16} muted style={{ marginTop: 18, lineHeight: 1.5, opacity: note }}>
            Free keeps the buy link working with nothing to pay. The other three
            need at least one live offer before anyone can buy.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · write the offer ───────────────────────────────────── */

/**
 * The offer editor: Name, Price, Currency, Usage included, Billing interval.
 *
 * `USAGE_EXPLAINER` is the part worth quoting — it is written for builders with
 * no AI background, and it is the difference between pricing an agent and
 * guessing at it.
 */
export const SceneStripeOffer: React.FC = () => {
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const name = useEnterAt(t(14), 12);
  const price = useEnterAt(t(38), 12);
  const usage = useEnterAt(t(62), 12);
  const explain = useEnterAt(t(92), 14);
  const add = useEnterAt(t(126), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1240} hot at={0} style={{ padding: "26px 30px 28px" }}>
          <Text size={17} weight={500} style={{ opacity: head }}>
            New subscription
          </Text>

          <Field label="Name" enter={name}>
            <Box value="Starter" />
          </Field>

          <div style={{ display: "flex", gap: 14, marginTop: 16, opacity: price }}>
            <div style={{ flex: "0 0 200px" }}>
              <Text size={15} muted style={{ marginBottom: 7 }}>
                Price
              </Text>
              <Box value="19" />
            </div>
            <div style={{ flex: "0 0 160px" }}>
              <Text size={15} muted style={{ marginBottom: 7 }}>
                Currency
              </Text>
              <Box value="EUR" select />
            </div>
            <div style={{ flex: 1 }}>
              <Text size={15} muted style={{ marginBottom: 7 }}>
                Billing interval
              </Text>
              <Box value="Monthly" select />
            </div>
          </div>

          <Field label="Usage included" enter={usage}>
            <Box value="~1,000 messages" select />
          </Field>

          <div
            style={{
              display: "flex",
              gap: 13,
              alignItems: "flex-start",
              border: `1px solid ${c.border}`,
              background: "rgba(12,10,9,0.02)",
              borderRadius: radius,
              padding: "14px 17px",
              marginTop: 16,
              opacity: explain,
            }}
          >
            <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 3, flex: "0 0 auto" }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <Text size={15} muted style={{ lineHeight: 1.55 }}>
              One message is a question plus the agent&apos;s answer. ~100 suits
              a trial or a light month, ~1,000 is comfortable for someone
              chatting every day, and ~5,000 and up suits heavy or team use.
            </Text>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18, opacity: add }}>
            <span
              style={{
                background: c.amber,
                color: "#000",
                borderRadius: 8,
                padding: "10px 22px",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Add offer
            </span>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · what the buyer lands on ───────────────────────────── */

/**
 * The other side of everything the seller just configured: the buy page
 * (`features/public-agent/buy-page.tsx`) with the paywall inside it
 * (`public-agent-paywall.tsx`).
 *
 * The offer card is generated from the offer written two shots earlier — the
 * name, the price with `/ {billing_interval}`, and a usage line the paywall
 * composes itself: usage, browser minutes and media credits joined with `+`,
 * then "every period" for a subscription or "of extra usage · one-time" for a
 * pack. The button reads Subscribe or Buy for the same reason.
 *
 * The free-trial note above it is the platform's, not the seller's: "Try it
 * free first: every new user gets N of one-time trial usage."
 */
export const SceneStripeBuyPage: React.FC = () => {
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 12);
  const trial = useEnterAt(t(28), 12);
  const card = useEnterAt(t(52), 12);
  const detail = useEnterAt(t(76), 12);
  const cta = useEnterAt(t(104), 12);
  const note = useEnterAt(t(134), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1120} hot at={0} style={{ padding: "28px 32px 30px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, opacity: head }}>
            <div style={{ flex: 1 }}>
              <Heading size={27}>Northwind Support</Heading>
              <Text size={16} muted style={{ marginTop: 7, lineHeight: 1.55 }}>
                Answers about orders, returns and refunds, from the team&apos;s
                own policy documents.
              </Text>
            </div>
            <span
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 999,
                padding: "7px 16px",
                fontFamily: sans,
                fontSize: 15,
                fontWeight: 500,
                flex: "0 0 auto",
              }}
            >
              Sign in
            </span>
          </div>

          {/* the platform's own trial line, above the offers */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 13,
              border: `1px solid ${c.border}`,
              borderRadius: 14,
              padding: "14px 17px",
              marginTop: 20,
              opacity: trial,
            }}
          >
            <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}>
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            </svg>
            <Text size={15} muted style={{ lineHeight: 1.5 }}>
              Try it free first: every new user gets{" "}
              <span style={{ color: c.foreground, fontWeight: 500 }}>
                ~50 messages
              </span>{" "}
              of one-time trial usage. Sign in to start.
            </Text>
          </div>

          {/* the offer, as the paywall renders it */}
          <div
            style={{
              border: `1px solid ${c.border}`,
              borderRadius: 14,
              padding: "20px 22px",
              marginTop: 14,
              opacity: card,
            }}
          >
            <Text size={19} weight={600}>
              Starter
            </Text>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 7 }}>
              <span style={{ fontFamily: sans, fontSize: 34, fontWeight: 700 }}>
                €19
              </span>
              <span style={{ fontFamily: sans, fontSize: 18, color: c.mutedFg }}>
                / month
              </span>
            </div>
            <Text size={16} muted style={{ marginTop: 9, opacity: detail }}>
              ~1,000 messages every period
            </Text>
            <Text size={15} muted style={{ marginTop: 5, opacity: detail }}>
              Includes: Browser use · Knowledge base
            </Text>

            <div
              style={{
                background: c.amber,
                color: "#000",
                borderRadius: 9,
                padding: "12px 0",
                marginTop: 16,
                textAlign: "center",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 600,
                opacity: cta,
              }}
            >
              Subscribe
            </div>
          </div>

          <Text size={16} muted style={{ marginTop: 16, lineHeight: 1.55, opacity: note }}>
            Subscribe hands off to Stripe Checkout. You never build a payment
            form.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 5 · after they pay ────────────────────────────────────── */

/**
 * The buy page once the webhook lands.
 *
 * `buy-page.tsx` polls the entitlement after a checkout return and shows
 * "Payment received — your access is being activated…" until it does, then the
 * chat opens and the paywall collapses to a Manage subscription button that
 * drops the buyer into Stripe's own billing portal.
 */
export const SceneStripeAfter: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(6);
  const banner = useEnterAt(t(3), 12);
  const done = useEnterAt(t(56), 14);
  const isDone = frame >= t(56);
  const note = useEnterAt(t(88), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1120} hot at={0} style={{ padding: "26px 32px 28px" }}>
          {isDone ? (
            <div style={{ opacity: done }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Heading size={22} style={{ flex: 1 }}>
                  Northwind Support
                </Heading>
                <Text size={15} muted>
                  ana@harborlight.example
                </Text>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  border: `1px solid ${c.border}`,
                  borderRadius: 12,
                  padding: "15px 18px",
                  marginTop: 16,
                }}
              >
                <div style={{ flex: 1 }}>
                  <Text size={17} weight={600}>
                    Starter · active
                  </Text>
                  <Text size={15} muted style={{ marginTop: 3 }}>
                    ~1,000 messages this period
                  </Text>
                </div>
                <span
                  style={{
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "9px 18px",
                    fontFamily: sans,
                    fontSize: 16,
                  }}
                >
                  Manage subscription
                </span>
              </div>

              <div
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: 12,
                  padding: "15px 18px",
                  marginTop: 12,
                }}
              >
                <Text size={16} muted>
                  Ask about an order, a return, or a refund…
                </Text>
              </div>
            </div>
          ) : (
            <div
              style={{
                border: "1px solid rgba(29,158,117,0.4)",
                background: "rgba(29,158,117,0.1)",
                borderRadius: 10,
                padding: "16px 18px",
                opacity: banner,
              }}
            >
              <Text size={17} style={{ color: "#1d9e75" }}>
                Payment received — your access is being activated…
              </Text>
            </div>
          )}

          <Text size={16} muted style={{ marginTop: 18, lineHeight: 1.55, opacity: note }}>
            Stripe&apos;s webhook does the rest. The page polls until the
            entitlement lands, then the chat opens.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── the payoff ─────────────────────────────────────────────────── */

/** The checklist again, ticked as far as this video goes. */
export const SceneStripeLive: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 12);
  const note = useEnterAt(t(70), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1240} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <Text size={17} weight={500} style={{ opacity: head }}>
            Monetize
          </Text>

          <div style={{ marginTop: 16 }}>
            {STEPS.map(([title], i) => {
              const done = i < 4;
              const enter = Math.max(0, Math.min(1, (frame - t(10 + i * 8)) / t(9)));
              return (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "11px 0",
                    borderBottom: i === STEPS.length - 1 ? "none" : `1px solid ${c.border}`,
                    opacity: enter,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      width: 26,
                      height: 26,
                      flex: "0 0 auto",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 999,
                      background: done ? `${GREEN}26` : "transparent",
                      border: done ? "none" : `1px solid ${c.border}`,
                      fontFamily: sans,
                      fontSize: 14,
                      fontWeight: 600,
                      color: c.mutedFg,
                    }}
                  >
                    {done ? (
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <Text
                    size={17}
                    weight={done ? 400 : 600}
                    style={{ color: done ? c.mutedFg : c.foreground }}
                  >
                    {title}
                  </Text>
                </div>
              );
            })}
          </div>

          <Text size={17} muted style={{ marginTop: 16, lineHeight: 1.55, opacity: note }}>
            Money can reach your account now. One thing left, and it is the next
            video: getting the link in front of people.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── shared chrome ──────────────────────────────────────────────── */

const Field: React.FC<{
  label: string;
  enter: number;
  children: React.ReactNode;
}> = ({ label, enter, children }) => (
  <div style={{ marginTop: 16, opacity: enter }}>
    <Text size={15} muted style={{ marginBottom: 7 }}>
      {label}
    </Text>
    {children}
  </div>
);

const Box: React.FC<{ value: string; select?: boolean }> = ({ value, select }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      border: `1px solid ${c.border}`,
      borderRadius: 8,
      background: "rgba(12,10,9,0.04)",
      padding: "11px 15px",
    }}
  >
    <span style={{ flex: 1, fontFamily: sans, fontSize: 17 }}>{value}</span>
    {select ? (
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2.4}>
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : null}
  </div>
);
