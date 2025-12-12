import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* 背景画像 */}
      <Image
        src="/images/hero/hero-bg.jpg"
        alt="フラクタル訪問看護スタッフ"
        fill
        className="object-cover"
        priority
      />

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* コンテンツ */}
      <div className="relative z-10 text-center px-4 py-8 animate-fade-in-up flex flex-col items-center justify-center h-full">
        {/* メインキャッチコピー（縦書き） */}
        <div className="flex justify-center">
          <h1
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] drop-shadow-sm"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.15em",
            }}
          >
            私たちがフラクタル
          </h1>
        </div>
      </div>
    </section>
  );
}
