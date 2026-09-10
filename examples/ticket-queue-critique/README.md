# Worked example — ticket queue, before and after

The artifact critiqued in [`../../anti-patterns/visual-critique-method.md`](../../anti-patterns/visual-critique-method.md) §9.

| File | What it is |
|---|---|
| `v1.html` | The mediocre build. A credible one — real domain content, derived data, clean CSS, one accent, one spacing rhythm. Scores **3** on vibecode risk and **3.4** on craft. |
| `v2.html` | The same screen after the eleven fixes in §9.4, plus the many-items state (20 rows rather than a fixture-sized 8). Craft **7.1**, two findings still open. |
| `tools/look.mjs` | plain / blur6 / blur14 / grayscale / rotate-180 captures of any URL |
| `tools/probe.mjs` | computed-style census: font sizes, gaps, radii, hues, containers, focus-rule counts, left-edge histogram |
| `tools/inkbox.mjs` | ink bounding box vs element box, at 4×. **Demoted 2026-09-10** — `above − below` measures descenders, not centering; see `visual-critique-method.md` §"Cut: the optical-centering check" |
| `tools/fold.mjs` | where the content starts, at 1440 / 390 / 320 |

## Reproduce the critique

```bash
cd examples/ticket-queue-critique
python3 -m http.server 8971 &

node tools/fold.mjs   http://localhost:8971/v1.html          # content start at three widths
node tools/probe.mjs  http://localhost:8971/v1.html V1 1440  # the five counts
node tools/look.mjs   http://localhost:8971/v1.html v1       # the transform set — then LOOK at the PNGs
node tools/inkbox.mjs http://localhost:8971/v1.html .pill    # ink box (demoted; read the ink top only)

# then the same four against v2.html and diff the numbers
```

The headline deltas, measured:

| | v1 | v2 |
|---|---|---|
| First data row @1440×900 | 493px | **134px** |
| Rows fully visible | 5 | **19** |
| Bordered/shadowed containers above fold | 6 | **1** |
| Font sizes | 7 | **4** |
| Radius families | 4 | **2** |
| Accent hues | 5 | **3** |
| `:focus-visible` rules | 0 | 1 |
| Table columns clipped @390 | 644px | **0** |

`v1.html` is not a strawman. Read its markup before deciding it is: the ticket titles, the
customer domains and the failure descriptions are all specific and real, and the CSS has no
arbitrary values in it. That is the point — content specificity and visual craft are independent,
and an interface can pass every anti-slop check and still be badly made.
