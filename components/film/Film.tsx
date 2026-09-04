import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { sans } from "./font";
import { Ground, Sweep } from "./ui/Ground";
import { ToneContext } from "./ui/tone";
import { StepBadge } from "./ui/StepBadge";
import { Caption } from "./components/Caption";
import { Placeholder } from "./scenes/Placeholder";
import { SHORT_CUT, SHOTS, type Shot } from "./shots";
import { DEVELOP_SHOTS, MONETIZE_SHOTS, WORK_SHOTS } from "./shots-modes";
import { TUTORIALS } from "./tutorials";
import { theme } from "./theme";

/**
 * Props must be JSON-serializable — Remotion serializes defaultProps, which
 * silently strips a React component. So the film takes a *variant*, not a
 * shot array, and resolves the scenes itself.
 */
export type FilmProps = {
  /** Any cut in `CUTS` — the showcase films and the tutorial catalogue. */
  variant: keyof typeof CUTS;
  /** Voiceover file in public/audio/. Silent when absent. */
  voiceover?: string;
  /**
   * Background music file in public/audio/. Silent when absent — drop a track
   * in and name it here; nothing else needs to change.
   */
  music?: string;
  /** Music level under the voiceover, 0–1. */
  musicVolume?: number;
  /** Draw shot id + timecode over every frame. On for review, off to render. */
  debug?: boolean;
  /**
   * Draw the film's own dark ground. Off puts the panels straight onto
   * whatever is behind the player, and switches the captions to the page's
   * text colour — white type has nothing to sit on once the ground is gone.
   */
  ground?: boolean;
};

/**
 * Eleven beats, hard cuts throughout, one dissolve into the end card.
 *
 * Sequences are placed explicitly rather than with <TransitionSeries>. Passing
 * the sequences to it as a mapped array made it mis-assign offsets — a scene
 * reported a 516-frame duration starting at frame -261 instead of 150 frames
 * starting at 105, so every scene's internal timing was wrong and the create
 * form was already gone by the time its shot began. Computing `from` here is a
 * few lines and leaves nothing to infer.
 *
 * The end card's dissolve is its own opacity ramp; it is the only soft edge.
 */
export const Film: React.FC<FilmProps> = ({
  variant,
  voiceover,
  music,
  musicVolume = 0.35,
  debug,
  ground = true,
}) => {
  const shots = CUTS[variant];
  const { fps, durationInFrames } = useVideoConfig();
  const plan = layout(shots, fps);

  return (
    <ToneContext.Provider value={ground ? "dark" : "light"}>
    <AbsoluteFill
      style={{
        backgroundColor: ground ? theme.ink : "transparent",
        fontFamily: sans,
      }}
    >
      {/* One ground for the whole film, behind every cut. */}
      {ground ? <Ground /> : null}

      {plan.map(({ shot, from, durationInFrames }) => (
        <Sequence
          key={shot.id}
          from={from}
          durationInFrames={durationInFrames}
          premountFor={fps}
        >
          <ShotScene shot={shot} />
        </Sequence>
      ))}

      {music ? (
        <Sequence premountFor={fps}>
          {/*
            Fades up over the first second and down over the last two, so the
            film neither starts nor stops mid-bar. `loop` covers a track shorter
            than the cut; a longer one is simply truncated by the sequence.
          */}
          <Audio
            src={staticFile(`audio/${music}`)}
            loop
            volume={(f) =>
              musicVolume *
              interpolate(f, [0, fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }) *
              interpolate(
                f,
                [durationInFrames - fps * 2, durationInFrames],
                [1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              )
            }
          />
        </Sequence>
      ) : null}

      {voiceover ? (
        <Sequence premountFor={fps}>
          <Audio src={staticFile(`audio/${voiceover}`)} />
        </Sequence>
      ) : null}

      {/*
        One light sweep across the cut into the end card. Every other cut is
        hard; the last one is the only place the film wants punctuation, and a
        sweep says "and that's it" where a dissolve would just say "fade".
      */}
      {ground ? (
        <Sweep at={plan[plan.length - 1].from - 4} over={Math.round(fps * 0.9)} />
      ) : null}

      {debug ? <DebugOverlay shots={shots} /> : null}
    </AbsoluteFill>
    </ToneContext.Provider>
  );
};

/**
 * Every cut the project renders, by name.
 *
 * `remotion/Root.tsx` maps over this, so a cut added here appears in the studio
 * and the render CLI with nothing else to change. The variant union is derived
 * from it rather than hand-maintained — the tutorial catalogue is 25 entries
 * and nobody is going to keep a parallel list of string literals correct.
 */
export const CUTS = {
  full: SHOTS,
  short: SHORT_CUT,
  work: WORK_SHOTS,
  develop: DEVELOP_SHOTS,
  monetize: MONETIZE_SHOTS,
  ...TUTORIALS,
} satisfies Record<string, Shot[]>;

/** Where each shot sits on the timeline. One source of truth for the cut. */
export const layout = (shots: Shot[], fps: number) => {
  let from = 0;
  return shots.map((shot) => {
    const durationInFrames = Math.round(shot.duration * fps);
    const at = from;
    from += durationInFrames;
    return { shot, from: at, durationInFrames };
  });
};

export const filmDurationInFrames = (shots: Shot[], fps: number) =>
  shots.reduce((n, s) => n + Math.round(s.duration * fps), 0);

/**
 * How much of the frame the caption owns, by whether it has a subtitle.
 *
 * The caption and the stage both filled the frame, so every scene had to dodge
 * the type on its own — and each one drifted back into it the moment its panel
 * grew a row. The stage is shrunk instead: scenes still centre themselves, they
 * just centre inside what is left, and the caption can never be crowded.
 */
const captionZone = (shot: Shot) => {
  if (!shot.caption) return 0;
  return shot.captionSub ? 300 : 230;
};

/**
 * How far above the frame the stage box starts.
 *
 * Panels centre in the box, so a short panel sat with as much air above it as
 * the caption occupied below — the films opened on a band of empty ground. The
 * box begins above the frame instead, which pulls the centre line up and puts
 * the panel where the eye already is.
 */
const STAGE_LIFT = 120;

const ShotScene: React.FC<{ shot: Shot }> = ({ shot }) => {
  const Scene = shot.scene;
  const zone = captionZone(shot);
  const stage = Scene ? <Scene /> : <Placeholder shot={shot} />;

  return (
    <AbsoluteFill>
      {zone ? (
        <AbsoluteFill style={{ top: -STAGE_LIFT, bottom: zone }}>{stage}</AbsoluteFill>
      ) : (
        stage
      )}
      {shot.step && shot.steps ? (
        <StepBadge n={shot.step} of={shot.steps} />
      ) : null}
      {shot.caption ? (
        <Caption
          text={shot.caption}
          sub={shot.captionSub}
          placement={shot.captionAt}
          delay={shot.captionDelay}
        />
      ) : null}
    </AbsoluteFill>
  );
};

/**
 * Review aid: shot number, name and running timecode burned into the corner.
 * Makes "the cut at 0:34 is late" a conversation about a specific shot.
 */
const DebugOverlay: React.FC<{ shots: Shot[] }> = ({ shots }) => {
  const { fps } = useVideoConfig();
  let t = 0;
  return (
    <>
      {shots.map((shot) => {
        const from = Math.round(t * fps);
        t += shot.duration;
        return (
          <Sequence
            key={shot.id}
            from={from}
            durationInFrames={Math.round(shot.duration * fps)}
            layout="none"
          >
            <div
              style={{
                position: "absolute",
                top: 28,
                left: 32,
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(20,20,18,0.78)",
                color: theme.accent,
                fontFamily: "monospace",
                fontSize: 26,
              }}
            >
              {String(shot.id).padStart(2, "0")} · {shot.name} ·{" "}
              {formatTimecode(from / fps)}
            </div>
          </Sequence>
        );
      })}
    </>
  );
};

const formatTimecode = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};
