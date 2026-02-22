# コンポーネント仕様書

フラクタル訪問看護 船橋 Webサイトのコンポーネント一覧と仕様です。

---

## コンポーネント一覧

| コンポーネント | ファイル | Stories | 種別 | 説明 |
|--------------|---------|---------|------|------|
| Header | Header.tsx | `src/components/Header.stories.tsx` | レイアウト | グローバルヘッダー |
| Hero | Hero.tsx | `src/components/Hero.stories.tsx` | セクション | メインビジュアル |
| About | About.tsx | `src/components/About.stories.tsx` | セクション | フラクタルとは |
| Philosophy | Philosophy.tsx | `src/components/Philosophy.stories.tsx` | セクション | 私たちのカタチ |
| Features | Features.tsx | `src/components/Features.stories.tsx` | セクション | 特徴一覧 |
| Office | Office.tsx | `src/components/Office.stories.tsx` | セクション | 事業所情報 |
| Flow | Flow.tsx | `src/components/Flow.stories.tsx` | セクション | ご利用の流れ |
| Staff | Staff.tsx | `src/components/Staff.stories.tsx` | セクション | スタッフ紹介 |
| Recruit | Recruit.tsx | `src/components/Recruit.stories.tsx` | セクション | リクルート |
| Contact | Contact.tsx | `src/components/Contact.stories.tsx` | セクション | お問い合わせ |
| Company | Company.tsx | `src/components/Company.stories.tsx` | セクション | 会社情報 |
| FAQ | FAQ.tsx | `src/components/FAQ.stories.tsx` | セクション | よくある質問 |
| Footer | Footer.tsx | `src/components/Footer.stories.tsx` | レイアウト | グローバルフッター |
| BackgroundTriangles | BackgroundTriangles.tsx | `src/components/BackgroundTriangles.stories.tsx` | 装飾 | 背景三角形 |
| FloatingRecruitBanner | FloatingRecruitBanner.tsx | `src/components/FloatingRecruitBanner.stories.tsx` | ユーティリティ | フローティング採用バナー |
| ScrollToTop | ScrollToTop.tsx | `src/components/ScrollToTop.stories.tsx` | ユーティリティ | ページトップへ戻るボタン |
| UpdatesPopup | UpdatesPopup.tsx | —（無効化中） | ユーティリティ | 更新通知ポップアップ |
| GoogleAnalytics | GoogleAnalytics.tsx | —（UIなし） | ユーティリティ | GA4トラッキング |
| CountUp | CountUp.tsx | `src/components/CountUp.stories.tsx` | ユーティリティ | 数値カウントアップ |
| StructuredData | StructuredData.tsx | —（UIなし） | SEO | 構造化データ |
| JobDetails | recruit/JobDetails.tsx | `src/components/recruit/JobDetails.stories.tsx` | 採用 | 職種詳細モーダル |
| ModelIncomeSection | recruit/ModelIncomeSection.tsx | `src/components/recruit/ModelIncomeSection.stories.tsx` | 採用 | モデル年収セクション |
| PopulationChart | charts/PopulationChart.tsx | `src/components/charts/PopulationChart.stories.tsx` | チャート | 人口推移折れ線グラフ |
| AgeDistributionChart | charts/AgeDistributionChart.tsx | `src/components/charts/AgeDistributionChart.stories.tsx` | チャート | 年齢分布円グラフ |
| ElderlyRateTrendChart | charts/ElderlyRateTrendChart.tsx | `src/components/charts/ElderlyRateTrendChart.stories.tsx` | チャート | 高齢化率推移エリアチャート |

---

## カスタムフック

| フック | ファイル | 説明 |
|-------|---------|------|
| useScrollAnimation | src/hooks/useScrollAnimation.ts | スクロール連動アニメーション |

---

## レイアウトコンポーネント

### Header

グローバルヘッダー。ロゴ、ナビゲーション、SNSリンクを含む。

**ファイル**: `src/components/Header.tsx`

**Stories**: `src/components/Header.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- ロゴ表示
- ナビゲーションメニュー（サービス案内・採用情報・会社情報・公式メディア）
- モバイルハンバーガーメニュー
- 背景バリエーション対応

**Props**:

| Prop | 型 | デフォルト | 説明 |
|------|---|----------|------|
| variant | "default" \| "paper" \| "editorial" | "default" | 背景スタイル |

**バリエーション**:
- `default` - 白背景 + シャドウ
- `paper` - ペーパー背景 + ボーダー（会社ページ向け）
- `editorial` - グラデーション背景 + ボーダー（採用ページ向け）

**使用例**:
```tsx
<Header />                       // デフォルト（白背景）
<Header variant="paper" />       // ペーパー背景
<Header variant="editorial" />   // グラデーション背景
```

**使用箇所**: `src/app/page.tsx`, `src/app/company/layout.tsx`

---

### Footer

グローバルフッター。事業所情報、ナビゲーション、コピーライトを含む。

**ファイル**: `src/components/Footer.tsx`

**Stories**: `src/components/Footer.stories.tsx`

**機能**:
- 事業所情報表示
- ナビゲーションリンク
- コピーライト

**Props**: なし

**使用箇所**: `src/app/page.tsx`

---

## セクションコンポーネント

### Hero

メインビジュアルセクション。「私たちがフラクタル」のキャッチコピーを表示。

**ファイル**: `src/components/Hero.tsx`

**Stories**: `src/components/Hero.stories.tsx`

**機能**:
- 背景画像表示
- 縦書きキャッチコピー
- 後ろから浮き出るアニメーション

**アニメーション**: `animate-emerge-from-back`（globals.cssで定義）

---

### About

「フラクタルとは」セクション。訪問看護ステーションの概要を説明。

**ファイル**: `src/components/About.tsx`

**Stories**: `src/components/About.stories.tsx`

**データソース**: `src/lib/data.ts` → `aboutData`

---

### Philosophy

「私たちのカタチ」セクション。4つの理念要素をカードで表示。

**ファイル**: `src/components/Philosophy.tsx`

**Stories**: `src/components/Philosophy.stories.tsx`

**機能**:
- 3Dフリップカード
- ホバーで裏面表示
- モバイルではタップで切り替え

**データソース**: `src/lib/data.ts` → `philosophyItems`

---

### Features

「フラクタルの特徴」セクション。8つの特徴をグリッドで表示。

**ファイル**: `src/components/Features.tsx`

**Stories**: `src/components/Features.stories.tsx`

**データソース**: `src/lib/data.ts` → `features`

---

### Office

事業所情報セクション。住所、連絡先、Google Mapsを表示。

**ファイル**: `src/components/Office.tsx`

**Stories**: `src/components/Office.stories.tsx`

**機能**:
- 事業所基本情報
- Google Maps埋め込み
- 電話・メールリンク

**データソース**: `src/lib/data.ts` → `officeInfo`

---

### Flow

「ご利用開始までの流れ」セクション。4ステップのフローを表示。

**ファイル**: `src/components/Flow.tsx`

**Stories**: `src/components/Flow.stories.tsx`

**機能**:
- ステップ番号（白抜き黒文字）
- 矢印による接続
- 各ステップの説明
- ケアマネージャー向けページへのリンク
- 医療機関向けページへのリンク

**データソース**: `src/lib/data.ts` → `flowSteps`

---

### Staff

スタッフ紹介セクション。スタッフ情報をカードで表示。

**ファイル**: `src/components/Staff.tsx`

**Stories**: `src/components/Staff.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- スタッフカード
- モバイルでタップするとポップアップ表示
- プロフィール画像、役職、自己紹介

**状態**:
- `selectedStaff`: 選択中のスタッフ（モーダル表示用）

**データソース**: `src/lib/data.ts` → `staffMembers`

---

### Recruit

リクルートセクション。採用情報のサマリーと祝い金バナーを表示。

**ファイル**: `src/components/Recruit.tsx`

**Stories**: `src/components/Recruit.stories.tsx`

**機能**:
- Q&Aセクション
- スタッフ集合写真
- 入社祝い金バナー（段階的サイズ・矢印付き）
- 採用情報ページへのリンク

**データソース**: `src/lib/recruit-data.ts` → `signOnBonus`

---

### Contact

お問い合わせセクション。フォームを表示。

**ファイル**: `src/components/Contact.tsx`

**Stories**: `src/components/Contact.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- お問い合わせフォーム
- フォームバリデーション
- API送信
- 埋め込みモード（他ページ内での使用）

**Props**:

| Prop | 型 | デフォルト | 説明 |
|------|---|----------|------|
| initialContactType | string | undefined | お問い合わせ種別の初期値（セレクトボックスの初期選択） |
| embedded | boolean | false | true の場合、セクションラッパーなしでコンテンツのみ返す |
| hideTitle | boolean | false | embedded 時にタイトルを非表示にする（embedded=true のときのみ有効） |

**使用例**:
```tsx
// セクションとして使用（デフォルト）
<Contact />

// 他ページに埋め込む場合
<Contact embedded />

// 特定のお問い合わせ種別を初期選択
<Contact initialContactType="採用について" />

// タイトルなしで埋め込む
<Contact embedded hideTitle />
```

**API**: `POST /api/contact`

---

### Company

会社情報セクション。会社概要を表形式で表示。

**ファイル**: `src/components/Company.tsx`

**Stories**: `src/components/Company.stories.tsx`

**データソース**: `src/lib/data.ts` → `companyInfo`

---

### FAQ

「よくある質問」セクション。アコーディオン形式でFAQを表示。

**ファイル**: `src/components/FAQ.tsx`

**Stories**: `src/components/FAQ.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- アコーディオン形式のQ&A
- クリックで開閉
- スムーズなアニメーション

**データソース**: `src/lib/faq-data.ts` → `serviceFAQs`

---

## 装飾コンポーネント

### BackgroundTriangles

セクション背景の装飾三角形。

**ファイル**: `src/components/BackgroundTriangles.tsx`

**Stories**: `src/components/BackgroundTriangles.stories.tsx`

**Props**:

| Prop | 型 | 説明 |
|------|---|------|
| pattern | string | 装飾パターン名 |

**パターン一覧**:
- `about` - フラクタルとは
- `features` - 特徴
- `office` - 事業所情報
- `serviceArea` - 訪問エリア
- `flow` - ご利用の流れ
- `staff` - スタッフ紹介
- `recruit` - リクルート
- `contact` - お問い合わせ
- `company` - 会社情報
- `faq` - よくある質問

**使用例**:
```tsx
<section className="relative overflow-hidden">
  <BackgroundTriangles pattern="about" />
  <div className="relative z-10">
    {/* コンテンツ */}
  </div>
</section>
```

---

## ユーティリティコンポーネント

### FloatingRecruitBanner

スクロール連動フローティング採用バナー。画面右端に固定表示される。

**ファイル**: `src/components/FloatingRecruitBanner.tsx`

**Stories**: `src/components/FloatingRecruitBanner.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- `philosophy`セクション（id="philosophy"）が画面に入ったタイミングで表示
- スクロールイベントで可視性を制御
- `/recruit` ページへのリンク
- `position: fixed; right: 0; top: 50%` に配置
- ホバー時に拡大（`hover:scale-105`）

**Props**: なし

**表示条件**: `#philosophy` セクションの top が `window.innerHeight * 0.8` 未満になったとき

**使用箇所**: `src/app/page.tsx`

---

### ScrollToTop

ページトップへ戻るボタン。一定量スクロール後に右下に表示される。

**ファイル**: `src/components/ScrollToTop.tsx`

**Stories**: `src/components/ScrollToTop.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- 300px以上スクロール時に表示
- クリックでスムーズスクロールしてページトップへ戻る
- モバイル時は下部に余白を確保（bottom-[68px]）

**Props**: なし

**使用箇所**: `src/app/layout.tsx`

---

### UpdatesPopup

サイト更新通知ポップアップ。初回訪問時または新しい更新がある場合に表示。

**ファイル**: `src/components/UpdatesPopup.tsx`

**Stories**: —（無効化中）

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- `localStorage` でユーザーが最後に確認した更新日を記録
- 新しい更新がある場合のみモーダルを表示
- 最新の更新日時と更新内容リストを表示
- `/updates` ページへのリンク
- 「確認しました」ボタンで閉じ、以後同一更新では表示しない

**Props**: なし

**ストレージキー**: `fractal-last-seen-update`

**データソース**: `src/lib/updates-data.ts` → `updates`, `typeConfig`, `getLatestUpdateDate`

**使用箇所**: `src/app/page.tsx`（無効化中）

---

### GoogleAnalytics

Google Analytics 4のトラッキングコード。

**ファイル**: `src/components/GoogleAnalytics.tsx`

**Stories**: —（UIなし）

**種別**: クライアントコンポーネント (`"use client"`)

**環境変数**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

**使用箇所**: `src/app/layout.tsx`

---

### CountUp

数値のカウントアップアニメーション。

**ファイル**: `src/components/CountUp.tsx`

**Stories**: `src/components/CountUp.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**Props**:

| Prop | 型 | デフォルト | 説明 |
|------|---|----------|------|
| end | number | 必須 | 最終値 |
| duration | number | 2000 | アニメーション時間（ms） |
| prefix | string | "" | 接頭辞 |
| suffix | string | "" | 接尾辞 |

**使用例**:
```tsx
<CountUp end={30} suffix="万円" />
```

---

### StructuredData

SEO用の構造化データ（JSON-LD）。

**ファイル**: `src/components/StructuredData.tsx`

**Stories**: —（UIなし）

**エクスポート**:
- `default` - メイン構造化データ（LocalBusiness, WebSite, FAQ）
- `JobPostingStructuredData` - 求人構造化データ（JobPosting, FAQ, Breadcrumb）
- `AboutFractalStructuredData` - 会社紹介ページ用（Breadcrumb）
- `FlyersStructuredData` - チラシページ用（Breadcrumb）
- `BreadcrumbStructuredData` - パンくずリスト汎用コンポーネント
- `generateBreadcrumbData` - パンくずリスト生成関数
- `generateFAQData` - FAQスキーマ生成関数
- `generateJobPostingData` - 求人データ生成関数

**使用箇所**:
- `src/app/layout.tsx` - メイン構造化データ
- `src/app/recruit/layout.tsx` - 求人構造化データ
- `src/app/about-fractal/layout.tsx` - 会社紹介構造化データ
- `src/app/flyers/layout.tsx` - チラシ構造化データ

---

## 採用コンポーネント

### JobDetails

職種詳細モーダル。

**ファイル**: `src/components/recruit/JobDetails.tsx`

**Stories**: `src/components/recruit/JobDetails.stories.tsx`

**使用箇所**: `src/app/recruit/page.tsx`

---

### ModelIncomeSection

モデル年収セクション。職種別のモデル年収をアコーディオン形式で表示。

**ファイル**: `src/components/recruit/ModelIncomeSection.tsx`

**Stories**: `src/components/recruit/ModelIncomeSection.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- 看護師・療法士それぞれのモデル年収を表示
- 年収レンジ（最小〜最大）を自動計算して表示
- カードクリックで月収内訳を展開/折りたたみ（1件のみ開く設計）

**Props**:

| Prop | 型 | デフォルト | 説明 |
|------|---|----------|------|
| isNurse | boolean | 必須 | true のとき看護師データ、false のとき療法士データを表示 |

**使用例**:
```tsx
// 看護師のモデル年収
<ModelIncomeSection isNurse={true} />

// 療法士のモデル年収
<ModelIncomeSection isNurse={false} />
```

**データソース**: `src/lib/recruit-data.ts` → `nurseModelIncome`, `therapistModelIncome`

**使用箇所**: `src/app/recruit/page.tsx`

---

## チャートコンポーネント

チャートは `recharts` ライブラリを使用。デフォルトカラーはブランドカラーに合わせた設定。

### PopulationChart

人口推移折れ線グラフ。総人口と高齢者人口の推移を表示。

**ファイル**: `src/components/charts/PopulationChart.tsx`

**Stories**: `src/components/charts/PopulationChart.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- 総人口・高齢者人口の折れ線グラフ（recharts LineChart）
- Y軸は万単位で表示
- ツールチップで詳細表示

**Props**:

| Prop | 型 | デフォルト | 説明 |
|------|---|----------|------|
| data | PopulationData[] | 必須 | 人口データの配列 |
| areaName | string | 必須 | エリア名（現在グラフ内では未表示、将来のAPI用） |
| primaryColor | string | "#0D5643" | 総人口ラインの色 |
| secondaryColor | string | "#fb923c" | 高齢者人口ラインの色 |

**型定義**:
```typescript
type PopulationData = {
  year: number;
  total: number;
  elderly: number;
  elderlyRate: number;
};
```

**使用例**:
```tsx
<PopulationChart
  data={[{ year: 2020, total: 620000, elderly: 150000, elderlyRate: 24.2 }]}
  areaName="船橋市"
/>
```

**使用箇所**: `src/app/areas/[slug]/page.tsx`, `src/app/recruit/areas/[slug]/AreaClient.tsx`

---

### AgeDistributionChart

年齢分布円グラフ（ドーナツグラフ）。年少・生産年齢・高齢者の割合を表示。

**ファイル**: `src/components/charts/AgeDistributionChart.tsx`

**Stories**: `src/components/charts/AgeDistributionChart.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- 年齢3区分の割合を円グラフ（recharts PieChart）で表示
- 各セグメントにパーセント表示
- ブランドカラー（ダークグリーン、ライトグリーン、イエロー）をデフォルト使用

**Props**:

| Prop | 型 | デフォルト | 説明 |
|------|---|----------|------|
| data | AgeDistributionData | 必須 | 年齢分布データ |
| primaryColor | string | "#0D5643" | 高齢者人口の色 |
| secondaryColor | string | "#7FC5A0" | 生産年齢人口の色 |
| accentColor | string | "#F4E951" | 年少人口の色 |

**型定義**:
```typescript
type AgeDistributionData = {
  young: number;    // 年少人口（0-14歳）の割合（%）
  working: number;  // 生産年齢人口（15-64歳）の割合（%）
  elderly: number;  // 高齢者人口（65歳以上）の割合（%）
};
```

**使用例**:
```tsx
<AgeDistributionChart data={{ young: 11.5, working: 63.0, elderly: 25.5 }} />
```

**使用箇所**: `src/app/areas/[slug]/page.tsx`, `src/app/recruit/areas/[slug]/AreaClient.tsx`

---

### ElderlyRateTrendChart

高齢化率推移エリアチャート。高齢化率の時系列変化と全国平均の基準線を表示。

**ファイル**: `src/components/charts/ElderlyRateTrendChart.tsx`

**Stories**: `src/components/charts/ElderlyRateTrendChart.stories.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- 高齢化率の推移をエリアチャート（recharts AreaChart）で表示
- 全国平均（29.3%）を破線で表示
- Y軸は20%〜40%の範囲で固定
- グラデーション塗りつぶし

**Props**:

| Prop | 型 | デフォルト | 説明 |
|------|---|----------|------|
| data | ElderlyRateTrendData[] | 必須 | 高齢化率データの配列 |
| primaryColor | string | "#0D5643" | エリアカラー |
| gradientId | string | "colorElderlyRate" | SVGグラデーションID（複数使用時は必ず異なる値を指定） |

**型定義**:
```typescript
type ElderlyRateTrendData = {
  year: number;
  elderlyRate: number;  // 高齢化率（%）
};
```

**使用例**:
```tsx
<ElderlyRateTrendChart
  data={[{ year: 2015, elderlyRate: 22.5 }, { year: 2020, elderlyRate: 25.1 }]}
  primaryColor="#0D5643"
  gradientId="funabashi-elderly"
/>
```

**注意**: 同一ページで複数インスタンスを使用する場合、`gradientId` を一意な値に変更すること（SVG ID重複によるグラデーション表示崩れを防ぐため）。

**使用箇所**: `src/app/areas/[slug]/page.tsx`, `src/app/recruit/areas/[slug]/AreaClient.tsx`

---

## カスタムフック

### useScrollAnimation

IntersectionObserver を使ったスクロール連動アニメーションフック。

**ファイル**: `src/hooks/useScrollAnimation.ts`

**機能**:
- 要素が画面に入ったときに `isVisible` を `true` に切り替える
- 一度表示されたら `isVisible` は `false` に戻らない（ワンショット型）

**引数**:

| 引数 | 型 | デフォルト | 説明 |
|-----|---|----------|------|
| threshold | number | 0.1 | 要素の何%が見えたらトリガーするか（0.0〜1.0） |

**返り値**:

| 返り値 | 型 | 説明 |
|-------|---|------|
| ref | RefObject\<HTMLElement\> | アニメーション対象の要素に設定するref |
| isVisible | boolean | 要素が画面内に入っているかどうか |

**使用例**:
```tsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function MySection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      ref={ref}
      className={`transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      コンテンツ
    </section>
  );
}
```

**使用箇所**: `src/app/recruit/page.tsx`, `src/app/recruit/day-flow/page.tsx`, `src/app/recruit/areas/[slug]/AreaClient.tsx`

---

## スタイルクラス

### セクション共通クラス（globals.css）

```css
/* セクションラッパー */
.section-wrapper {
  padding: 3rem 0; /* md: 5rem */
}

/* セクション内部 */
.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column; /* md: row */
}

/* セクションタイトル */
.section-title {
  writing-mode: vertical-rl; /* md */
  letter-spacing: 0.3em;
}

/* セクションカード */
.section-card {
  background: var(--color-accent-yellow);
  border-radius: 1rem; /* md: 2rem */
  padding: 1.5rem; /* md: 3rem */
}
```

### カードバリエーション

```css
.section-card-blue   /* 青系背景 */
.section-card-pink   /* ピンク系背景 */
.section-card-mint   /* ミント系背景 */
.section-card-about  /* フラクタルとは用 */
```

### アニメーション

```css
.animate-float           /* 浮遊アニメーション */
.animate-fade-in-up      /* フェードインアップ */
.animate-emerge-from-back /* 後ろから浮き出る */
.hover-lift              /* ホバーで浮き上がる */
.hover-scale             /* ホバーで拡大 */
```

### セクション実装パターン（標準テンプレート）

新規セクションを実装する際は、以下のパターンに従うこと:

```tsx
<section id="section-id" className="section-wrapper bg-white relative overflow-hidden">
  <BackgroundTriangles pattern="[section-name]" />
  <div className="section-inner relative z-10">
    <div className="section-title-area">
      <h2 className="section-title">セクションタイトル</h2>
      <div className="section-title-line" />
    </div>
    <div className="section-content">
      {/* コンテンツ */}
    </div>
  </div>
</section>
```

---

## データ構造

### スタッフデータ

```typescript
interface StaffMember {
  name: string;
  nameReading: string;
  role: string;
  image: string;
  birthplace: string;
  hobbies: string;
  introduction: string;
}
```

### 祝い金データ

```typescript
interface SignOnBonus {
  total: number;
  note: string;
  milestones: Array<{
    label: string;
    amount: number;
  }>;
}
```

### 求人データ

```typescript
interface JobPosition {
  id: string;
  title: string;
  subtitle: string;
  details: {
    requirements: string[];
    salary: string;
    benefits: string[];
    selectionProcess: Array<{
      step: string;
      description: string;
    }>;
  };
}
```

### モデル年収データ

```typescript
interface ModelIncome {
  label: string;    // 役職・経験年数等のラベル
  annual: string;   // 年収（例: "400万円"）
  monthly: string;  // 月収の説明テキスト
  breakdown: Array<{
    label: string;  // 内訳項目名（例: "基本給"）
    value: string;  // 内訳金額（例: "25万円"）
  }>;
}
```
