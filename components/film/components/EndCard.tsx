import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { sans, serif } from "../font";
import { theme } from "../theme";

/**
 * Shot 12. The only thing in the film that isn't a screen capture.
 * Held two full seconds — a URL nobody has time to read is a wasted end card.
 */
export const EndCard: React.FC<{
  /**
   * Skip the entrance and render the settled state. <Still> always renders
   * frame 0, where the springs are still at zero — without this the poster
   * comes out as an empty black rectangle.
   */
  settled?: boolean;
}> = ({ settled }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const at = (offset: number) =>
    settled ? 1 : spring({ frame: frame - offset, fps, config: { damping: 200 } });

  const enter = at(0);
  const lift = interpolate(enter, [0, 1], [22, 0]);
  const sub = at(8);
  const url = at(16);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.ink,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: sans,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: serif,
            fontSize: 132,
            fontWeight: 600,
            letterSpacing: -3,
            color: theme.paper,
            opacity: enter,
            transform: `translateY(${lift}px)`,
          }}
        >
          Surogate
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 46,
            color: theme.muted,
            opacity: sub,
          }}
        >
          The agent factory
        </div>
        <div
          style={{
            marginTop: 54,
            fontSize: 38,
            letterSpacing: 1,
            color: theme.accent,
            opacity: url,
          }}
        >
          surogate.ai
        </div>
      </div>
    </AbsoluteFill>
  );
};
