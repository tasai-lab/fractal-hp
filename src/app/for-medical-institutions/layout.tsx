import type { Metadata } from "next";
import { BreadcrumbStructuredData, generateFAQData } from "@/components/StructuredData";
import Script from "next/script";

// 医療機関向けFAQ
const medicalInstitutionFAQs = [
  {
    question: "訪問看護指示書はどのように発行すればよいですか？",
    answer: "厚生労働省の様式に準拠した指示書をFAXまたは郵送でお送りください。指示書の様式についてご不明点があればお気軽にお問い合わせください。"
  },
  {
    question: "退院前カンファレンスに参加してもらえますか？",
    answer: "はい、可能な限り参加いたします。オンライン参加も対応可能です。日程調整はお電話にてご相談ください。"
  },
  {
    question: "医療依存度の高い患者も対応可能ですか？",
    answer: "はい、人工呼吸器管理、中心静脈栄養、胃ろう管理、ストーマケアなど、医療依存度の高い方にも対応しております。"
  },
  {
    question: "急変時の報告体制はどうなっていますか？",
    answer: "24時間オンコール体制を敷いており、急変時は速やかに主治医へご連絡いたします。状況に応じて救急搬送の手配も行います。"
  }
];

export const metadata: Metadata = {
  title: "医療機関の皆様へ｜退院支援・在宅医療連携",
  description: "船橋市・八千代市・習志野市の医療機関様へ。フラクタル訪問看護は退院支援から在宅療養まで連携。訪問看護指示書の受付、24時間対応、定期報告体制完備。047-770-1228",
  keywords: [
    "訪問看護 医療連携 船橋",
    "主治医指示 訪問看護",
    "退院支援 訪問看護",
    "在宅医療 連携",
    "訪問看護指示書",
    "医療機関 訪問看護",
  ],
  alternates: {
    canonical: "/for-medical-institutions",
  },
  openGraph: {
    title: "医療機関の皆様へ｜退院支援・在宅医療連携",
    description: "船橋市・八千代市・習志野市の医療機関様へ。フラクタル訪問看護は退院支援から在宅療養まで連携。訪問看護指示書の受付、24時間対応、定期報告体制完備。",
    url: "https://fractal-hokan.com/for-medical-institutions",
    images: [{ url: "/images/ogp/ogp-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "医療機関の皆様へ｜退院支援・在宅医療連携",
    description: "船橋市・八千代市・習志野市の医療機関様へ。退院支援から在宅療養まで連携。24時間対応。",
    images: ["/images/ogp/ogp-image.png"],
  },
};

export default function ForMedicalInstitutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqData = generateFAQData(medicalInstitutionFAQs);

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "医療機関の皆様へ", url: "https://fractal-hokan.com/for-medical-institutions" },
        ]}
      />
      <Script
        id="structured-data-medical-institution-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />
      {children}
    </>
  );
}
