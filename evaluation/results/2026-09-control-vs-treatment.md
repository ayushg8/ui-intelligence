# Control vs treatment — 2026-09

Four scenarios, built twice by fresh agents on the same base model.

- **Control:** the brief only. Explicitly told not to invoke any skill or read this repo.
- **Treatment:** the brief plus `START-HERE.md`, following `system/1-discover.md` → `8-gates.md`.

Both arms produced a single self-contained HTML file with no network requests, so the two are
rendered and measured identically. Screenshots in `control-shots/` and `.cache/eval/`.

The baseline was strong — see [`2026-09-control-baseline.md`](2026-09-control-baseline.md). The
controls are competent work scoring ~3 on vibecode risk, not slop. That is the bar the treatment
had to clear.

---

## The measurable result

### Automated gates — `node tools/audit.mjs --widths 1440,390,320`

| Scenario | Control | Treatment |
|---|---|---|
| task-manager | 4 hard failures | **0** |
| api-landing | 8 | **0** |
| churn-dashboard | 15 | **0** |
| college-deadlines | 9 | **0** |

Clean sweep. This was the *expected* win and it is the least interesting one: the control had no
reason to run a gate it was never told about. It is still a real result — 36 hard failures, mostly
contrast and touch-target, that would all have shipped.

### Token discipline — distinct values actually rendered at 1440

| | Control | Treatment |
|---|---|---|
| task-manager font sizes | 5 | **4** |
| task-manager radii | 10 | **4** |
| api-landing font sizes | 16 | 17 |
| api-landing radii | 10 | **3** |

**The api-landing font-size count went the wrong way and is reported as-is.** A marketing page
pairing a 60px serif display with 8–12px mono captions legitimately spans more sizes than a product
UI; the metric is a weak proxy on that surface. The radius collapse — 10 distinct values to 3 — is
the discipline signal that held on both.

### Density, where it was the point

churn-dashboard at 1440×900: control showed ~7 table rows below its KPI band; treatment shows **23**.

---

## What each treatment actually did differently

| | Control | Treatment | Archetype chosen |
|---|---|---|---|
| **task-manager** | Kanban, 4 status columns, card per task | Grouped by **person**; each lane opens with that person's in-progress work as an amber bar carrying elapsed time | `technical-productivity` |
| **api-landing** | Badge pill · one headline word in indigo · primary+ghost CTA · sans on white | 60px **serif** on warm paper; vermilion accent used twice; a real remittance scan beside its JSON showing `"bbox": [44,42,316,24]` | `premium-marketing` |
| **churn-dashboard** | 5 KPI tiles + 3 chart panels + table, all carded | Master/detail, no card anywhere; aggregates in the **column footer**; risk score decomposed (+15 no contact, +10 seats… = 63) | `enterprise-dense` |
| **college-deadlines** | Countdown hero, urgency cards | **The rail** — vertical distance equals days, so "17 days clear, then four land together" is literal empty space | `expressive-consumer` |

### The signature decisions

This is where the delta is largest, and it is the part the base model does not do unprompted. Each
one is a structural decision derived from the domain, not a style applied on top:

- **task-manager** — the now-line. Two amber bars in one lane reads as split focus ("Priya is
  running two threads"); a dashed empty line reads as *"Free since 09:40. Next in their queue is
  HAL-424."* One structure answers both halves of "assign work, see what's in progress."
- **api-landing** — provenance. The claim ("every field points at the pixels it came from") and the
  proof (a scan wired bidirectionally to its JSON) are the same object.
- **churn-dashboard** — the renewal runway. A 3px mark per row on a shared 365-day axis with a
  90-day tick that stacks into a vertical reference line. Replaces a renewals-by-month chart at the
  cost of one column instead of a panel.
- **college-deadlines** — the rail. Urgency encoded as distance rather than red text.

### Copy

The baseline warned that control copy was already good and that no delta here would mean the
`ui-copy` layer is decoration. There is a delta, and it is in **precision rather than polish**:

- *"Short answer: why this major. 300 words. Your draft is at 412."* — tells you that you are over.
- *"in 18 days"*, never *"in about 3 weeks"*. The build's own note: **a deadline is a fact, not a
  feeling.**
- *"Scores stale — last Sep 9, 06:00 UTC"* replacing *"Scores synced 4m ago"* during an outage —
  the critique caught **a clock that lies**.
- *"Northwind ops haven't confirmed the replay window"* as the blocked reason, inline in the row.

---

## What the critique loop caught that reading code would not

The strongest argument in the whole evaluation. Every item below was found by rendering and looking:

- **A JavaScript error that blanked the entire page.** `Cannot access nf before initialization` —
  caught only because the agent re-screenshotted after a one-line edit. A code review passes this.
- **A dead interaction.** The `<dialog>` sat inside a `display:none` aside at phone widths, so
  tapping a school opened nothing. Invisible in source, obvious in the shot.
- **A CSS class collision** (`.bar`) painting two toolbars on top of the top bar.
- **An inverted signature.** The runway encoded length = time *remaining*, so a 7-day critical
  renewal was a dot and a 285-day one a long red bar — backwards, and only visible rendered.
- **A column carrying no information.** Every row's Top signal read "Usage down X%" because one
  weight dominated the scoring; across 74 rows the "why" column said nothing.
- **Mobile that was a squeezed desktop**: 106px rows, 6 per screen → redesigned to 9 per screen.
- **A loading state that made a claim about data it did not have yet** (the populated headline
  sentence, shown while loading).

Iterations to reach the target: 4, 5, 5, 4.

---

## The cross-scenario check

Do the four treatments look like four different products, or one design system in four coats?

**Four different products.** A warm-paper serif marketing page; a person-grouped work queue at 13px;
a 30px-row master/detail grid with a 224px rail; a mobile-first timeline with 12px radii and a
bottom tab bar. Nothing about them suggests a shared origin — which is the point of the archetype
layer, and the check that would have exposed it as decorative.

---

## Honest limitations

- **Same base model in both arms.** This measures the library's marginal effect on a capable agent,
  not "AI with taste vs AI without". That is the right question — it is the deployment situation —
  but it is a narrower claim than the numbers suggest.
- **The treatment prompts named the surface's risks.** The api-landing prompt told the agent the
  control had shipped a badge pill and an indigo accent. That is a fair simulation of an agent that
  has *read* `anti-patterns/`, but it is not a blind test of whether it would find them.
- **Vibecode scores here are self-reported** (all four claimed 1). Reviewing the renders myself I
  would put task-manager at **2**, not 1: its selected row is a full-bleed saturated blue bar, much
  louder than a dense tool needs, and its in-progress rows carry both a left rail *and* a full amber
  background — two marks for one status. Blind third-party scoring is the missing piece and is the
  next thing to run.
- **n=4.** Enough to show the mechanism works; not enough to characterise variance.
- Treatment agents took 4–5 iterations and roughly 3× the tokens of control. The library buys
  quality with time and tokens, and that trade should be stated when recommending it.

## Verdict

The library clears a strong baseline on every dimension it claimed it would, and the wins are not
confined to the mechanical gates. The structural difference — kanban → person-grouped, KPI tiles →
master/detail with column-footer aggregation, countdown cards → a rail where distance means days —
is the archetype and signature layers doing real work.

The baseline document asked: *if the only measurable wins are the automated gates, the library is an
accessibility linter with extra steps.* They are not. But the honest caveat stands that copy and
information architecture were already good in the control, and the improvement there is narrower
than the structural one.
