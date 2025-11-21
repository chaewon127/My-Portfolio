"use client";

import React, { useState } from "react";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  description: string;
  fullDescription?: string;
  image?: string;
  technologies: string[];
  date: string;
  projectUrl?: string;
  githubUrl?: string;
  onCardClick?: () => void;
}

export default function BlogCard({
  title,
  description,
  fullDescription,
  image,
  technologies,
  date,
  projectUrl,
  githubUrl,
  onCardClick,
}: BlogCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    if (isFlipped && onCardClick) {
      onCardClick();
    }
  };

  return (
    <div className="w-full h-full perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={handleCardClick}
      >
        {/* 카드 앞면 */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="relative w-full h-full">
            <div className="flex items-center justify-center w-full h-full bg-[var(--border)]/50 border border-[var(--border)] rounded-lg overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[var(--text-secondary)]">
                  이미지 or gif
                </span>
              )}
            </div>
            <p className="absolute bottom-4 left-4 border rounded-full border-none bg-[var(--text-primary)] px-3 py-1.5 text-base font-bold text-[var(--bg-primary)]">
              {title}
            </p>
          </div>
        </div>

        {/* 카드 뒷면 */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="w-full h-full bg-[var(--border)]/70 border border-[var(--border)] rounded-lg p-4 flex flex-col cursor-pointer">
            <p className="text-sm text-[var(--accent)] mb-2">{date}</p>
            <p className="w-full flex-1 flex items-center justify-center text-[var(--text-secondary)] text-center mb-4">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {technologies.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 text-[var(--accent)] bg-[var(--accent)]/10 rounded-full border-none px-3 py-1 text-sm"
                >
                  <p>{tech}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-center">
              {projectUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(projectUrl, "_blank");
                  }}
                  className="text-[var(--text-primary)] rounded-lg border-[var(--border)] border px-4 py-2 hover:bg-[var(--border)] transition-colors"
                >
                  페이지 이동
                </button>
              )}
              {githubUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(githubUrl, "_blank");
                  }}
                  className="text-[var(--text-primary)] rounded-lg border-[var(--border)] border px-4 py-2 hover:bg-[var(--border)] transition-colors"
                >
                  GitHub repo
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onCardClick) onCardClick();
                }}
                className="text-[var(--text-primary)] rounded-lg border-[var(--accent)] border bg-[var(--accent)]/10 px-4 py-2 hover:bg-[var(--accent)]/20 transition-colors"
              >
                자세히 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
