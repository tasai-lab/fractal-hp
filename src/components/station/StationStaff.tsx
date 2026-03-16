"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { StaffMember } from "@/lib/stations-data";

type Props = {
  staffMembers: StaffMember[];
  stationName: string;
};

const bgColors = [
  "bg-[var(--color-accent-blue-light)]",
  "bg-[var(--color-logo-light-green)]/30",
  "bg-[var(--color-logo-yellow)]/40",
  "bg-[var(--color-accent-blue-light)]/60",
];

export default function StationStaff({ staffMembers, stationName }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const selectedStaff =
    selectedIndex !== null ? staffMembers[selectedIndex] : null;

  return (
    <section id="staff" className="section-wrapper bg-white relative">
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title heading-gothic">スタッフ紹介</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          <div className="section-card section-card-mint">
            {/* サブタイトル */}
            <div className="mb-8 md:mb-12">
              <p className="text-xl md:text-2xl font-bold text-center text-primary heading-gothic">
                {stationName}のスタッフ
              </p>
            </div>

            {/* スタッフカードグリッド */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-8">
              {staffMembers.map((staff, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm p-3 md:p-8 hover-lift group cursor-pointer md:cursor-default"
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      openModal(index);
                    }
                  }}
                >
                  {/* プロフィール画像 */}
                  <div className="flex justify-center mb-2 md:mb-6">
                    <div
                      className={`relative w-16 h-16 md:w-32 md:h-32 rounded-full overflow-hidden ${bgColors[index % bgColors.length]} ring-2 md:ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Image
                        src={staff.image}
                        alt={staff.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 64px, 128px"
                      />
                    </div>
                  </div>

                  {/* スタッフ情報 */}
                  <div className="text-center mb-2 md:mb-4">
                    <div className="text-xs md:text-base text-muted mb-0.5 md:mb-2">
                      {staff.role}
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold mb-0.5 md:mb-1">
                      {staff.name}
                    </h3>
                    <p className="text-xs md:text-base text-muted mb-2 md:mb-4">
                      {staff.nameReading}
                    </p>
                  </div>

                  {/* 詳細情報 - デスクトップのみ表示 */}
                  <div className="hidden md:block space-y-2 mb-4 text-base">
                    <div className="flex justify-center gap-2">
                      <span className="font-medium text-muted">出身地:</span>
                      <span>{staff.birthplace}</span>
                    </div>
                    <div className="flex justify-center gap-2">
                      <span className="font-medium text-muted">趣味:</span>
                      <span>{staff.hobbies}</span>
                    </div>
                  </div>

                  {/* 自己紹介 */}
                  <div className="pt-2 md:pt-4 border-t border-border">
                    <p className="text-xs md:text-base leading-relaxed text-foreground line-clamp-3 md:line-clamp-none">
                      {staff.introduction}
                    </p>
                  </div>

                  {/* モバイルでタップ促進 */}
                  <div className="md:hidden mt-2 text-center">
                    <span className="inline-block bg-[var(--color-accent-blue-light)] text-[var(--color-logo-dark-green)] text-sm font-bold px-4 py-1.5 rounded-full">
                      タップで詳細を見る
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* モーダル */}
      {selectedStaff !== null && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* モーダルヘッダー */}
            <div
              className={`${bgColors[selectedIndex % bgColors.length]} p-6 rounded-t-2xl relative`}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm"
                aria-label="閉じる"
              >
                <svg
                  className="w-5 h-5 text-[var(--color-logo-dark-green)]"
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

              {/* プロフィール画像 */}
              <div className="flex justify-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                  <Image
                    src={selectedStaff.image}
                    alt={selectedStaff.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
              </div>
            </div>

            {/* モーダルコンテンツ */}
            <div className="p-5">
              {/* 基本情報 */}
              <div className="text-center mb-4">
                <div className="text-sm text-muted mb-1">
                  {selectedStaff.role}
                </div>
                <h3 className="text-xl font-bold mb-1">{selectedStaff.name}</h3>
                <p className="text-base text-muted">
                  {selectedStaff.nameReading}
                </p>
              </div>

              {/* 詳細情報 */}
              <div className="space-y-3 mb-4 text-base">
                <div className="flex gap-2 bg-gray-50 rounded-lg p-3">
                  <span className="font-medium text-muted min-w-[60px]">
                    出身地:
                  </span>
                  <span>{selectedStaff.birthplace}</span>
                </div>
                <div className="flex gap-2 bg-gray-50 rounded-lg p-3">
                  <span className="font-medium text-muted min-w-[60px]">
                    趣味:
                  </span>
                  <span>{selectedStaff.hobbies}</span>
                </div>
              </div>

              {/* 自己紹介 */}
              <div className="border-t border-border pt-4">
                <h4 className="text-base font-bold text-primary mb-2">
                  自己紹介
                </h4>
                <p className="text-base leading-relaxed text-foreground">
                  {selectedStaff.introduction}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
