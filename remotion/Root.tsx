import React from 'react';
import { Composition } from 'remotion';

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
  </>
);
