# コンポーネント仕様書

フラクタル訪問看護 船橋 Webサイトのコンポーネント一覧と仕様です。

---

## コンポーネント一覧

| コンポーネント | ファイル | 種別 | 説明 |
|--------------|---------|------|------|
| Header | Header.tsx | レイアウト | グローバルヘッダー |
| Hero | Hero.tsx | セクション | メインビジュアル |
| About | About.tsx | セクション | フラクタルとは |
| Philosophy | Philosophy.tsx | セクション | 私たちのカタチ |
| Features | Features.tsx | セクション | 特徴一覧 |
| Office | Office.tsx | セクション | 事業所情報 |
| ServiceArea | ServiceArea.tsx | セクション | 訪問エリア |
| Flow | Flow.tsx | セクション | ご利用の流れ |
| Staff | Staff.tsx | セクション | スタッフ紹介 |
| Recruit | Recruit.tsx | セクション | リクルート |
| Contact | Contact.tsx | セクション | お問い合わせ |
| Company | Company.tsx | セクション | 会社情報 |
| FAQ | FAQ.tsx | セクション | よくある質問 |
| Footer | Footer.tsx | レイアウト | グローバルフッター |
| BackgroundTriangles | BackgroundTriangles.tsx | 装飾 | 背景三角形 |
| GoogleAnalytics | GoogleAnalytics.tsx | ユーティリティ | GA4トラッキング |
| CountUp | CountUp.tsx | ユーティリティ | 数値カウントアップ |
| StructuredData | StructuredData.tsx | SEO | 構造化データ |

---

## レイアウトコンポーネント

### Header

グローバルヘッダー。ロゴ、ナビゲーション、SNSリンクを含む。

**ファイル**: `src/components/Header.tsx`

**機能**:
- ロゴ表示
- ナビゲーションメニュー
- モバイルハンバーガーメニュー
- Instagramリンク
- スクロール時の背景変化

**Props**: なし

**使用箇所**: `src/app/page.tsx`

---

### Footer

グローバルフッター。事業所情報、ナビゲーション、コピーライトを含む。

**ファイル**: `src/components/Footer.tsx`

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

**機能**:
- 背景画像表示
- 縦書きキャッチコピー
- 後ろから浮き出るアニメーション

**アニメーション**: `animate-emerge-from-back`（globals.cssで定義）

---

### About

「フラクタルとは」セクション。訪問看護ステーションの概要を説明。

**ファイル**: `src/components/About.tsx`

**データソース**: `src/lib/data.ts` → `aboutData`

---

### Philosophy

「私たちのカタチ」セクション。4つの理念要素をカードで表示。

**ファイル**: `src/components/Philosophy.tsx`

**機能**:
- 3Dフリップカード
- ホバーで裏面表示
- モバイルではタップで切り替え

**データソース**: `src/lib/data.ts` → `philosophyItems`

---

### Features

「フラクタルの特徴」セクション。8つの特徴をグリッドで表示。

**ファイル**: `src/components/Features.tsx`

**データソース**: `src/lib/data.ts` → `features`

---

### Office

事業所情報セクション。住所、連絡先、Google Mapsを表示。

**ファイル**: `src/components/Office.tsx`

**機能**:
- 事業所基本情報
- Google Maps埋め込み
- 電話・メールリンク

**データソース**: `src/lib/data.ts` → `officeInfo`

---

### ServiceArea

訪問エリアセクション。対応地域を地図とリストで表示。

**ファイル**: `src/components/ServiceArea.tsx`

**データソース**: `src/lib/data.ts` → `serviceAreas`

---

### Flow

「ご利用開始までの流れ」セクション。4ステップのフローを表示。

**ファイル**: `src/components/Flow.tsx`

**機能**:
- ステップ番号（白抜き黒文字）
- 矢印による接続
- 各ステップの説明

**データソース**: `src/lib/data.ts` → `flowSteps`

---

### Staff

スタッフ紹介セクション。スタッフ情報をカードで表示。

**ファイル**: `src/components/Staff.tsx`

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

**種別**: クライアントコンポーネント (`"use client"`)

**機能**:
- お問い合わせフォーム
- フォームバリデーション
- API送信

**API**: `POST /api/contact`

---

### Company

会社情報セクション。会社概要を表形式で表示。

**ファイル**: `src/components/Company.tsx`

**データソース**: `src/lib/data.ts` → `companyInfo`

---

### FAQ

「よくある質問」セクション。アコーディオン形式でFAQを表示。

**ファイル**: `src/components/FAQ.tsx`

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

### GoogleAnalytics

Google Analytics 4のトラッキングコード。

**ファイル**: `src/components/GoogleAnalytics.tsx`

**種別**: クライアントコンポーネント (`"use client"`)

**環境変数**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

**使用箇所**: `src/app/layout.tsx`

---

### CountUp

数値のカウントアップアニメーション。

**ファイル**: `src/components/CountUp.tsx`

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
