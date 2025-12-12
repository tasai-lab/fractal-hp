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
          {/* フラクタルとは セクション - 丸みを帯びた四角形で囲む */}
          <div className="section-card section-card-about space-y-6 md:space-y-8">
            {/* フラクタルロゴ */}
            <div className="flex justify-center">
              <Image
                src="/images/logos/hokan-logo-animated.gif"
                alt="フラクタルロゴ"
                width={150}
                height={150}
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
                unoptimized
              />
            </div>

            {/* メインコピー */}
            <div className="text-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary leading-relaxed">
                あなたの人生の、大切な「一部」になりたい。
              </h3>
            </div>

            {/* 理念の説明 */}
            <div className="space-y-4 md:space-y-6 text-foreground">
              <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                「フラクタル」とは、一部分が全体と同じ形になる構造のこと。
                私たちは、日々の訪問看護という「一部」の積み重ねが、利用者さまやご家族の人生という「全体」を豊かにすると信じています。
              </p>

              <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                病気や障がいだけでなく、その人らしさ、価値観、これまでの人生。
                すべてを含めた「その人全体」に寄り添い、最適なケアを一緒に考えていきます。
              </p>

              <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                関わるすべての人たちが、自分らしく思い描く人生を送れるように。
                私たちは、最後の最後まで頼れる存在であり続けます。
              </p>
            </div>

            {/* 最後のメッセージ */}
            <div className="text-center">
              <p className="text-base md:text-lg lg:text-xl font-bold text-primary leading-relaxed">
                完璧な正解よりも、あなたにとっての最適解を。<br />
                それが、私たちフラクタルの約束です。
              </p>
            </div>
          </div>

          {/* 私たちのカタチ セクション - 丸みを帯びた四角形で囲む */}
          <div id="philosophy" className="section-card space-y-6 md:space-y-8">
            {/* タイトル */}
            <h3 className="text-2xl md:text-3xl font-bold text-center text-primary">私たちのカタチ</h3>

            {/* サブタイトル */}
            <p className="text-base md:text-xl text-center text-muted">
              想いをカタチにする、4つのこだわり
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
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm md:text-base">
                        {item.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-primary">{item.title}</h4>
                      <p className="text-foreground leading-relaxed text-xs md:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
