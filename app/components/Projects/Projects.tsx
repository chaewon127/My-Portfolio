"use client";

import React, { useState, useRef, useEffect } from "react";
import TiltCard from "./TiltCard";
import ProjectModal from "./ProjectModal";

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image?: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
}

// 예시 데이터
const projects: Project[] = [
  {
    id: "1",
    title: "포트폴리오 웹사이트",
    description: "바다 테마의 포트폴리오 웹사이트입니다.",
    fullDescription:
      "이 프로젝트는 Next.js와 TypeScript를 사용하여 제작된 포트폴리오 웹사이트입니다. 바다를 모티브로 한 디자인과 다양한 애니메이션 효과를 적용했습니다.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: "2",
    title: "웹 애플리케이션",
    description: "풀스택 웹 애플리케이션입니다.",
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "3",
    title: "AI 프로젝트",
    description: "머신러닝을 활용한 프로젝트입니다.",
    technologies: ["Python", "TensorFlow", "FastAPI"],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const scrollPercent = scrollLeft / maxScroll;

      // 파도 효과를 위한 transform
      container.style.transform = `translateY(${
        Math.sin(scrollPercent * Math.PI * 4) * 5
      }px)`;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 ${
        isVisible ? "animate-section-fade-in" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-12">
          Projects
        </h2>

        {/* 가로 스크롤 컨테이너 - 파도 효과 */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 scrollbar-hide transition-transform duration-100"
        >
          <div className="flex gap-6 w-max px-2">
            {projects.map((project) => (
              <TiltCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                projectUrl={project.projectUrl}
                githubUrl={project.githubUrl}
                onCardClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          description={selectedProject.description}
          fullDescription={selectedProject.fullDescription}
          image={selectedProject.image}
          technologies={selectedProject.technologies}
          projectUrl={selectedProject.projectUrl}
          githubUrl={selectedProject.githubUrl}
        />
      )}
    </section>
  );
}
