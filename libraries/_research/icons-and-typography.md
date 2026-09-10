# Icon systems and typography resources

**Evaluated:** 2026-09 · **Researcher note:** Icons have collapsed into a monoculture — Feather's 24px/2px/round-cap DNA is now the house style of Lucide, Tabler, Iconoir and half of Iconify, and it is the single loudest "AI built this" signal in a UI. The genuinely differentiated work is in multi-weight families (Phosphor), variable-axis engineering (Material Symbols' Grade axis), and separately-drawn optical sizes (Heroicons Micro). On type, the free tier got good enough that paying is now a taste decision, not a quality one — but Inter and Geist have become tells, and the interesting move is a free face nobody defaults to (Switzer, Mona Sans, Instrument Serif) with tabular numerals turned on.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Lucide | `essential` | Best-maintained, best-covered stroke set; also the most recognizable default in the world | high |
| Phosphor | `essential` | Six real weights and flat terminals — the only free set that can carry a brand on its own | low |
| Iconify | `essential` | Infrastructure, not a set: 200k+ icons from 180+ collections behind one API and tree-shakeable components | n/a |
| Fontsource + `next/font` | `essential` | The correct way to ship OFL type: self-hosted, subset, preloaded, zero third-party request | n/a |
| Inter | `essential` | Still the most engineered free UI face; right when you need it invisible, a tell when you reach for it by reflex | high |
| Material Symbols | `strong` | Best engineering in icons (Fill/Weight/Grade/Optical-Size axes); unmistakably Google-shaped | high |
| Untitled UI Icons | `strong` | 1,100 free, systematically named, lighter stroke than Lucide — the free set that looks most expensive | medium |
| Tabler | `strong` | 6,184 icons and weekly releases; coverage is the reason to pick it, not the drawing | high |
| Mona Sans / Hubot Sans | `strong` | Weight + width + slant axes, OFL, industrial-grotesque character Inter deliberately lacks | low |
| Fontshare originals (Switzer / General Sans / Satoshi) | `strong` | Commercial-grade drawing for $0 — but a proprietary EULA that blocks self-hosting | low |
| IBM Plex | `strong` | Sans + Serif + Mono + Condensed as one OFL system; still shipping in 2026 | medium |
| Editorial serifs (Instrument Serif, Fraunces, Source Serif, Newsreader) | `strong` | The fastest way to stop looking like a template; use for display, not body | low |
| Solar | `situational` | 7,401 icons × 5 variants incl. Bold and Broken; warm consumer geometry; CC BY attribution required | low |
| Heroicons | `situational` | Only 316 icons, but four *separately drawn* sizes — the right call if you live in Tailwind | high |
| Radix Icons | `situational` | 15×15 pixel-snapped, design-tool vocabulary; wrong at 24px, low maintenance | low |
| Geist | `situational` | Clean Univers-derived grotesque, OFL; now the loudest signal that a product is a Vercel-stack demo | high |
| Berkeley Mono | `situational` | The most opinionated mono in the category; license is narrow and expensive per seat | low |
| Commissioned faces (Söhne / ABC Diatype / GT America) | `situational` | Buys you the one thing free type can't: nobody else has it. Priced per axis, per usage | low |
| lucide-animated (pqoqubbw) | `experimental` | MIT animated Lucide via Motion, copied in per-icon so you own the timing | medium |
| Departure Mono | `experimental` | A bitmap mono with real personality; accent-only, never body | low |
| Remix Icon | `situational` | Good drawing, but it silently left Apache-2.0 for a custom license in Jan 2026 | medium |
| Iconoir | `situational` | 1,671 MIT icons, active, competent — but no reason to pick it over Lucide or Phosphor | high |
| Hugeicons | `avoid` | "60,000+ icons" is ~6,700 × 9 styles, and 8 of the 9 are paywalled | high |
| Font Awesome | `avoid` | Free icons are CC BY 4.0 — attribution required — and the drawing is 2014 | high |
| Feather | `reference-only` | The ancestor of the entire monoculture. Last push 2025-03. Study it, don't install it | high |
| SF Symbols | `reference-only` | Licensed for Apple-platform UI only. Not usable on the web, ever | n/a |
| react-useanimations | `avoid` | Last push 2024-06 | medium |

## Recommendations by need
- **Default choice (icons):** Lucide — weekly releases, 100 contributors, 87M weekly npm, shadcn/ui's default import. Take it, then change *something* (stroke to 1.5, size to 18) so it isn't the stock look.
- **Default choice (type):** a self-hosted OFL variable face via `next/font/local` or Fontsource, with `font-variant-numeric: tabular-nums` on every number in a table or metric.
- **Best engineering:** Material Symbols. Four variable axes including Grade, which thickens strokes for dark mode *without* changing the icon's advance width — no other free set solves that.
- **Best visual quality out of the box:** Phosphor for icons; Switzer or Mona Sans for type.
- **Best accessibility:** Heroicons' four separately-drawn sizes (24 Outline, 24 Solid, 20 Mini, 16 Micro) — a redrawn 16px glyph beats a scaled 24px one at every zoom level. For type, Inter's ink traps and disambiguated I/l/1.
- **Most customizable / least house-style:** Iconify — mix collections per-icon without shipping six packages. For type, Fraunces (9 axes including `SOFT` and `WONK`).
- **Lightest:** Radix Icons (~318 icons, 1px paths, no runtime). For type, any single variable `.woff2` — one file replaces 9 static weights.
- **Promising newcomer:** lucide-animated — MIT, 8k stars, per-icon `shadcn add` so the Motion timing is yours to edit.
- **Premium/paid worth it:** Berkeley Mono if a terminal-adjacent product *is* the brand; a commissioned face from Klim/Dinamo/Grilli if you have a real design team. Streamline and Nucleo are not worth it for product UI — you are buying illustration breadth you won't use.

## Practical notes (loading, numerals, licensing)

**Loading.** Self-host. Google Fonts' CDN adds a third-party DNS + TLS round trip, is a GDPR liability in the EU, and cannot be preloaded reliably. In Next.js use `next/font/google` or `next/font/local` — it downloads at build time, self-hosts, and injects a matched `size-adjust`/`ascent-override` fallback so there is zero layout shift. Outside Next, Fontsource (2,100 families, MIT tooling, 3.4M weekly downloads for `@fontsource-variable/inter` alone) gives you the same files over npm. Rules: one variable `.woff2` per family, `font-display: swap`, `<link rel="preload" as="font" crossorigin>` on the one face above the fold, and subset to `latin` unless you actually ship other scripts.

**Numerals — the detail that separates product UI from a demo.** Proportional numerals make table columns and live-updating counters jitter. Turn on `font-variant-numeric: tabular-nums` (or `font-feature-settings: "tnum"`) on every table cell, timer, price ticker, and metric tile. Inter, Geist, IBM Plex, Mona Sans, Switzer, General Sans, JetBrains Mono and Source Serif all ship `tnum`. Slashed zero (`zero` / `ss01`-ish depending on face; Inter exposes it as `zero`) is worth enabling in anything showing IDs, hashes, or serial numbers. Inter also ships `cv08`-style character variants for a disambiguated capital I — use it in credential fields.

**Licensing, concretely.** OFL-1.1 (Inter, Geist, Mona/Hubot, IBM Plex, JetBrains Mono, Fraunces, Instrument Serif, Source Serif, Newsreader) lets you self-host, subset, and modify — just don't sell the font itself. Fontshare's ITF Free Font License is *not* OFL: free for commercial use, but the families are marked "Closed Source" on the site, modification is prohibited, and self-hosting as a webfont requires ITF's written consent — you're expected to use their API. Commissioned foundries (Klim, Dinamo, Grilli) price separately per axis: Klim's Söhne checkout has independent Desktop (users), Web (pageviews), App (monthly active users), Advertising (impressions), Broadcasting (production budget) and OEM (devices) tiers, so a product with a marketing site *and* an app buys two licenses and the cost scales with your success. On icons: Font Awesome Free's SVGs are CC BY 4.0 (attribution required in your product — almost nobody complies); Solar is CC BY 4.0 too; Remix Icon left Apache-2.0 for a bespoke "Remix Icon License v1.0" in January 2026; Lucide is ISC, not MIT.

## Scorecards

### Lucide — `essential`
- **What:** Community fork of Feather, 1,818 icons on a 24×24 grid at 2px stroke with round caps and joins.
- **Verdict:** The maintenance story is not close — release 1.43.0 shipped 2026-09-08, the repo was pushed the day I checked it, and ~100 contributors keep the queue moving. The drawing is disciplined: I looked at 200 glyphs at 24px and the optical centering across circle-enclosed forms (check-circle, info, alert-circle, user-circle) is consistent to the pixel, and rectangle corner radii never vary. The problem is entirely social — it is shadcn/ui's default import at 87M downloads a week, so a Lucide icon at default 2px stroke on a rounded card is now shorthand for "generated." Coverage is also mid: brand logos were spun out into an opt-in "Lab" collection, and it thins out fast in finance, medical and dev-tooling verticals.
- **Use when:** you want the safest, best-maintained baseline and will customize stroke/size. · **Don't use when:** the product's visual identity has to be legible in a screenshot, or you need >2,000 icons.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 5 · stability 5 · originality 2
- **Evidence:** ★24,438 · last release 1.43.0 (2026-09-08) · last push 2026-09-09 · 86.9M wk npm (`lucide-react`) · ~100 contributors · ISC · default icon import in shadcn/ui docs (verified)
- **Looked at:** https://lucide.dev/icons/ — the customizer panel exposes color, stroke width, size, and an "absolute stroke width" toggle (which keeps stroke constant as size scales — a genuinely thoughtful control). At 24px the grid reads evenly; at 390px the sidebar collapses cleanly. Every terminal is round, which is exactly the tell.
- **Vibecode risk:** high — the default 24/2/round configuration is the most recognizable icon look on the internet right now. Dropping stroke to 1.5 and size to 18 defuses most of it.
- **Link:** https://lucide.dev

### Phosphor — `essential`
- **What:** 9,072 icons in six weights — Thin, Light, Regular, Bold, Fill, Duotone — from a two-person studio.
- **Verdict:** The only free set where the weight axis is *drawn*, not interpolated, which means Thin at 32px and Bold at 16px are both correct rather than both approximate. Terminals are flat (butt caps), not rounded, and that alone makes it read as designed rather than generated — it also survives 16px better, because round caps eat about a pixel per terminal. Coverage is the widest of any set with this level of craft, and brand logos (apple, amazon, angular, app-store) ship in the main set instead of a side collection. The one real risk is velocity: `@phosphor-icons/react` last cut a release 2025-05-22 and the core repo was last pushed 2026-01, so it is stable-but-slow, not actively growing.
- **Use when:** the icon set is part of the brand, or you need weight as a hierarchy tool (Fill for active nav, Regular for inactive). · **Don't use when:** you need a release cadence that keeps up with new product concepts.
- **Scores /5:** visual 5 · interaction 4 · a11y 4 · engineering 4 · maintenance 3 · docs 4 · customization 5 · perf 4 · stability 4 · originality 5
- **Evidence:** ★7,454 (homepage repo) · last `@phosphor-icons/react` release v2.1.10 (2025-05-22) · last push 2026-08-26 (homepage) / 2026-01-06 (core) · 3.2M wk npm · ~10 core contributors · MIT
- **Looked at:** https://phosphoricons.com — browsing the Regular weight at 32px, the `align-*` family is the tell for grid discipline: every bar in align-center-horizontal, align-left, align-top-simple lands on the same optical axis with identical bar thickness. Warm off-white ground, acid-green notice bars, monospace body copy. The site is designed by people who look at things.
- **Vibecode risk:** low — Fill and Duotone weights in particular have no equivalent in the Feather lineage, so a Phosphor product doesn't look like anyone else's.
- **Link:** https://phosphoricons.com

### Iconify — `essential`
- **What:** An aggregator and runtime: 180+ icon collections behind one component API, with build-time tree-shaking via `unplugin-icons` or on-demand SVG via the API.
- **Verdict:** Treat this as infrastructure rather than a set. Its real value is escape hatches — when Lucide has no `siren` but Solar does and Material Symbols has a better `database`, Iconify lets you pull three glyphs from three collections without adding three dependencies, and the icons ship as inline SVG so they inherit `currentColor` and CSS transitions. The browser at icones.js.org (built by @antfu) is the best icon search on the web, full stop. The trap is that mixing collections without discipline produces a set with three stroke weights and two grids in the same navbar — that is *worse* than a monoculture, so pick one primary collection and use Iconify only for gaps.
- **Use when:** you need long-tail coverage or want to evaluate sets side by side. · **Don't use when:** the team won't enforce a primary-collection rule.
- **Scores /5:** visual n/a · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 5 · originality 4
- **Evidence:** ★6,308 · last push 2026-09-10 · 699k wk npm (`@iconify/react`) · MIT · 187 collections listed in the browser as of 2026-09
- **Looked at:** https://icones.js.org — the Solar collection page shows 7,401 icons with a variant filter row (Bold / Broken / Duotone / Linear / Outline) and a live size + color control. Sidebar counts are the most honest census of the category available: Material Symbols 15,577, Google Material Icons 10,955, Tabler 6,166, Boxicons 3,768, MingCute 3,324, Remix 3,188.
- **Vibecode risk:** n/a — it has no house style of its own, which is the point.
- **Link:** https://iconify.design

### Material Symbols — `strong`
- **What:** Google's variable icon font, 15,577 icons with four axes: Fill (0–1), Weight (100–700), Grade (−25–200), Optical Size (20–48px).
- **Verdict:** Technically the best-engineered icon system that exists, and it is not close. Grade is the axis nobody else has: it adjusts stroke thickness *without* changing the glyph's footprint, which is the correct fix for the optical illusion that makes light-on-dark strokes look thinner — dark mode gets Grade 25 and the layout doesn't move. Optical Size genuinely redraws rather than scales. The disqualifying problem is aesthetic: the shapes are Google's, and Search, Home, Menu, Settings and Favorite are so deeply memorized that a product using them reads as an Android app or a Google service. Also note the delivery: as a variable font it is one request but a large one, and per-icon SVG extraction gives up the axes.
- **Use when:** you need dark/light stroke compensation, deep coverage, or you're already in a Material system. · **Don't use when:** the product needs its own visual identity.
- **Scores /5:** visual 3 · interaction 4 · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 3 · stability 5 · originality 2
- **Evidence:** ★53,909 (`google/material-design-icons`) · last push 2026-09-04 · 409k wk npm (`material-symbols`) · Apache-2.0
- **Looked at:** https://fonts.google.com/icons — the customize panel exposes all four axes as live sliders with the Grade range labeled "−25 (low) → 200 (high emphasis)", which is the correct mental model. Grid is Google's own Material 3 chrome: pill-shaped blue Filters button, 16px-radius info cards. Note they ship separate "Arrow Back iOS" / "Arrow Forward iOS" chevrons — platform-aware in a way most sets aren't.
- **Vibecode risk:** high — but for the opposite reason to Lucide. It doesn't look AI-generated, it looks *Google-generated*.
- **Link:** https://fonts.google.com/icons

### Untitled UI Icons — `strong`
- **What:** 1,100+ free line icons (a larger paid set exists), drawn in Figma for Figma, MIT-licensed.
- **Verdict:** The free set that looks the most expensive. Stroke reads noticeably lighter than Lucide's 2px — closer to 1.67 at 24 — which is what makes it feel like a designed product rather than a component showcase, and the naming grammar is the most systematic I saw anywhere: `alarm-clock`, `alarm-clock-check`, `alarm-clock-minus`, `alarm-clock-plus`, `alarm-clock-off` is a modifier vocabulary an agent can *predict*, which matters a lot for code generation. Two honest caveats: the free tier is a funnel for a paid design system, so the site is a purchase flow, and there's no first-party React package with the reach of `lucide-react` — you're copying SVGs or wiring it through Iconify.
- **Use when:** you want a lighter, more refined line than Lucide and are willing to do your own packaging. · **Don't use when:** you need a maintained npm component library with types and tree-shaking out of the box.
- **Scores /5:** visual 5 · interaction 3 · a11y 3 · engineering 3 · maintenance 3 · docs 3 · customization 4 · perf 4 · stability 3 · originality 4
- **Evidence:** free tier 1,100+ icons, MIT, no attribution required (per untitledui.com/free-icons, 2026-09) · npm distribution and star count: unverified — no canonical public repo found
- **Looked at:** https://www.untitledui.com/free-icons — the alert family (alert-circle / alert-square / alert-triangle / alert-hexagon / alert-octagon) shows they cover container-shape variants exhaustively, which is rare. Icons sit in 1px-bordered cards with a lot of whitespace; the page chrome is a purple "Buy now" CTA and a Figma preview button — that's the marketing site, not the icons.
- **Vibecode risk:** medium — still a stroke set in the modern idiom, but the lighter weight reads distinctly different from the Lucide default.
- **Link:** https://www.untitledui.com/free-icons

### Tabler — `strong`
- **What:** 6,184 MIT icons on 24×24 at 2px stroke, outline and filled, with brand logos included.
- **Verdict:** Pick this when coverage is the constraint. It is three times Lucide's size, it ships brand marks in the main set (Facebook, LinkedIn, WhatsApp, Instagram), and it releases constantly — v3.46.0 in July, repo pushed daily. But look honestly at the grid: the person / x / check-circle / map-pin / search / settings / mail row is close to pixel-identical to Lucide's, because both descend from Feather. You are buying breadth, not a different look. The site is also a commercial funnel — a gradient "$69 for all Tabler products" bar, a newsletter modal that covers a third of the viewport, and a Streamline cross-sell panel inside the icon grid.
- **Use when:** you hit Lucide's coverage ceiling and don't want an aggregator. · **Don't use when:** you switched away from Lucide hoping for a different aesthetic — you won't get one.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 5 · originality 2
- **Evidence:** ★21,643 · last release v3.46.0 (2026-07-28) · last push 2026-09-09 · 2.8M wk npm (`@tabler/icons-react`) · ~97 contributors · MIT
- **Looked at:** https://tabler.io/icons — icons render in ~4px-radius grey tiles; the grid itself is clean, but at 1440 the newsletter modal and the Streamline "more icons" panel occupy real estate before you can see 40 glyphs.
- **Vibecode risk:** high — visually indistinguishable from Lucide to anyone who isn't measuring.
- **Link:** https://tabler.io/icons

### Heroicons — `situational`
- **What:** 316 icons from the Tailwind team in four *separately drawn* sizes: Outline 24 (1.5px), Solid 24, Mini 20, Micro 16.
- **Verdict:** The size story is the reason to care and the reason most sets are worse than they look. Micro at 16px is redrawn with fewer details, not scaled — which is why it stays legible where a scaled 24px glyph turns to mush in a dense table. The count is the problem: 316 icons is a *curated* set, and you will run out inside a real product, at which point you're mixing sets and the optical-size advantage evaporates. Maintenance has gone quiet — v2.2.0 shipped 2024-11-18, nearly 22 months ago, and only 4 issues are open, which reads as "finished" more than "abandoned" but is worth knowing before you build on it.
- **Use when:** you're on Tailwind, your icon vocabulary is small, and 16px density matters. · **Don't use when:** you need more than ~300 concepts or any brand marks.
- **Scores /5:** visual 4 · interaction 3 · a11y 5 · engineering 5 · maintenance 2 · docs 4 · customization 3 · perf 5 · stability 4 · originality 2
- **Evidence:** ★23,792 · last release v2.2.0 (2024-11-18) · last push 2026-05-12 · 3.6M wk npm (`@heroicons/react`) · MIT · 4 open issues
- **Looked at:** https://heroicons.com — the header states the spec plainly ("Outline 24×24, 1.5px stroke") which is a good sign. The 1.5px stroke reads visibly more refined than Lucide's 2px in the same grid; the violet gradient hero megaphone is the one dated element on the page.
- **Vibecode risk:** high — Heroicons + Tailwind + a violet CTA is a recognizable stack.
- **Link:** https://heroicons.com

### Radix Icons — `situational`
- **What:** ~318 icons on a 15×15 grid at 1px, from the Radix (now WorkOS) team.
- **Verdict:** The odd-numbered 15px grid is deliberate — it puts 1px strokes on whole device pixels, so these are the crispest small icons in the category and they don't blur at 1× the way even-grid sets do. The vocabulary is unusual and useful: the Typography category covers letter-spacing, line-height, superscript and text-align at a depth no product set matches, and Design covers crop/mask/opacity/blend. That makes it excellent for design tools, editors and dev surfaces, and wrong for consumer product UI, where at 24px it goes spindly and underweight. Maintenance is minimal since the WorkOS acquisition — last push 2026-04, 62 open issues.
- **Use when:** building an editor, design tool, or a dense 16px-chrome surface. · **Don't use when:** you need marketing-scale icons or general product coverage.
- **Scores /5:** visual 4 · interaction 3 · a11y 4 · engineering 5 · maintenance 2 · docs 3 · customization 2 · perf 5 · stability 4 · originality 4
- **Evidence:** ★2,670 · last push 2026-04-02 · 4.6M wk npm (`@radix-ui/react-icons`) · MIT · 62 open issues
- **Looked at:** https://www.radix-ui.com/icons — the page itself is worth studying: a serif display headline ("A crisp set of 15×15 icons") over a live construction grid in mint and pink. The icon panel groups by Typography / Arrows / Design / Music / Objects, and the Typography row (Ss, AV kerning, ↓A baseline, ↕A leading) shows exactly how specialized the vocabulary is.
- **Vibecode risk:** low — almost nobody defaults to it, and the 1px weight looks nothing like the Feather family.
- **Link:** https://www.radix-ui.com/icons

### Solar — `situational`
- **What:** 7,401 icons in five variants — Bold, Broken, Duotone, Linear, Outline — from 480 Design.
- **Verdict:** The most tonally distinct large free set. The geometry is soft, corner radii are generous, and it reads consumer-mobile rather than enterprise-dashboard — genuinely useful when the product is a wellness app or a fintech consumer surface and Lucide feels too clinical. "Broken" (strokes with deliberate gaps) is a variant nobody else offers and is a cheap way to look non-generic. Two blockers: it's CC BY 4.0, so you owe attribution in the product, and the source repo has been quiet since 2025-06 — Iconify's mirror is the live distribution channel, not the repo. Coverage skews consumer/device and thins out in developer and enterprise concepts.
- **Use when:** consumer-facing product, warm brand, and you can carry a CC BY credit. · **Don't use when:** attribution is unacceptable or you need dev/enterprise vocabulary.
- **Scores /5:** visual 4 · interaction 3 · a11y 3 · engineering 3 · maintenance 2 · docs 2 · customization 4 · perf 4 · stability 3 · originality 4
- **Evidence:** ★375 (`480-Design/Solar-icon-set`) · last push 2025-06-23 · CC BY 4.0 · 7,401 icons via Iconify, collection last updated 2026-08-24
- **Looked at:** https://icones.js.org/collection/solar — the airpods and alarm-clock families run 5–6 device states × 5 variants each, and the variant switch shows how much the Bold weight changes the character: it goes from a light line set to something closer to a filled iOS-style glyph without redrawing the concept.
- **Vibecode risk:** low — nothing else in the free tier looks like the Bold or Broken variants.
- **Link:** https://icon-sets.iconify.design/solar/

### lucide-animated (pqoqubbw/icons) — `experimental`
- **What:** MIT animated versions of Lucide icons built on Motion, installed one icon at a time via `shadcn add @lucide-animated/<name>`.
- **Verdict:** The distribution model is the good idea here — you don't take a dependency, you copy the component into your repo, so the animation timing and easing become yours to tune. That matters, because default animated-icon libraries all animate too much and too slowly, and the fix is always editing the spring, not swapping the library. 8,061 stars in under two years with an active push in 2026-08 says this has real traction rather than launch-week attention. Keep it to two or three surfaces — a nav toggle, a copy-to-clipboard confirm, a theme switch — because animating every icon is a reliable way to make a product feel cheap.
- **Use when:** you want one or two icons to acknowledge interaction with craft. · **Don't use when:** you'd be tempted to animate the whole set, or you need coverage beyond Lucide's vocabulary.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 4 · maintenance 4 · docs 4 · customization 5 · perf 4 · stability 3 · originality 5
- **Evidence:** ★8,061 · last push 2026-08-22 · MIT · built on Motion + Lucide · npm distribution is per-icon via the shadcn registry, so aggregate download numbers aren't meaningful
- **Looked at:** https://icons.pqoqubbw.dev — restrained off-white page, monospace body copy, one orange accent. Icons sit in plain white cards with the name in light grey below; nothing on the page animates until you hover, which is the correct demo of a hover-animation library.
- **Vibecode risk:** medium — it is still Lucide underneath, so the glyphs carry Lucide's recognizability; the motion is what differentiates.
- **Link:** https://icons.pqoqubbw.dev

### Inter — `essential`
- **What:** Rasmus Andersson's UI grotesque: 2,000+ glyphs, 147 languages, weights 100–900 with three drawn masters, an optical-size axis (text→display), and a true italic.
- **Verdict:** Still the most carefully engineered free interface face, and the engineering is specific — tall x-height, ink traps and bridges at small sizes so counters don't fill in, contextual alternates that reshape punctuation based on neighbors, a slashed zero, and character variants for disambiguating I/l/1. The optical-size axis is the part people ignore and shouldn't: display sizes get tighter spacing and cleaner curves automatically. The honest caveat is cultural, not technical — Inter is the default of the default, so choosing it deliberately (for a data-dense tool where type should disappear) is correct and reaching for it by reflex is the tell. Development is effectively complete: last push 2024-11-19, ~22 months, which is fine for a finished typeface but means no new scripts are coming.
- **Use when:** density and legibility beat personality — dashboards, admin tools, anything with numbers. · **Don't use when:** the product needs a voice, or it's a marketing site.
- **Scores /5:** visual 4 · interaction n/a · a11y 5 · engineering 5 · maintenance 3 · docs 5 · customization 5 · perf 5 · stability 5 · originality 2
- **Evidence:** ★19,873 · last push 2024-11-19 · 3.4M wk npm (`@fontsource-variable/inter`) + 2.6M (`@fontsource/inter`) · OFL-1.1
- **Looked at:** https://rsms.me/inter — the specimen is set in Inter at ~180px over a bare white page with a three-column body block; the "y" descender and the flat-terminal "t" are the giveaways. The site does one thing this corpus should copy: it states the numbers (2000 glyphs, 147 languages, three masters) instead of adjectives.
- **Vibecode risk:** high — not because it's bad, but because it is the unmarked case.
- **Link:** https://rsms.me/inter

### Fontsource + `next/font` — `essential`
- **What:** Fontsource packages 2,100 open-source families as npm modules for self-hosting; `next/font` downloads and self-hosts at build time with automatic fallback metric overrides.
- **Verdict:** This is the correct delivery layer for every OFL face in this file, and getting it wrong costs more than choosing the wrong typeface. `next/font` does the thing almost nobody hand-rolls: it computes `size-adjust`, `ascent-override` and `descent-override` for the local fallback so the swap produces zero layout shift, and it eliminates the third-party request entirely (which is also the clean answer to the EU Google Fonts CDN problem). Fontsource gives you the same self-hosted files with per-subset and per-weight granularity for non-Next stacks, and its variable packages (`@fontsource-variable/*`) are the ones to reach for — one file replaces nine. The failure mode to avoid: importing the full family when you use two weights, which is how a 12KB decision becomes 400KB.
- **Use when:** always, for any OFL face. · **Don't use when:** the license forbids self-hosting — Fontshare's ITF EULA does, and requires their API instead.
- **Scores /5:** visual n/a · interaction n/a · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 5 · stability 5 · originality 3
- **Evidence:** Fontsource ★6,114 · last push 2026-09-06 · MIT · 2,100 families listed on fontsource.org (2026-09) · `next` 40.6M wk npm
- **Looked at:** https://fontsource.org — Algolia-backed search, a "Show only variable fonts" filter, and a live size slider; each card renders the pangram in the actual face with a "Variable" badge. Utilitarian, indigo accent, no decoration — appropriate for a tool.
- **Vibecode risk:** n/a
- **Link:** https://fontsource.org

### Fontshare originals — Switzer / General Sans / Satoshi — `strong`
- **What:** Indian Type Foundry's free-tier library: 100 families, most variable, distributed free for commercial use.
- **Verdict:** The best value in type. Switzer is a neo-grotesque in 18 styles that stands next to commercial Swiss faces without embarrassment; General Sans is warmer and more geometric with nine weights and true italics; Satoshi is the one that has been overused enough to become its own tell in the crypto/fintech corner. The catch is the license, and it is not small: these are marked "Closed Source" on Fontshare itself, sit under the ITF Free Font License rather than OFL, prohibit modification, and require ITF's written consent to self-host as a webfont — so you're expected to load from their API, which reintroduces exactly the third-party request `next/font` exists to eliminate. Read the EULA before shipping; several teams have quietly shipped self-hosted Switzer in violation of it.
- **Use when:** you want commercial-quality drawing at zero cost and can live with API delivery or get written consent. · **Don't use when:** you need to subset, modify, or guarantee self-hosting; or when procurement requires an OSI/SIL license.
- **Scores /5:** visual 5 · interaction n/a · a11y 4 · engineering 4 · maintenance 4 · docs 3 · customization 2 · perf 3 · stability 4 · originality 4
- **Evidence:** 100 families / 59 pairs listed on fontshare.com (2026-09) · ITF Free Font License, not OFL · families labeled "Closed Source" in the listing UI · Satoshi: 10 styles, variable
- **Looked at:** https://www.fontshare.com — pale yellow ground, black type, a 120px specimen slider. Each row states styles / variable / "Closed Source" in the right rail, which is unusually honest labeling. Satoshi at 120px shows the tight apertures and near-vertical terminals that make it read modern and slightly cold.
- **Vibecode risk:** low for Switzer and General Sans; medium for Satoshi, which has saturated a specific aesthetic.
- **Link:** https://www.fontshare.com

### Mona Sans / Hubot Sans — `strong`
- **What:** GitHub's two OFL variable families, each with weight, width and slant axes.
- **Verdict:** The most underused good free option. Mona Sans is an industrial-era grotesque with actual character — it has the width axis Inter lacks, which means condensed nav labels and expanded display headings come from one file instead of two families. Hubot Sans is its more geometric, more technical sibling and works well as a display companion. Both are OFL, so unlike Fontshare you can self-host, subset and modify freely. The reason to hesitate is association: Mona Sans *is* GitHub's brand face, and on a developer-tools product it will read as a GitHub reference — which may be exactly what you want, or exactly what you don't. Hubot Sans has been quiet since 2024-10.
- **Use when:** you want free type with a voice and need a width axis. · **Don't use when:** you're building something adjacent to GitHub and don't want the association.
- **Scores /5:** visual 5 · interaction n/a · a11y 4 · engineering 5 · maintenance 4 · docs 3 · customization 5 · perf 5 · stability 4 · originality 5
- **Evidence:** Mona ★4,152, last push 2026-05-19 · Hubot ★1,964, last push 2024-10-17 · both OFL-1.1 · three axes each (weight / width / slant), per GitHub's release announcement
- **Looked at:** https://github.com/mona-sans — the org specimen shows the width axis stepping from condensed to expanded at fixed weight, which is the feature. Note this is a GitHub org page, not a designed specimen site; the type is better than its presentation.
- **Vibecode risk:** low — almost nobody picks it, which is the whole argument.
- **Link:** https://github.com/mona-sans

### IBM Plex — `strong`
- **What:** IBM's OFL superfamily: Sans, Serif, Mono, Condensed, plus Sans Arabic/Devanagari/Thai/JP/KR.
- **Verdict:** The most complete free type *system* — when you need sans, serif and mono that were drawn to sit together, this is the only free answer that doesn't require mixing foundries. Still actively shipping (repo pushed the day I checked; a Plex Mono variable package released 2026-07-30), and the multi-script coverage is real, which matters if you're localizing. The character is corporate-Swiss with a distinctive flared "a" and squared-off Mono — it looks deliberate rather than default, though it also looks unmistakably like IBM to anyone in enterprise software. Plex Mono is a better UI mono than a better *code* mono; JetBrains Mono still wins in an editor.
- **Use when:** you need a coordinated sans/serif/mono system, or multi-script coverage, for free. · **Don't use when:** you're selling to enterprises who will recognize IBM's face.
- **Scores /5:** visual 4 · interaction n/a · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 5 · originality 3
- **Evidence:** ★11,633 · last push 2026-09-09 · latest release `@ibm/plex-mono-variable@1.0.0` (2026-07-30) · OFL-1.1
- **Vibecode risk:** medium — recognizable, but recognizably a design decision rather than a default.
- **Link:** https://github.com/IBM/plex

### Editorial serifs — Instrument Serif / Fraunces / Source Serif / Newsreader — `strong`
- **What:** Four OFL serifs that solve different display problems: Instrument Serif (single-weight high-contrast display), Fraunces (9-axis variable with `SOFT` and `WONK`), Source Serif (Adobe's text serif, 6 weights + italics), Newsreader (screen-optimized news serif with optical size).
- **Verdict:** The single fastest way to stop looking generated is one serif headline over a sans body — and these four cover the range. Instrument Serif is the current favorite for a reason: it is one weight, very high contrast, and at 64px+ it does more for a landing page than any layout change, but it has exactly one job and falls apart below ~24px. Fraunces is the most flexible and the most dangerous — the `WONK` axis toggles genuinely eccentric alternates, and used at default it reads playful in a way that fights a serious product. Source Serif is the workhorse: actually usable for body copy at 16px, still maintained (pushed 2026-09-09). Newsreader has an optical-size axis and is the right pick for long-form reading surfaces.
- **Use when:** display headlines, editorial surfaces, or anywhere you need warmth a grotesque can't give. · **Don't use when:** dense UI, tables, or anything under 16px (except Source Serif and Newsreader).
- **Scores /5:** visual 5 · interaction n/a · a11y 4 · engineering 4 · maintenance 3 · docs 2 · customization 4 · perf 5 · stability 4 · originality 5
- **Evidence:** Instrument Serif ★354, last push 2023-04-26, OFL-1.1 · Fraunces ★758, last push 2026-02-11, OFL-1.1 · Source Serif ★2,372, last push 2026-09-09, OFL-1.1 · Newsreader ★250, last push 2021-03-01, OFL-1.1. The stale dates on Instrument Serif and Newsreader reflect finished single-purpose faces, not abandonment — both are live on Google Fonts.
- **Vibecode risk:** low, with a caveat — Instrument Serif has become common enough in 2026 landing pages that it is starting to acquire its own tell. Fraunces and Newsreader have not.
- **Link:** https://fonts.google.com/specimen/Instrument+Serif · https://fonts.google.com/specimen/Fraunces

### Geist — `situational`
- **What:** Vercel's OFL family: Geist Sans, Geist Mono, and a newer Geist Pixel.
- **Verdict:** Competent and free, but less differentiated than its reputation suggests. The letterforms sit very close to Univers/Helvetica territory — the "e", "s" and single-story "a" have little that Inter or Switzer don't also have, and the metrics the specimen advertises (710 cap, 530 x-height) are unremarkable for a UI face. Geist Mono is the stronger half and holds up in a terminal. The real problem is positional: Geist + shadcn/ui + Tailwind + Lucide is now the single most identifiable AI-generated product stack in existence, so shipping default Geist is a louder signal than shipping default Inter. Choose it if you're on Vercel and want a coherent house system; don't choose it because it looks distinctive, because it doesn't.
- **Use when:** Vercel-native products, or you want Geist Mono specifically. · **Don't use when:** you're trying to look unlike every other 2026 SaaS landing page.
- **Scores /5:** visual 3 · interaction n/a · a11y 4 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 5 · stability 5 · originality 2
- **Evidence:** ★3,619 · last release v1.7.2 (2026-06-01) · last push 2026-07-14 · 2.0M wk npm (`geist`) · OFL-1.1
- **Looked at:** https://vercel.com/font — pure black ground, white specimen on a live baseline grid annotated 710 / 530 / 0 / −150. The presentation is better than the typeface; the grid annotations imply a rigor the letterforms don't uniquely have.
- **Vibecode risk:** high — currently the strongest single visual signal of an AI-scaffolded product.
- **Link:** https://vercel.com/font

### Berkeley Mono — `situational`
- **What:** U.S. Graphics Company's commercial monospace (TX-02), sold as tiered perpetual licenses.
- **Verdict:** The most opinionated mono available and the only one that carries a whole visual identity by itself — squared bowls, terminal-CRT proportions, a deliberately retro-technical voice. If the product *is* the terminal aesthetic, it earns its price. The licensing is where agents get teams in trouble: tiers are split into Developer (personal use, no commercial), Indie Business (<5 employees), and Standard Business, commercial use is scoped to UI elements, licenses are not compatible with open-source distribution, and building an IDE/terminal/text-editor with it is generally not permitted. Never bundle it into an open-source repo. A search-sourced figure of ~$75 for the personal tier appeared repeatedly but I could not confirm current pricing directly — usgraphics.com is behind a Cloudflare human-verification wall.
- **Use when:** a paid product whose identity is technical, with legal sign-off on the tier. · **Don't use when:** open source, developer-tool products, or any bundling into a redistributable artifact.
- **Scores /5:** visual 5 · interaction n/a · a11y 4 · engineering 4 · maintenance 4 · docs 3 · customization 2 · perf 4 · stability 4 · originality 5
- **Evidence:** license tiers FX-102 Developer / FX-200 Indie Business / FX-600 Standard Business (usgraphics.com catalog paths, 2026-09) · exact current prices **unverified** — site blocked by Cloudflare challenge at capture time
- **Looked at:** https://usgraphics.com/products/berkeley-mono — returned a Cloudflare "Performing security verification" interstitial at 1440, so I could not judge the specimen firsthand. Rated on license structure and reputation only; visual score should be treated as provisional.
- **Vibecode risk:** low
- **Link:** https://usgraphics.com/products/berkeley-mono

### Commissioned faces — Söhne / ABC Diatype / GT America — `situational`
- **What:** Paid foundry families from Klim, Dinamo and Grilli Type, licensed per usage axis.
- **Verdict:** What you're buying is exclusivity, not quality — Switzer and Mona Sans are drawn well enough that "the free ones look cheap" stopped being true around 2022. Söhne in particular has become its own signal (it reads as "well-funded startup that hired a design team"), which is either the point or a different kind of tell. The commercial structure is the thing to actually plan for: Klim's Söhne checkout prices Desktop by number of users, Web by monthly pageviews, App by monthly active users, Advertising by monthly impressions, Broadcasting by production budget, and OEM by device count — each an independent purchase. A product with a marketing site and an app buys two, and both scale with growth, so budget it as a recurring line item rather than a one-time cost. Söhne Collection covers 64 styles (Söhne, Mono, Schmal, Breit); the base Söhne Family is 16.
- **Use when:** you have a design team who will use the extra styles, and a budget that survives a pageview tier upgrade. · **Don't use when:** you're pre-product-market-fit — the money buys nothing a user notices.
- **Scores /5:** visual 5 · interaction n/a · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 3 · perf 4 · stability 5 · originality 5
- **Evidence:** Klim licence axes and style counts read directly off klim.co.nz/buy/soehne (2026-09) · specific dollar figures **unverified** — the price table renders client-side and did not resolve in capture
- **Looked at:** https://klim.co.nz/buy/soehne/ — the buy flow is the most honest artifact here: six independently checkable licence rows, each with its own metric dropdown (2,500 monthly active users; 20,000 monthly impressions; $25,000 production budget; 1,500 devices). Black ground, no decoration, the type doing all the work.
- **Vibecode risk:** low — the licensing friction alone guarantees no generator defaults to it.
- **Link:** https://klim.co.nz/fonts/soehne/ · https://abcdinamo.com/typefaces/diatype · https://www.grillitype.com/typeface/gt-america

### Departure Mono — `experimental`
- **What:** A monospaced bitmap/pixel typeface with a lo-fi technical character, free.
- **Verdict:** High personality, narrow utility — and worth knowing about precisely because it is the opposite of everything else in this file. It works as an accent: version strings, status badges, terminal chrome, a data-readout panel, a footer. It is genuinely bad as body text or as a code font, because the bitmap construction means it has one correct size and degrades everywhere else. Include it in a system as a third face, never as the second.
- **Use when:** you need one surface to feel like instrumentation. · **Don't use when:** body copy, code editors, or anything that has to scale.
- **Scores /5:** visual 5 · interaction n/a · a11y 2 · engineering 3 · maintenance 3 · docs 3 · customization 2 · perf 5 · stability 3 · originality 5
- **Evidence:** v1.500 per the site (2026-09) · free download · canonical GitHub repo not resolvable under the org path I tried — **unverified** star count and license SPDX; check the bundled license before commercial use
- **Looked at:** https://departuremono.com — the specimen page is the best-designed thing I looked at in this whole category: a punch-hole memo mockup with sage-green highlighter marks, a QR-annotated research report on kraft paper, and an access card, all set in the face. It sells the font by showing a world it belongs in rather than a glyph grid.
- **Vibecode risk:** low
- **Link:** https://departuremono.com

## Rejected / avoid
- **Hugeicons** — advertises "60,000+ icons," which is roughly 6,700 concepts multiplied by nine style axes; in the grid I captured, nine of every ten tiles carry a yellow PRO badge, so the free tier is effectively one style (Stroke Rounded). 24k weekly npm and a React repo created 2026-06 with 53 stars. It is a paid product wearing open-source clothing; an agent that treats it as a free set will hit a paywall mid-build.
- **Font Awesome** — 76,914 stars is distribution, not taste. The free SVGs are CC BY 4.0, meaning attribution is legally required in your product and essentially nobody complies. The drawing is a decade old, the icon-font delivery model is obsolete against inline SVG, and Pro upsells are woven through the docs. There is no reason to start a 2026 product on it.
- **Feather** — the origin of the entire modern stroke-icon look, and now a maintenance risk: 25,991 stars, last push 2025-03-11, 510 open issues. Lucide is its living fork. Study Feather's grid decisions; install Lucide.
- **SF Symbols** — the license permits use only in UI for software running on Apple's platforms, forbids use in app icons/logos/trademarks, and Apple does not sell a license for anything else. Not usable on the web or Android under any reading. Reference-only.
- **react-useanimations** — last push 2024-06-12, 27 months. Use lucide-animated instead.
- **react-icons** — 7.8M weekly downloads and still the wrong default: it bundles dozens of sets under one API, which makes it trivially easy to ship three different stroke weights in one navbar. Use Iconify if you need multi-set access; it does the same job with build-time tree-shaking and a much better browser.
- **Lordicon and paid Lottie icon marketplaces** — animated icon sets sold by the thousand are a trap: the animations are built to demo well in a grid, not to acknowledge a click in 180ms, and JSON Lottie payloads cost far more than an SVG with a CSS transition. If you want motion, take lucide-animated and tune it.
- **Google Fonts CDN (`fonts.googleapis.com`)** as a delivery mechanism — not the fonts, the CDN. Third-party DNS + TLS on the critical path, unreliable preloading, and a live GDPR question in the EU. Same faces, self-hosted, are strictly better.

## What surprised me
- **Remix Icon quietly stopped being Apache-2.0.** The LICENSE file in the repo now reads "Remix Icon License v1.0, Version 1.0 – January 2026" — a bespoke license that still permits commercial use and modification but prohibits redistributing the icons as a standalone pack. It is not OSI-approved and will not resolve in SPDX tooling, which means it may fail an automated corporate license scan that Apache-2.0 passed a year ago.
- **Font Awesome's free icons require attribution.** They are CC BY 4.0, not MIT — verified in the repo's own LICENSE.txt. The fonts are OFL and the code is MIT, but the SVG/JS icons are CC BY. This is one of the most widely violated licenses in web development.
- **Heroicons hasn't cut a release since November 2024** — 22 months — despite being the Tailwind team's own icon set and still doing 3.6M weekly downloads. It reads as finished rather than abandoned, but nobody talks about it as a stale dependency, and it is one.
- **Material Symbols' Grade axis has no equivalent anywhere else.** Every set tells you to use a heavier weight in dark mode; Grade lets you thicken strokes *without* changing the glyph's advance width, so nothing in the layout shifts. It is the single most useful icon feature I found and almost nobody uses it.
- **Fontshare fonts cannot legally be self-hosted without written consent.** The families are labeled "Closed Source" right in Fontshare's own listing UI. Every "best free fonts" article recommends downloading and self-hosting Switzer and Satoshi; the EULA says to use their API. Teams are shipping in violation of this without knowing.
- **Phosphor's flat terminals are a legibility decision, not a style one.** Round caps at 2px eat roughly a pixel of length at each end, which is why Feather-lineage icons soften at 16px and Phosphor's don't. The set that looks the most "designed" is also the one that measures better small.

## Open questions
- **Exact current pricing for Berkeley Mono, Söhne, ABC Diatype and GT America.** All four render price tables client-side or behind a Cloudflare challenge; I could read license *structure* but not figures. Settling this needs a manual browser session on each checkout, or a foundry quote request.
- **Untitled UI Icons' real distribution and provenance.** The site states MIT and 1,100+ free icons, but I found no canonical public repo, so star count, contributor count, npm reach and update cadence are all unverified. A published GitHub repo or an npm package would settle it.
- **Departure Mono's license SPDX and repository.** The site offers a free download and a GitHub link, but the org path I queried 404'd. Read the license file inside the download before any commercial use.
- **Whether Phosphor's slow release cadence is a policy or a signal.** Core last pushed 2026-01, React package last released 2025-05. If the maintainers have stated a stability policy that would change the maintenance score from 3 to 4; a maintainer statement or a 2026 roadmap issue would settle it.
- **Real-world adoption claims.** I deliberately verified none beyond the self-evident (Vercel publishes Geist, GitHub publishes Mona Sans, Tailwind Labs publishes Heroicons, shadcn/ui's docs import `lucide-react`). Any "used by X" claim in this category should be checked against the actual served CSS, not against a marketing showcase.
