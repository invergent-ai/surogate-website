import React from "react";
import { interpolate } from "remotion";
import { Text } from "./kit";
import { useEnterAt } from "./motion";
import { c } from "./tokens";

/**
 * "Choose a source" — the product uses this same grid twice, for deploying a
 * model and for creating a dataset, so the film has it once.
 */
export type Source = {
  name: string;
  desc: string;
  /** A glyph, not a logo — the real icons live in the running app. */
  mark: string;
};

export const SourceCard: React.FC<{
  source: Source;
  at: number;
  picked: boolean;
  minHeight?: number;
}> = ({ source, at, picked, minHeight = 168 }) => {
  const s = useEnterAt(at);
  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${picked ? c.amber : c.border}`,
        borderRadius: 16,
        padding: "22px 24px",
        minHeight,
        boxShadow: picked
          ? "0 30px 70px rgba(0,0,0,0.5), 0 0 60px rgba(245,158,11,0.28)"
          : "0 24px 60px rgba(0,0,0,0.45)",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [18, 0])}px) scale(${
          (picked ? 1.02 : 1) * (0.97 + s * 0.03)
        })`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: c.amber50,
          color: c.amber600,
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {source.mark}
      </div>
      <Text size={21} weight={600} style={{ marginTop: 14 }}>
        {source.name}
      </Text>
      <Text size={16} muted style={{ marginTop: 8, lineHeight: 1.4 }}>
        {source.desc}
      </Text>
      <Text size={16} style={{ color: c.amber, fontWeight: 500, marginTop: 12 }}>
        {picked ? "✓ Chosen" : "Choose →"}
      </Text>
    </div>
  );
};
