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
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                最適化された環境で
                <br />
                一緒に働きませんか？
              </h3>
              <p className="text-lg text-muted border-b-2 border-primary inline-block pb-1">
                当社はなによりも業務の最適化を重視して仕組み化しています。
              </p>
            </div>

            {/* Q&A セクション */}
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
              <div className="mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-blue rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Q</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold text-primary">
                      なぜ業務の最適化を重視しているのか？
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-pink rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-lg leading-relaxed">
                      スタッフの負担を減らすことができるため、それが利用者さまへの訪問の質を最大限まで上げることに繋がるからです。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* スタッフ集合写真プレースホルダー */}
            <div className="rounded-2xl overflow-hidden shadow-sm">
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
          </div>
        </div>
      </div>
    </section>
  );
}
