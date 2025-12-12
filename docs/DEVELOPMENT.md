# 開発ガイド

フラクタル訪問看護 船橋 Webサイトの開発ガイドです。

---

## 開発環境のセットアップ

### 必要なツール

| ツール | バージョン | 用途 |
|-------|-----------|------|
| Node.js | 18.x 以上 | JavaScript実行環境 |
| npm | 9.x 以上 | パッケージ管理 |
| Git | 最新 | バージョン管理 |
| VS Code | 最新（推奨） | エディタ |

### 推奨VS Code拡張機能

- ESLint
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Prettier - Code formatter

### 初期セットアップ

```bash
# 1. リポジトリをクローン
git clone https://github.com/your-org/fractal-hp.git
cd fractal-hp

# 2. 依存関係をインストール
npm install

# 3. 環境変数を設定
cp .env.example .env.local

# 4. 開発サーバーを起動
npm run dev
```

---

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # トップページ
│   ├── globals.css         # グローバルスタイル
│   ├── sitemap.ts          # サイトマップ生成
│   ├── robots.ts           # robots.txt生成
│   ├── api/
│   │   └── contact/
│   │       └── route.ts    # お問い合わせAPI
│   ├── recruit/
│   │   ├── layout.tsx      # 採用ページレイアウト
│   │   └── page.tsx        # 採用ページ
│   ├── about-fractal/
│   │   ├── layout.tsx      # 会社紹介レイアウト
│   │   └── page.tsx        # 会社紹介ページ
│   └── flyers/
│       └── page.tsx        # チラシページ
├── components/             # Reactコンポーネント
│   ├── Header.tsx          # ヘッダー
│   ├── Hero.tsx            # ヒーローセクション
│   ├── About.tsx           # フラクタルとは
│   ├── Philosophy.tsx      # 私たちのカタチ
│   ├── Features.tsx        # 特徴
│   ├── Office.tsx          # 事業所情報
│   ├── ServiceArea.tsx     # 訪問エリア
│   ├── Flow.tsx            # ご利用の流れ
│   ├── Staff.tsx           # スタッフ紹介
│   ├── Recruit.tsx         # リクルート
│   ├── Contact.tsx         # お問い合わせ
│   ├── Company.tsx         # 会社情報
│   ├── Footer.tsx          # フッター
│   ├── BackgroundTriangles.tsx  # 背景装飾
│   ├── GoogleAnalytics.tsx      # GA4
│   └── StructuredData.tsx       # 構造化データ
└── lib/                    # ユーティリティ
    ├── data.ts             # サイトデータ
    └── recruit-data.ts     # 採用データ
```

---

## 開発コマンド

```bash
# 開発サーバー起動（ホットリロード有効）
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# Lintチェック
npm run lint
```

---

## コーディング規約

### TypeScript

- 型定義を積極的に使用する
- `any` 型の使用は避ける
- インターフェースは `I` プレフィックスを付けない

```typescript
// Good
interface StaffMember {
  name: string;
  role: string;
}

// Bad
interface IStaffMember {
  name: any;
}
```

### コンポーネント

- 関数コンポーネントを使用
- デフォルトエクスポートを使用
- Props型は同ファイル内で定義

```typescript
interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

### スタイリング

- Tailwind CSS を使用
- カスタムCSS変数は `globals.css` で定義
- レスポンシブは `md:` `lg:` プレフィックスを使用

```tsx
// モバイルファースト
<div className="text-sm md:text-base lg:text-lg">
  レスポンシブテキスト
</div>
```

### カラーパレット

```css
/* globals.css で定義済み */
--color-primary: #1a1a1a;           /* メインカラー */
--color-accent-blue: #7EC8E3;       /* アクセント青 */
--color-accent-pink: #FFB6C1;       /* アクセントピンク */
--color-accent-yellow: #FFF8DC;     /* アクセント黄 */
--color-accent-mint: #98D8C8;       /* アクセントミント */
```

---

## データの管理

### サイトデータ（src/lib/data.ts）

- 事業所情報
- スタッフ情報
- 特徴・サービス内容
- 会社情報

### 採用データ（src/lib/recruit-data.ts）

- 求人情報
- 給与・待遇
- 祝い金情報
- 選考プロセス

データを更新する場合は、該当ファイルを編集してください。

---

## API開発

### お問い合わせAPI

`src/app/api/contact/route.ts`

```typescript
export async function POST(request: Request) {
  const body = await request.json();

  // バリデーション
  // メール送信処理

  return Response.json({ success: true });
}
```

---

## テスト

### 手動テスト項目

1. **レスポンシブ確認**
   - モバイル（375px）
   - タブレット（768px）
   - デスクトップ（1024px以上）

2. **ブラウザ確認**
   - Chrome
   - Safari
   - Firefox
   - Edge

3. **機能確認**
   - ナビゲーション
   - スムーススクロール
   - お問い合わせフォーム
   - 外部リンク

---

## トラブルシューティング

### npm install が失敗する

```bash
# キャッシュをクリア
npm cache clean --force

# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### ビルドエラーが発生する

```bash
# TypeScriptエラーを確認
npx tsc --noEmit

# 詳細なビルドログを確認
npm run build 2>&1 | tee build.log
```

### 開発サーバーが起動しない

```bash
# ポートが使用中の場合
lsof -i :3000
kill -9 <PID>

# 別ポートで起動
npm run dev -- -p 3100
```

---

## Git運用

### ブランチ戦略

```
main          # 本番環境
├── develop   # 開発環境
├── feature/* # 機能開発
└── hotfix/*  # 緊急修正
```

### コミットメッセージ

```
feat: 新機能追加
fix: バグ修正
style: スタイル変更
docs: ドキュメント更新
refactor: リファクタリング
```

### プルリクエスト

1. feature ブランチを作成
2. 変更を実装
3. develop へPRを作成
4. レビュー後マージ

---

## 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [TypeScript ドキュメント](https://www.typescriptlang.org/docs/)
- [React ドキュメント](https://react.dev/)
