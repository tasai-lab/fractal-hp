"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Contact from "@/components/Contact";
import { CountUp } from "@/components/CountUp";
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

// タブの定義
const tabs = jobPositions
  .filter((job) => !job.hidden)
  .map((job) => ({
    id: job.id,
    label: job.id === "nurse" ? "看護師" : "理学/作業/言語",
  }));

export default function RecruitPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "nurse");
  const currentJob = jobPositions.find((job) => job.id === activeTab) || jobPositions[0];

  // スクロールアニメーション用（配列ベースで最適化）
  const CARD_COUNT = 8;
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(CARD_COUNT).fill(null));
  const [cardVisibility, setCardVisibility] = useState<boolean[]>(Array(CARD_COUNT).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setCardVisibility(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary font-bold text-base md:text-lg hover:opacity-80 transition-opacity"
          >
            ← 戻る
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-primary">船橋・八千代・習志野の訪問看護師求人</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main
        className="max-w-4xl mx-auto px-3 md:px-4"
        style={{
          paddingTop: 'var(--spacing-fluid-lg)',
          paddingBottom: 'var(--spacing-fluid-2xl)'
        }}
      >
        {/* SEO用リード文 */}
        <p className="text-base md:text-lg text-primary/80 mb-6 md:mb-8 text-center leading-relaxed">
          船橋市、八千代市、習志野市、千葉市花見川区で<strong>訪問看護師・理学療法士・作業療法士・言語聴覚士</strong>を募集しています。
          入社祝い金最大30万円、年間休日139日以上。未経験・ブランクのある方も歓迎です。
        </p>

        {/* HP限定入社祝い金バナー */}
        <section className="mb-6 md:mb-12">
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-yellow-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-yellow-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

            <div className="relative z-10">
              <div className="inline-block bg-red-500 text-white text-base md:text-lg font-bold px-2 md:px-3 py-1 rounded-full mb-3 md:mb-4">
                {signOnBonus.note}
              </div>
              <h2
                className="font-bold text-primary"
                style={{
                  fontSize: 'var(--font-size-fluid-2xl)',
                  marginBottom: 'var(--spacing-fluid-md)'
                }}
              >
                入社祝い金 最大<CountUp end={30} suffix="万円" />
              </h2>
              {/* 祝い金マイルストーン（矢印付き・下揃え） */}
              <div className="flex items-end justify-center gap-1 md:gap-2 mb-3 md:mb-4">
                {signOnBonus.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-end">
                    <div
                      className={`bg-white/90 rounded-lg md:rounded-xl text-center shadow-sm ${
                        index === 0 ? 'px-3 py-2' : index === 1 ? 'px-3.5 py-2.5' : 'px-4 py-3'
                      }`}
                    >
                      <p className={`text-muted mb-0.5 ${index === 0 ? 'text-sm md:text-base' : index === 1 ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>
                        {milestone.label}
                      </p>
                      <p className={`font-bold text-primary ${index === 0 ? 'text-base md:text-xl' : index === 1 ? 'text-lg md:text-2xl' : 'text-xl md:text-3xl'}`}>
                        {(milestone.amount / 10000).toLocaleString()}万円
                      </p>
                    </div>
                    {index < signOnBonus.milestones.length - 1 && (
                      <div className="text-primary mx-1 md:mx-2 mb-2 md:mb-3">
                        <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-base md:text-lg text-primary/80 mb-3">全ての職種に適用されます</p>
              <div className="bg-white/90 rounded-lg p-3 md:p-4 border-l-4 border-red-500">
                <p className="text-sm md:text-base text-primary/90 font-medium">
                  ※ 入社祝い金は、本HPからの応募に限り適用されます。他の求人媒体から応募された場合、または本HPでの応募前に他の求人媒体から応募されている場合は対象外となりますのでご注意ください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* フラクタルの考え方（共通） */}
        <section className="mb-6 md:mb-12">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md">
            <h2
              className="font-bold text-primary pb-2 border-b-2 border-emerald-500"
              style={{
                fontSize: 'var(--font-size-fluid-xl)',
                marginBottom: 'var(--spacing-fluid-md)'
              }}
            >
              {companyPhilosophy.title}
            </h2>
            <div className="text-base md:text-lg text-primary/80 whitespace-pre-line leading-relaxed">
              {companyPhilosophy.content}
            </div>
          </div>
        </section>

        {/* 募集職種タブ */}
        <section className="mb-6 md:mb-12">
          <h2
            className="font-bold text-primary"
            style={{
              fontSize: 'var(--font-size-fluid-xl)',
              marginBottom: 'var(--spacing-fluid-lg)'
            }}
          >
            船橋エリアの訪問看護師・セラピスト募集
          </h2>

          {/* タブナビゲーション */}
          <div className="flex mb-4 md:mb-6 bg-gray-100 rounded-lg md:rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-md md:rounded-lg font-bold text-base md:text-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-primary shadow-md"
                    : "text-muted hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 職種詳細 */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden">
            {/* ヘッダー */}
            <div className={`p-4 md:p-8 ${activeTab === "nurse" ? "bg-emerald-600" : "bg-teal-500"}`}>
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                {currentJob.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="bg-white/90 text-primary text-sm md:text-base font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              <h3
                className="font-bold text-white mb-1 md:mb-2"
                style={{ fontSize: 'var(--font-size-fluid-2xl)' }}
              >
                {currentJob.title}募集
              </h3>
              <p className="text-white/90 text-base md:text-lg">
                {currentJob.subtitle}
              </p>
            </div>

            {/* コンテンツ */}
            <div className="p-4 md:p-8 space-y-5 md:space-y-6">
              {/* 仕事内容 */}
              <div
                ref={el => { cardRefs.current[0] = el; }}
                className={`bg-white rounded-xl p-4 md:p-6 shadow-md border-l-4 border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  cardVisibility[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💼</span>
                  <h4 className="text-lg md:text-xl font-bold text-primary">
                    {activeTab === "nurse" ? "訪問看護師の仕事内容" : "訪問リハビリスタッフの仕事内容"}
                  </h4>
                </div>
                <p className="text-base md:text-lg text-primary/80 mb-3 md:mb-4">{currentJob.description}</p>
                <h5 className="font-bold text-primary text-base md:text-lg mb-2">具体的な業務内容</h5>
                <ul className="space-y-1.5 md:space-y-2">
                  {(activeTab === "nurse" ? jobDuties : therapistDuties).map((duty, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-base md:text-lg text-primary/80"
                    >
                      <span className={`mt-0.5 md:mt-1 ${activeTab === "nurse" ? "text-emerald-600" : "text-teal-500"}`}>●</span>
                      {duty}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 訪問エリア */}
              <div
                ref={el => { cardRefs.current[1] = el; }}
                className={`bg-white rounded-xl p-4 md:p-6 shadow-md border-l-4 border-teal-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  cardVisibility[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">📍</span>
                  <h4 className="text-lg md:text-xl font-bold text-primary">訪問エリア：船橋市・八千代市・習志野市・花見川区</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {visitAreas.map((area, index) => (
                    <span
                      key={index}
                      className="bg-teal-100 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-base md:text-lg"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* オンコール（看護師のみ） */}
              {activeTab === "nurse" && (
                <div
                  ref={el => { cardRefs.current[2] = el; }}
                  className={`bg-white rounded-xl p-4 md:p-6 shadow-md border-l-4 border-yellow-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                    cardVisibility[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">📞</span>
                    <h4 className="text-lg md:text-xl font-bold text-primary">オンコールについて</h4>
                  </div>
                  <div className="bg-yellow-50 rounded-lg md:rounded-xl p-3 md:p-4">
                    <p className="text-primary font-medium text-base md:text-lg mb-1 md:mb-2">
                      月{onCallInfo.frequency.replace("月", "").replace("程度", "")}
                      程度
                    </p>
                    <p className="text-primary/80 text-base md:text-lg">
                      {onCallInfo.note}
                    </p>
                  </div>
                </div>
              )}

              {/* 給与 */}
              <div
                ref={el => { cardRefs.current[3] = el; }}
                className={`bg-white rounded-xl p-4 md:p-6 shadow-md border-l-4 border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  cardVisibility[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💰</span>
                  <h4 className="text-lg md:text-xl font-bold text-primary">給与</h4>
                </div>
                <div className="bg-emerald-50 rounded-lg md:rounded-xl p-3 md:p-4">
                  <p className="text-base md:text-lg text-muted mb-1">
                    【{currentJob.details.salary.type}】
                  </p>
                  <p className="text-xl md:text-3xl font-bold text-primary mb-3 md:mb-4">
                    {currentJob.details.salary.amount}
                  </p>
                  <h5 className="font-bold text-primary text-base md:text-lg mb-2">内訳</h5>
                  <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                    {currentJob.details.salary.breakdown.map((item, index) => (
                      <li
                        key={index}
                        className="flex flex-col md:flex-row md:justify-between text-base md:text-lg"
                      >
                        <span className="text-primary/80">{item.label}</span>
                        <span className="font-medium text-primary">
                          {item.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {currentJob.details.salary.note && (
                    <p className="text-sm md:text-base text-primary/70 bg-white/50 rounded-lg p-2 md:p-3">
                      {currentJob.details.salary.note}
                    </p>
                  )}
                </div>

                {/* モデル年収（療法士のみ） */}
                {activeTab === "therapist" && (
                  <div className="mt-3 md:mt-4">
                    <h5 className="font-bold text-primary text-base md:text-lg mb-2 md:mb-3">モデル年収</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {therapistModelIncome.map((model, index) => (
                        <div key={index} className="bg-emerald-50 rounded-lg md:rounded-xl p-3 md:p-4">
                          <p className="text-base md:text-lg text-muted mb-1">{model.label}</p>
                          <p className="text-primary/80 text-base md:text-lg mb-1.5 md:mb-2">{model.calculation}</p>
                          <p className="text-lg md:text-xl font-bold text-primary">{model.monthly}</p>
                          <p className="text-base md:text-lg text-emerald-600 font-medium">{model.annual}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 勤務時間・休日 */}
              <div
                ref={el => { cardRefs.current[4] = el; }}
                className={`bg-white rounded-xl p-4 md:p-6 shadow-md border-l-4 border-teal-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  cardVisibility[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🕐</span>
                  <h4 className="text-lg md:text-xl font-bold text-primary">勤務時間・休日</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-4">
                  <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4">
                    <h5 className="font-bold text-primary text-base md:text-lg mb-1 md:mb-2">勤務時間</h5>
                    <p className="text-base md:text-lg text-primary/80">{currentJob.details.workHours}</p>
                    <p className="text-sm md:text-base text-muted mt-1 md:mt-2">残業ほぼなし</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4">
                    <h5 className="font-bold text-primary text-base md:text-lg mb-1 md:mb-2">年間休日</h5>
                    <p className={`text-xl md:text-2xl font-bold mb-1 md:mb-2 ${activeTab === "nurse" ? "text-emerald-600" : "text-teal-500"}`}>
                      {currentJob.details.holidays.annual}
                    </p>
                    {currentJob.details.holidays.monthly && (
                      <p className="text-xs md:text-sm text-primary/80">
                        月の公休：{currentJob.details.holidays.monthly}日
                      </p>
                    )}
                  </div>
                </div>
                <ul className="space-y-1.5 md:space-y-2">
                  {currentJob.details.holidays.notes.map((note, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-1.5 md:gap-2 text-primary/80 text-sm md:text-base"
                    >
                      <span className="text-accent-pink mt-0.5 md:mt-1">★</span>
                      {note}
                    </li>
                  ))}
                </ul>

                {/* シフト例（看護師のみ） */}
                {activeTab === "nurse" && (
                  <div className="mt-4 md:mt-6">
                    <h5 className="font-bold text-primary text-base md:text-lg mb-3 md:mb-4">実際のシフト例</h5>
                    <div className="relative w-full aspect-[1456/856] rounded-lg md:rounded-xl overflow-hidden">
                      <Image
                        src="/images/recruit/shift-example.png"
                        alt="実際のシフト例 - 8月"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 特徴 */}
              <div
                ref={el => { cardRefs.current[5] = el; }}
                className={`bg-white rounded-xl p-4 md:p-6 shadow-md border-l-4 border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  cardVisibility[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">⭐</span>
                  <h4 className="text-lg md:text-xl font-bold text-primary">{activeTab === "nurse" ? "フラクタルの特徴" : "働きやすさのポイント"}</h4>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {currentJob.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`rounded-lg md:rounded-xl p-3 md:p-4 ${activeTab === "nurse" ? "bg-emerald-50" : "bg-teal-50"}`}
                    >
                      <h5 className="font-bold text-primary text-base md:text-lg mb-1 md:mb-2">
                        {feature.title}
                      </h5>
                      <p className="text-primary/80 text-sm md:text-base leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 待遇・福利厚生 */}
              <div
                ref={el => { cardRefs.current[6] = el; }}
                className={`bg-white rounded-xl p-4 md:p-6 shadow-md border-l-4 border-teal-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  cardVisibility[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎁</span>
                  <h4 className="text-lg md:text-xl font-bold text-primary">待遇・福利厚生</h4>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
                  {currentJob.details.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-1.5 md:gap-2 text-primary/80 text-sm md:text-base"
                    >
                      <span className="text-teal-500">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 応募要件 */}
              <div
                ref={el => { cardRefs.current[7] = el; }}
                className={`bg-white rounded-xl p-4 md:p-6 shadow-md border-l-4 border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  cardVisibility[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">✅</span>
                  <h4 className="text-lg md:text-xl font-bold text-primary">応募要件</h4>
                </div>
                <ul className="space-y-1.5 md:space-y-2">
                  {currentJob.details.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-1.5 md:gap-2 text-base md:text-lg text-primary/80"
                    >
                      <span className={`mt-0.5 md:mt-0 ${activeTab === "nurse" ? "text-emerald-600" : "text-teal-500"}`}>●</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 選考プロセス（共通） */}
        <section className="mb-6 md:mb-12">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md">
            <h2
              className="font-bold text-primary pb-2 border-b-2 border-emerald-500"
              style={{
                fontSize: 'var(--font-size-fluid-xl)',
                marginBottom: 'var(--spacing-fluid-md)'
              }}
            >
              選考プロセス
            </h2>
            <p className="text-base md:text-lg text-primary/80 mb-4 md:mb-6">
              {applicationMessage.timeline}
            </p>
            <div className="space-y-4 md:space-y-6">
              {currentJob.selectionProcess.map((step, index) => (
                <div key={index} className="relative pl-8 md:pl-10">
                  <div className={`absolute left-0 top-0 w-6 h-6 md:w-8 md:h-8 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base ${activeTab === "nurse" ? "bg-emerald-600" : "bg-teal-500"}`}>
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-primary text-base md:text-lg mb-0.5 md:mb-1">{step.step}</h4>
                  <p className="text-primary/80 text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 応募メッセージ */}
        <section className="mb-6 md:mb-12">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md">
            <h2
              className="font-bold text-primary pb-2 border-b-2 border-emerald-500"
              style={{
                fontSize: 'var(--font-size-fluid-xl)',
                marginBottom: 'var(--spacing-fluid-md)'
              }}
            >
              お問い合わせ
            </h2>
            <div className="text-center mb-8 md:mb-12">
              <p className="text-base md:text-lg text-primary/80 leading-relaxed mb-4 md:mb-6">
                {applicationMessage.main}
              </p>
              <p className="text-primary/80 text-sm md:text-base">
                {applicationMessage.visit}
              </p>
            </div>
            <Contact initialContactType="求人・採用について" embedded={true} hideTitle={true} />
          </div>
        </section>
      </main>
    </div>
  );
}
