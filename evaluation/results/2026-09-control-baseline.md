# Control baseline — 2026-09

Four scenarios built by a fresh agent with **the brief only**: no library, no skills, explicitly
told not to read this repo. Single-file HTML so the arms are comparable and render identically.

Screenshots: `.cache/eval/ctl-*.png` (1440 and 390).

---

## The headline finding: the baseline is good

This is the most important result so far and it is uncomfortable, so it goes first.

**A current frontier model, given only a one-line brief, produces competent UI.** Not slop. The
control builds have real domain content, derived rather than random data, sensible information
architecture, and copy that is specific to the product. Two examples:

- **api-landing** wrote *"Quire is a parsing API for teams drowning in PDFs. Send an invoice, a
  90-page MSA, a fax, a photo of a receipt"* — concrete, in the user's words, no benefit-stacking —
  and built a working hero demo showing a real invoice being parsed into real JSON, rather than an
  abstract gradient graphic. The hero is left-aligned, not centered.
- **churn-dashboard** computed risk scores from seven weighted signals so that every "top signal",
  drawer breakdown and suggested play is internally consistent, gave each KPI a comparison line
  (*"20.9% of $73.9M book"*, not a bare number), and shipped a 412-row sortable table with
  sparklines and tabular figures.

**Any evaluation that scores this baseline 7–8 on vibecode risk is measuring a strawman.** These
land around **3**. The system has to beat a strong control, and the honest margin available is
narrower than the framing "AI-generated UI looks bad" implies.

## What the tells actually are now

The 2023-era tells are largely gone — no Corporate Memphis, no glassmorphism, no purple gradient
blobs, no lorem. What remains is subtler and is what the taxonomy must target:

| Tell | Where | Note |
|---|---|---|
| Badge pill above the headline | api-landing | `NEW · Table extraction v3`. Still the single most reliable marker. |
| One word of the headline in the accent color | api-landing | The socially-acceptable descendant of gradient text. |
| Indigo/violet accent (~`#4F46E5`) | api-landing | The default accent of generated software. |
| Primary + ghost-with-arrow CTA pair | api-landing | Almost invariant. |
| Five KPI tiles in a row | churn-dashboard | The metric-tile reflex. Mitigated here by real comparison lines, but the row is still the airiest region on a dense screen. |
| Everything in a bordered, shadowed, ~12px-radius card on a gray page | churn-dashboard | 5 tiles + 3 panels + table. Organized card soup is still card soup. |
| Density drops at the top of the page | churn-dashboard | The KPI band is spaced for a marketing page; the table below it is correctly dense. The inconsistency is the tell, not the density itself. |

## Automated audit — control arm

`node tools/audit.mjs --widths 1440,390`, counting hard failures and serious/critical axe violations:

| Build | Issues |
|---|---|
| task-manager | 3 |
| api-landing | 5 |
| college-deadlines | 6 |
| churn-dashboard | 10 |

Density correlates with issue count, which is expected: more elements, more contrast and
target-size failures. None of the four was clean. This is where the treatment arm should win most
clearly, because the gates are mechanical and the control had no reason to run them.

## What this predicts about the treatment arm

Where the library should produce a measurable delta:

1. **Automated gates** — the control never ran an audit. Treatment should reach zero hard failures.
2. **De-carding and density calibration** — the most visible structural difference.
3. **Surface defaults** — badge pill, accent-colored headline word, indigo accent, dual CTA are all
   explicitly named in the remedies file.
4. **Real states** — the controls ship the populated happy path. Empty, loading, error and
   too-much are where "mockup vs product" is decided.
5. **Archetype divergence** — the cross-scenario check. If the treatment builds for
   `technical-productivity`, `enterprise-dense` and `expressive-consumer` look like three different
   products while the controls look like three views of one design system, the archetype layer is
   doing real work.

Where the library may show **little or no delta**, and saying so up front keeps the result honest:

- **Copy.** The control's copy is already good. If treatment copy is not better, the `ui-copy`
  skill is decoration.
- **Information architecture.** The control picked sensible structures unprompted.
- **Data realism.** The control generated derived, internally consistent data without being asked.

If the only measurable wins are the automated gates, then the library is an accessibility linter
with extra steps, and the taste layer has not earned its place. That is the result to watch for.

---

**Method note.** The control agents were told not to invoke any skill or read this repo. They still
share a base model with the treatment agents, so this measures *the library's marginal effect on a
capable agent*, not "AI with taste vs AI without". That is the right question — it is the situation
the library is actually deployed into — but it is a narrower claim than it might appear.
