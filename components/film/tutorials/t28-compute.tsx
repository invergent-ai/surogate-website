import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { mono, sans } from "../font";
import { Heading, Text } from "../ui/kit";
import { useEnterAt, useTimeScale } from "../ui/motion";
import { Panel, Stage } from "../ui/Stage";
import { c, radius } from "../ui/tokens";

/**
 * Tutorial 28 — Bring your own compute.
 *
 * Standalone. The premise is the one every training run runs into: it needs
 * GPUs, and the ones you want are in an account you already pay for.
 *
 * RunPod is the worked example because its connect flow is the shortest — one
 * API key — so the video spends its time on the shape of the thing rather than
 * on a provider's paperwork. The last step shows SSH, for machines that are
 * already yours.
 *
 * Screens from `compute-data.ts` (`SUPPORTED_PROVIDERS` and their taglines),
 * `connect-cloud-page.tsx`, `connect-instructions.ts`, `connect-runpod.tsx`,
 * `connect-success.tsx`, `backend-offers-page.tsx` and `connect-ssh.tsx`.
 */

const GREEN = "#22C55E";

/* ── the job ────────────────────────────────────────────────────── */

/**
 * The compute picker as it actually arrives: **Default** already selected, and
 * the GPUs that come with it.
 *
 * `modal-platform` is the platform's own workspace — "infrastructure, not
 * something the user connected", per `cloud-tab.tsx` — and `provider-label.ts`
 * maps it to "Default". The shot names the hardware rather than the vendor
 * behind it, because the vendor is an implementation detail and the GPU list is
 * the thing a viewer is actually deciding against.
 */
const DEFAULT_GPUS = [
  "B300",
  "B200",
  "H200 SXM",
  "H100 SXM5",
  "RTX PRO 6000",
  "A100 80 GB",
  "A100 40 GB",
  "L40S",
  "A10",
  "L4",
  "T4",
];

export const SceneComputeDefault: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(5);
  const head = useEnterAt(t(3), 12);
  const label = useEnterAt(t(20), 10);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1420} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ opacity: head }}>
            <Text size={17} weight={500} style={{ marginBottom: 9 }}>
              Compute
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${c.border}`,
                borderRadius: 9,
                background: "rgba(12,10,9,0.04)",
                padding: "11px 15px",
              }}
            >
              <span style={{ flex: 1, fontFamily: sans, fontSize: 17 }}>Default</span>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2.4}>
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <Text
            size={14}
            muted
            style={{
              marginTop: 18,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: label,
            }}
          >
            GPUs on the default compute
          </Text>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 11 }}>
            {DEFAULT_GPUS.map((gpu, i) => {
              /* chips land left to right — one enter per chip would be eleven
                 hooks in a map, which React does not allow */
              const enter = Math.max(
                0,
                Math.min(1, (frame - t(24 + i * 4)) / t(8)),
              );
              return (
                <span
                  key={gpu}
                  style={{
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: 7,
                    border: `1px solid ${c.border}`,
                    borderRadius: 9,
                    padding: "9px 15px",
                    opacity: enter,
                    transform: `translateY(${(1 - enter) * 6}px)`,
                  }}
                >
                  <span style={{ fontFamily: sans, fontSize: 14, color: c.mutedFg }}>
                    Nvidia
                  </span>
                  <span style={{ fontFamily: sans, fontSize: 17, fontWeight: 500 }}>
                    {gpu}
                  </span>
                </span>
              );
            })}
          </div>

        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/** A provider mark from `public/providers/`, sized to sit in a chip. */
const Logo: React.FC<{ file?: string; alt: string }> = ({ file, alt }) => (
  <span
    style={{
      display: "flex",
      width: 34,
      height: 34,
      flex: "0 0 auto",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 9,
      background: "rgba(12,10,9,0.05)",
      overflow: "hidden",
    }}
  >
    {file ? (
      <Img
        src={staticFile(`providers/${file}`)}
        alt={alt}
        style={{ height: 19, maxWidth: 24, objectFit: "contain" }}
      />
    ) : (
      /* SSH has no logo in the catalogue — the page falls back to a server
         glyph, so this does too. */
      <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="8" x="2" y="2" rx="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" />
        <path d="M6 6h.01M6 18h.01" />
      </svg>
    )}
  </span>
);

/* ── step 1 · choose a provider ─────────────────────────────────── */

/** `SUPPORTED_PROVIDERS` — nine of them, taglines quoted from the file. */
const PROVIDERS: [string, string, string | undefined][] = [
  ["Amazon Web Services", "Broadest GPU instance selection", "aws-light.svg"],
  ["Microsoft Azure", "Enterprise-grade GPU VMs", "azure-light.svg"],
  ["Google Cloud Platform", "TPUs & fast networking", "gcp-light.svg"],
  ["RunPod", "Per-second billing GPU pods", "runpod-mark-light.svg"],
  ["Modal", "Serverless GPUs, scale to zero", "modal.svg"],
  ["Nebius", "EU-based NVIDIA GPU cloud", "nebius-mark-light.svg"],
  ["Oracle Cloud (OCI)", "Bare-metal RDMA GPU clusters", "oci.svg"],
  ["Vast.ai", "Cheapest GPU marketplace", "vastai-light.svg"],
  ["SSH / On-prem", "Bring your own GPU servers", undefined],
];

export const SceneComputeProviders: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 10);
  const cards = [
    useEnterAt(t(12), 9),
    useEnterAt(t(17), 9),
    useEnterAt(t(22), 9),
    useEnterAt(t(27), 9),
    useEnterAt(t(32), 9),
    useEnterAt(t(37), 9),
    useEnterAt(t(42), 9),
    useEnterAt(t(47), 9),
    useEnterAt(t(52), 9),
  ];
  const pick = useEnterAt(t(80), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ opacity: head }}>
            <Heading size={25}>Compute</Heading>
            <Text size={17} muted style={{ marginTop: 4 }}>
              Cloud GPU providers and the workload queue.
            </Text>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginTop: 20,
            }}
          >
            {PROVIDERS.map(([name, tagline, logo], i) => {
              const on = name === "RunPod" ? pick : 0;
              return (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    gap: 13,
                    alignItems: "center",
                    border: `1px solid ${on ? c.amber : c.border}`,
                    boxShadow: on ? `0 0 0 1px ${c.amber}` : "none",
                    borderRadius: radius,
                    padding: "13px 16px",
                    opacity: cards[i],
                    transform: `translateY(${(1 - cards[i]) * 8}px)`,
                  }}
                >
                  <Logo file={logo} alt={name} />
                  <div style={{ minWidth: 0 }}>
                    <Text size={16} weight={600}>
                      {name}
                    </Text>
                    <Text size={14} muted style={{ marginTop: 2 }}>
                      {tagline}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 2 · paste one key ─────────────────────────────────────── */

/**
 * `connect-cloud-page.tsx`: a 600px column with the provider's header, its
 * instructions in a collapsible block, then the form.
 *
 * The instructions are `connect-instructions.ts` verbatim — RunPod's are five
 * steps and the last one matters: the key is only shown once.
 */
const STEPS: string[] = [
  "Sign in to the RunPod Console",
  "Open Settings from the sidebar and expand the API Keys section",
  "Click Create API Key, name it, and select the Read & Write permission",
  "Copy the generated key — it is only shown once",
  "Paste it below and click Connect",
];

export const SceneComputeConnect: React.FC = () => {
  const t = useTimeScale(8);
  const head = useEnterAt(t(3), 10);
  const open = useEnterAt(t(14), 12);
  const rows = [
    useEnterAt(t(24), 9),
    useEnterAt(t(32), 9),
    useEnterAt(t(40), 9),
    useEnterAt(t(48), 9),
    useEnterAt(t(56), 9),
  ];
  const key = useEnterAt(t(86), 12);
  const community = useEnterAt(t(110), 12);
  const go = useEnterAt(t(140), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={940} hot at={0} style={{ padding: "24px 30px 26px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13, opacity: head }}>
            <Logo file="runpod-mark-light.svg" alt="RunPod" />
            <div style={{ flex: 1 }}>
              <Text size={18} weight={600}>
                RunPod
              </Text>
              <Text size={15} muted>
                Per-second billing GPU pods
              </Text>
            </div>
            <Text size={15} muted>
              Change
            </Text>
          </div>

          {/* the provider's own instructions, expanded */}
          <div
            style={{
              border: `1px solid ${c.border}`,
              borderRadius: 11,
              padding: "14px 18px",
              marginTop: 18,
              opacity: open,
            }}
          >
            <Text size={15} muted style={{ marginBottom: 8 }}>
              To connect your RunPod account to Surogate, please perform the
              following steps:
            </Text>
            {STEPS.map((line, i) => (
              <div key={line} style={{ display: "flex", gap: 11, padding: "3px 0", opacity: rows[i] }}>
                <span style={{ fontFamily: sans, fontSize: 15, color: c.mutedFg, width: 18, flex: "0 0 auto" }}>
                  {i + 1}.
                </span>
                <Text size={15} muted style={{ lineHeight: 1.5 }}>
                  {line}
                </Text>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, opacity: key }}>
            <Text size={16} weight={500} style={{ marginBottom: 8 }}>
              API Key
            </Text>
            <div
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 9,
                padding: "11px 15px",
                fontFamily: mono,
                fontSize: 18,
                letterSpacing: "0.18em",
                color: "rgba(12,10,9,0.65)",
              }}
            >
              ••••••••••••••••••••
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 18,
              opacity: community,
            }}
          >
            <div style={{ flex: 1 }}>
              <Text size={16} weight={500}>
                Include Community Cloud
              </Text>
              <Text size={14} muted style={{ marginTop: 3, lineHeight: 1.5 }}>
                Adds Community Cloud GPU offers in addition to Secure Cloud.
                Community Cloud is cheaper but less reliable.
              </Text>
            </div>
            <Toggle on />
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 20,
              paddingTop: 18,
              borderTop: `1px solid ${c.border}`,
              opacity: go,
            }}
          >
            <span
              style={{
                background: c.amber,
                color: "#000",
                borderRadius: 9,
                padding: "10px 22px",
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Connect
            </span>
            <span
              style={{
                border: `1px solid ${c.border}`,
                borderRadius: 9,
                padding: "10px 22px",
                fontFamily: sans,
                fontSize: 16,
                color: c.mutedFg,
              }}
            >
              Cancel
            </span>
          </div>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 3 · what it actually offers ───────────────────────────── */

/**
 * `backend-offers-page.tsx` — "RunPod — Available Instances" over the offer
 * table every GPU picker in the product shares: Instance, GPU, vCPUs, RAM,
 * Region, $/hr.
 */
const OFFERS: [string, string, string, string, string, string, boolean][] = [
  ["NVIDIA A40", "1× A40 (48 GB)", "9", "50 GB", "US-OR", "0.39", false],
  ["NVIDIA L40S", "1× L40S (48 GB)", "16", "125 GB", "EU-RO", "0.86", false],
  ["NVIDIA H100 PCIe", "1× H100 (80 GB)", "16", "188 GB", "US-KS", "1.99", true],
  ["NVIDIA H100 SXM", "2× H100 (80 GB)", "40", "376 GB", "US-KS", "5.98", false],
];

export const SceneComputeOffers: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 10);
  const cols = useEnterAt(t(14), 10);
  const rows = [
    useEnterAt(t(24), 9),
    useEnterAt(t(32), 9),
    useEnterAt(t(40), 9),
    useEnterAt(t(48), 9),
  ];
  const note = useEnterAt(t(84), 12);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={1560} hot at={0} style={{ padding: "26px 32px 28px" }}>
          <div style={{ opacity: head }}>
            <Heading size={25}>RunPod — Available Instances</Heading>
            <Text size={17} muted style={{ marginTop: 4 }}>
              GPU and CPU instances available from this backend
            </Text>
          </div>

          <div
            style={{
              border: `1px solid ${c.border}`,
              borderRadius: 11,
              overflow: "hidden",
              marginTop: 20,
              opacity: cols,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "9px 16px",
                borderBottom: `1px solid ${c.border}`,
                background: "rgba(12,10,9,0.03)",
              }}
            >
              {["Instance", "GPU", "vCPUs", "RAM", "Region", "$/hr"].map((h, i) => (
                <span
                  key={h}
                  style={{
                    flex: i === 0 ? 1 : `0 0 ${[0, 220, 100, 120, 130, 110][i]}px`,
                    fontFamily: sans,
                    fontSize: 14,
                    color: c.mutedFg,
                    textAlign: i === 5 ? "right" : "left",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {OFFERS.map(([inst, gpu, cpus, ram, region, price, spot], i) => (
              <div
                key={inst}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderBottom: i === OFFERS.length - 1 ? "none" : `1px solid ${c.border}`,
                  opacity: rows[i],
                }}
              >
                <span style={{ flex: 1, fontFamily: mono, fontSize: 15 }}>{inst}</span>
                <span style={{ flex: "0 0 220px", fontFamily: sans, fontSize: 15 }}>{gpu}</span>
                {[cpus, ram, region].map((v, k) => (
                  <span
                    key={v}
                    style={{
                      flex: `0 0 ${[100, 120, 130][k]}px`,
                      fontFamily: sans,
                      fontSize: 15,
                      color: c.mutedFg,
                    }}
                  >
                    {v}
                  </span>
                ))}
                <span style={{ flex: "0 0 110px", textAlign: "right", fontFamily: mono, fontSize: 15 }}>
                  ${price}
                  {spot ? (
                    <span style={{ fontFamily: sans, fontSize: 12, color: c.mutedFg }}> spot</span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>

          <Text size={16} muted style={{ marginTop: 16, lineHeight: 1.5, opacity: note }}>
            These are live prices from your own account. Spot rows are cheaper
            and can be taken back mid-run.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── step 4 · machines you already own ──────────────────────────── */

/**
 * `connect-ssh.tsx`. The ninth provider is not a provider: it is a host list.
 * No account, no API key, no per-hour price — just a user, a port, a key and
 * the machines.
 */
export const SceneComputeSsh: React.FC = () => {
  const t = useTimeScale(6);
  const head = useEnterAt(t(3), 12);
  const fields = [useEnterAt(t(18), 10), useEnterAt(t(28), 10), useEnterAt(t(38), 10)];
  const host = useEnterAt(t(56), 12);
  const note = useEnterAt(t(86), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Panel width={940} hot at={0} style={{ padding: "24px 30px 28px" }}>
          <div style={{ opacity: head }}>
            <Text size={18} weight={600}>
              SSH / On-prem
            </Text>
            <Text size={15} muted style={{ marginTop: 2 }}>
              Bring your own GPU servers
            </Text>
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
            <div style={{ flex: 1, opacity: fields[0] }}>
              <SshField label="SSH user" value="ubuntu" />
            </div>
            <div style={{ flex: "0 0 200px", opacity: fields[1] }}>
              <SshField label="SSH port" value="22" />
            </div>
          </div>

          <div style={{ marginTop: 16, opacity: fields[2] }}>
            <SshField label="SSH private key" value="-----BEGIN OPENSSH PRIVATE KEY-----" mono />
          </div>

          <div style={{ marginTop: 16, opacity: host }}>
            <SshField label="Host" value="10.0.0.1" mono />
          </div>

          <Text size={16} muted style={{ marginTop: 18, lineHeight: 1.55, opacity: note }}>
            No account and no hourly rate — the machines are already yours.
            Surogate just needs to be able to reach them.
          </Text>
        </Panel>
      </AbsoluteFill>
    </Stage>
  );
};

const SshField: React.FC<{ label: string; value: string; mono?: boolean }> = ({
  label,
  value,
  mono: isMono,
}) => (
  <div>
    <Text size={15} weight={500} style={{ marginBottom: 7 }}>
      {label}
    </Text>
    <div
      style={{
        border: `1px solid ${c.border}`,
        borderRadius: 9,
        padding: "11px 15px",
        fontFamily: isMono ? mono : sans,
        fontSize: isMono ? 15 : 17,
        color: c.foreground,
      }}
    >
      {value}
    </div>
  </div>
);

/* ── the payoff ─────────────────────────────────────────────────── */

/**
 * The backend turns up in two places, and the video would be half-told without
 * the second.
 *
 * A training run picks it in the Compute field (`new-run-page.tsx`), and a
 * served model picks it in its **Deployment configuration** card
 * (`features/models/config-tab.tsx`) — the same `ComputePicker`, beside the
 * Engine toggle. Serving settings there are "locked while serving — Stop to
 * edit", which is the one caveat worth carrying.
 */
export const SceneComputePayoff: React.FC = () => {
  const t = useTimeScale(6);
  const train = useEnterAt(t(3), 12);
  const offer = useEnterAt(t(26), 12);
  const serve = useEnterAt(t(54), 12);
  const engine = useEnterAt(t(78), 12);
  const note = useEnterAt(t(104), 14);

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
          {/* a training run */}
          <Panel width={720} hot at={0} style={{ padding: "22px 26px 24px" }}>
            <Text size={14} muted style={{ letterSpacing: "0.08em", textTransform: "uppercase", opacity: train }}>
              New training run
            </Text>
            <div style={{ marginTop: 14, opacity: train }}>
              <Text size={16} weight={500} style={{ marginBottom: 8 }}>
                Compute
              </Text>
              <Select value="RunPod" />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${c.amber}`,
                background: `${c.amber}12`,
                borderRadius: 9,
                padding: "11px 15px",
                marginTop: 10,
                opacity: offer,
              }}
            >
              <span style={{ flex: 1, fontFamily: mono, fontSize: 15 }}>
                NVIDIA H100 PCIe
              </span>
              <span style={{ fontFamily: mono, fontSize: 15, fontWeight: 600 }}>$1.99</span>
            </div>
          </Panel>

          {/* and a served model */}
          <Panel width={720} hot at={0} style={{ padding: "22px 26px 24px" }}>
            <Text size={14} muted style={{ letterSpacing: "0.08em", textTransform: "uppercase", opacity: serve }}>
              Deployment configuration
            </Text>
            <div style={{ marginTop: 14, opacity: serve }}>
              <Text size={16} weight={500} style={{ marginBottom: 8 }}>
                Compute
              </Text>
              <Select value="RunPod" />
            </div>
            <div style={{ marginTop: 14, opacity: engine }}>
              <Text size={16} weight={500} style={{ marginBottom: 8 }}>
                Engine
              </Text>
              <div
                style={{
                  display: "flex",
                  background: "rgba(12,10,9,0.05)",
                  borderRadius: 9,
                  padding: 3,
                }}
              >
                {["vLLM", "llama.cpp"].map((k, i) => (
                  <span
                    key={k}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "8px 0",
                      borderRadius: 7,
                      fontFamily: sans,
                      fontSize: 16,
                      fontWeight: i === 0 ? 600 : 400,
                      background: i === 0 ? c.card : "transparent",
                      color: i === 0 ? c.foreground : c.mutedFg,
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        <Text
          size={18}
          style={{
            marginTop: 26,
            textAlign: "center",
            maxWidth: 1400,
            lineHeight: 1.5,
            color: c.card,
            opacity: note,
          }}
        >
          One connection, both jobs — though a model&apos;s settings are locked
          while it is serving, so stop it before you switch.
        </Text>
      </AbsoluteFill>
    </Stage>
  );
};

const Select: React.FC<{ value: string }> = ({ value }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      border: `1px solid ${c.border}`,
      borderRadius: 9,
      background: "rgba(12,10,9,0.04)",
      padding: "11px 15px",
    }}
  >
    <span style={{ flex: 1, fontFamily: sans, fontSize: 17 }}>{value}</span>
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={c.mutedFg} strokeWidth={2.4}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const Toggle: React.FC<{ on?: boolean }> = ({ on }) => (
  <div
    style={{
      width: 38,
      height: 21,
      borderRadius: 999,
      background: on ? c.amber : "rgba(12,10,9,0.16)",
      position: "relative",
      flex: "0 0 auto",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 2.5,
        left: on ? 19.5 : 2.5,
        width: 16,
        height: 16,
        borderRadius: 999,
        background: "#fff",
      }}
    />
  </div>
);
