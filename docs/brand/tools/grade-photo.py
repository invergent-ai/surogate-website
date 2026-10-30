"""Surogate photo grades. usage: python3 grade.py <look> <in.jpg> <out.jpg> [width]
mono:     the gold look's monochrome base alone, pixel-identical outside the warm light (the gold reveal's bottom layer)
film:     natural colour at 70% saturation, matte lifted blacks, cool shadows and warm highlights
filmgold: film, with its warm light pulled to sun (the gold reveal's top layer over film)
gold:     monochrome city, only the warm light (orange/yellow hues) keeps its colour, pulled toward sun #ffaf10
graphite: neutral mono, matte lifted blacks, deep contrast
silver:   soft high-key, 12% colour, low contrast
All get fine grain and a soft vignette."""
import sys
import numpy as np
from PIL import Image

look, src, dst = sys.argv[1:4]
W = int(sys.argv[4]) if len(sys.argv) > 4 else 2400

im = Image.open(src).convert('RGB')
im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
a = np.asarray(im).astype(np.float32) / 255
h, w, _ = a.shape
lum = a @ np.array([0.2126, 0.7152, 0.0722], np.float32)

def scurve(x, k):
    return 1 / (1 + np.exp(-k * (x - 0.5)))

def norm_curve(x, k):
    lo, hi = scurve(np.float32(0), k), scurve(np.float32(1), k)
    return (scurve(x, k) - lo) / (hi - lo)

if look in ('gold', 'mono'):
    hsv = np.asarray(im.convert('HSV')).astype(np.float32) / 255
    hue, sat = hsv[..., 0] * 360, hsv[..., 1]
    warm = np.clip(1 - np.abs(hue - 36) / 22, 0, 1) * np.clip((sat - 0.25) / 0.35, 0, 1) * np.clip((lum - 0.2) / 0.3, 0, 1)
    mono = norm_curve(lum, 6.5)[..., None] * np.array([0.97, 0.985, 1.0], np.float32)
    sun = np.array([1.0, 0.686, 0.063], np.float32)
    gold = np.clip(mono * 0.35 + sun * (0.35 + 0.75 * lum[..., None]), 0, 1)
    out = mono if look == 'mono' else mono * (1 - warm[..., None]) + gold * warm[..., None]
elif look in ('film', 'filmgold'):
    grey = lum[..., None]
    col = grey + (a - grey) * 0.7
    l2 = col @ np.array([0.2126, 0.7152, 0.0722], np.float32)
    toned = 0.05 + norm_curve(l2, 4.5) * 0.9
    col = col * (toned / np.maximum(l2, 1e-4))[..., None]
    w8 = np.clip(l2, 0, 1)[..., None]
    col = col * ((1 - w8) * np.array([0.97, 1.0, 1.035], np.float32) + w8 * np.array([1.035, 1.0, 0.95], np.float32))
    out = np.clip(col, 0, 1)
    if look == 'filmgold':
        hsv = np.asarray(im.convert('HSV')).astype(np.float32) / 255
        hue, sat = hsv[..., 0] * 360, hsv[..., 1]
        warm = np.clip(1 - np.abs(hue - 36) / 24, 0, 1) * np.clip((sat - 0.2) / 0.35, 0, 1) * np.clip((lum - 0.15) / 0.3, 0, 1)
        sun = np.array([1.0, 0.686, 0.063], np.float32)
        gold = np.clip(out * 0.4 + sun * (0.4 + 0.7 * lum[..., None]), 0, 1)
        out = out * (1 - warm[..., None]) + gold * warm[..., None]
elif look == 'graphite':
    m = norm_curve(lum, 7.5)
    m = 0.06 + m * 0.9
    out = m[..., None] * np.array([0.975, 0.985, 1.0], np.float32)
elif look == 'silver':
    m = 0.18 + norm_curve(lum, 4) * 0.8
    col = a * 0.12 + m[..., None] * 0.88
    out = col * np.array([0.99, 1.0, 1.01], np.float32)
else:
    raise SystemExit(f'unknown look {look}')

yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2)
out = out * (1 - 0.28 * np.clip(r - 0.55, 0, 1) ** 1.5)[..., None]
rng = np.random.default_rng(7)
out = out + rng.normal(0, 0.022, (h, w, 1)).astype(np.float32)
Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8)).save(dst, quality=84, optimize=True, progressive=True)
print(dst)
