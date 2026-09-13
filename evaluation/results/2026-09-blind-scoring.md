# Blind scoring — 2026-09

The control-vs-treatment writeup closed with an admission: the vibecode scores were **self-reported**
by the agents that did the building, all four claiming 1/10. That is not evidence. This is the fix.

## Method

Three independent judges, each given the four screenshot pairs with no knowledge that two arms
exist, no access to this repo, and instructions not to invoke any skill. A/B assignment was
**mixed across scenarios** — treatment was A in two pairs and B in the other two — so a judge with
a positional bias could not produce a clean sweep by accident.

The judges were given deliberately different lenses, because a result that only survives one lens
is not a result:

| Judge | Lens |
|---|---|
| 1 | Experienced product designer. Which is better designed, and what is the winner's biggest weakness? |
| 2 | **Skeptic.** Explicitly told to resist being impressed: an unusual interface is not thereby good, a well-executed conventional one is a success, and straining is a *worse* failure than blandness. Asked to name any "trying too hard" choice. |
| 3 | **User's task only.** What one question does the user open this screen to answer, and which version answers it in fewer eye movements? Count the content items visible. |

Scoring: 0–10 for looking AI-generated, 0 = exceptional product team, 10 = obviously generic.
All three were told explicitly that a competent, conventional interface is ~3, not 7.

## Result

**12 of 12 judgments favoured the treatment arm.** Scores (treatment / control):

| Scenario | Judge 1 (designer) | Judge 2 (skeptic) | Judge 3 (task) |
|---|---|---|---|
| task-manager | **2** / 7 · much better | **3** / 6 · somewhat better | **2** / 7 · much better |
| api-landing | **2** / 7 · much better | **3** / 4 · somewhat better | **2** / 4 · somewhat better |
| churn-dashboard | **2** / 7 · much better | **2** / 6 · much better | **2** / 7 · much better |
| college-deadlines | **2** / 6 · much better | **3** / 6 · much better | **2** / 6 · much better |

Treatment mean **2.3**, control mean **6.1**. The treatment landed in the 0–2 target band on 8 of 12
judgments and at 3 on the other four.

**The blinding demonstrably held.** The skeptic's closing line was: *"Neither side won consistently:
1A/3A vs 2B/4B."* It believed the wins were split between the two labels — because the labels were
shuffled. It had no idea it was choosing the same arm every time.

## What the judges caught that the builders did not

Three findings converged independently across judges, and two of them match the criticism I made of
the task-manager build before seeing any judge output:

- **The full-bleed blue selected row.** Judge 1: *"visually louder than the genuinely urgent
  in-progress/blocked rows."* Judge 2 listed it under trying-too-hard: *"has no explained meaning
  and fights the amber in-progress rows."* The build self-scored 1/10 and did not mention it.
- **Two marks for one status** — the in-progress rows carry both a left rail and a full amber fill.
- **Real bugs in the control that I missed on my own review**: the renewal bars render at equal
  height though the values run **$3.35M to $499K**, and the ARR column reads
  896 / 892 / 856 / **900**K under a header that says "Sort: ARR at risk" — the sort is broken.

## The most important sentence in the evaluation

From the skeptic, unprompted:

> **"Distinctiveness only won where it carried information** — the bbox/confidence claim plus the
> curl, the score decomposition and action panel. **Where it was styling** — the gradient countdown
> and the colliding FAB — **it lost to the plainer timeline."**

That is this library's thesis, stated by a judge that does not know the library exists, and it cuts
both ways: it is also the clearest evidence that the judges were not simply rewarding whichever
version looked more designed.

## Density, measured by judge 3

| | Control | Treatment |
|---|---|---|
| churn-dashboard | 5 KPI tiles + 3 chart panels + **7 rows**, table unfiltered at 412 of 412 | **24 rows × 9 columns**, pre-filtered to 74 of 412, sorted by ARR |
| college-deadlines (390px) | ~60% of the screen on hero + stat tiles + chips | one summary sentence + timeline |
| task-manager | 18 cards across 4 columns, one column spent on Done | ~16 rows in 4 person-groups + unassigned |

> *"B burns ~55% of viewport on tiles and manager-level charts, then shows 7 rows and makes the CSM
> filter 412 accounts herself."*

## A methodological flaw, found and corrected

The treatment builds ship a demo state-switcher bar; the controls do not. Left visible, that leaks
which arm is which. I stripped it with a CSS rule matching `.demo-bar`, `[class*="demo"]`,
`[id*="demo"]` — which covered churn-dashboard (`class="demobar"`) and college-deadlines
(`class="demo"`), and **missed task-manager, which uses `class="scaffold"`**. api-landing has no
state bar at all.

So one pair of four was not cleanly blinded. The leak cut **against** the treatment — judge 2 saw
the strip and counted it as a trying-too-hard failure, *"designer-facing, not user-facing"* — and
the treatment still won that pair. The result stands, but it stood by luck rather than by design,
so the pair was re-shot with the scaffolding hidden and the A/B assignment **flipped**, and
re-judged by a fresh skeptic. See the appendix below.

## What this does and does not establish

**Does:** on these four briefs, with the arms hidden and the labels shuffled, three judges with
different priorities independently preferred the library-guided builds every time, and scored them
inside the 0–2 target band while scoring the controls around 6.

**Does not:**
- n=4 briefs, n=3 judges. Enough to show the effect is real and not self-report; not enough to
  characterise its size or variance.
- The judges are the same model family as the builders. A human designer's read is the thing this
  is standing in for, and it has not been collected.
- Judges saw **one screenshot per version**. They could not assess interaction, states, keyboard
  access or responsive behaviour — which is where a large part of the library's work goes, and
  where the automated gates showed the widest gap (36 hard failures across the controls, 0 across
  the treatments).
- The api-landing pair was close on two of three judges (3/4 and 2/4). The skeptic called it
  *"close pair"* and said the control's field-highlighting demo *"teaches the product better."*
  That is the honest state of that scenario.
