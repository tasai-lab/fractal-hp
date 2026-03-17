// 実績データ（2026-03-04時点）

export interface PerformanceMetrics {
  staffCount: {
    nurses: number;
    assistants: number;
    total: number;
  };
  monthlyVisits: number;
  activePatients: number;
  totalVisits: number;
  totalPatients: number;
  patientsByInsurance: {
    care: number;
    medical: number;
    psychiatric: number;
    other: number;
  };
  patientsByArea: {
    funabashi: number;
    narashino: number;
    yachiyo: number;
    chiba: number;
  };
  lastUpdated: string;
}

export const performanceMetrics: PerformanceMetrics = {
  staffCount: {
    nurses: 3,
    assistants: 1,
    total: 4,
  },
  monthlyVisits: 240,
  activePatients: 66,
  totalVisits: 1531,
  totalPatients: 72,
  patientsByInsurance: {
    care: 35,
    medical: 21,
    psychiatric: 7,
    other: 3,
  },
  patientsByArea: {
    funabashi: 27,
    narashino: 22,
    yachiyo: 15,
    chiba: 1,
  },
  lastUpdated: "2026-03-04",
};

// トップページに表示するカウントアップ指標
export interface CountUpMetric {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const countUpMetrics: CountUpMetric[] = [
  {
    value: 240,
    suffix: "件+",
    label: "月間訪問件数",
    description: "2026年2月実績 242件",
  },
  {
    value: 60,
    suffix: "名+",
    label: "ご利用者様数",
    description: "介護・医療・精神科に対応",
  },
  {
    value: 3,
    suffix: "市",
    label: "対応エリア",
    description: "船橋・習志野・八千代",
  },
  {
    value: 1500,
    suffix: "件+",
    label: "累計訪問件数",
    description: "開業からの実績",
  },
];

// 月次成長データ（会社ページ用）
export interface MonthlyGrowthData {
  month: string;    // "2025-06" 形式
  label: string;    // "6月" 形式（チャート表示用）
  visits: number;   // 月間訪問件数
  patients: number; // 利用者数
}

export const monthlyGrowthData: MonthlyGrowthData[] = [
  { month: "2025-06", label: "25/6", visits: 15, patients: 5 },
  { month: "2025-07", label: "25/7", visits: 45, patients: 12 },
  { month: "2025-08", label: "25/8", visits: 72, patients: 20 },
  { month: "2025-09", label: "25/9", visits: 98, patients: 28 },
  { month: "2025-10", label: "25/10", visits: 120, patients: 35 },
  { month: "2025-11", label: "25/11", visits: 145, patients: 40 },
  { month: "2025-12", label: "25/12", visits: 168, patients: 47 },
  { month: "2026-01", label: "26/1", visits: 195, patients: 55 },
  { month: "2026-02", label: "26/2", visits: 242, patients: 62 },
  { month: "2026-03", label: "26/3", visits: 240, patients: 66 },
];
