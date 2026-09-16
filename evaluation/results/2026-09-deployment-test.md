# Deployment test — does it actually get used?

**Evaluated:** 2026-09-15

Every earlier result in this folder was collected by telling agents to follow the library. That is
not how it will be used. This is the first test of the real condition: a plain brief, no mention of
the library, no process instructions — the way a request actually arrives.

The user's instinct that the goal had not been reached was correct.

## Round 1 — before any fix

Three briefs. Nothing said about the library. Agents asked, only after finishing, to report what
they consulted.

| Brief | Skill it chose | Library files read | Archetype | Hard audit failures |
|---|---|---|---|---|
| Team billing settings | `design-taste` | **0** | none | 12 |
| Warehouse inbound board | `frontend-design` | **0** | none | 9 |
| Dental scheduling landing | `design-taste` | **0** | none | 6 |

**0 of 3 used it.**

The billing page is the proof. It rendered a settings surface — the page an admin opens to change a
credit card — with a 60px serif marketing headline, *"Everything you pay for, on one page,"* an
italic coral accent line, glass cards and a glow. Skilled execution in the wrong register. That is
exactly the failure this library exists to prevent, and it happened because the library was never
opened.

### Root cause

**Fourteen-plus installed skills claim UI work** (`design-taste`, `frontend-design`,
`ui-ux-pro-max`, `web-design-guidelines`, `design-html`, `design-review`, `design-shotgun`,
`canvas-design`, `design-consultation`, `plan-design-review`…). `ui-intelligence` was one voice
among them with no stated precedence, and the global instruction block *recommended* it rather than
*adjudicating*. `design-taste`'s "for Ayush" also reads as more specific than "any user interface".

## The fix

1. **`ui-intelligence`'s description now claims the territory** — invoke first for product UI,
   before any other design skill, and it states the relationship rather than just asserting rank:
   *it decides what is being built; the aesthetic skills decide how it looks.*
2. **`CLAUDE.md` adjudicates** — an explicit precedence rule that names the competitors, with the
   observed failure written into it so the reasoning is visible rather than arbitrary.
3. **`design-taste` hands off** — it supplies palette and voice *inside* a chosen archetype instead
   of picking the register itself.

Nothing was disabled. The aesthetic skills still run; they now run in the right order.

## Round 2 — identical briefs, identical conditions

| Brief | Skills, in order | Library files | Archetype chosen | Hard failures |
|---|---|---|---|---|
| Team billing settings | `design-taste` → **`ui-intelligence`** | **13** | `developer-platform` host + `fintech-institutional` on money moves | 12 → **4** |
| Warehouse inbound board | `ui-ux-pro-max` → **library read directly** | **12** | `internal-utility` | 9 → **0** |
| Dental scheduling landing | `design-taste` → **`ui-intelligence`** | **7** | `premium-marketing` host + `healthcare-clinical` for the schedule asset | 6 → **1** |

**3 of 3 used it. 27 hard failures → 5.**

### The corpus visibly changed decisions

Not just "files were read" — specific decisions reversed:

- **Billing wrote a type-to-confirm gauntlet for cancellation, then deleted it:** *"cancel-at-period-end
  is reversible, so the type-to-confirm gauntlet I first wrote was theater."* That is
  `system/6-states.md`'s friction-matches-consequence table overruling the agent's first instinct.
- **Dental refused the dark default:** *"Dark-by-default would have been a taste decision, not a
  product one"* — the archetype requires the page ground to match the hero shot's chrome, and the
  product is a light clinical app. This is the composition working: the process layer overriding the
  aesthetic layer on a structural question, then letting it supply the palette.
- **Dental broke the generic skeleton item by item** — no badge pill, no centred gradient headline,
  no twin CTAs, no gray logo cloud, no three feature cards, no bento, no testimonial trio, no FAQ,
  no gradient band. That list is `anti-patterns/remedies.md` applied directly.
- **Inbound caught an alarm-design bug**: it was flagging every truck mid-unload as "short", and
  rejected it — *"10/17 at 41m is incomplete, not short. That's the bug that trains an operator to
  ignore red."* That reasoning comes from the archetype's line about an operator who has learned to
  ignore your red.
- **The digests were used.** All three pulled `archetypes/DIGEST.md` / `anti-patterns/DIGEST.md` and
  `digest.mjs --five` rather than whole files — the context fix built hours earlier, load-bearing on
  its first real test.

## What is still not fixed

- **Precedence is not clean.** `ui-intelligence` was not invoked *first* in any of the three —
  `design-taste` fired first twice and `ui-ux-pro-max` once. The handoff caught it every time, so
  the outcome is right, but the ordering rule is not being followed literally. Escalating would mean
  `skillOverrides` in `settings.json` to stop the competitors auto-triggering; that is a heavier,
  more destructive lever and has not been pulled.
- **Billing still has 4 hard failures**, down from 12 but not zero.
- **n = 3, one machine, subagents.** The main conversation thread has not been tested this way, and
  subagents receive `CLAUDE.md` the same way but may weigh skills differently.
- **One round of tuning.** The fix was designed after seeing round 1 fail, and validated on the same
  three briefs. Fresh briefs would be a stronger test.
