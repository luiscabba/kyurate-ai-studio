# Kyurate AI Studio: Design

Admin app for generating TikTok-style clothing product videos. Light, warm, editorial. Frosted glass panels on a cream field, black as the only action colour, serif for names and headings, sans for everything else.

## Flow

Login → Home → Upload → Garment lock → Setup → Keyframe preview → Generating → Shot QA → Export

| Screen | File | Job |
|---|---|---|
| Sign in | `Login.dc.html` | Admin sign in, animated KYURATE tile grid |
| Studio (home) | `HomeMix.dc.html` | Credits, drafts, projects, costs, models, queue |
| Upload | `Upload.dc.html` | Garment photos + quality score |
| Garment lock | `Lock.dc.html` | Confirm garment details the model must not drift on |
| Setup | `Setup.dc.html` | Storyboard, look, model, audio |
| Keyframe preview | `Preview.dc.html` | Approve keyframes before spending video credits |
| Generating | `Generate.dc.html` | Per-shot progress |
| Shot QA | `Review.dc.html` | Pass/fail per shot, regenerate failures |
| Export | `Export.dc.html` | TikTok / MP4 output |

## Colour

| Token | Value | Use |
|---|---|---|
| `ink` | `#1A1A1A` | Text, primary buttons, chart bars, focus ring |
| `ink-2` | `#5A5A5A` | Secondary text, eyebrow labels |
| `ink-3` | `#8A8A8A` | Disabled, to-do steps, placeholders |
| `paper` | `#F3F1EC` | Page background |
| `white` | `#FFFFFF` | Text on ink, glass highlights |
| `alert` | `#A3341A` | Failing QA, reshoot, "not set" |
| `ok` | `#1F5E3D` | Completed step dot |
| `hatch` | `#E6E2DA` / `#DEDAD1` | Empty media slot (135° stripes, 8px) |
| `line` | `rgba(26,26,26,0.08)` | Dividers, progress track |
| `stroke` | `rgba(26,26,26,0.12)` | Input and secondary button borders |

Rules: no brand accent colour. Ink is the only fill for actions. Red and green are status only, never decoration.

## Type

Fonts: **Playfair Display** (400, 600, 700) and **Inter** (400, 500, 600), Google Fonts.

| Role | Font | Size / weight | Notes |
|---|---|---|---|
| Wordmark | Playfair | 44 (login), 24 (header) / 700 | `KYURATE`, tracking 0.02 to 0.04em |
| Sub-mark | Inter | 11 / 9px | `AI STUDIO`, tracking 0.32 to 0.4em |
| Page title (h1) | Playfair | 40 / 400 | Plain screen name: "Studio", "Setup", "Shot QA" |
| Section (h2) | Playfair | 26 main column, 22 sidebar / 400 | |
| Item name | Playfair | 15 to 17 / 400 | Garment and project names |
| Big number | Inter | 36 / 500 | Tabular nums, tracking -0.02em |
| Body | Inter | 13 to 15 / 400 | |
| Eyebrow / label | Inter | 11 / 600 | Uppercase, tracking 0.08em |
| Button | Inter | 11 to 12 / 600 | Uppercase, tracking 0.06 to 0.08em |

## Surfaces

**Glass panel** (all cards, header, sign-in card)
```css
background: rgba(255,255,255,0.5);
backdrop-filter: blur(24px) saturate(160%);
border: 1px solid rgba(255,255,255,0.85);
box-shadow: inset 0 1px 0 #FFFFFF, 0 10px 30px rgba(26,26,26,0.06);
```
Sign-in card: 0.55 fill, `0 24px 60px rgba(26,26,26,0.1)`.

**Background pattern**: "changsal" lattice, a 120px tile of square, cross and inner square at 4 to 5% ink opacity. Sits under every screen.

**Credit line**: "Developed by **texxen**", 11px, bottom right, 45% ink.

## Radius

| Value | Use |
|---|---|
| 999px | Buttons, header bar, filter chips |
| 32px | Sign-in card |
| 28px | Section panels |
| 22 to 24px | Stat tiles, project cards |
| 20px | Draft rows |
| 14 to 16px | Inputs, thumbnails, shot frames, glass caption on images |
| 2 to 4px | Progress bars, chart bars |
| 22% | Login grid tiles |

## Spacing and layout

- Max width 1320px, page padding 24 / 40 / 56px.
- Gaps: 32 between page blocks, 24 between panels, 16 in grids, 10 to 14 inside items.
- Panel padding 24px. Tiles 22 × 24px.
- Home: main column (`flex 999 1 600px`) + sidebar (`flex 1 1 340px`, max 420px). Wraps to one column.
- Grids are `auto-fit` / `auto-fill`: stat tiles min 220px, drafts min 260px, projects min 160px.
- Media ratios: projects 4:5, shots 9:16, draft thumbs 80 × 106.

## Components

- **Header**: glass pill, 3-column grid. Left nav (12px uppercase), centre wordmark, right avatar (40px circle) + `NEW VIDEO` ink pill.
- **Primary button**: ink fill, white text, 999px, height 40 to 50. Disabled: `#8A8A8A`.
- **Secondary button**: 1px stroke, 50% white fill, same shape.
- **Filter chip**: 6 × 12px, selected = ink fill + white text, unselected = transparent + `ink-2`.
- **Input**: 48px high, 14px radius, stroke border, 70% white fill. Focus: ink border, `0 0 0 4px rgba(26,26,26,.08)`, solid white fill.
- **Stat tile**: eyebrow, big number, one line of context ("Down 12% from Sept").
- **Draft row**: thumb + stage eyebrow (red if action needed) + serif name + note + `RESUME`.
- **Project card**: full-bleed image, glass caption pinned 8px from edges (platform · length, serif name).
- **Bar chart**: ink bars, 3px top radius, ink baseline, start/end date only.
- **Meter row**: label / 4px track / right-aligned value.
- **Model row**: stage eyebrow, model name (select in configure mode), ON or NOT SET status.
- **Step dots**: done = green, now = ink, to-do = grey text.
- **Shot frame**: 9:16, 16px radius. Failing shot gets a 2px `alert` ring.
- **Empty slot**: hatch stripes with a 10px grey caption.

## Login tile grid

5 × 5 grid of 56px tiles, 10px gap. Cream and black ceramic tiles (radial gradient, stacked 1 to 4px bottom shadows, fractal-noise grain). Lit tiles spell a K. Tiles flip in 3D on a 2.6s cycle, tilt toward the cursor (±15°), and speed up to 0.7s while signing in, then settle back to the K.

## Motion

- Entry: fade + rise 14 to 16px, 0.6 to 0.7s, `cubic-bezier(.2,.7,.2,1)`, staggered 0.05 to 0.2s.
- Wordmark: letters rise with blur, 0.06s apart.
- Hover: buttons and links lift 1px. Images scale 1.04 over 0.5s.
- Press: scale 0.97, 0.08s.
- Charts: bars grow from the baseline. Sign-in loading: top bar sweeps 2.1s, three bouncing dots in the button. Success: drawn check.
- `prefers-reduced-motion`: all animation and transitions off.

## Accessibility

- Focus visible: 2px ink outline, 3px offset.
- Charts carry `role="img"` and an `aria-label`; bars have date + value tooltips.
- Decorative SVG is `aria-hidden`.

## Copy rules

- Headers name what is on the screen. No slogans.
- Labels uppercase, short. Notes say the next action: "Pick a storyboard", "1 shot failing QA".
- No em dashes.
- Unconfirmed model names stay bracketed: `[IMAGE MODEL]`, `[VISION MODEL]`, `[AUDIO MODEL]`, `[LLM]`.

## Build

Static site, no build step. Each screen is a `.dc.html` file: markup in `<template id="dc-template">`, logic in a `DCLogic` class, mounted by `vendor/dc.js` (Preact). Styles are inline per element; keyframes and interaction states sit in each file's `<style>`. `index.html` redirects to `Login.dc.html`.
