"""AI Gateway: callers on the left, the gateway in the middle, providers on the right. One request
comes in, the gateway maps its model name, checks the budget and runs the guardrail, the first
provider fails, the call moves on to the next, and the answer goes back. Flat SVG, one CSS loop;
reduced motion shows the finished frame, the first provider failed and the second answering.

  python3 gateway_anim.py OUT.svg
"""
import math
import pathlib
import sys

W, H = 1400, 560
AUB, YEL, OR, WINE, POW, PAPER, LINE, GRAPH = "#2a102d", "#ffe845", "#ffaf10", "#9b1f61", "#bdccd4", "#faf9f7", "#e6e3eb", "#403e4a"
CARD, CARDLINE = "#ebe4ee", "#dcd2e1"
RABBIT = (pathlib.Path(__file__).parent / "rabbit_paths.txt").read_text().split("\n")
T = 12
P = "gw-"  # every class and id carries this prefix: the page inlines the SVG
o, css = [], []


def rect(x, y, w, h, fill, extra=""):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"{extra}/>'


def bar(x, y, w, h=6, op=0.7, col=AUB, extra=""):
    return rect(x, y, w, h, col, f' fill-opacity="{op}"{extra}')


def agent(x, y, size):
    k = size * 0.72 / 72.72
    return (rect(x, y, size, size, OR)
            + f'<g transform="translate({x + (size - 71.04 * k) / 2:.2f} {y + (size - 72.72 * k) / 2:.2f}) scale({k:.4f})">'
            f'<path d="{RABBIT[0]}" fill="{AUB}"/><path d="{RABBIT[1]}" fill="{OR}"/><path d="{RABBIT[2]}" fill="{OR}"/></g>')


def person(cx, cy, r):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#ffffff" stroke="{GRAPH}" stroke-width="1.3"/>'
            f'<circle cx="{cx}" cy="{cy - r * 0.22:.1f}" r="{r * 0.32:.1f}" fill="{GRAPH}"/>'
            f'<path d="M{cx - r * 0.6:.1f} {cy + r * 0.62:.1f} a{r * 0.6:.1f} {r * 0.5:.1f} 0 0 1 {r * 1.2:.1f} 0 Z" fill="{GRAPH}"/>')


def app_window(x, y, s):
    return (rect(x, y, s, s * 0.78, "#ffffff", f' stroke="{GRAPH}" stroke-width="1.3"')
            + rect(x, y, s, s * 0.18, GRAPH) + bar(x + 5, y + s * 0.34, s * 0.6, 3, 0.5, GRAPH) + bar(x + 5, y + s * 0.5, s * 0.4, 3, 0.35, GRAPH))


def kf(name, frames, timing=""):
    css.append(f"@keyframes {P}{name} {{ " + " ".join(f"{p}% {{ {v} }}" for p, v in frames) + " }")
    css.append(f".{P}{name} {{ animation: {P}{name} {T}s infinite {timing}; }}")


def at(pts, f):
    seg = [math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1)]
    d = f * sum(seg)
    for i, length in enumerate(seg):
        if d <= length or i == len(seg) - 1:
            u = d / length if length else 0
            return pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u
        d -= length


def travel(pts, start, end, steps=10):
    return [(round(start + (end - start) * s / steps, 2), at(pts, s / steps)) for s in range(steps + 1)]


o.append(rect(0, 0, W, H, PAPER))

# ------------------------------------------------------------ callers
CX, CW, CH = 60, 300, 104
cys = [80, 228, 376]
for k, cy in enumerate(cys):
    o.append(rect(CX, cy, CW, CH, "#ffffff", f' stroke="{CARDLINE}"'))
    if k == 0:
        o.append(rect(CX, cy, CW, CH, "none", f' stroke="{OR}" stroke-width="2" class="{P}c0"'))
        kf("c0", [(0, "opacity: 0;"), (84, "opacity: 0;"), (86, "opacity: 1;"), (96, "opacity: 1;"), (99, "opacity: 0;"), (100, "opacity: 0;")])
    icon = [lambda: agent(CX + 22, cy + 32, 40), lambda: person(CX + 42, cy + 52, 20), lambda: app_window(CX + 22, cy + 34, 40)][k]()
    o.append(icon)
    o.append(bar(CX + 80, cy + 34, 130, 7, 0.8) + bar(CX + 80, cy + 54, 170, 5, 0.25))
    # the caller's own key
    o.append(rect(CX + 80, cy + 70, 64, 16, AUB) + bar(CX + 88, cy + 76, 36, 4, 0.8, "#ffffff"))

# ------------------------------------------------------------ the gateway
GX, GY, GW, GH = 520, 40, 360, 480
o.append(f'<rect x="{GX}" y="{GY + 10}" width="{GW}" height="{GH}" fill="{AUB}" fill-opacity="0.10" filter="url(#{P}soft)"/>')
o.append(rect(GX, GY, GW, GH, "#ffffff", f' stroke="{AUB}" stroke-width="2.5"'))
o.append(rect(GX, GY, GW, 5, AUB))
o.append(bar(GX + 24, GY + 26, 120, 8, 0.9))
rows = [GY + 74, GY + 204, GY + 334]
for k, ry in enumerate(rows):
    o.append(rect(GX + 24, ry, GW - 48, 110, CARD, f' stroke="{CARDLINE}"'))
    o.append(rect(GX + 24, ry, GW - 48, 110, "none", f' stroke="{AUB}" stroke-width="2" class="{P}r{k}"'))
# 1. the public name maps to a model and provider
r = rows[0]
o.append(rect(GX + 44, r + 40, 92, 30, "#ffffff", f' stroke="{AUB}" stroke-width="1.5"') + bar(GX + 56, r + 52, 60, 6, 0.85))
o.append(f'<path d="M{GX + 146} {r + 55} H{GX + 196}" stroke="{AUB}" stroke-width="2"/>'
         f'<polygon points="{GX + 190},{r + 49} {GX + 190},{r + 61} {GX + 200},{r + 55}" fill="{AUB}"/>')
o.append(rect(GX + 206, r + 40, 110, 30, AUB) + bar(GX + 218, r + 52, 70, 6, 0.85, "#ffffff"))
# 2. the budget: a reservation lands on the month's bar
r = rows[1]
o.append(bar(GX + 44, r + 28, 110, 6, 0.6))
o.append(rect(GX + 44, r + 54, 272, 18, "#ffffff", f' stroke="{GRAPH}" stroke-width="1.3"'))
o.append(rect(GX + 44, r + 54, 150, 18, AUB))
o.append(rect(GX + 194, r + 54, 26, 18, OR, f' class="{P}res"'))
o.append(f'<line x1="{GX + 286}" y1="{r + 48}" x2="{GX + 286}" y2="{r + 78}" stroke="{WINE}" stroke-width="2"/>')
# 3. the guardrail: a shield that checks the request and the answer
r = rows[2]
sx, sy = GX + 64, r + 26
shield = f"M{sx} {sy} l26 10 v20 c0 18 -12 26 -26 32 c-14 -6 -26 -14 -26 -32 v-20 Z"
o.append(f'<path d="{shield}" fill="#ffffff" stroke="{AUB}" stroke-width="2"/>')
o.append(f'<path d="M{sx - 10} {sy + 30} l7 7 l14 -15" fill="none" stroke="{AUB}" stroke-width="2.5" class="{P}chk"/>')
o.append(bar(GX + 112, r + 36, 150, 7, 0.8) + bar(GX + 112, r + 56, 190, 5, 0.25) + bar(GX + 112, r + 70, 120, 5, 0.18))

# ------------------------------------------------------------ providers
PX, PW, PH = 1040, 300, 92
pys = [60, 182, 304, 426]
for k, py in enumerate(pys):
    o.append(rect(PX, py, PW, PH, "#ffffff", f' stroke="{CARDLINE}"'))
    o.append(bar(PX + 24, py + 28, 120, 7, 0.8) + bar(PX + 24, py + 48, 170, 5, 0.25) + bar(PX + 24, py + 62, 110, 5, 0.18))
    o.append(rect(PX + PW - 64, py + 26, 40, 40, PAPER, f' stroke="{CARDLINE}"'))
# the first provider fails: a wine outline and a cross
o.append(rect(PX, pys[0], PW, PH, "none", f' stroke="{WINE}" stroke-width="2.5" class="{P}fail"'))
cx, cy = PX + PW - 44, pys[0] + 46
o.append(f'<g class="{P}fail"><path d="M{cx - 9} {cy - 9} L{cx + 9} {cy + 9} M{cx + 9} {cy - 9} L{cx - 9} {cy + 9}" stroke="{WINE}" stroke-width="3"/></g>')
# the second answers
o.append(rect(PX, pys[1], PW, PH, "none", f' stroke="{AUB}" stroke-width="2.5" class="{P}ok"'))
cx, cy = PX + PW - 44, pys[1] + 46
o.append(f'<g class="{P}ok"><path d="M{cx - 10} {cy} l7 7 l14 -15" fill="none" stroke="{AUB}" stroke-width="3"/></g>')

# ------------------------------------------------------------ wiring
JL, JR = 440, 960
GM = GY + GH / 2
o.append(f'<path d="M{CX + CW} {cys[0] + CH / 2} H{JL} M{CX + CW} {cys[1] + CH / 2} H{JL} M{CX + CW} {cys[2] + CH / 2} H{JL} '
         f'M{JL} {cys[0] + CH / 2} V{cys[2] + CH / 2} M{JL} {GM} H{GX - 1}" fill="none" stroke="{AUB}" stroke-width="2"/>')
o.append(f'<polygon points="{GX - 10},{GM - 6} {GX - 10},{GM + 6} {GX - 1},{GM}" fill="{AUB}"/>')
o.append(f'<path d="M{GX + GW} {GM} H{JR} M{JR} {pys[0] + PH / 2} V{pys[-1] + PH / 2} '
         + ''.join(f'M{JR} {py + PH / 2} H{PX - 1} ' for py in pys) + f'" fill="none" stroke="{AUB}" stroke-width="2"/>')
for py in pys:
    m = py + PH / 2
    o.append(f'<polygon points="{PX - 10},{m - 6} {PX - 10},{m + 6} {PX - 1},{m}" fill="{AUB}"/>')

# ------------------------------------------------------------ the loop
# 0-6 still; 6-14 request to the gateway; 14-38 the three checks; 38-46 to provider 1;
# 46-54 it fails; 54-62 back through the junction to provider 2; 62-70 it answers;
# 70-84 the answer travels back to the caller; 84-96 hold; 96-100 fade out.
c0 = (CX + CW, cys[0] + CH / 2)
inbound = [c0, (JL, c0[1]), (JL, GM), (GX + 4, GM)]
to_p1 = [(GX + GW, GM), (JR, GM), (JR, pys[0] + PH / 2), (PX - 4, pys[0] + PH / 2)]
p1_to_p2 = [(PX - 4, pys[0] + PH / 2), (JR, pys[0] + PH / 2), (JR, pys[1] + PH / 2), (PX - 4, pys[1] + PH / 2)]
back = [(PX - 4, pys[1] + PH / 2), (JR, pys[1] + PH / 2), (JR, GM), (GX + GW, GM), (GX + 4, GM), (JL, GM), (JL, c0[1]), c0]
frames = [(0, (c0, 0)), (6, (c0, 0))]
frames += [(t, (p, 1)) for t, p in travel(inbound, 6, 14)]
frames += [(38, ((GX + GW, GM), 1))]
frames += [(t, (p, 1)) for t, p in travel(to_p1, 38, 46)]
frames += [(54, (to_p1[-1], 1))]
frames += [(t, (p, 1)) for t, p in travel(p1_to_p2, 54, 62)]
frames += [(70, (p1_to_p2[-1], 1))]
frames += [(t, (p, 1)) for t, p in travel(back, 70, 84, 16)]
frames += [(85, (c0, 0)), (100, (c0, 0))]
seen, dot = set(), []
for t, ((x, y), a) in frames:
    if t in seen:
        continue
    seen.add(t)
    dot.append((t, f"transform: translate({x:.1f}px, {y:.1f}px); opacity: {a};"))
o.append(f'<g class="{P}dot" style="opacity: 0"><circle r="16" fill="url(#{P}gor)"/><circle r="6.5" fill="{OR}" stroke="#ffffff" stroke-width="2"/></g>')
kf("dot", dot, "linear")
kf("r0", [(0, "opacity: 0;"), (15, "opacity: 0;"), (16, "opacity: 1;"), (22, "opacity: 1;"), (23, "opacity: 0;"), (100, "opacity: 0;")])
kf("r1", [(0, "opacity: 0;"), (23, "opacity: 0;"), (24, "opacity: 1;"), (30, "opacity: 1;"), (31, "opacity: 0;"), (100, "opacity: 0;")])
kf("r2", [(0, "opacity: 0;"), (31, "opacity: 0;"), (32, "opacity: 1;"), (38, "opacity: 1;"), (39, "opacity: 0;"), (100, "opacity: 0;")])
css.append(f".{P}res {{ transform-box: fill-box; transform-origin: left; }}")
kf("res", [(0, "transform: scaleX(0);"), (24, "transform: scaleX(0);"), (28, "transform: scaleX(1);"), (96, "transform: scaleX(1); opacity: 1;"), (99, "transform: scaleX(1); opacity: 0;"), (100, "transform: scaleX(0); opacity: 1;")])
kf("chk", [(0, "opacity: 0;"), (33, "opacity: 0;"), (35, "opacity: 1;"), (96, "opacity: 1;"), (99, "opacity: 0;"), (100, "opacity: 0;")])
kf("fail", [(0, "opacity: 0;"), (46, "opacity: 0;"), (47, "opacity: 1;"), (54, "opacity: 1;"), (60, "opacity: 0;"), (100, "opacity: 0;")])
kf("ok", [(0, "opacity: 0;"), (62, "opacity: 0;"), (64, "opacity: 1;"), (96, "opacity: 1;"), (99, "opacity: 0;"), (100, "opacity: 0;")])
# reduced motion: the finished frame, with the budget reserved, the check made, the first provider failed and the second answering
css.append(f'@media (prefers-reduced-motion: reduce) {{ [class^="{P}"], [class*=" {P}"] {{ animation: none !important; }} '
           f'.{P}dot, .{P}r0, .{P}r1, .{P}r2, .{P}c0 {{ opacity: 0 !important; }} }}')

defs = f'''<defs>
<radialGradient id="{P}gor"><stop offset="0" stop-color="{OR}" stop-opacity="0.75"/><stop offset="1" stop-color="{OR}" stop-opacity="0"/></radialGradient>
<filter id="{P}soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter>
</defs><style>{" ".join(css)}</style>'''

label = ("Agents, people and apps on the left each call with their own key. In the middle, the gateway maps the model name "
         "to a model and provider, reserves the cost against the month's budget and checks the request with a guardrail. "
         "On the right, the first provider fails, so the call moves on to the next one, which answers, and the answer goes back "
         "to the caller.")
svg = (f'<svg role="img" aria-label="{label}" viewBox="0 0 {W} {H}" width="100%" '
       f'style="display: block; height: auto; background: {PAPER}">{defs}{"".join(o)}</svg>')

if __name__ == "__main__":
    pathlib.Path(sys.argv[1]).write_text(svg)
