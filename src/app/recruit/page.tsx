"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Contact from "@/components/Contact";
import { CountUp } from "@/components/CountUp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  signOnBonus,
  jobPositions,
  jobDuties,
  visitAreas,
  onCallInfo,
  companyPhilosophy,
  applicationMessage,
  therapistDuties,
  therapistModelIncome,
} from "@/lib/recruit-data";
import { recruitFAQs } from "@/lib/faq-data";

const tabs = jobPositions
  .filter((job) => !job.hidden)
  .map((job) => ({
    id: job.id,
    label: job.id === "nurse" ? "看護師" : "理学/作業/言語",
  }));

const teamMembers = [
  { name: "古谷", role: "管理者", image: "/images/staff/furuya.png" },
  { name: "浅井", role: "看護師", image: "/images/staff/asai.png" },
  { name: "髙山", role: "看護師", image: "/images/staff/takayama.png" },
  { name: "祝迫", role: "営業兼事務職", image: "/images/staff/iwaizako.png" },
];

const featureIcons = [
  "/images/recruit/icons/1.png",
  "/images/recruit/icons/2.png",
  "/images/recruit/icons/3.png",
];

const listIcons = [
  "/images/recruit/icons/4.png",
  "/images/recruit/icons/5.png",
  "/images/recruit/icons/6.png",
];

const FadeIn = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
};

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

export default function RecruitPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "nurse");
  const currentJob = jobPositions.find((job) => job.id === activeTab) || jobPositions[0];
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen body-editorial">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary font-bold text-sm md:text-lg hover:opacity-80 transition-opacity"
          >
            ← 戻る
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-primary heading-mincho">
            採用情報
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16 space-y-16 md:space-y-24">
        <section className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">RECRUIT</p>
            <h2 className="heading-mincho text-3xl md:text-5xl text-[var(--color-olive)]">
              フラクタルだから、できることがある。
            </h2>
            <p className="text-ink-soft text-base md:text-lg leading-relaxed">
              船橋市、八千代市、習志野市、千葉市花見川区で看護師・理学療法士・作業療法士・言語聴覚士を募集しています。
              入社祝い金最大30万円、年間休日120日以上（看護師139日以上）。未経験・ブランクのある方も歓迎です。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#entry"
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-[var(--color-olive)] text-white text-sm md:text-base font-semibold hover:opacity-90 transition"
              >
                応募する
              </Link>
              <Link
                href="#positions"
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-[var(--color-olive)] text-[var(--color-olive)] text-sm md:text-base font-semibold hover:bg-[var(--color-olive)]/10 transition"
              >
                募集職種を見る
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 pt-4">
              <div className="bg-white/80 rounded-2xl p-4 border border-white shadow-sm">
                <p className="text-xs text-ink-soft">入社祝い金</p>
                <p className="heading-mincho text-lg text-[var(--color-olive)]">最大30万円</p>
              </div>
              <div className="bg-white/80 rounded-2xl p-4 border border-white shadow-sm">
                <p className="text-xs text-ink-soft">年間休日</p>
                <p className="heading-mincho text-lg text-[var(--color-olive)]">
                  120日以上
                </p>
                <p className="text-xs text-ink-soft">看護師は139日以上</p>
              </div>
              <div className="bg-white/80 rounded-2xl p-4 border border-white shadow-sm">
                <p className="text-xs text-ink-soft">働き方</p>
                <p className="heading-mincho text-lg text-[var(--color-olive)]">未経験歓迎</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/recruit/photos/hero.jpg"
              alt="フラクタル訪問看護の現場"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </FadeIn>
        </section>

        <section className="bg-[var(--color-paper)] rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
              <div>
                <p className="text-xs tracking-[0.3em] text-ink-soft">SIGN-ON BONUS</p>
                <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
                  入社祝い金 最大<CountUp end={30} suffix="万円" />
                </h3>
                <p className="text-ink-soft mt-2">全ての職種に適用されます</p>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  {signOnBonus.milestones.map((milestone) => (
                    <div
                      key={milestone.label}
                      className="bg-white/90 rounded-2xl p-3 text-center border border-white"
                    >
                      <p className="text-xs text-ink-soft">{milestone.label}</p>
                      <p className="heading-mincho text-lg text-[var(--color-olive)]">
                        {(milestone.amount / 10000).toLocaleString()}万円
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/images/recruit/photos/bonus.jpg"
                  alt="現場の様子"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-ink-soft text-sm mt-4">
              ※ 入社祝い金は、本HPからの応募に限り適用されます。
              他の求人媒体から応募された場合、または本HPでの応募前に他の求人媒体から応募されている場合は対象外となります。
            </p>
          </FadeIn>
        </section>

        <section className="grid lg:grid-cols-[0.9fr,1.1fr] gap-10 items-center">
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">WORK STYLE</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)]">
              働きやすさの工夫
            </h3>
            <p className="text-ink-soft">
              現場の声を拾い、仕組みとITで負担を減らす。だから「訪問看護は大変」というイメージが変わります。
            </p>
            <ul className="space-y-2 text-ink-soft">
              {currentJob.features.slice(0, 3).map((feature, index) => (
                <li key={feature.title} className="flex items-start gap-3">
                  <div className="relative w-8 h-8 rounded-full bg-white shadow-sm border border-white">
                    <Image
                      src={featureIcons[index % featureIcons.length]}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-contain p-1"
                    />
                  </div>
                  <span>
                    <span className="font-semibold text-[var(--color-olive)]">
                      {feature.title}
                    </span>
                    <br />
                    {feature.description}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <div className="space-y-4">
            <FadeIn className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg bg-white">
              <Image
                src="/images/recruit/photos/work.jpg"
                alt="働く環境の様子"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </FadeIn>
            <FadeIn className="bg-white/80 rounded-2xl p-4 border border-white shadow-sm">
              <p className="text-xs tracking-[0.3em] text-ink-soft">SHIFT EXAMPLE</p>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mt-3">
                <Image
                  src="/images/recruit/shift-example.png"
                  alt="実際のシフト例"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain bg-white"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">TEAM</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              一緒に働く仲間
            </h3>
            <p className="text-ink-soft mt-2">
              互いに支え合いながら、成長を喜べるチームです。
            </p>
          </FadeIn>
          <FadeIn className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg bg-white mt-6">
            <Image
              src="/images/recruit/photos/team.jpg"
              alt="チームの雰囲気"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
            />
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {teamMembers.map((member) => (
              <FadeIn
                key={member.name}
                className="bg-[var(--color-paper)] rounded-2xl p-4 text-center border border-white"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={member.image}
                    alt={`${member.name}の写真`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <p className="heading-mincho text-lg text-[var(--color-olive)]">
                  {member.name}
                </p>
                <p className="text-xs text-ink-soft">{member.role}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <FadeIn className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-white">
            <Image
              src="/images/service-area/area-map.png"
              alt="訪問エリアマップ"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain"
            />
          </FadeIn>
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">SERVICE AREA</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)]">
              訪問エリア
            </h3>
            <p className="text-ink-soft">
              船橋市・八千代市・習志野市・千葉市花見川区を中心に訪問しています。
            </p>
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
          </FadeIn>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">PHILOSOPHY</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              {companyPhilosophy.title}
            </h3>
            <p className="text-ink-soft mt-4 whitespace-pre-line">
              {companyPhilosophy.content}
            </p>
          </FadeIn>
        </section>

        <section id="positions" className="space-y-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">POSITIONS</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              募集職種
            </h3>
            <p className="text-ink-soft mt-2">
              看護師・理学療法士・作業療法士・言語聴覚士を募集中です。
            </p>
          </FadeIn>
          <FadeIn className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg bg-white">
            <Image
              src="/images/recruit/photos/positions.jpg"
              alt="現場の様子"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
            />
          </FadeIn>

          <div className="flex bg-white/80 rounded-full p-1 border border-white shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-[var(--color-olive)] text-white"
                    : "text-[var(--color-olive)] hover:bg-[var(--color-paper)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
            <div className="flex flex-wrap gap-2">
              {currentJob.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="px-3 py-1 rounded-full bg-[var(--color-paper)] text-xs text-[var(--color-olive)]"
                >
                  {highlight}
                </span>
              ))}
            </div>
            <h4 className="heading-mincho text-2xl text-[var(--color-olive)] mt-4">
              {currentJob.title}募集
            </h4>
            <p className="text-ink-soft mt-2">{currentJob.subtitle}</p>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              <div className="space-y-6">
                <InfoCard title={activeTab === "nurse" ? "看護師の仕事内容" : "訪問リハビリスタッフの仕事内容"}>
                  <p className="text-ink-soft mb-3">{currentJob.description}</p>
                  <ul className="space-y-2 text-ink-soft text-sm md:text-base">
                    {(activeTab === "nurse" ? jobDuties : therapistDuties).map((duty) => (
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

                {activeTab === "nurse" && (
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
                  <p className="text-xs text-ink-soft">【{currentJob.details.salary.type}】</p>
                  <p className="heading-mincho text-xl md:text-2xl text-[var(--color-olive)] mt-1">
                    {currentJob.details.salary.amount}
                  </p>
                  <ul className="space-y-2 text-ink-soft text-sm md:text-base mt-4">
                    {currentJob.details.salary.breakdown.map((item) => (
                      <li key={item.label} className="flex flex-col md:flex-row md:justify-between">
                        <span>{item.label}</span>
                        <span className="font-medium text-[var(--color-olive)]">
                          {item.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {currentJob.details.salary.note && (
                    <p className="text-xs text-ink-soft mt-3">
                      {currentJob.details.salary.note}
                    </p>
                  )}
                </InfoCard>

                {activeTab === "therapist" && (
                  <InfoCard title="モデル年収">
                    <div className="grid gap-3">
                      {therapistModelIncome.map((model) => (
                        <div
                          key={model.label}
                          className="bg-[var(--color-paper)] rounded-xl p-3"
                        >
                          <p className="text-xs text-ink-soft">{model.label}</p>
                          <p className="text-ink-soft text-sm mt-1">{model.calculation}</p>
                          <p className="heading-mincho text-[var(--color-olive)] mt-2">
                            {model.monthly}
                          </p>
                          <p className="text-sm text-[var(--color-olive)]">{model.annual}</p>
                        </div>
                      ))}
                    </div>
                  </InfoCard>
                )}

                <InfoCard title="勤務時間・休日">
                  <p className="text-ink-soft">{currentJob.details.workHours}</p>
                  <div className="mt-3">
                    <p className="text-xs text-ink-soft">年間休日</p>
                    <p className="heading-mincho text-xl text-[var(--color-olive)]">
                      {currentJob.details.holidays.annual}
                    </p>
                    {currentJob.details.holidays.monthly && (
                      <p className="text-xs text-ink-soft">
                        月の公休：{currentJob.details.holidays.monthly}日
                      </p>
                    )}
                  </div>
                  <ul className="space-y-2 text-ink-soft text-sm mt-3">
                    {currentJob.details.holidays.notes.map((note) => (
                      <li key={note} className="flex items-start gap-2">
                        <span className="text-[var(--color-olive)]">★</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </InfoCard>

                <InfoCard title="待遇・福利厚生">
                  <ul className="grid gap-2 text-ink-soft text-sm md:text-base">
                    {currentJob.details.benefits.map((benefit, index) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <div className="relative w-6 h-6 rounded-full bg-[var(--color-paper)] border border-white shadow-sm">
                          <Image
                            src={listIcons[index % listIcons.length]}
                            alt=""
                            fill
                            sizes="24px"
                            className="object-contain p-1"
                          />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </InfoCard>

                <InfoCard title="応募要件">
                  <ul className="grid gap-2 text-ink-soft text-sm md:text-base">
                    {currentJob.details.requirements.map((req, index) => (
                      <li key={req} className="flex items-start gap-3">
                        <div className="relative w-6 h-6 rounded-full bg-[var(--color-paper)] border border-white shadow-sm">
                          <Image
                            src={listIcons[(index + 2) % listIcons.length]}
                            alt=""
                            fill
                            sizes="24px"
                            className="object-contain p-1"
                          />
                        </div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="bg-[var(--color-paper)] rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">PROCESS</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              選考プロセス
            </h3>
            <p className="text-ink-soft mt-2">{applicationMessage.timeline}</p>
            <div className="space-y-6 mt-6">
              {currentJob.selectionProcess.map((step, index) => (
                <div key={step.step} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-[var(--color-olive)]"></div>
                  {index < currentJob.selectionProcess.length - 1 && (
                    <div className="absolute left-[5px] top-5 bottom-0 w-px bg-[var(--color-sand)]"></div>
                  )}
                  <h4 className="heading-mincho text-lg text-[var(--color-olive)]">
                    {step.step}
                  </h4>
                  <p className="text-ink-soft text-sm md:text-base mt-1">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="faq" className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">FAQ</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              よくある質問
            </h3>
            <div className="space-y-3 mt-6">
              {recruitFAQs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="border border-[var(--color-sand)] rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 md:px-6 py-4 text-left bg-white/70 hover:bg-white transition-colors flex items-center justify-between gap-3"
                  >
                    <span className="font-medium text-[var(--color-olive)]">
                      {faq.question}
                    </span>
                    <span
                      className={`text-[var(--color-olive)] transition-transform duration-300 flex-shrink-0 ${
                        openFAQIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFAQIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-4 md:px-6 py-4 bg-white">
                      <p className="text-ink-soft text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="entry" className="bg-[var(--color-paper)] rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-start">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] text-ink-soft">CONTACT</p>
              <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
                お問い合わせ
              </h3>
              <div className="text-ink-soft mt-4">
                <p className="leading-relaxed">{applicationMessage.main}</p>
                <p className="text-sm mt-2">{applicationMessage.visit}</p>
              </div>
              <div className="mt-6">
                <Contact initialContactType="求人・採用について" embedded={true} hideTitle={true} />
              </div>
            </FadeIn>
            <FadeIn className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-white">
              <Image
                src="/images/recruit/photos/cta.jpg"
                alt="フラクタルで働く"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
}
