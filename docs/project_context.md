# Project Context — Sparsh Agrawal Personal Website

This document exists so any future agent/session (or human) can pick up this project without re-deriving context from scratch. It reflects the state of the repo as of 2026-09-13.

## 1. What this project is

A static, single-page personal portfolio site for Sparsh Agrawal — a "digital résumé" covering professional experience, education, and (eventually) hobbies. It is meant to be hosted for free on **GitHub Pages**, with no build tooling, framework, or package manager. Plain HTML/CSS/JS only.

The person actually running Claude Code (let's call them "the operator") is a friend of Sparsh's, building this on his behalf from instructions he supplied. A *different* friend has already used ChatGPT to scaffold a first pass at the site (current `index.html`/`script.js`/`README.md`). The operator's job now is to review, refactor, and finish that scaffold — not start over.

## 2. Source-of-truth documents, and how they relate

There are several instruction documents in the repo. They mostly agree, but not entirely — read this section before treating any one of them as gospel.

| File | Status | Notes |
|---|---|---|
| [`prompts/legacy/sparsh_instructions.md`](../prompts/legacy/sparsh_instructions.md) | **Primary spec**, in the operator's own words | The clearest single statement of what Sparsh wants. Use this as the main reference for content/layout requirements. |
| `source-material/Personal Website/Read me for Personal Website.docx` | **Primary spec, original form** | This is Sparsh's own prompts to an earlier ChatGPT session, in his own words, extracted as plain text. Matches `sparsh_instructions.md` almost exactly, but adds one requirement not written down elsewhere: **the site should flow horizontally rather than vertically, and a viewer should be able to see everything within roughly 2-3 small scrolls.** Treat this as a real, active requirement — it is not yet reflected in the current CSS-less scaffold (there is no CSS at all right now, see §4). |
| `prompts/legacy/AGENTS.md` (gitignored, still present on disk) | Metadata only | Describes `source-material/` as a synced, read-only mirror of a ChatGPT project. Do not edit/move/delete anything under `source-material/`. |
| `prompts/workspace_refactor.md` | **Superseded / partially adopted** | Proposed a multi-page structure (`about.html`, `projects.html`, `publications.html`, `cv.html`, `css/`, `js/`, `assets/`). The operator confirmed the site is a **single page** (one `index.html`), so the multi-page part of this proposal does not apply. However, the *folder organization* idea (separating `css/`, `js/`, `assets/images/`, `assets/documents/` from the project root) is worth keeping — see §6 for the reconciled target structure. |
| `README.md` (root) | Descriptive, written by the ChatGPT-assisted pass | Documents the *intended* design direction (palette, typography, page structure) for the current scaffold. Useful as a starting point, but the operator will likely be given real screenshots/reference images from Sparsh directly in a follow-up, which should take precedence over this file's palette description if they conflict. |

**Precedence when documents disagree:** `sparsh_instructions.md` / the docx (Sparsh's own words) > screenshots/visual references the operator provides going forward > `README.md`'s current design write-up > `workspace_refactor.md` (superseded for page structure, partially kept for folder layout).

## 3. Content requirements (from Sparsh's instructions)

- **Tagline** (exact wording to preserve):
  > Hello There, I'm Sparsh Agrawal
  > I'm a Consultant at EY, advising global organisations on some of the most critical issues they face on a perpetual basis. I graduated from NTU Singapore with a degree in Electrical Engineering (Honours, with Distinction).
  > I'm extremely passionate about Strategy, Advisory, Public Policy, and AI (most interestingly on how AI can improve governance and citizen experience).
  > Excellent communicator, great chef, and a people's-person.
- Tagline photo on the **left**, tagline text on the **right**.
- Below the tagline photo: a header "In the past, I have been associated with", followed by a **horizontal row of circular organisation logos only** (no names/text alongside the logos in that rail).
- **Per-experience layout**, top to bottom:
  1. Org logo (cropped to a circle, top-left) with name & designation adjacent
  2. Experience description as bullet points
  3. Images associated with that specific experience, relevant to the bullet points
- **Hobbies section**: intentionally left empty/placeholder — Sparsh will supply content later.
- **Overall page flow**: horizontal-feeling, single page, minimal scrolling (~2-3 scrolls) — from the docx, not yet implemented.
- Contact info and LinkedIn come from Sparsh's résumé (`source-material/Personal Website/(1) Sparsh_Agrawal_Resume.pdf`).
- Dark-but-not-black aesthetic; body copy in greyish/pale-white tones (exact palette TBD pending screenshots from the operator).

## 4. Current implementation state (as of this writing)

- `index.html` — single-page site. Header/nav, hero (portrait + single-line tagline heading with the name highlighted + org logo rail), 5 experience `<article class="role">` blocks (EY current, Eastspring, EY internship, Circles.Life, NTU PEAK/Sime Darby), an education `<article class="education-row">` (NTU), an empty hobbies placeholder (`<h2>` kept, no content yet), a contact section, and a `#lightbox` overlay (markup only — behavior lives in `js/main.js`) just before the closing `</body>`. Content (bullet points, dates, titles) is drawn from the résumé. See §9 for the markup pattern each experience/education entry follows (`.role-header` + `.role-grid`) — it changed from the original ChatGPT-scaffolded markup, so don't assume the two are structurally identical anymore.
- `js/main.js` (moved from root `script.js` during the folder refactor, see §6) — mobile nav toggle, footer year, an `IntersectionObserver`-based `.reveal` scroll-animation hook, and the lightbox/zoom interaction (open/close, keyboard support, pausing background video). See §9.
- **`css/style.css` has been built and substantially extended.** It implements the `README.md` palette (Ink `#172127`, Deep ink `#11191E`, Surface `#202B31`, Pale stone `#ECE9E1`, Mist `#9AB5BB`, Warm highlight `#DA9D66`) and typography (Playfair Display for headlines, DM Sans for body, DM Mono for labels/eyebrows — already linked via Google Fonts in `index.html`'s `<head>`). What started as a CSS-only pass (see §8) was followed by a second pass that changed `index.html` too (§9) — the "no HTML changes" note in §8 is historical, not current.
- `README.md`'s palette/typography description is now the **implemented** design, not a draft — it was cross-checked against reference screenshots (see §8) before being built.
- **A `[hidden]` gotcha is now guarded against explicitly** — see §9's last item before writing any new `img`/`video`-wide CSS rule.
- `assets/images/logos/` exists but is **empty**. Organisation logos are currently pulled from external URLs (Wikipedia, company CDNs) directly in `index.html`, rather than being local assets. This is fragile (hotlinking, no cropping control, external dependency) and likely worth fixing — download and crop logos locally instead.
- Per-experience photo folders already exist and are wired into `index.html`: `assets/images/ey-current/`, `assets/images/eastspring/`, `assets/images/ey-intern/`, `assets/images/circles/`, `assets/images/peak/`, `assets/images/ntu/`. Some images exist only as `.HEIC`/`.heic` in `source-material/` with corresponding `.jpg` conversions already placed under `assets/images/`; conversion has already happened for images actually used in `index.html`. There's also an `assets/images/experience/` folder with generically-named files (`ey-consulting-01.jpg`, `peak-01.jpg`, etc.) left over from the original scaffold that `index.html` does not actually reference — likely safe to remove once confirmed unused, but left untouched by this refactor.
- `assets/images/hero-portrait.jpg` exists and is referenced as the tagline photo.
- `source-material/Personal Website/Keep this as the cover photo (besides Tagline).HEIC` — flagged by Sparsh as the specific cover/hero photo to use; confirm this has been correctly converted/used as `assets/images/hero-portrait.jpg`.

## 5. Repo hygiene / git notes

- `.gitignore` excludes `source-material/` (raw, unprocessed assets from Sparsh — résumé PDF, HEIC originals, a docx readme) and `prompts/legacy/` (older instruction snapshots, including a stale root-level `AGENTS.md` that was deleted from git tracking but still exists on disk at `prompts/legacy/AGENTS.md`).
- Do not edit/move/delete anything under `source-material/` — it's a synced, read-only mirror per its own `AGENTS.md` note.
- `prompts/workspace_refactor.md` is tracked (not gitignored) since it's under `prompts/` but not `prompts/legacy/`.

## 6. Folder structure (executed)

The operator confirmed: **keep the single-page site**, but adopt a cleaner separation of concerns for maintainability (borrowing the organizational spirit, not the page count, of `workspace_refactor.md`). This reorganization has been carried out:

```
sparsh-website/
├── index.html
├── css/
│   └── style.css          (does not exist yet — see §4, next up)
├── js/
│   └── main.js            (moved from root script.js)
├── assets/
│   └── images/            (moved from root images/)
├── docs/
│   └── project_context.md (this file)
├── prompts/
│   └── ...
├── source-material/        (gitignored, untouched)
└── README.md
```

`index.html` was updated in the same pass to point at `css/style.css`, `js/main.js`, and every `assets/images/...` path (all image `src`/`video src` attributes). `README.md`'s example snippet was updated to match. `assets/documents/` was not created — nothing currently needs to link the résumé PDF from the live site; add it if that changes.

## 7. Open items / next steps

1. **Implement horizontal/low-scroll flow** per the docx requirement — deliberately deferred (see §8) and still not reflected in the current HTML/CSS. The page styles the existing long vertical structure as-is.
2. **Localize organisation logos** into `assets/images/logos/` instead of hotlinking external URLs; crop to circles as static assets or via CSS. (`css/style.css` currently styles the hotlinked `<img>`s as circular badges, but the hotlinking itself is unresolved.) Note: these same logos are now also jump-links to specific headings (§9) and are excluded from the zoom/lightbox feature on purpose — preserve both behaviors if the logos are ever swapped to local files.
3. Confirm hero portrait matches the specific photo Sparsh flagged in `source-material/`.
4. Populate hobbies section once Sparsh provides that content. When it's added, reuse the `.role-header`/`.role-grid` pattern (§9) if the content is experience-like (a logo/date + bullets + photos), for visual consistency with Experience/Education.
5. Double check all résumé-derived content (dates, bullet points, cert list) against `source-material/Personal Website/(1) Sparsh_Agrawal_Resume.pdf` for accuracy as a final QA pass.
6. Confirm whether `assets/images/experience/` (unreferenced leftover files) can be deleted.
7. **IEEE logo has no linked destination.** The operator confirmed (§9) it should stay unlinked until there's an actual IEEE-related entry on the page (it currently references a student-branch membership that isn't written up anywhere). Revisit if Sparsh ever wants that content added.

## 8. `css/style.css` build decisions (this pass)

Legacy reference screenshots (`prompts/legacy/screenshots/image_1.png`–`image_4.png`) surfaced during this pass. **Important: these are renders of an older, experimental ChatGPT-built version of the site — not a live spec, and not to be treated as a source of truth for future work.** They were used once, with the operator's explicit sign-off, purely to sanity-check the `README.md` design direction and resolve a few open questions before writing CSS. Do not re-open or re-derive decisions from them unless the operator expressly asks again.

Decisions made, for the record:

- **Palette/typography**: the screenshots confirmed `README.md`'s described palette and type pairing (Playfair Display / DM Sans / DM Mono) essentially as-is — implemented directly, no changes.
- **Section headlines**: the screenshots show large serif headlines above Experience ("Work that stays close to the people it serves.") and Education ("Learning that became a foundation.") that don't exist in `index.html`. **Sparsh's explicit instruction (relayed by the operator) was to leave these out and keep `index.html` as-is** — `css/style.css` does not assume or require this copy. The Hobbies section's existing `<h2>` ("More to come, off the clock.") was kept and styled, since that heading already exists in `index.html`.
- **Contact/footer**: the screenshots show the Contact section and footer breaking from the dark theme into a light pale-stone block. The operator confirmed this should be replicated — `.contact` and `footer` are styled with a light background (`var(--stone)`) and dark text as a deliberate closing contrast to the rest of the page.
- **Horizontal/low-scroll layout**: the docx's requirement for a horizontal-feeling, ~2-3-scroll layout is **not** satisfied by either the screenshots or the current `css/style.css` — the operator confirmed this pass should style the existing long vertical structure as-is, and treat the low-scroll requirement as a separate, later layout/markup task (see §7, item 1).
- **No HTML changes** (at the time): this was a CSS-only pass, so the hero heading couldn't get the screenshots' two-tone (italic, warm-highlight name) treatment without a markup change. **This was resolved in the next pass — see §9.**

## 9. Feature-work pass: layout restructure, lightbox, logo links (this pass)

Following the CSS build in §8, the operator requested a round of concrete visual/interaction changes. Unlike §8, this pass **does** touch `index.html`, not just CSS.

**Hero heading** — `<h1>` now wraps the name in `<span class="accent-name">`, giving it the italic/warm-highlight treatment from the screenshots (resolving the §8 limitation). The whole heading ("Hello There, I'm Sparsh Agrawal.") is also forced onto a single line at every viewport width — not with a fixed font-size, but by sizing it with **CSS container query units** (`cqw`) relative to `.hero-copy`'s own width via `container-type: inline-size`. This was necessary: a fixed clamp() sized off the viewport broke specifically in the ~860–1000px window (where the hero briefly resumes its two-column layout but the text column is still narrow) — container units solve this because the font tracks the actual column width, not the viewport, at every breakpoint. The same technique is used for `.association p` ("In the past, I've been associated with") to keep it on one line too — see below.

**Experience/Education restructure** — every entry (`<article class="role">` and the one `<article class="education-row">`) now follows a shared two-part pattern instead of the original single-row layout:

- `.role-header` — date, then role name (`.role-name`), then org/location on its own line (`.role-org`, italic/highlighted) — spans full width, sits above the grid.
- `.role-grid` — a 3-column grid: logo (`.role-logo`, 104px, left) | bullets (`.role-bullets`, middle) | photos (`.media-circles`, 130px each, wrapping 2-per-row, right). Collapses to a single stacked column below 860px.

This is a deliberate departure from the original ChatGPT-scaffolded markup (logo+title in one row, bullets+photos stacked below) — don't assume the old `.role-title`/`.role-body` classes still exist; they were fully replaced (`grep` returns nothing for them).

**Logo rail ("In the past...")** — sized up (44px → 64px) but forced to stay on one line via flexbox shrink (`flex: 0 1 64px` + `aspect-ratio: 1/1`, no `min-width` floor) rather than wrapping — all 5 logos shrink together on narrow screens instead of dropping to a second row. Three of the five are now links to a specific heading elsewhere on the page (`scroll-margin-top` added to `.role-name` so the sticky header doesn't cover the target after the jump):

- EY → `#exp-ey-current` (the current Associate Consultant role — operator's choice; EY also has an internship entry, deliberately not linked)
- Eastspring → `#exp-eastspring`
- Circles.Life → `#exp-circles-life`
- NTU → `#edu-ntu` (the Education entry — operator's choice over the NTU-PEAK experience, which uses "NTU" only as a placeholder logo since no Sime Darby logo exists)
- IEEE → **deliberately left unlinked** — no IEEE-related entry exists anywhere on the page to point it to (see §7, item 7)

The links are implemented as `<a href="#...">` wrapping the existing `<img>`/`<span>`, styled with `.logo-rail a { display: contents; }` so the anchor doesn't disturb the flex-shrink sizing described above — the `<img>`/`<span>` remains the actual flex item.

**Lightbox / zoom-on-click** — new `#lightbox` overlay (markup at the end of `<body>`, behavior in `js/main.js`). Clicking any experience/education photo, the hero portrait, or an in-role org logo (`img.role-logo` — the text-only "NTU"/"IEEE" placeholder badges have no image to zoom, so they're excluded) opens it centered in a fixed-size box (`min(90vw,960px)` × `min(85vh,680px)`, same box for every image, `object-fit: contain` so nothing is cropped/distorted), with the rest of the page dimmed and blurred. Closes on Escape, the close button, or clicking outside the image. **The `.logo-rail` images are deliberately excluded from this feature** — per the operator, those should only navigate (above), never zoom; don't re-add them to the `zoomableImages` selector in `js/main.js` without checking with the operator first.

**A real cross-browser CSS bug, fixed**: the lightbox's own (inactive) `<img>`/`<video>` elements were rendering as a visible empty box despite `hidden` being set. Root cause: the HTML `hidden` attribute is implemented by browsers as a **presentational hint with the lowest possible cascade priority** — weaker than *any* author CSS rule touching `display`, even a low-specificity type selector. This page's own reset (`img, video { display: block; }`) was silently winning over `hidden`. Fixed with an explicit, deliberately blunt rule:

```css
[hidden] { display: none !important; }
```

**This is a real, reproducible bug (confirmed in an actual browser, not just a headless-testing artifact) and the fix is load-bearing** — if this rule is ever removed or weakened, re-verify that hiding any element via the `hidden` attribute still works, especially inside `#lightbox`.

**Autoplay video pause**: any `<video>` under `.media-circles` (currently just the looping Eastspring clip) is paused whenever the lightbox opens and resumed on close (`js/main.js`) — good practice regardless of browser quirks, since an autoplaying video sitting behind a modal is generally undesirable.

All of the above was verified with real layout measurements (not just visual screenshots) across desktop, ~900px, 390px, and 320px viewport widths, via a headless Chrome instance driven directly over the DevTools Protocol (an isolated throwaway profile, not the user's real browser) — confirmed zero horizontal overflow at any width and correct single-line text behavior throughout.
