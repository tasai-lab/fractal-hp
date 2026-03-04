import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import Contact from "@/components/Contact";
import Link from "next/link";
import { officeInfo } from "@/lib/data";

export default function ForMedicalInstitutionsPage() {
  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20 bg-white">
        {/* ヒーローセクション */}
        <section className="section-wrapper bg-white relative overflow-x-hidden">
          <BackgroundTriangles pattern="about" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h1 className="section-title heading-gothic">医療機関の皆様へ</h1>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-mint">
                <nav className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-4">
                  <Link href="/" className="hover:underline">ホーム</Link>
                  <span>/</span>
                  <span className="text-[var(--color-logo-dark-green)]">医療機関の皆様へ</span>
                </nav>
                <p className="text-[var(--color-ink-soft)] text-base md:text-lg leading-relaxed">
                  退院支援から在宅療養まで、シームレスな連携を
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 訪問開始までの流れ */}
        <section className="section-wrapper bg-white relative overflow-x-hidden">
          <BackgroundTriangles pattern="flow" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title heading-gothic">訪問開始までの流れ</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-mint">
                <div className="space-y-6">
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
                            <h3 className="text-lg md:text-xl font-bold mb-3 text-[var(--color-ink)]">
                              {item.title}
                            </h3>
                            <p className="leading-relaxed text-[var(--color-ink-soft)]">
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
            </div>
          </div>
        </section>

        {/* 訪問看護指示書について */}
        <section className="section-wrapper bg-white relative overflow-x-hidden">
          <BackgroundTriangles pattern="office" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title heading-gothic">訪問看護指示書について</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-mint">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[var(--color-ink)]">
                      <div className="w-0 h-0 border-l-[12px] border-l-[var(--color-logo-dark-green)] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
                      指示書の様式
                    </h3>
                    <p className="mb-4 leading-relaxed text-[var(--color-ink-soft)]">
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
                          <span className="text-[var(--color-ink-soft)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[var(--color-ink)]">
                      <div className="w-0 h-0 border-l-[12px] border-l-[var(--color-logo-dark-green)] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
                      受付方法
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="font-bold mb-2 text-[var(--color-ink)]">FAX</div>
                        <div className="text-xl font-bold text-[var(--color-logo-dark-green)]">{officeInfo.fax}</div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="font-bold mb-2 text-[var(--color-ink)]">郵送</div>
                        <div className="text-sm text-[var(--color-ink-soft)]">
                          {officeInfo.address.full}<br />
                          {officeInfo.name}
                        </div>
                      </div>
                      <div className="bg-[var(--color-logo-yellow)]/30 rounded-lg p-4 text-sm text-[var(--color-ink-soft)]">
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
        <section className="section-wrapper bg-white relative overflow-x-hidden">
          <BackgroundTriangles pattern="features" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title heading-gothic">報告体制</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-blue">
                <div className="grid md:grid-cols-3 gap-6">
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
                    <div key={i} className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover-lift">
                      <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-logo-light-green)]/20 text-[var(--color-logo-dark-green)] text-sm font-bold mb-4">
                        {item.frequency}
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--color-ink)]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 急変時対応フロー */}
        <section className="section-wrapper bg-white relative overflow-x-hidden">
          <BackgroundTriangles pattern="contact" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title heading-gothic">急変時対応フロー</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-pink">
                <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 text-center">
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
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] flex items-center justify-center text-xl font-bold bg-white">
                          {item.step}
                        </div>
                        <h3 className="font-bold mb-2 text-[var(--color-ink)]">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                          {item.description}
                        </p>
                      </div>
                      {index < 2 && (
                        <div className="flex justify-center py-2 md:hidden">
                          <svg width="40" height="40" viewBox="0 0 40 40" className="text-[var(--color-logo-light-green)]">
                            <path d="M20 5 L20 30 M20 30 L10 22 M20 30 L30 22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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

        {/* 対応可能なケース */}
        <section className="section-wrapper bg-white relative overflow-x-hidden">
          <BackgroundTriangles pattern="staff" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title heading-gothic">対応可能なケース</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card">
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {[
                    {
                      icon: (
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      ),
                      title: "終末期ケア・在宅看取り",
                      description: "ご自宅での看取りを希望される方へ、緩和ケアと家族支援を提供します。",
                      disabled: false
                    },
                    {
                      icon: (
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      ),
                      title: "精神科訪問看護",
                      description: "精神疾患をお持ちの方への専門的な訪問看護サービスを提供します。",
                      disabled: false
                    },
                    {
                      icon: (
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ),
                      title: "医療依存度の高い患者",
                      description: "人工呼吸器、胃ろう、ストーマ、中心静脈栄養などの医療処置に対応します。",
                      disabled: false
                    },
                    {
                      icon: (
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ),
                      title: "リハビリテーション",
                      description: "理学療法士・作業療法士・言語聴覚士による在宅リハビリを提供します。",
                      disabled: true,
                      note: "※現在、リハビリのご依頼は受け付けておりません"
                    }
                  ].map((item, i) => (
                    <div key={i} className={`bg-white rounded-xl p-6 shadow-sm ${item.disabled ? 'opacity-50' : 'hover-lift'}`}>
                      <div className="text-[var(--color-logo-light-green)] mb-4">{item.icon}</div>
                      <h3 className={`text-lg font-bold mb-3 ${item.disabled ? 'text-[var(--color-muted)]' : 'text-[var(--color-ink)]'}`}>
                        {item.title}
                      </h3>
                      <p className={`leading-relaxed ${item.disabled ? 'text-[var(--color-muted)]' : 'text-[var(--color-ink-soft)]'}`}>
                        {item.description}
                      </p>
                      {item.note && (
                        <p className="text-sm text-[var(--color-muted)] mt-2">{item.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせCTA */}
        <section id="contact" className="section-wrapper bg-white relative overflow-x-hidden">
          <BackgroundTriangles pattern="recruit" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title heading-gothic">お問い合わせ</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-mint">
                <p className="text-[var(--color-ink-soft)] text-base md:text-lg mb-6">
                  患者様の退院支援、訪問看護の導入について、まずはお電話にてご相談ください。
                </p>
                <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
                  <div className="bg-white rounded-2xl px-6 py-4 shadow-sm">
                    <div className="text-sm font-bold mb-2 text-[var(--color-logo-dark-green)]">お電話でのご相談</div>
                    <a href={`tel:${officeInfo.phone}`} className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] hover:opacity-80 transition-opacity">{officeInfo.phone}</a>
                    <div className="text-sm mt-2 text-[var(--color-ink-soft)]">受付時間: 9:00〜19:00（年中無休）</div>
                  </div>
                  <Link href="#contact" className="inline-flex items-center justify-center gap-2 border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] px-6 py-3 rounded-full font-bold text-sm hover:bg-[var(--color-logo-yellow)] transition-colors">
                    お問い合わせフォーム
                  </Link>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-[var(--color-ink-soft)] text-xs mb-1">FAX</div>
                    <div className="text-[var(--color-ink)] text-sm font-medium">{officeInfo.fax}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-[var(--color-ink-soft)] text-xs mb-1">Email</div>
                    <div className="text-[var(--color-ink)] text-sm font-medium break-all">{officeInfo.email}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-[var(--color-ink-soft)] text-xs mb-1">住所</div>
                    <div className="text-[var(--color-ink)] text-sm font-medium">{officeInfo.address.full}</div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Contact embedded hideTitle initialContactType="訪問看護のご利用について" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
