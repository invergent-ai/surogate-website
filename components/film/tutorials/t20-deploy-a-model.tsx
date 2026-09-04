import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { Typed, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 20 — Deploy any model. First of Season 3.
 *
 * Sources: `dev-models-deploy-sources.png` (four cards, each with an
 * amber-tinted glyph and a "Choose →"), `dev-models-hf-form.png` (Repository,
 * Revision, Display name, and a Deploy button that stays disabled until the
 * repo is picked), and `dev-models-detail.png` — the serving banner, the five
 * tabs, four stat tiles, and the Deployment Info grid.
 */

const GREEN = "#059669";

/* ── step 1 · four places a model can come from ─────────────────── */

const SOURCES: [string, string, string][] = [
  ["Local Hub", "A model already in your hub — trained runs land here.", "M12 2.5 21 7v10l-9 4.5L3 17V7zM3 7l9 4.5M21 7l-9 4.5M12 21.5V11.5"],
  ["Hugging Face", "Pull a public model by repo + revision; pick a quantization.", "M12 3v10m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"],
  ["OpenRouter", "Use OpenRouter as the backing endpoint.", "M12 2.5a14 14 0 0 0 0 19 14 14 0 0 0 0-19M2.5 12h19M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19"],
  ["URL", "Any OpenAI-compatible endpoint — your vLLM, OpenAI, Anthropic…", "M10 13.5a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 10.5a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5"],
];

export const SceneModelSources: React.FC = () => {
  const t = useTimeScale(5);
  const e = [
    useEnterAt(t(4), 11),
    useEnterAt(t(16), 11),
    useEnterAt(t(28), 11),
    useEnterAt(t(40), 11),
  ];
  const frame = useCurrentFrame();
  const picked = frame >= t(74);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, width: 1500 }}>
          {SOURCES.map(([name, body, glyph], i) => {
            const on = picked && i === 1;
            return (
              <div
                key={name}
                style={{
                  background: on ? "#fffdf7" : c.card,
                  border: `1px solid ${on ? c.amber : c.border}`,
                  borderRadius: 14,
                  padding: "26px 28px",
                  minHeight: 196,
                  boxShadow: on
                    ? `0 24px 60px rgba(0,0,0,0.28), 0 0 50px ${c.amber}33`
                    : "0 20px 50px rgba(0,0,0,0.22)",
                  opacity: e[i],
                  transform: `translateY(${(1 - e[i]) * 12}px) scale(${on ? 1.015 : 1})`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${c.amber}24`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={c.amber600} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d={glyph} />
                  </svg>
                </div>
                <Text size={23} weight={600} style={{ marginTop: 16 }}>
                  {name}
                </Text>
                <Text size={17} muted style={{ marginTop: 9, lineHeight: 1.45 }}>
                  {body}
                </Text>
                <Text size={17} weight={500} style={{ color: c.amber600, marginTop: 14 }}>
                  {on ? "✓ Chosen" : "Choose →"}
                </Text>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · fill the form ─────────────────────────────────────── */

/**
 * Repository is a combobox, not a text field: you type and it searches Hugging
 * Face live, and you pick from the results. Showing it as a plain input would
 * misrepresent the one interesting interaction on this form — and would not
 * explain why Revision can only populate afterwards.
 */
const HITS: [string, string][] = [
  ["Qwen/Qwen3.8-27B", "1.2M downloads · updated 3 weeks ago"],
  ["Qwen/Qwen3.8-27B-Instruct", "902k downloads · updated 3 weeks ago"],
  ["Qwen/Qwen3.8-14B", "486k downloads · updated 1 month ago"],
  ["Qwen/Qwen3.8-4B", "231k downloads · updated 2 months ago"],
];

export const SceneModelForm: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const typeAt = t(14);
  const openAt = t(40);
  const pickAt = t(78);
  const revAt = t(96);
  const nameAt = t(112);
  const ready = frame >= t(126);

  const open = frame >= openAt && frame < pickAt;
  const chosen = frame >= pickAt;
  const rows = [useEnterAt(t(3), 10), useEnterAt(t(90), 10), useEnterAt(t(106), 10)];
  const hits = [
    useEnterAt(openAt, 7),
    useEnterAt(openAt + 5, 7),
    useEnterAt(openAt + 10, 7),
    useEnterAt(openAt + 15, 7),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.48 } },
          { at: t(90), over: t(60), scale: 1.0, focus: { x: 0.5, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1120} hot at={0} style={{ padding: "34px 42px 34px" }}>
            {/* the combobox, and its live results */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <Field label="Repository" required enter={rows[0]} focused={open}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      flex: 1,
                      fontFamily: chosen ? mono : sans,
                      color: chosen ? c.foreground : c.foreground,
                    }}
                  >
                    {chosen ? (
                      "Qwen/Qwen3.8-27B"
                    ) : (
                      <Typed text="qwen3.8-27" at={typeAt} cps={1.1} />
                    )}
                  </span>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2} strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
              </Field>

              {open ? (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 92,
                    background: c.card,
                    border: `1px solid ${c.border}`,
                    borderRadius: radius,
                    boxShadow: "0 24px 60px rgba(28,22,18,0.18)",
                    overflow: "hidden",
                  }}
                >
                  {HITS.map(([repo, meta], i) => (
                    <div
                      key={repo}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "13px 17px",
                        borderTop: i ? `1px solid ${c.border}` : "none",
                        background: i === 0 ? "#fffdf7" : "transparent",
                        opacity: hits[i],
                      }}
                    >
                      <span style={{ flex: 1, fontFamily: mono, fontSize: 18 }}>
                        {repo}
                      </span>
                      <span style={{ fontFamily: sans, fontSize: 15, color: c.mutedFg }}>
                        {meta}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <Hint>Search by name, or paste a repo id.</Hint>

            <div style={{ marginTop: 20 }} />
            <Field label="Revision" enter={rows[1]} muted={!chosen}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <span style={{ flex: 1, fontFamily: sans, color: frame < revAt ? c.mutedFg : c.foreground }}>
                  {frame < revAt ? "Select a repository first" : "main"}
                </span>
                <span style={{ color: c.mutedFg }}>⌄</span>
              </span>
            </Field>
            <Hint>Branch, tag, or commit.</Hint>

            <div style={{ marginTop: 20 }} />
            <Field label="Display name" enter={rows[2]}>
              <span style={{ fontFamily: sans, color: frame < nameAt ? c.mutedFg : c.foreground }}>
                {frame < nameAt ? "qwen3.8-27b" : "qwen3.8-27b"}
              </span>
            </Field>
            <Hint>Shown in the models list and to your agents.</Hint>

            {/* disabled until the repository is chosen */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 26,
                background: ready ? c.amber : `${c.amber}7a`,
                color: ready ? "#000" : "rgba(0,0,0,0.45)",
                borderRadius: radius,
                padding: "13px 26px",
                fontFamily: sans,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Deploy →
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Field: React.FC<{
  label: string;
  required?: boolean;
  enter: number;
  muted?: boolean;
  focused?: boolean;
  children: React.ReactNode;
}> = ({ label, required, enter, muted, focused, children }) => (
  <div style={{ opacity: enter }}>
    <Text size={17} weight={500} muted style={{ marginBottom: 9 }}>
      {label}
      {required ? <span style={{ color: c.amber }}> *</span> : null}
    </Text>
    <div
      style={{
        background: "#f7f7f6",
        border: `1px solid ${focused ? c.amber : c.border}`,
        boxShadow: focused ? `0 0 0 3px ${c.amber}22` : "none",
        borderRadius: radius,
        padding: "14px 17px",
        minHeight: 50,
        fontSize: 19,
        opacity: muted ? 0.65 : 1,
      }}
    >
      {children}
    </div>
  </div>
);

const Hint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text size={15} muted style={{ marginTop: 8, opacity: 0.8 }}>
    {children}
  </Text>
);

/* ── step 3 · it is serving ─────────────────────────────────────── */

/**
 * `dev-models-detail.png`: the name with a provider chip and an Available
 * badge, a green "Serving — ready to use" banner whose sub-line is the detail
 * that matters ("switched-on agents use this model for new chats — in-progress
 * chats keep the old one"), then five tabs and four stat tiles over the
 * Deployment Info grid.
 */
const TABS = ["Overview", "Performance", "Config", "Conversations", "Playground"];

const STATS: [string, string, string][] = [
  ["THROUGHPUT", "38.4", "tok/s"],
  ["AVG LATENCY", "312", "ms"],
  ["QUEUE DEPTH", "0", "reqs"],
  ["REQUESTS (24H)", "1,204", ""],
];

const INFO: [string, string][] = [
  ["REPLICAS", "1 / 1"],
  ["ENGINE", "vllm"],
  ["QUANTIZATION", "awq"],
  ["CONTEXT WINDOW", "32,768"],
  ["ERROR RATE", "0.0%"],
  ["UPTIME", "4h 12m"],
];

export const SceneModelServing: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const banner = useEnterAt(t(16), 12);
  const tabs = useEnterAt(t(30), 10);
  const stats = [
    useEnterAt(t(40), 9),
    useEnterAt(t(47), 9),
    useEnterAt(t(54), 9),
    useEnterAt(t(61), 9),
  ];
  const info = useEnterAt(t(76), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.44 } },
          { at: t(66), over: t(70), scale: 1.02, focus: { x: 0.5, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1620} hot at={0} style={{ padding: "26px 32px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: head }}>
              <Heading size={28}>qwen3.8-27b</Heading>
              <span
                style={{
                  background: "#f0efee",
                  borderRadius: 7,
                  padding: "5px 12px",
                  fontFamily: mono,
                  fontSize: 15,
                  color: c.mutedFg,
                }}
              >
                Hugging Face
              </span>
              <span
                style={{
                  background: "#d9f5e6",
                  color: "#14855c",
                  borderRadius: 999,
                  padding: "5px 14px",
                  fontFamily: sans,
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                ● Available
              </span>
            </div>

            {/* the banner, and the caveat inside it */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginTop: 18,
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                padding: "18px 22px",
                opacity: banner,
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: `${GREEN}1f`,
                  color: GREEN,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <div style={{ flex: 1 }}>
                <Text size={20} weight={600}>
                  Serving — ready to use.
                </Text>
                <Text size={16} muted style={{ marginTop: 5 }}>
                  Switched-on agents use this model for new chats (in-progress
                  chats keep the old one).
                </Text>
              </div>
              <div
                style={{
                  border: `1px solid ${c.amber}`,
                  borderRadius: 9,
                  padding: "12px 20px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 500,
                  color: c.amber600,
                }}
              >
                Switch on for an agent →
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 28,
                marginTop: 22,
                paddingBottom: 12,
                borderBottom: `1px solid ${c.border}`,
                opacity: tabs,
              }}
            >
              {TABS.map((tab, i) => (
                <span
                  key={tab}
                  style={{
                    fontFamily: sans,
                    fontSize: 18,
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? c.foreground : c.mutedFg,
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: 18 }}>
              {STATS.map(([label, value, unit], i) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    border: `1px solid ${c.border}`,
                    background: "#faf9f8",
                    borderRadius: 11,
                    padding: "16px 18px",
                    opacity: stats[i],
                  }}
                >
                  <Text size={14} muted style={{ letterSpacing: "0.09em" }}>
                    {label}
                  </Text>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 9 }}>
                    <span style={{ fontFamily: sans, fontSize: 28, fontWeight: 600 }}>
                      {value}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 16, color: c.mutedFg }}>
                      {unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px 30px",
                marginTop: 20,
                border: `1px solid ${c.border}`,
                borderRadius: 11,
                padding: "20px 24px",
                opacity: info,
              }}
            >
              {INFO.map(([label, value]) => (
                <div key={label}>
                  <Text size={14} muted style={{ letterSpacing: "0.09em" }}>
                    {label}
                  </Text>
                  <Text size={19} style={{ marginTop: 6, fontFamily: mono }}>
                    {value}
                  </Text>
                </div>
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── shared tab bar ─────────────────────────────────────────────── */

const TabBar: React.FC<{ active: number; enter: number }> = ({ active, enter }) => (
  <div
    style={{
      display: "flex",
      gap: 28,
      paddingBottom: 12,
      borderBottom: `1px solid ${c.border}`,
      opacity: enter,
    }}
  >
    {TABS.map((tab, i) => (
      <span
        key={tab}
        style={{
          fontFamily: sans,
          fontSize: 18,
          fontWeight: i === active ? 600 : 400,
          color: i === active ? c.foreground : c.mutedFg,
          borderBottom: i === active ? `2px solid ${c.amber}` : "2px solid transparent",
          paddingBottom: 10,
          marginBottom: -12,
        }}
      >
        {tab}
      </span>
    ))}
  </div>
);

/* ── step 4 · performance ───────────────────────────────────────── */

/**
 * `develop/features/models.md`: a period selector (Last hour / 24h / 30d)
 * driving five KPIs — Tokens/sec, Avg Latency, Total Tokens, Requests, Success
 * Rate — over sparklines for throughput, latency, total tokens and requests.
 */
const KPIS: [string, string, string][] = [
  ["Tokens/sec", "38.4", ""],
  ["Avg Latency", "312", "ms"],
  ["Total Tokens", "4.9M", ""],
  ["Requests", "1,204", ""],
  ["Success Rate", "99.8", "%"],
];

/** A deterministic wiggle, so the sparkline reads as data rather than décor. */
const spark = (seed: number, n = 34) =>
  Array.from({ length: n }, (_, i) =>
    0.45 + 0.35 * Math.sin(i / 3.1 + seed) + 0.12 * Math.sin(i / 1.3 + seed * 2),
  );

export const SceneModelPerformance: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const tabs = useEnterAt(t(3), 10);
  const kpis = [
    useEnterAt(t(12), 9),
    useEnterAt(t(18), 9),
    useEnterAt(t(24), 9),
    useEnterAt(t(30), 9),
    useEnterAt(t(36), 9),
  ];
  const charts = useEnterAt(t(52), 12);
  const draw = Math.min(1, Math.max(0, (frame - t(56)) / t(50)));

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1620} hot at={0} style={{ padding: "26px 32px 30px" }}>
          <TabBar active={1} enter={tabs} />

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, opacity: tabs }}>
            {["Last hour", "Last 24h", "Last 30d"].map((period, i) => (
              <span
                key={period}
                style={{
                  borderRadius: 999,
                  padding: "8px 17px",
                  fontFamily: sans,
                  fontSize: 16,
                  background: i === 1 ? c.primary : "#f3f1f1",
                  color: i === 1 ? c.primaryFg : c.mutedFg,
                }}
              >
                {period}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 13, marginTop: 20 }}>
            {KPIS.map(([label, value, unit], i) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  border: `1px solid ${c.border}`,
                  background: "#faf9f8",
                  borderRadius: 11,
                  padding: "15px 17px",
                  opacity: kpis[i],
                }}
              >
                <Text size={14} muted>
                  {label}
                </Text>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 8 }}>
                  <span style={{ fontFamily: sans, fontSize: 26, fontWeight: 600 }}>
                    {value}
                  </span>
                  <span style={{ fontFamily: sans, fontSize: 15, color: c.mutedFg }}>
                    {unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 14,
              marginTop: 18,
              opacity: charts,
            }}
          >
            {[
              ["Throughput", 0.4],
              ["Latency", 2.1],
              ["Total tokens", 3.7],
              ["Requests", 5.2],
            ].map(([label, seed]) => (
              <div
                key={label as string}
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: 11,
                  padding: "14px 16px",
                }}
              >
                <Text size={15} muted>
                  {label as string}
                </Text>
                <Spark seed={seed as number} draw={draw} />
              </div>
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const Spark: React.FC<{ seed: number; draw: number }> = ({ seed, draw }) => {
  const pts = spark(seed);
  const w = 700;
  const h = 74;
  const step = w / (pts.length - 1);
  const shown = Math.max(2, Math.round(pts.length * draw));
  const d = pts
    .slice(0, shown)
    .map((v, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)} ${(h - v * h).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 74, marginTop: 10 }}>
      <path d={d} fill="none" stroke={c.amber} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* ── step 5 · config ────────────────────────────────────────────── */

/**
 * `dev-models-config.png`. Generation defaults with four presets on the left,
 * serving parameters on the right.
 *
 * The api_key value is masked here, as it is in the docs screenshot — a serving
 * parameter holding a real key is not something a film should render.
 */
const DEFAULTS: [string, string][] = [
  ["temperature", "0.7"],
  ["topP", "0.9"],
  ["topK", "40"],
  ["maxTokens", "2048"],
  ["repetitionPenalty", "1"],
  ["stopSequences", "none"],
];

export const SceneModelConfig: React.FC = () => {
  const t = useTimeScale(5);
  const tabs = useEnterAt(t(3), 10);
  const left = useEnterAt(t(14), 10);
  const fields = [
    useEnterAt(t(24), 8),
    useEnterAt(t(30), 8),
    useEnterAt(t(36), 8),
    useEnterAt(t(42), 8),
    useEnterAt(t(48), 8),
    useEnterAt(t(54), 8),
  ];
  const right = useEnterAt(t(66), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1620} hot at={0} style={{ padding: "26px 32px 30px" }}>
          <TabBar active={2} enter={tabs} />

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20, opacity: tabs }}>
            <Text size={15} muted style={{ letterSpacing: "0.1em" }}>
              MODEL CONFIGURATION
            </Text>
            <div
              style={{
                background: c.amber,
                color: "#000",
                borderRadius: 9,
                padding: "11px 20px",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Save configuration
            </div>
          </div>

          <div style={{ display: "flex", gap: 18, marginTop: 20 }}>
            <div
              style={{
                flex: 1,
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                padding: "20px 24px",
                opacity: left,
              }}
            >
              <Text size={15} muted style={{ letterSpacing: "0.1em", marginBottom: 16 }}>
                GENERATION DEFAULTS
              </Text>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["Default", "Creative", "Precise", "Code"].map((preset, i) => (
                  <span
                    key={preset}
                    style={{
                      borderRadius: 8,
                      padding: "8px 16px",
                      fontFamily: sans,
                      fontSize: 16,
                      background: i === 0 ? "#f0efee" : "transparent",
                      fontWeight: i === 0 ? 500 : 400,
                      color: i === 0 ? c.foreground : c.mutedFg,
                    }}
                  >
                    {preset}
                  </span>
                ))}
              </div>
              {DEFAULTS.map(([key, value], i) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    marginBottom: 11,
                    opacity: fields[i],
                  }}
                >
                  <Text size={17} muted style={{ width: 220 }}>
                    {key}
                  </Text>
                  <div
                    style={{
                      width: 180,
                      background: "#f7f7f6",
                      border: `1px solid ${c.border}`,
                      borderRadius: 9,
                      padding: "10px 14px",
                      fontFamily: sans,
                      fontSize: 17,
                      color: value === "none" ? c.mutedFg : c.foreground,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                width: 560,
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                padding: "20px 24px",
                height: "fit-content",
                opacity: right,
              }}
            >
              <Text size={15} muted style={{ letterSpacing: "0.1em", marginBottom: 16 }}>
                SERVING PARAMETERS
              </Text>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 200,
                    background: "#f7f7f6",
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "11px 14px",
                    fontFamily: mono,
                    fontSize: 16,
                    color: c.mutedFg,
                  }}
                >
                  api_key
                </div>
                <div
                  style={{
                    flex: 1,
                    background: "#f0efee",
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "11px 14px",
                    fontFamily: mono,
                    fontSize: 16,
                    color: c.mutedFg,
                    letterSpacing: "0.12em",
                  }}
                >
                  ••••••••••••••••••••
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div
                  style={{
                    width: 200,
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "11px 14px",
                    fontFamily: mono,
                    fontSize: 15,
                    color: c.mutedFg,
                  }}
                >
                  max_num_seqs
                </div>
                <div
                  style={{
                    flex: 1,
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "11px 14px",
                    fontFamily: mono,
                    fontSize: 15,
                    color: c.mutedFg,
                  }}
                >
                  256
                </div>
                <div
                  style={{
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "11px 18px",
                    fontFamily: sans,
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  + ADD
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 6 · playground ────────────────────────────────────────── */

/** `dev-playground-parameters.png`: sliders over a preset list, each preset
 *  labelled with the temperature it sets. */
const SLIDERS: [string, string, number][] = [
  ["Temperature", "0.7", 0.35],
  ["Top P", "0.9", 0.9],
  ["Top K", "40", 0.4],
  ["Max Tokens", "2048", 0.12],
  ["Repetition Penalty", "1", 0.02],
];

const PRESETS: [string, string][] = [
  ["DEFAULT", "T = 0.7"],
  ["CREATIVE", "T = 1"],
  ["PRECISE", "T = 0.1"],
  ["CODE", "T = 0.2"],
  ["CX AGENT", "T = 0.3"],
];

export const SceneModelPlayground: React.FC = () => {
  const t = useTimeScale(5);
  const tabs = useEnterAt(t(3), 10);
  const chat = useEnterAt(t(16), 10);
  const reply = useEnterAt(t(44), 12);
  const panel = useEnterAt(t(26), 10);
  const presets = useEnterAt(t(64), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1620} hot at={0} style={{ padding: "26px 32px 30px" }}>
          <TabBar active={4} enter={tabs} />

          <div style={{ display: "flex", gap: 20, marginTop: 22 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "flex-end", opacity: chat }}>
                <div
                  style={{
                    background: "#f5f4f3",
                    borderRadius: 14,
                    padding: "15px 20px",
                    maxWidth: "76%",
                    fontFamily: sans,
                    fontSize: 19,
                    lineHeight: 1.5,
                  }}
                >
                  Summarise this refund policy in two sentences.
                </div>
              </div>
              <Text size={19} style={{ marginTop: 18, lineHeight: 1.6, opacity: reply }}>
                Refunds are accepted within 30 days of purchase, on annual and
                monthly plans alike. After that we offer a pro-rata credit
                rather than money back.
              </Text>

              <div
                style={{
                  marginTop: 26,
                  border: `1px solid ${c.border}`,
                  borderRadius: 14,
                  padding: "15px 18px",
                  fontFamily: sans,
                  fontSize: 18,
                  color: c.mutedFg,
                  opacity: chat,
                }}
              >
                Try a prompt against this model…
              </div>
            </div>

            {/* the parameters panel */}
            <div
              style={{
                width: 420,
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                padding: "20px 22px",
                opacity: panel,
              }}
            >
              <Text size={17} weight={500} style={{ marginBottom: 18 }}>
                Parameters
              </Text>
              {SLIDERS.map(([label, value, at]) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Text size={16} muted style={{ flex: 1 }}>
                      {label}
                    </Text>
                    <Text size={17} weight={600}>
                      {value}
                    </Text>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      height: 4,
                      borderRadius: 2,
                      background: "#e4e2e1",
                      marginTop: 10,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: `${at * 100}%`,
                        background: c.foreground,
                        borderRadius: 2,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: -6,
                        left: `calc(${at * 100}% - 8px)`,
                        width: 16,
                        height: 16,
                        borderRadius: 999,
                        background: c.foreground,
                      }}
                    />
                  </div>
                </div>
              ))}

              <Text size={14} muted style={{ letterSpacing: "0.1em", margin: "22px 0 10px", opacity: presets }}>
                PRESETS
              </Text>
              {PRESETS.map(([name, temp], i) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: `1px solid ${c.border}`,
                    background: i === 0 ? "#f0efee" : "transparent",
                    borderRadius: 9,
                    padding: "11px 15px",
                    marginBottom: 7,
                    opacity: presets,
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      fontFamily: sans,
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {name}
                  </span>
                  <span style={{ fontFamily: sans, fontSize: 15, color: c.amber600 }}>
                    {temp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};
