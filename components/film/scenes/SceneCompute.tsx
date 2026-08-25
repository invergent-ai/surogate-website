import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Pill, Text } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { mono, sans } from "../font";

/**
 * Compute.
 *
 * Where the training run is about to happen. The provider grid is the product's
 * own "Connect a provider" screen — same nine, same one-line descriptions, same
 * order — and then one is picked and the instance the Default account offers
 * lands underneath.
 *
 * Marks are monograms in each provider's colour rather than the real logos,
 * matching the tools beat: the logos live in the running app, not in this repo.
 */

const PROVIDERS = [
  { name: "AWS", desc: "Broadest GPU instance selection", mark: "a", tint: "#ff9900" },
  { name: "Azure", desc: "Enterprise-grade GPU VMs", mark: "A", tint: "#0078d4" },
  { name: "GCP", desc: "TPUs & fast networking", mark: "G", tint: "#4285f4" },
  { name: "RunPod", desc: "Per-second billing GPU pods", mark: "R", tint: "#673ab7" },
  { name: "Modal", desc: "Serverless GPUs, scale to zero", mark: "M", tint: "#7fee64", ink: "#0b3d16" },
  { name: "Nebius", desc: "EU-based NVIDIA GPU cloud", mark: "N", tint: "#1f2328" },
  { name: "Oracle Cloud (OCI)", desc: "Bare-metal RDMA GPU clusters", mark: "O", tint: "#c74634" },
  { name: "Vast.ai", desc: "Cheapest GPU marketplace", mark: "V", tint: "#1f2328" },
  { name: "SSH / On-prem", desc: "Bring your own GPU servers", mark: "$", tint: "#7c6d67" },
] as const;

/** The one the run lands on. */
const PICK = 4;

const AUTHORED = 5;

export const SceneCompute: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const pickAt = t(56);
  const offerAt = t(70);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.94, focus: { x: 0.5, y: 0.5 } },
          { at: pickAt - t(8), over: t(26), scale: 1.06, focus: { x: 0.5, y: 0.54 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 1120 }}>
            <Heading size={26} style={{ color: "#fff", marginBottom: 18 }}>
              Connect a provider
            </Heading>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              {PROVIDERS.map((p, i) => (
                <ProviderCard
                  key={p.name}
                  provider={p}
                  at={t(4 + i * 4)}
                  picked={i === PICK && frame >= pickAt}
                />
              ))}
            </div>

            {frame >= offerAt ? <Offer at={offerAt} /> : null}
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const ProviderCard: React.FC<{
  provider: (typeof PROVIDERS)[number];
  at: number;
  picked: boolean;
}> = ({ provider, at, picked }) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${picked ? c.amber : c.border}`,
        borderRadius: 14,
        padding: "18px 20px",
        boxShadow: picked
          ? "0 30px 70px rgba(0,0,0,0.5), 0 0 60px rgba(245,158,11,0.3)"
          : "0 24px 60px rgba(0,0,0,0.45)",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [18, 0])}px) scale(${
          (picked ? 1.03 : 1) * (0.97 + s * 0.03)
        })`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: provider.tint,
            color: "ink" in provider ? provider.ink : "#fff",
            fontFamily: mono,
            fontSize: 19,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {provider.mark}
        </div>
        <Text size={19} weight={600} style={{ flex: 1 }}>
          {provider.name}
        </Text>
        {picked ? (
          <Pill tone="success" style={{ fontSize: 14, padding: "5px 12px" }}>
            ✓ Selected
          </Pill>
        ) : null}
      </div>
      <Text size={15} muted style={{ marginTop: 10 }}>
        {provider.desc}
      </Text>
    </div>
  );
};

/** What the picked provider is offering for this run. */
const Offer: React.FC<{ at: number }> = ({ at }) => {
  const s = useSpringAt(at);
  return (
    <Panel
      width="100%"
      hot
      at={at}
      style={{
        marginTop: 16,
        padding: "18px 24px",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <Text size={18} weight={500} style={{ flex: 1 }}>
          Default
        </Text>
        <span style={{ fontFamily: mono, fontSize: 18 }}>NVIDIA H200 SXM</span>
        <span
          style={{
            fontFamily: sans,
            fontSize: 18,
            fontWeight: 600,
            background: c.amber50,
            color: c.amber600,
            borderRadius: radius,
            padding: "8px 14px",
          }}
        >
          $0.001261 / sec
        </span>
      </div>
    </Panel>
  );
};
