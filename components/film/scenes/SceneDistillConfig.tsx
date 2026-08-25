import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Pill, Text, Toggle } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * Distillation, configured.
 *
 * The run detail shows a distillation run finishing; this shows what makes it
 * distillation. Three cards off the Configuration tab: the teacher and its
 * tokenizer constraint, how much of the teacher's distribution is kept per
 * token, and the loss that mixes hard labels with the teacher's soft ones.
 *
 * The page is taller than the frame, so it scrolls — which is also how you read
 * it. The one interaction is the weight mix moving off 50/50, because that is
 * the knob the whole card exists for, and the resolved objective recomputing
 * underneath is the proof it is live.
 */

const TOPK = [
  { k: "32", bytes: "192 B", m100: "~19 GB", b1: "~192 GB" },
  { k: "64", bytes: "384 B", m100: "~38 GB", b1: "~384 GB", rec: true },
  { k: "128", bytes: "768 B", m100: "~77 GB", b1: "~768 GB" },
] as const;

const AUTHORED = 7;
/** The KD weight is pulled up here. */
const MIX_AT = 150;

export const SceneDistillConfig: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  // Reading the page: teacher, then the storage table, then the loss.
  const scroll = interpolate(frame, [t(52), t(168)], [0, -556], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const kd = interpolate(frame, [t(MIX_AT), t(MIX_AT + 22)], [0.5, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ce = 1 - kd;

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.92, focus: { x: 0.5, y: 0.5 } },
          { at: t(12), over: t(40), scale: 0.98, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1500} hot at={0} style={{ padding: "24px 30px 26px" }}>
            {/* Title row. */}
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <Heading size={25}>northwind-distill-004</Heading>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: c.mutedFg,
                  background: c.secondary,
                  borderRadius: 6,
                  padding: "5px 10px",
                }}
              >
                DISTILL
              </span>
              <Pill tone="amber" style={{ fontSize: 15, padding: "6px 13px" }}>
                <span style={{ fontSize: 9 }}>●</span> Queued
              </Pill>
              <span style={{ flex: 1 }} />
              {["Start", "Clone"].map((a, i) => (
                <span
                  key={a}
                  style={{
                    fontFamily: sans,
                    fontSize: 15,
                    fontWeight: 600,
                    borderRadius: radius - 2,
                    padding: "9px 18px",
                    color: i === 0 ? "#3b2a06" : c.foreground,
                    background: i === 0 ? c.amber : c.card,
                    border: `1px solid ${i === 0 ? "transparent" : c.border}`,
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
            <Text size={16} muted style={{ marginTop: 8 }}>
              DISTILL · base Llama-3.2-3B · northwind-marketing-v1 · MODAL-PLATFORM ·
              H200:1 · Est. cost $3.05
            </Text>

            {/* Tabs. */}
            <div
              style={{
                display: "flex",
                gap: 26,
                marginTop: 18,
                borderBottom: `1px solid ${c.border}`,
              }}
            >
              {["Overview", "Configuration", "Datasets", "Checkpoints", "Lineage", "Repository"].map(
                (tab) => {
                  const on = tab === "Configuration";
                  return (
                    <div
                      key={tab}
                      style={{
                        fontFamily: sans,
                        fontSize: 16,
                        fontWeight: on ? 600 : 400,
                        color: on ? c.foreground : c.mutedFg,
                        paddingBottom: 11,
                        borderBottom: `2px solid ${on ? c.amber : "transparent"}`,
                      }}
                    >
                      {tab}
                    </div>
                  );
                },
              )}
            </div>

            {/* The configuration itself — taller than the frame, so it scrolls. */}
            <div style={{ height: 424, overflow: "hidden", position: "relative", marginTop: 16 }}>
              <div style={{ transform: `translateY(${scroll}px)` }}>
                <Card
                  at={t(4)}
                  mark="🎓"
                  title="DISTILLATION"
                  sub="Teacher capture — the teacher must share the student's tokenizer. Changing it after capture forces a recapture."
                >
                  <Label>TEACHER MODEL</Label>
                  <div
                    style={{
                      border: `1px solid ${c.border}`,
                      borderRadius: radius,
                      padding: "13px 18px",
                      fontFamily: sans,
                      fontSize: 18,
                      marginTop: 9,
                    }}
                  >
                    Llama-3.1-70B-Instruct
                    <span style={{ float: "right", color: c.mutedFg }}>⌃⌄</span>
                  </div>
                </Card>

                <Card
                  at={t(10)}
                  mark="📦"
                  title="TOP-K & STORAGE"
                  sub="How much of the teacher distribution is preserved per token. Baked into the sidecars at capture time."
                >
                  <Label>TOP_K · LOGPROBS STORED PER TOKEN</Label>
                  <div style={{ marginTop: 12 }}>
                    <Row cells={["TOP_K", "BYTES / TOKEN", "100M TOKENS", "1B TOKENS"]} head />
                    {TOPK.map((r) => (
                      <Row
                        key={r.k}
                        cells={[r.k, r.bytes, r.m100, r.b1]}
                        rec={"rec" in r && r.rec}
                      />
                    ))}
                  </div>
                  <Hint>
                    <b>32</b> captures the bulk of the mass for a confident teacher; <b>64</b>{" "}
                    is the default trade-off; go to <b>128</b> for high-entropy targets or
                    temperatures above 1.5. Each sidecar stores K uint32 ids + K fp16
                    logprobs = 6·K bytes/token.
                  </Hint>
                </Card>

                <Card
                  at={t(16)}
                  mark="⚑"
                  title="DISTILLATION LOSS"
                  sub="L = ce_weight·CE + kd_weight·τ²·KL(teacher ‖ student), per valid token."
                  right="Pure distillation"
                >
                  <Weight
                    name="Cross-Entropy"
                    code="ce_weight"
                    desc="Standard hard-label loss on the ground-truth token (temperature 1)"
                    value={ce}
                  />
                  <Weight
                    name="KD · KL divergence"
                    code="kd_weight"
                    desc="τ²-scaled KL pulling the student toward the teacher's stored top-K distribution"
                    value={kd}
                  />

                  <Label style={{ marginTop: 18 }}>WEIGHT MIX</Label>
                  <div
                    style={{
                      display: "flex",
                      height: 8,
                      borderRadius: 999,
                      overflow: "hidden",
                      marginTop: 8,
                    }}
                  >
                    <div style={{ width: `${ce * 100}%`, background: c.amber }} />
                    <div style={{ width: `${kd * 100}%`, background: "#3b82f6" }} />
                  </div>
                  <div style={{ display: "flex", gap: 22, marginTop: 9 }}>
                    <Legend color={c.amber} label={`CE · ${ce.toFixed(2)}`} />
                    <Legend color="#3b82f6" label={`KD (KL) · ${kd.toFixed(2)}`} />
                  </div>

                  <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
                    <div style={{ flex: 1 }}>
                      <Label>TEMPERATURE τ</Label>
                      <div
                        style={{
                          border: `1px solid ${c.border}`,
                          borderRadius: radius,
                          padding: "12px 16px",
                          fontFamily: sans,
                          fontSize: 18,
                          marginTop: 8,
                        }}
                      >
                        1
                      </div>
                    </div>
                    <div style={{ flex: 1.4 }}>
                      <Label>RESOLVED OBJECTIVE</Label>
                      <div
                        style={{
                          border: `1px solid ${c.border}`,
                          borderRadius: radius,
                          padding: "12px 16px",
                          fontFamily: mono,
                          fontSize: 18,
                          marginTop: 8,
                        }}
                      >
                        {ce.toFixed(2)}·CE + {kd.toFixed(2)}·τ²KL
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Soft edges so cards arrive and leave rather than being sliced. */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(#fff 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 92%, #fff 100%)",
                }}
              />
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Card: React.FC<{
  at: number;
  mark: string;
  title: string;
  sub: string;
  right?: string;
  children: React.ReactNode;
}> = ({ at, mark, title, sub, right, children }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        padding: "20px 24px 22px",
        marginBottom: 14,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 9,
            background: c.amber50,
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {mark}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: sans,
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </div>
          <Text size={15.5} muted style={{ marginTop: 5, lineHeight: 1.45 }}>
            {sub}
          </Text>
        </div>
        {right ? (
          <span
            style={{
              fontFamily: sans,
              fontSize: 15,
              fontWeight: 500,
              border: `1px solid ${c.border}`,
              borderRadius: radius - 2,
              padding: "9px 15px",
              whiteSpace: "nowrap",
            }}
          >
            {right}
          </span>
        ) : null}
      </div>
      <div style={{ marginTop: 18 }}>{children}</div>
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      fontFamily: sans,
      fontSize: 13,
      letterSpacing: "0.08em",
      color: c.mutedFg,
      ...style,
    }}
  >
    {children}
  </div>
);

const Row: React.FC<{ cells: string[]; head?: boolean; rec?: boolean }> = ({
  cells,
  head,
  rec,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "10px 12px",
      borderRadius: 8,
      background: rec ? c.amber50 : "transparent",
    }}
  >
    {cells.map((cell, i) => (
      <div
        key={cell}
        style={{
          flex: i === 0 ? 1 : 1,
          textAlign: i === 0 ? "left" : "right",
          fontFamily: sans,
          fontSize: head ? 13 : 17,
          letterSpacing: head ? "0.08em" : undefined,
          color: head ? c.mutedFg : c.foreground,
          display: i === 0 ? "flex" : undefined,
          alignItems: "center",
          gap: 9,
        }}
      >
        {i === 0 && !head ? (
          <span style={{ color: rec ? c.amber : c.ring, fontSize: 11 }}>●</span>
        ) : null}
        {cell}
        {i === 0 && rec ? (
          <span style={{ fontSize: 13, fontWeight: 600, color: c.amber600 }}>
            · RECOMMENDED
          </span>
        ) : null}
      </div>
    ))}
  </div>
);

const Hint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "flex",
      gap: 12,
      background: c.sidebar,
      border: `1px solid ${c.border}`,
      borderRadius: radius,
      padding: "14px 18px",
      marginTop: 14,
    }}
  >
    <span style={{ fontSize: 15 }}>💡</span>
    <Text size={15} muted style={{ lineHeight: 1.5 }}>
      {children}
    </Text>
  </div>
);

const Weight: React.FC<{
  name: string;
  code: string;
  desc: string;
  value: number;
}> = ({ name, code, desc, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
    <div style={{ transform: "scale(1.3)", transformOrigin: "left center", flexShrink: 0 }}>
      <Toggle on />
    </div>
    <div style={{ flex: 1, minWidth: 0, marginLeft: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Text size={18} weight={600}>
          {name}
        </Text>
        <span
          style={{
            fontFamily: mono,
            fontSize: 14,
            color: c.mutedFg,
            background: c.muted,
            borderRadius: 5,
            padding: "3px 8px",
          }}
        >
          {code}
        </span>
      </div>
      <Text size={15} muted style={{ marginTop: 4 }}>
        {desc}
      </Text>
    </div>
    {/* The slider, with the handle where the value is. */}
    <div style={{ width: 260, position: "relative", flexShrink: 0 }}>
      <div style={{ height: 2, background: c.border }} />
      <div style={{ height: 2, background: c.foreground, width: `${value * 100}%`, marginTop: -2 }} />
      <div
        style={{
          position: "absolute",
          left: `calc(${value * 100}% - 6px)`,
          top: -5,
          width: 12,
          height: 12,
          background: c.foreground,
        }}
      />
    </div>
    <span style={{ fontFamily: sans, fontSize: 19, width: 62, textAlign: "right" }}>
      {value.toFixed(2)}
    </span>
  </div>
);

const Legend: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ width: 9, height: 9, background: color }} />
    <Text size={15} muted>
      {label}
    </Text>
  </div>
);
