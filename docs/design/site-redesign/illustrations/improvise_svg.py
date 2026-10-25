import html, re
AUB, DEEP, YEL, WINE, POW, OR = "#2a102d", "#1a0a1c", "#ffe845", "#9b1f61", "#bdccd4", "#ffaf10"


def block(x, y, w, h, fill, shade, label=None, fg=AUB, size=13):
    o = (f'<rect x="{x + 6}" y="{y + 6}" width="{w}" height="{h}" fill="{shade}"></rect>'
         f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"></rect>')
    if label:
        o += f'<text x="{x + w / 2}" y="{y + h / 2 + size * 0.36}" text-anchor="middle" font-size="{size}" font-weight="700" fill="{fg}">{html.escape(label)}</text>'
    return o


def arrowhead(x, y, ang, colour):
    import math
    a = math.radians(ang)
    p1 = (x - 9 * math.cos(a) + 5 * math.sin(a), y - 9 * math.sin(a) - 5 * math.cos(a))
    p2 = (x - 9 * math.cos(a) - 5 * math.sin(a), y - 9 * math.sin(a) + 5 * math.cos(a))
    return f'<path d="M{p1[0]:.1f} {p1[1]:.1f} L{x} {y} L{p2[0]:.1f} {p2[1]:.1f} Z" fill="{colour}"></path>'


def svg():
    o = []
    # --- top: with instructions
    o.append(f'<text x="0" y="18" font-size="14" font-weight="700" fill="rgba(255,255,255,0.6)">With instructions</text>')
    # instruction sheet
    o.append(f'<path d="M14 54 H90 L108 72 V170 H14 Z" fill="#ffffff"></path><path d="M90 54 V72 H108" fill="#e6e3eb"></path>')
    for i, w in enumerate((70, 78, 58, 74, 50)):
        o.append(f'<rect x="28" y="{84 + i * 15}" width="{w}" height="5" fill="#cfc9d6"></rect>')
    o.append(f'<path d="M116 112 H158" stroke="rgba(255,255,255,0.55)" stroke-width="2"></path>' + arrowhead(166, 112, 0, "rgba(255,255,255,0.55)"))
    o.append(block(170, 78, 72, 68, OR, "#b97800", "Agent"))
    targets = [(452, 30, "Approve early"), (468, 84, "Skip a check"), (440, 138, "Email the client"), (470, 192, "Ask again"), (360, 226, "Stop halfway")]
    for i, (tx, ty, label) in enumerate(targets):
        sx, sy = 246, 112
        c1 = (sx + 60, sy + (-70 if i % 2 == 0 else 70))
        c2 = (tx - 70, ty + 14 + (50 if i % 2 == 0 else -50))
        o.append(f'<path d="M{sx} {sy} C{c1[0]} {c1[1]} {c2[0]} {c2[1]} {tx - 10} {ty + 14}" fill="none" stroke="{OR}" stroke-opacity="0.75" stroke-width="2" stroke-dasharray="6 6"></path>')
        o.append(arrowhead(tx - 2, ty + 14, 0, OR))
        w = len(label) * 7.4 + 22
        o.append(f'<rect x="{tx}" y="{ty}" width="{w:.0f}" height="28" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1.2"></rect>'
                 f'<text x="{tx + 11}" y="{ty + 18.5}" font-size="13" fill="rgba(255,255,255,0.85)">{html.escape(label)}</text>')
    # divider
    o.append('<line x1="0" y1="290" x2="640" y2="290" stroke="rgba(255,255,255,0.14)" stroke-width="1"></line>')
    # --- bottom: with keel
    o.append(f'<text x="0" y="330" font-size="14" font-weight="700" fill="{YEL}">With Keel</text>')
    steps = [("Intake", "System", WINE, "#ffffff"), ("Checks", "Agent", OR, AUB), ("Decision", "Rule", YEL, AUB), ("Offer", "Person", POW, AUB)]
    bw, gap, y = 122, 34, 386
    o.append(f'<rect x="0" y="{y + 104}" width="{4 * bw + 3 * gap + 6}" height="6" fill="{YEL}"></rect>')
    for i, (name, kind, col, fg) in enumerate(steps):
        x = i * (bw + gap)
        live = kind == "Agent"
        o.append(f'<rect x="{x + 6}" y="{y + 6}" width="{bw}" height="92" fill="#120613"></rect>'
                 f'<rect x="{x}" y="{y}" width="{bw}" height="92" fill="{AUB}" stroke="{OR if live else "rgba(255,255,255,0.3)"}" stroke-width="{2.5 if live else 1}"></rect>'
                 f'<text x="{x + 14}" y="{y + 30}" font-size="15" font-weight="700" fill="#ffffff">{name}</text>')
        tw = len(kind) * 7.2 + 14
        o.append(f'<rect x="{x + 14}" y="{y + 50}" width="{tw:.0f}" height="22" fill="{col}"></rect>'
                 f'<text x="{x + 21}" y="{y + 65.5}" font-size="12" font-weight="700" fill="{fg}">{kind}</text>')
        if i < len(steps) - 1:
            ax = x + bw
            o.append(f'<path d="M{ax + 8} {y + 46} H{ax + gap - 8}" stroke="{YEL}" stroke-width="2.5"></path>' + arrowhead(ax + gap - 1, y + 46, 0, YEL))
    return (f'<svg role="img" aria-label="With only instructions, an agent wanders off to approve early, skip a check, email the client, ask again or stop halfway. '
            f'With Keel, the same agent works inside one step of a fixed path from intake to checks, decision and offer." '
            f'viewBox="0 0 650 500" width="100%" style="display: block; height: auto; font-family: Inter, sans-serif">{"".join(o)}</svg>')


if __name__ == "__main__":
    p = "landing/project/Keel.dc.html"
    s = open(p).read()
    pat = r'<svg role="img" aria-label="Case folders run on a rail network.*?</svg>'
    assert len(re.findall(pat, s, re.S)) == 1
    s = re.sub(pat, lambda m: svg(), s, flags=re.S)
    a, b = s.find("/* sg-keelhero */"), s.find("/* /sg-keelhero */")
    if a != -1 and b != -1:
        s = s[:a] + s[b + len("/* /sg-keelhero */\n"):]
    assert s.count("{{accent}}") >= 1
    open(p, "w").write(s)
    print("ok", "kh-" in s)
