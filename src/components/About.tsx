export default function About() {
  return (
    <section id="about" className="section-wrapper bg-white">
      <div className="section-inner">
        {/* セクションタイトル（縦書き） */}
        <div className="section-title-area">
          <h2 className="section-title">フラクタルとは</h2>
          <div className="section-title-line" />
        </div>

        {/* コンテンツエリア */}
        <div className="section-content space-y-8">
          {/* フラクタルロゴ */}
          <div className="flex justify-center">
            <FractalTriangleDecoration size={150} />
          </div>

          {/* メインコピー */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] leading-relaxed">
              一部分が全体と同じ形になる構造です。
            </h3>
          </div>

          {/* 理念の説明 */}
          <div className="space-y-6 text-[var(--color-foreground)]">
            <p className="text-base md:text-lg leading-relaxed">
              フラクタルは、部分と全体が自己相似性を持つ幾何学的な構造を指します。
              自然界にも多く見られるこの美しい形は、私たちの看護理念を象徴しています。
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              一人ひとりの利用者様に寄り添いながら、その方らしい生活を支えること。
              小さなケアの積み重ねが、大きな安心と信頼につながっていく。
              フラクタルのように、私たち一人ひとりのケアが組織全体の質を形作り、
              それぞれの家庭に最適な看護サービスを提供していきます。
            </p>
          </div>

          {/* 愛・信頼・希望 */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[var(--color-accent-pink-light)] rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">愛</div>
              <p className="text-sm text-[var(--color-primary-light)]">
                温かい心で接する
              </p>
            </div>
            <div className="bg-[var(--color-accent-mint-light)] rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">信頼</div>
              <p className="text-sm text-[var(--color-primary-light)]">
                確かな技術と知識
              </p>
            </div>
            <div className="bg-[var(--color-accent-yellow)] rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">希望</div>
              <p className="text-sm text-[var(--color-primary-light)]">
                明日への活力を
              </p>
            </div>
          </div>

          {/* 最後のメッセージ */}
          <div className="text-center mt-8">
            <p className="text-lg md:text-xl font-bold text-[var(--color-primary)] leading-relaxed">
              完璧はない、だから最適化する。<br />
              それが私たちフラクタルであるということです。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 装飾用のフラクタル三角形コンポーネント
function FractalTriangleDecoration({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {/* 外側の大きな三角形の枠線 */}
      <polygon
        points="50,5 5,95 95,95"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
      />

      {/* 中央の三角形 */}
      <polygon
        points="50,50 27.5,95 72.5,95"
        fill="var(--color-accent-blue)"
        stroke="var(--color-primary)"
        strokeWidth="0.5"
      />

      {/* 左下の三角形 */}
      <polygon
        points="27.5,50 5,95 50,95"
        fill="var(--color-accent-pink)"
        stroke="var(--color-primary)"
        strokeWidth="0.5"
      />

      {/* 右下の三角形 */}
      <polygon
        points="72.5,50 50,95 95,95"
        fill="var(--color-accent-yellow)"
        stroke="var(--color-primary)"
        strokeWidth="0.5"
      />

      {/* 上部の三角形 */}
      <polygon
        points="50,5 27.5,50 72.5,50"
        fill="var(--color-accent-mint)"
        stroke="var(--color-primary)"
        strokeWidth="0.5"
      />

      {/* 最上部の小さな三角形 */}
      <polygon
        points="50,5 38.75,27.5 61.25,27.5"
        fill="var(--color-accent-blue-light)"
        stroke="var(--color-primary)"
        strokeWidth="0.3"
      />
    </svg>
  );
}
