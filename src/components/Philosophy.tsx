import { philosophyItems } from "@/lib/data";

export default function Philosophy() {
  return (
    <section id="philosophy" className="section-wrapper bg-white">
      <div className="section-container">
        {/* タイトル（水色の帯） */}
        <div className="bg-accent-blue-light rounded-2xl px-8 py-6 mb-8">
          <h2 className="text-3xl font-bold text-center text-primary">私たちのカタチ</h2>
        </div>

        {/* サブタイトル */}
        <p className="text-xl text-center text-muted mb-12">
          シンプルで独創的、それがフラクタル。
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* フラクタル三角形のSVGイラスト */}
          <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
            <svg
              viewBox="0 0 400 400"
              className="w-full max-w-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 大きな三角形 - 中央 */}
              <polygon
                points="200,50 100,250 300,250"
                fill="var(--color-accent-blue)"
                opacity="0.8"
              />

              {/* 中サイズの三角形 - 左上 */}
              <polygon
                points="100,50 50,150 150,150"
                fill="var(--color-accent-pink)"
                opacity="0.7"
              />

              {/* 中サイズの三角形 - 右上 */}
              <polygon
                points="300,50 250,150 350,150"
                fill="var(--color-accent-mint)"
                opacity="0.7"
              />

              {/* 小さな三角形 - 左下 */}
              <polygon
                points="75,250 25,325 125,325"
                fill="var(--color-accent-yellow)"
                opacity="0.9"
              />

              {/* 小さな三角形 - 中下 */}
              <polygon
                points="200,250 150,325 250,325"
                fill="var(--color-accent-pink-light)"
                opacity="0.8"
              />

              {/* 小さな三角形 - 右下 */}
              <polygon
                points="325,250 275,325 375,325"
                fill="var(--color-accent-mint-light)"
                opacity="0.8"
              />

              {/* 微小な三角形 - 装飾 */}
              <polygon
                points="200,100 180,130 220,130"
                fill="var(--color-accent-yellow-dark)"
                opacity="0.9"
              />

              <polygon
                points="150,180 135,205 165,205"
                fill="var(--color-accent-blue)"
                opacity="0.6"
              />

              <polygon
                points="250,180 235,205 265,205"
                fill="var(--color-accent-pink)"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* 理念項目リスト */}
          <div className="flex-1 w-full">
            <div className="space-y-6">
              {philosophyItems.map((item) => (
                <div
                  key={item.number}
                  className="bg-accent-yellow rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {item.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
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
