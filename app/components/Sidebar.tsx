"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface Section {
  id: string;
  label: string;
  href: string;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDuration: number;
}

const sections: Section[] = [
  { id: "hero", label: "Hero", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "history", label: "History", href: "#history" },
  { id: "stacks", label: "Stacks", href: "#stacks" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
  { id: "blog", label: "Blog", href: "/blog" },
];

export default function Sidebar() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bubbleIdRef = useRef(0);

  useEffect(() => {
    if (!isOpen) {
      // 다음 렌더 사이클에서 상태 업데이트
      const timeout = setTimeout(() => setBubbles([]), 0);
      return () => clearTimeout(timeout);
    }

    // 공기방울 생성 (버튼 위치에서 올라오는 느낌)
    const interval = setInterval(() => {
      const animationDuration = 1.5 + Math.random() * 1;
      const newBubble: Bubble = {
        id: bubbleIdRef.current++,
        x: 90 + Math.random() * 5, // 오른쪽 영역에 생성 (90-95%)
        y: 40 + Math.random() * 40, // 하단 영역에서 시작
        size: 8 + Math.random() * 12,
        animationDuration,
      };
      setBubbles((prev) => {
        const updated = [...prev, newBubble];
        return updated.slice(-20);
      });

      // 애니메이션 완료 후 제거
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, animationDuration * 1000 + 100);
    }, 400);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  // 버튼 크기 계산 (Hero가 가장 작고, Blog가 가장 큼)
  const getButtonSize = (index: number, total: number) => {
    const minSize = 40; // Hero 버튼 크기 (가장 작음)
    const maxSize = 64; // Blog 버튼 크기 (가장 큼)
    const sizeStep = (maxSize - minSize) / (total - 1);
    return minSize + sizeStep * index; // index가 클수록 큼
  };

  // 지그재그 위치 계산
  const getButtonPosition = (index: number) => {
    const baseRight = 24; // 오른쪽 여백
    const zigzagOffset = index % 2 === 0 ? 0 : -12; // 지그재그 오프셋
    return baseRight + zigzagOffset;
  };

  // 버튼 색상 (테마에 따라)
  const getButtonStyles = () => {
    if (theme === "dark") {
      return "bg-white/20 hover:bg-white/30 border-white/40 hover:border-white/60 text-white";
    } else {
      return "bg-[var(--accent)]/20 hover:bg-[var(--accent)]/30 border-[var(--accent)]/40 hover:border-[var(--accent)]/60 text-[var(--text-primary)]";
    }
  };

  // 공기방울 색상 (테마에 따라)
  const getBubbleStyles = () => {
    if (theme === "dark") {
      return "bg-white/40 border-white/60";
    } else {
      return "bg-[var(--accent)]/40 border-[var(--accent)]/60";
    }
  };

  return (
    <>
      {/* 공기방울 효과 - 버튼 색상에 맞춰 */}
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className={`absolute rounded-full border ${getBubbleStyles()}`}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                transform: "translate(-50%, -50%)",
                willChange: "transform, opacity",
                animation: `bubble-rise ${bubble.animationDuration}s ease-out forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* 사이드바 버튼 - Footer 위에 위치하도록 */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="fixed bottom-24 right-8 z-50 w-16 h-16 rounded-full bg-[var(--accent)] hover:bg-[var(--accent)]/80 text-white shadow-lg transition-all duration-300 flex items-center justify-center group"
        aria-label="Toggle navigation"
      >
        <div className="relative w-6 h-6">
          <span
            className={`absolute top-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`absolute top-2.5 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute top-5 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </div>
      </button>

      {/* Navigate 메뉴 - 아래에서 위로 올라오는 애니메이션 */}
      <div
        ref={sidebarRef}
        className={`fixed bottom-24 right-0 z-40 flex flex-col gap-4 items-end pr-4 transition-all duration-500 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {sections
          .slice()
          .reverse()
          .map((section, reverseIndex) => {
            const index = sections.length - 1 - reverseIndex; // 원래 인덱스
            const buttonSize = getButtonSize(index, sections.length);
            const rightPos = getButtonPosition(index);
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.href)}
                className={`rounded-full shadow-lg transition-all duration-500 flex items-center justify-center font-semibold hover:scale-110 px-3 ${getButtonStyles()} ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  minWidth: `${buttonSize}px`,
                  height: `${buttonSize}px`,
                  right: `${rightPos}px`,
                  fontSize: `${Math.max(buttonSize * 0.25, 12)}px`,
                  transitionDelay: `${reverseIndex * 0.1}s`,
                }}
                title={section.label}
              >
                <span className="whitespace-nowrap">{section.label}</span>
              </button>
            );
          })}
      </div>
    </>
  );
}
