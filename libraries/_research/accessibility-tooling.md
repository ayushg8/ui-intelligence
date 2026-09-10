# Accessibility: Standards, Tooling and Real Practice

**Evaluated:** 2026-09 · **Researcher note:** The tooling is fine and the web is getting worse — WebAIM's 2026 Million found 95.9% of home pages with detected WCAG 2 failures (94.8% in 2025) and 56.1 errors per page, up 10.1% year over year, with the same six error types for the seventh straight year. Meanwhile the law hardened in one direction and softened in another: the EAA has been enforceable since 28 June 2025, while a US Interim Final Rule in April 2026 pushed ADA Title II's web deadlines out to 2027/2028. The gap in this category is not detection — it is that automation tops out near **53%** of issue volume (see the correction to Deque's much-quoted 57% below) and nobody has built a good tool for the other 47%. WebAIM's own conclusion names the cause: the 2026 regression "likely reflect[s] broader shifts in web development including increased reliance on 3rd party frameworks and libraries and automated or AI-assisted coding practices (“vibe coding”)" — the first time the flagship industry dataset has blamed generated code in print.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| axe-core | `essential` | The engine under nearly everything; low false positives, honest about its own ceiling. | medium |
| @axe-core/playwright + ARIA snapshots | `essential` | The only a11y test that runs against your real app in CI and doesn't rot. | low |
| Accessibility Insights for Web | `essential` | Free, Microsoft-maintained, and the Tab Stops visualiser is the fastest keyboard audit in existence. | low |
| WCAG 2.2 + Understanding docs | `essential` | The legal benchmark in every jurisdiction that has one. Read Understanding, not the SC text. | low |
| eslint-plugin-jsx-a11y | `strong` | Catches div-buttons before they exist. No npm release in 23 months; still correct. | low |
| Biome / oxlint a11y rules | `strong` | 39 and 36 ported rules, maintained weekly, ~50x faster. The maintained replacement nobody announced. | low |
| @storybook/addon-a11y | `strong` | Component-level axe with a Vitest path; the only tool that catches issues per-variant. | low |
| jest-axe | `strong` | Boring, current (v11, Jul 2026), one assertion. Use it on primitives, not pages. | low |
| ARIA APG | `strong` | Authoritative for keyboard contracts. Do not ship its example code. | high |
| Polypane | `strong` | Paid browser that surfaces a11y, reflow and user-preference states while you build. | low |
| Guidepup | `situational` | Actually drives VoiceOver and NVDA from JS. Six contributors. The only thing in its lane. | low |
| Pa11y | `situational` | Right for crawling many URLs of server-rendered HTML in CI. Wrong default engine. | medium |
| Lighthouse (a11y category) | `situational` | Useful signal, terrible gate. A 100 here means roughly nothing. | high |
| APCA / apca-w3 | `reference-only` | Better perceptual model, removed from WCAG 3 in 2023, no legal standing. Study it, don't ship it. | — |
| vitest-axe | `avoid` | 752k weekly downloads on a 0.1.0 published in October 2022. Use jest-axe. | — |
| Accessibility overlays (accessiBe, UserWay, AudioEye widgets) | `avoid` | Sued repeatedly, disliked by actual screen reader users, and they mask the real defects. | — |
| axe MCP Server (Deque) | `avoid` | Paid axe DevTools subscription + Docker + API key to do what `npx axe` does free. | — |
| cypress-axe | `strong` | 615k/wk and absent from every "best of" list. Same axe rules, Cypress-shaped. | low |
| Non-React a11y linting (vuejs-accessibility, lit-a11y, Svelte compiler) | `strong` | The lint layer exists outside React and this file previously pretended it didn't. | low |
| IBM Equal Access Accessibility Checker | `situational` | The only maintained second engine. ACT-aligned, Apache-2.0, better lifecycle docs than Deque. | low |
| W3C ARIA-AT | `reference-only` | The interop data behind "does this actually work in JAWS". Not a tool you run. | — |
| Silktide extension | `situational` | Free, genuinely good AT simulator — attached to a demo-gated enterprise platform. | medium |

## Recommendations by need
- **Default choice:** axe-core, run three ways — `eslint-plugin-jsx-a11y` (or Biome) at author time, `@storybook/addon-a11y` per component, `@axe-core/playwright` per route in CI. Same rule IDs at all three layers, so a fix at the lint layer removes a CI failure you can trace.
- **Best engineering:** axe-core. 4.13.0 (Aug 2026) is the first accessibility engine to support `ElementInternals`, which is how modern web-component libraries expose labels and roles — everything else silently reports those components as unlabelled. It also closed 10 false positives in that release, which matters more than new rules: a scanner that cries wolf gets muted.
- **Best visual quality out of the box:** Polypane. It is the only tool here designed by someone who cares what the panels look like, and the multi-pane view showing reduced-motion, forced-colors, dark mode and 320px reflow simultaneously is a genuinely better idea than a report.
- **Best accessibility (of the tools themselves):** Accessibility Insights for Web. It is the only one whose guided-test flow assumes you will need to complete it with a keyboard.
- **Most customizable / least house-style:** Pa11y — swap the engine to axe, feed it a URL list, get JSON. No dashboard, no account, no opinions.
- **Not on React:** the lint layer still exists — `eslint-plugin-vuejs-accessibility` (385k/wk) for Vue, `eslint-plugin-lit-a11y` (63k/wk) for Lit and web components, and Svelte's compiler, which emits a11y warnings with no plugin at all. An earlier draft of this file treated "a11y linting" as a React-only concern; that was React-default bias, not a finding.
- **Lightest:** `eslint-plugin-jsx-a11y` in whatever linter you already run. Zero runtime cost, catches the largest single class of AI-generated failure (`<div onClick>`) before the code compiles.
- **Promising newcomer:** Guidepup — the only library that drives a real screen reader (VoiceOver on macOS, NVDA on Windows) from a Playwright or Jest test and asserts on what was actually spoken. Six contributors, so do not make it a required gate.
- **Already on Cypress:** `cypress-axe` — 615,193 weekly downloads, the same axe-core rule IDs as every other layer here, and it appears in essentially no listicle because the listicles are written by Playwright users. Verified active (repo pushed 2026-09-03).
- **Premium/paid worth it:** Polypane, for anyone who builds UI daily. Deque's paid tier (axe DevTools Pro, axe MCP Server) is worth it only for a team already buying Deque audits.

---

## The baseline: 15 checks that catch ~90% of real failures

Ordered by how often they actually fire. 1–8 are non-negotiable on every screen.

1. **Every interactive thing is a real element.** `<button>`, `<a href>`, `<input>`, `<select>`, `<summary>`. Never a `div` with `onClick`. Adding `role="button" tabIndex={0}` is not a fix — you then owe Enter *and* Space handlers, `:focus-visible`, and disabled semantics, and you will get one of them wrong.
2. **Every form control has a programmatic name.** `<label for>` or a wrapping `<label>`. A `placeholder` is not a label; it disappears on focus and is exempt from contrast rules in most implementations. 51% of the WebAIM Million fails this.
3. **Contrast, three thresholds not one.** Body text ≥ 4.5:1. Large text (≥ 24px, or ≥ 18.66px bold) ≥ 3:1. **Non-text**: input borders, icons, focus rings, chart strokes, toggle tracks ≥ 3:1 (SC 1.4.11) — this is the one everyone skips. Check the disabled, placeholder and hover states too. Low contrast is on 83.9% of home pages and got worse this year.
4. **State is never carried by color alone.** Validation, selection, required, active tab, chart series, status dots — each needs a second channel: icon, text, weight, underline, or position (SC 1.4.1).
5. **Visible focus on everything focusable.** Ring ≥ 3:1 against what it sits on, not clipped by `overflow: hidden`, and never `outline: none` without a replacement. Use `:focus-visible` for the keyboard-only ring; leave a `:focus` style in place for programmatically-focused containers.
6. **Keyboard-walk the primary task.** Tab, Shift+Tab, Enter, Space, Escape, arrows. Nothing unreachable, nothing trapped except a modal (which must trap deliberately, close on Escape, and return focus to its trigger). Do this before you run any scanner — it takes 90 seconds and finds things axe cannot.
7. **Move focus on route change.** On client-side navigation, focus the new page's `<h1>` or a `tabindex="-1"` container and update `document.title`. Without it, a screen reader user stays parked on the link they clicked in a page that no longer exists. This is the single most common failure in AI-generated SPAs and no automated scanner detects it.
8. **Structure: one `<h1>`, no skipped levels, real landmarks.** `<header> <nav> <main> <footer>`, plus a skip link to `#main` as the first focusable element. Heading level communicates nesting; do not pick `<h3>` because it is the size you wanted.
9. **Images and icon buttons.** Meaningful image → alt describing its *function* in context. Decorative → `alt=""`, never omitted. Icon-only button → an accessible name (visually hidden text preferred over `aria-label`, see below).
10. **Target size ≥ 24×24 CSS px** with spacing (SC 2.5.8, new in 2.2). 44px is the practical floor on touch. Icon buttons at 32px with a 16px glyph are the usual offender.
11. **Errors are announced, associated, and specific.** `aria-invalid="true"` on the field, `aria-describedby` pointing at the message, message text adjacent to the input, and on submit move focus to an error summary. "Invalid input" is not a message.
12. **Exactly one live region, used sparingly.** `role="status"` (polite) for toasts and async results, `role="alert"` (assertive) for genuine errors. The region must exist in the DOM before the text is injected. Do not sprinkle `aria-live` across a dashboard — you will produce continuous speech.
13. **`prefers-reduced-motion: reduce`** kills transforms, parallax, autoplay, and anything that moves more than a few pixels. Keep short opacity fades. Do not use the blunt `*{animation:none!important}` reset: it stops loading spinners, which then communicate nothing.
14. **Reflow.** 320px viewport width and 200% browser zoom, no horizontal scroll, no clipped content, no two-finger panning (SC 1.4.10 / 1.4.4). This is the check that breaks tables, sticky toolbars and modals.
15. **`lang` on `<html>`, unique `<title>` per route, and survive forced colors.** In Windows High Contrast, `box-shadow` and `text-shadow` become `none` and `background-image` is dropped — so any component whose only visible boundary is a shadow disappears. Test with `@media (forced-colors: active)` and add a `1px solid ButtonText` border where you relied on elevation.

## What AI-generated UI gets wrong, ranked by frequency

**The vibecode risk in this category is not aesthetic — none of these tools impose a house style — it is false confidence, and it is now measurable.** WebAIM's 2026 Million reversed eight years of gradual improvement and named AI-assisted coding as a likely cause. The specific mechanism is visible in the same dataset: pages using ARIA average **59.1** detected errors against **42.0** without, ARIA volume grew **27%** in one year, and `aria-hidden="true"` usage is up 250% since 2020. Generated code reaches for ARIA as a substitute for semantics, then a scanner goes green because ARIA satisfies the scanner. The three highest-risk artifacts in this file are therefore **Lighthouse's score** (`high`), **the APG's copy-pasteable examples** (`high`) and **a clean axe run** (`medium`) — in each case the tool is fine and the number it produces is what does the damage. Any tool whose output is a grade rather than a list of violations should be treated as a vibecode amplifier.

These are the specific failures to check for in generated code, including your own:

- **`<div onClick>` / `<div role="button">`** with no key handler, no focusability, no disabled state.
- **`aria-label` overuse.** Three distinct bugs in one habit: (a) `aria-label` on an element with no role is ignored entirely; (b) `aria-label` *overrides* visible text, so a button reading "Save" labelled "Save your changes to the document" breaks voice control — the user says "click Save" and nothing happens (SC 2.5.3 Label in Name); (c) it is invisible to sighted keyboard users and untranslated by most i18n pipelines. Prefer visible text, then a visually-hidden `<span>`, and reach for `aria-label` last. WebAIM found pages *with* ARIA average 59.1 errors versus 42 without — more ARIA correlates with more failures, not fewer.
- **12–13px gray secondary text.** `text-gray-400` (#9ca3af) on white is 2.85:1. `text-gray-500` (#6b7280) is 4.83:1 and passes. Tailwind's 400-level grays on white fail body text everywhere; agents reach for them because they look calm in a screenshot.
- **`outline: none` on inputs**, replaced by a colored border ring that is under 3:1 against the surrounding surface.
- **Focus never moves on client-side navigation** (see #7 above).
- **Modals** built without a focus trap, without `aria-modal="true"` + `role="dialog"` + an accessible name, without Escape, and without restoring focus to the trigger on close. Use `<dialog>` or a real primitive; do not hand-roll this.
- **Toasts** rendered into a portal with no live region — visually present, silent to AT.
- **Custom selects/comboboxes from divs**: no roving tabindex, no type-ahead, no `aria-activedescendant`, arrow keys scroll the page instead of the list.
- **Color-only validation**: red border, no icon, no message text.
- **Skeleton loaders** with no `aria-busy` and no status text, so the page is silently empty for 800ms.
- **`tabindex="0"` on non-interactive wrappers**, creating junk tab stops; and `tabindex` values > 0, which reorder the whole document.
- **Nested interactives**: a `<button>` inside an `<a>`, a card that is a link containing three more links.
- **Div tables** with no `role="table"` / `role="row"` / `<th scope>`, so column context is lost entirely.
- **Icon-only buttons** with the icon's `<svg>` carrying no `aria-hidden="true"`, producing "graphic" announcements next to the label.

## Contrast: APCA vs WCAG 2, and what to actually use in 2026

**Use WCAG 2 ratios for anything you ship.** They are the requirement in EN 301 549 (and therefore the EAA), in the ADA Title II rule, and in Section 508. WCAG 3 is a Working Draft whose own text says the contrast algorithm is "yet to be determined"; APCA was pulled from that draft in **July 2023** and never regained working-group consensus. Optimistic completion for WCAG 3 is around 2030.

**The real technical difference:**
- WCAG 2's ratio is a relative-luminance quotient. It is **symmetric** — swapping foreground and background gives the identical number — and it ignores font size and weight beyond one coarse large-text threshold. It is known to be miscalibrated at both ends: it is too permissive for mid-tone-on-dark and too strict for some light-on-mid pairs.
- APCA reports a signed **Lc** value (0 to 106 for dark-on-light, 0 to −108 for light-on-dark). Polarity matters, because human contrast perception is not symmetric. Its output feeds a lookup table of font size × weight, so 14px/700 and 24px/300 get different requirements — which is how a designer actually thinks.

**Where APCA earns its keep:** dark mode. WCAG 2 will happily pass hazy light-gray-on-near-black pairs that read badly and fail some pairs that read fine. If you are building a dark-first product, compute both, and when they disagree trust APCA about *perception* while still shipping a palette that clears WCAG 2 AA. That dual-constraint approach is exactly what Adrian Roselli recommends and it costs almost nothing.

**Practical:** this repo already ships `tools/contrast.mjs`, which does WCAG 2 ratios for `oklch()` and composites alpha over the background — that alpha handling is the part most online checkers get wrong for overlay-style border tokens. Use it on your token file, not on individual swatches: the useful output is which pairs of tokens you are permitted to combine.

## Standards and law, as of 2026-09

- **WCAG 2.2** is the current W3C Recommendation. Originally published October 2023, republished **12 December 2024**. Nine new success criteria (2.4.11 Focus Not Obscured, 2.5.7 Dragging Movements, 2.5.8 Target Size, 3.2.6 Consistent Help, 3.3.7 Redundant Entry, 3.3.8 Accessible Authentication, plus three AAA), and **4.1.1 Parsing was removed** — stop reporting on it.
- **WCAG 3.0** is a Working Draft. Not a standard, not a target, no adoption date. Anyone selling you WCAG 3 compliance in 2026 is selling you nothing.
- **European Accessibility Act**: enforceable since **28 June 2025**; 2026 is the first full year of national market surveillance. Applies to consumer-facing e-commerce, banking, transport booking, e-books and telecoms services sold into any member state regardless of where the seller is based. Current harmonised standard is EN 301 549 v3.2.1 (WCAG 2.1 AA). **EN 301 549 v4.1.1 — which incorporates WCAG 2.2 AA — was published 2 September 2026** and is expected to be cited in the Official Journal around November 2026, at which point 2.2 AA becomes the presumption-of-conformity benchmark. Microenterprises (< 10 staff and ≤ €2M turnover) are exempt for *services* only. Service contracts signed before June 2025 have until 28 June 2027; products lawfully in use until 2030. Penalties are set nationally: Germany €100k/violation, Spain €600k, Sweden ~€900k, Italy €40k plus up to 5% of annual turnover.
- **ADA Title II (US)**: an **Interim Final Rule in April 2026 extended the deadlines**. Public entities serving ≥ 50,000 people now have until **26 April 2027**; smaller entities and special district governments until **26 April 2028**. Standard is WCAG 2.1 AA. If your notes still say "April 2026," they are wrong.
- **Practical read:** build to WCAG 2.2 AA. It is a superset of 2.1 AA, it is where EN 301 549 is heading within months, and the delta is small and mostly good design anyway (target size, visible focus, don't make people re-enter data).

## Screen readers: the differences that actually bite

WebAIM Screen Reader Survey #10: NVDA is used by 65.6% of respondents and JAWS by 60.5%, but as a *primary* reader it is JAWS 40.5% / NVDA 37.7% / VoiceOver 9.7%. On mobile, 70.6% name iOS as their primary platform — that is a *platform* share, not a VoiceOver usage share, and it is routinely misquoted as the latter (this file included, before this pass). Narrator is the primary reader of only 0.7% but is commonly used by 37.3%. Regional split is stark: JAWS leads in North America (55.5% vs 24.0%), NVDA dominates Asia (70.8% vs 22.9%) and Africa/Middle East (69.9% vs 23.3%).

What that means when you test:
- **Test NVDA + Firefox and JAWS + Chrome first.** Those two combinations cover most desktop users. Safari + VoiceOver is a *mobile* priority, not a desktop one.
- **VoiceOver on macOS is the most forgiving** and will happily announce things NVDA and JAWS drop. Passing VoiceOver proves very little. It also handles `aria-live` differently from both Windows readers.
- **JAWS applies its own heuristics** — it will sometimes announce a plausible label for an unlabelled control by scavenging nearby text, hiding a defect that NVDA exposes as "button".
- **Virtual/browse mode is the thing developers forget.** In NVDA and JAWS, arrow keys read the document, not your component. Custom widgets must correctly move the reader into forms/application mode via roles; if they don't, arrow keys inside your listbox read the page instead.
- **`aria-live` reliability is genuinely inconsistent** across all three. Announce important state changes, but never make a live region the *only* way a user learns something.

## CSS user preferences worth wiring once

```css
@media (prefers-reduced-motion: reduce) { /* no transforms, no autoplay, keep short fades */ }
@media (prefers-contrast: more)        { /* thicken borders, drop tints toward pure fg/bg */ }
@media (forced-colors: active)         { /* shadows and background-images are gone — add real borders */ }
:focus-visible                         { /* keyboard ring; pair with a :focus fallback for -1 containers */ }
```
`forced-colors` has been Baseline-widely-available since September 2022. In that mode the browser overrides `color`, `background-color`, `border-color`, `outline-color`, SVG `fill`/`stroke`, and forces `box-shadow`, `text-shadow` and `background-image` to `none`. `forced-color-adjust: none` is the escape hatch — use it on brand marks and color swatches only, never on UI chrome.

---

## Scorecards

### axe-core — `essential`
- **What:** Deque's open-source accessibility rules engine. The detection layer inside Lighthouse, Storybook, Accessibility Insights, Chrome DevTools' Issues panel, and every `@axe-core/*` integration.
- **Verdict:** It has won so completely that "accessibility testing" now means "axe" to most teams, and the engineering justifies it — 231 contributors, monthly-ish releases, and an explicit design goal of near-zero false positives, which is the only reason anyone leaves it enabled. 4.13.0 (Aug 2026) is the first accessibility engine anywhere to support `ElementInternals`, so web-component libraries that expose labels via form-associated internals finally report correctly instead of as unlabelled. The honest caveat is Deque's own number, and this challenge pass found it is quoted everywhere without its two disqualifiers. The study (2,000+ audits, 13,000 pages, 294,958 issues) reports **57.38% of issues by volume** — but it was published **10 March 2021**, and its fourth-largest issue category is **SC 4.1.1 Parsing**, which WCAG 2.2 *deleted*. Strip Parsing out of Deque's own table (34,488 issues, 31,137 of them auto-detected) and the number recomputes to **53.0%** (138,105 / 260,470). It is also benchmarked against WCAG 2.1, so it predates 2.2's new criteria — target size, dragging movements, focus not obscured, redundant entry, accessible authentication — which are almost entirely manual. The real 2026 figure is therefore below 53%, not 57%. Everything in list 6 through 15 above is on you.
- **Use when:** Always, at every layer. · **Don't use when:** You are treating a clean axe run as a pass. It cannot see focus order, focus loss on navigation, meaningful alt text, reading order, or whether your keyboard flow makes sense.
- **Scores /5:** visual 3 · interaction 4 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 4 · stability 5 · originality 4
- **Evidence:** ★7,492 · last release v4.13.0 2026-08-05 · last push 2026-09-09 · 61,924,484 wk npm · 231 contributors · MPL-2.0 · 444 open issues (re-verified 2026-09-09) · used by Lighthouse, Storybook, Accessibility Insights, Chrome DevTools (all verified in their own docs/source)
- **Looked at:** https://dequeuniversity.com/rules/axe/4.13 — a dark-navy masthead over a saturated blue nav strip, then the actual artifact: a rules table with Rule ID / Description / Impact / Tags / Issue Type / ACT Rules columns, which is the most useful single page in this whole category because it maps every rule to a WCAG SC and an ACT rule ID. Typography is W3C-adjacent, unstyled, no rhythm. The right rail is a Deque upsell card claiming "up to 80% of accessibility issues" with axe DevTools Pro — a notably bigger number than Deque's own published 57% study, and worth knowing when someone quotes it at you.
- **Vibecode risk:** medium — not visually, but culturally. A clean axe run is the most common form of accessibility theatre, and an agent that stops there ships a product that fails a real user in the first thirty seconds.
- **Link:** https://github.com/dequelabs/axe-core

### @axe-core/playwright (+ Playwright ARIA snapshots) — `essential`
- **What:** axe-core bound to Playwright's page object, plus Playwright's own `expect(page).toMatchAriaSnapshot()`, which serialises the computed accessibility tree to YAML.
- **Verdict:** This is where a11y testing stops being a checkbox and becomes a regression suite. Running axe per-route against the real app catches what component tests can't (composition, portals, real routing), and `toMatchAriaSnapshot` — now out of experimental — is the sleeper feature: it asserts on roles and accessible names, so a refactor that turns a `<button>` into a `<div>` fails the test while a color change does not. That is the opposite failure mode from visual snapshots, and it is the right one. Use both: axe for rule violations, aria snapshots for structure. 9.08M weekly downloads means it is already the default.
- **Use when:** Any app with a Playwright suite — one axe scan per major route, plus an aria snapshot on your two or three most complex widgets. · **Don't use when:** You want per-component granularity; that belongs in Storybook.
- **Scores /5:** visual — · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 5 · originality 4
- **Evidence:** `@axe-core/playwright` v4.13.0 2026-08-11 · 9,082,376 wk npm · repo `dequelabs/axe-core-npm` ★722, 39 contributors, MPL-2.0, last push 2026-09-02 · aria-snapshot support documented at playwright.dev/docs/aria-snapshots
- **Looked at:** the Playwright aria-snapshots docs — the YAML output format (`- button "Submit"`, nested by structure) is readable enough to review in a PR diff, which is the entire argument for it over a DOM snapshot.
- **Vibecode risk:** low.
- **Link:** https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright

### Accessibility Insights for Web — `essential`
- **What:** Microsoft's free Chrome/Edge extension. FastPass (automated axe scan + a Tab Stops visualiser), an Assessment mode with ~20 guided manual tests, and an ad-hoc tools panel.
- **Verdict:** The best free thing in this category and consistently under-recommended because Microsoft markets it badly. **Tab Stops** is the feature: it draws numbered circles and connecting lines over the page as you tab, so focus order and focus loss become visible in about ten seconds — the single fastest way to find the failures axe structurally cannot detect. The Assessment flow is the only credible free answer to "what about the other 43%", and it exports a shareable report. MIT-licensed, 949 stars, shipped web@2.49.0 the day before I checked — which is the sentence an earlier draft used to score maintenance 5, and it is misleading. The full release history is the story: web@2.44.0 (Jul 2024) → 2.46.0 (Feb 2025) → **2.47.0 (Jun 2026)**. That is a **16-month release drought**, with only 51 commits in the whole Feb-2025-to-Jun-2026 window. Two releases in the last three months is a project that just woke up, not one that never slept. Microsoft has already discontinued the Android edition. The tool is excellent and free and I still rank it `essential` because Tab Stops has no substitute — but do not build a process that assumes anyone is on call for it.
- **Use when:** Before every ship, on every new screen. Run FastPass, then walk Tab Stops. · **Don't use when:** You need CI — it's a browser extension. Pair it with Playwright.
- **Scores /5:** visual 3 · interaction 5 · a11y 5 · engineering 4 · **maintenance 3** (was 5 — see the drought above) · docs 4 · customization 3 · perf 4 · stability 4 · originality 5
- **Evidence:** ★949 · last release web@2.49.0 2026-09-08 · prior releases 2.47.0 2026-06-11, 2.46.0 **2025-02-12** · last push 2026-09-04 · 76 contributors (verified) · MIT · 69 open issues · built on axe-core
- **Looked at:** https://accessibilityinsights.io/ — a pale blue hero cut by a diagonal white wedge, a flat `#0d5aa7` CTA, and a product collage that is mostly *Windows desktop* screenshots even though the web extension is what most people want; the two "For Web / For Windows" columns below only clarify it after you scroll. I screenshotted this myself rather than take the earlier note on trust, and the earlier note was right but too kind: the body copy still reads "Chrome and **the new Microsoft Edge**", a phrase that dates to 2020, and at 1440px the hero leaves roughly 40% of the viewport empty. Dated marketing hiding a genuinely excellent tool — the exact inverse of most of this category.
- **Vibecode risk:** low.
- **Link:** https://accessibilityinsights.io/

### WCAG 2.2 — `essential`
- **What:** The W3C Recommendation, plus the far more useful "Understanding WCAG 2.2" companion documents and the How to Meet quick reference.
- **Verdict:** You need this because it is the law, not because it teaches well. The success criteria are written to be testable and unambiguous, which makes them nearly unreadable — always read the *Understanding* page for a criterion, which has the intent, examples, and the failure list. The quickref is a filter UI over the same content and is where most people should start. What actually changed in 2.2 is small and mostly sensible: target size, visible focus not obscured, don't force re-entry of data, no cognitive-test-only authentication, and the deletion of 4.1.1 Parsing.
- **Use when:** Deciding whether something is a defect, and when writing acceptance criteria. · **Don't use when:** Teaching a team — use the Understanding docs or WebAIM's articles instead.
- **Scores /5:** visual 2 · interaction 3 · a11y 5 · engineering 5 · maintenance 5 · docs 3 · customization 4 · perf — · stability 5 · originality 4
- **Evidence:** W3C Recommendation, this version 2024-12-12 (original 2023-10-05) · errata maintained at w3.org/WAI/WCAG22/errata/ · repo `w3c/wcag` ★1,482, last push 2026-09-09, 496 open issues
- **Looked at:** https://www.w3.org/WAI/WCAG22/quickref/ — a sticky yellow filter banner over solid-blue guideline header bars, left TOC of 80+ numbered links, disclosure buttons for every technique. At 1440px it works as a reference. At **390px the entire TOC dumps inline above the content**, so you scroll past roughly eighty links before reaching Principle 1 — the canonical accessibility reference is close to unusable on a phone, which is a small, funny, real problem.
- **Vibecode risk:** low.
- **Link:** https://www.w3.org/TR/WCAG22/

### eslint-plugin-jsx-a11y — `strong`
- **What:** 39 static-analysis rules for JSX accessibility. Catches `<div onClick>`, missing `alt`, invalid ARIA attributes, `tabindex` misuse, labels without controls.
- **Verdict:** The highest value-per-byte tool in this document. It runs at author time, before the code exists in a browser, and it kills the single most common AI-generated failure class outright. It is also the maintenance oddity of the category: **41.5M weekly downloads on a package whose last npm release was 26 October 2024**, with the last repo commit in January 2026. That is 23 months without a release. Nothing is broken — ESLint 9 flat config is supported (`jsxA11y.flatConfigs.recommended`), the rules are correct, and the ARIA surface it checks moves slowly. But it is coasting, and if you are choosing a linter today the ported rule sets in Biome and oxlint are the ones getting weekly attention.
- **Use when:** Any React/JSX codebase already on ESLint. Turn on `recommended`, not `strict`, or you will spend a day on false alarms about `<label>` nesting. · **Don't use when:** You've moved to Biome or oxlint — the rules are already there and current.
- **Scores /5:** visual — · interaction — · a11y 4 · engineering 4 · maintenance 2 · docs 4 · customization 5 · perf 4 · stability 5 · originality 3
- **Evidence:** ★3,615 · last npm release v6.10.2 2024-10-26 · last push 2026-01-06 · 41,546,885 wk npm · 128 contributors · MIT · 139 open issues · 39 rules
- **Vibecode risk:** low — it only removes bad patterns, it adds no house style.
- **Link:** https://github.com/jsx-eslint/eslint-plugin-jsx-a11y

### Biome / oxlint a11y rules — `strong`
- **What:** Rust linters that ship ported jsx-a11y rules natively — Biome has 39 rules under its `a11y` group, oxlint has 36 `jsx_a11y` rules.
- **Verdict:** This is the quiet answer to the previous entry's maintenance problem, and almost nobody frames it that way. Both projects pushed code today, both are enormous now (oxlint 19.0M weekly, Biome 13.2M), and both cover essentially the whole jsx-a11y surface with no plugin resolution and no config archaeology. `biome migrate eslint` converts an existing jsx-a11y config automatically. The honest caveat: rule *names* differ (`useKeyWithClickEvents`, not `click-events-have-key-events`), so your suppression comments and CI reporting need rewriting, and a plugin-heavy ESLint config will not be a clean swap — audit before you assume.
- **Use when:** New projects, or any codebase already migrating off ESLint. Biome if you also want the formatter; oxlint if you want pure speed alongside an existing setup. · **Don't use when:** You depend on a jsx-a11y rule neither has ported, or on custom ESLint rules.
- **Scores /5:** visual — · interaction — · a11y 4 · engineering 5 · maintenance 5 · docs 4 · customization 4 · perf 5 · stability 4 · originality 3
- **Evidence:** Biome ★25,753, Apache-2.0, last push 2026-09-10, 13,177,665 wk npm, 39 a11y rules (counted from the published configuration schema) · oxc ★22,694, MIT, last push 2026-09-10, oxlint 19,035,062 wk npm, 36 jsx_a11y rules (counted from `crates/oxc_linter/src/rules.rs`)
- **Vibecode risk:** low.
- **Link:** https://biomejs.dev/linter/rules/ · https://oxc.rs/docs/guide/usage/linter.html

### @storybook/addon-a11y — `strong`
- **What:** axe-core inside the Storybook panel, per story, with a Vitest addon path that turns every story into an automated a11y test.
- **Verdict:** The only tool here that tests component *variants* rather than assembled pages, which matters because the disabled state, the error state and the dark-mode variant are where contrast failures actually live and nobody navigates to all three in a browser. The Vitest integration is what makes it real — it converts a component library's existing story coverage into a11y coverage for free, no new test files. Storybook's own docs are unusually honest about the ceiling, citing Deque's 57% figure with a link rather than implying the panel is sufficient — though see the axe-core scorecard: that figure is a 2021 measurement inflated by the since-deleted SC 4.1.1, and everyone quoting it (Storybook included) is quoting it undated.
- **Use when:** You maintain a design system or component library in Storybook. Wire the Vitest addon so it runs in CI, not just in the panel where nobody looks. · **Don't use when:** You don't already run Storybook — the addon is not worth adopting Storybook for.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 5 · customization 4 · perf 3 · stability 4 · originality 4
- **Evidence:** v10.6.0 2026-09-02 · 7,448,182 wk npm · monorepo `storybookjs/storybook` ★91,026, MIT, last push 2026-09-10
- **Looked at:** https://storybook.js.org/docs/writing-tests/accessibility-testing — three-column docs under a pastel rainbow wash, framework tabs (React/Vue/Angular/Web Components) and a **"Copy markdown"** button sitting right next to them, which is a deliberate agent affordance and more than most docs sites offer. The prose links out to the EAA, ADA and Section 508 in the second paragraph — accessibility framed as a shipping requirement rather than a virtue, which reads as written by someone who has had the budget conversation.
- **Vibecode risk:** low.
- **Link:** https://storybook.js.org/docs/writing-tests/accessibility-testing

### jest-axe — `strong`
- **What:** A single custom matcher, `expect(await axe(container)).toHaveNoViolations()`, for Jest or Vitest.
- **Verdict:** Boring in the correct way. One assertion, no configuration, currently maintained — v11.0.0 landed July 2026 and the repo was pushed the day I checked, which is more than can be said for its Vitest-branded competitor. Use it on primitives (Button, Input, Dialog, Menu) where a jsdom render is meaningful. Do not use it on pages: jsdom has no layout, so every contrast and target-size rule silently no-ops, and a green suite will convince you of things that are not true.
- **Use when:** Unit-testing component primitives. · **Don't use when:** Testing pages or anything where geometry matters — that is Playwright's job.
- **Scores /5:** visual — · interaction — · a11y 4 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 5 · originality 3
- **Evidence:** ★1,111 · v11.0.0 2026-07-26 · last push 2026-09-09 · 2,330,692 wk npm · MIT · 6 open issues
- **Vibecode risk:** low, with one trap: teams read a passing jest-axe suite as color-contrast coverage. It is not, and cannot be.
- **Link:** https://github.com/nickcolley/jest-axe

### ARIA Authoring Practices Guide (APG) — `strong`
- **What:** W3C's catalogue of ~30 widget patterns with required keyboard interactions, roles, states and properties, plus runnable examples.
- **Verdict:** Read it for the **keyboard interaction contract** — the tables specifying exactly what Home, End, Escape, Type-ahead and arrow keys must do in a listbox, tree, grid or menu. That information exists nowhere else in one place and is what separates a real component from a div that opens. But the guide's own examples have a long documented history of screen-reader failures in real AT, and it opens every pattern page with "No ARIA is better than Bad ARIA" for a reason. The correct workflow is: read the pattern, then implement it with React Aria, Base UI, Ark or Reka — not by pasting the example code. 703 open issues on the repo is not neglect, it is the size of the problem space.
- **Use when:** Specifying or reviewing a custom widget's keyboard behaviour. · **Don't use when:** You need production code. Reach for a primitives library.
- **Scores /5:** visual 2 · interaction 5 · a11y 4 · engineering 3 · maintenance 4 · docs 4 · customization — · perf — · stability 4 · originality 5
- **Evidence:** repo `w3c/aria-practices` ★1,346 · last push 2026-08-21 · 703 open issues · W3C document licence
- **Looked at:** https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ — W3C blue banner, then a pale-yellow "Read This First" callout ("No ARIA is better than Bad ARIA") before any content, which is the single best piece of information architecture on the site. Below that: long unbroken prose paragraphs, a bordered "Page Contents" box that looks like a 2004 sidebar, and keyboard keys rendered as monospace chips. Content-dense and structurally sound; visually it is a specification, and it reads like one.
- **Vibecode risk:** high — its example code, pasted directly, produces the same visually inert, ARIA-heavy, subtly-broken widget in product after product. It is the source of a great deal of bad ARIA.
- **Link:** https://www.w3.org/WAI/ARIA/apg/

### Polypane — `strong` (paid)
- **What:** A development browser that renders many synced viewports at once and layers on accessibility, contrast, reflow and user-preference simulation.
- **Verdict:** The only tool in this list built by someone with visible taste, and the only one that puts accessibility where it belongs — in the build loop, not the audit. Seeing your page simultaneously at 320px, in reduced-motion, in forced-colors and in dark mode is a fundamentally better idea than reading a report about it afterwards, and it collapses the reflow and user-preference checks (items 13–15 of the baseline) into something you cannot forget to run. It is a subscription and a separate browser, which is real friction; it is worth it for anyone who builds UI daily and not worth it for anyone who touches UI monthly.
- **Use when:** You are the person who builds the interface, and responsive plus a11y plus dark mode are all your problem. · **Don't use when:** You need CI, a shareable report, or team-wide licences on a small budget.
- **Scores /5:** **visual 4** (was 5 — see below) · interaction 5 · a11y 5 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 3 · stability 4 · originality 5
- **Evidence:** proprietary, closed-source; 14-day free trial, no card required (stated on site) · Windows/macOS/Linux · exact pricing unverified
- **Looked at:** https://polypane.app/ — dark navy headline with a green-to-blue gradient on "while you build", a five-item feature strip whose third item is literally "Accessibility checked as you build", and below the fold an unretouched product screenshot showing four device panes (iPhone 16 393×659, Pro Max 440×842, 11, 12/13 Mini) each labelled with real pixel dimensions. That screenshot does the selling, and the honesty of showing the actual chrome — toolbar icons, zoom at 71% — rather than an idealised abstraction is a small mark of confidence. Type is a geometric sans at a comfortable measure; no faux-3D, no glass, no violet-gradient CTA.

  **Challenge-pass dissent:** I re-shot this page and my eyes give it a 4, not a 5. It is a clean, competent 2025-era dev-tool landing page — and the green-to-blue gradient on a headline keyword is one of the most-copied moves on the web, so "no gradient CTA" was special pleading about a page that does in fact lead with a gradient. More importantly, the earlier 5 was scored off the *marketing site* for a product whose entire value is its *panel UI*; that is a category error. The screenshot-of-the-real-app is the honest part and the reason this stays high. "The only tool built by someone with visible taste" is also partly inherited praise — Polypane is a dev-Twitter favourite — and IBM's Equal Access toolkit (added below) is better *structured*, if less pretty.
- **Vibecode risk:** low.
- **Link:** https://polypane.app/

### Guidepup — `situational`
- **What:** A JS library that actually drives VoiceOver (macOS) and NVDA (Windows), captures the spoken output, and lets you assert on it. Ships a Playwright integration and a `@guidepup/virtual-screen-reader` for CI.
- **Verdict:** Nothing else does this, and what it tests is the only thing that matters — what a screen reader user actually hears. Assert that after opening your combobox the phrase "expanded, 12 items" is spoken, and you have tested something no axe rule can reach. The catch is severe: six contributors, 560 stars, and it depends on driving real AT via OS automation, which is inherently brittle across OS updates. Treat it as a high-value experiment on your two or three most complex widgets, never as a required CI gate for the whole app. The virtual screen reader is the safer half — deterministic, runs anywhere, but it is a model of AT behaviour rather than the real thing.
- **Use when:** You own a component library and want a regression test on the announcement of a Combobox, Dialog or Grid. · **Don't use when:** You need CI reliability, cross-platform coverage, or a bus factor above one.
- **Scores /5:** visual 3 · interaction 5 · a11y 5 · engineering 4 · maintenance 4 · docs 4 · customization 4 · perf 2 · stability 2 · originality 5
- **Evidence:** ★560 · last release v0.34.0 2026-08-31 · last push 2026-09-08 · `@guidepup/playwright` 25,091 wk npm · `@guidepup/virtual-screen-reader` 23,126 wk npm but last published 2025-05-19 (16 months stale) · 6 contributors · MIT · 11 open issues
- **Looked at:** https://guidepup.dev/ — near-black `#1c2b2d` hero, a cartoon guide-dog mark, one light-grey "Learn More" button as the only CTA, and a three-column feature row in plain white-on-black. It is a Docusaurus default with the palette swapped and no visual ambition whatsoever, which for a testing library is the right call — the honesty is in the middle column heading, "Mirrors Real User Experience," which is exactly and only what it sells.
- **Vibecode risk:** low.
- **Link:** https://guidepup.dev/

### Pa11y — `situational`
- **What:** A CLI and CI runner that loads pages in headless Chrome and reports accessibility issues. Defaults to HTML_CodeSniffer; can be switched to axe.
- **Verdict:** Right answer for one specific job: crawling a list of many URLs of server-rendered HTML and getting machine-readable output, with no dashboard and no account. Genuinely alive — and an earlier draft's "10.0.0 shipped after a long quiet stretch" is simply wrong. The actual cadence is regular: 9.0.0 (May 2025), 9.0.1 (Sep 2025), 9.1.0 (Feb 2026), 9.1.1 (Feb 2026), 10.0.0 (Aug 2026). The org still maintains the CI runner, dashboard and webservice. Two caveats that matter. First, the **default engine is HTML_CodeSniffer, not axe**, and it produces materially noisier output with more false positives; set `runners: ['axe']` on day one. Second, LGPL-3.0 is an unusual licence for a dev tool and will trip some corporate review processes.
- **Use when:** Marketing sites, docs sites, CMS output — anywhere you have hundreds of URLs and no test suite. · **Don't use when:** You have a Playwright suite (use `@axe-core/playwright`) or a heavily interactive SPA where the interesting states are behind clicks.
- **Scores /5:** visual 2 · interaction 3 · a11y 4 · engineering 4 · maintenance 4 · docs 3 · customization 4 · perf 4 · stability 4 · originality 3
- **Evidence:** ★4,519 · last release 10.0.0 2026-08-28 · last push 2026-09-07 · 262,834 wk npm · 53 contributors · **LGPL-3.0** · 44 open issues
- **Looked at:** https://pa11y.org/ — an essentially unstyled centred column, a tan-highlighted active tab, blue underlined links, no cards, no shadows, no hero. It looks like a 2015 GitHub Pages site because it is one, and for a CLI's homepage that is entirely fine; the four products are explained in four bullets with no marketing language at all.
- **Vibecode risk:** medium — only because its default runner's noise trains teams to ignore accessibility output entirely.
- **Link:** https://pa11y.org/

### Lighthouse — `situational`
- **What:** Chrome's auditing tool. Its Accessibility category runs a curated subset of axe-core rules and produces a 0–100 score.
- **Verdict:** Useful as a smoke alarm, disastrous as a gate, and the score is the problem. It is a weighted average over a *subset* of axe rules on a *single rendered state* of a page — so a site can score 100 while having no keyboard access, no focus management, an unusable modal, and meaningless alt text. Because it produces a number, product managers turn it into an OKR, and teams then optimise toward the number instead of the users. Run it; never report the score as an accessibility status. If you want automated coverage, run full axe-core, which reports violations rather than a grade.
- **Use when:** A one-command sanity check on a page you have never seen, or trend-watching across many pages in CI alongside performance. · **Don't use when:** Anyone will interpret the number as compliance.
- **Scores /5:** visual 4 · interaction 3 · a11y 3 · engineering 5 · maintenance 5 · docs 4 · customization 3 · perf 4 · stability 5 · originality 2
- **Evidence:** ★30,750 · last release v13.4.1 2026-07-20 · last push 2026-09-09 · 3,142,431 wk npm · Apache-2.0 · 468 open issues · a11y category powered by axe-core
- **Vibecode risk:** high — not aesthetically, but it is the single largest source of false confidence in this category. "We're at 98" is the sentence that ends accessibility work at most companies.
- **Link:** https://developer.chrome.com/docs/lighthouse/accessibility/

### APCA / apca-w3 — `reference-only`
- **What:** The Accessible Perceptual Contrast Algorithm — Andrew Somers' perceptual contrast model, reporting a signed Lc value against a font size × weight lookup.
- **Verdict:** The model is better than WCAG 2's and the research behind it is serious, and it still has no standing. It was pulled from the WCAG 3 draft in July 2023 for lack of working-group consensus, and the April 2026 draft explicitly says the WCAG 3 contrast algorithm is undetermined. So: read it, use it to *understand* why your dark-mode palette feels hazy despite passing 4.5:1, and then ship colors that clear WCAG 2 AA anyway. The npm reference implementation `apca-w3` is at 0.1.9 from July 2022, which tells you how to treat it as a dependency.
- **Use when:** Tie-breaking between palettes that both pass WCAG 2, especially dark mode. Studying contrast perception. · **Don't use when:** Anything with a compliance obligation, an audit, or a procurement checklist.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 3 · maintenance 3 · docs 2 · customization 3 · perf 5 · stability 2 · originality 5
- **Evidence:** `Myndex/SAPC-APCA` ★583 · last push 2026-07-25 · npm `apca-w3` v0.1.9 **2022-07-04**, 44,599 wk npm · licence NOASSERTION (custom/beta terms — check before shipping)
- **Looked at:** https://apcacontrast.com/ — a warm `#e9e4d0` paper ground with everything drawn as thick-outlined rounded rectangles in one saturated blue; contrast reported as "Lc 75.6" in a yellow chip. The centrepiece is a font-size × weight matrix (200 through 700 columns; 42px, 24px, 18px, 16px, 15px, 14px rows) rendering real sample text at each spec — which teaches the size/weight relationship faster than any prose could. It is also, at 1440px, **clipping that sample text at every column edge**: the tool built to teach legibility overflows its own cells. Charming and disqualifying at the same time, and a fair summary of APCA's status.
- **Vibecode risk:** — (it is a model, not a component). The risk is process: shipping an APCA-only palette and failing a WCAG 2 audit.
- **Link:** https://apcacontrast.com/

### cypress-axe — `strong`
- **What:** `cy.injectAxe()` / `cy.checkA11y()` — axe-core bound to Cypress, same rule IDs as every other layer here.
- **Verdict:** Added in this challenge pass because leaving it out was straightforward tooling-fashion bias. It pulls **615,193 weekly downloads** — two thirds of `@axe-core/playwright`'s volume — and appears in almost no "best accessibility tools" list, because those lists are written by people who moved to Playwright and assume everyone else did. A very large number of real teams are on Cypress and are not migrating this quarter; for them this is the CI layer, and it is the same engine producing the same violations. It is community-maintained rather than Deque-maintained, which is the one real difference from the Playwright binding.
- **Use when:** You have a Cypress suite. Run it per route after the page settles. · **Don't use when:** You are choosing a runner today — pick Playwright and the first-party binding.
- **Scores /5:** visual — · interaction 4 · a11y 5 · engineering 4 · maintenance 4 · docs 3 · customization 4 · perf 3 · stability 4 · originality 2
- **Evidence:** `component-driven/cypress-axe` ★642 · MIT · last push 2026-09-03 · 74 open issues · 615,193 wk npm (all verified 2026-09-09)
- **Vibecode risk:** low.
- **Link:** https://github.com/component-driven/cypress-axe

### Non-React a11y linting — `strong`
- **What:** `eslint-plugin-vuejs-accessibility` for Vue SFCs, `eslint-plugin-lit-a11y` for Lit and web components, and Svelte's compiler, which emits a11y warnings natively with no plugin installed.
- **Verdict:** This entry exists because the challenge pass caught the file assuming "author-time a11y linting" meant JSX. It does not. `eslint-plugin-vuejs-accessibility` does **384,952 weekly downloads** — comfortably more than `pa11y`, `jest-axe` and every Guidepup package combined — and covers the same failure classes (`click-events-have-key-events`, `form-control-has-label`, `no-static-element-interactions`). `eslint-plugin-lit-a11y` (63,309/wk) is the only one of these that understands template literals and shadow DOM, which is why axe-core's `ElementInternals` work matters to the same audience. Svelte is the outlier worth knowing: a11y checks are **in the compiler**, on by default, no dependency and no config, which is the single lowest-friction implementation of this idea anywhere and something the React ecosystem has never matched.
- **Use when:** Your framework isn't React. · **Don't use when:** — there is no reason to skip this layer; it is free.
- **Scores /5:** visual — · interaction — · a11y 4 · engineering 4 · maintenance 4 · docs 3 · customization 4 · perf 4 · stability 4 · originality 3
- **Evidence:** `vue-a11y/eslint-plugin-vuejs-accessibility` ★318, MIT, last push 2026-08-10, 384,952 wk npm · `eslint-plugin-lit-a11y` 63,309 wk npm · Svelte compiler a11y warnings, no package required (svelte 4,093,852 wk npm)
- **Vibecode risk:** low.
- **Link:** https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility

### IBM Equal Access Accessibility Checker — `situational`
- **What:** IBM's open-source engine (`accessibility-checker-engine`), a Chrome/Firefox extension, and Node/Karma integrations. Rules are mapped to **ACT Rules** and to IBM's own requirements set.
- **Verdict:** The only maintained second engine in this category, and its omission was the clearest popularity-bias gap in the original file — "accessibility testing means axe" is true as sociology, not as engineering. Apache-2.0, actively pushed, and its real advantage is structural rather than technical: the **Equal Access Toolkit** organises guidance by lifecycle stage (Plan → Design → Develop → Verify → Launch) and by *role*, and its Verify section splits explicitly into Automated / Manual / **Screen reader** tabs. That is a better information architecture for "the other 47%" than anything Deque publishes free, and I say that having screenshotted both. The honest limits: a much smaller ecosystem (775 stars vs axe's 7,492; 21,858 weekly downloads vs 61.9M), a distinct rule vocabulary that will not line up with your axe suppressions, and a noisier default output than axe's near-zero-false-positive posture.
- **Use when:** You want a genuine second opinion before an audit, need ACT-rule mapping for a VPAT/ACR, or want the lifecycle guidance. · **Don't use when:** You need one rule vocabulary across lint, component and CI layers — that argues for axe everywhere.
- **Scores /5:** visual 4 · interaction 4 · a11y 5 · engineering 4 · maintenance 4 · docs 5 · customization 3 · perf 3 · stability 4 · originality 4
- **Evidence:** `IBMa/equal-access` ★775 · Apache-2.0 · last push 2026-09-08 · 132 open issues · `accessibility-checker` 21,858 wk npm · `accessibility-checker-engine` 17,051 wk npm
- **Looked at:** https://www.ibm.com/able/toolkit/verify/automated/ — Carbon design system, a deep-purple hero band, and a left rail that is an actual workflow spine rather than a doc dump. Content-first, high type contrast, no marketing. One irony: a cookie consent banner occupies the bottom third of the 1440px viewport on an accessibility toolkit page.
- **Vibecode risk:** low.
- **Link:** https://github.com/IBMa/equal-access

### W3C ARIA-AT — `reference-only`
- **What:** The Assistive Technology ARIA Experience Assessment — W3C's project running APG patterns through JAWS, NVDA and VoiceOver with scripted test plans and publishing the per-command results.
- **Verdict:** This is the missing empirical layer under the APG entry above. When this file says "the APG's examples have a documented history of screen-reader failures," ARIA-AT is *where that documentation lives* — actual per-AT, per-command pass/fail reports rather than folklore. It is not a tool you run; it is data you consult before committing to a pattern, and it is the only public source that answers "will JAWS actually announce this" with evidence. Very actively worked on (pushed the day I checked), still incomplete in coverage, and almost never mentioned outside the a11y working groups.
- **Use when:** Choosing between two valid ARIA patterns, or deciding whether a reported AT bug is yours. · **Don't use when:** You need coverage of a pattern they have not tested — most of them.
- **Evidence:** `w3c/aria-at` ★180 · last push 2026-09-09 · 309 open issues · W3C document licence · reports at aria-at.w3.org
- **Vibecode risk:** — (it is data).
- **Link:** https://aria-at.w3.org/

### Silktide accessibility checker (extension) — `situational`
- **What:** A free Chrome/Edge extension with axe-style checks plus **screen reader, colour-blindness, dyslexia and low-vision simulators**. No account required for the extension.
- **Verdict:** Included because it is genuinely the best free *simulation* tool and it circulates on Reddit and X rather than in listicles — but with a warning the enthusiasm usually omits. The extension is real and useful: its screen-reader simulator is the cheapest way to show a sceptical stakeholder what their page sounds like, and that is a political tool as much as a technical one. The catch is what it is attached to. I screenshotted silktide.com and landed on an enterprise page selling "the complete solution for better websites — the #1 website quality management platform," gated behind **Request demo**, with a purple gradient headline and a stock-photo collage. The free extension is the top of a funnel. Use it; do not let it become the procurement conversation. Also treat the simulator as a teaching aid, never as a substitute for NVDA or JAWS — it models a screen reader, it is not one.
- **Use when:** Demonstrating impact to non-engineers; a fast solo check with vision simulation. · **Don't use when:** You need CI, an auditable report, or evidence of real AT behaviour.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 3 · maintenance 4 · docs 3 · customization 2 · perf 4 · stability 4 · originality 4
- **Evidence:** proprietary, closed-source; free browser extension, paid platform · exact extension version unverified (Chrome Web Store not machine-readable from here) — **treat the tooling claims here as unverified**
- **Vibecode risk:** medium — the simulators are persuasive enough that teams mistake "sounds fine in the simulator" for tested, which is the same false-confidence failure as a Lighthouse 100.
- **Link:** https://www.silktide.com/

---

## Rejected / avoid

- **vitest-axe** — 752,692 weekly downloads on `latest = 0.1.0`, published **21 October 2022**. There is a `1.0.0-pre.5` from January 2025 that most people never install, and the repo's last commit is February 2025. It is riding on shadcn-era template inertia. Use `jest-axe` (v11, July 2026) with Vitest — the matcher works fine.
- **Accessibility overlay widgets (accessiBe, UserWay, AudioEye's widget, EqualWeb)** — a JS widget cannot fix semantics, focus order, or alt text meaning. They have been the subject of repeated US litigation, are opposed by a large open letter from accessibility practitioners, and actively degrade the experience for screen reader users who already have their own tooling. They also give an organisation a reason not to fix anything. Never recommend one.
- **axe MCP Server (Deque)** — the pitch is right and the packaging is wrong: it requires **Docker, a paid axe DevTools for Web subscription, and an API key**, and the repo is proprietary with 7 stars since February 2026. An agent can run axe-core against a Playwright page in ten lines and get the same violations with the same rule IDs for free. Revisit if Deque ever ships a free tier.
- **WAVE (browser extension)** — *demoted from a clean "superseded" to a qualified one, because the earlier entry contradicted this file's own opening paragraph.* Every headline statistic at the top of this document — 95.9%, 56.1 errors/page, 83.9% low contrast, the ARIA correlation — is produced by the **WAVE engine**, via WebAIM's stand-alone API, not by axe. Calling WAVE superseded while resting the entire framing on its output was sloppy. The accurate verdict: WAVE's *extension UX* is superseded — injecting icon badges reflows the page you are auditing and turns a dense layout into clipart — but its engine is a serious, independently-maintained second opinion, and it is the only one with an eight-year longitudinal dataset behind it. Right for content editors; the API is paid, so wrong for free CI.
- **`:focus-visible` polyfills (`focus-visible`, `what-input`)** — `:focus-visible` has had universal browser support since 2022. If you find one of these in a codebase, delete it.
- **`react-axe`** — the old package name. Superseded by `@axe-core/react` (v4.13.0, August 2026). If you see `react-axe` in a package.json it is at least four years stale.
- **Accessibility "AI fixer" agents that auto-apply ARIA** — the 2026 successor to the overlay, same failure with better branding. Deque now runs a report titled "the hidden accessibility risk of agentic development"; WebAIM's 2026 conclusion names "vibe coding" as a likely driver of the first *regression* in eight years. An agent that resolves violations without understanding intent produces exactly the ARIA-heavy pages WebAIM measured at 59.1 errors versus 42.
- **HTML_CodeSniffer as a primary engine** — Pa11y's default, and materially noisier than axe with more false positives. Configure `runners: ['axe']`.
- **"Lighthouse accessibility score" as an acceptance criterion** — see the scorecard. Report violations, never a grade.
- **`role="presentation"` / `aria-hidden="true"` used to silence axe warnings** — this is the most common bad fix an agent makes. It removes the element from the accessibility tree entirely, so the warning disappears and the content becomes invisible to AT. Never resolve a violation by hiding the element from assistive technology.

## What surprised me

- **The ADA Title II deadline moved and almost nobody has updated their notes.** An Interim Final Rule in April 2026 pushed compliance from April 2026 to **26 April 2027** (entities serving ≥50k) and **26 April 2028** (smaller entities and special districts). A great deal of 2025-vintage content still says 2026.
- **`eslint-plugin-jsx-a11y` has not shipped an npm release since October 2024** — 23 months — while pulling 41.5M weekly downloads. Meanwhile Biome (39 a11y rules) and oxlint (36 ported jsx-a11y rules) both pushed code today. The de facto maintained implementation of these rules is now in Rust, and nobody announced the handover.
- **`vitest-axe`'s published `latest` is a 0.1.0 from 2022** with three-quarters of a million weekly installs. Thousands of test suites are running four-year-old glue code because a template included it.
- **More ARIA correlates with more errors, measurably.** WebAIM 2026: pages with ARIA average 59.1 detected errors versus 42.0 for pages without, and the correlation strengthens with attribute count. Total ARIA attributes on the top million home pages grew 27% year over year. The instinct to "add ARIA to make it accessible" is empirically backwards.
- **axe-core 4.13 is the first accessibility engine anywhere to support `ElementInternals`** (shipped August 2026, with RedHat and Adobe). Every other scanner still reports form-associated custom elements as unlabelled — which means web-component design systems have been getting false violations for years, and teams have been suppressing real rules to silence them.
- **The famous 57% is a 2021 number and it is inflated by a deleted success criterion.** Deque's study is real (2,000+ audits, 13,000 pages, 294,958 issues) but it was published **10 March 2021** and its fourth-biggest issue category is **SC 4.1.1 Parsing**, which WCAG 2.2 removed. Recomputing from Deque's own published table without Parsing gives **53.0%**, and since the study is benchmarked to WCAG 2.1 it also excludes 2.2's new, almost entirely manual criteria. Everyone quotes "57%" undated — Storybook, this file's earlier draft, most conference talks. The defensible 2026 statement is "a bit over half, and falling as the standard adds manual criteria."
- **WebAIM blamed generated code, in print, in the flagship dataset.** The 2026 Million's conclusion attributes the reversal to "increased reliance on 3rd party frameworks and libraries and automated or AI-assisted coding practices (“vibe coding”)". Eight years of this report and that phrase had never appeared. Page complexity rose 22.5% in one year and ARIA attributes 27%; both correlate with more errors.
- **`eslint-plugin-vuejs-accessibility` outsells most of this document.** 384,952 weekly downloads — more than pa11y, jest-axe, cypress-axe's peers and every Guidepup package put together — and it appears in essentially no roundup, because roundups are written by React developers. Svelte goes further and puts a11y checks in the compiler, on by default, zero dependencies.
- **Accessibility Insights went 16 months without a release** (2.46.0 Feb 2025 → 2.47.0 Jun 2026, 51 commits in between) and then shipped twice in three months. Judging it by "last release" alone, as the first draft did, gets the maintenance picture exactly backwards.
- **EN 301 549 v4.1.1, incorporating WCAG 2.2 AA, was published 2 September 2026** — a week before this evaluation. Once cited in the Official Journal (expected November 2026) the EU presumption-of-conformity benchmark moves from WCAG 2.1 to 2.2. Building to 2.2 now is no longer forward-looking, it is on-schedule.

## Open questions

- ~~**EN 301 549 v4.1.1's publication date**~~ — **RESOLVED this pass.** Fetched from ETSI directly: `etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf` exists, 3,971,655 bytes, `Last-Modified: Wed, 02 Sep 2026`. The `_60` suffix is ETSI's published-deliverable marker. The date is confirmed by primary source; only the **OJEU citation timing** (expected ~Nov 2026) remains a vendor estimate.
- **Silktide's extension version and rule count** — the Chrome Web Store is not machine-readable from here, so that scorecard's tooling specifics are marked unverified. Someone with the extension installed could settle it in a minute.
- **Polypane's current pricing** — the site advertises a 14-day trial with no card, but I did not load the pricing page, so I have quoted no figure.
- **Whether `eslint-plugin-jsx-a11y` is deliberately in maintenance mode or simply stalled.** The January 2026 commits suggest someone is still there; the absence of a release in 23 months suggests otherwise. A maintainer statement or a 6.11 release would settle it.
- **How complete Biome's and oxlint's a11y ports actually are per-rule.** I counted 39 and 36 rule identifiers from source and schema, against 39 upstream, but did not diff behaviour rule by rule. A test-corpus comparison would settle it.
- **Guidepup's real-world CI reliability across macOS/Windows updates.** Six contributors (verified) and OS-level automation is a fragile combination; I found no public data on flake rates.
- **Whether IBM's engine finds materially different defects from axe**, or mostly the same ones under different rule names. Nobody appears to have published a head-to-head on a shared corpus, and it is the single most useful missing experiment in this category.
- **Assistiv Labs** (real JAWS/NVDA/VoiceOver over the network, paid) was surfaced but not evaluated this pass — it is the obvious commercial counterpart to Guidepup and deserves its own scorecard.

## Housekeeping note for this repo

`tools/audit.mjs` pins axe-core **4.10.2** from CDN. Current is **4.13.0**, which adds `ElementInternals` support, `sectionheader`/`sectionfooter` roles, `aria-actions`, deprecated-ARIA detection, and closes ten false positives. Bump it.

---

## Challenge pass (2026-09)

Adversarial re-verification of every `essential` and `strong` entry against primary sources on 2026-09-09. Method: `gh api repos/*` for stars / pushes / issues / licences, contributor counts from paginated `Link` headers, `api.npmjs.org` for weekly downloads, `registry.npmjs.org` for real publish dates, direct fetches of webaim.org, ada.gov, deque.com and etsi.org, and four of my own screenshots at 1440/390.

**What survived.** Most of it, and that is worth saying plainly. Every star count, download figure, release date, contributor count and licence in the original file re-verified — 231 axe-core contributors, 128 jsx-a11y, 76 Accessibility Insights, 6 Guidepup, all exact. The WebAIM Million figures (95.9%, 94.8% prior, 56.1 errors/page, +10.1%, 83.9% low contrast, 51% missing labels, ARIA 59.1 vs 42.0, +27% ARIA) match webaim.org line for line. Screen Reader Survey #10 (JAWS 40.5 / NVDA 37.7 / VoiceOver 9.7 primary; 65.6 / 60.5 / 43.9 / 37.3 commonly used; regional splits) matches exactly. The ADA Title II dates verified against **ada.gov itself**, which confirms the IFR published 20 April 2026 and the 26 Apr 2027 / 26 Apr 2028 deadlines. `dequelabs/axe-mcp-server-public` is ★7 and created Feb 2026 as claimed. `vitest-axe` really is `latest = 0.1.0` from 21 Oct 2022 on 752,742 weekly downloads. `eslint-plugin-jsx-a11y` really has shipped nothing since 6.10.2 on 26 Oct 2024. The tier assignments for axe-core, `@axe-core/playwright`, WCAG 2.2, jest-axe, Storybook, Biome/oxlint, APG, Guidepup, Lighthouse and the overlay rejection all stand unchanged.

**Corrections made.**
1. **The 57% automation figure — the biggest find.** Traced to Deque's primary source: a study published **10 March 2021**, whose fourth-largest category is **SC 4.1.1 Parsing**, deleted by WCAG 2.2. Recomputed from Deque's own table minus Parsing: **53.0%** (138,105 auto / 260,470 total, vs the published 169,242 / 294,958 = 57.38%). Benchmarked to WCAG 2.1, so it also predates 2.2's manual-only criteria. Header, axe-core scorecard, Storybook scorecard and the surprises list all updated. This number is quoted undated across the entire industry.
2. **Accessibility Insights maintenance 5 → 3.** "Shipped the day before I checked" concealed a **16-month release drought** (2.46.0 Feb 2025 → 2.47.0 Jun 2026, 51 commits between). Tier held at `essential` — Tab Stops still has no substitute and it is free — but the maintenance claim was wrong and the Android edition is already discontinued.
3. **Pa11y's "long quiet stretch" was false.** Actual cadence: 9.0.0 May 2025, 9.0.1 Sep 2025, 9.1.0 Feb 2026, 9.1.1 Feb 2026, 10.0.0 Aug 2026. Corrected.
4. **WAVE's rejection contradicted the file's own opening.** Every headline statistic in this document is produced by the WAVE engine. Rewritten to demote the *extension UX* while crediting the engine and its eight-year dataset.
5. **Polypane visual 5 → 4.** Re-shot it myself. Competent, not exceptional; the "no gradient CTA" line was special pleading about a page that leads with a gradient headline; and the 5 was scored off the marketing site for a product whose value is its panel UI. Dissent recorded inline rather than deleting the original read.
6. **"On mobile, VoiceOver is 70.6%"** is a platform share, not a VoiceOver share. Corrected.
7. **EN 301 549 v4.1.1 open question resolved** — the ETSI PDF fetched directly, `Last-Modified: 02 Sep 2026`. The file's date was right and is now primary-sourced; only the OJEU timing remains an estimate.
8. Minor drift: axe-core 443 → 444 open issues; Lighthouse 30,750 → 30,751 stars.

**Popularity bias found.** Two real cases. The file treated *author-time a11y linting* as a React problem, which is React-default bias: `eslint-plugin-vuejs-accessibility` does **384,952 weekly downloads**, more than pa11y, jest-axe and every Guidepup package combined, and Svelte ships a11y checks **in the compiler** with no dependency at all. And "accessibility testing means axe" was repeated as engineering fact when it is sociology — **IBM Equal Access** is a maintained, ACT-mapped, Apache-2.0 second engine with better lifecycle documentation than anything Deque publishes free, and it was absent entirely. `cypress-axe` (615,193/wk) was missing for the same reason the listicles miss it.

**Additions:** cypress-axe (`strong`), non-React a11y linting (`strong`), IBM Equal Access (`situational`), W3C ARIA-AT (`reference-only`), Silktide extension (`situational`, with the enterprise-funnel caveat and its tooling claims explicitly marked unverified). Plus a new `avoid` entry for AI agents that auto-apply ARIA to clear violations.

**Vibecode column hardened.** It was accurate but under-argued. Added a standing paragraph to the AI-failures section tying the risk to WebAIM's own 2026 conclusion — which for the first time in eight years names "vibe coding" as a likely cause of the regression — and stating the rule directly: any tool whose output is a *grade* rather than a list of violations is a vibecode amplifier. Silktide's simulators were rated `medium` on exactly that basis.
