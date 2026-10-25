"""Keel: part of the board on the left, the selected stage unfolding into its flow on the right, one case running
through it with an agent and people at work. Flat SVG, CSS-animated, one 12 s loop; reduced motion shows the done frame."""
import sys

W, H = 1400, 640
AUB, YEL, OR, WINE, POW, PAPER, LINE, GRAPH = "#2a102d", "#ffe845", "#ffaf10", "#9b1f61", "#bdccd4", "#faf9f7", "#e6e3eb", "#403e4a"
CARD, CARDLINE = "#ebe4ee", "#dcd2e1"
RABBIT = open(__file__.rsplit('/', 1)[0] + '/rabbit_paths.txt').read().split('\n')
o = []

def rect(x, y, w, h, fill, extra=""):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"{extra}/>'

def textline(x, y, w, h=6, op=0.7, col=AUB, extra=""):
    return rect(x, y, w, h, col, f' fill-opacity="{op}"{extra}')

def agent(x, y, size, glow_cls=None):
    """The agent: an orange square carrying the Surogate rabbit."""
    k = size * 0.72 / 72.72
    pad = (size - 71.04 * k) / 2
    s = ''
    if glow_cls:
        s += f'<rect x="{x - 10}" y="{y - 10}" width="{size + 20}" height="{size + 20}" fill="{OR}" filter="url(#soft)" class="{glow_cls}" style="opacity: 0"/>'
    s += rect(x, y, size, size, OR)
    s += (f'<g transform="translate({x + pad:.2f} {y + (size - 72.72 * k) / 2:.2f}) scale({k:.4f})">'
          f'<path d="{RABBIT[0]}" fill="{AUB}"/><path d="{RABBIT[1]}" fill="{OR}"/><path d="{RABBIT[2]}" fill="{OR}"/></g>')
    return s

def person(cx, cy, r, cls=None, lit=False):
    """A person: a round avatar with a head-and-shoulders figure."""
    bg, fg = (AUB, "#ffffff") if lit else ("#ffffff", GRAPH)
    c = f' class="{cls}-bg"' if cls else ''
    f = f' class="{cls}-fg"' if cls else ''
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{bg}" stroke="{GRAPH}" stroke-width="1.3"{c}/>'
            f'<circle cx="{cx}" cy="{cy - r * 0.22:.1f}" r="{r * 0.32:.1f}" fill="{fg}"{f}/>'
            f'<path d="M{cx - r * 0.6:.1f} {cy + r * 0.62:.1f} a{r * 0.6:.1f} {r * 0.5:.1f} 0 0 1 {r * 1.2:.1f} 0 Z" fill="{fg}"{f}/>')

# ------------------------------------------------------------ background
o.append(rect(0, 0, W, H, PAPER))
FX, FY, FH = 558, 22, 596
dots = "".join(f'<circle cx="{x}" cy="{y}" r="1.2"/>' for x in range(FX + 30, W, 22) for y in range(FY + 14, FY + FH, 22))

# ------------------------------------------------------------ the board
COLW, GAP, TOP, CARDH, CGAP = 150, 18, 70, 72, 12
STAGES = [("SAA", 0.45), ("ASSP", 0.62), ("RPx", 0.8), ("RPAP", 1.0)]
xs = [-96 + i * (COLW + GAP) for i in range(4)]
SEL = 3
BOTTOM = TOP + 42 + 4 * (CARDH + CGAP) + 10
for i, ((kinds, op), x) in enumerate(zip(STAGES, xs)):
    sel = i == SEL
    g = []
    if sel:
        tab = f"M{x},{TOP} H{FX} V{FY} H{W + 40} V{FY + FH} H{FX} V{BOTTOM} H{x} Z"
        g.append(f'<path d="{tab}" fill="{AUB}" fill-opacity="0.10" filter="url(#soft)" transform="translate(0 10)"/>')
        g.append(f'<path d="{tab}" fill="#ffffff"/>')
        g.append(f'<g fill="{AUB}" fill-opacity="0.12">{dots}</g>')
        g.append(f'<path d="{tab}" fill="none" stroke="{AUB}" stroke-width="2.5"/>')
        g.append(rect(x, TOP, COLW, 5, AUB))
    else:
        g.append(rect(x, TOP, COLW, BOTTOM - TOP, "#ffffff", f' stroke="{LINE}" stroke-width="1"'))
    g.append(textline(x + 14, TOP + 18, 72 if sel else 64, 8, 0.9 if sel else 0.7))
    g.append(textline(x + COLW - 44, TOP + 19, 30, 6, 0.25))
    for k, kd in enumerate(kinds[:3] if kinds == "RPx" else kinds):
        cy = TOP + 42 + k * (CARDH + CGAP)
        active = sel and kd == "A"
        g.append(rect(x + 10, cy, COLW - 20, CARDH, CARD, f' stroke="{OR if active else CARDLINE}" stroke-width="{2 if active else 1}"'))
        if active:
            g.append(rect(x + 10, cy, 4, CARDH, OR))
        g.append(textline(x + 22, cy + 16, 78, 7, 0.75))
        g.append(textline(x + 22, cy + 38, 70, 5, 0.22))
        g.append(textline(x + 22, cy + 50, 52, 5, 0.14))
        if sel and kd == "A":
            g.append(agent(x + COLW - 40, cy + 10, 20, glow_cls="kf-glow"))
        elif sel and kd == "P":
            g.append(person(x + COLW - 30, cy + 20, 10))
    o.append(f'<g opacity="{op}">{"".join(g)}</g>')

# ------------------------------------------------------------ the flow
def line(pts, col=AUB, w=2, dash=None, op=1, head=False):
    d = "M" + " L".join(f"{x} {y}" for x, y in pts)
    da = f' stroke-dasharray="{dash}"' if dash else ''
    s = f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{w}" stroke-opacity="{op}"{da}/>'
    if head:
        (x1, y1), (x2, y2) = pts[-2], pts[-1]
        if y2 > y1:
            s += f'<polygon points="{x2 - 6},{y2 - 9} {x2 + 6},{y2 - 9} {x2},{y2}" fill="{col}" fill-opacity="{op}"/>'
    return s

def box(cx, cy, w, h, fill=CARD, stroke=CARDLINE, sw=1, dash=False, extra=""):
    da = ' stroke-dasharray="6 5"' if dash else ''
    return rect(cx - w / 2, cy - h / 2, w, h, fill, f' stroke="{stroke}" stroke-width="{sw}"{da}{extra}')

def diamond(cx, cy, r, cls):
    return (f'<g class="{cls}"><polygon points="{cx},{cy - r} {cx + r},{cy} {cx},{cy + r} {cx - r},{cy}" fill="{YEL}"/>'
            + textline(cx - 20, cy - 3, 40, 6, 0.8) + '</g>')

L, M, R = 830, 1010, 1190
NW, NH = 150, 60
flow = []
flow.append(line([(M, 84), (M, 110)], head=True))
flow.append(line([(M, 194), (M, 214)]))
flow.append(line([(L, 214), (R, 214)]))
for cx in (L, M, R):
    flow.append(line([(cx, 214), (cx, 238)], head=True))
flow.append(line([(R, 300), (R, 320)], head=True))
flow.append(line([(L, 300), (L, 410)]))
flow.append(line([(M, 300), (M, 410)]))
flow.append(line([(R, 380), (R, 410)]))
flow.append(line([(L, 410), (R, 410)]))
flow.append(line([(M, 410), (M, 430)], head=True))
flow.append(line([(M - 42, 472), (L, 472), (L, 538)], col=GRAPH, dash="7 6", op=0.8, head=True))
flow.append(line([(M, 514), (M, 538)], head=True))
flow.append(line([(M + 42, 472), (R, 472), (R, 538)], col=WINE, w=2.4, head=True))

# entry and first decision
flow.append(box(M, 62, 150, 44, fill="#ffffff", stroke=AUB) + textline(M - 61, 59, 70, 7, 0.8))
flow.append(diamond(M, 152, 42, "kf-d1"))
# the two approvers, each a person
for cx in (L, M):
    flow.append(box(cx, 270, NW, NH) + textline(cx - 61, 256, 84, 7, 0.8) + textline(cx - 61, 282, 56, 5, 0.25)
                + person(cx + 53, 260, 11))
# the agent step: writes its result
ax, ay = R - NW / 2, 270 - NH / 2
flow.append(rect(ax - 8, ay - 8, NW + 16, NH + 16, OR, ' fill-opacity="0.45" filter="url(#soft)"'))
flow.append(box(R, 270, NW, NH, stroke=OR, sw=2) + rect(ax, ay, 4, NH, OR))
flow.append(textline(ax + 14, ay + 14, 84, 7, 0.8))
flow.append(textline(ax + 14, ay + 32, 92, 5, 0.45, extra=' class="kf-w1"'))
flow.append(textline(ax + 14, ay + 43, 64, 5, 0.45, extra=' class="kf-w2"'))
flow.append(f'<g class="kf-caret" style="opacity: 0"><rect x="0" y="-5" width="2" height="11" fill="{AUB}" class="kf-blink"/></g>')
flow.append(agent(ax + NW - 38, ay + 10, 28, glow_cls="kf-glow"))
# the committee: five people, three votes decide
cy0 = 350
flow.append(box(R, cy0, NW, NH) + textline(ax + 14, cy0 - 16, 70, 7, 0.8))
for k in range(5):
    flow.append(person(R - 52 + k * 26, cy0 + 12, 10, cls=f"kf-v{k + 1}" if k < 3 else None, lit=k < 3))
# second decision and the exits
flow.append(diamond(M, 472, 42, "kf-d2"))
flow.append(box(L, 566, NW, 52, fill="#ffffff", stroke=GRAPH, dash=True) + textline(L - 61, 553, 80, 7, 0.75) + textline(L - 61, 573, 50, 5, 0.25))
flow.append(box(M, 566, NW, 52, fill=AUB, stroke=AUB, sw=1.6, extra=' class="kf-next"')
            + textline(M - 61, 553, 80, 7, 0.9, col="#ffffff", extra=' class="kf-next-t"') + textline(M - 61, 573, 50, 5, 0.5, col="#ffffff", extra=' class="kf-next-t"'))
flow.append(box(R, 566, NW, 52, fill="#ffffff", stroke=WINE, sw=1.6) + textline(R - 61, 553, 80, 7, 0.75) + textline(R - 61, 573, 50, 5, 0.25))
# the case: a small file that travels the flow
flow.append(f'<g class="kf-case" style="opacity: 0"><circle r="20" fill="url(#gor)"/>'
            f'<path d="M-7 -9 H3 L8 -4 V9 H-7 Z" fill="{OR}" stroke="#ffffff" stroke-width="1.6"/>'
            f'<path d="M-3.5 -1 H4.5 M-3.5 3 H4.5" stroke="{AUB}" stroke-width="1.4" stroke-opacity="0.7"/></g>')
o.append(f'<g>{"".join(flow)}</g>')

# the cover hides the panel until the tab unfolds; it waits off to the right
OFF = W + 60
cover = (f"M{FX - 1.25 + OFF},{TOP - 3} V{BOTTOM + 3} H{FX - 26 + OFF} V{H + 10} H{W + 40 + OFF} V-10 H{FX - 26 + OFF} V{TOP - 3} Z")
o.append(f'<path d="{cover}" fill="{PAPER}" class="kf-cover"/>')
o.append(f'<line x1="{FX}" y1="{TOP}" x2="{FX}" y2="{BOTTOM}" stroke="{AUB}" stroke-width="2.5" class="kf-edge" style="opacity: 0"/>')

# ------------------------------------------------------------ the animation, one 12 s loop
T = "12s"
case_path = [(0, M, 62, 0), (15, M, 62, 0), (16, M, 84, 1), (20, M, 152, 1), (23, M, 152, 1), (25, M, 214, 1), (29, R, 214, 1),
             (31, R, 262, 1), (32, R, 262, 0), (49, R, 262, 0), (50, R, 300, 1), (52, R, 344, 1), (53, R, 344, 0),
             (71, R, 344, 0), (72, R, 380, 1), (74, R, 410, 1), (77, M, 410, 1), (80, M, 472, 1), (82, M, 472, 1),
             (84, M, 560, 1), (86, M, 560, 0), (100, M, 560, 0)]
case_kf = " ".join(f"{p}% {{ transform: translate({x}px, {y}px); opacity: {a}; }}" for p, x, y, a in case_path)
cover_dx = -OFF
w1x, w2x = ax + 14, ax + 14
css = f'''
.kf-cover {{ animation: kf-cover {T} 1 forwards; }}
@keyframes kf-cover {{ 0%, 8% {{ transform: translateX({cover_dx}px); }} 15%, 100% {{ transform: translateX(0); }} }}
.kf-edge {{ animation: kf-edge {T} 1 forwards; }}
@keyframes kf-edge {{ 0%, 8% {{ opacity: 1; }} 12%, 100% {{ opacity: 0; }} }}
.kf-case {{ animation: kf-case {T} infinite linear; }}
@keyframes kf-case {{ {case_kf} }}
.kf-d1, .kf-d2 {{ transform-box: fill-box; transform-origin: center; }}
.kf-d1 {{ animation: kf-d1 {T} infinite; }}
@keyframes kf-d1 {{ 0%, 20% {{ transform: scale(1); }} 21.5% {{ transform: scale(1.14); }} 23%, 100% {{ transform: scale(1); }} }}
.kf-d2 {{ animation: kf-d2 {T} infinite; }}
@keyframes kf-d2 {{ 0%, 80% {{ transform: scale(1); }} 81.5% {{ transform: scale(1.14); }} 83%, 100% {{ transform: scale(1); }} }}
.kf-glow {{ animation: kf-glow {T} infinite; }}
@keyframes kf-glow {{ 0%, 32% {{ opacity: 0; }} 35% {{ opacity: 0.9; }} 38% {{ opacity: 0.35; }} 41% {{ opacity: 0.9; }} 44% {{ opacity: 0.35; }} 47% {{ opacity: 0.9; }} 50%, 100% {{ opacity: 0; }} }}
.kf-w1, .kf-w2 {{ transform-box: fill-box; transform-origin: left center; }}
.kf-w1 {{ animation: kf-w1 {T} infinite linear; }}
@keyframes kf-w1 {{ 0%, 33% {{ transform: scaleX(0); opacity: 1; }} 40%, 92% {{ transform: scaleX(1); opacity: 1; }} 96% {{ transform: scaleX(1); opacity: 0; }} 97%, 100% {{ transform: scaleX(0); opacity: 1; }} }}
.kf-w2 {{ animation: kf-w2 {T} infinite linear; }}
@keyframes kf-w2 {{ 0%, 40.5% {{ transform: scaleX(0); opacity: 1; }} 47%, 92% {{ transform: scaleX(1); opacity: 1; }} 96% {{ transform: scaleX(1); opacity: 0; }} 97%, 100% {{ transform: scaleX(0); opacity: 1; }} }}
.kf-caret {{ animation: kf-caret {T} infinite linear; }}
@keyframes kf-caret {{ 0%, 32.9% {{ opacity: 0; transform: translate({w1x}px, {ay + 34.5}px); }}
  33% {{ opacity: 1; transform: translate({w1x}px, {ay + 34.5}px); }} 40% {{ opacity: 1; transform: translate({w1x + 92}px, {ay + 34.5}px); }}
  40.5% {{ opacity: 1; transform: translate({w2x}px, {ay + 45.5}px); }} 47% {{ opacity: 1; transform: translate({w2x + 64}px, {ay + 45.5}px); }}
  48.5%, 100% {{ opacity: 0; transform: translate({w2x + 64}px, {ay + 45.5}px); }} }}
.kf-blink {{ animation: kf-blink 0.7s infinite steps(1); }}
@keyframes kf-blink {{ 0% {{ opacity: 1; }} 50% {{ opacity: 0; }} }}
''' + "".join(f'''
.kf-v{k}-bg {{ animation: kf-v{k}-bg {T} infinite; }}
@keyframes kf-v{k}-bg {{ 0%, {t}% {{ fill: #ffffff; }} {t + 1}%, 92% {{ fill: {AUB}; }} 97%, 100% {{ fill: #ffffff; }} }}
.kf-v{k}-fg {{ animation: kf-v{k}-fg {T} infinite; }}
@keyframes kf-v{k}-fg {{ 0%, {t}% {{ fill: {GRAPH}; }} {t + 1}%, 92% {{ fill: #ffffff; }} 97%, 100% {{ fill: {GRAPH}; }} }}''' for k, t in ((1, 56), (2, 61), (3, 66))) + f'''
.kf-next {{ animation: kf-next {T} infinite; }}
@keyframes kf-next {{ 0%, 84% {{ fill: #ffffff; }} 86%, 92% {{ fill: {AUB}; }} 97%, 100% {{ fill: #ffffff; }} }}
.kf-next-t {{ animation: kf-next-t {T} infinite; }}
@keyframes kf-next-t {{ 0%, 84% {{ fill: {AUB}; }} 86%, 92% {{ fill: #ffffff; }} 97%, 100% {{ fill: {AUB}; }} }}
@media (prefers-reduced-motion: reduce) {{ [class^="kf-"], [class*=" kf-"] {{ animation: none !important; }} }}
'''

defs = f'''<defs>
<radialGradient id="gor"><stop offset="0" stop-color="{OR}" stop-opacity="0.75"/><stop offset="1" stop-color="{OR}" stop-opacity="0"/></radialGradient>
<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter>
</defs><style>{css}</style>'''

label = ("Part of the Keel board on the left, with the Approval stage selected. The stage unfolds to the right into its flow. "
         "A case enters, a decision sends it to the agent step, where the agent writes its result, then to the committee, "
         "where three of five people vote, and on through a second decision to the next stage.")
svg = (f'<svg role="img" aria-label="{label}" viewBox="0 0 {W} {H}" width="100%" '
       f'style="display: block; height: auto; background: {PAPER}">{defs}{"".join(o)}</svg>')

if __name__ == "__main__":
    open(sys.argv[1], "w").write(svg)
