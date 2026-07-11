# LA — Làng Archives
## Screen Brief for Prototype Development (Claude Code Handoff)

**Purpose of this document:** Build spec for a working prototype demonstrating the three-sided co-authoring model (Village Author / Contributor / Visitor) described in the Cultural Tourism Project Proposal. Scope is a functional, navigable prototype — not production infrastructure. Fake data is acceptable everywhere; auth can be mocked.

**Stack assumption:** React + Tailwind, mobile-first responsive (this is a phone-first product for village authors, desktop-capable for contributors). If Claude Code defaults to a different stack, that's fine — the constraint that matters is mobile-first layout for the Village Author and Visitor tracks specifically, since those are field-use contexts.

---

## Design Tokens

**Color system** (4-color discipline — do not introduce additional hues):

| Token | Hex | Use |
|---|---|---|
| `terracotta` (primary) | `#b85042` | Primary CTAs, active states, brand mark |
| `cream` (background) | `#e7e8d1` | Primary background, cards on white surfaces |
| `white` (surface) | `#ffffff` | Cards, modals, input fields |
| `ink` (text) | `#2B2420` | Body text, headings — warm near-black, not pure black |
| `moss` (secondary accent) | `#4A5D45` | Secondary actions, contributor-role tags, "co-author" badges |
| `ochre` (highlight, sparing) | `#C9A24B` | Credited-author badges, archive completeness indicators only — cap usage, this is a highlight color not a UI color |

Do not use gradients, drop shadows heavier than a soft 1-2px elevation, or decorative icons. Restraint is a stated design principle in the proposal — the UI should read as considered, not as a generic travel-app template.

**Typography:** Serif for headings (Source Serif Pro, Cormorant, or similar), sans-serif for body and UI chrome (Inter or system default). Serif signals cultural weight; sans signals operational clarity. Do not use a decorative or script typeface anywhere, including for the Vietnamese/Chinese script elements.

**Spacing/shape:** Generous whitespace, minimal borders (use background-color contrast over hard borders where possible), rounded corners at 8-12px — soft but not playful/bubbly.

---

## Navigation Architecture

Three user roles share one codebase but see different primary navigation. Prototype should implement a **role switcher** (simple dropdown or tab in a dev header — not a real feature, just for demo purposes) so a reviewer can jump between the three experiences without re-authenticating.

- **Village Author** — bottom nav (mobile): Home / Contribute / My Entries / Profile
- **Contributor (TCTC member)** — top nav (desktop-first): Explore / My Contributions / Visit / Profile
- **Visitor** — bottom nav (mobile): Discover / My Visit / Archive / Profile

Shared screens (Archive Explorer, Entry Detail, Onboarding) are role-agnostic and reachable from all three.

---

## Screen Index

**A. Shared / Entry (5)**
1. Splash / Cover
2. Onboarding Carousel
3. Role Selection
4. Archive Explorer (Home)
5. Archive Entry Detail

**B. Village Author Track (5)**
6. Village Author Dashboard
7. Voice Contribution (Record)
8. Draft Review
9. Co-Author Invitation
10. Publish Approval

**C. Contributor Track (5)**
11. Contributor Dashboard (Open Scaffolds)
12. Scaffold Thread View
13. Collaborative Editing
14. My Contributions Profile
15. Visit Eligibility / Booking Entry

**D. Visitor Track (5)**
16. Visit Discovery
17. Booking Flow
18. Pre-Visit Prep
19. On-Site Itinerary / Check-In
20. Post-Visit Contribution Certificate

**E. Distribution & Operations (4)**
21. Derivative Generator (Social Export)
22. Village Revenue Dashboard
23. Activity / Notifications Feed
24. Settings / Profile (shared shell, role-aware)

Total: 24 screens.

---

## A. Shared / Entry Screens

### 1. Splash / Cover
- **Purpose:** Brand entry point.
- **Elements:** LA wordmark, one-line tagline ("A living archive, co-authored"), single muted background image (laterite wall / courtyard texture), terracotta accent line.
- **Interaction:** Auto-advances to Onboarding after 1.5s or on tap.
- **State:** Loading state only — skeleton not needed, this is instant.

### 2. Onboarding Carousel
- **Purpose:** Explain the commons concept before any sign-up friction.
- **Elements:** 3 swipeable cards — (1) "Villagers hold the knowledge" (2) "Members co-author, credited by name" (3) "Visitors bring it to life on-site." Progress dots, Skip link (top-right, low-emphasis), CTA "Get Started."
- **Interaction:** Swipe or tap-through; skip goes straight to Role Selection.
- **States:** N/A (static content).

### 3. Role Selection
- **Purpose:** Establish which of the three tracks the user enters — this is the fork the whole prototype hangs on.
- **Elements:** Three cards: "I'm a Village Author" / "I'm a Contributor" / "I'm Visiting." Each card: short one-line description, not icons-as-decoration — use the actual first letter or a minimal line-drawing motif if anything.
- **Interaction:** Tap → routes to role-specific dashboard (mocked login skipped or minimal — email/phone field, no real auth needed).
- **States:** Default only.

### 4. Archive Explorer (Home)
- **Purpose:** Public-facing entry to the living archive itself — the proof-of-concept surface. This is the screen a reviewer or press contact would see first.
- **Elements:** Header "Duong Lam Food Archive" (single-village scope for pilot — do not build a multi-village browser, that overstates current scope). Grid/list of archive entries as cards: entry title, primary author name + photo, contributor count, one representative image. Filter bar: by dish type / by contributor / by "recently updated."
- **Interaction:** Tap card → Entry Detail. Filter chips toggle inline.
- **States:** Empty (no entries yet — show a "the archive starts with its first scaffold post" message, not a generic empty-state illustration), loading (skeleton cards), populated.

### 5. Archive Entry Detail
- **Purpose:** The single most important screen in the deck — this is the anchor artifact made real. Should mirror the proposal's Slide 6 wireframe closely.
- **Elements:** Entry header (dish name, Vietnamese + English + optional Chinese title), "Authored by [Village Author name]" line, "Co-authored by [names]" line below it in smaller type, hero image, sections: Origin story / Ingredients / Method / Seasonal notes / Variants shared by the community (this last section should visually read as ongoing/open, e.g., a lighter background block distinct from the core entry — signals it's still growing). "Contribute a variant" CTA at the bottom (routes contributors to Scaffold Thread).
- **Interaction:** Scroll-based single page. Audio play button if a village author voice recording exists for that entry (ties to Screen 7).
- **States:** Fully populated (default), partial (some sections still empty pending contribution — show "not yet documented" in muted ochre-adjacent tone, not an error state).

---

## B. Village Author Track

### 6. Village Author Dashboard
- **Purpose:** Home base for a village culture holder — low-friction, phone-first, minimal text.
- **Elements:** Greeting with name, large single primary action "Record a Contribution," list of "My Entries" (published + drafts, drafts marked with a small ochre dot), pending co-author invitations badge.
- **Interaction:** Primary CTA → Voice Contribution screen.
- **States:** New user (no entries — show one clear starter prompt tied to a scaffold post), active user (populated list).

### 7. Voice Contribution (Record)
- **Purpose:** Core input mechanism — must be genuinely low-friction. This is the screen that makes or breaks the "villagers don't need to become content creators" claim.
- **Elements:** Large record button (terracotta, centered), waveform visualization while recording, language indicator (defaults to Vietnamese), a few optional prompt questions shown above the record button ("What's the story behind this dish?" / "What makes your version different?") — these are optional scaffolds, not a form.
- **Interaction:** Tap to record, tap to stop, playback + re-record option, "Continue" advances to Draft Review once satisfied.
- **States:** Idle, recording, recorded/reviewing, uploading/processing (with a plain-language message — "Transcribing your recording" — not jargon).

### 8. Draft Review
- **Purpose:** Show the village author what AI-assisted transcription/formatting produced, before any co-author touches it.
- **Elements:** Transcribed text (editable inline), original audio still playable alongside, a clear "This is a draft — nothing is public yet" banner.
- **Interaction:** Edit text directly, or re-record. "Looks good, invite a co-author" CTA.
- **States:** Draft (default), edited (shows a subtle "edited" marker so it's clear the transcription was corrected).

### 9. Co-Author Invitation
- **Purpose:** Village author selects or accepts a TCTC contributor to help translate/illustrate/contextualize.
- **Elements:** List of suggested contributors (based on mocked "already active on this scaffold" data) with name, short bio line, contribution history count. "Invite" button per contributor. Alternative: "Open to any contributor" toggle.
- **Interaction:** Tap Invite → sends mock notification, returns to dashboard with entry marked "awaiting co-author."
- **States:** No suggestions yet (rare edge case — show manual search field), suggestions populated.

### 10. Publish Approval
- **Purpose:** Final gate — nothing publishes without primary author consent. This screen exists to make that principle visible in the UI, not just in policy.
- **Elements:** Full entry preview exactly as it will appear publicly, co-author names and their specific contributions clearly separated from the primary author's content, explicit "I approve this for publication" action (not a passive save).
- **Interaction:** Approve → publishes, routes to updated Entry Detail. "Request changes" → sends back to co-author with a comment field.
- **States:** Pending review, approved/published, changes requested.

---

## C. Contributor Track

### 11. Contributor Dashboard (Open Scaffolds)
- **Purpose:** Entry point for a TCTC member — surfaces where their contribution is currently needed.
- **Elements:** Feed of open scaffold posts ("Which Duong Lam foods do you remember?"), each showing comment/contribution count so far, a "Needs translation" / "Needs illustration" / "Needs context" tag per open item (moss-colored tags).
- **Interaction:** Tap a scaffold → Scaffold Thread View.
- **States:** Populated feed, empty (rare — "no open scaffolds right now, check back soon").

### 12. Scaffold Thread View
- **Purpose:** Reproduce the TCTC comment-thread pattern described in Slide 9 — this is where the "invite recognition, not information transmission" pattern needs to be visually legible.
- **Elements:** Original scaffold post at top, threaded comments below (mock data: a regional variant, a family memory, a dialectal term, a correction/extension — matching the four example types from the proposal), each comment attributed by name, "Add your contribution" input at the bottom.
- **Interaction:** Post a comment (adds to thread), "Suggest this becomes an archive entry" flag option on any comment (visible to indicate the pathway from comment → structured draft).
- **States:** Active thread, thread that has already graduated to a structured draft (show a banner linking to the in-progress Entry Detail).

### 13. Collaborative Editing
- **Purpose:** Where a contributor works directly with a village author's recorded content — the actual co-authoring workspace.
- **Elements:** Village author's original audio/transcript pinned at top (read-only), contributor's editable panel below for translation/context/illustration notes, side-by-side or stacked depending on viewport.
- **Interaction:** Edit and save draft sections; submit for village author review (routes into their Draft Review flow, Screen 8).
- **States:** In progress (autosave indicator), submitted/awaiting village author response.

### 14. My Contributions Profile
- **Purpose:** Durable record of a contributor's participation — this is their incentive structure made visible.
- **Elements:** List of credited archive entries they've co-authored, contribution type per entry (translation/context/illustration), a simple stat line (entries contributed, since when).
- **Interaction:** Tap entry → Archive Entry Detail (their own credited version).
- **States:** New contributor (empty, prompts toward Screen 11), active contributor.

### 15. Visit Eligibility / Booking Entry
- **Purpose:** Bridge from digital contribution to physical visit — only accessible once a contributor has actually co-authored something (this constraint should be visible in the UI, not silently enforced).
- **Elements:** Eligibility status ("You've co-authored 2 entries — you're eligible to book a residency"), or if not yet eligible, a clear explanation of the requirement plus a link back to open scaffolds.
- **Interaction:** CTA "Book a Residency" → Visitor Booking Flow (Screen 17), reusing the same flow regardless of entry point.
- **States:** Eligible, not-yet-eligible.

---

## D. Visitor Track

### 16. Visit Discovery
- **Purpose:** Public-facing page for someone considering a visit — needs to read as a residency, not a tour package.
- **Elements:** "Co-Authoring Residency, Duong Lam" header, description emphasizing participation over consumption, a preview of what past visitors contributed (pulls from Archive Entry Detail data), available date ranges.
- **Interaction:** "Apply to Visit" CTA → Booking Flow.
- **States:** Available dates, fully booked (show next available window rather than a dead end).

### 17. Booking Flow
- **Purpose:** Multi-step booking — keep to 3 steps max, this should not feel like a generic travel-booking form.
- **Elements:** Step 1: dates + group size. Step 2: which archive entry/practice they're most drawn to contributing to (ties the booking back to the commons, not a generic itinerary). Step 3: confirmation + what they'll need to bring.
- **Interaction:** Standard step-forward flow, back navigation preserved.
- **States:** In progress (step indicator), confirmed.

### 18. Pre-Visit Prep
- **Purpose:** Sets expectations and introduces the visitor to their host before arrival — this is where "hosts, not performers" gets reinforced.
- **Elements:** Host village author's profile (name, the entries they've authored, a short intro), practical logistics (what to bring, what happens each day), a note reiterating that the visit produces a contribution, not just photographs.
- **Interaction:** Scroll-based, no heavy interaction — a "Message your host" mock action is optional.
- **States:** Static/populated.

### 19. On-Site Itinerary / Check-In
- **Purpose:** Day-of-visit companion screen — matches the Slide 12 morning/afternoon/evening structure.
- **Elements:** Timeline view: Morning (cooking session), Afternoon (on-site recording), Evening (village dinner). Each block expandable for detail. Check-in button per block (marks attendance/completion — mocked).
- **Interaction:** Tap block to expand, mark complete.
- **States:** Upcoming, in-progress (today highlighted), completed.

### 20. Post-Visit Contribution Certificate
- **Purpose:** What the visitor takes home — credited authorship made tangible, closing the loop back to the Archive.
- **Elements:** The specific archive entry section they contributed to, their name now appearing in its co-author list, a downloadable/printable certificate-style summary (simple, not gimmicky — should look like an extension of the archive entry's visual language, not a separate "achievement unlocked" pattern).
- **Interaction:** "View in Archive" → Archive Entry Detail showing their live credit. "Download" mock action.
- **States:** Generated/ready.

---

## E. Distribution & Operations

### 21. Derivative Generator (Social Export)
- **Purpose:** Operationalizes Slide 13 — shows how an archive entry becomes short-form content for external platforms without the canonical record leaving LA.
- **Elements:** Select an archive entry, choose a format (short video card / illustrated image card / quote card), preview pane, platform-specific export buttons (TikTok / Xiaohongshu / Instagram / Facebook — styled as simple labeled buttons, not platform-branded icon soup), each preview shows a visible "link back to full archive entry" element.
- **Interaction:** Select entry → select format → preview → mock "export" action.
- **States:** No entry selected, format selected/previewing, exported (mock confirmation).

### 22. Village Revenue Dashboard
- **Purpose:** Makes the revenue-share transparency principle (Slide 15/16) visible as an actual UI, not just a policy claim. Accessible from Village Author Profile.
- **Elements:** Simple breakdown: visit fees this period, revenue share percentage and amount, any brand partnership income, plain-language explanation of the split (village-side / platform / contributor pool).
- **Interaction:** View-only for prototype purposes; period selector (this quarter / all time).
- **States:** Populated with mock figures, zero-state for a brand-new village author.

### 23. Activity / Notifications Feed
- **Purpose:** Cross-role — co-author invitations, draft-review requests, booking confirmations, new contributions to entries you've authored.
- **Elements:** Chronological list, each item with role-appropriate icon-free label and a single action link.
- **Interaction:** Tap → routes to relevant screen (Draft Review, Scaffold Thread, etc.).
- **States:** Empty, populated, unread indicator.

### 24. Settings / Profile (shared shell)
- **Purpose:** Standard account shell, role-aware fields (village author sees revenue-share settings, contributor sees contribution history summary, visitor sees past visits).
- **Elements:** Name, photo, role badge, language preference, notification preferences, log out.
- **Interaction:** Standard settings form.
- **States:** Default only.

---

## Notes for Claude Code

- **Do not build a multi-village experience.** The pilot is Duong Lam only. A village switcher or "explore other villages" pattern overstates current scope and should not appear anywhere in the prototype.
- **Attribution must never be optional or hideable.** Every screen showing an archive entry — regardless of role viewing it — must show primary author + co-author names. This is a structural principle, not a cosmetic one.
- **AI-generated content (transcription, translation, formatting) must be visually distinguishable from human-authored narrative content** wherever both appear on the same screen (e.g., Draft Review). A subtle label or distinct type treatment is sufficient — do not over-engineer this, but do not omit it either.
- **Avoid stock "cultural" visual clichés** — no red-and-gold color combinations, no generic lantern/pagoda iconography, no decorative Asian-inspired border patterns. The palette and restraint specified above are deliberate design choices tied to the proposal's stated tone.
- **Empty states should be specific to context**, not generic illustrations-and-friendly-copy patterns. Reference the plain-language examples given per screen above.
- Placeholder content (names, entry text, revenue figures) should read as plausible Duong Lam-specific content (chè lam, tương, bánh tẻ as example dishes) rather than generic Lorem Ipsum or unrelated placeholder text — this is a demo meant to be shown to reviewers who know the proposal.
