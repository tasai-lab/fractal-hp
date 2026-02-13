// 地域情報ページ用データ

export type PopulationProjection = {
  year: number;
  total: number;
  elderly: number;
  elderlyRate: number;
};

export type Specialty = {
  name: string;
  description: string;
  category: "agriculture" | "food" | "craft";
};

export type RegionalData = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;

  // 人口データ
  population: {
    total: string;
    elderly: string;
    elderlyRate: string;
    youngRate: string;
    workingRate: string;
    source: string;
    year: string;
  };

  // 年齢構成（円グラフ用）
  ageDistribution: {
    young: number; // 0-14歳
    working: number; // 15-64歳
    elderly: number; // 65歳以上
  };

  // 人口推移予測（グラフ用）
  populationProjection: PopulationProjection[];

  // 特産物・名産品
  specialties: Specialty[];

  // 交通・道路状況
  traffic: {
    mainRoads: string[];
    congestion: string;
    accessInfo: string;
  };

  // 地域の特徴
  characteristics: string[];

  // 医療・介護体制
  healthcare: {
    description: string;
    features: string[];
  };

  // 訪問可能エリア
  visitableAreas: string[];

  // FAQ
  faqs: Array<{ question: string; answer: string }>;
};

export const regionalData: RegionalData[] = [
  {
    slug: "funabashi",
    name: "船橋市",
    title: "フラクタル訪問看護 船橋｜船橋市三山にある訪問看護",
    description:
      "船橋市で訪問看護をお探しの方へ。フラクタル訪問看護は24時間365日対応。高齢化率24.2%の船橋市で在宅医療をサポート。047-770-1228",
    h1: "船橋市で訪問看護をお探しの方へ",
    intro:
      "船橋市は千葉県北西部に位置し、人口65万人超を誇る県内有数の大都市です。9路線35駅の充実した鉄道網を持ち、都心へのアクセスも良好。温暖な気候と豊かな自然、充実した医療体制が特徴で、高齢者にも住みやすい地域です。",

    population: {
      total: "65万人超",
      elderly: "約15.7万人",
      elderlyRate: "24.2%",
      youngRate: "11.8%",
      workingRate: "64.0%",
      source: "船橋市公式統計",
      year: "2025年",
    },

    ageDistribution: {
      young: 11.8,
      working: 64.0,
      elderly: 24.2,
    },

    populationProjection: [
      { year: 2020, total: 643000, elderly: 122000, elderlyRate: 19.0 },
      { year: 2025, total: 650000, elderly: 157000, elderlyRate: 24.2 },
      { year: 2030, total: 650000, elderly: 176000, elderlyRate: 27.1 },
      { year: 2035, total: 648000, elderly: 189000, elderlyRate: 29.2 },
      { year: 2040, total: 643000, elderly: 194000, elderlyRate: 30.2 },
    ],

    specialties: [
      {
        name: "船橋のなし",
        description:
          "地域団体商標登録。幸水、豊水、新高など多品種を栽培。8月〜10月が旬。",
        category: "agriculture",
      },
      {
        name: "船橋にんじん",
        description:
          "地域団体商標登録。甘みが強く、サラダやジュースにも最適。",
        category: "agriculture",
      },
      {
        name: "葉付き枝豆",
        description:
          "新鮮な枝豆を葉付きのまま出荷。夏の味覚として人気。",
        category: "agriculture",
      },
      {
        name: "梨の里（菓子）",
        description: "船橋産の梨を使った銘菓。お土産として人気。",
        category: "food",
      },
    ],

    traffic: {
      mainRoads: ["国道14号（千葉街道）", "国道296号", "国道357号"],
      congestion:
        "国道357号の若松付近で慢性的な渋滞（ららぽーと渋滞）が発生。栄町・若松交差点を中心に混雑。現在、3車線拡幅工事が進行中。",
      accessInfo:
        "JR総武線快速で都心まで約25分。9路線35駅の鉄道網があり、どこへ行くにも便利です。",
    },

    characteristics: [
      "人口65万人超の千葉県第2の都市",
      "9路線35駅の充実した鉄道網",
      "都心まで約25分のアクセス",
      "温暖な気候（年間平均気温16℃）",
      "大型商業施設が多数",
      "梨・人参の生産が盛ん",
    ],

    healthcare: {
      description:
        "船橋市は医療機関数が県内トップクラスで、地域包括支援センターも14箇所設置されています。訪問看護ステーションも多数あり、在宅医療の体制が整っています。",
      features: [
        "地域包括支援センター14箇所",
        "訪問看護ステーション多数",
        "船橋市雇用促進手当（月額15,000円）",
        "24時間対応の在宅医療体制",
      ],
    },

    visitableAreas: [
      "三山",
      "習志野台",
      "前原東",
      "前原西",
      "田喜野井",
      "薬園台",
      "二宮",
      "飯山満",
      "高根台",
      "松が丘",
      "坪井",
      "古和釜",
      "大穴",
      "船橋市全域",
    ],

    faqs: [
      {
        question: "船橋市の高齢化率はどのくらいですか？",
        answer:
          "2025年現在、船橋市の高齢化率は約24.2%です。2040年には約30%まで上昇すると予測されています。",
      },
      {
        question: "船橋市で訪問看護を利用するにはどうすればいいですか？",
        answer:
          "主治医の指示書が必要となります。かかりつけ医にご相談いただくか、当ステーション（047-770-1228）にお問い合わせください。介護保険または医療保険が適用されます。",
      },
      {
        question: "船橋市の特産品は何ですか？",
        answer:
          "船橋のなし、船橋にんじんが地域団体商標に登録されています。特に梨は8月〜10月が旬で、市内の直売所で購入できます。",
      },
    ],
  },
  {
    slug: "yachiyo",
    name: "八千代市",
    title: "八千代市の訪問看護｜フラクタル訪問看護 船橋（24時間365日対応）",
    description:
      "八千代市全域対応の訪問看護ステーション。24時間365日対応、終末期ケア・精神科訪問看護も対応。高齢化率24.8%の八千代市で安心のケア。047-770-1228",
    h1: "八千代市で訪問看護をお探しの方へ",
    intro:
      "八千代市は千葉県北西部に位置し、人口約20.5万人の住宅都市です。東葉高速線の開通以降、発展を続けており、2035年頃まで人口増加が続くと予測されています。梨の栽培は100年以上の歴史があり、農業も盛んな地域です。",

    population: {
      total: "205,748人",
      elderly: "約5.1万人",
      elderlyRate: "24.8%",
      youngRate: "11.0%",
      workingRate: "64.2%",
      source: "八千代市公式統計",
      year: "2024年",
    },

    ageDistribution: {
      young: 11.0,
      working: 64.2,
      elderly: 24.8,
    },

    populationProjection: [
      { year: 2020, total: 193000, elderly: 46000, elderlyRate: 23.8 },
      { year: 2025, total: 199000, elderly: 53000, elderlyRate: 26.6 },
      { year: 2030, total: 206000, elderly: 62000, elderlyRate: 30.1 },
      { year: 2035, total: 207000, elderly: 68000, elderlyRate: 32.9 },
      { year: 2040, total: 206000, elderly: 71000, elderlyRate: 34.5 },
    ],

    specialties: [
      {
        name: "八千代の梨",
        description:
          "100年以上の歴史。幸水、豊水、新高、あきづきなど多品種を栽培。",
        category: "agriculture",
      },
      {
        name: "春夏にんじん",
        description: "国の野菜指定産地。甘みが強く栄養価が高い。",
        category: "agriculture",
      },
      {
        name: "源右衛門鍋",
        description:
          "ニッポン全国鍋グランプリ殿堂入り。地元の食材を使った郷土料理。",
        category: "food",
      },
      {
        name: "八千代桜（純米酒）",
        description: "地元の酒蔵が醸造する特別純米酒。",
        category: "food",
      },
    ],

    traffic: {
      mainRoads: ["国道16号", "国道296号", "八千代バイパス"],
      congestion:
        "国道16号は勝田台・横戸町付近、国道296号は下市場・工団地入口付近で渋滞が多発。朝夕のラッシュ時は特に混雑します。",
      accessInfo:
        "東葉高速線で都心まで約40分。京成線勝田台駅からも都心へアクセス可能です。",
    },

    characteristics: [
      "2035年頃まで人口増加が続く見込み",
      "東葉高速線沿線の発展が著しい",
      "梨栽培100年以上の歴史",
      "ファミリー層に人気の住宅地",
      "自然環境が豊かで住みやすい",
    ],

    healthcare: {
      description:
        "八千代市は医療機関・介護施設が整備されており、地域包括支援センターも設置されています。訪問看護のニーズも高まっています。",
      features: [
        "地域包括支援センター設置",
        "介護施設・訪問看護ステーション整備",
        "在宅医療の推進",
      ],
    },

    visitableAreas: [
      "八千代台",
      "八千代台東",
      "八千代台西",
      "八千代台南",
      "八千代台北",
      "勝田台",
      "勝田台南",
      "村上",
      "村上南",
      "大和田",
      "大和田新田",
      "高津",
      "八千代市全域",
    ],

    faqs: [
      {
        question: "八千代市の人口は増えていますか？",
        answer:
          "はい、八千代市は2035年頃まで人口増加が続くと予測されています。東葉高速線沿線を中心に宅地開発が進んでいます。",
      },
      {
        question: "八千代市の特産品は何ですか？",
        answer:
          "梨が有名で、100年以上の歴史があります。また、源右衛門鍋は全国鍋グランプリで殿堂入りしています。",
      },
      {
        question: "八千代市への訪問看護は対応していますか？",
        answer:
          "はい、八千代市全域に訪問可能です。事業所（船橋市三山）から車で約15〜30分で訪問できます。",
      },
    ],
  },
  {
    slug: "narashino",
    name: "習志野市",
    title: "習志野市の訪問看護｜フラクタル訪問看護 船橋（24時間対応）",
    description:
      "習志野市の訪問看護はフラクタルへ。24時間365日対応、初回相談無料。高齢化率23.7%の習志野市で信頼される訪問看護ステーション。047-770-1228",
    h1: "習志野市で訪問看護をお探しの方へ",
    intro:
      "習志野市は千葉県北西部に位置し、人口約17.5万人のコンパクトな都市です。人口密度は県内第3位で、津田沼エリアを中心に商業施設が充実。人参「彩誉」や習志野ソーセージなど独自の特産物があり、中学3年生まで医療費一律300円の優遇制度もあります。",

    population: {
      total: "175,184人",
      elderly: "約4.1万人",
      elderlyRate: "23.7%",
      youngRate: "12.0%",
      workingRate: "64.3%",
      source: "習志野市公式統計",
      year: "2024年",
    },

    ageDistribution: {
      young: 12.0,
      working: 64.3,
      elderly: 23.7,
    },

    populationProjection: [
      { year: 2020, total: 168000, elderly: 40000, elderlyRate: 23.8 },
      { year: 2025, total: 176000, elderly: 42000, elderlyRate: 23.9 },
      { year: 2030, total: 176000, elderly: 47000, elderlyRate: 26.7 },
      { year: 2035, total: 176000, elderly: 53000, elderlyRate: 30.1 },
      { year: 2040, total: 175000, elderly: 59000, elderlyRate: 33.7 },
    ],

    specialties: [
      {
        name: "人参「彩誉」",
        description:
          "国の野菜指定産地（昭和42年）。色鮮やかで甘みが強く、にんじん特有のクセがない。",
        category: "agriculture",
      },
      {
        name: "習志野ソーセージ",
        description:
          "約100年前にドイツ式製法が伝わった「ソーセージ製法伝承の地」。",
        category: "food",
      },
      {
        name: "にんじんジュース・クッキー",
        description: "習志野市ふるさと産品に認定された加工食品。",
        category: "food",
      },
    ],

    traffic: {
      mainRoads: ["国道14号（千葉街道）", "国道357号"],
      congestion:
        "国道14号・357号で「ららぽーと渋滞」が発生。商業施設への集中により慢性的な混雑があります。",
      accessInfo:
        "JR津田沼駅から都心まで約30分。市内はコンパクトで移動しやすいのが特徴です。",
    },

    characteristics: [
      "人口密度県内第3位のコンパクトシティ",
      "津田沼エリアは商業施設が充実",
      "中学3年生まで医療費一律300円",
      "下総台地の安定した地盤",
      "ソーセージ製法伝承の地",
    ],

    healthcare: {
      description:
        "習志野市は約100院の医療機関があり、訪問看護ステーションも複数あります。子育て世代への医療費優遇制度もあり、住みやすい環境が整っています。",
      features: [
        "約100院の医療機関",
        "中学3年生まで医療費一律300円",
        "訪問看護ステーション複数",
        "地域包括支援センター設置",
      ],
    },

    visitableAreas: [
      "津田沼",
      "谷津",
      "奏の杜",
      "大久保",
      "実籾",
      "新習志野",
      "袖ケ浦",
      "秋津",
      "香澄",
      "習志野市全域",
    ],

    faqs: [
      {
        question: "習志野市の特徴は何ですか？",
        answer:
          "人口密度県内第3位のコンパクトシティです。津田沼駅周辺は商業施設が充実し、中学3年生まで医療費一律300円の優遇制度があります。",
      },
      {
        question: "習志野市の特産品は何ですか？",
        answer:
          "人参「彩誉」は国の野菜指定産地として知られています。また、約100年前にドイツ式製法が伝わった習志野ソーセージも有名です。",
      },
      {
        question: "習志野市への訪問は近いですか？",
        answer:
          "はい、事業所（船橋市三山）から習志野市内への移動は車で約10〜20分と非常に近いです。",
      },
    ],
  },
  {
    slug: "chiba-hanamigawa",
    name: "千葉市花見川区",
    title: "千葉市花見川区の訪問看護｜フラクタル訪問看護（24時間対応）",
    description:
      "千葉市花見川区の訪問看護ステーション。24時間365日対応。終末期ケア・精神科訪問看護・リハビリに対応。初回相談無料。047-770-1228",
    h1: "千葉市花見川区で訪問看護をお探しの方へ",
    intro:
      "千葉市花見川区は千葉市6区の一つで、人口約17.7万人。幕張エリアと住宅地が混在し、京葉道路を通じて都心へのアクセスも良好です。花見川沿いには住宅地が広がり、高齢化率が比較的高い地域でもあります。",

    population: {
      total: "177,254人",
      elderly: "約5.3万人",
      elderlyRate: "29.9%",
      youngRate: "10.5%",
      workingRate: "59.6%",
      source: "千葉市公式統計",
      year: "2024年",
    },

    ageDistribution: {
      young: 10.5,
      working: 59.6,
      elderly: 29.9,
    },

    populationProjection: [
      { year: 2020, total: 178000, elderly: 50000, elderlyRate: 28.1 },
      { year: 2025, total: 177000, elderly: 53000, elderlyRate: 29.9 },
      { year: 2030, total: 174000, elderly: 56000, elderlyRate: 32.2 },
      { year: 2035, total: 170000, elderly: 58000, elderlyRate: 34.1 },
      { year: 2040, total: 165000, elderly: 58000, elderlyRate: 35.2 },
    ],

    specialties: [
      {
        name: "千葉県産落花生",
        description: "千葉県全体で全国生産の約8割を占める。",
        category: "agriculture",
      },
      {
        name: "ホウレンソウ",
        description: "千葉県は全国1位の生産量。新鮮な野菜が手に入る。",
        category: "agriculture",
      },
      {
        name: "ダイコン",
        description: "千葉県は全国1位の生産量。",
        category: "agriculture",
      },
    ],

    traffic: {
      mainRoads: ["国道357号", "京葉道路", "花輪IC", "幕張IC"],
      congestion:
        "京葉道路の花輪IC・幕張IC周辺で慢性的な渋滞が発生。平日通勤時間帯は特に混雑し、休日夕方も渋滞が多い。",
      accessInfo:
        "JR幕張駅、幕張本郷駅から都心へアクセス可能。京葉道路を利用すれば車での移動も便利です。",
    },

    characteristics: [
      "千葉市6区の一つ",
      "幕張エリアと住宅地が混在",
      "花見川沿いに住宅地が広がる",
      "高齢化率が比較的高い",
      "京葉道路で都心へアクセス",
    ],

    healthcare: {
      description:
        "千葉市全体で48の病院があり、県内1位の医療機関数を誇ります。花見川区にも訪問看護ステーションや介護施設が整備されています。",
      features: [
        "千葉市全体で病院48施設（県内1位）",
        "訪問看護ステーション整備",
        "介護施設・高齢者施設が充実",
      ],
    },

    visitableAreas: [
      "幕張",
      "幕張本郷",
      "幕張町",
      "検見川",
      "検見川町",
      "花見川",
      "こてはし台",
      "さつきが丘",
      "千葉市花見川区全域",
    ],

    faqs: [
      {
        question: "花見川区の高齢化率はどのくらいですか？",
        answer:
          "2024年現在、花見川区の高齢化率は約29.9%で、千葉市内でも高齢化が進んでいる地域です。",
      },
      {
        question: "花見川区への訪問看護は対応していますか？",
        answer:
          "はい、花見川区全域に訪問可能です。事業所から車で約20〜40分で訪問できます。",
      },
      {
        question: "千葉市の特産品は何ですか？",
        answer:
          "千葉県は落花生、ホウレンソウ、ダイコン、エダマメ、日本ナシで全国1位の生産量を誇ります。",
      },
    ],
  },
  {
    slug: "chiba-inage",
    name: "千葉市稲毛区",
    title: "千葉市稲毛区の訪問看護｜フラクタル訪問看護（24時間対応）",
    description:
      "稲毛区で訪問看護をお探しの方へ。フラクタル訪問看護は24時間365日対応。終末期ケア・リハビリに対応。初回相談無料。047-770-1228",
    h1: "千葉市稲毛区で訪問看護をお探しの方へ",
    intro:
      "千葉市稲毛区は千葉市6区の一つで、千葉大学をはじめとする教育機関が集まる文教エリアです。稲毛駅・稲毛海岸駅周辺を中心に、閑静な住宅地が広がっています。落ち着いた住環境で、高齢者にも住みやすい地域です。",

    population: {
      total: "約161,000人",
      elderly: "約4.5万人",
      elderlyRate: "28.0%",
      youngRate: "11.0%",
      workingRate: "61.0%",
      source: "千葉市公式統計",
      year: "2024年",
    },

    ageDistribution: {
      young: 11.0,
      working: 61.0,
      elderly: 28.0,
    },

    populationProjection: [
      { year: 2020, total: 163000, elderly: 43000, elderlyRate: 26.4 },
      { year: 2025, total: 161000, elderly: 45000, elderlyRate: 28.0 },
      { year: 2030, total: 158000, elderly: 48000, elderlyRate: 30.4 },
      { year: 2035, total: 154000, elderly: 50000, elderlyRate: 32.5 },
      { year: 2040, total: 150000, elderly: 50000, elderlyRate: 33.3 },
    ],

    specialties: [
      {
        name: "千葉県産落花生",
        description: "千葉県全体で全国生産の約8割を占める。",
        category: "agriculture",
      },
      {
        name: "ホウレンソウ",
        description: "千葉県は全国1位の生産量。",
        category: "agriculture",
      },
      {
        name: "エダマメ",
        description: "千葉県は全国1位の生産量。",
        category: "agriculture",
      },
    ],

    traffic: {
      mainRoads: ["国道16号", "東関東自動車道千葉北IC", "京葉道路"],
      congestion:
        "国道16号の県立スポーツセンター周辺は混雑が激しく、渋滞が多発。大型車の往来も多い地域です。",
      accessInfo:
        "JR稲毛駅から都心へ約35分。東関東自動車道千葉北ICがあり、車でのアクセスも便利です。",
    },

    characteristics: [
      "千葉市6区の一つ",
      "千葉大学など教育機関が集積する文教エリア",
      "閑静な住宅地が広がる",
      "穏やかな地域性",
      "県立スポーツセンター所在地",
    ],

    healthcare: {
      description:
        "千葉市全体で48の病院があり、県内1位の医療機関数を誇ります。稲毛区にも訪問看護ステーションや介護施設が整備されています。",
      features: [
        "千葉市全体で病院48施設（県内1位）",
        "訪問看護ステーション整備",
        "介護施設・高齢者施設が充実",
      ],
    },

    visitableAreas: [
      "稲毛",
      "稲毛東",
      "稲毛台",
      "小仲台",
      "稲丘町",
      "黒砂",
      "穴川",
      "千葉市稲毛区全域",
    ],

    faqs: [
      {
        question: "稲毛区の特徴は何ですか？",
        answer:
          "千葉大学をはじめとする教育機関が集まる文教エリアで、落ち着いた住環境が特徴です。",
      },
      {
        question: "稲毛区への訪問看護は対応していますか？",
        answer:
          "はい、稲毛区全域に訪問可能です。事業所から車で約20〜30分で訪問できます。",
      },
      {
        question: "千葉市の2040年高齢化率はどうなりますか？",
        answer:
          "千葉市全体で2040年には高齢化率が約33%まで上昇すると予測されています。",
      },
    ],
  },
];

// slugから地域データを取得
export function getRegionalDataBySlug(slug: string): RegionalData | undefined {
  return regionalData.find((area) => area.slug === slug);
}

// 全slugを取得（generateStaticParams用）
export function getAllRegionalSlugs(): string[] {
  return regionalData.map((area) => area.slug);
}

// 5地域の比較データ（比較グラフ用）
export function getRegionalComparison() {
  return regionalData.map((area) => ({
    name: area.name,
    population: parseInt(area.population.total.replace(/[^0-9]/g, "")) || 0,
    elderlyRate: area.ageDistribution.elderly,
  }));
}
