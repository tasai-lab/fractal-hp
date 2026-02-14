import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import Link from "next/link";

export default function ForMedicalInstitutionsPage() {
  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20">
        {/* ヒーローセクション */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-logo-dark-green)] to-[var(--color-logo-light-green)]">
          {/* 背景装飾 */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,0 100,0 100,100" fill="white" />
              <polygon points="0,100 50,0 100,100" fill="white" opacity="0.5" />
            </svg>
          </div>
          {/* 下部グラデーション */}
          <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 md:py-24 text-center text-white">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-6" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
              FOR MEDICAL INSTITUTIONS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-gothic mb-6 drop-shadow-lg">
              医療機関の皆様へ
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              退院支援から在宅療養まで、<br className="sm:hidden" />
              シームレスな連携を
            </p>
          </div>
        </section>

        {/* 訪問開始までの流れ */}
        <section className="section-wrapper relative overflow-hidden">
          <BackgroundTriangles pattern="flow" />

          <div className="relative z-10 section-container">
            <h2 className="text-2xl md:text-3xl font-bold heading-gothic text-center mb-12" style={{ color: 'var(--color-ink)' }}>
              訪問開始までの流れ
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  step: "01",
                  title: "お電話でご依頼",
                  description: "まずはお電話にてご連絡ください。患者様の状態やご希望をお伺いし、訪問看護の導入についてご相談いたします。"
                },
                {
                  step: "02",
                  title: "患者様情報のご送付",
                  description: "FAXまたはメールで患者様の情報（診療情報提供書、看護サマリー等）をお送りください。訪問看護指示書も併せてご発行をお願いいたします。"
                },
                {
                  step: "03",
                  title: "最短即日で訪問開始",
                  description: "情報が揃い次第、最短その日から訪問看護を開始いたします。緊急性の高いケースにも柔軟に対応いたします。"
                },
                {
                  step: "04",
                  title: "継続訪問・定期報告",
                  description: "定期的な訪問看護を実施し、月次で訪問看護報告書を提出いたします。状態変化時には速やかにご連絡いたします。"
                }
              ].map((item, index) => (
                <div key={item.step}>
                  <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover-lift border-l-4 border-[var(--color-logo-light-green)]">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-3 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] flex items-center justify-center text-xl md:text-2xl font-bold shadow-md">
                          {item.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
                          {item.title}
                        </h3>
                        <p className="leading-relaxed" style={{ color: 'var(--color-ink-soft)' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {index < 3 && (
                    <div className="flex justify-center py-4">
                      <svg width="40" height="40" viewBox="0 0 40 40" className="text-[var(--color-logo-light-green)]">
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
          </div>
        </section>

        {/* 訪問看護指示書について */}
        <section className="section-wrapper bg-gradient-to-br from-[var(--color-paper)] to-white relative overflow-hidden">
          <BackgroundTriangles pattern="office" />

          <div className="relative z-10 section-container">
            <h2 className="text-2xl md:text-3xl font-bold heading-gothic text-center mb-12" style={{ color: 'var(--color-ink)' }}>
              訪問看護指示書について
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="section-card section-card-mint">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-ink)' }}>
                      <div className="w-0 h-0 border-l-[12px] border-l-[var(--color-logo-dark-green)] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
                      指示書の様式
                    </h3>
                    <p className="mb-4 leading-relaxed" style={{ color: 'var(--color-ink-soft)' }}>
                      厚生労働省が定める様式に準拠した訪問看護指示書をご使用ください。
                    </p>
                    <ul className="space-y-2">
                      {[
                        "一般的な訪問看護指示書",
                        "精神科訪問看護指示書",
                        "特別訪問看護指示書（急性増悪時）"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-0 h-0 mt-2 border-l-[8px] border-l-[var(--color-logo-light-green)] border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent" />
                          <span style={{ color: 'var(--color-ink-soft)' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-ink)' }}>
                      <div className="w-0 h-0 border-l-[12px] border-l-[var(--color-logo-dark-green)] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
                      受付方法
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="font-bold mb-2" style={{ color: 'var(--color-ink)' }}>FAX</div>
                        <div className="text-xl font-bold" style={{ color: 'var(--color-logo-dark-green)' }}>047-413-0502</div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="font-bold mb-2" style={{ color: 'var(--color-ink)' }}>郵送</div>
                        <div style={{ color: 'var(--color-ink-soft)' }} className="text-sm">
                          〒274-0072<br />
                          千葉県船橋市三山6-22-2<br />
                          パレドール小川201<br />
                          フラクタル訪問看護 船橋
                        </div>
                      </div>
                      <div className="bg-[var(--color-logo-yellow)]/30 rounded-lg p-4 text-sm" style={{ color: 'var(--color-ink-soft)' }}>
                        ※ 指示書テンプレートのダウンロードは<br />
                        　 今後対応予定です
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 報告体制 */}
        <section className="section-wrapper relative overflow-hidden">
          <BackgroundTriangles pattern="features" />

          <div className="relative z-10 section-container">
            <h2 className="text-2xl md:text-3xl font-bold heading-gothic text-center mb-12" style={{ color: 'var(--color-ink)' }}>
              報告体制
            </h2>

            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "訪問看護報告書",
                  frequency: "月次",
                  description: "毎月の訪問内容、患者様の状態、実施したケアについて詳細に報告いたします。"
                },
                {
                  title: "急変時報告",
                  frequency: "即時",
                  description: "急変時や状態変化時には速やかに主治医へご連絡し、指示を仰ぎます。"
                },
                {
                  title: "定期情報共有",
                  frequency: "随時",
                  description: "必要に応じてカンファレンスへの参加や電話での情報共有を行います。"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover-lift">
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-logo-light-green)]/20 text-[var(--color-logo-dark-green)] text-sm font-bold mb-4">
                    {item.frequency}
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-soft)' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 急変時対応フロー */}
        <section className="section-wrapper bg-gradient-to-br from-[var(--color-paper)] to-white relative overflow-hidden">
          <BackgroundTriangles pattern="contact" />

          <div className="relative z-10 section-container">
            <h2 className="text-2xl md:text-3xl font-bold heading-gothic text-center mb-12" style={{ color: 'var(--color-ink)' }}>
              急変時対応フロー
            </h2>

            <div className="max-w-3xl mx-auto">
              <div className="section-card section-card-pink">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  {[
                    {
                      step: "1",
                      title: "24時間オンコール",
                      description: "急変時は24時間いつでもご連絡ください"
                    },
                    {
                      step: "2",
                      title: "主治医への連絡",
                      description: "状況を速やかに主治医へ報告し、指示を仰ぎます"
                    },
                    {
                      step: "3",
                      title: "必要時の救急搬送",
                      description: "状況に応じて救急搬送の手配を行います"
                    }
                  ].map((item, index) => (
                    <div key={item.step}>
                      <div className="bg-white rounded-lg p-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-logo-dark-green)] to-[var(--color-logo-light-green)] text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                          {item.step}
                        </div>
                        <h3 className="font-bold mb-2" style={{ color: 'var(--color-ink)' }}>
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-soft)' }}>
                          {item.description}
                        </p>
                      </div>
                      {index < 2 && (
                        <div className="hidden md:block absolute top-1/2 -translate-y-1/2" style={{ left: `${(index + 1) * 33.33}%` }}>
                          <svg width="40" height="24" viewBox="0 0 40 24" className="text-[var(--color-logo-light-green)]">
                            <path d="M0 12 L35 12 M35 12 L28 6 M35 12 L28 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 連携実績・対応可能なケース */}
        <section className="section-wrapper relative overflow-hidden">
          <BackgroundTriangles pattern="staff" />

          <div className="relative z-10 section-container">
            <h2 className="text-2xl md:text-3xl font-bold heading-gothic text-center mb-12" style={{ color: 'var(--color-ink)' }}>
              対応可能なケース
            </h2>

            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "🏥",
                  title: "終末期ケア・在宅看取り",
                  description: "ご自宅での看取りを希望される方へ、緩和ケアと家族支援を提供します。",
                  disabled: false
                },
                {
                  icon: "🧠",
                  title: "精神科訪問看護",
                  description: "精神疾患をお持ちの方への専門的な訪問看護サービスを提供します。",
                  disabled: false
                },
                {
                  icon: "🩺",
                  title: "医療依存度の高い患者",
                  description: "人工呼吸器、胃ろう、ストーマ、中心静脈栄養などの医療処置に対応します。",
                  disabled: false
                },
                {
                  icon: "🏃",
                  title: "リハビリテーション",
                  description: "理学療法士・作業療法士・言語聴覚士による在宅リハビリを提供します。",
                  disabled: true,
                  note: "※現在、リハビリのご依頼は受け付けておりません"
                }
              ].map((item, i) => (
                <div key={i} className={`bg-white rounded-xl p-6 shadow-sm ${item.disabled ? 'opacity-50' : 'hover-lift'}`}>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className={`text-lg font-bold mb-3 ${item.disabled ? 'text-gray-400' : ''}`} style={{ color: item.disabled ? undefined : 'var(--color-ink)' }}>
                    {item.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: item.disabled ? '#9ca3af' : 'var(--color-ink-soft)' }}>
                    {item.description}
                  </p>
                  {item.note && (
                    <p className="text-sm text-gray-400 mt-2">{item.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* お問い合わせCTA */}
        <section className="section-wrapper relative overflow-hidden" style={{ background: 'var(--color-logo-dark-green)' }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='50,10 90,80 10,80' fill='white' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '150px 150px',
              backgroundRepeat: 'repeat'
            }} />
          </div>

          <div className="relative z-10 section-container text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold heading-gothic text-white mb-6">
              退院支援・在宅移行の<br className="sm:hidden" />ご相談はお気軽に
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              患者様の退院支援、訪問看護の導入について、<br className="hidden sm:block" />
              まずはお電話にてご相談ください。
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="bg-white rounded-2xl px-8 py-6 shadow-xl">
                <div className="text-sm font-bold mb-2" style={{ color: 'var(--color-logo-dark-green)' }}>
                  お電話でのご相談
                </div>
                <a
                  href="tel:047-770-1228"
                  className="text-3xl md:text-4xl font-bold hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-logo-dark-green)' }}
                >
                  047-770-1228
                </a>
                <div className="text-sm mt-2" style={{ color: 'var(--color-ink-soft)' }}>
                  受付時間: 9:00〜19:00（年中無休）
                </div>
              </div>

              <div className="text-white text-2xl font-bold">または</div>

              <Link
                href="/#contact"
                className="inline-block px-8 py-4 bg-white text-[var(--color-logo-dark-green)] rounded-full font-bold text-lg hover:bg-[var(--color-logo-yellow)] transition-colors shadow-lg"
              >
                お問い合わせフォーム
              </Link>
            </div>

            <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-4 text-left">
              {[
                { label: "FAX", value: "047-413-0502" },
                { label: "Email", value: "hokan-f@fractal-group.co.jp" },
                { label: "住所", value: "船橋市三山6-22-2" }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-white/70 text-xs mb-1">{item.label}</div>
                  <div className="text-white text-sm font-medium break-all">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
