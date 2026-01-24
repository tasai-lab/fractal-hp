# レスポンシブデザイン改善・ページ統一・チラシ連動 設計書

作成日: 2026-01-24

## 概要

fractal-hp（フラクタル訪問看護 船橋 Webサイト）の全体的なUI/UX改善を実施します。主な改善点は以下の通りです:

1. より柔軟なレスポンシブデザインの実装
2. 各ページのmainページ雰囲気への統一
3. 会社紹介ページでのロゴ3色の活用
4. 求人ページの情報整理とカード化
5. チラシページとsalesアプリの自動連動

## 目標

- **レスポンシブ**: モバイル・タブレット・デスクトップで滑らかに変化するUI
- **統一感**: mainページの落ち着きながらも明るいエメラルド/グリーン系を基調とした統一デザイン
- **ブランディング**: 会社紹介ページでロゴの3色を効果的に使用
- **情報設計**: 求人ページを視覚的に整理し、理解しやすく
- **運用効率化**: salesアプリでチラシ追加時に自動的にHPへ反映

---

## 1. デザインシステムの拡張

### 1.1 カラーパレット

#### ロゴの3色（新規追加）

会社ロゴ（`/images/logos/corporate-logo.png`）から抽出した3色を追加:

```typescript
colors: {
  'logo-light-green': '#7FC5A0',  // ライトグリーン/ミントグリーン
  'logo-dark-green': '#0D5643',   // ダークグリーン/深緑
  'logo-yellow': '#F4E951',       // イエロー/黄色
}
```

#### ページ別カラー方針

| ページ | カラー方針 |
|--------|-----------|
| トップページ | エメラルド/グリーン系（現行維持） |
| フラクタルを知る | ロゴ3色をアクセントとして均等に配置 |
| 求人ページ | mainページと同じエメラルド/グリーン系（現行のピンク/ブルー系から変更） |
| チラシページ | ブルー系（現行維持） |

### 1.2 レスポンシブタイポグラフィ

`clamp()`関数を使用した滑らかなサイズ変化:

```typescript
fontSize: {
  'fluid-xs': 'clamp(0.75rem, 1.5vw, 0.875rem)',   // 12px → 14px
  'fluid-sm': 'clamp(0.875rem, 1.8vw, 1rem)',      // 14px → 16px
  'fluid-base': 'clamp(1rem, 2vw, 1.125rem)',      // 16px → 16px
  'fluid-lg': 'clamp(1.125rem, 2.5vw, 1.5rem)',    // 18px → 24px
  'fluid-xl': 'clamp(1.25rem, 3vw, 1.875rem)',     // 20px → 30px
  'fluid-2xl': 'clamp(1.5rem, 3.5vw, 2.25rem)',    // 24px → 36px
  'fluid-3xl': 'clamp(1.875rem, 4vw, 3rem)',       // 30px → 48px
  'fluid-4xl': 'clamp(2.25rem, 5vw, 3.75rem)',     // 36px → 60px
}
```

### 1.3 レスポンシブスペーシング

```typescript
spacing: {
  'fluid-xs': 'clamp(0.5rem, 1vw, 0.75rem)',       // 8px → 12px
  'fluid-sm': 'clamp(0.75rem, 1.5vw, 1rem)',       // 12px → 16px
  'fluid-md': 'clamp(1rem, 2vw, 1.5rem)',          // 16px → 24px
  'fluid-lg': 'clamp(1.5rem, 3vw, 2rem)',          // 24px → 32px
  'fluid-xl': 'clamp(2rem, 4vw, 3rem)',            // 32px → 48px
  'fluid-2xl': 'clamp(3rem, 5vw, 4rem)',           // 48px → 64px
}
```

### 1.4 ブレイクポイント戦略

- **モバイル**: 〜767px
- **タブレット**: 768px〜1023px（新規強化）
- **デスクトップ**: 1024px〜

---

## 2. 共通コンポーネントとアニメーション

### 2.1 スクロールアニメーション用フック

```typescript
// src/hooks/useScrollAnimation.ts
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

### 2.2 カウントアップコンポーネント

入社祝い金などの数値を画面表示時にアニメーション:

```typescript
// src/components/CountUp.tsx
export function CountUp({ end, duration = 2000 }) {
  const { ref, isVisible } = useScrollAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const increment = end / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}
```

### 2.3 アニメーションクラス

```css
/* globals.css に追加 */
@layer utilities {
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

---

## 3. 「フラクタルを知る」ページの改善

### 3.1 ロゴ3色の配置計画

#### ライトグリーン (#7FC5A0)
- 基本理念セクションのグラデーション背景
- 行動指針の選択時のアクセント色
- カード背景の淡い色

#### ダークグリーン (#0D5643)
- ヒーローセクションのロゴ周りの装飾
- DAPAEセクションの背景（現在のslate-800から変更）
- CTAボタンの背景色

#### イエロー (#F4E951)
- 事業内容カードのアクセントボーダー
- ロゴの意味セクションの装飾
- ホバーエフェクトのアクセント
- セクション区切りの装飾三角形

### 3.2 実装例

```tsx
// ヒーローセクション
<section className="bg-gradient-to-br from-logo-light-green/10 via-white to-logo-yellow/10">
  <div className="absolute top-20 left-10">
    <svg className="fill-logo-yellow opacity-10">
      <polygon points="50,0 100,100 0,100" />
    </svg>
  </div>
</section>

// DAPAEセクション
<section className="bg-logo-dark-green text-white">
  {/* 現行のslate-800から変更 */}
</section>

// 事業内容カード
<div className="border-l-4 border-logo-yellow hover:border-logo-light-green transition-colors">
```

---

## 4. 求人ページの改善

### 4.1 カラー変更

```tsx
// 現行 → 変更後
bg-[var(--color-accent-pink-light)] → bg-gradient-to-br from-emerald-50 to-teal-50
bg-accent-blue → bg-emerald-600
bg-accent-mint → bg-teal-500
text-accent-blue → text-emerald-600
```

### 4.2 カード化レイアウト

全ての項目をカード形式で視覚的に区切り、最初から全て表示:

```tsx
<div className="space-y-fluid-md">
  {/* 仕事内容カード */}
  <Card icon="💼" title="仕事内容" accentColor="emerald">
    <p className="mb-fluid-sm">{description}</p>
    <ul className="space-y-2">
      {duties.map(duty => <li>● {duty}</li>)}
    </ul>
  </Card>

  {/* 訪問エリアカード */}
  <Card icon="📍" title="訪問エリア" accentColor="teal">
    <div className="flex flex-wrap gap-2">
      {areas.map(area => (
        <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
          {area}
        </span>
      ))}
    </div>
  </Card>

  {/* 給与カード */}
  <Card icon="💰" title="給与" accentColor="emerald">
    <p className="text-fluid-3xl font-bold text-emerald-600">
      {salary}
    </p>
    <div className="bg-emerald-50 rounded-xl p-fluid-md mt-fluid-sm">
      <h5 className="font-bold mb-2">内訳</h5>
      <ul className="space-y-2">
        {breakdown.map(item => (
          <li className="flex justify-between">
            <span>{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  </Card>

  {/* 勤務時間・休日カード */}
  <Card icon="🕐" title="勤務時間・休日" accentColor="teal">
    <div className="grid grid-cols-2 gap-fluid-md">
      <div>
        <h5 className="font-bold mb-2">勤務時間</h5>
        <p>{workHours}</p>
      </div>
      <div>
        <h5 className="font-bold mb-2">年間休日</h5>
        <p className="text-fluid-2xl font-bold text-teal-600">{holidays}</p>
      </div>
    </div>
  </Card>

  {/* 待遇・福利厚生カード */}
  <Card icon="🎁" title="待遇・福利厚生" accentColor="emerald">
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {benefits.map(benefit => (
        <li className="flex items-start gap-2">
          <span className="text-emerald-500">✓</span>
          {benefit}
        </li>
      ))}
    </ul>
  </Card>
</div>
```

### 4.3 ホバーエフェクト

```tsx
// カード全体
className="bg-white rounded-xl p-fluid-md shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-300"

// アイコン
<span className="inline-block hover:scale-110 hover:rotate-6 transition-transform duration-200">
  💼
</span>
```

### 4.4 入社祝い金のカウントアップ

```tsx
<h2 className="text-fluid-3xl font-bold">
  入社祝い金 最大<CountUp end={300000} />円
</h2>
```

---

## 5. チラシ連動システム

### 5.1 システム概要

salesアプリ（fractal-ecosystem/apps/sales）でチラシを追加・更新すると、fractal-hpのチラシページに自動的に反映される仕組みを構築します。

**フロー:**
1. salesアプリでチラシ追加・更新
2. Firestore onWrite トリガー
3. Cloud Functions実行
4. GitHub APIでfractal-hpの`flyers-data.ts`を更新
5. Git commit & push
6. Firebase Hosting 自動デプロイ

### 5.2 salesアプリ側の修正

#### データベーススキーマ追加

```prisma
// fractal-ecosystem/packages/db/prisma/schema.prisma
model Flyer {
  id                String   @id @default(cuid())
  title             String
  issueDate         DateTime
  orientation       String   @default("portrait") // 追加: "portrait" | "landscape"
  frontFileUrl      String?
  backFileUrl       String?
  isActive          Boolean  @default(true)
  // 既存フィールド...
  monthLabel        FlyerLabel? @relation("MonthLabel", fields: [monthLabelId], references: [id])
  monthLabelId      String?
  categoryLabel     FlyerLabel? @relation("CategoryLabel", fields: [categoryLabelId], references: [id])
  categoryLabelId   String?
  // ...
}
```

#### バリデーションスキーマ更新

```typescript
// src/lib/validations/flyer.ts
export const flyerSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  issueDate: z.date({ message: "発行日を選択してください" }),
  orientation: z.enum(["portrait", "landscape"]).default("portrait"), // 追加
  frontFileUrl: z.string().optional(),
  backFileUrl: z.string().optional(),
  // 既存フィールド...
});
```

#### チラシ登録フォームに向き選択追加

```tsx
// src/components/flyers/flyer-form.tsx
<FormField
  control={form.control}
  name="orientation"
  render={({ field }) => (
    <FormItem>
      <FormLabel>向き *</FormLabel>
      <FormControl>
        <RadioGroup
          value={field.value}
          onValueChange={field.onChange}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="portrait" id="portrait" />
            <label htmlFor="portrait" className="cursor-pointer">
              縦向き（A4縦）
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="landscape" id="landscape" />
            <label htmlFor="landscape" className="cursor-pointer">
              横向き（A4横）
            </label>
          </div>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

#### 画像プレビューの向き対応

```tsx
// 表面・裏面プレビューのaspect ratioを動的に変更
const orientation = form.watch("orientation");
const aspectClass = orientation === "landscape" ? "aspect-[297/210]" : "aspect-[210/297]";

<div className={`relative ${aspectClass} ...`}>
  {/* プレビュー表示 */}
</div>
```

### 5.3 fractal-hp側のデータ構造

```typescript
// src/lib/flyers-data.ts
export interface Flyer {
  id: string;
  title: string;
  date: string; // "2024年12月号"
  type: string; // monthLabelのname or categoryLabelのname
  orientation: "portrait" | "landscape";
  frontImage: string; // Firebase Storage URL
  backImage: string;  // Firebase Storage URL
}

export const flyerTypes = [
  { id: "month", label: "月刊" },
  { id: "category", label: "カテゴリ別" },
];

export const flyers: Flyer[] = [
  // このデータはCloud Functionsによって自動生成される
];
```

### 5.4 Cloud Functions実装

```typescript
// fractal-ecosystem/functions/src/syncFlyersToHP.ts
import * as functions from 'firebase-functions';
import { prisma } from '@fractal/db';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const syncFlyersToHP = functions.firestore
  .document('flyers/{flyerId}')
  .onWrite(async (change, context) => {
    try {
      // 1. isActive=trueのチラシを取得
      const flyers = await prisma.flyer.findMany({
        where: {
          companyId: 'fractal-hokan-funabashi', // 該当会社のみ
          isActive: true
        },
        include: {
          monthLabel: true,
          categoryLabel: true
        },
        orderBy: { issueDate: 'desc' },
      });

      // 2. fractal-hpのflyers-data.ts形式に変換
      const flyerData = flyers.map(f => ({
        id: f.id,
        title: f.title,
        date: formatDate(f.issueDate), // "2024年12月号" 形式
        type: f.monthLabel?.name || f.categoryLabel?.name || "その他",
        orientation: f.orientation || "portrait",
        frontImage: f.frontFileUrl || "",
        backImage: f.backFileUrl || "",
      }));

      // 3. TypeScriptファイルの内容を生成
      const fileContent = `// このファイルは自動生成されます
// 最終更新: ${new Date().toISOString()}

export interface Flyer {
  id: string;
  title: string;
  date: string;
  type: string;
  orientation: "portrait" | "landscape";
  frontImage: string;
  backImage: string;
}

export const flyerTypes = [
  { id: "month", label: "月刊" },
  { id: "category", label: "カテゴリ別" },
];

export const flyers: Flyer[] = ${JSON.stringify(flyerData, null, 2)};
`;

      // 4. GitHub APIでfractal-hpリポジトリのflyers-data.tsを更新
      const owner = 'your-org';
      const repo = 'fractal-hp';
      const path = 'src/lib/flyers-data.ts';
      const branch = 'main';

      // 現在のファイルのSHAを取得
      const { data: currentFile } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });

      // ファイルを更新
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message: `chore: Update flyers data - ${new Date().toISOString()}`,
        content: Buffer.from(fileContent).toString('base64'),
        sha: 'sha' in currentFile ? currentFile.sha : undefined,
        branch,
      });

      // 5. Firebase Hostingへのデプロイは、GitHubのActions経由で自動実行される想定
      console.log('Flyers data synced to fractal-hp successfully');

    } catch (error) {
      console.error('Error syncing flyers:', error);
      throw error;
    }
  });

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}年${month}月号`;
}
```

### 5.5 GitHub Actions設定（参考）

fractal-hpリポジトリに以下のワークフローを追加:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main
    paths:
      - 'src/lib/flyers-data.ts'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
```

---

## 6. 実装フェーズ

### フェーズ1: 基盤整備（最優先）

**タスク:**
1. `tailwind.config.ts`にロゴ3色追加
2. `tailwind.config.ts`にfluid値（fontSize, spacing）追加
3. `src/app/globals.css`にアニメーションクラス追加
4. `src/hooks/useScrollAnimation.ts`作成
5. `src/components/CountUp.tsx`作成

**検証方法:**
- ビルドエラーがないこと
- 各コンポーネントが正しくインポートできること

### フェーズ2: ページ改善

**タスク:**
1. `src/app/about-fractal/page.tsx`にロゴ3色配置
   - ヒーローセクションの背景グラデーション変更
   - DAPAEセクションをslate-800からlogo-dark-greenに変更
   - 事業内容カードにlogo-yellowのボーダー追加
   - 装飾的な三角形の色を3色に分散
2. `src/app/recruit/page.tsx`の全面改修
   - 背景色をエメラルド/グリーン系に変更
   - カード形式で情報を整理
   - CountUpコンポーネントを入社祝い金に適用
   - スクロールアニメーション追加
3. 全ページにfluid値を適用
   - 固定px値をfluid-*クラスに置き換え
   - タブレットサイズでの表示を確認

**検証方法:**
- モバイル（375px）、タブレット（768px、1024px）、デスクトップ（1440px）で表示確認
- ホバーエフェクト、アニメーションの動作確認
- 各セクションの色配置が設計通りか確認

### フェーズ3: チラシ連動

**タスク:**
1. salesアプリのDBスキーマ更新
   - `prisma/schema.prisma`にorientation追加
   - マイグレーション実行
2. salesアプリのチラシ登録フォーム更新
   - バリデーションスキーマ更新
   - フォームに向き選択追加
   - プレビュー表示を向きに対応
3. Cloud Functions実装
   - `syncFlyersToHP.ts`作成
   - GitHub API連携設定
   - 環境変数（GITHUB_TOKEN）設定
4. fractal-hpのflyers-data.ts構造更新
   - インターフェースにorientation追加
   - flyersページで向きに応じた表示

**検証方法:**
- salesアプリでチラシ追加→fractal-hpに反映されるか確認
- 縦向き・横向きチラシが正しく表示されるか確認
- Cloud Functionsのログでエラーがないか確認

---

## 7. 技術仕様

### 7.1 対応ブラウザ

- Chrome 最新版
- Safari 最新版
- Firefox 最新版
- Edge 最新版
- iOS Safari 14+
- Android Chrome 最新版

### 7.2 パフォーマンス目標

- Lighthouse Performance スコア 90以上
- First Contentful Paint (FCP) 1.5秒以内
- Largest Contentful Paint (LCP) 2.5秒以内
- Cumulative Layout Shift (CLS) 0.1以下

### 7.3 アクセシビリティ

- WCAG 2.1 AA準拠
- キーボード操作対応
- スクリーンリーダー対応

---

## 8. リスクと対策

### リスク1: Cloud Functionsの実行失敗

**対策:**
- エラーハンドリングとリトライロジックの実装
- Slack/メール通知の設定
- 手動でflyers-data.tsを更新できる手順書作成

### リスク2: レスポンシブ対応の複雑化

**対策:**
- 段階的にfluid値を適用し、各段階で検証
- 主要なブレイクポイントでのスクリーンショット比較

### リスク3: 既存デザインの破壊

**対策:**
- Git branch戦略（feature branchで作業）
- 各フェーズ完了後にステージング環境で確認
- ロールバック手順の準備

---

## 9. 今後の拡張性

### 9.1 CMSへの移行

将来的にチラシ以外のコンテンツもCMS化する場合、同様の仕組みで連動可能:
- ニュース・お知らせ
- スタッフ紹介
- よくある質問

### 9.2 多言語対応

現在は日本語のみだが、将来的に英語対応する場合:
- i18nライブラリの導入
- flyers-data.tsに言語フィールド追加

### 9.3 パフォーマンス最適化

- 画像の遅延読み込み（Intersection Observer）
- WebP形式への変換
- CDNの活用

---

## 10. まとめ

この設計により、以下の改善が実現されます:

1. **ユーザー体験の向上**: 滑らかなレスポンシブデザインで、あらゆるデバイスで快適に閲覧可能
2. **ブランド統一**: ロゴの3色を活かした統一感のあるデザイン
3. **情報の見やすさ**: カード化とアニメーションで、求人情報が直感的に理解しやすく
4. **運用効率化**: salesアプリとの連動で、チラシ更新作業が自動化
5. **保守性向上**: デザインシステムの整備で、今後の修正・拡張が容易に

段階的な実装により、リスクを最小限に抑えつつ、確実に改善を進めることができます。
