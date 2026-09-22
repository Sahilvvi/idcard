"""Regenerate the flat-illustration placeholder assets in the site palette.

Usage: python3 scripts/generate-illustrations.py
Requires Pillow. Writes WebP files under public/assets/.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent / "public" / "assets"

NAVY = (10, 26, 58)
NAVY_SOFT = (17, 42, 92)
BRAND = (29, 78, 216)
BRAND_DEEP = (30, 63, 174)
TEAL = (14, 165, 164)
AMBER = (245, 158, 11)
WHITE = (255, 255, 255)
SURFACE = (246, 248, 252)
INK = (11, 18, 32)

THEMES = {
    "blue": (BRAND_DEEP, TEAL, AMBER),
    "navy": (NAVY, BRAND, AMBER),
    "teal": (TEAL, BRAND, WHITE),
    "amber": ((217, 119, 6), AMBER, NAVY),
    "light": ((233, 238, 247), WHITE, BRAND),
}


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient(size, c1, c2, angle=35):
    w, h = size
    img = Image.new("RGB", size)
    px = img.load()
    rad = math.radians(angle)
    dx, dy = math.cos(rad), math.sin(rad)
    span = abs(w * dx) + abs(h * dy)
    for y in range(h):
        for x in range(w):
            t = ((x * dx + y * dy) + (w * dx if dx < 0 else 0) + (h * dy if dy < 0 else 0)) / span
            px[x, y] = lerp(c1, c2, max(0.0, min(1.0, t)))
    return img


def glow(img, center, radius, color, alpha=140):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = center
    d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=color + (alpha,))
    layer = layer.filter(ImageFilter.GaussianBlur(radius * 0.6))
    img.alpha_composite(layer)


def dots(img, color, step=48, r=2, alpha=40):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    w, h = img.size
    for y in range(step // 2, h, step):
        for x in range(step // 2, w, step):
            d.ellipse((x - r, y - r, x + r, y + r), fill=color + (alpha,))
    img.alpha_composite(layer)


def rrect(d, box, r, fill, outline=None, width=0):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)


def shadow(img, box, r, blur=30, alpha=90, offset=(0, 24)):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x0, y0, x1, y1 = box
    ox, oy = offset
    d.rounded_rectangle((x0 + ox, y0 + oy, x1 + ox, y1 + oy), radius=r, fill=(6, 18, 42, alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    img.alpha_composite(layer)


# ---------- motifs ----------

def id_card(img, box, accent=BRAND, face=WHITE, photo=None, lanyard=False, angle=0):
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    card = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(card)
    rrect(d, (0, 0, w - 1, h - 1), int(min(w, h) * 0.09), face)
    rrect(d, (0, 0, w - 1, int(h * 0.26)), int(min(w, h) * 0.09), accent)
    d.rectangle((0, int(h * 0.16), w - 1, int(h * 0.26)), fill=accent)
    # photo
    pw = int(w * 0.34)
    px0, py0 = int(w * 0.1), int(h * 0.2)
    rrect(d, (px0, py0, px0 + pw, py0 + int(pw * 1.15)), int(pw * 0.12), photo or (233, 238, 247))
    d.ellipse((px0 + pw * 0.28, py0 + pw * 0.18, px0 + pw * 0.72, py0 + pw * 0.62), fill=lerp(accent, WHITE, 0.55))
    d.pieslice((px0 + pw * 0.08, py0 + pw * 0.6, px0 + pw * 0.92, py0 + pw * 1.35), 180, 360, fill=lerp(accent, WHITE, 0.55))
    # text lines
    tx = px0 + pw + int(w * 0.08)
    for i, frac in enumerate((0.6, 0.45, 0.5)):
        yy = py0 + i * int(h * 0.09)
        rrect(d, (tx, yy, tx + int((w - tx - w * 0.1) * frac), yy + int(h * 0.035)), 6, (223, 229, 240) if i else INK)
    # chip / barcode
    rrect(d, (int(w * 0.1), int(h * 0.7), int(w * 0.24), int(h * 0.8)), 8, AMBER)
    for i in range(10):
        bx = int(w * 0.34) + i * int(w * 0.05)
        d.rectangle((bx, int(h * 0.7), bx + int(w * 0.02) if i % 3 else bx + int(w * 0.03), int(h * 0.82)), fill=INK)
    # slot
    rrect(d, (int(w * 0.38), int(h * 0.05), int(w * 0.62), int(h * 0.09)), 8, lerp(accent, INK, 0.4))
    if angle:
        card = card.rotate(angle, expand=True, resample=Image.BICUBIC)
    if lanyard:
        lan = Image.new("RGBA", img.size, (0, 0, 0, 0))
        ld = ImageDraw.Draw(lan)
        cx = (x0 + x1) // 2
        ld.line([(cx - w * 0.5, -40), (cx, y0 + 10)], fill=accent, width=int(w * 0.06))
        ld.line([(cx + w * 0.5, -40), (cx, y0 + 10)], fill=accent, width=int(w * 0.06))
        img.alpha_composite(lan)
    shadow(img, box, int(min(w, h) * 0.09))
    ox = x0 - (card.width - w) // 2
    oy = y0 - (card.height - h) // 2
    img.alpha_composite(card, (ox, oy))


def circle_badge(img, center, r, color=WHITE, alpha=255):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = center
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=color + (alpha,))
    img.alpha_composite(layer)


def stack(img, box, colors, n=4, gap=22):
    """Stacked sheets/boxes."""
    x0, y0, x1, y1 = box
    h = (y1 - y0 - gap * (n - 1)) // n
    for i in range(n):
        yy = y0 + i * (h + gap)
        b = (x0 + i * 10, yy, x1 - i * 10, yy + h)
        shadow(img, b, 18, blur=18, alpha=60, offset=(0, 12))
        d = ImageDraw.Draw(img)
        rrect(d, b, 18, colors[i % len(colors)])


def dashboard(img, box, accent=BRAND):
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    shadow(img, box, 28)
    d = ImageDraw.Draw(img)
    rrect(d, box, 28, WHITE)
    rrect(d, (x0, y0, x1, y0 + int(h * 0.11)), 28, SURFACE)
    d.rectangle((x0, y0 + int(h * 0.06), x1, y0 + int(h * 0.11)), fill=SURFACE)
    for i, c in enumerate(((251, 113, 133), AMBER, (22, 163, 74))):
        cx = x0 + 34 + i * 26
        d.ellipse((cx - 7, y0 + 24, cx + 7, y0 + 38), fill=c)
    # sidebar
    rrect(d, (x0 + 24, y0 + int(h * 0.16), x0 + int(w * 0.22), y1 - 24), 18, SURFACE)
    for i in range(6):
        yy = y0 + int(h * 0.2) + i * int(h * 0.09)
        rrect(d, (x0 + 44, yy, x0 + int(w * 0.19), yy + 14), 7, accent if i == 1 else (223, 229, 240))
    # stat cards
    gx0 = x0 + int(w * 0.26)
    cw = (x1 - 24 - gx0 - 2 * 18) // 3
    for i, c in enumerate((accent, TEAL, AMBER)):
        bx = gx0 + i * (cw + 18)
        rrect(d, (bx, y0 + int(h * 0.16), bx + cw, y0 + int(h * 0.34)), 16, SURFACE)
        rrect(d, (bx + 16, y0 + int(h * 0.19), bx + 16 + int(cw * 0.4), y0 + int(h * 0.21)), 4, (223, 229, 240))
        rrect(d, (bx + 16, y0 + int(h * 0.245), bx + 16 + int(cw * 0.6), y0 + int(h * 0.29)), 6, c)
    # bar chart
    cx0, cy0, cx1, cy1 = gx0, y0 + int(h * 0.4), x1 - 24, y1 - 24
    rrect(d, (cx0, cy0, cx1, cy1), 16, SURFACE)
    n = 9
    bw = (cx1 - cx0 - 40) // n
    for i in range(n):
        bh = int((cy1 - cy0 - 60) * (0.3 + 0.7 * abs(math.sin(i * 0.9 + 1))))
        bx = cx0 + 20 + i * bw
        rrect(d, (bx + 8, cy1 - 20 - bh, bx + bw - 8, cy1 - 20), 8, accent if i in (3, 6) else lerp(accent, WHITE, 0.7))


def boxes(img, box, accent=AMBER):
    """Packed cartons for fulfilment."""
    x0, y0, x1, y1 = box
    w = x1 - x0
    bw = w // 3
    d = ImageDraw.Draw(img)
    for i, (bx, by, s) in enumerate(((0, 1, 1.0), (1, 1, 1.0), (2, 1, 1.0), (0.5, 0, 0.9), (1.5, 0, 0.9))):
        sz = int(bw * s)
        xx = x0 + int(bx * bw)
        yy = y1 - (int(by) + 1) * bw if by == 1 else y1 - bw - sz
        b = (xx + 6, yy + 6, xx + sz - 6, yy + sz - 6)
        shadow(img, b, 14, blur=16, alpha=70, offset=(0, 10))
        d = ImageDraw.Draw(img)
        rrect(d, b, 14, lerp(accent, WHITE, 0.15 if i % 2 else 0.0))
        d.rectangle((xx + sz * 0.42, yy + 6, xx + sz * 0.58, yy + sz - 6), fill=lerp(accent, INK, 0.35))
        rrect(d, (xx + sz * 0.16, yy + sz * 0.62, xx + sz * 0.36, yy + sz * 0.72), 4, WHITE)


def lanyard_coil(img, center, r, color):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = center
    for i in range(4):
        rr = r - i * int(r * 0.22)
        d.ellipse((cx - rr, cy - rr * 0.55, cx + rr, cy + rr * 0.55), outline=color + (255,), width=int(r * 0.09))
    img.alpha_composite(layer)


# ---------- scenes ----------

def base(size, theme, angle=35, light=False):
    c1, c2, c3 = THEMES[theme]
    img = gradient(size, c1, c2, angle).convert("RGBA")
    w, h = size
    glow(img, (int(w * 0.85), int(h * 0.2)), int(min(w, h) * 0.4), c3, 110 if not light else 70)
    glow(img, (int(w * 0.1), int(h * 0.9)), int(min(w, h) * 0.35), c2 if light else WHITE, 60)
    dots(img, INK if light else WHITE, alpha=45 if light else 35)
    return img


def scene_hero(path):
    img = base((1200, 1000), "navy", 30)
    circle_badge(img, (600, 470), 300, WHITE, 18)
    circle_badge(img, (600, 470), 220, WHITE, 22)
    id_card(img, (270, 300, 590, 780), accent=BRAND, lanyard=True, angle=8)
    id_card(img, (610, 260, 930, 740), accent=TEAL, lanyard=True, angle=-6)
    id_card(img, (450, 420, 750, 870), accent=AMBER, lanyard=False, angle=2)
    save(img, path)


def scene_og(path):
    img = base((1200, 630), "navy", 20)
    id_card(img, (120, 120, 420, 560), accent=BRAND, angle=-5)
    id_card(img, (380, 80, 660, 500), accent=TEAL, angle=4)
    dashboard(img, (720, 140, 1120, 500))
    save(img, path)


def scene_materials(path):
    img = base((1200, 900), "blue", 40)
    circle_badge(img, (600, 450), 330, WHITE, 16)
    stack(img, (300, 240, 700, 700), [WHITE, SURFACE, (223, 229, 240)], n=5, gap=26)
    lanyard_coil(img, (880, 560), 150, AMBER)
    lanyard_coil(img, (880, 560), 95, WHITE)
    save(img, path)


def scene_software(path):
    img = base((1200, 900), "navy", 30)
    dashboard(img, (170, 170, 1030, 740))
    save(img, path)


def scene_production(path):
    img = base((1200, 900), "amber", 40)
    circle_badge(img, (600, 470), 320, WHITE, 16)
    boxes(img, (300, 260, 900, 760), accent=NAVY_SOFT)
    id_card(img, (860, 200, 1080, 520), accent=BRAND, angle=-10)
    save(img, path)


def scene_warehouse(path):
    img = base((1200, 900), "teal", 40)
    stack(img, (160, 260, 520, 720), [WHITE, SURFACE], n=4)
    stack(img, (560, 200, 920, 720), [WHITE, SURFACE, (223, 229, 240)], n=5)
    boxes(img, (860, 420, 1160, 740), accent=AMBER)
    save(img, path)


def scene_workspace(path):
    img = base((1200, 900), "blue", 25)
    dashboard(img, (120, 220, 720, 700), accent=TEAL)
    id_card(img, (780, 220, 1060, 640), accent=AMBER, angle=-8)
    save(img, path)


def scene_floor(path):
    img = base((1200, 900), "navy", 40)
    for i in range(3):
        id_card(img, (160 + i * 300, 300, 400 + i * 300, 660), accent=[BRAND, TEAL, AMBER][i])
    d = ImageDraw.Draw(img)
    rrect(d, (100, 680, 1100, 720), 20, lerp(NAVY_SOFT, WHITE, 0.15))
    save(img, path)


def scene_industry(path, accent, n=3):
    img = base((1600, 900), "blue" if accent is BRAND else ("amber" if accent is AMBER else "navy"), 30)
    circle_badge(img, (800, 470), 340, WHITE, 16)
    for i in range(n):
        x = 800 - (n - 1) * 150 + i * 300 - 130
        id_card(img, (x, 260, x + 260, 650), accent=[accent, TEAL, WHITE][i % 3] if i else accent, lanyard=True, angle=(-6, 0, 6)[i % 3])
    save(img, path)


def scene_product(path, kind):
    img = base((900, 1125), kind[1], 45)
    circle_badge(img, (450, 520), 300, WHITE, 18)
    k = kind[0]
    if k == "card":
        id_card(img, (230, 260, 670, 900), accent=kind[2], angle=-4)
    elif k == "lanyard":
        lanyard_coil(img, (450, 560), 260, kind[2])
        lanyard_coil(img, (450, 560), 170, WHITE)
        id_card(img, (330, 640, 570, 1000), accent=kind[2], angle=3)
    elif k == "sheets":
        stack(img, (200, 260, 700, 880), [WHITE, SURFACE, (223, 229, 240)], n=6, gap=20)
    elif k == "holder":
        d = ImageDraw.Draw(img)
        shadow(img, (220, 260, 680, 900), 40)
        d = ImageDraw.Draw(img)
        rrect(d, (220, 260, 680, 900), 40, WHITE + (200,))
        id_card(img, (260, 320, 640, 860), accent=kind[2])
    elif k == "accessories":
        d = ImageDraw.Draw(img)
        for i, (cx, cy, r) in enumerate(((300, 420, 90), (560, 380, 70), (420, 680, 110), (640, 700, 60))):
            circle_badge(img, (cx, cy), r, [WHITE, kind[2], SURFACE, AMBER][i % 4])
            circle_badge(img, (cx, cy), int(r * 0.5), kind[1] and THEMES[kind[1]][0])
    elif k == "reel":
        circle_badge(img, (450, 420), 190, WHITE)
        circle_badge(img, (450, 420), 120, kind[2])
        circle_badge(img, (450, 420), 40, WHITE)
        d = ImageDraw.Draw(img)
        d.line([(450, 600), (450, 800)], fill=WHITE, width=10)
        id_card(img, (350, 780, 550, 1060), accent=kind[2], angle=-3)
    elif k == "boxes":
        boxes(img, (200, 400, 700, 900), accent=kind[2])
    save(img, path)


def save(img, path):
    path = ROOT / path
    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(path, "WEBP", quality=82, method=6)
    print("wrote", path.relative_to(ROOT.parent.parent))


if __name__ == "__main__":
    scene_hero("hero-id-cards.webp")
    scene_og("og-idcard.webp")
    scene_materials("raw-materials.webp")
    scene_software("software-platform.webp")
    scene_production("printing-production.webp")
    scene_warehouse("warehouse.webp")
    scene_workspace("partner-workspace.webp")
    scene_floor("production-floor.webp")
    scene_industry("school-id-cards.webp", BRAND)
    scene_industry("event-badges.webp", AMBER)
    scene_industry("corporate-id-cards.webp", NAVY)

    products = {
        "id-card-holders": ("holder", "blue", BRAND),
        "id-card-sheets": ("sheets", "teal", TEAL),
        "lanyards": ("lanyard", "navy", AMBER),
        "smart-cards": ("card", "navy", TEAL),
        "id-card-accessories": ("accessories", "blue", TEAL),
        "metal-plastic": ("card", "amber", NAVY),
        "pvc-ntr-sheets": ("sheets", "blue", BRAND),
        "custom-printed": ("boxes", "teal", NAVY_SOFT),
        "rfid-nfc": ("card", "blue", AMBER),
        "clips-reels": ("reel", "navy", BRAND),
    }
    for name, kind in products.items():
        scene_product(f"products/{name}.webp", kind)
