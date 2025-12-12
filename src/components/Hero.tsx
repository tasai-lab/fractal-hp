export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-blue-light)] via-[var(--color-accent-pink-light)] to-[var(--color-accent-yellow)] opacity-60 blur-3xl"></div>

      {/* 装飾的なパターン */}
      <div className="absolute inset-0 opacity-20 hidden md:block pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-[var(--color-primary)] rotate-45 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-[var(--color-primary)] rotate-12 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-[var(--color-primary)] -rotate-45 animate-float"></div>
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 text-center px-4 animate-fade-in-up">
        {/* メインキャッチコピー（縦書き） */}
        <div className="flex justify-center mb-8">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--color-primary)] drop-shadow-sm"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.2em",
            }}
          >
            あなたらしい毎日を
          </h1>
        </div>

        {/* サブテキスト */}
        <div className="mt-8 space-y-4 bg-white/30 backdrop-blur-sm p-6 rounded-2xl inline-block shadow-sm border border-white/50">
          <p className="text-lg md:text-xl text-[var(--color-primary)] font-bold tracking-wide">
            フラクタル訪問看護 船橋
          </p>
          <p className="text-base md:text-lg text-[var(--color-primary-light)] font-medium leading-relaxed">
            住み慣れた家で、安心して過ごせるように。<br className="md:hidden" />
            私たちが全力でサポートします。
          </p>
        </div>

        {/* スクロール促進 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-[var(--color-primary)]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
