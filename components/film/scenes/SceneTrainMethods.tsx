import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { sans } from "../font";

/**
 * Choosing a training method.
 *
 * The product's own picker, card for card: title, method code, the paragraph
 * that explains when to reach for it, and the bullets underneath. Two of the
 * four carry a NEW badge, as they do in the app.
 *
 * The earlier version of this beat was an invented "idea of training" — four
 * abstract tiles that matched nothing. This is the screen.
 */

export const METHODS = [
  {
    title: "Supervised Fine-Tune",
    code: "SFT",
    mark: "✎",
    desc: "Train a base model directly on labelled examples. The workhorse for teaching format, tone, and task behaviour.",
    bullets: ["One base model, one dataset", "Fastest to set up"],
  },
  {
    title: "Preference (DPO)",
    code: "DPO",
    mark: "⚖",
    isNew: true,
    desc: "Teach the model to prefer a chosen response over a rejected one — direct preference optimization, no reward model or rollouts.",
    bullets: [
      "{prompt, chosen, rejected} pairs",
      "Minimal pairs give the cleanest signal",
      "No reward model required",
    ],
  },
  {
    title: "Reinforcement (GRPO)",
    code: "GRPO",
    mark: "◠",
    desc: "Optimise a policy against a reward signal or verifiable environment. Best for reasoning and tool-use gains.",
    bullets: ["Reward or environment driven", "No labelled targets required"],
  },
  {
    title: "Knowledge Distillation",
    code: "DISTILL",
    mark: "⇅",
    isNew: true,
    desc: "Transfer a large teacher's probability distribution into a smaller, cheaper student — richer signal than hard labels alone.",
    bullets: [
      "Teacher → student pairing (same tokenizer)",
      "Offline top-K logit capture",
      "Combined CE + KL loss",
    ],
  },
] as const;

const AUTHORED = 5;
const PICK_AT = 74;

export const SceneTrainMethods: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const picked = frame >= t(PICK_AT);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.9, focus: { x: 0.5, y: 0.5 } },
          { at: t(PICK_AT) - t(10), over: t(26), scale: 0.96, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1500} hot at={0} style={{ padding: "28px 30px 24px" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
              {METHODS.map((m, i) => (
                <MethodCard
                  key={m.code}
                  m={m}
                  at={t(4 + i * 8)}
                  selected={i === 0 && picked}
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 24,
                paddingTop: 20,
                borderTop: `1px solid ${c.border}`,
              }}
            >
              <Text size={17} muted style={{ flex: 1 }}>
                Selected:{" "}
                <span style={{ color: c.foreground, fontWeight: 600 }}>
                  {picked ? "Supervised Fine-Tune" : "—"}
                </span>
              </Text>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#3b2a06",
                  background: c.amber,
                  borderRadius: radius,
                  padding: "12px 24px",
                  boxShadow: picked ? "0 0 30px rgba(245,158,11,0.4)" : undefined,
                }}
              >
                Continue →
              </span>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const MethodCard: React.FC<{
  m: (typeof METHODS)[number];
  at: number;
  selected: boolean;
}> = ({ m, at, selected }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        border: `1px solid ${selected ? c.amber : c.border}`,
        borderRadius: 14,
        padding: "22px 22px 20px",
        background: c.card,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)`,
      }}
    >
      {"isNew" in m && m.isNew ? (
        <span
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontFamily: sans,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: c.amber600,
            background: c.amber50,
            borderRadius: 6,
            padding: "4px 9px",
          }}
        >
          NEW
        </span>
      ) : null}

      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 11,
          background: c.secondary,
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {m.mark}
      </div>

      <Heading size={22} style={{ marginTop: 18, lineHeight: 1.2 }}>
        {m.title}
      </Heading>
      <Text
        size={14}
        muted
        style={{ marginTop: 6, letterSpacing: "0.06em", fontFamily: sans }}
      >
        {m.code}
      </Text>

      <Text size={15.5} muted style={{ marginTop: 14, lineHeight: 1.5 }}>
        {m.desc}
      </Text>

      <div style={{ marginTop: 16 }}>
        {m.bullets.map((b) => (
          <div key={b} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
            <span style={{ color: c.amber, fontSize: 15 }}>✓</span>
            <Text size={15} style={{ lineHeight: 1.4 }}>
              {b}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};
