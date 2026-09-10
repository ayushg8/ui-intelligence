# healthcare-clinical

**Evaluated:** 2026-09 · **Density:** two densities — **compact** on the clinician surface (14px body, 43px rows), **spacious** on the patient surface (16–19px body, 56px targets). Naming which one you are building is the first decision, not a detail. · **Dark by default:** no. Light is the register of a record, and a chart gets printed, faxed, screenshotted into a peer review and read on a 6-year-old monitor in a corridor. Ship dark as an explicit, persisted, per-user setting — **not** `prefers-color-scheme`: nordhealth.design stays light under an OS dark preference and offers its own toggle, measured. The one honest exception is a darkened reading environment (PACS/radiology, night-shift telemetry), and that is a *room* decision, not a taste decision.

> Someone is about to act on this screen in a way that changes what happens inside another person's body, and the two people are not the same person.

## When this is the right archetype

Two populations, one set of stakes. **Clinicians** — nurses, physicians, techs, vets, pharmacists, front-desk — are in the product six hours a day, on a shared workstation, interrupted every few minutes, working the 40th chart of a shift. Their errors are transcription, wrong-patient, wrong-row, missed-alert. **Patients** are in it four times a year, on a phone, possibly frightened, possibly not in their first language, reading a result or an eligibility decision they did not choose to receive. Their errors are misunderstanding and abandonment. The archetype covers both because they share the only thing that actually constrains the design: **a misread is not a bad experience, it is a harm**, and the same clinical fact has to survive being written on one surface and read on the other.

- **Choose this over `institutional-civic`** when the reader is a licensed professional repeating a task, not a citizen making a one-time transaction. GOV.UK's one-question-per-page rule is explicitly scoped to "the public's first and only encounter" and says the opposite for "internal service for government users who need to repeat and switch between tasks quickly." A claims adjuster's 40th form and a triage nurse's 40th chart both want grouped fields, keyboard paths and retained context. The **patient** surface of this archetype *is* essentially `institutional-civic`, and should borrow its form patterns wholesale.
- **Choose this over `enterprise-dense`** when a misread row harms a person rather than costing a re-run. Concretely: rows go from ~32px to **43px**, the weakest text tier rises from 2.5:1 grey to ≥4.5:1, status may never be colour-only, and every destructive action is a differently-sized component from every routine one.
- **Choose this over `fintech-institutional`** when the irreversible thing is physiological rather than transactional. Money has a receipt, a counterparty and a reversal window; a dose has a body. And the inversion that matters: fintech may make one number — the amount — the loudest thing on screen. Clinical may **not**, because which number matters changes per patient. A potassium of 5.9 outranks everything on one chart and is noise on another.
- **Choose this over `expressive-consumer`** (patient side) the moment the content is a result, a dose, a diagnosis or a coverage decision rather than a habit, a streak or a booking.

## When it is the wrong one

**Wellness, fitness and meditation apps.** Steps, sleep scores, mood check-ins. Nobody is harmed by a wrong number, the user chose to be there, and engagement is the actual metric. That is `expressive-consumer`. Applying this archetype produces a step counter with a reference-range rail and a provenance stamp, which reads as a disease.

**DTC telehealth storefronts.** ro.co, measured: celebrity endorsement, a product bento, `Start now →` in a black pill, and "high **dose**" set as a display graphic with chevrons. That page is `ecommerce` and it is correct as `ecommerce`. This archetype starts at the **intake questionnaire** and never leaves — the moment the user is answering "have you ever had a blood clot," the shell, the type scale and the error handling change, and the change should be visible. The characteristic failure of this category is a storefront that keeps its storefront chrome across the medical questionnaire.

**Payer and provider marketing.** hioscar.com's `h1` is **72px/70px at weight 400** in a serif on a full-bleed blue-violet ground; athenahealth's homepage is a purple monolith headed "AI-native solutions that make healthcare simpler." Both are `premium-marketing`, correctly. The failure is one-directional: marketing register leaking into the product, never the reverse.

**Hospital brochure sites, health libraries and symptom encyclopaedias.** Reading is the activity → `editorial`, with this archetype's alarm hierarchy bolted on for the one component that escalates (see NHS care cards below).

**Healthcare billing, RCM, prior-auth and scheduling back-offices.** `enterprise-dense` hosting these constraints. Nobody is harmed by a mis-sorted claims queue; somebody is harmed if a denial reason is wrong, so the copy rules apply and the density rules do not.

**Bedside monitors, telemetry walls, OR boards.** Continuously watched, glanceable at 3 metres, colour carrying data → `data-terminal`. Impose a 43px row and a 14px body on a telemetry wall and you have shown four beds instead of sixteen.

**Clinical research and population-health analytics.** The output is a cohort, not a patient → `analytics-bi`.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Nord Design System** (Nordhealth) | The only clinical/veterinary system that publishes its reasoning and ships machine-readable docs; built explicitly for all-day workstation use | `density` is a **prop on the Table component**, not a global theme — a triage board may compress, a medication list may not, in the same app |
| **NHS digital service manual** (nhsuk-frontend 10.6.1) | The best-evidenced alarm hierarchy in public health software | Three severity tiers, and only the top one changes *kind*: emergency keeps the same red header and inverts its **body** to `#212b32` with white text. Measured: header `padding 16px 32px 15px`, `h2` 26/32 w600, body `padding 32px`. No icon anywhere in the component. |
| **OpenEMR** *(demo.openemr.io — the one to look up)* | A real EHR you can open without a sales call, and the login screen alone tells you what clinical software is | The login form carries a **Language** select as a peer of Username and Password. The workstation is shared; language is a property of the session, not the account. |
| **Oscar Health** | The consumer-warm pole, and a nav decision worth copying | The hero's **first** button is "Visit your member account", *before* "Find a plan" — the person who is already sick outranks the person who might buy |
| **athenahealth** | Two audiences, two doors, stated | `Patient Login` and `athenaOne® Login` sit in the same top-right bar at the same weight. Never make a patient guess which portal is theirs. |
| **Zocdoc** *(accidental)* | Its bot-block page is better than most products' deliberate error pages; I hit it again in 2026-09 | Name the observed behaviour ("We detected unusual activity from your device or network"), enumerate probable causes, print a quotable support ID (`bb5ed371-da36-…`). No status code, no jargon. |
| **Epic** *(counter-example)* | The EHR clinicians spend six hours a day in | Its product marketing is a synthwave grid with a cartoon child in a heart, and its 404 is a pun about a cow. The organisation that owns the most consequential clinical UI in the world has no shared register between its surfaces — which is exactly the failure to design against. |
| **Ro / Hims** *(boundary case)* | Regulated telehealth with a storefront front door | Where the register *must* switch, and the fact that neither makes the switch legible |

## The numbers

Clinician-surface values measured on nordhealth.design (Nord tokens + rendered Table, Sept 2026); patient-surface values from nhsuk-frontend 10.6.1 and govuk-frontend 6.5.0 as recorded in [`../references/institutional-health-civic.md`](../references/institutional-health-civic.md). Cite those, do not re-derive them differently.

| | Value | Because |
|---|---|---|
| Body | **Clinician 14px/21px** (Nord `--n-font-size-m: .875rem` × `--n-line-height: 1.5`, measured on body). **Patient 19/25 desktop → 16/20 mobile** (GOV.UK `body`) | A clinician reads a chart at ~65cm on a 1080p workstation for six hours and needs the whole problem list without scrolling; a patient reads once, possibly unwell, on a phone at arm's length. 14 is the floor for the first and the ceiling for nothing on the second. Nobody ships a 12px mobile body. |
| Dense/secondary text | **12px/13.8px w500** for column headers only (measured Nord `th`). Contrast floor for *any* text that carries meaning: **4.5:1** — Nord's weakest usable tier is `--n-color-text-weaker #667680` (4.7:1); `--n-color-text-weakest #b2babf` is decoration and may never hold a unit, a status or a date. Patient surface has **no small tier** | Units (`mmol/L`, `mg`, `mcg`) and timestamps are the most-greyed and most safety-critical strings in generated clinical UI. A `text-gray-400` unit at 2.5:1 is how `mg` becomes `mcg`. |
| Page title | **Clinician 20–24px, w600–670** (Nord `--n-font-size-xl: 1.25rem`, `--n-font-weight-heading: 600`, `--n-font-weight-strong: 670`). **Patient 36/40 → 24/25 mobile, w700** | On a chart the title is the patient's name, and the patient's name must not outrank the abnormal value beneath it. On a patient page the title *is* the question, and there is exactly one. |
| Row / list-item height | **43px** data rows, **40px** header (measured, Nord Table: `td padding 12.8px 8px`, 16px outer padding on first/last cell, `1px` `#d8dde0` bottom rule). Patient list rows **56–64px** | 43 is deliberately ~35% taller than `enterprise-dense`. A medication row carries drug, dose, route, frequency, prescriber and status; a lab row carries analyte, value, unit, range and flag. Compress to 32 and the row that a nurse clicks is not reliably the row she read. |
| Control height | **32px** toolbar/filter (measured Nord button, `r3px`, 14/16 w400) · **40px** form input (`--n-line-height-form: 20px` + padding) · **48–56px** for any irreversible clinical commit. Patient: **56px** (NHS button, `padding 12px 16px`, `r4px`, 4px solid bottom edge that compresses on `:active`) | Sign, administer, discontinue, release-to-patient and delete are physically larger than filter and never the same component. The size *is* the warning; a confirmation dialog is not. |
| Sidebar width | **200–260px**, persistent, plus a **52px** top bar (Nord `--n-size-top-bar`) that holds patient context and nothing else. Patient surface: no sidebar, ≤5 nav items | The top bar is where identity lives, so identity survives every route change. See the signature decisions. |
| Content max-width | Worklists full-bleed; **any prose 50–90 characters** (Nord's own stated target, because "users can control the application layout width"). Patient prose **45–65ex** (CMS `--measure-narrow: 45ex` / `--measure-base: 65ex` — `ex`, not `ch`) | A clinician who has dragged the window to 2560px will otherwise read a 190-character discharge summary line. |
| Radius (control / container) | **3px / 5px** (Nord `--n-border-radius-s` / `--n-border-radius`; on the page I measured, **177 elements at 3px against 18 at 5px**). Patient: **0–4px** (GOV.UK `0`, NHS `4px`). `999px` pills reserved for status badges | Above ~6px on a data surface, corners eat horizontal rhythm in a dense table and the screen starts reading "app" rather than "record". This is the single cheapest tell to get right. |
| Border weight & colour | `1px` `#d8dde0` for dividers — Nord `--n-color-border: rgb(216,222,228)` and NHS `--nhsuk-border-colour: #d8dde0` landed on the same value independently. **Input borders are far darker:** NHS `--nhsuk-input-border-colour: #4c6272`, GOV.UK `2px solid #0b0c0c` | The field must be findable at a glance and the divider must not compete. The generated default inverts this: pale input borders, heavy card shadows. |
| Elevation | A hairline ring first, shadow second: Nord's card is `0 0 0 1px var(--n-color-border), 0 1px 5px rgba(12,12,12,.05), 0 0 40px rgba(12,12,12,.015)`. Real shadow only for things that genuinely float — `--n-box-shadow-modal`, `--n-box-shadow-popout` | Nothing in a chart floats. A shadow implies "this is above the record", which is a claim about precedence you rarely mean. |
| Motion (micro / standard) | **50ms / 200ms** (Nord `--n-transition-quickly: 50ms ease`, `--n-transition-slowly: .2s ease`; `.4s` reserved for mobile sheets) | A nurse opens the MAR forty-plus times a shift. 50ms is below the threshold at which a hover feels like a wait. |
| Focus | A filled block or a ≥3:1 indicator against **both** adjacent surfaces — never a soft accent ring. NHS `--nhsuk-focus-colour: #ffeb3b` on `#212b32` = 11.81:1; CMS picks `--color-focus-dark: #bd13b8` precisely so focus collides with no semantic colour | Keyboard is the fast path for a clinician *and* the accessible path for a patient. `focus:ring-2 ring-blue-500` is 3.68:1 on white and disappears the moment it lands on a coloured status row. |
| Numerals | `tnum` and `zero` **on** for all data, **off** for headings — Nord ships exactly this split (`--n-font-feature-settings` vs `--n-font-feature-settings-heading`), and the rendered Table inherits `font-variant-numeric: tabular-nums` on every cell, with amount and date columns `text-align: end` | An unslashed `0` beside an `O` in an NDC code or an MRN is a transcription error with a name. A proportional `1` makes a 3-digit and a 4-digit result look the same length in a column. |
| Alert budget | **≤2 persistent alerts visible per screen; ≤1 interruptive (focus-stealing) alert per encounter.** If your worst-case patient generates more, you have a ranking problem, not a display problem | This is the only number in the file that is about restraint rather than measurement, and it is the one that saves lives. See Motion budget. |

## Colour

**Neutrals are cool and slightly blue, 10–12 steps.** Nord's text is `--n-color-text: #0c1a3d` (17:1) stepping through `--text-weak #36434a` → `--text-weaker #667680` (4.7:1) → `--text-weakest #b2babf`; NHS runs `#212b32` through five named greys to `#f0f4f5`. Both put the *page ground* at a grey (`#f0f4f5`, `#f6f8f8`) and the *record* on white, which is the right way round: the chart is the object, the app is the table it sits on.

**Colour is a vocabulary, not a palette.** Nord ships **seven** statuses — neutral, info, success, warning, danger, highlight and **progress** — and `progress` is the clinical one: a lab that is *pending* is not neutral, not a warning, and not an error, and the three-status systems every generated UI ships have nowhere to put it. Each status exists in three tiers (`status-X` for the dot/fill, `status-X-weak` for the wash, `border-X`), and the *text* colour is a separate darker token: `--n-color-text-error #d24023` is not the same value as the danger fill. Copy that split; it is why clinical alerts stay readable at 12px.

**The accent does three things and no more: primary action, current selection, focus.** Nord's `--n-color-accent: rgb(53,89,199)`. It may not colour a heading, a patient name, an icon set, a nav label or a "premium" chip. In an interface where blue means "this is the thing to click" and red means "this could kill someone", every decorative use of colour spends the budget that severity needs.

**Severity escalates by kind, not by hue.** You have one red. Once "urgent" is red, the only escalation left is inversion — NHS's emergency card keeps `#d5281b` in the header and flips the *body* to `#212b32`/white; USWDS keeps four pale-tint alerts with an 8px bar and makes `emergency` a solid `#9C3D10` fill. Five gradated ambers are unrankable and collapse entirely under deuteranopia. And **status is never colour alone** — the word, the position or the shape must carry it too, because roughly 1 in 12 men reading your medication list cannot use your green.

**Light by default, both surfaces.** Charts get printed, faxed, exported to PDF for a referral and photographed off the screen; a dark chart arrives at all four destinations wrong. Ship dark as an explicit persisted preference for people who work in dark rooms, re-mapped rather than inverted, with borders carrying more of the structural load and semantic hues raised in lightness and dropped in chroma so red does not vibrate.

## Type

A neutral grotesque with unambiguous digits and unambiguous `l`/`1`/`I` — the failure mode is not "does this look nice at 48px" but "can a tired person tell `5` from `S` at 12px on a bad panel". Nord licensed Nordhealth Sans (with `cv05`, `ss03` and `zero` baked into its default feature settings) and explicitly forbids its *brand* face in product: "the brand typeface should not be used for application UIs where we use a typeface called Inter." That sentence is the whole discipline — the brand face lives on the marketing site and stops at the login boundary.

**The clinician scale is deliberately flat: 11 · 12 · 14 · 16 · 20 · 24 · 36** (Nord's eight steps, base 14). That is under a 2:1 ratio across everything you will actually use, versus roughly 6:1 on a marketing page. Hierarchy comes from weight (400 / 500 active / 600 heading / **670** strong), position and rule-lines — because the thing allowed to be visually loudest is a *flagged* value, and it must be able to out-shout its own section heading.

**The patient scale is the opposite and must be:** 36/40 heading over 19/25 body on desktop, 24/25 over 16/20 on mobile, weight 700 on headings, with `margin-bottom` a property of the type class rather than a per-instance decision. One question, one heading, one decision.

**Monospace earns its place on identifiers and nothing else:** MRN, accession number, NDC/DIN, order ID, lot number, ICD/SNOMED codes, HL7/FHIR payloads. Not on doses, not on lab values, not on times — those stay in the UI face with tabular figures on, because a mono dose reads as a code sample and mono's digit shapes are worse than a good face's tabular set.

**Drug names get tall-man lettering where the ISMP list says so** (`predniSONE` / `predniSOLONE`, `DOBUTamine` / `DOPamine`). It is ugly and it is not negotiable; the mixed case is doing the work that a font cannot.

## Layout and navigation

**Clinician shell: a 52px top bar that holds patient identity, a 200–260px left rail of chart sections, and everything else full-bleed.** The top bar is not branding. It carries the facts that make an order wrong — legal name, DOB, MRN, sex, and the count of active allergies/alerts — and it does not scroll, does not collapse and does not change with the route. Every wrong-patient error in the literature is an identity-context failure, and a sticky 52px band is the cheapest structural defence there is.

**The primary object is the clinical row** — a medication, a result, an order, an encounter — and it earns priority by being the widest and most typographically stable thing on screen, on the page ground rather than inside a card. Grouping is by clinical meaning, then reverse-chronological within group: `Active medications` before `Discontinued`, `Abnormal` before `Normal`, never alphabetical, never by the database's `created_at`.

```
┌──────────────┬─────────────────────────────────────────────────────────────┐
│ 52px top bar: HARPER, Jane E · DOB 1961-04-02 · MRN 0048 1129 · ⚑ 2 alerts │
├──────────────┼─────────────────────────────────────────────────────────────┤
│ 220px rail   │ Section title 20/24 w600                                    │
│ #f6f8f8      │ 32px toolbar: filter · date range · view · print            │
│ Summary      ├─────────────────────────────────────────────────────────────┤
│ Problems     │ 40px header row  12/13.8 w500  #667680                      │
│ Medications  │ 43px data rows, 14/21 w400, pad 12.8×8, 1px #d8dde0 rule    │
│ Results      │   value right-aligned, tabular, unit in the same cell        │
│ Orders       │   [reference-range rail] flag word, never a bare colour      │
│ Notes        │                                                             │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

**Patient shell: single column, no sidebar, one question or one result per page,** ≤5 nav destinations, the primary action full-bleed at 56px. Borrow `institutional-civic` wholesale here — task list, summary list with "Change" links, error summary at the top of the page.

**Cards are right in exactly two places:** the severity card (NHS's three-tier pattern, which is a card because it must be able to invert as a whole), and one patient-facing result card per screen where the result genuinely is the whole content. Everywhere else — problem lists, med lists, result tables, order sets — a card destroys the column alignment that is the only reason a dense list is scannable, and adds 32–64px of chrome per group on a screen already fighting for rows.

## Components

**Belongs here:** a persistent identity banner; a virtualised worklist with sticky headers and a `density` prop; a result row with value, unit, reference range and a flag *word*; a medication row with dose/route/frequency as separate typographic fields; an allergy/interaction alert that persists until acted on and records the acknowledgement; a three-tier severity card; an order-entry form with grouped fields and no clearing on error; an attributed e-signature action (identity + role + timestamp, per 21 CFR Part 11); an audit/"who accessed this" view; a provenance-and-recency stamp on every clinical fact; a "release to patient" control with an explicit delay policy; a print stylesheet that is a deliverable, not an afterthought; `nord-empty-state`-class components so an empty problem list is styled by the system rather than improvised.

**Does not belong here:** a toast as the delivery mechanism for anything clinical (Nord's own guidance: "don't use for error messages unless absolutely necessary… favor a Banner", and "don't remove a notification until a user has explicitly dismissed, or acted on"); emoji or icon-only severity (NHS's emergency card has no icon at all); a progress stepper on a conditional intake — GOV.UK cite a team removing a **12-step** indicator with no change to completion; a gauge, donut or gradient-filled ring for a vital sign; an animated count-up on any measured value; a "health score" that composites incommensurable numbers into one; a chatbot as the primary route to a result; a dark-mode toggle placed above the patient's name in the nav; skeleton shimmer on clinical data; a carousel; a confirmation dialog used as a substitute for making the dangerous button look dangerous.

## States in this archetype

**Empty is four different states and generated UI collapses all four to an em dash.** `Not ordered` / `Ordered, specimen not collected` / `Collected, result pending` / `Resulted, not yet released to patient` are clinically distinct and each has a different next action. Nord's seventh status exists for exactly the middle two. Say which one it is, in words, and put the next action in the cell: an empty required field is the highest-value call to action on the page, so render it as a link ("Enter contact information"), not a dash — and drop the "Change" affordance for a value that does not exist yet.

**Loading must not lie.** A medication list that has rendered 80% of its sources looks exactly like a complete medication list, and that is a hazard, not a perf trade-off. Block the region with a labelled skeleton at the exact row height, state the source count when reconciling across systems ("3 of 4 sources returned — external pharmacy unavailable"), and mark any partial section as degraded in text. Never render `0` or `—` as a placeholder for a value that is merely late.

**Errors get two surfaces and one string.** The error summary at the top of the page (GOV.UK: `5px solid` border on all four sides, title "There is a problem" in **black**, links `w700` in the error colour, anchored to the field) and the identical string inline above the input, prefixed by a visually-hidden `Error:`. Never clear the fields — except secrets, and say so when you do. Inside a compound field, redden only the offending sub-input. And the one clinical addition: a **failed write must be unmistakable and must persist**, because clinicians document and walk away — an autosave that silently fails is the worst bug in this archetype.

**Ineligibility and denial are not validation errors.** "You are not covered for this" gets its own page with a next step and an appeal route, in the words the plan document uses, not a red field.

**Too much is the normal case, not the edge.** A real patient has 34 active medications, 12 allergies and 400 encounters. Never hide behind an infinite scroll; group by clinical meaning with the counts visible in the group headers (`Cardiac (7)`, `Analgesia (4)`) so the *shape* of the problem is legible before anything is expanded. `+29 more` tells the reader nothing about what they are not seeing.

## Motion budget

50ms micro, 200ms standard, 400ms for a mobile sheet. Permitted: hover and focus feedback, disclosure of a section, a sheet or drawer entering, a menu opening. Forbidden: any animation on a measured value (a number in motion cannot be read, and an animated transition between two readings implies a trend the data may not support); entrance or stagger animations on rows; shimmer on clinical data, which reads as "live" when it means "unknown"; **flashing on alarms** — it is a photosensitivity hazard and it stops recruiting attention after roughly one second anyway; and any layout reflow after first paint, because a clinician's cursor is already travelling toward Sign.

The frequency argument is blunt: a nurse opens the medication administration record forty-plus times a shift and a physician opens a chart a hundred times a day. A 300ms panel transition costs that physician half a minute a day of nothing, and — worse — trains them to click before the screen has settled. `prefers-reduced-motion` removes everything except opacity.

**Auto-dismiss is the alarm-fatigue mechanism.** Anything actionable persists until explicitly dismissed or acted on. Anything disposable ("Copied", "Saved") auto-dismisses. Getting this backwards — a 4-second toast carrying a documented penicillin allergy — is how the swipe-without-reading habit gets trained, and the swipe-without-reading habit is what kills someone.

## Mobile

**The clinician surface is a workstation product and should say so.** Nord states it in its own principles ("designed to be run on workstations… all-day use while minimizing visual fatigue"), and its 14px base, 52px top bar and 4/8/16/24/36/72 spacing are workstation numbers. Do not responsively reflow a twelve-column worklist onto 390px. There *is* a real clinical mobile surface — ward rounds, on-call, home health, vet field visits — and it is **a different, reduced product**: the three things you do standing up, 16px body, 56px targets, no tables, identity banner still pinned, and an explicit "open the full chart" escape.

**The patient surface is mobile-first, no exceptions.** Body drops one step and stops (19→16, never to 14). Headings drop 25–33% (36→24). Spacing roughly halves. The primary action goes full-bleed while semantically-sized inputs keep their width — a 4-character dose box stays 52px wide at 390px, because the box is a silent hint about what belongs in it. Everything must render and submit without JavaScript; the offline/degraded path is a supported state, not an outage.

## Copy register

Second person, present tense, active voice, sentence case everywhere including buttons. No exclamation marks, no `please` (it implies a choice), no `sorry` (it does not help fix the problem), no `valid`/`invalid`, no `oops`, no error codes shown alone, no personality in failure. Say what happened, then how to fix it, in that order. Reuse the words from the label. Read it out loud.

| Right | Wrong | Why |
|---|---|---|
| Call 999 or go to A&E now if: | ⚠️ EMERGENCY | The visible heading is the *instruction*; the severity word ("Immediate action required:") exists only for assistive tech. NHS ships exactly this. |
| Amoxicillin 500 mg · oral · 3 times daily · 7 days | Amoxicillin 500mg TID x7d | The abbreviation is the transcription error. Spell the route and the frequency; keep the space between value and unit so `500 mg` can never compress into `500mg` and be read as `5000 mg`. |
| Documented allergy: penicillin — anaphylaxis. Recorded 12 Mar 2023 by A. Okafor. | ⚠️ Allergy alert | An alert with no reaction, no date and no author cannot be judged, so it gets dismissed. Provenance is what makes an alert actionable rather than ambient. |
| Your potassium is 5.9 mmol/L. The normal range is 3.5–5.1. Your care team has seen this result and will contact you within 1 working day. | Abnormal result — please contact your provider | Number, range, meaning, what happens next, by when. The generic version delegates the anxiety back to the patient at 11pm on a Friday. |
| Ariel Salminen arrived to clinic with Pixie cat. | Patient arrived | Nord's own example. Records name their subjects; a log line that could describe anyone describes no one. |
| This did not save. Your note is still on this screen. Try again, or copy the text before you leave. | Oops! Something went wrong 🙈 | The clinician needs to know their documentation is not in the record and that the text is recoverable. |

Two mechanical conventions, picked once and encoded in the component: sentence case throughout, and hint text as a single short sentence with **no links inside it** (a screen reader announces the link text as part of the field description without saying it is a link).

## Signature decisions that fit here

- **The reference-range rail.** Every numeric result renders its own position within its reference range as a 3px inline rail behind the value — low, in-range, high, critical — so `5.9` carries "just above the top of range" without a second column, without a coloured pill, and without colour being the only channel. It scales to a 200-row result table where a flag column would not.
- **Identity is a layout primitive, not a header component.** A 52px band carrying name, DOB, MRN and alert count that survives every route change, every modal and every print. Anything that would cover it — a dialog, a drawer, a command palette — inherits it.
- **Dose as a typographic field, not a string.** Value and unit are separate spans, tabular, non-breaking between them, unit at the same size in `--text-weak` rather than a lighter tier, with the route and frequency in their own fields. A dose is never a single interpolated string, because that is how the space disappears.
- **Every clinical fact carries provenance and staleness inline.** `Weight 82 kg · recorded 14 Aug 2025 · self-reported`. A chart is a set of claims with authors and ages, not a set of values; rendering the value alone is the design decision that makes stale data indistinguishable from current data.
- **Patient-side: result before interpretation before action.** The number and its range, then one plain sentence of meaning, then what happens next with a date. Never a chart first, never a "score", never a colour-only verdict.

## Sources

- **https://nordhealth.design/components/input/** and **/components/button/** — probed live: 144 `--n-*` custom properties. Type scale (`--n-font-size-xxs…xxxl` = 10/11/12/14/16/20/24/36, base `.875rem`), weights `400 / 500 active / 600 heading / 670 strong`, line-heights `1.5 / 1.2 heading / 1.3 caption / 20px form`, space `4/8/16/24/36/72`, radii `3px / 5px / 999px`, transitions `50ms / .2s / .4s mobile`, `--n-size-top-bar: 52px`, both `font-features` sets, the seven-status colour system with separate text/fill/border tiers, and the full shadow ladder (`card` = hairline ring + 5%/1.5% shadows).
- **https://nordhealth.design/components/table/** — probed through the shadow DOM: header row **40px** with `th` 12px/13.8 w500, data rows **43px** with `td` 14px/16.1 w400 and `padding: 12.8px 8px` (16px on the outer edges), `1px` `#d8dde0` bottom rules, `font-variant-numeric: tabular-nums` inherited on the whole table, amount and date columns `text-align: end`. Screenshotted; the `density` prop is a first-class control. Re-shot with `prefers-color-scheme: dark` — **the docs stay light**, with an explicit Light/Dark toggle in the sidebar.
- **https://service-manual.nhs.uk/design-example/patterns/help-users-decide-when-and-where-to-get-care/emergency** — DOM-walked and screenshotted: card `1px #d8dde0`, `border-radius: 0`; heading container `#d5281b`, `padding: 16px 32px 15px`, 64px tall, `h2` 26/32 w600 white; content `#212b32` with white text, `padding: 32px`; a 28×28 arrow affordance; the visible heading is "Call 999 or go to A&E now if:" and the severity prefix "Immediate action required:" is visually hidden. Plus the 77-token `--nhsuk-*` dump (`#005eb8`, `#d5281b`, `#212b32`, `#4c6272` input border, `#ffeb3b` focus, `#d8dde0` border, the four-part button ladder incl. `--nhsuk-button-shadow-colour`).
- **https://demo.openemr.io/openemr/** — screenshotted: label-left/field-right login, square-cornered inputs, a **Language** select as a peer of Username and Password, one full-width primary button, and a single link to "Acknowledgments, Licensing and Certification".
- **https://www.hioscar.com/** — probed: `h1` **72px/70px weight 400** serif on the blue-violet ground, `h2` 54/60 w400, and the hero button order "Visit your member account" *before* "Find a plan".
- **https://www.athenahealth.com/** — screenshotted: `Patient Login` and `athenaOne® Login` as equal-weight peers in the top bar.
- **https://ro.co/** — screenshotted: DTC storefront register; celebrity hero, product bento, "high **dose**" set as display type with chevrons.
- **https://www.epic.com/software/** — screenshotted: synthwave grid, eight hue-coded circular icons, cartoon child in a heart. Its 404 (the cow pun) is recorded in the reference file.
- **https://www.zocdoc.com/** — served its bot-block again, independently confirming the pattern: "Access is temporarily restricted", four probable causes including the observed IP, a feedback link and support ID `bb5ed371-da36-b440-0e05-1128dcc41a64`.
- **Unreachable this pass:** `onemedical.com` (CloudFront 403), `hims.com` and `o3.openmrs.org` (Cloudflare interstitial), two Epic MyChart tenant logins (timeout). Nothing in-product is attributed to any of them.
- **[`../references/institutional-health-civic.md`](../references/institutional-health-civic.md)** — all GOV.UK / USWDS / CMS / VA / GCDS numbers, the error-copy rules, the "do not clear form fields" rule, the progress-indicator ban, the contrast survey, and the Nord content-guideline quotations. Cited, not re-derived.
