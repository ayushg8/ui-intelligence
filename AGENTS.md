# Global instructions block

Add this to your global `~/.claude/CLAUDE.md` and/or `~/.codex/AGENTS.md`. Keep it short — it is
loaded into every session, and its only job is to route into the library, which is not.

```markdown
## UI work

Building or changing any user interface — app, dashboard, internal tool, landing page, mobile
screen, component, design system — routes through the UI intelligence library at
`~/Ayush/UI_Library` (or `$UI_LIBRARY`). Read its `START-HERE.md` before writing UI code, not
after. Invoke the `ui-intelligence` skill; use `ui-direction` when starting something new,
`ui-critique` after building, `ui-copy` for user-facing strings.

Non-negotiable regardless of how small the task looks:

1. Name the archetype and write a direction spec before writing CSS.
2. Tokens before components; then no arbitrary values.
3. Real, varied, domain-specific content. Never lorem, never uniform fakes.
4. A card must be an independently actionable object. Never nest one.
5. One accent color, used rarely. Hierarchy from size, weight and space — not decoration.
6. Density is a decision. Default AI output is 30–40% too airy for its purpose.
7. Every data surface ships empty, loading, error and too-much states.
8. Nothing moves on hover. Focus rings are never removed.
9. **Render it and look at it** — `node $UI_LIBRARY/tools/shot.mjs <url> --widths 1440,390`, then
   open the PNGs. You cannot judge visual design by reading JSX. Then
   `node $UI_LIBRARY/tools/audit.mjs <url> --widths 1440,390,320`.
10. Score against `anti-patterns/vibecode-rubric.md`. Target ≤2. Fix structure before surface.

Report what you rendered, what you checked, the score and why, and what you skipped. Not "I've
created a clean, modern interface."
```

---

## Even shorter

If your global instructions are already crowded:

```markdown
## UI work
Any UI task: read `~/Ayush/UI_Library/START-HERE.md` first and follow its procedure. Render the
result with `tools/shot.mjs`, look at the screenshots, and score with `anti-patterns/vibecode-rubric.md`
before calling it done.
```

---

## Codex and other harnesses

The library is plain Markdown plus three Node scripts; nothing is Claude-specific. For a harness
without skills, point at `START-HERE.md` from the global instructions file — the routing table and
the procedure work the same way. The tools need Node 20+ and Playwright.

---

## Project-level override

A project with its own design system should say so in its local `CLAUDE.md`/`AGENTS.md`:

```markdown
## UI
This project has an established design language in `src/styles/tokens.css` and `src/components/`.
Read those first — they win over the UI library's defaults. Use the library for procedure
(`system/5-build.md` onward), craft references, and the critique loop; ignore its token defaults
and archetype selection, both of which are already decided here.
```

The library is opinionated about method and deferential about an existing system. A second design
language inside one product is worse than an imperfect but consistent one.
