import Link from "next/link";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import {
  documents,
  documentCategories,
  type Document,
} from "@/lib/documents-data";

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

export default function DocumentsPage() {
  return (
    <main className="pt-14 lg:pt-20 bg-white">
      {/* Hero Section */}
      <div className="px-4 md:px-8 py-6 md:py-10">
        <section className="relative min-h-[30vh] md:min-h-[35vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#d4edda] rounded-3xl md:rounded-[3rem] shadow-lg">
          {/* 背景装飾 */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="0,0 100,0 100,100" fill="white" />
              <polygon
                points="0,100 50,0 100,100"
                fill="white"
                opacity="0.5"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-20 text-center text-[var(--color-logo-dark-green)]">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium tracking-wider mb-6 bg-white/60 text-[var(--color-logo-dark-green)]">
              DOCUMENTS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-gothic">
              各種書類・情報公開
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-ink-soft)]">
              事業継続計画（BCP）、契約書、重要事項説明書等の各種書類を掲載しています
            </p>
          </div>
        </section>
      </div>

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
                  <p className="mt-2 text-gray-500">{category.description}</p>
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
          <span className="text-gray-600">各種書類・情報公開</span>
        </nav>
      </div>
    </main>
  );
}
