import type { Metadata } from "next";
import { BreadcrumbStructuredData, generateFAQData } from "@/components/StructuredData";
import Script from "next/script";
import { pricingFAQs } from "@/lib/pricing-data";

export const metadata: Metadata = {
  title: {
    absolute: "訪問看護の料金【自己負担1〜3割】介護保険・医療保険適用｜船橋市｜フラクタル訪問看護",
  },
  description: "船橋市の訪問看護料金をわかりやすく解説。介護保険・医療保険が適用され自己負担は1〜3割。看護師訪問・PT・OT・ST訪問リハビリ・精神科訪問看護の料金表を掲載。まずはお気軽にお問い合わせください。047-770-1228",
  keywords: [
    "訪問看護 料金",
    "訪問看護 費用",
    "訪問看護 料金 船橋",
    "訪問看護 介護保険 料金",
    "訪問看護 医療保険 料金",
    "訪問リハビリ 料金",
    "精神科訪問看護 料金",
    "訪問看護 自己負担",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "訪問看護の料金【自己負担1〜3割】介護保険・医療保険適用｜船橋市｜フラクタル訪問看護",
    description: "船橋市の訪問看護料金をわかりやすく解説。介護保険・医療保険が適用され自己負担は1〜3割。看護師訪問・PT・OT・ST訪問リハビリ・精神科訪問看護の料金表を掲載。",
    type: "website",
    url: "https://fractal-hokan.com/pricing",
    images: [{ url: "/images/ogp/ogp-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "訪問看護の料金【自己負担1〜3割】介護保険・医療保険適用｜船橋市｜フラクタル訪問看護",
    description: "船橋市の訪問看護料金。介護保険・医療保険が適用され自己負担は1〜3割。",
    images: ["/images/ogp/ogp-image.png"],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqData = generateFAQData(pricingFAQs);

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "ご利用料金", url: "https://fractal-hokan.com/pricing" },
        ]}
      />
      <Script
        id="structured-data-pricing-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />
      {children}
    </>
  );
}
