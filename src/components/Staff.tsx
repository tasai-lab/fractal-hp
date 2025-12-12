"use client";

import { useState } from "react";
import { staffMembers } from "@/lib/data";
import BackgroundTriangles from "./BackgroundTriangles";
import Image from "next/image";

const bgColors = [
  "bg-accent-blue-light",
  "bg-accent-pink-light",
  "bg-accent-yellow",
  "bg-accent-mint-light",
];

interface StaffMember {
  name: string;
  nameReading: string;
  role: string;
  image: string;
  birthplace: string;
  hobbies: string;
  introduction: string;
}

export default function Staff() {
  const [selectedStaff, setSelectedStaff] = useState<{ staff: StaffMember; index: number } | null>(null);

  const openModal = (staff: StaffMember, index: number) => {
    setSelectedStaff({ staff, index });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedStaff(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="staff" className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="staff" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title">スタッフ紹介</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          {/* 丸みを帯びた四角形で囲む */}
          <div className="section-card section-card-blue">
            {/* サブタイトル */}
            <div className="mb-8 md:mb-12">
              <p className="text-xl md:text-2xl font-bold text-center text-primary">
                フラクタルの仲間たち
              </p>
            </div>

            {/* スタッフカードグリッド */}
            <div className="grid grid-cols-2 gap-3 md:gap-8">
              {staffMembers.map((staff, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl md:rounded-2xl shadow-sm p-3 md:p-8 hover-lift group cursor-pointer md:cursor-default"
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      openModal(staff, index);
                    }
                  }}
                >
                  {/* プロフィール画像 */}
                  <div className="flex justify-center mb-2 md:mb-6">
                    <div className={`relative w-16 h-16 md:w-32 md:h-32 rounded-full overflow-hidden ${bgColors[index % bgColors.length]} ring-2 md:ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Image
                        src={staff.image}
                        alt={staff.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* スタッフ情報 */}
                  <div className="text-center mb-2 md:mb-4">
                    <div className="text-[10px] md:text-sm text-muted mb-0.5 md:mb-2">{staff.role}</div>
                    <h3 className="text-sm md:text-2xl font-bold mb-0.5 md:mb-1">{staff.name}</h3>
                    <p className="text-[10px] md:text-sm text-muted mb-2 md:mb-4">{staff.nameReading}</p>
                  </div>

                  {/* 詳細情報 - モバイルでは非表示 */}
                  <div className="hidden md:block space-y-2 mb-4 text-sm">
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
                    <p className="text-[10px] md:text-sm leading-relaxed text-foreground line-clamp-3 md:line-clamp-none">
                      {staff.introduction}
                    </p>
                  </div>

                  {/* モバイルでタップ促進 */}
                  <div className="md:hidden mt-2 text-center">
                    <span className="text-[9px] text-accent-blue">タップで詳細を見る</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* モーダル */}
      {selectedStaff && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* モーダルヘッダー */}
            <div className={`${bgColors[selectedStaff.index % bgColors.length]} p-6 rounded-t-2xl relative`}>
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* プロフィール画像 */}
              <div className="flex justify-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                  <Image
                    src={selectedStaff.staff.image}
                    alt={selectedStaff.staff.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* モーダルコンテンツ */}
            <div className="p-5">
              {/* 基本情報 */}
              <div className="text-center mb-4">
                <div className="text-xs text-muted mb-1">{selectedStaff.staff.role}</div>
                <h3 className="text-xl font-bold mb-1">{selectedStaff.staff.name}</h3>
                <p className="text-sm text-muted">{selectedStaff.staff.nameReading}</p>
              </div>

              {/* 詳細情報 */}
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex gap-2 bg-gray-50 rounded-lg p-3">
                  <span className="font-medium text-muted min-w-[60px]">出身地:</span>
                  <span>{selectedStaff.staff.birthplace}</span>
                </div>
                <div className="flex gap-2 bg-gray-50 rounded-lg p-3">
                  <span className="font-medium text-muted min-w-[60px]">趣味:</span>
                  <span>{selectedStaff.staff.hobbies}</span>
                </div>
              </div>

              {/* 自己紹介 */}
              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-bold text-primary mb-2">自己紹介</h4>
                <p className="text-sm leading-relaxed text-foreground">
                  {selectedStaff.staff.introduction}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
