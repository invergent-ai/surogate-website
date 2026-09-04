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
 * Tutorial 13 — Loops.
 *
 * `/loop` from `work/tools/scheduled-work.md`, plus
 * `work-scheduled-work.png` for the page shell (an ACTIVE / HISTORY toggle over
 * a NAME · INTERVAL · NEXT RUN · EXPIRES · STATUS table).
 *
 * Two facts the video has to carry because they surprise people: the cadence
 * you type is *snapped* to one that divides evenly into an hour, and schedules
 * expire on their own — 3 days for fixed, 7 for dynamic.
 */

/* ── step 1 · three ways to say when ────────────────────────────── */

const FORMS: [string, string][] = [
  ["/loop 5m /babysit-prs", "Interval first — every five minutes, run a skill."],
  ["/loop check deploys every 20m", "Or trailing, if that reads better."],
  ["/loop check queue health", "No interval at all — the agent picks its own delay."],
];

export const SceneLoopSyntax: React.FC = () => {
  const t = useTimeScale(5);
  const rows = [useEnterAt(t(4), 10), useEnterAt(t(30), 10), useEnterAt(t(56), 10)];
  const note = useEnterAt(t(84), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1440} hot at={0} style={{ padding: "32px 36px 34px" }}>
          {FORMS.map(([cmd, body], i) => (
            <div
              key={cmd}
              style={{
                marginBottom: 20,
                opacity: rows[i],
                transform: `translateY(${(1 - rows[i]) * 8}px)`,
              }}
            >
              <div
                style={{
                  border: `1px solid ${i === 2 ? c.amber : c.border}`,
                  background: i === 2 ? "#fffdf7" : "#faf9f8",
                  borderRadius: 11,
                  padding: "15px 19px",
                  fontFamily: mono,
                  fontSize: 20,
                }}
              >
                <span style={{ color: c.amber600 }}>/loop</span>
                {cmd.replace("/loop", "")}
              </div>
              <Text size={17} muted style={{ marginTop: 9 }}>
                {body}
              </Text>
            </div>
          ))}

          <Text size={17} muted style={{ marginTop: 4, opacity: note }}>
            A loop outlives the chat, so it needs an owner — a signed-in user or
            a service account. Anonymous visitors are refused.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · the cadence you get ───────────────────────────────── */

/**
 * "Under an hour, snapped to the nearest cadence that divides evenly into an
 * hour… so 7m becomes every 6 minutes and 50m becomes hourly." The confirmation
 * says so — "Requested cadence: …; using …" — and the doc tells you to check it.
 */
const SNAPS: [string, string, boolean][] = [
  ["30s", "every 1 minute", true],
  ["5m", "every 5 minutes", false],
  ["7m", "every 6 minutes", true],
  ["50m", "hourly", true],
  ["90m", "every 2 hours", true],
];

export const SceneLoopCadence: React.FC = () => {
  const light = useTone() === "light";
  const t = useTimeScale(5);
  const rows = [
    useEnterAt(t(6), 9),
    useEnterAt(t(16), 9),
    useEnterAt(t(26), 9),
    useEnterAt(t(36), 9),
    useEnterAt(t(46), 9),
  ];
  const note = useEnterAt(t(72), 12);
  const ink = light ? c.foreground : "#fff";
  const dim = light ? c.mutedFg : "rgba(255,255,255,0.6)";

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1300 }}>
          {SNAPS.map(([asked, got, moved], i) => (
            <div
              key={asked}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "18px 26px",
                marginBottom: 10,
                borderRadius: 13,
                background: light ? "rgba(12,10,9,0.03)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${moved ? `${c.amber}59` : light ? "rgba(12,10,9,0.08)" : "rgba(255,255,255,0.10)"}`,
                opacity: rows[i],
                transform: `translateY(${(1 - rows[i]) * 10}px)`,
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 26, color: ink, width: 110 }}>
                {asked}
              </span>
              <span style={{ fontSize: 22, color: dim }}>→</span>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 24,
                  fontWeight: moved ? 600 : 400,
                  color: moved ? c.amber : dim,
                  flex: 1,
                }}
              >
                {got}
              </span>
              {moved ? (
                <span style={{ fontFamily: sans, fontSize: 16, color: dim }}>
                  adjusted
                </span>
              ) : null}
            </div>
          ))}

          <div
            style={{
              marginTop: 22,
              padding: "18px 26px",
              borderRadius: 13,
              border: `1px solid ${c.amber}59`,
              background: `${c.amber}14`,
              fontFamily: sans,
              fontSize: 19,
              color: ink,
              opacity: note,
            }}
          >
            Under an hour a loop snaps to a cadence that divides evenly into one.
            The confirmation tells you what you actually got — read it.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · the schedules page ────────────────────────────────── */

const SCHEDULES: [string, string, string, string][] = [
  ["Babysit open PRs", "every 5 minutes", "in 2m", "Active"],
  ["Morning revenue digest", "daily", "tomorrow 07:00", "Active"],
  ["Check queue health", "Dynamic", "~ in 18m", "Active"],
  ["Weekly churn summary", "weekly", "Mon 09:00", "Paused"],
];

export const SceneLoopPage: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const cols = useEnterAt(t(12), 10);
  const rows = [
    useEnterAt(t(22), 9),
    useEnterAt(t(32), 9),
    useEnterAt(t(42), 9),
    useEnterAt(t(52), 9),
  ];
  const foot = useEnterAt(t(78), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.96, focus: { x: 0.5, y: 0.46 } },
          { at: t(60), over: t(80), scale: 1.02, focus: { x: 0.5, y: 0.55 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1560} hot at={0} style={{ padding: "30px 36px 32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", opacity: head }}>
              <div style={{ flex: 1 }}>
                <Heading size={28}>Scheduled work</Heading>
                <Text size={17} muted style={{ marginTop: 7 }}>
                  Recurring work your agents run on a schedule —{" "}
                  <span style={{ fontFamily: mono }}>/loop</span>
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
                {["Active", "History"].map((tab, i) => (
                  <span
                    key={tab}
                    style={{
                      padding: "9px 18px",
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
                display: "flex",
                borderBottom: `1px solid ${c.border}`,
                padding: "22px 8px 12px",
                opacity: cols,
              }}
            >
              {[["NAME", 1], ["INTERVAL", 0], ["NEXT RUN", 0], ["STATUS", 0]].map(
                ([label, grow]) => (
                  <span
                    key={label as string}
                    style={{
                      flex: grow ? 1 : "0 0 250px",
                      fontFamily: sans,
                      fontSize: 14,
                      letterSpacing: "0.1em",
                      color: c.mutedFg,
                    }}
                  >
                    {label as string}
                  </span>
                ),
              )}
            </div>

            {SCHEDULES.map(([name, interval, next, status], i) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: `1px solid ${c.border}`,
                  padding: "17px 8px",
                  opacity: rows[i],
                }}
              >
                <span style={{ flex: 1, fontFamily: sans, fontSize: 19, fontWeight: 500 }}>
                  {name}
                </span>
                <span
                  style={{
                    flex: "0 0 250px",
                    fontFamily: sans,
                    fontSize: 17,
                    color: interval === "Dynamic" ? c.amber600 : c.mutedFg,
                    fontWeight: interval === "Dynamic" ? 500 : 400,
                  }}
                >
                  {interval}
                </span>
                <span style={{ flex: "0 0 250px", fontFamily: sans, fontSize: 17, color: c.mutedFg }}>
                  {next}
                </span>
                <span style={{ flex: "0 0 250px" }}>
                  <span
                    style={{
                      background: status === "Active" ? "#d9f5e6" : "#f0efee",
                      color: status === "Active" ? "#14855c" : c.mutedFg,
                      borderRadius: 999,
                      padding: "6px 15px",
                      fontFamily: sans,
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {status}
                  </span>
                </span>
              </div>
            ))}

            <Text size={16} muted style={{ marginTop: 18, opacity: foot }}>
              Fixed-interval schedules expire after 3 days; dynamic
              (agent-picked) schedules after 7. Cancel anytime.
            </Text>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── step 4 · what a tick actually does ─────────────────────────── */

export const SceneLoopTick: React.FC = () => {
  const t = useTimeScale(5);
  const ask = useEnterAt(t(3), 10);
  const t1 = useEnterAt(t(24), 10);
  const t2 = useEnterAt(t(46), 10);
  const t3 = useEnterAt(t(68), 10);

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1340} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div
            style={{
              border: `1px solid ${c.amber}`,
              background: "#fffdf7",
              borderRadius: 13,
              padding: "16px 20px",
              fontFamily: mono,
              fontSize: 20,
              opacity: ask,
            }}
          >
            <span style={{ color: c.amber600 }}>/loop</span>{" "}
            <Typed text="5m /babysit-prs" at={t(10)} cps={1.8} />
          </div>

          {[
            ["09:00", "3 PRs open · 1 waiting on review since Friday", t1],
            ["09:05", "Nothing changed", t2],
            ["09:10", "PR #418 went green — pinged the reviewer", t3],
          ].map(([time, line, o]) => (
            <div
              key={time as string}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "baseline",
                borderBottom: `1px solid ${c.border}`,
                padding: "17px 4px",
                opacity: o as number,
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 17, color: c.mutedFg, width: 80 }}>
                {time as string}
              </span>
              <Text size={19} style={{ flex: 1 }}>
                {line as string}
              </Text>
            </div>
          ))}

          <Text size={17} muted style={{ marginTop: 18 }}>
            Each tick is a real run. It only comes to you when there is something
            to say.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};
