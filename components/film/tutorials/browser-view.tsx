import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { sans } from "../font";
import { Text } from "../ui/kit";
import { Typed, useEnterAt, useTimeScale } from "../ui/motion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { c } from "../ui/tokens";

/**
 * The live browser, animated.
 *
 * Both docs screenshots for this are stale — the old pane had a TAKE CONTROL /
 * CLOSE footer that no longer exists. Built from
 * surogates/sdk/agent-chat-react/src/components/browser/* and a current
 * screenshot: pane cards above the composer (the Browser card carries a live
 * thumbnail), a viewport that letterboxes on black, an amber action button over
 * the page, and collapsed "Thought through the problem" rows in the thread.
 *
 * Everything here is a function of the frame rather than a fixed snapshot, so
 * the beat can be retimed or reused: the pane connects, the page arrives, the
 * thread streams, the page scrolls, then control changes hands. The parts take
 * props for the same reason — another tutorial can drive them from its own
 * timeline.
 */

/**
 * One browser session, shown in two windows.
 *
 * Each shot is its own 150-frame beat map rather than a slice of a longer
 * timeline: a shot has to read on its own if someone joins mid-video, and
 * splicing one long session into windows would leave each shot opening on
 * whatever the previous one happened to end on.
 */
export type BrowserPhase = "open" | "control";

type Line = { at: number; kind: "says" | "tool" | "think" | "read"; text: string };

const SCRIPT: Record<BrowserPhase, {
  connectAt: number;
  scrollAt: number | null;
  controlAt: number | null;
  /** Lines already on screen when the shot opens. */
  settled: Line[];
  thread: Line[];
}> = {
  open: {
    connectAt: 34,
    scrollAt: null,
    controlAt: null,
    settled: [],
    thread: [
      { at: 8, kind: "says", text: "Opening their booking page now." },
      { at: 52, kind: "tool", text: "Cookie banner dismissed — consent accepted" },
      { at: 74, kind: "think", text: "Thought through the problem" },
    ],
  },
  control: {
    connectAt: -1,
    scrollAt: null,
    controlAt: 40,
    settled: [
      { at: 0, kind: "says", text: "18 rooms are free across 14–16 May, so the block fits." },
      { at: 0, kind: "read", text: "Read · browser-screenshot-20260514T091204Z.png" },
    ],
    thread: [
      { at: 8, kind: "says", text: "Want to pick the rooms yourself? Take the wheel." },
    ],
  },
};

const icon = {
  width: 19,
  height: 19,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const BrowserSession: React.FC<{ phase: BrowserPhase }> = ({ phase }) => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const shell = useEnterAt(t(2), 10);
  const script = SCRIPT[phase];

  const connected = script.connectAt < 0 || frame >= t(script.connectAt);
  const hasControl =
    script.controlAt !== null && frame >= t(script.controlAt);

  // The page slides up as the agent reads further down it. `work` scrolls; the
  // shots after it open already scrolled, so the room list stays on screen.
  const scroll =
    script.scrollAt !== null
      ? interpolate(frame, [t(script.scrollAt), t(script.scrollAt + 40)], [0, -150], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : phase === "open"
        ? 0
        : -150;

  const lines = [...script.settled, ...script.thread];
  const landed = lines.filter((l) => frame >= t(l.at)).length;
  const lift = Math.max(0, landed - 6) * 46;

  // Each phase is framed differently. The layout is the same in all four, so
  // without this the shots cut together as one long static two-column screen —
  // the camera is what tells the viewer where to look in each.
  const moves = {
    // wide, then drifting toward the pane as it comes alive
    open: [
      { at: 0, over: 1, scale: 0.93, focus: { x: 0.5, y: 0.5 } },
      { at: t(30), over: t(95), scale: 1.0, focus: { x: 0.62, y: 0.5 } },
    ],
    // tight on the toolbar, where the pointer changes colour
    control: [
      { at: 0, over: 1, scale: 1.06, focus: { x: 0.6, y: 0.42 } },
      { at: t(26), over: t(70), scale: 1.26, focus: { x: 0.55, y: 0.3 } },
    ],
  }[phase];

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera moves={moves}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel
          width={1780}
          hot
          at={0}
          style={{ display: "flex", height: 700, opacity: shell }}
        >
          {/* ── chat column ──────────────────────────────────── */}
          <div
            style={{
              width: 830,
              borderRight: `1px solid ${c.border}`,
              display: "flex",
              flexDirection: "column",
              padding: "22px 24px 18px",
              overflow: "hidden",
            }}
          >
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ transform: `translateY(${-lift}px)` }}>
                <Ready on={connected} />
                {lines.map((line, i) => (
                  <ThreadLine
                    key={`${line.kind}-${i}`}
                    line={line}
                    at={t(line.at)}
                    instant={i < script.settled.length}
                  />
                ))}
              </div>
            </div>

            <PaneCards at={phase === "open" ? t(20) : 0} scroll={scroll} />
            <Composer at={phase === "open" ? t(26) : 0} />
          </div>

          {/* ── the browser pane ─────────────────────────────── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Toolbar
              connected={connected}
              hasControl={hasControl}
              at={phase === "open" ? t(6) : -60}
            />
            <Viewport
              connected={connected}
              hasControl={hasControl}
              scroll={scroll}
              controlAt={script.controlAt !== null ? t(script.controlAt) : 0}
            />
          </div>
        </Panel>
      </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

/* ── thread ─────────────────────────────────────────────────────── */

const Ready: React.FC<{ on: boolean }> = ({ on }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      opacity: on ? 1 : 0.45,
    }}
  >
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: 999,
        background: on ? "#10b981" : c.mutedFg,
      }}
    />
    <Text size={15} muted>
      {on ? "Browser ready." : "Starting browser…"}
    </Text>
  </div>
);

const ThreadLine: React.FC<{
  line: Line;
  at: number;
  /** Already on screen when the shot opened — no entrance, no retyping. */
  instant?: boolean;
}> = ({ line, at, instant }) => {
  const frame = useCurrentFrame();
  const entered = useEnterAt(at, 9);
  const e = instant ? 1 : entered;
  if (e === 0) return null;

  const rise = { opacity: e, transform: `translateY(${(1 - e) * 8}px)` };

  // Assistant prose types on rather than appearing — it is streamed.
  if (line.kind === "says") {
    return (
      <Text size={18} style={{ lineHeight: 1.55, margin: "12px 0", ...rise }}>
        {instant ? line.text : <Typed text={line.text} at={at} cps={3.4} caret={false} />}
      </Text>
    );
  }

  const italic = line.kind === "tool";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "9px 12px",
        margin: "2px -12px",
        borderRadius: 8,
        background: line.kind === "think" ? "#f7f7f6" : "transparent",
        ...rise,
      }}
    >
      <span
        style={{
          flex: 1,
          fontFamily: sans,
          fontSize: 17,
          fontStyle: italic ? "italic" : "normal",
          color: line.kind === "read" ? c.foreground : c.mutedFg,
        }}
      >
        {line.text}
      </span>
      {/* The chevron rotates as a collapsed row is opened; these stay shut. */}
      <svg {...icon} width={17} height={17} stroke={c.mutedFg}>
        <path d="m6 9 6 6 6-6" />
      </svg>
      <span style={{ display: "none" }}>{frame}</span>
    </div>
  );
};

/* ── the cards above the composer ───────────────────────────────── */

const PaneCards: React.FC<{ at: number; scroll: number }> = ({ at, scroll }) => {
  const e = useEnterAt(at, 10);
  return (
    <div style={{ opacity: e, transform: `translateY(${(1 - e) * 10}px)` }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          border: `1px solid ${c.border}`,
          borderRadius: 13,
          padding: "12px 16px",
          marginBottom: 10,
        }}
      >
        <Thumbnail scroll={scroll} />
        <Text size={19} style={{ flex: 1 }}>
          Browser
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          border: `1px solid ${c.border}`,
          borderRadius: 13,
          padding: "16px 18px",
          marginBottom: 12,
        }}
      >
        <svg {...icon} stroke={c.mutedFg}>
          <path d="M3 7.5a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
        <Text size={19} style={{ flex: 1 }}>
          Files
        </Text>
        <svg {...icon} width={17} height={17} stroke={c.mutedFg}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
};

/** Live, not decorative: it scrolls with the page it is a thumbnail of. */
const Thumbnail: React.FC<{ scroll: number }> = ({ scroll }) => (
  <div
    style={{
      width: 64,
      height: 46,
      borderRadius: 6,
      border: `1px solid ${c.border}`,
      background: "#fff",
      padding: 5,
      overflow: "hidden",
      flexShrink: 0,
    }}
  >
    <div style={{ transform: `translateY(${scroll * 0.06}px)` }}>
      <div style={{ height: 5, width: "60%", background: "#d9d7d5", borderRadius: 2 }} />
      <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
        <div style={{ height: 12, flex: 1, background: "#ececea", borderRadius: 2 }} />
        <div style={{ height: 12, flex: 1, background: "#ececea", borderRadius: 2 }} />
        <div style={{ height: 12, flex: 1, background: "#ececea", borderRadius: 2 }} />
      </div>
      <div style={{ height: 5, width: "40%", background: "#1f7a5a", borderRadius: 2, marginTop: 5 }} />
    </div>
  </div>
);

const Composer: React.FC<{ at: number }> = ({ at }) => {
  const e = useEnterAt(at, 10);
  return (
    <div
      style={{
        border: `1px solid ${c.border}`,
        borderRadius: 18,
        padding: "18px 18px 14px",
        opacity: e,
      }}
    >
      <Text size={19} muted style={{ marginBottom: 22 }}>
        Send a message...
      </Text>
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "#f3f1f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: sans,
            fontSize: 22,
          }}
        >
          +
        </div>
        <span style={{ width: 14, height: 14, borderRadius: 999, border: `2px solid ${c.border}` }} />
        <Text size={16} muted>
          34 %
        </Text>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", background: "#f3f1f1", borderRadius: 999, padding: 4 }}>
          <span style={{ padding: "8px 18px", borderRadius: 999, background: c.card, fontFamily: sans, fontSize: 17 }}>
            Simple
          </span>
          <span style={{ padding: "8px 18px", fontFamily: sans, fontSize: 17, color: c.mutedFg }}>
            Advanced
          </span>
        </div>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 999,
            background: "#f5b400",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1a1408" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ── browser chrome ─────────────────────────────────────────────── */

const CONTROL_AMBER = "#F5A524";

const IconBtn: React.FC<{ d: string; dim?: boolean }> = ({ d, dim }) => (
  <div
    style={{
      width: 35,
      height: 35,
      borderRadius: 7,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: dim ? 0.35 : 1,
    }}
  >
    <svg {...icon} stroke={c.mutedFg}>
      <path d={d} />
    </svg>
  </div>
);

const POINTER_D = "M4 2.5 4 19l4.2-4.2 2.6 6 3.1-1.4-2.6-5.9 6.1-.4z";

const Toolbar: React.FC<{
  connected: boolean;
  hasControl: boolean;
  at: number;
}> = ({ connected, hasControl, at }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: c.card,
      padding: "8px 14px",
    }}
  >
    {/* back / forward / reload only work while you hold control */}
    <IconBtn d="m15 18-6-6 6-6" dim={!hasControl} />
    <IconBtn d="m9 18 6-6-6-6" dim />
    <IconBtn d="M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5" dim={!hasControl} />

    {/* One glyph in both states; the amber fill is the mode. */}
    <div
      style={{
        width: 35,
        height: 35,
        borderRadius: 7,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hasControl ? CONTROL_AMBER : "transparent",
      }}
    >
      <svg {...icon} stroke={hasControl ? "#000" : c.mutedFg}>
        <path d={POINTER_D} />
      </svg>
    </div>

    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: sans,
        fontSize: 16,
        paddingLeft: 8,
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: 999,
          background: connected ? "#10b981" : c.mutedFg,
        }}
      />
      <span>
        <Typed text="casadomar.pt" at={at} cps={2.4} caret={false} />
        {connected ? (
          <span style={{ color: c.mutedFg }}>/rooms/booking</span>
        ) : null}
      </span>
    </div>
    <IconBtn d="M12 5.5h.01M12 12h.01M12 18.5h.01" />
  </div>
);

const Viewport: React.FC<{
  connected: boolean;
  hasControl: boolean;
  scroll: number;
  controlAt: number;
}> = ({ connected, hasControl, scroll, controlAt }) => {
  const pill = useEnterAt(controlAt, 10);
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* object-contain on black: a page narrower than the pane letterboxes */}
      <div
        style={{
          width: "100%",
          height: "82%",
          background: "#fff",
          overflow: "hidden",
          opacity: connected ? 1 : 0,
        }}
      >
        <div style={{ padding: "26px 32px", transform: `translateY(${scroll}px)` }}>
          <div style={{ fontFamily: sans, fontSize: 30, fontWeight: 700 }}>
            Casa do Mar
          </div>
          <Text size={17} muted style={{ marginTop: 8 }}>
            Estoril, Lisbon · sleeps 22
          </Text>
          <div style={{ display: "flex", gap: 14, marginTop: 22 }}>
            {["14 May", "15 May", "16 May"].map((d) => (
              <div
                key={d}
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: 9,
                  padding: "13px 20px",
                  fontFamily: sans,
                  fontSize: 17,
                }}
              >
                {d}
              </div>
            ))}
          </div>
          {/* below the fold until the page scrolls */}
          <div style={{ marginTop: 26 }}>
            {["Sea-view double × 12", "Garden twin × 6"].map((room) => (
              <div
                key={room}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderTop: `1px solid ${c.border}`,
                  padding: "14px 0",
                  fontFamily: sans,
                  fontSize: 17,
                }}
              >
                <span style={{ flex: 1 }}>{room}</span>
                <span style={{ color: c.mutedFg }}>available</span>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 20,
              display: "inline-block",
              background: "#1f7a5a",
              color: "#fff",
              borderRadius: 9,
              padding: "14px 26px",
              fontFamily: sans,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Reserve 18 rooms
          </div>
        </div>
      </div>

      {!connected ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            fontFamily: sans,
            fontSize: 19,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Connecting to browser…
        </div>
      ) : null}

      {/* only while control is held */}
      {hasControl ? (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: `translateX(-50%) translateY(${(1 - pill) * 10}px)`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(0,0,0,0.85)",
            borderRadius: 999,
            padding: "9px 20px",
            fontFamily: sans,
            fontSize: 16,
            fontWeight: 500,
            color: "#fde68a",
            opacity: pill,
          }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fde68a" strokeWidth={2} strokeLinejoin="round">
            <path d={POINTER_D} />
          </svg>
          You have control · click the pointer to return
        </div>
      ) : null}

      <div
        style={{
          position: "absolute",
          right: 22,
          bottom: 22,
          width: 62,
          height: 62,
          borderRadius: 999,
          background: "#f5a624",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 26px rgba(0,0,0,0.4)",
        }}
      >
        <svg width={30} height={30} viewBox="0 0 24 24" fill="#1a1408">
          <path d="M12 2.6 14.3 9l6.7.2-5.3 4.1 1.9 6.5-5.6-3.8-5.6 3.8 1.9-6.5L3 9.2 9.7 9z" />
        </svg>
      </div>
    </div>
  );
};

/* ── the four shots ─────────────────────────────────────────────── */

export const SceneBrowserOpen: React.FC = () => <BrowserSession phase="open" />;
export const SceneBrowserControl: React.FC = () => <BrowserSession phase="control" />;

/* ── setup · browser profiles ───────────────────────────────────── */

/**
 * `work-settings-browser-profiles.png`. The black CREATE PROFILE button is the
 * product's, not our amber — this settings page uses the dark primary.
 */
export const SceneBrowserProfiles: React.FC = () => {
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 10);
  const rows = [useEnterAt(t(18), 10), useEnterAt(t(42), 10)];

  return (
    <Stage glow={{ x: 0.5, y: 0.44 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1380} hot at={0} style={{ padding: "32px 38px 34px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", opacity: head }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: sans, fontSize: 28, fontWeight: 700 }}>
                Browser Profiles
              </div>
              <Text size={17} muted style={{ marginTop: 8 }}>
                Preserve browser state and login sessions across tasks.
              </Text>
            </div>
            <div
              style={{
                background: "#0c0a09",
                color: "#fff",
                borderRadius: 8,
                padding: "13px 22px",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              + CREATE PROFILE
            </div>
          </div>

          {[
            ["default", "Created 2 months ago"],
            ["supplier-logins", "Created just now"],
          ].map(([name, when], i) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                border: `1px solid ${i === 1 ? c.amber : c.border}`,
                background: i === 1 ? "#fffdf7" : c.card,
                borderRadius: 12,
                padding: "20px 24px",
                marginTop: 18,
                opacity: rows[i],
                transform: `translateY(${(1 - rows[i]) * 8}px)`,
              }}
            >
              <div style={{ flex: 1 }}>
                <Text size={21} weight={600}>
                  {name}
                </Text>
                <Text size={16} muted style={{ marginTop: 6 }}>
                  {when}
                </Text>
              </div>
              <div
                style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: 8,
                  padding: "11px 20px",
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                ▷ SET UP AUTHENTICATION
              </div>
            </div>
          ))}
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── setup · capture a login ────────────────────────────────────── */

/**
 * `browser-profile-setup-dialog.tsx`.
 *
 * A full-screen dialog, not a form: a real browser opens and **you** log in by
 * hand. The component hard-codes `hasControl` — "capturing a profile IS logging
 * in by hand, so the user always holds control in this dialog" — so there is no
 * take-control button here, and the session has a countdown before it expires.
 *
 * The agent never sees the password. It inherits the cookies afterwards.
 */
export const SceneBrowserAuth: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const shell = useEnterAt(t(2), 10);

  const emailAt = t(24);
  const passAt = t(56);
  const signedAt = t(96);
  const signedIn = frame >= signedAt;

  // 4:58 down, a second at a time.
  const left = Math.max(0, 298 - Math.floor(frame / (t(30) / 1 || 30)) * 1);
  const mmss = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;

  const dots = "•".repeat(
    Math.min(12, Math.max(0, Math.floor((frame - passAt) / 2))),
  );

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel
          width={1620}
          hot
          at={0}
          style={{ display: "flex", flexDirection: "column", height: 680, opacity: shell }}
        >
          {/* dialog header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: `1px solid ${c.border}`,
              padding: "0 22px",
              height: 66,
              flexShrink: 0,
            }}
          >
            <Text size={19} weight={500} style={{ flex: 1 }}>
              Set up browser authentication
            </Text>
            <Text size={17} muted style={{ fontVariantNumeric: "tabular-nums", marginRight: 18 }}>
              {mmss}
            </Text>
            <div
              style={{
                background: signedIn ? c.amber : "#eceae9",
                color: signedIn ? "#000" : c.mutedFg,
                borderRadius: 9,
                padding: "12px 20px",
                fontFamily: sans,
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Save authentication and close
            </div>
          </div>

          {/* the live browser, on black, with you at the wheel */}
          <div
            style={{
              flex: 1,
              background: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "72%",
                background: "#fff",
                borderRadius: 4,
                padding: "42px 48px",
              }}
            >
              <div style={{ fontFamily: sans, fontSize: 26, fontWeight: 700 }}>
                Sign in to Casa do Mar
              </div>
              <Text size={16} muted style={{ marginTop: 8, marginBottom: 26 }}>
                Partner booking portal
              </Text>

              {[
                ["Email", <Typed key="e" text="events@acme.com" at={emailAt} cps={2.2} caret={false} />],
                ["Password", dots],
              ].map(([label, value], i) => (
                <div key={label as string} style={{ marginBottom: 18 }}>
                  <Text size={15} muted style={{ marginBottom: 7 }}>
                    {label as string}
                  </Text>
                  <div
                    style={{
                      border: `1px solid ${
                        (i === 0 && frame >= emailAt && frame < passAt) ||
                        (i === 1 && frame >= passAt && !signedIn)
                          ? c.amber
                          : c.border
                      }`,
                      borderRadius: 8,
                      padding: "13px 15px",
                      minHeight: 46,
                      fontFamily: sans,
                      fontSize: 18,
                      letterSpacing: i === 1 ? "0.18em" : "normal",
                    }}
                  >
                    {value as React.ReactNode}
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: 24,
                  display: "inline-block",
                  background: signedIn ? "#1f7a5a" : "#2f6f57",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "13px 28px",
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 600,
                  transform: `scale(${
                    frame >= signedAt - 4 && frame < signedAt + 4 ? 0.97 : 1
                  })`,
                }}
              >
                {signedIn ? "Signed in ✓" : "Sign in"}
              </div>
            </div>

            {/* control is never in question here — it is always yours */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(0,0,0,0.85)",
                borderRadius: 999,
                padding: "9px 20px",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 500,
                color: "#fde68a",
              }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fde68a" strokeWidth={2} strokeLinejoin="round">
                <path d={POINTER_D} />
              </svg>
              You have control · sign in as you normally would
            </div>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};
