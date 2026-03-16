import Link from "next/link";

type Position = {
  title: string;
  salaryRange: string;
  highlights: string[];
};

type Props = {
  recruitSummary: {
    positions: Position[];
    signOnBonusTotal: number;
  };
};

export default function StationRecruit({ recruitSummary }: Props) {
  const { positions, signOnBonusTotal } = recruitSummary;

  return (
    <section id="recruit" className="section-wrapper bg-white relative">
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title heading-gothic">スタッフ募集</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          <div className="section-card section-card-blue">
          <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6 md:mb-8">
            「働きやすさ」が「良い看護」をつくる。
            あなたの力をフラクタルで発揮してください。
          </p>

          {/* 入社祝い金バナー */}
          <div className="bg-gradient-to-r from-[var(--color-logo-yellow)] via-[var(--color-logo-yellow)]/80 to-[var(--color-logo-yellow)] rounded-2xl p-4 sm:p-6 shadow-lg relative overflow-hidden mb-6 md:mb-8">
            <div className="absolute top-0 right-0 w-20 md:w-28 h-20 md:h-28 bg-[var(--color-logo-yellow)]/50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
            <div className="absolute bottom-0 left-0 w-16 md:w-20 h-16 md:h-20 bg-[var(--color-logo-yellow)]/50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

            <div className="relative z-10">
              <div className="inline-block bg-red-500 text-white text-xs md:text-sm font-bold px-2 py-1 rounded-full mb-2">
                HP・電話申し込み限定
              </div>
              <p className="text-xl md:text-2xl font-bold text-[var(--color-ink)] heading-gothic">
                入社祝い金 最大{(signOnBonusTotal / 10000).toLocaleString()}万円
              </p>
              <p className="text-sm text-[var(--color-ink)]/80 mt-1">
                全職種対象・1年間で段階的に支給
              </p>
            </div>
          </div>

          {/* 募集職種カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-[var(--color-accent-blue-light)] p-5 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold heading-gothic text-[var(--color-ink)] mb-2">
                  {position.title}
                </h3>
                <p className="text-base md:text-lg font-bold text-[var(--color-ink)] mb-4">
                  {position.salaryRange}
                </p>
                <ul className="space-y-1.5">
                  {position.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-2 text-sm md:text-base text-[var(--color-ink-soft)]">
                      <span
                        className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[var(--color-logo-dark-green)] flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTAボタン */}
          <div className="text-center">
            <Link
              href="/recruit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold text-base md:text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              詳しい採用情報を見る
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
