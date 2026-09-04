import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { Typed, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";
import { useTone } from "../ui/tone";
import { AddColumnMenu, DatasetTabs } from "./t21-build-a-dataset";

/**
 * Tutorial 23 — Generate synthetic training data.
 *
 * From `develop/features/datasets.md` §3. The page surfaces the teacher →
 * judge flow as three chips — **Teacher generates → Judge scores → Keep above
 * threshold** — and Build composes a runnable starter pipeline from the answers,
 * then lands you on the PIPELINE tab with the run already in flight.
 *
 * So this video is the sequel to 22: the same pipeline table, except the
 * columns were written for you.
 */

const GREEN = "#059669";

/* ── step 1 · teacher, judge, threshold ─────────────────────────── */

const CHIPS: [string, string][] = [
  ["Teacher generates", "A strong model writes the samples."],
  ["Judge scores", "A second model marks each one against a rubric."],
  ["Keep above threshold", "Anything below the cutoff is dropped."],
];

export const SceneSyntheticFlow: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const e = [useEnterAt(t(6), 12), useEnterAt(t(30), 12), useEnterAt(t(54), 12)];
  const note = useEnterAt(t(82), 12);
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1560 }}>
          <div style={{ display: "flex", alignItems: "stretch", gap: 12 }}>
            {CHIPS.map(([head, body], i) => (
              <React.Fragment key={head}>
                <div
                  style={{
                    flex: 1,
                    padding: "28px 26px",
                    borderRadius: 16,
                    minHeight: 190,
                    background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${i === 2 ? `${c.amber}66` : light ? "rgba(12,10,9,0.08)" : "rgba(255,255,255,0.10)"}`,
                    opacity: e[i],
                    transform: `translateY(${(1 - e[i]) * 12}px)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: 15,
                      color: c.amber,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    style={{
                      fontFamily: sans,
                      fontSize: 26,
                      fontWeight: 600,
                      color: ink,
                      marginTop: 12,
                      lineHeight: 1.2,
                    }}
                  >
                    {head}
                  </div>
                  <div
                    style={{
                      fontFamily: sans,
                      fontSize: 18,
                      color: dim,
                      marginTop: 12,
                      lineHeight: 1.5,
                    }}
                  >
                    {body}
                  </div>
                </div>
                {i < 2 ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 30,
                      color: c.amber,
                      opacity: e[i + 1],
                    }}
                  >
                    →
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>

          <div
            style={{
              marginTop: 26,
              padding: "20px 28px",
              borderRadius: 13,
              border: `1px solid ${c.amber}59`,
              background: `${c.amber}14`,
              fontFamily: sans,
              fontSize: 20,
              lineHeight: 1.5,
              color: ink,
              opacity: note,
            }}
          >
            The teacher is only half of it. Without a judge you get volume;
            with one you get rows worth training on.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · the brief ─────────────────────────────────────────── */

export const SceneSyntheticForm: React.FC = () => {
  const t = useTimeScale(8);
  const name = useEnterAt(t(3), 10);
  const brief = useEnterAt(t(20), 10);
  const models = useEnterAt(t(56), 10);
  const topics = useEnterAt(t(80), 10);
  const counts = useEnterAt(t(104), 10);
  const build = useEnterAt(t(132), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.43 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.46 } },
          { at: t(90), over: t(70), scale: 1.0, focus: { x: 0.5, y: 0.58 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1240} hot at={0} style={{ padding: "28px 36px 30px" }}>
            <Row label="Dataset name" required enter={name}>
              <Typed text="support-tone-synth-v1" at={t(9)} cps={2.0} />
            </Row>

            <Row
              label="What should the data teach?"
              required
              enter={brief}
              hint="The brief the teacher writes from."
              tall
            >
              <Typed
                text="Answer billing questions in our house voice: warm, specific, never promising a refund we cannot make."
                at={t(28)}
                cps={5.2}
              />
            </Row>

            <div style={{ display: "flex", gap: 16, opacity: models }}>
              <div style={{ flex: 1 }}>
                <Row label="Teacher model" required enter={1} select>
                  qwen3.8-27b
                </Row>
              </div>
              <div style={{ flex: 1 }}>
                <Row label="Judge model" required enter={1} select>
                  qwen3.8-27b
                </Row>
              </div>
            </div>

            <Row
              label="Topics to cover"
              enter={topics}
              hint="Comma-separated. Leave it blank and samples repeat at high counts."
            >
              refunds, invoicing, plan changes, VAT, dunning
            </Row>

            <div style={{ display: "flex", gap: 16, opacity: counts }}>
              <div style={{ flex: 1 }}>
                <Row label="Samples to generate" enter={1}>
                  5000
                </Row>
              </div>
              <div style={{ flex: 1 }}>
                <Row label="Quality threshold" enter={1}>
                  0.8
                </Row>
              </div>
            </div>

            <div
              style={{
                display: "inline-block",
                marginTop: 20,
                background: c.amber,
                color: "#000",
                borderRadius: radius,
                padding: "13px 26px",
                fontFamily: sans,
                fontSize: 18,
                fontWeight: 600,
                opacity: build,
              }}
            >
              Build dataset
            </div>
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
  tall?: boolean;
  select?: boolean;
  children: React.ReactNode;
}> = ({ label, required, enter, hint, tall, select, children }) => (
  <div style={{ marginBottom: 16, opacity: enter }}>
    <Text size={16} weight={500} muted style={{ marginBottom: 8 }}>
      {label}
      {required ? <span style={{ color: c.amber }}> *</span> : null}
    </Text>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#f7f7f6",
        border: `1px solid ${c.border}`,
        borderRadius: radius,
        padding: "12px 15px",
        minHeight: tall ? 76 : 46,
        fontFamily: sans,
        fontSize: 18,
        lineHeight: 1.5,
      }}
    >
      <span style={{ flex: 1 }}>{children}</span>
      {select ? <span style={{ color: c.mutedFg }}>⌄</span> : null}
    </div>
    {hint ? (
      <Text size={14} muted style={{ marginTop: 7, opacity: 0.8 }}>
        {hint}
      </Text>
    ) : null}
  </div>
);

/* ── step 3 · the pipeline it wrote for you ─────────────────────── */

/**
 * "Clicking Build dataset… composes a runnable starter pipeline from your
 * answers, saves it, and starts the run. You land on the dataset's PIPELINE tab
 * with the run already in flight."
 *
 * The four composed columns, and why each is there, are the doc's table
 * verbatim — including the detail that `topic` is a diversity seed the
 * generator conditions on and which is then **dropped from the output** rather
 * than landing in the training data.
 */
const COMPOSED: [string, string, string, string, string][] = [
  ["topic", "Sampler", "#3b82f6", "sampled, then dropped", "M5 3h14v18H5zM9 8h.01M15 8h.01M9 16h.01M15 16h.01M12 12h.01"],
  ["instruction", "LLM Text", "#f59e0b", "teacher · temp 1.0", "M13 2 3 14h9l-1 8 10-12h-9z"],
  ["response", "LLM Text", "#f59e0b", "teacher · temp 0.7", "M13 2 3 14h9l-1 8 10-12h-9z"],
  ["quality", "LLM Judge", "#d946ef", "judge · scores 1–10", "M12 3v18M7 21h10M12 6 4 9l3 6a4 4 0 0 0 6-3zM12 6l8 3-3 6a4 4 0 0 1-6-3z"],
];

const RUN_ROWS: [string, string, string, string, boolean][] = [
  ["refunds", "I cancelled on day 35 — can I still get money back?", "Our window is 30 days, so not a refund…", "9", true],
  ["invoicing", "Can you re-issue March with our VAT number?", "Yes — I can reissue it with the number on…", "8", true],
  ["plan changes", "what happens to my seats if i downgrade", "Seats above the new plan's limit stay act…", "6", false],
  ["dunning", "Our card failed. How long before we lose access?", "You have 14 days of grace, and we retry…", "9", true],
];

export const SceneSyntheticRun: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const tabs = useEnterAt(t(3), 10);
  const strip = useEnterAt(t(12), 10);
  const table = useEnterAt(t(26), 10);
  const cols = [
    useEnterAt(t(20), 9),
    useEnterAt(t(28), 9),
    useEnterAt(t(36), 9),
    useEnterAt(t(44), 9),
  ];
  const cutoff = useEnterAt(t(120), 12);
  // "Everything is an ordinary pipeline afterwards — open the Pipeline tab to
  // edit the columns, re-run, or extend it." So the shot ends by opening the
  // same add-column menu over the pipeline the teacher/judge flow composed.
  const menu = useEnterAt(t(158), 12);
  const menuOpen = frame >= t(158);

  // Rows fill in as the run works through them.
  const filled = (r: number) => frame >= t(62 + r * 16);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.44 } },
          { at: t(96), over: t(70), scale: 1.02, focus: { x: 0.5, y: 0.54 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1680} hot at={0} style={{ padding: "26px 30px 150px" }}>
            <DatasetTabs active={3} enter={tabs} />

            {/* the strip, composed rather than assembled by hand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 20,
                border: `1px solid ${c.border}`,
                borderBottom: "none",
                borderRadius: "10px 10px 0 0",
                background: "#f7f7f6",
                padding: "11px 16px",
                opacity: strip,
              }}
            >
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: c.mutedFg,
                }}
              >
                Pipeline <span style={{ opacity: 0.5 }}>4</span>
              </span>
              <span style={{ width: 1, height: 22, background: c.border, margin: "0 4px" }} />
              {COMPOSED.map(([name, , fg, , glyph], i) => (
                <React.Fragment key={name}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      border: `1px solid ${fg}59`,
                      background: `${fg}14`,
                      borderRadius: 8,
                      padding: "7px 13px",
                      opacity: cols[i],
                    }}
                  >
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d={glyph} />
                    </svg>
                    <span style={{ fontFamily: sans, fontSize: 16, fontWeight: 500 }}>
                      {name}
                    </span>
                  </span>
                  {i < COMPOSED.length - 1 ? (
                    <span style={{ color: c.mutedFg, opacity: cols[i + 1] * 0.5, fontSize: 17 }}>
                      ›
                    </span>
                  ) : null}
                </React.Fragment>
              ))}
              <div style={{ flex: 1 }} />
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  marginRight: 16,
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 500,
                  color: c.amber600,
                  opacity: table,
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 999,
                    background: c.amber,
                    opacity: 0.55 + 0.45 * Math.sin(frame / 5),
                  }}
                />
                Running
              </span>

              <div style={{ position: "relative" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    border: `1px solid ${c.amber}`,
                    background: menuOpen ? `${c.amber}14` : "transparent",
                    borderRadius: 8,
                    padding: "7px 14px",
                    fontFamily: sans,
                    fontSize: 16,
                    fontWeight: 600,
                    color: c.amber600,
                    opacity: table,
                  }}
                >
                  + Add column
                </span>
                {menuOpen ? <AddColumnMenu enter={menu} /> : null}
              </div>
            </div>

            <div
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: "0 0 10px 10px",
                overflow: "hidden",
                opacity: table,
              }}
            >
              <div style={{ display: "flex", background: "#f4f3f2" }}>
                <div
                  style={{
                    width: 52,
                    borderRight: `1px solid ${c.border}`,
                    padding: "10px 10px",
                    textAlign: "right",
                    fontFamily: sans,
                    fontSize: 14,
                    color: c.mutedFg,
                  }}
                >
                  #
                </div>
                {COMPOSED.map(([name, short, fg, why], i) => (
                  <div
                    key={name}
                    style={{
                      width: i === 0 ? 230 : i === 3 ? 220 : 480,
                      borderRight: `1px solid ${c.border}`,
                      padding: "9px 13px",
                      opacity: cols[i],
                    }}
                  >
                    <div style={{ fontFamily: sans, fontSize: 16, fontWeight: 600 }}>
                      {name}
                    </div>
                    <div style={{ marginTop: 4, fontFamily: sans, fontSize: 13, color: c.mutedFg }}>
                      <span style={{ color: fg }}>{short}</span>{" "}
                      <span style={{ opacity: 0.4 }}>·</span> {why}
                    </div>
                  </div>
                ))}
              </div>

              {RUN_ROWS.map(([topic, instruction, response, quality, keep], r) => {
                const on = filled(r);
                const rejected = cutoff > 0.5 && !keep;
                return (
                  <div
                    key={topic}
                    style={{
                      display: "flex",
                      borderTop: `1px solid ${c.border}`,
                      background: rejected ? "#fdf3f3" : r % 2 ? "#fbfaf9" : c.card,
                      opacity: rejected ? 0.55 : 1,
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        borderRight: `1px solid ${c.border}`,
                        padding: "13px 10px",
                        textAlign: "right",
                        fontFamily: sans,
                        fontSize: 14,
                        color: c.mutedFg,
                      }}
                    >
                      {r + 1}
                    </div>
                    {[topic, instruction, response, quality].map((cell, i) => (
                      <div
                        key={i}
                        style={{
                          width: i === 0 ? 230 : i === 3 ? 220 : 480,
                          borderRight: `1px solid ${c.border}`,
                          padding: "13px 13px",
                          fontFamily: i === 3 ? mono : sans,
                          fontSize: 16,
                          color: i === 3 && rejected ? "#b42318" : c.foreground,
                          fontWeight: i === 3 ? 600 : 400,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          opacity: on ? 1 : 0.12,
                        }}
                      >
                        {on ? cell : "…"}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginTop: 16,
                padding: "15px 22px",
                borderRadius: 11,
                border: `1px solid ${c.amber}59`,
                background: `${c.amber}14`,
                opacity: cutoff,
              }}
            >
              <Text size={18} style={{ lineHeight: 1.5 }}>
                Your threshold of <span style={{ fontFamily: mono }}>0.8</span>{" "}
                becomes a cutoff of <span style={{ fontFamily: mono }}>8</span> on
                the judge&apos;s column. Row 3 scored 6, so it does not make the
                dataset.
              </Text>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 4 · what each column type does ────────────────────────── */

/**
 * The seven addable types, and what you actually configure in each — read from
 * `pipeline/columns/*.tsx` rather than from the one-line menu descriptions,
 * because the fields are what tell you whether a type fits your problem.
 *
 * Two of the seven make no LLM call at all, which is the distinction worth
 * drawing: a pipeline is not only prompts.
 */
const TYPE_DETAIL: {
  name: string;
  fg: string;
  glyph: string;
  what: string;
  fields: string[];
  llm: boolean;
}[] = [
  {
    name: "Sample from distribution",
    fg: "#3b82f6",
    glyph: "M5 3h14v18H5zM9 8h.01M15 8h.01M9 16h.01M15 16h.01M12 12h.01",
    what: "Draws a value to vary rows by.",
    fields: ["Category", "Gaussian", "Uniform", "DateTime"],
    llm: false,
  },
  {
    name: "Generate with LLM — Text",
    fg: "#f59e0b",
    glyph: "M13 2 3 14h9l-1 8 10-12h-9z",
    what: "Free-form text from a prompt over other columns.",
    fields: ["System prompt", "User prompt (Jinja2)", "Temperature", "Max tokens"],
    llm: true,
  },
  {
    name: "Generate with LLM — Structured",
    fg: "#8b5cf6",
    glyph: "M5 6.5V4.5h14v2M12 4.5v15M9 19.5h6",
    what: "The same, but the shape is enforced.",
    fields: ["User prompt (Jinja2)", "JSON schema / Pydantic"],
    llm: true,
  },
  {
    name: "Generate with LLM — Code",
    fg: "#10b981",
    glyph: "m8 17-5-5 5-5M16 7l5 5-5 5",
    what: "Code, checked for syntax before it lands.",
    fields: ["Language", "System prompt", "Temperature", "Max tokens"],
    llm: true,
  },
  {
    name: "Judge with LLM",
    fg: "#d946ef",
    glyph: "M12 3v18M7 21h10M12 6 4 9l3 6a4 4 0 0 0 6-3zM12 6l8 3-3 6a4 4 0 0 1-6-3z",
    what: "Scores other columns against a rubric you write.",
    fields: ["Judging prompt (Jinja2)", "Rubric dimensions"],
    llm: true,
  },
  {
    name: "Compute from expression",
    fg: "#06b6d4",
    glyph: "M9 4H7a2 2 0 0 0-2 2v3l-2 3 2 3v3a2 2 0 0 0 2 2h2M15 4h2a2 2 0 0 1 2 2v3l2 3-2 3v3a2 2 0 0 1-2 2h-2",
    what: "Arithmetic and string work, no model involved.",
    fields: ["Expression", "Result dtype"],
    llm: false,
  },
  {
    name: "Validate",
    fg: "#22c55e",
    glyph: "M12 2.5 20.5 6v6c0 5-3.6 8.6-8.5 9.5C7.1 20.6 3.5 17 3.5 12V6zm-3 9.5 2 2 4-4",
    what: "Pass or fail, so bad rows never reach training.",
    fields: ["Code lint", "Remote endpoint", "Local callable", "Target columns"],
    llm: false,
  },
];

export const SceneColumnTypes: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(8);
  const rows = [
    useEnterAt(t(4), 10),
    useEnterAt(t(18), 10),
    useEnterAt(t(32), 10),
    useEnterAt(t(46), 10),
    useEnterAt(t(60), 10),
    useEnterAt(t(74), 10),
    useEnterAt(t(88), 10),
  ];
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1620 }}>
          {TYPE_DETAIL.map((type, i) => (
            <div
              key={type.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "13px 24px",
                marginBottom: 7,
                borderRadius: 13,
                background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${type.fg}40`,
                opacity: rows[i],
                transform: `translateY(${(1 - rows[i]) * 10}px)`,
              }}
            >
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: `${type.fg}1f`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={type.fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d={type.glyph} />
                </svg>
              </span>

              <div style={{ width: 400, flexShrink: 0 }}>
                <div style={{ fontFamily: sans, fontSize: 20, fontWeight: 600, color: ink }}>
                  {type.name}
                </div>
                <div style={{ fontFamily: sans, fontSize: 16, color: dim, marginTop: 4 }}>
                  {type.what}
                </div>
              </div>

              {/* what you fill in */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, flex: 1 }}>
                {type.fields.map((field) => (
                  <span
                    key={field}
                    style={{
                      border: `1px solid ${light ? "rgba(12,10,9,0.12)" : "rgba(255,255,255,0.14)"}`,
                      borderRadius: 7,
                      padding: "5px 11px",
                      fontFamily: mono,
                      fontSize: 14,
                      color: dim,
                    }}
                  >
                    {field}
                  </span>
                ))}
              </div>

              <span
                style={{
                  width: 92,
                  textAlign: "right",
                  fontFamily: sans,
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: type.llm ? type.fg : dim,
                  opacity: type.llm ? 1 : 0.7,
                  flexShrink: 0,
                }}
              >
                {type.llm ? "LLM" : "no LLM"}
              </span>
            </div>
          ))}

        </div>
      </AbsoluteFill>
    </Stage>
  );
};
