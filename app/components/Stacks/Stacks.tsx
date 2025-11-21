"use client";

import React, { useState } from "react";
import TickerRow from "./TickerRow";

interface Skill {
  icon: string;
  text: string;
  level?: string;
}

// 기술 스택 데이터
const skillsPool1: Skill[] = [
  { icon: "/html.svg", text: "HTML" },
  { icon: "/css.svg", text: "CSS" },
  { icon: "/javascript.svg", text: "JavaScript" },
  { icon: "/typescript.svg", text: "TypeScript" },
  { icon: "/tailwindcss.svg", text: "TailwindCSS" },
  { icon: "/react.svg", text: "React" },
  { icon: "/nextjs.svg", text: "Next.js" },
];

const skillsPool2: Skill[] = [
  { icon: "/nodejs.svg", text: "Node.js" },
  { icon: "/express.svg", text: "Express" },
  { icon: "/prisma.svg", text: "Prisma" },
  { icon: "/postgresql.svg", text: "PostgreSQL" },
  { icon: "/mongodb.svg", text: "MongoDB" },
  { icon: "/python.svg", text: "Python" },
  { icon: "/c.svg", text: "C" },
];

const skillsPool3: Skill[] = [
  { icon: "/git.svg", text: "Git" },
  { icon: "/github.svg", text: "GitHub" },
  { icon: "/aws.svg", text: "AWS" },
  { icon: "/vercel.svg", text: "Vercel" },
  { icon: "/render.svg", text: "Render" },
  { icon: "/vscode.svg", text: "VSCode" },
  { icon: "/cursor.svg", text: "Cursor" },
  { icon: "/postman.svg", text: "Postman" },
  { icon: "/dbeaver.svg", text: "DBeaver" },
  { icon: "/netlify.svg", text: "Netlify" },
  { icon: "/figma.svg", text: "Figma" },
];

export default function Stacks() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      id="stacks"
      className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-7xl w-full">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            Stacks
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent)]/80 transition-colors"
          >
            전체 목록 보기
          </button>
        </div>

        <div className="flex flex-col gap-6 py-10 w-full">
          <TickerRow skills={skillsPool1} speed={30} reverse={false} />
          <TickerRow skills={skillsPool2} speed={35} reverse={true} />
          <TickerRow skills={skillsPool3} speed={40} reverse={false} />
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                전체 기술 스택
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[...skillsPool1, ...skillsPool2].map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[var(--border)]/50 text-[var(--text-primary)]"
                    >
                      {skill.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
