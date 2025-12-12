import Link from "next/link";
import BackgroundTriangles from "./BackgroundTriangles";

export default function Recruit() {
  return (
    <section
      id="recruit"
      className="section-wrapper bg-white relative overflow-hidden"
    >
      <BackgroundTriangles pattern="recruit" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title">リクルート</h2>
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
              <p className="text-sm md:text-lg text-muted border-b-2 border-primary inline-block pb-1">
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
                    <p className="text-sm md:text-lg leading-relaxed">
                      スタッフが心身ともに余裕を持って働ける環境こそが、利用者さまへの質の高いケアにつながると信じているからです。
                      無駄な業務を減らし、本来向き合うべき「看護」に集中できる環境を整えています。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* スタッフ集合写真プレースホルダー */}
            <div className="rounded-2xl overflow-hidden shadow-sm mb-8">
              <div className="bg-white aspect-video flex items-center justify-center">
                <div className="text-center">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 100 100"
                    className="mx-auto mb-4"
                  >
                    <polygon
                      points="50,10 90,80 10,80"
                      fill="var(--color-primary)"
                    />
                    <polygon
                      points="50,10 70,45 30,45"
                      fill="var(--color-accent-blue)"
                    />
                    <polygon
                      points="30,45 50,80 10,80"
                      fill="var(--color-accent-mint)"
                    />
                    <polygon
                      points="70,45 90,80 50,80"
                      fill="var(--color-accent-pink)"
                    />
                  </svg>
                  <p className="text-2xl font-bold text-primary">
                    フラクタル訪問看護 船橋
                  </p>
                  <p className="text-muted mt-2">スタッフ集合写真</p>
                </div>
              </div>
            </div>

            {/* 採用情報ボタン */}
            <div className="text-center">
              <Link
                href="/recruit"
                className="inline-block bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                採用情報を見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
