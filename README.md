# UI Intelligence

A design-intelligence system for AI coding agents. It exists to solve one specific problem:
**AI-generated interfaces look AI-generated**, and that is a fixable engineering problem rather than
an inherent limit.

Not a component catalogue. Not a link collection. A decision procedure, a body of measured craft
knowledge taken from the best interfaces in the world, a set of ranked and opinionated library
verdicts, and a critique loop that forces an agent to render its work, look at it, and score it.

```
START-HERE.md         the router — the only file always read
system/               the eight-step procedure, discover → ship gates
archetypes/           20 product-design directions with their own density/type/color/motion logic
craft/                deep, measured guidance: typography, color, space, density, motion, copy…
references/           teardowns of exceptional products, with real extracted values
libraries/            evidence-backed, opinionated verdicts with a vibecode-risk column
patterns/             how real UX flows work: auth, onboarding, billing, search, AI…
anti-patterns/        the taxonomy of AI tells, the 0–10 rubric, the correction playbook
skills/               installable agent skills
tools/                screenshot, audit and contrast tooling — so "look at it" has no excuses
evaluation/           test briefs and results
automation/           the monthly cloud research routine that keeps this current
```

---

## Install

```bash
git clone <this repo> ~/Ayush/UI_Library && cd ~/Ayush/UI_Library
./install.sh
```

`install.sh` symlinks the four skills into `~/.claude/skills/`, verifies the tooling, and prints
the block to add to your global instructions.

**Manual:** symlink `skills/*` into `~/.claude/skills/` (Claude Code) or `~/.codex/skills/`
(Codex), and add the block from [`AGENTS.md`](AGENTS.md) to your global `CLAUDE.md` / `AGENTS.md`.

Set `UI_LIBRARY` if you clone it somewhere other than `~/Ayush/UI_Library`:

```bash
echo 'export UI_LIBRARY="$HOME/Ayush/UI_Library"' >> ~/.zshrc
```

**Requires:** Node 20+, and Playwright (`npm i -g playwright && npx playwright install chromium`)
for the screenshot and audit tools. `gh` CLI is used by the research automation, not by day-to-day
use.

---

## Skills

| Skill | Fires when |
|---|---|
| `ui-intelligence` | Any UI work. Routes into the procedure. |
| `ui-direction` | Starting something new — archetype, direction spec, tokens. |
| `ui-critique` | After building. Render, look, score, fix. |
| `ui-copy` | Writing or reviewing user-facing strings. |

---

## Tools

```bash
node tools/shot.mjs <url> --widths 1440,390 --out .cache/shots --name page
node tools/audit.mjs <url> --widths 1440,390,320
node tools/contrast.mjs "oklch(0.47 0.008 90)" "#fcfcfc"
node tools/contrast.mjs --pairs app/globals.css
```

- **`shot.mjs`** — screenshots at multiple widths so an agent can actually look at what it built.
  `--full`, `--dark`, `--scroll N`, `--wait MS`, `--click SELECTOR`.
- **`audit.mjs`** — axe-core, horizontal overflow, contrast, tiny text, touch targets,
  `<div onClick>`, plus a design-consistency scan that counts the distinct font sizes, radii,
  shadows and colors a page actually renders. A good proxy for whether the token system survived.
- **`contrast.mjs`** — WCAG contrast that understands `oklch()`, composites alpha, and can check
  every text/surface pair in a stylesheet at once.

---

## The idea in one paragraph

Interfaces built by agents fail in a consistent way, and the failure is procedural rather than
aesthetic. The default path — install a component library, accept its defaults, group everything
into cards, write plausible copy, never render the result — produces the same interface every time,
and the tells are specific and enumerable. This system replaces that path: choose a design
direction from the product's actual situation before writing CSS; build a small token system and
stay inside it; use libraries for behavior and supply your own visual language; ship the states
that separate a product from a mockup; then screenshot the result, look at it, score it against a
rubric with named observables, and fix structure before surface. None of that is novel to designers.
The contribution is making it executable by an agent, with tooling that makes the looking real.

The failure mode opposite to *generic* is *trying too hard*, and it is worse. The goal is
**intentional**, not unusual.

---

## Freshness

Every file carries an `Evaluated:` date. A verdict older than about six months should be re-checked
before it's trusted. [`automation/`](automation/) holds a scheduled cloud routine that re-runs the
research monthly, challenges existing recommendations, tracks the evolving vocabulary of
AI-generated UI, and records what changed and why in
[`automation/CHANGELOG.md`](automation/CHANGELOG.md). It curates rather than accumulates — "no
changes warranted" is a legitimate month.

## License

Research, judgments and prose: use freely. Third-party libraries and design systems referenced here
carry their own licenses; the library records them. Product teardowns exist to extract principles,
not to encourage copying proprietary interfaces or code.
