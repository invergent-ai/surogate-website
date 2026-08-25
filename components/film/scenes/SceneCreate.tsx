import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading } from "../ui/kit";
import { Typed, typedFrames, useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * Create → persona. Two screens in one beat.
 *
 * They belong together: the form makes the agent exist, the persona makes it
 * somebody. Split across two shots the film read as a menu of pages; run one
 * into the other and it reads as a single act — describe it, and it's yours.
 *
 * The hand-off is a slide rather than a cut: the form leaves left as the
 * editor arrives from the right, so it reads as *next*, not *elsewhere*.
 *
 * Both halves use the product's own UI — real labels, real hint wording, real
 * field chrome. Only the sizes are scaled up for a hero video.
 */

const NAME = "Northwind Marketing";
const DESC =
  "Runs Northwind's marketing channel: drafts launch copy, keeps the content calendar honest, and answers questions about campaigns in flight.";

const SOUL = `# Northwind Marketing

*The voice of Northwind in public. Clear, specific,
never breathless.*

## Core Truths
**Say the thing.** Lead with what changed and who
it helps.
**No superlatives we can't defend.** "Fastest" needs
a benchmark or it doesn't ship.

## Communication Style
- Short sentences. One idea each.
- Active voice, present tense.
- Speak as "we". Never "leverage", "seamless".

## Boundaries
- Won't: announce a date engineering hasn't confirmed.
- Won't: name a customer without written permission.

## Pet Peeves
- Emoji as punctuation.
- "In today's fast-paced world."`;

/** Authored against a 7s shot; useTimeScale keeps it proportional if the cut moves. */
const AUTHORED = 7;
const NAME_AT = 10;
const NAME_CPS = 1.6;
/** Late enough that the finished form gets a beat to be read before it leaves. */
const SWAP = 112;
const HANDOFF = 22;

export const SceneCreate: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  const nameStart = t(NAME_AT);
  const typedName = NAME.slice(
    0,
    Math.max(0, Math.floor((frame - nameStart) * NAME_CPS)),
  );
  const slug = typedName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const swap = t(SWAP);
  // 0 → form, 1 → persona. One value drives both halves of the hand-off.
  const hand = interpolate(frame, [swap, swap + t(HANDOFF)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = hand < 0.5 ? 2 * hand * hand : 1 - Math.pow(-2 * hand + 2, 2) / 2;
  // The two panels must never sit on top of each other — overlapping text reads
  // as a glitch, not a hand-off. The form is gone before the editor is legible,
  // and the travel is a full panel width so they pass rather than dissolve.
  const outOpacity = Math.max(0, 1 - eased * 2.1);
  const inOpacity = Math.max(0, (eased - 0.5) / 0.5);
  const slugLive = frame > nameStart && frame < swap;

  const descAt = t(NAME_AT + typedFrames(NAME, NAME_CPS) + 8);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.9, focus: { x: 0.5, y: 0.48 } },
          { at: nameStart + 2, over: t(20), scale: 1.18, focus: { x: 0.5, y: 0.55 } },
          { at: t(SWAP - 24), over: t(20), scale: 0.86, focus: { x: 0.5, y: 0.48 } },
        ]}
      >
        {/* ── the form ───────────────────────────────────────── */}
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: outOpacity,
            transform: `translateX(${-eased * 1080}px)`,
          }}
        >
          <Panel width={880} hot at={0} style={{ padding: "40px 48px 42px" }}>
            <Field
              label="Agent name"
              required
              hint="This is how it appears in your dashboard."
              at={t(2)}
              focused={slugLive}
            >
              <Typed text={NAME} at={nameStart} cps={NAME_CPS} caret={frame < swap} />
            </Field>

            <Field
              label="What does this agent do?"
              required
              hint="One or two sentences. This shapes the agent's persona and appears on its overview page."
              at={t(5)}
              minHeight={100}
              focused={frame >= descAt}
            >
              <Typed text={DESC} at={descAt} cps={5.5} />
            </Field>

            <Field
              label="URL slug"
              hint="Locked after creation. Can be renamed later, but changes your agent's public URL."
              at={t(8)}
              split
              prefix="cloud.surogate.ai /"
              glow={slugLive}
            >
              <span style={{ fontFamily: mono, color: slugLive ? c.amber : c.foreground }}>
                {slug}
              </span>
            </Field>

            <CreateButton at={t(12)} />
          </Panel>
        </AbsoluteFill>

        {/* ── the persona ────────────────────────────────────── */}
        {inOpacity > 0 ? (
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "center",
              opacity: inOpacity,
              transform: `translateX(${(1 - eased) * 1080}px)`,
            }}
          >
            <SoulPanel start={swap} />
          </AbsoluteFill>
        ) : null}
      </Camera>
    </Stage>
  );
};

const SoulPanel: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  const scroll = interpolate(frame, [start + t(10), start + t(74)], [0, -220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const count = Math.round(
    interpolate(frame, [start, start + t(58)], [0, 1284], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <Panel width={880} hot at={start}>
      <PanelHead
        right={
          <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg }}>
            {count.toLocaleString()} / 20,000
          </span>
        }
      >
        <Heading size={23}>Soul (SOUL.md)</Heading>
      </PanelHead>

      <div style={{ height: 410, overflow: "hidden", position: "relative" }}>
        <div
          style={{
            margin: 0,
            padding: "22px 30px",
            fontFamily: mono,
            fontSize: 16.5,
            lineHeight: 1.72,
            transform: `translateY(${scroll}px)`,
            whiteSpace: "pre-wrap",
          }}
        >
          {SOUL.split("\n").map((line, i) => (
            <MdLine key={`${i}-${line}`} line={line} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(#fff 0%, rgba(255,255,255,0) 8%, rgba(255,255,255,0) 86%, #fff 100%)",
          }}
        />
      </div>
    </Panel>
  );
};

/** Just enough colouring that it reads as a document, not a textarea. */
const MdLine: React.FC<{ line: string }> = ({ line }) => {
  if (line.startsWith("#")) return <div style={{ fontWeight: 700 }}>{line}</div>;
  if (line.startsWith("*")) return <div style={{ color: c.amber }}>{line}</div>;
  if (line.startsWith("-")) return <div style={{ color: c.mutedFg }}>{line}</div>;
  return <div>{line || " "}</div>;
};

const Field: React.FC<{
  label: string;
  hint: string;
  at: number;
  required?: boolean;
  focused?: boolean;
  glow?: boolean;
  minHeight?: number;
  split?: boolean;
  prefix?: string;
  children: React.ReactNode;
}> = ({ label, hint, at, required, focused, glow, minHeight = 58, split, prefix, children }) => {
  const s = useSpringAt(at);
  // The border is a separate value rather than part of `input` because the
  // split variant drops one side. Spreading a `border` shorthand and then
  // overriding `borderRight` mixes shorthand with longhand for the same
  // property, which React warns about and which can render inconsistently.
  const edge = `1px solid ${focused || glow ? c.amber : c.border}`;
  const input: React.CSSProperties = {
    background: c.secondary,
    borderRadius: radius,
    padding: "15px 18px",
    minHeight,
    fontFamily: sans,
    fontSize: 20,
    lineHeight: 1.45,
    color: c.foreground,
    boxShadow: glow ? "0 0 24px rgba(245,158,11,0.26)" : undefined,
  };
  return (
    <div
      style={{
        marginBottom: 22,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 9 }}>
        {label}
        {required ? <span style={{ color: c.amber, marginLeft: 5 }}>*</span> : null}
      </div>
      {split ? (
        <div style={{ display: "flex" }}>
          <div
            style={{
              ...input,
              borderTop: edge,
              borderLeft: edge,
              borderBottom: edge,
              borderRadius: `${radius}px 0 0 ${radius}px`,
              color: c.mutedFg,
              fontFamily: mono,
              whiteSpace: "nowrap",
              boxShadow: undefined,
            }}
          >
            {prefix}
          </div>
          <div
            style={{
              ...input,
              border: edge,
              borderRadius: `0 ${radius}px ${radius}px 0`,
              flex: 1,
            }}
          >
            {children}
          </div>
        </div>
      ) : (
        <div style={{ ...input, border: edge }}>{children}</div>
      )}
      <div style={{ fontSize: 15, color: c.mutedFg, marginTop: 8, lineHeight: 1.4 }}>{hint}</div>
    </div>
  );
};

const CreateButton: React.FC<{ at: number }> = ({ at }) => {
  const s = useSpringAt(at);
  return (
    <div style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)` }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          background: c.amber,
          color: "#3b2a06",
          fontSize: 19,
          fontWeight: 600,
          padding: "14px 24px",
          borderRadius: radius,
        }}
      >
        🚀 Create agent
      </span>
    </div>
  );
};
