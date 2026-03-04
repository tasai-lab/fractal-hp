// 受け入れ可能な身体の状況データ

export type ConditionStatus = "available" | "consultation" | "unavailable";

export interface ConditionItem {
  id: string;
  name: string;
  description: string;
  status: ConditionStatus;
  note?: string;
}

export interface ConditionCategory {
  id: string;
  label: string;
  items: ConditionItem[];
}

// ステータス表示設定
export const statusConfig: Record<ConditionStatus, { label: string; className: string }> = {
  available: {
    label: "○",
    className: "text-[var(--color-logo-dark-green)] font-bold",
  },
  consultation: {
    label: "△",
    className: "text-amber-600 font-bold",
  },
  unavailable: {
    label: "×",
    className: "text-gray-400 font-bold",
  },
};

// 受け入れ可能な身体の状況一覧
export const conditionCategories: ConditionCategory[] = [
  {
    id: "medical-management",
    label: "医療管理",
    items: [
      {
        id: "infusion",
        name: "点滴・注射管理",
        description: "末梢静脈ライン管理、皮下注射など",
        status: "available",
      },
      {
        id: "home-oxygen",
        name: "在宅酸素療法（HOT）",
        description: "酸素濃縮器・液体酸素の管理",
        status: "available",
      },
      {
        id: "ventilator",
        name: "人工呼吸器管理",
        description: "CPAP・BiPAPを含む",
        status: "available",
      },
      {
        id: "tracheotomy",
        name: "気管カニューレ管理",
        description: "気管切開部のケア・交換",
        status: "available",
      },
      {
        id: "central-nutrition",
        name: "中心静脈栄養（IVH）",
        description: "CVポート・PICCラインの管理",
        status: "available",
      },
    ],
  },
  {
    id: "nutrition",
    label: "栄養管理",
    items: [
      {
        id: "gastrostomy",
        name: "胃ろう・経管栄養",
        description: "PEG管理・経鼻胃管栄養",
        status: "available",
      },
    ],
  },
  {
    id: "elimination",
    label: "排泄管理",
    items: [
      {
        id: "catheter",
        name: "膀胱留置カテーテル",
        description: "バルーンカテーテルの管理・交換",
        status: "available",
      },
      {
        id: "stoma",
        name: "人工肛門・人工膀胱（ストーマ）",
        description: "ストーマケア・装具交換",
        status: "available",
      },
    ],
  },
  {
    id: "wound",
    label: "創傷ケア",
    items: [
      {
        id: "pressure-sore",
        name: "褥瘡（じょくそう）処置",
        description: "創傷処置・予防ケア",
        status: "available",
      },
    ],
  },
  {
    id: "medication",
    label: "薬物管理",
    items: [
      {
        id: "medication-management",
        name: "服薬管理・指導",
        description: "内服・外用薬の管理と指導",
        status: "available",
      },
      {
        id: "pain-management",
        name: "疼痛管理",
        description: "麻薬性鎮痛薬を含む疼痛コントロール",
        status: "available",
      },
    ],
  },
  {
    id: "special-care",
    label: "専門ケア",
    items: [
      {
        id: "terminal-care",
        name: "ターミナルケア（看取り）",
        description: "在宅での終末期ケア・看取り支援",
        status: "available",
      },
      {
        id: "psychiatric",
        name: "精神科訪問看護",
        description: "精神疾患・発達障害への専門的支援",
        status: "available",
      },
      {
        id: "dementia",
        name: "認知症ケア",
        description: "認知症の進行予防・生活支援",
        status: "available",
      },
      {
        id: "pediatric",
        name: "小児看護",
        description: "小児特有の疾患・ケアへの対応",
        status: "consultation",
        note: "医療的ケア児など個別にご相談ください",
      },
      {
        id: "rehabilitation",
        name: "リハビリテーション",
        description: "理学療法・作業療法・言語聴覚療法",
        status: "consultation",
        note: "現在リハビリスタッフ不在のため、外部連携での対応となります",
      },
    ],
  },
];

// フラットリスト（テーブル表示用）
export const allConditions: ConditionItem[] = conditionCategories.flatMap(
  (category) => category.items
);
