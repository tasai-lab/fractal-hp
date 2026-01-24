# ドキュメント更新・作成 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** プロジェクトのドキュメントを最新の実装に合わせて更新・作成する

**Architecture:** 既存ドキュメントの更新と、不足しているドキュメントの新規作成を行う

**Tech Stack:** Markdown

---

## 調査結果

### 既存ドキュメント
| ファイル | 状態 | 対応 |
|----------|------|------|
| README.md | 要更新 | FAQセクション追加、構造化データ更新 |
| docs/COMPONENTS.md | 要更新 | FAQ、CountUp、StructuredData更新 |
| docs/SEO-SETUP.md | 要更新 | FAQスキーマ、パンくずリスト追加 |
| docs/DEVELOPMENT.md | OK | 更新不要 |
| docs/DEPLOYMENT.md | OK | 更新不要 |
| docs/DOMAIN-MIGRATION.md | OK | 更新不要 |

### 新規作成が必要
| ファイル | 内容 |
|----------|------|
| docs/DATA-SPEC.md | データファイル仕様書 |

---

## Task 1: COMPONENTS.md の更新

**Files:**
- Modify: `docs/COMPONENTS.md`

**Step 1: FAQコンポーネントを追加**

コンポーネント一覧テーブルに以下を追加（27行目付近）:

```markdown
| FAQ | FAQ.tsx | セクション | よくある質問 |
| CountUp | CountUp.tsx | ユーティリティ | 数値カウントアップ |
```

**Step 2: FAQセクションを追加**

セクションコンポーネント部分（Company の後）に以下を追加:

```markdown
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
```

**Step 3: CountUpコンポーネントを追加**

ユーティリティコンポーネント部分に以下を追加:

```markdown
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
```

**Step 4: StructuredDataの更新**

StructuredData部分を以下に更新:

```markdown
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
```

**Step 5: BackgroundTrianglesにFAQパターンを追加**

パターン一覧に追加:

```markdown
- `faq` - よくある質問
```

**Step 6: 確認**

Run: `cat docs/COMPONENTS.md | head -50`
Expected: 更新された内容が表示される

**Step 7: コミット**

```bash
git add docs/COMPONENTS.md
git commit -m "docs: COMPONENTS.mdを最新の実装に更新

- FAQコンポーネントを追加
- CountUpコンポーネントを追加
- StructuredDataのエクスポート一覧を更新
- BackgroundTrianglesにfaqパターンを追加"
```

---

## Task 2: SEO-SETUP.md の更新

**Files:**
- Modify: `docs/SEO-SETUP.md`

**Step 1: 構造化データの確認セクションを更新**

4.3の構造化データの確認部分を以下に更新:

```markdown
### 4.3 構造化データの確認

1. [Google リッチリザルトテスト](https://search.google.com/test/rich-results) にアクセス
2. `https://fractal-hokan.com` を入力してテスト
3. 以下の構造化データが検出されることを確認:
   - LocalBusiness / MedicalBusiness
   - WebSite
   - FAQPage（よくある質問）

### 4.4 求人構造化データの確認

1. `https://fractal-hokan.com/recruit` でテスト
2. 以下が検出されることを確認:
   - JobPosting（2件）
   - FAQPage（求職者向けFAQ）
   - BreadcrumbList（パンくずリスト）

### 4.5 パンくずリストの確認

各ページでBreadcrumbListが検出されることを確認:
- `/recruit` - ホーム > 採用情報
- `/about-fractal` - ホーム > フラクタルを知る
- `/flyers` - ホーム > チラシ
```

**Step 2: 関連ファイルテーブルを更新**

関連ファイルに追加:

```markdown
| `src/lib/faq-data.ts` | FAQデータ |
| `src/app/about-fractal/layout.tsx` | 会社紹介ページメタデータ |
| `src/app/flyers/layout.tsx` | チラシページメタデータ |
```

**Step 3: 確認**

Run: `cat docs/SEO-SETUP.md | grep -A 20 "構造化データの確認"`
Expected: 更新された内容が表示される

**Step 4: コミット**

```bash
git add docs/SEO-SETUP.md
git commit -m "docs: SEO-SETUP.mdを最新の実装に更新

- FAQスキーマの確認手順を追加
- パンくずリストの確認手順を追加
- 関連ファイル一覧を更新"
```

---

## Task 3: DATA-SPEC.md の新規作成

**Files:**
- Create: `docs/DATA-SPEC.md`

**Step 1: データ仕様書を作成**

```markdown
# データ仕様書

フラクタル訪問看護 船橋 Webサイトのデータファイル仕様です。

---

## ファイル一覧

| ファイル | 説明 |
|----------|------|
| `src/lib/data.ts` | サイト基本データ |
| `src/lib/recruit-data.ts` | 採用情報データ |
| `src/lib/faq-data.ts` | FAQデータ |
| `src/lib/flyers-data.ts` | チラシデータ |

---

## data.ts - サイト基本データ

### officeInfo

事業所情報。

```typescript
interface OfficeInfo {
  name: string;              // 事業所名
  businessNumber: string;    // 事業所番号
  hours: string;             // 営業時間
  address: {
    postalCode: string;      // 郵便番号
    prefecture: string;      // 都道府県
    city: string;            // 市区町村
    street: string;          // 番地
    building: string;        // 建物名
  };
  phone: string;             // 電話番号
  fax: string;               // FAX番号
  email: string;             // メールアドレス
  googleMapsUrl: string;     // Google Maps埋め込みURL
}
```

### staffMembers

スタッフ情報の配列。

```typescript
interface StaffMember {
  name: string;           // 名前
  nameReading: string;    // 読み仮名
  role: string;           // 役職
  image: string;          // 画像パス
  birthplace: string;     // 出身地
  hobbies: string;        // 趣味
  introduction: string;   // 自己紹介
}
```

### features

フラクタルの特徴（8項目）。

```typescript
interface Feature {
  icon: string;           // アイコン（絵文字）
  title: string;          // タイトル
  description: string;    // 説明
}
```

### flowSteps

ご利用開始までの流れ（4ステップ）。

```typescript
interface FlowStep {
  step: number;           // ステップ番号
  title: string;          // タイトル
  description: string;    // 説明
  icon: string;           // アイコン
}
```

### serviceAreas

訪問エリア情報。

```typescript
interface ServiceAreas {
  priority: {
    cities: Array<{
      name: string;       // 市区町村名
      areas: string[];    // 対応エリア一覧
    }>;
  };
}
```

### companyInfo

会社情報。

```typescript
interface CompanyInfo {
  name: string;           // 会社名
  representative: string; // 代表者
  established: string;    // 設立日
  capital: string;        // 資本金
  business: string[];     // 事業内容
  address: string;        // 所在地
}
```

### philosophyItems

私たちのカタチ（4要素）。

```typescript
interface PhilosophyItem {
  title: string;          // タイトル
  subtitle: string;       // サブタイトル
  description: string;    // 説明
  backContent: string;    // カード裏面の内容
  color: string;          // 背景色
}
```

---

## recruit-data.ts - 採用情報データ

### signOnBonus

入社祝い金情報。

```typescript
interface SignOnBonus {
  total: number;          // 合計金額
  note: string;           // 注記（HP限定等）
  milestones: Array<{
    label: string;        // ラベル（入社時、6ヶ月等）
    amount: number;       // 金額
  }>;
}
```

### jobPositions

求人情報の配列。

```typescript
interface JobPosition {
  id: string;             // ID（nurse, therapist等）
  title: string;          // 職種名
  subtitle: string;       // サブタイトル
  hidden?: boolean;       // 非表示フラグ
  highlights: string[];   // ハイライト（タグ）
  description: string;    // 仕事内容説明
  features: Array<{
    title: string;
    description: string;
  }>;
  details: {
    requirements: string[];        // 応募要件
    salary: {
      type: string;                // 給与タイプ
      amount: string;              // 金額
      breakdown: Array<{
        label: string;
        value: string;
      }>;
      note?: string;
    };
    workHours: string;             // 勤務時間
    holidays: {
      annual: string;              // 年間休日
      monthly?: number;            // 月の公休
      notes: string[];
    };
    benefits: string[];            // 福利厚生
  };
  selectionProcess: Array<{
    step: string;
    description: string;
  }>;
}
```

### visitAreas

訪問エリア一覧（文字列配列）。

### jobDuties

看護師の業務内容一覧（文字列配列）。

### therapistDuties

セラピストの業務内容一覧（文字列配列）。

### onCallInfo

オンコール情報。

```typescript
interface OnCallInfo {
  frequency: string;      // 頻度
  note: string;           // 補足説明
}
```

### companyPhilosophy

フラクタルの考え方。

```typescript
interface CompanyPhilosophy {
  title: string;
  content: string;
}
```

### applicationMessage

応募メッセージ。

```typescript
interface ApplicationMessage {
  main: string;           // メインメッセージ
  visit: string;          // 見学案内
  timeline: string;       // 選考期間
}
```

---

## faq-data.ts - FAQデータ

### FAQItem

FAQ項目の型定義。

```typescript
interface FAQItem {
  question: string;       // 質問
  answer: string;         // 回答
}
```

### serviceFAQs

サービス利用者向けFAQ（トップページ用）。6項目。

| 質問 | 用途 |
|------|------|
| 訪問看護とは何ですか？ | サービス説明 |
| どのような方が訪問看護を利用できますか？ | 対象者説明 |
| 訪問看護の利用料金はいくらですか？ | 料金説明 |
| 訪問看護の利用開始までの流れを教えてください | 利用フロー |
| どのエリアに対応していますか？ | 対応エリア |
| 24時間対応していますか？ | 対応時間 |

### recruitFAQs

求職者向けFAQ（求人ページ用）。6項目。

| 質問 | 用途 |
|------|------|
| 訪問看護未経験でも応募できますか？ | 応募条件 |
| オンコールの頻度はどのくらいですか？ | 勤務条件 |
| 入社祝い金の条件を教えてください | 祝い金説明 |
| 訪問エリアはどこですか？ | 勤務地 |
| 年間休日は何日ですか？ | 休日説明 |
| どのような職種を募集していますか？ | 募集職種 |

---

## flyers-data.ts - チラシデータ

### Flyer

チラシの型定義。

```typescript
interface Flyer {
  id: string;             // ID
  title: string;          // タイトル
  date: string;           // 発行日
  type: string;           // タイプ（service, recruit等）
  frontImage: string;     // 表面画像パス
  backImage: string;      // 裏面画像パス
  orientation: string;    // 向き（portrait, landscape）
}
```

### flyers

チラシ一覧（配列）。

### flyerTypes

チラシタイプの定義。

```typescript
interface FlyerType {
  id: string;             // ID
  label: string;          // ラベル
}
```

---

## データ更新時の注意点

1. **型安全性**: TypeScriptの型定義に従ってデータを追加・更新する
2. **画像パス**: `/public/images/` 配下に画像を配置し、パスは `/images/` から始める
3. **文字数**: 説明文は適切な長さに収める（モバイル表示を考慮）
4. **SEO**: 地域名（船橋市、八千代市等）を自然に含める
```

**Step 2: 確認**

Run: `cat docs/DATA-SPEC.md | head -50`
Expected: 作成された内容が表示される

**Step 3: コミット**

```bash
git add docs/DATA-SPEC.md
git commit -m "docs: DATA-SPEC.md（データ仕様書）を新規作成

- data.ts の仕様を記載
- recruit-data.ts の仕様を記載
- faq-data.ts の仕様を記載
- flyers-data.ts の仕様を記載"
```

---

## Task 4: README.md の更新

**Files:**
- Modify: `README.md`

**Step 1: セクション一覧にFAQを追加**

セクション一覧（110行目付近）に追加:

```markdown
12. **FAQ** - よくある質問
```

（Companyの前に追加）

**Step 2: 構造化データにFAQを追加**

SEO対策セクション（132行目付近）を更新:

```markdown
## SEO対策

- メタデータ最適化（title, description, keywords）
- Open Graph / Twitter Card 対応
- 構造化データ（JSON-LD）
  - LocalBusiness / MedicalBusiness
  - JobPosting（求人情報）
  - FAQPage（よくある質問）
  - BreadcrumbList（パンくずリスト）
- サイトマップ自動生成
- robots.txt 自動生成
```

**Step 3: ドキュメントリンクにDATA-SPECを追加**

ドキュメントセクション（124行目付近）に追加:

```markdown
- [データ仕様](docs/DATA-SPEC.md)
```

**Step 4: 確認**

Run: `cat README.md | grep -A 5 "SEO対策"`
Expected: 更新された内容が表示される

**Step 5: コミット**

```bash
git add README.md
git commit -m "docs: README.mdを最新の実装に更新

- セクション一覧にFAQを追加
- 構造化データにFAQPage、BreadcrumbListを追加
- ドキュメントリンクにDATA-SPECを追加"
```

---

## Task 5: 最終確認とプッシュ

**Step 1: 全ドキュメントの確認**

```bash
ls -la docs/*.md
```

Expected:
- COMPONENTS.md
- DATA-SPEC.md
- DEPLOYMENT.md
- DEVELOPMENT.md
- DOMAIN-MIGRATION.md
- SEO-SETUP.md

**Step 2: プッシュ**

```bash
git push origin main
```

---

## 完了チェックリスト

- [ ] docs/COMPONENTS.md - FAQ、CountUp、StructuredData更新
- [ ] docs/SEO-SETUP.md - FAQスキーマ、パンくずリスト追加
- [ ] docs/DATA-SPEC.md - 新規作成
- [ ] README.md - FAQ追加、構造化データ更新
- [ ] 全コミット完了
- [ ] プッシュ完了
