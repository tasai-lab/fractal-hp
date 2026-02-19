"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import { pricingFAQs, nursingCareInsurance, medicalInsurance } from "@/lib/pricing-data";

// 各種加算の説明データ
const additionalFees = [
  {
    title: "緊急時訪問看護加算",
    description: "24時間対応体制を整えている場合に加算されます。緊急時の電話相談・訪問に対応いたします。",
  },
  {
    title: "特別管理加算",
    description: "在宅酸素療法、人工呼吸器、中心静脈栄養などの医療処置が必要な方に対する加算です。",
  },
  {
    title: "ターミナルケア加算",
    description: "ご自宅での看取りに対応する場合の加算です。人生の最期まで安心してお過ごしいただけるようサポートします。",
  },
  {
    title: "精神科訪問看護加算",
    description: "精神疾患をお持ちの方への専門的な看護ケアを提供する場合の加算です。",
  },
];

export default function PricingPage() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20 bg-white">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#d4edda] rounded-2xl md:rounded-3xl shadow-sm">
            <div className="relative z-10 w-full px-6 py-10 md:py-14 text-center text-[var(--color-logo-dark-green)]">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider mb-4 bg-white/60 text-[var(--color-logo-dark-green)]">
                PRICING
              </span>
              <h1 className="text-2xl md:text-3xl font-bold mb-3 heading-gothic">
                ご利用料金
              </h1>
              <p className="text-sm md:text-base mb-6 text-[var(--color-ink-soft)]">
                訪問看護の費用と保険適用について
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:047-770-1228"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-[var(--color-logo-dark-green)] rounded-full font-bold text-sm hover:bg-[var(--color-logo-yellow)] transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  047-770-1228
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] rounded-full font-bold text-sm hover:bg-[var(--color-logo-dark-green)]/10 transition-all"
                >
                  料金のご相談
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 訪問看護の費用について */}
        <section className="relative overflow-hidden py-8 md:py-12">
          <BackgroundTriangles pattern="about" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-2 heading-gothic text-[var(--color-ink)]">
                訪問看護の費用について
              </h2>
              <p className="text-sm text-[var(--color-ink-soft)]">
                保険適用で自己負担は1〜3割
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm">
              <div className="space-y-3">
                <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm">
                  訪問看護は、医療保険または介護保険が適用されるため、実際のご負担は1〜3割です。
                  利用する保険の種類、訪問回数、訪問時間によって料金が異なります。
                </p>
                <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm">
                  65歳以上で要支援・要介護認定を受けている方は<strong className="text-[var(--color-logo-dark-green)]">介護保険</strong>が適用されます。
                  40歳未満の方や、がん末期・難病などの厚生労働大臣が定める疾病の方は<strong className="text-[var(--color-logo-dark-green)]">医療保険</strong>が適用されます。
                </p>
                <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm">
                  詳しい料金については、お気軽にお問い合わせください。お一人おひとりの状況に合わせて、わかりやすくご説明いたします。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 介護保険の料金表 */}
        <section className="bg-gradient-to-br from-gray-50 to-white relative overflow-hidden py-8 md:py-12">
          <BackgroundTriangles pattern="features" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-2 heading-gothic text-[var(--color-ink)]">
                {nursingCareInsurance.title}
              </h2>
              <p className="text-sm text-[var(--color-ink-soft)]">
                {nursingCareInsurance.description}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="bg-[var(--color-logo-light-green)]/10">
                      <th className="px-3 md:px-4 py-3 text-left font-bold text-[var(--color-logo-dark-green)]">
                        サービス名称
                      </th>
                      <th className="px-2 md:px-3 py-3 text-left font-bold text-[var(--color-logo-dark-green)]">
                        時間
                      </th>
                      <th className="px-2 md:px-3 py-3 text-center font-bold text-[var(--color-logo-dark-green)]">
                        単位数
                      </th>
                      <th className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                        1割負担
                      </th>
                      <th className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                        2割負担
                      </th>
                      <th className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                        3割負担
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {nursingCareInsurance.items.map((item, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-t border-gray-100`}
                      >
                        <td className="px-3 md:px-4 py-3 text-[var(--color-ink)]">
                          {item.service}
                        </td>
                        <td className="px-2 md:px-3 py-3 text-[var(--color-ink-soft)]">
                          {item.duration}
                        </td>
                        <td className="px-2 md:px-3 py-3 text-center text-[var(--color-ink-soft)]">
                          {item.units}
                        </td>
                        <td className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                          {item.price1}
                        </td>
                        <td className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                          {item.price2}
                        </td>
                        <td className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                          {item.price3}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100">
                <ul className="space-y-1">
                  {nursingCareInsurance.notes.map((note, index) => (
                    <li key={index} className="text-xs text-[var(--color-ink-soft)] flex items-start">
                      <span className="text-[var(--color-logo-light-green)] mr-1.5 mt-0.5">※</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 医療保険の料金表 */}
        <section className="relative overflow-hidden py-8 md:py-12">
          <BackgroundTriangles pattern="office" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-2 heading-gothic text-[var(--color-ink)]">
                {medicalInsurance.title}
              </h2>
              <p className="text-sm text-[var(--color-ink-soft)]">
                {medicalInsurance.description}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="bg-[var(--color-logo-light-green)]/10">
                      <th className="px-3 md:px-4 py-3 text-left font-bold text-[var(--color-logo-dark-green)]">
                        サービス名称
                      </th>
                      <th className="px-2 md:px-3 py-3 text-left font-bold text-[var(--color-logo-dark-green)]">
                        区分
                      </th>
                      <th className="px-2 md:px-3 py-3 text-center font-bold text-[var(--color-logo-dark-green)]">
                        基本料金
                      </th>
                      <th className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                        1割負担
                      </th>
                      <th className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                        2割負担
                      </th>
                      <th className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                        3割負担
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicalInsurance.items.map((item, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-t border-gray-100`}
                      >
                        <td className="px-3 md:px-4 py-3 text-[var(--color-ink)]">
                          {item.service}
                        </td>
                        <td className="px-2 md:px-3 py-3 text-[var(--color-ink-soft)]">
                          {item.duration}
                        </td>
                        <td className="px-2 md:px-3 py-3 text-center text-[var(--color-ink-soft)]">
                          {item.basePrice}
                        </td>
                        <td className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                          {item.price1}
                        </td>
                        <td className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                          {item.price2}
                        </td>
                        <td className="px-2 md:px-3 py-3 text-right font-bold text-[var(--color-logo-dark-green)]">
                          {item.price3}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100">
                <ul className="space-y-1">
                  {medicalInsurance.notes.map((note, index) => (
                    <li key={index} className="text-xs text-[var(--color-ink-soft)] flex items-start">
                      <span className="text-[var(--color-logo-light-green)] mr-1.5 mt-0.5">※</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 各種加算の説明 */}
        <section className="bg-gradient-to-br from-gray-50 to-white relative overflow-hidden py-8 md:py-12">
          <BackgroundTriangles pattern="flow" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-2 heading-gothic text-[var(--color-ink)]">
                各種加算について
              </h2>
              <p className="text-sm text-[var(--color-ink-soft)]">
                ご利用者様の状態やサービス内容に応じて加算が適用されます
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {additionalFees.map((fee, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-[var(--color-logo-light-green)]"
                >
                  <h3 className="text-sm md:text-base font-bold mb-2 text-[var(--color-logo-dark-green)]">
                    {fee.title}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-[var(--color-ink-soft)]">
                    {fee.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative overflow-hidden py-8 md:py-12">
          <BackgroundTriangles pattern="faq" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-2 heading-gothic text-[var(--color-ink)]">
                料金についてのよくあるご質問
              </h2>
            </div>

            <div className="space-y-3">
              {pricingFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-sm md:text-base text-[var(--color-ink)] pr-4">
                      Q. {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 text-[var(--color-logo-dark-green)] transition-transform ${
                        openFAQIndex === index ? "rotate-180" : ""
                      }`}
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
                  </button>
                  {openFAQIndex === index && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed border-l-4 border-[var(--color-logo-yellow)] pl-3">
                        A. {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* お問い合わせCTA */}
        <section className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div
            id="contact"
            className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#a8d5ba] to-[#d4edda] shadow-sm py-8 md:py-12"
          >
            <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-xl md:text-2xl font-bold text-[var(--color-logo-dark-green)] mb-4 heading-gothic">
                料金についてお気軽にご相談ください
              </h2>
              <p className="text-[var(--color-ink-soft)] text-sm mb-8 max-w-xl mx-auto">
                お一人おひとりの状況に合わせて、わかりやすくご説明いたします。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <a
                  href="tel:047-770-1228"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-[var(--color-logo-dark-green)] rounded-full font-bold text-sm hover:bg-[var(--color-logo-yellow)] transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  047-770-1228
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] rounded-full font-bold text-sm hover:bg-[var(--color-logo-dark-green)]/10 transition-all"
                >
                  トップページへ
                </Link>
              </div>
              <div className="text-[var(--color-ink-soft)] text-xs">
                <p>受付時間: 9:00〜19:00（365日対応）</p>
                <p className="mt-1">メール: hokan-f@fractal-group.co.jp</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
