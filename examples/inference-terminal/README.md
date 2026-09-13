# Worked example 2 — LLM inference operations terminal

`data-terminal` · built by following the library, start to finish.
Open `index.html`. The bar at the bottom right switches states — demo scaffolding, not design.

This exists to show the archetype layer producing something **as far as possible** from the other
worked example in this repo. Same system, same procedure, opposite answer:

| | `examples/dispatch-console` | this |
|---|---|---|
| Archetype | `enterprise-dense` | `data-terminal` |
| Body | 13px | **12px**, the only size on the data plane |
| Rows | 30px | **21px** |
| Ground | warm paper `oklch(0.992)` | `oklch(0.183)`, dark for a measured reason |
| Rows at 1440×900 | 25 | **38** |
| Page title | "Live board", 15px | **none** |
| Shadows | 1 | **0** |
| Motion on data | 120ms hover | **0ms**, plus a 420ms decay flash |

Nothing was averaged. The archetype file supplies the numbers and the reasons, and they disagree
with the other file on nearly every line.

## Brief

```
Product:   Fleet console for an LLM inference platform's on-call
Object:    Deployment (model × region)
Verb:      Notice the one deviation in ten thousand, inside a minute
User:      2-3 SREs per shift, second monitor, all shift, total expertise
Stakes:    Not acting is the failure. A false alarm they learn to ignore is worse than no alarm.
Shape:     Desktop/wall only. This archetype has no mobile and should not pretend otherwise.
```

## The signature — the latency span

Every row draws **p50 → p99 as one bar on a shared 0–3s axis**, with a tick at p95 and a faint rule
at the 1.8s SLO.

- **Position** is how slow it is.
- **Length is the tail spread** — the thing an on-call actually needs, and the thing a mean hides.
- **Colour is p99 against SLO**, one ramp, used nowhere else in the product.

A wide bar is an unpredictable deployment; a short one is a boring one. `embed-3` rows collapse to
near-dots. Two `opus-4-8` rows are long and red across half the axis. That comparison is free — it
costs one column, where a sparkline column plus a p50 column plus a p99 column would cost three and
still make you subtract.

Taken from the archetype's own list: *"Any column whose comparative size is the question earns an
in-row fill rather than a sparkline column — a second dimension for zero horizontal cost."*

## What the critique loop caught

Every one of these came from rendering and looking, or from running the tools. None is visible in
source.

1. **47 contrast violations on the first render.** `--txt-3` at `oklch(0.56)` measured **4.02:1** on
   the ground — used for every column header, unit and dimmed cell. The archetype file warns about
   this exact failure in its opening paragraph *("at 11–12px the pair has to clear AA against the
   ground")* and I made it anyway. Moved to `0.62` → 5.2:1. 47 → 3.
2. **The last 3 were the demo bar**, which sits on `--raised`, not the ground — a level calibrated
   for one surface used on another.
3. **The summary strip did not reconcile with the rows.** Header claimed `$/min 412.88`; the column
   summed to ~40. This is the same class of defect a blind judge found in the *control* build during
   the evaluation ("18 tasks" / "Everyone 14" / per-person counts summing to 10) — and I reproduced
   it within an hour of writing that up. The strip is now **computed from the row data**, and error
   and cache are request-weighted rather than naively averaged. Verified: header `30,656` = column
   `30,656`; header `33.08` = column `33.08`.
4. **The axis silently truncated its own worst case.** Worst p99 is 3,950ms against a 3s axis, so
   the top bars all clipped at the same x and read as equally bad — while the p99 value appeared
   nowhere else on the row (the `ttft` column prints p50). Fixed with an explicit overflow tag
   (`▸4.0s`), keeping the fixed axis, because a fixed axis is worth more for cross-session scanning
   than an auto-scaled one is for a two-row exception.

## Gates

```
node tools/audit.mjs "file://$PWD/examples/inference-terminal/index.html" --widths 1440
→ no violations · no hard failures
   font sizes: 2 (11, 12)   radii: 4   shadows: 0   text colours: 5
```

The archetype's own density check — *"freeze the feed and count rows at 1440×900; under 30 for a
list-shaped terminal and the geometry came from a component library"* — returns **38**.

## What it deliberately does not do

No mobile: this archetype is a wall-and-second-monitor product and adapting it to 390px would be
pretending. No page title, no sidebar tree, no cards, no elevation in plane. The write path is
narrow on purpose (`a` ack, `s` silence) because a terminal that grows a bulk-edit subsystem has
become `enterprise-dense` and should move there and take 32px rows with it.

## Honest remaining weaknesses

- Sorted by p99, so the worst **error rate** on the fleet (`sonnet-5·batch` eu-west-1 at 3.17%) sits
  mid-table. Defensible — latency is the chosen scanned scalar and a terminal should have exactly
  one — but an on-call would reasonably want `err` sortable, and it isn't.
- The status dot encodes a composite (err, 429s, age, p99) while `err` and `429` also colour
  themselves. That is a summary plus its parts, not a contradiction, but it is two marks earning
  their keep on the same row and worth watching.
- The tokens/s sparkline is low-amplitude enough to read as a flat line at this data range.
