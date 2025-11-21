"use client";

import React from "react";

interface TimelineItem {
  id: string;
  type: "career" | "education";
  title: string;
  period: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    id: "1",
    type: "career",
    title: "소프트웨어 개발자",
    period: "2023 - 현재",
    description: "풀스택 개발 및 AI 엔지니어링",
  },
  {
    id: "2",
    type: "education",
    title: "컴퓨터 공학 학사",
    period: "2019 - 2023",
    description: "대학교 졸업",
  },
  {
    id: "3",
    type: "career",
    title: "인턴십",
    period: "2022",
    description: "웹 개발 인턴",
  },
];

export default function History() {
  const careerItems = timelineItems.filter((item) => item.type === "career");
  const educationItems = timelineItems.filter(
    (item) => item.type === "education"
  );

  return (
    <section
      id="history"
      className="w-full min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-6xl w-full relative">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 text-center">
          History
        </h2>

        {/* 소제목 */}
        <div className="flex justify-between items-center mb-8 px-4">
          <div className="text-2xl font-semibold text-[var(--text-primary)]">
            경력
          </div>
          <div className="text-2xl font-semibold text-[var(--text-primary)]">
            학업
          </div>
        </div>

        {/* 중앙 타임라인 선 */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--accent)] transform -translate-x-1/2"></div>

          {/* 스크롤 가능한 컨테이너 */}
          <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
            {/* 타임라인 아이템들 */}
            <div className="space-y-12 pb-8">
              {timelineItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative flex items-center ${
                    item.type === "career" ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* 내용 카드 */}
                  <div
                    className={`w-5/12 ${
                      item.type === "career" ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <div className="bg-[var(--border)]/50 backdrop-blur-sm rounded-lg p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors relative">
                      {/* 실선 연결 */}
                      <div
                        className={`absolute top-1/2 w-8 h-0.5 bg-[var(--accent)] ${
                          item.type === "career" ? "right-0 translate-x-full" : "left-0 -translate-x-full"
                        }`}
                        style={{ top: "50%" }}
                      ></div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--accent)] mb-2">
                        {item.period}
                      </p>
                      <p className="text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* 중앙 점 */}
                  <div className="relative z-10 w-2/12 flex justify-center">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-[var(--bg-primary)] shadow-lg animate-pulse"></div>
                      {/* 파도 효과 */}
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-[var(--accent)]/30 animate-ping"></div>
                    </div>
                  </div>

                  {/* 빈 공간 */}
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

