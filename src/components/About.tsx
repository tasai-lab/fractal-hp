import { philosophyItems } from "@/lib/data";
import Image from "next/image";
import BackgroundTriangles from "./BackgroundTriangles";

export default function About() {
  return (
    <section id="about" className="section-wrapper bg-white relative overflow-hidden">
      {/* 背景装飾 */}
      <BackgroundTriangles pattern="about" />

      <div className="section-inner relative z-10">
        {/* セクションタイトル（縦書き） */}
        <div className="section-title-area">
          <h2 className="section-title">フラクタルとは</h2>
          <div className="section-title-line" />
        </div>

        {/* コンテンツエリア */}
        <div className="section-content space-y-12">
          {/* フラクタルとは セクション */}
          <div className="space-y-6 md:space-y-8">
            {/* 訪問看護ロゴ */}
            <div className="flex justify-center">
              <Image
                src="/images/logos/hokan-logo-static.png"
                alt="フラクタル訪問看護ロゴ"
                width={150}
                height={150}
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
              />
            </div>

            {/* メインコピー */}
            <div className="text-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary leading-relaxed">
                あなたの人生の、大切な「一部」になりたい。
              </h3>
            </div>

            {/* 理念の説明 */}
            <div className="space-y-4 md:space-y-6 text-foreground max-w-2xl mx-auto">
              <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                「フラクタル」とは、一部分が全体と同じ形になる構造のこと。
                私たちは、日々の訪問看護という「一部」の積み重ねが、利用者さまやご家族の人生という「全体」を豊かにすると信じています。
              </p>

              <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                病気や障がいだけでなく、その人らしさ、価値観、これまでの人生。
                すべてを含めた「その人全体」に寄り添い、最適なケアを一緒に考えていきます。
              </p>

              <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                関わるすべての人たちが、自分らしく思い描く人生を送るために。
                私たちは、最期のときまで頼れる存在であり続けます。
              </p>
            </div>

            {/* 最後のメッセージ */}
            <div className="text-center">
              <p className="text-base md:text-lg lg:text-xl font-bold text-primary leading-relaxed">
                完璧な正解よりも、あなたにとっての最適解を。<br />
                それが、私たちフラクタルです。
              </p>
            </div>
          </div>

          {/* 私たちのカタチ セクション - 丸みを帯びた四角形で囲む */}
          <div id="philosophy" className="section-card section-card-about space-y-6 md:space-y-8">
            {/* タイトル */}
            <h3 className="text-2xl md:text-3xl font-bold text-center text-primary">私たちのカタチ</h3>

            {/* ロゴ（法人ロゴと多様性ロゴを横並び） */}
            <div className="flex justify-center items-center gap-8 md:gap-12">
              <Image
                src="/images/logos/corporate-logo.png"
                alt="株式会社フラクタルロゴ"
                width={150}
                height={150}
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
              />
              <Image
                src="/images/logos/hokan-logo-diversity.gif"
                alt="フラクタル多様性ロゴ"
                width={150}
                height={150}
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
                unoptimized
              />
            </div>

            {/* サブタイトル */}
            <p className="text-base md:text-xl text-center text-muted">
              私たちをカタチ作る、4つの要素
            </p>

            {/* 理念項目リスト */}
            <div className="space-y-4 md:space-y-6">
              {philosophyItems.map((item) => (
                <div
                  key={item.number}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-base md:text-lg">
                        {item.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-primary">{item.title}</h4>
                      <p className="text-foreground leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* フラクタルを知るボタン */}
            <div className="flex justify-center mt-6 md:mt-12">
              <a
                href="/about-fractal"
                className="group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-gray-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg hover:shadow-xl"
              >
                <span className="mr-2 text-base md:text-lg">フラクタルを知る</span>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
                <div className="absolute -z-10 w-full h-full rounded-full bg-primary opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-200 animate-pulse"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
