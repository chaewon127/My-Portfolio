"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  const languages: Array<{ code: "en" | "ko" | "ja"; label: string }> = [
    { code: "en", label: "English" },
    { code: "ko", label: "한국어" },
    { code: "ja", label: "日本語" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cycleLanguage = () => {
    const currentIndex = languages.findIndex((lang) => lang.code === language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex].code);
  };

  const currentLanguage = languages.find((lang) => lang.code === language);

  const scrollToHero = () => {
    const element = document.querySelector("#hero");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-sm border-b border-[var(--border)] transition-all">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={scrollToHero}
            className="text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            Portfolio
          </button>
          <div className="flex items-center gap-4">
            {/* 다국어 버튼 - 순환 방식 */}
            <button
              onClick={cycleLanguage}
              className="px-4 py-2 rounded-lg text-sm transition-colors bg-[var(--border)] hover:bg-[var(--accent)] text-[var(--text-primary)]"
              title={`현재: ${currentLanguage?.label} (클릭하여 변경)`}
            >
              {currentLanguage?.label || "English"}
            </button>
            {/* 다크/화이트 모드 토글 버튼 */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--border)] hover:bg-[var(--accent)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5 text-[var(--text-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-[var(--text-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 스크롤 시 오른쪽 상단에 고정되는 버튼들 */}
      <div
        className={`fixed top-4 right-4 z-50 flex items-center gap-3 transition-all duration-300 ${
          isScrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-20px] pointer-events-none"
        }`}
      >
        <button
          onClick={cycleLanguage}
          className="px-4 py-2 rounded-lg text-sm transition-colors bg-[var(--border)] hover:bg-[var(--accent)] text-[var(--text-primary)] shadow-lg"
          title={`현재: ${currentLanguage?.label} (클릭하여 변경)`}
        >
          {currentLanguage?.label || "English"}
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-[var(--border)] hover:bg-[var(--accent)] transition-colors shadow-lg"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <svg
              className="w-5 h-5 text-[var(--text-primary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-[var(--text-primary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
