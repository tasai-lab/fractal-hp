"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Contact from "@/components/Contact";
import { CountUp } from "@/components/CountUp";
import { JobDetails } from "@/components/recruit/JobDetails";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  signOnBonus,
  jobPositions,
  visitAreas,
  companyPhilosophy,
  applicationMessage,
} from "@/lib/recruit-data";
import { recruitFAQs } from "@/lib/faq-data";
import { staffMembers } from "@/lib/data";
import { recruitAreas } from "@/lib/recruit-areas";

const roleOverrides: Record<string, string> = {
  "古谷 一真": "管理者",
  "浅井 拓哉": "看護師",
  "髙山 里美": "看護師",
  "祝迫 萌々": "営業兼事務職",
};

const teamOrder = ["古谷 一真", "浅井 拓哉", "髙山 里美", "祝迫 萌々"];

const teamProfiles = teamOrder
  .map((name) => staffMembers.find((staff) => staff.name === name))
  .filter((staff): staff is NonNullable<typeof staffMembers>[number] => Boolean(staff))
  .map((staff) => ({
    ...staff,
    role: roleOverrides[staff.name] ?? staff.role,
  }));

const visibleJobs = jobPositions.filter((job) =>
  ["nurse", "therapist"].includes(job.id)
);

const featureIcons = [
  "/images/recruit/icons/1.png",
  "/images/recruit/icons/2.png",
  "/images/recruit/icons/3.png",
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function RecruitPage() {
  const currentJob = jobPositions.find((job) => job.id === "nurse") || jobPositions[0];
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<(typeof teamProfiles)[number] | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  useEffect(() => {
    if (selectedTeam || isContactOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedTeam, isContactOpen]);

  const openContact = () => {
    setSelectedTeam(null);
    setIsContactOpen(true);
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

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-32 md:pb-24 flex flex-col gap-16 md:gap-24">
        <section className="order-1 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">RECRUIT</p>
            <h2 className="heading-mincho text-3xl md:text-5xl text-[var(--color-olive)]">
              フラクタルだから、できる。
            </h2>
            <p className="text-ink-soft text-base md:text-lg leading-relaxed">
              船橋市、八千代市、習志野市、千葉市花見川区で看護師・理学療法士・作業療法士・言語聴覚士を募集しています。
              入社祝い金最大30万円、年休139日以上（PT・OT・STは120日以上）。未経験・ブランクのある方も歓迎です。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={openContact}
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
              alt="フラクタル訪問看護の現場"
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
                src="/images/recruit/photos/work.webp"
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

        <section className="order-7 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">TEAM</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              一緒に働く仲間
            </h3>
            <p className="text-ink-soft mt-2">
              互いに支え合いながら、成長を喜べるチームです。
            </p>
          </FadeIn>
          <FadeIn className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-lg bg-white mt-6">
            <Image
              src="/images/recruit/labels/team-title.webp"
              alt="一緒に働く仲間"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain bg-white"
            />
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {teamProfiles.map((member) => (
              <FadeIn key={member.name} className="transition-transform duration-300">
                <button
                  type="button"
                  onClick={() => setSelectedTeam(member)}
                  className="w-full bg-[var(--color-paper)] rounded-2xl p-3 md:p-5 text-center border border-white transition-all duration-300 hover:shadow-md active:scale-[0.98]"
                >
                  <div className="relative w-20 h-20 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto rounded-2xl overflow-hidden mb-2 md:mb-3">
                    <Image
                      src={member.image}
                      alt={`${member.name}の写真`}
                      fill
                      sizes="(max-width: 640px) 80px, (max-width: 1024px) 128px, 144px"
                      className="object-cover"
                    />
                  </div>
                  <p className="heading-mincho text-base md:text-lg text-[var(--color-olive)]">
                    {member.name}
                  </p>
                  <p className="text-[11px] md:text-sm text-ink-soft">{member.role}</p>
                  <p className="text-[10px] text-ink-soft/70 mt-1">タップで自己紹介</p>
                </button>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="order-9 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {recruitAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="bg-white/80 rounded-2xl border border-white px-4 py-3 text-sm hover:shadow-md transition group"
                >
                  <p className="text-[var(--color-olive)] font-semibold group-hover:text-[var(--color-logo-dark-green)]">
                    {area.name}の地域情報
                  </p>
                  <p className="text-xs text-ink-soft mt-1">{area.shortCopy}</p>
                  <p className="text-xs text-[var(--color-olive)] mt-2 group-hover:underline">
                    詳しく見る →
                  </p>
                </Link>
              ))}
            </div>
          </FadeIn>
          <FadeIn className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-white">
            <Image
              src="/images/service-area/area-map.webp"
              alt="訪問エリアマップ"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain"
            />
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
              看護師・理学療法士・作業療法士・言語聴覚士を同じボリュームで掲載しています。
            </p>
          </FadeIn>
          <FadeIn className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-lg bg-[var(--color-paper)]">
            <Image
              src="/images/recruit/labels/positions-title.webp"
              alt="募集職種"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain bg-[var(--color-paper)]"
            />
          </FadeIn>
          <div className="space-y-8">
            {visibleJobs.map((job) => (
              <FadeIn key={job.id}>
                <JobDetails job={job} />
              </FadeIn>
            ))}
          </div>
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

        <section id="faq" className="order-11 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
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

      </main>

      <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-8 z-40">
        <button
          type="button"
          onClick={openContact}
          className="px-6 py-3 rounded-full bg-[var(--color-olive)] text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          応募する
        </button>
      </div>

      {isContactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--color-paper)] rounded-3xl shadow-xl border border-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative px-6 py-8 md:px-8 md:py-10">
              <button
                type="button"
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center"
                aria-label="閉じる"
              >
                <span className="text-lg text-ink-soft">×</span>
              </button>
              <div className="space-y-6">
                <div>
                  <p className="text-xs tracking-[0.3em] text-ink-soft">CONTACT</p>
                  <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
                    お問い合わせ
                  </h3>
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-white">
                  <Image
                    src="/images/recruit/labels/contact-photo.webp"
                    alt="募集お問い合わせ"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="text-ink-soft">
                  <p className="leading-relaxed">{applicationMessage.main}</p>
                  <p className="text-sm mt-2">{applicationMessage.visit}</p>
                </div>
                <div className="bg-white/80 rounded-2xl border border-white p-4">
                  <Contact initialContactType="求人・採用について" embedded={true} hideTitle={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTeam && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="w-full max-w-md bg-[var(--color-paper)] rounded-3xl shadow-xl border border-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative rounded-t-3xl bg-white/80 px-6 py-8 text-center">
              <button
                type="button"
                onClick={() => setSelectedTeam(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center"
                aria-label="閉じる"
              >
                <span className="text-lg text-ink-soft">×</span>
              </button>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden mx-auto mb-4">
                <Image
                  src={selectedTeam.image}
                  alt={`${selectedTeam.name}の写真`}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs tracking-[0.2em] text-ink-soft">STAFF</p>
              <h3 className="heading-mincho text-2xl text-[var(--color-olive)] mt-2">
                {selectedTeam.name}
              </h3>
              <p className="text-sm text-ink-soft mt-1">{selectedTeam.nameReading}</p>
              <p className="text-sm text-[var(--color-olive)] mt-2">{selectedTeam.role}</p>
            </div>

            <div className="px-6 pb-6">
              <div className="grid gap-3 mt-4">
                <div className="bg-white rounded-2xl border border-white p-3 text-sm text-ink-soft">
                  <span className="font-semibold text-[var(--color-olive)]">出身地：</span>
                  {selectedTeam.birthplace}
                </div>
                <div className="bg-white rounded-2xl border border-white p-3 text-sm text-ink-soft">
                  <span className="font-semibold text-[var(--color-olive)]">趣味：</span>
                  {selectedTeam.hobbies}
                </div>
              </div>
              <div className="mt-4 bg-white rounded-2xl border border-white p-4">
                <p className="text-sm font-semibold text-[var(--color-olive)] mb-2">自己紹介</p>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {selectedTeam.introduction}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
