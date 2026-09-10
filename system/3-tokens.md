# 3 — Establish tokens

**Output: one file of custom properties, written before the first component.** Twenty minutes here
saves the interface. Every arbitrary value you write later is a small debt, and interfaces read as
unintentional when enough of them accumulate.

If the codebase already has tokens, **read them and use them.** A second design language inside one
product is worse than an imperfect but consistent one. Extend, don't replace.

---

## The discipline

The point of tokens is not organization, it is **forced scarcity**. A designer's interface looks
intentional because it contains six spacing values, not because it contains a spacing file. Keep
the counts small:

| Scale | How many | Why |
|---|---|---|
| Neutral steps | 10–12 | Enough for surface/border/text hierarchy in both themes |
| Accent | **1** (+ hover/active derivations) | Two accents means neither is the primary action |
| Semantic | 3–4 (success/warning/danger, sometimes info) | More becomes decoration |
| Type sizes | 5–7 | A dense product needs fewer than you think |
| Font weights | 3 | 400/500/600. Not 300, not 800. |
| Spacing steps | 8–10 | From a 4px base |
| Radii | 3–4 | Control / container / overlay / full |
| Shadows | 2–3 | Most elevation should be a border |
| Durations | 3 | micro / standard / large |

If you find yourself needing an eleventh spacing value, the layout is wrong, not the scale.

---

## The default system

This is a good, non-generic starting point — a warm neutral ramp, a single accent, a compact type
scale, borders instead of shadows. It is deliberately *not* the shadcn/Tailwind default, because
that default is now the visual signature of AI-generated software. Adapt it to your archetype;
don't ship it unchanged any more than you'd ship the default unchanged.

```css
/* app.css — Tailwind v4 (@theme) or plain CSS custom properties */
@theme {
  /* ── Neutrals ────────────────────────────────────────────────────────────
     Warm gray (hue 90, very low chroma). Warm neutrals read as considered;
     pure #808080 grays read as unstyled. Perceptually even steps via oklch. */
  --color-n-0:    oklch(1     0     0  );   /* pure white — cards on tinted ground */
  --color-n-25:   oklch(0.992 0.002 90 );   /* page ground (light) */
  --color-n-50:   oklch(0.980 0.003 90 );   /* sunken / hovered rows */
  --color-n-100:  oklch(0.962 0.004 90 );   /* subtle fills, disabled surfaces */
  --color-n-200:  oklch(0.922 0.005 90 );   /* border-subtle */
  --color-n-300:  oklch(0.872 0.006 90 );   /* border-default */
  --color-n-400:  oklch(0.790 0.007 90 );   /* border-strong, dividers on color */
  --color-n-500:  oklch(0.660 0.008 90 );   /* placeholder, disabled text, icons-quiet */
  --color-n-600:  oklch(0.470 0.008 90 );   /* text-muted   — 6.67:1 on n-25 */
  --color-n-700:  oklch(0.380 0.007 90 );
  --color-n-800:  oklch(0.290 0.006 90 );
  --color-n-900:  oklch(0.220 0.005 90 );   /* text-primary — 16.9:1 on n-25 */
  --color-n-950:  oklch(0.165 0.004 90 );   /* page ground (dark) */
  --color-n-1000: oklch(0.130 0.004 90 );

  /* ── Accent: exactly one ─────────────────────────────────────────────────
     Allowed uses: primary action, current selection, focus ring, active nav.
     Not allowed: headings, icons generally, borders generally, backgrounds. */
  --color-accent:       oklch(0.52 0.185 258);  /* white text on it: 5.65:1 */
  --color-accent-hover: oklch(0.47 0.185 258);
  --color-accent-quiet: oklch(0.96 0.030 258);  /* selected-row tint */
  --color-accent-ring:  oklch(0.62 0.170 258);

  /* ── Semantic: meaning only, never decoration ────────────────────────── */
  --color-success: oklch(0.52 0.130 150);
  --color-warning: oklch(0.62 0.140  75);
  --color-danger:  oklch(0.53 0.190  27);

  /* ── Type ────────────────────────────────────────────────────────────────
     Compact product scale. Marketing pages need a larger top end (see
     craft/typography.md); dashboards need this one. */
  --text-xs:   0.6875rem;  /*  11px — badges, table meta. Use sparingly. */
  --text-sm:   0.8125rem;  /*  13px — dense body, table cells, labels */
  --text-base: 0.875rem;   /*  14px — default UI body */
  --text-md:   1rem;       /*  16px — reading body, mobile inputs (prevents iOS zoom) */
  --text-lg:   1.25rem;    /*  20px — section titles */
  --text-xl:   1.75rem;    /*  28px — page titles */
  --text-2xl:  2.5rem;     /*  40px — hero (marketing only) */

  --font-sans: "Inter Variable", Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "Berkeley Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  /* ── Space: 4px base ─────────────────────────────────────────────────── */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-5: 1.5rem;   --space-6: 2rem;
  --space-7: 3rem;     --space-8: 4rem;     --space-9: 6rem;

  /* ── Radius: small and consistent ────────────────────────────────────── */
  --radius-sm: 4px;    /* inputs, buttons, chips */
  --radius-md: 6px;    /* containers, menus */
  --radius-lg: 10px;   /* modals, sheets */
  --radius-full: 9999px; /* avatars and status pills ONLY */

  /* ── Elevation: prefer borders. Shadows are for things that float. ───── */
  --shadow-pop:   0 1px 2px oklch(0 0 0 / 0.04), 0 4px 12px oklch(0 0 0 / 0.08);
  --shadow-modal: 0 8px 40px oklch(0 0 0 / 0.16);

  /* ── Motion ──────────────────────────────────────────────────────────── */
  --ease: cubic-bezier(0.2, 0, 0, 1);
  --dur-micro: 120ms;   /* hover, focus, checkbox */
  --dur-std:   180ms;   /* menus, popovers, tabs */
  --dur-large: 260ms;   /* drawers, page-level transitions */
}

/* ── Semantic layer: components reference THESE, never the ramp directly ── */
:root {
  --bg-page:      var(--color-n-25);
  --bg-surface:   var(--color-n-0);
  --bg-sunken:    var(--color-n-50);
  --bg-hover:     oklch(0 0 0 / 0.035);      /* overlay, not a solid — composes anywhere */
  --bg-selected:  var(--color-accent-quiet);

  --border-subtle: var(--color-n-200);
  --border:        var(--color-n-300);
  --border-strong: var(--color-n-400);

  --text:          var(--color-n-900);
  --text-muted:    var(--color-n-600);
  --text-disabled: var(--color-n-500);       /* never carries meaning — see below */
  --text-onaccent: var(--color-n-0);
}

/* ── Dark: re-map the semantic layer. Do NOT invert the ramp. ───────────── */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { color-scheme: dark; }
}
:root[data-theme="dark"], :root:not([data-theme="light"]):is(.dark, [data-mode="dark"]) {
  --bg-page:      var(--color-n-950);
  --bg-surface:   oklch(0.195 0.005 90);     /* elevation = lighter, not shadowed */
  --bg-sunken:    var(--color-n-1000);
  --bg-hover:     oklch(1 0 0 / 0.05);
  --bg-selected:  oklch(0.52 0.09 258 / 0.22);

  --border-subtle: oklch(1 0 0 / 0.07);      /* borders do more work in dark mode */
  --border:        oklch(1 0 0 / 0.11);
  --border-strong: oklch(1 0 0 / 0.18);

  --text:          oklch(0.965 0.002 90);
  --text-muted:    oklch(0.730 0.006 90);     /* 8.06:1 on n-950 */
  --text-disabled: oklch(0.560 0.006 90);
}
```

**Verify the contrast before you trust it:**

```bash
node tools/contrast.mjs "oklch(0.470 0.008 90)" "oklch(0.992 0.002 90)"   # muted text on page
node tools/contrast.mjs --pairs                                            # check the whole set
```

---

## Adapt to the archetype

The default above is calibrated for `technical-productivity` / `enterprise-dense`. Move it:

| Archetype | Changes |
|---|---|
| `institutional-civic`, `healthcare-clinical` | Body → 16–18px. Text contrast ≥ 7:1. Radius → 2–4px. No dark mode by default. Accent must pass AA as *text*, not just as a button. |
| `premium-marketing`, `luxury`, `editorial` | Add `--text-3xl`/`--text-4xl` (48–80px). Widen spacing at the top end (`--space-10: 8rem`). Consider a serif or a distinctive grotesque; the type IS the design here. |
| `fintech-institutional` | Tabular figures everywhere by default. Neutrals cooler (hue ~250, chroma 0.004). Semantic colors muted, not vivid. |
| `expressive-consumer`, `fintech-consumer` | Radius up (8–16px), one warm secondary accent permitted, larger type, more motion budget. Personality lives in illustration and copy more than in tokens. |
| `data-terminal`, `creative-tool` | Dark by default. Body 12–13px. Borders `oklch(1 0 0 / 0.08)`. Chroma near zero in neutrals so data color reads. |
| `ai-product` | Add tokens for streaming/tool-call/citation surfaces. Reading measure matters: `--measure: 68ch`. |

---

## Rules that matter more than the values

**One accent, and write down what it's for.** The accent line in your direction spec is the
enforcement mechanism. When you later want a colored icon or a colored heading, the answer is no.

**Three text colors, and only two of them carry meaning.** `--text` and `--text-muted` both pass
AA. `--text-disabled` does not, which is exactly why nothing meaningful may use it. The
three-levels-of-gray habit — where the third level is 12px at 3:1 — is both an accessibility
failure and the most common reason generated UI looks washed out.

**Elevation is a border until it floats.** A card that sits in the page needs a border, not a
shadow. A menu that overlays content needs a shadow because it is genuinely above the page. Two
shadow tokens is the correct number; a six-step elevation scale is enterprise ceremony that
produces mushy interfaces.

**Dark mode is a re-mapping, not an inversion.** Surfaces get *lighter* as they rise (no shadow is
visible on a dark ground). Accents need lower chroma and higher lightness in dark or they vibrate.
Pure `#000` causes halation against light text — start at ~`oklch(0.165)`. Borders carry far more
structural load in dark mode than in light.

**Hover as an overlay, not a solid.** `oklch(0 0 0 / 0.035)` composes correctly on white, on a
tinted row, on a selected row, and inside a dark panel. A solid hover color breaks the moment it
lands on any surface you didn't anticipate.

**Radius has meaning.** Pick a small set and apply it by element role, not by taste. If a container
has 10px radius and 8px padding, its inner elements should be 10 − 8 = 2px, not another 10px —
concentric radii that ignore the padding look wrong even to people who can't say why. Radius above
about 12px on structural surfaces is the strongest single visual tell of generated UI.

**Do not tokenize one-offs.** A z-index scale, a full elevation ladder, per-component color
tokens, and semantic aliases for values used once are overhead that makes the system harder to
hold. Tokenize what repeats.

---

## Fonts

Loading a webfont is a real decision, not a default. → [`craft/typography.md`](../craft/typography.md)

- Self-host (`fontsource`, `next/font`) — never a render-blocking third-party stylesheet.
- `font-display: swap` plus a metric-matched fallback, or you ship a layout shift.
- Ship the weights you named and no others. Three weights, `woff2`, subset to the scripts you use.
- Variable fonts are usually the right call above two weights.
- `font-variant-numeric: tabular-nums` on every table, every price, every metric, every timestamp.
  This one line fixes the jitter that makes generated data UI feel cheap.

---

## Before moving on

- [ ] Every value in the direction spec exists as a token.
- [ ] The accent's permitted uses are written down.
- [ ] Dark mode (if shipping) is a re-map, verified by eye, not an inversion.
- [ ] `node tools/contrast.mjs --pairs` passes for every text-on-surface pair you actually use.
- [ ] Tabular numerals are on for numeric contexts.
- [ ] Nothing in the file is there "just in case".

---

**Next:** [`4-stack.md`](4-stack.md) — choose primitives without inheriting their house style.
