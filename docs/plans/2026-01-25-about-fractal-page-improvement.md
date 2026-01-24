# フラクタルを知るページ改善設計書

作成日: 2026-01-25

## 概要

「フラクタルを知る」ページのデザイン・レイアウト改善とユーザー体験向上を目的とした設計書。特にDAPAEセクションと7つの行動指針セクションを「理解しやすく、印象に残りやすく」改善する。

## 課題

現状の「フラクタルを知る」ページでは、DAPAEや7つの行動指針が抽象的で理解しづらく、印象に残りにくいという課題がある。

## 設計アプローチ

**選択したアプローチ: ステップバイステップ・ストーリー形式**

- ビジュアル要素を強化（アイコン、イラスト、アニメーション）
- ストーリー性を持たせる（具体的な事例、Before/After）
- シンプルに整理する（情報を絞る、階層を明確に）

## 設計詳細

### 1. 全体構造とナビゲーション

#### 1.1 固定サイドナビゲーション（デスクトップ）

**配置:**
- 画面右側に固定（`right: 2rem`、`top: 50%`で中央配置）
- 各セクションに対応する7つのドット

**ドットの状態:**
- 未到達: 小さい灰色の円（8px）
- 現在位置: 大きいエメラルド色の円（12px）、パルスアニメーション
- 通過済み: 中サイズの薄いエメラルド色（10px）

**インタラクション:**
- ホバー時: セクション名をツールチップ表示（例: "基本理念"）
- クリックで該当セクションへスムーズスクロール（`scroll-behavior: smooth`）

**実装:**
```tsx
const sections = [
  { id: "hero", label: "トップ" },
  { id: "philosophy", label: "基本理念" },
  { id: "business", label: "事業内容" },
  { id: "vision", label: "ビジョン" },
  { id: "guidelines", label: "行動指針" },
  { id: "dapae", label: "DAPAE" },
  { id: "logo", label: "ロゴ" },
];

// Intersection Observerで現在位置を検出
// スクロール時に該当ドットをハイライト
```

#### 1.2 モバイル対応ナビゲーション

**768px以下:**
- サイドナビゲーションを非表示
- ページ上部に横スクロール可能なタブメニュー
- 固定ヘッダー（`sticky top-0`）
- 各タブに短縮名（例: "理念" "DAPAE" "行動指針"）

#### 1.3 情報の階層整理

**必読（デフォルト表示）:**
1. ヒーローセクション
2. 基本理念
3. DAPAE（ストーリー付き）
4. 7つの行動指針

**詳細（コンパクト表示）:**
5. 事業内容 → カード2枚を横並び（現在のまま）、高さを抑える
6. 成長戦略とビジョン → 要約のみ表示 + 「詳しく見る」で展開

**補足（折りたたみ）:**
7. ロゴの意味 → 初期状態では「ロゴに込めた想い」タイトルのみ、クリックで展開

#### 1.4 パフォーマンス最適化

- 初期表示: ヒーロー + 基本理念のみレンダリング
- スクロールに応じて次のセクションを遅延読み込み（Intersection Observer）
- パフォーマンス向上とアニメーションの滑らかさ確保

---

### 2. DAPAEセクションの改善

#### 2.1 ストーリーシナリオ

**テーマ: 訪問看護ステーションの業務改善**

DAPAEサイクルを実例で説明し、「本当に使っているフレームワーク」という信頼性を伝える。

#### 2.2 ストーリー展開

**導入カード（現状の課題）**

**内容:**
- 「ある日、スタッフから『書類作業が多すぎる』という声が…」
- 簡単な状況説明（2-3行）

**ビジュアル:**
- 背景: 薄暗い色（課題を示唆）
- イラスト: シンプルな吹き出しアイコン

**レイアウト:**
```tsx
<div className="bg-slate-700/50 rounded-xl p-6 mb-6 border-l-4 border-yellow-400">
  <p className="text-white/90 text-sm md:text-base italic">
    「ある日、スタッフから『書類作業が多すぎる』という声が上がりました。
    感情的には『大変そうだ』と思いますが、フラクタルでは感情だけで判断しません。
    まずはデータを集めるところから始めます。」
  </p>
</div>
```

---

**D（Data - データ収集）**

**構造:**
- 左: 頭文字「D」（現在のまま）
- 右: 説明カード

**カード内の構成（上から順に）:**

1. **ストーリーセクション**（背景色を少し濃く）
   - 「まず、感情ではなく事実を集めました」
   - 具体例: 「1日の書類作業時間を計測 → 平均2.5時間」「どの書類に時間がかかるか記録 → 訪問記録が最多」

2. **説明セクション**（現在のdescription）
   - 「単なる数字や出来事を、色眼鏡なしに集める段階。」

3. **具体例セクション**（現在のexample）
   - 訪問件数、キャンセル率、スタッフの稼働時間…

**レイアウト例:**
```tsx
<div className="flex items-start gap-4 md:gap-6">
  {/* 左側の頭文字 */}
  <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 border-2 border-white/20">
    <span className="text-2xl md:text-4xl font-bold text-white">D</span>
  </div>

  {/* 右側のカード */}
  <div className="flex-1 bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
    {/* タイトル */}
    <h4>Data</h4>
    <p>事実の収集</p>

    {/* ストーリー */}
    <div className="bg-white/5 rounded-lg p-3 mb-3 border-l-2 border-emerald-400">
      <p className="text-xs text-emerald-200 font-bold mb-1">現場の物語:</p>
      <p>「まず、感情ではなく事実を集めました。1日の書類作業時間を計測したところ、平均2.5時間。どの書類に時間がかかるか記録すると、訪問記録が最多でした。」</p>
    </div>

    {/* 説明 */}
    <p>{step.description}</p>

    {/* 具体例 */}
    <div className="bg-white/5 rounded-lg p-3 border-l-2 border-teal-400">
      <p className="text-xs text-teal-200 font-bold mb-1">具体例:</p>
      <p>{step.example}</p>
    </div>
  </div>
</div>
```

---

**A（Analysis - 分析）**

**ストーリー:**
- 「データを分析すると、パターンが見えてきました」
- 具体例: 「手書き → PC入力 → 印刷という二度手間」「同じ内容を複数の書類に記入」

**ビジュアル:**
- Before/After対比（2カラムのミニ図解）

**Before:**
```
手書き → PC入力 → 印刷
   ↓        ↓       ↓
 遅い    二度手間   紙の山
```

**After:**
```
タブレット直接入力 → 自動連携
        ↓              ↓
      速い          ペーパーレス
```

**レイアウト:**
```tsx
<div className="grid md:grid-cols-2 gap-4 my-4">
  <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
    <p className="text-xs text-red-300 font-bold mb-2">Before:</p>
    <p className="text-white/70 text-sm">手書き → PC入力 → 印刷という二度手間</p>
  </div>
  <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
    <p className="text-xs text-emerald-300 font-bold mb-2">After:</p>
    <p className="text-white/70 text-sm">タブレット直接入力 → 自動連携</p>
  </div>
</div>
```

---

**P（Plan - 計画）**

**ストーリー:**
- 「分析結果から、具体的な改善策を立てました」
- 具体例: 「タブレット導入で現場入力」「テンプレート統一で転記削減」「目標: 書類時間を1時間以内に」

**ビジュアル:**
- チェックリストアイコン
- 目標数値を大きく表示

**レイアウト:**
```tsx
<div className="bg-white/5 rounded-lg p-3 mb-3">
  <p className="text-xs text-cyan-200 font-bold mb-2">改善計画:</p>
  <ul className="space-y-2">
    <li className="flex items-start gap-2">
      <span className="text-emerald-400">✓</span>
      <span className="text-white/80 text-sm">タブレット導入で現場入力</span>
    </li>
    <li className="flex items-start gap-2">
      <span className="text-emerald-400">✓</span>
      <span className="text-white/80 text-sm">テンプレート統一で転記削減</span>
    </li>
    <li className="flex items-start gap-2">
      <span className="text-yellow-400">📊</span>
      <span className="text-white/80 text-sm font-bold">目標: 書類時間を1時間以内に</span>
    </li>
  </ul>
</div>
```

---

**A（Act - 実行）**

**ストーリー:**
- 「計画を実行しながら、現場の声で微調整」
- 具体例: 「当初のテンプレートが使いにくい → 現場で改良」「入力タイミングを柔軟に変更」

**ビジュアル:**
- フィードバックループのアイコン
- 双方向矢印（計画 ⇄ 実行）

---

**E（Evaluation - 評価）**

**ストーリー:**
- 「3ヶ月後、結果を検証しました」
- 具体例: 「書類時間: 2.5時間 → 1.2時間（52%削減）」「この成功体験が次のデータに」

**ビジュアル:**
- 成果グラフ（Before/Afterの棒グラフ）
- 数字のカウントアップ効果（52%削減）

**レイアウト:**
```tsx
<div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg p-4 border border-emerald-400/30">
  <p className="text-xs text-emerald-200 font-bold mb-2">成果:</p>
  <div className="flex items-center justify-center gap-4 my-3">
    <div className="text-center">
      <p className="text-white/60 text-xs">Before</p>
      <p className="text-white text-2xl md:text-3xl font-bold">2.5h</p>
    </div>
    <span className="text-emerald-400 text-2xl">→</span>
    <div className="text-center">
      <p className="text-white/60 text-xs">After</p>
      <p className="text-emerald-400 text-2xl md:text-3xl font-bold">1.2h</p>
    </div>
  </div>
  <p className="text-center text-emerald-300 text-lg md:text-xl font-bold">52%削減</p>
</div>
```

---

**結論カード（サイクルの継続）**

**内容:**
- 「この評価結果が新たなデータとなり、次の改善サイクルへ」
- 循環を示す大きな円形矢印で最初のDに戻る視覚表現

**ビジュアル:**
- 背景: 明るい色（成功を示唆）
- 円形の矢印アイコン（Eから最初のDへ戻る）

**レイアウト:**
```tsx
<div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl p-6 mt-6 border-2 border-teal-400/30 text-center">
  <div className="flex justify-center mb-4">
    <svg className="w-16 h-16 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      {/* 円形矢印のSVG */}
    </svg>
  </div>
  <p className="text-white/90 text-base md:text-lg font-medium">
    この評価結果が新たなデータとなり、次の改善サイクルへ
  </p>
  <p className="text-teal-300 text-sm mt-2">
    DAPAEサイクルは終わらない成長の物語
  </p>
</div>
```

#### 2.3 アニメーション

**スクロール連動:**
- 各カードがビューポートに入ったらフェードイン
- 矢印が順番に光る演出（オプション）
- 数字のカウントアップ効果（52%削減の部分）

**実装:**
```tsx
// Intersection Observerでスクロール検出
const [isVisible, setIsVisible] = useState(false);

// カウントアップアニメーション
useEffect(() => {
  if (isVisible) {
    // 0から52まで1秒かけてカウント
  }
}, [isVisible]);
```

---

### 3. 7つの行動指針の改善

#### 3.1 情報階層の整理

**レベル1: リスト表示（一覧性重視）**
- 番号アイコン
- shortTitle のみ表示（現在のまま）
- クリックで詳細カードを開く
- ホバー時に背景色変化（滑らかなトランジション）

**レベル2: カード表示（縦配置）**

**構成（上から順に）:**
1. 番号バッジ（小さく、上部）
2. **shortTitle**（太字、大きめ）← 1行目
3. **subtitle**（中サイズ、色を少し変える）← 2行目
4. 区切り線
5. **description**（本文サイズ、複数行）← 3行目以降

**視覚的な区別:**
- shortTitle: 白色、text-xl、font-bold
- subtitle: teal-300、text-base、font-medium
- description: white/80、text-sm、leading-relaxed

**レイアウト例:**
```tsx
<div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-16 shadow-xl border border-slate-100">
  {/* 番号バッジ */}
  <span className="inline-block px-4 py-1 md:px-6 md:py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs md:text-sm font-bold mb-3 md:mb-4">
    GUIDELINE {activeGuideline.num}
  </span>

  {/* shortTitle */}
  <h4 className="text-xl md:text-3xl font-bold text-primary mb-3 md:mb-4">
    {activeGuideline.shortTitle}
  </h4>

  {/* subtitle */}
  <p className="text-base md:text-xl text-teal-600 font-medium mb-4 md:mb-6">
    {activeGuideline.subtitle}
  </p>

  {/* 区切り線 */}
  <div className="w-12 md:w-16 h-1 bg-emerald-100 rounded-full mb-4 md:mb-8"></div>

  {/* description */}
  <p className="text-sm md:text-lg text-slate-700 leading-relaxed">
    {activeGuideline.description}
  </p>
</div>
```

#### 3.2 インタラクション改善

**番号ボタン:**
- ホバー時に軽く拡大（scale-110）
- パルス効果（ring-2 ring-emerald-100のアニメーション）

**リストアイテム:**
- ホバー時に背景色変化（現在より滑らか）
- トランジション: `transition-all duration-300`

**カード切り替え:**
- フェード効果（現在は瞬時切り替え）
- カードの内容が変わる時にフェードアウト→フェードイン

**実装:**
```tsx
// カード切り替え時のアニメーション
const [isChanging, setIsChanging] = useState(false);

const handleGuidelineChange = (index: number) => {
  setIsChanging(true);
  setTimeout(() => {
    setActiveGuideline(index);
    setIsChanging(false);
  }, 150);
};

// カードにクラス適用
<div className={`transition-opacity duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
  {/* カードの内容 */}
</div>
```

---

### 4. ビジュアルデザインの統一

#### 4.1 カラースキーム

**DAPAEと7つの行動指針で共通:**
- プライマリ: エメラルド系（emerald-500、teal-400）
- アクセント: ティール系（teal-300、cyan-400）
- 背景: ダークグリーン（DAPAE）、ホワイト（行動指針）
- 強調: イエロー系（課題、重要ポイント）

#### 4.2 タイポグラフィ

**統一ルール:**
- 見出し1（セクションタイトル）: fluid-3xl
- 見出し2（カードタイトル）: fluid-2xl
- 見出し3（サブタイトル）: fluid-xl
- 本文: fluid-base
- 補足: fluid-sm

#### 4.3 スペーシング

**統一ルール:**
- セクション間: fluid-2xl
- カード内の要素間: fluid-md
- 小さい要素間: fluid-sm

#### 4.4 アニメーション統一

**共通の動き:**
- フェードイン: `opacity-0 → opacity-100`、duration-500
- ホバー拡大: `scale-105`、duration-300
- スクロールアニメーション: Intersection Observer + translateY

---

### 5. レスポンシブ対応

#### 5.1 ブレークポイント

- モバイル: 〜767px
- タブレット: 768px〜1023px
- デスクトップ: 1024px〜

#### 5.2 DAPAEセクション

**モバイル:**
- 左の頭文字: 32px → 24px
- カード内padding: p-6 → p-4
- ストーリーセクションのフォントサイズ: text-sm
- Before/Afterを縦並び（grid-cols-2 → grid-cols-1）

**タブレット:**
- 現在のデスクトップデザインを維持
- フォントサイズは中間値

#### 5.3 7つの行動指針

**モバイル:**
- カード内padding: p-16 → p-6
- shortTitle: text-3xl → text-xl
- subtitle: text-xl → text-base
- description: text-lg → text-sm

---

### 6. データ構造

#### 6.1 DAPAEデータの拡張

```typescript
dapae: {
  title: "DAPAE（ダパエ）：データ駆動型・成長サイクル",
  description: "客観的な事実（データ）を価値ある判断材料（情報）に変え、精度の高い意思決定を繰り返すためのフレームワーク。",

  // 導入ストーリー
  introduction: {
    text: "ある日、スタッフから『書類作業が多すぎる』という声が上がりました。感情的には『大変そうだ』と思いますが、フラクタルでは感情だけで判断しません。まずはデータを集めるところから始めます。",
    icon: "💬",
  },

  steps: [
    {
      name: "Data",
      ja: "データ",
      subtitle: "事実の収集",
      color: "bg-emerald-500",
      description: "単なる数字や出来事を、色眼鏡なしに集める段階。",
      example: "訪問件数、キャンセル率、スタッフの稼働時間、顧客アンケートの生の声、市場の統計数値。それ自体は「ただの数字」である。",

      // 追加: ストーリー
      story: "まず、感情ではなく事実を集めました。1日の書類作業時間を計測したところ、平均2.5時間。どの書類に時間がかかるか記録すると、訪問記録が最多でした。",
    },
    {
      name: "Analysis",
      ja: "分析",
      subtitle: "情報の抽出",
      color: "bg-teal-500",
      description: "収集したデータを比較・加工し、意味のある「情報」へと変換する。",
      example: "「なぜキャンセルが増えたのか」という要因特定や、「競合他社と比較して自社が優れている点はどこか」という強みの抽出。課題や機会を浮き彫りにする。",

      // 追加: ストーリー
      story: "データを分析すると、パターンが見えてきました。手書き → PC入力 → 印刷という二度手間が発生していました。",

      // 追加: Before/After
      beforeAfter: {
        before: "手書き → PC入力 → 印刷という二度手間",
        after: "タブレット直接入力 → 自動連携",
      },
    },
    {
      name: "Plan",
      ja: "計画",
      subtitle: "戦略の策定",
      color: "bg-cyan-500",
      description: "分析で得られた情報に基づき、勝算のある具体的な実行プランを立てる。",
      example: "達成すべきKPI（重要指標）の設定、ITツール導入による効率化手順の策定、担当者の割り振り、予算とスケジュールの確定。",

      // 追加: ストーリー
      story: "分析結果から、具体的な改善策を立てました。",

      // 追加: チェックリスト
      checklist: [
        "タブレット導入で現場入力",
        "テンプレート統一で転記削減",
        "目標: 書類時間を1時間以内に",
      ],
    },
    {
      name: "Act",
      ja: "実行",
      subtitle: "柔軟な遂行",
      color: "bg-sky-500",
      description: "計画を現場で動かす。ここでは「やり抜くこと」と「状況に応じた微調整」を両立させる。",
      example: "新しいITシステムの運用開始。現場で発生した「不便」に対して、計画をガチガチに守るのではなく、目的達成のためにその場で最適化を行う。",

      // 追加: ストーリー
      story: "計画を実行しながら、現場の声で微調整しました。当初のテンプレートが使いにくいという声があり、現場で改良。入力タイミングも柔軟に変更しました。",
    },
    {
      name: "Evaluation",
      ja: "評価",
      subtitle: "成果の検証と蓄積",
      color: "bg-blue-500",
      description: "実行結果を定量（数字）と定性（質）の両面から振り返る。",
      example: "目標値（KPI）の達成率の確認。成功・失敗の要因を言語化し、それを新たな「データ」として次回のサイクルへと受け渡す。",

      // 追加: ストーリー
      story: "3ヶ月後、結果を検証しました。",

      // 追加: 成果データ
      results: {
        before: "2.5時間",
        after: "1.2時間",
        improvement: "52%削減",
      },
    },
  ],

  // 結論
  conclusion: {
    text: "この評価結果が新たなデータとなり、次の改善サイクルへ",
    subtitle: "DAPAEサイクルは終わらない成長の物語",
  },

  coreIdea: {
    title: "核心となる考え方：「データ」を「情報」へ",
    description: "このサイクルの肝は、「未加工の数値（データ）」に文脈や意味を与えて「行動の指針（情報）」へ昇華させることにある。",
    example: "例えば、単に「売上100万円」というデータがあっても、それが「目標の半分なのか、過去最高なのか」という分析がなければ、次の計画は立てられない。分析を経て「新規顧客は増えたがリピートが減っている」という情報になって初めて、正しい成長のサイクルが回り出す。",
  },
}
```

#### 6.2 7つの行動指針データ（現状維持）

```typescript
guidelines: [
  {
    num: 1,
    shortTitle: "感情は大切に、ただし判断はロジカルに",
    subtitle: "感情と論理の両立：気持ちを大切にしながら、判断は冷静なデータや根拠で行う。",
    description: "自分や相手がどう感じているかという「気持ち」は無視せず、大切に扱う。ただし、仕事の決断を下すときは感情に流されず、事実やデータに基づいた「理屈（ロジカル）」で冷静に判断する。"
  },
  // ... 他の指針も同様
]
```

---

## 実装の優先度

### フェーズ1: ナビゲーションと情報階層（基盤）

**実装項目:**
1. 固定サイドナビゲーション（デスクトップ）
2. モバイルタブメニュー
3. 情報階層の整理（必読/詳細/補足）
4. Intersection Observerによる現在位置検出

**所要時間:** 3-4時間

---

### フェーズ2: DAPAEセクションの改善

**実装項目:**
1. データ構造の拡張（story、beforeAfter、checklist、results）
2. 導入カードの実装
3. 各ステップカードのストーリーセクション追加
4. Before/After対比の実装（Analysisステップ）
5. チェックリストの実装（Planステップ）
6. 成果表示の実装（Evaluationステップ）
7. 結論カードの実装
8. スクロールアニメーション（フェードイン）
9. 数字のカウントアップ効果

**所要時間:** 4-5時間

---

### フェーズ3: 7つの行動指針の改善

**実装項目:**
1. カード表示の縦配置レイアウト修正
2. カード切り替え時のフェードアニメーション
3. ボタン・リストのホバー効果改善
4. レスポンシブ調整

**所要時間:** 2-3時間

---

### フェーズ4: ビジュアル統一とレスポンシブ最適化

**実装項目:**
1. カラースキームの統一
2. タイポグラフィの統一
3. スペーシングの統一
4. モバイル・タブレットのレスポンシブ調整
5. パフォーマンス最適化（遅延読み込み）

**所要時間:** 2-3時間

---

## 合計実装時間

**推定: 11-15時間**

---

## リスク評価

### 低リスク

- ナビゲーション追加: 既存のセクションIDを活用、影響範囲限定
- データ構造拡張: 後方互換性を保ちながら追加
- アニメーション: Intersection Observerは既に他のページで使用実績あり

### 中リスク

- 情報階層の整理: セクションの折りたたみで初期表示が変わる可能性
- モバイルタブメニュー: 固定ヘッダーとの競合に注意

### 対策

- 段階的実装: フェーズごとに確認しながら進める
- ユーザーテスト: モバイル・デスクトップ両方で動作確認
- バックアップ: 実装前にブランチを作成

---

## 検証チェックリスト

### ナビゲーション
- [ ] サイドナビゲーションが正しく固定表示される
- [ ] 現在位置のドットがハイライトされる
- [ ] クリックで該当セクションへスムーズスクロール
- [ ] モバイルでタブメニューが表示される
- [ ] タブメニューがスクロール可能

### DAPAE
- [ ] 導入カードが表示される
- [ ] 各ステップにストーリーセクションが表示される
- [ ] Analysisステップに Before/After対比が表示される
- [ ] Planステップにチェックリストが表示される
- [ ] Evaluationステップに成果データが表示される
- [ ] 結論カードが表示される
- [ ] スクロールアニメーションが動作する
- [ ] カウントアップ効果が動作する

### 7つの行動指針
- [ ] カード表示が縦配置になっている
- [ ] shortTitle、subtitle、descriptionが改行されている
- [ ] カード切り替え時にフェードアニメーションが動作する
- [ ] ボタンのホバー効果が動作する
- [ ] リストのホバー効果が動作する

### レスポンシブ
- [ ] モバイルで適切にレイアウトが変わる
- [ ] タブレットで適切にレイアウトが変わる
- [ ] デスクトップで適切にレイアウトが変わる
- [ ] すべてのデバイスでfluid値が適用されている

### パフォーマンス
- [ ] 初期表示が高速（ヒーロー + 基本理念のみ）
- [ ] スクロールが滑らか
- [ ] アニメーションがカクつかない

---

## まとめ

本設計書では、「フラクタルを知る」ページの以下の改善を提案します:

1. **固定ナビゲーション**: ユーザーが迷わず目的のセクションへアクセス
2. **DAPAEのストーリー化**: 具体的な事例で理解しやすく、印象に残る
3. **7つの行動指針の階層整理**: 要約と詳細を使い分けて読みやすく
4. **ビジュアル統一**: エメラルド系カラー、流れるようなアニメーション

これにより、訪問者が「フラクタルの考え方」を理解し、共感し、記憶に残るページを実現します。
