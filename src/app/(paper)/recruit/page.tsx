"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import Image from "next/image";
import { CountUp } from "@/components/CountUp";
import { JobDetails } from "@/components/recruit/JobDetails";
import RecruitTeam from "@/components/recruit/RecruitTeam";
import RecruitFAQ from "@/components/recruit/RecruitFAQ";
import RecruitContact from "@/components/recruit/RecruitContact";
import {
  signOnBonus,
  jobPositions,
  companyPhilosophy,
  applicationMessage,
} from "@/lib/recruit-data";
import { recruitFAQs } from "@/lib/faq-data";
import { staffMembers, serviceAreas } from "@/lib/data";
import { regionalData } from "@/lib/regional-data";
import { Sparkles, Clock, Heart, LucideIcon } from "lucide-react";
import CityAreaCard from "@/components/station/CityAreaCard";

const featureIconMap: LucideIcon[] = [Sparkles, Clock, Heart];

const jobTabs = [
  { id: "nurse", label: "看護師", shortLabel: "看護師" },
  { id: "therapist", label: "理学療法士・作業療法士・言語聴覚士", shortLabel: "PT・OT・ST" },
];
export default function RecruitPage() {
  const [selectedJobId, setSelectedJobId] = useState<string>("nurse");
  const currentJob = jobPositions.find((job) => job.id === selectedJobId) || jobPositions[0];
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const isNurse = selectedJobId === "nurse";
  const holidayLabel = isNurse ? "139日以上" : "120日以上";
  const holidayNote = isNurse ? "看護師" : "PT・OT・ST";

  return (
    <div className="min-h-screen">
      <header className="bg-[var(--color-paper)] border-b border-[var(--color-sand)] sticky top-14 lg:top-20 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary font-bold text-sm md:text-lg hover:opacity-80 transition-opacity"
          >
            ← 戻る
          </Link>
          <span className="text-xs tracking-[0.2em] text-[var(--color-ink-soft)]">RECRUIT</span>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-32 md:pb-24 flex flex-col gap-16 md:gap-24">
        <section className="order-1 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <h1 className="sr-only">船橋市の訪問看護師・PT・OT・ST求人｜フラクタル訪問看護</h1>
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">RECRUIT</p>
            <h1 className="heading-mincho text-3xl md:text-5xl text-[var(--color-olive)]">
              フラクタルだから、できる。
              <span className="sr-only">｜船橋市の訪問看護師・PT・OT・ST求人</span>
            </h1>
            <p className="text-ink-soft text-base md:text-lg leading-relaxed">
              船橋市、八千代市、習志野市、千葉市花見川区で看護師・理学療法士・作業療法士・言語聴覚士を募集しています。
              入社祝い金最大30万円、年休139日以上（PT・OT・STは120日以上）。未経験・ブランクのある方も歓迎です。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-[var(--color-olive)] text-white text-sm md:text-base font-semibold hover:opacity-90 transition"
              >
                応募する
              </button>
              <Link
                href="#positions"
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-[var(--color-olive)] text-[var(--color-olive)] text-sm md:text-base font-semibold hover:bg-[var(--color-olive)]/10 transition"
              >
                募集職種を見る
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 pt-3">
              <span className="px-3 py-1 rounded-full bg-white/90 text-[var(--color-olive)] text-xs font-semibold">
                祝金 最大30万円
              </span>
              <span className="px-3 py-1 rounded-full bg-[var(--color-olive)] text-white text-xs font-semibold">
                年休139日以上（PT・OT・STは120日以上）
              </span>
            </div>
          </FadeIn>
          <FadeIn className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/recruit/photos/hero.webp"
              alt="フラクタル訪問看護 船橋の訪問看護師が利用者宅でケアを行う様子"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </FadeIn>
        </section>

        <section className="order-2 bg-white/80 rounded-3xl p-4 md:p-6 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">KEY BENEFITS</p>
            <div className="mt-4 flex md:grid md:grid-cols-3 gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2">
              <div className="min-w-[200px] md:min-w-0 snap-center bg-white rounded-2xl border border-[var(--color-sand)] p-4 shadow-sm">
                <p className="text-xs text-ink-soft">祝金30万円支給</p>
                <p className="heading-mincho text-lg text-[var(--color-olive)] mt-1">最大30万円</p>
                <p className="text-xs text-ink-soft mt-1">全職種対象</p>
              </div>
              <div className="min-w-[200px] md:min-w-0 snap-center bg-[var(--color-olive)] text-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs">年間休日</p>
                <p className="heading-mincho text-lg mt-1">139日以上</p>
                <p className="text-xs mt-1">年休139日以上（PT・OT・STは120日以上）</p>
              </div>
              <div className="min-w-[200px] md:min-w-0 snap-center bg-white rounded-2xl border border-[var(--color-sand)] p-4 shadow-sm">
                <p className="text-xs text-ink-soft">年間休日</p>
                <p className="heading-mincho text-lg text-[var(--color-olive)] mt-1">120日以上</p>
                <p className="text-xs text-ink-soft mt-1">PT・OT・ST</p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="order-3 bg-[var(--color-paper)] rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
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
                  src="/images/recruit/photos/bonus.webp"
                  alt="船橋市・八千代市エリアで活躍するフラクタル訪問看護スタッフの訪問現場"
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

        <section className="order-4 grid lg:grid-cols-[0.9fr,1.1fr] gap-10 items-center">
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">WORK STYLE</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)]">
              働きやすさの工夫
            </h3>
            <p className="text-ink-soft">
              現場の声を拾い、仕組みとITで負担を減らす。だから「訪問看護は大変」というイメージが変わります。
            </p>
            <ul className="space-y-2 text-ink-soft">
              {currentJob.features.slice(0, 3).map((feature, index) => {
                const Icon = featureIconMap[index % featureIconMap.length];
                return (
                  <li key={feature.title} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-[var(--color-olive)] mt-0.5 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-[var(--color-olive)]">
                        {feature.title}
                      </span>
                      <br />
                      {feature.description}
                    </span>
                  </li>
                );
              })}
            </ul>
          </FadeIn>
          <div className="space-y-4">
            <FadeIn className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg bg-white">
              <Image
                src="/images/recruit/photos/work.webp"
                alt="フラクタル訪問看護 船橋の訪問看護師・理学療法士が働く職場環境"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </FadeIn>
            <FadeIn className="bg-white/80 rounded-2xl p-4 border border-white shadow-sm">
              <p className="text-xs tracking-[0.3em] text-ink-soft">SHIFT EXAMPLE</p>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mt-3">
                <Image
                  src="/images/recruit/shift-example.webp"
                  alt="実際のシフト例"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain bg-white"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="order-5 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">ONE DAY</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              1日の流れ
            </h3>
            <p className="text-ink-soft mt-2">
              フラクタルの1日は、ファンタスティック・ジョニー（愛称：ジョニ）が案内。
              音声入力AIで記録までスムーズです。
            </p>
            <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-6 mt-6 items-center">
              <div className="bg-[var(--color-paper)] rounded-3xl p-5 border border-white shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white">
                    <Image
                      src="/images/recruit/johnny.png"
                      alt="ファンタスティック・ジョニー"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.3em] text-ink-soft">FRACTAL FAIRY</p>
                    <p className="heading-mincho text-lg text-[var(--color-olive)]">
                      ファンタスティック・ジョニー
                    </p>
                    <p className="text-xs text-ink-soft mt-1">愛称：ジョニ</p>
                  </div>
                </div>
                <p className="text-sm text-ink-soft mt-3">
                  物知りで親切、何でも教えてくれるフラクタルの妖精です。
                </p>
                <Link
                  href="/recruit/day-flow"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-olive)] mt-4"
                >
                  1日の流れを詳しく見る →
                </Link>
              </div>
              <div className="grid gap-3">
                <div className="bg-white/80 rounded-2xl border border-white px-4 py-3 text-sm text-ink-soft">
                  営業時間は9:00〜19:00、1日6〜7件の訪問が目安です。
                </div>
                <div className="bg-white/80 rounded-2xl border border-white px-4 py-3 text-sm text-ink-soft">
                  記録は移動中の音声入力 → AIが文章化。帰ってまとめて記録しません。
                </div>
                <div className="bg-white/80 rounded-2xl border border-white px-4 py-3 text-sm text-ink-soft">
                  朝礼なし・直行直帰OK。申し送りを確認すれば翌日もスムーズです。
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <FadeIn className="order-7 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <RecruitTeam staffMembers={staffMembers} onModalChange={setIsTeamModalOpen} />
        </FadeIn>

        <section className="order-9 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">SERVICE AREA</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              訪問エリア
            </h3>
            <p className="text-ink-soft mt-2">
              船橋市・八千代市・習志野市・千葉市花見川区を中心に訪問しています。
            </p>
          </FadeIn>

          {/* エリアマップ */}
          <FadeIn className="mt-6">
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[3/2]">
              <Image
                src="/images/service-area/area-map-new.png"
                alt="フラクタル訪問看護 船橋 訪問エリアマップ - 船橋市・八千代市・習志野市"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </FadeIn>

          {/* 訪問可能エリア */}
          <FadeIn className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {serviceAreas.priority.cities.map((city) => {
                const areaData = regionalData.find((r) => r.name === city.name);
                return (
                  <CityAreaCard
                    key={city.name}
                    city={city}
                    areaData={areaData}
                    showColorBar={false}
                  />
                );
              })}
            </div>
          </FadeIn>
        </section>

        <section className="order-10 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
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

        <section id="positions" className="order-6 space-y-6">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">POSITIONS</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              募集職種
            </h3>
            <p className="text-ink-soft mt-2">
              看護師・理学療法士・作業療法士・言語聴覚士を募集しています。
            </p>
          </FadeIn>

          {/* 職種タブ */}
          <FadeIn>
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
              {jobTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedJobId(tab.id)}
                  className={`flex-shrink-0 snap-center px-5 py-3 rounded-full font-semibold text-sm md:text-base transition-all ${
                    selectedJobId === tab.id
                      ? "bg-[var(--color-olive)] text-white shadow-md"
                      : "bg-white/80 text-[var(--color-olive)] border border-[var(--color-sand)] hover:bg-white"
                  }`}
                >
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* 選択した職種の詳細 */}
          <FadeIn>
            <div className="bg-white/80 rounded-3xl p-4 md:p-6 shadow-sm border border-white/80">
              <p className="text-xs tracking-[0.3em] text-ink-soft">KEY BENEFITS</p>
              <div className="mt-4 flex md:grid md:grid-cols-3 gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2">
                <div className="min-w-[200px] md:min-w-0 snap-center bg-white rounded-2xl border border-[var(--color-sand)] p-4 shadow-sm">
                  <p className="text-xs text-ink-soft">祝金30万円支給</p>
                  <p className="heading-mincho text-lg text-[var(--color-olive)] mt-1">最大30万円</p>
                  <p className="text-xs text-ink-soft mt-1">全職種対象</p>
                </div>
                <div className="min-w-[200px] md:min-w-0 snap-center bg-[var(--color-olive)] text-white rounded-2xl p-4 shadow-sm">
                  <p className="text-xs">年間休日</p>
                  <p className="heading-mincho text-lg mt-1">{holidayLabel}</p>
                  <p className="text-xs mt-1">{holidayNote}</p>
                </div>
                <div className="min-w-[200px] md:min-w-0 snap-center bg-white rounded-2xl border border-[var(--color-sand)] p-4 shadow-sm">
                  <p className="text-xs text-ink-soft">応募から内定まで</p>
                  <p className="heading-mincho text-lg text-[var(--color-olive)] mt-1">1〜2週間</p>
                  <p className="text-xs text-ink-soft mt-1">最短</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 職種詳細 */}
          <FadeIn>
            <JobDetails job={currentJob} />
          </FadeIn>
        </section>

        <section id="process" className="order-8 bg-[var(--color-paper)] rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
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

        <RecruitFAQ faqs={recruitFAQs} className="order-11" />

      </main>

      <RecruitContact
        isOpen={isContactOpen}
        onOpenChange={setIsContactOpen}
        hideButton={isTeamModalOpen}
      />
    </div>
  );
}
