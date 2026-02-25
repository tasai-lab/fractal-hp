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
│   ├── documents/         # 各種書類・情報公開（BCP、契約書等）
│   └── flyers/            # チラシ
├── components/            # 共通コンポーネント
└── lib/
    ├── data.ts            # 共通データ
    └── recruit-data.ts    # 採用データ
```

## コンポーネント参照ガイドライン

### 新規UI実装前の必須チェック（スキップ厳禁）

新しいUIパターンを実装する前に、以下を必ず実行すること:

1. **docs/COMPONENTS.md を読む** - 既存25コンポーネントの仕様を確認
2. **docs/COMPONENT-OPTIMIZATION.md を確認** - 重複パターン（FAQアコーディオン、CTA、FadeIn等）がないか確認
3. **既存コンポーネントで対応できる場合は必ず再利用** - 独自実装しない

### 重複回避の強制ルール

以下のUIパターンは既存コンポーネントを使うこと（新規実装禁止）:
- FAQ/アコーディオン → 既存FAQパターンを参照
- 電話番号リンク → docs/COMPONENT-OPTIMIZATION.md のパターンを参照
- グラフ・チャート → `src/components/charts/` のコンポーネントを再利用
- カウントアップ数値 → `CountUp` コンポーネントを使用
- セクション背景装飾 → `BackgroundTriangles` を使用
- スクロールアニメーション → `useScrollAnimation` フックを使用

### 再利用必須コンポーネント

- `BackgroundTriangles` - セクション背景装飾（全10パターン）
- `CountUp` - 数値カウントアップ（prefix/suffix対応）
- `StructuredData` 系 - SEO構造化データ
- `src/components/charts/` 系 - グラフ・チャート（3種類）
- `useScrollAnimation` フック - スクロール連動アニメーション

### セクション実装パターン（既存パターンに従うこと）

```tsx
<section className="relative overflow-hidden">
  <BackgroundTriangles pattern="[section-name]" />
  <div className="section-wrapper">
    <div className="section-inner">
      {/* コンテンツ */}
    </div>
  </div>
</section>
```

### Storybook での視覚確認

```bash
npm run storybook  # ポート6006で起動
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
@docs/COMPONENT-OPTIMIZATION.md - 重複パターンと最適化候補
