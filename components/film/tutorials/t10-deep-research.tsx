import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans, serif } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { Typed, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 10 — Deep research.
 *
 * Sources: `work/tools/deep-research.md` for the command, the delegation shape
 * and the single-shot rule, `work-chat-commands.png` for the palette, and
 * `research/research-sources-panel.tsx` for the citations strip — a collapsed
 * "SOURCES · N" bar above the composer whose rows are `[id] title · hostname`,
 * and which the `[S#]` chips in the report deep-link into.
 */

const TOPIC =
  "How are EU banks approaching AI Act compliance for customer-facing chatbots?";

/* ── step 1 · one command ───────────────────────────────────────── */

const COMMANDS: [string, string, boolean][] = [
  ["/deep-research", "A cited report on a topic worth an afternoon", true],
  ["/mission", "Run a long goal with tasks and workers", false],
  ["/goal", "Track an outcome the agent works toward", false],
  ["/code", "Hand a change to a coding agent", false],
];

export const SceneResearchCommand: React.FC = () => {
  const t = useTimeScale(5);
  const shell = useEnterAt(t(2), 10);
  const menu = useEnterAt(t(14), 10);
  const rows = [
    useEnterAt(t(20), 9),
    useEnterAt(t(27), 9),
    useEnterAt(t(34), 9),
    useEnterAt(t(41), 9),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.46 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1300} hot at={0} style={{ padding: "30px 34px 28px", opacity: shell }}>
          <div
            style={{
              border: `1px solid ${c.border}`,
              borderRadius: 14,
              overflow: "hidden",
              marginBottom: 14,
              opacity: menu,
            }}
          >
            {COMMANDS.map(([cmd, desc, on], i) => (
              <div
                key={cmd}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "15px 20px",
                  background: on ? "#fffdf7" : c.card,
                  borderTop: i ? `1px solid ${c.border}` : "none",
                  opacity: rows[i],
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 19,
                    fontWeight: 500,
                    color: on ? c.amber600 : c.foreground,
                    width: 210,
                  }}
                >
                  {cmd}
                </span>
                <Text size={17} muted>
                  {desc}
                </Text>
              </div>
            ))}
          </div>

          <div
            style={{
              border: `1px solid ${c.amber}`,
              borderRadius: 16,
              padding: "20px 22px",
              minHeight: 92,
              fontFamily: sans,
              fontSize: 21,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: c.amber600, fontFamily: mono }}>
              /deep-research{" "}
            </span>
            <Typed text={TOPIC} at={t(52)} cps={3.6} />
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · the delegation, in the thread ─────────────────────── */

/**
 * How research actually looks while it runs, from the renderers in
 * sdk/agent-chat-react/src/components/chat/tools/:
 *
 *   · `delegate-tool.tsx` — one row, never a card: a git-branch glyph, a bold
 *     "Delegate", then `· agent_type` and the goal in quotes. The child's prose
 *     lands later in the same thread, so the row is a status marker only.
 *   · `oneliner-tools.tsx::ResearchMemoryBlock` — "recorded S1 · hostname" as
 *     each source enters the evidence bank.
 *   · `research-tool.tsx::ResearchOutlineBlock` — a card headed
 *     "RESEARCH OUTLINE · N sections" over the outline in mono.
 */
type Beat =
  | { at: number; kind: "ask"; text: string }
  | { at: number; kind: "says"; text: string }
  | { at: number; kind: "delegate"; agent: string; goal: string }
  | { at: number; kind: "memory"; source: string; host: string }
  | { at: number; kind: "outline"; sections: string[] };

const BEATS: Beat[] = [
  { at: 2, kind: "ask", text: "/deep-research How are EU banks approaching AI Act compliance for customer-facing chatbots?" },
  { at: 16, kind: "says", text: "Handing this to the research sub-agent." },
  { at: 30, kind: "delegate", agent: "deep-research", goal: "How are EU banks approaching AI Act compliance…" },
  { at: 50, kind: "memory", source: "S1", host: "eur-lex.europa.eu" },
  { at: 62, kind: "memory", source: "S2", host: "eba.europa.eu" },
  { at: 74, kind: "memory", source: "S3", host: "ecb.europa.eu" },
  {
    at: 88,
    kind: "outline",
    sections: [
      "1. What Article 50 requires",
      "2. How supervisors are reading it",
      "3. Where retail banks actually are",
      "4. The December detection deadline",
    ],
  },
  { at: 124, kind: "delegate", agent: "research-writer", goal: "Write the report from the evidence bank" },
];

export const SceneResearchChain: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const landed = BEATS.filter((b) => frame >= t(b.at)).length;
  const lift = Math.max(0, landed - 6) * 44;

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.48 } },
          { at: t(80), over: t(70), scale: 1.03, focus: { x: 0.5, y: 0.55 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1420} hot at={0} style={{ padding: "28px 34px 30px", overflow: "hidden" }}>
            <div style={{ transform: `translateY(${-lift}px)` }}>
              {BEATS.map((b, i) => (
                <BeatRow key={`${b.kind}-${i}`} beat={b} at={t(b.at)} />
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const BeatRow: React.FC<{ beat: Beat; at: number }> = ({ beat, at }) => {
  const e = useEnterAt(at, 9);
  if (e === 0) return null;
  const rise = { opacity: e, transform: `translateY(${(1 - e) * 8}px)` };

  if (beat.kind === "ask") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", ...rise }}>
        <div
          style={{
            background: "#fdf4e3",
            borderRadius: 13,
            padding: "15px 20px",
            maxWidth: "78%",
            fontFamily: sans,
            fontSize: 19,
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontFamily: mono, color: c.amber600 }}>
            /deep-research{" "}
          </span>
          {beat.text.replace("/deep-research ", "")}
        </div>
      </div>
    );
  }

  if (beat.kind === "says") {
    return (
      <Text size={19} style={{ margin: "16px 0", lineHeight: 1.55, ...rise }}>
        {beat.text}
      </Text>
    );
  }

  if (beat.kind === "delegate") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: "8px 0",
          ...rise,
        }}
      >
        <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="4" r="2.2" />
          <circle cx="6" cy="20" r="2.2" />
          <circle cx="18" cy="9" r="2.2" />
          <path d="M6 6.2v11.6M18 11.2c0 3.4-5 2.8-5 6.6" />
        </svg>
        <span style={{ fontFamily: sans, fontSize: 19, fontWeight: 500 }}>
          Delegate
        </span>
        <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg }}>
          · {beat.agent}
        </span>
        <span
          style={{
            fontFamily: sans,
            fontSize: 16,
            fontStyle: "italic",
            color: c.mutedFg,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          · “{beat.goal}”
        </span>
      </div>
    );
  }

  if (beat.kind === "memory") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: "6px 0",
          fontFamily: sans,
          fontSize: 17,
          color: c.mutedFg,
          ...rise,
        }}
      >
        <span style={{ opacity: 0.6 }}>◇</span>
        <span style={{ fontWeight: 500, color: c.foreground }}>
          Research memory
        </span>
        <span>
          · recorded{" "}
          <span style={{ fontFamily: mono, color: c.amber600 }}>
            {beat.source}
          </span>{" "}
          · {beat.host}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        border: `1px solid ${c.border}`,
        background: "#faf9f8",
        borderRadius: 8,
        padding: "13px 16px",
        marginTop: 12,
        ...rise,
      }}
    >
      <div
        style={{
          fontFamily: sans,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: c.mutedFg,
          marginBottom: 9,
        }}
      >
        Research outline · {beat.sections.length} sections
      </div>
      {beat.sections.map((line) => (
        <div
          key={line}
          style={{
            fontFamily: mono,
            fontSize: 16,
            lineHeight: 1.65,
            color: c.foreground,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

/* ── step 3 · the report, with its citations ────────────────────── */

/** `[S#]` chips deep-link into the sources strip; the strip lives above the
 *  composer so citations stay next to the conversation. */
const Cite: React.FC<{ n: number }> = ({ n }) => (
  <span
    style={{
      display: "inline-block",
      background: `${c.amber}24`,
      color: c.amber600,
      borderRadius: 5,
      padding: "1px 7px",
      margin: "0 3px",
      fontFamily: mono,
      fontSize: 15,
      fontWeight: 600,
      verticalAlign: "middle",
    }}
  >
    S{n}
  </span>
);

const SOURCES: [number, string, string][] = [
  [1, "AI Act Article 50 — transparency obligations", "eur-lex.europa.eu"],
  [2, "EBA guidance on AI in customer channels", "eba.europa.eu"],
  [3, "Retail banking chatbot disclosure survey 2026", "ecb.europa.eu"],
  [4, "National supervisor readiness notes", "bafin.de"],
];

export const SceneResearchReport: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const p1 = useEnterAt(t(16), 10);
  const p2 = useEnterAt(t(34), 10);
  const p3 = useEnterAt(t(52), 10);
  const panel = useEnterAt(t(70), 10);
  const rows = [
    useEnterAt(t(80), 8),
    useEnterAt(t(86), 8),
    useEnterAt(t(92), 8),
    useEnterAt(t(98), 8),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.95, focus: { x: 0.5, y: 0.44 } },
          { at: t(66), over: t(80), scale: 1.02, focus: { x: 0.5, y: 0.62 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1420} hot at={0} style={{ padding: "30px 38px 26px" }}>
            <div style={{ opacity: head }}>
              <div
                style={{
                  fontFamily: serif,
                  fontSize: 32,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                AI Act compliance for customer-facing chatbots
              </div>
              <Text size={15} muted style={{ marginTop: 8 }}>
                Report · 4 sources · 11 minutes
              </Text>
            </div>

            <Text size={19} style={{ marginTop: 22, lineHeight: 1.65, opacity: p1 }}>
              Every EU bank in scope has to disclose that a customer is talking
              to an AI system, and the obligation bites when the interaction
              begins rather than on request. <Cite n={1} />
            </Text>

            <Text size={19} style={{ marginTop: 16, lineHeight: 1.65, opacity: p2 }}>
              Supervisors have converged on treating a chatbot as a customer
              channel, which pulls existing conduct rules across largely intact.
              <Cite n={2} /> <Cite n={4} />
            </Text>

            <Text size={19} style={{ marginTop: 16, lineHeight: 1.65, opacity: p3 }}>
              Most retail banks surveyed had disclosure in place but no detection
              mechanism for generated content — the gap that closes in December.
              <Cite n={3} />
            </Text>

            {/* the sources strip that sits above the composer */}
            <div
              style={{
                marginTop: 24,
                border: `1px solid ${c.border}`,
                borderRadius: 9,
                background: c.card,
                opacity: panel,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 14px",
                }}
              >
                <span style={{ color: c.mutedFg, fontSize: 15, transform: "rotate(90deg)" }}>
                  ›
                </span>
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: c.mutedFg,
                  }}
                >
                  Sources · 4
                </span>
              </div>
              <div style={{ borderTop: `1px solid ${c.border}`, padding: "5px 0" }}>
                {SOURCES.map(([n, title, host], i) => (
                  <div
                    key={n}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                      padding: "7px 14px",
                      opacity: rows[i],
                    }}
                  >
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: 15,
                        fontWeight: 600,
                        color: c.amber600,
                      }}
                    >
                      {n}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 17, flex: 1 }}>
                      {title}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 15, color: c.mutedFg }}>
                      {host}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};


/* ── the prerequisite · turn the capability on ──────────────────── */

/**
 * CONFIG → Capabilities. Titles, commands and descriptions are verbatim from
 * the card list in
 * surogate-ops/frontend/src/features/work/work-agent-settings-page.tsx —
 * these are toggles with real copy, not a menu worth paraphrasing.
 *
 * The three below the one being switched on are the subjects of the next three
 * tutorials, which is why they are the three shown.
 */
const CAPABILITIES: {
  title: string;
  cmd: string;
  body: string;
  on: boolean;
}[] = [
  {
    title: "Deep research workflow",
    cmd: "/deep-research",
    body: "A planner + writer sub-agent that researches a topic across the web and produces a cited markdown report.",
    on: true,
  },
  {
    title: "Research missions",
    cmd: "/auto-research",
    body: "An autonomous optimization run that grows a hypothesis tree, evaluates experiments in isolated worktrees, and merges only verified gains.",
    on: false,
  },
  {
    title: "Coding agents",
    cmd: "/code",
    body: "Surfaces the /code commands so users can run Claude Code or Codex on the workspace using their own connected plan.",
    on: false,
  },
  {
    title: "Loops",
    cmd: "/loop",
    body: "Lets users schedule recurring runs on a fixed interval or self-paced (e.g. /loop 5m /check).",
    on: false,
  },
];

export const SceneResearchCapability: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const cards = [
    useEnterAt(t(4), 10),
    useEnterAt(t(16), 10),
    useEnterAt(t(28), 10),
    useEnterAt(t(40), 10),
  ];
  const flipAt = t(66);
  const knob = Math.min(1, Math.max(0, (frame - flipAt) / 7));

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1540 }}>
          {CAPABILITIES.map((cap, i) => {
            const on = cap.on ? knob > 0.5 : false;
            return (
              <div
                key={cap.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 28,
                  border: `1px solid ${on ? c.amber : c.border}`,
                  background: on ? "#fffdf7" : c.card,
                  borderRadius: 13,
                  padding: "22px 26px",
                  marginBottom: 12,
                  opacity: cards[i],
                  transform: `translateY(${(1 - cards[i]) * 10}px)`,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                    <Heading size={23}>{cap.title}</Heading>
                    <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg }}>
                      {cap.cmd}
                    </span>
                  </div>
                  <Text size={17} muted style={{ marginTop: 8, lineHeight: 1.5 }}>
                    {cap.body}
                  </Text>
                </div>
                <div
                  style={{
                    width: 62,
                    height: 34,
                    borderRadius: 999,
                    background: on ? c.amber : "#e0dedd",
                    padding: 4,
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      background: "#fff",
                      transform: `translateX(${(cap.on ? knob : 0) * 28}px)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
