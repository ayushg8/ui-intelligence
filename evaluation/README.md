# Evaluation

The library's claim is that an agent following it produces materially better interfaces. That claim
has to be tested, or it is decoration.

## Method

Ten realistic briefs in [`scenarios/`](scenarios/). For each, an agent builds a working interface —
twice:

- **Control:** the brief alone. No library. Whatever the agent would do by default.
- **Treatment:** the brief plus the library, following `START-HERE.md` through `8-gates.md`.

Both are rendered and screenshotted. A third agent, which does not know which is which, scores both
blind on the vibecode rubric and the visual-quality rubric.

Blind scoring matters. An agent that knows it produced the treatment version will score it higher.

## What counts as success

- Treatment scores **≤2** on vibecode risk; control typically lands 5–8.
- Treatment is visibly denser, has fewer boxes, and stronger hierarchy contrast.
- Treatment ships real states (empty, loading, error); control ships one.
- Treatment's copy is domain-specific; control's is interchangeable.
- The two treatment builds for *different* archetypes look genuinely different from each other.
  This is the strongest signal: if `data-terminal` and `expressive-consumer` come out looking like
  the same product in different colors, the archetype system isn't doing any work.

## What counts as failure — and what to do about it

If the treatment builds are consistently generic, **the system is wrong, not the agent.** Symptoms
and their causes:

| Symptom | Fix in the library |
|---|---|
| Treatment ignored the procedure | `START-HERE.md` is too long or the gates are too soft |
| Right tokens, generic result | The direction step isn't producing enough constraint; strengthen `2-direction.md` and the signature-decision requirement |
| Archetypes all look alike | Archetype files aren't differentiated enough — push the density/color/motion numbers apart |
| Agent never rendered anything | The critique step needs to be a hard gate, not a recommendation |
| Good desktop, broken mobile | `8-gates.md` needs the mobile check earlier, not at the end |
| Scores high but looks bad | The rubric is measuring the wrong things — recalibrate against the reference set |

Record results in [`results/`](results/) with the date and the library commit, so regressions are
visible over time.

## Running it

```bash
node tools/shot.mjs http://localhost:PORT --widths 1440,390 --out evaluation/results/<scenario>/<arm>
node tools/audit.mjs http://localhost:PORT --widths 1440,390,320
```

Parallel builds need their own dev-server port and their own working directory.
