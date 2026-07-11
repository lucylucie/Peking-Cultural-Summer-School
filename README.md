# LA — Làng Archives (Prototype)

Interactive prototype demonstrating the three-sided co-authoring model from the LA cultural tourism commons proposal. Built for the 2026 Peking University Summer School application.

## What this is

A navigable React prototype covering 24 screens across three user roles (Village Author, Contributor, Visitor) plus shared archive views. Scope: **Duong Lam village pilot only.** All data is mocked.

## What this is not

- Production infrastructure
- A multi-village platform
- A finished visual design system

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Use the dev-only role switcher in the top header to jump between the three user tracks.

## Structure

- `LA-Lang-Archives-Screen-Brief.md` — full screen-by-screen spec
- `CLAUDE.md` — operational context for AI-assisted development
- `src/screens/` — screens organized by track
- `src/components/` — shared and track-specific components
- `src/data/` — mock data (single source of truth)

## Build phases

1. **Foundation** — scaffold, tokens, shared components, mock data
2. **Priority track** — Archive + Village Author loop (Screens 4–10)
3. **Supporting tracks** — Contributor + Visitor (Screens 11–20)
4. **Operations** — Distribution, dashboards, settings (Screens 21–24)

## Design principles

Restraint over decoration. Attribution over polish. Duong Lam-specific over generic. See `CLAUDE.md` for the full rule set.
