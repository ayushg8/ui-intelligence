# institutional-civic

**Evaluated:** 2026-09 · **Density:** spacious · **Dark by default:** no — and not as an option inside a service either. Every one of the six government systems measured ships light-only for transactional surfaces; SGDS has a dark toggle on its *documentation* site and none in its service templates. The reasons are structural: these pages are printed and attached to appeals, photographed and sent to a caseworker, read in daylight on a cracked phone, and rendered by a user stylesheet or Windows High Contrast. A dark ground survives none of that, and a theme toggle is one more decision on a screen that is supposed to have exactly one.

> Someone who did not choose to be here — and cannot go anywhere else — is trying to complete a transaction, possibly for the only time in their life, with an institution that has power over them.

## When this is the right archetype

The users are *the public*: not a segment, not a persona, everyone. Frequency is once a year to once a lifetime, so nothing can be learned, onboarded or discovered — every visit is a first visit. Expertise is zero and cannot be assumed. There is no competitor, so satisfaction is irrelevant and completion is everything. And the stakes are one-directional and administrative: a denied claim, a missed statutory deadline, a benefit that does not arrive, a licence that expires. The test from [`../references/institutional-health-civic.md`](../references/institutional-health-civic.md): **if the user's own competence is not a precondition of success — if this has to work at 3am on a five-year-old Android for someone with 20% vision and a second language — you are here.** In many jurisdictions the accessibility floor is a statute, not a target, which changes contrast and focus from preferences into requirements.

- **Choose this over `fintech-consumer`** when the user cannot leave. Warmth is reassurance when someone chose you and suspicion when they didn't — an illustrated mascot on a disability-benefit form reads as an institution being cute about your rent.
- **Choose this over `enterprise-dense` / `internal-utility`** when the users are the public and not the staff. The *same agency's* caseworker console is a different archetype. GOV.UK says this in writing: one-thing-per-page is wrong "if you're designing an internal service for government users who need to repeat and switch between tasks quickly."
- **Choose this over `premium-marketing`** for the service and not for the agency's brochure. SGDS's own homepage is 3D illustration, a purple gradient and a dark-mode toggle — correct for a site persuading developers to adopt a system, and it is not this archetype.

## When it is the wrong one

Each of these looks like a match — public-serving, statutory language, an audit trail — and each breaks on a specific number.

**Vanta, Drata, Secureframe and compliance/regtech SaaS generally.** Fits on tone: controls, evidence, an auditor as the real reader. Breaks on frequency — an analyst works a queue of two hundred controls all day, and 19px body, 46px rows and one question per page costs them hours a week. `enterprise-dense`, with this archetype's copy discipline borrowed. Institutional *tone* is compatible with compact density; institutional *density* is not.

**TurboTax, H&R Block and the immigration-form startups.** Fits on subject matter — it is literally a government form. Breaks on volition: the user paid, chose it over the free route, and can leave, which makes speed, save-and-resume and confidence the product. `premium-minimal` or `fintech-consumer` hosts; what you borrow from here is the copy register and the error machinery, not the 630px column.

**Epic, and any adjudication console at the agency whose public form you just built.** Fits on stakes, and it shares your tokens. Breaks on repetition: one-question-per-page inverts — group the fields, make the heading a statement, put the whole record on one screen. GOV.UK bans its own rule here in writing. (Epic's 404 is `"Ope!"` at 128px w600 over a cartoon cow, which is a separate lesson.)

**A university, hospital or foundation site — admissions, donations, recruiting.** Fits on the institution. Breaks on the fact that every one of those pages is persuasion with a competitor one tab away. Apply this archetype and you ship a brochure that reads as a benefits denial.

**A crypto exchange, neobank or AI startup wearing square corners for trust.** Fits in a screenshot and nowhere else. The credibility here is the error summary, the no-JS submit, the 9.03:1 secondary tier and the styled visited link — none of which are in the screenshot being imitated.

**Anything with an engagement metric.** No retention loop, no streak, no empty-state upsell. If a PM wants time-on-page up, you are not here; the goal is a shorter session.

## Not its neighbours

Two archetypes land within noise of this one on the numbers, and the numbers are not where the difference lives.

| | **institutional-civic** | `editorial` | `healthcare-clinical` *(patient surface)* |
|---|---|---|---|
| Body | **19/25** — identical at 390 and 1440 | 17–20px, leading 1.4–1.5 | 19/25 → 16/20 |
| Measure | **630px** two-thirds column, 50–90 chars | 620–740px, 55–65ch | 45–65ex |
| Row height | **46–47px** task-list rows | 88–112px index rows | 56–64px |
| Control height | **40px** input · 38+2px button | 36–40px, ~3 controls on the page | 56px button |
| Radius | **0–4px**, and 0 ships | 2–4px controls, 0 on content | 0–4px patient / 3–5px clinician |
| Elevation | none | none in the reading column | hairline ring, then shadow |
| Motion | **100 / 200ms**, disclosure only | 120 / 160–200ms, text never moves | 50 / 200ms |

**This archetype shares its type scale, measure, radius and elevation with `editorial`; the difference lives in what the page is for, and therefore in what it ships.** Editorial's page rewards staying, this one rewards leaving, and three things flip — none of them a size. The `h1` is a *question* bound to a form control by a single string, not a title. The link system is load-bearing: visited styled at 9.06:1, and the primary button deliberately not the accent hue, so a link and a commit can never be confused. And the whole failure apparatus — error summary, anchor links, no-JS submit, check-answers page — exists here and has nothing to attach to there. Leading is the cheapest tell: editorial's 1.4–1.5 is calibrated for a return sweep across 60ch of continuous prose, **19/25 = 1.32** for a one-sentence hint. Test: delete every control from the page; if it is still worth reading, it was editorial.

**It shares the entire patient surface with `healthcare-clinical` — that file says so in writing** ("the patient surface of this archetype *is* essentially `institutional-civic`"), and both cite the same NHS and GOV.UK measurements. **The difference lives one tier above error, and in the second population.** Clinical carries a severity level this archetype does not have — an emergency card that *inverts* its body to `#212b32` white-on-dark, and a budget of ≤2 persistent and ≤1 interruptive alert per screen. Here the top severity is "There is a problem" at 24/30 in **black**, and nothing outranks it. Clinical also has to make one fact survive two surfaces — 14/21 with 43px rows for the clinician, 19/25 for the patient — where this archetype has exactly one surface and no professional reader. The moment a staff console shares your tokens, clinical or `enterprise-dense` is the host and this archetype is the guest in the public pane.

Ask what the worst outcome is: a missed appeal deadline is here, a wrong dose is clinical, a closed tab is editorial.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **GOV.UK** *(re-probed 2026-09: govuk-frontend **6.1.0** on www.gov.uk, **6.5.0** on the design system)* | The most research-backed transactional system in existence, and it publishes the reasoning and the failed experiments | The `<h1>` is nested **inside** the `<legend>` at 36/40 w700 — one element, two roles, so the question, the page title and the error string cannot drift apart |
| **NHS digital service manual** *(nhsuk-frontend 10.6.1)* | Severity hierarchy driven by clinical safety review | Urgent and Emergency care cards share the **same red** `#d5281b`; the escalation is that the emergency card's *body* inverts to `#212b32` with white text. No icon anywhere in the component |
| **USWDS v3.14.0** | The US federal baseline that agencies fork | Five alert severities are a pale wash with an 8px saturated left bar — except `emergency`, a solid `#9C3D10` fill. Only the top tier changes *kind* |
| **IRS / Direct File** | The federal provenance convention | The first ~32px of every page is spent on "An official website of the United States government · Here's how you know" — identity before brand, because impersonation is the threat model |
| **Service Canada / GC Design System** *(canada.ca)* | The only system here that solves statutory bilingualism | The 404 renders **both languages stacked at identical size and weight**, because you cannot know which language the dead URL was in. And a 20px body — 25% above the SaaS default |
| **Singapore Government Design System** *(the one to look up — re-probed 2026-09, **696** `--sgds-*` tokens)* | Proof the archetype has a *range*: a civic system calibrated for authenticated app-shaped services, not for content | Body **16/24 Inter**, radius scale `0·2·4·8·12·16·24·32·999`, `--sgds-text-max-width: 864px`, and a focus outline that is `2px solid` with a **negative offset** so the ring lands *inside* the control and never gets clipped |
| **VA.gov Design System** *(the other one)* | Patterns named as user goals rather than components | The taxonomy `Ask users for… / Help users to…`, a `USE: DEPLOYED / CANDIDATE / DEPRECATED` badge on every pattern, and a public **Deprecated** shelf that currently holds "Wizard" |
| **Login.gov** *(observed mid-maintenance)* | The best down page in the set | Static HTML on the brand navy, two sentences, one link to a status page, and **no retry button** that would only fail again |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **19px/25** (GOV.UK, re-measured at 1440 **and 390** — the number does not move) · **20px/32** (GCDS, measured on canada.ca) · **16px/24** (SGDS, NHS mobile) | The split is real and it is about surface, not taste: content-led services that must be readable cold run 19–20px; authenticated app-shaped services with returning users run 16–17px. Below 16px, do not ship — the median user of a benefits service is not 25 with a Retina display. |
| Dense/secondary text | **16px** (`govuk-body-s`), colour `#484949` = **9.03:1** | The weakest text tier in this archetype still passes AA *as body text*. There is no 2.5:1 "subtle" grey anywhere in any system measured, because subtle is a synonym for invisible to a 70-year-old in glare. |
| Page title | **Two scales, and picking the wrong one is the commonest error here.** A content or guidance page runs `heading-xl` **48/50 w700** → **32/35** at 390 (measured, www.gov.uk). A *question* page runs `heading-l` **36/40 w700** → **27/30** (measured, design-system full-page example) — smaller, because the `h1` is the `<legend>` and sits above a field rather than opening a document. GCDS tokens: h1 41px, h2 39px | Line-height *tightens* as size grows: 19/25 = 1.32, 36/40 = 1.11, 48/50 = **1.04**. And the top of the scale is compressed — GCDS's h1 and h2 are 2px apart — because hierarchy comes from position and the rule under the h1, not from a size ratio. A 48px question page is already one step too loud. |
| Row / list-item height | **46–47px** task-list rows (`padding: 10px 0`, whole row clickable, `1px #cecece` rule) — **76px** when the row carries a hint, because the padding is fixed and the content sets the height. Summary-list rows likewise | These are read once and tapped once. A 32px row saves nothing when the page holds eight items, and costs a mis-tap when the user is on a bus. |
| Control height | Input **40px** (`2px solid #0b0c0c`, `radius: 0`, `padding: 5–6px`) · Button **38px + 2px shadow = 40px** (GOV.UK, `#0f7a52`, 19/19 w400) · **56px** (NHS) · `--sgds-form-height-xl: 48px` | The near-black 2px input border is the single most counter-cultural number here: the field is a box you write in, not a tinted card. `#E5E7EB` at 1.2:1 is a decoration, not an edge. |
| Sidebar width | **None** inside a transactional flow. **240–280px** on guidance and manual sites only | A service has no persistent nav because there is nowhere else to go — the only navigation controls are Back and Continue. Persistent chrome invites wandering out of a half-finished application. |
| Content max-width | **630px** form column inside a **960px** `main` (GOV.UK at 1440, re-measured) · `--sgds-text-max-width: 864px` · CMS `--measure-base: 65ex` | Two-thirds of the grid, not centred in the viewport — the column starts where the masthead starts, so the eye returns to one left edge. Target 50–90 characters. The **748px** in [`../craft/forms-craft.md`](../craft/forms-craft.md) is the same two-thirds rule measured inside the design system's 809px example iframe, not a wider column; a service page ships 630. |
| Radius (control / container) | **0–4px.** GOV.UK inputs and buttons `0`; the tag `1px`; NHS button `4px`; CMS `2/3/4/8`; SGDS offers up to 32 and its service templates use `0–8` | Zero is a legitimate, shipped answer here and nowhere else in this corpus. Above 8px on a form control the page starts reading as an app, and "app" is the wrong promise for a statutory record. |
| Border weight & colour | Inputs **2px near-black** (`#0b0c0c` · `#262626` · `#4c6272`). Dividers **1px `#cecece` = 1.57:1** | The divider colour fails text contrast by a factor of three, which is exactly why it may never be used for text, an icon, or anything a user has to perceive. Two separate roles, two separate tokens, no overlap. |
| Elevation | **None.** Zero shadow tokens on a form page | Nothing on a question page floats, because nothing is above anything. Shadows appear only where a real overlay is unavoidable, and in this archetype an overlay is usually a page you should have routed to instead. |
| Motion (micro / standard) | **100ms / 200ms** (SGDS ships `.1s/.2s/.3s/.4s/.5s`, re-probed; Nord `0.05s/0.2s`) | 100 rather than `editorial`'s 120 because the only thing that animates here is a disclosure the user opens once: at ≤100ms it reads as a state change rather than as an animation, which is the register wanted. Cap at 200ms. The frequency argument runs backwards here — see the motion budget. |
| Spacing base | **5px** on GOV.UK (`0·5·10·15·20·25·30·40·50·60`); **8px** on USWDS and SGDS | The most-used government design system on earth is not on an 8px grid, and its vertical rhythm is a property of the *type class* (`margin-bottom` ships with `heading-l`), not a per-instance choice. Pick one base and bind spacing to type. |
| Focus indicator | `box-shadow: 0 -2px 0 #FFDD00, 0 4px 0 #0B0C0C` + `outline: 3px solid transparent` — a **yellow block**, 14.55:1 | A filled block survives a coloured header, a photo, a user stylesheet and forced-colors mode; the transparent outline becomes a real one in Windows High Contrast. `focus:ring-2 ring-blue-500` is 3.68:1 and, when the accent is also the link colour, a focused link and an unfocused link look identical. |

## Colour

**The neutral ramp is short, near-achromatic, and anchored on a near-black.** `#0b0c0c` (19.59:1), `#212b32` (14.42:1), `#1a1a1a` (17.40:1), `#1b1b1b`. Four to six steps is enough — page, divider, secondary text, text — because there is no elevation system to support. Chroma is at or near zero; the warm-neutral advice in [`../system/3-tokens.md`](../system/3-tokens.md) is the one default this archetype overrides, since a warm cast reads as editorial and the register wanted is *record*.

**The accent is the link colour, and links are the primary interaction.** `#1a65a6` (6.08:1), `#005eb8` (6.38:1), `#1f497a` (9.16:1). The drift tells you everything about how these values get chosen: GOV.UK's link darkened from `#1d70b8` (5.17:1) to `#1a65a6` (6.08:1) and its error red from `#d4351c` (4.86:1) to `#ca3535` (5.16:1) between major versions. Nobody made those changes for aesthetics.

**Style visited links.** `#54319f` at 9.06:1. This is the only archetype where visited-link colour is functional rather than vestigial: someone navigating a 400,000-page information space once needs to know which branches they already tried.

**The primary button is deliberately *not* the accent.** GOV.UK: blue links, `#0F7A52` green button. HealthCare.gov: `#034866` headings, `#12890E` button. Decoupling "go" from the brand hue means the call to action cannot be confused with a link, and there is exactly one green thing on the page. Count it: if your accent appears more than three times on a question page it has become decoration.

**Semantics carry meaning and only the top tier inverts.** Error `#ca3535` / `#d5281b` — as text, at weight 700, with no red background fill anywhere. Success `#0f7a52`. Warning is a yellow *tab* or an 8px bar, never a whole tinted card. And when you genuinely have a third severity level, escalate by changing *kind* — invert the surface — not by finding a redder red. Two systems that did not copy each other landed on the same answer.

**Focus yellow is a fourth colour that is not in the brand palette and never appears anywhere else.** CMS goes further and picks magenta `#bd13b8` precisely because it collides with no semantic colour it ships.

## Type

**A plain grotesque with a large x-height and unambiguous `1 l I` and `0 O` at 16–19px on a cheap LCD.** GDS Transport (derived from British road signage — the provenance is the argument), Noto Sans on Canada.ca specifically for orthographic coverage across French diacritics and Indigenous syllabics, Source Sans on VA.gov, Inter on SGDS. No serif for UI. And write the fallback like you expect it to be used: GOV.UK's stack ends at `arial`, metric-similar and installed everywhere, because a webfont that fails on a throttled connection must not drop the page into Times.

**The scale's shape is the opposite of a marketing scale: compressed at the top, expanded at the bottom.** Body 19, secondary 16, h1 36 on a question page and 48 on a content page — under 3:1 from smallest to largest, and the two largest heading levels can be 2px apart. Contrast comes from weight and a rule, not from a jump. A 64px hero number in this archetype is always a mistake; the biggest thing on the page is the question.

**Two weights: 400 and 700.** Not 300, not the 500/600 pair that reads as product-design house style. NHS uses 600 for headings and Nord uses 670 rather than a true bold — both are deliberate softenings, not additions to the count.

**Numerals: tabular on anything columnar or comparable, and slashed zero on for any code a user will read aloud to a call centre** — a reference number, a case ID, a policy number. Turn both off in display headings, where tabular figures space mechanically and the slash looks like a typo. Never set money or dates in monospace; mono earns its place only where a human transcribes character by character.

## Layout and navigation

**The shell is: provenance band → masthead → back link → one column → footer with the legal statement.** There is no app chrome, no sidebar, no persistent tabs inside a flow. Back is a real navigation control in the page, not a reliance on the browser button, because it has to survive a form POST and a mistap.

```
┌──────────────────────────────────────────────────────────────────────┐
│ 32px  provenance band — "An official website of…"  (federal only)    │
├──────────────────────────────────────────────────────────────────────┤
│ 62px  masthead: crown/seal + service name          [language switch] │
├──────────────────────────────────────────────────────────────────────┤
│ main, padding 40px 0, width 960                                      │
│   ‹ Back                                                             │
│   ┌── 630px (two-thirds) ─────────────────────┐                      │
│   │ [error summary — 5px red border, all four sides, black title]    │
│   │ h1 (inside the legend) = the question    36/40 w700              │
│   │ hint  19/25 #484949  (one sentence, no links)                    │
│   │ input  40px, 2px #0b0c0c, radius 0, width = expected input       │
│   │ [Continue]  38+2px, #0f7a52, radius 0                            │
│   └───────────────────────────────────────────┘                      │
├──────────────────────────────────────────────────────────────────────┤
│ footer — 10px brand-blue top border, licence, © , date modified      │
└──────────────────────────────────────────────────────────────────────┘
```

**The primary object is one question, and it gets priority by being the only thing there.** Screen-reader users hear the label once; sighted users make one decision; the `<title>`, the `<h1>`, the error-summary link and the inline error all derive from a single string.

**Grouping is a sequence, not a set of sections.** When a flow branches or can be resumed, the container is a **task list** — 46–47px rows, whole row clickable, a hint at 19/25, and a status tag that is 19px, weight 400, sentence case, `border-radius: 1px`. Completed rows get **no tag at all**: the outstanding items are the ones that need weight.

**Cards are wrong for forms and right for exactly one thing: a choice between named routes.** NHS care cards and USWDS landing cards are containers for a decision. The moment a card contains a question, it has added a frame that carries no meaning, eaten 64px of a 390px screen, and promised "app" to someone who needed "government record."

## Components

**Belongs here:** error summary paired with inline messages (the same string, verbatim, in both); label/legend as `h1`; fieldsets with sized sub-inputs; the task list; the summary list with `Change` links and *missing information rendered as a link*; warning text and the tiered alert/care card; the back link; a `<details>` disclosure for "if you don't have this"; the check-answers page ending in a declaration sentence and an **Accept and send** button rather than an "I agree" checkbox; a language switch in the header at the same weight as Sign in; a per-page feedback control; a static down page on a different origin.

**Does not belong here:** modals — a modal in a benefits flow is a page you cannot bookmark, back out of, deep-link a caseworker to, or screenshot in full; use a page. Toasts for validation. The banned progress indicator (one that shows all steps, allows back-navigation and marks the current step) — GOV.UK cites the Carer's Allowance team removing a **12-step** indicator with no effect on completion rate or time, and the objection that a stepper lies the moment eligibility makes the path conditional. Floating labels and placeholder-as-label. Tooltips carrying required information. Skeleton loaders. Carousels. Infinite scroll. Icon-only buttons. Uppercase pill badges. A theme toggle. Asterisks on required fields — mark the **optional** minority instead.

## States in this archetype

**Empty is an unfinished obligation, not a blank canvas.** A summary-list row with no value renders the *action* in the value column — `Contact information → Enter contact information`, a blue underlined link — and the "Change" action for that row disappears entirely. Never `—`, `N/A`, or a grey italic "None". When absence is a legitimate final answer, say "None" and keep the Change link.

**Loading is a page load.** These pages are server-rendered and submit without JavaScript; the no-JS path is a supported state, not a fallback. Where an async wait is genuinely unavoidable (an identity check, a payment), it is a text status region that gets announced, on a page of its own, with a stated expectation — not a spinner over a form that may still shift.

**Error has two surfaces and one string.** A 5px red border on all four sides of a summary, titled "There is a problem" in **black**; the failing message repeated verbatim as a w700 red link into the field; a 5px left border on the form group; a 2px red border on *only* the sub-input that failed; no red fill anywhere. **Never clear the fields** — keep passing and failing answers both — except for secrets, which get cleared and say so. And ineligibility is **not** an error: "do not use error messages to tell a user that they are not eligible… because the problem is with the service rather than with the information the user has provided." Ineligibility gets its own page, an explanation, and a next step.

**Too much is a measure problem and a sequencing problem.** Cap at 50–90 characters. If a page has grown past one question, the answer is another page, not two columns.

**Down is a static file.** Brand ground, an h1, two sentences, one link to a status page, no illustration, no spinner, and **no retry button** — it renders without the application that is the thing failing.

## Motion budget

Almost nothing. The question page does not animate: no entrance fades, no staggered reveals, no hover lifts, no layout that reflows after paint. Permitted: a disclosure expanding, ≤200ms; a page-level colour or state change at 100ms. Honour `prefers-reduced-motion` by removing, not shortening.

The frequency argument that governs `technical-productivity` runs **backwards** here. It is not that the user will see the animation four hundred times — it is that they will see it *once*, under stress, on a device where your 300ms transform costs 900ms of jank, and any reflow while someone with a tremor is aiming at a radio button is a hazard rather than a delight. The measured systems ship 0.05–0.3s durations and spend them on drawers and dialogs, which this archetype mostly doesn't have.

## Mobile

**Mobile is not the reduced version — it is the median case.** The person applying for a benefit on a phone on a bus is the user this archetype exists for, so the phone layout is the one to design first and the desktop is the reflow.

**The body size does not move. Only the display type does.** Re-measured at 390 and 1440: `body` is **19/25 at both**, and so is the hint, the task-list hint and the error string. What shrinks is `heading-xl` 48 → 32, `heading-l` 36 → 27, the error-summary title 24/30 → 21/25, its padding 20 → 15 and its margin-bottom 50 → 30, and `main` padding 40 → 20. (An earlier pass of this file carried the pre-v5 mobile scale — body 19 → 16, `body-s` 16 → 14 — and that scale is gone; the numbers above are what 6.1.0 and 6.5.0 ship.) The SaaS habit of scaling everything through one `clamp()` ratio compresses the text that was already sitting on the legibility floor. Nobody ships a 12px mobile body.

**The primary action goes full-bleed; semantically sized inputs do not.** Measured on the same GOV.UK page at 390px: the button goes 99px → **360px** edge to edge, while day/month/year stay 52/52/86px. The button becomes a thumb target; the field keeps its width as a hint about what goes in it.

Touch targets are honest about the trade-off rather than cargo-culted: GOV.UK ships 40px of hit area and buys back the miss rate with full width; VA.gov's nav links reach **56px** through `padding: 16px 20px` on 16/24 w700; NHS buttons are 56px. Pick a rule and apply it; do not stack a 44px minimum onto a 19px full-width button and ship a 60px slab.

## Copy register

Second person, present tense, active voice, sentence case everywhere including buttons. No exclamation marks, no brand voice, no jokes in failure. Say what happened and how to fix it, in that order. Reuse the words from the label so the error and the question sound the same. Read it out loud; if you would not say it, rewrite it. Banned outright: `please` (implies a choice), `sorry` (does not help fix the problem), `valid` / `invalid` (add nothing), `oops`, `forbidden`, `you forgot`, and raw error codes. Allow "I do not know" wherever it is a truthful answer — a form that forces a guess produces a wrong record, and a wrong record here is a denied claim.

| Right | The generic version it beats |
|---|---|
| Passport issue date must include a year | Invalid date format |
| There is a problem | Oops! Something went wrong 🙈 |
| Accept and send | Submit |
| You cannot get Universal Credit while you have more than £16,000 in savings. You may be able to get New Style JSA instead. | You are not eligible. |

Hint text is one short sentence with **no links inside it** — screen readers announce the link text as part of the field description without saying it is a link. If the explanation needs a paragraph, make the h1 a statement, write the explanation as body copy, and keep a short specific question in the label. And your longest string is not the English one: French runs ~20% longer, so never size a control to its label.

## The characteristic failure

There are two, and they are opposites.

**Failure A — civic cosplay.** The restraint gets copied and the machinery does not, because the restraint is the half that shows in a screenshot. Look at your own render and read down the left column; every hit is a point against you.

| In the screenshot — what got copied | Not in the screenshot — what didn't |
|---|---|
| A `rounded-xl shadow-lg p-8` card wrapping the question | An error summary with anchor links into the failing fields |
| 14px `text-gray-500` label over a `1px #E5E7EB` input | A submit that works with JavaScript off |
| `focus:ring-2 ring-blue-500` — 3.68:1, and identical to the link colour | One string shared by `<title>`, `<h1>`, summary link and inline error |
| `Step 3 of 7` above a flow whose length depends on an eligibility answer | Your typed answers still in the fields after a failed submit |
| ⚠️ plus three near-identical ambers doing severity | A styled visited link |
| An asterisk on every required field | An ineligibility *page* instead of a red field |
| A primary button in the same hue as the links | `(optional)` on the minority that is |

Copy-level tells visible in the same screenshot: `Please`, `Oops`, `Submit` instead of `Accept and send`, `Invalid date format`, an "I agree" checkbox where a declaration sentence belongs, a theme toggle in the header, and a validation message living in a toast.

**Self-diagnosis, thirty seconds: turn JavaScript off and submit the form empty.** If you do not land on a linked summary of every failure with your typed answers still in the fields, you built the costume. Second test, five seconds: `getComputedStyle` the input. If `border` is not ≥2px of something near-black at `border-radius: 0`, the field is a decoration rather than a box you write in.

**Failure B — the real service that went shopping for a personality.** The more common failure inside actual government, and it is measurable. CPF Singapore's member site, re-probed 2026-09 and unchanged: body **16/24 Montserrat** at `letter-spacing: -0.25px`, paragraph copy `#757575` on `#f7f7f7` = **4.30:1, failing AA**, buttons at `border-radius: 9999px`, 48px controls, and an auto-advancing carousel with a stock laptop photo above the fold of a national pension service. Every one of those is a consumer-marketing instinct applied to a statutory obligation. **Self-diagnosis: negative letter-spacing on body copy, a pill radius, a hero photograph and any grey under 4.5:1 are four independent symptoms of the same cause.** The tell is that the page has a *mood* — and the user came to check a retirement balance.

The unifying diagnosis: **the imitation optimises the first impression; the real thing optimises the worst case.** Every measured decision in this file reads as an answer to "what happens to the person for whom this goes wrong?"

## Signature decisions that fit here

- **The appeal clock on the confirmation page.** A benefits decision screen where the most prominent element after the reference number is the decision date and the statutory deadline to challenge it, because the user's realistic next action is an appeal and the deadline is the thing that expires.
- **Field geometry that mirrors the source document.** A visa or passport service where each input's width and grouping match the physical field on the document being copied from, so transcription becomes positional rather than interpretive — the same logic that makes GOV.UK's year box 86px and its day box 52px.
- **A printable record generated at the moment of submission.** An immigration or licensing service that renders the full answer set as a one-page document the user can print or save, because their next step is showing it to a lawyer, a landlord or an employer, and a screenshot of a scrolling web form is not evidence.
- **Estimated and final as two typographic tiers.** A pricing or entitlement figure shown before identity is proven is set in a visibly different, quieter tier from the binding number shown after — HealthCare.gov splits "estimated prices before you apply" from "log in to get final prices" — so a non-binding number can never be mistaken for a commitment.
- **Language parity as a layout constraint.** In a bilingual service, the switch preserves position in the flow rather than dumping to a homepage, both languages appear at identical size and weight on any page where the user's language is unknowable (404s, entry points), and the error-summary string is capped at one clause because it is the string most likely to be machine-translated badly.

## Sources

- **https://www.gov.uk/apply-for-a-passport** — re-probed 2026-09 at 1440 **and 390**: `govuk-frontend 6.1.0`, **24** `--govuk-*` custom properties on `:root` (`#0b0c0c`, `#484949`, `#1a65a6`, `#ca3535`, `#0f7a52`, `#ffdd00`, `#cecece`, `#f4f8fb`; the design system on 6.5.0 ships 25 — an earlier pass of this file said 99, which counted every custom property on the page, not the `--govuk-*` ones), h1 `heading-xl` 48/50 w700 → 32/35, **p 19/25 at both widths**, `main` 960px with a 630px content column, input `2px solid #0b0c0c` `radius 0` `padding 6px`, button 38px `#0f7a52` `padding 8px 10px 7px` (99px → 360px full-bleed at 390).
- **https://design-system.service.gov.uk/components/error-summary/full-page-example/index.html** — re-probed 2026-09 at 1440 and 390 (`govuk-frontend 6.5.0`): legend-as-`h1` **36/40 w700 → 27/30**; `.govuk-error-summary` `border: 5px solid rgb(202,53,53)` on all four sides, `padding 20 → 15`, `margin-bottom: 50px`, width 630 → 360; title 24/30 → 21/25 in `#0b0c0c`; `.govuk-form-group--error` `border-left: 5px solid #ca3535`, `padding-left: 15px`, `margin-bottom: 30px`, **no background tint**; year input `2px solid #ca3535` at 86px, day/month 52px at both widths; input height 40px.
- **https://design-system.service.gov.uk/components/task-list/default/index.html** — re-probed 2026-09: rows **46–47px** at `padding: 10px 0` with a `1px #cecece` rule (76px where the row carries a hint), hint 19/25 `#484949`, link 19px w400 `#1a65a6`, tag 19/25 **w400 sentence case** `border-radius: 1px` `padding 2px 8px 3px` on `#d2e2f1`/`#0f385c`.
- **https://design-system.service.gov.uk/patterns/check-answers/default/index.html** — screenshotted: summary list with per-row Change links, the "Now send your application" declaration sentence, "Accept and send", and the yellow-block focus state captured on the button.
- Screenshotted for the claims made from them: **gov.uk/browse/benefits** (tinted title band, arrow-led links, no cards, aligned to the masthead's left edge), **designsystem.digital.gov/components/alert** (five variants, 8px saturated left bars over pale washes, the icon convention NHS rejects), **service-manual.nhs.uk/design-system/patterns/question-pages** (re-probed: `h1` 48/54 w600, button **56px** `r4px` `#007f3b` at `padding 12px 16px`; the cookie banner ships accept and reject as two *identical* green buttons).
- **https://www.canada.ca/en/services/benefits/ei.html** — re-probed 2026-09: body copy **20/32 Noto Sans** (= the 20px/160% GCDS token), `h1` 41/48 w700 Lato. Note canada.ca's page theme renders `h2` at 29px; the "h1 and h2 2px apart" finding is a property of the GCDS *token scale* (41/39), not of this page. Screenshotted at 1440 and 390: the red rule under the h1, the orange-bar emergency notice, the "Most requested" grey band, `Français` in the top right at header weight.
- **https://www.irs.gov/…** (served its 404) — screenshotted: the federal identifier band above the masthead, "Page Not Found. / Error 404. / Sorry, this page is not available." plus a search box. `directfile.irs.gov` refused headless traffic.
- **https://design.va.gov/patterns/ask-users-for/social-security-number** — screenshotted: the `Ask users for… / Help users to…` taxonomy, the `USE: DEPLOYED` badge, and per-pattern Research / Figma / Code / Open Issues links.
- **https://designsystem.tech.gov.sg/components/button/** — re-probed 2026-09: **696** `--sgds-*` tokens (597 in the previous pass) including the radius scale `0·2·4·8·12·16·24·32·999`, `--sgds-motion-duration-faster/fast/standard/slow/slower` = `.1s/.2s/.3s/.4s/.5s`, `--sgds-outline-focus: 2px solid` with a negative offset, `--sgds-text-max-width: 864px`, body 16/24 Inter, weights 300/400/600/700. Homepage screenshotted separately as the `premium-marketing` counter-example.
- **https://www.cpf.gov.sg/member** — re-probed 2026-09 for the Failure B numbers, all reproduced: Montserrat 16/24 at `ls -0.25px`, `p` colour `#757575` on `#f7f7f7`, pill buttons at `border-radius: 9999px`, 48px controls, carousel hero. Screenshotted at 1440.
- **https://www.gov.sg/** — returned a CloudFront 403 to my client; nothing in this file is attributed to it.
- Contrast ratios verified locally with `tools/contrast.mjs`: `#484949`/white 9.03:1, `#1a65a6`/white 6.08:1, `#1a1a1a`/white 17.40:1, `#757575`/`#f7f7f7` **4.30:1 (fails AA)**.
- Values for NHS (nhsuk-frontend 10.6.1), USWDS 3.14.0, CMS, GC Design System and Login.gov are cited from [`../references/institutional-health-civic.md`](../references/institutional-health-civic.md) rather than re-derived, so the corpus stays consistent.

## Differentiation pass (2026-09)

Compared against **`editorial`** and **`healthcare-clinical`** — the two neighbours whose measured numbers sit inside this one's noise band — and, on register rather than geometry, `fintech-consumer` and `enterprise-dense`.

**Differentiation.** Added `## Not its neighbours`: numbers side by side, plus two stated overlaps. This archetype *shares* type scale, measure, radius and elevation with `editorial`; the difference lives in the `h1` being a question bound to a control, the link system being load-bearing (visited 9.06:1, button hue ≠ accent hue), the failure apparatus, and 1.32 vs 1.4–1.5 leading. It *shares its whole patient surface* with `healthcare-clinical` — which that file states in writing — and the difference lives one tier above error (the inverting emergency card, the ≤2 persistent / ≤1 interruptive alert budget) and in clinical's second, professional population at 14/21 with 43px rows. Motion set to 100ms rather than `editorial`'s 120ms with the reason stated. Deleted the two "choose this over" bullets the section replaced, and the Mobile paragraph that repeated it.

**Five numbers corrected, all re-probed live at 1440 and 390 (Playwright computed styles):**
1. **Page title.** The file applied `48/50 w700` to the question page. A *content* page is `heading-xl` 48/50 → 32/35; a *question* page is `heading-l` **36/40 → 27/30**, because the `h1` is the `<legend>`. The layout diagram and the reference-table steal both carried the wrong one.
2. **Mobile body.** "Body 19 → 16, `body-s` 16 → 14" is the pre-v5 scale and is gone: body measures **19/25 at both widths**. This also contradicted `references/institutional-health-civic.md`, which had already corrected it.
3. **Token count.** "99 `--govuk-*` custom properties" → **24** (6.1.0 on www.gov.uk), 25 on the design system's 6.5.0. 99 counted every custom property on the page.
4. **SGDS** 597 → **696** tokens; motion scale runs to `.4s/.5s`.
5. **VA.gov touch target** 44px via `padding: 10px 15px` → **56px** via `padding: 16px 20px`, matching the reference file's re-probe.

Re-confirmed unchanged: task-list rows 46–47px at `padding: 10px 0` (and the 76px hinted row, newly recorded); error summary `5px #ca3535` four-sided, padding 20 → 15, `margin-bottom: 50px`, title 24/30 black → 21/25; form-group 5px left border, no tint; date inputs 52/52/86 at both widths; button 38px `#0f7a52`, 99 → 360px; input 40px `2px solid #0b0c0c` r0; GCDS body 20/32; the SGDS radius scale, 864px measure, negative focus offset and 48px `form-height-xl`; NHS button 56px; every CPF Failure-B number including `#757575` on `#f7f7f7` at 4.30:1.

**Corpus conflict resolved.** `craft/forms-craft.md` said GOV.UK's form column is 748px; this file said 630px. Both measurements were real: 748px is a full-width input inside the design system's **809px example iframe**, 630px is the two-thirds column on a service page. Fixed in both files so nobody ships a 748px form column.

**Wrong-one section** rewritten from six generic categories to named products that superficially fit and break on a specific number: Vanta/Drata/Secureframe (frequency), TurboTax/H&R Block/immigration startups (volition), Epic and agency adjudication consoles (repetition), university/hospital/foundation sites (persuasion), crypto exchanges wearing square corners (screenshot-only credibility).

**Characteristic failure** hardened into a two-column screenshot table — seven tells visible in your own render against the seven invisible mechanisms they replace — plus a `getComputedStyle` test on the input border and four independent symptoms for Failure B.
