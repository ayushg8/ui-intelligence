# Monthly research changelog

Curated changes to the library. Each entry records what changed and why. Written by the
scheduled cloud routine (`automation/monthly-research/`), reviewed by a human when it matters.

"No changes warranted" is a legitimate entry.

---

## 2026-09 — scheduled run (2026-09-13)

First scheduled run, thirteen days after the initial build. The corpus is very fresh and had already
survived two adversarial passes, so most of this run's value is in the two places the build could not
reach: a generator it never sampled, and a question that needed a browser. **No tier changed.** Three
demotion candidates were opened and all three closed against me — see *Challenged and confirmed*.

**Tooling — the screenshot step was broken in this environment, and is now fixed.** Chromium could
not reach any host: the egress relay accepted its `CONNECT`, returned 39 bytes and closed, so every
navigation died with `ERR_CONNECTION_RESET` while `curl` and Node reached the same hosts fine.
(It also does not trust the proxy CA — `api.github.com` gives `ERR_CERT_AUTHORITY_INVALID` — which
is a second, independent browser-only fault.) This also corrects the note added to `PROMPT.md` in
`a9e3aab`: that pass found linear.app resetting while shadcn and base-ui returned 200 and concluded
the host was the variable. It is not — those 200s were curl's. Re-tested from the browser,
**Chromium resets on shadcn and base-ui too**; switching the smoke URL would not have helped.
Disabling post-quantum TLS, HTTP/2 and passing the proxy explicitly all failed. Root cause is the
relay rejecting Chromium's TLS handshake, which no browser flag fixes. `tools/shot.mjs` now re-execs
itself with `NODE_USE_ENV_PROXY=1` and, when a navigation fails with a connection-level error,
retries with every request fulfilled from Node's `fetch` via Playwright's routing layer. The smoke
test in `automation/monthly-research/PROMPT.md` passes again. **No visual judgment this month is
provisional** — everything below was rendered in a real browser and looked at.

**Added:** nothing to `libraries/`. No candidate this month was better than an incumbent at a nameable
thing, which is the bar, so nothing went in.

**Promoted / demoted:** none.

**Taxonomy** — the substantive work of this run, in `anti-patterns/vibecode-taxonomy.md`:
- **New sample set: Replit Agent (n=5).** Passes 1–2 measured v0 and Lovable only. Five
  user-published `*.replit.app` apps found via search, not vendor showcases. **Bolt is still
  unsampled and I could not fix that** — its output deploys to randomly-named `*.netlify.app` hosts
  with no discoverable index, so there is no way to find genuine user output. Recorded in the
  baseline table so nobody reads the file as covering all four builders.
- **D15 · Pill inflation — every attribute rendered as a chip.** Measured, not asserted: the ratio of
  pill-shaped elements to focusable elements is **1.59 on TimelineOS** (86 pills, 54 controls — more
  decoration than controls) against **0.15 linear.app · 0.03 vercel.com · 0.00 stripe.com · 0.00
  sentry.io**. One card carried thirteen chips including `+3 more`, the overflow indicator drawn at
  the same weight as the content. Linear's twenty are issue labels, the legitimate use, and still an
  order of magnitude below. Entry also names the related failure of stacking four quantification
  idioms (ring gauge, star rows, percentage, bare integer) on one object.
- **G12 · The generated illustration, and the generated avatar.** Image generation is now inside the
  builders, so the placeholder problem has a second form: a plausible image nobody chose. Two of five
  Replit apps. **Flagged in the entry as a first observation, not a measured baseline** — and
  explicitly *not countable*: raster-image counts run the wrong way (controls 34/27/20 against 0–1 on
  the generated pages, because real products ship screenshots), so the detection is "open it and ask
  what the picture is arguing."
- Useful negative: APE Strongman, real photography and a real brand, escapes nearly every tell in the
  file. The generator is not the determinant; the absence of content is.

**Changed — `libraries/tables-and-grids.md`:** new measured finding. `ui.shadcn.com/examples/tasks`
sets `font-variant-numeric: tabular-nums` on **0 cells**; Naive UI's Data Table sets it on **all
1,644**, at a near-identical row pitch (49px vs 53px). The corpus has recommended tabular figures
throughout and never checked who ships them. Since the shadcn `data-table` recipe is the most-copied
table markup in 2026, that one missing declaration propagates into most generated tables on the web.

**Changed — `libraries/headless-primitives.md`:** the Radix evidence is sharper than the issue tracker
showed. From the npm publish log: `1.7.0-rc` builds on **07-25, 07-27, 07-28, 07-30 and 07-31** —
five in seven days — then silence on every tag for the 44 days since, with no git tag ever cut for
any RC. A stalled backlog is ambiguous; an abandoned release train is not. Open question 4 now
carries its deadline explicitly: **the 60-day mark falls 2026-09-29** — if the next run finds no
publish, settle it in the tier rather than the prose.

**Changed — `references/editorial-luxury-and-marketing.md`:** Linear's headline quoted as "The
product development system for teams"; live it reads "…for teams and agents". The rest of the corpus
already had the current wording, so this was one stale copy, corrected against a live render.

**Challenged and confirmed** — three demotion candidates opened, all three closed against me:
- **Observable Plot** (`essential`, no npm publish in 19 months — 3× its longest prior gap, and no
  successor package or RC in flight). Looked like a clear demotion until I read the file: the
  question was already resolved in the second build pass with a *source*, Observable's own
  year-in-review, putting their charting work into Canvases with Plot as the substrate. Stable by
  design, already scored maintenance 2/5, already disclosed in the tier line. **Stands.**
- **Sonner** (README dissent: "one release in thirteen months"). Checked the full publish history
  expecting the claim to have gone stale — 2.0.8 shipped 2026-08-09. It has not: 2.0.7 was
  2025-08-02, so exactly one release in thirteen months is precisely right. **Stands, verbatim.**
- **Phosphor** (`essential`, 16 months since `@phosphor-icons/react` 2.1.10). Already caught: the
  build pass read the commit log rather than the push date, found the only 2026 commits are a README
  sync and a link addition, and dropped maintenance 3 → 2 while holding the tier on drawing quality.
  **Stands.**
- **Embla** — I flagged `latest` at 17 months old as a find; the file already documents
  `9.0.0-rc03 2026-08-21` on the `next` tag. **Stands.**
- Also re-probed and unchanged in substance: Base UI 1.8.0 (2026-09-04, 9.71M wk), Zod 4.6.4
  (published the day of this run), RHF 7.88.0, TanStack Table 9.2.4 / Virtual 3.14.12, `framer-motion`
  still out-downloading `motion` 2.23:1 (34.3M vs 15.4M — the corpus says 2.2:1).

**Looked at:** **11 interfaces screenshotted and viewed** at 1440 (TimelineOS, Vortex Payroll, My
Tryout Tracker, OpenFetch docs, APE Strongman, a dead Replit host, ui.shadcn.com, Web Awesome, Naive
UI home, Naive UI Data Table, linear.app). Four more probed for computed styles without a screenshot
(stripe.com, vercel.com, sentry.io, shadcn `/examples/tasks`). One captured and **not** viewed
(Blueprint) — its provisional score therefore stays provisional.

**Open question 10, partially settled.** Naive UI and Web Awesome moved from provisional to looked-at;
neither score moved. Running tally is now **1 of 5 blind scores materially wrong** (React Spectrum
remains the only one). Still provisional: Angular Material, Carbon, Quasar, Blueprint, Ionic, Polaris,
Reshaped, AG Charts, Carbon Charts, Charts.css, AntV X6/G6, ECharts.

**A method note worth keeping.** I misjudged Naive UI's table from the screenshot — called the rows
"~73px, far too airy" and was about to write it up. Measured: **53px**, with `tabular-nums` on every
cell, i.e. better than the corpus's own default on the numeral question. The screenshot formed a good
question and a wrong answer. Screenshot to find what to ask; probe computed styles to answer it. Both
steps, in that order.

**Not verified:**
- **`gh api` was unavailable.** GitHub API access in this session is scoped to this repository alone;
  every `repos/OWNER/REPO` call for a third-party library returns a policy error. All liveness
  evidence above therefore comes from the npm registry (`dist-tags` + publish times) and
  `git ls-remote --tags`, which is the pairing this corpus already says to trust over the Releases
  tab and `pushed_at`. **What it does not give me is star counts, contributor counts, issue
  open/close rates or commit dates** — so no claim in this run rests on those, and the Radix
  issue-tracker figures are quoted from the build pass, not re-verified. Settled by a run with
  unrestricted `gh`, or by a maintained mirror of those fields.
- **Bolt output**, as above — no discoverable index of genuine user deployments.
- **Star counts and weekly-download drift generally.** Several figures have moved since the build
  (`@dnd-kit/core` 22.4M → 18.5M, cmdk 36M → 30.2M, TanStack Virtual 20.9M → 17.3M, Embla 29M →
  24.2M). The declines on the two dead-but-installed packages are directionally interesting — people
  are leaving — but the corpus already warns these counts move ±20% between reads, so I did not
  rewrite them and manufacture a diff. Worth a deliberate sweep when a run has time to do all of them
  at once.

**Constraint violation carried forward, for a human.** `libraries/design-tokens-and-handoff.md` is
**1,972 lines** against the ~800-line ceiling in `PROMPT.md` — 2.5× over, and by far the largest file
in the corpus. I did not cut it. Its length is *structural*, not appended bloat: seven decision
frameworks, eighteen scorecards, a measured reference section and a review pass, all written and
adversarially checked thirteen days ago. The rule exists to stop unbounded growth by appending, and
this file did not grow that way; cutting 1,100 lines of freshly-verified content unsupervised would
destroy more value than the rule protects. The weakest material I could find — the Locofy and Anima
`reference-only` scorecards — is ~44 lines and genuinely informative, so cutting it would not
meaningfully move the number either. **Recommendation: split it.** The seven Decisions are a
`system/` concern and the scorecards are a `libraries/` concern; that is a restructure, and
`PROMPT.md` tells this routine not to restructure the library unilaterally. Flagging for a decision
rather than acting on it.

---

## 2026-09 — initial build

Library created. Every entry evaluated fresh: evidence verified with `gh`/npm, interfaces
screenshotted and viewed, verdicts written with stated design judgment. See git history.
