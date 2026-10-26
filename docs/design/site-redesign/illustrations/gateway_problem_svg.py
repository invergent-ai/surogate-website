"""AI Gateway, the problem: without a gateway every caller wires itself to providers on its own;
with Surogate every call goes through one gateway. Static SVG for the dark problem section, in the
same two-panel layout as Keel's "With instructions / With Keel".

  python3 gateway_problem_svg.py OUT.svg
"""
import html
import pathlib
import sys

AUB, DEEP, YEL, WINE, POW, OR = "#2a102d", "#1a0a1c", "#ffe845", "#9b1f61", "#bdccd4", "#ffaf10"
MUTED = "rgba(255,255,255,0.6)"
o = []


def caller(x, y, kind):
    s = f'<rect x="{x}" y="{y}" width="96" height="44" fill="{AUB}" stroke="rgba(255,255,255,0.3)"/>'
    if kind == "agent":
        s += f'<rect x="{x + 12}" y="{y + 11}" width="22" height="22" fill="{OR}"/>'
    elif kind == "person":
        s += f'<circle cx="{x + 23}" cy="{y + 22}" r="10" fill="none" stroke="{POW}" stroke-width="2"/>'
    else:
        s += f'<rect x="{x + 12}" y="{y + 13}" width="22" height="18" fill="none" stroke="{POW}" stroke-width="2"/><rect x="{x + 12}" y="{y + 13}" width="22" height="5" fill="{POW}"/>'
    s += f'<rect x="{x + 44}" y="{y + 16}" width="40" height="5" fill="#ffffff" fill-opacity="0.7"/><rect x="{x + 44}" y="{y + 26}" width="28" height="4" fill="#ffffff" fill-opacity="0.3"/>'
    return s


def provider(x, y):
    return (f'<rect x="{x}" y="{y}" width="110" height="40" fill="{AUB}" stroke="rgba(255,255,255,0.3)"/>'
            f'<rect x="{x + 14}" y="{y + 14}" width="56" height="5" fill="#ffffff" fill-opacity="0.7"/>'
            f'<rect x="{x + 14}" y="{y + 24}" width="38" height="4" fill="#ffffff" fill-opacity="0.3"/>')


def label(x, y, text, colour):
    return f'<text x="{x}" y="{y}" font-size="14" font-weight="700" fill="{colour}">{html.escape(text)}</text>'


# ---- top: every caller wired to providers on its own
o.append(label(0, 18, "Without a gateway", MUTED))
cy = [44, 112, 180]
py = [36, 92, 148, 204]
for y, k in zip(cy, ("agent", "person", "app")):
    o.append(caller(0, y, k))
for y in py:
    o.append(provider(540, y))
wires = [(0, 0, 1), (0, 2, 0), (0, 3, 1), (1, 1, 0), (1, 3, 1), (2, 0, 0), (2, 2, 1), (2, 1, 0)]
for ci, pi, bad in wires:
    x1, y1 = 96, cy[ci] + 22
    x2, y2 = 540, py[pi] + 20
    col, op = (WINE, 0.9) if bad else ("#ffffff", 0.35)
    o.append(f'<path d="M{x1} {y1} C{x1 + 190} {y1} {x2 - 190} {y2} {x2} {y2}" fill="none" stroke="{col}" stroke-opacity="{op}" '
             f'stroke-width="1.6" stroke-dasharray="5 5"/>')
# keys left lying around in scripts
for x, y in ((214, 70), (300, 168), (382, 102)):
    o.append(f'<rect x="{x}" y="{y}" width="26" height="12" fill="{OR}" fill-opacity="0.85"/><rect x="{x + 6}" y="{y + 4}" width="12" height="3" fill="{AUB}"/>')

o.append('<line x1="0" y1="262" x2="650" y2="262" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>')

# ---- bottom: one gateway in the middle
o.append(label(0, 300, "With Surogate", YEL))
cy2 = [322, 390, 458]
for y, k in zip(cy2, ("agent", "person", "app")):
    o.append(caller(0, y, k))
gx, gy, gw, gh = 250, 330, 150, 150
o.append(f'<rect x="{gx + 6}" y="{gy + 6}" width="{gw}" height="{gh}" fill="#120613"/>'
         f'<rect x="{gx}" y="{gy}" width="{gw}" height="{gh}" fill="{AUB}" stroke="{YEL}" stroke-width="2.5"/>')
for k in range(3):
    o.append(f'<rect x="{gx + 18}" y="{gy + 22 + k * 40}" width="{gw - 36}" height="26" fill="#ffffff" fill-opacity="0.08"/>'
             f'<rect x="{gx + 28}" y="{gy + 32 + k * 40}" width="{60 - k * 10}" height="6" fill="#ffffff" fill-opacity="0.7"/>')
py2 = [318, 372, 426, 480]
for y in py2:
    o.append(provider(540, y - 10))
mid = gy + gh / 2
for y in cy2:
    o.append(f'<path d="M96 {y + 22} H180 V{mid} H{gx}" fill="none" stroke="{YEL}" stroke-width="2"/>')
for y in py2:
    o.append(f'<path d="M{gx + gw} {mid} H470 V{y + 10} H540" fill="none" stroke="{YEL}" stroke-width="2"/>')

label_text = ("Without a gateway, an agent, a person and an app each wire themselves to several providers, with keys "
              "scattered between them and some calls failing. With Surogate, all three call one gateway, which sends "
              "each call on to the providers in order.")
svg = (f'<svg role="img" aria-label="{html.escape(label_text)}" viewBox="0 0 650 524" width="100%" '
       f'style="display: block; height: auto; font-family: Inter, sans-serif">{"".join(o)}</svg>')

if __name__ == "__main__":
    pathlib.Path(sys.argv[1]).write_text(svg)
