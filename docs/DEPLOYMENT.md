# デプロイ手順書

フラクタル訪問看護 船橋 WebサイトのFirebase Hostingへのデプロイ手順です。

---

## 前提条件

- Node.js 18.x 以上がインストールされていること
- Firebase CLI がインストールされていること
- Firebase プロジェクトが作成されていること
- Firebase プロジェクトへのアクセス権があること

---

## 1. Firebase CLI のセットアップ

### 1.1 インストール

```bash
npm install -g firebase-tools
```

### 1.2 ログイン

```bash
firebase login
```

ブラウザが開くので、Googleアカウントでログインします。

### 1.3 プロジェクトの確認

```bash
firebase projects:list
```

`fractal-hokan` プロジェクトが表示されることを確認します。

---

## 2. 初回セットアップ

### 2.1 プロジェクトの初期化（初回のみ）

```bash
firebase init hosting
```

以下の設定を選択：
- Use an existing project: `fractal-hokan`
- Public directory: `out`
- Single-page app: `No`
- GitHub deploys: 任意

### 2.2 設定ファイルの確認

`firebase.json`:
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

---

## 3. デプロイ手順

### 3.1 環境変数の設定

本番用の環境変数を `.env.local` に設定：

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxx
```

### 3.2 ビルド

```bash
npm run build
```

ビルドが成功すると、以下が出力されます：
```
Route (app)
┌ ○ /
├ ○ /about-fractal
├ ○ /recruit
├ ○ /robots.txt
└ ○ /sitemap.xml
```

### 3.3 静的エクスポート（必要な場合）

Next.js 14以降で静的エクスポートを行う場合、`next.config.js` に以下を追加：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

### 3.4 デプロイ

```bash
firebase deploy --only hosting
```

成功すると、以下のようなURLが表示されます：
```
Hosting URL: https://fractal-hokan.com
```

---

## 4. デプロイの確認

### 4.1 動作確認

1. https://fractal-hokan.com にアクセス
2. 各ページが正しく表示されることを確認
3. お問い合わせフォームが動作することを確認

### 4.2 SEO確認

1. https://fractal-hokan.com/sitemap.xml
2. https://fractal-hokan.com/robots.txt

### 4.3 パフォーマンス確認

[PageSpeed Insights](https://pagespeed.web.dev/) でスコアを確認：
- Performance: 90以上を目標
- Accessibility: 90以上を目標
- Best Practices: 90以上を目標
- SEO: 90以上を目標

---

## 5. ロールバック

問題が発生した場合、以前のバージョンにロールバック：

```bash
# デプロイ履歴を確認
firebase hosting:channel:list

# 特定のバージョンにロールバック
firebase hosting:clone PROJECT_ID:CHANNEL PROJECT_ID:live
```

または、Firebase Console から：
1. Firebase Console → Hosting
2. 「リリース履歴」を開く
3. 戻したいバージョンの「ロールバック」をクリック

---

## 6. カスタムドメインの設定

### 6.1 ドメインの追加

1. Firebase Console → Hosting → 「カスタムドメインを追加」
2. `fractal-hokan.com` を入力
3. DNSレコードの設定指示に従う

### 6.2 DNS設定

ドメインレジストラで以下のレコードを設定：

```
# Aレコード
@ → 151.101.1.195
@ → 151.101.65.195

# または CNAMEレコード
www → fractal-hokan.web.app
```

### 6.3 SSL証明書

Firebase Hosting は自動でSSL証明書を発行・更新します。
設定後、数時間〜24時間で有効になります。

---

## 7. CI/CD（GitHub Actions）

### 7.1 シークレットの設定

GitHub リポジトリ → Settings → Secrets → Actions:
- `FIREBASE_SERVICE_ACCOUNT`: Firebase サービスアカウントのJSON

### 7.2 ワークフローファイル

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_GA_MEASUREMENT_ID: ${{ secrets.GA_MEASUREMENT_ID }}
          NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: ${{ secrets.GOOGLE_SITE_VERIFICATION }}

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: fractal-hokan
```

---

## 8. トラブルシューティング

### ビルドエラー

```bash
# キャッシュをクリアして再ビルド
rm -rf .next out
npm run build
```

### デプロイエラー

```bash
# Firebase CLIを最新版に更新
npm update -g firebase-tools

# 認証をリフレッシュ
firebase login --reauth
```

### 404エラー

- `firebase.json` の `rewrites` 設定を確認
- `next.config.js` の `trailingSlash` 設定を確認

### 画像が表示されない

- `next.config.js` の `images.unoptimized: true` を確認
- 画像パスが正しいか確認

### Storybookファイルのビルドエラー

`@storybook/react` の型が見つからずビルドが失敗する場合、`tsconfig.json` の `exclude` に Stories ファイルが含まれていない可能性があります。

```json
// tsconfig.json
"exclude": ["node_modules", "functions", "__tests__", "**/*.stories.ts", "**/*.stories.tsx"]
```

`*.stories.tsx` は Storybook 専用ファイルで本番ビルドには不要です。必ず exclude に追加してください。

---

## 9. チェックリスト

デプロイ前の確認事項：

- [ ] ローカルでビルドが成功する
- [ ] 環境変数が正しく設定されている
- [ ] 全ページが正しく表示される
- [ ] お問い合わせフォームが動作する
- [ ] レスポンシブデザインが正しい
- [ ] 画像が全て表示される
- [ ] 外部リンクが正しく動作する
- [ ] Google Analytics が動作する

デプロイ後の確認事項：

- [ ] 本番URLでアクセスできる
- [ ] SSL証明書が有効
- [ ] サイトマップがアクセス可能
- [ ] robots.txt がアクセス可能
- [ ] PageSpeed Insightsのスコアが目標値以上
