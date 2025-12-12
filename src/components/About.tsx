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
          <div className="section-card section-card-about space-y-8">
            {/* フラクタルロゴ */}
            <div className="flex justify-center">
              <Image
                src="/images/logos/hokan-logo-animated.gif"
                alt="フラクタルロゴ"
                width={150}
                height={150}
                className="w-[150px] h-[150px]"
                unoptimized
              />
            </div>

            {/* メインコピー */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-primary leading-relaxed">
                一部分が全体と同じ形になる構造です。
              </h3>
            </div>

            {/* 理念の説明 */}
            <div className="space-y-6 text-foreground">
              <p className="text-base md:text-lg leading-relaxed">
                だからこそ、私たちフラクタルは関わる全ての人たちが思い描く人生を送るために、最後の最後まで頼られる一部分であり続けます。
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                私たちが行う一つひとつのケアは、いわば利用者さまの生活の『一部』であり、その積み重ねが利用者さまやご家族の人生という『全体』をカタチ作ります。
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                病気や障がいといった一面だけを捉えるのではなく、利用者さまの価値観、生活歴、社会的背景まで含めた『その人全体』を捉え、チームとして多角的な視点から利用者さまの最適解を一緒に模索します。
              </p>
            </div>

            {/* 最後のメッセージ */}
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-primary leading-relaxed">
                完璧はない、だから最適化する。<br />
                それが私たちがフラクタルであるということです。
              </p>
            </div>
          </div>

          {/* 私たちのカタチ セクション - 丸みを帯びた四角形で囲む */}
          <div id="philosophy" className="section-card space-y-8">
            {/* タイトル */}
            <h3 className="text-3xl font-bold text-center text-primary">私たちのカタチ</h3>

            {/* サブタイトル */}
            <p className="text-xl text-center text-muted">
              シンプルで独創的、それがフラクタル。
            </p>

            {/* 理念項目リスト */}
            <div className="space-y-6">
              {philosophyItems.map((item) => (
                <div
                  key={item.number}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {item.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-2 text-primary">{item.title}</h4>
                      <p className="text-foreground leading-relaxed text-sm">
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
