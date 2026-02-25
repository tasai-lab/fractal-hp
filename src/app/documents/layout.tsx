import type { Metadata } from "next";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "各種書類・情報公開",
  description:
    "フラクタル訪問看護 船橋の事業継続計画（BCP）、契約書、重要事項説明書等の各種書類を掲載しています。",
  keywords: [
    "訪問看護 BCP",
    "事業継続計画",
    "重要事項説明書",
    "訪問看護 契約書",
    "フラクタル訪問看護 船橋",
  ],
  alternates: {
    canonical: "/documents",
  },
  openGraph: {
    title: "各種書類・情報公開 | フラクタル訪問看護 船橋",
    description:
      "フラクタル訪問看護 船橋の事業継続計画（BCP）、契約書、重要事項説明書等の各種書類を掲載しています。",
    url: "https://fractal-hokan.com/documents",
  },
};

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          {
            name: "各種書類・情報公開",
            url: "https://fractal-hokan.com/documents",
          },
        ]}
      />
      <Header />
      {children}
      <Footer />
    </>
  );
}
