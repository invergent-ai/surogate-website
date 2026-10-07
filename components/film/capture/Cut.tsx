import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { sans, serif } from '../font';

/**
 * Footage of a recorded run replayed in its simulator (labs spaces/rune-duck/sim/film.py: Rune's recorded answers
 * fed in order, every decision checked against the live run), cut into one take, with Rune's view in the corner:
 * the frame it was sent and its answers, for whichever read is in flight on that frame.
 */

type Read = { img: string; say: string; labels: Record<string, Record<string, number>> };
export type CutData = { title: string; result: string; frames: string[]; readAt: number[]; reads: Read[]; show: string[] };
export type CutProps = { slug: string; cut?: CutData };

const AMBER = '#f5a624';
export const END = 2.6; // seconds of the result card after the footage

const nice = (k: string) => k.replace(/_/g, ' ');

export const Cut: React.FC<CutProps> = ({ cut }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  if (!cut) return null;
  const n = cut.frames.length;
  const f = Math.min(frame, n - 1);
  const read = cut.reads[cut.readAt[f]];
  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 18 });
  const end = interpolate(frame, [n - 6, n + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#1a0a1c', fontFamily: sans, color: '#fff', opacity: fadeOut }}>
      <Img src={staticFile(cut.frames[f])} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

      <div style={{ position: 'absolute', left: 48, top: 40, display: 'flex', alignItems: 'baseline', gap: 18, opacity: enter * (1 - end) }}>
        <span style={{ fontFamily: serif, fontWeight: 600, fontSize: 44, color: '#2a102d' }}>{cut.title}</span>
      </div>

      {/* Rune's view: the frame it was sent, and its answers */}
      <div
        style={{
          position: 'absolute', left: 48, bottom: 48, width: 520, padding: 18, borderRadius: 20,
          background: 'rgba(26,10,28,.86)', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 20px 60px rgba(0,0,0,.35)',
          opacity: enter * (1 - end), transform: `translateY(${(1 - enter) * 20}px)`,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: AMBER, marginBottom: 10 }}>
          What Rune sees
        </div>
        <Img src={staticFile(read.img)} style={{ width: 484, height: 272, borderRadius: 10, display: 'block' }} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cut.show.length}, 1fr)`, gap: 16, marginTop: 14 }}>
          {cut.show.map((q) => {
            const top = Object.entries(read.labels[q] ?? {}).sort((a, b) => b[1] - a[1])[0];
            if (!top) return null;
            return (
              <div key={q}>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{nice(q)}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 19, fontWeight: 600, marginTop: 4 }}>
                  <span>{nice(top[0])}</span>
                  <span>{Math.round(top[1] * 100)}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,.12)', marginTop: 5 }}>
                  <div style={{ width: `${top[1] * 100}%`, height: 6, borderRadius: 3, background: AMBER }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.35, color: 'rgba(255,255,255,.85)', marginTop: 12 }}>{read.say}</div>
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', background: `rgba(26,10,28,${0.86 * end})` }}>
        <div style={{ opacity: end, textAlign: 'center', transform: `scale(${0.96 + 0.04 * end})` }}>
          <div style={{ fontSize: 30, color: AMBER, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>{cut.title}</div>
          <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 64, marginTop: 14 }}>{cut.result}</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
