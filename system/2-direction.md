# 2 — Choose the design direction

**Input:** the six-line brief. **Output:** a named archetype, a written direction spec, and one
signature decision. **Time: 5 minutes.**

Skipping this step is what produces interfaces that are "fine" — technically competent, visually
anonymous, indistinguishable from every other product built the same week. An interface without a
direction defaults to the aesthetic of whatever library you installed.

---

## Pick the archetype

Archetypes are not visual styles to imitate. Each one is a coherent set of answers to density,
type, color, motion, and component questions, derived from what its users are actually doing. Match
the situation, not the look you like.

| If the brief says… | Archetype | Reference products |
|---|---|---|
| Power users, all day, keyboard, triage a queue | [`technical-productivity`](../archetypes/technical-productivity.md) | Linear, Superhuman, Height, Raycast |
| Developers are the users; docs are a product surface | [`developer-platform`](../archetypes/developer-platform.md) | Vercel, Stripe, Railway, Resend |
| Many resources, many roles, dense tables, saved views | [`enterprise-dense`](../archetypes/enterprise-dense.md) | Attio, Retool, Datadog |
| The output is charts and answers to analytical questions | [`analytics-bi`](../archetypes/analytics-bi.md) | Hex, Amplitude, PostHog, Sigma |
| Business money movement; correctness and audit matter | [`fintech-institutional`](../archetypes/fintech-institutional.md) | Mercury, Ramp, Modern Treasury |
| Personal money; must feel warm as well as safe | [`fintech-consumer`](../archetypes/fintech-consumer.md) | Cash App, Monzo, Revolut |
| Focused single-purpose tool; craft is the pitch | [`premium-minimal`](../archetypes/premium-minimal.md) | Things, Arc, Bear, Flighty |
| Reading is the primary activity | [`editorial`](../archetypes/editorial.md) | NYT, Stripe docs, Increment |
| Brand and desire lead; the product is aspirational | [`luxury`](../archetypes/luxury.md) | Aesop, SSENSE, Rivian |
| Browse, filter, choose between many listings | [`consumer-marketplace`](../archetypes/consumer-marketplace.md) | Airbnb, Etsy, Vinted |
| Sell products; conversion is the metric | [`ecommerce`](../archetypes/ecommerce.md) | Shopify storefronts, Glossier |
| Consumer app with personality; engagement matters | [`expressive-consumer`](../archetypes/expressive-consumer.md) | Duolingo, Discord, Spotify |
| A canvas or editor; the work is the foreground | [`creative-tool`](../archetypes/creative-tool.md) | Figma, tldraw, Framer |
| Chat, generation, agents, streaming output | [`ai-product`](../archetypes/ai-product.md) | ChatGPT, Perplexity, Cursor |
| Public service; clarity and inclusion are legal duties | [`institutional-civic`](../archetypes/institutional-civic.md) | GOV.UK, USWDS |
| Clinical or safety-critical; errors harm people | [`healthcare-clinical`](../archetypes/healthcare-clinical.md) | Nord, Epic (as counter-example) |
| Feeds, profiles, posting, social graph | [`social-community`](../archetypes/social-community.md) | Discord, Bluesky, Strava |
| A marketing site whose job is to persuade | [`premium-marketing`](../archetypes/premium-marketing.md) | Stripe, Linear, Anthropic |
| Internal back-office; nobody chose to use it | [`internal-utility`](../archetypes/internal-utility.md) | Retool apps, admin panels |
| Real-time, extreme density, monitored continuously | [`data-terminal`](../archetypes/data-terminal.md) | Bloomberg, Grafana, trading UIs |

**Mixing.** Real products span two. A fintech product with an AI assistant is
`fintech-institutional` *hosting* an `ai-product` surface — the host archetype wins for shell,
density, type and color; the guest archetype governs its own pane. Never average two archetypes
into one; you get the personality of neither. Pick a host and name it.

**When none fit,** pick the closest by *user situation* — frequency, stakes, density, expertise —
not by industry. A veterinary practice-management tool is `enterprise-dense` with
`healthcare-clinical` constraints, not "a vet app".

Read the archetype file now. It is short and it will answer most of your next fifty decisions.

---

## Write the direction spec

Before any code. Ten lines. This is the contract you hold yourself to and critique against.

```
Archetype:   technical-productivity
Density:     compact — 28px rows, 13px body, 32px header
Type:        Inter var (fallback system) · 13/14/16/20/28 · weights 400/500/600
             tabular numerals in all tables
Neutrals:    12-step warm-gray ramp, oklch; surface #FCFCFC / raised #FFF / dark inverted
Accent:      one blue (#2563EB-ish, verify contrast), used for: primary action, selection,
             focus ring. Nothing else.
Semantics:   green settled · amber pending · red failed. Never as decoration.
Radius:      4px controls, 6px containers, 0 on full-bleed. No pills except tags/status.
Elevation:   borders, not shadows. One shadow, for overlays only.
Motion:      120ms micro, 180ms panel, ease-out. No entrance animations. Reduced-motion honored.
Chrome:      left sidebar 224px, no top bar, command palette as primary navigation.
Signature:   the lane-status rail — a 4px colored edge on each row encoding on-time/at-risk/late,
             readable at a glance down a 200-row list without adding a column.
```

Rules for the spec:

- **Every number must be justified by the brief**, not by habit. 28px rows because dispatchers scan
  200 shipments; not because 28 is a nice number.
- **The accent line must name what the accent is allowed to do.** Writing this down is what stops
  color from leaking everywhere later.
- **If you cannot fill a line, you have not made the decision** — make it now, not implicitly at
  2am inside a component.

→ [`3-tokens.md`](3-tokens.md) turns this into actual code.

---

## The signature decision

This is the difference between an interface that is *correct* and one that is *specific to this
product*. Pick **one** — exactly one — deliberate, non-default choice that could only belong to
this product, and execute it well.

It must **come from the domain**, not from a mood board. Good signatures answer a real question the
product's users have:

- A freight console encodes on-time/at-risk/late as a 4px rail on every row — the dispatcher's
  entire job is scanning for exceptions.
- A calendar product renders duration as literal vertical height everywhere it appears, including
  in lists, so a 15-minute and a 3-hour meeting never look alike.
- A code-review tool gives the diff a full-bleed column and pushes all metadata into a collapsed
  rail, because the diff is what you came for.
- A bank shows the pending balance in the same weight and position as the settled balance, in a
  different color, because "how much can I actually spend" is the only question.
- A music app makes the album art the layout grid rather than an avatar in a row.

What a signature is **not**: a gradient, a custom cursor, a scroll animation, an unusual font, a
dark mode with a neon accent, a bento grid, a 3D hero. Those are style applied on top. A signature
is a structural decision about how this product's information is shaped.

**One.** Two signatures compete and read as noise. The rest of the interface should be quiet enough
that the signature is legible.

---

## Distinctiveness without trying too hard

The failure opposite to *generic* is *effortful*, and it is worse: an interface that is
straining is harder to fix than one that is bland, and users read it as amateur rather than as
neutral. The line:

- **Distinctive** = a choice that serves the product's job and would be wrong for a different
  product. Signature decisions, real content given priority, a type or color choice that fits the
  domain, density calibrated to actual usage.
- **Effortful** = a choice that serves the designer's need to be noticed. Novel navigation, motion
  that delays the user, custom scrollbars, unconventional layouts that make you hunt, "delight"
  that costs a click.

Test: *does this choice make the product better at its job, or only more memorable?* Ship the
first; delete the second.

**Convention is not the enemy.** A login form should look like a login form. Users spend 95% of
their time in other products and arrive with expectations; spending your originality budget on
familiar patterns leaves nothing for the parts that are actually yours. Be conventional in the
plumbing and specific in the substance.

---

## Sanity check before you continue

- Could this direction spec describe a competitor's product equally well? Then it is not a
  direction, it is a default. Sharpen the density, the accent rule, or the signature.
- Does the direction match the *stakes*? A playful direction on an irreversible-money product is a
  trust failure regardless of how well it is executed.
- Have you chosen dark mode by default because the product needs it (monitoring, media, night use,
  developer tools) or because it looks impressive in a screenshot? The second is a tell.
  → dark-by-default is right for `data-terminal`, `creative-tool`, and often
  `technical-productivity`; it is usually wrong for `institutional-civic`,
  `healthcare-clinical`, `ecommerce`, and anything read for long periods.

---

**Next:** [`3-tokens.md`](3-tokens.md) — turn the spec into a token system.
