# Redesigns and where conventions are actually going

**Evaluated:** 2026-09 · **Reviewed:** 2026-09 (see [Review pass](#review-pass-2026-09))

Every other file in this corpus describes the present tense. This one describes *movement* — what
changed between roughly 2024 and 2026, whether it worked, and which of the resulting "trends" to bet
on. It is deliberately skeptical: most trend writing pattern-matches on marketing sites, and
marketing sites are the part of a product where nobody has to live. Where a claim could be measured
on the live product it was, and where the measurement contradicts the narrative it says so.

---

## If you only apply five things

1. **Put translucency only on the floating chrome layer, never in the content layer, and never
   nested.** Apple's own HIG: *"Don't use Liquid Glass in the content layer… Use Liquid Glass
   effects sparingly."* One blurred surface (a nav, a toolbar, a pinned header) over opaque content.
   A glass card on a glass panel on a gradient is the clearest signal nobody looked at the shipped
   screen. Scope: this is a rule about surfaces you *read*. Media tools invert it — see
   [When this advice is wrong](#when-this-advice-is-wrong).

2. **Depth is coming back as stacked micro-shadows plus a 1px alpha ring, not as blur.** Vercel's
   Geist "Materials" defines eight elevation presets whose largest shadow alpha is **6%**, all built
   on a `0 0 0 1px rgba(0,0,0,0.08)` ring, with **zero `backdrop-filter`**.
   `box-shadow: 0 10px 25px rgba(0,0,0,0.1)` is the generated look;
   `0 0 0 1px #00000014, 0 2px 2px #0000000a, 0 8px 16px -4px #0000000a` is the shipped one.

3. **Give the agent a first-class object, not a drawer.** The two implementations practitioners
   copied — Linear's and Notion's — made the agent something the existing system already knows how to
   handle (an assignee; a top-level nav peer with an inbox). If your agent can't be assigned,
   filtered, notified, and reviewed by machinery you already have, you built a widget.

4. **Price the novelty before you ship it.** Josh Miller on Arc: *"for most people, Arc was simply
   too different, with too many new things to learn, for too little reward."* Slack's 2023–24
   redesign and Figma's UI3 failed on the same axis — the change was real, the payoff was invisible
   to the person paying the retraining cost. Every re-layout owes the user a benefit they can name
   in one sentence.

5. **Check what an "expressive" decision costs on the wire.** Airbnb's four nav icons are `<video>`
   elements in a 36×36 CSS-px slot; the eight assets total **543,700 bytes**. Its reduced-motion
   path ships the same eight icons as AVIF stills for **18,640 bytes** — 29× cheaper. That trade can
   be correct, and it is catastrophic in a dashboard. Decide it, don't inherit it.

---

## Measured / verified reference

Pulled live at 1440×900 in real Chrome on 2026-09-09/10, or verified with a command. Values that
could not be verified are marked.

### Dates, verified

| Change | Date | Note |
|---|---|---|
| Slack redesign announced | Aug 2023 | Rolled to most orgs from **Dec 19, 2023** through 2024 |
| Figma UI3 announced (Config) | **Jun 26, 2024** | All users **Oct 10, 2024**; mandatory default **Apr 30, 2025** |
| Stripe Workbench public beta | Aug 2024 | Replaces the Developers Dashboard; default-on for new accounts |
| Material 3 Expressive published | **May 13, 2025** | Date read off the m3.material.io blog page itself |
| Airbnb 2025 Summer Release | **May 13, 2025** | App rebuild, "Lava" animated icons, Services + Experiences |
| Arc → maintenance mode | **May 27, 2025** | Chromium security fixes only, no roadmap |
| Apple Liquid Glass (WWDC) | **Jun 9, 2025** | Ships in iOS/iPadOS/macOS 26, Sept 2025 |
| Notion 3.0 (Agents) | **Sep 18, 2025** | Top nav gains Home / AI Chats / Meetings / Inbox |
| Atlassian acquires Browser Co. | Announced **Sep 4, 2025**, closed **Oct 21, 2025** | ~$610M cash |
| Dia public on macOS | **Oct 9, 2025** | |
| iOS 26.1 adds Liquid Glass "Tinted" | **Nov 3, 2025** | Settings ▸ Display & Brightness ▸ Liquid Glass ▸ Clear / Tinted |
| Airbnb 2026 Summer Release | **May 20, 2026** | *"Now there's even more to Airbnb."* The nav measured below post-dates it |

### Measured on the live products

| Product | What I measured | Value |
|---|---|---|
| **apple.com** whole page | elements with `backdrop-filter` | **2** — nav `saturate(1.8) blur(20px)` over `rgba(250,250,252,0.8)`, plus its curtain. Unchanged from the pre-Liquid-Glass web nav |
| **linear.app** | elements with `backdrop-filter` | **3** — header `blur(20px)`, two secondary buttons `blur(4px)` on `rgba(255,255,255,0.05)` |
| **linear.app** | most common border-radius | `9999px` × 76; then `8px` × 31, `50%` × 28, `12px` × 18 |
| **linear.app** | root CSS custom properties | **419** (~138 machine-hashed, so ≈281 authored — see [`design-tokens-and-handoff.md`](../libraries/design-tokens-and-handoff.md)) |
| **linear.app** | body type | 16/24, `Inter Variable`, `#f7f8f8` on `#08090a` |
| **github.com** (repo page) | root CSS custom properties | **1,991** |
| **github.com** | body type | **14px / 21px**, `Mona Sans VF`, `rgb(31,35,40)` |
| **github.com** | file-row height, 2021 → 2023 → 2026 | 38px → 38px → **41px** (2026 re-measured live; 2021/2023 from Wayback captures of the same repo page and **not re-verified in this pass**) |
| **github.com** | elements with `backdrop-filter` | **6** — all Primer Brand buttons at `blur(20px)` over `rgba(0,0,0,0.01)` |
| **vercel.com/geist/materials** | elevation presets | 8 named: `base`, `small`, `medium`, `large`, `tooltip`, `menu`, `modal`, `fullscreen` |
| Geist `material-base` | shadow | `0 0 0 1px rgba(0,0,0,.08), 0 0 0 1px #fafafa` — a ring, no drop shadow |
| Geist `material-menu` | shadow | `0 0 0 1px #00000014, 0 1px 1px #00000005, 0 4px 8px -4px #0000000a, 0 16px 24px -8px #0000000f` |
| Geist radius ladder | | 6px (base/small/tooltip) → 12px (medium/large/menu/modal) → 16px (fullscreen) |
| Geist | `--geist-radius` vs `--geist-marketing-radius` | **6px vs 8px** — product and marketing get different radii from one system |
| Geist materials | `backdrop-filter` | **none on any of the eight** |
| vercel.com | *legacy* shadow tokens shipping alongside | `--shadow-small: 0 5px 10px #0000001f`, `--shadow-large: 0 30px 60px #0000001f` — **12% alpha**. The 6% ceiling is a Materials rule, not a site-wide one |
| **airbnb.com** nav icons | element type | `<video>` playing `.webm` in a 36×36 CSS-px slot (the element box is 72×72, scaled and clipped), from `a0.muscache.com/videos/search-bar-icons/` |
| Airbnb icon weights | over-the-wire bytes | `Globe_Twirl` 100,021 · `Globe_Selected` 76,186 · `house-twirl` 97,832 · `house-selected` 63,923 · `balloon-twirl` 69,959 · `balloon-selected` 60,554 · `consierge-twirl` 38,299 · `consierge-selected` 36,926 — **543,700 B total** |
| Airbnb under `prefers-reduced-motion: reduce` | nav DOM + bytes | **0 `<video>`, 8 `<img>`**, served AVIF at **18,640 B total** — a **29× reduction**, not a paused animation |
| **airbnb.com** whole page | elements with `backdrop-filter` | **16**, all `blur(32px)` over `rgb(255 255 255 / 0.8)` |
| **airbnb.com** body font | | `Airbnb Cereal VF` (variable), body 14/20 |
| **linear.app** product rows | | issue row **40px** / 13px / weight 510; sidebar nav row **28px** — both unchanged, per [`keyboard-first-productivity.md`](keyboard-first-productivity.md) and [`../craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md) |

### Adoption, verified (`npm` weekly downloads, 2026-09-10)

| Package | Weekly downloads |
|---|---|
| `tailwindcss` | 110,850,620 |
| `@mui/material` | 8,924,416 |
| `shadcn` (CLI) | 8,742,877 |
| `antd` | 3,199,837 |
| `geist` (the Vercel *font*) | 2,019,311 |
| `@radix-ui/themes` | 878,113 |
| `@fluentui/react-components` | 329,189 |
| `@material/web` | **107,236** |
| `@primer/primitives` | 92,086 |
| `@primer/react` | **37,155** |

Read the bottom rows carefully — and read the denominator too. Material 3 Expressive got the most
design press of any system change in this period, and Google's own **web** implementation does ~107k
weekly installs, below Vercel's font package. Primer, behind the most-visited developer UI on earth,
does 37k. **But npm measures web adoption only.** M3E's real distribution is Android system UI and
Jetpack Compose, which never touches this table; the honest reading is *"M3 Expressive did not cross
to the web,"* not *"nobody adopted M3 Expressive."* The transferable lesson is narrower and still
worth having: design-system press and design-system usage on any given platform are close to
unrelated, and "Google published it" is not "the industry adopted it."

---

## The redesigns, organised by the decision they settle

### Decision 1 — How much translucency, and on which layer

**What changed.** Apple shipped Liquid Glass at WWDC on 2025-06-09: a system-wide material with
specular edges and real-time refraction on tab bars, toolbars, sidebars, Control Center and the lock
screen. Largest visual change to iOS since iOS 7 flattened it in 2013.

**How it was judged.** Badly at first, then repaired. NN/g's teardown: *"Text on top of text creates
an illegible mess,"* plus the observations that iOS 26 loosened the long-standing ≈1cm tap-target
guidance and that contextual appear/disappear chrome repeats Microsoft's failed adaptive menus. Apple
reduced transparency through the beta cycle and on **2025-11-03** shipped iOS 26.1 with an explicit
**Clear / Tinted** switch. Shipping a user-facing toggle to undo your flagship design decision five
months after announcing it is the clearest possible admission the default was wrong.

**What a designer should take.** Not "avoid glass." Take Apple's own constraint list:

- Liquid Glass forms *a distinct functional layer* above content. Nav and controls get it; app
  backgrounds and content cards get standard opaque materials.
- **"Don't use Liquid Glass in the content layer."** The one exception Apple names is transient: a
  slider or toggle picks up the material *while you are dragging it*.
- **"Use Liquid Glass effects sparingly."**
- Two variants. **Regular** blurs *and adjusts luminosity* — use it whenever the surface carries a
  meaningful amount of text. **Clear** is for components floating over photo/video only.
- Over bright content, clear needs a **35%-opacity dark dimming layer** behind it.

Two counterweights make this a real decision rather than a fashion:

- **Apple did not use it on apple.com.** Two `backdrop-filter` elements on the whole homepage, and
  the nav's value is the treatment Apple has shipped for years.
- **Microsoft already ran this experiment and retreated.** Fluent reserves Acrylic for *transient*
  surfaces — context menus, tooltips, search suggestions — and uses **Mica**, opaque, sampling the
  wallpaper once, for primary surfaces including the title bar. Stated reasons: performance *and*
  legibility. That conclusion predates Liquid Glass by three years.

**The synthesis:** translucency is a *transience* signal, not a beauty signal. Surfaces that appear
and vanish can be translucent. Surfaces you read for eight hours cannot.

**Scope on the count, not just the placement.** airbnb.com ships **16** blurred elements and GitHub's
repo page ships **6** — both well-crafted, neither decorating. The number that matters is not how
many `backdrop-filter` rules exist but how many *distinct blurred layers stack in one place*. One
blurred sticky header repeated across sixteen sections is one decision; a blurred card inside a
blurred panel is two.

### Decision 2 — How you show depth if not with blur

**What changed.** Geist grew a `Materials` page under Foundations, beside Colors and Typography. The
company whose aesthetic *is* flat minimalism now ships a formal elevation system.

**What it actually contains** (measured live; `+` is cumulative):

```
material-base       r6    0 0 0 1px #00000014
material-small      r6    + 0 2px 2px #0000000a
material-medium     r12   + 0 8px 8px -8px #0000000a
material-large      r12   + 0 8px 16px -4px #0000000a
material-tooltip    r6    + 0 1px 1px #00000005, 0 4px 8px #0000000a
material-menu       r12   + 0 1px 1px #00000005, 0 4px 8px -4px #0000000a, 0 16px 24px -8px #0000000f
material-modal      r12   + 0 1px 1px #00000005, 0 8px 16px -4px #0000000a, 0 24px 32px -8px #0000000f
material-fullscreen r16   (identical stack to modal)
```

Four properties worth stealing wholesale:

1. **Every material starts with the same 1px ring** (`0 0 0 1px` at 8% black, plus a matching
   near-white `#fafafa` ring so the edge survives on off-white grounds). Border and elevation are one
   token, so nothing can be raised without also being edged.
2. **Maximum shadow alpha is 6%** (`#0000000f` = 5.9%). The blur radii do the work.
3. **Names are semantic-by-use** (`tooltip`, `menu`, `modal`, `fullscreen`), not numeric
   (`shadow-2`, `elevation-3`). You cannot pick the wrong one by picking the prettiest one.
4. **Geist's own rule: "Don't stack two Materials on the same element."** Elevation is a property of
   a surface, not a set of effects you compose.

The 6% ceiling governs the eight Materials only — vercel.com still ships `--shadow-small` and
`--shadow-large` at **12%**. Even the exemplar runs two shadow generations at once, which is why
"how many distinct shadows ship" is a better question than "what does the docs page say."

**What a designer should take.** The retreat from flat is real and it looks like *this*, not like
glassmorphism: hairline ring + two or three barely-there layers + a three-stop radius ladder. Apple's
Materials and Fluent's material list are structurally identical decisions — an enumerated, named,
small set. A `shadow-xs…shadow-2xl` scale where anyone can pick any step for anything is a decoration
menu, not an elevation system.

### Decision 3 — Where the agent lives in the chrome

The only genuinely *new* interface problem of the period, and the field converged fast.

**Linear** rewrote its homepage headline to *"The product development system for teams and agents"*
and its agents page to *"Artificial colleagues. Natural collaboration."* Measured on that page: agent
sessions are **small floating windows** whose title bar carries the vendor plus the model **as a
bordered chip** — `Linear` `Opus 5` — with minimize / expand / close, a prompt shown as the session's
own header field, an `X added to context` line, and a collapsed `Worked for 8 sec ▸` receipt above
the output. Multiple sessions coexist on one rail. Linear's earlier and still-primary move
(documented in [`ai-native-products.md`](ai-native-products.md)) is stronger: the agent is an
**assignee**, so it inherits issue state, status, the inbox and the mobile review flow.

**Notion 3.0** (2025-09-18) put `AI Chats` in the top navigation as a *peer of Home and Inbox*, not a
floating bubble, and gave agents custom instructions plus a persistent identity.

**Slack** put agents in the left icon rail as a labelled `Tools` destination.

**GitHub** and **Stripe** took the quieter route: Copilot inline in the existing review/edit flow;
Workbench as a developer drawer that *replaced* the Developers Dashboard rather than adding a pane.

**What a designer should take.** Four viable placements, not interchangeable:

| Placement | Use when | Products |
|---|---|---|
| **Agent as a first-class actor** (assignee, author, reviewer) | The agent produces the same objects humans do | Linear |
| **Agent as a top-level destination** | Conversations are durable artifacts users return to | Notion, Slack |
| **Agent as a floating session window** | Several runs happen concurrently and each needs its own state | Linear agent windows, Cursor |
| **Agent inline in the existing flow** | The agent edits an artifact the user already has open | GitHub Copilot, Granola, Stripe Workbench |

Two details are becoming convention and both are worth copying: **name the model in the chrome** (a
chip, not prose — provenance is now part of trust), and **collapse a finished run into a receipt with
elapsed time**, not a spinner and not a transcript.

The failure mode is the fifth placement, the one generated UI always picks: a right-hand drawer with
a message list, disconnected from every other object in the product.

### Decision 4 — Floating chrome vs. docked chrome

**What changed.** Figma UI3 (2024-06-26, forced 2025-04-30) detached the toolbar, layers panel and
properties panel from the window edges and floated them over the canvas, primary toolbar at
bottom-centre. The likely real driver: floating chrome is far cheaper to keep consistent across five
products than five docked layouts.

**How it was judged.** Poorly by professionals, with consistent complaints across a year of forum
threads: panels cover the artwork instead of bounding it; you cannot dock them, so dead space sits
between panel and window edge; rulers moved further from the work; the eye travels top→bottom because
tools are at the bottom and properties top-right. Note what is *not* in the list: aesthetics. Nobody
said it looked bad. They said it cost them time, all day, forever.

**What a designer should take.** Floating chrome is a *tourist* pattern — right for surfaces you
visit (a marketing pill nav, Dia's capsule header, a media player's controls), hostile in surfaces
you inhabit. The test is occlusion over time: a docked panel removes N pixels once and the mental
model stays stable; a floating panel removes N pixels *from wherever you happen to be working*.

Slack failed the same test from the other direction: a vertical icon rail added left of the existing
sidebar — a permanent navigation layer eating horizontal space in a product whose content is a text
column — while the multi-workspace switcher power users hit dozens of times a day was removed. A
widely-cited poll found only **17%** loved it (self-selected, not research, but Slack publicly
defended the change, which is what you do when it is going badly). By 2026 the rail survives with
text labels under every icon — the labels are the scar tissue.

### Decision 5 — What a nav icon is allowed to cost

**What changed, visually.** Wayback's March 2023 capture of airbnb.com beside today's:

- **2023:** a horizontal rail of ~14 monochrome line-art *category* filters — Amazing views, Cabins,
  OMG!, Domes, Vineyards, Mansions, Luxe — plus a Filters button. Search pill:
  `Anywhere | Any week | Add guests`.
- **2026:** the category rail is gone. Four 3D *product* tabs — All / Homes / Experiences / Services —
  each a `<video>` playing a `.webm` of a clay-rendered object that animates on hover and select.
  Search pill now shows stacked labels: `Where / When / Who`.

Two changes wearing one coat, and the **IA** change is the important one: the top-level control went
from *filtering one product* to *choosing between three*, because Airbnb became a three-line
marketplace. The **icon** change is the one everyone wrote about. (The `All` globe pair is served from
`/search-bar-icons/unified/webm/` while the other six come from `/search-bar-icons/webm/` — the
fourth tab is a later asset generation than the 2025 release that introduced the other three.)

**Measured cost.** Eight assets, 543,700 bytes, for four icons in two states each, in 36×36 slots. An
equivalent SVG set is single-digit kilobytes.

**The part worth copying, which nobody wrote about.** Under `prefers-reduced-motion: reduce`, the nav
contains **zero `<video>` and eight `<img>`**, served as AVIF, totalling **18,640 bytes**. They don't
pause the videos — they never ship them, and the alternate path is **29× lighter**. That is the
correct implementation of an expensive motion decision: the reduced-motion path is a different,
cheaper DOM, not the same DOM with animation disabled.

**The selected state is three signals, not one.** The active tab swaps to a different `.webm`, gains
a 2px black underline, and shifts its label from grey/400 to black/600. Expensive iconography did not
replace the cheap affordances; it was added on top of them.

**What a designer should take.** Airbnb spent ~500× the bytes of an SVG on nav iconography and it is
probably right *for Airbnb* — the icons do brand work and disambiguate product lines for a
once-a-quarter user. Copy the discipline, not the format. In a tool someone opens forty times a day,
a bouncing icon is a tax charged forty times.

### Decision 6 — Expressive vs. neutral

**What changed.** Material 3 Expressive (2025-05-13) is Google arguing, with unusual amounts of
research attached, that emotional design measurably improves usability. Verified verbatim on the
page: *"46 studies with more than 18,000 participants"* and *"participants spotting key UI elements
up to four times faster in expressive screens."* Also verified on that page, and usually omitted from
the coverage: *"M3 Expressive isn't a new version of the system. We're not deprecating M3, and this
isn't 'M4.'"* The "52% (55–64) to 87% (18–24)" preference spread is widely quoted but lives on
design.google, not this page — **treat it as second-hand**.

**How it was judged.** The most substantive thing any vendor published in this period, with two
caveats. "Spot the element 4× faster" is a *salience* result, and salience is zero-sum: if everything
is expressive, nothing is found faster. The finding argues for one loud element per screen — the same
advice this corpus gives about accent colour. And it did not cross to the web (see the npm caveat).

**The counterexample that matters more.** Duolingo — the most successful expressive consumer product
of the decade — did nothing here. Its 2026 identity is its 2021 identity: green owl, flat 2D
characters with no gradients, ALL-CAPS labels, the chunky button with a hard 4px bottom edge. It
never went flat, so it had nothing to un-flatten. Notion went the other way and got *more* austere.

**What a designer should take.** Expressiveness is an archetype decision, not an era. 2024–26 did not
make interfaces more expressive; it widened the *spread*. Airbnb and Google moved toward dimension
and play; Linear, Vercel, Notion and GitHub moved further toward neutral monochrome with one accent.
Both got more confident. Picking the middle is the only losing move, and the middle is exactly where
generated UI lands.

### Decision 7 — How much retraining you may charge

**Arc.** Development stopped 2025-05-27 to build Dia; Atlassian bought the company for ~$610M.
Miller: *"for most people, Arc was simply too different, with too many new things to learn, for too
little reward."* Arc's ideas were good enough that Dia re-added them selectively — sidebar mode,
vertical tabs, pinned tabs — while dropping Spaces, Boosts, Easels and the ⌘T command bar. The
novelty wasn't wrong; the *quantity of simultaneous novelty* was.

**Slack** charged retraining for a navigation layer whose benefit accrued to Slack, not the user.
**Figma UI3** charged retraining for a canvas gain professionals experienced as a canvas loss.

**What a designer should take.** Before a re-layout, write the user-visible benefit in one sentence
containing a verb the user cares about. "Unifies our design language across five products" is a
sentence about you. "You can now see the full board without collapsing the sidebar" is about them. If
you cannot write the second sentence, ship behind a preference and let adoption tell you — *if* your
product is self-serve. In an administered rollout a preference is the more expensive option; see
[When this advice is wrong](#when-this-advice-is-wrong).

### Decision 8 — Density

Here the trend narrative and the measurements disagree, so measure.

The 2026 story — repeated in a dozen articles and a Config 2026 session title, *Dense by Design* — is
that minimalism went too far and dense UI is returning, with Linear, Notion, Superhuman and Stripe as
exemplars. What the numbers say:

- **GitHub's file row got *taller*: 41px today, from 38px in the 2021 and 2023 captures.** Body type
  has been 14px/21px across all three, through a typeface swap (system stack → `Mona Sans VF`) and a
  token rewrite (1,991 root custom properties).
- **Linear's issue row is 40px** — one pixel *shorter* than GitHub's file row. The two products cited
  as opposite poles of the density argument ship list rows within a pixel of each other. Linear's
  density is real but it lives elsewhere: **13px text inside that 40px row** (GitHub uses 14px), and
  a **28px sidebar nav row** against GitHub's 30px tabs. Density is text size and chrome, not row
  height.
- **Stripe still ships two body sizes for two reading modes** — 16/26 for guides, 14/18.2 for the API
  reference — a 2019-era decision, unchanged (see [`developer-platforms.md`](developer-platforms.md)).

So: density did not return. **The prestige of density returned.** The products that were dense stayed
dense and became fashionable; the airy ones stayed airy. What genuinely changed is that dense is no
longer read as "enterprise" and therefore ugly — which matters, because you can now ship a 13px table
without a stakeholder asking for more breathing room. A shift in permission, not in practice.

The one place density genuinely increased is the **agent receipt**: collapsed multi-line tool output
into one line (`Worked for 4m 13s +25 −131`). That is new, and it is dense because the alternative is
a transcript.

---

## What is genuinely shifting

Ranked by weight of evidence, strongest first.

**1. The agent as a first-class object in the product's own vocabulary.** Not "AI features" —
assignee, nav peer, rail destination. A structural change in what the object model contains,
happening everywhere at once.

**2. Model provenance in the chrome.** `Opus 5` as a chip in a title bar. Two years ago no product
surfaced this. Expect it to become as standard as an author avatar.

**3. Elevation as an enumerated, semantic, very-low-alpha system.** Geist Materials, Apple's
Materials, Fluent's four materials — three independently-built systems with the same shape: a small
closed set, named by use, defined once. The flat era's contribution (no gratuitous skeuomorphism)
survived; its overcorrection (no depth cues at all) did not.

**4. Variable fonts as the default, quietly.** `Inter Variable`, `Mona Sans VF`, `Airbnb Cereal VF`,
`Geist Sans` — none exposing an axis slider or animating weight. The win is prosaic: one file,
arbitrary weights, so a system can specify **weight 510** instead of rounding to 500.

**5. The reduced-motion path as a different asset, not a disabled animation.** Airbnb ships a
different DOM at 1/29th the bytes.

**6. Design systems bifurcating into product and brand.** Primer splits `Product UI` / `Brand UI`
with a separate Brand Toolkit; Geist runs six brand identities off one component library and ships
`--geist-radius: 6px` against `--geist-marketing-radius: 8px`. The split reaches the radius token.

## What is fashion and will date badly

**Liquid Glass as a *look* to imitate on the web.** Apple didn't do it on apple.com; Microsoft
retreated from persistent transparency years ago. The glass in Apple's OS does a job — signalling a
floating functional layer over live content, with luminosity adaptation and a 35% dimmer the CSS
version doesn't have. Over a mesh gradient it is 2021 glassmorphism with better PR.

**The bouncy-3D-icon set.** Airbnb's work because Airbnb has three product lines, a once-a-quarter
user, and a brand budget. The imitations are already a genre, which is the reliable sign of a
two-year trend.

**"Dense is back" as a styling instruction.** Density is a function of session length and expertise.
A 13px table in a consumer signup flow makes it worse.

**Expressive shape-and-spring as a default.** M3E's own research supports *contrast*. A whole
interface of squishy shapes converges on one look, which is what happened to neumorphism in 2020.

**Bento grids.** In every 2026 trend list, in almost no shipped product UI. A marketing-page layout
mistaken for an interface pattern.

## What has been stable for a decade and probably will remain

The least-written-about category and the most useful, because it is where an agent's defaults live.

- **14px/21px is the dense-product body size.** GitHub has shipped exactly this since at least 2021
  through two typeface changes and a full token rewrite. Stripe's API reference sits at 14/22.
  Airbnb's body is 14/20.
- **16px/24–26px is the reading body size.** Stripe guides 16/26, Linear marketing 16/24, Cloudflare
  16/28.
- **A 1px hairline, not a shadow, separates a fixed header from content.** True in the docs
  measurements from 2019 and in every header measured this week.
- **Radius ladders have three or four stops, and the small one is 4–8px.** Geist 6/12/16. Axiom 4
  (2 for tooltips). ChatGPT 4/6/10/14/20/28. Products that look designed pick few values; the values
  themselves vary.
- **Pills for actions, rectangles for containers.** Linear's most common radius is `9999px` across 76
  elements — every button — while panels sit at 8–12px. Apple's is `980px` on buttons, 5px elsewhere.
  This split survived flat, neu-flat, and glass.
- **Body text is never pure black or pure white.** Linear `#f7f8f8` on `#08090a`. GitHub
  `rgb(31,35,40)`. Stripe `rgb(60,66,87)`. Ten years of this — outside high-ambient-light and
  low-vision contexts, where it inverts.
- **Three text tiers, three border tiers, three surface tiers.** ChatGPT, Axiom, Linear, Primer all
  land here independently. Nobody who ships well uses seven.
- **Left sidebar 232–320px; right TOC 224–288px; header 52–64px.** Measured across a dozen docs and
  app shells across multiple years (Linear 232, Stripe 280, Polaris 284, Sentry 300, Grafana 319;
  docs sites cluster 280–300).
- **Hover on a dense row is a background change and nothing else.** No border, no shadow, no
  transform, no height change. Linear does it at ~2% alpha (`#ffffff05`) with **no `transition`
  declared at all** — instant, not eased.
- **`⌘K` opens the command palette; `/` focuses search; `Esc` dismisses.** Stable. The
  "keyboard-first goes mainstream" narrative is half right — palettes spread to consumer products,
  but the full keyboard contract (a documented shortcut for every action, focus rings that survive,
  an `Esc` that means one thing) is still rare outside the productivity archetype.
- **Real content beats layout craft.** Every product here that reads as designed puts its own nouns
  in its own screenshots. Airbnb's are real listings; Linear's are real issue titles (`ENG-2298 Add
  granular project permissions`); Spotify's are real albums. Oldest rule in the corpus; nothing in
  three years of redesigns touched it.

**And one non-change worth naming.** X/Twitter is often cited as a design-decline case study. It
could not be included on measured terms: loading `x.com` logged out at 1440 rendered a blank white
document. That *is* the finding — the interface is no longer publicly observable — but "it got worse"
is a claim about moderation and feed quality, not interface craft. Reddit blocked automated access
outright. Treat any confident claim about either product's design trajectory, including this file's,
as unverified.

---

## When this advice is wrong

Each of these is a real product where following a rule above produces a worse interface.

**1. A frame-accurate media QC tool breaks Rule 1 and the `backdrop-filter` self-check.** A post-house
subtitle/colour QC app floats a scrubber, safe-area guides, waveform scopes and a burn-in timecode
*over the frame*, translucent, persistently, in the content layer — because the job is judging the
frame, and any opaque chrome hides the pixels under review. The same is true of a DAW's playhead
overlay and a radiology viewer's measurement layer. **Scope:** "glass only on floating chrome" is a
rule about surfaces you *read*. When the content underneath must stay visible *as the task*,
content-layer translucency is correct — and it is correct persistently, not transiently. Apple's own
carve-out for video controls is the small version of this. Count stacked blurred layers, not
`backdrop-filter` declarations.

**2. An ICU vitals wall-display breaks Rules 2 and the stability list.** On a 55" panel read from 3–4
metres under 1000-lux hospital lighting, a 6%-alpha shadow and an 8%-alpha ring are invisible; a 2%
hover fill is invisible; `#f7f8f8` on `#08090a` throws away contrast the room already eats; and a
40px row with 13px text is unreadable. The correct build is 1–2px solid high-contrast borders, pure
white on true black, 24px+ type, and state changes carried by colour *and* shape, never by a fill
delta. **Scope:** the elevation ceiling, the near-black/near-white rule and the low-alpha hover rule
all assume an arm's-length screen in office light. Add ambient light and viewing distance to the
archetype decision, not just session length. Same correction applies to outdoor kiosks, warehouse
scanners and vehicle HMIs.

**3. A 40,000-seat procurement/ERP rollout breaks Rule 4's escape hatch.** "If you cannot write the
user benefit, ship the change behind a preference" is right for self-serve products and wrong for
administered ones. Two live layouts in a regulated enterprise means two training decks, two support
runbooks, two sets of validated screenshots for audit, and a help desk that cannot reproduce the
caller's screen. Here the cheaper path is the one Slack and Figma took — a dated, mandatory
migration with training — even though the benefit accrues to the vendor. **Scope:** the preference
hatch assumes low support cost per user and no compliance surface. Where either is false, forced
migration on a scheduled date beats a permanent fork.

**4. A once-a-year consumer flow inverts the density advice.** Tax filing, benefits enrollment,
probate forms: a high-anxiety task performed once a year, often on a shared laptop by someone over
60. 40px rows and 13px text is the wrong answer; so is "generated UI is 30–40% too airy." **Scope:**
that multiplier is calibrated on tools used daily by experts. For rare, high-stakes, low-expertise
flows, airy *is* the decision — 16px+ body, one question per screen, generous targets.

Also still true:

- **"Enumerate a small elevation set" is wrong for a canvas or design tool** where objects have
  genuine z-order the user controls. Figma, Miro and slide editors need continuous elevation because
  the user is authoring it.
- **"Agent as a first-class object" is wrong when the agent is a one-shot utility.** A "summarise
  this" button does not need an inbox, a status, or a receipt. The pattern earns its cost only when
  runs are long, concurrent, or reviewable.
- **"Price the novelty" is wrong for a product with no incumbent behaviour to disrupt.** Arc's lesson
  is about *migrating* users. A new-category product should be as different as its idea requires.
- **All of this is Western-desktop-biased.** Every measurement here is 1440×900 Latin-script Chrome
  on macOS. Density rules invert for CJK (glyph complexity needs more line-height at the same size),
  and the 14px floor is unsafe for Devanagari and Thai.

---

## The generated version

Asked to "make it modern" or "apply current design trends," an agent produces a recognisable
artifact. What it does, and what to do instead.

| The generated move | Why it happens | The correction |
|---|---|---|
| `backdrop-filter: blur(20px)` on cards over a purple-blue mesh gradient | "Liquid Glass" and "glassmorphism" are the highest-frequency tokens in 2025–26 design writing | Glass on **one** floating chrome layer over **opaque** content. If the background isn't real content or real media, there's nothing to see through — use a flat surface. |
| `box-shadow: 0 10px 25px rgba(0,0,0,0.1)` on everything | It's the Tailwind-adjacent default and reads as "elevation" | Ring plus stacked micro-shadows, max 6% alpha: `0 0 0 1px #00000014, 0 2px 2px #0000000a, 0 8px 16px -4px #0000000a`. Name it by use. |
| An AI chat drawer on the right with a sparkle icon | Cheapest thing that reads as "has AI" | Make the agent an object your system already understands — assignee, author, nav peer — or put it inline in the artifact. Name the model in a chip. End runs with a receipt, not a spinner. |
| 3D clay icons or an iridescent hero render | "Flat is dead" reduced to a texture | Ask what the icon disambiguates. Airbnb's separate product lines for an infrequent user, at 543,700 bytes. If yours label a settings page, ship a 1KB SVG. |
| Every surface at 24px padding, 32px gaps, 18px body | Airiness is safe and nobody complains about it in a screenshot | Pick the archetype's density first: Work = 28–40px rows, 13–14px text; Scan = 36–44px, 14px; Glance = 48–64px, 15–16px (see [`../craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md)). Daily-use tools are typically 30–40% too airy as generated; annual consumer flows are not. |
| A floating bottom-centre toolbar in a workspace app | Read as modern in Figma UI3 screenshots | Dock chrome in surfaces people inhabit. Float it only in surfaces people visit. Occlusion compounds with session length. |
| "Bento grid" of feature cards | Every 2026 trend article shows one | A marketing-page layout. In product UI it is card soup with better alignment. |
| A `shadow-xs … shadow-2xl` scale, all steps used somewhere | Component libraries ship the whole ramp | Three elevations, named by use. If a designer can pick the prettiest one, the system isn't one. |
| Motion everywhere, `prefers-reduced-motion` unhandled or `animation: none` | Reduced motion treated as a CSS afterthought | Ship a cheaper path, not a frozen one. Airbnb swaps 543,700 B of `<video>` for 18,640 B of AVIF `<img>`. |
| The word "AI" in the H1 and nothing structural behind it | Headlines are easier than object models | Slack's and Linear's headlines earned it by changing the object model. If yours hasn't, don't claim it. |

---

## Self-check

Verifiable against your own output.

1. **Count stacked blurred layers, not `backdrop-filter` rules.** One blurred sticky header repeated
   across sixteen sections is fine (Airbnb ships 16 declarations, GitHub 6). A blurred card inside a
   blurred panel is not. Any blur inside a content card, on a reading surface? Remove it.
2. **Grep every `box-shadow`. What is the highest alpha?** Above `0.08`, justify it or lower it. Any
   shadow without a companion 1px ring on the same element?
3. **How many distinct `box-shadow` values ship?** More than four means a menu, not a system. Can you
   name each by *use* (`menu`, `modal`, `tooltip`)? Two generations of shadow live at once means a
   migration you haven't finished — even Vercel has this.
4. **How many distinct border-radius values ship?** More than four is a smell; buttons pill-or-single,
   containers one or two.
5. **Screenshot at 1440 and measure your densest repeated row.** Work 28–40px, Scan 36–44px, Glance
   48–64px. Then check the *text size inside it* — that is where density actually lives.
6. **Set `prefers-reduced-motion: reduce` and reload with the network panel open.** Did bytes
   actually drop, or did the same assets load and sit still?
7. **If there is an AI surface:** can it be assigned, filtered, linked, or notified by the rest of
   your product? Does a finished run collapse to one line with elapsed time? Is the model named?
8. **If you changed an existing layout:** write the user-visible benefit in one sentence with a verb
   the user cares about. If the sentence is about your architecture, ship behind a preference —
   unless your rollout is administered, in which case pick a date.
9. **Load a competitor's live page beside yours and diff three numbers:** body size/line-height, row
   height, largest shadow alpha. Three concrete differences beats any judgement of "does this look
   good."
10. **Check your body colour and your room.** Pure `#000`/`#fff` on body text means nobody looked —
    unless the screen is read at distance or in bright light, where it is the right answer.
11. **Check your fonts.** Four static weights of one family → ship the variable file.
12. **Search your CSS for a value that appears exactly once.** That is where the system broke.

---

## Sources

Screenshots at 1440×900 and 390 on 2026-09-09/10 with `tools/shot.mjs` and opened as images;
measurements taken with Playwright against the live DOM in the same session; byte weights from the
browser's own network log (over-the-wire, content-negotiated).

Measured live: `linear.app` + `/agents`, `www.apple.com`, `vercel.com/geist/materials`,
`github.com/vercel/next.js`, `www.airbnb.com` (normal and `prefers-reduced-motion: reduce`),
`m3.material.io/blog/building-with-m3-expressive`. Every number in the tables above came from one of
these in this session; the Airbnb 2023 comparison from `web.archive.org/web/20230301…/airbnb.com` and
the GitHub 38px figures from 2021-06 / 2023-06 captures, **not re-verified in the 2026-09 pass**.

Read, not measured: `developer.apple.com/…/materials` (content-layer, sparingly, regular-vs-clear,
35% dimmer), `nngroup.com/articles/liquid-glass/`, `fluent2.microsoft.design` (solid / mica / acrylic
/ smoke, Acrylic transient-only), `primer.style`, `news.airbnb.com` (2026-05-20 release), a year of
Figma Forum UI3 threads, and the headlines and illustration language on `slack.com`, `figma.com`,
`notion.com/product/agents`, `duolingo.com`, `diabrowser.com`, `open.spotify.com`,
`docs.stripe.com`. npm counts from `api.npmjs.org/downloads/point/last-week/<pkg>`, all ten re-pulled
2026-09-10.

`x.com` rendered a blank document logged out; `reddit.com` returned "You've been blocked by network
security." Both excluded from measured claims.

**Related files:** [`apple-and-craft-standard.md`](apple-and-craft-standard.md) ·
[`ai-native-products.md`](ai-native-products.md) ·
[`keyboard-first-productivity.md`](keyboard-first-productivity.md) ·
[`developer-platforms.md`](developer-platforms.md) ·
[`../craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md) ·
[`../libraries/design-tokens-and-handoff.md`](../libraries/design-tokens-and-handoff.md) ·
[`../anti-patterns/vibecode-rubric.md`](../anti-patterns/vibecode-rubric.md).

---

## Review pass (2026-09)

Adversarial review, 2026-09-10. Every measurement below was re-taken live; nothing was carried over
on trust.

### Re-verified and correct

- **All ten npm weekly-download figures**, re-pulled 2026-09-10, exact to the digit.
- **apple.com**: 2 `backdrop-filter` elements, `saturate(1.8) blur(20px)` over `rgba(250,250,252,0.8)`.
- **linear.app**: 3 `backdrop-filter`, 419 root custom properties, `9999px` × 76, 16/24
  `Inter Variable`, `#f7f8f8` on `#08090a`.
- **github.com**: 41px file rows, 14/21 `Mona Sans VF`, 1,991 root custom properties.
- **Geist Materials**: eight named presets, exact shadow stacks, 6/12/16 radius ladder, max alpha
  `#0000000f` (5.9%), zero `backdrop-filter` on the page.
- **Airbnb**: `prefers-reduced-motion` swaps 8 `<video>` for 8 `<img>`; six of the byte weights
  matched the file exactly.
- **M3E**: date, "46 studies with more than 18,000 participants" and "up to four times faster" are
  verbatim on the live page.

### Corrected

| Was | Now | Why |
|---|---|---|
| "Linear is at 28px rows / 13px text" | Issue row **40px**/13px; sidebar nav row **28px** | 28px is the *sidebar* row per [`keyboard-first-productivity.md`](keyboard-first-productivity.md); the issue row is 40px per [`../craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md). Two numbers for one thing across three files. It also improves the argument: Linear 40px vs GitHub 41px means the two poles of the density debate ship near-identical rows, and Linear's density is text size and chrome, not row height |
| Airbnb assets "roughly half a megabyte" | **543,700 B**, all eight weights listed | Measured over the wire |
| Reduced-motion path described but not costed | **18,640 B** AVIF, **29× lighter** | The strongest single fact in the file was missing its number |
| "Geist lists seven brand identities" | **six** (Vercel, Next.js, Turbo, v0, eve, AI SDK) | Counted in the live sidebar; the file listed six and said seven |
| "Maximum shadow alpha is 6%" (stated as a Vercel rule) | 6% is the **Materials** ceiling; vercel.com also ships `--shadow-small`/`--shadow-large` at **12%** | Even the exemplar runs two shadow generations at once |
| Linear radius "12px × 25" | `12px` × 18, with `50%` × 28 between it and `8px` × 31 | Re-counted |
| "Worked for 10 sec ▸" | "Worked for 8 sec ▸" | Read off the live page; the model name is a bordered **chip**, not a `·`-separated string |
| Linear hover "2% alpha over 100ms" | ~2% (`#ffffff05`) with **no `transition` declared** | `keyboard-first-productivity.md` measured it as instant |
| "Left sidebar 240–300px; header 53–64px" | **232–320px**; **52–64px** | The old range excluded Linear (232) and Grafana (319); Discourse's header is 52 |
| npm table read as "nobody adopted M3E" | Scoped: npm measures **web** adoption; M3E's surface is Android | The original inference over-reached its instrument |
| 52–87% preference spread cited as if on the M3E page | Marked second-hand (it lives on design.google) | Not present on the page the file cites |
| GitHub 38 → 38 → 41px presented as uniformly measured | 41px re-verified live; the two Wayback figures flagged as not re-verified | Honest provenance on the file's load-bearing density claim |

### Added from looking

- **Geist's own "Don't stack two Materials on the same element"** — the rule the eight presets exist
  to enforce, and the one generated UI breaks first.
- **`--geist-radius: 6px` vs `--geist-marketing-radius: 8px`** — the product/brand split reaches the
  radius token, which is a sharper example than the brand-list bullet it sits next to.
- **Airbnb's selected tab is three signals** — different asset *plus* a 2px underline *plus* a
  weight/colour shift. The expensive iconography was added on top of the cheap affordances, not
  instead of them.
- **airbnb.com ships 16 `backdrop-filter` elements and github.com 6.** Both are well-crafted. The old
  self-check ("more than two or three means you are decorating") would have flagged both, so the
  check now counts *stacked* blurred layers instead of declarations.
- **The `All`/globe tab is a later asset generation** than the other three (served from
  `/search-bar-icons/unified/webm/`), and there is a **2026 Summer Release** (2026-05-20) the file did
  not mention — so the nav being described is not purely the 2025 release.
- **M3E's own "this isn't M4, we're not deprecating M3"** — the vendor is more modest than the trend
  coverage the file was arguing against.

### Adversarial tests

Four realistic products where the file's own rules made the interface worse are now written up in
[When this advice is wrong](#when-this-advice-is-wrong): a frame-accurate media QC tool (content-layer
translucency is correct and persistent), an ICU vitals wall-display (6% shadows, 2% hover and
near-white-on-near-black are all invisible at distance in bright light), a 40,000-seat administered
ERP rollout (the "ship it behind a preference" hatch is the expensive option), and a once-a-year
consumer flow (the 30–40%-too-airy multiplier is calibrated on daily tools and inverts here). Each
rule in the file now carries its scope inline rather than only in the exceptions section.

### Cut

The preamble's second paragraph and its "one-third true each" tease; per-decision "stated rationale
vs. likely real one" blocks where the speculation changed no decision; the fifth trend bullet's
restatement of Decision 5; and roughly two-thirds of the Sources section, which restated measurements
already in the tables above it. Net: shorter file, more numbers.

### Still unverified

The 2021/2023 GitHub Wayback row heights; the Slack 17% poll (self-selected, no methodology); the
M3E age-band preference spread; anything about X/Twitter or Reddit, both of which block measurement.
