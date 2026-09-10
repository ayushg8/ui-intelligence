# Maps, 3D & media

**Evaluated:** 2026-09 · **Researcher note:** Three categories with one shared failure mode: the library is fine and the *default output* is the tell. Maps have fully commoditized — MapLibre v6 + Protomaps means anyone can ship a world map for $0, so the differentiator is now cartography, and almost nobody restyles. 3D/shader backgrounds are the opposite: they've gotten so cheap (`@paper-design/shaders-react` is at ~500k weekly installs on a `0.0.x` version number) that a violet mesh gradient on near-black is now the single loudest "generated" signal on the web. Media is the quiet, healthy corner — Media Chrome and Embla are genuinely best-in-class primitives — with two live traps: `@vidstack/react@latest` installs a 2024 build, and Leaflet hasn't cut a stable release since May 2023.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Media Chrome | `essential` | Web-component player parts with no house style at all; the correct base for a branded player. | low |
| MapLibre GL JS | `essential` | The default map engine now. v6, BSD-3, shipping weekly — and it ships no basemap, which is a feature. | low (engine) / high (demo style) |
| Embla Carousel | `essential` | 29M weekly downloads and the only carousel that behaves like a primitive instead of a widget. | low |
| Protomaps + PMTiles | `essential` | One file on object storage = the whole planet. Kills the tile-server line item and the vendor. | low |
| three.js | `essential` | 115k stars, r186 shipping monthly, 363+ contributors. The substrate; not a design decision. | n/a |
| React Three Fiber + drei | `essential` | The best 3D DX on the web. drei is also where the 2026 landing-page cliché is manufactured. | high (via drei) |
| next/image + unpic | `essential` | Correct `srcset`/`sizes`/CLS handling is not optional and neither of these makes you think about it. | low |
| Mux Player | `strong` | Best out-of-box player *if* you're on Mux. It's Media Chrome with taste and analytics pre-wired. | medium |
| deck.gl | `strong` | Unmatched for large geospatial layers; its dark-carto-plus-neon-arcs default look is a genre cliché. | high |
| react-map-gl | `strong` | Thin, honest React bindings for MapLibre *or* Mapbox. Correct default for React map work. | low |
| ThumbHash / BlurHash | `strong` | ThumbHash is strictly better and half the field still reaches for BlurHash out of habit. | low |
| Paper Design shaders | `strong` | Genuinely the best-engineered shader kit; also the fastest way to make your product look generated. | high |
| wavesurfer.js | `strong` | The only serious audio-waveform library, and it's actively maintained in 2026. | medium |
| PhotoSwipe | `strong` | 15 years old, still the best-behaving lightbox on touch. Zero visual opinion. | low |
| yet-another-react-lightbox | `strong` | The React answer; 1 open issue, pushed this week, boringly correct. | low |
| OpenFreeMap | `situational` | Free unmetered planet tiles with no API key. Nine contributors and one person's donations. | medium |
| Mapbox GL JS | `situational` | Technically excellent, proprietary TOS license, terminates if you leave Mapbox. Only for Mapbox customers. | medium |
| cobe | `situational` | 5KB WebGL globe. Perfect for exactly one job; a tell when used for decoration. | high |
| Leaflet | `situational` | 45.6k stars, 6.5M wk npm, and no stable release since 2023-05. Raster-only. Legacy answer. | medium |
| Spline | `situational` | Real design tool, real runtime weight, and a house style you cannot hide. | high |
| Unicorn Studio | `situational` | Best-in-class shader authoring UX; its output is the exact look agents already over-produce. | high |
| Vidstack | `experimental` | `@vidstack/react@latest` is 0.6.15 from **2024-04-19**. The real version hides under the `next` tag. | low |
| Threlte | `situational` | The R3F equivalent for Svelte. Good, small, and you're on your own for exotic problems. | low |
| OpenLayers | `situational` | The GIS-correct choice — projections, WMS, WMTS. Nobody picks it for a consumer product. | low |
| Swiper | `situational` | Enormous, capable, and funded by an online-casino sponsor wall pointing at paid upsells. | high |
| Plyr | `reference-only` | Fine code, 2018 visual identity, and that cyan play button is on ten thousand sites. | high |
| Video.js | `reference-only` | The enterprise/legacy answer. Skin-first architecture from a different era of the web. | high |
| Felt | `reference-only` | Not a library — the best worked example of map chrome that gets out of the data's way. | n/a |
| keen-slider | `avoid` | Last npm publish **2023-07-05**. Embla does the same job and is alive. | medium |
| Splide | `avoid` | Last npm publish 2022-11-09; repo last pushed 2024-07. Dead. | medium |
| Vanta.js | `avoid` | Pinned to three.js r134 (2021), last push 2024-03, and I measured its own demo at 5.1fps. | high |
| plaiceholder | `avoid` | Last pushed 2023-05-24. Still pulling 81k/wk from stale tutorials. Use ThumbHash. | low |
| react-slick | `avoid` | jQuery-era slider ported to React. Brings its own CSS and its own dot styling. | high |

## Recommendations by need
- **Default choice (maps):** MapLibre GL JS + `react-map-gl` + Protomaps tiles. Free, BSD-3, no key, no vendor, no metering, and the whole styling surface is a JSON file you own.
- **Default choice (video):** Media Chrome if you host your own files; Mux Player if you're on Mux. Both are the same primitives; one has the analytics soldered in.
- **Default choice (carousel):** Embla — and first make sure you actually need a carousel (see below).
- **Best engineering:** three.js. r186 shipped 2026-09-08, r185 on 2026-07-01 — a monthly cadence sustained for fifteen years, with WebGPU and WebGL both first-class.
- **Best visual quality out of the box:** none of them, and that's the finding. Every map, player and shader library here either ships no look (MapLibre, Media Chrome, Embla — correct) or ships a *recognizable* one (Plyr, deck.gl, Spline, drei). There is no "beautiful by default" option and you should not want one.
- **Best accessibility:** Media Chrome. Real `<button>`s inside shadow DOM with ARIA and keyboard defaults, and captions/`playback-rate`/PiP are first-class elements rather than a settings menu afterthought.
- **Most customizable / least house-style:** Media Chrome and MapLibre, jointly. Both are deliberately styleless.
- **Lightest:** cobe (~5KB for a globe), ThumbHash (~1KB decode), Embla core (small, no CSS shipped).
- **Promising newcomer:** `@paper-design/shaders-react` — ~292k→664k weekly downloads over the last quarter, still at `0.0.80`. Adoption is a full order of magnitude ahead of its version number.
- **Premium/paid worth it:** Mux, if video is a real surface in your product (encoding + delivery + player + QoE analytics as one thing). Unicorn Studio *only* if a designer, not an agent, is driving it.

## Basemap styling: the thing that actually ruins map UI

This is where nearly every product map goes wrong, and it has nothing to do with which library you chose.

**What I saw.** MapLibre's own docs gallery leads with `demotiles` — a pastel political map: baby-blue ocean, mint/lavender/apricot country fills, dotted latitude lines, "Tropic of Cancer" labels. That is the first map in every MapLibre tutorial and it is a *reference style for testing the renderer*, not cartography. OpenFreeMap's homepage demo shows the OSM "Liberty" style: cream landmass, orange-cased motorways, yellow secondary roads, gray building fills, every POI label on. It is a *navigation* map. Both are perfectly good at what they're for. Both are catastrophic underneath a product UI, for one reason: **a general-purpose basemap is designed to be the figure, and in your product it must be the ground.**

**The four rules good products follow.**
1. **Desaturate the base, saturate only your data.** Positron and Dark Matter (CARTO) exist for exactly this and are free under CC-BY; Protomaps ships `light`/`dark`/`grayscale`/`white` flavors as a first-class style parameter. Your markers should be the only chromatic thing on screen.
2. **Delete layers, don't recolor them.** Most default styles carry 200+ layers. A store locator does not need land-use polygons, golf courses, tree rows, or `poi_r20` labels. Deleting them is faster than restyling them and buys real render performance.
3. **Own the label typography.** This is the single biggest tell. A default style ships DIN/Noto/Roboto glyphs that will not match your product's type stack, at sizes and halo widths tuned for a full-screen map, not a 400px panel. Swap the glyph URL to your own font and cut label density by a zoom level or two.
4. **Make the chrome quiet.** Felt is the reference here: its map toolbar is a single near-black rounded bar floating over the map, and the legend is a plain white card — so the orange/purple/green data dots are the only things competing for attention. Compare against MapLibre's stock `NavigationControl`: a stack of white squares with 1px borders in the top-right, which is the "I did not style my map" signature.

An agent's default should be: **Protomaps `grayscale` or `light` flavor, POI labels off, your own glyphs, your brand color reserved for data.** Never ship `demotiles`. Never ship stock Liberty.

## When 3D and shader backgrounds are defensible

Be blunt about this: an animated shader or 3D background is a top-tier "this was generated" signal in 2026, and the reason is combinatorial. The generated look is a *stack*, not a single element — near-black background + violet/indigo aurora or mesh gradient + a mixed sans/serif headline + a violet pill CTA + a logo bar underneath. Unicorn Studio's own homepage is that exact stack, down to the lens-flare sparkle sitting behind the CTA. When an agent reaches for a shader background it almost always reproduces the whole stack, because it learned them together.

**Defensible:**
- **The 3D object *is* the product.** A CAD tool, a configurator, a map, a floorplan, a game, a physics sim. R3F for anything real here.
- **The visual encodes actual data.** deck.gl arcs over real flows; cobe with real customer pins; a globe whose rotation is tied to a live feed. It stops being decoration the moment removing it removes information.
- **A shader used as *texture*, not as *hero*.** Paper's `dotGrid`, `paperTexture`, `dither`, `halftone` — a barely-visible grain or dot field behind a section, at low opacity, in your existing brand colors. This is closer to a background-image than to an effect, and it reads as craft.
- **Image-processing shaders on real photography.** Paper shaders' `fluted glass`, `water`, `image dithering` applied to a photo you actually own. This is genuinely underused and does not read as generated, because the content underneath is specific to you.
- **One deliberate moment, above the fold, that a designer signed off on.** Once. Not on every section.

**Not defensible:**
- Animated mesh/aurora gradient as page background. This is the tell. If it is violet or indigo, it is doubly the tell.
- Floating rounded 3D blobs on black with a perspective grid floor — the Spline house style, recognizable at a glance.
- `<Float>` + `<MeshDistortMaterial>` + `<Environment preset="city">` + bloom. Four drei defaults that produce an identical iridescent blob on thousands of sites.
- Particle fields, `<Stars>`, connected-dot "network" backgrounds, birds, waves. Vanta's entire catalog.
- Anything that runs a `requestAnimationFrame` loop behind text a user is trying to read on a phone.

**The mobile test settles most arguments.** A full-viewport fragment shader is a full-viewport per-frame GPU cost on a device that is thermally throttled and on battery. Always gate on `prefers-reduced-motion`, render a static first frame or a poster image below some breakpoint, and pause when the tab is hidden. If the effect can't survive being static on mobile, it wasn't carrying meaning.

**WebGPU status, concretely:** caniuse puts WebGPU at **87.35% global**. Chrome desktop 113+, Chrome Android 152+, Safari 26+ and iOS Safari 26+. **Firefox still has it disabled by default across all shipping versions.** three.js r186 keeps `WebGPURenderer`/TSL opt-in and continues shipping WebGL fixes in the same release; there is no announced deprecation timeline. Conclusion: use WebGPU where it buys you something specific (compute, large instancing) and always keep the WebGL fallback path. It is not yet a thing you build on exclusively.

## Scorecards

### Media Chrome — `essential`
- **What:** Framework-agnostic web components for building a media player — `<media-play-button>`, `<media-time-range>`, `<media-captions-button>` etc. — that attach to any `<video>`, `<audio>`, HLS engine, or third-party embed.
- **Verdict:** This is the right architecture for player UI and it is not close. You compose the controls you need in HTML, style them with CSS custom properties, and the state machine (buffering, seeking, fullscreen, PiP, cast, captions) is handled for you. Crucially it has *almost no default look* — the stock control bar is an opaque black strip with white glyphs, which is honest rather than pretty, and it inverts the usual player problem: instead of fighting a skin, you start from nothing. Works in React, Vue, Svelte, Angular, plain HTML, and inside other players.
- **Use when:** You want a player that matches your product instead of looking like a player. · **Don't use when:** You want something that looks finished in 5 minutes — reach for Mux Player, which is this with a skin on.
- **Scores /5:** visual 3 · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 5 · originality 4
- **Evidence:** ★2,735 · v4.19.2 released 2026-06-10 · last push 2026-08-21 · 3,287,698 wk npm (inflated: Mux Player depends on it) · 45 contributors · MIT · maintained by Mux
- **Looked at:** https://www.media-chrome.org — brutalist docs: lavender/peach/black panels, monospace throughout, the element list rendered as an indented XML tree. The demo player's default control bar is a solid `#000` strip *below* the frame, not a gradient overlay — play, ±30s seek, mute, a two-track scrubber (buffered ring + played dot), time on the right, then CC / 1x / PiP / fullscreen. Nothing rounded, nothing branded, no color. Exactly the right amount of nothing.
- **Vibecode risk:** low — a Media Chrome player looks like whatever you styled it to look like, because it starts with no opinion.
- **Link:** https://www.media-chrome.org

### MapLibre GL JS — `essential`
- **What:** The BSD-3 community fork of Mapbox GL JS v1, now the de-facto open vector-tile renderer. Globe projection, 3D terrain, custom layers, full style-spec support.
- **Verdict:** The fork won. MapLibre is at **v6.9.0 shipped 2026-09-09**, with v6.8.0 two days earlier — a cadence that embarrasses most of its dependents — and 384 contributors against Mapbox's single-vendor model. It renders the same style JSON, so any Mapbox v1 investment transfers. The thing to internalize is that MapLibre is a *renderer, not a map*: it ships no tiles and no real style, and the `demotiles` style everyone starts from is a testing artifact, not cartography. Treat "which basemap" as a separate, deliberate decision from "which renderer."
- **Use when:** Any web map, unless you have a contractual reason to be on Mapbox. · **Don't use when:** You need Mapbox-proprietary features (their newer 3D standard style, their traffic/nav data) — but then you're buying Mapbox anyway.
- **Scores /5:** visual n/a (ships no style) · interaction 5 · a11y 3 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 4 · stability 5 · originality 3
- **Evidence:** ★11,589 · v6.9.0 2026-09-09 · last push 2026-09-09 · 4,366,094 wk npm · 384 contributors · BSD-3-Clause
- **Looked at:** https://maplibre.org/maplibre-gl-js/docs/examples/ — the docs themselves are excellent: three-column layout, clear Getting Started / Camera & Animation / Controls & Gestures tabs, version and star count in the header. But the very first example thumbnail, "Display a map," is the `demotiles` style — a pastel crayon political map with a baby-blue ocean, mint and lavender country fills and dotted latitude lines. It is the ugliest first impression in the category, and because it's example #1 it propagates into every tutorial and every generated snippet.
- **Vibecode risk:** low as an engine; **high** if you ship `demotiles` or an unmodified OSM style — that is the map equivalent of shipping Bootstrap blue.
- **Link:** https://maplibre.org/maplibre-gl-js/

### Embla Carousel — `essential`
- **What:** A dependency-free carousel engine with a plugin system (autoplay, autoscroll, class names, fade, wheel gestures) and thin wrappers for React, Vue, Svelte, Solid.
- **Verdict:** Embla won this category decisively and for the right reason: it ships **no CSS and no chrome**. You get scroll position, snap points, and drag physics; the arrows, dots, and layout are yours. That's why shadcn/ui, Radix-adjacent kits, and roughly every 2026 component library build their `<Carousel>` on it. The drag feel is the best in the field — momentum and rubber-band resistance that read as native rather than as a JS animation. 29M weekly downloads on the core package. v9 is at rc03 (2026-08-21) with v8.6.0 still the `latest` tag, so pin explicitly.
- **Use when:** You've confirmed a carousel is the right pattern and you want to own the visual design. · **Don't use when:** You want arrows and dots handed to you — you will be writing them.
- **Scores /5:** visual n/a (styleless) · interaction 5 · a11y 3 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 5 · stability 4 · originality 4
- **Evidence:** ★8,411 · v9.0.0-rc03 2026-08-21 (latest stable 8.6.0) · last push 2026-09-09 · 28,997,865 wk npm (`embla-carousel`), 21,957,283 (`embla-carousel-react`) · 55 contributors · MIT
- **Looked at:** https://www.embla-carousel.com — restrained docs site: near-white ground, a blue-to-violet gradient wordmark and matching glow on the logo mark, three flat feature cards with no shadow and an arrow link each, a v9 (latest) version pill in the nav. The one design smell is that blue→violet gradient, which is not in the library, only the marketing site. Legible, unremarkable, appropriate.
- **Vibecode risk:** low — because the library contributes zero pixels, an Embla carousel looks like whatever you designed.
- **Link:** https://www.embla-carousel.com

### Protomaps + PMTiles — `essential`
- **What:** A single-file cloud-optimized tile archive format (`.pmtiles`) served by HTTP range requests off any object store, plus an open OSM basemap build with `light` / `dark` / `white` / `grayscale` / `black` flavors.
- **Verdict:** The most quietly consequential thing in web mapping this decade. You put one file on R2 or S3, point MapLibre at it, and you have the planet with **no tile server, no API key, no per-view metering, and no vendor who can change the terms**. Extract a bounding box and the file for a metro area is small enough to sit in your repo. The flavor system is also the rare basemap default that's actually *designed for being underneath something* — `grayscale` and `light` are proper product basemaps rather than navigation maps. Kelso Cartography's involvement shows in the label placement.
- **Use when:** Any map where you control the bounds, or any map where you refuse to be metered. · **Don't use when:** You need live traffic, routing, geocoding, or nightly OSM freshness with no pipeline of your own.
- **Scores /5:** visual 4 · interaction n/a · a11y n/a · engineering 5 · maintenance 4 · docs 4 · customization 5 · perf 5 · stability 4 · originality 5
- **Evidence:** PMTiles ★3,029, last push 2026-08-19 · basemaps ★730, last push 2026-08-20 · `pmtiles` 645,169 wk npm · BSD-3-Clause (basemaps) · Protomaps LLC / Kelso Cartography
- **Looked at:** https://maps.protomaps.com — the basemap inspector: a `flavor` dropdown (light/dark/grayscale/white), a `language` selector, local-sprite and bbox toggles, and a "Get style JSON" button, all in a plain blue-and-white utility shell. The map pane failed to load tiles in my headless capture (`Bad response code: 404` from the demo bucket) so I could not judge the rendered cartography live — a real availability wobble on their public demo bucket, worth noting, though it says nothing about the format.
- **Vibecode risk:** low — a `grayscale` Protomaps base with POIs off is the *opposite* of a tell; it looks like someone made a decision.
- **Link:** https://protomaps.com

### three.js — `essential`
- **What:** The WebGL/WebGPU rendering library the entire web-3D ecosystem sits on.
- **Verdict:** Not really a design choice — it's the substrate, and the question is only whether you use it directly or through R3F. What deserves saying in 2026 is how healthy it still is: r186 on 2026-09-08, r185 on 2026-07-01, 115k stars, 363+ contributors, monthly releases sustained since 2010. WebGPU (`WebGPURenderer` + TSL) is now a genuinely capable second backend getting MSAA and XR work in current releases, but it remains **opt-in with no WebGL deprecation timeline announced**, which is the correct call while Firefox still ships WebGPU disabled by default. r186 also deprecates the CommonJS build and removes minified builds — check your bundler config before upgrading.
- **Use when:** Any real-time 3D. · **Don't use when:** You want a decorative background — the cost/benefit is terrible and see the section above.
- **Scores /5:** visual n/a · interaction n/a · a11y n/a · engineering 5 · maintenance 5 · docs 3 · customization 5 · perf 5 · stability 4 · originality 5
- **Evidence:** ★115,354 · r186 2026-09-08 · last push 2026-09-09 · 14,025,392 wk npm · 363+ contributors (GitHub API caps the list) · MIT
- **Vibecode risk:** n/a at the library level — everything depends on what you build.
- **Link:** https://threejs.org

### React Three Fiber + drei — `essential`
- **What:** A React reconciler for three.js (`@react-three/fiber`) plus the enormous helper collection (`@react-three/drei`) — cameras, controls, loaders, materials, text, environments, effects.
- **Verdict:** The best developer experience in web 3D, full stop; declarative scene graphs compose and diff the way React components should and the performance overhead is genuinely near-zero. It is also, unavoidably, where the 2026 landing-page cliché is manufactured — `<Float>` + `<MeshDistortMaterial>` + `<Environment preset="city">` + bloom is four drei defaults that produce the same iridescent blob on thousands of sites, and an agent reaching for "3D hero" will assemble exactly that. Version state matters: **v9.7.0 is `latest` (2026-07-31); v10 is alpha.5** and is where WebGPU/TSL support lands. Don't let an agent install `@latest` of drei (10.7.8) against an assumption of R3F v10.
- **Use when:** Real 3D in a React app — configurators, viewers, games, data scenes. · **Don't use when:** Decoration. A video or a static render is cheaper and usually looks better.
- **Scores /5:** visual n/a · interaction 5 · a11y 2 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 3 (v10 alpha in flight) · originality 5
- **Evidence:** R3F ★32,223, 4,673,176 wk npm, 220 contributors, MIT, v9.7.0 latest / v10.0.0-alpha.5 2026-09-08 · drei ★9,862, 3,514,191 wk npm, last push 2026-09-07
- **Vibecode risk:** **high**, via drei. The library is neutral; its presets are not. If you use drei, deliberately avoid the four defaults named above.
- **Link:** https://r3f.docs.pmnd.rs

### next/image + unpic — `essential`
- **What:** `next/image` is Next.js's built-in image component (automatic `srcset`, AVIF/WebP negotiation, lazy loading, reserved layout box). `unpic` is a framework-agnostic equivalent that generates correct `srcset` for ~25 image CDNs without any build step or server.
- **Verdict:** These matter more to perceived quality than any component library in this file, because layout shift and a 4MB hero JPEG destroy a page's feel in a way no amount of good typography recovers. `next/image` is the right default inside Next and the only real caution is that its default loader runs optimization on your server — set a CDN loader in production. `unpic` is the underrated one: it detects your image CDN from the URL and emits the right transform params, so it works in Astro, Svelte, Vue, Solid, Qwik and plain React with no infrastructure at all. Its npm license is MIT although the GitHub repo carries no LICENSE file — a small housekeeping gap, not a real risk.
- **Use when:** Every image. · **Don't use when:** `next/image` outside Next (use unpic); unpic when your images aren't on a supported CDN (it degrades to a plain `<img>`).
- **Scores /5:** visual n/a · interaction n/a · a11y 4 · engineering 5 · maintenance 5 (next) / 4 (unpic) · docs 5 · customization 4 · perf 5 · stability 5 · originality 3
- **Evidence:** `next` 16.3.4 (2026-08-31) · `@unpic/react` 1.0.2 (2025-12-08), 1,299,485 wk npm, ★2,083 (`ascorbic/unpic-img`), last push 2026-09-10, MIT per npm
- **Vibecode risk:** low.
- **Link:** https://unpic.pics · https://nextjs.org/docs/app/api-reference/components/image

### Mux Player — `strong`
- **What:** A drop-in `<mux-player>` web component (plus a React wrapper) built on Media Chrome, with HLS, adaptive playback, thumbnail previews, chapters, and QoE analytics wired in.
- **Verdict:** The best "looks finished immediately" player, and the honest framing is that it's Media Chrome with a skin and a business model. If your video lives at Mux, this is a clear yes — you get engagement/QoE data and a `playback-id` attribute is the whole integration. If your video doesn't live at Mux, you're inheriting a vendor-shaped component for a skin you could build on Media Chrome directly. The skin itself is tasteful — restrained, dark, not over-rounded — but it is a *recognizable* skin, and Mux is popular enough that people notice.
- **Use when:** You're a Mux customer, or you're evaluating being one. · **Don't use when:** Self-hosted files or another CDN — use Media Chrome + hls.js.
- **Scores /5:** visual 4 · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 4 · stability 5 · originality 3
- **Evidence:** `@mux/mux-player-react` 3.13.3 · 1,858,722 wk npm · `muxinc/elements` ★363, last push 2026-09-09 · MIT · built on Media Chrome
- **Looked at:** https://www.mux.com/player — warm bone-white ground (~#e8e6e0) with thin hairline grid rules running full-bleed, black geometric-grotesk display type, and a single saturated purple pill CTA. The player is shown as a rounded-rect frame with a 1px purple border under a black code window containing three attributes of markup. Confident, restrained, and notably *not* a dark-mode SaaS page — it looks like a company with a design team, which is a reasonable proxy for the component.
- **Vibecode risk:** medium — the default Mux skin is identifiable to anyone who watches developer-product video.
- **Link:** https://www.mux.com/player

### deck.gl — `strong`
- **What:** A WebGL/WebGPU layer framework for large-scale geospatial visualization — scatterplot, hexagon, arc, trip, heatmap, 3D tiles, point clouds — that composes over MapLibre or Mapbox.
- **Verdict:** Nothing else renders millions of geo features at 60fps with this little effort, and 9.4 with 285 contributors under MIT is a genuinely healthy project. The design problem is that deck.gl has a *look*, and it is the most imitated look in data visualization: dark navy carto basemap, neon arcs, glowing hexagon columns, a viridis or inferno ramp. I counted it across the majority of the official gallery. Used unthinkingly it signals "we have a lot of data" rather than communicating anything, and the 3D hexagon column layer in particular occludes its own data. Use the layers; supply your own basemap and palette.
- **Use when:** >100k geo features, or genuine 3D geospatial. · **Don't use when:** A few hundred markers — that's a MapLibre symbol layer and a fraction of the bundle.
- **Scores /5:** visual 3 · interaction 4 · a11y 2 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 4 · originality 4
- **Evidence:** ★14,571 · v9.4.0 · last push 2026-09-09 · 202,573 wk npm · 285 contributors · MIT · originated at Uber, now vis.gl / OpenJS
- **Looked at:** https://deck.gl/examples — a 4-across gallery where roughly two thirds of tiles share one palette: `#0e1e2b`-ish navy basemap, then saturated orange/red heatmaps, cyan hexagon columns, magenta great-circle arcs. Two outliers stand out precisely because they break it — a point cloud rendered as black stipple on warm beige, and a white-ground great-circle map with pastel arcs. Both look better than the neon ones, which tells you the framework isn't the problem.
- **Vibecode risk:** **high** — dark-carto + neon-arc is a recognized genre. Change the basemap and the ramp.
- **Link:** https://deck.gl

### react-map-gl — `strong`
- **What:** React bindings for MapLibre GL JS **or** Mapbox GL JS, with a declarative `<Map>`, `<Marker>`, `<Popup>`, `<Source>`/`<Layer>` component model and controlled/uncontrolled view state.
- **Verdict:** The right default for React map work, and v8 finally makes the MapLibre path first-class rather than a Mapbox afterthought — you import from `react-map-gl/maplibre` and never touch a Mapbox token. It stays admirably thin: it does not wrap the style spec or invent its own layer API, so you can drop to the raw map instance whenever you need to and every MapLibre doc still applies. It also composes cleanly with deck.gl since both are vis.gl. Note the GitHub license field reads NOASSERTION but the LICENSE file is plain MIT.
- **Use when:** React + MapLibre/Mapbox. · **Don't use when:** Non-React, or you want zero abstraction — MapLibre's imperative API is not hard.
- **Scores /5:** visual n/a · interaction 5 · a11y 3 · engineering 5 · maintenance 4 · docs 4 · customization 5 · perf 5 · stability 4 · originality 2
- **Evidence:** ★8,496 · v8.1.3 · last push 2026-09-03 · 1,840,252 wk npm · MIT (LICENSE file; GitHub shows NOASSERTION) · vis.gl
- **Vibecode risk:** low — contributes no pixels.
- **Link:** https://visgl.github.io/react-map-gl/

### ThumbHash / BlurHash — `strong`
- **What:** Compact placeholder encodings. BlurHash packs a blurred preview into ~20–30 ASCII chars; ThumbHash does the same in ~25 bytes with better color fidelity and, critically, **alpha channel support**.
- **Verdict:** ThumbHash is strictly better than BlurHash on every axis that matters — sharper reconstruction, correct handling of images with transparency, better with high-contrast subjects — and it's from Evan Wallace, who also wrote BlurHash-adjacent tooling and esbuild. Yet BlurHash still pulls 1.2M weekly to ThumbHash's 242k, purely on being three years earlier and better known. Both are frozen by design (a hash format shouldn't churn): ThumbHash's only npm release is 0.1.1 from 2023-03-22 and BlurHash's is 2.0.5 from 2023-02-17. Stale npm dates here are not a red flag. The real advice: use one of them and stop shipping gray boxes — a placeholder that matches the image's actual color makes a slow gallery feel fast in a way a spinner never does.
- **Use when:** Any image grid, gallery, or above-the-fold hero. · **Don't use when:** You control the CDN and can serve a real 20px LQIP — that's marginally better and needs no library.
- **Scores /5:** visual 4 · interaction n/a · a11y n/a · engineering 5 · maintenance 3 (frozen) · docs 4 · customization 3 · perf 5 · stability 5 · originality 5
- **Evidence:** ThumbHash ★4,206, 0.1.1 (2023-03-22), 241,941 wk npm, MIT · BlurHash ★17,069, 2.0.5 (2023-02-17), 1,214,784 wk npm, MIT
- **Vibecode risk:** low.
- **Link:** https://evanw.github.io/thumbhash/

### Paper Design shaders — `strong`
- **What:** `@paper-design/shaders-react` — a zero-dependency WebGL shader collection (no three.js) from the Paper design-tool team: mesh gradients, grain gradients, dithering, halftone, warp, swirl, spiral, waves, dot grid, dot orbit, neuro noise, voronoi, godrays, plus a set of image-filter shaders.
- **Verdict:** The best-engineered thing in this lane and I want to be precise about why it's `strong` and not `essential`: the code is excellent, the API is clean React props, there's no three.js in the bundle, and the *breadth* is far wider than its reputation — the 2026 site now leads with **image filters** (paper texture, fluted glass, water, dithering, halftone, chromatic aberration) applied to real photography, which is a genuinely interesting and underused direction. The problem is entirely social: this is the fastest path to the generated look, and adoption is enormous — weekly downloads climbed from ~292k to ~664k over the last quarter — on a package still numbered **0.0.80**. That version number against half a million weekly installs is a real stability caveat, not a nitpick.
- **Use when:** Subtle texture (`dotGrid`, `paperTexture`, `dither`) in your own brand colors, or image filters on photography you own. · **Don't use when:** You want a full-bleed animated hero gradient — that is precisely the tell.
- **Scores /5:** visual 4 · interaction 3 · a11y n/a · engineering 5 · maintenance 4 · docs 3 · customization 5 · perf 4 · stability 2 (0.0.x) · originality 4
- **Evidence:** ★3,442 · `@paper-design/shaders-react` 0.0.80 · last push 2026-09-04 · ~609,425 wk npm (quarterly trend 292k→664k) · 16 contributors · Apache-2.0
- **Looked at:** https://shaders.paper.design — pure-black gallery, thin light sans, four-across grid of live shader tiles with lowercase captions. The top section is image filters on the same photograph of orange cosmos flowers: paper texture (a convincing rough-stock grain), fluted glass (vertical ribbed refraction), water, and image dithering (halftone dots on acid green). Further down, the generative set: `warp` and `godrays` are unmistakably violet-on-black — the exact palette this file warns about — while `dotGrid` (a plain white dot lattice), `waves` (yellow chevrons), and `swirl` (a pink/maroon pinwheel) are legitimately useful non-generic textures. The library contains both the poison and the antidote; which one you get is a props decision.
- **Vibecode risk:** **high** in default configuration (mesh gradient, violet, full-bleed). Low if you use the texture and image-filter shaders in your own palette.
- **Link:** https://shaders.paper.design

### wavesurfer.js — `strong`
- **What:** Audio waveform visualization and playback — peaks rendering, regions, spectrogram, timeline, zoom, multi-track, all canvas-based.
- **Verdict:** Essentially unopposed for waveform UI, and unlike most of the "only option" libraries in this file it is actually alive: v7.12.11 published 2026-07-17, repo pushed 2026-09-03, 10.4k stars. The v7 rewrite dropped the old plugin cruft for a clean TypeScript core. Its default rendering — solid bars, one fill color, one progress color — is plain but *neutral*, which is the right posture; every distinctive audio UI you've seen (Soundcloud-alikes, podcast editors, transcription tools) is wavesurfer with the bar width, gap, radius, and colors tuned. Budget time for peak pre-computation on long files; decoding a 90-minute podcast client-side is not free.
- **Use when:** Any audio scrubbing, region selection, transcript-synced playback, or podcast/voice UI. · **Don't use when:** You just need play/pause on a short clip — that's Media Chrome's audio elements and no canvas.
- **Scores /5:** visual 3 · interaction 5 · a11y 2 · engineering 4 · maintenance 5 · docs 4 · customization 5 · perf 3 · stability 4 · originality 4
- **Evidence:** ★10,407 · v7.12.11 2026-07-17 · last push 2026-09-03 · 1,133,783 wk npm · BSD-3-Clause
- **Vibecode risk:** medium — the untouched default (thin bars, `#999` fill, `#555` progress, full width) is recognizable. Set `barWidth`, `barGap`, `barRadius` and your own colors.
- **Link:** https://wavesurfer.xyz

### PhotoSwipe / yet-another-react-lightbox — `strong`
- **What:** Two lightboxes. PhotoSwipe is the framework-agnostic original — pinch-zoom, swipe-to-dismiss, correct focus trapping. YARL is the modern React-native equivalent with plugins for video, captions, thumbnails, zoom, slideshow.
- **Verdict:** Lightboxes are a solved problem and the correct move is to pick a solved one. PhotoSwipe's touch behavior is still the best in the field after fifteen years — the pinch-zoom and the drag-down-to-close feel like the iOS Photos app rather than a web widget — and it has essentially no visual opinion beyond a dark scrim and thin white chrome. Its maintenance is *slow* rather than dead (5.4.4 from 2024-05, repo pushed 2025-12, a "v6 feedback" link in the nav). YARL is the one I'd hand an agent working in React: 1 open issue, last push 2026-09-08, plugin-based, TypeScript-first, and boringly correct. Avoid Fancybox — it's commercially licensed for most real use.
- **Use when:** Image galleries, product photography, docs screenshots. · **Don't use when:** A single image — a `<dialog>` and a `<img>` is 20 lines.
- **Scores /5:** visual 4 · interaction 5 (PhotoSwipe touch) · a11y 4 · engineering 4 · maintenance 3 (PhotoSwipe) / 5 (YARL) · docs 4 · customization 4 · perf 5 · stability 5 · originality 3
- **Evidence:** PhotoSwipe ★25,248, 5.4.4 (2024-05-24), 493,223 wk npm, last push 2025-12-04, MIT · YARL ★1,310, 3.32.2, 521,213 wk npm, last push 2026-09-08, **1 open issue**, MIT
- **Looked at:** https://photoswipe.com — white ground, black Inter-ish display type with the version number set as a small superscript next to the wordmark, one blue text link, then a gapless masonry grid of Luca Bravo landscape photography running edge to edge with a photographer credit in 12px gray. No cards, no shadows, no gradient. A docs page that trusts the images to do the work, which is the correct instinct for a lightbox.
- **Vibecode risk:** low — dark scrim and thin white chrome is the neutral convention, not a signature.
- **Link:** https://photoswipe.com · https://yet-another-react-lightbox.com

### OpenFreeMap — `situational`
- **What:** A free, unmetered, key-less public tile service (plus fully open self-hosting instructions) serving OSM vector tiles in Liberty, Bright and Positron styles, funded by donations.
- **Verdict:** Remarkable as a public good and genuinely useful for prototypes, side projects, and internal tools: no registration, no API key, no cookies, no view limits, weekly full-planet downloads in Btrfs and MBTiles. The self-hosting story is the real value — the entire production setup is open, with no open-core carve-out. But be clear-eyed about the risk profile for anything that matters: **9 contributors** and a donation-funded public instance is a bus factor of approximately one. If you depend on it commercially, self-host or mirror the planet file. And its default Liberty style is a navigation map, not a product basemap.
- **Use when:** Prototypes, internal tools, or as a self-hosted tile source you operate. · **Don't use when:** A revenue-critical production surface depends on someone else's donation budget staying solvent.
- **Scores /5:** visual 2 (default Liberty) · interaction n/a · a11y n/a · engineering 4 · maintenance 3 · docs 4 · customization 4 · perf 4 · stability 2 · originality 5
- **Evidence:** ★5,957 · created 2023-12-13 · last push 2026-09-09 · **9 contributors** · no LICENSE file at repo root (unverified licensing for the tile service itself; OSM data is ODbL)
- **Looked at:** https://openfreemap.org — a deliberately plain single-column page: an AI-generated 3D map emoji as the logo, "OpenFreeMap" in a friendly humanist sans, three social icons, then straight into prose. Honest and readable. The live map at the fold is stock Liberty — cream landmass, orange-cased motorways, yellow secondaries, gray building fills, every town label rendered — i.e. exactly the OSM look that will fight any product UI you put around it. Fine as a demo of the tiles; do not ship it as your basemap.
- **Vibecode risk:** medium — unmodified Liberty reads as "grabbed the first free tile source."
- **Link:** https://openfreemap.org

### Mapbox GL JS — `situational`
- **What:** The proprietary commercial map renderer that MapLibre forked away from at v2.
- **Verdict:** Technically excellent and, on a couple of axes (their newer 3D standard style, globe/terrain polish, first-party traffic and nav data), still ahead of MapLibre. The license is the whole decision and it should be read literally: the LICENSE.txt states the software is licensed under the **Mapbox TOS for use only with the relevant Mapbox products**, that the license **terminates automatically if you no longer have a Mapbox account in good standing**, and that modifying the billing/telemetry code is unauthorized while the SDK "sends limited de-identified location and usage data." npm reports the license as "SEE LICENSE IN LICENSE.txt" — it is not open source in any sense. Pick this only if you are deliberately buying Mapbox as a platform.
- **Use when:** You're a paying Mapbox customer and want their newest styles and data. · **Don't use when:** Anything else. `react-map-gl` makes the MapLibre swap nearly free, so the escape hatch is cheap — take it up front.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 5 · stability 5 · originality 3
- **Evidence:** ★12,404 · v3.30.0 · last push 2026-09-09 · 3,593,913 wk npm · **proprietary (Mapbox TOS)** · single vendor
- **Vibecode risk:** medium — the stock Streets style is as recognizable as any default, and everyone recognizes it.
- **Link:** https://docs.mapbox.com/mapbox-gl-js/

### Spline — `situational`
- **What:** A browser-based 3D design tool with a web runtime (`@splinetool/react-spline`) that embeds published scenes; now heavily repositioned around AI generation.
- **Verdict:** A legitimately good design tool — designers who cannot write GLSL can produce real 3D scenes in it, which is a genuine capability gain. Two hard caveats. First, weight: you're loading a runtime plus a scene file, and unlike a hand-built R3F scene you have limited control over what's inside it; on a marketing page it is often the largest asset. Second, and worse for this corpus: **Spline has a house style you cannot hide.** Glossy rounded-cube blobs, soft subsurface-ish gradients, a perspective grid floor, pastel-on-black. Anyone who has seen three Spline landing pages recognizes the fourth instantly. If a designer is authoring something bespoke in it, fine. If an agent is embedding a community scene, that is a tell.
- **Use when:** A designer authored a specific scene that carries real meaning, and you've measured the payload. · **Don't use when:** You want "a 3D thing" on a hero. Use a rendered video or a static image.
- **Scores /5:** visual 4 · interaction 4 · a11y 1 · engineering 3 · maintenance 4 · docs 3 · customization 3 · perf 2 · stability 3 · originality 3
- **Evidence:** `@splinetool/react-spline` 4.1.0 (2025-07-15) · 156,735 wk npm · proprietary tool with a free tier · closed source runtime
- **Looked at:** https://spline.design — pure black, with a dozen rounded-cube and rounded-cone blobs in magenta, cobalt, amber and emerald floating over a faint perspective grid floor, plus a cartoon bunny. The headline "Make anything 3D" sits over an AI prompt box ("Describe what you want to create…") with a `+` and a submit arrow — the product has clearly pivoted to generation. It is well-executed and it is *completely* identifiable: I could name the tool from the blob shading alone.
- **Vibecode risk:** **high** — the strongest house style of anything in this file.
- **Link:** https://spline.design

### Unicorn Studio — `situational`
- **What:** A commercial visual canvas for authoring WebGL shader / media / 3D scenes, exported as an embeddable web component (`unicornstudio-react` on npm).
- **Verdict:** The authoring UX is the best in this lane — real-time shader composition without writing GLSL, with proper layering and interaction bindings — and the exported runtime is competent. My problem is not the tool, it is what it makes easy. Its own homepage is a textbook of the exact stack an agent over-produces, and a team using Unicorn without a strong art director will land on the same aurora. Treat it as a designer's instrument, never as an agent's default. Verified adoption is unclear: their logo bar claims Shopify, LiveKit, Supabase, Polymarket, WorkOS, Semrush, Metalab and Snapchat, which is a marketing claim on their own page and I could not independently verify any of it.
- **Use when:** A designer is authoring one deliberate hero moment and will iterate on it. · **Don't use when:** An agent is picking a background.
- **Scores /5:** visual 4 · interaction 4 · a11y 1 · engineering 4 · maintenance 4 · docs 3 · customization 4 · perf 3 · stability 3 · originality 3
- **Evidence:** `unicornstudio-react` 72,272 wk npm · closed-source SaaS · pricing tiers unverified (the pricing page returned no readable content to my fetch)
- **Looked at:** https://www.unicorn.studio — near-black page, a violet/indigo aurora shader occupying the bottom two thirds of the hero with two lens-flare starbursts, and "Craft Interactive Graphics that **Ship**" mixing a grotesk with a Didone serif on the final word. A violet "Sign up" pill in the nav, an outlined "Start creating" CTA sitting directly on top of the brightest part of the gradient. At 390px it's worse: the shader canvas fills nearly the whole viewport, the subhead is gray-on-violet at a contrast I would fail in review, and the lens flare sits *behind* the CTA. This is the vibecode stack, shipped by the company that sells it — which is either honest self-demonstration or the clearest possible warning, depending on your mood.
- **Vibecode risk:** **high** — this is the reference implementation of the look.
- **Link:** https://www.unicorn.studio

### cobe — `situational`
- **What:** A ~5KB WebGL globe (Vercel's Shu Ding) — dotted sphere, marker points, spring-based rotation and drag.
- **Verdict:** A perfect small tool that got over-applied. The engineering is lovely: 5KB, no three.js, spring physics, and it renders a dotted globe with marker pins that genuinely looks good. It also spread so far through Vercel-adjacent templates and every "bento grid" component kit that a dotted rotating globe now reads as a template component rather than as information. It's defensible when the markers are *real* — actual customer locations, actual edge PoPs, actual live events. It is decoration otherwise. Alive: 2.0.1 published 2026-03-19, repo pushed 2026-07-18.
- **Use when:** The globe displays real geographic data, and small. · **Don't use when:** It's a bento-box tile that says "global."
- **Scores /5:** visual 4 · interaction 4 · a11y 1 · engineering 5 · maintenance 4 · docs 3 · customization 3 · perf 5 · stability 4 · originality 3
- **Evidence:** ★5,810 · 2.0.1 (2026-03-19) · last push 2026-07-18 · 368,398 wk npm · MIT
- **Vibecode risk:** **high** — a dotted rotating globe in a bento grid is a recognized template signature.
- **Link:** https://cobe.vercel.app

### Vidstack — `experimental`
- **What:** A player library with React components and hooks plus headless primitives, positioned between Media Chrome (parts) and Video.js (product).
- **Verdict:** Good ideas — the hooks API is nicer than anything comparable and the default skins are more attractive than Media Chrome's — but **the npm state is a trap an agent will walk straight into**. `@vidstack/react@latest` resolves to **0.6.15, published 2024-04-19**; the actual current release is **1.15.6 under the `next` dist-tag, published 2026-06-10**. Meanwhile the marketing site has been showing a "Player: 1.0-RC" banner for a long stretch. So `npm i @vidstack/react` installs a two-and-a-half-year-old build, and the 268k weekly downloads are split across two very different libraries. That's a maintenance-signalling failure serious enough to keep it out of core infrastructure regardless of code quality.
- **Use when:** You want its hooks specifically, and you pin `@next` explicitly and knowingly. · **Don't use when:** Anything load-bearing. Media Chrome does the same job with an honest release history.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 2 · docs 4 · customization 4 · perf 4 · stability 2 · originality 4
- **Evidence:** ★3,670 · **`latest` = 0.6.15 (2024-04-19)**, `next` = 1.15.6 (2026-06-10) · last push 2026-08-21 · 268,303 wk npm · 46 contributors · MIT
- **Looked at:** https://vidstack.io — pure `#000` page, a "Player: 1.0-RC / Learn more" strip pinned at the very top, "Build your player." in tight Inter-ish bold with the final word fading to gray, two buttons (filled white / outlined) sitting on a soft radial glow, and a row of six grayed framework logos under "WORKS SEAMLESSLY WITH". Competent and completely generic dark-docs — nothing here distinguishes it from thirty other library sites, and the RC banner has been true for long enough that it now reads as staleness rather than momentum.
- **Vibecode risk:** low (the library) — but the docs site is itself a good example of the generic dark-SaaS default.
- **Link:** https://vidstack.io

### Leaflet — `situational`
- **What:** The 15-year-old lightweight raster-tile map library. 42KB, no WebGL, enormous plugin ecosystem.
- **Verdict:** The reputation no longer matches the release history and an agent should know this before recommending it. **Leaflet's last stable npm release is 1.9.4, published 2023-05-18** — over three years ago. `2.0.0-alpha` landed 2025-05-18 and `2.0.0-alpha.1` on 2025-08-16, and it has sat in alpha since. The repo *is* actively pushed (2026-09-09, 382 contributors), so this is a stalled release train rather than an abandoned project — but "45.6k stars and 6.5M weekly downloads" is measuring 2019's decision, not 2026's. On the merits: it is raster-only, so no vector styling, no rotation/pitch, no runtime restyling, no globe — which means the *entire basemap-styling discipline described above is unavailable to you*. That alone disqualifies it for most product UI.
- **Use when:** A simple pin-on-a-map in a page that can't afford WebGL, or you need a specific Leaflet plugin that has no MapLibre equivalent. · **Don't use when:** The map is a real product surface.
- **Scores /5:** visual 2 · interaction 3 · a11y 3 · engineering 4 · maintenance 2 · docs 4 · customization 2 · perf 3 · stability 5 · originality 2
- **Evidence:** ★45,593 · **latest 1.9.4 published 2023-05-18**; 2.0.0-alpha.1 2025-08-16 · last push 2026-09-09 · 6,505,959 wk npm · 382 contributors · BSD-2-Clause · `react-leaflet` 5.0.0 (2024-12-14), 3,316,152 wk npm
- **Vibecode risk:** medium — default Leaflet is a raw OSM raster tile with a blue teardrop marker and a `+`/`−` box in the corner, which is the most dated map look on the web.
- **Link:** https://leafletjs.com

### Swiper — `situational`
- **What:** The 41.9k-star carousel/slider with modules for coverflow, cube, parallax, virtual slides, thumbs, free mode and more.
- **Verdict:** Enormously capable and genuinely maintained (v14.2.0, pushed 2026-09-08) — if you need coverflow, virtualized slides, or nested loops, Swiper is the only free thing that has them. But the project's incentives are worth saying out loud. Its demos page is framed by a sponsor sidebar that is **overwhelmingly online-casino and gambling operators**, and the page leads with paid upsells (PaneFlow, UI Initiative Premium, "Studio", a "Premium" nav item) before it shows you the default demo. That's a legitimate way to fund OSS, and it also tells you where the project's energy goes: toward a template marketplace, not toward staying a lean primitive. The library ships its own CSS and its own arrow/dot styling, which you will spend time undoing.
- **Use when:** You need an exotic slider mode Embla doesn't have. · **Don't use when:** A standard carousel — Embla is smaller, styleless and better-behaved.
- **Scores /5:** visual 2 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 4 · customization 3 · perf 3 · stability 4 · originality 3
- **Evidence:** ★41,901 · v14.2.0 · last push 2026-09-08 · 3,602,555 wk npm · MIT
- **Looked at:** https://swiperjs.com/demos — dark page over a blue caustic-light photo background, a floating pill nav with the version number inline, and a left sidebar whose top third is a 5×4 grid of sponsor logos: Casino Wise, PGSlot, "nonukcasino," Casino Hunter, Royal Master, and similar. Below that, the demo list. The first two entries on the page are ads for paid products. The stock Swiper arrow/dot styling (`#007aff` blue) appears throughout.
- **Vibecode risk:** **high** — Swiper's default blue arrows and bullet pagination are among the most recognizable widget defaults on the web.
- **Link:** https://swiperjs.com

## Rejected / avoid

- **Vanta.js** — `avoid`. The clearest dead-library case in this file. Last push **2024-03-03**; the install snippet on its own homepage still loads **`three.r134.min.js`**, a three.js build from late 2021, which means anyone using it is pinning a five-year-old WebGL dependency. And the perf claim is not theoretical: the FPS counter on their own BIRDS demo read **5.1 fps** in my headless capture at 1440px. The site UI is 2019-vintage (flat `#3498db` sliders, a "instructions for Strikingly.com" link). Every effect in the catalog — birds, waves, nets, fog, halo — is a first-order vibecode tell. There is no version of this that improves a product.
- **keen-slider** — `avoid`. 5k stars, and the last npm publish was **2023-07-05**. The repo saw a push in 2026-01 but nothing has shipped in three years. Embla does the identical job with 29M weekly downloads and a live release train.
- **Splide** — `avoid`. `@splidejs/splide` last published **2022-11-09**; the repo's last push was **2024-07-08**. The unscoped `splide` name on npm is a `0.0.1-security` placeholder. Dead, and confusable.
- **react-slick** — `avoid`. A React port of a jQuery-era slider. Ships two stylesheets, its own arrow glyphs, and its own dot markup, all of which you must override; the accessibility story is poor and the dependency (`slick-carousel`) is a museum piece.
- **plaiceholder** — `avoid`. 2.3k stars and 81k weekly downloads flowing entirely from stale tutorials; last push **2023-05-24**. ThumbHash plus a five-line component replaces it.
- **Video.js** — `reference-only`. 39.9k stars, still maintained (pushed 2026-08-03), and architecturally from a different era: a skin-first plugin system where you fight a large default stylesheet to get a modern look. Right answer only for legacy enterprise video stacks or an existing VJS plugin dependency. Media Chrome is what you'd build today.
- **Plyr** — `reference-only`. 30k stars and genuinely still shipping (3.8.4, 2026-01-03), but it has a **935-issue backlog** and, more to the point, a visual identity frozen in 2018: a large `#00b3ff` cyan circular play button dead-center, cyan volume fill, a translucent white control bar. That button is on tens of thousands of sites and is instantly recognizable. Its own homepage still says "post it on X 👍" next to a Twitter *bird* icon. Study the accessibility work; don't ship the skin.
- **Fancybox** — `avoid` for commercial work. Commercially licensed for most business use. PhotoSwipe and YARL are MIT and better-behaved.
- **Three.js "starter" shader-background packages generally** — `avoid`. Any npm package whose selling point is "animated gradient background in one line" is selling you the tell.
- **Felt** — `reference-only`, and *do* study it. Not a library: a commercial GIS product, and the best worked example in this file of map chrome done right. Olive-green and terracotta brand, a condensed serif wordmark, and — the part to copy — a single near-black rounded floating toolbar plus a plain white legend card, so that the orange/purple/green data points are the only saturated things on screen. If an agent needs a reference for "what should my map UI look like," it is this and not Google Maps.

## What surprised me

- **`@vidstack/react@latest` installs a build from April 2024.** The real library lives under the `next` tag at 1.15.6 (June 2026). Two and a half years of divergence hidden behind a dist-tag, while the docs site advertises "1.0-RC." An agent typing `npm i @vidstack/react` gets the wrong library and no warning.
- **Leaflet has not cut a stable release since May 2023.** 45.6k stars, 6.5M weekly downloads, daily repo activity, 382 contributors — and `2.0.0-alpha.1` has been the newest thing on npm since August 2025. The most-recommended map library on the internet is running on a three-year-old release.
- **`@paper-design/shaders-react` is doing ~500k downloads a week at version `0.0.80`.** I measured the quarterly trend climbing from ~292k to ~664k. That is Tailwind-plugin-scale adoption on a package that has not claimed a `0.1`, which is either impressive restraint or a stability warning; either way nobody seems to have noticed.
- **Paper shaders quietly pivoted toward image filters.** Their site now *leads* with paper-texture, fluted-glass, water and dithering shaders applied to real photography, not with mesh gradients. It's the most interesting under-used idea in the category and it's the opposite of the generated look, because the content underneath is yours.
- **Swiper is funded by online casinos.** The sponsor grid on swiperjs.com/demos is largely gambling operators, and the demos page opens with two paid-product ads before showing a carousel. It's honest OSS funding, and it explains why Swiper keeps growing plugin surface instead of getting leaner.
- **Vanta's own demo runs at 5.1fps.** Not an inference — the FPS readout is printed in the corner of their homepage and I captured it. Paired with a `three.r134` script tag from 2021, that's the whole argument against decorative WebGL in one screenshot.
- **Firefox still ships WebGPU disabled by default in 2026,** despite 87.35% global support on caniuse. The number looks like broad availability; one major engine is still opt-in, which is why three.js r186 keeps WebGL first-class with no deprecation date.

## Open questions

- **Protomaps demo-bucket reliability.** `maps.protomaps.com` returned `Bad response code: 404` for `demo-bucket.protomaps.com/v4.pmtiles` during my capture, so I could not judge the rendered `light`/`grayscale` cartography live. Would be settled by loading a self-hosted extract and comparing flavors side by side against CARTO Positron.
- **OpenFreeMap's licensing and funding runway.** No LICENSE file at the repo root, and the public instance is donation-funded with 9 contributors. Would be settled by a published license, a stated funding position, and an uptime history.
- **Unicorn Studio's customer claims.** Shopify, LiveKit, Supabase, Polymarket, WorkOS, Semrush, Metalab and Snapchat appear in their logo bar; I could not verify a single one and their pricing page returned no readable content to my fetch. Would be settled by finding a Unicorn export on any of those companies' live sites.
- **Embla v9's breaking surface.** v9 has been at rc03 since 2026-08-21 with 8.6.0 still the `latest` tag. Whether the v8→v9 migration is trivial or meaningful for the many component kits that wrap it is unresolved; the changelog would settle it.
- **Real-world QoE cost of shader heroes.** I judged mobile shader impact from first principles and from Vanta's own FPS counter, not from field data. Would be settled by CrUX INP/LCP comparisons on paired landing pages with and without a full-viewport shader.
- **Mux Player vs Media Chrome bundle delta.** I did not measure shipped bytes for either. Would be settled by a bundlephobia/real-build comparison of a minimal branded player built each way.
