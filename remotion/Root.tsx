import React from 'react';
import { Composition, staticFile } from 'remotion';
import { Capture, type CaptureProps, type Track } from '../components/film/capture/Capture';
import { Cut, END, type CutData, type CutProps } from '../components/film/capture/Cut';

import {
  CUTS,
  Film,
  filmDurationInFrames,
  type FilmProps,
} from '../components/film/Film';
import { FPS, HEIGHT, WIDTH } from '../components/film/theme';

/**
 * The render entry point.
 *
 * The films are React components that run in the page — the site mounts them
 * through Remotion's Player and never renders a file. This registry exists for
 * the other output: `npx remotion render` for a standalone MP4, one per cut.
 *
 * Nothing in the site imports this, so it costs the bundle nothing.
 *
 * Note `ground: true`, where the page passes `false`. On the page the film is
 * drawn onto the section behind it and the captions take the page's ink; a file
 * has nothing behind it, so it needs the film's own dark ground and white type.
 */
const VARIANTS = Object.keys(CUTS) as FilmProps['variant'][];

export const RemotionRoot: React.FC = () => (
  <>
    {VARIANTS.map((variant) => (
      <Composition
        key={variant}
        id={variant}
        component={Film}
        durationInFrames={filmDurationInFrames(CUTS[variant], FPS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ variant, ground: true } satisfies FilmProps}
      />
    ))}
    {/* A recorded Rune Labs Space: --props='{"slug":"inbox","url":"…"}'. Its length comes from the track. */}
    <Composition
      id="capture"
      component={Capture}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      durationInFrames={300}
      defaultProps={{ slug: 'inbox', url: 'huggingface.co/spaces/surogate/inbox' } as CaptureProps}
      calculateMetadata={async ({ props }) => {
        const track: Track = await (await fetch(staticFile(`labs/films/raw/${props.slug}.json`))).json();
        return { durationInFrames: Math.ceil(track.duration * FPS), props: { ...props, track } };
      }}
    />
    {/* A run replayed in its simulator, cut into one take with Rune's view: --props='{"slug":"rune-duck"}'. */}
    <Composition
      id="cut"
      component={Cut}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      durationInFrames={300}
      defaultProps={{ slug: 'rune-duck' } as CutProps}
      calculateMetadata={async ({ props }) => {
        const cut: CutData = await (await fetch(staticFile(`labs/films/raw/${props.slug}.cut.json`))).json();
        return { durationInFrames: cut.frames.length + Math.round(END * FPS), props: { ...props, cut } };
      }}
    />
  </>
);
