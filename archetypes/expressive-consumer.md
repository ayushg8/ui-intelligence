# expressive-consumer

**Evaluated:** 2026-09 · **Density:** comfortable — 16px body, 56–64px content rows, 48px controls; the *marketing* surface is spacious and must not leak inward · **Dark by default:** either, and the test is mechanical — **dark when the user's own content supplies the colour** (Spotify's album art, BeReal's photographs, Discord's uploads), **light when the product supplies the colour** (Duolingo, Strava, Headspace, Finch). Dark-because-it-screenshots-well is the tell `system/2-direction.md` names.

> Somebody with no obligation to be here opened this on a phone for ninety seconds, and will decide today whether to open it again tomorrow.

## When this is the right archetype

The user is a volunteer. Nothing forces them back — no employer, no balance they must check, no deadline. They come daily or several times a week, for one to five minutes, on a phone, often in a gap: a commute, a queue, bed. The stakes of any single action are near zero — a wrong tap loses a few seconds, not money, not health, not standing. What the product is actually competing for is a *habit slot*, and the design job is to make returning feel like something rather than nothing. That is what buys the personality budget: **an interface may be loud in proportion to how little it costs to be wrong in it.** The corollary runs the other way and is the whole boundary of this file — the moment a screen holds a consequence, the loudness has to stop at that screen's edge.

## The four neighbours, side by side

Every brief that lands here also fits one of four other files. Three of them fork on numbers; one does not, and saying which is which is the whole value of the comparison. All figures measured 2026-09, same probe, 1440×900.

| | `expressive-consumer` | `social-community` | `consumer-marketplace` | `fintech-consumer` |
|---|---|---|---|---|
| Body | **16 / 24** | 15 / 20–22 | 15 / 19–20 on the card | 16 / 24 |
| Unit height | **56px media row, 64px two-line — fixed** | content-sized, never fixed (96–209px) | fixed metadata block, 75–158px | 64px mobile |
| Primary control | **48px; 50–54px for the one CTA** | 32–36px desktop (Bluesky h33) | filter pill 34–36px, CTA 48px | 48px; 56px input |
| Radius | **exactly two values** (Duolingo 12; Strava 4; Spotify 6 + 9999) | pill `999px` on chrome, 8–12px on containers | image 0–8px, and no container | 12 control / 16 container / 9999 action |
| Elevation | **two shadows, different jobs** — hard zero-blur offset, plus one overlay | effectively zero (Bluesky ships 3 elements) | zero at rest, hover only | one, ≤10% alpha |
| Micro motion | **150ms** | 100–120ms | 150–250ms background, ≤100ms transform | 140ms |
| Where chroma lives | **content or chrome, never both** | six-step grey ladder; accent on actions only | the seller's photograph; chrome achromatic | never on a fact |

**Against `social-community` the fork is the unit, and it is mechanical.** The object here is product-authored and arrives at a *known* aspect ratio — album art, a lesson tile, a workout card — so the row can be fixed, and must stay ≥52px or the artwork stops reading. There the object is a stranger's sentence of unknowable length, so a fixed row plus `line-clamp` destroys the only thing the product does. That one difference propagates through the whole column: fixed rows buy 16px body and a 48px control, because there is one primary action per screen and it is the reason for the visit; ragged rows force 15px and a 33px control, because there are six controls per item and none of them is. **Discord and Strava are reference products in both files and split cleanly** — `social-community` owns Discord's four-zone shell and Strava's kudos feed; this file owns Discord's `ABC Ginto Nord` display system and Strava's single orange over photography. The test: if deleting the social graph would delete the product, you are there; if it would delete a feature, you are here.

**Against `consumer-marketplace` the fork is eliminating versus returning**, and Spotify sits on both sides of it — its search results are that file, its home shelves are this one. Six shelves of things already chosen for you do not need the 15px, the fixed metadata block, the result count or the facet row that 200 listings do. And the shelf deliberately clips the next card off the right edge, which is the exact inverse of capping a card at 200–320px and adding a column.

**Against `fintech-consumer` nothing forks, and that is correct rather than a defect.** Body, row height, control height, radius cap, shell and micro-motion are all inside measurement noise, because both files serve one untrained person holding one phone for ninety seconds — the ergonomics are the same problem and have the same answer. Pushing the geometry apart to manufacture a difference would make one of the two files wrong. So: *this archetype shares its geometry, its shell and its motion budget with `fintech-consumer`; the difference lives entirely in what is allowed to touch a number.* Here colour, motion and rounding may all land on a quantity, because the quantity is a feeling the product invented — XP, a streak, minutes meditated, and `1.2k` is a legitimate rendering of it. There none of them may, because the quantity is a claim about money that exists and the user is comparing it against a bank statement. `fintech-consumer.md` carries the four rules; this file's job is to stop at their door. Shared mechanical test: **can the user lose money by tapping the wrong thing on this screen?** If yes, that screen is theirs — even inside a product that is otherwise this one, and even if the streak two screens away is perfectly legitimate.

**Against `premium-minimal`** the metric is *return*, not *craft as the pitch*. Things and Bear are used daily too; their argument is restraint, this archetype's argument is that you felt something.

## When it is the wrong one

**Anything where a mistake costs money.** Robinhood is the live case and it is on this file's reference list as a warning, not a model. Measured today: a warm near-black `rgb(17, 14, 8)`, `Martina Plantijn` serif at `72px/64.8px ls -2px`, `Phonic` body at `16px/24px ls -0.25px` across 96 elements, one neon lime `rgb(204, 255, 0)`, zero shadows, zero transitions — a deliberately serious system, bought at cost, because the company was publicly accused of gamification and removed its confetti in 2021. And on the same domain, the referral page runs an animated pixel-art field of cartoon squirrels and flowers under the line `Invite friends, get up to $15K in stock`. That is the failure in one product: the register was fixed on the surfaces regulators look at and re-imported on the surface that acquires users. **The vocabulary is not the problem; attaching it to a contract the user cannot lose safely is.**

**Products for under-13s — YouTube Kids, Khan Academy Kids, ABCmouse, Duolingo ABC.** Superficially the closest fit in software, actually a different discipline: COPPA means verifiable parental consent, no behavioural advertising, no open social, and a hard prohibition on the exact retention mechanics this archetype is built around. Duolingo is the proof, because it ships both — **Duolingo ABC has no streak to lose, no leaderboard and no nagging push**, and it is made by the company that invented this file's engine. Applying this file to a kids' product is a legal exposure wearing a design decision.

**Any flow the user entered because something bad happened.** Report abuse, delete account, dispute a charge, a health symptom, a bereavement, a safety report. These exist *inside* expressive products and must drop the register completely at the boundary — no mascot, no illustration, no exclamation mark, no colour on the outcome. Discord's Safety pages and Headspace's crisis-resource screens both do this; the products that don't produce the worst single screens in consumer software.

**Consumer-branded tools used for hours — Slack, Notion, Canva, Figma, Spotify for Artists, Strava's route builder.** Every one has a warm brand, an illustrated marketing site and an emoji-tolerant voice, and none of them is this archetype *inside*. A personality encountered twice is charm; encountered four hundred times a day it is an obstacle (`archetypes/README.md`, dimension 3). The tell is never the branding — it is a queue, a table, a canvas or a keyboard workflow, which puts you in `technical-productivity`, `enterprise-dense` or `creative-tool`. Slack is the sharpest case: it looks exactly like a feed, its object is *read state*, its metric is a count that can reach zero, and its density is set by an eight-hour session.

**A number a clinician would act on — Dexcom, Natural Cycles, Clue's fertility window, an Oura or Whoop score used as a diagnosis.** The habit loop and the trend tab in these products genuinely are this archetype (`analytics-bi.md` routes Strava/Oura/Whoop trends here; `healthcare-clinical.md` routes wellness here). The break is one screen deep, at the point where the number stops being a trend and becomes a *result*: a glucose reading, a fertility window, a symptom escalation. That screen is `healthcare-clinical` and it drops the register exactly the way a payment screen does — no character, no colour on the value, no celebratory copy on a good result, because the same component will one day render a bad one.

What breaks if you apply it anyway: celebration on an action with a real cost; a streak that punishes a person for a week they could not control; a mascot present in a permission or payment dialog, which reads as a company being cute while taking something; and 20px radii and four accents around a number someone will reconcile.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Duolingo** | The loudest product measured that is still structurally conservative | Radius census `12px ×7` plus `2px ×4` — and the `2px` is the cookie banner, i.e. a vendor widget, not a decision. One radius, one button height (`h50`), two faces (`duolingo-sans ×135` / `feather ×7`). The "3D" chunk is a `4px` **bottom border**, not a shadow, not a gradient |
| **Spotify** (open.spotify.com) | The most expressive consumer product measured, with a UI that contributes zero chroma | Its text-colour census contains exactly **three achromatic values and nothing else** (2026-09-10 signed-out home: `#B3B3B3` ×108, white ×73, black ×6 — the ratio moves with the page, the count of distinct values never does). `#1ED760` appears **55 times as a background and zero times as a text colour**. The artwork is the only chroma on screen |
| **Discord** | Shouty display type over a calm product | `ABC Ginto Nord` uppercase at `56px/48px` — line-height *below* font-size — on marketing, against a near-neutral dark app chrome where the only colour is a role name |
| **Strava** | Expressive with near-zero radius, which proves radius is not the lever | Radius census `4px ×7`, plus two one-off strays (`8px`, `3.75px`) that nobody would notice. One accent `#FC5200`. One face (`Boathouse ×49`) at two weights. Loudness lives entirely in photography and the orange |
| **Headspace** | The warm-quiet pole: expressive without a single saturated moment | The tactile button is `box-shadow: rgba(65,61,69,0.2) 0 2px 0 0` — a **zero-blur hard offset**, the same device as Duolingo's border, tuned down. Negative tracking at every size (`-0.12px` at 12px → `-0.96px` at 32px) |
| **BeReal** | Personality achieved by removing chrome rather than adding it | Marketing and app are black, white and photograph. Zero brand colour. The product's whole voice is one structural constraint: a two-minute window, once a day |
| **Finch** *(less-named)* | The childlike pole done correctly, at 500k+ ratings | The pet is the *object of care*, not decoration — every self-care action feeds it, and skipping never harms it. Childlike is legitimate when being cared-for is the contract |
| **Gentler Streak** *(off-list)* | Apple Design Award winner built explicitly as the anti-streak | A rest day **continues** the streak. The home screen leads with a sentence (`Just What You Needed`) and a prose reading of the week, not a number to protect |
| **Robinhood** | **Warning.** Seriousness bought back with typography, then spent again on referral | What to steal: the serif. What to refuse: pixel-art squirrels on a page that opens a brokerage account |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **16px / 24px**, secondary 14px | Measured 2026-09-10: Spotify `16px w400 ×82` then `14px ×63`; Robinhood `16/24 ×96`; Strava `15/20 ×21`; Duolingo's lesson-copy size `17/24 w500 rgb(60,60,60)`; Discord `16/24 ×26` (cited, `references/consumer-and-marketplace.md`). Nobody here is scanning 200 rows, so nothing is bought by going to 13–14px — and the session happens on a phone held at arm's length, half the time in bad light. 16px is also the iOS input floor |
| Dense/secondary text | **12px only for metadata that is never acted on** | Headspace runs `12px/13.8 w500 ls -0.12px` on 43 elements — eyebrows, captions, legal. Duolingo's smallest UI text is `13px/16 w700`. A tappable label at 12px is a target-size failure before it is a legibility one |
| Page title | **24–32px in-app; 48–72px marketing, and the two scales never meet** | Spotify's in-app section head is `24px w700` in `SpotifyMixUITitle`; Headspace in-app `32px/38.4 ls -0.96px`. Marketing: Duolingo `feather 64px ls -1.28px`, Discord `56px/48px`, Robinhood `Martina Plantijn 72px/64.8px ls -2px`. Shipping the marketing scale inside the app is the single most common way this archetype goes wrong |
| Row / list-item height | **56px for a media row, 64px for a two-line row with a thumb target** | Spotify's track row is `h56` with `grid-template-columns: [index] 16px [first] 730px [last] 183px` (`references/consumer-and-marketplace.md`). The row carries artwork, so it cannot compress the way a text row can; below ~52px the artwork stops reading |
| Control height | **48px standard, 50–54px for the one primary action** | Measured: Spotify nav and CTA `h48`; Duolingo `h50 · r12 · pad 0 16px`; Strava sign-up `h43`, modal primary `h54`; Headspace `h48 · r24`. Discord's `h65` is a marketing-page size and does not belong in a product |
| Sidebar width | **None on mobile — bottom tabs, ≤5 items. Desktop: ~330px and user-resizable** | Spotify's library rail measures **331px** at 1440 and can be dragged, because what is in it is the user's own collection rather than a menu. A 224px nav rail is a `technical-productivity` number and starves a list whose items have artwork |
| Content max-width | **None on shelves — let them bleed off the right edge. 60–68ch on any prose** | Measured at both widths: Spotify cuts the next card mid-artwork at 1440 and at 390. The clipped card *is* the scroll affordance; centring the shelf in a max-width container deletes it and you replace it with an arrow nobody taps |
| Radius (control / container) | **Exactly two values, and which two matters far less than the count** | Censuses (2026-09-10): Duolingo `12px ×7` + a `2px ×4` cookie banner. Strava `4px ×7`. Spotify `6px ×147` (artwork) + `9999px ×136` (controls). Headspace `16 ×21 / 50% ×21 / 32 ×18 / 24 ×17`. Robinhood `36px ×9` + `20px ×2`. There is no expressive radius. Cap structural surfaces at 16px unless the pillow shape *is* the brand and is then applied to everything |
| Border weight & colour | **Mostly absent.** Separate by ground shift, not by line | Spotify stacks `#000` → `#121212` → `#1F1F1F` → `#292929`; Headspace sets white cards on `#F9F4F2`. A 1px `#E5E7EB` grid around expressive content is imported dashboard grammar |
| Elevation | **Two shadows and they do different jobs.** Tactile: a hard, zero-blur bottom offset. Floating: one soft overlay shadow | Duolingo `border-bottom-width: 4px`; Headspace `rgba(65,61,69,0.2) 0 2px 0 0`. Both fake a physical key-press and both collapse to zero on `:active`. Overlays: Spotify `rgba(0,0,0,0.5) 0 8px 24px ×54`. A soft drop shadow on a *button* is neither and reads as a template |
| Motion (micro / standard) | **150ms micro · 200–250ms standard · one 400–700ms celebration per genuine lifecycle event** | Measured 2026-09-10: Spotify `0.15s cubic-bezier(0.3,0,0,1)` across 163 elements; Headspace `0.15s cubic-bezier(0.32,0.94,0.6,1)` across 78; Strava `color 0.15s ease ×42`; Robinhood ships **zero transitions at all**. The one impurity in the set is Headspace's `transition: all 0.3s ease ×16` — a leak, not a licence. The personality is not in the duration — every one of these is as fast as a Linear transition. It is in *what* moves and *when* |

## Colour

**One accent. A second only if it has a different job, stated in words.** Strava `#FC5200`, Spotify `#1ED760`, Robinhood `#CCFF00` — one hue each. Duolingo runs two hues with two jobs: green means *correct / advance*, `#1CB0F6` means *secondary / informational* (×3, and it never confirms anything). The green ships as two tokens of one hue, not two hues — `#58CC02` for fills on light, `#A5ED6E` for text on dark. **Tints of one hue are free; a second hue costs a stated job.** Discord runs one blurple `#5865F2` plus one green for presence. The instant you have three saturated hues without three jobs, you have a palette instead of a system and nothing on screen is the primary action any more.

**The accent is a fill, not a text colour — and where it must be text, it is a different token.** Spotify enforces the strict form structurally: `#1ED760` on 55 backgrounds, **zero** text uses, and a text census of exactly three achromatic values. The consequences are all good — the accent never has a contrast problem, it never competes with content for the eye, and "is this element the action?" becomes a binary a reviewer can check.

Duolingo is the measured exception and it is instructive rather than contradictory. Its dominant text colour is `#A5ED6E` on **65** elements (the footer link stack on a `rgb(16,15,62)` navy), while the *fill* green stays `#58CC02` (×2 as a background, ×6 as text) and the informational blue `#1CB0F6` appears ×3. So the honest rule is two tokens with one job each: **`--accent-fill` may never be a `color:`, and `--accent-on-dark` may never be a `background:`.** Ship it as a lint rule — one line of tooling, and the accent can never quietly become body text.

**Neutrals: 10–12 steps, and the temperature follows the ground.** Warm on light (Headspace `#F9F4F2` page / `#44423F` dominant text ×148 / `#2D2C2B` ×103; Robinhood's `rgb(17,14,8)` is R>G>B even on black); near-zero chroma on dark (Spotify `#121212 / #1F1F1F / #292929 / #B3B3B3`), because any tint in a dark neutral fights the album art in front of it. That is the whole reason Spotify's greys are neutral and Monarch's are warm: one of them has to host other people's colour.

**Where colour is spent, and the budget rule.** Every product measured here spends its chroma in exactly one of two places: on **user or artist content** (Spotify, BeReal, Strava's photographs, Discord's uploads) or on **product-authored illustration** (Duolingo, Finch, Headspace's shapes). Never both. If the content is already colourful, the chrome must be achromatic; if the chrome is colourful, the content is line art you drew. Products that make both loud are the ones that read as childish, and this is the mechanism.

**Semantics stay semantic.** Green/amber/red mean succeeded/pending/failed and nothing else — which is exactly why a green streak flame and a green "correct" chime cannot both exist in one product. Pick which meaning the green carries.

## Type

**Two faces at most: one display, one text — and a hard gap between their scales.** Measured pairs: Duolingo `feather` (display) + `duolingo-sans` (UI); Discord `ABC Ginto Nord` + `ggsans`; Spotify `SpotifyMixUITitle` + `SpotifyMixUI`; Robinhood `Martina Plantijn` + `Phonic`. Strava and Headspace prove one face is enough (`Boathouse`, `Headspace Apercu`). What none of them ship is a smooth ramp: Spotify's scale is 24 → 16 → 14 → 12 with **nothing between 16 and 24**. `editorial` needs a continuous ramp because a reader descends it; this archetype needs a cliff, because a headline here is a *voice* and a voice that is only 1.3× larger than body text reads as a bigger paragraph.

**Face character.** Round apertures, generous x-height, a little bounce in the terminals — Apercu, Boathouse, ggsans, duolingo-sans are all in this family. A serif is the specific move for buying gravity back inside an otherwise loud system (Robinhood; `craft/typography.md` documents the pairing rule). What does not belong: a geometric round face used *everywhere*. Poppins/Nunito/Baloo on the display line and again on the body and again on the buttons is the most reliable single tell of the generated version of this archetype.

**Weights: pick one strategy and do not mix.** Duolingo runs **w700 as its body UI weight** — `15/20 w700 ×42`, `15/22 w700 ×36`, `13/16 w700 ×30`; over a hundred of its top elements are bold, so bold carries no emphasis and hierarchy is done entirely with size and colour. Spotify runs the opposite: **w400 ×156 against w700 ×30** (2026-09-10), so weight *is* the emphasis channel. Both are coherent. A product with 400/500/600/700/800 in play has neither.

**Tracking is where the loudness actually lives.** Duolingo's uppercase button label is `15px w700 ls +0.8px`; its display is `64px ls -1.28px`. Headspace runs negative tracking at every level. Robinhood sets `-2px` at 72px. Tight display, open micro-caps: the two ends of the tracking range do more expressive work than any colour decision, and cost nothing.

**Numerals.** Tabular for anything that ticks during use — a timer, a live distance, a rep count, a countdown to a BeReal window — so digits don't reflow while the user is watching. Proportional for a static hero figure. Never superscript a unit and never round a number the user will compare against a device (`4.86 km`, not `~5 km`).

**Monospace essentially never earns its place here.** The one exception is a string the user reads aloud or types from another screen: an invite code, a join code, a referral code. Mono on a stat, a duration or a username is imported developer grammar.

## Layout and navigation

**The shell is a phone.** Bottom tab bar, ≤5 items, labels always visible (an unlabelled icon tab is a memory test for someone who opens the app three times a week). Desktop, where it exists, is a left rail carrying the user's own collection at ~330px and resizable, plus a persistent player/compose bar if the product has continuous state.

**The primary object is a thing with a face — artwork, a photograph, an avatar, a character — and it gets the layout, not a slot inside the layout.** Spotify's shelf artwork measures `172×172 at r6px` and the title sits under it at 16px with no container at all; the image is the card (`references/consumer-and-marketplace.md`, finding 1: Airbnb's card computes to `background: transparent; border: 0; box-shadow: none`). Wrapping expressive content in a bordered, shadowed, 16px-radius rectangle adds three competing edges per item and is how a warm product starts looking like a dashboard.

**Grouping is by shelf, and shelves bleed.** Horizontal rows with an editorial heading, the next item deliberately clipped at the right edge. This is the correct structure when the product is *recommending* rather than *listing*: the shelf heading carries the reason (`Because you listened to…`, `Your rest week`), and a heading that states a reason is worth more than any filter chip.

**Cards are right here** — unlike `fintech-consumer`, where they are wrong — because the objects genuinely are discrete, ownable, sharable things. The rule that keeps them honest: **a card must be something you can open, share, or lose.** A statistic is not a card. A section is not a card. Three stats in three rounded rectangles is the bento reflex, and it turns a habit product into a quarterly business review.

## Components

**Belongs here:** bottom tab bar with visible labels; horizontal shelf with an editorial heading and a clipped peek; full-bleed media; the hard-offset tactile button that collapses on `:active`; a streak or progress object with an explicit **rest** state (not just on/off); reaction and kudos affordances; a mascot confined to error, empty, celebration and marketing; a **share-card generator** that composes the user's own data into an image (Strava's route map, Spotify Wrapped, a BeReal recap) — this is the growth surface and it is a rendering target with its own type scale, not a screenshot; a profile that is a real destination; an audio/haptic completion cue on a genuinely discrete event.

**Does not belong here:** a data table (if you need one, the product is `analytics-bi` and you should say so); `hover:scale` on anything in a grid — Airbnb runs `transition: background 0.2s` on 399 elements and moves nothing, because a cursor crossing 24 cards in two seconds makes a scaling grid boil; stacked toasts; a modal that interrupts a feed; sound on hover or page load; "Level 7" badges attached to no capability; emoji standing in for status; a countdown that manufactures urgency to spend; an interstitial upsell in the first session; and a confetti burst on any action the user will perform again tomorrow.

## States in this archetype

**Empty is the highest-value screen in the product and it is usually not an illustration.** Spotify's measured empty state is a plain `#1F1F1F` card: heading `Create your first playlist`, one line `It's easy, we'll help you`, one white pill button. No art. The reason is structural — an illustration in an empty state is decoration by definition, since it depicts nothing the user has. An illustration earns the empty state only when it is the *subject* of the product (Finch's bird, standing in a garden with nothing to do yet). Otherwise: one sentence naming what will appear here, and the one action that makes it appear.

**Loading: the layout must be final before a byte of image arrives.** This content is photographs and artwork, so reserve the known aspect ratio and paint a per-item placeholder tint (Pinterest's technique, `references/consumer-and-marketplace.md`). Never a full-screen spinner on a feed; never a shimmer over a face. Under ~200ms, ship nothing rather than a flash of skeleton.

**Error: this is the one place the mascot is unambiguously correct** — Reddit's block page is Snoo in a fedora, one plain sentence (`You've been blocked by network security.`), a neutral grey pill; Discord uses Wumpus the same way. The mascot absorbs the frustration; the *sentence* stays plain. And the licence is void the moment the error cost the user something they made: a failed upload, a lost recording, a dropped voice call gets a plain sentence, what was preserved, and a retry — no character, no joke.

**Too much is a product decision, not a layout decision.** Infinite feeds are the default failure of this archetype and no amount of density work fixes them. BeReal's answer is structural and worth copying as a *shape*: exactly one post per day, so the product ends. Where the feed must be long, give it a floor the user can see — a `You're all caught up` marker with a real date, a session cap, or a shelf structure with an end rather than an infinite river.

## Motion budget

**Functional motion is 150ms and it is the same 150ms Linear uses** (censuses in the numbers table). Expressiveness is not slowness. A 300ms `transition: all` is not personality, it is lag, and `all` additionally animates properties you never intended whenever a class toggles — Headspace's 16 `all 0.3s` elements are the only instance of it in the measured set and the only motion in the set that reads as sluggish.

**Celebration is rationed by frequency, not by taste.** The arithmetic: an animation on lesson-complete is seen ~500 times a year by a daily user. So a routine completion gets ≤400ms and must be interruptible by the next tap; a genuine lifecycle event — first lesson ever, a goal actually reached, a year in review — gets 700ms and choreography, once. `craft/motion-craft.md` has the spring parameters; `bounce: 0.15–0.25` (ζ ≈ 0.7–0.85) is the range that reads as alive without wobbling. Nothing here exceeds `bounce: 0.3`.

**Never animate:** anything on hover in a grid; a page entrance; a mascot idling in a viewport the user is trying to read; anything that gates a button.

**Sound and haptics are part of this budget**, and sound is the channel most specific to this archetype and the one most often used wrongly. It earns its place in exactly two situations: **when audio is the medium** (Duolingo's correct/incorrect chime is load-bearing — it is a language product and the ear is the organ under training) and **on a discrete completed event the user caused** (a send, a capture, a streak advance). Under 400ms, one voice, and part of a set of two or three cues the user learns — not a library.

Rules: silent on the web by default, always; on mobile, respect the hardware silent switch without exception; never on hover, scroll, page load, or an incoming passive notification inside the app; provide one switch that kills all of it and remember it forever. Haptics follow Apple's rule (`references/apple-and-craft-standard.md`): a haptic marks a *state change*, not a tap. A haptic on every button is the tell of a team that just discovered the API.

**`prefers-reduced-motion` substitutes the end state, it does not delete the feedback.** The celebration becomes the final static frame plus the sound and the haptic — a user who asked for less motion did not ask to stop being told they finished (`craft/motion-craft.md`).

## Mobile

**Mobile is the product; desktop is the reduced one** — true of Duolingo, BeReal, Finch, Strava, Headspace and Gentler Streak, all of which market in phone screenshots because that is where the product is. The web surface exists for three jobs and should be built for exactly those: acquisition (the marketing page, which is `premium-marketing` and may be far louder), the share target that a generated card links to, and the long-session review a phone is bad at.

The two genuine exceptions are Discord and Spotify, which are co-primary because their sessions run hours and their users type. Both then run a *denser* desktop than mobile — Spotify's `h56` track row against its touch-sized mobile list — which is the correct answer, not a compromise.

Non-negotiables: 48px minimum targets; 16px minimum on any input; the primary action inside the bottom third; a bottom tab bar with visible labels; horizontal shelves that clip rather than paginate; and full-bleed media that ignores the page gutter (the phone's edge is the frame).

## Copy register

Second person, contractions, short sentences, and a real voice — spent on headings, empty states, celebrations, errors that cost nothing, and the 404. Withheld from anything with a consequence. Enthusiasm is permitted here in a way it is nowhere else in this corpus (`craft/copy-and-voice.md` names Duolingo's exclamation marks as load-bearing) — but it is spent on the user's achievement, never on the product's feature.

- `You're on a 12-day streak. Take today off if you need it — it'll still be there.` beats *"Don't lose your streak! 🔥 Practice now to keep it alive!"* (which threatens a person to protect a number the product invented)
- `Nice — four days this week.` beats *"Congratulations! You've earned 50 XP! 🎉"* (XP is the product's unit; days are the user's)
- `Couldn't upload. We kept your photo — try again when you've got signal.` beats *"Oops! Something went wrong 😅"* (the emoji makes the product cheerful about the user's loss, and "something" tells them nothing)
- `2,847 people ran this route last week.` beats *"Join the community!"* (a real number is warmer than an invitation, because it is true)

Never: an exclamation mark or an emoji in a failure string; a mascot speaking inside a payment, permission or deletion dialog; guilt in the second person (`You haven't been here in a while`); or a celebration that names the product's metric instead of the user's behaviour.

## The characteristic failure

**Loud everywhere.** The generated version of this archetype spends its personality on the chrome because chrome is cheap to make loud, and a real character, real photography or a real voice is expensive. It is identifiable in about two seconds and it is always the same nine things at once: a geometric round face (Poppins, Nunito, Baloo) used for display *and* body *and* buttons; four or five saturated accents with no assigned jobs, so nothing is the primary action; a different radius per component — 8 on the card, 12 on the button, 20 on the container, 999 on the chip; a gradient on every surface including ones that hold numbers; an emoji leading every heading; `hover:scale-105 transition-all duration-300` on a grid; a stock illustration in every empty state depicting nothing the user has; confetti on a routine action; and a streak that shames.

**The five-second screenshot test.** Look at your own render and count. Every threshold below is measured off the products in the reference table, so failing one is a claim you are outside all of them:

| Count this in the screenshot | Pass | The failure ships |
|---|---|---|
| Distinct `border-radius` values | **≤2** (Duolingo 12+2 · Strava 4 · Spotify 6+9999) | 4–5: 8 card / 12 button / 20 container / 999 chip |
| Distinct type families | **≤2**, in a lopsided ratio (Duolingo 135:7 · Spotify 181:6) | 1 geometric round face at every size, or 3 families |
| Saturated hues | **≤2, each with a job you can say in words** | 4–5 with no assigned jobs, so nothing is the action |
| Display size ÷ body size | **≥2×** (Duolingo 3.2× · Discord 3.5× · Headspace 4.3×) | a 24px heading over 16px body — a default, not a voice |
| `box-shadow` on a button | **0 soft shadows** — hard `0 2px 0 0` offsets only | `shadow-lg` under a rounded pill |
| Gradients on surfaces holding numbers | **0** | a gradient stat card |
| Emoji in headings | **0** | one leading every section |
| Grid items that move on hover | **0** (Airbnb: 399 elements transition `background` and nothing translates) | `hover:scale-105 transition-all duration-300` |
| Weights in play | **1 dominant** (Duolingo w700 on ~123 leaves · Spotify w400 ×156 to w700 ×30) | 400/500/600/700/800, so weight signals nothing |

If four or more of those fail, the render is the generated version and no colour work will rescue it. The copy layer has its own tells, and they travel with the visual ones: `Level up your learning!`, `Woohoo! 🎉 You crushed it!`, `Oops! Something went wrong 😅`, `Join the community!` — product-metric enthusiasm, an emoji doing the work a verb should do, and cheerfulness attached to the user's loss.

Self-diagnosis, in order:

1. **Count the distinct border-radius values in the built page.** Duolingo has one. Strava has one. If you have five, the personality is decoration, and no amount of colour work will fix it.
2. **Grep for `color:` set to the accent.** Spotify has zero. Every hit is a place the accent is competing with content instead of marking an action.
3. **Count saturated hues, then count the jobs you can name for them in words.** The numbers must match. Three hues and one job is a palette pretending to be a system.
4. **Where is the chroma — in the chrome or in the content?** If both, you are in the failure. Turn one of them off.
5. **Is the illustration the subject or the decoration?** Finch's bird is the object of care. A person-with-a-magnifying-glass in a no-results state is decoration and should be one sentence instead.
6. **Does any celebration fire on something that happens daily?** Then it is a tax, not a reward.
7. **Could the streak punish someone for a week they could not control?** Then it is not a game — run the seven rules under *Gamification ethics* below.
8. **Take the loudest screen and ask whether a mistake on it costs money, health or standing.** If yes, that screen belongs to a different archetype and you have found your boundary.

The underlying error, stated once: **expressiveness is a budget spent on the content layer, and childishness is what happens when it is spent on the chrome layer.** Spotify's interface has no personality at all — three achromatic text colours, one radius for artwork, one for controls, 150ms transitions — and it is the most expressive consumer product measured, because every pixel of colour on screen belongs to an artist. Duolingo inverts the same discipline: the chrome is loud, so the *content* is a calm `17px/24 w500 #3C3C3C` sentence with one word to translate. Neither product is loud in more than two channels. The failure mode is a product that is loud in nine, and it reads as amateur rather than as fun, which is the worse of the two ways to be wrong (`system/2-direction.md`, on effortful versus distinctive).

## Signature decisions that fit here

1. **The rest day is a first-class state of the streak object.** Three states, not two — active, rest, gap — with rest rendered as a distinct positive glyph that *continues* the chain. Gentler Streak's entire product is this decision; it changes the data model, the notification copy, and what the user believes the product is measuring.
2. **The share card is a designed rendering target, not a screenshot.** Its own 1080×1920 canvas, its own type scale, the user's own data composed into it, and one line of provenance. It is where most of the new users come from, so it deserves the design attention the home screen gets — Strava's route map and Spotify Wrapped are two versions of the same structural bet.
3. **The accent exists only as a background fill**, enforced by a lint rule that bans `color: var(--accent)`. One line of tooling holds the entire colour policy that keeps the artwork the only chroma on screen, forever, past every future designer.
4. **A structural constraint that ends the session.** BeReal's one post per day; a curriculum that renders as a finite path rather than a feed. Deciding *when the product is finished for today* is the most consequential expressive decision available and almost nobody makes it deliberately.
5. **The primary object is drawn once, at full bleed, with no container** (spec under *Layout*). One component, and it is the entire difference between a product that feels like a place and one that feels like a CRUD app in brand colours.

## Gamification ethics

The archetype's engine and its main way of becoming indefensible. Seven rules, each with a failure it prevents.

1. **A streak may reward consistency; it may never punish absence.** Gentler Streak counts a rest day *toward* the streak, and won an Apple Design Award for a product whose entire thesis is that. Give the streak object three states — active, rest, gap — not two.
2. **The mechanic must measure the behaviour, not a proxy that is cheaper to satisfy.** If a 45-second lesson protects the streak, you have taught people to open the app, not to learn. Set the threshold at the real unit of value even though it will lower the number on the dashboard.
3. **Loss aversion is only ethical when the loss is fictional.** Losing a Duolingo streak costs nothing that exists. A "keep your streak to keep your rate" mechanic converts a game into a penalty and belongs to no archetype.
4. **Never gamify something the user does not control.** Income, sleep, symptoms, a partner's participation, weather-dependent activity. A savings streak punishes the month rent went up; `archetypes/fintech-consumer.md` names this as the reason it refuses streaks outright.
5. **Never celebrate a spend.** Confetti on a purchase, a subscription, or a deposit into a product you profit from is a casino animation, whatever the vertical.
6. **The reset is free and unshamed.** `Start again whenever you like` — not `You lost your 40-day streak 😢`. The user who broke a streak is the one most likely to leave; making them pay for absolution guarantees it.
7. **Anything losable while asleep needs a grace mechanism**, or you have shipped a nighttime anxiety machine. Freezes, a repair window, a timezone-aware day boundary.

The compact test: **if the mechanic were removed, would the user be worse off?** For a language streak, yes — the practice is the point. For a leaderboard on a meditation app, no — you have added competitive arousal to a product whose job is lowering it, which is why Headspace has neither a leaderboard nor a mascot despite being the warmest system measured.

## Sources

Screenshots at 1440×900 and 390×844 read as images; computed styles, radius/type/transition censuses and geometry extracted with a Playwright probe, September 2026.

- `https://www.duolingo.com` — re-probed 2026-09-10: lesson copy `17px/24 w500 rgb(60,60,60)`; type census `15/20 w700 ls+0.8px ×42`, `15/22 w700 ×36`, `13/16 w700 ×30`, `feather 64px ls-1.28px ×2` **and** `feather 48px w700 ×5` (both ship at 1440 — `references/consumer-and-marketplace.md` recorded only the 48 and called the 64 a wider-viewport artefact; it is not, they coexist); radius census `12px ×7`, `2px ×4` (cookie banner); faces `duolingo-sans ×135` / `feather ×7`; button `h50 r12px pad 0 16px`; **text-colour census `#A5ED6E` ×65 (footer on `rgb(16,15,62)`), `#777` ×47, `#D7FFB8` ×7, `#58CC02` ×6, `#1CB0F6` ×3**; backgrounds `#58CC02` ×2, `rgb(108,192,74)` ×2
- `https://open.spotify.com` — re-probed 2026-09-10 (signed-out home): text-colour census is **exactly three achromatic values** — `rgb(179,179,179)` ×108 / white ×73 / black ×6. (An earlier pass recorded 760/811/226 on a deeper page; the ratio moves with what is on screen, the *count of distinct values* does not, and that is the finding.) `rgb(30,215,96)` ×55 as a background, **0 as text**; radius `6px ×147`, `9999px ×136`, `500px ×55`, `50% ×35`, `2px ×18`; transitions `0.15s cubic-bezier(0.3,0,0,1)` ×163 total; overlay shadow `rgba(0,0,0,0.5) 0 8px 24px ×54`; type `16px w400 ×82`, `14px ×63`, `24px w700 SpotifyMixUITitle ×6`, and nothing between 16 and 24; faces `SpotifyMixUI ×181` / `SpotifyMixUITitle ×6`; primary control `h48 r9999px ×54`; geometry: sidebar **331px** (resizable), shelf artwork `172×172 r6px`; empty state `Create your first playlist / It's easy, we'll help you / [Create playlist]`
- `https://robinhood.com` — re-probed 2026-09-10: `Phonic 16/24 ls-0.25px ×96` (`Phonic ×133` total against `Martina Plantijn ×4`), `Martina Plantijn 72/64.8 ls-2px ×2`, `64/72`, `52/62`, `40/48 ×6`; neutral `rgb(17,14,8)` ×102 (R>G>B); accent `rgb(204,255,0)` **×8 background, ×2 text**; radius `36px ×9`, `20px ×2`, `999px ×1`; **zero box-shadows and zero transitions on the entire page** — the most restrained system in this reference set. Screenshot: the referral page `Invite friends, get up to $15K in stock` over an animated pixel-art field of cartoon squirrels and flowers
- `https://www.strava.com` — re-probed 2026-09-10: one face `Boathouse ×49`, body `15/20 w400 ×21`; radius census `4px ×7` (+ `8px ×1`, `3.75px ×1`); buttons `h43 r4px ×3`, modal primary `h54`; accent `rgb(252,82,0)` ×4 text / ×1 bg; text neutral `rgb(67,66,63)` ×26; `transition: color 0.15s ease ×42`
- `https://www.headspace.com` — probe: `Headspace Apercu`; `12/13.8 w500 ls-0.12px ×43`, `20/30 ls-0.2px ×25`, `32/38.4 ls-0.96px ×21`; radius `16px ×21`, `50% ×21`, `32px ×18`, `24px ×17`; hard-offset shadow `rgba(65,61,69,0.2) 0 2px 0 0 ×3`; transition `0.15s cubic-bezier(0.32,0.94,0.6,1) ×78` **and `all 0.3s ease ×16`**; buttons `h48 r24/r32`; grounds `#F9F4F2` ×33 / white ×32, text `rgb(68,66,63)` ×148 / `rgb(45,44,43)` ×103, CTA near-black pill, `#FFCE00` ×7, `#0061EF` ×10 bg / ×5 text
- `https://discord.com` — screenshots at both widths: `ABC Ginto Nord` uppercase display, body ~`20/28`, buttons `h65 r12`, blurple ground with a near-neutral dark product screenshot embedded in it
- `https://bereal.com` — screenshots: black / white / photograph, zero brand colour, one CTA (`Get the app ↗`) as plain text
- `https://finchcare.com` — screenshots: full-bleed illustrated world, mascot as the object of care, `5.0 · 500k+ ratings`
- `https://www.gentlerstreak.com` — screenshots: `Just What You Needed` with a prose reading of the week instead of a number; Apple Design Award and App of the Year marks; four-tab bar with `Streak / Activities / Insights`
- `https://www.reddit.com` — blocked by network security under headless Chromium at both widths. No product values taken; the only citation is the block page itself (Snoo, one plain sentence, a neutral grey pill), which is a real observation about mascot placement on an error surface
- `references/consumer-and-marketplace.md` — all Duolingo/Discord/Spotify/Headspace/Strava figures that predate this file are cited from that teardown rather than re-derived: the Spotify `h56` track row and its grid columns, the Duolingo `4px border-bottom` and `h50` button, Discord's `56px/48px` display, the Airbnb 399-element background-only hover, Pinterest's aspect-ratio placeholders, and the "loud in exactly two channels" finding this file's failure section builds on

## Differentiation pass (2026-09)

Compared against `social-community`, `consumer-marketplace` and `fintech-consumer` — the three files a "consumer app with personality" brief actually lands on by mistake, and the three that share reference products with this one (Discord and Strava with the first, Spotify with the second, Robinhood with the third). Cross-checked every shared figure against [`../references/consumer-and-marketplace.md`](../references/consumer-and-marketplace.md), the corpus's only other measurement of these products; `craft/` measures none of their geometry.

**Differentiation.** Added the side-by-side table the corpus convention uses, and split the four neighbours into two honest groups instead of four vague ones.

- **`social-community` forks on numbers, hard**, and the fork is derivable rather than asserted: the unit here is product-authored at a known aspect ratio, so the row is *fixed* (56/64px) and the artwork sets its floor at ~52px; there the unit is a stranger's sentence of unknowable length, so the row is *never* fixed (96–209px measured). Everything else follows — 16/24 against 15/20–22, a 48px control that is the reason for the visit against a 33px control that never is, 150ms against 100–120ms, two shadows with two jobs against effectively zero. Also named the dual-listing explicitly: Discord and Strava are reference products in both files, and which surface each file owns is now stated.
- **`consumer-marketplace`** reduces to eliminating versus returning, with Spotify on both sides — this file now mirrors the fork that file already asserted from its side, and adds the structural consequence (a shelf that clips is the inverse of a card capped at 200–320px).
- **`fintech-consumer` does not fork and the file now says so outright.** Six of seven geometry rows are inside noise because both archetypes serve one untrained person on one phone for ninety seconds. `fintech-consumer.md` had already stated this from its side; the reciprocal was missing here and this file only carried a one-line "never, if money can be lost". Stated as: *shares geometry, shell and motion budget; the difference is entirely what may touch a number* — here a quantity is a feeling the product invented and may be coloured, animated and rounded; there it is a claim about money that exists and may not be. Shared mechanical test named in both files.

**Numbers re-probed** (Playwright, headless Chromium, 1440×900, 2026-09-10; six corrections, all in the direction of the file having been over-confident):

1. **Spotify's text-colour census was quoted as `white ×811 / #B3B3B3 ×760 / black ×226`.** Re-probe of the signed-out home returns `#B3B3B3 ×108 / white ×73 / black ×6`. The counts were page-dependent and are now framed as what they actually prove — **exactly three distinct achromatic values, and zero accent-as-text** — with `#1ED760 ×55 background / ×0 text` re-confirmed to the element.
2. **Duolingo's radius census is not "12px and nothing else".** Measured `12px ×7` **and** `2px ×4`. The file's own Sources line already said this and its reference-table row contradicted it. Both now read `12 + 2`, with the `2px` correctly attributed to a cookie banner. (`references/consumer-and-marketplace.md` records `2px ×3`; the count drifts with the banner, the two-value finding does not.)
3. **Duolingo's dominant accent is not `#58CC02`.** Its most-used text colour is `#A5ED6E` on **65** elements — the footer link stack on `rgb(16,15,62)` — against `#58CC02` ×6 text / ×2 background and `#1CB0F6` ×3. This falsified the file's flat "the accent is a fill, not a text colour" rule using one of its own reference products, so the rule is now stated in the form that survives measurement: **two tokens, one job each — `--accent-fill` may never be a `color:`, `--accent-on-dark` may never be a `background:`.** Also corrects "Duolingo runs two accents" to two *hues*, one of which ships as two tints.
4. **Robinhood's counts moved:** body `Phonic 16/24 ls-0.25px` ×85 → **×96**, and the accent is `×8 background / ×2 text`, not ×5 text. Zero box-shadows and zero transitions re-confirmed across the whole page — it is the most restrained system in the set and the file now says so.
5. **"Measured, unanimously 150ms" was not unanimous.** Headspace also ships `transition: all 0.3s ease` on 16 elements. Recorded as the one impurity rather than quietly dropped, because a file that claims unanimity and is wrong once gets trusted zero times.
6. **Strava has one radius plus two strays** (`4px ×7`, `8px ×1`, `3.75px ×1`), and its display claim was overstated as an exclusive census. Duolingo's `feather` ships at **both** 64px ×2 and 48px ×5 at 1440 — `references/consumer-and-marketplace.md` had called the 64 a wider-viewport artefact; it is not, and that file's correction table should be updated on its next pass.

Re-confirmed unchanged, to the element: Spotify `0.15s cubic-bezier(0.3,0,0,1)` ×163, overlay `rgba(0,0,0,0.5) 0 8px 24px` ×54, radius `6px ×147` / `9999px ×136`, control `h48 r9999px` ×54, and the 24 → 16 → 14 → 12 scale with nothing between 16 and 24; Duolingo `h50 r12 pad 0 16px` and `15/20 w700 ls+0.8px ×42`; Headspace `12/13.8 w500 ls-0.12px ×43`, the hard-offset `rgba(65,61,69,0.2) 0 2px 0 0` ×3, `0.15s cubic-bezier(0.32,0.94,0.6,1)` ×78, `h48 r24`; Strava `color 0.15s ease ×42`, `h43 r4px`, `h54`, `#FC5200`.

**Hardened.** *When it is the wrong one* had two entries that named a category and no product; both now name products that superficially fit and specifically break — under-13s (YouTube Kids, Khan Academy Kids, ABCmouse, and **Duolingo ABC**, which is the same company shipping this file's engine *off*), and consumer-branded hour-long tools (Slack, Notion, Canva, Figma, Spotify for Artists). Added a third that the corpus needed a boundary for: a number a clinician would act on (Dexcom, Natural Cycles, Clue), which is the one place `analytics-bi` and `healthcare-clinical` both route *through* this archetype and then out of it.

*The characteristic failure* was a prose list of nine tells. It now leads with a nine-row **screenshot test** — count radii, families, hues, display÷body ratio, button shadows, gradients on numbers, emoji headings, moving grid items, weights in play — each with a pass threshold taken off a named product, plus the four copy strings that travel with the visual failure. Four failures or more and the render is the generated version.

**Cut:** the duplicated Spotify text census (stated three times, now once and authoritative), the motion-budget restatement of the transition censuses already in the numbers table, signature decision 5's re-argument of the Layout section, one redundant *Never animate* entry, and the Reddit provenance paragraph.
