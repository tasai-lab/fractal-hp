"use client";

import { useState } from "react";
import { navLinks } from "@/lib/data";
import { Menu, X, Instagram } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ロゴ */}
          <div className="flex items-center space-x-3">
            <FractalLogo />
            <div className="text-lg font-bold text-[var(--color-primary)]">
              フラクタル訪問看護 船橋
            </div>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-accent-blue)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              aria-label="Instagram"
              className="text-[var(--color-primary)] hover:text-[var(--color-accent-pink)] transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-[var(--color-primary)] hover:bg-gray-100"
            aria-label="メニュー"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--color-border)]">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-base text-[var(--color-primary)] hover:text-[var(--color-accent-blue)] transition-colors duration-200 py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#"
                onClick={closeMenu}
                className="flex items-center space-x-2 text-[var(--color-primary)] hover:text-[var(--color-accent-pink)] transition-colors duration-200 py-2"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// シェルピンスキーの三角形風のフラクタルロゴ
function FractalLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      className="text-[var(--color-primary)]"
    >
      {/* 外側の大きな三角形 */}
      <polygon
        points="50,10 10,90 90,90"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* 中央の三角形（反転） */}
      <polygon
        points="50,50 30,90 70,90"
        fill="var(--color-accent-blue)"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* 左上の三角形 */}
      <polygon
        points="30,50 10,90 50,90"
        fill="var(--color-accent-pink)"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* 右上の三角形 */}
      <polygon
        points="70,50 50,90 90,90"
        fill="var(--color-accent-yellow)"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* 上部の小さな三角形 */}
      <polygon
        points="50,10 30,50 70,50"
        fill="var(--color-accent-mint)"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
