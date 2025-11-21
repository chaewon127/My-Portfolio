"use client";

import React, { useState, useEffect } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[var(--bg-primary)] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative w-64 h-64 mb-8">
        {/* 잠수하는 사람 아이콘 */}
        <div className="absolute inset-0 flex items-center justify-center animate-dive">
          <svg
            viewBox="0 0 100 100"
            className="w-32 h-32 text-[var(--accent)]"
            fill="currentColor"
          >
            <circle cx="50" cy="30" r="15" />
            <path d="M35 50 L50 45 L65 50 L65 70 L50 75 L35 70 Z" />
            <path d="M50 45 L50 30" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        {/* 공기방울 */}
        <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-white/40 border border-white/60 animate-bubble-rise" />
        <div className="absolute top-20 right-10 w-3 h-3 rounded-full bg-white/40 border border-white/60 animate-bubble-rise" style={{ animationDelay: "0.3s" }} />
        <div className="absolute top-30 left-20 w-2 h-2 rounded-full bg-white/40 border border-white/60 animate-bubble-rise" style={{ animationDelay: "0.6s" }} />
      </div>
      <div className="w-64 h-1 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-[var(--text-secondary)]">{progress}%</p>
    </div>
  );
}

