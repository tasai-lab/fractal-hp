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
            <nav className="max-w-4xl mx-auto space-y-6">
              {/* 大項目: 事業所 */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-logo-dark-green)] mb-3 border-b-2 border-[var(--color-logo-dark-green)] pb-1">
                  事業所
                </h3>
                <div className="space-y-2">
                  {/* 事業所一覧 */}
                  <Link href="/stations" onClick={closeMenu}
                    className="block p-3 rounded-lg bg-[var(--color-logo-light-green)]/10 hover:bg-[var(--color-logo-light-green)]/25 transition-colors">
                    <span className="text-sm font-medium text-[var(--color-primary)]">事業所一覧</span>
                  </Link>
                  {/* 船橋（中項目）+ サブページ（小項目） */}
                  <div className="rounded-lg border border-[var(--color-logo-light-green)]/30 overflow-hidden">
                    <Link href="/stations/funabashi" onClick={closeMenu}
                      className="block p-3 bg-[var(--color-logo-light-green)]/15 hover:bg-[var(--color-logo-light-green)]/25 transition-colors">
                      <span className="text-sm font-bold text-[var(--color-primary)]">フラクタル訪問看護 船橋</span>
                    </Link>
                    <div className="grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-200">
                      <Link href="/stations/funabashi/areas" onClick={closeMenu}
                        className="p-2.5 bg-white hover:bg-[var(--color-logo-light-green)]/10 transition-colors text-center">
                        <span className="text-xs font-medium text-[var(--color-ink-soft)]">対応エリア</span>
                      </Link>
                      <Link href="/stations/funabashi/documents" onClick={closeMenu}
                        className="p-2.5 bg-white hover:bg-[var(--color-logo-light-green)]/10 transition-colors text-center">
                        <span className="text-xs font-medium text-[var(--color-ink-soft)]">各種書類</span>
                      </Link>
                      <Link href="/stations/funabashi/recruit" onClick={closeMenu}
                        className="p-2.5 bg-white hover:bg-[var(--color-logo-light-green)]/10 transition-colors text-center">
                        <span className="text-xs font-medium text-[var(--color-ink-soft)]">採用情報</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 大項目: サービス案内 */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-logo-dark-green)] mb-3 border-b-2 border-[var(--color-logo-dark-green)] pb-1">
                  サービス案内
                </h3>
                <div className="space-y-2">
                  <Link href="/pricing" onClick={closeMenu}
                    className="block p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                    <span className="text-sm font-medium text-[var(--color-primary)]">ご利用料金</span>
                  </Link>
                  {/* サービス内容（中項目） */}
                  <div className="rounded-lg border border-blue-100 overflow-hidden">
                    <div className="p-2.5 bg-blue-50">
                      <span className="text-xs font-bold text-[var(--color-ink-soft)] pl-1">サービス内容</span>
                    </div>
                    <div className="grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-200">
                      {[
                        { href: "/services/psychiatric-nursing", label: "精神科訪問看護" },
                        { href: "/services/end-of-life-care", label: "看取り・終末期ケア" },
                        { href: "/services/24h-support", label: "24時間対応体制" },
                      ].map((item) => (
                        <Link key={item.href} href={item.href} onClick={closeMenu}
                          className="p-2.5 bg-white hover:bg-blue-50 transition-colors text-center">
                          <span className="text-xs font-medium text-[var(--color-ink-soft)]">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* 関係機関向け（中項目） */}
                  <div className="rounded-lg border border-blue-100 overflow-hidden">
                    <div className="p-2.5 bg-blue-50">
                      <span className="text-xs font-bold text-[var(--color-ink-soft)] pl-1">関係機関の方へ</span>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200">
                      <Link href="/services/for-care-managers" onClick={closeMenu}
                        className="p-2.5 bg-white hover:bg-blue-50 transition-colors text-center">
                        <span className="text-xs font-medium text-[var(--color-ink-soft)]">ケアマネ様へ</span>
                      </Link>
                      <Link href="/services/for-medical-institutions" onClick={closeMenu}
                        className="p-2.5 bg-white hover:bg-blue-50 transition-colors text-center">
                        <span className="text-xs font-medium text-[var(--color-ink-soft)]">医療機関様へ</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 大項目: 採用・お問い合わせ */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-logo-dark-green)] mb-3 border-b-2 border-[var(--color-logo-dark-green)] pb-1">
                  採用・お問い合わせ
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/recruit" onClick={closeMenu}
                    className="p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                    <span className="text-sm font-medium text-[var(--color-primary)]">採用情報一覧</span>
                  </Link>
                  <Link href="/#contact" onClick={closeMenu}
                    className="p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                    <span className="text-sm font-medium text-[var(--color-primary)]">お問い合わせ</span>
                  </Link>
                </div>
              </div>

              {/* 大項目: 会社情報 */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-logo-dark-green)] mb-3 border-b-2 border-[var(--color-logo-dark-green)] pb-1">
                  会社情報
                </h3>
                <div className="space-y-2">
                  {/* 株式会社フラクタル（中項目）+ サブページ */}
                  <div className="rounded-lg border border-emerald-100 overflow-hidden">
                    <Link href="/company" onClick={closeMenu}
                      className="block p-3 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                      <span className="text-sm font-bold text-[var(--color-primary)]">株式会社フラクタル</span>
                    </Link>
                    <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200">
                      <Link href="/fractal" onClick={closeMenu}
                        className="p-2.5 bg-white hover:bg-emerald-50 transition-colors text-center">
                        <span className="text-xs font-medium text-[var(--color-ink-soft)]">フラクタルの意味</span>
                      </Link>
                      <Link href="/company/ceo" onClick={closeMenu}
                        className="p-2.5 bg-white hover:bg-emerald-50 transition-colors text-center">
                        <span className="text-xs font-medium text-[var(--color-ink-soft)]">代表の取扱説明書</span>
                      </Link>
                    </div>
                  </div>
                  {/* 公式メディア（中項目） */}
                  <div className="rounded-lg border border-emerald-100 overflow-hidden">
                    <div className="p-2.5 bg-emerald-50">
                      <span className="text-xs font-bold text-[var(--color-ink-soft)] pl-1">公式メディア</span>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200">
                      {otherMenuCategories.external.items.map((item) => {
                        const Icon = item.icon ? iconMap[item.icon] : null;
                        return (
                          <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" onClick={closeMenu}
                            className="flex items-center justify-center p-2.5 bg-white hover:bg-emerald-50 transition-colors">
                            {Icon && <Icon className="w-4 h-4 mr-2 text-[var(--color-primary)]" />}
                            <span className="text-xs font-medium text-[var(--color-ink-soft)]">{item.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 大項目: サイト情報 */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-logo-dark-green)] mb-3 border-b-2 border-[var(--color-logo-dark-green)] pb-1">
                  サイト情報
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/updates" onClick={closeMenu}
                    className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-[var(--color-primary)]">アップデート情報</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
    </>
  );
}
