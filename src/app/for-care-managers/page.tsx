"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundTriangles from "@/components/BackgroundTriangles";

// 紹介手続きの流れ
const referralSteps = [
  {
    step: 1,
    title: "お電話・フォームでご相談",
    description: "まずはお気軽にお電話またはお問い合わせフォームよりご連絡ください。利用者様の状況をお聞かせいただき、最適なサービスをご提案いたします。",
  },
  {
    step: 2,
    title: "訪問看護指示書の手配",
    description: "主治医への訪問看護指示書の依頼は私たちが代行いたします。ケアマネージャー様のお手を煩わせません。かかりつけ医がいらっしゃらない場合も、連携医療機関をご紹介可能です。",
  },
  {
    step: 3,
    title: "初回訪問・アセスメント",
    description: "ご利用者様宅へ訪問し、健康状態や生活環境をアセスメント。ケアプランに沿った訪問看護計画書を作成いたします。",
  },
  {
    step: 4,
    title: "サービス開始・定期報告",
    description: "訪問看護サービスを開始。月次報告書の送付、状態変化時の即時連絡、カンファレンスへの参加など、密な連携体制を構築いたします。",
  },
];

// 報告体制
const reportingSystems = [
  {
    title: "定期報告",
    description: "月次で訪問看護報告書をお送りします",
    detail: "訪問内容、バイタルサイン、ADL状況、今後の方針などを詳細にご報告いたします。",
  },
  {
    title: "急変時報告",
    description: "状態変化時は即時お電話でご連絡",
    detail: "体調変化、転倒、救急搬送などの緊急時は、速やかにケアマネージャー様へご連絡いたします。",
  },
  {
    title: "カンファレンス参加",
    description: "サービス担当者会議に積極的に参加",
    detail: "ご利用者様のケアプラン作成や見直しに必要な情報を提供し、多職種連携をサポートします。",
  },
];

// 対応可能なケース
const availableCases = [
  {
    title: "終末期ケア・看取り",
    description: "ご自宅での穏やかな最期をサポート。24時間オンコール対応で、ご家族の不安にも寄り添います。",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: "精神科訪問看護",
    description: "精神疾患をお持ちの方への専門的な看護ケア。服薬管理、生活リズムの調整、社会復帰支援を行います。",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "医療依存度の高い方",
    description: "人工呼吸器、在宅酸素、胃ろう、褥瘡処置など、医療処置が必要な方にも対応いたします。",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "リハビリテーション",
    description: "理学療法士・作業療法士・言語聴覚士による訪問リハビリ。※現在、リハビリのご依頼は受け付けておりません。",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    disabled: true,
  },
  {
    title: "24時間緊急対応",
    description: "365日24時間オンコール体制。夜間・休日も安心してご利用いただけます。",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// FAQ
const faqs = [
  {
    question: "最短でいつから訪問開始できますか?",
    answer: "最短即日対応可能です。緊急のご依頼もお受けしておりますので、まずはお電話ください。訪問看護指示書の準備が整い次第、速やかに訪問を開始いたします。",
  },
  {
    question: "土日祝日の訪問は可能ですか?",
    answer: "はい、365日対応しております。土日祝日も通常通り訪問看護サービスを提供しています。利用者様の生活リズムに合わせた柔軟な訪問スケジュールを組むことが可能です。",
  },
  {
    question: "訪問看護指示書の取得をサポートしてもらえますか?",
    answer: "はい、主治医への指示書依頼は私たちが代行いたします。ケアマネージャー様が医療機関へ連絡する必要はありません。かかりつけ医がいらっしゃらない場合も、連携医療機関のご紹介が可能です。",
  },
  {
    question: "定期報告はどのように行われますか?",
    answer: "月次で訪問看護報告書をお送りします。訪問内容、バイタルサイン、ADL状況、服薬状況、今後の方針などを詳細に記載いたします。また、状態変化時は都度お電話でご連絡いたします。",
  },
];

export default function ForCareManagersPage() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20 bg-white">
        {/* Hero Section */}
        <div className="px-4 md:px-8 py-6 md:py-10">
          <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#d4edda] rounded-3xl md:rounded-[3rem] shadow-lg">
          {/* 背景装飾 */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,0 100,0 100,100" fill="white" />
              <polygon points="0,100 50,0 100,100" fill="white" opacity="0.5" />
            </svg>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24 text-center text-[var(--color-logo-dark-green)]">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium tracking-wider mb-6 bg-white/60 text-[var(--color-logo-dark-green)]"
            >
              FOR CARE MANAGERS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-gothic">
              ケアマネージャー様へ
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[var(--color-ink-soft)]">
              迅速・丁寧な連携でケアプランをサポートします
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:047-770-1228"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--color-logo-dark-green)] rounded-full font-bold text-lg hover:bg-[var(--color-logo-yellow)] transition-colors shadow-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                047-770-1228
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] rounded-full font-bold text-lg hover:bg-[var(--color-logo-dark-green)]/10 transition-all"
              >
                お問い合わせフォーム
              </a>
            </div>
          </div>
        </section>
        </div>

        {/* 紹介方法・手続きの流れ */}
        <section className="section-wrapper relative overflow-hidden">
          <BackgroundTriangles pattern="flow" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title">紹介方法・手続きの流れ</h2>
              <div className="section-title-line" />
            </div>

            <div className="section-content">
              <div className="section-card section-card-mint">
                <div className="grid grid-cols-1 gap-6">
                  {referralSteps.map((step, index) => (
                    <div key={step.step} className="flex flex-col items-center">
                      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm w-full hover-lift border-l-4 border-[var(--color-logo-light-green)]">
                        <div className="flex items-start gap-4 md:gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-[var(--color-logo-dark-green)] flex items-center justify-center text-2xl md:text-3xl font-bold shadow-md border-2 border-[var(--color-logo-dark-green)]">
                              {step.step}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[var(--color-ink)]">
                              {step.title}
                            </h3>
                            <p className="text-[var(--color-ink-soft)] leading-relaxed text-base md:text-lg">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      {index < referralSteps.length - 1 && (
                        <div className="flex justify-center py-3">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            className="text-[var(--color-logo-dark-green)]"
                          >
                            <path
                              d="M20 5 L20 30 M20 30 L10 22 M20 30 L30 22"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 md:mt-12 text-center space-y-4 md:space-y-6">
                  <p className="text-[var(--color-ink)] text-base md:text-lg">
                    ご不明な点がございましたら、お気軽にお問い合わせください。
                  </p>
                  <a
                    href="tel:047-770-1228"
                    className="btn-primary inline-block text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                  >
                    お電話でのご相談はこちら
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 報告体制 */}
        <section className="section-wrapper bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <BackgroundTriangles pattern="about" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gothic text-[var(--color-ink)]">
                報告体制
              </h2>
              <p className="text-lg text-[var(--color-ink-soft)]">
                ケアマネージャー様との密な連携を大切にしています
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {reportingSystems.map((system, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover-lift border-t-4 border-[var(--color-logo-light-green)]"
                >
                  <h3 className="text-xl font-bold mb-3 text-[var(--color-logo-dark-green)]">
                    {system.title}
                  </h3>
                  <p className="text-base font-medium mb-3 text-[var(--color-ink)]">
                    {system.description}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                    {system.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 対応可能なケース */}
        <section className="section-wrapper relative overflow-hidden">
          <BackgroundTriangles pattern="features" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gothic text-[var(--color-ink)]">
                対応可能なケース
              </h2>
              <p className="text-lg text-[var(--color-ink-soft)]">
                幅広いニーズにお応えいたします
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCases.map((caseItem, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover-lift"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 text-[var(--color-logo-light-green)]">
                      {caseItem.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-ink)]">
                      {caseItem.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                    {caseItem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-wrapper bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <BackgroundTriangles pattern="faq" />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gothic text-[var(--color-ink)]">
                よくあるご質問
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-lg text-[var(--color-ink)] pr-4">
                      Q. {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 flex-shrink-0 text-[var(--color-logo-dark-green)] transition-transform ${
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
                    <div className="px-6 pb-6">
                      <p className="text-[var(--color-ink-soft)] leading-relaxed border-l-4 border-[var(--color-logo-yellow)] pl-4">
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
        <div className="px-4 md:px-8 py-6 md:py-10">
          <section
            id="contact"
            className="relative overflow-hidden rounded-3xl md:rounded-[3rem] bg-gradient-to-br from-[#a8d5ba] to-[#d4edda] shadow-lg py-12 md:py-16"
          >
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-logo-dark-green)] mb-6 heading-gothic">
                まずはお気軽にご相談ください
              </h2>
              <p className="text-[var(--color-ink-soft)] text-lg mb-12 max-w-xl mx-auto">
                訪問看護のご依頼、サービス内容のご相談など、お気軽にお問い合わせください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="tel:047-770-1228"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white text-[var(--color-logo-dark-green)] rounded-full font-bold text-lg hover:bg-[var(--color-logo-yellow)] transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  047-770-1228
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-10 py-5 border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] rounded-full font-bold text-lg hover:bg-[var(--color-logo-dark-green)]/10 transition-all"
                >
                  トップページへ
                </Link>
              </div>
              <div className="text-[var(--color-ink-soft)] text-sm">
                <p>受付時間: 9:00〜19:00（365日対応）</p>
                <p className="mt-2">メール: hokan-f@fractal-group.co.jp</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
