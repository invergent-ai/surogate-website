import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { sans } from "../font";

/**
 * How far into its own entrance the film opens.
 *
 * Frame 0 used to be genuinely empty — every entrance started there, so the
 * first thing painted was nothing, and `loop` came back to it every pass. The
 * opening beat starts part-way through instead: the panel is nearly in and its
 * contents are still arriving, so the first frame anyone sees is already moving.
 */
const LEAD = 6;
/** The panel's own fade is a longer window, so it needs a longer lead. */
const PANEL_LEAD = 12;

/**
 * Monetize, in two beats.
 *
 * One screen showing the checklist, the Stripe connection and the pricing model
 * at once was more than a shot can carry — the eye has nowhere to land. Split:
 * getting paid, then deciding what to charge.
 *
 * Copy is the panel's own, including the fee line. Nothing here is softened:
 * "Surogate takes a 5% platform fee per sale" is the sentence a seller wants
 * to find, so it stays in the frame rather than in a footnote.
 */

const STEPS = [
  { t: "Connect Stripe", done: true },
  { t: "Finish onboarding and come back", done: true },
  {
    t: "Enable buyer sign-in",
    now: true,
    d: "Buyers create an account before paying. Configure Firebase Auth once per project in Settings.",
  },
  { t: "Pick pricing and add offers" },
  { t: "Share with buyers" },
] as const;

const MODELS = [
  { mark: "🎁", t: "Free", d: "Anyone with the link chats at no charge." },
  { mark: "🗓", t: "Subscription", d: "Recurring plans with usage included each period." },
  { mark: "◎", t: "One-time packs", d: "Usage or feature packs bought once. They never expire." },
  { mark: "▤", t: "Both", d: "Plans for regulars, one-time packs on top." },
] as const;

const AUTHORED = 5;

/** ── 1 · Getting paid ─────────────────────────────────────────────── */
export const SceneStripe: React.FC = () => {
  const t = useTimeScale(AUTHORED);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: t(10), over: t(40), scale: 1.0, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1180} hot at={-PANEL_LEAD} style={{ padding: "26px 32px 28px" }}>
            <Heading size={25}>Monetize</Heading>
            <Text size={16} muted style={{ marginTop: 6 }}>
              Charge for access to this agent. Buyers pay into your own Stripe account;
              Surogate takes a 5% platform fee per sale.
            </Text>

            <Card at={t(3) - LEAD}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Text size={18} weight={600}>
                  How selling works
                </Text>
                <Text size={15} muted>
                  Step 3 of 5
                </Text>
              </div>
              <div style={{ marginTop: 12 }}>
                {STEPS.map((step, i) => (
                  <Step key={step.t} step={step} n={i + 1} at={t(3 + i * 3) - LEAD} />
                ))}
              </div>
            </Card>

            <Card at={t(30)}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Text size={19} weight={600}>
                  Stripe Connect
                </Text>
                <Pill tone="success" style={{ fontSize: 14, padding: "5px 12px" }}>
                  Active
                </Pill>
                <span style={{ flex: 1 }} />
                <Text size={16} muted>
                  Disconnect
                </Text>
                <Action>Open dashboard</Action>
              </div>
              <Text size={16} muted style={{ marginTop: 7 }}>
                Payments and payouts run through your Stripe account.
              </Text>
            </Card>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/** ── 2 · What to charge ───────────────────────────────────────────── */
const PICK_AT = 56;

export const ScenePricing: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const paid = frame >= t(PICK_AT);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: t(PICK_AT) - t(10), over: t(26), scale: 1.02, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1300} hot at={0} style={{ padding: "26px 32px 30px" }}>
            <Heading size={24}>Pricing model</Heading>
            <Text size={16} muted style={{ marginTop: 7 }}>
              How buyers pay for this agent. Switching keeps your existing offers and
              buyers.
            </Text>

            <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
              {MODELS.map((m, i) => (
                <Model key={m.t} m={m} at={t(4 + i * 5)} picked={paid ? i === 1 : i === 0} />
              ))}
            </div>

            <Text size={16} muted style={{ marginTop: 18 }}>
              {paid
                ? "Recurring plans, billed to your own Stripe account."
                : "This agent is free to use — pick a paid pricing model above to add offers."}
            </Text>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Card: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        padding: "18px 22px 20px",
        marginBottom: 14,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

const Step: React.FC<{ step: (typeof STEPS)[number]; n: number; at: number }> = ({
  step,
  n,
  at,
}) => {
  const s = useSpringAt(at);
  const now = "now" in step && step.now;
  const done = "done" in step && step.done;
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        padding: "7px 0",
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-10, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 999,
          flexShrink: 0,
          background: done ? c.green50 : now ? c.amber : c.muted,
          color: done ? c.green700 : now ? "#3b2a06" : c.mutedFg,
          fontFamily: sans,
          fontSize: 14,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {done ? "✓" : n}
      </div>
      <div style={{ minWidth: 0 }}>
        <Text size={17} muted={!now && !done} weight={now ? 600 : 400}>
          {step.t}
        </Text>
        {"d" in step && step.d ? (
          <Text size={15} muted style={{ marginTop: 4 }}>
            {step.d}{" "}
            <span style={{ color: c.amber, fontWeight: 600 }}>Set up in Settings</span>
          </Text>
        ) : null}
      </div>
    </div>
  );
};

const Model: React.FC<{
  m: (typeof MODELS)[number];
  at: number;
  picked: boolean;
}> = ({ m, at, picked }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        flex: 1,
        border: `1px solid ${picked ? c.amber : c.border}`,
        background: picked ? "#fffdf7" : c.card,
        borderRadius: 12,
        padding: "16px 18px 18px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
        boxShadow: picked ? "0 0 30px rgba(245,158,11,0.22)" : undefined,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: picked ? c.amber : c.secondary,
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {m.mark}
      </div>
      <Text size={18} weight={600} style={{ marginTop: 12 }}>
        {m.t}
      </Text>
      <Text size={15} muted style={{ marginTop: 6, lineHeight: 1.45 }}>
        {m.d}
      </Text>
    </div>
  );
};

const Action: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      fontFamily: sans,
      fontSize: 16,
      fontWeight: 600,
      color: "#3b2a06",
      background: c.amber,
      borderRadius: radius - 2,
      padding: "9px 18px",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);
