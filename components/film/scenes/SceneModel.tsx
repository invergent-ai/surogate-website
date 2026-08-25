import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { SourceCard } from "../ui/SourceGrid";
import { Heading, Pill, Text } from "../ui/kit";
import { Typed, useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * The model.
 *
 * Where the agent's brain comes from. Two screens: the four deploy sources —
 * the product's own cards and copy — and then the Hugging Face form filling in
 * and deploying.
 *
 * Hugging Face is the one worth showing: Local Hub is where your own trained
 * runs land, which the training beat covers later, and a URL field is a URL
 * field. Pulling a public model by repo is the one that reads as *choice*.
 */

const SOURCES = [
  {
    name: "Local Hub",
    desc: "A model already in your hub — trained runs land here.",
    mark: "◫",
  },
  {
    name: "Hugging Face",
    desc: "Pull a public model by repo + revision; pick a quantization.",
    mark: "↓",
  },
  { name: "OpenRouter", desc: "Use OpenRouter as the backing endpoint.", mark: "⊕" },
  {
    name: "URL",
    desc: "Any OpenAI-compatible endpoint — your vLLM, OpenAI, Anthropic…",
    mark: "⛓",
  },
] as const;

const PICK = 1;
const REPO = "Qwen/Qwen2.5-Coder-7B";

const AUTHORED = 6;
const PICK_AT = 34;
const SWAP = 48;
const DEPLOY = 128;

export const SceneModel: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const swap = t(SWAP);

  const hand = interpolate(frame, [swap, swap + t(18)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = hand < 0.5 ? 2 * hand * hand : 1 - Math.pow(-2 * hand + 2, 2) / 2;
  const outOpacity = Math.max(0, 1 - eased * 2.1);
  const inOpacity = Math.max(0, (eased - 0.5) / 0.5);
  // The serving row grows the panel downward, straight into the caption.
  const lift = interpolate(frame, [t(DEPLOY), t(DEPLOY) + t(14)], [0, 76], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.5 } },
          { at: t(PICK_AT) - t(6), over: t(20), scale: 1.06, focus: { x: 0.5, y: 0.5 } },
          { at: swap, over: t(20), scale: 0.98, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        {/* ── where it comes from ────────────────────────────── */}
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: outOpacity,
            transform: `translateX(${-eased * 1080}px)`,
          }}
        >
          <div style={{ width: 980 }}>
            <Heading size={26} style={{ color: "#fff", marginBottom: 18 }}>
              Deploy a model
            </Heading>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
              }}
            >
              {SOURCES.map((s, i) => (
                <SourceCard
                  key={s.name}
                  source={s}
                  at={t(2 + i * 3)}
                  picked={i === PICK && frame >= t(PICK_AT)}
                />
              ))}
            </div>
          </div>
        </AbsoluteFill>

        {/* ── and how it gets deployed ───────────────────────── */}
        {inOpacity > 0 ? (
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "center",
              opacity: inOpacity,
              transform: `translateX(${(1 - eased) * 1080}px) translateY(${-lift}px)`,
            }}
          >
            <DeployForm t={t} lift={lift} />
          </AbsoluteFill>
        ) : null}
      </Camera>
    </Stage>
  );
};

const DeployForm: React.FC<{ t: (f: number) => number; lift: number }> = ({ t }) => {
  const frame = useCurrentFrame();
  const repoAt = t(SWAP + 12);
  const typed = REPO.slice(
    0,
    Math.max(0, Math.floor((frame - repoAt) * 1.4)),
  );
  const deployAt = t(DEPLOY);
  const deployed = frame >= deployAt;
  // The display name is derived, not typed — that is what the form does.
  const display = typed.split("/").pop()?.toLowerCase() ?? "";

  return (
    <Panel width={860} hot at={t(SWAP)} style={{ padding: "30px 34px 32px" }}>
      <Heading size={24} style={{ marginBottom: 22 }}>
        Hugging Face
      </Heading>

      <FormField
        label="Repository"
        required
        hint="Search by name, or paste a repo id."
        at={t(SWAP + 6)}
        focused={frame >= repoAt && !deployed}
      >
        <span style={{ fontFamily: sans, fontSize: 19 }}>
          {typed || <span style={{ color: c.mutedFg }}>Qwen/Qwen2.5-Coder-7B</span>}
        </span>
      </FormField>

      <FormField label="Revision" hint="Branch, tag, or commit." at={t(SWAP + 30)}>
        <span style={{ fontFamily: mono, fontSize: 19 }}>
          <Typed text="main" at={t(SWAP + 36)} cps={0.8} caret={false} />
        </span>
      </FormField>

      <FormField
        label="Display name"
        hint="Shown in the models list and to your agents."
        at={t(SWAP + 42)}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: 19,
            color: display ? c.foreground : c.mutedFg,
          }}
        >
          {display || "qwen2.5-coder-7b"}
        </span>
      </FormField>

      <DeployButton at={t(SWAP + 52)} pressed={frame >= deployAt - 4} />

      {deployed ? <ServingRow start={deployAt} /> : null}
    </Panel>
  );
};

const FormField: React.FC<{
  label: string;
  hint: string;
  at: number;
  required?: boolean;
  focused?: boolean;
  children: React.ReactNode;
}> = ({ label, hint, at, required, focused, children }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        marginBottom: 20,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 8 }}>
        {label}
        {required ? <span style={{ color: c.amber, marginLeft: 5 }}>*</span> : null}
      </div>
      <div
        style={{
          background: c.secondary,
          border: `1px solid ${focused ? c.amber : c.border}`,
          borderRadius: radius,
          padding: "14px 16px",
          minHeight: 26,
          boxShadow: focused ? "0 0 22px rgba(245,158,11,0.22)" : undefined,
        }}
      >
        {children}
      </div>
      <Text size={15} muted style={{ marginTop: 7 }}>
        {hint}
      </Text>
    </div>
  );
};

const DeployButton: React.FC<{ at: number; pressed: boolean }> = ({ at, pressed }) => {
  const s = useSpringAt(at);
  return (
    <div style={{ opacity: s, transform: `scale(${pressed ? 0.97 : 1})` }}>
      <span
        style={{
          display: "inline-flex",
          background: c.amber,
          color: "#3b2a06",
          fontSize: 19,
          fontWeight: 600,
          padding: "13px 24px",
          borderRadius: radius,
          boxShadow: pressed ? "0 0 34px rgba(245,158,11,0.5)" : undefined,
        }}
      >
        Deploy →
      </span>
    </div>
  );
};

/** What the deploy produced: an endpoint the agent can be pointed at. */
const ServingRow: React.FC<{ start: number }> = ({ start }) => {
  const s = useSpringAt(start);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginTop: 20,
        background: c.green50,
        border: "1px solid rgba(34,197,94,0.35)",
        borderRadius: radius,
        padding: "16px 20px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
      }}
    >
      <Text size={18} weight={500}>
        qwen2.5-coder-7b
      </Text>
      <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg, flex: 1 }}>
        1 × H200 · vLLM
      </span>
      <Pill tone="success" style={{ fontSize: 15, padding: "6px 14px" }}>
        Serving
      </Pill>
    </div>
  );
};
