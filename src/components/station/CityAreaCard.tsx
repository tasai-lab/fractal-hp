import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RegionalData } from "@/lib/regional-data";

type CityAreaCardProps = {
  city: { name: string; areas: string[] };
  areaData?: RegionalData;
  showColorBar?: boolean;
  detailHref?: string;
};

export default function CityAreaCard({
  city,
  areaData,
  showColorBar = true,
  detailHref,
}: CityAreaCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* カラーバー */}
      {showColorBar && areaData && (
        <div className="h-2" style={{ backgroundColor: areaData.theme.primary }} />
      )}

      <div className="p-4 md:p-5 flex flex-col flex-1">
        {/* 市名 */}
        <h4
          className="font-bold text-lg mb-3 pb-2 border-b border-gray-200"
          style={{ color: areaData?.theme.secondary || "var(--color-logo-dark-green)" }}
        >
          {city.name}
        </h4>

        {/* 実績グリッド */}
        {areaData?.areaStats && (
          <div
            className="grid grid-cols-2 gap-2 mb-4 rounded-lg p-2"
            style={{ backgroundColor: `${areaData.theme.primary}10` }}
          >
            <div className="text-center">
              <p
                className="text-sm font-bold"
                style={{ color: areaData.theme.primary }}
              >
                {areaData.areaStats.patients}名
              </p>
              <p className="text-[10px] text-[var(--color-ink-soft)]">利用者数</p>
            </div>
            <div className="text-center">
              <p
                className="text-sm font-bold"
                style={{ color: areaData.theme.primary }}
              >
                {areaData.areaStats.monthlyVisits}件
              </p>
              <p className="text-[10px] text-[var(--color-ink-soft)]">月間訪問数</p>
            </div>
          </div>
        )}

        {/* エリアタグ一覧 */}
        {city.areas.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {city.areas.map((area) => (
                <span
                  key={area}
                  className="inline-block px-2.5 py-1 text-xs md:text-sm rounded-full bg-[var(--color-logo-light-green)]/15 text-[var(--color-logo-dark-green)]"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="text-[var(--color-ink-soft)] text-xs mb-4">
              上記以外の地域も承ります
            </p>
          </>
        ) : (
          <p className="text-sm text-[var(--color-ink-soft)] mb-4">
            訪問可能エリアについてはお問い合わせください
          </p>
        )}

        {/* 統計グリッド */}
        {areaData && (
          <div className="mt-auto border-t border-gray-100 pt-3">
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                <p
                  className="text-xs font-bold leading-tight"
                  style={{ color: areaData.theme.primary }}
                >
                  {areaData.population.total}
                </p>
                <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">総人口</p>
              </div>
              <div className="text-center">
                <p
                  className="text-xs font-bold leading-tight"
                  style={{ color: areaData.theme.primary }}
                >
                  {areaData.population.elderlyRate}
                </p>
                <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">高齢化率</p>
              </div>
              <div className="text-center">
                <p
                  className="text-xs font-bold leading-tight"
                  style={{ color: areaData.theme.primary }}
                >
                  {areaData.population.elderly}
                </p>
                <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">高齢者人口</p>
              </div>
              <div className="text-center">
                <p
                  className="text-xs font-bold leading-tight"
                  style={{ color: areaData.theme.primary }}
                >
                  {areaData.population.youngRate}
                </p>
                <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">年少人口率</p>
              </div>
            </div>
          </div>
        )}

        {/* 詳しくリンク */}
        {detailHref && areaData && (
          <Link
            href={detailHref}
            className="group flex items-center justify-between p-3 rounded-lg transition-colors mt-3"
            style={{ backgroundColor: `${areaData.theme.primary}15` }}
          >
            <div className="flex items-center gap-3">
              <div>
                <span
                  className="font-bold text-sm"
                  style={{ color: areaData.theme.primary }}
                >
                  {areaData.population.elderlyRate}
                </span>
                <span className="text-xs text-[var(--color-ink-soft)] ml-1">高齢化率</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div>
                <span className="text-xs text-[var(--color-ink-soft)]">人口</span>
                <span className="text-sm font-medium ml-1">{areaData.population.total}</span>
              </div>
            </div>
            <div
              className="flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all"
              style={{ color: areaData.theme.primary }}
            >
              <span>詳しく</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
