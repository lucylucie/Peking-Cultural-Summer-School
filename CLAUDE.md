# CLAUDE.md — LA (Làng Archives) Prototype

You are building a **navigable prototype**, not production infrastructure. The full screen spec lives in `LA-Lang-Archives-Screen-Brief.md`. This file is your operational context — read it before starting any task and keep it in mind across the session.

---

## Project in one paragraph

LA is a cultural tourism commons where villagers, a heritage community (contributors), and visitors co-author a village's living archive. The pilot village is Duong Lam, Vietnam. The anchor artifact is the Duong Lam Food Archive. Three user roles share one codebase and see role-specific navigation. This prototype is for a summer school application review — it must read as considered and functional, not as a template travel app.

---

## Build order (do not skip)

Build in phases. Do not attempt all 24 screens in one session.

**Phase 1 — Foundation (do first, always)**
1. Project scaffold (Vite + React + Tailwind + React Router)
2. Design tokens as Tailwind theme extension (see color/type below)
3. Mock data files (see schema section below) — populate before building any screen
4. Shared components: `AuthorAttribution`, `EntryCard`, `PrimaryButton`, `SecondaryButton`, `NavShell` (role-aware), `RoleSwitcher` (dev-only header)
5. Routing skeleton with placeholder screens

**Phase 2 — Priority track (high fidelity, fully interactive)**
- Screens 4, 5 (Archive Explorer + Entry Detail) — the public-facing anchor
- Screens 6, 7, 8, 9, 10 (Village Author full loop through Publish Approval)
- These must work end-to-end: record → transcribe (mocked) → invite → approve → publish → appear in Archive.

**Phase 3 — Supporting tracks (mid fidelity, navigable, less state logic)**
- Contributor track (Screens 11–15)
- Visitor track (Screens 16–20)
- These render correctly with mock data but don't need full state persistence.

**Phase 4 — Operations (build only if time)**
- Screens 21–24

**Stop after each phase and report progress.** Do not silently continue into the next phase.

---

## File structure convention

```
src/
  components/
    shared/          # AuthorAttribution, EntryCard, buttons, nav
    village/         # Village Author track components
    contributor/     # Contributor track components
    visitor/         # Visitor track components
  screens/
    shared/          # Screens 1-5
    village/         # Screens 6-10
    contributor/     # Screens 11-15
    visitor/         # Screens 16-20
    ops/             # Screens 21-24
  data/
    entries.js       # Archive entries mock data
    users.js         # Village authors, contributors, visitors
    scaffolds.js     # Scaffold posts + comment threads
    revenue.js       # Revenue dashboard mock data
  lib/
    tokens.js        # Color/type/spacing tokens if needed in JS
  App.jsx
  main.jsx
```

Do not deviate from this without stating why.

---

## Design tokens (Tailwind config)

Extend `tailwind.config.js` with:

```js
colors: {
  terracotta: '#b85042',   // primary CTAs, brand
  cream: '#e7e8d1',        // primary background
  ink: '#2B2420',          // body text
  moss: '#4A5D45',         // secondary accent, contributor tags
  ochre: '#C9A24B',        // credit badges only — sparing
}
fontFamily: {
  serif: ['"Source Serif Pro"', 'Cormorant', 'serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
borderRadius: {
  DEFAULT: '10px',
}
```

**Discipline rules:**
- Never introduce a color outside this palette. If you need a muted variant, use opacity/rgba mixes of an existing token, not a new hex value.
- No gradients. No drop shadows heavier than `shadow-sm`.
- No icon libraries unless explicitly required (avoid decorative Feather/Lucide icons scattered through the UI). If icons are needed for navigation only, use a minimal single-weight set.
- No stock cultural motifs: no red-and-gold combos, no lantern/pagoda/dragon iconography, no "Asian-inspired" border patterns.

**Illustration style (revised — see Progress log):** The project moved away from thin abstract line-art placeholders. Every dish, every named person, and every "empty" visual slot should carry a real, detailed illustration — full color fills, texture, garnish/context detail for dishes; actual hairstyles and facial features for people — evoking real cuisine, culture, and tourism rather than reading as a wireframe. This is still hand-drawn vector art (SVG), not photography or AI-generated raster images — no image-generation or external-image-fetching tool is available in this environment, and real photos were never sourced or downloaded (do not assume any exist in `public/`). If real photography becomes available later (user-supplied files, or a session with working image tooling), it should replace the illustrations rather than run alongside them. Keep the anti-cliché and palette-discipline rules above in force regardless of illustration density — richer detail is not license for red-and-gold palettes, lantern/dragon motifs, or colors outside the 5 tokens.

---

## Mock data schema (build this first, use everywhere)

Consistency across screens depends on shared mock data. Do not invent new data per screen.

**Village authors** (5 named individuals):
- Bà Nguyễn Thị Hạnh — chè lam, bánh tẻ
- Ông Trần Văn Minh — tương
- Bà Lê Thị Xuân — chè lam variants
- Ông Phạm Đức Hùng — bánh tẻ
- Bà Đỗ Thị Lan — general village elder

**Archive entries** (build 6 minimum, mix of complete and in-progress):
Each entry has: `id`, `title` (Vietnamese, English, Chinese), `primaryAuthor` (village author id), `coAuthors` (array of contributor ids with contribution type), `status` ('published' | 'draft' | 'awaiting-approval'), `sections` (origin, ingredients, method, seasonalNotes, variants), `audioUrl` (mock), `heroImage` (placeholder), `createdAt`, `contributionCount`.

**Anchor dishes to use consistently:**
- Chè lam (chè lam Đường Lâm) — traditional lunar new year sweet
- Tương (tương Đường Lâm) — fermented soy sauce
- Bánh tẻ — rice flour cake
- Kẹo dồi — peanut candy
- Gà mía — Mía chicken (local breed)
- Chè kho — dense mung bean sweet

Spell these consistently. Do not vary romanization across files.

**Contributors** (create 8 named TCTC members with plausible Vietnamese/diaspora/Sinosphere names + a one-line bio each).

**Scaffold posts** (build 2 with rich comment threads — comments must exemplify the four types from Screen 12 spec: regional variant, family memory, dialectal term, correction/extension).

---

## Structural rules (do not violate)

These are stated in the brief but restated here because they must survive every implementation decision:

1. **Attribution is always visible.** Every screen that displays entry content shows primary author + co-authors by name. There is no view mode that hides this. Build `<AuthorAttribution entry={entry} />` once and use it everywhere.

2. **AI-assisted content is visually distinguishable.** Transcribed or translated content shows a subtle marker (small `moss`-colored label reading "AI-transcribed" / "AI-translated"). Not a warning, not a badge — a quiet label. Human-authored narrative shows no marker.

3. **Publish gate is explicit.** No entry can move to `published` status without passing through Screen 10 (Publish Approval) with an explicit affirmative action. Do not add a "quick publish" shortcut anywhere.

4. **Duong Lam only.** No multi-village browsing. No village switcher. No "explore other villages" affordance. The archive is scoped to one village.

5. **Attribution over decoration, but illustration is not decoration here.** Attribution must never be sacrificed for visual polish — it stays visible regardless of how illustrated a screen is. That said, per the revised illustration style above, dish and person illustrations are expected on every screen that references them; "restraint" now means staying within the palette and avoiding stock cultural clichés, not avoiding imagery altogether.

6. **The Commons Directory shows credited relationships, not social ones.** No messaging, no follow/connect mechanics, no direct contact between users anywhere in the app. Payment exists only inside the visit booking flow (Screen 17) — never peer-to-peer, never inside a profile view.

7. **No AI-generated imagery of unphotographed cultural content.** AI may enhance, format, or lay out real captured photos and real entry data (infographics, crop/color adjustment). It may never generate illustrative imagery depicting a dish, ritual, or practice that wasn't actually photographed or documented by a real contributor. If a visual doesn't exist, show an honest empty state, not an AI substitute. *Scope note:* this governs the product's in-fiction AI features (Content Studio, Infographic Generator) — it does not retroactively apply to `DishIllustration`/`PersonAvatar`, which are the app's static hand-drawn design system (authored once, applied uniformly, never presented as "AI generated a photo of your dish"), not a runtime AI capability a user invokes. If a future screen makes that distinction unclear, flag it rather than defaulting toward generating something.

---

## Definition of done (per screen)

A screen is done when:
- [ ] Renders with real mock data from `/src/data`, not inline placeholders
- [ ] All states in the brief are implemented (empty / loading / populated / error where applicable)
- [ ] Uses shared components — no re-implemented attribution blocks, buttons, or entry cards
- [ ] Responsive at mobile (375px) and desktop (1280px) breakpoints
- [ ] Reachable via routing from at least one other screen
- [ ] Follows the color/type discipline (no palette drift)

Report which screens are done at the end of each session using this checklist.

---

## What to ask before assuming

Ask the user before:
- Adding any dependency beyond React, React Router, Tailwind, and clsx/classnames
- Introducing animation libraries (Framer Motion, etc.)
- Changing the file structure convention above
- Building screens out of the phase order

Do NOT ask before:
- Naming a mock entry, contributor, or field label — use the schema, extend it consistently
- Making minor layout decisions inside a screen
- Choosing specific Tailwind utility values

---

## Things that would break the prototype's credibility

Listed explicitly so you avoid them:
- Lorem ipsum placeholder text (use plausible Duong Lam content instead)
- Inconsistent romanization of Vietnamese dish names across screens
- Generic empty-state illustrations ("no items yet 🎨")
- Emoji icons anywhere in the UI
- A "share to social media" button that isn't Screen 21's derivative generator flow
- Auth screens with real form validation — this is mocked, keep it minimal
- A multi-village switcher of any kind
- Attribution hidden behind a "view details" tap

---

## When context runs low

If session context is filling up:
1. Finish the current screen
2. Update the progress checklist at the top of this file (add a `## Progress` section)
3. Commit and stop — do not start a new screen

Better to leave a clean handoff than to build half a screen.

---

## Progress

All 24 screens built (Phases 1–4 complete), full Village Author / Contributor / Visitor loops verified end-to-end, PR #1 open against `main`.

**Design pivot (post-launch):** the original restraint-first illustration approach (thin abstract line-art) was explicitly reversed by the project owner — see the "Illustration style" note under Design tokens above. Every dish and named person now gets a detailed, full-color hand-drawn illustration via `DishIllustration` and `PersonAvatar` (`src/components/shared/`). No real photography is in the project; none was sourced (network/image-gen tooling unavailable in-session). If a future session gains that capability and the user wants to swap in real photos, replace these components' internals rather than layering photos on top of them.
