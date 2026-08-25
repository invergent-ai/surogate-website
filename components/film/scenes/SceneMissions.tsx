import React from "react";
import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * Missions.
 *
 * Rebuilt from the mission dashboard. The earlier version invented a checklist
 * of "success criteria" ticking off, which is not what the product does: a
 * mission is a goal plus a *rubric*, run in iterations, and each iteration ends
 * in a verdict from a judge. The tasks are a dependency graph worked by
 * sub-agents, not a checklist.
 *
 * The beat keeps only what carries that idea: status, iteration count, last
 * verdict, the goal, the rubric, and the tasks grouped by state. The tabs and
 * the task detail pane are real, and they were in an earlier cut — but at seven
 * seconds nobody reads a detail pane, and the screen stopped saying one thing.
 *
 * The event is an iteration completing: the counter ticks and the verdict flips.
 */

const DESCRIPTION =
  "Publish three launch-week posts in the brand voice, scheduled and approved by a human.";

const RUBRIC =
  "Three posts exist and are scheduled. Each cites a knowledge-base source by title. No superlative without a benchmark behind it. A human approved every post before it published.";

/**
 * The work, as a set of statuses that change over the beat.
 *
 * The rail is derived from these rather than hard-coded per group, so a task
 * moving from Queued to Running to Done is one status change and the layout
 * follows. Steps promote and complete together, which is also what the
 * orchestrator does — and it keeps every group non-empty, since the real rail
 * hides a group with no tasks in it.
 */
type Status = "running" | "ready" | "done";

const ORDER: Status[] = ["running", "ready", "done"];
const LABEL: Record<Status, string> = {
  running: "Running",
  ready: "Queued",
  done: "Done",
};
const DOT: Record<Status, string> = {
  running: "#f59e0b",
  ready: "#aba09c",
  done: "#22c55e",
};

const TASKS: { id: string; title: string; init: Status }[] = [
  { id: "e91b7c40", title: "Pull positioning from the knowledge base", init: "done" },
  { id: "1f60d2a8", title: "Draft three posts in the brand voice", init: "running" },
  { id: "5a3e8b19", title: "Check every claim against the pricing page", init: "ready" },
  { id: "b41c9e02", title: "Schedule the approved posts", init: "ready" },
  { id: "7d2a1f55", title: "Request approval in #launch-q3", init: "ready" },
];

const STEPS: { at: number; changes: Record<string, Status> }[] = [
  { at: 42, changes: { "1f60d2a8": "done", "5a3e8b19": "running" } },
  { at: 84, changes: { "5a3e8b19": "done", "b41c9e02": "running" } },
];

/** Row and header metrics — the layout is arithmetic, so nothing measures. */
const HEAD = 32;
const ROW = 46;
const GAP = 12;
/** Frames a promotion takes to travel. */
const MOVE = 16;

const statusesAfter = (steps: number): Record<string, Status> => {
  const out: Record<string, Status> = {};
  for (const task of TASKS) out[task.id] = task.init;
  for (let i = 0; i < steps; i++) {
    for (const [id, next] of Object.entries(STEPS[i].changes)) out[id] = next;
  }
  return out;
};

/** Where every row and header sits for a given set of statuses. */
const layoutFor = (statuses: Record<string, Status>) => {
  const rows: Record<string, number> = {};
  const heads: Record<string, { y: number; count: number }> = {};
  let y = 0;
  for (const group of ORDER) {
    const inGroup = TASKS.filter((task) => statuses[task.id] === group);
    heads[group] = { y, count: inGroup.length };
    y += HEAD;
    for (const task of inGroup) {
      rows[task.id] = y;
      y += ROW;
    }
    y += GAP;
  }
  return { rows, heads, height: y };
};

const AUTHORED = 6;
/** An iteration completes here: the counter ticks and the verdict flips. */
const TICK_AT = 116;

export const SceneMissions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const ticked = frame >= t(TICK_AT);
  const iteration = ticked ? 4 : 3;
  const verdict = ticked ? "SATISFIED" : "REVISE";
  const pct = (iteration / 8) * 100;

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.9, focus: { x: 0.5, y: 0.5 } },
          { at: t(14), over: t(40), scale: 0.97, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1080} hot at={0} style={{ padding: "22px 26px 24px" }}>
            {/* ── hero card ─────────────────────────────────────── */}
            <div
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 14,
                padding: "16px 22px 18px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: ticked ? c.green700 : c.amber600,
                    background: ticked ? c.green50 : c.amber50,
                    border: `1px solid ${ticked ? "rgba(34,197,94,0.4)" : "rgba(245,158,11,0.4)"}`,
                    borderRadius: 7,
                    padding: "5px 10px",
                  }}
                >
                  {ticked ? "satisfied" : "active"}
                </span>

                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: sans,
                      fontSize: 30,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {iteration}
                  </span>
                  <Text size={17} muted>
                    / 8
                  </Text>
                  <span
                    style={{
                      fontFamily: sans,
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: c.mutedFg,
                      marginLeft: 4,
                    }}
                  >
                    iterations
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <Text size={14} muted>
                    last verdict
                  </Text>
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      color: ticked ? c.green700 : c.amber600,
                      background: ticked ? c.green50 : c.amber50,
                      border: `1px solid ${ticked ? "rgba(34,197,94,0.35)" : "rgba(245,158,11,0.35)"}`,
                      borderRadius: 5,
                      padding: "4px 9px",
                    }}
                  >
                    {verdict}
                  </span>
                </div>

                <span style={{ flex: 1 }} />
                <Btn>⏸ Pause</Btn>
                <Btn tone="bad">⃠ Cancel</Btn>
              </div>

              <div
                style={{
                  height: 4,
                  borderRadius: 999,
                  background: c.muted,
                  marginTop: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: ticked ? c.success : c.amber,
                  }}
                />
              </div>

              <div
                style={{
                  fontFamily: sans,
                  fontSize: 20,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  marginTop: 16,
                }}
              >
                {DESCRIPTION}
              </div>

              <div
                style={{
                  border: `1px solid ${c.border}`,
                  background: c.sidebar,
                  borderRadius: radius,
                  padding: "12px 16px",
                  marginTop: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: c.mutedFg,
                  }}
                >
                  Rubric
                </div>
                <Text size={16} style={{ marginTop: 5, lineHeight: 1.5 }}>
                  {RUBRIC}
                </Text>
              </div>
            </div>

            {/* ── tasks ─────────────────────────────────────────── */}
            <Rail t={t} />
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Btn: React.FC<{ children: React.ReactNode; tone?: "bad" }> = ({
  children,
  tone,
}) => (
  <span
    style={{
      fontFamily: sans,
      fontSize: 15,
      fontWeight: 500,
      color: tone ? "#b91c1c" : c.foreground,
      background: tone ? "#fef2f2" : c.card,
      border: `1px solid ${tone ? "#fecaca" : c.border}`,
      borderRadius: radius - 3,
      padding: "8px 15px",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

/**
 * The task rail.
 *
 * Rows are positioned absolutely from arithmetic rather than stacked, so a task
 * changing status *moves* — the layout is computed for the state before the
 * promotion and the state after it, and every row travels between the two.
 */
const Rail: React.FC<{ t: (f: number) => number }> = ({ t }) => {
  const frame = useCurrentFrame();

  const fired = STEPS.filter((step) => frame >= t(step.at)).length;
  const after = layoutFor(statusesAfter(fired));
  const before = fired === 0 ? after : layoutFor(statusesAfter(fired - 1));
  const statuses = statusesAfter(fired);
  const prevStatuses = fired === 0 ? statuses : statusesAfter(fired - 1);

  const p =
    fired === 0
      ? 1
      : interpolate(frame, [t(STEPS[fired - 1].at), t(STEPS[fired - 1].at + MOVE)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const at = (a: number, b: number) => a + (b - a) * eased;

  return (
    <div style={{ position: "relative", height: after.height, marginTop: 20 }}>
      {ORDER.map((group) => (
        <div
          key={group}
          style={{
            position: "absolute",
            top: at(before.heads[group].y, after.heads[group].y),
            left: 0,
            fontFamily: mono,
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: c.mutedFg,
          }}
        >
          {LABEL[group]} (
          {eased < 0.5 ? before.heads[group].count : after.heads[group].count})
        </div>
      ))}

      {TASKS.map((task, i) => (
        <TaskChip
          key={task.id}
          task={task}
          y={at(before.rows[task.id], after.rows[task.id])}
          from={prevStatuses[task.id]}
          to={statuses[task.id]}
          eased={eased}
          at={t(6 + i * 4)}
        />
      ))}
    </div>
  );
};

const TaskChip: React.FC<{
  task: { title: string; id: string };
  y: number;
  from: Status;
  to: Status;
  eased: number;
  at: number;
}> = ({ task, y, from, to, eased, at }) => {
  const s = useSpringAt(at);
  const dot = interpolateColors(eased, [0, 1], [DOT[from], DOT[to]]);
  // A row in flight is lifted off the rail: it passes over the settled ones
  // rather than colliding with them.
  const flight = from === to ? 0 : Math.sin(eased * Math.PI);
  // The running task carries the amber ring, and the ring travels with it.
  const hot = (to === "running" ? eased : 0) + (from === "running" ? 1 - eased : 0);

  return (
    <div
      style={{
        position: "absolute",
        top: y + interpolate(s, [0, 1], [10, 0]),
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: ROW - 8,
        boxSizing: "border-box",
        border: `1px solid ${interpolateColors(hot, [0, 1], [c.border, c.amber])}`,
        background: interpolateColors(hot, [0, 1], [c.card, c.amber50]),
        borderRadius: 999,
        padding: "0 14px",
        opacity: s,
        zIndex: flight > 0 ? 2 : 1,
        boxShadow: flight > 0 ? `0 ${6 * flight}px ${18 * flight}px rgba(0,0,0,0.14)` : undefined,
        transform: `scale(${1 + flight * 0.02})`,
      }}
    >
      <div style={{ width: 7, height: 7, borderRadius: 999, background: dot, flexShrink: 0 }} />
      <span
        style={{
          fontFamily: sans,
          fontSize: 16,
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {task.title}
      </span>
      <span style={{ fontFamily: mono, fontSize: 12, color: c.mutedFg }}>{task.id}</span>
    </div>
  );
};
