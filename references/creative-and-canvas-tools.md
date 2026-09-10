# Creative and canvas tools

**Evaluated:** 2026-09

## What this archetype is for

Tools where the user's artifact is the interface's only reason to exist: vector and UI editors (Figma, Penpot, Graphite), whiteboards (tldraw, Excalidraw, FigJam), motion and 3D (Rive, Cavalry, Spline, Blender), raster editors (Photoshop/Lightroom web, Photopea), template-first consumer design (Canva, Polotno), and — at the far edge — document canvases where the "canvas" is a page (Notion, Craft, Obsidian). The shared situation: a person is in this app for two to eight hours, looking at *their thing*, and every pixel of chrome is a tax on that. What does **not** belong here: dashboards, CRUD admin, anything where the app's own data is the subject. If the user came to read what your product knows, you are building an information archetype, not a canvas one — the rules below (chrome that shrinks, panels that never move, keyboard-first everything) will make that product worse.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Figma** (UI3) | The reference properties panel; the light-default decision | Unit/axis glyph *inside* the field on the left, value in black, glyph in gray — no label column at all |
| **tldraw** | Publishes its whole system on `:root` — 5 radii, 10 spaces, 4 shadows, a 30-entry z-index registry, 10 custom cursors — readable in one `getComputedStyle` call | Ship your own SVG cursors with a drop shadow, and divide overlay geometry by zoom (`--tl-scale: calc(1 / var(--tl-zoom))`) |
| **Excalidraw** | Nine property groups in a 200px island where not one option button carries a word; live collaboration with no account | Every option button renders the *effect* (line thickness, dash, squiggle), never a word |
| **Graphite** (not on the list) | 80 `:root` tokens including a 16-step pure-gray ramp and ten data-type color pairs, all readable in the browser; a node graph and a raster/vector canvas in one document | A persistent status bar that lists the live modifier chords for the current tool, updating per tool |
| **Penpot** (not on the list) | Open-source Figma-class editor; proves the panel pattern is convergent, not proprietary | DESIGN / PROTOTYPE / INSPECT as three tabs over one panel body, so the panel width never changes with mode |
| **Rive** | Editor, state-machine graph and runtime preview in one window, on four collapsible panel edges | Collapsed panels become vertical text tabs welded to the window edge — zero-width when closed |
| **Framer** | The canvas compiles to a live site; the AI agent is a docked right column with a fixed width, not an overlay | Treat the AI agent as another panel, not a floating orb over the artwork |
| **Photopea** | A PSD-compatible raster editor in a tab, with the importable-format list printed on the start screen | Its start screen doubles as a capability advertisement — the list of importable formats *is* the empty state |
| **Canva / Polotno** | The consumer end: ten labeled 74×72px rail cells, a template gallery as the first screen, no properties panel until something is selected | A wide left rail with **labeled** icons (~74×72px cells) — the opposite of a pro tool, and correct for its audience |
| **Cavalry** | Motion design where the dark chrome is a color-judgement decision about video output, not a style | Dark chrome justified by the medium (video), not by fashion |
| **Blender** (contrast) | Everything-is-a-region, no modal dialogs, status bar teaches the keyboard | Any region can become any editor; there is no "main" panel to protect |
| **Notion / Craft / Obsidian** | The document end of the canvas: block handles appear only on hover, and the type system carries 544 tokens including per-weight tracking | Notion's tracking varies *by weight at the same size*; line-heights are drawn from the layout spacing scale |

## Measured specifics

All values below were read from live `getComputedStyle` / CSS custom properties, or measured from `getBoundingClientRect`, in a 1440×900 viewport at DPR 2, September 2026. Anything I could not measure is marked *observed*. Values re-probed and confirmed in the 2026-09 direction pass are marked ✓; values corrected in that pass are marked ✎ with the old value named.

### Graphite (editor.graphite.rs, dark) — the fullest readable token set in the space

| Thing | Value |
|---|---|
| Neutral ramp ✓ | 16 steps named by hex digit: `--color-0-black` `#000` → `--color-f-white` `#fff`, one per digit (`#111 #222 #333 #444 #555 #666 #777 #888 #999 #aaa #bbb #ccc #ddd #eee`) |
| App background / panel background | `#222` (`color-2-mildblack`) / `#111` (`color-1-nearblack`) — **panels are darker than the frame**, i.e. wells |
| Body text ✓ | `#eee`, 14px, `Source Sans Pro, Arial` |
| Line-heights ✓ (both, refined) | `body` is 14px/**14px** (1.0) — leading equals the font size, so a row's height is its control's height, never its type's. Inside a field the text is 14px/**18px**. The status bar is 14px/14px. Panel-header rows are 14px/**28px**, i.e. the leading *is* the row height. |
| Panel radius ✓ | 6px; document tab radius `6px 6px 0 0`, active tab bg `#333` |
| Title bar / tab bar height ✓ | 28px each |
| Status bar height ✎ | **24px** (first pass and the failure section both said 28px) |
| Properties panel width ✓ | 287.2px total, 279.2px content (4px inset per side); Layers panel is the identical 287.2px stacked below it |
| Viewport panel width ✓ | 1148.8px of 1440 = **79.8%** |
| Control height ✓ | **24px** for every input in the panel (measured on a text field: 24px tall, radius **2px**, bg `#111`, 4px gap under a 16px label row) |
| Property row pitch (*first pass, not re-verified*) | **32px** = 24px control + 8px gap |
| Number input width (*first pass, not re-verified*) | 80px |
| Paired X/Y input pitch | 84px (80px field + 4px gutter) |
| Slider-style number input | 125.4px wide × 24px |
| Icon buttons | 16px and 24px square variants, radius 2px |
| Data-type colors (bright / dim pairs) ✓ | general `#cfcfcf`/`#8a8a8a` · number `#c9a699`/`#886b60` · artboard `#fbf9eb`/`#b9b9a9` · graphic `#68c587`/`#37754c` · raster `#e4bb72`/`#9a7b43` · vector `#65bbe5`/`#417892` · color `#ce6ea7`/`#924071` · gradient `#af81eb`/`#6c489b` · typography `#eea7a7`/`#955252` · invalid `#d6536e`/`#a7324a` |
| Selection / overlay accent ✓ | `--color-overlay-blue` `#00a8ff` — the one saturated color in the entire chrome |
| Error / warning ✓ | `#d6536e` / `#d5aa43` |
| Inheritance affordances | a 4×4 dot texture (`#444` and `#666` variants) and a 45° 1px stripe texture at a `3px·√2/2` period — Graphite marks *where a value comes from* with a background texture rather than an icon |
| Transparency checker ✓ | 16×16px, `#ccc` on `#fff`, offset `0 0, 8px 8px, 8px 8px`; a "mini" 8×8 variant at `0 0, 4px 4px, 4px 4px`, plus a `-plus-one` variant offset by 1px for controls that sit inside a 1px border |
| "No color" swatch | a red diagonal line drawn as an inline SVG data URI sized `60px 24px` / `80px 32px` — one token per control size |

The data-type palette is the finding worth copying: every socket, connector dot and property row in Graphite is tinted by the *type* of value it carries, and every color ships with a pre-computed dim twin used for disabled/unconnected. Salmon `#c9a699` on the Translation/Rotation/Scale/Skew rows is not decoration — it means "this is a number".

### tldraw (tldraw.com)

| Thing | Value |
|---|---|
| Space scale ✓ | `--tl-space-1..10` = **2, 4, 8, 12, 16, 20, 28, 32, 64, 72** — note 20 and 28; this is not an 8px grid |
| Radius scale ✓ | `--tl-radius-0..4` = **2, 4, 6, 9, 11** — note 9 and 11, not 8 and 12 |
| Light: canvas / panel / panel-contrast | `#f9fafb` / `#fcfcfc` / `#fff` — **the panel is lighter than the canvas** |
| Light: divider / low / hint / muted-1 | `#e8e8e8` / `#edf0f2` / `#0000000e` / `#0000001a` |
| Light: text ramp | `#000`, `#1c1c1c`, `#2e2e2e`, `#6e7477`, disabled `#888d91` |
| Light: primary/selected/focus | `#3182ed` / `#3182ed` / `#2d67d2` |
| Selection fill / stroke | `#1f8fff3d` (24% α) / `#3182ed`; dark mode fill drops to `#2495ff33` (20% α), stroke unchanged |
| Dark: canvas / panel / panel-contrast / divider | `#101011` / `#202025` / `#353442` / `#33333d` |
| Semantic (light) ✓ | success `#2f7f33` · info `#0287cf` · warning `#ed6c02` · danger `#d00b0b` · tooltip `#090b0c` |
| Semantic (dark) — a separate ramp, not an opacity trick ✓ | success `#68bb6c` · info `#28b5f6` · warning `#ffa724` · danger `#ef6161` · tooltip `#fff` (inverted) |
| Shadow 1 (light) ✓ | `0 1px 2px #00000040, 0 1px 3px #00000017` — the only one of the four with **no** inset hairline |
| Shadow 2 (light) ✓ | `0 0 2px #00000029, 0 2px 3px #0000003d, 0 2px 6px #0000001a, inset 0 0 0 1px #fff` |
| Shadow 4 (light) ✓ | `0 0 3px #00000030, 0 5px 4px #00000029, 0 2px 16px #0000000f, inset 0 0 0 1px #fff` |
| Style panel ✎ | 148px wide, radius 9px, `--tl-color-panel` `#fcfcfc`, **shadow-2** (first pass said shadow-4); sections are 148px-wide blocks with a **7px** gap between them |
| Style-panel swatch buttons ✓ | 40×40px hit area on a **36px** pitch (measured x: 1284 / 1320 / 1356 / 1392) — hit areas deliberately overlap by 4px so there is no dead gap |
| Toolbar tool buttons ✎ | **48×48px hit area on a 44px pitch** (measured x: 501 / 545 / 589 / 633 …, y 844) — a *second* hit tier, 20% larger than the swatches, because a toolbar tool is hit mid-gesture without looking. The earlier row labelled "tool / swatch buttons" measured only the style panel and should not be read as covering the toolbar. |
| UI type ✓ | Inter, 12px / 19.2px (1.6), weight 500 |
| Transition duration on style-panel controls ✓ | `0s`. Not "fast". Zero. |
| Frame (artboard) label geometry ✓ | `--tl-frame-height` 24px, `--tl-frame-padding-x` 6px, `--tl-frame-offset-width` 16px, `--tl-frame-minimum-width` 32px — the label is a token set, so it stays legible on a 32px frame |
| Comment pin ✓ | `--tlui-cmt-pin-size` 28px, marker transition **80ms ease**, hover scale 1.08 — the one place tldraw allows motion, and it is 80ms, not 300ms |
| Zoom-invariance | `--tl-scale: calc(1 / var(--tl-zoom))` — every overlay divides by it, so a 1px selection stroke is 1px at 3200% |
| Canvas text legibility | `--tl-text-outline`: six shadows at ±`min(.5, 1/zoom) * 2px` in the *background* color, so shape text survives any fill under it |
| Shape fonts ✓ | four: `tldraw_draw`, `tldraw_sans`, `tldraw_serif`, `tldraw_mono` — shipped as fonts, not as a `font-family` string, so a shape renders identically on every machine |

**tldraw's z-index registry** is worth transcribing verbatim, because "what draws on top of what" is the single hardest thing to retrofit into a canvas app:

```
/* document plane */
canvas-hidden -999999 · canvas-background 100 · canvas-grid 150
collaborators 245 · watermark 248 · canvas-in-front 250
canvas-shapes 300 · canvas-overlays 500 · canvas-blocker 10000

/* chrome plane — omitted from the first pass, and it is the half that
   decides what a modal can cover */
panels 300 · menus 400 · toasts 650 · cursor 700 · header-footer 999

/* inside the overlay layer */
collaborator-scribble 10 · collaborator-brush 20 · collaborator-shape-indicator 30
user-scribble 40 · user-brush 50 · user-snapline 90
selection-fg 100 · user-handles 105 · indicator-hint 110
collaborator-cursor-hint 120 · collaborator-cursor 130

/* text editing, its own tiny stack */
text-container 1 · text-content 3 · text-editor 4
```

Two ordering decisions, both worth copying. First: **every collaborator overlay sits below every one of yours, except their cursor, which sits above everything.** Their marquee never covers your handles; their pointer is never hidden by your selection. Second: the chrome plane is a *separate* ramp that tops out at 999, while `canvas-blocker` is 10000 — so the modal scrim outranks every panel, menu and toast by an order of magnitude and there is no ambiguity about what a modal covers. A registry with one flat ramp cannot express either decision.

tldraw also ships **its own cursors** — 32×32 inline-SVG data URIs for default, pointer, cross, comment, move, grab, grabbing, text, zoom-in, zoom-out — each wrapped in `<feDropShadow dx="1" dy="1" stdDeviation="1.2" flood-opacity=".5"/>` with an explicit hotspot (`cross` at `16 16`, `text` at `4 10`, `comment` at `5 19`). A system cursor disappears against a white artboard; a shadowed one never does.

### Excalidraw (excalidraw.com)

| Thing | Value |
|---|---|
| Primary ramp | `#6965db` family: darker `#5b57d1`, darkest `#4a47b1`, hover `#5753d0`, light `#e3e2fe`, light-darker `#d7d5ff`. *Caveat from the direction pass:* the token values above are first-pass reads; the **computed** background of a selected option button now measures `#e0dfff`, so either `--color-primary-light` moved or the button no longer uses it. Trust the computed value over the token when they disagree. |
| Gray ramp (11 steps) | 10 `#f5f5f5` · 20 `#ebebeb` · 30 `#d6d6d6` · 40 `#b8b8b8` · 50 `#999999` · 60 `#7a7a7a` · 70 `#5c5c5c` · 80 `#3d3d3d` · 85 `#242424` · 90 `#1e1e1e` · 100 `#121212` |
| Danger | `#db6965` / darker `#d65550` / darkest `#d1413c`; background `#fff0f0`, icon background `#ffdad6`, text `#700000` |
| Warning | `#fceeca` / dark `#f5c354` / darker `#f3ab2c` / darkest `#ec8b14`; **warning text = normal body text color, not white** |
| Island (panel) ✓ (ellipsis resolved) | bg `#fff`, padding 12px, radius 8px, shadow `0 0 1px #0000002b, 0 0 3px #00000014, 0 7px 14px #0000000d` — three layers, the third a wide 14px lift |
| Left properties island ✓ | 200px wide; 642px tall with a rectangle selected (nine groups) |
| Top toolbar island ✓ | 542×44px, 4px padding, radius 8px; tool buttons 36×36, radius 8px, **40px pitch**, with the first gap 49px because a lock toggle and a hairline rule sit ahead of the tools |
| Property option button ✎ | 32×32, radius 8px, 40px pitch, unselected `#f6f6f9`; selected fill is **`#e0dfff`** (first pass said `#e3e2fe`). Still a fill, never a border, never a size change. |
| Property group ✓ | `<fieldset>` + `<legend>`; legend 12px, 15px tall; group pitch **71px** (measured y: 218 / 289 / 360 / 431) |
| Group names, in order ✓ | `Stroke` `Background` `Stroke width` `Stroke style` `Sloppiness` `Edges` `Opacity` `Layers` `Actions` — nine words total in a 200px panel, and every one of them names a result, not a mechanism |
| Color rows ✓ | five preset swatches, then a **1px vertical rule**, then a sixth larger swatch that is the *current* value and opens the full picker. Transparent is drawn as a checkerboard, not the word "none". |
| Opacity slider ✓ | no live numeric readout; `0` and `100` printed as static end labels under the track |
| Type ✓ | body `Assistant` 16px; UI labels 12px |
| Collaborator avatar | 28×28, `border-radius: 100%`, 12px initials in near-black `#1e1e1e` on a pastel fill (`#a8c5ff`, `#d4a8ff`), 39px pitch |
| Current user | wrapped in a 49×30 pill, radius 20px, bg `#ececf4`, 1px `#ebebeb` border, with a chevron — everyone else is a bare avatar |
| Remote cursor | small solid triangle in the user's hue + a rounded name pill in the *same* hue with near-black text |

### Notion ("tatami" design system, **544** tokens on `:root` ✓ — exact count re-confirmed)

| Thing | Value |
|---|---|
| Spacing ✓ | 0, 4, 8, 12, 16, 20, 24, 28, **30**, 32, 40, 48, 56, 64, 72, 80, 96, **100**, 128, 160 |
| Radius ✓ | 0, 4, **5**, 6, 8, 10, 12, 14, 16, and `round` = 624.938rem |
| Font sizes ✓ | 12, 14, **15**, 16, 18, 20, 22, 26, 32, 42, 54, 64, 76, 96 |
| Line heights ✓ | 16, 20, 20, 24, 28, 28, 28, **30**, 32, 40, 48, 56, 64, 80, 100 — every value is a member of the spacing scale, including the odd 30px step |
| Tracking, **per weight at the same size** ✓ | size-600: regular −1px, semibold/bold −0.75px · size-700: regular −2px, semibold/bold −1.5px · size-800: regular −3.5px, semibold/bold −1.875px · size-1000: regular −4px, bold −2.5px |
| The rule behind that ramp ✎ (added) | The regular/bold gap **widens with size**: 0.25px apart at 32px type, 1.625px apart at 54px, 1.5px at 76px. Notion is not tracking by size — it is correcting for how much more sidebearing a heavier weight carries at display sizes. Three separate ramps exist: sans (0 → −4.6px), serif (0 → −2px), and mono, which is a near-zero ramp (−0.107px to −0.571px) because a monospace face has fixed advance widths and nothing to correct. |
| Numerals | `font-feature-settings: "lnum" 1, "locl" 0` on the sans stack — lining figures forced on |
| Body text color | `rgba(0,0,0,0.898)`–`0.95` — alpha on black, not a hex gray, so it composites correctly over page covers and colored blocks |
| Where this stops being canvas advice | Notion is in this file for one reason: type on a document canvas. Its spacing scale, its 15px step and its tracking table transfer. Its chrome does not — Notion has no zoom, no overlay layer, no selection handles, no z-index policy, and nothing below to steal on any of those. |

### Canva-class rails (measured on Polotno Studio, an explicit Canva clone) ✓

Left rail tab cell: **74.48px wide × 72px tall**, padding `15px 5px 0`, icon above a **12px/18px** label, on a `#161616` full-height rail; type is IBM Plex Sans. Ten cells — `Templates` `AI tools` `Assets` `Brand Kit` `Text` `Draw` `Background` `Layers` `Resize` `Import` — occupy **720px** of an 852px rail. Compare Figma/Graphite, whose tool column is a single ~24–44px strip of unlabeled icons. The 3× difference in cell area is the entire consumer/pro divide made visible.

Two things the first pass missed, both visible at 1440: the side panel is **closed on load** — the rail alone is the first screen, and the artboard is centered on a `#e5e5e5` ground with the zoom control (`− 64% +`) bottom-centre. And Polotno's chrome is **dark over a light artboard**, which is the exact configuration finding 8 argues against. See the boundary note there.

### Figma UI3 right panel (*observed* from Figma's own help-center screenshot; ratios, not measured pixels)

- Row 1: avatar + chevron, play, Share. Row 2: `Design` / `Prototype` tabs left, zoom `91% ˅` right — **the zoom control lives in the panel header, not on the canvas.**
- Row 3: the layer-type row — `Frame ˅` in bold, then code / component / overflow icons right-aligned.
- Then labeled sections (`Position`, `Layout`) whose header row carries that section's own actions right-aligned (add auto-layout, etc.).
- Value fields are **borderless filled rects** with the axis or unit glyph inside on the left in gray (`X`, `Y`, `W`, `H`, the angle glyph) and the value in black immediately after it. There is no label column.
- The grid is strict halves: two fields per row, or one field left + a 3-icon group right (rotation row), or 3+3 grouped icon segments + overflow (alignment row).
- The constrain-proportions link sits in a **narrow gutter column to the right of the grid**, outside it — so it never steals width from the value fields.
- A full-width select row (`Clip content ˅`) uses the same fill and radius as the value fields, so selects and numbers read as one family.

## The decisions that make it work

**1. The properties panel has no label column.**
Figma puts the axis glyph *inside* the field (`X 3200`, `W 256`), gray glyph, black value. Graphite does the same (`X 0 px`, `Y`, `W 1x`) in a field measured at 24px tall, radius 2px (the 80px width and 32px pitch are carried from the first pass — see the Graphite table). Neither spends a single pixel on a left label column. Why it works: a two-column label/value layout at 240–290px leaves ~140px for the value, the labels wrap, and the numbers stop lining up vertically — which kills the one thing a properties panel is for, scanning a column of numbers for the one that's wrong. **The generic alternative** is the form layout every AI-generated design tool ships: `<label>X position</label>` above or beside a bordered `<input>`, 44px rows, a full section per property. It triples panel height and halves value width. **Does not apply** when a property genuinely has no glyph — blend mode, font family, easing curve. Those get a full-width row with a word.

**2. Option controls render the effect, not the name.**
Excalidraw's Stroke width control is three 32×32 buttons drawn as a thin, medium and thick line. Stroke style is a solid, a dash and a dot. Sloppiness is three squiggles of increasing amplitude. Edges is a sharp corner glyph and a rounded one. Not one word among them. tldraw goes further: in the September 2026 build its style panel carries **zero** section labels — twelve color swatches, an opacity slider, four fill icons, four dash icons, and the row `S M L XL`, which is the only text in the panel. (The first pass said one label, "Shape"; that label is gone.) Why it works: you're choosing a visual result, so the control should be a preview of the result; it also survives localization for free. **The generic alternative** is a `<select>` with "Solid / Dashed / Dotted" — which forces a translation step in the user's head on every use, forever. **Does not apply** to properties with no visual signature (a layer name, a URL, an ID), or where the difference between options is too subtle at 32px to distinguish — in which case use icon + text, not icon alone.

**3. Selected state is a fill, never a border, and never a size change.**
Excalidraw: unselected `#f6f6f9`, selected **`#e0dfff`** — same 32×32 box, same 8px radius, same position. tldraw's selected tool is a solid `#3182ed` fill of the same 40×40 button. **Why it works:** you sweep across ten option buttons a hundred times an hour; if selection adds a 2px border or a scale transform, the whole row twitches. **The generic alternative** — `border: 2px solid var(--primary)` on the active item — shifts every neighbour by 2px unless you also add a transparent border to the inactive ones, which people forget. **Does not apply** where the control's own fill is meaningful: a color swatch can't use a fill to show selection, so tldraw rings the active swatch instead.

**4. Overlay geometry is divided by zoom; content is multiplied by it.**
tldraw exposes `--tl-zoom` and derives `--tl-scale: calc(1 / var(--tl-zoom))`. Every selection stroke, handle, snapline and cursor multiplies by `--tl-scale`, so a 1px stroke is one screen pixel at 12% and at 3200%. **The generic alternative** — drawing selection UI in document space — gives you a 40px-thick selection rectangle when zoomed in and invisible handles when zoomed out; it is the single most common bug in hand-rolled canvases. Related: **zoom must anchor at the cursor**, not at the viewport centre. Anchoring at centre is the second most common bug and it makes a canvas feel broken within ten seconds. **Does not apply** to anything that should stay legible rather than stay proportional: text inside a shape (tldraw scales the glyphs with the document but keeps the `--tl-text-outline` halo at `min(.5, 1/zoom) * 2px`, so the outline stops growing past 200%), frame labels (`--tl-frame-height` is a flat 24px screen-space token), comment pins (flat 28px), and snap-distance thresholds, which are a *pointer* tolerance and belong in screen pixels regardless of zoom. The rule is not "divide everything by zoom" — it is "divide the things the user is aiming at, multiply the things they are making."

**5. Modifier keys are taught in a persistent status bar, not a help modal.**
Graphite's bottom bar, with the Select tool active, reads: `Select Object + ⇧ Extend + ⌘ Deepest + ⌥ Deepen │ Select Area + ⇧ Extend + ⌥ Subtract │ Lasso │ Drag Selected │ G R S Grab/Rotate/Scale Selected │ ↑↓←→ Nudge Selected + ⇧⌘ 10x`. It changes with the active tool. Blender does the same. Excalidraw does a lighter version: a single hint line under the toolbar that is `To move canvas, hold Scroll wheel or Space while dragging, or use the hand tool` with nothing selected and becomes `Enter to add text, Cmd + ↑↓ to create a flowchart` when a shape is selected. Excalidraw also prints each tool's shortcut as a **subscript numeral on the tool icon itself** (1–0). **Why it works:** modifier chords are unguessable and unsearchable; a persistent, contextual strip converts them from tribal knowledge into ambient knowledge at the cost of ~24px of height. **The generic alternative** is a `?` shortcuts modal nobody opens twice. **Does not apply** on touch (there are no modifiers — Excalidraw correctly *drops* the numeral badges on mobile) or in a consumer tool where there are no chords to teach.

**6. Zero selection is not an empty state — it is the document's properties.**
tldraw's right panel with nothing selected shows the *current tool defaults* (color, fill, dash, size), and the identical panel shows the *selection's* styles when something is selected; the transition adds rows, it does not swap views. Graphite with nothing selected shows an empty Properties panel with its header intact and its width unchanged. **The generic alternative** — "Select an element to edit its properties" centered in the panel — wastes the moment where the user is about to set a default, and worse, some AI-built tools collapse or hide the panel entirely, so the canvas jumps 280px sideways every time you click empty space. **Never let selection change the panel's width.**
**Does not apply** where there are no document-level defaults to show — a pure viewer, a comment-only mode — and it does not apply to a *contextual* toolbar, which is a different control: Polotno and Canva correctly show nothing above the artboard until something is selected, because that bar's whole job is to be about the selection. The rule binds the persistent panel, not the contextual strip.

**7. Panels are wells or cards, consistently, and the choice is derived from the medium.**
tldraw: canvas `#f9fafb`, panel `#fcfcfc`, panel-contrast `#fff`, plus `inset 0 0 0 1px var(--tl-color-panel-contrast)` inside shadows 2–4. Panels are *lighter* than the canvas and lifted by shadow — cards over paper. Graphite: frame `#222`, panel `#111` — panels are *darker*, recessed wells in a metal frame. Both are internally consistent; what kills a canvas app is mixing them. Note tldraw's trick: instead of `border: 1px solid`, the hairline is an **inset shadow in the panel-contrast color**, so it renders inside the radius and never adds to layout size — and it is present on shadows 2, 3 and 4 but deliberately absent from shadow-1, which is for things that sit *on* a surface rather than float over it. **Does not apply** to a panel that is edge-welded rather than floating: Graphite's panels are docked into a frame with a 4px gutter and get no shadow at all, because a shadow on a docked panel is a lie about depth that costs a repaint on every pan.

**8. Light chrome is right when the artifact is light; dark chrome is right when the artifact is emissive.**
Figma, tldraw, Excalidraw, Canva default light because the thing being made is a light UI, a whiteboard, or a print piece, and a dark surround around a white artboard causes a simultaneous-contrast shift that makes you misjudge value and grays. Rive, Cavalry, Spline, Blender, Photopea/Photoshop default dark because the output is video, game art or 3D that will be viewed on a dark surface, and because emissive/HDR content needs a low-luminance surround to judge. **The rule is not "pro tools are dark".** It is: the chrome's luminance should match the medium the artifact will live in, and the chrome must be **chroma-free**. A "dark theme with a blue tint" is a defect in this archetype, not a style — it will bias every color decision the user makes. This is why Photoshop ships four discrete gray levels rather than a light/dark toggle. tldraw's `#f9fafb` is very slightly blue, which is fine for a whiteboard and would be wrong for a color-grading tool.

**The honest limit, and it is a real one.** Polotno breaks this rule and is not obviously wrong to: `#161616` rail and top bar around a white artboard on a `#e5e5e5` ground, for a tool whose output is print and social. The reason it survives is that the artboard is surrounded by a *mid-gray* field, not by the dark chrome — the dark is pushed to the window edges, more than 200px from any pixel the user is judging. So the rule is tighter than "match the medium": **the 200-or-so pixels immediately surrounding the artboard must match the medium.** Chrome further out is free. That also explains Figma's mid-gray canvas, which is neither light nor dark, and it is the version of this rule you should actually implement. It stops mattering entirely for tools where nobody judges color against the surround: a whiteboard, a diagram tool, a node graph.

**9. Collaborator presence: their cursor above everything, their everything-else below yours.**
Excalidraw renders a remote cursor as a small solid triangle in the user's hue with a rounded name pill in the same hue and **near-black text** — not white-on-color, so a pale pastel assignment stays legible on a white canvas. The 28px round avatar in the top-right uses the identical hue, which is how you know which pointer is whose without reading. The current user is the only one wrapped in a pill with a chevron (it's their own menu). tldraw encodes the same priority in z-index: collaborator scribble/brush/indicator at 10/20/30, yours at 40/50/100/105, and collaborator *cursor* at 130 — above every piece of your own selection UI. **The generic alternative** — a colored ring or glow around everything a collaborator has selected, at full opacity, above your own handles — makes a five-person board unusable within a minute. **Does not apply** in a review or presentation mode, where the *point* is to follow someone: there, their viewport and selection should outrank yours, because you asked to be led. It also inverts for a teacher/host role in a classroom product. The default is "my work on top"; the exception is an explicit follow mode, and it must be a mode the user entered on purpose.

**10. State changes reuse an existing control instead of adding a banner.**
When an Excalidraw live session starts, the existing `Share` button turns green and grows a small numeric badge with the participant count; a laser-pointer tool appears in the toolbar; two avatars appear next to it. No banner, no toast, no layout shift on the canvas. **The generic alternative** is a full-width green "You are now collaborating!" bar that pushes the canvas down 48px — which is both a distraction and a scroll-position bug. Same principle for autosave: the save indicator belongs in the title/menu region as a word ("Saving…" → nothing), never as a toast, and never as a spinner over the artwork. **Does not apply** when the state change is *bad news the user must act on* — a save that failed, a lost connection, an expired session. Repurposing an existing control to signal a failure hides it; those get the toast, and they get a retry action inside it. The test is whether the user has to do something. Collaboration started: no. Sync broken, your last four minutes are unsaved: yes.

**11. Destructive and irreversible actions explain the consequence in the dialog body.**
Excalidraw's live-collaboration dialog says, above the Stop button: *"Stopping the session will disconnect you from the room, but you'll be able to continue working with the scene, locally. Note that this won't affect other people, and they'll still be able to collaborate on their version."* Plus, unprompted: *"🔒 Don't worry, the session is end-to-end encrypted, and fully private. Not even our server can see what you draw."* **The generic alternative** is "Are you sure you want to stop the session?" with Cancel/OK — which tells the user nothing they didn't already know and makes them guess about the thing they were actually worried about (does my drawing survive? does theirs?). **Does not apply** to anything a single `Cmd+Z` reverses — deleting a layer, clearing a selection, resetting a value. Putting a consequence paragraph in front of an undoable action trains the user to click through paragraphs, which is exactly what you cannot afford when the genuinely irreversible dialog arrives. The gate is reversibility, not severity.

**12. Consumer canvases invert almost all of this — deliberately.**
Canva-class tools use a wide left rail of **labeled** icon cells (74.5 × 72px in Polotno), a template gallery as the first screen, and a contextual toolbar above the artboard rather than a dense right panel. The user is here for twenty minutes a month, not six hours a day; the cost of a mis-click is higher than the cost of a wide rail. **Do not port Figma's density into a consumer tool** and do not port Canva's labeled rail into a tool people live in — Polotno's ten 72px-tall labeled cells eat **720px** of vertical space that a pro user would rather spend on layers. **Does not apply** to the one place every pro tool still labels: the top-level menu bar and the panel tab strip. Graphite prints `File Edit Layer Select View Window Help`; Rive and Penpot print `LAYERS / ASSETS`, `DESIGN / PROTOTYPE / INSPECT`. Words are correct wherever the target is a *category* rather than an action — a category has no visual signature to draw.

## The properties panel, specifically

This is the pattern AI-generated design tools get wrong most often, so here is the checklist, in the order the mistakes usually happen.

**When this whole checklist does not apply.** It describes a panel that edits *numeric geometry on a persistent selection*. It is wrong for: a node/parameter inspector, where a row is a socket with a type and a connection state and the type color carries the meaning (see Graphite's data-type ramp); a timeline inspector, where the row is keyed over time and the field needs a keyframe affordance more than it needs scrub-drag; and a text-formatting bar, which is transient, follows the caret, and should not be a panel at all. Applying the 24px-row, glyph-in-field pattern to any of those produces a panel that is dense and wrong instead of sparse and wrong.

**Structure**
- Fixed width. 240–290px is the measured band for a full properties panel (Graphite 287.2px ✓); a style-only panel runs much narrower (tldraw 148px ✓, Excalidraw 200px ✓). It must not be fluid and must not change with selection. The three measured widths cluster hard: nothing in this set is between 200 and 287, and nothing is fluid.
- Row pitch 28–32px with **24px** controls (Graphite's inputs measure 24px tall at radius 2px ✓; its panel-header rows are 28px ✓; the 32px full-row pitch is carried from the first pass and was not re-verified). Not 44px. Not one control per section.
- Sections are collapsible, have a bold header row, and that header row carries the section's own actions right-aligned (add a fill, add an effect, open auto-layout). Section open/closed state persists across selections.
- The top of the panel is stable across selection types — layer name, then position/size — so muscle memory survives switching from a rectangle to a text layer. Only the lower sections swap.
- Two fields per row on a strict half/half grid, 4–8px gutter. Anything that doesn't fit the grid (a constrain-proportions link, a lock) goes in a narrow gutter column *outside* the grid, not squeezed into it.

**The fields themselves**
- Unit and axis live inside the field, gray, on the left; the value is black and immediately follows. No separate unit dropdown per field.
- The glyph is **scrub-draggable**: press on the `X` and drag to change the value. Figma, Graphite, Rive and Framer all do this; it was not re-verified by driving a pointer in this pass, so treat it as a design requirement rather than a measurement. It is the highest-value 20 lines of code in the panel.
- Fields accept arithmetic: `1440/2`, `+8`, `256*1.5`. Figma's own docs demonstrate "layer properties adjusted using equations in the sidebar". If you don't do this, users will do the math in Spotlight and paste.
- Enter commits, Escape reverts to the pre-edit value, Tab moves to the next field in reading order, ↑/↓ nudge by 1, Shift+↑/↓ by 10. There is no Save button and no dirty state.
- Fixed field widths and tabular figures, so a value going from `9` to `1000` does not reflow the row or move its neighbour.
- Dragging a slider updates the canvas every frame and produces **one** undo entry for the whole drag, not one per frame.

**Multi-selection — the part that is always missing**
- With a mixed selection, every field whose value differs shows `Mixed` (Figma) or an em-dash — never the first item's value, and never blank.
- Typing into a Mixed field applies to **all** selected items.
- Fields that agree across the selection show the shared value normally.
- Sections that only apply to some of the selection either disappear or gray out consistently; pick one and never mix.
- Multi-fill / multi-stroke is a **list** with per-row visibility, per-row delete, drag-to-reorder, and `+` in the section header — not a single color input that silently discards the other three fills.

**What a naive panel does instead** (all of these are live in AI-generated design tools right now): a `<label>` above every `<input>`; a 1px border on every field; 44–48px rows; a "Apply changes" button; a success toast after each edit; "No element selected" replacing the panel; sliders with no numeric readout of any kind (note the honest limit: Excalidraw's opacity slider has no *live* readout either — it prints `0` and `100` as static end labels, which is enough because opacity is judged by looking at the shape, not by reading the number. The rule binds sliders whose value the user must match to a spec: corner radius, stroke width, font size); a native `<select>` for blend mode inheriting the OS look while everything else is custom; `Mixed` not implemented, so selecting two rectangles and typing a width silently applies only to one; and hover states that add a border and shift the row.

## States, edges and the unglamorous parts

**First run.** Excalidraw draws four hand-lettered annotations with curved arrows pointing at its *actual* chrome — "Export, preferences, languages…" at the hamburger, "Pick a tool & Start drawing!" at the toolbar, "Shortcuts & help" at the bottom-right — rendered in the app's own hand-drawn font. It is an onboarding overlay that is also a demonstration of what the product makes. Graphite and Photopea use a start screen of four to six actions with their shortcuts printed alongside (`New Document ⌘N`, `Open Document ⌘O`, `Open Demo Artwork`) — teaching the keyboard on the first screen. Photopea additionally lists `.PSD .AI .XD .FIG .sketch .PDF RAW ANY` as icons along the bottom, turning a zero-data screen into a capability claim. **The generic alternative** is a modal carousel with three illustrations and a Next button.

**The part that is usually missed: the annotated overlay cannot survive the breakpoint.** At 390px Excalidraw does not shrink its arrows — it throws the whole thing away and substitutes a centred column: wordmark, the storage disclosure set in the hand-drawn font, then four bare rows — `Open` · `Help` · `Live collaboration…` · `Sign up`. That is the right call, because the annotations point at chrome that has moved to the other end of the screen, and a pointer at the wrong target is worse than no pointer. If your onboarding is spatial, you owe it a second, non-spatial version, not a media query.

Graphite ships a second honest-state pattern in the chrome itself: a persistent italic strip at the bottom of the start screen reading *"May 2026 release — What's new? (video) — Note: Some nodes are renamed; Some older documents may render differently and require manual fixes. Need the old version?"* — a breaking-change warning, a link to the old build, and a version stamp, before the user opens anything.

**Zero selection.** Show tool defaults or document properties. Never collapse the panel. Never center "Nothing selected" in it.

**Zero data / empty canvas.** The empty canvas is the correct empty state — do not put an illustration on it. Excalidraw's start content sits *on* the canvas and vanishes the moment you draw, with no dismissal needed. Note what tldraw does with the same problem: nothing at all on the canvas, but the style panel is already open at top-right showing the *current tool's* defaults, so the first screen teaches the panel rather than the canvas.

**Too much data.** Graphite's Layers panel with a real document shows eight consecutive rows named "Untitled Layer", each with a live thumbnail. The thumbnail is the identity when the name isn't — which is why every layer row in every serious tool has one, and why a text-only layer list is unusable past twenty items. Virtualize the list; do not paginate it.

**Offline / local-first.** Excalidraw states it plainly on the first screen: *"Your drawings are saved in your browser's storage. Browser storage can be cleared unexpectedly. Save your work to a file regularly to avoid losing it."* That is an unusually honest reliability disclosure and it belongs in this archetype: if you cannot guarantee durability, say so where the user will read it, before they've spent two hours.

**Permission denied / view-only.** (*Prescriptive — synthesized from the reference set, not measured in a live view-only session.*) Degrade to an inspector, not to nothing: the properties panel stays, at the same width, with read-only values; the tool palette shrinks to hand + comment; the file name gets a "View only" chip. Hiding the panel makes a view-only file feel broken rather than restricted.

**Loading a heavy document.** Show the chrome immediately with an empty canvas and progressively fill it. Graphite renders its full frame — title bar, tab, panels, status bar — before the artwork resolves. Never gate the whole window behind a spinner; the panels are the app's identity and their arrival is the perceived load.

**Version history.** (*Prescriptive — no live version-history panel was probed in either pass. Treat as a design brief, not as a measurement.*) The pattern that works: a right-panel list grouped by day, auto-saves collapsed into "N changes" and named checkpoints always expanded and visually distinct; selecting a version puts the canvas in read-only preview with a banner naming the version and offering Restore; **restoring creates a new version rather than truncating the timeline**, so the act of restoring is itself undoable. The failure mode is a history that destroys the future when you go back.

## Mobile

Measured at 390×844 (iPhone 14 Pro emulation):

**tldraw** (re-shot at 390×844, 2026-09). The toolbar goes to the bottom, but it is **not** full-width — it is a rounded island inset ~14px from the left edge and stopping ~130px short of the right, because the watermark is a *separate rounded card* welded beside it (the `--tl-layer-watermark: 248` token has a physical home). Nine tools drop to **seven plus the `^` expander**: select, hand, draw, eraser, arrow, text, note; the shape tool and image tool go into the overflow. The style panel is gone entirely — it becomes an on-demand sheet. The zoom readout, which at 1440 sits in a pill anchored to the bottom-**left** corner (not in a panel header — this is where tldraw and Figma diverge), is dropped. The selection action row (undo / redo / delete / duplicate / ⋮) floats immediately above the toolbar, left-aligned, on a translucent ground; at 1440 that same row is present too, centred above the toolbar — so this is not a mobile-only affordance, it is the same component in both layouts. Top bar keeps only the logo, a `⋮`, and `Sign in to share`.

**Excalidraw** (re-shot at 390×844, 2026-09) moves its top toolbar to the bottom and cuts it from **twelve tools plus overflow to seven plus overflow** — hand, select, draw, eraser, rectangle, arrow, text, then `⋮`. (First pass said eight; the count is seven.) It **removes the subscript shortcut numerals** — stripped, not disabled, because there is no keyboard to teach. Undo/redo become a floating pair above the toolbar, **right**-aligned rather than centred. The zoom control is dropped. The hamburger stays top-left and the library toggle top-right; both grow to a 44px hit target. The 200px properties island becomes a bottom sheet that appears on selection.

The three rules that generalize: (1) tools move to the thumb zone and lose their least-used members to an overflow — both products land on **seven visible tools**, which is worth treating as the number rather than a coincidence; (2) keyboard affordances are stripped, not just disabled; (3) the properties panel becomes a sheet whose height is a fraction of the viewport, so the canvas is still visible while you edit — a full-screen properties modal on mobile means you can't see what you're changing.

Two additions from looking at both at 390 rather than reasoning about them:

- **The bottom-right corner is contested and both products lost it.** tldraw puts a watermark card there; Excalidraw puts a shield and a `?`. In both, the corner nearest the right thumb — the single most valuable 44px on the screen — is spent on something the user will never tap twice. If you are building this, that corner is where your most-used contextual action goes.
- **What "drops the zoom readout" costs.** Neither product replaces it with anything. On desktop the readout is also the zoom *menu* (fit, 100%, zoom to selection); at 390 those commands have no home at all, and pinch is the only zoom control. That is a real hole, not a considered omission — putting zoom-to-fit in the `⋮` overflow costs one row and is the cheapest mobile win in this archetype.

What should **admit it shouldn't** adapt: precision vector editing, node graphs, timeline scrubbing at frame resolution, and multi-panel 3D. Rive, Cavalry, Blender and Graphite are correct to be desktop-only. Shipping a cramped node editor on a phone is worse than shipping a viewer plus "open on desktop to edit". A read-only mobile viewer with comments is a complete and respectable product.

## How this archetype fails

This section is written for self-diagnosis. Each item names the artifact an LLM actually emits, not the abstract mistake — because the AI-generated version of a canvas tool is not a bad canvas tool, it is **a dashboard wearing a canvas tool's screenshot**. It is generated from the outside in: the layout of a Figma screenshot, filled with the component vocabulary of a CRUD admin. Every item below is a place where that seam shows.

**The four-second tell, stated precisely.** Press and hold on empty canvas and drag. If a marquee appears, it is a canvas. If the page text-selects, or nothing happens, or the whole page scrolls, you are looking at a `<div>` with a grid background. This one gesture separates the two categories faster than any amount of visual inspection, and it is the first thing to run against your own build.

1. **The canvas doesn't behave.** Space+drag doesn't pan. Scroll zooms instead of panning (or worse, `Ctrl+scroll` is unhandled and the *browser* zooms, which is the unmistakable signature of a canvas built without `preventDefault` on `wheel`). Zoom anchors at the viewport centre instead of the cursor. No marquee select on empty-canvas drag. Alt+drag doesn't duplicate, Shift+drag doesn't constrain to an axis, Alt+resize doesn't resize from centre, Shift+resize doesn't preserve aspect. Arrow keys don't nudge, Shift+arrow doesn't nudge by 10. **Self-check:** these are not features, they are the physics; if the count of implemented gestures in this list is under ten, stop building panels and go finish the canvas.

2. **The selection UI is drawn in document space.** Handles balloon at high zoom and vanish at low zoom; the 1px selection stroke becomes 6px at 600%. **The generated signature:** selection rendered as an absolutely-positioned `<div>` with `border: 2px solid #3b82f6` inside the transformed container, so it inherits the transform. **Self-check:** zoom to 3200% and 8%. If the handle changed apparent size at either end, you have this bug. The fix is one CSS variable (`--scale: calc(1 / var(--zoom))`), applied to every overlay, plus a decision per overlay about whether it is aimed-at (screen space) or made-of (document space).

3. **The properties panel is a web form.** The generated signature is nearly verbatim every time: a `<label>` above a bordered `<input>` in a `space-y-4` stack, 44–48px rows, `rounded-lg` on the field, a section per property, and — the giveaway — a **submit affordance**: an "Apply" button, or a `<form onSubmit>`, or a toast confirming the change. There is no scrub-drag on the glyph, no arithmetic in the field, no `Mixed` state, no tabular figures, so a width going from `9` to `1000` reflows the row. **Self-check:** select two objects of different widths. If the field shows one of the two values rather than `Mixed`, and typing into it changes only one object, the panel is decorative.

4. **Chrome does not shrink.** A fixed 64px app header with a logo and a nav, a breadcrumb bar, a footer, and a 320px right panel that can't collapse — leaving the artwork about 55% of the window. **The generated signature:** the header is a marketing-site header (logo left, nav centre, avatar + CTA right) that was never reconsidered for a tool. Real canvas tools give the artwork 78–85% at 1440px — Graphite measures **1148.8 of 1440 = 79.8%** horizontally, above a **24px** status bar and below a 28px title bar and a 28px tab bar, i.e. 80px of vertical chrome total for an app with a menu bar, a document tab, and a live modifier strip. **Self-check:** measure your own viewport rect as a percentage of the window and say the number out loud. Then find the single keystroke that takes it to 100%. If there isn't one, add it before anything else.

5. **Everything animates.** A 300ms ease on panel collapse, a hover scale on tool buttons, a fade on selection, a `transition-all duration-200` that came free with the component. **The measured counter-fact:** `transition-duration` on tldraw's style-panel sections and swatch buttons reads **`0s`**. Not fast — zero. The one place tldraw spends motion is the comment pin, at **80ms** with a 1.08 hover scale. So the archetype's real motion budget is: 0ms for anything you click a hundred times an hour, ~80ms for a spatial affordance, and a longer duration only for genuine spatial continuity (a panel entering from an edge, a zoom-to-fit). **Self-check:** grep your own stylesheet for `transition`. Every hit inside a properties panel or a tool button is a defect.

6. **No keyboard layer.** No single-key tool shortcuts (`V` `R` `O` `T` `L`), no `Cmd+\` to hide UI, no `Shift+1/2/0` for zoom-fit/zoom-selection/100%, no `Cmd+D` duplicate, no `[` `]` for z-order. **The generated signature:** shortcuts exist in the tooltip text but no `keydown` handler was ever written, so the tooltip is documentation for a feature that isn't there — which is worse than omitting it. **Self-check:** open your own tooltips, list every shortcut they claim, and press all of them.

7. **Multiplayer as decoration.** Cursors with no name, or names that fade before you can read them; collaborator selection halos drawn above your own handles; an avatar stack whose colors don't match the cursor colors, so you cannot tell whose pointer is whose; a "3 people editing" banner that pushes the canvas down. **The tell:** no `z-index` policy at all, so whichever DOM node happened to mount last wins, and the ordering changes between sessions. **Self-check:** can you produce your app's layer registry as a list of named constants? If the answer involves grepping for `z-index` across components, you don't have one.

8. **The tokens are a Tailwind default.** `rounded-lg` everywhere (8px), a strict 8px spacing scale, `bg-gray-50` panels with `border-gray-200`, `text-gray-500` labels, Inter at 14px/1.5, `shadow-md`. Compare what the real ones actually use: tldraw's radii are 2/4/6/**9/11** and its spaces include **20** and **28**; Notion's radii include **5px** and its sizes include **15px**; Graphite's inputs are radius **2px** and its body leading is **1.0**. **Self-check:** if every radius in your file is 4, 8, 12 or 16 and every space is a multiple of 4, no one tuned anything by eye. Small radii read as precision instruments; 9px and 11px are what you get when a 40px button and a 148px panel are reconciled by looking.

9. **Dark mode as a personality.** Near-black chrome with a blue or purple cast, glassmorphic panels with `backdrop-blur`, a glow on the selection, a gradient on the primary button — over an artboard the user is trying to color-match. **The generated signature:** `bg-slate-900` and `bg-zinc-900`, both of which carry chroma; and a *single* dark theme, because generating two neutral ramps is more work than generating one moody one. The chrome is a measuring instrument; it must be neutral and it must be boring. Note what the real ones ship: Graphite's ramp is literally `#111` through `#eee`, sixteen steps of pure gray with exactly one saturated color in the whole app (`#00a8ff`, used only for selection overlay).

10. **No status of any kind.** No zoom readout, no cursor coordinates, no selection dimensions, no save state, no modifier hints. The user has no idea where they are in the document, and — the compounding failure — because there is no status region, every piece of transient information that *should* live there becomes a toast instead.

11. **The panel is right but the document model is missing.** The newest failure mode, and the hardest to see in a screenshot: the panel scrubs, the fields do math, `Mixed` works — and then `Cmd+Z` after a slider drag undoes one frame of the drag instead of the whole gesture, or undo doesn't cover selection changes, or a redo after an edit silently drops the branch. **Self-check:** drag a slider across its full range and press `Cmd+Z` once. If the value moves a little instead of all the way back, your undo stack is recording renders rather than intents, and no amount of panel polish will make the tool feel real.

12. **It cannot open or save its own file.** No import, no export, no paste-from-clipboard of an image, no drag-a-file-onto-the-canvas. Photopea's start screen prints `.PSD .AI .XD .FIG .sketch .PDF RAW ANY` because format support *is* the product claim. A canvas tool that can only round-trip through its own database is a demo, and the absence of a file menu is the fastest way to tell one from a product.

## Copy and tone

The voice is a tool's voice: short nouns, no encouragement, no personality in the chrome. The personality goes in the template names and the empty state, never in the panel.

**Right**
- Section headers are bare nouns: `Position`, `Layout`, `Fill`, `Stroke`, `Effects`, `Appearance`, `Export`, `Layers`.
- Tooltips are `Rectangle — R`. Name, em dash, shortcut. Nothing else.
- Name the property after the *result* the user perceives, not the implementation. Excalidraw ships `Sloppiness` and `Edges`, not `Roughness seed` and `Corner radius mode`. tldraw ships `S M L XL`, not `12 / 16 / 24 / 32 px`.
- Consequence-first destructive copy: *"Stopping the session will disconnect you from the room, but you'll be able to continue working with the scene, locally. Note that this won't affect other people."*
- Contextual hints written as a keyboard sentence, with the **keys drawn as outlined key caps in a mono face** and the connecting words in the body face: <code>[Enter]</code> to add text, <code>[Cmd + ↑↓]</code> to create a flowchart. Excalidraw sets this line centred under the toolbar in gray, where it reads as a caption rather than an instruction — which is why it can stay on screen permanently without nagging.
- Version and breaking-change honesty in the chrome, not in a changelog: *"May 2026 release — What's new? (video) — Note: Some nodes are renamed; Some older documents may render differently and require manual fixes. Need the old version?"* (Graphite, on the start screen, with a link back to the old build.)
- Honest limits: *"Browser storage can be cleared unexpectedly. Save your work to a file regularly."*
- Empty selection in a mixed field: `Mixed`.

**Wrong**
- `Element Properties` / `Selected Object Settings` / `Design Options` as a panel title. The panel is called `Design` or `Properties` or nothing.
- `Adjust the horizontal position of your selected element` as a label. It's `X`.
- `✨ Nice work! Your changes have been saved.` Canvas tools do not congratulate.
- `Are you sure?` with no statement of what happens.
- `No element selected. Click an element on the canvas to see its properties.` Show the document's properties instead.
- `Oops! Something went wrong.` Name the operation that failed and whether the document is safe: `Couldn't export — the file is still saved.`
- `Advanced` as a section name. It means "we didn't decide where this goes".

## Sources

Live editors probed with Playwright (computed styles, CSS custom properties, element geometry) at 1440×900 / DPR 2:

- **https://editor.graphite.rs/** — full editor, opened the "Isometric Fountain" demo document and selected a layer. Read the whole `:root` token set (80 properties: 16-step gray ramp, ten data-type color pairs with dim twins, checkered-transparency, "no color" and inheritance-texture SVG tokens), and measured the Properties panel (287.2px wide, 32px row pitch, 24×80px number inputs at radius 2px), the tab bar, and the contextual status bar listing live modifier chords per tool. **Direction pass:** re-read all 80 tokens and re-measured panel widths (287.2px Properties and Layers), viewport (1148.8px = 79.8%), title/tab bars (28px each), **status bar (24px — the first pass and the failure section both said 28px)**, body leading (14px/14px), and one live text field (24px tall, radius 2px, `#111`). The demo document would not load inside the probe budget on the second pass, so the 32px full-row pitch and 80px number-input width are marked as carried, not re-verified.
- **https://www.tldraw.com/** — empty canvas, then a rectangle drawn and selected. Read `--tl-space-*`, `--tl-radius-*`, the full light and dark theme ramps, the four-step shadow scale with its inset hairline, the complete z-index layer registry, the inline-SVG cursor set with drop shadows, `--tl-scale`, and `--tl-text-outline`. Measured the 148px style panel and the 40px-button-on-36px-pitch swatch grid. **Direction pass:** re-probed both themes separately (the `:root` computed values are the *dark* ramp; the light ramp lives on `.tl-theme__light`, which is why the first pass mixed the two), corrected the style panel's shadow from shadow-4 to **shadow-2**, added the chrome-plane and text-editing z-index ranges the first pass omitted, added the frame-label and comment-pin token sets, confirmed the 36px swatch pitch by measuring four columns (1284 / 1320 / 1356 / 1392), and read `transition-duration: 0s` off the style-panel sections and buttons.
- **https://excalidraw.com/** — empty canvas, rectangle selected, then a real two-participant live-collaboration session driven from two browser contexts. Read the primary/gray/danger/warning ramps and Island styles; measured the 200px properties island, `<fieldset>/<legend>` groups at 71px pitch, 32px option buttons at 40px pitch, and — during the live session — 28px round collaborator avatars at 39px pitch with pastel fills `#a8c5ff` / `#d4a8ff`, the current-user pill (49×30, radius 20px), the green Share button with a participant badge, the collaboration-only laser tool, and remote cursors as colored triangles with dark-text name pills. Also captured the desktop shortcut-numeral badges and confirmed they are dropped at 390px. **Direction pass:** re-drew a rectangle and re-measured everything — the 200px island (642px tall with nine groups), the 542×44 toolbar, 36×36 tools on a 40px pitch, 32×32 option buttons on a 40px pitch, and the six `<fieldset>` groups at a 71px pitch (y 218 / 289 / 360 / 431). Corrected the selected-option fill from `#e3e2fe` to **`#e0dfff`** and resolved the truncated island shadow. Re-shot at 390 and recounted the mobile toolbar: **seven tools plus overflow, not eight.**
- **https://studio.polotno.com/** — Canva-class editor; measured the left rail's 74.5 × 72px labeled tab cells. **Direction pass:** re-measured at 74.48 × 72 with `15px 5px 0` padding and a 12px/18px IBM Plex Sans label on a `#161616` rail, counted **ten** cells occupying 720px (the first pass wrote "eleven tools, 792px"), and shot the editor to confirm the side panel is closed on load and the chrome is dark over a light artboard.
- **https://www.notion.so/help** — read 544 `tatami` design tokens: spacing, radius (including the 5px step), font-size scale, line-heights aliased to the spacing scale, per-weight letter-spacing, and the `"lnum" 1` numeral setting. **Direction pass:** re-counted the `:root` set at exactly **544**, and re-read every scale — spacing, radius, font-size and line-height all matched the first pass digit for digit; extracted the full sans/serif/mono tracking ramps and the size-800 and size-1000 rows, which show the regular/bold gap widening with size.
- **https://help.obsidian.md/** — Obsidian Publish; body 15px, article body 16px/24px, h1 41.6px/49.92px at −0.624px tracking.

Screenshots viewed (26 in the first pass, 6 more in the direction pass, all read as images, not inferred):

- tldraw: empty canvas, rectangle selected with the style panel expanded, 390px mobile.
- Excalidraw: first-run annotated canvas, rectangle selected with the full properties island, the Live collaboration dialog, two live-cursor captures, 390px mobile.
- Graphite: start screen with empty Properties/Layers panels, demo-artwork picker, full editor with a document open, selection with the Properties panel populated and the modifier status bar visible.
- **https://www.photopea.com/** — marketing page and the real editor start screen (menu bar, source rail, New/Open/Templates, drop zone, supported-format icons).
- **https://help.figma.com/hc/article_attachments/29799649003671** and `…/29799649018519` — Figma's own annotated UI3 Design-panel screenshots (Design/Prototype tabs, zoom in the panel header, layer-type row, Position/Layout sections, glyph-inside-field inputs, the constrain-proportions gutter column, the `256 × 256` canvas dimension badge).
- **https://www.figma.com/design/** — real UI3 chrome in the hero: floating file pill top-left, and the avatar / zoom `88%` / present / Share pill top-right over a mid-gray canvas.
- **https://rive.app/** — real editor: dark chrome, tabbed Hierarchy/Assets/Data/Agent left panel, animations list plus state-machine graph below, an inline dismissible tip in the toolbar, and collapsed panels rendered as vertical text tabs on the window edges.
- **https://penpot.app/** — real editor in the hero: LAYERS/ASSETS tabs left, DESIGN/PROTOTYPE/INSPECT tabs right over one panel body, alignment row first, boolean-ops row second.
- **https://www.framer.com/** — the design agent as a docked right column rather than a floating overlay; CMS as a full-window table view.
- **https://cavalry.scenegroup.co/**, **https://obsidian.md/**, **https://www.craft.do/**, **https://www.notion.com/product** — product imagery for the motion / notes / document ends of the archetype.
- **https://www.canva.com/features/** and **https://docs.blender.org/manual/en/latest/interface/window_system/introduction.html** — both returned Cloudflare interstitials on 2026-09-09; Canva is described from the Polotno measurements plus its published product imagery, and Blender is referenced only for structural behaviour (regions, no modal dialogs, status-bar modifier hints), with no invented numbers.

**Direction-pass screenshots** (`tools/shot.mjs`, 1440×900 and 390×844, DPR 2, read as images):
`creative-and-canvas-tools-dir-1` tldraw at 1440 and 390 · `-dir-2` Excalidraw at 390 · `-dir-4` Polotno Studio at 1440 · `-dir-5` Excalidraw at 1440 with a rectangle drawn and selected · `-dir-6` Graphite at 1440 with the Demo Artwork picker open. Everything in the Mobile section and the added observations in Measured specifics comes from these images plus the probes above, not from the first pass's notes.

## Direction pass (2026-09)

A second reviewer re-probed six live products, re-shot five of them at 1440 and 390, and read every image. What changed:

**Numbers corrected (6).** tldraw's style panel uses **shadow-2**, not shadow-4. Excalidraw's selected-option fill is **`#e0dfff`**, not `#e3e2fe`. Graphite's status bar is **24px**, not the 28px asserted in failure item 4. Polotno's rail is **ten cells / 720px**, not "eleven tools / 792px". Excalidraw's mobile toolbar is **seven tools plus overflow**, not eight. tldraw's style panel now carries **zero** text labels, not the one ("Shape") the first pass recorded. Graphite's leading was restated precisely (14px/14px body, 14px/18px in a field, 14px/28px in a panel header) rather than the single 18px figure. Two Graphite values — the 32px row pitch and the 80px input width — could not be re-verified because the demo document would not load inside the probe budget; they are now labeled as carried rather than measured, which is the honest state.

**Numbers confirmed.** Every tldraw space and radius; the 40×40-on-36px swatch pitch, measured column by column; both tldraw theme ramps, now correctly separated (`:root` is the dark ramp — the first pass had silently mixed the two). Excalidraw's 200px island, 542×44 toolbar, 40px pitches and 71px group pitch. All four Notion scales, digit for digit, and the per-weight tracking table. Graphite's 80 tokens, its 287.2px panels, and its 79.8% viewport.

**Cut.** Five reference-table cells that described a mood rather than a mechanism ("the most disciplined token system in the space", "best-in-class property controls", "the honest version of 'pro tool on the web'", "without feeling like an IDE", "forgiving, labeled, template-first") — each replaced with what the product measurably does. The "recognizable in about four seconds" opener to the failure section, replaced with a gesture anyone can run. The unqualified claim that AI-built sliders lack a numeric readout, which is false of Excalidraw's own opacity slider.

**Boundaries added (8).** Findings 4, 6, 7, 8, 9, 10, 11 and 12 had no stated limits and now have real ones — including the one that cost the most to write honestly: **finding 8 is broken by Polotno**, which runs dark chrome around a light artboard and gets away with it. The rule was rewritten to the version that survives the counterexample (the ~200px immediately around the artboard must match the medium; chrome further out is free), which also explains Figma's mid-gray canvas. The properties-panel checklist gained a boundary of its own naming the three inspectors it is wrong for.

**Added.** A rewritten Mobile section from direct observation of both products at 390, including two things neither the first pass nor the products themselves handled well — the contested bottom-right corner, and the fact that dropping the zoom readout also drops zoom-to-fit with no replacement. The observation that Excalidraw's spatial onboarding is *replaced*, not reflowed, at 390. tldraw's chrome-plane and text-editing z-index ranges, its frame-label and comment-pin tokens, and the measured `transition-duration: 0s`. Excalidraw's five-swatch-plus-rule-plus-current-value color row and its keycap-rendered hint line. Graphite's inheritance textures and its breaking-change strip. Notion's three separate tracking ramps and the rule behind them. Two new failure modes — **11, a correct-looking panel over a broken undo model**, and **12, a canvas that cannot open or save a file** — plus a per-item "generated signature" and "self-check" for all twelve, so an agent can run the section against its own build instead of reading it.
