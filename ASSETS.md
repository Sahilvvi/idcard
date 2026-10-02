# Asset manifest

The hero, ecosystem, partnership, industry and product images under
`public/assets/` are photorealistic AI renders (Nano Banana Pro via Runway)
that use the real iDM logo from `public/logo.svg` as a brand reference.
Replace any of them with real product photography by dropping a file with the
same name in place (WebP, sRGB, max 2400px on the long edge) — no code change
needed. If a file is missing, the UI renders a labelled "Photography · pending"
placeholder (`src/components/ui/AssetImage.tsx`).

The "How iDM works" flow (`ProcessFlow.tsx`) and the North-East coverage map
(`NorthEastCoverage.tsx`) are inline animated SVG, not image files.

## Hero / OG

| Path | Used in | Intended content |
| --- | --- | --- |
| `assets/hero-id-cards.webp` (21:9) | `Hero.tsx` | Bulk batch of printed iDM ID cards with branded lanyards in cartons |
| `assets/og-idcard.webp` (1200×630) | `layout.tsx` Open Graph / Twitter | Printed IDCARD ID cards with lanyard on ivory background, wordmark bottom-left |

## Ecosystem (pinned panels)

| Path | Intended content |
| --- | --- |
| `assets/raw-materials.webp` | PVC sheets, clips and lanyard rolls stacked in an IDCARD warehouse |
| `assets/software-platform.webp` | Order / plant management dashboard on a laptop, production floor behind |
| `assets/printing-production.webp` | Finished ID cards being packed, cartons labelled for dispatch |

## Product catalogue (`assets/products/`)

Square-ish product photographs, single product, ivory/paper background, soft
top-left light, slight shadow. One per category:

`id-card-holders`, `id-card-sheets`, `lanyards`, `smart-cards`,
`id-card-accessories`, `metal-plastic`, `pvc-ntr-sheets`, `custom-printed`,
`rfid-nfc`, `clips-reels` (all `.webp`).

## Partnership paths

| Path | Intended content |
| --- | --- |
| `assets/partner-workspace.webp` | Printing vendor at a workstation using the IDCARD app |
| `assets/warehouse.webp` | Raw-material warehouse racks with PVC sheet cartons |
| `assets/production-floor.webp` | Card printers running on a partner production floor |

## Manufacturing story (full-bleed, 16:9 or taller)

| Path | Intended content |
| --- | --- |
| `assets/story-source.webp` | Hands inspecting a stack of PVC sheets |
| `assets/story-print.webp` | ID cards moving through a card printer |
| `assets/story-verify.webp` | Operator checking printed cards against a QC sheet |
| `assets/story-deliver.webp` | Packed cartons of ID cards ready for dispatch |

## Industry solutions (16:9)

| Path | Intended content |
| --- | --- |
| `assets/school-id-cards.webp` | Student ID cards with school lanyards on a desk |
| `assets/event-badges.webp` | Event badges and lanyards at a registration counter |
| `assets/corporate-id-cards.webp` | Employee access cards with RFID reader |

## Partner logos (`assets/logos/partner-01.svg` … `partner-12.svg`)

Monochrome SVG logos of client schools / corporates, ~120×40 viewBox, single
colour `currentColor`. Until supplied, the marquee renders a labelled
"PARTNER 01" wordmark tile. Update `partnerLogos` in `src/lib/content.ts` with
real names for alt text once logos are available.
