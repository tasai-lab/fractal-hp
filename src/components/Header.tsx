"use client";

import { useState } from "react";
import { navLinks } from "@/lib/data";
import { Instagram, Home, Building2, Phone, Users, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// モバイル下部メニューの項目
const mobileMenuItems = [
  { href: "#", label: "ホーム", icon: Home },
  { href: "#about", label: "フラクタルとは", icon: Building2 },
  { href: "#recruit", label: "採用情報", icon: Users },
  { href: "#contact", label: "お問い合わせ", icon: Phone },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center lg:justify-between h-14 lg:h-20">
            {/* ロゴ */}
            <a href="#" className="flex items-center justify-center space-x-3 lg:space-x-4 w-full lg:w-auto">
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
            </a>

            {/* デスクトップナビゲーション */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[var(--color-primary)] hover:text-[var(--color-accent-blue)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[var(--color-primary)] hover:text-[var(--color-accent-blue)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href="#"
                aria-label="Instagram"
                className="text-[var(--color-primary)] hover:text-[var(--color-accent-pink)] transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* モバイル下部メニュー */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
        <div className="flex items-center justify-around h-16">
          {mobileMenuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 py-2 text-[var(--color-primary)] hover:text-[var(--color-accent-blue)] transition-colors"
              >
                <IconComponent className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          })}
          {/* その他メニューボタン */}
          <button
            onClick={toggleMenu}
            className="flex flex-col items-center justify-center flex-1 py-2 text-[var(--color-primary)] hover:text-[var(--color-accent-blue)] transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 mb-1" />
            ) : (
              <Menu className="w-5 h-5 mb-1" />
            )}
            <span className="text-[10px] font-medium">その他</span>
          </button>
        </div>
      </nav>

      {/* モバイル展開メニュー */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={closeMenu}>
          <div
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-4 safe-area-pb"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="grid grid-cols-3 gap-4">
              {navLinks.map((link) => {
                const isExternal = !link.href.startsWith("#");
                const Component = isExternal ? Link : "a";
                return (
                  <Component
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-[var(--color-primary)]">
                      {link.label}
                    </span>
                  </Component>
                );
              })}
              <a
                href="#"
                onClick={closeMenu}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Instagram className="w-5 h-5 mb-1 text-[var(--color-accent-pink)]" />
                <span className="text-sm font-medium text-[var(--color-primary)]">
                  Instagram
                </span>
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* モバイル下部メニュー分のスペーサー（bodyのpaddingとして適用） */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          body {
            padding-bottom: 4rem;
          }
          .safe-area-pb {
            padding-bottom: env(safe-area-inset-bottom, 0);
          }
        }
      `}</style>
    </>
  );
}
