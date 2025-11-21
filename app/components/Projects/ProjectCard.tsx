"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  onCardClick?: () => void;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  projectUrl,
  githubUrl,
  onCardClick,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    // 커서 위치에 따라 해당 부분이 뒤로 기울어지도록
    // 커서가 있는 부분이 뒤로 가야 함
    // rotateX: 위쪽이면 음수(앞으로), 아래쪽이면 양수(뒤로)
    // rotateY: 왼쪽이면 음수(앞으로), 오른쪽이면 양수(뒤로)
    const rotateX = (percentY - 0.5) * 15; // 아래쪽이면 양수 (뒤로)
    const rotateY = (percentX - 0.5) * 15; // 오른쪽이면 양수 (뒤로)

    // transform-origin을 커서 위치로 설정
    const originX = percentX * 100;
    const originY = percentY * 100;

    card.style.transformOrigin = `${originX}% ${originY}%`;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.transformOrigin = "50% 50%";
  };

  return (
    <div className="w-96 h-[500px] flex-shrink-0 p-4">
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onCardClick}
        className="w-full h-full transition-transform duration-200 ease-out [transform-style:preserve-3d] cursor-pointer perspective-1000"
      >
        <div className="border rounded-lg border-[var(--border)] w-full h-full overflow-hidden bg-[var(--border)]/30 hover:border-[var(--accent)] transition-colors">
          <div className="flex items-center justify-center w-full h-1/3 bg-[var(--border)]/50">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={384}
                height={167}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[var(--text-secondary)]">
                이미지 or gif
              </span>
            )}
          </div>
          <div className="w-full h-2/3 p-6 flex flex-col">
            <p className="text-xl font-bold text-[var(--text-primary)] mb-3">
              {title}
            </p>
            <p className="w-full flex-1 text-[var(--text-secondary)] mb-4 line-clamp-3">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 text-[var(--accent)] bg-[var(--accent)]/10 rounded-full border-none px-3 py-1 text-sm"
                >
                  <p>{tech}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-auto">
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[var(--text-primary)] rounded-lg border-[var(--border)] border px-4 py-2 hover:bg-[var(--border)] transition-colors"
                >
                  페이지 이동
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[var(--text-primary)] rounded-lg border-[var(--border)] border px-4 py-2 hover:bg-[var(--border)] transition-colors"
                >
                  GitHub repo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
