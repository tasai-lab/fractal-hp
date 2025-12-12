# フラクタル訪問看護 船橋 Webサイト

船橋市・八千代市・習志野市を中心に訪問看護サービスを提供する「フラクタル訪問看護 船橋」の公式Webサイトです。

## 技術スタック

| 技術 | バージョン | 用途 |
|-----|-----------|------|
| Next.js | 16.0.10 | フレームワーク |
| React | 19.2.1 | UIライブラリ |
| TypeScript | 5.x | 型安全な開発 |
| Tailwind CSS | 4.x | スタイリング |
| Lucide React | 0.560.0 | アイコン |

## プロジェクト構造

```
fractal-hp/
├── docs/                    # ドキュメント
│   ├── SEO-SETUP.md         # SEO設定手順
│   ├── DEVELOPMENT.md       # 開発ガイド
│   ├── DEPLOYMENT.md        # デプロイ手順
│   └── COMPONENTS.md        # コンポーネント仕様
├── public/
│   ├── images/              # 画像ファイル
│   │   ├── hero/            # ヒーロー画像
│   │   ├── logos/           # ロゴ
│   │   ├── staff/           # スタッフ写真
│   │   ├── ogp/             # OGP画像
│   │   └── ...
│   └── manifest.json        # PWAマニフェスト
├── src/
│   ├── app/
│   │   ├── layout.tsx       # ルートレイアウト
│   │   ├── page.tsx         # トップページ
│   │   ├── globals.css      # グローバルスタイル
│   │   ├── sitemap.ts       # サイトマップ生成
│   │   ├── robots.ts        # robots.txt生成
│   │   ├── api/
│   │   │   └── contact/     # お問い合わせAPI
│   │   ├── recruit/         # 採用情報ページ
│   │   ├── about-fractal/   # 会社紹介ページ
│   │   └── flyers/          # チラシページ
│   ├── components/          # Reactコンポーネント
│   └── lib/                 # ユーティリティ・データ
├── .env.example             # 環境変数テンプレート
├── .env.local               # 環境変数（Git管理外）
├── firebase.json            # Firebase設定
└── package.json
```

## セットアップ

### 必要条件

- Node.js 18.x 以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-org/fractal-hp.git
cd fractal-hp

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env.local
# .env.local を編集して必要な値を設定
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

### ビルド

```bash
npm run build
```

### 本番サーバーの起動

```bash
npm run start
```

## 環境変数

| 変数名 | 説明 | 必須 |
|-------|------|------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 測定ID | 任意 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console 認証コード | 任意 |

## ページ構成

| パス | ページ | 説明 |
|-----|-------|------|
| `/` | トップページ | メインのランディングページ |
| `/recruit` | 採用情報 | 看護師・セラピストの求人情報 |
| `/about-fractal` | フラクタルを知る | 企業理念・ビジョン |
| `/flyers` | チラシ | 印刷用チラシ |

## セクション一覧（トップページ）

1. **Hero** - メインビジュアル「私たちがフラクタル」
2. **About** - フラクタルとは
3. **Philosophy** - 私たちのカタチ（4つの要素）
4. **Features** - フラクタルの特徴（8項目）
5. **Office** - 事業所情報
6. **ServiceArea** - 訪問エリア
7. **Flow** - ご利用開始までの流れ
8. **Staff** - スタッフ紹介
9. **Recruit** - リクルート
10. **Contact** - お問い合わせ
11. **Company** - 会社情報

## ドキュメント

- [開発ガイド](docs/DEVELOPMENT.md)
- [デプロイ手順](docs/DEPLOYMENT.md)
- [ドメイン移行手順](docs/DOMAIN-MIGRATION.md)
- [SEO設定](docs/SEO-SETUP.md)
- [コンポーネント仕様](docs/COMPONENTS.md)

## SEO対策

- メタデータ最適化（title, description, keywords）
- Open Graph / Twitter Card 対応
- 構造化データ（JSON-LD）
  - LocalBusiness / MedicalBusiness
  - JobPosting（求人情報）
- サイトマップ自動生成
- robots.txt 自動生成

詳細は [SEO設定手順書](docs/SEO-SETUP.md) を参照してください。

## デプロイ

Firebase Hosting を使用しています。

```bash
npm run build
firebase deploy
```

詳細は [デプロイ手順書](docs/DEPLOYMENT.md) を参照してください。

## 事業所情報

- **名称**: フラクタル訪問看護 船橋
- **事業所番号**: 1262891190
- **住所**: 〒274-0072 千葉県船橋市三山6丁目22-2 パレドール小川201
- **電話**: 047-770-1228
- **FAX**: 047-413-0502
- **メール**: hokan-f@fractal-group.co.jp
- **営業時間**: 9:00〜19:00（365日対応）

## ライセンス

Copyright (c) 2024 株式会社フラクタル. All Rights Reserved.
