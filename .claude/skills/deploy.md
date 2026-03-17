---
name: deploy
description: 手動ビルド・デプロイスキル。コミット解析によるアップデート情報自動追加、ドキュメント確認、ビルド、Firebase Hostingデプロイを一括実行する。
---

# デプロイスキル

## 目的

コミット履歴を解析してユーザー向け更新情報を自動生成し、ドキュメント整合性を確認したうえで、ビルドとFirebase Hostingへのデプロイを一括実行する。

## 前提条件

- mainブランチ上で実行すること（作業ブランチのマージ後に実行）
- Firebase CLIがインストール・認証済みであること

## 手順

### Phase 1: コミット解析

`src/lib/updates-data.ts` を読み、`updates[0].date`（最新エントリの日付）を取得する。`--after` は指定日を含まないため、同日コミットも取得するために前日を基準日とする。

```bash
git log --format="%H|%s" --no-merges --name-status --after="{最新日付の前日}" main
```

この1コマンドでコミットハッシュ・メッセージ・変更ファイル（A/M/Dステータス付き）を一括取得する。各コミットを以下のルールで分類する。

**skip判定（先に評価）**: prefixが `refactor:` / `chore:` / `docs:` / `test:` / `ci:` / `perf:` / `build:` → スキップ

**new判定**: 上記以外で、変更ファイルに `A	src/app/**/page.tsx`（Aステータス＝新規追加）が含まれる場合

- `type: "new"`
- `title`: コミットメッセージから `prefix: `（コロン+半角スペース）を除去し、先頭・末尾の空白をトリムしたテキスト
- `link`: `src/app/page.tsx` → `/`、`src/app/xxx/page.tsx` → `/xxx` に変換。`[slug]` を含むパスは `link` 省略

**improve判定**: `feat:` / `fix:` / `style:` でnew判定に非該当の場合

- `type: "improve"`
- `title`: 同上のprefix除去ルール
- `link`: 変更ファイルに `src/app/xxx/page.tsx`（既存ファイル）が含まれればそのパスを設定。`[slug]` を含むパスおよび該当なしの場合は省略

**フォールバック**: 上記いずれのprefixにも該当しないコミットは `type: "improve"` として扱う。

**日付**: デプロイ実行日（今日の日付）で全エントリを1つのUpdateオブジェクトにまとめる。

**該当コミットなし** → 「更新情報なし」と表示してPhase 2をスキップし、Phase 3へ進む。

---

### Phase 2: 更新反映

`src/lib/updates-data.ts` の `updates` 配列先頭に新エントリを挿入する。同日エントリが既に存在する場合は、既存エントリの `items` に追記する（新規エントリを作らない）。

```typescript
{
  date: "YYYY-MM-DD",  // 今日の日付
  items: [
    { type: "new", title: "...", link: "/..." },
    { type: "improve", title: "..." },
  ],
},
```

次に、CLAUDE.md「ドキュメント更新トリガー」に従い、Phase 1で解析した全コミットの変更ファイルに基づいてドキュメントを確認・更新する。

実際に更新したファイルのみステージングしてコミットする。

```bash
git add <更新したファイル>
git commit -m "docs: 更新情報・ドキュメントを最新化"
```

---

### Phase 3: ビルド検証

```bash
npm run build
```

- 成功 → Phase 4へ
- 失敗 → エラーログを表示し、「ビルド失敗。エラーを修正・コミットしてから再度 `/deploy` を実行してください」と出力してデプロイを実行しない。再実行時、Phase 2のコミット（`docs:` prefix）は自動的にskip判定されるため重複エントリは発生しない

---

### Phase 4: デプロイ

```bash
firebase deploy --only hosting --project=fractal-hokan-funabashi
```

- 成功 → デプロイURLを出力
- 失敗 → 「デプロイ失敗。認証を確認してから再度 `/deploy` を実行してください」と出力し、`firebase login --reauth` の実行を案内する

---

## 出力例

```
## デプロイ結果

### 更新情報
- [new] 精神科訪問看護の専用ページを追加 → /services/psychiatric-nursing
- [improve] フッターの4カラム構成を再設計

### ドキュメント
- [x] CLAUDE.md - 更新不要
- [x] docs/COMPONENTS.md - 更新不要
- [x] docs/DEPLOYMENT.md - 更新不要

### ビルド
- [x] npm run build - 成功

### デプロイ
- [x] firebase deploy - 成功
- URL: https://fractal-hokan.com
```
