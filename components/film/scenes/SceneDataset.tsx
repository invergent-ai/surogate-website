import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading, Pill, Text, Toggle } from "../ui/kit";
import { Typed, useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * Dataset.
 *
 * The build is the point: chats are one of four sources, and what turns them
 * into training data is what you set here — name, filters, format, PII. So the
 * beat opens on the form and stays on it.
 *
 * Copy is the product's own "From your chats" form.
 */

const NAME = "northwind-marketing-v1";

const AUTHORED = 5.5;
/** The form is submitted here. */
const BUILD = 104;

export const SceneDataset: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  const buildAt = t(BUILD);
  const built = frame >= buildAt;
  // The result row makes the panel taller; lift it or it grows into the caption.
  const lift = interpolate(frame, [buildAt, buildAt + t(14)], [0, 132], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rows = Math.round(
    interpolate(frame, [buildAt, buildAt + t(30)], [0, 1284], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.5 } },
          { at: buildAt, over: t(22), scale: 1.02, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            // The result row grows the panel downward, into the caption.
            transform: `translateY(${-lift}px)`,
          }}
        >
          <BuildForm built={built} rows={rows} t={t} />
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const BuildForm: React.FC<{
  built: boolean;
  rows: number;
  t: (frame: number) => number;
}> = ({ built, rows, t }) => {
  const frame = useCurrentFrame();
  return (
    <Panel width={820} hot at={0} style={{ padding: "20px 30px 22px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: c.amber50,
          border: `1px solid ${c.amber}`,
          borderRadius: radius,
          padding: "12px 18px",
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: 20 }}>💬</span>
        <div>
          <Text size={18} weight={600}>
            From your chats
          </Text>
          <Text size={15} muted style={{ marginTop: 3 }}>
            Pick one or more agents to build from.
          </Text>
        </div>
      </div>

      <FormRow label="Dataset name" hint="Lowercase, hyphens. Used as the repo name." at={t(2)}>
        <div
          style={{
            background: c.secondary,
            border: `1px solid ${c.amber}`,
            borderRadius: radius,
            padding: "13px 16px",
            fontFamily: sans,
            fontSize: 19,
          }}
        >
          <Typed text={NAME} at={t(6)} cps={2.2} caret={!built} />
        </div>
      </FormRow>

      <FormRow label="Filters" at={t(22)}>
        <Check
          label="Only good chats — no crashes, denials, overrides or thumbs-down"
          on
        />
        <Check label="Drop messages shorter than 3 words" on={false} />
      </FormRow>

      <FormRow
        label="Format"
        hint="Each answered question becomes its own prompt and reply row."
        at={t(34)}
      >
        <Segmented options={["SFT pairs", "Raw messages"]} active="SFT pairs" />
      </FormRow>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 2,
          marginBottom: 15,
        }}
      >
        <div>
          <Text size={17} weight={500}>
            Scrub PII
          </Text>
          <Text size={15} muted style={{ marginTop: 3 }}>
            Removes personal information. The original is not kept.
          </Text>
        </div>
        <div style={{ transform: "scale(1.5)", transformOrigin: "right center" }}>
          <Toggle on={false} />
        </div>
      </div>

      <BuildButton at={t(46)} pressed={frame >= t(BUILD) - 4} />

      {built ? <BuiltRow start={t(BUILD)} rows={rows} /> : null}
    </Panel>
  );
};

const FormRow: React.FC<{
  label: string;
  hint?: string;
  at: number;
  children: React.ReactNode;
}> = ({ label, hint, at, children }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        marginBottom: 13,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
      }}
    >
      <Text size={17} weight={500} style={{ marginBottom: 8 }}>
        {label}
      </Text>
      {children}
      {hint ? (
        <Text size={15} muted style={{ marginTop: 7 }}>
          {hint}
        </Text>
      ) : null}
    </div>
  );
};

const Check: React.FC<{ label: string; on: boolean }> = ({ label, on }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 7 }}>
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        background: on ? c.amber : c.card,
        border: `1px solid ${on ? c.amber : c.border}`,
        color: "#3b2a06",
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {on ? "✓" : ""}
    </div>
    <Text size={17}>{label}</Text>
  </div>
);

const Segmented: React.FC<{ options: string[]; active: string }> = ({
  options,
  active,
}) => (
  <div
    style={{
      display: "inline-flex",
      background: c.secondary,
      border: `1px solid ${c.border}`,
      borderRadius: radius,
      padding: 4,
      gap: 4,
    }}
  >
    {options.map((o) => (
      <div
        key={o}
        style={{
          fontFamily: sans,
          fontSize: 17,
          fontWeight: o === active ? 600 : 400,
          color: o === active ? c.foreground : c.mutedFg,
          background: o === active ? c.card : "transparent",
          borderRadius: radius - 3,
          padding: "9px 18px",
        }}
      >
        {o}
      </div>
    ))}
  </div>
);

const BuildButton: React.FC<{ at: number; pressed: boolean }> = ({ at, pressed }) => {
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
        Build dataset
      </span>
    </div>
  );
};

/** What the build produced, landing under the button that made it. */
const BuiltRow: React.FC<{ start: number; rows: number }> = ({ start, rows }) => {
  const s = useSpringAt(start);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        marginTop: 20,
        background: c.green50,
        border: "1px solid rgba(34,197,94,0.35)",
        borderRadius: radius,
        padding: "16px 20px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
      }}
    >
      <Text size={18} weight={500} style={{ flex: 1 }}>
        {NAME}
      </Text>
      <span style={{ fontFamily: mono, fontSize: 22 }}>{rows.toLocaleString()}</span>
      <Text size={16} muted>
        rows
      </Text>
      <Pill tone="success" style={{ fontSize: 15, padding: "6px 14px" }}>
        Ready
      </Pill>
    </div>
  );
};

