# Login: Design

File: `Login.dc.html`. Admin sign in for Kyurate AI Studio. Root URL redirects here.

## Layout

- Full viewport, min height 900px, `#F3F1EC` background, 40px padding, content centred both ways.
- Changsal lattice pattern over the whole background (120px tile, ink at 4 to 5% opacity).
- Inner row: max width 1080px, flex wrap, 72px gap, centred.
  - **Left**: brand block, `flex 1 1 360px`, column, centred, 40px gap.
  - **Right**: sign-in card, `flex 0 1 400px`, min width 300px.
- Below ~800px wide the two stack, brand on top.
- "Developed by **texxen**" bottom right, 28px / 18px from edges, 11px, 45% ink (texxen at 70%, 600).

## Brand block

### Tile grid
- 5 × 5 grid, 56px tiles, 10px gap, 6px bottom padding. Decorative (`aria-hidden`).
- Tile radius 22%. Each tile is a two-faced 3D card (perspective 500px, `preserve-3d`, hidden backfaces).
- **Cream tile**: radial gradient `#F7F2E8 → #ECE5D8 → #DCD3C2` from 25% 15%. Inset top highlight, stacked 1 to 4px bottom shadows `#D9CFBD → #C6BBA6`, drop `0 10px 14px rgba(60,45,25,.16)`.
- **Black tile**: radial gradient `#36332F → #252321 → #1A1918`. Inset highlight at 8% white, stacked shadows `#171615 → #0B0B0A`, drop `0 10px 14px rgba(0,0,0,.24)`.
- **Grain**: fractal noise SVG filter (`baseFrequency .9`, 3 octaves) on every face. Multiply at 60% on cream, screen at 35% on black.
- Resting state: black tiles spell a **K** (cells r-c: 0-0, 1-0, 2-0, 3-0, 4-0, 2-1, 1-2, 0-3, 3-2, 4-3). The rest are cream.

### Wordmark
- `KYURATE`: Playfair Display 700, 44px, tracking 0.04em, line height 1.
- `AI STUDIO`: Inter 11px, tracking 0.4em, `#5A5A5A`.
- 6px gap between them.

## Sign-in card

- 36px padding, 32px radius, column, 22px gap. `overflow: hidden` (for the loading bar).
- Glass: `rgba(255,255,255,0.55)`, `blur(24px) saturate(160%)`, 1px border `rgba(255,255,255,0.9)`, `inset 0 1px 0 #FFF, 0 24px 60px rgba(26,26,26,0.1)`.

Contents, top to bottom:

| Element | Spec |
|---|---|
| Eyebrow | `ADMIN`, Inter 11px 600, tracking 0.08em, `#5A5A5A` |
| Title | `Sign in`, Playfair 400, 34px, 6px under the eyebrow |
| Field labels | `EMAIL`, `PASSWORD`. Inter 11px 600, tracking 0.08em, 8px above the input |
| Inputs | 48px high, 16px side padding, 14px radius, 1px `rgba(26,26,26,0.12)`, fill `rgba(255,255,255,0.7)`, Inter 15px 400. 16px between fields |
| Sign in button | 50px high, full width, 999px radius, `#1A1A1A` fill, white `SIGN IN` 12px 600 tracking 0.08em. 6px top margin |
| Demo button | `USE DEMO ACCOUNT`, centred, 40px high, 16px padding, 999px radius, 1px stroke, 50% white fill, 11px 600 |

Autocomplete: `username` on email, `current-password` on password.

## States

**Idle**
- Tiles flip to the next pattern every 2.6s, looping through 4 patterns: K, inverted K, centre tile only, inverted centre.
- Hover a tile: it tilts toward the cursor (up to ±15° on both axes) and lifts 6px in Z. Click a tile to advance the pattern.
- Demo button fills `admin@kyurate.demo` / `demo-kyurate`.
- Enter in either field signs in.

**Loading** (2.8s)
- 3px ink bar sweeps across the top edge of the card (scaleX 0 → 1, 2.1s).
- Button text becomes three 5px white dots bouncing 3px, 0.15s apart.
- Inputs and buttons disabled.
- Tile cycle speeds up to every 0.7s.

**Done**
- Tiles settle back to the K. On the centre-tile patterns the middle tile lifts 16px in Z.
- Form swaps for a centred column, 18px gap, 24px vertical padding:
  - 56px ink circle with a white check drawn in (stroke 3, 0.6s).
  - `Welcome back`, Playfair 400, 32px.
  - `ENTER STUDIO` ink pill, 50px high, 32px side padding, links to `HomeMix.dc.html`.
  - `SIGN OUT` text button, 11px 600, `#5A5A5A`. Resets the form to idle.

## Motion

| What | Animation |
|---|---|
| Tiles in | Drop 18px + scale .85 → 1, 0.6s, `cubic-bezier(.3,1.35,.5,1)`, delay `(row + col) × 0.05s` (diagonal wave) |
| Tile flip | 180° rotateY per change, 0.8s overshoot ease, delay `(row + col) × 0.06s` |
| Tile tilt | 0.15s ease-out while hovering |
| Wordmark | Each letter rises 18px from 6px blur, 0.7s, starting 0.55s, 0.06s apart |
| `AI STUDIO` | Rise 16px, 1.05s delay |
| Card | Rise 16px, 0.3s delay |
| Buttons | Hover lift 1px, press scale .97 (0.08s) |
| Input focus | Ink border, `0 0 0 4px rgba(26,26,26,.08)` ring, solid white fill, 0.2s |

`prefers-reduced-motion`: every animation and transition off. Tiles still show the K.

## Accessibility

- `:focus-visible` 2px ink outline, 3px offset.
- Wordmark has `aria-label="KYURATE"` so the split letters read as one word.
- Grid, grain and pattern SVGs are `aria-hidden`.
- Real `<label>` wraps each input.

## Colour used

`#1A1A1A` ink · `#5A5A5A` secondary · `#F3F1EC` paper · `#FFFFFF` · cream tile `#F7F2E8 / #ECE5D8 / #DCD3C2` · black tile `#36332F / #252321 / #1A1918`
