"""Effect layers for one photo. usage: python3 photo-layers.py <in.jpg> <out_prefix> [width]
Writes:
  <prefix>-duo.jpg    ink to sun duotone: black shadows, gold mids, near white peaks
  <prefix>-plum.jpg   aubergine to sun duotone: aubergine shadows, gold highlights
  <prefix>-trace.png  the photo's strongest contours as gold lines on transparent
  <prefix>-dots.png   gold halftone, dot size by brightness, on transparent
  <prefix>-cold.jpg   blue hour: cool, low saturation, darker
  <prefix>-warm.jpg   golden hour: warm, highlights pulled to sun
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src, pre = sys.argv[1:3]
W = int(sys.argv[3]) if len(sys.argv) > 3 else 2400
im = Image.open(src).convert('RGB')
im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
a = np.asarray(im).astype(np.float32) / 255
h, w, _ = a.shape
lum = a @ np.array([0.2126, 0.7152, 0.0722], np.float32)
rng = np.random.default_rng(7)
SUN = np.array([1.0, 0.686, 0.063], np.float32)


def save_jpg(x, path):
    x = x + rng.normal(0, 0.018, (h, w, 1)).astype(np.float32)
    Image.fromarray((np.clip(x, 0, 1) * 255).astype(np.uint8)).save(path, quality=84, optimize=True, progressive=True)


def curve(x, k):
    s = lambda v: 1 / (1 + np.exp(-k * (v - 0.5)))
    return (s(x) - s(0.0)) / (s(1.0) - s(0.0))


# Duotone along ink, deep amber, sun, near white.
stops = np.array([[0.0, 0.039, 0.039, 0.039], [0.45, 0.17, 0.13, 0.08], [0.75, 0.82, 0.52, 0.06], [0.9, 1.0, 0.686, 0.063], [1.0, 1.0, 1.0, 1.0]], np.float32)
l = curve(lum, 5.5) * 0.94
duo = np.stack([np.interp(l, stops[:, 0], stops[:, c]) for c in (1, 2, 3)], -1)
save_jpg(duo, f'{pre}-duo.jpg')
plum_stops = np.array([[0.0, 0.05, 0.02, 0.06], [0.45, 0.165, 0.063, 0.176], [0.78, 0.8, 0.48, 0.1], [0.92, 1.0, 0.686, 0.063], [1.0, 1.0, 1.0, 1.0]], np.float32)
plum = np.stack([np.interp(l, plum_stops[:, 0], plum_stops[:, c]) for c in (1, 2, 3)], -1)
save_jpg(plum, f'{pre}-plum.jpg')

# Contours: Sobel on a softened luminance, keep the strongest 7%.
g = np.asarray(Image.fromarray((lum * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.6))).astype(np.float32) / 255
gx = np.zeros_like(g); gy = np.zeros_like(g)
gx[:, 1:-1] = g[:, 2:] - g[:, :-2]
gy[1:-1, :] = g[2:, :] - g[:-2, :]
mag = np.hypot(gx, gy)
t = np.quantile(mag, 0.93)
alpha = np.clip((mag - t) / (np.quantile(mag, 0.995) - t + 1e-6), 0, 1) ** 0.8
trace = np.zeros((h, w, 4), np.uint8)
trace[..., :3] = (SUN * 255).astype(np.uint8)
trace[..., 3] = (alpha * 255).astype(np.uint8)
Image.fromarray(trace, 'RGBA').save(f'{pre}-trace.png', optimize=True)

# Halftone: one dot per cell, radius by the cell's brightness.
cell = max(10, W // 110)
dots = Image.new('RGBA', (w, h), (0, 0, 0, 0))
d = ImageDraw.Draw(dots)
for y in range(0, h, cell):
    for x in range(0, w, cell):
        v = float(l[y:y + cell, x:x + cell].mean())
        r = (cell / 2) * 0.92 * v ** 1.7
        if r > 0.9:
            cx, cy = x + cell / 2, y + cell / 2
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 175, 16, 255))
dots.save(f'{pre}-dots.png', optimize=True)

# Blue hour and golden hour from the same picture.
grey = lum[..., None]
cold = (grey + (a - grey) * 0.45) * np.array([0.78, 0.9, 1.08], np.float32)
cold = 0.03 + curve(np.clip(cold, 0, 1), 4) * 0.8
save_jpg(cold, f'{pre}-cold.jpg')
warm = (grey + (a - grey) * 0.85) * np.array([1.1, 1.0, 0.82], np.float32)
warm = 0.04 + curve(np.clip(warm, 0, 1), 4.5) * 0.94
hi = np.clip((lum - 0.55) / 0.4, 0, 1)[..., None]
warm = warm * (1 - hi * 0.5) + (SUN * 0.6 + 0.4) * hi * 0.5 * (0.6 + lum[..., None])
save_jpg(warm, f'{pre}-warm.jpg')
print(pre)
