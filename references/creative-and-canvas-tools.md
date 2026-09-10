# Creative and canvas tools

**Evaluated:** 2026-09

## What this archetype is for

Tools where the user's artifact is the interface's only reason to exist: vector and UI editors (Figma, Penpot, Graphite), whiteboards (tldraw, Excalidraw, FigJam), motion and 3D (Rive, Cavalry, Spline, Blender), raster editors (Photoshop/Lightroom web, Photopea), template-first consumer design (Canva, Polotno), and — at the far edge — document canvases where the "canvas" is a page (Notion, Craft, Obsidian). The shared situation: a person is in this app for two to eight hours, looking at *their thing*, and every pixel of chrome is a tax on that. What does **not** belong here: dashboards, CRUD admin, anything where the app's own data is the subject. If the user came to read what your product knows, you are building an information archetype, not a canvas one — the rules below (chrome that shrinks, panels that never move, keyboard-first everything) will make that product worse.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Figma** (UI3) | The reference properties panel; the light-default decision | Unit/axis glyph *inside* the field on the left, value in black, glyph in gray — no label column at all |
| **tldraw** | The most disciplined token system in the space, open to inspection | Ship your own SVG cursors with a drop shadow, and divide overlay geometry by zoom (`--tl-scale: calc(1 / var(--tl-zoom))`) |
| **Excalidraw** | Best-in-class property controls and multiplayer for zero cost | Every option button renders the *effect* (line thickness, dash, squiggle), never a word |
| **Graphite** (not on the list) | Open-source, node-based, and the whole design system is readable in the browser | A persistent status bar that lists the live modifier chords for the current tool, updating per tool |
| **Penpot** (not on the list) | Open-source Figma-class editor; proves the panel pattern is convergent, not proprietary | DESIGN / PROTOTYPE / INSPECT as three tabs over one panel body, so the panel width never changes with mode |
| **Rive** | Editor + state machine + runtime in one window without feeling like an IDE | Collapsed panels become vertical text tabs welded to the window edge — zero-width when closed |
| **Framer** | Canvas that is also a real website; the agent panel done as a dockable column | Treat the AI agent as another panel, not a floating orb over the artwork |
| **Photopea** | A complete Photoshop clone in a tab; the honest version of "pro tool on the web" | Its start screen doubles as a capability advertisement — the list of importable formats *is* the empty state |
| **Canva / Polotno** | The consumer end: forgiving, labeled, template-first | A wide left rail with **labeled** icons (~74×72px cells) — the opposite of a pro tool, and correct for its audience |
| **Cavalry** | Motion design without After Effects' 1998 chrome | Dark chrome justified by the medium (video), not by fashion |
| **Blender** (contrast) | Everything-is-a-region, no modal dialogs, status bar teaches the keyboard | Any region can become any editor; there is no "main" panel to protect |
| **Notion / Craft / Obsidian** | The document end of the canvas: chrome that hides until the pointer arrives | Notion's tracking varies *by weight at the same size*; line-heights are drawn from the layout spacing scale |

## Measured specifics

All values below were read from live `getComputedStyle` / CSS custom properties, or measured from `getBoundingClientRect`, in a 1440×900 viewport at DPR 2, September 2026. Anything I could not measure is marked *observed*.

### Graphite (editor.graphite.rs, dark) — the fullest readable token set in the space

| Thing | Value |
|---|---|
| Neutral ramp | 16 steps named by hex digit: `--color-0-black` `#000` → `--color-f-white` `#fff`, one per digit (`#111 #222 #333 #444 #555 #666 #777 #888 #999 #aaa #bbb #ccc #ddd #eee`) |
| App background / panel background | `#222` (`color-2-mildblack`) / `#111` (`color-1-nearblack`) — **panels are darker than the frame**, i.e. wells |
| Body text | `#eee`, 14px, `Source Sans Pro, Arial` |
| Label line-height | 18px on 14px text (1.29) |
| Panel radius | 6px; document tab radius `6px 6px 0 0`, active tab bg `#333` |
| Title bar / tab bar height | 28px each |
| Properties panel width | 287.2px total, 279.2px content (4px inset per side) |
| Property row pitch | **32px** (24px control + 8px gap) |
| Number input | 24px tall × 80px wide, radius **2px** |
| Paired X/Y input pitch | 84px (80px field + 4px gutter) |
| Slider-style number input | 125.4px wide × 24px |
| Icon buttons | 16px and 24px square variants, radius 2px |
| Data-type colors (bright / dim pairs) | general `#cfcfcf`/`#8a8a8a` · number `#c9a699`/`#886b60` · artboard `#fbf9eb`/`#b9b9a9` · graphic `#68c587`/`#37754c` · raster `#e4bb72`/`#9a7b43` · vector `#65bbe5`/`#417892` · color `#ce6ea7`/`#924071` · gradient `#af81eb`/`#6c489b` · typography `#eea7a7`/`#955252` · invalid `#d6536e`/`#a7324a` |
| Selection / overlay accent | `--color-overlay-blue` `#00a8ff` |
| Error / warning | `#d6536e` / `#d5aa43` |
| Transparency checker | 16×16px, `#ccc` on `#fff`, offset `0 0, 8px 8px, 8px 8px`; a "mini" 8×8 variant for small swatches |
| "No color" swatch | a red diagonal line drawn as an inline SVG data URI sized `60px 24px` / `80px 32px` — one token per control size |

The data-type palette is the finding worth copying: every socket, connector dot and property row in Graphite is tinted by the *type* of value it carries, and every color ships with a pre-computed dim twin used for disabled/unconnected. Salmon `#c9a699` on the Translation/Rotation/Scale/Skew rows is not decoration — it means "this is a number".

### tldraw (tldraw.com)

| Thing | Value |
|---|---|
| Space scale | `--tl-space-1..10` = **2, 4, 8, 12, 16, 20, 28, 32, 64, 72** — note 20 and 28; this is not an 8px grid |
| Radius scale | `--tl-radius-0..4` = **2, 4, 6, 9, 11** — note 9 and 11, not 8 and 12 |
| Light: canvas / panel / panel-contrast | `#f9fafb` / `#fcfcfc` / `#fff` — **the panel is lighter than the canvas** |
| Light: divider / low / hint / muted-1 | `#e8e8e8` / `#edf0f2` / `#0000000e` / `#0000001a` |
| Light: text ramp | `#000`, `#1c1c1c`, `#2e2e2e`, `#6e7477`, disabled `#888d91` |
| Light: primary/selected/focus | `#3182ed` / `#3182ed` / `#2d67d2` |
| Selection fill / stroke | `#1f8fff3d` (24% α) / `#3182ed`; dark mode fill drops to `#2495ff33` (20% α), stroke unchanged |
| Dark: canvas / panel / panel-contrast / divider | `#101011` / `#202025` / `#353442` / `#33333d` |
| Semantic | success `#2f7f33` · info `#0287cf` · warning `#ed6c02` · danger `#d00b0b` · tooltip `#090b0c` |
| Shadow 1 | `0 1px 2px #00000040, 0 1px 3px #00000017` |
| Shadow 4 (panels) | `0 0 3px #00000030, 0 5px 4px #00000029, 0 2px 16px #0000000f, inset 0 0 0 1px var(--tl-color-panel-contrast)` |
| Style panel | 148px wide, radius 9px, 2px horizontal padding, shadow-4 |
| Tool / swatch buttons | 40×40px hit area on a **36px** pitch — hit areas deliberately overlap by 4px so there is no dead gap |
| UI type | Inter, 12px / 19.2px (1.6), weight 500 |
| Zoom-invariance | `--tl-scale: calc(1 / var(--tl-zoom))` — every overlay divides by it, so a 1px selection stroke is 1px at 3200% |
| Canvas text legibility | `--tl-text-outline`: six shadows at ±`min(.5, 1/zoom) * 2px` in the *background* color, so shape text survives any fill under it |
| Shape fonts | four: `tldraw_draw`, `tldraw_sans`, `tldraw_serif`, `tldraw_mono` |

**tldraw's z-index registry** is worth transcribing verbatim, because "what draws on top of what" is the single hardest thing to retrofit into a canvas app:

```
canvas-hidden -999999 · canvas-background 100 · canvas-grid 150
collaborators 245 · watermark 248 · canvas-in-front 250
canvas-shapes 300 · canvas-overlays 500 · canvas-blocker 10000

/* inside the overlay layer */
collaborator-scribble 10 · collaborator-brush 20 · collaborator-shape-indicator 30
user-scribble 40 · user-brush 50 · user-snapline 90
selection-fg 100 · user-handles 105 · indicator-hint 110
collaborator-cursor-hint 120 · collaborator-cursor 130
```

Note the ordering decision: **every collaborator overlay sits below every one of yours, except their cursor, which sits above everything.** Their marquee never covers your handles; their pointer is never hidden by your selection.

tldraw also ships **its own cursors** — 32×32 inline-SVG data URIs for default, pointer, cross, comment, move, grab, grabbing, text, zoom-in, zoom-out — each wrapped in `<feDropShadow dx="1" dy="1" stdDeviation="1.2" flood-opacity=".5"/>` with an explicit hotspot (`cross` at `16 16`, `text` at `4 10`, `comment` at `5 19`). A system cursor disappears against a white artboard; a shadowed one never does.

### Excalidraw (excalidraw.com)

| Thing | Value |
|---|---|
| Primary ramp | `#6965db` family: darker `#5b57d1`, darkest `#4a47b1`, hover `#5753d0`, light `#e3e2fe`, light-darker `#d7d5ff` |
| Gray ramp (11 steps) | 10 `#f5f5f5` · 20 `#ebebeb` · 30 `#d6d6d6` · 40 `#b8b8b8` · 50 `#999999` · 60 `#7a7a7a` · 70 `#5c5c5c` · 80 `#3d3d3d` · 85 `#242424` · 90 `#1e1e1e` · 100 `#121212` |
| Danger | `#db6965` / darker `#d65550` / darkest `#d1413c`; background `#fff0f0`, icon background `#ffdad6`, text `#700000` |
| Warning | `#fceeca` / dark `#f5c354` / darker `#f3ab2c` / darkest `#ec8b14`; **warning text = normal body text color, not white** |
| Island (panel) | bg `#fff`, padding 12px, radius 8px, shadow `0 0 1px #0000002b, 0 0 3px #00000014, …` |
| Left properties island | 200px wide |
| Top toolbar island | 542×44px, 4px padding, radius 8px; tool buttons 36×36, radius 8px |
| Property option button | 32×32, radius 8px, unselected `#f6f6f9`, selected `#e3e2fe` (a fill, never a border), 40px pitch |
| Property group | `<fieldset>` + `<legend>`; legend 12px, 15px tall; group pitch 71px |
| Type | body `Assistant` 16px; UI labels 12px |
| Collaborator avatar | 28×28, `border-radius: 100%`, 12px initials in near-black `#1e1e1e` on a pastel fill (`#a8c5ff`, `#d4a8ff`), 39px pitch |
| Current user | wrapped in a 49×30 pill, radius 20px, bg `#ececf4`, 1px `#ebebeb` border, with a chevron — everyone else is a bare avatar |
| Remote cursor | small solid triangle in the user's hue + a rounded name pill in the *same* hue with near-black text |

### Notion ("tatami" design system, 544 tokens on `:root`)

| Thing | Value |
|---|---|
| Spacing | 0, 4, 8, 12, 16, 20, 24, 28, **30**, 32, 40, 48, 56, 64, 72, 80, 96, **100**, 128, 160 |
| Radius | 0, 4, **5**, 6, 8, 10, 12, 14, 16, and `round` = 624.938rem |
| Font sizes | 12, 14, **15**, 16, 18, 20, 22, 26, 32, 42, 54, 64, 76, 96 |
| Line heights | alias the spacing scale directly (`--font-line-height-200: var(--dimension-spacing-24)`) |
| Tracking, **per weight at the same size** | size-600: regular −1px, semibold −0.75px, bold −0.75px · size-700: regular −2px, semibold −1.5px, bold −1.5px |
| Numerals | `font-feature-settings: "lnum" 1, "locl" 0` on the sans stack — lining figures forced on |
| Body text color | `rgba(0,0,0,0.898)`–`0.95` — alpha on black, not a hex gray, so it composites correctly over page covers and colored blocks |

### Canva-class rails (measured on Polotno Studio, an explicit Canva clone)

Left rail tab cell: **74.5px wide × 72px tall**, icon above a 12px/18px label, full-height dark rail. Compare Figma/Graphite, whose tool column is a single ~24–44px strip of unlabeled icons. The 3× difference in cell area is the entire consumer/pro divide made visible.

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
Figma puts the axis glyph *inside* the field (`X 3200`, `W 256`), gray glyph, black value. Graphite does the same (`X 0 px`, `Y`, `W 1x`) in a 24px-tall, 80px-wide field on a 32px row pitch. Neither spends a single pixel on a left label column. Why it works: a two-column label/value layout at 240–290px leaves ~140px for the value, the labels wrap, and the numbers stop lining up vertically — which kills the one thing a properties panel is for, scanning a column of numbers for the one that's wrong. **The generic alternative** is the form layout every AI-generated design tool ships: `<label>X position</label>` above or beside a bordered `<input>`, 44px rows, a full section per property. It triples panel height and halves value width. **Does not apply** when a property genuinely has no glyph — blend mode, font family, easing curve. Those get a full-width row with a word.

**2. Option controls render the effect, not the name.**
Excalidraw's Stroke width control is three 32×32 buttons drawn as a thin, medium and thick line. Stroke style is a solid, a dash and a dot. Sloppiness is three squiggles of increasing amplitude. Edges is a sharp corner glyph and a rounded one. Not one word among them. tldraw goes further: its entire style panel has exactly one text label ("Shape") — everything else is a swatch, a fill icon, a dash icon, `S M L XL`, or four `Aa` specimens rendered in the actual four shape fonts. Why it works: you're choosing a visual result, so the control should be a preview of the result; it also survives localization for free. **The generic alternative** is a `<select>` with "Solid / Dashed / Dotted" — which forces a translation step in the user's head on every use, forever. **Does not apply** to properties with no visual signature (a layer name, a URL, an ID), or where the difference between options is too subtle at 32px to distinguish — in which case use icon + text, not icon alone.

**3. Selected state is a fill, never a border, and never a size change.**
Excalidraw: unselected `#f6f6f9`, selected `#e3e2fe` — same 32×32 box, same 8px radius, same position. tldraw's selected tool is a solid `#3182ed` fill of the same 40×40 button. **Why it works:** you sweep across ten option buttons a hundred times an hour; if selection adds a 2px border or a scale transform, the whole row twitches. **The generic alternative** — `border: 2px solid var(--primary)` on the active item — shifts every neighbour by 2px unless you also add a transparent border to the inactive ones, which people forget. **Does not apply** where the control's own fill is meaningful: a color swatch can't use a fill to show selection, so tldraw rings the active swatch instead.

**4. Overlay geometry is divided by zoom; content is multiplied by it.**
tldraw exposes `--tl-zoom` and derives `--tl-scale: calc(1 / var(--tl-zoom))`. Every selection stroke, handle, snapline and cursor multiplies by `--tl-scale`, so a 1px stroke is one screen pixel at 12% and at 3200%. **The generic alternative** — drawing selection UI in document space — gives you a 40px-thick selection rectangle when zoomed in and invisible handles when zoomed out; it is the single most common bug in hand-rolled canvases. Related: **zoom must anchor at the cursor**, not at the viewport centre. Anchoring at centre is the second most common bug and it makes a canvas feel broken within ten seconds.

**5. Modifier keys are taught in a persistent status bar, not a help modal.**
Graphite's bottom bar, with the Select tool active, reads: `Select Object + ⇧ Extend + ⌘ Deepest + ⌥ Deepen │ Select Area + ⇧ Extend + ⌥ Subtract │ Lasso │ Drag Selected │ G R S Grab/Rotate/Scale Selected │ ↑↓←→ Nudge Selected + ⇧⌘ 10x`. It changes with the active tool. Blender does the same. Excalidraw does a lighter version: a single hint line under the toolbar that is `To move canvas, hold Scroll wheel or Space while dragging, or use the hand tool` with nothing selected and becomes `Enter to add text, Cmd + ↑↓ to create a flowchart` when a shape is selected. Excalidraw also prints each tool's shortcut as a **subscript numeral on the tool icon itself** (1–0). **Why it works:** modifier chords are unguessable and unsearchable; a persistent, contextual strip converts them from tribal knowledge into ambient knowledge at the cost of ~24px of height. **The generic alternative** is a `?` shortcuts modal nobody opens twice. **Does not apply** on touch (there are no modifiers — Excalidraw correctly *drops* the numeral badges on mobile) or in a consumer tool where there are no chords to teach.

**6. Zero selection is not an empty state — it is the document's properties.**
tldraw's right panel with nothing selected shows the *current tool defaults* (color, fill, dash, size), and the identical panel shows the *selection's* styles when something is selected; the transition adds rows, it does not swap views. Graphite with nothing selected shows an empty Properties panel with its header intact and its width unchanged. **The generic alternative** — "Select an element to edit its properties" centered in the panel — wastes the moment where the user is about to set a default, and worse, some AI-built tools collapse or hide the panel entirely, so the canvas jumps 280px sideways every time you click empty space. **Never let selection change the panel's width.**

**7. Panels are wells or cards, consistently, and the choice is derived from the medium.**
tldraw: canvas `#f9fafb`, panel `#fcfcfc`, panel-contrast `#fff`, plus `inset 0 0 0 1px var(--tl-color-panel-contrast)` inside shadows 2–4. Panels are *lighter* than the canvas and lifted by shadow — cards over paper. Graphite: frame `#222`, panel `#111` — panels are *darker*, recessed wells in a metal frame. Both are internally consistent; what kills a canvas app is mixing them. Note tldraw's trick: instead of `border: 1px solid`, the hairline is an **inset shadow in the panel-contrast color**, so it renders inside the radius and never adds to layout size.

**8. Light chrome is right when the artifact is light; dark chrome is right when the artifact is emissive.**
Figma, tldraw, Excalidraw, Canva default light because the thing being made is a light UI, a whiteboard, or a print piece, and a dark surround around a white artboard causes a simultaneous-contrast shift that makes you misjudge value and grays. Rive, Cavalry, Spline, Blender, Photopea/Photoshop default dark because the output is video, game art or 3D that will be viewed on a dark surface, and because emissive/HDR content needs a low-luminance surround to judge. **The rule is not "pro tools are dark".** It is: the chrome's luminance should match the medium the artifact will live in, and the chrome must be **chroma-free**. A "dark theme with a blue tint" is a defect in this archetype, not a style — it will bias every color decision the user makes. This is why Photoshop ships four discrete gray levels rather than a light/dark toggle. tldraw's `#f9fafb` is very slightly blue, which is fine for a whiteboard and would be wrong for a color-grading tool.

**9. Collaborator presence: their cursor above everything, their everything-else below yours.**
Excalidraw renders a remote cursor as a small solid triangle in the user's hue with a rounded name pill in the same hue and **near-black text** — not white-on-color, so a pale pastel assignment stays legible on a white canvas. The 28px round avatar in the top-right uses the identical hue, which is how you know which pointer is whose without reading. The current user is the only one wrapped in a pill with a chevron (it's their own menu). tldraw encodes the same priority in z-index: collaborator scribble/brush/indicator at 10/20/30, yours at 40/50/100/105, and collaborator *cursor* at 130 — above every piece of your own selection UI. **The generic alternative** — a colored ring or glow around everything a collaborator has selected, at full opacity, above your own handles — makes a five-person board unusable within a minute.

**10. State changes reuse an existing control instead of adding a banner.**
When an Excalidraw live session starts, the existing `Share` button turns green and grows a small numeric badge with the participant count; a laser-pointer tool appears in the toolbar; two avatars appear next to it. No banner, no toast, no layout shift on the canvas. **The generic alternative** is a full-width green "You are now collaborating!" bar that pushes the canvas down 48px — which is both a distraction and a scroll-position bug. Same principle for autosave: the save indicator belongs in the title/menu region as a word ("Saving…" → nothing), never as a toast, and never as a spinner over the artwork.

**11. Destructive and irreversible actions explain the consequence in the dialog body.**
Excalidraw's live-collaboration dialog says, above the Stop button: *"Stopping the session will disconnect you from the room, but you'll be able to continue working with the scene, locally. Note that this won't affect other people, and they'll still be able to collaborate on their version."* Plus, unprompted: *"🔒 Don't worry, the session is end-to-end encrypted, and fully private. Not even our server can see what you draw."* **The generic alternative** is "Are you sure you want to stop the session?" with Cancel/OK — which tells the user nothing they didn't already know and makes them guess about the thing they were actually worried about (does my drawing survive? does theirs?).

**12. Consumer canvases invert almost all of this — deliberately.**
Canva-class tools use a wide left rail of **labeled** icon cells (74.5 × 72px in Polotno), a template gallery as the first screen, and a contextual toolbar above the artboard rather than a dense right panel. The user is here for twenty minutes a month, not six hours a day; the cost of a mis-click is higher than the cost of a wide rail. **Do not port Figma's density into a consumer tool** and do not port Canva's labeled rail into a tool people live in — a 72px-tall labeled cell for eleven tools eats 792px of vertical space that a pro user would rather spend on layers.

## The properties panel, specifically

This is the pattern AI-generated design tools get wrong most often, so here is the checklist, in the order the mistakes usually happen.

**Structure**
- Fixed width. 240–290px is the measured band (Graphite 287.2px; tldraw's much lighter style panel 148px). It must not be fluid and must not change with selection.
- Row pitch 28–32px with 24px controls (Graphite: 24px control, 32px pitch). Not 44px. Not one control per section.
- Sections are collapsible, have a bold header row, and that header row carries the section's own actions right-aligned (add a fill, add an effect, open auto-layout). Section open/closed state persists across selections.
- The top of the panel is stable across selection types — layer name, then position/size — so muscle memory survives switching from a rectangle to a text layer. Only the lower sections swap.
- Two fields per row on a strict half/half grid, 4–8px gutter. Anything that doesn't fit the grid (a constrain-proportions link, a lock) goes in a narrow gutter column *outside* the grid, not squeezed into it.

**The fields themselves**
- Unit and axis live inside the field, gray, on the left; the value is black and immediately follows. No separate unit dropdown per field.
- The glyph is **scrub-draggable**: press on the `X` and drag to change the value. Every serious tool in this set does this. It is the highest-value 20 lines of code in the panel.
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

**What a naive panel does instead** (all of these are live in AI-generated design tools right now): a `<label>` above every `<input>`; a 1px border on every field; 44–48px rows; a "Apply changes" button; a success toast after each edit; "No element selected" replacing the panel; sliders with no numeric readout; a native `<select>` for blend mode inheriting the OS look while everything else is custom; `Mixed` not implemented, so selecting two rectangles and typing a width silently applies only to one; and hover states that add a border and shift the row.

## States, edges and the unglamorous parts

**First run.** Excalidraw draws four hand-lettered annotations with curved arrows pointing at its *actual* chrome — "Export, preferences, languages…" at the hamburger, "Pick a tool & Start drawing!" at the toolbar, "Shortcuts & help" at the bottom-right — rendered in the app's own hand-drawn font. It is an onboarding overlay that is also a demonstration of what the product makes. Graphite and Photopea use a start screen of four to six actions with their shortcuts printed alongside (`New Document ⌘N`, `Open Document ⌘O`, `Open Demo Artwork`) — teaching the keyboard on the first screen. Photopea additionally lists `.PSD .AI .XD .FIG .sketch .PDF RAW ANY` as icons along the bottom, turning a zero-data screen into a capability claim. **The generic alternative** is a modal carousel with three illustrations and a Next button.

**Zero selection.** Show tool defaults or document properties. Never collapse the panel. Never center "Nothing selected" in it.

**Zero data / empty canvas.** The empty canvas is the correct empty state — do not put an illustration on it. Excalidraw's start content sits *on* the canvas and vanishes the moment you draw, with no dismissal needed.

**Too much data.** Graphite's Layers panel with a real document shows eight consecutive rows named "Untitled Layer", each with a live thumbnail. The thumbnail is the identity when the name isn't — which is why every layer row in every serious tool has one, and why a text-only layer list is unusable past twenty items. Virtualize the list; do not paginate it.

**Offline / local-first.** Excalidraw states it plainly on the first screen: *"Your drawings are saved in your browser's storage. Browser storage can be cleared unexpectedly. Save your work to a file regularly to avoid losing it."* That is an unusually honest reliability disclosure and it belongs in this archetype: if you cannot guarantee durability, say so where the user will read it, before they've spent two hours.

**Permission denied / view-only.** Degrade to an inspector, not to nothing: the properties panel stays, at the same width, with read-only values; the tool palette shrinks to hand + comment; the file name gets a "View only" chip. Hiding the panel makes a view-only file feel broken rather than restricted.

**Loading a heavy document.** Show the chrome immediately with an empty canvas and progressively fill it. Graphite renders its full frame — title bar, tab, panels, status bar — before the artwork resolves. Never gate the whole window behind a spinner; the panels are the app's identity and their arrival is the perceived load.

**Version history.** The pattern that works: a right-panel list grouped by day, auto-saves collapsed into "N changes" and named checkpoints always expanded and visually distinct; selecting a version puts the canvas in read-only preview with a banner naming the version and offering Restore; **restoring creates a new version rather than truncating the timeline**, so the act of restoring is itself undoable. The failure mode is a history that destroys the future when you go back.

## Mobile

Measured at 390×844 (iPhone 14 Pro emulation):

**tldraw** moves the toolbar to a full-width bottom bar with seven tools plus a `^` expander for the overflow (down from nine plus the expander on desktop), drops the style panel entirely (it becomes an on-demand sheet), drops the zoom readout, and floats the selection action row (undo / redo / delete / duplicate / …) directly above the toolbar. The top bar keeps only the logo, a `⋮`, and the primary action.

**Excalidraw** moves its top toolbar to the bottom, cuts it from twelve tools to eight plus an overflow menu, **removes the subscript shortcut numerals** (there is no keyboard), moves undo/redo to a floating pair above the toolbar, drops the zoom control, keeps the hamburger top-left and the library toggle top-right, and turns the 200px properties island into a bottom sheet that appears on selection.

The three rules that generalize: (1) tools move to the thumb zone and lose their least-used members to an overflow, (2) keyboard affordances are stripped, not just disabled, and (3) the properties panel becomes a sheet whose height is a fraction of the viewport, so the canvas is still visible while you edit — a full-screen properties modal on mobile means you can't see what you're changing.

What should **admit it shouldn't** adapt: precision vector editing, node graphs, timeline scrubbing at frame resolution, and multi-panel 3D. Rive, Cavalry, Blender and Graphite are correct to be desktop-only. Shipping a cramped node editor on a phone is worse than shipping a viewer plus "open on desktop to edit". A read-only mobile viewer with comments is a complete and respectable product.

## How this archetype fails

The bad imitation is recognizable in about four seconds, and here is what's actually missing:

1. **The canvas doesn't behave.** Space+drag doesn't pan. Scroll zooms instead of panning. Zoom anchors at the viewport centre instead of the cursor. There's no marquee select on empty-canvas drag. Alt+drag doesn't duplicate, Shift+drag doesn't constrain to an axis, Alt+resize doesn't resize from centre, Shift+resize doesn't preserve aspect. Arrow keys don't nudge, Shift+arrow doesn't nudge by 10. These are not features; they are the physics, and a canvas that lacks them reads as a mockup of a canvas.

2. **The selection UI is drawn in document space**, so handles balloon at high zoom and vanish at low zoom, and the 1px selection stroke becomes 6px.

3. **The properties panel is a web form.** Labels above bordered inputs, 44px rows, an Apply button, no scrub-drag, no math, no Mixed state, a toast on every change.

4. **Chrome does not shrink.** A fixed 64px app header with a logo and a nav, a breadcrumb bar, a footer, and a 320px right panel that can't collapse — leaving the artwork about 55% of the window. Real canvas tools give the artwork 78–85% at 1440px (Graphite: 1148.8 of 1440 = 79.8% horizontally, with a 28px title bar and a 28px status bar) and offer a single keystroke to get to 100%.

5. **Everything animates.** A 300ms ease on panel collapse, a hover scale on tool buttons, a fade on selection. In a tool used for six hours, every animation is a tax paid a thousand times. Canvas tools animate almost nothing: tldraw's tool selection is an instant fill change; Excalidraw's option buttons don't transition. The correct duration for a properties-panel state change is 0ms. Reserve motion for things that genuinely need spatial continuity (a panel sliding in from an edge, a zoom-to-fit).

6. **No keyboard layer.** No single-key tool shortcuts (`V` `R` `O` `T` `L`), no `Cmd+\` to hide UI, no `Shift+1/2/0` for zoom-fit/zoom-selection/100%, no `Cmd+D` duplicate, no `[` `]` for z-order. Tools in this archetype are keyboard-first with a mouse assist, not the other way around.

7. **Multiplayer as decoration.** Cursors with no name, or names that fade before you can read them; collaborator selection halos drawn above your own handles; an avatar stack that doesn't match the cursor colors; a "3 people editing" banner. And the tell: no `z-index` policy at all, so whichever DOM node happened to be last wins.

8. **The tokens are a Tailwind default.** `rounded-lg` everywhere (8px), a strict 8px spacing scale, `bg-gray-50` panels with `border-gray-200`, `text-gray-500` labels, Inter at 14px/1.5. Compare what the real ones actually use: tldraw's radii are 2/4/6/**9/11** and its spaces include **20** and **28**; Notion's radii include **5px** and its sizes include **15px**; Graphite's inputs are radius **2px**. These are not arbitrary — small radii read as precision instruments; 9px and 11px are what you get when a 40px button and a 148px panel are tuned by eye rather than by scale.

9. **Dark mode as a personality.** A near-black chrome with a blue or purple cast, glassmorphic panels, and a glow on the selection — over an artboard the user is trying to color-match. The chrome is a measuring instrument; it must be neutral and it must be boring.

10. **No status of any kind.** No zoom readout, no cursor coordinates, no selection dimensions, no save state, no modifier hints. The user has no idea where they are in the document.

## Copy and tone

The voice is a tool's voice: short nouns, no encouragement, no personality in the chrome. The personality goes in the template names and the empty state, never in the panel.

**Right**
- Section headers are bare nouns: `Position`, `Layout`, `Fill`, `Stroke`, `Effects`, `Appearance`, `Export`, `Layers`.
- Tooltips are `Rectangle — R`. Name, em dash, shortcut. Nothing else.
- Name the property after the *result* the user perceives, not the implementation. Excalidraw ships `Sloppiness` and `Edges`, not `Roughness seed` and `Corner radius mode`. tldraw ships `S M L XL`, not `12 / 16 / 24 / 32 px`.
- Consequence-first destructive copy: *"Stopping the session will disconnect you from the room, but you'll be able to continue working with the scene, locally. Note that this won't affect other people."*
- Contextual hints written as a keyboard sentence: `To move canvas, hold Scroll wheel or Space while dragging, or use the hand tool` · `Enter to add text, Cmd + ↑↓ to create a flowchart`.
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

- **https://editor.graphite.rs/** — full editor, opened the "Isometric Fountain" demo document and selected a layer. Read the whole `:root` token set (16-step gray ramp, ten data-type color pairs with dim twins, checkered-transparency and "no color" SVG tokens), and measured the Properties panel (287.2px wide, 32px row pitch, 24×80px number inputs at radius 2px), the tab bar, and the contextual status bar listing live modifier chords per tool.
- **https://www.tldraw.com/** — empty canvas, then a rectangle drawn and selected. Read `--tl-space-*`, `--tl-radius-*`, the full light and dark theme ramps, the four-step shadow scale with its inset hairline, the complete z-index layer registry, the inline-SVG cursor set with drop shadows, `--tl-scale`, and `--tl-text-outline`. Measured the 148px style panel and the 40px-button-on-36px-pitch swatch grid.
- **https://excalidraw.com/** — empty canvas, rectangle selected, then a real two-participant live-collaboration session driven from two browser contexts. Read the primary/gray/danger/warning ramps and Island styles; measured the 200px properties island, `<fieldset>/<legend>` groups at 71px pitch, 32px option buttons at 40px pitch, and — during the live session — 28px round collaborator avatars at 39px pitch with pastel fills `#a8c5ff` / `#d4a8ff`, the current-user pill (49×30, radius 20px), the green Share button with a participant badge, the collaboration-only laser tool, and remote cursors as colored triangles with dark-text name pills. Also captured the desktop shortcut-numeral badges and confirmed they are dropped at 390px.
- **https://studio.polotno.com/** — Canva-class editor; measured the left rail's 74.5 × 72px labeled tab cells.
- **https://www.notion.so/help** — read 544 `tatami` design tokens: spacing, radius (including the 5px step), font-size scale, line-heights aliased to the spacing scale, per-weight letter-spacing, and the `"lnum" 1` numeral setting.
- **https://help.obsidian.md/** — Obsidian Publish; body 15px, article body 16px/24px, h1 41.6px/49.92px at −0.624px tracking.

Screenshots viewed (26 total, all read as images, not inferred):

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
