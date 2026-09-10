# Design tokens, Figma-to-code and the design/engineering seam

**Evaluated:** 2026-09 · **Researcher note:** Three things changed since the last time anyone wrote
a sane summary of this category. (1) **The DTCG spec finally shipped something implementable** —
Format Module *2025.10* is a Final Community Group Report dated 28 October 2025, and the Resolver
Module (modes, themes, density) is a Candidate Recommendation marked "considered stable". The draft
at `tr.designtokens.org` is *not* that; it says in its own Status section "Do not attempt to
implement this version." Half the tooling in this category cites the wrong document. (2) **Every
commercial vendor in the category repositioned to "context for AI agents" inside about twelve
months.** Supernova's homepage headline is now "Design & engineering knowledge, ready for AI
agents"; zeroheight's is "Get teams and agents building from your design system — not around it";
Knapsack's entire homepage is now a *waitlist* reading "Your AI has no idea what good looks like."
Specify is simply dead. Nobody sells "design token management" any more; they sell MCP endpoints.
(3) **The Figma MCP server has hard rate limits that make it unusable as a build pipeline** — 600
tool calls per day on Enterprise, 200/day on Professional and Organization, and **6 per month** on a
View or Collab seat. That number is the most important fact in this file and almost nobody states
it.

The honest structural finding: the seam between design and code is a *social* problem that this
industry keeps selling *pipeline* solutions for. The pipelines work — Style Dictionary genuinely
works — but they only pay for themselves at a headcount most teams never reach, and below that line
they install a second source of truth and call it synchronization.

---

## If you only apply five things

1. **Write the tokens as CSS custom properties, by hand, in one file in the app repo, and make
   Figma mirror them.** Not "export from Figma." The repo is the source of truth because the repo
   is where the values are *enforced* by a compiler and a code review; a Figma variable is enforced
   by nobody. Mirroring costs a designer twenty minutes a quarter. Generating costs an engineer a
   build step forever.
2. **Do not install a token pipeline until you ship to a second platform or a second brand.** The
   line is concrete: Style Dictionary earns its build step when you need the *same* value in CSS
   *and* in Swift/Kotlin/XAML, or when one codebase serves ≥2 visually distinct brands. One web app
   with a dark mode is not that. Dark mode is a `@media` block, not a pipeline.
3. **Cap the token count and check it.** Production reference points measured for this file:
   Linear ships **419** custom properties on `:root` (138 of them machine-hashed, so ~281 real),
   Vercel **576**, Atlassian **619**, GitHub Primer **1,998**, Shopify Polaris **2,041**. Your
   product-UI token file should be 60–120 declarations. If you are over 300 and you are not
   Atlassian, you are generating tokens, not designing them.
4. **Two layers, never three.** A primitive ramp (`--n-600`, `--accent`) and a semantic layer
   (`--text-muted`, `--bg-surface`). Components reference *only* the semantic layer. Carbon's
   shipped CSS has **668 `--cds-*` properties with only 27 alias declarations between them** —
   almost every token is a literal, which means changing a theme means regenerating all 668 instead
   of remapping twenty. That is what a missing semantic layer costs.
5. **Before writing any Figma-MCP-driven workflow, run `whoami` and check the seat.** Code Connect
   requires a Dev or Full seat on **Organization or Enterprise**. The Variables REST API requires a
   Full seat on **Enterprise** for both GET and POST. Most teams asking an agent to "sync our Figma
   tokens" are on Professional and the endpoint will 403. Verified live: this machine's Figma
   account returns `tier: starter, seat: View` → 20 MCP tool calls *per month*, no Code Connect, no
   Variables API.

---

## Verdict at a glance

| Tool | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Hand-authored CSS custom properties | `essential` | The correct default for ~95% of teams, and the only option where the source of truth is enforced by a compiler. | low |
| Figma Variables (in-file, with `codeSyntax`) | `essential` | Use it as the *mirror*, not the source. Four value types and no unit awareness make it unfit to be the origin of a token system. | low |
| Style Dictionary v5 | `strong` | The pipeline layer, unrivalled and boring. 1.68M weekly installs. Only install it when you have a second platform. | low |
| Terrazzo | `strong` | DTCG-native, actually implements the Resolver module, MIT, 456 stars. The modern answer if you're starting a pipeline in 2026. | low |
| DTCG Format + Resolver Module 2025.10 | `strong` | First implementable version of the spec, and the Resolver is the theming answer the format lacked for six years. Target it; don't hand-author it. | low |
| Storybook (as a token surface) | `strong` | Not a token store and shouldn't be. `withThemeByDataAttribute` is the right integration and it's three lines. | medium |
| Figma Code Connect | `situational` | The one Figma feature that measurably reduces drift — and it's gated to Org/Enterprise and just broke every v1 integration. | low |
| Figma Dev Mode MCP server | `situational` | Real and useful for *reading* a frame. The 200–600 calls/day ceiling disqualifies it as a pipeline. | **high** |
| Tokens Studio | `situational` | The most capable Figma-side token editor by a distance. Also a €169–499/mo platform whose own SD bridge hasn't shipped in nine months. | low |
| Supernova | `situational` | Genuinely good docs platform that has repositioned as an AI-context broker. Free tier is real (5 seats, MCP included). | low |
| zeroheight | `situational` | The docs-site answer for orgs that need designers to author. $49/editor/mo. MCP capped at 500 calls/month. | low |
| Builder.io | `situational` | Best-engineered of the visual-to-code vendors, MIT SDKs, 8.8k stars — but it's a CMS/agent platform now, not a Figma converter. | **high** |
| Knapsack | `experimental` | Pivoted to an AI-conformance eval product. Homepage is a waitlist. Do not plan around it. | — |
| Locofy | `reference-only` | Read the positioning, don't ship the output. | **high** |
| Anima | `reference-only` | Now an AI app builder with a Figma import button. The handoff product is gone. | **high** |
| Style Dictionary v3 / v4 (staying on) | `avoid` | v5 aligned reference syntax to DTCG and dropped Node <22. Migrating later costs more than migrating now. | low |
| `token-transformer` | `avoid` | Last published 2023-05-25. Still pulling 45,193 installs/week. Nothing about it is current. | low |
| Specify | `avoid` | Sunset 2024-11-15. The marketing site is still up, still has a "Pricing" nav, and still ranks. | — |
| Theo (Salesforce) | `avoid` | Archived 2025-06-09. The original design-token tool; 11,565 installs/week are inertia. | low |
| Diez | `avoid` | Last push 2022-12-10. | low |

---

## Recommendations by need

- **Default choice, any team under ~15 engineers:** one hand-authored `tokens.css`, versioned in
  the app repo, plus a Figma variable collection a designer keeps in sync by hand. No build step, no
  second format, no vendor. This is the recommendation this corpus defends below at length.
- **You ship web + iOS + Android from one design language:** Style Dictionary v5. It is the only
  thing in the category with a real multi-platform transform ecosystem and 1.68M weekly installs of
  battle-testing. Budget a week.
- **You're starting a pipeline today and have no legacy config:** Terrazzo. It's DTCG-native rather
  than DTCG-compatible, it implements the Resolver module (SD does not), and its plugin set covers
  CSS, Sass, Tailwind, vanilla-extract and Swift. The cost is a 456-star project with six
  subscribers.
- **Designers must edit tokens and they will not open a PR:** Tokens Studio. Nothing else lets a
  designer author aliases, math and multi-dimensional themes inside Figma. Price it honestly:
  €17/editor/mo for the Variables plan, €499/mo for Organization.
- **You need a browsable design-system site that non-engineers maintain:** zeroheight (Free tier is
  usable; $49/editor/mo after) or Supernova (Free up to 5 seats, $35/seat/mo Pro). Both now ship an
  MCP server; both are docs products wearing an AI hat.
- **You need a component-level bridge that actually reduces drift:** Figma Code Connect — *if* you
  are already on Organization or Enterprise with Dev/Full seats. It is the only tool here that makes
  Figma emit *your* component's real API instead of generated markup.
- **Non-React / non-JS:** Style Dictionary and Terrazzo are both plain Node CLIs producing plain
  text; neither cares what your app is written in. Everything else in the top half of this table
  assumes a web front end.
- **Premium/paid worth it:** Tokens Studio, if and only if a designer is the one who changes token
  values week to week. Figma Organization ($55/mo Full seat) purely to unlock Code Connect, if you
  have >30 components and >5 engineers implementing them. Nothing else here.

---

## The measured/verified reference section

Everything below was measured or fetched on **2026-09-09** unless noted. Cite these rather than
deriving new ones.

### Token surfaces of production sites

Method: Playwright at 1440×900, `getComputedStyle(document.documentElement)` enumerated after
`networkidle`. This counts what is actually *inherited by the page*, which is the number that
matters — not what's in a repo.

| Site | Props on `:root` | Color-valued | Avg name length | Modal name depth | Longest name |
|---|---|---|---|---|---|
| m3.material.io | 158 | 7 | 36 ch | **7 segments** (107 of 158) | `--mio-theme-v2-display-xl-font-variation-GRAD` |
| ui.shadcn.com | 365 | 240 | 17 ch | 3 (217) | `--default-transition-timing-function` |
| linear.app | 419 | 182 | 16 ch | **2 (229)** | `--editor-last-invisible-paragraph-spacing` |
| vercel.com | 576 | 199 | 18 ch | 3 (262) | `--geist-violet-background-secondary` |
| atlassian.design | 619 | 467 | 28 ch | 4 (222) | `--ds-background-accent-magenta-subtlest-hovered` |
| primer.style | **1,998** | 1,428 | 30 ch | 4 (1,027) | `--brand-RiverBreakout-variant-gridline-spacing-outerBlockEnd` (59 ch) |
| polaris.shopify.com | **2,041** | 1,823 | 26 ch | 3 (860) | `--Component-Form-DevDash-Background-Surface-Borderless-Default` (62 ch) |
| spectrum.adobe.com | 0 | — | — | — | scoped to a `.spectrum` class, nothing on `:root` |

What to read out of that table:

- **Linear and Primer are both excellent products and differ by 4.7×.** Linear's names are two
  segments deep and 16 characters on average; Primer's are four deep and 30. Token count is not a
  quality signal in either direction — it's a signal of how many *surfaces* the system has to
  govern. Primer covers github.com, a marketing site and a docs site; Linear covers one app.
- **194 of shadcn's 365 are `--color-*`,** i.e. Tailwind v4's stock 22-hue × 11-step palette that
  ships whether you use it or not. The actual shadcn theme is ~30 semantic names on top of it. If an
  agent "reads the tokens" from a shadcn app it will find 365 and think it found a design system.
- **Polaris ships `--Light-*` (400 props) and `--Dark-*` (400 props) simultaneously.** Theming by
  namespace duplication rather than by remapping a semantic layer. Both sets are always in the
  cascade; the theme picks which prefix to read. This is the failure mode `system/3-tokens.md`
  warns about, shipping in production at a company with a famous design system.
- **Vercel has three token namespaces live on one page:** `--ds-*` (223), `--geist-*` (103) and
  `--tw-*` (57). Two of those are Vercel's own, from different eras. This is what "we'll migrate the
  design system incrementally" looks like eighteen months in.
- **Atlassian's 619 are the best-designed large set here.** Every name follows
  `ds-<property>-<role>-<prominence>-<state>`: `--ds-background-accent-magenta-subtlest-hovered`,
  `--ds-border-danger-subtle`, `--ds-space-negative-150`. You can predict a name you've never seen.
  That grammar is the reason 619 is navigable and Polaris's 2,041 is not.
- **Stripe is the outlier and it's instructive.** A separate pass over the 303 KB of CSS
  stripe.com actually loads found **115 declared custom properties, exactly 4 of them colour
  literals, zero `prefers-color-scheme` blocks and zero `[data-theme]` selectors.** Stripe's
  marketing site has no CSS-variable colour token layer at all — its custom properties are
  per-section layout plumbing (`--hero-logo-wall-rows-reduced-height`,
  `--time-of-day-select-icon-transition-timing-function`). One of the best-looking sites on the web
  does not have the thing this category sells.
- **Carbon's semantic layer is missing.** A stylesheet-text pass found 668 declared properties, 659
  prefixed `--cds-`, and **only 27 declarations whose value is a `var()` reference.** Longest name:
  `--cds-notification-action-tertiary-inverse-text-on-color-disabled` (65 characters). Themes are
  produced by regenerating every literal, not by remapping aliases.

### Figma: the access matrix that decides whether any of this is possible

Retrieved live from the Figma MCP server's own `rate-limits-access.md` resource and from
`developers.figma.com`, 2026-09-09.

**MCP tool-call limits (reads; writes like `create_new_file` and `whoami` are exempt):**

| Seat | Starter | Professional | Organization | Enterprise |
|---|---|---|---|---|
| View, Collab | **20 / month** | 6 / month | 6 / month | 6 / month |
| Dev, Full | — | 200/day, 10/min | 200/day, 15/min | **600/day, 20/min** |

Education plans get Professional Dev/Full limits. Only MCP clients listed in Figma's MCP Catalog
can connect at all. Enterprise-managed auth exists only for Claude, via Okta Cross App Access.

**Feature gates:**

| Capability | Requirement |
|---|---|
| Variables in the Figma UI | all plans |
| Variables **Plugin** API | all plans |
| Variables **REST** API (GET *and* POST) | **Enterprise**, Full seat, org member (not guest); scopes `file_variables:read` / `file_variables:write` |
| Code Connect (CLI or UI) | **Organization or Enterprise**, Dev or Full seat |
| Dev Mode advanced inspection + MCP | Professional and up |

**Figma list prices, annual, 2026-09-09:** Professional Full $16/mo · Dev $12/mo · Collab $3/mo.
Organization Full $55 · Dev $25 · Collab $5. Enterprise Full $90 · Dev $35 · Collab $5.

So: the minimum spend to make the Variables REST API legal is an Enterprise Full seat at
**$90/user/month**. The minimum to make Code Connect legal is an Organization Dev seat at $25/mo.
Any plan that says "we'll sync tokens from Figma via the API" is quoting $1,080/user/year before it
writes a line of code.

**Figma's variable type system — the reason it can't be the source of truth:**

`resolvedType` is exactly `'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR'`. That is the whole list. There
is no dimension type (a `FLOAT` of `16` carries no unit — px? rem? Figma does not know and neither
will your exporter), no duration, no cubic-bézier, no typography composite, no shadow, no gradient.
And: *"A variable's type is fixed at creation and cannot be changed: `resolvedType` is ignored in
UPDATE actions… To change a variable's type, create a new variable with the desired `resolvedType`
and repoint any aliases and bindings to it."* Renaming a token is cheap in Figma; retyping one is a
migration.

The one genuinely good part of Figma's model is `codeSyntax` — per-variable WEB/ANDROID/iOS code
names — and `VariableScope`, which limits where a variable appears in pickers. Both are *mirroring*
affordances: they let a Figma variable point at a name you already own in code. Use them.

### Spec status

| Document | Status | Date |
|---|---|---|
| Design Tokens **Format Module 2025.10** | **Final Community Group Report** | 28 Oct 2025 |
| Design Tokens **Resolver Module 2025.10** | **Candidate Recommendation**, "considered stable… intended for implementation" | 28 Oct 2025 |
| Design Tokens **Color Module 2025.10** | published in the 2025.10 set | 28 Oct 2025 |
| `tr.designtokens.org/format/` (the URL everyone links) | Draft, banner reads **"Do not attempt to implement this version"** | 08 Sep 2026 |

Repo health: `design-tokens/community-group` ★2,115, 67 contributors, **87 open non-PR issues**,
zero releases/tags (they publish to `designtokens.org/TR/` instead). A conformance **test-suite
package** was merged on **2026-09-08** — one day before this evaluation — and its PR body is the
most honest line in the category: *"At the moment, every design token tool developer has to write
their own fixtures to test things like token parsers."* Seven years in.

The open-issue archaeology is the real adoption signal:

| Issue | Opened | Comments | Still open? |
|---|---|---|---|
| #2 `[RFC] Theming` | **2019-06-26** | 35 | **yes** |
| #53 `Type: font family` | 2021-09-07 | 7 | yes |
| #88 `composite type for color modifications (e.g. rgba)` | 2021-12-17 | 18 | yes |
| #91 `High contrast colors` | 2022-01-05 | 12 | yes |
| #102 `Typography type feedback` | 2022-01-13 | **45** | yes |

Theming — the single thing a token format exists to enable — was filed as an RFC seven years and
two months ago and is still open. The Resolver Module is the answer, and it arrived in October
2025. Judge the spec's maturity on that timeline, not on the star count.

### Package health

| Package | Latest | Published | Weekly npm | License | Notes |
|---|---|---|---|---|---|
| `style-dictionary` | 5.5.3 | 2026-09-06 | **1,682,990** | Apache-2.0 | ★4,802, 631 forks, 242 open issues, 69 published versions since 2017-03-07 |
| `@figma/code-connect` | **2.0.0** | 2026-08-18 | 1,058,160 | MIT | ★1,571; v2 removed framework parsers |
| `storybook` | 10.6.0 | 2026-09-02 | 19,523,428 | MIT | ★91,026; 10.0.0 landed 2025-10-28 |
| `@storybook/addon-docs` | — | — | 15,571,865 | MIT | the actual docs surface |
| `@storybook/addon-themes` | — | — | 3,409,150 | MIT | the theming integration |
| `@tokens-studio/sd-transforms` | 2.0.3 | **2025-12-10** | 163,156 | MIT | nine months without a release |
| `@tokens-studio/types` | — | — | 171,219 | MIT | — |
| `@terrazzo/plugin-css` | 2.5.0 | 2026-07-26 | 66,216 | MIT | outpaces the CLI |
| `@terrazzo/cli` | 2.7.1 | 2026-08-11 | 55,239 | MIT | ★456, 6 subscribers, created 2021-11-17 |
| `token-transformer` | 0.0.33 | **2023-05-25** | 45,193 | MIT | three years stale, still 45k/wk |
| `open-props` | 1.7.23 | 2026-01-31 | 23,452 | MIT | ★5,512 — see `css-and-styling-infra.md` |
| `theo` | — | archived **2025-06-09** | 11,565 | BSD-3 | ★1,988 |
| `diez` | — | last push **2022-12-10** | 1,318 | — | ★1,236 |

Version history that matters: Style Dictionary **v3.0.0 2021-05-25 → v4.0.0 2024-06-28 → v5.0.0
2025-05-16 → v5.5.3 2026-09-06.** v5's breaking changes, verbatim from the release: references to
non-token leaf nodes no longer resolve and non-token nodes are dropped during flattening; the
`.value` reference suffix is gone; **you can no longer configure the reference syntax — `{a.b}` is
now fixed to match DTCG**; minimum Node is **22.0.0**. That last one has stranded more upgrades than
the other three combined.

### Vendor pricing, verified on the pricing pages

| Vendor | Free | Paid |
|---|---|---|
| Tokens Studio | plugin trial | **Variables €17**/editor/mo · **Essential €169**/mo · **Organization €499**/mo, all billed annually; extra editors €17/€39/€49 |
| Supernova | ≤5 seats, MCP enabled, 2 contexts, 1 design system, 1,000 credits/mo | **Pro $35**/seat/mo (yearly −22%), ≤15 seats, 25 MCP consumers, 3,000 credits/seat · Enterprise custom |
| zeroheight | $0 plan, MCP with 500 calls/month | **Starter $49**/editor/mo annual ($59 monthly, $588/yr, min 1 editor) · Enterprise custom |
| Knapsack | — | no published pricing; homepage is a waitlist, "Trusted by over 4k+ companies" |
| Specify | — | **dead** — sunset 2024-11-15 |

---

## The decisions

### Decision 1 — do you need a token pipeline at all?

Almost certainly not, and here is the line.

**A token pipeline (Style Dictionary, Terrazzo, a Figma sync job) earns its keep when *one value
must appear in two artefacts a compiler cannot both read*.** That's it. Concretely:

| Situation | Pipeline? | Why |
|---|---|---|
| One web app, light + dark | **No** | `@media (prefers-color-scheme: dark)` re-maps twelve semantic properties. A build step to produce a `@media` block is theatre. |
| One web app, 2–3 brand skins | **No** | `[data-brand="acme"]` re-maps the same twelve. Still one file. |
| Web + React Native | **Borderline** | RN can consume a JS object; the web can consume CSS. One small hand-written `tokens.ts` that the CSS file mirrors beats a pipeline until the count passes ~80. |
| Web + native iOS + native Android | **Yes** | Swift and Kotlin cannot read your CSS. This is the original problem Style Dictionary was built for and it still solves it better than anything. |
| ≥4 brands with genuinely different ramps, maintained by different teams | **Yes** | The cross-product of brand × mode × density is where hand-maintenance actually breaks. |
| Design system published as a package to ≥5 consuming apps | **Yes** | You need versioned artefacts with a changelog, which means a build. |
| "Our designers keep using off-system colours" | **No** | That is a review problem. A pipeline will faithfully export the off-system colours. |

The team-size heuristic people ask for: **below roughly 10 front-end engineers and one design
system, a pipeline is net negative.** Not because it doesn't work — because its failure mode is
that generated files drift from hand-edits, someone edits the generated file, and now the repo has
two sources of truth *and* a build step. I have never seen a small team install Style Dictionary
and still be running the sync a year later; I have seen several with a `tokens.generated.css`
committed and manually patched.

**The specific cost of being wrong in the other direction** is smaller than people fear. Adding
Style Dictionary later to a hand-authored `tokens.css` is a mechanical afternoon: your CSS custom
properties are already a flat key→value map with aliases, which is isomorphic to a DTCG file. The
migration is a script. Migrating *off* a pipeline, after two years of exporter plugins and CI, is
not.

### Decision 2 — CSS custom properties or a JS object?

This is asked as a style question and it is actually a question about **when the value is
resolved**, which determines what you can do with it.

| | CSS custom properties | JS/TS object |
|---|---|---|
| Resolution | at paint, per element, live | at build or at render |
| Theme switch | change one attribute on `<html>`; zero re-render | re-render every consumer, or ship both themes and branch |
| Cascade / scoping | free — redefine on any subtree | manual, via context |
| Server Components | works, it's just CSS | a JS object crossing the RSC boundary is a serialization problem |
| Typos | silent — `var(--colr-text)` renders nothing | caught by the compiler |
| Autocomplete | via editor plugin, mediocre | excellent |
| Arithmetic | `calc()` only | anything |
| Readable by a canvas / chart lib / RN | no — must be read out with `getComputedStyle` | yes |
| Payload | in the stylesheet you already ship | extra JS |

**The rule: CSS custom properties are the source of truth; a JS object is a derived read-model,
generated, never hand-edited.**

The decisive argument is theming. A theme switch implemented in CSS custom properties is one
attribute mutation and the browser repaints. A theme switch implemented through a JS token object
is a context update that re-renders your entire tree — and in an RSC app it can't cross the server
boundary at all, so you end up shipping both themes' values to the client and branching, which is
Polaris's 400+400 problem reimplemented in JavaScript.

The counter-cases where you genuinely need the JS object, and they are real:

- **Canvas, WebGL and chart libraries** take colours as strings, not as `var()`. You must read them
  out: `getComputedStyle(document.documentElement).getPropertyValue('--color-accent')`. Do this once
  at mount and on theme change, not per frame.
- **React Native** has no CSS. If you ship both, hand-write the RN object and mirror it, or generate
  both from one DTCG file — this is a legitimate pipeline trigger (see Decision 1).
- **Design-time arithmetic** — generating a 12-step ramp from one hue, computing contrast-safe
  pairs. Do that in a script that *emits* the CSS file, and commit the output. The generator is a
  tool; the CSS is the artefact.
- **Type safety on token names**, which custom properties genuinely lack. The cheap fix is a
  generated `.d.ts` of literal string unions plus a stylelint rule
  (`declaration-property-value-no-unknown`, or a custom rule allowlisting `--*` names). The
  expensive fix is vanilla-extract or Panda; see `css-and-styling-infra.md`.

What *not* to do: a `tokens.ts` that is the source of truth and gets injected into a `<style>` tag
at runtime. You have then paid the JS cost, lost the compile-time enforcement, and made the values
invisible to any CSS tooling. This is what most "design token" npm packages published by companies
actually are.

### Decision 3 — which direction does the sync run?

Three postures, and only two of them work.

**A. Figma generates code (Figma → repo).** Designer edits a variable; a CI job pulls the Variables
REST API and writes `tokens.css`. This is what every vendor sells and it is wrong for most teams,
for four reasons that compound: it needs Enterprise ($90/Full seat/mo); Figma's four value types
can't express half your tokens (Decision above); the generated file is now the thing engineers must
not edit, so every value change needs a designer *and* a CI run; and Figma has no review gate, so a
mis-click in a variable panel becomes a production colour change with no diff anyone read.

**B. Code generates Figma (repo → Figma).** A script reads `tokens.css` and writes variables via
the Plugin API (all plans) or the REST API (Enterprise). Correct in principle, and worth doing at
scale. In practice the Plugin API path needs someone to open Figma and run the plugin, which is
manual anyway, which collapses into C.

**C. Figma mirrors, by hand, on a cadence.** The repo is the source of truth. A designer keeps a
Figma variable collection whose names and values match, updates it when the CSS file changes, and
uses `codeSyntax` to record the CSS custom-property name on each variable so Dev Mode shows
`var(--bg-surface)` instead of `#FBFBFA`. **This is what this corpus recommends and it is not a
compromise position.**

The reason C wins is that it puts the source of truth where the *enforcement* is. In the repo, an
off-system value fails a stylelint rule, shows in a diff, and requires an approving review. In
Figma, an off-system value is a designer picking a colour from the eyedropper and nobody ever
knowing. Direction A makes the unenforced artefact authoritative over the enforced one. Once you
see it that way the argument is over.

The mirroring cost is small and bounded: a 90-token system changes maybe six values a quarter after
the first month. That is a twenty-minute task. Compare with the pipeline's cost, which is a CI job,
a token-format decision, an exporter plugin, and a permanent class of "the tokens are out of sync"
bug reports.

**When C stops being enough:** when the number of people who can change a token value exceeds the
number of people who talk to each other daily, or when a token change must land in three artefacts
at once. Then go to B — code generates Figma — because it preserves the enforcement direction. Go
to A essentially never; the only honest case is an organisation where design owns the visual
language contractually and engineering implements it, which is a real structure in enterprises and
government and almost nowhere else.

### Decision 4 — how do you do modes: theme × dark × density?

This is where every token system breaks, and the breakage is combinatorial rather than technical.

The naive model treats each combination as a set: `light`, `dark`, `light-compact`,
`dark-compact`, `acme-light`, `acme-dark`, `acme-light-compact`… 2 brands × 2 schemes × 2 densities
= 8 full token sets. Polaris's `--Light-*`/`--Dark-*` split is this pattern with n=2, and it already
costs 800 properties.

The correct model is **orthogonal axes composed at read time** — exactly what the DTCG Resolver
Module formalises with the terms *orthogonality* and *permutation*. In plain CSS:

```css
:root {                      /* axis 0: the primitive ramp — never varies */
  --n-0: oklch(1 0 0); --n-100: oklch(0.962 0.004 90); /* … */
  --accent: oklch(0.52 0.185 258);
}
:root {                      /* axis 1: colour scheme — semantic remap only */
  --bg-surface: var(--n-0);
  --text: var(--n-900);
  --border: var(--n-300);
}
:root[data-theme="dark"] {
  --bg-surface: oklch(0.195 0.005 90);
  --text: oklch(0.965 0.002 90);
  --border: oklch(1 0 0 / 0.11);
}
:root {                      /* axis 2: density — spacing and type only */
  --row-h: 36px; --pad-x: 12px; --text-base: 0.875rem;
}
:root[data-density="compact"] {
  --row-h: 28px; --pad-x: 8px;  --text-base: 0.8125rem;
}
:root[data-brand="acme"] {   /* axis 3: brand — accent + font, nothing else */
  --accent: oklch(0.58 0.16 24);
  --font-sans: "Acme Grotesk", system-ui, sans-serif;
}
```

Four axes, one file, ~90 declarations, and the cross-product is free because the browser composes
it. 2×2×2 = 8 "themes" exist without eight token sets existing.

Three rules that make this hold:

1. **Each axis owns disjoint properties.** Scheme owns colour semantics. Density owns space and
   type size. Brand owns accent and font. The moment density starts changing colours, or the dark
   theme starts changing spacing, the axes are entangled and you're back to the cross-product.
2. **Only the semantic layer varies.** The primitive ramp is constant across every axis. If dark
   mode redefines `--n-600`, every component that referenced the ramp directly breaks in one theme
   and not the other — and you will only find out by looking.
3. **Density must move type size, not just padding.** The most common half-done density mode
   shrinks row height and leaves 14px text, which produces a cramped row rather than a dense one.
   See `craft/density-and-hierarchy.md`.

**What the tools do with this:** Style Dictionary handles multi-mode by running the build once per
permutation and emitting one file per combination — the cross-product, materialised. That's correct
for iOS and Android, where there is no cascade, and wasteful for the web, where there is. Terrazzo
implements the Resolver module directly and shipped "partial CSS output for resolvers" on
2026-08-11, which emits only the varying properties per mode — the right shape. Figma's own model
(collections with modes, plus the new *extended collections* for brand variants) is orthogonal-ish
but caps at one mode axis per collection, so multi-axis theming in Figma means multiple collections
and manual discipline about which axis lives where.

### Decision 5 — which format, if you need one?

**Target DTCG Format Module 2025.10.** Not the draft. The practical differences you'll hit:

- References are `{group.token}` — and as of Style Dictionary v5 you can no longer change that
  syntax, which is a *good* breaking change: the reference syntax is now the same everywhere.
- `$value`, `$type`, `$description`, `$extensions` — the `$` prefix distinguishes spec properties
  from group names.
- Composite types (typography, shadow, border, gradient, transition) exist in the format and are
  the main thing Figma variables cannot express.
- Vendor extensions go under `$extensions` with a reverse-DNS key. Tokens Studio's extras live at
  `$extensions["studio.tokens"]`. If you see them in a file, you are looking at a Tokens Studio
  export, not a portable one.

**Do not hand-author DTCG JSON as your source of truth.** It is a machine interchange format. It has
no comments, no arithmetic, no cascade, and reading it tells you nothing about what a token is for.
`--text-disabled` with a comment saying *"does not pass AA, therefore nothing meaningful may use
it"* is worth more than a hundred lines of correctly-typed JSON. Author CSS; emit DTCG if a second
platform needs it.

### Decision 6 — the design-to-code generators (Locofy, Anima, Builder.io)

Judge these on one question: **does the output reference your components, or does it produce new
markup that looks like your components?**

Locofy, Anima and Builder.io's Visual Copilot all do the second thing by default. They emit a fresh
tree of divs with values baked in — even in "design system" mode, where the mapping is a best-effort
match rather than a contract. The result compiles, renders correctly at the captured breakpoint, and
is unmaintainable: it has no relationship to the component that renders the same thing everywhere
else in your app, so the next design change forks.

Figma **Code Connect** is the only tool in this whole file that does the first thing. You author a
small file per component that declares *how a Figma component maps to your real code*:

```ts
// Button.figma.ts
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<Button
    size={${instance.getEnum('Size', { Large: 'large', Medium: 'medium', Small: 'small' })}}
    disabled={${instance.getBoolean('Disabled')}}
  >${instance.getString('Label')}</Button>`,
}
```

Now Dev Mode — and, more importantly, the MCP server feeding an agent — returns *your* `<Button>`
with *your* prop names, rather than a `<div>` with a hex colour. That is a real reduction in drift,
and it is the single highest-leverage thing an Org/Enterprise team can do at this seam.

Two costs, both real. It's gated to Organization/Enterprise with a Dev or Full seat. And **v2.0.0
(2026-08-18) deleted the framework-specific parsers** that everyone who adopted Code Connect in
2024–25 is using; the parsers stopped being maintained on 2026-08-17, `figma connect publish` now
exits with a migration message, and the escape hatch is pinning `@figma/code-connect@1`. If you
adopted the React parser two years ago, you have a migration.

### Decision 7 — the documentation surface

Storybook, zeroheight, Supernova and Knapsack all claim this lane; they are not the same product.

**Storybook is a component workshop that happens to render docs**, and it is the only one that runs
your actual code. Its token story is deliberately thin and that is correct: `@storybook/addon-themes`
gives you three decorators — JSX providers, **CSS classes** and **data attributes** — and the last
one, `withThemeByDataAttribute`, is three lines that flip `data-theme` on the preview root. That's
the entire correct integration for a custom-property token system. Storybook has no token store,
should not have one, and any addon that adds one is adding a third source of truth.

**zeroheight and Supernova are for designers and PMs who will not open a repo.** Both pull from
Figma and from a code source, both render a browsable site, both now expose an MCP server (zeroheight
at 500 calls/month; Supernova gates "MCP consumers" by tier). Choose them when the constraint is
"non-engineers must author documentation", never when it is "we need a token pipeline."

**Knapsack** has left the category. Its homepage is a waitlist for an AI-conformance product whose
own copy names Supernova and Storybook as *inputs* it aggregates. Interesting thesis, unusable
today.

---

## Scorecards

### Hand-authored CSS custom properties — `essential`
- **What:** One `tokens.css` in the app repo. Primitive ramp + semantic layer + mode blocks. No
  tool, no build step, no export.
- **Verdict:** The correct default, and the reason is not simplicity — it's that the repo is the
  only artefact in this whole seam where a wrong value gets stopped by something other than a human
  noticing. A stylelint rule, a failing build and a PR review are three enforcement mechanisms
  Figma structurally cannot have. Everything else in this file is a way of moving values *out* of
  that enforcement and then trying to move them back. The measured evidence backs the scale, too:
  Linear runs a product with real theming on ~281 authored custom properties averaging 16
  characters and two segments deep. That is a hand-authorable number. Nothing about 90 tokens
  requires a pipeline, and 90 tokens is enough for most products.
- **Use when:** one design language, one to three brands, any number of modes, web-first. ·
  **Don't use when:** the same value must land in Swift and Kotlin, or ≥4 independently-maintained
  brands exist.
- **Scores /5:** visual 5 · interaction 5 · a11y 5 · engineering 4 · maintenance 5 · docs 3 ·
  customization 5 · perf 5 · stability 5 · originality 2
- **Evidence:** custom properties are Baseline widely available; cascade-composed modes cost zero
  JS and zero re-renders. Measured comparison set in the reference section above (Linear 419,
  shadcn 365, Vercel 576, Atlassian 619, Primer 1,998, Polaris 2,041 — all 2026-09-09). The one
  genuine weakness is silent failure on typos, mitigable with a stylelint allowlist and a generated
  `.d.ts`.
- **Looked at:** the shipped `:root` of eight production design systems, enumerated via
  `getComputedStyle` at 1440×900. The finding that changed my mind: Stripe ships 115 custom
  properties, 4 of them colours, and no theme selectors at all — a top-tier interface with
  essentially no token layer in CSS. Token infrastructure is not what makes an interface look
  designed.
- **Vibecode risk:** low — but only if you replace the default ramp. See "The generated version".
- **Link:** `/Users/ayushgarg/Ayush/UI_Library/system/3-tokens.md`

### Figma Variables — `essential` (as the mirror, not the source)
- **What:** Typed, mode-aware values bound to design properties, organised into collections. Plugin
  API on every plan; REST API on Enterprise only.
- **Verdict:** As a design-side feature it is very good — modes are a real primitive, aliasing
  works, `VariableScope` stops people binding a spacing token to a colour field, and *extended
  collections* (new) give brand variants a genuine inheritance model instead of duplication. As the
  origin of a token system it is disqualified by its type system: `BOOLEAN | FLOAT | STRING | COLOR`
  and nothing else. A `FLOAT` of `16` has no unit. There is no shadow, no easing, no duration, no
  typography composite, no gradient. Roughly a third of a real token file cannot be represented, so
  a Figma-origin pipeline always ships a second, hand-maintained file for the rest — which is the
  two-sources-of-truth failure, arrived at by a different road. Use `codeSyntax` to stamp the CSS
  custom-property name onto every variable and the mirror becomes self-documenting in Dev Mode.
- **Use when:** you want designers binding to named values instead of raw hexes, and you want Dev
  Mode to show `var(--bg-surface)`. · **Don't use when:** you want it to generate your CSS.
- **Scores /5:** visual — · interaction 4 · a11y — · engineering 3 · maintenance 5 · docs 4 ·
  customization 3 · perf — · stability 4 · originality 3
- **Evidence:** `resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR'`, and *"a variable's type is
  fixed at creation and cannot be changed"* — retyping requires creating a new variable and
  repointing every alias and binding (developers.figma.com/docs/rest-api/variables-endpoints/,
  2026-09-09). REST API: Enterprise plan, Full seat, both GET and POST, scopes
  `file_variables:read`/`file_variables:write`. Plugin API: all plans.
- **Looked at:** the REST API reference and the Variables getting-started page. The plan table is
  the first thing on the page, above the description of what the API does — Figma is not hiding the
  gate, but every blog post about "syncing Figma tokens" omits it.
- **Vibecode risk:** low.
- **Link:** https://developers.figma.com/docs/rest-api/variables/

### Style Dictionary v5 — `strong`
- **What:** Node build system that reads token files (DTCG or legacy), applies transforms, and
  writes platform-specific output — CSS, SCSS, JS, TS, Swift, Kotlin, XML, whatever you can write a
  formatter for.
- **Verdict:** The category's incumbent, and it earned that. 1,682,990 weekly installs, 69 releases
  over nine years, currently shipping on a two-to-six-week cadence (v5.5.0 → 5.5.1 → 5.5.2 → 5.5.3
  between June and September 2026). Its model — parse, transform, format — is the right abstraction
  and has survived two format eras. The reason it isn't `essential` is scope: it solves
  multi-platform output, and if you have one platform it is a build step that produces a file you
  could have typed. Two current cautions. **Node ≥22** since v5.0.0, which is the single most common
  reason teams are stranded on v4. And the docs site still leads with "Migration to Version 4" and
  "v3 docs" as two of its four hero buttons while shipping 5.5.3 — there is no "migration to v5"
  link on the homepage at all, which tells you where the maintainer's attention has and hasn't been.
  It does **not** implement the DTCG Resolver module; no issue in its tracker even mentions it by
  title.
- **Use when:** the same token must become CSS *and* Swift/Kotlin/XML. · **Don't use when:** one
  web app. You are building a compiler for a single-file problem.
- **Scores /5:** visual 2 · interaction — · a11y — · engineering 5 · maintenance 5 · docs 4 ·
  customization 5 · perf 4 · stability 4 · originality 4
- **Evidence:** ★4,802 · 631 forks · 242 open issues · `style-dictionary` 5.5.3 published
  2026-09-06 · 1,682,990 wk npm · Apache-2.0 · repo moved from `amzn/` to
  `style-dictionary/style-dictionary` · v4.0.0 2024-06-28, v5.0.0 2025-05-16 · v5 breaking:
  no references to non-token leaf nodes, no `.value` suffix, reference syntax fixed to DTCG, Node
  ≥22 (all quoted from the v5.0.0 release notes).
- **Looked at:** https://styledictionary.com at 1440 and 390 — teal chameleon mark, oversized
  black grotesque wordmark, a live four-tab demo (Tokens / Config / Script / Output) that actually
  compiles DTCG JSON to `/vars.css` in the page, with a format dropdown. The demo is the best part
  of the site and it's below the fold at both widths. On mobile the four hero buttons reflow into a
  ragged 1-2-1 stack — "Documentation", then "Migration to Version 4" beside "GitHub", then "v3
  docs" alone and centred. A tool at 5.5.3 whose mobile hero offers v3 and v4 wayfinding and no v5.
- **Vibecode risk:** low as a tool. Medium as a habit: the default `css/variables` formatter emits
  every token flat with no semantic layer, which is how you get 668 literals and 27 aliases.
- **Link:** https://styledictionary.com

### Terrazzo — `strong`
- **What:** DTCG-native token compiler. `@terrazzo/cli` plus plugins for CSS, Sass, Tailwind,
  vanilla-extract, Swift and a token-listing output. MIT, free.
- **Verdict:** The best-engineered new thing in the category and the one that actually tracks the
  spec. It treats DTCG as the input language rather than as an import format, and — the
  differentiator — **it implements the Resolver module**: commits on 2026-08-11 landed "partial CSS
  output for resolvers" and "fix resolver alias merging", which is precisely the orthogonal-axis
  theming model from Decision 4, emitting only the varying declarations per mode instead of a full
  set per permutation. Style Dictionary does not do this. The risk is proportionality: 456 stars,
  six subscribers, effectively one maintainer. `@terrazzo/plugin-css` pulls 66,216 weekly against
  the CLI's 55,239, which suggests it is being consumed as a library inside other builds as much as
  run as a CLI. Adopt it for a new pipeline; don't migrate a working Style Dictionary config to it
  on architecture grounds alone.
- **Use when:** starting a token pipeline in 2026 with no legacy config, especially with real
  multi-axis theming. · **Don't use when:** you need the long tail of Style Dictionary's community
  transforms, or your org needs a bus factor above one.
- **Scores /5:** visual 3 · interaction — · a11y — · engineering 5 · maintenance 4 · docs 4 ·
  customization 4 · perf 4 · stability 3 · originality 5
- **Evidence:** ★456 · created 2021-11-17, pushed 2026-09-10 · 6 subscribers · MIT ·
  `@terrazzo/cli` 2.7.1 2026-08-11, 55,239 wk npm · `@terrazzo/plugin-css` 2.5.0 2026-07-26, 66,216
  wk npm · resolver commits #815 and #817, both 2026-08-11.
- **Looked at:** https://terrazzo.app at 1440 and 390 — a cyan blueprint grid across the whole
  viewport, Memphis-style flat shapes (coral rectangle, lime half-circle, teal/cyan triangle strip)
  with real Figma selection handles drawn on them, and "Design systems / FOR EVERYONE" in a white
  box that overlaps the shapes. A hard-edged, un-rounded, un-gradiented aesthetic that is the exact
  opposite of the category's house style, and it's the most memorable page of the twelve I looked
  at. The "USED BY" panel lists Figma, HP, The Guardian, LEGO, Snyk, GitButler and WordPress —
  self-reported, unverified, but a strikingly good list for a 456-star project. At 390 the whole
  composition reflows cleanly to a single column with the logo grid at 2-up; nothing clips.
- **Vibecode risk:** low.
- **Link:** https://terrazzo.app

### DTCG Format + Resolver Module 2025.10 — `strong` (as a target), `reference-only` (as a read)
- **What:** The W3C Community Group format for design tokens. Three modules in the 2025.10 release:
  Format, Color, Resolver.
- **Verdict:** Finally worth targeting, and almost nobody has noticed because the URL everyone
  links — `tr.designtokens.org/format/` — serves a preview draft whose own banner says "Do not
  attempt to implement this version." The thing you want is
  `designtokens.org/TR/2025.10/`: Format as a **Final Community Group Report**, Resolver as a
  **Candidate Recommendation** explicitly marked "considered stable… intended for implementation."
  The Resolver is the important half; it is the answer to `[RFC] Theming`, issue #2, opened
  2019-06-26 and *still open* with 35 comments. Read the arithmetic on that: the format spent six
  years unable to express the thing tokens exist for. Adoption is correspondingly thin — Style
  Dictionary is DTCG-*compatible* (it parses the format) but doesn't implement the Resolver;
  Terrazzo does; Figma emits its own JSON shape, not DTCG; Tokens Studio has its own format with a
  `$extensions["studio.tokens"]` bridge. The conformance test suite landed **2026-09-08**, one day
  before this evaluation, and its own PR body admits "every design token tool developer has to write
  their own fixtures."
- **Use when:** choosing the on-disk format for a pipeline you're building. · **Don't use when:**
  hand-authoring. It's a machine format with no comments and no arithmetic.
- **Scores /5:** engineering 4 · maintenance 3 · docs 3 · stability 3 · originality 3 (visual,
  interaction, a11y, perf n/a)
- **Evidence:** `design-tokens/community-group` ★2,115 · 67 contributors · **87 open non-PR
  issues** · no releases or tags · Format/Color/Resolver 2025.10 dated 28 Oct 2025 · current drafts
  dated 08 Sep 2026 marked "preview… do not implement" · test-suite package PR #413 merged
  2026-09-08 · oldest open issues: #2 Theming (2019-06-26, 35 comments), #53 font family
  (2021-09-07), #88 colour modification composite (2021-12-17, 18), #91 high contrast (2022-01-05),
  #102 typography feedback (2022-01-13, **45 comments**) — all still open 2026-09-09.
- **Looked at:** the 2025.10 Resolver spec. Its terminology section defines *orthogonality* and
  *permutation* as first-class concepts, which is the correct mental model for theme × scheme ×
  density and is stated more clearly there than in any vendor's docs.
- **Vibecode risk:** low.
- **Link:** https://www.designtokens.org/TR/2025.10/

### Figma Code Connect — `situational` (`strong` if you are already Organization or Enterprise)
- **What:** Per-component mapping files that make Dev Mode and the Figma MCP server return *your*
  component's real code and prop names instead of generated markup.
- **Verdict:** The only tool in this file that reduces drift at the component level rather than the
  value level, and the only one whose output an engineer would keep. The 2026 shape is template
  files: framework-agnostic TypeScript that renders exactly the snippet you want, replacing the old
  per-framework parsers. It matters most as agent infrastructure — an agent asking the MCP server
  about a frame gets `<Button size="large" disabled={false}>` rather than a div with a hex, which is
  the difference between an agent extending your design system and an agent reimplementing it.
  Two hard costs. **The gate:** Dev or Full seat on Organization or Enterprise — $25/mo minimum,
  and it is stated in a callout at the top of the docs. **The migration:** v2.0.0 on 2026-08-18
  removed the framework parsers entirely; support ended 2026-08-17; `figma connect publish` now
  exits with migration guidance and the only escape is pinning `@figma/code-connect@1`. Anyone who
  adopted the React parser in 2024 has work to do.
- **Use when:** ≥30 components, ≥5 engineers implementing designs, already on Org/Enterprise. ·
  **Don't use when:** Professional plan, or fewer components than you have engineers.
- **Scores /5:** visual — · interaction 4 · a11y — · engineering 4 · maintenance 4 · docs 4 ·
  customization 5 · perf — · stability 3 · originality 5
- **Evidence:** ★1,571 · `@figma/code-connect` **2.0.0** published 2026-08-18 · 1,058,160 wk npm ·
  MIT · first release 0.1.0 2024-04-16, 1.0.0 2024-06-19 · v2 release notes: *"Framework-specific
  parsers will no longer receive updates or support. Template files are now the only actively
  maintained way of using Code Connect."* · docs callout: *"Available on a Dev or Full seat on the
  Organization, and Enterprise plans."*
- **Looked at:** https://developers.figma.com/docs/code-connect/ at 1440 — a conventional three-pane
  docs layout, black top bar, ~68ch measure, indigo links, and the plan-gate callout rendered as a
  1px indigo-bordered box directly under the H1, before the first sentence of prose. Good
  information design: the disqualifying constraint is the first thing on the page. The left nav
  already labels the parser guides "Legacy Integration Guides," which is how you find out about a
  migration before you read a release note.
- **Vibecode risk:** low — it makes output *more* like your codebase, which is the point.
- **Link:** https://developers.figma.com/docs/code-connect/

### Figma Dev Mode MCP server — `situational`
- **What:** Figma's hosted MCP endpoint. Reads frames, variables, components and metadata into an
  agent; also writes back to canvas.
- **Verdict:** Genuinely useful for the thing it's good at — pulling the variable definitions and
  layout of *one selected frame* into an agent that then writes code — and structurally unable to be
  a pipeline, because of the rate limits. **600 tool calls per day is the ceiling, on Enterprise
  Full seats.** Professional and Organization get 200/day. A View or Collab seat gets **six per
  month**. Building one screen with an agent that inspects a frame, fetches variables, checks
  components and re-checks after edits burns 10–30 calls; a team of five hits the Enterprise ceiling
  in an afternoon of real work. Treat it as an interactive assist with a daily budget, not as
  infrastructure. Second constraint: only MCP clients listed in Figma's own catalog can connect at
  all, so "point your agent at Figma" is not a thing you can just do. The write-to-canvas tools are
  exempt from rate limits, which tells you where Figma wants the traffic.
- **Use when:** an engineer is implementing a specific frame and wants variables and structure
  without a screenshot. · **Don't use when:** you want tokens synced, or you want an agent to
  traverse a file.
- **Scores /5:** visual — · interaction 3 · a11y — · engineering 4 · maintenance 4 · docs 4 ·
  customization 2 · perf 2 · stability 3 · originality 4
- **Evidence:** verified live from the server's own `rate-limits-access.md` resource, 2026-09-09 —
  View/Collab: 20/month on Starter, 6/month on Professional, Organization and Enterprise; Dev/Full:
  200/day + 10/min (Professional), 200/day + 15/min (Organization), 600/day + 20/min (Enterprise).
  `add_code_connect_map`, `create_new_file` and `whoami` are exempt. Enterprise-managed auth exists
  only for Claude via Okta XAA. `whoami` on this machine returned `tier: starter, seat: View` →
  20 calls/month.
- **Looked at:** the MCP docs index. Its Q&A section is unusually candid — the listed entries
  include "The server keeps returning web/react code", "Tried to fetch variables, but got code
  instead", "It's stuck or too slow" and "Known issues with MCP clients". A vendor documenting those
  four failure modes by name is telling you the shape of the product.
- **Vibecode risk:** **high.** An agent handed a frame and no Code Connect mapping produces exactly
  the generated-looking output this corpus exists to prevent: absolute-positioned divs, baked hex
  values, no component reuse, no state. Code Connect is the mitigation; without it, don't use MCP
  output as anything but reference.
- **Link:** https://developers.figma.com/docs/figma-mcp-server/

### Tokens Studio — `situational`
- **What:** Figma plugin (formerly Figma Tokens) plus a hosted "Studio" platform. Token types Figma
  variables don't have, aliases, math, multi-dimensional themes, Git sync, and an SD transform
  bridge.
- **Verdict:** By a distance the most capable token editor that lives inside Figma, and the only
  honest answer when designers must own token values and will not open a repo. It handles the things
  Figma Variables can't: composite typography, shadows, math (`{spacing.base} * 2`), and theme
  matrices. The plugin repo is healthy — MIT, ★1,606, pushed the day before this evaluation, though
  with 339 open issues. Two cautions. The pricing has moved decisively upmarket: €17/editor/mo for
  the Variables-only plan, **€169/mo** for Essential (one editor, one project) and **€499/mo** for
  Organization (five editors, twenty projects). And the piece most teams actually depend on —
  `@tokens-studio/sd-transforms`, the bridge that makes Tokens Studio output legible to Style
  Dictionary — last published **2025-12-10**, nine months ago, while Style Dictionary shipped
  eleven releases in that window. Check that bridge before you build on it.
- **Use when:** designers are the ones changing token values, weekly. · **Don't use when:**
  engineers own the tokens. You will be paying €169–499/mo for a second editing surface on a file
  you could edit in your IDE.
- **Scores /5:** visual 3 · interaction 4 · a11y 2 · engineering 4 · maintenance 4 · docs 3 ·
  customization 5 · perf 3 · stability 4 · originality 4
- **Evidence:** `tokens-studio/figma-plugin` ★1,606 · MIT · pushed 2026-09-09 · 339 open issues ·
  `@tokens-studio/sd-transforms` 2.0.3 published 2025-12-10, 163,156 wk npm ·
  `@tokens-studio/types` 171,219 wk npm · pricing verified on tokens.studio/pricing 2026-09-09.
- **Looked at:** https://tokens.studio at 1440 and 390 — "DESIGN SYSTEMS, / FULLY AUTOMATED" in
  black all-caps tight-tracked grotesque at roughly 96px, cyan (#22D3EE-ish) primary button, 3D
  isometric card renders of token panels floating at the fold's edge. The cookie consent modal
  occupies the bottom third of the 1440 viewport and covers the product screenshot entirely, with
  an Intercom bubble reading "Got a question? Leave it here" overlapping it on the right. Two modals
  and a chat widget over the hero of a design-systems product is a reasonable thing to notice.
- **Vibecode risk:** low.
- **Link:** https://tokens.studio

### Storybook (as a token surface) — `strong`
- **What:** Component workshop. 19.5M weekly installs. `@storybook/addon-themes` provides theme
  decorators; `@storybook/addon-docs` provides the docs surface.
- **Verdict:** Storybook's correct role here is *rendering* the token system, not storing it. The
  Themes addon offers exactly three integrations — JSX providers, CSS classes, and data attributes
  — and the third is the right one for a custom-property system: `withThemeByDataAttribute` flips
  `data-theme` on the preview root and every mode in your CSS just works, including density and
  brand axes if you wire more than one. That's the entire integration. Where Storybook earns its
  place is as the **visual diff surface for token changes**: a "Tokens" docs page that renders every
  swatch, every spacing step and every shadow from live `var()` references means changing a value
  produces a reviewable image in Chromatic or a visual-test run. That is the closest thing this
  category has to enforcement for *visual* correctness. The cost is honest: Storybook is a heavy
  dependency with a large surface, and 10.x arrived 2025-10-28 with real migration work.
- **Use when:** you already run Storybook, or you have >20 components and no other visual review
  gate. · **Don't use when:** you're adding Storybook *for* the tokens. That's a 19MB answer to a
  200-line question.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 5 ·
  customization 5 · perf 2 · stability 4 · originality 3
- **Evidence:** ★91,026 · `storybook` 10.6.0 published 2026-09-02, 19,523,428 wk npm · 10.0.0
  2025-10-28, 9.0.0 2025-05-28 · `@storybook/addon-docs` 15,571,865 wk · `@storybook/addon-themes`
  3,409,150 wk · MIT · pushed 2026-09-10.
- **Looked at:** https://storybook.js.org/docs/essentials/themes at 1440 — standard three-pane docs
  with a framework tab row (React / Vue / Angular / Web Components / More) and a "Copy markdown"
  button top-right, which is a small, well-judged agent affordance. The page's "On this page" nav
  lists precisely three theme mechanisms, which is the useful summary. The hero illustration is a
  screenshot of a dark-mode Storybook composited over a stock photo of green leaves — an odd choice
  that makes the actual UI harder to read than a plain background would.
- **Vibecode risk:** medium — the default Storybook example set (`Button` with `primary`/`size`,
  the pink "Acme" header, the "Pages in Storybook" doc) ships in every `storybook init` and shows up
  unedited in an alarming number of real design systems.
- **Link:** https://storybook.js.org/docs/essentials/themes

### Supernova — `situational`
- **What:** Design-system documentation and pipeline platform, now positioned as an AI context
  broker with a per-context MCP endpoint.
- **Verdict:** A competent documentation product that has bet the company on being the thing agents
  read. The repositioning is total: the homepage headline is "Design & engineering knowledge, ready
  for AI agents," the pricing page's first feature category is "AI context management," and seats
  are metered in "workspace credits" and "MCP consumers." Underneath it is still the same useful
  thing — pull from Figma and Storybook, render docs, run code pipelines, track adoption. The free
  tier is unusually real: 5 seats, MCP enabled, one design system, 1,000 credits/month, and the
  documentation portal. Judge it as a docs tool that happens to expose MCP, not as a token pipeline;
  its "code automation pipelines" are capped at 1 (Free) and 5 (Pro), which tells you they are not
  the product any more.
- **Use when:** you need a maintained documentation site that designers can edit and agents can
  query. · **Don't use when:** you need the token build. That's Style Dictionary or Terrazzo.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 3 · maintenance 4 · docs 4 ·
  customization 3 · perf 3 · stability 3 · originality 3
- **Evidence:** closed source, no public repo. Pricing verified 2026-09-09: Free ≤5 seats / 2 AI
  contexts / 1 design system / 1,000 credits per month; **Pro $35/seat/mo** (yearly −22%), ≤15
  seats, 25 MCP consumers, 3,000 credits/seat, 5 pipelines; Enterprise custom, 5,000 credits/seat,
  SAML SSO, code adoption tracking.
- **Looked at:** https://www.supernova.io at 1440 — dark navy pill navbar floating on a pale grey
  ground with a faint square-grid pattern, a "News · Introducing Supernova Editor MCP" pill above
  the fold, and a headline split across two colours (near-black "Design & engineering" over blue
  "knowledge, ready for AI agents"). The product screenshot is the honest part: a three-pane app
  with Overview / Documentation / **Contexts** / Pipelines / Insights in the sidebar, and a Drive
  context panel reading "Design tokens 206 of 324", "Token themes 8 of 12", with a distribution card
  showing `mcp.supernova.io/google/1337-drive` marked "Internal only". Using Google's Material
  Design as the demo tenant is a confident choice.
- **Vibecode risk:** low.
- **Link:** https://www.supernova.io

### zeroheight — `situational`
- **What:** Hosted design-system documentation site that syncs from Figma, Storybook and code.
- **Verdict:** The most designer-native of the documentation tools and the one non-engineers
  actually maintain without help, which is the entire reason it exists. Same 2026 repositioning as
  everyone else — the headline is "Get teams and agents building from your design system — not
  around it" — but the underlying product is unchanged and still good at the boring thing. Pricing
  is the clearest in the category: a genuine $0 plan, then **$49 per editor/month** annually ($59
  monthly, $588/year, minimum one editor), then Enterprise. Both paid-adjacent tiers include an MCP
  server capped at **500 calls/month** with "Standard Search"; Enterprise gets "Fast Search". Note
  the asymmetry with Figma: zeroheight sells you 500 agent calls a month where Figma Enterprise
  gives 600 a day. These MCP endpoints are marketing surface, not infrastructure.
- **Use when:** designers and writers must own the documentation site. · **Don't use when:** the
  docs would be better as MDX next to the components, which for an engineering-owned system they
  usually would.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 3 · maintenance 4 · docs 4 ·
  customization 3 · perf 3 · stability 4 · originality 2
- **Evidence:** closed source. Pricing verified 2026-09-09: Free $0 · Starter $0 for 14 days then
  $49/editor/mo annual, $59 monthly, $588/yr, pro-rated minimum 1 editor · Enterprise contact sales
  · MCP server with Standard Search, 500 calls/month, on Free and Starter.
- **Looked at:** https://zeroheight.com at 1440 — warm cream ground (`#EFEADD`) with a fine dot
  grid, large soft beige geometric shapes bleeding off all four corners, a very tight-tracked black
  grotesque headline at roughly 88px, and a coral (`#FF4B4B`-ish) primary button beside a black
  secondary. A restrained, non-generic palette; the only false note is that the cookie banner is a
  full-width dark bar occupying the bottom ~12% at 1440. The pricing page sets its H2 at 56px/62
  with −1.12px tracking in a display face over 20px body — a real type system, which is the least
  you should expect from this vendor.
- **Vibecode risk:** low.
- **Link:** https://zeroheight.com

### Builder.io — `situational`
- **What:** Visual CMS and agentic development platform with Figma import (Visual Copilot). MIT
  SDKs.
- **Verdict:** The best-engineered company in the design-to-code lane and the one that has most
  clearly stopped being in it. The homepage headline is "Build software with your team and agents";
  the hero mock is multiplayer cursors labelled Maya · Designer, Devon · Content, Sam · Engineer
  around a merged PR card, not a Figma frame. Figma import still exists and is still among the best
  of its kind, but the product is a CMS plus a coding agent now, and evaluating it as a token or
  handoff tool means evaluating a feature its vendor has stopped leading with. The SDK story remains
  genuinely good — MIT, multi-framework (React, Vue, Svelte, Qwik, Angular), ★8,823 — and if you
  need marketers editing production pages it's a defensible choice on those grounds alone.
- **Use when:** you want visual editing of production pages by non-engineers. · **Don't use when:**
  you want Figma frames converted to your components. Code Connect does that properly and this does
  not.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 4 ·
  customization 4 · perf 3 · stability 4 · originality 3
- **Evidence:** `BuilderIO/builder` ★8,823 · MIT · 1,163 forks · pushed 2026-09-08 ·
  `@builder.io/sdk` 6.3.3 published 2026-08-24 · `@builder.io/dev-tools` 17,838 wk npm.
- **Looked at:** https://www.builder.io at 1440 — full-black ground with a faint vertical grid,
  cyan (`#00E5FF`-ish) primary button in uppercase mono-ish type, white display headline with
  "agents" set in italic inside a cyan selection box complete with resize handles, three coloured
  collaborator cursors, a floating "Semibold / B I U S" text toolbar, and a `PR #2841 · hero.tsx`
  card showing `+148 −62  3 files  MERGED`. Logo wall: Harry's, Serasa Experian, Faire, Vistaprint,
  Alo Yoga, ClickUp, Panasonic, Pendo. It is a well-made page and it is selling an agent, not a
  converter.
- **Vibecode risk:** **high** for any generated output. The Figma-import path produces
  fresh markup, not references to your components.
- **Link:** https://www.builder.io

### Knapsack — `experimental`
- **What:** Formerly a design-system platform; now, per its own homepage, an AI-conformance and
  evaluation product. Waitlist only.
- **Verdict:** The pivot is complete and it is worth reading even though you can't buy it. The
  homepage is a single hero — "Your AI has no idea what good looks like." — over a purple-pink mesh
  gradient with one "Join the waitlist" button, and the thesis underneath is sharper than most of
  this category: *"Anyone can put documents in a folder and point an LLM at it. The hard part is
  knowing which context to trust, measuring whether your AI's answer conforms to your standards, and
  proving it got better — not just faster."* Their three principles are provenance, analytics,
  governance, and they explicitly position as an aggregator over GitHub, Figma, Jira, **Supernova**
  and **Storybook** rather than a replacement. That is the correct read of where the problem
  actually is in 2026. It is also a waitlist with no pricing, and the old marketing site still lives
  at the subpages with a "Plans → Contact Sales" nav and a comparison page titled "A Tale of Two
  Tools: How Knapsack and Storybook Stack up". Do not plan a system around this.
- **Use when:** never, yet. · **Don't use when:** you need something today.
- **Scores /5:** visual 3 · interaction — · a11y — · engineering — · maintenance 2 · docs 1 ·
  customization — · perf — · stability 1 · originality 5
- **Evidence:** closed source, no public repo (`KnapsackPro/knapsack` on GitHub is an unrelated Ruby
  project). No published pricing as of 2026-09-09. Homepage claims "Trusted by over 4k+ companies".
- **Looked at:** https://www.knapsack.cloud at 1440 — a white rounded-rectangle page container
  inset from a white ground, a floating white pill navbar containing only the wordmark and "Book a
  demo", a large purple/pink/peach mesh-gradient wash occupying the bottom two-thirds, and a violet
  pill CTA. Confident and empty; there is no product screenshot anywhere above the fold.
- **Vibecode risk:** — (nothing to ship).
- **Link:** https://www.knapsack.cloud

### Locofy — `reference-only`
- **What:** Figma/Penpot/Adobe XD → React, React Native, Angular, HTML, Flutter, Next.js, Vue,
  Gatsby, SwiftUI, Compose.
- **Verdict:** The widest target matrix in the category and the least useful output. The problem is
  structural, not quality: converting a frame to code produces markup that has no relationship to
  the components rendering the same thing elsewhere in your app, so every conversion forks the
  design system rather than extending it. Locofy's own hero copy — "Locofy fits into your design
  tools, design systems and your dev workflows, without compromising on security or code quality" —
  is arguing against exactly this objection, which tells you it's the objection. Read it to
  understand the category; don't merge its output.
- **Use when:** a throwaway prototype from a design you will not maintain. · **Don't use when:**
  the code enters a repo with a design system.
- **Scores /5:** visual 3 · interaction 3 · a11y 2 · engineering 3 · maintenance 4 · docs 3 ·
  customization 2 · perf — · stability 3 · originality 2
- **Evidence:** closed source, no public repo or npm package to verify against.
- **Looked at:** https://www.locofy.ai at 1440 — a saturated royal-blue full-bleed ground, white
  display headline, mint-green primary button, and a second-line headline reading "design to {code}
  in a flash" with "design" inside a drawn Figma selection box and "flash" on a lighter blue chip.
  A 14-icon framework strip runs along the fold (Figma, Penpot, Adobe XD → React, React Native,
  Angular, HTML, Flutter, Next.js, Vue, Gatsby, SwiftUI, Compose). The nav includes "LDM Research
  Paper" — Large Design Models — which is a notable thing to put in a primary nav.
- **Vibecode risk:** **high.**
- **Link:** https://www.locofy.ai

### Anima — `reference-only`
- **What:** Was a Figma-to-code plugin. Is now an AI app builder with a Figma import button, plus a
  spin-off product (AgentGrid.io).
- **Verdict:** Included because people still recommend it for handoff and that recommendation is
  two years out of date. The hero is a prompt box — "Let's create something beautiful" — with
  "Import Figma" and "Clone website" as chips beside it. That is a different product from the one
  that had a Figma-to-React reputation. Same structural objection as Locofy: generated markup, not
  references to your components.
- **Use when:** never for handoff. · **Don't use when:** any maintained codebase.
- **Scores /5:** visual 4 · interaction 3 · a11y 2 · engineering 3 · maintenance 4 · docs 2 ·
  customization 2 · perf — · stability 3 · originality 2
- **Evidence:** closed source. Site verified 2026-09-09.
- **Looked at:** https://www.animaapp.com at 1440 — very dark charcoal ground, a high-contrast serif
  display headline ("AI with an Eye for Design") which is genuinely unusual and good in this
  category, violet accent, large blurred violet orbs bleeding from both edges, and a top banner for
  "AgentGrid.io: A shared drive for humans and agents". Below the fold, four generated-app thumbnails
  with headlines like "Your Work. Supercharged by AI." and "Keep Your Team In Sync, Anywhere" — which
  are, ironically, a compact museum of AI-generated marketing copy.
- **Vibecode risk:** **high.**
- **Link:** https://www.animaapp.com

---

## Rejected / avoid

- **Specify — dead.** Sunset announced 2024-10-25 by co-founder Valentin Chrétien; the service shut
  down **2024-11-15**. His own words: *"Despite our best efforts, we couldn't find our product-market
  fit."* The trap is that **specifyapp.com is still live**, still serves a full marketing site with a
  "Pricing" nav item and a "Your Design Token Engine" hero, and still ranks for design-token
  queries; the only signal is a white pill above the headline reading "Saying Goodbye: The End of
  Specify". Its blog — 45 posts including "why Specify and Style Dictionary are a perfect match" and
  "how to sync design tokens from Tokens Studio to GitHub as CSS variables" — is still a decent read
  and is entirely about a dead product. If an agent cites Specify as a current option, it read the
  homepage and not the banner.
- **`token-transformer` — abandoned but load-bearing.** 0.0.33, published **2023-05-25**, still
  pulling **45,193 installs/week**. It was the bridge from the old Tokens Studio format to Style
  Dictionary; `@tokens-studio/sd-transforms` replaced it. Three years of tutorials still recommend
  it. Grep your lockfile.
- **Theo (Salesforce) — archived 2025-06-09**, ★1,988, still 11,565 installs/week. The original
  design-token tool, from the team that coined the term. Historical interest only.
- **Diez — last push 2022-12-10**, ★1,236, 1,318 installs/week. An ambitious cross-platform design
  language compiler that lost to Style Dictionary.
- **Staying on Style Dictionary v3 or v4.** v5 fixed the reference syntax to match DTCG and requires
  Node ≥22; both make the migration strictly cheaper now than later, and v4 is two major versions
  behind a project shipping monthly.
- **Any workflow whose first step is "export tokens from Figma."** Not because the tools are bad —
  because it inverts the enforcement direction. See Decision 3.

---

## What actually breaks in practice

Ranked by how often I've seen it, not by severity.

1. **Someone edits the generated file.** The single most common failure. `tokens.generated.css` is
   committed, a value is wrong on a Friday, an engineer fixes it in the generated file, and the next
   sync silently reverts it. Mitigation: make generated files read-only in CI (`git diff --exit-code`
   after a rebuild), or don't generate.
2. **The theme axes entangle.** Dark mode starts changing a spacing value, or the compact density
   starts changing a border colour. Now the cross-product is real and every new brand is
   `n × 2 × 2` tokens. Mitigation: assert it. A test that reads the mode blocks and fails if a
   `[data-density]` selector declares any property whose name contains `color` or `bg` is fifteen
   lines and prevents a year of drift.
3. **Dark mode inverts the ramp instead of remapping the semantic layer.** Every component that
   referenced `--n-200` directly now has the wrong contrast in exactly one theme, and nothing fails.
   Mitigation: a stylelint rule banning primitive-ramp names outside the semantic block.
4. **Figma's `FLOAT` has no unit.** A spacing variable of `16` exports as `16` and someone appends
   `px` in the exporter. Six months later someone needs `rem` for a user font-size preference and
   there is no way to tell which of 40 floats were px and which were rem. Mitigation: never let
   Figma be the origin of a dimension token; or encode the unit in the variable name and accept the
   ugliness.
5. **Semantic naming outruns the number of real decisions.** `--ds-background-accent-magenta-subtlest-hovered`
   is fine when it's one of 619 names in a consistent grammar. `--Component-Form-DevDash-Background-Surface-Borderless-Default`
   is a component-scoped token that exists because one form needed a variant, and there are now
   2,041 of them. Mitigation: a token needs a name only when ≥3 places use it *and* it can change
   independently.
6. **Density mode is half-implemented.** Row height shrinks, type doesn't, and "compact" reads as
   cramped. Mitigation: density must move at least `--row-h`, `--pad-x` and `--text-base` together.
7. **The Figma file and the repo agree on values and disagree on names.** Values sync, names drift,
   and Dev Mode shows `#FBFBFA` while the code says `--bg-surface`. Mitigation: Figma's
   `codeSyntax` field, per variable, holding the exact CSS custom-property name.
8. **The plan gate is discovered after the design.** Someone architects a Figma-REST sync and finds
   out at implementation that it needs Enterprise. Mitigation: `whoami` first, always.
9. **Per-platform output diverges silently.** The web gets a new token, iOS doesn't, because the
   iOS build filters by a `platform` attribute someone forgot to set. Mitigation: a test asserting
   the token *count* matches across platform outputs, with an explicit allowlist of exclusions.
10. **The MCP budget runs out mid-task.** An agent is 60% through a screen and starts getting rate
    limit errors, and its recovery behaviour is to guess values. Mitigation: fetch the frame's
    variable definitions once, write them into the working context, and don't re-query.

---

## The pragmatic path this corpus recommends

**CSS custom properties, hand-authored, versioned in the app repo, with Figma mirroring.**

Concretely, in order:

1. Before the first component, write `app/tokens.css` following `system/3-tokens.md`: a primitive
   ramp (10–12 neutrals, one accent, 3–4 semantic colours), a semantic layer that components
   reference exclusively, and mode blocks for dark / density / brand as separate attribute
   selectors. Target 60–120 declarations.
2. Comment the *decisions*, not the values. `--text-disabled: …; /* 3.1:1 — never carries meaning */`
   is the sentence that stops a future engineer from using it for a label.
3. Add one stylelint rule: no hex, rgb, oklch or bare px in any file except `tokens.css`. This is
   the enforcement mechanism the whole argument rests on; without it the file is a suggestion.
4. Run `node tools/contrast.mjs --pairs` and commit the output. Contrast is a property of the token
   *pair*, so it belongs to the token file, not to the component.
5. Have a designer create one Figma variable collection whose names match the semantic layer
   exactly, and set each variable's `codeSyntax.WEB` to the custom-property name. Twenty minutes.
   Re-mirror when the CSS changes — which after month one is a handful of values a quarter.
6. If you run Storybook, add one docs page that renders every token from live `var()` references, so
   a token change produces a visual diff a human reviews.
7. Revisit only when Decision 1's line is crossed: a second non-web platform, or ≥4 independently
   maintained brands. Then add Terrazzo (new pipeline) or Style Dictionary (multi-platform, big
   ecosystem) and emit CSS *plus* the other platform from one DTCG file — with the CSS output
   diffed against the hand-authored file on the first run so you can prove nothing changed.

**Why this is right and not just easy.** Three arguments, in order of strength.

*The enforcement argument.* In the repo, a wrong value is caught by stylelint, appears in a diff,
and requires review. In Figma, it is caught by nobody. Any architecture that makes the unenforced
artefact authoritative over the enforced one will drift, and no amount of sync frequency fixes that
— it just propagates the drift faster.

*The expressiveness argument.* Figma variables cover four types. A real token file needs shadows,
easings, durations, font stacks with fallbacks, and dimension values that know whether they're px or
rem. A Figma-origin pipeline always leaves 30–40% of the token file hand-maintained somewhere else,
which is the exact problem it was installed to solve.

*The cardinality argument.* Ninety declarations do not need a build system. The measured evidence
says teams shipping excellent products run 281–619 properties; the ones running 2,000 got there by
generating, not by deciding. A pipeline lowers the marginal cost of adding a token, which is
precisely the wrong incentive for an artefact whose value comes from scarcity.

**When it stops being enough.** Five specific triggers, any one of which is sufficient:

- **A second non-web platform** ships from the same design language. Swift cannot read your CSS.
- **Four or more brands**, maintained by different people, on different release cadences.
- **The design system ships as a versioned package** to five or more consuming apps, which means
  you need artefacts with a changelog and therefore a build.
- **Designers, not engineers, change token values weekly.** Then the enforcement argument weakens —
  the values are genuinely owned on the design side — and Tokens Studio with Git sync becomes the
  honest answer.
- **The token count passes ~300 for legitimate reasons** (not naming inflation — actual distinct
  decisions, which usually means many surfaces or many products). Above that, hand-maintenance of
  cross-mode consistency becomes error-prone in a way tests can't fully cover.

Notably absent from that list: "we have dark mode", "we have a compact density", "we have two
brands", "we use Figma", "we want designers to see the tokens". None of those require a pipeline.

---

## When this advice is wrong

- **Large enterprises where design owns the visual language contractually.** In banks, insurers,
  government and healthcare, "the design team owns the palette" is a real organisational fact with
  compliance implications, and the Figma-as-source direction reflects the actual authority
  structure. Fighting it with an architecture argument loses. Take direction A, add a review gate on
  the generated PR, and accept the cost.
- **Design-system teams whose product *is* the tokens.** If you publish a token package that other
  companies consume, DTCG is your API and the pipeline is your build. Everything about "just write
  CSS" is wrong for you.
- **React Native-first products.** RN has no cascade and no custom properties. The JS object is the
  correct primary artefact and the web CSS is the derived one — the inverse of Decision 2. See
  `mobile-and-native.md`.
- **Teams already running Style Dictionary successfully.** Do not migrate to Terrazzo on
  architecture grounds. A working pipeline with a bus factor and a CI job is worth more than a
  better data model.
- **Products with genuinely huge surface area.** Primer's 1,998 properties are not a mistake; they
  cover github.com, a marketing site, a docs site and a component library across two themes. At that
  scale the naming grammar and the generation pipeline are load-bearing. The advice above is
  calibrated for one to three surfaces.
- **Where the accessibility requirement is the design system.** High-contrast modes (Windows HCM,
  forced-colors), user-selected font scaling, and WCAG AAA targets multiply the mode axes in ways
  that make a resolver genuinely valuable rather than ceremonial. DTCG issue #91, "High contrast
  colors", is open for a reason.
- **Anything in this file dated more than six months from 2026-09.** This category re-pivoted
  wholesale inside twelve months. Re-verify every plan gate, every price and every rate limit before
  quoting them.

---

## The generated version

**What an AI agent produces when asked for a design token system:**

1. **A `tokens.js` or `tokens.ts` exporting a nested object**, because that's what training data
   full of blog posts contains. Then a `ThemeProvider`. Then a `useTheme()` hook. Three artefacts
   where one CSS file was needed, and now the theme switch re-renders the tree and the tokens can't
   cross the RSC boundary.
   **Correction:** CSS custom properties are the source of truth. A JS object, if it exists at all,
   is generated from them and never hand-edited.

2. **Tailwind's default palette, unreplaced.** The measured signature is `--color-slate-*`,
   `--color-zinc-*`, `--color-gray-*` on `:root` — 194 of the 365 properties on ui.shadcn.com are
   exactly this. An agent that "sets up tokens" by installing Tailwind has installed 240 colour
   values it did not choose, and the product will look like every other product.
   **Correction:** overwrite `--color-*` in `@theme` and *delete the default ramp* so it cannot be
   reached by accident. `css-and-styling-infra.md` gives the mechanical steps.

3. **A ten-step elevation scale and a nine-step type scale**, because scales look systematic.
   **Correction:** two shadows, five to seven type sizes. Scarcity is the point; see
   `system/3-tokens.md`'s counts table. An eleventh spacing value means the layout is wrong.

4. **Dark mode by inverting the ramp** — `--n-100` becomes near-black, `--n-900` becomes near-white.
   Every component that referenced the ramp directly is now wrong in one theme and nothing fails.
   **Correction:** the primitive ramp is constant. Dark mode re-maps the *semantic* layer only, and
   surfaces get lighter as they rise because shadows are invisible on a dark ground.

5. **"Let's sync from Figma"** with a code sample calling `GET /v1/files/:key/variables/local`,
   with no mention that it requires an Enterprise plan and a Full seat.
   **Correction:** run `whoami` first. State the plan requirement before writing the integration.
   And argue for the mirror direction before writing either.

6. **Style Dictionary installed for one web app.** The agent reaches for the well-known tool because
   the question said "tokens", and now there's a `config.json`, a `build-tokens` script, a
   `tokens/` directory of DTCG JSON and a generated CSS file — to produce ninety declarations
   someone could have typed.
   **Correction:** ask whether a second platform exists. If not, write the CSS file.

7. **Component-scoped token names invented on the spot** — `--button-primary-hover-background`,
   `--card-header-border-color`, `--modal-footer-padding-top`. Each is used once. This is how
   Polaris got to 2,041.
   **Correction:** a token earns a name when ≥3 places use it *and* it can change independently.
   Otherwise it's a value in a component.

8. **Every mode as a separate complete set** — `light.css`, `dark.css`, `light-compact.css`,
   `dark-compact.css`. The cross-product materialised, in the one environment that has a cascade
   and doesn't need it.
   **Correction:** orthogonal attribute selectors on `:root`, each owning disjoint properties. Four
   axes, one file.

9. **The token file with no comments.** Every value present, no decision recorded. Six months later
   nobody knows why `--text-disabled` exists or why it must not be used for meaning.
   **Correction:** comment the constraint, not the colour. `/* 3.1:1 — never carries meaning */`.

10. **Recommending Specify, or Theo, or `token-transformer`.** All three are dead; all three still
    have live sites or five-figure weekly download counts.
    **Correction:** check `pushed_at` and the latest npm publish date before naming any tool in this
    category. It moves fast and the corpses stay warm.

---

## Self-check

Run against your own output before you call the token work done.

- [ ] Is there exactly **one** file that defines token values, and is it CSS? (Not CSS *and* a JS
      object hand-maintained in parallel.)
- [ ] Count the declarations on `:root`. Under 120 for a product UI? If over 300, can you name the
      second surface that justifies it?
- [ ] Do components reference **only** semantic names? Grep your components for the primitive ramp
      (`--n-`, `--gray-`, `--slate-`, `--color-zinc-`). Zero hits expected.
- [ ] Does every mode block declare only properties from **its own axis**? Grep the
      `[data-density]` block for `color`/`bg`. Grep the dark block for `space`/`padding`/`radius`.
      Zero hits expected.
- [ ] Does the dark block redefine the **primitive ramp**? It must not.
- [ ] Is there a stylelint rule banning raw colour values and raw px outside the token file, and
      does it currently pass?
- [ ] Are the contrast pairs verified and the output committed? (`node tools/contrast.mjs --pairs`)
- [ ] If a generated token file exists, does CI fail when it differs from a fresh build?
      (`git diff --exit-code` after rebuild.)
- [ ] If you recommended a Figma API integration: did you state the plan and seat requirement in the
      same paragraph? Did you run `whoami`?
- [ ] If you recommended a pipeline: can you name the *second artefact a compiler cannot read* that
      justifies it? If the answer is "dark mode" or "our brand colours", remove the pipeline.
- [ ] For every tool you named: is its latest publish date within twelve months, and did you check
      rather than recall?
- [ ] If you cited the DTCG spec: did you link `designtokens.org/TR/2025.10/` and not the draft that
      says "do not implement"?
- [ ] Does the density mode move type size, not only padding?
- [ ] Do the Figma variable names match the CSS custom-property names exactly, with `codeSyntax`
      set?

---

## Sources — what I looked at and what I saw

Screenshotted at 1440 (and 390 where noted) with `tools/shot.mjs` and read as images, 2026-09-09:

1. **styledictionary.com** (1440 + 390) — teal chameleon, live DTCG→CSS demo below the fold, hero
   CTAs offering "Migration to Version 4" and "v3 docs" on a site shipping 5.5.3.
2. **tokens.studio** (1440 + 390) — "DESIGN SYSTEMS, FULLY AUTOMATED" in ~96px black caps, cyan CTA,
   cookie modal covering the bottom third plus an Intercom bubble over the product shot.
3. **terrazzo.app** (1440 + 390) — cyan blueprint grid, Memphis shapes with Figma selection handles,
   "USED BY: Figma · HP · The Guardian · LEGO · Snyk · GitButler · WordPress". Cleanest mobile
   reflow of the twelve.
4. **supernova.io** (1440 + 390) — "Design & engineering knowledge, ready for AI agents"; product
   shot shows Contexts/Pipelines/Insights, "Design tokens 206 of 324", "Token themes 8 of 12",
   `mcp.supernova.io/google/1337-drive`.
5. **zeroheight.com** (1440 + 390) — cream `#EFEADD` ground, dot grid, coral CTA, "Get teams and
   agents building from your design system – not around it".
6. **knapsack.cloud** (1440) — waitlist page, purple-pink mesh gradient, "Your AI has no idea what
   good looks like." No product screenshot above the fold.
7. **locofy.ai** (1440 + 390) — royal blue, "design to {code} in a flash", 14-icon framework strip,
   "LDM Research Paper" in the primary nav.
8. **animaapp.com** (1440 + 390) — dark charcoal, serif display headline, prompt box with "Import
   Figma"/"Clone website", AgentGrid.io banner.
9. **builder.io** (1440 + 390) — black ground, cyan uppercase CTA, multiplayer cursors, a merged-PR
   card. Agent platform, not a converter.
10. **developers.figma.com/docs/code-connect/** (1440) — plan-gate callout rendered above the first
    line of prose; left nav already labels parsers "Legacy Integration Guides".
11. **specifyapp.com** (1440) — "Your Design Token Engine" over a dark 3D pipeline render, with a
    white pill above it reading "Saying Goodbye: The End of Specify". A live marketing site for a
    product that shut down 2024-11-15.
12. **storybook.js.org/docs/essentials/themes** (1440) — three theme mechanisms (JSX providers, CSS
    classes, data attributes), a "Copy markdown" button, and a demo screenshot composited on a stock
    photo of leaves.

Measured with Playwright (`getComputedStyle(document.documentElement)`, 1440×900, after
`networkidle`): linear.app, ui.shadcn.com, vercel.com, atlassian.design, m3.material.io,
primer.style, polaris.shopify.com, spectrum.adobe.com. Separately, a stylesheet-text pass over
stripe.com and carbondesignsystem.com. All numbers in the reference table above.

Fetched and read: `designtokens.org/TR/2025.10/` (Format and Resolver modules),
`tr.designtokens.org/format/`, `developers.figma.com/docs/rest-api/variables/`,
`.../variables-endpoints/`, `.../variables-types/`, `developers.figma.com/docs/code-connect/`,
`developers.figma.com/docs/figma-mcp-server/`, figma.com/pricing, tokens.studio/pricing,
supernova.io/pricing, zeroheight.com/pricing, knapsack.cloud/pricing,
specifyapp.com/blog/the-end-of-specify.

Queried live: the Figma MCP server (`whoami` → `tier: starter, seat: View`; and its
`rate-limits-access.md` resource for the full limit table). `gh api` for
style-dictionary/style-dictionary, design-tokens/community-group, tokens-studio/figma-plugin,
figma/code-connect, terrazzoapp/terrazzo, storybookjs/storybook, BuilderIO/builder,
salesforce-ux/theo, diez/diez. `registry.npmjs.org` and `api.npmjs.org/downloads/point/last-week`
for every package in the health table.

---

## Open questions

- **Does anyone actually implement the Resolver module besides Terrazzo?** Terrazzo's August 2026
  commits are the only implementation I could verify. A survey of the DTCG's new test-suite package
  consumers in six months would settle it.
- **What does the real distribution of token counts look like?** Eight sites is a sample, not a
  study. A crawl of the top 500 sites' `:root` custom-property counts, split by whether they publish
  a design system, would turn the "under 120" heuristic into a real percentile.
- **Is `@figma/code-connect`'s 1,058,160 weekly install count real adoption or CI churn?** It is
  implausibly high for a feature gated to Organization and Enterprise seats. Dependents analysis
  would resolve it.
- **How much does Code Connect actually improve agent output?** The claim — that an agent with Code
  Connect mappings produces component-referencing code instead of generated markup — is
  mechanically obvious and completely unmeasured. A controlled comparison on the same frame, with
  and without mappings, scored against `anti-patterns/`'s rubric, is a day of work and would be the
  most useful single experiment in this whole area.
- **Where exactly is the pipeline break-even?** "Ten front-end engineers" is my judgement from
  observation, not a measurement. The honest version would correlate pipeline adoption against
  whether the sync was still running twelve months later.
- **Did the AI-context repositioning work?** Every vendor here bet on being what agents read in
  2026. Whether MCP endpoints capped at 500 calls/month (zeroheight) or metered in "workspace
  credits" (Supernova) are a business or a feature is unresolved, and the answer determines whether
  half this file's `situational` entries exist in 2028.
