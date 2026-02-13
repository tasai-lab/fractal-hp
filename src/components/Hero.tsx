import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* 背景画像 */}
      <Image
        src="/images/hero/hero-bg.webp"
        alt="フラクタル訪問看護スタッフ"
        fill
        className="object-cover"
        priority
      />

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* 下部のぼかし（背景色へのグラデーション） */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-40 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none"></div>

      {/* SEO用H1（上部に配置） */}
      <h1 className="absolute top-4 md:top-6 left-0 right-0 z-10 text-center text-sm md:text-base text-[var(--color-primary)]/80 font-medium tracking-wide">
        船橋市・八千代市・習志野市の訪問看護
      </h1>

      {/* コンテンツ */}
      <div className="relative z-10 text-center px-4 py-8 flex flex-col items-center justify-center h-full" style={{ perspective: "1000px" }}>
        {/* メインキャッチコピー（縦書き） */}
        <div className="flex justify-center animate-emerge-from-back">
          <h2
            className="font-bold text-[var(--color-primary)] drop-shadow-lg"
            style={{
              fontSize: 'var(--font-size-fluid-4xl)',
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.15em",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            私たちがフラクタル
          </h2>
        </div>
      </div>
    </section>
  );
}
