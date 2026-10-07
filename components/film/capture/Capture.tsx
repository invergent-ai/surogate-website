import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { sans } from '../font';

/**
 * A Rune Labs Space on film, in the Cap / Screen Studio manner.
 *
 * The page was screen-captured without a cursor (labs/spaces/film/capture.py); its track.json says where the hand
 * went, where it clicked, what the camera should frame and what to say. Everything here is drawn from that track:
 * the window floating on the wallpaper, the camera springing onto each target, the cursor and its click ripple,
 * the captions. Change the look here and re-render; nothing is re-shot.
 */

type Ev =
  | { t: number; type: 'move' | 'click'; x: number; y: number }
  | { t: number; type: 'zoom'; rect: [number, number, number, number] | null | 'all'; scale?: number | null }
  | { t: number; type: 'caption'; text: string; until: number }
  | { t: number; type: 'loop' };

export type Track = {
  name: string;
  title: string;
  viewport: [number, number];
  duration: number;
  events: Ev[];
};

export type CaptureProps = { slug: string; url: string; track?: Track };

const W = 1920;
const H = 1080;
const BAR = 44; // window title bar
const PAD = 56; // wallpaper around the window
const INK = '#2a102d';
const AMBER = '#f5a624';
const EASE = 0.9; // seconds a camera move takes
const FOLLOW = 1.5; // between targets the camera stays this close and follows the hand, as Screen Studio does
const OPEN = 1.0; // seconds of the whole window at the start, and (+0.8) at the end

/** Where the window sits on the 1920x1080 stage, and how many stage px one page px is. */
function layout([vw, vh]: [number, number]) {
  const k = Math.min((H - 2 * PAD - BAR) / vh, (W - 2 * PAD) / vw);
  const w = vw * k;
  const h = vh * k + BAR;
  return { k, x: (W - w) / 2, y: (H - h) / 2, w, h };
}

type Cam = { s: number; cx: number; cy: number };

type Pt = { x: number; y: number };

function camFor(rect: Extract<Ev, { type: 'zoom' }>['rect'], scale: number | null | undefined, L: ReturnType<typeof layout>, hand: Pt): Cam {
  if (rect === 'all') return { s: 1, cx: W / 2, cy: H / 2 };
  if (!rect) return { s: FOLLOW, cx: L.x + hand.x * L.k, cy: L.y + BAR + hand.y * L.k };
  const [x, y, w, h] = rect;
  const fit = Math.min((W * 0.84) / (w * L.k), (H * 0.78) / (h * L.k));
  const s = Math.max(1, Math.min(2.4, scale ?? fit));
  return { s, cx: L.x + (x + w / 2) * L.k, cy: L.y + BAR + (y + h / 2) * L.k };
}

/** The camera at time t: each zoom eases from wherever the camera was when it began. */
function camera(t: number, zooms: Extract<Ev, { type: 'zoom' }>[], L: ReturnType<typeof layout>, fps: number, hand: Pt): Cam {
  let cur: Cam = { s: 1, cx: W / 2, cy: H / 2 };
  for (let i = 0; i < zooms.length && zooms[i].t <= t; i++) {
    const z = zooms[i];
    const from = cur;
    const to = camFor(z.rect, z.scale, L, hand);
    const end = Math.min(t, zooms[i + 1]?.t ?? Infinity);
    const p = spring({ frame: (end - z.t) * fps, fps, config: { damping: 200 }, durationInFrames: EASE * fps });
    // zoom in scale-space logarithmically so in and out feel the same speed
    cur = {
      s: Math.exp(interpolate(p, [0, 1], [Math.log(from.s), Math.log(to.s)])),
      cx: interpolate(p, [0, 1], [from.cx, to.cx]),
      cy: interpolate(p, [0, 1], [from.cy, to.cy]),
    };
  }
  // zoomed in, the frame stays on the window: wallpaper shows only as much as the zoom leaves room for
  const k = Math.min(1, (cur.s - 1) / 0.3);
  const fit = (c: number, half: number, lo: number, hi: number) =>
    hi - lo > 2 * half ? Math.min(Math.max(c, lo + half), hi - half) : (lo + hi) / 2;
  const cx = fit(cur.cx, W / 2 / cur.s, L.x, L.x + L.w);
  const cy = fit(cur.cy, H / 2 / cur.s, L.y, L.y + L.h);
  return { s: cur.s, cx: cur.cx + (cx - cur.cx) * k, cy: cur.cy + (cy - cur.cy) * k };
}

function cursorAt(t: number, moves: Extract<Ev, { type: 'move' | 'click' }>[]) {
  if (!moves.length || t < moves[0].t) return null;
  let i = 0;
  while (i + 1 < moves.length && moves[i + 1].t <= t) i++;
  const a = moves[i];
  const b = moves[i + 1];
  if (!b || b.t - a.t > 0.25) return { x: a.x, y: a.y };
  const p = (t - a.t) / (b.t - a.t);
  return { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p };
}

const Arrow: React.FC<{ press: number }> = ({ press }) => (
  <svg width={30} height={30} viewBox="0 0 24 24" style={{ transform: `scale(${1 - 0.15 * press})`, transformOrigin: '3px 2px', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.35))' }}>
    <path d="M3 2 L3 19 L7.6 14.9 L10.6 21.6 L13.6 20.3 L10.7 13.7 L17 13.7 Z" fill="#111" stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" />
  </svg>
);

export const Capture: React.FC<CaptureProps> = ({ slug, url, track }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  if (!track) return null;
  const t = frame / fps;
  const L = layout(track.viewport);
  const moves = track.events.filter((e): e is Extract<Ev, { type: 'move' | 'click' }> => e.type === 'move' || e.type === 'click');
  // the whole window to open and to close; in between, the take's own targets
  const zooms: Extract<Ev, { type: 'zoom' }>[] = [
    { t: 0, type: 'zoom', rect: 'all' },
    { t: OPEN, type: 'zoom', rect: null },
    ...track.events.filter((e): e is Extract<Ev, { type: 'zoom' }> => e.type === 'zoom' && e.t > OPEN),
    { t: track.duration - OPEN - 0.8, type: 'zoom', rect: 'all' },
  ].sort((a, b) => a.t - b.t);
  // where the camera follows: the hand, averaged over the last second so it drifts instead of jerking
  const seen = Array.from({ length: 12 }, (_, i) => cursorAt(t - i * 0.08, moves)).filter((p): p is Pt => !!p);
  const hand = seen.length
    ? { x: seen.reduce((a, p) => a + p.x, 0) / seen.length, y: seen.reduce((a, p) => a + p.y, 0) / seen.length }
    : { x: track.viewport[0] / 2, y: track.viewport[1] / 2 };
  const clicks = moves.filter((e) => e.type === 'click');
  const cam = camera(t, zooms, L, fps, hand);
  const cur = cursorAt(t, moves);
  const lastClick = [...clicks].reverse().find((c) => c.t <= t);
  const since = lastClick ? t - lastClick.t : 99;
  const press = since < 0.18 ? Math.sin((since / 0.18) * Math.PI) : 0;
  const caption = [...track.events].reverse().find((e): e is Extract<Ev, { type: 'caption' }> => e.type === 'caption' && e.t <= t && t < e.until + 0.4);

  const enter = spring({ frame, fps, config: { damping: 18, mass: 0.7 }, durationInFrames: 24 });
  const fadeOut = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ background: INK, fontFamily: sans, opacity: fadeOut }}>
      {/* wallpaper: the brand's aubergine, lit from the top left in amber */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(1200px 800px at 18% 0%, rgba(245,166,36,.38), transparent 60%),
                       radial-gradient(1000px 700px at 100% 100%, rgba(186,74,152,.30), transparent 60%),
                       linear-gradient(160deg, #3d1d42 0%, ${INK} 55%, #1a0a1c 100%)`,
        }}
      />

      <AbsoluteFill
        style={{
          transformOrigin: '0 0',
          transform: `translate(${W / 2 - cam.s * cam.cx}px, ${H / 2 - cam.s * cam.cy}px) scale(${cam.s})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: L.x,
            top: L.y,
            width: L.w,
            height: L.h,
            borderRadius: 16,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 40px 90px rgba(10,0,12,.55), 0 0 0 1px rgba(255,255,255,.08)',
            transform: `translateY(${(1 - enter) * 40}px) scale(${0.96 + 0.04 * enter})`,
            opacity: Math.min(1, enter * 1.4),
          }}
        >
          <div style={{ height: BAR, background: '#f3f1f4', borderBottom: '1px solid #e4e0e6', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <span key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
            ))}
            <div style={{ margin: '0 auto', background: '#fff', borderRadius: 8, padding: '5px 18px', fontSize: 15, color: '#5b5560', border: '1px solid #e4e0e6' }}>
              {url}
            </div>
            <span style={{ width: 52 }} />
          </div>
          <OffthreadVideo src={staticFile(`labs/films/raw/${slug}.mp4`)} style={{ width: L.w, height: L.h - BAR, display: 'block' }} muted />
        </div>

        {/* the hand, drawn above the page in page coordinates, so it zooms with the camera */}
        {clicks.map((c) => {
          const age = t - c.t;
          if (age < 0 || age > 0.5) return null;
          const r = interpolate(age, [0, 0.5], [6, 34]);
          return (
            <div
              key={c.t}
              style={{
                position: 'absolute',
                left: L.x + c.x * L.k - r,
                top: L.y + BAR + c.y * L.k - r,
                width: 2 * r,
                height: 2 * r,
                borderRadius: r,
                border: `3px solid ${AMBER}`,
                opacity: interpolate(age, [0, 0.5], [0.9, 0]),
              }}
            />
          );
        })}
        {cur && (
          <div style={{ position: 'absolute', left: L.x + cur.x * L.k - 3, top: L.y + BAR + cur.y * L.k - 2 }}>
            <Arrow press={press} />
          </div>
        )}
      </AbsoluteFill>

      {caption && (() => {
        const inP = spring({ frame: (t - caption.t) * fps, fps, config: { damping: 200 }, durationInFrames: 12 });
        const out = interpolate(t, [caption.until, caption.until + 0.4], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 64, display: 'flex', justifyContent: 'center', opacity: inP * out, transform: `translateY(${(1 - inP) * 16}px)` }}>
            <div style={{ maxWidth: 1300, background: 'rgba(26,10,28,.86)', color: '#fff', fontSize: 34, lineHeight: 1.3, fontWeight: 500, padding: '18px 30px', borderRadius: 18, boxShadow: '0 12px 40px rgba(0,0,0,.35)', border: '1px solid rgba(255,255,255,.1)', textAlign: 'center' }}>
              {caption.text}
            </div>
          </div>
        );
      })()}

    </AbsoluteFill>
  );
};
