# Design archetypes

An archetype is not a visual style to imitate. It is a **coherent set of answers** to the questions
every interface must answer — density, type scale, color restraint, navigation shell, motion
budget, which components are even appropriate — derived from what that product's users are actually
doing.

The reason to choose one consciously is that you are going to answer those questions anyway. The
choice is between answering them as a system, once, at the start, or answering them fifty times
incoherently while building components.

**Match the user's situation, not the industry and not the look you like.** Frequency of use,
stakes of error, information density, and expertise determine far more than the vertical does. A
veterinary practice-management tool is `enterprise-dense` with `healthcare-clinical` constraints,
not "a vet app."

---

## Selector

| The situation | Archetype | Density | Reference products |
|---|---|---|---|
| Power users, all day, keyboard, triage a queue | [`technical-productivity`](technical-productivity.md) | compact | Linear, Superhuman, Raycast, Missive |
| Developers are the users; docs are a product surface | [`developer-platform`](developer-platform.md) | compact–comfortable | Vercel, Stripe, Railway, Resend |
| Many resources, many roles, dense tables, saved views | [`enterprise-dense`](enterprise-dense.md) | compact | Attio, Retool, Datadog |
| The output is charts and answers to analytical questions | [`analytics-bi`](analytics-bi.md) | compact | Hex, Amplitude, PostHog, Sigma |
| Business money movement; correctness and audit matter | [`fintech-institutional`](fintech-institutional.md) | comfortable | Mercury, Ramp, Modern Treasury |
| Personal money; must feel warm as well as safe | [`fintech-consumer`](fintech-consumer.md) | comfortable–spacious | Cash App, Monzo, Revolut |
| Focused single-purpose tool; craft is the pitch | [`premium-minimal`](premium-minimal.md) | comfortable | Things, Arc, Bear, Flighty |
| Reading is the primary activity | [`editorial`](editorial.md) | spacious | NYT, Stripe docs, Increment |
| Brand and desire lead; the product is aspirational | [`luxury`](luxury.md) | spacious | Aesop, SSENSE, Rivian |
| Browse, filter, choose among many listings | [`consumer-marketplace`](consumer-marketplace.md) | comfortable | Airbnb, Etsy, Vinted |
| Sell products; conversion is the metric | [`ecommerce`](ecommerce.md) | comfortable | Shopify storefronts, Glossier |
| Consumer app with personality; engagement matters | [`expressive-consumer`](expressive-consumer.md) | comfortable–spacious | Duolingo, Discord, Spotify |
| A canvas or editor; the work is the foreground | [`creative-tool`](creative-tool.md) | compact chrome, open canvas | Figma, tldraw, Framer |
| Chat, generation, agents, streaming output | [`ai-product`](ai-product.md) | comfortable | ChatGPT, Perplexity, Cursor |
| Public service; clarity and inclusion are legal duties | [`institutional-civic`](institutional-civic.md) | spacious | GOV.UK, USWDS |
| Clinical or safety-critical; errors harm people | [`healthcare-clinical`](healthcare-clinical.md) | comfortable | Nord, Oscar |
| Feeds, profiles, posting, social graph | [`social-community`](social-community.md) | comfortable | Discord, Bluesky, Strava |
| A marketing site whose job is to persuade | [`premium-marketing`](premium-marketing.md) | spacious | Stripe, Linear, Anthropic |
| Internal back-office; nobody chose to use it | [`internal-utility`](internal-utility.md) | compact | Retool apps, admin panels |
| Real-time, extreme density, monitored continuously | [`data-terminal`](data-terminal.md) | very compact | Bloomberg, Grafana, trading UIs |

---

## Mixing

Real products span two. The rule: **one host, one guest.**

The **host** archetype governs the shell — navigation, density, type scale, neutral palette,
motion budget. The **guest** governs its own pane and nothing outside it.

- A bank with an AI assistant: `fintech-institutional` hosting an `ai-product` drawer. The
  assistant does not get to make the account list playful.
- A developer platform with a marketing site: two separate surfaces,
  `developer-platform` and `premium-marketing`, sharing tokens and diverging in scale and rhythm.
  The docs are not the landing page.
- An analytics product with a canvas query editor: `analytics-bi` hosting `creative-tool`.

**Never average two archetypes.** You get the personality of neither and the coherence of nothing.

---

## The four dimensions that separate them

If you understand these, you can derive an archetype you don't have a file for.

**1. Density** — set by frequency of use and volume of information.

| Level | Body | Row height | Who |
|---|---|---|---|
| very compact | 11–12px | 20–24px | continuously monitored terminals |
| compact | 13–14px | 28–32px | daily-for-hours tools |
| comfortable | 14–16px | 36–44px | weekly tools, consumer apps |
| spacious | 16–18px | 48px+ | reading, marketing, occasional and high-stakes |

Generated UI defaults to *comfortable* regardless of context, which is why so much of it is 30–40%
too airy for what it's doing. → [`../craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md)

**2. Color restraint** — set by how much meaning color must carry. A trading terminal uses color
for data and therefore must have almost no decorative color. A consumer app has few semantic
demands and can spend color on personality. Restraint is not a style preference; it is a budget.

**3. Motion budget** — set by frequency. Animation a user sees twice is delight; the same animation
seen four hundred times a day is an obstacle. High-frequency tools get 120–180ms functional
transitions and nothing else. Marketing pages, seen once, can afford choreography.

**4. Trust register** — set by stakes. Irreversible, expensive or health-affecting actions demand
restraint, precision, visible audit trails, and copy that does not joke. Playfulness on a wire
transfer is a trust failure regardless of execution quality.

---

## What every archetype file contains

- **The situation** — who, how often, what stakes, what they're doing
- **Density, type, color, radius, elevation, motion** — with specific values
- **Navigation shell** — and why that shell
- **Component logic** — what belongs here, what doesn't
- **Reference products** — and the single thing worth stealing from each
- **States** — what empty, loading and error look like *in this archetype*
- **Mobile** — how it adapts, or admits it shouldn't
- **The characteristic failure** — the specific bad version of this archetype, so you can recognize
  yourself doing it
- **Copy register** — with example strings

---

## Using an archetype without copying it

The failure mode is imitation: dark background, purple accent, 13px Inter, and calling it
`technical-productivity`. That produces a Linear-skin, not a product.

Take the **logic**, not the look. Linear's density comes from the fact that its users scan two
hundred issues a day. If your users scan twelve, the same density is wrong for you even though the
archetype matches on every other dimension. The archetype tells you *which questions matter and how
they interact*; your brief tells you what the answers are.

And then add your signature — the one domain-derived structural decision that could only belong to
your product. → [`../system/2-direction.md`](../system/2-direction.md)
