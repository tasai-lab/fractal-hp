# サイトマップ再構成 設計仕様書

作成日: 2026-03-04
ワークフロー: wf-20260304-006
選択プラン: プランC（完全再設計型・マルチテナント）

---

## 1. 設計方針

### コンセプト
- **ブランドトップ**: 株式会社フラクタル全体の顔。共通情報のみ
- **ステーション配下**: 店舗固有情報は全て `/stations/[slug]/` テナントに集約
- **3階層構造**: ブランドトップ → カテゴリトップ → ステーション別

### 共通 vs 店舗固有の境界

| 共通（ブランドレベル） | 店舗固有（ステーションレベル） |
|---------------------|--------------------------|
| サービス内容（精神科・看取り・24h） | 事業所情報（住所・電話・MAP） |
| 料金体系（介護保険・医療保険） | スタッフ紹介 |
| 理念・フラクタルの意味 | 対応エリア・実績 |
| 利用の流れ（一般プロセス） | 各種書類（BCP等） |
| ケアマネ向け・医療機関向け情報 | チラシ |
| 会社情報・代表紹介 | 採用条件・給与 |
| FAQ（一般的な質問） | お問い合わせ先 |

---

## 2. URL構造（全ページ）

```
/ (ブランドトップ: 7セクション)

## ブランド共通 - サービス
/services/                              サービス一覧トップ
/services/psychiatric-nursing/          精神科訪問看護
/services/end-of-life-care/             看取り・終末期ケア
/services/24h-support/                  24時間対応体制
/services/for-care-managers/            ケアマネジャー様へ（旧 /for-care-managers/）
/services/for-medical-institutions/     医療機関様へ（旧 /for-medical-institutions/）
/pricing/                               ご利用料金

## ブランド共通 - 会社情報
/fractal/                               フラクタルの意味
/company/                               会社情報・理念・DAPAE
/company/ceo/                           代表紹介

## ステーション（店舗固有）
/stations/                              ステーション一覧
/stations/funabashi/                    船橋ステーション トップ
/stations/funabashi/areas/              船橋 対応エリア一覧（旧 /areas/）
/stations/funabashi/areas/[areaSlug]/   船橋 エリア詳細（旧 /areas/[slug]）
/stations/funabashi/documents/          船橋 各種書類（旧 /documents/）
/stations/funabashi/flyers/             船橋 チラシ（旧 /flyers/）
/stations/[slug]/                       2店舗目以降（同構造）
/stations/[slug]/areas/
/stations/[slug]/areas/[areaSlug]/
/stations/[slug]/documents/
/stations/[slug]/flyers/

## 採用（2層構造）
/recruit/                               全社採用トップ（共通制度・理念）
/recruit/day-flow/                      1日の流れ
/recruit/stations/funabashi/            船橋ステーション採用ページ
/recruit/stations/[slug]/               2店舗目以降
（旧 /recruit/areas/[slug] は廃止 → /stations/[slug]/areas/ に統合）

## その他
/updates/                               更新情報
/robots.txt
/sitemap.xml
```

---

## 3. ページ移行マッピング

### 301リダイレクト一覧

| 旧URL | 新URL | 備考 |
|-------|------|------|
| /for-care-managers/ | /services/for-care-managers/ | B2B統合 |
| /for-medical-institutions/ | /services/for-medical-institutions/ | B2B統合 |
| /areas/ | /stations/funabashi/areas/ | テナント配下に移動 |
| /areas/funabashi | /stations/funabashi/areas/funabashi/ | テナント配下に移動 |
| /areas/yachiyo | /stations/funabashi/areas/yachiyo/ | テナント配下に移動 |
| /areas/narashino | /stations/funabashi/areas/narashino/ | テナント配下に移動 |
| /areas/chiba-hanamigawa | /stations/funabashi/areas/chiba-hanamigawa/ | テナント配下に移動 |
| /documents/ | /stations/funabashi/documents/ | テナント配下に移動 |
| /flyers/ | /stations/funabashi/flyers/ | テナント配下に移動 |
| /recruit/areas/[slug] | /stations/funabashi/areas/[slug]/ | 採用エリアはステーション配下に統合 |

### 変更なし（維持）

| URL | 備考 |
|-----|------|
| /services/ | 維持 |
| /services/[slug] | 維持 |
| /pricing/ | 維持 |
| /fractal/ | 維持 |
| /company/ | 維持 |
| /company/ceo/ | 維持 |
| /recruit/ | 内容更新（全社共通化） |
| /recruit/day-flow/ | 維持 |
| /updates/ | 維持 |

### 新規作成

| URL | 内容 |
|-----|------|
| /stations/ | ステーション一覧（将来は複数カード） |
| /stations/funabashi/ | 船橋ステーション トップ（事業所情報・スタッフ・実績・お問い合わせ） |
| /stations/funabashi/areas/ | 船橋 対応エリア一覧 |
| /stations/funabashi/areas/[areaSlug]/ | 船橋 エリア詳細 |
| /stations/funabashi/documents/ | 船橋 各種書類 |
| /stations/funabashi/flyers/ | 船橋 チラシ |
| /recruit/stations/funabashi/ | 船橋ステーション採用ページ |

### トップページから削除するセクション

| セクション | 移動先 | 理由 |
|-----------|-------|------|
| About | /fractal/ へCTAで誘導 | ブランド共通だが詳細は別ページで |
| Office | /stations/funabashi/ | 店舗固有 |
| Staff | /stations/funabashi/ | 店舗固有 |
| Performance | /stations/funabashi/ | 店舗固有（全社集計版はトップに残す選択肢あり） |
| Recruit | /recruit/ へCTAで誘導 | 詳細は別ページ |
| FAQ | /services/ 各ページで対応 | サービス別FAQが既存 |
| Company | /company/ で対応 | 詳細は別ページ |

---

## 4. トップページ新セクション構成

| # | セクション | 役割 | コンポーネント | 変更 |
|---|-----------|------|-------------|------|
| 1 | Hero | ブランドキャッチコピー + ステーション選択ボタン | `Hero`（更新） | ステーション選択CTA追加 |
| 2 | Philosophy | 「私たちのカタチ」理念4項目 | `Philosophy` | 変更なし |
| 3 | Features | 8つの特徴（ブランド共通） | `Features` | 変更なし |
| 4 | Services | サービス3種リンクカード + B2Bリンク | 新規 `ServicesOverview` | 新規作成 |
| 5 | Stations | ステーション一覧カード（現在は1枚） | 新規 `StationsOverview` | 新規作成 |
| 6 | Recruit | 採用情報CTA（簡潔版） | 新規 `RecruitCTA` | 新規作成 |
| 7 | Contact | 汎用お問い合わせ（ステーション選択付き） | `Contact`（更新） | 店舗選択プルダウン追加 |

---

## 5. ナビゲーション構造

### ヘッダーメニュー

```
[ロゴ]  サービス ▼  |  料金  |  ステーション ▼  |  採用情報  |  お問い合わせ

サービス ▼:
  【訪問看護サービス】
  - 精神科訪問看護          /services/psychiatric-nursing/
  - 看取り・終末期ケア      /services/end-of-life-care/
  - 24時間対応体制          /services/24h-support/
  【関係機関の方へ】
  - ケアマネジャー様へ      /services/for-care-managers/
  - 医療機関様へ            /services/for-medical-institutions/

料金: /pricing/

ステーション ▼:
  - 船橋ステーション        /stations/funabashi/
  [新店舗は stations-data.ts から自動追加]

採用情報: /recruit/

お問い合わせ: /#contact（トップの問い合わせセクション）
```

### フッター

```
【サービス案内】            【会社情報】              【ステーション】
- 精神科訪問看護            - フラクタルの意味        - 船橋ステーション
- 看取り・終末期ケア        - 会社概要                  - 対応エリア
- 24時間対応体制            - 代表紹介                  - スタッフ紹介
- ケアマネジャー様へ        - 更新情報                  - 各種書類
- 医療機関様へ                                          - チラシ
- ご利用料金

【採用情報】
- 採用情報トップ
- 1日の流れ
- 船橋ステーション採用
```

---

## 6. データ分離方針

### 新規ファイル: `src/lib/stations-data.ts`

```typescript
export type StationOfficeInfo = {
  name: string;            // "フラクタル訪問看護 船橋"
  businessNumber: string;  // 事業所番号
  address: {
    postalCode: string;
    prefecture: string;
    city: string;
    street: string;
    building: string;
    full: string;          // 表示用フル住所
  };
  phone: string;
  fax: string;
  email: string;
  hours: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  geo: { lat: number; lng: number };
};

export type StationData = {
  slug: string;              // "funabashi"
  name: string;              // "フラクタル訪問看護 船橋"
  shortName: string;         // "船橋"
  isActive: boolean;         // 運営中フラグ
  openDate: string;          // "2025-06-01"
  officeInfo: StationOfficeInfo;
  staffMembers: StaffMember[];
  performanceMetrics: PerformanceMetrics;
  serviceAreaSlugs: string[];   // → service-areas.ts 参照
  recruitInfo: {
    // 店舗別の給与・条件等
  };
};

export const stationsData: StationData[] = [
  // 船橋ステーションのデータ（既存 data.ts から移行）
];

// ヘルパー
export function getStation(slug: string): StationData | undefined;
export function getActiveStations(): StationData[];
```

### 既存ファイルへの影響

| ファイル | 変更内容 |
|---------|---------|
| `src/lib/data.ts` | `officeInfo` を `stations-data.ts[0].officeInfo` の re-export に変更。後方互換維持 |
| `src/lib/performance-data.ts` | データを `stations-data.ts` に移行。既存エクスポートは re-export |
| `src/lib/services-data.ts` | 変更なし（全店舗共通） |
| `src/lib/pricing-data.ts` | 変更なし（全店舗共通） |
| `src/lib/faq-data.ts` | 変更なし（全店舗共通） |
| `src/lib/documents-data.ts` | ステーション別に分割対応 |
| `src/lib/recruit-data.ts` | 共通部分と店舗固有部分を分離 |
| `src/components/StructuredData.tsx` | LocalBusiness を stations-data からループ生成に変更 |

### React Context（テナントコンテキスト）

```typescript
// src/app/stations/[slug]/layout.tsx
// ステーション配下の全ページに StationData を React Context で注入
// 配下のコンポーネントは useStation() で現在のステーション情報を取得
```

---

## 7. 新店舗追加手順

新ステーション追加時に必要な作業:

1. **`src/lib/stations-data.ts`** にステーションオブジェクトを追加（約60-80行）
2. **以上。** 以下は全て自動:
   - `/stations/[slug]/` ページ（動的ルート）
   - `/stations/[slug]/areas/` ページ
   - `/stations/[slug]/areas/[areaSlug]/` ページ
   - `/stations/[slug]/documents/` ページ
   - `/stations/[slug]/flyers/` ページ
   - `/recruit/stations/[slug]/` ページ
   - ヘッダーナビの「ステーション」ドロップダウン
   - フッターのステーションリンク
   - サイトマップ（sitemap.xml）
   - 構造化データ（LocalBusiness）

---

## 8. 301リダイレクト設定

### firebase.json（静的エクスポートのため next.config.ts の redirects は使用不可）

```json
{
  "hosting": {
    "redirects": [
      { "source": "/for-care-managers{,/}", "destination": "/services/for-care-managers/", "type": 301 },
      { "source": "/for-medical-institutions{,/}", "destination": "/services/for-medical-institutions/", "type": 301 },
      { "source": "/areas", "destination": "/stations/funabashi/areas/", "type": 301 },
      { "source": "/areas/", "destination": "/stations/funabashi/areas/", "type": 301 },
      { "source": "/areas/:slug{,/}", "destination": "/stations/funabashi/areas/:slug/", "type": 301 },
      { "source": "/documents{,/}", "destination": "/stations/funabashi/documents/", "type": 301 },
      { "source": "/flyers{,/}", "destination": "/stations/funabashi/flyers/", "type": 301 },
      { "source": "/recruit/areas/:slug{,/}", "destination": "/stations/funabashi/areas/:slug/", "type": 301 }
    ]
  }
}
```

**注意**: `next.config.ts` は `output: "export"` のため redirects/rewrites API が使用不可。Firebase Hosting のリダイレクトルールを使用する。

### SEOリスク緩和

| 対策 | 内容 |
|------|------|
| 301リダイレクト即日設定 | デプロイと同時にリダイレクトを有効化 |
| Search Console でURL変更通知 | 移行後にインデックス再クロールをリクエスト |
| サイトマップ更新 | 新URLを反映した sitemap.xml を即座にデプロイ |
| 内部リンク一括更新 | サイト内の全リンクを新URLに更新し、リダイレクトチェーンを回避 |
| 監視（1-3ヶ月） | Search Console でインデックス状況・順位変動を監視 |

---

## 9. 実装フェーズ（参考）

設計提案のみのスコープだが、実装時の工程目安を記載。

| Phase | 内容 | 目安 |
|-------|------|------|
| 1 | データ層設計: `stations-data.ts` 作成、既存データ移行、後方互換 re-export | 1-2日 |
| 2 | `/stations/` ページ群実装: 一覧・詳細・エリア・書類・チラシ | 3-4日 |
| 3 | B2Bページ移動 + リダイレクト設定 | 1日 |
| 4 | トップページ更新: 11→7セクション + 新セクション作成 | 2日 |
| 5 | 採用ページ対応: `/recruit/stations/[slug]/` + 全社共通化 | 1-2日 |
| 6 | ナビゲーション・フッター更新 | 1日 |
| 7 | StructuredData動的化・サイトマップ・SEO検証 | 1日 |

合計目安: 10-12日

---

## 10. サイトマップ図（視覚化）

```
fractal-hokan.com
│
├── / (ブランドトップ)
│   ├── Hero + ステーション選択
│   ├── Philosophy
│   ├── Features
│   ├── ServicesOverview → /services/
│   ├── StationsOverview → /stations/
│   ├── RecruitCTA → /recruit/
│   └── Contact（店舗選択付き）
│
├── /services/ ─────────────────────────── サービスカテゴリ（共通）
│   ├── /psychiatric-nursing/
│   ├── /end-of-life-care/
│   ├── /24h-support/
│   ├── /for-care-managers/          ← 旧 /for-care-managers/
│   └── /for-medical-institutions/   ← 旧 /for-medical-institutions/
│
├── /pricing/ ──────────────────────────── 料金（共通）
│
├── /stations/ ─────────────────────────── ステーションカテゴリ（店舗固有）
│   └── /funabashi/ ─── ステーショントップ
│       ├── /areas/ ─── エリア一覧     ← 旧 /areas/
│       │   ├── /funabashi/            ← 旧 /areas/funabashi
│       │   ├── /yachiyo/             ← 旧 /areas/yachiyo
│       │   ├── /narashino/           ← 旧 /areas/narashino
│       │   └── /chiba-hanamigawa/    ← 旧 /areas/chiba-hanamigawa
│       ├── /documents/               ← 旧 /documents/
│       └── /flyers/                  ← 旧 /flyers/
│
├── /recruit/ ──────────────────────────── 採用カテゴリ（2層）
│   ├── /day-flow/                     全社共通
│   └── /stations/
│       └── /funabashi/                船橋ステーション採用
│
├── /fractal/ ──────────────────────────── フラクタルの意味（共通）
├── /company/ ──────────────────────────── 会社情報（共通）
│   └── /ceo/                          代表紹介
│
└── /updates/ ──────────────────────────── 更新情報
```
