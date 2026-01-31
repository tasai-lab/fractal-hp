# fractal-hp

船橋市・八千代市・習志野市の訪問看護ステーション「フラクタル訪問看護 船橋」のWebサイト。

## Deploy

**自動デプロイ**: mainにプッシュ → Cloud Buildで自動デプロイ
- プロジェクトID: `fractal-hokan-funabashi`
- Hosting: Firebase Hosting
- API: Cloud Functions (gen2) - お問い合わせフォーム

**手動デプロイ**:
```bash
npm run build && firebase deploy --only hosting --project=fractal-hokan-funabashi
```

## Commands

```bash
npm run dev      # 開発サーバー (localhost:3000)
npm run build    # 本番ビルド
npm run lint     # ESLint
```

## Code Style

### CSS変数（ブランドカラー）
- `--color-logo-dark-green` (#0D5643)
- `--color-logo-light-green` (#7FC5A0)
- `--color-logo-yellow` (#F4E951)

**IMPORTANT**: ハードコードせず、必ずCSS変数を使用すること。

### フォントクラス
- `heading-gothic` - 見出し用（Noto Sans JP）
- `heading-mincho` - 明朝体（Zen Old Mincho）
- `body-editorial` - 背景グラデーション付きページ

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # トップページ
│   ├── about-fractal/     # フラクタルを知る
│   ├── recruit/           # 採用情報
│   └── flyers/            # チラシ
├── components/            # 共通コンポーネント
└── lib/
    ├── data.ts            # 共通データ
    └── recruit-data.ts    # 採用データ
```

## Data Management

データは `src/lib/*.ts` で一元管理。コンポーネント内にハードコードしない。

@docs/DEPLOYMENT.md - デプロイ詳細
@docs/COMPONENTS.md - コンポーネント仕様
