# SEO改善計画書

## 概要

**目的:** 以下のキーワードで検索上位表示を実現
- `[市名] + 訪問看護` (船橋市、八千代市、習志野市)
- `フラクタル` (ブランド名)
- `訪問看護 + 求人`
- `[市名] + 訪問看護 + 求人`

**ターゲット:**
1. 求人応募者（看護師・PT・OT・ST）
2. 依頼元（ケアマネージャー・医療機関）

---

## 調査結果サマリー

### 現状評価

| 項目 | スコア | 状況 |
|------|--------|------|
| タイトルタグ | 9/10 | 最適化済み |
| メタディスクリプション | 9/10 | 充実 |
| 構造化データ | 9.5/10 | LocalBusiness, JobPosting, FAQ実装済み |
| 内部リンク | 7.5/10 | 改善の余地あり |
| コンテンツ | 8/10 | 良好 |
| **ケアマネ・医療機関向け** | **6/10** | **重大な欠落** |

### 重大な課題

1. **ケアマネージャー向けコンテンツが完全欠落**
2. **医療機関向け連携情報が不十分**
3. **紹介プロセスの明確化がない**
4. **B2Bキーワードが未対応**

---

## 改善計画

### Phase 1: 緊急対応（1-2週間）

#### 1.1 ケアマネージャー向けページ作成

**新規ページ:** `/for-care-managers/page.tsx`

**コンテンツ:**
- 紹介方法・手続きの流れ
- 訪問看護指示書の取得フロー
- 報告体制（定期報告・急変時報告）
- 対応可能なケース
- FAQ（ケアマネ向け）

**SEOキーワード:**
- 「ケアマネジャー 訪問看護 船橋」
- 「訪問看護 紹介方法」
- 「介護保険 訪問看護」

#### 1.2 医療機関向けページ作成

**新規ページ:** `/for-medical-institutions/page.tsx`

**コンテンツ:**
- 患者紹介プロセス
- 訪問看護指示書の発行方法
- 定期報告体制
- 急変時対応フロー
- 連携実績

**SEOキーワード:**
- 「訪問看護 医療連携 船橋」
- 「主治医指示 訪問看護」
- 「退院支援 訪問看護」

#### 1.3 メタデータ更新

**layout.tsx キーワード追加:**
```typescript
// B2B向けキーワード追加
"ケアマネジャー 訪問看護 船橋",
"介護保険 訪問看護",
"主治医指示 訪問看護",
"医療連携 訪問看護",
"退院支援 訪問看護",
"居宅介護支援",
"ケアプラン 訪問看護",
```

#### 1.4 構造化データ更新

**24時間対応情報の追加:**
```javascript
// LocalBusinessスキーマに追加
"contactPoint": [
  {
    "@type": "ContactPoint",
    "contactType": "24時間緊急対応",
    "telephone": "047-770-1228",
    "availableLanguage": "ja"
  }
]
```

---

### Phase 2: 高優先度（2-4週間）

#### 2.1 紹介票テンプレート提供

- PDF/Excelダウンロード機能
- `/assets/referral-form.pdf`

#### 2.2 地域ページの医療機関情報拡充

**regional-data.ts 更新:**
- 各地域の協力医療機関情報
- 地域包括支援センター連絡先
- ケアマネ事業所情報

#### 2.3 求人ページのエリア別強化

**既存 /recruit/areas/[slug]/page.tsx の確認・強化:**
- 「船橋市 訪問看護 求人」で最適化
- 地域別の求人構造化データ確認

---

### Phase 3: 中期対応（1-2ヶ月）

#### 3.1 疾患別・サービス別ランディングページ

- `/services/palliative-care/` - 終末期ケア・看取り
- `/services/psychiatric/` - 精神科訪問看護
- `/services/rehabilitation/` - 訪問リハビリ

#### 3.2 ブログ・事例記事

- `/blog/` セクション新設
- ケース紹介（個人情報配慮）
- スタッフコラム
- 月2-4本のコンテンツ更新

#### 3.3 E-E-A-T強化

- スタッフの資格・経歴情報拡充
- 医師監修情報の追加
- 実績データの公開（対応件数等）

---

## 実装タスク一覧

### 緊急（P1）

- [ ] `/for-care-managers/page.tsx` 新規作成
- [ ] `/for-care-managers/layout.tsx` メタデータ設定
- [ ] `/for-medical-institutions/page.tsx` 新規作成
- [ ] `/for-medical-institutions/layout.tsx` メタデータ設定
- [ ] `layout.tsx` B2Bキーワード追加
- [ ] `StructuredData.tsx` 24時間対応情報追加
- [ ] ナビゲーション更新（Header/Footer）

### 高優先（P2）

- [ ] 紹介票テンプレートPDF作成
- [ ] `regional-data.ts` 医療機関情報追加
- [ ] 求人ページエリア別メタデータ最適化
- [ ] 内部リンク構造の最適化

### 中期（P3）

- [ ] 疾患別ページ作成
- [ ] ブログセクション構築
- [ ] E-E-A-T情報の拡充

---

## KPI・成功指標

| 指標 | 現状 | 目標（3ヶ月後） |
|------|------|----------------|
| 「船橋市 訪問看護」順位 | TBD | 10位以内 |
| 「訪問看護 求人 船橋」順位 | TBD | 10位以内 |
| ケアマネからの問い合わせ | TBD | 月5件以上 |
| 医療機関からの紹介 | TBD | 月3件以上 |

---

## 技術仕様

### ページ構成

```
src/app/
├── for-care-managers/
│   ├── page.tsx
│   └── layout.tsx
├── for-medical-institutions/
│   ├── page.tsx
│   └── layout.tsx
├── services/
│   ├── palliative-care/
│   ├── psychiatric/
│   └── rehabilitation/
└── blog/
    └── [slug]/
```

### データ構造更新

```typescript
// regional-data.ts 追加項目
export type RegionalData = {
  // 既存フィールド...

  // 新規追加
  medicalPartners: {
    hospitals: Array<{ name: string; specialty: string; phone: string }>;
    clinics: Array<{ name: string; specialty: string; phone: string }>;
    careManagers: Array<{ name: string; address: string; phone: string }>;
  };
  referralProcess: {
    steps: Array<{ step: number; title: string; description: string }>;
    downloadUrl: string;
  };
};
```

---

## 承認項目

計画承認後、以下の順序で実装を進めます:

1. **Phase 1（緊急）:** ケアマネ・医療機関向けページ作成
2. **Phase 2（高優先）:** 紹介票・医療情報拡充
3. **Phase 3（中期）:** 疾患別ページ・ブログ構築

---

作成日: 2026-02-14
作成者: Claude Code (dev-workflow)
