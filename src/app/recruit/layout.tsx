import type { Metadata } from "next";
import { JobPostingStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "採用情報・求人募集 | 訪問看護師・理学療法士・作業療法士",
  description:
    "フラクタル訪問看護 船橋では看護師・理学療法士・作業療法士・言語聴覚士を募集中。船橋市・八千代市・習志野市エリア。入社祝い金最大30万円、年収450万円〜600万円。充実の福利厚生、働きやすい職場環境。",
  keywords: [
    // 求人メインキーワード
    "船橋市 訪問看護 求人",
    "船橋 訪問看護 求人",
    "船橋 看護 求人",
    "訪問看護師 求人 船橋",
    "八千代市 訪問看護 求人",
    "八千代 訪問看護 求人",
    "八千代市 看護師 求人",
    "八千代 看護師 求人",
    "習志野市 訪問看護 求人",
    "習志野 訪問看護 求人",
    "習志野市 看護師 求人",
    "習志野 看護師 求人",
    // 職種別
    "訪問看護師 正社員 千葉",
    "理学療法士 求人 船橋",
    "PT 求人 船橋",
    "作業療法士 求人 船橋",
    "OT 求人 船橋",
    "言語聴覚士 求人 船橋",
    "ST 求人 船橋",
    "訪問リハビリ 求人 千葉",
    // 条件
    "フラクタル 求人",
    "訪問看護 入社祝い金",
    "看護師 高収入 船橋",
    "訪問看護 未経験 歓迎",
    "訪問看護 ブランクOK",
    "訪問看護 年間休日139日",
    "訪問看護 オンコール手当",
  ],
  alternates: {
    canonical: "/recruit",
  },
  openGraph: {
    title: "採用情報・求人募集 | フラクタル訪問看護 船橋",
    description:
      "看護師・セラピスト募集中。入社祝い金最大30万円。船橋市・八千代市エリアの訪問看護ステーション。",
    url: "https://fractal-hokan.com/recruit",
    images: [
      {
        url: "/images/ogp/recruit-ogp.png",
        width: 1200,
        height: 630,
        alt: "フラクタル訪問看護 船橋 採用情報",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "採用情報・求人募集 | フラクタル訪問看護 船橋",
    description:
      "看護師・セラピスト募集中。入社祝い金最大30万円。船橋市・八千代市エリア。",
  },
};

export default function RecruitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JobPostingStructuredData />
      {children}
    </>
  );
}
