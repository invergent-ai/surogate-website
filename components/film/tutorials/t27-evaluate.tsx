import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 27 — Evaluate against benchmarks.
 *
 * A standalone video about one feature: benchmarks. It assumes nothing except
 * that you have two models and have to choose between them, which is the
 * smallest situation in which a benchmark is worth running at all.
 *
 * It opens on the catalogue, because "what is a benchmark" is answered better
 * by the real one — nine categories, each with the thing it measures — than by
 * any definition. Then it runs one evaluation end to end and reads the result.
 *
 * Screens from `new-eval-page.tsx` (the Select → Configure → Run stepper),
 * `evaluations-data.ts` (`CATEGORY_META`), `benchmark-info.ts` and
 * `eval-detail.tsx` (the comparison banner, stat tiles, info cards and category
 * table).
 */

const GREEN = "#22C55E";
const RED = "#EF4444";

const CANDIDATE = "qwen3-14b-instruct";
const CURRENT = "qwen3-8b-instruct";

/* ── the job ────────────────────────────────────────────────────── */

/**
 * `browse-benchmarks.tsx` — the catalogue, grouped by `CATEGORY_META`.
 *
 * The fastest honest answer to "what is a benchmark" is the list of them, with
 * the one line each category carries about what it measures. Those blurbs are
 * the file's own.
 */
const CATALOGUE: [string, string, number][] = [
  ["Reasoning", "Multi-step logic & inference", 8],
  ["Language", "Language understanding", 5],
  ["Knowledge", "Facts & world knowledge", 9],
  ["Coding", "Code generation & fixing", 7],
  ["Safety", "Refusals & red-team", 4],
  ["Chat", "Chat quality & tone", 3],
  ["Instruction", "Does it follow the ask", 4],
  ["Agent", "Coding agents, tools & planning", 6],
  ["Vision", "Images, charts & documents", 5],
];

export const SceneEvalCatalogue: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const cards = [
    useEnterAt(t(14), 9),
    useEnterAt(t(19), 9),
    useEnterAt(t(24), 9),
    useEnterAt(t(29), 9),
    useEnterAt(t(34), 9),
    useEnterAt(t(39), 9),
    useEnterAt(t(44), 9),
    useEnterAt(t(49), 9),
    useEnterAt(t(54), 9),
  ];
  const job = useEnterAt(t(80), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ opacity: head }}>
            <Heading size={25}>Benchmarks</Heading>
            <Text size={17} muted style={{ marginTop: 4 }}>
              Public test sets with known answers. Run a model against one and
              you get a number you can compare.
            </Text>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginTop: 20,
            }}
          >
            {CATALOGUE.map(([label, blurb, n], i) => (
              <div
                key={label}
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: radius,
                  padding: "13px 16px",
                  opacity: cards[i],
                  transform: `translateY(${(1 - cards[i]) * 8}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Text size={17} weight={600} style={{ flex: 1 }}>
                    {label}
                  </Text>
                  <Text size={14} muted>
                    {n}
                  </Text>
                </div>
                <Text size={14} muted style={{ marginTop: 3 }}>
                  {blurb}
                </Text>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 20,
              paddingTop: 18,
              borderTop: `1px solid ${c.border}`,
              opacity: job,
            }}
          >
            <Text size={19} weight={600} style={{ flex: "0 0 auto" }}>
              The job
            </Text>
            <Text size={19} muted style={{ lineHeight: 1.5 }}>
              Two models, one decision. Score both on the same benchmarks and
              let the numbers settle it.
            </Text>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 1 · pick the benchmarks ───────────────────────────────── */

/**
 * The **Select** step of `new-eval-page.tsx`.
 *
 * The whole wizard is one `max-w-[600px]` column — stepper, then a single
 * field at a time — so these shots are narrow on purpose. Chips carry
 * `name · N samples`, and `+ Add benchmark` is a select whose options are
 * grouped by category.
 */
const PICKER: [string, string[]][] = [
  ["Reasoning", ["GSM8K", "ARC-AGI"]],
  ["Knowledge", ["MMLU", "GPQA"]],
  ["Instruction", ["IFEval", "IFBench"]],
];

export const SceneEvalSelect: React.FC = () => {
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const step = useEnterAt(t(12), 10);
  const label = useEnterAt(t(24), 10);
  const open = useEnterAt(t(36), 12);
  const chips = [useEnterAt(t(78), 10), useEnterAt(t(92), 10), useEnterAt(t(106), 10)];
  const helper = useEnterAt(t(132), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Wizard subtitle="Run a model against one or more benchmarks." current={0} head={head} step={step}>
          <div style={{ marginTop: 26, opacity: label }}>
            <Text size={17} weight={500}>
              Benchmarks <span style={{ color: "#b45309" }}>*</span>
            </Text>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 12 }}>
              {[
                ["GSM8K", "1,319 samples"],
                ["MMLU", "14,042 samples"],
                ["IFEval", "541 samples"],
              ].map(([name, n], i) => (
                <span
                  key={name}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "8px 13px",
                    fontFamily: sans,
                    fontSize: 16,
                    fontWeight: 500,
                    opacity: chips[i],
                  }}
                >
                  {name}
                  <span style={{ color: c.mutedFg, fontWeight: 400 }}>· {n}</span>
                  <span style={{ color: c.mutedFg }}>×</span>
                </span>
              ))}
              <span
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: 9,
                  padding: "8px 13px",
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#b45309",
                }}
              >
                + Add benchmark
              </span>
            </div>

            {/* the select, open, grouped by category */}
            <div
              style={{
                marginTop: 10,
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                boxShadow: "0 18px 44px rgba(20,20,18,0.14)",
                padding: "8px 6px",
                opacity: open,
                transform: `translateY(${(1 - open) * -6}px)`,
              }}
            >
              {PICKER.map(([cat, items]) => (
                <div key={cat}>
                  <div style={{ padding: "8px 12px 4px" }}>
                    <Text size={14} weight={600} style={{ color: c.mutedFg }}>
                      {cat}
                    </Text>
                  </div>
                  {items.map((b) => (
                    <div key={b} style={{ padding: "7px 12px", borderRadius: 6 }}>
                      <Text size={16}>{b}</Text>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <Text size={15} muted style={{ marginTop: 12, lineHeight: 1.5, opacity: helper }}>
              Run several benchmarks as one batch — one result each. Each runs
              its full set by default; change a benchmark&apos;s subset on its
              chip.
            </Text>
          </div>
        </Wizard>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · what to score ─────────────────────────────────────── */

/**
 * The **Configure** step, in the app's field order: Target, Run Name, Compare
 * model, then — conditionally — LLM Judge and Pass threshold, then Subset.
 *
 * Two of those are conditional and the video has to say so, because the
 * benchmarks chosen here decide it. `LLM Judge` renders only when a selected
 * benchmark carries `needsJudge` (MT-Bench, TruthfulQA, ToxiGen, Red Team,
 * Guardrails, TAU-Bench…), and `Pass threshold` only when one is graded out of
 * ten. GSM8K, MMLU and IFEval are all scored programmatically, so neither field
 * appears — which is why the review card two shots later reads "Not needed".
 */
export const SceneEvalConfigure: React.FC = () => {
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const step = useEnterAt(t(10), 10);
  const target = useEnterAt(t(20), 12);
  const name = useEnterAt(t(48), 12);
  const compare = useEnterAt(t(72), 12);
  const subset = useEnterAt(t(104), 12);
  const note = useEnterAt(t(134), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Wizard subtitle="Score a model on a benchmark." current={1} head={head} step={step}>
          <div style={{ marginTop: 24, opacity: target }}>
            <Text size={17} weight={500}>
              Target <span style={{ color: "#b45309" }}>*</span>
            </Text>
            <div
              style={{
                display: "inline-flex",
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                padding: 3,
                gap: 2,
                marginTop: 10,
              }}
            >
              {["Model", "Agent", "Adapter"].map((k, i) => (
                <span
                  key={k}
                  style={{
                    padding: "7px 18px",
                    borderRadius: 9,
                    fontFamily: sans,
                    fontSize: 16,
                    fontWeight: 500,
                    background: i === 0 ? "rgba(12,10,9,0.06)" : "transparent",
                    color: i === 0 ? c.foreground : c.mutedFg,
                  }}
                >
                  {k}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 10 }}>
              <Box value={CANDIDATE} select />
            </div>
            <Helper>The model or agent being evaluated.</Helper>
          </div>

          <EvalField label="Run Name" enter={name} hint="Defaults to the model and benchmark. Rename it any time.">
            <Box value="qwen3-14b-instruct · GSM8K" />
          </EvalField>

          <EvalField
            label="Compare model (optional)"
            enter={compare}
            hint="Runs a second eval and reports the delta."
            right={<span style={{ fontFamily: sans, fontSize: 15, color: c.mutedFg }}>Clear</span>}
          >
            <Box value={CURRENT} select />
          </EvalField>

          <EvalField
            label="Subset (optional)"
            enter={subset}
            hint="Enter a sample count (e.g. 100 samples) for a quick run instead of the full set."
          >
            <Box value="Full set" placeholder />
          </EvalField>

          <Text size={15} muted style={{ marginTop: 16, lineHeight: 1.55, opacity: note }}>
            No <strong style={{ color: c.foreground }}>LLM Judge</strong> field
            here, and no pass threshold: those appear only when one of the
            benchmarks you picked needs them. These three are scored
            programmatically.
          </Text>
        </Wizard>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · review and start ──────────────────────────────────── */

/** The **Run** step: a Review card, then an Estimated card, stacked. */
export const SceneEvalReview: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 10);
  const step = useEnterAt(t(9), 10);
  const review = useEnterAt(t(18), 12);
  const rows = [useEnterAt(t(34), 10), useEnterAt(t(42), 10), useEnterAt(t(50), 10)];
  const est = useEnterAt(t(70), 12);
  const go = useEnterAt(t(96), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Wizard subtitle="Review and start the evaluation." current={2} head={head} step={step}>
          <div
            style={{
              border: `1px solid ${c.border}`,
              borderRadius: 13,
              padding: "20px 22px",
              marginTop: 24,
              opacity: review,
            }}
          >
            <Text size={18} weight={600}>
              Review
            </Text>
            <div style={{ display: "flex", gap: 26, marginTop: 14 }}>
              <Text size={16} muted style={{ width: 150, flex: "0 0 auto" }}>
                Benchmarks
              </Text>
              <div>
                {[
                  ["GSM8K", "Full set · 1,319 samples"],
                  ["MMLU", "Full set · 14,042 samples"],
                  ["IFEval", "Full set · 541 samples"],
                ].map(([n, sub]) => (
                  <div key={n} style={{ display: "flex", gap: 8, padding: "2px 0" }}>
                    <Text size={16}>{n}</Text>
                    <Text size={16} muted>
                      · {sub}
                    </Text>
                  </div>
                ))}
              </div>
            </div>

            {[
              ["Target", CANDIDATE],
              ["Compare", CURRENT],
              ["Judge", "Not needed"],
            ].map(([label, value], i) => (
              <div key={label} style={{ display: "flex", gap: 26, marginTop: 10, opacity: rows[i] }}>
                <Text size={16} muted style={{ width: 150, flex: "0 0 auto" }}>
                  {label}
                </Text>
                <Text size={16}>{value}</Text>
              </div>
            ))}

            <Text size={15} style={{ marginTop: 16, color: "#b45309", opacity: rows[2] }}>
              Produces 3 benchmark results — one per benchmark.
            </Text>
          </div>

          <div
            style={{
              border: `1px solid ${c.border}`,
              borderRadius: 13,
              padding: "20px 22px",
              marginTop: 16,
              opacity: est,
            }}
          >
            <Text size={18} weight={600}>
              Estimated
            </Text>
            {[
              ["Samples", "≈ 31,804"],
              ["Time", "~46 min"],
              ["Cost", "~$4.20"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", gap: 26, marginTop: 12 }}>
                <Text size={16} muted style={{ width: 150, flex: "0 0 auto" }}>
                  {label}
                </Text>
                <Text size={16}>{value}</Text>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18, opacity: go }}>
            <span
              style={{
                background: c.amber,
                color: "#000",
                borderRadius: 10,
                padding: "11px 24px",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Start evaluation →
            </span>
          </div>
        </Wizard>
      </AbsoluteFill>
    </Stage>
  );
};

/**
 * The wizard's shell: page header, stepper, and a single narrow column. The
 * real page caps that column at 600 CSS px; 940 frame pixels is the same
 * proportion once the film's 1.33× scale is applied, give or take.
 */
const Wizard: React.FC<{
  subtitle: string;
  current: number;
  head: number;
  step: number;
  children: React.ReactNode;
}> = ({ subtitle, current, head, step, children }) => (
  <Panel width={940} hot at={0} style={{ padding: "26px 30px 28px" }}>
    <div style={{ opacity: head }}>
      <Heading size={24}>New evaluation</Heading>
      <Text size={16} muted style={{ marginTop: 4 }}>
        {subtitle}
      </Text>
    </div>
    <Stepper current={current} enter={step} />
    {children}
  </Panel>
);

const EvalField: React.FC<{
  label: string;
  hint: string;
  enter: number;
  right?: React.ReactNode;
  children: React.ReactNode;
}> = ({ label, hint, enter, right, children }) => (
  <div style={{ marginTop: 20, opacity: enter }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
      <Text size={17} weight={500} style={{ flex: 1 }}>
        {label}
      </Text>
      {right}
    </div>
    <div style={{ marginTop: 10 }}>{children}</div>
    <Helper>{hint}</Helper>
  </div>
);

const Helper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text size={15} muted style={{ marginTop: 7, lineHeight: 1.45 }}>
    {children}
  </Text>
);

/* ── step 4 · the verdict ───────────────────────────────────────── */

/**
 * `eval-detail.tsx`'s comparison view: two stat tiles, the banner that states
 * the result in a sentence — "<target> wins on N of M categories" — and the
 * Comparison / Result info cards.
 */
export const SceneEvalResult: React.FC = () => {
  const t = useTimeScale(6);
  const tiles = [useEnterAt(t(3), 12), useEnterAt(t(16), 12)];
  const banner = useEnterAt(t(36), 14);
  const cards = [useEnterAt(t(62), 12), useEnterAt(t(76), 12)];

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1520} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              ["+1.4 pp", "Pass-rate drift", "candidate wins", tiles[0], GREEN],
              ["5/7", "Categories improved", "2 unchanged", tiles[1], c.foreground],
            ].map(([value, label, sub, enter, color]) => (
              <div
                key={label as string}
                style={{
                  flex: 1,
                  border: `1px solid ${c.border}`,
                  borderRadius: 11,
                  padding: "14px 18px",
                  opacity: enter as number,
                }}
              >
                <div style={{ fontFamily: sans, fontSize: 30, fontWeight: 700, color: color as string }}>
                  {value}
                </div>
                <Text size={15} muted style={{ marginTop: 3 }}>
                  {label}
                </Text>
                <Text size={14} muted style={{ marginTop: 1, opacity: 0.7 }}>
                  {sub}
                </Text>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              border: `1px solid ${GREEN}55`,
              background: `${GREEN}0f`,
              borderRadius: 11,
              padding: "16px 18px",
              marginTop: 14,
              opacity: banner,
            }}
          >
            <svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flex: "0 0 auto" }}>
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <div>
              <Text size={19} weight={600}>
                {CANDIDATE} wins on 5 of 7 categories.
              </Text>
              <Text size={16} muted style={{ marginTop: 4 }}>
                +1.4 pp pass rate · 1 category to review.
              </Text>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
            <InfoCard
              title="Comparison"
              enter={cards[0]}
              rows={[
                ["Benchmark", "GSM8K · MMLU · IFEval"],
                ["Model A", CANDIDATE],
                ["Model B", CURRENT],
                ["Samples", "31,804"],
                ["Δ pass rate", "+1.4 pp"],
              ]}
            />
            <InfoCard
              title="Result"
              enter={cards[1]}
              rows={[
                [CANDIDATE, "78.6%"],
                [CURRENT, "77.2%"],
                ["Δ pass rate", "+1.4 pp"],
                ["Categories won", "5 of 7"],
                ["Regressions", "1"],
              ]}
            />
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 5 · where it actually moved ───────────────────────────── */

/** `CategoryTable` — the per-category breakdown, with Δ coloured by sign. */
const CATS: [string, string, string, number][] = [
  ["mathematics", "81.2", "79.8", 1.4],
  ["reasoning", "74.5", "72.1", 2.4],
  ["instruction following", "88.9", "86.0", 2.9],
  ["world knowledge", "69.4", "70.1", -0.7],
  ["humanities", "72.8", "71.2", 1.6],
  ["stem", "76.1", "74.4", 1.7],
  ["professional", "70.3", "70.3", 0.0],
];

export const SceneEvalCategories: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 10);
  const frame = useCurrentFrame();
  const note = useEnterAt(t(96), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1420} hot at={0} style={{ padding: "24px 30px 26px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, opacity: head }}>
            <Text size={18} weight={600}>
              By category
            </Text>
            <Text size={16} muted>
              · 7 categories
            </Text>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 14,
              paddingBottom: 9,
              borderBottom: `1px solid ${c.border}`,
              opacity: head,
            }}
          >
            {["Category", "Student", "Base", "Δ"].map((h, i) => (
              <span
                key={h}
                style={{
                  flex: i === 0 ? 1 : "0 0 180px",
                  fontFamily: sans,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "rgba(124,109,103,0.8)",
                  textAlign: i === 0 ? "left" : "right",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {CATS.map(([name, a, b, d], i) => {
            /* rows land one after another — the eye reads the Δ column down */
            const enter = Math.max(
              0,
              Math.min(1, (frame - t(14 + i * 9)) / t(9)),
            );
            return (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "11px 0",
                  borderBottom: i === CATS.length - 1 ? "none" : `1px solid ${c.border}`,
                  opacity: enter,
                }}
              >
                <span style={{ flex: 1, fontFamily: sans, fontSize: 17, textTransform: "capitalize" }}>
                  {name}
                </span>
                <span style={{ flex: "0 0 180px", textAlign: "right", fontFamily: sans, fontSize: 17, color: c.mutedFg }}>
                  {a}%
                </span>
                <span style={{ flex: "0 0 180px", textAlign: "right", fontFamily: sans, fontSize: 17, color: c.mutedFg }}>
                  {b}%
                </span>
                <span
                  style={{
                    flex: "0 0 180px",
                    textAlign: "right",
                    fontFamily: mono,
                    fontSize: 17,
                    fontWeight: 600,
                    color: d > 0 ? GREEN : d < 0 ? RED : c.mutedFg,
                  }}
                >
                  {d > 0 ? "+" : ""}
                  {d.toFixed(1)}
                </span>
              </div>
            );
          })}

          <Text size={16} muted style={{ marginTop: 16, lineHeight: 1.55, opacity: note }}>
            One category went backwards by 0.7 points. That is the number worth
            arguing about — and the reason you run the compare rather than
            trusting the headline.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── shared chrome ──────────────────────────────────────────────── */

/** The wizard's three-step header: Select · Configure · Run. */
const Stepper: React.FC<{ current: number; enter: number }> = ({ current, enter }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18, opacity: enter }}>
    {["Select", "Configure", "Run"].map((label, i) => (
      <React.Fragment key={label}>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              display: "flex",
              width: 26,
              height: 26,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              fontFamily: sans,
              fontSize: 14,
              fontWeight: 600,
              background: i <= current ? c.amber : "rgba(12,10,9,0.06)",
              color: i <= current ? "#000" : c.mutedFg,
            }}
          >
            {i + 1}
          </span>
          <Text
            size={16}
            weight={i === current ? 600 : 400}
            style={{ color: i === current ? c.foreground : c.mutedFg }}
          >
            {label}
          </Text>
        </span>
        {i < 2 ? (
          <span style={{ width: 42, height: 1, background: c.border }} />
        ) : null}
      </React.Fragment>
    ))}
  </div>
);

const InfoCard: React.FC<{
  title: string;
  rows: [string, string][];
  enter: number;
}> = ({ title, rows, enter }) => (
  <div
    style={{
      border: `1px solid ${c.border}`,
      borderRadius: 11,
      padding: "15px 18px",
      opacity: enter,
    }}
  >
    <Text size={16} weight={600} style={{ marginBottom: 8 }}>
      {title}
    </Text>
    {rows.map(([k, v]) => (
      <div
        key={k}
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          padding: "6px 0",
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        <Text size={15} muted style={{ flex: 1, minWidth: 0 }}>
          {k}
        </Text>
        <Text size={15} weight={500}>
          {v}
        </Text>
      </div>
    ))}
  </div>
);

const Field: React.FC<{
  label: string;
  hint?: string;
  enter: number;
  children: React.ReactNode;
}> = ({ label, hint, enter, children }) => (
  <div style={{ marginTop: 18, opacity: enter }}>
    <Text size={15} weight={500} style={{ marginBottom: 8 }}>
      {label}
    </Text>
    {children}
    {hint ? (
      <Text size={15} muted style={{ marginTop: 6 }}>
        {hint}
      </Text>
    ) : null}
  </div>
);

const Box: React.FC<{
  value: string;
  note?: string;
  select?: boolean;
  placeholder?: boolean;
}> = ({ value, note, select, placeholder }) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      gap: 9,
      border: `1px solid ${c.border}`,
      borderRadius: 9,
      background: "rgba(12,10,9,0.04)",
      padding: "11px 15px",
    }}
  >
    <span
      style={{
        flex: 1,
        fontFamily: sans,
        fontSize: 17,
        color: placeholder ? c.mutedFg : c.foreground,
      }}
    >
      {value}
      {note ? <span style={{ color: "rgba(124,109,103,0.6)", fontSize: 15 }}> {note}</span> : null}
    </span>
    {select ? (
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2.4}>
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : null}
  </div>
);
