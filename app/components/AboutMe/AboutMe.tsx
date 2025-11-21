"use client";

import React from "react";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="w-full min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-8">
          About Me
        </h2>
        <div className="space-y-6 text-[var(--text-secondary)] text-lg leading-relaxed">
          <p>
            안녕하세요. 풀스택 개발자이자 AI 엔지니어입니다. 깊은 바다처럼
            끊임없이 탐구하고 성장하는 개발자입니다.
          </p>
          <p>
            다양한 기술 스택을 활용하여 사용자 경험을 중시하는 웹 애플리케이션을
            개발하고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

