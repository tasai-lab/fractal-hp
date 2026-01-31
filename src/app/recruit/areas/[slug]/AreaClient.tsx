"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Contact from "@/components/Contact";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { visitAreas } from "@/lib/recruit-data";
import type { RecruitArea } from "@/lib/recruit-areas";

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


export default function AreaClient({ area }: { area: RecruitArea }) {
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
            {area.name}の採用情報
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-24 md:pb-20 flex flex-col gap-16">
        <section className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">RECRUIT AREA</p>
            <h2 className="heading-mincho text-3xl md:text-5xl text-[var(--color-olive)]">
              {area.name}の訪問看護求人
            </h2>
            <p className="text-ink-soft text-base md:text-lg leading-relaxed">
              {area.shortCopy}
            </p>
            <div className="grid gap-2">
              {area.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="bg-white/80 rounded-2xl border border-white px-4 py-3 text-sm text-ink-soft"
                >
                  {bullet}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/recruit/nurse"
                className="px-5 py-2.5 rounded-full bg-[var(--color-olive)] text-white text-sm font-semibold hover:opacity-90 transition"
              >
                看護師の募集を見る
              </Link>
              <Link
                href="/recruit/therapist"
                className="px-5 py-2.5 rounded-full border border-[var(--color-olive)] text-[var(--color-olive)] text-sm font-semibold hover:bg-[var(--color-olive)]/10 transition"
              >
                PT・OT・STの募集を見る
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-olive)]"
            >
              {area.cta} →
            </button>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-[var(--color-olive)] text-white text-xs font-semibold">
                年休139日以上
              </span>
              <span className="px-3 py-1 rounded-full bg-[var(--color-paper)] text-[var(--color-olive)] text-xs font-semibold">
                PT・OT・STは120日以上
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 text-[var(--color-olive)] text-xs font-semibold">
                祝金 最大30万円
              </span>
            </div>
          </FadeIn>
          <FadeIn className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/recruit/photos/hero.jpg"
              alt={`${area.name}エリアの訪問看護`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </FadeIn>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">SERVICE AREA</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              訪問エリア
            </h3>
            <p className="text-ink-soft mt-3">
              以下のエリアを中心に訪問しています。{area.name}のご利用者さまが多く、
              直行直帰の働き方にも対応しています。
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {visitAreas.map((place) => (
                <span
                  key={place}
                  className={`px-3 py-1 rounded-full text-sm ${
                    place.includes(area.name)
                      ? "bg-[var(--color-olive)] text-white"
                      : "bg-[var(--color-paper)] text-[var(--color-olive)]"
                  }`}
                >
                  {place}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <FadeIn className="bg-[var(--color-paper)] rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
            <p className="text-xs tracking-[0.3em] text-ink-soft">ONE DAY</p>
            <h3 className="heading-mincho text-2xl md:text-3xl text-[var(--color-olive)] mt-3">
              1日の流れ（独立ページ）
            </h3>
            <p className="text-ink-soft mt-3 text-sm md:text-base">
              フラクタルの1日は、ジョニの情報共有と音声入力AIでスムーズに回ります。
              営業時間や訪問件数の詳細は独立ページでまとめています。
            </p>
            <div className="mt-4 flex items-center gap-4 bg-white/80 rounded-2xl border border-white p-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white">
                <Image
                  src="/images/recruit/johnny.png"
                  alt="ファンタスティック・ジョニー"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-olive)]">
                  ファンタスティック・ジョニー（愛称：ジョニ）
                </p>
                <p className="text-xs text-ink-soft mt-1">
                  フラクタルの妖精。物知りで親切、何でも教えてくれます。
                </p>
              </div>
            </div>
            <Link
              href="/recruit/day-flow"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-olive)] mt-5"
            >
              1日の流れを詳しく見る →
            </Link>
          </FadeIn>

          <FadeIn className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
            <p className="text-xs tracking-[0.3em] text-ink-soft">WORK STYLE</p>
            <h3 className="heading-mincho text-2xl md:text-3xl text-[var(--color-olive)] mt-3">
              働き方のこだわり
            </h3>
            <div className="space-y-4 mt-6">
              {area.workStyle.map((style) => (
                <div
                  key={style.title}
                  className="bg-[var(--color-paper)] rounded-2xl border border-white px-4 py-3"
                >
                  <p className="font-semibold text-[var(--color-olive)]">{style.title}</p>
                  <p className="text-sm text-ink-soft mt-1">{style.detail}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {area.staffVoice && (
          <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] text-ink-soft">VOICE</p>
              <h3 className="heading-mincho text-2xl md:text-3xl text-[var(--color-olive)] mt-3">
                スタッフの声
              </h3>
              <div className="mt-6 bg-[var(--color-paper)] rounded-2xl p-5 border border-white">
                <p className="text-sm text-ink-soft">{area.staffVoice.comment}</p>
                <p className="text-sm font-semibold text-[var(--color-olive)] mt-3">
                  {area.staffVoice.name} / {area.staffVoice.role}
                </p>
              </div>
            </FadeIn>
          </section>
        )}

        <section className="bg-[var(--color-paper)] rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">MORE INFO</p>
            <h3 className="heading-mincho text-2xl md:text-3xl text-[var(--color-olive)] mt-3">
              採用情報をもっと見る
            </h3>
            <p className="text-ink-soft mt-3">
              募集職種や選考の流れもあわせてご確認ください。
            </p>
            <div className="grid md:grid-cols-3 gap-3 mt-6">
              <Link
                href="/recruit#positions"
                className="bg-white rounded-2xl border border-white px-4 py-3 text-sm text-ink-soft hover:shadow-md transition"
              >
                <p className="font-semibold text-[var(--color-olive)]">募集職種</p>
                <p className="text-xs text-ink-soft mt-1">職種ごとの詳細を見る</p>
              </Link>
              <Link
                href="/recruit#process"
                className="bg-white rounded-2xl border border-white px-4 py-3 text-sm text-ink-soft hover:shadow-md transition"
              >
                <p className="font-semibold text-[var(--color-olive)]">選考プロセス</p>
                <p className="text-xs text-ink-soft mt-1">応募から内定まで</p>
              </Link>
              <Link
                href="/recruit#faq"
                className="bg-white rounded-2xl border border-white px-4 py-3 text-sm text-ink-soft hover:shadow-md transition"
              >
                <p className="font-semibold text-[var(--color-olive)]">よくある質問</p>
                <p className="text-xs text-ink-soft mt-1">不安を解消する</p>
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
                    src="/images/recruit/labels/contact-photo.jpg"
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
