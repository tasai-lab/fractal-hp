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
      name: "千葉市稲毛区",
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
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "047-770-1228",
      availableLanguage: "ja",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "19:00",
      },
    },
    {
      "@type": "ContactPoint",
      contactType: "24時間緊急対応",
      telephone: "047-770-1228",
      availableLanguage: "ja",
      description: "24時間オンコール体制で緊急時も対応いたします",
    },
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "株式会社フラクタル",
    url: "https://fractal-hokan.com/company",
  },
};

// サービス構造化データ（SEO強化用）
const serviceData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://fractal-hokan.com/#service",
  name: "フラクタル訪問看護サービス",
  description:
    "船橋市・八千代市・習志野市・千葉市花見川区を中心とした訪問看護サービス。24時間365日対応。終末期ケア、精神科訪問看護、訪問リハビリテーションに対応。",
  provider: {
    "@id": "https://fractal-hokan.com/#organization",
  },
  serviceType: "訪問看護",
  areaServed: [
    { "@type": "City", name: "船橋市" },
    { "@type": "City", name: "八千代市" },
    { "@type": "City", name: "習志野市" },
    { "@type": "AdministrativeArea", name: "千葉市花見川区" },
    { "@type": "AdministrativeArea", name: "千葉市稲毛区" },
    { "@type": "AdministrativeArea", name: "千葉市美浜区" },
  ],
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://fractal-hokan.com",
    servicePhone: {
      "@type": "ContactPoint",
      telephone: "047-770-1228",
      contactType: "customer service",
      availableLanguage: "ja",
    },
    availableLanguage: "ja",
  },
  hoursAvailable: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "19:00",
  },
  offers: {
    "@type": "Offer",
    description: "医療保険・介護保険適用（自己負担1〜3割）",
    priceCurrency: "JPY",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "訪問看護サービス一覧",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "訪問看護",
        description: "看護師による健康管理、医療処置、服薬管理、療養上のケア",
      },
      {
        "@type": "OfferCatalog",
        name: "訪問リハビリテーション",
        description: "理学療法士・作業療法士・言語聴覚士による在宅リハビリ",
      },
      {
        "@type": "OfferCatalog",
        name: "精神科訪問看護",
        description: "精神疾患をお持ちの方への訪問看護サービス",
      },
      {
        "@type": "OfferCatalog",
        name: "終末期ケア",
        description: "ご自宅での看取り支援、緩和ケア",
      },
    ],
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
  benefits: string[];
  skills: string;
  locations: string[];
}) {
  const baseAddress = {
    "@type": "PostalAddress",
    streetAddress: "三山6丁目22-2 パレドール小川201",
    addressLocality: "船橋市",
    addressRegion: "千葉県",
    postalCode: "274-0072",
    addressCountry: "JP",
  };

  const jobLocations = job.locations.length
    ? job.locations.map((area) => ({
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: area,
          addressRegion: "千葉県",
          addressCountry: "JP",
        },
      }))
    : [
        {
          "@type": "Place",
          address: baseAddress,
        },
      ];

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
    jobLocation: jobLocations,
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
    jobBenefits: job.benefits.join("、"),
    skills: job.skills,
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
        id="structured-data-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceData),
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
export function RecruitStructuredData() {
  const recruitFAQData = generateFAQData(recruitFAQs);

  const breadcrumbData = generateBreadcrumbData([
    { name: "ホーム", url: "https://fractal-hokan.com" },
    { name: "採用情報", url: "https://fractal-hokan.com/recruit" },
  ]);

  return (
    <>
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

// 求人詳細ページ用構造化データコンポーネント
export function JobPostingStructuredData({ jobId }: { jobId: string }) {
  const job = jobPositions.find((item) => item.id === jobId);

  if (!job) {
    return null;
  }

  const isNurse = job.id === "nurse";
  const holidayLabel = isNurse ? "年間休日139日以上" : "年間休日120日以上";
  const skills = isNurse
    ? "看護師免許"
    : "理学療法士免許、作業療法士免許、言語聴覚士免許";
  // 給与テーブル実データ基準（seed-salary-structures.ts）
  const baseSalary = isNurse
    ? { min: 4650000, max: 6510000 } // 看護師: P1(465万)〜P9(651万)
    : { min: 3860000, max: 5450000 }; // リハ職: P1(386万)〜P8(545万)

  const jobPosting = generateJobPostingData({
    title: `${job.title}（正社員）`,
    description: `${job.description} ${visitAreas.join("、")}エリアでの訪問業務。${job.details.salary.amount}。${holidayLabel}。`,
    employmentType: "FULL_TIME",
    baseSalary,
    benefits: ["入社祝い金最大30万円", holidayLabel, ...job.details.benefits],
    skills,
    locations: visitAreas,
  });

  return (
    <Script
      id={`structured-data-${job.id}-job`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jobPosting),
      }}
    />
  );
}

// 会社情報ページ用構造化データコンポーネント
export function AboutFractalStructuredData() {
  const breadcrumbData = generateBreadcrumbData([
    { name: "ホーム", url: "https://fractal-hokan.com" },
    { name: "株式会社フラクタル", url: "https://fractal-hokan.com/company" },
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

// 募集開始日・有効期限（ビルド時の日付を基準に動的生成）
// 注意: 定期的なビルドで日付が更新される
const today = new Date();
const JOB_POSTED_DATE = today.toISOString().split("T")[0];
const JOB_VALID_THROUGH = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0]; // 180日後

// 事業所住所（全エリアで共通）
const OFFICE_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "三山6丁目22-2 パレドール小川201",
  addressLocality: "船橋市",
  addressRegion: "千葉県",
  postalCode: "274-0072",
  addressCountry: "JP",
};

// エリア別求人構造化データコンポーネント
export function AreaJobPostingStructuredData({
  areaName,
  areaSlug,
}: {
  areaName: string;
  areaSlug: string;
}) {
  const nurseJobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `訪問看護師（${areaName}エリア）`,
    description: `${areaName}エリアでの訪問看護業務。年間休日139日以上、入社祝い金最大30万円。直行直帰OK、AI活用で記録業務を効率化。`,
    datePosted: JOB_POSTED_DATE,
    validThrough: JOB_VALID_THROUGH,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "フラクタル訪問看護 船橋",
      sameAs: "https://fractal-hokan.com",
      logo: "https://fractal-hokan.com/images/logos/corporate-logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: OFFICE_ADDRESS,
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "JPY",
      value: {
        "@type": "QuantitativeValue",
        minValue: 4650000, // 看護師P1
        maxValue: 6510000, // 看護師P9
        unitText: "YEAR",
      },
    },
    jobBenefits: "入社祝い金最大30万円、年間休日139日以上、社用車貸与、直行直帰OK",
    skills: "看護師免許、普通自動車運転免許",
    industry: "医療・福祉",
    directApply: true,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "JP",
    },
  };

  const therapistJobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `理学療法士・作業療法士・言語聴覚士（${areaName}エリア）`,
    description: `${areaName}エリアでの訪問リハビリテーション業務。年間休日120日以上、入社祝い金最大30万円。直行直帰OK。`,
    datePosted: JOB_POSTED_DATE,
    validThrough: JOB_VALID_THROUGH,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "フラクタル訪問看護 船橋",
      sameAs: "https://fractal-hokan.com",
      logo: "https://fractal-hokan.com/images/logos/corporate-logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: OFFICE_ADDRESS,
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "JPY",
      value: {
        "@type": "QuantitativeValue",
        minValue: 3860000, // リハ職P1
        maxValue: 5450000, // リハ職P8
        unitText: "YEAR",
      },
    },
    jobBenefits: "入社祝い金最大30万円、年間休日120日以上、社用車貸与、直行直帰OK、賞与年2回（基本給2ヶ月分）",
    skills: "理学療法士免許、作業療法士免許、言語聴覚士免許のいずれか、普通自動車運転免許",
    industry: "医療・福祉",
    directApply: true,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "JP",
    },
  };

  return (
    <>
      <Script
        id={`structured-data-${areaSlug}-nurse-job`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(nurseJobPosting),
        }}
      />
      <Script
        id={`structured-data-${areaSlug}-therapist-job`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(therapistJobPosting),
        }}
      />
    </>
  );
}

// エリア別FAQスキーマコンポーネント
export function AreaFAQStructuredData({
  faqs,
  areaSlug,
}: {
  faqs: { question: string; answer: string }[];
  areaSlug: string;
}) {
  if (!faqs || faqs.length === 0) return null;

  const faqData = {
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

  return (
    <Script
      id={`structured-data-${areaSlug}-faq`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}
