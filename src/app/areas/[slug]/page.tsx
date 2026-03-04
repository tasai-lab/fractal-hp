import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AreaContact from "@/components/AreaContact";
import AreaHero from "@/components/AreaHero";
import AreaFAQ from "@/components/AreaFAQ";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import { AreaJobPostingStructuredData } from "@/components/StructuredData";
import {
  getRegionalDataBySlug,
  regionalData,
} from "@/lib/regional-data";
import { acceptableConditions, staffMembers, officeInfo } from "@/lib/data";

export default async function RegionalAreaPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const area = getRegionalDataBySlug(resolvedParams.slug);

  if (!area) {
    notFound();
  }

  const otherAreas = regionalData.filter((a) => a.slug !== area.slug);

  return (
    <>
      <AreaJobPostingStructuredData areaName={area.name} areaSlug={area.slug} />

      <Header />
      <main className="pt-14 lg:pt-20 overflow-x-hidden">
        {/* ===== ヒーロー ===== */}
        <AreaHero area={area} />

        {/* ===== 統計+実績（統合） ===== */}
        <section id="area-data" className="section-wrapper relative !overflow-visible" style={{ backgroundColor: `${area.theme.primary}05` }}>
          <BackgroundTriangles pattern="office" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title">{area.name}の実績</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-blue">
                {/* 上段: 地域統計 */}
                <div className="mb-6">
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Area Statistics</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "総人口", value: area.population.total },
                      { label: "高齢者人口", value: area.population.elderly },
                      { label: "高齢化率", value: area.population.elderlyRate },
                      { label: "年少人口率", value: area.population.youngRate },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl p-4 md:p-5 text-center shadow-sm hover-lift"
                      >
                        <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                        <p
                          className="text-lg md:text-xl font-bold"
                          style={{ color: area.theme.primary }}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 区切り線 */}
                <div className="border-t-2 my-6" style={{ borderColor: `${area.theme.primary}20` }} />
                {/* 下段: 実績 */}
                <div>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Track Record</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      ...(area.areaStats
                        ? [
                            { label: `${area.name}の利用者`, value: `${area.areaStats.patients}名` },
                            { label: `${area.name}への月間訪問`, value: `${area.areaStats.monthlyVisits}件` },
                          ]
                        : [
                            { label: "全利用者数", value: "84名" },
                            { label: "月間訪問件数", value: "270件+" },
                          ]),
                      { label: "看護師", value: "3名" },
                      { label: "緊急対応", value: "365日" },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="text-center p-4 md:p-6 rounded-2xl"
                        style={{ backgroundColor: area.theme.primary }}
                      >
                        <p className="text-2xl md:text-3xl font-black text-white">
                          {stat.value}
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 訪問看護サービス ===== */}
        <section id="area-services" className="section-wrapper relative !overflow-visible">
          <BackgroundTriangles pattern="about" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title">{area.name}のフラクタル訪問看護サービス</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                  {[
                    {
                      title: "訪問看護",
                      desc: "看護師による健康状態の観察、医療処置、服薬管理、療養上のケアを提供します。",
                      disabled: false,
                    },
                    {
                      title: "訪問リハビリテーション",
                      desc: "理学療法士・作業療法士・言語聴覚士による自宅でのリハビリを行います。",
                      disabled: true,
                      disabledNote: "現在休止中",
                    },
                    {
                      title: "精神科訪問看護",
                      desc: "精神疾患をお持ちの方への訪問看護サービス。心のケアと生活支援を行います。",
                      disabled: false,
                    },
                    {
                      title: "終末期ケア・看取り",
                      desc: "ご自宅での最期を希望される方への緩和ケア、ご家族のサポートを行います。",
                      disabled: false,
                    },
                    {
                      title: "24時間対応",
                      desc: "緊急時も安心。24時間365日、電話対応と必要に応じた緊急訪問を行います。",
                      disabled: false,
                    },
                    {
                      title: "土日・祝日訪問",
                      desc: "土日や祝日も訪問可能。生活リズムに合わせた柔軟な訪問スケジュールに対応します。",
                      disabled: false,
                    },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className={`p-5 md:p-6 rounded-2xl shadow-sm border border-transparent transition-all ${
                        service.disabled
                          ? "bg-gray-100 opacity-60"
                          : "bg-white hover-lift"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          className="text-lg md:text-xl font-bold mb-2"
                          style={{ color: service.disabled ? "#9ca3af" : area.theme.primary }}
                        >
                          {service.title}
                        </h3>
                        {service.disabled && service.disabledNote && (
                          <span className="text-xs px-2 py-1 bg-gray-200 text-gray-500 rounded-full flex-shrink-0">
                            {service.disabledNote}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm md:text-base leading-relaxed ${service.disabled ? "text-gray-400" : "text-gray-600"}`}>
                        {service.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 text-white px-7 py-3 rounded-full font-bold transition-all hover:scale-105 hover:shadow-md text-sm md:text-base"
                    style={{ backgroundColor: area.theme.primary }}
                  >
                    サービス詳細を見る
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 受入可能な身体の状態 ===== */}
        <section id="area-conditions" className="section-wrapper relative !overflow-visible">
          <BackgroundTriangles pattern="flow" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title">受入可能な身体の状態・疾患</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-pink">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {acceptableConditions.map((condition, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-4 rounded-2xl shadow-sm border border-transparent ${
                        condition.status === "available"
                          ? "bg-white hover-lift"
                          : condition.status === "limited"
                            ? "bg-yellow-50"
                            : "bg-gray-50 opacity-60"
                      }`}
                    >
                      <span
                        role="img"
                        aria-label={
                          condition.status === "available" ? "対応可"
                            : condition.status === "limited" ? "要相談"
                              : "非対応"
                        }
                        className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                          condition.status === "available"
                            ? ""
                            : condition.status === "limited"
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                        }`}
                        style={{
                          backgroundColor: condition.status === "available" ? area.theme.primary : undefined,
                        }}
                      >
                        {condition.status === "available" ? "✓" : condition.status === "limited" ? "△" : "×"}
                      </span>
                      <div>
                        <p className="text-sm md:text-base font-bold text-gray-800">{condition.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{condition.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  ✓ 積極的に受入 / △ 要相談 / × 現在非対応
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 訪問可能エリア ===== */}
        <section id="area-visitable" className="section-wrapper relative !overflow-visible">
          <BackgroundTriangles pattern="serviceArea" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title">{area.name}の訪問可能エリア</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-mint">
                <p className="text-center text-sm text-gray-600 mb-6">
                  <span className="text-2xl font-black mr-1" style={{ color: area.theme.primary }}>
                    {area.visitableAreas.length}
                  </span>
                  地区で訪問対応しています
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {area.visitableAreas.map((areaName) => (
                    <span
                      key={areaName}
                      className="px-5 py-2.5 rounded-full text-sm md:text-base font-bold text-white shadow-sm"
                      style={{ backgroundColor: area.theme.primary }}
                    >
                      {areaName}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400 text-xs text-center mt-6">
                  上記エリアを中心に、{area.name}全域へ訪問いたします。エリア外もご相談ください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 中間CTA（帯デザインのためsection-wrapperパターン適用外） ===== */}
        <section
          className="py-10 md:py-14"
          style={{ backgroundColor: area.theme.primary }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <p className="text-lg md:text-xl font-bold mb-6">
                {area.name}での訪問看護、まずは無料でご相談ください
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${officeInfo.phone}`}
                  className="inline-flex items-center justify-center gap-3 bg-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg"
                  style={{ color: area.theme.primary }}
                >
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {officeInfo.phone}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:bg-white/10"
                >
                  お問い合わせフォーム
                </a>
              </div>
              <p className="text-white/70 text-xs mt-3">
                24時間受付・初回相談無料
              </p>
            </div>
          </div>
        </section>

        {/* ===== 担当スタッフ ===== */}
        <section id="area-staff" className="section-wrapper relative !overflow-visible">
          <BackgroundTriangles pattern="staff" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title">{area.name}を担当するスタッフ</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-blue">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                  {staffMembers.slice(0, 4).map((staff, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm hover-lift border border-transparent"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 relative">
                        {staff.image && (
                          <Image
                            src={staff.image}
                            alt={staff.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p
                          className="font-bold text-sm md:text-base"
                          style={{ color: area.theme.primary }}
                        >
                          {staff.role} {staff.name}
                        </p>
                        <p className="text-gray-600 text-xs md:text-sm mt-1 line-clamp-3">
                          {staff.introduction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href="/#staff"
                    className="inline-flex items-center gap-2 text-sm font-bold transition-colors"
                    style={{ color: area.theme.primary }}
                  >
                    スタッフ一覧を見る
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <AreaFAQ faqs={area.faqs} themeColor={area.theme.primary} />

        {/* ===== 医療・介護体制 ===== */}
        <section id="area-healthcare" className="section-wrapper relative !overflow-visible">
          <BackgroundTriangles pattern="features" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title">医療・介護体制</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-blue">
                <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                  {area.healthcare.description}
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {area.healthcare.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm"
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: area.theme.primary }}
                      >
                        ✓
                      </span>
                      <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 他の地域へのリンク ===== */}
        <section id="other-areas" className="section-wrapper relative !overflow-visible">
          <BackgroundTriangles pattern="company" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title">その他の対応地域</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-mint">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {otherAreas.map((otherArea) => (
                    <Link
                      key={otherArea.slug}
                      href={`/areas/${otherArea.slug}`}
                      className="group bg-white rounded-2xl p-4 shadow-sm hover-lift border border-transparent transition-all"
                    >
                      <p className="font-bold text-sm" style={{ color: otherArea.theme.primary }}>
                        {otherArea.name}
                      </p>
                      <p className="text-xs text-gray-400">{otherArea.theme.tagline}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== お問い合わせ ===== */}
        <section id="contact" className="section-wrapper relative !overflow-visible">
          <BackgroundTriangles pattern="contact" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title">まずはお気軽にご相談ください</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-pink">
                <p className="text-gray-600 text-sm md:text-base text-center mb-8">
                  {area.name}で訪問看護をお探しの方は、お気軽にご相談ください。
                </p>

                <div className="text-center mb-8">
                  <a
                    href={`tel:${officeInfo.phone}`}
                    className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: area.theme.primary }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {officeInfo.phone}
                  </a>
                  <p className="text-xs text-gray-500 mt-2">24時間受付</p>
                </div>

                <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm">
                  <AreaContact areaName={area.name} themeColor={area.theme.primary} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
