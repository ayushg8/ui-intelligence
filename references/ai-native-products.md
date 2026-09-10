# AI-native products

**Evaluated:** 2026-09 · **Re-verified:** 2026-09-10 (direction pass)

All numbers below were pulled live at 1440×900, DPR 2, real Chrome 140 (macOS), September 2026 — either by reading computed styles / CSS custom properties out of the running page, or by measuring a screenshot I actually looked at. Where a product is behind a login I used its marketing, changelog or docs pages, which for this archetype are unusually honest: Cursor's changelog, Devin's homepage and Anthropic's Claude Code page all render real product chrome, not mockups. Anything I did not measure is marked "approx." or left out.

**Verification status.** A second pass on 2026-09-10 re-probed chatgpt.com, perplexity.ai, t3.chat, duck.ai and elements.ai-sdk.dev with the same technique, and re-read the Streamdown and Claude Code docs against the quotes below. Values marked **[re-verified]** were confirmed live in that pass. Values marked **[stale]** were measured in the first pass and could not be re-reached (login walls, bot challenges, or the product changed) — treat those as dated, not wrong. Four claims were **wrong** and are corrected in place; the [Direction pass](#direction-pass-2026-09) at the bottom lists them.

## What this archetype is for

Products where a language model is the engine of the primary task, not a helper bolted onto it: the general assistants (ChatGPT, Claude, Perplexity, Duck.ai, t3.chat), the code agents (Claude Code, Cursor, Devin, Amp, Bolt, v0, Lovable), the generative-media tools (Suno, ElevenLabs, Runway, Midjourney, Gamma), and the "AI inside an existing product" cases (Linear's coding sessions, Notion AI, Granola). The user situation is always the same shape and it is the hard part: the person types an under-specified request, waits an unpredictable amount of time, and then has to decide whether to trust an artifact they did not watch being made. Every good decision in this archetype is about compressing that wait and making the trust decision cheap. Products that just wrap a model in a message list do not belong here — they belong in the failure section.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **ChatGPT** | The default everyone benchmarks against; its design system is fully exposed in CSS variables | Body text is **17px/24px**, not 16. The composer is a 52px-tall, 28px-radius pill whose *applied* shadow is three stacked layers ending in an 80px-blur wash — the `--composer-shadow` token (`0 1px 1px #00000008`) is a different, unused value. |
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
| **AI Elements + Streamdown** *(not on the brief)* | Found by asking "who has already named these primitives?" — Vercel shipped an open component registry for exactly this archetype, so its defaults are the de-facto spec | The canonical tool-call state machine, verbatim, **seven states**: Pending / Awaiting Approval / Responded / Running / Completed / Error / **Denied**. |
| **Amp** *(not on the brief)* | Found while looking for agent products whose *marketing* shows real long-running-agent UI | Frames each agent as owning an environment ("orb") you can open, not a chat you can read. |

## Measured specifics

### ChatGPT — extracted from `getComputedStyle(document.documentElement)` on chatgpt.com **[re-verified 2026-09-10]**

Type scale. The font shorthand and the tracking live in **two separate tokens** — `--typography-body` and `--typography-body-letter-spacing` — so a naive `font: var(--typography-body)` silently drops the tracking. That split is the thing to copy, not just the values:

| Token | Value | Paired `-letter-spacing` | In px |
|---|---|---|---|
| `--typography-display` | `400 2.125rem/1.20588` | `-.025rem` | 34 / 41, −0.4 |
| `--typography-title-large` | `400 1.75rem/1.21429` | `-.025rem` | 28 / 34, −0.4 |
| `--typography-title-medium` | `500 1.375rem/1.27273` | `-.0125rem` | 22 / 28, −0.2 |
| `--typography-title-small` | `500 1.25rem/1.25` | `-.0125rem` | 20 / 25, −0.2 |
| `--typography-body` | `400 1.0625rem/1.41177` | `-.0125rem` | **17 / 24, −0.2** |
| `--typography-subhead` | `400 .9375rem/1.33333` | `-.0125rem` | 15 / 20, −0.2 |
| `--typography-body-small` | `400 .875rem/1.28571` | `-.009375rem` | 14 / 18, −0.15 |
| `--typography-footnote` | `400 .8125rem/1.38462` | `normal` | 13 / 18 |
| `--typography-caption` | `400 .75rem/1.33333` | `normal` | 12 / 16 |
| `--typography-code` | `400 .8125rem/1.38462 ui-monospace` | `normal` | **13 / 18** |

Tracking is negative from 14px up and **exactly zero at 13px and below**. The ramp stops tightening where optical tightening starts hurting legibility, rather than scaling tracking linearly with size.

Neutrals, in OKLCH lightness (chroma 0 throughout — a genuinely neutral ramp, no blue tint):

`--gray-25` 99.1% · `50` 98.2% · `75` 96.4% · `100` 93.1% · `200` 84.8% · `300` 75.4% · `400` 65.0% · `500` 47.8% · `600` 37.5% · `700` 30.9% · `800` 24.8% · `900` 20.9% · `950` 18.7% · `1000` 15.9%

Applied as exactly three text tiers: `--text-color-primary` = L15.9%, `--text-color-secondary` = L47.8%, `--text-color-tertiary` = L65.0%. Three borders: `--border-color-subtle` `#0000000d` (5%), `--border-color-default` `#0000001a` (10%), `--border-color-emphasis` `#0003` (20%). Three surfaces: `#fff`, L96.4%, L93.1%.

Radius scale: `xs .25rem` (4) · `sm .375rem` (6) · `md .625rem` (10) · `lg .875rem` (14) · `xl 1.25rem` (20) · `2xl 1.75rem` (28) · `full 62.4375rem`. Note the **10 and 14** — this is not a doubling scale.

Spacing scale, exposed as `--size-*`: `0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64` px. Six and ten are first-class. Note what is **missing**: no 14, no 28, no 36, no 56 — the scale is dense below 12 and coarse above 24, which is the correct shape for a product whose small gaps are icon-to-label and whose large gaps are section-to-section.

Composer, measured on the live element (`form.wm-composer-composer`):
- width **768px**, height **52px** at rest, `border-radius: 28px`, `padding: 7px 10px`, `border: 1px rgba(0,0,0,0.2)`
- applied shadow: `0 0 0 1px rgba(0,0,0,.04), 0 2px 8px rgba(0,0,0,.04), 0 4px 80px 8px rgba(0,0,0,.024)` — a hairline ring, a tight lift, and an 80px-blur ambient wash
- backed by tokens `--component-conversation-composer-min-height: 3.25rem` and `--component-conversation-composer-radius: 1.75rem`. The `--composer-shadow` token (`0 1px 1px #00000008`) is **not** what the form renders — don't copy the token and think you copied the composer.
- inner textarea: **17px/24px**, zero padding, transparent background, `letter-spacing: normal` (the body token's −0.2px is *not* applied to input)

Sidebar, measured on the live rows: rail width `--wm-desktop-sidebar-width: 260px`, nav rows **36px tall × 248px wide**, `border-radius: 10px`, `padding: 6px 10px`, `-0.08px` tracking, `gap: 6px` to the icon. Label size is **not uniform**: the primary action ("New chat") is **14px/20px** while the standing destinations ("Images", "Plugins", "See plans and pricing") are **16px/24px** — the smaller type marks the row you press most, which is the inverse of the usual instinct. The row is 248 of 260px — a **6px gutter each side** — and 36px around a 24px label leaves 6px vertical. The rail runs on a 6/10 rhythm, not 8/12.

Other useful values: `--button-height-md: 2.75rem` (44px) · `--glass-shadow: 0 4px 24px #0000001a` · sidebar float button uses `backdrop-filter: blur(25px) saturate(1.12)` · `--corner-shape-continuous: superellipse(1.1)` (real CSS squircles) · disabled primary button background is `--gray-300` (L75.4%), i.e. a *filled grey*, never a reduced opacity · empty-state `h1` is **24px/28px at weight 400**, letter-spacing **+0.07px** — regular weight, slightly loosened.

### Perplexity — computed styles on the live page **[partially re-verified 2026-09-10]**

| Element | Measured | Status |
|---|---|---|
| Page background | `color(srgb 0.992157 0.984314 0.980392)` ≈ `#FDFBFA` — warm off-white, not `#fff` | **[re-verified]** |
| Font | `pplxSans` (custom) | **[re-verified]** |
| Mode chip ("Search ⌄", "Computer ⌄") | h **32px**, `radius 9999px`, 14px/20px, `padding: 0 12px 0 8px` | **[re-verified]** |
| Model chip | h 32px, `radius 9999px`, `padding: 0 12px`, 14px | **[re-verified]** |
| Scope chip ("Work in a project") | h **24px**, `radius 9999px`, `padding: 0 8px`, **12px** | **[re-verified]** |
| Suggestion card | **312 × 88**, `border-radius: 11px`, `padding: 16px`, bg `rgba(39,26,0,0.035)` | **[re-verified]** |
| Answer body text | `rgb(39, 37, 30)` = `#27251E` — warm near-black | **[stale]** — logged-out answer pages now bot-gated |
| Muted text | `rgba(39, 37, 30, 0.65)` — same ink at 65%, not a separate grey | **[stale]** |
| Answer paragraph | **16px / 26px**, measure **720px** | **[stale]** |

Two things to actually take. First, the **11px radius** and the `rgba(39,26,0,0.035)` warm-tinted surface are off-grid on purpose — 12px on a warm ground reads slightly rounder than it should, and a pure-black 3.5% overlay goes grey-blue against `#FDFBFA`. Second, the chips run **three height tiers on one composer** — 32px for what the request *is* (mode, model), 24px for what it *belongs to* (project scope) — so the row reads as two ranks without a divider, a separator, or a label.

### t3.chat — computed styles + design tokens **[re-verified 2026-09-10]**

- Fonts: `--font-sans: ProximaVara`, `--font-mono: BerkeleyMono`
- Light ground `rgb(242,225,244)`, ink `rgb(80,24,84)`
- The composer is **two nested shells, not one**, and this is the detail worth stealing: an outer `.chat-input-shell` at **768 × 130**, `border-radius: 20px 20px 0 0`, `padding: 8px 8px 0`, wrapping an inner `<form>` at **752 × 122**, `border-radius: 12px 12px 0 0`, `padding: 12px`. The 8px inset between the two radii is where the lit gradient edge (`border-reflect`) lives. A single-element composer cannot produce that glow without a pseudo-element hack; two elements make it a `padding` value.
- Inner textarea: 726px, **16px/24px**, `padding: 0`, `letter-spacing: normal`
- Icon buttons: **32 × 32**, `radius 6px`, label 14px/20px weight 500. Composer chips ("Instant", "Search", "Attach") are **32px tall, 12px/16px, radius full**; the model button is 32px at radius 8px — pills for modes, a rounded rect for the model, so the model does not read as one more toggle.
- Transition: the shared button transition is `color, background-color, border-color, box-shadow, transform` — all at **150ms `cubic-bezier(.4,0,.2,1)`**. It is a 150ms *token*, not a colour-only rule; `transform` and `box-shadow` are both in the list, and the sidebar search button transitions `transform, opacity`. The discipline is one duration and one easing everywhere, which is a different (and more copyable) claim than "nothing moves".
- Model cost indicator uses `font-mono tabular-nums` at **10px/13.33px, ls −0.25px** — the only element on the page with non-normal tracking
- Dark theme tokens **[stale — light theme served on re-probe]**: `--background #21141e` · `--foreground #f9f8fb` · `--card #0b080b` · `--popover #100a0e` · `--border #27242c` · `--input #302029` · `--sidebar-background #131314` · `--muted #423a45` · `--muted-foreground #e7d0dd` · `--primary #a3004c` · `--ring #db2777`. Note the sidebar is *darker* than the page (`#131314` vs `#21141e`) — the rail recedes, the conversation comes forward.

### Duck.ai — computed styles **[re-verified 2026-09-10]**

- Composer shell: **640 × 104**, `border-radius: 24px`, background `#fff`, and the outline is `box-shadow: 0 0 0 1px rgba(0,0,0,0.08)` — a **shadow ring, not a border**, so focus can thicken it without reflowing layout
- Textarea: **16px/28px**, `letter-spacing: +0.08px`, `padding: 16px 48px 12px 20px` — the 48px right inset is a permanently reserved lane for the mic
- Shell `padding-bottom: 48px` reserves the toolbar row before any control renders, so the box never grows when tools appear
- Base font size is **14.4px** (`0.9rem`), font `DuckSansProduct`
- **The consent shelf, measured.** It is not a strip stuck under the card — it is a separate 640-wide panel, **74px tall**, `border-radius: 0 0 24px 24px`, `border: 1px solid rgba(0,0,0,0.06)`, `background: rgba(0,0,0,0.01)`, positioned so its **top 27px sit behind the composer card**. Only the lower ~47px show. The result reads as one object with a hairline seam and costs nothing in z-order or focus handling. Copy the geometry, not the description.
- Disabled "Ask": `disabled=true`, `opacity: 1`, `background: transparent`, `color: rgba(0,0,0,0.36)` versus `rgba(0,0,0,0.96)` enabled. A **colour-token demotion on a ghost button** — the third case in finding 3, and proof the rule generalises past filled buttons.
- Toolbar, left to right: attach · Tools · | · Fast · `5.6 Luna ⌄` · Ask. Two of those (`Fast`, the model pill) are cost/quality controls sitting *below* the input, which is finding 7 holding in a product with no code-agent pretensions at all.
- Sidebar rows print their accelerator inline in the row: `New Chat  ⌘ + ⇧ + O`, `New Image  ⌘ + ⇧ + I`. 36px tall, radius 12px, 14px label. This is a mass-market privacy product, not a power-user tool — see the boundary note on finding 11.

### AI Elements (Vercel's open registry) — the de-facto reference implementation **[re-verified 2026-09-10]**

| Primitive | Measured |
|---|---|
| Tool card | `border-radius: 8px`, `border: 1px`, **no shadow**, `margin-bottom: 16px` |
| Tool header (button) | height **46px**, `padding: 12px`, `gap: 16px`, full width |
| Tool name | **14px/20px, weight 500, sans** (Geist) — not monospace |
| Status pill | **12px/16px, weight 500**, `padding: 2px 8px`, height **22px**, `radius: full` |
| Prompt input shell | `border-radius: 8px`, `border: 1px` |
| Prompt input textarea | **14px/20px**, `padding: 12px`, min-height **64px** |
| Prompt toolbar button | height **32px**, `radius: 8px`, `padding: 8px 10px`, `gap: 6px`; icon-only variants are **32 × 32** |

**Seven tool states, not six** — the live preview renders `Pending · Awaiting Approval · Responded · Running · Completed · Error · Denied`. `Denied` is the one most implementations forget: when a user refuses a confirmation, the call must land in a **terminal, visible state**, not disappear from the transcript. A vanished call reads as a bug; a `Denied` pill reads as a decision the user made and can revisit.

All seven pills share **identical chrome** — same 22px height, same 12px/500 type, same `2px 8px` padding, and the same neutral fill (`lab(96.52 0 0)`, an off-white) with the same near-black label. `Error` is *not* a red pill; the **icon** inside it carries the semantics. The consequence: seven states cost you seven icons and zero colour decisions, and a transcript with three failed calls does not turn into a wall of red.

The component list is the best available taxonomy of what this archetype needs, and worth treating as a checklist. Five groups, verbatim:

- **Chatbot** — Attachments, Chain of Thought, Checkpoint, Confirmation, Context, Conversation, Inline Citation, Message, Model Selector, Plan, Prompt Input, Queue, Reasoning, Shimmer, Sources, Suggestion, Task, Tool
- **Code** — Agent, Artifact, Code Block, Commit, Environment Variables, File Tree, JSX Preview, Package Info, Sandbox, Schema Display, Snippet, Stack Trace, Terminal, Test Results, Web Preview
- **Voice** — Audio Player, Mic Selector, Persona, Speech Input, Transcription, Voice Selector
- **Workflow** — Canvas, Connection, Controls, Edge, Node, Panel, Toolbar
- **Utilities** — Image, Open In Chat, Tool

The shape of that list is itself the finding: **Chatbot is only one of five groups**, and the Code group is nearly as large. A registry built by people shipping this archetype concluded that a chat surface needs roughly as much apparatus for *showing an environment* (file tree, terminal, sandbox, test results, stack trace) as for *showing a conversation*. If your AI product has eighteen chat primitives and zero environment primitives, that asymmetry is the diagnosis.

### Streamdown — the streaming-markdown renderer behind AI Elements' `Response`, with its published defaults **[re-verified 2026-09-10]**

- `parseIncompleteMarkdown: true` by default, via a preprocessor called `remend`, which closes unterminated **bold, italic, bold-italic, inline code, strikethrough, links, images, KaTeX, setext headings, HTML tags** mid-stream. Each completion is individually toggleable and each defaults to `true`.
- Per-word reveal animation: `fadeIn` (default), `blurIn`, `slideUp` (a 4px rise); **duration 150ms**, easing `ease`, `sep: "word"` (or `"char"`, which the docs explicitly tell you to use sparingly). When `isAnimating` goes false the plugin leaves the rehype pipeline entirely — completed messages carry **zero extra spans**, not spans with the animation switched off.
- The animation **skips `pre`, `svg`, `math` and `annotation`** but deliberately *does* animate inline `<code>`, on the stated grounds that wrapping words in style-inheriting spans is layout-neutral. That is the exact test for whether a reveal animation is safe: does the wrapper change layout?
- `blurIn` exists for a specific failure — fast models that deliver many tokens in one batch, where pure opacity makes the batch visible as a block. Blur masks the seam.
- Streaming caret: `"block"` (▋) or `"circle"` (●), rendered **only** while `isAnimating && mode === "streaming"`
- `codeBlockMaxHeight: 400` (px) — taller blocks scroll internally; `lineNumbers: true`
- `tableMaxHeight: 300` (px)
- Code and table blocks auto-pin to the bottom while streaming and **unpin the moment the user scrolls up — then re-pin only when the user returns to the bottom, or when a new streaming session starts.** The re-pin condition is the half everyone omits: unpinning forever means the next message starts scrolled to the wrong place.
- **All** interactive controls — copy, download, fullscreen, on code blocks, tables and Mermaid diagrams alike — are disabled while `isAnimating` is true, not just copy.
- Those controls **appear on hover on desktop and are permanently visible on mobile.** Hover-revealed affordances have no touch equivalent; the registry's answer is to stop hiding them rather than to invent a long-press.
- External links get a confirmation modal by default — `linkSafety` defaults to `{ enabled: true }`, and the modal shows the full URL plus "Copy link" / "Open link", dismissible by backdrop or `Escape`
- Default rehype chain: `rehype-raw`, `rehype-sanitize`, `rehype-harden` (allow-lists image and link prefixes)

If you build a chat surface and do not implement the first bullet, your bold text will flash on and off every time the model emits a `**`.

### Claude Code (terminal) — the documented keyboard contract **[re-verified 2026-09-10]**

| Key | Behaviour worth copying |
|---|---|
| `Esc` | Interrupt mid-turn; **the work done so far is kept**, and any queued messages are sent next. With a dialog open it closes the dialog; **on a permission prompt it declines** — identical to `No` with no comment. One key, three meanings, each one the obvious "get me out of this" for its context. |
| `Esc Esc` | Input has text → clear it *and push it to history* so `Up` recalls it. Input empty → open the rewind menu |
| `Ctrl+C` | Interrupt if running; otherwise first press clears input, second exits |
| `Ctrl+D` | Exit — first press shows a hint, second press **within 800ms** confirms. **But with text in the prompt it is `delete-forward` instead** — the destructive session-level meaning is only reachable from an empty input. |
| `Ctrl+O` | Toggle transcript view; expands lines that collapse by default (e.g. a single `Called slack 3 times`), and stamps each assistant message with a timestamp and the model that produced it |
| `Ctrl+T` | Toggle the agent's own to-do checklist in the status area — **capped at five visible tasks**, and explicitly *not* the running-process view (that is `/tasks`) |
| `Ctrl+S` | Stash the prompt; press again on an empty prompt to restore text, cursor position and pasted content |
| `Shift+Tab` | Cycle permission modes: `default` → `acceptEdits` → `plan` → `bypassPermissions`. The mode indicator labels `default` as **"Manual"** — the internal key and the user-facing word are deliberately different, because "default" tells a user nothing about what will happen. |
| `Tab` | On a permission prompt with Yes/No focused, opens a **comment box** — you can approve *with a note* |
| Multiline | Four accepted ways: `\`+`Enter`, `Option+Enter`, `Shift+Enter`, `Ctrl+J` |
| Prefixes | `/` command · `!` shell · `@` file mention · `:` emoji · `?` on empty input toggles help (and inserts a literal `?` when the input already has text) |
| Enter while busy | **Queues** rather than interrupts; queued items list above the input; `Up` from line one pulls them back for editing |

The pattern under the table: **every key is overloaded by input state, and the safe meaning is the one you get when the input has text.** `Ctrl+D` deletes a character rather than killing the session; `Esc Esc` clears a draft rather than rewinding history; `?` types a question mark rather than opening help. The destructive reading is reachable only from an empty prompt, which is the state you are in when you have nothing to lose.

## The decisions that make it work

**1. The composer is a fixed-height reserved frame, not a growing box.**
ChatGPT's composer is 52px tall with `padding: 7px 10px` and a 28px radius; Duck.ai's is 104px with `padding-bottom: 48px` reserved for the toolbar *before any toolbar control exists*; t3.chat's outer shell is 130px with the textarea occupying 726 of 768px. In all three the chrome around the text is allocated up front, so attaching a file or opening a model picker does not push the page. **Why it works:** the composer is the one element the user's eyes are locked to; any reflow there is felt as jank in a way the same reflow elsewhere is not. **The generic alternative** is a `<textarea>` with `rows={1}` and auto-grow, where adding an attachment chip jumps the whole conversation up 40px. **When it doesn't apply:** a single-shot search box with no attachments, no model picker and no modes — reserving 48px of empty toolbar there is just dead space. It also stops paying at 390px, where reserved chrome competes with the answer for a screen that has ~700 usable pixels: Duck.ai still reserves its 48px lane on mobile, but t3.chat's reservation of *keyboard* height leaves ~500px of empty screen below a mid-page composer whenever the keyboard is down. Reserve the space a control will occupy; be much more careful about reserving space the operating system might not take.

**2. Send is a verb when the output is a thing, an arrow when the output is a reply.**
Bolt says **"Build now ➤"**, Suno says **"Create"**, Duck.ai says **"Ask"**, v0 and Lovable show a mic and let `Enter` do the work. ChatGPT and t3.chat use a circular up-arrow. The split is clean: products that produce a durable artifact name the artifact-producing act; products that continue a conversation use the arrow, because "Send" would be redundant with the message metaphor. **Why it works:** a labeled button sets an expectation about what is about to happen and how long it takes. "Build now" implies minutes; an arrow implies seconds. **The generic alternative** is a paper-plane icon on everything, which tells a first-time user of a code-gen product nothing about the fact that they are about to start a multi-minute job. **When it doesn't apply:** a follow-up composer inside an existing thread — Perplexity correctly drops to "Ask a follow-up" as placeholder with an icon button, because the verb is already established. It also backfires when the verb **lies about duration**. "Build now" on a surface that returns in 800ms reads as overclaim; "Ask" on a job that takes four minutes reads as a broken button. The verb is a promise about elapsed time as much as about output, so pick it against your actual p50, not against your positioning.

**3. Disabled send is a filled grey, never a faded control.**
ChatGPT's `--button-primary-background-color-disabled` is `oklch(75.4017% 0 none)` — literally `--gray-300`, a solid fill, and its mobile send arrow renders as a filled grey circle. Duck.ai's "Ask" holds `opacity: 1` and swaps its label from `rgba(0,0,0,0.96)` to `rgba(0,0,0,0.36)`. Neither uses `opacity` — both swap a **colour token**, one on a fill and one on a label. **Why it works:** an opacity-faded button on a shadowed composer drags the shadow and the border down with it and reads as "broken", whereas a swapped fill reads as "not yet". **The generic alternative** is `disabled:opacity-50`, the Tailwind default, which is why so many AI composers look slightly smudged before you type. **When it doesn't apply:** icon-only ghost buttons with no fill — there, reducing the icon's colour token by one tier (primary → tertiary) is the right move.

**4. Tool calls collapse to one line of past-tense prose with the noun count in it.**
Claude Code's desktop transcript renders `Read 3 files, searched the checkout flow ›` and `Ran agent · Reproduce the double-submit against a test charge`. Claude Code's terminal collapses MCP activity to `Called slack 3 times`. Devin collapses a whole work block to `Worked for 4m 13s  +25 −131`. AI Elements' `Sources` trigger reads `Used 3 sources`; its `Reasoning` trigger reads `Thought for 4 seconds`. **Why it works:** a reader scanning a long transcript needs to know *what changed and how much*, and a count or a diffstat answers that in one saccade. The chevron is there for the 5% of cases where they need the argument JSON. **The generic alternative** is `🔧 Tool: read_file` with a spinner and a raw JSON blob below it, which is developer-console output pasted into a product. **When it doesn't apply:** a debugging or eval surface, where the raw request/response *is* the product and should be expanded by default.

**5. Reasoning auto-opens while it streams and auto-closes when it finishes.**
This is AI Elements' documented behaviour for `<Reasoning />` and it is the rule the good products converge on. While the model is thinking, the reasoning stream is the only thing moving, so it earns the space; the moment the answer starts, the reasoning becomes history and collapses to `Thought for 4 seconds`. **Why it works:** it solves the empty-wait problem without permanently taxing the transcript. **The generic alternative** is a reasoning panel that stays expanded forever, so a 12-turn conversation is 80% chain-of-thought the user has already read. The other generic alternative — collapsed the whole time — leaves a dead spinner during the longest, most anxious part of the interaction. **When it doesn't apply:** models with very short thinking phases (< ~1s), where the open-then-close animation is just a flicker; hold it collapsed and show the duration only.

**6. Tool calls have seven states, not two, and both halves of the approval decision are states.**
The canonical set, from AI Elements: **Pending, Awaiting Approval, Responded, Running, Completed, Error, Denied**, rendered as a 22px-tall, 12px/16px weight-500 pill with a state icon on identical neutral chrome. `Pending` is the only one that renders expanded (showing `PARAMETERS`). **Why it works:** the confirmation gate is a *state of the tool call*, not a modal that interrupts the page. A modal steals focus and loses the context of which of four parallel calls is asking. An inline `Awaiting Approval` pill lets the user scroll, read the arguments, and approve in place — and `Denied` keeps the refused call in the transcript as a decision with a chevron, instead of erasing it. **The generic alternative** is `window.confirm`-shaped: a centered dialog saying "Allow this action?" with no arguments visible, and a refusal that leaves no trace. **When it doesn't apply:** genuinely destructive, irreversible side effects (delete a production table, send money) — those deserve an interruption, and Claude Code's terminal pattern is instructive: the permission prompt is blocking, but `Tab` opens a comment field so you can approve *with an instruction* instead of a bare yes, and `Esc` declines with the same effect as `No`. It also does not apply to **fully autonomous runs with no human present** — a batch or scheduled agent has no one to await, so `Awaiting Approval` must resolve by policy (auto-deny and record, or auto-allow within an allowlist) rather than hang forever. A state machine that can block indefinitely on a human is a state machine that will block indefinitely.

**7. Origin above the composer, cost below it.**
Cursor's composer puts `Start from scratch ⌄` and `☁ Cloud ⌄` **above** the input, and `+ · High Fast ⌄` **below** it. Claude Code's desktop composer puts permission mode (`Auto`), attachments and mic on the lower-left, and model (`Opus`) + effort (`Extra high`) on the lower-right. Duck.ai — a product with no agent ambitions — independently lands on the same split: attach and Tools lower-left, `Fast` and `5.6 Luna ⌄` lower-right. **Why it works:** things that change *what context this request runs against* are read before you type; things that change *what this request costs and how good it is* are adjusted after you've written it and are deciding how much to spend. The physical position matches the decision order. **The generic alternative** is one undifferentiated row of eight chips under the box, where "GPT-5" sits next to "Attach" sits next to "Web search" with no hierarchy. **When it doesn't apply:** single-model products — Bolt and Lovable have no model picker in the default composer at all, and are better for it. It also breaks down when **origin is not a choice but a fact** — a coding agent invoked from a specific file, a support agent scoped to one ticket. Rendering `Repo: acme-storefront ⌄` above a composer that can only ever run against that repo is a dropdown with one item, and users learn to stop reading that lane. Show origin above the box only when changing it is a real option; otherwise put it in the page chrome as a breadcrumb, which is what Claude Code's desktop app does (`acme-storefront / Fix the double-charge bug…`).

**8. The primary transcript body is 16–17px at 1.4–1.63 line-height with a ~720px measure.**
Measured: ChatGPT `17px/24px` (1.41), token tracking `-0.2px` on body but `normal` in the composer itself; Perplexity's answer paragraph `16px/26px` (1.63) at a **720px** measure [stale]; t3.chat body and composer `16px/24px` at `normal` tracking; Duck.ai composer `16px/28px` (1.75 — looser still, because it is input rather than output) at `+0.08px`. **Why it works:** this is reading-length prose that arrives progressively, so it needs book line-height, not UI line-height — but the container is a fixed column in an app, so 68–80 characters is the ceiling before the return sweep starts costing you. Note Perplexity, which is the most prose-heavy, uses the loosest leading (1.63); ChatGPT, which interleaves lists and code, uses the tightest (1.41). **The generic alternative** is 14px/1.5 because that's the app's default body size, which turns a 600-word answer into a wall. **When it doesn't apply:** the tool-call and metadata lanes inside the same transcript, which should drop to 12–14px — AI Elements uses 14px/20px for tool names and 12px/16px for status pills, and ChatGPT's `--typography-footnote` is 13px/18px.

**9. Code is 13px monospace, not 14px, and inline code is a chip, not just a font swap.**
ChatGPT's `--typography-code` is `400 .8125rem/1.38462 ui-monospace` — **13px/18px** — with a weight-500 emphasis variant. Claude Code's transcript renders `POST /charges` and `createCharge()` as inline chips with a tinted background, sitting inside 17px prose. **Why it works:** monospace at the same nominal size as the surrounding sans looks a full step larger because of its wider x-height and even advance width; dropping one step re-optically-aligns it. The chip background is what makes an identifier scannable inside a paragraph without breaking the line rhythm. **The generic alternative** is `font-family: monospace` at the inherited size with no background, which reads as a typo. **When it doesn't apply:** a code-first surface (a diff view, a terminal), where the code *is* the body text and should be 13–14px with no chip treatment at all.

**10. Long-running agent progress is a receipt, not a spinner.**
Devin's collapsed blocks are `Worked for 4m 13s  +25 −131` and `Used playbook: Test`; its session list rows read `1 hour ago · ⑂ 2 open`; embedded PR cards carry a green `Open` pill, the repo and number, the branch chips (`devin/USA-938-… → main`) and `6 files +21 −123`. Linear's coding sessions return a **diff for team review**, and its mobile app lets you comment on specific lines of that diff mid-session. **Why it works:** for a job that takes minutes, "in progress" is worthless — the user has switched tabs. What they need on return is a scannable ledger of what happened and what it touched. Elapsed time and a diffstat are the two facts that let them decide whether to read the detail. **The generic alternative** is a progress bar with a fake percentage, or worse, an animated "Devin is thinking…" that conveys nothing and cannot be resumed. **When it doesn't apply:** sub-10-second operations, where a receipt is over-engineering and a shimmer is correct.

**11. Accelerators are printed inside the control they replace.**
Cursor's composer suggestions read `Plan New Idea ⇧Tab` and `Multitask` — the accelerator is *inside* the chip, in the same pill, not in a tooltip. OpenRouter puts `⌘J` inside the "Add Model" button and `⌘/` inside the sidebar's "New chat" row. Duck.ai prints `⌘ + ⇧ + O` in the "New Chat" row and `⌘ + ⇧ + I` in "New Image". **Why it works:** the only reliable moment to teach a shortcut is when the user is about to click the thing it replaces. A tooltip requires a hover the user has no reason to perform; a cheatsheet requires a decision to go learn. **The generic alternative** is a `?` modal nobody opens. **When it doesn't apply:** *not* "consumer products" — Duck.ai is a mass-market privacy tool and does it anyway, and that boundary as originally written was wrong. The real limit is **surfaces with no keyboard attached**: at 390px the accelerator is pure noise, occupying width in a row that has none to spare, and every product here drops it on mobile. The second limit is **one-shot flows** — a signup or onboarding step the user will see exactly once cannot amortise the teaching cost, so the hint is decoration. Repeat usage is the test, not audience sophistication.

**12. Hover states must not change layout. Colour, fill and swapped-in controls are fine; anything that reflows is not.**
ElevenLabs' voice rows swap the right-hand category label for a `Use voice` button and the avatar for a play triangle — *within the same row height and the same row width*. t3.chat routes every button through one transition token — `color, background-color, border-color, box-shadow, transform` at **150ms `cubic-bezier(.4,0,.2,1)`** — so hover effects vary in property but never in timing. **Why it works:** a transcript or a voice list is something you sweep the cursor across while reading. What breaks that sweep is *geometry*: a hover that adds a 1px border, changes a radius, grows padding, or lifts a row shifts the elements around it and makes the list twitch under the cursor. A `transform` on a composited layer does not reflow and is cheap; `hover:border` on a borderless row costs a full layout pass and moves its neighbours. **The generic alternative** is `hover:shadow-md hover:-translate-y-0.5` applied uniformly, which is fine on a marketing card grid and terrible on a 40-row list — not because it moves, but because forty of them move while you read one. **When it doesn't apply:** low-density card grids — Perplexity's two 312×88 suggestion cards on an empty state can afford a lift, because there are two of them and you are not scanning. It also does not apply to **touch**, where hover does not exist at all: any state you express only on hover is invisible to half your users, which is why Streamdown makes its code-block controls permanently visible on mobile rather than porting the hover reveal.

## States, edges and the unglamorous parts

**Empty state, general assistant.** ChatGPT logged-out at 1440: an `h1` at **24px/28px weight 400, letter-spacing +0.07px** reading "Where should we begin?", plus the composer — and *no* chip. At 390 the heading swaps to "What are you working on?" and **exactly one** chip appears: "What can you do?". The suggestion is mobile-only, which is the opposite of the usual instinct that small screens should carry less. t3.chat at 1440: "How can I help you?" plus four category chips (Create / Explore / Code / Learn) and four literal example questions as a bare list with hairline separators. Perplexity: a heading ("What do you want to know?"), the composer with its three chip tiers, and two 312×88 capability cards. Duck.ai: wordmark, the composer, the consent shelf, and three chips.

Two rules, and one non-rule. The rule that holds is **four or five elements, never a grid** — the generic version is a 3×3 of nine prompt suggestions, which reads as a menu you must choose from rather than a box you can type anything into. The second rule is that the suggestions are **capability claims, not prompts**: "Create & Edit Images", "How Duck.ai Works", "Code" — they answer *what is this thing for*, which is the actual first-run question, rather than putting words in the user's mouth.

The non-rule: **the composer is not reliably centred.** ChatGPT, Perplexity and Duck.ai centre it vertically; t3.chat bottom-pins it on an empty conversation exactly as it does on a full one, and reads fine. Centring is a way of saying "nothing has happened yet"; bottom-pinning is a way of saying "this box does not move". Both are defensible and the choice is a product one — an earlier version of this file asserted centring as universal and was wrong.

**Empty state, generative media.** Bolt shows four modality tiles (Website / Slides / App / Prototype) plus "or start from Figma / GitHub / Team template"; v0 shows four example chips *and a reroll button* to get four different ones; Suno shows a rotating headline that types itself ("Make a house song about quitting your job|" with a live caret). Generative products need more scaffolding than assistants because the user genuinely does not know what the input language is.

**First run.** HuggingChat gates on a modal explaining the router before the composer is usable. Duck.ai tucks a 640×74 consent panel *behind* the composer card so only its lower ~47px show, sharing the card's width and its `24px` bottom radius — one object with a hairline seam — carrying "DuckDuckGo anonymizes your chats. By clicking 'Ask' you agree to our Privacy Policy and Terms of Service." at 12px/16px. t3.chat floats a dismissible strip in a *separate rounded card* above the composer: "Make sure you agree to our Terms and our Privacy Policy ✕". ChatGPT demotes the same content to a three-line page footer.

The pattern worth copying is Duck.ai's, and the reason is mechanical rather than aesthetic: the disclosure **quotes the literal button label** ("By clicking 'Ask'"), so the sentence maps to a control the user can see, and it is **geometrically joined** to that control, so it cannot be scrolled away from it. t3.chat's version is the instructive near-miss — the strip is a separate card with its own radius, and at 390px it visibly collides with the composer's glow ring, because two independently-positioned floating cards have no way to agree on a gap.

**Rate-limited / gated.** **[stale — first pass; logged-out answer pages are now bot-gated]** Perplexity's logged-out limit is the most instructive thing I captured. Rather than an error banner, the assistant turn renders normally — summary line `Researched 0 steps`, then a body reading **"Sign up and repeat your request."**, then the *full* action row (copy, export, branch, thumbs up, thumbs down, ⋯). The message occupies the same slot with the same affordances a real answer would. Meanwhile a separate strip above the composer says "Sign in to save your history and access more features" with a `Sign in` button. **The lesson:** the limit is expressed as content in the conversation, not as a modal that destroys the thread, and the *next action* is stated as an imperative ("repeat your request"), not just as a wall.

**Errors inside a tool call.** They stay inside the collapsed tool card, as an `Error` pill on the same 22px chrome, the same `2px 8px` padding and the **same neutral fill** as `Completed` — only the icon differs — with the failure detail behind the chevron. The turn continues. A failed tool call is not a failed conversation, and lifting it to a page-level toast breaks the causal chain between the step and its failure. The neutral fill matters as much as the placement: colour the pill red and a transcript with four retried calls becomes a page that looks like an outage.

**Too much data.** Streamdown's defaults are the honest answer: code blocks scroll internally past **400px**, tables past **300px**, both auto-pin to the bottom while streaming, release the pin the instant the user scrolls up, and **re-pin when the user returns to the bottom or a new stream starts.** Both halves get forgotten — an auto-scroller that fights the user is worse than none, and one that never re-pins leaves the next message rendering off-screen.

**Copy during stream.** Disabled — and not just copy. Streamdown disables every interactive control (copy, download, fullscreen) while `isAnimating`. Copying a half-finished code block produces a broken paste, downloading one produces a broken file, and there is no way to signal either after the fact.

**Interruption.** `Esc` in Claude Code stops the turn and **keeps the work already done**, then immediately sends anything queued. This is the correct semantics and almost nobody implements it — the common version discards the partial response, which punishes the user for redirecting.

**Queueing.** Pressing `Enter` while the model is working should queue, not interrupt or no-op. Claude Code lists queued entries above the input, sends messages as soon as the current tool calls finish, holds commands until the turn ends, and lets `Up` from the first line pull the queue back into the input for editing. The generic alternative is a disabled input during generation, which forces the user to sit and watch.

**Offline / connection drop.** Not well solved anywhere I measured, and worth flagging: none of the products I captured showed a resumable-stream indicator. If you are building here, the state to design for is "the SSE connection died at token 400 of 900" — the honest UI is to keep the partial text, mark the message as incomplete, and offer *Continue* rather than *Regenerate*, because regenerate throws away 400 good tokens.

## Mobile

Three products captured at 390px, and they disagree in an instructive way.

**t3.chat at 390.** The sidebar collapses into three floating pill *groups* — a left cluster (sidebar / search / new), a centred `Chat ⌄` mode pill, a right cluster (history / settings). The composer becomes a fully-rounded floating card rather than a bottom-attached sheet, keeping its lit gradient ring. The send button changes from a circle to a **rounded square**. The secondary chip row (Instant / Search / Attach) **disappears entirely** — not wrapped, folded into `+` — leaving `+` and the model picker. Two things the desktop capture does not prepare you for: the four category chips **and** all four example questions are dropped, so the entire empty-state scaffolding reduces to one heading; and the composer group floats **mid-screen with roughly 500px of dead space below it**, because the layout reserves keyboard height that is not yet occupied. That reservation is defensible when the keyboard is up and looks like a bug when it is not.

**Duck.ai at 390, which breaks the tidy rule.** The toolbar does **not** collapse to `+`. All four controls survive — attach, Tools, speed, model — but "Tools" and "Fast" **drop their labels and keep their icons**, while the model pill keeps its text (`5.6 Luna ⌄`). The suggestion chips *increase* from three to four (Voice Chat is added) and wrap to two rows. The consent shelf keeps its full two-line text. This is the better rule: **drop labels, not controls, and keep the label on the one control whose current value the user needs to read.** A model picker collapsed to an icon is a picker whose whole job — telling you which model you are about to spend — has been removed.

**ChatGPT at 390.** ChatGPT ships **one** composer element across widths: at 1440 there is exactly one visible textarea in the page, `#mobile-composer-prompt` inside `form.wm-composer-composer`, the same 768×52 / r28 pill measured above. What changes is the tokens and the furniture. The root carries a mobile-specific set: `--mobile-home-composer-shadow: 0 .25rem 1rem 0 #0000000d`, `--mobile-home-composer-border: #b9b9b9` at `--mobile-home-composer-border-width: .03125rem` (a **0.5px** hairline), and `--mobile-sidebar-glass-surface: #00000008` with a `#ffffff94` highlight. The mobile border is a visible grey hairline where desktop uses `rgba(0,0,0,0.2)` — at arm's length the desktop treatment disappears. The rest: heading copy changes ("What are you working on?"), the mic is dropped so only `+` and the send arrow remain, a single chip appears that desktop does not show, the sidebar becomes one circular hamburger, and the legal line demotes from a composer-adjacent caption to three lines of static page-footer text. The disabled send arrow renders as a **filled grey circle**, not a faded one — finding 3, visible at a glance.

The rules that hold:
- **Never wrap the composer toolbar to a second row**, and prefer dropping labels to dropping controls. If you must drop a control, drop the ones whose state is invisible (attach, tools) and keep the ones whose state is information (model, mode).
- The composer must sit above the keyboard, which means `dvh`/`svh` units and a visual-viewport listener, not `100vh`. Reserving keyboard height *before* the keyboard appears — t3.chat's approach — trades a dead half-screen for a zero-jump focus transition; decide which you are buying.
- **Accelerators come off.** Every product here prints `⌘K` hints at 1440 and none at 390. A shortcut hint on a device with no keyboard is width spent on nothing.
- **Hover-only affordances must become permanently visible, not long-press.** Streamdown's stated default is exactly this: code-block copy/download controls appear on hover on desktop and are always visible on mobile.
- Long-running agent work is where mobile does the most useful work: Linear shipped coding-session review on mobile including per-line comments on the returned diff, because review is what you do from a phone while the write step happens in the cloud.
- **Cut streaming reveal animations on mobile.** A 150ms per-word fade across 600 words is 600 animating spans on a mid-tier phone. Streamdown's `sep: "char"` is worse again and its own docs say to use it sparingly.
- Generative-media products with two-pane desktop layouts should ship a real two-step flow, not a squeezed side-by-side. ElevenLabs' voice-list-beside-generator has no honest 390px equivalent; stack it and give step two a back affordance that returns to the list with its scroll position intact.
- **The empty state is where mobile silently loses the most.** t3.chat drops eight suggestion elements at 390 and keeps one heading; Duck.ai keeps everything and adds a chip. If your mobile empty state is a heading and a box, a first-time phone user has been told nothing about what the product does.

## How this archetype fails

This archetype has a house failure mode, and it is specific: an AI-generated AI product converges on **a centred column, a `max-w-3xl` message list, a rounded textarea with a paper-plane icon, `bg-gradient-to-r from-purple-500 to-blue-500` on the primary button, a sparkle emoji next to the word "AI", and shadcn defaults everywhere else.** It is competent, it is instantly recognisable, and every failure below is a specific way it goes wrong. Each entry ends with a **tell** — something you can check against your own output without asking anyone's opinion.

**The chat drawer bolted to the right edge.** A 400px panel with a message list, a textarea, and a sparkle icon, sharing nothing with the product it lives inside. Contrast Linear, where the agent is an **assignee**: it inherits the issue, the status transitions, the notification inbox, the mobile app, and the review flow, and its output is a diff attached to the issue. Contrast Granola, where the model's output lands *in the user's own note*, attributed inline. Contrast Gamma, where the AI affordance is a floating `Improve writing ✦` toolbar anchored to the current text selection.
*Tell:* grep your own component for a reference to the host document's selection, the current record's id, or the surrounding route. If the panel's props are `{messages, onSend}` and nothing else, the AI cannot see what the user is looking at, and no amount of styling will fix it. Second tell: if removing the panel leaves the product working exactly as before, you built a drawer.

**Markdown that flickers.** No incomplete-markdown handling, so every `**` that arrives without its partner un-bolds the preceding phrase for one frame, every unterminated code fence renders as a literal ``` for 200ms, and every partially-arrived link shows raw brackets. This is the most common and most damaging streaming bug because it happens on *every single message*.
*Tell:* if your render path is `<ReactMarkdown>{accumulatedText}</ReactMarkdown>` with no preprocessor between the buffer and the parser, you have this bug — it is not conditional on the model. Fix: `parseIncompleteMarkdown`/`remend` or an equivalent block-completer.

**The dead wait.** Send → spinner → 12 seconds of nothing → a wall of text. The good products fill that window with something true: Perplexity's `Researched N steps`, Devin's `Worked for 4m 13s`, AI Elements' auto-opened reasoning stream, Claude Code's live to-do checklist under `Ctrl+T`.
*Tell:* count the distinct states your loading UI can be in. If the answer is one — the same animation from token 0 to token 900 — the UI is carrying no information. The generated version of this is a `<Loader2 className="animate-spin" />` next to the string "Thinking…", and the giveaway is that the string is a constant, not a function of anything.

**Raw tool JSON in the transcript.** `{"tool": "read_file", "args": {"path": "..."}}` printed verbatim, expanded, at 13px monospace. This is a debugger, not a product. The user needs `Read 3 files ›`.
*Tell:* look at what you pass to the renderer. If it is `JSON.stringify(toolCall, null, 2)`, you shipped your own debug view. The generated version usually also renders the tool *name* in monospace — `read_file` rather than "Read 3 files" — which is the vocabulary tell: the identifier belongs to your code, and the sentence belongs to the user.

**A model picker as the first thing you see.** A dropdown listing eleven model names with version numbers, above an empty composer. The user has no basis for the choice. Bolt and Lovable ship with none; Cursor defaults to `High Fast`, Claude Code to `Auto`, Duck.ai to `Fast` — all *policies*, not model names.
*Tell:* read your default option out loud. If it is a string a user could not have invented ("gpt-5-turbo-2026-04-preview"), it is an implementation detail promoted to a control. Name the intent, keep the raw list one level down.

**Confirmation as a modal.** A centered dialog with "Allow this action?" and no visible arguments, stealing focus from a page with three other pending calls.
*Tell:* if approving requires a component that renders in a portal, you have taken the decision out of the transcript, and the user can no longer see *which* call is asking. The generated version is `<AlertDialog>` from the component library with `<AlertDialogTitle>Are you sure?</AlertDialogTitle>`. Second tell: check whether a refusal renders anything at all. If declining removes the call from the transcript, you have no `Denied` state and the user cannot tell a refusal from a crash.

**Regenerate as the only recovery.** No edit, no branch, no continue. Perplexity's action row is the correct minimum: copy, export, and a **fork glyph** (branch this answer into a new thread) grouped on the left with the produce actions, and thumbs-up / thumbs-down / `⋯` pushed to the right. Two clusters, opposite ends: *what I do with this answer* versus *what I think of it*.
*Tell:* count the recovery paths from a bad answer. If there is one and it discards the previous attempt, every correction costs a full re-run and the user learns not to correct. The generated version pairs a `RefreshCw` icon with a `Copy` icon and stops there.

**Opacity-faded disabled states and twitchy list rows.** Both come free from component-library defaults and both are wrong here.
*Tell:* grep for `disabled:opacity-50` and for `hover:` classes that change `border`, `padding`, `scale` or `shadow` on rows inside a scrollable list. Both are Tailwind/shadcn defaults, which is exactly why they appear in generated work without anyone deciding on them. See findings 3 and 12.

**The tells that are pure style, and still diagnostic.** A gradient on the send button; a sparkle emoji in a heading; `text-transparent bg-clip-text` on the product name; 14px body copy in a surface whose main job is reading 600-word answers; a 3×3 grid of nine prompt suggestions; the word "magic" anywhere. None of these breaks a flow. All of them mean the same thing — that the surface was assembled from what an AI product is *supposed to look like* rather than from the measurements in this file. If three or more are present, re-read findings 8, 9 and the empty-state section before shipping.

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
- `Type @ for connectors` (Perplexity placeholder, 2026-09-10; it read `Type / for search modes` in the earlier pass) — teaches the interaction, not the product, and the change is itself instructive: the placeholder tracks whichever prefix is currently worth teaching
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

- `https://chatgpt.com/` — logged-out product shell, re-probed 2026-09-10. Extracted the full `--typography-*` set **including the separate `-letter-spacing` companions**, plus `--gray-*`, `--radius-*`, `--size-*`, `--component-conversation-composer-*`, `--mobile-home-composer-*` and `--wm-desktop-sidebar-width` from the live root element; measured the composer form (768×52, r28, the three-layer applied shadow that is *not* `--composer-shadow`), the mixed 14px/16px sidebar row labels, and the 24px/28px weight-400 / +0.07px empty-state heading. Screenshotted at 390px; the 1440 capture was bot-challenged, so the desktop reading is DOM-only.
- `https://www.perplexity.ai/` — landing and (first pass only) a live answer page including the logged-out rate-limit state. **Re-verified 2026-09-10:** `pplxSans`, the `#FDFBFA` ground, the 32px mode/model pills with asymmetric `0 12px 0 8px` padding, the new 24px `Work in a project` scope chip, the 312×88 / r11 suggestion cards, and the `Type @ for connectors` placeholder. **Not re-reachable:** the answer page — `#27251E` ink, the 16px/26px paragraph at 720px, the Answer/Links/Images tabs, the right-rail Sources card and the copy/export/branch action row are all first-pass measurements now behind a bot challenge.
- `https://t3.chat/` — full product shell, logged out, at 1440 and 390, re-probed and re-screenshotted 2026-09-10. Extracted `--font-sans: ProximaVara`, `--font-mono: BerkeleyMono`, the nested `768 × 130 / r20` outer shell around the `752 × 122 / r12` form, the full five-property 150ms transition token, and the 10px tabular-nums cost indicator. The 390px capture is where the toolbar-collapse, dropped-suggestions and reserved-keyboard-space observations came from. The dark-theme token block is first-pass only; the site served light on re-probe.
- `https://duck.ai/` — full product, zero login, re-probed and re-screenshotted at 1440 and 390 on 2026-09-10. Measured the 640×104 / r24 composer with its `0 0 0 1px rgba(0,0,0,0.08)` shadow ring, the reserved 48px right inset and 48px bottom padding, the 14.4px base size, the +0.08px textarea tracking, the disabled `Ask` button's colour-demotion (`rgba(0,0,0,0.36)` at full opacity), the 640×74 / `r 0 0 24 24` consent panel tucked 27px behind the card, the `Fast` + `5.6 Luna` cost lane, and the `⌘ + ⇧ + O` accelerators printed inside sidebar rows.
- `https://elements.ai-sdk.dev/components/tool` and sibling component pages — re-verified 2026-09-10. Measured the tool card (r8, 1px border, no shadow, 16px bottom margin), the 46px header at `padding: 12px` / `gap: 16px`, the 14px/20px weight-500 sans tool name, the 22px status pill at 12px/500 with `2px 8px` padding on a uniform `lab(96.52 0 0)` fill, the 64px-min prompt textarea and 32px toolbar buttons; read **seven** tool states off the live preview (including `Denied`, which the first pass missed) and the full five-group, 49-component taxonomy off the sidebar.
- `https://streamdown.ai/llms.txt` — re-fetched and re-read 2026-09-10 (200KB of published reference). Confirmed `parseIncompleteMarkdown: true`, the remend completion list and its per-completion defaults, the 150ms/`ease`/`sep:"word"` fadeIn default with blurIn and 4px slideUp, the `pre`/`svg`/`math`/`annotation` skip list and the deliberate inclusion of inline `code`, block ▋ and circle ● carets, `codeBlockMaxHeight: 400` / `tableMaxHeight: 300`, `lineNumbers: true`, the pin-release-**and-re-pin** auto-scroll rule, all-controls-disabled-during-stream, controls-always-visible-on-mobile, `linkSafety: { enabled: true }`, and the rehype-raw/sanitize/harden chain.
- `https://code.claude.com/docs/en/interactive-mode` — re-read 2026-09-10. The complete keyboard table, the four multiline methods, the `/ ! @ : ?` prefixes, the queueing semantics, and the `Esc` / `Esc Esc` / 800ms `Ctrl+D` rules quoted above, plus three details the first pass dropped: `Esc` declines on a permission prompt, `Ctrl+D` is delete-forward when the prompt has text, and `Shift+Tab`'s `default` mode is **labelled `Manual`** in the mode indicator.
- `https://claude.com/product/claude-code` — real desktop app screenshot: the `acme-storefront / Fix the double-charge bug…` breadcrumb, the `Read 3 files, searched the checkout flow ›` collapsed line, `Ran agent · …`, inline code chips inside prose, and the composer footer split (Auto / + / mic left; Opus / Extra high / spinner right).
- `https://cursor.com/changelog` — real composer screenshot: the `Plan, Build, / for skills` placeholder, `Start from scratch ⌄` + `☁ Cloud ⌄` above the box, `+ High Fast ⌄` below it, the `Plan New Idea ⇧Tab` / `Multitask` chips, and the Run-on menu (Cloud / This Mac / Remote Machines ▸ with per-machine session counts and "+ Connect via SSH").
- `https://devin.ai/` — real three-pane app screenshot: sessions rail with `1 hour ago · 2 open` subtitles, `Used playbook: Test` and `Worked for 4m 13s +25 −131` collapsed lines, embedded PR cards with `Open` pills / branch chips / `6 files +21 −123`, and the artifact pane rendering a test report.
- `https://linear.app/changelog` — agent-related entries: Coding sessions (2026-06-11), Write with Agent (2026-06-18), Loops (2026-07-20), text attribution and agent-assisted editing (2026-07-23), coding sessions on mobile with per-line comments (2026-07-30), environments + browser use + usage-based AI pricing (2026-08-20), Priority inbox triaged by Linear Agent and agent-drafted projects (2026-09-03).
- `https://linear.app/developers/agents` — the agent-session activity model; confirmed `thought` as an activity type and the "emit within 10 seconds to acknowledge" rule. The full activity taxonomy is still marked Developer Preview and was not enumerated on the page.
- `https://bolt.new/`, `https://lovable.dev/`, `https://v0.app/`, `https://suno.com/` — the four prompt-to-artifact composers, for the send-verb comparison, the modality tiles, the Advanced/Plan escape hatches and the reroll-suggestions button.
- `https://elevenlabs.io/text-to-speech` — the *Select a voice › Generate speech* breadcrumb wizard and the hover-swap voice rows (category label → "Use voice", avatar → play).
- `https://openrouter.ai/chat` — multi-model comparison (`Add Model ⌘J`), the composer tool-count badge, the horizontally-overflowing suggestion card row, and the AI-disclaimer copy quoted above.
- `https://www.granola.ai/`, `https://www.notion.com/product/ai`, `https://gamma.app/`, `https://www.raycast.com/ai`, `https://ampcode.com/`, `https://huggingface.co/chat/` — surveyed for the native-vs-drawer contrast; Gamma's selection-anchored `Improve writing ✦` toolbar and Granola's in-note attributed output are the two clearest examples of AI acting on the artifact rather than beside it.

## Direction pass (2026-09)

A second reviewer re-probed five of the products live (chatgpt.com, perplexity.ai, t3.chat, duck.ai, elements.ai-sdk.dev), re-screenshotted four of them at 1440 and 390 and looked at the images, and re-read the Streamdown and Claude Code docs against every quote. What changed:

**Wrong numbers, corrected.**
- **t3.chat's global `+0.24px` letter-spacing does not exist.** Body, composer and textarea all compute to `letter-spacing: normal`. The only non-normal tracking on the page is `−0.25px` on the 10px cost indicator. The claim appeared twice (measured specifics, finding 8) and is removed from both.
- **t3.chat's transition is not "colour only, nothing moves".** The shared button token is `color, background-color, border-color, box-shadow, transform` at 150ms `cubic-bezier(.4,0,.2,1)`, and the sidebar search button transitions `transform, opacity`. Finding 12 was rebuilt around the claim that actually holds — no *layout* change on hover — which is both true and more useful than the original.
- **AI Elements has seven tool states, not six.** `Denied` was missed. It is the state that matters most for the confirmation pattern, so it now leads finding 6 and the reference-set row.
- **Perplexity's placeholder is `Type @ for connectors`,** not `Type / for search modes`.
- **ChatGPT's `--composer-shadow` token is not the composer's shadow.** The form renders a different three-layer shadow. The reference-set row implied the token was the thing to copy.
- **ChatGPT's "exactly one chip" empty state is mobile-only.** At 1440 logged-out there is no chip; "What can you do?" appears at 390.
- **ChatGPT sidebar rows are not uniformly 16px.** The primary row ("New chat") is 14px/20px; standing destinations are 16px/24px.
- **"The composer is vertically centred, not bottom-pinned" was asserted as universal and is false** — t3.chat bottom-pins on an empty conversation. Recast as a product choice with both sides named.
- Smaller: the spacing scale is exposed as `--size-*`; `Shift+Tab`'s `default` mode is labelled **Manual** in the UI; Streamdown disables *all* controls during streaming, not just copy.

**Added, from probing.**
- ChatGPT's typography tokens pair each font shorthand with a **separate `-letter-spacing` token**, and tracking is zero at 13px and below — a deliberate stop, not a linear ramp.
- t3.chat's composer is **two nested shells** (768/r20 outer, 752/r12 inner form) with the lit gradient edge living in the 8px inset.
- Duck.ai's consent panel measured properly: 640×74, `r 0 0 24 24`, tucked 27px behind the composer card. Also its disabled `Ask` (colour demotion at `opacity: 1`), its `Fast` + `5.6 Luna` cost lane, and `⌘ + ⇧ + O` printed inside sidebar rows.
- AI Elements' **full five-group, 49-component taxonomy**, and the observation that Chatbot is only one of five groups — the Code group is nearly as large.
- All seven status pills share **identical neutral chrome**; `Error` is not a red pill, the icon carries the semantics.
- Streamdown's animation **skip list** (`pre`, `svg`, `math`, `annotation`) and its deliberate inclusion of inline `code`, which yields the general test: does the wrapper change layout? Plus the **re-pin** half of the auto-scroll rule, and controls being permanently visible on mobile.
- Three Claude Code keyboard details, and the pattern under them: **every key is overloaded by input state, and the safe meaning is the one you get when the input has text.**

**Rewritten sections.**
- **Mobile** was three paragraphs of mostly-t3.chat and is now three products that disagree. The added material is from looking at the 390px captures: t3.chat drops all eight empty-state suggestion elements and floats its composer mid-screen over ~500px of reserved keyboard space; Duck.ai keeps all four toolbar controls and drops only their *labels*, which is a better rule than "collapse to `+`" and replaces it; ChatGPT's disabled send renders as a filled grey circle. Two rules added (accelerators come off; hover-only affordances become permanently visible, not long-press) and one added on empty-state loss.
- **How this archetype fails** now opens by naming the specific generated artefact — centred column, `max-w-3xl` list, paper plane, purple-to-blue gradient, sparkle emoji, shadcn defaults — and every entry ends with a **tell** that can be checked against your own source rather than argued about: `{messages, onSend}` and nothing else; `<ReactMarkdown>{buffer}</ReactMarkdown>` with no preprocessor; a loading string that is a constant; `JSON.stringify(toolCall, null, 2)`; a default model id no user could have invented; an approval that renders in a portal; a refusal that renders nothing; `disabled:opacity-50`. A closing paragraph lists the pure-style tells and the threshold at which they mean something.

**Boundaries hardened.** Findings 1, 2, 6, 7, 11 and 12 had limits that were either trivially true or, in finding 11's case, falsified by the evidence in this very file — Duck.ai is a mass-market consumer product and prints accelerators in its sidebar rows. Replacements: reserved chrome stops paying at 390px; a send verb that lies about duration backfires in both directions; an approval state machine with no human present must resolve by policy rather than hang; origin-above-the-composer collapses into a one-item dropdown when origin is a fact rather than a choice; accelerators are limited by *keyboards and repeat usage*, not audience sophistication; hover rules are limited by touch, where hover does not exist.

**Left alone.** The Cursor, Devin, Linear, Bolt/v0/Lovable, Suno, ElevenLabs, Granola and Amp observations are screenshot-derived from marketing and changelog pages and were not re-reachable for measurement in this pass. They are unchanged and undated; treat them as first-pass. Perplexity's answer-page measurements (`#27251E`, 16/26 at 720px, the tabs, the Sources rail, the rate-limit state) are now behind a bot challenge and are marked **[stale]** rather than deleted — they were measured, they are simply no longer confirmable.
