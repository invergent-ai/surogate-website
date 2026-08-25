import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Camera } from "../ui/Camera";
import { Panel, Stage } from "../ui/Stage";
import { Heading, Text, Toggle } from "../ui/kit";
import { useSpringAt, useTimeScale } from "../ui/motion";
import { c, radius } from "../ui/tokens";
import { sans } from "../font";

/**
 * Users.
 *
 * The people who can talk to a published agent, which is a different list from
 * the team who build it — that distinction is the whole screen, and the product
 * says it in the subtitle, so the beat leads with it.
 *
 * Accounts are fictional. The real screen shows colleagues' addresses, and none
 * of that belongs in a marketing video.
 */

type User = { email: string; name: string; auth: string; added: string };

const USERS: User[] = [
  {
    email: "ana@northwind.example",
    name: "Ana",
    auth: "Email & password",
    added: "added 2 months ago",
  },
  {
    email: "tom@northwind.example",
    name: "Tom",
    auth: "Google",
    added: "added 1 month ago",
  },
  {
    email: "priya@northwind.example",
    name: "Priya",
    auth: "Email & password",
    added: "added 3 weeks ago",
  },
];

const INVITED: User = {
  email: "sam@northwind.example",
  name: "Sam",
  auth: "Invite sent",
  added: "added just now",
};

const AUTHORED = 5;
const ADD_AT = 74;

export const SceneUsers: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTimeScale(AUTHORED);
  const addAt = t(ADD_AT);
  const added = frame >= addAt;

  return (
    <Stage glow={{ x: 0.5, y: 0.42 }}>
      <Camera
        moves={[
          { at: 0, over: 1, scale: 0.91, focus: { x: 0.5, y: 0.5 } },
          { at: addAt - t(10), over: t(26), scale: 0.96, focus: { x: 0.5, y: 0.5 } },
        ]}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Panel width={1240} hot at={0} style={{ padding: "24px 32px 22px" }}>
            <Heading size={26}>Users</Heading>
            <Text size={17} muted style={{ marginTop: 7 }}>
              People who can chat with this agent — separate from your team.
            </Text>

            {/* Public signup, off until it is configured. */}
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              <div style={{ transform: "scale(1.3)", transformOrigin: "left top", marginTop: 3 }}>
                <Toggle on={false} />
              </div>
              <div style={{ marginLeft: 14 }}>
                <Text size={18} muted>
                  Let anyone sign up
                </Text>
                <Text size={16} muted style={{ marginTop: 4 }}>
                  Lets visitors create their own account and chat — no invite needed.
                </Text>
                <Text size={16} style={{ marginTop: 4, color: c.amber }}>
                  Set up in Settings{" "}
                  <span style={{ color: c.mutedFg }}>to turn this on</span>
                </Text>
              </div>
            </div>

            {/* Search + add. */}
            <div style={{ display: "flex", gap: 14, marginTop: 16 }}>
              <div
                style={{
                  flex: 1,
                  background: c.secondary,
                  border: `1px solid ${c.border}`,
                  borderRadius: radius,
                  padding: "13px 18px",
                  fontFamily: sans,
                  fontSize: 17,
                  color: c.mutedFg,
                }}
              >
                Search users…
              </div>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#3b2a06",
                  background: c.amber,
                  borderRadius: radius,
                  padding: "13px 22px",
                  whiteSpace: "nowrap",
                  boxShadow: added ? undefined : "0 0 26px rgba(245,158,11,0.35)",
                }}
              >
                + Add user
              </span>
            </div>

            <div style={{ marginTop: 12 }}>
              {added ? <Row user={INVITED} at={addAt} fresh /> : null}
              {USERS.map((user, i) => (
                <Row key={user.email} user={user} at={t(8 + i * 8)} />
              ))}
            </div>
          </Panel>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};

const Row: React.FC<{ user: User; at: number; fresh?: boolean }> = ({
  user,
  at,
  fresh,
}) => {
  const s = useSpringAt(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: fresh ? c.green50 : c.secondary,
        border: `1px solid ${fresh ? "rgba(34,197,94,0.35)" : "transparent"}`,
        borderRadius: 12,
        padding: "13px 22px",
        marginBottom: 8,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [-14, 0])}px)`,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <Text size={19} weight={500}>
            {user.email}
          </Text>
          <span
            style={{
              fontFamily: sans,
              fontSize: 14,
              color: c.mutedFg,
              border: `1px solid ${c.border}`,
              borderRadius: 6,
              padding: "3px 9px",
            }}
          >
            Unassigned
          </span>
        </div>
        <Text size={16} muted style={{ marginTop: 5 }}>
          {user.name} · {user.auth} · {user.added}
        </Text>
      </div>
      <Text size={16} style={{ color: c.amber }}>
        Edit
      </Text>
      <Text size={16}>Disable</Text>
      <Text size={16} style={{ color: c.destructive }}>
        Delete
      </Text>
    </div>
  );
};
