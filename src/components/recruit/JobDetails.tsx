"use client";

import { useState, type ReactNode } from "react";
import { BadgeCheck, CheckCircle2 } from "lucide-react";
import {
  jobDuties,
  therapistDuties,
  visitAreas,
  onCallInfo,
  type JobPosition,
} from "@/lib/recruit-data";
import { ModelIncomeSection } from "./ModelIncomeSection";

const InfoCard = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/90 rounded-2xl p-5 md:p-6 border border-white shadow-sm ${className}`}
  >
    <h4 className="heading-mincho text-lg text-[var(--color-olive)] mb-3">
      {title}
    </h4>
    {children}
  </div>
);

export const JobDetails = ({ job }: { job: JobPosition }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isNurse = job.id === "nurse";
  const duties = isNurse ? jobDuties : therapistDuties;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-white/80 overflow-hidden">
      {/* ヘッダー（クリックで開閉） */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 md:p-8 text-left flex items-center justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {job.highlights.slice(0, 3).map((highlight) => (
              <span
                key={highlight}
                className={`px-3 py-1 rounded-full text-xs ${
                  highlight.includes("139")
                    ? "bg-[var(--color-olive)] text-white font-semibold"
                    : "bg-[var(--color-paper)] text-[var(--color-olive)]"
                }`}
              >
                {highlight}
              </span>
            ))}
          </div>
          <h4 className="heading-mincho text-2xl md:text-3xl text-[var(--color-olive)]">
            {job.title}募集
          </h4>
          <p className="text-ink-soft mt-1 text-sm md:text-base">{job.subtitle}</p>
        </div>
        <span
          className={`flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-paper)] flex items-center justify-center text-[var(--color-olive)] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* コンテンツ（開閉式） */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <InfoCard title={isNurse ? "看護師の仕事内容" : "訪問リハビリスタッフの仕事内容"}>
                <p className="text-ink-soft mb-3">{job.description}</p>
                <ul className="space-y-2 text-ink-soft text-sm md:text-base">
                  {duties.map((duty) => (
                    <li key={duty} className="flex items-start gap-2">
                      <span className="text-[var(--color-olive)]">●</span>
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard title="訪問エリア">
                <div className="flex flex-wrap gap-2">
                  {visitAreas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 rounded-full bg-[var(--color-paper)] text-sm text-[var(--color-olive)]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </InfoCard>

              {isNurse && (
                <InfoCard title="オンコールについて">
                  <p className="text-ink-soft">
                    月{onCallInfo.frequency.replace("月", "").replace("程度", "")}程度
                  </p>
                  <p className="text-ink-soft text-sm mt-2">{onCallInfo.note}</p>
                </InfoCard>
              )}
            </div>

            <div className="space-y-6">
              <InfoCard title="給与">
                <p className="text-ink-soft font-semibold">{job.details.salary.type}</p>
                <p className="heading-mincho text-xl text-[var(--color-olive)] mt-1">
                  {job.details.salary.amount}
                </p>
                <ul className="space-y-2 text-ink-soft text-sm mt-3">
                  {job.details.salary.breakdown.map((item) => (
                    <li key={item.label} className="flex items-start gap-2">
                      <span className="text-[var(--color-olive)]">●</span>
                      <span>
                        {item.label}：{item.value}
                      </span>
                    </li>
                  ))}
                </ul>
                {job.details.salary.note && (
                  <p className="text-ink-soft text-xs mt-3">{job.details.salary.note}</p>
                )}
              </InfoCard>

              <ModelIncomeSection isNurse={isNurse} />

              <InfoCard title="勤務時間・休日">
                <p className="text-ink-soft">{job.details.workHours}</p>
                <div className="mt-3">
                  <p className="text-xs text-ink-soft">年間休日</p>
                  <p className="heading-mincho text-xl text-[var(--color-olive)]">
                    {job.details.holidays.annual}
                  </p>
                  <p className="text-xs font-semibold text-[var(--color-olive)]">
                    {isNurse ? "年休139日以上" : "PT・OT・STは120日以上"}
                  </p>
                  {job.details.holidays.monthly && (
                    <p className="text-xs text-ink-soft">
                      月の公休：{job.details.holidays.monthly}日
                    </p>
                  )}
                </div>
                <ul className="space-y-2 text-ink-soft text-sm mt-3">
                  {job.details.holidays.notes.map((note) => (
                    <li key={note} className="flex items-start gap-2">
                      <span className="text-[var(--color-olive)]">★</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard title="待遇・福利厚生">
                <ul className="grid gap-2 text-ink-soft text-sm md:text-base">
                  {job.details.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-olive)] mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard title="応募要件">
                <ul className="grid gap-2 text-ink-soft text-sm md:text-base">
                  {job.details.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <BadgeCheck className="w-5 h-5 text-[var(--color-olive)] mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
