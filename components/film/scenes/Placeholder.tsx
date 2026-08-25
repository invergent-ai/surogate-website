import React from "react";
import { AbsoluteFill } from "remotion";
import { Panel, Stage } from "../ui/Stage";
import { Text } from "../ui/kit";
import { Enter } from "../ui/motion";
import { c } from "../ui/tokens";
import { serif } from "../font";
import type { Shot } from "../shots";

/**
 * A shot whose scene isn't built yet — staged like the rest, so the film keeps
 * one visual language end to end and pacing stays judgeable while scenes land.
 */
export const Placeholder: React.FC<{ shot: Shot }> = ({ shot }) => (
  <Stage glow={{ x: 0.5, y: 0.45 }}>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Enter>
        <Panel width={860} style={{ padding: "52px 56px", textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 3.4,
              textTransform: "uppercase",
              color: c.amber,
              marginBottom: 16,
            }}
          >
            Shot {shot.id}
          </div>
          <div
            style={{
              fontFamily: serif,
              fontSize: 40,
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            {shot.name}
          </div>
          <Text size={19} muted style={{ lineHeight: 1.6 }}>
            {shot.build}
          </Text>
        </Panel>
      </Enter>
    </AbsoluteFill>
  </Stage>
);
