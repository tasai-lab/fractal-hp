"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

  return (
    <div className="min-h-screen bg-[var(--color-accent-pink-light)]">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary font-bold text-sm md:text-lg hover:opacity-80 transition-opacity"
          >
            ← 戻る
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-primary">採用情報</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-3 md:px-4 py-6 md:py-12">
        {/* HP限定入社祝い金バナー */}
        <section className="mb-6 md:mb-12">
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-yellow-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-yellow-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

            <div className="relative z-10">
              <div className="inline-block bg-red-500 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full mb-3 md:mb-4">
                {signOnBonus.note}
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-primary mb-4 md:mb-6">
                入社祝い金 最大{(signOnBonus.total / 10000).toLocaleString()}万円
              </h2>
              {/* 祝い金マイルストーン（矢印付き・下揃え） */}
              <div className="flex items-end justify-center gap-1 md:gap-2 mb-3 md:mb-4">
                {signOnBonus.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-end">
                    <div
                      className="bg-white/90 rounded-lg md:rounded-xl text-center shadow-sm"
                      style={{
                        padding: index === 0 ? '8px 12px' : index === 1 ? '10px 14px' : '12px 16px',
                      }}
                    >
                      <p className={`text-muted mb-0.5 ${index === 0 ? 'text-[9px] md:text-xs' : index === 1 ? 'text-[10px] md:text-sm' : 'text-xs md:text-base'}`}>
                        {milestone.label}
                      </p>
                      <p className={`font-bold text-primary ${index === 0 ? 'text-sm md:text-lg' : index === 1 ? 'text-base md:text-xl' : 'text-lg md:text-2xl'}`}>
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
              <p className="text-xs md:text-sm text-primary/80">全ての職種に適用されます</p>
            </div>
          </div>
        </section>

        {/* フラクタルの考え方（共通） */}
        <section className="mb-6 md:mb-12">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md">
            <h2 className="text-lg md:text-2xl font-bold text-primary mb-3 md:mb-4 pb-2 border-b-2 border-accent-mint">
              {companyPhilosophy.title}
            </h2>
            <div className="text-sm md:text-base text-primary/80 whitespace-pre-line leading-relaxed">
              {companyPhilosophy.content}
            </div>
          </div>
        </section>

        {/* 募集職種タブ */}
        <section className="mb-6 md:mb-12">
          <h2 className="text-lg md:text-2xl font-bold text-primary mb-4 md:mb-6">募集職種</h2>

          {/* タブナビゲーション */}
          <div className="flex mb-4 md:mb-6 bg-gray-100 rounded-lg md:rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-md md:rounded-lg font-bold text-sm md:text-base transition-all ${
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
            <div className={`p-4 md:p-8 ${activeTab === "nurse" ? "bg-accent-blue" : "bg-accent-mint"}`}>
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                {currentJob.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="bg-white/90 text-primary text-[10px] md:text-sm font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                {currentJob.title}募集
              </h3>
              <p className="text-white/90 text-xs md:text-base">
                {currentJob.subtitle}
              </p>
            </div>

            {/* コンテンツ */}
            <div className="p-4 md:p-8 space-y-5 md:space-y-6">
              {/* 仕事内容 */}
              <div>
                <h4 className="text-base md:text-lg font-bold text-primary mb-2 md:mb-3 pb-2 border-b border-gray-200">
                  仕事内容
                </h4>
                <p className="text-sm md:text-base text-primary/80 mb-3 md:mb-4">{currentJob.description}</p>
                <h5 className="font-bold text-primary text-sm md:text-base mb-2">具体的な業務内容</h5>
                <ul className="space-y-1.5 md:space-y-2">
                  {(activeTab === "nurse" ? jobDuties : therapistDuties).map((duty, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm md:text-base text-primary/80"
                    >
                      <span className={`mt-0.5 md:mt-1 ${activeTab === "nurse" ? "text-accent-blue" : "text-accent-mint"}`}>●</span>
                      {duty}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 訪問エリア */}
              <div>
                <h4 className="text-base md:text-lg font-bold text-primary mb-2 md:mb-3 pb-2 border-b border-gray-200">
                  訪問エリア
                </h4>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {visitAreas.map((area, index) => (
                    <span
                      key={index}
                      className="bg-accent-mint-light text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-base"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* オンコール（看護師のみ） */}
              {activeTab === "nurse" && (
                <div>
                  <h4 className="text-base md:text-lg font-bold text-primary mb-2 md:mb-3 pb-2 border-b border-gray-200">
                    オンコールについて
                  </h4>
                  <div className="bg-accent-yellow/50 rounded-lg md:rounded-xl p-3 md:p-4">
                    <p className="text-primary font-medium text-sm md:text-base mb-1 md:mb-2">
                      月{onCallInfo.frequency.replace("月", "").replace("程度", "")}
                      程度
                    </p>
                    <p className="text-primary/80 text-xs md:text-base">
                      {onCallInfo.note}
                    </p>
                  </div>
                </div>
              )}

              {/* 給与 */}
              <div>
                <h4 className="text-base md:text-lg font-bold text-primary mb-2 md:mb-3 pb-2 border-b border-gray-200">
                  給与
                </h4>
                <div className="bg-accent-pink-light/50 rounded-lg md:rounded-xl p-3 md:p-4">
                  <p className="text-xs md:text-sm text-muted mb-1">
                    【{currentJob.details.salary.type}】
                  </p>
                  <p className="text-xl md:text-3xl font-bold text-primary mb-3 md:mb-4">
                    {currentJob.details.salary.amount}
                  </p>
                  <h5 className="font-bold text-primary text-sm md:text-base mb-2">内訳</h5>
                  <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                    {currentJob.details.salary.breakdown.map((item, index) => (
                      <li
                        key={index}
                        className="flex flex-col md:flex-row md:justify-between text-xs md:text-base"
                      >
                        <span className="text-primary/80">{item.label}</span>
                        <span className="font-medium text-primary">
                          {item.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {currentJob.details.salary.note && (
                    <p className="text-[10px] md:text-sm text-primary/70 bg-white/50 rounded-lg p-2 md:p-3">
                      {currentJob.details.salary.note}
                    </p>
                  )}
                </div>

                {/* モデル年収（療法士のみ） */}
                {activeTab === "therapist" && (
                  <div className="mt-3 md:mt-4">
                    <h5 className="font-bold text-primary text-sm md:text-base mb-2 md:mb-3">モデル年収</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {therapistModelIncome.map((model, index) => (
                        <div key={index} className="bg-accent-blue-light/30 rounded-lg md:rounded-xl p-3 md:p-4">
                          <p className="text-xs md:text-sm text-muted mb-1">{model.label}</p>
                          <p className="text-primary/80 text-xs md:text-sm mb-1.5 md:mb-2">{model.calculation}</p>
                          <p className="text-lg md:text-xl font-bold text-primary">{model.monthly}</p>
                          <p className="text-xs md:text-sm text-accent-blue font-medium">{model.annual}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 勤務時間・休日 */}
              <div>
                <h4 className="text-base md:text-lg font-bold text-primary mb-2 md:mb-3 pb-2 border-b border-gray-200">
                  勤務時間・休日
                </h4>
                <div className="grid grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-4">
                  <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4">
                    <h5 className="font-bold text-primary text-sm md:text-base mb-1 md:mb-2">勤務時間</h5>
                    <p className="text-xs md:text-base text-primary/80">{currentJob.details.workHours}</p>
                    <p className="text-[10px] md:text-sm text-muted mt-1 md:mt-2">残業ほぼなし</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4">
                    <h5 className="font-bold text-primary text-sm md:text-base mb-1 md:mb-2">年間休日</h5>
                    <p className={`text-xl md:text-2xl font-bold mb-1 md:mb-2 ${activeTab === "nurse" ? "text-accent-blue" : "text-accent-mint"}`}>
                      {currentJob.details.holidays.annual}
                    </p>
                    {currentJob.details.holidays.monthly && (
                      <p className="text-[10px] md:text-sm text-primary/80">
                        月の公休：{currentJob.details.holidays.monthly}日
                      </p>
                    )}
                  </div>
                </div>
                <ul className="space-y-1.5 md:space-y-2">
                  {currentJob.details.holidays.notes.map((note, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-1.5 md:gap-2 text-primary/80 text-xs md:text-base"
                    >
                      <span className="text-accent-pink mt-0.5 md:mt-1">★</span>
                      {note}
                    </li>
                  ))}
                </ul>

                {/* シフト例（看護師のみ） */}
                {activeTab === "nurse" && (
                  <div className="mt-4 md:mt-6">
                    <h5 className="font-bold text-primary text-sm md:text-base mb-3 md:mb-4">実際のシフト例</h5>
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
              <div>
                <h4 className="text-base md:text-lg font-bold text-primary mb-2 md:mb-3 pb-2 border-b border-gray-200">
                  {activeTab === "nurse" ? "フラクタルの特徴" : "働きやすさのポイント"}
                </h4>
                <div className="space-y-3 md:space-y-4">
                  {currentJob.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`rounded-lg md:rounded-xl p-3 md:p-4 ${activeTab === "nurse" ? "bg-accent-blue-light/30" : "bg-accent-mint-light/30"}`}
                    >
                      <h5 className="font-bold text-primary text-sm md:text-base mb-1 md:mb-2">
                        {feature.title}
                      </h5>
                      <p className="text-primary/80 text-xs md:text-base leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 待遇・福利厚生 */}
              <div>
                <h4 className="text-base md:text-lg font-bold text-primary mb-2 md:mb-3 pb-2 border-b border-gray-200">
                  待遇・福利厚生
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
                  {currentJob.details.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-1.5 md:gap-2 text-primary/80 text-xs md:text-base"
                    >
                      <span className="text-accent-mint">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 応募要件 */}
              <div>
                <h4 className="text-base md:text-lg font-bold text-primary mb-2 md:mb-3 pb-2 border-b border-gray-200">
                  応募要件
                </h4>
                <ul className="space-y-1.5 md:space-y-2">
                  {currentJob.details.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-1.5 md:gap-2 text-sm md:text-base text-primary/80"
                    >
                      <span className={`mt-0.5 md:mt-0 ${activeTab === "nurse" ? "text-accent-blue" : "text-accent-mint"}`}>●</span>
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
            <h2 className="text-lg md:text-2xl font-bold text-primary mb-3 md:mb-4 pb-2 border-b-2 border-accent-blue">
              選考プロセス
            </h2>
            <p className="text-sm md:text-base text-primary/80 mb-4 md:mb-6">
              {applicationMessage.timeline}
            </p>
            <div className="space-y-4 md:space-y-6">
              {currentJob.details.selectionProcess.map((step, index) => (
                <div key={index} className="relative pl-8 md:pl-10">
                  <div className={`absolute left-0 top-0 w-6 h-6 md:w-8 md:h-8 text-white rounded-full flex items-center justify-center font-bold text-xs md:text-base ${activeTab === "nurse" ? "bg-accent-blue" : "bg-accent-mint"}`}>
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-primary text-sm md:text-base mb-0.5 md:mb-1">{step.step}</h4>
                  <p className="text-primary/80 text-xs md:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 応募メッセージ */}
        <section className="mb-6 md:mb-12 pb-20 lg:pb-0">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md text-center">
            <p className="text-sm md:text-base text-primary/80 leading-relaxed mb-4 md:mb-6">
              {applicationMessage.main}
            </p>
            <p className="text-primary/80 text-xs md:text-sm mb-4 md:mb-6">
              {applicationMessage.visit}
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg hover:opacity-90 transition-opacity"
            >
              応募・お問い合わせはこちら
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
