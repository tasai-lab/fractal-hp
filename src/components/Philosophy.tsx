import { philosophyItems } from "@/lib/data";

export default function Philosophy() {
  return (
    <section id="philosophy" className="section-wrapper bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* タイトル（水色の帯） */}
        <div className="bg-accent-blue-light rounded-2xl px-8 py-6 mb-8">
          <h2 className="text-3xl font-bold text-center text-primary">私たちのカタチ</h2>
        </div>

        {/* サブタイトル */}
        <p className="text-xl text-center text-muted mb-12">
          シンプルで独創的、それがフラクタル。
        </p>

        {/* 理念項目リスト */}
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
    </section>
  );
}
