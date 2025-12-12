import { serviceAreas } from "@/lib/data";
import BackgroundTriangles from "./BackgroundTriangles";

export default function ServiceArea() {
  return (
    <section id="service-area" className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="serviceArea" />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* 丸みを帯びた四角形で囲む */}
        <div className="section-card section-card-mint">
          {/* タイトル */}
          <h2 className="text-3xl font-bold text-center text-primary mb-12">訪問エリア</h2>

          <div className="space-y-10">
            {/* 地図とエリア詳細を横並び */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* エリア地図プレースホルダー（左側） */}
              <div className="bg-white rounded-xl p-6 min-h-[350px] flex items-center justify-center shadow-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-muted mb-4">
                    訪問エリア地図
                  </div>
                  <div className="space-y-2 text-muted">
                    <p>船橋市 / 習志野市</p>
                    <p>千葉市花見川区</p>
                    <p className="text-sm mt-3">及び周辺エリア</p>
                  </div>
                </div>
              </div>

              {/* エリア詳細（右側） */}
              <div className="space-y-6">
                {/* 重点訪問エリア */}
                <div className="bg-accent-pink-light rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-center">
                    {serviceAreas.priority.label}
                  </h3>
                  <p className="text-center text-sm text-muted mb-4">
                    {serviceAreas.priority.note}
                  </p>
                  <div className="space-y-3">
                    {serviceAreas.priority.cities.map((city, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                        <h4 className="font-bold text-base mb-2 text-primary">
                          {city.name}
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {city.areas.map((area, areaIndex) => (
                            <li key={areaIndex} className="flex items-start gap-2">
                              <span className="text-accent-pink mt-0.5">▸</span>
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 訪問可能エリア */}
                <div className="bg-accent-yellow rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-center">
                    {serviceAreas.available.label}
                  </h3>
                  <p className="text-center text-sm text-muted mb-3">
                    {serviceAreas.available.note}
                  </p>
                  <p className="text-center text-sm leading-relaxed">
                    {serviceAreas.available.description}
                  </p>
                </div>
              </div>
            </div>

            {/* 注記 */}
            <div className="bg-white rounded-lg p-5 text-center shadow-sm">
              <p className="font-medium text-foreground text-base">
                駐車場代・交通費は訪問可能エリア内であればいただきません。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
