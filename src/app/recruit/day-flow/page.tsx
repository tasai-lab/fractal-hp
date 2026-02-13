"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bot,
  Coffee,
  LogOut,
  MessagesSquare,
  Mic,
  Stethoscope,
} from "lucide-react";
import Contact from "@/components/Contact";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  dayFlowHero,
  dayFlowSteps,
  johnnyProfile,
} from "@/lib/recruit-dayflow";

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

const flowIcons = [Bot, Stethoscope, Coffee, Mic, MessagesSquare, LogOut];

export default function RecruitDayFlowPage() {
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
            1日の流れ
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-24 md:pb-20 flex flex-col gap-16 md:gap-20">
        <section className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">DAY FLOW</p>
            <h2 className="heading-mincho text-3xl md:text-5xl text-[var(--color-olive)]">
              {dayFlowHero.title}
            </h2>
            <p className="text-ink-soft text-base md:text-lg leading-relaxed">
              {dayFlowHero.lead}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {dayFlowHero.chips.map((chip, index) => (
                <span
                  key={chip}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    index === 0
                      ? "bg-[var(--color-olive)] text-white"
                      : "bg-[var(--color-paper)] text-[var(--color-olive)]"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </FadeIn>
          <FadeIn className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-white">
            <Image
              src="/images/recruit/photos/day-flow.webp"
              alt="フラクタル訪問看護の1日の流れ"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </FadeIn>
        </section>

        <section className="bg-[var(--color-paper)] rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">MASCOT AI</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              ジョニが教えてくれる1日
            </h3>
          </FadeIn>
          <div className="mt-6 grid lg:grid-cols-[0.9fr,1.1fr] gap-8 items-start">
            <FadeIn className="bg-white/90 rounded-3xl border border-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white">
                  <Image
                    src="/images/recruit/johnny.png"
                    alt="ファンタスティック・ジョニー"
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs tracking-[0.3em] text-ink-soft">FRACTAL FAIRY</p>
                  <p className="heading-mincho text-xl text-[var(--color-olive)]">
                    {johnnyProfile.fullName}
                  </p>
                  <p className="text-xs text-ink-soft mt-1">
                    愛称：{johnnyProfile.nickname} / {johnnyProfile.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-ink-soft mt-4 leading-relaxed">
                {johnnyProfile.description}
              </p>
              <p className="text-sm text-ink-soft mt-3 leading-relaxed">
                {johnnyProfile.subDescription}
              </p>
            </FadeIn>

            <FadeIn className="space-y-4">
              {dayFlowSteps.map((flow, index) => {
                const Icon = flowIcons[index] ?? Stethoscope;
                return (
                  <div key={flow.title} className="relative pl-12">
                    <div className="absolute left-0 top-3 w-9 h-9 rounded-full bg-white border border-[var(--color-sand)] shadow-sm flex items-center justify-center text-[var(--color-olive)]">
                      <Icon className="w-4 h-4" />
                    </div>
                    {index < dayFlowSteps.length - 1 && (
                      <div className="absolute left-[18px] top-12 h-full w-px bg-[var(--color-olive)]/30"></div>
                    )}
                    <div className="bg-white/80 rounded-2xl border border-white px-4 py-3">
                      <p className="text-xs tracking-[0.2em] text-ink-soft">{flow.time}</p>
                      <p className="font-semibold text-[var(--color-olive)] mt-1">{flow.title}</p>
                      <p className="text-sm text-ink-soft mt-1">{flow.detail}</p>
                    </div>
                  </div>
                );
              })}
            </FadeIn>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">NEXT STEP</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              フラクタルで働く準備をはじめる
            </h3>
            <p className="text-ink-soft mt-3">
              働き方に共感いただけたら、募集職種や応募方法をご確認ください。
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-[var(--color-olive)] text-white text-sm md:text-base font-semibold hover:opacity-90 transition"
              >
                応募する
              </button>
              <Link
                href="/recruit#positions"
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-[var(--color-olive)] text-[var(--color-olive)] text-sm md:text-base font-semibold hover:bg-[var(--color-olive)]/10 transition"
              >
                募集職種を見る
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>

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
