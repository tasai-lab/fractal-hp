"use client";

import { useState } from "react";
import { otherMenuCategories } from "@/lib/data";
import { Instagram, FileText, Menu, X, LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const iconMap: { [key: string]: LucideIcon } = {
  Instagram,
  FileText,
};


interface HeaderProps {
  variant?: "default" | "paper" | "editorial";
}

export default function Header({ variant = "default" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const bgClassMap: Record<NonNullable<HeaderProps["variant"]>, string> = {
    default: "bg-white shadow-md",
    paper: "bg-[var(--color-paper)] border-b border-[var(--color-sand)]",
    editorial: "bg-[#f5f0e8]/90 backdrop-blur-md border-b border-[var(--color-sand)]",
  };
  const bgClass = bgClassMap[variant];

  const menuBgMap: Record<NonNullable<HeaderProps["variant"]>, string> = {
    default: "bg-white",
    paper: "bg-[var(--color-paper)]",
    editorial: "bg-[#f5f0e8]",
  };
  const menuBg = menuBgMap[variant];


  return (
    <>
      {/* ヘッダー */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-20">
            {/* 左スペーサー（中央揃え用） */}
            <div className="w-10 h-10" />

            {/* ロゴ（中央） */}
            <Link href="/" className="flex items-center space-x-3 lg:space-x-4">
              <Image
                src="/images/logos/hokan-logo.png"
                alt="フラクタル訪問看護"
                width={56}
                height={56}
                className="w-11 h-11 lg:w-14 lg:h-14"
              />
              <Image
                src="/images/logos/hokan-title-corporate.png"
                alt="フラクタル訪問看護"
                width={280}
                height={56}
                className="h-9 lg:h-12 w-auto max-w-[calc(100%-4rem)]"
              />
            </Link>

            {/* ハンバーガーメニューボタン（右） */}
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center w-10 h-10 text-[var(--color-primary)] hover:text-[var(--color-accent-blue)] transition-colors"
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 展開メニュー */}
      <div
        className={`fixed inset-0 z-40 pt-14 lg:pt-20 transition-all duration-300 ${
          isMenuOpen ? "bg-black/50 visible" : "bg-transparent invisible"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`${menuBg} shadow-lg p-4 max-h-[calc(100vh-3.5rem)] lg:max-h-[calc(100vh-5rem)] overflow-y-auto w-full transition-all duration-300 ${
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
            <nav className="max-w-4xl mx-auto space-y-5">
              {/* 大項目: 事業所 */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-logo-dark-green)] border-b border-[var(--color-logo-dark-green)]/30 pb-1 mb-2">
                  事業所
                </h3>
                <Link href="/stations" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  事業所一覧
                </Link>
                <Link href="/stations/funabashi" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  フラクタル訪問看護 船橋
                </Link>
                <Link href="/stations/funabashi/areas" onClick={closeMenu}
                  className="block pl-8 py-1 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  対応エリア
                </Link>
                <Link href="/stations/funabashi/documents" onClick={closeMenu}
                  className="block pl-8 py-1 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  各種書類
                </Link>
                <Link href="/stations/funabashi/recruit" onClick={closeMenu}
                  className="block pl-8 py-1 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  採用情報
                </Link>
              </div>

              {/* 大項目: サービス案内 */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-logo-dark-green)] border-b border-[var(--color-logo-dark-green)]/30 pb-1 mb-2">
                  サービス案内
                </h3>
                <Link href="/pricing" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  ご利用料金
                </Link>
                <Link href="/services/psychiatric-nursing" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  精神科訪問看護
                </Link>
                <Link href="/services/end-of-life-care" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  看取り・終末期ケア
                </Link>
                <Link href="/services/24h-support" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  24時間対応体制
                </Link>
                <Link href="/services/for-care-managers" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  ケアマネ様へ
                </Link>
                <Link href="/services/for-medical-institutions" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  医療機関様へ
                </Link>
              </div>

              {/* 大項目: 採用・お問い合わせ */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-logo-dark-green)] border-b border-[var(--color-logo-dark-green)]/30 pb-1 mb-2">
                  採用・お問い合わせ
                </h3>
                <Link href="/recruit" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  採用情報一覧
                </Link>
                <Link href="/#contact" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  お問い合わせ
                </Link>
              </div>

              {/* 大項目: 会社情報 */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-logo-dark-green)] border-b border-[var(--color-logo-dark-green)]/30 pb-1 mb-2">
                  会社情報
                </h3>
                <Link href="/company" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  株式会社フラクタル
                </Link>
                <Link href="/fractal" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  フラクタルの意味
                </Link>
                <Link href="/company/ceo" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  代表の取扱説明書
                </Link>
                <p className="pl-4 py-1.5 text-sm font-medium text-[var(--color-ink)]">
                  公式メディア
                </p>
                {otherMenuCategories.external.items.map((item) => {
                  const Icon = item.icon ? iconMap[item.icon] : null;
                  return (
                    <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" onClick={closeMenu}
                      className="flex items-center pl-8 py-1 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                      {Icon && <Icon className="w-4 h-4 mr-1.5 shrink-0" />}
                      {item.label}
                    </a>
                  );
                })}
              </div>

              {/* 大項目: サイト情報 */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-logo-dark-green)] border-b border-[var(--color-logo-dark-green)]/30 pb-1 mb-2">
                  サイト情報
                </h3>
                <Link href="/updates" onClick={closeMenu}
                  className="block pl-4 py-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] transition-colors">
                  アップデート情報
                </Link>
              </div>
            </nav>
          </div>
        </div>
    </>
  );
}
