# 地域情報ページ設計書

## 概要

既存の `/areas/[slug]` ページを「訪問看護サービス説明」から「地域情報ページ」に変更し、SEOランキング向上を目指す。

## 目標

- **SEO**: 「船橋 訪問看護」で22位→トップ10
- **他地域**: 各地域でもトップ10を目指す
- **コンテンツ**: 地域の詳細情報を提供し、滞在時間を向上

## 対象地域（5地域）

1. 船橋市 (funabashi)
2. 八千代市 (yachiyo)
3. 習志野市 (narashino)
4. 千葉市花見川区 (chiba-hanamigawa)
5. 千葉市稲毛区 (chiba-inage)

---

## データ構造設計

### `src/lib/regional-data.ts`

```typescript
export type RegionalData = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;

  // 人口データ
  population: {
    total: string;
    elderly: string;
    elderlyRate: string;
    source: string;
    year: string;
  };

  // 人口推移予測（グラフ用）
  populationProjection: Array<{
    year: number;
    total: number;
    elderly: number;
  }>;

  // 特産物・名産品
  specialties: Array<{
    name: string;
    description: string;
    category: 'agriculture' | 'food' | 'craft';
  }>;

  // 交通・道路状況
  traffic: {
    mainRoads: string[];
    congestion: string;
    accessInfo: string;
  };

  // 地域の特徴
  characteristics: string[];

  // 医療・介護体制
  healthcare: {
    hospitals: string;
    visitingNursingStations: string;
    supportCenters: string;
  };

  // 訪問可能エリア（既存データ継承）
  visitableAreas: string[];

  // FAQ
  faqs: Array<{ question: string; answer: string }>;
};
```

---

## ページ構成設計

### セクション構成

1. **ヒーローセクション**
   - 地域名、キャッチコピー
   - 電話番号CTA

2. **地域概要**
   - 人口・高齢化率のカード
   - 地域の特徴リスト

3. **人口推移グラフ** (NEW)
   - 2020年〜2040年の推移
   - 総人口と高齢者人口の推移
   - recharts を使用

4. **特産物・名産品** (NEW)
   - カテゴリ別表示（農産物、食品、工芸品）
   - アイコン付きカード

5. **交通・道路状況** (NEW)
   - 主要道路リスト
   - 混雑情報
   - 通勤・訪問の参考情報

6. **医療・介護体制**
   - 医療機関数
   - 訪問看護ステーション情報
   - 地域包括支援センター

7. **訪問可能エリア**（既存継承）
   - エリアタグ一覧

8. **よくある質問**（既存継承）

9. **お問い合わせ**（既存継承）

10. **他の地域へのリンク**

---

## SEO対策

### メタデータ

```typescript
// 各地域ごとに最適化
title: `${name}の地域情報と訪問看護｜フラクタル訪問看護 船橋`
description: `${name}の人口・高齢化率、特産物、交通状況、医療体制を詳しく紹介。${name}で訪問看護をお探しならフラクタル訪問看護へ。24時間365日対応。047-770-1228`
```

### 構造化データ

- LocalBusiness
- FAQPage
- BreadcrumbList

### 内部リンク

1. **フッター「対応エリア」** → 地域ページ
2. **求人ページ「訪問エリア」** → 地域ページへリンク追加
3. **各地域ページ** → 他地域への相互リンク

---

## 実装計画

### Phase 1: データ層

| タスク | ファイル | 優先度 |
|--------|---------|--------|
| 地域データ型定義 | `src/lib/regional-data.ts` | 高 |
| 5地域のデータ作成 | `src/lib/regional-data.ts` | 高 |

### Phase 2: グラフコンポーネント

| タスク | ファイル | 優先度 |
|--------|---------|--------|
| recharts インストール | package.json | 高 |
| PopulationChart 作成 | `src/components/PopulationChart.tsx` | 高 |

### Phase 3: ページコンポーネント

| タスク | ファイル | 優先度 |
|--------|---------|--------|
| 地域ページ改修 | `src/app/areas/[slug]/page.tsx` | 高 |
| レイアウト更新 | `src/app/areas/[slug]/layout.tsx` | 中 |

### Phase 4: リンク更新

| タスク | ファイル | 優先度 |
|--------|---------|--------|
| フッターのリンクテキスト更新 | `src/components/Footer.tsx` | 中 |
| 求人ページにリンク追加 | `src/app/recruit/page.tsx` | 中 |

### Phase 5: 構造化データ

| タスク | ファイル | 優先度 |
|--------|---------|--------|
| 地域ページ用構造化データ | `src/components/StructuredData.tsx` | 中 |

---

## 依存関係

```
npm install recharts
```

---

## テスト計画

1. 各地域ページが正常に表示されること
2. グラフが正しくレンダリングされること
3. レスポンシブデザインが機能すること
4. 構造化データが正しく出力されること
5. 内部リンクが正しく機能すること

---

## 見積もり

| フェーズ | 工数 |
|---------|------|
| データ層 | 1時間 |
| グラフコンポーネント | 1時間 |
| ページコンポーネント | 2時間 |
| リンク更新 | 30分 |
| 構造化データ | 30分 |
| テスト・調整 | 1時間 |
| **合計** | **6時間** |

---

## 収集済みデータ

### 船橋市
- 人口: 65万人超（2025年）※2020年国勢調査642,907人
- 高齢化率: 24.2%（2025年）
- 特産物: 梨（地域団体商標）、人参、枝豆
- 交通: 国道14号、296号、357号（ららぽーと渋滞あり）
- 医療: 地域包括支援センター14箇所

### 八千代市
- 人口: 205,748人（2024年）
- 高齢化率: 24.8%
- 特産物: 梨（100年の歴史）、人参、源右衛門鍋
- 交通: 国道16号、296号（渋滞多発）
- 特徴: 2035年頃まで人口増加予測

### 習志野市
- 人口: 175,184人（2024年）
- 高齢化率: 23.7%
- 特産物: 人参「彩誉」、習志野ソーセージ
- 交通: 国道14号、357号
- 特徴: 人口密度県内第3位、医療費優遇

### 千葉市花見川区
- 人口: 177,254人（2024年1月1日）
- 特産物: 落花生、ホウレンソウ、ダイコン（千葉県全体）
- 交通: 京葉道路（花輪IC、幕張IC周辺で渋滞多発）

### 千葉市稲毛区
- 2040年高齢化率: 千葉市全体で33.2%予測
- 特産物: 落花生、ホウレンソウ、ダイコン（千葉県全体）
- 交通: 国道16号（スポーツセンター周辺で渋滞多発）
