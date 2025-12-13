"use client";

import { useState } from "react";
import { navLinks, mobileMenuItems, otherMenuCategories } from "@/lib/data";
import { Instagram, Home, Building2, Phone, Users, Menu, X, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const iconMap: { [key: string]: any } = {
  Home,
  Building2,
  Users,
  Phone,
  Instagram,
  FileText,
};

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
            <Link href="/" className="flex items-center justify-center space-x-3 lg:space-x-4 w-full lg:w-auto">
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
                href="https://www.instagram.com/fractal.hokan/"
                target="_blank"
                rel="noopener noreferrer"
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
            const IconComponent = iconMap[item.icon];
            const isExternal = item.href.startsWith("http");
            const isAnchor = item.href.startsWith("#");
            const Component = isExternal || isAnchor ? "a" : Link;
            
            return (
              <Component
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 py-2 text-[var(--color-primary)] hover:text-[var(--color-accent-blue)] transition-colors"
              >
                <IconComponent className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Component>
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
            <span className="text-[10px] font-medium">サイトマップ</span>
          </button>
        </div>
      </nav>

      {/* モバイル展開メニュー */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={closeMenu}>
          <div
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-4 safe-area-pb max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6 pb-10">
              {/* ホーム（ページ内リンク） */}
              <section>
                <h3 className="text-xs font-bold text-gray-500 mb-2 px-1">{otherMenuCategories.home.title}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {otherMenuCategories.home.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-center"
                    >
                      <span className="text-xs font-medium text-[var(--color-primary)]">{item.label}</span>
                    </a>
                  ))}
                </div>
              </section>

              {/* その他のページ */}
              <section>
                <h3 className="text-xs font-bold text-gray-500 mb-2 px-1">{otherMenuCategories.pages.title}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {otherMenuCategories.pages.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors text-center"
                    >
                      <span className="text-xs font-medium text-[var(--color-primary)]">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* 外部サービス */}
              <section>
                <h3 className="text-xs font-bold text-gray-500 mb-2 px-1">{otherMenuCategories.external.title}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {otherMenuCategories.external.items.map((item) => {
                    const Icon = item.icon ? iconMap[item.icon] : null;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="flex flex-col items-center justify-center p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors text-center"
                      >
                        {Icon && <Icon className="w-5 h-5 mb-1 text-[var(--color-primary)]" />}
                        <span className="text-xs font-medium text-[var(--color-primary)]">{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </section>
            </div>
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
