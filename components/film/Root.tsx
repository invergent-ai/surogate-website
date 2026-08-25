import React from "react";
import { Composition, Folder, Still } from "remotion";
import { Film, filmDurationInFrames, type FilmProps } from "./Film";
import { EndCard } from "./components/EndCard";
import { SHOTS, SHORT_CUT } from "./shots";
import { DEVELOP_SHOTS, WORK_SHOTS } from "./shots-modes";
import { FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Films">
        <Composition
          id="Surogate60"
          component={Film}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          durationInFrames={filmDurationInFrames(SHOTS, FPS)}
          defaultProps={
            { variant: "full", debug: false } satisfies FilmProps
          }
        />

        <Composition
          id="Surogate30"
          component={Film}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          durationInFrames={filmDurationInFrames(SHORT_CUT, FPS)}
          defaultProps={
            { variant: "short", debug: false } satisfies FilmProps
          }
        />
        {/*
          The two mode films. Same scene library, different arcs: Work mode is a
          day with a deployed agent, Develop mode is the loop that produces one.
        */}
        <Composition
          id="SurogateWorkMode"
          component={Film}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          durationInFrames={filmDurationInFrames(WORK_SHOTS, FPS)}
          defaultProps={{ variant: "work", debug: false } satisfies FilmProps}
        />

        <Composition
          id="SurogateDevelopMode"
          component={Film}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          durationInFrames={filmDurationInFrames(DEVELOP_SHOTS, FPS)}
          defaultProps={{ variant: "develop", debug: false } satisfies FilmProps}
        />
      </Folder>

      <Folder name="Review">
        {/*
          Same film with the shot/timecode burn-in. Render this one to send
          around for notes — feedback comes back as "shot 7 runs long"
          instead of "the bit with the search".
        */}
        <Composition
          id="Surogate60-Review"
          component={Film}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          durationInFrames={filmDurationInFrames(SHOTS, FPS)}
          defaultProps={
            { variant: "full", debug: true } satisfies FilmProps
          }
        />
      </Folder>

      <Folder name="Stills">
        <Still
          id="Poster"
          component={EndCard}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ settled: true }}
        />
      </Folder>
    </>
  );
};
