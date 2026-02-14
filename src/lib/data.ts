// 事業所情報
export const officeInfo = {
  name: "フラクタル訪問看護 船橋",
  businessNumber: "1262891190",
  address: {
    postalCode: "274-0072",
    prefecture: "千葉県",
    city: "船橋市",
    street: "三山6丁目22-2",
    building: "パレドール小川201",
    full: "〒274-0072 千葉県船橋市三山6丁目22-2 パレドール小川201",
  },
  phone: "047-770-1228",
  fax: "047-413-0502",
  email: "hokan-f@fractal-group.co.jp",
  hours: "9:00 〜 19:00（土日祝・年末年始も毎日営業）",
  googleMapsUrl:
    "https://www.google.com/maps?q=%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%83%95%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%AB+%E3%83%95%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%AB%E8%A8%AA%E5%95%8F%E7%9C%8B%E8%AD%B7+%E8%88%B9%E6%A9%8B&output=embed",
};

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

// ナビゲーションリンク（デスクトップヘッダー用）
export const navLinks = [
  { href: "/fractal", label: "フラクタルを知る" },
  { href: "/areas/funabashi", label: "対応エリア" },
  { href: "/for-care-managers", label: "ケアマネ様へ" },
  { href: "/recruit", label: "採用情報" },
  { href: "/#contact", label: "お問い合わせ" },
];

// フッター用サイトマップリンク
export const footerLinks = [
  { href: "/fractal", label: "フラクタルを知る" },
  { href: "/company", label: "株式会社フラクタル" },
  { href: "/#features", label: "サービスの特徴" },
  { href: "/#flow", label: "ご利用の流れ" },
  { href: "/for-care-managers", label: "ケアマネ様へ" },
  { href: "/for-medical-institutions", label: "医療機関様へ" },
  { href: "/recruit", label: "採用情報" },
  { href: "/#contact", label: "お問い合わせ" },
];

// モバイルメニュー項目（下部固定メニュー用）
export const mobileMenuItems = [
  { href: "/", label: "ホーム", icon: "Home" },
  { href: "/fractal", label: "フラクタル", icon: "Building2" },
  { href: "/recruit", label: "採用", icon: "Users" },
  { href: "/#contact", label: "問合せ", icon: "Phone" },
];

// サイトマップメニューのカテゴリ分け
export const otherMenuCategories = {
  home: {
    title: "トップページ",
    items: [
      { href: "/#about", label: "フラクタルとは" },
      { href: "/#features", label: "サービスの特徴" },
      { href: "/#office", label: "事業所案内" },
      { href: "/#flow", label: "ご利用の流れ" },
      { href: "/#staff", label: "スタッフ紹介" },
      { href: "/#faq", label: "よくある質問" },
      { href: "/#contact", label: "お問い合わせ" },
    ],
  },
  pages: {
    title: "詳しく見る",
    items: [
      { href: "/fractal", label: "フラクタルを知る" },
      { href: "/company", label: "株式会社フラクタル" },
      { href: "/company/ceo", label: "代表の取扱説明書" },
      { href: "/for-care-managers", label: "ケアマネージャー様へ" },
      { href: "/for-medical-institutions", label: "医療機関の皆様へ" },
      { href: "/recruit", label: "採用情報" },
      { href: "/flyers", label: "チラシ一覧" },
    ],
  },
  areas: {
    title: "対応エリア",
    items: [
      { href: "/areas/funabashi", label: "船橋市" },
      { href: "/areas/yachiyo", label: "八千代市" },
      { href: "/areas/narashino", label: "習志野市" },
      { href: "/areas/chiba-hanamigawa", label: "千葉市花見川区" },
      { href: "/areas/chiba-inage", label: "千葉市稲毛区" },
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
  updates: {
    title: "アップデート情報",
    items: [
      { href: "/updates", label: "何が変わった？" },
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

// スタッフ情報
export const staffMembers = [
  {
    name: "古谷 一真",
    nameReading: "ふるや かずま",
    role: "所長",
    birthplace: "我孫子市",
    hobbies: "筋トレ・散歩、読書",
    introduction:
      "千葉市の訪問看護ステーションで管理者・訪問業務は6年目となります。美味しいもの探しも趣味で、最近はタコス作りにハマっています！ハローワールド！ハロータコチューズデイ！",
    image: "/images/staff/furuya.webp",
  },
  {
    name: "髙山 里美",
    nameReading: "たかやま さとみ",
    role: "看護師",
    birthplace: "南房総市",
    hobbies: "LIVE遠征",
    introduction:
      "前職は手術室に勤務していたこともあり刺激的なことが大好き！好きな手術はTKA(人工膝関節置換術)です。",
    image: "/images/staff/takayama.webp",
  },
  {
    name: "浅井 拓哉",
    nameReading: "あさい たくや",
    role: "看護師",
    birthplace: "館山市",
    hobbies: "美味しいご飯を作る、食べる。",
    introduction:
      "新しいものが好きで、常に何かを考えています。雨と不便が嫌いで、何事も工夫してブラッシュアップしていく人生なんだと思います。永遠と終わりなき道を彷徨ってますね、ええ。",
    image: "/images/staff/asai.webp",
  },
  {
    name: "祝迫 萌々",
    nameReading: "いわいざこ もも",
    role: "総務",
    birthplace: "市原市",
    hobbies: "映画・アニメ鑑賞、猫を眺める",
    introduction:
      "フラクタルのなんでも屋です。直近まで人事労務のアドバイザーとして勤務しておりました。労務関係のご相談があればお気軽に聞いてください。",
    image: "/images/staff/iwaizako.webp",
  },
];

// お問い合わせ種別
export const contactTypes = [
  "訪問看護のご利用について",
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
