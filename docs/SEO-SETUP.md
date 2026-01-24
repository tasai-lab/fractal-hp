# SEO設定手順書

フラクタル訪問看護 船橋 WebサイトのSEO設定手順です。

---

## 1. Google Analytics (GA4) の設定

### 1.1 GA4プロパティの作成

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 左下の「管理」（歯車アイコン）をクリック
3. 「プロパティを作成」をクリック
4. 以下を入力:
   - プロパティ名: `フラクタル訪問看護 船橋`
   - レポートのタイムゾーン: `日本`
   - 通貨: `日本円（JPY）`
5. 「次へ」をクリックし、ビジネス情報を入力
6. 「ウェブ」を選択
7. 以下を入力:
   - ウェブサイトのURL: `https://fractal-hokan.com`
   - ストリーム名: `フラクタル訪問看護 船橋`
8. 「ストリームを作成」をクリック

### 1.2 測定IDの取得

1. 作成したウェブストリームの詳細画面で「測定ID」を確認
2. `G-XXXXXXXXXX` の形式でコピー

### 1.3 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成（または編集）:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 2. Google Search Console の設定

### 2.1 プロパティの追加

1. [Google Search Console](https://search.google.com/search-console/) にアクセス
2. 「プロパティを追加」をクリック
3. 「URLプレフィックス」を選択
4. `https://fractal-hokan.com` を入力
5. 「続行」をクリック

### 2.2 所有権の確認（HTMLタグ方式）

1. 確認方法で「HTMLタグ」を選択
2. 表示されるmetaタグから `content` の値をコピー
   ```html
   <meta name="google-site-verification" content="ここの値をコピー" />
   ```
3. `.env.local` に追加:
   ```bash
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=コピーした値
   ```
4. デプロイ後、Search Consoleで「確認」をクリック

### 2.3 サイトマップの送信

1. Search Consoleの左メニューから「サイトマップ」を選択
2. 「新しいサイトマップの追加」に `sitemap.xml` と入力
3. 「送信」をクリック

---

## 3. 環境変数の完全な設定例

`.env.local` ファイル:

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 4. 確認方法

### 4.1 サイトマップの確認

デプロイ後、以下のURLにアクセスして確認:
- https://fractal-hokan.com/sitemap.xml

### 4.2 robots.txtの確認

- https://fractal-hokan.com/robots.txt

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

---

## 5. SEO対策キーワード一覧

### メインキーワード（サービス）
| キーワード | 検索意図 |
|-----------|---------|
| 船橋市 訪問看護 | サービス検索 |
| 八千代市 訪問看護 | サービス検索 |
| 習志野市 訪問看護 | サービス検索 |
| 千葉市花見川区 訪問看護 | サービス検索 |
| 訪問看護ステーション 船橋 | サービス検索 |
| 在宅医療 船橋市 | サービス検索 |
| 精神科訪問看護 船橋 | サービス検索 |
| 終末期ケア 船橋 | サービス検索 |

### 求人キーワード
| キーワード | 検索意図 |
|-----------|---------|
| 船橋市 訪問看護 求人 | 求人検索 |
| 船橋 看護 求人 | 求人検索 |
| 訪問看護師 求人 船橋 | 求人検索 |
| 八千代市 看護師 求人 | 求人検索 |
| 訪問看護 正社員 千葉 | 求人検索 |
| 理学療法士 求人 船橋 | 求人検索 |
| 作業療法士 求人 船橋 | 求人検索 |

---

## 6. OGP画像の設定

SNSシェア時に表示される画像を設定するには:

1. 1200x630px の画像を作成
2. 以下に配置:
   - `/public/images/ogp/ogp-image.png` （トップページ用）
   - `/public/images/ogp/recruit-ogp.png` （採用ページ用）

---

## 7. 定期的な確認事項

### 週次
- [ ] Google Analytics でアクセス状況を確認
- [ ] Search Console でエラーがないか確認

### 月次
- [ ] Search Console の検索パフォーマンスを確認
- [ ] キーワードランキングの変動を確認
- [ ] 構造化データのエラーを確認

---

## 8. トラブルシューティング

### Google Analyticsが動作しない
1. 環境変数 `NEXT_PUBLIC_GA_MEASUREMENT_ID` が正しく設定されているか確認
2. ブラウザの広告ブロッカーを無効化して確認
3. GA4のリアルタイムレポートで確認

### Search Consoleの所有権確認が失敗する
1. 環境変数が正しく設定されているか確認
2. デプロイが完了しているか確認
3. ページのソースを表示して meta タグが含まれているか確認

### サイトマップが送信できない
1. `https://fractal-hokan.com/sitemap.xml` にアクセスできるか確認
2. XMLの形式が正しいか確認

---

## 関連ファイル

| ファイル | 説明 |
|---------|------|
| `src/app/layout.tsx` | グローバルメタデータ |
| `src/app/sitemap.ts` | サイトマップ生成 |
| `src/app/robots.ts` | robots.txt生成 |
| `src/components/GoogleAnalytics.tsx` | GA4コンポーネント |
| `src/components/StructuredData.tsx` | 構造化データ |
| `src/app/recruit/layout.tsx` | 採用ページメタデータ |
| `src/lib/faq-data.ts` | FAQデータ |
| `src/app/about-fractal/layout.tsx` | 会社紹介ページメタデータ |
| `src/app/flyers/layout.tsx` | チラシページメタデータ |
| `.env.local` | 環境変数（Git管理外） |
| `.env.example` | 環境変数テンプレート |
