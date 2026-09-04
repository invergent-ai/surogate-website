import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Heading, Text } from "../ui/kit";
import { Typed, useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 06 — Hand it a mission.
 *
 * Sources: `work-missions.png` for the page shell and its empty state (which
 * names the entry point: "Start one with /goal or /mission in any chat"), and
 * surogates/sdk/agent-chat-react/src/components/missions/* for the dashboard —
 * the hero card's status pill and iteration counter, the tab bar with its count
 * badges, and the tasks rail grouped Running / Blocked / Queued / Done.
 *
 * Status colours are the component's: running reads primary, done emerald,
 * blocked amber, failed destructive.
 */

const RUNNING = "#1d4ed8";
const DONE = "#059669";
const BLOCKED = "#d97706";

/* ── step 1 · start one from a chat ─────────────────────────────── */

export const SceneMissionStart: React.FC = () => {
  const t = useTimeScale(5);
  const shell = useEnterAt(t(3), 10);
  const menu = useEnterAt(t(34), 10);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1180} hot at={0} style={{ padding: "34px 40px 32px", opacity: shell }}>
          <Text size={17} muted style={{ marginBottom: 20 }}>
            Any chat with your agent
          </Text>

          <div
            style={{
              border: `1px solid ${c.border}`,
              borderRadius: 18,
              padding: "22px 24px 18px",
            }}
          >
            <div style={{ fontFamily: sans, fontSize: 24, color: c.foreground, minHeight: 34 }}>
              <Typed
                text="/mission plan our team offsite in Lisbon"
                at={t(10)}
                cps={2.6}
              />
            </div>
          </div>

          {/* the slash-command menu the composer shows */}
          <div
            style={{
              marginTop: 16,
              border: `1px solid ${c.border}`,
              borderRadius: 14,
              overflow: "hidden",
              opacity: menu,
              transform: `translateY(${(1 - menu) * 8}px)`,
            }}
          >
            {[
              ["/mission", "Run a long goal with tasks and workers", true],
              ["/goal", "Track an outcome the agent works toward", false],
            ].map(([cmd, desc, active]) => (
              <div
                key={cmd as string}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "16px 20px",
                  background: active ? "#fffdf7" : c.card,
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 19,
                    fontWeight: 500,
                    color: active ? c.amber600 : c.foreground,
                    width: 130,
                  }}
                >
                  {cmd as string}
                </span>
                <Text size={17} muted>
                  {desc as string}
                </Text>
              </div>
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · the mission dashboard ─────────────────────────────── */

const TABS: [string, number | null][] = [
  ["Research", 6],
  ["Tasks", 7],
  ["Activity", 41],
  ["Workers", 3],
  ["Metadata", null],
];

export const SceneMissionDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const hero = useEnterAt(t(3), 10);
  const tabs = useEnterAt(t(20), 10);
  const body = useEnterAt(t(32), 10);

  // The iteration counter ticks while the shot runs.
  const iter = frame >= t(96) ? 4 : frame >= t(62) ? 3 : 2;

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1480} hot at={0} style={{ padding: "30px 36px 32px" }}>
          {/* hero card */}
          <div style={{ opacity: hero }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span
                style={{
                  border: `1px solid ${RUNNING}4d`,
                  background: `${RUNNING}1a`,
                  color: RUNNING,
                  borderRadius: 8,
                  padding: "5px 11px",
                  fontFamily: mono,
                  fontSize: 15,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                active
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: 34,
                    fontWeight: 700,
                    color: c.foreground,
                  }}
                >
                  {iter}
                </span>
                <span style={{ fontFamily: sans, fontSize: 19, color: c.mutedFg }}>
                  / 12
                </span>
                <span
                  style={{
                    marginLeft: 6,
                    fontFamily: sans,
                    fontSize: 14,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: c.mutedFg,
                  }}
                >
                  iterations
                </span>
              </div>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: 9,
                  padding: "9px 18px",
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Pause
              </div>
            </div>

            <Heading size={26} style={{ marginTop: 18 }}>
              Plan our team offsite in Lisbon
            </Heading>
          </div>

          {/* tab bar */}
          <div
            style={{
              display: "flex",
              gap: 30,
              borderBottom: `1px solid ${c.border}`,
              marginTop: 24,
              paddingBottom: 12,
              opacity: tabs,
            }}
          >
            {TABS.map(([label, n], i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  fontFamily: sans,
                  fontSize: 18,
                  fontWeight: i === 1 ? 600 : 400,
                  color: i === 1 ? c.foreground : c.mutedFg,
                }}
              >
                {label}
                {n !== null ? (
                  <span
                    style={{
                      background: "#f0efee",
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontSize: 14,
                      color: c.mutedFg,
                    }}
                  >
                    {n}
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          {/* tasks rail */}
          <div style={{ display: "flex", gap: 28, marginTop: 20, opacity: body }}>
            <div style={{ width: 470 }}>
              <RailGroup
                label="Running"
                color={RUNNING}
                tasks={["Compare three venues on price and space"]}
              />
              <RailGroup
                label="Blocked"
                color={BLOCKED}
                tasks={["Waiting on everyone to confirm dates"]}
              />
              <RailGroup
                label="Queued"
                color={c.mutedFg}
                tasks={["Draft the three-day agenda", "Price flights from each office"]}
              />
              <RailGroup
                label="Done"
                color={DONE}
                tasks={["Shortlist venues within budget", "Check the calendar for clashes"]}
              />
            </div>

            {/* detail */}
            <div style={{ flex: 1, borderLeft: `1px solid ${c.border}`, paddingLeft: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    border: `1px solid ${RUNNING}4d`,
                    background: `${RUNNING}1a`,
                    color: RUNNING,
                    borderRadius: 7,
                    padding: "4px 11px",
                    fontFamily: sans,
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  running
                </span>
                <Text size={16} muted>
                  worker 2 of 3
                </Text>
              </div>
              <Text size={22} weight={600} style={{ marginTop: 14 }}>
                Compare three venues on price and space
              </Text>
              <Text size={17} muted style={{ marginTop: 12, lineHeight: 1.6 }}>
                Pulling rates for the dates that work, checking each one fits
                eighteen people for three days, and noting what is walkable
                from each.
              </Text>
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const RailGroup: React.FC<{
  label: string;
  color: string;
  tasks: string[];
}> = ({ label, color, tasks }) => (
  <div style={{ marginBottom: 16 }}>
    <Text
      size={14}
      muted
      style={{ textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}
    >
      {label}
    </Text>
    {tasks.map((task) => (
      <div
        key={task}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          border: `1px solid ${c.border}`,
          borderRadius: 9,
          padding: "11px 14px",
          marginBottom: 7,
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: 999,
            background: color,
            flexShrink: 0,
          }}
        />
        <Text size={17}>{task}</Text>
      </div>
    ))}
  </div>
);

/* ── step 3 · it splits the work across workers ─────────────────── */

const WORKERS: [string, string, string][] = [
  ["worker-1", "Shortlist venues within budget", "done"],
  ["worker-2", "Compare three venues on price and space", "running"],
  ["worker-3", "Draft the three-day agenda", "queued"],
];

export const SceneMissionWorkers: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const rows = [
    useEnterAt(t(16), 10),
    useEnterAt(t(30), 10),
    useEnterAt(t(44), 10),
  ];
  const note = useEnterAt(t(66), 12);

  const tone = (s: string) =>
    s === "done" ? DONE : s === "running" ? RUNNING : c.mutedFg;

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1300} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              opacity: head,
            }}
          >
            <Heading size={26}>Workers</Heading>
            <span
              style={{
                background: "#f0efee",
                borderRadius: 6,
                padding: "3px 10px",
                fontFamily: sans,
                fontSize: 15,
                color: c.mutedFg,
              }}
            >
              3
            </span>
          </div>

          {WORKERS.map(([name, task, status], i) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                padding: "18px 22px",
                marginBottom: 12,
                opacity: rows[i],
                transform: `translateY(${(1 - rows[i]) * 8}px)`,
              }}
            >
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 999,
                  background: tone(status),
                  flexShrink: 0,
                }}
              />
              <span style={{ fontFamily: mono, fontSize: 18, color: c.mutedFg, width: 130 }}>
                {name}
              </span>
              <Text size={20} style={{ flex: 1 }}>
                {task}
              </Text>
              <span
                style={{
                  border: `1px solid ${tone(status)}4d`,
                  background: `${tone(status)}1a`,
                  color: tone(status),
                  borderRadius: 7,
                  padding: "5px 13px",
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {status}
              </span>
            </div>
          ))}

          <Text size={17} muted style={{ marginTop: 18, opacity: note }}>
            Each worker is its own agent run, with its own session you can open
            and read.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · it comes back when it needs you ───────────────────── */

export const SceneMissionInbox: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const card = useEnterAt(t(18), 10);
  const actions = useEnterAt(t(44), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1300} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", opacity: head }}>
            <div style={{ flex: 1 }}>
              <Heading size={28}>Inbox</Heading>
              <Text size={17} muted style={{ marginTop: 7 }}>
                Questions and actions your agents need from you
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                background: "#f0efee",
                borderRadius: 9,
                padding: 4,
                fontFamily: sans,
                fontSize: 16,
              }}
            >
              {["Active", "Updates", "History"].map((tab, i) => (
                <span
                  key={tab}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 7,
                    background: i === 0 ? c.card : "transparent",
                    fontWeight: i === 0 ? 500 : 400,
                    color: i === 0 ? c.foreground : c.mutedFg,
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              border: `1px solid ${c.amber}`,
              background: "#fffdf7",
              borderRadius: 13,
              padding: "24px 26px",
              marginTop: 26,
              opacity: card,
              transform: `translateY(${(1 - card) * 10}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Text size={16} weight={500} style={{ color: c.amber600 }}>
                Plan our team offsite in Lisbon
              </Text>
              <Text size={16} muted>
                · worker-2 · 4m ago
              </Text>
            </div>
            <Text size={23} weight={600} style={{ marginTop: 14, lineHeight: 1.45 }}>
              Two venues fit the budget — one has the better rooms, the other is
              five minutes from the beach. Which should I book?
            </Text>

            <div style={{ display: "flex", gap: 12, marginTop: 22, opacity: actions }}>
              {["Better rooms", "Nearer the beach", "Let me type an answer"].map((label, i) => (
                <div
                  key={label}
                  style={{
                    borderRadius: radius,
                    padding: "12px 20px",
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: i < 2 ? 600 : 500,
                    background: i < 2 ? c.amber : "transparent",
                    color: i < 2 ? "#000" : c.mutedFg,
                    border: i < 2 ? "none" : `1px solid ${c.border}`,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          <Text size={17} muted style={{ marginTop: 22, opacity: actions }}>
            Answer it and the mission carries on where it stopped.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 5 · it finishes ───────────────────────────────────────── */

/**
 * A mission does not end when its tasks run out — it ends when a judge decides
 * the rubric is met. The terminal status is `satisfied` (emerald), and the hero
 * card carries the verdict beside it. `AgentChatMissionStatus` in the SDK's
 * types.ts is the authority: active · paused · satisfied · blocked · failed ·
 * cancelled · max_iterations_reached.
 */
const SATISFIED = "#059669";

const FINISHED: string[] = [
  "Shortlist venues within budget",
  "Check the calendar for clashes",
  "Compare three venues on price and space",
  "Draft the three-day agenda",
  "Price flights from each office",
];

export const SceneMissionDone: React.FC = () => {
  const t = useTimeScale(5);
  const hero = useEnterAt(t(3), 10);
  const verdict = useEnterAt(t(22), 12);
  const rows = [
    useEnterAt(t(38), 8),
    useEnterAt(t(46), 8),
    useEnterAt(t(54), 8),
    useEnterAt(t(62), 8),
    useEnterAt(t(70), 8),
  ];

  return (
    <Stage glow={{ x: 0.5, y: 0.43 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1380} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: hero }}>
            <span
              style={{
                border: `1px solid ${SATISFIED}66`,
                background: `${SATISFIED}1a`,
                color: SATISFIED,
                borderRadius: 8,
                padding: "5px 12px",
                fontFamily: mono,
                fontSize: 15,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              satisfied
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: sans, fontSize: 34, fontWeight: 700 }}>5</span>
              <span style={{ fontFamily: sans, fontSize: 19, color: c.mutedFg }}>/ 12</span>
              <span
                style={{
                  marginLeft: 6,
                  fontFamily: sans,
                  fontSize: 14,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: c.mutedFg,
                }}
              >
                iterations
              </span>
            </div>
          </div>

          <Heading size={26} style={{ marginTop: 16, opacity: hero }}>
            Plan our team offsite in Lisbon
          </Heading>

          {/* the rubric it was judged against, and the verdict */}
          <div
            style={{
              border: `1px solid ${SATISFIED}40`,
              background: `${SATISFIED}0d`,
              borderRadius: 13,
              padding: "20px 24px",
              marginTop: 22,
              opacity: verdict,
              transform: `translateY(${(1 - verdict) * 10}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Text size={15} muted>
                last verdict
              </Text>
              <span
                style={{
                  border: `1px solid ${SATISFIED}66`,
                  background: `${SATISFIED}1a`,
                  color: SATISFIED,
                  borderRadius: 6,
                  padding: "3px 10px",
                  fontFamily: mono,
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                satisfied
              </span>
            </div>
            <Text size={20} style={{ marginTop: 12, lineHeight: 1.55 }}>
              Casa do Mar booked for eighteen people, 14–16 May. Flights priced
              from all three offices, and the agenda is in #general.
            </Text>
          </div>

          {/* every task, done */}
          <div style={{ marginTop: 22 }}>
            {FINISHED.map((task, i) => (
              <div
                key={task}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "10px 0",
                  opacity: rows[i],
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 999,
                    border: `1.5px solid ${SATISFIED}73`,
                    background: `${SATISFIED}1f`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={SATISFIED} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <Text size={19} muted>
                  {task}
                </Text>
              </div>
            ))}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};
