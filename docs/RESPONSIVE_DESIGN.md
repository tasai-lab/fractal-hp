# レスポンシブデザイン設計書

## 概要

フラクタル訪問看護Webサイトのレスポンシブデザイン最適化計画。

**優先順位**: モバイル → デスクトップ → タブレット（モバイルファースト + 段階的拡張）

## 対象ページ一覧

| ページ | パス | 対象コンポーネント |
|--------|------|-------------------|
| トップページ | / | Hero, About, Features, Office, Flow, Staff, Recruit, Contact, FAQ, Company |
| 採用ページ | /recruit | JobDetails, ModelIncomeSection |
| フラクタルを知る | /about-fractal | - |
| チラシ | /flyers | - |
| エリアページ | /areas/* | - |

## ブレークポイント定義

Tailwind CSS 標準に準拠：

| 名前 | サイズ | 対象デバイス | 用途 |
|------|--------|-------------|------|
| デフォルト | < 640px | スマートフォン | モバイルファースト基準 |
| sm | >= 640px | 大型スマホ/小型タブレット | 2列グリッド開始 |
| md | >= 768px | タブレット | 中間レイアウト |
| lg | >= 1024px | デスクトップ | フルレイアウト |
| xl | >= 1280px | 大画面 | 余白拡張 |

**タブレット定義**: sm (640px) 〜 lg未満 (1024px未満)

## 設計原則

### 1. Fluid Design（既存CSS変数を活用）
既存定義: `src/app/globals.css:41-56`
```css
/* 既存のCSS変数（新規作成不要） */
--spacing-fluid-sm: clamp(0.75rem, 1.5vw, 1rem);   /* :42 */
--spacing-fluid-md: clamp(1rem, 2vw, 1.5rem);       /* :43 */
--spacing-fluid-lg: clamp(1.5rem, 3vw, 2rem);       /* :44 */
--font-size-fluid-base: clamp(1rem, 2vw, 1.125rem); /* :51 */
--font-size-fluid-lg: clamp(1.125rem, 2.5vw, 1.5rem); /* :52 */
--font-size-fluid-4xl: clamp(2.25rem, 5vw, 3.75rem); /* :56 */
```

### 2. グリッドの段階的変化
```
デフォルト: 1列
sm (640px): 2列
lg (1024px): 3-4列
```

### 3. ナビゲーション（既存実装を維持）
既存定義: `src/components/Header.tsx:63, :148`
- **lg未満**: モバイル下部メニュー + ハンバーガー
- **lg以上**: デスクトップナビゲーション

## コンポーネント別設計

### Header（既存実装を維持、変更なし）
参照: `src/components/Header.tsx:43, :51, :63, :148`

| 要素 | Mobile (<lg) | Desktop (>=lg) | 現状 |
|------|--------------|----------------|------|
| ヘッダー高さ | h-14 (56px) | h-20 (80px) | 実装済 |
| ロゴサイズ | w-11 h-11 | w-14 h-14 | 実装済 |
| ナビゲーション | 下部固定メニュー | インラインナビ | 実装済 |

### Hero（タブレット対応を追加）
参照: `src/components/Hero.tsx:7`

| 要素 | Mobile | Tablet (sm-lg) | Desktop | 変更内容 |
|------|--------|----------------|---------|----------|
| 最小高さ | 60vh | 70vh | 80vh | sm:min-h-[70vh] 追加 |
| タイトル | fluid-4xl | fluid-4xl | fluid-4xl | 変更なし（既存CSS変数使用） |

### Staff（グリッド段階化）
参照: `src/components/Staff.tsx:67`

| 要素 | Mobile | Tablet (sm-lg) | Desktop | 変更内容 |
|------|--------|----------------|---------|----------|
| グリッド | 2列 | 2列 | 3列 | lg:grid-cols-3 追加 |

**スコープ外**: カード内容の省略表示や操作モード変更は今回の対象外

### Features（タブレット対応の確認）
参照: `src/components/Features.tsx:264`

| 要素 | Mobile | Tablet (sm-md) | Desktop | 現状 |
|------|--------|----------------|---------|------|
| グリッド | 1列 | 2列 | 2列 | md:grid-cols-2 実装済 |
| カードパディング | p-4 | p-5 | p-6 | sm:p-5 追加 |

### Recruit（祝い金バナーの調整）
参照: `src/components/Recruit.tsx:87-112`

| 要素 | Mobile | Tablet | Desktop | 変更内容 |
|------|--------|--------|---------|----------|
| 祝い金バナー | 縦並び | 横並び（小） | 横並び（大） | sm:flex-row 追加 |
| Q&Aパディング | p-4 | p-6 | p-8-12 | sm:p-6 lg:p-8 追加 |

### Footer（グリッド段階化）
参照: `src/components/Footer.tsx:34`

| 要素 | Mobile | Tablet (sm-lg) | Desktop | 変更内容 |
|------|--------|----------------|---------|----------|
| グリッド | 1列 | 2列 | 3列 | sm:grid-cols-2 追加 |
| 余白（下部メニュー用） | h-16 | h-16 | なし | 変更なし |

## 共通クラスの更新

### section-wrapper (globals.css:122-132)
**変更**: sm ブレークポイントを追加

```css
/* 現状: 3rem → md:5rem */
/* 変更後: 2rem → sm:3rem → md:4rem → lg:5rem */
.section-wrapper {
  padding: 2rem 0;        /* モバイル（現状3remから変更） */
}
@media (min-width: 640px) {
  .section-wrapper {
    padding: 3rem 0;      /* sm（新規追加） */
  }
}
@media (min-width: 768px) {
  .section-wrapper {
    padding: 4rem 0;      /* md（現状5remから変更） */
  }
}
@media (min-width: 1024px) {
  .section-wrapper {
    padding: 5rem 0;      /* lg（新規追加） */
  }
}
```

### section-inner (globals.css:134-149)
**変更**: sm ブレークポイントを追加

```css
/* 現状: 1rem → md:1.5rem, gap 1.5rem → md:3rem */
/* 変更後: 1rem → sm:1.25rem → md:1.5rem, gap 1rem → sm:1.5rem → md:2rem → lg:3rem */
.section-inner {
  padding: 0 1rem;        /* モバイル */
  gap: 1rem;              /* 変更: 1.5rem → 1rem */
}
@media (min-width: 640px) {
  .section-inner {
    padding: 0 1.25rem;   /* sm（新規追加） */
    gap: 1.5rem;
  }
}
@media (min-width: 768px) {
  .section-inner {
    padding: 0 1.5rem;    /* md */
    flex-direction: row;
    gap: 2rem;            /* 変更: 3rem → 2rem */
  }
}
@media (min-width: 1024px) {
  .section-inner {
    gap: 3rem;            /* lg（新規追加） */
  }
}
```

## 実装優先順位

### Phase 1: 基盤（globals.css）
1. section-wrapper の段階的padding `globals.css:122-132`
2. section-inner の段階的gap `globals.css:134-149`
3. section-card の段階的padding `globals.css:235-246`

### Phase 2: 主要コンポーネント
1. Hero（タブレット対応） `Hero.tsx:7`
2. Staff（グリッド段階化） `Staff.tsx:67`
3. Features（padding調整） `Features.tsx:268`

### Phase 3: その他
1. Recruit（祝い金バナー） `Recruit.tsx:87`
2. Footer（グリッド段階化） `Footer.tsx:34`
3. About, Flow, Contact, FAQ, Company（確認のみ）

## テスト観点

### デバイス幅
- 375px (iPhone SE)
- 414px (iPhone 12/13)
- 640px (sm境界)
- 768px (md境界/iPad縦)
- 1024px (lg境界/iPad横)
- 1280px (xl境界)
- 1440px (大画面)

### 確認項目（ページ別）

| ページ | 横スクロール | タブレットレイアウト | フォント | ナビ |
|--------|-------------|---------------------|---------|------|
| / (トップ) | [ ] | [ ] | [ ] | [ ] |
| /recruit | [ ] | [ ] | [ ] | [ ] |
| /about-fractal | [ ] | [ ] | [ ] | [ ] |
| /flyers | [ ] | [ ] | [ ] | [ ] |
| /areas/funabashi | [ ] | [ ] | [ ] | [ ] |

### PSI検証計画

| ページ | 目標スコア | 測定ツール |
|--------|-----------|-----------|
| / | 85+ | PageSpeed Insights (Mobile) |
| /recruit | 85+ | PageSpeed Insights (Mobile) |

**検証手順**:
1. 実装完了後、各ページをPSIでモバイル測定
2. スコア85未満の場合、LCPやCLSを分析して修正
3. 再測定で85以上を確認

## 受け入れ条件

1. [ ] 全ページで横スクロールが発生しない
2. [ ] タブレット（sm:640px 〜 lg:1024px未満）で適切なレイアウト
3. [ ] フォントサイズが各デバイスで読みやすい
4. [ ] ナビゲーションが各デバイスで操作しやすい
5. [ ] PageSpeed Insightsのモバイルスコア85以上維持

## Codexレビュー指摘対応

| 指摘 | 対応 |
|------|------|
| path:line参照なし | 各変更項目にファイル:行番号を追加 |
| 既存実装済み項目 | 「変更なし」「実装済」を明記 |
| ブレークポイント差異 | 既存mdに段階的にsm追加という方針を明確化 |
| 重複実装リスク | 既存CSS変数を活用する方針を明記 |
| PSI検証計画なし | PSI検証計画セクションを追加 |
| 全ページ網羅確認不足 | 対象ページ一覧とページ別確認項目を追加 |
| タブレット定義曖昧 | 明確な定義（sm〜lg未満）を追加 |
| 優先順位未反映 | 概要に優先順位を明記 |
| スコープクリープ | Staff操作モード変更を「スコープ外」と明記 |
