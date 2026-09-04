import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { Typed, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 21 — Build a dataset.
 *
 * Sources: `dev-dataset-sources.png` (four cards), `dev-dataset-from-chats.png`
 * (the build form, with its filters, format toggle and Scrub PII switch) and
 * `dev-dataset-detail.png` (four stat tiles, a ready banner offering both
 * "Use as benchmark" and "Train on this", then Details and Quality).
 *
 * Two things the form says that the video repeats: **"Only good chats — no
 * crashes, denials, overrides or thumbs-down"** is the default filter, and
 * scrubbing PII does not keep the original, so it cannot be undone.
 */

const GREEN = "#059669";

/* ── step 1 · where the rows come from ──────────────────────────── */

const SOURCES: [string, string, string][] = [
  ["From chats", "Turn real chats with your agents into supervised training pairs.", "M21 11.5a8.4 8.4 0 0 1-9 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"],
  ["Upload files", "Bring your own JSONL, CSV, or plain-text files.", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v13M7 8l5-5 5 5"],
  ["Generate synthetic", "Create data with a teacher model, filtered by a judge.", "M13 2 3 14h9l-1 8 10-12h-9z"],
  ["Import repository", "Pull an existing dataset repository from the Hugging Face Hub.", "M12 3v10m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"],
];

export const SceneDatasetSources: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const e = [
    useEnterAt(t(4), 11),
    useEnterAt(t(16), 11),
    useEnterAt(t(28), 11),
    useEnterAt(t(40), 11),
  ];
  const picked = frame >= t(74);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, width: 1520 }}>
          {SOURCES.map(([name, body, glyph], i) => {
            const on = picked && i === 0;
            return (
              <div
                key={name}
                style={{
                  background: on ? "#fffdf7" : c.card,
                  border: `1px solid ${on ? c.amber : c.border}`,
                  borderRadius: 14,
                  padding: "26px 28px",
                  minHeight: 184,
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

/* ── step 2 · the build form ────────────────────────────────────── */

export const SceneDatasetForm: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const banner = useEnterAt(t(3), 10);
  const name = useEnterAt(t(12), 10);
  const agents = useEnterAt(t(34), 10);
  const filters = useEnterAt(t(52), 10);
  const format = useEnterAt(t(74), 10);
  const pii = useEnterAt(t(94), 10);
  const build = useEnterAt(t(112), 12);
  const scrubOn = frame >= t(106);

  return (
    <Stage glow={{ x: 0.5, y: 0.43 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.46 } },
          { at: t(80), over: t(70), scale: 1.0, focus: { x: 0.5, y: 0.58 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1180} hot at={0} style={{ padding: "26px 34px 28px" }}>
            <div
              style={{
                display: "flex",
                gap: 14,
                border: `1px solid ${c.amber}`,
                background: "#fffdf7",
                borderRadius: 11,
                padding: "15px 18px",
                opacity: banner,
              }}
            >
              <div>
                <Text size={18} weight={600}>
                  From your chats
                </Text>
                <Text size={16} muted style={{ marginTop: 4 }}>
                  Pick one or more agents to build from.
                </Text>
              </div>
            </div>

            <div style={{ marginTop: 20, opacity: name }}>
              <Text size={16} weight={500} muted style={{ marginBottom: 8 }}>
                Dataset name <span style={{ color: c.amber }}>*</span>
              </Text>
              <div
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: 10,
                  padding: "13px 16px",
                  minHeight: 48,
                  fontFamily: sans,
                  fontSize: 18,
                }}
              >
                <Typed text="acme-support-sft-v1" at={t(20)} cps={1.9} />
              </div>
              <Text size={15} muted style={{ marginTop: 7, opacity: 0.8 }}>
                Lowercase, hyphens. Used as the repo name.
              </Text>
            </div>

            <div style={{ marginTop: 18, opacity: agents }}>
              <Text size={16} weight={500} muted style={{ marginBottom: 8 }}>
                Agents
              </Text>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 34,
                  border: `1px solid ${c.border}`,
                  borderRadius: 10,
                  padding: "11px 16px",
                  fontFamily: sans,
                  fontSize: 17,
                }}
              >
                Acme Support Bot
                <span style={{ color: c.mutedFg }}>⌄</span>
              </div>
            </div>

            {/* the default that matters */}
            <div style={{ marginTop: 20, opacity: filters }}>
              <Text size={16} weight={500} muted style={{ marginBottom: 10 }}>
                Filters
              </Text>
              {[
                ["Only good chats — no crashes, denials, overrides or thumbs-down", true],
                ["Drop messages shorter than 3 words", false],
              ].map(([label, on]) => (
                <div
                  key={label as string}
                  style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 9 }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: on ? c.amber : "transparent",
                      border: `2px solid ${on ? c.amber : c.border}`,
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {on ? "✓" : ""}
                  </span>
                  <Text size={17}>{label as string}</Text>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18, opacity: format }}>
              <Text size={16} weight={500} muted style={{ marginBottom: 9 }}>
                Format
              </Text>
              <div
                style={{
                  display: "inline-flex",
                  background: "#f3f1f1",
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                {["SFT pairs", "Raw messages"].map((f, i) => (
                  <span
                    key={f}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 8,
                      background: i === 0 ? c.card : "transparent",
                      fontFamily: sans,
                      fontSize: 17,
                      fontWeight: i === 0 ? 600 : 400,
                      color: i === 0 ? c.foreground : c.mutedFg,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <Text size={15} muted style={{ marginTop: 9, lineHeight: 1.5 }}>
                Each answered question becomes its own prompt and reply row.
              </Text>
            </div>

            {/* the one that cannot be undone */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                marginTop: 20,
                opacity: pii,
              }}
            >
              <div style={{ flex: 1 }}>
                <Text size={17} weight={500}>
                  Scrub PII
                </Text>
                <Text size={15} muted style={{ marginTop: 5 }}>
                  Removes personal information. The original is not kept, so this
                  cannot be undone.
                </Text>
              </div>
              <div
                style={{
                  width: 56,
                  height: 30,
                  borderRadius: 999,
                  background: scrubOn ? c.amber : "#e0dedd",
                  padding: 3,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 999,
                    background: "#fff",
                    transform: `translateX(${scrubOn ? 26 : 0}px)`,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "inline-block",
                marginTop: 22,
                background: c.amber,
                color: "#000",
                borderRadius: radius,
                padding: "13px 24px",
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

/* ── step 3 · what you got ──────────────────────────────────────── */

const TILES: [string, string, string][] = [
  ["412", "Rows", "SFT prompt / reply pairs"],
  ["486,204", "Tokens", "after formatting"],
  ["1,124", "Avg length", "tokens per sample"],
  ["None found", "PII", "emails, phones, SSNs, cards, IPs"],
];

const DETAILS: [string, string][] = [
  ["Source", "218 chats · acme-support-bot"],
  ["Format", "SFT pairs"],
  ["Created", "just now"],
  ["Visibility", "Org"],
];

const QUALITY: [string, string, boolean][] = [
  ["PII", "None found", true],
  ["Deduplicated", "No duplicates", false],
  ["Avg length", "1,124 tokens", false],
  ["Empty / malformed", "3", false],
];

export const SceneDatasetReady: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const tiles = [
    useEnterAt(t(12), 9),
    useEnterAt(t(19), 9),
    useEnterAt(t(26), 9),
    useEnterAt(t(33), 9),
  ];
  const banner = useEnterAt(t(48), 12);
  const cards = useEnterAt(t(66), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.44 } },
          { at: t(60), over: t(70), scale: 1.02, focus: { x: 0.5, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1620} hot at={0} style={{ padding: "26px 32px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: head }}>
              <Heading size={27}>acme-support-sft-v1</Heading>
              <span
                style={{
                  background: "#f0efee",
                  borderRadius: 7,
                  padding: "4px 11px",
                  fontFamily: mono,
                  fontSize: 15,
                  color: c.mutedFg,
                }}
              >
                v1
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
                ● Ready
              </span>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  background: c.amber,
                  color: "#000",
                  borderRadius: 9,
                  padding: "12px 22px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 600,
                }}
              >
                Train on this →
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <DatasetTabs active={0} enter={head} />
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
              {TILES.map(([value, label, sub], i) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    border: `1px solid ${c.border}`,
                    borderRadius: 12,
                    padding: "18px 20px",
                    opacity: tiles[i],
                  }}
                >
                  <div
                    style={{
                      fontFamily: sans,
                      fontSize: 30,
                      fontWeight: 600,
                      color: label === "PII" ? GREEN : c.foreground,
                    }}
                  >
                    {value}
                  </div>
                  <Text size={17} style={{ marginTop: 8 }}>
                    {label}
                  </Text>
                  <Text size={14} muted style={{ marginTop: 5 }}>
                    {sub}
                  </Text>
                </div>
              ))}
            </div>

            {/* one dataset, two doors out of it */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginTop: 18,
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                padding: "17px 22px",
                opacity: banner,
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  background: `${GREEN}1f`,
                  color: GREEN,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <div style={{ flex: 1 }}>
                <Text size={19} weight={600}>
                  This dataset is ready to use.
                </Text>
                <Text size={16} muted style={{ marginTop: 4 }}>
                  Train a model on it, or use it as the benchmark for an
                  evaluation, in one click.
                </Text>
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
                Use as benchmark →
              </div>
              <div
                style={{
                  border: `1px solid ${c.amber}`,
                  borderRadius: 9,
                  padding: "11px 18px",
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 500,
                  color: c.amber600,
                }}
              >
                Train on this →
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 18, opacity: cards }}>
              <InfoCard title="Details" rows={DETAILS.map(([k, v]) => [k, v, false])} />
              <InfoCard title="Quality" rows={QUALITY} />
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const InfoCard: React.FC<{
  title: string;
  rows: (readonly [string, string, boolean])[] | [string, string, boolean][];
}> = ({ title, rows }) => (
  <div
    style={{
      flex: 1,
      border: `1px solid ${c.border}`,
      borderRadius: 12,
      padding: "18px 22px",
    }}
  >
    <Text size={18} weight={600} style={{ marginBottom: 14 }}>
      {title}
    </Text>
    {rows.map(([label, value, good]) => (
      <div
        key={label}
        style={{ display: "flex", alignItems: "baseline", padding: "7px 0" }}
      >
        <Text size={16} muted style={{ flex: 1 }}>
          {label}
        </Text>
        <span
          style={{
            fontFamily: sans,
            fontSize: 17,
            fontWeight: 500,
            color: good ? GREEN : c.foreground,
          }}
        >
          {value}
        </span>
      </div>
    ))}
  </div>
);

/* ── the dataset's tabs ─────────────────────────────────────────── */

/**
 * Five, from `TABS` in `dataset-detail-page.tsx` — the docs screenshot shows
 * four because **Configuration** only appears once the dataset has a build
 * config. Blurbs are the component's own.
 */
const DATASET_TABS: [string, string][] = [
  ["Overview", "Size, token counts, quality and PII at a glance"],
  ["Samples", "Read the actual prompt / reply pairs"],
  ["Configuration", "How this dataset was set up, and edit it while it is a draft"],
  ["Pipeline", "Add generated columns and rebuild the dataset"],
  ["Repository", "Files and commits in the Data Hub repo"],
];

export const DatasetTabs: React.FC<{ active: number; enter: number }> = ({
  active,
  enter,
}) => (
  <div
    style={{
      display: "flex",
      gap: 26,
      paddingBottom: 12,
      borderBottom: `1px solid ${c.border}`,
      opacity: enter,
    }}
  >
    {DATASET_TABS.map(([label], i) => (
      <span
        key={label}
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
        {label}
      </span>
    ))}
  </div>
);

/* ── step 4 · read the rows ─────────────────────────────────────── */

const SAMPLES: [string, string][] = [
  [
    "Customer is on the annual plan and wants a refund after 40 days. Are we obliged?",
    "No — our window is 30 days, so this falls outside it. I'd offer a pro-rata credit instead.",
  ],
  [
    "Which plan includes SSO?",
    "Team and above. Starter does not, and moving up mid-term is prorated to your renewal.",
  ],
  [
    "Can we be invoiced quarterly?",
    "Yes, on annual contracts. I'll flag it to billing and they'll send a revised agreement.",
  ],
];

export const SceneDatasetSamples: React.FC = () => {
  const t = useTimeScale(5);
  const tabs = useEnterAt(t(3), 10);
  const rows = [useEnterAt(t(14), 10), useEnterAt(t(34), 10), useEnterAt(t(54), 10)];

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <DatasetTabs active={1} enter={tabs} />

          {SAMPLES.map(([prompt, reply], i) => (
            <div
              key={prompt}
              style={{
                borderBottom: `1px solid ${c.border}`,
                padding: "20px 4px",
                opacity: rows[i],
              }}
            >
              <div style={{ display: "flex", gap: 18 }}>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 14,
                    color: c.amber600,
                    width: 80,
                    paddingTop: 4,
                  }}
                >
                  prompt
                </span>
                <Text size={19} style={{ flex: 1, lineHeight: 1.5 }}>
                  {prompt}
                </Text>
              </div>
              <div style={{ display: "flex", gap: 18, marginTop: 12 }}>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 14,
                    color: c.mutedFg,
                    width: 80,
                    paddingTop: 4,
                  }}
                >
                  reply
                </span>
                <Text size={19} muted style={{ flex: 1, lineHeight: 1.5 }}>
                  {reply}
                </Text>
              </div>
            </div>
          ))}
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};


/* ── step 5 · the pipeline ──────────────────────────────────────── */

/**
 * The real preview table from `pipeline/pipeline-table.tsx`: a sticky `#`
 * row-index column, 220px data columns, and a trailing `+` that opens the
 * add-column menu without leaving the table.
 *
 * Each header is two lines (`pipeline/column-header.tsx`): a type icon and the
 * column name, then `dtype · short type` beneath. Short labels and per-type
 * colours are `column-types.ts` verbatim — Seed slate, Sampler blue, LLM Text
 * amber, LLM Struct violet, LLM Code emerald, LLM Judge fuchsia, Expression
 * cyan, Validator green.
 *
 * This is a spreadsheet you compute over, not a preview of rows, and drawing it
 * as cards missed that entirely.
 */
type Col = {
  name: string;
  dtype: string;
  short: string;
  fg: string;
  glyph: string;
  at: number;
};

const PIPE_COLS: Col[] = [
  {
    name: "prompt",
    dtype: "string",
    short: "Seed",
    fg: "#94a3b8",
    glyph: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
    at: 18,
  },
  {
    name: "reply",
    dtype: "string",
    short: "Seed",
    fg: "#94a3b8",
    glyph: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
    at: 24,
  },
  {
    name: "tone",
    dtype: "int",
    short: "LLM Judge",
    fg: "#d946ef",
    glyph: "M12 3v18M7 21h10M12 6 4 9l3 6a4 4 0 0 0 6-3zM12 6l8 3-3 6a4 4 0 0 1-6-3z",
    at: 52,
  },
  {
    name: "ok",
    dtype: "bool",
    short: "Validator",
    fg: "#22c55e",
    glyph: "M12 2.5 20.5 6v6c0 5-3.6 8.6-8.5 9.5C7.1 20.6 3.5 17 3.5 12V6zm-3 9.5 2 2 4-4",
    at: 160,
  },
];

const PIPE_ROWS: string[][] = [
  ["Refund after 40 days on annual?", "No — our window is 30 days…", "4", "true"],
  ["Which plan includes SSO?", "Team and above. Starter does not.", "5", "true"],
  ["Can we be invoiced quarterly?", "Yes, on annual contracts.", "3", "true"],
  ["is it broke", "Could you tell me a bit more?", "2", "false"],
];

/**
 * `ADDABLE_COLUMN_TYPES` — all seven, in the order the menu lists them.
 * Everything except `seed`, which is read-only input from the seed dataset and
 * so cannot be added. Labels, descriptions and colours are `column-types.ts`
 * verbatim.
 */
export const ADDABLE: [string, string, string, string][] = [
  ["Sample from distribution", "Statistical / deterministic generator — no LLM call", "#3b82f6", "M5 3h14v18H5zM9 8h.01M15 8h.01M9 16h.01M15 16h.01M12 12h.01"],
  ["Generate with LLM — Text", "Free-form text from a Jinja2 prompt over other columns", "#f59e0b", "M13 2 3 14h9l-1 8 10-12h-9z"],
  ["Generate with LLM — Structured", "Schema-enforced JSON output (Pydantic / JSON-schema)", "#8b5cf6", "M5 6.5V4.5h14v2M12 4.5v15M9 19.5h6"],
  ["Generate with LLM — Code", "Code output with syntax validation", "#10b981", "m8 17-5-5 5-5M16 7l5 5-5 5"],
  ["Judge with LLM", "Rubric scoring over existing columns", "#d946ef", "M12 3v18M7 21h10M12 6 4 9l3 6a4 4 0 0 0 6-3zM12 6l8 3-3 6a4 4 0 0 1-6-3z"],
  ["Compute from expression", "Derived column from a deterministic expression", "#06b6d4", "M9 4H7a2 2 0 0 0-2 2v3l-2 3 2 3v3a2 2 0 0 0 2 2h2M15 4h2a2 2 0 0 1 2 2v3l2 3-2 3v3a2 2 0 0 1-2 2h-2"],
  ["Validate", "Pass/fail check over one or more columns", "#22c55e", "M12 2.5 20.5 6v6c0 5-3.6 8.6-8.5 9.5C7.1 20.6 3.5 17 3.5 12V6zm-3 9.5 2 2 4-4"],
];

export const SceneDatasetPipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const tabs = useEnterAt(t(3), 10);
  const table = useEnterAt(t(12), 10);
  const menu = useEnterAt(t(74), 10);
  const rebuild = useEnterAt(t(182), 12);

  // Hoisted: a hook must not be called from inside the header's map, even
  // though the column count is fixed.
  const pickAt = t(120);
  const menuOpen = frame >= t(74) && frame < t(152);
  const colEnter = [
    useEnterAt(t(PIPE_COLS[0].at), 9),
    useEnterAt(t(PIPE_COLS[1].at), 9),
    useEnterAt(t(PIPE_COLS[2].at), 9),
    useEnterAt(t(PIPE_COLS[3].at), 9),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.44 } },
          { at: t(86), over: t(70), scale: 1.02, focus: { x: 0.5, y: 0.54 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          {/* Extra bottom room: the Panel clips, and an open menu is taller
              than the table it covers. */}
          <Panel width={1660} hot at={0} style={{ padding: "26px 30px 150px" }}>
            <DatasetTabs active={3} enter={tabs} />

            {/*
              `steps-panel.tsx`: "Horizontal pipeline strip sitting above the
              preview table — each column in dependency order renders as a chip,
              with a chevron between steps." The chevrons are the point: the
              columns are a linear transformation, not a set.
            */}
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
                opacity: table,
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
                Pipeline{" "}
                <span style={{ opacity: 0.5 }}>{PIPE_COLS.length}</span>
              </span>
              <span style={{ width: 1, height: 22, background: c.border, margin: "0 4px" }} />

              {PIPE_COLS.map((col, i) => (
                <React.Fragment key={col.name}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      border: `1px solid ${col.fg}59`,
                      background: `${col.fg}14`,
                      borderRadius: 8,
                      padding: "7px 13px",
                      opacity: colEnter[i],
                    }}
                  >
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={col.fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d={col.glyph} />
                    </svg>
                    <span style={{ fontFamily: sans, fontSize: 16, fontWeight: 500 }}>
                      {col.name}
                    </span>
                  </span>
                  {i < PIPE_COLS.length - 1 ? (
                    <span
                      style={{
                        color: c.mutedFg,
                        opacity: colEnter[i + 1] * 0.5,
                        fontSize: 17,
                      }}
                    >
                      ›
                    </span>
                  ) : null}
                </React.Fragment>
              ))}

              <div style={{ flex: 1 }} />
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
                    opacity: menu,
                  }}
                >
                  + Add column
                </span>

                {/*
                  `add-column-menu.tsx`: a "New column" label over one item per
                  addable type — the type's icon and label, with its description
                  indented beneath.
                */}
                {menuOpen ? (
                  <AddColumnMenu enter={menu} picked={frame >= pickAt ? "Validate" : null} />
                ) : null}
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
              {/* header row */}
              <div style={{ display: "flex", background: "#f4f3f2" }}>
                <div
                  style={{
                    width: 56,
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
                {PIPE_COLS.map((col, ci) => {
                  return (
                    <div
                      key={col.name}
                      style={{
                        width: 300,
                        borderRight: `1px solid ${c.border}`,
                        padding: "9px 13px",
                        opacity: colEnter[ci],
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={col.fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d={col.glyph} />
                        </svg>
                        <span
                          style={{
                            fontFamily: sans,
                            fontSize: 16,
                            fontWeight: 600,
                            flex: 1,
                          }}
                        >
                          {col.name}
                        </span>
                        <span style={{ color: c.mutedFg, fontSize: 15 }}>⋯</span>
                      </div>
                      <div
                        style={{
                          marginTop: 4,
                          paddingLeft: 23,
                          fontFamily: sans,
                          fontSize: 13,
                          color: c.mutedFg,
                        }}
                      >
                        {col.dtype}{" "}
                        <span style={{ opacity: 0.4 }}>·</span>{" "}
                        <span style={{ color: col.fg }}>{col.short}</span>
                      </div>
                    </div>
                  );
                })}
                {/* the trailing add-column control */}
                <div
                  style={{
                    width: 62,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: sans,
                    fontSize: 22,
                    color: menu > 0.4 ? c.amber600 : c.mutedFg,
                  }}
                >
                  +
                </div>
              </div>

              {/* data rows */}
              {PIPE_ROWS.map((row, r) => (
                <div
                  key={row[0]}
                  style={{
                    display: "flex",
                    borderTop: `1px solid ${c.border}`,
                    background: r % 2 ? "#fbfaf9" : c.card,
                  }}
                >
                  <div
                    style={{
                      width: 56,
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
                  {PIPE_COLS.map((col, i) => {
                    const on = frame >= t(col.at + 6);
                    const bad = col.name === "ok" && row[i] === "false";
                    return (
                      <div
                        key={col.name}
                        style={{
                          width: 300,
                          borderRight: `1px solid ${c.border}`,
                          padding: "13px 13px",
                          fontFamily: col.dtype === "string" ? sans : mono,
                          fontSize: 16,
                          color: bad ? "#b42318" : c.foreground,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          opacity: on ? 1 : 0,
                        }}
                      >
                        {row[i]}
                      </div>
                    );
                  })}
                  <div style={{ width: 62 }} />
                </div>
              ))}
            </div>

            <div
              style={{
                display: "inline-block",
                marginTop: 18,
                background: c.amber,
                color: "#000",
                borderRadius: radius,
                padding: "13px 24px",
                fontFamily: sans,
                fontSize: 18,
                fontWeight: 600,
                opacity: rebuild,
              }}
            >
              Rebuild dataset
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};


/**
 * The add-column dropdown, shared by every scene that shows a pipeline.
 *
 * `add-column-menu.tsx`: a "New column" label over one item per addable type —
 * the type's icon and label, with its description indented beneath. Anchored to
 * the "+ Add column" trigger, so it needs a positioned parent.
 *
 * Note the Panel it lands in clips: give that panel bottom padding or the last
 * items are cut off.
 */
export const AddColumnMenu: React.FC<{
  enter: number;
  picked?: string | null;
}> = ({ enter, picked }) => (
  <div
    style={{
      position: "absolute",
      right: 0,
      top: 46,
      width: 500,
      background: c.card,
      border: `1px solid ${c.border}`,
      borderRadius: 10,
      boxShadow: "0 28px 70px rgba(28,22,18,0.22)",
      padding: "7px 0",
      zIndex: 5,
      opacity: enter,
    }}
  >
    <div
      style={{
        padding: "8px 14px",
        fontFamily: sans,
        fontSize: 15,
        fontWeight: 600,
        color: c.mutedFg,
      }}
    >
      New column
    </div>
    <div style={{ height: 1, background: c.border, margin: "4px 0" }} />
    {ADDABLE.map(([label, desc, fg, glyph]) => (
      <div
        key={label}
        style={{
          padding: "7px 14px",
          background: label === picked ? `${c.amber}14` : "transparent",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d={glyph} />
          </svg>
          <span style={{ fontFamily: sans, fontSize: 15.5, fontWeight: 500 }}>
            {label}
          </span>
        </div>
        <div
          style={{
            paddingLeft: 25,
            marginTop: 2,
            fontFamily: sans,
            fontSize: 13,
            color: c.mutedFg,
          }}
        >
          {desc}
        </div>
      </div>
    ))}
  </div>
);
