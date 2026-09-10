# Anti-vibecode

The reason this library exists. AI-generated interfaces are recognizable, the tells are specific
and enumerable, and that makes it a fixable engineering problem rather than a limit.

| File | What it's for |
|---|---|
| [`vibecode-taxonomy.md`](vibecode-taxonomy.md) | The catalogue. Every tell, why AI generates it, why a designer clocks it instantly, **when it's actually fine**, what excellent designers do instead, and how to detect it in code and in a screenshot. |
| [`vibecode-rubric.md`](vibecode-rubric.md) | The 0–10 scoring instrument, with anchored levels, weighted dimensions, a calibration set of real interfaces, and a remediation ladder. Target 0–2. |
| [`remedies.md`](remedies.md) | The correction playbook. Before/after code for the ~30 highest-frequency tells, plus a 10-minute polish pass ordered by perceived-quality-per-unit-effort. |
| [`visual-critique-method.md`](visual-critique-method.md) | How to actually look at a rendered interface — the squint test, the grayscale test, the comparison test — and turn what you see into a ranked fix list. |

## Two failure modes, not one

Everything here is aimed at *generic*. There is an opposite failure — **trying too hard** — and it
is worse, because a straining interface reads as amateur where a bland one merely reads as neutral.

A rubric that rewards novelty will push agents into it. So:

- **A well-executed conventional interface scores low.** Convention is not a defect. Users arrive
  with expectations built in other products; a login form that looks like a login form is correct.
- **The target is *intentional*, not *unusual*.** Every deduction must cite a specific observable —
  an element, a value, a string. If the only complaint is "this looks like other products," check
  whether that is a finding or a preference.
- **Most of these patterns are contextual, not banned.** A gradient on a marketing hero is a
  choice; a gradient on an account balance is a trust failure. The taxonomy states the boundary for
  each one. An agent that reads "never use X" and applies it everywhere will produce worse work
  than one that never read the file.

## The cure that outperforms all the others

**Product specificity.** An interface that contains this product's real content, its domain
vocabulary, its actual primary object given visual priority, and one signature decision drawn from
the domain, does not read as generated — even when every component in it is conventional.

Surface fixes (radius, palette, shadows) move the score a little. Specificity moves it a lot.
→ [`remedies.md`](remedies.md), section 11.
