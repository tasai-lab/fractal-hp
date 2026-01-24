"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { flyers, flyerTypes } from "@/lib/flyers-data";

export default function FlyersPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [fullscreenData, setFullscreenData] = useState<{
    frontImage: string;
    backImage: string;
    title: string;
    isFront: boolean;
  } | null>(null);

  const filteredFlyers =
    selectedType === "all"
      ? flyers
      : flyers.filter((flyer) => flyer.type === selectedType);

  // 年ごとにグループ化
  const groupedByYear = filteredFlyers.reduce((acc, flyer) => {
    const year = flyer.date.split("年")[0] + "年";
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(flyer);
    return acc;
  }, {} as Record<string, typeof flyers>);

  // 年を新しい順にソート
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a));

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const openFullscreen = (
    frontImage: string,
    backImage: string,
    title: string,
    isFront: boolean,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setFullscreenData({ frontImage, backImage, title, isFront });
  };

  const closeFullscreen = () => {
    setFullscreenData(null);
  };

  const toggleFullscreenSide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fullscreenData) {
      setFullscreenData({ ...fullscreenData, isFront: !fullscreenData.isFront });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-accent-blue-light)]">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary font-bold text-lg hover:opacity-80 transition-opacity"
          >
            ← トップに戻る
          </Link>
          <h1
            className="font-bold text-primary"
            style={{ fontSize: 'var(--font-size-fluid-xl)' }}
          >
            ふらくたるのバックナンバー
          </h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main
        className="max-w-6xl mx-auto px-4"
        style={{
          paddingTop: 'var(--spacing-fluid-xl)',
          paddingBottom: 'var(--spacing-fluid-2xl)'
        }}
      >
        {/* フィルター */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedType === "all"
                ? "bg-primary text-white"
                : "bg-white text-primary hover:bg-gray-100"
            }`}
          >
            すべて
          </button>
          {flyerTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedType === type.id
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* チラシグリッド（年ごとにグループ化） */}
        {filteredFlyers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted text-lg">チラシはまだありません</p>
          </div>
        ) : (
          <div className="space-y-12">
            {sortedYears.map((year) => (
              <div key={year}>
                {/* 年のタイトル */}
                <h2
                  className="font-bold text-primary pb-2 border-b-2 border-primary"
                  style={{
                    fontSize: 'var(--font-size-fluid-xl)',
                    marginBottom: 'var(--spacing-fluid-lg)'
                  }}
                >
                  {year}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {groupedByYear[year].map((flyer) => (
                    <div key={flyer.id} className="group flex flex-col">
                      {/* チラシカード */}
                      <div className="flex-1 flex items-center">
                        <div
                          className={`relative cursor-pointer perspective-1000 w-full ${
                            flyer.orientation === "landscape"
                              ? "aspect-[297/210]"
                              : "aspect-[210/297]"
                          }`}
                          onClick={() => toggleFlip(flyer.id)}
                        >
                        <div
                          className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                            flippedCards.has(flyer.id) ? "rotate-y-180" : ""
                          }`}
                        >
                          {/* 表面 */}
                          <div className="absolute inset-0 backface-hidden">
                            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                              <Image
                                src={flyer.frontImage}
                                alt={`${flyer.title} 表面`}
                                fill
                                className="object-cover"
                              />
                              {/* ホバー時のオーバーレイ */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium bg-black/50 px-4 py-2 rounded-full text-sm">
                                  クリックで裏面を見る
                                </span>
                              </div>
                              {/* 全画面ボタン */}
                              <button
                                onClick={(e) =>
                                  openFullscreen(
                                    flyer.frontImage,
                                    flyer.backImage,
                                    flyer.title,
                                    true,
                                    e
                                  )
                                }
                                className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="全画面表示"
                              >
                                <svg
                                  className="w-5 h-5 text-primary"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* 裏面 */}
                          <div className="absolute inset-0 backface-hidden rotate-y-180">
                            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                              <Image
                                src={flyer.backImage}
                                alt={`${flyer.title} 裏面`}
                                fill
                                className="object-cover"
                              />
                              {/* ホバー時のオーバーレイ */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium bg-black/50 px-4 py-2 rounded-full text-sm">
                                  クリックで表面を見る
                                </span>
                              </div>
                              {/* 全画面ボタン */}
                              <button
                                onClick={(e) =>
                                  openFullscreen(
                                    flyer.frontImage,
                                    flyer.backImage,
                                    flyer.title,
                                    false,
                                    e
                                  )
                                }
                                className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="全画面表示"
                              >
                                <svg
                                  className="w-5 h-5 text-primary"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>

                      {/* チラシ情報 */}
                      <div className="mt-4 text-center">
                        <h3 className="font-bold text-primary">{flyer.title}</h3>
                        <p className="text-sm text-muted">{flyer.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 全画面モーダル */}
      {fullscreenData && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          {/* 閉じるボタン */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="閉じる"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* 左矢印（裏面へ） */}
          <button
            onClick={toggleFullscreenSide}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 p-3 rounded-full z-10"
            aria-label="裏面を見る"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* 右矢印（表面へ） */}
          <button
            onClick={toggleFullscreenSide}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 p-3 rounded-full z-10"
            aria-label="表面を見る"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* 画像 */}
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={fullscreenData.isFront ? fullscreenData.frontImage : fullscreenData.backImage}
              alt={`${fullscreenData.title} ${fullscreenData.isFront ? "表面" : "裏面"}`}
              fill
              className="object-contain"
            />
          </div>

          {/* 表裏インジケーター */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
            {fullscreenData.isFront ? "表面" : "裏面"}
          </div>
        </div>
      )}
    </div>
  );
}
