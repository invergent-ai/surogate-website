import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * The synthetic dataset builder — Data Designer.
 *
 * Not a form with a prompt box: a pipeline you build a column at a time, each
 * column a different kind of generator, with a judge column scoring what the
 * text columns produced. That is the thing worth showing, so the shot is the
 * pipeline strip filling in and the New column menu opening on the choice.
 *
 * Every string here is the screen's own — the column types, their subtitles,
 * the toolbar labels, the empty-state line.
 */

const COLUMNS = [
  { n: 1, name: "instruction", kind: "LLM Text", type: "string", tint: c.amber },
  { n: 2, name: "response", kind: "LLM Text", type: "string", tint: c.amber },
  { n: 3, name: "quality", kind: "LLM Judge", type: "integer", tint: "#d946ef" },
  { n: 4, name: "llm_judge_4", kind: "LLM Judge", type: "string", tint: "#d946ef" },
] as const;

const MENU = [
  {
    title: "SAMPLE FROM DISTRIBUTION",
    sub: "STATISTICAL / DETERMINISTIC GENERATOR — NO LLM CALL",
    mark: "▦",
    tint: "#3b82f6",
  },
  {
    title: "GENERATE WITH LLM — TEXT",
    sub: "FREE-FORM TEXT FROM A JINJA2 PROMPT OVER OTHER COLUMNS",
    mark: "✦",
    tint: c.amber,
  },
  {
    title: "GENERATE WITH LLM — STRUCTURED",
    sub: "SCHEMA-ENFORCED JSON OUTPUT (PYDANTIC / JSON-SCHEMA)",
    mark: "≡",
    tint: "#6366f1",
  },
  {
    title: "GENERATE WITH LLM — CODE",
    sub: "CODE OUTPUT WITH SYNTAX VALIDATION",
    mark: "</>",
    tint: "#14b8a6",
  },
  {
    title: "JUDGE WITH LLM",
    sub: "RUBRIC SCORING OVER EXISTING COLUMNS",
    mark: "⚖",
    tint: "#d946ef",
  },
  {
    title: "COMPUTE FROM EXPRESSION",
    sub: "DERIVED COLUMN FROM A DETERMINISTIC EXPRESSION",
    mark: "ƒ",
    tint: "#0ea5e9",
  },
  {
    title: "VALIDATE",
    sub: "PASS/FAIL CHECK OVER ONE OR MORE COLUMNS",
    mark: "⛨",
    tint: "#22c55e",
  },
] as const;

/** The entry the shot lands on, and the column it adds. */
const PICK = 2;

const AUTHORED = 6;
const MENU_AT = 52;
const PICK_AT = 96;

export const SceneSynthetic: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const menuAt = t(MENU_AT);
  const pickAt = t(PICK_AT);
  const picked = frame >= pickAt;

  return (
    <Stage glow={{ x: 0.46, y: 0.4 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.9, focus: { x: 0.5, y: 0.5 } },
          { at: t(14), over: t(30), scale: 0.96, focus: { x: 0.5, y: 0.5 } },
          { at: menuAt, over: t(26), scale: 0.99, focus: { x: 0.5, y: 0.53 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1580} hot at={0} style={{ position: "relative" }}>
            {/* Title row. */}
            <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "24px 28px 0" }}>
              <Heading size={26}>my-synthetic-1</Heading>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 14,
                  color: c.mutedFg,
                  background: c.secondary,
                  borderRadius: 6,
                  padding: "4px 9px",
                }}
              >
                v1
              </span>
              <Pill tone="amber" style={{ fontSize: 15, padding: "6px 13px" }}>
                <span style={{ fontSize: 9 }}>●</span> Building
              </Pill>
              <span style={{ flex: 1 }} />
              <Text size={16} muted>
                Delete
              </Text>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#3b2a06",
                  background: c.amber,
                  borderRadius: radius - 2,
                  padding: "10px 18px",
                }}
              >
                Train on this →
              </span>
            </div>
            <Text size={15} muted style={{ padding: "6px 28px 0" }}>
              Synthetic · 0 rows
            </Text>

            {/* Tabs. */}
            <div
              style={{
                display: "flex",
                gap: 26,
                padding: "18px 28px 0",
                borderBottom: `1px solid ${c.border}`,
              }}
            >
              {["Overview", "Samples", "Pipeline", "Repository"].map((tab) => {
                const on = tab === "Pipeline";
                return (
                  <div
                    key={tab}
                    style={{
                      fontFamily: sans,
                      fontSize: 16,
                      fontWeight: on ? 600 : 400,
                      color: on ? c.foreground : c.mutedFg,
                      paddingBottom: 10,
                      borderBottom: `2px solid ${on ? c.amber : "transparent"}`,
                    }}
                  >
                    {tab}
                  </div>
                );
              })}
            </div>

            {/* Toolbar. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 28px",
                borderBottom: `1px solid ${c.border}`,
                background: c.sidebar,
              }}
            >
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: c.amber600,
                  background: c.amber50,
                  borderRadius: 6,
                  padding: "6px 10px",
                }}
              >
                ✦ DATA DESIGNER
              </span>
              <Text size={14} muted>
                unsaved
              </Text>
              <Field label="ROWS" value="5000" />
              <Field label="PREVIEW" value="20" />
              <Field label="DEFAULT MODEL" value="Surogate" wide />
              <span style={{ flex: 1 }} />
              <Ghost>✦ Preview</Ghost>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#3b2a06",
                  background: c.amber,
                  borderRadius: radius - 3,
                  padding: "9px 18px",
                  boxShadow: picked ? "0 0 26px rgba(245,158,11,0.45)" : undefined,
                }}
              >
                ▷ Run
              </span>
            </div>

            {/* The pipeline itself. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 28px",
              }}
            >
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  color: c.mutedFg,
                }}
              >
                PIPELINE {picked ? COLUMNS.length + 1 : COLUMNS.length}
              </span>
              {COLUMNS.map((col, i) => (
                <React.Fragment key={col.name}>
                  <Chip col={col} at={t(8 + i * 7)} />
                  <span style={{ color: c.mutedFg, fontSize: 15 }}>›</span>
                </React.Fragment>
              ))}
              {picked ? (
                <Chip
                  col={{
                    n: 5,
                    name: "rubric_json",
                    kind: "LLM Structured",
                    type: "json",
                    tint: "#6366f1",
                  }}
                  at={pickAt}
                />
              ) : null}
              <span style={{ flex: 1 }} />
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 15,
                  fontWeight: 600,
                  color: c.amber600,
                  border: `1px solid ${c.amber}`,
                  borderRadius: radius - 3,
                  padding: "9px 16px",
                }}
              >
                + Add column
              </span>
            </div>

            {/* Column headers, then the empty state the screen actually shows. */}
            <div
              style={{
                display: "flex",
                borderTop: `1px solid ${c.border}`,
                borderBottom: `2px solid ${c.amber}`,
              }}
            >
              <HeadCell width={64} />
              {COLUMNS.map((col) => (
                <HeadCell key={col.name} col={col} />
              ))}
            </div>
            <div
              style={{
                height: 190,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text size={17} muted>
                No preview data yet — click{" "}
                <span style={{ color: c.foreground, fontWeight: 600 }}>Preview</span> to
                generate sample rows.
              </Text>
            </div>

          </Panel>

          {/* Outside the panel: it clips its own overflow, and this menu
              overlays the page in the product. */}
          {frame >= menuAt ? <NewColumnMenu start={menuAt} picked={picked} t={t} /> : null}
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Field: React.FC<{ label: string; value: string; wide?: boolean }> = ({
  label,
  value,
  wide,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
    <span
      style={{
        fontFamily: sans,
        fontSize: 13,
        letterSpacing: "0.08em",
        color: c.mutedFg,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: sans,
        fontSize: 15,
        border: `1px solid ${c.border}`,
        borderRadius: radius - 3,
        padding: "8px 14px",
        minWidth: wide ? 150 : 70,
      }}
    >
      {value}
      {wide ? <span style={{ float: "right", color: c.mutedFg }}>⌄</span> : null}
    </span>
  </div>
);

const Ghost: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      fontFamily: sans,
      fontSize: 15,
      fontWeight: 600,
      color: c.amber600,
      border: `1px solid ${c.amber}`,
      borderRadius: radius - 3,
      padding: "9px 16px",
    }}
  >
    {children}
  </span>
);

type Col = { n: number; name: string; kind: string; type: string; tint: string };

const Chip: React.FC<{ col: Col; at: number }> = ({ col, at }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        border: `1px solid ${c.border}`,
        borderRadius: radius,
        padding: "10px 15px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
      }}
    >
      <span style={{ fontFamily: mono, fontSize: 14, color: c.mutedFg }}>{col.n}</span>
      <span style={{ color: col.tint, fontSize: 14 }}>✦</span>
      <span style={{ fontFamily: sans, fontSize: 16, fontWeight: 500 }}>{col.name}</span>
      <span style={{ fontFamily: sans, fontSize: 14, color: c.mutedFg }}>{col.kind}</span>
    </div>
  );
};

const HeadCell: React.FC<{ col?: Col; width?: number }> = ({ col, width }) => (
  <div
    style={{
      width: width ?? undefined,
      flex: width ? undefined : 1,
      padding: "14px 18px",
      borderRight: `1px solid ${c.border}`,
    }}
  >
    {col ? (
      <>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: col.tint, fontSize: 14 }}>✦</span>
          <span style={{ fontFamily: sans, fontSize: 17, fontWeight: 600 }}>{col.name}</span>
        </div>
        <div style={{ fontFamily: sans, fontSize: 14, marginTop: 4, color: c.mutedFg }}>
          {col.type} · <span style={{ color: col.tint }}>{col.kind}</span>
        </div>
      </>
    ) : (
      <span style={{ fontFamily: mono, fontSize: 14, color: c.mutedFg }}>#</span>
    )}
  </div>
);

/**
 * The generator menu. It is the whole argument of the beat — synthetic data
 * here is not one prompt, it is a choice of generator per column — so it opens
 * over the table and the entries land one at a time.
 */
const NewColumnMenu: React.FC<{
  start: number;
  picked: boolean;
  t: (f: number) => number;
}> = ({ start, picked, t }) => {
  const s = useSpringAt(start);
  return (
    <div
      style={{
        position: "absolute",
        right: 150,
        top: 452,
        width: 470,
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        boxShadow: "0 40px 90px rgba(0,0,0,0.35)",
        padding: "16px 0 12px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [-10, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: sans,
          fontSize: 14,
          letterSpacing: "0.1em",
          color: c.mutedFg,
          padding: "0 22px 10px",
        }}
      >
        NEW COLUMN
      </div>
      {MENU.map((m, i) => (
        <MenuRow key={m.title} m={m} at={start + t(4 + i * 4)} on={picked && i === PICK} />
      ))}
    </div>
  );
};

const MenuRow: React.FC<{ m: (typeof MENU)[number]; at: number; on: boolean }> = ({
  m,
  at,
  on,
}) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        gap: 13,
        padding: "8px 22px",
        background: on ? c.amber50 : "transparent",
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [12, 0])}px)`,
      }}
    >
      <span style={{ color: m.tint, fontSize: 15, marginTop: 2 }}>{m.mark}</span>
      <div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: c.foreground,
          }}
        >
          {m.title}
        </div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 12.5,
            lineHeight: 1.3,
            color: c.mutedFg,
            marginTop: 2,
          }}
        >
          {m.sub}
        </div>
      </div>
    </div>
  );
};
