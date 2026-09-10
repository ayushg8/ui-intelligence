# Internationalization, RTL and global interfaces

**Evaluated:** 2026-09, three rounds (09-09, 09-10, and the adversarial review at the end of this file). 25 interfaces screenshotted and read as images across English, German, Japanese, Korean, Arabic, Hebrew, Persian and Thai. Every number came from a live page's computed styles, a canvas `TextMetrics` probe at 1440×900, a rect-sort of visual character order, `Intl` on ICU 78.2, or an npm/GitHub API call. Text expansion is two independent corpora (Signal Desktop `_locales`, n≈2,500 pairs/language; Excalidraw, n≈520–580), re-measured in the review pass and reproducing to ±0.05. Where I could not measure, I say so.

i18n is the one craft area where the cost curve is brutally asymmetric: designing for it costs a day, retrofitting it costs a quarter. It is not a translation problem — it is a layout, grammar, typography, data-model and product-decision problem wearing a translation costume.

---

## If you only apply five things

1. **Size every text container for 1.8× the English pixel width, not 1.3×.** The median German UI string is 1.29× the rendered width of its English source, but the p90 is 1.78× and the p90 for strings under 10 characters is **2.16×**. Russian p90 is 2.03×, and 2.41× for short strings. Buttons, tabs, table headers and nav labels are exactly the short strings, so the median is the wrong number to design against. A 96px "Save" button needs to survive "Speichern" at 2.16× before it is safe.
2. **Never build a sentence from string fragments. Emit one ICU message per sentence.** `t('deleted') + ' ' + n + ' ' + t('items')` cannot be translated into Russian (four plural forms, and 21 takes `one` while 22 takes `few`), Arabic (six forms, and `Intl.DurationFormat('ar')` renders 2 hours as **ساعتان** — the number vanishes into a dual noun), or Polish. Write `{count, plural, one {...} few {...} many {...} other {...}}` and let the library pick.
3. **Write CSS in logical properties and you get ~90% of RTL for free.** Apple ships apple.com and apple.com/ae-ar/ from the same stylesheets: I counted **409 logical vs 23 physical** direction-bearing declarations on the English page and **419 vs 23** on the Arabic one — one codebase, `dir="rtl"` on `<html>`, done. IKEA, at 78% logical, has to serve a *different* CSS bundle to `/sa/ar/`. `padding-inline`, `margin-inline`, `inset-inline-start`, `border-start-start-radius`, `text-align: start`, `margin-inline-start: auto`. The residual 10% is three things: **`scrollLeft` runs 0 → −N in RTL** so every carousel is inert (§9), shadows and gradients stay physical, and `translateX` keyframes slide from the wrong side.
4. **Wrap every interpolated value — the whole value, never a fragment — in `<bdi>`.** Measured: `Sent by עמית 5 minutes ago` in an LTR container renders visually as **"Sent by 5 תימע minutes ago"** — the digit teleports past the name. `<bdi>` around the name fixes it. But `<bdi>` around *part* of a mixed token makes it worse: `Uploaded <bdi>تقرير.pdf</bdi> (2 MB)` renders the filename as **`pdf.ريرقت`**. Isolate at the interpolation boundary; never inside a value.
5. **Use `Intl` for every number, date, currency and list, and never a hand-rolled format string.** `Intl.NumberFormat('hi-IN').format(1234567.89)` is **`12,34,567.89`** — lakh grouping, not a separator swap. `new Intl.DateTimeFormat('th-TH').format(today)` returns **`9/9/69`** because Thailand defaults to the Buddhist era; `fa-IR` returns **`۱۴۰۵/۶/۱۸`** on the Solar Hijri calendar. `zh-CN` puts the timezone *before* the clock. Any of these hardcoded is a bug you will not see until a user reports it. The scope: `Intl` gives you the *domestic* convention, which is not always the one your product wants — `dateStyle:'short'` in `th-TH` is `9/9/69`, a two-digit Buddhist year that every non-Thai reader parses as 1969. Cross-border surfaces pin `{calendar:'gregory'}` and never use `dateStyle:'short'`. `Intl` also kills the lists you were about to hardcode: `new Intl.Locale(t).getTextInfo().direction` replaces your RTL-locale array, `new Intl.DisplayNames([t],{type:'language'}).of(t)` gives the **autonym** your language switcher needs (`Deutsch`, not `German`), and `getCalendars()` tells you `ja` wants a Japanese-imperial option (§10).

---

## The measured reference

### 1. Text expansion, measured in rendered pixels

Ratio of translated string width to English source width, `400 14px system-ui`, canvas `measureText`. Two corpora, independently collected, agreeing within ~0.05 on every language.

**Signal Desktop** (`signalapp/Signal-Desktop/main/_locales/*/messages.json`, ~2,400 pairs per language, ICU placeholders excluded):

| Language | median | p90 | **p90, strings ≤10 chars** | p99 | chars ratio* |
|---|---|---|---|---|---|
| **Russian** `ru` | **1.41** | 2.03 | **2.41** | 3.09 | 1.23 |
| **German** `de` | **1.29** | 1.78 | **2.16** | 2.83 | 1.27 |
| **Japanese** `ja` | **1.12** | 1.69 | **1.96** | 2.45 | 0.57 |
| **Finnish** `fi` | **1.08** | 1.67 | **2.05** | 2.80 | 1.14 |
| **Arabic** `ar` | **0.91** | 1.42 | 1.72 | 2.41 | 0.90 |
| **Korean** `ko` | **0.80** | 1.16 | 1.25 | 1.78 | 0.56 |
| **Chinese** `zh-CN` | **0.69** | 0.96 | 1.12 | 1.43 | 0.35 |

\* character-count ratio, from the Excalidraw corpus. Excalidraw's numbers for the same languages: de 1.29 median / 1.76 p90, ru 1.42/2.02, fi 1.08/1.67, ar 0.81/1.15, ja 1.09/1.57, zh 0.70/0.95 — plus **French 1.30/1.83**, **Spanish 1.24/1.66**, **Polish 1.23/1.83**, **Turkish 1.09/1.53**.

What the folk wisdom gets wrong:

- **"CJK contracts" is only true of Chinese.** Japanese UI strings are **12% wider than English in rendered pixels** at the median and 1.69× at p90, despite using 43% fewer characters, because kanji and kana are full-width — one Japanese character occupies roughly two Latin ones. Korean lands at 0.80 and Chinese at 0.69. Sizing a Japanese layout on the assumption of contraction is how you get the truncation in §"What actually broke".
- **Expansion is worst on the shortest strings and that is where the fixed-width components are.** Every language's p90 climbs 15–25% when you filter to strings ≤10 characters. The p99 for German short strings is 3.3×.
- **Arabic contracts** (0.91 median) — the common assumption that RTL needs *more* room is backwards. Arabic needs more *vertical* room (see §3), not horizontal.
- **Finnish's median is mild but its tail is not.** 1.08 median, 2.05 p90 on short strings. Finnish agglutinates: single words carry what English spreads over four.

**The number to design against: `max(1.8 × English width, 2.2 × English width for labels under ~10 characters)`,** or stop using fixed widths for text containers at all, which is better.

### 2. `Intl` output across 20 locales (ICU 78.2 / Chrome 148, 2026-09-09)

| locale | `format(1234567.89)` | dec | grp | currency† | `dateStyle:'short'` | `timeStyle:'short'` | firstDay | weekend | percent |
|---|---|---|---|---|---|---|---|---|---|
| en-US | 1,234,567.89 | `.` | `,` | $1,234.50 | 9/9/26 | 8:04 AM | 7 Sun | Sat/Sun | 43% |
| en-GB | 1,234,567.89 | `.` | `,` | US$1,234.50 | 09/09/2026 | 08:04 | 1 Mon | Sat/Sun | 43% |
| de-DE | **1.234.567,89** | `,` | `.` | **1.234,50 €** | 09.09.26 | 08:04 | 1 Mon | Sat/Sun | 43 % |
| fr-FR | **1 234 567,89** | `,` | NNBSP | 1 234,50 € | 09/09/2026 | 08:04 | 1 Mon | Sat/Sun | 43 % |
| fi-FI | 1 234 567,89 | `,` | NNBSP | 1 234,50 € | 9.9.2026 | **8.04** | 1 Mon | Sat/Sun | 43 % |
| ru-RU | 1 234 567,89 | `,` | NNBSP | 1 234,50 $ | 09.09.2026 | 08:04 | 1 Mon | Sat/Sun | 43 % |
| pl-PL | 1 234 567,89 | `,` | NNBSP | **1234,50 USD** | 9.09.2026 | 08:04 | 1 Mon | Sat/Sun | 43% |
| tr-TR | 1.234.567,89 | `,` | `.` | $1.234,50 | 9.09.2026 | 08:04 | 1 Mon | Sat/Sun | **%43** |
| sv-SE | 1 234 567,89 | `,` | NNBSP | 1 234,50 US$ | **2026-09-09** | 08:04 | 1 Mon | Sat/Sun | 43 % |
| ar-EG | **١٬٢٣٤٬٥٦٧٫٨٩** | `٫` | `٬` | ‏١٬٢٣٤٫٥٠ US$ | ٩‏/٩‏/٢٠٢٦ | ٨:٠٤ ص | **6 Sat** | **Fri/Sat** | ٤٣٪؜ |
| ar-SA | ١٬٢٣٤٬٥٦٧٫٨٩ | `٫` | `٬` | ‏١٬٢٣٤٫٥٠ US$ | ٩‏/٩‏/٢٠٢٦ | ٨:٠٤ ص | **7 Sun** | Fri/Sat | ٤٣٪؜ |
| he-IL | 1,234,567.89 | `.` | `,` | ‏1,234.50 ‏$ | 9.9.2026 | 8:04 | 7 Sun | **Fri/Sat** | 43% |
| fa-IR | ۱٬۲۳۴٬۵۶۷٫۸۹ | `٫` | `٬` | ‎$۱٬۲۳۴٫۵۰ | **۱۴۰۵/۶/۱۸** | ۸:۰۴ | 6 Sat | **Fri only** | ۴۳٪ |
| ja-JP | 1,234,567.89 | `.` | `,` | **￥1,235** (0 dp, fullwidth ¥) | 2026/09/09 | 8:04 | 7 Sun | Sat/Sun | 43% |
| zh-CN | 1,234,567.89 | `.` | `,` | US$1,234.50 | 2026/9/9 | 08:04 | 1 Mon | Sat/Sun | 43% |
| ko-KR | 1,234,567.89 | `.` | `,` | US$1,234.50 | 26. 9. 9. | **AM 8:04** | 7 Sun | Sat/Sun | 43% |
| hi-IN | **12,34,567.89** | `.` | `,` | $1,234.50 | 9/9/26 | 8:04 am | 7 Sun | **Sun only** | 43% |
| pt-BR | 1.234.567,89 | `,` | `.` | US$ 1.234,50 | 09/09/2026 | 08:04 | 7 Sun | Sat/Sun | 43% |
| es-MX | 1,234,567.89 | `.` | `,` | USD 1,234.50 | 09/09/26 | 8:04 a.m. | 7 Sun | Sat/Sun | 43% |
| th-TH | 1,234,567.89 | `.` | `,` | US$1,234.50 | **9/9/69** | 08:04 | 7 Sun | Sat/Sun | 43% |

† The currency column shows each locale's **own** currency where it has one and USD otherwise; locale and currency are independent arguments, so `NumberFormat('de-DE',{currency:'USD'})` gives `1.234,50 $` — German separators, dollar sign.

Non-obvious rows, all verified:

- **`minimumGroupingDigits`.** `Intl.NumberFormat('pl-PL').format(1234)` → **`1234`**, no separator; `format(12345)` → `12 345`. Same for `es-ES`, `it-IT`, `bg-BG`. CLDR says these locales only group at five digits. Every "insert a comma every three digits" regex is wrong for a quarter of Europe.
- **Currency side and spacing are per-locale, and `Intl` knows them.** `de-DE` suffixes with a non-breaking space; `pl-PL` suffixes the *code* not the symbol; `ja-JP` uses fullwidth **￥** (U+FFE5) and zero decimal places.
- **Percent sign position flips.** `tr-TR` renders `%43`. `fr/de/fi/ru/sv` insert a space; `en/ja/zh` do not.
- **Calendars are not Gregorian by default.** `th-TH` → Buddhist era (2569); `fa-IR` → Solar Hijri (1405/6/18); `ar-SA` also lists `islamic-umalqura`. Any date picker that renders a Gregorian grid with hardcoded year arithmetic is wrong in three of the world's larger markets.
- **First day of week has three values in use**, and `getWeekInfo()` gives them to you: 1 (Mon) across most of Europe and China, 7 (Sun) in US/JP/KR/IN/BR/IL, 6 (Sat) in Egypt and Iran. **Weekend is Fri/Sat in the Gulf and Israel, Friday alone in Iran, Sunday alone in India.** A scheduler that greys out Sat/Sun is greying out two working days in Riyadh.
- **`zh-CN` puts the timezone before the time**: `GMT-4 11:04:05`. `ko-KR` renders `AM 11시 4분 5초 GMT-4`. So `${formattedTime} ${tzName}` — the thing everyone writes — is wrong for Chinese. Use `timeZoneName` inside one `DateTimeFormat` call.
- **Arabic and Hebrew currency output contains invisible bidi marks** (RLM / ALM) that `Intl` inserts deliberately. Don't strip them, don't `.trim()` them off, and don't compare formatted strings for equality.

### 3. Non-Latin typography, measured on live pages

**Apple ships different metrics per locale from the same components.** Identical 12px legal-copy paragraph and identical 34px heading, four locales:

| | Font stack head | 12px body | ratio | letter-spacing | `line-break` | 34px heading |
|---|---|---|---|---|---|---|
| apple.com (en-US) | `SF Pro Text` | 12 / **16.00** | 1.333 | **−0.12px** | auto | 34/50, −0.374px |
| apple.com/de/ | `SF Pro Text` | 12 / 16.00 | 1.333 | −0.12px | auto | 34/50, −0.374px |
| apple.com/jp/ | **`SF Pro JP`** | 12 / **17** | 1.417 | **normal** | **strict** | 34/**46**, normal |
| apple.com/ae-ar/ | **`SF Pro AR Text`** | 12 / **20** | **1.667** | **normal** | auto | 34/50, normal |

Read the pattern: **Arabic body gets +25% line-height. Japanese body gets +6%. Both get their negative tracking zeroed. Japanese display gets −8% line-height** (46 vs 50) because full-width glyphs already fill the em box and a Latin display leading looks loose. Japanese also gets `line-break: strict`, which enables kinsoku shori — small kana (ゃゅょっ) and closing punctuation may not begin a line.

**What Japanese-native products actually ship** (body copy, measured 2026-09):

| Product | size / line-height | ratio | measure | notes |
|---|---|---|---|---|
| SmartHR Design System | 16 / **34** | **2.125** | 20 chars | Yu Gothic stack |
| digital.go.jp (Japan Digital Agency) | 17 / **34** | **2.0** | 20 chars | **letter-spacing +0.34px (+0.02em)** — positive |
| Nikkei (news prose) | 14 / 23.1 | **1.65** | 40 chars | system stack |
| note.com (card meta) | 12 / 18 | 1.5 | 18 chars | Hiragino |
| Uniqlo JP | 17 / 25.5 | 1.5 | 71 chars | `word-break: break-word` |
| Yahoo! JAPAN (headline list) | 14 / 19.6 | **1.4** | 16 chars | **`line-break: anywhere` + `word-break: break-all`** |
| Rakuten (promo chip) | 12 / 13.2 | 1.1 | — | maximum-density chrome |

**The rule: Japanese reading prose ships 1.65–2.125. Japanese dense scanning UI ships 1.4–1.5.** The delta versus Latin is entirely in the prose tier — Latin prose is 1.5–1.7, so Japanese prose runs roughly one full step looser. Dense UI is the same in both scripts, because in dense UI you are scanning, not reading.

And **measure is counted in full-width characters, not `ch`.** Japanese web columns run 20–25 characters; long-form editorial runs 35–45. Since one zenkaku ≈ 1em, a comfortable Latin `68ch` measure is *68 Japanese characters* — nearly twice the Japanese maximum. Set `max-width` in `em` and halve it under `:lang(ja), :lang(zh), :lang(ko)`.

### 4. Logical vs physical CSS in shipped stylesheets

Count of direction-bearing declarations across every readable stylesheet on the page. The **logical** count is stable and reproduces to ±1 on a re-probe; the **physical** count swings with how strictly you match bare `left:`/`right:` (which are also used for non-directional positioning), so Apple's ratio is a range, not a point. The finding survives either way: one bundle, overwhelmingly logical.

| Page | logical | physical | % logical | what it means |
|---|---|---|---|---|
| apple.com/ | 409 | 23–56 | **88–95%** | one bundle serves LTR and RTL |
| apple.com/ae-ar/ | 419 | 23–62 | 87–95% | same bundle, `dir="rtl"` on `<html>` |
| notion.com/ja | 2215 | 193 | 92% | RTL-ready even though Notion ships no RTL locale |
| ikea.com/us/en/ | 1779 | 492 | 78% | |
| **ikea.com/sa/ar/** | **876** | **458** | **66%** | **a different CSS bundle is served to the Arabic market** |
| aljazeera.net | 27 | 993 | **2.6%** | Arabic-only site — see §"When this advice is wrong" |

### 5. Bidirectional text: measured visual character order

Each string was rendered in a `dir`-set container, then every character's `getBoundingClientRect().left` was read and the characters re-sorted by x. The right column is what a human actually sees, left to right.

| Source (logical order) | container | Rendered visual order |
|---|---|---|
| `Sent by עמית 5 minutes ago` | ltr | `Sent by` **`5`** `תימע minutes ago` ❌ |
| `Sent by <bdi>עמית</bdi> 5 minutes ago` | ltr | `Sent by תימע 5 minutes ago` ✅ |
| `رصيد الحساب: 1,234.50 USD` | rtl | **`USD`** `1,234.50 :باسحلا ديصر` ❌ |
| `رصيد الحساب: <bdi>1,234.50 USD</bdi>` | rtl | `1,234.50 USD :باسحلا ديصر` ✅ |
| `الملف report_v2.txt (12 MB) جاهز` | rtl | `زهاج report_v2.txt (12 MB) فلملا` ✅ |
| `الملف <bdi>report_v2.txt</bdi> (12 MB) جاهز` | rtl | `زهاج` **`)MB 12(`** `report_v2.txt فلملا` ❌ |
| `الملف <bdi>report_v2.txt (12 MB)</bdi> جاهز` | rtl | `زهاج report_v2.txt (12 MB) فلملا` ✅ |
| `Uploaded تقرير.pdf (2 MB) successfully` | ltr | `Uploaded ريرقت.pdf (2 MB) successfully` ✅ |
| `Uploaded <bdi>تقرير.pdf</bdi> (2 MB)` | ltr | `Uploaded` **`pdf.ريرقت`** `(2 MB)` ❌ |
| `عدد 1,331,924 مقالة` | rtl | `ةلاقم 1,331,924 ددع` ✅ (ASCII comma binds) |
| `عدد 1, 331, 924 مقالة` | rtl | `ةلاقم` **`924 ,331 ,1`** `ددع` ❌ (the *space* breaks it) |
| `النتيجة 5 - 3 للفريق` | rtl | `قيرفلل` **`3 - 5`** `ةجيتنلا` ❌ score reversed |
| `النطاق 10 to 20 فقط` | rtl | `طقف` **`to 20 10`** `قاطنلا` ❌ range scrambled |
| `اتصل 555-1234 الآن` | rtl | `نلآا` **`1234-555`** `لصتا` ❌ phone reversed |
| `الإصدار v2.10.3 متاح` | rtl | `حاتم v2.10.3 رادصلإا` ✅ (the `v` anchors it LTR) |

Three conclusions the Bidi Algorithm spec does not give you:

1. **The break happens where a neutral run — a space, punctuation, a currency code — sits next to a direction change.** A name alone next to a `!` is fine; a name next to a *number* is not. Note what the table shows about numbers specifically: a comma *inside* a number binds (class CS) and is safe, a space inside a number is not, and **two numbers separated by anything neutral swap positions** — which is why scores, ranges and hyphenated phone numbers are a distinct bug class from a lone formatted amount.
2. **Isolating a fragment is worse than isolating nothing.** `<bdi>` around only `report_v2.txt` moved `(12 MB)` to the other side of it *and* reversed it to `(MB 12)`. `<bdi>` around only `تقرير.pdf` flipped its own extension to `pdf.تقرير`.
3. **Therefore: `<bdi>` goes exactly at the interpolation boundary of your message format, wrapping the complete substituted value.** In ICU terms, wrap `{fileName}` and wrap `{size}` — each whole — or wrap the whole `{fileName} ({size})` unit. Never half of one. The programmatic equivalents are U+2068 FSI … U+2069 PDI, which measured identically to `<bdi>` and are what you use inside a `title`, `aria-label`, `<option>` or a canvas string where you have no elements. `unicode-bidi: isolate` is the CSS form; `<bdi>` is just an element with it as its UA default.

### 6. CSS feature support, Chrome 148 (verified with `CSS.supports`)

| Feature | Supported | Use for |
|---|---|---|
| `margin-inline` / `inset-inline-start` | ✅ | everything; this is the RTL story |
| `line-break: strict` | ✅ | Japanese kinsoku shori — character rules only, **not** word integrity |
| **`word-break: keep-all`** | ✅ | **Korean**, where the default breaks mid-word. Never for ja/zh. |
| **`field-sizing: content`** | ✅ | inputs and selects that grow to fit a translated value instead of truncating |
| **`word-break: auto-phrase`** | ✅ (works — verified visually) | Japanese phrase-boundary line breaking |
| `text-spacing-trim` | ✅ | trimming the empty half-em inside CJK brackets and full stops |
| `text-autospace` | ✅ | the quarter-space between CJK and Latin runs |
| `writing-mode: vertical-rl`, `ruby-position` | ✅ | vertical Japanese, furigana |
| `hanging-punctuation` | ❌ | Safari only — do not rely on it |

I rendered the same Japanese sentence three ways at a 260px column:

- **default** — breaks as `…お支払いは宿 / 泊施設で。世界各地の200万 / 軒以上の…`, splitting the compound 宿泊施設 between 宿 and 泊, and 200万軒 between 万 and 軒.
- **`word-break: auto-phrase`** — breaks as `…お支払いは / 宿泊施設で。世界各地の / 200万軒以上の…`. Compounds intact. **Same number of lines, same height, zero cost.**
- **`line-break: strict`** — identical to default. Kinsoku governs *which characters may start or end a line*; it does nothing for word integrity.

`auto-phrase` is Chromium-only. The portable equivalent is **BudouX** (`google/budoux`, Apache-2.0, 1,778★, 46,990 weekly npm installs, last published 2026-08-28), a shipped ML phrase segmenter that inserts zero-width spaces and preserves inline markup across breaks. The corpus already flags this in `libraries/_research/outside-the-bubble.md`. Use `word-break: auto-phrase` as progressive enhancement and BudouX when Japanese is a primary market.

### 7. Webfont payload by script (Google Fonts, one weight, woff2, 2026-09-10)

Every `unicode-range` subset the API emits for `wght@400`, summed by `content-length`:

| Family (400 only) | subsets emitted | total woff2 | vs Latin |
|---|---|---|---|
| Inter (latin, greek, cyrillic, vietnamese) | 7 | **92 KB** | 1× |
| Noto Sans Hebrew | 5 | **25 KB** | 0.3× |
| Noto Sans Arabic | 5 | **76 KB** | 0.8× |
| Noto Sans KR | 124 | **1,820 KB** | 20× |
| Noto Sans SC | 101 | **2,353 KB** | 26× |
| Noto Sans JP | 124 | **2,726 KB** | **30×** |

This table decides your non-Latin font strategy:

- **RTL is nearly free typographically.** A Hebrew face is 25 KB and an Arabic face 76 KB — *less than Inter*. There is no payload argument for not shipping a real Arabic or Hebrew webfont. Do it; the system Arabic fallback on Windows is Tahoma and it looks it.
- **CJK is not.** One weight of one Japanese family is 2.7 MB. `unicode-range` slicing means a given page pulls only the 5–15 slices its glyphs land in, so the *observed* cost is usually 100–300 KB — but it is unpredictable, it is per-weight, and every new character in a user-generated string is another blocking request mid-paragraph.
- **What good products actually do:** Stripe ships **the same 70.7 KB of webfont on `/`, `/de-de`, `/jp` and `/fr`** — 58.8 KB Söhne + 11.9 KB Source Code Pro — and no Japanese webfont at all. Japanese renders in the system stack. That is not neglect; that is the correct call, and it is why the Japanese hero looks native on macOS and merely fine on Windows. Ship a CJK webfont only when the brand depends on it, and then only one weight, and then subset it against your actual corpus.

### 8. Korean is not CJK for line-breaking — measured

Korean has spaces; Japanese and Chinese do not. Korean is the one script where the browser default is wrong in the *opposite* direction.

Same string, 200px column, 16px system-ui, measured by re-sorting character rects:

| | rendered lines |
|---|---|
| `word-break: normal` (the default) | `최신 기술을 품은 네이버 웨일에` / `서 빠른 인터넷을 만나보세요` |
| `word-break: keep-all` | `최신 기술을 품은 네이버` / `웨일에서 빠른 인터넷을` / `만나보세요` |

The default **split 웨일에서 between 에 and 서** — mid-eojeol, the Korean equivalent of breaking "internet" as "inter/net". `keep-all` breaks only at spaces and fixes it. **The cost is a third line**, which is exactly why it gets reverted: the fix looks like a regression in a fixed-height box. Budget the height, then set it.

Live on naver.com's browser-upgrade toast (`빠 / 른 인터넷을`), the front page of Korea's largest site. So: `:lang(ko) { word-break: keep-all; overflow-wrap: anywhere; }` — `keep-all` alone will overflow on a long unbroken URL, and `overflow-wrap: anywhere` is the release valve that only fires when nothing else fits.

### 9. RTL `scrollLeft` is negative, and every carousel gets this wrong

A 900px child in a 200px `direction: rtl` scroller, Chrome 148:

```
scrollWidth - clientWidth  =  700     // positive, as always
scrollLeft at rest         =    0     // starts at the RIGHT edge
scrollLeft = 100           →    0     // clamped; the assignment silently does nothing
scrollLeft = -100          → -100     // this is the only direction that moves
scrollLeft range           = -700 … 0
```

So the universal carousel idiom is dead on arrival in RTL:

```js
// ✗ In RTL this scrolls nothing and the "next" arrow appears permanently enabled.
el.scrollLeft += el.clientWidth;
const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth;  // always false
```

```js
// ✓ Sign the delta by the resolved direction, and compare on magnitude.
const rtl = getComputedStyle(el).direction === 'rtl';
el.scrollBy({ left: (rtl ? -1 : 1) * el.clientWidth, behavior: 'smooth' });
const atEnd = Math.abs(el.scrollLeft) >= el.scrollWidth - el.clientWidth - 1;
```

A signed `left` on `scrollBy`/`scrollTo` and `Math.abs()` on every read is the whole fix. Firefox and Safari agree with Chrome now, so the old browser-sniffing normalizers (`normalize-scroll-left`, `dom-helpers`) solve a 2019 problem and can be deleted.

### 10. `Intl` APIs that remove hardcoded lists entirely (ICU 78.2, verified)

| You were about to hardcode | The API that already knows |
|---|---|
| `const RTL = ['ar','he','fa','ur',…]` | `new Intl.Locale(tag).getTextInfo().direction` → `'rtl'` \| `'ltr'`. Verified: ar/he/fa/ur → `rtl`, en/ja → `ltr`. |
| A `{de:'German', ja:'Japanese'}` map | `new Intl.DisplayNames([tag],{type:'language'}).of(tag)` → the **autonym**. See the language-switcher section. |
| A country-name list | `new Intl.DisplayNames([locale],{type:'region'}).of('SA')` → `サウジアラビア` in `ja`, `Saudi-Arabien` in `de` |
| "Gregorian, obviously" | `new Intl.Locale(t).getCalendars()` → `th`: `buddhist,gregory` · `fa-IR`: `persian,gregory` · `ar-SA`: `gregory,islamic-umalqura` · **`ja`: `gregory,japanese`** (the imperial era — 令和8年 appears on Japanese government and banking forms) |
| Monday-first | `new Intl.Locale(t).getWeekInfo()` → `firstDay`, `weekend` |
| `str.length` for a character limit | `[...new Intl.Segmenter(l,{granularity:'grapheme'}).segment(s)].length`. Measured: `"👨‍👩‍👧‍👦 café 🇩🇪"` is `.length === 21`, **8 graphemes**. |

**And one that does not exist:** there is no `Intl` API for quotation marks. CLDR carries per-locale delimiters and `Intl` does not expose them, so `„…“` (German), `«…»` with NNBSP inside (French), `「…」` (Japanese) and `”…”` (Swedish, both marks identical) have to live in your message catalog as literal characters. Zalando's German cookie banner ships `„wir“`, `„Alles akzeptieren“`, `„Nur Notwendige“` correctly; a hardcoded `&ldquo;`/`&rdquo;` pair would render American quotes on a German page. This is the one typographic detail that no API will save you from.

---

## What actually broke, on real products, this month

Same products, English / German / Arabic / Japanese, 1440.

**IKEA Germany prints prices with the wrong decimal separator.** `114.99€`, `84.99 €`, `Vorher: 114.99€` — a period, on a `lang="de-DE"` page, where German (and CLDR, and `Intl.NumberFormat('de-DE')`) requires `114,99 €`. IKEA France, in the same browser session, renders `59,99€` correctly. So one market's price component was localized and another's was not. That is a hand-rolled formatter after five years of market rollouts.

**IKEA Japan truncates its own search placeholder.** The search input is **185px** wide on `/jp/ja/` against **297px** on `/us/en/`, **315px** on `/de/de/` and **319px** on `/sa/ar/`. The placeholder `商品・コンテンツを検索` does not fit and renders as `商品・コンテン…`. The field was *narrowed* for Japanese — to make room for the longer `ログイン・新規入会` account label — and nobody re-checked the placeholder. The Japanese-contracts assumption failing exactly as §1 predicts.

**IKEA Japan shows three price formats on one page**: `1,499円`, `¥1,499`, `¥ 1499`. **IKEA Saudi** loads a font named `"Saudi Riyal"` as the *first* family in its body stack to render one glyph — a webfont in the critical path for ﷼.

**Apple's country-selector banner is untranslated and unmirrored on every locale.** On `/de/` and `/ae-ar/` it reads "Choose another country or region…" with a `Continue` button, left-aligned, in English, above a fully mirrored Arabic page. One component escaped the pipeline and it is the first thing on the page.

**Notion's Japanese homepage runs Latin metrics on Japanese type.** The 96px hero `チームとエージェントが一緒に考える場所。` carries `letter-spacing: -4.6px` (−0.048em). Negative tracking on full-width glyphs pulls the chōonpu (ー) into its neighbours. The Japanese lede runs 20/28 — ratio 1.4, i.e. the Latin dense-UI value applied to Japanese reading prose, where the domestic convention is 1.65–2.0. Body copy carries `font-feature-settings: "lnum", "locl" 0`, explicitly disabling localized glyph forms. And the cookie banner and the language-switch bar on `notion.com/ja` are **both entirely in English**.

**Booking.com's Japanese site defaults the currency selector to USD**, with a Japanese flag beside it. Language, region, currency and timezone are four independent axes and this is what conflating them looks like. Its feature cards break Japanese compounds mid-word — `予約は今すぐ、お支払いは宿泊 / 施設で` splits 宿泊施設, `ホテル、ゲストハウス、アパートメ / ント` splits a katakana loanword, and a modal paragraph ends with the single orphaned character `す` on its own line. All three are what `word-break: auto-phrase` or BudouX fixes for free.

**IKEA Saudi sets `word-break: break-word; overflow-wrap: break-word` on Arabic body copy** while its English, German and Japanese pages use `normal`. Someone hit an overflow and reached for the universal hammer. Breaking inside an Arabic word breaks cursive joining — the letterforms change shape. Don't.

**All four Arabic interfaces I measured use Western digits.** Al Jazeera (`20 شهرا`), IKEA Saudi (`﷼49.95`), Apple Arabic (`Apple Watch Series 12`), Almosafer (`+966554400000`, `450 شركة طيران`). But `Intl.NumberFormat('ar-EG')` and `('ar-SA')` default to **Eastern Arabic-Indic** `١٢٣`. If your market research says Latin digits, pass `{ numberingSystem: 'latn' }` or the `ar-EG-u-nu-latn` tag — explicitly, with a comment, because the next engineer will assume it is a bug.

**This is an Arabic finding and it does not transfer to Persian.** Digikala — Iran's largest e-commerce, `lang="fa"`, `dir="rtl"` — renders **514 Extended Arabic-Indic digits (`۱۲۳`) against 136 Western** on its homepage. There, `Intl`'s default *is* the market convention and forcing `latn` would be the defect. Check `numberingSystem` per market; never per script.

**Uniqlo Japan shows two date formats 40px apart in one two-line notification**: `2026年9月15日(火)` and `(2026/9/8)`.

**GitHub's Japanese homepage breaks its own hero word in half — and the three-way fix is measurable.** `github.com/?locale=ja`, 1440px, `h1` at **64px / 69.12px (ratio 1.08) with `letter-spacing: -2.24px`** — Latin display metrics applied to Japanese. Rendered lines, read off the character rects:

| | line 1 | line 2 |
|---|---|---|
| as shipped (`line-break: auto`) | `開発の未来は、チ` | `ームとともに築く` |
| `line-break: strict` | `開発の未来は、チー` | `ムとともに築く` |
| `word-break: auto-phrase` | `開発の未来は、` | **`チームとともに築く`** |

Three things fall out of that table. **As shipped, a line begins with `ー`** — the chōonpu, which kinsoku shori forbids at line start, and it splits チーム (*team*, the subject of the sentence) between its first and second character. **`line-break: strict` pulls the `ー` back but still splits チーム** — proving what the property does and does not do: it governs which *characters* may start or end a line, not word integrity. **`word-break: auto-phrase` puts the break at the phrase boundary, keeps the compound whole, and produces the same two lines at the same height.** One declaration, zero layout cost. The same switch on the lede eliminates a five-character orphan line (`されます。`) and keeps `1 つの` with its counter. This is the single highest-value CSS declaration in this file for anyone shipping Japanese, and GitHub — a company with a Japanese office — does not have it.

**Stripe ships a different `font-size` per locale for the same hero, and it still is not enough.** Same component, 1440px:

| locale | `h1` font-size | rendered `h1` height | source chars |
|---|---|---|---|
| en-US | **48px** / 55.2 | 221px | 172 |
| de-DE | **44px** / 50.6 | **253px** | 211 |
| ja-JP | **44px** / 50.6 | 152px | 55 |
| fr-FR | **40px** / 46 | 184px | 201 |

German gets a 4px-smaller face *and is still 14% taller* than English; French gets 8px smaller. Per-locale type scale is a defensible strategy, and a company with Stripe's resources concluded it could not solve German expansion with layout alone. It still does not work: at 1440 the German hero's last three lines run over the gradient artwork with no contrast treatment, because the art was composed against a four-line English headline and German needs five.

**Stripe's own nav reproduces the short-string expansion law exactly.** Measured link widths, same page, same font:

| English | px | German | px | ratio | Japanese | px | ratio |
|---|---|---|---|---|---|---|---|
| Pricing | 44 | Preisgestaltung | 99 | **2.25×** | 料金体系 | 56 | 1.27× |
| Sign in | 84 | Anmelden | 107 | 1.27× | サインイン | 112 | 1.33× |
| Contact sales | 137 | Sales-Team kontaktieren | 206 | 1.50× | 営業にお問い合わせ | 179 | 1.31× |
| Stripe for enterprises | 212 | Stripe für Unternehmen | 229 | 1.08× | 大企業向けソリューション | 253 | 1.19× |

The 7-character label expands **2.25×**; the 22-character label expands 1.08× — §1's short-string law reproduced on a live nav by a different method. Japanese is wider than English in three rows of four.

**Stripe's German sales widget ships a broken plural.** `7 Vertriebsmitarbeiter/in verfügbar` — a slash-form singular/plural hedge rendered against a count of 7, where German needs `7 Vertriebsmitarbeitende verfügbar` or an ICU `plural` block. The `/in` is a gender-inclusion convention that has been dropped into a count-bearing sentence, which is exactly the class of thing a translator cannot fix from a fragment.

**Stripe's Japanese stat line renders `1.71304487%`** — `(0.0171304487 * 100) + '%'`, float error and all. `NumberFormat(locale,{style:'percent',maximumFractionDigits:2})` gives `1.71%`, plus `%43` in Turkish and `43 %` in French for free.

**Almosafer is the counter-example that scopes the chrome rule.** Saudi travel, `dir="rtl"`, built in-market: the geo/currency banner is **fully Arabic** (`أنت الآن في موقعنا العام حيث يتم إحتساب أسعار الحجوزات بالدولار الأمريكي`), and language (`English`), currency (`SAR`) and country are **three separate header controls** — the four-axes model shipped correctly by a product with a fraction of Booking.com's engineering. It also uses a flag legitimately: the 🇸🇦 sits next to `السعودية`, marking a *country*, which is what a flag means. The chrome-leaks-English pattern is a rule about products expanding outward from an English home market, not a rule about localized products.

**Three more products, three more untranslated chrome components** — this is now a pattern, not an anecdote:

- **Airbnb Arabic** (`?locale=ar`, full RTL, correctly mirrored search bar and correctly ordered dialog buttons) puts **`Log in or sign up` in English** in the header. The single most important action on the page.
- **Ynet** (Hebrew, RTL, dual Gregorian/Hebrew dating in the masthead) runs a sticky **`Do Not Sell or Share My Personal Information`** bar in English, LTR, across the bottom of every page.
- **Stripe** shows `You're viewing our website for Germany, but it looks like you're in the United States. / Switch to the United States site` — in English — on **both** `/de-de` and `/jp`.

With Apple's geo banner and Notion's cookie bar, that is **six Western products in six**: **the localization pipeline covers the content and misses the chrome.** Geo banners, cookie consent, privacy bars, auth headers and switchers belong to a different team, script or vendor. Audit them first — they sit above the fold. (Scope: this is a rule about products expanding *outward* from an English home market. Products built in-market do not have it — see the review pass on Almosafer.)

**Arabic Wikipedia is the bidi positive control.** Its article count renders as `1٬331٬924` inside RTL prose and looks scrambled at screenshot resolution; re-sorting every character by its rect confirms it is correct. Its body runs **16/26 — ratio 1.625**, independently landing on Apple's Arabic 1.667.

**The mechanism is not the one you would guess, and the review pass corrected it.** A plain ASCII comma between digits is bidi class CS and binds the number run: `عدد 1,331,924 مقالة` in an RTL container renders `ةلاقم 1,331,924 ددع` — **intact**. What scrambles it is a *space*: `1, 331, 924` renders `924 ,331 ,1`. So U+066C (what `Intl.NumberFormat('ar')` emits) is the right character for other reasons — it is the CLDR convention — but the comma is not the bug. Whitespace inside a number is.

**MDN's Japanese docs are the only good answer to partial translation I found.** A per-page banner saying the page was community-translated, with `View in English` and an `Always switch to English` preference; plus a superscript **`(英語)`** on every sidebar link whose target is still English (`fill-opacity⁽英語⁾`). The reader knows before clicking.

---

## Decisions

### Sizing for expansion

The decision is not "how much padding" — it is **which components get a fixed dimension at all.**

- **Buttons:** `min-width` for tap-target and rhythm, never `width`. Let them grow. Never `white-space: nowrap` on a button whose label is translated — that turns a two-line button into horizontal overflow. If the row must stay one line, the correct answer is a `flex-wrap: wrap` button group that stacks, which is what IKEA's German cookie dialog does: three buttons stacked vertically in German, two side-by-side in Japanese and Arabic. That is the layout working, not failing.
- **Tabs and nav:** budget for 1.8× and then design the overflow. Apple's Japanese nav mixes `ストア`, `エンターテインメント` (11 full-width chars) and Latin `AirPods`, `TV & Home` on one row — the mixed-script rhythm is visibly uneven, and it fits only because the longest item was translated conservatively. Below ~1100px you need a scroller or a "More" menu, not a squeeze.
- **Table headers:** the worst case in the whole product, because they are short (max expansion) and the column width is shared with the data. Allow two-line headers, `align-self: end`, and set `min-width` on the column from the *data*, not the header.
- **Fixed-height containers are the actual bug.** A card whose title is `height: 48px` because two lines of English fit is a card that clips German. Use `min-height`, and let `line-clamp` handle the genuinely unbounded case — with `-webkit-line-clamp` on the *container*, so a 2-line English title and a 2-line German title both end cleanly.
- **Test with pseudo-localization before any translation exists.** Wrap every string as `[!!! Ŕéşéţ ƥåşşŵöŕð !!!]` — 40% longer, accented, bracketed. Bracket-visible-at-both-ends catches concatenation; length catches layout; accents catch font subsetting. This costs an afternoon and finds 80% of what a German QA pass would find, months earlier.

### Never concatenate

**Grammar is not compositional across languages.**

```js
// ✗ Wrong. Four separate bugs.
`${t('deleted')} ${count} ${count === 1 ? t('item') : t('items')}`
```

1. Word order is fixed by the English source. Japanese is SOV; German moves the verb; Arabic and Hebrew are RTL, so the fragments render in an order the translator cannot control.
2. `count === 1` encodes English's two-form plural. Measured `Intl.PluralRules` categories: **en/de/hi → 2 forms. fr/es/it/he → 3. ru/pl/cs/lt → 4. ar/cy → 6. ja/zh/ko → 1.** Spanish and Italian having three surprises people who file Romance languages under "like English" — CLDR added a `many` category for large numbers. And selection is not monotonic: in Russian **21 → `one`, 22 → `few`, 25 → `many`, 101 → `one`**. In Arabic **0 → `zero`, 1 → `one`, 2 → `two`, 3 → `few`, 11 → `many`, 100 → `other`, 111 → `many`**.
3. The number may not survive as a number. `Intl.DurationFormat('ar').format({hours:2})` → **`ساعتان`**. The digit 2 is gone; Arabic's dual is inflected into the noun. No amount of string joining produces that.
4. The translator sees `"deleted"` and `"items"` as separate keys with no context and cannot tell you it's impossible.

```js
// ✓ Right. One message, one unit of meaning, translator sees the whole sentence.
t('files.deleted', { count })
// en: "{count, plural, one {Deleted # file} other {Deleted # files}}"
// ru: "{count, plural, one {Удалён # файл} few {Удалено # файла} many {Удалено # файлов} other {…}}"
// ja: "{count, plural, other {# 個のファイルを削除しました}}"
// ar: "{count, plural, zero {…} one {…} two {…} few {…} many {…} other {…}}"
```

Rules that follow:

- **`#` inside a plural body formats the number in the message's locale.** `{count}` does not — it interpolates raw. Use `#`.
- **`select` for gender, and always ship an `other` branch**, because "prefer not to say" and "unknown" exist and because some languages need a fourth branch you did not anticipate. `{gender, select, female {她的} male {他的} other {TA的}}`.
- **`selectordinal` for "3rd", "21st".** English alone needs four ordinal forms.
- **Rich text goes inside the message, as tags, not around it.** `"Read our <link>privacy policy</link> before continuing"` with `link` bound to a component. Splitting the sentence to wrap the middle in an `<a>` is concatenation with extra steps, and it puts the link in the wrong place in Japanese.
- **Never reuse a key because the English happens to match.** "Post" the noun and "Post" the verb are the same string in English and different words in nearly every other language. One key per *meaning*.
- **Ship the `description`/comment field.** Both corpora I measured carry it. Signal's `messages.json` pairs every `messageformat` with a `description`. That comment is the only context a translator gets.
- **`Intl.MessageFormat` (MessageFormat 2) is not shipping yet** — `typeof Intl.MessageFormat === 'undefined'` in Chrome 148 and Node/ICU 78.2. ICU MessageFormat 1 through a library remains the answer today.

### RTL: what mirrors and what does not

**Mirror:** layout direction, text alignment, the reading order of nav and toolbars, the primary/secondary button order in a dialog (IKEA Saudi puts the affirmative on the right), table column order, sidebar side, breadcrumb chevrons, back/forward arrows, indentation, list bullets, dropdown alignment, tab order, slide-in drawer origin, progress fill origin, the `>` in a "next" affordance, text-input caret and label alignment, floating-label offsets, badge/notification-dot corner, and the direction of any "advance" or "return" motion.

**Do not mirror:**
- **Icons of physical objects that are not direction-bearing.** A magnifying glass, a printer, a padlock, a camera, a paperclip, a shopping cart with contents, a car. The RTL magnifier handle points the other way in the Material and SF icon sets, so if you are using them, use their RTL variants; do not `scaleX(-1)` a rendered SVG of a camera.
- **Media transport controls.** Play, fast-forward, rewind, skip, the timeline scrubber. These map to physical tape motion, not reading order, and they are the same worldwide. **Mirroring the play button is the single most common RTL bug.**
- **Numbers.** `1,234` reads left-to-right inside RTL text, always. Clock faces, credit card numbers, version numbers, IP addresses, code.
  **But a single number and a compound of two numbers behave completely differently, and this is the trap.** Measured in an RTL container: `النتيجة 5 - 3 للفريق` renders as **`3 - 5`** — the score is reversed. `النطاق 10 to 20 فقط` renders `to 20 10`. `اتصل 555-1234` renders **`1234-555`**. Each number stays internally intact; their *order* flips. So scores, ranges, dimensions (`1920 x 1080`), page counts (`1 of 10`) and hyphenated phone numbers must be wrapped whole in `<bdi dir="ltr">` or `dir="ltr"` — isolating them is not optional the way it is for a lone `1,234`.
- **Charts with a time axis.** A time-series x-axis stays left-to-right in nearly every RTL product I have seen, because the underlying convention is mathematical, not typographic. Category bar charts *do* flip. The honest position: this is genuinely contested and market-dependent — check with a native reviewer rather than assuming either way.
- **Code, terminals, file paths, URLs, math.** `dir="ltr"` explicitly on every one of them, plus `unicode-bidi: isolate`.
- **Logos and brand marks.** Ever.
- **Anything mid-animation.** A spinner spins the same way.

**The three things logical properties do not cover**, and that therefore need code:

1. **`scrollLeft` goes negative in RTL** (§9). Every horizontal carousel, table scroller, timeline and tab-overflow control needs `scrollBy({left: signed})` and `Math.abs()` on reads, or it is inert in RTL with permanently-enabled arrows.
2. **Shadows, gradients and background-position are still physical.** `box-shadow: 4px 4px` and `linear-gradient(to right, …)` do not flip. Use `:dir(rtl)` to override the handful that are direction-bearing, and leave the rest alone — a drop shadow implying a light source usually should *not* flip.
3. **`transform: translateX()` and every keyframe that uses it.** A drawer that slides in from `translateX(100%)` slides from the wrong side in RTL. `inset-inline-start` + a signed multiplier, or `:dir(rtl) { --slide: -1 }`.

**Implementation, in cost order:**

1. **Logical properties.** Free. `padding-inline`, `margin-inline-start`, `inset-inline-end`, `border-inline-start`, `border-start-end-radius`, `text-align: start|end`, `float: inline-start`. Flexbox and Grid already flow along the inline axis, so `flex-direction: row` mirrors by itself. Tailwind v3.3+ ships `ps-*`/`pe-*`/`ms-*`/`me-*`/`start-*`/`end-*`; use those and never `pl-*`/`left-*` for anything text-adjacent.
2. **`dir` on `<html>`, and on any subtree with a different direction.** Never `direction` in CSS for the document — the DOM `dir` attribute is what `<bdi>`, form controls, and `:dir()` all key off. `:dir(rtl)` is the selector for the residue.
3. **The residue.** Directional icons (`:dir(rtl) .icon-chevron { transform: scaleX(-1) }`), `background-position`, `box-shadow` and `text-shadow` offsets, `transform: translateX`, `clip-path`, gradient angles, and any physical value in an inline `style`. Budget a day for a mid-size product.
4. **A build-time RTL transform is the fallback, not the plan.** MUI's own RTL guide requires three steps — HTML direction, theme direction, *and* a stylis RTL plugin — because CSS-in-JS emits physical properties. Verified: **`stylis-plugin-rtl` was last published 2021-10-19 and `rtl-css-js` 2022-12-21.** The tooling that transforms physical CSS to RTL has been unmaintained for four to five years, while logical properties have been Baseline for years. Write logical properties.

**Bidi isolation, restated as a rule an agent can follow:** every value that came from a user, an API, a filename, a currency formatter or another language gets isolated at its interpolation boundary. In JSX that is `<bdi>{value}</bdi>`. In a plain string destined for an attribute it is `'⁨' + value + '⁩'`. In a translation message it is the whole `{placeholder}`, never a substring of it. React-intl and next-intl do not do this for you.

### CJK typography

- **Line-height, per the measured table:** 1.7–2.0 for Japanese reading prose, 1.4–1.5 for dense scanning UI. Set it under `:lang(ja), :lang(zh), :lang(ko)`, not globally, or your English prose gets airy.
- **Reset `letter-spacing: normal` under `:lang(ja), :lang(zh), :lang(ko)`.** Negative tracking on full-width glyphs is a visible defect at display sizes (see Notion above). If you want tighter CJK display type, `font-feature-settings: "palt"` — proportional alternate widths — is the correct mechanism, not `letter-spacing`. Note that digital.go.jp goes the *other* way, +0.02em, which is a legitimate Japanese convention for legibility at body sizes.
- **Line breaking:** `line-break: strict` for kinsoku, plus `word-break: auto-phrase` (Chromium) and/or BudouX for phrase integrity. They solve different problems and you want both. Never `word-break: break-all` unless you are Yahoo! JAPAN and have made density the entire product.
- **Font stacks that actually cover CJK.** The three scripts need three different fonts — Chinese and Japanese share codepoints but render them with different regional glyph forms (the Han unification problem), so a single "CJK" font produces the wrong shapes for at least one market. The stacks I measured: Apple → `"SF Pro JP", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo`; IKEA → `"Noto IKEA", "Noto Sans JP", "Noto Sans"`; Yahoo → `"ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN"`; SmartHR → `SDSYuGothic, "Yu Gothic"`. Note that Apple and IKEA both insert a *locale-specific* family ahead of the generic one rather than relying on fallback. Do the same, scoped with `unicode-range` if you self-host, or you will ship a 400KB webfont that contains no CJK and watch the browser swap fonts mid-sentence. A full Japanese font is 3–8MB; subset it or use the system stack.
- **Punctuation occupies a full em box that is mostly empty.** The ideographic comma 、 and full stop 。 leave a visible hole, especially at display sizes — Notion's 96px `場所。` is the exhibit. `text-spacing-trim: trim-start` (Chrome 148 ✅) fixes it. `text-autospace` handles the quarter-space Japanese typography wants between a CJK run and an adjacent Latin run — `iPhone史上最大` should have air around `iPhone` and by default does not.
- **Latin-designed type scales look wrong because CJK has no ascenders, descenders, or x-height variation.** A 1.25 modular scale that reads as clear hierarchy in Latin reads as "slightly different sizes of grey" in Japanese, because every glyph fills the same box. Japanese products compensate with weight and color more than size — see Yahoo! JAPAN, which runs almost the entire page at 12–14px and gets hierarchy from boxes, rules and color. Widen your size steps for CJK or lean harder on weight.
- **Halfwidth and fullwidth digits coexist and look terrible mixed.** Yahoo! JAPAN's front page carries `3時間前` (halfwidth 3) and `９歳` (fullwidth ９) in adjacent headlines. Normalize to halfwidth for anything you render.
- **Korean gets the opposite treatment from Japanese and Chinese.** Korean has spaces; the browser default breaks *inside* words. `:lang(ko) { word-break: keep-all; overflow-wrap: anywhere; }` — see §8 for the measurement and for why the fix costs you a line of height. Never apply `keep-all` to `:lang(ja)` or `:lang(zh)`, where it prevents almost all breaking.
- **Decide the CJK webfont question with §7's numbers, not with taste.** One weight of Noto Sans JP is 2.7 MB across its 124 subsets — 30× Inter. Stripe ships zero Japanese webfont on `/jp` and renders in the system stack, which is the right default. Arabic (76 KB) and Hebrew (25 KB) are the opposite case: ship the real face, because the Windows Arabic fallback is Tahoma.
- **Never assume `.length` is a character count.** `Intl.Segmenter` with `granularity: 'word'` correctly segments `東京都渋谷区で新しい仕事を始めました` into `東京|都|渋谷|区|で|新しい|仕事|を|始め|ま|した`. And `"👨‍👩‍👧‍👦".length === 11` while its grapheme count is 1 — so character-count limits, truncation, and `slice()` all need `Intl.Segmenter('…', {granularity:'grapheme'})`.

### Names, addresses, phone numbers

**"First name / last name" is a bug**, and the GOV.UK Design System — which has more evidence about form completion than almost anyone — says so on its Names pattern page: *"Not everyone's name fits the first-name, last-name format. Using multiple name fields mean there's more risk that a person's name will not fit the format you've chosen and that it is entered incorrectly."* Their default example is a single `Full name` input with `autocomplete="name"` and `spellcheck="false"`.

The design decision is: **do you actually need to address someone by a name part?**

- **No (the usual case)** → one field, labelled "Full name", `autocomplete="name"`. Store it as one string. This handles mononyms (Indonesian, Icelandic patronymics), Spanish and Portuguese double surnames, name order (Japanese, Chinese, Korean, Hungarian all put family name first — and Japanese products commonly ask for 姓 then 名, plus a *second* pair of fields for the phonetic reading 姓（カナ）/ 名（カナ）, which no Western form model has a slot for), particles (van der, bin, de la), and the fact that legal name, display name and preferred name are three different values.
- **Yes** → two fields labelled **"Given name" / "Family name"** with `autocomplete="given-name"` / `family-name` (GOV.UK's own guidance for non-UK users), *plus* a separate optional "What should we call you?" for salutations. Never derive a greeting by splitting on the first space.
- **Never** validate a name against a character class. Names contain digits, apostrophes, hyphens, spaces, periods, and every script Unicode has. `spellcheck="false"` on the input; red squiggles under someone's surname is a small insult that compounds.
- **Never** require a "middle name". Make it optional and, per GOV.UK, do not append "(optional)" — people with no middle name will skip it.

**Addresses.** The US shape — street / city / state / 5-digit ZIP — is one of several dozen. Ireland had no postcodes at all until 2015 and Eircodes are still frequently absent; Hong Kong, UAE, Panama and about 60 other territories have none. UK postcodes are alphanumeric with a space and up to 8 characters. Dutch are `1234 AB`. Japanese addresses run **largest-to-smallest** (〒postal → prefecture → city → ward → block → building), which is not a rearrangement of the Western form but a different decomposition. Argentine and Brazilian addresses carry a mandatory "number" separate from the street.

The working pattern:
- **Country first**, and let the country choice re-render the rest of the form. This is the whole trick. Google's `libaddressinput` dataset (the same data behind Chrome autofill, Stripe Address Element and Shopify checkout) has the per-country field order, required-field set, sublocality names ("state" vs "province" vs "prefecture" vs "county"), and postcode regex.
- **Never mark postal code required globally**, and never validate it with a US regex. If you must validate, validate only the country you have a rule for and let everything else through.
- Use a **freeform "Address line 1 / line 2"** fallback for countries you have no schema for, rather than forcing a shape.
- `autocomplete` tokens are the cheapest win here: `street-address`, `address-line1`, `address-level2` (city), `address-level1` (state/province), `postal-code`, `country-name`.

**Phone numbers.** Store E.164 (`+81312345678`) — one canonical form, no ambiguity, works for SMS. Display with `libphonenumber-js`'s national format for the user's region. Input: a country-code selector plus a permissive text field. **Never** validate with a regex you wrote; number lengths are 4–15 digits, and mobile prefixes change. Never reject spaces, hyphens, parentheses or a leading `+` — strip them. Never assume a leading zero is significant or insignificant without knowing the country (it is dropped when internationalizing UK and German numbers, kept in Italian).

### Dates, times, numbers, currency

- **`Intl.DateTimeFormat` with `dateStyle` / `timeStyle`, never a format string.** `dateStyle: 'medium'` gives `Sep 9, 2026` / `9 sept. 2026` / `2026年9月9日` / `9 בספט׳ 2026` from one call. If you need a custom combination, use the option bag (`{year:'numeric', month:'short', day:'numeric'}`), which lets CLDR pick the order, not you.
- **`hourCycle` comes from the locale.** `en-US`, `ar-*`, `ko-KR`, `hi-IN`, `es-MX` default to 12-hour; almost all of Europe, `ja-JP` and `zh-CN` to 24. Do not offer a "24-hour time" toggle without defaulting it correctly first. And `ko-KR` puts the meridiem **before** the clock (`AM 8:04`).
- **"Which timezone is this in?" is the most common date bug in software.** Every timestamp shown without a zone is ambiguous, and the failure mode is silent: a meeting at "3:00 PM" that is actually 3pm in the *server's* zone, or in the *creator's* zone, or in the viewer's. Rules: (a) store UTC or a full offset-bearing ISO string, always; (b) for anything shared between people — meetings, deadlines, market hours, on-call shifts — **render the zone abbreviation next to the time and make it the viewer's zone by default**, with the origin zone on hover; (c) get the viewer's zone from `Intl.DateTimeFormat().resolvedOptions().timeZone` (418 zones are supported), never from an offset, because offsets change twice a year; (d) for a recurring event, store the IANA zone *with* the event, not the resolved UTC instant, or every occurrence shifts an hour at the DST boundary; (e) date-only values (birthday, invoice date, holiday) must never be stored as a timestamp — `2026-09-09T00:00:00Z` becomes September 8th in Los Angeles.
- **Relative time only inside a window.** `Intl.RelativeTimeFormat(locale, {numeric:'auto'})` gives `yesterday` / `gestern` / `昨日` / `أمس` for −1 day and `3 days ago` beyond. Switch to an absolute date past ~7 days, and put the absolute date in a `title` at all times.
- **First day of week from `new Intl.Locale(tag).getWeekInfo()`** — `firstDay` and `weekend` are both there, and both surprised me (see the table). Hardcoding Monday is wrong in the US; hardcoding a Sat/Sun weekend is wrong across the Gulf, Israel and Iran.
- **Currency: `Intl.NumberFormat(locale, {style:'currency', currency})` and nothing else.** It handles symbol vs code, side, spacing, and decimal count (`JPY` has zero; `KWD`, `BHD`, `TND` have three — a "cents = ×100" assumption is wrong in the Gulf). Note the locale and the currency are **independent arguments**: a German user viewing a USD invoice wants `1.234,50 $`, German separators with a dollar sign, which is exactly what `NumberFormat('de-DE', {currency:'USD'})` produces. Getting this wrong in the other direction is Booking.com's USD-on-a-Japanese-site.
- **Ambiguous-symbol currencies need the code.** `$` is used by ~20 currencies. If your product touches more than one of them, render `US$` / `CA$` / `A$` — `currencyDisplay: 'narrowSymbol'` gives you the short form and the default gives you the disambiguated one.
- **`Intl.ListFormat` for "A, B and C"**, which is `A、B、C` in Japanese, **`A وB وC`** in Arabic (no comma at all — ICU 78 emits the conjunction alone), `A, B ו-C` in Hebrew and `A、B和C` in Chinese. None of these is `arr.join(', ')` with a hardcoded conjunction.
- **`Intl.Collator` for every sort of user-visible text.** Measured: `["ö","z","a","ä"].sort(Intl.Collator('sv').compare)` → **`a z ä ö`** (Swedish puts ä and ö after z), while German gives `a ä ö z`. `Array.prototype.sort()` with no comparator sorts by UTF-16 code unit, which is wrong in every language including English (it puts `Z` before `a`).
- **The Turkish dotless-I.** `'ISTANBUL'.toLowerCase()` → `istanbul`, but `.toLocaleLowerCase('tr')` → **`ıstanbul`**. Any case-insensitive comparison — a search filter, a slug, a de-dupe — that runs `toLowerCase()` in a Turkish locale silently changes the string. Use `toLowerCase()` for machine comparison (locale-invariant) and `toLocaleLowerCase(locale)` only for display.

### The language switcher itself

The one component that is *only* about i18n, and the one AI reliably gets wrong — rules in order of how often they are violated:

- **Language names go in their own language — the autonym — never translated.** `Deutsch`, `日本語`, `العربية`, `עברית`, `한국어`, `简体中文`, `français`, `suomi`, `русский`. Not `German, Japanese, Arabic, Hebrew, Korean, Simplified Chinese`. A user who cannot read your current language cannot find their own language in a list written in it — which is the entire purpose of the control. `new Intl.DisplayNames([tag], {type:'language'}).of(tag)` produces the autonym; passing the *current* locale as the first argument produces the translated name and is the bug.
- **Region-qualified tags keep their region:** `português (Brasil)` and `português (Portugal)` are different products to their speakers. `Intl.DisplayNames` handles the parenthetical for you.
- **Never use flags for languages.** A flag is a country, not a language: Spanish is not Spain to 90% of its speakers, Arabic has 25 countries, and Portuguese-Brazil under a Portuguese flag is an insult with a market attached. Airbnb uses a globe glyph; Wikipedia uses a script glyph. Use text.
- **Put it where a lost user will find it**, which is the header or the footer, and make it reachable from every page including the 404 and the error boundary — those are the pages a mis-routed user lands on.
- **Changing language must not lose the page.** Swap the locale segment in the current URL and stay put. Redirecting to `/` because the target locale lacks that page is worse than showing the English page with MDN's "this page is not translated" banner.
- **Language, region and currency are three controls, not one.** Booking.com's Japanese site defaulting the currency selector to USD is the failure; a German speaker in Singapore paying in USD is a normal user (§"Where localization becomes a product decision").
- **`Intl.Locale(tag).getTextInfo().direction`** tells you whether to flip `<html dir>` when the selection changes. Do not maintain an RTL locale array.
- **Persist the choice explicitly and let it beat `Accept-Language`.** Header sniffing is the *initial* guess. Once a user has chosen, an inferred locale overriding them is the most infuriating bug in this whole area, and it usually shows up as a geo-redirect banner — the same component that, in six products out of six, is not translated.

### Partial translation is a design problem, not a backlog item

Every localized product has untranslated strings, pages and sections. Three honest answers:

1. **Fall back silently to the source language.** Correct for short UI strings where a missing translation is invisible noise, wrong for a page of prose.
2. **Fall back and say so.** MDN's pattern: a banner on the page (`this page was translated from English`, `View in English`, `Always switch to English`) plus a `(英語)` marker on nav links that lead somewhere untranslated. Cost: one flag per string bundle and one badge component. This is the right default for docs, help centres and anything with a long tail.
3. **Hide the untranslated surface entirely.** Only correct when the feature is genuinely regional.

What you must not do is show a raw key (`settings.notifications.email.title`), an empty string, or a machine translation of an error message. The first two are the classic symptom of a fallback chain that was never configured; every library in §"The tooling" supports `fallbackLng`, and the default in a fresh project is usually *not* what you want in production.

### Where localization becomes a product decision

- **Color meaning.** Red/green for up/down is inverted in Chinese, Japanese, Korean and Taiwanese markets — **red is gains, green is losses**. Every Chinese brokerage app renders it that way. If you are building anything financial and shipping to those markets, this is a per-locale token, not a preference. White is funerary in much of East Asia; green carries religious weight in much of the Muslim world. The general rule: for *semantic* color (status, direction, danger), check the market. For brand color, don't.
- **Forms of address and formality.** German has du/Sie, Japanese has a full keigo register, French has tu/vous, Korean has speech levels. This is not a translation choice — it is a brand voice decision that must be made once and enforced, because a translator making it per-string produces an inconsistent product. IKEA is the reference case: it uses informal **du** in German (`Was suchst du?`, `Hej! Hier einloggen`) as a deliberate brand position, against the industry default of Sie. Write it into the style guide you hand the translators.
- **Imagery.** Hands, gestures, food, clothing, household interiors, holidays, seasons. IKEA's Japanese page runs a Halloween collection; its Saudi page runs neither Halloween nor anything with exposed shoulders. Southern-hemisphere markets get a summer Christmas. If your marketing imagery is a shared asset, it needs a per-market override slot from day one.
- **Which fields are even legal or normal.** Germany has strict rules on collecting personal data; Japan's postal-code-to-address autofill is an expected convenience, and its absence reads as a broken form; a "state" dropdown is meaningless in most of Europe; asking for gender is regulated in some jurisdictions.
- **Payment methods are the real localization.** Card penetration is low in the Netherlands (iDEAL), Germany (SEPA/Klarna/invoice), Poland (BLIK), India (UPI), Brazil (Pix/boleto), Japan (konbini). Shipping a card-only checkout to Germany is a bigger revenue problem than every string bug in this file combined.
- **Density expectations differ.** The Japanese web is measurably denser: Yahoo! JAPAN runs a portal at 12–14px with ratio-1.4 line-height and hundreds of links above the fold, and Japanese users read it as complete rather than cluttered. A Western-density layout can read as thin. This is real, but do not over-apply it — Uniqlo, Notion JP and Booking JP all run Western density in Japan successfully. It matters for tools and portals, less for brand and commerce.
- **The locale is four axes, not one.** Language, region, currency, timezone. A German speaker in Singapore paying in USD is a normal user. Model them separately and let each be overridden.

---

## The tooling

Verified 2026-09-09 via npm and GitHub APIs.

| Library | npm/week | Latest | Repo | Open issues | Commits since 2026-06-11 | Unpacked |
|---|---|---|---|---|---|---|
| **i18next** | **19,697,529** | 26.4.2 (2026-09-03) | 8,630★ MIT | **2** | 35 | 509 KB |
| **react-i18next** | 14,306,829 | 17.0.13 (2026-09-01) | — | — | — | 1.50 MB |
| **next-intl** | **5,135,608** | 4.14.3 (2026-09-10) | 4,359★ MIT | 51 | 39 | 399 KB |
| **vue-i18n** | 3,362,942 | 11.4.10 (2026-08-25) | 2,712★ MIT | 93 | — | — |
| **@formatjs/intl** | 2,946,316 | 4.1.20 (2026-08-30) | 14,747★ | **3** | **100+** | — |
| **react-intl** | 2,755,252 | 10.1.26 (2026-09-03) | (formatjs) | — | — | 176 KB |
| **@lingui/core** | 1,444,618 | 6.6.0 (2026-07-24) | 5,874★ MIT | 70 | 49 | **27.7 KB** |
| **@inlang/paraglide-js** | 410,569 | 2.25.1 (2026-09-08) | 1,995★ | 8 | 100+ | 2.42 MB (compiler) |
| `intl-messageformat` | 16,657,708 | 11.2.14 | (formatjs) | — | — | 111 KB |
| `@formatjs/intl-localematcher` | 19,279,739 | 0.8.13 | (formatjs) | — | — | — |
| `libphonenumber-js` | **24,117,214** | 1.13.13 (2026-09-10) | — | — | — | — |
| `@internationalized/date` | **10,286,530** | 3.12.4 (2026-09-01) | (Adobe React Spectrum) | — | — | — |
| `budoux` | 46,990 | 0.9.1 (2026-08-28) | 1,778★ Apache-2.0 | 7 | — | — |
| ~~`stylis-plugin-rtl`~~ | 322,806 | 2.1.1 — **2021-10-19** | — | — | — | — |
| ~~`rtl-css-js`~~ | 2,620,197 | 1.16.1 — **2022-12-21** | — | — | — | — |

**`libphonenumber-js` outdownloads `i18next` itself** — 24.1M weekly against 19.7M — because the phone-number problem is universal and unsolvable by hand. **`@internationalized/date` at 10.3M** is what a date picker that survives the Buddhist, Persian, Japanese-imperial and Umm al-Qura calendars costs, and why you should not build one. Every serious option here is actively maintained.

**The verdict, by situation:**

- **Next.js App Router → `next-intl`.** It is the only one of these designed around Server Components, and that matters more than any API difference: it keeps message catalogs out of the client bundle, handles the `[locale]` segment, middleware locale negotiation and `generateStaticParams` for you, and its formatting is ICU MessageFormat throughout. 5.1M weekly and climbing fast against i18next's ecosystem gravity. Costs: one maintainer's project (4,359★, 51 open issues), and it pulls `@swc/core` as a dependency.
- **Anything else React, or a large existing app → `react-intl` (FormatJS).** It is the most rigorous implementation of ICU MessageFormat in JS, it *is* the reference implementation that the `Intl` polyfills come from, and its extraction/compilation CLI is the best in the category. `formatjs` had 100+ commits in the last 90 days and 3 open issues on 14,746★. The API is verbose — `<FormattedMessage>` and `defineMessages` everywhere — and that verbosity is the price of the compile-time extraction that catches your missing plural branches.
- **Non-React, or a polyglot codebase → `i18next`.** 19.7M weekly downloads and framework bindings for React, Vue, Svelte, Angular, Node and vanilla. It is the safe institutional choice. Its native interpolation is *not* ICU — plurals go through `_one`/`_other` key suffixes — so **install `i18next-icu` and use ICU messages anyway**, or you inherit a plural system that handles Arabic's six categories through key-suffix conventions rather than a real formatter.
- **You care about bundle size and DX above all → `@lingui/core`, 27.7 KB unpacked.** Lingui's macros let you write `t\`Hello ${name}\`` in natural code and extract ICU messages at build time, so the source stays readable and the catalog stays correct. It is the best-designed API here. Smaller ecosystem (1.4M/week), and macros mean a build-step dependency.
- **`@inlang/paraglide-js` is the interesting bet.** It compiles each message into a tree-shakeable function, so unused messages leave the bundle entirely and there is no runtime message parser at all. 410k weekly and 100+ commits a quarter. The catch is that a compiler-per-message model constrains dynamic message selection and the ecosystem is young. Reasonable for a greenfield app where bundle size is a named requirement; not what I would put under a product that must ship next quarter.
- **`Intl` itself is the dependency you already have.** Number, date, currency, list, relative-time, plural-rules, collation, segmentation, duration and display-names are all native, in every browser and in Node, and 418 timezones and 162 currencies are enumerable via `Intl.supportedValuesOf`. **No i18n library should be doing any of this for you.** If you find yourself installing `moment-timezone` or `numeral` in 2026, stop.
- **`stylis-plugin-rtl` and `rtl-css-js` are not the RTL answer.** Both unmaintained since 2021–2022. Logical properties are.

---

## When this advice is wrong

- **The 1.8× expansion budget is an English-source rule, and it inverts in a CJK-source product.** Every ratio in §1 is *relative to English*. A Chinese-domestic product writes Chinese first, and the same table read backwards says English is 1/0.69 ≈ **1.45× wider than the Chinese source**. Sizing a zh-CN-only interface for 1.8× would throw away 40% of the horizontal budget in the market with the highest density expectation on the web. If your source language is CJK, the expansion rule points at your *English* build, not your product.
- **"One full-name field" is a Western-market default and it breaks Japanese checkout.** GOV.UK's evidence is real and the rule is right where it applies. A Japan-domestic product cannot follow it: Japanese forms need 姓 / 名 as separate fields *and* a second phonetic pair 姓（カナ）/ 名（カナ）, because delivery slips, bank-transfer matching and kana sorting all consume the parts. Shipping a single `Full name` input there reads as a broken form and fails the payment rails. Scope: one field unless the market's rails need the parts — Japan and Korea need them.
- **`Intl`'s default calendar is the domestic convention, not the safe one.** `dateStyle:'short'` in `th-TH` gives `9/9/69` — Buddhist era 2569, two digits. On a Thai domestic surface that is correct and expected. On a cross-border booking confirmation, a logistics manifest or anything a non-Thai reads, it is a 543-year error that looks like 1969. Pin `{calendar:'gregory'}` on shared surfaces, and never use two-digit years in `th` at all.
- **A mono-directional product should not pay for bidirectionality.** Al Jazeera is Arabic-only and ships **993 physical direction properties against 27 logical** — the opposite of everything above, and correct, because there is no second direction to flip to. If your product will only ever ship in one direction, logical properties buy you nothing but unfamiliarity. The boundary: the cost of *adopting* logical properties in a greenfield codebase is zero, so use them anyway; the cost of *migrating* a mono-directional 200k-line codebase to them is real and unjustified.
- **Pre-product-market-fit, ship English.** Everything here is cheap when designed in and expensive when retrofitted, so the correct move at seed stage is to **make the layout expansion-tolerant and put strings in a catalog** — that is the day of work — and skip translations, RTL testing, ICU plurals and locale-aware formatting entirely until a market exists. The trap is doing the expensive half (translating) without the cheap half (not hardcoding widths).
- **A single-market product in a non-English market does not need i18n; it needs to be built in that language.** A Japanese-domestic SaaS should use Japanese type metrics as its *defaults* and never carry a locale abstraction. SmartHR's design system does exactly this.
- **`Intl` defaults are not always the market convention — and the exception is per-market, not per-script.** All four Arabic sites I measured use Western digits while `Intl` defaults to Eastern Arabic-Indic, so `ar` wants an override. Persian is the opposite: Digikala runs 514 Persian digits to 136 Western, so `fa` wants the default. CLDR encodes the formally correct convention; where the market disagrees, the market wins, and you override that locale explicitly with a comment.
- **Machine translation is fine for some surfaces and disqualifying for others.** Help-center long-tail: fine. Error messages, legal copy, pricing, onboarding, anything with a plural or a name: not fine, because those are exactly where the grammar breaks that this file is about.
- **The 1.8× expansion budget is for UI chrome, not prose.** Prose reflows; the p90 for strings over 41 characters is only 1.56× in German and 1.26× in Finnish. Do not add 80% of horizontal room to a paragraph.
- **`word-break: auto-phrase` is Chromium-only, and it is a heuristic.** It got GitHub's hero right and BudouX gets more cases right, but neither understands your product's proper nouns. If Japanese is a primary market, run BudouX server-side over your own strings and check the output; if Japanese is a secondary market, `auto-phrase` as progressive enhancement is free and strictly better than nothing.
- **`word-break: keep-all` for Korean costs vertical space, and sometimes that is the wrong trade.** In a fixed-height card or a single-line table cell, a third line is a clip. The honest order is: give the container room, *then* set `keep-all`. Setting it without budgeting the height converts a cosmetic bug into a truncation bug.
- **Per-locale `font-size`, Stripe-style, is a real strategy but a maintenance tax.** Four locales at four sizes means four sets of line-length decisions and four things to re-check on every hero rewrite. Prefer a container that flexes; reach for per-locale sizing only when you have a fixed-composition hero with artwork behind it, which is exactly Stripe's case.
- **The webfont numbers in §7 are totals, not what a page downloads.** `unicode-range` means a typical Japanese page pulls 5–15 of Noto Sans JP's 124 subsets. The 2.7 MB figure is the argument against a *many-weight* CJK brand font and against self-hosting the whole family; it is not a claim that every Japanese visitor downloads 2.7 MB.
- **RTL mirroring of charts is unsettled.** I stated the common practice above; I did not measure enough RTL dashboards to state it as a rule. Ask a native reviewer.

---

## The generated version

**What AI output does here.** An English-only interface with `w-24` on buttons, `h-12` on cards, `pl-4`/`left-0` throughout, `${count} items` in JSX, `new Date().toLocaleDateString()` with no locale, `$${price.toFixed(2)}`, "First name"/"Last name" side by side, a 50-state dropdown, `pattern="[0-9]{5}"` on ZIP, and a footer language switcher that changes nothing. Asked for i18n, it installs `react-i18next`, wraps the visible strings in `t()`, leaves aria-labels, toasts and error messages hardcoded. Asked for RTL, it sets `document.dir = 'rtl'` and stops — which flips the text and nothing else, and looks like it worked in the one screenshot anyone takes.

**The specific corrections:**

| The generated thing | The correction |
|---|---|
| `w-24` / `h-12` on anything containing text | `min-w-*` / `min-h-*`; test at 1.8× |
| `pl-4`, `mr-2`, `left-0`, `text-left` | `ps-4`, `me-2`, `start-0`, `text-start` |
| `` `Deleted ${n} items` `` | one ICU message with a `plural` block and `#` |
| `t('welcome') + ' ' + name` | `t('welcome', {name})`, with `<bdi>` around the placeholder |
| `count === 1 ? 'item' : 'items'` | `Intl.PluralRules` via the message format — 6 categories exist |
| `toLocaleDateString()` (no args) | `Intl.DateTimeFormat(locale, {dateStyle:'medium'})` |
| `date.toISOString().split('T')[0]` for display | `dateStyle: 'short'` — and never store a date-only value as a timestamp |
| `` `$${n.toFixed(2)}` `` | `Intl.NumberFormat(locale, {style:'currency', currency})` |
| `n.toLocaleString()` for a table of numbers | same, plus `font-variant-numeric: tabular-nums` |
| `arr.join(', ')` for a human list | `Intl.ListFormat` |
| `arr.sort()` on names | `arr.sort(new Intl.Collator(locale).compare)` |
| `str.toLowerCase()` for a search filter | fine for machine comparison; never for Turkish display |
| `firstName` / `lastName` columns | one `fullName`, unless you provably need the parts |
| ZIP `pattern="[0-9]{5}"` | no global postcode validation; country-driven schema |
| phone regex | E.164 storage, `libphonenumber-js` display |
| `document.dir = 'rtl'` as the RTL story | `dir` on `<html>` + logical properties + `:dir(rtl)` for the icon residue |
| `transform: scaleX(-1)` on every icon in RTL | only directional icons; never play/pause, never logos, never numbers |
| One `letter-spacing: -0.02em` for all languages | reset to `normal` under `:lang(ja), :lang(zh), :lang(ko)` |
| One `line-height: 1.5` for all languages | 1.7–2.0 for CJK prose, 1.6+ for Arabic, per `:lang()` |
| `max-width: 68ch` on Japanese | ~20–25 full-width characters; set it in `em` |
| `"CJK is shorter so it'll fit"` | Japanese renders **12% wider** than English at the median |
| `carousel.scrollLeft += w` | `scrollBy({left: rtl ? -w : w})`; `Math.abs()` on every read — §9 |
| `const RTL_LOCALES = ['ar','he',…]` | `new Intl.Locale(tag).getTextInfo().direction` |
| A switcher listing `German · Japanese · Arabic` | autonyms: `Deutsch · 日本語 · العربية`, via `DisplayNames([tag]).of(tag)` |
| 🇩🇪 🇯🇵 🇸🇦 as language options | text, never flags — a flag is a country |
| `(v * 100) + '%'` | `NumberFormat(l,{style:'percent',maximumFractionDigits:2})` — Stripe ships `1.71304487%` |
| `&ldquo;` / `&rdquo;` (U+201C/U+201D) hardcoded in copy | German wants `„…“`, French `«…»` with NNBSP inside, Japanese `「…」` — no `Intl` API; they live in the catalog |
| `word-break: keep-all` applied to all CJK | Korean only. It near-disables breaking in ja/zh. |
| `line-break: strict` as the Japanese fix | it fixes kinsoku, not word integrity — add `word-break: auto-phrase` |
| A 2.7 MB Noto Sans JP for brand | system stack for CJK; ship the webfont for ar (76 KB) / he (25 KB) |
| A missing translation rendered as `nav.settings.title` | configured `fallbackLng` + MDN's "not translated yet" banner |
| A score, range or phone (`5 - 3`, `555-1234`) rendered bare in RTL | the pair reverses — wrap the whole compound in `dir="ltr"` |
| `numberingSystem:'latn'` applied to every RTL locale | `ar` yes, `fa` no — Persian products ship Persian digits |
| `dateStyle:'short'` on a cross-border date | `9/9/69` in `th-TH`; pin `{calendar:'gregory'}` off-market |

---

## Self-check

Verifiable without a translator.

1. **Grep for physical properties in anything text-adjacent.** `grep -rE '\b(padding|margin)-(left|right)|\b(left|right):|text-align:\s*(left|right)|\bp[lr]-|m[lr]-|(left|right)-[0-9]'` over your styles. Every hit is either a deliberate direction-bearing decision (a caret, a shadow) or a bug.
2. **Set `dir="rtl"` on `<html>`, reload, screenshot at 1440 and 390, and look at the image.** Not the DOM. Check: does the sidebar move? do the chevrons point inward? did the play button flip (it should not)? did a shadow, a badge or a slide-in drawer stay on the wrong side?
3. **Pseudo-localize every string to 1.4× length with brackets** and screenshot again. Any truncation, any overflow, any two-line button that was one line, any `…` — fix the container, not the string. Any string that renders as two separate bracketed fragments in one sentence is a concatenation bug.
4. **Set `lang="ja"` and paste Japanese into your longest heading, your densest table cell, and your primary button.** Check for mid-compound line breaks and for negative letter-spacing collisions.
5. **Search the codebase for date and number formatting.** `grep -rE "toFixed\(|toLocaleDateString\(\)|toLocaleString\(\)|\\$\{.*price|new Date\(\)\.get(Month|Date)|'(Jan|Mon)'"`. Every hit that renders to a user should be an `Intl` call with an explicit locale.
6. **Search for plural and gender logic in code.** `grep -rE "\? *'[a-z]+s'|=== *1 *\?|count > 1"`. Every hit is a message that should be ICU.
7. **Search for string concatenation across translated fragments.** `grep -rE "t\(['\"][^)]+\)\s*\+|\+\s*t\(['\"]"`. Should be zero.
8. **Confirm every interpolated value is isolated.** For each `{placeholder}` in your catalog, trace the render: is it inside a `<bdi>` (or FSI/PDI in an attribute)? Is the isolation around the *whole* value?
9. **Check `<html lang>` changes with the locale.** Font fallback, hyphenation, `line-break`, speech synthesis and `:lang()` all key off it, and it is the single most-forgotten attribute in localized apps.
10. **Confirm the four locale axes are separable.** Can a user pick German with USD? German in Asia/Tokyo? If language and currency are one setting, that is the Booking.com bug.
11. **Check the chrome, not just the content.** Cookie banner, geo-redirect bar, language switcher, toast messages, `aria-label`s, `<title>`, empty states, error boundaries, the 404 page, transactional email. This is where every product I screenshotted still leaks English — Apple, Notion, all of them.
12. **Scroll every horizontal scroller with `dir="rtl"` set.** Carousels, tab overflow, table scrollers, timelines. If an arrow does nothing or stays enabled at the end, you have the `scrollLeft` sign bug (§9). `grep -rn 'scrollLeft' src/` — every hit needs a sign and an `Math.abs()`.
13. **Read your language switcher out loud.** Are the options autonyms (`Deutsch`, `日本語`)? Are there flags? Does choosing a language keep you on the same page? Is it on the 404?
14. **Set `lang="ko"` and paste a Korean sentence into your narrowest text container.** If it breaks mid-word you are missing `word-break: keep-all`, and fixing it will add a line — check the container has room.
15. **`grep -rn "toFixed\|\* 100" src/ | grep -i 'percent\|pct\|%'`** — every hand-built percentage is a locale bug and usually a float bug too.
16. **Put a score, a range and a hyphenated phone number in an RTL container and read the image.** `5 - 3`, `10–20`, `555-1234` all reverse. If any of them is not wrapped `dir="ltr"`, it is wrong and no test will tell you.
17. **Confirm your date picker reads `getWeekInfo()`** and does not hardcode a Monday start or a Sat/Sun weekend, and that it can render a non-Gregorian calendar (`getCalendars()` returns `japanese` for `ja` and `buddhist` for `th`).

---

## Sources

Screenshotted at 1440 and read as images, 2026-09-09, unless noted:

- **apple.com** — `/` (en-US), `/de/`, `/ae-ar/` (rtl), `/jp/`. Same components, four locales. Source of the per-locale type metrics table, the 95%-logical CSS count, and the untranslated geo banner.
- **ikea.com** — `/us/en/`, `/de/de/`, `/sa/ar/` (rtl), `/jp/ja/`, plus a price probe on `/fr/fr/`. Source of the German decimal-separator bug, the truncated Japanese search placeholder (185px vs 297/315/319), the three Japanese price formats, the `"Saudi Riyal"` font stack, and the RTL-specific CSS bundle.
- **aljazeera.net** — Arabic-first editorial, `dir=rtl`, `Al-Jazeera` custom face at 16/24, 993 physical vs 27 logical properties, Western digits throughout.
- **yahoo.co.jp** — the density reference. 14/19.6 (ratio 1.4) with `line-break: anywhere` + `word-break: break-all`; mixed halfwidth/fullwidth digits in adjacent headlines.
- **booking.com/index.ja.html** — USD currency selector on the Japanese site; compound-splitting line breaks (宿泊|施設, アパートメ|ント); an orphaned `す`.
- **notion.com/ja** and **/de** — 96/100 heading at `letter-spacing: -4.6px` on Japanese; 20/28 Japanese lede; `"locl" 0`; English cookie banner and English language-switch bar on the Japanese page.
- **uniqlo.com/jp/ja** — two date formats in one two-line banner; English-caps category nav on a Japanese site.
- **mui.com/material-ui/customization/right-to-left/** — MUI's three-step RTL setup (HTML dir + theme dir + stylis plugin), which is the argument for logical properties.
- **design-system.service.gov.uk/patterns/names/** — single "Full name" input, `autocomplete="name"`, `spellcheck="false"`; guidance text quoted verbatim.
- **note.com, smarthr.design, digital.go.jp, nikkei.com, rakuten.co.jp** — probed for Japanese body metrics (line-height 1.1 → 2.125, measure 16 → 40 characters).

Second round, screenshotted at 1440 and read as images, 2026-09-10:

- **github.com/?locale=ja** — the `チ / ーム` hero break; `h1` 64/69.12 (ratio 1.08) at `letter-spacing: -2.24px`; the three-way `auto` / `strict` / `auto-phrase` comparison run live on the page by mutating the element and re-reading the character rects. Nav, search placeholder, `Sign in`/`Sign up` and the promo banner all still English on `lang="ja"`.
- **stripe.com** `/`, `/de-de`, `/jp`, `/fr`, `/fi` — the per-locale `font-size` table (48/44/44/40), the German hero over the gradient art, the nav-width expansion table, `7 Vertriebsmitarbeiter/in verfügbar`, `1.71304487%`, the English geo banner on both `/de-de` and `/jp`, and the 70.7 KB webfont payload that is identical on every locale including Japanese. `/fi` serves English content tagged `lang="en-FI"` — language and region as separate axes, done correctly.
- **airbnb.co.in/?locale=ar** — full RTL: mirrored search bar with the magnifier *unmirrored*, correctly ordered dialog buttons (primary `قبول الكل` at the start edge), emoji category icons that cannot mirror, and `Log in or sign up` in English in the header.
- **ynet.co.il** — Hebrew RTL news at maximum density; dual `10.9.26` / `כ״ח באלול התשפ״ו` dating; Latin brand mark unmirrored; digits LTR inside RTL headlines; an English LTR `Do Not Sell or Share My Personal Information` bar pinned to every page.
- **naver.com** — Korean at portal density; the `빠 / 른` mid-eojeol break in the browser-upgrade toast; Latin publisher logos untouched inside a Korean grid.
- **ar.wikipedia.org** — the bidi positive control. `1٬331٬924` with U+066C verified correct by character-rect sorting after I misread it as scrambled; dual Gregorian/Hijri masthead date with dual Levantine/Egyptian month naming (`سبتمبر/أيلول`); body at **16/26 (1.625)**.
- **developer.mozilla.org/ja** — the partial-translation pattern: per-page provenance banner with `View in English` + `Always switch to English`, and `(英語)` superscripts on sidebar links that lead to untranslated pages. Also MDN's own guidance to prefer the HTML `dir` attribute over the CSS `direction` property.
- **zalando.de** — German typographic quotes `„…"` shipped correctly, `Nutzer*innen` gender-star, informal `du` throughout (against Stripe's formal `Sie`).

Measured in a lab page, not on a product:

- **Korean line breaking** — one string at a 200px column under `word-break: normal` vs `keep-all`, lines recovered by character rect.
- **RTL scrolling** — a 900px child in a 200px `direction: rtl` scroller: range `-700 … 0` against `scrollWidth - clientWidth = 700`; `scrollLeft = 100` clamps to 0.
- **`dir="auto"`** on inputs resolves `ltr` for `type=number` and for `"hello"`, `rtl` for `"مرحبا"`.
- **Webfont payload** — every `unicode-range` subset `fonts.googleapis.com/css2?family=…&wght@400` emits, summed by `content-length` HEAD: JP 124 subsets / 2,726 KB, SC 101 / 2,353 KB, KR 124 / 1,820 KB, Arabic 5 / 76 KB, Hebrew 5 / 25 KB, Inter 7 / 92 KB.
- **`Intl` round 2** — `Locale.getTextInfo()`, `Locale.getCalendars()`, `DisplayNames` autonyms vs translated names, `Segmenter` graphemes (`"👨‍👩‍👧‍👦 café 🇩🇪"` → `.length` 21, 8 graphemes), and the confirmation that no `Intl` API exposes CLDR quotation delimiters. Node 24.15 / ICU 78.2.
- **Tooling, re-verified 2026-09-10** — `libphonenumber-js` 24,117,214/week (above i18next), `@internationalized/date` 10,286,530/week, `next-intl` 4.14.3 published the same day, `formatjs/formatjs` 14,747★ / 3 open issues, `i18next/i18next` 8,630★ / 2 open issues.

Measured, not screenshotted:

- **Text expansion** — `signalapp/Signal-Desktop@main/_locales/{en,de,fi,ru,ar,ja,zh-CN,ko}/messages.json` (~2,400 pairs/language) and `excalidraw/excalidraw@master/packages/excalidraw/locales/*.json` (~520–580 pairs/language), rendered through canvas `measureText` at `400 14px system-ui`.
- **Bidi** — nine strings rendered in `dir`-set containers, visual order recovered by sorting every character by `getBoundingClientRect().left`.
- **CJK line breaking** — the same Japanese sentence at a 260px column under default, `word-break: auto-phrase`, and `line-break: strict`.
- **`Intl`** — Node 24 / ICU 78.2 and Chrome 148, 20 locales, `NumberFormat` / `DateTimeFormat` / `PluralRules` / `ListFormat` / `RelativeTimeFormat` / `Collator` / `Segmenter` / `DurationFormat` / `Locale.getWeekInfo`. `Intl.MessageFormat` is `undefined` in both.
- **Tooling** — `registry.npmjs.org` and `api.npmjs.org/downloads/point/last-week` for versions, publish dates and unpacked sizes; `gh api repos/…` for stars, open issues and 90-day commit counts.

Related corpus files: `craft/typography.md` §"Non-Latin and i18n" (unicode-range font scoping, the CJK letter-spacing reset — cited above rather than re-derived), `libraries/_research/outside-the-bubble.md` (BudouX, Semi Design's CJK density), `libraries/_research/headless-primitives.md` (React Aria's 40+ calendar systems), `system/5-build.md` (logical properties in the build checklist), `patterns/ai-flows.md` (`Intl.Segmenter` for CJK streaming chunks).

---

## Review pass (2026-09)

Adversarial re-read. Everything below was re-probed live, not taken from the previous rounds.

### What I re-verified and what held

- **Text expansion re-measured from scratch** on the Signal corpus (2,541 pairs/language, 804 short strings, canvas `measureText` at `400 14px system-ui`). Reproduced to ±0.05 across the board: de 1.27/1.76/**2.08**, ru 1.40/2.00/**2.36**, ja 1.11/1.68/**1.92**, fi 1.07/1.65/**2.00**, ar 0.92/1.42/1.69, ko 0.81/1.15/1.24, zh 0.70/1.00/1.11 (median / p90 / p90-on-short). The headline — **Japanese is ~11% wider than English at the median** — is real and reproduces by an independent run of the whole pipeline.
- **Webfont payloads re-summed** from `fonts.googleapis.com` `content-length` HEADs: Inter 7 subsets / 93 KB, Noto Sans Hebrew 5 / 26 KB, Arabic 5 / 77 KB, KR 124 / 1,820 KB, SC 101 / 2,354 KB, **JP 124 / 2,727 KB**. §7 stands.
- **Every `Intl` claim in §2 and §10** re-run on Node 24.15 / ICU 78.2: lakh grouping, `9/9/69` for `th-TH`, `۱۴۰۵/۶/۱۸` for `fa-IR`, `ساعتان` from `DurationFormat('ar')`, `%43` in Turkish, `minimumGroupingDigits` for pl/es/it/bg, 418 timezones, 162 currencies, `getWeekInfo()` returning `firstDay:6 weekend:[5]` for `fa-IR` and `weekend:[7]` for `hi-IN`, `"👨‍👩‍👧‍👦 café 🇩🇪"` at 21 code units / 8 graphemes, `Intl.MessageFormat` still `undefined`. All correct.
- **Tooling re-queried** against npm and `gh api`: every download figure, version and star count in the table is current. Drift corrected: next-intl **4.14.3 (2026-09-10)** and 51 open issues; formatjs 14,747★.

### What was wrong

1. **The Arabic Wikipedia mechanism was backwards.** The file said an ASCII comma is a bidi neutral that lets number groups reorder, and U+066C is what saves Wikipedia. Measured: `عدد 1,331,924 مقالة` in an RTL container renders **intact** — a comma between digits is class CS and binds. What actually scrambles is a *space* inside the number (`1, 331, 924` → `924 ,331 ,1`). Corrected in place; U+066C is still right, for CLDR reasons, not bidi ones.
2. **`Intl.ListFormat('ar')` emits `A وB وC`, not `A، وB وC`.** No Arabic comma in ICU 78. Fixed.
3. **The §2 currency column silently mixed each locale's own currency with USD**, which made the rows non-comparable. Labelled.
4. **The Apple 95%-logical figure is regex-dependent.** Re-probing gives logical 408 (en) / 418 (ar) — stable to ±1 — but physical 56 / 62 under a stricter match against the file's 23, so the ratio is 87–95%, not a point estimate. The conclusion (one bundle, overwhelmingly logical) is unchanged; the precision was overstated.
5. **`fr → 3` plural forms was right but incomplete** — `es` and `it` also carry three, which is the surprising half.

### What the file missed

6. **Two numbers in one RTL string swap places.** The file's "do not mirror numbers" rule treats a number as atomic. Measured in an RTL container: `5 - 3` renders **`3 - 5`** (a reversed score), `10 to 20` renders `to 20 10`, and `555-1234` renders **`1234-555`**. Each number stays internally correct; the *pair* inverts. Scores, ranges, dimensions, page counts and hyphenated phone numbers are a distinct bug class needing `dir="ltr"` on the whole compound. Added to §5 as measured rows and to the self-check.
7. **Persian is not Arabic, and the file's digits advice would break it.** Digikala (Iran's largest e-commerce, `lang="fa"`, `dir="rtl"`, 1440) renders **514 Persian digits `۱۲۳` against 136 Western** above the fold. The file generalized from three Arabic sites to "the RTL web uses Western digits, override `Intl`" — apply that to `fa` and you ship the wrong numerals. The override is per-market, never per-script.
8. **Persian body type runs looser than Arabic.** Digikala ships **12/26.04 (ratio 2.17)** and **14/25.2 (1.8)** in `IRANYekan`, against the Arabic 1.625–1.667 the file measured on Apple and Wikipedia. If you are setting one `:lang()` rule for "RTL", you are under-leading Persian.
9. **Digikala is a second, stronger mono-directional data point:** **120 logical declarations against 1,369 physical** — 8% logical — on a top-100-globally-trafficked *product*, not an editorial site. The "logical properties always" rule is a bidirectionality rule, and single-direction products at real scale ignore it without consequence.
10. **Almosafer scopes the "chrome always leaks English" rule.** Saudi travel, full RTL: the geo/currency banner is fully Arabic, and language / currency / country are three separate header controls — the four-axes model shipped correctly, by a product far smaller than Booking.com. Six-in-six is a rule about products expanding *outward* from English, not about localized products.
11. **`dateStyle:'short'` in `th-TH` is a trap the file's rule 5 walks into.** `9/9/69` is Buddhist 2569 in two digits and reads as 1969 to everyone else. "Always use `Intl`" needs "and pin `{calendar:'gregory'}` on anything crossing a border."

### Rules that make an interface worse, now scoped in the file

- **1.8× expansion sizing on a CJK-source product.** Every ratio in §1 is relative to English. A zh-CN-first product reading the same table backwards learns that English is 1.45× *its* source — sizing for 1.8× discards 40% of the horizontal budget in the market with the highest density expectation on the web.
- **One "Full name" field in a Japan-domestic checkout.** GOV.UK's evidence is sound and the rule is right in its market. Japanese delivery slips, bank-transfer matching and kana sorting all consume the name parts, and the form needs 姓/名 *plus* the phonetic 姓（カナ）/名（カナ）pair. Following the rule there produces a form that fails the payment rails.
- **`numberingSystem: 'latn'` applied to every RTL locale.** Correct for `ar` on the evidence in this file, wrong for `fa` on the evidence added by it.

### Corpus consistency

- **`craft/typography.md` contradicted this file and was wrong.** It read "CJK needs *less* line-height ratio than Latin at the same nominal size" — the opposite of the measured Japanese-native products (1.65–2.125 for prose against Latin's 1.5–1.7). Corrected there and pointed at §3, so there is one number for this in the corpus.
- `craft/copy-and-voice.md` on lakh grouping, `￥1,235`, `en-GB`'s `Sept`, and 2 → `few` in Russian and Polish: re-verified, all agree with this file.
- `libraries/_research/outside-the-bubble.md` (BudouX `essential`, 15 KB) and `headless-primitives.md` (React Aria's 40+ calendar systems, `@internationalized/date` at 10.3M/wk) agree with §6 and the tooling table.

### Still unverified

- The **Excalidraw** corpus figures (fr 1.30/1.83, es 1.24/1.66, pl 1.23/1.83, tr 1.09/1.53) were not re-run this pass; Signal was. They agreed within 0.05 on the overlapping languages in the previous round, which is the reason to trust them.
- **RTL chart mirroring** remains unmeasured and the file still says so. Unchanged.
- **Persian line-height** is one product, not a corpus. 2.17 and 1.8 on Digikala is a signal, not a norm — treat 1.8 as the floor for `fa` and check a second Iranian product before writing it into a design system.

**Looked at this pass:** digikala.com (fa, RTL, 1440+390), apple.com `/` and `/ae-ar/` (re-probed for logical/physical and body metrics), almosafer.com/ar (1440), flipkart.com (1440+390, `+91` E.164 country selector shipped correctly, English-only chrome in a multilingual market), thairath.co.th (1440, interstitial only — the Thai claim rests on `Intl`, not on it). Plus lab probes: nine RTL bidi strings recovered by character-rect sorting, and the Signal expansion pipeline rebuilt end to end.
