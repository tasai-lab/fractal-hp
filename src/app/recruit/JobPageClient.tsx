"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Contact from "@/components/Contact";
import { JobDetails } from "@/components/recruit/JobDetails";
import { CountUp } from "@/components/CountUp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { applicationMessage, jobPositions, signOnBonus } from "@/lib/recruit-data";

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
      className={`transition-opacity duration-700 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function JobPageClient({ jobId }: { jobId: string }) {
  const job = jobPositions.find((item) => item.id === jobId);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isContactOpen]);

  if (!job) {
    return null;
  }

  const isNurse = job.id === "nurse";
  const holidayLabel = isNurse ? "年間休日139日以上" : "年間休日120日以上";

  return (
    <div className="min-h-screen body-editorial">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/recruit"
            className="text-primary font-bold text-sm md:text-lg hover:opacity-80 transition-opacity"
          >
            ← 採用情報へ戻る
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-primary heading-mincho">
            {job.title}の採用情報
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-32 md:pb-24 flex flex-col gap-16 md:gap-24">
        <section className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">RECRUIT</p>
            <h2 className="heading-mincho text-3xl md:text-5xl text-[var(--color-olive)]">
              {job.title}の募集
            </h2>
            <p className="text-ink-soft text-base md:text-lg leading-relaxed">
              {job.subtitle}
            </p>
            <p className="text-ink-soft text-sm md:text-base leading-relaxed">
              入社祝い金最大30万円、年間休日139日以上（PT・OT・STは120日以上）。
              {isNurse ? "訪問看護の新しい働き方に挑戦しませんか？" : "リハビリに集中できる環境です。"}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[var(--color-olive)] text-white text-sm font-semibold hover:opacity-90 transition"
              >
                応募する
              </button>
              <Link
                href="/recruit/areas/funabashi"
                className="px-5 py-2.5 rounded-full border border-[var(--color-olive)] text-[var(--color-olive)] text-sm font-semibold hover:bg-[var(--color-olive)]/10 transition"
              >
                エリアから探す
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 pt-3">
              <span className="px-3 py-1 rounded-full bg-[var(--color-olive)] text-white text-xs font-semibold">
                {holidayLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 text-[var(--color-olive)] text-xs font-semibold">
                祝金 最大30万円
              </span>
            </div>
          </FadeIn>
          <FadeIn className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/recruit/photos/hero.webp"
              alt={`${job.title}の募集`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </FadeIn>
        </section>

        <section className="bg-white/80 rounded-3xl p-4 md:p-6 shadow-sm border border-white/80">
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
                <p className="heading-mincho text-lg mt-1">
                  {isNurse ? "139日以上" : "120日以上"}
                </p>
                <p className="text-xs mt-1">{isNurse ? "看護師" : "PT・OT・ST"}</p>
              </div>
              <div className="min-w-[200px] md:min-w-0 snap-center bg-white rounded-2xl border border-[var(--color-sand)] p-4 shadow-sm">
                <p className="text-xs text-ink-soft">応募から内定まで</p>
                <p className="heading-mincho text-lg text-[var(--color-olive)] mt-1">1〜2週間</p>
                <p className="text-xs text-ink-soft mt-1">最短</p>
              </div>
            </div>
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
                      <p className="heading-mincho text-[var(--color-olive)] text-lg mt-1">
                        {Math.round(milestone.amount / 10000)}万円
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-ink-soft mt-3">{signOnBonus.note}</p>
              </div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-white">
                <Image
                  src="/images/recruit/photos/bonus.webp"
                  alt="入社祝い金のイメージ"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </section>

        <section>
          <JobDetails job={job} />
        </section>

        <section className="bg-[var(--color-paper)] rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">PROCESS</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              選考プロセス
            </h3>
            <p className="text-ink-soft mt-2">{applicationMessage.timeline}</p>
            <div className="space-y-6 mt-6">
              {job.selectionProcess.map((step, index) => (
                <div key={step.step} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-[var(--color-olive)]"></div>
                  {index < job.selectionProcess.length - 1 && (
                    <div className="absolute left-[5px] top-4 w-px h-full bg-[var(--color-olive)]/40"></div>
                  )}
                  <p className="font-semibold text-[var(--color-olive)]">{step.step}</p>
                  <p className="text-ink-soft text-sm md:text-base mt-2">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur border-t border-white/80">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center md:justify-end">
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="w-full md:w-auto px-6 py-3 rounded-full bg-[var(--color-olive)] text-white font-semibold shadow-lg"
          >
            応募する
          </button>
        </div>
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
    </div>
  );
}
