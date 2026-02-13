import Link from "next/link";
import Image from "next/image";
import BackgroundTriangles from "./BackgroundTriangles";
import { signOnBonus } from "@/lib/recruit-data";

export default function Recruit() {
  return (
    <section
      id="recruit"
      className="section-wrapper bg-white relative overflow-hidden"
    >
      <BackgroundTriangles pattern="recruit" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title">フラクタルで働く？</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          {/* 丸みを帯びた四角形で囲む */}
          <div className="section-card">
            {/* メインコピー */}
            <div className="text-center mb-8 md:mb-16">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-primary">
                「働きやすさ」が、「良い看護」をつくる。
              </h3>
              <p className="text-base md:text-lg text-muted border-b-2 border-primary inline-block pb-1">
                私たちは、業務の効率化とスタッフの働きやすさを何よりも大切にしています。
              </p>
            </div>

            {/* Q&A セクション */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-8 lg:p-12 mb-8 md:mb-12">
              <div className="mb-6 md:mb-8">
                <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-accent-blue rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg md:text-xl">Q</span>
                  </div>
                  <div className="pt-1 md:pt-2">
                    <h4 className="text-lg md:text-xl font-bold text-primary">
                      なぜ「業務の最適化」にこだわるのですか？
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-accent-pink rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg md:text-xl">A</span>
                  </div>
                  <div className="pt-1 md:pt-2">
                    <p className="text-base md:text-lg leading-relaxed">
                      スタッフが心身ともに余裕を持って働ける環境こそが、利用者さまへの質の高いケアにつながると信じているからです。
                      無駄な業務を減らし、本来向き合うべき「看護」に集中できる環境を整えています。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* スタッフ集合写真 */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-sm mb-8 md:mb-12">
              <div className="relative w-full">
                <Image
                  src="/images/recruit/recruit-team.webp"
                  alt="フラクタル訪問看護 船橋 スタッフ"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* HP限定入社祝い金バナー */}
            <div className="bg-gradient-to-r from-[var(--color-logo-yellow)] via-[var(--color-logo-yellow)]/80 to-[var(--color-logo-yellow)] rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg relative overflow-hidden mb-8 md:mb-12">
              <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-[var(--color-logo-yellow)]/50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-[var(--color-logo-yellow)]/50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

              <div className="relative z-10">
                <div className="inline-block bg-red-500 text-white text-base md:text-lg font-bold px-2 md:px-3 py-1 rounded-full mb-3 md:mb-4">
                  {signOnBonus.note}
                </div>
                <h4 className="text-xl md:text-3xl font-bold text-primary mb-4 md:mb-6">
                  入社祝い金 最大{(signOnBonus.total / 10000).toLocaleString()}万円
                </h4>

                {/* 祝い金マイルストーン（矢印付き・下揃え） */}
                <div className="flex items-end justify-center gap-1 md:gap-2">
                  {signOnBonus.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-end">
                      <div
                        className="bg-white/90 rounded-lg md:rounded-xl text-center shadow-sm"
                        style={{
                          padding: index === 0 ? '8px 12px' : index === 1 ? '10px 14px' : '12px 16px',
                        }}
                      >
                        <p className={`text-primary/70 mb-0.5 ${index === 0 ? 'text-sm md:text-base' : index === 1 ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>
                          {milestone.label}
                        </p>
                        <p className={`font-bold text-primary ${index === 0 ? 'text-base md:text-xl' : index === 1 ? 'text-lg md:text-2xl' : 'text-xl md:text-3xl'}`}>
                          {(milestone.amount / 10000).toLocaleString()}万円
                        </p>
                      </div>
                      {index < signOnBonus.milestones.length - 1 && (
                        <div className="text-primary mx-1 md:mx-2 mb-2 md:mb-3">
                          <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-base md:text-lg text-primary/80 mt-3 md:mt-4 text-center mb-3">全ての職種に適用されます</p>
                <div className="bg-white/90 rounded-lg p-3 md:p-4 border-l-4 border-red-500">
                  <p className="text-sm md:text-base text-primary/90 font-medium">
                    ※ 入社祝い金は、本HPからの応募に限り適用されます。他の求人媒体から応募された場合、または本HPでの応募前に他の求人媒体から応募されている場合は対象外となりますのでご注意ください。
                  </p>
                </div>
              </div>
            </div>

            {/* 採用情報ボタン */}
            <div className="text-center">
              <Link
                href="/recruit"
                className="inline-block bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                船橋事業所の看護師求人を見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
