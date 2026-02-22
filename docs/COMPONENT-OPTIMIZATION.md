# コンポーネント最適化ガイド

重複UIパターンの記録と共通化候補リスト。
現時点では記録のみ（共通化の実装はしない）。

---

## 重複判定基準

以下の基準で「重複」と判定する:
1. **見た目同一**: 2箇所以上で同一HTML構造/CSSクラスが使われている
2. **Props類似**: 似た入力を受け取る独立実装が複数存在する
3. **責務重複**: 同一ユースケースを別々のコードで実装している
4. **行数基準**: 30行以上の重複コードがある場合は共通化候補

---

## 重複パターン一覧

| パターン | 重複箇所 | 削減見込み | 共通化優先度 |
|---------|---------|-----------|------------|
| FAQアコーディオン（max-h-0/max-h-96切り替え） | src/components/FAQ.tsx, src/app/recruit/page.tsx, src/app/company/ceo/page.tsx, src/components/recruit/ModelIncomeSection.tsx | 約150行 | 高 |
| お問い合わせCTA（電話+フォームボタン組み合わせ） | src/app/for-care-managers/page.tsx, src/app/for-medical-institutions/page.tsx, src/app/pricing/page.tsx, src/app/areas/[slug]/page.tsx | 約120行 | 高 |
| スクロールアニメーション（独自IntersectionObserver実装） | src/app/company/page.tsx, src/app/company/ceo/page.tsx | 約40行（useScrollAnimationで代替可能） | 中 |
| 電話番号リンク+電話SVGアイコン | src/app/for-care-managers/page.tsx（3箇所）, src/app/for-medical-institutions/page.tsx, src/app/pricing/page.tsx, src/app/areas/[slug]/page.tsx（2箇所） | 約50行 | 中 |

---

## 電話番号リンクパターン（再利用推奨コード）

以下のコードが複数ページで重複している。共通化時の参考にすること。

**出現箇所**:
- `src/app/for-care-managers/page.tsx`（行158, 236, 384）
- `src/app/for-medical-institutions/page.tsx`（行360）
- `src/app/pricing/page.tsx`（行56, 368）
- `src/app/areas/[slug]/page.tsx`（行90, 690）

**代表的なコードパターン（大きいボタン）**:
```tsx
<a
  href="tel:047-770-1228"
  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--color-logo-dark-green)] rounded-full font-bold text-lg hover:bg-[var(--color-logo-yellow)] transition-colors shadow-lg"
>
  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
  電話でのご相談
</a>
```

**データ参照先**: 電話番号は `src/lib/data.ts` → `officeInfo.phone` で管理。ハードコードしないこと。

---

## FAQアコーディオンパターン（再利用推奨コード）

`max-h-0` / `max-h-96` のCSS高さ切り替えによるアコーディオンが4箇所で独立実装されている。

**出現箇所**:
- `src/components/FAQ.tsx`（サービスFAQ）
- `src/app/recruit/page.tsx`（採用FAQと採用条件アコーディオン）
- `src/app/company/ceo/page.tsx`（プロフィール展開）
- `src/components/recruit/ModelIncomeSection.tsx`（モデル年収内訳）

**共通パターン（状態管理）**:
```tsx
// 単一開閉パターン（UpdatesPopup等）
const [isOpen, setIsOpen] = useState(false);

// インデックス管理パターン（FAQリスト等）
const [openIndex, setOpenIndex] = useState<number | null>(null);

const toggle = (index: number) => {
  setOpenIndex(openIndex === index ? null : index);
};
```

**共通パターン（展開アニメーション）**:
```tsx
<div
  className={`overflow-hidden transition-all duration-300 ${
    isOpen ? "max-h-96 mt-3" : "max-h-0"
  }`}
>
  {/* アコーディオン内容 */}
</div>
```

**注意**: `max-h-96`（384px）はコンテンツが長い場合に切れる可能性がある。コンテンツ量に応じて `max-h-[500px]` 等を調整すること。

---

## スクロールアニメーション重複実装

`useScrollAnimation` フック（`src/hooks/useScrollAnimation.ts`）が存在するにも関わらず、一部ページで独自の `IntersectionObserver` 実装がある。

**重複実装箇所**:
- `src/app/company/page.tsx`（独自スクロール検知）
- `src/app/company/ceo/page.tsx`（独自スクロール検知）

**既存フックを使った正しい実装**:
```tsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const { ref, isVisible } = useScrollAnimation(0.15);

<section
  ref={ref}
  className={`transition-all duration-500 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
>
```

**新規実装時は必ず `useScrollAnimation` を使うこと**。独自実装禁止。

---

## お問い合わせCTAパターン

電話ボタンと問い合わせフォームリンクを横並びにするCTAが複数ページで重複している。

**出現箇所**:
- `src/app/for-care-managers/page.tsx`
- `src/app/for-medical-institutions/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/areas/[slug]/page.tsx`

**共通構造**:
```tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <a href="tel:047-770-1228" className="...電話ボタン...">
    電話でのご相談
  </a>
  <a href="#contact" className="...問い合わせリンク...">
    お問い合わせ
  </a>
</div>
```

---

## 将来の共通化計画

現在は記録のみ。以下の順序で共通化を検討する（今回は実装しない）:

1. **FAQアコーディオン** - 最大の削減効果（約150行削減見込み）
   - `src/components/AccordionItem.tsx` として共通化が有効
   - `question`, `answer`, `isOpen`, `onToggle` をPropsに持つ

2. **お問い合わせCTA** - 全ページで共通（約120行削減見込み）
   - `src/components/ContactCTA.tsx` として共通化が有効
   - `phone`, `contactHref`, `variant` をPropsに持つ

3. **FadeInラッパー** - アニメーション統一（約40行削減見込み）
   - `company/page.tsx`, `company/ceo/page.tsx` の独自実装を `useScrollAnimation` に統一
   - フックへの移行のみで実現可能

4. **電話番号リンク+SVG** - ブランドカラー一貫性（約50行削減見込み）
   - `src/components/PhoneLink.tsx` として共通化が有効
   - 電話番号は `officeInfo.phone` から動的取得
