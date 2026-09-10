# Automation

## Monthly research routine — live

A scheduled **cloud** agent keeps this library from becoming a snapshot. It runs in Anthropic's
cloud infrastructure, not on this machine, so nothing local needs to be powered on.

| | |
|---|---|
| **Routine ID** | `trig_01T1Rnu3b45hiBgq3Lm765y4` |
| **Console** | https://claude.ai/code/routines/trig_01T1Rnu3b45hiBgq3Lm765y4 |
| **Schedule** | `17 16 1 * *` — 1st of each month, 16:17 UTC (9:17am America/Los_Angeles) |
| **Next run** | 2026-10-01T16:17:00Z |
| **Model** | `claude-opus-5` — this task is judgment-bound, not throughput-bound |
| **Repo** | `github.com/ayushg8/ui-intelligence` (cloned fresh each run; commits and pushes back) |
| **Tools** | Bash, Read, Write, Edit, Glob, Grep, WebSearch, WebFetch |
| **Spec** | [`monthly-research/PROMPT.md`](monthly-research/PROMPT.md) — the routine reads this first, and it governs |
| **Output** | Edits in place + a dated entry in [`CHANGELOG.md`](CHANGELOG.md) |

The routine's inline prompt is deliberately a pointer: the real specification lives in
`monthly-research/PROMPT.md` **inside the repo**, so the task can be improved by editing a file and
pushing, without touching the routine.

### What it does each month

1. Installs Playwright and smoke-tests the screenshot tool — because looking at interfaces is the
   whole point, and a run that silently skipped looking must say so.
2. Sweeps GitHub, npm, X, Reddit, HN, Product Hunt, design blogs and reference sites — for new
   candidates *and* for the negative signals: archived repos, license changes, slowed maintenance,
   superseded recommendations.
3. Re-examines current v0 / Lovable / Bolt / Replit Agent output against
   `anti-patterns/vibecode-taxonomy.md`. This is the most time-sensitive part of the library — the
   vocabulary of AI-generated UI changes as the tools change, and a taxonomy describing last year's
   tells is worse than useless.
4. Evaluates candidates on verified evidence plus its own visual judgment. New, trending and viral
   are reasons to investigate, never reasons to recommend.
5. **Actively tries to unseat the incumbents.** A month with no demotions is usually a month with
   no real curation.
6. Commits and pushes, recording what changed and why.

### Guardrails written into the spec

- Curation, not collection. `"No changes warranted"` is a legitimate and valuable month.
- Never add a resource it has not looked at, or one without a tier, verdict and reason.
- `Evaluated:` dates change only on entries actually re-checked — a false freshness date is worse
  than a stale one.
- Category files are capped; growth means cutting the weakest entry, not appending.
- The library's structure is not to be reorganized; its consumers depend on the shape.

### Managing it

```
RemoteTrigger {action: "get",       trigger_id: "trig_01T1Rnu3b45hiBgq3Lm765y4"}   # config, next run
RemoteTrigger {action: "run",       trigger_id: "trig_01T1Rnu3b45hiBgq3Lm765y4"}   # run now
RemoteTrigger {action: "list_runs", trigger_id: "trig_01T1Rnu3b45hiBgq3Lm765y4"}   # history
RemoteTrigger {action: "get_run_log", session_id: "<from list_runs>"}              # debug a run
RemoteTrigger {action: "update",    trigger_id: "...", body: {enabled: false}}     # pause
```

Deletion is only available from the web console (link above).

### If a run can't push

The cloud environment clones over HTTPS; if the checkout lacks push credentials for this private
repo, the run reports that in its final message with a diff summary rather than losing the work.
Check `list_runs` → `get_run_log` after the first execution on 2026-10-01 and, if push failed,
either make the repo's credentials available to the routine's environment or have the run open a
patch you apply locally.

### Reviewing the output

The routine is a curator, not an authority. Read `CHANGELOG.md` after each run. If a month's
changes look like accumulation rather than curation — many additions, no demotions, thin reasoning
— tighten `monthly-research/PROMPT.md` and push; the next run picks it up automatically.
