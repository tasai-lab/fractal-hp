# サイトマップ再構成 実装計画

ワークフロー: wf-20260304-006
設計仕様: docs/sitemap-restructure-spec.md
作成日: 2026-03-04

---

## 前提条件（依存関係調査結果）

### 技術制約
- `output: "export"`（静的エクスポート）のため Next.js redirects API は使用不可
- リダイレクトは `firebase.json` で設定
- `trailingSlash: true` が有効（全URLはスラッシュ付き）

### officeInfo 参照箇所（7ファイル）
| ファイル | 参照フィールド |
|---------|-------------|
| `src/components/Office.tsx:4` | phone, fax, email, address.*, hours, googleMapsUrl, name, businessNumber |
| `src/components/Footer.tsx:1` | address.full, phone, hours, email |
| `src/app/areas/[slug]/page.tsx:15` | phone（4箇所） |
| `src/app/services/[slug]/page.tsx:11` | phone（2箇所） |
| `src/app/services/page.tsx:7` | phone（2箇所） |
| `src/app/for-medical-institutions/page.tsx:6` | fax, address.full, name, phone, email（7箇所） |
| `src/app/for-care-managers/page.tsx:8` | phone, email（5箇所） |

### ハードコード警告
- `src/app/areas/[slug]/layout.tsx:18,24-28`: 電話番号・住所が直書き（officeInfo未使用）
- `src/app/pricing/page.tsx:57,370`: 電話番号 "047-770-1228" が直書き

### Header/Footer 配置の不整合
- page.tsx に直接配置: areas/, areas/[slug]/, for-care-managers/, for-medical-institutions/, services/
- layout.tsx に配置: documents/, flyers/, recruit/

### 未使用データ
- `src/lib/data.ts:35` navLinks（otherMenuCategoriesに置換済み）
- `src/lib/data.ts:64` mobileMenuItems（参照元なし）
- `src/lib/data.ts:302-308` stationStats（performanceDataに置換済み）

---

## 実装フェーズ

### Phase 1: データ層設計（基盤）

全ての後続フェーズが依存する基盤。ここを正確に作れば後続は機械的。

#### Task 1-1: `stations-data.ts` 新規作成
- **ファイル**: `src/lib/stations-data.ts`（新規）
- **内容**:
  - `StationOfficeInfo` 型定義
  - `StationData` 型定義（openDate: "2025-06-01"）
  - 船橋ステーションデータ（`src/lib/data.ts:2-19` officeInfo, `data.ts:222-263` staffMembers, `performance-data.ts:28-86` を統合）
  - `getStation(slug)`, `getActiveStations()` ヘルパー
- **移行元データ**:
  - `officeInfo` → `stationsData[0].officeInfo`
  - `staffMembers` → `stationsData[0].staffMembers`
  - `performanceMetrics` / `countUpMetrics` → `stationsData[0].performanceMetrics`
  - `serviceAreas` → `stationsData[0].serviceAreaSlugs`

#### Task 1-2: 後方互換 re-export
- **ファイル**: `src/lib/data.ts`（更新）
- **内容**:
  - `officeInfo` を `stationsData[0].officeInfo` の re-export に変更
  - `staffMembers` を `stationsData[0].staffMembers` の re-export に変更
  - `serviceAreas` を維持（後方互換）
  - 未使用データ削除: `navLinks`, `mobileMenuItems`, `stationStats`
- **影響**: 既存7ファイルの import パスは変更不要（re-exportで吸収）

#### Task 1-3: `performance-data.ts` 更新
- **ファイル**: `src/lib/performance-data.ts`（更新）
- **内容**: `countUpMetrics` を `stations-data.ts` からの re-export に変更
- **影響**: `PerformanceSection.tsx` の import パスは変更不要

#### Task 1-4: ビルド確認
- `npm run build` で既存ページが全て正常にビルドされることを確認
- re-export により既存コンポーネントへの影響がゼロであることを検証

**完了条件**: ビルド成功 + 既存ページの表示に変化なし

---

### Phase 2: ステーションページ群の実装

#### Task 2-1: テナントコンテキスト設計
- **ファイル**: `src/app/stations/[slug]/layout.tsx`（新規）
- **内容**:
  - `getStation(slug)` でステーションデータ取得
  - `generateStaticParams()` で全ステーションの静的パスを生成
  - `generateMetadata()` でステーション別メタデータ生成
  - Header（default variant）+ Footer を配置
  - 構造化データ（LocalBusiness）を `stations-data.ts` から動的生成

#### Task 2-2: `/stations/` 一覧ページ
- **ファイル**: `src/app/stations/page.tsx`（新規）
- **内容**: ステーション一覧カード（現在は船橋1枚）
- **参照**: `getActiveStations()` でデータ取得

#### Task 2-3: `/stations/[slug]/` ステーショントップ
- **ファイル**: `src/app/stations/[slug]/page.tsx`（新規）
- **内容**: 事業所情報 + スタッフ紹介 + 実績 + お問い合わせ
- **既存コンポーネント流用**:
  - `Office.tsx` → props 化してステーションデータを受け渡し
  - `Staff.tsx` → props 化
  - `PerformanceSection.tsx` → props 化
  - `Contact.tsx` → embedded モードで使用（既存props対応済み）

#### Task 2-4: `/stations/[slug]/areas/` エリアページ移行
- **ファイル**:
  - `src/app/stations/[slug]/areas/page.tsx`（新規、旧 `src/app/areas/page.tsx` ベース）
  - `src/app/stations/[slug]/areas/[areaSlug]/page.tsx`（新規、旧 `src/app/areas/[slug]/page.tsx` ベース）
  - `src/app/stations/[slug]/areas/[areaSlug]/layout.tsx`（新規、旧 `src/app/areas/[slug]/layout.tsx` ベース）
- **変更点**:
  - `officeInfo` 直参照 → ステーションコンテキストから取得
  - layout.tsx のハードコード電話番号・住所 → ステーションデータから動的取得
  - パンくずリスト URL を `/stations/funabashi/areas/` に更新
  - Header/Footer を layout.tsx に統一（page.tsx からの直接配置を解消）
- **参照データ**: `service-areas.ts`, `regional-data.ts` は変更なし

#### Task 2-5: `/stations/[slug]/documents/` 書類ページ移行
- **ファイル**: `src/app/stations/[slug]/documents/page.tsx`（新規、旧 `src/app/documents/page.tsx` ベース）
- **変更点**: パンくずリストURL更新、ステーションコンテキスト対応

#### Task 2-6: `/stations/[slug]/flyers/` チラシページ移行
- **ファイル**: `src/app/stations/[slug]/flyers/page.tsx`（新規、旧 `src/app/flyers/page.tsx` ベース）
- **変更点**: パンくずリストURL更新、ステーションコンテキスト対応

**完了条件**: `/stations/funabashi/` 配下の全ページが正常表示 + ビルド成功

---

### Phase 3: B2Bページ移動

#### Task 3-1: ケアマネ向けページ移動
- **移動**: `src/app/for-care-managers/` → `src/app/services/for-care-managers/`
- **変更**:
  - page.tsx: Header/Footer を削除（services/layout.tsx で管理）
  - layout.tsx: パンくずリスト URL 更新
  - officeInfo.phone 参照は維持（共通データとして正当）

#### Task 3-2: 医療機関向けページ移動
- **移動**: `src/app/for-medical-institutions/` → `src/app/services/for-medical-institutions/`
- **変更**: 同上

#### Task 3-3: services layout 更新
- **ファイル**: `src/app/services/layout.tsx`（更新）
- **内容**: B2Bページもカバーするようレイアウト調整

**完了条件**: `/services/for-care-managers/`, `/services/for-medical-institutions/` が正常表示

---

### Phase 4: トップページ更新

#### Task 4-1: 新セクション `ServicesOverview` 作成
- **ファイル**: `src/components/ServicesOverview.tsx`（新規）
- **内容**: サービス3種のリンクカード + 「関係機関の方へ」リンク

#### Task 4-2: 新セクション `StationsOverview` 作成
- **ファイル**: `src/components/StationsOverview.tsx`（新規）
- **内容**: ステーション一覧カード（`getActiveStations()` から動的生成）

#### Task 4-3: 新セクション `RecruitCTA` 作成
- **ファイル**: `src/components/RecruitCTA.tsx`（新規）
- **内容**: 採用情報への簡潔なCTA（/recruit/ へのリンク）

#### Task 4-4: トップページ page.tsx 更新
- **ファイル**: `src/app/page.tsx`（更新）
- **変更**: 11→7セクション
  - 残す: Hero, Philosophy, Features, Contact
  - 新規: ServicesOverview, StationsOverview, RecruitCTA
  - 削除: About, PerformanceSection, Office, Flow, Staff, Recruit, FAQ, Company
- **Hero 更新**: ステーション選択CTA追加
- **Contact 更新**: ステーション選択プルダウン追加

**完了条件**: トップページが7セクション構成で正常表示

---

### Phase 5: 採用ページ対応

#### Task 5-1: `/recruit/stations/[slug]/` 新規作成
- **ファイル**: `src/app/recruit/stations/[slug]/page.tsx`（新規）
- **内容**: ステーション別採用情報（給与・スタッフ・エリア）
- **参照**: `stations-data.ts` + `recruit-data.ts`

#### Task 5-2: `/recruit/` トップ更新
- **ファイル**: `src/app/recruit/page.tsx`（更新）
- **変更**: 全社共通情報に整理。ステーション別採用ページへのリンク追加

#### Task 5-3: 旧 `/recruit/areas/[slug]` 削除
- 旧ディレクトリ削除（リダイレクトで `/stations/[slug]/areas/` に転送）

**完了条件**: `/recruit/stations/funabashi/` が正常表示 + `/recruit/` に全社共通 + ステーション選択導線

---

### Phase 6: ナビゲーション・フッター更新

#### Task 6-1: ナビゲーションデータ更新
- **ファイル**: `src/lib/data.ts`（更新）
- **変更**:
  - `otherMenuCategories` を新URL構造に更新
  - `footerLinks` を新URL構造に更新
  - 「専門家の方へ」→「関係機関の方へ」に修正
  - ステーションドロップダウンを `stations-data.ts` から動的生成

#### Task 6-2: Header.tsx 更新
- **ファイル**: `src/components/Header.tsx`（更新）
- **変更**: ステーションメニューを動的生成対応

#### Task 6-3: Footer.tsx 更新
- **ファイル**: `src/components/Footer.tsx`（更新）
- **変更**: 新URL構造のリンク + ステーション別リンク

**完了条件**: 全ページのナビゲーション・フッターが新URL構造を反映

---

### Phase 7: SEO・リダイレクト・最終検証

#### Task 7-1: firebase.json リダイレクト設定
- **ファイル**: `firebase.json`（更新）
- **内容**: 301リダイレクトルール追加（設計仕様書 Section 8 参照）

#### Task 7-2: StructuredData 動的化
- **ファイル**: `src/components/StructuredData.tsx`（更新）
- **変更**: LocalBusiness データを `stations-data.ts` からループ生成
- **ハードコード修正**: 電話番号・住所の直書きを全て排除

#### Task 7-3: sitemap.ts 更新
- **ファイル**: `src/app/sitemap.ts`（更新）
- **変更**: 新URL構造に合わせたサイトマップ生成
  - `/stations/[slug]/` 配下のページ追加
  - `/recruit/stations/[slug]/` 追加
  - 旧URL削除

#### Task 7-4: 旧ページディレクトリ削除
- 削除対象:
  - `src/app/areas/`（→ `/stations/[slug]/areas/` に移行済み）
  - `src/app/documents/`（→ `/stations/[slug]/documents/` に移行済み）
  - `src/app/flyers/`（→ `/stations/[slug]/flyers/` に移行済み）
  - `src/app/for-care-managers/`（→ `/services/for-care-managers/` に移行済み）
  - `src/app/for-medical-institutions/`（→ `/services/for-medical-institutions/` に移行済み）
  - `src/app/recruit/areas/`（→ `/stations/[slug]/areas/` に統合済み）

#### Task 7-5: 内部リンク一括更新
- 全ファイルの旧URLを新URLに更新（リダイレクトチェーン回避）
- 対象: page.tsx, layout.tsx, data.ts, Footer.tsx, Header.tsx 等

#### Task 7-6: 全ページビルド + リンク検証
- `npm run build` で全ページビルド成功を確認
- 全内部リンクが正常に解決されることを検証

**完了条件**: ビルド成功 + リダイレクト設定完了 + 内部リンク正常 + 構造化データ正常

---

## 依存関係グラフ

```
Phase 1 (データ層)
  ├── Phase 2 (ステーションページ) ──┐
  ├── Phase 3 (B2Bページ移動) ──────┤
  └── Phase 4 (トップページ) ────────┤
                                     ├── Phase 6 (ナビ・フッター)
Phase 5 (採用ページ) ───────────────┘       │
  ↑ Phase 2 完了が前提                      ↓
                                     Phase 7 (SEO・最終検証)
```

- Phase 1 は全てのブロッカー
- Phase 2/3/4 は Phase 1 完了後に並列実行可能
- Phase 5 は Phase 2 完了が前提（ステーションデータ参照）
- Phase 6 は Phase 2/3/4 完了後
- Phase 7 は全フェーズ完了後

---

## ファイル変更サマリー

| 区分 | ファイル数 |
|------|----------|
| 新規作成 | ~15ファイル（ステーションページ群 + 新コンポーネント3種 + stations-data.ts） |
| 更新 | ~12ファイル（data.ts, performance-data.ts, page.tsx, Header, Footer, StructuredData, sitemap等） |
| 移動 | 4ディレクトリ（areas, documents, flyers, for-care-managers, for-medical-institutions） |
| 削除 | 6ディレクトリ（移行後の旧ディレクトリ + recruit/areas） |

---

## リスクと緩和策

| リスク | 影響度 | 緩和策 |
|--------|-------|--------|
| areas/[slug] SEO順位低下（1-3ヶ月） | 中 | 301リダイレクト即日 + Search Console再クロール + 監視 |
| 静的エクスポートでのリダイレクト制約 | 低 | firebase.json で対応（既に確認済み） |
| Header/Footer配置の不整合 | 低 | Phase 2でlayout.tsxに統一 |
| areas/[slug]/layout.tsx のハードコード | 低 | Phase 2-4 でステーションコンテキストに移行 |
| 並列作業時のコンフリクト | 低 | Phase 1完了後にブランチ分離 |
