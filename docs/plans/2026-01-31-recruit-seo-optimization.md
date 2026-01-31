# Recruit SEO Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve recruiting search visibility for targeted areas and “休み多い” queries by adding job-specific pages with valid JobPosting schema, area-specific landing pages, and stronger internal linking.

**Architecture:** Keep `/recruit` as the hub, move JobPosting schema to one-job-per-page routes, add area pages under a clear prefix to avoid slug collisions, and update sitemap + metadata. Shared data stays in `src/lib/recruit-data.ts`, with new area metadata in a dedicated file.

**Tech Stack:** Next.js App Router, React, TypeScript, JSON-LD via `StructuredData` components, `sitemap.ts`.

---

### Task 1: Add area metadata source

**Files:**
- Create: `src/lib/recruit-areas.ts`

**Step 1: Write the failing test (manual checklist)**
- Define a checklist for each area: name, slug, short copy, two unique bullet points, and CTA text.

**Step 2: Run verification (manual)**
- Confirm the checklist fails because the file doesn’t exist yet.

**Step 3: Implement minimal data**
- Add an array of 5 area objects with unique copy and bullets (30%+ unique text).

**Step 4: Run verification (manual)**
- Ensure each area has unique copy and the five target areas are present.

**Step 5: Commit**
```
git add src/lib/recruit-areas.ts
git commit -m "feat: add recruit area metadata"
```

---

### Task 2: Create area landing pages

**Files:**
- Create: `src/app/recruit/areas/[slug]/page.tsx`
- Create: `src/app/recruit/areas/[slug]/layout.tsx` (metadata + breadcrumb)
- Modify: `src/components/StructuredData.tsx`

**Step 1: Write the failing test (manual checklist)**
- Checklist: each area page must render title, unique copy, service area list, and CTAs to job pages and contact modal.

**Step 2: Run verification (manual)**
- Access a placeholder route and confirm 404 (expected failure).

**Step 3: Implement minimal page**
- Use `recruit-areas.ts` for content.
- Include breadcrumb structured data.

**Step 4: Run verification (manual)**
- Load `/recruit/areas/funabashi` etc. Verify content renders and matches area data.

**Step 5: Commit**
```
git add src/app/recruit/areas src/components/StructuredData.tsx
git commit -m "feat: add recruit area pages"
```

---

### Task 3: Split job pages and move JobPosting schema

**Files:**
- Create: `src/app/recruit/nurse/page.tsx`
- Create: `src/app/recruit/therapist/page.tsx`
- Modify: `src/app/recruit/layout.tsx`
- Modify: `src/components/StructuredData.tsx`
- Modify: `src/app/recruit/page.tsx`

**Step 1: Write the failing test (manual checklist)**
- Checklist: `/recruit` has **no** JobPosting JSON-LD; each job page has **one** JobPosting JSON-LD and matches page content.

**Step 2: Run verification (manual)**
- View current `/recruit` (should fail because it renders two JobPosting blocks).

**Step 3: Implement minimal job pages**
- Reuse `JobDetails` content per job, add hero/KPI, and keep CTA to contact modal.
- Update `JobPostingStructuredData` to accept a single job and job locations.
- Remove JobPosting output from `/recruit` layout, add it to job pages only.

**Step 4: Run verification (manual)**
- Confirm each job page emits a single JobPosting JSON-LD and matches on-page content.

**Step 5: Commit**
```
git add src/app/recruit src/components/StructuredData.tsx
git commit -m "feat: split recruit job pages and schema"
```

---

### Task 4: Update `/recruit` hub content and internal links

**Files:**
- Modify: `src/app/recruit/page.tsx`

**Step 1: Write the failing test (manual checklist)**
- Checklist: Hub links to `/recruit/nurse`, `/recruit/therapist`, and area pages; “年休139日以上（PT・OT・STは120日以上）” appears in hero + KPI.

**Step 2: Run verification (manual)**
- Confirm current hub lacks the new links (expected failure).

**Step 3: Implement link updates**
- Add CTA buttons to job pages and area pages.

**Step 4: Run verification (manual)**
- Validate all links are present and correct.

**Step 5: Commit**
```
git add src/app/recruit/page.tsx
git commit -m "feat: update recruit hub links and copy"
```

---

### Task 5: Metadata + sitemap updates

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/recruit/layout.tsx`
- Create: `src/app/recruit/nurse/layout.tsx`
- Create: `src/app/recruit/therapist/layout.tsx`

**Step 1: Write the failing test (manual checklist)**
- Checklist: sitemap includes job pages + all area pages; each job page has clear title/description; no keyword stuffing.

**Step 2: Run verification (manual)**
- Check sitemap output missing new URLs (expected failure).

**Step 3: Implement metadata + sitemap**
- Add job/area URLs and update metadata per page with clean, descriptive titles.

**Step 4: Run verification (manual)**
- Review sitemap and metadata for correctness.

**Step 5: Commit**
```
git add src/app/sitemap.ts src/app/recruit
git commit -m "chore: add recruit SEO metadata and sitemap entries"
```

---

### Task 6: Verification

**Files:**
- Modify: (none)

**Step 1: Run lint/typecheck**
```
pnpm lint
pnpm typecheck
```

**Step 2: Manual checks**
- Confirm JobPosting appears only on job pages.
- Confirm area pages render unique copy.
- Confirm “年休139日以上（PT・OT・STは120日以上）” appears in hero + KPI.

**Step 3: Commit (if needed)**
- Only if adjustments are required.

---

Plan complete and saved to `docs/plans/2026-01-31-recruit-seo-optimization.md`. Two execution options:

1. Subagent-Driven (this session) - I dispatch fresh subagent per task, review between tasks, fast iteration
2. Parallel Session (separate) - Open new session with executing-plans, batch execution with checkpoints

Which approach?
