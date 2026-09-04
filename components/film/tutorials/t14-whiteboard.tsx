import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { hand, mono, sans } from "../font";
import { Camera } from "../ui/Camera";
import { Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c } from "../ui/tokens";

/**
 * Tutorial 14 — The whiteboard.
 *
 * From `work/tools/whiteboard.md`. A chat view where you write and draw instead
 * of typing, and the agent answers *on the board*.
 *
 * The parts that carry the video, all of them documented behaviour rather than
 * invention: an answer box is a space you reserve, labelled `S1`, carrying the
 * Surogate rabbit so it reads as the agent's space — and when the answer lands
 * the box **disappears**, replaced by it. Your ink clusters are `A1`, `A2`; the
 * agent's marks are `B1`, `B2`. The italic line under your ink is the agent's
 * *reading* of your handwriting — grey when the agent read it, green when you
 * corrected it, and your correction outranks anything it reads later.
 */

const INK = "#1e3a5f";

/* ── the board itself, reused across the shots ──────────────────── */

const Board: React.FC<{
  children: React.ReactNode;
  tool?: number;
}> = ({ children, tool = 0 }) => (
  <div style={{ display: "flex", height: 560 }}>
    {/* tool rail */}
    <div
      style={{
        width: 74,
        borderRight: `1px solid ${c.border}`,
        background: "#fbfaf9",
        padding: "14px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      {["pen", "eraser", "text", "box", "select", "pan"].map((name, i) => (
        <div
          key={name}
          style={{
            width: 46,
            height: 46,
            borderRadius: 10,
            background: i === tool ? `${c.amber}24` : "transparent",
            border: `1px solid ${i === tool ? c.amber : "transparent"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RailGlyph n={i} on={i === tool} />
        </div>
      ))}
      <div style={{ height: 10 }} />
      {/* ink colours */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, width: 46, justifyContent: "center" }}>
        {[INK, "#b42318", "#15803d", "#7c3aed", "#0c0a09"].map((col, i) => (
          <span
            key={col}
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: col,
              outline: i === 0 ? `2px solid ${c.amber}` : "none",
              outlineOffset: 2,
            }}
          />
        ))}
      </div>
    </div>

    {/* canvas */}
    <div
      style={{
        flex: 1,
        position: "relative",
        background: "#fff",
        backgroundImage:
          "linear-gradient(rgba(12,10,9,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(12,10,9,0.045) 1px, transparent 1px)",
        backgroundSize: "38px 38px",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  </div>
);

const RailGlyph: React.FC<{ n: number; on: boolean }> = ({ n, on }) => {
  const st = {
    fill: "none",
    stroke: on ? c.amber600 : c.mutedFg,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const d = [
    "M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z",
    "M19 20H8.5L3 14.5 12 5.5l8.5 8.5z",
    "M5 6.5V4.5h14v2M12 4.5v15M9 19.5h6",
    "M4 5.5h16v13H4zM4 5.5l16 13",
    "M4 3l7 17 2.5-6.5L20 11z",
    "M12 3v18M3 12h18M8 7l4-4 4 4M8 17l4 4 4-4",
  ][n];
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" {...st}>
      <path d={d} />
    </svg>
  );
};

/**
 * Handwriting.
 *
 * Caveat, not an italic serif — a serif reads as a typeset formula, which is
 * the opposite of what the board is showing. Sized up because handwriting faces
 * run small for their point size, and rotated a fraction so it sits on the grid
 * the way writing does rather than the way type does.
 */
const Ink: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 74, style }) => (
  <span
    style={{
      fontFamily: hand,
      fontSize: size,
      fontWeight: 600,
      color: INK,
      transform: "rotate(-1.1deg)",
      display: "inline-block",
      whiteSpace: "nowrap",
      letterSpacing: "0.01em",
      ...style,
    }}
  >
    {children}
  </span>
);

/**
 * What the agent writes.
 *
 * Typeset, never handwritten: the board's whole grammar is that your marks are
 * yours (`A1`) and its marks are its own (`B1`). Rendering its answer in the
 * same hand as your ink would erase the one distinction the surface is built
 * on — and an agent does not write, it renders.
 */
const Written: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 46, style }) => (
  <span
    style={{
      fontFamily: sans,
      fontSize: size,
      fontWeight: 500,
      color: c.foreground,
      display: "inline-block",
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </span>
);

/* ── step 1 · write on it ───────────────────────────────────────── */

export const SceneBoardWrite: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const shell = useEnterAt(t(2), 10);

  // The stroke draws itself in.
  const drawn = interpolate(frame, [t(18), t(62)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const reading = useEnterAt(t(80), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1500} hot at={0} style={{ padding: 0, opacity: shell, overflow: "hidden" }}>
          <Board tool={0}>
            <div style={{ position: "absolute", left: 90, top: 150 }}>
              <div style={{ overflow: "hidden", width: `${drawn * 560}px`, whiteSpace: "nowrap" }}>
                <Ink>∫ (1/x) dx =</Ink>
              </div>
              {/* the agent's reading of the handwriting */}
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 20,
                  fontStyle: "italic",
                  color: c.mutedFg,
                  marginTop: 14,
                  opacity: reading,
                }}
              >
                ∫(1/x)dx =
              </div>
            </div>
          </Board>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · reserve the space, and it fills it ────────────────── */

export const SceneAnswerBox: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const shell = useEnterAt(t(2), 10);

  const boxAt = t(20);
  const askAt = t(56);
  const answerAt = t(92);

  const box = useEnterAt(boxAt, 10);
  const answered = frame >= answerAt;
  // The box does not fade out — it is replaced.
  const boxAlive = answered ? 0 : box;
  const answer = useEnterAt(answerAt, 12);
  const working = frame >= askAt && frame < answerAt;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 6);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.97, focus: { x: 0.5, y: 0.46 } },
          { at: t(80), over: t(60), scale: 1.06, focus: { x: 0.44, y: 0.44 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1500} hot at={0} style={{ padding: 0, opacity: shell, overflow: "hidden" }}>
            <Board tool={3}>
              <div style={{ position: "absolute", left: 90, top: 150, display: "flex", alignItems: "center", gap: 26 }}>
                <Ink>∫ (1/x) dx =</Ink>

                {/* reserved space, labelled S1, carrying the rabbit */}
                {boxAlive > 0 ? (
                  <div
                    style={{
                      position: "relative",
                      width: 300,
                      height: 96,
                      borderRadius: 10,
                      border: `2px dashed ${c.amber}`,
                      background: `${c.amber}0f`,
                      opacity: boxAlive,
                    }}
                  >
                    <Img
                      src={staticFile("logo-badge.svg")}
                      style={{ position: "absolute", right: 10, bottom: 8, height: 26, opacity: 0.75 }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 12,
                        top: 8,
                        fontFamily: mono,
                        fontSize: 17,
                        fontWeight: 600,
                        color: c.amber600,
                      }}
                    >
                      S1
                    </span>
                  </div>
                ) : null}

                {/* the answer, in the space the box held */}
                {answered ? (
                  <Written style={{ opacity: answer }}>ln |x| + C</Written>
                ) : null}
              </div>

              {/* the progress pill, and the canvas locked behind it */}
              {working ? (
                <div
                  style={{
                    position: "absolute",
                    bottom: 22,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(12,10,9,0.85)",
                    color: "#fde68a",
                    borderRadius: 999,
                    padding: "10px 22px",
                    fontFamily: sans,
                    fontSize: 18,
                    fontWeight: 500,
                    opacity: 0.7 + 0.3 * pulse,
                  }}
                >
                  Thinking…
                </div>
              ) : null}
            </Board>

            {/* the ask bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderTop: `1px solid ${c.border}`,
                background: "#fbfaf9",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  border: `1px solid ${c.border}`,
                  borderRadius: 10,
                  background: "#fff",
                  padding: "12px 16px",
                  fontFamily: sans,
                  fontSize: 18,
                  color: c.mutedFg,
                }}
              >
                Ask about the board
              </div>
              {["Answer", "Continue", "Explain", "Hint"].map((label, i) => (
                <div
                  key={label}
                  style={{
                    borderRadius: 10,
                    padding: "12px 20px",
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: i === 0 ? 600 : 500,
                    background: i === 0 && frame >= askAt ? c.amber : i === 0 ? `${c.amber}24` : "transparent",
                    color: i === 0 ? (frame >= askAt ? "#000" : c.amber600) : c.mutedFg,
                    border: i === 0 ? "none" : `1px solid ${c.border}`,
                  }}
                >
                  {label}
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginLeft: 6 }}>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    border: `2px solid ${c.border}`,
                  }}
                />
                <Text size={16} muted>
                  Work it out
                </Text>
              </div>
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};


/* ── step 3 · carry on from its answer ──────────────────────────── */

/**
 * The board is one surface, not a transcript with two columns: what the agent
 * wrote is just something else on the board, and you can write around it.
 *
 * Here the previous answer (`ln |x| + C`, typeset — the agent's mark) gets
 * hand-drawn brackets and an exponent added around it, then a fresh answer box.
 * The mix is the point: your ink and its type sitting inside one expression.
 */
export const SceneBoardContinue: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(8);
  const shell = useEnterAt(t(2), 10);

  const bracketsAt = t(20);
  const powerAt = t(42);
  const boxAt = t(62);
  const askAt = t(84);
  const answerAt = t(116);

  const brackets = useEnterAt(bracketsAt, 10);
  const power = useEnterAt(powerAt, 9);
  const eq = useEnterAt(boxAt - t(6), 9);
  const box = useEnterAt(boxAt, 10);
  const answered = frame >= answerAt;
  const answer = useEnterAt(answerAt, 12);
  const working = frame >= askAt && frame < answerAt;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 6);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 1.0, focus: { x: 0.5, y: 0.46 } },
          { at: t(100), over: t(60), scale: 1.05, focus: { x: 0.56, y: 0.44 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1560} hot at={0} style={{ padding: 0, opacity: shell, overflow: "hidden" }}>
            <Board tool={0}>
              <div
                style={{
                  position: "absolute",
                  left: 60,
                  top: 176,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  whiteSpace: "nowrap",
                }}
              >
                <Ink size={54}>∫ (1/x) dx =</Ink>

                {/* your bracket, its answer, your bracket */}
                <Ink size={62} style={{ opacity: brackets }}>
                  (
                </Ink>
                <Written size={34}>ln |x| + C</Written>
                <Ink size={62} style={{ opacity: brackets }}>
                  )
                </Ink>

                {/* the exponent, written after the closing bracket */}
                <Ink
                  size={40}
                  style={{
                    opacity: power,
                    alignSelf: "flex-start",
                    marginTop: 10,
                    marginLeft: -6,
                  }}
                >
                  2
                </Ink>

                <Ink size={54} style={{ opacity: eq, marginLeft: 8 }}>
                  =
                </Ink>

                {/* a second reserved space */}
                {answered ? (
                  <Written size={34} style={{ opacity: answer }}>
                    ln²|x| + 2C·ln|x| + C²
                  </Written>
                ) : (
                  <div
                    style={{
                      position: "relative",
                      width: 280,
                      height: 78,
                      borderRadius: 10,
                      border: `2px dashed ${c.amber}`,
                      background: `${c.amber}0f`,
                      opacity: box,
                    }}
                  >
                    <Img
                      src={staticFile("logo-badge.svg")}
                      style={{ position: "absolute", right: 10, bottom: 8, height: 24, opacity: 0.75 }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 12,
                        top: 8,
                        fontFamily: mono,
                        fontSize: 16,
                        fontWeight: 600,
                        color: c.amber600,
                      }}
                    >
                      S2
                    </span>
                  </div>
                )}
              </div>

              {working ? (
                <div
                  style={{
                    position: "absolute",
                    bottom: 22,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(12,10,9,0.85)",
                    color: "#fde68a",
                    borderRadius: 999,
                    padding: "10px 22px",
                    fontFamily: sans,
                    fontSize: 18,
                    fontWeight: 500,
                    opacity: 0.7 + 0.3 * pulse,
                  }}
                >
                  Thinking…
                </div>
              ) : null}
            </Board>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderTop: `1px solid ${c.border}`,
                background: "#fbfaf9",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  border: `1px solid ${c.border}`,
                  borderRadius: 10,
                  background: "#fff",
                  padding: "12px 16px",
                  fontFamily: sans,
                  fontSize: 18,
                  color: c.mutedFg,
                }}
              >
                Ask about the board
              </div>
              {["Answer", "Continue", "Explain", "Hint"].map((label, i) => (
                <div
                  key={label}
                  style={{
                    borderRadius: 10,
                    padding: "12px 20px",
                    fontFamily: sans,
                    fontSize: 17,
                    fontWeight: i === 0 ? 600 : 500,
                    background:
                      i === 0 && frame >= askAt ? c.amber : i === 0 ? `${c.amber}24` : "transparent",
                    color: i === 0 ? (frame >= askAt ? "#000" : c.amber600) : c.mutedFg,
                    border: i === 0 ? "none" : `1px solid ${c.border}`,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};
