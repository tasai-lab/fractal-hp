import React from "react";
import { conditionCategories, statusConfig } from "@/lib/conditions-data";
import BackgroundTriangles from "@/components/BackgroundTriangles";

interface ConditionsTableProps {
  /** true の場合、セクションラッパーなしでコンテンツのみ返す */
  embedded?: boolean;
}

export default function ConditionsTable({ embedded = false }: ConditionsTableProps) {
  const content = (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr className="border-b-2 border-[var(--color-logo-dark-green)]">
            <th className="text-left py-3 px-3 md:px-4 font-bold text-[var(--color-ink)] w-2/5 md:w-1/3">
              対応内容
            </th>
            <th className="text-center py-3 px-2 font-bold text-[var(--color-logo-dark-green)] w-16">
              対応
            </th>
            <th className="text-left py-3 px-3 md:px-4 font-medium text-[var(--color-ink-soft)] hidden md:table-cell">
              詳細
            </th>
          </tr>
        </thead>
        <tbody>
          {conditionCategories.map((category) => (
            <React.Fragment key={category.id}>
              {/* カテゴリヘッダー行 */}
              <tr
                className="bg-[var(--color-logo-light-green)]/15"
              >
                <td
                  colSpan={3}
                  className="py-2 px-3 md:px-4 font-bold text-xs md:text-sm text-[var(--color-logo-dark-green)] uppercase tracking-wide"
                >
                  {category.label}
                </td>
              </tr>
              {/* アイテム行 */}
              {category.items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-3 md:px-4">
                    <span className="font-medium text-[var(--color-ink)]">
                      {item.name}
                    </span>
                    {item.note && (
                      <p className="text-xs text-amber-600 mt-0.5 md:hidden">
                        ※ {item.note}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`text-lg md:text-xl ${statusConfig[item.status].className}`}
                    >
                      {statusConfig[item.status].label}
                    </span>
                  </td>
                  <td className="py-3 px-3 md:px-4 text-[var(--color-ink-soft)] hidden md:table-cell">
                    <span>{item.description}</span>
                    {item.note && (
                      <span className="block text-xs text-amber-600 mt-0.5">
                        ※ {item.note}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* 凡例 */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200 text-sm text-[var(--color-ink-soft)]">
        <div className="flex items-center gap-1.5">
          <span className="text-base font-bold text-[var(--color-logo-dark-green)]">○</span>
          <span>対応可能</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-base font-bold text-amber-600">△</span>
          <span>要相談</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-base font-bold text-gray-400">×</span>
          <span>非対応</span>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="section-wrapper bg-white relative overflow-x-hidden">
      <BackgroundTriangles pattern="office" />
      <div className="relative z-10 section-container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 heading-gothic text-[var(--color-ink)]">
            受け入れ可能な身体の状況
          </h2>
          <p className="text-base md:text-lg text-[var(--color-ink-soft)]">
            下記以外のケースもお気軽にご相談ください
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
          {content}
        </div>
      </div>
    </section>
  );
}
