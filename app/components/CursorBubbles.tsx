"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDuration: number;
}

export default function CursorBubbles() {
  const { theme } = useTheme();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bubbleIdRef = useRef(0);
  const lastBubbleTimeRef = useRef(0);
  const throttleDelay = 50; // 50ms마다 공기방울 생성

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      // throttle: 너무 자주 생성되지 않도록
      if (now - lastBubbleTimeRef.current < throttleDelay) {
        return;
      }

      lastBubbleTimeRef.current = now;

      // 마우스 위치에서 공기방울 생성 (생성 시점 위치 고정)
      const animationDuration = 1.5 + Math.random() * 1;
      const newBubble: Bubble = {
        id: bubbleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        size: 8 + Math.random() * 12, // 8~20px 크기
        animationDuration,
      };

      setBubbles((prev) => {
        const updated = [...prev, newBubble];
        // 최대 30개까지만 유지
        return updated.slice(-30);
      });

      // 애니메이션 완료 후 자동으로 제거
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, animationDuration * 1000 + 100);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const getBubbleStyles = () => {
    if (theme === "dark") {
      return "bg-white/40 border-white/60";
    } else {
      return "bg-[var(--accent)]/40 border-[var(--accent)]/60";
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`absolute rounded-full border ${getBubbleStyles()}`}
          style={{
            left: `${bubble.x}px`,
            top: `${bubble.y}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            transform: "translate(-50%, -50%)",
            willChange: "transform, opacity",
            animation: `bubble-rise ${bubble.animationDuration}s ease-out forwards`,
          }}
        />
      ))}
    </div>
  );
}
