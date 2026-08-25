import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, PanelHead, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { Typed, useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * The run.
 *
 * One ask, and everything the agent reaches for to answer it: its knowledge
 * base, the open web, a real browser, and a tool on a system you already run.
 * Tool names are the harness's own (`kb_search_pages`, `web_extract`,
 * `browser_navigate`), and the elapsed times are the shape the Tools tab shows.
 *
 * The browser earns a pane rather than a line. It is the one tool where the
 * result is a thing you can watch, so it slides in beside the trace and the
 * camera pulls back to take both — a line saying `browser_navigate` would have
 * undersold the only capability here that is visibly alive.
 */

type Step = {
  at: number;
  settle: number;
  name: string;
  detail: string;
  ms: string;
  /** Sub-results that tick in one at a time, as web_extract does per URL. */
  urls?: string[];
};

const SAY_AT = 4;
const SAY = "I'll pull our positioning, check what changed, then draft the posts.";

const STEPS: Step[] = [
  {
    at: 20,
    settle: 31,
    name: "kb_search_pages",
    detail: "launch positioning · Northwind Product Docs",
    ms: "0.4s",
  },
  {
    at: 33,
    settle: 43,
    name: "kb_read_page",
    detail: "positioning/messaging-pillars",
    ms: "0.2s",
  },
  {
    at: 45,
    settle: 59,
    name: "web_search",
    detail: "LinkedIn feed algorithm changes 2026",
    ms: "1.3s",
  },
  {
    at: 61,
    settle: 83,
    name: "web_extract",
    detail: "2 URLs",
    ms: "0.6s",
    urls: ["linkedin.com/business", "socialinsider.io"],
  },
  {
    at: 86,
    settle: 102,
    name: "browser_navigate",
    detail: "linkedin.com/company/northwind",
    ms: "2.1s",
  },
  {
    at: 104,
    settle: 118,
    name: "browser_screenshot",
    detail: "viewport · 1280×800",
    ms: "0.9s",
  },
  {
    at: 122,
    settle: 136,
    name: "slack_send_message",
    detail: "#launch-q3 · draft posted for review",
    ms: "0.5s",
  },
];

/** The browser pane opens with the first browser call. */
const BROWSER_AT = 90;
const AUTHORED = 7;

export const SceneTrace: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const steps = STEPS.map((s) => ({ ...s, at: t(s.at), settle: t(s.settle) }));
  const browserAt = t(BROWSER_AT);
  const open = interpolate(frame, [browserAt, browserAt + t(14)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage glow={{ x: 0.46, y: 0.4 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 1.0, focus: { x: 0.5, y: 0.5 } },
          { at: t(18), over: t(30), scale: 1.16, focus: { x: 0.4, y: 0.56 } },
          // Pull back to take the browser as it opens.
          { at: browserAt, over: t(22), scale: 0.92, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill
          style={{ alignItems: "center", justifyContent: "center", padding: 70 }}
        >
          <Panel width={1240} hot at={0}>
            <PanelHead
              right={
                <Pill tone="success" style={{ fontSize: 14, padding: "5px 12px" }}>
                  <span style={{ fontSize: 9 }}>●</span> live
                </Pill>
              }
            >
              <Heading size={25}>Northwind Marketing</Heading>
            </PanelHead>

            <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
              <div style={{ flex: 1, padding: "24px 30px 30px", minWidth: 0 }}>
                {/* The ask. */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      background: c.secondary,
                      borderRadius: 18,
                      padding: "14px 18px",
                      fontSize: 18,
                      lineHeight: 1.45,
                      maxWidth: 620,
                    }}
                  >
                    What changed in LinkedIn's feed this year? Draft three
                    launch-week posts in our voice and put them in Slack.
                  </div>
                </div>

                {/* The receipt. */}
                <div style={{ marginTop: 24, position: "relative", paddingLeft: 30 }}>
                  <Rail last={steps[steps.length - 1].settle} />
                  <Say at={t(SAY_AT)} />
                  {steps.map((s) => (
                    <StepRow key={s.name} step={s} />
                  ))}
                </div>
              </div>

              {/* The browser, once it is driving one. */}
              {open > 0 ? (
                <div
                  style={{
                    width: 430 * open,
                    flexShrink: 0,
                    borderLeft: `1px solid ${c.border}`,
                    overflow: "hidden",
                    opacity: open,
                  }}
                >
                  <BrowserPane start={browserAt} t={t} />
                </div>
              ) : null}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Say: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div style={{ position: "relative", marginBottom: 16 }}>
      <Bullet done at={at} />
      <div style={{ fontSize: 18, lineHeight: 1.5 }}>
        <Typed text={SAY} at={at} cps={2.2} caret={false} />
      </div>
    </div>
  );
};

const Rail: React.FC<{ last: number }> = ({ last }) => {
  const frame = useCurrentFrame();
  const h = interpolate(frame, [6, last], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 6,
        top: 10,
        width: 2,
        height: `${h * 100}%`,
        background: `linear-gradient(${c.border}, ${c.amber})`,
        borderRadius: 2,
      }}
    />
  );
};

const StepRow: React.FC<{ step: Step }> = ({ step }) => {
  const frame = useCurrentFrame();
  const s = useSpringAt(step.at);
  if (frame < step.at) return null;
  const done = frame >= step.settle;

  return (
    <div
      style={{
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-8, 0])}px)`,
        marginBottom: 13,
        position: "relative",
      }}
    >
      <Bullet done={done} at={step.settle} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontFamily: mono, fontSize: 16.5 }}>{step.name}</span>
        <span style={{ fontSize: 15.5, color: c.mutedFg, flex: 1, minWidth: 0 }}>
          <Typed text={step.detail} at={step.at + 2} cps={3.2} caret={false} />
        </span>
        <span style={{ fontFamily: mono, fontSize: 14, color: c.mutedFg }}>
          {done ? step.ms : ""}
        </span>
      </div>
      {step.urls ? (
        <div style={{ marginTop: 6 }}>
          {step.urls.map((u, i) => {
            const at = step.at + 8 + i * 9;
            if (frame < at) return null;
            return (
              <div
                key={u}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  fontSize: 15,
                  color: c.mutedFg,
                  marginBottom: 3,
                }}
              >
                {u}
                <Tick on={frame >= at + 11} at={at + 11} />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

/**
 * The live pane. Not a screenshot of a site — a suggestion of one, drawn from
 * blocks, so nothing in frame is a third party's page.
 */
const BrowserPane: React.FC<{ start: number; t: (f: number) => number }> = ({
  start,
  t,
}) => {
  const frame = useCurrentFrame();
  const scroll = interpolate(frame, [start + t(22), start + t(96)], [0, -96], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shot = frame >= start + t(18) && frame < start + t(24);

  return (
    <div style={{ width: 430, height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        <span style={{ color: c.amber, fontSize: 16 }}>⚡</span>
        <Text size={16} weight={500}>
          Browser
        </Text>
        <span
          style={{
            flex: 1,
            fontFamily: mono,
            fontSize: 13,
            color: c.mutedFg,
            background: c.secondary,
            borderRadius: 999,
            padding: "5px 11px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          linkedin.com/company/northwind
        </span>
        <div style={{ width: 9, height: 9, borderRadius: 999, background: c.success }} />
      </div>

      <div style={{ flex: 1, overflow: "hidden", position: "relative", background: "#fbfaf9" }}>
        <div>
          {/* A company page in silhouette: cover, avatar, name, then posts. */}
          <div style={{ height: 78, background: "linear-gradient(120deg,#2b3a55,#3d5a80)" }} />
          <div style={{ padding: "0 20px" }}>
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 14,
                background: "#fff",
                border: "3px solid #fff",
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                marginTop: -30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: mono,
                fontSize: 22,
                color: "#3d5a80",
              }}
            >
              N
            </div>
            <div style={{ height: 13, width: "58%", background: "#d3ccc9", borderRadius: 3, marginTop: 12 }} />
            <div style={{ height: 9, width: "40%", background: "#e6e1df", borderRadius: 3, marginTop: 8 }} />
            {/* Only the feed scrolls, and it scrolls inside its own clip.
                Scrolling the whole page clipped the avatar half-off the top of
                the pane; scrolling the feed unclipped ran it over the name. */}
            <div style={{ overflow: "hidden", height: 236, marginTop: 14 }}>
            <div style={{ transform: `translateY(${scroll}px)` }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #eae5e3",
                  borderRadius: 10,
                  padding: 14,
                  marginBottom: 14,
                  background: "#fff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 999, background: "#dfd9d6" }} />
                  <div style={{ height: 8, width: 90, background: "#e6e1df", borderRadius: 3 }} />
                </div>
                <div style={{ height: 8, width: "94%", background: "#eeeae8", borderRadius: 3, marginTop: 11 }} />
                <div style={{ height: 8, width: "78%", background: "#eeeae8", borderRadius: 3, marginTop: 6 }} />
              </div>
            ))}
            </div>
            </div>
          </div>
        </div>
        {/* The screenshot tool firing, as a shutter. */}
        {shot ? (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.75)" }} />
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          borderTop: `1px solid ${c.border}`,
        }}
      >
        <span
          style={{
            fontFamily: sans,
            fontSize: 14,
            fontWeight: 600,
            background: c.primary,
            color: c.primaryFg,
            borderRadius: radius - 3,
            padding: "8px 14px",
          }}
        >
          ▽ TAKE CONTROL
        </span>
        <span style={{ fontFamily: sans, fontSize: 14, color: c.mutedFg, flex: 1 }}>
          ✕ CLOSE
        </span>
        <span style={{ fontFamily: sans, fontSize: 13, color: "#dc2626" }}>● Live</span>
      </div>
    </div>
  );
};

/** Dot that fills, with a one-shot ring when the tool returns. */
const Bullet: React.FC<{ done: boolean; at: number }> = ({ done, at }) => {
  const frame = useCurrentFrame();
  const ring = interpolate(frame, [at, at + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", left: -30, top: 5 }}>
      {done && ring < 1 ? (
        <div
          style={{
            position: "absolute",
            left: -9,
            top: -9,
            width: 30,
            height: 30,
            borderRadius: 999,
            border: `2px solid ${c.success}`,
            opacity: 1 - ring,
            transform: `scale(${0.4 + ring})`,
          }}
        />
      ) : null}
      <div
        style={{
          width: 13,
          height: 13,
          borderRadius: 999,
          background: done ? c.success : "#fff",
          border: `2px solid ${done ? c.success : c.ring}`,
          boxShadow: done ? "0 0 16px rgba(34,197,94,0.55)" : undefined,
        }}
      />
    </div>
  );
};

const Tick: React.FC<{ on: boolean; at: number }> = ({ on, at }) => {
  const s = useSpringAt(at);
  return (
    <span
      style={{
        color: c.success,
        fontSize: 14,
        opacity: on ? s : 0,
        transform: `scale(${on ? s : 0.6})`,
        display: "inline-block",
      }}
    >
      ✓
    </span>
  );
};
