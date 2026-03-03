import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, getServiceBySlug } from "@/lib/services-data";
import {
  BreadcrumbStructuredData,
  generateFAQData,
} from "@/components/StructuredData";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return {
      title: "サービス案内｜フラクタル訪問看護 船橋",
      description: "フラクタル訪問看護のサービスページです。",
    };
  }

  return {
    title: {
      absolute: service.title,
    },
    description: service.description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.description,
      type: "website",
      url: `https://fractal-hokan.com/services/${service.slug}`,
      images: [
        {
          url: "/images/ogp/ogp-image.png",
          width: 1200,
          height: 630,
          alt: `${service.heroTitle}｜フラクタル訪問看護`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
  };
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const faqData = generateFAQData(service.faqs);

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          {
            name: "サービス案内",
            url: "https://fractal-hokan.com/services",
          },
          {
            name: service.heroTitle,
            url: `https://fractal-hokan.com/services/${service.slug}`,
          },
        ]}
      />
      <Script
        id={`structured-data-${service.slug}-faq`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />
      {children}
    </>
  );
}
