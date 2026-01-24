# salesアプリ Flyerモデルのorientation修正計画書

作成日: 2026-01-25

## 概要

salesアプリでFlyerモデルに`orientation`フィールドを追加した実装について、コード品質レビューでCriticalおよびImportantな問題が検出されました。本番環境デプロイ前に必須の修正を計画的に実施します。

## 検出された問題

### Critical（致命的 - 必ず修正）

**問題1: データベースマイグレーションが未実行**

- **現状**: `packages/db/prisma/schema.prisma`に`orientation`フィールドを追加したが、マイグレーションファイルが作成されていない
- **影響**: 本番環境でスキーマとDBの不整合が発生し、チラシ作成/編集時にエラーが発生する
- **修正**: Prismaマイグレーションを実行してDBスキーマを更新

### Important（重要 - 修正推奨）

**問題2: Server Actionでのorientation処理が不完全**

- **現状**: `apps/sales/src/actions/flyers.ts`の`createFlyer`と`updateFlyer`関数のパラメータ型定義に`orientation`が含まれていない
- **影響**: フォームから送信された`orientation`値が無視され、常にデフォルト値（`"portrait"`）が保存される
- **修正**: 型定義に`orientation`フィールドを追加

## 修正計画

### フェーズ1: データベースマイグレーション（Critical）

**目的**: DBスキーマに`orientation`カラムを追加

**手順:**

1. fractal-ecosystemリポジトリに移動
   ```bash
   cd /Users/t.asai/code/fractal-ecosystem
   ```

2. Prismaマイグレーションを実行
   ```bash
   npx prisma migrate dev --name add_flyer_orientation
   ```

3. マイグレーション成功を確認
   ```bash
   npx prisma migrate status
   ```

4. 既存データにデフォルト値が適用されていることを確認
   ```bash
   npx prisma studio
   # Flyerテーブルを開いてorientation列を確認
   ```

**期待結果:**
- `packages/db/prisma/migrations/[timestamp]_add_flyer_orientation/migration.sql`が作成される
- DBに`orientation`カラムが追加される（デフォルト値: `"portrait"`）
- 既存データにデフォルト値が自動適用される

**所要時間**: 5分

---

### フェーズ2: Server Actionの型定義修正（Important）

**目的**: フォームから送信された`orientation`値がDBに保存されるようにする

**ファイル**: `/Users/t.asai/code/fractal-ecosystem/apps/sales/src/actions/flyers.ts`

**修正内容:**

#### 修正1: createFlyer関数（line 255-266）

```typescript
// Before
export async function createFlyer(data: {
  companyId: string;
  issueDate: Date;
  distributionStart?: Date;
  distributionEnd?: Date;
  title: string;
  labelId?: string;
  monthLabelId?: string;
  categoryLabelId?: string;
  frontFileUrl?: string;
  backFileUrl?: string;
}): Promise<ActionResult<{ id: string; title: string }>>

// After
export async function createFlyer(data: {
  companyId: string;
  issueDate: Date;
  distributionStart?: Date;
  distributionEnd?: Date;
  title: string;
  labelId?: string;
  monthLabelId?: string;
  categoryLabelId?: string;
  frontFileUrl?: string;
  backFileUrl?: string;
  orientation?: "portrait" | "landscape"; // 追加
}): Promise<ActionResult<{ id: string; title: string }>>
```

#### 修正2: updateFlyer関数（line 296-310）

```typescript
// Before
export async function updateFlyer(
  id: string,
  data: {
    issueDate?: Date;
    distributionStart?: Date;
    distributionEnd?: Date;
    title?: string;
    labelId?: string | null;
    monthLabelId?: string | null;
    categoryLabelId?: string | null;
    frontFileUrl?: string;
    backFileUrl?: string;
    isActive?: boolean;
  }
): Promise<ActionResult<{ id: string; title: string }>>

// After
export async function updateFlyer(
  id: string,
  data: {
    issueDate?: Date;
    distributionStart?: Date;
    distributionEnd?: Date;
    title?: string;
    labelId?: string | null;
    monthLabelId?: string | null;
    categoryLabelId?: string | null;
    frontFileUrl?: string;
    backFileUrl?: string;
    isActive?: boolean;
    orientation?: "portrait" | "landscape"; // 追加
  }
): Promise<ActionResult<{ id: string; title: string }>>
```

**期待結果:**
- フォームで「横向き」を選択した場合、DBに`"landscape"`が保存される
- フォームで「縦向き」を選択した場合、DBに`"portrait"`が保存される
- 型安全性が保証される

**所要時間**: 5分

---

### フェーズ3: ビルドテストと動作確認

**手順:**

1. salesアプリのビルドテスト
   ```bash
   cd /Users/t.asai/code/fractal-ecosystem/apps/sales
   npm run build
   ```

2. 開発環境で動作確認
   ```bash
   npm run dev
   ```

   - 新規チラシ作成で「横向き」を選択して保存
   - DBで`orientation: "landscape"`が保存されていることを確認
   - チラシ編集で向きを変更して保存
   - DBで値が更新されていることを確認

3. fractal-hpとの連携確認
   - salesアプリで作成したチラシデータを`flyers-data.ts`形式でエクスポート
   - `orientation`フィールドが正しく含まれていることを確認

**期待結果:**
- ビルドエラーなし
- チラシの向き選択が正常に動作
- DBに正しい値が保存される

**所要時間**: 10分

---

### フェーズ4: Gitコミット

**コミットメッセージ:**
```
fix: FlyerモデルのorientationフィールドのマイグレーションとServer Action修正

Critical修正:
- Prismaマイグレーションを実行してDBにorientation列を追加
- 既存データにデフォルト値 "portrait" を適用

Important修正:
- createFlyer関数の型定義にorientationフィールドを追加
- updateFlyer関数の型定義にorientationフィールドを追加
- フォームから送信されたorientation値がDBに保存されるように修正

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**所要時間**: 3分

---

## 実装の優先度

| フェーズ | 重要度 | 所要時間 | 依存関係 |
|---------|--------|---------|---------|
| フェーズ1 | Critical | 5分 | なし |
| フェーズ2 | Important | 5分 | フェーズ1完了後 |
| フェーズ3 | 必須 | 10分 | フェーズ2完了後 |
| フェーズ4 | 必須 | 3分 | フェーズ3完了後 |

**合計所要時間**: 約23分

---

## リスク評価

### 低リスク

- **DBマイグレーション**: デフォルト値が設定されているため、既存データへの影響なし
- **型定義追加**: 既存の処理を変更せず、型定義を追加するのみ
- **後方互換性**: `orientation`はオプショナルフィールドのため、既存コードへの影響なし

### 対策

- **ロールバック計画**: マイグレーション失敗時は`npx prisma migrate reset`で初期化
- **バックアップ**: マイグレーション前にDBバックアップ推奨（開発環境のみ）

---

## 検証チェックリスト

- [ ] Prismaマイグレーションが正常に完了
- [ ] DBに`orientation`列が追加されている
- [ ] 既存チラシデータに`"portrait"`が設定されている
- [ ] createFlyer関数で`orientation`が保存される
- [ ] updateFlyer関数で`orientation`が更新される
- [ ] ビルドエラーがない
- [ ] 新規チラシ作成で「横向き」選択が動作
- [ ] チラシ編集で向き変更が動作
- [ ] TypeScriptの型エラーがない

---

## 本番環境デプロイ前の確認事項

1. ✅ すべてのCritical問題が修正されている
2. ✅ すべてのImportant問題が修正されている
3. ✅ ビルドテストが成功している
4. ✅ 開発環境での動作確認が完了している
5. ✅ Gitコミットが完了している
6. ✅ マイグレーションファイルがリポジトリに含まれている

---

## まとめ

本計画書に従って修正を実施することで、salesアプリのFlyerモデル`orientation`機能が完全に動作するようになります。Critical問題の修正により本番環境でのエラーを防ぎ、Important問題の修正によりユーザーの選択が正しくDBに保存されるようになります。

全フェーズの実装は約23分で完了し、リスクは低く、後方互換性も維持されます。
