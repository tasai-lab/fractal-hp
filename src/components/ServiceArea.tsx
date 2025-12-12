import { serviceAreas } from "@/lib/data";

export default function ServiceArea() {
  return (
    <section id="service-area" className="section-wrapper bg-white">
      <div className="section-container">
        {/* タイトル（水色の帯） */}
        <div className="bg-accent-blue-light rounded-2xl px-8 py-6 mb-12">
          <h2 className="text-3xl font-bold text-center text-primary">訪問エリア</h2>
        </div>

        <div className="space-y-10">
          {/* 地図とエリア詳細を横並び */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* エリア地図プレースホルダー（左側） */}
            <div className="bg-gray-100 rounded-xl p-6 min-h-[350px] flex items-center justify-center border-4 border-gray-300 border-dashed">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-500 mb-4">
                  訪問エリア地図
                </div>
                <div className="space-y-2 text-gray-600">
                  <p>船橋市 / 習志野市</p>
                  <p>千葉市花見川区</p>
                  <p className="text-sm mt-3">及び周辺エリア</p>
                </div>
              </div>
            </div>

            {/* エリア詳細（右側） */}
            <div className="space-y-6">
              {/* 重点訪問エリア */}
              <div className="card card-pink">
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
              <div className="card">
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
          <div className="bg-accent-blue-light rounded-lg p-5 text-center">
            <p className="font-medium text-foreground text-base">
              駐車場代・交通費は訪問可能エリア内であればいただきません。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
