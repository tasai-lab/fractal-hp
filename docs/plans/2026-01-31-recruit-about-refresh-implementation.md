# Recruit / About Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refresh the Recruit and About Fractal pages to a warm editorial layout with soft palette, improved hierarchy, and optimized images, while keeping recruitment CV as the primary goal.

**Architecture:** Update global styles, fonts, and per-page layouts with new editorial sections. Replace image usage to use provided assets and optimize sizes/next/image usage. Remove About side navigation and simplify scroll experience.

**Tech Stack:** Next.js (App Router), React, Tailwind (via CSS variables), next/image, next/font/google.

---

## Task 1: Add editorial design tokens + font setup

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Update fonts (Zen Old Mincho + M PLUS 1p)**

```tsx
import { M_PLUS_1, Zen_Old_Mincho } from "next/font/google";

const mplus1 = M_PLUS_1({
  variable: "--font-mplus1",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const zenOldMincho = Zen_Old_Mincho({
  variable: "--font-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

<body className={`${mplus1.variable} ${zenOldMincho.variable} antialiased`}>
```

**Step 2: Add new color tokens & typography helpers**

```css
:root {
  --color-paper: #f7f2ea;
  --color-sand: #efe7dd;
  --color-ink: #2b2b2b;
  --color-ink-soft: #4a4a4a;
  --color-olive: #2f5b4a;
  --color-terracotta: #c78a67;
}

.body-editorial {
  background: linear-gradient(180deg, var(--color-paper), #fff);
  color: var(--color-ink);
}

.heading-mincho { font-family: var(--font-mincho), serif; }
.text-ink-soft { color: var(--color-ink-soft); }
```

**Step 3: Run lint**

Run: `pnpm lint`
Expected: existing warning only (unused index) or no new errors.

**Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "style: add editorial tokens and fonts"
```

---

## Task 2: About Fractal – remove side nav + rebuild layout

**Files:**
- Modify: `src/app/about-fractal/page.tsx`

**Step 1: Remove section navigation state + UI**

- Delete `sections` array, side navigation, mobile tabs, and scroll tracking state.
- Keep core data content and restructure sections in single flow.

**Step 2: Build editorial hero**

```tsx
<section className="relative overflow-hidden bg-[var(--color-paper)]">
  <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
    <div>
      <p className="text-sm tracking-[0.3em] text-ink-soft">ABOUT FRACTAL</p>
      <h1 className="heading-mincho text-3xl md:text-5xl">フラクタルを知る</h1>
      <p className="text-ink-soft mt-4">温かく、誠実に。シンプルで独創的な社会を目指します。</p>
    </div>
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
      <Image src="/images/about/cover.png" fill alt="フラクタルの理念" />
    </div>
  </div>
</section>
```

**Step 3: Add Philosophy + Vision alternating blocks**

- Use `about/philosophy.png` and `about/vision.png` with text in alternating columns.

**Step 4: DAPAE timeline section**

- Use `about/dapae.png` and `about/dapae-detail.png` as supporting visuals.
- Reduce text density, add a soft sand background.

**Step 5: Guidelines cards**

- Render `guidelines` as small editorial cards with mincho headings.

**Step 6: Logo meaning section**

- Use `about/logo-meaning.png` alongside text.

**Step 7: Run lint**

Run: `pnpm lint`
Expected: no new errors.

**Step 8: Commit**

```bash
git add src/app/about-fractal/page.tsx
git commit -m "feat: redesign about fractal editorial layout"
```

---

## Task 3: Recruit page – rebuild layout to editorial flow

**Files:**
- Modify: `src/app/recruit/page.tsx`

**Step 1: Hero redesign**

- Use `/images/recruit/recruit-team.png` as hero image.
- Add short copy, CTA, and highlight cards.

**Step 2: Add “A Week / Work Style” section**

- Use `shift-example.png` beside text.

**Step 3: Candidate profile cards + team grid**

- Use staff images `public/images/staff/*.png` in a grid.

**Step 4: Service area with map**

- Use `/images/service-area/area-map.png` in a calm section.

**Step 5: Keep job tabs but simplify detail blocks**

- Reduce density, group salary/benefits/hours into 2-column editorial cards.

**Step 6: Application process with vertical step line**

- Add numbered timeline with subtle line.

**Step 7: Run lint**

Run: `pnpm lint`

**Step 8: Commit**

```bash
git add src/app/recruit/page.tsx
git commit -m "feat: redesign recruit editorial layout"
```

---

## Task 4: Image optimization pass

**Files:**
- Modify: `public/images/**` (optimized sizes)
- Modify: `src/app/recruit/page.tsx`
- Modify: `src/app/about-fractal/page.tsx`
- Modify: `next.config.ts`

**Step 1: Add next/image formats**

```ts
images: {
  formats: ["image/avif", "image/webp"],
}
```

**Step 2: Resize hero-bg.jpg to <= 2400px width**

Use `sips`:
```
sips -Z 2400 public/images/hero/hero-bg.jpg --out public/images/hero/hero-bg.jpg
```

**Step 3: Optional: Resize recruit-team.png (max 2000px)**

```
sips -Z 2000 public/images/recruit/recruit-team.png --out public/images/recruit/recruit-team.png
```

**Step 4: Ensure all Image components have `sizes`**

- Add `sizes="(max-width: 768px) 100vw, 50vw"` or context-specific.

**Step 5: Run lint**

Run: `pnpm lint`

**Step 6: Commit**

```bash
git add next.config.ts public/images/hero/hero-bg.jpg public/images/recruit/recruit-team.png src/app/recruit/page.tsx src/app/about-fractal/page.tsx
git commit -m "perf: optimize images and next/image settings"
```

---

## Task 5: Final QA

**Files:**
- N/A (manual)

**Step 1: Run lint and typecheck**

Run:
```
pnpm lint
pnpm typecheck
```

**Step 2: Visual review**

- Check Recruit + About pages on desktop and mobile sizes
- Verify no broken images, CTA visible, text readable

**Step 3: Commit fixes**

If any fixes, commit as `fix: polish layout`

---

Plan complete. Two execution options:

1. Subagent-Driven (this session)
2. Parallel Session (separate)

Which approach?
