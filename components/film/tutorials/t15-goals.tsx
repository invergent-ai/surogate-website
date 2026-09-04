import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Heading, Text } from "../ui/kit";
import { Typed, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c } from "../ui/tokens";
import { useTone } from "../ui/tone";

/**
 * Tutorial 15 — Goals.
 *
 * `/goal` from `work/tools/goals.md`: the agent keeps working until a separate
 * evaluator LLM says the outcome is reached. Up to 20 iterations by default.
 *
 * The four verdicts and their consequences are the spine of the video —
 * `satisfied` and `failed` and `blocked` stop the goal, `needs_revision` turns
 * the evaluator's feedback into the next prompt. And the evaluator is
 * instructed to require **concrete evidence**: "all requirements met" is not a
 * pass, it is another iteration.
 */

const GREEN = "#059669";
const AMBER_TXT = "#d97706";
const RED = "#b42318";

/* ── step 1 · state the outcome, not the task ───────────────────── */

export const SceneGoalCommand: React.FC = () => {
  const t = useTimeScale(5);
  const cmd = useEnterAt(t(3), 10);
  const rub = useEnterAt(t(38), 10);
  const rows = [
    useEnterAt(t(50), 9),
    useEnterAt(t(58), 9),
    useEnterAt(t(66), 9),
  ];
  const note = useEnterAt(t(92), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.46 } },
          { at: t(56), over: t(80), scale: 1.02, focus: { x: 0.5, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1460} hot at={0} style={{ padding: "30px 36px 32px" }}>
            <div
              style={{
                border: `1px solid ${c.amber}`,
                background: "#fffdf7",
                borderRadius: 14,
                padding: "20px 22px",
                fontFamily: mono,
                fontSize: 20,
                lineHeight: 1.6,
                opacity: cmd,
              }}
            >
              <span style={{ color: c.amber600 }}>/goal</span>{" "}
              <Typed
                text="Fix every failing test in tests/ and report the command that passes"
                at={t(10)}
                cps={3.2}
              />

              <div style={{ marginTop: 14, opacity: rub }}>
                <span style={{ color: c.amber600, fontWeight: 600 }}>Rubric:</span>
                {[
                  "- The suite runs green",
                  "- The final response names the passing command",
                  "- No test is skipped or deleted to get there",
                ].map((line, i) => (
                  <div key={line} style={{ color: c.mutedFg, opacity: rows[i] }}>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 18,
                marginTop: 22,
                padding: "18px 24px",
                borderRadius: 12,
                border: `1px solid ${c.border}`,
                background: "#faf9f8",
                opacity: note,
              }}
            >
              <Text size={18} style={{ lineHeight: 1.55 }}>
                Write the rubric as things someone could <em>check</em>. “Try
                hard to test everything” cannot be evaluated. “The final response
                includes the passing command” can.
              </Text>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 2 · the loop it puts you in ───────────────────────────── */

type Turn = {
  at: number;
  n: number;
  said: string;
  verdict: "needs_revision" | "satisfied";
  feedback: string;
};

const TURNS: Turn[] = [
  {
    at: 4,
    n: 1,
    said: "I fixed the import error and the suite looks healthier.",
    verdict: "needs_revision",
    feedback: "No evidence. Run the suite and quote the result.",
  },
  {
    at: 44,
    n: 2,
    said: "12 passed, 2 failed — both in test_billing.py.",
    verdict: "needs_revision",
    feedback: "Two still failing. Keep going.",
  },
  {
    at: 84,
    n: 3,
    said: "14 passed, 0 failed · pytest tests/ -q",
    verdict: "satisfied",
    feedback: "Suite green, command named. Goal met.",
  },
];

export const SceneGoalLoop: React.FC = () => {
  const t = useTimeScale(8);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.97, focus: { x: 0.5, y: 0.44 } },
          { at: t(80), over: t(70), scale: 1.03, focus: { x: 0.5, y: 0.56 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1500} hot at={0} style={{ padding: "26px 32px 28px" }}>
            {TURNS.map((turn) => (
              <TurnRow key={turn.n} turn={turn} t={t} />
            ))}
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const TurnRow: React.FC<{ turn: Turn; t: (f: number) => number }> = ({
  turn,
  t,
}) => {
  const said = useEnterAt(t(turn.at), 10);
  const verdict = useEnterAt(t(turn.at + 18), 10);
  if (said === 0) return null;

  const good = turn.verdict === "satisfied";
  const tone = good ? GREEN : AMBER_TXT;

  return (
    <div style={{ marginBottom: 16, opacity: said }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <span style={{ fontFamily: mono, fontSize: 16, color: c.mutedFg, width: 90 }}>
          turn {turn.n}
        </span>
        <Text size={19} style={{ flex: 1 }}>
          {turn.said}
        </Text>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 10,
          marginLeft: 106,
          padding: "12px 18px",
          borderRadius: 10,
          border: `1px solid ${tone}40`,
          background: `${tone}12`,
          opacity: verdict,
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: tone,
          }}
        >
          {turn.verdict}
        </span>
        <Text size={17} muted>
          {turn.feedback}
        </Text>
      </div>
    </div>
  );
};

/* ── step 3 · the four verdicts ─────────────────────────────────── */

const VERDICTS: [string, string, string, string][] = [
  ["satisfied", GREEN, "Stops", "The rubric is met — with concrete evidence."],
  ["needs_revision", AMBER_TXT, "Continues", "The feedback becomes the next prompt."],
  ["blocked", RED, "Stops", "It needs something from outside it cannot get."],
  ["failed", RED, "Stops", "The rubric cannot be reached."],
];

export const SceneGoalVerdicts: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const e = [
    useEnterAt(t(4), 11),
    useEnterAt(t(18), 11),
    useEnterAt(t(32), 11),
    useEnterAt(t(46), 11),
  ];
  const note = useEnterAt(t(74), 12);
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1480 }}>
          {VERDICTS.map(([name, tone, what, body], i) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 26,
                padding: "20px 28px",
                marginBottom: 11,
                borderRadius: 14,
                background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${tone}40`,
                opacity: e[i],
                transform: `translateY(${(1 - e[i]) * 10}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: tone,
                  width: 250,
                }}
              >
                {name}
              </span>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 22,
                  fontWeight: 600,
                  color: ink,
                  width: 140,
                }}
              >
                {what}
              </span>
              <span style={{ fontFamily: sans, fontSize: 19, color: dim, flex: 1 }}>
                {body}
              </span>
            </div>
          ))}

          <div
            style={{
              marginTop: 20,
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
            The evaluator has to see evidence — a file, an output line, a test
            result. “All requirements met” is not a pass, it is another turn.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · when not to reach for it ──────────────────────────── */

export const SceneGoalWhenNot: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const a = useEnterAt(t(4), 12);
  const b = useEnterAt(t(30), 12);
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 22, width: 1500 }}>
          {[
            {
              sign: "✓",
              tone: GREEN,
              head: "Reach for it when",
              rows: [
                "There is a finish line someone could check",
                "You are happy for it to keep going alone",
                "The work is longer than one answer",
              ],
              e: a,
            },
            {
              sign: "✕",
              tone: RED,
              head: "Skip it when",
              rows: [
                "It is a one-shot question",
                "You are brainstorming — nothing to evaluate",
                "You want to steer every turn yourself",
              ],
              e: b,
            },
          ].map((card) => (
            <div
              key={card.head}
              style={{
                flex: 1,
                padding: "28px 30px",
                borderRadius: 16,
                background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${card.tone}40`,
                opacity: card.e,
                transform: `translateY(${(1 - card.e) * 12}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 999,
                    background: `${card.tone}1f`,
                    color: card.tone,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: sans,
                    fontSize: 21,
                    fontWeight: 700,
                  }}
                >
                  {card.sign}
                </span>
                <span style={{ fontFamily: sans, fontSize: 27, fontWeight: 600, color: ink }}>
                  {card.head}
                </span>
              </div>
              {card.rows.map((row) => (
                <div
                  key={row}
                  style={{
                    fontFamily: sans,
                    fontSize: 19,
                    color: dim,
                    marginTop: 16,
                    lineHeight: 1.45,
                  }}
                >
                  {row}
                </div>
              ))}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
