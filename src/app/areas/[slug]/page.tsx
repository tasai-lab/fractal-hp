import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { AreaJobPostingStructuredData } from "@/components/StructuredData";
import {
  getRegionalDataBySlug,
  regionalData,
} from "@/lib/regional-data";
import { stationStats, acceptableConditions, staffMembers } from "@/lib/data";

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

  const themeStyle = {
    "--theme-primary": area.theme.primary,
    "--theme-secondary": area.theme.secondary,
    "--theme-accent": area.theme.accent,
  } as React.CSSProperties;

  const patternClass = `pattern-${area.theme.pattern || "default"}`;

  return (
    <>
      <AreaJobPostingStructuredData areaName={area.name} areaSlug={area.slug} />

      <Header />
      <main className="pt-14 lg:pt-20" style={themeStyle}>
        {/* ===== ヒーローセクション ===== */}
        <section className={`relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden ${patternClass}`}>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${area.theme.primary}12 0%, ${area.theme.accent}08 50%, white 100%)`
            }}
          />

          <div
            className="absolute top-0 right-0 w-[50%] h-[70%] opacity-[0.04] rounded-bl-[100%]"
            style={{ backgroundColor: area.theme.primary }}
          />

          <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <span
                  className="inline-block px-5 py-2 rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: area.theme.primary }}
                >
                  {area.theme.tagline}
                </span>
              </div>

              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight heading-gothic animate-fade-in-up"
                style={{ color: area.theme.secondary, animationDelay: "0.3s" }}
              >
                {area.h1}
              </h1>

              <p
                className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                {area.intro}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.7s" }}>
                <a
                  href="tel:047-770-1228"
                  className="inline-flex items-center justify-center gap-3 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: area.theme.primary }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  047-770-1228
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-md hover:shadow-lg border-2"
                  style={{ color: area.theme.primary, borderColor: area.theme.primary }}
                >
                  無料相談はこちら
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 40L80 36C160 32 320 24 480 28C640 32 800 48 960 52C1120 56 1280 48 1360 44L1440 40V81H0V40Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* ===== 統計ハイライト ===== */}
        <section className="py-10 md:py-14 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "総人口", value: area.population.total },
                  { label: "高齢者人口", value: area.population.elderly },
                  { label: "高齢化率", value: area.population.elderlyRate },
                  { label: "スタッフ", value: "8名体制" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 md:p-5 rounded-xl text-center transition-all hover:shadow-md"
                    style={{ backgroundColor: `${area.theme.primary}06` }}
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
          </div>
        </section>

        {/* ===== フラクタルの実績 ===== */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-2">
                  Track Record
                </span>
                <h2
                  className="text-xl md:text-3xl font-bold heading-gothic"
                  style={{ color: area.theme.secondary }}
                >
                  フラクタル訪問看護の実績
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stationStats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 md:p-6 bg-white rounded-2xl shadow-sm border"
                    style={{ borderColor: `${area.theme.primary}15` }}
                  >
                    <p
                      className="text-3xl md:text-4xl font-black"
                      style={{ color: area.theme.primary }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 訪問看護サービス ===== */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-2">
                  Services
                </span>
                <h2
                  className="text-xl md:text-3xl font-bold heading-gothic"
                  style={{ color: area.theme.secondary }}
                >
                  <span className="block">{area.name}で提供する</span>
                  <span className="block">フラクタルの訪問看護サービス</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
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
                    className={`group relative p-5 md:p-6 rounded-2xl border transition-all ${
                      service.disabled
                        ? "bg-gray-100 opacity-60"
                        : "bg-white hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                    style={{ borderColor: service.disabled ? "#e5e5e5" : `${area.theme.primary}15` }}
                  >
                    <div
                      className="absolute top-0 left-0 w-full h-0.5 rounded-t-2xl"
                      style={{ backgroundColor: service.disabled ? "#9ca3af" : area.theme.primary }}
                    />
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="text-lg font-bold mb-2"
                        style={{ color: service.disabled ? "#9ca3af" : area.theme.secondary }}
                      >
                        {service.title}
                      </h3>
                      {service.disabled && service.disabledNote && (
                        <span className="text-xs px-2 py-1 bg-gray-200 text-gray-500 rounded-full flex-shrink-0">
                          {service.disabledNote}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${service.disabled ? "text-gray-400" : "text-gray-600"}`}>
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-white px-7 py-3 rounded-full font-bold transition-all hover:scale-105 hover:shadow-md text-sm"
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
        </section>

        {/* ===== 受入可能な身体の状態 ===== */}
        <section
          className={`py-14 md:py-20 relative ${patternClass}`}
          style={{ backgroundColor: `${area.theme.primary}04` }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-2">
                  Conditions
                </span>
                <h2
                  className="text-xl md:text-3xl font-bold heading-gothic"
                  style={{ color: area.theme.secondary }}
                >
                  受入可能な身体の状態・疾患
                </h2>
              </div>
              <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      className="border-b-2"
                      style={{ borderColor: area.theme.primary }}
                    >
                      <th
                        className="text-left py-3 px-2 font-bold"
                        style={{ color: area.theme.secondary }}
                      >
                        疾患・状態
                      </th>
                      <th className="text-center py-3 px-2 w-24">対応</th>
                      <th className="text-left py-3 px-2">備考</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptableConditions.map((condition, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium text-gray-700">
                          {condition.name}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span
                            className={
                              condition.status === "available"
                                ? "text-green-600 font-bold"
                                : condition.status === "limited"
                                  ? "text-yellow-600 font-bold"
                                  : "text-gray-400"
                            }
                          >
                            {condition.status === "available"
                              ? "◎"
                              : condition.status === "limited"
                                ? "△"
                                : "×"}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-500 text-xs">
                          {condition.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-4">
                  ◎ 積極的に受入 / △ 要相談 / × 現在非対応
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 中間CTA ===== */}
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
                  href="tel:047-770-1228"
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
                  047-770-1228
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

        {/* ===== 訪問可能エリア ===== */}
        <section
          className="py-14 md:py-20"
          style={{ backgroundColor: `${area.theme.accent}10` }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-1 h-10 rounded-full"
                  style={{ backgroundColor: area.theme.primary }}
                />
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                    Service Area
                  </span>
                  <h2
                    className="text-xl md:text-2xl font-bold heading-gothic"
                    style={{ color: area.theme.secondary }}
                  >
                    {area.name}の訪問可能エリア
                  </h2>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {area.visitableAreas.map((areaName, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${area.theme.primary}08`,
                        color: area.theme.secondary,
                      }}
                    >
                      {areaName}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm text-center">
                  上記エリアを中心に、{area.name}全域へ訪問いたします。エリア外もご相談ください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 担当スタッフ ===== */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-2">
                  Staff
                </span>
                <h2
                  className="text-xl md:text-3xl font-bold heading-gothic"
                  style={{ color: area.theme.secondary }}
                >
                  {area.name}を担当するスタッフ
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {staffMembers.slice(0, 4).map((staff, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{
                      backgroundColor: `${area.theme.primary}04`,
                    }}
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
                        className="font-bold text-sm"
                        style={{ color: area.theme.secondary }}
                      >
                        {staff.role} {staff.name}
                      </p>
                      <p className="text-gray-600 text-xs mt-1 line-clamp-3">
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
        </section>

        {/* ===== 医療・介護体制 ===== */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-1 h-10 rounded-full"
                  style={{ backgroundColor: area.theme.primary }}
                />
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                    Healthcare
                  </span>
                  <h2
                    className="text-xl md:text-2xl font-bold heading-gothic"
                    style={{ color: area.theme.secondary }}
                  >
                    医療・介護体制
                  </h2>
                </div>
              </div>

              <div
                className="rounded-2xl p-6 md:p-8"
                style={{ backgroundColor: `${area.theme.primary}06` }}
              >
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {area.healthcare.description}
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {area.healthcare.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white p-3 rounded-lg"
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: area.theme.primary }}
                      >
                        ✓
                      </span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          className={`py-14 md:py-20 relative ${patternClass}`}
          style={{ backgroundColor: `${area.theme.primary}04` }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-2">
                  FAQ
                </span>
                <h2
                  className="text-xl md:text-3xl font-bold heading-gothic"
                  style={{ color: area.theme.secondary }}
                >
                  よくある質問
                </h2>
              </div>

              <div className="space-y-3">
                {area.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <summary className="p-5 cursor-pointer list-none flex items-center justify-between">
                      <span className="font-bold pr-4 text-sm" style={{ color: area.theme.secondary }}>
                        {faq.question}
                      </span>
                      <span
                        className="transition-transform group-open:rotate-180 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${area.theme.primary}10`, color: area.theme.primary }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-5">
                      <div
                        className="pt-3 border-t text-gray-600 text-sm leading-relaxed"
                        style={{ borderColor: `${area.theme.primary}15` }}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 他の地域へのリンク ===== */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-2">
                  Other Areas
                </span>
                <h2
                  className="text-xl md:text-3xl font-bold heading-gothic"
                  style={{ color: area.theme.secondary }}
                >
                  その他の対応地域
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {otherAreas.map((otherArea) => (
                  <Link
                    key={otherArea.slug}
                    href={`/areas/${otherArea.slug}`}
                    className="group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 w-full h-0.5"
                      style={{ backgroundColor: otherArea.theme.primary }}
                    />
                    <p className="font-bold text-sm" style={{ color: otherArea.theme.secondary }}>
                      {otherArea.name}
                    </p>
                    <p className="text-xs text-gray-400">{otherArea.theme.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== お問い合わせ ===== */}
        <section
          id="contact"
          className={`py-14 md:py-20 relative ${patternClass}`}
          style={{ backgroundColor: `${area.theme.primary}06` }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-2">
                  Contact
                </span>
                <h2
                  className="text-xl md:text-3xl font-bold heading-gothic mb-3"
                  style={{ color: area.theme.secondary }}
                >
                  まずはお気軽にご相談ください
                </h2>
                <p className="text-gray-600 text-sm">
                  {area.name}で訪問看護をお探しの方は、お気軽にご相談ください。
                </p>
              </div>

              <div className="text-center mb-8">
                <a
                  href="tel:047-770-1228"
                  className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: area.theme.primary }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  047-770-1228
                </a>
                <p className="text-xs text-gray-500 mt-2">24時間受付</p>
              </div>

              <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm">
                <Contact />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
