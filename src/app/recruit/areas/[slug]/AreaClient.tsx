"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Contact from "@/components/Contact";
import FadeIn from "@/components/Motion";
import { visitAreas } from "@/lib/recruit-data";
import type { RecruitArea } from "@/lib/recruit-areas";

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
