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

  const isPastelVariant = variant === "paper" || variant === "editorial";

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
                alt="フラクタル訪問看護 船橋"
                width={56}
                height={56}
                className="w-11 h-11 lg:w-14 lg:h-14"
              />
              <Image
                src="/images/logos/hokan-title.png"
                alt="フラクタル訪問看護 船橋"
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
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {/* サービス案内 */}
                <section>
                  <h3 className="text-xs font-bold text-gray-500 mb-2 px-1">{otherMenuCategories.service.title}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {otherMenuCategories.service.items.map((item) => {
                      const isAnchor = item.href.startsWith("#");
                      const Component = isAnchor ? "a" : Link;
                      return (
                        <Component
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className={`flex items-center justify-start p-3 rounded-lg transition-colors text-left ${
                            isPastelVariant
                              ? "bg-[#e8f0eb] hover:bg-[#dce8e0]"
                              : "bg-blue-50 hover:bg-blue-100"
                          }`}
                        >
                          <span className="text-sm font-medium text-[var(--color-primary)]">{item.label}</span>
                        </Component>
                      );
                    })}
                  </div>
                </section>

                {/* 採用情報 */}
                <section>
                  <h3 className="text-xs font-bold text-gray-500 mb-2 px-1">{otherMenuCategories.recruit.title}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {otherMenuCategories.recruit.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={`flex items-center justify-start p-3 rounded-lg transition-colors text-left ${
                          isPastelVariant
                            ? "bg-[#f5ebe0] hover:bg-[#efe3d5]"
                            : "bg-amber-50 hover:bg-amber-100"
                        }`}
                      >
                        <span className="text-sm font-medium text-[var(--color-primary)]">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* 会社情報 */}
                <section>
                  <h3 className="text-xs font-bold text-gray-500 mb-2 px-1">{otherMenuCategories.company.title}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {otherMenuCategories.company.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={`flex items-center justify-start p-3 rounded-lg transition-colors text-left ${
                          isPastelVariant
                            ? "bg-[#e8ebe8] hover:bg-[#dce0dc]"
                            : "bg-emerald-50 hover:bg-emerald-100"
                        }`}
                      >
                        <span className="text-sm font-medium text-[var(--color-primary)]">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* 公式メディア */}
                <section>
                  <h3 className="text-xs font-bold text-gray-500 mb-2 px-1">{otherMenuCategories.external.title}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {otherMenuCategories.external.items.map((item) => {
                      const Icon = item.icon ? iconMap[item.icon] : null;
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closeMenu}
                          className={`flex items-center justify-start p-3 rounded-lg transition-colors text-left ${
                            isPastelVariant
                              ? "bg-[#f0e8eb] hover:bg-[#e8dce0]"
                              : "bg-pink-50 hover:bg-pink-100"
                          }`}
                        >
                          {Icon && <Icon className="w-5 h-5 mr-3 text-[var(--color-primary)]" />}
                          <span className="text-sm font-medium text-[var(--color-primary)]">{item.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
