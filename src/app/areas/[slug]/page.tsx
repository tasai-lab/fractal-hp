import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { serviceAreas, getServiceAreaBySlug } from "@/lib/service-areas";

export function generateStaticParams() {
  return serviceAreas.map((area) => ({
    slug: area.slug,
  }));
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const area = getServiceAreaBySlug(resolvedParams.slug);

  if (!area) {
    notFound();
  }

  // 他の地域へのリンク
  const otherAreas = serviceAreas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20">
        {/* ヒーローセクション */}
        <section className="bg-gradient-to-br from-[var(--color-logo-light-green)]/20 to-[var(--color-logo-yellow)]/20 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-[var(--color-logo-dark-green)] mb-2">
                フラクタル訪問看護 船橋
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-logo-dark-green)] mb-6 heading-gothic">
                {area.h1}
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                {area.intro}
              </p>
              <div className="mt-8">
                <a
                  href="tel:047-770-1228"
                  className="inline-flex items-center gap-2 bg-[var(--color-logo-dark-green)] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[var(--color-logo-dark-green)]/90 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  047-770-1228
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 地域情報セクション */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                {area.name}について
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[var(--color-logo-light-green)]/10 p-6 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">人口</p>
                  <p className="text-2xl font-bold text-[var(--color-logo-dark-green)]">
                    {area.areaInfo.population}
                  </p>
                </div>
                <div className="bg-[var(--color-logo-light-green)]/10 p-6 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">高齢化率</p>
                  <p className="text-2xl font-bold text-[var(--color-logo-dark-green)]">
                    {area.areaInfo.elderlyRate}
                  </p>
                </div>
                <div className="bg-[var(--color-logo-light-green)]/10 p-6 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">対応体制</p>
                  <p className="text-2xl font-bold text-[var(--color-logo-dark-green)]">
                    24時間対応
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-[var(--color-logo-dark-green)] mb-4">
                  地域の特徴
                </h3>
                <ul className="space-y-2">
                  {area.areaInfo.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[var(--color-logo-light-green)] mt-1">
                        ●
                      </span>
                      <span className="text-gray-700">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 訪問可能エリア */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                {area.name}の訪問可能エリア
              </h2>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {area.visitableAreas.map((areaName, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[var(--color-logo-light-green)]/20 text-[var(--color-logo-dark-green)] rounded-full text-sm"
                    >
                      {areaName}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-gray-600 text-sm">{area.accessInfo}</p>
              </div>
            </div>
          </div>
        </section>

        {/* サービス内容 */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                {area.name}で提供する訪問看護サービス
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "訪問看護",
                    desc: "看護師による健康状態の観察、医療処置、服薬管理、療養上のケアを提供します。",
                  },
                  {
                    title: "訪問リハビリテーション",
                    desc: "理学療法士・作業療法士・言語聴覚士による自宅でのリハビリを行います。",
                  },
                  {
                    title: "精神科訪問看護",
                    desc: "精神疾患をお持ちの方への訪問看護サービス。心のケアと生活支援を行います。",
                  },
                  {
                    title: "終末期ケア・看取り",
                    desc: "ご自宅での最期を希望される方への緩和ケア、ご家族のサポートを行います。",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="p-6 border border-[var(--color-logo-light-green)]/30 rounded-xl"
                  >
                    <h3 className="text-lg font-bold text-[var(--color-logo-dark-green)] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                {area.name}の訪問看護に関するよくある質問
              </h2>
              <div className="space-y-4">
                {area.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="bg-white rounded-xl shadow-sm group"
                  >
                    <summary className="p-6 cursor-pointer list-none flex items-center justify-between">
                      <span className="font-bold text-[var(--color-logo-dark-green)] pr-4">
                        Q. {faq.question}
                      </span>
                      <span className="text-[var(--color-logo-light-green)] transition-transform group-open:rotate-180">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-700">A. {faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 他の対応エリア */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                その他の対応エリア
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {otherAreas.map((otherArea) => (
                  <Link
                    key={otherArea.slug}
                    href={`/areas/${otherArea.slug}`}
                    className="px-6 py-3 bg-[var(--color-logo-light-green)]/10 text-[var(--color-logo-dark-green)] rounded-full hover:bg-[var(--color-logo-light-green)]/20 transition-colors"
                  >
                    {otherArea.name}の訪問看護
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせ */}
        <section id="contact" className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                {area.name}での訪問看護のご相談
              </h2>
              <Contact />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
