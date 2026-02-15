"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { updates, typeConfig, getLatestUpdateDate } from "@/lib/updates-data";

const STORAGE_KEY = "fractal-last-seen-update";

export default function UpdatesPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [latestUpdate, setLatestUpdate] = useState<typeof updates[0] | null>(null);

  useEffect(() => {
    const latestDate = getLatestUpdateDate();
    const lastSeenDate = localStorage.getItem(STORAGE_KEY);

    // 最新の更新日が保存されている日付より新しい場合にポップアップ表示
    if (latestDate && latestDate !== lastSeenDate) {
      setLatestUpdate(updates[0]);
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    const latestDate = getLatestUpdateDate();
    localStorage.setItem(STORAGE_KEY, latestDate);
    setIsOpen(false);
  };

  if (!isOpen || !latestUpdate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
      />

      {/* モーダル */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden animate-fade-in-up border border-gray-200">
        {/* ヘッダー */}
        <div className="bg-[var(--color-logo-dark-green)] p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white rounded-full p-1">
                <Image
                  src="/images/recruit/johnny.png"
                  alt="ジョニー"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="font-bold text-lg">サイトが更新されました</h2>
                <p className="text-sm opacity-90">
                  {latestUpdate.date.replace(/-/g, ".")}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="閉じる"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          <div className="space-y-2">
            {latestUpdate.items.map((item, index) => {
              const config = typeConfig[item.type];
              return (
                <div
                  key={index}
                  className="flex flex-wrap items-center gap-2 py-1"
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${config.className}`}
                  >
                    {config.label}
                  </span>
                  {item.link ? (
                    <Link
                      href={item.link}
                      onClick={handleClose}
                      className="text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] hover:underline text-sm"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="text-[var(--color-ink)] text-sm">{item.title}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* フッター */}
        <div className="p-4 border-t border-gray-100 flex flex-col gap-3">
          <Link
            href="/updates"
            onClick={handleClose}
            className="block text-center text-sm text-[var(--color-logo-dark-green)] hover:underline"
          >
            すべての更新情報を見る
          </Link>
          <button
            onClick={handleClose}
            className="w-full py-3 bg-[var(--color-logo-dark-green)] text-white rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            確認しました
          </button>
        </div>
      </div>
    </div>
  );
}
