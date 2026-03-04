import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import {
  documents,
  documentCategories,
  type Document,
} from "@/lib/documents-data";
import { getStation, getAllStationSlugs } from "@/lib/stations-data";

export function generateStaticParams() {
  return getAllStationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    return {
      title: "各種書類・情報公開｜フラクタル訪問看護",
      description: "事業継続計画（BCP）、契約書、重要事項説明書等の各種書類を掲載しています。",
    };
  }

  return {
    title: `各種書類・情報公開｜${station.name}`,
    description: `${station.name}の事業継続計画（BCP）、契約書、重要事項説明書等の各種書類を掲載しています。`,
    alternates: {
      canonical: `https://fractal-hokan.com/stations/${station.slug}/documents`,
    },
    openGraph: {
      title: `各種書類・情報公開｜${station.name}`,
      description: "事業継続計画（BCP）、契約書、重要事項説明書等の各種書類を掲載しています。",
      type: "website",
      url: `https://fractal-hokan.com/stations/${station.slug}/documents`,
      siteName: "フラクタル訪問看護",
      locale: "ja_JP",
    },
  };
}

function DocumentCard({ doc }: { doc: Document }) {
  return (
    <a
      href={doc.filePath}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${doc.title}（PDF、${doc.fileSize}、新しいタブで開く）`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden hover-lift"
    >
      <div className="p-6 flex items-start gap-4">
        {/* PDFアイコン */}
        <div className="shrink-0 w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
          <svg
            className="w-7 h-7 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 3v5a1 1 0 001 1h5"
            />
            <text
              x="8.5"
              y="18"
              fontSize="5"
              fill="currentColor"
              fontWeight="bold"
              stroke="none"
            >
              PDF
            </text>
          </svg>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 group-hover:text-[var(--color-logo-dark-green)] transition-colors leading-snug">
            {doc.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 leading-relaxed">
            {doc.description}
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {doc.fileSize}
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {doc.updatedAt}
            </span>
          </div>
        </div>

        {/* 矢印 */}
        <div className="shrink-0 self-center">
          <svg
            className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-logo-dark-green)] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default async function StationDocumentsPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    notFound();
  }

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          {
            name: "ステーション一覧",
            url: "https://fractal-hokan.com/stations",
          },
          {
            name: station.name,
            url: `https://fractal-hokan.com/stations/${station.slug}`,
          },
          {
            name: "各種書類・情報公開",
            url: `https://fractal-hokan.com/stations/${station.slug}/documents`,
          },
        ]}
      />

      <PageHero
        label="DOCUMENTS"
        title="各種書類・情報公開"
        description="事業継続計画（BCP）、契約書、重要事項説明書等の各種書類を掲載しています"
      />

      {/* 書類一覧 */}
      <div className="relative overflow-hidden">
        <BackgroundTriangles pattern="company" />
        <div className="max-w-4xl mx-auto px-4 py-10 md:py-14 relative z-10">
          {documentCategories.map((category) => {
            const categoryDocs = documents.filter(
              (doc) => doc.category === category.id
            );
            if (categoryDocs.length === 0) return null;

            return (
              <section key={category.id} className="mb-12 last:mb-0">
                <div className="mb-6 text-center">
                  <h2
                    className="heading-gothic font-bold text-[var(--color-logo-dark-green)]"
                    style={{ fontSize: "var(--font-size-fluid-xl)" }}
                  >
                    {category.title}
                  </h2>
                  <p className="mt-2 text-[var(--color-ink-soft)]">
                    {category.description}
                  </p>
                </div>
                <div className="space-y-4">
                  {categoryDocs.map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* パンくずナビ */}
      <div className="bg-gray-50 py-4">
        <nav
          aria-label="パンくずリスト"
          className="max-w-4xl mx-auto px-4 text-sm text-gray-400"
        >
          <Link
            href="/"
            className="hover:text-[var(--color-logo-dark-green)] transition-colors"
          >
            ホーム
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/stations"
            className="hover:text-[var(--color-logo-dark-green)] transition-colors"
          >
            ステーション一覧
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/stations/${station.slug}`}
            className="hover:text-[var(--color-logo-dark-green)] transition-colors"
          >
            {station.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">各種書類・情報公開</span>
        </nav>
      </div>
    </>
  );
}
