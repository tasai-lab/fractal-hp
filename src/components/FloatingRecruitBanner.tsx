"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FloatingRecruitBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 私たちのカタチセクションの位置を取得
      const aboutSection = document.getElementById("philosophy");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        // セクションが画面に入ったら表示
        setIsVisible(rect.top < window.innerHeight * 0.8);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期チェック

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      href="/recruit"
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 hover:scale-105 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      }`}
      aria-label="採用情報を見る"
    >
      <Image
        src="/images/recruit/floating-banner.png"
        alt="求人情報"
        width={45}
        height={150}
        className="md:w-[60px] md:h-auto"
        priority
      />
    </Link>
  );
}
