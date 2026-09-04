import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { Typed, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";
import { useTone } from "../ui/tone";

/**
 * Tutorial 24 — Fine-tune with SFT.
 *
 * Sources: `dev-training-sft-source.png` (run name, experiment, base model and
 * dataset, each with a HuggingFace / local toggle), `dev-training-sft-hyperparams.png`
 * (the hyperparameter row, Adapter and Precision switches, compute picker and
 * the checkpoint toggle) and `develop/features/training.md` for the lifecycle
 * and the run detail tabs.
 *
 * The structural fact the video carries: **creating a run and launching it are
 * two separate steps.** NEW RUN records a queued run; START validates it and
 * provisions GPUs. That is why a misconfigured run stays queued rather than
 * failing halfway.
 */

const GREEN = "#059669";

/* ── step 1 · where the weights and rows come from ──────────────── */

export const SceneSftSource: React.FC = () => {
  const t = useTimeScale(8);
  const name = useEnterAt(t(3), 10);
  const exp = useEnterAt(t(30), 10);
  const model = useEnterAt(t(52), 10);
  const data = useEnterAt(t(84), 10);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.46 } },
          { at: t(70), over: t(80), scale: 1.0, focus: { x: 0.5, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1180} hot at={0} style={{ padding: "30px 38px 32px" }}>
            <Row label="Run name" required enter={name} hint="Lowercase, hyphens. Names the run and its output model.">
              <Typed text="support-sft-001" at={t(10)} cps={1.7} />
            </Row>

            <Row label="Experiment" enter={exp} hint="Launched from this experiment — the run is added to it." muted>
              acme-support
            </Row>

            <Row
              label="Base model"
              required
              enter={model}
              hint="The model these weights start from."
              toggle={["HuggingFace", "Data Hub"]}
              select
            >
              meta-llama/Llama-3.1-8B-Instruct
            </Row>

            <Row
              label="Dataset"
              required
              enter={data}
              hint="The prompt → reply pairs the model trains on."
              toggle={["HuggingFace", "Local"]}
              pick={1}
              select
            >
              acme-support-sft-v1
            </Row>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Row: React.FC<{
  label: string;
  required?: boolean;
  enter: number;
  hint?: string;
  muted?: boolean;
  select?: boolean;
  toggle?: [string, string];
  pick?: number;
  children: React.ReactNode;
}> = ({ label, required, enter, hint, muted, select, toggle, pick = 0, children }) => (
  <div style={{ marginBottom: 20, opacity: enter }}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 9 }}>
      <Text size={17} weight={600} style={{ flex: 1 }}>
        {label}
        {required ? <span style={{ color: c.amber }}> *</span> : null}
      </Text>
      {toggle ? (
        <div style={{ display: "flex", background: "#f0efee", borderRadius: 8, padding: 3 }}>
          {toggle.map((opt, i) => (
            <span
              key={opt}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                background: i === pick ? c.card : "transparent",
                fontFamily: sans,
                fontSize: 15,
                fontWeight: i === pick ? 600 : 400,
                color: i === pick ? c.foreground : c.mutedFg,
              }}
            >
              {opt}
            </span>
          ))}
        </div>
      ) : null}
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: muted ? "#f4f3f2" : c.card,
        border: `1px solid ${c.border}`,
        borderRadius: radius,
        padding: "14px 17px",
        minHeight: 50,
        fontFamily: sans,
        fontSize: 18,
        color: muted ? c.mutedFg : c.foreground,
      }}
    >
      <span style={{ flex: 1 }}>{children}</span>
      {select ? <span style={{ color: c.mutedFg }}>⌄</span> : null}
    </div>
    {hint ? (
      <Text size={15} muted style={{ marginTop: 8, opacity: 0.85 }}>
        {hint}
      </Text>
    ) : null}
  </div>
);

/* ── step 2 · the knobs ─────────────────────────────────────────── */

const HYPER: [string, string][] = [
  ["Learning rate", "2e-4"],
  ["LoRA rank", "16"],
  ["LoRA alpha", "32"],
  ["Batch size", "2"],
];

export const SceneSftHyper: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const fields = [
    useEnterAt(t(14), 9),
    useEnterAt(t(22), 9),
    useEnterAt(t(30), 9),
    useEnterAt(t(38), 9),
  ];
  const switches = useEnterAt(t(56), 10);
  const compute = useEnterAt(t(86), 10);
  const ckpt = useEnterAt(t(112), 10);
  const picked = frame >= t(100);

  return (
    <Stage glow={{ x: 0.5, y: 0.43 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.44 } },
          { at: t(80), over: t(70), scale: 1.0, focus: { x: 0.5, y: 0.58 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1400} hot at={0} style={{ padding: "28px 34px 30px" }}>
            <Text size={17} weight={600} style={{ marginBottom: 14, opacity: head }}>
              Hyperparameters
            </Text>

            <div style={{ display: "flex", alignItems: "flex-end", gap: 16, opacity: head }}>
              <div>
                <div style={{ display: "flex", background: "#f0efee", borderRadius: 8, padding: 3, marginBottom: 9 }}>
                  {["Epochs", "Steps"].map((o, i) => (
                    <span
                      key={o}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 6,
                        background: i === 0 ? c.card : "transparent",
                        fontFamily: sans,
                        fontSize: 15,
                        fontWeight: i === 0 ? 600 : 400,
                        color: i === 0 ? c.foreground : c.mutedFg,
                      }}
                    >
                      {o}
                    </span>
                  ))}
                </div>
                <Box>3</Box>
              </div>
              {HYPER.map(([label, value], i) => (
                <div key={label} style={{ opacity: fields[i] }}>
                  <Text size={15} muted style={{ marginBottom: 9 }}>
                    {label}
                  </Text>
                  <Box>{value}</Box>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 24, opacity: switches }}>
              <Switcher
                label="Adapter"
                options={["LoRA", "Full"]}
                hint="LoRA trains a small adapter; Full updates every weight."
              />
              <Switcher
                label="Precision"
                options={["BF16", "FP8", "NVFP4"]}
                hint="BF16 runs on every supported GPU; the others need capable hardware."
              />
            </div>

            <div style={{ marginTop: 22, opacity: compute }}>
              <Text size={17} weight={600} style={{ marginBottom: 9 }}>
                Compute
              </Text>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: `1px solid ${picked ? c.amber : c.border}`,
                  background: picked ? "#fffdf7" : "#f7f7f6",
                  borderRadius: radius,
                  padding: "14px 17px",
                  fontFamily: sans,
                  fontSize: 18,
                  color: picked ? c.foreground : c.mutedFg,
                }}
              >
                <span style={{ flex: 1 }}>
                  {picked ? "Default · Nvidia H200 SXM · $0.001261 / sec" : "Select cloud backend"}
                </span>
                <span style={{ color: c.mutedFg }}>⌄</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginTop: 22, opacity: ckpt }}>
              <div style={{ flex: 1 }}>
                <Text size={17} weight={600}>
                  Save a checkpoint every 100 steps
                </Text>
                <Text size={15} muted style={{ marginTop: 5 }}>
                  Checkpoints let you resume, compare, or test the model mid-run.
                </Text>
              </div>
              <div
                style={{
                  width: 56,
                  height: 30,
                  borderRadius: 999,
                  background: c.amber,
                  padding: 3,
                  flexShrink: 0,
                }}
              >
                <div style={{ width: 24, height: 24, borderRadius: 999, background: "#fff", transform: "translateX(26px)" }} />
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Box: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      minWidth: 150,
      border: `1px solid ${c.border}`,
      borderRadius: radius,
      padding: "13px 16px",
      fontFamily: sans,
      fontSize: 18,
    }}
  >
    {children}
  </div>
);

const Switcher: React.FC<{
  label: string;
  options: string[];
  hint: string;
}> = ({ label, options, hint }) => (
  <div style={{ flex: 1 }}>
    <Text size={17} weight={600} style={{ marginBottom: 9 }}>
      {label}
    </Text>
    <div style={{ display: "flex", border: `1px solid ${c.border}`, borderRadius: 10, padding: 4 }}>
      {options.map((o, i) => (
        <span
          key={o}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "10px 0",
            borderRadius: 7,
            background: i === 0 ? c.card : "transparent",
            border: i === 0 ? `1px solid ${c.border}` : "1px solid transparent",
            fontFamily: sans,
            fontSize: 17,
            fontWeight: i === 0 ? 600 : 400,
            color: i === 0 ? c.foreground : c.mutedFg,
          }}
        >
          {o}
        </span>
      ))}
    </div>
    <Text size={14} muted style={{ marginTop: 8, lineHeight: 1.4 }}>
      {hint}
    </Text>
  </div>
);

/* ── step 3 · an experiment holds many runs ─────────────────────── */

/**
 * `experiment-detail.tsx` — "a two-column compare surface. The left panel lists
 * every run in the experiment with a color-tinted compare checkbox; the right
 * Compare panel overlays the selected runs' metrics on method-appropriate
 * charts."
 *
 * The run list groups by **method**, the compare panel by chart **family** —
 * "a family is the set of methods whose metrics share a y-axis". The comment in
 * that file explains why DPO cannot join SFT: `dpo_loss` sits at ln(2) at init
 * while a cross-entropy starts several times higher.
 */
const RUNS: [string, string, string, boolean][] = [
  ["support-sft-001", "SFT", "#f59e0b", true],
  ["support-sft-002", "SFT", "#3b82f6", true],
  ["support-sft-003", "SFT", "#d946ef", true],
  ["support-dpo-001", "DPO", "#7c6d67", false],
];

const curve = (i: number, n: number, seed: number) => {
  const x = i / (n - 1);
  return 1.7 * Math.exp(-(2.2 + seed * 0.55) * x) + 0.3 + seed * 0.04;
};

export const SceneExperiment: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const rows = [
    useEnterAt(t(14), 9),
    useEnterAt(t(22), 9),
    useEnterAt(t(30), 9),
    useEnterAt(t(38), 9),
  ];
  const panel = useEnterAt(t(52), 12);
  const note = useEnterAt(t(126), 12);

  const n = 48;
  const drawn = interpolate(frame, [t(58), t(120)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shown = Math.max(2, Math.round(n * drawn));
  const w = 760;
  const h = 250;

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.46 } },
          { at: t(60), over: t(80), scale: 1.02, focus: { x: 0.58, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1620} hot at={0} style={{ padding: "26px 32px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: head }}>
              <Heading size={26}>acme-support</Heading>
              <Text size={16} muted>
                4 runs · one Data Hub repo, one branch each
              </Text>
            </div>

            <div style={{ display: "flex", gap: 22, marginTop: 22 }}>
              {/* left: every run, grouped by method */}
              <div style={{ width: 480 }}>
                {["SFT", "DPO"].map((method) => (
                  <div key={method} style={{ marginBottom: 14 }}>
                    <Text
                      size={14}
                      muted
                      style={{ letterSpacing: "0.1em", marginBottom: 9 }}
                    >
                      {method}
                    </Text>
                    {RUNS.filter((r) => r[1] === method).map((run) => {
                      const i = RUNS.indexOf(run);
                      const [name, , colour, on] = run;
                      return (
                        <div
                          key={name}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 13,
                            border: `1px solid ${on ? `${colour}59` : c.border}`,
                            background: on ? `${colour}0f` : c.card,
                            borderRadius: 10,
                            padding: "12px 15px",
                            marginBottom: 8,
                            opacity: rows[i],
                          }}
                        >
                          <span
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 5,
                              background: on ? colour : "transparent",
                              border: `2px solid ${on ? colour : c.border}`,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 13,
                              fontWeight: 700,
                            }}
                          >
                            {on ? "✓" : ""}
                          </span>
                          <span style={{ fontFamily: mono, fontSize: 17, flex: 1 }}>
                            {name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* right: the selected runs, overlaid */}
              <div
                style={{
                  flex: 1,
                  border: `1px solid ${c.border}`,
                  borderRadius: 12,
                  padding: "18px 22px",
                  opacity: panel,
                }}
              >
                <Text size={19} weight={600}>
                  Supervised runs
                </Text>
                <Text size={15} muted style={{ marginTop: 5 }}>
                  train loss · eval loss · gradient norm
                </Text>

                <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 250, marginTop: 14 }}>
                  {[0.25, 0.5, 0.75].map((g) => (
                    <line key={g} x1={0} x2={w} y1={h * g} y2={h * g} stroke={c.border} strokeWidth={1.5} />
                  ))}
                  {RUNS.filter((r) => r[3]).map((run, k) => {
                    const d = Array.from({ length: shown }, (_, i) => {
                      const x = (i / (n - 1)) * w;
                      const y = h - ((curve(i, n, k) - 0.25) / 1.6) * h;
                      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
                    }).join(" ");
                    return (
                      <path
                        key={run[0]}
                        d={d}
                        fill="none"
                        stroke={run[2]}
                        strokeWidth={3.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    );
                  })}
                </svg>

                <div style={{ display: "flex", gap: 18, marginTop: 12 }}>
                  {RUNS.filter((r) => r[3]).map(([name, , colour]) => (
                    <span
                      key={name}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontFamily: sans,
                        fontSize: 15,
                        color: c.mutedFg,
                      }}
                    >
                      <span style={{ width: 12, height: 3, borderRadius: 2, background: colour }} />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Text size={17} muted style={{ marginTop: 18, lineHeight: 1.5, opacity: note }}>
              Runs group by method, charts group by family — only metrics that
              share a y-axis are drawn together, so a DPO loss never lands on an
              SFT chart.
            </Text>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 4 · watching it train ─────────────────────────────────── */

/**
 * `training-tab.tsx` — the Overview tab. Four KPIs over a two-column grid of
 * **three** `MetricAreaChart`s: Training Loss, Gradient Norm, and Evaluation
 * Loss (the last only when the run has an eval split). Each chart carries its
 * own "latest" value in the header.
 *
 * Area charts, not lines — hence the fill under each curve.
 */
const loss = (i: number, n: number) => {
  const x = i / (n - 1);
  return 1.72 * Math.exp(-2.6 * x) + 0.34 + 0.045 * Math.sin(i / 1.7);
};
const gradNorm = (i: number, n: number) => {
  const x = i / (n - 1);
  return 0.9 * Math.exp(-1.4 * x) + 0.28 + 0.11 * Math.sin(i / 1.1);
};
const evalLoss = (i: number, n: number) => {
  const x = i / (n - 1);
  return 1.62 * Math.exp(-2.2 * x) + 0.42 + 0.03 * Math.sin(i / 2.3);
};

export const SceneSftRun: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const tabs = useEnterAt(t(12), 10);
  const kpis = useEnterAt(t(20), 10);
  const charts = [useEnterAt(t(32), 10), useEnterAt(t(42), 10), useEnterAt(t(52), 10)];

  const n = 60;
  const drawn = interpolate(frame, [t(36), t(130)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shown = Math.max(2, Math.round(n * drawn));
  const epoch = drawn < 0.34 ? 1 : drawn < 0.67 ? 2 : 3;
  const current = loss(shown - 1, n);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1600} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: head }}>
            <Heading size={26}>support-sft-001</Heading>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: `${c.amber}1f`,
                color: c.amber600,
                borderRadius: 999,
                padding: "6px 15px",
                fontFamily: sans,
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: c.amber,
                  opacity: 0.55 + 0.45 * Math.sin(frame / 5),
                }}
              />
              Training
            </span>
            <div style={{ flex: 1 }} />
            <Text size={16} muted>
              epoch {epoch} of 3
            </Text>
          </div>

          <div style={{ marginTop: 20 }}>
            <RunTabs active={0} enter={tabs} />
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 20, opacity: kpis }}>
            {[
              ["Last Train Loss", current.toFixed(4)],
              ["Last Eval Loss", evalLoss(shown - 1, n).toFixed(4)],
              ["Step", (shown * 21).toLocaleString()],
              ["TPS", "1.8k"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  border: `1px solid ${c.border}`,
                  borderRadius: 10,
                  padding: "12px 16px",
                }}
              >
                <Text size={13} muted style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {label}
                </Text>
                <div style={{ fontFamily: sans, fontSize: 25, fontWeight: 700, marginTop: 5 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 14,
              marginTop: 16,
            }}
          >
            <AreaChart title="Training Loss" latest={current.toFixed(4)} f={loss} n={n} shown={shown} enter={charts[0]} />
            <AreaChart title="Gradient Norm" latest={gradNorm(shown - 1, n).toFixed(2)} f={gradNorm} n={n} shown={shown} enter={charts[1]} />
            <AreaChart title="Evaluation Loss" latest={evalLoss(shown - 1, n).toFixed(4)} f={evalLoss} n={n} shown={shown} enter={charts[2]} />
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const AreaChart: React.FC<{
  title: string;
  latest: string;
  f: (i: number, n: number) => number;
  n: number;
  shown: number;
  enter: number;
}> = ({ title, latest, f, n, shown, enter }) => {
  const w = 700;
  const h = 118;
  /* Each chart scales to its own series — a shared domain flattened the
     gradient-norm curve and clipped the loss against the top edge. */
  const all = Array.from({ length: n }, (_, i) => f(i, n));
  const lo = Math.min(...all);
  const hi = Math.max(...all);
  const pad = (hi - lo) * 0.12;
  const pts = Array.from({ length: shown }, (_, i) => {
    const x = (i / (n - 1)) * w;
    const y = h - ((f(i, n) - lo + pad) / (hi - lo + pad * 2)) * h;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${h} L0 ${h} Z`;

  return (
    <div
      style={{
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        padding: "12px 16px",
        opacity: enter,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <Text size={16} weight={600} style={{ flex: 1 }}>
          {title}
        </Text>
        <span style={{ fontFamily: mono, fontSize: 17, color: c.amber600, fontWeight: 600 }}>
          {latest}
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 118, marginTop: 8 }}>
        <path d={area} fill={`${c.amber}22`} />
        <path d={line} fill="none" stroke={c.amber} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

/* ── the Checkpoints tab ────────────────────────────────────────── */

/**
 * `checkpoints-tab.tsx`. The header is STEP · TRAIN LOSS · EVAL LOSS · SIZE ·
 * SAVED — that order, and losses to two decimals (`loss()` is `toFixed(2)`).
 *
 * The step name is the checkpoint's folder in the run's repo and links into the
 * Repository tab; it falls back to plain text when there is nowhere to send you,
 * "so the row never offers a link that goes nowhere".
 *
 * `is_best` puts a green **Best** pill beside that step. It is the one thing on
 * the screen that answers the question you actually came with — the last
 * checkpoint is not always the one to ship — so the shot holds on the row until
 * the pill lands.
 */
const CKPTS: [number, string, string, string, string, boolean][] = [
  [1000, "0.41", "0.48", "168 MB", "2m ago", true],
  [750, "0.49", "0.53", "168 MB", "9m ago", false],
  [500, "0.62", "0.66", "168 MB", "16m ago", false],
  [250, "0.88", "0.91", "168 MB", "23m ago", false],
];

export const SceneSftCheckpoints: React.FC = () => {
  const t = useTimeScale(5);
  const tabs = useEnterAt(t(3), 10);
  const head = useEnterAt(t(12), 10);
  const rows = [
    useEnterAt(t(22), 9),
    useEnterAt(t(32), 9),
    useEnterAt(t(42), 9),
    useEnterAt(t(52), 9),
  ];
  const best = useEnterAt(t(70), 12);
  const note = useEnterAt(t(92), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1520} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <RunTabs active={3} enter={tabs} />

          <div
            style={{
              display: "flex",
              marginTop: 22,
              paddingBottom: 11,
              borderBottom: `1px solid ${c.border}`,
              opacity: head,
            }}
          >
            {["STEP", "TRAIN LOSS", "EVAL LOSS", "SIZE", "SAVED"].map((h, i) => (
              <span
                key={h}
                style={{
                  flex: i === 0 ? 1 : "0 0 230px",
                  fontFamily: sans,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: c.mutedFg,
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {CKPTS.map(([step, train, ev, size, saved, isBest], i) => {
            const lit = isBest ? best : 0;
            return (
              <div
                key={step}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: `1px solid ${c.border}`,
                  padding: "16px 0",
                  opacity: rows[i],
                }}
              >
                <span
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  {/* the step links into the run's repository */}
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: 18,
                      textDecoration: "underline",
                      textDecorationColor: "rgba(12,10,9,0.25)",
                      textUnderlineOffset: 4,
                    }}
                  >
                    step {step.toLocaleString()}
                  </span>
                  {isBest ? (
                    <span
                      style={{
                        borderRadius: 999,
                        background: `${GREEN}26`,
                        color: GREEN,
                        padding: "4px 12px",
                        fontFamily: sans,
                        fontSize: 14,
                        fontWeight: 500,
                        opacity: lit,
                        transform: `scale(${0.86 + 0.14 * lit})`,
                      }}
                    >
                      Best
                    </span>
                  ) : null}
                </span>
                {[train, ev, size, saved].map((v, k) => (
                  <span
                    key={v + String(k)}
                    style={{
                      flex: "0 0 230px",
                      fontFamily: k < 2 ? mono : sans,
                      fontSize: 17,
                      /* the winning losses come forward with the pill */
                      fontWeight: k < 2 && isBest ? 600 : 400,
                      color:
                        k < 2
                          ? isBest
                            ? `rgba(5,150,105,${0.35 + 0.65 * lit})`
                            : c.foreground
                          : c.mutedFg,
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            );
          })}

          <Text size={17} muted style={{ marginTop: 18, lineHeight: 1.55, opacity: note }}>
            The last checkpoint is not always the one to ship. Every step is a
            folder in the run&apos;s repo you can open, resume from, or merge —
            and a cancelled run keeps everything already committed.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 5 · where the weights came from ───────────────────────── */

/**
 * The Lineage tab — `features/training/lineage-tab.tsx`.
 *
 * Absent from the docs entirely. It shows "the run's own adapter and its
 * immediate neighbours — the base model and dataset it came from, and anything
 * derived from it."
 *
 * Deliberately one hop. The comment in that file records why: it used to fetch
 * the base model's lineage too, which listed every adapter ever trained from
 * that base — "a list that grows with the workspace and describes other
 * people's runs, not this one."
 */
export const SceneSftLineage: React.FC = () => {
  const t = useTimeScale(5);
  const tabs = useEnterAt(t(3), 10);
  const base = useEnterAt(t(14), 12);
  const data = useEnterAt(t(24), 12);
  const adapter = useEnterAt(t(44), 12);
  const child = useEnterAt(t(68), 12);
  const note = useEnterAt(t(92), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1520} hot at={0} style={{ padding: "26px 32px 30px" }}>
          <div
            style={{
              display: "flex",
              gap: 26,
              paddingBottom: 12,
              borderBottom: `1px solid ${c.border}`,
              opacity: tabs,
            }}
          >
            {RUN_TABS.map((tab, i) => (
              <span
                key={tab}
                style={{
                  fontFamily: sans,
                  fontSize: 18,
                  fontWeight: i === 4 ? 600 : 400,
                  color: i === 4 ? c.foreground : c.mutedFg,
                  borderBottom: i === 4 ? `2px solid ${c.amber}` : "2px solid transparent",
                  paddingBottom: 10,
                  marginBottom: -12,
                }}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* two parents, this run, one child */}
          <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 30 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 420 }}>
              <Node
                kind="base model"
                name="meta-llama/Llama-3.1-8B-Instruct"
                enter={base}
              />
              <Node kind="dataset" name="acme-support-sft-v1" enter={data} />
            </div>

            <Arrow enter={adapter} />

            <Node
              kind="adapter · this run"
              name="support-sft-001"
              enter={adapter}
              lit
              wide
            />

            <Arrow enter={child} />

            <Node kind="derived" name="support-sft-001-merged" enter={child} />
          </div>

          <Text size={17} muted style={{ marginTop: 30, lineHeight: 1.55, opacity: note }}>
            One hop in each direction — what this run came from, and what came
            from it. Not every adapter anyone ever trained from the same base.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const Node: React.FC<{
  kind: string;
  name: string;
  enter: number;
  lit?: boolean;
  wide?: boolean;
}> = ({ kind, name, enter, lit, wide }) => (
  <div
    style={{
      flex: wide ? 1 : undefined,
      border: `1px solid ${lit ? c.amber : c.border}`,
      background: lit ? "#fffdf7" : c.card,
      borderRadius: 12,
      padding: "16px 20px",
      opacity: enter,
      transform: `translateY(${(1 - enter) * 8}px)`,
    }}
  >
    <Text
      size={14}
      muted
      style={{ letterSpacing: "0.09em", textTransform: "uppercase" }}
    >
      {kind}
    </Text>
    <div
      style={{
        fontFamily: mono,
        fontSize: 17,
        marginTop: 8,
        color: lit ? c.amber600 : c.foreground,
        fontWeight: lit ? 600 : 400,
      }}
    >
      {name}
    </div>
  </div>
);

const Arrow: React.FC<{ enter: number }> = ({ enter }) => (
  <span style={{ fontSize: 26, color: c.amber, opacity: enter }}>→</span>
);

/* ── the Configuration tab ──────────────────────────────────────── */


/**
 * The Configuration tab — `config-tab.tsx` plus `training-config-sections.tsx`.
 *
 * One scrolling column, in the page's own order: **Compute** first ("Where the
 * run trains — cloud, GPU offer, and CUDA image"), then General, LoRA,
 * Optimization, Schedule and MoE. Every label and every value here is the real
 * one — the values are `SFT_DEFAULTS`, so this is what a fresh run actually
 * shows you.
 *
 * Two details the shot honours rather than simplifies: the CUDA list is
 * filtered per backend (`SFT_CUDA_BY_CLOUD` gives Nebius `13.0+` only, so the
 * select is settled and disabled), and the MoE section is headed "Mixture-of-
 * Experts models only" — it is inert for a dense model like this one.
 */

const OFFERS: [string, string, string, string, string, string, boolean][] = [
  ["gpu_1x_h100_sxm5", "1× H100 (80 GB)", "26", "225 GB", "us-east-1", "2.49", false],
  ["gpu_2x_h200_sxm", "2× H200 (141 GB)", "52", "450 GB", "us-east-1", "6.80", false],
  ["gpu_1x_a100_80gb", "1× A100 (80 GB)", "12", "200 GB", "eu-north-1", "1.29", true],
  ["gpu_8x_h100_sxm5", "8× H100 (80 GB)", "208", "1800 GB", "us-west-2", "19.92", false],
];

const TARGET_MODULES = [
  "q_proj",
  "k_proj",
  "v_proj",
  "o_proj",
  "gate_proj",
  "up_proj",
  "down_proj",
];

/** Height of the scroll viewport inside the panel. */
const VIEW_H = 664;

export const SceneSftConfig: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const tabs = useEnterAt(t(3), 10);
  const table = useEnterAt(t(18), 10);
  /* the offer the run settles on — row 2, the H200 pair */
  const picked = useEnterAt(t(40), 12);

  /* The scroll. Starts once the offer is chosen, so the compute decision
     reads before the page moves under it. */
  const y = interpolate(frame, [t(56), t(232)], [0, -(CONTENT_H - VIEW_H)], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1380} hot at={0} style={{ padding: "26px 0 0" }}>
          <div style={{ padding: "0 32px" }}>
            <RunTabs active={1} enter={tabs} />
          </div>

          <div
            style={{
              height: VIEW_H,
              overflow: "hidden",
              position: "relative",
              marginTop: 18,
            }}
          >
            <div style={{ transform: `translateY(${y}px)`, padding: "0 32px 28px" }}>
              <Section
                title="Compute"
                sub="Where the run trains — cloud, GPU offer, and CUDA image."
              >
                <CfgRow label="Cloud backend">
                  <Sel value="Nebius" />
                </CfgRow>

                {/* GpuOfferPicker — the live offer table */}
                <div
                  style={{
                    marginTop: 10,
                    border: `1px solid ${c.border}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    opacity: table,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "8px 14px",
                      borderBottom: `1px solid ${c.border}`,
                      background: "rgba(12,10,9,0.03)",
                    }}
                  >
                    {["Instance", "GPU", "vCPUs", "RAM", "Region", "$/hr"].map(
                      (label, i) => (
                        <span
                          key={label}
                          style={{
                            flex: i === 0 ? 1 : `0 0 ${[0, 186, 78, 100, 122, 88][i]}px`,
                            fontFamily: sans,
                            fontSize: 13,
                            color: c.mutedFg,
                            textAlign: i === 5 ? "right" : "left",
                          }}
                        >
                          {label}
                        </span>
                      ),
                    )}
                  </div>

                  {OFFERS.map(([inst, gpu, cpus, ram, region, price, spot], i) => {
                    const on = i === 1 ? picked : 0;
                    return (
                      <div
                        key={inst}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "9px 14px",
                          borderBottom:
                            i === OFFERS.length - 1 ? "none" : `1px solid ${c.border}`,
                          background: `rgba(245,166,36,${0.14 * on})`,
                          boxShadow: on ? `inset 3px 0 0 ${c.amber}` : "none",
                        }}
                      >
                        <span style={{ flex: 1, fontFamily: mono, fontSize: 14 }}>
                          {inst}
                        </span>
                        <span style={{ flex: "0 0 186px", fontFamily: sans, fontSize: 14 }}>
                          {gpu}
                        </span>
                        {[cpus, ram, region].map((v, k) => (
                          <span
                            key={v}
                            style={{
                              flex: `0 0 ${[78, 100, 122][k]}px`,
                              fontFamily: sans,
                              fontSize: 14,
                              color: c.mutedFg,
                            }}
                          >
                            {v}
                          </span>
                        ))}
                        <span
                          style={{
                            flex: "0 0 88px",
                            fontFamily: mono,
                            fontSize: 14,
                            textAlign: "right",
                            fontWeight: on ? 600 : 400,
                          }}
                        >
                          ${price}
                          {spot ? (
                            <span style={{ fontFamily: sans, fontSize: 11, color: c.mutedFg }}>
                              {" "}
                              spot
                            </span>
                          ) : null}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Nebius carries only 13.0+, so the select has nothing to open. */}
                <CfgRow label="CUDA Version" hint="Only the versions this backend supports.">
                  <Sel value="13.0+" disabled />
                </CfgRow>
              </Section>

              <Section
                title="General"
                sub="Base model, precision, and how long training runs."
              >
                <CfgRow label="Base Model">
                  <Sel value="meta-llama/Llama-3.1-8B-Instruct" />
                </CfgRow>
                <CfgRow label="Precision">
                  <Seg options={["BF16", "FP8", "NVFP4"]} active="BF16" />
                </CfgRow>
                <CfgRow label="Training Duration" toggle={["Epochs", "Max Steps"]}>
                  <Num value="3" />
                </CfgRow>
                <Pair>
                  <CfgRow label="Context Length" half>
                    <Num value="2048" />
                  </CfgRow>
                  <CfgRow label="Learning Rate" half>
                    <Num value="0.0002" />
                  </CfgRow>
                </Pair>
                <Switch label="Sample Packing" on />
                <Switch label="Train Vision Components (multimodal models)" />
                <Switch label="Merge Adapter" />
              </Section>

              <Section
                title="LoRA"
                sub="Low-rank adapter settings — rank, alpha, dropout, and which modules train."
              >
                <Switch label="Enable LoRA" on />
                <Pair>
                  <CfgRow label="Rank" half>
                    <Num value="16" />
                  </CfgRow>
                  <CfgRow label="Alpha" half>
                    <Num value="32" />
                  </CfgRow>
                </Pair>
                <CfgRow label="Dropout">
                  <Num value="0.05" />
                </CfgRow>
                <CfgRow label="Target Modules">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px" }}>
                    {TARGET_MODULES.map((m) => (
                      <span
                        key={m}
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        <Check />
                        <span style={{ fontFamily: mono, fontSize: 14 }}>{m}</span>
                      </span>
                    ))}
                  </div>
                </CfgRow>
              </Section>

              <Section
                title="Optimization"
                sub="Batch sizing, optimizer choice, and memory trade-offs."
              >
                <Pair>
                  <CfgRow label="Batch Size" half>
                    <Num value="2" />
                  </CfgRow>
                  <CfgRow label="Gradient Accumulation" half>
                    <Num value="4" />
                  </CfgRow>
                </Pair>
                <Pair>
                  <CfgRow label="Weight Decay" half>
                    <Num value="0.01" />
                  </CfgRow>
                  <CfgRow label="Optimizer" half>
                    <Sel value="AdamW 8-bit" />
                  </CfgRow>
                </Pair>
                <Switch label="Recompute" on />
                <Switch label="Reduce Memory" />
              </Section>

              <Section
                title="Schedule"
                sub="Learning-rate schedule, warmup, and checkpoint / eval cadence."
              >
                <Pair>
                  <CfgRow label="LR Scheduler" half>
                    <Sel value="linear" />
                  </CfgRow>
                  <CfgRow label="Random Seed" half>
                    <Num value="3407" />
                  </CfgRow>
                </Pair>
                <Pair>
                  <CfgRow label="Warmup Ratio" half>
                    <Num value="10%" />
                  </CfgRow>
                  <CfgRow label="Final LR Fraction" half>
                    <Num value="0%" />
                  </CfgRow>
                </Pair>
                <Pair>
                  <CfgRow label="Save" half>
                    <Num value="0" />
                  </CfgRow>
                  <CfgRow label="Eval" half>
                    <Num value="25" />
                  </CfgRow>
                </Pair>
                <CfgRow label="Keep Last N Checkpoints">
                  <Num value="3" />
                </CfgRow>
              </Section>

              <Section
                title="MoE (Mixture-of-Experts models only)"
                sub="Router auxiliary losses — leave empty for dense models."
                last
              >
                <Pair>
                  <CfgRow label="Router Aux Loss Coef" half>
                    <Num value="" placeholder="model default" />
                  </CfgRow>
                  <CfgRow label="Router Z Loss Coef" half>
                    <Num value="" placeholder="model default" />
                  </CfgRow>
                </Pair>
              </Section>
            </div>

            {/* the page continues below the fold */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 56,
                background: `linear-gradient(to bottom, transparent, ${c.card})`,
              }}
            />
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/**
 * Total height of the scrolling column, in frame pixels.
 *
 * Measured rather than computed — `useCurrentFrame` renders every frame from
 * scratch, so measuring the DOM would mean a layout pass per frame for a number
 * that never changes. Adjust it if a section gains a field.
 */
const CONTENT_H = 2300;

const Section: React.FC<{
  title: string;
  sub: string;
  last?: boolean;
  children: React.ReactNode;
}> = ({ title, sub, last, children }) => (
  <div
    style={{
      border: `1px solid ${c.border}`,
      borderRadius: radius,
      padding: "18px 22px 20px",
      marginBottom: last ? 0 : 16,
    }}
  >
    <Text size={19} weight={600}>
      {title}
    </Text>
    <Text size={15} muted style={{ marginTop: 3, marginBottom: 6 }}>
      {sub}
    </Text>
    {children}
  </div>
);

const Pair: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", gap: 16 }}>{children}</div>
);

const CfgRow: React.FC<{
  label: string;
  hint?: string;
  half?: boolean;
  /** The Epochs / Max Steps segmented control that sits on the label line. */
  toggle?: [string, string];
  children: React.ReactNode;
}> = ({ label, hint, half, toggle, children }) => (
  <div style={{ marginTop: 12, flex: half ? 1 : undefined }}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
      <Text size={15} muted style={{ flex: 1 }}>
        {label}
      </Text>
      {toggle ? (
        <div style={{ display: "flex", gap: 4 }}>
          {toggle.map((o, i) => (
            <span
              key={o}
              style={{
                padding: "3px 10px",
                borderRadius: 6,
                fontFamily: sans,
                fontSize: 13,
                border: `1px solid ${i === 0 ? `${c.amber}55` : "transparent"}`,
                background: i === 0 ? `${c.amber}12` : "transparent",
                color: i === 0 ? c.amber600 : c.mutedFg,
              }}
            >
              {o}
            </span>
          ))}
        </div>
      ) : null}
    </div>
    {children}
    {hint ? (
      <Text size={14} muted style={{ marginTop: 6 }}>
        {hint}
      </Text>
    ) : null}
  </div>
);

/** The boxed select trigger the training forms use, with its chevron. */
const Sel: React.FC<{ value: string; disabled?: boolean }> = ({ value, disabled }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      border: `1px solid ${c.border}`,
      borderRadius: 8,
      background: "rgba(12,10,9,0.04)",
      padding: "10px 14px",
      opacity: disabled ? 0.55 : 1,
    }}
  >
    <span style={{ flex: 1, fontFamily: sans, fontSize: 16 }}>{value}</span>
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2.4}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const Num: React.FC<{ value: string; placeholder?: string }> = ({
  value,
  placeholder,
}) => (
  <div
    style={{
      border: `1px solid ${c.border}`,
      borderRadius: 8,
      background: "rgba(12,10,9,0.04)",
      padding: "10px 14px",
      fontFamily: mono,
      fontSize: 16,
      color: value ? c.foreground : c.mutedFg,
    }}
  >
    {value || placeholder}
  </div>
);

const Seg: React.FC<{ options: string[]; active: string }> = ({ options, active }) => (
  <div style={{ display: "flex", gap: 8 }}>
    {options.map((o) => (
      <span
        key={o}
        style={{
          flex: 1,
          textAlign: "center",
          padding: "9px 0",
          borderRadius: 8,
          fontFamily: sans,
          fontSize: 15,
          fontWeight: o === active ? 600 : 400,
          border: `1px solid ${o === active ? c.amber : c.border}`,
          background: o === active ? `${c.amber}1f` : "transparent",
          color: o === active ? c.amber600 : c.mutedFg,
        }}
      >
        {o}
      </span>
    ))}
  </div>
);

const Switch: React.FC<{ label: string; on?: boolean }> = ({ label, on }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 13 }}>
    <div
      style={{
        width: 38,
        height: 21,
        borderRadius: 999,
        background: on ? c.amber : "rgba(12,10,9,0.16)",
        position: "relative",
        flex: "0 0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2.5,
          left: on ? 19.5 : 2.5,
          width: 16,
          height: 16,
          borderRadius: 999,
          background: "#fff",
        }}
      />
    </div>
    <Text size={16}>{label}</Text>
  </div>
);

const Check: React.FC = () => (
  <span
    style={{
      width: 17,
      height: 17,
      borderRadius: 4,
      background: c.amber,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.6}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

/* ── the Datasets tab ───────────────────────────────────────────── */

/** `dataset-tab.tsx`: Training datasets, Validation datasets, Dataloader. */
export const SceneSftDatasets: React.FC = () => {
  const t = useTimeScale(5);
  const tabs = useEnterAt(t(3), 10);
  const train = useEnterAt(t(14), 10);
  const val = useEnterAt(t(34), 10);
  const loader = useEnterAt(t(54), 10);
  const sample = useEnterAt(t(72), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <RunTabs active={2} enter={tabs} />

          <div style={{ display: "flex", gap: 16, marginTop: 22 }}>
            <DataCard
              title="Training datasets"
              name="acme-support-sft-v1"
              meta="412 rows · SFT pairs"
              enter={train}
              lit
            />
            <DataCard
              title="Validation datasets"
              name="acme-support-sft-v1 · eval split"
              meta="46 rows held out"
              enter={val}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              marginTop: 16,
              border: `1px solid ${c.border}`,
              borderRadius: 12,
              padding: "16px 20px",
              opacity: loader,
            }}
          >
            <Text size={17} weight={600} style={{ width: 150 }}>
              Dataloader
            </Text>
            {[
              ["batch size", "2"],
              ["grad accum", "4"],
              ["packing", "on"],
              ["seq len", "2048"],
            ].map(([k, v]) => (
              <span key={k} style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg }}>
                {k} <span style={{ color: c.foreground, fontWeight: 600 }}>{v}</span>
              </span>
            ))}
          </div>

          {/* the sample preview the tab offers */}
          <div
            style={{
              marginTop: 16,
              border: `1px solid ${c.border}`,
              borderRadius: 12,
              padding: "16px 20px",
              opacity: sample,
            }}
          >
            <Text size={15} muted style={{ letterSpacing: "0.09em", marginBottom: 12 }}>
              SAMPLE PREVIEW
            </Text>
            <div style={{ display: "flex", gap: 18 }}>
              <span style={{ fontFamily: mono, fontSize: 14, color: c.amber600, width: 76, paddingTop: 3 }}>
                prompt
              </span>
              <Text size={18} style={{ flex: 1 }}>
                Customer wants a refund after 40 days on the annual plan.
              </Text>
            </div>
            <div style={{ display: "flex", gap: 18, marginTop: 10 }}>
              <span style={{ fontFamily: mono, fontSize: 14, color: c.mutedFg, width: 76, paddingTop: 3 }}>
                reply
              </span>
              <Text size={18} muted style={{ flex: 1 }}>
                Our window is 30 days, so not a refund — but I can offer a
                pro-rata credit.
              </Text>
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const DataCard: React.FC<{
  title: string;
  name: string;
  meta: string;
  enter: number;
  lit?: boolean;
}> = ({ title, name, meta, enter, lit }) => (
  <div
    style={{
      flex: 1,
      border: `1px solid ${lit ? c.amber : c.border}`,
      background: lit ? "#fffdf7" : c.card,
      borderRadius: 12,
      padding: "18px 20px",
      opacity: enter,
      transform: `translateY(${(1 - enter) * 8}px)`,
    }}
  >
    <Text size={17} weight={600}>
      {title}
    </Text>
    <div style={{ fontFamily: mono, fontSize: 18, marginTop: 11 }}>{name}</div>
    <Text size={15} muted style={{ marginTop: 7 }}>
      {meta}
    </Text>
  </div>
);

/** The six run tabs, shared by every run-detail shot. */
/**
 * `SFT_DETAIL_TABS` in `run-detail.tsx` — six tabs, in this order. The docs
 * table for this screen is stale; the code is the list.
 */
const RUN_TABS = [
  "Overview",
  "Configuration",
  "Datasets",
  "Checkpoints",
  "Lineage",
  "Repository",
];

const RunTabs: React.FC<{ active: number; enter: number }> = ({ active, enter }) => (
  <div
    style={{
      display: "flex",
      gap: 26,
      paddingBottom: 12,
      borderBottom: `1px solid ${c.border}`,
      opacity: enter,
    }}
  >
    {RUN_TABS.map((tab, i) => (
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
