"use client";

import React, { useEffect } from "react";
import Image from "next/image";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  fullDescription?: string;
  image?: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  description,
  fullDescription,
  image,
  technologies,
  projectUrl,
  githubUrl,
}: ProjectModalProps) {
  // 모달이 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
        onScroll={(e) => e.stopPropagation()}
      >
        {image && (
          <div className="w-full h-64 relative">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-2xl"
            >
              ✕
            </button>
          </div>
          <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
            {fullDescription || description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-1 text-[var(--accent)] bg-[var(--accent)]/10 rounded-full border-none px-4 py-2"
              >
                <p>{tech}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] rounded-lg border-[var(--border)] border px-6 py-2 hover:bg-[var(--border)] transition-colors"
              >
                페이지 이동
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] rounded-lg border-[var(--border)] border px-6 py-2 hover:bg-[var(--border)] transition-colors"
              >
                GitHub repo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
