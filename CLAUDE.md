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

## Git Workflow

**IMPORTANT**: プッシュ前に必ず `/pre-push-checklist` スキルを実行:

1. 更新情報ページ (`src/app/updates/page.tsx`) を最新化
2. 関連ドキュメント (CLAUDE.md, docs/*.md) を確認・更新
3. 更新があれば追加コミット
4. プッシュ

### 更新情報の記載ルール
- `type: "new"` - 新規ページ追加時
- `type: "improve"` - 機能追加、デザイン改善、バグ修正
- 内部リファクタリング、依存関係更新は記載不要

### ドキュメント更新トリガー
| ドキュメント | 更新タイミング |
|-------------|---------------|
| CLAUDE.md | プロジェクト構造、コマンド、スタイル変更時 |
| docs/COMPONENTS.md | コンポーネント追加・変更・削除時 |
| docs/DEPLOYMENT.md | デプロイ手順、環境変数、Firebase設定変更時 |
- ユーザーに見える変更のみ記載

@docs/DEPLOYMENT.md - デプロイ詳細
@docs/COMPONENTS.md - コンポーネント仕様
