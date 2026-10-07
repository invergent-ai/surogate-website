import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { sans, serif } from '../font';

/**
 * A recorded run, read by read: the frame Rune saw, its answers, what the page did with them.
 *
 * For the Spaces that cannot be replayed through their own page (the Duck's physics, Volley's live game), so
 * every picture and number here is a recording (labs/spaces/film/reads.py). Same wallpaper as `capture`.
 */

type Read = { img: string; labels: Record<string, Record<string, number>>; say: string; ms: number };
type Chapter = { at: number; title: string; result: string };
export type Run = { title: string; aspect: [number, number]; hold: number; chapters: Chapter[]; reads: Read[] };
export type ReadsProps = { slug: string; run?: Run };

const INK = '#2a102d';
const AMBER = '#f5a624';
const OPEN = 0.8;
const CARD = 2.4; // seconds a chapter's result stays up

type Seg = { kind: 'read'; i: number; start: number; dur: number } | { kind: 'result'; c: number; start: number; dur: number };

export function timeline(run: Run): { segs: Seg[]; duration: number } {
  const segs: Seg[] = [];
  let t = OPEN;
  run.reads.forEach((_, i) => {
    const c = run.chapters.findIndex((ch) => ch.at === i);
    if (c > 0) { segs.push({ kind: 'result', c: c - 1, start: t, dur: CARD }); t += CARD; }
    segs.push({ kind: 'read', i, start: t, dur: run.hold });
    t += run.hold;
  });
  segs.push({ kind: 'result', c: run.chapters.length - 1, start: t, dur: CARD + 0.6 });
  return { segs, duration: t + CARD + 0.6 };
}

const nice = (k: string) => k.replace(/_/g, ' ');

export const Reads: React.FC<ReadsProps> = ({ run }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  if (!run) return null;
  const t = frame / fps;
  const { segs } = timeline(run);
  const seg = [...segs].reverse().find((s) => s.start <= t) ?? segs[0];
  const lastRead = [...segs].reverse().find((s): s is Extract<Seg, { kind: 'read' }> => s.kind === 'read' && s.start <= t);
  const i = lastRead?.i ?? 0;
  const read = run.reads[i];
  const prev = run.reads[Math.max(0, i - 1)];
  const since = lastRead ? t - lastRead.start : 0;
  const p = spring({ frame: since * fps, fps, config: { damping: 200 }, durationInFrames: 9 });
  const chapter = [...run.chapters].reverse().find((c) => c.at <= i) ?? run.chapters[0];
  const inChapter = i - chapter.at + 1;
  const chapterLen = (run.chapters[run.chapters.indexOf(chapter) + 1]?.at ?? run.reads.length) - chapter.at;

  const [aw, ah] = run.aspect;
  const fw = 1060;
  const fh = (fw * ah) / aw;
  const enter = spring({ frame, fps, config: { damping: 18, mass: 0.7 }, durationInFrames: 24 });
  const fadeOut = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [1, 0], { extrapolateLeft: 'clamp' });
  const questions = Object.keys(read.labels).slice(0, 3);

  return (
    <AbsoluteFill style={{ background: INK, fontFamily: sans, color: '#fff', opacity: fadeOut }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1200px 800px at 18% 0%, rgba(245,166,36,.38), transparent 60%),
                       radial-gradient(1000px 700px at 100% 100%, rgba(186,74,152,.30), transparent 60%),
                       linear-gradient(160deg, #3d1d42 0%, ${INK} 55%, #1a0a1c 100%)`,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - enter) * 30}px)`, opacity: Math.min(1, enter * 1.4) }}>
        <div style={{ position: 'absolute', left: 80, top: 64, display: 'flex', alignItems: 'baseline', gap: 22 }}>
          <span style={{ fontFamily: serif, fontWeight: 600, fontSize: 52, letterSpacing: '-0.01em' }}>{run.title}</span>
          <span style={{ fontSize: 26, color: 'rgba(255,255,255,.7)' }}>{chapter.title}</span>
        </div>
        <div style={{ position: 'absolute', right: 80, top: 78, fontSize: 22, color: 'rgba(255,255,255,.7)' }}>
          Rune&apos;s read {inChapter} of {chapterLen} · {read.ms} ms
        </div>

        <div style={{ position: 'absolute', left: 80, top: 170 }}>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: AMBER, marginBottom: 12 }}>
            What Rune saw
          </div>
          <div style={{ width: fw, height: fh, borderRadius: 18, overflow: 'hidden', boxShadow: '0 40px 90px rgba(10,0,12,.55), 0 0 0 1px rgba(255,255,255,.1)', background: '#000' }}>
            <Img src={staticFile(read.img)} style={{ width: fw, height: fh, display: 'block' }} />
          </div>
          {read.say && (
            <div style={{ marginTop: 22, maxWidth: fw, fontSize: 26, lineHeight: 1.35, color: 'rgba(255,255,255,.9)', opacity: p }}>
              {read.say}
            </div>
          )}
        </div>

        <div style={{ position: 'absolute', left: 80 + fw + 70, right: 80, top: 170, display: 'flex', flexDirection: 'column', gap: 34 }}>
          {questions.map((q) => {
            const now = read.labels[q];
            const before = prev.labels[q] ?? now;
            const top = Object.entries(now).sort((a, b) => b[1] - a[1]).slice(0, 3);
            return (
              <div key={q}>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 12 }}>
                  {nice(q)}
                </div>
                {top.map(([k, v], j) => {
                  const shown = (before[k] ?? 0) + (v - (before[k] ?? 0)) * p;
                  return (
                    <div key={k} style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, fontWeight: j === 0 ? 600 : 400, color: j === 0 ? '#fff' : 'rgba(255,255,255,.7)' }}>
                        <span>{nice(k)}</span>
                        <span>{Math.round(shown * 100)}%</span>
                      </div>
                      <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,.1)', marginTop: 6 }}>
                        <div style={{ width: `${shown * 100}%`, height: 8, borderRadius: 4, background: j === 0 ? AMBER : 'rgba(255,255,255,.35)' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {seg.kind === 'result' && (() => {
        const ch = run.chapters[seg.c];
        const a = spring({ frame: (t - seg.start) * fps, fps, config: { damping: 200 }, durationInFrames: 12 });
        return (
          <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', background: `rgba(26,10,28,${0.82 * a})` }}>
            <div style={{ opacity: a, transform: `scale(${0.96 + 0.04 * a})`, textAlign: 'center' }}>
              <div style={{ fontSize: 30, color: AMBER, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>{ch.title}</div>
              <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 64, marginTop: 14, maxWidth: 1400 }}>{ch.result}</div>
            </div>
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};
