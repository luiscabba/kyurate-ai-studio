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

### Pressed K mark
- One matte black tile with a K pressed into the face, rendered in 3D with three.js (`vendor/three.min.js`). 300 × 300 canvas, decorative (`aria-hidden`).
- **Shape**: rounded square (corner radius about 23%), extruded with a soft 8-step bevel, about one fifth as thick as it is wide.
- **Face**: `#2B2927` clay with the K in `#1C1B1A`, Playfair Display 700. A bump map sinks the K into the surface. Fine grain across face and sides. Roughness 0.9, no metalness.
- **Both sides** carry the K, and it reads correctly from the back.
- **Light**: warm key from top left front, cool soft fill from the right, warm rim from behind, warm hemisphere ambient.
- **Shadow**: blurred ellipse under the tile, `rgba(48,36,22,0.24)`, 11px blur. Shrinks and fades as the tile rises.
- **Fallback**: no WebGL shows the flat CSS pressed tile (168px, same colours and grain).

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
- The mark turns slowly on its vertical axis (about one turn every 14s) and floats up and down on a 6s cycle.
- Drag it left or right to spin it. It keeps the momentum, then eases back to the slow turn.
- Demo button fills `admin@kyurate.demo` / `demo-kyurate`.
- Enter in either field signs in.

**Loading** (2.8s)
- 3px ink bar sweeps across the top edge of the card (scaleX 0 → 1, 2.1s).
- Button text becomes three 5px white dots bouncing 3px, 0.15s apart.
- Inputs and buttons disabled.
- The mark spins up fast.

**Done**
- The mark eases to a stop facing front, still floating.
- Form swaps for a centred column, 18px gap, 24px vertical padding:
  - 56px ink circle with a white check drawn in (stroke 3, 0.6s).
  - `Welcome back`, Playfair 400, 32px.
  - `ENTER STUDIO` ink pill, 50px high, 32px side padding, links to `HomeMix.dc.html`.
  - `SIGN OUT` text button, 11px 600, `#5A5A5A`. Resets the form to idle.

## Motion

| What | Animation |
|---|---|
| Mark in | Drop 14px + scale .92 → 1, 0.9s, `cubic-bezier(.3,1.35,.5,1)` |
| Mark idle | Slow turn + 6s float, tilted back slightly |
| Wordmark | Each letter rises 18px from 6px blur, 0.7s, starting 0.55s, 0.06s apart |
| `AI STUDIO` | Rise 16px, 1.05s delay |
| Card | Rise 16px, 0.3s delay |
| Buttons | Hover lift 1px, press scale .97 (0.08s) |
| Input focus | Ink border, `0 0 0 4px rgba(26,26,26,.08)` ring, solid white fill, 0.2s |

`prefers-reduced-motion`: CSS animation and transitions off. The mark holds still at a slight angle and only moves when dragged or signing in.

## Accessibility

- `:focus-visible` 2px ink outline, 3px offset.
- Wordmark has `aria-label="KYURATE"` so the split letters read as one word.
- The mark, grain and pattern SVGs are `aria-hidden`.
- Real `<label>` wraps each input.

## Colour used

`#1A1A1A` ink · `#5A5A5A` secondary · `#F3F1EC` paper · `#FFFFFF` · mark face `#2B2927` · pressed K `#1C1B1A` · mark sides `#252322`
