"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  nurseModelIncome,
  therapistModelIncome,
  type ModelIncome,
} from "@/lib/recruit-data";

interface ModelIncomeSectionProps {
  isNurse: boolean;
}

const ModelIncomeCard = ({
  model,
  isOpen,
  onToggle,
}: {
  model: ModelIncome;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="bg-[var(--color-paper)] rounded-xl p-4 border border-white">
      {/* 役職と年収 */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-soft">{model.label}</span>
          <span className="heading-mincho text-xl text-[var(--color-olive)]">
            {model.annual}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[var(--color-olive)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 内訳（折りたたみ） */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 mt-3" : "max-h-0"
        }`}
      >
        <div className="pt-3 border-t border-[var(--color-sand)]">
          <p className="text-xs text-ink-soft mb-2">{model.monthly}</p>
          <div className="space-y-1">
            {model.breakdown
              .filter(
                (item) => item.label !== "月収合計" && item.label !== "年収"
              )
              .map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-xs text-ink-soft"
                >
                  <span>{item.label}</span>
                  <span className="text-[var(--color-olive)]">{item.value}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModelIncomeSection = ({ isNurse }: ModelIncomeSectionProps) => {
  const modelIncomeData = isNurse ? nurseModelIncome : therapistModelIncome;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 年収レンジを計算
  const annuals = modelIncomeData.map((m) =>
    parseInt(m.annual.replace(/[^0-9]/g, ""))
  );
  const minAnnual = Math.min(...annuals);
  const maxAnnual = Math.max(...annuals);
  const rangeText =
    minAnnual === maxAnnual
      ? `${minAnnual}万円`
      : `${minAnnual}万円〜${maxAnnual}万円`;

  const toggleCard = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white/90 rounded-2xl p-5 md:p-6 border border-white shadow-sm">
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h4 className="heading-mincho text-lg text-[var(--color-olive)]">
          モデル年収
        </h4>
        <span className="text-sm text-[var(--color-olive)] font-semibold">
          {rangeText}
        </span>
      </div>

      <div className="grid gap-3">
        {modelIncomeData.map((model, index) => (
          <ModelIncomeCard
            key={model.label}
            model={model}
            isOpen={openIndex === index}
            onToggle={() => toggleCard(index)}
          />
        ))}
      </div>

      <p className="text-ink-soft text-xs mt-4">
        ※経験・スキル・役職により異なります。詳細は内訳をタップしてご確認ください。
      </p>
    </div>
  );
};

export default ModelIncomeSection;
