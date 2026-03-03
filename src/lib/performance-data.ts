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
  totalVisits: 1527,
  totalPatients: 71,
  patientsByInsurance: {
    care: 35,
    medical: 21,
    psychiatric: 7,
    other: 3,
  },
  patientsByArea: {
    funabashi: 26,
    narashino: 22,
    yachiyo: 15,
    chiba: 1,
  },
  lastUpdated: "2026-02-28",
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
