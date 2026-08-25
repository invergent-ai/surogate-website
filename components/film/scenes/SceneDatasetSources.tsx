import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Stage } from "../ui/Stage";
import { Heading } from "../ui/kit";
import { useTimeScale } from "../ui/motion";
import { SourceCard, type Source } from "../ui/SourceGrid";

/**
 * Where a dataset comes from.
 *
 * Four routes in, the product's own cards and copy. Real chats is the one the
 * next beat follows, but the point of this shot is that it is one of four — a
 * platform you can bring your own data to, not a closed loop.
 */

const SOURCES: Source[] = [
  {
    name: "From chats",
    desc: "Turn real chats with your agents into supervised training pairs.",
    mark: "💬",
  },
  {
    name: "Upload files",
    desc: "Bring your own JSONL, CSV, or plain-text files.",
    mark: "↑",
  },
  {
    name: "Generate synthetic",
    desc: "Create data with a teacher model, filtered by a judge.",
    mark: "⚡",
  },
  {
    name: "Import repository",
    desc: "Pull an existing dataset repository from the Hugging Face Hub.",
    mark: "⇩",
  },
];

const PICK = 0;
const AUTHORED = 4;
const PICK_AT = 46;

export const SceneDatasetSources: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: t(PICK_AT) - t(8), over: t(24), scale: 1.04, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 1020 }}>
            <Heading size={26} style={{ color: "#fff", marginBottom: 18 }}>
              Create a dataset
            </Heading>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
              }}
            >
              {SOURCES.map((s, i) => (
                <SourceCard
                  key={s.name}
                  source={s}
                  at={t(4 + i * 7)}
                  picked={i === PICK && frame >= t(PICK_AT)}
                />
              ))}
            </div>
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};
