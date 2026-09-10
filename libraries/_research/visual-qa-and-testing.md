# Visual QA, Regression Testing and Design-Review Tooling

**Evaluated:** 2026-09 · **Researcher note:** The category has a founding myth — that screenshot comparison is flaky — and it is false in the way that matters. On this machine, a real 28 KB dashboard page at 1440×900 (1,296,000 pixels) screenshotted eight times in one context, three times in fresh contexts, and once from a separately-launched browser process produced **zero differing pixels every time**. The mechanism is deterministic. What is not deterministic is *the environment you run it in* and *what counts as a change*, and those are the two problems every tool in this file is actually solving. Meanwhile the vendors have all repositioned within the last year onto the same pitch — Chromatic: "enforces your UI standards, even when AI codes"; Argos: "Review product changes in the age of AI"; Applitools: "Keep AI code in check" — three companies, three homepages, one thesis, which is that generated UI outpaces human review. That thesis is correct and it is why this file exists.

## Verdict at a glance

The **vibecode-risk** column asks one question only: *does adopting this tool make the resulting interface look more generated?* For test infrastructure the answer is usually "it cannot", so most rows are `—`. The three non-`—` rows are real and specific, not invented to fill the column.

| Tool | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Playwright `toHaveScreenshot` + trace viewer | `essential` | Zero services, zero accounts, deterministic, already in your repo. Start and often stop here. | — |
| Playwright ARIA snapshots (`toMatchAriaSnapshot`) | `essential` | Structure regression without pixels. Reviewable in a PR diff. The single most underused thing here. | — |
| Storybook 10 + `@storybook/addon-vitest` | `essential` | Not a component browser any more — a test runner where every story is a render test for free. | high |
| axe-core in CI (`@axe-core/playwright`) | `essential` | Covered in depth in `accessibility-tooling.md`; do not re-derive it here. | — |
| Argos | `strong` | The hosted diff service with the least friction and the most legible pricing. Half Chromatic's overage. | — |
| Chromatic | `strong` (paid) | Best-in-class review UX, built by the Storybook team, priced so that a real design system lands on the $399 tier. | — |
| Vercel Toolbar comments | `strong` | Anchored comments on the live preview, free on all plans, and it also ships a11y/CLS/timing tools nobody uses. | — |
| Ladle | `strong` | Vite-native story browser, fast, 61 contributors, bursty releases. Correct when you want a workshop and not a test platform. | — |
| Polypane | `strong` (paid) | See `accessibility-tooling.md`. The only responsive tool that shows reduced-motion, forced-colors, dark and 320px at once. | — |
| Percy | `situational` | Alive and shipping, but fully absorbed into BrowserStack — you sign up *with a BrowserStack account*. Buy the suite or skip it. | — |
| Applitools Eyes | `situational` (paid) | Genuinely different tech (visual AI, not pixelmatch) and genuinely enterprise-priced with no public number. | medium |
| reg-suit | `situational` | Bring-your-own-S3, no vendor, no account. Alive but glacial: latest npm is 0.14.5 from Aug 2025. | — |
| BrowserStack / real-device | `situational` | The only answer to "does it work on a real iPhone", and the wrong answer to everything else. | — |
| Lighthouse CI | `situational` | Still 1.12M/wk. Last commit **June 2025**. Use it for perf budgets, never as a design or a11y gate. | high |
| Responsively | `situational` | Free multi-viewport browser, 25k stars — but AGPL-3.0, 325 open issues, and 2.0 is committed but unreleased. | — |
| Histoire | `avoid` | Still `1.0.0-beta.1`. Four years in beta. Last commit June 2026 was a dependency bump. | — |
| BackstopJS | `avoid` | Last real code commit **7 Sep 2024**. The Sep 2026 push was a README edit. 7.2k stars of momentum, zero maintenance. | — |
| Lost Pixel | `avoid` | Repo archived. Banner on their own site: "Lost Pixel is joining Figma. We are sunsetting the product." | — |
| `storycap` | `avoid` | v5.0.1, Sep 2024. Superseded by Storybook's own test runner and by Argos/Chromatic Storybook SDKs. | — |

## Recommendations by need

- **Default choice:** Playwright's built-in `toHaveScreenshot`, scoped to five to fifteen deliberately chosen surfaces, plus `toMatchAriaSnapshot` on your two or three hardest widgets. No account, no dashboard, no monthly snapshot budget. Add a hosted service only when a human other than you needs to approve diffs.
- **Best engineering:** Playwright. `@playwright/test` v1.63.0 (4 Sep 2026), 95,887 stars, 472 contributors, and the visual-comparison feature ships with the most honest warning in the category — its own docs list "power source (battery vs. power adapter)" as a cause of screenshot variance, on the second screen of the feature's introduction.
- **Best review experience:** Chromatic. Assigned reviewers, per-story diff, branch-aware baselines, and the only tool that understands "this component changed, therefore these 40 stories changed" as one decision rather than 40.
- **Best price-per-screenshot:** Argos. Pro starts at $100/mo including 35,000 screenshots with overage at **$0.004**, or **$0.0015 for Storybook** snapshots. Chromatic's Starter is $179/mo for the same 35,000 with overage at **$0.008** — twice Argos's rate and 5.3× the Storybook rate. Both verified on their public pricing pages 2026-09-09.
- **No service dependency at all:** Playwright locally for pixels; `reg-suit` with an S3 bucket you own if you need shared baselines without a vendor; the corpus's own `tools/audit.mjs` for the non-pixel checks. See the audit.mjs section below for what that combination still misses.
- **Component workshop:** Storybook 10 if you want tests, Ladle if you want a fast story browser and nothing else. Do not pick Histoire.
- **Lightest:** ARIA snapshots. Zero new dependencies if you have Playwright, and they diff as YAML text in the PR instead of as an image nobody can review on a phone.
- **Design review with non-engineers:** Vercel preview comments (free, all plans, anchored to the DOM element) if you deploy on Vercel; otherwise a deployed preview URL plus Figma comments on a screenshot, which is worse but works everywhere.
- **Premium worth it:** Chromatic for a team of five-plus that ships a shared design system. Applitools for an enterprise with a QA function and a browser matrix. Neither for a solo builder or an agent.

---

## If you only apply five things

1. **Do not turn on visual regression testing until something has visually regressed twice.** The cost is real and paid monthly; the benefit is conditional on having a shared surface that many people edit. If one person owns the CSS, you are the regression test.
2. **Screenshot components and states, never pages.** A page snapshot fails when anything on the page changes, which on a real product is every week. A snapshot of `Button/loading` fails when the button changes. Page-level snapshots are the single largest source of the "we abandoned it in three months" outcome.
3. **Never set `maxDiffPixelRatio`.** It is the wrong knob and the numbers below prove it: on a real page, `opacity: 0.99` on `<body>` — a change no human can see — moved 60,810 pixels (4.69%), while shifting the accent color token moved 1,903 (0.147%). Any ratio that absorbs the first ignores the second. Leave Playwright's `threshold: 0.2` YIQ per-pixel default alone; it already discards imperceptible antialias noise without discarding real changes.
4. **Pin the rendering environment or accept that baselines are per-machine.** Playwright names the platform in the filename (`example-test-1-chromium-darwin.png`) because it has to. Generate baselines in the same container CI uses, or your first CI run fails on font hinting and someone deletes the test.
5. **Diff the measurements, not just the pixels.** `tools/audit.mjs` produces byte-identical output across runs (verified: two runs, `diff` clean, 9.2s and 10.3s). A structured diff of "font sizes in use: 3 → 7" survives a font-rendering change that would fail every pixel snapshot, and it is the thing an agent can actually act on. Pixels tell you *something* changed; measurements tell you *what*.

---

## Measured reference: what a pixel diff actually costs

All figures below are from this session, on macOS 25.6, Chromium 148.0.7778.96, against `examples/dispatch-console/index.html` served over localhost at 1440×900 — a real 28 KB dashboard page with 7 animation/transition rules and no webfonts. Total pixels per frame: **1,296,000**.

**Determinism of the mechanism (the part that is not flaky):**

| Condition | Differing pixels |
|---|---|
| 8 repeat `page.screenshot()` in one context | **0** |
| 8 repeats with `animations:'disabled', caret:'hide'` | **0** |
| 3 fresh browser contexts, reloaded each time | **0** |
| Separately launched browser process, same Chromium build | **0** |
| github.com/microsoft/playwright reloaded over the network | **0** |

**Sensitivity of the mechanism (the part that is):**

| Change | Differing px | % of frame | Share of diffs ≤4/channel |
|---|---|---|---|
| `window.scrollTo(0, 1)` — one pixel of scroll | 167,653 | **12.94%** | 3.8% |
| `body { padding-top: +2px }` on every element | 271,183 | **20.93%** | 4.5% |
| Font stack swapped to Helvetica | 142,060 | **10.96%** | 7.0% |
| `body { letter-spacing: 0.1px }` | 90,608 | **6.99%** | 6.7% |
| **`body { opacity: 0.99 }` — invisible to a human** | **60,810** | **4.69%** | **100%** |
| **Accent color token hue shifted 2° — clearly visible** | **1,903** | **0.147%** | 0.6% |
| `html { font-size: 17px }` | 0 | 0% | — |

Read the last three rows together. **The invisible change produces a diff 32× larger than the visible one.** This is why percentage thresholds fail and why every team that tunes `maxDiffPixelRatio` until CI goes green has silently disabled the test. Playwright's default handles this correctly by accident of design: the 0.2 YIQ per-pixel threshold discards the entire `opacity: 0.99` diff (100% of its pixels are within 4/channel) while flagging the accent-token change (99.4% of its pixels are not).

The `font-size: 17px` row returning zero is a finding about the *page*, not the tool: `dispatch-console` sizes everything in `px`, so the root font-size is inert. Worth knowing before you assume a rem-scale test is testing anything.

**Cost of admission, measured by `npm i` into an empty project:**

| Package set | Install time | Packages | node_modules |
|---|---|---|---|
| `@playwright/test` | 2s | 3 | 18 MB *(+ 356 MB Chromium, or 196 MB headless shell, on `playwright install`)* |
| `storybook` alone | 6s | 75 | 55 MB |
| `storybook @storybook/react-vite react react-dom vite` | 55s | 169 | 153 MB |
| `@ladle/react react react-dom` | 55s | **407** | 125 MB |
| `histoire` | 11s | 207 | 88 MB |

Note the reversal against folk wisdom: **Ladle, the "small" alternative, installs 2.4× as many packages as a full Storybook 10 React+Vite setup.** Storybook 10 bundles its build toolchain into one `storybook` package; Ladle ships Vite, esbuild and swc as ordinary dependencies. Ladle's speed claim is about dev-server startup and bundle size, and it is true there — it is not true of install weight or supply-chain surface. My total Playwright browser cache across four retained versions is 2.2 GB, which is the number to budget for in CI images, not the 18 MB.

**Hosted pricing, verified from the public pages 2026-09-09:**

| | Free | Mid tier | Upper tier | Overage |
|---|---|---|---|---|
| **Chromatic** | $0 — 5,000 billed snapshots (≡25k turbosnaps), Chrome only | **Starter $179/mo** — 35,000 (≡175k turbosnaps), + Safari/Firefox/Edge | **Pro $399/mo** — 85,000 (≡425k turbosnaps), custom domain | **$0.008**/snapshot |
| **Argos** | $0 forever — 5,000 screenshots | **Pro from $100/mo** — 35,000 included | Enterprise — custom | **$0.004**, or **$0.0015** for Storybook |

The turbosnap ratio is 5:1 — Chromatic bills a snapshot it determines is unaffected by the diff at one fifth rate. Argos's pricing page takes a direct shot at that unit: "Explicit per-screenshot rates you can read and verify."

**Worked snapshot math, so you can predict the bill before you adopt.** A 40-component design system at 3 variants, 2 themes and 3 viewports is 720 snapshots per build. A team merging 40 PRs a month at ~3 CI runs each is 120 builds → **86,400 snapshots/month**. That lands one thousand snapshots over Chromatic's $399 Pro tier and about $205/mo of Argos overage on top of the $100 base. Both are defensible for a five-engineer team and neither is defensible for a two-person one. Run this arithmetic *before* the trial, not after the first invoice.

---

## Does visual regression testing pay for itself?

It pays when **three conditions hold at once**. Fewer than three and the suite is deleted within a quarter — usually by whoever is on call the night it blocks a hotfix.

1. **More than one person edits the same visual surface.** A shared design system, a component library, a marketing site with several contributors. Visual regression is a coordination tool. With one editor it is a very expensive undo.
2. **The surface is stable enough that most builds produce zero diffs.** If your green rate is below ~90%, every PR carries a review chore and the team learns to click Approve without looking. Lost Pixel's own marketing screenshot shows a build row reading `19.11% APPROVED PAGE landing` — a fifth of the page changed and it was approved. That is the failure mode, printed on the vendor's homepage.
3. **Someone owns baseline hygiene.** Baselines rot. Somebody has to delete dead ones, re-approve intentional changes promptly, and keep the rendering environment pinned. Unowned, the diff queue grows until the only viable action is `--update-snapshots` on everything, at which point the suite tests nothing.

**It reliably does not pay for:** a solo project; an app whose main screens contain live data, charts, timestamps, avatars or A/B variants (mask them and you have masked the interesting part); anything pre-product-market-fit where the design is supposed to change weekly; and — importantly for this corpus — an agent's own build loop, where the "baseline" is a design you have not finished designing yet.

**The three-month abandonment pattern, in order:** page-level snapshots → 30–60% of PRs show a diff → reviewers batch-approve → someone raises `maxDiffPixelRatio` to make CI green → the suite now passes on real regressions → the next real regression ships → the suite is deleted as "it never caught anything". Every step follows from step one. Screenshot components, not pages.

**What survives contact with a real team,** ranked by observed friction:

- **Playwright `toHaveScreenshot`, ~10 targeted snapshots.** Lowest friction because it is in the repo the team already has, the diff artifact is written to disk next to the failure, and `--update-snapshots` is a normal git commit that a reviewer can see. Survives indefinitely.
- **Argos.** Lowest friction of the hosted options: install one package, get a PR check, review in a web UI that shows baseline/changes/overlay side by side with the browser build and viewport printed in a metadata rail. Its own product screenshot includes an inline comment thread on a diff and an "SDK Outdated" warning — both are the marks of a tool built by someone who has run one.
- **Chromatic.** Higher friction because it requires Storybook, but the friction buys the only genuinely good multi-story review flow. Teams that already live in Storybook keep it; teams that adopt Storybook *in order to* get Chromatic usually abandon both.
- **reg-suit.** Survives because there is nothing to cancel — it is a CLI plus your own S3 bucket. Costs you the report hosting and the setup afternoon. Its own homepage still misspells the product as "VISUAL REGRESSION TESTING **SUIT**" in 96px type, which tells you the maintenance budget.
- **BackstopJS.** Does not survive, and has not been maintained since September 2024 regardless.

---

## What an agent can run locally with no service dependency

This is the mode this corpus actually operates in, so it gets specifics.

**1. Screenshot and look.** `tools/shot.mjs` already does this against the shared Chromium in `.cache/browser-ws`. This is not testing; it is the step that catches the things no assertion can express. Non-negotiable and covered in `system/7-critique.md`.

**2. Pixel baselines with no vendor.** `expect(page).toHaveScreenshot()` writes PNGs next to the spec file. Diffs on failure are written to `test-results/` as `-expected`, `-actual` and `-diff` triplets. Commit the baselines. That is the entire system, and it costs one dependency you already have. Defaults you should know rather than change: `threshold: 0.2` (YIQ), `maxDiffPixels` and `maxDiffPixelRatio` both **unset**, `animations: 'disabled'`, `scale: 'css'`, waits for `document.fonts.ready`, and retries capture until two consecutive frames match before comparing.

**3. Structure baselines with no images.** `await expect(page).toMatchAriaSnapshot()` serialises the accessibility tree to YAML:

```yaml
- banner:
  - link "Dispatch"
- main:
  - heading "Active incidents" [level=2]
  - button "Assign"
```

A refactor that turns a `<button>` into a `<div onClick>` fails this test; a color change does not. That is precisely the inverted sensitivity you want, it reviews as text in a PR, and it is the check most directly aimed at the failure mode this corpus exists to prevent.

**4. Trace, when something fails and you cannot see why.** `playwright test --trace on` produces a `trace.zip`; `npx playwright show-trace` opens it locally, and `trace.playwright.dev` is a client-side PWA that states plainly in its empty state: "it does not send your trace anywhere, it opens it locally." The viewer gives a timeline, a per-action Before/Action/After DOM snapshot, and Locator / Call / Log / Errors / Console / Network / Source / Attachments tabs. For an agent debugging its own UI this is better than any screenshot: you get the DOM as it was at the moment of failure, not a picture of it.

**5. The non-pixel gates.** `tools/audit.mjs` — axe, overflow, contrast, target size, and design-consistency counts, in ~9 seconds per width, deterministic across runs.

### What `tools/audit.mjs` is missing that these tools provide

Measured against the current file. Ranked by how much it costs you.

1. **No baseline, therefore no delta.** It reports absolute state and cannot say "this got worse." Everything else in this document is a diff tool; `audit.mjs` is a thermometer. **The highest-value addition is not pixels — it is persisting the `probe` object to `.cache/audit-baseline.json` and diffing the structured numbers.** "font sizes in use 3 → 9", "distinct shadows 2 → 6", "lowContrastCount 0 → 4" are regressions an agent can act on, they survive font-rendering differences that break pixel baselines, and they cost about thirty lines.
2. **Initial render state only.** `goto` + 1500ms + one `evaluate`. Modals, dropdowns, popovers, hover, focus-visible, error states, empty states, the "too much data" state and every loading state are never audited — and per this corpus's non-negotiable #7, those states are where generated UI actually fails. Playwright's `page.click()` before the audit, or Storybook `play` functions, reach them. This is the second-biggest gap.
3. **No keyboard walk.** It counts elements with `outline: none` but never presses Tab. It cannot detect focus order, focus traps, or the SPA route-change focus loss that `accessibility-tooling.md` names as the most common AI-generated failure and that no scanner detects. Twenty lines of `page.keyboard.press('Tab')` in a loop, recording `document.activeElement`, gets you a focus-order snapshot that diffs as text.
4. **No artifact on failure.** It prints selectors. It does not save the screenshot that would let you *see* the failure, and does not emit machine-readable JSON — so the output is for a human terminal, not for an agent to branch on. `--json` plus a screenshot-on-failure would fix both.
5. **Chromium only.** No WebKit pass, so Safari-specific breakage — `backdrop-filter` compositing, `text-wrap: balance`, sticky inside `overflow` — is invisible. Playwright already has WebKit installed (289 MB in the cache); adding a `--browser webkit` flag is nearly free.
6. **No user-preference matrix.** No `prefers-color-scheme: dark`, `prefers-reduced-motion: reduce`, or `forced-colors: active` pass. Forced-colors is the one that matters: shadows and background-images are dropped, so any component whose only boundary is a shadow disappears. Polypane's entire value proposition is showing these at once; Playwright's `colorScheme` / `forcedColors` / `reducedMotion` context options give you the same coverage headlessly.
7. **axe pinned to 4.10.2 from CDN.** Current is 4.13.0. Already flagged in `accessibility-tooling.md`; it also means the a11y half of the audit silently degrades offline or under a strict CSP, which the code does handle but by skipping.

What `audit.mjs` already does that the commercial tools mostly do not: composite alpha correctly over the nearest painted background when computing contrast, parse `oklch()` rather than misreading it as `rgb()`, refuse to report a contrast ratio for text over a gradient instead of inventing one, and count distinct radii/shadows/type sizes as a token-drift signal. That last one has no equivalent in any product in this file, and it is the check most specific to this corpus's purpose.

---

## The workshop question: does Storybook still earn its cost?

**Yes, and for a different reason than in 2023.** The current version is **10.6.0** (2 Sep 2026, with `v11.0.0-alpha.0` already tagged the same day) — if your notes say Storybook 9, they are two majors stale. The thing that changed is that Storybook stopped being primarily a component browser and became primarily a test runner. `@storybook/addon-vitest` pulls **4,262,481 weekly downloads** against the older Playwright-based `@storybook/test-runner`'s 1,910,262 — the Vitest path has won 2.2:1 in under two years. The docs page is titled "How to test UIs with Storybook" and lists five test types: render, interaction, accessibility, visual, snapshot.

**The cheapest useful test in this entire document is a Storybook render test**, and it is free: every story you already wrote is automatically an assertion that the component mounts without throwing, in that exact prop combination. No new files, no baselines, no maintenance, no flake. If you write stories at all, turn this on today.

**Storybook is not worth it when:** you have no shared components (a marketing site, a one-off dashboard); nobody outside the team will ever browse it; or you would be adopting it *in order to* buy Chromatic. The 153 MB / 169-package install and the second build pipeline are real, and a second build pipeline rots — a Storybook that fails to build is a Storybook that gets deleted.

**Its vibecode risk is `high`, and it is the only genuinely interesting risk in this file.** Every AI-generated Storybook setup produces the same story file: `Primary`, `Secondary`, `Large`, `Small`, `Disabled` — the CSF template, propagated by `npx storybook init`'s own example. Those five stories snapshot five prop permutations of a button and tell you nothing, because the states that break are `loading`, `error`, `empty`, `truncated-label`, `long-label-at-320px`, `focus-visible`, and `dark`. A story set that documents props instead of states is a documentation artifact that costs the same to maintain as a test suite and catches nothing. Write stories for states, not for props.

**Ladle** — 2,982 stars, 61 contributors, `@ladle/react` 5.1.1 (Nov 2025), last push 28 Jun 2026 (a Vite 8 upgrade). Bursty but not abandoned: essentially one maintainer shipping in concentrated batches. Correct when you want a Vite-native story browser with a fast dev server and no test platform attached, and you are on React. Its own homepage does the honest thing and shows a real Safari window at `baseweb.netlify.app` with the real story tree — on the right, unusually — rather than an idealised mock.

**Histoire** — `avoid`. Latest npm is `1.0.0-beta.1`, published 7 Jan 2026; the project has been in beta since 2022. Last commit 14 Jun 2026 was a `launch-editor` bump for a shell-quote patch. 203 open issues, 3,571 stars. Its homepage shows six emoji-headed feature cards and **no screenshot of the tool at all**, which for a visual workshop is the tell. Vue teams should use Storybook's Vue framework; there is no longer a reason to take this dependency.

---

## Accessibility automation, briefly

`accessibility-tooling.md` is the authority and it has been updated since I started this file. Do not re-derive its numbers here. The three things that belong in a *testing* document:

- **Automation ceiling is ~53% of issue volume** (per that file's corrected figure, revising Deque's much-quoted 57%). A green axe run is a floor.
- **The three layers use the same rule IDs**: `eslint-plugin-jsx-a11y` (or Biome/oxlint) at author time → `@storybook/addon-a11y` per component variant, at **7,448,182 weekly downloads** → `@axe-core/playwright` per route in CI, at 9,082,376. A fix at the lint layer removes a traceable CI failure. That traceability is the reason to use one engine at three layers rather than three tools.
- **`@lhci/cli` is stale.** 1,121,720 weekly downloads on 0.15.1 (25 Jun 2025), and the repo's last commit is 26 Jun 2025 — fourteen months. It still works and it is still the right tool for a performance budget in CI. It is `high` vibecode risk for the same reason Lighthouse always was: it emits a score, product managers turn the score into an OKR, and "we're at 98" ends the accessibility conversation.
- **Pa11y** (10.0.0, Aug 2026, LGPL-3.0) remains the right answer for crawling hundreds of static URLs with no test suite, with `runners: ['axe']` set on day one.

## Responsive and device tooling

- **Playwright contexts are the default and they are free.** `newContext({ viewport, deviceScaleFactor, isMobile, hasTouch, colorScheme, forcedColors, reducedMotion })` plus `devices['iPhone 15']` covers the emulation half of this entirely, headlessly, in CI. `audit.mjs` already uses the first three.
- **Polypane** is the paid tool worth paying for if you build UI daily — see `accessibility-tooling.md`. Its argument is that seeing 320px, reduced-motion, forced-colors and dark simultaneously beats reading a report about them, and that argument is correct.
- **Responsively** is the free alternative and the caveats are real: **AGPL-3.0** (which will fail some corporate license reviews for a tool that renders your proprietary app), 325 open issues, and a "Responsively 2.0: full redesign, canvas layout, present mode" commit dated 1 Sep 2026 against a latest *release* of v1.18.0 from 17 Feb 2026. Its landing page — pastel gradient wash, hand-drawn green underline swoosh, a 🎉, a Carbon ad — is itself a decent example of what this corpus calls the generated look.
- **Real-device testing (BrowserStack et al.)** answers exactly one question emulation cannot: does it work on the actual iOS Safari, with the actual keyboard, the actual `100vh` behaviour, the actual `-webkit-overflow-scrolling` momentum, and the actual notch. That question is worth real money for a consumer product and worth nothing for an internal tool. Do not buy it to run visual regression; buy it to touch the thing.
- **The check emulation cannot fake:** iOS Safari's dynamic viewport (`dvh` vs `vh` as the URL bar collapses), and touch-scroll momentum interacting with `position: sticky`. Both are where responsive layouts actually break, and both need a device or a simulator.

## Design-review workflow

- **Vercel Toolbar comments** are enabled by default on every preview deployment, on all plans, free. Comments anchor to a DOM element — the thread shows the selected text and its route — support @-mentions, emoji reactions, resolve, screenshot attachment, and can be linked to Slack threads. **The constraint that decides it: every participant needs a Vercel account.** For an internal team that is nothing; for a client review it is the reason the feedback arrives as a Slack screenshot instead. The same toolbar also ships an Accessibility Audit Tool, an Interaction Timing Tool, a Layout Shift Tool, Draft Mode and Edit Mode, which almost nobody has opened.
- **Figma comments** are the right place for feedback on the *design*, and the wrong place for feedback on the *build*. A comment on a Figma frame cannot reference the state that broke, and the frame does not have states. Use them before implementation, not after.
- **CodeSandbox / StackBlitz** are for the reproduction, not the review — a shareable, runnable minimal case attached to a bug. StackBlitz's WebContainer runs Node in the browser with no server round-trip, which makes "here is the bug, click to run it" genuinely one click. Ladle links a StackBlitz demo from its homepage as a third primary CTA, which is the correct use.
- **The comment-on-the-diff pattern** is the one that actually closes the loop, and only Argos and Chromatic have it: a threaded discussion attached to a specific visual change in a specific PR. That is strictly better than a Slack screenshot with "the spacing looks off?" and it is most of what you are paying for.

---

## Scorecards

### Playwright visual comparisons + trace viewer — `essential`
- **What:** `expect(page).toHaveScreenshot()` (pixelmatch-based), `expect(page).toMatchAriaSnapshot()` (accessibility-tree YAML), and the trace viewer — a timeline of every action with before/after DOM snapshots, console, network and source.
- **Verdict:** The correct starting point for essentially everyone, and the correct *ending* point for most. It is deterministic on a fixed environment (measured: 0/1,296,000 pixels across repeats, fresh contexts and separate processes), it requires no account, the baselines are files in git, and the failure artifacts land in `test-results/` where an agent can read them. The defaults are well chosen and the single most common mistake is changing them: `threshold: 0.2` YIQ with `maxDiffPixels`/`maxDiffPixelRatio` unset is a per-pixel perceptual tolerance with zero count tolerance, which is exactly right. Its docs' own warning about host OS, hardware and battery-versus-mains is the most honest sentence any vendor in this category has published. The trace viewer is separately excellent and under-used: for a failing UI test it gives you the DOM at the moment of failure rather than a picture of it, and `trace.playwright.dev` is a client-side PWA that uploads nothing.
- **Use when:** Always, first. · **Don't use when:** You need non-engineers to approve diffs in a web UI, or you need a cross-machine shared baseline — Playwright has no baseline server and pretending otherwise is how teams end up committing 400 MB of PNGs.
- **Scores /5:** visual 4 · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 4 · stability 5 · originality 4
- **Evidence:** ★95,887 · v1.63.0 2026-09-04 · last push 2026-09-10 · `@playwright/test` 54,399,047 wk npm · `playwright` 81,838,822 wk npm · 472 contributors · Apache-2.0 · 166 open issues
- **Looked at:** `playwright.dev/docs/test-snapshots` — Docusaurus, dense left rail (note the new "Agents" entry under Playwright Test), and a yellow WARNING callout placed as the *second* element after the intro code sample, listing "host OS, version, settings, hardware, power source (battery vs. power adapter), headless mode". Also `trace.playwright.dev` — full app chrome rendered even in the empty state: a 0–30s timeline, an Actions/Metadata rail with a filter, Before/Action/After tabs over the snapshot pane, and a Locator/Call/Log/Errors/Console/Network/Source/Attachments bottom bar. Both are unstyled-by-choice and information-first.
- **Vibecode risk:** —
- **Link:** https://playwright.dev/docs/test-snapshots

### Storybook 10 — `essential`
- **What:** Component workshop, now primarily a test runner. `@storybook/addon-vitest` runs stories as Vitest browser-mode tests; `@storybook/addon-a11y` runs axe per story; Chromatic/Argos/Percy SDKs snapshot each story.
- **Verdict:** Still earns its cost, on the test story rather than the documentation story. Render tests are free — every story is an assertion the component mounts in that prop combination — and interaction tests via `play` functions reach the states that a page-level audit cannot. The install is heavier than folklore admits in bytes (153 MB with a React+Vite framework) and lighter than folklore admits in packages (169, versus Ladle's 407). The real cost is the second build pipeline. The real risk is that the stories you generate document props instead of states.
- **Use when:** You maintain shared components more than one person edits. · **Don't use when:** You are adopting it to unlock a paid visual service, or nobody outside the team will ever open it.
- **Scores /5:** visual 4 · interaction 5 · a11y 5 · engineering 4 · maintenance 5 · docs 5 · customization 5 · perf 3 · stability 4 · originality 4
- **Evidence:** ★91,026 · v10.6.0 2026-09-02 (v11.0.0-alpha.0 same day) · last push 2026-09-10 · `storybook` 19,523,428 wk npm · `@storybook/addon-vitest` 4,262,481 wk · `@storybook/test-runner` 1,910,262 wk · `@storybook/addon-a11y` 7,448,182 wk · ~370 contributors · MIT · 1,828 open issues
- **Looked at:** storybook.js.org — a noisy pink→red→navy gradient hero, "Version 10" set in ~64px at the right edge, self-reported "88.28m installs per month / 2282 contributors", an "Introducing MCP for React" pill, and `AI` promoted to a top-level nav item next to a `Visual Test ↗` link that leaves for Chromatic. Below the fold a Development/Interaction testing/Visual testing/Documentation tab strip over a real `localhost:6006` screenshot with the Interactions panel showing a green PASS and step-by-step assertions. The docs page carries a "Copy markdown" button — built for agents, and worth noting.
- **Vibecode risk:** **high** — not the tool, the stories. `npx storybook init` seeds Primary/Secondary/Large/Small, every model copies that shape, and a prop-permutation story set is a maintenance cost that catches nothing.
- **Link:** https://storybook.js.org/docs/writing-tests

### Argos — `strong`
- **What:** Hosted visual review. SDKs for Playwright, Cypress, Storybook, Puppeteer and static builds; PR status check; web diff review with baseline/changes/overlay.
- **Verdict:** The lowest-friction hosted option and the one I would put in front of a team that has never done this. Install one package, get a PR check, review in a UI that prints the browser build, viewport, source URL and spec file in a metadata rail beside every diff — which is the thing that turns "the header moved" into "the header moved on Chromium 151 at 480px in `screenshot-pages.spec.ts`". Threaded comments on individual diffs. Pricing is per-screenshot and legible: $0 up to 5,000, Pro from $100/mo with 35,000 included, overage $0.004 or $0.0015 for Storybook — half and a fifth of Chromatic's respectively. The caveat is scale: 621 stars, 15 contributors, one small company. Weigh that against a design system's baseline history living in their database.
- **Use when:** You want hosted review without Storybook, or you want Chromatic's shape at half the marginal cost. · **Don't use when:** You need enterprise procurement to sign off on a 15-contributor vendor, or you need cross-browser rendering *farms* rather than diffs.
- **Scores /5:** visual 5 · interaction 5 · a11y — · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 4 · originality 4
- **Evidence:** ★621 · last push 2026-09-09 · 15 contributors · MIT (platform repo) · 4 open issues · `@argos-ci/playwright` v7.5.0 2026-09-04, 185,481 wk npm · `@argos-ci/storybook` v6.3.0 2026-09-05, 53,142 wk npm
- **Looked at:** argos-ci.com — near-white with a faint architectural grid, one violet accent, "Review product changes in the age of AI." set centred in ~72px. The hero product shot is a real build screen, not a mock: a three-pane diff (baseline from `main`, changes from `refactor-product-page`, red overlay), a metadata rail listing `@playwright/test v1.62.0` / `Chromium v151.0.7922.34` / `480 × 1280` / the localhost URL / the spec path, an "SDK Outdated" warning left visible, and an inline comment thread from a named person. Showing your own stale-SDK warning in your hero image is a confidence move.
- **Vibecode risk:** —
- **Link:** https://argos-ci.com/

### Chromatic — `strong` (paid)
- **What:** Hosted visual + interaction + accessibility testing for Storybook, from the Storybook maintainers. TurboSnap skips snapshots for stories unaffected by the diff, billed at 1/5 rate.
- **Verdict:** The best review experience in the category and the one whose pricing you must model before you adopt. Branch-aware baselines, assigned reviewers, and — the feature that matters at design-system scale — it groups "this component changed, therefore these 40 stories changed" into one decision instead of 40. That single behaviour is the difference between a reviewable queue and batch-approval. Against it: it requires Storybook, the snapshot unit is confusing (billed snapshots versus turbosnaps at 5:1), and the free tier's 5,000 snapshots is under seven builds of a 40-component system. `chromatic` at 7.5M weekly downloads and `@chromatic-com/storybook` at 3.6M means a very large number of repos already have it wired.
- **Use when:** Five-plus engineers on a shared Storybook design system with real review discipline. · **Don't use when:** You do not have Storybook, or you cannot name the person who owns baseline hygiene.
- **Scores /5:** visual 5 · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 4 · stability 5 · originality 4
- **Evidence:** `chromatic` v18.7.4 2026-09-09, 7,479,627 wk npm · `@chromatic-com/storybook` v5.3.1 2026-09-02, 3,605,435 wk npm · `chromaui/chromatic-cli` ★337, last push 2026-09-09, MIT, 36 open issues · pricing verified on chromatic.com/pricing 2026-09-09
- **Looked at:** chromatic.com — near-black masthead, "Ship flawless UIs with less work" in ~56px, and sub-copy that has clearly been rewritten this year: "This enforces your UI standards, even when AI codes. Assign reviewers to speed up sign-off and provide agents with validated UI context." A gradient-bordered "Introducing Accessibility Testing" pill. Below the hero a DEVELOP/TEST/DELIVER rail over a purple→red gradient band carrying real component thumbnails. The pricing page is a four-column dark table where every tier states both a snapshot count and a turbosnap equivalent — the honest presentation of a genuinely confusing unit.
- **Vibecode risk:** —
- **Link:** https://www.chromatic.com/

### Percy (BrowserStack) — `situational`
- **What:** Hosted visual review, acquired by BrowserStack in 2020. SDKs for most runners; a new "Visual Scanner" that crawls URLs with no code.
- **Verdict:** Actively maintained — `@percy/cli` 1.32.9 shipped 8 Sep 2026 and the repo commits daily — and yet hard to recommend standalone, because it has been fully absorbed. The primary CTA on percy.io is "**Sign up with BrowserStack**"; there is no independent Percy account. That is fine if you are buying the BrowserStack suite and want visual diffs bundled with the device cloud, and it is a strange dependency to take if you are not. The 462,780 weekly CLI downloads are substantial and largely enterprise inertia.
- **Use when:** You already pay BrowserStack. · **Don't use when:** You do not — Argos does the same job with legible pricing and no parent-company account.
- **Scores /5:** visual 3 · interaction 4 · a11y — · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 4 · originality 2
- **Evidence:** `@percy/cli` v1.32.9 2026-09-08, 462,780 wk npm · `@percy/playwright` v1.1.2 2026-08-06, 143,942 wk · `@percy/storybook` v10.0.2 2026-08-21, 115,790 wk · repo `percy/cli` ★86, last push 2026-09-09, 57 open issues, MIT · (the old `percy/percy-cli` repo is archived since 2021 — don't cite it)
- **Looked at:** percy.io — a purple announcement bar for "Visual Scanner", the logo locked up with "by BrowserStack", and a hero that spends roughly half the viewport on "Your all-in-one visual review platform" with nothing under the CTAs. The product image below is a **wireframe mock** — grey placeholder rectangles labelled "Build #2 / 8 visual changes" — which is a peculiar choice for a product whose entire job is showing you real rendered UI. Compare Argos and Chromatic, both of which show real builds.
- **Vibecode risk:** —
- **Link:** https://percy.io/

### Applitools Eyes — `situational` (paid)
- **What:** Visual testing built on a trained model rather than pixel comparison, plus a cross-browser/device rendering grid, component testing and accessibility checks.
- **Verdict:** The one genuinely different technology in this document. Instead of comparing pixels it classifies whether a difference is a *change a person would notice*, which is aimed squarely at the antialias/font-hinting noise that makes pixel baselines environment-bound — and per the measurements above, that noise is real (the `opacity: 0.99` row). If it works as advertised, cross-machine baselines stop being a problem, which is the single hardest problem here. The cost of finding out is a sales call: there is no public price, `@applitools/eyes-playwright` is `SEE LICENSE IN LICENSE`, and 51,695 weekly downloads against Playwright's 54M puts adoption at roughly 0.1%. The hero claim — "Backed by 4 billion proprietary training images, we eliminate false alarms" — is unverifiable by construction.
- **Use when:** Enterprise, a QA function, a real browser/device matrix, and pixel baselines have already failed you. · **Don't use when:** You are a small team, an individual, or an agent — the evaluation cost alone exceeds the value.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 3 · customization 3 · perf 4 · stability 4 · originality 5
- **Evidence:** `@applitools/eyes-playwright` v1.48.4 2026-08-31, 51,695 wk npm, proprietary licence, no public source repo · pricing not published
- **Looked at:** applitools.com — a monospace teal eyebrow reading "DETERMINISTIC AI END-TO-END TESTING" over a ~64px "Keep AI code in check with proven Visual AI validation", magenta primary CTA, and an eight-item teal checkrow (Functional, Visual, Cross-Browser, Cross-Device, Component, Accessibility, API, PDF). No product screenshot above the fold at all — the platform-breadth pitch, aimed at a buyer rather than a user.
- **Vibecode risk:** medium — the "AI decides what counts as a change" model is exactly the affordance that lets a team stop looking at diffs. That is the point of the product and also its hazard.
- **Link:** https://applitools.com/

### reg-suit — `situational`
- **What:** A CLI that compares screenshot sets, publishes an HTML report to your own S3 bucket, and comments the result on the PR. Plugin-based; brings no capture mechanism of its own.
- **Verdict:** The correct answer when the requirement is "shared baselines, no vendor". You supply the bucket, you own the images, there is no account and nothing to cancel. Genuinely alive — repo pushed 9 Sep 2026 — but the release cadence is the problem: npm `latest` is **0.14.5 from 26 Aug 2025**, and a `v0.14.6` version commit sits unpublished in the repo since 16 Mar 2026. 51 contributors, 1,292 stars, 114,320 weekly downloads mostly from Japanese engineering orgs where it originated. Its report UI is the good part: a filterable left rail grouping CHANGED / NEW / PASSED by filename tree, and a detail grid on a checkerboard ground.
- **Use when:** Regulatory or procurement constraints rule out a SaaS, and you can run an S3 bucket. · **Don't use when:** You want the setup to take an hour.
- **Scores /5:** visual 3 · interaction 3 · a11y — · engineering 4 · maintenance 3 · docs 3 · customization 5 · perf 4 · stability 4 · originality 3
- **Evidence:** ★1,292 · last push 2026-09-09 · npm `reg-suit` **v0.14.5 2025-08-26** (repo has an unpublished v0.14.6 dated 2026-03-16) · 114,320 wk npm · 51 contributors · MIT · 72 open issues
- **Looked at:** reg-viz.github.io/reg-suit — dark teal ground, a diagonal white wedge, and a ~96px condensed uppercase headline that reads "VISUAL **REG**RESSION TESTING **SUIT**". The product's own homepage has been missing the E in "SUITE" for years. Everything else is competent: the report screenshot shows the CHANGED (8 items) / NEW / PASSED tree grouped by `atoms/`, `molecules/`, `organisms/`, which tells you exactly which community it was built for.
- **Vibecode risk:** —
- **Link:** https://github.com/reg-viz/reg-suit

### Vercel Toolbar comments — `strong`
- **What:** Anchored comment threads on preview deployments, injected by the Vercel Toolbar. Free on all plans; also carries an Accessibility Audit Tool, Interaction Timing Tool, Layout Shift Tool, Draft Mode and Edit Mode.
- **Verdict:** The best design-review loop available to a team that already deploys on Vercel, and it costs nothing. A comment attaches to a DOM element, so the thread carries the selected text and its route rather than "the thing near the top". @-mentions, reactions, resolve, screenshot attachment, Slack thread linking. The one hard constraint decides everything: **every participant needs a Vercel account**, which is free but is a signup wall between your client and their feedback. The bundled audit tools are a genuine surprise — a Layout Shift Tool that visualises CLS on the live preview is exactly the check nobody runs.
- **Use when:** Internal team, Vercel deployment, feedback that must reference a specific rendered element. · **Don't use when:** External stakeholders who will not create an account, or you are not on Vercel.
- **Scores /5:** visual 5 · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 4 · customization 2 · perf 4 · stability 5 · originality 4
- **Evidence:** Documented as "enabled by default on all preview deployments, for all account plans, free of charge. The only requirement is that all users must have a Vercel account" — vercel.com/docs, read 2026-09-09
- **Looked at:** the Comments Overview docs page — Geist-set, generous measure, a flag-icon callout stating "Comments are available on all plans" before any prose. The embedded product shot shows a pink text highlight on a live heading with the thread panel anchored beside it, the selected element's text *and* its route (`/docs`) reproduced inside the thread as context, a reaction row, and a camera icon in the composer. That "show the anchor context inside the thread" detail is what makes an anchored comment still legible a week later.
- **Vibecode risk:** —
- **Link:** https://vercel.com/docs/workflow-collaboration/comments

### Ladle — `strong`
- **What:** A Vite-native story browser for React. Reads CSF stories, no config, ships a small runtime.
- **Verdict:** Good and honest, and correctly scoped: it is a workshop, not a test platform. Fast dev server, tiny production build, and it reuses your existing Vite config rather than maintaining a parallel one — which is the real Storybook tax it avoids. Two caveats measured rather than assumed: the install is **407 packages / 125 MB**, more than double Storybook 10's package count, because Ladle depends on Vite/esbuild/swc directly while Storybook bundles them; and development is bursty — 61 contributors but effectively one maintainer, with the June 2026 push being a Vite 8 upgrade after six quiet months.
- **Use when:** React, Vite, you want a story browser and explicitly do not want a test framework. · **Don't use when:** You need per-story a11y and interaction testing in CI — that is Storybook's lane now.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 3 · docs 4 · customization 3 · perf 5 · stability 4 · originality 3
- **Evidence:** `tajo/ladle` ★2,982 · `@ladle/react` v5.1.1 2025-11-04 · last push 2026-06-28 · 295,649 wk npm · 61 contributors · MIT · 44 open issues
- **Looked at:** ladle.dev — Docusaurus with a full-bleed royal-blue hero, three white outline buttons (Get Started / Demo / StackBlitz), and a real Safari window screenshot at `baseweb.netlify.app` showing the story tree on the *right*, the canvas left, and a four-icon floating control bar (theme, width, RTL, Ladle) bottom-left. Real chrome, real URL, real component — no idealised mock. Feature headings below are emoji-prefixed, which dates it.
- **Vibecode risk:** —
- **Link:** https://ladle.dev/

---

## Rejected / avoid

- **Lost Pixel** — repo **archived** 22 Apr 2026 with the commit message "Lost Pixel team is joining Figma"; the live site carries a banner reading "We are sunsetting the product." Before the acqui-hire, the last actual code commit was 25 Nov 2024 and npm `latest` is 3.22.0 from 14 Nov 2024. It had been unmaintained for seventeen months before the announcement. Do not start here; if you are on it, migrate to Argos, which occupies the same "open-source alternative to Percy & Chromatic" position it advertised.
- **BackstopJS** — 7,180 stars, 74,580 weekly downloads, and the last substantive commit is **7 Sep 2024**; the 8 Sep 2026 push that makes GitHub show it as recently active was a README edit removing old news links. npm `latest` 6.3.25 is from Sep 2024, 578 open issues. It genuinely was the standard from 2015–2020 and it is now a two-year-stale Puppeteer wrapper. Playwright's built-in comparison does the same job with a maintained runner.
- **Histoire** — `1.0.0-beta.1` (Jan 2026) after four years. Last commit Jun 2026 was a transitive security bump. 203 open issues, 64,464 weekly downloads decaying. A workshop tool whose homepage contains no image of the workshop.
- **`storycap`** — v5.0.1, Sep 2024, 66,570 wk npm. It was the way to get screenshots out of Storybook before Storybook had a test runner. Now use `@storybook/addon-vitest`, or the Argos/Chromatic Storybook SDKs.
- **`maxDiffPixelRatio` as a flake remedy** — see the measurements. Any ratio large enough to absorb rendering noise is 30× larger than a real token change. If a diff is flaky, fix the environment (pin the container, disable animations, mask the clock) — never widen the tolerance.
- **Full-page and full-*site* snapshots** — the "just snapshot every route" setup takes an afternoon and dies in a quarter. Diffing is only useful at a granularity where a human can decide "yes, intentional" in under five seconds.
- **"Lighthouse accessibility score" or any 0–100 number as a design gate** — restated here because it keeps coming back through Lighthouse CI. Report violations, never a grade. `accessibility-tooling.md` has the argument in full.
- **Snapshot-testing rendered HTML strings (`toMatchSnapshot` on markup)** — it fails on every class-name change and passes on every visual regression. Precisely inverted sensitivity. Use ARIA snapshots, which assert roles and accessible names, or use pixels. Not markup.
- **`@percy/percy-cli` / the `percy/percy-cli` GitHub repo** — archived since 2021, 19 stars. The live project is `percy/cli`. A surprising number of blog posts cite the dead one.

---

## When this advice is wrong

- **If you ship a design system consumed by other teams, invert rule 1.** Visual regression is not optional there; a silent 2px change in your `Button` becomes forty broken layouts you never see. Start with Chromatic or Argos on day one and accept the bill.
- **If your CI is not containerised, ignore the "zero pixels differ" result above.** It holds because one machine, one Chromium build. A GitHub-hosted runner rotating between image versions produces font-hinting diffs that no threshold fixes. Either pin a container image, or run visual tests only locally with `--update-snapshots` reviewed in the PR — which is a legitimate, underused mode.
- **If you are building an interface that is *supposed* to look different every week, all of this is overhead.** Pre-PMF products, marketing experiments, and an agent's own iterative build loop have no stable baseline to regress against. Screenshot and *look*; do not diff.
- **The "components not pages" rule inverts for content and marketing sites.** There, the page *is* the unit, the content is authored not computed, and a full-page diff on ten key templates is the correct and cheap check. Pa11y and reg-suit are built for exactly this shape.
- **Applitools' visual-AI approach is right and my `situational` tier is wrong if cross-machine baselines are your blocking problem.** Everything else here makes you pin the environment; Applitools is the only one that claims not to need it. If you have burned two sprints on CI rendering differences, the sales call is cheaper than the third sprint.
- **The Storybook `high` vibecode risk does not apply if your stories are state-driven.** `Button/loading`, `Table/empty`, `Card/title-overflows-at-320` are excellent tests. The risk is the generated prop-permutation set, not the tool.
- **Everything about pricing is wrong the moment a vendor changes a page.** All figures here are dated 2026-09-09 and read from public pages. Re-check before you commit a budget.

## The generated version

**What an AI agent asked to "add visual regression testing" produces:** a `playwright.config.ts` with `expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.02 } }` and a `visual.spec.ts` that loops every route and calls `toHaveScreenshot({ fullPage: true })`. Optionally a Storybook install with the default `Button` stories and Chromatic wired into CI. It looks complete, it passes on the first run, and it is the exact three-month-abandonment setup described above: page-level granularity, a ratio threshold that is simultaneously too loose for real changes and too tight for rendering noise, `fullPage: true` on pages with lazy-loaded content, and no masking of clocks, avatars or charts.

**The correction, specifically:**

1. Delete `maxDiffPixelRatio`. Keep Playwright's `threshold: 0.2` default. If a specific snapshot is genuinely noisy, set `maxDiffPixels` (a count, not a ratio) on *that assertion* with a comment explaining which element is noisy, or `mask:` the element.
2. Replace the route loop with a hand-written list of five to fifteen surfaces, each with a comment saying what regression it guards against. If you cannot write that comment, delete the snapshot.
3. Drop `fullPage: true` unless the page is short and static. Snapshot the viewport, or `clip:` to the region that matters.
4. Add `toMatchAriaSnapshot()` to the two or three most complex widgets *before* adding any pixel snapshot. It catches the failure class this corpus cares about — a `<button>` silently becoming a `<div>` — and it never flakes.
5. Turn on Storybook render tests (free) and `@storybook/addon-a11y` (near-free) before turning on visual snapshots (expensive). Value per unit of maintenance, descending.
6. If stories exist, rewrite them around states — loading, empty, error, overflowing, focused, dark — not prop permutations.

**The second generated failure, subtler:** an agent asked to "check the UI looks right" runs an automated audit, reads "No hard failures", and reports the interface is good. `audit.mjs` prints its own disclaimer for this reason. A clean scan means no *detectable* violations in the *initial render state* at the widths you passed, in one browser. It says nothing about whether the thing is well designed, and per `accessibility-tooling.md` it does not even say the thing is accessible. **Look at the screenshot.**

## Self-check

Verifiable against your own repo, in order:

- [ ] Every pixel snapshot in the suite names a specific surface, not a route loop. Count them: is the number between 5 and 20?
- [ ] `grep -r "maxDiffPixelRatio" .` returns nothing, or returns lines with a comment naming the noisy element.
- [ ] `grep -r "fullPage: true" .` returns only short, static pages.
- [ ] At least one `toMatchAriaSnapshot` exists, on your most complex interactive widget.
- [ ] Baselines were generated in the same container CI uses. If not, the suite is local-only and you have documented that.
- [ ] Every story file describes states (`loading`, `empty`, `error`, `overflow`, `dark`), not only props (`Primary`, `Large`).
- [ ] `@storybook/addon-vitest` and `@storybook/addon-a11y` are enabled before any paid visual service is.
- [ ] You can name the person who reviews the diff queue, and the last date a stale baseline was deleted.
- [ ] Your snapshot-count arithmetic (components × variants × themes × viewports × builds/month) has been done and compared against the tier you are on.
- [ ] `node tools/audit.mjs <url> --widths 1440,390,320` passes, **and** you have opened the 390px screenshot and looked at it.
- [ ] Modal, dropdown, error and empty states have been audited — not just the page's initial render.
- [ ] You have tabbed through the primary task with the keyboard. No scanner in this file does this for you.

## What surprised me

- **The screenshot mechanism is not flaky at all.** Zero differing pixels out of 1,296,000 across eight repeats, three fresh contexts and a separate browser process. The entire flakiness reputation belongs to environment drift and content volatility, neither of which is the comparator's fault — and both of which are fixable by pinning a container and masking three elements.
- **An invisible change produced a 32× larger pixel diff than a clearly visible one.** `opacity: 0.99` moved 60,810 pixels; the accent color token moved 1,903. Every threshold-tuning instinct in this category is calibrated against the wrong signal.
- **Ladle installs 407 packages; Storybook 10 with a React+Vite framework installs 169.** The lightweight alternative has 2.4× the dependency count. Storybook 10 bundled its toolchain and nobody updated the folk wisdom.
- **Lost Pixel is gone and BackstopJS has been dead for two years**, and both still appear near the top of every "best visual regression tools 2026" listicle. BackstopJS's GitHub "last push" reads September 2026 because of a README edit; its last code commit is September 2024.
- **`@storybook/addon-vitest` has 2.2× the downloads of `@storybook/test-runner`.** The Playwright-based runner that every tutorial still teaches has already lost to the Vitest browser-mode path.
- **Percy has no independent signup.** The primary CTA on percy.io is "Sign up with BrowserStack". A standalone product with 462k weekly CLI installs no longer has its own front door.
- **Playwright's docs list battery-versus-mains power as a screenshot variance factor**, in a warning callout placed second on the page. No other vendor in this category volunteers a limitation that specific about their own feature.
- **All three commercial vendors rewrote their homepage around AI-generated code within the last year**, independently, with near-identical framing. Whatever else is true, the market believes review capacity is now the bottleneck.
- **Argos's Storybook overage is $0.0015 against Chromatic's $0.008** — 5.3× — for a workflow Chromatic's own parent company invented.

## Open questions

- **Applitools' actual price and actual false-positive rate.** Both are the entire question and neither is public. Settled by a trial with a controlled corpus: run the `opacity: 0.99` and accent-token-shift cases above through Eyes and see which it flags.
- **Whether `reg-suit` 0.14.6 will ever be published.** The version commit is from March 2026; npm still serves 0.14.5 from August 2025. A maintainer statement or a publish settles it.
- **Whether Ladle has one maintainer or several active ones.** 61 contributors, but the commit history is dominated by concentrated bursts from one account. `git shortlog -sn --since=2025-01-01` on a clone would settle it; I read the GitHub API, not the log.
- **Cross-machine baseline drift, measured.** My zero-diff result is single-machine. The valuable experiment is the same page rendered on macOS/arm64 versus a `mcr.microsoft.com/playwright` Linux container at the same Chromium version, pixel-counted. I could not run it here and the answer determines how much of this document's advice about pinning is necessary versus superstitious.
- **Whether Storybook 11 changes the test story again.** `v11.0.0-alpha.0` was tagged the same day as 10.6.0. Anything written about Storybook's testing architecture has a short half-life.
- **Vercel Toolbar's Accessibility Audit Tool** — which engine, which rule set, how it compares to `@axe-core/playwright`. I saw it in the docs sidebar and did not open it.

## Sources

Everything below was fetched, screenshotted or executed on 2026-09-09/10. Screenshots at 1440px are in `.cache/shots/vqa-*.png`.

- **Measured locally:** determinism and sensitivity experiments against `examples/dispatch-console/index.html` over localhost, Chromium 148.0.7778.96 via the shared browser in `.cache/browser-ws` (scripts in the session scratchpad); `npm i` timing/size for storybook, @ladle/react, histoire, @playwright/test into empty projects; `~/Library/Caches/ms-playwright` sizes; two `tools/audit.mjs` runs diffed for output stability.
- **Looked at (screenshot + read):** storybook.js.org and its `/docs/writing-tests`; ladle.dev; histoire.dev; chromatic.com and /pricing; percy.io; applitools.com; argos-ci.com and /pricing; playwright.dev/docs/test-snapshots; trace.playwright.dev; garris.github.io/BackstopJS; reg-viz.github.io/reg-suit; lost-pixel.com; responsively.app; vercel.com/docs/workflow-collaboration/comments. Fifteen interfaces.
- **Verified by command:** `gh api repos/...` for stars, last push, licence, open issues, archived flag and commit history on storybookjs/storybook, tajo/ladle, histoire-dev/histoire, microsoft/playwright, argos-ci/argos, lost-pixel/lost-pixel, garris/BackstopJS, reg-viz/reg-suit, percy/cli, GoogleChrome/lighthouse-ci, chromaui/chromatic-cli, responsively-org/responsively-app. `curl` against `registry.npmjs.org` and `api.npmjs.org/downloads/point/last-week` for every version, publish date, licence and download figure quoted. `curl` against the Playwright docs source for `toHaveScreenshot` option defaults.
- **Cross-references within this corpus:** `libraries/_research/accessibility-tooling.md` for axe-core, jest-axe, Pa11y, Lighthouse, Storybook a11y addon, Accessibility Insights and Polypane — cited, not re-derived. `tools/audit.mjs` read in full. `system/7-critique.md` and `system/8-gates.md` for the render-and-look and ship-gate steps this file feeds.
