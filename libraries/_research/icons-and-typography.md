# Icon systems and typography resources

**Evaluated:** 2026-09 · **Researcher note:** Icons have collapsed into a monoculture — Feather's 24px/2px/round-cap DNA is now the house style of Lucide, Tabler, Iconoir and half of Iconify, and it is the single loudest "AI built this" signal in a UI. The genuinely differentiated work is in multi-weight families (Phosphor), variable-axis engineering (Material Symbols' Grade axis), and separately-drawn optical sizes (Heroicons Micro). Beware the false escape: a *lighter-stroke* Feather clone (Untitled UI, Iconoir) is still a Feather clone — shaving 2px to 1.5px changes the weight, not the vocabulary or the round caps. On type, the free tier got good enough that paying is now a taste decision, not a quality one — but Inter and Geist have become tells, and the interesting move is a free face nobody defaults to (Switzer, Mona Sans, Instrument Serif) with tabular numerals turned on.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Lucide | `essential` | Best-maintained, best-covered stroke set; also the most recognizable default in the world | high |
| Phosphor | `essential` | Six real weights and flat terminals — the only free set that can carry a brand on its own | low |
| Iconify | `essential` | Infrastructure, not a set: 361,898 icons across 238 collections behind one API and tree-shakeable components | n/a |
| Fontsource + `next/font` | `essential` | The correct way to ship OFL type: self-hosted, subset, preloaded, zero third-party request | n/a |
| Inter | `essential` | Still the most engineered free UI face; right when you need it invisible, a tell when you reach for it by reflex | high |
| Material Symbols | `strong` | Best engineering in icons (Fill/Weight/Grade/Optical-Size axes); unmistakably Google-shaped | high |
| Untitled UI Icons | `strong` | 1,100 free, systematically named, lighter stroke than Lucide — but the vocabulary is still Feather's | high |
| Tabler | `strong` | 6,184 icons and weekly releases; coverage is the reason to pick it, not the drawing | high |
| Simple Icons | `strong` | 3,459 brand marks under CC0 — the only sane answer to "where do logos come from" | n/a |
| Monaspace | `strong` | GitHub's five-family code superfamily with texture healing; the mono nobody remembers to consider | low |
| Mona Sans / Hubot Sans | `strong` | Weight + width + slant axes, OFL, industrial-grotesque character Inter deliberately lacks | low |
| Fontshare originals (Switzer / General Sans / Satoshi) | `strong` | Commercial-grade drawing for $0 — but a proprietary EULA that blocks self-hosting | low |
| IBM Plex | `strong` | Sans + Serif + Mono + Condensed as one OFL system; still shipping in 2026 | medium |
| Editorial serifs (Instrument Serif, Fraunces, Source Serif, Newsreader) | `strong` | The fastest way to stop looking like a template; use for display, not body | low |
| Solar | `situational` | 7,608 icons × 5 variants incl. Bold and Broken; warm consumer geometry; CC BY attribution required | low |
| Heroicons | `situational` | Only 324 icons, but four *separately drawn* sizes — the right call if you live in Tailwind | high |
| Radix Icons | `situational` | 15×15 pixel-snapped, design-tool vocabulary; wrong at 24px, low maintenance | low |
| Geist | `situational` | Clean Univers-derived grotesque, OFL; now the loudest signal that a product is a Vercel-stack demo | high |
| Berkeley Mono | `situational` | The most opinionated mono in the category; license is narrow and expensive per seat | low |
| Atkinson Hyperlegible Next | `situational` | Purpose-built for low vision; the only face here with a real accessibility argument behind it | low |
| Iosevka | `situational` | Build-your-own mono: 20+ variants and a config file that regenerates the family | low |
| Bricolage Grotesque | `situational` | OFL variable display with opsz/wdth/wght; warm, slightly odd, not yet a tell | low |
| Bootstrap Icons | `situational` | 2,078 MIT icons, framework-free SVG/font — the non-React default nobody lists | medium |
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
- **Best accessibility:** Heroicons' four separately-drawn sizes (24 Outline, 24 Solid, 20 Mini, 16 Micro) — a redrawn 16px glyph beats a scaled 24px one at every zoom level. For type, **Atkinson Hyperlegible Next**, not Inter: it was drawn by the Braille Institute specifically for low vision, and it disambiguates character pairs by changing the *shapes* rather than by hiding the fix behind an opt-in `cv` feature nobody enables. Inter's ink traps and `cv01`/`zero` are the fallback when you need density more than legibility.
- **Most customizable / least house-style:** Iconify — mix collections per-icon without shipping six packages. For type, Fraunces (9 axes including `SOFT` and `WONK`).
- **Lightest:** Radix Icons (~318 icons, 1px paths, no runtime). For type, any single variable `.woff2` — one file replaces 9 static weights.
- **Brand marks:** Simple Icons — 3,459 logos under CC0-1.0, so no attribution and no license scan. It is the correct answer to a gap every stroke set has, and the reason Lucide could spin brand logos out into Lab without anyone minding. Trademark law still applies to the marks themselves; the CC0 covers the SVG, not permission to imply endorsement.
- **Mono:** JetBrains Mono for an editor, IBM Plex Mono for UI chrome, **Monaspace** when you want the code surface to carry brand (five families that share metrics, plus texture healing to fix the mono-spacing letterfit problem), Iosevka when you want to *configure* a mono rather than pick one.
- **Promising newcomer:** lucide-animated — MIT, 8k stars, per-icon `shadcn add` so the Motion timing is yours to edit.
- **Premium/paid worth it:** Berkeley Mono if a terminal-adjacent product *is* the brand; a commissioned face from Klim/Dinamo/Grilli if you have a real design team. Streamline and Nucleo are not worth it for product UI — you are buying illustration breadth you won't use.

## Practical notes (loading, numerals, licensing)

**Loading.** Self-host. Google Fonts' CDN adds a third-party DNS + TLS round trip, is a GDPR liability in the EU, and cannot be preloaded reliably. In Next.js use `next/font/google` or `next/font/local` — it downloads at build time, self-hosts, and injects a matched `size-adjust`/`ascent-override` fallback so there is zero layout shift. Outside Next, Fontsource (2,100 families, MIT tooling, 3.4M weekly downloads for `@fontsource-variable/inter` alone) gives you the same files over npm. Rules: one variable `.woff2` per family, `font-display: swap`, `<link rel="preload" as="font" crossorigin>` on the one face above the fold, and subset to `latin` unless you actually ship other scripts.

**Numerals — the detail that separates product UI from a demo.** Proportional numerals make table columns and live-updating counters jitter. Turn on `font-variant-numeric: tabular-nums` (or `font-feature-settings: "tnum"`) on every table cell, timer, price ticker, and metric tile. Inter, Geist, IBM Plex, Mona Sans, Switzer, General Sans, JetBrains Mono and Source Serif all ship `tnum`. Slashed zero (`zero` / `ss01`-ish depending on face; Inter exposes it as `zero`) is worth enabling in anything showing IDs, hashes, or serial numbers. Inter also ships `cv08`-style character variants for a disambiguated capital I — use it in credential fields. If the product has a real low-vision audience, ship Atkinson Hyperlegible Next instead of tuning Inter's opt-in features; it bakes the disambiguation into the default drawing.

**Licensing, concretely.** OFL-1.1 (Inter, Geist, Mona/Hubot, IBM Plex, JetBrains Mono, Fraunces, Instrument Serif, Source Serif, Newsreader) lets you self-host, subset, and modify — just don't sell the font itself. Fontshare's ITF Free Font License is *not* OFL: free for commercial use, but the families are marked "Closed Source" on the site, modification is prohibited, and self-hosting as a webfont requires ITF's written consent — you're expected to use their API. Commissioned foundries (Klim, Dinamo, Grilli) price separately per axis: Klim's Söhne checkout has independent Desktop (users), Web (pageviews), App (monthly active users), Advertising (impressions), Broadcasting (production budget) and OEM (devices) tiers, so a product with a marketing site *and* an app buys two licenses and the cost scales with your success. On icons: Font Awesome Free's SVGs are CC BY 4.0 (attribution required in your product — almost nobody complies); Solar is CC BY 4.0 too; Remix Icon left Apache-2.0 for a bespoke "Remix Icon License v1.0" in January 2026; Lucide is ISC, not MIT.

## Scorecards

### Lucide — `essential`
- **What:** Community fork of Feather, 1,816 icons on a 24×24 grid at 2px stroke with round caps and joins (plus 373 more in the opt-in Lucide Lab).
- **Verdict:** The maintenance story is not close — release 1.43.0 shipped 2026-09-08, the repo was pushed the day I checked it, and ~100 contributors keep the queue moving. The drawing is disciplined: I looked at 200 glyphs at 24px and the optical centering across circle-enclosed forms (check-circle, info, alert-circle, user-circle) is consistent to the pixel, and rectangle corner radii never vary. The problem is entirely social — it is shadcn/ui's default import at 87M downloads a week, so a Lucide icon at default 2px stroke on a rounded card is now shorthand for "generated." Coverage is also mid: brand logos were spun out into an opt-in "Lab" collection, and it thins out fast in finance, medical and dev-tooling verticals.
- **Use when:** you want the safest, best-maintained baseline and will customize stroke/size. · **Don't use when:** the product's visual identity has to be legible in a screenshot, or you need >2,000 icons.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 5 · stability 5 · originality 2
- **Evidence:** ★24,438 · last release 1.43.0 (2026-09-08) · last push 2026-09-09 · 86,866,524 wk npm (`lucide-react`, week ending 2026-09-06) · ~100 contributors · 502 open issues · ISC (LICENSE file confirms ISC, not MIT; the GitHub API reports NOASSERTION) · default icon import in shadcn/ui docs · every figure re-verified 2026-09-09
- **Looked at:** https://lucide.dev/icons/ — the customizer panel exposes color, stroke width, size, and an "absolute stroke width" toggle (which keeps stroke constant as size scales — a genuinely thoughtful control). At 24px the grid reads evenly; at 390px the sidebar collapses cleanly. Every terminal is round, which is exactly the tell.
- **Vibecode risk:** high — the default 24/2/round configuration is the most recognizable icon look on the internet right now. Dropping stroke to 1.5 and size to 18 defuses most of it.
- **Link:** https://lucide.dev

### Phosphor — `essential`
- **What:** 9,072 icons in six weights — Thin, Light, Regular, Bold, Fill, Duotone — from a two-person studio.
- **Verdict:** The only free set where the weight axis is *drawn*, not interpolated, which means Thin at 32px and Bold at 16px are both correct rather than both approximate. Terminals are flat (butt caps), not rounded, and that alone makes it read as designed rather than generated — it also survives 16px better, because round caps eat about a pixel per terminal. Coverage is the widest of any set with this level of craft, and brand logos (apple, amazon, angular, app-store) ship in the main set instead of a side collection. The one real risk is velocity, and it is worse than a push date suggests. `@phosphor-icons/react` last cut a release 2025-05-22. The core and React repos both show a 2026-01-06 push, which looks reassuring until you read the commits: they are `chore(docs): sync readme section` and "Add Elixir, Phoenix, and Ash icons link." **The last substantive change to either repo was 2025-05** — roughly 16 months of no icon work, no fixes, no releases. Treat this as a finished artifact you are forking in place, not a library with a roadmap.
- **Use when:** the icon set is part of the brand, or you need weight as a hierarchy tool (Fill for active nav, Regular for inactive). · **Don't use when:** you need a release cadence that keeps up with new product concepts, or you can't absorb the set going unmaintained.
- **Scores /5:** visual 5 · interaction 4 · a11y 4 · engineering 4 · maintenance 2 · docs 4 · customization 5 · perf 4 · stability 4 · originality 5
- **Evidence:** ★7,454 (homepage) / ★1,745 (react) / ★375 (core) · last `@phosphor-icons/react` release v2.1.10 (2025-05-22) · last push 2026-08-26 (homepage) / 2026-01-06 (core and react, both docs-only commits) · **last substantive commit to core or react: 2025-05** · 3,210,190 wk npm (`@phosphor-icons/react`) · MIT · verified 2026-09-09
- **Looked at:** https://phosphoricons.com — browsing the Regular weight at 32px, the `align-*` family is the tell for grid discipline: every bar in align-center-horizontal, align-left, align-top-simple lands on the same optical axis with identical bar thickness. Warm off-white ground, acid-green notice bars, monospace body copy. The site is designed by people who look at things.
- **Vibecode risk:** low — Fill and Duotone weights in particular have no equivalent in the Feather lineage, so a Phosphor product doesn't look like anyone else's.
- **Link:** https://phosphoricons.com

### Iconify — `essential`
- **What:** An aggregator and runtime: 238 icon collections (361,898 icons) behind one component API, with build-time tree-shaking via `unplugin-icons` or on-demand SVG via the API.
- **Verdict:** Treat this as infrastructure rather than a set. Its real value is escape hatches — when Lucide has no `siren` but Solar does and Material Symbols has a better `database`, Iconify lets you pull three glyphs from three collections without adding three dependencies, and the icons ship as inline SVG so they inherit `currentColor` and CSS transitions. The browser at icones.js.org (built by @antfu) is the best icon search on the web, full stop. The trap is that mixing collections without discipline produces a set with three stroke weights and two grids in the same navbar — that is *worse* than a monoculture, so pick one primary collection and use Iconify only for gaps.
- **Use when:** you need long-tail coverage or want to evaluate sets side by side. · **Don't use when:** the team won't enforce a primary-collection rule.
- **Scores /5:** visual n/a · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 5 · originality 4
- **Evidence:** ★6,309 · last push 2026-09-10 · 698,876 wk npm (`@iconify/react`) · MIT · **238 collections / 361,898 icons** per `api.iconify.design/collections`, verified 2026-09-09 (the earlier "187" figure was read off the icones.js.org sidebar, which lists a subset)
- **Looked at:** https://icones.js.org — the Solar collection page shows 7,401 icons with a variant filter row (Bold / Broken / Duotone / Linear / Outline) and a live size + color control. Counts pulled from the Iconify API rather than the sidebar (2026-09-09): Material Symbols 15,618, Material Symbols Light 15,683, IconMind 22,722, Google Material Icons 10,955, Phosphor 9,072, Solar 7,608, MDI 7,447, Tabler 6,184, Hugeicons 5,979, Boxicons 3,768, Simple Icons 3,459, MingCute 3,320, Remix 3,188, Bootstrap 2,078, Lucide 1,816 (+ Lucide Lab 373).
- **Vibecode risk:** n/a — it has no house style of its own, which is the point.
- **Link:** https://iconify.design

### Material Symbols — `strong`
- **What:** Google's variable icon font, 15,618 icons with four axes: Fill (0–1), Weight (100–700), Grade (−25–200), Optical Size (20–48px).
- **Verdict:** Technically the best-engineered icon system that exists, and it is not close. Grade is the axis nobody else has: it adjusts stroke thickness *without* changing the glyph's footprint, which is the correct fix for the optical illusion that makes light-on-dark strokes look thinner — dark mode gets Grade 25 and the layout doesn't move. Optical Size genuinely redraws rather than scales. The disqualifying problem is aesthetic: the shapes are Google's, and Search, Home, Menu, Settings and Favorite are so deeply memorized that a product using them reads as an Android app or a Google service. Also note the delivery: as a variable font it is one request but a large one, and per-icon SVG extraction gives up the axes.
- **Use when:** you need dark/light stroke compensation, deep coverage, or you're already in a Material system. · **Don't use when:** the product needs its own visual identity.
- **Scores /5:** visual 3 · interaction 4 · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 3 · stability 5 · originality 2
- **Evidence:** ★53,910 (`google/material-design-icons`) · last push 2026-09-04 · 409,342 wk npm (`material-symbols`) · Apache-2.0 · 15,618 icons per Iconify API (all four re-verified 2026-09-09)
- **Looked at:** https://fonts.google.com/icons — the customize panel exposes all four axes as live sliders with the Grade range labeled "−25 (low) → 200 (high emphasis)", which is the correct mental model. Grid is Google's own Material 3 chrome: pill-shaped blue Filters button, 16px-radius info cards. Note they ship separate "Arrow Back iOS" / "Arrow Forward iOS" chevrons — platform-aware in a way most sets aren't.
- **Vibecode risk:** high — but for the opposite reason to Lucide. It doesn't look AI-generated, it looks *Google-generated*.
- **Link:** https://fonts.google.com/icons

### Untitled UI Icons — `strong`
- **What:** 1,100+ free line icons (a larger paid set exists), drawn in Figma for Figma, MIT-licensed.
- **Verdict:** The free set that looks the most expensive at a glance, and the glance is doing some work. Stroke reads noticeably lighter than Lucide's 2px — closer to 1.67 at 24 — which is what makes it feel like a designed product rather than a component showcase, and the naming grammar is the most systematic I saw anywhere: `alarm-clock`, `alarm-clock-check`, `alarm-clock-minus`, `alarm-clock-plus`, `alarm-clock-off` is a modifier vocabulary an agent can *predict*, which matters a lot for code generation. Three honest caveats. The free tier is a funnel for a paid design system, so the site is a purchase flow. There *is* a first-party React package — `@untitledui/icons`, MIT, 304,138 downloads a week — which the previous pass missed, but it sits at **v0.0.22 with no public repository**, so there is no issue tracker, no changelog and no contributor visibility behind a six-figure-weekly dependency. And the drawing is less differentiated than the marketing implies: looking at the grid myself, `activity` is Lucide's activity waveform, `activity-heart` is Lucide's heart-pulse, and the caps and joins are round on the same 24 grid. What you are buying is a lighter stroke and a better naming grammar on top of the same Feather vocabulary — real, but not a different family.
- **Use when:** you want a lighter, more refined line than Lucide and are willing to do your own packaging. · **Don't use when:** you need a maintained npm component library with types and tree-shaking out of the box.
- **Scores /5:** visual 4 · interaction 3 · a11y 3 · engineering 4 · maintenance 3 · docs 3 · customization 4 · perf 4 · stability 2 · originality 3
- **Evidence:** free tier 1,100+ icons, MIT, no attribution required (per untitledui.com/free-icons, 2026-09) · **`@untitledui/icons` on npm: 304,138 wk downloads, MIT, latest v0.0.22 published 2026-03-24, 10 versions since 2025-02-07, `repository` field empty** · (`@untitledui/icons-react` is a near-dead 413/wk squatter — do not install it) · still no public GitHub repo, so star/contributor/issue counts remain unverifiable
- **Looked at:** https://www.untitledui.com/free-icons — the alert family (alert-circle / alert-square / alert-triangle / alert-hexagon / alert-octagon) shows they cover container-shape variants exhaustively, which is rare. Icons sit in 1px-bordered cards with a lot of whitespace; the page chrome is a purple "Buy now" CTA and a Figma preview button — that's the marketing site, not the icons.
- **Vibecode risk:** high — corrected upward from medium on a direct look at the grid. The lighter stroke reads more refined than Lucide, but the glyph vocabulary, the round caps and the 24 grid are Feather's, and at 304k weekly installs it is now a common substitution inside AI-scaffolded Tailwind templates. Swapping Lucide for Untitled UI is a weight change, not an identity change.
- **Link:** https://www.untitledui.com/free-icons

### Tabler — `strong`
- **What:** 6,184 MIT icons on 24×24 at 2px stroke, outline and filled, with brand logos included.
- **Verdict:** Pick this when coverage is the constraint. It is three times Lucide's size, it ships brand marks in the main set (Facebook, LinkedIn, WhatsApp, Instagram), and it releases constantly — v3.46.0 in July, repo pushed daily. But look honestly at the grid: the person / x / check-circle / map-pin / search / settings / mail row is close to pixel-identical to Lucide's, because both descend from Feather. You are buying breadth, not a different look. The site is also a commercial funnel — a gradient "$69 for all Tabler products" bar, a newsletter modal that covers a third of the viewport, and a Streamline cross-sell panel inside the icon grid.
- **Use when:** you hit Lucide's coverage ceiling and don't want an aggregator. · **Don't use when:** you switched away from Lucide hoping for a different aesthetic — you won't get one.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 5 · originality 2
- **Evidence:** ★21,643 · last release v3.46.0 (2026-07-28) · last push 2026-09-09 · 2,765,891 wk npm (`@tabler/icons-react`) · ~97 contributors · MIT · 6,184 icons per Iconify API · all re-verified 2026-09-09
- **Looked at:** https://tabler.io/icons — icons render in ~4px-radius grey tiles; the grid itself is clean, but at 1440 the newsletter modal and the Streamline "more icons" panel occupy real estate before you can see 40 glyphs.
- **Vibecode risk:** high — visually indistinguishable from Lucide to anyone who isn't measuring.
- **Link:** https://tabler.io/icons

### Simple Icons — `strong`
- **What:** 3,459 SVG brand marks — company, product and technology logos — released under CC0-1.0.
- **Verdict:** Added in the challenge pass; the previous version of this file had no answer to "where do the logos come from," which is a gap every stroke set creates the moment Lucide spun brand marks into the opt-in Lab collection and you decided not to ship Tabler. CC0 is the important part: no attribution, no notice file, nothing for a corporate license scanner to flag — strictly better than Font Awesome's CC BY for exactly the icons people most often need Font Awesome for. Maintenance is the strongest in this whole file: weekly releases (16.30.0 on 2026-09-06), pushed the day I checked, 25,822 stars. The real caveat is legal but not copyright — CC0 waives the foundry's rights in the SVG, it does not grant you trademark permission, so a logo grid implying partnership is still a problem, and the site links each brand's own guidelines for that reason. Second caveat: it is *only* brand marks. It sits alongside your UI set, never instead of one.
- **Use when:** integration lists, OAuth buttons, tech-stack pages, changelog entries, "works with" grids. · **Don't use when:** you need UI glyphs, or you're implying endorsement.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 4 · customization 3 · perf 5 · stability 5 · originality 4
- **Evidence:** ★25,822 · last push 2026-09-09 · last release 16.30.0 (2026-09-06) · 802,469 wk npm (`simple-icons`) · CC0-1.0 · 3,459 icons per Iconify API · verified 2026-09-09
- **Looked at:** https://simpleicons.org — I captured this myself at 1440 and 390. Monospace chrome, a light/dark/auto theme trio, SVG/PNG download toggle, and — the detail that matters — every card carries the brand's **official hex** as a coloured chip (`#FF7900` Orange, `#18A303` LibreOffice), plus a "Brand guidelines" link where one exists. That is the set doing your trademark homework for you. One Carbon ad slot sits in the grid; it does not intrude.
- **Vibecode risk:** n/a — a brand mark has no house style to leak. If anything, using the *real* logos instead of a stroke-set approximation is an anti-vibecode move.
- **Link:** https://simpleicons.org

### Bootstrap Icons — `situational`
- **What:** 2,078 MIT icons from the Bootstrap team, shipped as individual SVGs, an SVG sprite, and a webfont — no framework required.
- **Verdict:** Added in the challenge pass because this file was React-shaped and this is the obvious non-React answer: plain SVG files and a sprite, so it works in Rails, Django, Laravel, Astro, plain HTML and anything else without a component layer. MIT, no attribution, 538k weekly npm. The drawing is heavier and more filled than the Feather lineage — closer to a small-scale iOS glyph than a hairline stroke — which is genuinely a different look, though "different" here means "reads as Bootstrap," and Bootstrap has its own recognizability problem. Maintenance is the caveat: the repo is pushed constantly but **the last tagged release was v1.13.1 on 2025-05-09**, sixteen months ago, so the npm package is not tracking main.
- **Use when:** a non-JS stack, or you want a sprite/webfont delivery without a build step. · **Don't use when:** you're in React and would get better tree-shaking elsewhere, or the Bootstrap association is a problem.
- **Scores /5:** visual 3 · interaction 3 · a11y 4 · engineering 4 · maintenance 3 · docs 4 · customization 3 · perf 4 · stability 4 · originality 2
- **Evidence:** ★8,122 (`twbs/icons`) · last push 2026-09-09 · **last release v1.13.1 (2025-05-09)** · 538,176 wk npm (`bootstrap-icons`) · MIT · 2,078 icons per Iconify API · verified 2026-09-09
- **Vibecode risk:** medium — generators reach for Lucide, not this, so it is not an *AI* tell; it is a *Bootstrap* tell, which for some audiences is worse.
- **Link:** https://icons.getbootstrap.com


### Heroicons — `situational`
- **What:** 324 icons from the Tailwind team in four *separately drawn* sizes: Outline 24 (1.5px), Solid 24, Mini 20, Micro 16.
- **Verdict:** The size story is the reason to care and the reason most sets are worse than they look. Micro at 16px is redrawn with fewer details, not scaled — which is why it stays legible where a scaled 24px glyph turns to mush in a dense table. The count is the problem: 324 icons is a *curated* set, and you will run out inside a real product, at which point you're mixing sets and the optical-size advantage evaporates. Maintenance has gone quiet — v2.2.0 shipped 2024-11-18, just under 22 months ago, and only 4 issues are open, which reads as "finished" more than "abandoned" but is worth knowing before you build on it.
- **Use when:** you're on Tailwind, your icon vocabulary is small, and 16px density matters. · **Don't use when:** you need more than ~300 concepts or any brand marks.
- **Scores /5:** visual 4 · interaction 3 · a11y 5 · engineering 5 · maintenance 2 · docs 4 · customization 3 · perf 5 · stability 4 · originality 2
- **Evidence:** ★23,792 · last release v2.2.0 (2024-11-18) · last push 2026-05-12 · 3,603,771 wk npm (`@heroicons/react`) · MIT · 4 open issues · **324** SVGs counted directly in `optimized/24/outline` (the previous "316" was off)
- **Looked at:** https://heroicons.com — the header states the spec plainly ("Outline 24×24, 1.5px stroke") which is a good sign. The 1.5px stroke reads visibly more refined than Lucide's 2px in the same grid; the violet gradient hero megaphone is the one dated element on the page.
- **Vibecode risk:** high — Heroicons + Tailwind + a violet CTA is a recognizable stack.
- **Link:** https://heroicons.com

### Radix Icons — `situational`
- **What:** ~318 icons on a 15×15 grid at 1px, from the Radix (now WorkOS) team.
- **Verdict:** The odd-numbered 15px grid is deliberate — it puts 1px strokes on whole device pixels, so these are the crispest small icons in the category and they don't blur at 1× the way even-grid sets do. The vocabulary is unusual and useful: the Typography category covers letter-spacing, line-height, superscript and text-align at a depth no product set matches, and Design covers crop/mask/opacity/blend. That makes it excellent for design tools, editors and dev surfaces, and wrong for consumer product UI, where at 24px it goes spindly and underweight. Maintenance is minimal since the WorkOS acquisition — last push 2026-04, 62 open issues.
- **Use when:** building an editor, design tool, or a dense 16px-chrome surface. · **Don't use when:** you need marketing-scale icons or general product coverage.
- **Scores /5:** visual 4 · interaction 3 · a11y 4 · engineering 5 · maintenance 2 · docs 3 · customization 2 · perf 5 · stability 4 · originality 4
- **Evidence:** ★2,670 · last push 2026-04-02 · 4,645,123 wk npm (`@radix-ui/react-icons`) · MIT · 62 open issues · re-verified 2026-09-09
- **Looked at:** https://www.radix-ui.com/icons — the page itself is worth studying: a serif display headline ("A crisp set of 15×15 icons") over a live construction grid in mint and pink. The icon panel groups by Typography / Arrows / Design / Music / Objects, and the Typography row (Ss, AV kerning, ↓A baseline, ↕A leading) shows exactly how specialized the vocabulary is.
- **Vibecode risk:** low — almost nobody defaults to it, and the 1px weight looks nothing like the Feather family.
- **Link:** https://www.radix-ui.com/icons

### Solar — `situational`
- **What:** 7,608 icons in five variants — Bold, Broken, Duotone, Linear, Outline — from 480 Design.
- **Verdict:** The most tonally distinct large free set. The geometry is soft, corner radii are generous, and it reads consumer-mobile rather than enterprise-dashboard — genuinely useful when the product is a wellness app or a fintech consumer surface and Lucide feels too clinical. "Broken" (strokes with deliberate gaps) is a variant nobody else offers and is a cheap way to look non-generic. Two blockers: it's CC BY 4.0, so you owe attribution in the product, and the source repo has been quiet since 2025-06 — Iconify's mirror is the live distribution channel, not the repo. Coverage skews consumer/device and thins out in developer and enterprise concepts.
- **Use when:** consumer-facing product, warm brand, and you can carry a CC BY credit. · **Don't use when:** attribution is unacceptable or you need dev/enterprise vocabulary.
- **Scores /5:** visual 4 · interaction 3 · a11y 3 · engineering 3 · maintenance 2 · docs 2 · customization 4 · perf 4 · stability 3 · originality 4
- **Evidence:** ★375 (`480-Design/Solar-Icon-Set`) · last push 2025-06-23 · repo carries no SPDX license file (GitHub reports none); the CC BY 4.0 designation comes from Iconify's collection metadata, so **confirm attribution terms against the source before shipping** · 7,608 icons via Iconify (re-verified 2026-09-09; the earlier 7,401 was stale)
- **Looked at:** https://icones.js.org/collection/solar — 7,608 icons now, up ~200 since the last pass. The airpods and alarm-clock families run 5–6 device states × 5 variants each, and the variant switch shows how much the Bold weight changes the character: it goes from a light line set to something closer to a filled iOS-style glyph without redrawing the concept.
- **Vibecode risk:** low — nothing else in the free tier looks like the Bold or Broken variants.
- **Link:** https://icon-sets.iconify.design/solar/

### lucide-animated (pqoqubbw/icons) — `experimental`
- **What:** MIT animated versions of Lucide icons built on Motion, installed one icon at a time via `shadcn add @lucide-animated/<name>`.
- **Verdict:** The distribution model is the good idea here — you don't take a dependency, you copy the component into your repo, so the animation timing and easing become yours to tune. That matters, because default animated-icon libraries all animate too much and too slowly, and the fix is always editing the spring, not swapping the library. 8,062 stars in under two years with an active push in 2026-08 says this has real traction rather than launch-week attention. Keep it to two or three surfaces — a nav toggle, a copy-to-clipboard confirm, a theme switch — because animating every icon is a reliable way to make a product feel cheap.
- **Use when:** you want one or two icons to acknowledge interaction with craft. · **Don't use when:** you'd be tempted to animate the whole set, or you need coverage beyond Lucide's vocabulary.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 4 · maintenance 4 · docs 4 · customization 5 · perf 4 · stability 3 · originality 5
- **Evidence:** ★8,062 · last push 2026-08-22 · MIT · built on Motion + Lucide · npm distribution is per-icon via the shadcn registry, so aggregate download numbers aren't meaningful
- **Looked at:** https://icons.pqoqubbw.dev — restrained off-white page, monospace body copy, one orange accent. Icons sit in plain white cards with the name in light grey below; nothing on the page animates until you hover, which is the correct demo of a hover-animation library.
- **Vibecode risk:** medium — it is still Lucide underneath, so the glyphs carry Lucide's recognizability; the motion is what differentiates.
- **Link:** https://icons.pqoqubbw.dev

### Inter — `essential`
- **What:** Rasmus Andersson's UI grotesque: 2,000+ glyphs, 147 languages, weights 100–900 with three drawn masters, an optical-size axis (text→display), and a true italic.
- **Verdict:** Still the most carefully engineered free interface face, and the engineering is specific — tall x-height, ink traps and bridges at small sizes so counters don't fill in, contextual alternates that reshape punctuation based on neighbors, a slashed zero, and character variants for disambiguating I/l/1. The optical-size axis is the part people ignore and shouldn't: display sizes get tighter spacing and cleaner curves automatically. The honest caveat is cultural, not technical — Inter is the default of the default, so choosing it deliberately (for a data-dense tool where type should disappear) is correct and reaching for it by reflex is the tell. Development is effectively complete: last push 2024-11-19, ~22 months, which is fine for a finished typeface but means no new scripts are coming.
- **Use when:** density and legibility beat personality — dashboards, admin tools, anything with numbers. · **Don't use when:** the product needs a voice, or it's a marketing site.
- **Scores /5:** visual 4 · interaction n/a · a11y 5 · engineering 5 · maintenance 3 · docs 5 · customization 5 · perf 5 · stability 5 · originality 2
- **Evidence:** ★19,873 · last push 2024-11-19 · 3,393,387 wk npm (`@fontsource-variable/inter`) + 2,645,061 (`@fontsource/inter`) · OFL-1.1 · re-verified 2026-09-09
- **Looked at:** https://rsms.me/inter — the specimen is set in Inter at ~180px over a bare white page with a three-column body block; the "y" descender and the flat-terminal "t" are the giveaways. The site does one thing this corpus should copy: it states the numbers (2000 glyphs, 147 languages, three masters) instead of adjectives.
- **Vibecode risk:** high — not because it's bad, but because it is the unmarked case.
- **Link:** https://rsms.me/inter

### Fontsource + `next/font` — `essential`
- **What:** Fontsource packages 2,100 open-source families as npm modules for self-hosting; `next/font` downloads and self-hosts at build time with automatic fallback metric overrides.
- **Verdict:** This is the correct delivery layer for every OFL face in this file, and getting it wrong costs more than choosing the wrong typeface. `next/font` does the thing almost nobody hand-rolls: it computes `size-adjust`, `ascent-override` and `descent-override` for the local fallback so the swap produces zero layout shift, and it eliminates the third-party request entirely (which is also the clean answer to the EU Google Fonts CDN problem). Fontsource gives you the same self-hosted files with per-subset and per-weight granularity for non-Next stacks, and its variable packages (`@fontsource-variable/*`) are the ones to reach for — one file replaces nine. The failure mode to avoid: importing the full family when you use two weights, which is how a 12KB decision becomes 400KB.
- **Use when:** always, for any OFL face. · **Don't use when:** the license forbids self-hosting — Fontshare's ITF EULA does, and requires their API instead.
- **Scores /5:** visual n/a · interaction n/a · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 5 · stability 5 · originality 3
- **Evidence:** Fontsource ★6,114 (`fontsource/fontsource`) · last push 2026-09-06 · MIT · 2,100 families listed on fontsource.org (2026-09) · `next` 40,645,752 wk npm · re-verified 2026-09-09
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
- **Evidence:** Mona ★4,152 (`github/mona-sans`), last push 2026-05-19 · Hubot ★1,964 (`github/hubot-sans`), last push 2024-10-17 · both OFL-1.1 · three axes each (weight / width / slant), per GitHub's release announcement · re-verified 2026-09-09
- **Looked at:** https://github.com/mona-sans — the org specimen shows the width axis stepping from condensed to expanded at fixed weight, which is the feature. Note this is a GitHub org page, not a designed specimen site; the type is better than its presentation.
- **Vibecode risk:** low — almost nobody picks it, which is the whole argument.
- **Link:** https://github.com/mona-sans

### IBM Plex — `strong`
- **What:** IBM's OFL superfamily: Sans, Serif, Mono, Condensed, plus Sans Arabic/Devanagari/Thai/JP/KR.
- **Verdict:** The most complete free type *system* — when you need sans, serif and mono that were drawn to sit together, this is the only free answer that doesn't require mixing foundries. Still actively shipping (repo pushed the day I checked; a Plex Mono variable package released 2026-07-30), and the multi-script coverage is real, which matters if you're localizing. The character is corporate-Swiss with a distinctive flared "a" and squared-off Mono — it looks deliberate rather than default, though it also looks unmistakably like IBM to anyone in enterprise software. Plex Mono is a better UI mono than a better *code* mono; JetBrains Mono still wins in an editor.
- **Use when:** you need a coordinated sans/serif/mono system, or multi-script coverage, for free. · **Don't use when:** you're selling to enterprises who will recognize IBM's face.
- **Scores /5:** visual 4 · interaction n/a · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 5 · originality 3
- **Evidence:** ★11,633 · last push 2026-09-09 · latest release `@ibm/plex-mono-variable@1.0.0` (2026-07-30) · OFL-1.1 · re-verified 2026-09-09
- **Vibecode risk:** medium — recognizable, but recognizably a design decision rather than a default.
- **Link:** https://github.com/IBM/plex

### Editorial serifs — Instrument Serif / Fraunces / Source Serif / Newsreader — `strong`
- **What:** Four OFL serifs that solve different display problems: Instrument Serif (single-weight high-contrast display), Fraunces (9-axis variable with `SOFT` and `WONK`), Source Serif (Adobe's text serif, 6 weights + italics), Newsreader (screen-optimized news serif with optical size).
- **Verdict:** The single fastest way to stop looking generated is one serif headline over a sans body — and these four cover the range. Instrument Serif is the current favorite for a reason: it is one weight, very high contrast, and at 64px+ it does more for a landing page than any layout change, but it has exactly one job and falls apart below ~24px. Fraunces is the most flexible and the most dangerous — the `WONK` axis toggles genuinely eccentric alternates, and used at default it reads playful in a way that fights a serious product. Source Serif is the workhorse: actually usable for body copy at 16px, still maintained (pushed 2026-09-09). Newsreader has an optical-size axis and is the right pick for long-form reading surfaces.
- **Use when:** display headlines, editorial surfaces, or anywhere you need warmth a grotesque can't give. · **Don't use when:** dense UI, tables, or anything under 16px (except Source Serif and Newsreader).
- **Scores /5:** visual 5 · interaction n/a · a11y 4 · engineering 4 · maintenance 3 · docs 2 · customization 4 · perf 5 · stability 4 · originality 5
- **Evidence:** Instrument Serif ★354, last push 2023-04-26, OFL-1.1 · Fraunces ★758, last push 2026-02-11, OFL-1.1 · Source Serif ★2,372, last push 2026-09-09, OFL-1.1 · Newsreader ★250 (`productiontype/Newsreader`), last push 2021-03-01, OFL-1.1. All four re-verified 2026-09-09. The stale dates on Instrument Serif and Newsreader reflect finished single-purpose faces, not abandonment — both are live on Google Fonts.
- **Vibecode risk:** low, with a caveat — Instrument Serif has become common enough in 2026 landing pages that it is starting to acquire its own tell. Fraunces and Newsreader have not.
- **Link:** https://fonts.google.com/specimen/Instrument+Serif · https://fonts.google.com/specimen/Fraunces

### Geist — `situational`
- **What:** Vercel's OFL family: Geist Sans, Geist Mono, and a newer Geist Pixel.
- **Verdict:** Competent and free, but less differentiated than its reputation suggests. The letterforms sit very close to Univers/Helvetica territory — the "e", "s" and single-story "a" have little that Inter or Switzer don't also have, and the metrics the specimen advertises (710 cap, 530 x-height) are unremarkable for a UI face. Geist Mono is the stronger half and holds up in a terminal. The real problem is positional: Geist + shadcn/ui + Tailwind + Lucide is now the single most identifiable AI-generated product stack in existence, so shipping default Geist is a louder signal than shipping default Inter. Choose it if you're on Vercel and want a coherent house system; don't choose it because it looks distinctive, because it doesn't.
- **Use when:** Vercel-native products, or you want Geist Mono specifically. · **Don't use when:** you're trying to look unlike every other 2026 SaaS landing page.
- **Scores /5:** visual 3 · interaction n/a · a11y 4 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 5 · stability 5 · originality 2
- **Evidence:** ★3,619 · last release v1.7.2 (2026-06-01) · last push 2026-07-14 · 2,019,311 wk npm (`geist`) · OFL-1.1 · note the release list is not monotonic — a tag `1.8.0` sits at 2026-03-03, *earlier* than v1.7.2, so "latest release" here is a tagging artifact rather than a version story
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
- **Scores /5:** visual 5 · interaction n/a · a11y 2 · engineering 3 · maintenance 4 · docs 3 · customization 2 · perf 5 · stability 4 · originality 5
- **Evidence:** **`rektdeckard/departure-mono` ★3,464, MIT, last push 2026-09-10, latest release v1.500 (2025-05-25)** — the repo is one `gh api search/repositories?q=departure+mono` away; the previous pass's "unresolvable" note was a search failure, not a missing repo. MIT means you can self-host, subset and ship it commercially with no attribution obligation.
- **Looked at:** https://departuremono.com — the specimen page is the best-designed thing I looked at in this whole category: a punch-hole memo mockup with sage-green highlighter marks, a QR-annotated research report on kraft paper, and an access card, all set in the face. It sells the font by showing a world it belongs in rather than a glyph grid.
- **Vibecode risk:** low
- **Link:** https://departuremono.com · https://github.com/rektdeckard/departure-mono

### Monaspace — `strong`
- **What:** GitHub Next's OFL code superfamily: five families (Neon, Argon, Xenon, Radon, Krypton) that share metrics, plus texture healing and variable weight/width/slant axes.
- **Verdict:** Added in the challenge pass — the previous version covered GitHub's Mona and Hubot Sans and somehow skipped GitHub's mono, which is the more interesting release of the two. Texture healing is the actual engineering claim: in a monospace, an `i` and an `m` get the same advance, so the `i` floats in whitespace and the `m` is cramped. Monaspace redistributes the ink *within* the fixed advance so the letterfit reads like a proportional face while the grid stays intact. Nothing else free does this. The five families sharing metrics is the second good idea — you can set comments in Radon (handwriting), strings in Xenon (serif), code in Neon, and nothing reflows. It is 19,627 stars and OFL, so self-host it freely. The honest caveat is cadence: v1.400 in 2026-03, nothing since, and GitHub Next is a research org, so budget for this being a finished artifact rather than a maintained one.
- **Use when:** a code surface is part of the product's identity — a terminal, a diff view, a docs code block, a log console. · **Don't use when:** you want a mono nobody has to think about; JetBrains Mono is the boring correct answer there.
- **Scores /5:** visual 5 · interaction n/a · a11y 4 · engineering 5 · maintenance 3 · docs 4 · customization 5 · perf 4 · stability 4 · originality 5
- **Evidence:** ★19,627 (`githubnext/monaspace`) · last push 2026-03-27 · last release v1.400 (2026-03-28) · OFL-1.1 · verified 2026-09-09
- **Looked at:** https://monaspace.githubnext.com — I captured this myself. Near-black ground with a dot grid, the wordmark rendered as an outlined path with its bezier control points exposed, and a version stamp (`v1.400`) set in the face. Below the fold it runs live code lines at display size in three colours to show texture healing at a scale where you can actually see it. Two buttons, no marketing copy. It is the rare specimen site that argues with evidence.
- **Vibecode risk:** low — no generator defaults to it, and the five-family split is a decision a template can't fake.
- **Link:** https://monaspace.githubnext.com

### Atkinson Hyperlegible Next — `situational`
- **What:** The Braille Institute's legibility-first sans, redrawn and extended in 2025 as a variable family (weight 200–800) with an italic and a Mono sibling.
- **Verdict:** Added in the challenge pass because the previous version's "best accessibility" pick for type was Inter, and that is popularity bias dressed as a verdict. Inter's disambiguation lives in optional character variants (`cv01`, `zero`) that almost nobody turns on; Atkinson bakes it into the default drawing — the letterforms that low-vision readers confuse (I/l/1, O/0, c/e, b/d) are differentiated by shape, aperture and terminal angle in the regular glyph set, not behind a feature flag. It was designed against actual low-vision testing rather than against a screenshot. It is not a general replacement for Inter — the personality is friendlier and looser than a neutral grotesque, and it will read slightly soft in a dense dashboard — but for anything with an accessibility commitment in writing, a public-sector audience, or a genuinely older user base, it is the defensible choice and Inter is not. OFL, on Google Fonts, on Fontsource.
- **Use when:** accessibility is a requirement rather than a value; public sector, healthcare, education, finance for older users. · **Don't use when:** maximum density in a data tool — Inter still wins there.
- **Scores /5:** visual 3 · interaction n/a · a11y 5 · engineering 4 · maintenance 4 · docs 3 · customization 3 · perf 5 · stability 4 · originality 4
- **Evidence:** live on Google Fonts as a variable family (`wght 200..800`, v7) — confirmed by fetching the `css2` endpoint 2026-09-09 · `@fontsource-variable/atkinson-hyperlegible-next` 11,615 wk npm · OFL-1.1 · note the old `googlefonts/atkinson-hyperlegible` repo (★326) has been dormant since 2021 — that is the *previous* family, not this one; take the release from Google Fonts or Fontsource, not that repo
- **Vibecode risk:** low — the adoption is low enough that it reads as a deliberate choice, which is exactly the argument.
- **Link:** https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next

### Iosevka — `situational`
- **What:** An OFL monospace generated from a config file: 20+ prebuilt variants, plus a build system that lets you pick per-glyph variant selectors and regenerate a custom family.
- **Verdict:** Added in the challenge pass — the file's mono coverage was JetBrains Mono in passing, Plex Mono, Berkeley Mono and Departure Mono, which misses the only mono in the category you can actually *author*. Iosevka's default is narrow (roughly 0.5em advance), which fits noticeably more code per line than JetBrains Mono, and the build config exposes hundreds of per-character variant choices — one-story vs two-story `a`, slashed vs dotted zero, curly vs straight `l`, ligature sets on or off — so a team can ship a mono that is provably nobody else's without commissioning one. That is the Berkeley Mono outcome for $0 and no license risk. The cost is real: the payoff requires running a Node build and hosting the output, which is more operational surface than an npm install. ★22,730 and shipping constantly (v34.8.1 in 2026-08).
- **Use when:** you want a distinctive mono without a commercial license, and someone on the team will own a font build step. · **Don't use when:** nobody will maintain the build config; take a prebuilt release or JetBrains Mono instead.
- **Scores /5:** visual 4 · interaction n/a · a11y 4 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 5 · originality 5
- **Evidence:** ★22,730 (`be5invis/Iosevka`) · last push 2026-09-08 · last release v34.8.1 (2026-08-22) · OFL-1.1 · verified 2026-09-09
- **Vibecode risk:** low — a generator will never produce a custom Iosevka build, and even the default narrow advance looks nothing like the Geist/JetBrains default.
- **Link:** https://typeof.net/Iosevka/

### Bricolage Grotesque — `situational`
- **What:** An OFL variable display grotesque with weight, width and optical-size axes, plus a `GRAD` axis.
- **Verdict:** Added in the challenge pass as the display-sans counterpart to the editorial-serif entry. The file's answer to "stop looking like a template" was a serif headline, which is correct but is now itself becoming common — Instrument Serif over a sans body is a 2026 landing-page cliché the file already flags. Bricolage is the other route: it is a *sans* with genuine irregularity (slightly wonky curves, an odd `g`, tight apertures), so it gives a headline personality without the editorial register a serif imposes. The optical-size axis means the display cut and a subhead cut come from the same file. 168,234 weekly Fontsource installs says it is being adopted but is nowhere near Inter/Geist saturation. The repo is stale (last push 2023-10), which is normal for a finished single-designer face and matches how this file already treats Instrument Serif and Newsreader.
- **Use when:** display headlines where a serif would be too formal. · **Don't use when:** body copy, tables, or anything under ~20px — the irregularity that makes it work large makes it noisy small.
- **Scores /5:** visual 4 · interaction n/a · a11y 3 · engineering 4 · maintenance 2 · docs 2 · customization 4 · perf 5 · stability 4 · originality 4
- **Evidence:** ★453 (`ateliertriay/bricolage`) · last push 2023-10-09 · OFL-1.1 · 168,234 wk npm (`@fontsource-variable/bricolage-grotesque`) · verified 2026-09-09
- **Vibecode risk:** low, trending toward medium — adoption is climbing fast enough that it is worth re-checking in six months.
- **Link:** https://fonts.google.com/specimen/Bricolage+Grotesque


## Rejected / avoid
- **Hugeicons** — advertises "60,000+ icons," which is roughly 6,700 concepts multiplied by nine style axes; in the grid I captured, nine of every ten tiles carry a yellow PRO badge, so the free tier is effectively one style (Stroke Rounded). 24,073 weekly npm and a React repo (`hugeicons/hugeicons-react`, ★53, pushed 2026-06-15) with one open issue. Iconify mirrors 5,979 Hugeicons glyphs as MIT, which is the free Stroke Rounded style only — consistent with the paywall reading, not a refutation of it. It is a paid product wearing open-source clothing; an agent that treats it as a free set will hit a paywall mid-build.
- **Font Awesome** — 76,914 stars (verified 2026-09-09; repo pushed 2026-07-15, GitHub reports the license as NOASSERTION, which is itself the tell) is distribution, not taste. The free SVGs are CC BY 4.0, meaning attribution is legally required in your product and essentially nobody complies. The drawing is a decade old, the icon-font delivery model is obsolete against inline SVG, and Pro upsells are woven through the docs. There is no reason to start a 2026 product on it.
- **Feather** — the origin of the entire modern stroke-icon look, and now a maintenance risk: 25,991 stars, last push 2025-03-11, 510 open issues (all re-verified 2026-09-09 — 18 months dormant and still not archived, which is the worst signal a repo can send). Lucide is its living fork. Study Feather's grid decisions; install Lucide.
- **SF Symbols** — the license permits use only in UI for software running on Apple's platforms, forbids use in app icons/logos/trademarks, and Apple does not sell a license for anything else. Not usable on the web or Android under any reading. Reference-only.
- **react-useanimations** — last push 2024-06-12, 27 months. Use lucide-animated instead.
- **react-icons** — 7,837,644 weekly downloads (verified 2026-09-09) and still the wrong default: it bundles dozens of sets under one API, which makes it trivially easy to ship three different stroke weights in one navbar. Use Iconify if you need multi-set access; it does the same job with build-time tree-shaking and a much better browser.
- **Lordicon and paid Lottie icon marketplaces** — animated icon sets sold by the thousand are a trap: the animations are built to demo well in a grid, not to acknowledge a click in 180ms, and JSON Lottie payloads cost far more than an SVG with a CSS transition. If you want motion, take lucide-animated and tune it.
- **Google Fonts CDN (`fonts.googleapis.com`)** as a delivery mechanism — not the fonts, the CDN. Third-party DNS + TLS on the critical path, unreliable preloading, and a live GDPR question in the EU. Same faces, self-hosted, are strictly better.

## What surprised me
- **Remix Icon quietly stopped being Apache-2.0 — confirmed by reading the file.** `raw.githubusercontent.com/Remix-Design/RemixIcon/master/License` opens with "Remix Icon License v1.0 / Version 1.0 – January 2026 / Copyright (c) 2017–2026 Remix Design", GitHub's own API reports the license as NOASSERTION, and **Iconify's collection metadata still says "Apache 2.0"** — so anything reading license from Iconify (which is a lot of tooling) is currently reporting the wrong license — a bespoke license that still permits commercial use and modification but prohibits redistributing the icons as a standalone pack. It is not OSI-approved and will not resolve in SPDX tooling, which means it may fail an automated corporate license scan that Apache-2.0 passed a year ago.
- **Font Awesome's free icons require attribution.** They are CC BY 4.0, not MIT — verified in the repo's own LICENSE.txt. The fonts are OFL and the code is MIT, but the SVG/JS icons are CC BY. This is one of the most widely violated licenses in web development.
- **Heroicons hasn't cut a release since November 2024** — just under 22 months — despite being the Tailwind team's own icon set and still doing 3.6M weekly downloads. It reads as finished rather than abandoned, but nobody talks about it as a stale dependency, and it is one.
- **Material Symbols' Grade axis has no equivalent anywhere else.** Every set tells you to use a heavier weight in dark mode; Grade lets you thicken strokes *without* changing the glyph's advance width, so nothing in the layout shifts. It is the single most useful icon feature I found and almost nobody uses it.
- **Fontshare fonts cannot legally be self-hosted without written consent.** The families are labeled "Closed Source" right in Fontshare's own listing UI. Every "best free fonts" article recommends downloading and self-hosting Switzer and Satoshi; the EULA says to use their API. Teams are shipping in violation of this without knowing.
- **Iconify is more than twice the size the last pass thought.** The API reports **238 collections and 361,898 icons**, not "180+ / 200k+". The earlier figure came from counting rows in the icones.js.org sidebar, which lists a subset. Always hit `api.iconify.design/collections` for a census.
- **Iconify's own license metadata can be wrong.** Its `ri` (Remix Icon) collection still reports "Apache 2.0" months after Remix's LICENSE file became a bespoke non-OSI license. Any tool that reads license from Iconify is reporting a stale answer, and that includes a lot of icon-picker and audit tooling.
- **A push date is not a maintenance signal.** Phosphor's repos show a 2026-01 push; the commits are a README sync and a link addition. Solar, Bootstrap Icons and Phosphor all look healthier by push date than by last-release date or last-substantive-commit. Check the log, not the badge.
- **Simple Icons is the CC0 answer to a problem this file had and didn't name.** 3,459 brand marks, no attribution, weekly releases — while Font Awesome's equivalent icons are CC BY and Lucide's are behind an opt-in Lab collection.
- **Phosphor's flat terminals are a legibility decision, not a style one.** Round caps at 2px eat roughly a pixel of length at each end, which is why Feather-lineage icons soften at 16px and Phosphor's don't. The set that looks the most "designed" is also the one that measures better small.

## Open questions
- **Exact current pricing for Berkeley Mono, Söhne, ABC Diatype and GT America.** All four render price tables client-side or behind a Cloudflare challenge; I could read license *structure* but not figures. Settling this needs a manual browser session on each checkout, or a foundry quote request.
- ~~**Untitled UI Icons' real distribution and provenance.**~~ **Partly settled (2026-09 challenge pass):** `@untitledui/icons` exists on npm — MIT, 304,138 weekly downloads, v0.0.22 published 2026-03-24, 10 versions since 2025-02-07. Still no public repo and an empty `repository` field, so contributor count, issue queue and roadmap remain unverifiable. Open remainder: is there a private repo and a support channel behind a package with six-figure weekly installs?
- ~~**Departure Mono's license SPDX and repository.**~~ **Settled (2026-09 challenge pass):** `rektdeckard/departure-mono`, MIT, ★3,464, last push 2026-09-10, latest release v1.500 (2025-05-25). No commercial-use restriction.
- ~~**Whether Phosphor's slow release cadence is a policy or a signal.**~~ **Settled against Phosphor (2026-09 challenge pass):** reading the commit log rather than the push date, the only 2026 commits to `core` and `react` are `chore(docs): sync readme section` and "Add Elixir, Phoenix, and Ash icons link." Last substantive change: 2025-05. Maintenance dropped 3 → 2. It stays `essential` on drawing quality, but plan for it as a vendored artifact.
- **Real-world adoption claims.** I deliberately verified none beyond the self-evident (Vercel publishes Geist, GitHub publishes Mona Sans, Tailwind Labs publishes Heroicons, shadcn/ui's docs import `lucide-react`). Any "used by X" claim in this category should be checked against the actual served CSS, not against a marketing showcase.

## Challenge pass (2026-09)

Adversarial re-verification on 2026-09-09. Every `essential` and `strong` entry was re-checked against `gh api repos/...`, `api.npmjs.org/downloads/point/last-week/...`, the GitHub releases API, raw LICENSE files, and `api.iconify.design/collections`. Four interfaces were screenshotted and looked at directly rather than described from memory.

**What held up.** Most of it, and the numbers were unusually good. Lucide's ★24,438 / 1.43.0 on 2026-09-08 / 86.9M weekly is exact (86,866,524). Tabler, Heroicons, Radix, Geist, Fontsource, Inter, Plex, Mona/Hubot, Fraunces, Source Serif, Instrument Serif, Newsreader and Font Awesome all matched to rounding. The most load-bearing and most surprising claim in the file — that Remix Icon silently left Apache-2.0 — is **confirmed by reading the raw LICENSE**, which opens "Remix Icon License v1.0 / Version 1.0 – January 2026." Lucide's ISC (not MIT) is confirmed from the LICENSE file. Font Awesome Free's CC BY status, the Fontshare "Closed Source" labelling, the Material Symbols Grade argument, and the Klim per-axis licence structure all survive.

**Corrections made.**
- Iconify: "200k+ icons / 180+ collections" → **361,898 icons across 238 collections** (API-verified). The old figure was a sidebar count, not a census. Category census table rewritten from the API.
- Material Symbols 15,577 → **15,618**. Solar 7,401 → **7,608**. Lucide 1,818 → **1,816**. Heroicons 316 → **324** (counted directly in `optimized/24/outline`).
- Solar's CC BY 4.0 is Iconify metadata, not a repo LICENSE — the repo carries no SPDX file. Flagged as needing confirmation at the source before shipping attribution.
- Geist's release list is non-monotonic (a `1.8.0` tag predates `v1.7.2`); noted so nobody reads it as a version story.
- All rounded npm figures replaced with exact week-ending-2026-09-06 numbers.

**Demotions and hardening.**
- **Phosphor — maintenance 3 → 2.** The 2026-01 push that made it look alive is two docs commits. The last substantive change to `core` or `react` was 2025-05, ~16 months. Tier held at `essential` (the six-drawn-weights argument is real and unique), but the entry now says to treat it as a vendored artifact. This was the pass's clearest case of a push date standing in for maintenance.
- **Untitled UI Icons — vibecode medium → high; visual 5 → 4, originality 4 → 3, stability 3 → 2.** I captured the grid myself at 1440 and 390: `activity` is Lucide's activity waveform, `activity-heart` is Lucide's heart-pulse, caps and joins are round, grid is 24. "The free set that looks most expensive" was inherited from Untitled UI's own marketing. A lighter stroke is a weight change, not an identity change — and at 304k weekly installs it is now a common substitution *inside* AI-scaffolded templates, which is the opposite of an escape.
- Researcher note now warns explicitly that a lighter-stroke Feather clone is still a Feather clone.

**Promotions / corrections in the other direction.**
- **Untitled UI — engineering 3 → 4.** The file said "no first-party React package." There is one: `@untitledui/icons`, MIT, **304,138 weekly downloads**. That was a search failure, not an absence. It is still v0.0.22 with an empty `repository` field, which is now recorded as the real risk.
- **Departure Mono — maintenance 3 → 4, stability 3 → 4.** The file marked the repo "not resolvable" and the license "unverified." It is `rektdeckard/departure-mono`, **MIT, ★3,464, pushed 2026-09-10**, one search away. Open question closed.

**Additions (6).** Searched deliberately outside the listicle set, weighted toward non-React and 2025–26.
- **Simple Icons** (`strong`) — 3,459 brand marks, **CC0-1.0**, weekly releases, 802k wk npm. The file explicitly noted Lucide spun brand logos into an opt-in Lab collection and then never said where logos should come from. CC0 beats Font Awesome's CC BY for exactly the icons people use Font Awesome for. Screenshotted; the per-brand official-hex chips and brand-guidelines links are a real feature.
- **Monaspace** (`strong`) — GitHub's five-family OFL code superfamily with texture healing, ★19,627. The file covered GitHub's Mona and Hubot Sans and skipped GitHub's mono, which is the better release. Screenshotted.
- **Atkinson Hyperlegible Next** (`situational`) — the file's "best accessibility" type pick was Inter, whose disambiguation lives in opt-in character variants nobody enables. Atkinson bakes it into the default drawing and was tested against low-vision readers. Confirmed live on Google Fonts as a variable family (v7, `wght 200..800`) by fetching the `css2` endpoint.
- **Iosevka** (`situational`) — ★22,730, v34.8.1 (2026-08). The only mono you can author rather than pick; gets the Berkeley Mono outcome at OFL and $0.
- **Bricolage Grotesque** (`situational`) — OFL variable display sans, 168k wk Fontsource installs. The file's anti-generic move was a serif headline, which it also flags as becoming a cliché; this is the sans route to the same goal.
- **Bootstrap Icons** (`situational`) — 2,078 MIT icons, sprite + webfont + raw SVG, 538k wk npm. The file was React-shaped throughout; this is the framework-free option. Noted that the last tagged release is v1.13.1 (2025-05) despite daily pushes.

**Vibecode column.** Mostly honest already — the file is willing to call Lucide, Geist and Material Symbols high risk while still ranking them highly, which is the right posture. One entry was soft (Untitled UI, corrected above) and one addition needed a note it wouldn't have got by default (Bricolage: low *trending toward* medium). Simple Icons is marked `n/a` deliberately: using real brand marks instead of a stroke-set approximation is an anti-vibecode move, not a neutral one.

**Still open.** Berkeley Mono / Söhne / ABC Diatype / GT America pricing (client-side tables and a Cloudflare challenge — unchanged, needs a manual browser session). Untitled UI's private repo and support channel. Whether Solar's CC BY designation is authoritative or Iconify-supplied.
