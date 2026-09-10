# AI-native products

**Evaluated:** 2026-09

All numbers below were pulled live at 1440×900, DPR 2, real Chrome 140 (macOS), September 2026 — either by reading computed styles / CSS custom properties out of the running page, or by measuring a screenshot I actually looked at. Where a product is behind a login I used its marketing, changelog or docs pages, which for this archetype are unusually honest: Cursor's changelog, Devin's homepage and Anthropic's Claude Code page all render real product chrome, not mockups. Anything I did not measure is marked "approx." or left out.

## What this archetype is for

Products where a language model is the engine of the primary task, not a helper bolted onto it: the general assistants (ChatGPT, Claude, Perplexity, Duck.ai, t3.chat), the code agents (Claude Code, Cursor, Devin, Amp, Bolt, v0, Lovable), the generative-media tools (Suno, ElevenLabs, Runway, Midjourney, Gamma), and the "AI inside an existing product" cases (Linear's coding sessions, Notion AI, Granola). The user situation is always the same shape and it is the hard part: the person types an under-specified request, waits an unpredictable amount of time, and then has to decide whether to trust an artifact they did not watch being made. Every good decision in this archetype is about compressing that wait and making the trust decision cheap. Products that just wrap a model in a message list do not belong here — they belong in the failure section.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **ChatGPT** | The default everyone benchmarks against; its design system is fully exposed in CSS variables | Body text is **17px/24px**, not 16. The composer is a 52px-tall, 28px-radius pill with an almost-invisible shadow (`0 1px 1px #00000008`). |
| **Claude Code (desktop)** | Best-in-class tool-call disclosure in a consumer-shaped surface | Collapsed tool lines read as **past-tense prose** — "Read 3 files, searched the checkout flow ›" — not as `Tool: read_file`. |
| **Claude Code (terminal)** | The most complete keyboard contract in the archetype | `Esc` interrupts and **keeps the work so far**; `Esc Esc` clears the draft *or* opens a rewind menu depending on whether the input is empty. |
| **Perplexity** | The citation and "answer as a document" reference | Tabs at the top of the *answer* (Answer / Links / Images) plus a persistent right-rail Sources card, so provenance never costs a scroll. |
| **Cursor** | The most sophisticated pre-flight composer | Run target (`Cloud / This Mac / Remote Machines ▸`) is chosen **above** the composer, model and effort **below** it. Origin above, cost below. |
| **Devin** | Long-running agent progress done as a receipt, not a spinner | Collapsed step lines are **"Worked for 4m 13s +25 −131"** — elapsed time and net diff, not "Thinking…". |
| **Bolt / v0 / Lovable** | Three variants of the same prompt-to-app composer | The send button is labeled with the outcome verb ("Build now"), never a paper plane. |
| **Suno** | Generative media that keeps a structured escape hatch | A single "Advanced" chip next to the prompt converts a free-text request into a form. |
| **ElevenLabs** | Proof that not every AI product should be a chat | A two-step breadcrumb wizard — *Select a voice › Generate speech* — beats a chat box for a parameterised task. |
| **Linear (agents)** | The best "AI inside an existing product" | The agent is an **assignee**, so it inherits the issue, the status, the inbox, and the mobile review flow. No drawer. |
| **Granola** | AI that edits your artifact instead of talking about it | AI output lands *in the user's own note*, visually attributed, rather than in a side panel. |
| **Duck.ai** *(not on the brief)* | Found by looking for a full chat product that is usable with zero login, to measure a real composer end to end | The send affordance is the word **"Ask"**, greyed until valid — a verb, not an icon. |
| **t3.chat** *(not on the brief)* | Found the same way — a speed-obsessed indie chat client whose whole thesis is latency; publicly usable, fully measurable | Composer is bottom-anchored with `border-radius: 20px 20px 0 0` — it is a *sheet rising out of the viewport edge*, not a floating pill. |
| **AI Elements + Streamdown** *(not on the brief)* | Found by asking "who has already named these primitives?" — Vercel shipped an open component registry for exactly this archetype, so its defaults are the de-facto spec | The canonical tool-call state machine, verbatim: **Pending / Awaiting Approval / Responded / Running / Completed / Error**. |
| **Amp** *(not on the brief)* | Found while looking for agent products whose *marketing* shows real long-running-agent UI | Frames each agent as owning an environment ("orb") you can open, not a chat you can read. |

## Measured specifics

### ChatGPT — extracted from `getComputedStyle(document.documentElement)` on chatgpt.com

Type scale (all values are the literal token contents):

| Token | Value | In px |
|---|---|---|
| `--typography-display` | `400 2.125rem/1.20588` | 34 / 41 |
| `--typography-title-large` | `400 1.75rem/1.21429`, ls `-.025rem` | 28 / 34, −0.4 |
| `--typography-title-medium` | `500 1.375rem/1.27273` | 22 / 28 |
| `--typography-title-small` | `500 1.25rem/1.25` | 20 / 25 |
| `--typography-body` | `400 1.0625rem/1.41177`, ls `-.0125rem` | **17 / 24, −0.2** |
| `--typography-subhead` | `400 .9375rem/1.33333` | 15 / 20 |
| `--typography-body-small` | `400 .875rem/1.28571` | 14 / 18 |
| `--typography-footnote` | `400 .8125rem/1.38462` | 13 / 18 |
| `--typography-caption` | `400 .75rem/1.33333` | 12 / 16 |
| `--typography-code` | `400 .8125rem/1.38462 ui-monospace` | **13 / 18** |

Neutrals, in OKLCH lightness (chroma 0 throughout — a genuinely neutral ramp, no blue tint):

`--gray-25` 99.1% · `50` 98.2% · `75` 96.4% · `100` 93.1% · `200` 84.8% · `300` 75.4% · `400` 65.0% · `500` 47.8% · `600` 37.5% · `700` 30.9% · `800` 24.8% · `900` 20.9% · `950` 18.7% · `1000` 15.9%

Applied as exactly three text tiers: `--text-color-primary` = L15.9%, `--text-color-secondary` = L47.8%, `--text-color-tertiary` = L65.0%. Three borders: `--border-color-subtle` `#0000000d` (5%), `--border-color-default` `#0000001a` (10%), `--border-color-emphasis` `#0003` (20%). Three surfaces: `#fff`, L96.4%, L93.1%.

Radius scale: `xs .25rem` (4) · `sm .375rem` (6) · `md .625rem` (10) · `lg .875rem` (14) · `xl 1.25rem` (20) · `2xl 1.75rem` (28) · `full 62.4375rem`. Note the **10 and 14** — this is not a doubling scale.

Spacing tokens: `0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64` px. Six and ten are first-class.

Composer, measured on the live element (`form.wm-composer-composer`):
- width **768px**, height **52px** at rest, `border-radius: 28px`, `padding: 7px 10px`, `border: 1px rgba(0,0,0,0.2)`
- shadow: `0 0 0 1px rgba(0,0,0,.04), 0 2px 8px rgba(0,0,0,.04), 0 4px 80px 8px rgba(0,0,0,.024)` — a hairline ring, a tight lift, and an 80px-blur ambient wash
- backed by tokens `--component-conversation-composer-min-height: 3.25rem`, `--component-conversation-composer-radius: 1.75rem`, `--composer-shadow: 0 1px 1px #00000008`
- inner textarea: **17px/24px**, zero padding, transparent background

Sidebar, measured on the live rows: rail width `--wm-desktop-sidebar-width: 260px`, nav rows **36px tall × 248px wide**, `border-radius: 10px`, `padding: 6px 10px`, label **16px/24px weight 400** with `-0.08px` tracking, `gap: 6px` to the icon. So the row is 248 of 260px — a **6px gutter each side**, and the 36px height with a 24px label leaves 6px of vertical breathing room. Everything in the rail is on a 6/10 rhythm, not 8/12.

Other useful values: `--button-height-md: 2.75rem` (44px) · `--glass-shadow: 0 4px 24px #0000001a` · sidebar float button uses `backdrop-filter: blur(25px) saturate(1.12)` · `--corner-shape-continuous: superellipse(1.1)` (real CSS squircles) · disabled primary button background is `--gray-300` (L75.4%), i.e. a *filled grey*, never a reduced opacity · empty-state `h1` is **24px/28px at weight 400**, letter-spacing **+0.07px** — regular weight, slightly loosened.

### Perplexity — computed styles on the live answer page

| Element | Measured |
|---|---|
| Page background | `color(srgb 0.992157 0.984314 0.980392)` ≈ `#FDFBFA` — warm off-white, not `#fff` |
| Body text | `rgb(39, 37, 30)` = `#27251E` — warm near-black |
| Muted text | `rgba(39, 37, 30, 0.65)` — same ink at 65%, not a separate grey |
| Font | `pplxSans` (custom) |
| Answer paragraph | **16px / 26px**, measure **720px** |
| Mode chip ("Search ⌄") | h **32px**, `radius 9999px`, 14px/20px, `padding: 0 12px 0 8px` |
| Model chip | h 32px, `radius 9999px`, `padding: 0 12px` |
| Suggestion card | **312 × 88**, `border-radius: 11px`, `padding: 16px`, bg `rgba(39,26,0,0.035)` |

That **11px radius** and the `rgba(39,26,0,0.035)` warm-tinted surface are both deliberate off-grid choices — a 12px radius on a warm ground reads slightly rounder than it should, and a pure-black 3.5% overlay would go grey-blue against `#FDFBFA`.

### t3.chat — computed styles + design tokens

- Fonts: `--font-sans: ProximaVara`, `--font-mono: BerkeleyMono`
- Light ground `rgb(242,225,244)`, ink `rgb(80,24,84)`
- Composer shell: **768px** wide, `border-radius: 20px 20px 0 0`, `padding: 8px 8px 0`, background `rgba(255,255,255,0.1)`, 130px tall
- Inner textarea: 726px, **16px/24px**, letter-spacing **+0.24px** (applied globally — an unusual, slightly airy choice for a dense product)
- Icon buttons: **32 × 32**, `radius 6px`, label 14px/20px weight 500
- Transition: `color .15s cubic-bezier(.4,0,.2,1), background-color .15s cubic-bezier(.4,0,.2,1)` — **150ms, colour only**. Nothing moves on hover.
- Model cost indicator uses `font-mono tabular-nums` at **10px/13.33px, ls −0.25px**
- Dark theme tokens: `--background #21141e` · `--foreground #f9f8fb` · `--card #0b080b` · `--popover #100a0e` · `--border #27242c` · `--input #302029` · `--sidebar-background #131314` · `--muted #423a45` · `--muted-foreground #e7d0dd` · `--primary #a3004c` · `--ring #db2777`. Note the sidebar is *darker* than the page (`#131314` vs `#21141e`) — the rail recedes, the conversation comes forward.

### Duck.ai — computed styles

- Composer shell: **640 × 104**, `border-radius: 24px`, background `#fff`, and the outline is `box-shadow: 0 0 0 1px rgba(0,0,0,0.08)` — a **shadow ring, not a border**, so focus can thicken it without reflowing layout
- Textarea: **16px/28px**, `padding: 16px 48px 12px 20px` — the 48px right inset is a permanently reserved lane for the mic
- Shell `padding-bottom: 48px` reserves the toolbar row before any control renders, so the box never grows when tools appear
- Base font size is **14.4px** (`0.9rem`), font `DuckSansProduct`

### AI Elements (Vercel's open registry) — the de-facto reference implementation

| Primitive | Measured |
|---|---|
| Tool card | `border-radius: 8px`, `border: 1px`, **no shadow**, `margin-bottom: 16px` |
| Tool header (button) | height **46px**, `padding: 12px`, `gap: 16px`, full width |
| Tool name | **14px/20px, weight 500, sans** — not monospace |
| Status pill | **12px/16px, weight 500**, `padding: 2px 8px`, height **22px**, `radius: full`, neutral fill |
| Prompt input shell | `border-radius: 8px`, `border: 1px` |
| Prompt input textarea | **14px/20px**, `padding: 12px`, min-height **64px** |
| Prompt toolbar button | height **32px**, `radius: 8px`, `padding: 8px 10px`, `gap: 6px`; icon-only variants are **32 × 32** |

Its component list is the best available taxonomy of what this archetype actually needs, and worth treating as a checklist: *Attachments, Chain of Thought, Checkpoint, Confirmation, Context, Conversation, Inline Citation, Message, Model Selector, Plan, Prompt Input, Queue, Reasoning, Shimmer, Sources, Suggestion, Task, Tool* — plus, for coding surfaces, *Agent, Artifact, Code Block, Commit*.

### Streamdown — the streaming-markdown renderer behind AI Elements' `Response`, with its published defaults

- `parseIncompleteMarkdown: true` by default, via a preprocessor called `remend`, which closes unterminated **bold, italic, bold-italic, inline code, strikethrough, links, images, KaTeX, setext headings, HTML tags** mid-stream
- Per-word reveal animation: `fadeIn` (default), `blurIn`, `slideUp`; **duration 150ms**, easing `ease`, `sep: "word"` or `"char"`; animations are removed entirely once streaming ends
- Streaming caret: `"block"` (▋) or `"circle"` (●), rendered **only** while `isAnimating && mode === "streaming"`
- `codeBlockMaxHeight: 400` (px) — taller blocks scroll internally; `lineNumbers: true`
- `tableMaxHeight: 300` (px)
- Code and table blocks **auto-pin to the bottom while streaming and unpin the moment the user scrolls up**
- Copy button is **disabled during streaming**
- External links get a confirmation modal by default (`linkSafety`)
- Default rehype chain: `rehype-raw`, `rehype-sanitize`, `rehype-harden` (allow-lists image and link prefixes)

If you build a chat surface and do not implement the first bullet, your bold text will flash on and off every time the model emits a `**`.

### Claude Code (terminal) — the documented keyboard contract

| Key | Behaviour worth copying |
|---|---|
| `Esc` | Interrupt mid-turn; **the work done so far is kept**, and any queued messages are sent next |
| `Esc Esc` | Input has text → clear it *and push it to history* so `Up` recalls it. Input empty → open the rewind menu |
| `Ctrl+C` | Interrupt if running; otherwise first press clears input, second exits |
| `Ctrl+D` | Exit — first press shows a hint, second press **within 800ms** confirms |
| `Ctrl+O` | Toggle transcript view; expands lines that collapse by default (e.g. a single `Called slack 3 times`) |
| `Ctrl+T` | Toggle the agent's own to-do checklist in the status area |
| `Ctrl+S` | Stash the prompt; press again on an empty prompt to restore text, cursor position and pasted content |
| `Shift+Tab` | Cycle permission modes: `default` → `acceptEdits` → `plan` → `bypassPermissions` |
| `Tab` | On a permission prompt with Yes/No focused, opens a **comment box** — you can approve *with a note* |
| Multiline | Four accepted ways: `\`+`Enter`, `Option+Enter`, `Shift+Enter`, `Ctrl+J` |
| Prefixes | `/` command · `!` shell · `@` file mention · `:` emoji · `?` on empty input toggles help |
| Enter while busy | **Queues** rather than interrupts; queued items list above the input; `Up` from line one pulls them back for editing |

## The decisions that make it work

**1. The composer is a fixed-height reserved frame, not a growing box.**
ChatGPT's composer is 52px tall with `padding: 7px 10px` and a 28px radius; Duck.ai's is 104px with `padding-bottom: 48px` reserved for the toolbar *before any toolbar control exists*; t3.chat's shell is 130px with the textarea occupying 726 of 768px. In all three the chrome around the text is allocated up front, so attaching a file or opening a model picker does not push the page. **Why it works:** the composer is the one element the user's eyes are locked to; any reflow there is felt as jank in a way the same reflow elsewhere is not. **The generic alternative** is a `<textarea>` with `rows={1}` and auto-grow, where adding an attachment chip jumps the whole conversation up 40px. **When it doesn't apply:** a single-shot search box with no attachments, no model picker and no modes — reserving 48px of empty toolbar there is just dead space.

**2. Send is a verb when the output is a thing, an arrow when the output is a reply.**
Bolt says **"Build now ➤"**, Suno says **"Create"**, Duck.ai says **"Ask"**, v0 and Lovable show a mic and let `Enter` do the work. ChatGPT and t3.chat use a circular up-arrow. The split is clean: products that produce a durable artifact name the artifact-producing act; products that continue a conversation use the arrow, because "Send" would be redundant with the message metaphor. **Why it works:** a labeled button sets an expectation about what is about to happen and how long it takes. "Build now" implies minutes; an arrow implies seconds. **The generic alternative** is a paper-plane icon on everything, which tells a first-time user of a code-gen product nothing about the fact that they are about to start a multi-minute job. **When it doesn't apply:** a follow-up composer inside an existing thread — Perplexity correctly drops to "Ask a follow-up" as placeholder with an icon button, because the verb is already established.

**3. Disabled send is a filled grey, never a faded control.**
ChatGPT's `--button-primary-background-color-disabled` is `oklch(75.4017% 0 none)` — literally `--gray-300`, a solid fill. Duck.ai's "Ask" goes to a mid-grey label. Neither uses `opacity`. **Why it works:** an opacity-faded button on a shadowed composer drags the shadow and the border down with it and reads as "broken", whereas a swapped fill reads as "not yet". **The generic alternative** is `disabled:opacity-50`, the Tailwind default, which is why so many AI composers look slightly smudged before you type. **When it doesn't apply:** icon-only ghost buttons with no fill — there, reducing the icon's colour token by one tier (primary → tertiary) is the right move.

**4. Tool calls collapse to one line of past-tense prose with the noun count in it.**
Claude Code's desktop transcript renders `Read 3 files, searched the checkout flow ›` and `Ran agent · Reproduce the double-submit against a test charge`. Claude Code's terminal collapses MCP activity to `Called slack 3 times`. Devin collapses a whole work block to `Worked for 4m 13s  +25 −131`. AI Elements' `Sources` trigger reads `Used 3 sources`; its `Reasoning` trigger reads `Thought for 4 seconds`. **Why it works:** a reader scanning a long transcript needs to know *what changed and how much*, and a count or a diffstat answers that in one saccade. The chevron is there for the 5% of cases where they need the argument JSON. **The generic alternative** is `🔧 Tool: read_file` with a spinner and a raw JSON blob below it, which is developer-console output pasted into a product. **When it doesn't apply:** a debugging or eval surface, where the raw request/response *is* the product and should be expanded by default.

**5. Reasoning auto-opens while it streams and auto-closes when it finishes.**
This is AI Elements' documented behaviour for `<Reasoning />` and it is the rule the good products converge on. While the model is thinking, the reasoning stream is the only thing moving, so it earns the space; the moment the answer starts, the reasoning becomes history and collapses to `Thought for 4 seconds`. **Why it works:** it solves the empty-wait problem without permanently taxing the transcript. **The generic alternative** is a reasoning panel that stays expanded forever, so a 12-turn conversation is 80% chain-of-thought the user has already read. The other generic alternative — collapsed the whole time — leaves a dead spinner during the longest, most anxious part of the interaction. **When it doesn't apply:** models with very short thinking phases (< ~1s), where the open-then-close animation is just a flicker; hold it collapsed and show the duration only.

**6. Tool calls have six states, not two, and "Awaiting Approval" is one of them.**
The canonical set, from AI Elements: **Pending, Awaiting Approval, Responded, Running, Completed, Error**, rendered as a 22px-tall, 12px/16px weight-500 pill with a state icon. `Pending` is the only one that renders expanded (showing `PARAMETERS`). **Why it works:** the confirmation gate is a *state of the tool call*, not a modal that interrupts the page. A modal steals focus and loses the context of which of four parallel calls is asking. An inline `Awaiting Approval` pill lets the user scroll, read the arguments, and approve in place. **The generic alternative** is `window.confirm`-shaped: a centered dialog saying "Allow this action?" with no arguments visible. **When it doesn't apply:** genuinely destructive, irreversible side effects (delete a production table, send money) — those deserve an interruption, and Claude Code's terminal pattern is instructive: the permission prompt is blocking, but `Tab` opens a comment field so you can approve *with an instruction* instead of a bare yes.

**7. Origin above the composer, cost below it.**
Cursor's composer puts `Start from scratch ⌄` and `☁ Cloud ⌄` **above** the input, and `+ · High Fast ⌄` **below** it. Claude Code's desktop composer puts permission mode (`Auto`), attachments and mic on the lower-left, and model (`Opus`) + effort (`Extra high`) on the lower-right. **Why it works:** things that change *what context this request runs against* are read before you type; things that change *what this request costs and how good it is* are adjusted after you've written it and are deciding how much to spend. The physical position matches the decision order. **The generic alternative** is one undifferentiated row of eight chips under the box, where "GPT-5" sits next to "Attach" sits next to "Web search" with no hierarchy. **When it doesn't apply:** single-model products — Bolt and Lovable have no model picker in the default composer at all, and are better for it.

**8. The primary transcript body is 16–17px at 1.4–1.63 line-height with a ~720px measure.**
Measured: ChatGPT `17px/24px` (1.41) with `-0.2px` tracking; Perplexity's answer paragraph `16px/26px` (1.63) at a **720px** measure; t3.chat body and composer `16px/24px` with `+0.24px` tracking; Duck.ai composer `16px/28px` (1.75 — looser still, because it is input rather than output). **Why it works:** this is reading-length prose that arrives progressively, so it needs book line-height, not UI line-height — but the container is a fixed column in an app, so 68–80 characters is the ceiling before the return sweep starts costing you. Note Perplexity, which is the most prose-heavy, uses the loosest leading (1.63); ChatGPT, which interleaves lists and code, uses the tightest (1.41). **The generic alternative** is 14px/1.5 because that's the app's default body size, which turns a 600-word answer into a wall. **When it doesn't apply:** the tool-call and metadata lanes inside the same transcript, which should drop to 12–14px — AI Elements uses 14px/20px for tool names and 12px/16px for status pills, and ChatGPT's `--typography-footnote` is 13px/18px.

**9. Code is 13px monospace, not 14px, and inline code is a chip, not just a font swap.**
ChatGPT's `--typography-code` is `400 .8125rem/1.38462 ui-monospace` — **13px/18px** — with a weight-500 emphasis variant. Claude Code's transcript renders `POST /charges` and `createCharge()` as inline chips with a tinted background, sitting inside 17px prose. **Why it works:** monospace at the same nominal size as the surrounding sans looks a full step larger because of its wider x-height and even advance width; dropping one step re-optically-aligns it. The chip background is what makes an identifier scannable inside a paragraph without breaking the line rhythm. **The generic alternative** is `font-family: monospace` at the inherited size with no background, which reads as a typo. **When it doesn't apply:** a code-first surface (a diff view, a terminal), where the code *is* the body text and should be 13–14px with no chip treatment at all.

**10. Long-running agent progress is a receipt, not a spinner.**
Devin's collapsed blocks are `Worked for 4m 13s  +25 −131` and `Used playbook: Test`; its session list rows read `1 hour ago · ⑂ 2 open`; embedded PR cards carry a green `Open` pill, the repo and number, the branch chips (`devin/USA-938-… → main`) and `6 files +21 −123`. Linear's coding sessions return a **diff for team review**, and its mobile app lets you comment on specific lines of that diff mid-session. **Why it works:** for a job that takes minutes, "in progress" is worthless — the user has switched tabs. What they need on return is a scannable ledger of what happened and what it touched. Elapsed time and a diffstat are the two facts that let them decide whether to read the detail. **The generic alternative** is a progress bar with a fake percentage, or worse, an animated "Devin is thinking…" that conveys nothing and cannot be resumed. **When it doesn't apply:** sub-10-second operations, where a receipt is over-engineering and a shimmer is correct.

**11. Suggestion chips carry their keyboard shortcut inline.**
Cursor's composer suggestions read `Plan New Idea ⇧Tab` and `Multitask` — the accelerator is *inside* the chip, in the same pill, not in a tooltip. OpenRouter puts `⌘J` inside the "Add Model" button and `⌘/` inside the sidebar's "New chat" row. **Why it works:** this archetype's power users live in the composer, and the only reliable way to teach a shortcut is to show it at the moment the user is about to click the thing it replaces. A tooltip requires a hover the user has no reason to perform. **The generic alternative** is a `?` cheatsheet modal nobody opens. **When it doesn't apply:** consumer surfaces with no keyboard culture and no repeat usage — a one-off signup flow with `⌘K` hints is showing off.

**12. Hover states change colour only, and never move anything.**
t3.chat's buttons transition exactly `color .15s cubic-bezier(.4,0,.2,1), background-color .15s cubic-bezier(.4,0,.2,1)` — 150ms, two properties, no transform, no border. ElevenLabs' voice rows swap the right-hand category label for a `Use voice` button and the avatar for a play triangle, *within the same row height*. **Why it works:** a transcript or a voice list is something you sweep the cursor across while reading. Any hover that adds a border, changes a radius, or lifts the row makes the whole list twitch. **The generic alternative** is `hover:shadow-md hover:-translate-y-0.5`, which is fine on a marketing card grid and terrible on a 40-row list. **When it doesn't apply:** low-density card grids — Perplexity's two 312×88 suggestion cards on an empty state can afford a lift, because there are two of them and you are not scanning.

## States, edges and the unglamorous parts

**Empty state, general assistant.** ChatGPT logged-out: an `h1` at **24px weight 400** reading "Where should we begin?", the composer, and **exactly one** chip — "What can you do?". t3.chat: "How can I help you?" plus four category chips (Create / Explore / Code / Learn) and four literal example questions as a bare list with hairline separators. Perplexity: a label ("Search"), a heading, the composer, and two 312×88 capability cards. The common rule is that the empty state is *four elements or fewer* and the composer is vertically centred, not bottom-pinned — the box moves to the bottom only once there is a conversation to sit above it. The generic version is a 3×3 grid of nine prompt suggestions, which reads as a menu the user must choose from rather than a box they can type anything into.

**Empty state, generative media.** Bolt shows four modality tiles (Website / Slides / App / Prototype) plus "or start from Figma / GitHub / Team template"; v0 shows four example chips *and a reroll button* to get four different ones; Suno shows a rotating headline that types itself ("Make a house song about quitting your job|" with a live caret). Generative products need more scaffolding than assistants because the user genuinely does not know what the input language is.

**First run.** HuggingChat gates on a modal explaining the router before the composer is usable. Duck.ai fuses a consent strip to the bottom edge of the composer card — inside the same shadow, reading as one object — with the copy "DuckDuckGo anonymizes your chats. By clicking 'Ask' you agree to our Privacy Policy and Terms of Service." t3.chat floats a dismissible strip *just above* the composer: "Make sure you agree to our Terms and our Privacy Policy ✕". The pattern worth copying is Duck.ai's: attach the disclosure to the control it governs, so it is read at the moment of the action and does not need a separate acknowledgement click.

**Rate-limited / gated.** Perplexity's logged-out limit is the most instructive thing I captured. Rather than an error banner, the assistant turn renders normally — summary line `Researched 0 steps`, then a body reading **"Sign up and repeat your request."**, then the *full* action row (copy, export, branch, thumbs up, thumbs down, ⋯). The message occupies the same slot with the same affordances a real answer would. Meanwhile a separate strip above the composer says "Sign in to save your history and access more features" with a `Sign in` button. **The lesson:** the limit is expressed as content in the conversation, not as a modal that destroys the thread, and the *next action* is stated as an imperative ("repeat your request"), not just as a wall.

**Errors inside a tool call.** They stay inside the collapsed tool card, as an `Error` pill (red x-circle) on the same 22px chrome as `Completed`, with the failure detail behind the chevron. The turn continues. This is the single most important error decision in the archetype: a failed tool call is not a failed conversation, and lifting it to a page-level toast breaks the causal chain between the step and its failure.

**Too much data.** Streamdown's defaults are the honest answer: code blocks scroll internally past **400px**, tables past **300px**, and both auto-pin to the bottom while streaming but release the pin the instant the user scrolls up. That last rule is the one everyone forgets — an auto-scrolling container that fights the user is worse than no auto-scroll at all.

**Copy during stream.** Disabled. Copying a half-finished code block produces a broken paste, and there is no way to signal that after the fact.

**Interruption.** `Esc` in Claude Code stops the turn and **keeps the work already done**, then immediately sends anything queued. This is the correct semantics and almost nobody implements it — the common version discards the partial response, which punishes the user for redirecting.

**Queueing.** Pressing `Enter` while the model is working should queue, not interrupt or no-op. Claude Code lists queued entries above the input, sends messages as soon as the current tool calls finish, holds commands until the turn ends, and lets `Up` from the first line pull the queue back into the input for editing. The generic alternative is a disabled input during generation, which forces the user to sit and watch.

**Offline / connection drop.** Not well solved anywhere I measured, and worth flagging: none of the products I captured showed a resumable-stream indicator. If you are building here, the state to design for is "the SSE connection died at token 400 of 900" — the honest UI is to keep the partial text, mark the message as incomplete, and offer *Continue* rather than *Regenerate*, because regenerate throws away 400 good tokens.

## Mobile

At 390px the composer is the whole design. Measured on t3.chat at 390: the sidebar collapses into three floating pill *groups* (left cluster with sidebar/search/new, a centered `Chat ⌄` mode pill, a right cluster), the composer becomes a fully-rounded floating card rather than a bottom-attached sheet, the send button changes from a circle to a **rounded square**, and — the important part — the secondary chip row (Instant / Search / Attach) **disappears entirely**, leaving only `+` and the model picker. The chips are not wrapped to a second line; they are folded into the `+` menu.

ChatGPT goes the other way and ships **one** composer element across widths — I verified this: at 1440 there is exactly one visible textarea in the page, `#mobile-composer-prompt` inside `form.wm-composer-composer`, and it is the same 768×52 / r28 pill measured above. What changes is the tokens and the surrounding furniture. The root carries a mobile-specific set: `--mobile-home-composer-shadow: 0 .25rem 1rem 0 #0000000d`, `--mobile-home-composer-border: #b9b9b9` at `--mobile-home-composer-border-width: .03125rem` (a **0.5px** hairline), and `--mobile-sidebar-glass-surface: #00000008` with a `#ffffff94` highlight. The mobile border is a visible grey hairline where desktop uses `rgba(0,0,0,0.2)` — at arm's length the desktop treatment disappears. Measured at 390px, the rest of the adaptation is: the heading copy changes ("What are you working on?" instead of "Where should we begin?"), the mic control is dropped so only `+` and the send arrow remain, the sidebar collapses to a single circular hamburger, and the legal line demotes from a composer-adjacent caption to static page-footer text.

The rules that hold:
- Never wrap the composer toolbar to a second row. Collapse to `+` and at most one always-visible control (usually the model or mode).
- The composer must sit above the keyboard, which means `dvh`/`svh` units and a visual-viewport listener, not `100vh`.
- Long-running agent work is where mobile *earns its place*, not where it struggles: Linear shipped coding-session review on mobile including per-line comments on the returned diff, because the review step is exactly the thing you do from a phone while the write step happens in the cloud.
- Streaming reveal animations should be cut on mobile. A 150ms per-word fade across 600 words is 600 animating spans on a mid-tier phone.
- Generative-media products should admit it. ElevenLabs' desktop two-pane wizard (voice list beside the generator) has no honest 390px equivalent; the right answer is a stacked two-step flow with a real back affordance, not a squeezed side-by-side.

## How this archetype fails

**The chat drawer bolted to the right edge.** A 400px panel with a message list, a textarea, and a sparkle icon, sharing nothing with the product it lives inside. The tell is that the AI cannot see or change what is on screen — you paste context into it and paste results back out. Contrast Linear, where the agent is an **assignee**: it inherits the issue, the status transitions, the notification inbox, the mobile app, and the review flow, and its output is a diff attached to the issue. Contrast Granola, where the model's output lands *in the user's own note*, attributed inline, rather than in a panel next to it. Contrast Gamma, where the AI affordance is a floating `Improve writing ✦` toolbar anchored to the current text selection. The question that separates native from bolted-on is: **can the AI act on the thing the user is looking at, and does its output land where the user's own work lives?** If the answer is no twice, it is a drawer.

**Markdown that flickers.** No incomplete-markdown handling, so every `**` that arrives without its partner un-bolds the preceding phrase for one frame, every unterminated code fence renders as a literal ``` for 200ms, and every partially-arrived link shows raw brackets. This is the most common and most damaging streaming bug because it happens on *every single message*. Fix: `parseIncompleteMarkdown` or an equivalent block-completer.

**The dead wait.** Send → spinner → 12 seconds of nothing → a wall of text. The good products fill that window with something true: Perplexity's `Researched N steps`, Devin's `Worked for 4m 13s`, AI Elements' auto-opened reasoning stream, Claude Code's live to-do checklist under `Ctrl+T`. The bad version fills it with a fake progress bar or an animated ellipsis.

**Raw tool JSON in the transcript.** `{"tool": "read_file", "args": {"path": "..."}}` printed verbatim, expanded, at 13px monospace. This is a debugger, not a product. The user needs `Read 3 files ›`.

**A model picker as the first thing you see.** A dropdown listing eleven model names with version numbers, above an empty composer. The user has no basis for the choice. Bolt and Lovable ship with none; Cursor defaults to `High Fast` and Claude Code to `Auto`, both of which are *policies*, not model names. Name the intent (`Fast`, `Extra high`, `Auto`), keep the raw model list one level down.

**Confirmation as a modal.** A centered dialog with "Allow this action?" and no visible arguments, stealing focus from a page with three other pending calls. The confirmation belongs inline, as a state of the specific tool call, with the parameters expanded.

**Regenerate as the only recovery.** No edit, no branch, no continue. Perplexity's action row is the correct minimum: copy, export, and a **fork glyph** (branch this answer into a new thread) grouped on the left with the produce actions, and thumbs-up / thumbs-down / `⋯` pushed to the right. Two clusters, opposite ends: *what I do with this answer* versus *what I think of it*. Regenerate-only means every correction costs a full re-run and destroys the previous attempt.

**Opacity-faded disabled states and 44px twitchy list rows.** Both come free from component-library defaults and both are wrong here. See findings 3 and 12.

## Copy and tone

The house style across every product I measured is **past tense for what happened, imperative for what to do next, and no first-person self-narration**.

Right — measured, verbatim from the products:
- `Read 3 files, searched the checkout flow` (Claude Code) — past tense, specific noun count
- `Ran agent · Reproduce the double-submit against a test charge` (Claude Code) — the middle dot separates the act from its purpose
- `Worked for 4m 13s  +25 −131` (Devin) — duration and magnitude, no adjectives
- `Thought for 4 seconds` / `Used 3 sources` (AI Elements) — the number is the whole point
- `Sign up and repeat your request.` (Perplexity, rate limited) — imperative, states the exact next action
- `Responses are AI-generated and can be inaccurate. Review all outputs before relying on them.` (OpenRouter) — a disclaimer that names the user's obligation instead of hedging
- `DuckDuckGo anonymizes your chats. By clicking 'Ask' you agree to our Privacy Policy and Terms of Service.` (Duck.ai) — quotes the literal button label so the sentence maps to a control on screen
- `Type / for search modes` (Perplexity placeholder) — teaches the interaction, not the product
- `Plan, Build, / for skills` (Cursor placeholder) — same move, in three words
- `Describe a task or ask a question` (Claude Code) — names both modes the surface supports

Wrong, and why:
- `I'm thinking about your question...` — first-person self-narration; the model is not a character
- `🤖 AI is working its magic ✨` — obscures what is happening at the exact moment the user needs to know
- `Tool: read_file` / `Executing function call` — implementation vocabulary
- `Something went wrong. Please try again.` — no cause, no next action, and "please" is padding
- `Oops!` — an error the product caused, styled as the user's fault
- `Generating response...` for a 4-minute agent run — technically true, uselessly imprecise
- `Are you sure?` on a permission prompt with no arguments shown — asks for consent to something unnamed

Two more rules. **Name the unit of work in the user's language, not yours**: Linear says *coding session*, Devin says *session*, Cursor says *Plan New Idea*, Claude Code says *task*. None say "agent invocation". And **when the model is uncertain, say so in the answer body, never in a persistent banner** — a banner that always says "AI can make mistakes" is read exactly once and then becomes furniture; a sentence in the specific answer that says which part is unverified is read every time.

## Sources

- `https://chatgpt.com/` — logged-out product shell. Extracted the full `--typography-*`, `--gray-*`, `--radius-*`, `--size-*`, `--component-conversation-composer-*`, `--mobile-home-composer-*` and `--wm-desktop-sidebar-width` token sets from the live root element, plus measured the composer form (768×52, r28, the three-layer shadow) and the 24px/weight-400 empty-state heading. Also captured at 390px.
- `https://www.perplexity.ai/` — landing and a live answer page (including the logged-out rate-limit state). Measured `pplxSans`, the `#FDFBFA` ground, `#27251E` ink, 32px pill chips with asymmetric `0 12px 0 8px` padding, the 312×88 / r11 suggestion cards, and the 16px/26px answer paragraph at a 720px measure. Saw the Answer/Links/Images tabs, the right-rail Sources card, and the copy/export/branch + thumbs action row.
- `https://t3.chat/` — full product shell, logged out, at 1440 and 390. Extracted `--font-sans: ProximaVara`, `--font-mono: BerkeleyMono`, the whole dark theme token block, the `20px 20px 0 0` composer shell, the 150ms colour-only transition, and the 10px tabular-nums cost indicator. The 390px capture is where the toolbar-collapse behaviour came from.
- `https://duck.ai/` — full product, zero login. Measured the 640×104 / r24 composer with its `0 0 0 1px rgba(0,0,0,0.08)` shadow ring, the reserved 48px right inset and 48px bottom padding, the 14.4px base size, the "Ask" verb button, and the consent strip fused to the composer card.
- `https://elements.ai-sdk.dev/` (component pages for Tool, Reasoning, Prompt Input, Sources) — measured the tool card (r8, 1px border, no shadow), the 46px header, the 22px status pill, the 64px-min prompt textarea and 32px toolbar buttons; read the six tool states off the live preview and the full component taxonomy off the sidebar.
- `https://streamdown.ai/llms.txt` — the published defaults for streaming markdown: `parseIncompleteMarkdown`, the remend completion list, the 150ms fadeIn/blurIn/slideUp animations, block ▋ and circle ● carets, 400px code / 300px table max heights, the pin-and-release auto-scroll rule, copy-disabled-during-stream, and the rehype-harden chain.
- `https://code.claude.com/docs/en/interactive-mode` — the complete keyboard table, the four multiline methods, the `/ ! @ : ?` prefixes, the queueing semantics and the `Esc` / `Esc Esc` / 800ms `Ctrl+D` rules quoted in the table above.
- `https://claude.com/product/claude-code` — real desktop app screenshot: the `acme-storefront / Fix the double-charge bug…` breadcrumb, the `Read 3 files, searched the checkout flow ›` collapsed line, `Ran agent · …`, inline code chips inside prose, and the composer footer split (Auto / + / mic left; Opus / Extra high / spinner right).
- `https://cursor.com/changelog` — real composer screenshot: the `Plan, Build, / for skills` placeholder, `Start from scratch ⌄` + `☁ Cloud ⌄` above the box, `+ High Fast ⌄` below it, the `Plan New Idea ⇧Tab` / `Multitask` chips, and the Run-on menu (Cloud / This Mac / Remote Machines ▸ with per-machine session counts and "+ Connect via SSH").
- `https://devin.ai/` — real three-pane app screenshot: sessions rail with `1 hour ago · 2 open` subtitles, `Used playbook: Test` and `Worked for 4m 13s +25 −131` collapsed lines, embedded PR cards with `Open` pills / branch chips / `6 files +21 −123`, and the artifact pane rendering a test report.
- `https://linear.app/changelog` — agent-related entries: Coding sessions (2026-06-11), Write with Agent (2026-06-18), Loops (2026-07-20), text attribution and agent-assisted editing (2026-07-23), coding sessions on mobile with per-line comments (2026-07-30), environments + browser use + usage-based AI pricing (2026-08-20), Priority inbox triaged by Linear Agent and agent-drafted projects (2026-09-03).
- `https://linear.app/developers/agents` — the agent-session activity model; confirmed `thought` as an activity type and the "emit within 10 seconds to acknowledge" rule. The full activity taxonomy is still marked Developer Preview and was not enumerated on the page.
- `https://bolt.new/`, `https://lovable.dev/`, `https://v0.app/`, `https://suno.com/` — the four prompt-to-artifact composers, for the send-verb comparison, the modality tiles, the Advanced/Plan escape hatches and the reroll-suggestions button.
- `https://elevenlabs.io/text-to-speech` — the *Select a voice › Generate speech* breadcrumb wizard and the hover-swap voice rows (category label → "Use voice", avatar → play).
- `https://openrouter.ai/chat` — multi-model comparison (`Add Model ⌘J`), the composer tool-count badge, the horizontally-overflowing suggestion card row, and the AI-disclaimer copy quoted above.
- `https://www.granola.ai/`, `https://www.notion.com/product/ai`, `https://gamma.app/`, `https://www.raycast.com/ai`, `https://ampcode.com/`, `https://huggingface.co/chat/` — surveyed for the native-vs-drawer contrast; Gamma's selection-anchored `Improve writing ✦` toolbar and Granola's in-note attributed output are the two clearest examples of AI acting on the artifact rather than beside it.
