import Link from "next/link";
import { signOnBonus } from "@/lib/recruit-data";

export default function RecruitCTA() {
  return (
    <section
      id="recruit"
      className="section-wrapper bg-white relative"
    >
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title heading-gothic">採用情報</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          <div className="section-card">
            {/* キャッチコピー */}
            <div className="text-center mb-8 md:mb-10">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold heading-gothic text-[var(--color-primary)] mb-4 leading-snug">
                「働きやすさ」が、「良い看護」をつくる。
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed max-w-xl mx-auto">
                私たちは、業務の効率化とスタッフの働きやすさを何よりも大切にしています。
              </p>
            </div>

            {/* 入社祝い金バナー */}
            <div className="bg-gradient-to-r from-[var(--color-logo-yellow)] via-[var(--color-logo-yellow)]/80 to-[var(--color-logo-yellow)] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg relative overflow-hidden mb-8 md:mb-10">
              <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-[var(--color-logo-yellow)]/50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
              <div className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-[var(--color-logo-yellow)]/50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

              <div className="relative z-10">
                <div className="inline-block bg-red-500 text-white text-sm md:text-base font-bold px-2 md:px-3 py-1 rounded-full mb-3 md:mb-4">
                  {signOnBonus.note}
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-4 md:mb-6">
                  入社祝い金 最大{(signOnBonus.total / 10000).toLocaleString()}万円
                </h4>

                {/* 祝い金マイルストーン（矢印付き・下揃え） */}
                <div className="flex items-end justify-center gap-1 md:gap-2">
                  {signOnBonus.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-end">
                      <div
                        className="bg-white/90 rounded-lg md:rounded-xl text-center shadow-sm"
                        style={{
                          padding:
                            index === 0
                              ? "8px 12px"
                              : index === 1
                                ? "10px 14px"
                                : "12px 16px",
                        }}
                      >
                        <p
                          className={`text-[var(--color-primary)]/70 mb-0.5 ${
                            index === 0
                              ? "text-sm md:text-base"
                              : index === 1
                                ? "text-base md:text-lg"
                                : "text-lg md:text-xl"
                          }`}
                        >
                          {milestone.label}
                        </p>
                        <p
                          className={`font-bold text-[var(--color-primary)] ${
                            index === 0
                              ? "text-base md:text-xl"
                              : index === 1
                                ? "text-lg md:text-2xl"
                                : "text-xl md:text-3xl"
                          }`}
                        >
                          {(milestone.amount / 10000).toLocaleString()}万円
                        </p>
                      </div>
                      {index < signOnBonus.milestones.length - 1 && (
                        <div className="text-[var(--color-primary)] mx-1 md:mx-2 mb-2 md:mb-3">
                          <svg
                            className="w-4 h-4 md:w-6 md:h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-sm md:text-base text-[var(--color-primary)]/80 mt-3 md:mt-4 text-center mb-3">
                  全ての職種に適用されます
                </p>
                <div className="bg-white/90 rounded-lg p-3 md:p-4 border-l-4 border-red-500">
                  <p className="text-sm md:text-base text-[var(--color-primary)]/90 font-medium">
                    ※ 入社祝い金は、本HPからの応募に限り適用されます。他の求人媒体から応募された場合、または本HPでの応募前に他の求人媒体から応募されている場合は対象外となりますのでご注意ください。
                  </p>
                </div>
              </div>
            </div>

            {/* 採用情報ボタン */}
            <div className="text-center">
              <Link
                href="/recruit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-primary)] text-white font-bold text-base md:text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                求人募集を見る
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
