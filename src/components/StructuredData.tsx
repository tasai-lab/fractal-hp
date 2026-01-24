import Script from "next/script";
import { jobPositions, visitAreas } from "@/lib/recruit-data";
import { serviceFAQs, recruitFAQs, type FAQItem } from "@/lib/faq-data";

// 訪問看護ステーションの構造化データ
const localBusinessData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MedicalBusiness"],
  "@id": "https://fractal-hokan.com/#organization",
  name: "フラクタル訪問看護 船橋",
  alternateName: ["フラクタル訪問看護ステーション", "フラクタル訪問看護"],
  description:
    "船橋市・八千代市・習志野市・千葉市花見川区を中心に365日対応の訪問看護サービスを提供。24時間オンコール対応、終末期ケア、精神科訪問看護、リハビリテーションに対応。",
  url: "https://fractal-hokan.com",
  telephone: "047-770-1228",
  faxNumber: "047-413-0502",
  email: "hokan-f@fractal-group.co.jp",
  image: "https://fractal-hokan.com/images/logos/corporate-logo.png",
  logo: "https://fractal-hokan.com/images/logos/corporate-logo.png",
  priceRange: "保険適用",
  address: {
    "@type": "PostalAddress",
    streetAddress: "三山6丁目22-2 パレドール小川201",
    addressLocality: "船橋市",
    addressRegion: "千葉県",
    postalCode: "274-0072",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.7048,
    longitude: 140.0468,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  areaServed: [
    {
      "@type": "City",
      name: "船橋市",
      "@id": "https://www.wikidata.org/wiki/Q389633",
    },
    {
      "@type": "City",
      name: "八千代市",
    },
    {
      "@type": "City",
      name: "習志野市",
    },
    {
      "@type": "AdministrativeArea",
      name: "千葉市花見川区",
    },
    {
      "@type": "AdministrativeArea",
      name: "千葉市美浜区",
    },
  ],
  medicalSpecialty: [
    "訪問看護",
    "終末期ケア",
    "精神科訪問看護",
    "リハビリテーション",
    "在宅医療",
  ],
  availableService: [
    {
      "@type": "MedicalProcedure",
      name: "訪問看護",
      description: "ご自宅での看護ケア、健康管理、医療処置",
    },
    {
      "@type": "MedicalProcedure",
      name: "訪問リハビリテーション",
      description: "理学療法士・作業療法士・言語聴覚士による在宅リハビリ",
    },
    {
      "@type": "MedicalProcedure",
      name: "精神科訪問看護",
      description: "精神疾患をお持ちの方への訪問看護サービス",
    },
    {
      "@type": "MedicalProcedure",
      name: "終末期ケア",
      description: "ご自宅での看取り、緩和ケア",
    },
  ],
  sameAs: ["https://www.instagram.com/fractal_hokan/"],
  parentOrganization: {
    "@type": "Organization",
    name: "株式会社フラクタル",
    url: "https://fractal-hokan.com/about-fractal",
  },
};

// ウェブサイト構造化データ
const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "フラクタル訪問看護 船橋",
  alternateName: "フラクタル訪問看護",
  url: "https://fractal-hokan.com",
  description:
    "船橋市・八千代市・習志野市を中心とした訪問看護ステーション。24時間365日対応。",
  publisher: {
    "@id": "https://fractal-hokan.com/#organization",
  },
  inLanguage: "ja",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://fractal-hokan.com/?s={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// FAQスキーマ生成関数
export function generateFAQData(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// パンくずリスト生成関数
export function generateBreadcrumbData(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// 求人構造化データ生成関数
export function generateJobPostingData(job: {
  title: string;
  description: string;
  employmentType: string;
  baseSalary: { min: number; max: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: new Date().toISOString().split("T")[0],
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: "フラクタル訪問看護 船橋",
      sameAs: "https://fractal-hokan.com",
      logo: "https://fractal-hokan.com/images/logos/corporate-logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "三山6丁目22-2 パレドール小川201",
        addressLocality: "船橋市",
        addressRegion: "千葉県",
        postalCode: "274-0072",
        addressCountry: "JP",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "JPY",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.baseSalary.min,
        maxValue: job.baseSalary.max,
        unitText: "YEAR",
      },
    },
    jobBenefits: "入社祝い金最大30万円、交通費支給、社会保険完備",
    skills: "看護師免許",
    industry: "医療・福祉",
  };
}

// メインの構造化データコンポーネント（トップページ用）
export default function StructuredData() {
  const serviceFAQData = generateFAQData(serviceFAQs);

  return (
    <>
      <Script
        id="structured-data-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <Script
        id="structured-data-service-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceFAQData),
        }}
      />
    </>
  );
}

// パンくずリストコンポーネント
export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const breadcrumbData = generateBreadcrumbData(items);

  return (
    <Script
      id="structured-data-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData),
      }}
    />
  );
}

// 求人ページ用構造化データコンポーネント
export function JobPostingStructuredData() {
  const nurse = jobPositions.find((j) => j.id === "nurse");
  const therapist = jobPositions.find((j) => j.id === "therapist");

  const nurseJob = generateJobPostingData({
    title: nurse?.title || "訪問看護師（正社員）",
    description: `${nurse?.description || ""} ${visitAreas.join("、")}エリアでの訪問看護業務。${nurse?.details.salary.amount}。${nurse?.details.benefits.join("、")}。`,
    employmentType: "FULL_TIME",
    baseSalary: { min: 4500000, max: 6000000 },
  });

  const therapistJob = generateJobPostingData({
    title: therapist?.title || "訪問リハビリスタッフ（理学療法士/作業療法士/言語聴覚士）",
    description: `${therapist?.description || ""} ${visitAreas.join("、")}エリアでの訪問リハビリテーション業務。${therapist?.details.salary.amount}。${therapist?.details.benefits.join("、")}。`,
    employmentType: "FULL_TIME",
    baseSalary: { min: 4000000, max: 5500000 },
  });

  const recruitFAQData = generateFAQData(recruitFAQs);

  const breadcrumbData = generateBreadcrumbData([
    { name: "ホーム", url: "https://fractal-hokan.com" },
    { name: "採用情報", url: "https://fractal-hokan.com/recruit" },
  ]);

  return (
    <>
      <Script
        id="structured-data-nurse-job"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(nurseJob),
        }}
      />
      <Script
        id="structured-data-therapist-job"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(therapistJob),
        }}
      />
      <Script
        id="structured-data-recruit-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(recruitFAQData),
        }}
      />
      <Script
        id="structured-data-recruit-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
    </>
  );
}

// フラクタルを知るページ用構造化データコンポーネント
export function AboutFractalStructuredData() {
  const breadcrumbData = generateBreadcrumbData([
    { name: "ホーム", url: "https://fractal-hokan.com" },
    { name: "フラクタルを知る", url: "https://fractal-hokan.com/about-fractal" },
  ]);

  return (
    <Script
      id="structured-data-about-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData),
      }}
    />
  );
}

// チラシページ用構造化データコンポーネント
export function FlyersStructuredData() {
  const breadcrumbData = generateBreadcrumbData([
    { name: "ホーム", url: "https://fractal-hokan.com" },
    { name: "チラシ", url: "https://fractal-hokan.com/flyers" },
  ]);

  return (
    <Script
      id="structured-data-flyers-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData),
      }}
    />
  );
}
