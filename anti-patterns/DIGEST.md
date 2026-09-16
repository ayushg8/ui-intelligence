# Anti-vibecode — fast path

**Generated** by `tools/digest.mjs` from the files in `anti-patterns/` — do not edit; edit the source.

The 60-second score and the highest-frequency corrections. The taxonomy and remedies files are reference works — open them at a specific entry, not end to end.

## The vibecode risk rubric

`anti-patterns/vibecode-rubric.md` · 2026-09 · full file ~21,565 tok

Use this on every UI change. It is cheap enough that there is no excuse for skipping it, and
nothing in the calibration set scores low here and high on the full path — it does not clear a
generated page. It errs the other way, and **Q0 below is the fix for the worst of that error.**

| # | Question | Fail if | Points |
|---|---|---|---|
| **1** | **Could this screenshot belong to any other product in this category with only the logo swapped?** | Yes | +3 |
| **2** | **Is there a number, name, ID, unit or label on screen that only this product could produce?** | No | +3 |
| **3** | **Pick the longest sentence. Would a person who works here have written it?** | No | +2 |
| **4** | Tab once into the page — does anything show a focus ring? And does any element show a second state (hover/selected/loading/empty/**disabled**/error)? | Neither | +1 |
| **5** | Two or more filler strings in product chrome — the shadcn seed cluster as **exact** strings (`Acme Inc.`, `Lorem ipsum`, `$1,250.00`, `1,234`, `45,678`, `+12.5%`, `Total Revenue`, `Trending up this month`, `John Doe`, `Product Name`, `Your Company`), **or** any string whose job is to say *text goes here* (`Section title`, `Company name`, a column header reading `Header`, cells drawn from `random / data / placeholder / text / irrelevant / illustrative`), **or** a generator watermark (`Edit with Lovable`, `MADE IN BOLT.NEW`, `Built with v0`)? | Yes | +1 |

**Q0, the surface-class gate — ask it before Q1.** *Is this a surface where generic content is the
correct content?* Auth, settings, consent and cookie screens, 404s, permission dialogs, payment
forms, empty states. On those, **Q1 and Q2 do not apply**: score Q3–Q5 only, out of 4, and multiply
by 2.5. Skipping this gate is the fast path's worst failure and it is measured below.

Sum = fast score, 0–10. Measured against the §8 set, fast score first, full score second:

```
GOV.UK 0/0.2   GOV.UK Self-Assessment 0/0.2   Halcyon 0/1.0   Halden 0/1.2   Folio 0/1.2
Deadlines 0/1.2   Linear 0/1.4   Basecamp 0/1.4   Mercury 0/1.6   Stripe sign-in 6→0*/1.6
Stripe API ref 0/1.7   Raycast 0/2.4   Resend 0/2.6   Lovable-dir 0/2.8   Vercel 2/3.5
blueprintbuddy 1/3.9   Lusion 8/4.0   ticket-queue v1 6/4.4   liquid-log-glow 6/4.7
Bootstrap dashboard 8/4.9   shadcn dash-01 9/5.3   Cruip 9/6.1   TailAdmin 8/6.3
weight.coach 7/7.5   Compute 9/8.2   Optimus 10/8.1   Agentic 10/8.5

* 6 without the Q0 gate, 0 with it.
```

(v0 "UXBooster" is omitted from this line only: it was scored on the full path in the 2026-09-09 run
and never run through the fast path, and inventing its fast score would defeat the point of the line.)

**It is accurate at both ends and runs 2–3 points hot on templates.** That is by design: the
fast path cannot tell "generated" from "somebody else's finished product", because from the outside
they look the same and both need the same first fix. Use it as the trigger for the full path, not
as the score. Anything ≥4 on the fast path gets the full path.

**⚠ It runs 4.4 points hot on a generic-by-necessity surface, and that is not by design.** Measured
2026-09-10 on the **Stripe sign-in page** (`dashboard.stripe.com/login`), which is one of the better
executed screens in software: five font sizes total (14/16/22/13/12), `sohne-var`, **0.0%** of text
leaves centered, 16 `:focus-visible` rules, and the real auth surface on screen — `Passkey`, `SSO`,
`Or sign in with Google`, `Remember me on this device`, `New to Stripe? Create account`. It scores
**1.6** on the full path and **6 on the fast path**: Q1 fires (+3) because a sign-in card *should*
be swappable with any other sign-in card, and Q2 fires (+3) because there is nothing on a login
screen that only Stripe could produce, and there should not be. Both questions are asking a
question the surface is not allowed to answer.

That is what Q0 is for. With the gate applied, Stripe sign-in scores Q3–Q5 = 0, fast = **0**, and
the two paths agree. **Run Q0 on every auth, settings, consent, 404, permission and payment
screen**, or the instrument will send an agent to decorate the one screen in the product where
decoration is most expensive.

**Two new failure modes, from the Lovable and Bolt rows.** `liquid-log-glow` runs **hot** (6 fast vs
4.7 full) because a single-purpose utility trips Q1 — any water tracker looks like any other water
tracker, and that is not a defect. `blueprintbuddy` runs **cold** (1 fast vs 3.9 full): the fast path
sees real domain nouns and working focus states and clears it, while the full path finds the
unconverted `--destructive`, the accent-coloured headline and the leftover `--sidebar-*`. So the
trigger rule needs a second clause: **run the full path when the fast path scores ≥4, *or* whenever
the artifact is something you are about to ship.** The fast path is a smoke alarm, and a cold reading
from it is not a clearance.

**Question 1 is the whole rubric compressed.** If the answer is yes, nothing you do to the radius
scale will help.

---

---

## How to critique a rendered interface

`anti-patterns/visual-critique-method.md` · 2026-09 · full file ~20,347 tok

Judgement is unreliable across sessions; counts are not. `probe.mjs` (§10) takes all six on any URL.
Take them on your render **and** on the reference product you are comparing against (§5).

| Count | Healthy | Worked example v1 | GitHub issues | task-manager |
|---|---|---|---|---|
| **Distinct font sizes** | 4–6 | 7 (14/12/13/30/11/16/18) | 7, `12px ×199` dominant | **4** (12 ×126, 13 ×56, 15, 17) |
| **Radius families** (rule below) | 1–2 | 3 | 2 | 2 |
| **Distinct accent hues** | 1, plus semantics that are present | **5** (indigo, blue, green, red, amber) | 2 (blue link, red state) + user labels | 4 (blue brand, amber, red, green) |
| **Bordered/shadowed containers above the fold** | as few as the content needs | 6 | 1 | 1 |
| **Gap-value histogram** | one dominant value, then halves/doubles | 6×16, 12×11, 10×9, 24×1, 8×1 — no dominant | 4×152, 8×83, 16×27, 12×3 | 8×52, 2×10, 6×6, 16×1, 12×1 |
| **Left-edge histogram** | 2–4 spines carrying most elements | `x=297 ×23`, `x=321 ×21`, `x=16 ×17`, then **30+ singletons** | `x=321 ×212`, `x=281 ×69`, `x=364 ×31`, `x=48 ×25` | `x=256 ×74`, `x=8 ×42`, `x=282 ×26`, `x=348 ×26` |

The gap histogram is the most diagnostic single number in the table. A real spacing scale looks
like GitHub's: one value used 152 times, its double used 83 times, its quadruple 27 times. Five
values with no winner means spacing was decided per component, which is what "it looks a bit loose"
actually is.

**The radius count needs a stated rule or it is not reproducible.** Re-probed 2026-09-10, GitHub's
issue list renders **seven** distinct radii (6px ×67, 9999px ×42, 24px ×5, 3px ×2, 20px ×2, 50% ×2,
4px ×1) — this document previously credited it with "2" while marking Beacon v1's "4" as a defect,
which is two verdicts for one measurement. The rule that makes both numbers true:

> **Count rectangular radius values occurring ≥3 times. All fully-round values (`50%`, `9999px`)
> are one family regardless of count, because they are the same decision.**

Under it: GitHub = 2 (6px, round). Beacon v1 = 3 (8px ×18, 12px ×6, round). task-manager = 2 (6px
×50, 4px ×5; the `3px` ×1 is a status rail, not a corner). This also reconciles
[`../evaluation/results/2026-09-control-vs-treatment.md`](../evaluation/results/2026-09-control-vs-treatment.md),
whose "10 → 4" and "10 → 3" are counts of *distinct values*, not families; as families those
treatments are 2 and 2.

**Left edges: run the scan on left-aligned content only.** Right-aligned numeric columns
*legitimately* produce a different left edge per row, because the digits are different widths. Run a
**right**-edge scan on those instead — a numeric column whose right edges vary is the real bug there,
and it means you forgot `font-variant-numeric: tabular-nums`. This caveat is why the task-manager's
~20 singleton left edges are not a finding: every one of them is in the right-hand metadata.

**Contrarian note on the 8px grid:** GitHub's dominant gap is **4px**, and its 12px value appears 3
times against 4px's 152. A strict 8px grid would have forced every one of those 4px gaps to 8 and
halved the information density of the issue list. The rule that matters is *few values, clearly
related*, not *multiples of eight*. 4/8/16 is a scale. So is 6/12/24. 6/8/10/12/24 is not.

---
