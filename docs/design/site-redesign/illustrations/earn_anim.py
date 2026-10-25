"""Partners: your workspace on the left, client organisations on the right. Each client goes from pilot to live,
and every month each live client sends its share back, so the bars of your monthly income grow. Flat SVG, CSS loop."""
import sys, math

W, H = 1400, 560
AUB, YEL, OR, WINE, POW, PAPER, LINE, GRAPH = "#2a102d", "#ffe845", "#ffaf10", "#9b1f61", "#bdccd4", "#faf9f7", "#e6e3eb", "#403e4a"
CARD, CARDLINE = "#ebe4ee", "#dcd2e1"
RABBIT = open(__file__.rsplit('/', 1)[0] + '/rabbit_paths.txt').read().split('\n')
T = 16  # seconds per loop
o, css = [], []

def rect(x, y, w, h, fill, extra=""):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"{extra}/>'

def bar(x, y, w, h=6, op=0.7, col=AUB, extra=""):
    return rect(x, y, w, h, col, f' fill-opacity="{op}"{extra}')

def agent(x, y, size, extra=""):
    k = size * 0.72 / 72.72
    return (f'<g{extra}>' + rect(x, y, size, size, OR)
            + f'<g transform="translate({x + (size - 71.04 * k) / 2:.2f} {y + (size - 72.72 * k) / 2:.2f}) scale({k:.4f})">'
            f'<path d="{RABBIT[0]}" fill="{AUB}"/><path d="{RABBIT[1]}" fill="{OR}"/><path d="{RABBIT[2]}" fill="{OR}"/></g></g>')

def person(cx, cy, r):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#ffffff" stroke="{GRAPH}" stroke-width="1.3"/>'
            f'<circle cx="{cx}" cy="{cy - r * 0.22:.1f}" r="{r * 0.32:.1f}" fill="{GRAPH}"/>'
            f'<path d="M{cx - r * 0.6:.1f} {cy + r * 0.62:.1f} a{r * 0.6:.1f} {r * 0.5:.1f} 0 0 1 {r * 1.2:.1f} 0 Z" fill="{GRAPH}"/>')

def kf(name, frames, extra=""):
    css.append(f"@keyframes {name} {{ " + " ".join(f"{p}% {{ {v} }}" for p, v in frames) + " }")
    css.append(f".{name} {{ animation: {name} {T}s infinite {extra}; }}")

o.append(rect(0, 0, W, H, PAPER))

# ------------------------------------------------------------ your workspace
WX, WY, WW, WH = 60, 50, 420, 460
o.append(f'<rect x="{WX}" y="{WY + 10}" width="{WW}" height="{WH}" fill="{AUB}" fill-opacity="0.10" filter="url(#soft)"/>')
o.append(rect(WX, WY, WW, WH, "#ffffff", f' stroke="{AUB}" stroke-width="2.5"'))
o.append(rect(WX, WY, WW, 5, AUB))
o.append(bar(WX + 24, WY + 26, 110, 8, 0.9))
# your team: two people, and the agents you built
o.append(person(WX + WW - 84, WY + 30, 13) + person(WX + WW - 52, WY + 30, 13))
for k in range(2):
    ay = WY + 70 + k * 74
    o.append(rect(WX + 24, ay, WW - 48, 60, CARD, f' stroke="{CARDLINE}"'))
    o.append(agent(WX + 38, ay + 14, 32))
    o.append(bar(WX + 84, ay + 18, 140, 7, 0.75) + bar(WX + 84, ay + 36, 96, 5, 0.25))
# the monthly income chart
BASE = WY + WH - 34
o.append(f'<line x1="{WX + 24}" y1="{BASE}" x2="{WX + WW - 24}" y2="{BASE}" stroke="{AUB}" stroke-width="1.5" stroke-opacity="0.5"/>')
MONTHS = 8
BW, BG = 30, 16
BX0 = WX + 24 + (WW - 48 - (MONTHS * BW + (MONTHS - 1) * BG)) / 2
UNIT = 34

# ------------------------------------------------------------ the clients
CX, CW, CH = 880, 460, 92
cys = [WY + 6 + k * 116 for k in range(4)]
JX, JY = 680, WY + WH / 2          # junction on the delivery lines
live_at = [6, 26, 46, 66]           # % of the loop where each client goes live
ticks = [12 + 10 * m for m in range(MONTHS)]   # month ends; the last at 82%
# delivery lines, drawn first
o.append(f'<path d="M{WX + WW} {JY} H{JX}" fill="none" stroke="{AUB}" stroke-width="2"/>')
o.append(f'<path d="M{JX} {cys[0] + CH / 2} V{cys[-1] + CH / 2}" fill="none" stroke="{AUB}" stroke-width="2"/>')
for cy in cys:
    m = cy + CH / 2
    o.append(f'<path d="M{JX} {m} H{CX - 1}" fill="none" stroke="{AUB}" stroke-width="2"/>'
             f'<polygon points="{CX - 10},{m - 6} {CX - 10},{m + 6} {CX - 1},{m}" fill="{AUB}"/>')
for j, cy in enumerate(cys):
    t = live_at[j]
    # pilot: dashed outline; live: solid, with your agent working inside
    o.append(rect(CX, cy, CW, CH, "#ffffff", f' stroke="{GRAPH}" stroke-width="1.6" stroke-dasharray="6 5"'))
    o.append(rect(CX, cy, CW, CH, "#ffffff", f' stroke="{AUB}" stroke-width="2" class="kf-live{j}"'))
    kf(f"kf-live{j}", [(0, "opacity: 0;"), (t, "opacity: 0;"), (t + 1.5, "opacity: 1;"), (92, "opacity: 1;"), (97, "opacity: 0;"), (100, "opacity: 0;")])
    o.append(bar(CX + 24, cy + 24, 120, 8, 0.85) + bar(CX + 24, cy + 46, 180, 5, 0.25) + bar(CX + 24, cy + 60, 130, 5, 0.18))
    o.append(person(CX + CW - 150, cy + CH / 2, 13) + person(CX + CW - 118, cy + CH / 2, 13))
    o.append(agent(CX + CW - 76, cy + CH / 2 - 18, 36, extra=f' class="kf-live{j}"'))
    o.append(rect(CX + CW - 76, cy + CH / 2 - 18, 36, 36, "none", f' stroke="{GRAPH}" stroke-width="1.4" stroke-dasharray="4 4" class="kf-pilot{j}"'))
    kf(f"kf-pilot{j}", [(0, "opacity: 1;"), (t, "opacity: 1;"), (t + 1.5, "opacity: 0;"), (92, "opacity: 0;"), (97, "opacity: 1;"), (100, "opacity: 1;")])

# ------------------------------------------------------------ income: bars and coins
def polyline_at(pts, f):
    seg = [math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1)]
    d = f * sum(seg)
    for i, L in enumerate(seg):
        if d <= L or i == len(seg) - 1:
            u = d / L if L else 0
            return (pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u)
        d -= L

coin_n = 0
for m, tick in enumerate(ticks):
    live = [j for j in range(4) if live_at[j] + 2 < tick]
    n = len(live)
    bx = BX0 + m * (BW + BG)
    # the month's bar rises as its coins land
    o.append(rect(bx, BASE - n * UNIT, BW, n * UNIT, AUB, f' class="kf-bar{m}"'))
    css.append(f".kf-bar{m} {{ transform-box: fill-box; transform-origin: bottom; }}")
    kf(f"kf-bar{m}", [(0, "transform: scaleY(0);"), (tick - 0.2, "transform: scaleY(0);"), (tick + 1.2, "transform: scaleY(1);"),
                      (92, "transform: scaleY(1); opacity: 1;"), (97, "transform: scaleY(1); opacity: 0;"), (98, "transform: scaleY(0); opacity: 1;"), (100, "transform: scaleY(0);")])
    for idx, j in enumerate(live):
        mid = cys[j] + CH / 2
        top = (bx + BW / 2, BASE - (idx + 0.5) * UNIT)
        pts = [(CX - 4, mid), (JX, mid), (JX, JY), (WX + WW + 2, JY), (WX + WW - 30, JY), (top[0], JY), top]
        start = tick - 6.5
        frames = [(0, f"transform: translate({pts[0][0]}px, {pts[0][1]}px); opacity: 0;")]
        frames.append((round(start - 0.05, 2), f"transform: translate({pts[0][0]}px, {pts[0][1]}px); opacity: 0;"))
        for s in range(0, 11):
            f = s / 10
            x, y = polyline_at(pts, f)
            frames.append((round(start + f * 6.3, 2), f"transform: translate({x:.1f}px, {y:.1f}px); opacity: {1 if s < 10 else 0.0};"))
        frames.append((100, f"transform: translate({top[0]:.1f}px, {top[1]:.1f}px); opacity: 0;"))
        o.append(f'<g class="kf-coin{coin_n}" style="opacity: 0"><circle r="15" fill="url(#gy)"/>'
                 f'<circle r="7.5" fill="{YEL}" stroke="#c9a400" stroke-width="1.5"/></g>')
        kf(f"kf-coin{coin_n}", frames, "linear")
        coin_n += 1

css.append('@media (prefers-reduced-motion: reduce) { [class^="kf-"], [class*=" kf-"] { animation: none !important; } '
           '[class^="kf-pilot"] { opacity: 0; } }')

defs = f'''<defs>
<radialGradient id="gy"><stop offset="0" stop-color="{YEL}" stop-opacity="0.85"/><stop offset="1" stop-color="{YEL}" stop-opacity="0"/></radialGradient>
<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter>
</defs><style>{" ".join(css)}</style>'''

label = ("Your workspace on the left, with your team and the agents you built. Four client organisations on the right start "
         "as pilots and go live one after another, each running your agent. Every month each live client sends its share "
         "back to you, and the bars of your monthly income grow with every client.")
svg = (f'<svg role="img" aria-label="{label}" viewBox="0 0 {W} {H}" width="100%" '
       f'style="display: block; height: auto; background: {PAPER}">{defs}{"".join(o)}</svg>')

if __name__ == "__main__":
    open(sys.argv[1], "w").write(svg)
    print(coin_n, "coins")
