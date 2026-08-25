'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Player, type PlayerRef } from '@remotion/player';

import { CUTS, Film, filmDurationInFrames, type FilmProps } from '../film/Film';
import { FPS, HEIGHT, WIDTH } from '../film/theme';

/**
 * A film, running in the page.
 *
 * These are React components, not video: the same scenes that make up the
 * animation are mounted through Remotion's Player and drawn live. Nothing is
 * fetched and nothing is decoded — no file, no poster.
 *
 * It starts on its own and loops, but only while it is on screen: a composition
 * off-screen still costs a render per frame, and there are several on the page.
 * Once someone pauses it deliberately, scrolling away and back does not undo
 * that — the observer only drives films the reader has not taken charge of.
 */
export default function FilmPlayer({
  variant,
  label,
  caption,
  ground = true,
}: {
  variant: FilmProps['variant'];
  label: string;
  caption?: string;
  /** Off draws the scenes straight onto the section behind them. */
  ground?: boolean;
}) {
  const ref = useRef<PlayerRef>(null);
  const box = useRef<HTMLDivElement>(null);
  /** Set once the reader presses pause, and respected until they press play. */
  const held = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  /**
   * Whether the player exists yet.
   *
   * There are four films on the page. Mounting them all at hydration put four
   * render loops on the main thread at once, and each one painted its first
   * frame and then sat there until it got scheduled — the film looked stuck for
   * about a second before it began. Each now waits until it is nearly in view,
   * so it is built and running before anyone is looking at it, and the films
   * further down the page cost nothing until they are approached.
   */
  const [live, setLive] = useState(false);

  const total = filmDurationInFrames(CUTS[variant], FPS);

  /**
   * Run something against the player.
   *
   * The Player populates its ref after the mounting effect runs, and an
   * observer fires immediately for a section already on screen — so the first
   * call can arrive while the ref is still null. Retrying beats dropping it: a
   * film below the fold played fine, one already in view never started.
   */
  const withPlayer = useCallback((fn: (player: PlayerRef) => void) => {
    let cancelled = false;
    const attempt = () => {
      if (cancelled) return;
      const player = ref.current;
      if (player) fn(player);
      else requestAnimationFrame(attempt);
    };
    attempt();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!live) return;

    let detach = () => {};
    const stop = withPlayer((player) => {
      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      const onFrame = (e: { detail: { frame: number } }) =>
        setFrame(e.detail.frame);

      player.addEventListener('play', onPlay);
      player.addEventListener('pause', onPause);
      player.addEventListener('frameupdate', onFrame);

      detach = () => {
        player.removeEventListener('play', onPlay);
        player.removeEventListener('pause', onPause);
        player.removeEventListener('frameupdate', onFrame);
      };
    });

    return () => {
      stop();
      detach();
    };
  }, [withPlayer, live]);

  // Build the player a screen-height before it arrives, and leave it built.
  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLive(true);
        io.disconnect();
      },
      { rootMargin: '800px 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el || !live) return;

    // Someone who has asked for less motion gets the first frame, held.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (held.current) return;
        withPlayer((player) => {
          if (entry.isIntersecting) player.play();
          else player.pause();
        });
      },
      { threshold: 0.3 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [withPlayer, live]);

  const toggle = () =>
    withPlayer((player) => {
      if (player.isPlaying()) {
        held.current = true;
        player.pause();
      } else {
        held.current = false;
        player.play();
      }
    });

  const restart = () =>
    withPlayer((player) => {
      player.seekTo(0);
      held.current = false;
      player.play();
    });

  const scrub = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const at = (event.clientX - rect.left) / rect.width;
    withPlayer((player) =>
      player.seekTo(Math.round(Math.min(1, Math.max(0, at)) * (total - 1))),
    );
  };

  const nudge = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const jump: Record<string, number> = {
      ArrowLeft: -FPS,
      ArrowRight: FPS,
      Home: -total,
      End: total,
    };
    const by = jump[event.key];
    if (by === undefined) return;
    event.preventDefault();
    withPlayer((player) =>
      player.seekTo(
        Math.min(total - 1, Math.max(0, player.getCurrentFrame() + by)),
      ),
    );
  };

  return (
    <div>
      <div className={ground ? 'vid' : 'vid vid-bare'} ref={box}>
        <div className="film">
          {live ? (
          <Player
            ref={ref}
            component={Film}
            inputProps={{ variant, ground } satisfies FilmProps}
            durationInFrames={total}
            /*
              Plays from its first frame, from mount. Nothing is held: driving
              the first play from an effect left a still on screen while the
              player's ref landed, and opening on a later frame turned that
              still into a frozen mid-entrance. Starting at zero means the first
              thing anyone sees is the opening animation itself. The observer
              keeps only its job of pausing what scrolls away.
            */
            autoPlay
            fps={FPS}
            compositionWidth={WIDTH}
            compositionHeight={HEIGHT}
            loop
            acknowledgeRemotionLicense
            style={{ width: '100%', height: '100%' }}
            aria-label={label}
          />
          ) : null}
        </div>
      </div>

      <div className="film-bar">
        <button
          type="button"
          className="fb-btn fb-play"
          onClick={toggle}
          aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5h3.2v14H8zM12.8 5H16v14h-3.2z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="fb-btn"
          onClick={restart}
          aria-label={`Restart: ${label}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 5a7 7 0 1 1-6.6 4.7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M4.4 4v4.6H9z" />
          </svg>
        </button>

        {/* A slider rather than a progress bar: it is seekable, so it has to
            take focus and answer the arrow keys as well as the mouse. */}
        <div
          className="fb-track"
          onClick={scrub}
          onKeyDown={nudge}
          role="slider"
          tabIndex={0}
          aria-label={`Timeline: ${label}`}
          aria-valuemin={0}
          aria-valuemax={Math.round(total / FPS)}
          aria-valuenow={Math.round(frame / FPS)}
          aria-valuetext={clock(frame)}
        >
          <div
            className="fb-fill"
            style={{ width: `${(frame / Math.max(1, total - 1)) * 100}%` }}
          />
        </div>

        <span className="fb-time">
          {clock(frame)} / {clock(total)}
        </span>
      </div>

      {caption ? <p className="fb-caption">{caption}</p> : null}
    </div>
  );
}

const clock = (frames: number) => {
  const seconds = Math.floor(frames / FPS);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};
