# データ仕様書

フラクタル訪問看護 船橋 Webサイトのデータファイル仕様です。

---

## ファイル一覧

| ファイル | 説明 |
|----------|------|
| `src/lib/data.ts` | サイト基本データ |
| `src/lib/recruit-data.ts` | 採用情報データ |
| `src/lib/faq-data.ts` | FAQデータ |
| `src/lib/flyers-data.ts` | チラシデータ |

---

## data.ts - サイト基本データ

### officeInfo

事業所情報。

```typescript
interface OfficeInfo {
  name: string;              // 事業所名
  businessNumber: string;    // 事業所番号
  hours: string;             // 営業時間
  address: {
    postalCode: string;      // 郵便番号
    prefecture: string;      // 都道府県
    city: string;            // 市区町村
    street: string;          // 番地
    building: string;        // 建物名
  };
  phone: string;             // 電話番号
  fax: string;               // FAX番号
  email: string;             // メールアドレス
  googleMapsUrl: string;     // Google Maps埋め込みURL
}
```

### staffMembers

スタッフ情報の配列。

```typescript
interface StaffMember {
  name: string;           // 名前
  nameReading: string;    // 読み仮名
  role: string;           // 役職
  image: string;          // 画像パス
  birthplace: string;     // 出身地
  hobbies: string;        // 趣味
  introduction: string;   // 自己紹介
}
```

### features

フラクタルの特徴（8項目）。

```typescript
interface Feature {
  icon: string;           // アイコン（絵文字）
  title: string;          // タイトル
  description: string;    // 説明
}
```

### flowSteps

ご利用開始までの流れ（4ステップ）。

```typescript
interface FlowStep {
  step: number;           // ステップ番号
  title: string;          // タイトル
  description: string;    // 説明
  icon: string;           // アイコン
}
```

### serviceAreas

訪問エリア情報。

```typescript
interface ServiceAreas {
  priority: {
    cities: Array<{
      name: string;       // 市区町村名
      areas: string[];    // 対応エリア一覧
    }>;
  };
}
```

### companyInfo

会社情報。

```typescript
interface CompanyInfo {
  name: string;           // 会社名
  representative: string; // 代表者
  established: string;    // 設立日
  capital: string;        // 資本金
  business: string[];     // 事業内容
  address: string;        // 所在地
}
```

### philosophyItems

私たちのカタチ（4要素）。

```typescript
interface PhilosophyItem {
  title: string;          // タイトル
  subtitle: string;       // サブタイトル
  description: string;    // 説明
  backContent: string;    // カード裏面の内容
  color: string;          // 背景色
}
```

---

## recruit-data.ts - 採用情報データ

### signOnBonus

入社祝い金情報。

```typescript
interface SignOnBonus {
  total: number;          // 合計金額
  note: string;           // 注記（HP限定等）
  milestones: Array<{
    label: string;        // ラベル（入社時、6ヶ月等）
    amount: number;       // 金額
  }>;
}
```

### jobPositions

求人情報の配列。

```typescript
interface JobPosition {
  id: string;             // ID（nurse, therapist等）
  title: string;          // 職種名
  subtitle: string;       // サブタイトル
  hidden?: boolean;       // 非表示フラグ
  highlights: string[];   // ハイライト（タグ）
  description: string;    // 仕事内容説明
  features: Array<{
    title: string;
    description: string;
  }>;
  details: {
    requirements: string[];        // 応募要件
    salary: {
      type: string;                // 給与タイプ
      amount: string;              // 金額
      breakdown: Array<{
        label: string;
        value: string;
      }>;
      note?: string;
    };
    workHours: string;             // 勤務時間
    holidays: {
      annual: string;              // 年間休日
      monthly?: number;            // 月の公休
      notes: string[];
    };
    benefits: string[];            // 福利厚生
  };
  selectionProcess: Array<{
    step: string;
    description: string;
  }>;
}
```

### visitAreas

訪問エリア一覧（文字列配列）。

### jobDuties

看護師の業務内容一覧（文字列配列）。

### therapistDuties

セラピストの業務内容一覧（文字列配列）。

### onCallInfo

オンコール情報。

```typescript
interface OnCallInfo {
  frequency: string;      // 頻度
  note: string;           // 補足説明
}
```

### companyPhilosophy

フラクタルの考え方。

```typescript
interface CompanyPhilosophy {
  title: string;
  content: string;
}
```

### applicationMessage

応募メッセージ。

```typescript
interface ApplicationMessage {
  main: string;           // メインメッセージ
  visit: string;          // 見学案内
  timeline: string;       // 選考期間
}
```

---

## faq-data.ts - FAQデータ

### FAQItem

FAQ項目の型定義。

```typescript
interface FAQItem {
  question: string;       // 質問
  answer: string;         // 回答
}
```

### serviceFAQs

サービス利用者向けFAQ（トップページ用）。6項目。

| 質問 | 用途 |
|------|------|
| 訪問看護とは何ですか？ | サービス説明 |
| どのような方が訪問看護を利用できますか？ | 対象者説明 |
| 訪問看護の利用料金はいくらですか？ | 料金説明 |
| 訪問看護の利用開始までの流れを教えてください | 利用フロー |
| どのエリアに対応していますか？ | 対応エリア |
| 24時間対応していますか？ | 対応時間 |

### recruitFAQs

求職者向けFAQ（求人ページ用）。6項目。

| 質問 | 用途 |
|------|------|
| 訪問看護未経験でも応募できますか？ | 応募条件 |
| オンコールの頻度はどのくらいですか？ | 勤務条件 |
| 入社祝い金の条件を教えてください | 祝い金説明 |
| 訪問エリアはどこですか？ | 勤務地 |
| 年間休日は何日ですか？ | 休日説明 |
| どのような職種を募集していますか？ | 募集職種 |

---

## flyers-data.ts - チラシデータ

### Flyer

チラシの型定義。

```typescript
interface Flyer {
  id: string;             // ID
  title: string;          // タイトル
  date: string;           // 発行日
  type: string;           // タイプ（service, recruit等）
  frontImage: string;     // 表面画像パス
  backImage: string;      // 裏面画像パス
  orientation: string;    // 向き（portrait, landscape）
}
```

### flyers

チラシ一覧（配列）。

### flyerTypes

チラシタイプの定義。

```typescript
interface FlyerType {
  id: string;             // ID
  label: string;          // ラベル
}
```

---

## データ更新時の注意点

1. **型安全性**: TypeScriptの型定義に従ってデータを追加・更新する
2. **画像パス**: `/public/images/` 配下に画像を配置し、パスは `/images/` から始める
3. **文字数**: 説明文は適切な長さに収める（モバイル表示を考慮）
4. **SEO**: 地域名（船橋市、八千代市等）を自然に含める
