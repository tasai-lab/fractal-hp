// 事業所情報（stations-data.ts からの re-export）
import { stationsData } from "./stations-data";
export type { StaffMember, StationOfficeInfo, StationData } from "./stations-data";
export { getStation, getActiveStations, getAllStationSlugs, stationsData } from "./stations-data";

export const officeInfo = stationsData[0].officeInfo;

// 会社情報
export const companyInfo = {
  name: "株式会社フラクタル",
  representative: "浅井 拓哉",
  phone: "050-3529-1176",
  hours: "9:00 〜 18:00",
  address: {
    full: "〒274-0072 千葉県船橋市三山6丁目22-2 パレドール小川201",
  },
  googleMapsUrl:
    "https://www.google.com/maps?q=%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%83%95%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%AB+%E8%88%B9%E6%A9%8B&output=embed",
};

// フッター用サイトマップリンク
export const footerLinks = [
  { href: "/fractal", label: "フラクタルの意味" },
  { href: "/company", label: "株式会社フラクタル" },
  { href: "/#features", label: "サービスの特徴" },
  { href: "/pricing", label: "ご利用料金" },
  { href: "/services/psychiatric-nursing", label: "精神科訪問看護" },
  { href: "/services/end-of-life-care", label: "看取り・終末期ケア" },
  { href: "/services/24h-support", label: "24時間対応体制" },
  { href: "/services/for-care-managers", label: "ケアマネ様へ" },
  { href: "/services/for-medical-institutions", label: "医療機関様へ" },
  { href: "/stations", label: "事業所一覧" },
  { href: "/stations/funabashi", label: "フラクタル訪問看護 船橋" },
  { href: "/recruit", label: "採用情報" },
  { href: "/#contact", label: "お問い合わせ" },
  { href: "/updates", label: "更新情報" },
];

// サイトマップメニューのカテゴリ分け（4カテゴリ・10項目）
export const otherMenuCategories = {
  service: {
    title: "サービス案内",
    items: [
      { href: "/#contact", label: "お問い合わせ" },
      { href: "/pricing", label: "ご利用料金" },
      { href: "/services/psychiatric-nursing", label: "精神科訪問看護" },
      { href: "/services/end-of-life-care", label: "看取り・終末期ケア" },
      { href: "/services/24h-support", label: "24時間対応体制" },
      { href: "/services/for-care-managers", label: "ケアマネ様へ" },
      { href: "/services/for-medical-institutions", label: "医療機関様へ" },
    ],
  },
  recruit: {
    title: "採用情報",
    items: [
      { href: "/recruit", label: "採用情報" },
      { href: "/company/ceo", label: "代表の取扱説明書" },
    ],
  },
  company: {
    title: "会社情報",
    items: [
      { href: "/fractal", label: "フラクタルの意味" },
      { href: "/company", label: "株式会社フラクタル" },
      { href: "/stations/funabashi/documents", label: "各種書類" },
      { href: "/updates", label: "更新情報" },
    ],
  },
  external: {
    title: "公式メディア",
    items: [
      {
        href: "https://www.instagram.com/fractal.hokan/",
        label: "Instagram",
        icon: "Instagram",
      },
      { href: "https://note.com/fractal_hokan", label: "Note", icon: "FileText" },
    ],
  },
};

// フラクタルの特徴
export const features = [
  {
    icon: "clock",
    title: "19時まで営業",
    description: "看護：毎日9時〜19時\nリハ：平日9時〜18時",
    note: "※現在リハビリのご依頼は受け付けておりません。",
  },
  {
    icon: "calendar",
    title: "365日対応",
    description: "土日祝も訪問可能です",
    note: "看護師は365日稼働しています。\n（リハビリは平日のみとなります。）",
  },
  {
    icon: "phone",
    title: "24時間安心",
    description: "24時間オンコール体制",
    note: "緊急時も迅速に対応できる体制を整えています。\n※月1回の訪問から契約可能です。",
  },
  {
    icon: "heart",
    title: "終末期ケア",
    description: "看取りの経験豊富なスタッフ",
    note: "その人らしい最期を迎えられるよう、心に寄り添いサポートいたします。",
  },
  {
    icon: "mind",
    title: "精神科対応",
    description: "身体だけでなく心のケアも",
    note: "精神科訪問看護の経験豊富なスタッフが在籍しています。",
  },
  {
    icon: "box",
    title: "無料レンタル",
    description: "必要な備品を無料貸出",
    note: "キーボックスやお薬カレンダーなど、療養生活に必要な物品を貸し出します。",
  },
  {
    icon: "shield",
    title: "迅速な対応",
    description: "最短即日のご依頼も可能",
    note: "お急ぎの場合もまずはご相談ください。",
  },
  {
    icon: "handshake",
    title: "医療連携",
    description: "医療機関との密な連携",
    note: "主治医やケアマネージャーへの連絡・調整も私たちにお任せください。",
  },
];

// 訪問エリア
export const serviceAreas = {
  priority: {
    label: "訪問可能エリア",
    note: "事業所から20〜30分（現在訪問中）",
    cities: [
      {
        name: "船橋市",
        areas: ["三山", "習志野", "薬園台", "田喜野井", "前原東", "習志野台"],
      },
      {
        name: "八千代市",
        areas: ["八千代台", "八千代台東", "八千代台南", "八千代台北", "高津", "高津東", "大和田", "大和田新田", "村上", "米本"],
      },
      {
        name: "習志野市",
        areas: ["藤崎", "大久保", "本大久保", "東習志野", "実籾", "屋敷", "花咲", "鷺沼"],
      },
      {
        name: "千葉市花見川区",
        areas: ["幕張本郷", "幕張町", "長作町"],
      },
    ],
  },
};

// ご利用開始までの流れ
export const flowSteps = [
  {
    step: 1,
    title: "お問い合わせ・ご相談",
    description:
      "まずはお電話やお問い合わせフォームにて、お気軽にご相談ください。療養生活に関するお悩みや不安、訪問看護で受けたいサービスのご希望など、どのようなことでもお聞かせください。ご本人様はもちろん、ご家族様、担当のケアマネージャー様からのご相談も随時受け付けております。",
  },
  {
    step: 2,
    title: "ご訪問・状況の確認",
    description:
      "看護師などの専門スタッフが、ご自宅やご指定の場所へお伺いします。ご本人様のお身体の状態や生活環境を拝見し、ご本人様とご家族様のご希望を詳しくお伺いします。その上で、どのような看護が必要かを一緒に考えさせていただきます。また、ご利用可能な公的保険（医療保険・介護保険）の確認や、必要な関係機関との連携・調整も行います。",
  },
  {
    step: 3,
    title: "プランのご提案・ご契約",
    description:
      "お伺いした内容を基に、一人ひとりに合わせた最適な訪問看護計画をご提案いたします。サービスの内容、訪問回数、費用などについて詳しくご説明し、十分にご納得いただいた上でご契約となります。ご不明な点やご不安なことがあれば、何度でも丁寧にご説明いたします。",
  },
  {
    step: 4,
    title: "サービスの開始",
    description:
      "ご契約いただいた訪問看護計画に沿って、サービスを開始いたします。かかりつけの主治医やケアマネージャーなど関係機関と密に連携を取りながら、ご本人様が住み慣れた場所で安心して療養生活を送れるよう、心を込めてサポートいたします。サービス開始後も、お身体の状態の変化に合わせて、随時プランの見直しを行いますのでご安心ください。",
  },
];

// スタッフ情報（stations-data.ts からの re-export）
export const staffMembers = stationsData[0].staffMembers;

// お問い合わせ種別
export const contactTypes = [
  "訪問看護のご利用について",
  "ケアマネージャーからのお問い合わせ",
  "医療機関からのお問い合わせ",
  "求人・採用について",
  "その他のお問い合わせ",
];

// 私たちのカタチ（Philosophy）
export const philosophyItems = [
  {
    number: 1,
    title: "フラクタル構造",
    description:
      "「一部分が全体と同じ形になる」フラクタル構造は、私たちの企業理念「シンプルで独創的な社会を実現する」を象徴しています。一人ひとりの小さな行動（一部）が、社会全体（全体）をより良く変えていく。そんな無限の可能性を信じています。",
  },
  {
    number: 2,
    title: "三つ葉のクローバー",
    description:
      "ロゴの中心にある三つの濃い緑色の三角は、三つ葉のクローバーを表しています。花言葉である「愛」「信頼」「希望」を胸に、利用者さま一人ひとりの背景や想いに寄り添った、温かい看護を提供します。",
  },
  {
    number: 3,
    title: "再現性のあるサービス",
    description:
      "フラクタルのロゴが様々なパーツで構成されているように、各ご家庭の状況は様々です。私たちは、それぞれのニーズに合わせた柔軟な対応（カタチ）を大切にしながらも、常に質の高い、再現性のあるサービスをお届けすることをお約束します。",
  },
  {
    number: 4,
    title: "完璧ではなく最適化",
    description:
      "完璧な正解など存在しないかもしれません。しかし、私たちは常に「その人にとっての最適」を模索し続けます。変化する状況やニーズに合わせて、常に最善を尽くし、進化し続けること。それが私たちの姿勢です。",
  },
];

// 受入可能な状態テーブル
export type AcceptableCondition = {
  name: string;
  status: "available" | "limited" | "unavailable";
  note: string;
};

export const acceptableConditions: AcceptableCondition[] = [
  { name: "脳血管疾患（脳梗塞・脳出血）", status: "available", note: "リハビリ含む" },
  { name: "がん（終末期・緩和ケア）", status: "available", note: "看取り対応可" },
  { name: "精神疾患（うつ・統合失調症等）", status: "available", note: "精神科訪問看護" },
  { name: "認知症", status: "available", note: "BPSD対応含む" },
  { name: "難病（ALS・パーキンソン等）", status: "available", note: "医療処置対応" },
  { name: "人工呼吸器・在宅酸素", status: "available", note: "機器管理指導" },
  { name: "褥瘡（床ずれ）", status: "available", note: "処置・予防" },
  { name: "ストーマ（人工肛門・膀胱）", status: "available", note: "管理指導" },
  { name: "糖尿病（インスリン管理）", status: "available", note: "自己注射指導" },
  { name: "小児・重症心身障害児", status: "limited", note: "要相談" },
  { name: "訪問リハビリテーション", status: "limited", note: "現在休止中" },
];
