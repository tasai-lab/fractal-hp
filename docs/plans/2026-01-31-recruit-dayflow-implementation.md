# Recruit Day-Flow Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a standalone “1日の流れ” page with the Johnny (ジョニ) introduction, and add links from recruit/area pages.

**Architecture:** Add a new Next.js page under `/recruit/day-flow`, backed by a small data module for timeline + copy. Update existing recruit and area pages to link to the new page, and add sitemap entry for SEO.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS, `next/image`, `lucide-react`.

---

### Task 1: Add day-flow data module

**Files:**
- Create: `src/lib/recruit-dayflow.ts`

**Step 1: Write the failing test**
- N/A (no existing test harness for static page data).

**Step 2: Run test to verify it fails**
- N/A.

**Step 3: Write minimal implementation**
- Create data for:
  - hero title/subtitle + chips
  - Johnny intro (name, nickname, description)
  - timeline steps (time/title/detail) reflecting: 9:00–19:00, 6–7 visits, no morning meeting, per-visit handoff, voice input → AI text, no end-of-day batch recording, direct start/finish OK.

**Step 4: Run test to verify it passes**
- N/A.

**Step 5: Commit**
```bash
git add src/lib/recruit-dayflow.ts
git commit -m "feat: add recruit day flow data"
```

---

### Task 2: Create /recruit/day-flow page

**Files:**
- Create: `src/app/recruit/day-flow/page.tsx`

**Step 1: Write the failing test**
- N/A (page UI).

**Step 2: Run test to verify it fails**
- N/A.

**Step 3: Write minimal implementation**
- Build layout matching recruit editorial style:
  - Hero (title, lead, chips, image)
  - Johnny card with `/images/recruit/johnny.png` and humorous copy
  - Vertical timeline with icons
  - CTA buttons: “応募する” (open contact modal) and “募集職種を見る” (link to `/recruit#positions`)
- Use `useScrollAnimation` for section reveals and `Contact` modal same as recruit page.

**Step 4: Run test to verify it passes**
- N/A.

**Step 5: Commit**
```bash
git add src/app/recruit/day-flow/page.tsx
git commit -m "feat: add recruit day flow page"
```

---

### Task 3: Link from recruit and area pages

**Files:**
- Modify: `src/app/recruit/page.tsx`
- Modify: `src/app/recruit/areas/[slug]/AreaClient.tsx`

**Step 1: Write the failing test**
- N/A.

**Step 2: Run test to verify it fails**
- N/A.

**Step 3: Write minimal implementation**
- Add a “1日の流れ” card/section on `/recruit` linking to `/recruit/day-flow`.
- Remove the day-flow timeline from area pages and replace with a link block to the new page.

**Step 4: Run test to verify it passes**
- N/A.

**Step 5: Commit**
```bash
git add src/app/recruit/page.tsx src/app/recruit/areas/[slug]/AreaClient.tsx
git commit -m "feat: link recruit day flow page"
```

---

### Task 4: Add sitemap entry

**Files:**
- Modify: `src/app/sitemap.ts`

**Step 1: Write the failing test**
- N/A.

**Step 2: Run test to verify it fails**
- N/A.

**Step 3: Write minimal implementation**
- Add `/recruit/day-flow` with weekly change frequency and priority ~0.8.

**Step 4: Run test to verify it passes**
- N/A.

**Step 5: Commit**
```bash
git add src/app/sitemap.ts
git commit -m "feat: add day flow page to sitemap"
```

---

### Task 5: Verification and final commit

**Step 1: Run lint**
```bash
pnpm lint
```
Expected: no errors (warnings acceptable if pre-existing).

**Step 2: Run typecheck**
```bash
pnpm typecheck
```
Expected: no errors.

**Step 3: Final commit (if needed)**
```bash
git add -A
git commit -m "feat: finalize recruit day flow page"
```

