import {
  nurseModelIncome,
  therapistModelIncome,
  type ModelIncome,
} from "@/lib/recruit-data";

interface ModelIncomeSectionProps {
  isNurse: boolean;
}

const ModelIncomeCard = ({ model }: { model: ModelIncome }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-white/80 hover-lift">
      {/* 年収ヘッダー部分 */}
      <div className="bg-[var(--color-logo-dark-green)] px-5 py-6 text-center">
        <p className="text-white/80 text-sm mb-1">{model.label}</p>
        <p className="heading-mincho text-4xl md:text-5xl text-white font-bold">
          {model.annual}
        </p>
        <p className="text-[var(--color-logo-light-green)] text-sm mt-2">
          {model.monthly}
        </p>
      </div>

      {/* 内訳テーブル部分 */}
      <div className="p-5">
        <table className="w-full text-sm">
          <tbody>
            {model.breakdown.map((item, idx) => {
              const isHighlight =
                item.label === "月収合計" || item.label === "年収";
              return (
                <tr
                  key={idx}
                  className={`${
                    isHighlight
                      ? "bg-[var(--color-logo-yellow)]/40 font-semibold"
                      : idx % 2 === 0
                        ? "bg-[var(--color-paper)]/50"
                        : ""
                  }`}
                >
                  <td
                    className={`py-2 px-3 text-ink-soft ${
                      isHighlight ? "text-[var(--color-olive)]" : ""
                    }`}
                  >
                    {item.label}
                  </td>
                  <td
                    className={`py-2 px-3 text-right ${
                      isHighlight
                        ? "text-[var(--color-olive)]"
                        : "text-[var(--color-logo-dark-green)]"
                    }`}
                  >
                    {item.value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ModelIncomeSection = ({ isNurse }: ModelIncomeSectionProps) => {
  const modelIncomeData = isNurse ? nurseModelIncome : therapistModelIncome;
  const title = isNurse ? "看護師のモデル年収" : "リハビリ職のモデル年収";

  return (
    <div className="bg-white/90 rounded-2xl p-5 md:p-6 border border-white shadow-sm">
      <h4 className="heading-mincho text-lg text-[var(--color-olive)] mb-4">
        {title}
      </h4>
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {modelIncomeData.map((model) => (
          <ModelIncomeCard key={model.label} model={model} />
        ))}
      </div>
      <p className="text-ink-soft text-xs mt-4">
        ※上記は一例です。経験・スキル・役職により異なります。
      </p>
    </div>
  );
};

export default ModelIncomeSection;
