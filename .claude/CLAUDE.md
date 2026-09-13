# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repository.

## What this is

A static, single-page personal portfolio/résumé site for Sparsh Agrawal, hosted via GitHub Pages. Plain HTML/CSS/JS — no build tooling, no package manager, no framework. `index.html` is opened directly in a browser or served as-is by GitHub Pages.

**Before doing any non-trivial work here, read [`docs/project_context.md`](../docs/project_context.md).** It has the full picture: which instruction documents are authoritative, what's already built, what's missing, and what's already been decided vs. still open. Do not re-derive that context from scratch — it's already been done.

## Critical facts to internalize immediately

- **`css/style.css` has been built and substantially extended**, and `index.html` has since been restructured too (not just styled) — read both before assuming what's there. Every experience/education entry now follows a `.role-header` (date/name/org, full width) + `.role-grid` (3-column: logo | bullets | photos) pattern; the original `.role-title`/`.role-body` classes from the ChatGPT scaffold no longer exist anywhere.
- **A click-to-zoom lightbox exists** (`#lightbox` markup at the end of `<body>`, logic in `js/main.js`). It's wired to experience/education photos, the hero portrait, and in-role image logos (`img.role-logo`) — **deliberately not** to the "In the past..." rail logos (those should only navigate, per the operator) or to the text-only "NTU"/"IEEE" placeholder badges (nothing to zoom). Don't change the `zoomableImages` selector in `js/main.js` without checking first.
- **Three of the five rail logos are jump-links** to a specific heading: EY → `#exp-ey-current`, Eastspring → `#exp-eastspring`, Circles.Life → `#exp-circles-life`, NTU → `#edu-ntu`. IEEE is deliberately unlinked (no matching content exists). These specific mappings were confirmed with the operator — don't silently change which entry a logo points to.
- **A load-bearing `[hidden] { display: none !important; }` rule exists near the top of `css/style.css`.** Without it, the page's own `img, video { display: block; }` reset silently wins over the `hidden` attribute (a real browser behavior — `hidden` is the lowest-priority presentational hint in the cascade, weaker than any author rule touching `display`). This isn't theoretical: it caused a real, user-visible bug (an empty video box appearing next to zoomed photos) before the fix. Don't remove or narrow this rule without re-verifying every `hidden` element on the page still actually hides.
- **Container-query-based fluid type is used in two places** — the hero `<h1>` and `.association p` ("In the past...") — specifically so they each stay on one line at *any* viewport width, not just typical ones. Both work by sizing the font in `cqw` off the width of their own containing element (`container-type: inline-size` on `.hero-copy`/`.hero-left`), not the viewport. A fixed-size/vw-based approach was tried first and broke at in-between browser widths (~860–1000px) — don't revert to that without re-testing across that specific range.
- **`prompts/legacy/screenshots/` (image_1.png–image_4.png) are renders of an older, experimental ChatGPT-built version of this site — not a live spec.** They were used once, with the operator's explicit sign-off, as visual reference for building `css/style.css` (confirming the `README.md` palette/type direction, and establishing that Contact/footer should be a light pale-stone block breaking from the dark theme). They also show content that was deliberately **not** carried over — large serif section headlines above Experience/Education that don't exist in `index.html` — because Sparsh himself asked for those to be left out in favor of the current `index.html` structure. **Do not treat these screenshots as a source of truth for future changes, and do not re-derive design or content decisions from them, unless the operator expressly asks you to look at them again.** For the current state of design decisions, see `docs/project_context.md`.
- This is a **single page**. `prompts/workspace_refactor.md` proposed a multi-page structure (`about.html`, `projects.html`, etc.) — that part is superseded and was not implemented. Only its folder-organization idea (`css/`, `js/`, `assets/`) was adopted; the reorg (moving `script.js` → `js/main.js`, `images/` → `assets/images/`) is already done — see `docs/project_context.md` §6.
- `source-material/` is a read-only, gitignored mirror of Sparsh's original ChatGPT project (résumé PDF, raw photos, a docx readme). **Never edit, move, rename, or delete anything under `source-material/`.**
- `prompts/legacy/` is also gitignored and holds superseded/raw instruction snapshots — useful for context, not for editing.
- Organisation logos in `index.html` are currently hotlinked from external URLs (Wikipedia, company sites) rather than local assets — `assets/images/logos/` exists but is empty. This is a known gap, not intentional design.
- The site must satisfy a requirement not obviously visible from the current HTML: content should flow **horizontally and be viewable within ~2-3 scrolls**, per Sparsh's own instructions (in the docx under `source-material/`, summarized in `docs/project_context.md` §3).

## Working conventions

- Keep it a static site: no bundlers, no npm dependencies, no build step. Anything added must run by just opening `index.html` or via GitHub Pages' default static serving.
- Preserve the exact tagline wording given in `docs/project_context.md` §3 — it's a direct quote from Sparsh, not paraphrasable copy.
- Per-experience/education entries follow the `.role-header` (date + name + org) then `.role-grid` (logo | bullets | photos) pattern described above. Keep new entries consistent with it.
- Hobbies section is intentionally a placeholder — don't invent content for it.
- Résumé bullet points and dates already in `index.html` were sourced from `source-material/Personal Website/(1) Sparsh_Agrawal_Resume.pdf` — if in doubt about accuracy, check against that PDF rather than guessing.
- If you touch the folder structure further, update every reference in `index.html` in the same change, and update `docs/project_context.md` to match.

## When in doubt

This project is being run step-by-step with the operator (not Sparsh directly) reviewing work incrementally. Prefer surfacing conflicts or ambiguities (e.g., between instruction documents, or missing assets) rather than silently picking one interpretation — see `docs/project_context.md` §2 for how existing conflicts were already resolved, and follow that same precedence logic for new ones.
