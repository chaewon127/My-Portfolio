"use client";

import React, { useState, useEffect, useRef } from "react";
import FlipCard from "../components/Blog/FlipCard";
import ProjectModal from "../components/Projects/ProjectModal";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";
import CursorBubbles from "../components/CursorBubbles";
import LoadingScreen from "../components/LoadingScreen";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image?: string;
  technologies: string[];
  date: string;
  projectUrl?: string;
  githubUrl?: string;
}

// 예시 데이터 - 실제로는 API나 파일에서 가져올 수 있습니다
const generateBlogPosts = (count: number): BlogPost[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i + 1}`,
    title: `블로그 포스트 ${i + 1}`,
    description: `이것은 블로그 포스트 ${i + 1}의 간단한 설명입니다.`,
    fullDescription: `이것은 블로그 포스트 ${
      i + 1
    }의 상세한 내용입니다. 여기에 더 많은 정보가 들어갈 수 있습니다.`,
    technologies: ["React", "Next.js", "TypeScript"],
    date: new Date().toLocaleDateString("ko-KR"),
  }));
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(generateBlogPosts(6));
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          // 새로운 포스트 로드 시뮬레이션
          setTimeout(() => {
            const newPosts = generateBlogPosts(3);
            setPosts((prev) => [...prev, ...newPosts]);
            setIsLoading(false);
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen">
      <CursorBubbles />
      <Header />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-[var(--text-primary)] mb-12 text-center">
            Blog
          </h1>

          <div className="masonry">
            {posts.map((post, index) => {
              // 카드 높이를 다양하게 (300px ~ 500px)
              const heights = [
                500, 400, 450, 350, 500, 400, 450, 350, 500, 400,
              ];
              const height = heights[index % heights.length];

              return (
                <div
                  key={post.id}
                  className={`animate-section-fade-in masonry-item`}
                  style={{
                    animationDelay: `${(index % 6) * 0.1}s`,
                    height: `${height}px`,
                  }}
                >
                  <FlipCard
                    title={post.title}
                    description={post.description}
                    fullDescription={post.fullDescription}
                    image={post.image}
                    technologies={post.technologies}
                    date={post.date}
                    projectUrl={post.projectUrl}
                    githubUrl={post.githubUrl}
                    onCardClick={() => setSelectedPost(post)}
                  />
                </div>
              );
            })}
          </div>

          {/* 무한 스크롤 트리거 */}
          <div
            ref={observerTarget}
            className="h-20 flex items-center justify-center"
          >
            {isLoading && (
              <div className="text-[var(--text-secondary)]">로딩 중...</div>
            )}
          </div>
        </div>
      </main>

      {/* 블로그 포스트 상세 모달 */}
      {selectedPost && (
        <ProjectModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          title={selectedPost.title}
          description={selectedPost.description}
          fullDescription={selectedPost.fullDescription}
          image={selectedPost.image}
          technologies={selectedPost.technologies}
          projectUrl={selectedPost.projectUrl}
          githubUrl={selectedPost.githubUrl}
        />
      )}

      <Sidebar />
      <Footer />
    </div>
  );
}
