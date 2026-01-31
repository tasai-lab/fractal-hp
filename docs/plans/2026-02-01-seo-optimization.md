# 求人SEO最適化 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 「船橋 訪問看護 求人」等のキーワードでGoogle検索順位を26位から10位以内に改善する

**Architecture:**
1. メタデータの最適化（タイトルに地域名を先頭配置）
2. エリアページのコンテンツ拡充（求人検討に必要な情報を網羅）
3. 構造化データの強化（JobPosting拡張、地域別追加）
4. 内部リンク・サイトマップの最適化

**Tech Stack:** Next.js 14, TypeScript, JSON-LD構造化データ

**競合分析（くれよん訪問看護）から学んだポイント:**
- タイトルに地域名を先頭配置: 「船橋 | くれよん訪問看護」
- 求人ページ5,000語以上の充実コンテンツ
- 経験年数別の給与表を明示
- 1日の流れを時間別に詳細記載

**レビュー結果の反映（Gemini 2.5 Pro + GPT 5.2）:**
- keywordsメタタグは削除（Googleはほぼ使わない）
- datePostedは固定日付を使用（ビルド日問題を回避）
- FAQスキーマのidはエリアごとにユニークに
- sitemap.tsでエリアページURLを確認
- 内部リンクの強化を追加

---

## Task 1: メタデータ最適化 - 採用トップページ

**Files:**
- Modify: `src/app/recruit/layout.tsx`

**Step 1: タイトルとDescriptionを地域名優先に変更**

現在:
```typescript
title: "採用情報 | フラクタル訪問看護",
```

変更後:
```typescript
title: "船橋市・八千代市・習志野市の訪問看護求人 | フラクタル訪問看護",
description: "船橋市・八千代市・習志野市で訪問看護師・PT・OT・STを募集中。年間休日139日以上（PT・OT・STは120日以上）、入社祝い金最大30万円。直行直帰OK、AI活用で記録業務を効率化。未経験・ブランク可。",
```

**Step 2: OpenGraphとTwitterカードも同様に更新**

```typescript
openGraph: {
  title: "船橋市・八千代市・習志野市の訪問看護求人 | フラクタル訪問看護",
  description: "訪問看護師・PT・OT・ST募集。年間休日139日以上、入社祝い金最大30万円、直行直帰OK。",
  // ...
},
twitter: {
  title: "船橋市・八千代市・習志野市の訪問看護求人 | フラクタル訪問看護",
  description: "訪問看護師・PT・OT・ST募集。年間休日139日以上、入社祝い金最大30万円。",
},
```

**Step 3: ビルドして確認**

Run: `npm run build`
Expected: ビルド成功

**Step 4: Commit**

```bash
git add src/app/recruit/layout.tsx
git commit -m "feat(seo): 採用トップページのメタデータに地域名を先頭配置"
```

---

## Task 2: メタデータ最適化 - エリアページ

**Files:**
- Modify: `src/app/recruit/areas/[slug]/layout.tsx`

**Step 1: タイトルを「地域名 訪問看護 求人」の形式に最適化**

現在:
```typescript
title: `${area.name}の訪問看護求人 | フラクタル訪問看護`,
```

変更後:
```typescript
title: `${area.name} 訪問看護 求人 | 看護師・PT募集 | フラクタル訪問看護`,
```

**Step 2: Descriptionを詳細化（各エリア固有の情報を含める）**

```typescript
description: `${area.name}で訪問看護師・理学療法士・作業療法士を募集中。年間休日139日以上（PT・OT・STは120日以上）、入社祝い金最大30万円、直行直帰OK。${area.shortCopy}`,
```

**注意: keywordsメタタグは追加しない**（Googleはほぼ使用せず、スパム扱いリスクあり）

**Step 3: ビルドして確認**

Run: `npm run build`
Expected: ビルド成功、エリアページのメタデータが更新

**Step 4: Commit**

```bash
git add src/app/recruit/areas/[slug]/layout.tsx
git commit -m "feat(seo): エリアページのメタデータを検索キーワード最適化"
```

---

## Task 3: エリアデータの拡充

**Files:**
- Modify: `src/lib/recruit-areas.ts`

**Step 1: RecruitArea型を拡張**

```typescript
export type RecruitArea = {
  slug: string;
  name: string;
  shortCopy: string;
  bullets: [string, string];
  cta: string;
  dayFlow: { time: string; title: string; detail: string }[];
  workStyle: { title: string; detail: string }[];
  staffVoice?: { name: string; role: string; comment: string };
  // 新規追加フィールド
  seoContent: {
    areaDescription: string;      // 地域の特徴（求人検討に必要な情報）
    accessInfo: string;           // アクセス情報
    nearbyStations: string[];     // 最寄り駅
    characteristics: string[];    // エリアの特性
  };
  salaryExample: {
    nurseMonthly: string;
    nurseAnnual: string;
    therapistMonthly: string;
    therapistAnnual: string;
  };
  faq: { question: string; answer: string }[];
};
```

**Step 2: 船橋市のデータを詳細化**

```typescript
{
  slug: "funabashi",
  name: "船橋市",
  shortCopy: "主要駅からのアクセスが良く、訪問ルートの組み立てがしやすいエリアです。",
  bullets: [
    "駅周辺と住宅街の両方をバランス良く訪問",
    "直行直帰でも移動負担が少ない環境",
  ],
  cta: "船橋市で働く採用情報を見る",
  dayFlow: defaultDayFlow,
  workStyle: [
    { title: "移動効率を最適化", detail: "密度の高いエリアで移動時間を短縮。" },
    { title: "連携のしやすさ", detail: "医療機関が多く、連絡もスムーズ。" },
    { title: "家庭との両立", detail: "直行直帰で生活リズムを守れます。" },
  ],
  seoContent: {
    areaDescription: `船橋市は千葉県北西部に位置し、JR総武線・京成線・東武野田線など複数の鉄道路線が乗り入れ、都心へのアクセスも良好です。高齢化が進む住宅地が多く、訪問看護のニーズが年々増加しています。

フラクタル訪問看護では、船橋駅周辺から三山・前原・高根台エリアまで幅広く訪問しています。道路網が整備されているため、社用車での移動効率が良く、1日6〜7件の訪問をスムーズにこなせます。

当ステーションでは船橋市介護保険訪問看護職員雇用促進手当（月額15,000円）が支給されます。これは船橋市で働く訪問看護師ならではのメリットです。`,
    accessInfo: "事業所は三山6丁目にあり、JR総武線津田沼駅からバス15分、京成線京成津田沼駅からバス10分です。駐車場完備で、社用車での直行直帰が可能です。",
    nearbyStations: ["津田沼駅", "船橋駅", "西船橋駅", "京成津田沼駅"],
    characteristics: [
      "訪問看護ニーズが高いエリア",
      "船橋市独自の雇用促進手当あり",
      "複数路線でアクセス良好",
      "住宅地が多く訪問ルートが組みやすい",
    ],
  },
  salaryExample: {
    nurseMonthly: "341,000円〜360,000円",
    nurseAnnual: "450万円〜600万円",
    therapistMonthly: "320,000円〜",
    therapistAnnual: "400万円〜550万円",
  },
  faq: [
    {
      question: "船橋市での訪問件数は1日何件ですか？",
      answer: "1日6〜7件が目安です。船橋市は道路網が整備されているため、効率よく訪問できます。",
    },
    {
      question: "船橋市の手当はありますか？",
      answer: "船橋市介護保険訪問看護職員雇用促進手当として、月額15,000円が支給されます。",
    },
    {
      question: "船橋駅から事業所へのアクセスは？",
      answer: "JR総武線津田沼駅からバス15分です。社用車貸与があるため、直行直帰も可能です。",
    },
  ],
},
```

**Step 3: 他の4エリア（八千代市、習志野市、千葉市花見川区、千葉市稲毛区）も同様に拡充**

各エリアの固有情報（訪問範囲、移動、患者層、アクセス）を追加。共通部分は重複を避ける。

**Step 4: Commit**

```bash
git add src/lib/recruit-areas.ts
git commit -m "feat(seo): エリアデータを拡充（地域特性、給与例、FAQ追加）"
```

---

## Task 4: エリアページUIの拡充

**Files:**
- Modify: `src/app/recruit/areas/[slug]/AreaClient.tsx`

**Step 1: 地域詳細セクションを追加**

```tsx
{/* 地域の特徴セクション */}
<section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
  <FadeIn>
    <p className="text-xs tracking-[0.3em] text-ink-soft">AREA INFO</p>
    <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
      {area.name}の訪問看護について
    </h3>
    <div className="mt-6 text-ink-soft leading-relaxed whitespace-pre-line">
      {area.seoContent.areaDescription}
    </div>
    <div className="grid md:grid-cols-2 gap-4 mt-6">
      <div className="bg-[var(--color-paper)] rounded-2xl p-4">
        <p className="font-semibold text-[var(--color-olive)]">アクセス情報</p>
        <p className="text-sm text-ink-soft mt-2">{area.seoContent.accessInfo}</p>
      </div>
      <div className="bg-[var(--color-paper)] rounded-2xl p-4">
        <p className="font-semibold text-[var(--color-olive)]">最寄り駅</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {area.seoContent.nearbyStations.map((station) => (
            <span key={station} className="px-2 py-1 bg-white rounded text-xs">
              {station}
            </span>
          ))}
        </div>
      </div>
    </div>
  </FadeIn>
</section>
```

**Step 2: 給与例セクションを追加**

```tsx
{/* 給与例セクション */}
<section className="bg-[var(--color-paper)] rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
  <FadeIn>
    <p className="text-xs tracking-[0.3em] text-ink-soft">SALARY</p>
    <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
      {area.name}勤務の給与例
    </h3>
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-sm">
        <caption className="sr-only">{area.name}勤務の職種別給与一覧</caption>
        <thead>
          <tr className="border-b border-[var(--color-olive)]/20">
            <th scope="col" className="py-3 text-left font-semibold text-[var(--color-olive)]">職種</th>
            <th scope="col" className="py-3 text-left font-semibold text-[var(--color-olive)]">月給</th>
            <th scope="col" className="py-3 text-left font-semibold text-[var(--color-olive)]">年収目安</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[var(--color-olive)]/10">
            <td className="py-3">看護師</td>
            <td className="py-3">{area.salaryExample.nurseMonthly}</td>
            <td className="py-3">{area.salaryExample.nurseAnnual}</td>
          </tr>
          <tr className="border-b border-[var(--color-olive)]/10">
            <td className="py-3">PT/OT/ST</td>
            <td className="py-3">{area.salaryExample.therapistMonthly}</td>
            <td className="py-3">{area.salaryExample.therapistAnnual}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="text-xs text-ink-soft mt-4">
      ※経験・スキルにより決定。入社祝い金最大30万円は別途支給。
    </p>
  </FadeIn>
</section>
```

**Step 3: エリア別FAQセクションを追加**

```tsx
{/* エリア別FAQ */}
{area.faq && area.faq.length > 0 && (
  <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
    <FadeIn>
      <p className="text-xs tracking-[0.3em] text-ink-soft">FAQ</p>
      <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
        {area.name}での勤務に関するよくある質問
      </h3>
      <div className="space-y-4 mt-6">
        {area.faq.map((item, index) => (
          <div key={index} className="bg-[var(--color-paper)] rounded-2xl p-4">
            <p className="font-semibold text-[var(--color-olive)]">Q. {item.question}</p>
            <p className="text-sm text-ink-soft mt-2">A. {item.answer}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  </section>
)}
```

**Step 4: ビルドして確認**

Run: `npm run build`
Expected: ビルド成功

**Step 5: Commit**

```bash
git add src/app/recruit/areas/[slug]/AreaClient.tsx
git commit -m "feat(seo): エリアページに地域詳細・給与例・FAQセクション追加"
```

---

## Task 5: 構造化データの強化 - エリア別JobPosting

**Files:**
- Modify: `src/components/StructuredData.tsx`
- Modify: `src/app/recruit/areas/[slug]/layout.tsx`

**Step 1: エリア別JobPosting構造化データコンポーネントを作成**

```typescript
// 募集開始日（固定値を使用してビルド日問題を回避）
const JOB_POSTED_DATE = "2024-01-15";

// エリア別求人構造化データ
export function AreaJobPostingStructuredData({
  areaName,
  areaSlug
}: {
  areaName: string;
  areaSlug: string;
}) {
  const validThrough = new Date();
  validThrough.setDate(validThrough.getDate() + 90);

  const nurseJobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `訪問看護師（${areaName}エリア）`,
    description: `${areaName}エリアでの訪問看護業務。年間休日139日以上、入社祝い金最大30万円。直行直帰OK、AI活用で記録業務を効率化。`,
    datePosted: JOB_POSTED_DATE,
    validThrough: validThrough.toISOString().split("T")[0],
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "フラクタル訪問看護 船橋",
      sameAs: "https://fractal-hokan.com",
      logo: "https://fractal-hokan.com/images/logos/corporate-logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "三山6丁目22-2 パレドール小川201",
        addressLocality: areaName.includes("市") ? areaName : `${areaName}`,
        addressRegion: "千葉県",
        postalCode: "274-0072",
        addressCountry: "JP",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "JPY",
      value: {
        "@type": "QuantitativeValue",
        minValue: 4500000,
        maxValue: 6000000,
        unitText: "YEAR",
      },
    },
    jobBenefits: "入社祝い金最大30万円、年間休日139日以上、社用車貸与、直行直帰OK",
    skills: "看護師免許、普通自動車運転免許",
    industry: "医療・福祉",
    directApply: true,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "JP",
    },
  };

  return (
    <Script
      id={`structured-data-${areaSlug}-nurse-job`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(nurseJobPosting),
      }}
    />
  );
}
```

**Step 2: エリアページlayout.tsxに構造化データを追加**

```typescript
import { AreaJobPostingStructuredData } from "@/components/StructuredData";

// layoutのreturn内に追加
{area && (
  <>
    <BreadcrumbStructuredData items={[...]} />
    <AreaJobPostingStructuredData areaName={area.name} areaSlug={area.slug} />
  </>
)}
```

**Step 3: ビルドして確認**

Run: `npm run build`
Expected: ビルド成功

**Step 4: Commit**

```bash
git add src/components/StructuredData.tsx src/app/recruit/areas/[slug]/layout.tsx
git commit -m "feat(seo): エリア別JobPosting構造化データを追加"
```

---

## Task 6: 構造化データの強化 - FAQスキーマ追加

**Files:**
- Modify: `src/components/StructuredData.tsx`
- Modify: `src/app/recruit/areas/[slug]/layout.tsx`

**Step 1: エリア別FAQスキーマ生成関数を追加**

```typescript
export function AreaFAQStructuredData({
  faqs,
  areaSlug
}: {
  faqs: { question: string; answer: string }[];
  areaSlug: string;
}) {
  if (!faqs || faqs.length === 0) return null;

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id={`structured-data-${areaSlug}-faq`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}
```

**Step 2: エリアページに追加**

```typescript
{area && area.faq && (
  <AreaFAQStructuredData faqs={area.faq} areaSlug={area.slug} />
)}
```

**Step 3: Commit**

```bash
git add src/components/StructuredData.tsx src/app/recruit/areas/[slug]/layout.tsx
git commit -m "feat(seo): エリア別FAQスキーマを追加"
```

---

## Task 7: 看護師ページのメタデータ最適化

**Files:**
- Modify: `src/app/recruit/nurse/layout.tsx`

**Step 1: タイトルを地域名含む形式に変更**

```typescript
export const metadata: Metadata = {
  title: "船橋市・八千代市 訪問看護師求人 | 年休139日・祝金30万円 | フラクタル訪問看護",
  description: "船橋市・八千代市・習志野市で訪問看護師を募集。年間休日139日以上、入社祝い金最大30万円、月給341,000円〜。直行直帰OK、AI活用で記録業務を効率化。臨床経験3年以上、訪問未経験・ブランク可。",
  // 注意: keywordsメタタグは追加しない（Googleはほぼ使用しない）
};
```

**Step 2: Commit**

```bash
git add src/app/recruit/nurse/layout.tsx
git commit -m "feat(seo): 看護師ページのメタデータに地域名追加"
```

---

## Task 8: サイトマップの確認

**Files:**
- Check: `src/app/sitemap.ts`

**Step 1: エリアページがサイトマップに含まれているか確認**

```typescript
// 以下のURLが含まれていることを確認
// /recruit/areas/funabashi
// /recruit/areas/yachiyo
// /recruit/areas/narashino
// /recruit/areas/chiba-hanamigawa
// /recruit/areas/chiba-inage
```

**Step 2: 含まれていない場合は追加**

```typescript
import { recruitAreas } from "@/lib/recruit-areas";

// sitemap生成関数内に追加
const areaUrls = recruitAreas.map((area) => ({
  url: `https://fractal-hokan.com/recruit/areas/${area.slug}`,
  lastModified: new Date(),
  changeFrequency: "weekly" as const,
  priority: 0.8,
}));
```

**Step 3: Commit（変更がある場合）**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): サイトマップにエリアページを追加"
```

---

## Task 9: 最終確認とビルド

**Step 1: 全体ビルド確認**

Run: `npm run build`
Expected: すべてのページが正常にビルドされる

**Step 2: リンターチェック**

Run: `npm run lint`
Expected: エラーなし

**Step 3: TypeScriptチェック**

Run: `npm run typecheck`
Expected: エラーなし

**Step 4: 最終コミット**

```bash
git add -A
git commit -m "feat(seo): 求人SEO最適化完了 - メタデータ・コンテンツ・構造化データ強化"
```

---

## 検証項目

実装完了後、以下を検証:

1. **Google Search Console**でサイトマップ再送信
2. **リッチリザルトテスト** (https://search.google.com/test/rich-results) で構造化データ確認
3. **PageSpeed Insights** でパフォーマンス確認
4. 着手前のSearch Console数値を記録
5. 2週間後・4週間後に検索順位/CTR/表示回数を比較

---

## 期待される効果

| 改善項目 | 現状 | 改善後 |
|---------|------|--------|
| 採用トップページのタイトル | 「採用情報 \| フラクタル訪問看護」 | 「船橋市・八千代市・習志野市の訪問看護求人 \| フラクタル訪問看護」 |
| エリアページのコンテンツ | 約1,000語 | 求人検討に必要な情報を網羅 |
| 構造化データ | JobPosting（全体） | JobPosting（エリア別）+ FAQPage（エリア別） |
| 検索順位目標 | 26位 | 10位以内 |
