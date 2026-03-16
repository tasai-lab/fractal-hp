import type { FAQItem } from "./faq-data";
import { serviceFAQs } from "./faq-data";
import type { CountUpMetric } from "./performance-data";
import { countUpMetrics as globalCountUpMetrics } from "./performance-data";
import { flowSteps as globalFlowSteps } from "./data";

// ご利用の流れ
export type FlowStep = {
  step: number;
  title: string;
  description: string;
};

// エリア別利用者数
export type AreaBreakdown = {
  area: string;
  count: number;
};

// 採用サマリー（事業所ページ用簡易表示）
export type RecruitSummary = {
  positions: {
    title: string;
    salaryRange: string;
    highlights: string[];
  }[];
  signOnBonusTotal: number;
};

// 事業所固有コンテンツ
export type StationContent = {
  slug: string;
  faq: FAQItem[];
  flowSteps: FlowStep[];
  countUpMetrics: CountUpMetric[];
  areaBreakdown: AreaBreakdown[];
  areaBreakdownLastUpdated: string;
  recruitSummary: RecruitSummary;
};

const stationContents: StationContent[] = [
  {
    slug: "funabashi",
    // 船橋事業所はグローバルFAQ/Flowをそのまま使用（事業所固有の内容が必要になったらオーバーライド）
    faq: serviceFAQs,
    flowSteps: globalFlowSteps,
    countUpMetrics: globalCountUpMetrics,
    areaBreakdown: [
      { area: "船橋市", count: 27 },
      { area: "習志野市", count: 22 },
      { area: "八千代市", count: 15 },
      { area: "千葉市", count: 1 },
    ],
    areaBreakdownLastUpdated: "2026年2月末",
    recruitSummary: {
      positions: [
        {
          title: "看護師",
          salaryRange: "月給341,000円〜494,400円",
          highlights: ["年間休日139日以上", "年収500万円以上可能", "24時間オンコール手当あり"],
        },
        {
          title: "理学療法士・作業療法士・言語聴覚士",
          salaryRange: "月給278,000円〜409,000円",
          highlights: ["年間休日120日以上", "年収400万円以上可能", "直行直帰OK・副業OK"],
        },
      ],
      signOnBonusTotal: 300000,
    },
  },
];

export function getStationContent(slug: string): StationContent | undefined {
  return stationContents.find((c) => c.slug === slug);
}
