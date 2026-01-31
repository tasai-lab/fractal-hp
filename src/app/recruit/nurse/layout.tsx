import type { Metadata } from "next";
import { BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "船橋市・八千代市 訪問看護師求人 | 年休139日・祝金30万円 | フラクタル訪問看護",
  description:
    "船橋市・八千代市・習志野市で訪問看護師を募集。年間休日139日以上、入社祝い金最大30万円、月給341,000円〜。直行直帰OK、AI活用で記録業務を効率化。臨床経験3年以上、訪問未経験・ブランク可。",
  alternates: {
    canonical: "/recruit/nurse",
  },
  openGraph: {
    title: "船橋市・八千代市 訪問看護師求人 | 年休139日・祝金30万円 | フラクタル訪問看護",
    description:
      "船橋市・八千代市・習志野市で訪問看護師を募集。年間休日139日以上、入社祝い金最大30万円、月給341,000円〜。直行直帰OK、AI活用で記録業務を効率化。臨床経験3年以上、訪問未経験・ブランク可。",
    url: "https://fractal-hokan.com/recruit/nurse",
    images: [
      {
        url: "/images/ogp/recruit-ogp.png",
        width: 1200,
        height: 630,
        alt: "フラクタル訪問看護 看護師求人",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "船橋市・八千代市 訪問看護師求人 | 年休139日・祝金30万円 | フラクタル訪問看護",
    description:
      "船橋市・八千代市・習志野市で訪問看護師を募集。年間休日139日以上、入社祝い金最大30万円、月給341,000円〜。直行直帰OK、AI活用で記録業務を効率化。臨床経験3年以上、訪問未経験・ブランク可。",
  },
};

export default function RecruitNurseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "採用情報", url: "https://fractal-hokan.com/recruit" },
          { name: "看護師求人", url: "https://fractal-hokan.com/recruit/nurse" },
        ]}
      />
      {children}
    </>
  );
}
