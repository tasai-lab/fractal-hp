import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "訪問看護師の1日の流れ｜フラクタル訪問看護 船橋 採用情報",
  description: "フラクタル訪問看護 船橋の訪問看護師の1日の流れをご紹介。船橋市・八千代市・習志野市エリアでの訪問看護の仕事内容、タイムスケジュールをご覧いただけます。",
  alternates: {
    canonical: "/recruit/day-flow",
  },
  openGraph: {
    title: "訪問看護師の1日の流れ｜フラクタル訪問看護 船橋",
    description: "フラクタル訪問看護の訪問看護師の1日の流れをご紹介。",
    type: "website",
    url: "https://fractal-hokan.com/recruit/day-flow",
    images: [{ url: "/images/ogp/recruit-ogp.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "訪問看護師の1日の流れ｜フラクタル訪問看護 船橋",
    description: "フラクタル訪問看護 船橋の訪問看護師の1日の流れをご紹介。船橋市・八千代市・習志野市エリアでの訪問看護の仕事内容をご覧いただけます。",
  },
};

export default function DayFlowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
