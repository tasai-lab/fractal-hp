import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "フラクタルとは｜私たちの理念",
  description:
    "フラクタルとは、小さな部分が集まって全体の形をつくる自然のしくみ。フラクタル訪問看護は、この考え方を大切に、どのスタッフが訪問しても同じ品質のケアを提供します。",
  keywords: [
    "フラクタル",
    "フラクタルとは",
    "フラクタル構造",
    "自己相似性",
    "フラクタル訪問看護",
    "訪問看護 理念",
  ],
  alternates: {
    canonical: "https://fractal-hokan.com/fractal",
  },
  openGraph: {
    title: "フラクタルとは｜フラクタル訪問看護の理念",
    description:
      "フラクタルとは、小さな部分が集まって全体の形をつくる自然のしくみ。私たちはこの考え方を訪問看護に活かしています。",
    url: "https://fractal-hokan.com/fractal",
    type: "article",
  },
};

// フラクタル構造化データ
function FractalStructuredData() {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "フラクタルとは｜フラクタル訪問看護の理念",
    description:
      "フラクタルとは、小さな部分が集まって全体の形をつくる自然のしくみ。フラクタル訪問看護の理念を解説。",
    author: {
      "@type": "Organization",
      name: "株式会社フラクタル",
    },
    publisher: {
      "@type": "Organization",
      name: "フラクタル訪問看護 船橋",
      logo: {
        "@type": "ImageObject",
        url: "https://fractal-hokan.com/images/logos/corporate-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fractal-hokan.com/fractal",
    },
    keywords: "フラクタル, 自己相似性, 訪問看護, 理念",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  );
}

export default function FractalPage() {
  return (
    <>
      <Header />
      <FractalStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "フラクタルとは", url: "https://fractal-hokan.com/fractal" },
        ]}
      />

      <main className="min-h-screen bg-gradient-to-b from-[var(--color-paper)] to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-logo-dark-green)] mb-6 heading-gothic">
              フラクタル
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-ink-soft)] leading-relaxed">
              「フラクタル」という言葉を、耳にしたことはありますか？
              <br className="hidden md:block" />
              それは、自然界のあちこちに隠れている、美しく不思議な「かたち」の法則。
              <br className="hidden md:block" />
              そして、私たちの理念そのものを表す言葉でもあります。
            </p>
          </div>
        </section>

        {/* Part 1: 一般的なフラクタル */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-12">
              <span className="text-sm font-medium text-[var(--color-logo-light-green)] tracking-wider">
                PART 1
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-ink)] mt-2 heading-gothic">
                フラクタルとは
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8">
                フラクタルとは、どんなに小さな一部分を切り取っても、全体とよく似た形をしている構造のこと。
                「小さな部分が集まって、全体の形をつくる」自然のしくみです。
              </p>

              <h3 className="text-xl font-bold text-[var(--color-ink)] mt-12 mb-6">
                自然界のフラクタル
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "雪の結晶",
                    desc: "どこまで近づいて見ても、美しい六角形のパターンが繰り返されています",
                  },
                  {
                    title: "木の枝",
                    desc: "幹から太い枝へ、そして細い小枝へと、同じパターンで分かれていきます",
                  },
                  {
                    title: "シダの葉",
                    desc: "一枚の葉の形が、小さな葉脈の形と相似しています",
                  },
                  {
                    title: "血管",
                    desc: "太い血管から細い毛細血管まで、同じ分岐パターンが続きます",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-[var(--color-paper)] rounded-2xl p-6"
                  >
                    <h4 className="font-bold text-[var(--color-ink)] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--color-ink-soft)]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                この「どこを切り取っても、同じ質やパターンが見える」という性質が、
                <strong className="text-[var(--color-ink)]">自己相似性</strong>
                です。そして、これが私たちのサービスの原点になっています。
              </p>
            </div>
          </div>
        </section>

        {/* Part 2: 私たちのフラクタル */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--color-accent-mint-light)]/30 to-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-12">
              <span className="text-sm font-medium text-[var(--color-logo-dark-green)] tracking-wider">
                PART 2
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-ink)] mt-2 heading-gothic">
                私たちのフラクタル構造
              </h2>
            </div>

            {/* 不完全なフラクタル */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-12">
              <h3 className="text-xl font-bold text-[var(--color-ink)] mb-4">
                ひとつひとつが、ユニークなかたち
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
                自然界のフラクタルがそうであるように、私たちの組織も、完璧に整った幾何学模様ではありません。
                雪の結晶に同じものが一つとしてないように、スタッフも一人ひとり、得意なことや個性が異なります。
              </p>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                私たちは、その
                <strong className="text-[var(--color-logo-dark-green)]">
                  「違い」こそが組織の美しさであり、強さ
                </strong>
                だと信じています。
                それぞれの個性を尊重し、互いに補い合いながら、チームとして一つの温かい「かたち」を作っています。
              </p>
            </div>

            {/* 自己相似性 = 品質 */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-12">
              <h3 className="text-xl font-bold text-[var(--color-ink)] mb-4">
                どこを切り取っても、温かいケアを
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">
                フラクタルの自己相似性を、私たちはサービス品質に活かしています。
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    level: "スタッフ一人ひとり",
                    desc: "フラクタルの心のこもったケアを",
                  },
                  {
                    level: "チームとして",
                    desc: "変わらない安心感を",
                  },
                  {
                    level: "組織全体で",
                    desc: "一貫した品質と思いを",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-3 h-3 mt-2 rounded-full bg-[var(--color-logo-light-green)] flex-shrink-0" />
                    <div>
                      <span className="font-bold text-[var(--color-ink)]">
                        {item.level}
                      </span>
                      <span className="text-[var(--color-ink-soft)]">
                        が、{item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                「今日の担当は誰だろう？」という不安を、
                「誰が来ても、いつもの安心がそこにある」という信頼へ。
                これが私たちの目指す自己相似性です。
              </p>
            </div>

            {/* 仕組み */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-12">
              <h3 className="text-xl font-bold text-[var(--color-ink)] mb-4">
                仕組みが質の高いサービスを作る
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
                私たちは、特定の人だけに頼らないチームづくりを進めています。
                個人の頑張りだけに頼るのではなく、しっかりとした
                <strong className="text-[var(--color-logo-dark-green)]">
                  「仕組み」
                </strong>
                を整えることで、サービスの質を支えています。
              </p>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                情報共有と日々の振り返りを重ね、スタッフ個人、チーム、ステーション全体で、同じ目標に向かって動く。
                これが、フラクタルのように広がる、安定した訪問看護の品質につながります。
              </p>
            </div>

            {/* 好循環 */}
            <div className="bg-gradient-to-br from-[var(--color-logo-light-green)]/10 to-[var(--color-logo-yellow)]/10 rounded-3xl p-8 md:p-12">
              <h3 className="text-xl font-bold text-[var(--color-ink)] mb-6">
                めぐり、つながる「幸せのフラクタル」
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8">
                私たちのフラクタル構造が目指すのは、関わる人すべてが幸せになる、ポジティブな循環です。
              </p>

              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="bg-white rounded-2xl px-6 py-4 shadow-sm text-center w-full max-w-md">
                  <p className="text-[var(--color-ink)] font-medium">
                    会社がスタッフを大切に想い、働きやすい環境を作る
                  </p>
                </div>
                <div className="text-2xl text-[var(--color-logo-light-green)]">
                  ↓
                </div>
                <div className="bg-white rounded-2xl px-6 py-4 shadow-sm text-center w-full max-w-md">
                  <p className="text-[var(--color-ink)] font-medium">
                    満たされたスタッフが、心からの優しさでご利用者様を支える
                  </p>
                </div>
                <div className="text-2xl text-[var(--color-logo-light-green)]">
                  ↓
                </div>
                <div className="bg-white rounded-2xl px-6 py-4 shadow-sm text-center w-full max-w-md">
                  <p className="text-[var(--color-ink)] font-medium">
                    ご利用者様の笑顔と「ありがとう」が、会社の喜びと成長につながる
                  </p>
                </div>
                <div className="text-2xl text-[var(--color-logo-light-green)]">
                  ↻
                </div>
              </div>

              <p className="text-[var(--color-ink-soft)] leading-relaxed text-center">
                会社とスタッフ、スタッフとご利用者様、そしてご利用者様と会社。
                <br />
                それぞれの関係が美しい相似形を描きながら、全体として幸せな循環を生み出していく。
                <br />
                <strong className="text-[var(--color-logo-dark-green)]">
                  それが、私たち株式会社フラクタルの目指す、訪問看護のあり方です。
                </strong>
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-ink)] mb-6 heading-gothic">
              フラクタル訪問看護について
            </h2>
            <p className="text-[var(--color-ink-soft)] mb-8">
              私たちのサービスや採用情報について、詳しくはこちらをご覧ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about-fractal"
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-logo-dark-green)] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                フラクタルを知る
              </Link>
              <Link
                href="/recruit"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] rounded-full font-medium hover:bg-[var(--color-logo-dark-green)] hover:text-white transition-colors"
              >
                採用情報
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
