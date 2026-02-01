import type { ReactNode } from "react";
import { BadgeCheck, CheckCircle2 } from "lucide-react";
import {
  jobDuties,
  therapistDuties,
  visitAreas,
  onCallInfo,
  therapistModelIncome,
  type JobPosition,
} from "@/lib/recruit-data";

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
  const isNurse = job.id === "nurse";
  const duties = isNurse ? jobDuties : therapistDuties;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
      <div className="flex flex-wrap gap-2">
        {job.highlights.map((highlight) => (
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
      <h4 className="heading-mincho text-3xl md:text-4xl text-[var(--color-olive)] mt-4">
        {job.title}募集
      </h4>
      <p className="text-ink-soft mt-2">{job.subtitle}</p>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
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

          {!isNurse && (
            <InfoCard title="モデル年収">
              <div className="grid gap-4">
                {therapistModelIncome.map((model) => (
                  <div key={model.label} className="bg-[var(--color-paper)] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-bold text-[var(--color-olive)]">{model.label}</p>
                      <p className="heading-mincho text-lg text-[var(--color-olive)]">
                        {model.annual}
                      </p>
                    </div>
                    <div className="space-y-1 text-sm">
                      {model.breakdown.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between ${
                            item.label === "月収合計" || item.label === "年収"
                              ? "border-t border-[var(--color-olive)]/20 pt-1 mt-2 font-semibold"
                              : ""
                          }`}
                        >
                          <span className="text-ink-soft">{item.label}</span>
                          <span className="text-[var(--color-olive)]">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </InfoCard>
          )}

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
  );
};
