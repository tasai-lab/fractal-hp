"use client";

import { useState } from "react";
import { navLinks } from "@/lib/data";
import { Menu, X, Instagram } from "lucide-react";
import Image from "next/image";

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
          <a href="#" className="flex items-center space-x-3">
            <Image
              src="/images/logos/hokan-logo.png"
              alt="フラクタル訪問看護 船橋"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="text-lg font-bold text-[var(--color-primary)]">
              フラクタル訪問看護 船橋
            </div>
          </a>

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
